import Link from "next/link";
import styles from "./styles.module.css";
import TileElement from "@/components/TileElement";
import { SlBookOpen as Book } from "react-icons/sl";
import { AiOutlineFileAdd as Write } from "react-icons/ai";
import LinkCard from "@/components/LinkCard";

export default function Home() {
  return (
    <section>
      <div>Card 1</div>
      <div>Card 2</div>
      <div>Card 3</div>
    </section>
  );
}
