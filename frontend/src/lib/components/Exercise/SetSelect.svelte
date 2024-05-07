<script>
    //@ts-nocheck

    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    
    export let setter
    export let exerciseID
    export let workoutID
    export let setsValue

    let isInput = writable(false);
    let inputValue = writable(1);

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
        }else if ($isInput && event.target.nodeName !== 'SELECT') {
            toggleInput();
        }
    }

    onMount(() => {
        window.addEventListener('click', handleWindowClick);
        return () => window.removeEventListener('click', handleWindowClick);
    });

</script>

{#if $isInput}
<select on:change={(event) => inputHandler(event.target.value)}>
    {#each Array.from({ length: 10 }, (_, i) => i + 1) as number}
    <option value={number}>{number}</option>
    {/each}
</select>
{:else}
<button on:click={toggleInput}>{!setsValue ? $inputValue : setsValue}</button>
{/if}