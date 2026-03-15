import { getModuleBySlug } from '@/sanity/lib/queries'
import { auth } from '@/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Link from 'next/link'
import styles from './ModuleIntro.module.scss'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CoursIndexPage({ params }: Props) {
  const { slug } = await params
  const module = await getModuleBySlug(slug)

  const session = await auth()
  let leconsLues: string[] = []

  if (session) {
    await connectDB()
    const user = await User.findOne({ email: session.user?.email })
    leconsLues = user?.progression?.map((p: any) => p.leconId) || []
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.bcLink}>Accueil</Link>
          <span className={styles.bcSep}>→</span>
          <Link href="/cours" className={styles.bcLink}>Cours</Link>
          <span className={styles.bcSep}>→</span>
          <span className={styles.bcCurrent}>{module.titre}</span>
        </div>
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
          {module.chapitres?.map((chapitre: any, index: number) => {
            const leconslues = chapitre.lecons?.filter((l: any) =>
              leconsLues.includes(l._id)
            ).length || 0
            const total = chapitre.lecons?.length || 0

            return (
              <Link
                href={`/cours/${slug}/${chapitre.slug}`}
                key={chapitre._id}
                className={styles.card}
              >
                <span className={styles.cardNum}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.cardTitre}>{chapitre.titre}</span>
                {session && total > 0 && (
                  <span className={styles.cardProgression}>
                    {leconslues}/{total} leçons
                  </span>
                )}
                <span className={styles.cardArrow}>→</span>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}