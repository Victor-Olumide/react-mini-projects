"use client";
import { useState } from "react";

export default function CharacterCounter() {
  const [text, setText] = useState("");

  // Counts
  const charCount = text.length;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount =
    text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(Boolean).length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch {
      alert("Failed to copy!");
    }
  };

  return (
    <main className="h-screen bg-gradient-to-b from-cyan-300 to-purple-300 flex items-center justify-center p-4">
      <div className="p-8 w-full max-w-6xl">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          Character Counter
        </h1>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={8}
          className="w-full bg-white p-3 rounded-lg border-3 outline-none border-black/80 focus:border-blue-500 resize-none"
        />

        <div className="grid grid-cols-3 gap-4 text-center mt-6">
          <div className="p-3 bg-blue-500 rounded-lg shadow text-white">
            <p className="text-sm">Characters</p>
            <p className="md:text-4xl p-3 font-semibold">{charCount}</p>
          </div>
          <div className="p-3 bg-yellow-300 rounded-lg shadow text-black" >
            <p className="text-sm">Words</p>
            <p className="md:text-4xl p-3 font-semibold">{wordCount}</p>
          </div>
          <div className="p-3 bg-green-400 rounded-lg shadow text-white">
            <p className="text-sm">Sentences</p>
            <p className="md:text-4xl p-3 font-semibold">{sentenceCount}</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Copy Text
          </button>
        </div>
      </div>
    </main>
  );
}
