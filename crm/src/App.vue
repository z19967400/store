<template>
  <div id="app">
  	<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
  export default {
		data() {
			return {
				
			}
		}
  }
</script>

<style lang="scss">
	html{
		height: 100%;
		background: url(assets/download.jpg);
		background-size: cover;
	}
	body {
		margin: 0;
		padding: 0;
	}
	a{
		text-decoration: none;
	}
	.fade-enter-active,
	.fade-laver-active{
		transition: all .2s ease;
	}
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>
