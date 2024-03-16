export const actions = {
	default: async (event) => {}
};

export async function load({ cookies }) {
	const userCookie = cookies.get('session_id');
	console.log(cookies.get('session_id'));
	if (userCookie) {
		const userDetail = await fetch('http://localhost:3000/api/users/get-user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ user_id: userCookie })
		}).then((res) => {
			if (!res.ok) {
				console.log('Failed to get user');
			} else {
				console.log('Successfull get user');
				return res.json();
			}
		});
	} else {
		console.log('No user cookie');
	}
}
