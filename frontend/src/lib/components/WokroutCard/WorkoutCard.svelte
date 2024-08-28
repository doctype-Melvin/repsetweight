<script>
    // @ts-nocheck
    /*
    The Workout Card should allow users to
    - add muscles groups
    - add exercises
    - and set exercise variables ( sets, reps, weight, etc )
    */

    export let workout
    export let editMode 
</script>

<section class='workout-card'>
    {#if workout}
    <h3>{workout.name}</h3>
    {/if}
    {#if editMode}
    <button type="button">Add Muscle Group</button>
    {/if}
</section>