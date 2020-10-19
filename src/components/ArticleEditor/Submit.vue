<template>
  <el-popover
    v-model="visible"
    placement="bottom"
    width="400"
    trigger="manual"
    @show="popoverShow"
    @hide="popoverHide"
  >
    <div class="popover-wrap">
      <h3 class="popover-title">发布文章</h3>
      <p class="popover-item-title">分类</p>
      <div class="popover-tag">
        <el-tag
          v-for="item in tagList"
          :key="item.id"
          class="popover-tag-item"
          :type="selectedTags.includes(item.id)?'':'info'"
          effect="plain"
          @click="handleTagClick(item)"
        >
          {{ item.tagName }}
        </el-tag>
      </div>
      <p class="popover-item-title">添加标签</p>
      <el-form ref="createTagForm" :inline="true" :model="newTag" :rules="rules">
        <el-form-item label="" prop="tagName">
          <el-input
            v-model="newTag.tagName"
            class="add-tag-input"
            size="mini"
            placeholder="标签名..."
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" @click="handleAddTag">添加</el-button>
        </el-form-item>
      </el-form>
      <p class="popover-item-title">隐私类型</p>
      <el-radio v-model="typeValue" :label="0">公开</el-radio>
      <el-radio v-model="typeValue" :label="1">私密</el-radio>
      <el-button
        class="popover-submit"
        type="primary"
        plain
        @click="handleSubmit"
      >确认并发布</el-button>
    </div>
    <el-button
      slot="reference"
      class="topBar-submit"
      type="text"
      @click="visible=!visible"
    >
      发布
      <i
        class="el-icon--right"
        :class="[visible? 'el-icon-arrow-up': 'el-icon-arrow-down']"
      />
    </el-button>
  </el-popover>
</template>

<script>
import { createTag } from '@/api/tag'

export default {
  name: 'CreateSubmit',
  props: {
    tagList: {
      type: Array,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    selectedTags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      newTag: {
        tagName: ''
      },
      rules: {
        tagName: [
          { required: true, message: '标签名称不能为空', trigger: 'change' },
          { max: 20, message: '标签名称长度不能超过 20 个字符', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    typeValue: {
      get() {
        return this.type
      },
      set(val) {
        this.$emit('update:type', val)
      }
    }
  },
  methods: {
    popoverShow() {
      this.visible = true
    },
    popoverHide() {
      this.visible = false
    },
    handleTagClick({ id }) {
      const index = this.selectedTags.findIndex(item => item === id)
      if (index === -1) {
        this.selectedTags.push(id)
      } else {
        this.selectedTags.splice(index, 1)
      }
    },
    handleAddTag() {
      this.$refs.createTagForm.validate()
        .then(() => {
          return createTag(this.newTag)
        })
        .then(res => {
          this.$message.success('新增标签成功！')
          this.$refs.createTagForm.resetFields()

          this.$parent.fetchTagList().then(() => {
            this.selectedTags.push(res.id)
          })
        })
        .catch(e => {
          console.log('add tag err', e)
        })
    },
    handleSubmit() {
      if (!this.selectedTags.length) {
        this.$message.error('文章需要至少添加一个标签！')
        return
      }
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.popover-wrap {
  .popover-title {
    margin: 0.5em 0 1em;
    color: $textColor-secondary;
  }
  .popover-item-title {
    margin: 0.75em 0;
    color: $textColor-secondary;
  }

  .popover-tag {
    margin-right: -10px;
    margin-bottom: 18px;
    .popover-tag-item {
      margin-right: 1em;
      margin-bottom: 0.5em;
      cursor: pointer;
    }
  }

  .add-tag {
    display: flex;
    .add-tag-input {
      flex: 1;
      margin-right: 10px;
    }
  }

  .popover-submit {
    display: block;
    margin: 18px auto 1em;
  }
}

.topBar-submit {
  line-height: 60px;
  font-size: 16px;
  font-weight: bold;
  color: #000;
  padding: 0 10px;
  vertical-align: top;
  border: 0;
}

</style>
