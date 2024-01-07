<template>
  <div>
    <div id="login">
      <div id="form">
        <h1 style="margin-right: 30px">中医信息管理系统</h1>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="ID">
            <a-input v-model="form.id" />
          </a-form-model-item>

          <a-form-model-item label="Password">
            <a-input v-model="form.password" type="password"/>
          </a-form-model-item>

          <a-radio-group v-model="job" style="margin-right: 45px">
            <a-radio-button value="1">
              管理员
            </a-radio-button>
            <a-radio-button value="2">
              医生
            </a-radio-button>
            <a-radio-button value="3">
              患者
            </a-radio-button>
          </a-radio-group><br><br>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary" @click="login" size="large">
              Login
            </a-button>
            <a-button style="margin-left: 10px;" size="large">
              sign up
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>

    </div>
  </div>
</template>

<script>
import {
  userLogin,
  doctorLogin,
  patientLogin
} from './js/login'
export default {
  //组件名
  name: "LoginIndex",
  //data，存放数据
  data(){
    return{
      job:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form:{
        id:'',
        password:'',
      },
    }
  },
  //methods，专门用来放函数，执行功能
  methods:{
    login() {
      if (this.job == '') {
        this.$message.error({
          content:'请输入或选择必选项'
        })
        return;
      }
      if (this.job === '1') {
        userLogin({
          id:this.form.id,
          password:this.form.password
        }).then(res=>{
          if (res == true) {
            this.$router.push({
              name:'RootMain',
            })
            localStorage.setItem("id", this.form.id);
            return;
          }
          this.$message.error({
            content:'账户或密码错误'
          })
        })
        return;
      }
      if (this.job === '2' && this.job != '') {
        doctorLogin({
          id:this.form.id,
          password:this.form.password
        }).then(res=>{
            if (res.code === 200) {
              this.$router.push({
                name:'doctorMainPage',
              })
              localStorage.setItem("id", this.form.id);
              return;
            }
          this.$message.error({
            content:'账户或密码错误'
          })
        })
      }
      if (this.job === '3' && this.job != '') {
        patientLogin({
          id:this.form.id,
          password:this.form.password
        }).then(res=>{
          if (res.code === 200) {
            this.$router.push({
              name:'patientMainPage',
            })
            localStorage.setItem("id", this.form.id);
            return;
          }
          this.$message.error({
            content:'账户或密码错误'
          })
        })
      }
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
#form{
  margin-top: 60px;
  margin-left: 90px;
}
</style>
