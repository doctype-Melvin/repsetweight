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
                <!--
                    Exercise component needed
                    Features: change, delete exercise thorugh
                    pop up menu
                 -->
                <!-- <h4>{exercise.name}</h4> -->
                <Exercise {exercise} />
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

    .exercise-list li {
        border: 1px solid #ccc;
        border-radius: 15px;
        text-align: center;
    }
</style>