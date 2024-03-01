import router from '@/router'
import store from '@/store'
import { indexPage, loginPage, siteTitle } from '@/config/config'
import { nextTick } from 'vue'
import ViewUIPlus from 'view-ui-plus'
const whiteList = ['/login', '/forget-password'] // 无需权限路由集合
router.beforeEach(async (to, from) => {
    // 开始加载进度条
    ViewUIPlus.LoadingBar.start()
    // 设置页面title
    document.title = to.meta.title + ' -' + siteTitle
    // 确定用户是否已登录
    const isLogin = store.getters.isLogin
    if (isLogin) { // 判断是否有token
        if (to.path === '/login') {

            // 停止加载进度条
            ViewUIPlus.LoadingBar.finish()
            // 如果已登录，重定向到主页
            return { name: indexPage }
        } else {
            // 确定用户是否已通过getInfo获得其权限角色
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                // debugger
                let item = {
                    fullPath: to.fullPath,
                    meta: to.meta,
                    name: to.name,
                    path: to.path
                }
                // 增加tab多页签数据
                store.dispatch('tagsView/pushRouter', item)
                return true
            } else {
                try {
                    // 获取用户信息 这里可以进行一些操作
                    const { roles } = await store.dispatch('user/getInfo')
                    // 根据角色生成可访问的路由
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    // 增加异步路由
                    accessRoutes.forEach(route => {
                        router.addRoute(route)
                    })
                    // router.addRoutes(accessRoutes) v4版本没有addRouters
                    // 设置replace：true，导航不会留下历史记录
                    router.push({ ...to, replace: true })
                } catch (error) {
                    // 删除token并进入登录页面以重新登录
                    // await store.dispatch('user/resetToken')
                    // ViewUIPlus.Message.error(error || "router error ")
                    console.error(error)
                    // 停止加载进度条
                    ViewUIPlus.LoadingBar.finish()
                    return { name: loginPage }
                }
            }
        }
    } else {
        /* 没有 token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // 免权限直接进入
            return true
        } else {
            // 停止加载进度条
            ViewUIPlus.LoadingBar.finish()
            // 其他无权访问的页面将重定向到登录页面
            return { name: loginPage }
        }
    }
})

router.afterEach((to, from) => {
    // 停止加载进度条
    ViewUIPlus.LoadingBar.finish()
    // 路由切换 滚到到顶部
    window.scrollTo(0, 0);
    if (to.name !== loginPage) {
        // 如果不是登录页 内容区域滚动到顶部
        nextTick(() => {
            if (document.getElementById('main_content')) {
                document.getElementById('main_content').scrollTo(0, 0);
            }
        })
    }
})