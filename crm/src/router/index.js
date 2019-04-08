import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import login from '@/components/login'
import index from '@/components/children/index'
import table from '@/components/children/table'
import Jurisdiction from '@/components/System/Jurisdiction'
import user from '@/components/System/user'
import addJuris from '@/components/System/addJuris'
import modify from '@/components/System/modify'
import addUser from '@/components/System/addUser'
import Create from '@/components/Marketing/Create'
import myCustomer from '@/components/Marketing/myCustomer'
import goodsAdd from '@/components/Marketing/goodsAdd'
import goodsList from '@/components/Marketing/goodsList'
Vue.use(Router)

export default new Router({
	mode: 'history',  //去掉url中的#
  routes: [
	{
	  	path:'/',
	  	redirect:'/login'
	},
//	一级路由
    {
      	path: '/Home',
	    name: '主页',
	    component: Home,
	    children:[
	      	{path:'/Home',	redirect:'/Home/index'},
	      	{path: '/Home/index',name:'首页',component:index},
	      	{path: '/Home/table',name:'表格',component:table},   
      	]
    },
//  系统设置
    {
      	path: '/Home/System',
	    name: '系统设置',
	    component: Home,
	    children:[
	      	{path: '/Home/System/Jurisdiction',name:'权限管理',component:Jurisdiction},
	      	{path: '/Home/System/user',name:'用户管理',component:user},
	      	{path: '/Home/System/addJuris',name:'新增权限',component:addJuris},
	      	{path: '/Home/System/modify',name:'修改密码',component:modify},
	      	{path: '/Home/System/addUser',name:'创建用户',component:addUser},
      	]
    },
// 营销中心    
    {
      	path: '/Home/Marketing',
	    name: '营销中心',
	    component: Home,
	    children:[
	      	{path: '/Home/Marketing/Create',name:'创建新客户',component:Create},
	      	{path: '/Home/Marketing/myCustomer',name:'我的客户列表',component:myCustomer},
	      	{path: '/Home/Marketing/goodsAdd',name:'添加新产品',component:goodsAdd},
	      	{path: '/Home/Marketing/goodsList',name:'产品列表',component:goodsList},
      	]
    },
    {
	    path: '/login',
	    name: '登录',
	    component: login
    }
  ]
})
