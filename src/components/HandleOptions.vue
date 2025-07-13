<template>
  <Handle id="a" type="source" :position="Position.Right" class="node-handle node-handle-right" ref="buttonRef" v-click-outside="onClickOutside"/>
  <el-popover
      ref="popoverRef"
      placement="right"
      :virtual-ref="buttonRef"
      trigger="click"
      :hide-after="0"
      virtual-triggering>
    <div class="options-container">
      <div class="option-item" @click="addNode">
        <div class="item-icon"></div>
        <div class="item-name">大模型</div>
      </div>
    </div>
  </el-popover>
  <Handle id="b" type="target" :position="Position.Left" class="node-handle" v-if="type !='start'"/>
</template>

<script setup lang="ts">
import {ref,unref } from "vue";
import { ClickOutside as vClickOutside } from 'element-plus'
import {Handle, Position,useVueFlow} from "@vue-flow/core";

const props = defineProps({
  nodeId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
})
const emit = defineEmits(['addNode']);

const { addNodes,addEdges,getConnectedEdges,findNode} = useVueFlow()

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
function addNode(){

  popoverRef.value?.hide();
  //添加节点
  // console.log("1234")
  // console.log(Date.now())
  // emit('addNode',"llm");

  let newId = 'node_'+Date.now();

  let connectEdges = getConnectedEdges(props.nodeId).filter(edge => edge.source === props.nodeId);

  let positionX = 0;
  let positionY = 0;
  if(connectEdges.length>0){
    positionX = connectEdges[connectEdges.length-1].targetNode.position.x;
    positionY = connectEdges[connectEdges.length-1].targetNode.position.y + connectEdges[connectEdges.length-1].targetNode.dimensions.height + 30;
  }else{
    //位置与父节点位置平齐
    //获取父节点位置
    let pNode = findNode(props.nodeId);
    positionX = pNode.position.x + pNode.dimensions.width+100;
    positionY = pNode.position.y;
  }

  const newNode = {
    id: newId,
    type: 'llm',
    position: {
      x: positionX,
      y: positionY
    },
    sourcePosition: Position.Right, // 输出连接点位置
    targetPosition: Position.Left,   // 输入连接点位置
    data: { }
  }

  // 添加新节点
  addNodes([newNode])

  //添加连线
    //找出edges中，所有source的职位nodeId的最低的y和x，以最后一个对齐

  addEdges([{
    id: `edge-${Date.now()}`,
    source: props.nodeId,
    target: newId,
    style: {
      stroke: '#296dff',
    },
  }])
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/node';
</style>
