<!-- Template Detail View -->

<script>
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/Workout.svelte';
    import { workoutData } from '$lib/stores.js';
    export let data;
    let { template } = data
    
    // Set the store with an array
    // of template workout objects
    // for optimstic updates
    // Please check where to fetch data and where to store/derive it
    // Backend code needs to handle client side changes
    $: workoutData.set(1);
    console.log("New Data", template);
    
</script>

<h1>{template.name !== "" ? template.name : "No data"}</h1>

    {#if template.workouts.length > 0}
        {#each template.workouts as workout}
            <Workout workout={workout} />
        {/each}
    {:else}
        <p>This template has no workouts</p>
    {/if}
    
<section class="navigation-buttons">
    <button type="button" on:click={() => goto(`/templates`)}>All Templates</button>
    <button type="button" on:click={() => console.log(template.id)} disabled="{template.length === 0}">Set Active Template</button>
</section>

<style>
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
    }
</style>