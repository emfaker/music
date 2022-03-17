<template>
  <div class="songdetail" v-if="song">
    <div class="middle song">
      <div id="cover">
        <img :src="song.imgUrl" alt="" />
      </div>
      <div id="content">
        <div>
          <img :src="song.imgUrl" alt="" />
          <img src="../assets/images/icons/album_cover_player.png" alt="" />
          <p>{{ song.name }}</p>
          <p>{{ song.author }}</p>
        </div>
        <div id="lyric">
          <ul
            :style="{ transform: `translateY(${top}px)` }"
          >
            <li
              :style="{ color: i == index ? '#6ebb6c' : '#e1e1e1cc' }"
              v-for="(item, index) in lyricArr"
              :key="index"
            >
              {{ item.word }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="middle" id="player">
      <audio ref="audio" controls autoplay @timeupdate="lyricAction">
        <source :src="song.url" type="audio/mpeg" />
        <source :src="song.url" type="audio/ogg" />
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      song: null,
      lyricArr: [],
      top: 0,
      i: null,
    };
  },
  methods: {
    // 获取歌曲详情
    getSong() {
      return new Promise((resolve, reject) => {
        let url = "/songDetail";
        this.axios.get(url, { params: { id: this.id } }).then((res) => {
          this.song = res.data.song;
          resolve(res);
        });
      });
    },
    // 歌词转化
    formatLyric() {
      let lyric = this.song.lyric + "";
      console.log(lyric);
      let lrc = lyric.split("\\n");
      console.log(lrc);
      lrc.forEach((element) => {
        let twoParts = element.split("]");
        let time = twoParts[0].substr(1);
        let timeParts = time.split(":");
        let minute = +timeParts[0];
        let second = +timeParts[1];
        time = minute * 60 + second;
        let word = twoParts[1];
        this.lyricArr.push({
          time: time,
          word: word,
        });
      });
    },
    // 歌词滚动
    lyricAction() {
      let num = this.timeCheck();
      if (num <= -1) return;
      let top = -(num * 40 - 105);
      this.top = top;
      console.log(this.top);
      top = 0;
    },
    // 匹配时间
    timeCheck() {
      let audio = this.$refs.audio;
      let time = audio.currentTime;
      for (let i = 0; i < this.lyricArr.length; i++) {
        if (time < this.lyricArr[i].time) {
          this.i = i;
          return i - 1;
        }
      }
    },
  },
  mounted() {
    this.getSong().then((res) => {
      if (res.data.code == 200) this.formatLyric();
    });
  },
  created() {
    this.id = this.$route.query.id;
  },
};
</script>

<style lang="scss" scoped>
.songdetail {
  position: fixed;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #e1e1e1cc;
  box-sizing: border-box;
  padding: 100px 0 0 0;
  background-color: #8a7575;
  background: -webkit-radial-gradient(#e0e7b9, #1b161d);
  @keyframes rotating {
    0% {
      transform: rotateZ(0deg);
    }

    100% {
      transform: rotateZ(360deg);
    }
  }
  .song {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 500px;
    #cover {
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background-color: #383838;
      box-sizing: border-box;
      padding: 50px;
      box-shadow: 0 0 10px #383434;
      animation: rotating 5s infinite linear;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        display: block;
      }
    }
    #content {
      width: 350px;
      height: 100%;
      div {
        width: 100%;
        height: 50%;
      }
      div:nth-child(1) {
        text-align: center;
        position: relative;
        img:nth-child(1) {
          display: inline-block;
          width: 180px;
          height: 180px;
          border-radius: 3px;
          z-index: 999;
        }
        img:nth-child(2) {
          display: inline-block;
          position: absolute;
          left: 85px;
        }
        p {
          margin: 10px;
          cursor: default;
        }
      }
      div:nth-child(2) {
        cursor: pointer;
        user-select: none;
        overflow: scroll;
        overflow-x: hidden;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      #lyric {
        text-align: center;
        line-height: 40px;
        position: relative;
      }
    }
  }
}
</style>
