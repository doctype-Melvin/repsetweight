"use client"

import Form from "@/components/Form"
import Link from "next/link"
import { styled } from "styled-components"
import { useState } from "react"

export default function CreateTemplate() {

    const [ newTemplate, setNewTemplate ] = useState(false);

    return (
        <PageContainer>
            <StyledLink href="/"> &lt; Back </StyledLink>
            <Form setNewTemplate={setNewTemplate} />
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    padding: .5rem 0;
    `