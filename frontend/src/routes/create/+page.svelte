<script>
    // @ts-nocheck
    
    import Composer from '$lib/components/Composer/Composer.svelte';
    import { isWriteMode } from '$lib/stores';
    import { beforeNavigate } from '$app/navigation';

    isWriteMode.set(!$isWriteMode)
    beforeNavigate(() => isWriteMode.set(!$isWriteMode))
</script>

<Composer />
    

