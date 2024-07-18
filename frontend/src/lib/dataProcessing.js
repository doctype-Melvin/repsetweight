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

export function validateComposerData(workoutData) {
	const errors = [];
	/*
		The errors array should contain objects with the following structure:
		{
			message: `Please add muscle groups to ${workoutData.name}`
			workoutId: workoutData.wid,
			muscleId: muscle.id,
			exerciseId: exercise.eid
		}				

		these objects will be used to display the error messages in the UI
	*/

	// This function is part of the validation process
	// It takes a single workout and examines if:
	// 1. The workout has muscle groups
	// 2. The muscle groups have exercises
	// 3. The exercises have values
	// If any of the above conditions are not met, the function returns an error message

	if (workoutData.muscles.length === 0) {
		let error = {
			message: `Please add muscle groups to ${workoutData.name}`,
			workoutId: workoutData.wid,
			level: 'muscle'
		};

		errors.push(error);
	}

	if (workoutData.muscles.length > 0) {
		for (const muscle of workoutData.muscles) {
			let error = {
				message: `Please add exercises for ${muscle.name} in ${workoutData.name}`,
				workoutId: workoutData.wid,
				muscleId: muscle.id,
				level: 'exercise'
			};

			if (muscle.exercises.length === 0) {
				errors.push(error);
			}
		}
	}

	for (const muscle of workoutData.muscles) {
		for (const exercise of muscle.exercises) {
			const eid = exercise.eid;
			const exerciseDetails = workoutData.exercises.find((exercise) => exercise[eid]);

			let error = {
				message: `Please add the sets, reps and weight for ${exercise.name} in ${workoutData.name}`,
				workoutId: workoutData.wid,
				muscleId: muscle.id,
				exerciseId: exercise.eid,
				level: 'variables'
			};

			if (!exerciseDetails) {
				errors.push(error);
				continue;
			}

			for (const details of Object.values(exerciseDetails)) {
				const keys = ['sets', 'reps', 'weight'];

				if (Object.keys(details).length < 3) {
					const missingKeys = keys.filter((key) => !Object.keys(details).includes(key));

					let error = {
						message: `Please provide ${missingKeys.length > 1 ? missingKeys.join(' and ') : missingKeys} for ${exercise.name} in ${workoutData.name}`,
						workoutId: workoutData.wid,
						muscleId: muscle.id,
						exerciseId: exercise.eid,
						level: 'variables'
					};

					errors.push(error);
					break;
				}
			}
		}
	}

	return errors;
}

export function validationResult(userTemplateData) {
	// This function is part of the validation process
	// It takes the client data from local storage
	// and iterates through the workouts
	// calling the validation function for each workout
	let allErrors = [];

	for (const workout of userTemplateData.workouts) {
		const errorMessages = validateComposerData(workout);
		if (errorMessages) {
			allErrors = [...allErrors, ...errorMessages];
		}
	}

	return allErrors;
}

// This function will remove warnings from the store
// corresponding to the deleted component

export function removeWarnings(wid, mid, eid, warningLevel, store) {
	// The level reflects which component was deleted
	// muscle, exercise or variables
	// The id is the id of the component that was deleted

	// This needs to change it only checks the exercise id
	// The whole validation process after warnings have been set
	// needs to revalidate the data when changes occur to
	// asses if the warnings are resolved
	store.update((data) => {
		const warnings = data.filter((warning) => {
			if (warning.level !== warningLevel) {
				if (warning.workoutId !== wid) {
					if (warning.muscleID && warning.muscleID !== mid) {
						if (warning.exerciseID && warning.exerciseID !== eid) {
							return warning;
						}
					}
				}
			}
		});
		return [...warnings];
	});

	// console.log('Warnings updated', store);
}
