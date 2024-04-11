<!-- Template Detail View -->

<script>
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/Workout.svelte';

    export let data;
    let { template } = data;
    
</script>

<h1>{template.length > 0 ? template[0].template.name : "No data"}</h1>

    {#if template.length > 0}
        {#each template as entry}
            <Workout workout={entry.workout} />
        {/each}
    {:else}
        <p>This template has no workouts</p>
    {/if}
    
<section class="navigation-buttons">
    <button type="button" on:click={() => goto(`/templates`)}>All Templates</button>
    <button type="button" on:click={() => console.log(template[0].template_id)} disabled="{template.length === 0}">Set Active Template</button>
</section>

<style>
    .navigation-buttons {
        display: flex;
        justify-content: space-between;
    }
</style>