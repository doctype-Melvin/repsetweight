<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import { muscleGroupsData, exerciseMuscleData, collapseWorkouts } from '$lib/stores.js';
	import { getContext } from 'svelte';
	export let data;

	let { muscleGroups } = data;
	let { exerciseMuscle } = data;

	muscleGroupsData.set(muscleGroups);
	exerciseMuscleData.set(exerciseMuscle);

	$: isFlyinVisible = false;

	function toggleFlyin() {
		isFlyinVisible = !isFlyinVisible;
	}

	function cancelCreate() {
		localStorage.clear();
		goto('/');
	}

	function collapseAllWorkouts() {
		collapseWorkouts.set(true);
	}
</script>

<section>
	<p style="text-align: center;">Compose your own template</p>
	<div class="button-controls">
		<button type="button" on:click={collapseAllWorkouts}>Collapse All</button>
		<button type="button" on:click={toggleFlyin}>Save</button>
		<button type="button" class="button-cancel" on:click={cancelCreate}>Cancel</button>
	</div>
</section>
<!-- Section below will become component -->
<section class="fly{isFlyinVisible ? 'in' : 'out'}">
	<button class="close-button" type="button" on:click={toggleFlyin}>Close</button>
	<form on:submit={toggleFlyin}>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="Name your workout" />
		<label for="description">Description</label>
		<textarea id="description" name="description" placeholder="Describe your workout"
		></textarea>
		<button type="submit">Create</button>
	</form>
</section>
<slot />

<style>
	.button-controls {
		display: flex;
		gap: 2rem;
	}

	.button-cancel {
		background: crimson;
		color: #fff;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flyin,
	.flyout {
		position: absolute;
		background-color: #949494;
		padding: 2rem;
		height: 50vh;
		width: 75vw;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%);
	}

	.flyout {
		top: -100vh;
		left: 50%;
		opacity: 0;
		transition:
			top 0.5s ease-in,
			left 0.5s,
			opacity 0.5s ease-in;
	}

	.flyin {
		left: 50%;
		top: 45%;
		opacity: 1;
		transition:
			top 0.5s ease-out,
			left 0.5s,
			opacity 0.5s ease-in;
	}

	.close-button {
		position: absolute;
		top: 0;
		right: 0;
		margin: 1rem;
	}
</style>
