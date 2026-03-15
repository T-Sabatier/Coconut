'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './CoursLayout.module.scss'

interface Lecon {
  _id: string
  titre: string
  slug: string
  ordre: number
}

interface Chapitre {
  titre: string
  slug: string
  lecons: Lecon[]
  module: {
    titre: string
    numero: number
    emoji: string
    slug: string
  }
}

interface Props {
  children: React.ReactNode
  chapitre: Chapitre
  moduleSlug: string
  leconsLues: string[]
}

export default function CoursLayout({ children, chapitre, moduleSlug, leconsLues }: Props) {
  const pathname = usePathname()

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href={`/cours/${moduleSlug}`} className={styles.backLink}>
            ← {chapitre.module.emoji} {chapitre.module.titre}
          </Link>
          <span className={styles.chapitreTitle}>{chapitre.titre}</span>
        </div>

        <nav className={styles.nav}>
          <Link
            href={`/cours/${moduleSlug}/${chapitre.slug}`}
            className={`${styles.leconLink} ${pathname === `/cours/${moduleSlug}/${chapitre.slug}` ? styles.active : ''}`}
          >
            <span className={styles.leconNum}>00</span>
            <span className={styles.leconTitre}>Introduction</span>
          </Link>

          {chapitre.lecons?.map((lecon, index) => {
            const href = `/cours/${moduleSlug}/${chapitre.slug}/${lecon.slug}`
            const isActive = pathname === href
            const isLu = leconsLues.includes(lecon._id)

            return (
              <Link
                key={lecon._id}
                href={href}
                className={`${styles.leconLink} ${isActive ? styles.active : ''} ${isLu ? styles.lu : ''}`}
              >
                <span className={styles.leconNum}>
                  {isLu ? '✓' : String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.leconTitre}>{lecon.titre}</span>
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