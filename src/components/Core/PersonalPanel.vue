<template>
  <div class="personal-panel">
    <div
      class="personal-desc"
      :style="{ background: this.$store.state.app.themeColor }"
    >
      <div class="avatar-container">
        <img class="avatar" :src="user.avatar" />
      </div>
      <div class="name-role">
        <span class="sender">{{ user.roleName }}</span>
      </div>
      <div class="name-role">
        <span class="sender">{{ user.username }}</span>
      </div>
    </div>
    <div class="other-operation">
      <div class="other-operation-item">
        <i class="fa fa-phone-square"></i>
        <span class="sender">{{ ` ${user.phone}` }}</span>
      </div>
      <div class="other-operation-item">
        <i class="fa fa-envelope-open"></i>
        <span class="sender">{{ ` ${user.email}` }}</span>
      </div>
      <div class="other-operation-item">
        <i class="fa fa-calendar"></i>
        {{ `${user.creatTime}` }}
      </div>
    </div>
    <div class="personal-footer" @click="logout">
      <li class="fa fa-sign-out"></li>
      退出
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalPanel",
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    // 退出登录
    logout: function () {
      this.$confirm("确认退出吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.personal-panel {
  font-size: 14px;
  width: 280px;
  text-align: center;
  border-color: rgba(180, 190, 190, 0.2);
  border-width: 1px;
  border-style: solid;
  background: rgba(182, 172, 172, 0.1);
  margin: -14px;
}
.personal-desc {
  padding: 15px;
  color: #a3aec7;
}
.avatar {
  width: 60px;
  height: 60px;
}
.name-role {
  font-size: 14px;
  padding: 5px;
}
.personal-relation {
  font-size: 16px;
  padding: 12px;
  margin-right: 1px;
  background: rgba(200, 209, 204, 0.3);
}
.relation-item {
  padding: 12px;
}
.relation-item:hover {
  cursor: pointer;
  color: #3070b3;
}
.main-operation {
  padding: 8px;
  margin-right: 1px;
  /* background: rgba(175, 182, 179, 0.3); */
  border-color: rgba(201, 206, 206, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.main-operation-item {
  margin: 15px;
}
.other-operation {
  padding: 15px;
  margin-right: 1px;
  text-align: left;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.other-operation-item {
  padding: 12px;
}
.other-operation-item:hover {
  cursor: pointer;
  background: #9e94941e;
  color: #3070b3;
}
.personal-footer {
  margin-right: 1px;
  font-size: 14px;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-color: rgba(180, 190, 190, 0.2);
  border-top-width: 1px;
  border-top-style: solid;
}
.personal-footer:hover {
  cursor: pointer;
  color: rgb(19, 138, 156);
  background: #b1a6a61e;
}
.registe-info {
  margin-top: 10px;
}
</style>