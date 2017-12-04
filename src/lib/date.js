/**
* 返回月份的时间段
**/
export const currMonth_dateRange = (_curDate = '') => {
  const now = new Date();
  const _year = now.getFullYear();
  const _month = now.getMonth() + 1;
  const curDate = _curDate || `${_year}-${_month}`
  const year = curDate.split('-')[0] * 1
  const month = curDate.split('-')[1]
  let days = '01'
  switch (month * 1) {
    case 4:;
    case 6:;
    case 9:;
    case 11:
      days = 30;
      break;
    case 2:
      days = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
        ? 29
        : 28;
      break;
    default:
      days = 31;
  }
  return [`${year}-${month}-01`, `${year}-${month}-${days}`]
}

/**
* 返回月份的天数
**/
export const currMonthDatas = (_curDate = '') => {
  const now = new Date();
  const _year = now.getFullYear();
  const _month = now.getMonth() + 1;
  const curDate = _curDate || `${_year}-${_month}`
  const year = curDate.split('-')[0] * 1
  const month = curDate.split('-')[1]
  let days = 1
  switch (month * 1) {
    case 4:;
    case 6:;
    case 9:;
    case 11:
      days = 30;
      break;
    case 2:
      days = (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
        ? 29
        : 28;
      break;
    default:
      days = 31;
  }
  return days
}

/**
* 返回当前月份
**/
export const getCurMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = (month < 10
    ? '0' + month
    : month);
  return `${year}-${month}`
}

/**
* 返回2个日期相减
**/
export const dateDiff = (sDate1, sDate2) => { //sDate1和sDate2是2006-12-18格式
  var aDate,
    oDate1,
    oDate2,
    iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为12-18-2006格式
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
  return iDays
}

/**
* 月份相减算月数
**/
export const getMct = (beginTime, endTime, sign = '-' ) => {
  const beginDate = beginTime.split(sign); //拆分开始日期的年月日
  const endDate = endTime.split(sign); //拆分开始日期的年月日
  const bMonth = parseInt(beginDate[0]) * 12 + parseInt(beginDate[1]);//得到开始日期的月数
  const eMonth = parseInt(endDate[0]) * 12 + parseInt(endDate[1]);//得到结束日期的月数
  const totalMonth = Math.abs(eMonth - bMonth);//获取月数
  return totalMonth;
}
