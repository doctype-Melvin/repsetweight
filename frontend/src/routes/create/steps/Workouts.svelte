<script>
    // @ts-nocheck
    import { exercisesData, userTemplateData } from '$lib/stores';
    import Dropdown from '$lib/components/Exercise/Dropdown.svelte';
    import Workout from '$lib/components/Workout/Workout.svelte';

    export let nextStep
    
    const exercises = $exercisesData;

    // This component should expand the 
    // object stored in localStorage
    // Create workouts seperately and store them

    // const userTemplate = JSON.parse(localStorage.getItem('template'));
    $: userTemplate = $userTemplateData ? $userTemplateData : JSON.parse(localStorage.getItem('template'));
    $: userTemplate.workouts;

    let workoutName = '';
     
    const addWorkout = (event) => {
        event.preventDefault();
        userTemplate.workouts = [...userTemplate.workouts, {
            name: workoutName,
            exercises: []
        }]
        
        userTemplateData.set(userTemplate)
        localStorage.setItem('template', JSON.stringify(userTemplate));
        workoutName = '';
    }

    const handleInput = (event) => {
        event.target.id === 'workout' ? workoutName = event.target.value : null;
    }
</script>

<form>
    <legend>Step 2: Workouts</legend>
    <label for="workout">Workout</label>
    <input type="text" id="workout" value={workoutName} on:input={handleInput} placeholder="Upper, Lower, Push..." required>
    <button type="button" on:click={addWorkout}>Add</button>
</form>

{#if userTemplate.workouts.length > 0}
    {#each userTemplate.workouts as workout}
        <Workout {workout} />
    {/each}
{/if}

<section>
    <button type="button" on:click={() => nextStep('info')}>Back</button>
    <button type="button" on:click={() => console.log('summary')}>Next</button>
</section>