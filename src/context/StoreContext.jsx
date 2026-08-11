import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { products as fallbackProducts } from '../data/products'
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

const StoreContext = createContext(null)
export function StoreProvider({ children }) {
  const [products, setProducts] = useState(fallbackProducts)
  const [cart, setCart] = useState(() => JSON.parse(sessionStorage.getItem('legion-cart') || '[]'))
  const [loading, setLoading] = useState(true)
  useEffect(() => { sessionStorage.setItem('legion-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { getDocs(collection(db, 'products')).then(s => { if (!s.empty) setProducts(s.docs.map(d => ({ id: d.id, ...d.data() }))) }).catch(() => {}).finally(() => setLoading(false)) }, [])
  const addToCart = product => setCart(items => { const found = items.find(i => i.id === product.id); return found ? items.map(i => i.id === product.id ? { ...i, quantity: Math.min(i.quantity + 1, product.stock || 99) } : i) : [...items, { ...product, quantity: 1 }] })
  const changeQuantity = (id, quantity) => setCart(items => quantity < 1 ? items.filter(i => i.id !== id) : items.map(i => i.id === id ? { ...i, quantity } : i))
  const removeFromCart = id => setCart(items => items.filter(i => i.id !== id))
  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart])
  const saveProduct = async product => { const { id, ...data } = product; if (id && products.some(p => p.id === id)) await updateDoc(doc(db, 'products', id), data); else { const ref = await addDoc(collection(db, 'products'), data); product.id = ref.id } setProducts(current => { const exists = current.some(p => p.id === product.id); return exists ? current.map(p => p.id === product.id ? product : p) : [...current, product] }) }
  const removeProduct = async id => { await deleteDoc(doc(db, 'products', id)); setProducts(p => p.filter(x => x.id !== id)) }
  const submitOrder = async data => addDoc(collection(db, 'orders'), { ...data, items: cart, subtotal, status: 'nouvelle', createdAt: serverTimestamp() })
  const submitMessage = async data => addDoc(collection(db, 'messages'), { ...data, createdAt: serverTimestamp() })
  return <StoreContext.Provider value={{ products, loading, cart, subtotal, addToCart, changeQuantity, removeFromCart, setCart, saveProduct, removeProduct, submitOrder, submitMessage }}>{children}</StoreContext.Provider>
}
export const useStore = () => useContext(StoreContext)