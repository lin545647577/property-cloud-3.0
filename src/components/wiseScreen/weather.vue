<template>
  <div class="box-weather">
    <iframe
      class="weather-box"
      width="250"
      height="60"
      frameborder="0"
      scrolling="no"
      hspace="0"
      src="https://i.tianqi.com/?c=code&a=getcode&id=35&site=34&icon=1"
    ></iframe>
    <p class="data-box">
      {{ dataFormat() }}
      {{ day[daynew] }}
    </p>
  </div>
</template>

<script>
import { dateFormat } from "@/utils/util.js";
export default {
  name: "weather",
  data() {
    return {
      day: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      daynew: new Date().getDay(),
    };
  },
  methods: {
    dataFormat() {
      return dateFormat("yyyy-MM-dd", new Date());
    },
  },
};
</script>

<style scoped>
.box-weather {
  margin-left: 100px;
  pointer-events: none; /*禁止点击事件*/
}
.box-weather * {
  color: #989eb2;
  vertical-align: middle;
}
.box-weather .weather-box {
  display: inline-block;
}
.box-weather .data-box {
  display: inline-block;
  font-size: 18px;
}
</style>
