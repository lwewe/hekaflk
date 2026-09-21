<template>
  <div class="indexwrap">
    <!-- <NProgress v-if="loadingflag"/> -->
    <EnterLoging v-if="loadingflag"></EnterLoging>
    <!-- <div>
      <transition name="fade">
        <loading v-if="isLoading"></loading>
      </transition>
    </div> -->
    <div style="background: linear-gradient(#f93a36,#ffe9c4);">
      <div class="header">
        <div class="headerleft" style="padding-left: 10px;padding-right: 10px;">
          <City></City>
        </div>
        <div class="headercenter" style="width: 61vw;">
          <van-icon size="1.2em" class="search" name="search"/>
          <input v-model="searchtext" type="text" class="inp" placeholder="影片搜索">
        </div>
        <div class="headerright" style="">
          <!-- <a :href="kefu" target="_blank"> -->
          <van-icon @click="gokefu()" size="1.3em" class="service" name="service" style="margin-right: 15px;"/>
          <!-- </a> -->

        </div>
      </div>
      <!-- 轮播图 -->
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red" style="border-radius: 10px;">
          <van-swipe-item v-for="(item,index) in swiperimg" :key="index" style="border-radius: 10px;">
            <a :href="item.url">
              <img :id="item.id" :src=" item.img" alt=""
                   style="border-radius: 10px;width: 100%;height: 100%;">
            </a>

          </van-swipe-item>
        </van-swipe>
      </div>

<!--      <div class="welfare" v-if="isSearch&&!change" style="margin-bottom: 8px">-->
<!--        <p class="hotsize" style="margin-left: 7px;padding-top: 10px;">-->
<!--          <span style="color: #aa6a39;font-weight: 700;font-size: 1rem;">专享福利</span>-->
<!--          <span style="color: gray;display: flex;justify-content: end;align-content: center;"-->
<!--                @click="gomemberindex()"><span style="color: #9D9387;">全部</span>-->
<!--            <van-icon class="hoticon" name="arrow" color="#9D9387" style=""/>-->
<!--          </span>-->
<!--        </p>-->
<!--        <div class="welfarebox" style="">-->
<!--          <div class="left" style="position: relative;">-->
<!--            <div class="leftimgbox" v-for="(item,index) in kaquan_list1" :key="item.id" :id="index+1">-->
<!--              &lt;!&ndash; @click="godetail($event)" &ndash;&gt;-->
<!--              <a :href="item.url">-->
<!--                <img :src=" item.img" :id="index+1" alt="">-->
<!--              </a>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="right" style="">-->
<!--            <div class="wrap1" v-for="(item) in kaquan_list2" :key="item.id">-->
<!--              <div class="circle" :id="item.id">-->
<!--                &lt;!&ndash; @click="gomusicmember(item.id)" &ndash;&gt;-->
<!--                <a :href="item.url">-->
<!--                  <img :src=" item.img" :id="item.id" alt="">-->
<!--                </a>-->

