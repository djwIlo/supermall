import BackTop from '@/components/content/backTop/BackTop.vue'
import { debounce } from "common/utils";

export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      isBackShow: false,
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);

    this.itemImgListener = () => {
      refresh();
    }

    this.$bus.$on('itemImgLoad', this.itemImgListener)

    // console.log('我是混入中的内容');
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  }
  
}