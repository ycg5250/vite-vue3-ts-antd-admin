<template>
  <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" placeholder="请输入广告位名称" />
    </a-form-item>
    <a-form-item label="广告" name="item">
      <a-button
        style="margin-bottom: 1rem"
        type="primary"
        @click="formState.items.push({})"
      >
        <template #icon><PlusOutlined /></template>添加广告</a-button
      >
      <!--   
          :offset="2" -->
      <a-row type="flex">
        <a-col
          class="ad-col"
          :span="24"
          v-for="(item, index) of formState.items"
          :key="index"
        >
          <a-form-item label="跳转链接(url)">
            <a-input
              v-model:value="item.url"
              placeholder="请输入广告url地址"
            ></a-input>
          </a-form-item>

          <a-form-item label="图标">
            <a-upload
              v-model:avatar="item.image"
              name="avatar"
              :data="{ index }"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="/admin/api/upload"
              :before-upload="beforeUpload"
              :customRequest="customRequest"
            >
              <img
                style="width: 320px"
                v-if="formState.items[index].image"
                :src="formState.items[index].image"
                alt="avatar"
              />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>

          <a-form-item>
            <a-popconfirm
              :title="`确认删除-${
                formState.items[index].name ? formState.items[index].name : ''
              }-吗`"
              ok-text="确定"
              cancel-text="取消"
              @confirm="delateAd(index)"
            >
              <a-button type="danger">删除</a-button>
            </a-popconfirm>
          </a-form-item>
        </a-col>
      </a-row>
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
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'

import {
  reqAdd,
  reqGetDetail,
  reqGetList,
  reqUpdate,
  uploadImage,
} from '../../api'

interface FormState {
  name: string
  items: any[]
}

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
  type?: string
  size: number
  originFileObj: any
}

function getBase64(img: any, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  props: ['id'],
  setup() {
    const router = useRouter()
    // 获取路由地址，用于发送该页面的请求的url参数
    const modelUrl: string = '/' + router.currentRoute.value.path.split('/')[1]
    const route = useRoute()

    const formRef = ref()
    const categories = ref<string[]>([])
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      items: [],
    })

    // 上传图片相关参数
    const loading = ref<boolean>(false)

    const rules = {
      name: [
        {
          required: true,
          message: '请输入广告位名称',
          trigger: 'blur',
        },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          // console.log("values", formState, toRaw(formState));
          let result: any
          if (route.params.id) {
            const articleData: object = Object.assign(
              { _id: route.params.id },
              toRaw(formState)
            )
            // 发送修改广告位的请求
            result = await reqUpdate(modelUrl, articleData)
          } else {
            // 发送添加广告位的请求
            result = await reqAdd(modelUrl, toRaw(formState))
          }

          // console.log(result);
          // 根据后台返回的数据判断广告位名称是否相同
          if (result.status === 1) {
            message.error(`${result.message}`)
          } else {
            // 跳转到广告位列表页面
            router.push('/ads/list')
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

    /** 获取广告位详情*/
    const getAd = async (id: string) => {
      // console.log("getArticle：", id);
      const result = (await reqGetDetail(modelUrl, { id })) as FormState
      // console.log(result)
      Object.assign(formState, result)
      // formState.name = result.name
    }

    /**删除广告 */
    const delateAd = (index: number) => {
      formState.items.splice(index, 1)
    }

    onMounted(() => {
      if (route.params.id) {
        getAd(route.params.id.toString())
      }
    })

    // ----图片相关
    /**自定义上传图片 */
    const customRequest = async (options: any) => {
      // console.log('customRequest', options)
      const { filename, file, action, data, onSuccess } = options
      // 定义上传的文件
      const formData = new FormData()
      formData.append(filename, file)
      // 发送请求
      const result: any = await uploadImage(action, formData)
      // console.log(result)
      getBase64(file, (base64Url: string) => {
        formState.items[data.index].image = base64Url
      })
      // 调用 onSuccess 不然会一直显示loadning
      onSuccess()
    }

    const beforeUpload = (file: FileItem) => {
      // console.log('beforeUpload')
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getAd,
      categories,
      delateAd,
      loading,
      beforeUpload,
      customRequest,
    }
  },
})
</script>

<style>
.ad-col {
  border: 1px solid rgb(145, 145, 145, 0.5);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>