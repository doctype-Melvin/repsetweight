<script>
    // Workout Component
    // @ts-nocheck
    import Exercise from '$lib/components/Exercise/Exercise.svelte';
    
    export let workout;
    
    

</script>


<h3> {workout.name}</h3>

    <ul class="exercise-list">
        {#if workout.exercises.length > 0}
        {#each workout.exercises as exercise}
            <li>
                <Exercise exercise={exercise} workout={workout} />
            </li>
    
        {/each}
        {/if}
        <li>
            <Exercise exercise={{id: 0, name: "Add Exercise Button"}} workout={workout}  />
        </li>
    </ul>

<style>
    .exercise-list {
        list-style-type: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        align-items: center;
        gap: .5rem;
    }
</style>