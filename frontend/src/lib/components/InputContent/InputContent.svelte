<script>
	// @ts-nocheck

    import { afterUpdate } from "svelte";
    
    export let content
    export let element
    export let setContentHandler
    
    let isInput = false
    let inputValue = content
    
    const toggleInput = () => {
        isInput = !isInput;
    }

    const setContent = (event) => {
        if (!inputValue) {
            inputValue = content      
        } 
        setContentHandler(inputValue)
        toggleInput()
        
    }

    afterUpdate(() => {
        if (isInput) {
            const input = document.querySelector('.input-workout-name')
            input.focus()
        }
    })

</script>

<section>
    {#if !isInput}
    <button type="button" on:click={toggleInput}><span class={element} >{content}</span></button>
    {:else}
        <input class="input-workout-name" type="text" bind:value={inputValue} on:blur={setContent} />
    {/if}
</section>

<style>
    .h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 700;
        padding: 0;
    }
</style>