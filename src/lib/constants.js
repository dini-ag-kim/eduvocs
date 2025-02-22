export const VOCAB_PROPERTIES = {
	eduvocs: 'https://w3id.org/eduvocs', // Namespace base uri
	id: 'id', // http://purl.org/dc/terms/identifier
	url: 'url', // https://schema.org/url
	type: 'type', // http://www.w3.org/1999/02/22-rdf-syntax-ns#type
	name: 'title', // http://purl.org/dc/terms/title
	description: 'description', // http://purl.org/dc/terms/description
	about: 'about', // https://schema.org/about
	creator: 'creator', // http://purl.org/dc/terms/creator
	issued: 'issued', // http://purl.org/dc/terms/issued
	modified: 'modified', // http://purl.org/dc/terms/modified
	audience: 'audience', // https://schema.org/audience
	language: 'language', // http://purl.org/dc/terms/language
	license: 'license', // http://purl.org/dc/terms/license
	educationalLevel: 'educationalLevel', // https://schema.org/educationalLevel
	endpointUrl: 'dcat#endpointURL', // https://www.w3.org/ns/dcat#endpointURL
	describedAt: 'P973', // http://www.wikidata.org/prop/direct/P973
	maintainedBy: 'P126', // http://www.wikidata.org/prop/direct/P126
	usedBy: 'P1535', // http://www.wikidata.org/prop/direct/P1535
	repo: 'P1324', // http://www.wikidata.org/prop/direct/P1324
	compliesWith: 'P5009', // http://www.wikidata.org/prop/direct/P5009
	format: 'format', // http://purl.org/dc/terms/format
	fileFormat: 'fileFormat', // https://schema.org/fileFormat
	distribution: 'distribution', // https://schema.org/distribution
	rawVocab: 'rawVocab', // https://w3id.org/eduvocs/terms/rawVocab
	keywords: 'keywords', // https://schema.org/keywords
	contentUrl: 'contentUrl' // https://schema.org/contentUrl
};

export const PROJECT_URL = {
	report: 'https://github.com/sroertgen/edu-vocabs/issues/new'
};

export const METADATA_KEYS = ['issued', 'compliesWith'];

export const LANGUAGES = ['en', 'de'];

export const STORAGE_KEYS = {
	language: 'eduvocs:locale',
	notepad: 'eduvocs:selectedVocabs'
};
