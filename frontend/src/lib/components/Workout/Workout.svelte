<script>
    // Workout Component

    // May 9th: This component has many similar functions
    // that can be refactored into single functions
    
    // @ts-nocheck
    import { nanoid } from "nanoid";
    import { writable } from "svelte/store";
    import { exercisesData, userTemplateData } from "$lib/stores";
    import Dropdown from "../Exercise/Dropdown.svelte";
    import Exercise from "../Exercise/Exercise.svelte";
	import RepSelect from "../Exercise/RepSelect.svelte";
    import SetSelect from "../Exercise/SetSelect.svelte";
    import WeightInput from "../Exercise/WeightInput.svelte";
    import DeleteButton from "../Exercise/DeleteButton.svelte";
    
    
    export let workout;
    export let showVariables;

    let showDropdown = writable(false);
    
    const toggleDropdown = () => showDropdown.update(value => !value);
        
    const addExercise = (exerciseID) => {
        const newExercise = $exercisesData.find((exercise) => exercise.id === Number(exerciseID));
		workout.exercises = [
			...workout.exercises,
			{
				id: newExercise.id,
				name: newExercise.name,
                uid: nanoid(7),
                variables: {
                    reps: 0,
                    sets: 0,
                    weight: 0
                }
			}
		];

        userTemplateData.update((template) => {
            return {
                ...template,
                workouts: template.workouts.map((entry) => {
                    if (entry.name === workout.name) {
                        return {
                            ...entry,
                            exercises: workout.exercises
                        }
                    }
                    return entry;
                })
            }
        });

        localStorage.setItem('template', JSON.stringify($userTemplateData));
    
        toggleDropdown()
    }

    const changeExercise = (previousUID, newID) => {
        const newExercise = $exercisesData.find((exercise) => exercise.id === Number(newID));
        const index = workout.exercises.findIndex(item => item.uid === previousUID);
        const previousExercise = workout.exercises[index];   
        workout.exercises[index] = {
            id: newExercise.id,
            name: newExercise.name,
            uid: nanoid(7),
            variables: previousExercise.variables
        }
        
        userTemplateData.update((template) => {
            return {
                ...template,
                workouts: template.workouts.map((entry) => {
                    if (entry.wid === workout.wid) {
                        return {
                            ...entry,
                            exercises: workout.exercises
                        }
                    }
                    return entry;
                })
            }
        });

        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    const removeExercise = (id) => {
        const index = workout.exercises.findIndex(item => item.uid === id);
        workout.exercises.splice(index, 1);
        userTemplateData.update((template) => {
            return {
                ...template,
                workouts: template.workouts.map((entry) => {
                    if (entry.wid === workout.wid) {
                        return {
                            ...entry,
                            exercises: workout.exercises
                        }
                    }
                    return entry;
                })
            }
        });
        
        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    
    const setReps = (number, exerciseID, workoutID) => {
        const workoutExerciseReps = $userTemplateData.workouts.find((workout) => workout.wid === workoutID).exercises
        .find(exercise => exercise.uid === exerciseID).variables;
        workoutExerciseReps.reps = Number(number);

        userTemplateData.update(template => {
            return {
                ...template,
                workouts: template.workouts.map(entry => {
                    if (entry.wid === workoutID) {
                        return {
                            ...entry,
                            exercises: entry.exercises.map(exercise => {
                                if (exercise.uid === exerciseID) {
                                    return {
                                        ...exercise,
                                        variables: workoutExerciseReps
                                    }
                                }
                                return exercise
                            })
                        }
                    }
                    return entry
                })
            }
        })
        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    const setSets = (number, exerciseID, workoutID) => {
        
        const workoutExerciseSets = $userTemplateData.workouts.find((workout) => workout.wid === workoutID).exercises
        .find(exercise => exercise.uid === exerciseID).variables;
        workoutExerciseSets.sets = Number(number);
        
        userTemplateData.update(template => {
            return {
                ...template,
                workouts: template.workouts.map(entry => {
                    if (entry.wid === workoutID) {
                        return {
                            ...entry,
                            exercises: entry.exercises.map(exercise => {
                                if (exercise.uid === exerciseID) {
                                    return {
                                        ...exercise,
                                        variables: workoutExerciseSets
                                    }
                                }
                                return exercise
                            })
                        }
                    }
                    return entry;
                })
            }
        })
        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    const setWeight = (number, exerciseID, workoutID) => {
        
        const workoutExerciseWeight = $userTemplateData.workouts.find((workout) => workout.wid === workoutID).exercises
        .find(exercise => exercise.uid === exerciseID).variables;
        workoutExerciseWeight.weight = Number(number);
        
        userTemplateData.update(template => {
            return {
                ...template,
                workouts: template.workouts.map(entry => {
                    if (entry.wid === workoutID) {
                        return {
                            ...entry,
                            exercises: entry.exercises.map(exercise => {
                                if (exercise.uid === exerciseID) {
                                    return {
                                        ...exercise,
                                        variables: workoutExerciseWeight
                                    }
                                }
                                return exercise
                            })
                        }
                    }
                    return entry;
                })
            }
        })
        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    const copyWorkout = (workoutID) => {
        const workoutToCopy = $userTemplateData.workouts.find(workout => workout.wid === workoutID);
        const newWorkout = {
            name: workoutToCopy.name,
            description: workoutToCopy.description,
            wid: nanoid(7),
            exercises: workoutToCopy.exercises
        }
        userTemplateData.update(template => {
            return {
                ...template,
                workouts: [...template.workouts, newWorkout]
            }
        })

        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

    const deleteWorkout = (workoutID) => {
        const index = $userTemplateData.workouts.findIndex(workout => workout.wid === workoutID);
        $userTemplateData.workouts.splice(index, 1);
        userTemplateData.set($userTemplateData);
        localStorage.setItem('template', JSON.stringify($userTemplateData));
    }

</script>

<div class="header-workout">
    <button type="button" on:click={() => copyWorkout(workout.wid)}>Copy</button>
    <button type="button" on:click={() => deleteWorkout(workout.wid)}>Delete</button>
</div>
    <table>
        <thead>
            <tr>
                {#if workout.exercises.length > 0}
                <th>Exercise</th>
                {#if showVariables}
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight</th>
                {/if}
                <th></th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#if workout.exercises.length > 0}
            {#each workout.exercises as exercise}
            <tr>
                <td>
                    <Exercise workout={workout} exercise={exercise} swapFunction={changeExercise} />
                </td>
                {#if showVariables}
                <td>
                    <SetSelect setter={setSets} exerciseID={exercise.uid} workoutID={workout.wid} setsValue={exercise.variables.sets}/>
                </td>
                <td>
                    <RepSelect setter={setReps} exerciseID={exercise.uid} workoutID={workout.wid} repValue={exercise.variables.reps}/>
                </td>
                <td>
                    <WeightInput setter={setWeight} exerciseID={exercise.uid} workoutID={workout.wid} weightValue={exercise.variables.weight}/>
                </td>
                {/if}
                <td>
                    <DeleteButton removeExercise={removeExercise} exerciseId={exercise.uid} />
                </td>
            </tr>
            {/each}
            {/if}
        </table>
        {#if $showDropdown}
        <Dropdown list={$exercisesData} selected={addExercise} />
        {/if}
        <button type="button" on:click={toggleDropdown}>{$showDropdown ? 'Cancel' : 'Add Exercise'}</button>

<style>
  .header-workout {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>