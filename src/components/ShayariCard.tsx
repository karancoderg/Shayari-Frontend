'use client'

interface ShayariCardProps {
  text: string
  language: 'hindi' | 'punjabi'
}

// ShayariCard.tsx
export default function ShayariCard({ text, language, onRemove }: { text: string, language: string, onRemove?: () => void }) {
  return (
    <div className="relative bg-gray-900 p-4 rounded-md shadow-md text-white">
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600"
        >
          ❌
        </button>
      )}
      <p className="text-lg whitespace-pre-line">{text}</p>
      <p className="text-sm mt-2 text-gray-400 italic">Language: {language}</p>
    </div>
  )
}

