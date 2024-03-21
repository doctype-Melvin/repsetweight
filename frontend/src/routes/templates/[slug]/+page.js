export async function load({ fetch, params }) {
	console.log(params.slug);
	const data = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);
	const template = await data.json();

	const responseSessions = await fetch(
		`http://localhost:3000/api/templates/template-sessions/${params.slug}`
	);
	const sessions = await responseSessions.json();
	return { template };
}
