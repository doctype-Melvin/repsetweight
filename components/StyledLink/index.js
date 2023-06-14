import Link from "next/link"
import styled from "styled-components"

export default function StyledLink({ target, targetHref }) {
    return <ShinyLink href={targetHref}>{target}</ShinyLink>
}

const ShinyLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:visited {
    color: var(--turquoise);
  }
`;