<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import Select from "../Inputs/Select.svelte";
    
    export let columns
    // export let handlerFunctions
    export let rowData
    export let type
</script>

<section>
    <table>
        <thead>
            <tr>
                {#each columns as column}
                    <th>{column}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            <!-- Table to render exercises -->
            {#if type === 'exercise'}
            {#each rowData as row}
                <tr>
                    <td>{row.name}</td>
                    <td>
                        <Select optionsCount={20} />
                    </td>
                    <td>
                        <Select optionsCount={35} />
                    </td>
                    <td>
                        <input type="number" min="0" max="1000" />
                    </td>
                </tr>
            {/each}
            {/if}
        </tbody>
    </table>
</section>