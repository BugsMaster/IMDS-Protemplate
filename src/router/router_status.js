import Invalid from 'views/Status/401'
import Notfound from 'views/Status/404'
export default [
    {
        name: '401',
        path: '/401',
        component: Invalid,
        meta: {single: true},
    },{
        name: '404',
        path: '/404',
        component: Notfound,
        meta: {single: true},
    },
]
