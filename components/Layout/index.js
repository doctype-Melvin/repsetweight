import Header from "../Header"
import Navigation from "../Navigation"
import './style.css'

export default function MainLayout({ children }) {
    return (
        <section className="layout">
            <Header />
            <main className="page__content">{ children }</main>
            <Navigation />
        </section>
    )
}