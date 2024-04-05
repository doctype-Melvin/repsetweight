<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    
    const url = $page.url;
    const pathname = url.pathname
    const templateId = Number(pathname.split("/")[2]);    

    export let exercise;
    
</script>

<h4>{exercise.name}</h4>
<!-- Drop down to manage exercise -->
<button type="button" on:click={() => console.log(templateId)}>Make Changes</button>