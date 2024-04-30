<script>
    // Workout Component
    // @ts-nocheck
    
    export let workout;
    export let showVariables;

</script>

<!-- 
    Component only renders
    exercise variables if the
    template is the active template
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
                <!-- Dropdown to select exercise -->
                <td>{exercise.name}</td>
                {#if showVariables}
                <!-- Numbers dropdown -->
                <td>10</td>
                <!-- Numbers dropdown -->
                <td>3</td>
                <!-- Number input field -->
                <td>100</td>
                {/if}
                <td>
                    <!-- Toggle edit view for selected exercise -->
                    <!-- When in edit view
                    change the above table data to select dropdown -->
                    <!-- Add 'save' and 'cancel' in edit view -->
                    <button type="button">Edit</button>
                </td>
            </tr>
            {/each}
            {/if}
            <button type="button">Add Exercise</button>
    </table>

<style>
    .exercise-list {
        list-style-type: none;
        padding: 0;
        display: grid;
        align-items: center;
        gap: .5rem;
    }
</style>