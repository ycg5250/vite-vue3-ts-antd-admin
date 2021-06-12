<template>
  <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="名称" name="name">
      <a-input v-model:value="formState.name" placeholder="请输入英雄名称" />
    </a-form-item>
    <a-form-item label="称号" name="title">
      <a-input v-model:value="formState.title" placeholder="请输入英雄称号" />
    </a-form-item>
    <a-form-item label="类型" name="categories">
      <a-select
        mode="multiple"
        v-model:value="formState.categories"
        style="width: 100%"
        placeholder="请现在英雄分类"
      >
        <a-select-option
          v-for="item of heroCategories"
          :key="item._id"
          :value="item._id"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="图标" name="avatar">
      <a-upload
        v-model:avatar="formState.avatar"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="/admin/api/upload"
        :before-upload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { message } from 'ant-design-vue'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue'
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

import { reqAdd, reqGetDetail, reqGetList, reqUpdate } from '../../api'

interface FormState {
  name: string
  avatar: string | undefined
  title: string
  categories: string[]
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

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

export default defineComponent({
  name: 'HeroEdit',
  props: ['id'],
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  setup() {
    const formRef = ref()
    const heroCategories = ref<string[]>([])
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      avatar: undefined,
      title: '',
      categories: [],
    })

    // 上传图片相关参数
    const fileList = ref([])
    const loading = ref<boolean>(false)
    const imageUrl = ref<string>('')

    const router = useRouter()
    // 获取路由地址，用于发送该页面的请求的url参数
    const modelUrl: string = '/' + router.currentRoute.value.path.split('/')[1]
    const route = useRoute()

    const rules = {
      name: [
        {
          required: true,
          message: '请输入英雄名称',
          trigger: 'blur',
        },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          // console.log('values', formState, toRaw(formState))
          // console.log(toRaw(formState))
          let result: any
          if (route.params.id) {
            const heroData: object = Object.assign(
              { _id: route.params.id },
              toRaw(formState)
            )
            // 发送修改分类的请求
            result = await reqUpdate(modelUrl, heroData)
          } else {
            // 发送添加分类的请求
            result = await reqAdd(modelUrl, toRaw(formState))
          }

          // console.log(result);
          // 根据后台返回的数据判断分类名称是否相同
          if (result && result.status === 1) {
            message.error(`${result.message}`)
          } else {
            // 跳转到分类列表页面
            router.push('/heroes/list')
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

    /** 获取英雄详情*/
    const getHeroDetail = async (id: string) => {
      // console.log("getCategory：", id);
      const result = (await reqGetDetail(modelUrl, { id })) as FormState
      // console.log(result)
      Object.assign(formState, result)
      imageUrl.value = result.avatar
    }

    /**获取英雄类型 */
    const getHeroCategories = async () => {
      const result = (await reqGetList('/categories')) as string[]
      heroCategories.value = result
    }

    onMounted(() => {
      getHeroCategories()
      if (route.params.id) {
        getHeroDetail(route.params.id.toString())
      }
    })

    //------图片相关
    const handleChange = (info: FileInfo) => {
      // console.log('handleChange')
      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        // console.log(info.file)
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          imageUrl.value = base64Url
          loading.value = false
          formState.avatar = base64Url
        })
      }
      if (info.file.status === 'error') {
        loading.value = false
        message.error('upload error')
      }
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
      wrapperCol: { span: 15 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getHeroDetail,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      fileList,
      heroCategories,
    }
  },
})
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>