<template>
  <div class="cardinfo">
    <NProgress v-if="loadingflag"/>
    <!--    <ReturnBack :rcolor="'#fff'" :bcolor="'#00000087'"></ReturnBack>-->
    <div class="cardbody">
      <!-- 提货券 -->
      <!-- 超级卡 -->
      <div v-for="(item,index) in cardinfo" :id="item.pid" :key="index">
        <div class="card1" :style="'backgroundImage:url('+cardInfo.xingshi.flkbgimg+')'">
          <div class="cardaccountBox"  :style="'color:'+cardInfo.xingshi.flkztcolor+''">
            <div class="cardaccount">{{ cardInfo.num }}</div>
            <div class="cardaccount cardaccount2">
              <span>余额(点):</span>
              <span>{{ cardInfo.price }}</span>
              <span style="padding-left: 6px">有效期:</span>
              <span>{{ timestampToTime(cardInfo.end_time) }}</span>
            </div>
          </div>
          <div class="right">

          </div>
        </div>
      </div>
      <ul class="list">
        <li @click="goconsumptionRecords()">
          <p>
            <img src="../../assets/card/Group 868.png" alt="">
            <span>消费记录</span>
          </p>
          <van-icon size="20px" color="gray" name="arrow"/>
        </li>
        <li @click="goRechargeRecords()">
          <p>
            <img src="../../assets/card/Group 866.png" alt="">
            <span>充值记录</span>
          </p>
          <van-icon size="20px" color="gray" name="arrow"/>
        </li>
        <li @click="goIndex" style="border: none">
          <p>
            <img src="../../assets/card/Group 908.png" alt="">
            <span>去使用</span>
          </p>
          <van-icon size="20px" color="gray" name="arrow"/>
        </li>
        <!--        <li @click="delCard" style="border: none">-->
        <!--          <p>-->
        <!--            <img src="../../assets/fukaxq/del.png" alt="">-->
        <!--            <span>删除提货券</span>-->
        <!--          </p>-->
        <!--          <van-icon size="20px" color="gray" name="arrow"/>-->
        <!--        </li>-->
      </ul>
    </div>
    <!--    <div class="footer">-->
    <!--      <van-button type="danger" class="btn" @click="toRecharge">充 值</van-button>-->
    <!--    </div>-->
  </div>
</template>
<!-- sendPhonecode(){
  sendCode({
    phone:this.phone,
  }).then(res=>{
    // console.log(res);
    if(res.data!=undefined){
      this.showSuccessToast(res.data)
    }
  })
}, -->

<script>
import {getCardInfo} from "@/api/minecard"
import {delcard, mergecards} from "@/api/locality/card";

export default {

  data() {
    return {
      token: null,
      list: null,
      num: 1,
      cardid: null,
      cardinfo: [],
      end_time: null,
      flag: null,
      loadingflag: false,
      pid: "",
      backImg: "",
      cardName: "",
      cardInfo: {}
    };
  },

  mounted() {
    this.token = localStorage.getItem("token")
    this.cardid = this.$route.query.cardid
    this.backImg = this.$route.query.backImg
    this.cardName = this.$route.query.cardName
    this.cardInfo = JSON.parse(this.$route.query.data)
    // console.log(this.cardInfo)
    // this.list.push(this.$route.query.id)
    // console.log(this.cardid);
    // this.getCards()
    this.getCards()
  },
  created() {

//加载
    this.loadingflag = true
  },

  methods: {
    delCard() {
      if (this.cardInfo.price != 0) {
        this.$toast("卡内有余额，无法删除")
        return
      }
      this.$dialog.confirm({
        title: '提示',
        message: '是否删除该提货券，删除后将不可使用',
        confirmButtonColor: 'red'
      }).then(() => {
        delcard({
          kid: this.cardid
        }).then(res => {
          this.$toast(res.msg)
          if (res.code == 200 && res.status == 3) {
            setTimeout(() => {
              this.$router.go(-1)
            }, 1000)
          }
        })
      }).catch(() => {
      })
    },
    // cjPay(){
    //   window.location.href = this.$store.state.shopUrl+"/index"
    // },
    toRecharge() {
      this.$router.push({path: "/package", query: {cardId: this.cardid}})
    },
    goIndex() {
      if (this.pid == 13) {
        sessionStorage.setItem("kid", this.cardid)
        localStorage.setItem("pid", this.pid)
        window.location.href = this.$store.state.comUrl + "/index"
      }
    },
    onClickTab() {

    },
    gocardinfo() {
      this.$router.push({path: "/cardinfo"})
    },
    getCards() {
      getCardInfo({
        token: this.token,
        khid: this.cardid
      }).then(res => {
        // console.log(res);
        this.loadingflag = false
        this.cardinfo.push(res.data.card_num)
        this.end_time = res.data.card.end_time
        this.flag = res.data.card.flag
        this.pid = res.data.card.pid
        // console.log(this.end_time);
      })
    },
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
      return y + '-' + MM + '-' + d
    },
    // 跳转到消费记录
    goconsumptionRecords() {
      this.$router.push({path: "/consumptionRecords", query: {cardId: this.cardid}})
    },
    goRechargeRecords() {
      this.$router.push({path: "/RechargeRecords", query: {cardId: this.cardid}})
    }
  },
};
</script>

