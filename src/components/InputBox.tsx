'use client'

import { useState } from 'react'
import ShayariCard from './ShayariCard'

export default function InputBox() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState<'hindi' | 'punjabi'>('hindi')
  const [shayari, setShayari] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    if (!prompt) return

    setIsLoading(true)

    try {
      const res = await fetch('https://shayari-backend-mm8x.onrender.com/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language })
      })

      const data = await res.json()
      setShayari(data.shayari)

      // ✅ Save to localStorage with unique id
      const oldHistory = JSON.parse(localStorage.getItem('shayariHistory') || '[]')
      const newEntry = {
        id: Date.now(), // unique id
        text: data.shayari,
        language,
      }
      const updatedHistory = [newEntry, ...oldHistory]
      localStorage.setItem('shayariHistory', JSON.stringify(updatedHistory))

    } catch (error) {
      console.error('Error generating shayari:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4">
      <textarea
        className="w-full p-4 rounded-md bg-gray-800 text-white resize-none h-24"
        placeholder="Enter theme like मोहब्बत or ਪਿਆਰ..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          onClick={() => setLanguage('hindi')}
          className={`px-4 py-2 rounded ${
            language === 'hindi' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Hindi
        </button>
        <button
          onClick={() => setLanguage('punjabi')}
          className={`px-4 py-2 rounded ${
            language === 'punjabi' ? 'bg-blue-600' : 'bg-gray-700'
          }`}
        >
          Punjabi
        </button>
      </div>
      <button
        onClick={handleGenerate}
        className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Shayari'}
      </button>

      {isLoading && (
        <div className="flex items-center gap-2 mt-4 text-blue-400">
          <svg
            className="animate-spin h-5 w-5 text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Generating magic, hold tight...</span>
        </div>
      )}

      {shayari && !isLoading && (
        <div className="mt-6 w-full">
          <ShayariCard text={shayari} language={language} />
        </div>
      )}
    </div>
  )
}
