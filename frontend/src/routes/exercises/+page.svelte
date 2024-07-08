<script>
	export let data;
</script>

<h1>All Exercises</h1>
<ul>
	{#each data.exercises as exercise}
		<li><a href="/exercises/{exercise.id}">{exercise.name}</a></li>
	{/each}
</ul>
<a href="/">Dashboard</a>
