'use client'

import InputBox from '../components/InputBox'
import ShayariHistory from '../components/ShayariHistory'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Shayari Generator</h1>
      <InputBox />
      <ShayariHistory />
    </main>
  )
}
