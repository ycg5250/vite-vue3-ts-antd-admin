<template>
  <div class="login-container">
    <a-card style="width: 25rem; margin: 10rem auto" title="请先登录">
      <a-form :labelCol="{ span: 24 }" :model="formState">
        <a-form-item label="用户名">
          <a-input
            type="text"
            v-model:value="formState.name"
            placeholder="请输入用户名"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item label="密码">
          <a-input
            type="text"
            v-model:value="formState.password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'

interface FormState {
  name: string
  password: string
}

export default defineComponent({
  name: 'login',
  setup() {
    const formState: FormState = reactive({
      name: '',
      password: '',
    })
    return {
      formState,
    }
  },
})
</script>

<style>
.login-container {
  position: absolute;
  right: 0;
  left: 0;
}
</style>
