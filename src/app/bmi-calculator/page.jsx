"use client";
import { useEffect, useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [status, setStatus] = useState("");
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (isNaN(w) || isNaN(h) || h <= 0) {
      setBmi("");
      setStatus("");
      setRecommendation("");
      return;
    }

    const bmiValue = w / Math.pow(h / 100, 2);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setStatus("Underweight");
      setRecommendation(
        "Consider a balanced diet and consult a healthcare provider."
      );
    } else if (bmiValue < 25) {
      setStatus("Normal");
      setRecommendation("Maintain your healthy lifestyle.");
    } else if (bmiValue < 30) {
      setStatus("Overweight");
      setRecommendation(
        "Try to increase physical activity and watch your diet."
      );
    } else {
      setStatus("Obese");
      setRecommendation(
        "Seek advice from a healthcare professional for weight management."
      );
    }
  }, [weight, height]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[url('/fruit.jpg')] bg-cover bg-center bg-no-repeat px-4 absolute inset-0 z-0">
      <h1 className="uppercase font-bold text-4xl md:text-5xl text-white tracking-[20px] mb-10 text-center">
        Body Mass Index
      </h1>

      <section className="grid md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800">Enter Details</h2>
          <input
            type="number"
            placeholder="Weight in kilograms"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Height in centimeters"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg p-8 flex flex-col gap-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Result</h2>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">BMI:</span>{" "}
            {bmi || "Enter values to calculate"}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            {status || "Awaiting input"}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Recommendation:</span>{" "}
            {recommendation || "Enter values to see advice"}
          </p>
        </div>
      </section>
    </main>
  );
}
