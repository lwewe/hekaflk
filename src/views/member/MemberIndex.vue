<template>
  <div class="memberindex">
    <ReturnBack :rcolor="'#fff'" :bcolor="'#00000087'"></ReturnBack>
    <NProgress v-if="loadingflag"/>
    <van-overlay :z-index="100"/>
    <!--    <header >-->
    <!--        <van-icon class="back" @click="back()" size="25px" name="arrow-left" color="#fff"/>-->
    <!--        <span>影视阅读会员</span>-->
    <!--    </header>-->
    <div v-if="show" class="allmenu" style="">
      <span style="color: #fff;font-weight: 600;font-size: 18px;width: 11%;padding-left: 19px;padding-top: 3px;"
            @click="tabindex(-1)">全部</span>
      <ul style="width: 75%;">
        <li v-for="(item,index) in applist" :key="index" style="" @click="tabindex( id ? index-1 : index)">{{
            item.title
          }}
        </li>
      </ul>
      <!-- <van-icon name="arrow-up" color="#ccc" style="position: absolute;z-index: 2000;"/> -->
    </div>

    <van-tabs v-model="active" title-active-color="#fff" style="position: relative;">
      <van-icon name="arrow-down" color="#ccc"
                style='position: absolute;right: 0px;top: 52px;background-color: #003b37;z-index: 1000;padding: 3px 10px 13px 11px;'
                @click="show=!show" v-if="show==false"/>
        <van-icon name="arrow-up" color="#ccc"
        style='position: absolute;right: 0px;top: 52px;background-color: #003b37;z-index: 2000;padding: 3px 10px 13px 11px;'
        @click="show=!show" v-if="show==true" />
      <!-- <van-icon name="arrow-up" size="15px" color="#fff" style="position: absolute;right: 0;z-index: 100000;padding: 3px 10px 13px 11px;"/> -->
      <!-- 全部页面 -->
      <van-tab title="全部" v-if="allshow">
        <div class="wrap inner">
          <div style="padding: 0px 10px;">
            <div class="banner">
              <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red" style="border-radius: 10px;">
                <van-swipe-item v-for="(item,index) in banner" :key="index" style="border-radius: 10px;">
                  <a :href="item.url">
                    <img :id="item.id" :src=" item.img" alt=""
                      style="border-radius: 10px;width: 100%;height: 100%;">
                  </a>
                  
                </van-swipe-item>
              </van-swipe>
              <!-- <img :src=" banner.img" :id="banner.id" alt=""> -->
            </div>
            <div class="list1">
              <div @click="gomusicmember()" class="imgbox" style="background-color: #c4feee;">
                <img :src=" yinyue.img" :id="yinyue.id" alt="">
              </div>
              <div @click="goreadmember()" class="imgbox" style="background-color: #c4feee;">
                <img :src=" yuedu.img" :id="yuedu.id" alt="">
              </div>
            </div>
          </div>
        </div>
        <List :Kaquanlist="Kaquanlist1" v-if="ishow"></List>
      </van-tab>

      <!-- 腾讯视频页面 -->
      <van-tab v-for="(item,index) in applist" :key="index+''" :title="item.title" :id="item.id">
        <div class="pageMax">
          <List :Kaquanlist="qitalist"></List>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import {getKaquan, getKaquanlist, getclassify} from "@/api/member";

