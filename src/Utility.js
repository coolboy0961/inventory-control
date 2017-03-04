var Utility = (function() {
    //クラス内定数

    //コンストラクタ
    var Utility = function() {
        if (!(this instanceof Utility)) {
            return new Utility();
        }
    }
    //var p = Utility.prototype;
    //プロトタイプ内でメソッドを定義

    //クラスメソッド定義
    Utility.getSheet = function(sheetName) {
        var ganttChartSpreadsheet = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
        var sheet = ganttChartSpreadsheet.getSheetByName(sheetName);
        return sheet;
    }
    Utility.getSheetByIdAndName = function(sheetId, sheetName) {
        var ganttChartSpreadsheet = SpreadsheetApp.openById(sheetId);
        var sheet = ganttChartSpreadsheet.getSheetByName(sheetName);
        return sheet;
    }

    Utility.inherits = function(childCtor, parentCtor) {
        /** @constructor */
        function tempCtor() {};
        tempCtor.prototype = parentCtor.prototype;
        childCtor.superClass_ = parentCtor.prototype;
        childCtor.prototype = new tempCtor();
        /** @override */
        childCtor.prototype.constructor = childCtor;
    }
    Utility.calculateAllWorkDays = function(startDate, endDate, customWorkDays, customHolidays) {
        var numOfPastWorkDays = 0;
        var dayCount = Utility.countDays(startDate, endDate);
        var date = new Date(startDate);
        for (var i = 0; i < dayCount; i++) {
            if (i !== 0) {
                date.setDate(date.getDate() + 1);
            }

            if (Utility.isDateContainsInList(date, customWorkDays)) {
                numOfPastWorkDays++;
                continue;
            }
            if (Utility.isDateContainsInList(date, customHolidays)) {
                continue;
            }
            if (Utility.isWeekend(date)) {
                continue;
            }
            if (Utility.isJapaneseHoliday(date)) {
                continue;
            }
            numOfPastWorkDays++;
        }
        return numOfPastWorkDays;
    }
    //startDateから前日までの期間にある営業日の日数を算出
    Utility.calculatePastWorkDays = function(startDate, customWorkDays, customHolidays) {
        var numOfPastWorkDays = 0;
        var endDate = new Date();
        endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 0, 0, 0);
        endDate.setDate(endDate.getDate() - 1);
        numOfPastWorkDays = Utility.calculateAllWorkDays(startDate, endDate, customWorkDays, customHolidays);
        return numOfPastWorkDays;
    }
    Utility.isDateContainsInList = function(date, dateList) {
        if (date == "" || dateList == "") return false;
        for (var i = 0; i < dateList.length; i++) {
            if (dateList.getData(i).getTime() == date.getTime()) {
                return true;
            }
        }
        return false;
    }
    Utility.isWeekend = function(date) {
        return date.getDay() == 0 || date.getDay() == 6;
    }
    Utility.isJapaneseHoliday = function(date) {
        var startDate = date;
        startDate.setHours(0, 0, 0, 0);
        var endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        var cal = CalendarApp.getCalendarById("ja.japanese#holiday@group.v.calendar.google.com");
        var holidays = cal.getEvents(startDate, endDate);

        return holidays.length != 0;
    }
    Utility.getDay_JP = function(date) {
        var arr_day = new Array('日', '月', '火', '水', '木', '金', '土');
        var day_num = new Date(date).getDay();
        var day = arr_day[day_num];
        return day;
    }
    //開始日と終了日の間に何日間あるか算出する、同じ日の場合は1を返す
    Utility.countDays = function(startDate, endDate) {
        var oneDay = 24 * 60 * 60 * 1000;
        //var diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay)));
        var diffDays = Math.round((endDate.getTime() - startDate.getTime()) / (oneDay));
        return diffDays + 1;
    }

    Utility.sortDate = function(dateList) {　　
        var s = Array();
        var dateArray = dateList.getAllData();
        for (var i = 0; i < dateArray.length; i++) {　　　　
            s[i] = Date.parse(dateArray[i]);　　
        }　　
        s.sort();　　
        for (var i = 0; i < s.length; i++) {　　　　
            dateArray[i] = new Date(s[i]);　　
        }
        var result = new List();
        result.setAllData(dateArray);
        return result;
    }
    Utility.isDateContainsBetween = function(date, startDate, endDate) {
        if (date == "" || startDate == "" || endDate == "") {
            return false;
        }
        if (Utility.countDays(startDate, date) >= 1 && Utility.countDays(date, endDate) >= 1) {
            return true;
        } else {
            return false;
        }
    }
    Utility.nextNDay = function(currentDate, n) {
        var resultDate = new Date(currentDate);
        resultDate.setDate(resultDate.getDate() + n);
        return resultDate;
    }
    Utility.previousNDay = function(currentDate, n) {
        var resultDate = new Date(currentDate);
        resultDate.setDate(resultDate.getDate() - n);
        return resultDate;
    }
    Utility.createAllDayEvent = function(title, date, calendarId) {
        var calendar = CalendarApp.getCalendarById(calendarId);
        //date.setTime(date.getTime() + 8640000);
        calendar.createAllDayEvent(title, date);
    }
    Utility.formatDate = function(date) {

        // 「年」「月」「日」「曜日」を Date オブジェクトから取り出してそれぞれに代入
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var w = date.getDay();

        // 曜日の表記を文字列の配列で指定
        var wNames = ['日', '月', '火', '水', '木', '金', '土'];

        // 「月」と「日」で1桁だったときに頭に 0 をつける
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }

        // フォーマットを整形してコンソールに出力
        var result = y + '年' + m + '月' + d + '日 (' + wNames[w] + ')';
        return result;
    }
    Utility.uuid = function() {
        var uuid = "";
        var random;
        for (var i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-"
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
    Utility.isEmpty = function(value) {
        if (value == "" || value == undefined) {
            return true;
        } else {
            return false;
        }
    }
    return Utility;
})();

