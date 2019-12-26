// 根据今天的日期计算出周一到周天的日期
export function getWeek() {
  function getMonDate() {
    var d = new Date(), // 日期
      day = d.getDay(), //周几
      date = d.getDate(); // 一天24小时
    if (day == 1) return d;
    if (day == 0) d.setDate(date - 6);
    else d.setDate(date - day + 1);
    return d;
  };

  function getDayName(day) {
    var day = parseInt(day);
    if (isNaN(day) || day < 0 || day > 6) return false;
    var weekday = [
      "星期天",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    return weekday[day];
  }
  // d是当前星期一的日期对象
  var d = getMonDate();
  var arr = [];
  for (var i = 0; i < 7; i++) {
    arr.push(
      d.getFullYear() +
      "年" +
      (d.getMonth() + 1) +
      "月" +
      d.getDate() +
      "日 （" +
      getDayName(d.getDay()) +
      "）"
    );
    d.setDate(d.getDate() + 1);
  }
  return arr
};
export function getWeek1() {
  function getMonDate() {
    var d = new Date(), // 日期
      day = d.getDay(), //周几
      date = d.getDate(); // 一天24小时
    if (day == 1) return d;
    if (day == 0) d.setDate(date - 6);
    else d.setDate(date - day + 1);
    return d;
  };
  // d是当前星期一的日期对象
  var d = getMonDate();
  var arr = [];
  for (var i = 0; i < 7; i++) {
    arr.push(
      d.getFullYear().toString() +
      (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) +
      (d.getDate() < 10 ? '0' + (d.getDate()) : +d.getDate()) + '',
    );
    d.setDate(d.getDate() + 1);
  }
  return arr
};
// 当前时间格式化
export function formatDate(date, hasTime) {
  if (date !== undefined) {
    var date = new Date(date);
    let year = date.getFullYear();
    let month =
      date.getMonth() + 1 < 10 ?
      "0" + (date.getMonth() + 1) :
      date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    if (hasTime) {
      return year + '-' + month + '-' + day;
    } else {
      return "";
    }
  }
}
// 获取本月1号到今天的日期
export function getMonth() {
  const start = new Date()
  let startD = start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  return startD
}

// 获取上个月一整个月日期
export function getBeforeMonth() {
  let arr = [];
  const end = new Date()
  const start = new Date()
  var day = new Date(start.getFullYear(), start.getMonth(), 0).getDate()
  let startD = start.setTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))
  let endD = end.setTime(new Date(new Date().getFullYear(), new Date().getMonth() - 1, day))
  arr.push(startD);
  arr.push(endD);
  return arr

}
// 时间戳转换成日期格式
export function format(timestamp) {
  // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
  var date = new Date(timestamp),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : +date.getDate()) + ' ',
    h = (date.getHours() + 1 < 10 ? '0' + (date.getHours()) : date.getHours()) + ':',
    m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':'
    // s = (date.getSeconds() + 1 < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
    return Y + M + D + h + m

}
// 时间戳转换成日期格式
export function format1(timestamp) {
  // 比如需要这样的格式 yyyy-MM-dd
  var date = new Date(timestamp),
    Y = date.getFullYear() + '-',
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
    D = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : +date.getDate())
  return Y.toString() + M + D
}

// 将日期格式转换成时间戳
export function timestamp(strtime) {
  var date = new Date(strtime);
  //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
  // 可以这样做
  var date = new Date(strtime.replace(/-/g, '/')),
    //  三种获取的区别：
    // 第一、 第二种： 会精确到毫秒
    // 第三种： 只能精确到秒， 毫秒将用0来代替
    time1 = date.getTime(),
    time2 = date.valueOf(),
    time3 = Date.parse(date);
  return time3

}

export function timeFormat(date) {
  if (!date || typeof (date) === "string") {
    this.error("参数异常，请检查...");
  }
  var y = date.getFullYear(),
    m = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
    d = (date.getDate() + 1 < 10 ? '0' + (date.getDate()) : +date.getDate())
  return y.toString() + m + d;
}
//获取当年第一天
export function getFirstDayOfYear(date) {
  date.setDate(1);
  date.setMonth(0);
  return timeFormat(date);
}
//获取这周的周一 

export function getFirstDayOfWeek(date) {
  var weekday = date.getDay() || 7; //获取星期几,getDay()返回值是 0（周日） 到 6（周六） 之间的一个整数。0||7为7，即weekday的值为1-7
  date.setDate(date.getDate() - weekday + 1); //往前算（weekday-1）天，年份、月份会自动变化
  return timeFormat(date);
}


//获取当月第一天
export function getFirstDayOfMonth(date) {
  date.setDate(1);
  return timeFormat(date);
}

//获取当季第一天
export function getFirstDayOfSeason(date) {
  var month = date.getMonth();
  if (month < 3) {
    date.setMonth(0);
  } else if (2 < month && month < 6) {
    date.setMonth(3);
  } else if (5 < month && month < 9) {
    date.setMonth(6);
  } else if (8 < month && month < 11) {
    date.setMonth(9);
  }
  date.setDate(1);
  return timeFormat(date);
}

export function getFormatCode(strValue) {
  return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '');
}