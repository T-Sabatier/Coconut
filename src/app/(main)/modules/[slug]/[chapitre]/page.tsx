import { getChapitreBySlug } from '@/sanity/lib/queries'
import Link from 'next/link'
import styles from './ChapitrePage.module.scss'
import PortableText from '@/components/PortableText/PortableText'

interface Props {
  params: Promise<{ slug: string, chapitre: string }>
}

export default async function ChapitrePage({ params }: Props) {
  const { slug, chapitre } = await params
  const data = await getChapitreBySlug(chapitre)

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href="/" className={styles.bcLink}>Accueil</Link>
          <span className={styles.bcSep}>→</span>
          <Link href={`/modules/${slug}`} className={styles.bcLink}>{data.module.titre}</Link>
          <span className={styles.bcSep}>→</span>
          <span className={styles.bcCurrent}>{data.titre}</span>
        </div>
        <p className={styles.moduleLabel}>{data.module.emoji} Module 0{data.module.numero}</p>
        <h1 className={styles.titre}>{data.titre}</h1>
      </div>

      <div className={styles.contenu}>
  {data.contenu ? (
    <PortableText value={data.contenu} />
  ) : (
    <p>Contenu à venir...</p>
  )}
</div>
    </main>
  )
}