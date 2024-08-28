<script>
	import { templatesData, exercisesData } from '$lib/stores.js';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

	export let data;

	templatesData.set(data.templates);
	exercisesData.set(data.exercises);
	
</script>

<section>
	
	<Sidebar />
	<slot />
</section>


<style>
	:global(html, body) {
		font-family: sans-serif;
		margin: 0;
		padding: 0;
	}

	:global(a) {
		text-decoration: none;
	}

	section {
		height: 100vh;
	}

</style>
