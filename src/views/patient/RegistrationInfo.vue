<template>
  <div>
    <a-divider orientation="left">
      预约挂号
    </a-divider>

    <a-date-picker @change="onChange" style="position: absolute;left: 150px"/>

  </div>
</template>

<script>
export default {
  name: "RegistrationInfo",
  data() {
    return {

    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
    },
  }
}
</script>

<style scoped>

</style>
