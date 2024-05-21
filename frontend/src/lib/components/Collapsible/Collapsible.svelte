<script>
    // @ts-nocheck
    import { writable } from "svelte/store";
    import Icon from '@iconify/svelte';

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
    
        <div class="collapsible-content {$expanded ? 'expanded' : 'collapsed'}">
            <slot />
        </div>
</div>

<style>
    .collapsible {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: start;
        justify-content: end;
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
</style>
