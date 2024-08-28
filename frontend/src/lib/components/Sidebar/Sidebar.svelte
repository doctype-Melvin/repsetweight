<script>
    // @ts-nocheck

    import { goto } from '$app/navigation';
    import Logo from '../Logo/Logo.svelte';
    import Icon from '@iconify/svelte';

    let show = true

</script>


    <section class={show ? '' : 'close'}>
        <Logo />
        <a href="/templates">Templates</a>
        <a href="/random">Random Sesison</a>
        <a href="/timer">Timers</a>
        <a href="/analytics">Analytics</a>
        <div class="spacer"></div>
        <a href="/account">User Account</a>
        <a href="/settings">Settings</a>
        <button class="button-hide" type="button" on:click={() => show = false}><Icon icon="bytesize:chevron-left" /></button>
    </section>

    {#if !show}
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
        padding: 1rem;
        transition: 1.25s cubic-bezier(0.39, 0.575, 0.565, 1);
        z-index: 1;
        background-color: #fff;
    }

    .close {
        margin-left: -100%;
    }

    .spacer {
        margin-bottom: 2rem;
    }

    .button-hide,
    .burger-icon {
        position: absolute;
        top: .75rem;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
    }
    
    .button-hide {
        right: .25rem;
    }   

    .burger-icon {
        left: .25rem;
        z-index: 0;
    }

    .burger-icon:hover,
    .button-hide:hover {
        cursor: pointer;
    }
</style>