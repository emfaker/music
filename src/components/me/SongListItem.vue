<template>
  <div id="songlists">
    <div class="songlist">
      <div>
        <img @click="goSongListDetail" :src="songlist.imgUrl" alt="" />
        <img
          @click="goSongListDetail"
          src="../../assets/images/icons/mv/mv_play1.png"
          alt=""
        />
      </div>
      <div>
        <router-link
          :to="{ path: '/playlistdetail', query: { id: songlist.id } }"
          >{{ songlist.title }}</router-link
        >
        <i @click="deleteSongList" :data-id="songlist.id"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { songlist: [Object], user: [Object] },
  data() {
    return {};
  },
  methods: {
    // 歌单详情页
    goSongListDetail() {
      this.$router.push({
        path: "/playlistdetail",
        query: {
          id: this.songlist.id,
        },
      });
    },
    // 移除喜欢歌曲
    deleteSongList(e) {
      let url = "/me/deleteSongList";
      console.log(this.user.id,e.target.dataset.id);
      this.axios
        .get(url, {
          params: { userId: this.user.id, songListId: e.target.dataset.id },
        })
        .then((res) => {
          this.$router.go(0);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#songlists {
  display: inline-block;
  box-sizing: border-box;
  .songlist {
    width: 250px;
    height: 300px;
    & > div:nth-child(1) {
      width: 100%;
      height: 250px;
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      margin-bottom: 15px;
      cursor: pointer;
      img:nth-child(1) {
        display: block;
        width: 100%;
        height: 250px;
        overflow: hidden;
      }
      img:nth-child(2) {
        position: absolute;
        top: 109px;
        left: 109px;
        display: none;
      }
      &:hover > img:nth-child(2) {
        display: block;
      }
      &:hover > img:nth-child(1) {
        transform: scale(1.15);
        transition: all 2s;
      }
    }
    & > div:nth-child(2) {
      line-height: 20px;
      display: flex;
      align-items: center;
      position: relative;
      a {
        font-size: 14px;
        color: #ffffff;
        &:hover {
          color: #6ebb6c;
        }
      }
      i {
        display: none;
        position: absolute;
        right: 0;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background-image: url("../../assets/images/icons/collection/delete_1.png");
        background-size: cover;
        &:hover {
          background-image: url("../../assets/images/icons/collection/delete_i.png");
        }
      }
    }
    &:hover > div:nth-child(2) > i {
      display: block;
    }
    p:nth-child(3) {
      color: #999999;
      font-size: 14px;
      margin-top: 7px;
      cursor: default;
    }
  }
}
</style>
