"use client"
import { styled } from "styled-components"

export default function Header({headerText}){
    return (
        <HeaderContainer>
            {headerText}
            Change name according to page
        </HeaderContainer>
    )
}

const HeaderContainer = styled.section`
height: fit-content;
padding: .5rem 2rem;
background-color: var(--light-purple);
color: #fff;
text-align: center;
font-size: 1.2rem;
`