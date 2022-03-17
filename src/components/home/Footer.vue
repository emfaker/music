<template>
  <div class="footer-main">
    <div class="footer-content">
      <p>AyaneMusic</p>
      <p class="last-p">AyaneMusic</p>
      <div class="link">
        <a href="https://blog.csdn.net/qq_41519363">
          <img src="@/assets/images/icons/csdn.svg" alt="">
        </a>
        <a href="https://github.com/coderps123">
          <img src="@/assets/images/icons/github.svg" alt="">
        </a>
      </div>
    </div>
    <div class="footer-copy">
      Copyright @ 2019-2020 ayanemusic 个人演示站. Designed by ayane.
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
.footer-main{
  width: 100%;
  background-color: #161e27;
  padding-top: 20px;
  .footer-content{
    border-bottom: 1px solid #797979;
    p:first-child{
      color: #fff;
      padding: 30px 0 20px 20px;
      border-left: 5px solid #fa2800;
    }
    .last-p{
      padding: 10px;
      color: #a9a9a9;
    }
    .link{
      padding: 20px 0 20px 20px;
      img{
        font-size: 18px;
        border: 1px solid #232a31;
        border-radius: 50%;
        margin-left: 10px;
        color: #e7e7e7;
      }
    }
  }
  .footer-copy{
    padding: 20px 0;
    color: #6d7685;
  }
}
</style>