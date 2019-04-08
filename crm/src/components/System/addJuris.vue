<template>
	<el-form ref="form" :model="form" label-width="80px"  style="width: 60%;">
		<el-form-item  label="角色名称">
			<el-input style="width: 150px;" v-model="form.name"></el-input>
		</el-form-item>
		<el-form-item label="系统设置">
			<template>
			  <el-transfer :titles="['选择权限', '已选权限']" :button-texts="['移除', '选中']"   v-model="form.value1" :data="form.data"></el-transfer>
			</template>	
		</el-form-item>
		<el-form-item label="客户管理">
			<el-radio-group v-model="form.resource">
				<el-radio label="线上品牌商赞助"></el-radio>
				<el-radio label="线下场地免费"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
  export default {
    data() {
    	const generateData = _ => {
		    const data = [];
		    for (let i = 1; i <= 15; i++) {
		      data.push({
		        key: i,
		        label:`备选项${i}`
		      });
		    }
		    return data;
		};
      	return {
	        form: {
	         	name: '',
	          	region: '',
	          	date1: '',
	          	date2: '',
	          	delivery: false,
	          	data: generateData(),
	        	value1: [1, 4],
	          	resource: '',
	          	desc: ''
	        }
	      }
	    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style>

</style>