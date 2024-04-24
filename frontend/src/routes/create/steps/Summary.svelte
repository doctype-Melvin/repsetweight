<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import { goto } from "$app/navigation";
    
    
    export let nextStep


    const leaveCreate = () => {
        localStorage.removeItem('template');
        userTemplateData.set(null);
        goto(`/templates`);
    }
</script>
<section>
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
</section>
<section>
    <button type="button" on:click={nextStep('workouts')}>Back</button>
    <button type="button" on:click={() => console.log($userTemplateData)}>Submit</button>
    <button type="button" on:click={leaveCreate}>Cancel</button>
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