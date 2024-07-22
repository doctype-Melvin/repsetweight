<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import {
		muscleGroupsData,
		exerciseMuscleData,
		collapseWorkouts,
		missingClientData,
		userTemplateData
	} from '$lib/stores.js';
	import { validationResult } from '$lib/dataProcessing.js';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Composer from '$lib/components/Composer/Composer.svelte';
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
		console.clear();
		goto('/');
	}

	function collapseAllWorkouts() {
		collapseWorkouts.set(true);
	}

	function handleSaveButtonClick() {
		const storageData = JSON.parse(localStorage.getItem('userTemplate')) || '[]';
		const caughtWarnings = validationResult(storageData);

		if (caughtWarnings.length > 0) {
			missingClientData.set(caughtWarnings);
			console.log(caughtWarnings);
			return;
		}

		if (caughtWarnings.length === 0) {
			toggleFlyin();
		}
	}

	// This function is envoked through use:enhance action in the form element
	// It merges the data from local storage with the form data
	// sends it to the server and
	// receives the request result

	async function mergeLocalStorageData(formData) {
		const fromLocalStorage = JSON.parse(localStorage.getItem('userTemplate')) || '{}';

		if (!fromLocalStorage.workouts) {
			alert('No workouts found');
			return;
		}
		for (const key in fromLocalStorage) {
			const workoutsArray = [...fromLocalStorage[key]];
			formData.append(key, JSON.stringify(workoutsArray));
		}

		toggleFlyin();

		return ({ result }) => {
			if (result.data.status !== 200) {
				alert(`${result.data.message}`);
			} else {
				console.log('Redirect to template detail page');
			}
		};
	}
</script>

<section>
	<p style="text-align: center;">Compose your own template</p>
	<div class="button-controls">
		<button type="button" on:click={collapseAllWorkouts}>Collapse All</button>
		<button type="button" on:click={handleSaveButtonClick}>Save</button>
		<button type="button" class="button-cancel" on:click={cancelCreate}>Cancel</button>
	</div>
</section>

<section class="fly{isFlyinVisible ? 'in' : 'out'}">
	<button class="close-button" type="button" on:click={toggleFlyin}>Close</button>
	<!-- use:enhance gets called before the
	  post request is  sent to the server -->
	<form method="POST" use:enhance={({ formData }) => mergeLocalStorageData(formData)}>
		<label for="name">Name</label>
		<input type="text" id="name" name="name" placeholder="Name your workout" required />
		<label for="description">Description</label>
		<textarea id="description" name="description" placeholder="Describe your workout"
		></textarea>
		<button type="submit">Save Template</button>
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
