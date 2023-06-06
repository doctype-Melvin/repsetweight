import './style.css'

export default function Tile({ title }){
    return (
        <section className="tile__body">
            <p className="tile__title">{title}</p>
            <p className="tile__content">Just some sample text to check out the looks of it</p>
        </section>
    )
}
