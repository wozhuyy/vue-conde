<template>
  <div>
    <BasePanel>
      <template #panel-head>
        <router-link to="/">主页</router-link>
        /
        <span>发布话题</span>
      </template>
      <template #panel-content>
        <span>选择板块:</span>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
          <el-form-item prop="tab">
            <el-select v-model="ruleForm.tab" placeholder="请选">
              <el-option label="分享" value="share">分享</el-option>
              <el-option label="招聘" value="job">招聘</el-option>
              <el-option label="问答" value="ask">问答</el-option>
              <el-option label="客户端测试" value="dev">客户端测试</el-option>
            </el-select>
          </el-form-item>
          <el-form-item lbael="标题" prop="title">
            <el-input
              v-model="ruleForm.title"
              placeholder="标题数字10字以上"
              clearable
            />
          </el-form-item>
          <el-form-item prop="content">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.content"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </template>
    </BasePanel>
  </div>
</template>

<script>
import BasePanel from "../components/layout/BasePanel.vue";
import { create } from "../plugins/api";
export default {
  components: { BasePanel },
  data() {
    return {
      ruleForm: {
        tab: "",
        title: "",
        content: "",
      },
      rules: {
        tab: [{ required: true, message: "请选择", trigger: "blur" }],
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 10, message: "标题数字10字以上", trigger: "blur" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const { tab, content, title } = this;
          const accesstoken = sessionStorage.getItem("accesstoken");
          const res = await create(accesstoken, title, tab, content);
          this.$router.push(`/topic/${res.topic_id}`);
        }
      });
    },
  },
};
</script>

<style>
</style>