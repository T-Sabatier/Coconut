import { searchChapitres } from '@/sanity/lib/queries'
import Link from 'next/link'
import styles from './Recherche.module.scss'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function RecherchePage({ searchParams }: Props) {
  const { q } = await searchParams
  const resultats = q ? await searchChapitres(q) : []

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.titre}>Recherche</h1>
        <form action="/recherche" className={styles.form}>
          <input
            name="q"
            defaultValue={q}
            placeholder="Rechercher un concept, un ingrédient..."
            className={styles.input}
            autoFocus
          />
          <button type="submit" className={styles.btn}>Rechercher</button>
        </form>
      </div>

      <div className={styles.resultats}>
        {q && (
          <p className={styles.count}>
            {resultats.length} résultat{resultats.length > 1 ? 's' : ''} pour <em>"{q}"</em>
          </p>
        )}

        {resultats.map((r: any) => (
          <Link
            href={`/modules/${r.module.slug}/${r.slug}`}
            key={r._id}
            className={styles.card}
          >
            <span className={styles.cardModule}>{r.module.emoji} {r.module.titre}</span>
            <span className={styles.cardTitre}>{r.titre}</span>
            <span className={styles.cardArrow}>→</span>
          </Link>
        ))}

        {q && resultats.length === 0 && (
          <p className={styles.empty}>Aucun résultat pour cette recherche.</p>
        )}
      </div>
    </main>
  )
}