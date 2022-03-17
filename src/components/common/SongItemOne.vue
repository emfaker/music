<template>
  <div>
    <div class="song" v-if="songs">
      <div v-for="(item, index) in songs" :key="item.id">
        <div>
          <div @mouseleave="mouseL">
            <img
              v-if="hover == index"
              src="../assets/images/icons/play.png"
              alt=""
            />
            <div @mouseover="mouseO" :data-hover="index" v-else>
              {{ index + 1 == 10 ? index + 1 : "0" + (index + 1) }}
            </div>
          </div>

          <img :src="item.imgUrl" alt="" />
          <div>
            <p>{{ item.author.author }}</p>
          </div>
          <div>《{{ item.name }}》</div>
          <div>{{ item.dt | formatPlayTime }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{songs:[Array]},
  data() {
    return {
      hover: null, //歌曲播放样式
    };
  },
  methods: {
    // 歌曲播放样式
    mouseO(e) {
      this.hover = e.target.dataset.hover;
    },
    mouseL() {
      this.hover = -1;
    },
  },
};
</script>

<style lang="scss" scoped>
// 推荐新歌曲
  .song {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px 0 30px 0;
    & > div {
      width: 500px;
      height: 80px;
      background-color: #eeecec;
      margin: 10px 0;
      border-radius: 6px;
      box-shadow: 0 0 8px #0c0b0b;
      & > div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        div {
          text-align: center;
          cursor: default;
        }
        & > div:nth-child(1) {
          width: 65px;
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 22.5px;
          div {
            width: 20px;
            height: 20px;
          }
          img {
            display: block;
            width: 20px;
            height: 20px;
          }
        }
        & > img {
          display: block;
          width: 55px;
          height: 55px;
        }
        & > div:nth-child(3) {
          width: 80px;
          font-size: 14px;
          box-sizing: border-box;
          padding: 0 10px;
          p {
            margin: 10px 0;
            white-space: nowrap;
            // text-overflow: ellipsis;
            // overflow: hidden;
          }
        }
        & > div:nth-child(4) {
          width: 220px;
        }
        & > div:nth-child(5) {
          width: 80px;
          font-size: 14px;
        }
      }
    }
  }
</style>
