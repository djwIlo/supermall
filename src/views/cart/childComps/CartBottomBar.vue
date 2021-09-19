<template>
  <div class="bottom-bar">
    <div class="check-content"  @click="checkClick">
      <check-button class="check-button" :is-checked="isSelectAll" />
      <span>全选</span>
    </div>
    <div class="price">合计: {{ totalPrice }}</div>
    <div class="caculate" @click="caclClick">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";


export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // return !this.$store.state.cartList.filter(item => !item.checked).length

      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      // console.log('sss');
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
      // this.$store.state.cartList.forEach((item) => (item.checked = !this.isSelectAll));
    },
    caclClick() {
      if (!this.isSelectAll)
        this.$toast.show('请选择购买的商品', 2000)
    }
  },
};
</script>

<style>
.bottom-bar {
  display: flex;
  position: relative;
  background-color: #eee;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 1%;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  position: fixed;
  margin-left: 25%;
}

.caculate {
  position: absolute;
  width: 80px;
  background-color: var(--color-high-text);
  color: #fff;
  right: 0;
  text-align: center;
}
</style>