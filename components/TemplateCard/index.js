
export default function TemplateCard( { template } ) {
    return (
        <li>
        <div>{template.name}</div>
        <div>{template.focus}</div>
        </li>
    )
}

// replace createTemplate dir path with something like
// template/new/*here is the page with the form* 
// template/[id]/*individual template page*
// template/all/*all templates page*