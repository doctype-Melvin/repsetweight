export async function load({ fetch, params }) {
	const templateURL = `http://localhost:3000/api/templates/all`;
	const exerciseURL = `http://localhost:3000/api/exercises/all`;
	const userURL = `http://localhost:3000/api/users/user/2`;

	try {
		const responses = await Promise.all([fetch(templateURL), fetch(exerciseURL), fetch(userURL)]);
		const [templates, exercises, user] = await Promise.all(
			responses.map(async (res) => res.json())
		);

		return { templates, exercises, user };
	} catch (error) {
		console.error(error);
	}
}
