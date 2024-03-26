<script>
    export let data;
</script>

<h1>{data.template.name}</h1>
<div>
    <h2>Workouts</h2>
    <ul>
        {#each data.workouts as workout}
        <li>
            {workout.Workout.name}
        </li>
        {/each}
    </ul>
</div>
<a href="/templates">Templates</a>