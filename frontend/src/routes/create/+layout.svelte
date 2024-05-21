<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import Info from './steps/Info.svelte';
    import Workouts from './steps/Workouts.svelte';
    import Summary from './steps/Summary.svelte';
    import { userTemplateData } from '$lib/stores';
	import { onMount } from 'svelte';

    

    
    
    // onMount(() => {
    //     if (previousTemplate) {
    //         userTemplateData.set(JSON.parse(previousTemplate))
    //     } 
    // })
    
    // export let currentStep = 'info';

    // export let nextStep = (value) => {
    //     currentStep = value;
    // }
    
       
</script>


<p style="text-align: center;">Compose your own template</p>
    
    <!-- {#if currentStep === 'info'}
        <Info nextStep={nextStep}/>
    {:else if currentStep === 'workouts'}
        <Workouts nextStep={nextStep} />
    {:else }
        <Summary nextStep={nextStep} />
    {/if} -->
    
    <slot />