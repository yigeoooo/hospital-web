<template>
  <div>
    <div id="login">
      <br>
      <h1>中医信息管理系统</h1>
      <br><br>
      <div style="width: 450px">
          <el-form ref="form" :model="form" label-width="200px">
            <el-form-item label="用户名">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <br>
          </el-form>

          <el-button type="warning" round
                     style="position: absolute;left: 270px;width: 100px;height: 50px"
                     @click="login()"
          >登录</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import {
  userLogin,
} from './js/login'
export default {
  //组件名
  name: "LoginIndex",
  //data，存放数据
  data(){
    return{
      form:{
        userId:'',
        password:'',
      },
    }
  },
  //methods，专门用来放函数，执行功能
  methods:{
    login() {
      userLogin({
        userId:this.form.userId,
        password:this.form.password
      }).then(res=>{
        if (res == true) {
          this.$router.push({
            name:'main',
          })
          return;
        }
      this.$message({
        message:'账户或用户名错误',
        type:"error"
      })
      })
    }
  }
}
</script>

<style scoped>
#login{
  border: #eaaa59 2px solid;
  height: 400px;
  width: 600px;
  position: absolute;
  top: 220px;
  left: 520px;
  border-radius: 50px;
}
</style>
