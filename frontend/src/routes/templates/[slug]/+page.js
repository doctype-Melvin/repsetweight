export async function load({ fetch, params }) {
	const responseTemplate = await fetch(`http://localhost:3000/api/templates/detail/${params.slug}`);
	const template = await responseTemplate.json();

	const responseSessions = await fetch(
		`http://localhost:3000/api/templates/template-sessions/${params.slug}`
	);
	const sessions = await responseSessions.json();
	// Redesign Database first!!
	return { template, sessions };
}
