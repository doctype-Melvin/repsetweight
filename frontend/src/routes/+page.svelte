<script>
    import { goto } from "$app/navigation";
</script>

<p>Lightweight is your smart gym companion to keep track of your workouts and progress.</p>
<p>Choose one of the preset programs, add your own template or change preset templates to your liking</p>

<button type="button" on:click={() => goto("/templates")}>All Templates</button>