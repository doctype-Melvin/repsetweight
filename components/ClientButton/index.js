"use client";

import "./styles.css";

export default function ClientButton({ textContent, type, id, handler }) {
  const handleButtonClick = () => handler();

  return (
    <button
      type={type}
      className="button__client"
      onClick={handler ? handleButtonClick : null}
    >
      {textContent}
    </button>
  );
}
