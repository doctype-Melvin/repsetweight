export async function load({ fetch, params }) {
	// Exercises are initially fetched but
	// got lost on page reload
	// Thus placing another fetch in the route
	// Alternative: store data in local storage
	const responseExercises = await fetch('http://localhost:3000/api/exercises/all');
	const responseTemplate = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);

	const exercises = await responseExercises.json();
	const template = await responseTemplate.json();
	return { exercises, template };
}
