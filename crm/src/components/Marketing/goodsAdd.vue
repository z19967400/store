<template>
	<el-form  :model="goods" :rules="rules" ref="goods" class="demo-form">
		<el-form-item prop="goods_name" label="商品名称">
			<el-input v-model="goods.goods_name"  placeholder="请输入商品名称"></el-input>
		</el-form-item>
		<el-form-item label="选择商品分类">
		    <el-select v-model="goods.cate_id" placeholder="请选择分类">
		      <el-option label="分类一" value="0"></el-option>
		      <el-option label="分类二" value="1"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item label="选择商品品牌">
		    <el-select v-model="goods.brand_id" placeholder="请选择品牌">
		      <el-option label="品牌一" value="0"></el-option>
		      <el-option label="品牌二" value="1"></el-option>
		    </el-select>
		</el-form-item>
		<el-form-item prop="goods_price" label="商品价格">
			<el-input v-model="goods.goods_price" placeholder="请输入商品价格"></el-input>
		</el-form-item>
		<el-form-item prop="goods_desc" label="商品描述">
			<el-input v-model="goods.goods_desc" placeholder="请输入商品描述"></el-input>
		</el-form-item>
		<el-form-item label="是否上架">
	   		<el-switch v-model="goods.goods_status"></el-switch>
	  	</el-form-item>
		<el-form-item label="商品图片">
			<el-upload
				:limit="3"
				action="string"
				:file-list="[]"
				accept="image/*"
				:http-request="httpRequest"
				list-type="picture-card"
				:on-preview="handlePictureCardPreview"
				:on-change="handChange"
				:on-remove="handleRemove">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible" >
			  <img width="100%" :src="dialogImageUrl" alt="">
			</el-dialog>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('goods')">立即创建</el-button>
			<el-button @click="resetForm('goods')">重置</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	export default{
		data(){
			return{
				goods:{
					goods_name :'',
					cate_id:'',
					brand_id:"",
					goods_price:"",
					goods_pic:[], 
					goods_desc:'',
					goods_status:false
				},
				dialogImageUrl: '',
       			dialogVisible: false,
       			rules:{
       				goods_name: [{
						required: true,
						message: '请填写商品名称',
						trigger: 'blur'
					}],
					goods_desc: [{
						required: true,
						message: '请填写商品详情',
						trigger: 'blur'
					}],
					goods_price:[{
						required: true,
						message: '请填写商品价格',
						trigger: 'blur'
					}],
       			}
			}
		},
		 methods: {
	      	handleRemove(file, fileList) {
	        	console.log(file, fileList);
	      	},
	      	handlePictureCardPreview(file) {
	        	this.dialogImageUrl = file.url;
	        	this.dialogVisible = true;
	      	},
	      	handChange(file, fileList){
	      		let imgs = {
	      			imgName: file.name,
	      			imgUrl: file.url
	      		}
	      		this.goods.goods_pic.push(imgs)
	      	},
	      	httpRequest(file){      
				
		  	},
		  	submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						let pare = this.goods;	
						this.$api.goodsAadd((pare)).then((req)=>{
							if (req.status == 200) {
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
								message:req.message
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
	      	}
		}	  	
	}
</script>

<style scoped lang="scss">
	.demo-form{
		width: 50%;
		margin: 0 auto;
	}
</style>