<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="客户姓名" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item label="性别" prop="gender">
			<el-radio-group v-model="ruleForm.gender">
				<el-radio label="男"></el-radio>
				<el-radio label="女"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="电话" prop="phone">
			<el-input v-model="ruleForm.phone"></el-input>
		</el-form-item>
		<el-form-item label="微信" prop="weixin">
			<el-input v-model="ruleForm.weixin"></el-input>
		</el-form-item>
		<el-form-item label="QQ" prop="QQ">
			<el-input v-model="ruleForm.QQ"></el-input>
		</el-form-item>
		<el-form-item label="邮箱" prop="mailbox">
			<el-input v-model="ruleForm.mailbox"></el-input>
		</el-form-item>
		<el-form-item label="加粉日期" required>
			<el-col :span="11">
				<el-form-item prop="date">
					<el-date-picker
				      v-model="ruleForm.date"
				      type="date"
				      value-format="timestamp"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
			</el-col>			
		</el-form-item>
		<el-form-item label="选择地区" prop="region" required>
			<el-cascader :options="options" v-model="ruleForm.region"></el-cascader>
		</el-form-item>
		<el-form-item label="详细地址" prop="desc">
			<el-input type="textarea" v-model="ruleForm.desc"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
					ruleForm: {
						name: '',
						phone: '',
						date: '',
						region:[],
						weixin:'',
						QQ: '',
						mailbox: '',
						desc:'',	
						gender:'',
						id:this.$store.state.userInfo.userId
					},
					rules: {
						name: [{
								required: true,
								message: '请输入客户名称',
								trigger: 'blur'
							},
							{
								min: 3,
								max: 5,
								message: '长度在 3 到 5 个字符',
								trigger: 'blur'
							}
						],
						region: [{
							required: true,
							message: '请选择区域',
							trigger: 'change'
						}],
						date: [{
							type: 'date',
							required: true,
							message: '请选择日期',
							trigger: 'change'
						}],
						phone:{
							required: true,
							message: '请输入客户电话',
							trigger: 'blur'
						},
						phone:{
							required: true,
							message: '请输入客户电话',
							trigger: 'blur'
						},
						weixin:{
							required: true,
							message: '请输入客户微信',
							trigger: 'blur'
						},
						QQ:{
							required: true,
							message: '请输入客户QQ',
							trigger: 'blur'
						},
						mailbox:{
							required: true,
							message: '请输入客户邮箱',
							trigger: 'blur'
						},
						desc:{
							required: true,
							message: '请输入详细地址',
							trigger: 'blur'
						}
					},
					options: [{
						value: 'zhinan',
						label: '指南',
						children: [{
							value: 'shejiyuanze',
							label: '设计原则',
							children: [{
								value: 'yizhi',
								label: '一致'
							}, {
								value: 'fankui',
								label: '反馈'
							}, {
								value: 'xiaolv',
								label: '效率'
							}, {
								value: 'kekong',
								label: '可控'
							}]
						}, {
							value: 'daohang',
							label: '导航',
							children: [{
								value: 'cexiangdaohang',
								label: '侧向导航'
							}, {
								value: 'dingbudaohang',
								label: '顶部导航'
							}]
						}]
					}]				
				}
			},
			methods: {
				submitForm(formName) {
					this.$refs[formName].validate((valid) => {
						if(valid) {
							let pare = this.ruleForm;		
							this.$api.createCustomer(pare).then((req)=>{							
								if (req.status == 200) {
									console.log(req)
									this.$message({
										type:"success",
										message:req.message
									})
								} else{
									this.$message({
										type:"info",
										message:req.message
									})
								}
							},(res)=>{
								this.$message({
									type:"info",
									message:res.message
								})
							})
					} else {						
						this.$message({
							type:"info",
							message:"请完善表单"
						})
					}
				})				
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},

		}
	}
</script>

<style scoped="scoped">
	form{
		width: 60%;
		margin: 0 auto;
	}
</style>