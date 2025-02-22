import { writable, get, derived } from 'svelte/store';
import { config } from '$lib/config';
import pkg from 'flexsearch';

export const db = writable({
	resultsPerPage: 10,
	activePage: 1,
	query: '',
	results: [],
	filters: {},
	index: {},
	sort: {
		key: '',
		order: 'asc'
	},
	initizialized: false,
	filterKeys: config.filterKeys,
	selectedFilters: initFilters(),
	selectedVocabs: []
});

export const paginatedResults = derived(db, ($db) => {
	const startIndex = $db.activePage * $db.resultsPerPage;
	const endIndex = startIndex + $db.resultsPerPage;
	const paginatedResults = $db.results.slice(startIndex, endIndex);
	return paginatedResults;
});

export const vocabEntries = writable({});

const { Document } = pkg;
const index = new Document({ ...config.index });
const filterKeys = get(db).filterKeys;

/**
 * Updates pagination from currently active page based on direction
 * @param {number} direction - The direction to change the page (-1 for previous, 1 for next)
 */
export function updatePagination(direction) {
	db.update((db) => {
		const activePage = db.activePage + direction;
		return { ...db, activePage };
	});
}

/**
 * Initializes filter object with empty arrays
 * @returns {Object} Initialized filter object
 */
function initFilters() {
	return Object.fromEntries(config.filterKeys.map((e) => [e, []]));
}

/**
 * Resets filters and query, then refills results
 */
export function resetFilters() {
	db.update((db) => {
		return {
			...db,
			query: '',
			sort: {
				key: '',
				order: 'asc'
			},
			selectedFilters: initFilters()
		};
	});
	fillResults();
}

/**
 * Populates search results from the index
 */
export function fillResults() {
	const results = Object.values(get(db).index.store).filter((e) =>
		e.type.includes('http://www.wikidata.org/entity/Q1469824')
	);
	updateResults(results);
}

/**
 * Handles search queries, applying selected filters
 * @param {Event} event - The search event
 */
export function search(event) {
	event.preventDefault();
	const tags = Object.values(get(db).selectedFilters).flat();
	const groupedResults = get(db).index.search(get(db).query, {
		index: ['id', 'title', 'about', 'P126'],
		enrich: true,
		tag: tags
	});
	const resultSet = Array.from(
		new Map([...groupedResults.map((e) => e.result).flat()].map((item) => [item.id, item])).values()
	);

	const results = resultSet.map((r) => r.doc);
	if (results.length === 0 && Object.values(get(db).selectedFilters).flat()) {
		fillResults();
	} else {
		updateResults(results);
	}
}

/**
 * Sorts the results in the database based on the specified key and order,
 * then updates the sorted results.
 *
 * @param {string} key - The property used for sorting the results.
 * @param {string} [order='asc'] - sort order: 'asc' for ascending, 'desc' for descending.
 */
export function sort(key, order = 'asc') {
	order = order.toLowerCase();
	const results = [...get(db).results].sort((a, b) => {
		const [valA, valB] = [a[key], b[key]];
		if (valA == null || valB == null) return 0;
		if (typeof valA === 'number' && typeof valB === 'number') {
			return order === 'desc' ? valB - valA : valA - valB;
		}
		return order === 'desc'
			? String(valB).localeCompare(String(valA))
			: String(valA).localeCompare(String(valB));
	});
	db.update((db) => {
		return { ...db, sort: { key, order } };
	});
	updateResults(results);
}

/**
 * Handles selection of filters and triggers search
 * @param {string} key - The filter category
 * @param {string} val - The filter value
 */
export function handleFilterSelect(key, val) {
	db.update((db) => {
		const indexInSelectedFilters = db.selectedFilters[key].indexOf(val);
		let selectedFilters;
		if (indexInSelectedFilters > -1) {
			selectedFilters = {
				...db.selectedFilters,
				[key]: db.selectedFilters[key].filter((e) => e !== val)
			};
		} else {
			selectedFilters = { ...db.selectedFilters, [key]: [...db.selectedFilters[key], val] };
		}
		return { ...db, selectedFilters };
	});
	search({ preventDefault: function () {} });
}

/**
 * Updates search results and resets pagination
 * @param {Array} results - The search results
 */
export function updateResults(results) {
	db.update((db) => {
		return { ...db, results, activePage: 0 };
	});
}

/**
 * Creates filter options based on available index data
 * @returns {Promise<Object>} Filter options
 */
export async function createFilterOptions() {
	let filters = {};
	filterKeys.forEach((k) => {
		filters = {
			...filters,
			[k]: new Set(
				Object.values(index.store)
					.map((e) => e[k])
					.flat()
					.filter((e) => e !== undefined)
			)
		};
	});
	return filters;
}

/**
 * Creates and populates the search index
 */
export async function createIndex() {
	const res = await fetch('/api/search-index');
	const keys = await res.json();
	for (const key in keys) {
		await index.import(key, keys[key]);
	}
	const filters = await createFilterOptions();
	db.update((db) => {
		return { ...db, filters };
	});
	db.update((db) => {
		return { ...db, index };
	});
	db.update((db) => {
		return { ...db, initialized: true };
	});
	fillResults();
}

export function toggleSelected(dbKey, val) {
	db.update((db) => {
		if (db[dbKey].includes(val)) {
			const updated = { [dbKey]: [...db[dbKey].filter((v) => v !== val)] };
			localStorage.setItem(`eduvocs:${dbKey}`, JSON.stringify(updated));
			return { ...db, ...updated };
		} else {
			const updated = { [dbKey]: [...db[dbKey], val] };
			localStorage.setItem(`eduvocs:${dbKey}`, JSON.stringify(updated));
			return { ...db, ...updated };
		}
	});
}

export function resetSelected(dbKey) {
	db.update((db) => {
		const updated = { [dbKey]: [] };
		localStorage.setItem(`eduvocs:${dbKey}`, JSON.stringify(updated));
		return { ...db, ...updated };
	});
}
