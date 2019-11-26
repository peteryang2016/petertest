import Home from './Home'
import First from './First'
import Three from './Three'
const routerConfig =[
    {
        name: '首页',
        path: '/',
        icon: 'pie-chart',
        component: Home
    },
    {
        name: '用户管理',
        path:'/user',
        icon: 'user',
        children: [
            {
                name: '个人设置',
                path: '/user/first',
                component: First
            }
        ]
    },
    {
        name: '商场管理',
        path:'/shop',
        icon: '',
        children: [
            {
                name: '订单管理',
                path: '/shop/three',
                component: Three
            }
        ]
    }
]
export default  routerConfig
