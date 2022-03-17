<template>
  <div style="display: inline-block">
    <div class="song">
      <img :src="singer.imgUrl" alt="" @click="goSinger" />
      <p @click="goSinger">{{ singer.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { singer: [Object] },
  data() {
    return {};
  },
  methods: {
    goSinger() {
      this.$router.push({
        path: "singer_detail",
        query: {
          id: this.singer.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.song {
  width: 200px;
  height: 200px;
  font-size: 14px;
  -webkit-box-sizing: border-box;
  padding: 10px 30px;
  color: #ffffff;
  img {
    display: block;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    cursor: pointer;
  }
  p {
    text-align: center;
    margin: 13px 0;
    cursor: pointer;
    &:hover {
      color: #6ebb6c;
    }
  }
}
</style>
