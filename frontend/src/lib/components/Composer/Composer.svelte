<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';
    import AltWorkout from '$lib/components/AltWorkout/AltWorkout.svelte';
    import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
    import { userTemplateData } from '$lib/stores';

    let userWorkout = {
        name: '',
        description: '',
        wid: nanoid(7),
        exercises: []
    }

    userTemplateData.set({workouts: [userWorkout]})   

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

    const removeWorkoutHandler = (wid) => {
        if ($userTemplateData.workouts.length === 1) {
            userTemplateData.update({workouts: [{...userWorkout, wid: nanoid(7)}]})
            
        }
        userTemplateData.update(data => {
         return {workouts: data.workouts.filter(workout => workout.wid !== wid)}
        })
    }
</script>   



{#each $userTemplateData.workouts as workout, index}
    <Collapsible header={workout.name ? workout.name : `Workout ${index += 1}`} isOpen={true}>
        <AltWorkout deleteWorkout={removeWorkoutHandler} id={workout.wid}/>
    </Collapsible>
{/each}

<button type="button" on:click={addWorkoutHandler}> + Add Workout</button>
    

