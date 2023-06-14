import Template from "@/database/models/Templates";
import { BackLink } from "../createTemplate/page";
import TemplateCard from "@/components/TemplateCard";
import styled from "styled-components";

export default async function AllTemplates() {

  const allTemplates = await Template.find()

  return (
    <section>
      <BackLink href="/">&lt; Back </BackLink>
      <ul>
        {allTemplates.map((template) => (
          <TemplateCard template={template} key={template._id} />
        ))}
      </ul>
    </section>
  );
}