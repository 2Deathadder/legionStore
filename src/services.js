import { collection, addDoc, doc, getDocs, setDoc, deleteDoc, updateDoc, serverTimestamp, runTransaction, query, orderBy } from 'firebase/firestore'
import { db } from './firebase'
export const productsRef=collection(db,'products')
export async function readProducts(){const snap=await getDocs(productsRef);return snap.docs.map(d=>({id:d.id,...d.data()}))}
export const saveProduct=(p,id)=>id?updateDoc(doc(db,'products',id),{...p,updatedAt:serverTimestamp()}):addDoc(productsRef,{...p,createdAt:serverTimestamp()})
export const removeProduct=id=>deleteDoc(doc(db,'products',id))
export const sendMessage=data=>addDoc(collection(db,'messages'),{...data,createdAt:serverTimestamp(),status:'new'})
export async function createOrder(data){return runTransaction(db,async tx=>{for(const item of data.items){const ref=doc(db,'products',item.id);const snap=await tx.get(ref);if(!snap.exists()||!snap.data().available||snap.data().stock<item.quantity)throw new Error(`Stock insuffisant pour ${item.name}`)}for(const item of data.items){const ref=doc(db,'products',item.id);const snap=await tx.get(ref);tx.update(ref,{stock:snap.data().stock-item.quantity,available:snap.data().stock-item.quantity>0})}const ref=doc(collection(db,'orders'));tx.set(ref,{...data,status:'new',createdAt:serverTimestamp()});return ref.id})}
export async function readOrders(){const snap=await getDocs(query(collection(db,'orders'),orderBy('createdAt','desc')));return snap.docs.map(d=>({id:d.id,...d.data()}))}
export const updateOrder=(id,status)=>updateDoc(doc(db,'orders',id),{status,updatedAt:serverTimestamp()})