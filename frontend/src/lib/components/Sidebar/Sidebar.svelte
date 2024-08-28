<script>
    // @ts-nocheck

    import { goto } from '$app/navigation';
    import CustomLink from '../CustomLink/CustomLink.svelte';
    import Icon from '@iconify/svelte';

    export let show = false

    const toggleSidebar = () => show = !show

</script>
    <section class="sidebar-container">
        <div class={!show ? 'close' : ''}>
            <CustomLink
                source="/lw-logo2.svg"
                alt="lightweight Logo"
                href="/"
                size="30"
                isLogo={true}
                parentFunction={toggleSidebar}
            />
        
            <CustomLink
                source="system-uicons:files-multi"
                alt="Templates"
                href="/templates"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
            <CustomLink
                source="game-icons:perspective-dice-six-faces-random"
                alt="Random Session"
                href="/random"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
            <CustomLink
                source="carbon:timer"
                alt="Timers"
                href="/timer"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
            <CustomLink
                source="carbon:analytics"
                alt="Analytics"
                href="/analytics"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
        
            <div class="spacer"></div>
            <CustomLink
                source="carbon:user"
                alt="User Account"
                href="/account"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
            <CustomLink
                source="carbon:settings"
                alt="Settings"
                href="/settings"
                size="1.75"
                isLogo={false}
                parentFunction={toggleSidebar}
            />
        
            <button class="button-hide" type="button" on:click={toggleSidebar}><Icon icon="bytesize:chevron-left" /></button>
        </div>
        {#if !show}
        <button class="burger-icon" type="button" on:click={toggleSidebar}><Icon icon="iconamoon:menu-burger-horizontal-bold" /></button>
        {/if}
    </section>


<style>
    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        width: 50%;
        padding: 1rem;
        transition: .75s cubic-bezier(0.39, 0.575, 0.565, 1);
        z-index: 1;
        background-color: #fff;
    }

    .sidebar-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 75%;
    }

    .close {
        margin-left: -125%;
    }

    .spacer {
        margin-bottom: 2rem;
    }

    .button-hide,
    .burger-icon {
        position: absolute;
        top: 1.25rem;
        background-color: transparent;
        border: none;
    }
    
    .button-hide {
        right: .25rem;
        font-size: 1rem;
    }   

    .burger-icon {
        left: .25rem;
        font-size: 1.5rem;
        z-index: 0;
    }

    .burger-icon:hover,
    .button-hide:hover {
        cursor: pointer;
    }
</style>