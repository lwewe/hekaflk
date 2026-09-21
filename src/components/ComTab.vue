<template>
  <!--  首页tabbbr-->
  <div>
    <van-tabbar v-model="activeNum"  active-color="#3EA6FB">
      <van-tabbar-item @click="toNext('/index')">
        <span>首页</span>
        <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? icon.active : icon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item @click="toNext('/shopCart')">
        <span>购物车</span>
        <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? mulIcon.active : mulIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/securitycards" :replace="true">
        <span>福利卡</span>
        <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? flkIcon.active : flkIcon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item  @click="toNext('/mine')">
        <span>我的</span>
        <img
            slot="icon"
            slot-scope="props"
            :src="props.active ? mineIcon.active : mineIcon.normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "NavigationTab",
  props:{
    active:[Number,String]
  },
  data(){
    return {
      activeNum: 0,
      // 首页
      icon: {
        normal: require('@/assets/icon5/syh.png'),
        active: require('@/assets/icon5/syx.png')
      },
      mulIcon: {
        normal: require('@/assets/icon5/ch.png'),
        active: require('@/assets/icon5/cx.png')
      },
      flkIcon: {
        normal: require('@/assets/icon5/fh.png'),
        active: require('@/assets/icon5/fx.png')
      },
      mineIcon: {
        normal: require('@/assets/icon5/gh.png'),
        active: require('@/assets/icon5/gx.png')
      },
    }
  },
  methods:{
    toNext(path){
      // window.location.href = this.$store.state.bookUrl + path+"?token=" + localStorage.getItem("token")
      window.location.replace(this.$store.state.comUrl + path)
    }
  },
  created() {
    this.activeNum = this.active
  }
}
</script>


<style scoped>
.van-tabbar--fixed {
  z-index: 1800 !important;
}

.van-tabbar-item__icon img {
  width: 100%;
  height: 100%;
}

/deep/ .van-tabbar-item__icon {
  position: relative;
  font-size: 18%;
  margin-bottom: 5px;
  width: 25px;
}

/deep/ .van-tabbar {
  height: auto;
  padding: 4px 0px;
}
</style>