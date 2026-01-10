'use client'
import { useUser } from '@clerk/nextjs'

export default function WelcomeGreeting() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null // Or a default guest message
  }

  return (
    <div className="py-4">
      <p className="text-sm font-light uppercase tracking-widest">
        Welcome back, {user.firstName}
      </p>
    </div>
  )
}