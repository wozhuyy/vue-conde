<template>
  <div class="base-panel">
    <!-- 如果没有传递剧名插槽 panel-head 的话就不需要展示 -->
    <!-- $slots['panel-head'] -->
  <div class="panel-head" v-if="$slots['panel-head']" >
    <slot name="panel-head" />
  </div>
  <div class="panel-content">
    <slot name="panel-content" />
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less'>
.base-panel {
  width: 1400px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  .panel-head{
    padding: 15px 10px;
    background-color: rgb(225, 222, 222);
    border-bottom: 1px solid #ccc;
  }
  .panel-content{
    background-color: rgb(177, 199, 225);
  }
}
</style>