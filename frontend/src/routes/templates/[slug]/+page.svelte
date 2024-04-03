<script>
	import { goto } from '$app/navigation';
    import Workout from '$lib/components/Workout/index.svelte';

    export let data;
    let { template } = data;
</script>

<h1>{template[0].Template.name ? template[0].Template.name : "Template"}</h1>

    {#if template.length > 0}
        {#each template as entry}
            <Workout data={entry.Workout} />
        {/each}
    {:else}
        <p>This template has no workouts</p>
    {/if}
    
    

<button type="button" on:click={() => goto(`/templates`)}>All Templates</button>