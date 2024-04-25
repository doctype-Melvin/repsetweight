<script>
    // Template Component
    // @ts-nocheck
    import { deleteUserTemplate } from "$lib/dataProcessing";

    export let template

</script>

<div>
    <a href={`/templates/${template.id}`}>
        <h1>{template.name}</h1>
        <p>{template.description}</p>
    </a>
    {#if template.user_generated}
        <button type="button" on:click={() => deleteUserTemplate(template.id)}>Delete</button>
    {/if}
</div>
