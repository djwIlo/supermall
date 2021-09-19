<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "views/home/childComps/HomeSwiper";

import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { backTopMixin } from "common/mixin"


// import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh, 500);

    //对监听的事件进行保存
    // this.itemImgListener = () => {
    //   refresh(20, 30, 'abc');
    // }
    // this.$bus.$on("itemImageLoad", this.itemImgListener);

    // 3.获取tabControl的tabOffsetTop值
    // 所有组件都有一个属性$el:用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    // console.log("destroyed");
  },
  /** 当前(页面)组件处于活跃 */
  activated() {
    // console.log("activated");
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  /** 当前(页面)组件不处于活跃 */
  deactivated() {
    // console.log("deactivated");

    // 1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad', )
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0);
    },
    //监听滚动位置
    contentScroll(position) {
      // console.log(position);
      // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.tab-control {
  position: relative;
  /** z-index: 只对定位的元素起效果 */
  top: -1px;
  z-index: 9;
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 8;
} */

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/* .content {
    height: calc(100% - 49px);
    overflow-y: hidden;
  } */
</style>