<template>
  <div class="ArticleEditor-wrap">
    <div class="topBar">
      <input v-model="inputTitle" class="topBar-input" placeholder="输入文章标题...">
      <slot />
      <Submit
        :tag-list="tagList"
        :type.sync="type"
        :selected-tags.sync="selectedTags"
        @submit="handleSubmit"
      />
    </div>
    <Editor
      ref="editor"
      class="editor"
      :preview-style="previewStyle"
      :options="editorOptions"
    />
  </div>
</template>

<script>
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@/components/TuiEditor'
import '@toast-ui/editor/dist/i18n/zh-cn.js'
import editorOptions from './editorDefaultOptions'

import { mapGetters } from 'vuex'
import Submit from './Submit'
import { getArticleDetail } from '@/api/article'
import { getTagList } from '@/api/tag'

export default {
  name: 'ArticleEditor',
  components: {
    Submit,
    Editor
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorOptions: editorOptions,
      title: '',
      tags: [],
      type: 0,
      markdown: '',
      tagList: []
    }
  },
  computed: {
    ...mapGetters(['isSmallScreen']),
    isEdit() {
      return this.id !== ''
    },
    selectedTags: {
      get() {
        return this.tags
      },
      set(val) {
        this.tags = val
      }
    },
    inputTitle: {
      get() {
        return this.title
      },
      set(val) {
        this.title = val
      }
    },
    previewStyle() {
      return this.isSmallScreen ? 'tab' : 'vertical'
    }
  },
  watch: {
    'markdown': {
      handler(val) {
        this.$refs.editor.invoke('setMarkdown', val)
      }
    }
  },
  mounted() {
    this.isEdit && this.fetchDetail()
    this.fetchTagList()
  },
  methods: {
    fetchDetail() {
      getArticleDetail(this.id)
        .then(res => {
          const { title, tags, type, markdown } = res
          this.title = title
          this.tags = tags.map(item => item.id)
          this.type = type
          this.markdown = markdown
        })
    },
    fetchTagList() {
      return getTagList()
        .then(list => {
          this.tagList = list
        })
        .catch(e => {
          console.log('fetch tagList err', e)
        })
    },
    getHtml() {
      return this.$refs.editor.invoke('getHtml')
    },
    getMarkdown() {
      return this.$refs.editor.invoke('getMarkdown')
    },
    setMarkdown(markdown) {
      this.$refs.editor.invoke('setMarkdown', markdown)
    },
    getData() {
      return {
        title: this.title,
        tags: [...this.tags],
        type: this.type,
        markdown: this.getMarkdown()
      }
    },
    setData({ title, tags, type, markdown }) {
      this.title = title
      this.tags = tags
      this.type = parseInt(type)
      this.$refs.editor.invoke('setMarkdown', markdown)
    },
    // 数据校验
    validate() {
      return new Promise((resolve, reject) => {
        if (!this.title) {
          this.$message.error('标题不应为空！')
          reject('title empty')
          return
        }
        const markdown = this.getMarkdown()
        if (!markdown) {
          this.$message.error('内容不应为空！')
          reject('content empty')
          return
        }
        resolve(markdown)
      })
    },
    // 处理标题锚点并修改 html
    setAndReturenCatalog(html) {
      const reg = /(<h([1-6]{1})>)(.+)<\/h[1-6]{1}>/
      let index = 0
      let result

      const catalog = []

      while ((result = html.match(reg)) !== null) {
        // eslint-disable-next-line
        const [matchedStr, startTag, lev, heading] = result
        const label = `heading-${index}`

        html = html.replace(startTag, `<h${lev} id="${label}">`)

        catalog.push({
          lev: Number(lev),
          heading,
          label
        })
        index++
      }
      return { html, catalog }
    },
    // 数据提交
    handleSubmit() {
      this.validate()
        .then(markdown => {
          // 提取目录
          const { html, catalog } = this.setAndReturenCatalog(this.getHtml())

          this.$emit('submit', {
            title: this.title,
            tags: this.tags.filter(item => this.tagList.find(tag => tag.id === item)),
            type: this.type,
            markdown,
            html,
            catalog
          })
        })
        .catch(e => {
          console.log('submit err', e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.ArticleEditor-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.topBar {
  display: flex;
  padding: 0 10px;
  background: $background-8;
  .topBar-input {
    flex: 1;
    padding: 0 10px;
    height: 60px;
    font-weight: bold;
    font-size: 20px;
    outline: none;
    border: none;
    vertical-align: top;
    background: transparent;
  }

}
.editor {
  flex: 1;
}

.popover-wrap {
  .popover-title {
    margin: 0.5em 0;
    color: $textColor-secondary;
  }
  .popover-item-title {
    color: $textColor-secondary;
  }
}

</style>

<style lang="scss">
.ArticleEditor-wrap {
  .te-preview {
    background: $background-8;
  }
}
</style>
