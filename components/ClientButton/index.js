"use client";

import "./styles.css";

export default function ClientButton({ textContent, type, handler, modifier }) {
  const onButtonClick = () => handler();

  return (
    <button
      type={type}
      className={`button__client ${modifier}`}
      onClick={handler ? onButtonClick : null}
    >
      {textContent}
    </button>
  );
}
