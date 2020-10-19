<template>
  <div class="article-create">
    <ArticleEditor
      v-if="!receiptData"
      ref="editor"
      @submit="handleCreate"
    >
      <div v-if="showStorageInfo" class="storage-info">
        <span>自动保存</span>
        <span class="storage-info-time">{{ lastAutoSaveTime | formatHMS }}</span>
      </div>
    </ArticleEditor>

    <Receipt v-else :receipt-data="receiptData" @again="handleReset" />

    <el-dialog
      title="发现存档"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>发现自动保存于 <b>{{ lastAutoSaveTime | formatComplete }} ({{ lastAutoSaveTime | timeFromNow }})</b> 的存档，是否继续？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDropSaved">放 弃</el-button>
        <el-button type="primary" @click="handleContinue">继 续</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ArticleEditor from '@/components/ArticleEditor'
import Receipt from './Receipt'
import { mapGetters } from 'vuex'
import {
  setStorage
} from '@/utils/localStorage'
import { createArticle } from '@/api/article'
import autoSave from '@/mixins/autoSave'

import {
  timeFromNow,
  formatHMS,
  formatComplete
} from '@/filters'

const AUTO_SAVE_KEY = 'autoSave_new_'

export default {
  name: 'ArticleCreate',
  filters: {
    timeFromNow,
    formatHMS,
    formatComplete
  },
  components: {
    ArticleEditor,
    Receipt
  },
  mixins: [
    autoSave
  ],
  data() {
    return {
      showStorageInfo: false,
      dialogVisible: false,
      timer: null,
      lastAutoSaveTime: null,
      receiptData: null
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    autoSaveKey() {
      return AUTO_SAVE_KEY + this.userInfo.id
    }
  },
  methods: {
    // 数据提交
    handleCreate(data) {
      clearTimeout(this.timer)
      createArticle(data)
        .then(res => {
          this.$notify({
            title: '成功',
            message: '发布新文章成功！',
            type: 'success'
          })
          setStorage(this.autoSaveKey)
          this.receiptData = res
        })
        .catch(e => {
          console.log('createArticle err', e)
        })
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.$nextTick(() => {
        this.checkSaved()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .article-create {
    height: 100%;
    position: relative;

    .storage-info {
      margin: 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      color: $textColor-secondary;
      .storage-info-time {
        margin-top: 0.25em;
      }
    }
  }
</style>

