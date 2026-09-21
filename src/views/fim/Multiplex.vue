<template>
  <!--  影城-->
  <div>
    <NProgress v-if="loadingflag"/>
    <!--    头部-->
    <div class="topPage">
      <!--      <div class="title">悦享聚汇</div>-->
      <div class="searchBox">
        <div>
          <!--      地址-->
          <City></City>
        </div>
        <div class="searchValue">
          <van-search background="#fff0" placeholder="输入影院搜索" @input="searchList" v-model="searchValue"/>
        </div>
      </div>
    </div>
    <!--   banner -->
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item class="bannerImg" v-for="item in bannerList" :key="item.id">
          <img class="img"
               :src=" item.img"
               alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--    center-->
    <div class="centerBox">
      <div class="address" :class="{chooseAddress:show}">
        <div class="choose" @click="chooseAddress">{{ region }}</div>
        <div class="pull-down" @click="chooseAddress">
          <van-icon class="" color="#564A3F" name="arrow-down" size="13px"/>
        </div>
      </div>
      <!--      区域选择-->
      <div>
        <div>
          <van-popup position="top" v-model="show">
            <div>
              <div class="content" @click="allRegion">
                <div class="addRegion">
                  <span :class="region=='请选择区域'?'':'region'">全部区域</span>
                  <span class="regionNum"
                        :class="region=='请选择区域'?'':'number'">{{ !hide ? allLength.length : total }}</span>
                </div>
                <div v-if="region == '请选择区域'">
                  <van-icon color="#ED3137" name="success" size="16px"/>
                </div>
              </div>
              <div class="content" v-for="item in countyList" :key="item.name" @click="changeRegion(item.name)">
                <div class="addRegion">
                  <span :class="{region:item.name != region}">{{ item.name }}</span>
                  <span class="regionNum" :class="{number:item.name!= region}">{{ item.num }}</span>
                </div>
                <div v-if=" item.name== region">
                  <van-icon color="#ED3137" name="success" size="16px"/>
                </div>
              </div>
            </div>
          </van-popup>
        </div>
      </div>
      <!--      列表-->
      <div class="listMax">
        <div class="listBox" v-for="(item,index) in allCinemaList" :key="index" @click="toDetail(item.id)">
          <div class="nameBox">
            <div class="nameNone">{{ item.name }}</div>
            <div class="detailAdress">{{ item.address }}</div>
          </div>
          <div class="form">{{ item.km }}km</div>
        </div>
      </div>
    </div>
    <div ref="bottom" style="height: 10px;"></div>
    <!--    导航tab-->
    <NavigationTab :active="1"></NavigationTab>
  </div>
