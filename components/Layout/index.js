import styled from "styled-components"
import Header from "../Header"
import Navigation from "../Navigation"

const LayoutContainer = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`



export default function MainLayout({ children }) {
    return (
        <LayoutContainer>
            <Header />
            { children }
            <Navigation />
        </LayoutContainer>
    )
}