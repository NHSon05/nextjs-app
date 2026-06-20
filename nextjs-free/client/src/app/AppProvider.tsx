'use client'
import { sessionToken } from "@/lib/http";
import { ReactNode, useLayoutEffect, useState } from "react";
   
export default function AppProvider({children, initialSessionToken = ''} : { children: ReactNode, initialSessionToken?: string}) {
    
    useState(() => {
        sessionToken.value = initialSessionToken 
    })
    
    return (
        <>
           {children}
        </>
    )
}