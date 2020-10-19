import {
  upload as qiniuUpload
} from '@/utils/qiniu'

import 'highlight.js/styles/atom-one-dark.css'

import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

export default {
  minHeight: '200px',
  language: 'zh-CN',
  useCommandShortcut: true,
  useDefaultHTMLSanitizer: true,
  usageStatistics: true,
  hideModeSwitch: false,
  placeholder: '开始搬砖22...',
  plugins: [[codeSyntaxHighlight, { hljs }]],
  hooks: {
    addImageBlobHook(fileOrBlob, callback, source) {
      qiniuUpload(fileOrBlob, fileOrBlob.name)
        .then(url => {
          callback(url, fileOrBlob.name)
        })
        .catch(err => {
          console.log('qiniuUpload err', err)
        })
    }
  }
}
