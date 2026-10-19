"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [floor, setFloor] = useState(1);
  const [direction, setDirection] = useState("Subiendo");
  const [requestedFloor, setRequestedFloor] = useState("");
  const [message, setMessage] = useState("");
  const [targetFloor, setTargetFloor] = useState<number | null>(null);

useEffect(() => {
  const interval = setInterval(() => {

    if (targetFloor === null) return;

    setFloor((currentFloor) => {

      if (currentFloor < targetFloor) {
        setDirection("Subiendo");
        return currentFloor + 1;
      }

      if (currentFloor > targetFloor) {
        setDirection("Bajando");
        return currentFloor - 1;
      }

      setDirection("Disponible");
      return currentFloor;

    });

  }, 1000);

  return () => clearInterval(interval);

}, [targetFloor])
  /*useEffect(() => {
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
  }, [direction]);*/

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

      <input
      type="number"
      placeholder="Introduce tu planta"
      value={requestedFloor}
      onChange={(e) => setRequestedFloor(e.target.value)}
      style={{
        padding: "8px",
        fontSize: "16px",
      }}
      />
      <button
      onClick={() => {
      const selectedFloor = Number(requestedFloor);

      setTargetFloor(selectedFloor);

      setMessage(`Ascensor solicitado a la planta ${selectedFloor}`);
      }}
      >
      Llamar ascensor
      </button>
      <p>Destino: {targetFloor ?? "--"}</p>
    </main>
  );
}