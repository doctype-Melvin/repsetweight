<script>
	// @ts-nocheck
	import { userTemplateData } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { submitUserTemplate } from '$lib/dataProcessing';

	export let nextStep;

	const submitAction = async (data) => {
		if (data) {
			const result = await submitUserTemplate(data);

			if (!result) {
				console.error('%c Error submitting template', 'color: red');
				return;
			}
			userTemplateData.set(null);
			localStorage.clear();
			goto(`/templates/${result.id}`);
			return;
		} else {
			userTemplateData.set(null);
			localStorage.clear();
			goto(`/templates`);
			return;
		}
	};
</script>

<section>
	{#if $userTemplateData}
		<h2>Summary</h2>
		<p>Template Name: {$userTemplateData.name}</p>
		<p>{$userTemplateData.description}</p>
		{#each $userTemplateData.workouts as workout}
			<p class="workout-name">{workout.name}</p>
			<ul class="exercise-list">
				{#each workout.exercises as exercise}
					<li>{exercise.name}</li>
				{/each}
			</ul>
		{/each}
	{:else}
		<p>Whoopsies... no data</p>
	{/if}
</section>
<section>
	<button type="button" on:click={nextStep('workouts')}>Back</button>
	<button type="button" on:click={() => submitAction($userTemplateData)}>Submit</button>
	<button type="button" on:click={() => submitAction(null)}>Cancel</button>
</section>

<style>
	.workout-name {
		font-weight: bold;
	}

	.exercise-list {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: auto;
		list-style-type: none;
	}
</style>
