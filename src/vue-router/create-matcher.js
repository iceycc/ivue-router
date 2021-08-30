import {createRouteMap} from "./create-router-map";
import {createRoute} from "./history/base";

export function createMatcher(routes) {

    let {pathMap} = createRouteMap(routes);//创建：根据用户配置创建一个映射表
    function addRoutes(routes) { // 添加: 动态路由添加
        createRouteMap(routes, pathMap)
    }

    function match(path) { // 动态匹配路由
        // todo..
        // console.log('match', location)

        let record = pathMap[path]
        return createRoute(record, { // {path:'/',matched:[]}
            path
        })
    }

    return {
        addRoutes,
        match
    }
}
