import {getHttp, postHttp} from './Http.js'

let base = 'http://www.surryn.top/k9/index.php?s=/';

export function getUserInfo(userId) {
  let url = 'app/user/{user_id}'
  let params = {
    user_id: userId,
  }
  return getHttp(url, params)
}
/* 系统功能 */

//登陆接口
export function requestLogin(params) {let url = base + 'Admin/Manage/login';return postHttp(url, params)}

//创建新用户
export function requestAdd(params) {let url = base + 'Admin/Manage/add_user';return postHttp(url, params)}

//获取用户列表
export function getUsers(params) {let url = base + 'Admin/Manage/user_list';return postHttp(url, params)}

//删除用户
export function deleteUser(params) {let url = base + 'Admin/Manage/delete_user';return postHttp(url, params)}

//批量删除用户
export function deleteAllusers(params) {let url = base + 'Admin/Manage/delete_all';return postHttp(url, params)}

//编辑用户
export function editUser(params) {let url = base + 'Admin/Manage/edit_user';return postHttp(url, params)}

//修改密码
export function editPassword(params) {let url = base + 'Admin/Manage/edit_password';return postHttp(url, params)}

/* 营销功能 */

/* ----------客户管理----------- */

//创建客户信息
export function createCustomer(params) {let url = base + 'Admin/Order/order_add';return postHttp(url, params)}

//获取我的客户列表
export function getMycustomer(params) {let url = base + 'Admin/Order/order_list';return postHttp(url, params)}

//修改我的客户列表

export function orderEdit(params) {let url = base + 'Admin/Order/order_edit';return postHttp(url, params)}

//删除我的客户列表

export function deleteOrder(params) {let url = base + 'Admin/Order/delete_order';return postHttp(url, params)}

//批量删除我的客户列表

export function deleteAllorder(params) {let url = base + 'Admin/Order/delete_all_order';return postHttp(url, params)}

/* ----------产品管理----------- */

//添加新产品

export function goodsAadd(params) {let url = base + 'Admin/Goods/goods_add';return postHttp(url, params)}

//获取产品列表

export function getGoodslist(params) {let url = base + 'Admin/Goods/goods_list';return postHttp(url, params)}

//删除产品

export function deleteGoods (params) {let url = base + 'Admin/Goods/delete_goods';return postHttp(url, params)}

//编辑产品

export function goodsEdit (params) {let url = base + 'Admin/Goods/goods_edit';return postHttp(url, params)}

//批量删除

export function  deleteAllgoods (params) {let url = base + 'Admin/Goods/ delete_all_goods';return postHttp(url, params)}