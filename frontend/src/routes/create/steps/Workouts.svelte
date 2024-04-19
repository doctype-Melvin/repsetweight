<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { exercisesData } from '$lib/stores';
    import Dropdown from '$lib/components/Exercise/Dropdown.svelte';

    export let nextStep

    const exercises = $exercisesData;

    console.log(`%c Workouts`, "color: #3CDD14", $exercisesData )

    // This component should expand the 
    // object stored in localStorage
    // Create workouts seperately and store them

    const userTemplate = JSON.parse(localStorage.getItem('template'));

    $: userTemplate.workouts;

    console.log(`%c User Template`, "color: #3CDD14", userTemplate)

    const workout = {
        name: '',
        exercises: []
    }

    const selectedExercise = (value) => {
        console.log(`%c Selected Exercise`, "color: #3CDD14", value)
        const exercise = exercises.find(exercise => exercise.id === Number(value));
        userTemplate.workouts = [...userTemplate.workouts, exercise]
        console.log(`%c Selected Exercise`, "color: #3CDD14", userTemplate.workouts)
    }

    const addWorkout = (event) => {
        event.preventDefault();
        console.log(`%c Workout`, "color: #3CDD14", workout)
    }

    const handleInput = (event) => {
        event.target.id === 'workout' ? workout.name = event.target.value : null;
    }
</script>

<form>
    <legend>Step 2: Workouts</legend>
    <label for="workout">Workout</label>
    <input type="text" id="workout" on:input={handleInput} placeholder="Upper, Lower, Push..." required>
    <button type="button" on:click={addWorkout}>Add</button>
</form>

<Dropdown list={exercises} selected={selectedExercise}/>

<section>
    <button type="button" on:click={() => nextStep('info')}>Back</button>
    <button type="button" on:click={() => console.log('summary')}>Next</button>
</section>