<template>
  <div>
    <a-divider orientation="left">
      药房信息
    </a-divider>

    <a-card style="width: 1500px;margin-left: 100px">
      <a-input v-model="searchForm.medicineId" placeholder="请输入ID" style="width: 200px;float: left" allowClear/>
      <a-input v-model="searchForm.medicineName" placeholder="请输入药品名称" style="width: 200px;float: left;margin-left: 10px" allowClear/>
      <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
        查询
      </a-button>
      <a-button type="primary" icon="plus"  style="float: right" @click="insertVisible = true">
        新药品入库
      </a-button>
      <br><br>

      <a-table :columns="columns" :data-source="data" :pagination="false">
        <span slot="action" slot-scope="text, record">
          <a class="ant-dropdown-link" @click="editShow(record)"> 编辑 </a>
        <a-divider type="vertical" />
          <a class="ant-dropdown-link" @click="editCountShow(record)"> 入库 </a>
          <a-divider type="vertical" />
           <a class="ant-dropdown-link" @click="infoShow(record)"> 详情 </a>
          <a-divider type="vertical" />
        <a @click="deleteMedicine(record)">删除</a>
          <a-divider type="vertical" />
          <a-popover title="警告" v-show="record.count < 50">
            <template slot="content">
              <p>该药品数量小于50，请尽快补充</p>
              <a class="ant-dropdown-link" @click="editCountShow(record)"> 入库 </a>
            </template>
            <a-tag color="red">
              警告
            </a-tag>
  </a-popover>
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


      <!--    药品入库抽屉-->
      <a-drawer
          title="药品入库"
          placement="right"
          :closable="false"
          :visible="insertVisible"
          @close="onClose"
          width="440px"
      >
        <a-form-model :model="insertForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="药品编号">
            <a-input v-model="insertForm.medicineId"/>
          </a-form-model-item>
          <a-form-model-item label="药品名称">
            <a-input v-model="insertForm.medicineName"/>
          </a-form-model-item>
          <a-form-model-item label="药品数量">
            <a-input v-model="insertForm.count"/>
          </a-form-model-item>
        </a-form-model>
        <div style="margin-left: 80px">
          <a-button icon="plus" type="primary" @click="insertMedicine">
            确定
          </a-button>
          <a-button style="margin-left: 10px" icon="close" @click="onClose">
            取消
          </a-button>
        </div>
      </a-drawer>

      <!--    药品更新抽屉-->
      <a-drawer
          title="药品入库"
          placement="right"
          :closable="false"
          :visible="editVisible"
          @close="onClose"
          width="440px"
      >
        <a-form-model :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="ID">
            <a-input v-model="editForm.id" disabled/>
          </a-form-model-item>
          <a-form-model-item label="药品编号">
            <a-input v-model="editForm.medicineId" disabled/>
          </a-form-model-item>
          <a-form-model-item label="药品名称">
            <a-input v-model="editForm.medicineName"/>
          </a-form-model-item>
        </a-form-model>
        <div style="margin-left: 80px">
          <a-button icon="plus" type="primary" @click="editMedicine">
            确定
          </a-button>
          <a-button style="margin-left: 10px" icon="close" @click="onEditClose">
            取消
          </a-button>
        </div>
      </a-drawer>


