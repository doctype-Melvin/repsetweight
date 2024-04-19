<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    let name = '';
    let description = '';

    let userTemplate = {
        name,
        description,
        workouts: []
    }


    // Component creates the userTemplate in localStorage
    // Component should check if there's already data stored
    // If there is, it should load the data into the form
    // Implement modification of stored data

    export let nextStep;

    const writeToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }
    
    const setInputValue = (event) => {
        event.target.id === 'name' ? userTemplate.name = event.target.value : userTemplate.description = event.target.value;
    }

    const saveFormData = (event) => {
        event.preventDefault();
        console.log(`%c Info Input values`, "color: orange", userTemplate.name, userTemplate.description, )
        writeToLocalStorage('template', userTemplate);
        nextStep('workouts');
    }    
</script>

<section>
    <form on:submit={saveFormData}>
        <legend>Step 1: Basic Information</legend>
        <label for="name">Name</label>
        <input type="text" id="name" on:input={setInputValue} required>
        <label for="description">Description</label>
        <input type="text" id="description" on:input={setInputValue}>
        <button type="button" on:click={() => nextStep('info')}>Back</button>
        <button type="submit">Next</button>
    </form>

</section>

