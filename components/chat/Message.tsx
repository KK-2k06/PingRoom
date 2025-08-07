import { formatTime } from '@/lib/utils'
import { MessageCircle, Edit, Trash2, Heart, Smile, Frown, Angry, Zap } from 'lucide-react'

interface MessageProps {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar?: string
    status?: 'online' | 'idle' | 'dnd' | 'offline'
  }
  timestamp: Date
  emotion?: 'happy' | 'sad' | 'angry' | 'excited' | 'neutral'
  isOwn?: boolean
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  onReact?: (id: string, emotion: string) => void
}

const emotionIcons = {
  happy: Smile,
  sad: Frown,
  angry: Angry,
  excited: Zap,
  neutral: Heart,
}

const emotionColors = {
  happy: 'bg-yellow-400 text-yellow-900',
  sad: 'bg-blue-400 text-blue-900',
  angry: 'bg-red-400 text-red-900',
  excited: 'bg-orange-400 text-orange-900',
  neutral: 'bg-gray-400 text-gray-900',
}

export function Message({
  id,
  content,
  sender,
  timestamp,
  emotion,
  isOwn = false,
  onEdit,
  onDelete,
  onReact,
}: MessageProps) {
  const EmotionIcon = emotion ? emotionIcons[emotion] : null

  return (
    <div className="message group animate-fade-in">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
            {sender.avatar ? (
              <img src={sender.avatar} alt={sender.name} className="w-full h-full rounded-full" />
            ) : (
              sender.name.charAt(0).toUpperCase()
            )}
          </div>
          {sender.status && (
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-chat-bg status-${sender.status}`} />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-white hover:underline cursor-pointer">
              {sender.name}
            </span>
            <span className="text-xs text-gray-400">
              {formatTime(timestamp)}
            </span>
            {emotion && (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${emotionColors[emotion]}`}>
                {EmotionIcon && <EmotionIcon className="w-3 h-3 mr-1" />}
                {emotion}
              </span>
            )}
          </div>
          
          <div className="text-gray-200 leading-relaxed">
            {content}
          </div>

          {/* Message Actions */}
          <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isOwn && (
              <>
                <button
                  onClick={() => onEdit?.(id)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  title="Edit message"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete?.(id)}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            
            {/* Quick Reactions */}
            <div className="flex items-center space-x-1">
              {Object.entries(emotionIcons).map(([emotionKey, Icon]) => (
                <button
                  key={emotionKey}
                  onClick={() => onReact?.(id, emotionKey)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-chat-hover"
                  title={`React with ${emotionKey}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
