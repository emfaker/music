<template>
  <div class="allColor">
    <div class="middle">
      <!-- 轮播图 -->
      <div id="banner" v-if="banners">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item, index) in banners" :key="index">
            <img
              style="width: 100%; height: 100%"
              :src="item.imageUrl"
              alt=""
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="home-content">
        <!-- 推荐歌单 -->
        <div>
          <h2>推荐歌单</h2>
          <div class="songlist">
            <play-list-item
              v-for="item in songlist"
              :key="item.id"
              :songlist="item" style="margin: 0 25px;" 
            ></play-list-item>
          </div>
        </div>
        <!-- 推荐新歌曲 -->
        <div>
          <h2>推荐新歌曲</h2>
          <div class="song">
            <song-item style="margin:15px 0;" :song="item" v-for="item in songs" :key="item.id"></song-item>
          </div>
        </div>
        <!-- 推荐歌手 -->
        <div>
          <h2>推荐歌手</h2>
          <div class="singer" v-if="singers">
            <singer-item :singer="item" v-for="item in singers" :key="item.id"></singer-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongItem from '../components/common/SongItem.vue';
import SingerItem from '../components/singer/SingerItem.vue';
import PlayListItem from "../components/songlist/PlayListItem.vue";
export default {
  components: { PlayListItem, SongItem, SingerItem },
  data() {
    return {
      banners: null, //轮播图
      songlist: null, //歌单
      songs: null, //歌曲
      singers: null, //歌手
    };
  },
  methods: {
    //获取轮播图
    getBanner() {
      let url = "/banner";
      this.axios.get(url).then((res) => {
        this.banners = res.data.banners;
      });
    },
    // 获取推荐歌单
    getSongList() {
      let url = "/home/songlist";
      this.axios(url).then((res) => {
        this.songlist = res.data.songlist;
      });
    },
    // 获取推荐歌曲
    getSong() {
      let url = "/home/songs";
      this.axios.get(url).then((res) => {
        this.songs = res.data.songs;
      });
    },
    
    //获取推荐歌手
    getSinger() {
      let url = "/home/singer";
      this.axios.get(url).then((res) => {
        this.singers = res.data.singers;
      });
    },
  },
  mounted() {
    //获取轮播图数据
    this.getBanner();
    //获取推荐歌单数据
    this.getSongList();
    //获取推荐歌曲数据
    this.getSong();
    //获取推荐歌手数据
    this.getSinger();
  },
  computed: {},
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue,oldValue);
      console.log('111');
    }
  },
};
</script>

<style lang="scss" scoped>
//轮播图
.el-carousel__item {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#banner {
  padding-top: 35px;
}

#home-content {
  h2 {
    color: #4a4a4a;
    text-align: center;
    font-size: 20px;
    font-weight: 1000;
    margin: 15px 0px 30px;
  }
  //推荐歌单
  .song {
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  // 推荐新歌曲

  // 推荐歌手
  .singer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
}
</style>
