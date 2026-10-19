import React, { useState } from "react";

// Every visible string lives here so it can be matched to the design images in one place.
const TEXT = {
  title: "Check Parity",
  label: "Enter a number",
  placeholder: "Enter a number",
  button: "Check",
  even: (n) => `The number ${n} is even!`,
  odd: (n) => `Oops, ${n} is odd!`,
  invalid: "Not a valid number!",
};

// Reads parity from the last digit, so very large whole numbers stay exact.
function check(value) {
  const v = value.trim();
  if (!/^[-+]?\d+$/.test(v)) return { text: TEXT.invalid, kind: "bad" };
  return Number(v[v.length - 1]) % 2 === 0
    ? { text: TEXT.even(v), kind: "good" }
    : { text: TEXT.odd(v), kind: "bad" };
}

export default function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setResult(check(value));
  };

  return (
    <main className="app">
      <h1>{TEXT.title}</h1>

      <form className="form" onSubmit={submit}>
        <label htmlFor="number">{TEXT.label}</label>
        <input
          id="number"
          name="number"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder={TEXT.placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setResult(null);
          }}
        />
        <button type="submit" className="btn">{TEXT.button}</button>
      </form>

      {result && (
        <p className={`result ${result.kind}`} role="status">{result.text}</p>
      )}
    </main>
  );
}