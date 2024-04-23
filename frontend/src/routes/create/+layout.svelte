<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import Info from './steps/Info.svelte';
    import Workouts from './steps/Workouts.svelte';
    import { createMode, userTemplateData } from '$lib/stores';
	import { onMount } from 'svelte';

    console.log('Initial app state', $createMode)
    createMode.set(true);

    const previousTemplate = localStorage.getItem('template');
    
    onMount(() => {
        if (previousTemplate) {
            userTemplateData.set(JSON.parse(previousTemplate))
        } 
    })
    
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