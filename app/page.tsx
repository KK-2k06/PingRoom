'use client'

import { useState, useEffect, useRef } from 'react'
import { Sidebar } from '@/components/chat/Sidebar'
import { Message } from '@/components/chat/Message'
import { ChatInput } from '@/components/chat/ChatInput'
import { Loading } from '@/components/ui/Loading'
import { generateGuestName, generateRoomId } from '@/lib/utils'

interface ChatMessage {
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
}

interface Room {
  id: string
  name: string
  type: 'general' | 'temporary'
  participants: number
  isActive: boolean
}

interface User {
  id: string
  name: string
  status: 'online' | 'idle' | 'dnd' | 'offline'
  isHost?: boolean
}

export default function Home() {
  const [currentRoom, setCurrentRoom] = useState('general')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'general',
      name: 'General Chat',
      type: 'general',
      participants: 5,
      isActive: true,
    },
  ])
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'SwiftPanda#1234', status: 'online', isHost: true },
    { id: '2', name: 'BrightEagle#5678', status: 'online' },
    { id: '3', name: 'CleverDolphin#9012', status: 'idle' },
    { id: '4', name: 'WittyPhoenix#3456', status: 'online' },
    { id: '5', name: 'CharmingTiger#7890', status: 'dnd' },
  ])
  const [isClient, setIsClient] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Simulate initial messages
  useEffect(() => {
    if (isClient) {
      const initialMessages: ChatMessage[] = [
        {
          id: '1',
          content: 'Welcome to PingRoom! 🎉 This is the general chat room where everyone can hang out.',
          sender: {
            id: 'system',
            name: 'System',
            status: 'online',
          },
          timestamp: new Date(Date.now() - 60000),
        },
        {
          id: '2',
          content: 'Hey everyone! How\'s it going?',
          sender: {
            id: '1',
            name: 'SwiftPanda#1234',
            status: 'online',
          },
          timestamp: new Date(Date.now() - 45000),
          emotion: 'happy',
        },
        {
          id: '3',
          content: 'Pretty good! Just exploring this new chat app.',
          sender: {
            id: '2',
            name: 'BrightEagle#5678',
            status: 'online',
          },
          timestamp: new Date(Date.now() - 30000),
          emotion: 'excited',
        },
        {
          id: '4',
          content: 'The emotion tagging feature is really cool! 😊',
          sender: {
            id: '4',
            name: 'WittyPhoenix#3456',
            status: 'online',
          },
          timestamp: new Date(Date.now() - 15000),
          emotion: 'happy',
        },
      ]
      setMessages(initialMessages)
    }
  }, [isClient])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (content: string, emotion?: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: {
        id: 'current-user',
        name: generateGuestName(),
        status: 'online',
      },
      timestamp: new Date(),
      emotion: emotion as any,
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleCreateRoom = () => {
    const roomId = generateRoomId()
    const newRoom: Room = {
      id: roomId,
      name: `Room ${roomId}`,
      type: 'temporary',
      participants: 1,
      isActive: true,
    }
    setRooms(prev => [...prev, newRoom])
    setCurrentRoom(roomId)
    setMessages([])
  }

  const handleRoomSelect = (roomId: string) => {
    setCurrentRoom(roomId)
    // In a real app, you'd load messages for this room
  }

  const handleEndRoom = (roomId: string) => {
    setRooms(prev => prev.filter(room => room.id !== roomId))
    if (currentRoom === roomId) {
      setCurrentRoom('general')
    }
  }

  const handleEditRoom = (roomId: string) => {
    const newName = prompt('Enter new room name:')
    if (newName) {
      setRooms(prev => prev.map(room => 
        room.id === roomId ? { ...room, name: newName } : room
      ))
    }
  }

  const handleMessageEdit = (messageId: string) => {
    const message = messages.find(m => m.id === messageId)
    if (message) {
      const newContent = prompt('Edit message:', message.content)
      if (newContent) {
        setMessages(prev => prev.map(m => 
          m.id === messageId ? { ...m, content: newContent } : m
        ))
      }
    }
  }

  const handleMessageDelete = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId))
  }

  const handleMessageReact = (messageId: string, emotion: string) => {
    setMessages(prev => prev.map(m => 
      m.id === messageId ? { ...m, emotion: emotion as any } : m
    ))
  }

  // Don't render until client-side
  if (!isClient) {
    return <Loading />
  }

  return (
    <div className="flex h-screen bg-chat-bg dark:bg-chat-bg transition-colors duration-200">
      
      {/* Sidebar */}
      <Sidebar
        currentRoom={currentRoom}
        rooms={rooms}
        users={users}
        onRoomSelect={handleRoomSelect}
        onCreateRoom={handleCreateRoom}
        onEndRoom={handleEndRoom}
        onEditRoom={handleEditRoom}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <Message
                key={message.id}
                {...message}
                isOwn={message.sender.id === 'current-user'}
                onEdit={handleMessageEdit}
                onDelete={handleMessageDelete}
                onReact={handleMessageReact}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          placeholder="Type a message..."
        />
      </div>
    </div>
  )
}
