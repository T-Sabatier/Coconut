import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Technologie pâtissière</p>
        <h1 className={styles.title}>Comprendre pour<br /><em>mieux créer</em></h1>
        <p className={styles.sub}>Des cours structurés du CAP au Brevet de Maîtrise,<br />pour maîtriser chaque technique en profondeur.</p>
      </div>
    </section>
  )
}