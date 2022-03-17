<template>
  <div class="allColor" style="color: #ffffff">
    <!-- 歌单详情页 -->
    <div class="middle" style="padding: 50px 0">
      <div v-if="songList" id="title">
        <img :src="songList.imgUrl" alt="" />
        <div>
          <h1>{{ songList.title }}</h1>
          <p>播放量：{{ songList.playCount | formatPlayer }}</p>
          <div @click="songListCollection">
            <img src="../assets/images/icons/collection/like_1.png" alt="" />
            <span>收藏</span>
          </div>
        </div>
        <div>
          <h3>简介</h3>
          <p>{{ songList.desc }}</p>
        </div>
      </div>
      <div id="list" v-if="hotSongs">
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
              <span @click="goSongDetail" :data-id="item.id">{{ item.name }}</span>
            </td>
            <td>
              <span @click="goSingerDetail" :data-id="item.author.id">{{ item.author.author }}</span>
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
      tabs: ["歌曲", "歌手", "时长"],
      id: null,
      songList: null,
      hotSongs: null,
    };
  },
  methods: {
    // 获取歌单详情
    getSongListDetail() {
      let url = "/songlistdetails";
      this.axios.get(url, { params: { id: this.id } }).then((res) => {
        this.songList = res.data.songlist;
      });
    },
    // 获取歌单歌曲
    getSongListSong() {
      let url = "/songlist/song";
      this.axios.get(url, { params: { id: this.id } }).then((res) => {
        this.hotSongs = res.data.songs;
      });
    },
    // 收藏歌单
    songListCollection() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        let url = "/me/addSongList";
        this.axios
          .get(url, { params: { userId: user.id, songListId: this.id } })
          .then((res) => {
            console.log(res);
          });
      }
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
  mounted() {
    this.getSongListDetail();
    this.getSongListSong();
  },
  created() {
    this.id = this.$route.query.id;
  },
};
</script>

<style lang="scss" scoped>
#title {
  display: flex;
  & > img {
    display: block;
    width: 250px;
    height: 250px;
    border-radius: 5%;
    margin-right: 60px;
  }
  div:nth-child(2) {
    position: relative;
    h1 {
      font-size: 30px;
      margin: 20px 0;
    }
    div:last-child {
      position: absolute;
      background-color: #575656;
      line-height: 28px;
      font-size: 14px;
      cursor: pointer;
      border: 0.5px solid #575656;
      border-radius: 28px;
      // text-align: center;
      bottom: 20px;
      padding: 0 10px;
      img {
        width: 34px;
        height: 34px;
        vertical-align: middle;
        margin-right: 10px;
      }
      &:hover {
        // color: #6ebb6c;
        background-color: #6ebb6c;
      }
    }
  }
  & > div:nth-child(3) {
    width: 300px;
    height: 100%;
    -webkit-box-sizing: border-box;
    padding: 50px 30px 30px 0;
    margin-left: 80px;
    h3 {
      margin: 20px 0;
    }
  }
}
#list {
  margin-top: 60px;
  & > p {
    cursor: default;
  }
  table {
    width: 100%;
    margin: 20px 0;
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
    // tr:nth-child(odd) {
    //   background-color: #e9e5e5;
    // }
    // tr:nth-child(even) {
    //   background-color: #fcf9f9;
    // }
  }
}
</style>
