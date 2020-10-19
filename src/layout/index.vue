<template>
  <div>
    <TopBar />
    <div class="content-wrap">
      <router-view />
    </div>

  </div>
</template>

<script>
import TopBar from './components/TopBar'

export default {
  components: {
    TopBar
  }

}
</script>

<style lang="scss" scoped>
// 50px = 导航条高度
.content-wrap {
  height: calc(100% - 50px);
}
</style>
