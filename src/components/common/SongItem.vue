<template>
  <div style="display: inline-block;">
    <div class="song-item">
      <div id="player">
        <img @click="goSongDetail" :src="song.imgUrl" alt="" />
        <img @click="goSongDetail" src="../../assets/images/icons/mv/song_play.png" alt="" />
      </div>
      <div>
        <h3 @click="goSongDetail">{{ song.name }}</h3>
        <p @click="goSinger">{{ song.author.author }}</p>
      </div>
      <div>{{ song.dt | formatPlayTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: { song: { Object } },
  data() {
    return {};
  },
  methods: {
    // 歌曲详情页
    goSongDetail() {
      this.$router.push({
        path: "/song_detail",
        query: { id: this.song.song_id },
      });
    },
    // 歌手详情页
    goSinger() {
      this.$router.push({
        path: "/singer_detail",
        query: {
          id: this.song.author.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.song-item {
  width: 350px;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  color: #ffffff;
  div:nth-child(1) {
    width: 100px;
    height: 100%;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    &:hover > img:nth-child(1) {
      transform: scale(1.15);
      transition: all 2s;
    }
    &:hover > img:nth-child(2) {
      display: block;
    }
    img:nth-child(1) {
      display: block;
      height: 100%;
    }
    img:nth-child(2) {
      position: absolute;
      top: 26px;
      left: 26px;
      display: none;
    }
  }
  div:nth-child(2) {
    width: 200px;
    height: 100%;
    -webkit-box-sizing: border-box;
    padding: 16px 0 16px 15px;
    h3,p {
      margin: 10px 0;
    }
    h3 {
      cursor: pointer;
      &:hover {
        color: #6ebb6c;
      }
    }
    p {
      cursor: pointer;
      color: #999999;
      &:hover {
        color: #6ebb6c;
      }
    }
  }
  div:nth-child(3) {
    width: 50px;
    height: 100%;
    cursor: default;
    color: #999999;
    margin: 43px 0;
  }
}
</style>
