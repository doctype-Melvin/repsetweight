"use client";

import "./styles.css";
import Link from "next/link";

export default function Header() {
  return (
    <section className="header__container">
      <Link href="/">
        <div className="logo__container">Logo</div>
      </Link>
      <Link href="/">
        <h1>GYM:log</h1>
      </Link>
    </section>
  );
}
