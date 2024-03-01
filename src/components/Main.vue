<template>
    <Layout class="ivu-layout-has-sider i-layout">
        <Sider class="i-layout-sider" hide-trigger collapsible :collapsed-width="80" :width="256"
            :class="'i-layout-sider-' + themeType == 'light' ? 'fix' : themeType" v-model="isCollapsed">
            <div class="ivu-layout-sider-children">
                <div class="i-layout-sider-logo">
                    <a href="/" target="_self" class="i-link i-link-color">
                        <img :src="isCollapsed ? 'assets/logo-small.png' : 'assets/logo.png'" alt="">
                    </a>
                </div>
                <Menu :active-name="activeName" width="auto" :open-names="openNames" accordion @on-select="menuNav"
                    @on-open-change="open" ref="side_menu">
                    <template v-for="(item, index) in routersArr">
                        <Submenu :key="index" :name="item.name" v-if="!isCollapsed && !item.meta.hide">
                            <template #title v-if="!isCollapsed">
                                <Icon :type="item.meta.icon" />
                                <span class="titlespan">{{ item.meta.title }}</span>
                            </template>
                            <div v-for="it in item.children" :key="it.name">
                                <MenuItem :name="it.name" v-if="!isCollapsed && !it.meta.hide">
                                <span class="i-layout-menu-side-title">
                                    <span class="i-layout-menu-side-title-text i-layout-menu-side-title-text-with-subtitle">
                                        {{ it.meta.title }}
                                        <em>{{ it.name }}</em>
                                    </span>
                                </span>
                                </MenuItem>
                            </div>
                        </Submenu>
                    </template>

                </Menu>
            </div>
        </Sider>
        <!-- /left end -->
        <!-- right start -->
        <Layout class="i-layout-inside ">
            <Header class="i-layout-header i-layout-header-color-light i-layout-header-fix"
                :class="isCollapsed ? 'i-layout-header-fix-collapse' : ''"
                :style="{ width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)' }">
                <!-- header left start -->
                <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="isCollapsed = !isCollapsed">
                    <Icon custom="i-icon i-icon-menu-fold" />
                </span>
                <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="refresh">
                    <Icon custom="i-icon i-icon-refresh" />
                </span>
                <Breadcrumb class="i-layout-header-breadcrumb">
                    <BreadcrumbItem>首页</BreadcrumbItem>
                    <BreadcrumbItem v-for="(item, index) in route.matched" :key="index">{{ item.meta.title }}
                    </BreadcrumbItem>
                </Breadcrumb>
                <!-- header left end -->
                <!-- header right start -->
                <div class="i-layout-header-right">
                    <span
                        class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in i-layout-header-trigger-nohover">
                        <input type="text" placeholder="搜索..." class="i-layout-header-search">
                    </span>
                    <Tooltip content="没有日常或异常" placement="bottom">
                        <span class="i-layout-header-trigger i-layout-header-trigger-min">
                            <Badge>
                                <Icon custom="i-icon i-icon-record" />
                            </Badge>
                        </span>
                    </Tooltip>
                    <span class="i-layout-header-trigger i-layout-header-trigger-min" @click="maxWindow">
                        <Icon :custom="isMaxWindow ? 'i-icon i-icon-exit-full-screen' : 'i-icon i-icon-full-screen'" />
                    </span>
                    <span class="i-layout-header-trigger i-layout-header-trigger-min i-layout-header-trigger-in">
                        <Notification class="i-layout-header-notice" auto-count>
                            <template #icon>
                                <Icon custom="i-icon i-icon-notification" />
                            </template>
                            <NotificationTab :count="0" title="通知" name="notification">

                            </NotificationTab>
                            <NotificationTab :count="0" title="消息" name="message">

                            </NotificationTab>
                            <NotificationTab :count="0" title="代办" name="task">

                            </NotificationTab>
                        </Notification>
                    </span>
                    <Dropdown class="i-layout-header-user">
                        <span class="i-layout-header-trigger i-layout-header-trigger-min">
                            <Avatar src="https://picsum.photos/200" />
                            <span class="i-layout-header-user-name">Aresn</span>
                        </span>
                        <template #list>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Icon type="ios-contact-outline" />个人中心
                                </DropdownItem>
                                <DropdownItem>
                                    <Icon type="ios-settings-outline" />设置
                                </DropdownItem>
                                <DropdownItem divided>
                                    <Icon type="ios-log-out" />退出登录
                                </DropdownItem>
                            </DropdownMenu>
                        </template>
                    </Dropdown>
                </div>
                <!-- header right end  -->
            </Header>
            <Content
                class="i-layout-content i-layout-content-fix-with-header i-layout-content-with-tabs i-layout-content-with-tabs-fix">
                <!-- 多标签 start -->
                <div class="i-layout-tabs i-layout-tabs-fix"
                    :style="{ width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)', left: isCollapsed ? '80px' : '256px' }">
                    <div class="i-layout-tabs-main">
                        <Tabs v-model="activeName" type="card" :animated="false" closable @on-click="tabsNav"
                            @on-tab-remove="closeTabs">
                            <TabPane v-for="(item, index) in store.getters.routerArr" :key="index" :index="index"
                                :label="item.meta.title" :name="item.name" :closable="item.name != indexPage">
                            </TabPane>
                        </Tabs>
                        <Dropdown class="i-layout-tabs-close">
                            <div class="i-layout-tabs-close-main">
                                <Icon type="ios-arrow-down" />
                            </div>
                            <template #list>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Icon type="md-arrow-back" /> 关闭左侧
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Icon type="md-arrow-forward" /> 关闭右侧
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Icon type="md-close" /> 关闭其他
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Icon type="md-close-circle" /> 全部关闭
                                    </DropdownItem>
                                </DropdownMenu>
                            </template>
                        </Dropdown>
                    </div>
                </div>
                <!-- /多标签 end -->
                <div class="i-layout-content-main">
                    <router-view v-if="isRouterViewShow"></router-view>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
        <!-- /right end -->
    </Layout>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { themeData, indexPage } from '@/config/config'
