import { get } from 'svelte/store';
import { db, vocabEntries } from '$lib/db';
import { VOCAB_PROPERTIES as vp } from '$lib/constants';

export async function parseToSkos(input) {
	// file or string, we can handle both 💪
	if (input.split('.')[1] === 'txt') {
		const res = await fetch('/vocs/' + input);
		const r = await res.text();
		input = r;
	}

	const lines = input.split('\n');
	const stack = [];
	const result = { hasTopConcept: [] };

	lines.forEach((line) => {
		const trimmedLine = line.trim();
		if (!trimmedLine) return;

		const indentLevel = line.match(/^ */)[0].length;
		const entry = {
			prefLabel: { de: trimmedLine },
			narrower: []
		};

		while (stack.length && stack[stack.length - 1].indentLevel >= indentLevel) {
			stack.pop();
		}

		if (stack.length) {
			const parent = stack[stack.length - 1].entry;
			parent.narrower.push(entry);
		} else {
			result.hasTopConcept.push(entry);
		}
		stack.push({ entry, indentLevel });
	});
	return result;
}

async function getVocabs(uri) {
	// TODO
	// cors issue depending on the target uri
	// fetch via backend proxy route?
	try {
		const res = await fetch(uri);
		if (!res.ok) {
			throw new Error(`Network error: ${res.statusText}`);
		}
		return await res.json();
	} catch (error) {
		throw new Error(`Failed to fetch vocab data: ${error}`);
	}
}

const updateVocabEntries = (id, entries) => {
	vocabEntries.update((db) => {
		return { ...db, [id]: entries };
	});
};

export async function getVocabEntries(id) {
	const ves = get(vocabEntries);
	if (id in ves) {
		return ves[id];
	}
	const result = get(db).index?.store?.[id] ?? {};
	const vocabDistribution = result[vp.distribution]?.map((e) => get(db).index.store[e]);
	const jsonLink = vocabDistribution?.find((d) => d[vp.fileFormat].includes('application/json'));
	const rawVocab = result[vp.rawVocab]?.[0] ?? '';

	if (rawVocab.length) {
		const vocabData = await parseToSkos(rawVocab);
		updateVocabEntries(id, vocabData);
		return vocabData;
	} else if (jsonLink) {
		try {
			const vocabData = await getVocabs(jsonLink.contentUrl);
			// need a marker to know if the data needs to be transformed, currently guessing its skosmos data
			// might be made smarter later
			if ('graph' in vocabData) {
				const transformed = transformSkosData(vocabData);
				updateVocabEntries(id, transformed);
				return transformed;
			}
			updateVocabEntries(id, vocabData);
			return vocabData;
		} catch (e) {
			console.log('error', e);
			updateVocabEntries(id, { error: e });
			throw e;
		}
	} else {
		updateVocabEntries(id, { error: 'No distribution found' });
		return { error: 'No distribution found' };
	}
}

// transforms skosmos json-ld to a tree like structure used by skohub
function transformSkosData(input) {
	const scheme = input.graph.find((item) => item.type === 'skos:ConceptScheme');

	function buildConceptTree(conceptUri) {
		const concept = input.graph.find((item) => item.uri === conceptUri);
		const narrowerConcepts = input.graph.filter(
			(item) => item.broader && item.broader.uri === conceptUri
		);

		return {
			id: concept.uri,
			prefLabel: Object.fromEntries(
				(concept.prefLabel || []).map((label) => [label.lang, label.value])
			),
			narrower:
				narrowerConcepts.length > 0
					? narrowerConcepts.map((n) => buildConceptTree(n.uri))
					: undefined
		};
	}

	const topConceptsRaw = scheme['skos:hasTopConcept'];
	// hasTopConcept can be an Object or an Array
	const topConceptsArray = Array.isArray(topConceptsRaw)
		? topConceptsRaw
		: topConceptsRaw
			? [topConceptsRaw]
			: [];
	const topConcepts = topConceptsArray.map((tc) => buildConceptTree(tc.uri));

	return {
		id: scheme.uri,
		type: 'ConceptScheme',
		title: Object.fromEntries(scheme.prefLabel.map((label) => [label.lang, label.value])),
		hasTopConcept: topConcepts
	};
}
