<script>
    // @ts-nocheck
    import { writable } from "svelte/store";
    import Template from "../Template/Template.svelte";
    import InputContent from "../InputContent/InputContent.svelte";
    import Icon from '@iconify/svelte';

    export let templates = undefined
    export let header

    const expanded = writable(false);

    function toggle() {
        expanded.update(value => !value);
    }

</script>

<div class="collapsible">
        {#if header.name}
        <InputContent content={header.name} type="" wid={header.wid} />
        {:else}
        <h3>{header}</h3>
        {/if}
        <button type="button" on:click={() => toggle()}>
            <Icon icon="mdi:menu-swap" style="cursor: pointer;" />
        </button>
        {#if templates}
        <ul class="collapsible-content {$expanded ? 'expanded' : 'collapsed'}">
            {#each templates as template}
            <li>
                <Template {template} />
            </li>
            {/each}
        </ul>
        {:else}
        <div class="collapsible-content {$expanded ? 'expanded' : 'collapsed'}">
            {#if header.description}
            <!-- <p>{header.description}</p> -->
            <InputContent content={header.description} type="description" wid={header.wid} />
            {/if}
            <slot />
    </div>
    {/if}

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
