<template>
  <div id="bck">
    <div id="login">
      <div id="form">
        <h1 style="margin-right: 30px">中医信息管理系统</h1>
        <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="用户名">
            <a-input v-model="form.id" />
          </a-form-model-item>

          <a-form-model-item label="密码">
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
              登录
            </a-button>
            <a-button style="margin-left: 10px;" size="large" @click='visible = true'>
              注册
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>

    <!--注册-->
    <a-modal
        title="患者注册"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        width="1200px"
    >
      <a-form-model :model="patientForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户名">
          <a-input v-model="patientForm.patientId" allowClear/>
        </a-form-model-item>
        <a-form-model-item label="密码">
          <a-input-password v-model="patientForm.password"  allowClear/>
        </a-form-model-item>
        <a-form-model-item label="姓名">
          <a-input v-model="patientForm.patientName"  allowClear/>
        </a-form-model-item>
        <a-form-model-item label="年龄">
          <a-input v-model="patientForm.patientAge"  allowClear/>
        </a-form-model-item>
        <a-form-model-item label="性别">
        <a-radio-group v-model="patientForm.patientGender">
          <a-radio-button value="男">
            男
          </a-radio-button>
          <a-radio-button value="女">
            女
          </a-radio-button>
        </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="身份证号">
          <a-input v-model="patientForm.idCard"  allowClear/>
        </a-form-model-item>
        <a-form-model-item label="联系电话">
          <a-input v-model="patientForm.phoneNumber"  allowClear/>
        </a-form-model-item>
      </a-form-model>
      <a-divider/>
    </a-modal>
  </div>
</template>

<script>
import {
  userLogin,
  doctorLogin,
  patientLogin
} from './js/login'
import {register} from "@/js/patient";
export default {
  //组件名
  name: "LoginIndex",
  //data，存放数据
  data(){
    return{
      job:'',
      visible:false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      patientForm:{
        patientId:'',
        password:'',
        patientName:'',
        patientAge:'',
        patientGender:'',
        idCard:'',
        phoneNumber:'',
      },
      form:{
        id:'',
        password:'',
      },
    }
  },
  //methods，专门用来放函数，执行功能
  methods:{
    handleOk() {
      register(this.patientForm).then(res => {
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'注册成功'
          })
          this.visible = false;
          return;
        }
        this.$message.error({
          content:'注册失败'
        })
        this.visible = false;
      })
    },
    handleCancel() {
      this.visible = false;
    },
    login() {
      if (this.job === '') {
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
          if (res === true) {
            this.$router.push({
              name:'RootMain',
            })
            localStorage.setItem("rootId", this.form.id);
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
            if (res.code === 200 && res.body === true) {
              this.$router.push({
                name:'doctorMainPage',
              })
              localStorage.setItem("doctorId", this.form.id);
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
          if (res.code === 200 && res.body === true) {
            this.$router.push({
              name:'patientMainPage',
            })
            localStorage.setItem("patientId", this.form.id);
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
#bck{
  background-image: url("img/background.png");
  height: 920px;
}
#login{
  border: black 2px solid;
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
