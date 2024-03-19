<script>
    export let data;
</script>

<h1>All Exercises</h1>
<ul>
    {#each data.result.data as exercise}
        <li><a href="/exercises/{exercise.exercise_id}">{exercise.name}</a></li>
    {/each}
</ul>
<a href="/">Dashboard</a>