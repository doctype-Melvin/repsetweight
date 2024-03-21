<script>
    export let data

</script>

<section>
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard</p>
    <p>Your current template: <a href="/templates/{data.template.template_id}"><b>{data.template.name}</b></a></p>
    
    <button>Today's lift</button>

    <a href="/exercises">View exercises</a>
    <a href="/templates">View templates</a>
</section>