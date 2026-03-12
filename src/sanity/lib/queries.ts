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