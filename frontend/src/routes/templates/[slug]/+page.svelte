<!-- Template Detail View -->
<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import Workout from '$lib/components/Workout/Workout.svelte';
	import { workoutData, exercisesData, templatesData } from '$lib/stores.js';
	import { page } from '$app/stores';

	export let data;
	let { template } = data;

	const templateID = Number($page.url.pathname.split('/')[2]);

	// Boolean to show variables if the currently active
	// template is being viewed
	

	$: workoutData.set(template.workouts);
	console.info('%c Detail View', 'color: green', template);
</script>

<section class="navigation-buttons">
	<button type="button" on:click={() => goto(`/templates`)}>All Templates</button>
	<button type="button" on:click={() => console.log(template.id)} disabled={showVariables()}
		>Set Active Template</button
	>
</section>

<h1>{template.name !== '' ? template.name : 'No data'}</h1>

{#if template.workouts.length > 0}
	{#each $workoutData as workout}
		<!-- Wrap workout in collapsible component -->
		<Workout {workout} showVariables={false} />
	{/each}
{:else}
	<p>This template has no workouts</p>
{/if}

<style>
	.navigation-buttons {
		display: flex;
		justify-content: space-between;
	}
</style>
