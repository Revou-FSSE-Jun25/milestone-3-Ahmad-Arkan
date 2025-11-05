'use client';
import styles from '@/styles/Footer.module.css';
import Icon from './Icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.parent}>
      <div className={styles.description}>
        <h1>
          <Icon name='logo' className={styles.logo} />
          RevoShop<span>&copy; 2025</span>
        </h1>
        <p>
          Welcome to RevoShop, a fictional e-commerce website built by <a href="https://ahmadrka.com" target='_blank'><u>Ahmadrka</u></a>.<br />Used <a href="https://nextjs.org/"  target='_blank'><u>Next.js</u></a> as framework and <a href="https://fakeapi.platzi.com" target='_blank'><u>Fake Store API</u></a> for data dummy.
        </p>
      </div>
      <div className={styles.buttons}>
        <Link href={'/faq'}><button className='button'>Frequently Asked Questions</button></Link>
        <a href="https://github.com/Revou-FSSE-Jun25/milestone-3-Ahmad-Arkan" target='_blank'><button className='button'>Github Repository Source</button></a>
        <a href="https://github.com/Revou-FSSE-Jun25/milestone-3-Ahmad-Arkan/issues/new" target='_blank'><button className='delete'>Report Bug/Issues</button></a>
      </div>
    </footer>
  )
}
