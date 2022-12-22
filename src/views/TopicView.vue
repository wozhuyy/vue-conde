<template>
  <div class="topic" v-if="topic">
    <BasePanel>
      <template #panel-content>
        <div class="topic-head">
          <div class="head-top">
            <el-tag
              size="mini"
              effect="dark"
              v-if="topic.top || topic.good"
              type="success"
              >{{ topic.top ? "置顶" : "精华" }}</el-tag
            >
            <h3>{{ topic.title }}</h3>
            <el-button v-if="accesstoken" @click="collect" type='success'>{{topic.is_collect ? '取消收藏' : '收藏'}}</el-button>
          </div>
          <p>
            <span class="icon-dian iconfont disc"></span>
            <span>发布于{{ topic.create_at | fromNow }}</span>
            <span class="icon-dian iconfont disc"></span>
            <span>作者{{ topic.author.loginname }}</span>
            <span class="icon-dian iconfont disc"></span>
            <span>{{ topic.visit_count }}次浏览</span>
            <span class="icon-dian iconfont disc"></span>
            <span>来自{{ topic.tab | tabTextTransform }}</span>
          </p>
        </div>
        <div class="topic-content" v-html="topic.content"></div>
      </template>
    </BasePanel>
    <BasePanel v-if="topic.replies.length">
      <template #panel-head>
        <div class="comment-head">
          <span>{{ topic.replies.length }}回复</span>
        </div>
      </template>
      <template #panel-content>
        <div class="comment-list">
          <div
            v-for="(comment, index) in topic.replies"
            :key="comment.id"
            :class="[
              'comment-item',
              { active: commentLikeMost.includes(comment.id) },
            ]"
          >
            <router-link :to="`/user/${comment.author.loginname}`">
            <img :src="comment.author.avatar_url" alt="" />
            </router-link>
            <div class="comment-content">
              <span class="info">
                <span>
                  <router-link :to="`/user/${comment.author.loginname}`">{{ comment.author.loginname }}</router-link>
                   {{ index + 1 }}楼
                  <span class="icon-dian iconfont disc"></span>
                  {{ comment.create_at | fromNow }}
                </span>
                <span class="like" v-if="accesstoken || comment.ups.length">
                  <span @click="like(comment)" :class="['icon-dianzan' ,'iconfont',{up: comment.is_uped}]"></span>
                  <span v-if="comment.ups.length">{{ comment.ups.length }}</span>
                </span>
              </span>
              <span class="text" v-html="comment.content"></span>
            </div>
          </div>
        </div>
      </template>
    </BasePanel>
    <BasePanel v-if="accesstoken">
    <template #panel-head>
      添加回复
    </template>
    <template #panel-content>
      <textarea class="comment-box" v-model.trim="commentText"></textarea>
      <el-button @click="reply" type="primary">回复</el-button>
    </template>
    </BasePanel>
  </div>
</template>

<script>
import BasePanel from "../components/layout/BasePanel.vue";
import { collected, de_collected, getTopic,zan,reply } from "../plugins/api";
export default {
  components: { BasePanel },
  props: ["topicId"],
  data() {
    return {
      topic: null,
      accesstoken: '',
      commentText:''
    };
  },
  computed: {
    // 文章评论数组中点赞前两名的评论
    commentLikeMost() {
      if (this.topic.replies.length === 0) {
        return [];
      }
      const arr = this.topic.replies.slice(0).sort(
        (a, b) => b.ups.length - a.ups.length
      );
      const commentIds = [];
      const maxOne = arr[0].ups.length;
      if (maxOne > 2) {
        const oneArr = arr.filter((item) => item.ups.length === maxOne);
        oneArr.forEach((ele) => {
          commentIds.push(ele.id);
        });
        const maxTwo = arr[oneArr.length].ups.length;
        if (maxTwo > 2) {
          const twoArr = arr.filter((item) => item.ups.length === maxTwo);
          twoArr.forEach((ele) => {
            commentIds.push(ele.id);
          });
        }
      }
      return commentIds;
    },
  },
  async created() {
    const accesstoken = sessionStorage.getItem('accesstoken')
    if(accesstoken){
      this.accesstoken = accesstoken
    }
    const res = await getTopic(this.topicId,accesstoken || null);
    this.topic = res.data;
  },
  methods:{
    async collect(){
      const accesstoken = this.accesstoken
      if(this.topic.is_collect){
        // 取消
        await de_collected(this.topic.id, accesstoken)
        this.topic.is_collect = false
      }else{
        // 收藏
        await collected(this.topic.id,accesstoken)
        this.topic.is_collect = true
      }
    },
    async like(comment){
      // 不能对自己的评论点赞
      const accesstoken = this.accesstoken
      if(accesstoken){
        const res = await zan(comment.id,accesstoken)
        const id = JSON.parse(sessionStorage.getItem('userInfo')).id
        if(res.action === 'up'){
          // 点赞成功
          // 修改对应评论的 is_uped 以及 ups
          comment.is_uped = true
          comment.ups.push(id)
        }else{
          // 取消点赞成功
          // 修改对应评论的 is_uped  以及 ups
          comment.is_uped = false
          comment.ups = comment.ups.filter(item => item !== id)
        }
      }
      
    },
    async reply(){
      const {commentText,accesstoken,topic} = this
      await reply(topic.id,accesstoken,commentText)
      // 评论的请求成功之后，后端返回的数据太少，
      const res = await getTopic(this.topicId,accesstoken);
      this.topic = res.data
      this.commentText = ''
    }
  }
};
</script>

<style lang='less'>
.topic {
  .topic-head {
    background-color: #fff;
    padding: 20px;
    border-bottom: 1px solid #ccc;
    .head-top {
      display: flex;
      align-items: center;
      h3 {
        margin-left: 20px;
        font-size: 30px;
      }
    }
    p {
      margin-top: 5px;
      font-size: 12px;
      display: flex;
      align-items: center;
      .disc {
        font-size: 20px;
        margin-top: 1px;
      }
    }
  }
  .topic-content {
    background-color: #fff;
    line-height: 1.5;
    img {
      width: 100%;
    }
  }
  .comment-list {
    .comment-item {
      display: flex;
      align-items: flex-start;
      border-bottom: 1px solid #ccc;
      padding: 10px 10px 20px;
      img {
        width: 40px;
        margin-right: 15px;
        border-radius: 5px;
      }
      .comment-content {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        .info {
          display: flex;
          justify-content: space-between;
          .up{
            color: red;
          }
        }
      }
    }
    .comment-item.active {
      background-color: rgb(52, 190, 47);
    }
  }
  .comment-box{
    width: 400px;
    height: 200px;
  }
}
</style>