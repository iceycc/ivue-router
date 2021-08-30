import History from './base'

function ensureSlash() {
    if (window.location.hash) {
        return;
    }
    window.location.hash = '/'
}

function getHash() {
    return window.location.hash.slice(1)
}

export default class HashHistory extends History {
    constructor(router) {
        super(router);
        // hash模式需要默认增加 #/
        ensureSlash()
        // hash模式核心是监听hash值的变换，window.addEventListener('hashchange')
    }

    // 监听事件
    setupListener() {
        // popstate, 监听浏览器历史记录的变化。高版本浏览器可以用popstate，比hashchange性能高
        window.addEventListener('hashchange', () => {
            this.transitionTo(getHash())
        })
    }

    getCurrentLocation() {
        return getHash()
    }
    push(location){
        window.location.hash = location
    }
}
