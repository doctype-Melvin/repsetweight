export async function load({ fetch }) {
	const url = `http://localhost:3000/api/users/user/2`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const user = await response.json();
		return { user };
	} catch (error) {
		console.error(error);
	}
}
