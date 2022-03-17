<template>
  <div id="register">
    <div id="box">
      <p>Registe</p>
      <div id="user">
        <img src="@/assets/images/icons/user.svg" alt="" />
        <span>用户名</span>
        <input
          @blur="getAccount"
          @input="getAccount"
          type="text"
          placeholder="User"
          maxlength="16"
        />
        <div v-show="account == null" id="tip">用户名不能为空</div>
      </div>
      <div id="phone">
        <img src="@/assets/images/icons/phone.svg" alt="" />
        <span>手机号</span>
        <input
          @blur="getPhone"
          @input="getPhone"
          type="text"
          placeholder="Phone"
          maxlength="16"
        />
        <div v-show="phone == null" id="tip">手机号不能为空</div>
      </div>
      <div id="pwd">
        <img src="@/assets/images/icons/password.svg" alt="" />
        <span>密码</span>
        <input
          @blur="getPwd"
          @input="getPwd"
          type="password"
          placeholder="Password"
          maxlength="16"
        />
        <div v-show="upwd == null" id="tip">密码不能为空</div>
      </div>
      <!-- <div id="code">
        <img src="@/assets/images/icons/code.svg" alt="" />
        <span>姓名</span>
        <input type="text" placeholder="code" maxlength="16" />
      </div> -->
      <div id="enterBut">
        <p @click="Register" to="/login">注册</p>
      </div>
      <div id="registe">
        <router-link to="/login">登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      phone: "",
      upwd: "",
    };
  },
  methods: {
    // 监控账户
    getAccount(e) {
      let value = e.target.value;
      if (value.trim() == "") {
        this.account = null;
      } else {
        if (/^[a-zA-Z0-9]{4,16}$/.test(value) == true) this.account = value;
        else this.account = "err";
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
    // 监控手机号
    getPhone(e) {
      let value = e.target.value;
      if (value.trim() == "") {
        this.phone = null;
      } else {
        if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(value) == true) this.phone = value;
        else this.phone = "err";
      }
    },
    // 登录验证
    Register() {
      if (
        this.account == null ||
        this.upwd == null ||
        this.account == "err" ||
        this.upwd == "err" ||
        this.phone == null ||
        this.phone == "err"
      ) {
        return 0;
      }
      console.log(this.account, this.phone, this.upwd);
      let url = "/register";
      this.axios
        .post(url, {
          account: this.account,
          password: this.upwd,
          phone: this.phone,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$router.push({
              path: "/login",
            });
          } else {
            alert("用户名重复");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#register {
  height: 100%;
  width: 100%;
  position: fixed;
  background: url("../assets/images/login_bg.png") no-repeat;
  background-size: cover;
  #box {
    width: 700px;
    height: 500px;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    padding: 10px 0;
    box-sizing: border-box;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.4);
    color: white;
    p {
      text-align: center;
    }
    #user,
    #pwd,
    #phone,
    #code,
    #enterBut {
      width: 350px;
      height: 50px;
      margin: 40px auto;
      position: relative;
      #tip {
        position: absolute;
        width: 150px;
        top: 30px;
        left: 360px;
        color: #c979d4;
      }
    }
    #user > img,
    #pwd > img,
    #phone > img,
    #code > img {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 10px;
    }
    #user > span,
    #phone > span,
    #pwd > span,
    #code > span {
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
        color: white;
      }
    }
  }
}
</style>
