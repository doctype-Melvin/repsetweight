<script>
    // @ts-nocheck
    import Template from "../Template/Template.svelte";
    import Icon from '@iconify/svelte';
    import { writable } from "svelte/store";

    export let templates
    export let header

    const expanded = writable(false);

    function toggle() {
        expanded.update(value => !value);
    }
</script>

<div class="collapsible">
    
        <h3>{header}</h3>
        <button type="button" on:click={() => toggle()}>
            <Icon icon="mdi:menu-swap" style="cursor: pointer;" />
        </button>
    
    <ul class="collapsible-content {$expanded ? 'expanded' : 'collapsed'}">
       {#each templates as template}
        <li>
           <Template {template} />
        </li>
        {/each}
    </ul>
</div>

<style>
    .collapsible {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
    }

    .collapsible-content {
        overflow: hidden;
        transition: max-height 0.4s ease-in-out;   
    }

    .collapsible-content.expanded {
        max-height: 100vh;
    }

    .collapsible-content.collapsed {
        max-height: 0;
        overflow: hidden;
    }

    h3 {
        margin: 0;
    }

     ul {
        list-style: none;
        padding: 0;
        display: grid;
    }
</style>
