
<template>
	<div class="footer">
		<ul>
			<li :class="oIndex==index?'active':''" v-for="(item,index) in menu" @click="oIndex=index">
				<router-link :to="item.url">
					<i></i>
					<span>{{item.title}}</span>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				oIndex: 0,
				menu: [
					{url:"/myGreenBean",title:"我的绿豆"},
					{url:"/tradingCenter",title:"交易中心"},
					{url:"/industryInfo",title:"行业资讯"},
					{url:"/personalCenter",title:"个人中心"}
				]
			}
		},
		watch: {
			$route(){
				let path = this.$route.path;
				if(path == "/myGreenBean")
					this.oIndex = 0;
				else if(path == "/tradingCenter")
					this.oIndex = 1;
				else if(path == "/industryInfo")
					this.oIndex = 2;
				else if(path == "/personalCenter")
					this.oIndex = 3;

			}
		},
		mounted(){
			let path = this.$route.path;
			if(path == "/myGreenBean")
				this.oIndex = 0;
			else if(path == "/tradingCenter")
				this.oIndex = 1;
			else if(path == "/industryInfo")
				this.oIndex = 2;
			else if(path == "/personalCenter")
				this.oIndex = 3;
		}
	}
</script>

<style lang="scss" scoped>
	.footer{
		width: 100%;
		height: 128px;
		position: absolute;
		left: 0;
		bottom: 0;
		background:#f7fffd;
		box-shadow: 0 -1px 7px rgba(8,1,3,0.3);
		ul{
			width: 100%;
			height: 100%;
			display: flex;
			li{
				flex: 1;
				height: 100%;
				a{
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					i{
						display: block;
						width: 60px;
						height: 42px;
						margin-bottom: 15px;
					}
					span{
						font-size: 28px;
						line-height: 28px;
						color: #00815b
					}
				}
				&:nth-child(1){
					a{
						i{
							background: url(./images/icon1.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
				&:nth-child(2){
					a{
						i{
							background: url(./images/icon2.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
				&:nth-child(3){
					a{
						i{
							background: url(./images/icon3.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
				&:nth-child(4){
					a{
						i{
							background: url(./images/icon4.png) no-repeat;
							background-size: 100% 100%;
						}
					}
				}
			}
			.active{
				border-bottom: 8px solid #13c992;

			}
		}
	}
</style>