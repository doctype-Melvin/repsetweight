<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';
    import AltWorkout from '$lib/components/AltWorkout/AltWorkout.svelte';
    import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';

    console.info('%c Viewing create route', 'color: #4CAF50; font-weight: bold;')
    
    const previousTemplate = localStorage.getItem('template');
    console.info('Create Route:', JSON.parse(previousTemplate))

    let userWorkout = {
        name: '',
        description: '',
        wid: nanoid(7),
        exercises: []
    }

    $: workoutsArray = [userWorkout]

    const addWorkoutHandler = () => {
        let newWorkout = {
            ...userWorkout,
            wid: nanoid(7)
        }
        workoutsArray = [...workoutsArray, newWorkout]
    }

    const removeWorkoutHandler = (wid) => {
        if (workoutsArray.length === 1) {
            workoutsArray = [{...userWorkout, wid: nanoid(7)}]
            return
        }
        workoutsArray = workoutsArray.filter(workout => workout.wid !== wid)
    }

</script>   

<p>First show the session component and add a button to add workout session</p>

{#each workoutsArray as workout, index}
    <Collapsible header={workout.name ? workout.name : `Workout ${index += 1}`}>
        <AltWorkout />
    </Collapsible>
    <!-- <div>
        <button type="button" on:click={() => removeWorkoutHandler(workout.wid)}>X</button>
    </div> -->
{/each}

<button type="button" on:click={addWorkoutHandler}>Add Workout</button>
    

