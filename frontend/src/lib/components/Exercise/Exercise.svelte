<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    import Dropdown from "./Dropdown.svelte";
    import IconDotsVertical from "~icons/mdi/dots-vertical"
    import { exercisesData, workoutData, userTemplateData } from "$lib/stores.js";
    import { updateWorkoutExercise, addWorkoutExercise, deleteWorkoutExercise } from "$lib/dataProcessing";
    
    export let exercise;
    export let workout;
    
    
    const url = $page.url;
    const pathname = url.pathname.split('/').pop()
    

    $: workout.exercises;
    
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

</script>

{#if exercise.id !== 0}
<!-- render exercise components - exercise.id === 0 is reserved for the add exercise button -->
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
{:else}
<!-- render 'add exercise' button -->
<!-- show exercises list -->
{#if !showExerciseList}
<button class="add-button" type="button" on:click={changeAction}>Add Exercise</button>
{:else}
<Dropdown list={exercises} selected={addExercise} />
{/if}
{/if}

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

    .add-button{
        display: block;
        margin: 0 auto;
        background-color: transparent;
        border: solid 1px #ccc;
        padding: 1rem;
        border-radius: 25px;
        font-size: 1rem;
    }

    .add-button:hover {
        background-color: #f0f0f0;
        cursor: pointer;
    }

    .add-button:active {
        background-color: #405fc6;
        color: #fff;
        transition: .2s;
    }
</style>