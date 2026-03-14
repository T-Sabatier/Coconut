import { getChapitreWithLecons } from '@/sanity/lib/queries'
import CoursLayout from '@/components/CoursLayout/CoursLayout'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string, chapitre: string }>
}

export default async function Layout({ children, params }: Props) {
  const { slug, chapitre } = await params
  const chapitreData = await getChapitreWithLecons(chapitre)

  return (
    <CoursLayout 
      chapitre={chapitreData} 
      moduleSlug={slug}
    >
      {children}
    </CoursLayout>
  )
}