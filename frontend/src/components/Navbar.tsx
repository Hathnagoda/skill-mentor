import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? 'text-blue-600' : 'text-slate-700 hover:text-blue-600'
  }`

export default function Navbar() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-3xl font-bold tracking-tight text-slate-900">
          SkillMentor
        </Link>

        <div className="flex items-center gap-5">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/mentors" className={navLinkClass}>
            Mentors
          </NavLink>

          <SignedIn>
            <NavLink to="/my-sessions" className={navLinkClass}>
              My Sessions
            </NavLink>

            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>

            {role === 'admin' && (
              <NavLink to="/admin/sessions" className={navLinkClass}>
                Admin
              </NavLink>
            )}

            <UserButton />
          </SignedIn>

          <SignedOut>
            <NavLink to="/sign-in" className={navLinkClass}>
              Sign In
            </NavLink>

            <NavLink to="/sign-up" className={navLinkClass}>
              Sign Up
            </NavLink>
          </SignedOut>
        </div>
      </nav>
    </header>
  )
}