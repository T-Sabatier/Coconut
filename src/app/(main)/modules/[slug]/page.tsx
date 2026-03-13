import { getModuleBySlug } from '@/sanity/lib/queries'
import Link from 'next/link'
import styles from './ModulePage.module.scss'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ModulePage({ params }: Props) {
  const { slug } = await params
  const module = await getModuleBySlug(slug)

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
  <div className={styles.breadcrumb}>
    <Link href="/" className={styles.bcLink}>Accueil</Link>
    <span className={styles.bcSep}>→</span>
    <span className={styles.bcCurrent}>{module.titre}</span>
  </div>
  <span className={styles.emoji}>{module.emoji}</span>
  <p className={styles.numero}>Module 0{module.numero}</p>
  <h1 className={styles.titre}>{module.titre}</h1>
  <p className={styles.description}>{module.description}</p>
</div>

      <div className={styles.chapitres}>
        <h2 className={styles.chapitresTitle}>Chapitres</h2>
        <div className={styles.liste}>
          {module.chapitres?.map((chapitre: any, index: number) => (
            <Link
              href={`/modules/${slug}/${chapitre.slug}`}
              key={chapitre._id}
              className={styles.chapitreLink}
            >
              <div className={styles.chapitre}>
                <span className={styles.chapitreNum}>0{index + 1}</span>
                <span className={styles.chapitreTitle}>{chapitre.titre}</span>
                <span className={styles.chapitreArrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}