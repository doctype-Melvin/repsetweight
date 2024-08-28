<script>
    // @ts-nocheck
    import { composerData } from "$lib/stores";
    import { addWorkout } from "../actions";
	import { nanoid } from "nanoid";
	import WorkoutCard from "../WokroutCard/WorkoutCard.svelte";

    let editMode = true
    
</script>

<section class="composer-container">
    Lightweight
    {#if $composerData.workouts.length > 0}
        <ul>
            {#each $composerData.workouts as workout, i}
                <li>
                    <WorkoutCard {workout} {editMode} />
                </li>
            {/each}
        </ul>
            {:else}
            <p>No workouts</p>
    {/if}

    <button type="button" on:click={() => addWorkout(composerData)}>Add Workout</button>
</section>