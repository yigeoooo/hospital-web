<template>
  <div>
    <div>
      <a-menu v-model="current" mode="horizontal" @click="change">
<!--        <a-menu-item key="RootMain"> <a-icon type="mail" />首页</a-menu-item>-->
        <a-menu-item key="DoctorInfo"> <a-icon type="appstore" />医生信息</a-menu-item>
        <a-menu-item key="PatentInfo"> <a-icon type="appstore" />患者信息</a-menu-item>
        <a-menu-item key="MedicalInfo"> <a-icon type="appstore" />药房信息</a-menu-item>
        <a-menu-item key="rootAccount"> <a-icon type="appstore" />账户管理</a-menu-item>
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
  name: "mainPage",
  data(){
    return{
      current: ['page']
    }
  },
  methods:{
    change(e) {
      this.$router.push({
        name:e.key,
      })
    },
    loginOUt(){
      this.$router.push({
        name:'login'
      })
    },
  },
}
</script>

<style scoped>
#btn{
  margin-top: 10px;
  margin-right: 10px;
  float: right;
}
</style>
