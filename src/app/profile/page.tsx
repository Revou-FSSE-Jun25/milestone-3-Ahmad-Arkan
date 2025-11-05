'use client';

import { getCookie, logout } from "@/libraries/auth";
import styles from '@/styles/Profile.module.css'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState<Profile>()
  const get = getCookie('user-data')

  useEffect(()=> {
    if (!get) {
      return
    } else {
      setData(JSON.parse(get))
    }    
  }, [])

  if (!data) return <section className={styles.parent}><h1>Loading...</h1></section>

  return (
    <section className={styles.parent}>
      <h1>User Profile</h1>
      <div className={styles.profile}>
        <Image
          src={data.avatar}
          alt='Profile image'
          width={100}
          height={100}
        />
        <div className={styles.info}>
          <h2>{data.name}</h2>
          <p>{data.email}</p>
          <button className="delete" onClick={()=> {logout()}}>Log Out</button>
        </div>
      </div>
    </section>
  )
}
