<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    export let data
    let { user } = data.user
    const activeTemplate = data.templates.find(template => template.id === user.active_template)
    console.log("Home Page", data)
</script>

<p>logged in as: {user.username}</p>
<p>active template: <a href={`/templates/${activeTemplate.id}`}>{activeTemplate.name}</a></p>
<p>Lightweight is your smart gym companion to keep track of your workouts and progress.</p>
<p>Choose one of the preset programs, add your own template or change preset templates to your liking</p>

<button type="button" on:click={() => goto("/templates")}>All Templates</button>