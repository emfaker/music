<template>
  <div class="allColor">
    <div v-if="user">
      <div id="user-cover">
        <div id="top">
          <img
            :style="{
              'background-image': 'url()',
            }"
            :src="user.imgUrl"
            alt=""
          />
          <p>{{ user.account }}</p>
        </div>
        <div id="bottom" class="middle">
          <ul>
            <li>
              <router-link
                :style="{ color: selected == 1 ? '#6ebb6c' : '#ffffff' }"
                to="/me/songCollection"
                >喜爱歌曲</router-link
              >
            </li>
            <li>
              <router-link
                :style="{ color: selected == 2 ? '#6ebb6c' : '#ffffff' }"
                to="/me/SongListCollection"
                >我的歌单</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- <div id="content" class="middle" v-if="hotSongs">
        <table>
          <tr>
            <td></td>
            <td
              style="color: #999999"
              v-for="(item, index) in tabs"
              :key="index"
            >
              {{ item }}
            </td>
            <td style="background: none"></td>
          </tr>
          <tr id="song-name" v-for="(item, index) in hotSongs" :key="item.id">
            <td style="color: #999999">{{ index + 1 }}</td>
            <td @click="goSongDetail" :data-id="item.id">
              <span>{{ item.name }}</span>
            </td>
            <td @click="goSingerDetail" :data-id="item.author.id">
              <span>{{ item.author.author }}</span>
            </td>
            <td>{{ item.dt | formatPlayTime }}</td>
            <td :data-id="item.id" @click="deleteSong"></td>
          </tr>
        </table>
      </div> -->
    </div>
    <div v-else class="no-login">
      <router-link to="/login">请先登录</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  methods: {
    // 获取用户详情
    gerUserDetail() {
      let url = "/me/detail";
      this.axios.get(url, { params: { id: this.user.id } }).then((res) => {
        this.user = res.data.user;
      });
    },
  },
  mounted() {
    if (this.user) {
      this.gerUserDetail();
    }
  },
  beforeMount() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user;
  },
  computed: {
    selected() {
      return this.$route.meta.childTab;
    },
  },
  watch: {
    $route(to, from) {
      if (from.name == "songCollection") {
        to.meta.scrollPosition.y = from.meta.scrollPosition.y;
      }
      if (from.name == "songListCollection") {
        to.meta.scrollPosition.y = from.meta.scrollPosition.y;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#user-cover {
  padding: 80px 0 20px 0;
  color: #ffffff;
  background-image: url("../assets/images/bg_me.webp");
  #top {
    text-align: center;
    img {
      display: inline-block;
      width: 110px;
      height: 110px;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0 0 0 5px #f1efef;
    }
    p {
      font-size: 30px;
      margin: 15px 0;
    }
  }
  #bottom {
    ul {
      display: flex;
      li {
        margin-right: 40px;
        cursor: pointer;
        a {
          color: #ffffff;
        }
        a:hover {
          color: #6ebb6c;
        }
      }
    }
  }
}

.no-login {
  width: 100%;
  height: 100%;
  position: fixed;
  background-image: url("../assets/images/bg_me.webp");
  a {
    display: block;
    line-height: 46px;
    width: 100px;
    border-radius: 5%;
    text-align: center;
    background-color: #6ebb6c;
    color: #ffffff;
    position: fixed;
    top: 50%;
    left: 46%;
  }
}
</style>
