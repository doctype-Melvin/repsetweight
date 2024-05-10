<script>
    // @ts-nocheck
    import { writable } from 'svelte/store';
    import { userTemplateData } from '$lib/stores';
    
    export let content = ''
    export let type 
    export let wid
    
    let isInput = writable(false)
    let newContent = writable('')

    const toggleInput = () => {
        isInput.update(boolean => !boolean)
    }

    const handleInput = (event) => {
        newContent.set(event.target.value)
    }
  

    const editWorkout = (workoutID, content, type) => {
        const index = $userTemplateData.workouts.findIndex(workout => workout.wid === workoutID);
        if (content && type === 'description') {
            userTemplateData.update(template => {
                template.workouts[index].description = content;
                return template;
            })
            
        } else if (content && !type){
            userTemplateData.update(template => {
                template.workouts[index].name = content;
                return template;
            })
            
        }
        
        localStorage.setItem('template', JSON.stringify($userTemplateData));
        toggleInput();
    }

</script>

<div>
    {#if $isInput && !type}
        <input type='text' value={content ? content : $newContent} autofocus on:input={handleInput} on:blur={() => editWorkout(wid, $newContent, type)} >
    {:else if $isInput && type}
        <textarea value={content ? content : $newContent} rows="3" cols="40" autofocus on:input={handleInput} on:blur={() => editWorkout(wid, $newContent, type)}></textarea>
    {:else}
        <button type="button" on:click={toggleInput}>{content}</button>
    {/if}
</div>
