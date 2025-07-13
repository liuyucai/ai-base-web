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
        <div style="height: 400px;width: 100%">
          <editor
              api-key="5g1bk5rw1djlmxanufdl9fumlkd5fdsuojdfpg52z01vretl"
              v-model="systemPrompt"
              :init="init"
              id="systemPrompt"></editor>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import tinymce from 'tinymce/tinymce'; //tinymce核心文件
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/models/dom'; // 引入dom模块。从 Tinymce6，开始必须有此模块导入
import 'tinymce/skins/ui/oxide/skin.css'//样式
import 'tinymce/themes/silver'; //默认主题
import 'tinymce/plugins/importcss'; //引入css


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

const init={
  selector: '#systemPrompt',
  placeholder: '请在此输入内容', //自动提示词
  language:'zh_CN',
  language_url: '/tinymce/langs/zh_CN.js',
  toolbar: false,
  statusbar: false, // 隐藏底部状态栏
  promotion:false, //Upgrade是否开启
  branding: false, //tiny技术支持信息是否显示
  menubar: false, //菜单栏是否显示
  height: '100%', //编辑器高度

  setup: (editor) => {
    // myEditor.value = editor;
    editor.on('NodeChange', function (e) {
      if(e.element.classList.contains('error-word') && e.element.id.startsWith('check_')){
        //校验文本是否变化
        console.log(e)
        // checkTextChange(e, editor);
      }
    });
    editor.on('change', function (e) {
      // if(tinymceInited.value){
      //   console.log("before开始保存文档")
      //   // beforeSaveDocument();
      // }
    })
  },

  init_instance_callback: function (editor) {
    // 初始化成功后的回调函数
    // tinymceInited.value = true;
  }
}
tinymce.init(init)

</script>

<style scoped lang="scss">
.llm-node-panel{
  padding: 10px 0;
  :deep(.el-form-item__label){
    margin-bottom: 2px;
  }
}
</style>
