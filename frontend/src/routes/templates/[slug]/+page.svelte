<script>
    export let data;
    console.log(data.sessions)
</script>

<h1>{data.template.name}</h1>
<div>
    <h2>Sessions</h2>
    <ul>
        {#each data.sessions as session}
            <li>{session.name}</li>
        {/each}
</div>
<a href="/templates">Templates</a>