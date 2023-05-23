<script setup lang="ts">
  import { message } from 'ant-design-vue/es'
  import { onBeforeRouteLeave } from 'vue-router'
  import { useUserStore } from '@/store/user'

  const title = 'Logn PAGE'
  let isAdminSign: Ref<boolean>
  let userId = ref('')
  const userStore = useUserStore()
  const { userinfo, token } = storeToRefs(userStore)
  const { setToken, clearToken, setUserName } = userStore
  onBeforeMount(() => {
    isAdminSign = ref(!!localStorage.getItem('isAdmin'))
  })
  const signBtn = {
    value: computed(() => (token.value ? 'sign out' : 'sign in')),
    action: () => {
      if (token.value) {
        clearToken()
      } else {
        if (userId.value.trim() === '') {
          return message.warning('不能为空')
        }
        setToken(`token_${userId.value}`)
        setUserName(userId.value.trim())
        userId.value = ''
      }
    },
  }
  const adminSignBtn = {
    value: computed(() =>
      isAdminSign.value ? 'admin sign out' : 'admin sign in'
    ),
    action: () => {
      if (isAdminSign.value) {
        localStorage.removeItem('isAdmin')
      } else {
        signBtn.action()
        localStorage.setItem('isAdmin', '1')
      }
      isAdminSign.value = !isAdminSign.value
    },
  }
  onBeforeRouteLeave(() => {
    if (userId.value.trim() !== '') {
      return window.confirm('是否离开')
    }
  })
</script>

<template>
  <h1>{{ title }}</h1>
  <h2>{{ userinfo.name }}</h2>
  <a-input v-model:value="userId"></a-input>
  <a-button type="primary" size="large" @click="() => signBtn.action()">{{
    signBtn.value.value
  }}</a-button>
  <a-button type="primary" size="large" @click="() => adminSignBtn.action()">{{
    adminSignBtn.value.value
  }}</a-button>
  <br />
  <router-link to="/person">person link</router-link>
</template>
