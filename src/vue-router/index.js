import {install} from "./install";
import {createMatcher} from "./create-matcher";
import BrowserHistory from "./history/history";
import HashHistory from "./history/hash";

export default class VueRouter {
    constructor(options) {
        this.beforeEachHooks = []
        // 创建匹配器后，核心的方法就是匹配
        // 动态添加路由： match addRoutes
        // 1、路由扁平化
        this.matcher = createMatcher(options.routes || []);
        // 2、更加模式加载不同的路由系统
        switch (options.mode) {
            case 'history':
                this.history = new BrowserHistory(this)
                break;
            case 'hash':
                this.history = new HashHistory(this) // Html5History
                break;
        }
    }

    match(location) {
        return this.matcher.match(location);
    }
    push(location){
        this.history.push(location)
    }
    beforeEach(fn){
        this.beforeEachHooks.push(fn)
    }
    init(app) {
        const history = this.history; // history实例 hash或者histroy
        const setupListener = () => {
            // 切片编程
            history.setupListener() // 监听hash变化
        }
        // 初始化后 需要先根据当前路径做一次匹配，然后根据hash值改变再次匹配
        history.transitionTo(history.getCurrentLocation(), setupListener);

        history.listen(route => { // 改变了响应式数据 _route
            app._route = route;
        })
    }
}


VueRouter.install = install;

// 1- 路由数据扁平化
// 2- 合并跳转逻辑，监听hash/history变化
// 3- 匹配路径
