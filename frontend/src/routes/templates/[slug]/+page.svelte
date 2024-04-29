<!-- Template Detail View -->

<script>
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/Workout.svelte';
    import { workoutData, exercisesData, userData } from '$lib/stores.js';
    import { page } from '$app/stores';
    export let data;
    let { template } = data
    let { exercises } = data
    
    // If the viewed tempalte is the active template, show workout variables
    let showVariables = () => {
        return (Number($page.url.pathname.split('/')[2]) === $userData.active_template);
    }

    
    $: exercisesData.set(exercises);
    $: workoutData.set(template.workouts);
</script>

<h1>{template.name !== "" ? template.name : "No data"}</h1>

    {#if template.workouts.length > 0}
        {#each $workoutData as workout}
            <Workout workout={workout} showVariables={showVariables()} />
        {/each}
    {:else}
        <p>This template has no workouts</p>
    {/if}
    
<section class="navigation-buttons">
    <button type="button" on:click={() => goto(`/templates`)}>All Templates</button>
    <button type="button" on:click={() => console.log(template.id)} disabled="{showVariables()}">Set Active Template</button>
</section>

<style>
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
    }
</style>