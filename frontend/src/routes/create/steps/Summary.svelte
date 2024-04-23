<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";

    export let nextStep

</script>

<section>
    <button type="button" on:click={nextStep('workouts')}>Back</button>
    <button type="button" on:click={() => console.log($userTemplateData)}>Submit</button>
</section>