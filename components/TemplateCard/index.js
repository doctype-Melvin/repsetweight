
export default function TemplateCard( { template } ) {
    return (
        <li>
        <div>{template.name}</div>
        <div>{template.focus}</div>
        </li>
    )
}