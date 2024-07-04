<script>
    // @ts-nocheck
    
    import Composer from '$lib/components/Composer/Composer.svelte';
    import { isWriteMode, scrollPosition } from '$lib/stores';
    import { beforeNavigate } from '$app/navigation';
    import { onMount } from 'svelte';

    isWriteMode.set(!$isWriteMode)
    beforeNavigate(() => isWriteMode.set(!$isWriteMode))

    onMount(() => {
        window.addEventListener('scroll', () => {
            scrollPosition.set(window.scrollY)
        })
        return () => window.removeEventListener('scroll', () => {
            scrollPosition.set(window.scrollY)
        })
    })
    
</script>


    <Composer />

    

