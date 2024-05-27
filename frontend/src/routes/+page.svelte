<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    import { templatesData, userData, isWriteMode } from "$lib/stores.js";
        
    isWriteMode.set(false)

    const activeTemplate = $templatesData.find(template => template.id === $userData.active_template)
        
</script>

<p>logged in as: {$userData.username}</p>
<p>active template: <a href={`/templates/${activeTemplate.id}`}>{activeTemplate.name}</a></p>
<p>Lightweight is your smart gym companion to keep track of your workouts and progress.</p>
<p>Choose one of the preset programs, add your own template or change preset templates to your liking</p>

<button type="button" on:click={() => goto("/templates")}>All Templates</button>
{#if !$isWriteMode}
<p><b>Read only mode</b></p>
{/if}