export function load({ fetch, params }) {
	return fetch(`http://localhost:3000/api/workouts/${params.slug}`)
		.then((res) => res.json())
		.then((workout) => {
			return {
				workout
			};
		});
}
