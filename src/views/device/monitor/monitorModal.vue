<template>
  <div v-if="videoUrl">
    <!--    <div class="video-box" id="VideoBox"></div>-->
    <easy-player :video-url="videoUrl"></easy-player>
  </div>
</template>

<script>
export default {
  name: "monitorModal",
  props: {
    params: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      videoUrl: "",
    };
  },
  methods: {},
  mounted() {
    this.videoUrl = this.params.addr;
  },
};
</script>

<style scoped>
.video-box {
  width: 100%;
}
.my-video {
  width: 100%;
}
</style>
