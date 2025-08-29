import { useState, useEffect } from 'react'
import { 
  MessageCircle, 
  Users, 
  Plus, 
  Settings, 
  Crown, 
  Hash, 
  Wifi, 
  WifiOff,
  MoreVertical,
  Edit,
  Trash2,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { generateGuestName } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useAuth } from '@/lib/auth-context'

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

interface SidebarProps {
  currentRoom: string
  rooms: Room[]
  users: User[]
  onRoomSelect: (roomId: string) => void
  onCreateRoom: () => void
  onEndRoom?: (roomId: string) => void
  onEditRoom?: (roomId: string) => void
}

export function Sidebar({
  currentRoom,
  rooms,
  users,
  onRoomSelect,
  onCreateRoom,
  onEndRoom,
  onEditRoom,
}: SidebarProps) {
  const { user, logout } = useAuth()
  const [showUserList, setShowUserList] = useState(true)
  const [showRoomOptions, setShowRoomOptions] = useState<string | null>(null)
  const [guestName, setGuestName] = useState<string>('')

  useEffect(() => {
    setGuestName(generateGuestName())
  }, [])

  const currentRoomData = rooms.find(room => room.id === currentRoom)

  return (
    <div className="sidebar w-64 flex flex-col h-full bg-chat-sidebar dark:bg-chat-sidebar border-r border-gray-700 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
              <div className="p-4 border-b border-gray-700 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white dark:text-white">PingRoom</h1>
          <Button
            onClick={onCreateRoom}
            size="sm"
            className="bg-accent-500 hover:bg-accent-600"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Room
          </Button>
        </div>
      </div>

      {/* Current Room Info */}
      {currentRoomData && (
        <div className="p-4 border-b border-gray-700 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Hash className="w-5 h-5 text-primary-400" />
              <div>
                <h2 className="font-semibold text-white dark:text-white">{currentRoomData.name}</h2>
                <p className="text-xs text-gray-400 dark:text-gray-400">
                  {currentRoomData.participants} participants
                  {currentRoomData.type === 'temporary' && ' • Temporary'}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowRoomOptions(showRoomOptions === currentRoom ? null : currentRoom)}
                className="p-1 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {showRoomOptions === currentRoom && (
                <div className="absolute right-0 top-full mt-1 bg-chat-sidebar dark:bg-chat-sidebar border border-gray-600 dark:border-gray-600 rounded-lg shadow-lg p-1 z-10 min-w-32">
                  {onEditRoom && (
                    <button
                      onClick={() => {
                        onEditRoom(currentRoom)
                        setShowRoomOptions(null)
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-chat-hover dark:hover:bg-chat-hover rounded transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Room</span>
                    </button>
                  )}
                  {onEndRoom && currentRoomData.type === 'temporary' && (
                    <button
                      onClick={() => {
                        onEndRoom(currentRoom)
                        setShowRoomOptions(null)
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>End Room</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Rooms */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-300 uppercase tracking-wider">
              Rooms
            </h3>
            <button
              onClick={() => setShowUserList(!showUserList)}
              className="text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors duration-200"
            >
              <Users className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => onRoomSelect(room.id)}
                className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 text-left ${
                  currentRoom === room.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-chat-hover dark:hover:bg-chat-hover'
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                <span className="flex-1 truncate">{room.name}</span>
                {room.type === 'temporary' && (
                  <span className="text-xs bg-accent-500 text-white px-1 rounded">TEMP</span>
                )}
                <div className="flex items-center space-x-1">
                  {room.isActive ? (
                    <Wifi className="w-3 h-3 text-green-400" />
                  ) : (
                    <WifiOff className="w-3 h-3 text-gray-500" />
                  )}
                  <span className="text-xs text-gray-400">{room.participants}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Users */}
        {showUserList && (
          <div className="p-4 border-t border-gray-700 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-300 dark:text-gray-300 uppercase tracking-wider mb-3">
              Online — {users.filter(u => u.status === 'online').length}
            </h3>
            
            <div className="space-y-1">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-chat-hover dark:hover:bg-chat-hover transition-colors duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-chat-bg dark:border-chat-bg status-${user.status}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-200 dark:text-gray-200 truncate">{user.name}</span>
                      {user.isHost && <Crown className="w-3 h-3 text-yellow-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white font-bold text-xs transition-colors duration-300">
            {user?.name?.charAt(0).toUpperCase() || guestName?.charAt(0).toUpperCase() || 'G'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-200 dark:text-gray-200 truncate transition-colors duration-300">
              {user?.name || guestName || 'Guest'}
            </p>
            <p className="text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
              <span className="text-gray-400 dark:text-gray-300 transition-colors duration-300">Online</span>
            </p>
          </div>
          <ThemeToggle />
          <button className="p-1 text-gray-400 dark:text-gray-400 hover:text-white dark:hover:text-white transition-all duration-300">
            <Settings className="w-4 h-4" />
          </button>
          <button 
            onClick={logout}
            className="p-1 text-gray-400 dark:text-gray-400 hover:text-red-400 dark:hover:text-red-400 transition-all duration-300"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
