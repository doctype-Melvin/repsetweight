<script>
    // @ts-nocheck
    import { writable } from "svelte/store";
    import { onMount } from "svelte";

    export let setter
    export let exerciseID
    export let workoutID
    export let weightValue

    let isInput = writable(false);
    let inputValue = writable(0);

    const toggleInput = () => isInput.update(value => !value);
    const setInputValue = (value) => inputValue.set(value);

    const inputHandler = (value) => {
        setInputValue(value);
        toggleInput();
        setter(value, exerciseID, workoutID);
    }

    const handleWindowClick = (event) => {
        if ($isInput && event.target.nodeName === 'BUTTON') {
            return
        }else if ($isInput && event.target.nodeName !== 'INPUT') {
            toggleInput();
        }
    }

    onMount(() => {
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    });

</script>

{#if $isInput}
<input type="number" id="weight" min="0" max="500" on:blur={(event) => inputHandler(event.target.value)}/>
{:else}
<button on:click={toggleInput}>{!weightValue ? $inputValue : weightValue}</button>
{/if}

<style>
    input {
        width: 65px;
    }

</style>