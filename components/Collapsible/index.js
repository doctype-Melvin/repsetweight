"use client";

import { MdOutlineExpandMore as Expand } from "react-icons/md";
import { MdOutlineExpandLess as Collapse } from "react-icons/md";
import { useState } from "react";
import "./styles.css";

export default function Collapsible({ content }) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="container__description">
      <span>Description </span>
      <button
        type="button"
        className="button__toggle"
        onClick={() => setToggle(!toggle)}
      >
        {!toggle && <Expand className="toggle__icon" />}
        {toggle && <Collapse className="toggle__icon" />}
      </button>
      {toggle && <div className="template__description">{content}</div>}
    </div>
  );
}
