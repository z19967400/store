<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form>
				<el-form-item>
					<el-button @click="gotoAdd" type="primary">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 700px">				
				<el-table-column prop="name" label="权限角色" width="550" sortable></el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="dleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [
		       		{id:'0',name: '王小虎',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'1',name: '王小虎1',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'2',name: '王小虎2',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'3',name: '王小虎3',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'4',name: '王小虎4',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'5',name: '王小虎5',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       		{id:'6',name: '王小虎6',sex: '1',age:'16',birth: '2016-05-02',addr: '上海市普陀区金沙江路 1518 弄'},
		       	]		
			}
		},
		methods:{
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleEdit: function(index,row){
				console.log(row)
			},
			dleDel : function(index,row){
				this.$alert('确认删除该权限吗', '提示', {
		        	confirmButtonText: '确定',
		        	callback: action => {
		        		let para = { id: row.id };
		        		this.users.forEach(item =>{
		        			if (item.id == para.id) {
		        				this.users.splice(index, 1)
		        				this.$message({
									message: '删除成功',
									type: 'success'
								});
		        			}
		        		})
			        }
		       	});
			},
			gotoAdd: function(){
				this.$router.push('/Home/System/addJuris')
			}
		}
	}
</script>

<style>
</style>