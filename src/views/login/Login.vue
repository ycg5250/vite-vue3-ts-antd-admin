<template>
  <div class="login-container">
    <a-card style="width: 25rem; margin: 10rem auto" title="请先登录">
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        :labelCol="{ span: 24 }"
      >
        <a-form-item label="用户名" name="username">
          <a-input
            type="text"
            v-model:value="formState.username"
            placeholder="请输入用户名"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input
            type="password"
            v-model:value="formState.password"
            placeholder="请输入密码"
            autocomplete="off"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onSubmit">登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref, UnwrapRef, toRaw } from 'vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { reqLogin } from '../../api'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

interface FormState {
  username: string
  password: string
}

export default defineComponent({
  name: 'login',
  setup() {
    const formRef = ref()
    const formState: FormState = reactive({
      username: '',
      password: '',
    })

    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
    }

    const router = useRouter()

    /**登录按钮回调 */
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          // 表单验证通过
          const formData: FormState = toRaw(formState)
          const res: any = await reqLogin(formData)
          // console.log(res)
          if (res && res.status === 1) {
            message.error(`${res.message}`)
          } else if (res.status === 0) {
            // localStorage.setItem('token', res.token) // localStorage保存
            localStorage.token = res.token
            // sessionStorage.setItem('token',res.token)  // sessionStorage保存
            message.success('登录成功')
            router.push('/')
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }

    return {
      formState,
      formRef,
      onSubmit,
      rules,
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
