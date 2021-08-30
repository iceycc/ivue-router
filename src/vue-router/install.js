import RouterLink from './components/router-link'
import RouterView from './components/router-view'

export let _Vue; // 导出的是那个接口，会动态变化。。

export function install(Vue, options) {
    // Vue通过用户传入，不用管具体版本，都是用户控制
    // console.log(Vue, options)
    _Vue = Vue;
    // 我需要将当前的根实例的提供的router属性共享给所有子组件。
    // Vue.prototype.router // 这样会导致所有该Vue的实例都会有。
    // 所有子组件初始化的时候，都会调用vue.extend Vue.options
    Vue.mixin({
        beforeCreate() {
            // console.log(this.$options)
            // 所有子组件的this._routerRoot会共享同一个根组件的routerRoot
            if (this.$options.router) {

                // 根实例
                this._routerRoot = this // 吧根实例挂载到_routerRouter上
                // 根实例 -》父亲 -》儿子 -》 孙子
                this._router = this.$options.router; // 这个就是new Vue({router:new VueRouter({}) }) 传入的这个VueRouter的实例
                this._router.init(this); // 这里this指向的就是根实例
                // 将router实例的current属性对象，（表示当时路由的pathMap）定义为响应式，为了达到router改变的时候可以触发渲染视图
                Vue.util.defineReactive(this, '_route', this._router.history.current)
                console.log('this._router.history.current', this._router.history.current)
            } else {
                // this._routerRoot指向了当前根组件的实例
                // lifecycleMixin构建父子关系
                this._routerRoot = this.$parent && this.$parent._routerRoot;
                // this._routerRoot._router
            }
        }
    })

    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route;
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router;
        }
    })

}

// 错误写法：
// export {
//     a:1,
//     b:2,
//     c:3
// }
//

// 正确 导出的接口，接口值变化，导入端也会变化
// let a=1,b=2,c=3; // 这里修改，导出端也会变化
// export {
//     a,
//     b,
//     c
//     // c:c 错误语法
// }

// 正确，导出的一个对象，
export default {
    a: 1,
    b: 2,
    c: 3
}

