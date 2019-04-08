<template>
	<div class="index">
		<el-container>
			<!--顶部导航-->
			<el-header>
				<el-col :span="6" class="logo">
					<img src="../assets/logo2.png" />
					<h2>格行教育CRM系统</h2>
				</el-col>
				<el-col :span="6" class="userinfo">
					<el-dropdown>
						<i class="el-icon-info" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<router-link to="/Home/System/modify">
								<el-dropdown-item>修改密码</el-dropdown-item>
							</router-link>
							<el-dropdown-item @click.native="signOut()">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>{{getUserInfo}}</span>
				</el-col>
			</el-header>
		</el-container>

		<el-container class="content">
			<!--左侧边栏-->
			<el-aside width="200px" id="aside" style="background-color: rgb(238, 241, 246)">
				<el-menu :default-openeds="[this.index]" @open="handleopen" @close="handleclose" @select="handleselect">
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-setting"></i>系统设置</template>
						<el-menu-item-group>
							<router-link to="/Home/System/Jurisdiction">
								<el-menu-item index="1-1">权限管理</el-menu-item>
							</router-link>
							<router-link to="/Home/System/user">
								<el-menu-item index="1-2">用户管理</el-menu-item>
							</router-link>
							<router-link to="/Home/System/modify">
								<el-menu-item index="1-3">修改密码</el-menu-item>
							</router-link>
							<router-link to="/Home/System/addUser">
								<el-menu-item index="1-4">创建用户</el-menu-item>
							</router-link>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>营销中心</template>
						<el-menu-item-group>
							<template slot="title">客户管理</template>
							<router-link to="/Home/Marketing/Create">
								<el-menu-item index="2-1">新建客户资料</el-menu-item>
							</router-link>
							<router-link to="/Home/Marketing/myCustomer">
								<el-menu-item index="2-2">我的客户列表</el-menu-item>
							</router-link>
						</el-menu-item-group>
						<el-menu-item-group title="产品管理">
							<router-link to="/Home/Marketing/goodsAdd">
								<el-menu-item index="2-3">添加新产品</el-menu-item>
							</router-link>
							<router-link to="/Home/Marketing/goodsList">
								<el-menu-item index="2-4">产品列表</el-menu-item>
							</router-link>
						</el-menu-item-group>		
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>数据可视化</template>
						<el-menu-item-group>
							<router-link to="/Home/index">
								<el-menu-item index="3-1">统计图表</el-menu-item>
							</router-link>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<!--主视图区域-->
			<el-main>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>
						<a href="/">活动管理</a>
					</el-breadcrumb-item>
					<el-breadcrumb-item >活动列表</el-breadcrumb-item>
					<el-breadcrumb-item>活动详情</el-breadcrumb-item>
				</el-breadcrumb>
				<transition name="transition" mode="out-in">
					<router-view></router-view>
				</transition>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'index',
		data() {
			return {
				index:'1'
			}
		},
		mounted() {
			var aside = document.getElementById('aside');
			aside.onmouseover = function() {
				aside.style.overflowY = "auto";
				return false;
			};
			aside.onmouseout = function() {
				aside.style.overflowY = "hidden";
				return false;
			};
		},
		methods: {
			signOut() {
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.$store.commit('SIGNOUT');
					this.$router.push({
						path: '/'
					})
					history.pushState(null, null, location.href)
					this.$message({
						message: '退出成功',
						type: 'success'
					});
				}).catch(() => {

				});
			},
			handleopen(index,indexPath) {
				this.index = index
			},
			handleclose() {
				console.log('handleclose');
			},
			handleselect: function (index, indexPath) {
				
			},
		},
		computed: {
			getUserInfo() {
				let userInfo = sessionStorage.getItem('userInfo')
				if(this.$store.state.userInfo[0].userId == '') {
					this.$store.commit('SETUSER', userInfo) //同步操作
				}
				return this.$store.state.userInfo.userName
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
	.index {
		header {
			line-height: 60px;
			border-bottom: 1px solid #e6e6e6;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			background-color: #242F42;
			color: white;
			.logo {
				h2 {
					display: inline-block;
					font-size: 1em;
					font-weight: normal;
					text-align: center;
					margin: 0 0 0 15px;
				}
				img {
					float: left;
					width: 50px;
					margin-top: 5px;
				}
			}
			.userinfo {
				text-align: right;
			}
		}
		.content {
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			z-index: -1;
			padding-top: 60px;
			min-width: 1200px;
		}
		aside {
			z-index: 4;
			background-color: #EEF1F6;
			.el-menu {
				background-color: #EEF1F6;
			}
		}
		main {
			overflow-x: hidden;
			background-color: white;
			.el-breadcrumb {
				margin-bottom: 20px;
			}
		}
	}
	
	.transition-enter-active,
	.transition-leave-active {
		transition: all 0.5s ease;
	}
	
	.transition-enter {
		opacity: 0;
		transform: translateX(100%);
	}
	
	.transition-leave-to {
		z-index: 3;
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
</style>