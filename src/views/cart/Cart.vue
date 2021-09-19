<template>
  <div id="cart">
    <!-- 导航 -->
    <nav-bar class="navbar">
      <div slot="center">购物车（{{ length }}）</div>
    </nav-bar>
    <!-- 列表 -->
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <!-- 汇总 -->
    <cart-bottom-bar class="cart-bottom-bar" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
    Scroll,
  },
  computed: {
    // ...mapGetters(['cartLength', 'cartList']),
    ...mapGetters({
      length: "cartLength",
      list: "cartList",
    }),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
#cart {
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.navbar {
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
}

.content {
  overflow: hidden;

  height: calc(100vh - 44px - 49px - 40px);
}

/* .cart-bottom-bar {
  bottom: 0;
} */
</style>