<template>
  <div class="li-page-login">
    <el-card class="card-box">
      <el-row :gutter="20">
        <el-col :span="10">
          <div class="grid-content">
            <img
              src="../../assets/img/login/20210722150508.png"
              class="image"
            />
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content">
            <el-form
              ref="loginForm"
              class="login-form"
              :rules="loginRules"
              :model="loginForm"
            >
              <el-form-item>
                <div class="title-box">
                  <p class="text-title">欢迎登陆智慧园区一体化运营平台</p>
                  <p class="text-en">
                    WELCOME TOINTELLIGENT PARK INTEGRATED OPERATION PLATFORM
                  </p>
                </div>
              </el-form-item>
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.username"
                  size="medium"
                  prefix-icon="el-icon-user"
                  placeholder="登录账号"
                  @keyup.enter.native="handlePreLogin"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.password"
                  text="password"
                  :show-password="true"
                  size="medium"
                  prefix-icon="el-icon-lock"
                  placeholder="登录密码"
                  @keyup.enter.native="handlePreLogin"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input
                  placeholder="验证码"
                  v-model="loginForm.code"
                  prefix-icon="el-icon-document-checked"
                  @keyup.enter.native="handlePreLogin"
                  ><i slot="suffix">
                    <img
                      class="captcha-code"
                      :src="captchaImage"
                      @click="refreshCaptchaImage"
                    /> </i
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="btn-login"
                  type="primary"
                  size="medium"
                  :loading="loggingIn"
                  @click="handlePreLogin"
                  >登录
                </el-button>
              </el-form-item>
            </el-form>
            <li-modal ref="liModal" />
          </div>
        </el-col>
      </el-row>

      <!--      <div class="bottom clearfix footer-font">-->
      <!--        广东腾宇光讯网络科技有限公司技术支持-->
      <!--      </div>-->
    </el-card>
  </div>
</template>

<script>
import organization from "./organization.vue";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: undefined,
        password: undefined,
        organizationId: undefined,
        uuid: undefined,
        code: undefined,
      },
      loggingIn: false,
      loginRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      captchaImage: undefined,
    };
  },
  methods: {
    setHeight(height) {
      document.getElementsByTagName("html")[0].style.height = height;
      document.getElementById("app").style.height = height;
    },
    handlePreLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$refs["liModal"].show({
            view: organization,
            params: this.loginForm,
            title: "请选择组织",
            width: "400px",
            submit: (data, e) => {
              this.loginForm.organizationId = data.value;
              e.hide();
              this.handleLogin();
            },
          });
        }
      });
    },
    handleLogin() {
      this.$TankLight
        .sysLogin(this.loginForm)
        .then((data) => {
          this.$TankLight.sysUpdateAuthToken(data.access_token);
          this.$router.push("/");
        })
        .catch(() => {
          this.refreshCaptchaImage();
        });
    },
    refreshCaptchaImage() {
      this.$TankLight.sysCodeRandom().then((data) => {
        this.loginForm.uuid = data.uuid;
        this.captchaImage = "data:image/gif;base64," + data.img;
      });
    },
  },
  mounted() {
    this.setHeight("100%");
    this.refreshCaptchaImage();
  },
  destroyed() {
    this.setHeight("");
  },
};
</script>

<style scoped>
.li-page-login {
  background-image: url(../../assets/img/login/20210722150525.png);
  background-repeat: no-repeat;
  background-color: rgba(127, 154, 225, 0.2);
}

.login-form {
  margin: 0 auto;
}

.card-box {
  text-align: center;
  width: 866px;
  border-radius: 20px;
}

.footer-font {
  font-size: 11px;
  color: #a5b3c8;
}

.title-box {
  padding-left: 5px;
  text-align: left;
  border-left: 5px solid #66b1ff;
}

.text-title {
  text-align: left !important;
  font-weight: 400;
  line-height: 25px;
}

.text-en {
  color: #999999;
  line-height: 15px;
  font-size: 10px;
}
</style>
