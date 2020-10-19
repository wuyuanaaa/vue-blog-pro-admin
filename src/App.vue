<template>
  <div id="app">
    <Cloud />
    <router-view class="view" />
  </div>
</template>

<script>
import Cloud from '@/components/Cloud'
import {
  SAMLL_SCREEN_WIDTH
} from '@/constant'

export default {
  components: {
    Cloud
  },
  created() {
    // 初始化
    this.confirmIsSmallScreen()

    // 添加 resize 监听，不在乎性能没做节流
    window.addEventListener('resize', this.confirmIsSmallScreen)
    // 移除监听
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.confirmIsSmallScreen)
    })
  },
  methods: {
    confirmIsSmallScreen() {
      const isSmallScreen = document.documentElement.clientWidth <= SAMLL_SCREEN_WIDTH
      this.$store.dispatch('app/setIsSmallScreen', isSmallScreen)
    }
  }
}
</script>

<style lang="scss" scoped>
  .view {
    position: relative;
    height: 100%;
  }
</style>
