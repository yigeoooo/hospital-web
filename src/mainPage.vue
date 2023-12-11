<template>
  <div>
    <div id="title"><h2>中医信息管理系统</h2></div>
    <div id="menu">
      菜单
    </div>
    <div id="main">
      主题
    </div>
  </div>
</template>

<script>
export default {
  name: "mainPage",
  data(){
    return{

    }
  },
  methods:{

  },
}
</script>

<style scoped>
#menu{
  height: 800px;
  width: 250px;
  border: 1px solid black;
  float: left;
  margin-top: 10px;
}
#title{
  width: 100%;
  height: 50px;
  border: 1px solid black;
}
#main{
  height: 800px;
  border: 1px solid black;
  width: 1370px;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
</style>
