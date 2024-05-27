<script>
    // @ts-nocheck
    import Flyout from '../Flyout/Flyout.svelte';
    import { userTemplateData } from '$lib/stores.js';
    import { derived } from 'svelte/store';


    export let deleteWorkout
    export let copyWorkout
    export let id
    
    // Subscribe to the userTemplateData store to get the current workout
    // and handle adding muscle groups.
    // The userTemplateData store is updated with the new muscle groups
    let currentWorkout = null;

    const filterWorkoutStore = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })

    filterWorkoutStore.subscribe(value => {
        currentWorkout = value
    })

    let showFlyout = false;
    
    // This is part of filtering the exercises for each selected muscle group
    // and might be moved to the future muscle groups component
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
        <button type="button" on:click={copyWorkout(id)}>Copy</button>
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