export async function load({ fetch, params }) {
	const data = await fetch(`http://localhost:3000/api/templates/${params.slug}`);
	const result = await data.json();
	return { result };
}
