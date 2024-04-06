<template>
  <div>
      <div>
        <a-menu v-model="current" mode="horizontal" @click="change">
<!--          <a-menu-item key="patientMainPage"> <a-icon type="mail" />首页</a-menu-item>-->
          <a-menu-item key="RegistrationInfo"> <a-icon type="mail" />预约挂号</a-menu-item>
          <a-menu-item key="RegisteredOrders"> <a-icon type="mail" />挂号详情</a-menu-item>
          <a-button type="link" id="btn" @click="loginOUt">
            退出登录
          </a-button>
        </a-menu>
      </div>
      <div>
        <router-view></router-view>
      </div>
  </div>

</template>

<script>
export default {
  name: "PatientPage",
  data(){
    return{
      current: ['patientMainPage']
    }
  },
  methods:{
    change(e) {
      this.$router.push({
        name: e.key
      })
    },
    loginOUt(){
      this.$router.push({
        name:'login'
      })
    },
  }
}
</script>

<style scoped>
#btn{
  margin-top: 10px;
  margin-right: 10px;
  float: right;
}
</style>
