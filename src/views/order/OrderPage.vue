<template>
  <div class="orderpage">
    <ReturnBack :rcolor="'#fff'" :bcolor="'#00000087'"></ReturnBack>
    <div class="orderpagebox">
      <!-- <h3 style="text-align: center;padding-top: 5px;padding-bottom: 5px;">悦享聚汇</h3> -->
      <div class="header">
        <p>{{ orderDetail.cinemaname }}</p>
<!--        <p>-->
          <!-- https://apis.map.qq.com/tools/poimarker?type=1&keyword=酒店&center=39.908491,116.374328&radius=1000&key=yourkey&referer=myapp -->
<!--          <a href="https://apis.map.qq.com/tools/poimarker?type=1&keyword="+orderDetail.moviename+"&center=CurrentLocation&radius=1000&key=DSXBZ-EBSKJ-S5RFL-D2FUH-JP5H3-LDFLS&referer=joyful-gathering">-->
<!--            <van-icon name="location-o" size="22px" style="margin-right: 3vw;"/>-->
<!--          </a>-->
          
<!--          <a href="tel:12315" style="margin-top: 10px;">-->
<!--            <van-icon color="#fff" name="phone-o" size="22px"/>-->
<!--          </a>-->
         
<!--        </p>-->
      </div>
      <div class="orderinfo" style="padding-left: 5vw;padding-right: 5vw;padding-top: 20px;">
        <p style="font-size: 1.2em;font-weight: 600;">{{ orderDetail.moviename }}</p>
        <p style="font-size: 0.8em;margin-top: 10px;">{{ orderDetail.edition }} &nbsp; {{ orderDetail.quantity }}张</p>
        <p style="margin-top: 12px;font-size: 0.8em;display: flex;align-items: center;">
          <span style="white-space: nowrap">{{ playdata }}</span>
          <span style="margin-left: 7vw;display: inline-block;width: 115px;">{{ orderDetail.roomname }}</span>
        </p>
        <p style="margin-top: 10px;display: flex;">
          <span style="font-size: 1em;font-weight: 600;">{{playtime}}</span>
          <ul style="width: 129px;padding-left:19px;font-size: 0.8em;font-weight: 600;white-space: nowrap"  v-if="orderDetail.seats">
            <li v-for="(item,index) in orderDetail.seats.split(',')" :key="index" style="float: left;width: 50%;">
              <span v-if="(index+1)%2==0" style="padding-left: 2px;padding-right: 4px;color:#E1E1E1"> &nbsp;|</span>
              {{ item }}
            </li>
          </ul>
          <img :src="orderDetail.movielogo" alt="" style="width: 80px;position: absolute;right: 30px;top: 20px;border-radius: 5px;">
        </p>
        <div>
          
        </div>
        <p style="display: flex;justify-content: center;align-items: center;font-weight: 600;position: absolute;bottom: 12px;left: 0;right: 0;">
          <span v-if="orderstatus=='N'" style="margin-top: 4px;">
            <span @click="gozhifu()">去支付</span>
          </span>
          <span v-if="orderstatus=='C'" style="padding-top: 4px;">
            已取消
          </span>
          <!-- E -->
          <span v-if="orderstatus=='E'" style="padding-top: 4px;">
            订单失效
          </span>
          <span v-if="orderstatus=='P'" style="padding-top: 4px;">
            待出票
          </span>
          <span v-if="orderstatus=='T'" style="padding-top: 4px;">
            处理中
          </span>
          <!-- S -->
          <span v-if="orderstatus=='S'" style="padding-top: 4px;">
            <span>{{ info }}</span>
          </span>
          <span v-if="orderstatus=='F'" style="padding-top: 4px;">
            出票失败
          </span>
          <span v-if="orderstatus=='R'" style="padding-top: 4px;">
            已退款
          </span>
        </p>
      </div>
      <div class="orderdetail">
        <p style="font-size: 1.3em;font-weight: 600;color: #000;margin-bottom: 5px;">订单详情</p>
        <p>
          <span style="color: #333;">订单状态:</span>&nbsp;&nbsp;
          <span class="colorback" v-if="orderstatus=='N'" style="margin-top: 4px;">
            待支付
          </span>
          <span class="colorback" v-if="orderstatus=='C'" style="margin-top: 4px;">
            已取消
          </span>
          <span class="colorback" v-if="orderstatus=='E'" style="margin-top: 4px;">
            订单失效
          </span>
          <span class="colorback" v-if="orderstatus=='P'" style="margin-top: 4px;">
            待出票
          </span>
          <span class="colorback" v-if="orderstatus=='T'" style="margin-top: 4px;">
            处理中
          </span>
          <span class="colorback" v-if="orderstatus=='S'" style="margin-top: 4px;">
            出票成功
          </span>
          <span class="colorback" v-if="orderstatus=='F'" style="margin-top: 4px;">
            出票失败
          </span>
          <span class="colorback" v-if="orderstatus=='R'" style="margin-top: 4px;">
            已退款
          </span>
        </p>
        <p>
          <span style="color: #333;">应付金额:</span>&nbsp;&nbsp;
          <span class="colorback">￥{{ orderDetail.showamount }} ({{ orderDetail.quantity }}张电影票)</span>
        </p>
        <p>
          <span style="color: #333;">手机号码:</span>&nbsp;&nbsp;
          <span class="colorback">{{ orderDetail.mobile }}</span>
        </p>
        <p>
          <span style="color: #333;">订单号码:</span>&nbsp;&nbsp;
          <span class="colorback">{{ orderDetail.order_id }}</span>
        </p>
        <p>
          <span style="color: #333;">订单时间:</span>&nbsp;&nbsp;
          <span class="colorback">{{ ordertime }}</span>
        </p>
      </div>
      <div class="orderphoneinfo" v-if="order.smscontent">
        <span style="font-weight: 600;color: #000;">取票短信: {{ order.smscontent }}</span>
      </div>
      <div class="notice">
        <p style="color: #000;font-weight: 600;font-size: 1.4em;margin-bottom: 10px;">{{ single.title }}</p>
        <div class="single" v-html="single.content"></div>
      </div>
    </div>
    <NProgress v-if="loadingflag"/>
  </div>
