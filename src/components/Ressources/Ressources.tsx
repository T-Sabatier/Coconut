import styles from './Ressources.module.scss'

const ressources = [
  { icon: '📄', titre: 'Fiches PDF', desc: 'Tous les cours en téléchargement libre' },
  { icon: '❓', titre: 'Quiz & QCM', desc: 'Testez vos connaissances par chapitre' },
  { icon: '🔍', titre: 'Recherche', desc: 'Trouvez un concept en quelques secondes' },
  { icon: '📊', titre: 'Progression', desc: 'Suivez votre avancement module par module' },
]

export default function Ressources() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>Tout ce qu'il vous <em>faut</em></h2>
        <p className={styles.sub}>Des outils pensés pour apprendre efficacement</p>
      </div>

      <div className={styles.grid}>
        {ressources.map((res) => (
          <div key={res.titre} className={styles.card}>
            <span className={styles.icon}>{res.icon}</span>
            <h3 className={styles.titre}>{res.titre}</h3>
            <p className={styles.desc}>{res.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}