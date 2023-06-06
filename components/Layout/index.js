"use client"

import Header from "../Header"
import Navigation from "../Navigation"
import './style.css'




export default function MainLayout({ children }) {
    return (
        <section className="layout">
            <Header />
            { children }
            <Navigation />
        </section>
    )
}