</template>

<script>
//引入
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import {getmoveOrderList} from "@/api/locality/order";
import {getCinemaDetail} from "@/api/cinema";
export default {

  data() {
    return {
      orderDetail: [],
      order:{},
      ordertime:"",
      single: {},
      // 选择的座位列表
      seatlist:[],
      // 开始日期
      playdata:"",
      // 开始时间
      playtime:"",
      // 订单状态
      orderstatus:"",
      // 取票列表
      tickcodelist:[],
      timestamp:"",
      info:"",
      loadingflag:false
    };
  },
  mounted() {
    this.timestamp  = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
  },

  methods: {
    timestampToTime(time) {
      // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var date = new Date(time * 1000)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let m = date.getMinutes()
      m = m < 10 ? ('0' + m) : m
      let s = date.getSeconds()
      s = s < 10 ? ('0' + s) : s
      return y + '-' + MM + '-' + d + " " + h + ":" + m + ":" + s
    },
    getmoveOrder(id) {
      let token = localStorage.getItem("token")
      getmoveOrderList({
        token, id
      }).then(res => {
        this.loadingflag=false
        if (res.code == 200) {
          if(res.data==""){
          }else{
            this.orderDetail = res.data.order_show
            
            this.single = res.data.single
            // 获取播放日期
            this.playdata=this.orderDetail.playtime.substring(0,10)
            // 获取播放开始时间
            this.playtime=this.orderDetail.playtime.substring(10,this.orderDetail.playtime.length-3)
            if(res.data.order){
              this.order=res.data.order
              if(res.data.order.smscontent){
                var s=res.data.order.smscontent.indexOf("凭")
                var end=res.data.order.smscontent.indexOf("至")
                this.info=res.data.order.smscontent.substring(s+1,end)
              }
              // 获取订单状态
              this.orderstatus=this.order.orderstatus
              // 获取取票列表
              if(this.order.tickcodeList){
                this.tickcodelist=this.order.tickcodeList
              }
            }
            // 计算播放结束时间
            this.cinemaid=this.orderDetail.cinemaid
            // 获取订单时间
            this.ordertime=this.timestampToTime(this.orderDetail.add_time)
          }
          
        }
      })
    },
    // getCinema(){
    //   let data = {
    //     method:"xuankua.cinema.detail",
    //     appkey: this.$store.state.appkey,
    //     timestamp: this.timestamp.toString(),
    //     v: "1.0",
        
    //   }
    //   let sign=this.$utils.getASCII(data)
    //   getCinemaDetail({
    //     ...
    //   })
    // },
    
    gozhifu(){
      var id=this.$route.query.id
      this.$router.push({path:"/paymentpage",query:{order:id,change:0}})
      // this.$router.push({path: "/orderInfo", })
    }
  },
  created() {

    //加载
    this.loadingflag=true
    this.getmoveOrder(this.$route.query.id)
    var s=''
  }
};
</script>
<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}
.colorback{
  color: #000;
}
.orderpage {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#f86c6a, #f0f0f0);
  padding-top: 10px;
  padding-bottom: 15px;
  position: absolute;
  box-sizing: border-box;
}

.orderpage .orderpagebox {
  width: 90vw;
  //height: 200px;
  margin: 0 auto;
  /* background-color: #ccc; */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.orderpage .orderpagebox .header {
  display: flex;
  height: 45px;
  line-height: 45px;
  justify-content: space-around;
  /* opacity: 0.5; */
  background: rgba(0, 0, 0, 0.1);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.orderpage .orderpagebox .header p:nth-of-type(1) {
  color: #fff;
}

.orderpage .orderpagebox .header p:nth-of-type(2) {
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.orderpage .orderpagebox .orderinfo {
  position: relative;
  top: -5px;
  width: 80vw;
  height: 205px;
  // background-color: #fff;
  border-radius: 10px;
}
.orderpage .orderpagebox .orderinfo{
  background: url(../../assets/bglogo.png) no-repeat;
  // background-size: cover;
  background-size: 100% 100%;
  margin-top: 5px;
  // height: 200px;
}

.orderpage .orderpagebox .orderdetail {
  // width: 100%;
  // height: 100;
  width: 80vw;
  height: 180px;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 20px;
  line-height: 25px;
  font-size: 0.8em;
  color: gray;
}

.orderpage .orderpagebox .orderdetail p {
  margin-top: 2px;
}

.orderpage .orderpagebox .orderphoneinfo {
  width: 80vw;
  // height: 90px;
  padding-bottom: 10px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 10px;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 11px;
  line-height: 25px;
  font-size: 0.8em;
  color: gray;
}

.orderpage .orderpagebox .notice {
  width: 80vw;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 10px;
  line-height: 25px;
  font-size: 0.8em;
  color: gray;
  padding: 20px 20px 25px;
}

.orderpage .orderpagebox .notice p {
  margin-top: 1px;
}

/deep/ .single p {
  margin: 0px;
}
</style>