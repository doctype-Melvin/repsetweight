<script>
	// @ts-nocheck
	import { userTemplateData } from '$lib/stores';

	import Flyout from '../Flyout/Flyout.svelte';
	import Exercise from '../Exercise/Exercise.svelte';
	import { derived } from 'svelte/store';

	export let id;
	export let muscle;

    // Names of the columns for table-like grid
    const columns = ['Lift', 'Sets', 'Reps', 'Weight'];

	const workoutData = derived(userTemplateData, ($userTemplateData) => {
		return $userTemplateData.workouts.find((workout) => workout.wid === id);
	});

	let showFlyout = false;

	const toggleFlyout = (signal) => {
		if (signal) {
			props.signal = signal;
			props.wid = id;
			props.muscle = muscle;
		}
		showFlyout = !showFlyout;
	};
    
    const props = {
        toggle: toggleFlyout
    };

	const handleDeleteMuscle = () => {
		const updatedWorkoutMuscles = $workoutData.muscles.filter((item) => item.id !== muscle.id);
		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((workout) => {
				if (workout.wid === id) {
					return { ...workout, muscles: updatedWorkoutMuscles };
				} else {
					return workout;
				}
			});
			return { workouts: updatedWorkouts };
		});
	};


</script>

<section class="card">
	<div class="card-header">
		<span class="card-name">{muscle.name}</span>
		<button type="button" on:click={handleDeleteMuscle}>X</button>
	</div>
	<!-- Drag n drop -->
	<div class="exercises-container">
		{#each $workoutData.muscles as group}
			{#if group.id === muscle.id}
				{#if group.exercises.length === 0}
					<p>No exercises added yet</p>
				{:else}
                    {#each columns as column}
                        <span class="column-name">{column}</span>
                    {/each}

					{#each group.exercises as exercise}
						<div class="row-exercise">
							<Exercise
								name={exercise.name}
								eid={exercise.eid}
								wid={id}
								{toggleFlyout}
							/>
						</div>
					{/each}
				{/if}
			{/if}
		{/each}
	</div>
	<button type="button" on:click={() => toggleFlyout('exercise')}>Add Exercise</button>
	{#if showFlyout}
		<Flyout {...props} />
	{/if}
</section>

<style>
	.card {
		display: grid;
		gap: 1rem;
		margin-bottom: 0.5rem;
		background-color: beige;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.card-name {
		background: #fff;
		border: 3px solid red;
		padding: 0.25rem;
	}

	.exercises-container {
		display: grid;
		grid-template-columns: 1.5fr repeat(3, 1fr) 0.5fr;
		gap: 0.5rem;
		width: 100%;
	}

	.column-name {
		font-weight: bold;
	}

	.row-exercise {
		grid-column: span 5;
	}
</style>
