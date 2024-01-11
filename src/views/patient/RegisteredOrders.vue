<template>
  <div>
    <a-divider orientation="left">
      挂号详情
    </a-divider>
    <br>
    <a-card style="width: 1500px;margin-left: 100px">
      <a-date-picker  valueFormat="YYYY-MM-DD" v-model="searchForm.date" style="width: 200px;float: left;margin-left: 10px"/>
      <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
        查询
      </a-button><br><br>


      <a-table :columns="columns" :data-source="data" :pagination="false">
        <span slot="action" slot-scope="text, record">
           <a-popover title="暂未就诊" v-show="record.status === false">
            <template slot="content">
              <p>请按照预约时间入院就诊</p>
            </template>
            <a-tag color="orange">
              未就诊
            </a-tag>
             <a-divider type="vertical" />
             <a class="ant-dropdown-link" @click="CancelRegistration(record)"> 退号 </a>
          </a-popover>
          <a class="ant-dropdown-link" @click="info(record)" v-show="record.status === true"> 详情 </a>


        </span>
      </a-table><br>

      <a-pagination
          v-model="page"
          show-size-changer
          :page-size.sync="size"
          :total="total"
          @showSizeChange="sizeChange"
          @change="onChange"
          style="margin-left: 50px"
      />


    </a-card>
  </div>
</template>

<script>
import {page, reset} from "@/js/register";

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
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];
export default {
  name: "RegisteredOrders",
  data() {
    return {
      data,
      columns,
      page:1,
      size:10,
      total:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      searchForm:{
        date:'',
      },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      page({
        page:this.page,
        size:this.size,
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
    CancelRegistration(records) {
      const resetForm = {
        id:records.id,
        date:records.date,
        doctorName:records.doctorName
      };
      reset(resetForm).then(res => {
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'退号成功'
          })
          this.init();
          return;
        }
         this.$message.error({
           content:'退号失败'
         })
      })
    },
    info(records) {
      console.log(records);
    },
  },
}
</script>

<style scoped>

</style>
