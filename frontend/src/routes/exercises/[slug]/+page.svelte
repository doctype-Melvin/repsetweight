<script>
    export let data
</script>

<h1>{data.result.data.name}</h1>

<ul>
        <li>Muscle: {data.result.data.target}</li>
        <li>Category: {data.result.data.category}</li>
        <li>Equipment: {data.result.data.equipment}</li>
    
</ul>
<a href="/exercises">Exercises</a>
