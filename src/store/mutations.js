import {ADD_COUNTER, ADD_TO_CART, CHECK_CLICK} from './mutation-types'

export default {
  // addCart(state, payLoad) {}
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一一点

  [ADD_COUNTER](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  },
  [CHECK_CLICK] (state, payload) {
    let product = state.cartList.find(item => item.iid === payload)
    product.checked = !product.checked
  }
}
