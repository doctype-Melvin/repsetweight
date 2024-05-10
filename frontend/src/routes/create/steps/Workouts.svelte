<script>
    // @ts-nocheck
    import { nanoid } from 'nanoid';
    import { userTemplateData } from '$lib/stores';
    import Workout from '$lib/components/Workout/Workout.svelte';
    import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';

    export let nextStep 

    $: userTemplate = $userTemplateData ? $userTemplateData : JSON.parse(localStorage.getItem('template'));
    $: workouts = [...userTemplate.workouts];

    let workoutName = '';
    let workoutDescription = '';
    
     
    const addWorkout = (event) => {
        event.preventDefault();
        const workoutID = nanoid(7);
        if (!workoutName) return;
        userTemplate.workouts = [...userTemplate.workouts, {name: workoutName, description: workoutDescription, wid: `${workoutID}`, exercises: []}];
                
        userTemplateData.set(userTemplate)
        localStorage.setItem('template', JSON.stringify(userTemplate));
        workoutName = '';
        workoutDescription = '';
    
    }

    const handleInput = (event) => {
        event.target.id === 'workout' ? workoutName = event.target.value : workoutDescription = event.target.value;
    }
</script>

<form>
    <legend>Step 2: Workouts</legend>
    <label for="workout">Workout</label>
    <input type="text" id="workout" value={workoutName} on:input={handleInput} placeholder="Upper, Lower, Push..." required>
    <label for="description">Description</label>
    <input type="text" id="description" value={workoutDescription} on:input={handleInput} placeholder="Strength, Hypertrophy, Endurance...">
    <button type="button" on:click={addWorkout}>Add</button>
</form>

{#if workouts.length > 0}
    {#each workouts as workout}
    <Collapsible header={workout}>
        <Workout {workout} showVariables={true}/>
    </Collapsible>
    {/each}
{/if}

<section>
    <button type="button" on:click={() => nextStep('info')}>Back</button>
    <button type="button" on:click={() => nextStep('')}>Next</button>
</section>