export default {
  components: {List},
  data() {
    return {
      active: 0,
      show: false,
      allshow: true,
      tabstyleflag: true,
      banner: [],
      yinyue: [],
      yuedu: [],
      applist: [],
      Kaquanlist1: [],
      pageno: 1,
      pagesize: 100,
      ishow: false,
      qitalist: [],
      id: 0,
      loadingflag: false
    };
  },
  watch: {
    active() {
      if (this.$route.query.id) {
        // console.log(this.active);
        this.qitalist = []
        // console.log(this.qitalist);
        if (this.$route.query.id) {
          getclassify({
            fid: this.active + 1,
            pageno: this.pageno + "",
            pagesize: this.pagesize + ""
          }).then(res => {
            // console.log(res.data);
            for (var i = 0; i < res.data.length; i++) {
              this.qitalist.push(res.data[i])
            }

          })
        }
      } else {
        // console.log("222");
        this.qitalist = []
        getclassify({
          fid: this.active,
          pageno: this.pageno + "",
          pagesize: this.pagesize + ""
        }).then(res => {
          // console.log(res.data);
          for (var i = 0; i < res.data.length; i++) {
            this.qitalist.push(res.data[i])
          }
        })
      }

    }
  },

  mounted() {
    // console.log(this.$route.query.id);

    this.getKaquanList()
    this.getAllKaquanlist()

  },
  created() {
    this.loadingflag = true
    var _this = this
    setTimeout(function () {
      _this.loadingflag = false
    }, 1800)
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.active = this.$route.query.id - 1
      this.allshow = false
      // this.active=0
      getclassify({
        fid: this.$route.query.id,
        pageno: this.pageno + "",
        pagesize: this.pagesize + ""
      }).then(res => {
        // console.log(res.data);
        for (var i = 0; i < res.data.length; i++) {
          this.qitalist.push(res.data[i])
        }
      })
      // this.golist()
    }
  },

  methods: {
    golist() {

      // getclassify({
      //     fid:this.active,
      //     pageno:this.pageno+"",
      //     pagesize:this.pagesize+""
      // }).then(res=>{
      //     // console.log(res.data);
      //     for(var i=0;i<res.data.length;i++){
      //         this.qitalist.push(res.data[i])
      //     }
      // })
    },
    back() {
      this.$router.go(-1);
    },
    tabstyle() {
      this.tabstyleflag = !this.tabstyleflag
    },
    tabindex(index) {
      // console.log(index);
      this.active = index + 1
      this.show = !this.show
    },
    getKaquanList() {
      getKaquan({}).then(res => {
        // console.log(res.data.yinyue);
        
        this.applist = res.data.classify
        this.banner = res.data.lbt.lbt
        // this.banner.push(res.data.lbt.lbt[0])
        // console.log(this.banner);
        this.yuedu = res.data.yuedu
        this.yinyue = res.data.yinyue
      })
    },
    getAllKaquanlist() {
      getKaquanlist({
        pageno: this.pageno + "",
        pagesize: this.pagesize + ""
      }).then(res => {
        this.Kaquanlist1 = res.data
        this.ishow = true
        // console.log(this.Kaquanlist1);
      })
    },
    gomusicmember() {
      this.$router.push({path: "/musicmember"})
    },
    goreadmember() {
      this.$router.push({path: "/readmember"})
    }
  }

};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.allmenu {
  background-color: #003b37;
  width: 100%;
  padding-bottom: 15px;
  /* height: 150px; */
  position: absolute;
  z-index: 100;
  display: flex;
  margin-top: 36px;
}

.allmenu ul li {
  width: 25%;
  display: inline-block;
  color: #999;
  font-size: 15px;
  line-height: 30px;
  /* font-weight: 600; */
  text-align: center;
}

.allmenu ul li:nth-of-type(15) {
  width: 30% !important;
}

/* .van-tabs__wrap{
    overflow: unset !important;
    
} */
/* .van-tabs__wrap--scrollable .van-tabs__nav{
    overflow: unset !important;
    display: flex !important;
    flex-wrap: wrap !important;
    background-color:transparent !important;
}
.memberindex .van-tabs--line .van-tabs__wrap{
    margin-right: -12px !important;
} */

.memberindex .van-hairline--top-bottom::after {
  border: none;
}

.memberindex {
  /* height: 100%; */
  width: 100vw;
  background: #003b37;
  padding-bottom: 15px;
  position: absolute;
}

