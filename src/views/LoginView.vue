<template>
  <div>
    <BasePanel>
      <template #panel-head>
        <router-link to="/">主页</router-link>
        /
        <span>登录</span>
      </template>
      <template #panel-content>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model.trim="ruleForm.username"  autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="token">
            <el-input
              type="password"
              v-model.trim="ruleForm.token"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary">提交</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </template>
    </BasePanel>
  </div>
</template>

<script>
import BasePanel from "../components/layout/BasePanel.vue";
import { login } from "../plugins/api";
export default {
  components: { BasePanel },
  data() {
    return {
      ruleForm: {
        username: "",
        token: "7fe004e4-7c63-4de6-8019-7382f2379d93",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        token: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 校验成功
          const res = await login(this.ruleForm.token);
          console.log(res);
          sessionStorage.setItem("userInfo", JSON.stringify(res));
          sessionStorage.setItem("accesstoken", this.ruleForm.token);
          this.$message({
            message: "恭喜你，登录成功",
            type: "success",
          });
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style>
.el-form-item{
  padding-top: 20px;
}
.el-input__inner{
  width: 25%;
}
</style>