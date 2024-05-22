<script>
    // @ts-nocheck
    import { muscleGroupsData } from "$lib/stores";
    console.log('%c Dropdown Component', 'color: hotpink', $muscleGroupsData)
</script>

<section class="dropdown-container">
    <select>
        <option value="0">Select Muscle Group</option>
        {#each $muscleGroupsData as muscleGroup}
            <option value={muscleGroup.id}>{muscleGroup.name}</option>
        {/each}
    </select>
</section>