<script>
    // Exercise Component
    // @ts-nocheck
    import { page } from "$app/stores";
    import IconDotsVertical from "~icons/mdi/dots-vertical"
    const url = $page.url;
    const pathname = url.pathname
    const templateId = Number(pathname.split("/")[2]);    

    let isDropdown = false;
    const toggleDropdown = () => isDropdown = !isDropdown;

    export let exercise;
</script>

<section class="container">
    <h4>{exercise.name}</h4>
    <!-- Drop down to manage exercise -->
    <button class="icon-button" type="button" on:click={toggleDropdown}>
        <IconDotsVertical style="font-size:1.15rem" />
    </button>
    {#if isDropdown}
        <div>
            <button type="button">Edit</button>
            <button type="button">Delete</button>
        </div>
    {/if}
</section>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #ccc;
        border-radius: 15px;
        padding: 1rem;
    }

    .icon-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }
</style>