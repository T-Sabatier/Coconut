'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import styles from './MarquerLu.module.scss'

interface Props {
  leconId: string
  chapitreId: string
  moduleSlug: string
  dejaLu: boolean
}

export default function MarquerLu({ leconId, chapitreId, moduleSlug, dejaLu }: Props) {
  const { data: session } = useSession()
  const [lu, setLu] = useState(dejaLu)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  if (!session) return null

  async function handleClick() {
    if (lu) return
    setLoading(true)

    await fetch('/api/progression', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leconId, chapitreId, moduleSlug }),
    })

    setLu(true)
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      disabled={lu || loading}
      className={`${styles.btn} ${lu ? styles.lu : ''}`}
    >
      {lu ? '✓ Leçon lue' : loading ? 'Enregistrement...' : 'Marquer comme lu'}
    </button>
  )
}