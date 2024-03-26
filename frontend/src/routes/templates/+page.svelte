<script>
    export let data;
</script>

<h1>Templates</h1>

<ul>
    {#each data.templates as template}
        <li><a href="/templates/{template.id}">{template.name}</a></li>
    {/each}
</ul>

<a href="/">Dashboard</a>