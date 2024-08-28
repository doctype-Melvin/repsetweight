<script>
    // @ts-nocheck

    import { goto } from '$app/navigation';
    let show = false

</script>

{#if show}
    <section>
        <a href="/">LightWEIGHT</a>
        <a href="/templates">Templates</a>
        <a href="/random">Random Sesison</a>
        <a href="/timer">Timers</a>
        <a href="/analytics">Analytics</a>
        <a href="/account">User Account</a>
        <a href="/settings">Settings</a>
        <button class="button-hide" type="button" on:click={() => show = false}>X</button>
    </section>
    {:else}
    <button class="burger-icon" type="button" on:click={() => show = true}>Expand</button>
{/if}


<style>
    section {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        width: 45%;
        padding-top: 1rem;
    }

    .button-hide {
        position: absolute;
        top: .75rem;
        right: 0;
    }   

    .burger-icon {
        position: absolute;
        top: .75rem;
        left: 0;
    }
</style>