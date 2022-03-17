<template>
  <div class="allColor">
    <div class="middle">
      <!-- 歌单导航栏 -->
      <div class="all-type" v-if="catlist">
        <div>
          <div @click="isShowMask = !isShowMask">
            <span>
              {{ selected }}
            </span>
            <i
              style="color: white"
              v-if="isShowMask"
              class="el-icon-arrow-down"
            ></i>
            <i style="color: white" v-else class="el-icon-arrow-right"></i>
          </div>
          <div v-show="isShowMask" @mouseleave="isShowMask= !isShowMask" class="mask">
            <ul>
              <li
                style="
                  display: inline;
                  font-size: 12px;
                  line-height: 24px;
                  border: 1px solid #e0dddd;
                  border-radius: 14px;
                  padding: 2px 10px;
                  margin: 0 10px 10px 0;
                  background-color: #e7e4e4;
                "
                data-name="全部"
                @click="changeTab"
              >
                全部
              </li>
            </ul>
            <ul v-for="(item, index) in tabArr" :key="index">
              <li>
                <img
                  :src="
                    require('../assets/images/icons/songlist/' + index + '.png')
                  "
                  alt=""
                />
                <span>{{ item.name }}</span>
              </li>
              <li>
                <ul id="small-type">
                  <li
                    v-for="(val, id) in tabArr[index]"
                    :key="id"
                    :data-name="val.name"
                    @click="changeTab"
                  >
                    {{ val.name }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 歌单 -->
      <div class="list-content">
        <div class="songs" v-if="songlists">
          <play-list-item
            v-for="item in songlists"
            :key="item.id"
            :songlist="item"
            style="margin: 10px 25px"
          ></play-list-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayListItem from "../components/songlist/PlayListItem.vue";
export default {
  components: { PlayListItem },
  data() {
    return {
      catlist: null, //全部歌单分类
      isShowMask: false, //是否显示下拉导航
      tabArr: [], //分类标签
      selected: "全部", //选择分类
      songlists: null, //全部歌单
      offset: 1, //页数偏移量
    };
  },
  methods: {
    //获取歌单分类
    getSongListType() {
      let url = "/catlist";
      this.axios.get(url).then((res) => {
        this.catlist = res.data.catlist;
        this.getTabArr();
        //获取歌单数据
        this.getSongList();
      });
    },
    //循环遍历音乐类型分类
    getTabArr() {
      for (let i = 0; i < 5; i++) {
        this.tabArr[i] = [];
        this.catlist.forEach((element) => {
          if (element.category == i) {
            this.tabArr[element.category].push(element);
          }
        });
      }
    },
    //改变选择分类标签
    changeTab(e) {
      this.selected = e.target.dataset.name;
      this.isShowMask = false;
      this.getSongList();
    },
    //获取歌单
    getSongList() {
      let url = "";
      if (this.selected == "全部") {
        url = "/songlist";
      } else {
        url = "/songlist";
      }
      this.axios.get(url, { params: { type: this.selected } }).then((res) => {  
        this.songlists = res.data.songlist;
      });
    },
  },
  mounted() {
    //获取歌单分类数据
    this.getSongListType();
  },
  computed: {
    //全部歌单
    allType() {
      return this.catlist.all;
    },
    //全部分类
    categories() {
      return this.catlist.categories;
    },
    //小分类
    sub() {
      return this.catlist.sub;
    },
  },
};
</script>

<style lang="scss" scoped>
// 歌单标签
.all-type {
  height: 40px;
  padding: 35px 0 20px 0;
  & > div {
    position: relative;
    cursor: default;
    background-color: #242323fb;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    & > div:nth-child(1) {
      width: 120px;
      height: 40px;
      color: #e0dddd;
      border-radius: 5px;
      text-align: center;
      background-color: #242323fb;
    }
    .mask {
      position: absolute;
      width: 600px;
      height: 400px;
      z-index: 99;
      opacity: 0.9;
      top: 50px;
      border: 1px solid #524f4f;
      border-radius: 5px;
      background-color: #242323fb;
      overflow: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
      & > ul {
        margin: 20px;
        img {
          vertical-align: middle;
          height: 100%;
          margin-right: 5px;
        }
        #small-type {
          display: flex;
          flex-wrap: wrap;
          margin-top: 20px;
          li {
            display: inline;
            font-size: 12px;
            line-height: 24px;
            border: 1px solid #e0dddd;
            border-radius: 14px;
            padding: 2px 10px;
            margin: 0 10px 10px 0;
            background-color: #e7e4e4;
          }
          li:hover {
            background-color: #f06464;
          }
        }
      }
    }
  }
}
// 歌单
.list-content {
  height: 1100px;
  .songs {
    // display: flex;
    // flex-wrap: wrap;
    padding: 10px 0 30px 0;
  }
}
.page {
  text-align: center;
}
</style>
