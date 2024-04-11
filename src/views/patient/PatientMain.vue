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
        <img src="../../img/main/1.jpg" style="height: 600px;width: 100%">
      </div>
      <div class="imgDiv">
        <img src="../../img/main/p.jpg" style="height: 600px;width: 100%">
      </div>
    </a-carousel>
    <a-divider />
    <a-page-header
        title="医院简介"
    />
    <div style="float: left;width: 500px;height: 500px">
      <img src="../../img/introduce/11.jpg" style="width: 500px;height: 500px"/>
    </div>
    <div style="float: left;border: 1px black solid;width: 1000px;height: 500px;margin-left: 100px">
      <p>
        1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
        111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
      </p>
    </div>
    <a-divider />
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
    <div style="float: left;width: 400px;height: 300px;border: 1px solid black">
      <span>地图</span>
    </div>
    <div style="float: left;width: 400px;height: 300px;border: 1px solid black;margin-left: 100px">
      <span>二维码</span>
    </div>
    <div style="float: left;width: 400px;height: 300px;border: 1px solid black;margin-left: 20px">
      <div style="float: left;text-align: left">
        <span>地址</span><br>
        <span>电话</span><br>
        <span>院长信箱</span><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientMain"
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
