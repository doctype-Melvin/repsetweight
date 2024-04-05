<script>
    // Template Component
    // @ts-nocheck
    export let template

</script>

<a href={`/templates/${template.id}`}>
    <h1>{template.name}</h1>
    <p>{template.description}</p>
</a>
