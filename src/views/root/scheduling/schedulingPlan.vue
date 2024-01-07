<template>
  <div>
    <div>
      <span style="margin-left: 10px">
        医生：{{doctorName}}
      </span><br><br>
      <div v-for="(item,index) in scheduleForm.item" :key="index">
        <a-form layout="inline">
          <a-input v-model="item.doctorName" disabled style="width: 150px;margin-left: 10px"/>
        <a-date-picker  valueFormat="YYYY-MM-DD" v-model="item.date" style="margin-left: 10px"/>
        <a-time-picker value-format="HH:mm:ss" use12-hours format="h:mm a" style="margin-left: 10px" v-model="item.time"/>
        <a-input-number v-model="item.count" :min="1" placeholder="请输入可挂号数量" style="width: 150px;margin-left: 10px"/>
          <a-button type="primary" style="width: 60px;margin-left: 10px" @click="add"><span style="font-size: 20px;">+</span></a-button>
          <a-button
              type="danger"
              style="width: 60px;margin-left: 10px"
              @click="substraction(item, index)"
          ><span style="font-size: 20px">-</span></a-button><br><br>
        </a-form>
      </div>
      <a-button type="primary" style="width: 60px;margin-left: 10px" @click="insert"><span style="font-size: 12px;">添加</span></a-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import {
  insertInfo
} from "@/js/Scheduling"
export default {
  name: "schedulingPlan",
  created() {
    this.scheduleForm.item.doctorName = sessionStorage.getItem("doctorName");
  },
  data() {
    return {
      doctorName:'',
      scheduleForm :{
        item:[
          {
            doctorName:sessionStorage.getItem("doctorName"),
            date:'',
            time:'',
            count:'',
          }
        ]
      }
    }
  },
  methods: {
    add() {
      this.scheduleForm.item.push({
        doctorName:sessionStorage.getItem("doctorName"),
        date:'',
        time:'',
        count:'',
      });
    },
    substraction(item, index) {
      if (this.scheduleForm.item.length <= 1) {
          return;
      }
      this.scheduleForm.item.splice(index, 1);
    },
    insert() {
      insertInfo(this.scheduleForm).then(res=>{
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'新增成功',
          })
          this.scheduleForm.item.length = 1;
          Object.keys(this.scheduleForm.item).forEach((key) => (this.scheduleForm.item[key] = ''))
        }
      })
    },
  },
  watch: {
    number:{
      handler(newNumber){
        if (newNumber === 0) {
          this.number = 1;
          this.$message.warn({
            content:'不能再减少排班计划！',
          })
        }
      },
    },
  }
}
</script>

<style scoped>

</style>
