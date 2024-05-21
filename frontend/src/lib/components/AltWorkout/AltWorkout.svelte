<script>
    // @ts-nocheck
    console.info('%c AltWorkout Component', 'color: hotpink')

    import { writable } from 'svelte/store'

    export let deleteWorkout
    export let id

    let isMuscleGroupSelected = writable(false)
    
</script>

<section class="workout-container">
    <div class="buttons">
        <button type="button" on:click={() => deleteWorkout(id)}>X</button>
    </div>
    <p>Muscle Group (select dropdown)</p>
    {#if $isMuscleGroupSelected}
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