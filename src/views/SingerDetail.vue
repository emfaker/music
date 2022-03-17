<template>
  <!-- 歌手详情页 -->
  <div class="allColor">
    <div>
      <div id="singer-detail" v-if="author">
        <img :src="author.imgUrl" alt="" />
        <div>
          <p>{{ author.name }}</p>
          <p>{{ author.briefDesc }}</p>
          <ul>
            <li>
              <p>{{ author.musicSize }}</p>
              <p>单曲数</p>
            </li>
            <li>
              <p>{{ author.albumSize }}</p>
              <p>专辑数</p>
            </li>
            <li>
              <p>{{ author.mvSize }}</p>
              <p>mv数</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="middle">
      <div id="list">
        <p>热门歌曲</p>
        <table>
          <tr>
            <td></td>
            <td style="color: #999999" v-for="(item, index) in tabs" :key="index">{{ item }}</td>
          </tr>
          <tr id="song-name" v-for="(item, index) in hotSongs" :key="item.id">
            <td style="color: #999999">{{ index + 1 }}</td>
            <td>
              <span @click="goSongDetail" :data-id="item.id">{{ item.name }}</span>
            </td>
            <td>{{ item.dt | formatPlayTime }}</td>
            <collection :id="item.id" style="position: absolute;top:0px;left:800px;"></collection>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Collection from '../components/common/Collection.vue';
export default {
  components: { Collection },
  data() {
    return {
      tabs: ["歌曲","时长"],
      id: null,
      author: null,
      hotSongs: null,
    };
  },
  methods: {
    //获取歌手
    getSinger() {
      let url = "/singer_detail";
      this.axios.get(url, { params: { id: this.id } }).then((res) => {
        this.author = res.data.singer;
      });
    },
    // 获取歌手歌曲
    getSong() {
      let url = "/song";
      this.axios.get(url, { params: { id: this.id } }).then((res) => {
        this.hotSongs = res.data.songs;
      });
    },
    // 播放歌曲页面
    goSongDetail(e) {
      this.$router.push({
        path: "/song_detail",
        query: { id: e.target.dataset.id },
      });
    },
  },
  created() {
    this.id = this.$route.query.id;
  },
  mounted() {
    this.getSinger();
    this.getSong();
  },
};
</script>

<style lang="scss" scoped>
#singer-detail {
  height: 360px;
  color: #ffffff;
  background-image: url("../assets/images/bg1.webp");
  background-position: center;
  background-size: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
  text-align: center;
  box-sizing: border-box;
  padding-top: 20px;
  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #ffffff;
    box-shadow: 0 0 0 5px #ffffff;
    margin: 0 auto;
  }
  div {
    width: 800px;
    height: 100px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 0 0 0;
    font-size: 12px;
    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 5px 0 10px 0;
    }
    & > p:nth-child(1) {
      font-size: 16px;
    }
    & > p:nth-child(2) {
      font-size: 13px;
      margin: 15px 0 40px 0;
    }
    ul {
      display: flex;
      justify-content: space-around;
    }
  }
}
#list {
  color: #ffffff;
  padding-bottom: 20px;
  & > p {
    cursor: default;
  }
  table {
    width: 100%;
    margin: 20px 0 0 0;
    font-size: 14px;
    tr {
      display: block;
      // padding: 10px 0;
      line-height: 34px;
      position: relative;
      td {
        // margin: 10px;
        width: 440px;
        text-align: center;
        cursor: default;
      }
      td:nth-child(1) {
        width: 120px;
      }
      td:nth-child(3) {
        width: 200px;
      }
    }
    #song-name {
      td:nth-child(2) {
        // -webkit-box-sizing: border-box;
        // padding: 0 auto;
        span:hover {
          color: #6ebb6c;
          cursor: pointer;
        }
      }
    }
    // tr:nth-child(odd) {
    //   background-color: #e9e5e5;
    // }
    // tr:nth-child(even) {
    //   background-color: #fcf9f9;
    // }
  }
}
</style>
