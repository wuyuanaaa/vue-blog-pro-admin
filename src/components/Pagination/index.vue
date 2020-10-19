<template>
  <el-pagination
    :current-page="pageInfo.page"
    :page-sizes="[5, 15, 30, 100]"
    :page-size="pageInfo.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageInfo.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pageInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.$emit('update')
    },
    handleCurrentChange(val) {
      this.pageInfo.page = val
      this.$emit('update')
    }
  }

}
</script>

<style lang="scss">
  .el-pagination {
    text-align: center;
    .el-input__inner {
      background: $background-6;
    }

    button:disabled {
      background: $background-6;
    }

    .btn-next, .btn-prev {
      background: $background-6;
    }

    .el-dialog, .el-pager li {
      background: $background-6;
    }
  }
</style>
