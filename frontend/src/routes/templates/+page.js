export async function load({ fetch }) {
	const data = await fetch('http://localhost:3000/api/templates/all');
	const result = await data.json();
	return { result };
}
