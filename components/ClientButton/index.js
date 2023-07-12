"use client";

import "./styles.css";

export default function ClientButton({ textContent }) {
  const handleButtonClick = () => console.log("Current button clicked");

  return (
    <button
      type="button"
      className="button__current"
      onClick={handleButtonClick}
    >
      {textContent}
    </button>
  );
}
