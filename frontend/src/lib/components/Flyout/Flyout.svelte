<script>
    // @ts-nocheck
    import { muscleGroupsData, userTemplateData, exerciseMuscleData, exercisesData } from "$lib/stores";
    import { derived } from "svelte/store";
    import Form from "./Form.svelte";
	import { nanoid } from "nanoid";

    export let toggle
    export let signal
    export let wid
    export let muscle
    
    
    // Sort muscle groups/exercises alphabetically
    // The component renders a list of checkboxes for each muscle group/exercise
    let muscleData = $muscleGroupsData.sort((a, b) => a.name.localeCompare(b.name))
    let filteredExercisesData = (!muscle) ? null : $exerciseMuscleData.filter(exercise => exercise.muscle_id === Number(muscle.id))
    .map(exercise => {
        return $exercisesData.find(entry => entry.id === exercise.exercise_id)
    })

    // Manage preselected muscles
    // If users want to change their muscle groups for a workout,
    // they can reopen the flyout and see the selected muscles immediately
    // A derivative of the userTemplateData store is used to filter the workout
    // and to set the preselectedMuscles value
    let preselectedMuscles = null
    let preselectedExercises = null

    // Create a derived store of user template data
    // and filter the target workout by its wid
    const filterWorkoutStore = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === wid)
    })

    // Subscribe to the derived store and set the preselectedMuscles value
    filterWorkoutStore.subscribe(value => {
        
        if (value === undefined) return
        if (signal === 'muscle') {
            preselectedMuscles = value.muscles
        } else {
            preselectedExercises = value.exercises
        }
    })

    const updateWorkoutData = (array, prop) => {
        userTemplateData.update(data => {
            const updatedWorkouts = data.workouts.map(workout => {
                if (workout.wid === wid) {
                    return {
                        ...workout,
                        [prop]: array
                    }
                } else {
                    return workout
                }
            })
            return {workouts: updatedWorkouts}
        })
        }
    
 
    const submitHandler = (event) => {
        event.preventDefault()
        // Get all checked checkboxes and create an array of objects
        const checked = Array.from(event.target.elements).filter(el => el.checked).map(el => {
            return {
                id: el.value,
                name: el.name                
            }
        })

        if (signal === 'muscle') {
           updateWorkoutData(checked, 'muscles')             
        } else {
            checked.map(exercise => {
                exercise.eid = nanoid(5);
                exercise.muscle_id = muscle.id;
                return exercise;
            })
            updateWorkoutData(checked, 'exercises')
        }
        toggle()
    }
</script>


<section class="flyout-container">
    <div class="flyout">
        <div class="flyout-header">
            <h2>Select {signal}s</h2>
            <button type="button" on:click={() => toggle()}>X</button>
        </div>
        <!-- Form for muscle groups -->
        <div class="flyout-content">
            {#if signal === 'muscle'}
            <Form selectionData={muscleData} preselectedData={preselectedMuscles} submitHandler={submitHandler} />
            {:else}
            <!-- Form for exercises -->
            <Form selectionData={filteredExercisesData} preselectedData={preselectedExercises} submitHandler={submitHandler} />
            {/if}
        </div>
        

    </div>
</section>

<style>
    .flyout-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .flyout {
        background-color: #fff;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .flyout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flyout-content {
        margin-top: 1rem;
    }
</style>