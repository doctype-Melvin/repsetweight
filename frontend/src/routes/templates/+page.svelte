<script>
    //@ts-nocheck
    // Template Overview
	import { goto } from "$app/navigation";
    import { templatesData } from "$lib/stores.js";
    import Collapsible from "$lib/components/Collapsible/Collapsible.svelte";
    

    let userTempaltes = $templatesData.filter(item => item.user_generated === true)
    let presetTemplates = $templatesData.filter(item => item.user_generated === false)
    
</script>

{#if userTempaltes.length > 0}
<h2>Your Templates</h2>
<Collapsible templates={userTempaltes} />
{/if}
   

<h2>Preset Templates</h2>
<Collapsible templates={presetTemplates} />



<button type="button" on:click={() => goto('/create')}>Create Template</button>
<button type="button" on:click={() => goto('/')}>Dashboard</button>

<style>
   
</style>