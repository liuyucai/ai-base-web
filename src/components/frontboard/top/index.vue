<template>
  <div class="top-container">
    <div class="left-nav">
      <img src="@/assets/images/logo6.png">
<!--      <div class="routeName">摩西AI平台</div>-->
    </div>
    <div class="menu-nav">
      <div class="menu-item" :class="{active:activeMenuId == item.id}" v-for="(item,index) in menu" :key="item.id" @click="menuClick(item)">
        {{item.name}}
      </div>
    </div>
    <div class="right-nav">
      <div class="right-nav-item">
        <i class="iconfont icon-tongzhi"></i>
      </div>
      <div class="right-nav-item">
        <el-dropdown @command="handleCommand">
          <img src="@/assets/images/userIcon.png">
          <template #dropdown>
            <!--            <el-dropdown-menu>-->
            <!--              <el-dropdown-item v-for="(item,index)  in user.dropdown" :command='item.value'>{{item.name}}</el-dropdown-item>-->
            <!--              <el-dropdown-item :divided="user.dropdown&&user.dropdown.length>0" command='logout'>退出登录</el-dropdown-item>-->
            <!--            </el-dropdown-menu>-->
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute,useRouter } from 'vue-router';

import {ref} from "vue";
const router = useRouter();
const props = defineProps({
  user: {
    type: {},
    default: () => {}
  },
  menu: {
    type: [],
    default: () => []
  },
});

const activeMenuId = ref("");

const handleCommand = (command: string) => {
  if (command === 'logout') {
    // 退出登录
    console.log('logout')
  }
}
const menuClick = (item)=>{
  console.log(item);
  if(activeMenuId.value ! = item.id){
    activeMenuId.value = item.id;
    router.push({
      path:item.path,
    })
  }
}
</script>
<style scoped lang="scss">
.top-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e7e8ee;
  padding: 0 20px;
  .left-nav{
    display: flex;
    align-items: center;
    gap: 10px;
    img{
      height: 30px;
    }
    .routeName{
      font-weight: bold;
      font-size: 20px;
    }
  }
  .menu-nav{
    height: 100%;
    display: flex;
    gap: 48px;
    align-items: center;
    .menu-item{
      cursor: pointer;
    }
    .menu-item.active{
      color: #165dff;
    }
  }
  .right-nav{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    .right-nav-item{
      i{
        font-size: 24px;
      }
      img{
        width: 36px;
      }
    }
  }
}
</style>
