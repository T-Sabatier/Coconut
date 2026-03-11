import { getModules } from '../sanity/lib/queries'

export default async function Home() {
  const modules = await getModules()

  return (
    <main>
      <h1>Mes modules</h1>
      {modules.map((module: any) => (
        <div key={module._id}>
          <p>{module.emoji} {module.numero} — {module.titre}</p>
          <p>{module.description}</p>
        </div>
      ))}
    </main>
  )
}