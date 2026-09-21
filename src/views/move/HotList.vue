<template>
  <div class="hotlist" style="background-color: #f0f0f0;">
    <ReturnBack :rcolor="'#fff'" :bcolor="'#00000087'"></ReturnBack>
    <NProgress v-if="loadingflag"/>
    <div class="title" style="display: flex;background-color: #fff;margin-bottom: 10px">
        <p style="color: red;font-weight: 600;width: 100%;display: flex;justify-content: center;align-items: center;">
          <img style="width: 4vw;justify-self: center;margin-right: 1vw;" src="../../assets/number/logo.png" alt="">
          <span>热映榜单</span>
        </p>
    </div>
      <div style="margin-top: 10px;padding-bottom: 10px;">
        <div class="filmbox" v-for="(item,index) in list" :key="index" style="display: flex;background-color: #fff;">
          <div class="filmleft" style="flex: 2;" :name="item.id" @click="filmdetail($event)">
            <div style="position: relative;">
              <img :name="item.id" :src="item.logo" alt="" style="">
              <img v-if="index==0" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/1.png" alt="">
              <img v-if="index==1" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/2.png" alt="">
              <img v-if="index==2" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/3.png" alt="">
              <img v-if="index==3" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/4.png" alt="">
              <img v-if="index==4" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/5.png" alt="">
              <img v-if="index==5" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/6.png" alt="">
              <img v-if="index==6" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/7.png" alt="">
              <img v-if="index==7" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/8.png" alt="">
              <img v-if="index==8" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/9.png" alt="">
              <img v-if="index==9" style="position: absolute;top: 0px;left: 5px;width: 6vw;height: auto;" src="../../assets/number/10.png" alt="">
            </div>
            
            <p :name="item.id" class="elips1" style="width: 33vw;font-weight: 600;">{{ item.name }}</p>
            <p :name="item.id">
              <span style="font-weight: 600;white-space: nowrap" class="font1">主演:</span>
              <span style="font-weight: 600;white-space: nowrap;text-overflow: ellipsis;width: 95px;overflow:hidden;" class="font2 elips1">{{ item.actors }}</span>
            </p>
            <p :name="item.id">
              <span style="font-weight: 600;" class="font1">导演:</span>
              <span style="font-weight: 600;white-space: nowrap;text-overflow: ellipsis;width: 95px;overflow:hidden;" class="font2 elips1">{{ item.director }}</span>
            </p>
            <p :name="item.id" style="font-size: 12px;color: gray;">
              <span class="elips1" style="border: 1px solid #D6D6D6;white-space: nowrap;padding: 0px 5px;">{{ item.type }}</span>
              <!-- {{ item.showmark }} -->
              <span class="elips1 showmark" style="border: 1px solid #D6D6D6;white-space: nowrap;padding: 0px 5px;" :style="`display:${item.showmark==undefined?'none':'block'}`">{{ item.showmark }}</span>
            </p>
          </div>
          <div class="filmright" style="flex: 1;">
            <!-- <p style="font-size: 13px;margin-left: 13vw;margin-top: 2vh;">评分 <span style="font-size: 17px;color: #eda86e;">{{ item.rating }}</span></p> -->
            <button @click="buyticket($event)" :name="item.id">购 票</button>
          </div>
    </div>
    </div>

  </div>
</template>

<script>
//调用热映电影列表
import {getFilmList} from "@/api/film";
//引入
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
export default {
  data() {
    return {
        hotfilmList:[],
        list:[],
        cityid:null,
        loadingflag:false
    }
  },

  mounted() {
  },
  created() {
    this.cityid = Number(this.$route.query.cityid)
    this.loadingflag=true
    var _this=this
    setTimeout(function(){
      _this.loadingflag=false
    },1000)
    this.timestamp  = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
    this.getFilm()
  },

  methods: {
    getFilm(){
      let data = {
        method: "xuankua.movie.hot.list",
        citycode:this.cityid,
        appkey:this.$store.state.appkey,
        timestamp:this.timestamp.toString(),
        v:"1.0"
      }
      let sign = this.$utils.getASCII(data)
      getFilmList({
        ...data,
        sign:sign,
      }).then(res=>{
        this.hotfilmList=res.data.movieList
        for (var i=0;i<10;i++){
        //   this.swiperList.push(this.hotfilmList[i])
        this.list.push(this.hotfilmList[i])
        }
      })
    },
    filmdetail(option){
      var id = option.target.getAttribute("name")
      this.$router.push({path: "/filmdetail", query: {id: '' + id, cityid: '' + this.cityid}})
    },
    buyticket(option) {
      var id = option.target.getAttribute("name")
      this.$router.push({path: "/multiplex", query: {id: '' + id,cityid:''+this.cityid}})
    },
    },
};
</script>

<style scoped>
.hotlist{
  /* min-height: 100vw; */
  /* min-height: 100vh; */
  /* min-height: calc(100vh - 20px); */
  width: 100vw;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: absolute;
}
.hotlist .filmbox .filmleft p{
  margin-top: 10px;
  display: flex;
}
.hotlist .filmbox{
  margin-bottom: 10px;
  margin-left: 3vw;
  margin-right: 3vw;
  border-radius: 10px;
}
.hotlist .filmbox:last-child{
  /* padding-bottom: 5px; */
  /* margin-bottom: 20px; */
}
.hotlist .filmbox .filmleft p:nth-of-type(1){
  margin-top: 3vh;
  margin-bottom: 10px;
}
.hotlist .filmbox .filmleft .font1{
  color: #999;
  font-size: 13px;
}
.hotlist .filmbox .filmleft .font2{
  color: #000;
  font-size: 13px;
  margin-left: 3px;
  display: inline-block;
  width: 21vw;
}
.hotlist .filmbox .filmleft .showmark{
  border: 1px solid gray;
  margin-left: 5px;
  padding-left: 3px;
  margin-right: 3px;
}

.hotlist .filmbox .filmleft img{
  width: 23vw;
  height: auto;
  margin-left: 15px;
  margin-top: 11px;
  margin-bottom: 11px;
  float: left;
  margin-right: 5px;
  border-radius: 5px;
}
.hotlist .filmbox .filmright button{
  width: 19vw;
  border: none;
  border-radius: 50px;
  height: 4vh;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  background-color: #fc590e;
  margin-left: 8vw;
  margin-top: 7vh;
}

</style>