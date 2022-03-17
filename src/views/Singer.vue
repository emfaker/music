<template>
  <div
    class="allColor" v-if="singerList" 
    :style="
      singerList.length > 6
        ? {}
        : { position: 'fixed', width: '100%', height: '100%' }
    "
  >
    <div class="middle">
      <!-- 标签栏 -->
      <div class="tabs">
        <ul>
          <li>
            <ul>
              <li
                @click="changeGender"
                :style="{
                  'background-color':
                    singerListType.gender == item.code ? '#fc5a0f' : '#dfdbdb',
                }"
                v-for="(item, index) in tabs.tab1"
                :key="index"
                :data-code="item.code"
              >
                {{ item.name }}
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li
                @click="changeArea"
                :style="{
                  'background-color':
                    singerListType.area == item.code ? '#fc5a0f' : '#dfdbdb',
                }"
                v-for="(item, index) in tabs.tab2"
                :key="index"
                :data-code="item.code"
              >
                {{ item.name }}
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li
                @click="changeFn"
                :style="{
                  'background-color':
                    singerListType.fn == item.code ? '#fc5a0f' : '#dfdbdb',
                }"
                v-for="(item, index) in tabs.tab3"
                :key="index"
                :data-code="item.code"
              >
                {{ item.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 歌手 -->
      <div class="song">
        <!-- <h2>推荐歌手</h2> -->
        <div class="singer" v-if="singerList">
          <singer-item
            :singer="item"
            v-for="item in singerList"
            :key="item.id"
            style="margin: 0 20px"
          ></singer-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingerItem from "../components/singer/SingerItem.vue";
export default {
  components: { SingerItem },
  data() {
    return {
      tabs: {
        tab1: [
          { name: "全部", code: -1 },
          { name: "男歌手", code: 0 },
          { name: "女歌手", code: 1 },
          { name: "组合", code: 2 },
        ],
        tab2: [
          { name: "全部", code: "全部" },
          { name: "内地", code: "内地" },
          { name: "港台", code: "港台" },
          { name: "欧美", code: "欧美" },
          { name: "日本", code: "日本" },
          { name: "韩国", code: "韩国" },
        ],
        tab3: [
          { name: "全部", code: -1 },
          { name: "A", code: "A" },
          { name: "B", code: "B" },
          { name: "C", code: "C" },
          { name: "D", code: "D" },
          { name: "E", code: "E" },
          { name: "F", code: "F" },
          { name: "G", code: "G" },
          { name: "H", code: "H" },
          { name: "I", code: "I" },
          { name: "J", code: "J" },
          { name: "K", code: "K" },
          { name: "L", code: "L" },
          { name: "M", code: "M" },
          { name: "N", code: "N" },
          { name: "O", code: "O" },
          { name: "P", code: "P" },
          { name: "Q", code: "Q" },
          { name: "R", code: "R" },
          { name: "S", code: "S" },
          { name: "T", code: "T" },
          { name: "U", code: "U" },
          { name: "V", code: "V" },
          { name: "W", code: "W" },
          { name: "X", code: "X" },
          { name: "Y", code: "Y" },
          { name: "Z", code: "Z" },
        ],
      }, //标签栏
      singerListType: {
        gender: -1,
        area: "全部",
        fn: -1,
      },
      singerList: null, //歌手
    };
  },
  methods: {
    //获取歌手
    getSingerList() {
      let url = "/singer";
      this.axios.get(url, { params: this.singerListType }).then((res) => {
        this.singerList = res.data.singers;   
      });
    },
    //切换gender
    changeGender(e) {
      let gender = e.target.dataset.code;
      this.singerListType.gender = gender;
      this.getSingerList();
    },
    //切换area
    changeArea(e) {
      let area = e.target.dataset.code;
      this.singerListType.area = area;
      this.getSingerList();
    },
    //切换fn
    changeFn(e) {
      let fn = e.target.dataset.code;
      this.singerListType.fn = fn;
      this.getSingerList();
    },
  },
  mounted() {
    this.getSingerList();
  },
};
</script>

<style lang="scss" scoped>
//标签
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
// 推荐歌手
.singer {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  & > div {
    width: 140px;
    text-align: center;
    margin: 5px 10px 10px 10px;
    div {
      cursor: pointer;
      display: inline-block;
      margin: 10px 0;
    }
  }
}
</style>
