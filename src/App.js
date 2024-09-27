import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.id !== id)
    this.setState({cartList: filteredList})
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCart => {
        if (id === eachCart.id) {
          const updatedQuantity = eachCart.quantity + 1
          return {...eachCart, quantity: updatedQuantity}
        }
        return eachCart
      }),
    }))
  }
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObj = cartList.find(each => each.id === id)
    if (productObj.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (id === eachCart.id) {
            const updatedQuantity = eachCart.quantity - 1
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }
  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(each => each.id === product.id)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === productObject.id) {
            const updatedQuantity = eachCart.quantity + product.quantity
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      const updatedList = [...cartList, product]
      this.setState({cartList: updatedList})
    }
  }
  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
