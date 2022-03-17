<template>
  <div class="allColor">
    <div class="middle">
      <div id="rank-content">
        <!-- 云音乐特色榜 -->
        <div>
          <h2>云音乐特色榜</h2>
          <div>
            <div class="rank1" v-if="rank1">
              <div v-for="item in rank1" :key="item.id">
                <router-link to="/playlistdetail">
                  <img :src="item.coverImgUrl" alt="" />
                </router-link>
                <div id="p1">
                  <img src="../assets/images/icons/music.png" alt="" />
                  <span>{{ item.playCount | formatPlayer }}</span>
                </div>
                <p id="p2">
                  <router-link to="/playlistdetail">{{
                    item.name
                  }}</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 全球媒体榜 -->
        <div>
          <h2>全球媒体榜</h2>
          <div>
            <div class="rank2" v-if="rank2">
              <div v-for="item in rank2" :key="item.id">
                <router-link to="/playlistdetail">
                  <img :src="item.coverImgUrl" alt="" />
                </router-link>
                <div id="p1">
                  <img src="../assets/images/icons/music.png" alt="" />
                  <span>{{ item.playCount | formatPlayer }}</span>
                </div>
                <p id="p2">
                  <router-link to="/playlistdetail">{{
                    item.name
                  }}</router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rank: null, //榜单
      rank1: [], //特色榜
      rank2: [], //全球榜
    };
  },
  methods: {
    //获取榜单
    getRank() {
      let url = "/toplist";
      this.axios.get(url).then((res) => {
        console.log(res);
        this.rank = res.data.list;
        this.rank.forEach((element) => {
          if (element.ToplistType != null) {
            this.rank1.push(element);
          } else {
            this.rank2.push(element);
          }
        });
      });
    },
  },
  mounted() {
    //获取榜单数据
    this.getRank();
  },
};
</script>

<style lang="scss" scoped>
#rank-content {
  padding: 30px 0;
  // 特色榜、全球榜
  a {
    color: #e4e7d1;
  }
  .rank1,.rank2 {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0 30px 0;
    & > div {
      width: 160px;
      margin: 15px 0;
      box-sizing: border-box;
      padding: 0 20px 0 0;
      position: relative;
      & > a {
        display: block;
        width: 140px;
        height: 140px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 3px;
          box-shadow: 0 0 5px #504e4e;
        }
      }
      & > #p1 {
        position: absolute;
        width: 140px;
        height: 30px;
        box-sizing: border-box;
        top: 110px;
        color: #ccc;
        font-size: 13px;
        box-sizing: border-box;
        padding: 0 5px;
        background-color: #2c2b2b;
        opacity: 0.5;
        img {
          width: 16px;
          height: 16px;
          margin: 8px 5px 6px 0;
          vertical-align: middle;
        }
      }
      & > #p2 {
        font-size: 14px;
        margin: 10px 0 0;
        // text-align: center;
      }
    }
  }
}
</style>
