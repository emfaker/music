<template>
  <div id="login">
    <div id="box">
      <p>Login</p>
      <div id="user">
        <img src="@/assets/images/icons/user.svg" alt="" />
        <span>用户名</span>
        <input
          @blur="getUname"
          @input="getUname"
          type="text"
          placeholder="User"
          maxlength="16"
        />
        <div v-show="uname == null" id="tip1">用户名不能为空</div>
        <div v-show="uname == 'err'" id="tip1">用户名格式错误</div>
      </div>
      <div id="pwd">
        <img src="@/assets/images/icons/password.svg" alt="" />
        <span>密码</span>
        <input
          @blur="getPwd"
          @input="getPwd"
          @keyup.13="login"
          type="password"
          placeholder="Password"
          maxlength="16"
        />
        <div v-show="upwd == null" id="tip2">密码不能为空</div>
        <div v-show="upwd == 'err'" id="tip2">密码格式错误</div>
      </div>
      <div id="enterBut">
        <p @click="login">登入</p>
      </div>
      <div id="registe">
        <router-link to="/register">注册</router-link>
        <router-link to="/">首页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uname: "",
      upwd: "",
    };
  },
  methods: {
    // 监控账户
    getUname(e) {
      let value = e.target.value;
      if (value.trim() == "") {
        this.uname = null;
      } else {
        if (/^[a-zA-Z0-9]{4,16}$/.test(value) == true) this.uname = value;
        else this.uname = "err";
      }
    },
    // 监控密码
    getPwd(e) {
      let value = e.target.value;
      if (value.trim() == "") {
        this.upwd = null;
      } else {
        if (/^[a-zA-Z0-9]{6,10}$/.test(value) == true) this.upwd = value;
        else this.upwd = "err";
      }
    },
    // 登录验证
    login() {
      if (
        this.uname == null ||
        this.upwd == null ||
        this.uname == "err" ||
        this.upwd == "err"
      ) {
        return 0;
      }
      let url = "/login";
      this.axios
        .post(url, { account: this.uname, password: this.upwd })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res.data.user,'咿呀咿呀哟用');
            sessionStorage.setItem('user',JSON.stringify(res.data.user));
            this.$router.push({
              path: "/",
            });
          } else {
            alert("用户名或密码错误");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../assets/images/login_bg.png") no-repeat;
  background-size: cover;
  #box {
    width: 700px;
    height: 400px;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    padding: 50px 0;
    box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
    color: white;
    p {
      text-align: center;
    }
    #user,
    #pwd,
    #enterBut {
      width: 350px;
      height: 50px;
      margin: 40px auto;
    }
    #user,
    #pwd {
      position: relative;
    }
    #tip1,
    #tip2 {
      position: absolute;
      width: 150px;
      top: 30px;
      left: 360px;
      color: #c979d4;
    }
    #user > img,
    #pwd > img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
    }
    #user > span,
    #pwd > span {
      cursor: pointer;
    }
    input {
      width: 100%;
      height: 30px;
      background: transparent;
      border: none;
      border-bottom: 1px solid white;
      outline: none;
      color: white;
    }
    #enterBut {
      width: 200px;
      height: 50px;
      border-radius: 50px;
      background-image: linear-gradient(to right, #c979d4, #fa719d);
      text-align: center;
      padding-top: 10px;
      box-sizing: border-box;
      font-size: 20px;
      cursor: pointer;
      p {
        display: block;
        color: white;
      }
    }
    #enterBut:hover {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset;
    }
    #registe {
      position: absolute;
      right: 80px;
      bottom: 50px;
      a {
        // color: #c979d4;
        margin: 0 10px;
        color: white;
      }
    }
  }
}
</style>
