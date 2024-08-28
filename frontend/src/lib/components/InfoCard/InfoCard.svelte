<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    export let content
</script>

<section>
    <h1>{content.title}</h1>
    <p>{content.text}</p>
    <button type="button" on:click={goto(`${content.href}`)}>{content.button}</button>
</section>