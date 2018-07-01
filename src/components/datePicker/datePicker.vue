
<template>
	<div class="datePicker">
		<div class="dealTime" @click="popupDate">
			<input :class="timeActive?'active':''" type="text" :placeholder="holder" disabled="disabled" v-model="selectTime">
			<i :class="timeActive?'icon_active':''"></i>
		</div>
		<div class="dateContent" v-show="isShow">
			<div class="contentBox">
				<div class="confirm">
					<p @click="isShow=false;timeActive=false;">取消</p>
					<p @click="confirm">确定</p>
				</div>
				<div class="dateOperate">
					<div class="date_roll">
						<div class="year common" ref="year">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir/75 +'rem)','transition-duration':durtime,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in yearArr">{{item}}</p>
							</div>
							<div class="date_grid">年</div>
						</div>
						<div class="month common" ref="month">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir2/75 +'rem)','transition-duration':durtime2,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in monthArr">{{item}}</p>
							</div>
							<div class="date_grid">月</div>
						</div>
						<div class="day common" ref="day">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir3/75 +'rem)','transition-duration':durtime3,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in dayArr">{{item}}</p>
							</div>
							<div class="date_grid">日</div>
						</div>
						<div class="hours common" ref="hours">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir4/75 +'rem)','transition-duration':durtime4,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in hoursArr">{{item}}</p>
							</div>
							<div class="date_grid">时</div>
						</div>
						<div class="minutes common" ref="minutes">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir5/75 +'rem)','transition-duration':durtime5,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in minutesArr">{{item}}</p>
							</div>
							<div class="date_grid">分</div>
						</div>
						<div class="seconds common" ref="seconds">
							<div class="yearContent" :style="{transform: 'translateY(' + topDir6/75 +'rem)','transition-duration':durtime6,'transition-timing-function': 'cubic-bezier(0.1, 0.85, 0.25, 1)'}">
								<p v-for="(item,index) in secondsArr">{{item}}</p>
							</div>
							<div class="date_grid">秒</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var date = new Date();
	var year = date.getFullYear();
	export default {
		props: {
			start: {
				default: 1979
			},
			end: {
				default: year
			},
			holder: {
				default: "选择时间"
			},
			type: {
				default: "yeartime"
			},
			value: {

			}
		},
		data(){
			var monthArr = [];
			var hoursArr = [];
			var minutesArr = [];
			var secondsArr = [];
			for(var i=1;i<=12;i++){
				if(i<10)
					monthArr.push("0"+i);
				else
					monthArr.push(i);
			}
			for(var j=0;j<=23;j++){
				if(j<10)
					hoursArr.push("0"+j);
				else
					hoursArr.push(j);
			}
			for(var k=0;k<=59;k++){
				if(k<10)
					minutesArr.push("0"+k);
				else
					minutesArr.push(k);
			}
			for(var m=0;m<=59;m++){
				if(m<10)
					secondsArr.push("0"+m);
				else
					secondsArr.push(m);
			}
			return {
				timeActive: false,
				selectTime: "",
				isShow: false,
				year: "",
				month: "",
				day: "",
				hours: "",
				minutes: "",
				seconds: "",
				monthArr: monthArr,
				hoursArr: hoursArr,
				minutesArr: minutesArr,
				secondsArr: secondsArr,
				topDir: 0,
				durtime: "0ms",
				dirY: "",
				move: false,
				topDir2: 0,
				durtime2: "0ms",
				dirY2: "",
				move2: false,
				topDir3: 0,
				durtime3: "0ms",
				dirY3: "",
				move3: false,
				topDir4: 0,
				durtime4: "0ms",
				dirY4: "",
				move4: false,
				topDir5: 0,
				durtime5: "0ms",
				dirY5: "",
				move5: false,
				topDir6: 0,
				durtime6: "0ms",
				dirY6: "",
				move6: false,
			}
		},
		computed: {
			// 年数组
			yearArr(){
				var start = this.start*1;
				var end = this.end*1;
				var arr = [];
				for(var i=start;i<=end;i++){
					arr.push(i);
				}
				return arr;
			},
			// 日数组
			dayArr(){
				var arr=[]
	            var year = this.year;
	            var month = this.month;
	            var count;
	            if(month==1||month==3||month==5||month==7||month==8||month==10||month==12){
	                count=31;
	            }else if(month==4||month==6||month==9||month==11){
	                count=30;
	            }else{
	                if((year%4==0&&year%100!=0)||(year%400==0)){
	                  count= 29;  
	                }else
	                {
	                  count= 28;
	                }
	            }
	            for(var i=1;i<=count;i++){
	            	if(i<10)
	            		arr.push("0"+i);
	            	else
	            		arr.push(i);
	            }
	            return arr;
			}
		},
		watch: {
			value(){
				if(!this.value){
					this.selectTime = "";
				}
			},
			//日天数变化，滑动的距离限制
			dayArr(){
				var h = this.dayArr.length * 76;
				if(this.topDir3 <= (-h + 228)){
					this.topDir3 = -h + 228;
				}
			},
			//年的滑动值
			topDir(newval,oldval){
				var that = this;
				var h = this.yearArr.length * 76;
				//最大值
				if(this.topDir >= 152){
					this.topDir = 152;
				}
				//最小值
				if(this.topDir <= (-h + 228)){
					this.topDir = -h + 228;
				}
				//在滑动的时候不判断整值(滑动的距离为每行高度的整倍数)
				if(this.move){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY * 10)){
		                this.durtime = '1000ms'
		            } else{
		                this.durtime = '0ms'
		            }
				}else{
					//滑动停止时判断是否为整值
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY * 10)){
		            	// 有惯性时等惯性完再判断是否为整值,如果不是整值则设为整值
		                this.durtime = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir%76/76 > 0){
				            	if(Math.abs(that.topDir%76/76) <= 0.5){
					            	that.topDir = Math.floor(that.topDir/76)*76;
					            	
					            }else{
					            	that.topDir = Math.ceil(that.topDir/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir%76/76) <= 0.5){
					            	that.topDir = Math.ceil(that.topDir/76)*76;
					            	
					            }else{
					            	that.topDir = Math.floor(that.topDir/76)*76;
					            }
				            }
		                },1000)
		            } else{
		            	//没惯性时直接判断是否为整值,如果不是整值则设为整值
		                this.durtime = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir%76/76 > 0){
				            	if(Math.abs(that.topDir%76/76) <= 0.5){
					            	that.topDir = Math.floor(that.topDir/76)*76;
					            	
					            }else{
					            	that.topDir = Math.ceil(that.topDir/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir%76/76) <= 0.5){
					            	that.topDir = Math.ceil(that.topDir/76)*76;
					            	
					            }else{
					            	that.topDir = Math.floor(that.topDir/76)*76;
					            }
				            }
		                },1)
		            }
				}
				//根据滑动的距离判断所选中的值
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir - 152) / 76));
					this.year = this.yearArr[num];
				})
			},
			topDir2(newval,oldval){
				var that = this;
				var h = this.monthArr.length * 76;
				if(this.topDir2 >= 152){
					this.topDir2 = 152;
				}
				if(this.topDir2 <= (-h + 228)){
					this.topDir2 = -h + 228;
				}
				if(this.move2){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY2 * 10)){
		                this.durtime2 = '1000ms'
		            } else{
		                this.durtime2 = '0ms'
		            }
				}else{
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY2 * 10)){
		                this.durtime2 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir2%76/76 > 0){
				            	if(Math.abs(that.topDir2%76/76) <= 0.5){
					            	that.topDir2 = Math.floor(that.topDir2/76)*76;
					            	
					            }else{
					            	that.topDir2 = Math.ceil(that.topDir2/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir2%76/76) <= 0.5){
					            	that.topDir2 = Math.ceil(that.topDir2/76)*76;
					            	
					            }else{
					            	that.topDir2 = Math.floor(that.topDir2/76)*76;
					            }
				            }
		                },1000)
		            } else{
		                this.durtime2 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir2%76/76 > 0){
				            	if(Math.abs(that.topDir2%76/76) <= 0.5){
					            	that.topDir2 = Math.floor(that.topDir2/76)*76;
					            	
					            }else{
					            	that.topDir2 = Math.ceil(that.topDir2/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir2%76/76) <= 0.5){
					            	that.topDir2 = Math.ceil(that.topDir2/76)*76;
					            	
					            }else{
					            	that.topDir2 = Math.floor(that.topDir2/76)*76;
					            }
				            }
		                },1)
		            }
				}
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir2 - 152) / 76));
					this.month = this.monthArr[num];
				})
			},
			topDir3(newval,oldval){
				var that = this;
				var h = this.dayArr.length * 76;
				if(this.topDir3 >= 152){
					this.topDir3 = 152;
				}
				if(this.topDir3 <= (-h + 228)){
					this.topDir3 = -h + 228;
				}
				if(this.move3){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY3 * 10)){
		                this.durtime3 = '1000ms'
		            } else{
		                this.durtime3 = '0ms'
		            }
				}else{
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY3 * 10)){
		                this.durtime3 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir3%76/76 > 0){
				            	if(Math.abs(that.topDir3%76/76) <= 0.5){
					            	that.topDir3 = Math.floor(that.topDir3/76)*76;
					            	
					            }else{
					            	that.topDir3 = Math.ceil(that.topDir3/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir3%76/76) <= 0.5){
					            	that.topDir3 = Math.ceil(that.topDir3/76)*76;
					            	
					            }else{
					            	that.topDir3 = Math.floor(that.topDir3/76)*76;
					            }
				            }
		                },1000)
		            } else{
		                this.durtime3 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir3%76/76 > 0){
				            	if(Math.abs(that.topDir3%76/76) <= 0.5){
					            	that.topDir3 = Math.floor(that.topDir3/76)*76;
					            	
					            }else{
					            	that.topDir3 = Math.ceil(that.topDir3/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir3%76/76) <= 0.5){
					            	that.topDir3 = Math.ceil(that.topDir3/76)*76;
					            	
					            }else{
					            	that.topDir3 = Math.floor(that.topDir3/76)*76;
					            }
				            }
		                },1)
		            }
				}
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir3 - 152) / 76));
					this.day = this.dayArr[num];
				})
			},
			topDir4(newval,oldval){
				var that = this;
				var h = this.hoursArr.length * 76;
				if(this.topDir4 >= 152){
					this.topDir4 = 152;
				}
				if(this.topDir4 <= (-h + 228)){
					this.topDir4 = -h + 228;
				}
				if(this.move4){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY4 * 10)){
		                this.durtime4 = '1000ms'
		            } else{
		                this.durtime4 = '0ms'
		            }
				}else{
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY4 * 10)){
		                this.durtime4 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir4%76/76 > 0){
				            	if(Math.abs(that.topDir4%76/76) <= 0.5){
					            	that.topDir4 = Math.floor(that.topDir4/76)*76;
					            	
					            }else{
					            	that.topDir4 = Math.ceil(that.topDir4/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir4%76/76) <= 0.5){
					            	that.topDir4 = Math.ceil(that.topDir4/76)*76;
					            	
					            }else{
					            	that.topDir4 = Math.floor(that.topDir4/76)*76;
					            }
				            }
		                },1000)
		            } else{
		                this.durtime4 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir4%76/76 > 0){
				            	if(Math.abs(that.topDir4%76/76) <= 0.5){
					            	that.topDir4 = Math.floor(that.topDir4/76)*76;
					            	
					            }else{
					            	that.topDir4 = Math.ceil(that.topDir4/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir4%76/76) <= 0.5){
					            	that.topDir4 = Math.ceil(that.topDir4/76)*76;
					            	
					            }else{
					            	that.topDir4 = Math.floor(that.topDir4/76)*76;
					            }
				            }
		                },1)
		            }
				}
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir4 - 152) / 76));
					this.hours = this.hoursArr[num];
				})
			},
			topDir5(newval,oldval){
				var that = this;
				var h = this.minutesArr.length * 76;
				if(this.topDir5 >= 152){
					this.topDir5 = 152;
				}
				if(this.topDir5 <= (-h + 228)){
					this.topDir5 = -h + 228;
				}
				if(this.move5){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY5 * 10)){
		                this.durtime5 = '1000ms'
		            } else{
		                this.durtime5 = '0ms'
		            }
				}else{
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY5 * 10)){
		                this.durtime5 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir5%76/76 > 0){
				            	if(Math.abs(that.topDir5%76/76) <= 0.5){
					            	that.topDir5 = Math.floor(that.topDir5/76)*76;
					            	
					            }else{
					            	that.topDir5 = Math.ceil(that.topDir5/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir5%76/76) <= 0.5){
					            	that.topDir5 = Math.ceil(that.topDir5/76)*76;
					            	
					            }else{
					            	that.topDir5 = Math.floor(that.topDir5/76)*76;
					            }
				            }
		                },1000)
		            } else{
		                this.durtime5 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir5%76/76 > 0){
				            	if(Math.abs(that.topDir5%76/76) <= 0.5){
					            	that.topDir5 = Math.floor(that.topDir5/76)*76;
					            	
					            }else{
					            	that.topDir5 = Math.ceil(that.topDir5/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir5%76/76) <= 0.5){
					            	that.topDir5 = Math.ceil(that.topDir5/76)*76;
					            	
					            }else{
					            	that.topDir5 = Math.floor(that.topDir5/76)*76;
					            }
				            }
		                },1)
		            }
				}
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir5 - 152) / 76));
					this.minutes = this.minutesArr[num];
				})
			},
			topDir6(newval,oldval){
				var that = this;
				var h = this.secondsArr.length * 76;
				if(this.topDir6 >= 152){
					this.topDir6 = 152;
				}
				if(this.topDir6 <= (-h + 228)){
					this.topDir6 = -h + 228;
				}
				if(this.move6){
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY6 * 10)){
		                this.durtime6 = '1000ms'
		            } else{
		                this.durtime6 = '0ms'
		            }
				}else{
					var num = Math.abs(newval - oldval);
		            if(num == Math.abs(this.dirY6 * 10)){
		                this.durtime6 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir6%76/76 > 0){
				            	if(Math.abs(that.topDir6%76/76) <= 0.5){
					            	that.topDir6 = Math.floor(that.topDir6/76)*76;
					            	
					            }else{
					            	that.topDir6 = Math.ceil(that.topDir6/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir6%76/76) <= 0.5){
					            	that.topDir6 = Math.ceil(that.topDir6/76)*76;
					            	
					            }else{
					            	that.topDir6 = Math.floor(that.topDir6/76)*76;
					            }
				            }
		                },1000)
		            } else{
		                this.durtime6 = '1000ms';
		                setTimeout(function(){
		                	if(that.topDir6%76/76 > 0){
				            	if(Math.abs(that.topDir6%76/76) <= 0.5){
					            	that.topDir6 = Math.floor(that.topDir6/76)*76;
					            	
					            }else{
					            	that.topDir6 = Math.ceil(that.topDir6/76)*76;
					            }
				            }else{
				            	if(Math.abs(that.topDir6%76/76) <= 0.5){
					            	that.topDir6 = Math.ceil(that.topDir6/76)*76;
					            	
					            }else{
					            	that.topDir6 = Math.floor(that.topDir6/76)*76;
					            }
				            }
		                },1)
		            }
				}
				this.$nextTick(function(){
					var num = Math.abs(parseInt((this.topDir6 - 152) / 76));
					this.seconds = this.secondsArr[num];
				})
			}
		},
		mounted(){
			this.$nextTick(function(){
				var year = this.$refs.year;
				var month = this.$refs.month;
				var day = this.$refs.day;
				var hours = this.$refs.hours;
				var minutes = this.$refs.minutes;
				var seconds = this.$refs.seconds;
        		var that =this;
        		//年滑动
        		var startY = 0,endY = 0,lastendY = 0,date;
				year.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY = startY = touch.pageY;
            		that.move = true;
				},false);
				year.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY = touch.pageY;
		            var distanceY = that.dirY = (endY - lastendY)*1;

		            that.topDir += distanceY*2;
		            lastendY = endY;
		            date = new Date();
				},false);
				year.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date;
		            if(durTime < 40){
		                if(that.dirY > 0){
		                    that.topDir +=(that.dirY * 10);
		                } else{
		                    that.topDir +=(that.dirY * 10);
		                }
		            }else{
		            	that.topDir += 1;
		            }
		            that.move = false;
				},false);

				//月滑动
				var startY2 = 0,endY2 = 0,lastendY2 = 0,date2;
				month.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY2 = startY2 = touch.pageY;
            		that.move2 = true;
				},false);
				month.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY2 = touch.pageY;
		            var distanceY = that.dirY2 = (endY2 - lastendY2)*1;

		            that.topDir2 += distanceY*2;
		            lastendY2 = endY2;
		            date2 = new Date();
				},false);
				month.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date2;
		            if(durTime < 40){
		                if(that.dirY2 > 0){
		                    that.topDir2 +=(that.dirY2 * 10);
		                } else{
		                    that.topDir2 +=(that.dirY2 * 10);
		                }
		            }else{
		            	that.topDir2 += 1;
		            }
		            that.move2 = false;
				},false);

				//日滑动
				var startY3 = 0,endY3 = 0,lastendY3 = 0,date3;
				day.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY3 = startY3 = touch.pageY;
            		that.move3 = true;
				},false);
				day.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY3 = touch.pageY;
		            var distanceY = that.dirY3 = (endY3 - lastendY3)*1;

		            that.topDir3 += distanceY*2;
		            lastendY3 = endY3;
		            date3 = new Date();
				},false);
				day.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date3;
		            if(durTime < 40){
		                if(that.dirY3 > 0){
		                    that.topDir3 +=(that.dirY3 * 10);
		                } else{
		                    that.topDir3 +=(that.dirY3 * 10);
		                }
		            }else{
		            	that.topDir3 += 1;
		            }
		            that.move3 = false;
				},false);

				//时滑动
				var startY4 = 0,endY4 = 0,lastendY4 = 0,date4;
				hours.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY4 = startY4 = touch.pageY;
            		that.move4 = true;
				},false);
				hours.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY4 = touch.pageY;
		            var distanceY = that.dirY4 = (endY4 - lastendY4)*1;

		            that.topDir4 += distanceY*2;
		            lastendY4 = endY4;
		            date4 = new Date();
				},false);
				hours.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date4;
		            if(durTime < 40){
		                if(that.dirY4 > 0){
		                    that.topDir4 +=(that.dirY4 * 10);
		                } else{
		                    that.topDir4 +=(that.dirY4 * 10);
		                }
		            }else{
		            	that.topDir4 += 1;
		            }
		            that.move4 = false;
				},false);

				//分滑动
				var startY5 = 0,endY5 = 0,lastendY5 = 0,date5;
				minutes.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY5 = startY5 = touch.pageY;
            		that.move5 = true;
				},false);
				minutes.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY5 = touch.pageY;
		            var distanceY = that.dirY5 = (endY5 - lastendY5)*1;

		            that.topDir5 += distanceY*2;
		            lastendY5 = endY5;
		            date5 = new Date();
				},false);
				minutes.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date5;
		            if(durTime < 40){
		                if(that.dirY5 > 0){
		                    that.topDir5 +=(that.dirY5 * 10);
		                } else{
		                    that.topDir5 +=(that.dirY5 * 10);
		                }
		            }else{
		            	that.topDir5 += 1;
		            }
		            that.move5 = false;
				},false);

				//时滑动
				var startY6 = 0,endY6 = 0,lastendY6 = 0,date6;
				seconds.addEventListener("touchstart",function(e){
					var touch = e.targetTouches[0];
            		lastendY6 = startY6 = touch.pageY;
            		that.move6 = true;
				},false);
				seconds.addEventListener("touchmove",function(e){
		            var touch = e.targetTouches[0];
		            endY6 = touch.pageY;
		            var distanceY = that.dirY6 = (endY6 - lastendY6)*1;

		            that.topDir6 += distanceY*2;
		            lastendY6 = endY6;
		            date6 = new Date();
				},false);
				seconds.addEventListener("touchend",function(e){
					var touch = e.targetTouches[0];
		            var durTime = new Date() - date6;
		            if(durTime < 40){
		                if(that.dirY6 > 0){
		                    that.topDir6 +=(that.dirY6 * 10);
		                } else{
		                    that.topDir6 +=(that.dirY6 * 10);
		                }
		            }else{
		            	that.topDir6 += 1;
		            }
		            that.move6 = false;
				},false);
			})
		},
		methods: {
			// 弹出日期选择
			popupDate(){
				this.timeActive = true;
				this.isShow = true;
				if(!this.value){
					//没有选择日期则默认当前日期
					var date = new Date();
					this.year = date.getFullYear();
					this.month = (date.getMonth() + 1)<10?("0"+(date.getMonth() + 1)):(date.getMonth() + 1);
					this.day = date.getDate()<10?("0"+date.getDate()):date.getDate();
					this.hours = date.getHours()<10?("0"+date.getHours()):date.getHours();
					this.minutes = date.getMinutes()<10?("0"+date.getMinutes()):date.getMinutes();
					this.seconds = date.getSeconds()<10?("0"+date.getSeconds()):date.getSeconds();
				}else{
					//有选择日期则默认为选择过的日期
					this.year = this.value.year;
					this.month = this.value.month;
					this.day = this.value.day;
					this.hours = this.value.hours;
					this.minutes = this.value.minutes;
					this.seconds = this.value.seconds;
				}
				

				//设置日期时间为当前日期时间
				var y = this.yearArr.indexOf(this.year);
				this.topDir = -(y-2) * 76;
				var m = this.monthArr.indexOf(this.month);
				this.topDir2 = -(m-2) * 76;
				var d = this.dayArr.indexOf(this.day);
				this.topDir3 = -(d-2) * 76;
				var h = this.hoursArr.indexOf(this.hours);
				this.topDir4 = -(h-2) * 76;
				var min = this.minutesArr.indexOf(this.minutes);
				this.topDir5 = -(min-2) * 76;
				var s = this.secondsArr.indexOf(this.seconds);
				this.topDir6 = -(s-2) * 76;
			},
			//确定
			confirm(){
				var obj = {
					year: this.year,
					month: this.month,
					day: this.day,
					hours: this.hours,
					minutes: this.minutes,
					seconds: this.seconds
				}
				this.isShow = false;
				this.selectTime = this.year+"-"+this.month+"-"+this.day+" "+this.hours+":"+this.minutes+":"+this.seconds;
				this.$emit("input",obj);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes show{
		0% {bottom: -456px;}
		100% {bottom: 0;}
	}
	.datePicker{
		width: 596px;
		height: 80px;
		.dealTime{
			width: 100%;
			height: 80px;
			position: relative;
			input{
				width: 100%;
				height: 100%;
				display: block;
				border: 1px solid #dddddd; /*no*/
				border-radius: 4px;
				padding-left: 20px;
				background: #f9f9f9;
				letter-spacing: 2px;
				line-height: 78px;
				font-size: 24px;
				color: #00815b;
				&::placeholder{
					color: #979797;
				}
				&::-webkit-input-placeholder { 
					color: #979797;
				} 
				&:-moz-placeholder{ 
					color: #979797;
				} 
				&::-moz-placeholder{ 
					color: #979797;
				} 
				&:-ms-input-placeholder{ 
					color: #979797;
				}
			}
			.active{
				border: 1px solid #57dfa1; /*no*/
				background: #f4fffa;
			}
			i{
				display: block;
				width: 31px;
				height: 30px;
				background: url(./images/icon_date.png) no-repeat;
				background-size: 100% 100%;
				position: absolute;
				right: 20px;
				top: 25px;
			}
			.icon_active{
				background: url(./images/date_active.png) no-repeat;
				background-size: 100% 100%;
			}
		}
		.dateContent{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			z-index: 9999;
			.contentBox{
				width: 100%;
				height: 456px;
				background: #ffffff;
				position: absolute;
				left: 0;
				bottom: 0;
				animation: show 0.4s linear;
				.confirm{
					width: 100%;
					height: 76px;
					padding: 0 50px;
					p{
						line-height: 76px;
						font-size: 32px;
						color: #000000;
						letter-spacing: 4px;
						&:nth-child(1){
							float: left;
						}
						&:nth-child(2){
							float: right;
						}
					}
				}
				.dateOperate{
					width: 100%;
					height: 380px;
					-webkit-mask: -webkit-gradient(linear, 0% 40%, 0% 0%, from(#debb47), to(rgba(36, 142, 36, 0)));
    				-webkit-mask: -webkit-linear-gradient(bottom, #debb47 50%, rgba(36, 142, 36, 0));
    				.date_roll{
    					display: flex;
					    width: 100%;
					    height: auto;
					    overflow: hidden;
					    background-color: transparent;
					    -webkit-mask: -webkit-gradient(linear, 0% 50%, 0% 100%, from(#debb47), to(rgba(36, 142, 36, 0)));
					    -webkit-mask: -webkit-linear-gradient(top, #debb47 50%, rgba(36, 142, 36, 0));
					    .year{
					    	width: 150px;
					    }
					    .month{
					    	width: 120px;
					    }
					    .day{
					    	width: 120px;
					    }
					    .hours{
					    	width: 120px;
					    }
					    .minutes{
					    	width: 120px;
					    }
					    .seconds{
					    	width: 120px;
					    }
					    .common{
					    	height: 456px;
					    	overflow: hidden;
					    	background-color: transparent;
					    	position: relative;
					    	.yearContent{
					    		width: 100%;
					    		position: absolute;
					    		p{
					    			
					    			width: 100%;
					    			height: 76px;
					    			font-size: 28px;
					    			color: #232323;
					    			text-align: right;
					    			padding-right: 70px;
					    			line-height: 74px;
					    			border-top: 1px solid transparent; /*no*/
									border-bottom: 1px solid transparent; /*no*/
									box-sizing: border-box;
					    		}
					    	}
					    	.date_grid{
					    		width: 100%;
					    		height: 76px;
					    		line-height: 74px;
					    		position: absolute;
					    		left: 0;
					    		top: 152px;
				    			font-size: 32px;
				    			color: #232323;
				    			text-align: right;
								border-top: 1px solid #666; /*no*/
								border-bottom: 1px solid #666; /*no*/
								box-sizing: border-box;
								padding-right: 20px;
					    	}
					    }
    				}
				}
			}
		}
		
	}
</style>