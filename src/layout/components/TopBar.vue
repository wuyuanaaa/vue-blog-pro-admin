<template>
  <div class="topBar-wrap">
    <Nav class="nav" />
    <router-link
      class="begin"
      :class="{move: isCreating}"
      :to="{ name: 'ArticleCreate' }"
      :data-text="isCreating ? '创作中...' : '新开始'"
    />
    <span class="user">
      <el-avatar v-if="userInfo.avatar" class="user-avatar" :src="userInfo.avatar" />
      <el-avatar v-else class="user-avatar">{{ userInfo.nickname || 'o - o' }}</el-avatar>
    </span>
  </div>

</template>

<script>
import Nav from './Nav'
import { mapGetters } from 'vuex'

export default {
  components: {
    Nav
  },
  data() {
    return {
      activeIndex: '1',
      routes: this.$router.options.routes
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    isCreating() {
      return this.$route.name === 'ArticleCreate' || this.$route.name === 'ArticleEdit'
    }
  }
}
</script>

<style lang="scss" scoped>
.topBar-wrap {
  box-sizing: content-box;
  padding: 0 10px;
  height: $topBarHeight;
  display: flex;
  background: #fff;
  border-bottom: solid 1px #000;
  .nav {
    flex: 1;
  }
  .begin {
    width: 5em;
    font-weight: bold;
    line-height: $topBarHeight;
    background-color: $color-primary;
    overflow: hidden;
    cursor: pointer;
    &::after {
      content: attr(data-text);
      display: inline-block;
      width: 100%;
      text-align: center;
    }
    &.move::after {
      animation: textMove 5s linear infinite;
    }
  }

  @keyframes textMove {
    0% {
      transform: translateX(0);
    }
    49.9% {
      transform: translateX(-108%);
    }
    50% {
      transform: translateX(108%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .user {
    margin-left: 10px;
    line-height: $topBarHeight;
    cursor: pointer;
    .user-avatar {
      margin-top: 5px;
    }
  }
}
</style>
