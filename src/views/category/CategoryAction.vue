<template>
  <h1>{{ id ? "编辑" : "新建" }}分类{{ formState }}</h1>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="上级分类" name="parent">
      <a-select v-model:value="formState.parent" placeholder="请选择分类">
        <a-select-option
          v-for="item in parentsList"
          :key="item._id"
          :value="item._id"
          >{{ item.name }}</a-select-option
        >
      </a-select>
    </a-form-item>
    <a-form-item ref="name" label="名称" name="name">
      <a-input v-model:value="formState.name" placeholder="请输入分类名称" />
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">保存</a-button>
      <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { message } from "ant-design-vue";
import { ValidateErrorEntity } from "ant-design-vue/es/form/interface";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  toRaw,
  UnwrapRef,
} from "vue";
import { useRouter, useRoute } from "vue-router";

import { reqAdd, reqGetDetail, reqGetList, reqUpdate } from "../../api";

interface FormState {
  name: string;
  parent: string | undefined;
}

interface Parents {
  _id: string;
  name: string;
}
export default defineComponent({
  props: ["id"],
  setup() {
    const router = useRouter();
    // 获取路由地址，用于发送该页面的请求的url参数
    const modelUrl: string = "/" + router.currentRoute.value.path.split("/")[1];
    const route = useRoute();

    const formRef = ref();
    const newName = ref("");
    const parentsList: Ref<Parents[]> = ref([]);
    const formState: UnwrapRef<FormState> = reactive({
      name: "",
      parent: undefined,
    });
    const rules = {
      name: [
        {
          required: true,
          message: "请输入分类名称",
          trigger: "blur",
        },
        // { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
    };
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(async () => {
          // console.log("values", formState, toRaw(formState));
          let result: any;
          let name: string = toRaw(formState).name;
          // console.log(newName.value, name);
          if (route.params.id && newName.value !== name) {
            // 发送修改分类的请求
            result = await reqUpdate(modelUrl, {
              id: route.params.id,
              name,
            });
          } else {
            // 发送添加分类的请求
            result = await reqAdd(modelUrl, toRaw(formState));
          }

          // console.log(result);
          // 根据后台返回的数据判断分类名称是否相同
          if (result.status === 1) {
            message.error(`${result.message}`);
          } else {
            // 跳转到分类列表页面
            router.push("/categories/list");
            message.success("保存成功");
          }
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log("error", error);
        });
    };
    const resetForm = () => {
      formRef.value.resetFields();
    };

    // 获取分类列表详情
    const getCategory = async (id: string) => {
      // console.log("getCategory：", id);
      const result = (await reqGetDetail(modelUrl, { id })) as FormState;
      // console.log(result);
      newName.value = result.name;
      formState.name = result.name;
      formState.parent = result.parent;
    };

    onMounted(() => {
      getParentsList();
      // const id = route.params.id;
      if (route.params.id) {
        getCategory(route.params.id.toString());
      }
    });

    // 获取父分类列表
    const getParentsList = async () => {
      const result = (await reqGetList(modelUrl)) as Parents[];
      parentsList.value = result;

      // console.log(parentsList.value);
    };

    return {
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      rules,
      onSubmit,
      resetForm,
      getCategory,
      newName,
      getParentsList,
      parentsList,
    };
  },
});
</script>