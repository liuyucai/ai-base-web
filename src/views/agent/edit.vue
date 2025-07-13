<template>
  <div class="agent-edit-page">
    <div class="left-panel">

    </div>
    <div class="right-operate-main">
      <el-button type="primary" :icon="PositionIcon">发布</el-button>
    </div>
    <RightPanel :node="activeNode"></RightPanel>

    <VueFlow
        v-model:nodes="nodes"
        :edges="edges"
        class="custom-node-flow"
        style="backgroundColor: rgb(240 242 247)"
        @init="onInit"
        @node-click="handleNodeClick"
        :zoom-on-scroll="false">
      <!--      fit-view-on-init  自适应大小-->
      <!--      <template #node-color-selector="props">-->
      <!--        <ColorSelectorNode :id="props.id" :data="props.data" />-->
      <!--      </template>-->
      <!--      <template #node-output>-->
      <!--        <OutputNode />-->
      <!--      </template>-->
      <template #node-start="props">
        <StartNode :id="props.id" :data="props.data" :activeNodeId="activeNodeId"/>
      </template>
      <template #node-llm="props">
        <LlmNode :id="props.id" :data="props.data" :activeNodeId="activeNodeId"/>
      </template>
      <MiniMap node-stroke-color="#eee" node-color="#296dff" style="background: #fff"/>
      <DropzoneBackground/>
    </VueFlow>
  </div>
</template>
<script setup lang="ts">

import {MiniMap} from "@vue-flow/minimap";
import DropzoneBackground from "@/components/DropzoneBackground.vue";
import LlmNode from "@/components/LlmNode.vue";
import StartNode from "@/components/StartNode.vue";
import RightPanel from "@/components/panel/RightPanel.vue";

import {Position, VueFlow,useVueFlow} from "@vue-flow/core";
import {ref} from "vue";
import { Position as PositionIcon} from '@element-plus/icons-vue'

const { fitView, zoomTo,setTransform } = useVueFlow()

const activeNodeId = ref("");
const activeNode = ref({});
const nodes = ref([
  {
    id: '1',
    type: 'start',
    data: {

    },
    position: { x: 0, y: 50 },
    sourcePosition: Position.Right, // 输出连接点位置
    targetPosition: Position.Left,   // 输入连接点位置
  },
  {
    id: '2',
    type: 'llm',
    data: {

    },
    position: { x: 350, y: 114 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right, // 输出连接点位置
  }
  // {
  //   id: '3',
  //   type: 'color-selector',
  //   data: { color: '#fff' },
  //   position: { x: 0, y: 140 },
  //   sourcePosition: 'left', // 输出连接点位置
  //   targetPosition: 'right'   // 输入连接点位置
  // },
  // {
  //   id: '4',
  //   type: 'start',
  //   data: { color: '#fff' },
  //   position: { x: 0, y: 200 },
  //   sourcePosition: 'left', // 输出连接点位置
  //   targetPosition: 'right'   // 输入连接点位置
  // },
])
// 定义连线
const edges = ref([
  {
    id: 'e1a-2',
    source: '1',
    // sourceHandle: 'a',
    target: '2',
    // animated: false,
    style: {
      stroke: '#296dff',
    },
  },
  // {
  //   id: 'e1a-3',
  //   source: '2',
  //   sourceHandle: 'a',
  //   target: '3',
  //   animated: true,
  //   style: {
  //     stroke: '#296dff',
  //   },
  // }
])

function onInit(){
  console.log(".............")
  // setTransform({ zoom: 1 })
  fitView({
    maxZoom:1
  });
}

function handleNodeClick({event, node}){
  // selectedNode.value = node
  console.log("333333333333")
  console.log(event)
  console.log(node)
  activeNodeId.value = node.id;
  activeNode.value = node;
  // 可以在这里添加更多逻辑，如打开模态框等
}
</script>
<style scoped lang="scss">
.agent-edit-page{
  width: 100%;
  height: 100%;
  position: relative;
  .left-panel{
    position: absolute;
    height: 100%;
    width: 200px;
    background: #fff;
    z-index: 999;
  }
  .right-operate-main{
    position: absolute;
    height: 40px;
    box-sizing: border-box;
    z-index: 999;
    top: 10px;
    right: 10px;

  }
}

</style>
