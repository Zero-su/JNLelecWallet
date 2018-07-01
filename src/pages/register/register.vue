
<template>
	<div class="register">
		<div class="header">
			<span>用户注册</span>
		</div>
		<transition>
			<div class="registerContent" :style="{top:dealConfirmActive?(26/75+'rem'):(2+'rem')}">
				<h2>
					<span></span>
				</h2>
				<div class="inputBox">
					<div class="account">
						<div class="icon">
							<span :class="(userActive || userName)?'active':''"></span>
						</div>
						<input placeholder="请输入用户名" type="text" v-model="userName" @focus="userActive=true" @blur="userActive=false">
						<div class="delete">
							<i v-show="userName" @click="userName=''"></i>
						</div>
					</div>
					<div class="password">
						<div class="icon">
							<span :class="(passwordActive || password)?'active':''"></span>
						</div>
						<input placeholder="请输入登录密码" type="password" v-model="password" @focus="passwordActive=true" @blur="passwordActive=false">
						<div class="delete">
							<i v-show="password" @click="password=''"></i>
						</div>
					</div>
					<div class="again">
						<div class="icon">
							<span :class="(confirmActive || confirmPwd)?'active':''"></span>
						</div>
						<input placeholder="请确认登录密码" type="password" v-model="confirmPwd" @focus="confirmActive=true" @blur="confirmActive=false">
						<div class="delete">
							<i v-show="confirmPwd" @click="confirmPwd=''"></i>
						</div>
					</div>
					<div class="dealpassword">
						<div class="icon">
							<span :class="(dealActive || dealpassword)?'active':''"></span>
						</div>
						<input placeholder="请输入交易密码" type="password" v-model="dealpassword" @focus="dealActive=true" @blur="dealActive=false">
						<div class="delete">
							<i v-show="dealpassword" @click="dealpassword=''"></i>
						</div>
					</div>
					<div class="checkdealpassword">
						<div class="icon">
							<span :class="(dealConfirmActive || dealConfirm)?'active':''"></span>
						</div>
						<input placeholder="请确认交易密码" type="password" v-model="dealConfirm" @focus="dealConfirmActive=true" @blur="dealConfirmActive=false">
						<div class="delete">
							<i v-show="dealConfirm" @click="dealConfirm=''"></i>
						</div>
					</div>
				</div>
				<div class="toRegister" @click="toRegister">
					注册
				</div>
				<div class="toLogin">
					<router-link to="/login">已有账号，直接登陆</router-link>
				</div>
			</div>
		</transition>
		<vpopuper type="tip" count="1" v-if="errFlag">
			<p slot="tip" class="tipname">{{errMsg}}</p>
			<span slot="button1" class="btn1" @click="errFlag=false">确定</span>
		</vpopuper>
		<vpopuper type="tip" count="1" v-if="successFlag">
			<p slot="tip" class="tipname">注册成功</p>
			<span slot="button1" class="btn1" @click="toLogin">去登陆</span>
		</vpopuper>
	</div>
</template>

<script>
	/*
	    time : 2018-6-13
	    author : chenzhihao
	    desc : 注册页面
	    data: {
			userName: 用户名,
			password: 登录密码,
			confirmPwd: 登录密码确认,
			dealpassword: 交易密码,
			dealConfirm: 交易密码确认,
			userActive: 用户名输入框高亮,
			passwordActive: 登录密码输入框高亮,
			confirmActive: 登录密码确认输入框高亮,
			dealActive: 交易密码输入框高亮,
			dealConfirmActive: 交易密码确认输入框高亮,
			errMsg: 错误信息,
			errFlag: 显示隐藏错误提示框,
			successFlag: 注册成功输入框
	    },
	    components: {
			vpopuper: 错误弹出框
	    }
	*/
	import vpopuper from "components/popuper/popuper.vue"
	import post from "ajax/post.js"
	export default {
		data(){
			return {
				userName: "",
				password: "",
				confirmPwd: "",
				dealpassword: "",
				dealConfirm: "",
				userActive: false,
				passwordActive: false,
				confirmActive: false,
				dealActive: false,
				dealConfirmActive: false,
				errMsg: "",
				errFlag: false,
				successFlag: false
			}
		},
		components: {
			vpopuper
		},
		watch: {
			//判断账号位数，做多16个字符
			userName(newval,oldval){
				if(newval.length > 16){
					this.userName = oldval;
				}
			}
		},
		methods: {
			//注册
			toRegister(){
				var that = this;
				if(!this.userName){
					this.errMsg = "用户名不能为空";
					this.errFlag = true;
					return ;
				}else if(!this.password){
					this.errMsg = "登录密码不能为空";
					this.errFlag = true;
					return ;
				}else if(!this.dealpassword){
					this.errMsg = "交易密码不能为空";
					this.errFlag = true;
					return ;
				}else if(this.password != this.confirmPwd){
					this.errMsg = "登录密码确认不一致";
					this.errFlag = true;
					return ;
				}else if(this.dealpassword != this.dealConfirm){
					this.errMsg = "交易密码确认不一致";
					this.errFlag = true;
					return ;
				}else {
					post("account/appRegister",{
						LOGIN_NAME: this.userName,
						USER_NAME: this.userName,
						PASSWORD: this.password
					}).then(function(res){
						//console.log(res)
						if(res.data.success){
							post("account/binding",{
								LOGIN_NAME: that.userName,
								PRIVATE_SECRET: that.dealpassword
							}).then(function(result){
								if(result.data.success){
									that.successFlag = true;
								}
							})
						}else if(res.data.error == "登录名已存在"){
							that.errMsg = "该用户名已存在";
							that.errFlag = true;
						}
					})
				}
			},
			//去登录
			toLogin(){
				this.successFlag = false;
				this.$router.push("/login");
			}
		}
	}
