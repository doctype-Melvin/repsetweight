<script>
    // @ts-nocheck
    import Icon from '@iconify/svelte';

    export let header
    export let isOpen = undefined

    $: expanded = isOpen;

    function toggle() {
        expanded = !expanded;
    }

</script>

<div class="collapsible">
    <h3 on:click={() => console.log(header)}>{header}</h3>
    <button type="button" on:click={() => toggle()}>
        <Icon icon="mdi:menu-swap" style="cursor: pointer;" />
    </button>
    
        <div class="collapsible-content {expanded ? 'expanded' : 'collapsed'}">
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
        transition: max-height 0.3s ease-in-out, opacity 0.35s ease-in-out;
        grid-column: span 2;
    }

    .collapsible-content.expanded {
        max-height: 100%;
        opacity: 1;
    }

    .collapsible-content.collapsed {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
    }

    h3 {
        margin: 0;
    }
</style>
