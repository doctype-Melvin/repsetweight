"use client";

import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { BackLink } from "../createTemplate/page";

export default function AllTemplates() {
  const [allTemplates, setAllTemplates] = useState("");

  useEffect(() => {
    fetch(`/api/templates`)
      .then((res) => res.json())
      .then((data) => setAllTemplates(data));
  }, []);

  if (!allTemplates) return <div>Loading...</div>;

  if (allTemplates.length === 0) return (
  <>
  <BackLink href="/">&lt; Back </BackLink>
  <div>No templates found</div>
  </>
  );

  return (
    <PageContainer>
      <BackLink href="/">&lt; Back </BackLink>
      <ul>
        {allTemplates.map((template) => (
          <li key={template._id}>{template.name}</li>
        ))}
      </ul>
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
