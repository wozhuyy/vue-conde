<template>
  <div v-if="userInfo">
    <base-panel>
      <template #panel-head>
        <router-link to="/">主页/</router-link>
      </template>
      <template #panel-content>
        <div class="user-top">
          <img class="userImg" :src="userInfo.avatar_url" alt="" />
          <p>{{ userInfo.loginname }}</p>
        </div>
        <div class = "user-bottom">
          <span class="time">注册时间{{ userInfo.create_at | fromNow }}</span>
        </div>
      </template>
    </base-panel>
    <base-panel>
      <template #panel-head> 最近创建的话题 </template>
      <template #panel-content>
        <TopicItem
          v-for="item in userInfo.recent_topics"
          :key="item.id"
          v-bind="item"
          :isUser="true"
        />
      </template>
    </base-panel>
    <base-panel>
      <template #panel-head> 最近参加的话题 </template>
      <template #panel-content>
        <TopicItem
          :isUser="true"
          v-for="item in userInfo.recent_replies"
          :key="item.id"
          v-bind="item"
        />
      </template>
    </base-panel>
  </div>
</template>

<script>
import BasePanel from "../components/layout/BasePanel.vue";
import TopicItem from "../components/TopicItem.vue";
import { getUserInfo } from "../plugins/api";
export default {
  components: { BasePanel, TopicItem },
  props: ["loginname"],
  data() {
    return {
      userInfo: null,
    };
  },
  watch: {
    loginname: {
      async handler(val) {
        const res = await getUserInfo(val);
        this.userInfo = res.data;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="less">
.user-top {
  display: flex;
  .userImg {
    width: 40px;
    margin-right: 10px;
  }
  p {
    font-size: 14px;
    margin-top: 8px;
    color: rgb(83, 83, 83);
  }
}
.user-bottom{
  display: flex;
  flex-direction: column;
  .time {
    color: rgb(85, 84, 84);
  }
}
</style>