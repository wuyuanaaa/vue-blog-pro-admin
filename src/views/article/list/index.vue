<template>
  <div class="articles-list">
    <div class="search clearfix">
      <span class="search-item">
        <span class="search-item-label">标题：</span>
        <el-input
          v-model="search.title"
          placeholder="输入关键字搜索"
          clearable
        />
      </span>
      <span class="search-item">
        <span class="search-item-label">标签：</span>
        <el-select v-model="search.tag" clearable placeholder="请选择">
          <el-option
            v-for="item in tagList"
            :key="item.id"
            :label="item.tagName"
            :value="item.id"
          />
        </el-select>
      </span>
      <span class="search-item fr">
        <el-button type="primary" icon="el-icon-search" circle @click="handleSearch" />
        <el-button icon="el-icon-refresh" circle @click="handleResetSearch" />
      </span>
    </div>
    <el-table
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="title"
        label="标题"
        align="center"
        class-name="tags-title"
      />
      <el-table-column
        label="标签"
        align="center"
        class-name="tags-col"
      >
        <template slot-scope="scope">
          <el-tag v-for="tag in scope.row.tags" :key="tag.id" class="tag">{{ tag.tagName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="隐私类型"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag class="tag" :type="scope.row.type===0?'':'info'">{{ scope.row.type | formatType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="创作时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | formatComplete }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最近修改时间"
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
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
import { getAllArticleList, removeArticle } from '@/api/article'
import { getTagList } from '@/api/tag'
import Pagination from '@/components/Pagination'
import {
  formatComplete
} from '@/filters'

const TYPE = {
  0: '公开',
  1: '私密'
}

export default {
  name: 'ArticleList',
  filters: {
    formatComplete,
    formatType(val) {
      return TYPE[val]
    }
  },
  components: {
    Pagination
  },
  data() {
    return {
      search: {
        title: '',
        tag: ''
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
    this.fetchTagList()
  },
  methods: {
    fetchList() {
      getAllArticleList({
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize,
        ...this.search
      }).then(res => {
        const { total, list } = res
        this.list = list
        this.pageInfo.total = total
      })
    },
    fetchTagList() {
      getTagList()
        .then(res => {
          this.tagList = res
        })
        .catch(e => {
          console.log('getTagList err', e)
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
    handleRemove({ title, id }) {
      removeArticle(id)
        .then(res => {
          this.$notify({
            title: '成功',
            message: `删除文章【${title}】成功！`,
            type: 'success'
          })
          this.fetchList()
        })
        .catch(e => {
          console.log('removeArticle err', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .articles-list {
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

  .tags-col {
    .tag {
      margin-right: 0.5em;
      margin-bottom: 0.5em;
    }
  }
</style>

<style lang="scss">
  .search {
    .el-input {
      max-width: 16em;
    }
  }

  .tags-col>.cell {
    margin-right: -0.5em;
    margin-bottom: -0.5em;
  }

  .tags-title {
    font-weight: bold;
    color: $color-primary;
  }
</style>
