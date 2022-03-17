<template>
  <div v-if="mv" class="mv">
    <div class="middle">
      <video controls autoplay :src="mv.url"></video>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      mv: null,
    };
  },
  methods: {
    // 获取mv详情
    getMvDetail() {
      let url = "/mvDetail";
      this.axios.get(url, { params: { id: this.id } }).then((res) => {
        this.mv = res.data.mv;
        console.log(this.mv);
      });
    },
  },
  mounted() {
    this.getMvDetail();
  },
  created() {
    this.id = this.$route.query.id;
  },
};
</script>

<style lang="scss" scoped>
.mv {
  background-color: #312f2f;
  video {
    width: 1200px;
  }
}
</style>