<!--              </div>-->
<!--              <span style="white-space: nowrap">{{ item.title }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
<!--    <div class="welfare" v-if="shopList.length>0">-->
<!--      <p class="hotsize" style="margin-left: 7px;padding-top: 10px;">-->
<!--        <span style="color: #aa6a39;font-weight: 700;font-size: 1rem;">演出福利</span>-->
<!--        <span style="color: gray;display: flex;justify-content: end;align-content: center;"-->
<!--              @click="toPer()"><span style="color: #9D9387;">全部</span>-->
<!--            <van-icon class="hoticon" name="arrow" color="#9D9387" style=""/>-->
<!--          </span>-->
<!--      </p>-->
<!--      <div class="birthdayBox" style="margin-top: 0px;padding: 0px 5px;">-->
<!--        <div class="birthday" :style="'width:'+ shopList.slice(0,20).length*86+'px;'">-->
<!--          <div class="listItem" v-for="item in shopList.slice(0,20)" :key="item.id">-->
<!--            <ShopList :listItem="item" :flag="2" :type="1"></ShopList>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <!-- 热映榜单 -->
    <div v-if="isSearch">
      <p class="hotsize"><span style="font-weight: 700;font-size: 1rem;color: #333;">热映榜单</span>
        <span @click="hotlist()" style="color: #333;display: flex;justify-content: end;align-content: center;"><span
            style="color: #9D9387;">全部</span>
          <van-icon class="hoticon" color="#9D9387" name="arrow"/>
        </span>
      </p>
      <div class="hot" style="margin-left: 15px;margin-right: 15px;">
        <div>
          <div class="banshi">
            <div class="swiper-container" style="">
              <div class="swiper-wrapper" style="">
                <div v-for="(item,index) in swiperList" :key="index" class="swiper-slide">
                  <div class="imgbox" style="position: relative;">
                    <img :name="item.id" @click="filmdetail(item.id)" class="hotimg" :src="item.logo" alt="" style="">
                    <p style="position: absolute;left: 0;bottom: 0px;z-index: 100;color: #fff;background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));font-size: 13px;width: 100%;padding-bottom:2px;padding-left: 3px;">
                      评分:{{ item.rating }}</p>
                  </div>

                  <p class="hotname elips1" style="">{{ item.name }}</p>
                  <button :name="item.id" :data="item.playdate" @click="buyticket(item)">购&nbsp;票</button>
                  <!-- <span style="position: absolute;top: 5px;left: 5px;">{{ index+1 }}</span> -->
                  <img class="logonum" v-if="index==0" src="../assets/number/1.png" alt="">
                  <img class="logonum" v-if="index==1" src="../assets/number/2.png" alt="">
                  <img class="logonum" v-if="index==2" src="../assets/number/3.png" alt="">
                  <img class="logonum" v-if="index==3" src="../assets/number/4.png" alt="">
                  <img class="logonum" v-if="index==4" src="../assets/number/5.png" alt="">
                  <img class="logonum" v-if="index==5" src="../assets/number/6.png" alt="">
                  <img class="logonum" v-if="index==6" src="../assets/number/7.png" alt="">
                  <img class="logonum" v-if="index==7" src="../assets/number/8.png" alt="">
                  <img class="logonum" v-if="index==8" src="../assets/number/9.png" alt="">
                  <img class="logonum" v-if="index==9" src="../assets/number/10.png" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>

    <!-- 正在热映 -->
    <van-tabs class="seehotlist" style="margin-top: 10px;">
      <van-tab title-active-color="#144a9e" title="正在热映" style="padding-bottom: 50px">
        <!-- 未搜索显示的全部 -->
        <div class="filmbox" v-if="isSearch" v-for="(item,index) in hotfilmList" :key="index" style="display: flex;"
             :name="item.id" @click="filmdetail(item.id)">
          <div class="filmleft" style="flex: 1.8;" :name="item.id">
            <img :src="item.logo" :name="item.id" alt="" style="">
            <div
                style="display: flex;flex-direction: column;justify-content: center;align-content: center;height: 100%;padding-left: 5px;width: 40%;">
              <div class="elips1" :name="item.id" style="width: 33vw;margin-top: 10px;margin-bottom: 0px;">{{
                  item.name
                }}
              </div>
              <p>
                <span :name="item.id" class="font1">主演:</span>
                <span :name="item.id" style="" class="font2 elips1">{{ item.actors }}</span>
              </p>
              <p>
                <span :name="item.id" class="font1">导演:</span>
                <span :name="item.id" class="font2">{{ item.director }}</span>
              </p>
              <p :name="item.id" style="font-size: 12px;">
                <span :name="item.id" class="" style="border: 1px solid #000;padding: 0px 4px;
    box-sizing: content-box;">{{ item.type }}</span>
                <!-- {{ item.showmark }} -->
                <span :name="item.id" class="showmark"
                      :style="`display:${item.showmark==undefined?'none':'block'}`">{{ item.showmark }}</span>
              </p>
            </div>
          </div>
          <div :name="item.id" class="filmright">
            <p style="font-size: 13px;padding-left:13px;margin-top: 3vh;width: 100%;">评分
              <span style="font-size: 17px;color: darkgoldenrod;">{{ item.rating }}</span>
            </p>
            <button class="pap" :name="item.id" :data="item.playdate" @click.stop="buyticket(item)">购 票</button>
          </div>
        </div>
        <!-- 搜索后显示 -->
        <div class="filmbox" v-if="!isSearch" v-for="(item,index) in hotfilmList" :key="index" style="display: flex;"
             :name="item.id" @click="filmdetail(item.id)">
          <div class="filmleft" style="flex: 1.8;" :name="item.id">
            <img :src="item.logo" :name="item.id" alt="" style="">
            <div
                style="display: flex;flex-direction: column;justify-content: center;align-content: center;height: 100%;padding-left: 5px;width: 40%;">
              <div class="elips1" :name="item.id" style="width: 33vw;margin-top: 10px">{{ item.name }}</div>
              <p>
                <span class="font1" :name="item.id">主演:</span>
                <span style="" class="font2 elips1" :name="item.id">{{ item.actors }}</span>
              </p>
              <p>
                <span class="font1" :name="item.id">导演:</span>
                <span class="font2" :name="item.id">{{ item.director }}</span>
              </p>
              <p style="font-size: 12px;color: gray;">
                <span class="" style="border: 1px solid #000;padding: 0px 4px;" :name="item.id">{{ item.type }}</span>
                <!-- {{ item.showmark }} -->
                <span class="showmark" :name="item.id"
                      :style="`display:${item.showmark==undefined?'none':'block'}`">{{ item.showmark }}</span>
              </p>
            </div>

          </div>
          <div class="filmright">
            <p style="font-size: 13px;margin-top: 2vh;padding-left:13px;">评分 <span
                style="font-size: 17px;color: #eda86e;">{{ item.rating }}</span></p>
            <button class="pap" :name="item.id" :data="item.playdate" @click.stop="buyticket(item)">购 票</button>
          </div>
        </div>


      </van-tab>
      <!-- 即将上映 -->
      <van-tab title-active-color="red" title="即将上映" style="padding-bottom: 60px">
        <!-- 未搜索显示的内容 -->
        <div class="filmbox" v-if="isSearch" v-for="(item,index) in futurefilmList" :key="index" style="display: flex;"
             :name="item.id" @click="filmdetail(item.id)">
          <div class="filmleft" :name="item.id" style="flex: 1.8;">
            <div>
              <img :src="item.logo" alt="" :name="item.id" style="">
            </div>
            <div
                style="display: flex;flex-direction: column;justify-content: center;align-content: center;height: 100%;padding-left: 5px;width: 40%;">
              <div class="elips1" :name="item.id " style="margin-top: 10px;width: 50%;">{{ item.name }}</div>
              <p :name="item.id">
                <span class="font1" :name="item.id">主演:</span>
                <span style="" class="font2 elips1" :name="item.id">{{ item.actors }}</span>
              </p>
              <p :name="item.id">
                <span class="font1" :name="item.id">导演:</span>
                <span class="font2 elips1" :name="item.id">{{ item.director }}</span>
              </p>
              <p style="font-size: 12px;color: #000;" :name="item.id">
                <span class="" style="border: 1px solid #000;padding: 0px 4px;" :name="item.id">{{ item.type }}</span>
                <!-- {{ item.showmark }} -->
                <span class="showmark"
                      :style="`display:${item.showmark==undefined?'none':'block'}`">{{ item.showmark }}</span>
              </p>
            </div>

          </div>
          <div class="filmright" :name="item.id">
            <!-- <p style="font-size: 13px;margin-left: 7vw;margin-top: 2vh;margin-right: 4vw;"><span style="font-size: 17px;color: #eda86e;">{{ 11.1}}万</span>人想看</p> -->
            <button class="pap" :id="item.id" :name="item.id" style="background-color: #40a6fb;">预 售</button>
          </div>
        </div>
        <!-- 搜索显示的内容 -->

        <div class="filmbox" v-if="!isSearch" v-for="(item,index) in futurefilmList" :key="index"
             style="display: flex;" :name="item.id" @click="filmdetail(item.id)">
          <div class="filmleft" :name="item.id" style="flex: 1.8;">
            <img :src="item.logo" alt="" :name="item.id" style="">
            <div
                style="display: flex;flex-direction: column;justify-content: center;align-content: center;height: 100%;padding-left: 5px;width: 40%;">
              <div class="elips1" :name="item.id" style="margin-top: 10px;text-overflow: ellipsis;
    overflow: hidden;white-space: nowrap">{{ item.name }}
              </div>
              <p :name="item.id">
                <span class="font1" :name="item.id">主演:</span>
                <span style="" class="font2 elips1" :name="item.id">{{ item.actors }}</span>
              </p>
              <p :name="item.id">
                <span class="font1" :name="item.id">导演:</span>
                <span class="font2 elips1" :name="item.id">{{ item.director }}</span>
              </p>
              <p style="font-size: 12px;" :name="item.id">
                <span class="" style="border: 1px solid #000;padding: 0px 4px;" :name="item.id">{{ item.type }}</span>
                <!-- {{ item.showmark }} -->
                <span class="showmark"
                      :style="`display:${item.showmark==undefined?'none':'block'}`">{{ item.showmark }}</span>
              </p>
            </div>
          </div>
          <div class="filmright" :name="item.id">
            <!-- <p style="font-size: 13px;margin-left: 7vw;margin-top: 2vh;margin-right: 4vw;"><span style="font-size: 17px;color: #eda86e;">{{ 11.1}}万</span>人想看</p> -->
            <button class="pap" :id="item.id" :name="item.id" style="background-color: #40a6fb;">预 售</button>
          </div>
        </div>

      </van-tab>
    </van-tabs>

    <NavigationTab :active="0"></NavigationTab>
  </div>
</template>

<script>
import Loading from "@/components/loding.vue";
import NavigationTab from "@/components/NavigationTab.vue";
import Swiper from 'swiper'; // 引入的Swiper
import 'swiper/css/swiper.min.css'
import axios from "axios"
//引入
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
// 获取客服
import {getLogo} from "@/api/locality/login"
//调用热映电影列表
import {getFilmList, getFutureFilmList} from "@/api/film";
// 调用首页的轮播图
import {getIndexBannerList} from "@/api/locality/banner"
// 调用城市接口
import {getCityList, getDramaList} from "@/api/city";
// 调用地图
import BMap from "BMap"
import City from "@/components/City.vue";
// 调用加载组件
import EnterLoging from "@/components/EnterLoging";
import ShopList from "@/components/ShopList.vue";

export default {
  components: {ShopList, NavigationTab, Loading, City, EnterLoging},
  data() {
    return {
      info: "66666",
      isLoading: false,
      // baseUrl: require("../utils/baseurl.js").baseUrl,
      swiperimg: [],
      timestamp: null,
      searchtext: "",
      // swiper
      swiper: null,
      // 热映榜单
      swiperList: [],
      //正在热映列表
      hotfilmList: [],
      //即将上映列表
      futurefilmList: [],
      // 地图位置
      center: {lng: "", lat: ""},
      province: "",
      // 调用接口查询的所有城市
      cityList: [],
      city: "正在定位",
      cityid: null,
      // 是否搜索
      isSearch: true,
      // 查询每次十个
      num: 10,
      listlength: 0,
      modenumber: 0,  //可以加载多少次
      shengyu: 0,   //最后剩余多少条
      jishu: 0,
      kaquan_list1: [],
      kaquan_list2: [],
      loadingflag: false,
      kefu: "",
      count: 1,
      change: null,
      shopList: []
    }
  },
  watch: {
    // 监听搜索
    searchtext() {
      if (this.searchtext != "") {
        this.isSearch = false
        this.hotfilmList = this.filteredSearch(this.hotfilmList)
        this.futurefilmList = this.filteredSearch(this.futurefilmList)
      } else {
        this.getFilm()
        this.isSearch = true
        setTimeout(res => {
          this.getSwiper()
        }, 50)
      }
    }
  },
  methods: {
    toPer() {
      window.location.href = this.$store.state.perkUrl
    },
    // 跳转到福利专区
    gomemberindex() {
      this.$router.push({path: "/memberindex"})
    },
    //热映榜单跳转
    hotlist() {
      this.$router.push({path: "/hotlist", query: {cityid: '' + this.cityid}})
    },
    // 点击进入电影详情
    filmdetail(id) {
      this.$router.push({path: "/filmdetail", query: {id: '' + id, cityid: '' + this.cityid}})
    },
    // 搜索框搜索
    searchfilm() {
      this.isSearch = !this.isSearch
    },
    // 搜索
    filteredSearch(data) {
      if (this.searchtext == "") {
        return ""
      } else {
        return data.filter(data => {
          return data.name.toLowerCase().includes(this.searchtext.toLowerCase());
        });
      }
    },
    // 获取客服信息
    getLoginInfo() {
      getLogo().then(res => {
        if (res.code == 200) {
          this.kefu = res.data.zxkf
        }
      })
    },
    // 获取首页轮播图
    getallSwiper() {
      getIndexBannerList().then(res => {
        if (res.code == 200) {
          this.swiperimg = res.data.list
          this.kaquan_list1 = res.data.kaquan_list1
          this.kaquan_list2 = res.data.kaquan_list2
        } else {
        }
      })
    },
    gokefu() {
      window.location.href = this.kefu
      // window.open(this.kefu,"_blank")
    },
    // 地图获取当前定位
    createMap() {
      const geolocation = new BMap.Geolocation();
      var _this = this
      geolocation.getCurrentPosition(function getinfo(position) {
        let latitude = position.latitude
        let longitude = position.longitude
        let city = position.address.city.substring(0, position.address.city.length - 1); //获取城市信息
        let province = position.address.province;  //获取省份信息
        _this.center.lng = longitude;
        _this.center.lat = latitude;
        _this.province = province
        _this.city = city
        // seehotlist
        // 获取当前的城市
        _this.getCity()
      }, {enableHighAccuracy: true}, function (e) {
      }, {
        provider: 'baidu'
      });
    },
    // 买票票   暂无数据
    buyticket(item) {
      // var id = option.target.getAttribute("name")
      // var data = option.target.getAttribute("data")
      this.$router.push({
        path: "/multiplex",
        query: {id: '' + item.id, data: '' + item.playdate, cityid: '' + this.cityid, moveName: item.name}
      })
    },
    // 获取所有城市
    getCity(cityName) {
      let data = {
        method: "xuankua.city.list",
        ...this.$store.state.parameter,
      }
      let sign = this.$utils.getASCII(data)
      getCityList({
        ...data,
        sign: sign
      }).then(res => {
        // console.log(res, "444444444444444")
        this.cityList = res.data.cityList
        if (res.data.cityList) {
          for (var i = 0; i < this.cityList.length; i++) {
            if (cityName.includes(this.cityList[i].name)) {
              // 获取当前城市地址的id
              this.cityid = this.cityList[i].citycode
              sessionStorage.setItem("targetId",this.cityid)
              this.getFilm()
              this.getDramaProjectList()
            }
          }
        }
      })
    },
    //滚动条事件
    handleScroll(e) {
      // if (document.documentElement.scrollTop() + document.documentElement.height() >= document.height() - 40) {
      //     alert("1111")
      // }
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        if (this.jishu < this.modenumber - 1) {
          // alert("if")
          this.num = this.num + 10
          this.jishu++
          this.getFilm()
        } else {
          // alert("else")
          this.num = this.num + this.shengyu
        }
      }
      // 获取滚动内容的实际高度


      // if ((scrollTop+clientHeight) >= scrollHeight) {
      // 	// 没有数据后，不触发请求
      //   alert(111);

      // }

    },
    //获取热映列表
    getFilm() {
      this.isLoading = true
      let data = {
        method: "xuankua.movie.hot.list",
        citycode: this.cityid,
        appkey: this.$store.state.appkey,
        timestamp: this.timestamp.toString(),
        v: "1.0"
      }
      let sign = this.$utils.getASCII(data)
      getFilmList({
        ...data,
        sign: sign,
      }).then(res => {
        if (res.code == 200) {
          this.listlength = res.data.movieList.length
          this.modenumber = parseInt(res.data.movieList.length / 10)
          this.shengyu = res.data.movieList.length % 10
          this.hotfilmList = []
          this.hotfilmList = res.data.movieList
          if (this.count == 1) {
            // 获取前十个热映榜单列表
            if (res.data.movieList.length >= 10) {
              for (var i = 0; i < 10; i++) {
                this.swiperList.push(this.hotfilmList[i])
              }
            } else {
              for (var i = 0; i < res.data.movieList.length; i++) {
                this.swiperList.push(this.hotfilmList[i])
              }
            }
            this.count = 2
          }

          // this.isLoading = false
        }

      })
    },
    //获取即将上映电影列表
    getFutureFilm() {
      this.isLoading = true
      let data = {
        method: "xuankua.movie.future.list",
        citycode: this.cityid,
        appkey: this.$store.state.appkey,
        timestamp: this.timestamp.toString(),
        v: "1.0"
      }
      let sign = this.$utils.getASCII(data)
      getFutureFilmList({
        ...data,
        sign: sign
      }).then(res => {
        if (res.code == 200) {
          this.isLoading = false
          this.futurefilmList = res.data.movieList
        }

      })
    },
    // banner轮播图
    getSwiper() {
      this.swiper = new Swiper(".swiper-container", {
        loop: false, // 无缝
        autoplay: { //自动开始
          delay: 3000, //时间间隔
          disableOnInteraction: false, //*手动操作轮播图后不会暂停*
        },
        grabCursor: true,
        paginationClickable: true,
        slidesPerView: 3.7, // 一组三个
        spaceBetween: 2, // 间隔
        // 窗口变化,重新init,针对F11全屏和放大缩小,必须加
        observer: true,
        observeParents: true,
        // 如果需要分页器
      })
    },
    // 专享福利左侧跳转
    godetail(option) {
      var id = option.target.getAttribute('id')
      this.$router.push({path: "/memberindex", query: {id: '' + id}})
    },
    // 专享福利右侧跳转
    gomusicmember(num) {
      if (num == 5 || num == 8 || num == 9) {
        this.$router.push({path: "/musicmember"})
      } else if (num == 6) {
        this.$router.push({path: "/memberindex", query: {id: '' + num - 1}})
      } else {
        this.$router.push({path: "/readmember"})
      }
    },
    // 获取演出列表
    getDramaProjectList() {
      // method
      // cityCode
      // cateId
      // pageNo
      // pageSize
      // projectName
      let data = {
        method: "xuankua.drama.dramaProjectList",
        cityCode: this.cityid,
        pageNo: 1,
        pageSize: 25,
        ...this.$store.state.parameter,
      }
      let sign = this.$utils.getASCII(data)
      getDramaList({
        sign: sign,
        ...data
      }).then(res => {
        // console.log(res, "列表")
        if (res.code == 200) {
          this.shopList = res.data.records
        }
      })
    },
  },
  mounted() {
    // this.messageinfo()
    window.addEventListener('scroll', this.handleScroll);
    this.getLoginInfo()
    this.getSwiper()
    //获取正在热播
    this.getFilm()
    // 获取即将上映电影列表
    this.getFutureFilm()
    // 获取轮播图
    this.getallSwiper()
    if(this.$route.query.change==1){
      this.getCity(sessionStorage.getItem("cityName"))
    }else{
      this.getDramaProjectList()
    }

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll, false);
    window.onresize = null;

  },
  created() {
    // 加载
    this.loadingflag = true
    var _this = this
    setTimeout(function () {
      _this.loadingflag = false
    }, 1200)
    // 是微信端浏览器——公众号
    // let APPID = "wx05cc5223511e93c3";
    this.timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
    //判断url是否传过来值，若没传过来则证明为刚进网站，若有值则证明去地址页面选择了地址
    this.city = sessionStorage.getItem("cityName")
    this.cityid = Number(sessionStorage.getItem("targetId"))
    this.change = sessionStorage.getItem("change")
  },
}
</script>
<style scoped lang="less">
// height: 100vh; 
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
}

