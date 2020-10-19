<template>
  <div class="tags-list">
    <div class="search clearfix">
      <span class="search-item">
        <span class="search-item-label">标题：</span>
        <el-input
          v-model="search.name"
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
      :data="list"
      stripe
      style="width: 100%"
    >
      <el-table-column
        fixed
        prop="tagName"
        label="标签名"
        align="center"
        class-name="tags-title"
      />
      <el-table-column
        label="文章数量"
        align="center"
        class-name="tags-col"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
          >
            <el-table :data="scope.row.articles">
              <el-table-column prop="title" label="标题" />
            </el-table>
            <el-tag slot="reference">{{ scope.row.articles.length }}</el-tag>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
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

    <el-dialog
      title="编辑标签"
      :visible.sync="editDialogVisible"
      width="300px"
    >
      <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-suffix="：">
        <el-form-item label="标签名称" prop="tagName">
          <el-input v-model="editForm.tagName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTagPage, removeTag, editTag } from '@/api/tag'
import Pagination from '@/components/Pagination'
import {
  formatComplete
} from '@/filters'

export default {
  name: 'TagList',
  filters: {
    formatComplete
  },
  components: {
    Pagination
  },
  data() {
    return {
      search: {
        name: ''
      },
      pageInfo: {
        page: 1,
        pageSize: 15,
        total: 10
      },
      list: [],
      editDialogVisible: false,
      editForm: {
        tagName: '',
        id: ''
      },
      editFormRules: {
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: 'change' },
          { max: 20, message: '标签名称长度不能超过 20 个字符', trigger: 'change' }
        ]
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      getTagPage({
        page: this.pageInfo.page,
        pageSize: this.pageInfo.pageSize,
        ...this.search
      }).then(res => {
        const { total, list } = res
        this.list = list
        this.pageInfo.total = total
      })
    },
    handleSearch() {
      this.fetchList()
    },
    handleResetSearch() {
      Object.assign(this.search, this.$options.data().search)
      this.fetchList()
    },
    handleEdit({ id, tagName }) {
      this.editForm.id = id
      this.editForm.tagName = tagName
      this.editDialogVisible = true
    },
    handleEditConfirm() {
      this.$refs['editForm'].validate()
        .then(() => {
          return editTag(this.editForm)
        })
        .then(res => {
          this.editDialogVisible = false
          this.$notify({
            title: '成功',
            message: `编辑标签成功！`,
            type: 'success'
          })
          this.fetchList()
        })
        .catch(e => {
          console.log('editTag err', e)
        })
    },
    handleRemove({ tagName, id }) {
      removeTag(id)
        .then(res => {
          this.$notify({
            title: '成功',
            message: `删除标签【${tagName}】成功！`,
            type: 'success'
          })
          this.fetchList()
        })
        .catch(e => {
          console.log('removeTag err', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags-list {
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
