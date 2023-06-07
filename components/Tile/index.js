import "./style.css";
import { styled } from "styled-components";

export default function Tile({ title }) {
  return (
    <TileBody>
      <TileTitle>{title}</TileTitle>
      <TileContent>
        Just some sample text to check out the looks of it
      </TileContent>
    </TileBody>
  );
}

const TileBody = styled.section`
  background-color: var(--dark-turqiose);
  width: 90%;
  border-radius: 3px;
`;

const TileTitle = styled.p`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0.5rem 0;
  font-size: 1.3rem;
`;

const TileContent = styled.p`
  padding: 0.5rem;
  background-color: var(--white);
  color: var(--dark-background);
  margin: 0;
  text-align: justify;
  font-size: 1.2rem;
`;
