<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    import Dropdown from "./Dropdown.svelte";
    import IconDotsVertical from "~icons/mdi/dots-vertical"
    import { exercisesData, workoutData } from "$lib/stores.js";
    import { updateWorkoutExercise } from "$lib/dataProcessing";
    
    export let exercise;
    export let workout;
    
    const url = $page.url;
    const pathname = url.pathname
    const templateId = Number(pathname.split("/")[2]);    
    
    // List of exercises from store
    const exercises = $exercisesData;

    let isDropdown = false;
    let showExerciseList = false;
    
    const toggleDropdown = () => isDropdown = !isDropdown;
    
    const changeAction = () => {
        isDropdown = !isDropdown;
        showExerciseList = !showExerciseList;
    }

    const deleteAction = () => {
        isDropdown = !isDropdown;
        deleteExercise(exercise.id);
    }

    const changeExercise = (value) => {
        // value = new exercise id
        // findIndex can lead to interesting behavior
        // if there is a duplicate exercise in the list
        // it will replace the first one it finds
        // leading to unwanted exercise order

        const replaceAtIndex = workout.exercises.findIndex(item => item.id === exercise.id );
        const newExercise = exercises.find(exercise => exercise.id === Number(value));
        
        const modifiedWorkout = [...$workoutData].find((entry) => entry.id === workout.id);
        modifiedWorkout.exercises[replaceAtIndex] = {
            id: newExercise.id,
            name: newExercise.name,
        };

        workoutData.update((workouts) => {
            return workouts.map((workout) => {
                if (workout.id === modifiedWorkout.id) {
                    return modifiedWorkout;
                }
                return workout;
            });
        })
        
        // Write backend code to process the changes
        // and update the database
        // How do we handle this in Sveltekit?
        // Where does the fetch function live? (route?)
        updateWorkoutExercise(value, exercise.id, workout.id);
        showExerciseList = !showExerciseList
    };
    
    const deleteExercise = (value) => {
        console.log("Delete Exercise ID", value, "Workout ID", workout.id, "Template ID", templateId)
    };      
</script>

{#if exercise.id !== 0}
<section class="container">
    {#if !showExerciseList}
    <h4>{exercise.name}</h4>
    {:else}
    <Dropdown list={exercises} selected={changeExercise} />   
    {/if}
    
    <!-- Context menu with Change and Delete buttons -->
    <div class="options-container">
        <button class="icon-button" type="button" on:click={toggleDropdown}>
            <IconDotsVertical style="font-size:1.15rem" />
        </button>
        {#if isDropdown}
        <div class="dropdown">
            <button type="button" on:click={changeAction}>Change</button>
            <button type="button" on:click={deleteAction}>Delete</button>
        </div>
        {/if}
    </div>
</section>
{:else}
<button class="add-button" type="button">Add Exercise</button>
{/if}

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 1rem;
    }

    .options-container {
        position: relative;
    }

    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: .5rem;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }

    .icon-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }

    .add-button{
        display: block;
        margin: 0 auto;
        background-color: transparent;
        border: solid 1px #ccc;
        padding: 1rem;
        border-radius: 25px;
        font-size: 1rem;
    }
</style>