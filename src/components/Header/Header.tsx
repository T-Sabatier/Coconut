'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import styles from './Header.module.scss'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className={styles.header}>
      <nav className={styles.navLeft}>
        <Link href="/cours" className={styles.link}>Cours</Link>
        <Link href="/quiz" className={styles.link}>Quiz</Link>
        <Link href="/recherche" className={styles.link}>Recherche</Link>
      </nav>

      <Link href="/" className={styles.logo}>
        <span className={styles.logoEyebrow}>le</span>
        <span className={styles.logoMain}>Nom du site</span>
      </Link>

      <nav className={styles.navRight}>
        <Link href="/about" className={styles.link}>À propos</Link>
        {session ? (
          <div className={styles.userArea}>
            <span className={styles.userName}>{session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className={styles.btnConnect}
            >
              Se déconnecter
            </button>
          </div>
        ) : (
          <Link href="/login" className={styles.btnConnect}>Se connecter</Link>
        )}
      </nav>
    </header>
  )
}