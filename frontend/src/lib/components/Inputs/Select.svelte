<script>
    // @ts-nocheck
export let optionsCount

</script>
<div>
    <select>
        {#if optionsCount > 0}
            {#each Array(optionsCount) as _, i}
                <option value={i}>{i}</option>
            {/each}
        {/if}
    </select>
</div>