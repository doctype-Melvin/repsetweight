import { all_templates_url, all_exercises_url } from '$env/static/private';
export async function load({ fetch }) {
	const templateURL = all_templates_url;
	const exerciseURL = all_exercises_url;
	const userURL = `http://localhost:3000/api/users/user/2`;

	try {
		const responses = await Promise.all([
			fetch(templateURL),
			fetch(exerciseURL),
			fetch(userURL)
		]);
		const [templates, exercises, user] = await Promise.all(
			responses.map(async (res) => res.json())
		);

		return { templates, exercises, user };
	} catch (error) {
		console.error(error);
	}
}
