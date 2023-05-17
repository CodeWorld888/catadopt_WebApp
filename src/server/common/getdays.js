let Calculate = {
    getToday() {
        var today = new Date();
        var str = "";
        str += today.getFullYear() + "-";
        var month = today.getMonth() + 1;//返回值是 0（一月） 到 11（十二月） 之间的一个整数。
        if (month < 10) {
            str += "0";
        }
        str += month + "-";
        var day = today.getDate();//返回值是 1 ~ 31 之间的一个整数
        if (day < 10) {
            str += "0";
        }
        str += day;
        return str;
    },
    daysDistance(date1, date2) {
        //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
        date1 = Date.parse(date1);
        date2 = Date.parse(date2);
        //计算两个日期之间相差的毫秒数的绝对值
        var ms = Math.abs(date2 - date1);
        //毫秒数除以一天的毫秒数,就得到了天数
        var days = Math.floor(ms / (24 * 3600 * 1000));
        return days;
    },
    conversion(day) {        //将天数转换为年龄
        if (day < 30) {
            return day + '天'
        } else if (day < 365) {
            let month = Math.floor(day / 30);
            let days = Math.round((day / 30 - month) * 30)
            if (days == 0) {
                return month + '个月'
            } else {
                return month + '个月' + days + '天'
            }
        } else {
            let year = Math.floor(day / 365);
            let month = Math.floor((day / 365 - year) * 365 / 30);
            let days = Math.round(((day / 365 - year) * 365 / 30 - month) * 30)
            if (month == 0 && days == 0) {
                return year + '岁'
            } else if (days == 0) {
                return year + '岁' + month + '个月'
            } else {
                return year + '岁' + month + '个月' + days + '天'
            }
        }
    }
}



exports = module.exports = Calculate;