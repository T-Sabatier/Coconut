import { getChapitreBySlug } from '@/sanity/lib/queries'
import PortableText from '@/components/PortableText/PortableText'
import styles from './CoursPage.module.scss'

interface Props {
  params: Promise<{ slug: string, chapitre: string }>
}

export default async function CoursPage({ params }: Props) {
  const { chapitre } = await params
  const data = await getChapitreBySlug(chapitre)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <p className={styles.moduleLabel}>{data.module.emoji} Module 0{data.module.numero}</p>
        <h1 className={styles.titre}>{data.titre}</h1>
      </div>
      <div className={styles.contenu}>
        {data.contenu ? (
          <PortableText value={data.contenu} />
        ) : (
          <p className={styles.empty}>Contenu à venir...</p>
        )}
      </div>
    </div>
  )
}