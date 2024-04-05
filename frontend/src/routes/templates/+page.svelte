<script>
    // Template Overview
	import { goto } from "$app/navigation";
    export let data;
    import Template from "$lib/components/Template/Template.svelte";
</script>

<h1>Templates</h1>

<ul>
    {#each data.templates as template}
        <Template {template} />
    {/each}
</ul>

<button type="button" on:click={() => goto('/')}>Dashboard</button>

<style>
    ul {
        list-style: none;
        padding: 0;
        display: grid;
    }
</style>