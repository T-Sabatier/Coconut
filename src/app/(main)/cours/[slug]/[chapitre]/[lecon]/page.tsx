import { getLeconBySlug } from '@/sanity/lib/queries'
import PortableText from '@/components/PortableText/PortableText'
import Link from 'next/link'
import styles from './LeconPage.module.scss'

interface Props {
  params: Promise<{ slug: string, chapitre: string, lecon: string }>
}

export default async function LeconPage({ params }: Props) {
  const { slug, chapitre: chapitreSlug, lecon: leconSlug } = await params
  const lecon = await getLeconBySlug(leconSlug)

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
  )
}