<script>
    // @ts-nocheck
    import { muscleGroupsData, userTemplateData } from "$lib/stores";
    import { derived } from "svelte/store";
    
    export let toggle
    export let signal
    export let wid
    
    // Sort muscle groups alphabetically
    // The component renders a list of checkboxes for each muscle group
    $: muscleData = $muscleGroupsData.sort((a, b) => a.name.localeCompare(b.name))

    // Manage preselected muscles
    // If users want to change their muscle groups for a workout,
    // they can reopen the flyout and see the selected muscles immediately
    // A derivative of the userTemplateData store is used to filter the workout
    // and to set the preselectedMuscles value
    let preselectedMuscles = null

    const filterWorkoutStore = derived(userTemplateData, ($userTemplateData) => {
        return $userTemplateData.workouts.find(workout => workout.wid === wid)
    })

    filterWorkoutStore.subscribe(value => {
        if (value === undefined) return
        preselectedMuscles = value.muscles
    })
    
 
    const submitHandler = (event) => {
        event.preventDefault()
        if (signal === 'muscle') {
            
            // Get all checked checkboxes and create an array of objects
            const checked = Array.from(event.target.elements).filter(el => el.checked).map(el => {
                return {
                    id: el.value,
                    name: el.name                
                }
            })

            // Update the userTemplateData store with the new muscle groups
            userTemplateData.update(data => {
                const updatedWorkouts = data.workouts.map(workout => {
                    if (workout.wid === wid) {
                        return {
                            ...workout,
                            muscles: checked
                        }
                    } else {
                        return workout
                    }
                })
                return {workouts: updatedWorkouts}
            })
            
        }
        toggle()
    }
</script>


<section class="flyout-container">
    <div class="flyout">
        <div class="flyout-header">
            <h2>Select {signal}s</h2>
            <button type="button" on:click={() => toggle()}>X</button>
        </div>
        <!-- Flyout for muscle groups -->
        {#if signal === 'muscle'}
        <div class="flyout-content">
            <form on:submit={submitHandler}>
                {#each muscleData as muscle}
                <!-- Checks if there are already selected muscles and adds them to the list with a checkmark -->
                {#if preselectedMuscles.length}
                    {#if preselectedMuscles.find(m => Number(m.id) === muscle.id)}
                        <input type="checkbox" id={muscle.id} name={muscle.name} value={muscle.id} checked>
                        <label for={muscle.id}>{muscle.name}</label><br>
                    {:else}
                        <input type="checkbox" id={muscle.id} name={muscle.name} value={muscle.id} >
                        <label for={muscle.id}>{muscle.name}</label><br>
                    {/if}
                {:else}
                <!-- No preselected muscles? No problem! Just render the list -->
                    <input type="checkbox" id={muscle.id} name={muscle.name} value={muscle.id} >
                    <label for={muscle.id}>{muscle.name}</label><br>
                {/if}
                {/each}
                <button type="submit">Submit</button>
            </form>
        </div>
        
        {/if}

    </div>
</section>




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