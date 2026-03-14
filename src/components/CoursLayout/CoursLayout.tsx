'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './CoursLayout.module.scss'

interface Chapitre {
  _id: string
  titre: string
  slug: string
  ordre: number
}

interface Module {
  titre: string
  numero: number
  emoji: string
  chapitres: Chapitre[]
}

interface Props {
  children: React.ReactNode
  module: Module
  slug: string
}

export default function CoursLayout({ children, module, slug }: Props) {
  const pathname = usePathname()

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/cours" className={styles.backLink}>← Cours</Link>
          <div className={styles.moduleInfo}>
            <span className={styles.moduleEmoji}>{module.emoji}</span>
            <span className={styles.moduleTitle}>{module.titre}</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {module.chapitres?.map((chapitre, index) => {
            const href = `/cours/${slug}/${chapitre.slug}`
            const isActive = pathname === href

            return (
              <Link
                key={chapitre._id}
                href={href}
                className={`${styles.chapitreLink} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.chapitreNum}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.chapitreTitre}>{chapitre.titre}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}