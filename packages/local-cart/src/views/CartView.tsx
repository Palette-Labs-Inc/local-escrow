import { useCart } from '../context/CartContext'

function CartView() {
  const { cart, removeItem, updateItem } = useCart()

  return (
    <div>
      <h2>Cart</h2>
      {cart.cartItems.map((item) => (
        <div key={item.itemId}>
          <span className="mr-2">{item.quantity}</span>
          <span className="mr-2">{item.itemId}</span>
          <button onClick={() => updateItem(Object.assign({}, item, { quantity: item.quantity - 1 }))}>-</button>
          <button onClick={() => updateItem(Object.assign({}, item, { quantity: item.quantity + 1 }))}>+</button>
          <button onClick={() => removeItem(item.itemId)}>Remove</button>
        </div>
      ))}
      {cart.cartItems.length === 0 && <p>Your cart is empty</p>}
    </div>
  )
}

export default CartView
