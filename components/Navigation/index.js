import { styled } from "styled-components"

export default function Navigation(){
    return (
        <NavigationContainer>
        Links Go Here
        </NavigationContainer>
    )
}

const NavigationContainer = styled.nav`
    background-color: var(--light-purple);
    height: var(--navbar-height);
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
`