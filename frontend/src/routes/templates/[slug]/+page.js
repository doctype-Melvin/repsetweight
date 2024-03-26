export async function load({ fetch, params }) {
	const response = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);
	const template = await response.json();

	const workouts = await fetch(
		`http://localhost:3000/api/templates/detail/${params.slug}/workouts`
	);
	const workoutsJSON = await workouts.json();

	return { template, workoutsJSON };
}
