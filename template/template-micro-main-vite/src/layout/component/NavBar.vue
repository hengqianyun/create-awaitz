<template>
  <div class="nav-bar">
    <div class="logo">logo</div>
    <div class="container">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
  const title = 'Main Home Page'
</script>

<style lang="less" scoped>
  .nav-bar {
    display: flex;

    .logo {
      height: 100%;
      font-size: 22px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: aqua;
    }

    .container {
      width: calc(100vw - 200px);
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      text-align: center;
      line-height: 1;
    }
  }
</style>