<style scoped>
* { /* CSS Reset */
  margin: 0;
  padding: 0;
}

.cardinfo {

}

.cardinfo .cardbody {
  height: 100vh;
  padding: 15px;
}

.cardinfo .list {
  background: #fff;
  border-radius: 8px;
  margin-top: 15px;
}

.cardinfo .list li {
  display: flex;
  height: 50px;
  /* margin-bottom: 10px; */
  /* background-color: rebeccapurple; */
  border-bottom: 1px solid #f0f0f0;
  justify-content: space-between;
  align-items: center;
  margin-left: 18px;
  margin-right: 18px;
}

.cardinfo .list li p {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
}

.cardinfo .list li p span {
  margin-left: 5px;
  font-size: 15px;
}

.cardinfo .list li img {
  width: 30px;
  height: 30px;
}

.cardinfo .cardbody {
  background: #f0f0f0;
}

/* 提货券 */
/* 超级卡 */
.cardinfo .cardbody .card1:nth-of-type(1) {
  width: 100%;
  height: 149px;
  background-size: 100% 100%;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 9px 8px 8px;
}

.cardinfo .cardbody .card1 .left {
  flex: 5.4;
}

.cardinfo .cardbody .card1 .left .cardtitle {
  font-weight: 800;
  font-size: 24px;
  display: inline-block;
  margin-top: 50px;
  margin-left: 50px;
}

.cardinfo .cardbody .card1 .left .cardaccount {
  font-size: 13px;
  margin-left: 25px;
  margin-top: 5px;
  //display: inline-block;
}

.cardinfo .cardbody .card1 .left .cardinfo {
  font-size: 13px;
  margin-left: 25px;
  margin-top: 30px;
}

.cardinfo .cardbody .card1 .left .cardinfo span {
  /* margin-right: 40px; */
  display: inline-block;
  width: 40%;
}

.cardinfo .cardbody .cardinforesult {
  font-size: 15px;
  font-weight: 600;
  margin-left: 25px;
  margin-top: 10px;
}

.cardinfo .cardbody .cardinforesult span {
  display: inline-block;
  width: 40%;
}

.cardinfo .cardbody .cardinforesult span:nth-of-type(2) {
  width: 55%
}

.cardinfo .cardbody .card1 .right {
  flex: 1;
}

.cardinfo .cardbody .card1 .right .seemore {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 68px;
  margin-left: 6vw;
  width: 55%;
  border-radius: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 11vw;
}

.cardinfo .cardbody .card1 .right .seemore span:nth-of-type(1) {
  font-size: 12px;
  margin-right: 5px;
}

.cardinfo .cardbody .card1 .right button {
  width: 60%;
  font-weight: 800;
  font-size: 15px;
  height: 35px;
  border-radius: 50px;
  border: none;
  margin-top: 40px;
  margin-left: 40px;
}

.cardinfo .cardbody .card1 .jiantou {
  padding: 2px;
  border-radius: 50%;
}

/* 超级卡 */
.footer {
  position: absolute;
  width: 100%;
  bottom: 40px;
  box-sizing: border-box;
  padding: 0px 60px;
}

.btn {
  border-radius: 30px;
  width: 100%;
  height: 38px;
  font-size: 15px;
  line-height: 37px;
  background-color: #ED3036;
}

.card5 {
  height: 98px;
  background-size: 100% 100%;
  box-sizing: border-box;
  padding: 15px 89px 18px;
  font-size: 13px;
}

.priceBox {
  display: flex;
  align-items: center;
  gap: 25px;
  margin-top: 5px;
}

.pricetext {
  margin-top: 2px;
  font-size: 12px;
  color: #9D9D9D;
}

.cardtitle2 {
  margin-left: 24px !important;
}
.cardaccountBox{
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
.cardaccount {
  font-size: 13px;
  margin-left: 100px;
  margin-left: 30%;
}
.cardaccount2 {
  margin-left: 1%;
  font-size: 12px;
}
.cardaccount2 span{
  padding-left: 3px;
}
</style>