'use client'
import { sessionToken } from "@/lib/http"
import { ReactNode, createContext, useContext, useState } from "react"

const AppContext = createContext<{
  sessionToken: string
  setSessionToken: (sessionToken: string) => void
}>({
  sessionToken: '',
  setSessionToken: () => {}
})

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

export default function AppProvider({
  children,
  initialSessionToken = ''
}: {
  children: ReactNode
  initialSessionToken?: string
}) {
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      sessionToken.value = initialSessionToken
    }
    return initialSessionToken
  })

  const setSessionToken = (newToken: string) => {
    setToken(newToken)
    sessionToken.value = newToken
  }

  return (
    <AppContext.Provider value={{ sessionToken: token, setSessionToken }}>
      {children}
    </AppContext.Provider>
  )
}