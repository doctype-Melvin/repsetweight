<script>
    // @ts-nocheck
    export let list
    export let selected
    
</script>

<select on:change={(event) => selected(event.target.value)}>
    {#each list as item}
        <option value={item.id}>{item.name}</option>
    {/each}
</select>