// @ts-nocheck
export const updateWorkoutExercise = async (insertExercise, removeExercise, workoutID) => {
	await fetch(`http://localhost:3000/api/workouts/edit/${workoutID}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ insertExercise, removeExercise })
	}).then((res) => {
		if (!res.ok) {
			console.log('Error updating workout');
			return;
		}
		console.log('Workout updated');
		return;
	});
};
