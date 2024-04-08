<script>
    // Workout Component
    // @ts-nocheck
    import Exercise from '$lib/components/Exercise/Exercise.svelte';
    export let workout;
</script>


<h3> {workout.name}</h3>
    <ul class="exercise-list">
        {#each workout.Exercises as exercise}
            <li>
                <Exercise exercise={exercise} workout={workout}/>
            </li>
        {/each}
    </ul>



<style>
    .exercise-list {
        list-style-type: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: .5rem;
    }
</style>