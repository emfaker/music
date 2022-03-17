<template>
  <div class="allColor" v-if="songList">
    <div class="middle" id="content">
      <song-list-item
        v-for="item in songList"
        :key="item.id"
        :songlist="item"
        :user="user"
        style="margin: 10px 25px"
      ></song-list-item>
    </div>
  </div>
</template>

<script>
import SongListItem from "../../components/me/SongListItem.vue";
export default {
  components: { SongListItem },
  data() {
    return {
      songList: null,
      // id: null, //用户id
      user: null,
      scrollTop: 0,
    };
  },
  methods: {
    // 获取用户收藏歌曲
    getCollectionSongList() {
      let url = "/me/songList";
      this.axios.get(url, { params: { id: this.user.id } }).then((res) => {
        this.songList = res.data.songList;
      });
    },
  },
  mounted() {
    if (this.user) {
      this.getCollectionSongList();
    }
  },
  beforeMount() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.user = user;
    (document.documentElement.scrollTop = this.$route.meta.scrollPosition.y) ||
      (document.body.scrollTop = this.$route.meta.scrollPosition.y);
  },
  deactivated() {
    if (this.$route.meta.scrollPosition) {
      this.$route.meta.scrollPosition.y = this.scrollPosition;
    }
  },
  computed: {
    scrollPosition() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  },
  
};
</script>

<style lang="scss" scoped>
#content {
  margin-top: 60px;
  padding-bottom: 60px;
}
</style>
