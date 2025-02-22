import { VOCAB_PROPERTIES as vp } from '$lib/constants.js';

export async function load({ params }) {
	const id = params.id.startsWith(vp.eduvocs) ? params.id : `${vp.eduvocs}/id/${params.id}`;
	return { id };
}
