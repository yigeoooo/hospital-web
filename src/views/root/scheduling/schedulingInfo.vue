<template>
  <div>
    <a-form layout="inline">
      <a-date-picker  valueFormat="YYYY-MM-DD" v-model="date" style="margin-left: 10px"/>
      <a-button icon="search" @click="search" style="margin-left: 10px">
        查询
      </a-button>
    </a-form>
    <br>

    <a-table :columns="columns" :data-source="data" :pagination="false">
      <span slot="action" slot-scope="text, record">
      <a class="ant-dropdown-link" @click="editShow(record)"> 编辑 </a>
         <a-divider type="vertical" />
        <a class="ant-dropdown-link" @click="removeInfo(record)"> 删除 </a>
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
        style="margin-left: 450px"
    />

    <!--    编辑对话抽屉-->
    <a-drawer
        title="修改排班计划"
        placement="right"
        :closable="false"
        :visible="editVisible"
        @close="editVisible = false"
        width="500px"
    >
      <a-form-model :model="editForm" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-date-picker  valueFormat="YYYY-MM-DD" v-model="editForm.date" style="margin-left: 10px"/>
        <a-time-picker value-format="HH:mm:ss" use12-hours format="h:mm a" style="margin-left: 10px" v-model="editForm.time"/>
      </a-form-model>
      <div style="margin-left: 100px"><br>
        <a-button icon="plus" type="primary" @click="editScheduling">
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
import {edit, pages, remove} from "@/js/Scheduling";

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
  name:'schedulingInfo',
  data() {
    return {
      editVisible:false,
      editForm:{
        id:'',
        date:'',
        time:'',
      },
      date:'',
      data,
      columns,
      page: 1,
      size: 10,
      total:500,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      pages({
        page:this.page,
        size:this.size,
        doctorName:sessionStorage.getItem("doctorName"),
        date:this.date
      }).then(res=>{
        this.data = res.body.records;
        this.total = res.body.total;
      })
    },
    search() {
      pages({
        page:this.page,
        size:this.size,
        doctorName:sessionStorage.getItem("doctorName"),
        date:this.date
      }).then(res => {
        this.data = res.body.records;
        this.total = res.body.total;
      })
    },
    editShow(records) {
      this.editVisible = true;
      this.editForm.id = records.id;
      this.editForm.date = records.date;
      this.editForm.time = records.time;
    },
    editScheduling() {
      edit(this.editForm).then(res=>{
        if (res.code === 200 && res.body === true) {
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
    },
    removeInfo(records) {
      remove(records.id).then(res=>{
        if (res.code === 200 && res.body ===true) {
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
