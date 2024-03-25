<script>
    export let data
    console.log(data.templates, data.exercises)
</script>
<h1>Hi Melvin! Let's test the API endpoints!</h1>

<h2>List all the templates below here</h2>

<ul>
  {#each data.templates as template}
    <li>{template.name}</li>
  {/each}
</ul>

<h2>List all the exercises below here</h2>

<ul>
    {#each data.exercises as exercise}
        <li>{exercise.name}</li>
    {/each}
</ul>

<!-- Work on API endpoints, create new routes and controllers -->
