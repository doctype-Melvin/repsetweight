"use client";

import "./styles.css";

export default function ClientButton({ textContent, id, handler }) {
  const handleButtonClick = () => handler();

  return (
    <button
      type="button"
      className="button__client"
      onClick={handleButtonClick}
    >
      {textContent}
    </button>
  );
}
