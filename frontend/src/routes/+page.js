export async function load({ fetch, params }) {
	const templateURL = `http://localhost:3000/api/templates/all`;
	const exerciseURL = `http://localhost:3000/api/exercises/all`;

	try {
		const responses = await Promise.all([fetch(templateURL), fetch(exerciseURL)]);
		const [templates, exercises] = await Promise.all(responses.map(async (res) => res.json()));

		return { templates, exercises };
	} catch (error) {
		console.error(error);
	}
}
