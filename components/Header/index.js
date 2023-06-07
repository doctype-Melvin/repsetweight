"use client"
import './style.css'

export default function Header({headerText}){
    return (
        <section className='header__style'>
            {headerText}
            Change name according to page
        </section>
    )
}