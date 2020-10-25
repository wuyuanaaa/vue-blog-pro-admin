<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">后台登陆</h2>
      <el-form
        ref="form"
        class="login-form"
        :model="formData"
        :rules="rules"
        label-width="auto"
        label-suffix="："
        :hide-required-asterisk="true"
      >
        <p class="form-label">用户名</p>
        <el-form-item prop="username">
          <el-input
            ref="username"
            v-model="formData.username"
            class="form-input"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <p class="form-label">密码</p>
          <el-tooltip v-model="capsTooltip" content="大小写锁定已打开" placement="right" manual>
            <el-input
              ref="password"
              v-model="formData.password"
              class="form-input"
              type="password"
              show-password
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
          </el-tooltip>
        </el-form-item>

      </el-form>
      <el-button
        type="primary"
        class="login-submit"
        :loading="loading"
        @click="handleLogin"
      >登 陆</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trgger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trgger: 'change' }
        ]
      },
      capsTooltip: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          const { redirect, ...otherQuery } = query
          this.redirect = redirect
          this.otherQuery = otherQuery
        }
      }
    }
  },
  mounted() {
    if (this.formData.username === '') {
      this.$refs.username.focus()
    } else if (this.formData.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    handleLogin() {
      this.loading = true
      this.$refs['form'].validate()
        .then(() => {
          return this.$store.dispatch('user/login', this.formData)
        })
        .then(res => {
          this.$router.replace({ path: this.redirect || '/', query: this.otherQuery })
        })
        .catch(e => {
          console.log('login err', e)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-page {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login-container {
    padding: 50px 100px 70px;
    width: 420px;
    background: rgba(255,255,255,0.4);
    animation: Bubble 20s linear infinite alternate;
    box-shadow: 0 0 14px rgba(255, 225, 210, 0.5);
    text-shadow: 0 0 14px rgba(255, 225, 210, 0.8);
    letter-spacing: 0.15em;
    .login-title {
      text-align: center;
      margin-bottom: 40px;

    }
    .login-submit {
      margin-top: 20px;
      width: 100%;
      background: #000;
      border-color: rgb(0, 119, 109);
      &:active {
        transform: scale(0.9);
      }
    }
  }

  @keyframes Bubble {
    0% {
      border-radius: 52% 73% 56% 70%;
    }
    20% {
      border-radius: 71% 67% 78% 62%;
    }
    40% {
      border-radius: 45% 70% 50% 70%;
    }
    60% {
      border-radius: 62% 54% 67% 54%;
    }
    80% {
      border-radius: 51% 67% 55% 65%;
    }
    100% {
      border-radius: 73% 52% 67% 52%;
    }
  }

  .login-form {
    .form-label {
      margin: 0.5em 0;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
    }
  }
</style>

<style lang="scss">
  .login-page {
    .el-input__inner {
      text-align: center;
      /* border: none; */
      &:hover {
        border-color: #999;
      }
      &:focus {
        border-color: #000;
      }
    }
    .el-form-item {
      .el-form-item__error {
        display: block;
        width: 100%;
        text-align: center;
      }
    }
  }
</style>
