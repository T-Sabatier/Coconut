import { getLeconBySlug } from '@/sanity/lib/queries'
import { auth } from '@/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import PortableText from '@/components/PortableText/PortableText'
import MarquerLu from '@/components/MarquerLu/MarquerLu'
import Link from 'next/link'
import styles from './LeconPage.module.scss'

interface Props {
  params: Promise<{ slug: string, chapitre: string, lecon: string }>
}

export default async function LeconPage({ params }: Props) {
  const { slug, chapitre: chapitreSlug, lecon: leconSlug } = await params
  const lecon = await getLeconBySlug(leconSlug)

  const session = await auth()
  let dejaLu = false

  if (session) {
    await connectDB()
    const user = await User.findOne({ email: session.user?.email })
    dejaLu = user?.progression?.some((p: any) => p.leconId === lecon._id) || false
  }

  const lecons = lecon.chapitre.lecons
  const currentIndex = lecons.findIndex((l: any) => l.slug === leconSlug)
  const prev = lecons[currentIndex - 1]
  const next = lecons[currentIndex + 1]

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.chapitreLabel}>{lecon.chapitre.titre}</p>
        <h1 className={styles.titre}>{lecon.titre}</h1>
      </div>

      <div className={styles.contenu}>
        {lecon.contenu ? (
          <PortableText value={lecon.contenu} />
        ) : (
          <p className={styles.empty}>Contenu à venir...</p>
        )}
      </div>

      <div className={styles.footer}>
        <MarquerLu
          leconId={lecon._id}
          chapitreId={lecon.chapitre._id}
          moduleSlug={slug}
          dejaLu={dejaLu}
        />

        <div className={styles.navigation}>
          {prev ? (
            <Link href={`/cours/${slug}/${chapitreSlug}/${prev.slug}`} className={styles.navBtn}>
              ← {prev.titre}
            </Link>
          ) : <div />}

          {next ? (
            <Link href={`/cours/${slug}/${chapitreSlug}/${next.slug}`} className={styles.navBtnNext}>
              {next.titre} →
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}