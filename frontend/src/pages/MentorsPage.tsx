import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMentors } from '../services/api'
import type { Mentor } from '../types/mentor'

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMentors = async () => {
      try {
        const data = await fetchMentors()
        setMentors(data)
      } catch (err) {
        setError('Failed to load mentors')
      } finally {
        setLoading(false)
      }
    }

    loadMentors()
  }, [])

  if (loading) {
    return <p className="text-slate-600">Loading mentors...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mentors</h1>
        <p className="text-slate-600">
          Explore experienced mentors and find the right guide for your learning journey.
        </p>
      </div>

      {mentors.length === 0 ? (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="text-slate-600">No mentors found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <Link
              key={mentor.id}
              to={`/mentors/${mentor.id}`}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 group-hover:text-blue-600">
                    {mentor.firstName} {mentor.lastName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-blue-600">{mentor.title}</p>
                </div>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-medium text-slate-800">Profession:</span>{' '}
                    {mentor.profession}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">Company:</span>{' '}
                    {mentor.company}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">Email:</span>{' '}
                    {mentor.email}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">Experience:</span>{' '}
                    {mentor.experienceYears} years
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-sm font-semibold text-blue-600">
                    View profile →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}