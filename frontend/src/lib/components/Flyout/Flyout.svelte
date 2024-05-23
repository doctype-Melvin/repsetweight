<script>
    // @ts-nocheck
    console.log('%c Flyout loaded', 'color: hotpink; font-weight: bold;')

    export let showFlyout
    export let toggleFlyout
</script>

{#if showFlyout}
<section class="flyout-container">
    <div class="flyout">
        <div class="flyout-header">
            <h2>Header</h2>
            <button type="button" on:click={toggleFlyout}>X</button>
        </div>
        <div class="flyout-content">
            <p>Content</p>
        </div>
    </div>
</section>

{/if}


<style>
    .flyout-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .flyout {
        background-color: #fff;
        padding: 2rem;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .flyout-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flyout-content {
        margin-top: 1rem;
    }
</style>