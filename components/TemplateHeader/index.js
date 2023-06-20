export default function TemplateHeader({name, focus}) {
    return (
        <section className="template__header__container">
            <p className="template__name">{name}</p>
            <p className="template__focus">{focus}</p>
        </section>
    )
}

