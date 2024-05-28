<script>
    // @ts-nocheck
    export let selectionData
    export let preselectedData
    export let submitHandler

</script>


<form on:submit={submitHandler}>
    {#each selectionData as data}
    <!-- Checks if there are already selected muscles and adds them to the list with a checkmark -->
    {#if preselectedData}
        {#if preselectedData.find(entry => Number(entry.id) === data.id)}
            <input type="checkbox" id={data.id} name={data.name} value={data.id} checked>
            <label for={data.id}>{data.name}</label><br>
        {:else}
            <input type="checkbox" id={data.id} name={data.name} value={data.id} >
            <label for={data.id}>{data.name}</label><br>
        {/if}
    {:else}
    <!-- No preselected muscles? No problem! Just render the list -->
        <input type="checkbox" id={data.id} name={data.name} value={data.id} >
        <label for={data.id}>{data.name}</label><br>
    {/if}
    {/each}
    <button type="submit">Submit</button>
</form>