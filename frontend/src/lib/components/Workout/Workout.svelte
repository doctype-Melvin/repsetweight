<script>
    // Workout Component
    // @ts-nocheck

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
				name: newExercise.name
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

    const changeExercise = (oldID, newID) => {
        const newExercise = $exercisesData.find((exercise) => exercise.id === Number(newID));
        const index = workout.exercises.findIndex(item => item.id === Number(oldID));
        workout.exercises[index] = {
            id: newExercise.id,
            name: newExercise.name
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

    const setReps = (number) => {
        console.log('Reps:', number);
    }

    const setSets = (number) => {
        console.log('Sets:', number);
    }

    const setWeight = (number) => {
        console.log('Weight:', number);
    }

    const removeExercise = (id) => {
        const index = workout.exercises.findIndex(item => item.id === Number(id));
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

<h3>{workout.name}</h3>
    <table>
        <thead>
            <tr>
                <th>Exercise</th>
                {#if showVariables}
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                {/if}
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#if workout.exercises.length > 0}
            {#each workout.exercises as exercise}
            <tr>
                <td>
                    <Exercise workout={workout} exercise={exercise} swapFunction={changeExercise}/>
                </td>
                {#if showVariables}
                <td>
                    <RepSelect setter={setReps}/>
                </td>
                <td>
                    <SetSelect setter={setSets}/>
                </td>
                <td>
                    <WeightInput setter={setWeight}/>
                </td>
                {/if}
                <td>
                    <DeleteButton removeExercise={removeExercise} exerciseId={exercise.id}/>
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
  
</style>