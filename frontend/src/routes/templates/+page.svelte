<script>
    export let data;
    import Template from "$lib/components/Template/index.svelte";
</script>

<h1>Templates</h1>

<ul>
    {#each data.templates as template}
        <Template {template} />
    {/each}
</ul>

<a href="/">Dashboard</a>

<style>
    ul {
        list-style: none;
        padding: 0;
        display: grid;
    }
</style>