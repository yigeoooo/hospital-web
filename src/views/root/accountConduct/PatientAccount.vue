<template>
  <div>
    <a-input v-model="searchForm.patientId" placeholder="请输入ID" style="width: 200px;float: left" allowClear/>
    <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
      查询
    </a-button>
    <a-button type="primary" icon="plus"  style="float: right" @click="insertShow">
      新增
    </a-button>
    <br><br>

    <a-table :columns="columns" :data-source="data" :pagination="false">
      <span slot="status" slot-scope="text, record">
        <a-switch :checked="record.status" @click="change(text, record)"/>
      </span>
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
        :total="500"
        @showSizeChange="sizeChange"
        @change="onChange"
    />


    <!--    新增对话抽屉-->
    <a-drawer
        title="新增管理员账户"
        placement="right"
        :closable="false"
        :visible="visible"
        @close="onClose"
        width="750px"
    >
      <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="ID">
          <a-input v-model="form.patientId"/>
        </a-form-model-item>
        <a-form-model-item label="password">
          <a-input v-model="form.password" type="password"/>
        </a-form-model-item>
        <a-form-model-item label="confirmPassword">
          <a-input v-model="form.confirmPassword" type="password"/>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-switch  v-model="form.status"/>
        </a-form-model-item>
      </a-form-model>
      <div style="margin-left: 250px">
        <a-button icon="plus" type="primary" @click="insertPatient">
          确定
        </a-button>
        <a-button style="margin-left: 10px" icon="close" @click="onClose">
          取消
        </a-button>
      </div>
    </a-drawer>

    <!--    修改对话抽屉-->
    <a-drawer
        title="新增管理员账户"
        placement="right"
        :closable="false"
        :visible="editVisible"
        @close="editVisible = false"
        width="750px"
    >
      <a-form-model :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="编号">
          <a-input v-model="editForm.id" disabled/>
        </a-form-model-item>
        <a-form-model-item label="ID">
          <a-input v-model="editForm.patientId"/>
        </a-form-model-item>
        <a-form-model-item label="password">
          <a-input v-model="editForm.password" type="password"/>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-switch  v-model="editForm.status"/>
        </a-form-model-item>
      </a-form-model>
      <div style="margin-left: 250px">
        <a-button icon="plus" type="primary" @click="editRoot">
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
  page, remove,
  status,add,edit
} from '@/js/patient'
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
    title: '密码',
    key: 'password',
    dataIndex: 'password',
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];
export default {
  name: "PatientAccount",
  data(){
    return{
      data,
      columns,
      editVisible:false,
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      page: 1,
      size: 10,
      form:{
        id:'',
        patientId:'',
        password:'',
        status:true,
        confirmPassword:'',
      },
      searchForm:{
        patientId:'',
      },
      editForm: {
        id:'',
        patientId:'',
        password:'',
        status:''
      }
    }
  },
  methods:{
    init() {
      page ({
        page: 1,
        size: 10
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    change(text, records) {
      records.status = !records.status;
      status({
        id:records.id,
        status:records.status
      }).then(res=>{
        if (res.resultCode == '200') {
          this.$message.success({
            content:'修改成功'
          })
        }
        this.init();
      })
    },
    deleteAccount(records) {
      remove({
        id:records.id
      }).then(res=>{
        if (res.resultCode == '200') {
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
    insertShow() {
      this.visible = true;
    },
    insertPatient() {
      if (this.form.password != this.form.confirmPassword) {
        this.$message.error({
          content:'两次密码输入不一致'
        })
        return;
      }
      add({
        patientId:this.form.patientId,
        password:this.form.password,
        status:this.form.status
      }).then(res=>{
        if (res.resultCode == '200' && res.body == true) {
          this.$message.success({
            content:'新增成功'
          })
          Object.keys(this.form).forEach((key)=>(this.form[key]=""))
          this.visible = false;
          this.init();
          return;
        }
        this.$message.error({
          content:'新增失败, 用户ID重复'
        })
      })
    },
    onClose() {
      this.visible = false;
    },
    sizeChange(current, pageSize) {
      this.page = current;
      this.size = pageSize;
      page({
        page:this.page,
        size:this.size,
        patientId:this.form.patientId,
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    onChange(val) {
      this.page = val;
      page({
        page:this.page,
        size:this.size,
        patientId:this.form.patientId
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    search() {
      page({
        page:1,
        size:this.size,
        patientId:this.searchForm.patientId
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    editShow(records) {
      this.editVisible = true;
      this.editForm.id = records.id;
      this.editForm.patientId = records.patientId;
      this.editForm.password = records.password;
      this.editForm.status = records.status;
    },
    editRoot() {
      edit({
        id:this.editForm.id,
        patientId:this.editForm.patientId,
        password:this.editForm.password,
        status:this.editForm.status
      }).then(res=>{
        if (res.resultCode == '200' && res.body == true) {
          this.$message.success({
            content:'修改成功'
          })
          this.editVisible = false;
          Object.keys(this.editForm).forEach((key)=>(this.editForm[key]=""))
          this.init();
          return;
        }
        this.$message.error({
          content:'修改失败'
        })
      })
    }
  },
  created() {
    this.init();
  }
}
</script>

<style scoped>

</style>
