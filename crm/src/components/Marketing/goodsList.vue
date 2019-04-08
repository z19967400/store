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
		<el-table :data="goodlist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" :highlight-current-row="false" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="goods_name" label="商品名称" width="120" sortable>
			</el-table-column>
			<el-table-column prop="goods_price" label="商品单价" width="120" sortable>
			</el-table-column>
			<el-table-column prop="add_time" label="创建时间" width="120" sortable>
			</el-table-column>
			<el-table-column prop="brand_id" label="商品品牌" width="120" sortable>
			</el-table-column>
			<el-table-column prop="cate_id" label="商品分类" width="120" sortable>
			</el-table-column>
			<el-table-column prop="goods_status" label="是否上架" width="" sortable>
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :modal="false">
			<el-form :model="edit" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item prop="goods_name" label="商品名称">
					<el-input v-model="edit.goods_name" placeholder="请输入商品名称"></el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="edit.cate_id" placeholder="请选择分类">
						<el-option label="分类一" value="0"></el-option>
						<el-option label="分类二" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="商品品牌">
					<el-select v-model="edit.brand_id" placeholder="请选择品牌">
						<el-option label="品牌一" value="0"></el-option>
						<el-option label="品牌二" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="goods_price" label="商品价格">
					<el-input v-model="edit.goods_price" placeholder="请输入商品价格"></el-input>
				</el-form-item>
				<el-form-item prop="goods_desc" label="商品描述">
					<el-input v-model="edit.goods_desc" placeholder="请输入商品描述"></el-input>
				</el-form-item>
				<el-form-item label="是否上架">
			   		<el-switch v-model="edit.goods_status"></el-switch>
			  	</el-form-item>
				<el-form-item label="商品图片">
					<el-upload :limit="3" action="string" :file-list="[]" accept="image/*" :http-request="httpRequest" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-change="handChange" :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
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
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				goodlist: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				edit: {
					goods_name :'',
					cate_id:'',
					brand_id:"",
					goods_price:"",
					goods_pic:[], 
					goods_desc:'',
					goods_status:false
				},
				editFormVisible: false,
				editFormRules: {

				},
				dialogImageUrl: '',
       			dialogVisible: false,
			}
		},
		methods: {
			//性别显示转换
			formatSex: function(row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				console.log(val)
				this.getGoodslist();
			},
			//获取用户列表
			getGoodslist() {
				this.listLoading = true,
					this.$api.getGoodslist().then((req) => {
						this.goodlist = req.data;
						this.listLoading = false
					}, (res) => {
						this.$message({
							type: 'info',
							message: '获取失败'
						})
					})
			},
			query: function() {
				let name = this.filters.name;
				this.listLoading = true;
				if(name == '') {
					this.getUsers();
				} else {
					//					es6 filter过滤匹配，有则返回当前，无则返回所有
					this.users = this.users.filter(e => Object.keys(e).some(key => e[key].match(name)));
					this.listLoading = false;
				}
			},
			//列表选中
			selsChange: function(sels) {
				this.sels = sels;
			},
			batchRemove: function() {
				this.listLoading = true;
				var ids = this.sels.map(item => item.id).toString()
				this.$api.deleteAllgoods(ids).then((req)=>{
					if (req == 200) {
						this.$message({
							type: 'success',
							message: req.message
						})
					} else{
						this.$message({
							type: 'info',
							message: req.message
						})
					}
					this.listLoading = false;
				},(res)=>{
					this.$message({
						type: 'info',
						message: '网络错误'
					})
					this.listLoading = false;
				})
			},
			handleCurrentChange(val) {
				this.page = val;
				console.log(val)
				this.getUsers();
			},
			//删除产品
			handleDel: function(index, row) {
				let pare = row.id;
				this.listLoading = true;
				this.$api.deleteGoods(pare).then((req) => {
					if(req.status == 200) {
						this.$message({
							type: "success",
							message: req.message
						})
						this.goodlist.forEach(item => {
							if(item.id == para.id) {
								this.goodlist.splice(index, 1)
							}
						});
					} else {
						this.$message({
							type: "success",
							message: req.message
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
			//编辑显示
			handleEdit: function(index, row) {
				this.edit = Object.assign({}, row);
				this.editFormVisible = true;
			},
			//编辑提交
			editSubmit: function() {
				let pare = Object.assign({},this.edit);
				this.$api.goodsEdit(pare).then((req)=>{
					if(req.status == 200){
						this.editFormVisible = false;
						this.$message({
							type:"success",
							message:req.message
						});
						this.getGoodslist();
					}else{
						this.$message({
							type:"info",
							message:req.message
						})
					}
				},(res)=>{
					this.$message({
						type:"info",
						message:"网络错误"
					})
				})
			},
			handleRemove(file, fileList) {
	        	console.log(file, fileList);
	      	},
	      	handlePictureCardPreview(file) {
	        	this.dialogImageUrl = file.url;
	        	this.dialogVisible = true;
	      	},
	      	//图片文件改变事件
	      	handChange(file, fileList){
	      		let imgs = {
	      			imgName: file.name,
	      			imgUrl: file.url
	      		}
//	      		this.edit.goods_pic.push(imgs)
	      	},
	      	httpRequest(file){      
				
		  	},
		},
		mounted() {
			this.getGoodslist();
		},
	}
</script>

<style scoped>

</style>