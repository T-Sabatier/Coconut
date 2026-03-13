import { client } from './client'

// Récupérer tous les modules
export async function getModules() {
  return await client.fetch(`
    *[_type == "module"] | order(numero asc) {
      _id,
      titre,
      numero,
      emoji,
      description,
      "slug": slug.current
    }
  `)
}

// Récupérer tous les chapitres d'un module
export async function getChapitres(moduleId: string) {
  return await client.fetch(`
    *[_type == "chapitre" && module._ref == $moduleId] | order(ordre asc) {
      _id,
      titre,
      ordre,
      contenu
    }
  `, { moduleId })
}
export async function getModuleBySlug(slug: string) {
  return await client.fetch(`
    *[_type == "module" && slug.current == $slug][0] {
      _id,
      titre,
      numero,
      emoji,
      description,
      "chapitres": *[_type == "chapitre" && module._ref == ^._id] | order(ordre asc) {
        _id,
        titre,
        ordre,
        "slug": slug.current
      }
    }
  `, { slug })
}
export async function getChapitreBySlug(chapitreSlug: string) {
  return await client.fetch(`
    *[_type == "chapitre" && slug.current == $chapitreSlug][0] {
      _id,
      titre,
      contenu,
      ordre,
      "module": module-> {
        titre,
        numero,
        emoji,
        "slug": slug.current
      }
    }
  `, { chapitreSlug })
}
export async function searchChapitres(query: string) {
  // normalise : enlève accents, met en minuscule
  const normalize = (str: string) =>
    str.toLowerCase()
       .normalize('NFD')
       .replace(/[\u0300-\u036f]/g, '')

  const q = normalize(query)

  return await client.fetch(`
    *[_type == "chapitre"] {
      _id,
      titre,
      "slug": slug.current,
      "titreNorm": string::lower(titre),
      "module": module-> {
        titre,
        numero,
        emoji,
        "slug": slug.current
      }
    }
  `)
  .then((results: any[]) =>
    results.filter(r =>
      normalize(r.titre).includes(q) ||
      normalize(r.module.titre).includes(q)
    )
  )
}