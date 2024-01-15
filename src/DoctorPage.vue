<template>
  <div>
    <div>
      <a-menu v-model="current" mode="horizontal" @click="change">
<!--        <a-menu-item key="doctorMainPage"> <a-icon type="mail" />首页</a-menu-item>-->
        <a-menu-item key="scheduling"> <a-icon type="mail" />排班计划</a-menu-item>
        <a-menu-item key="treatInfo"> <a-icon type="mail" />就诊信息</a-menu-item>
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
  name: "DoctorPage",
  data(){
    return{
      current: ['doctorMainPage']
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
