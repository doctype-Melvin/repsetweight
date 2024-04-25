<script>
    // @ts-nocheck
    import { userTemplateData, templatesData } from "$lib/stores";
    import { goto } from "$app/navigation";
    import { submitUserTemplate } from "$lib/dataProcessing";

    export let nextStep
    
    const submitAction = async (data) => {
        if (data) {
            const response = await submitUserTemplate(data);
        }
        userTemplateData.set(null);
        localStorage.clear();
        goto(`/templates`);
    }

</script>
<section>
    {#if $userTemplateData}
    <h2>Summary</h2>
    <p>Template Name: {$userTemplateData.name}</p>
    <p>{$userTemplateData.description}</p>
    {#each $userTemplateData.workouts as workout}
        <p class="workout-name">{workout.name}</p>
        <ul class="exercise-list">
            {#each workout.exercises as exercise}
                <li>{exercise.name}</li>
            {/each}
        </ul>
    {/each}
    {:else}
    <p>Whoopsies... no data</p>
    {/if}
</section>
<section>
    <button type="button" on:click={nextStep('workouts')}>Back</button>
    <button type="button" on:click={() => submitAction($userTemplateData)}>Submit</button>
    <button type="button" on:click={() => submitAction(null)}>Cancel</button>
</section>

<style>
    .workout-name {        
        font-weight: bold;        
    }

    .exercise-list {
        display: grid;
        gap: .5rem;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        list-style-type: none;
    }

</style>