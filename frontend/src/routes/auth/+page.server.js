import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async (event) => {
		const body = await event.request.formData();
		const credentials = {
			username: body.get('username'),
			password: body.get('password')
		};

		const response = await fetch('http://localhost:3000/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		}).then((res) => {
			if (!res.ok) {
				console.log('Failed log in');
			} else {
				console.log('Successfull log in');
				redirect(308, '/login');
			}
		});
	}
};

// on:submit={
//     async (event) => {
//         event.preventDefault();
//         const form = event.currentTarget
//         const data = Object.fromEntries(new FormData(form));

//         const response = await fetch('http://localhost:3000/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(res => {
//             if (!res.ok) {
//                 console.log("Failed log in")
//             } else {
//                 console.log("Successfull log in")
//             }
//         })
//         .catch(err => {
//             console.log(err)
//         })
// }}