function testUUID() {
    for (var i = 0; i < 9; i++) {
        Logger.log("test uuid : " + Utility.uuid());
    }
}

function testIsDateContainsBetween() {
    var startDate = new Date(2017, 1, 09, 0, 0, 0);
    var endDate = new Date(2017, 1, 20, 0, 0, 0);
    var targetDate1 = new Date(2017, 1, 09, 0, 0, 0);
    var targetDate2 = new Date(2017, 1, 05, 0, 0, 0);
    var targetDate3 = new Date(2017, 1, 11, 0, 0, 0);
    var targetDate4 = new Date(2016, 11, 31, 0, 0, 0);
    Logger.log(Utility.isDateContainsBetween(targetDate1, startDate, endDate));
    Logger.log(Utility.isDateContainsBetween(targetDate2, startDate, endDate));
    Logger.log(Utility.isDateContainsBetween(targetDate3, startDate, endDate));
    Logger.log(Utility.isDateContainsBetween(targetDate4, startDate, endDate));
}

function testIsDateContainsInList() {
    var testDate1 = new Date(2017, 1, 01, 0, 0, 0);
    var testDate2 = new Date(2017, 1, 02, 0, 0, 0);
    var testDate3 = new Date(2017, 1, 03, 0, 0, 0);
    var dateList = new List();
    dateList.push(testDate1);
    dateList.push(testDate2);
    dateList.push(testDate3);
    var targetDate1 = new Date(2017, 1, 10, 0, 0, 0);
    var targetDate2 = new Date(2017, 1, 02, 0, 0, 0);
    Logger.log(Utility.isDateContainsInList(targetDate1, dateList));
    Logger.log(Utility.isDateContainsInList(targetDate2, dateList));
}

function testNextNDay() {
    var currentDate = new Date(2017, 1, 01, 0, 0, 0);
    Logger.log("currentDate is " + currentDate);
    Logger.log("next 5 day is " + Utility.nextNDay(currentDate, 5));
}

function testPreviousNDay() {
    var currentDate = new Date(2017, 1, 10, 0, 0, 0);
    Logger.log("currentDate is " + currentDate);
    Logger.log("previous 5 day is " + Utility.previousNDay(currentDate, 5));
}

function testcalculateAllWorkDays() {
    var startDate = new Date(2017, 1, 01, 0, 0, 0);
    var endDate = new Date(2017, 1, 10, 0, 0, 0);
    var customWorkDays = new List();
    customWorkDays.push(new Date(2017, 1, 05, 0, 0, 0));
    var customHolidays = new List();
    customHolidays.push(new Date(2017, 1, 06, 0, 0, 0));
    var num = Utility.calculateAllWorkDays(startDate, endDate, customWorkDays, customHolidays);
    Logger.log(num);
}

function testcalculatePastWorkDays() {
    var startDate = new Date(2017, 0, 23, 0, 0, 0);
    var customWorkDays = new List();
    //customWorkDays.push(new Date(2017, 1, 05, 0, 0, 0));
    var customHolidays = new List();
    //customHolidays.push(new Date(2017, 1, 06, 0, 0, 0));
    var num = Utility.calculatePastWorkDays(startDate, customWorkDays, customHolidays);
    Logger.log(num);
}

function testSortDate() {
    var dateList = new List();
    for (var i = 10; i > 5; i--) {
        dateList.push(new Date(2017, 1, i, 0, 0, 0));
    }
    dateList.forEach(function(data, i) {
        Logger.log(data); // => hoge 0, huga 1, zawa 2
    });
    dateList = Utility.sortDate(dateList);
    dateList.forEach(function(data, i) {
        Logger.log(data); // => hoge 0, huga 1, zawa 2
    });
}

function testCountDays() {
    var startDate = new Date(2017, 1, 01, 0, 0, 0);
    var endDate = new Date(2017, 1, 05, 0, 0, 0);
    Logger.log(Utility.countDays(startDate, endDate));
}
