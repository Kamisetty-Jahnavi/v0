'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PassPointsAuth from '@/components/PassPointsAuth'
import Link from 'next/link'

export default function Login() {
  const [userType, setUserType] = useState<'teacher' | 'student' | null>(null)
  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleAuthenticate = async (points: { x: number; y: number }[]) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, userType, points }),
    });

    if (response.ok) {
      const data = await response.json();
      router.push(data.userType === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    } else {
      alert('Authentication failed. Please try again.');
    }
  };

  const imageUrl = 'https://picsum.photos/500/300'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {!userType ? (
          <div className="space-y-4">
            <button
              onClick={() => setUserType('teacher')}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Teacher Login
            </button>
            <button
              onClick={() => setUserType('student')}
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Student Login
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <PassPointsAuth
              imageUrl={imageUrl}
              onAuthenticate={handleAuthenticate}
            />
          </div>
        )}
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-500 hover:underline">
            New user? Register here
          </Link>
        </div>
      </div>
    </div>
  )
}
