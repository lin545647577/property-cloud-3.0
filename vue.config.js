const path = require("path");
module.exports = {
  productionSourceMap: false,
  devServer: {
    port: 3050,
    open: true,
    disableHostCheck: true,
    overlay: {
      warning: false,
      errors: true,
    },
    proxy: {
      ["/prod-api-v2"]: {
        target: `http://192.168.66.113:8082`, //2.0系统跳转用
        changeOrigin: true,
        pathRewrite: {
          ["^/prod-api-v2"]: "",
        },
      },
      [process.env.VUE_APP_API_BASE_URL + "/static-url"]: {
        target: `http://192.168.65.126:9300`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_API_BASE_URL + "/static-url"]: "",
        },
      },
      [process.env.VUE_APP_API_BASE_URL]: {
        // target: "http://192.168.66.103:8080", //接口地址
        target: "http://192.168.66.111:8080",
        // target: "http://192.168.65.126:8080",
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_API_BASE_URL]: "",
        },
      },
      // ["/socket"]: {
      //   target: "ws://192.168.66.103:8080", //socket地址
      //   ws: true, //如果要代理 websockets，配置这个参数
      //   changeOrigin: true, //是否跨域
      //   pathRewrite: {
      //     ["^/socket"]: "",
      //   },
      // },
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "物管云平台";
      return args;
    });
    // config.resolve.alias.set("main", path.resolve(__dirname, "../frame/src"));
  },
};
