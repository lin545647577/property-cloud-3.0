/**
 * 防抖
 * @param {Function} fn 回调函数
 * @param {Number} delay 延时毫秒  默认200毫秒
 */
export function debounce(fn, delay) {
  delay = delay || 200;
  var timer;
  // let num = 0;
  return function () {
    clearTimeout(timer);
    let args = Array.prototype.shift.call(arguments);
    // let args = arguments;
    timer = setTimeout(function () {
      // console.log(++num);
      fn(args);
    }, delay);
  }; //内里函数不传参数可以绑定监听事件后 以便删除
}

/**
 * 获取 Cookie
 * @param {String} name 要获取的 Cookie 名
 * @return {String} 获取到的 Cookie 值
 */
export function getCookiefunction(name) {
  var cookieList = document.cookie.split("; ");
  var cookieJson = {};
  for (var index in cookieList) {
    cookieJson[cookieList[index].split("=")[0]] =
      cookieList[index].split("=")[1];
  }
  return cookieJson[name];
}

/**
 * 格式化时间
 * @param {String} fmt 格式
 * @param {Object} date 待格式时间对象
 * @return {String} 格式化后的时间字符串
 */
export function dateFormat(fmt, date) {
  var ret;
  const opt = {
    "y+": date.getFullYear().toString(), // 年
    "M+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "m+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString(), // 秒
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}

/**
 * 生成一个UUID
 * @return {String} 一个新的 UUID
 */
export function uuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

/**
 * 获取 Url 参数
 * @param {String} variable 待获取参数名
 * @return {String} 获取到的参数值
 */
export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

/**
 * 验证邮箱
 * @param {String} mail 待验证邮箱
 * @return {Boolean} true.格式正确 false.格式错误
 */
export function validateMail(mail) {
  var strRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
  if (strRegex.test(mail)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证手机号码
 * @param {String} phone 待验证号码
 * @return {Boolean} true.格式正确 false.格式错误
 */
export function validatePhone(phone) {
  var phoneReg = /^1[3-578]\d{9}$/;
  if (phoneReg.test(phone)) {
    return true;
  } else {
    return false;
  }
}

/**
 * 验证用户名
 * @param {String} account 待验证用户名
 * @return {Boolean} true.格式正确 false.格式错误
 */
export function validateAccount(account) {
  var accountReg = /^[^\u4e00-\u9fa5]{0,}$/;
  if (accountReg.test(account)) {
    return true;
  } else {
    return false;
  }
}

export function toLogin(code) {
  if (!code) {
    this.$router.push({ path: "/login" });
  }
}

/**
 * 地址下载
 * @param name 文件名
 * @param url 文件地址
 */
export function dowanloadFile(name, url) {
  let a = document.createElement("a");
  a.download = name + ".xlsx";
  // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} type 文件类型
 */
export function resolveBlob(res, type) {
  let aLink = document.createElement("a");
  let blob = new Blob([res], { type: type });
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute("download", new Date().getTime()); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}

export const nationList = [
  { dictLabel: "汉", dictValue: "1" },
  { dictLabel: "蒙古", dictValue: "2" },
  { dictLabel: "回", dictValue: "3" },
  { dictLabel: "藏", dictValue: "4" },
  { dictLabel: "维吾尔", dictValue: "5" },
  { dictLabel: "苗", dictValue: "6" },
  { dictLabel: "彝", dictValue: "7" },
  { dictLabel: "壮", dictValue: "8" },
  { dictLabel: "布依", dictValue: "9" },
  { dictLabel: "朝鲜", dictValue: "10" },
  { dictLabel: "其他", dictValue: "97" },
  { dictLabel: "侗", dictValue: "11" },
  { dictLabel: "白", dictValue: "12" },
  { dictLabel: "哈尼", dictValue: "13" },
  { dictLabel: "傣", dictValue: "14" },
  { dictLabel: "傈僳", dictValue: "15" },
  { dictLabel: "畲", dictValue: "16" },
  { dictLabel: "拉祜", dictValue: "17" },
  { dictLabel: "满", dictValue: "18" },
  { dictLabel: "瑶", dictValue: "19" },
  { dictLabel: "土家", dictValue: "20" },
  { dictLabel: "哈萨克", dictValue: "21" },
  { dictLabel: "黎", dictValue: "22" },
  { dictLabel: "佤", dictValue: "23" },
  { dictLabel: "高山", dictValue: "24" },
  { dictLabel: "水", dictValue: "25" },
  { dictLabel: "东乡", dictValue: "26" },
  { dictLabel: "景颇", dictValue: "27" },
  { dictLabel: "土", dictValue: "28" },
  { dictLabel: "仫佬", dictValue: "29" },
  { dictLabel: "布朗", dictValue: "30" },
  { dictLabel: "毛南", dictValue: "31" },
  { dictLabel: "锡伯", dictValue: "32" },
  { dictLabel: "普米", dictValue: "33" },
  { dictLabel: "纳西", dictValue: "34" },
  { dictLabel: "柯尔克孜", dictValue: "35" },
  { dictLabel: "达斡尔", dictValue: "36" },
  { dictLabel: "羌", dictValue: "37" },
  { dictLabel: "撒拉", dictValue: "38" },
  { dictLabel: "仡佬", dictValue: "39" },
  { dictLabel: "阿昌", dictValue: "40" },
  { dictLabel: "塔吉克", dictValue: "41" },
  { dictLabel: "怒", dictValue: "42" },
  { dictLabel: "俄罗斯", dictValue: "43" },
  { dictLabel: "德昂", dictValue: "44" },
  { dictLabel: "裕固", dictValue: "45" },
  { dictLabel: "塔塔尔", dictValue: "46" },
  { dictLabel: "鄂伦春", dictValue: "47" },
  { dictLabel: "门巴", dictValue: "48" },
  { dictLabel: "基诺", dictValue: "49" },
  { dictLabel: "乌孜别克", dictValue: "50" },
  { dictLabel: "鄂温克", dictValue: "51" },
  { dictLabel: "保安", dictValue: "52" },
  { dictLabel: "京", dictValue: "53" },
  { dictLabel: "独龙", dictValue: "54" },
  { dictLabel: "赫哲", dictValue: "55" },
  { dictLabel: "珞巴", dictValue: "56" },
];
