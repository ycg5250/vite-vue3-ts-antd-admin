<template>
  <a-button
    class="editable-add-btn"
    @click="handleAdd"
    style="margin-bottom: 8px"
    >Add</a-button
  >
  <a-table bordered :data-source="dataSource" :columns="columns">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        title="Sure to delete?"
        @confirm="onDelete(record._id)"
      >
        <a>Delete</a>
      </a-popconfirm>
      <a-button type="link" @click="goToEdit(record._id)">编辑</a-button>
    </template>
  </a-table>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from "vue";
import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { reqGetCategotyList } from "../../api";
import { useRouter } from "vue-router";

interface DataItem {
  key: string;
  _id?: string;
  name: string;
}

export default defineComponent({
  components: {
    CheckOutlined,
    EditOutlined,
  },
  setup() {
    const router = useRouter();
    const columns = [
      {
        title: "id",
        dataIndex: "key",
      },

      {
        title: "name",
        dataIndex: "name",
        width: "30%",
        slots: { customRender: "name" },
      },

      {
        title: "operation",
        dataIndex: "operation",
        slots: { customRender: "operation" },
      },
    ];
    const dataSource: Ref<DataItem[]> = ref([
      // {
      //   key: "0",
      //   name: "Edward King 0",
      // },
      // {
      //   key: "1",
      //   name: "Edward King 1",
      // },
    ]);
    // const dataSource: Ref<DataItem[]> = ref(result);

    // 发送请求获取分类列表数据
    onMounted(async () => {
      const result = (await reqGetCategotyList()) as DataItem[];
      // console.log(result);
      dataSource.value = result; //先赋值，不然无法将_id赋值给key
      result.forEach((item, index) => {
        dataSource.value[index].key = item._id;
      });
    });

    const count = computed(() => dataSource.value.length + 1);

    const onDelete = (key: string) => {
      dataSource.value = dataSource.value.filter((item) => item.key !== key);
    };

    const goToEdit = (key: string) => {
      // console.log(111);
      router.push(`/categories/edit/${key}`);
    };

    const handleAdd = () => {
      // const newData = {
      //   key: `${count.value}`,
      //   name: `Edward King ${count.value}`,
      // };
      // dataSource.value.push(newData);
    };

    return {
      columns,
      onDelete,
      handleAdd,
      dataSource,
      count,
      goToEdit,
    };
  },
});
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