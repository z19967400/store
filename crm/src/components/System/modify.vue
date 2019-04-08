<template>
	<div class="login">
		<el-form label-position="left" label-width="0px" class="demo-ruleForm login-container">
			<h3 class="title">修改密码</h3>
			<el-form-item prop="account">
				<el-input type="text" v-model="form.qriginalPassword" auto-complete="off" placeholder="原始密码"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="form.newPassword" auto-complete="off" placeholder="输入新密码"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" v-model="form.confirmPassword" auto-complete="off" placeholder="确认新密码"></el-input>
			</el-form-item>
			<!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
			<el-form-item style="width:100%;">
				<el-button type="primary" @click="modify" :loading="logining" style="width:100%;">修改密码</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				logining: false,
				form: {
					qriginalPassword: "",
					newPassword: "",
					confirmPassword: ''
				},
				checked: true
			};
		},
		methods: {
			modify() {
				if(this.form.qriginalPassword == '') {
					this.$alert('请输入原始密码', '修改失败', {
						confirmButtonText: '确定',
					});
					return false;
				}
				if(this.form.newPassword == '') {
					this.$alert('请输入新密码', '修改失败', {
						confirmButtonText: '确定',
					});
					return false;
				}
				if(this.form.confirmPassword == '') {
					this.$alert('请确认新密码', '修改失败', {
						confirmButtonText: '确定',
					});
					return false;
				}
				if(this.form.newPassword != this.form.confirmPassword) {
					this.$alert('两次输入密码不一致', '修改失败', {
						confirmButtonText: '确定',
					});
					return false;
				}
				let modifyParams = {
					oldPassword: this.form.qriginalPassword,
					newPassword: this.form.newPassword,
					user_id:this.$store.state.userInfo.userId
				};
				this.logining = true;
				this.$api.editPassword(modifyParams).then((req)=>{
					if (req.status == 200) {
						this.$message({
							type:'success',
							message:req.message
						})
					} else{
						this.$message({
							type:'info',
							message:req.message
						})
					}
					this.logining = false;
				},(res)=>{
					this.$message({
						type:'info',
						message:'网络错误'
					})
					this.logining = false;	
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		.login-container {
			/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
			-webkit-border-radius: 5px;
			border-radius: 5px;
			-moz-border-radius: 5px;
			background-clip: padding-box;
			margin: 180px auto;
			width: 350px;
			padding: 35px 35px 15px 35px;
			background: #fff;
			border: 1px solid #eaeaea;
			box-shadow: 0 0 25px #cac6c6;
			.title {
				margin: 0px auto 40px auto;
				text-align: center;
				color: #505458;
			}
			.remember {
				margin: 0px 0px 35px 0px;
			}
		}
	}
</style>