<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/warehouse-delivery.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/warehouse-delivery_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/all.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/all_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/supplierfeatures.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/supplierfeatures_active.svg" alt="">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from 'components/tabbar/TabBar'
  import TabBarItem from 'components/tabbar/TabBaritem'

export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style>

</style>