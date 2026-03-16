import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <p className="text-slate-600">Loading...</p>
  }

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    'User'

  const role = user?.publicMetadata?.role

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-3">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Welcome back
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-600">
            Hello, <span className="font-medium text-slate-800">{displayName}</span>.
            Manage your mentoring journey from one place.
          </p>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Link
          to="/mentors"
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">Explore Mentors</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Browse mentors, check expertise, and find the best match for your learning goals.
          </p>
          <p className="mt-4 text-sm font-semibold text-blue-600">Go to mentors →</p>
        </Link>

        <Link
          to="/my-sessions"
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
        >
          <h2 className="text-xl font-semibold text-slate-900">My Sessions</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Check your booked sessions, statuses, and meeting links in one place.
          </p>
          <p className="mt-4 text-sm font-semibold text-blue-600">View sessions →</p>
        </Link>

        {role === 'admin' && (
          <Link
            to="/admin/sessions"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
          >
            <h2 className="text-xl font-semibold text-slate-900">Admin Panel</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review all sessions, manage payments, update meeting links, and complete workflows.
            </p>
            <p className="mt-4 text-sm font-semibold text-blue-600">Open admin tools →</p>
          </Link>
        )}
      </section>
    </div>
  )
}