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

    <!--挂号对话框-->
    <a-modal
        title="详情"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
        :width="1500"
    >
      <a-form-model :model="infoForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-descriptions title="就诊详情" bordered>
          <a-descriptions-item label="id">
            {{infoForm.id}}
          </a-descriptions-item>
          <a-descriptions-item label="患者ID">
            {{infoForm.patientId}}
          </a-descriptions-item>
          <a-descriptions-item label="患者姓名">
            {{infoForm.patientName}}
          </a-descriptions-item>
          <a-descriptions-item label="主治医生">
            {{infoForm.doctorName}}
          </a-descriptions-item>
          <a-descriptions-item label="就诊日期">
            {{infoForm.date}}
          </a-descriptions-item>
          <a-descriptions-item label="患者性别">
            {{infoForm.patientGender}}
          </a-descriptions-item>
          <a-descriptions-item label="身份证" :span="2">
            {{infoForm.idCard}}
          </a-descriptions-item>
          <a-descriptions-item label="联系电话" :span="2">
            {{infoForm.phoneNumber}}
          </a-descriptions-item>
          <a-descriptions-item label="药方" :span="3">
            <a-tag color="green" v-for="(item,index) in infoForm.list" :key="index">
              {{item.medicineName}}：{{item.count}}
            </a-tag>
          </a-descriptions-item>
          <a-descriptions-item label="医嘱" :span="3">
            {{infoForm.advice}}
          </a-descriptions-item>
        </a-descriptions>
        <br><br>
      </a-form-model>
    </a-modal>



  </div>
</template>

<script>
import { getInfo, page, reset} from "@/js/register";

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
      visible:false,
      page:1,
      size:10,
      total:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      searchForm:{
        date:'',
      },
      infoForm:{
        advice:'',
        date:'',
        doctorName:'',
        id:'',
        idCard:'',
        patientGender:'',
        patientId:'',
        patientName:'',
        phoneNumber:'',
        list:[],
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
        patientId:localStorage.getItem("patientId")
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
        time:records.time,
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
      this.visible = true;
      getInfo(records.id).then(res => {
        this.infoForm.id = res.body.id;
        this.infoForm.patientId = res.body.patientId;
        this.infoForm.patientName = res.body.patientName;
        this.infoForm.date = res.body.date;
        this.infoForm.idCard = res.body.idCard;
        this.infoForm.phoneNumber = res.body.phoneNumber;
        this.infoForm.advice = res.body.advice;
        this.infoForm.doctorName = res.body.doctorName;
        this.infoForm.patientGender = res.body.patientGender;
        this.infoForm.list = res.body.list;
      })
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
  },
}
</script>

<style scoped>

</style>
