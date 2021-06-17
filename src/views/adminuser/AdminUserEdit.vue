<template>
  <h1>{{ id ? '编辑' : '新建' }}管理员</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="formState.username" placeholder="请输入用户名" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input
        type="text"
        v-model:value="formState.password"
        placeholder="请输入密码"
        autocomplete="off"
      />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { message } from 'ant-design-vue'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  UnwrapRef,
} from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { reqAdd, reqGetDetail, reqUpdate } from '../../api'

interface FormState {
  username: string
  password: string
}

export default defineComponent({
  props: ['id'],
  setup() {
    const router = useRouter()
    // 获取路由地址，用于发送该页面的请求的url参数
    const modelUrl: string = '/' + router.currentRoute.value.path.split('/')[1]
    const route = useRoute()

    const formRef = ref()
    const formState: UnwrapRef<FormState> = reactive({
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
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          // console.log("values", formState, toRaw(formState));
          let result: any
          if (route.params.id) {
            const userData: object = Object.assign(
              { _id: route.params.id },
              toRaw(formState)
            )
            // 发送修改分类的请求
            result = await reqUpdate(modelUrl, userData)
          } else {
            // 发送添加分类的请求
            result = await reqAdd(modelUrl, toRaw(formState))
          }

          // console.log(result);
          // 根据后台返回的数据判断分类名称是否相同
          if (result.status === 1) {
            message.error(`${result.message}`)
          } else {
            // 跳转到分类列表页面
            router.push('/admin_users/list')
            message.success('保存成功')
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }

    /** 获取分类详情*/
    const getAdminUser = async (id: string) => {
      // console.log("getAdminUser：", id);
      const result = (await reqGetDetail(modelUrl, { id })) as FormState
      // console.log(result);
      Object.assign(formState, result)
    }

    onMounted(() => {
      if (route.params.id) {
        getAdminUser(route.params.id.toString())
      }
    })

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getAdminUser,
    }
  },
})
</script>