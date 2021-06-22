<template>
  <!-- <h2>{{ dataSource }}</h2> -->

  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #icon="{ record }">
      <span>
        <img :src="record.icon" alt="" />
      </span>
    </template>
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        :title="`确认删除 ${record.name} 吗`"
        ok-text="确定"
        cancel-text="取消"
        @confirm="onDelete(record._id)"
      >
        <a>删除</a>
      </a-popconfirm>
      <a-button type="link" @click="goToEdit(record._id)">编辑</a-button>
    </template>
  </a-table>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import {
  CheckOutlined,
  EditOutlined,
  SmileOutlined,
} from '@ant-design/icons-vue'
import { reqGetList, reqRemove } from '../../api'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

interface DataItem {
  key: string
  _id?: string
  name: string
}

export default defineComponent({
  name: 'GameItemsList',
  components: {
    CheckOutlined,
    EditOutlined,
    SmileOutlined,
  },
  setup() {
    const router = useRouter()
    // 获取路由地址，用于发送该页面的请求的url参数
    const modelUrl: string = '/' + router.currentRoute.value.path.split('/')[1]
    const columns = [
      {
        title: 'ID',
        dataIndex: 'key',
        // width: "30%",
        key: 'key',
      },
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '图标',
        dataIndex: 'icon',
        width: '30%',
        key: 'icon',
        slots: { customRender: 'icon' },
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        key: 'operation',
      },
    ]
    const dataSource: Ref<DataItem[]> = ref([])

    const getGameItemList = async () => {
      const result = (await reqGetList(modelUrl)) as DataItem[]
      // console.log(result);
      dataSource.value = result //先赋值，不然无法将_id赋值给key
      result.forEach((item, index) => {
        dataSource.value[index].key = item._id
      })
    }

    // 发送请求获取分类列表数据
    onMounted(() => {
      getGameItemList()
    })

    const count = computed(() => dataSource.value.length + 1)

    const onDelete = async (key: string) => {
      // dataSource.value = dataSource.value.filter((item) => item.key !== key);
      const result: any = await reqRemove(modelUrl, { id: key })
      if (result.status === 0) {
        message.success(`${result.message}`)
        getGameItemList()
      }
    }

    const goToEdit = (key: string) => {
      // console.log(111);
      router.push(`/items/edit/${key}`)
    }

    return {
      columns,
      onDelete,
      dataSource,
      count,
      goToEdit,
      getGameItemList,
    }
  },
})
</script>
<style>
.editable-cell {
  position: relative;
}
.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  margin-top: 4px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>