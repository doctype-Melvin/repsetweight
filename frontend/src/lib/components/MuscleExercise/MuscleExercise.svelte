<script>
    // @ts-nocheck
	import { userTemplateData } from "$lib/stores";

    import Flyout from "../Flyout/Flyout.svelte";
    import { derived } from "svelte/store";

    export let id
    export let muscle;
    export let deleteHandler

    const templateData = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })

    let showFlyout = false;

    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
            props.muscle = muscle;
        }
        showFlyout = !showFlyout
    }

    const props = {
        toggle: toggleFlyout,
    }
    
</script>

<section class="card">
    <div>
        <span>{muscle.name}</span>
        <button type="button" on:click={deleteHandler(muscle.id)}>X</button>
    </div>
    {#if $templateData.exercises}
        {#each $templateData.exercises as exercise}
            {#if exercise.muscle_id === muscle.id}
                <span>{exercise.name}</span>
            {/if}
        {/each}
    {/if}
    <button type="button" on:click={() => toggleFlyout('exercise')}>Add Exercise</button>
    {#if showFlyout}
        <Flyout {...props} />
    {/if}
</section>