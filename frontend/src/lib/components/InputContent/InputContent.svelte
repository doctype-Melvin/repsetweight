<script>
    // @ts-nocheck
    import { isWriteMode } from "$lib/stores";
    export let content
    export let element
    export let setContentHandler

    let isInput = false

    const toggleInput = () => isInput = !isInput;

    const setContent = (event) => {
        setContentHandler(event.target.value)
        toggleInput()
    }

</script>

<section>
    {#if !isInput}
    <span class={element} on:click={toggleInput}>{content}</span>
    {:else}
        <input type="text" bind:value={content} on:blur={setContent} autofocus/>
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