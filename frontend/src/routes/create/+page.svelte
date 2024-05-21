<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';

    console.info('%c Viewing create route', 'color: #4CAF50; font-weight: bold; font-size: 16px;')
    
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

{#each workoutsArray as workout}
    <div>
        <p>{workout.wid}</p>
        <button type="button" on:click={() => removeWorkoutHandler(workout.wid)}>X</button>
    </div>
{/each}

<button type="button" on:click={addWorkoutHandler}>Add Workout</button>
    

