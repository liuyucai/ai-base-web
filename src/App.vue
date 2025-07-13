<template>
  <frontboard v-if="routePath != '/login'" :config="config" ></frontboard>
</template>
<script setup lang="ts">
import {ref,watch,nextTick} from "vue";
import { useRoute } from 'vue-router';
import frontboard from "@/components/frontboard/index.vue";

const route = useRoute();
const routePath = ref("/");

const config = ref({
  menu:[{
    name: "模型",
    id: 1,
    icon: "iconfont icon-shouye",
    path: "/model",
    children: null
  },{
    name: "应用",  //还有一个应用广场、我的应用
    id: 2,
    icon: "iconfont icon-shouye",
    path: "/agent",
    children: null
  },{
    name: "知识库",
    id: 3,
    icon: "iconfont icon-shouye",
    path: "/home",
    children: null
  }],
  user:{
    userId:"",
    userName:"运营人员",
    icon:"",
    dropdown:[
      {
        name:"首页",   // enName:  enName
        value:"home"
      },{
        name:"个人中心",
        value:"personCenter"
      }
    ]
  },
});
// 监听路由变化
watch(
    () => route,
    (newRoute, oldRoute) => {
      routePath.value = newRoute.path;
    },
    { deep: true, immediate: true }
);
</script>
<style lang="scss">
html,body{
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  background: rgb(240 242 247);
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
#app {
  height: 100% !important;
  margin: 0;
  padding: 0;
  width: 100%;
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
</style>
