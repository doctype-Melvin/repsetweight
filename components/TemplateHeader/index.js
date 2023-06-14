"use client"

import { styled } from "styled-components"

export default function TemplateHeader({name, focus}) {
    return (
        <ContentContainer>
            <StyledHeading>{name}</StyledHeading>
            <p>{focus}</p>
        </ContentContainer>
    )
}

const ContentContainer = styled.div`
width: 100%;
display: grid;
grid-template-columns: 1fr;
justify-items: center;
`

const StyledHeading = styled.h1`
padding: 0;
margin: 0;
`