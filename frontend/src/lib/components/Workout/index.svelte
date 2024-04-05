<script>
    // @ts-nocheck
    export let data;
</script>
<!-- Workout Component -->

<h3>{data.name}</h3>
    <ul class="exercise-list">
        {#each data.Exercises as exercise}
            <li>
                <!--
                    Exercise component needed
                    Features: change, delete exercise thorugh
                    pop up menu
                 -->
                <h4>{exercise.name}</h4>
                
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