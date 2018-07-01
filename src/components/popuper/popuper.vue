


<template>
	<div class="popuper">
		<div class="pcontent" v-if="type=='tip'">
			<div class="detail">
				<slot name="tip"></slot>
			</div>
			<div class="button">
				<p>
					<slot name="button1"></slot>
				</p>
				<p v-if="count==2">
					<slot name="button2"></slot>
				</p>
			</div>
		</div>
		<div class="content2" v-if="type=='exit'">
			<div class="detail">
				<i></i>
				<slot name="tip"></slot>
			</div>
			<div class="button">
				<p>
					<slot name="button1"></slot>
				</p>
				<p v-if="count==2">
					<slot name="button2"></slot>
				</p>
			</div>
		</div>
	</div>
</template>


<script>
	export default {
		props:{
			type:{
				default:"tip"
			},
			count:{
				default:1
			}
		},
		data(){
			return {

			}
		}
	}
</script>


<style lang="scss" scoped>
	.popuper{
		position:fixed;
		width:100%;
		height:100%;
		left: 0;
		top: 0;
		background:rgba(0,0,0,0.5);
		z-index:10;
		.pcontent{
			width:540px;
			height:226px;
			background:#fefefe;
			border-radius:5px;
			position:absolute;
			left:50%;
			top:50%;
			margin-top:-113px;
			margin-left:-270px;
			.detail{
				width:100%;
				height:136px;
				box-sizing:border-box;
				border-bottom:1px solid #b1b1b1;  /*no*/
				text-align:center;
				line-height:136px;
				font-size:26px;
				letter-spacing:3px;
			}
			.button{
				width:100%;
				height:90px;
				display:flex;
				p{
					flex:1;
					text-align:center;
					line-height:90px;
					font-size:26px;
					letter-spacing:10px;
					border-right:1px solid #b1b1b1;  /*no*/
					&:last-child{
						border:0;
					}
				}
			}
		}
		.content2{
			width:540px;
			height:326px;
			background:#fefefe;
			border-radius:5px;
			position:absolute;
			left:50%;
			top:50%;
			margin-top:-163px;
			margin-left:-270px;
			.detail{
				width:100%;
				height:236px;
				box-sizing:border-box;
				border-bottom:1px solid #b1b1b1;  /*no*/
				padding-top:35px;
				i{
					display:block;
					width:106px;
					height:106px;
					margin:0 auto;
					background:url(./images/warning.png) no-repeat;
					background-size:100% 100%;
					margin-bottom:30px;
				}
				span{
					display:block;
					width:100%;
					height:40px;
					font-size:24px;
					line-height:40px;
					text-align:center;
					letter-spacing:2px;
				}
			}
			.button{
				width:100%;
				height:90px;
				display:flex;
				p{
					flex:1;
					text-align:center;
					line-height:90px;
					font-size:26px;
					letter-spacing:10px;
					border-right:1px solid #b1b1b1;  /*no*/
					&:last-child{
						border:0;
					}
				}
			}
		}
	}
</style>