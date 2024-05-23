<script>
    // @ts-nocheck
    export let selectionData
    export let selectionHandler = undefined
    export let selectionType = ''
    
    selectionData = selectionData.sort((a, b) => a.name.localeCompare(b.name))

    /*
    Receive signal from Composer to add another muscle group
    */ 

</script>

<section class="dropdown-container">
    <select on:change={(event) => selectionHandler(event.target.value)}>
        <option value="0" selected>Select {selectionType}</option>
        {#each selectionData as option}
            <option value={option.id} >{option.name}</option>
        {/each}
    </select>
</section>