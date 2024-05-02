<script lang="js">
    import Template from "../Template/Template.svelte";
    export let templates
</script>

<div class="collapsible">
    <ul class="collapsible-content">
       {#each templates as template}
       <li>
           <Template {template} />
        </li>
        {/each}
    </ul>
</div>

<style>
     ul {
        list-style: none;
        padding: 0;
        display: grid;
    }
</style>
