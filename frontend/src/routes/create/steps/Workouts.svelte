<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    export let nextStep

    // This component should expand the 
    // object stored in localStorage
    // Create workouts seperately and store them

</script>

<form>
    <legend>Step 2: Workouts</legend>
    <label for="workout">Workout</label>
    <input type="text" id="workout">
    <button type="button" on:click={() => nextStep('info')}>Back</button>
    <button type="button" on:click={() => console.log('summary')}>Next</button>
</form>