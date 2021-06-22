<template>
  <h1>{{ id ? '编辑' : '新建' }}文章</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="所属分类" name="categories">
      <a-select
        mode="multiple"
        v-model:value="formState.categories"
        placeholder="请选择分类"
      >
        <a-select-option
          v-for="item of categories"
          :key="item._id"
          :value="item._id"
          >{{ item.name }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item label="标题" name="title">
      <a-input v-model:value="formState.title" placeholder="请输入文章名称" />
    </a-form-item>
    <a-form-item label="详情" name="body">
      <vue-editor
        v-model="formState.body"
        useCustomImageHandler
        @image-added="handleImageAdded"
      ></vue-editor>
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

import {
  reqAdd,
  reqGetDetail,
  reqGetList,
  reqUpdate,
  uploadImage,
} from '../../api'
import { VueEditor } from 'vue3-editor'

interface FormState {
  title: string
  categories: string[]
  body: string
}

export default defineComponent({
  components: {
    VueEditor,
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
      title: '',
      categories: [],
      body: '',
    })
    const rules = {
      title: [
        {
          required: true,
          message: '请输入文章名称',
          trigger: 'blur',
        },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
      categories: [
        {
          required: true,
          message: '请选择文章分类',
          type: 'array',
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
            const articleData: object = Object.assign(
              { _id: route.params.id },
              toRaw(formState)
            )
            // 发送修改文章的请求
            result = await reqUpdate(modelUrl, articleData)
          } else {
            // 发送添加文章的请求
            result = await reqAdd(modelUrl, toRaw(formState))
          }
          // 跳转到文章列表页面
          router.push('/articles/list')
          message.success('保存成功')
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }
    const resetForm = () => {
      formRef.value.resetFields()
    }

    /** 获取文章详情*/
    const getArticle = async (id: string) => {
      // console.log("getArticle：", id);
      const result = (await reqGetDetail(modelUrl, { id })) as FormState
      // console.log(result)
      Object.assign(formState, result)
      // formState.title = result.title
    }

    /** 获取所属分类列表*/
    const getCategory = async () => {
      const result = (await reqGetList('/categories')) as string[]
      categories.value = result
    }

    onMounted(() => {
      getCategory()
      if (route.params.id) {
        getArticle(route.params.id.toString())
      }
    })

    /**富文本编辑器 */
    const handleImageAdded = async (
      file,
      Editor,
      cursorLocation,
      resetUploader
    ) => {
      const formData = new FormData()
      formData.append('avatar', file)
      const result: any = await uploadImage('/admin/api/upload', formData)
      console.log(result)
      Editor.insertEmbed(cursorLocation, 'image', result.url)
      resetUploader()
    }

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getArticle,
      getCategory,
      categories,
      handleImageAdded,
    }
  },
})
</script>