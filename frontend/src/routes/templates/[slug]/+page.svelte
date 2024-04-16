<!-- Template Detail View -->

<script>
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/Workout.svelte';
    import { workoutData } from '$lib/stores.js';
    export let data;
    let { template } = data
    
    $: workoutData.set(template.workouts);
    
</script>

<h1>{template.name !== "" ? template.name : "No data"}</h1>

    {#if template.workouts.length > 0}
        {#each $workoutData as workout}
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