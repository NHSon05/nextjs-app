"use client"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import envConfig from '@/config'
import { LoginBody, LoginBodyType, LoginResType } from '@/schemaValidations/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm() {

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    async function onSubmit(values: LoginBodyType) {
        try {
            const result = await fetch(
                `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                }
            )
            .then( async (res) => {
                const payload = await res.json()
                const data = {
                    status: res.status,
                    payload
                }
                if (!res.ok) {
                    throw data
                }
                return data;
            })
        } catch (error: any) {
            console.log(error);
            const errors = error.payload.errors as { field: string, message:string}[]
            const status = error.status as number
            if (status == 422){
                errors.forEach((error) => {
                    form.setError(error.field as ('email' | 'password'), {
                        type: 'server',
                        message: error.message
                    })
                })
            } else {
                toast.error("Đăng nhập thất bại")
                console.error(error)
            }
        }
    }
  return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit, error => {
                console.log(error)
            })}
            className='max-w-[600px] w-full flex-shrink-0'
            noValidate
        >
            <FormField
                control={form.control}
                name='email'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder='username' {...field}/>
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder='******' type='password' {...field}/>
                        </FormControl>
                    </FormItem>
                )}
            />
            <Button type='submit' className='w-full mt-4'>Đăng nhập</Button>
        </form>
    </Form>
  )
}
