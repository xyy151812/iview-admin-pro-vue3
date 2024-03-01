import { createStore } from 'vuex'
import getters from './getters'
// 自动加载 './modules'文件下的所有vuex模块
const modulesFiles = import.meta.glob('./modules/*.js', { eager: true })

const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
    const value = modulesFiles[modulePath].default
    modules[moduleName] = value
    return modules
}, {})
export default createStore({
    modules,
    getters
})