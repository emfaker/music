<template>
  <div class="collection">
    <ul>
      <li @click="goSongDetail"></li>
      <li @click="goSongDetail"></li>
      <li @click="collectSong"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      userId: null,
    };
  },
  methods: {
    // 收藏歌曲
    collectSong() {
      if (this.userId) {
        let url = "/me/addSong";
        this.axios
          .get(url, { params: { userId: this.userId, songId: this.id } })
          .then((res) => {
            console.log(res);
          });
      }
    },
    // 歌曲详情页
    goSongDetail() {
      this.$router.push({
        path: "song_detail",
        query: { id: this.id },
      });
    },
  },
  mounted() {
    if (sessionStorage.getItem("user")) {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.userId = user.id;
    }
  },
};
</script>

<style lang="scss" scoped>
.collection {
  display: inline-block;
  width: 180px;
  height: 34px;
  ul {
    width: 100%;
    display: -webkit-flex;
    justify-content: space-around;
    li {
      width: 34px;
      height: 34px;
      cursor: pointer;
    }
    li:nth-child(1) {
      background-image: url("../../assets/images/icons/collection/player.png");
      &:hover {
        background-image: url("../../assets/images/icons/collection/player_i.png");
      }
    }
    li:nth-child(2) {
      background-image: url("../../assets/images/icons/collection/add.png");
      &:hover {
        background-image: url("../../assets/images/icons/collection/add_i.png");
      }
    }
    li:nth-child(3) {
      background-image: url("../../assets/images/icons/collection/like.png");
      &:hover {
        background-image: url("../../assets/images/icons/collection/like_i.png");
      }
    }
    color: #54e90f;
  }
}
</style>
