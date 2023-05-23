<script setup lang="ts">
  import { useRouter } from 'vue-router'

  const title = 'HOME PAGE'
  const router = useRouter()
  const pathJump = (path: string) => {
    router.push(path)
  }
  const mainRouteJump = (path: string) => {
    const data = window.microApp.getData()
    if (data) {
      data.pushState('routerPush', { path })
    }
  }
</script>

<template>
  <h1>{{ title }}</h1>
  <!-- <router-link to="/login">login link</router-link> -->
  <AButton @click="() => pathJump('/login')">to login</AButton>
  <AButton @click="() => mainRouteJump('/login')">to main login</AButton>
  <!-- <a-space align="center" style="margin-bottom: 16px">
    CheckStrictly:
    <a-switch v-model:checked="rowSelection.checkStrictly"></a-switch>
  </a-space>
  <s-table
    :columns="columns"
    :data-source="data"
    :row-selection="rowSelection"
    expand-row-by-click
  /> -->
</template>
