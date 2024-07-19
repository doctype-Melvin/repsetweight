<script>
	// @ts-nocheck
	import { userTemplateData } from '$lib/stores';
	import { writable, derived } from 'svelte/store';
	import Select from '../Inputs/Select.svelte';
	import { onMount } from 'svelte';

	export let name;
	export let eid;
	export let wid;
	export let baseline;
	export let toggleFlyout;

	onMount(() => {
		function restrictInput(event) {
			const input = event.target
			if (event.key === 'Backspace') {
				input.value = input.value.slice(0, -1)
			}
			const oldValue = input.value
			const newValue = input.value.replace(/[^0-9]/g, '')
			
			if (oldValue !== newValue) {
				input.value = newValue
			}	
			
		}

		const weightInputs = document.querySelectorAll('.input-weight');
		if (weightInputs.length > 0) {
			weightInputs.forEach((input) => {
				input.addEventListener('keydown', restrictInput);
				input.addEventListener('input', restrictInput);
			});
		}

		return () => {
			if (weightInputs) {
				weightInputs.forEach((weightInput) => {
					weightInput.removeEventListener('keydown', restrictInput);
					weightInput.removeEventListener('input', restrictInput);
				});
			}
		};
	});

	function deleteExercise(eid) {
		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((workout) => {
				if (workout.wid === wid) {
					return {
						...workout,
						muscles: workout.muscles.map((muscle) => {
							return {
								...muscle,
								exercises: muscle.exercises.filter(
									(exercise) => exercise.eid !== eid
								)
							};
						})
					};
				} else {
					return workout;
				}
			});
			return { workouts: updatedWorkouts };
		});
	}

	function handleExerciseVariables(data) {
		const { value, column, eid } = data;
		const updatedBaseline = { ...baseline, [column]: Number(value) };

		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((workout) => {
				if (workout.wid === wid) {
					return {
						...workout,
						muscles: workout.muscles.map((muscle) => {
							return {
								...muscle,
								exercises: muscle.exercises.map((exercise) => {
									if (exercise.eid === eid) {
										return {
											...exercise,
											baseline: updatedBaseline
										};
									} else {
										return exercise;
									}
								})
							};
						})
					};
				} else {
					return workout;
				}
			});
			return { workouts: updatedWorkouts };
		});
	}

	export function getInternalFunction() {
		return {
			deleteExercise,
			handleExerciseVariables
		}
	}

</script>

<section class="card" data-exerciseId={eid}>
	<div class="card-content">
		<button type="button" on:click={toggleFlyout('exercise')}>{name}</button>
		<Select
			optionsCount={21}
			onChange={(value) => handleExerciseVariables({ value, column: 'sets', eid })}
			presetValue={baseline.sets}
		/>
		<Select
			optionsCount={21}
			onChange={(value) => handleExerciseVariables({ value, column: 'reps', eid })}
			presetValue={baseline.reps}
		/>
		<input
			type="number"
			name="weight"
			class="input-weight"
			bind:value={baseline.weight}
			min="0"
			max="1000"
			on:input={(event) =>
				handleExerciseVariables({ value: event.target.value, column: 'weight', eid })}
		/>
		<button type="button" class="button-remove-exercise" on:click={() => deleteExercise(eid)}
			>X</button
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
