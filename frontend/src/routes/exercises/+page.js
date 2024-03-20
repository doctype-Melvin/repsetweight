export async function load({ fetch }) {
	const response = await fetch('http://localhost:3000/api/exercises/all');
	const exercises = await response.json();

	return { exercises };
}
