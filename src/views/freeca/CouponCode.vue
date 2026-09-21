<template>
  <div >
    <ReturnBack :rcolor="'#fff'" :bcolor="'#00000087'"></ReturnBack>
    <div>
      <img class="img" src="../../assets/card/hback.png" alt="">
    </div>
    <div class="pageMax">
      <div>
        <div>
          <div class="title">券号</div>
          <div class="inpBox">
            <input v-model="cardNo" class="inp" type="text" placeholder="请输入卡号">
          </div>
        </div>
        <div style="margin-top: 15px">
          <div class="title">密码</div>
          <div class="inpBox">
            <input v-model="password" class="inp" type="text" placeholder="请输入密码">
          </div>
        </div>
      </div>
      <div class="btn" @click="binding">绑定</div>
    </div>
  </div>
</template>
<script>
import {addbinding} from "@/api/locality/card";

export default {
  name: "CouponCode",
  data() {
    return {
      cardNo: "",
      password: ""
    }
  },
  methods: {
    binding() {
      if (this.cardNo == "") {
        this.$toast("请输入卡号")
        return
      }
      if (this.password == "") {
        this.$toast("请输入密码")
        return;
      }
      let token = localStorage.getItem("token")
      addbinding({
        token,
        kahao: this.cardNo,
        pass: this.password
      }).then(res => {
        if (res.code == 200) {
          this.$toast("绑定成功")
          setTimeout(() => {
            this.$router.go(-2)
          }, 1000)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.pageMax {
  padding: 8px 20px 20px;
}

.title {
  font-weight: bold;
}

.inpBox {
  padding: 15px;
  background-color: #F0F0F0;
  border-radius: 8px;
  font-size: 15px;
  margin-top: 10px;
}

.inp {
  border: none;
  width: 100%;
  height: 100%;
  background-color: #F0F0F0;
}

.btn {
  background-image: linear-gradient(to right, #FE7C28, #F16A35, #E75C40, #DE4F49);
  color: white;
  border-radius: 10px;
  text-align: center;
  padding: 9px 10px;
  font-size: 18px;
  letter-spacing: 4px;
  height: 28px;
  line-height: 28px;
  margin-top: 53px;
}
</style>