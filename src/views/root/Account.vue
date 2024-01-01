<template>
  <div>
    <br>
    <br>
    <a-divider orientation="left">
      账户管理
    </a-divider>
    <br>
    <br>
    <div id="select">
      <span>请选择角色</span>&nbsp;&nbsp;
      <a-select default-value="管理员" style="width: 120px" v-model="val" @change="handleChange">
        <a-select-option value="1">
          管理员
        </a-select-option>
        <a-select-option value="2">
          医生
        </a-select-option>
        <a-select-option value="3">
          患者
        </a-select-option>
      </a-select>

    </div>

    <a-card style="width: 1500px;margin-left: 100px">
      <router-view></router-view>
    </a-card>
    <div>

    </div>


  </div>
</template>

<script>
export default {
  name: "AccountInfo",
  data(){
    return{
      val:'',
    }
  },
  methods:{
    handleChange(val) {
      if (val === '1') {
        this.$router.push({
          name:'rootAccount'
        })
      }
      if (val === '2') {
        this.$router.push({
          name:'doctorAccount'
        })
      }
      if (val === '3') {
        this.$router.push({
          name:'patientAccount'
        })
      }
    }
  }
}
</script>

<style scoped>
#select{
  margin-bottom: 10px;
  position: absolute;
  left: 100px;
  top:140px
}
</style>
