<template>
  <div>
    <br>
    <a-divider orientation="left">
      排班计划
    </a-divider>

    <br>
    <a-card style="width: 1500px;margin-left: 100px">
      <a-date-picker  valueFormat="YYYY-MM-DD" v-model="searchForm.date" style="width: 200px;float: left;margin-left: 10px"/>
      <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
        查询
      </a-button><br><br>

      <a-table :columns="columns" :data-source="data" :pagination="false">

      </a-table>

      <br>

      <a-pagination
          v-model="page"
          show-size-changer
          :page-size.sync="size"
          :total="total"
          @showSizeChange="sizeChange"
          @change="onChange"
          style="margin-left: 100px"
      />

    </a-card>

  </div>

</template>

<script>
import {schedulingPage} from "@/js/Scheduling";

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '医生姓名',
    dataIndex: 'doctorName',
    key: 'doctorName',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '时间',
    key: 'time',
    dataIndex: 'time',
  },
  {
    title: '可挂号数',
    key: 'count',
    dataIndex: 'count',
  },
];
const data = [];
export default {
  name: "schedulingPlan",
  data() {
    return {
      data,
      columns,
      page: 1,
      size: 10,
      total:500,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      searchForm: {
        page:this.page,
        size:this.size,
        doctorId:localStorage.getItem("doctorId"),
        date:'',
      },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      schedulingPage({
        page:this.page,
        size:this.size,
        doctorId:localStorage.getItem("doctorId"),
        date:this.searchForm.date,
      }).then(res => {
        this.data = res.body.records;
        this.total = res.body.total;
      })
    },
    search() {
      this.init();
    },
    sizeChange(current, pageSize) {
      this.page = current;
      this.size = pageSize;
      this.init();
    },
    onChange(val) {
      this.page = val;
      this.init();
    },
  },
}
</script>

<style scoped>

</style>
