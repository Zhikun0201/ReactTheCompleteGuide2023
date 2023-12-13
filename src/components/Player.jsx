import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();

  const [name, setName] = useState("");

  function handleSubmit(event) {
    setName(playerName.current.value)
    playerName.current.value = "";
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? "Unknow Entity"}</h2>
      <p>
        <input type="text" ref={playerName} onKeyDown={handleKeyDown} />
        <button onClick={handleSubmit}>Set Name</button>
      </p>
    </section>
  );
}
