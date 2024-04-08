<script>
    // @ts-nocheck
    export let list
    export let selected
    console.log(selected)
</script>

<select on:change={(event) => selected()}>
    {#each list as item}
        <option value={item}>{item.name}</option>
    {/each}
</select>