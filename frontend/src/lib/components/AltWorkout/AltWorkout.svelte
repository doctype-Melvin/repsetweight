<script>
    // @ts-nocheck
    import Flyout from '../Flyout/Flyout.svelte';
    import { userTemplateData } from '$lib/stores.js';
    import { derived } from 'svelte/store';


    export let deleteWorkout
    export let id
    
    let currentWorkout = null;

    const filterWorkoutStore = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })

    filterWorkoutStore.subscribe(value => {
        currentWorkout = value
    })

    let showFlyout = false;
    
    $: exerciseOptions = null
    
    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
        }
        showFlyout = !showFlyout
    }

    const handleDelete = (id) => {
        exerciseOptions = null;
        deleteWorkout(id)
    }

    const props = {
        toggle: toggleFlyout,
    }
    
</script>

<section class="workout-container">
    {#if currentWorkout}
    <div class="buttons">
        <button type="button" on:click={handleDelete(id)}>X</button>
    </div>
    <p>{id}</p>

    {#each currentWorkout.muscles as muscle}
        <p>{muscle.name}</p>
    {/each}

        <button type="button" on:click={() => toggleFlyout('muscle')}>Add Muscle Group</button>
            {#if showFlyout}
            <Flyout {...props} />
            {/if}
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