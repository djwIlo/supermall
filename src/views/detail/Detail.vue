<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @itemClick="itemClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
        class="goods-info"
      />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import {
  getDetail,
  Goods,
  Shops,
  GoodsParam,
  getRecommend,
} from "network/detail";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    BackTop,
    Scroll,
    GoodsList,
    // Toast,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播
      this.topImages = res.result.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shops(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      //5.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      //1.第一次获取值不对
      //值不对的原因: this.$refs.param.$el压根没有渲染
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      this.$nextTick(() => {
        //根据最新的数据，对应的DOM是已经被渲染出来
        //但是图片依然是没有加载完(目前获取到的offsetTop不包括其中的图片)
        // offsetTop值不对的时候，就是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      });
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    //4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  destroyed() {
    // console.log('destoryed');
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();

      //防抖，回调
      this.getThemeTopY();
    },
    itemClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      // console.log(position.y);
      //1.获取Y之值
      const PositionY = -position.y;

      // 2.PositionY和主题中的值进行对比
      let length = this.themeTopYs.length;

      //1.普通做法
      // for (let i = 0; i < length; i++) {
      //   if (
      //     (this.currentIndex !== i &&
      //       i < length - 1 &&
      //       PositionY >= this.themeTopYs[i] &&
      //       PositionY < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && PositionY >= this.themeTopYs[i])
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      // console.log(this.currentIndex);
      //   }
      // }

      // 2.hack做法

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          PositionY >= this.themeTopYs[i] &&
          PositionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 3.是否显示回到顶部
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    addCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart', product) //mutations

      // this.addCart(product).then(res => {
      //   console.log(res);
      // })

      this.$store.dispatch("addCart", product).then((res) => {
        // this.show = true;
        // this.message = res;

        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);
        this.$toast.show(res, 1500)
        // console.log(this.$toast);
      }); //actions
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}

.detail-nav-bar {
  position: relative;
  background-color: white;
  z-index: 12;
}

.content {
  height: calc(100% - 44px - 49px);
}

.goods-info {
  position: relative;
}
</style>