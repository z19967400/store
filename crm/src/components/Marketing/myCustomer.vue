<template>
	<section>
		<!--工具条-->
		<query prop="this.users"></query>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :highlight-current-row="false" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" sortable>
			</el-table-column>
			<el-table-column prop="add_fans_date" label="加粉日期" width="120" sortable>
			</el-table-column>
			<el-table-column prop="phone" label="电话" width="120" sortable>
			</el-table-column>
			<el-table-column prop="weixin" label="微信" width="120" sortable>
			</el-table-column>
			<el-table-column prop="region" label="地址" min-width="" sortable>
			</el-table-column>
			<el-table-column label="操作" width="250">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="small" @click="handleSingle(scope.$index, scope.row)">下单</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="编辑" :visible.sync="editFormVisible" :modal="false">
			<el-form :model="edit" label-width="80px" ref="edit">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="edit.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="edit.phone" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="微信" prop="weixin">
					<el-input v-model="edit.weixin" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="加粉日期">
					<el-date-picker type="date" format="timestamp" value-format="timestamp" placeholder="选择日期" v-model="edit.add_fans_date"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="edit.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>
		<el-dialog title="下单" :visible.sync="singleForm" :modal="false" >
			<el-form :model="order" label-width="80px" :inline="true"  :rules='orderRules' ref="order">
				<el-form-item  label="商品" prop="list" >
					<div v-for="(item,index) in order.list" :key="index">
						<el-input style="width: 100px;" v-model="item.kh" size="mini" placeholder="请输入款号" >
						</el-input>
						<el-input style="width: 200px;" v-model="item.mz" size="mini" placeholder="请输入内容">
						</el-input>
						<el-input style="width: 100px;" v-model="item.dj" size="mini" placeholder="请输入单价">
						</el-input>
						<el-input style="width: 100px;" v-model="item.shu" size="mini" placeholder="请输入数量">
						</el-input>
						<el-button size="mini"   @click.native="remList(index)">删除</el-button>
					</div>	
				</el-form-item>
				<el-button size="mini" type="primary" @click.native="addList">增加</el-button>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="singleForm = false">取消</el-button>
				<el-button type="primary" @click.native="Single">提交</el-button>
			</div>
		</el-dialog>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :background="true" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../util/util'
	import query from '../children/query'
	export default {
		data() {
			return {
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				editFormVisible: false,
				singleForm: false,
				sels: [], //列表选中列
				edit: {
					address: "",
					id: "",
					name: "",
					phone: "",
					weixin: "",
				}, //编辑项
				order: {
					id:"",
					list:[{
						kh:'',
						mz:'',
						dj:'',
						shu:''
					}]
				},
				orderRules: {
					list: [{
						required: true,
						message: '请输入商品信息',
						trigger: 'blur'
					}]
				},
			}
		},
		components: {
			query
		},
		methods: {
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUsers() {
				this.listLoading = true;
				let para = {
					page: this.page,
					id: this.$store.state.userInfo.userId
				};
				this.$api.getMycustomer().then((req) => {
					if(req.status == 200) {
						this.users = req.data
					} else {
						this.$message({
							type: "success",
							message: res.message
						})
					}
					this.listLoading = false;
				}, (res) => {
					this.$message({
						type: "info",
						message: "网络错误"
					})
					this.listLoading = false;
				})
			},
			//编辑
			handleEdit: function(index, row) {
				this.edit = Object.assign({}, row);
				this.editFormVisible = true;
			},
			//提交编辑后的数据
			editSubmit: function() {
				this.$confirm('确认提交吗？', '提示', {}).then(() => {
					let para = Object.assign({}, this.edit);
					this.$api.orderEdit((para)).then((req) => {
						if(req.status == 200) {
							this.$message({
								type: 'success',
								message: req.message
							});
							this.editFormVisible = false;
						} else {
							this.$message({
								type: 'info',
								message: req.message
							});
						}
					}, (res) => {
						this.$message({
							type: 'info',
							message: "网络错误"
						})
					})
				}).catch(action => {
					this.$message({
						type: 'info',
						message: "取消操作"
					})
				})

			},
			handleCurrentChange(val) {
				this.page = val;
				console.log(val)
				this.getUsers();
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗？', '提示', {}).then(() => {
					this.listLoading = true;
					let para = {
						id: row.id
					};
					this.$api.deleteOrder(para).then((req) => {
						if(req.status == 200) {
							this.users.forEach(item => {
								if(item.id == para.id) {
									this.users.splice(index, 1)
								}
							})
							this.$message({
								type: 'success',
								message: req.message
							});
						} else {
							this.$message({
								type: 'info',
								message: req.message
							})
						}
						this.listLoading = false;
					}, (res) => {
						this.listLoading = false;
						this.$message({
							type: 'info',
							message: '网络错误'
						})
					})
				}).catch(action => {
					this.$message({
						type: 'info',
						message: action === 'cancel' ?
							'取消删除' :
							'放弃删除'
					})
				});
			},
			//现实下单界面
			handleSingle: function(index,row) {
				this.singleForm = true;
				this.order.id = row.id;
			},
			//下单界面增加商品行
			addList: function() {
				let add = {
					kh:'',
					mz:'',
					dj:'',
					shu:''
				};
				this.order.list.push(add)
			},
			//删除下单界面当前行
			remList: function(index) {			
				for (let i=0; i < this.order.list.length;i++) {
					if (i == index) {
						this.order.list.splice(index, 1)
					}
				}
			},
			//给客户下单
			Single: function() {
				this.$confirm('确定下单？', "提示", {}).then(() => {
					let pare = Object.assign({},this.order);
					console.log(pare);
				}).catch(()=>{
					this.$message({
						type: 'info',
						message: '取消操作'
					})
				})
			},
			//列表选中方法
			selsChange: function(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除所选记录吗？', '提示', {}).then(() => {
					this.listLoading = true;
					this.$api.deleteAllorder(ids).then((req) => {
						if(req.status == 200) {
							this.users = this.users.filter(i => !ids.includes(i.id));
							this.$message({
								type: 'success',
								message: req.message
							});
						} else {
							this.$message({
								type: 'info',
								message: req.message
							})
						}
						this.listLoading = false;
					}, (res) => {
						this.listLoading = false;
						this.$message({
							type: 'info',
							message: '网络错误'
						})
					})
				}).catch(action => {
					this.$message({
						type: 'info',
						message: action === 'cancel' ?
							'取消删除' :
							'放弃删除'
					})
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}
</script>

<style scoped>
	
</style>