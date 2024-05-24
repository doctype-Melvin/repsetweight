<script>
    // @ts-nocheck

    import { muscleGroupsData, selectedMuscleGroups, userTemplateData } from "$lib/stores";
    
    export let toggle
    export let signal
    export let wid
    
    $: muscleData = $muscleGroupsData.sort((a, b) => a.name.localeCompare(b.name))
    
    let preselectedMuscles = null
 
    const submitHandler = (event) => {
        event.preventDefault()
        if (signal === 'muscle') {
            
            const checked = Array.from(event.target.elements).filter(el => el.checked).map(el => {
                return {
                    id: el.value,
                    name: el.name                
                }
            })

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
            console.log($userTemplateData.workouts)
        }
        toggle()
    }
</script>


<section class="flyout-container">
    <div class="flyout">
        <div class="flyout-header">
            <h2>Header</h2>
            <button type="button" on:click={() => toggle()}>X</button>
        </div>

        {#if signal === 'muscle'}
        <div class="flyout-content">
            <form on:submit={submitHandler}>
                {#each muscleData as muscle}
                    <input type="checkbox" id={muscle.id} name={muscle.name} value={muscle.id}>
                    <label for={muscle.id}>{muscle.name}</label><br>
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