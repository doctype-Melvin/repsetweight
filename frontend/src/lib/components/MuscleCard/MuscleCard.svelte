<script>
    // @ts-nocheck
	import { userTemplateData } from "$lib/stores";

    import Flyout from "../Flyout/Flyout.svelte";
    import Exercise from "../Exercise/Exercise.svelte";
    import Table from "../Tables/Table.svelte";
    import { derived } from "svelte/store";

    export let id
    export let muscle;

    const workoutData = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })

    let showFlyout = false;

    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
            props.muscle = muscle;
        }
        showFlyout = !showFlyout
    }

    const handleDeleteMuscle = () => {
        const updatedWorkoutMuscles = $workoutData.muscles.filter(item => item.id !== muscle.id)
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

    const columns = ['Name', 'Sets', 'Reps', 'Weight']

    
</script>

<section class="card">
    <div class="card-header">
        <span class="card-name">{muscle.name}</span>
        <button type="button" on:click={handleDeleteMuscle}>X</button>
    </div>
    <!-- Drag n drop -->
    <div class="exercises-container">
        {#each $workoutData.muscles as group}
        {#if group.id === muscle.id }
        {#if group.exercises.length === 0}
        <p>No exercises added yet</p>
        {:else}
        <!-- {#each group.exercises as exercise} -->
        <Table columns={columns} rowData={group.exercises} type={"exercise"}/>
        <!-- <Exercise name={exercise.name} eid={exercise.eid} wid={id} {toggleFlyout}/>  -->
        <!-- {/each} -->
        {/if}
        {/if}
        {/each}
    </div>
    <button type="button" on:click={() => toggleFlyout('exercise')}>Add Exercise</button>
    {#if showFlyout}
        <Flyout {...props} />
    {/if}
</section>

<style>
    .card {
        display: grid;
        gap: 1rem;
        margin-bottom: .5rem;
        background-color: beige;
    }

    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

    .card-name {
        background: #fff;
        border: 3px solid red;
        padding: .25rem;
    }

    .exercises-container {
        display: grid;
        gap: .5rem;
        width: 100%;
        
    }
</style>