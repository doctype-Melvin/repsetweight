<script>
    // @ts-nocheck
    import { composerData } from "$lib/stores";
	import { nanoid } from "nanoid";
    
    $: workoutCount = $composerData.workouts.length + 1;

    function addWorkout() {
        const workout = {
            name: `Workout ${workoutCount}`,
            wid: nanoid(7),
            muscles: []
        }

        composerData.update((data) => {
            return { ...data, workouts: [...data.workouts, workout] };
        });

        
    }
    
</script>

<section class="composer-container">
    Lightweight
    {#if $composerData.workouts.length > 0}
        <ul>
            {#each $composerData.workouts as workout, i}
                <li>
                    <h3>{workout.name}</h3>
                    <input type="text" bind:value={workout.name} />
                    <button type="button">Delete</button>
                </li>
            {/each}
        </ul>
            {:else}
            <p>No workouts</p>
    {/if}

    <button type="button" on:click={addWorkout}>Add Workout</button>
</section>