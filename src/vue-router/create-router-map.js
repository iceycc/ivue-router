export function createRouteMap(routes, oldPathMap) {
// 一个参数是初始化创建路由，两个参数是添加路由
    let pathMap = oldPathMap || []
    // routes router树
    routes.forEach(route => {
        addRouteRecord(route, pathMap, null)
    })
    return {
        pathMap
    }
}


function addRouteRecord(route, pathMap, parent) { // pathMap = {路径：记录}
    let path = parent ? parent.path + '/' + route.path : route.path
    let record = {
        path,
        parent, // 指的是父记录
        name: route.name,
        component: route.component,
        params: route.params,
        meta: route.meta,
        props: route.props
    }
    if (!pathMap[path]) {
        pathMap[path] = record
    }
    if (route.children) { // 没有孩子就停止
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathMap, record)
        })
    }
}
