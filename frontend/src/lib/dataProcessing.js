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
			const response = await result.json();
			console.log('%c Error submitting template', 'color: red;', response.message);
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

/*
	Client side data validation
*/

// Data coming from Composer

/* 
go through data 
if workout 
and no muscles
add warning with workout details and muscle name
if muscle
and no exercises
add warning with muscle details and exercise name
if exercise 
and no baseline values
add warning with exercise details 
 */

export function validateTemplateData(data) {
	const warnings = [];

	for (const workout of data) {
		if (workout.muscles.length === 0) {
			console.log('workout missing muscles');
			warnings.push({
				type: 'workout',
				data: workout,
				message: `${workout.name} is missing target muscle groups and exercises`
			});
		}

		if (workout.muscles.length > 0) {
			for (const muscle of workout.muscles) {
				if (muscle.exercises.length === 0) {
					console.log('muscle missing exercises');
					warnings.push({
						type: 'muscle',
						data: muscle,
						message: `${muscle.name} in ${workout.name} is missing exercises`
					});
				}

				if (muscle.exercises.length > 0) {
					for (const exercise of muscle.exercises) {
						for (const variable in exercise.baseline) {
							if (variable !== 'weight' && exercise.baseline[variable] === 0) {
								warnings.push({
									type: 'exercise',
									data: exercise,
									message: `${workout.name} is missing ${variable} for ${exercise.name}`
								});
							}
						}
					}
				}
			}
		}
	}

	return warnings;
}
