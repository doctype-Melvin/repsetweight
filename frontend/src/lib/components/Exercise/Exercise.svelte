<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import { derived } from "svelte/store";

    export let name
    export let eid
    export let wid
    export let toggleFlyout

    let thisWorkoutExercises = null

    const thisWorkout = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === wid)
    })

    thisWorkout.subscribe(value => {
        if (value === undefined) return 
        thisWorkoutExercises = value.exercises
    })

    const handleDeleteExercise = () => {
        const updatedWorkoutExercises = thisWorkoutExercises.filter(exercise => exercise.eid !== eid)
        userTemplateData.update(data => {
            const updatedWorkouts = data.workouts.map(workout => {
                if (workout.wid === wid) {
                    return {...workout, exercises: updatedWorkoutExercises}
                } else {
                    return workout
                }
            })
            return {workouts: updatedWorkouts}
        })
    }
</script>

<section class="card">
    <div class="card-content">
        <span on:click={toggleFlyout('exercise')}>{name}</span>
        <button type="button" on:click={handleDeleteExercise}>X</button>
    </div>
</section>

<style>
    .card {
        width: 100%;
        border: solid 3px red;
    }
    
    .card-content {
        margin: 0 auto;
        width: 75%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>