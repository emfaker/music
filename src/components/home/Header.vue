<template>
  <div>
    <div class="middle">
      <div id="header" class="clear">
        <div id="logo">
          <img src="@/assets/images/logo.png" alt="" />
          <span style="margin-left: 10px">AyaneMusic</span>
        </div>
        <div id="top-list">
          <ul>
            <li>
              <router-link
                :class="tabId == 1 ? 'active' : 'normal'"
                data-id="1"
                to="/"
                >发现音乐</router-link
              >
            </li>
            <!-- <li>
              <router-link
                :class="selected == 2 ? 'active' : 'normal'"
                data-id="2"
                to="/rank"
                >排行榜</router-link
              >
            </li> -->
            <li>
              <router-link
                :class="tabId == 2 ? 'active' : 'normal'"
                data-id="2"
                to="/song_list"
                >歌单</router-link
              >
            </li>
            <li>
              <router-link
                :class="tabId == 3 ? 'active' : 'normal'"
                data-id="3"
                to="/singer"
                >歌手</router-link
              >
            </li>
            <li>
              <router-link
                :class="tabId == 4 ? 'active' : 'normal'"
                data-id="4"
                to="/mv"
                >MV</router-link
              >
            </li>
            <li>
              <router-link
                :class="tabId == 5 ? 'active' : 'normal'"
                data-id="5"
                to="/me"
                >个人中心</router-link
              >
            </li>
          </ul>
        </div>
        <div id="search">
          <input v-model="keyword" type="text" placeholder="搜索音乐" @keyup.13="goSearch" />
          <img @click="goSearch" src="@/assets/images/search.png" alt="" />
        </div>
        <div style="align-self: center; margin: 0 10px">|</div>
        <div id="login">
          <div v-if="user" id="cover">
            <img :src="user.imgUrl" alt="" />
            <div>
              <p @click="signOut">退出</p>
            </div>
          </div>
          <router-link to="/login" v-else>登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  props: ["tabId"],
  data() {
    return {
      user: null,
      selected: null,
      keyword: null, //关键词
    };
  },
  methods: {
    // 退出登录
    signOut() {
      sessionStorage.removeItem("user");
      this.reload();
      this.$router.go(0);
    },
    //搜索
    goSearch() {
      if (this.keyword) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: this.keyword,
            type: 1
          },
        });
        if(this.$route.name=='search') {
          this.$router.go(0);
        }
      }
    },
  },
  beforeMount() {
    this.user = JSON.parse(sessionStorage.getItem("user"));
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#header {
  width: 100%;
  height: 65px;
  font-size: 14px;
  display: flex;
  #logo {
    width: 150px;
    align-self: center;
    img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
  }
  #top-list {
    width: 300px;
    align-self: center;
    margin-right: 450px;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  #search {
    display: flex;
    align-self: center;
    cursor: pointer;
    position: relative;
    height: 30px;
    border: 1px solid #161e27;
    input {
      display: inline-block;
      outline: none;
      border: 0;
    }
    img {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 0;
    }
  }
  #login {
    height: 100%;
    // align-self: center;
    cursor: pointer;
    a {
      display: block;
      line-height: 25px;
      height: 100%;
      box-sizing: border-box;
      padding: 20px 0;
      z-index: 99;
    }
    #cover {
      height: 100%;
      box-sizing: border-box;
      padding: 12.5px 0;
      position: relative;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      &:hover > div {
        display: block;
      }
      div {
        display: none;
        position: absolute;
        width: 40px;
        top: 65px;
        text-align: center;
        p {
          line-height: 30px;
          border: 1px solid #585858;
          border-radius: 5%;
          background-color: #ffffff;
          z-index: 99;
        }
      }
    }
  }
}
.active {
  color: #fa2800;
}
.normal {
  color: #161e27;
}
</style>
