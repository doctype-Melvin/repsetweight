<script>
    // @ts-nocheck
    $: isFlyinVisible = false

    function toggleFlyin() {
        isFlyinVisible = !isFlyinVisible
    }

</script>

<section>
    <p style="text-align: center;">Compose your own template</p>
    <button type="button" on:click={toggleFlyin}>Save</button>
</section>
<section class="fly{isFlyinVisible ? 'in' : 'out'}">
    <button class="close-button" type="button" on:click={toggleFlyin}>Close</button>
    <form on:submit={toggleFlyin}>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Name your workout" />
        <label for="description">Description</label>
        <textarea id="description" name="description" placeholder="Describe your workout"></textarea>
        <button type="submit">Create</button>
    </form>
</section>
<slot />

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    .flyout {
        position: absolute;
        top: -100vh;
        left: 50%;
        transition: top 0.5s, left 0.5s;
    }

    .flyin {
        position: absolute;
        left: 50%;
        top: 45%;
        transition: top 0.5s, left 0.5s;
        transform: translate(-50%, -50%);
        background-color: #949494;
        padding: 2rem;
        height: 50vh;
        width: 75vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .close-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
    }
</style>