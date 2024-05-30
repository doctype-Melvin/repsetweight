<script>
    // @ts-nocheck
    import { muscleGroupsData, exerciseMuscleData } from '$lib/stores.js';
    export let data

    let { muscleGroups } = data;
    let { exerciseMuscle } = data;
    

    muscleGroupsData.set(muscleGroups)
    exerciseMuscleData.set(exerciseMuscle)

    $: isFlyinVisible = false

    function toggleFlyin() {
        isFlyinVisible = !isFlyinVisible
    }

    

</script>

    <section>
        <p style="text-align: center;">Compose your own template</p>
        <button type="button" on:click={toggleFlyin}>Save</button>
    </section>
    <!-- Section below will become component -->
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
        justify-content: center;
        align-items: center;
    }

    .flyin, .flyout {
        position: absolute;
        background-color: #949494;
        padding: 2rem;
        height: 50vh;
        width: 75vw;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translate(-50%, -50%);
    }
    
    .flyout {
        top: -100vh;
        left: 50%;
        opacity: 0;
        transition: top 0.5s ease-in, left 0.5s, opacity 0.5s ease-in;
    }

    .flyin {
        left: 50%;
        top: 45%;
        opacity: 1;
        transition: top 0.5s ease-out, left 0.5s, opacity 0.5s ease-in;
    }

    .close-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 1rem;
    }
</style>