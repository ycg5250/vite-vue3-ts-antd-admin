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
            <a-menu-item key="/categories/create">
              <router-link to="/categories/create">新建分类</router-link>
            </a-menu-item>
            <a-menu-item key="/categories/list">
              <router-link to="/categories/list">分类列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g2" title="物品">
            <a-menu-item key="/items/create">
              <router-link to="/items/create">新建物品</router-link>
            </a-menu-item>
            <a-menu-item key="/items/list">
              <router-link to="/items/list">物品列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g3" title="英雄">
            <a-menu-item key="/heroes/create">
              <router-link to="/heroes/create">新建英雄</router-link>
            </a-menu-item>
            <a-menu-item key="/heroes/list">
              <router-link to="/heroes/list">英雄列表</router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group key="g4" title="文章">
            <a-menu-item key="/articles/create">
              <router-link to="/articles/create">新建文章</router-link>
            </a-menu-item>
            <a-menu-item key="/articles/list">
              <router-link to="/articles/list">文章列表</router-link>
            </a-menu-item>
            <a-menu-item-group key="g5" title="广告">
              <a-menu-item key="/ads/create">
                <router-link to="/ads/create">新建广告位</router-link>
              </a-menu-item>
              <a-menu-item key="/ads/list">
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
            <a-menu-item key="/admin_users/create">
              <router-link to="/admin_users/create">新建管理员</router-link>
            </a-menu-item>
            <a-menu-item key="/admin_users/list">
              <router-link to="/admin_users/list">管理员列表</router-link>
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
            <a-menu-item key="/categories/create">
              <router-link to="/categories/create">新建管理员</router-link>
            </a-menu-item>
            <a-menu-item key="/categories/list">
              <router-link to="/categories/list">管理员列表</router-link>
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
          <router-view :key="$route.path"></router-view>
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
import { defineComponent, ref, onMounted } from 'vue'

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
    const collapsed = ref<boolean>(false)
    const selectedKeys = ref<string[]>([])

    onMounted(() => {
      selectedKeys.value = ['1']
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