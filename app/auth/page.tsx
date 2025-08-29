import { AuthForm } from '@/components/auth/AuthForm'
import { AuthRedirect } from '@/components/auth/AuthRedirect'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function AuthPage() {
  return (
    <>
      <AuthRedirect />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">ChatBot</span>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            © 2024 ChatBot. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  )
}
