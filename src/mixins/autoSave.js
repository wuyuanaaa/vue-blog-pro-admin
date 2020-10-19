import {
  getStorage,
  setStorage
} from '@/utils/localStorage'
import { isEqualSimpleArr } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

const AUTO_SAVE_INTERVAL = 1 * 60 * 1000

export default {
  data() {
    return {
      lastData: null
    }
  },
  mounted() {
    this.checkSaved()
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.timer = null
  },
  methods: {
    checkSaved() {
      const storage = getStorage(this.autoSaveKey)
      if (storage) {
        this.dialogVisible = true
        this.lastAutoSaveTime = storage.date
      } else {
        this.autoSave()
      }
    },
    isNotEmptyArticle(data) {
      return data.title || data.markdown || data.tags.length
    },
    isArticleChange(data) {
      const lastData = this.lastData
      if (!lastData) {
        return true
      }
      if (data.title === lastData.title && data.markdown === lastData.markdown && isEqualSimpleArr(data.tags, lastData.tags)) {
        return false
      }
      return true
    },
    autoSave() {
      const data = this.$refs.editor.getData()
      if (this.isNotEmptyArticle(data) && this.isArticleChange(data)) {
        this.showStorageInfo = true
        // 保存当前存档
        this.lastData = cloneDeep(data)
        const now = this.lastAutoSaveTime = new Date()
        setStorage(this.autoSaveKey, {
          date: now,
          data
        }, { d: 7 })
      }
      this.timer = setTimeout(() => {
        this.autoSave()
      }, AUTO_SAVE_INTERVAL)
    },
    // 放弃存档 重置存档
    handleDropSaved() {
      setStorage(this.autoSaveKey)
      this.dialogVisible = false
      this.autoSave()
    },
    // 继续存档编辑
    handleContinue() {
      const { data } = getStorage(this.autoSaveKey)
      this.$refs.editor.setData(data)
      this.dialogVisible = false
      this.autoSave()
    }
  }
}