</template>
<script>
import NavigationTab from "@/components/NavigationTab.vue";
import {getCinemaList, getFilmplace} from "@/api/cinema";
import BMap from "BMap"
import {getCityList, getCountyList} from "@/api/city";
import {getBannerList} from "@/api/locality/banner";
import City from "@/components/City.vue";
import wx from "weixin-js-sdk";
import {getLocations} from "@/api/locality/login";
// import {createMap} from '../utils/orientation'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Multiplex",
  components: {
    NavigationTab, City
  },
  data() {
    return {
      parameter: {
        appkey: this.$store.state.appkey,
        timestamp: this.$store.state.timestamp,
        v: "1.0",
      },
      searchValue: "",
      cinemaList: [],
      // 我的经纬度
      center: {lng: "", lat: ""},
      zoom: 10,
      location: '',
      distance: 0,
      show: false,
      countyList: [],
      total: 0,
      allCinemaList: [],
      pageNum: 0,
      pageSize: 100,
      page_no: 0,
      stopAdd: true,
      region: "请选择区域",
      bannerList: [],

      city: "正在定位",
      urlcityid: null,
      urldata: "",
      urlid: null,
      targetId: "",
      cityList: [],
      hide: true,
      cinemaids: "",
      iscinemaids: true,
      allLength: [],
      element: null,
      loadingflag: false,
      arry: [],
      arry1: [],
      allCinemaList1: [],
      info: {},
      moveName:""
    }
  },
  methods: {
    // 获取定位
    getLocation1() {
      let purl = /(Android)/i.test(navigator.userAgent) ? location.href.split('#')[0] : window.localStorage.getItem('scanUrl');
      getLocations({
        url: purl
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.info = res.data
          this.getSign()
        }
      })
    },
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 获取所有城市
    getCity() {
      let data = {
        method: "xuankua.city.list",
        ...this.parameter,
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
            if (this.cityList[i].name == this.city) {
              // 获取当前城市地址的id
              this.targetId = this.cityList[i].citycode
              // console.log(this.targetId, "getCitytargetId");
              // if (!this.hide) {
              // console.log("酸奶")
              this.getCinema()
              // } else {
              //   this.getCinema()
              // }
            }
          }
        }
      })
    },
    toDetail(id) {
      let moveId = ""
      if(this.moveName){
        moveId = this.moveName
      }
      this.$router.push({path: "/multiplexDetail", query: {id: id, city: this.city,moveId}})
    },
    getBanner() {
      // 影城-轮播图
      getBannerList().then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.bannerList = res.data.list
        }
      })
    },
    // 获取定位
    selcity(latitude, longitude) {
      var _this = this
      // let city = position.address.city.substring(0, position.address.city.length - 1); //获取城市信息
      // _this.city = city
      // let province = position.address.province; //获取省份信息
      _this.center.lng = latitude;
      _this.center.lat = longitude;
      // console.log(city)
      // // //距离差距
      // _this.distance = _this.getDistance(lat1,lng1,longitude,latitude)
      if (!sessionStorage.getItem("cityName")) {
        _this.getCity()
      } else {
        // if (!_this.hide) {
        //   _this.getAllCinema()
        //   // console.log(_this.getAllCinema());
        // } else
        // {
        _this.getCinema()
        // console.log(_this.getAllCinema());
        // }
      }
    },
    getSign() {
      //请求后端，获取微信签名信息
      let configData = {
        debug: false,
        appId: this.info.appid, // 必填，公众号的唯一标识
        timestamp: "" + this.info.time, // 必填，生成签名的时间戳
        nonceStr: this.info.nonceStr, // 必填，生成签名的随机串
        signature: this.info.signature,// 必填，签名
        jsApiList: ['getLocation']
      }
      console.log(configData)
      wx.config(configData);
      wx.ready((res1) => {
        wx.getLocation({
          type: 'wgs84',
          success: (res) => {
            this.selcity(res.longitude, res.latitude)
            sessionStorage.setItem("longitude", res.longitude)
            sessionStorage.setItem("latitude", res.latitude)
          }, fail: () => {
            // wx.getLocation({
            //   type: 'wgs84',
            //   success: (res) => {
            //     this.selcity(res.longitude, res.latitude)
            //     sessionStorage.setItem("longitude",res.longitude)
            //     sessionStorage.setItem("latitude",res.latitude)
            //   }, fail() {
            //     navigator.geolocation.getCurrentPosition(function (pos) {
            //       this.selcity(pos.longitude, pos.latitude)
            //       sessionStorage.setItem("longitude",pos.longitude)
            //       sessionStorage.setItem("latitude",pos.latitude)
            //     }, (error) => {
            //       // alert("定位失败");
            //       this.createMap2()
            //     });
            //   }
            // });
            this.createMap2()
          }
        });
      });
      wx.error(function (res) {
      });
    },
    createMap2() {
      var _this = this
      if (_this.center.lng == '' || _this.center.lng == null) {
        //获取经纬度
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (position) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(position.point);
            let latitude = position.latitude
            let longitude = position.longitude
            let city = position.address.city.substring(0, position.address.city.length - 1); //获取城市信息
            _this.city = city
            let province = position.address.province; //获取省份信息
            _this.center.lng = longitude;
            _this.center.lat = latitude;
            // console.log(city)
            // // //距离差距
            // _this.distance = _this.getDistance(lat1,lng1,longitude,latitude)
            if (!sessionStorage.getItem("cityName")) {
              _this.getCity()
            } else {
              // if (!_this.hide) {
              //   _this.getAllCinema()
              //   // console.log(_this.getAllCinema());
              // } else {
              _this.getCinema()
              // console.log(_this.getAllCinema());
              // }
            }
          }
        }, {enableHighAccuracy: true});
      }
    },
    createMap() {
      var _this = this
      if (_this.center.lng == '' || _this.center.lng == null) {
        //获取经纬度
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (position) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(position.point);
            let latitude = position.latitude
            let longitude = position.longitude
            let city = position.address.city.substring(0, position.address.city.length - 1); //获取城市信息
            _this.city = city
            let province = position.address.province; //获取省份信息

            if (_this.isWeiXin()) {
              if (sessionStorage.getItem("longitude")) {
                _this.center.lng = sessionStorage.getItem("longitude");
                _this.center.lat = sessionStorage.getItem("latitude")
                // console.log(city)
                // // //距离差距
                // _this.distance = _this.getDistance(lat1,lng1,longitude,latitude)
                if (!sessionStorage.getItem("cityName")) {
                  _this.getCity()
                } else {
                  // if (!_this.hide) {
                  //   _this.getAllCinema()
                  //   // console.log(_this.getAllCinema());
                  // } else {
                  _this.getCinema()
                  // console.log(_this.getAllCinema());
                  // }
                }
              } else {
                _this.getLocation1()
              }
            } else {
              _this.center.lng = longitude;
              _this.center.lat = latitude;
              // console.log(city)
              // // //距离差距
              // _this.distance = _this.getDistance(lat1,lng1,longitude,latitude)
              if (!sessionStorage.getItem("targetId")) {
                _this.getCity()
              } else {
                // if (!_this.hide) {
                //   _this.getAllCinema()
                //   // console.log(_this.getAllCinema());
                // } else {
                _this.getCinema()
                // console.log(_this.getAllCinema());
                // }
              }
            }

          }
        }, {enableHighAccuracy: true});
      }
    },
    // 计算距离
    getDistance(lat1, lng1, lat2, lng2) {
      let EARTH_RADIUS = 6378.137;
      let radLat1 = this.rad(lat1);
      let radLat2 = this.rad(lat2);
      let a = radLat1 - radLat2;
      let b = this.rad(lng1) - this.rad(lng2);
      let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
          + Math.cos(radLat1) * Math.cos(radLat2)
          * Math.pow(Math.sin(b / 2), 2)));
      s = s * EARTH_RADIUS;
      //s = Math.round(s * 10000d) / 10000d;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(2);    //乘以1000是换算成米
      // console.log(s," km")
      this.distance = s
      return s;
    },
    rad(d) {
      return d * Math.PI / 180.0;
    },
    getCinema(page_no = this.page_no) {
      // console.log(this.page_no, "this.page_no")
      let data = {
        ...this.parameter,
        method: "xuankua.cinema.list",
        citycode: this.targetId,
        page_no: page_no,
        per: 10
      }
      let sign = this.$utils.getASCII(data)
      getCinemaList({
        ...data,
        sign
      }).then(res => {
        // console.log(res)
        if (res.code == 200) {
          this.total = res.data.pagination.item_total
          // console.log(res.data.cinemaList.length,"eeeeeeeeeeee")
          let num = Math.round(Math.ceil(this.total / 10))
          // console.log(num,"num")
          if (num == 1) {
            this.stopAdd = false
          }
          // console.log(this.page_no,"4545454545454545454545454545")
          if (this.page_no == 1 || this.page_no == 0) {
            let forNum = Math.ceil(this.total / 100)
            if (forNum > 1) {
              for (var i = 0; i < forNum; i++) {
                this.getAllCinema(i)
              }
            } else {
              // console.log("444444")
              this.getAllCinema()
            }
            this.cinemaList = []
          }
          // res.data.cinemaList.forEach(item => {
          //   this.cinemaList.push({
          //     ...item,
          //     km: this.getDistance(item.lat, item.lon, this.center.lat, this.center.lng,)
          //   })
          //   // 根据距离排序
          //   // console.log(this.cinemaList);
          // })
        }
      })
    },
    chooseAddress() {
      this.show = !this.show
    },
    // 获取所有影院
    getAllCinema(pageNum = this.pageNum, pageSize = this.pageSize) {
      this.arry = []
      this.arry1 = []
      this.allCinemaList1 = []
      this.allCinemaList = []
      // console.log(this.targetId, "targetId2222222222222222");
      if (this.page_no == 0) {
        this.allCinemaList = []
      }
      let data = {
        ...this.parameter,
        method: "xuankua.cinema.list",
        citycode: this.targetId,
        page_no: pageNum,
        per: pageSize
      }
      let sign = this.$utils.getASCII(data)
      getCinemaList({
        ...data,
        sign
      }).then(res => {
        if (res.code == 200) {
          res.data.cinemaList.forEach(item => {
            this.arry.push({
              ...item
            })
          })
          this.getCounty()
          if (this.page_no == 0) {
            this.allCinemaList = []
          }
          // console.log(res,"全部")
          this.arry1 = []
          this.arry.forEach(item => {
            this.arry1.push({
              ...item,
              km: this.getDistance(item.lat, item.lon, this.center.lat, this.center.lng,)
            })
          })
          this.allCinemaList1 = this.arry1.sort((a, b) => a.km - b.km)
          if (this.urlcityid) {
            this.getFilmplaceInfo()
            return
          }
          this.allCinemaList = this.arry1.sort((a, b) => a.km - b.km)
        }
        this.loadingflag = false
      })
    },
    // 获取区
    getCounty() {
      this.countyList = []
      let data = {
        ...this.parameter,
        method: "xuankua.county.list",
        citycode: this.targetId,
      }
      let sign = this.$utils.getASCII(data)
      getCountyList({
        ...data,
        sign
      }).then(res => {
        if (res.code == 200) {
          this.countyList = []
          res.data.countyList.forEach(item => {
            var num = 0
            if (!this.hide) {
              setTimeout(() => {
                num = this.allCinemaList.filter(item2 => item.name === item2.countyname).length
                this.countyList.push({
                  name: item.name,
                  num: num
                })
              }, 500)
            } else {
              num = this.allCinemaList.filter(item2 => item.name === item2.countyname).length
              this.countyList.push({
                name: item.name,
                num: num
              })
            }

          })
          // console.log(this.countyList)
        }
      })
    },
    // 搜索框
    searchList() {
      // this.region = "请选择区域"
      this.page_no = 0
      var changeArry = []
      changeArry = this.allCinemaList1
      this.cinemaList = []
      if (!this.hide) {
        changeArry = []
        this.getFilmplaceInfo()
        return
      }
      if (this.searchValue != "") {
        // console.log(this.region, "this.region")
        if (this.region == "请选择区域") {
          changeArry = changeArry.filter(item => item.name.includes(this.searchValue))
        } else {
          changeArry = changeArry.filter(item => item.name.includes(this.searchValue) && item.countyname == this.region)
        }
      } else {
        if (this.region == "请选择区域") {
          this.getCinema()
        } else {
          changeArry = changeArry.filter(item => item.countyname == this.region)
        }
      }
      this.allCinemaList = changeArry
    },
    allRegion() {
      this.show = false
      if (!this.hide) {
        this.getFilmplaceInfo()
      } else {
        this.getCinema()
      }
      this.region = "请选择区域"
    },
    // 选择区域
    changeRegion(name) {
      this.searchValue = ""
      // console.log(this.seletId)
      this.region = name
      this.page_no = 0
      var changeArry = []
      changeArry = this.allCinemaList1
      this.cinemaList = []
      if (!this.hide) {
        changeArry = []
        this.getFilmplaceInfo()
      } else {
        changeArry = changeArry.filter(item => item.countyname.includes(name))
      }
      this.allCinemaList = changeArry
      this.show = false
    },
    // handleScroll() {
    //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //   let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    //   let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    //   if (scrollTop + clientHeight >= scrollHeight-100 && this.searchValue == "" && this.iscinemaids && this.hide) {
    //    this.loadMore();
    //   }
    //
    // },
    // loadMore() {
    //   if (this.stopAdd && this.region == "请选择区域") {
    //     this.getCinema(this.page_no)
    //     this.page_no++;
    //     this.isLoading = false;
    //   }
    // },
    // 获取有购票电影的影院id
    getFilmplaceInfo() {
      let data = {
        ...this.parameter,
        method: "xuankua.movie.play.cinema.list",
        citycode: Number(this.urlcityid),
        movieid: Number(this.urlid),
        // playdate: this.urldata + ''
      }
      let sign = this.$utils.getASCII(data)
      // console.log(data)

      getFilmplace({
        sign: sign,
        ...data
      }).then(res => {
        this.allCinemaList = []
        // console.log(res)
        this.loadingflag = false
        if (res.code == 200) {
          this.cinemaList = []
          this.allLength = []
          this.iscinemaids = false
          // if(res.data.cinemaids!=""){
          this.cinemaids = res.data.cinemaids.split(",")
          // this.cinemaids = "4378,4284".split(",")
          // console.log(this.cinemaids, " this.cinemaids")
          var changeArry = []
          changeArry = this.allCinemaList1
          this.cinemaids.forEach(item2 => {
            changeArry.filter(item => {
              if (item.id == item2) {
                this.allLength.push(item)
              }
            })
            if (this.searchValue != "") {
              // console.log(this.region, "this.region")
              if (this.region == "请选择区域") {
                changeArry.filter(item => {
                  if (item.id == item2 && item.name.includes(this.searchValue)) {
                    this.allCinemaList.push(item)
                  }
                })
              } else {
                changeArry.filter(item => {
                  if (item.id == item2 && item.name.includes(this.searchValue) && item.countyname == this.region) {
                    this.allCinemaList.push(item)
                  }
                })
              }
            } else {
              if (this.region == "请选择区域") {
                changeArry.filter(item => {
                  if (item.id == item2) {
                    this.allCinemaList.push(item)
                  }
                })
              } else {
                changeArry.filter(item => {
                  if (item.id == item2 && item.countyname == this.region) {
                    this.allCinemaList.push(item)
                  }
                })
              }
            }
            // else {
            //   changeArry = changeArry.filter(item => item.id == item2)
            // }
          })
          this.allCinemaList = this.allCinemaList.sort((a, b) => a.km - b.km)
          // }
        }
      })
    }
  },
  created() {
    // 
    this.loadingflag = true
    this.getBanner()
    // 获取点击购票按钮传过来的数据
    this.urlcityid = Number(this.$route.query.cityid)
    this.urlid = Number(this.$route.query.id)
    this.urldata = this.$route.query.data
    this.moveName = this.$route.query.moveName
    if (this.urlcityid) {
      this.hide = false
    }
    if (sessionStorage.getItem("cityName")) {
      this.targetId = sessionStorage.getItem("targetId")
      this.city = sessionStorage.getItem("cityName")
    }
    this.createMap()
    // this.arry = []
    // this.arry1 = []
    // this.allCinemaList1 = []
    // this.allCinemaList = []
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    // this.element = document.documentElement
    this.page_no = 0
  },
  // beforeDestroy() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // },
}
</script>
<style scoped lang="less">
//头部
.topPage {
  background-image: linear-gradient(to bottom, #F93B37, #FB806F);
  padding: 5px 15px 5px;

  .title {
    text-align: center;
    color: white;
    font-size: 14px;
  }

  .address {
    display: flex;
    align-items: center;
    gap: 8px;
    color: white;
  }

  .searchBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }


  .searchValue {
    width: 80%;
  }

  .van-search {
    padding-right: 5px;
  }

  .van-search .van-cell {
    background-color: transparent;
  }

  .van-search__content {
    background-color: #F0BAB4;
    border-radius: 30px;
  }

  /deep/ .van-field__control {
    color: #92716D;
  }
}

