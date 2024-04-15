<template>
  <div>
    <a-divider />
    <a-carousel arrows>
      <div
          slot="prevArrow"
          class="custom-slick-arrow"
          style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <div class="imgDiv">
        <img src="../../img/main/主页1.jpg" style="height: 600px;width: 100%">
      </div>
      <div class="imgDiv">
        <img src="../../img/main/主页2.jpg" style="height: 600px;width: 100%">
      </div>
      <div class="imgDiv">
        <img src="../../img/main/主页3.jpg" style="height: 600px;width: 100%">
      </div>
      <div class="imgDiv">
        <img src="../../img/main/主页4.jpg" style="height: 600px;width: 100%">
      </div>
    </a-carousel>
    <a-divider />
    <a-page-header
        title="医院简介"
    />
    <div style="float: left;width: 500px;height: 500px;">
      <img src="../../img/introduce/医院环境1.jpg" style="width: 500px;height: 500px"/>
    </div>
    <div style="float: left;border: 1px black solid;width: 1000px;height: 500px;margin-left: 100px;border-radius: 25px;box-shadow: 5px 5px 5px">
      <br/><br/><br/><br/>
      <p style="text-align: left;font-size: 20px">
          &nbsp; &nbsp; &nbsp; &nbsp;中医指以中国汉族劳动人民创造的传统医学为主的医学，是研究人体生理、病理以及疾病的诊断和防治等的一门学科。中医诞生于原始社会，春秋战国时期中医理论已基本形成，之后历代均有总结发展。中医理论对汉字文化圈国家影响深远。
      </p>
      <p style="text-align: left;font-size: 20px">
        &nbsp; &nbsp; &nbsp; &nbsp;中医诊所是指在中医药理论指导下，运用中药和针灸、拔罐、推拿等非药物疗法开展诊疗服务，以及中药调剂、汤剂煎煮等中药药事服务的诊所，中医药治疗率100%。中医诊所是指以提供中医药门诊诊断和治疗为主的诊所，中医药治疗率不低于85% 。
      </p>
      <p style="text-align: left;font-size: 20px">
        &nbsp; &nbsp; &nbsp; &nbsp;中医诊所成立于2024年，科室设置齐全，中医特色突出、教学实力强,集医疗、教学、预防、保健、康复于一体的现代化综合性中医医院。医院占地300平方米，建筑面积450平方米，固定资产总值100万元，在职职工34人，开放病床20张。医院在发展上始终坚持中医药的特色和优势，并在传承的基础，上进行不断的探索和创新。
      </p>
    </div><br><br><br><br>
    <a-page-header
        title="中药简介"
    />
    <div>
      <a-space size="large">
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/banxia.jpg"
          />
          <a-card-meta title="半夏">
            <template slot="description">
              半夏多用块茎入药，原植物为多年生草本。块茎近球形，叶出自块茎...
            </template>
          </a-card-meta>
        </a-card>
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/lulutong.jpg"
          />
          <a-card-meta title="路路通">
            <template slot="description">
              路路通采自枫香的成熟果序，原植物为乔木，高达40米，树皮灰褐色...
            </template>
          </a-card-meta>
        </a-card>
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/yudancao.jpg"
          />
          <a-card-meta title="鱼胆草">
            <template slot="description">
              鱼胆草全草呈黄绿色，根茎略呈圆柱形，茎纤细圆形略呈四棱形，单...
            </template>
          </a-card-meta>
        </a-card>
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/dangshen.jpg"
          />
          <a-card-meta title="党参">
            <template slot="description">
              党参原植物属草质藤本，除叶片两面密被柔毛外，根常肥大肉质，呈...
            </template>
          </a-card-meta>
        </a-card>
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/sahnjiang.jpg"
          />
          <a-card-meta title="山姜">
            <template slot="description">
              山姜别名和山姜，表面棕色或红棕色，气香，味辛辣。山姜的功效与...
            </template>
          </a-card-meta>
        </a-card>
        <a-card hoverable style="width: 200px">
          <img
              slot="cover"
              alt="example"
              src="../../img/medicine/danmu.jpg"
          />
          <a-card-meta title="胆木">
            <template slot="description">
              胆木的功效与作用：清热解毒，消肿止痛。胆木用法用量：煎汤内服...
            </template>
          </a-card-meta>
        </a-card>
      </a-space>
    </div>
    <a-divider />
    <a-page-header
        title="医院地址"
    />
    <div style="float: left;width: 300px;height: 300px;font-size: 20px">
      <div style="width: 300px;height: 300px">
        <img src="../../img/foot/img.png" style="height: 300px;width: 300px">
      </div>
    </div>
    <div style="float: left;width: 305px;height: 300px;border: 1px solid black;margin-left: 100px;font-size: 20px">
      <div style="width: 300px;height: 300px">
        <img src="../../img/code.jpg" style="height: 300px;width: 300px">
      </div>
    </div>
    <div style="float: left;width: 300px;height: 300px;margin-left: 100px;font-size: 20px">
      <div style="float: left;text-align: left">
        <span>地址:xxx xxx xxx</span><br><br>
        <span>电话:18052365412</span><br><br>
        <span>院长信箱:18052365412@qq.com</span><br><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RootMain",
  data() {
    return {

    }
  },
  methods: {
    onChange(a, b, c) {
      console.log(a, b, c);
    },
  },
}
</script>

<style scoped>
#imgDiv{
  height: 600px;
  width: 100%;
}
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 600px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
