<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';
    import AltWorkout from '$lib/components/AltWorkout/AltWorkout.svelte';
    import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
    import { userTemplateData } from '$lib/stores';

    console.info('%c Composer loaded', 'color: #4CAF50; font-weight: bold;')
    
    let userWorkout = {
        name: '',
        description: '',
        wid: nanoid(7),
        exercises: []
    }

    let workoutsArray = [userWorkout]

    userTemplateData.set(workoutsArray)   


    // Handler functions for adding and removing workouts
    const addWorkoutHandler = () => {
        let newWorkout = {
            ...userWorkout,
            wid: nanoid(7)
        }
        workoutsArray = [...workoutsArray, newWorkout]
        userTemplateData.set(workoutsArray)
    }

    const removeWorkoutHandler = (wid) => {
        if (workoutsArray.length === 1) {
            workoutsArray = [{...userWorkout, wid: nanoid(7)}]
            return
        }
        workoutsArray = workoutsArray.filter(workout => workout.wid !== wid)
        userTemplateData.set(workoutsArray)
    }

</script>   



{#each workoutsArray as workout, index}
    <Collapsible header={workout.name ? workout.name : `Workout ${index += 1}`} isOpen={true}>
        <AltWorkout deleteWorkout={removeWorkoutHandler} id={workout.wid}/>
    </Collapsible>
{/each}

<button type="button" on:click={addWorkoutHandler}>Add Workout</button>
    

