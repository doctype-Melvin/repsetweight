<script>
    // Template Overview
    // @ts-nocheck

	import { goto } from "$app/navigation";
    import { templatesData } from "$lib/stores.js";
    import Template from "$lib/components/Template/Template.svelte";

    const templatesStore = $templatesData
    
</script>

<h1>Templates</h1>

<ul>
    {#each templatesStore as template}
        <Template {template} />
    {/each}
</ul>

<button type="button" on:click={() => goto('/create')}>Create Template</button>
<button type="button" on:click={() => goto('/')}>Dashboard</button>

<style>
    ul {
        list-style: none;
        padding: 0;
        display: grid;
    }
</style>