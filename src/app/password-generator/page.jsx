"use client"

import { useState } from "react"

export default function PasswordGenerator() {
  const [length, setLength] = useState(12)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState("")

  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyz"
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_-+=<>?/{}~"

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      newPassword += chars[randomIndex]
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    alert("Password copied to clipboard!")
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-900 bg-[url(/security.jpg)] bg-cover bg-center bg-no-repeat bg-blend-overlay absolute inset-0 z-0 px-6 py-10">
      <div className="text-white font-bold text-3xl md:text-4xl lg:text-5xl max-w-xl text-center md:text-left md:w-1/2 lg:w-2/5">
        In a world full of digital threats, your first defense is a password —
        make it strong, make it smart, make it unbreakable.
      </div>

      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full md:w-1/2 lg:w-2/5 max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Password Generator
        </h1>

        <div className="mb-4">
          <label className="block text-gray-300 font-medium mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer"
          />
        </div>

        <div className="space-y-2 mb-6">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={includeUpper}
              onChange={(e) => setIncludeUpper(e.target.checked)}
              className="cursor-pointer"
            />
            Include Uppercase Letters
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="cursor-pointer"
            />
            Include Numbers
          </label>
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="cursor-pointer"
            />
            Include Symbols
          </label>
        </div>

        <button
          onClick={generatePassword}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6">
            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <span className="font-mono text-gray-100 break-all">
                {password}
              </span>
              <button
                onClick={copyToClipboard}
                className="ml-3 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
