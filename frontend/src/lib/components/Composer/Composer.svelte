<script>
	// @ts-nocheck
	import { nanoid } from 'nanoid';
	import Workout from '$lib/components/Workout/Workout.svelte';
	import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
	import { userTemplateData, isWriteMode } from '$lib/stores';
	import { onMount } from 'svelte';
	import { dropzone, draggable } from '$lib/dragAndDrop';

	let userWorkout = {
		name: '',
		description: '',
		wid: nanoid(7),
		exercises: [],
		muscles: []
	};

	function numberWorkout(index) {
		return (index += 1);
	}

	onMount(() => {
		const storage = localStorage.getItem('userTemplate');

		if (storage) {
			userTemplateData.set(JSON.parse(storage));
		} else {
			userTemplateData.set({ workouts: [userWorkout] });
		}

		// Save the userTemplateData to localStorage
		// Reflects all changes made to the userTemplateData store
		// in the localStorage
		// userTemplateData.subscribe(value => {
		//     localStorage.setItem('userTemplate', JSON.stringify(value))
		// })

		const unsubscribe = userTemplateData.subscribe((value) => {
			localStorage.setItem('userTemplate', JSON.stringify(value));
		});

		return unsubscribe;
	});

	// Handler functions for adding and removing workouts
	const addWorkoutHandler = () => {
		let newWorkout = {
			...userWorkout,
			wid: nanoid(7)
		};

		userTemplateData.update((data) => {
			return { workouts: [...data.workouts, newWorkout] };
		});
	};

	const copyWorkoutHandler = (wid) => {
		let workout = $userTemplateData.workouts.find((workout) => workout.wid === wid);
		let newWorkout = {
			...workout,
			wid: nanoid(7)
		};

		userTemplateData.update((data) => {
			return { workouts: [...data.workouts, newWorkout] };
		});
	};

	const removeWorkoutHandler = (wid) => {
		if ($userTemplateData.workouts.length === 1) {
			return userTemplateData.set({ workouts: [{ ...userWorkout, wid: nanoid(7) }] });
		} else {
			userTemplateData.update((data) => {
				return { workouts: data.workouts.filter((workout) => workout.wid !== wid) };
			});
		}
	};
</script>

<section class="composer-container">
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
						header={workout.name ? workout.name : `Workout ${numberWorkout(index)}`}
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
		<button type="button" on:click={addWorkoutHandler}> + Add Workout</button>
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
