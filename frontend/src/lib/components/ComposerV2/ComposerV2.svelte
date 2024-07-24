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
    <p>
        ComposerV2
    </p>

    <button type="button" on:click={addWorkout}>Add Workout</button>
</section>