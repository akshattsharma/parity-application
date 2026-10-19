import React, { useState } from "react";

// Every visible string lives here so it can be matched to the design images in one place.
const TEXT = {
  title: "Check Parity",
  label: "Enter a number",
  placeholder: "Enter a number",
  even: "The number is even",
  odd: "The number is odd",
  invalid: "Not a number",
};

// Reads parity from the last digit, so very large whole numbers stay exact.
function check(value) {
  const v = value.trim();
  if (v === "") return null;
  if (!/^[-+]?\d+$/.test(v)) return TEXT.invalid;
  return Number(v[v.length - 1]) % 2 === 0 ? TEXT.even : TEXT.odd;
}

export default function App() {
  const [value, setValue] = useState("");
  const result = check(value);

  return (
    <main className="app">
      <h1>{TEXT.title}</h1>

      <label htmlFor="number">{TEXT.label}</label>
      <input
        id="number"
        name="number"
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={TEXT.placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      {result && (
        <p className={`result ${result === TEXT.invalid ? "bad" : "good"}`} role="status">
          {result}
        </p>
      )}
    </main>
  );
}
