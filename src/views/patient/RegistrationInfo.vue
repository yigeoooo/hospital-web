<template>
  <div>
    <a-divider orientation="left">
      预约挂号
    </a-divider>
    <a-card style="width: 1500px;margin-left: 100px">
      <a-form-model :model="searchForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-date-picker  valueFormat="YYYY-MM-DD" v-model="searchForm.date" style="width: 200px;float: left;margin-left: 10px"/>
        <a-input v-model="searchForm.doctorName" placeholder="请输入医生姓名" style="width: 200px;float: left;margin-left: 10px" allowClear/>
        <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
          查询
        </a-button>
      </a-form-model><br><br>

      <a-table :columns="columns" :data-source="data" :pagination="false">
        <span slot="action" slot-scope="text, record">
           <a-popover title="警告" v-show="record.count === 0">
            <template slot="content">
              <p>该日号数已预约完，请选择其他时间</p>
            </template>
            <a-tag color="red">
              无号
            </a-tag>
          </a-popover>
          <a class="ant-dropdown-link" @click="register(record)" v-show="record.count > 0"> 挂号 </a>
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


      <!--挂号对话框-->
      <a-modal
          title="挂号"
          :visible="registerVisible"
          @ok="handleOk"
          @cancel="handleCancel"
      >
        <a-form-model :model="registerForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-card title="挂号信息" style="width: 400px;margin-left: 40px">
            <p>ID：{{registerForm.id}}</p>
            <p>医生：{{registerForm.doctorName}}</p>
            <p>日期：{{registerForm.date}}</p>
            <p>患者ID：{{registerForm.patientId}}</p>
            <p>患者姓名：{{registerForm.patientName}}</p>
            <p>联系电话：{{registerForm.phoneNumber}}</p>
            <p>身份证号：{{registerForm.idCard}}</p>
          </a-card>
          <br><br>
        </a-form-model>
      </a-modal>


    </a-card>
  </div>
</template>

<script>
import {
  getPages
} from "@/js/Scheduling";
import {info} from "@/js/patientInfo";
import {insert} from "@/js/register";
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
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];
export default {
  name: "RegistrationInfo",
  data() {
    return {
      registerVisible:false,
      data,
      columns,
      page:1,
      size:10,
      total:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      searchForm:{
        date:'',
        doctorName:'',
      },
      registerForm:{
        id:'',
        date:'',
        time:'',
        doctorName:'',
        patientId:'',
        patientName:'',
        idCard:'',
        phoneNumber:'',
      },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      getPages({
        page:this.page,
        size:this.size,
        doctorName:this.searchForm.doctorName,
        date:this.searchForm.date,
      }).then(res => {
        this.data = res.body.records;
        this.total =  res.body.total;
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
    register(records) {
      this.registerVisible = true;
      this.registerForm.id = records.id;
      this.registerForm.date = records.date;
      this.registerForm.time = records.time;
      this.registerForm.doctorName = records.doctorName;
      info(localStorage.getItem("patientId")).then(res => {
        this.registerForm.patientId = res.body.patientId;
        this.registerForm.patientName = res.body.patientName;
        this.registerForm.phoneNumber = res.body.phoneNumber;
        this.registerForm.idCard = res.body.idCard;
      })
    },
    handleOk() {
      insert(this.registerForm).then(res => {
        if (res.code === 200) {
          this.$message.success({
            content:'挂号成功'
          })
          this.init();
          this.registerVisible = false;
          return;
        }
        this.$message.error({
          content:'挂号失败'
        })
      })
      this.registerVisible = false;
    },
    handleCancel() {
      this.registerVisible = false;
    },
  },
}
</script>

<style scoped>

</style>
