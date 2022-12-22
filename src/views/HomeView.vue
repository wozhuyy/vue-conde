<template>
  <div class="home">
    <base-panel>
      <template #panel-head>
        <div class="nav">
          <router-link
            :class="
              ($route.path === '/' || $route.path === '/all') ? 'active' : ' '
            "
            to="/all"
            >全部</router-link
          >
          <router-link active-class="active" to="/share">分享</router-link>
          <router-link active-class="active" to="/ask">问答</router-link>
          <router-link active-class="active" to="/job">招聘</router-link>
          <router-link active-class="active" to="/good">精华</router-link>
          <router-link active-class="active" to="/dev">客户端测试</router-link>
        </div>
      </template>
      <template #panel-content>
        <router-view />
      </template>
    </base-panel>

    
  </div>
</template>

<script>
import BasePanel from "../components/layout/BasePanel.vue";
export default {
  components: { BasePanel },
};
</script> 

<style lang="less">
.home {
  .nav {
    display: flex;
    align-items: center;
    a {
      margin-right: 20px;
      padding: 4px;
      font-size: 14px;
      color: green;
      border-radius: 4px;
      background-color: rgb(222, 222, 222);
    }
    a.active {
      color: #fff;
      background-color: rgb(149, 155, 155);
    }
  }
}
</style>