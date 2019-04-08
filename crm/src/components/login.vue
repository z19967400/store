<template>
  <div class="login">
  	<el-form  label-position="left" label-width="0px" class="demo-ruleForm login-container">
	    <h3 class="title">系统登录</h3>
	    <el-form-item prop="account">
	      <el-input type="text" v-model="form.account" auto-complete="off" placeholder="账号"></el-input>
	    </el-form-item>
	    <el-form-item prop="checkPass">
	      <el-input type="password" v-model="form.password" auto-complete="off" placeholder="密码"></el-input>
	    </el-form-item>
	    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
	    <el-form-item style="width:100%;">
	      <el-button type="primary" @click="login" :loading="logining" style="width:100%;">登录</el-button>
	    </el-form-item>
	  </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      	logining: false,
				form:{
					account:"",
					password:""	
				},
				checked :true
      };
    },
    methods: {
      login() {
      	if (this.form.account == '') {
      		this.$alert('请输入账号', '登录失败', {
	        	confirmButtonText: '确定',	       		
	        });
	        return false;
      	}
      	if (this.form.password == '') {
      		this.$alert('请输入密码', '登录失败', {
	        	confirmButtonText: '确定',	       		
	        });
	        return false;
      	}
      	let loginParams = { username: this.form.account, password: this.form.password };
      	this.logining = true;
      	this.$api.requestLogin(loginParams).then((response) => {
	    		if (response.status === 200) {
        		this.logining = false;
            this.$router.push({ path: '/Home' });
            this.$store.commit('LOGING',response.data)
            this.$message({
              type: 'success',
              message: '登录成功'
            });
	    		} else{
	    			this.$alert('账号密码不正确', '登录失败', {
		        	confirmButtonText: '确定',
		        	callback: action => {
		        		this.logining = false;
			        }
		       	}); 
	    		}
				}, (response) => {
			    this.$alert('网络错误，请重试', '登录失败', {
	        	confirmButtonText: '确定',
	        	callback: action => {
	        		this.logining = false;
		        }
	       	}); 
				});
      }
    }
  }

</script>

<style lang="scss" scoped>
	.login{
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