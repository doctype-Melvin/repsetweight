<script>
    export let data;
</script>

<h1>{data.template.name}</h1>
<div>
    <h2>Workouts</h2>
    {#if data.workouts.length !== 0}
    <ul>
        {#each data.workouts as workout}
        <li>
            {workout.Workout.name}
        </li>
        {/each}
    </ul>
    {:else}
    <p>This template has no workouts</p>
    
    {/if}
</div>
<a href="/templates">Templates</a>