<template>
  <div>
    <div>首页</div>
    <kt-button
      icon="fa fa-trash"
      label="测试按钮权限1"
      perms="btn:test1"
      :size="size"
      type="success"
    />
    <kt-button
      icon="fa fa-trash"
      label="测试按钮权限2"
      perms="btn:test2"
      :size="size"
      type="danger"
    />
  </div>
</template>
<script>   
import KtButton from "@/components/Core/KtButton";
export default {
  components: {
    KtButton
  },
  data() {
    return {
      size: "small"
    };
  },
  mounted() {},
  methods: {}
};
</script>