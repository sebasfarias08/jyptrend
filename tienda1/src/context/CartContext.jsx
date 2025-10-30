import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const value = { cart, setCart, addToCart, removeFromCart }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook to access the cart context throughout the app
export function useCart() {
  return useContext(CartContext)
}