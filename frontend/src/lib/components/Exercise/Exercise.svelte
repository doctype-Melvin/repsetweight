<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    import Dropdown from "./Dropdown.svelte";
    import { writable } from "svelte/store";
    import { exercisesData, workoutData, userTemplateData } from "$lib/stores.js";
    import { updateWorkoutExercise, addWorkoutExercise, deleteWorkoutExercise } from "$lib/dataProcessing";
    
    export let exercise;
    export let workout;
    
    
    const url = $page.url;
    const pathname = url.pathname.split('/').pop()
    

    $: workout.exercises;
    
    // List of exercises from store
    const exercises = $exercisesData;

    let showExerciseList = writable(false);
    const toggleExerciseList = () => showExerciseList.update(boolean => !boolean);
    
    const changeAction = () => {
        showExerciseList = !showExerciseList;
    }

    const deleteAction = () => {
        deleteExercise(exercise.id);
    }

    const addExercise = (value) => {
        // Update the preset workout
        if (pathname !== 'create') {
            const extendedWorkout = [...$workoutData].find(entry => entry.id === workout.id);
            const newExercise = exercises.find(exercise => exercise.id === Number(value));
            extendedWorkout.exercises.push({
                id: newExercise.id,
                name: newExercise.name,
            });
            
            workoutData.update((workouts) => {
                return workouts.map((workout) => {
                    if (workout.id === extendedWorkout.id) {
                        return extendedWorkout;
                    }
                    return workout;
                });
            })
            
            addWorkoutExercise(value, workout.id);
        } else {
            // Add exercise to user generated workout
            addToUserWorkout(value);
        }
        showExerciseList = !showExerciseList
    }

    const changeExercise = (value) => {
        // value = new exercise id
        // findIndex can lead to interesting behavior
        // if there is a duplicate exercise in the list
        // it will replace the first one it finds
        // leading to unwanted exercise order
        if (pathname !== 'create') {

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
            
            updateWorkoutExercise(value, exercise.id, workout.id);
        } else {
            changeInUserWorkout(value)
        }
        showExerciseList = !showExerciseList
    };
    
    const deleteExercise = (value) => {
        if (pathname !== 'create') {
            
            const modifiedWorkout = [...$workoutData].find((entry) => entry.id === workout.id);
            const index = modifiedWorkout.exercises.findIndex(item => item.id === Number(value));
            modifiedWorkout.exercises.splice(index, 1);
            
            workoutData.update((workouts) => {
                return workouts.map((workout) => {
                    if (workout.id === modifiedWorkout.id) {
                        return modifiedWorkout;
                    }
                    return workout;
                });
            });
            
            deleteWorkoutExercise(value, workout.id);
        } else {
            deleteFromUserWorkout(value);
        }
    };

    // Handle user created workout modifications
    // Add, change and delete exercises from user created workouts
    const addToUserWorkout = (value) => {
        const newExercise = exercises.find(exercise => exercise.id === Number(value));
        workout.exercises = [...workout.exercises, {
            id: newExercise.id,
            name: newExercise.name,
        }];
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
    }

    const changeInUserWorkout = (value) => {
        const newExercise = exercises.find(exercise => exercise.id === Number(value));
        const index = workout.exercises.findIndex(item => item.id === exercise.id);
        workout.exercises[index] = {
            id: newExercise.id,
            name: newExercise.name,
        }
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
    }

    const deleteFromUserWorkout = (value) => {
        
        const index = workout.exercises.findIndex(item => item.id === Number(value));
        workout.exercises.splice(index, 1);
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
    }

const dummyFn = () => {
    console.info('Change Exercise')
    toggleExerciseList()
    }
    
</script>

<section class="container">
    {#if !$showExerciseList}
    <button on:click={toggleExerciseList}>{exercise.name}</button>
    {:else}
    <Dropdown list={exercises} selected={dummyFn} />
    <button on:click={toggleExerciseList}>Cancel</button>
    {/if}    
</section>

<style>
    .container {
        text-align: center;
    }  
</style>