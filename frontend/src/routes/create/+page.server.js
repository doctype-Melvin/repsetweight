export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries(formData);

		try {
			const response = await fetch('http://localhost:3000/api/templates/add', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				const json = await response.json();
				return json;
			}

			const json = await response.json();
			return json;
		} catch (error) {
			return error;
		}
	}
};
