<script>
	// @ts-nocheck
	import {
		muscleGroupsData,
		userTemplateData,
		exerciseMuscleData,
		exercisesData,
		scrollPosition
	} from '$lib/stores';
	import { derived } from 'svelte/store';
	import Form from './Form.svelte';
	import { nanoid } from 'nanoid';
	import { onMount } from 'svelte';

	export let toggle;
	export let signal;
	export let wid;
	export let muscle;

	// ---- scroll handling
	let flyoutRef;
	let scrollY;

	scrollPosition.subscribe((value) => {
		scrollY = value;
		if (flyoutRef) {
			flyoutRef.style.top = scrollY + 'px';
		}
	});

	onMount(() => {
		if (flyoutRef) {
			flyoutRef.style.top = scrollY + 'px';
		}
	});

	// Sort muscle groups/exercises alphabetically
	// The component renders a list of checkboxes for each muscle group/exercise
	let muscleData = $muscleGroupsData.sort((a, b) => a.name.localeCompare(b.name));
	let filteredExercisesData = !muscle
		? null
		: $exerciseMuscleData
				.filter((exercise) => exercise.muscle_id === Number(muscle.id))
				.map((exercise) => {
					return $exercisesData.find((entry) => entry.id === exercise.exercise_id);
				});

	// Manage preselected muscles
	// If users want to change their muscle groups for a workout,
	// they can reopen the flyout and see the selected muscles immediately
	// A derivative of the userTemplateData store is used to filter the current workout
	// and to set the preselectedMuscles value
	let preselectedMuscles = null;
	let preselectedExercises = [];

	// Create a derived store of user template data
	// and filter the target workout by its wid
	const filterWorkoutStore = derived(userTemplateData, ($userTemplateData) => {
		return $userTemplateData.workouts.find((workout) => workout.wid === wid);
	});

	// Subscribe to the derived store and set the preselected data value
	filterWorkoutStore.subscribe((value) => {
		if (value === undefined) return;
		if (signal === 'muscle') {
			preselectedMuscles = value.muscles;
		} else {
			// preselectedExercises = value.muscles.filter(entry => entry.id === muscle.id)?.[0].exercises
			let result = value.muscles.filter((entry) => entry.id === muscle.id);
			if (result.length > 0) {
				preselectedExercises = result[0].exercises;
			} else {
				preselectedExercises = [];
			}
		}
	});

	const updateWorkoutData = (array, prop) => {
		// Update muscle groups for workout
		// if user adds a new muscle group
		// copy the previous muscle groups (if any) and add the new one

		const mergedArray = array.map((checkbox) => {
			if ($filterWorkoutStore.muscles.length > 0) {
				const existingMuscle = $filterWorkoutStore.muscles.find(
					(muscle) => muscle.id === checkbox.id
				);
				if (existingMuscle) {
					return existingMuscle;
				} else {
					return checkbox;
				}
			} else {
				return checkbox;
			}
		});

		if (prop === 'muscles') {
			userTemplateData.update((data) => {
				const updatedWorkouts = data.workouts.map((workout) => {
					if (workout.wid === wid) {
						return {
							...workout,
							[prop]: mergedArray
						};
					} else {
						return workout;
					}
				});
				return { workouts: updatedWorkouts };
			});
		} else {
			// Update exercises for muscle group
			// returns array of muscles with
			// updated exercises
			let updatedMuscles = $filterWorkoutStore.muscles.map((entry) => {
				if (entry.id === muscle.id) {
					return {
						...entry,
						exercises: array
					};
				} else {
					return entry;
				}
			});

			// Update the userTemplateData store
			userTemplateData.update((data) => {
				const updatedWorkouts = data.workouts.map((workout) => {
					if (workout.wid === wid) {
						return {
							...workout,
							muscles: [...updatedMuscles]
						};
					} else {
						return workout;
					}
				});
				return { workouts: updatedWorkouts };
			});
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();
		// Get all checked checkboxes and create an array of objects
		const checked = Array.from(event.target.elements)
			.filter((el) => el.checked)
			.map((el) => {
				return {
					id: el.value,
					name: el.name
				};
			});

		if (signal === 'muscle') {
			// Map over checked muscle groups
			// and add an empty exercise array to each
			checked.map((muscle) => {
				muscle.exercises = [];
			});
			updateWorkoutData(checked, 'muscles');
		} else {
			if (preselectedExercises.length === 0) {
				checked.map((exercise) => {
					exercise.eid = nanoid(5);
					exercise.muscle_id = muscle.id;
					exercise.baseline = {
						sets: 0,
						reps: 0,
						weight: 0
					};
				});
			} else {
				checked.map((exercise) => {
					exercise.eid =
						preselectedExercises.find((entry) => entry.id === exercise.id)?.eid ||
						nanoid(5);
					exercise.muscle_id = muscle.id;
					exercise.baseline = preselectedExercises.find(
						(entry) => entry.id === exercise.id
					)?.baseline || {
						sets: 0,
						reps: 0,
						weight: 0
					};
				});
			}
			updateWorkoutData(checked, 'exercises');
		}

		toggle();
	};
</script>

<section class="flyout-container" bind:this={flyoutRef}>
	<div class="flyout">
		<div class="flyout-header">
			<h2>Select {signal}s</h2>
			<button type="button" on:click={() => toggle()}>X</button>
		</div>
		<!-- Form for muscle groups -->
		<div class="flyout-form">
			{#if signal === 'muscle'}
				<Form
					selectionData={muscleData}
					preselectedData={preselectedMuscles}
					{submitHandler}
				/>
			{:else}
				<!-- Form for exercises -->
				<Form
					selectionData={filteredExercisesData}
					preselectedData={preselectedExercises}
					{submitHandler}
				/>
			{/if}
		</div>
	</div>
</section>

<style>
	.flyout-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow-y: auto;
		backdrop-filter: blur(2px);
		animation-name: fadeIn;
		animation-duration: 0.5s;
	}

	.flyout {
		background-color: #929488;
		padding: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		width: 100%;
	}

	.flyout-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.flyout-form {
		margin-top: 0rem;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
