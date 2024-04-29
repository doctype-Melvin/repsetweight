<script>
    // Workout Component
    // @ts-nocheck
    import Exercise from '$lib/components/Exercise/Exercise.svelte';
    
    export let workout;
    
    

</script>


<h3> {workout.name}</h3>

    <table>
        <thead>
            <tr>
                <th>Exercise</th>
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#if workout.exercises.length > 0}
            {#each workout.exercises as exercise}
            <tr>
                <td>{exercise.name}</td>
                <td>10</td>
                <td>3</td>
                <td>100</td>
                <td>
                    <button type="button">Edit</button>
                    <button type="button">Delete</button>
                </td>
            </tr>
            {/each}
            {/if}
            <button type="button">Add Exercise</button>
    </table>

    <!-- <ul class="exercise-list">
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
    </ul> -->

<style>
    .exercise-list {
        list-style-type: none;
        padding: 0;
        display: grid;
        align-items: center;
        gap: .5rem;
    }
</style>