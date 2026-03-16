import { Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import type { ReactNode } from 'react'

type AdminRouteProps = {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <p className="p-6 text-slate-600">Loading...</p>
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />
  }

  const role = user?.publicMetadata?.role

  if (role !== 'admin') {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Access denied</h1>
        <p className="mt-3 text-slate-600">
          You do not have permission to access the admin page.
        </p>
      </div>
    )
  }

  return <>{children}</>
}