import { mapGetters, useStore } from 'vuex'
const themeType = ref(themeData.themeType)  // 主题风格
const isMaxWindow = ref(false) // 是否最大化窗口
const isCollapsed = ref(false) // 是否收缩
const side_menu = ref(null)
const isRouterViewShow = ref(true) // 是否显示路由视图
const store = useStore()
const route = useRoute()
const router = useRouter()
const activeName = ref(route.name) // 子导航选中的name
const openNames = ref([]) // 导航打开的父栏目
const routersArr = ref([]) // 路由数据
let userData = reactive({}) // 登录用户数据
// 页面刷新
const refresh = () => {
    // 先隐藏
    isRouterViewShow.value = false
    // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
    nextTick(() => {
        isRouterViewShow.value = true
    })
}
onMounted(() => {
    setRouterArr()
    if (route.meta.hide) {
        router.push({ name: indexPage })
    }
    openNames.value = [route.meta.fuName]
    window.addEventListener('unload', saveState)
    nextTick(() => {
        if (side_menu.value) {
            // 重新渲染导航
            side_menu.value.updateOpened()
        }
    })
})
watch(route, () => {
    // 路由变化时，更新子导航选中的name
    activeName.value = route.name
    openNames.value = [route.meta.fuName]
})
// 处理路由数据 包含路由角色权限
const setRouterArr = () => {
    // 获取用户数据
    userData = store.getters.userData
    routersArr.value = JSON.parse(JSON.stringify(store.getters.routes))
}
// 父级栏目展开收缩事件
const open = (name) => {
    openNames.value = ['' + name + '']
}
// 导航跳转
const menuNav = (name) => {
    routerPush(name)
}
// 标签跳转
const tabsNav = (name) => {
    routerPush(name)
}
const closeTabs = (name) => {
    const arr = store.getters.routerArr
    // 获取索引
    const index = arr.findIndex(item => item.name == name)
    store.dispatch('tagsView/delRouter', index)
    router.push({
        name: arr[index - 1].name
    })
}
// 路由跳转
const routerPush = (name) => {
    activeName.value = name
    router.push({ name: name })
}
// 页面刷新后 将vuex路由数据存储到本地
const saveState = () => {
    let arr = store.getters.routerArr
    let arr1 = []
    for (let v of arr) {
        let item = {
            fullPath: v.fullPath,
            meta: v.meta,
            name: v.name,
            path: v.path
        }
        arr1.push(item)
    }
    localStorage.setItem('dataRouter', JSON.stringify(arr1))
}
const maxWindow = () => {
    if (isMaxWindow.value) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        isMaxWindow.value = false
    } else {
        let element = document.documentElement
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        isMaxWindow.value = true
    }
}
</script>