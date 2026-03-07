"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";

const page = () => {
  return (
    <PageTransition>
    <div className='flex justify-center items-center min-h-screen'>
      <Card className='relative w-full max-w-sm'>
        <Link href="/" className='absolute top-4 left-4'>
          <Button variant="ghost" size="icon">
            <IoIosArrowRoundBack className='size-5' />
          </Button>
        </Link>
        <CardHeader>
          <CardTitle>
            <h2 className='text-center font-semibold text-2xl'>
              Welcome Back!
            </h2>
          </CardTitle>
          <CardDescription>
            <p>Enter your email and password to sign in</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-3'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='johndoe@gmail.com'
                required
                className='p-3 border rounded-xl'
              />
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='••••••••'
                required
                className='p-3 border rounded-xl'
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className='flex w-full justify-between'>
            <Button className='bg-orange-400 hover:bg-orange-500'>
              Submit
            </Button>
            <Link href="/auth/signup">
              <Button variant="outline">
                Sign Up
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
    </PageTransition>
  )
}

export default page
