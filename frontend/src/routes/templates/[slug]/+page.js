export async function load({ fetch, params }) {
	const responseExercises = await fetch('http://localhost:3000/api/exercises/all');
	const responseTemplate = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);

	const exercises = await responseExercises.json();
	const template = await responseTemplate.json();
	return { exercises, template };
}
