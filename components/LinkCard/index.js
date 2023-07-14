import './styles.css'

export default function LinkCard({linkTitle, icon, description}) {
    return (
        <section className='container__link'>
            <p className='link__title'>{linkTitle}</p>
            <div className='link__icon'>{icon}</div>
            <p className='link__description'>{description}</p>
        </section>
    )
}