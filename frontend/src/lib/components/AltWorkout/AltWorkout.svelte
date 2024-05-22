<script>
    // @ts-nocheck
   
    import Dropdown from "../Dropdown/Dropdown.svelte";
    

    export let deleteWorkout
    export let id

    $: isMuscleGroupSelected = false
    
</script>

<section class="workout-container">
    <div class="buttons">
        <button type="button" on:click={() => deleteWorkout(id)}>X</button>
    </div>
    <p>{id}</p>
    <Dropdown />
    {#if isMuscleGroupSelected}
        <p>Exercise (select dropdown)</p>
    {/if}
</section>

<style>
    .workout-container {
        background-color: #cacaca;
        padding: .25rem;
        margin: .25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    }   
</style>