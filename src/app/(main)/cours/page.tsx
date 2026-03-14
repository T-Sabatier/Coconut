import { getModules } from '@/sanity/lib/queries'
import Link from 'next/link'
import styles from './Cours.module.scss'

export default async function CoursPage() {
  const modules = await getModules()

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Tous les modules</p>
        <h1 className={styles.titre}>Choisissez <em>votre module</em></h1>
      </div>

      <div className={styles.grid}>
        {modules.map((module: any) => (
          <Link href={`/cours/${module.slug}`} key={module._id} className={styles.card}>
            <div className={styles.cardBand}>
              <span className={styles.cardNum}>0{module.numero}</span>
              <span className={styles.cardIcon}>{module.emoji}</span>
            </div>
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitre}>{module.titre}</h2>
              <p className={styles.cardDesc}>{module.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardCount}>{module.chapitres?.length || '—'} chapitres</span>
                <span className={styles.cardArrow}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}