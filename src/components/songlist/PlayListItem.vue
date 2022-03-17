<template>
  <div id="songlists">
    <div class="songlist">
      <div>
        <img @click="goSongListDetail" :src="songlist.imgUrl" alt="" />
        <img @click="goSongListDetail" src="../../assets/images/icons/mv/mv_play1.png" alt="" />
      </div>
      <router-link :to="{path:'/playlistdetail',query:{id:songlist.id}}">{{songlist.title}}</router-link>
      <p to="">播放量:&nbsp;&nbsp;&nbsp;{{songlist.playCount | formatPlayer}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {songlist:[Object]},
  data() {
    return {
      
    }
  },
  methods: {
    // 歌单详情页
    goSongListDetail() {
      this.$router.push(
        {
          path: '/playlistdetail',
          query: {
            id: this.songlist.id
          }
        }
      );
    }
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
  & > div {
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
  a {
    display: block;
    font-size: 14px;
    color: #ffffff;
    &:hover {
      color: #6ebb6c;
    }
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
