import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//const store =({
//	state: {
//		userInfo:[{
//			userName : '',
//			userId : ''
//		}]
//	},
//	mutations: {
//	    SETUSERINFO(state,data) {
//	      state.userInfo.userName = data.user_name;
//	      state.userInfo.userId = data.user_id
//	    }
//	},
//	getters:{
//		
//	}
//})
	const state = {
		userInfo:[{
			userName : '',
			userId : '',
			weixin:''
		}]
	}
	const mutations = {
//		登录状态保存
		LOGING(state,data) {
	      	state.userInfo.userName = data.name;
	      	state.userInfo.userId = data.user_id;
	      	state.userInfo.weixin = data.weixin;
	      	sessionStorage.setItem("userInfo", JSON.stringify(data));  //添加到sessionStorage
        	sessionStorage.setItem("isLogin",true);
	   	},
	   	//退出登录
		SIGNOUT(state){
			sessionStorage.removeItem("userInfo");  //移除sessionStorage
	        sessionStorage.removeItem("isLogin");
	       	state.userInfo.userName = '';
	      	state.userInfo.userId = '';
		},
		//登录状态更新
		SETUSER(state,userInfo){
			let reg = new RegExp('"',"g");
			let user = userInfo.slice(1,-1).replace(reg,"").replace('name:',"").replace('weixin:',"").replace('user_id:',"").split(',')
			state.userInfo.userName = user[1];
	      	state.userInfo.userId = user[0];
	      	state.userInfo.weixin = user[2];
	      	sessionStorage.setItem("isLogin",true);
		}
	}

export default new Vuex.Store({
	state,
	mutations
})
