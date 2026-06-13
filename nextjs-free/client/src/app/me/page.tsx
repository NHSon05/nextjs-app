import { cookies } from 'next/headers'
import Profile from './profile'
import { redirect } from 'next/navigation'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value) {
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Profile />
      </div>
    </div>
  )
}