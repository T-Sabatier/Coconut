'use client'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import styles from './Header.module.scss'

export default function Header() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

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
            <Link href="/compte" className={styles.userName}>{session.user?.name}</Link>
            <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.btnConnect}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <Link href="/login" className={styles.btnConnect}>Se connecter</Link>
        )}
      </nav>

      {/* Mobile */}
      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
        <span className={`${styles.burgerLine} ${menuOpen ? styles.open : ''}`} />
      </button>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/cours" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Cours</Link>
          <Link href="/quiz" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Quiz</Link>
          <Link href="/recherche" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Recherche</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>À propos</Link>
          {session ? (
            <>
              <Link href="/compte" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>{session.user?.name}</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.mobileBtnConnect}>Se déconnecter</button>
            </>
          ) : (
            <Link href="/login" className={styles.mobileBtnConnect} onClick={() => setMenuOpen(false)}>Se connecter</Link>
          )}
        </div>
      )}
    </header>
  )
}