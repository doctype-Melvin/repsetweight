<script>
	// @ts-nocheck
	export let list;
	export let selected;
</script>

<select on:change={(event) => selected(event.target.value)}>
	<option value="0">Select Exercise</option>
	{#each list as item}
		<option value={item.id}>{item.name}</option>
	{/each}
</select>
