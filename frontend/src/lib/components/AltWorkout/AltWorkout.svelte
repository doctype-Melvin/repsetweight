<script>
    // @ts-nocheck
    import Flyout from '../Flyout/Flyout.svelte';
    import MuscleExercise from '../MuscleExercise/MuscleExercise.svelte';
    import { userTemplateData } from '$lib/stores.js';
    import { derived, writable } from 'svelte/store';
    import { draggable, dropzone } from '$lib/dragAndDrop';

    export let deleteWorkout
    export let copyWorkout
    export let id
    
    // Subscribe to the userTemplateData store to get the current workout
    // and handle adding muscle groups.
    // The userTemplateData store is updated with the new muscle groups
    let currentWorkout =writable(null);

    const filterTemplateData = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === id)
    })
    
    filterTemplateData.subscribe(value => {
        currentWorkout.set(value)
    })

    let showFlyout = false;
        
    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
        }
        showFlyout = !showFlyout
    }

    const handleDeleteWorkout = (id) => {
        deleteWorkout(id)
    }

    const props = {
        toggle: toggleFlyout,
    }
    // console.log($currentWorkout)
</script>

<section class="workout-container" >
    {#if $currentWorkout}
    <div class="buttons">
        <button type="button" on:click={copyWorkout(id)}>Copy Workout</button>
        <button type="button" on:click={handleDeleteWorkout(id)}>X</button>
    </div>
    <p>{id}</p>
<!-- Drag n Drop -->
<ul class="dropzone" use:dropzone={{
    onDropzone(startIndex, endIndex){
        console.log('Put', startIndex, 'where', endIndex)
    }
    }}>
    {#each $currentWorkout.muscles as muscle, index}
    <li class="draggable" data-index={index} use:draggable={{id: muscle.id, index}}>
        <MuscleExercise {muscle} {id}/>
    </li>
    {/each}
</ul>

        <button type="button" on:click={() => toggleFlyout('muscle')}>Add Muscle Group</button>
            {#if showFlyout}
            <Flyout {...props} />
            {/if}
    {/if}
</section>

<style>
    .workout-container {
        
        padding: .25rem;
        margin: .25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .buttons {
        display: flex;
        justify-content: flex-end;
    } 

    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    .dropzone:global(.droppable) {
        outline: black dashed 2px;
    }
    .dropzone:global(.droppable > *) {
        pointer-events: none;
    }
    
</style>