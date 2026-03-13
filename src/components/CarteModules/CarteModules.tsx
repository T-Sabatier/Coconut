import Link from 'next/link'
import styles from './CarteModules.module.scss'

interface Module {
  _id: string
  titre: string
  numero: number
  emoji: string
  description: string
  slug: string 
}

interface Props {
  modules: Module[]
}

export default function Modules({ modules }: Props) {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>Les <em>modules</em></h2>
        <span className={styles.headRight}>7 modules · 53 chapitres</span>
      </div>

      <div className={styles.grid}>
        {modules.map((module) => (
          <Link href={`/modules/${module.slug}`} key={module._id} className={styles.cardLink}> {/* ← Link remplace la div */}
            <div className={styles.card}>
              <div className={styles.cardBand}>
                <span className={styles.cardNum}>0{module.numero}</span>
                <span className={styles.cardIcon}>{module.emoji}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{module.titre}</h3>
                <p className={styles.cardTopics}>{module.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.cardCount}>chapitres</span>
                  <span className={styles.cardArrow}>↗</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}