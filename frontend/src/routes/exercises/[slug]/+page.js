export async function load({ fetch, params }) {
	const data = await fetch(`http://localhost:3000/api/exercises/${params.slug}`);
	const exercise = await data.json();
	return { exercise };
}
