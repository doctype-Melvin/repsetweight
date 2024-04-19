<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import Info from './steps/Info.svelte';
    import Workouts from './steps/Workouts.svelte';
    
    export let currentStep = 'info';

    export let nextStep = (value) => {
        currentStep = value;
    }
    

</script>


<h1>Compose your own template</h1>
    
    {#if currentStep === 'info'}
        <Info nextStep={nextStep}/>
    {:else if currentStep === 'workouts'}
        <Workouts nextStep={nextStep} />
    {/if}
    
    <slot />