.memberindex header {
  /* background-color: pink; */
  height: 50px;
  position: relative;
}

.memberindex .back {
  position: absolute;
  line-height: 50px;
  margin-left: 10px;
}

.memberindex header span {
  color: goldenrod;
  display: inline-block;
  text-align: center;
  width: 100%;
  line-height: 50px;
  font-weight: 600;

}

.memberindex .van-tabs__wrap--scrollable .van-tab {
  /* flex: 0 1 47% !important; */
  background: #003b37;
  color: #999;
  font-size: 15px;
}

.memberindex .van-tab--active {
  /* color: #fff; */
}

.memberindex .van-tabs--line .van-tabs__wrap {
  margin-right: 40px;
}

/* .memberindex .van-tabs--line{
    padding-top: 0 !important;
} */

.memberindex .wrap {
  margin-top: 10px;
}

/* 全部列表 */
.memberindex .inner .banner {
  width: 100%;

  /* background-color: red; */
}

.memberindex .inner .banner img {
  height: 100%;
  width: 100%;
  border-radius: 10px;
}

.memberindex .inner .list1 {
  width: 100%;
  background-color: #defef7;
  margin-top: 10px;
  border-radius: 10px;
  display: flex;
}

.memberindex .inner .list1 .imgbox:nth-of-type(1) {
  /* background: pink; */
  margin-left: 10px;
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}

.memberindex .inner .list1 .imgbox:nth-of-type(2) {
  /* background: yellow; */
  margin-top: 10px;
  margin-left: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 10px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
}

.memberindex .inner .list1 .imgbox img {
  width: 90%;
  height: 90%;
  border-radius: 10px;
}

.memberindex .inner .list2 {
  width: 100%;
  /* background-color: pink; */
  border-radius: 10px;
}

.memberindex .inner .list2 .product {
  width: 48%;
  height: 230px;
  display: inline-block;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;

}

.memberindex .inner .list2 .product:nth-of-type(odd) {
  margin-right: 4%;
}

.memberindex .inner .list2 .product .imgbox {
  width: 100%;
  height: 160px;
  background-color: yellow;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.memberindex .inner .list2 .product .imgbox img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.memberindex .inner .list2 .product .title {
  font-size: 14px;
  margin-left: 10px;
  margin-top: 10px;
}

.memberindex .inner .list2 .product .price {
  font-size: 15px;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  font-weight: 600;
  color: red;
}

/* 腾讯视频列表 */
.memberindex .tengxuninner .list2 {
  width: 100%;
  /* background-color: pink; */
  margin-top: 10px;
  border-radius: 10px;
}

.memberindex .tengxuninner .list2 .product {
  width: 48%;
  height: 230px;
  display: inline-block;
  background: #fff;
  border-radius: 10px;
  margin-top: 10px;

}

.memberindex .tengxuninner .list2 .product:nth-of-type(odd) {
  margin-right: 4%;
}

.memberindex .tengxuninner .list2 .product .imgbox {
  width: 100%;
  height: 160px;
  background-color: yellow;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.memberindex .tengxuninner .list2 .product .imgbox img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.memberindex .tengxuninner .list2 .product .title {
  font-size: 14px;
  margin-left: 10px;
  margin-top: 10px;
}

.memberindex .tengxuninner .list2 .product .price {
  font-size: 15px;
  margin-left: 10px;
  margin-top: 5px;
  font-size: 18px;
  font-weight: 600;
  color: red;
}

>>> .van-tabs__nav {
  background: transparent !important;
}

>>> .van-hairline--top-bottom::after {
  border-width: 0px !important;
}

>>> .van-tabs--line {
  padding-top: 0px !important;
}

>>> .van-tabs__wrap {
  position: relative;
  padding-top: 40px;
}

/* tengxuninner */
.pageMax {
  min-height: calc(100vh - 59px);
}
/deep/ .van-tab:last-child{
  margin-right: 30px !important;
}
</style>