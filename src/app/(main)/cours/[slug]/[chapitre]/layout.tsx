import { getModuleBySlug } from '@/sanity/lib/queries'
import CoursLayout from '@/components/CoursLayout/CoursLayout'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function Layout({ children, params }: Props) {
  const { slug } = await params
  const module = await getModuleBySlug(slug)

  return <CoursLayout module={module} slug={slug}>{children}</CoursLayout>
}