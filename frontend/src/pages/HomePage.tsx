import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:p-12">
        <div className="max-w-3xl space-y-6">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Online Mentoring Platform
          </span>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Learn from expert mentors and book sessions with confidence.
          </h1>

          <p className="text-lg leading-8 text-slate-600">
            SkillMentor helps students discover mentors, explore subjects, book
            learning sessions, and manage their progress in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/mentors"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Explore Mentors
            </Link>

            <Link
              to="/my-sessions"
              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              View My Sessions
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Browse Mentors</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Discover mentors by expertise, profession, and experience.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Book Sessions</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Schedule one-on-one sessions for subjects you want to master.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Track Progress</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Manage your sessions, meeting links, and learning journey easily.
          </p>
        </div>
      </section>
    </div>
  )
}