<script>
    //@ts-nocheck

    import { writable } from "svelte/store";
    let isInput = writable(false);
    let inputValue = writable(1);

    const toggleInput = () => isInput.update(value => !value);
    const setInputValue = (value) => inputValue.set(value);

    const inputHandler = (value) => {
        setInputValue(value);
        toggleInput();
        setter(value);
    }
    export let setter
</script>

{#if $isInput}
<select on:change={(event) => inputHandler(event.target.value)}>
    {#each Array.from({ length: 30 }, (_, i) => i + 1) as number}
    <option value={number}>{number}</option>
    {/each}
</select>
{:else}
<button on:click={toggleInput}>{$inputValue}</button>
{/if}