/**
* 在Safari和IE8上执行 new Date('2017-12-8 11:36:45'); 会得到Invalid Date
* 本函数重写默认的Date函数，以解决其在Safari，IE8上的bug
*/
Date = function (Date) {
	MyDate.prototype = Date.prototype;
	return MyDate;

	function MyDate() {
		// 当只有一个参数并且参数类型是字符串时，把字符串中的-替换为/
		if (arguments.length === 1) {
			let arg = arguments[0];
			if (Object.prototype.toString.call(arg) === '[object String]' && arg.indexOf('T') === -1 && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
				arguments[0] = arg.replace(/-/g, "/");
			}
		}
		let bind = Function.bind;
		let unbind = bind.bind(bind);
		return new (unbind(Date, null).apply(null, arguments));
	}
}(Date);

Date.prototype.format = function (fmt) {
	if (this.getTime() == 0)
		return "";
	var o = {
		"M+": this.getMonth() + 1,                 //月份 
		"d+": this.getDate(),                    //日 
		"H+": this.getHours(),                   //小时 
		"m+": this.getMinutes(),                 //分 
		"s+": this.getSeconds(),                 //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds()             //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
Date.prototype.addDays = function (days) {
	this.setDate(parseInt(this.getDate()) + parseInt(days));
	return this;
}
Date.prototype.addHours = function (hours) {
	this.setHours(parseInt(this.getHours()) + parseInt(hours));
	return this;
}
Date.prototype.addMinutes = function (minutes) {
	this.setMinutes(parseInt(this.getMinutes()) + parseInt(minutes));
	return this;
}
Date.prototype.addMonths = function (num) {
	num = parseInt(num);
	var sDate = this;
	var sYear = sDate.getFullYear();
	var sMonth = sDate.getMonth() + 1;
	var sDay = sDate.getDate();

	var eYear = sYear;
	var eMonth = sMonth + num;
	var eDay = sDay;
	while (eMonth > 12) {
		eYear++;
		eMonth -= 12;
	}
	var eDate = new Date(eYear, eMonth - 1, eDay);
	while (eDate.getMonth() != eMonth - 1) {
		eDay--;
		eDate = new Date(eYear, eMonth - 1, eDay);
	}
	this.setTime(eDate);
	return this;
}
Date.getDateDiff = function (startDate, endDate) {
	return (endDate - startDate) / (1000 * 3600 * 24);
}
Date.parse = function (str, pattern) {
	var sdf = new SimpleDateFormat(pattern);
	return sdf.parse(str);
}
var SimpleDateFormat = function (pattern) {
	var reg = /[\-\/\.]/g;
	var format = new RegExp("^[ymd]+" + reg.source + "[ymd]+" + reg.source + "[ymd]+$", "i");
	if (!format.test(pattern)) {
		throw new Error("the pattern paramters is not legal !");
	}
	this.pattern = pattern;
	this.reg = reg;
	this.spliter = pattern.replace(/[ymd]/gi, '').substr(1);
}

SimpleDateFormat.prototype.format = function (date) {
	if (!(date instanceof Date)) {
		return null;
	}
	var spliter = this.spliter;
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	return year + spliter + month + spliter + day;
}

SimpleDateFormat.prototype.parse = function (str) {
	var pattern = this.pattern;
	var reg = new RegExp("^" + pattern.replace(/[ymd]/gi, '\\d') + "$");
	if (!reg.test(str)) {
		return null;
	}
	var tempDate = str.split(this.spliter);
	return new Date(tempDate[0], tempDate[1] - 1, tempDate[2]);
}
Date.HOUR = "hour";
Date.MINUTE = "minute";
Date.SECOND = "second";
Date.MILLSECOND = "millsecond";
function lastTime(date) {
	var diff = new Date() - date;
	return transformTime(diff, Date.MILLSECOND);
}
function transformTime(diff, type) {
	if (!type || type == Date.MILLSECOND) {
		diff = diff / 1000;
	} else if (type == Date.SECOND) {
		diff = diff;
	} else if (type == Date.MINUTE) {
		diff = diff * 60;
	} else if (type == Date.HOUR) {
		diff = diff * 60 * 60;
	}
	diff = parseInt(diff);
	if (diff <= 0) {
		return "";
	} else if (diff < 60) {
		return diff + dateLang.i18n_second;
	} else if (diff < (60 * 60)) {
		var minute = parseInt(diff / 60);
		diff = diff % 60;
		var result = minute + dateLang.i18n_min;
		if (diff != 0)
			result += diff + dateLang.i18n_second;
		return result;
	} else if (diff < (60 * 60 * 24)) {
		var hour = parseInt(diff / (60 * 60));
		diff = diff % (60 * 60);
		var minute = parseInt(diff / 60);
		diff = diff % 60;
		var result = hour + dateLang.i18n_hour;
		if (minute != 0)
			result += minute + dateLang.i18n_min;
		return result;
	} else {
		var day = parseInt(diff / (60 * 60 * 24));
		diff = diff % (60 * 60 * 24);
		var hour = parseInt(diff / (60 * 60));
		diff = diff % (60 * 60);
		var minute = parseInt(diff / 60);
		diff = diff % 60;
		var result = day + dateLang.i18n_day;
		if (hour != 0)
			result += hour + dateLang.i18n_hour;
		return result;
	}
}