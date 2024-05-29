<script>
    // @ts-nocheck
	import { userTemplateData } from "$lib/stores";

    import Flyout from "../Flyout/Flyout.svelte";
    import Exercise from "../Exercise/Exercise.svelte";
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
        const updatedWorkoutExercises = $workoutData.exercises.filter(exercise => exercise.muscle_id !== muscle.id)
        const updatedWorkoutMuscles = $workoutData.muscles.filter(item => item.id !== muscle.id)
        userTemplateData.update(data => {
            const updatedWorkouts = data.workouts.map(workout => {
                if (workout.wid === id) {
                    return {...workout, muscles: updatedWorkoutMuscles, exercises: updatedWorkoutExercises}
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

<section class="card">
    <div>
        <span>{muscle.name}</span>
        <button type="button" on:click={handleDeleteMuscle}>X</button>
    </div>
    {#if $workoutData.exercises}
        {#each $workoutData.exercises as exercise}
            {#if exercise.muscle_id === muscle.id}
                <Exercise name={exercise.name} eid={exercise.eid} wid={id} {toggleFlyout}/>
            {/if}
        {/each}
    {/if}
    <button type="button" on:click={() => toggleFlyout('exercise')}>Add Exercise</button>
    {#if showFlyout}
        <Flyout {...props} />
    {/if}
</section>