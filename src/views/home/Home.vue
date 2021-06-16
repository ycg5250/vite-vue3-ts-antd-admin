<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu
        theme="dark"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        @select="selectMenu"
      >
        <a-sub-menu key="sub1">
          <router-link to="/categories"></router-link>
          <template #title>
            <span>
              <MailOutlined />
              <span>内容管理</span>
            </span>
          </template>
          <a-menu-item-group key="g1">
            <template #title>
              <QqOutlined />
              <span>分类管理</span>
            </template>
            <a-menu-item key="1">
              <router-link to="/categories/create">新建分类</router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <router-link to="/categories/list">分类列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="物品">
            <a-menu-item key="3">
              <router-link to="/gameitems/create">新建物品</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link to="/gameitems/list">物品列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g3" title="英雄">
            <a-menu-item key="5">
              <router-link to="/heroes/create">新建英雄</router-link>
            </a-menu-item>
            <a-menu-item key="6">
              <router-link to="/heroes/list">英雄列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g4" title="文章">
            <a-menu-item key="7">
              <router-link to="/articles/create">新建文章</router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link to="/articles/list">文章列表</router-link>
            </a-menu-item>
            <a-menu-item-group key="g5" title="广告">
              <a-menu-item key="9">
                <router-link to="/ads/create">新建广告位</router-link>
              </a-menu-item>
              <a-menu-item key="10">
                <router-link to="/ads/list">广告位列表</router-link>
              </a-menu-item>
            </a-menu-item-group>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <UserOutlined />
              <span>系统设置</span>
            </span>
          </template>
          <a-menu-item-group key="g6">
            <template #title>
              <QqOutlined />
              <span>管理员</span>
            </template>
            <a-menu-item key="11">
              <router-link to="/admin_users/create">新建管理员</router-link>
            </a-menu-item>
            <a-menu-item key="12">
              <router-link to="/admin_users/list">管理员列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g7" title="物品">
            <a-menu-item key="13">
              <router-link to="/gameitems/create">新建物品</router-link>
            </a-menu-item>
            <a-menu-item key="14">
              <router-link to="/gameitems/list">物品列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #title>
            <span>
              <PieChartOutlined />
              <span>运营管理</span>
            </span>
          </template>
          <a-menu-item-group key="g8">
            <template #title>
              <QqOutlined />
              <span>管理员</span>
            </template>
            <a-menu-item key="15">
              <router-link to="/categories/create">新建管理员</router-link>
            </a-menu-item>
            <a-menu-item key="16">
              <router-link to="/categories/list">管理员列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g9" title="物品">
            <a-menu-item key="17">
              <router-link to="/gameitems/create">新建物品</router-link>
            </a-menu-item>
            <a-menu-item key="18">
              <router-link to="/gameitems/list">物品列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
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
  FileOutlined,
  MailOutlined,
  QqOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import Login from "../login/Login.vue";

export default defineComponent({
  name: 'home',
  components: {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    FileOutlined,
    MailOutlined,
    QqOutlined,
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

    onMounted(() => {
      selectedKeys.value = ['2']
    })

    const selectMenu = ({ item, key, selectedKeys }) => {
      // console.log(item, key, selectedKeys)
    }
    return {
      collapsed,
      selectedKeys,
      selectMenu,
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