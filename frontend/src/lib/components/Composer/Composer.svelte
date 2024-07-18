<script>
	// @ts-nocheck
	import { nanoid } from 'nanoid';
	import Workout from '$lib/components/Workout/Workout.svelte';
	import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
	import { userTemplateData, isWriteMode } from '$lib/stores';
	import { onMount, setContext } from 'svelte';

	import { dropzone, draggable } from '$lib/dragAndDrop';

	onMount(() => {
		const storage = localStorage.getItem('userTemplate');

		if (storage) {
			userTemplateData.set(JSON.parse(storage));
		} else {
			userTemplateData.set({ workouts: [userWorkout] });
		}

		const unsubscribe = userTemplateData.subscribe((value) => {
			localStorage.setItem('userTemplate', JSON.stringify(value));
		});

		return unsubscribe;
	});
	
	
	let userWorkout = {
		name: 'Workout 1',
		description: '',
		wid: nanoid(7),
		exercises: [],
		muscles: []
	};

	function countWorkout(index) {
		return (index += 1);
	}

	function setWorkoutName(name) {
		let targetWorkout = $userTemplateData.workouts.find((workout) => workout.wid === id);
		targetWorkout.name = name;
		userTemplateData.update((data) => {
			return {
				workouts: data.workouts.map((workout) =>
					workout.wid === id ? targetWorkout : workout
				)
			};
		});
	};

	// Handler functions for adding and removing workouts
	function addWorkoutHandler() {
		let newWorkout = {
			...userWorkout,
			name: `Workout ${$userTemplateData.workouts.length + 1}`,
			wid: nanoid(7)
		};

		userTemplateData.update((data) => {
			return { workouts: [...data.workouts, newWorkout] };
		});
	};

	function copyWorkoutHandler(wid) {
		let workout = $userTemplateData.workouts.find((workout) => workout.wid === wid);
		let newWorkout = {
			...workout,
			name: `${workout.name} Copy`,
			wid: nanoid(7)
		};

		const newExerciseIds = newWorkout.muscles.map(muscle => ({
			...muscle,
			exercises: muscle.exercises.map(exercise => ({
				...exercise,
				eid: nanoid(5)
			}))	
		}))
		
		newWorkout.muscles = newExerciseIds;

		userTemplateData.update((data) => {
			return { workouts: [...data.workouts, newWorkout] };
		});
	};

	function removeWorkoutHandler(wid) {
		if ($userTemplateData.workouts.length === 1) {
			const newArray = [{ ...userWorkout, wid: nanoid(7) }];
			return userTemplateData.set({ workouts: newArray });
		} else {
			userTemplateData.update((data) => {
				// const filterErrors = data.errors.filter((error) => error.workoutId !== wid);
				const filterWorkouts = data.workouts.filter((workout) => workout.wid !== wid);
				return { workouts: [...filterWorkouts] };
			});
		}
	};

	
</script>

<section class="composer-container" >
	{#if $userTemplateData}
		<ul
			class="dropzone"
			use:dropzone={{
				onDropzone(startIndex, endIndex) {
					let newOrder;
					if (!newOrder) {
						newOrder = [...$userTemplateData.workouts];
					}

					// Reorder workouts based on the start and end index
					// startIndex = dragged item
					// endIndex = item being dropped on

					[newOrder[startIndex], newOrder[endIndex]] = [
						newOrder[endIndex],
						newOrder[startIndex]
					];
					userTemplateData.set({ workouts: newOrder });
				}
			}}
		>
			{#each $userTemplateData.workouts as workout, index (workout.wid)}
				<li class="draggable" data-index={index} use:draggable={{ id: workout.id, index }}>
					<Collapsible
						header={workout.name ? workout.name : `Workout ${countWorkout(index)}`}
						isOpen={true}
						id={workout.wid}
					>
						<Workout
							deleteWorkout={removeWorkoutHandler}
							copyWorkout={copyWorkoutHandler}
							id={workout.wid}
						/>
					</Collapsible>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Loading workouts ....</p>
	{/if}
	{#if $isWriteMode}
		<button type="button" on:click={addWorkoutHandler}>Add Workout</button>
	{/if}
</section>

<style>
	.composer-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1rem;
	}

	.dropzone {
		padding: 0;
		list-style: none;
	}
</style>
