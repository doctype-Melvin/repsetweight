<script>
	// @ts-nocheck
	export let selectionData;
	export let preselectedData;
	export let submitHandler;
</script>

<form on:submit={submitHandler}>
	{#each selectionData as data}
		<!-- Checks if there are already selected muscles and adds them to the list with a checkmark -->
		{#if preselectedData}
			{#if preselectedData.find((entry) => Number(entry.id) === data.id)}
				<input type="checkbox" id={data.id} name={data.name} value={data.id} checked />
				<label for={data.id}>{data.name}</label>
			{:else}
				<input type="checkbox" id={data.id} name={data.name} value={data.id} />
				<label for={data.id}>{data.name}</label>
			{/if}
		{:else}
			<!-- No preselected muscles? No problem! Just render the list -->
			<input type="checkbox" id={data.id} name={data.name} value={data.id} />
			<label for={data.id}>{data.name}</label>
		{/if}
	{/each}
	<button type="submit" class="button-submit">Submit</button>
</form>

<style>
	form {
		display: grid;
		grid-template-columns: 0.5fr 1fr;
		gap: 1rem;
		background-color: #fff;
		padding: 1rem 0.25rem;
	}

	label {
		font-size: 1.15rem;
	}

	input[type='checkbox'] {
		margin: 0;
		padding: 0;
	}

	.button-submit {
		grid-column: 1 / -1;
		padding: 0.25rem;
		background: rgb(60, 57, 57);
		color: white;
		border: 1px solid #fff;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1.15rem;
	}
</style>
