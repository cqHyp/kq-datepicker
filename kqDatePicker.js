/*!
 * v0.0.1
 * cqh
 * 2020-10-16
 */
(function (win, doc) {
  let defaultOptions = {
    startTime: "",
    endTime: ""
  };

  const allDateList = [
    {
      id: 1, label: "按天", type: 1, ot: "d",
      _child: [{ id: 11, label: "昨天", type: 3, day: -1 }, { id: 12, label: "前7天", type: 3, day: -7 }, { id: 13, label: "前30天", type: 3, day: -30 }, { id: 14, label: "前90天", type: 3, day: -90 }]
    },
    {
      id: 2, label: "按月", type: 4, ot: "m"
    },
    {
      id: 4, label: "按年", type: 1, ot: "y",
      _child: [{ id: 41, label: "2020", type: 3, year: 0 }, { id: 42, label: "2019", type: 3, year: -1 }, { id: 43, label: "2018", type: 3, year: -2 }, { id: 44, label: "2017", type: 3, year: -3 }, { id: 45, label: "2016", type: 3, year: -4 }]
    },
    { id: 3, label: "自定义", type: 2, ot: "c" }
  ];

  var defaultDateList = [
    {
      id: 1, label: "按天", type: 1, ot: "d",
      _child: [{ id: 11, label: "昨天", type: 3, day: -1 }, { id: 12, label: "前7天", type: 3, day: -7 }, { id: 13, label: "前30天", type: 3, day: -30 }, { id: 14, label: "前90天", type: 3, day: -90 }]
    },
    {
      id: 2, label: "按月", type: 4, ot: "m"
    },
    {
      id: 4, label: "按年", type: 1, ot: "y",
      _child: [{ id: 41, label: "2020", type: 3, year: 0 }, { id: 42, label: "2019", type: 3, year: -1 }, { id: 43, label: "2018", type: 3, year: -2 }, { id: 44, label: "2017", type: 3, year: -3 }, { id: 45, label: "2016", type: 3, year: -4 }]
    },
    { id: 3, label: "自定义", type: 2, ot: "c" }
  ]

  var selectedId = null;
  var _self_id = null;
  var dataType = null;
  var dateFormat = "yyyy-MM-dd";

  function datePickerModule(options) {
    let v = this;
    if (!options) {
      throw new Error("请传入配置参数！");
    }
    v = Object.assign(v, defaultOptions, options);
    v.container = document.getElementById(v.container);
    if (!v.container) {
      throw new Error("配置 id 错误！");
    }
    v._bind(options);
  }

  datePickerModule.prototype = {
    _bind: function (options) {
      let _self = this;
      _self.container.addEventListener("focus", function (event) {
        if (options.endId && ($("#" + options.endId).length == 0)) {
          $(this).data("endId", options.endId)
          $(this).after("<input id='" + options.endId + "' value='" + options.endValue + "' name='" + options.endId + "' class='kq-endId' style='display: none;'/>");
        }
        if (options.startId && ($("#" + options.startId).length == 0)) {
          $(this).data("startId", options.startId)
          $(this).after("<input id='" + options.startId + "' value='" + options.startValue + "' name='" + options.startId + "' class='kq-startId' style='display: none;'/>");
        }
        if (options.dateFormat) {
          dateFormat = options.dateFormat;
        } else {
          dateFormat = "yyyy-MM-dd";
        }
        if (this.dataset.type) {
          dataType = this.dataset.type;
          let otList = this.dataset.type.split(",");
          defaultDateList = allDateList.filter(function(item) {
            return otList.indexOf(item.ot) > -1;
          });
        } else {
          defaultDateList = allDateList;
        }
        if ($("#date_bg").length > 0) return;
        _self_id = _self.container.id + "__" + Math.floor(Math.random() * (9999 - 1000)) + 1000;
        selectedId = null;
        let width = 204 + "px";
        // let left = $(this).parent().offset().left + "px";
        // let top = $(this).parent().offset().top + this.offsetHeight + 5;
        let left = $(this).offset().left + "px";
        let top = $(this).offset().top + this.offsetHeight + 5;
        let _title = "<div id='picker__header' style='font-size: 13px;color: #333;text-align: center;padding: 8px 10px;box-sizing: border-box;border-bottom: 1px solid rgba(0, 0, 0, 0.1);position: relative;'>" + "选择日期" + "<i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;display: none;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i></div>";
        let _content = initContent();
        let _footer = "<div id='picker__footer' class='flex justify-center align-center' style='box-sizing: border-box;'></div>";
        let _html = "<div id='" + _self_id + "' class='kq-datepicker flex justify-start flex-direction' style='width: " + width + ";left: " + left + ";top: " + top + "px;background: #fff;border-radius: 4px;position: absolute;box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);z-index: 99998'>"
          + _title
          + _content
          + _footer
          + "</div><div id='date_bg' style='z-index: 99997;position: absolute;left: 0;top: 0;width: 100%;height: 100%;'></div>";
        $("body").append(_html);
        _bindItemClick();
        initBootstrapDatepicker();
        if (dataType.split(",").length == 1) {
          let t = dataType.split(",")[0];
          let dId = allDateList.filter(function(item) {
            return item.ot == t
          })[0].id;
          if (t == "y" || t == "d") {
            handleOpen(dId);
            $("#dateBack").hide();
          } else if (t == "m") {
            initMonthSelect();
            $("#dateBack").hide();
          }
        }
      })

      _self.container.addEventListener("blur", function (ev) {
        let val = $("#" + _self_id.split("__")[0]).val();
        if (!val) {
          $("#" + _self_id.split("__")[0]).val("");
          return;
        }
        let arr = val.split(" ~ ");
        if (arr.length == 1) {

        } else if (arr.length == 2) {

        }
      })
    }
  };

  function initContent() {
    let _list = [];
    defaultDateList.forEach(function(item) {
      let _it = "";
      if (item.type == 1) {
        _it = "<div id='date_item_" + item.id + "' class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>" + item.label + "</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>";
      } else if (item.type == 2) {
        // 自定义
        _it = "<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_" + item.id + "' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 15px;box-sizing: border-box;font-size: 12px;color: #999999;'></div><span style='font-size: 13px;color: #333;'>" + item.label + "</span></div>";
      } else if (item.type == 4) {
        _it = "<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_" + item.id + "' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 25px;box-sizing: border-box;'></div><span style='font-size: 13px;color: #333;'>" + item.label + "</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>";
      }
      _list.push(_it);
    })
    return "<div class='flex-sub' id='date_content' style='padding: 8px 0;box-sizing: border-box;'>" + _list.join("") + "</div>";
  }

  function _bindItemClick() {
    defaultDateList.forEach(function(item) {
      if (item.type == 1) {
        $("#date_item_" + item.id).click(function () {
          handleOpen(item.id)
        })
      }
    });

    $("#dateClose").click(function () {
      closeDate();
    });

    $("#dateBack").click(function () {
      backDate();
    });

    $("#datePickerEnter").click(function () {
      datePickerEnter();
    });

    $("#date_bg").click(function () {
      closeDate();
    })
  }

  function handleOpen(id) {
    let childList = defaultDateList.filter(function(item) {
      return item.id == id
    })[0]._child;
    let _child = [];
    let _bindButtonList = [];
    childList.forEach(function(item) {
      let _it = "";
      if (item.type == 3) {
        let self_id = _self_id + "_date_item_" + item.id;
        _bindButtonList.push(self_id);
        _it = "<div id='" + self_id + "' class='flex justify-between align-center item-hover date-checkbox' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>" + item.label + "</span><i style='color: rgba(0,0,0,0.25);display: none;' class=\"layui-icon layui-icon-ok\"></i></div>";
      }
      _child.push(_it);
    });
    $("#dateBack").show();
    $("#date_content").html(_child.join(""));
    _bindDateSelect(_bindButtonList);
    initSelectedValue();
  }

  function closeDate() {
    $("#" + _self_id).remove();
    $("#date_bg").remove();
  }

  function backDate() {
    $("#picker__footer").html("");
    let _header = "选择日期" + "<i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;display: none;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i>";
    $("#picker__header").html(_header);
    let _list = [];
    defaultDateList.forEach(function(item) {
      let _it = "";
      if (item.type == 1) {
        _it = "<div id='date_item_" + item.id + "' class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>" + item.label + "</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>";
      } else if (item.type == 2) {
        // 自定义
        _it = "<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_" + item.id + "' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 15px;box-sizing: border-box;font-size: 12px;color: #999999;'></div><span style='font-size: 13px;color: #333;'>" + item.label + "</span></div>";
      } else if (item.type == 4) {
        // 月份
        _it = "<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_" + item.id + "' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 25px;box-sizing: border-box;'></div><span style='font-size: 13px;color: #333;'>" + item.label + "</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>";
      }
      _list.push(_it);
    });
    $("#date_content").html(_list.join(""));
    defaultDateList.forEach(function(item) {
      if (item.type == 1) {
        $("#date_item_" + item.id).click(function () {
          handleOpen(item.id)
        })
      }
    });
    $("#dateBack").hide();
    initSelectedValue();
    initBootstrapDatepicker();
  }

  function _bindDateSelect(_bindButtonList) {
    _bindButtonList.forEach(function(item) {
      let _id = item.split("_").pop();
      $("#" + item).click(function () {
        for (let i = 0; i < $("#date_content>div>i").length; i++) {
          $($("#date_content>div>i")[i]).hide();
        }
        selectedId = _id;
        $("#" + item + ">i").show();
        datePickerEnter();
      })
    })
  }

  function datePickerEnter() {
    if (selectedId) {
      dateSelect(selectedId);
    } else if ($("#date_item_3").text()) {
      $("#" + _self_id.split("__")[0]).val($("#date_item_3").text());
      setSearchValue($("#date_item_3").text());
    } else if ($("#date_item_2").text()) {
      let year = $("#date_item_2").text().split("-")[0];
      let month = $("#date_item_2").text().split("-")[1];
      if (dataType == "m") {
        $("#" + _self_id.split("__")[0]).val(year + "-" + month);
        setSearchValue(year + " ~ " + month);
      } else {
        $("#" + _self_id.split("__")[0]).val(new Date(year, month - 1, 1).format(dateFormat) + " ~ " + new Date(year, month, 0).format(dateFormat));
        setSearchValue(new Date(year, month - 1, 1).format(dateFormat) + " ~ " + new Date(year, month, 0).format(dateFormat));
      }
    }
    $("#" + _self_id).remove();
    $("#date_bg").remove();
  }

  function setSearchValue(val) {
    let arr = val.split(" ~ ");
    if ($(".kq-startId").length > 1) {
      $($(".title-search > div:visible,.title-search-right > div:visible").find(".kq-startId")).val(arr[0]);
      $($(".title-search > div:visible,.title-search-right > div:visible").find(".kq-endId")).val(arr[1]);
    } else {
      $(".kq-startId").val(arr[0]);
      $(".kq-endId").val(arr[1]);
    }

  }

  function dateSelect(_id) {
    let parentId = _id.split("")[0];
    let objDate = defaultDateList.filter(function(item) {
      return item.id == parentId;
    })[0]._child.filter(function(item) {
      return item.id == _id;
    })[0];
    if (typeof objDate.day == "number") {
      // 按天
      calcDay(objDate.day);
    } else if (typeof objDate.month == "number") {
      // 按月
      // calcMonth(objDate.month);
    } else if (typeof objDate.year == "number") {
      // 按年
      calcYear(objDate.label);
    }
  }

  function calcDay(_day) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let start = new Date(year, month, day + _day - 1);
    let end = new Date(year, month, day - 1);
    $("#" + _self_id.split("__")[0]).val(start.format(dateFormat) + " ~ " + end.format(dateFormat));
    setSearchValue(start.format(dateFormat) + " ~ " + end.format(dateFormat))
  }

  function calcMonth(_month) {

  }

  function calcYear(year) {
    if (dataType == "y") {
      $("#" + _self_id.split("__")[0]).val(year);
      setSearchValue(year);
    } else {
      $("#" + _self_id.split("__")[0]).val(new Date(year, 0, 1).format(dateFormat) + " ~ " + new Date(parseInt(year) + 1, 0, 0).format(dateFormat));
      setSearchValue(new Date(year, 0, 1).format(dateFormat) + " ~ " + new Date(parseInt(year) + 1, 0, 0).format(dateFormat));
    }
  }

  function initSelectedValue() {
    if (selectedId) {
      for (let i = 0; i < $("#date_content>div").length; i++) {
        if ($("#date_content>div")[i].length > 0 && $($("#date_content>div")[i]).attr("id").split("_").pop() == selectedId) {
          $($("#date_content>div>i")[i]).show();
        }
      }
    }
  }

  function initBootstrapDatepicker() {
    // $('#date_item_bdate_picker').datepicker();
    if ($("#date_item_3").length > 0) {
      setTimeout(function () {
        laydate.render({
          elem: '#date_item_3',
          type: 'datetime',
          range: "~",
          value: "",
          theme: '#1890FF',
          format: "yyyy-MM-dd HH:mm",
          done: function (value, date, endDate) {
            if (value) {
              $("#date_item_2").html("");
              let startTimeHour = parseInt($("#startTime_Hour").text());
              let startTimeMin = parseInt($("#startTime_Min").text());
              let endTimeHour = parseInt($("#endTime_Hour").text());
              let endTimeMin = parseInt($("#endTime_Min").text());
              date.hours = startTimeHour;
              date.minutes = startTimeMin;
              endDate.hours = endTimeHour;
              endDate.minutes = endTimeMin;
              let valueArr = value.split(" ~ ");
              value = (valueArr[0].split(" ")[0] + " " + ((startTimeHour < 10 ? "0" + startTimeHour : startTimeHour) + ":" + (startTimeMin < 10 ? "0" + startTimeMin : startTimeMin))) + " ~ " + (valueArr[1].split(" ")[0] + " " + ((endTimeHour < 10 ? "0" + endTimeHour : endTimeHour) + ":" + (endTimeMin < 10 ? "0" + endTimeMin : endTimeMin)))
              setTimeout(function () {
                $("#" + _self_id.split("__")[0]).val(value);
                setSearchValue(value);
                $("#" + _self_id).remove();
                $("#date_bg").remove();
              })
            }
          },
          ready: function (date) {
            setTimeout(function() {
              $(".laydate-btns-time").hide();
              $(".laydate-main-list-0 .layui-laydate-content").append("<div id='startTimeGroup' style='display: inline-flex;justify-content: flex-start;align-items: center;margin-right: 12px;'><div style='font-size: 12px;' class=''>时间</div><div id='startTime_Hour' class='kq-time-picker-input'>00</div>:<div id='startTime_Min' class='kq-time-picker-input'>00</div></div>");
              $(".laydate-main-list-1 .layui-laydate-content").append("<div id='endTimeGroup' style='display: inline-flex;justify-content: flex-start;align-items: center;margin-right: 12px;'><div style='font-size: 12px;' class=''>时间</div><div id='endTime_Hour' class='kq-time-picker-input'>00</div>:<div id='endTime_Min' class='kq-time-picker-input'>00</div></div>");
              let dateRange = $("#date_item_3").text();
              if (dateRange) {
                let startTime_Hour = dateRange.split(" ~ ")[0].split(" ")[1].split(":")[0];
                let startTime_Min = dateRange.split(" ~ ")[0].split(" ")[1].split(":")[1];
                let endTime_Hour = dateRange.split(" ~ ")[1].split(" ")[1].split(":")[0];
                let endTime_Min = dateRange.split(" ~ ")[1].split(" ")[1].split(":")[1];
                $("#startTime_Hour").text(startTime_Hour);
                $("#startTime_Min").text(startTime_Min);
                $("#endTime_Hour").text(endTime_Hour);
                $("#endTime_Min").text(endTime_Min);
              }
              $(".layui-laydate-range").prepend("<div class='picker-range-header'><div id='picker_range__startDate'>~</div></div>");
              $(".kq-time-picker-input").click(function () {
                kqTimeSelect(this);
              })
            })
          },
          change: function (value, date, endDate) {
            let sHour = $("#startTime_Hour").text();
            let sMin = $("#startTime_Min").text();
            let eHour = $("#endTime_Hour").text();
            let eMin = $("#endTime_Min").text();
            let arr = value.split(" ~ ");
            let st = sHour + ":" + sMin;
            let et = eHour + ":" + eMin;
            value = arr[0].split(" ")[0] + " " + st + " ~ " + arr[1].split(" ")[0] + " " + et;
            $("#picker_range__startDate").html(value);
          }
        });
      })
    }

    if ($("#date_item_2").length > 0) {
      // setTimeout(function () {
      // laydate.render({
      //   elem: '#date_item_2',
      //   type: 'month',
      //   theme: '#1890FF',
      //   btns: ['now', 'confirm'],
      //   done: function (value, date, endDate) {
      //     $("#date_item_3").html("");
      //   }
      // });
      // })
      $("#date_item_2").click(function () {
        initMonthSelect();
      })
    }

  }

  function initMonthSelect() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let _html = "<i class=\"layui-icon layui-icon-prev\" id='year_prev' style='font-size: 12px;position: absolute;left: 40px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;line-height: 16px;'></i><span id='picker_month_year' style='line-height: 16px;'>" + year + "</span><i class=\"layui-icon layui-icon-next\" id='year_next' style='font-size: 12px;position: absolute;right: 40px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;line-height: 16px;'></i><i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i>";
    $("#picker__header").html(_html);
    $("#dateClose").click(function () {
      closeDate();
    });
    $("#dateBack").click(function () {
      backDate();
    });
    $("#year_prev").click(function () {
      handleYearChange(-1);
    });
    $("#year_next").click(function () {
      handleYearChange(1);
    })
    let _content = "<div style='display: flex;justify-content: space-between;flex-wrap: wrap;padding: 0 5px;'>";
    for (let i = 1; i <= 12; i++) {
      if (i == month) {
        _content += "<div id='picker_month_" + i + "' data-month='" + i + "' class='kq-datepicker__month kq-datepicker__month-active' class=''>" + i + "月</div>"
      } else {
        _content += "<div id='picker_month_" + i + "' data-month='" + i + "' class='kq-datepicker__month' class=''>" + i + "月</div>"
      }
    }
    $("#date_content").html(_content);
    $(".kq-datepicker__month").click(function () {
      handleMonthSelected(this);
    });
    let _footer = "<div class='picker_footer__inner'><span class='picker-button-default' id='picker_month_nowmonth'>当月</span><span id='picker_month_enter' class='picker-button-primary'>确定</span></div>"
    $("#picker__footer").html(_footer);
    $("#picker_month_nowmonth").click(function () {
      handleSetNowMonth();
    });
    $("#picker_month_enter").click(function () {
      handleMonthEnter();
    })
  }

  function handleYearChange(_count) {
    if (_count < 0) {
      if (parseInt($("#picker_month_year").text()) <= 2010) {
        return
      }
    } else if (_count > 0) {
      if (parseInt($("#picker_month_year").text()) > 2025) {
        return
      }
    }
    $("#picker_month_year").text(parseInt($("#picker_month_year").text()) + _count);
  }

  function handleMonthEnter() {
    let _selectValue = parseInt($("#picker_month_year").text()) + "-" + $(".kq-datepicker__month-active").data("month");
    let year = _selectValue.split("-")[0];
    let month = _selectValue.split("-")[1];
    if (dataType == "m") {
      $("#" + _self_id.split("__")[0]).val(year + "-" + (month < 10 ? ("0" + month) : month));
      setSearchValue(year + " ~ " + month);
    } else {
      $("#" + _self_id.split("__")[0]).val(new Date(year, month - 1, 1).format(dateFormat) + " ~ " + new Date(year, month, 0).format(dateFormat));
      setSearchValue(new Date(year, month - 1, 1).format(dateFormat) + " ~ " + new Date(year, month, 0).format(dateFormat));
    }
    $("#" + _self_id).remove();
    $("#date_bg").remove();
  }

  function handleSetNowMonth() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    $("#picker_month_" + month).click();
    $("#picker_month_year").text(year);
  }

  function handleMonthSelected(_this) {
    $(".kq-datepicker__month").removeClass("kq-datepicker__month-active");
    $(_this).addClass("kq-datepicker__month-active");
  }

  function kqTimeSelect(_item) {
    let arr = _item.id.split("_");
    let left = _item.offsetLeft + "px";
    let _timeSelectPopupHtml = ""
    if (arr[1] == "Hour") {
      let top = _item.offsetTop - _item.offsetHeight - 102;
      _timeSelectPopupHtml = "<div data-type='" + (_item.id) + "' id='timeSelectGroup' style='position: absolute;left: " + left + ";top: " + top + "px;width:122px;background: #fff;'>";
      for (let i = 0; i < 24; i++) {
        _timeSelectPopupHtml += "<div class='kq-time-select-item' style='width: 18px;height: 18px;line-height: 18px;text-align: center;'>" + i + "</div>"
      }
      _timeSelectPopupHtml += "</div>";
    } else if (arr[1] = "Min") {
      let top = _item.offsetTop - _item.offsetHeight - 58;
      _timeSelectPopupHtml = "<div data-type='" + (_item.id) + "' id='timeSelectGroup' style='position: absolute;left: " + left + ";top: " + top + "px;width:122px;background: #fff;'>";
      let ar = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      for (let i = 0; i < ar.length; i++) {
        _timeSelectPopupHtml += "<div class='kq-time-select-item' style='width: 18px;height: 18px;line-height: 18px;text-align: center;'>" + ar[i] + "</div>"
      }
      _timeSelectPopupHtml += "</div>";
    }
    $("#" + arr[0] + "Group").append(_timeSelectPopupHtml);
    $(document).mouseup(function (e) {
      var _con = $('#timeSelectGroup');
      if (!_con.is(e.target) && _con.has(e.target).length === 0) {
        $('#timeSelectGroup').remove();
      }
    });
    $(".kq-time-select-item").click(function () {
      handleTimeItemClick(this);
    })
  }

  function handleTimeItemClick(_item) {
    $("#" + $($(_item).parent()).data("type")).text((parseInt(_item.innerText) < 10 ? "0" + _item.innerText : _item.innerText));
    let sHour = $("#startTime_Hour").text();
    let sMin = $("#startTime_Min").text();
    let eHour = $("#endTime_Hour").text();
    let eMin = $("#endTime_Min").text();
    let arr = $("#picker_range__startDate").text().split(" ~ ");
    if (arr.length > 1) {
      let st = sHour + ":" + sMin;
      let et = eHour + ":" + eMin;
      let value = arr[0].split(" ")[0] + " " + st + " ~ " + arr[1].split(" ")[0] + " " + et;
      $("#picker_range__startDate").text(value);
    }
    $('#timeSelectGroup').remove();
  }

  win.datePickerModule = datePickerModule;
})(window, document);