</script>

<style lang="scss" scoped>
	// .register{
	// 	width: 100%;
	// 	height: 100%;
	// 	position: relative;
	// 	.tipname{
	// 		color:#232323;
	// 		letter-spacing:4px;
	// 	}
	// 	.btn1{
	// 		color:#22c280;
	// 		display:flex;
	// 		width:100%;
	// 		height:100%;
	// 		align-items:center;
	// 		font-size: 28px;
	// 		justify-content:center;
	// 	}
	// 	.header{
	// 		width: 100%;
	// 		height: 150px;
	// 		padding-top: 52px;
	// 		box-sizing: border-box;
	// 		text-align: center;
	// 		line-height: 98px;
	// 		color: #ffffff;
	// 		font-size: 32px;
	// 		letter-spacing: 15px;
	// 		background: url(../images/header/header_bg1.png) no-repeat;
	// 		background-size: 100% 100%;
	// 		position: relative;
	// 		z-index: 2;
	// 	}
	// 	.registerContent{
	// 		width: 100%;
	// 		height: calc(100% - 150px);
	// 		background: #f7fffd;
	// 		padding-top: 124px;
	// 		position: absolute;
	// 		left: 0;
	// 		top: 150px;
	// 		transition: all 0.5s;
	// 		h2{
	// 			width: 131px;
	// 			height: 131px;
	// 			margin: 0 auto;
	// 			background: #22c280;
	// 			border-radius: 15px;
	// 			display: flex;
	// 			justify-content: center;
	// 			align-items: center;
	// 			margin-bottom: 70px;
	// 			span{
	// 				display: block;
	// 				width: 106px;
	// 				height: 87px;
	// 				background: url(../images/login/logo.png) no-repeat;
	// 				background-size: 100% 100%;
	// 			}
	// 		}
	// 		.inputBox{
	// 			width: 600px;
	// 			height: 438px;
	// 			border: 1px solid #c0d3c4;  /*no*/
	// 			border-radius: 3px;
	// 			background: #ffffff;
	// 			margin: 0 auto;
	// 			box-sizing: border-box;
	// 			margin-bottom: 68px;
	// 			.account{
	// 				width: 100%;
	// 				height: 87px;
	// 				border-bottom: 1px solid #c0d3c4;	/*no*/
	// 				display: flex;
	// 				.icon{
	// 					width: 88px;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					span{
	// 						display: block;
	// 						width: 33px;
	// 						height: 35px;
	// 						background: url(../images/login/user.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 					.active{
	// 						background: url(../images/login/user_active.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}	
	// 				input{
	// 					width: 446px;
	// 					height: 100%;
	// 					border: 0;
	// 					outline: none;
	// 					padding-left: 10px;
	// 					font-size: 26px;
	// 					line-height: 86px;
	// 					color: #00815b;
	// 					letter-spacing: 3px;
	// 					&::placeholder{
	// 						color: #adc9b2;
	// 					}
	// 					&::-webkit-input-placeholder { 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&::-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-ms-input-placeholder{ 
	// 						color: #adc9b2;
	// 					}
	// 				}
	// 				.delete{
	// 					flex: 1;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					i{
	// 						display: block;
	// 						width: 20px;
	// 						height: 17px;
	// 						background: url(../images/login/delete.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 			}
	// 			.password{
	// 				width: 100%;
	// 				height: 87px;
	// 				border-bottom: 1px solid #c0d3c4;	/*no*/
	// 				display: flex;
	// 				.icon{
	// 					width: 88px;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					span{
	// 						display: block;
	// 						width: 28px;
	// 						height: 33px;
	// 						background: url(../images/login/password.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 					.active{
	// 						background: url(../images/login/password_active.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 				input{
	// 					width: 446px;
	// 					height: 100%;
	// 					border: 0;
	// 					outline: none;
	// 					padding-left: 10px;
	// 					font-size: 26px;
	// 					line-height: 86px;
	// 					color: #00815b;
	// 					letter-spacing: 3px;
	// 					&::placeholder{
	// 						color: #adc9b2;
	// 					}
	// 					&::-webkit-input-placeholder { 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&::-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-ms-input-placeholder{ 
	// 						color: #adc9b2;
	// 					}
	// 				}
	// 				.delete{
	// 					flex: 1;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					i{
	// 						display: block;
	// 						width: 20px;
	// 						height: 17px;
	// 						background: url(../images/login/delete.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 			}
	// 			.again{
	// 				width: 100%;
	// 				height: 86px;
	// 				border-bottom: 1px solid #c0d3c4;	/*no*/
	// 				display: flex;
	// 				.icon{
	// 					width: 88px;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					span{
	// 						display: block;
	// 						width: 28px;
	// 						height: 33px;
	// 						background: url(../images/login/password.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 					.active{
	// 						background: url(../images/login/password_active.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 				input{
	// 					width: 446px;
	// 					height: 100%;
	// 					border: 0;
	// 					outline: none;
	// 					padding-left: 10px;
	// 					font-size: 26px;
	// 					line-height: 86px;
	// 					color: #00815b;
	// 					letter-spacing: 3px;
	// 					&::placeholder{
	// 						color: #adc9b2;
	// 					}
	// 					&::-webkit-input-placeholder { 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&::-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-ms-input-placeholder{ 
	// 						color: #adc9b2;
	// 					}
	// 				}
	// 				.delete{
	// 					flex: 1;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					i{
	// 						display: block;
	// 						width: 20px;
	// 						height: 17px;
	// 						background: url(../images/login/delete.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 			}
	// 			.dealpassword{
	// 				width: 100%;
	// 				height: 87px;
	// 				border-bottom: 1px solid #c0d3c4;	/*no*/
	// 				display: flex;
	// 				.icon{
	// 					width: 88px;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					span{
	// 						display: block;
	// 						width: 28px;
	// 						height: 33px;
	// 						background: url(../images/login/dealpassword.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 					.active{
	// 						background: url(../images/login/dealpassword_active.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 				input{
	// 					width: 446px;
	// 					height: 100%;
	// 					border: 0;
	// 					outline: none;
	// 					padding-left: 10px;
	// 					font-size: 26px;
	// 					line-height: 86px;
	// 					color: #00815b;
	// 					letter-spacing: 3px;
	// 					&::placeholder{
	// 						color: #adc9b2;
	// 					}
	// 					&::-webkit-input-placeholder { 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&::-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-ms-input-placeholder{ 
	// 						color: #adc9b2;
	// 					}
	// 				}
	// 				.delete{
	// 					flex: 1;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					i{
	// 						display: block;
	// 						width: 20px;
	// 						height: 17px;
	// 						background: url(../images/login/delete.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 			}
	// 			.checkdealpassword{
	// 				width: 100%;
	// 				height: 87px;
	// 				display: flex;
	// 				.icon{
	// 					width: 88px;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					span{
	// 						display: block;
	// 						width: 28px;
	// 						height: 33px;
	// 						background: url(../images/login/dealpassword.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 					.active{
	// 						background: url(../images/login/dealpassword_active.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 				input{
	// 					width: 446px;
	// 					height: 100%;
	// 					border: 0;
	// 					outline: none;
	// 					padding-left: 10px;
	// 					font-size: 26px;
	// 					line-height: 86px;
	// 					color: #00815b;
	// 					letter-spacing: 3px;
	// 					&::placeholder{
	// 						color: #adc9b2;
	// 					}
	// 					&::-webkit-input-placeholder { 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&::-moz-placeholder{ 
	// 						color: #adc9b2;
	// 					} 
	// 					&:-ms-input-placeholder{ 
	// 						color: #adc9b2;
	// 					}
	// 				}
	// 				.delete{
	// 					flex: 1;
	// 					height: 100%;
	// 					display: flex;
	// 					justify-content: center;
	// 					align-items: center;
	// 					i{
	// 						display: block;
	// 						width: 20px;
	// 						height: 17px;
	// 						background: url(../images/login/delete.png) no-repeat;
	// 						background-size: 100% 100%;
	// 					}
	// 				}
	// 			}
	// 		}
	// 		.toRegister{
	// 			width: 600px;
	// 			height: 78px;
	// 			margin: 0 auto;
	// 			line-height: 78px;
	// 			background: #22c280;
	// 			font-size: 28px;
	// 			letter-spacing: 15px;
	// 			color: #ffffff;
	// 			text-align: center;
	// 			border-radius: 4px;
	// 			margin-bottom: 40px;
	// 		}
	// 		.toLogin{
	// 			width: 600px;
	// 			height: 38px;
	// 			text-align: center;
	// 			margin: 0 auto;
	// 			a{
	// 				font-size: 28px;
	// 				line-height: 38px;
	// 				color: #393939;
	// 				letter-spacing: 2px;
	// 				border-bottom: 1px solid #393939; /*no*/
	// 			}
	// 		}
	// 	}
	// }
</style>