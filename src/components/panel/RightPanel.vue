<template>
  <div class="right-panel">
    <div class="panel-header">
      <div class="name-main">
        <div class="node-icon">
          <i class="iconfont icon-liuchengkaishi" v-if="node.type == 'start'"></i>
          <i class="iconfont icon-damoxing" v-if="node.type == 'llm'"></i>
        </div>
        <div class="node-name">开始</div>
      </div>
      <div class="operate-main">
        <i class="iconfont icon-shanchu"></i>
      </div>
    </div>
    <div class="panel-body">
      <div class="dec-container">
        <el-input
            v-model="nodeDesc"
            :autosize="{ minRows: 1, maxRows: 4 }"
            type="textarea"
            placeholder="添加描述..."/>
      </div>
      <LlmNodePanel v-if="node.type == 'llm'" :data="node.data" :id="node.id"></LlmNodePanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import LlmNodePanel from "@/components/panel/LlmNodePanel.vue";
import {ref} from "vue";

const props = defineProps({
  node: {
    type: Object,
    required: true,
  }
})

const nodeDesc = ref("")

</script>

<style scoped lang="scss">
.right-panel{
  position: absolute;
  height: calc(100% - 60px);
  width: 350px;
  background: #fff;
  right: 0;
  top: 50px;
  right: 10px;
  z-index: 999;
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  .panel-header{
    display: flex;
    padding-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    .name-main{
      display: flex;
      align-items: center;
      gap: 10px;
      .node-icon{
        width: 24px;
        height: 24px;
        border-radius: 5px;
        background: #296dff;
        text-align: center;
        line-height: 24px;
        i{
          font-size: 18px;
          color: #fff;
        }
      }
    }
  }
  .panel-body{
    height: 100%;
    overflow: auto;
    .dec-container{
      border-bottom: 1px solid #e7e8ee;
      padding-bottom:8px;
      :deep(.el-textarea__inner){
        box-shadow: none;
        resize: none;
        padding: 0;
        font-size: 12px;
      }
    }
    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar {
      width: 3px;
      height: 6px;
      background: transparent;
    }

    ::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
}
</style>
