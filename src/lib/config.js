export const config = {
	gitRepo: 'https://github.com/dini-ag-kim/eduvocs',
	filterKeys: ['about', 'educationalLevel', 'P126'],
	sortKeys: ['name', 'issued', 'maintainedBy', 'about', 'educationalLevel'],
	index: {
		tokenize: 'full',
		language: 'de',
		encoder: 'advanced',
		charset: 'latin',
		document: {
			id: 'id',
			index: ['id', 'title', 'description', 'about', 'P126'],
			tag: 'tag',
			store: true
		}
	}
};
