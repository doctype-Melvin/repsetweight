<script>
	//@ts-nocheck
	// Template Overview
	import { goto } from '$app/navigation';
	import { templatesData } from '$lib/stores.js';
	import Collapsible from '$lib/components/Collapsible/Collapsible.svelte';
	import Template from '$lib/components/Template/Template.svelte';
	import InfoCard from '$lib/components/InfoCard/InfoCard.svelte';

	let userTempaltes = $templatesData.filter((item) => item.user_generated === true);
	let presetTemplates = $templatesData.filter((item) => item.user_generated === false);
</script>

<InfoCard content={{
	title: 'Create a new template',
	text: 'Use the LightWEIGHT Composer to create a new template',
	button: `Go create`,
	href: '/'
}} />

{#if userTempaltes.length > 0}
	<section>
		<Collapsible header={'Your Templates'}>
			{#each userTempaltes as template}
				<Template {template} />
			{/each}
		</Collapsible>
	</section>
{/if}

{#if presetTemplates.length}
	<section>
		<Collapsible header={'Preset Templates'}>
			{#each presetTemplates as template}
				<Template {template} />
			{/each}
		</Collapsible>
	</section>
{/if}

<button type="button" on:click={() => goto('/')}>Home</button>

<style>
</style>
