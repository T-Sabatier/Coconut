import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(req: Request) {
  try {
    const { nom, email, password } = await req.json()

    if (!nom || !email || !password) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    await connectDB()

    const existe = await User.findOne({ email })
    if (existe) {
      return NextResponse.json({ error: 'Email déjà utilisé' }, { status: 400 })
    }

    const hash = await bcrypt.hash(password, 12)
    await User.create({ nom, email, password: hash })

    return NextResponse.json({ message: 'Compte créé !' }, { status: 201 })
  } catch (err) {
    console.error('ERREUR REGISTER:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}