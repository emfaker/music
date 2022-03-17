<template>
  <div id="app">
    <Header v-if="showHeader" :tabId="tabId"></Header>
    <router-view />
    <Footer v-if="showFooter"></Footer>
  </div>
</template>

<script>
import Footer from "./components/home/Footer.vue";
import Header from "./components/home/Header.vue";
export default {
  components: { Header, Footer },
  name: "app",
  provide() {
    //提供变量，子组件通过inject注入
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false;
      console.log("嘤嘤嘤");
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted() {
    document.title = "AyaneMusic";
  },
  computed: {
    tabId() {
      if (this.$route.meta.tabId) {
        return this.$route.meta.tabId;
      } else {
        return 0;
      }
    },
    showHeader() {
      return this.$route.meta.showHeader;
    },
    showFooter() {
      return this.$route.meta.showFooter;
    },
  }
};
</script>

<style lang="scss" scoped>
@import url("./assets/css/reset.css");
@import url("./assets/css/base.css");
</style>
