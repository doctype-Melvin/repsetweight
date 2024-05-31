<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';
    import AltWorkout from '$lib/components/AltWorkout/AltWorkout.svelte';
    import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
    import { userTemplateData, isWriteMode } from '$lib/stores';
    import { onMount } from 'svelte';  
    import { dropzone } from '$lib/dragAndDrop';

    let userWorkout = {
        name: '',
        description: '',
        wid: nanoid(7),
        exercises: [],
        muscles: []
    }   

    onMount(() => {
        const storage = localStorage.getItem('userTemplate')
        
        if (storage) {
            userTemplateData.set(JSON.parse(storage))
        } else {
            userTemplateData.set({workouts: [userWorkout]})
        }
        
        userTemplateData.subscribe(value => {
            localStorage.setItem('userTemplate', JSON.stringify(value))
        })
    })
    
    // Handler functions for adding and removing workouts
    const addWorkoutHandler = () => {
        let newWorkout = {
            ...userWorkout,
            wid: nanoid(7)
        }
        
        userTemplateData.update(data => {
            return {workouts: [...data.workouts, newWorkout]}
        })
    }

    const copyWorkoutHandler = (wid) => {
        let workout = $userTemplateData.workouts.find(workout => workout.wid === wid)
        let newWorkout = {
            ...workout,
            wid: nanoid(7)
        }
        
        userTemplateData.update(data => {
            return {workouts: [...data.workouts, newWorkout]}
        })
    }

    const removeWorkoutHandler = (wid) => {
        if ($userTemplateData.workouts.length === 1) {
           return userTemplateData.set({workouts: [{...userWorkout, wid: nanoid(7)}]})
        } else {
            userTemplateData.update(data => {
            return {workouts: data.workouts.filter(workout => workout.wid !== wid)}
            })
        }
    }


</script>   

<section class="composer-container">
{#if $userTemplateData}
    {#each $userTemplateData.workouts as workout, index (workout.wid)}
        <Collapsible header={workout.name ? workout.name : `Workout ${index += 1}`} isOpen={true} id={workout.wid}>
            <AltWorkout deleteWorkout={removeWorkoutHandler} copyWorkout={copyWorkoutHandler} id={workout.wid}/>
        </Collapsible>
    {/each}
    {:else}
    <p>Loading workouts ....</p>
    {/if}
    {#if $isWriteMode}
    <button type="button" on:click={addWorkoutHandler}> + Add Workout</button>
    {/if}
</section>
    
<style>
    .composer-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

  

   
</style>
    

