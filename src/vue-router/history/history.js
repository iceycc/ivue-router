import History from './base'

export default class BrowserHistory extends History {
    constructor(router) {
        super(router);
    }

    getCurrentLocation() {
        return window.location.pathname;
    }

    setupListener() {
        document.addEventListener('popstate', () => {
            // 监听路径的变化，浏览器的前进和后退是可以监听到的。进行跳转
            this.transitionTo(this.getCurrentLocation())
        })
    }

    push(location) {
        // popstate只能监听历史管理，不能监听路径变化，需要手动
        // 需要手动transitionTo一下
        this.transitionTo(location, () => {
            // 这里的切换不会触发popstate,
            window.history.pushState({}, null, location)
        })
    }
}
