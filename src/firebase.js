import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// À REMPLACER - crée un projet gratuit sur https://console.firebase.google.com
const firebaseConfig = {
  apiKey: 'A_REMPLACER',
  authDomain: 'A_REMPLACER.firebaseapp.com',
  projectId: 'A_REMPLACER',
  storageBucket: 'A_REMPLACER.firebasestorage.app',
  messagingSenderId: 'A_REMPLACER',
  appId: 'A_REMPLACER'
}

const isConfigured = firebaseConfig.apiKey !== 'A_REMPLACER'
let db = null
if (isConfigured) db = getFirestore(initializeApp(firebaseConfig))
export { db, isConfigured }