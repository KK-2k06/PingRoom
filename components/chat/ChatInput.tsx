import { useState, useRef, useEffect } from 'react'
import { Send, Smile, Paperclip, Mic, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ChatInputProps {
  onSendMessage: (message: string, emotion?: string) => void
  placeholder?: string
  disabled?: boolean
}

const emotions = [
  { key: 'happy', label: 'Happy', icon: Smile, color: 'text-yellow-400' },
  { key: 'sad', label: 'Sad', icon: Smile, color: 'text-blue-400' },
  { key: 'angry', label: 'Angry', icon: Smile, color: 'text-red-400' },
  { key: 'excited', label: 'Excited', icon: Smile, color: 'text-orange-400' },
  { key: 'neutral', label: 'Neutral', icon: Smile, color: 'text-gray-400' },
]

export function ChatInput({ onSendMessage, placeholder = "Type a message...", disabled = false }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [showEmotions, setShowEmotions] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), selectedEmotion || undefined)
      setMessage('')
      setSelectedEmotion(null)
      inputRef.current?.focus()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmotionSelect = (emotion: string) => {
    setSelectedEmotion(emotion === selectedEmotion ? null : emotion)
    setShowEmotions(false)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  return (
    <div className="border-t border-gray-700 bg-chat-input p-4">
      {/* Selected Emotion Display */}
      {selectedEmotion && (
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm text-gray-400">Emotion:</span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-400 text-white">
            {emotions.find(e => e.key === selectedEmotion)?.label}
          </span>
          <button
            onClick={() => setSelectedEmotion(null)}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex items-end space-x-3">
        {/* Emotion Picker */}
        <div className="relative">
          <button
            onClick={() => setShowEmotions(!showEmotions)}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-chat-hover"
            title="Add emotion"
          >
            <Smile className="w-5 h-5" />
          </button>
          
          {showEmotions && (
            <div className="absolute bottom-full left-0 mb-2 bg-chat-sidebar border border-gray-600 rounded-lg shadow-lg p-2 z-10">
              <div className="grid grid-cols-5 gap-1">
                {emotions.map((emotion) => (
                  <button
                    key={emotion.key}
                    onClick={() => handleEmotionSelect(emotion.key)}
                    className={`p-2 rounded-md transition-colors duration-200 ${
                      selectedEmotion === emotion.key
                        ? 'bg-accent-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-chat-hover'
                    }`}
                    title={emotion.label}
                  >
                    <emotion.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-chat-input border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none max-h-32"
            rows={1}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-chat-hover"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <button
            className="p-2 text-gray-400 hover:text-white transition-colors duration-200 rounded-md hover:bg-chat-hover"
            title="Voice message"
          >
            <Mic className="w-5 h-5" />
          </button>
          
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            size="sm"
            className="px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