//banner
.banner {
  background-color: #92716D;
  width: 100%;
  //height: 168px;
  //height: 21vh;
  overflow: hidden;
}

//center
.centerBox {
  background-image: linear-gradient(to right, #FFE8C3, #FEE9C4);
  padding: 0px 10px 62px;
  min-height: calc(100vh - 76px - 23vh - 99px);
  position: relative;
  margin-top: -5px;

  .choose {
    font-weight: bold;
    color: #564A3F;
  }

  .pull-down {
    width: 12px;
    height: 13px;
  }

  .listMax {
    margin-top: 10px;
  }

  .listBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    padding: 18px 15px;
    border-radius: 5px;
    font-weight: 600;
    color: #393939;
    margin-top: 13px;

    .nameBox {
      width: 80%;
    }

    .nameNone {
      white-space: nowrap;
      overflow: hidden;
      width: 85%;
      text-overflow: ellipsis;
      font-weight: bold;
    }

    .detailAdress {
      color: #727272;
      font-size: 12px;
      font-weight: 500;
      margin-top: 7px;
      white-space: nowrap;
      overflow: hidden;
      width: 90%;
      text-overflow: ellipsis;
    }

    .form {
      color: #EE4D53;
      font-size: 13px;
    }
  }
}

//弹框选择地址
.van-overlay {
  background-color: rgba(0, 0, 0, .5);
}

.van-popup {
  top: 38px;
  width: 100%;
  transition: none;
  height: calc(49vh - 60px);
  position: absolute;
}

.chooseAddress {
  position: relative;
  z-index: 55555;
  background-color: white;
  width: calc(100% + 20px);
  left: -10px;
  border-bottom: 1px #A4A4A4 solid;
  //font-size: 13px;
}

.addRegion {
  color: #EC2B31;
  font-weight: bold;
  font-size: 13px;
}

.regionNum {
  padding-left: 13px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #E5E5E5 solid;
  padding: 10px 20px;
}

.number {
  color: #A2A2A2;
}

.region {
  color: #070707;
}

.address {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #433B32;
  justify-content: center;
  padding: 10px 0px;
}

.pull-down {
  width: 12px;
  height: 12px;
}

.city {
  white-space: nowrap;
}
</style>