<script>
    // @ts-nocheck
    import Flyout from '../Flyout/Flyout.svelte';
    import MuscleExercise from '../MuscleExercise/MuscleExercise.svelte';
    import { userTemplateData } from '$lib/stores.js';
    import { derived, writable } from 'svelte/store';


    export let deleteWorkout
    export let copyWorkout
    export let id
    
    // Subscribe to the userTemplateData store to get the current workout
    // and handle adding muscle groups.
    // The userTemplateData store is updated with the new muscle groups
    let currentWorkout =writable(null);

    const filterTemplateData = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })
    
    filterTemplateData.subscribe(value => {
        
        currentWorkout.set(value)
    })

    let showFlyout = false;
        
    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
        }
        showFlyout = !showFlyout
    }

    const handleDeleteWorkout = (id) => {
        deleteWorkout(id)
    }

    const handleDeleteMuscle = (muscleID) => {
        const updatedWorkoutMuscles = $currentWorkout.muscles.filter(muscle => muscle.id !== muscleID)
        userTemplateData.update(data => {
            const updatedWorkouts = data.workouts.map(workout => {
                if (workout.wid === id) {
                    return {...workout, muscles: updatedWorkoutMuscles}
                } else {
                    return workout
                }
            })
            return {workouts: updatedWorkouts}
        })
    }

    const props = {
        toggle: toggleFlyout,
    }
    
</script>

<section class="workout-container">
    {#if $currentWorkout}
    <div class="buttons">
        <button type="button" on:click={copyWorkout(id)}>Copy Workout</button>
        <button type="button" on:click={handleDeleteWorkout(id)}>X</button>
    </div>
    <p>{id}</p>

    {#each $currentWorkout.muscles as muscle}
        <MuscleExercise {muscle} deleteHandler={handleDeleteMuscle} {id}/>
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