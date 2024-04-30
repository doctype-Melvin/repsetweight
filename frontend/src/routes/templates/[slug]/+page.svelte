<!-- Template Detail View -->
<script>
    // @ts-nocheck
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/Workout.svelte';
    import { workoutData, exercisesData, userData, templatesData } from '$lib/stores.js';
    import { page } from '$app/stores';
    
    export let data;
    let { template } = data
    let { exercises } = data
    
    const templateID = Number($page.url.pathname.split('/')[2]);
    
    // Boolean to show variables if the currently active
    // template is being viewed
    let showVariables = () => {
            return (templateID === $userData.active_template);
    }

    $: exercisesData.set(exercises);
    $: workoutData.set(template.workouts);
</script>

<section class="navigation-buttons">
    <button type="button" on:click={() => goto(`/templates`)}>All Templates</button>
    <button type="button" on:click={() => console.log(template.id)} disabled="{showVariables()}">Set Active Template</button>
</section>

    <h1>{template.name !== "" ? template.name : "No data"}</h1>
    
    {#if template.workouts.length > 0}
        {#each $workoutData as workout}
            <Workout workout={workout} showVariables={showVariables()} />
        {/each}
    {:else}
    <p>This template has no workouts</p>
    {/if}
    
<style>
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
    }
</style>