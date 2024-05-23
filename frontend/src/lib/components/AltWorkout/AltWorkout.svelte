<script>
    // @ts-nocheck
    import { muscleGroupsData, exerciseMuscleData, exercisesData } from '$lib/stores.js';
    import Dropdown from "../Dropdown/Dropdown.svelte";
    

    export let deleteWorkout
    export let id

    $: exerciseOptions = null

    /*
    This workout component is the parent to
     a muscle group component and a child to
     the create template page.
     The create template page is where adding or deleting 
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

    const setMuscleGroup = (id) => {
        const allExerciseIDs = $exerciseMuscleData.filter((item) => item.muscle_id === Number(id))
        exerciseOptions = $exercisesData.filter((item) => allExerciseIDs
        .some((exercise) => exercise.exercise_id === item.id))
        .sort((a, b) => a.name.localeCompare(b.name))
    }
    
</script>

<section class="workout-container">
    <div class="buttons">
        <button type="button" on:click={() => handleDelete(id)}>X</button>
    </div>
    <p>{id}</p>
        <Dropdown selectionData={$muscleGroupsData} selectionType='Muscle Group' selectionHandler={setMuscleGroup}/>
    {#if exerciseOptions}
        <Dropdown selectionData={exerciseOptions} selectionType='Exercise' />
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