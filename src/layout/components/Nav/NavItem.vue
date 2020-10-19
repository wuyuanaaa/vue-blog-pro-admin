<template>
  <div v-if="!item.hidden" class="navItem-wrap">
    <template v-if="hasOneShowingChild(item) && (!(onlyOneChild.children&&onlyOneChild.children.length)||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <router-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">{{ onlyOneChild.meta.title }}</el-menu-item>
      </router-link>
    </template>
    <el-submenu v-else :index="resolvePath(item.path)" :popper-append-to-body="false">
      <template slot="title">
        <span v-if="item.meta">{{ item.meta.title }}</span>
      </template>
      <NavItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'NavItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {

    }
  },
  computed: {
    singleRoute() {
      const item = this.item
      if (item.children) {
        const showChild = item.filter(item => !item.meta || !item.meta.hide)
        return showChild.legth > 1
      } else {
        return true
      }
    }
  },
  methods: {
    hasOneShowingChild(item) {
      const { children = [] } = item
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...item, path: '', noShowingChildren: true }
        return true
      }

      if (showingChildren.length === 1) {
        return true
      }

      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

