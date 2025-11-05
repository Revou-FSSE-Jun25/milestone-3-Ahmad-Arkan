'use client'
import React, { useState } from 'react'
import styles from '@/styles/EditPage.module.css'
import { login } from '@/libraries/api'
import { setCookie, getProfile, getCookie } from '@/libraries/auth'
import { useRouter } from 'next/navigation'
import { useAuthRefresh } from '@/hooks/useAuthRefresh'

export default function Auth() {
  useAuthRefresh()
  const [email, setEmail] = useState('john@mail.com')
  const [password, setPassword] = useState('changeme')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      alert('Email & Password cannot be empty')
      return
    }

    try {
      const data = await login(email, password);
      const profile = await getProfile(data.access_token)
      alert(`Login success.\nWellcome back ${profile.name}`)

      console.log('JWT:', data); // For development

      // Set Cookies
      setCookie('accessToken', data.access_token, (10*60));
      setCookie('refreshToken', data.refresh_token, (20*24*60));
      setCookie('user-data', JSON.stringify(profile), (10*60));

      router.push('/')
    } catch (err) {
      alert('Email or password invalid!');
    }
  }

  return (
    <section style={{width:500}}>
      <h1>Login Page</h1>
      <form className={styles.parent} onSubmit={(e)=> handleLogin(e)}>
        <label htmlFor="email">
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder=' ' />
          <span>Email</span>
        </label>
        <label htmlFor="password">
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder=' ' />
          <span>Password</span>
        </label>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className='button'>Login</button>
          <button className='delete' type='button' onClick={()=> {router.push('/')}}>Cancel</button>
        </div>
      </form>
    </section>
  )
}