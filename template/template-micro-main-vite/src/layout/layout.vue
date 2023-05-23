<template>
  <div class="layout">
    <div class="nav-bar">
      <nav-bar></nav-bar>
    </div>
    <div class="content-body">
      <div class="side-bar">
        <side-bar></side-bar>
      </div>
      <div class="container">
        <!-- <router-view /> -->
        <router-view> </router-view>
        <!-- <micro-app
          name="micro-child-1"
          url="http://localhost:3101"
          baseroute="/micro-child-1"
          @created="created"
          @beforemount="beforemount"
          @mounted="mounted"
          @unmount="unmount"
          @error="error"
        ></micro-app> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import NavBar from './component/NavBar.vue'
  // import SideBar from './component/SideBar/SideBar.vue'
  import SideBar from './component/SideBar/SideBar.tsx'
  // import { useRouter } from 'vue-router'
  // import MicroApp from '@micro-zoe/micro-app/micro_app'

  // router.
</script>

<style lang="less" scoped>
  .layout {
    padding: 0;
    .nav-bar {
      width: 100vw;
      height: 100px;
    }
    .content-body {
      display: flex;

      .side-bar {
        width: 200px;
        height: calc(100vh - 100px);
      }
    }
  }
</style>
