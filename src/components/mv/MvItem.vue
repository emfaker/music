<template>
  <div style="display: inline-block">
    <div class="mv" v-if="mvDetail">
      <div id="images">
        <img @click="goMvDetail" :data-id="mvDetail.id" id="img1" :src="mvDetail.imgUrl" alt="" />
        <img @click="goMvDetail" :data-id="mvDetail.id" id="img2" src="../../assets/images/icons/mv/mv_play1.png" alt="" />
      </div>
      <div id="title">
        <p @click="goMvDetail" :data-id="mvDetail.id">{{ mvDetail.name }}</p>
        <p>{{ mvDetail.author }}</p>
        <div>
          <img src="../../assets/images/icons/mv/mv_play2.png" alt="" />
          <span>{{ mvDetail.playCount | formatPlayer }}</span>
          <span>{{ mvDetail.create_data }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { mvDetail: [Object] },
  data() {
    return {};
  },
  methods: {
    goMvDetail(e) {
      this.$router.push({
        path: "mvDetail",
        query: { id: e.target.dataset.id },
      });
    },
  },
  mounted() {
    // console.log(this.mvDetail);
  },
};
</script>

<style lang="scss" scoped>
.mv {
  width: 280px;
  height: 260px;
  color: #ffffff;
  #images {
    width: 100%;
    height: 160px;
    margin: 10px 0;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    #img1 {
      display: block;
      width: 100%;
      height: 100%;
    }
    #img2 {
      display: none;
      width: 50px;
      height: 50px;
      position: absolute;
      top: 55px;
      left: 115px;
    }
    &:hover #img1 {
      transform: scale(1.15);
      transition: all 2s;
    }
    &:hover #img2 {
      display: block;
    }
  }
  #title {
    font-size: 14px;
    cursor: default;
    p {
      margin: 10px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        color: #6ebb6c;
        cursor: pointer;
      }
    }
    & > p:nth-child(2) {
      color: #999999;
      cursor: default;
    }
    div {
      width: 100%;
      margin: 10px 0;
      font-size: 13px;
      color: #999999;
      img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        line-height: 20px;
      }
      span:nth-child(2) {
        margin: 0 10px;
      }
    }
  }
}
</style>
