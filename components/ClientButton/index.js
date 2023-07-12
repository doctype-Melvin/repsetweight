"use client";

import "./styles.css";


export default function ClientButton({ textContent, id }) {
  const handleButtonClick = () => console.log(`Set current for preset with id: ${id}`);

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
