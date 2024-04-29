<script>
    // Workout Component
    // @ts-nocheck
    import Exercise from '$lib/components/Exercise/Exercise.svelte';
    
    export let workout;
    export let showVariables;
    console.log('workout comp', showVariables)

</script>

<!-- If in showVariables mode, the component only
renders exercises and allows for 
changing/deleting a given exercise.
If not in showVariables mode, the component renders exercise
variables such as reps, sets, and weight.
-->

<h3> {workout.name}</h3>

    <table>
        <thead>
            <tr>
                <th>Exercise</th>
                {#if showVariables}
                <th>Reps</th>
                <th>Sets</th>
                <th>Weight</th>
                {/if}
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#if workout.exercises.length > 0}
            {#each workout.exercises as exercise}
            <tr>
                <td>{exercise.name}</td>
                {#if showVariables}
                <td>10</td>
                <td>3</td>
                <td>100</td>
                {/if}
                <td>
                    <button type="button">Edit</button>
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