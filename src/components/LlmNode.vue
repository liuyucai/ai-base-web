<template>
  <div class="start-node custom-flow-node" @click="nodeClick" :class="{active:activeNodeId == id}">
    <div class="node-header">
      <div class="node-icon">
        <i class="iconfont icon-damoxing"></i>
      </div>
      <div class="node-name">大模型</div>
    </div>
    <div class="node-body">
      <div class="props-item">
      </div>
    </div>
    <div class="">

    </div>
  </div>
  <HandleOptions :type="type" :nodeId="id"></HandleOptions>
</template>
<script setup lang="ts">
import {ref} from "vue";
import { Handle, Position, useVueFlow } from '@vue-flow/core'
import HandleOptions from "@/components/HandleOptions.vue";

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
const type = ref("llm")

const { updateNodeData, getConnectedEdges } = useVueFlow()

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

function nodeClick(){
  console.log("23222222222222222222222");
}

</script>

<style scoped lang="scss">
@use '@/assets/styles/node';
</style>
