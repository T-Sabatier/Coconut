import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import { auth } from '@/auth'

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const { nom, ancienPassword, nouveauPassword } = await req.json()

    await connectDB()
    const user = await User.findOne({ email: session.user?.email })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    const updates: any = {}

    if (nom && nom !== user.nom) {
      updates.nom = nom
    }

    if (ancienPassword && nouveauPassword) {
  const valid = await bcrypt.compare(ancienPassword, user.password)
  if (!valid) return NextResponse.json({ error: 'Ancien mot de passe incorrect' }, { status: 400 })

  // ← ajoutez ça
  const samePassword = await bcrypt.compare(nouveauPassword, user.password)
  if (samePassword) return NextResponse.json({ error: 'Le nouveau mot de passe doit être différent de l\'ancien' }, { status: 400 })

  const pwdRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/
  if (!pwdRegex.test(nouveauPassword)) {
    return NextResponse.json({ error: 'Minimum 6 caractères, 1 majuscule, 1 chiffre' }, { status: 400 })
  }

  updates.password = await bcrypt.hash(nouveauPassword, 12)
}

    await User.updateOne({ email: session.user?.email }, { $set: updates })

    return NextResponse.json({ message: 'Compte mis à jour !' }, { status: 200 })
  } catch (err) {
    console.error('ERREUR UPDATE:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}