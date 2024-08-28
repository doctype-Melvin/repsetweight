<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { templatesData, isWriteMode } from '$lib/stores.js';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';

	isWriteMode.set(false);
</script>

<Sidebar />

{#if !$isWriteMode}
	<p><b>Read only mode</b></p>
{/if}
