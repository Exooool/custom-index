<template>
  <div class="weatherBoxboth" :style="[isweather ? 'display:none':'display:block']">
    <div class="weatherBoxMini">
      <span class="regionName">{{ weatherBaseList.city }}</span>
      <i :class="'iconfont ' + weatherIconComp(weatherBaseList.weather)"></i>
      <span class="temp">{{ weatherBaseList.temperature }}℃</span>
    </div>

    <!-- 天气弹窗 -->
    <div class="weatherBox" :style="[isweather ? 'display:none':'display:block']">
      <div class="regionTab">
        <span class="regionName">{{ weatherBaseList.city }}</span>
        <span class="temperature">{{ weatherBaseList.temperature }}℃</span>
        <span class="lowAndHigh"
          >{{ todayHighTemp }}℃ / {{ todayLowTemp }}℃</span
        >
        <span class="weather">{{ weatherBaseList.weather }}</span>
      </div>

      <!-- <div class="weatherForecast">
        <div class="forecastItem" v-for="(todayWt, twKey) in 6" :key="twKey">
          <span class="time">下午18:00</span>
          <i class="weatherIcon"></i>
          <span class="temp">15℃</span>
        </div>
      </div> -->

      <div class="afterWeatherForecast">
        <div
          class="afterForecastItem"
          v-for="(afterWt, awKey) in weatherAllList"
          :key="awKey"
        >
          <span class="time"
            >{{ dateComp(afterWt.date) }} {{ weekComp(afterWt.week) }}</span
          >
          <i :class="'iconfont ' + weatherIconComp(afterWt.dayweather)"></i>
          <span class="temp"
            >{{ afterWt.daytemp }}℃ / {{ afterWt.nighttemp }}℃</span
          >
        </div>
      </div>

      <!-- <div class="weatherIndexBox">

        <span class="weatherTitle">空气质量</span>

        <div class="weatherMain">

          <div class="circleProgressBox">
            <span>污染指数</span>
            <div class="circleProgress">
              <div class="percent">60%</div>
            </div>
          </div>
          <div class="weatherIndex">
            <span class="" >PM10 42</span>
          </div>
        </div>
      </div>

      <div class="weatherIndexBox">
        <span class="weatherTitle">舒适度</span>
        <div class="weatherMain">
          <div class="circleProgressBox">
            <span>空气湿度</span>
            <div class="circleProgress">
              <div class="percent">60%</div>
            </div>
          </div>
          <div class="weatherIndex">
            <span class="" >体感温度 17</span>
          </div>
        </div>
      </div> -->

      <div class="weatherIndexBox">
        <span class="weatherTitle">风向风力</span>

        <div class="weatherMain">
          <i class="iconfont icon-fengche"></i>
          <div class="weatherIndex">
            <span>风向 {{ weatherBaseList.winddirection }}</span>
            <span>风力 {{ weatherBaseList.windpower }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['isweather'],
  data () {
    return {
      // 天气
      weatherAllList: '',
      weatherBaseList: '',
      // 今天最高气温
      todayHighTemp: '',
      // 今天最低气温
      todayLowTemp: '',
      // 天气图标
      weatherIcon: '',
    }
  },
  methods: {
    // 日期转换为中文
    dateComp (date) {
      let month = date.substring(5, 7)
      let days = date.substring(8)
      let datezh = month + '月' + days + ''
      return datezh
    },
    // 周期转换
    weekComp (week) {
      let weekday = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
      return weekday[week - 1]
    },

    // 天气信息获取
    getWeather () {

      let _this = this

      axios.get('https://restapi.amap.com/v3/ip?key=94bb1535d7ddada043834c69d0627e37'
      ).then(function (res) {
        // console.log(res);

        let adcode = res.data.adcode

        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=94bb1535d7ddada043834c69d0627e37&city=' + adcode + '&extensions=all'
        ).then(function (res) {
          // console.log(res);
          _this.weatherAllList = res.data.forecasts[0].casts
          _this.todayHighTemp = _this.weatherAllList[0].daytemp
          _this.todayLowTemp = _this.weatherAllList[0].nighttemp
        }).catch(function (error) {
          console.log(error);
        });

        axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=94bb1535d7ddada043834c69d0627e37&city=' + adcode + '&extensions=base'
        ).then(function (res) {
          // console.log(res);
          _this.weatherBaseList = res.data.lives[0]
        }).catch(function (error) {
          // console.log(error);
        });

      }).catch(function (error) {
        // console.log(error);
      });

    },
    // 天气图标转换
    weatherIconComp (weather) {
      let iconList = { '晴': 'icon-sun-line', '少云': 'icon-cloudy-line', '多云': 'icon-sun-cloudy-line', '阵雨': 'icon-showers-line', '小雨': 'icon-showers-line', '大雨': 'icon-heavy-showers-line', '阴': 'icon-cloudy-line' }
      return iconList[weather]
    },
  },
  mounted () {
        // 天气开关
    if (this.isweather){
      this.getWeather()
      
    }
  }
}
</script>

