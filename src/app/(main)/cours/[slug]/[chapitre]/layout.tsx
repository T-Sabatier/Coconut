import { getChapitreWithLecons } from '@/sanity/lib/queries'
import { auth } from '@/auth'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import CoursLayout from '@/components/CoursLayout/CoursLayout'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string, chapitre: string }>
}

export default async function Layout({ children, params }: Props) {
  const { slug, chapitre } = await params
  const chapitreData = await getChapitreWithLecons(chapitre)

  const session = await auth()
  let leconslues: string[] = []

  if (session) {
    await connectDB()
    const user = await User.findOne({ email: session.user?.email })
    leconslues = user?.progression?.map((p: any) => p.leconId) || []
  }

  return (
    <CoursLayout
      chapitre={chapitreData}
      moduleSlug={slug}
      leconsLues={leconslues}
    >
      {children}
    </CoursLayout>
  )
}