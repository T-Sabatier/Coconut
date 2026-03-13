import Link from 'next/link'
import styles from './Header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navLeft}>
        <Link href="/cours" className={styles.link}>Cours</Link>
        <Link href="/quiz" className={styles.link}>Quiz</Link>
        <Link href="/documents" className={styles.link}>Documents</Link>
      </nav>

      <Link href="/" className={styles.logo}>
        <span className={styles.logoEyebrow}>le</span>
        <span className={styles.logoMain}>Nom du site</span>
      </Link>

      <nav className={styles.navRight}>
        <Link href="/recherche" className={styles.link}>Recherche</Link>
        <Link href="/about" className={styles.link}>À propos</Link>
        <Link href="/login" className={styles.btnConnect}>Se connecter</Link>
      </nav>
    </header>
  )
}