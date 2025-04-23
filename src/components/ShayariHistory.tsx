'use client'

import { useEffect, useState } from 'react'
import ShayariCard from './ShayariCard'

type Entry = { text: string; language: string }

export default function ShayariHistory() {
  const [history, setHistory] = useState<Entry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('shayariHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const deleteEntry = (index: number) => {
    const confirmDelete = confirm('Are you sure you want to delete this Shayari?')
    if (!confirmDelete) return

    const newHistory = [...history]
    newHistory.splice(index, 1)
    setHistory(newHistory)
    localStorage.setItem('shayariHistory', JSON.stringify(newHistory))
  }

  const clearAll = () => {
    const confirmClear = confirm('Are you sure you want to clear all Shayari history?')
    if (!confirmClear) return

    setHistory([])
    localStorage.removeItem('shayariHistory')
  }

  const downloadHistory = () => {
    const content = history.map((h, i) => `#${i + 1} (${h.language.toUpperCase()})\n${h.text}\n\n`).join('')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shayari_history.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (history.length === 0) return <p className="text-gray-400 mt-4">No history found.</p>

  return (
    <div className="w-full mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Shayari History</h2>
        <div className="flex gap-3">
          <button
            onClick={downloadHistory}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Download History
          </button>
          <button
            onClick={clearAll}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {history.map((entry, index) => (
          <div key={index} className="relative">
            <ShayariCard text={entry.text} language={entry.language as 'hindi' | 'punjabi'} />
            <button
              onClick={() => deleteEntry(index)}
              className="absolute top-2 right-2 text-red-400 hover:text-red-600"
              title="Remove Shayari"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
