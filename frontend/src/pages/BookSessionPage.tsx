import { useState } from 'react'
import type { FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { createSession } from '../services/api'

export default function BookSessionPage() {
  const [searchParams] = useSearchParams()
  const { user, isLoaded } = useUser()

  const mentorId = searchParams.get('mentorId')
  const subjectId = searchParams.get('subjectId')

  const [sessionDateTime, setSessionDateTime] = useState('')
  const [durationMinutes, setDurationMinutes] = useState(60)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isLoaded) {
    return <p className="text-slate-600">Loading...</p>
  }

  const studentName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    'Student'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage('')

    if (!mentorId || !subjectId) {
      setErrorMessage('Missing mentor or subject information')
      return
    }

    try {
      setLoading(true)

      const payload = {
        studentName,
        sessionDateTime,
        durationMinutes,
        mentorId: Number(mentorId),
        subjectId: Number(subjectId),
      }

      await createSession(payload)

      setSuccessMessage('Session booked successfully!')
      setSessionDateTime('')
      setDurationMinutes(60)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Book a Session
        </h1>
        <p className="text-slate-600">
          Complete the form below to request your mentoring session.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
          <p>
            <span className="font-medium text-slate-800">Mentor ID:</span> {mentorId}
          </p>
          <p>
            <span className="font-medium text-slate-800">Subject ID:</span> {subjectId}
          </p>
          <p className="sm:col-span-2">
            <span className="font-medium text-slate-800">Booking as:</span>{' '}
            {studentName}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">
            Session Date & Time
          </label>
          <input
            type="datetime-local"
            value={sessionDateTime}
            onChange={(e) => setSessionDateTime(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-800">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500"
            min={15}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Book Session'}
        </button>

        {successMessage && (
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-200">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  )
}