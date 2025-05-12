import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { DocHandle, isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { IndexedDBStorageAdapter } from '@automerge/automerge-repo-storage-indexeddb'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'
import { addItemToCart, Cart, CartItem, removeItemFromCart } from '../tools/cart'

const INDEX_DB_NAME = 'xyz.noshdelivery.cart'

const repo = new Repo({
  storage: new IndexedDBStorageAdapter(INDEX_DB_NAME),
  network: [new BroadcastChannelNetworkAdapter()],
})

interface CartContextType {
  cart: Cart
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (item: CartItem) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    merchantId: 'merchant1',
    preferences: { deliveryType: 'DELIVERY', pickupType: 'PICKUP' },
    cartItems: [],
  })
  const [doc, setDoc] = useState<DocHandle<Cart> | null>(null)
  // const { catalogs } = useCatalog()
  // temp
  const catalogs = {
    catalogs: {},
    collections: {},
    items: {},
    modifierGroups: {},
    modifiers: {},
  }

  useEffect(() => {
    const cartUrl = localStorage.getItem('xyz.noshdelivery.cart:cartUrl')
    let cartHandle

    if (isValidAutomergeUrl(cartUrl)) {
      cartHandle = repo.find<Cart>(cartUrl)
    } else {
      cartHandle = repo.create<Cart>({
        merchantId: 'merchant1',
        preferences: {},
        cartItems: [],
      })
      localStorage.setItem('xyz.noshdelivery.cart:cartUrl', cartHandle.url)
    }

    cartHandle.on('change', ({ doc }: { doc: Cart }) => {
      setCart(doc)
    })
    setDoc(cartHandle || null)
  }, [])

  const addItem = (item: CartItem) => {
    doc?.change((d) => {
      addItemToCart(d, item, catalogs)
    })
  }

  const removeItem = (id: string) => {
    doc?.change((d) => {
      removeItemFromCart(d, id)
    })
  }

  const updateItem = (item: CartItem) => {
    doc?.change((d) => {
      addItemToCart(d, item, catalogs)
    })
  }

  const clearCart = () => {
    doc?.change((d) => {
      d.cartItems = []
    })
  }

  const value = {
    cart,
    addItem,
    removeItem,
    updateItem,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
