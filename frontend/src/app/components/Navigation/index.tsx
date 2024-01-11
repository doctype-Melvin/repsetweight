"use client";
import "./style.scss";
import { useState } from "react";

export default function Navigation() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <section className="navigation-app">
      <nav>
        <ul>
          <li>Home</li>
          <li>Templates</li>
          <li>Exercises</li>
          <li>Workouts</li>
          <li>Workout Logs</li>
        </ul>
      </nav>
    </section>
  );
}
