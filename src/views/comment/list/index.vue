<template>
  <div class="comment-list">
    <div class="search clearfix">
      <span class="search-item">
        <span class="search-item-label">内容：</span>
        <el-input
          v-model="search.content"
          placeholder="输入关键字搜索"
          clearable
        />
      </span>
      <span class="search-item fr">
        <el-button type="primary" icon="el-icon-search" circle @click="handleSearch" />
        <el-button icon="el-icon-refresh" circle @click="handleResetSearch" />
      </span>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        fixed
        label="用户"
        align="center"
        class-name="user-td"
      >
        <template slot-scope="scope">
          <el-avatar class="user-avatar" :src="scope.row.user.avatar" />
          <span class="user-name">{{ scope.row.user.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="文章"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.article.title }}
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="center"
        class-name="content-td"
      />
      <el-table-column
        label="@"
        align="center"
        class-name="user-td"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.follow">
            <el-avatar class="user-avatar" :src="scope.row.follow.avatar" />
            <span class="user-name">{{ scope.row.follow.nickname }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="评论时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | formatComplete }}</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160"
        align="center"
      >
        <template slot-scope="scope">
          <el-popconfirm
            class="ml-5"
            title="确定要删除吗？"
            @onConfirm="handleRemove(scope.row)"
          >
            <el-button slot="reference" type="text" size="small">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <Pagination class="mt-10" :page-info.sync="pageInfo" @update="fetchList" />
  </div>
</template>

<script>
import { getCommentPage, removeComment } from '@/api/comment'
// import { getTagList } from '@/api/tag'
import Pagination from '@/components/Pagination'
import {
  formatComplete
} from '@/filters'

export default {
  name: 'CommentList',
  filters: {
    formatComplete
  },
  components: {
    Pagination
  },
  data() {
    return {
      loading: true,
      search: {
        content: ''
      },
      pageInfo: {
        page: 1,
        pageSize: 15,
        total: 10
      },
      tagList: [],
      list: []
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.loading = true
      getCommentPage({
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize,
        ...this.search
      }).then(res => {
        const { total, list } = res
        this.list = list
        this.pageInfo.total = total
      }).finally(() => {
        this.loading = false
      })
    },
    handleSearch() {
      this.fetchList()
    },
    handleResetSearch() {
      Object.assign(this.search, this.$options.data().search)
      this.fetchList()
    },
    handleEdit({ id }) {
      this.$router.push({
        name: 'ArticleEdit',
        params: {
          id
        }
      })
    },
    handleRemove({ content, id }) {
      removeComment(id)
        .then(res => {
          this.$notify({
            title: '成功',
            message: `删除评论【${content}】成功！`,
            type: 'success'
          })
          this.fetchList()
        })
        .catch(e => {
          console.log('removeComment err', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment-list {
    padding: 20px 10px;
  }

  .search {
    padding: 0 10px;
    margin-left: -10px;
    .search-item {
      display: inline-block;
      margin-bottom: 10px;
      margin-left: 10px;
    }
    .search-item-label {
      font-weight: bold;
    }
  }

</style>

<style lang="scss">
.comment-list {
  .search {
    .el-input {
      max-width: 16em;
    }
  }

  .user-td {
    font-weight: bold;
    color: $color-primary;

    .user-avatar {
      vertical-align: middle;
    }
    .user-name {
      margin-left: 1em;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .content-td .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
