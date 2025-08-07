export function Loading() {
  return (
    <div className="flex h-screen bg-chat-bg items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-white text-lg font-medium">Loading PingRoom...</div>
      </div>
    </div>
  )
}
