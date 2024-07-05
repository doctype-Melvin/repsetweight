<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import { derived } from "svelte/store";
    import Select from "../Inputs/Select.svelte";
    


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

    let exerciseVariables = {}

    function handleExerciseVariables(value, column, id) {
        console.log(value, column, id)
        exerciseVariables = {
            ...exerciseVariables,
            [id]: {
                ...exerciseVariables[id],
                [column]: value
            }
        }

        console.log(exerciseVariables)
        
        // userTemplateData.update(data => {
        //     const updatedWorkouts = data.workouts.map(entry => {
        //         if (entry.wid === wid) {
        //             return {
        //                 ...entry,
        //                 exercises: [...entry.exercises, exerciseVariables]
        //             }
        //         } else {
        //             return entry
        //         }
        //     })
        //     return {workouts: updatedWorkouts}
        // }
        // )
    }

    function restrictedInputValues(event) {
        const regex = /^[0-9\b]+$/;
        if (!regex.test(event.key)) {
            event.preventDefault();
        }
    }

    const weightInput = document.querySelector('.input-weight')
    weightInput.addEventListener('keypress', restrictedInputValues)

    
</script>

<section class="card">
    <div class="card-content">
        <span on:click={toggleFlyout('exercise')}>{name}</span>
        <Select optionsCount={21} onChange={(value) => handleExerciseVariables(value, 'sets', eid)} />
        <Select optionsCount={21} onChange={(value) => handleExerciseVariables(value, 'reps', eid)} />
        <input 
        type="tel"
        pattern="[0-9]*"
        name="weight"
        class="input-weight"
        min=0
        max=1000
        on:input={(event) => handleExerciseVariables(event.target.value, 'weight', eid)}
                
        />
        <button type="button" class="button-remove-exercise" on:click={() => handleDeleteExercise(eid)}>X</button>
    </div>
</section>

<style>
    .card {
        width: 100%;
    }
    
    .card-content {
        margin: 0 auto;
        width: 100%;
        display: grid;
        gap: .75rem;
        grid-template-columns: 1.5fr repeat(3, 1fr) .5fr ;
        align-items: center;
    }

    .input-weight {
        width: 55px;
    }

    .button-remove-exercise {
        width: fit-content;
        margin: 0 auto;
    }
</style>