export async function load({ fetch }) {
	const data = await fetch('http://localhost:3000/api/templates/all');
	const templates = await data.json();
	return { templates };
}
