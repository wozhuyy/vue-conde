<template>
  <div>
    <el-skeleton v-if="loading" :rows="6" animated />
    <div v-else>
      <TopicItem v-for="topic in topics" :key="topic.id" v-bind="topic" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="pageInfo[tab || 'all'].total"
      :page-size="40"
      :current-change="page"
      @current-change="currentChange"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTopics } from "../plugins/api";
import TopicItem from "../components/TopicItem.vue";
export default {
  data() {
    return {
      topics: [],
      loading: false,
      page:1,
      pageInfo: {
        all: {
          total: 240
        },
        good: {
          total: 720
        },
        share: {
          total: 160
        },
        ask: {
          total: 80
        },
        job: {
          total: 80
        },
        dev: {
          total: 280
        },
      }
    };
  },
  props: ["tab"],
  components: { TopicItem },
  watch: {
    tab: {
      async handler(val) {
        this.loading = true
        const page = this.$route.query.page
        const res = await getTopics({ tab: val || "all" , page: page || 1 });
        this.page = page * 1 || 1
        this.loading = false
        this.topics = res.data;
      },
      immediate:true
    },
  },
  methods: {
    async currentChange(page) {
      this.page = page
      const res = await getTopics({ tab: this.tab , page });
      this.topics = res.data;
      this.$router.push(this.$route.path + `?page=${page}`)
    },
  },
};
</script>

<style>
</style>