<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <!-- <div class="logo" /> -->
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <!-- <a-menu-item key="1">
          <pie-chart-outlined />
          <span><router-link to="/home">首页</router-link></span>
        </a-menu-item> -->
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <PieChartOutlined />
              <span>分类菜单</span>
            </span>
          </template>
          <a-menu-item key="2"
            ><router-link to="/categories/create">新建分类</router-link>
          </a-menu-item>
          <a-menu-item key="3"
            ><router-link to="/categories/list"
              >分类列表</router-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <DesktopOutlined />
              <span>物品</span>
            </span>
          </template>
          <a-menu-item key="4"
            ><router-link to="/gameitems/create">新建物品</router-link>
          </a-menu-item>
          <a-menu-item key="5"
            ><router-link to="/gameitems/list"
              >物品列表</router-link
            ></a-menu-item
          >
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <user-outlined />
              <span>英雄</span>
            </span>
          </template>
          <a-menu-item key="6"
            ><router-link to="/heroes/create">新建英雄</router-link>
          </a-menu-item>
          <a-menu-item key="7"
            ><router-link to="/heroes/list">英雄列表</router-link></a-menu-item
          >
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
// import Login from "../login/Login.vue";

export default defineComponent({
  name: 'home',
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined,
  },
  setup(props) {
    // const router = useRouter();
    // console.log(router);
    // const path = ref(router.currentRoute.value.path);
    // const pathName = computed(() => {
    //   return path.value.slice(1).split("/");
    // });
    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<string[]>(['1'])
    return {
      collapsed,
      selectedKeys,
    }
  },
})
</script>
<style>
/* #components-layout-demo-side .logo { */
/* height: 32px;
  margin: 16px; */
/* background: rgba(255, 255, 255, 0.3); */
/* } */

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>