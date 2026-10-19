"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [floor, setFloor] = useState(1);
  const [direction, setDirection] = useState("Subiendo");
  const [requestedFloor, setRequestedFloor] = useState("");
  const [message, setMessage] = useState("");
  const [targetFloor, setTargetFloor] = useState<number | null>(null);
  const eta =
    targetFloor === null
      ? "--"
      : Math.abs(targetFloor - floor);
  const hasArrived =
    targetFloor !== null &&
    floor === targetFloor;

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
const floors = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <main
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
    }}
  >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1>SMARTLIFT</h1>

        <h2>Ascensor A</h2>
        <div
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        >
          {floors.map((buildingFloor) => (
            <div
              key={buildingFloor}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "120px",
                backgroundColor:
                  floor === buildingFloor
                    ? "#dbeafe"
                    : "transparent",
                borderRadius: "6px",
                padding: "2px",
              }}
            >
              <span>{buildingFloor}</span>

              <span>
                {floor === buildingFloor ? "🛗" : ""}
              </span>
            </div>
          ))}
        </div>

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

        <p>ETA: {eta} segundos</p>

        {hasArrived && (
        <p style={{ color: "green" }}>
          ✅ Ascensor ha llegado
        </p>
        )}
      </div>
    </main>
  );
}