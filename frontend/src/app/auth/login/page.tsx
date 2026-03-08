"use client";

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageTransition from '@/components/PageTransition'
import Link from 'next/link'
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { login } from '@/service/authService';
import { useAuth } from '@/context/AuthContext';
import { validateEmail } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !validateEmail(email)) {
      setError('Please enter valid email');
      return;
    }
    
    if (!password) {
      setError('Please enter the password');
    }
    
    try {
      const response = await login(email, password);
      auth.login(response.data.token);
      router.push('/dashboard');
      toast.success('Login Success');
    } catch (err) {
      setError('Invalid email or password');
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
                  Welcome Back!
                </h2>
              </CardTitle>
              <CardDescription>
                <p className='text-center'>Enter your email and password to sign in</p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-3'>
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
                  {error && <p className='text-red-500 text-sm'>{error}</p>}
                </div>
                <CardFooter className='px-0 pt-4'>
                  <div className='flex w-full justify-between'>
                    <Button type="submit" className='bg-orange-400 hover:bg-orange-500'>
                      Submit
                    </Button>
                    <Link href="/auth/signup">
                      <Button variant="outline">Sign Up</Button>
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
