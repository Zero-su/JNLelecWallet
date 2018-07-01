
<template>
	<div class="login">
		<div class="header">
			<span>用户登录</span>
		</div>
		<div class="userImg">
			<img src="../images/login/people.png" alt="" srcset="">
		</div>
		<div class="loginBox">
			<textarea></textarea>
			<i class="icon"></i>	
		</div>
		<button class="login">登录</button>
		<button class="register">注册新用户</button>
		<vpopuper type="tip" count="1" v-if="errFlag">
			<p slot="tip" class="tipname">{{errMsg}}</p>
			<span slot="button1" class="btn1" @click="errFlag=false">确定</span>
		</vpopuper>
	</div>
</template>

<script>
	/*
	    time : 2018-6-12
	    author : chenzhihao
	    desc : 登录页面
	    data: {
			userName: 用户名,
			password: 密码,
			userActive: 用户名输入框是否高亮,
			passwordActive: 密码输入框是否高亮,
			isRecord: 是否记住密码,
			errMsg: 错误信息,
			errFlag: 是否弹出错误框
	    },
	    components: {
			vpopuper: 错误弹出框
	    }
	*/
	import post from "ajax/post.js"
	import vpopuper from "components/popuper/popuper.vue"
	export default {
		data(){
			return {
				userName: "",
				password: "",
				userActive: false,
				passwordActive: false,
				isRecord: false,
				errMsg: "",
				errFlag: false
			}
		},
		components: {
			vpopuper
		},
		created(){
			//判断是否记住密码
			if(localStorage.getItem("loginInfo")){
				var obj = JSON.parse(localStorage.getItem("loginInfo"));
				this.userName = obj.userName;
				this.password = obj.password;
				this.isRecord = true;
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		width: 100%;
		height: 100%;
		.tipname{
			color:#232323;
			letter-spacing:4px;
		}
		.btn1{
			color:#22c280;
			display:flex;
			width:100%;
			height:100%;
			align-items:center;
			font-size: 28px;
			justify-content:center;
		}
		.header{
			width: 100%;
			height: 150px;
			padding-top: 40px;
			box-sizing: border-box;
			text-align: center;
			line-height: 98px;
			color: #313131;
			font-size: 32px;
			letter-spacing: 15px;
		}
		.userImg{
			width: 124px;
			height: 124px;
			border: 3px solid #5494ff;
			border-radius: 100%;
			margin: 0 auto;
			margin-top: 54px;
			img{
				width: 66px;
				height: 64px;
				margin: 0 auto;
				margin-top: 27px;
			}
		}
		.loginBox{
			width: 550px;
			height: 230px;
			margin: 0 auto;
			display: block;
			margin-top: 120px;
			box-shadow: 0px 5px 38px rgba(170,192,242,0.7);
			border-radius: 5px;
			position: relative;
			textarea{
				border: 0px;
				width: 100%;
				height: 100%;
				display: block;
				padding: 44px 33px 44px 112px;
				color: #313131;
				resize: none;
				max-width: 550px;
				max-height: 230px;
			}
			.icon{
				display: block;
				width: 36px;
				height: 36px;
				background: url(../images/login/textIcon.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 28px;
				left: 28px;
			}
		}
		.login{
			width: 300px;
			height: 60px;
			background: linear-gradient(#92d8ff,#599eff);
			border-radius: 60px;
			color: #ffffff;
			font-size: 26px;
			letter-spacing: 10px;
			display: block;
			margin: 0 auto;
			margin-top: 144px;
		}
		.register{
			display: block;
			margin: 0 auto;
			margin-top: 133px;
			text-align: center;
			color: #5494ff;
			font-size: 28px;
			letter-spacing: 3px;
		}
	}
</style>