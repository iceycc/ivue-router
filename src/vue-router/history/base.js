export function createRoute(record, location) {
    let res = []
    // 多级路由，需要找父级的

    // /home /home/a
    if (record) {
        while (record) {
            res.unshift(record)
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}

function runQueue(queue, iterator, cb) {
    // 异步迭代 next
    function next(index) {
        if (index >= queue.length) {
            return cb()
        } else {
            let hook = queue[index]
            //  hook(route,this.current,cb)
            iterator(hook, () => {
                next(index + 1)
            })
        }
    }

    next(0)
}

export default class History {
    constructor(router) {
        this.router = router
        this.cb = null;
        // 核心需要将current属性变成响应式的，后序curretn变化会导致视图更新
        // /home/a  -> /home/b
        // / -> {path:'/',matched:[]}
        this.current = createRoute(null, {
            path: '/'
        })
    }

    // 跳转: 根据路径进行组件渲染。
    // 数据变化-》更新视图
    transitionTo(location, onComplete) {
        // 根据跳转的路径 获取匹配的记录
        let route = this.router.match(location)

        // hooks
        let queue = [].concat(this.router.beforeEachHooks);
        console.log(queue)

        const iterator = (hook, cb) => {
            hook(route, this.current, cb)
        }

        runQueue(queue, iterator, () => {
            // 渲染
            this.current = route; // current引用地址变了
            this.cb && this.cb(route); // 会触发页面渲染
            // 触发监听
            onComplete && onComplete()
        })
    }

    listen(cb) {
        this.cb = cb
    }
}
