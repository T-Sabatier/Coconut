import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>
        <span className={styles.dot} />
        Nom du site
      </span>
      <span className={styles.copy}>© 2025 — Tous droits réservés</span>
    </footer>
  )
}