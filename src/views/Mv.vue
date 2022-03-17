<template>
  <div class="allColor">
    <div class="middle">
      <!-- 标签栏 -->
      <div class="tabs">
        <ul>
          <li>
            <ul>
              <li
                @click="changeArea"
                :style="{
                  'background-color':
                    mvType.area == item.code ? '#fc5a0f' : '#dfdbdb',
                }"
                v-for="(item, index) in tabs.tab1"
                :key="index"
                :data-code="item.code"
              >
                {{ item.name }}
              </li>
            </ul>
          </li>
          <!-- <li>
            <ul>
              <li
                @click="changeOrder"
                :style="{
                  'background-color':
                    mvType.order == item.code ? '#fc5a0f' : '#dfdbdb',
                }"
                v-for="(item, index) in tabs.tab2"
                :key="index"
                :data-code="item.code"
              >
                {{ item.name }}
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
      <div class="mv" v-if="mvs">
        <mv-item
          :mvDetail="item"
          v-for="item in mvs"
          :key="item.id" style="margin: 0 10px;"
        ></mv-item>
      </div>
    </div>
  </div>
</template>

<script>
import MvItem from "../components/mv/MvItem.vue";
export default {
  components: { MvItem },
  data() {
    return {
      tabs: {
        tab1: [
          { name: "全部", code: "全部" },
          { name: "内地", code: "内地" },
          { name: "港台", code: "港台" },
          { name: "欧美", code: "欧美" },
          { name: "日本", code: "日本" },
          { name: "韩国", code: "韩国" },
        ],
        // tab2: [
        //   { name: "最热", code: "最热" },
        //   { name: "最新", code: "最新" },
        // ],
      }, //标签栏
      mvType: {
        // order: "最热", //取值：最热 最新
        area: "全部", //地区
        // limit: 36, //返回数量
        // offset: 0, //偏移数量
      },
      page: 0, //页数
      mvs: null, //mv
      scrollTop: 1800, //初始mv高度
      loading: true, //加载更多状态
    };
  },
  methods: {
    //获取歌手分类列表
    getMvType() {
      let url = "/mv";
      this.axios.get(url, { params: this.mvType }).then((res) => {
        // console.log(res);
        // if (this.mvType.offset == 0 && this.page ==0) {
        //   this.mvData = res.data.data;
        // } else {
        //   let data = res.data.data;
        //   this.mvData = this.mvData.concat(data);
        // }
        let mvs = res.data.mvs;
        // this.mvs = this.mvs.concat(mvs);
        this.mvs = mvs;
      });
    },
    //切换order
    changeOrder(e) {
      let order = e.target.dataset.code;
      this.mvType.order = order;
      this.mvType.offset = 0;
      this.page = 0;
      this.getMvType();
    },
    //切换area
    changeArea(e) {
      let area = e.target.dataset.code;
      this.mvType.area = area;
      this.mvType.offset = 0;
      this.page = 0;
      this.getMvType();
    },
    //监听滚动距离
    getScroll(e) {
      let scrollTop =
        e.target.documentElement.scrollTop || e.target.body.scrollTop;
      if (scrollTop > this.scrollTop) {
        this.scrollTop = this.scrollTop + 2000;
        this.$nextTick(this.getMore);
        // this.getMore();
      }
    },
    //下拉获取更多mv
    getMore() {
      this.page += 1;
      this.mvType.offset = this.mvType.offset + this.page * 36;
      console.log(this.mvType.offset);
      // if (this.loading) {
      //   this.loading = false;
      //   this.getMvType();
      //   this.loading = true;
      // }
      this.getMvType();
      console.log(this.mvData);
      console.log(this.page);
    },
  },
  created() {
    this.getMvType();
  },
  mounted() {
    window.addEventListener("scroll", this.getMore);
  },
  destroyed() {
    window.removeEventListener("scroll", this.getMore);
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px 0;
  & > ul {
    & > li {
      margin: 20px 0;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          cursor: default;
          height: 30px;
          width: 46px;
          margin-right: 8px;
          margin-bottom: 10px;
          text-align: center;
          font-size: 12px;
          line-height: 30px;
          border: 1px solid #ececec;
          border-radius: 15px;
        }
      }
    }
  }
}
.mv {
  display: flex;
  flex-wrap: wrap;
}
</style>
