<template>
	<section>
		<h3>{{}}</h3>
	</section>
</template>

<script>
	export default {
		name : "Main",
		computed : {
			myName() {
				return this.$store.state.userName;
			}
		}
	}
</script>

<style scoped>

</style>