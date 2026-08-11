import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// À REMPLACER - crée un projet gratuit sur https://console.firebase.google.com
const firebaseConfig = {
  apiKey: 'REMPLACER', authDomain: 'REMPLACER.firebaseapp.com', projectId: 'REMPLACER',
  storageBucket: 'REMPLACER.appspot.com', messagingSenderId: 'REMPLACER', appId: 'REMPLACER'
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default app