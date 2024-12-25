'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PassPointsAuth from '@/components/PassPointsAuth'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<'teacher' | 'student'>('student')
  const router = useRouter()

  const handleRegister = async (points: { x: number; y: number }[]) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, userType, points }),
    })

    if (response.ok) {
      router.push('/login')
    } else {
      const data = await response.json()
      alert(data.message || 'Registration failed. Please try again.')
    }
  }

  const imageUrl = 'https://picsum.photos/500/300'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'teacher' | 'student')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <PassPointsAuth
            imageUrl={imageUrl}
            onAuthenticate={handleRegister}
            isRegistration={true}
          />
        </div>
      </div>
    </div>
  )
}

