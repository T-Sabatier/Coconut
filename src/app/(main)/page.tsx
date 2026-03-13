import Hero from '@/components/Hero/Hero'
import CarteModules from '@/components/CarteModules/CarteModules'
import Ressources from '@/components/Ressources/Ressources'
import { getModules } from '@/sanity/lib/queries'

export default async function Home() {
  const modules = await getModules()

  return (
    <main>
      <Hero />
      <CarteModules modules={modules} />
      <Ressources />
    </main>
  )
}