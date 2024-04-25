<script>
    // Template Component
    // @ts-nocheck
    import { deleteUserTemplate } from "$lib/dataProcessing";
    import { templatesData } from "$lib/stores";

    const deleteTemplate = (id) => {
        templatesData.update(templates => templates.filter(template => template.id !== id))
        deleteUserTemplate(id)
    }

    export let template

</script>

<div>
    <a href={`/templates/${template.id}`}>
        <h1>{template.name}</h1>
        <p>{template.description}</p>
    </a>
    {#if template.user_generated}
        <button type="button" on:click={() => deleteTemplate(template.id)}>Delete</button>
    {/if}
</div>
