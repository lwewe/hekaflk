<template>
  <div class="filmdetail" style="position: relative;">
    <ReturnBack :rcolor="'#000'" :bcolor="'rgb(255 255 255 / 84%)'"></ReturnBack>
    <NProgress v-if="loadingflag"/>
    <div class="headlogo" :style="'background-image: url('+$store.state.baseUrl2+detailList.headlogo+')'"
         style="position: absolute;">
      <!--        <img style="width: 100%;" :src="$store.state.baseUrl2+detailList.headlogo" alt="">-->
      <div class="zhezhao" style=""></div>
    </div>
    <div class="detailbox" style="position: relative;">
      <div class="detailtitle">
        <div class="titleleft">
          <!--                <img :src="detailList.logo" alt="">-->
          <div class="imgBox" :style="'background-image: url('+detailList.logo+')'"></div>
        </div>
        <div class="titleright">
          <p class="title">{{ detailList.name }}</p>
          <p>导演:<span>{{ detailList.director }}</span></p>
          <p>主演:<span>{{ detailList.actors }}</span></p>
          <p>{{ detailList.type }}</p>
          <p><span>{{ detailList.playdate }} 上映</span> / <span>{{ detailList.duration }}分钟</span></p>
        </div>
      </div>
      <div class="detail">
        <p class="jianjie">
          <span class="jianjietitle" style="">剧情简介</span>
          <span class="zhankaiguanbi" v-if="seeflag" @click="detailzhankai()">展开</span>
          <span class="zhankaiguanbi" v-if="!seeflag" @click="detailguanbi()">关闭</span>
        </p>
        <div class="zhankai inner" v-if="seeflag">
          {{ detailList.content }}
        </div>
        <div class="guanbi inner" v-if="!seeflag">
          {{ detailList.content }}
        </div>
      </div>
      <div class="photo">
        <span class="phototitle" style="margin-bottom: 2vh;">剧照</span>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" style="width: 186.5px;
    height: 150px;
    overflow: hidden;
    display: flex;
    align-items: center;
    margin-right: 10px;
    background: rgb(219 219 219 / 29%);
    justify-content: center;border-radius: 10px;"
                 v-for="(item,index) in trailers" :key="index">
            <div  style="width: 150px;">
              <img style="width: 100%;height:auto;border-radius: 10px;" :src="item" alt="">
            </div>
            </div>

          </div>
        </div>
        <!-- <ul>
            <li style="width: 100%;height: 100%;margin-bottom: 10px;" v-for="(item,index) in trailers" :key="index">
                <img style="width: 100%;height: 100%;" :src="item" alt="">
            </li>
        </ul> -->
      </div>
      <div style="height: 70px;"></div>
    </div>

    <div class="btnBox">
      <button class="paybtn" @click="buyticket()">立即购票</button>
    </div>

  </div>
</template>

<script>
import Swiper from 'swiper'; // 引入的Swiper
import 'swiper/css/swiper.min.css'
//引入
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

//调用热映电影详情接口
import {getFilmDetail} from "@/api/film";
import toast from "vant/lib/toast";
import router from "@/router";

