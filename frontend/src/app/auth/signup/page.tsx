"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { signup } from '@/service/authService';

export default function Page() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await signup(email, password, username);
      router.push('/auth/login');
    } catch (err) {
      setError('Failed to create account. Email may already be in use.');
    }
  };

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
                Create an Account!
              </h2>
            </CardTitle>
            <CardDescription>
              <p className='text-center'>Enter a valid email and password to join today!</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-3'>
                <label htmlFor='username'>Username</label>
                <input
                  id='username'
                  type='text'
                  placeholder='johndoe'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='p-3 border rounded-xl'
                />
                <label htmlFor='email'>Email</label>
                <input
                  id='email'
                  type='email'
                  placeholder='johndoe@gmail.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='p-3 border rounded-xl'
                />
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  type='password'
                  placeholder='••••••••'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='p-3 border rounded-xl'
                />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input
                  id='confirmPassword'
                  type='password'
                  placeholder='Enter matching password'
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='p-3 border rounded-xl'
                />
                {error && <p className='text-red-500 text-sm'>{error}</p>}
              </div>
              <CardFooter className='px-0 pt-4'>
                <div className='flex w-full justify-between'>
                  <Button type="submit" className='bg-orange-400 hover:bg-orange-500'>
                    Submit
                  </Button>
                  <Link href="/auth/login">
                    <Button variant="outline">
                      Login
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  )
}
