"use client";

import Form from "@/components/Form";
import Link from "next/link";
import styled from "styled-components";

export default function CreateTemplate() {
  
  return (
    <PageContainer>
      <BackLink href="/"> &lt; Back </BackLink>
        <Form />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const BackLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  padding: 0.5rem 0;
`;
