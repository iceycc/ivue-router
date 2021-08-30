export default {
    functional: true,
    name: 'router-view',
    props: {
        a: {
            default: 1
        }
    },
    render(h, {data, parent}) {
        // 类组件 Vue.extend
        // 函数组件 函数组件节省性能，没有实例了a
        let route = parent.$route;
        let depth = 0;
        let records = route.matched; //  ['/home','/home/a']
        data.routerView = true; // 渲染router-view是标记他是一个routerView看之前渲染过几个router-view
        while (parent) {
            // 注意 $vnode指的是组件本身的虚拟节点，_vnode指的是渲染的虚拟节点
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        let record = records[depth]
        if(!record) return h()
        return h(record.component, data)
    }
}

// <my></my> {type:{name:'vue-component-1-my'}} $vnode  vue3改成了 _vnode

// <div></div> {type:'div',{},null} _vnode vue3改成了subTree

