<script>
    // @ts-nocheck
    import Flyout from "../Flyout/Flyout.svelte";

    export let id
    export let muscle;
    export let deleteHandler


    let showFlyout = false;

    const toggleFlyout = (signal) => {
        if (signal) {
            props.signal = signal;
            props.wid = id;
            props.muscle = muscle;
        }
        showFlyout = !showFlyout
    }

    const props = {
        toggle: toggleFlyout,
    }
    
</script>

<section class="card">
    <div>
        <span>{muscle.name}</span>
        <button type="button" on:click={deleteHandler(muscle.id)}>X</button>
    </div>
    <button type="button" on:click={() => toggleFlyout('exercise')}>Add Exercise</button>
    {#if showFlyout}
        <Flyout {...props} />
    {/if}
</section>