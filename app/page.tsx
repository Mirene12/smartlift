"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [floor, setFloor] = useState(1);
  const [direction, setDirection] = useState("Subiendo");

  useEffect(() => {
    const interval = setInterval(() => {
      setFloor((currentFloor) => {
        if (currentFloor >= 10) {
          setDirection("Bajando");
          return currentFloor - 1;
        }

        if (currentFloor <= 1) {
          setDirection("Subiendo");
          return currentFloor + 1;
        }

        return direction === "Subiendo"
          ? currentFloor + 1
          : currentFloor - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: "20px",
      }}
    >
      <h1>SMARTLIFT</h1>

      <h2>Ascensor A</h2>

      <p>Planta actual: {floor}</p>

      <p>Estado: {direction}</p>

      <button>Llamar ascensor</button>
    </main>
  );
}