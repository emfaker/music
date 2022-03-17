<template>
  <div>
    <div id="content" class="middle" v-if="hotSongs">
      <table>
        <tr>
          <td></td>
          <td style="color: #999999" v-for="(item, index) in tabs" :key="index">
            {{ item }}
          </td>
          <td style="background: none"></td>
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
          <td :data-id="item.id" @click="deleteSong"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: ["歌曲", "歌手", "时长"],
      hotSongs: null,
      // id: null, //用户id
      user: null,
    };
  },
  methods: {
    // 获取用户收藏歌曲
    getCollectionSong() {
      let url = "/me/song";
      this.axios.get(url, { params: { id: this.user.id } }).then((res) => {
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
    // 移除喜欢歌曲
    deleteSong(e) {
      let url = "/me/deleteSong";
      this.axios
        .get(url, {
          params: { userId: this.user.id, songId: e.target.dataset.id },
        })
        .then((res) => {
          this.$router.go(0);
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
  mounted () {
    if (this.user) {
      this.getCollectionSong();
    };
  },
  beforeMount() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user;
    (document.documentElement.scrollTop = this.$route.meta.scrollPosition.y) ||
      (document.body.scrollTop = this.$route.meta.scrollPosition.y);
  },
  deactivated() {
    if(this.$route.meta.scrollPosition) {
      this.$route.meta.scrollPosition.y = this.scrollPosition;
    }
  },
  computed: {
    scrollPosition() {
      return document.documentElement.scrollTop || document.body.scrollTop; 
    }
  }
};
</script>

<style lang="scss" scoped>
#content {
  margin-top: 60px;
  padding-bottom: 60px;
  color: #ffffff;
  & > p {
    cursor: default;
  }
  table {
    width: 100%;
    margin: 20px 0 0 0;
    font-size: 14px;
    tr {
      display: block;
      line-height: 34px;
      margin: 8px 0;
      // padding: 10px 0;
      td {
        text-align: center;
        cursor: default;
      }
      td:nth-child(1) {
        width: 120px;
      }
      td:nth-child(2) {
        width: 400px;
      }
      td:nth-child(3) {
        width: 400px;
      }
      td:nth-child(4) {
        width: 200px;
      }
      td:nth-child(5) {
        width: 34px;
        cursor: pointer;
        background-image: url("../../assets/images/icons/collection/delete_1.png");
        &:hover {
          background-image: url("../../assets/images/icons/collection/delete_i.png");
        }
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
