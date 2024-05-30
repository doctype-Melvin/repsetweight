<script>
    //@ts-nocheck
    // Template Overview
	import { goto } from "$app/navigation";
    import { templatesData } from "$lib/stores.js";
    import Collapsible from "$lib/components/Collapsible/Collapsible.svelte";
    import Template from "$lib/components/Template/Template.svelte";
    

    let userTempaltes = $templatesData.filter(item => item.user_generated === true)
    let presetTemplates = $templatesData.filter(item => item.user_generated === false)
    
</script>

{#if userTempaltes.length > 0}
<section>
    <Collapsible header={'Your Templates'}>
        {#each userTempaltes as template}
        <Template {template}/>
        {/each}
    </Collapsible>
</section>
{/if}

{#if presetTemplates.length}
<section>
    <Collapsible header={'Preset Templates'}>
        {#each presetTemplates as template}
        <Template {template}/>
        {/each}
    </Collapsible>
</section>
{/if}

<button type="button" on:click={() => goto('/create')}>Create Template</button>
<button type="button" on:click={() => goto('/')}>Dashboard</button>

<style>
   
</style>