export default {
  data() {
    return {
      timestamp: null,
      // 电影的id
      id: "",
      cityid: "",
      // 获取的该影片详情
      detailList: [],
      // 剧情简介的展开关闭
      seeflag: true,
      // 剧照
      trailers: [],
      loadingflag: false,

    }
  },

  mounted() {
    // 调用接口得到详情所有数据

    // 初始化swiper
    setTimeout(() => {
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true
      });
    }, 1000);


  },
  created() {
    this.loadingflag = true
    var _this = this
    setTimeout(function () {
      _this.loadingflag = false
    }, 1000)
    this.timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');

    // 获取传过来的电影id  cityid
    this.id = this.$route.query.id
    this.cityid = this.$route.query.cityid
    this.getDetails()

  },
  methods: {
    // 得到电影的详情信息
    getDetails() {
      let data = {
        method: "xuankua.movie.detail",
        appkey: this.$store.state.appkey,
        timestamp: this.timestamp.toString(),
        v: "1.0",
        citycode: this.cityid,
        movieid: this.id
      }
      let sign = this.$utils.getASCII(data)
      getFilmDetail({
        ...data,
        sign: sign
      }).then(res => {
        if (res.code == 200) {
          this.detailList = res.data.movie
          this.trailers = res.data.movie.trailers.split(",")
        }else {
          this.$toast("暂无数据")
          setTimeout(() => {
            this.$router.go(-1)
          },1000)
        }
      })
    },
    // 简介展开
    detailzhankai() {
      this.seeflag = !this.seeflag
    },
    // 简介关闭
    detailguanbi() {
      this.seeflag = !this.seeflag
    },
    // 买票
    buyticket() {
      this.$router.push({path: "/multiplex", query: {id: '' + this.id, cityid: '' + this.cityid}})
    }
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

/* swiper */
.filmdetail {
  width: 100%;
  height: 100%;
}

.filmdetail .zhankai {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.filmdetail .detailbox {
  width: 100%;
  min-height: 80vh;
  top: 19vh;
  background-color: #f0f0f0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  /* padding-bottom: 100px; */
}

.filmdetail .headlogo .zhezhao {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  top: 0;
  opacity: 0.5;
}

.filmdetail .detailbox .detailtitle {
  background-color: #fff;
  width: 100vw;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  padding-bottom: 13px;
}

.filmdetail .detailbox .detailtitle .titleleft {
  flex: 1.4;
  /* background-color: pink; */
  position: relative;
}

.filmdetail .detailbox .detailtitle .titleright {
  flex: 2.4;
  /* background-color: yellow; */
}

.filmdetail .detailbox .detailtitle .titleright p:nth-of-type(1) {
  margin-top: 1.5vh;
  font-size: 1.2em;
  font-weight: 600;
  margin-bottom: 1vh;
}

.filmdetail .detailbox .detailtitle .titleright p:nth-of-type(2) {
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 0.5vh;
}

.filmdetail .detailbox .detailtitle .titleright p:nth-of-type(3) {
  font-size: 0.9em;
  font-weight: 600;
  margin-bottom: 0.5vh;
  width: 50vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.filmdetail .detailbox .detailtitle .titleright p:nth-of-type(4) {
  font-size: 0.7em;
  margin-bottom: 0.5vh;
  color: #999;
}

.filmdetail .detailbox .detailtitle .titleright p:nth-of-type(5) {
  font-size: 0.7em;
  margin-bottom: 0.5vh;
  color: #999;
}

.filmdetail .detailbox .detail {
  width: 89vw;
  /* height: 30vh; */
  padding-bottom: 2.5vh;
  /* background-color: red; */
  margin: 0 auto;
  border-radius: 10px;
  margin-top: 2.5vh;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
}

.filmdetail .detailbox .detail .inner {
  font-size: .9em;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  color: #999;
}

.filmdetail .detailbox .detail .jianjie {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.filmdetail .detailbox .detail .jianjietitle {
  display: inline-block;
  margin-right: 55vw;
  margin-top: 1vh;
  font-weight: 600;
  margin-bottom: 1vh;
}

.filmdetail .detailbox .detail .zhankaiguanbi {
  margin-top: 1vh;
  font-size: .8em;
  color: #999;
}

.filmdetail .detailbox .photo {
  width: 89vw;

  margin: 0 auto;
  border-radius: 10px;
  margin-top: 2.5vh;
  background-color: #fff;
  position: relative;
  padding: 10px;
  padding-bottom: 20px;
}

.filmdetail .detailbox .photo .phototitle {
  display: inline-block;
  margin-top: 1vh;
  font-weight: 600;
  margin-bottom: 1vh;
  margin-left: 2.5vw;
}

.filmdetail .paybtn {
  width: 100%;
  height: 38px;
  background-color: #ED3036;
  border: none;
  border-radius: 30px;
  color: #fff;
  line-height: 38px;

}

.headlogo {
  width: 100%;
  height: 30vh;
  background-size: 100% auto;
  background-position-y: 30%;
}

.imgBox {
  width: 110px;
  height: 150px;
  background-size: 100%;
  border-radius: 10px;
  position: absolute;
  top: -21px;
  left: 16px;
}

.btnBox {
  position: fixed;
  z-index: 10;
  bottom: 0px;
  background-color: white;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>