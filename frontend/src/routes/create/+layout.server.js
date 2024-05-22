import { all_muscles_url } from '$env/static/private';

export async function load({ fetch }) {
	const response = await fetch(all_muscles_url);
	const muscleGroups = await response.json();

	if (!response.ok) {
		console.error('Error fetching muscle groups');
	}

	return { muscleGroups };
}
