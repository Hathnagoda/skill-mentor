import { useEffect, useState } from 'react'
import {
  cancelSession,
  completeSession,
  confirmPayment,
  confirmSession,
  fetchAllSessions,
  fetchSessionsByPaymentStatus,
  fetchSessionsByStatus,
  updateMeetingLink,
} from '../services/api'
import type { Session } from '../types/session'

const badgeClass = (value: string) => {
  if (value === 'CONFIRMED') return 'bg-blue-100 text-blue-700 ring-blue-200'
  if (value === 'COMPLETED') return 'bg-green-100 text-green-700 ring-green-200'
  if (value === 'PENDING') return 'bg-yellow-100 text-yellow-700 ring-yellow-200'
  if (value === 'CANCELLED') return 'bg-red-100 text-red-700 ring-red-200'
  if (value === 'REJECTED') return 'bg-rose-100 text-rose-700 ring-rose-200'
  return 'bg-slate-100 text-slate-700 ring-slate-200'
}

const buttonBase =
  'rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50'

export default function AdminSessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('')
  const [meetingLinks, setMeetingLinks] = useState<Record<number, string>>({})

  const loadAllSessions = async () => {
    try {
      setLoading(true)
      setErrorMessage('')
      const data = await fetchAllSessions()
      setSessions(data)
    } catch {
      setErrorMessage('Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllSessions()
  }, [])

  const handleStatusFilter = async (value: string) => {
    setStatusFilter(value)
    setPaymentStatusFilter('')

    try {
      setLoading(true)
      setErrorMessage('')

      if (!value) {
        const data = await fetchAllSessions()
        setSessions(data)
      } else {
        const data = await fetchSessionsByStatus(value)
        setSessions(data)
      }
    } catch {
      setErrorMessage('Failed to filter sessions by status')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentStatusFilter = async (value: string) => {
    setPaymentStatusFilter(value)
    setStatusFilter('')

    try {
      setLoading(true)
      setErrorMessage('')

      if (!value) {
        const data = await fetchAllSessions()
        setSessions(data)
      } else {
        const data = await fetchSessionsByPaymentStatus(value)
        setSessions(data)
      }
    } catch {
      setErrorMessage('Failed to filter sessions by payment status')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirmPayment = async (sessionId: number) => {
    try {
      await confirmPayment(sessionId)
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to confirm payment')
    }
  }

  const handleConfirmSession = async (sessionId: number) => {
    try {
      await confirmSession(sessionId)
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to confirm session')
    }
  }

  const handleCompleteSession = async (sessionId: number) => {
    try {
      await completeSession(sessionId)
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to complete session')
    }
  }

  const handleCancelSession = async (sessionId: number) => {
    try {
      await cancelSession(sessionId)
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to cancel session')
    }
  }

  const handleMeetingLinkChange = (sessionId: number, value: string) => {
    setMeetingLinks((prev) => ({
      ...prev,
      [sessionId]: value,
    }))
  }

  const handleUpdateMeetingLink = async (sessionId: number) => {
    const meetingLink = meetingLinks[sessionId]

    if (!meetingLink?.trim()) {
      setErrorMessage('Meeting link cannot be empty')
      return
    }

    try {
      await updateMeetingLink(sessionId, meetingLink)
      await loadAllSessions()
    } catch (error) {
      if (error instanceof Error) setErrorMessage(error.message)
      else setErrorMessage('Failed to update meeting link')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Admin Sessions Dashboard
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Manage sessions, payment flow, status changes, and meeting links.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          >
            <option value="">Filter by Session Status</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <select
            value={paymentStatusFilter}
            onChange={(e) => handlePaymentStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          >
            <option value="">Filter by Payment Status</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-slate-600">Loading sessions...</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && sessions.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">No sessions found</h2>
          <p className="mt-2 text-slate-600">
            There are currently no sessions matching the selected filters.
          </p>
        </div>
      )}

      <div className="grid gap-6">
        {sessions.map((session) => {
          const isCancelled = session.sessionStatus === 'CANCELLED'
          const isCompleted = session.sessionStatus === 'COMPLETED'
          const paymentConfirmed = session.paymentStatus === 'CONFIRMED'
          const sessionConfirmed = session.sessionStatus === 'CONFIRMED'

          return (
            <div
              key={session.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">
                        {session.subjectName}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Student:{' '}
                        <span className="font-medium text-slate-800">
                          {session.studentName}
                        </span>
                      </p>
                      <p className="text-sm text-slate-600">
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

                  <div className="flex flex-wrap gap-2 xl:flex-col xl:items-end">
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

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleConfirmPayment(session.id)}
                    disabled={paymentConfirmed || isCancelled || isCompleted}
                    className={`${buttonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
                  >
                    Confirm Payment
                  </button>

                  <button
                    onClick={() => handleConfirmSession(session.id)}
                    disabled={!paymentConfirmed || sessionConfirmed || isCancelled || isCompleted}
                    className={`${buttonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
                  >
                    Confirm Session
                  </button>

                  <button
                    onClick={() => handleCompleteSession(session.id)}
                    disabled={!sessionConfirmed || isCancelled || isCompleted}
                    className={`${buttonBase} border border-slate-300 bg-white text-slate-700 hover:bg-slate-100`}
                  >
                    Complete Session
                  </button>

                  <button
                    onClick={() => handleCancelSession(session.id)}
                    disabled={isCancelled || isCompleted}
                    className={`${buttonBase} border border-red-200 bg-red-50 text-red-700 hover:bg-red-100`}
                  >
                    Cancel Session
                  </button>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    placeholder="Enter meeting link"
                    value={meetingLinks[session.id] || ''}
                    onChange={(e) => handleMeetingLinkChange(session.id, e.target.value)}
                    disabled={isCancelled || isCompleted}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-100"
                  />

                  <button
                    onClick={() => handleUpdateMeetingLink(session.id)}
                    disabled={isCancelled || isCompleted}
                    className={`${buttonBase} min-w-[180px] bg-blue-600 text-white hover:bg-blue-700`}
                  >
                    Update Meeting Link
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}