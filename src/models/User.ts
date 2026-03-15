import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  progression: [{
    leconId: { type: String, required: true },
    chapitreId: { type: String, required: true },
    moduleSlug: { type: String, required: true },
    dateLu: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)