<script>
    // @ts-nocheck

    import { goto } from '$app/navigation';
    import Icon from '@iconify/svelte';
    
    export let source
    export let alt
    export let href
    export let size
    export let isLogo
    export let parentFunction

    
</script>

{#if isLogo}
<a on:click={() => parentFunction()} href={href}><img src={source} alt={alt} height={size} width={size} /> LightWEIGHT</a>
{:else}
<a on:click={() => parentFunction()} class="link" href={href}><Icon style={`font-size: ${size}rem`}  icon={source} /> {alt}</a>
{/if}

<style>
    a {
        display: flex;
        align-items: center;
        gap: .5rem;
        font-size: 1.15rem;
        font-weight: bold;
        color: #dfae3b;
        text-decoration: none;
    }

    .link {
        margin: 0;
        color: #99a1a6;
        font-size: 1rem;
        font-weight: 400;
    }
</style>