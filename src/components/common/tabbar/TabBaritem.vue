<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="true"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>    
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/all.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d81e06'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    isActive() {
      // return this.$route.path.indexOf(this.path)
      return this.$route.path === this.path
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => [err])
    }
  }
}
</script>

<style>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 23px;
    height: 23px;
    margin-top: 4px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>