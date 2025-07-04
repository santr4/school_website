'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function Dashboard() {
  const params = useSearchParams()
  const role = params.get('role')
  const id = params.get('id')
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      let url = ''
      if (role === 'Principal') url = 'http://localhost:5000/api/insights/principal'
      else if (role === 'Teacher') url = `http://localhost:5000/api/insights/teacher/ClassA/Math`
      else if (role === 'Student') url = `http://localhost:5000/api/insights/student/${id}`
      if (url) {
        const res = await fetch(url)
        const json = await res.json()
        setData(json)
      }
    }
    fetchData()
  }, [role, id])

  async function downloadPDF() {
    const res = await fetch(`http://localhost:5000/api/report/student/${id}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'report_card.pdf'
    a.click()
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard ({role})</h1>
      {role === 'Student' && <button onClick={downloadPDF} className="bg-purple-600 text-white px-3 py-1 rounded mb-4">Download Report Card</button>}
      <BarChart width={600} height={300} data={data} className="bg-white">
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="average" fill="#8884d8" />
      </BarChart>
    </div>
  )
}
