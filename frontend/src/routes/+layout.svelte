<script>
    import { setContext } from "svelte";
    import { templatesData, exercisesData } from "$lib/stores.js";
    export let data

    $: templatesData.set(data.templates)
    $: exercisesData.set(data.exercises)

    
</script>

<section>
    <a href="/">
        <h1>Lightweight</h1>
    </a>
    
    <slot />
</section>

<style>
    :global(html, body) {
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }
    
    :global(a) {
        text-decoration: none;
        
    }


    a {
        text-align: center;
    }
</style>