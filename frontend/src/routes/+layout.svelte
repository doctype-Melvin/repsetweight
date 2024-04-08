<script>
    import { setContext } from "svelte";

    export let data

    setContext("exercises", data.exercises)
</script>

<section>
    <a href="/">
        Lightweight
    </a>
        <p>❚█══█❚</p>
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

    a, p {
        text-align: center;
    }
</style>