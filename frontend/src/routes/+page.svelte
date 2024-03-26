<script>
    export let data
    
</script>
<h1>Hi Melvin! Let's test the API endpoints!</h1>

<h2>List all the templates below here</h2>

<ul>
  {#each data.templates as template}
    <li>
      <a href={`templates/${template.id}`}>
        {template.name}
      </a>
    </li>
  {/each}
</ul>

<h2>List all the exercises below here</h2>

<ul>
    {#each data.exercises as exercise}
        <li>
          <a href={`/exercises/${exercise.id}`}>

            {exercise.name}
        </a>
      </li>
    {/each}
</ul>

<!-- Work on API endpoints, create new routes and controllers
(sessions, workouts)
-->
