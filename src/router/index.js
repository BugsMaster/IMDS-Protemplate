import Vue from "vue";
import Router from "vue-router";
import systemRouter from 'router/router_system'
import statusRouter from 'router/router_status'

import Login from 'views/Login'
import Mycenter from 'views/Mycenter'
import Home from 'views/Home/Home'
import GisMap from 'views/Home/GisMap'
import Visualization from 'views/Home/Visualization'
// ====忽略========================
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(Router);

const router = new Router({
    // history 模式，需要服务器后端配合做路由代理，将所有的前端路由同步代理到 /
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {
            x: 0,
            y: 0
        };
    },
    routes: [
        // 公共路由写在这里，其他抽离
        {
          path: "*",
          redirect: to => {
            return { name: "404" };
          }
        },
        {
          path: "/",
          redirect: to => {
            return { name: "home" };
          }
        },
        {
          path: "/login",
          name: "login",
          component: Login,
          meta: {single: true},
        },
        {
          path: "/mycenter",
          name: "mycenter",
          component: Mycenter,
          meta: {single: false},
        },
        {
          path: "/visualization",
          name: "visualization",
          component: Visualization,
          meta: {single: true},
        },
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: {single: true},
        },
        {
          path: "/gismap",
          name: "gismap",
          component: GisMap,
          meta: {single: true},
        },
           //system
           ...systemRouter,
           //status
           ...statusRouter
    ]
});


// 全局路由守卫
// router.beforeEach((to, from, next) => {
//     if(Ticket.get()){
//         if(to.name === 'login'){
//             router.push({ name: 'home' });
//         }
//     }else{
//         // if(to.name !== 'login'){
//         //     router.push({ name: 'login' });
//         // }
//     }
//     next();
// });
  
export default router;