html, body {
  height: 100%;
}

.content {
  height: 100%;
  // overflow-y: scroll;
}

/* // 提示框 */

.elips1 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 500;
  width: 100% !important;
}

.van-tabs__nav {
  background-color: transparent !important;
}

.indexwrap {
  width: 100vw;
  overflow-y: scroll;
  min-height: calc(100vh - 50px);
  background-color: #ffe9c4;
  overflow: hidden;
}

.indexwrap .logonum {
  position: absolute;
  top: 0px;
  left: 5px;
  width: 5.5vw;
  height: auto;
}

.indexwrap .header {

  height: 60px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.indexwrap .header .headerleft, .headercenter, .headerright {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.indexwrap .header .cross, .service, .ellipsis, .arrow-down {
  color: #fff;

}

.indexwrap .header .headercenter {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.indexwrap .header .headercenter .search {
  position: absolute;
  left: 7%;

}

.indexwrap .header .headercenter .inp {
  // width: 70%;
  width: 82%;
  height: 35px;
  border-radius: 50px;
  border: none;
  padding-left: 16%;
  background-color: #f0aaa7;
  font-size: 14px;
}

.indexwrap .header .headerleft .address {
  margin-left: 10px;
  height: 100%;
  display: flex;
  align-items: center;
}

.indexwrap .header .headerleft .address span {
  font-size: 15px;
  color: #fff;
  margin-right: 3px;
}

/* banner部分 */
.indexwrap .banner {
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  //height: 190px;
}

.indexwrap .banner .my-swipe {
  //height: 135px;
  //height: 21vh;
}

.indexwrap .banner .my-swipe /deep/ .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  border-radius: 10px;
}

.indexwrap .banner .my-swipe /deep/ .van-swipe-item img {
  background-size: cover;
  border-radius: 10px;
}

.indexwrap .banner /deep/ .van-swipe__indicator {
  background-color: #fff;
}

.indexwrap .welfare {
  //height: 210px;
  background-image: linear-gradient(to bottom, #FFEEDC, #FFCFC1);
  margin: 3px 15px 15px;
  border-radius: 8px;
}

.indexwrap .welfare .welfarebox {
  width: 100%;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  padding: 0px 10px 8px;
  box-sizing: border-box;
  justify-content: space-between;
}

.indexwrap .welfare .welfarebox .left {
  width: 48%;
  /* background-color: red; */
  //margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 5px;
}

.indexwrap .welfare .welfarebox .left .leftimgbox {
  width: 48%;
  overflow: hidden;
}

.indexwrap .welfare .welfarebox .left .leftimgbox img {
  width: 100%;
  /* height: 200px; */
}

.indexwrap .welfare .welfarebox .right {
  width: 48%;
  display: flex;
  flex-wrap: wrap;
  /* margin: 5 0px; */
  //padding: 5px 10px;
  justify-content: space-between;
  gap: 5px;
}

.indexwrap .welfare .welfarebox .right .wrap1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 27%;
}

.indexwrap .welfare .welfarebox .right .circle {
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: none;
  width: 100%;
  overflow: hidden;
}

.indexwrap .welfare .welfarebox .right .circle img {
  flex: none;
  width: 100%;
}

.indexwrap .welfare .welfarebox .right span {
  color: #9d5616;
  font-size: 12px;
}


/* 热映榜单标题 */
.indexwrap .hotsize {
  margin-left: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.indexwrap .hotsize span {
  font-size: 13px;
  //color: gray;
  font-weight: bold;
  color: #A1978C;
}

.indexwrap .hotsize .hoticon {
  margin-left: 3px;
  margin-right: 10px;
  margin-top: 2px;
}

.indexwrap /deep/ .van-tab {
  flex: none !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  color: #333 !important;

}

.indexwrap /deep/ .van-tab--active {
  color: red !important;
  font-weight: 600 !important;
}


.indexwrap /deep/ .van-tabs__nav {
  background-color: transparent !important;
  margin-left: 8px;
}

.indexwrap /deep/ .van-hairline--top-bottom::after {
  border: none !important;
}

/* 热映榜单 */
.indexwrap .imgbox {
  width: 23vw;
  // height: 116px;
  height: 17vh;

  border-radius: 5px;

  overflow: hidden;
}

/* .indexwrap .hot{
  overflow: hidden;
} */
.indexwrap .hot .hotimg {

  width: 100%;
  height: auto;
  // text-align: center;


}

.indexwrap .hot .hotname {
  width: 23vw;
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
}

.indexwrap .hot button {
  width: 18vw;
  height: 3vh;
  font-size: 13px;
  color: #fff;
  border: none;
  background-color: red;
  border-radius: 50px;
  display: block;
  margin: 0 auto;
  margin-top: 8px;
  padding: 4px 0px 5px;
  box-sizing: content-box;
}

.indexwrap .filmbox {
  gap: 18px;
  justify-content: space-between;
}

.indexwrap .filmbox .filmleft {
  overflow: hidden;
  width: 68%;
}

/* 正在热映 */
.indexwrap .filmbox .filmleft p {
  margin-top: 10px;
  display: flex;
  white-space: nowrap;

}

.indexwrap .filmbox .filmleft p:nth-of-type(1) {
  margin-top: 10px;
}

.indexwrap .filmbox .filmleft .font1 {
  color: #333;
  font-size: 13px;
}

.indexwrap .filmbox .filmleft .font2 {
  color: #000;
  font-size: 13px;
  margin-left: 3px;
  display: inline-block;
  width: 26vw;
}

.indexwrap .filmbox .filmleft .showmark {
  border: 1px solid #000;
  margin-left: 5px;
  padding-left: 3px;
  margin-right: 3px;
  padding: 0px 4px;
  padding-top: 2px;
  box-sizing: content-box;
}

.indexwrap .filmbox .filmleft img {
  width: 23vw;
  height: auto;
  margin-left: 15px;
  margin-top: 11px;
  float: left;
  margin-right: 5px;
  border-radius: 5px;
}

.indexwrap .filmbox .filmright {
  width: 20%;
  padding-right: 15px;
  position: absolute;
  right: 10px;
}

.indexwrap .filmbox .filmright button {
  border: none;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: red;
  margin-top: 2vh;
  padding: 4px 19px 5px;
  box-sizing: content-box;
}

/deep/ .van-tabs__wrap {
  position: static;
}

/deep/ .van-tabs--line {
  padding-top: 0px;
}

// /deep/.van-dialog {
//     border-radius: 20px;
// }
// /deep/ .van-dialog__message {
//     background-color: #F61D28;
// }

.birthdayBox {
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 8px;
  //background-color: white;
  border-radius: 10px;

  .birthday {
    display: flex;
    gap: 3px;
    padding: 3px 0px 5px;

    .listItem {
      width: 100%;
      padding-bottom: 5px;
      padding: 0px 1px 3px;
      border-radius: 5px;

      .textInfo {
        font-size: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2; /* 显示两行 */
        margin-top: 5px;
      }

      .hotText {
        color: #F0585E;
        border-radius: 30px;
        //text-align: center;
        font-size: 12px;
        //width: 70%;
        margin: auto;
        position: relative;
        z-index: 2;
        padding: 2px 0px;
        margin-top: 6px;
      }

      .title {
        font-size: 12px;
        font-weight: bold;
        color: #313131;
        padding-top: 3px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2; /* 显示两行 */
      }

      .shopInfo {
        padding: 0px 6px;
      }


      .oprice {
        font-size: 10px;
        color: #A1A1A1;
        text-decoration: line-through;
      }
    }
  }
}


.birthdayBox::-webkit-scrollbar {
  display: none
}
.pap{
  white-space: nowrap;
}
</style>