<script>
    //@ts-nocheck

    import { writable } from "svelte/store";

</script>

<select on:change={(event) => console.info(event.target.value)}>
    {#each Array.from({ length: 10 }, (_, i) => i + 1) as number}
    <option value={number}>{number}</option>
    {/each}
</select>