<template>
  <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="基础信息">
        <a-form-item label="名称" name="name">
          <a-input
            v-model:value="formState.name"
            placeholder="请输入英雄名称"
          />
        </a-form-item>
        <a-form-item label="称号" name="title">
          <a-input
            v-model:value="formState.title"
            placeholder="请输入英雄称号"
          />
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
        <a-form-item label="难度" name="difficult">
          <a-slider
            style="width: 20rem"
            v-model:value="formState.scores.difficult"
            :max="9"
          />
          <span class="hero-scores">{{
            formState.scores.difficult ? formState.scores.difficult : '0'
          }}</span>
        </a-form-item>
        <a-form-item label="技能" name="skills">
          <a-slider
            style="width: 20rem"
            v-model:value="formState.scores.skills"
            :max="9"
          />
          <span class="hero-scores">{{
            formState.scores.skills ? formState.scores.skills : 0
          }}</span>
        </a-form-item>
        <a-form-item label="攻击" name="attack">
          <a-slider
            style="width: 20rem"
            v-model:value="formState.scores.attack"
            :max="9"
          />
          <span class="hero-scores">{{
            formState.scores.attack ? formState.scores.attack : 0
          }}</span>
        </a-form-item>
        <a-form-item label="生存" name="survive">
          <a-slider
            style="width: 20rem"
            v-model:value="formState.scores.survive"
            :max="9"
          />
          <span class="hero-scores">{{
            formState.scores.survive ? formState.scores.survive : 0
          }}</span>
        </a-form-item>
        <a-form-item label="顺风出装" name="items1">
          <a-select
            mode="multiple"
            v-model:value="formState.items1"
            style="width: 100%"
            placeholder="请现在英雄装备"
          >
            <a-select-option
              v-for="item of heroItems"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="逆风出装" name="items2">
          <a-select
            mode="multiple"
            v-model:value="formState.items2"
            style="width: 100%"
            placeholder="请现在英雄装备"
          >
            <a-select-option
              v-for="item of heroItems"
              :key="item._id"
              :value="item._id"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="使用技巧" name="usageTips">
          <a-textarea
            v-model:value="formState.usageTips"
            placeholder="请输入英雄使用技巧"
            :rows="4"
          />
        </a-form-item>
        <a-form-item label="对抗技巧" name="battleTips">
          <a-textarea
            v-model:value="formState.battleTips"
            placeholder="请输入英雄对抗技巧"
            :rows="4"
          />
        </a-form-item>
        <a-form-item label="团战思路" name="teamTips">
          <a-textarea
            v-model:value="formState.teamTips"
            placeholder="请输入英雄团战思路"
            :rows="4"
          />
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
            <img v-if="formState.avatar" :src="formState.avatar" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
      </a-tab-pane>
      <a-tab-pane key="2" tab="技能">
        <a-button type="primary" @click="formState.skills.push({})">
          <template #icon><PlusOutlined /></template>添加技能</a-button
        >
        <a-row type="flex">
          <a-col
            :span="10"
            :offset="2"
            v-for="(item, index) of formState.skills"
            :key="index"
          >
            <a-form-item label="名称">
              <a-input
                v-model:value="item.name"
                placeholder="请输入技能名称"
              ></a-input>
            </a-form-item>
            <!-- :customRequest="customRequest" -->
            <!-- list-type="picture-card" -->
            <a-form-item label="图标">
              <a-upload
                v-model:avatar="item.icon"
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
                  v-if="formState.skills[index].icon"
                  :src="formState.skills[index].icon"
                  alt="avatar"
                />
                <div v-else>
                  <loading-outlined v-if="loading"></loading-outlined>
                  <plus-outlined v-else></plus-outlined>
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
            </a-form-item>
            <a-form-item label="描述">
              <a-textarea
                v-model:value="item.description"
                placeholder="请输入技能描述"
                :rows="4"
              />
            </a-form-item>
            <a-form-item>
              <a-popconfirm
                :title="`确认删除-${
                  formState.skills[index].name
                    ? formState.skills[index].name
                    : ''
                }-吗`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="delateSkill(index)"
              >
                <a-button style="margin-left: 5.5rem" type="danger"
                  >删除</a-button
                >
              </a-popconfirm>
            </a-form-item>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>

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

import {
  reqAdd,
  reqGetDetail,
  reqGetList,
  reqUpdate,
  uploadImage,
} from '../../api'

interface FormState {
  name: string
  avatar: string | undefined
  title: string
  categories: string[]
  scores: object
  items1: string[]
  items2: string[]
  usageTips: string
  battleTips: string
  teamTips: string
  skills: any[]
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
}

function getBase64(img: any, callback: (base64Url: string) => void) {
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
    const activeKey = ref('1') //当前激活 tab 面板的 key
    const heroCategories = ref<string[]>([])
    const heroItems = ref<string[]>([])
    const formState: UnwrapRef<FormState> = reactive({
      name: '',
      avatar: undefined,
      title: '',
      categories: [],
      scores: {},
      items1: [],
      items2: [],
      usageTips: '',
      battleTips: '',
      teamTips: '',
      skills: [],
    })

    // 上传图片相关参数
    const loading = ref<boolean>(false)

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
    }

    /**获取英雄类型 */
    const getHeroCategories = async () => {
      const result = (await reqGetList('/categories')) as string[]
      heroCategories.value = result
    }

    /**获取英雄装备 */
    const getHeroItems = async () => {
      const result = (await reqGetList('/gameitems')) as string[]
      heroItems.value = result
    }

    /**删除英雄技能 */
    const delateSkill = (index: number) => {
      formState.skills.splice(index, 1)
    }

    onMounted(() => {
      activeKey.value = '1'
      getHeroCategories()
      getHeroItems()
      if (route.params.id) {
        getHeroDetail(route.params.id.toString())
      }
    })

    //------图片相关
    const handleChange = (info: FileInfo) => {
      // console.log('handleChange', info)
      if (info.file.status === 'uploading') {
        loading.value = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          loading.value = false
          formState.avatar = base64Url
        })
      }
      if (info.file.status === 'error') {
        loading.value = false
        message.error('upload error')
      }
    }

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
        formState.skills[data.index].icon = base64Url
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
      wrapperCol: { span: 15 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getHeroDetail,
      loading,
      handleChange,
      beforeUpload,
      heroCategories,
      getHeroItems,
      heroItems,
      activeKey,
      customRequest,
      delateSkill,
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
.hero-scores {
  position: absolute;
  top: 0.5rem;
  right: 26rem;
  margin-left: 0.7rem;
}
</style>