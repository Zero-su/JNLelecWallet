
<template>
	<div class="entryPage">
		<h2></h2>
		<div class="bean"></div>
		<p class="toRegister">
			<router-link to="/register">注册</router-link>
		</p>
		<p class="toLogin">
			<router-link to="/login">登录</router-link>
		</p>
		<div class="logo"></div>
	</div>
</template>

<script>
	/*
	    time : 2018-6-12
	    author : chenzhihao
	    desc : 进入页面
	*/
	export default {
		data(){
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	// .entryPage{
	// 	width: 100%;
	// 	height: 100%;
	// 	background: url(../images/entryPage/entry_bg.png) no-repeat;
	// 	background-size: 100% 100%;
	// 	padding-top: 240px;
	// 	h2{
	// 		width: 192px;
	// 		height: 193px;
	// 		background: url(../images/entryPage/entry_logo.png) no-repeat;
	// 		background-size: 100% 100%;
	// 		margin: 0 auto;
	// 		margin-bottom: 20px;
	// 	}
	// 	.bean{
	// 		width: 164px;
	// 		height: 64px;
	// 		background: url(../images/entryPage/bean.png) no-repeat;
	// 		background-size: 100% 100%;
	// 		margin: 0 auto;
	// 	}
	// 	.toRegister{
	// 		width:470px;
	// 		height:80px;
	// 		border-radius:4px;
	// 		border:1px solid #ffffff; /*no*/
	// 		text-align:center;
	// 		line-height:78px;
	// 		font-size:34px;
	// 		font-family:"方正兰亭纤黑简体";
	// 		letter-spacing:12px;
	// 		position:fixed;
	// 		left:50%;
	// 		margin-left:-235px;
	// 		bottom:325px;
	// 		a{
	// 			display:block;
	// 			width:100%;
	// 			height:100%;
	// 			color:#ffffff;
	// 		}
	// 	}
	// 	.toLogin{
	// 		width:470px;
	// 		height:80px;
	// 		border-radius:4px;
	// 		border:1px solid #ffffff; /*no*/
	// 		text-align:center;
	// 		line-height:78px;
	// 		font-size:34px;
	// 		background:rgba(255,255,255,0.9);
	// 		font-family:"方正兰亭纤黑简体";
	// 		letter-spacing:12px;
	// 		position:fixed;
	// 		left:50%;
	// 		margin-left:-235px;
	// 		bottom:196px;
	// 		a{
	// 			display:block;
	// 			width:100%;
	// 			height:100%;
	// 			color:#00811e;
	// 		}
	// 	}
	// 	.logo{
	// 		width:167px;
	// 		height:71px;
	// 		background:url(../images/entryPage/logo.png) no-repeat;
	// 		background-size:100% 100%;
	// 		position:fixed;
	// 		bottom:46px;
	// 		left:50%;
	// 		margin-left:-73.5px;
	// 	}
	// }
</style>