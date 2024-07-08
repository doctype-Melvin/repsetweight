<script>
	import { goto } from '$app/navigation';

	export let workout;
	console.log('Workout data: ', workout);
</script>

<button type="button" on:click={() => goto('/templates')}>All Templates</button>
