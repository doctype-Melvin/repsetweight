<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import { derived } from "svelte/store";

    export let name
    export let eid
    export let wid
    export let toggleFlyout

    const thisWorkout = derived(userTemplateData, ($userTemplateData) => {
    return $userTemplateData.workouts.find(workout => workout.wid === wid)
    })

    

    const handleDeleteExercise = (eid) => {
        // Find the target muscle group by looking for 
        // the exercise with the matching eid
        const target = $thisWorkout.muscles.find(muscle => muscle.exercises.some(exercise => exercise.eid === eid))
        
        // Remove the exercise from the target muscle group exercises array
        const updatedTargetExercises = target.exercises.filter(exercise => exercise.eid !== eid)
    
        userTemplateData.update(data => {
            const updatedWorkouts = data.workouts.map(workout => {
                if (workout.wid === wid) {
                    return {
                        ...workout,
                        muscles: workout.muscles.map(muscle => {
                            if (muscle.id === target.id) {
                                return {...muscle, exercises: updatedTargetExercises}
                            } else {
                                return muscle
                            }})
                        }
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
        <button type="button" on:click={() => handleDeleteExercise(eid)}>X</button>
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