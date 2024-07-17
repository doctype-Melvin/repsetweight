<script>
	// @ts-nocheck
	export let optionsCount;
	export let onChange;
	export let presetValue
</script>

<div>
	<select on:change={(event) => onChange(event.target.value)}>
		{#if optionsCount > 0}
			{#each Array(optionsCount) as _, i}
				<option value={i} selected={presetValue === i} >{i}</option>
			{/each}
		{/if}
	</select>
</div>
