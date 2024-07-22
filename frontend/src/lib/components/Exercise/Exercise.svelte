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

	// Handle float numbers from 
	// weight input field

	function inputRestriction(event) {
		const key = event.key;
		const currentValue = event.target.value;
		const decimalIndex =
			currentValue.lastIndexOf('.') >= 0
				? currentValue.lastIndexOf('.')
				: currentValue.lastIndexOf(',');

		
		// Allow numbers, backspace, delete, comma, and period
		if (/^[0-9\b,.]$/.test(key)) {
			// Prevent multiple decimal points or commas
			if ((key === '.' || key === ',') && currentValue === '') {
				event.preventDefault();
			}
			if ((key === '.' || key === ',') && decimalIndex !== -1) {
				event.preventDefault();
			}
			// Prevent more than two decimal places
			if (decimalIndex !== -1 && currentValue.length - decimalIndex - 1 > 1) {
				event.preventDefault();
			}
		} else if (!/^[0-9\b,.]$/.test(key)) {
			if (
				key === 'Backspace' ||
				key === 'Delete' ||
				key === 'ArrowLeft' ||
				key === 'ArrowRight' ||
				key === 'Tab'
			) {
				return;
			} else {
				event.preventDefault();
			}
		}
	}

	function getInputValue(event) {
		let weightValue = event.target.value
		return weightValue
	}

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

		const updatedBaseline = { ...baseline, [column]: value === '' ? 0 : value };

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
		};
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
			type="text"
			name="weight"
			maxlength="6"
			class="input-weight"
			pattern="[0-9]+([,\.][0-9]+)?"
			bind:value={baseline.weight}
			on:keydown={(event) => inputRestriction(event)}
			on:blur={(event) => handleExerciseVariables({value: event.target.value, column: 'weight', eid})}
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
