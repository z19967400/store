<template>
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
</template>

<script>
	export default{
		data(){
			return {
				filters:{
					name:''
				}
			}
		},
		methods: {
			query(){
				console.log(this.filters.name)
			}
		}
	}
</script>

<style>
</style>