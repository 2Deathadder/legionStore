import React,{useEffect,useState} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from './firebase'
import {demoProducts} from './data'
import App from './App'
import './index.css'
function Root(){const [theme,setTheme]=useState(localStorage.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));const [user,setUser]=useState(null);const [products,setProducts]=useState(demoProducts);const [cart,setCart]=useState(()=>JSON.parse(localStorage.cart||'[]'));useEffect(()=>{document.documentElement.classList.toggle('dark',theme==='dark');localStorage.theme=theme},[theme]);useEffect(()=>onAuthStateChanged(auth,setUser),[]);useEffect(()=>localStorage.cart=JSON.stringify(cart),[cart]);return <App theme={theme} setTheme={setTheme} user={user} products={products} setProducts={setProducts} cart={cart} setCart={setCart}/>}createRoot(document.getElementById('root')).render(<BrowserRouter><Root/></BrowserRouter>)