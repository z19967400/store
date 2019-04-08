<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="query">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :highlight-current-row="false" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="username" label="工号" width="120" sortable>
			</el-table-column>
			<el-table-column prop="date" label="创建时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="groupid" label="角色权限" width="120" sortable>
			</el-table-column>
			<el-table-column prop="weixin" label="绑定微信" width="120" sortable>
			</el-table-column>
			<el-table-column prop="cateid" label="所属分组" width="" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :background="true" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="checkPass">
					<el-input type="password" v-model="editForm.pass" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="工号" prop="checkPass">
					<el-input type="password" v-model="editForm.jobNumber" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="绑定微信" prop="checkPass">
					<el-input type="text" v-model="editForm.weixin" auto-complete="off"></el-input>
				</el-form-item>
				</el-table-column>
				<el-form-item label="权限角色">
					<el-select v-model="editForm.juris" placeholder="请选择权限角色">
						<el-option label="权限角色1" value="1"></el-option>
						<el-option label="权限角色2" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属组别">
					<el-select v-model="editForm.cateid" placeholder="请选择权限角色">
						<el-option label="1组" value="1"></el-option>
						<el-option label="2组" value="2"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>		
	</section>
</template>

<script>
	import util from '../../util/util'
	//import NProgress from 'nprogress'
//	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					pass: '',
					jobNumber: '',
					juris:'',
					weixin:'',
					cateid:''
				},
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				console.log(val)
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				this.listLoading = true,
				this.$api.getUsers().then((req)=>{
//					req.forEach(item =>{
//						item.date = (!item.date || item.date == '') ? '' : util.formatDate.format(new Date(item.date), 'yyyy-MM-dd');						
//					});
					this.users = req;
					this.listLoading = false
				},(res)=>{
					this.$message({
						type:'info',
						message:'获取失败'
					})
				})	
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '放弃'
		        }).then(() => {
		          	this.listLoading = true;
					let para = { id: row.id };	        		
	        		this.$api.deleteUser(para).then((req)=>{
	        			console.log(req)
	        			if(req.status == 200){
	        				this.users.forEach(item =>{
			        			if (item.id == para.id) {
			        				this.users.splice(index, 1)
			        			}
			        		});
			        		this.listLoading = true;
	        				this.$message({
				              type: 'success',
				              message: req.message
				            })
	        			}else{
	        				this.listLoading = true;
	        				this.$message({
				              type: 'info',
				              message: req.message
				            })
	        			}
	        		},(res)=>{
	        			this.listLoading = true;
	        			this.$message({
			              type: 'info',
			              message: '网络错误'
			            })
	        		})
				}).catch(action => {
		            this.$message({
		              type: 'info',
		              message: action === 'cancel'
		                ? '取消删除'
		                : '放弃删除'
		            })			          
	        	});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = {
					id: row.id,
					name: row.name,
					pass: row.userpass,
					jobNumber: row.username,
					juris:row.groupid,
					weixin:row.weixin,
					cateid:row.cateid
				}
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							let para = Object.assign({}, this.editForm);
//							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							this.$api.editUser(para).then((req)=>{
								if (req.status == 200) {
									this.editFormVisible = false;
									this.$message({
										type: 'success',
					              		message: req.message					              		
									});
									this.getUsers();
								} else{
									this.$message({
										type: 'info',
					              		message: req.message
									})
								}
								this.editLoading = false;
							},(res)=>{
								this.editLoading = false;
								this.$message({
					              type: 'info',
					              message: '网络错误'
					            })
								console.log(res)
							})
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {			
				var ids = this.sels.map(item => item.id).toString();
	        	this.$confirm('确认删除所选记录吗？', '确认信息', {
		          distinguishCancelAndClose: true,
		          confirmButtonText: '确定',
		          cancelButtonText: '放弃'
		        }).then(() => {
		        	this.listLoading = true;
		        	this.$api.deleteAllusers(ids).then((req)=>{		        		
		        		if(req.status == 200){
		        			this.listLoading = false;
		        			this.$message({
				              	type: 'success',
				              	message: req.message
				            });
				            this.users = this.users.filter(i => !ids.includes(i.id));
		        		}else{
		        			this.listLoading = false;
		        			this.$message({
				              	type: 'success',
				              	message: req.message
				            });
		        		}
		        	},(res)=>{
		        		this.$message({
			              	type: 'info',
			              	message: '网络错误'
			            });
		        	})
	          	}).catch(action => {
		            this.$message({
		              type: 'info',
		              message: action === 'cancel'
		                ? '取消删除'
		                : '放弃删除'
		            })			          
	        	});
			},
			query:function(){
				let name = this.filters.name;
				this.listLoading = true;
				if (name == '') {
					this.getUsers();
				} else{
//					es6 filter过滤匹配，有则返回当前，无则返回所有
		        	this.users = this.users.filter(e => Object.keys(e).some(key => e[key].match(name)));
		        	this.listLoading = false;
				}
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>

</style>