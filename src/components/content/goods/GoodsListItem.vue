<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="cfav">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      goodsItem: {
        type: Object,
        default() {
          return []
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods: {
      imageLoad() {
          this.$bus.$emit('itemImageLoad', this.itemImgListener)
        // if (this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('homeItemImageLoad')
        // } else if ('/detail') {
        //   this.$bus.$emit('detailItemImageLoad')
        // }
      },
      itemClick() {
        // console.log('itemClick');
        this.$router.push('/detail' + this.goodsItem.iid)
      }
    }
  }
</script>

<style>
  .goods-item {
    position: relative;
    width: 47%;
    padding-bottom: 40px;
  }
  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }
  .goods-info {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
  }
  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .cfav {
    position: relative;
  }
  .goods-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>