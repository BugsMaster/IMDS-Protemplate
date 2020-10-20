import Menumanagment from 'views/System/Menumanagment'
import Permissionmanagment from 'views/System/Permissionmanagment'
import Rolemanagment from 'views/System/Rolemanagment'
import Rolepermission from 'views/System/Rolepermission'
import Organizationmanagment from 'views/System/Organizationmanagment'
import Groupmanagment from 'views/System/Groupmanagment'
import Usermanagment from 'views/System/Usermanagment'
import Systemsetting from 'views/System/Systemsetting'


export default [
     // 重定向
    {
        path: "/system/system",
        redirect: to => {
            console.log(this.$router)
           return ;
        }
    },
    {
        name: 'systemsetting',
        path: '/system/systemsetting',
        component: Systemsetting,
        meta: {single: false},
    },
    {
        name: 'menumanagment',
        path: '/system/menumanagment',
        component: Menumanagment,
        meta: {single: false},
    },
    {
        name: 'permissionmanagment',
        path: '/system/permissionmanagment',
        component: Permissionmanagment,
        meta: {single: false},
    },
    {
        name: 'rolemanagment',
        path: '/system/rolemanagment',
        component: Rolemanagment,
        meta: {single: false},
    },
    {
        name: 'rolepermission',
        path: '/system/rolepermission',
        component: Rolepermission,
        meta: {single: false},
    },
    {
        name: 'organizationmanagment',
        path: '/system/organizationmanagment',
        component: Organizationmanagment,
        meta: {single: false},
    },
    {
        name: 'groupmanagment',
        path: '/system/groupmanagment',
        component: Groupmanagment,
        meta: {single: false},
    },
    {
        name: 'usermanagment',
        path: '/system/usermanagment',
        component: Usermanagment,
        meta: {single: false},
    },
]
