<template>
  <div class="llm-node-panel">
    <el-form
        :model="llmForm"
        label-width="auto"
        label-position="top"
        size="small">
      <el-form-item label="模型选择">
        <el-select
            v-model="llmForm.model"
            placeholder="请选择模型">
          <el-option
              v-for="item in modelLists"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="System Prompt">
        <div class="prompt-container">
          <QuillEditor
              v-model:content="systemPrompt"
              contentType="html"
              :options="editorOptions"
              @text-change="handleTextChange"
              @ready="handleEditorReady"/>
          <div class="prompt-input-tip" ref="promptInputTip">
            <div>输入提示</div>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // 引入主题样式


const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  }
})
const llmForm = reactive({
  model: '',
})
const modelLists = ref([{
  value: '001',
  label: '通义千问',
}])
const systemPrompt=ref('');

let quillEditor = null; // Quill 实例引用

const promptInputTip =ref(null);

// 编辑器配置
const editorOptions = ref({
  placeholder: "在这里写你的提示词，输入'{'插入变量，输入'/'插入提示...",
  modules: {
    toolbar: false,
  }
});

// 编辑器内容变化回调
const handleTextChange = (delta, oldDelta, source) => {
  console.log('内容变化:');
  if (!quillEditor) return;
  try{
    // const quill = quillEditor.getQuill(); // 获取原生 Quill 实例
    const text = quillEditor.getText(); // 获取纯文本内容
    const cursorPosition = quillEditor.getSelection()?.index || 0; // 当前光标位置

    // 检测是否输入了 @
    const lastChar = text.slice(cursorPosition - 1, cursorPosition);
    console.log(text);
    console.log(lastChar);
    if (lastChar == '/') {
      // showUserMentionPrompt(); // 触发提示

      const range = quillEditor.getSelection()
      console.log(".........................");
      console.log(range);
      if (!range) return
      // 获取光标位置的DOM节点
      const bounds = quillEditor.getBounds(range.index)
      console.log(bounds)
      // 获取编辑器容器的位置
      // const cursorRelativePos = quillEditor.root.getBoundingClientRect();
      // 计算相对于编辑器容器的位置
      // this.cursorPosition = {
      //   top: bounds.top - cursorRelativePos.top,
      //   left: bounds.left - cursorRelativePos.left
      // }
      // console.log("top:"+ bounds.top - cursorRelativePos.top)
      // console.log("left:"+ bounds.left - cursorRelativePos.left)
      promptInputTip.value.style.display = 'block'
      promptInputTip.value.style.left = bounds.left+'px'
      promptInputTip.value.style.top = bounds.top+10+'px'
    }
  }catch (e){
    console.log(e)
  }
};

// 编辑器初始化完成回调
const handleEditorReady = (quill) => {
  // console.log('Quill 实例:', quill);
  quillEditor = quill;
};

</script>

<style scoped lang="scss">
.llm-node-panel{
  padding: 10px 0;
  :deep(.el-form-item__label){
    margin-bottom: 2px;
  }
  .prompt-container{
    position: relative;
    height: 300px;
    width: 100%;
    .prompt-input-tip{
      position: absolute;
      background: #fff;
      display: none;
    }
  }
}
:deep(.ql-container.ql-snow){
  border-radius: 6px;
}
</style>
