<template>
  <el-menu
    :default-active="activeIndex"
    class="topBar-nav"
    mode="horizontal"
  >
    <NavItem
      v-for="route in routes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    />
  </el-menu>
</template>

<script>
import NavItem from './NavItem'

export default {
  components: {
    NavItem
  },
  data() {
    return {
      routes: this.$router.options.routes
    }
  },
  computed: {
    activeIndex() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss">
.topBar-nav {
  &.el-menu.el-menu--horizontal {
    border-bottom: none;
    .el-submenu .el-submenu__icon-arrow {
      position: static;
      vertical-align: middle;
      margin-left: 8px;
      margin-top: 0;
    }
  }
  .el-menu-item {
    height: $topBarHeight;
    line-height: $topBarHeight;
    color: #333;
    &.is-active {
      color: #000;
      font-weight: bold;
    }

    &:hover, &.is-active:hover {
      background: #eee;
    }
    &:focus {
      background: none;
    }
  }

  .el-submenu__title {
    height: $topBarHeight;
    line-height: $topBarHeight;
    &:hover {
      background: #eee;
    }
    &:focus {
      background: none;
    }
  }

  .navItem-wrap {
    display: inline-block;
    & + .navItem-wrap {
      position: relative;
      margin-left: 1px;
      outline: none;
      &::before {
        position: absolute;
        left: -1px;
        top: 50%;
        margin-top: -0.5em;
        display: inline-block;
        content: '';
        width: 1px;
        height: 1em;
        background: #000;
      }
    }
  }

  .el-menu--popup {
    margin-top: 0;
    .navItem-wrap {
      &::before {
        display: none;
      }
    }
    .el-menu-item:not(.is-disabled):hover {
      background: #eee;
    }
  }
}

</style>