<!--数量入库对话框-->
      <a-modal
          title="药品入库"
          :visible="countVisible"
          @ok="handleOk"
          @cancel="handleCancel"
      >
        <a-form-model :model="countForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-card title="药品" style="width: 400px;margin-left: 40px">
            <p>ID：{{countForm.id}}</p>
            <p>药品编号：{{countForm.medicineId}}</p>
            <p>药品名称：{{countForm.medicineName}}</p>
          </a-card>
          <br><br>
          <a-form-model-item label="数量" style="margin-left: 10px;">
            <a-input-number :min="10" v-model="countForm.count" style="width: 150px"/>
          </a-form-model-item>
        </a-form-model>
      </a-modal>


      <!--药品详情对话框-->
      <a-modal
          title="详情"
          :visible="infoVisible"
          @ok="handleInfoOk"
          @cancel="handleInfoCancel"
      >
        <a-form-model :model="infoForm" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-form-model-item label="ID" >
            <a-input  v-model="infoForm.id" disabled/>
          </a-form-model-item>
          <a-form-model-item label="药品名称" >
            <a-input  v-model="infoForm.medicineName" disabled/>
          </a-form-model-item>
          <a-form-model-item label="药品别名" >
            <a-input v-model="infoForm.alias" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="用药部位" >
            <a-input v-model="infoForm.medicinalPart" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="产地" >
            <a-input v-model="infoForm.producer" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="药性" >
            <a-input v-model="infoForm.properties" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="功效" >
            <a-input v-model="infoForm.functions" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="禁忌" >
            <a-input v-model="infoForm.taboos" type="textarea" />
          </a-form-model-item>
          <a-form-model-item label="临床应用" >
            <a-input v-model="infoForm.application" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import {
  count, deleteById, getCount,
  getPage, info,
  insert, update, updateInfo,
} from '@/js/medicine.js'
const columns = [
  {
    title: '药品ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '药品编号',
    dataIndex: 'medicineId',
    key: 'medicineId',
  },
  {
    title: '药品名称',
    dataIndex: 'medicineName',
    key: 'medicineName',
  },
  {
    title: '药品数量',
    dataIndex: 'count',
    key: 'count',
  },
  {
    title: '入库时间',
    key: 'insertTime',
    dataIndex: 'insertTime',
  },
  {
    title: '最近更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [];
export default {
  name: "MedicalInfo",
  data() {
    return {
      data,
      columns,
      page:1,
      size:10,
      total:10,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      insertVisible:false,
      infoVisible:false,
      countVisible:false,
      editVisible:false,
      searchForm: {
        medicineId:'',
        medicineName:'',
      },
      insertForm: {
        medicineId:'',
        medicineName:'',
        count:'',
      },
      countForm: {
        id:'',
        medicineId:'',
        medicineName:'',
        count:'',
      },
      editForm:{
        id:'',
        medicineId:'',
        medicineName:'',
      },
      infoForm:{
        id:'',
        medicineName:'',
        alias:'',
        medicinalPart:'',
        producer:'',
        properties:'',
        function:'',
        Taboos:'',
        application:'',
      },
    }
  },
  created() {
    this.init();
    count().then(res=>{
      this.total = res.body;
    })
  },
  methods: {
    init() {
      getPage({
        page: this.page,
        size: this.size,
        medicineId: this.searchForm.medicineId,
        medicineName: this.searchForm.medicineName,
      }).then(res => {
        this.data = res.body.records;
      })
    },
    infoShow(records) {
      this.infoVisible = true;
      info(records.medicineId).then(res => {
        this.infoForm.id = res.body.id;
        this.infoForm.medicineName = res.body.medicineName;
        this.infoForm.alias = res.body.alias;
        this.infoForm.medicinalPart = res.body.medicinalPart;
        this.infoForm.producer = res.body.producer;
        this.infoForm.properties = res.body.properties;
        this.infoForm.functions = res.body.functions;
        this.infoForm.taboos = res.body.taboos;
        this.infoForm.application = res.body.application;
      })
    },
    handleInfoOk() {
      updateInfo(this.infoForm).then(res => {
        if (res.code === 200) {
          this.$message.success({
            content:'更新成功'
          })
          this.infoVisible = false;
          return;
        }
        this.$message.error({
          content:'更新失败'
        })
      })
    },
    handleInfoCancel() {
      this.infoVisible = false;
    },
    search() {
      getPage({
        page: this.page,
        size: this.size,
        medicineId: this.searchForm.medicineId,
        medicineName: this.searchForm.medicineName,
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    deleteMedicine(records) {
      deleteById(records.id).then(res => {
        if (res.code === 200) {
          this.$message.success({
            content:'删除成功'
          })
          this.init();
          return;
        }
        this.$message.error({
          content:'删除失败'
        })
        return;
      })
    },
    editShow(records) {
      this.editVisible = true;
      this.editForm.id = records.id;
      this.editForm.medicineId = records.medicineId;
      this.editForm.medicineName = records.medicineName;
    },
    editMedicine() {
      update(this.editForm).then(res => {
        if (res.code === 200) {
          this.$message.success({
            content:'更新成功'
          })
          this.init();
          this.editVisible = false;
          Object.keys(this.editForm).forEach((key)=>(this.this.editForm[key]=""));
          this.init();
          return;
        }
        this.$message.error({
          content:'更新失败'
        })
        this.editVisible = false;
        return;
      })
    },
    onEditClose() {
      this.editVisible = false;
    },
    editCountShow(records) {
      this.countVisible = true;
      this.countForm.id = records.id;
      this.countForm.medicineId = records.medicineId;
      this.countForm.medicineName = records.medicineName;
    },
    handleOk() {
      getCount(this.countForm).then(res => {
        if (res.code === 200 && res.body === true) {
          this.$message.success({
            content:'入库成功'
          })
          this.init();
          this.countForm.count = '';
          this.countVisible = false;
          return;
        }
        this.$message.error({
          content:'入库失败'
        })
        this.countVisible = false;
      })
    },
    handleCancel() {
      this.countVisible = false;
    },
    sizeChange(current, pageSize) {
      this.page = current;
      this.size = pageSize;
      getPage({
        page: this.page,
        size: this.size,
        medicineId: this.searchForm.medicineId,
        medicineName: this.searchForm.medicineName,
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    onChange(val) {
      this.page = val;
      getPage({
        page: this.page,
        size: this.size,
        medicineId: this.searchForm.medicineId,
        medicineName: this.searchForm.medicineName,
      }).then(res=>{
        this.data = res.body.records;
      })
    },
    onClose() {
      this.insertVisible = false;
    },
    insertMedicine() {
      insert(this.insertForm).then(res => {
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
          content:res.message
        })
        return;
      })
    }
  }
}
</script>

<style scoped>

</style>
