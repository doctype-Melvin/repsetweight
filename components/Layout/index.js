import Header from "../Header"
import Navigation from "../Navigation"
import { styled } from "styled-components"

export default function MainLayout({ children }) {
    return (
        <LayoutContainer>
            <Header />
            <MainContainer>{ children }</MainContainer>
            <Navigation />
        </LayoutContainer>
    )
}

const LayoutContainer = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MainContainer = styled.main`
     flex-grow: 1;
`