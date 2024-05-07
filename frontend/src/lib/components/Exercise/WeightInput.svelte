<script>
    // @ts-nocheck
    import { writable } from "svelte/store";

    let isInput = writable(false);
    let inputValue = writable(0);

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
<input type="number" id="weight" min="0" max="500" on:blur={(event) => inputHandler(event.target.value)}/>
{:else}
<button on:click={toggleInput}>{$inputValue}</button>
{/if}

<style>
    input {
        width: 65px;
    }

</style>