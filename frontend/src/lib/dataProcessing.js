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

export const addWorkoutExercise = async (exerciseID, workoutID) => {
	await fetch(`http://localhost:3000/api/workouts/add-exercise/${workoutID}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ exerciseID })
	}).then((res) => {
		if (!res.ok) {
			console.log('Error adding exercise');
			return;
		}
		console.log('Exercise added');
		return;
	});
};

export const deleteWorkoutExercise = async (exerciseID, workoutID) => {
	await fetch(`http://localhost:3000/api/workouts/delete-exercise/${workoutID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ exerciseID })
	}).then((res) => {
		if (!res.ok) {
			console.log('Error deleting exercise');
			return;
		}
		console.log('Exercise deleted');
		return;
	});
};
