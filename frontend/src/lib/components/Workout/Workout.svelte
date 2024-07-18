<script>
	// @ts-nocheck
	import Flyout from '../Flyout/Flyout.svelte';
	import MuscleCard from '../MuscleCard/MuscleCard.svelte';
	import { userTemplateData, missingClientData } from '$lib/stores.js';
	import { derived, writable } from 'svelte/store';
	import { draggable, dropzone } from '$lib/dragAndDrop';

	export let deleteWorkout;
	export let copyWorkout;
	export let id;

	// Subscribe to the userTemplateData store to get the current workout
	// and handle adding muscle groups.
	// The userTemplateData store is updated with the new muscle groups
	let currentWorkout = writable(null);
	
	const filterTemplateData = derived(userTemplateData, ($userTemplateData) => {
		if ($userTemplateData.workouts) {
			return $userTemplateData.workouts.find((workout) => workout.wid === id);
		}
		return []
	});
	
	let showFlyout = false;

	function toggleFlyout(signal) {
		if (signal) {
			props.signal = signal;
			props.wid = id;
		}
		showFlyout = !showFlyout;
	};

	function handleDeleteWorkout(id) {
		deleteWorkout(id);
	};

	const props = {
		toggle: toggleFlyout
	};

</script>

<section class="workout-container" >
	{#if $currentWorkout}
		<div class="buttons">
			<button type="button" on:click={copyWorkout(id)}>Copy Workout</button>
			<button type="button" on:click={handleDeleteWorkout(id)}>X</button>
		</div>
		<p>{id}</p>

		<!-- Drag n Drop -->
		<ul
			class="dropzone"
			use:dropzone={{
				onDropzone(startIndex, endIndex) {
					const newOrder = [...$currentWorkout.muscles];

					// When dragging and dropping a muscle group,
					// swap the dragged item's index with the item that's
					// being dropped on
					const temp = newOrder[startIndex];
					newOrder[startIndex] = newOrder[endIndex];
					newOrder[endIndex] = temp;

					currentWorkout.update((data) => {
						return { ...data, muscles: newOrder };
					});

					userTemplateData.update((data) => {
						return {
							workouts: data.workouts.map((workout) =>
								workout.wid === id ? $currentWorkout : workout
							)
						};
					});
				}
			}}
		>
			{#if $currentWorkout.muscles.length > 0}
				{#each $currentWorkout.muscles as muscle, index}
					<li
						class="draggable"
						data-index={index}
						use:draggable={{ id: muscle.id, index }}
					>
						<MuscleCard {muscle} {id} />
					</li>
				{/each}
			{:else}
				<p>No muscle group selected</p>
			{/if}
		</ul>

		<button type="button" on:click={() => toggleFlyout('muscle')}>Add Muscle Group</button>
		{#if showFlyout}
			<Flyout {...props} />
		{/if}
	{/if}
</section>

<style>
	.workout-container {
		padding: 0.25rem;
		margin: 0.25rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.dropzone:global(.droppable) {
		outline: black dashed 2px;
	}
	.dropzone:global(.droppable > *) {
		pointer-events: none;
	}

	.error {
		background-color: rgba(251, 120, 73, 0.868);
	}
</style>
