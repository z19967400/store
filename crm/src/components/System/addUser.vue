<template>
	<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		<el-form-item label="姓名" prop="name">
			<el-input v-model.number="ruleForm2.name"></el-input>
		</el-form-item>
		<el-form-item label="工号" prop="jobNumber">
			<el-input v-model.number="ruleForm2.jobNumber" auto-complete="off"></el-input>
		</el-form-item>	
		<el-form-item label="密码" prop="pass">
			<el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
		</el-form-item>			
		<el-form-item label="微信号" prop="weixin">
			<el-input v-model.number="ruleForm2.weixin"></el-input>
		</el-form-item>
		<el-form-item label="权限角色">
			<el-select v-model="ruleForm2.juris" placeholder="请选择权限角色">
				<el-option label="权限角色1" value="1"></el-option>
				<el-option label="权限角色2" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="选择分组">
			<el-select v-model="ruleForm2.cateid" placeholder="请选择组别">
				<el-option label="1组" value="1"></el-option>
				<el-option label="2组" value="2"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm2')" :loading="logining">提交</el-button>
			<el-button @click="resetForm('ruleForm2')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			var validateNumber = (rule, value, callback) => {
				if(!value) {
					return callback(new Error('工号不能为空'));
				}
				setTimeout(() => {
					if(!Number.isInteger(value)) {
						callback(new Error('请输入数字值'));
					} else {
						if(value < 5) {
							callback(new Error('必须大于五位数'));
						} else {
							callback();
						}
					}
				}, 1000);
			};
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm2.checkPass !== '') {
						this.$refs.ruleForm2.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm2.pass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatename = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入姓名'));
				} else {
					callback();
				}
			};
			return {
				logining: false,
				ruleForm2: {
					pass: '',
					checkPass: '',
					jobNumber: '',
					name:'',
					juris:'',
					cateid:'',
					weixin:''
				},
				rules2: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					checkPass: [{
						validator: validatePass2,
						trigger: 'blur'
					}],
					jobNumber: [{
						validator: validateNumber,
						trigger: 'blur'
					}],
					name: [{
						validator: validatename,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.loading = true; 
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let form = this.ruleForm2;
						this.$api.requestAdd(form).then((req)=>{
							this.loading= false; 
							this.$message({
								type:'success',
								message:"注册成功"
							});
							this.ruleForm2 = {
								pass: '',
								checkPass: '',
								jobNumber: '',
								name:'',
								juris:'',
								cateid:'',
								weixin:''
							}
						},(res)=>{
							this.loading= false; 
							this.$message({
								type:'info',
								message:res.message
							})
						})
					} else {
						this.loading = false; 
						this.$message({
							type:'info',
							message:"网络错误"
						})
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo-ruleForm{
		width: 50%;
		margin: 0 auto;
	}
</style>