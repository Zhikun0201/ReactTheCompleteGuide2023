import { useState } from "react";

export default function Player() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setSubmitted(false);
    setName(event.target.value);
  }

  function handleSubmit(event) {
    setSubmitted(true);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <section id="player">
      <h2>Welcome {submitted ? name : "Unknow Entity"}</h2>
      <p>
        <input type="text" onChange={handleChange} value={name} onKeyDown={handleKeyDown}/>
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
