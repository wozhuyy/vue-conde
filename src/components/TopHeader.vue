<template>
  <header>
    <div class="inner">
      <router-link to="/">
        <img
          width="140px"
          class="logo"
          src="../assets/logo.jpg"
          alt=""
        />
      </router-link>
      <div class="header-right">
        <router-link class="home-link" to="/">首页</router-link>
        <el-badge :hidden="messageCount === 0" :value="messageCount">
          <router-link v-if="userInfo" to="/my/message">未读消息</router-link>
        </el-badge>
        <router-link v-if="userInfo" to="/topic/create">发布话题</router-link>
        <!-- <router-link class="home-link" to="/"></router-link> -->
        <router-link v-if="!userInfo" to="/login">
          <el-button type="primary">登录</el-button>
        </router-link>
        <img v-if="userInfo" width="40" :src="userInfo.avatar_url" alt="" />
        <el-button @click="logout" v-if="userInfo">退出</el-button>
      </div>
    </div>
  </header>
</template>

<script>
import { getMessageCount } from "../plugins/api";
export default {
  data() {
    return {
      userInfo: null,
      messageCount: 0,
    };
  },

  watch: {
    "$route.path": {
      async handler(val) {
        const userInfoJson = sessionStorage.getItem("userInfo");
        if (val === "/" && !this.userInfo && userInfoJson) {
          this.userInfo = JSON.parse(userInfoJson);
          const res = await getMessageCount(
            sessionStorage.getItem("accesstoken")
          );
          this.messageCount = res.data;
        }
      },
      immediate:true,
    },
  },
  created() {
    const userInfoJson = sessionStorage.getItem("userInfo");
    if (userInfoJson) {
      this.userInfo = JSON.parse(userInfoJson);
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("accesstoken");
      this.userInfo = null;
      // 在首页点击退出的时候并不需要push('/')
      if (this.$router.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang= "less">
header {
  width: 100%;
  height: 50px;
  background-color: #000000;
  .inner {
    width: 1400px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 50px;
    justify-content: space-between;
    img{
      height: 40px;
    }
    .header-right a{
      color: #fff;
      margin-left: 20px;
    }
  }
  .home-link {
    color: #fff;
    margin-right: 20px;
    font-size: 14px;
  }
}
</style>