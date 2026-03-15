import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { leconId, chapitreId, moduleSlug } = await req.json()

    await connectDB()

    const user = await User.findOne({ email: session.user?.email })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const dejaLu = user.progression.find((p: any) => p.leconId === leconId)

    if (!dejaLu) {
      await User.updateOne(
        { email: session.user?.email },
        { $push: { progression: { leconId, chapitreId, moduleSlug } } }
      )
    }

    return NextResponse.json({ message: 'Leçon marquée comme lue' }, { status: 200 })
  } catch (err) {
    console.error('ERREUR PROGRESSION:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ progression: [] })

    await connectDB()
    const user = await User.findOne({ email: session.user?.email })

    return NextResponse.json({ progression: user?.progression || [] })
  } catch (err) {
    return NextResponse.json({ progression: [] })
  }
}