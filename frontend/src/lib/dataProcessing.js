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
			console.log(res.status);
			return;
		}
		console.log(res.status);
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

export const submitUserTemplate = async (templateData) => {
	console.log(templateData);
	try {
		const result = await fetch('http://localhost:3000/api/templates/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(templateData)
		});

		if (!result.ok) {
			console.log('%c Error submitting template', 'color: red;');
			return;
		}

		const response = await result.json();

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUserTemplate = async (templateID) => {
	await fetch(`http://localhost:3000/api/templates/delete/${templateID}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then(async (res) => {
		if (!res.ok) {
			console.log('Error deleting template');
			return;
		}
		const response = await res.json();
		console.log(response.message);
		return;
	});
};
