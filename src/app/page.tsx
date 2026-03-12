import Hero from '@/components/Hero/Hero'
import Modules from '@/components/Modules/Modules'
import Ressources from '@/components/Ressources/Ressources'
import { getModules } from '../sanity/lib/queries'

export default async function Home() {
  const modules = await getModules()

  return (
    <main>
      <Hero />
      <Modules modules={modules} />
      <Ressources />
    </main>
  )
}