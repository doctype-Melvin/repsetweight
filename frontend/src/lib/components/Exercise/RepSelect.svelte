<script>
    //@ts-nocheck
	import { onMount } from "svelte";
    import { writable } from "svelte/store";
        
    export let setter
    export let exerciseID
    export let workoutID
    export let repValue
    
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
<select on:change={(event) => inputHandler(event.target.value)} >
    <option value="0">-</option>
    {#each Array.from({ length: 30 }, (_, i) => i + 1) as number}
    <option value={number}>{number}</option>
    {/each}
</select>
{:else}
<!-- The button's value should reflect the actual data value -->
<button on:click={toggleInput}>{!repValue ? $inputValue : repValue}</button>
{/if}