import './index.css'
import CartContext from '../../context/CartContext'
const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let sum = 0
      for (let i = 0; i < cartList.length; i+=1) {
        sum = sum + cartList[i].price * cartList[i].quantity
      }
      return (
        <div className="summary">
          <h1 className="sum">
            Order Total: <span className="style">Rs {sum}/-</span>
          </h1>
          <p className="items">{cartList.length} items in cart</p>
          <button className="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
