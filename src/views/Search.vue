<template>
  <div
    class="search-exclusive allColor"
    :style="
      hotSongs.length > 10
        ? {}
        : { position: 'fixed', width: '100%', height: '100%' }
    "
  >
    <div class="search-tip">
      <div class="search-input">
        <input
          v-model="searchKey.keyword"
          @keyup.13="goSearch"
          type="text"
          placeholder="搜索音乐"
        />
        <div>
          <i></i>
        </div>
      </div>
    </div>
    <div class="search-main">
      <div class="middle" id="list" v-if="hotSongs">
        <table>
          <tr>
            <td></td>
            <td
              style="color: #999999"
              v-for="(item, index) in tabs"
              :key="index"
            >
              {{ item }}
            </td>
          </tr>
          <tr id="song-name" v-for="(item, index) in hotSongs" :key="item.id">
            <td style="color: #999999">{{ index + 1 }}</td>
            <td>
              <span @click="goSongDetail" :data-id="item.id">{{
                item.name
              }}</span>
            </td>
            <td>
              <span @click="goSingerDetail" :data-id="item.author.id">{{
                item.author.author
              }}</span>
            </td>
            <td>{{ item.dt | formatPlayTime }}</td>
            <collection
              :id="item.id"
              style="position: absolute; top: 0px; left: 800px"
            ></collection>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from "../components/common/Collection.vue";
export default {
  components: { Collection },
  data() {
    return {
      searchKey: {
        keyword: null, //关键词
        type: null, //搜索类型：1:song  2:歌手
        offset: 0, //偏移量
        limit: 20, //数据条数
      },
      tabs: ["歌曲", "歌手", "时长"],
      songList: null,
      hotSongs: null,
    };
  },
  methods: {
    goSearch() {
      let url = "/search";
      this.axios.get(url, { params: this.searchKey }).then((result) => {
        console.log(result);
        this.hotSongs = result.data.songs;
      });
    },
    // 歌曲详情页
    goSongDetail(e) {
      this.$router.push({
        path: "/song_detail",
        query: { id: e.target.dataset.id },
      });
    },
    // 歌手详情页
    goSingerDetail(e) {
      this.$router.push({
        path: "/singer_detail",
        query: {
          id: e.target.dataset.id,
        },
      });
    },
  },
  beforeMount() {
    this.searchKey.keyword = this.$route.query.keyword;
    this.searchKey.type = this.$route.query.type;
  },
  mounted() {
    this.goSearch();
  },
};
</script>

<style lang="scss" scoped>
.search-exclusive {
  .search-tip {
    height: 250px;
    background: transparent url("../assets/images/bg_search.webp") no-repeat
      center;
    background-size: cover;
    position: relative;
    .search-input {
      display: flex;
      width: 650px;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 0 85px 0 15px;
      border-radius: 3px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -25px 0 0 -325px;
      input {
        // line-height: 50px;
        height: 50px;
        font-size: 16px;
        width: 550px;
        outline: none;
        border: 0;
        padding-top: 0;
        padding-bottom: 0;
      }
      div {
        position: absolute;
        top: 9px;
        right: 15px;
        i {
          display: block;
          width: 32px;
          height: 32px;
          background-image: url("../assets/images/search_0.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          &:hover {
            background-image: url("../assets/images/search_i.png");
          }
        }
      }
    }
  }
  .search-main {
    #list {
      // margin-top: 60px;
      color: #ffffff;
      padding: 30px 0;
      & > p {
        cursor: default;
      }
      table {
        width: 100%;
        font-size: 14px;
        tr {
          display: block;
          position: relative;
          line-height: 34px;
          td {
            // margin: 10px;
            width: 250px;
            text-align: center;
            cursor: default;
          }
          td:nth-child(1) {
            width: 120px;
          }
          // td:nth-child(2) {
          //   width: 120px;
          // }
          // td:nth-child(3) {
          //   width: 120px;
          // }
          td:nth-child(4) {
            width: 100px;
          }
        }
        #song-name {
          td:nth-child(2),
          td:nth-child(3) {
            span:hover {
              color: #6ebb6c;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
