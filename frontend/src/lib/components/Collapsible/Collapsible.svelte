<script>
	// @ts-nocheck
	import Icon from '@iconify/svelte';
	import InputContent from '../InputContent/InputContent.svelte';
	import { userTemplateData, isWriteMode, collapseWorkouts } from '$lib/stores';
	import { onMount } from 'svelte';

	export let header;
	export let isOpen = undefined;
	export let id = undefined;

	onMount(() => {
		const unsubscribe = collapseWorkouts.subscribe((value) => {
			if (value) {
				expanded = false;
				collapseWorkouts.set(false);
			}
		});
		return unsubscribe;
	});

	$: expanded = isOpen;

	function toggle() {
		expanded = !expanded;
	}

	const setWorkoutName = (name) => {
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
</script>

<div class="collapsible">
	{#if $isWriteMode}
		<InputContent content={header} element="h3" setContentHandler={setWorkoutName} />
	{:else}
		<h3>{header}</h3>
	{/if}
	<button class="button-collapse" type="button" on:click={() => toggle()}>
		<Icon icon="mdi:menu-swap" style="cursor: pointer;" />
	</button>

	<div class="collapsible-content {expanded ? 'expanded' : 'collapsed'}">
		<slot />
	</div>
</div>

<style>
	.collapsible {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: start;
		justify-content: end;
	}

	.collapsible-content {
		overflow: hidden;
		transition:
			max-height 0.3s ease-in-out,
			opacity 0.35s ease-in-out;
		grid-column: span 2;
	}

	.collapsible-content.expanded {
		max-height: 100%;
		opacity: 1;
	}

	.collapsible-content.collapsed {
		opacity: 0;
		max-height: 0;
		overflow: hidden;
	}

	h3 {
		margin: 0;
	}
</style>
