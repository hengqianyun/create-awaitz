import { defineStore } from 'pinia'
import { Ref, reactive, ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userinfo = reactive({
      name: 'jimmy',
      name_ch: '吉米',
    })
    const token: Ref<string | null> = ref(null)
    const setUserName = (name: string) => {
      userinfo.name = name
    }
    const setToken = (value: string) => {
      token.value = value
    }
    const clearToken = () => {
      token.value = null
    }

    return {
      userinfo,
      token,
      setUserName,
      setToken,
      clearToken,
    }
  },
  {
    // 增加persist字段即可开启持久化，key默认未store.$id
    persist: {
      key: 'sys',
    },
  }
)
