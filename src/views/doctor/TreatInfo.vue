<template>
  <div>
      <br>
      <a-divider orientation="left">
        就诊信息
      </a-divider>

    <a-date-picker  valueFormat="YYYY-MM-DD" v-model="searchForm.date" style="width: 200px;float: left;margin-left: 30px"/>
    <a-button icon="search" style="float: left; margin-left: 10px" @click="search">
      查询
    </a-button><br><br>

      <a-row>
        <a-col :span="4" v-for="(item,index) in data" :key="index">
            <a-card
                :title="item.patientId" style="margin-left: 30px;">
              <a slot="extra" @click="write(item)">书写病例</a>
              编号：<span>{{item.id}}</span><br>
              姓名：<span>{{item.patientName}}</span><br>
              姓名：<span>{{item.patientGender}}</span><br>
              身份证号：<span>{{item.idCard}}</span><br>
              联系电话：<span>{{item.phoneNumber}}</span><br>
              日期：<span>{{item.date}}</span><br>
              时间：<span>{{item.time}}</span><br>
              是否就诊: <span v-if="item.status === true">是</span>
              <span v-if="item.status === false">否</span><br>
            </a-card><br>

          <!--病例对话框-->
          <a-modal
              title="病例"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel"
              width="80%"
          >
            <a-form-model :model="writeForm" layout="inline">
              <a-form-model-item label="编号" style="margin-left: 45px">
                <a-input v-model="writeForm.id" disabled/>
              </a-form-model-item>
                <a-form-model-item label="患者ID">
                  <a-input v-model="writeForm.patientId" disabled/>
                </a-form-model-item>
                <a-form-model-item label="患者名字">
                  <a-input v-model="writeForm.patientName" disabled/>
                </a-form-model-item>
              <a-form-model-item label="患者性别">
                <a-input v-model="writeForm.patientGender" disabled/>
              </a-form-model-item><br><br>
              <a-form-model :model="writeForm" layout="inline">
                <a-form-model-item label="身份证号" style="margin-left: 45px">
                  <a-input v-model="writeForm.idCard" disabled/>
                </a-form-model-item>
                <a-form-model-item label="联系电话" style="margin-left: 45px">
                  <a-input v-model="writeForm.phoneNumber" disabled/>
                </a-form-model-item>
              </a-form-model><br><br>

              <div v-for="(item,index) in medicineForm.item" :key="index" style="margin-left: 40px">
                <a-form layout="inline">
                  <a-select
                      show-search
                      style="width: 200px"
                      placeholder="请选择药品"
                      allowClear
                      @search="handleSearch"
                      v-model="item.medicineName"
                  >
                    <a-select-option v-for="d in medicineList" :key="d.medicineName">
                      {{d.medicineId}}-{{ d.medicineName }}-库存:{{d.count}}
                    </a-select-option>
                  </a-select>
                  <a-input-number v-model="item.count" :min="1" placeholder="请输入药品数量" style="width: 150px;margin-left: 10px"/>
                  <a-button type="primary" style="width: 60px;margin-left: 10px" @click="add"><span style="font-size: 20px;">+</span></a-button>
                  <a-button
                      type="danger"
                      style="width: 60px;margin-left: 10px"
                      @click="substraction(item, index)"
                  ><span style="font-size: 20px">-</span></a-button><br><br>
                </a-form>
              </div>

              <a-card title="病例信息" style="width: 1200px;margin-left: 40px">
                <v-md-editor v-model="writeForm.text" height="400px"></v-md-editor>
              </a-card>
              <br><br>
            </a-form-model>
          </a-modal>
        </a-col>
      </a-row>

    <br><br>

    <a-divider>
    </a-divider>

        <a-pagination
            v-model="page"
            show-size-changer
            :page-size.sync="size"
            :total="total"
            @showSizeChange="sizeChange"
            @change="onChange"
            style="margin-left: 50px;"
        />

    <a-divider>
    </a-divider>
  </div>

</template>

<script>
import {pages} from "@/js/register";
import {getMedineList} from "@/js/medicine";

export default {
  name: "TreatInfo",
  data() {
    return {
      visible:false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      data:[],
      medicineList:[],
      page:1,
      size:10,
      total:500,
      searchForm: {
        date:'',
        doctorId:localStorage.getItem("doctorId"),
        page:this.page,
        size:this.size,
      },
      writeForm:{
        test:'',
        id:'',
        patientId:'',
        patientName:'',
        patientGender:'',
        idCard:'',
        phoneNumber:'',
      },
      medicineForm :{
        item:[
          {
            medicineId:'',
            medicineName:'',
            count:'',
          }
        ]
      },
      medicineName:'',
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      pages({
        date:this.searchForm.date,
        doctorId:localStorage.getItem("doctorId"),
        page:this.page,
        size:this.size,
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
    write(item) {
      this.writeForm.patientId = item.patientId;
      this.writeForm.patientName = item.patientName;
      this.writeForm.patientGender = item.patientGender;
      this.writeForm.id = item.id;
      this.writeForm.idCard = item.idCard;
      this.writeForm.phoneNumber = item.phoneNumber;
      this.visible = true;
      getMedineList({
        medicineName:this.medicineName,
      }).then(res => {
        this.medicineList = res.body;
      })
    },
    handleOk() {
      this.visible = false;
    },
    handleCancel() {
      this.visible = false;
    },
    add() {
      this.medicineForm.item.push({
        medicineId:'',
        medicineName:this.medicineName,
        count:'',
      });
    },
    substraction(item, index) {
      if (this.medicineForm.item.length <= 1) {
        return;
      }
      this.medicineForm.item.splice(index, 1);
    },
    handleSearch(item) {
      console.log(item)
      getMedineList({
        medicineName:item.medicineName,
      }).then(res => {
        this.medicineList = res.body;
      })
    },
  },
}
</script>

<style scoped>

</style>
