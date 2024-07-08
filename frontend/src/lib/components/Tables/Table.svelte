<script>
	// @ts-nocheck
	import { userTemplateData } from '$lib/stores';
	import Select from '../Inputs/Select.svelte';

	export let columns;
	export let rowData;
	export let type;
	export let workoutID;

	let exerciseVariables = {};

	function handleExerciseVariables(value, column, id) {
		console.log(value, column, id);
		exerciseVariables = {
			...exerciseVariables,
			[id]: {
				...exerciseVariables[id],
				[column]: value
			}
		};

		userTemplateData.update((data) => {
			const updatedWorkouts = data.workouts.map((entry) => {
				if (entry.wid === workoutID) {
					return {
						...entry,
						exercises: [...entry.exercises, exerciseVariables]
					};
				} else {
					return entry;
				}
			});
			return { workouts: updatedWorkouts };
		});
	}
</script>

<section>
	<table class="table">
		<thead>
			<tr>
				{#each columns as column}
					<th>{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			<!-- Table to render exercises -->
			{#if type === 'exercise'}
				{#each rowData as row, index}
					<tr>
						<td>{row.name}</td>
						<td>
							<Select
								optionsCount={21}
								onChange={(value) =>
									handleExerciseVariables(value, 'sets', row.eid)}
							/>
						</td>
						<td>
							<Select
								optionsCount={21}
								onChange={(value) =>
									handleExerciseVariables(value, 'reps', row.eid)}
							/>
						</td>
						<td>
							<input
								type="number"
								min="0"
								max="1000"
								name="weight"
								on:input={(event) =>
									handleExerciseVariables(event.target.value, 'weight', row.eid)}
							/>
						</td>
						<td>
							<button type="button">Remove</button>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</section>

<style>
	.table {
		width: 100%;
	}

	th:first-child,
	td:first-child {
		width: 30%;
	}
</style>
