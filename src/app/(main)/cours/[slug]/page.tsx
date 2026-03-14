import { getModuleBySlug } from '@/sanity/lib/queries'
import Link from 'next/link'
import styles from './ModuleIntro.module.scss'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CoursIndexPage({ params }: Props) {
  const { slug } = await params
  const module = await getModuleBySlug(slug)

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <Link href="/" className={styles.backLink}>← Accueil</Link>
        <span className={styles.emoji}>{module.emoji}</span>
        <p className={styles.numero}>Module 0{module.numero}</p>
        <h1 className={styles.titre}>{module.titre}</h1>
        <p className={styles.description}>{module.description}</p>
      </div>

      <div className={styles.chapitres}>
        <h2 className={styles.chapitresTitle}>
          {module.chapitres?.length} chapitres disponibles
        </h2>
        <div className={styles.liste}>
          {module.chapitres?.map((chapitre: any, index: number) => (
            <Link
              href={`/cours/${slug}/${chapitre.slug}`}
              key={chapitre._id}
              className={styles.card}
            >
              <span className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.cardTitre}>{chapitre.titre}</span>
              <span className={styles.cardArrow}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}