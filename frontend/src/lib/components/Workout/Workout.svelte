<script>
    // Workout Component
    // @ts-nocheck

    import { writable } from "svelte/store";
    import { exercisesData } from "$lib/stores";
    import Dropdown from "../Exercise/Dropdown.svelte";
    import Exercise from "../Exercise/Exercise.svelte";
	import RepSelect from "../Exercise/RepSelect.svelte";
    import SetSelect from "../Exercise/SetSelect.svelte";
    import WeightInput from "../Exercise/WeightInput.svelte";
    export let workout;
    export let showVariables;
    let showDropdown = writable(false);
    let changeExercise = writable(false);

    const toggleDropdown = () => showDropdown.update(value => !value);
    const toggleChangeExercise = () => changeExercise.update(value => !value);
    const tempFn = (value) => {
        console.info(value)
        toggleChangeExercise()
    }

</script>

<!-- 
    Component only renders
    exercise variables if the
    template is the active template
-->

<h3> {workout.name}</h3>

    <table>
        <thead>
            <tr>
                <th>Exercise</th>
                {#if showVariables}
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                {/if}
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#if workout.exercises.length > 0}
            {#each workout.exercises as exercise}
            <tr>
                <td>
                    <Exercise workout={workout} exercise={exercise} />
                </td>
                <!-- Dropdown to select exercise -->
                <!-- {#if $changeExercise}
                <td>
                    <Dropdown list={$exercisesData} selected={tempFn} />
                </td>
                {:else}
                <td on:click={toggleChangeExercise}>{exercise.name}</td>
                {/if} -->
                {#if showVariables}
                <!-- Numbers dropdown -->
                <td>
                    <RepSelect />
                </td>
                <!-- Numbers dropdown -->
                <td>
                    <SetSelect />
                </td>
                <!-- Number input field -->
                <td>
                    <WeightInput />
                </td>
                {/if}
                <td>
                    <!-- Toggle edit view for selected exercise -->
                    <!-- When in edit view
                    change the above table data to select dropdown -->
                    <!-- Add 'save' and 'cancel' in edit view -->
                    <button type="button">Edit</button>
                </td>
            </tr>
            {/each}
            {/if}
        </table>
        {#if $showDropdown}
        <Dropdown list={$exercisesData} selected={tempFn} />
        {/if}
        <button type="button" on:click={toggleDropdown}>{$showDropdown ? 'Cancel' : 'Add Exercise'}</button>

<style>
  
</style>