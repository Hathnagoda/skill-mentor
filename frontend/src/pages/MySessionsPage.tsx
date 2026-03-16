import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { fetchSessionsByStudentName } from '../services/api'
import type { Session } from '../types/session'

const badgeClass = (value: string) => {
  if (value === 'CONFIRMED') return 'bg-blue-100 text-blue-700 ring-blue-200'
  if (value === 'COMPLETED') return 'bg-green-100 text-green-700 ring-green-200'
  if (value === 'PENDING') return 'bg-yellow-100 text-yellow-700 ring-yellow-200'
  if (value === 'CANCELLED') return 'bg-red-100 text-red-700 ring-red-200'
  if (value === 'REJECTED') return 'bg-rose-100 text-rose-700 ring-rose-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

export default function MySessionsPage() {
  const { user, isLoaded } = useUser()

  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const loadSessions = async () => {
      if (!isLoaded || !user) return

      try {
        setLoading(true)
        setErrorMessage('')

        const fullName =
          `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() ||
          user.fullName ||
          ''

        const data = await fetchSessionsByStudentName(fullName)
        setSessions(data)
      } catch {
        setErrorMessage('Failed to load sessions')
      } finally {
        setLoading(false)
      }
    }

    loadSessions()
  }, [isLoaded, user])

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading user details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">My Sessions</h1>
        <p className="mt-2 text-base text-slate-600">
          Logged in as{' '}
          <span className="font-semibold text-slate-800">
            {user?.fullName || 'Student'}
          </span>
        </p>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading sessions...</p>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && sessions.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">No sessions found</h2>
          <p className="mt-2 text-slate-600">
            Your booked sessions will appear here once they are created.
          </p>
        </div>
      )}

      {!loading && !errorMessage && sessions.length > 0 && (
        <div className="grid gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {session.subjectName}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Mentor:{' '}
                      <span className="font-medium text-slate-800">
                        {session.mentorName}
                      </span>
                    </p>
                  </div>

                  <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="font-medium text-slate-800">Date & Time</p>
                      <p className="mt-1">
                        {new Date(session.sessionDateTime).toLocaleString()}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3">
                      <p className="font-medium text-slate-800">Duration</p>
                      <p className="mt-1">{session.durationMinutes} minutes</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="font-medium text-slate-800">Meeting Link</p>
                    <p className="mt-1">
                      {session.meetingLink ? (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 underline transition hover:text-blue-700"
                        >
                          Join Meeting
                        </a>
                      ) : (
                        'Not added yet'
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeClass(
                      session.paymentStatus
                    )}`}
                  >
                    Payment: {session.paymentStatus}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${badgeClass(
                      session.sessionStatus
                    )}`}
                  >
                    Session: {session.sessionStatus}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}