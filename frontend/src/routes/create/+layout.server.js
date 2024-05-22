import { all_muscles_url, all_exercises_and_muscles_url } from '$env/static/private';

export async function load({ fetch }) {
	try {
		const responses = await Promise.all([
			fetch(all_muscles_url),
			fetch(all_exercises_and_muscles_url)
		]);
		const [muscleGroups, exerciseMuscle] = await Promise.all(
			responses.map(async (res) => res.json())
		);

		return { muscleGroups, exerciseMuscle };
	} catch (error) {
		console.error(error);
	}
}
