<template>
  <div class="app">
    <TopHeader />
    <router-view />
  </div>
</template>

<script>
import TopHeader from './components/TopHeader.vue'
export default {
  components: { TopHeader },

}
</script>

<style lang="less">
.app{
  background-color: rgb(238, 233, 233);
  min-height: 140vh;
}
</style>