import envConfig from '@/config'
import { cookies } from 'next/headers'
import Profile from './profile'
import { redirect } from 'next/navigation'

export default async function MeProfile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  if (!sessionToken?.value) {
    redirect('/login')
  }

  let user = null
  try {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken.value}`
        }
      }
    )

    if (!result.ok) {
      redirect('/login')
    }

    const payload = await result.json()
    user = payload.data
  } catch (error) {
    console.error('Error fetching profile:', error)
    redirect('/login')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 py-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Profile user={user} />
      </div>
    </div>
  )
}