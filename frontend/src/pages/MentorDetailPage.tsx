import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchMentorById, fetchSubjectsByMentorId } from '../services/api'
import type { Mentor } from '../types/mentor'
import type { Subject } from '../types/subject'

export default function MentorDetailPage() {
  const { id } = useParams()

  const [mentor, setMentor] = useState<Mentor | null>(null)
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMentorDetails = async () => {
      if (!id) return

      try {
        const mentorData = await fetchMentorById(id)
        const subjectData = await fetchSubjectsByMentorId(id)

        setMentor(mentorData)
        setSubjects(subjectData)
      } catch (err) {
        setError('Failed to load mentor details')
      } finally {
        setLoading(false)
      }
    }

    loadMentorDetails()
  }, [id])

  if (loading) {
    return <p className="text-slate-600">Loading mentor details...</p>
  }

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (!mentor) {
    return <p className="text-slate-600">Mentor not found.</p>
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {mentor.firstName} {mentor.lastName}
            </h1>
            <p className="mt-2 text-lg font-medium text-blue-600">{mentor.title}</p>
          </div>

          <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-2">
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
              <span className="font-medium text-slate-800">Phone:</span>{' '}
              {mentor.phoneNumber}
            </p>
            <p>
              <span className="font-medium text-slate-800">Experience:</span>{' '}
              {mentor.experienceYears} years
            </p>
            <p>
              <span className="font-medium text-slate-800">Certified:</span>{' '}
              {mentor.isCertified ? 'Yes' : 'No'}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">About</h2>
            <p className="mt-2 leading-7 text-slate-600">{mentor.bio}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Subjects</h2>
          <p className="mt-1 text-slate-600">
            Choose a subject and continue to booking.
          </p>
        </div>

        {subjects.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-600">No subjects available for this mentor.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {subjects.map((subject) => (
              <div
                key={subject.id}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
              >
                <h3 className="text-xl font-semibold text-slate-900">{subject.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {subject.description}
                </p>

                <Link
                  to={`/book-session?mentorId=${mentor.id}&subjectId=${subject.id}`}
                  className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Book this subject
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}