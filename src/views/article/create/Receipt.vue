<template>
  <div class="receipt">
    <h2>WOW！</h2>
    <p>新文章 <span class="title">{{ receiptData.title }}</span> 出炉啦！！！</p>
    <p>接下来...</p>
    <div class="btns">
      <el-button type="primary" @click="handleAgain">再来一篇</el-button>

      <router-link class="ml-10" to="/">
        <el-button>
          返回概览
        </el-button>
      </router-link>

    </div>
  </div>
</template>

<script>

export default {
  name: 'ArticleCreateReceipt',
  props: {
    receiptData: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleAgain() {
      this.$emit('again')
    }
  }
}
</script>

<style lang="scss" scoped>
  .receipt {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    height: 300px;

    p {
      line-height: 1.5em;
    }

    .title {
      color: $color-primary;
    }
    .btns {
      margin-top: 20px;
    }
  }
</style>
