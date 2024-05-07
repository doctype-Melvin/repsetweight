<script>
    //@ts-nocheck

    import { writable } from "svelte/store";
    let isDelete = writable(false);

    const toggleDelete = () => isDelete.update(value => !value);

    const handleConfirmation = () => {
        console.log('Confirm Deletion');
        removeExercise(exerciseId);
        toggleDelete()
    }

    export let exerciseId
    export let removeExercise

    
</script>

    {#if $isDelete}
        <button type="button" on:click={handleConfirmation}>&#x2714;</button>
    {:else}
        <button type="button" on:click={toggleDelete}>Delete</button>
    {/if}