<style scoped>
/* 天气弹窗样式 */
.weatherBox{
  display: flex;
  flex-direction: column;
  background-color: rgb(255,255,255,0.7);
  height: 500px;
  width: 290px;
  border-radius: 5px;
  position: absolute;
  
  bottom: 60px;
  left: 20px;
  backdrop-filter: blur(5px);
  overflow-x: hidden;
  overflow-y: scroll;
  transition: all 0.3s ease-in-out;
  visibility: hidden;
  opacity: 0;
  z-index: 10000;
}

.weatherBox:hover{
  visibility: visible;
  opacity: 1;
}

.weatherBox::-webkit-scrollbar{
  width: 0px;
}


.weatherBox .regionTab{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  font-size: 18px;
  flex-shrink: 0;
  cursor: default;
}

/* .regionTab .regionName{
  
} */

.regionTab .temperature{
  font-size: 35px;
}

.regionTab .lowAndHigh{
  font-size: 16px;
}

.regionTab .weather{
  font-size: 14px;
}

.weatherBox .weatherForecast{
  display: flex;
  padding: 10px 0px;
  font-size: 16px;
  flex-shrink: 0;
  overflow: hidden;
  overflow-x: scroll;
  border-bottom: #383c3c solid 1px;
}

.weatherBox .weatherForecast::-webkit-scrollbar{
  height: 5px;
}

.weatherBox .weatherForecast::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #000000;
}



.weatherForecast .forecastItem{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  width: 60px;
  flex-shrink: 0;
}

.forecastItem .time{
  font-size: 10px;
  
}

.forecastItem .weatherIcon{
  height: 20px;
  width: 20px;
  background-color: #274a78;
  margin: 10px;
  margin-top: 20px;
}


.weatherBox .afterWeatherForecast{
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  cursor: default;
}

.afterWeatherForecast .afterForecastItem{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  box-shadow: rgb(24 24 24 / 5%) 1px 1px 20px 0px;
  transition: all 100ms ease-in-out;
}

.afterWeatherForecast .afterForecastItem:hover{
  box-shadow: rgb(24 24 24 / 20%) 1px 1px 20px 0px;
}

.afterForecastItem .weatherIcon{
  height: 20px;
  width: 20px;
  background-color: #274a78;
}

/* 天气质量 */
.weatherIndexBox{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  cursor: default;
}

.weatherIndexBox .weatherTitle{
  margin-bottom: 10px;
  padding-left: 10px;
}

.weatherIndexBox .weatherMain{
  display: flex;
}

.circleProgressBox{
  display: flex;
  flex-direction: column;
  align-items: center;
}


.circleProgress{
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 20px rgba(255, 255, 255, 0.6) solid; 
  border-bottom: transparent 20px solid;
  overflow: hidden;
}

.circleProgress .percent{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.weatherIndex{
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}

.weatherBox .weatherTravel{
  display: flex;
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
}

/* 风向风力 */


.icon-fengche{
  font-size: 80px;
  width: 45%;
  text-align: center;
}

/* mini天气 */
.weatherBoxMini{
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 10px;
}

.weatherBoxMini:hover{
  color: white;
}

.weatherBoxMini:hover + .weatherBox{
  visibility: visible;
  opacity: 1;
}
@media screen and (max-width: 600px) {
  .weatherBoxboth{
    display: none;
  }
  .weatherBox{
    display: none;
  }
}
</style>