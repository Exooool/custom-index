<template>
  <div class="unify_box">
    <div class="main">
      <div
        :class="
          'inputErrorTip ' + (errorTips == '' ? '' : 'inputErrorTip-show')
        "
        ref="inputErrorTip"
      >
        <span class="tipText">{{ errorTips }}</span>
      </div>

      <div id="login" class="box b1" ref="log">
        <div class="box_float">
          <div class="unify_title">
            <span class="t1">登录</span>
            <!-- <span class="t2">Welcome</span> -->
          </div>

          <div class="unify_input">
            <i class="iconfont icon-at-sign"></i>
            <input
              id="log_mail"
              type="text"
              placeholder="请输入邮箱"
              ref="loginEmail"
            />
          </div>

          <div class="unify_input">
            <i class="iconfont icon-lock"></i>
            <input
              id="log_passwd"
              type="password"
              placeholder="请输入密码"
              ref="loginPassword"
            />
          </div>

          <!-- 登录按钮 -->
          <button class="unify_btn" @click="login()">登录</button>

          <div class="jump-log">
            <span class="jump">没有账号？<a @click="toreg">前往注册</a></span>
            <a class="jump-forget">忘记密码</a>
          </div>
        </div>
      </div>

      <div id="reg" class="box b2" ref="reg">
        <div class="box_float">
          <div class="unify_title">
            <span class="t1">注册</span>
            <!-- <span class="t2">Welcome</span> -->
          </div>

          <div class="unify_input">
            <i class="iconfont icon-at-sign"></i>
            <input
              id="reg_mail"
              type="text"
              placeholder="请输入邮箱"
              ref="regEmail"
            />
          </div>

          <div class="unify_input">
            <i class="iconfont icon-lock"></i>
            <input
              id="reg_passwd"
              type="password"
              placeholder="请输入密码"
              ref="regPassword"
            />
          </div>

          <div class="unify_input">
            <i class="iconfont icon-lock"></i>
            <input
              id="reg_repasswd"
              type="password"
              placeholder="请再次输入密码"
              ref="regrePassword"
            />
          </div>
          <!-- 注册按钮 -->
          <button class="unify_btn" @click="reg()">注册</button>

          <div class="jump-reg">
            <span class="jump">有账号？<a @click="tolog()">前往登录</a></span>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile-jump">
      <div class="mobile-jump-box jump1" ref="jump1">
        <span class="jump">没有账号？<a @click="toreg()">前往注册</a></span>
        <a class="jump-forget">忘记密码</a>
      </div>
      <div class="mobile-jump-box jump2" ref="jump2">
        <span class="jump">有账号？<a @click="tolog()">前往登录</a></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errorTips: ""
    }
  },
  methods: {
    toreg () {
      this.$refs.log.style.transform = "rotateY(180deg)"
      this.$refs.reg.style.transform = "rotateY(0)"
      this.$refs.jump1.style.bottom = "-50px"
      this.$refs.jump2.style.bottom = "0px"
    },
    tolog () {
      this.$refs.reg.style.transform = "rotateY(-180deg)"
      this.$refs.log.style.transform = "rotateY(0)"
      this.$refs.jump2.style.bottom = "-50px"
      this.$refs.jump1.style.bottom = "0px"
    },
    login () {
      let _this = this
      let email = this.$refs.loginEmail.value
      let password = this.$refs.loginPassword.value
      let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      console.log("登陆邮箱：" + email + "登陆密码：" + password)
      if (email == "") {
        this.errorTips = "邮箱不能为空"
      } else if (password == "") {
        this.errorTips = "密码不能为空"
      } else if (!myreg.test(email)) {
        this.errorTips = "请输入有效的邮箱"
      } else {
        this.$axios.post(
          'http://127.0.0.1:88/login',
          this.$qs.stringify({
            logemail: email,
            logpassword: password 
          })
        )
        .then(function (res) {
          console.log(res)
          if(res.data.code == "1"){
            var ses = window.sessionStorage;
            ses.setItem('loginUser',res.data.loginUser);
            ses.setItem('token',res.data.token);
            _this.$router.push("/");
          }
        })
      }

      if (this.errorTips != "") {
        setTimeout(function () {
          _this.errorTips = ""
        }, 2000)
      }
    },
    reg () {
      let email = this.$refs.regEmail.value
      let password = this.$refs.regPassword.value
      let repassword = this.$refs.regrePassword.value
      // 正则表达式判断邮箱有效性
      let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      console.log("注册邮箱：" + email + "注册密码：" + password + "重复密码" + repassword)
      if (email == "") {
        this.errorTips = "邮箱不能为空"
      } else if (password == "") {
        this.errorTips = "密码不能为空"
      } else if (repassword == "") {
        this.errorTips = "请重复输入密码"
      } else if (!myreg.test(email)) {
        this.errorTips = "请输入有效的邮箱"
      } else if (password != repassword) {
        this.errorTips = "两次密码输入不相同"
      } else if (password.length < 6) {
        this.errorTips = "密码长度太短（大于等于6位）"
      }
      else {
        this.$axios.post(
          'http://127.0.0.1:88/login',
          this.$qs.stringify({
            regemail: email,
            regpassword: password 
          })
        )
        .then(function (res) {
          console.log(res)
        })
      }
      let _this = this
      if (this.errorTips != "") {
        setTimeout(function () {
          _this.errorTips = ""
        }, 2000)
      }
    }
  },
  created () {
    console.log("this is login")
  },
  mounted () {

  }

}
</script>

<style lang="scss" scoped>
@import "//at.alicdn.com/t/font_2356752_b72qgbqioyv.css";
@import "../../styles/login.scss";
</style>