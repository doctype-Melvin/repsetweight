export async function load({ fetch, params }) {
	const responseTemplate = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);
	const template = await responseTemplate.json();
	return { template };
}
