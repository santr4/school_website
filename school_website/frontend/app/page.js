'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function LoginPage() {
  const [username, setU] = useState('')
  const [password, setP] = useState('')
  const [role, setR] = useState('Student')
  const router = useRouter()

  async function login() {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json()
    if (data.role) router.push(`/dashboard?role=${data.role}&id=${data.userId}`)
    else alert('Login failed')
  }

  async function signup() {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role })
    });
    const data = await res.json()
    alert(data.message)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Login / Signup</h1>
      <input placeholder='Username' onChange={e => setU(e.target.value)} className="p-2 border rounded" />
      <input type='password' placeholder='Password' onChange={e => setP(e.target.value)} className="p-2 border rounded" />
      <select onChange={e => setR(e.target.value)} className="p-2 border rounded">
        <option>Student</option><option>Teacher</option><option>Principal</option><option>Admin</option>
      </select>
      <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      <button onClick={signup} className="bg-green-500 text-white px-4 py-2 rounded">Signup</button>
    </div>
  )
}
