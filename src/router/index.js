import { createRouter, createWebHistory, useRouter } from 'vue-router'
import Main from "@/components/Main"
// 不需要权限校验的静态路由
export const constantRoutes = [
    {
        path: "/login",
        name: "login",
        meta: {
            hide: true,
            title: "登录"
        },
        component: () => import("@/views/login/login")
    },
    {
        path: "/",
        name: "Dashboard",
        redirect: '/Dashboard/console',
        component: Main,
        meta: {
            hide: false,
            title: "Dashboard",
            icon: "md-speedometer",
        },
        children: [
            {
                path: "/Dashboard/console",
                name: "console",
                meta: {
                    hide: false,
                    title: "主控台"
                },
                component: () => import("@/views/Dashboard/console")
            },
            {
                path: "/Dashboard/monitor",
                name: "monitor",
                meta: {
                    hide: false,
                    title: "监控页"
                },
                component: () => import("@/views/Dashboard/monitor")
            },
            {
                path: "/Dashboard/workplace",
                name: "workplace",
                meta: {
                    hide: false,
                    title: "工作台"
                },
                component: () => import("@/views/Dashboard/workplace")
            }
        ]
    }
]
// 需要权限校验的异步路由
export const asyncRoutes = [
    {
        path: '/system',
        name: 'system',
        component: Main,
        meta: {
            hide: false,
            title: '系统管理',
            icon: 'md-options',
            roleId: 1
        },
        children: [
            {
                path: '/system/users',
                name: 'users',
                meta: {
                    hide: false,
                    title: '用户管理',
                    roleId: 1
                },
                component: () => import("@/views/system/user")
            },
            {
                path: '/system/menu',
                name: 'menu',
                meta: {
                    hide: false,
                    title: '菜单管理',
                    roleId: 1
                },
                component: () => import("@/views/system/menu")
            },
            {
                path: '/system/role',
                name: 'role',
                meta: {
                    hide: false,
                    title: '权限管理',
                    roleId: 1
                },
                component: () => import("@/views/system/role")
            }
        ]
    }
]

const newRouter = () => createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})

const router = newRouter()

// 重置路由
export function resetRouter() {
    const newRouter = newRouter()
    router.matcher = newRouter.matcher // reset router
}
// 解决跳转同一个路由报错
const originalPush = router.push
router.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default router
