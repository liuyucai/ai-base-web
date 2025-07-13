
<template>
  <div class="frontboard-page">
    <el-container>
      <el-header>
        <top :menu="config.menu" :user="config.user"/>
      </el-header>
      <el-main>
        <el-scrollbar style="height:100%;overflow: hidden" class="main-container">
          <router-view v-slot="{ Component,route  }"  class="frontboard-view">
            <keep-alive>
              <component :is="Component" :key="route.path"/>
            </keep-alive>
            <!--                <component :is="Component"  :key="route.path" v-if="!$route.meta.keepAlive"/>-->
          </router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import top from "./top/index.vue";
import { useRoute,useRouter } from 'vue-router';
const route = useRoute();
const props = defineProps({
  config: {
    type: {},
    default: () => {}
  },
});
</script>
<style scoped lang="scss">
.frontboard-page{
  height: 100%;
  :deep(.el-header){
    padding: 0;
  }
  :deep(.el-container){
    height: 100%;
    .el-main{
      padding: 0;
      background: #f6f7f8;
    }
  }
  .page-aside{
    box-sizing: border-box;
    height: 100%;
    .aside-header{
      padding:  20px 20px 0;
      .logo-container{
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        img{
          width: 40px;
        }
        .title{
          margin-left: 10px;
          .name{
            font-size: 18px;
            font-weight: bold;
          }
          .desc{
            font-size: 10px;
            color: #999;
          }
        }
      }
      .operate-btn{
        .btn-container{
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(90deg, #165dff, #6191ff) !important;
          color: #fff !important;
          font-weight: 700 !important;
          height: 34px;
          //line-height: 34px;
          width: 100%;
          text-align: center;
          border-radius: 6px;
          .btn-text{
            margin-left: 10px;
          }
          cursor: pointer;
        }
      }
    }
    .aside-body{
      height: calc(100% - 106px);
      box-sizing: border-box;
      padding: 4px 0;
    }
  }
  :deep(.el-scrollbar__view){
    height: 100%;
  }
}
</style>
