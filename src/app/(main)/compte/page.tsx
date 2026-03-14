'use client'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Compte.module.scss'

function validatePassword(password: string) {
  if (password.length < 6) return 'Minimum 6 caractères'
  if (!/[A-Z]/.test(password)) return 'Au moins une majuscule'
  if (!/[0-9]/.test(password)) return 'Au moins un chiffre'
  return null
}

export default function ComptePage() {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [nom, setNom] = useState(session?.user?.name || '')
  const [ancienPassword, setAncienPassword] = useState('')
  const [nouveauPassword, setNouveauPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  if (!session) {
    router.push('/login')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (nouveauPassword) {
      const pwdError = validatePassword(nouveauPassword)
      if (pwdError) { setError(pwdError); return }
      if (nouveauPassword !== confirmPassword) { setError('Les mots de passe ne correspondent pas'); return }
      if (!ancienPassword) { setError('Entrez votre ancien mot de passe'); return }
    }

    setLoading(true)

    const res = await fetch('/api/user/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, ancienPassword, nouveauPassword }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    } else {
      setSuccess('Compte mis à jour !')
      await update({ name: nom })
      setAncienPassword('')
      setNouveauPassword('')
      setConfirmPassword('')
    }

    setLoading(false)
  }

  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Mon compte</p>
        <h1 className={styles.titre}>{session.user?.name}</h1>
        <p className={styles.email}>{session.user?.email}</p>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Informations</h2>
            <div className={styles.field}>
              <label className={styles.label}>Nom</label>
              <input
                type="text"
                value={nom}
                onChange={e => setNom(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={session.user?.email || ''}
                className={`${styles.input} ${styles.inputDisabled}`}
                disabled
              />
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Changer le mot de passe</h2>
            <div className={styles.field}>
              <label className={styles.label}>Ancien mot de passe</label>
              <input
                type="password"
                value={ancienPassword}
                onChange={e => setAncienPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Nouveau mot de passe</label>
              <input
                type="password"
                value={nouveauPassword}
                onChange={e => setNouveauPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
              <p className={styles.hint}>Minimum 6 caractères, 1 majuscule, 1 chiffre</p>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Confirmer le nouveau mot de passe</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? 'Mise à jour...' : 'Sauvegarder'}
          </button>
        </form>
      </div>
    </main>
  )
}