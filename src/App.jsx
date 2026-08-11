import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
export default function App() { return <><Header/><main><Routes><Route path="/" element={<Catalog/>}/><Route path="/produit/:id" element={<Product/>}/><Route path="/panier" element={<Cart/>}/><Route path="/commande" element={<Checkout/>}/><Route path="/contact" element={<Contact/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></main></> }