<template>
  <div class="topic-item">
      <router-link :to="`/user/${author.loginname}`"
        ><img class="avatar_url" :src="author.avatar_url" alt=""
      /></router-link>
      <span class="count" v-if="!isUser">
        <span>{{ reply_count }}</span>
        /
        <span>{{ visit_count }}</span>
      </span>
      <el-tag
        class="tag"
        size="mini"
        effect="dark"
        v-if="top || good"
        type="success"
        >{{ top ? "置顶" : "精华" }}</el-tag>
      <el-tag class="tag" size="mini" v-else-if="!isUser" type="info">{{
        tab | tabTextTransform
      }}</el-tag>
      <router-link class="title" :to="`/topic/${id}`"
        ><h4>{{ title }}</h4></router-link
      >
      <span class="time">{{ last_reply_at | fromNow }}</span>
  </div>
</template>

<script>
export default {
  props: [
    "author",
    "good",
    "last_reply_at",
    "reply_count",
    "tab",
    "title",
    "top",
    "title",
    "top",
    "visit_count",
    "id",
    "isUser",
    "isMessage",
    "has_read_messages",
    "hasnot_read_messages",
  ],
};
</script>

<style lang="less">
.topic-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  img {
    width: 40px;
    margin-right: 4px;
    border-radius: 50%;
  }
}
.count {
  display: flex;
  align-items: center;
  width: 80px;
  font-size: 12px;
  margin-right: 5px;
  justify-content: center;
}
.title {
  flex-grow: 1;
  margin-left: 15px;
}
.title :hover {
  color: rgb(155, 155, 158);
}
a {
  color: #000;
}
.time {
  font-size: 15px;
  color: rgb(80, 79, 79);
}
</style>