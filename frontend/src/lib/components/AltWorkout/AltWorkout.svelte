<script>
    // @ts-nocheck
    import { muscleGroupsData, exerciseMuscleData, exercisesData } from '$lib/stores.js';
    import Dropdown from "../Dropdown/Dropdown.svelte";
    

    export let deleteWorkout
    export let id

    $: exerciseOptions = null

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