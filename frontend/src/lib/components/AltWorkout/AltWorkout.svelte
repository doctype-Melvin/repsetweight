<script>
    // @ts-nocheck
    import { muscleGroupsData, exerciseMuscleData, exercisesData, selectedMuscleGroups } from '$lib/stores.js';
    import Dropdown from "../Dropdown/Dropdown.svelte";
    import Flyout from '../Flyout/Flyout.svelte';
    import { userTemplateData } from '$lib/stores.js';

    export let deleteWorkout
    export let id

    let showFlyout = false;

    $: exerciseOptions = null

    let muscleGroupChoices = ''

    selectedMuscleGroups.subscribe(value => {
        console.log('From Subscription', value)
        muscleGroupChoices = value
    })

    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
        }
        showFlyout = !showFlyout
    }

    
    /*
    This workout component is the parent to
     a muscle group component and a child to
     the Composer.
     The Composer is where adding or deleting 
     workouts happens. 
        The workout component should allow for
        adding/changin/deleting a number of muscle group components.
            The muscle group component should allow for
            adding/changing/deleting a number of exercise components.
    Maybe modals could be used for muscle group and exercise selection.
    When selecting a muscle group, add a tag to the workout.
    Muscle group components should allow users to copy them and also select 
    a different exercise. Exercises should receive their own uid so there are 
    no duplicates in tracking progress. Allow users to add notes to their exercises.
    User should also have the option to set the initial number of sets, reps and weight for each exercise. 
    */ 

    const handleDelete = (id) => {
        exerciseOptions = null;
        deleteWorkout(id)
    }

    const props = {
        toggle: toggleFlyout,
        signal: '',
        wid: id,
    }
    
</script>

<section class="workout-container">
    <div class="buttons">
        <button type="button" on:click={() => handleDelete(id)}>X</button>
    </div>
    <p>{id}</p>
    {#if muscleGroupChoices.length > 0}
        {#each muscleGroupChoices as workout}
            {#if workout.wid === id}
                {#each workout.muscles as muscle}
                    <p>{muscle.name}</p>
                {/each}
            {/if}
        {/each}
    
    {/if}
        <button type="button" on:click={() => toggleFlyout('muscle')}>Add Muscle Group</button>
            {#if showFlyout}
            <Flyout {...props} />
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