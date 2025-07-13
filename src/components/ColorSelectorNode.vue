<template>
  <div style="border: 1px solid #ccc;">
    <div>选择颜色</div>
    <div class="color-selector nodrag nopan">
      <div>
        这是自定义组件
      </div>
    </div>
  </div>
  <Handle id="a" type="source" :position="Position.Right" />
  <Handle id="b" type="target" :position="Position.Left" />
</template>
<script setup lang="ts">
import {ref} from "vue";

import { Handle, Position, useVueFlow } from '@vue-flow/core'

const presets = ref({
  sumi: '#1C1C1C',
  gofun: '#FFFFFB',
  byakuroku: '#A8D8B9',
  mizu: '#81C7D4',
  asagi: '#33A6B8',
  ukon: '#EFBB24',
  mushikuri: '#D9CD90',
  hiwa: '#BEC23F',
  ichigo: '#B5495B',
  kurenai: '#CB1B45',
  syojyohi: '#E83015',
  konjyo: '#113285',
  fuji: '#8B81C3',
  ayame: '#6F3381',
  torinoko: '#DAC9A6',
  kurotsurubami: '#0B1013',
  ohni: '#F05E1C',
  kokikuchinashi: '#FB9966',
  beniukon: '#E98B2A',
  sakura: '#FEDFE1',
  toki: '#EEA9A9',
})

const colors = Object.keys(presets).map((color) => {
  return {
    name: color,
    value: presets[color],
  }
})

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

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
</script>

<style scoped>

</style>
