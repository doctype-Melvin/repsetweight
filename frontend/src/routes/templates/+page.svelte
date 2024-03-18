<script>
    export let data;
</script>

<h1>Templates</h1>

<ul>
    {#each data.result.data as template}
        <li><a href="/templates/{template.template_id}">{template.name}</a></li>
    {/each}
</ul>

<a href="/">Dashboard</a>