<script>
    export let data
</script>

<h1>{data.exercise.name}</h1>

<ul>
        <li>Muscle: {data.exercise.target}</li>
        <li>Category: {data.exercise.category}</li>
        <li>Equipment: {data.exercise.equipment}</li>
    
</ul>
<a href="/exercises">Exercises</a>
