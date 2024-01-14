<template>
  <div>
    <br>
    <br>
    <a-divider orientation="left">
      患者信息
    </a-divider>

    <a-card style="width: 1500px;margin-left: 100px">
      <a-input v-model="searchForm.patientId" placeholder="请输入ID" style="width: 200px;float: left" allowClear/>
      <a-input v-model="searchForm.patientName" placeholder="请输入患者姓名" style="width: 200px;float: left;margin-left: 10px" allowClear/>
      <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
        查询
      </a-button>
      <a-button type="primary" icon="plus"  style="float: right" @click="insertVisible = true">
        新增
      </a-button>
      <br><br>

      <a-table :columns="columns" :data-source="data" :pagination="false">
        <span slot="action" slot-scope="text, record">
          <a class="ant-dropdown-link" @click="editShow(record)"> 编辑 </a>
        <a-divider type="vertical" />
        <a @click="deleteAccount(record)">删除</a>
    </span>
      </a-table>

      <br>

      <a-pagination
          v-model="page"
          show-size-changer
          :page-size.sync="size"
          :total="total"
          @showSizeChange="sizeChange"
          @change="onChange"
      />

    </a-card>

    <!--    新增对话抽屉-->
    <a-drawer
        title="新增患者"
        placement="right"
        :closable="false"
        :visible="insertVisible"
        @close="onClose"
        width="440px"
    >
      <a-form-model :model="insertForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="用户ID">
          <a-input v-model="insertForm.patientId"/>
        </a-form-model-item>
        <a-form-model-item label="患者姓名">
          <a-input v-model="insertForm.patientName"/>
        </a-form-model-item>
        <a-form-model-item label="患者年齡">
          <a-input v-model="insertForm.patientAge"/>
        </a-form-model-item>
        <a-form-model-item label="患者性别">
          <a-radio-group v-model="insertForm.patientGender">
            <a-radio value="男">
              男
            </a-radio>
            <a-radio value="女">
              女
            </a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="身份证号">
          <a-input v-model="insertForm.idCard"/>
        </a-form-model-item>
        <a-form-model-item label="联系电话">
          <a-input v-model="insertForm.phoneNumber" />
        </a-form-model-item>
      </a-form-model>
      <div style="margin-left: 80px">
        <a-button icon="plus" type="primary" @click="insertpatient">
          确定
        </a-button>
        <a-button style="margin-left: 10px" icon="close" @click="onClose">
          取消
        </a-button>
      </div>
    </a-drawer>


    <!--    编辑对话抽屉-->
    <a-drawer
        title="编辑患者信息"
        placement="right"
        :closable="false"
        :visible="editVisible"
        @close="editVisible = false"
        width="450px"
    >
      <a-form-model :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="编号">
          <a-input v-model="editForm.id" disabled/>
        </a-form-model-item>
        <a-form-model-item label="ID">
          <a-input v-model="editForm.patientId" disabled/>
        </a-form-model-item>
        <a-form-model-item label="患者姓名">
          <a-input v-model="editForm.patientName"/>
        </a-form-model-item>
        <a-form-model-item label="患者年龄">
          <a-input v-model="editForm.patientAge"/>
        </a-form-model-item>
        <a-form-model-item label="身份证号">
          <a-input v-model="editForm.idCard"/>
        </a-form-model-item>
        <a-form-model-item label="联系电话">
          <a-input v-model="editForm.phoneNumber"/>
        </a-form-model-item>
      </a-form-model>
      <div style="margin-left:100px">
        <a-button icon="plus" type="primary" @click="editpatient">
          确定
        </a-button>
        <a-button style="margin-left: 10px" icon="close" @click="editVisible = false">
          取消
        </a-button>
      </div>
    </a-drawer>

  </div>
</template>

<script>
import {
  page,insert,remove,edit
} from '@/js/patientInfo'
import {count} from "@/js/doctor";
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户ID',
    dataIndex: 'patientId',
    key: 'patientId',
  },
  {
    title: '患者姓名',
    key: 'patientName',
    dataIndex: 'patientName',
  },
  {
    title: '性别',
    key: 'patientGender',
    dataIndex: 'patientGender',
  },
  {
    title: '年齡',
    key: 'patientAge',
    dataIndex: 'patientAge',
  },
  {
    title: '身份证号',
    key: 'idCard',
    dataIndex: 'idCard',
  },
  {
    title: '联系电话',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];

export default {
  name: "PatientInfo",
  data(){
    return{
      editVisible:false,
      insertVisible:false,
      data,
      columns,
      page: 1,
      size: 10,
      total:'',
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      searchForm:{
        patientId:'',
        patientName:'',
      },
      insertForm:{
        patientId:'',
        patientName:'',
        patientGender:'',
        idCard:'',
        phoneNumber:'',
        patientAge:''
      },
      editForm:{
        id:'',
        patientId:'',
        patientName:'',
        idCard:'',
        phoneNumber:'',
        patientAge:''
      },
    }
  },
  created() {
    this.init();
    count().then(res=>{
      this.total = res.body
    })
  },
  methods:{
    init() {
      page({
        page:1,
        size:10
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    search() {
      page({
        page:this.page,
        size:this.size,
        patientId:this.searchForm.patientId,
        patientName:this.searchForm.patientName
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    insertpatient() {
      insert(this.insertForm).then(res=>{
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'新增成功'
          })
          this.insertVisible = false;
          Object.keys(this.insertForm).forEach((key) => (this.insertForm[key] = ''))
          this.init();
          return;
        }
        this.$message.error({
          content:'新增失败'
        })
      })
    },
    editShow(records) {
      this.editVisible = true;
      this.editForm.id = records.id;
      this.editForm.patientId = records.patientId;
      this.editForm.patientName = records.patientName;
      this.editForm.idCard = records.idCard;
      this.editForm.phoneNumber = records.phoneNumber;
      this.editForm.patientAge = records.patientAge;
    },
    editpatient(){
      edit(this.editForm).then(res=>{
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'修改成功'
          })
          this.editVisible = false;
          Object.keys(this.editForm).forEach((key)=>(this.editForm[key] = ''))
          this.init();
          return;
        }
      })
    },
    deleteAccount(records) {
      const id = records.id;
      remove(id).then(res=>{
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'删除成功'
          })
          this.init();
          return;
        }
        this.$message.error({
          content:'删除失败'
        })
      })
    },
    sizeChange(current, pageSize) {
      this.page = current;
      this.size = pageSize;
      page({
        page:this.page,
        size:this.size,
        patientId:this.searchForm.patientId,
        patientName:this.patientName
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    onChange(val) {
      this.page = val;
      page({
        page:this.page,
        size:this.size,
        patientId:this.searchForm.patientId,
        patientName:this.patientName
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    onClose() {
      this.insertVisible = false;
    },
  }
}
</script>

<style scoped>

</style>
