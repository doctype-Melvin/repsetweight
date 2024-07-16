<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { muscleGroupsData, exerciseMuscleData, collapseWorkouts } from '$lib/stores.js';
	import { getContext } from 'svelte';
	import { enhance } from '$app/forms';
	export let data;

	let { muscleGroups } = data;
	let { exerciseMuscle } = data;

	muscleGroupsData.set(muscleGroups);
	exerciseMuscleData.set(exerciseMuscle);

	$: isFlyinVisible = false;

	function toggleFlyin() {
		isFlyinVisible = !isFlyinVisible;
	}

	function cancelCreate() {
		localStorage.clear();
		goto('/');
	}

	function collapseAllWorkouts() {
		collapseWorkouts.set(true);
	}

	function handleSaveButtonClick() {
		const storageData = JSON.parse(localStorage.getItem('userTemplate')) || '[]';
		// In Flyout:
		// Prevent overriding the exercises eid - should be solved

		// Check if the muscle's exercises can be found in the
		// workout's exercises array and check if all variables are set
		// Loop through workout's exercises and muscle's exercises
		// Compare if the exercises' eid is found in both arrays

		console.log(storageData);
		function validateClientData(workoutData) {
			// This function is part of the validation process
			// It takes a single workout and examines if:
			// 1. The workout has muscle groups
			// 2. The muscle groups have exercises
			// 3. The exercises have values
			// If any of the above conditions are not met, the function returns an error message

			if (workoutData.muscles.length === 0) {
				return 'Please add muscle groups to your template.';
			}

			if (workoutData.muscles[0].exercises.length === 0) {
				return 'Please add exercises to your template.';
			}

			if (workoutData.exercises.length === 0) {
				return 'Please add values to your exercises.';
			}

			for (const muscle of workoutData.muscles) {
				for (const exercise of muscle.exercises) {
					const eid = exercise.eid;
					const exerciseDetails = workoutData.exercises.find((exercise) => exercise[eid]);
					if (!exerciseDetails) {
						return 'Please set the sets, reps and weight for all exercises';
					}

					for (const details of Object.values(exerciseDetails)) {
						if (Object.keys(details).length < 3) {
							return 'Please set the sets, reps and weight for all exercises';
						}
					}
				}
			}

			return null;
		}

		function validationResult(clientData) {
			// This function is part of the validation process
			// It takes the client data from local storage
			// and iterates through the workouts
			// calling the validation function for each workout

			for (const workout of clientData.workouts) {
				const errorMessage = validateClientData(workout);
				if (errorMessage) {
					alert(errorMessage);
					return;
				}
			}
			console.log('Data is valid');
			return;
		}

		validationResult(storageData);
	}

	// This function is envoked through use:enhance action in the form element
	// It merges the data from local storage with the form data
	// sends it to the server and
	// receives the request result
	// console.log(JSON.parse(localStorage.getItem('userTemplate')))
	async function mergeLocalStorageData(formData) {
		const fromLocalStorage = JSON.parse(localStorage.getItem('userTemplate')) || '{}';

		if (!fromLocalStorage.workouts) {
			alert('No workouts found');
			return;
		} else {
			for (const key in fromLocalStorage) {
				const workoutsArray = [...fromLocalStorage[key]];
				formData.append(key, JSON.stringify(workoutsArray));
			}

			toggleFlyin();

			return ({ result }) => {
				if (result.data.status !== 200) {
					alert(`${result.data.message}`);
				} else {
					console.log('Redirect to template detail page');
				}
			};
		}
	}
</script>

<section>
	<p style="text-align: center;">Compose your own template</p>
	<div class="button-controls">
		<button type="button" on:click={collapseAllWorkouts}>Collapse All</button>
		<button type="button" on:click={handleSaveButtonClick}>Save</button>
		<button type="button" class="button-cancel" on:click={cancelCreate}>Cancel</button>
	</div>
</section>

<section class="fly{isFlyinVisible ? 'in' : 'out'}">
	<button class="close-button" type="button" on:click={toggleFlyin}>Close</button>
	<!-- use:enhance gets called before the
	  post request is  sent to the server -->
	<form method="POST" use:enhance={({ formData }) => mergeLocalStorageData(formData)}>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="Name your workout" required />
		<label for="description">Description</label>
		<textarea id="description" name="description" placeholder="Describe your workout"
		></textarea>
		<button type="submit">Save Template</button>
	</form>
</section>
<slot />

<style>
	.button-controls {
		display: flex;
		gap: 2rem;
	}

	.button-cancel {
		background: crimson;
		color: #fff;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flyin,
	.flyout {
		position: absolute;
		background-color: #949494;
		padding: 2rem;
		height: 50vh;
		width: 75vw;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%);
	}

	.flyout {
		top: -100vh;
		left: 50%;
		opacity: 0;
		transition:
			top 0.5s ease-in,
			left 0.5s,
			opacity 0.5s ease-in;
	}

	.flyin {
		left: 50%;
		top: 45%;
		opacity: 1;
		transition:
			top 0.5s ease-out,
			left 0.5s,
			opacity 0.5s ease-in;
	}

	.close-button {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}
</style>
