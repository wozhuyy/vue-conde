<template>
  <div>
    <BasePanel>
    <template #panel-head>
      <router-link to="/">主页</router-link>
      /
      <span>新消息</span>
    </template>
    <template #panel-content>
      <!-- 未读消息展示 -->
      <div v-if="hasnot_read_messages.length">
        <div v-for="hasnot_read in hasnot_read_messages" :key="hasnot_read.id" class="message">
        <router-link :to="`/user/${hasnot_read.author.loginname}`"><img class="avatar_url" :src="hasnot_read.author.avatar_url" alt="" /></router-link>
      
      <div class="content">
        <router-link :to="`/user/${hasnot_read.author.loginname}`"><span>{{ hasnot_read.author.loginname }}</span></router-link>
        <span>{{ hasnot_read.type === 'reply' ? '回复了你的话题' :  '在' }}</span>
        <router-link :to="`/topic/${hasnot_read.topic.id}`"><h4>{{ hasnot_read.topic.title }}</h4></router-link>
        <span v-if="hasnot_read.type === 'at'">@了你</span>
      </div>
      <span class="time">{{ hasnot_read.create_at | fromNow }}</span>
    </div>
      </div>
      <div v-else>
      <span>无消息</span>
    </div>
      <!-- <div>{{messages.hasnot_read_messages}}</div> -->
    </template>
    
    </BasePanel>
    <BasePanel>
    <template #panel-head>
      <span>过往消息</span>
    </template>
    <template  #panel-content>
      <!-- <MessageItem v-for="has_read in has_read_messages" :key="has_read.id" v-bind="has_read" /> -->
      <!-- <div>{{messages.has_read_messages}}</div> -->
       <div v-for="has_read in has_read_messages" :key="has_read.id" class="message">
        <router-link :to="`/user/${has_read.author.loginname}`"><img class="avatar_url" :src="has_read.author.avatar_url" alt="" /></router-link>
      
      <div class="content">
        <router-link :to="`/user/${has_read.author.loginname}`"><span>{{ has_read.author.loginname }}</span></router-link>
        <span>{{ has_read.type === 'reply' ? '回复了你的话题' :  '在' }}</span>
        <router-link :to="`/topic/${has_read.topic.id}`"><h4>{{ has_read.topic.title }}</h4></router-link>
        <span v-if="has_read.type === 'at'">@了你</span>
      </div>
      <span class="time">{{ has_read.create_at | fromNow }}</span>
    </div>
    </template>
    </BasePanel>
  </div>
</template>

<script>
import BasePanel from '../components/layout/BasePanel.vue'
import {getMessage,markAllMessage} from '../plugins/api'
export default {
  components: { BasePanel},
  data(){
    return {
      messages: null,
      has_read_messages:'',
      hasnot_read_messages:''
    }
  },
  async created(){
    const res = await getMessage(sessionStorage.getItem('accesstoken'))
    this.messages = res.data
    this.has_read_messages = res.data.has_read_messages
    this.hasnot_read_messages = res.data.hasnot_read_messages
    console.log(res.data.hasnot_read_messages)
    // 有未读消息的话需要标记为已读
    if(res.data.hasnot_read_messages.length){
      markAllMessage(sessionStorage.getItem('accesstoken'))
    }
  }

}
</script>

<style lang="less">
.message {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #000;
  img {
    width: 50px;
  }
  .content {
    display: flex;
    flex-grow: 1;
  }
  .time {
    font-size: 14px;
    margin-right: 10px;
  }
}
</style>