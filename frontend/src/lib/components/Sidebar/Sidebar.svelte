<script>
    // @ts-nocheck

    import { goto } from '$app/navigation';
    import Logo from '../Logo/Logo.svelte';
    import Icon from '@iconify/svelte';

    let show = true

</script>

{#if show}
    <section>
        <Logo />
        <a href="/templates">Templates</a>
        <a href="/random">Random Sesison</a>
        <a href="/timer">Timers</a>
        <a href="/analytics">Analytics</a>
        <div class="spacer"></div>
        <a href="/account">User Account</a>
        <a href="/settings">Settings</a>
        <button class="button-hide" type="button" on:click={() => show = false}>&lt;</button>
    </section>
    {:else}
    <button class="burger-icon" type="button" on:click={() => show = true}><Icon icon="iconamoon:menu-burger-horizontal-bold" /></button>
{/if}


<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        width: 50%;
        min-height: 75%;
        background-color: #dbe4eb;
        padding: 1rem;
    }

    .spacer {
        margin-bottom: 2rem;
    }

    .button-hide {
        position: absolute;
        top: .75rem;
        right: .5rem;
    }   

    .burger-icon {
        position: absolute;
        top: .75rem;
        left: .25rem;
        font-size: 1.75rem;
        background-color: transparent;
        border: none;
    }

    .burger-icon:hover {
        cursor: pointer;
    }
</style>