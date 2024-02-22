export const getCurrentYearAndMonth = () => {
    const today = new Date();
    const monthArrs =  ['null', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    let nextMonth = currentMonth + 1;

    if (currentMonth >= 12) {
      nextMonth = 1;
    }

    const currentMonthEn = monthArrs[currentMonth];
    const nextMonthEn = monthArrs[nextMonth];

   return {
    currentYear,
    currentMonth,
    nextMonth,
    currentMonthEn,
    nextMonthEn,
    currentDay,
   }
}

export type MonthMatchType = "JAN"|"FEB"|"MAR"|"APR"|"MAY"|"JUN"|"JUL"|"AUG"|"SEP"|"OCT"|"NOV"|"DEC";

export const monthMatchToChina = {
  "JAN": "1月",
  "FEB": "2月",
  "MAR": "3月",
  "APR": "4月",
  "MAY": "5月",
  "JUN": "6月",
  "JUL": "7月",
  "AUG": "8月",
  "SEP": "9月",
  "OCT": "10月",
  "NOV": "11月",
  "DEC": "12月"
}

const regex = /(\d{1,2})(JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(\d{2})/g;

// 定义一个替换函数，用于将匹配的字符串转换为指定的日期格式
function replaceDate(match: unknown, day: string, monthAbbr: MonthMatchType, year: string) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const monthMatchToChina = {
      "JAN": "1月",
      "FEB": "2月",
      "MAR": "3月",
      "APR": "4月",
      "MAY": "5月",
      "JUN": "6月",
      "JUL": "7月",
      "AUG": "8月",
      "SEP": "9月",
      "OCT": "10月",
      "NOV": "11月",
      "DEC": "12月"
    }
    const monthIndex = months.indexOf(monthAbbr); // 获取月份在数组中的索引
    const fullYear = new Date().getFullYear(); // 获取当前年份的前两位，比如 20
    const getMatchMonth = months[monthIndex] as MonthMatchType;
    const century = Math.floor(fullYear / 100) * 100; // 获取当前世纪，比如 2000
    const shortYear = parseInt(year, 10); // 将两位数年份转换为数字
    const cDay = parseInt(day);

    // 使用三元运算符确保年份的范围在 1950 到 2049 之间
    const realYear = shortYear < 50 ? century + shortYear : century - 100 + shortYear;

    // 返回转换后的日期格式
    return `${realYear}年${monthMatchToChina[getMatchMonth]}${cDay}日`;
}


// 使用正则表达式的 replace 方法进行替换


export const getTranslateStr = (str: string) => str.replace(regex, replaceDate);