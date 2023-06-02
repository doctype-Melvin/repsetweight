import styled from "styled-components";

const HeaderSection = styled.section`
height: fit-content;
padding: .5rem 2rem;
background-color: hotpink;
text-align: center;
font-size: 1.5rem;
`

export default function Header({headerText}){
    return (
        <HeaderSection>
            {headerText}
            Change name according to page
        </HeaderSection>
    )
}