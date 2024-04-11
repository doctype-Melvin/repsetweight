<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    import Dropdown from "./Dropdown.svelte";
    import IconDotsVertical from "~icons/mdi/dots-vertical"
    import { exercisesData } from "$lib/stores.js";
    
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
        console.log("Replace Exercise ID", exercise.id ,"New Exercise ID", value, "Workout ID", workout.id, "Template ID", templateId)
        showExerciseList = !showExerciseList
    };

    const deleteExercise = (value) => {
        console.log("Delete Exercise ID", value, "Workout ID", workout.id, "Template ID", templateId)
    };
    
</script>

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
</style>