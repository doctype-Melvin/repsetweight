<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { templatesData, userData, isWriteMode } from '$lib/stores.js';

	isWriteMode.set(false);

	const activeTemplate = $templatesData.find(
		(template) => template.id === $userData.active_template
	);
</script>

<button type="button" on:click={() => goto('/create')}>Create Template</button>
<button type="button" on:click={() => goto('/templates')}>All Templates</button>
{#if !$isWriteMode}
	<p><b>Read only mode</b></p>
{/if}
