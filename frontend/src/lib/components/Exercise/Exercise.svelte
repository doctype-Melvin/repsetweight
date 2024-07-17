<script>
	// @ts-nocheck
	import { userTemplateData } from '$lib/stores';
	import { writable, derived } from 'svelte/store';
	import Select from '../Inputs/Select.svelte';
	import { onMount } from 'svelte';

	export let name;
	export let eid;
	export let wid;
	export let toggleFlyout;

	
	onMount(() => {
		function restrictedInputValues(event) {
			const regex = /^[0-9\b]+$/;
			if (!regex.test(event.key)) {
				event.preventDefault();
			}
		}

		const weightInput = document.querySelector('.input-weight');
		weightInput.addEventListener('keypress', restrictedInputValues);
	});	

	const thisWorkout = derived(userTemplateData, ($userTemplateData) => {
		return $userTemplateData.workouts.find((workout) => workout.wid === wid);
	});

	const handleDeleteExercise = (eid) => {
		// Find the target muscle group by looking for
		// the exercise with the matching eid
		const target = $thisWorkout.muscles.find((muscle) =>
			muscle.exercises.some((exercise) => exercise.eid === eid)
		);

		// Remove the exercise from the target muscle group exercises array
		const updatedTargetExercises = target.exercises.filter((exercise) => exercise.eid !== eid);

		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((workout) => {
				if (workout.wid === wid) {
					return {
						...workout,
						muscles: workout.muscles.map((muscle) => {
							if (muscle.id === target.id) {
								return { ...muscle, exercises: updatedTargetExercises };
							} else {
								return muscle;
							}
						}),
						exercises: workout.exercises.filter((exercise) => {
							const key = Object.keys(exercise)[0];
							return key !== eid;
						})
					};
				} else {
					return workout;
				}
			});
			return { workouts: updatedWorkouts };
		});
	};

	function handleExerciseVariables(value, column, id) {
		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((workout) => {
				// Find the target workout
				if (workout.wid === wid) {
					// Check if variables exist
					if (workout.exercises.length > 0) {
						// Flag to check for existing exercise
						let existing = false;
						// Go through the exercises array
						// and find the exercise with the matching id
						const updatedExerciseVariables = workout.exercises.map((exercise) => {
							const [key, obj] = Object.entries(exercise)[0];
							if (key === id) {
								// Update the exercise with the new value
								existing = true;
								return {
									[key]: {
										...obj,
										[column]: value
									}
								};
							}
							return exercise;
						});
						// If the exercise doesn't exist, add it to the array
						if (!existing) {
							updatedExerciseVariables.push({ [id]: { [column]: value } });
						}
						workout.exercises = updatedExerciseVariables;
						return workout;
					} else {
						// If the exercises array is empty, add the exercise
						workout.exercises = [{ [id]: { [column]: value } }];
						return workout;
					}
				} else {
					return workout;
				}
			});
			return { workouts: updatedWorkouts };
		});
	}

	// Function to get exercise variable values from local storage
	function getVariableValue(exerciseID, variable) {
		const storageData = JSON.parse(localStorage.getItem('userTemplate')) || '[]';
		
		if (storageData.workouts) {
			
			const workout = storageData.workouts.find((workout) => workout.wid === wid);
			const exercise = workout.exercises.find((exercise) => exercise[exerciseID]);
			
			if (exercise) {
				const [key, obj] = Object.entries(exercise)[0];
				return ((obj[variable]) === undefined) ? '' : Number(obj[variable]);
			}
			
			return 0;
		}
	}

</script>

<section class="card" data-exerciseId={eid}>
	<div class="card-content">
		<button type="button" on:click={toggleFlyout('exercise')}>{name}</button>
		<Select
			optionsCount={21}
			onChange={(value) => handleExerciseVariables(value, 'sets', eid)}
			presetValue={getVariableValue(eid, 'sets')}
		/>
		<Select
			optionsCount={21}
			onChange={(value) => handleExerciseVariables(value, 'reps', eid)}
			presetValue={getVariableValue(eid, 'reps')}
		/>
		<input
			type="tel"
			name="weight"
			class="input-weight"
			value={getVariableValue(eid, 'weight')}
			min="0"
			max="1000"
			on:input={(event) => handleExerciseVariables(event.target.value, 'weight', eid)}
			
		/>
		<button
			type="button"
			class="button-remove-exercise"
			on:click={() => handleDeleteExercise(eid)}>X</button
		>
	</div>
</section>

<style>
	.card {
		width: 100%;
	}

	.card-content {
		margin: 0 auto;
		width: 100%;
		display: grid;
		gap: 0.75rem;
		grid-template-columns: 1.5fr repeat(3, 1fr) 0.5fr;
		align-items: center;
	}

	.input-weight {
		width: 55px;
	}

	.button-remove-exercise {
		width: fit-content;
		margin: 0 auto;
	}
</style>
