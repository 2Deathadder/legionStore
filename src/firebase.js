import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'À REMPLACER',
  authDomain: 'À REMPLACER.firebaseapp.com',
  projectId: 'À REMPLACER',
  storageBucket: 'À REMPLACER.appspot.com',
  messagingSenderId: 'À REMPLACER',
  appId: 'À REMPLACER'
}

// À REMPLACER - crée un projet gratuit sur https://console.firebase.google.com
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)