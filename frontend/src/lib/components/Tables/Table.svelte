<script>
    // @ts-nocheck
    import { userTemplateData } from "$lib/stores";
    import Select from "../Inputs/Select.svelte";
    
    export let columns
    // export let handlerFunctions
    export let rowData
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
            {#each rowData as row}
                <tr>
                    <td>{row.name}</td>
                    {#if row.eid}
                    <td>
                        <Select optionsCount={20} />
                    </td>
                    <td>
                        <Select optionsCount={35} />
                    </td>
                    <td>
                        <input type="number" min="0" max="1000" />
                    </td>
                    {/if}
                </tr>
            {/each}
            
        </tbody>
    </table>
</section>