<template>
  <div class="start-node custom-flow-node" :class="{active:activeNodeId == id}">
    <div class="node-header">
      <div class="node-icon">
        <i class="iconfont icon-liuchengkaishi"></i>
      </div>
      <div class="node-name">开始</div>
    </div>
    <div class="node-body">
      <div class="props-item">
      </div>
    </div>

    <div class="">

    </div>
  </div>
  <HandleOptions :type="type" @addNode="addNode" :nodeId="id"></HandleOptions>
</template>
<script setup lang="ts">
import {ref} from "vue";
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import HandleOptions from './HandleOptions.vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  activeNodeId: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  }
})

const type = ref("start")

const { updateNodeData, getConnectedEdges} = useVueFlow()

function onSelect(color) {
  updateNodeData(props.id, { color, isGradient: false })

  const connectedEdges = getConnectedEdges(props.id)
  for (const edge of connectedEdges) {
    edge.style = {
      stroke: color,
    }
  }
}

function onGradient() {
  updateNodeData(props.id, { isGradient: true })
}
function addNode(type){
  console.log(type);
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/node';
</style>
