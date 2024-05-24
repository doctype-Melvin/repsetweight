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
        exercises: [],
        muscles: []
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
           return userTemplateData.set({workouts: [{...userWorkout, wid: nanoid(7)}]})
        } else {
            userTemplateData.update(data => {
            return {workouts: data.workouts.filter(workout => workout.wid !== wid)}
            })
        }
        console.log($userTemplateData.workouts)
    }

</script>   

{#each $userTemplateData.workouts as workout, index (workout.wid)}
    <Collapsible header={workout.name ? workout.name : `Workout ${index += 1}`} isOpen={true}>
        <AltWorkout deleteWorkout={removeWorkoutHandler} id={workout.wid}/>
    </Collapsible>
{/each}
<button type="button" on:click={addWorkoutHandler}> + Add Workout</button>
    

