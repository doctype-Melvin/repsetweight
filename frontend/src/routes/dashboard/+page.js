let activeTemplate = 2;

export async function load({ fetch, params }) {
	const responseTemplate = await fetch(
		`http://localhost:3000/api/templates/detail/${activeTemplate}`
	);
	const template = await responseTemplate.json();
	if (!template) {
		throw new Error('Template not found');
	}

	return { template };
}
