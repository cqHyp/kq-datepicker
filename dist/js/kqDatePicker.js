!function(t){var i={startTime:"",endTime:""};const r=[{id:1,label:"按天",type:1,ot:"d",_child:[{id:11,label:"昨天",type:3,day:-1},{id:12,label:"前7天",type:3,day:-7},{id:13,label:"前30天",type:3,day:-30},{id:14,label:"前90天",type:3,day:-90}]},{id:2,label:"按月",type:4,ot:"m"},{id:4,label:"按年",type:1,ot:"y",_child:[{id:41,label:"2020",type:3,year:0},{id:42,label:"2019",type:3,year:-1},{id:43,label:"2018",type:3,year:-2},{id:44,label:"2017",type:3,year:-3},{id:45,label:"2016",type:3,year:-4}]},{id:3,label:"自定义",type:2,ot:"c"}];var s=[{id:1,label:"按天",type:1,ot:"d",_child:[{id:11,label:"昨天",type:3,day:-1},{id:12,label:"前7天",type:3,day:-7},{id:13,label:"前30天",type:3,day:-30},{id:14,label:"前90天",type:3,day:-90}]},{id:2,label:"按月",type:4,ot:"m"},{id:4,label:"按年",type:1,ot:"y",_child:[{id:41,label:"2020",type:3,year:0},{id:42,label:"2019",type:3,year:-1},{id:43,label:"2018",type:3,year:-2},{id:44,label:"2017",type:3,year:-3},{id:45,label:"2016",type:3,year:-4}]},{id:3,label:"自定义",type:2,ot:"c"}],d=null,p=null,c=null,y="yyyy-MM-dd";function e(t){let e=this;if(!t)throw new Error("请传入配置参数！");if(e=Object.assign(e,i,t),e.container=document.getElementById(e.container),!e.container)throw new Error("配置 id 错误！");e._bind(t)}function u(e){let t=s.filter(function(t){return t.id==e})[0]._child,n=[],a=[];t.forEach(function(t){let e="";var i;3==t.type&&(i=p+"_date_item_"+t.id,a.push(i),e="<div id='"+i+"' class='flex justify-between align-center item-hover date-checkbox' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>"+t.label+"</span><i style='color: rgba(0,0,0,0.25);display: none;' class=\"layui-icon layui-icon-ok\"></i></div>"),n.push(e)}),$("#dateBack").show(),$("#date_content").html(n.join("")),a.forEach(function(t){var e=t.split("_").pop();$("#"+t).click(function(){for(let t=0;t<$("#date_content>div>i").length;t++)$($("#date_content>div>i")[t]).hide();d=e,$("#"+t+">i").show(),m()})}),l()}function f(){$("#"+p).remove(),$("#date_bg").remove()}function _(){$("#picker__footer").html("");$("#picker__header").html("选择日期<i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;display: none;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i>");let i=[];s.forEach(function(t){let e="";1==t.type?e="<div id='date_item_"+t.id+"' class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>"+t.label+"</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>":2==t.type?e="<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_"+t.id+"' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 15px;box-sizing: border-box;font-size: 12px;color: #999999;'></div><span style='font-size: 13px;color: #333;'>"+t.label+"</span></div>":4==t.type&&(e="<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_"+t.id+"' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 25px;box-sizing: border-box;'></div><span style='font-size: 13px;color: #333;'>"+t.label+"</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>"),i.push(e)}),$("#date_content").html(i.join("")),s.forEach(function(t){1==t.type&&$("#date_item_"+t.id).click(function(){u(t.id)})}),$("#dateBack").hide(),l(),x()}function m(){var t,e,i,n;d?(i=(e=d).split("")[0],"number"==typeof(n=s.filter(function(t){return t.id==i})[0]._child.filter(function(t){return t.id==e})[0]).day?function(t){let e=new Date,i=e.getFullYear(),n=e.getMonth(),a=e.getDate(),l=new Date(i,n,a+t-1),o=new Date(i,n,a-1);$("#"+p.split("__")[0]).val(l.format(y)+" ~ "+o.format(y)),h(l.format(y)+" ~ "+o.format(y))}(n.day):"number"==typeof n.month||"number"==typeof n.year&&function(t){"y"==c?($("#"+p.split("__")[0]).val(t),h(t)):($("#"+p.split("__")[0]).val(new Date(t,0,1).format(y)+" ~ "+new Date(parseInt(t)+1,0,0).format(y)),h(new Date(t,0,1).format(y)+" ~ "+new Date(parseInt(t)+1,0,0).format(y)))}(n.label)):$("#date_item_3").text()?($("#"+p.split("__")[0]).val($("#date_item_3").text()),h($("#date_item_3").text())):$("#date_item_2").text()&&(t=$("#date_item_2").text().split("-")[0],n=$("#date_item_2").text().split("-")[1],"m"==c?($("#"+p.split("__")[0]).val(t+"-"+n),h(t+" ~ "+n)):($("#"+p.split("__")[0]).val(new Date(t,n-1,1).format(y)+" ~ "+new Date(t,n,0).format(y)),h(new Date(t,n-1,1).format(y)+" ~ "+new Date(t,n,0).format(y)))),$("#"+p).remove(),$("#date_bg").remove()}function h(t){t=t.split(" ~ ");1<$(".kq-startId").length?($($(".title-search > div:visible,.title-search-right > div:visible").find(".kq-startId")).val(t[0]),$($(".title-search > div:visible,.title-search-right > div:visible").find(".kq-endId")).val(t[1])):($(".kq-startId").val(t[0]),$(".kq-endId").val(t[1]))}function l(){if(d)for(let t=0;t<$("#date_content>div").length;t++)0<$("#date_content>div")[t].length&&$($("#date_content>div")[t]).attr("id").split("_").pop()==d&&$($("#date_content>div>i")[t]).show()}function x(){0<$("#date_item_3").length&&setTimeout(function(){laydate.render({elem:"#date_item_3",type:"datetime",range:"~",value:"",theme:"#1890FF",format:"yyyy-MM-dd HH:mm",done:function(e,i,n){if(e){$("#date_item_2").html("");var a=parseInt($("#startTime_Hour").text()),l=parseInt($("#startTime_Min").text()),o=parseInt($("#endTime_Hour").text()),r=parseInt($("#endTime_Min").text());i.hours=a,i.minutes=l,n.hours=o,n.minutes=r;let t=e.split(" ~ ");e=t[0].split(" ")[0]+" "+(a<10?"0"+a:a)+":"+(l<10?"0"+l:l)+" ~ "+t[1].split(" ")[0]+" "+(o<10?"0"+o:o)+":"+(r<10?"0"+r:r),setTimeout(function(){$("#"+p.split("__")[0]).val(e),h(e),$("#"+p).remove(),$("#date_bg").remove()})}},ready:function(t){setTimeout(function(){$(".laydate-btns-time").hide(),$(".laydate-main-list-0 .layui-laydate-content").append("<div id='startTimeGroup' style='display: inline-flex;justify-content: flex-start;align-items: center;margin-right: 12px;'><div style='font-size: 12px;' class=''>时间</div><div id='startTime_Hour' class='kq-time-picker-input'>00</div>:<div id='startTime_Min' class='kq-time-picker-input'>00</div></div>"),$(".laydate-main-list-1 .layui-laydate-content").append("<div id='endTimeGroup' style='display: inline-flex;justify-content: flex-start;align-items: center;margin-right: 12px;'><div style='font-size: 12px;' class=''>时间</div><div id='endTime_Hour' class='kq-time-picker-input'>00</div>:<div id='endTime_Min' class='kq-time-picker-input'>00</div></div>");let t=$("#date_item_3").text();var e,i,n,a;t&&(e=t.split(" ~ ")[0].split(" ")[1].split(":")[0],i=t.split(" ~ ")[0].split(" ")[1].split(":")[1],n=t.split(" ~ ")[1].split(" ")[1].split(":")[0],a=t.split(" ~ ")[1].split(" ")[1].split(":")[1],$("#startTime_Hour").text(e),$("#startTime_Min").text(i),$("#endTime_Hour").text(n),$("#endTime_Min").text(a)),$(".layui-laydate-range").prepend("<div class='picker-range-header'><div id='picker_range__startDate'>~</div></div>"),$(".kq-time-picker-input").click(function(){!function(t){let e=t.id.split("_"),i=t.offsetLeft+"px",n="";if("Hour"==e[1]){var a=t.offsetTop-t.offsetHeight-102;n="<div data-type='"+t.id+"' id='timeSelectGroup' style='position: absolute;left: "+i+";top: "+a+"px;width:122px;background: #fff;'>";for(let t=0;t<24;t++)n+="<div class='kq-time-select-item' style='width: 18px;height: 18px;line-height: 18px;text-align: center;'>"+t+"</div>";n+="</div>"}else{e[1]="Min";a=t.offsetTop-t.offsetHeight-58;n="<div data-type='"+t.id+"' id='timeSelectGroup' style='position: absolute;left: "+i+";top: "+a+"px;width:122px;background: #fff;'>";var l=[0,5,10,15,20,25,30,35,40,45,50,55];for(let t=0;t<l.length;t++)n+="<div class='kq-time-select-item' style='width: 18px;height: 18px;line-height: 18px;text-align: center;'>"+l[t]+"</div>";n+="</div>"}$("#"+e[0]+"Group").append(n),$(document).mouseup(function(t){var e=$("#timeSelectGroup");e.is(t.target)||0!==e.has(t.target).length||$("#timeSelectGroup").remove()}),$(".kq-time-select-item").click(function(){!function(t){$("#"+$($(t).parent()).data("type")).text(parseInt(t.innerText)<10?"0"+t.innerText:t.innerText);let e=$("#startTime_Hour").text(),i=$("#startTime_Min").text(),n=$("#endTime_Hour").text(),a=$("#endTime_Min").text(),l=$("#picker_range__startDate").text().split(" ~ ");{var o;1<l.length&&(o=e+":"+i,t=n+":"+a,t=l[0].split(" ")[0]+" "+o+" ~ "+l[1].split(" ")[0]+" "+t,$("#picker_range__startDate").text(t))}$("#timeSelectGroup").remove()}(this)})}(this)})})},change:function(t,e,i){var n=$("#startTime_Hour").text(),a=$("#startTime_Min").text(),l=$("#endTime_Hour").text(),o=$("#endTime_Min").text();let r=t.split(" ~ ");a=n+":"+a,o=l+":"+o;t=r[0].split(" ")[0]+" "+a+" ~ "+r[1].split(" ")[0]+" "+o,$("#picker_range__startDate").html(t)}})}),0<$("#date_item_2").length&&$("#date_item_2").click(function(){v()})}function v(){var t=(new Date).getFullYear(),e=(new Date).getMonth()+1,t="<i class=\"layui-icon layui-icon-prev\" id='year_prev' style='font-size: 12px;position: absolute;left: 40px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;line-height: 16px;'></i><span id='picker_month_year' style='line-height: 16px;'>"+t+"</span><i class=\"layui-icon layui-icon-next\" id='year_next' style='font-size: 12px;position: absolute;right: 40px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;line-height: 16px;'></i><i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i>";$("#picker__header").html(t),$("#dateClose").click(function(){f()}),$("#dateBack").click(function(){_()}),$("#year_prev").click(function(){n(-1)}),$("#year_next").click(function(){n(1)});let i="<div style='display: flex;justify-content: space-between;flex-wrap: wrap;padding: 0 5px;'>";for(let t=1;t<=12;t++)t==e?i+="<div id='picker_month_"+t+"' data-month='"+t+"' class='kq-datepicker__month kq-datepicker__month-active' class=''>"+t+"月</div>":i+="<div id='picker_month_"+t+"' data-month='"+t+"' class='kq-datepicker__month' class=''>"+t+"月</div>";$("#date_content").html(i),$(".kq-datepicker__month").click(function(){var t;t=this,$(".kq-datepicker__month").removeClass("kq-datepicker__month-active"),$(t).addClass("kq-datepicker__month-active")});$("#picker__footer").html("<div class='picker_footer__inner'><span class='picker-button-default' id='picker_month_nowmonth'>当月</span><span id='picker_month_enter' class='picker-button-primary'>确定</span></div>"),$("#picker_month_nowmonth").click(function(){var t,e;t=(new Date).getFullYear(),e=(new Date).getMonth()+1,$("#picker_month_"+e).click(),$("#picker_month_year").text(t)}),$("#picker_month_enter").click(function(){!function(){let t=parseInt($("#picker_month_year").text())+"-"+$(".kq-datepicker__month-active").data("month"),e=t.split("-")[0],i=t.split("-")[1];"m"==c?($("#"+p.split("__")[0]).val(e+"-"+(i<10?"0"+i:i)),h(e+" ~ "+i)):($("#"+p.split("__")[0]).val(new Date(e,i-1,1).format(y)+" ~ "+new Date(e,i,0).format(y)),h(new Date(e,i-1,1).format(y)+" ~ "+new Date(e,i,0).format(y)));$("#"+p).remove(),$("#date_bg").remove()}()})}function n(t){if(t<0){if(parseInt($("#picker_month_year").text())<=2010)return}else if(0<t&&2025<parseInt($("#picker_month_year").text()))return;$("#picker_month_year").text(parseInt($("#picker_month_year").text())+t)}e.prototype={_bind:function(l){var o=this;o.container.addEventListener("focus",function(t){if(l.endId&&0==$("#"+l.endId).length&&($(this).data("endId",l.endId),$(this).after("<input id='"+l.endId+"' value='"+l.endValue+"' name='"+l.endId+"' class='kq-endId' style='display: none;'/>")),l.startId&&0==$("#"+l.startId).length&&($(this).data("startId",l.startId),$(this).after("<input id='"+l.startId+"' value='"+l.startValue+"' name='"+l.startId+"' class='kq-startId' style='display: none;'/>")),y=l.dateFormat||"yyyy-MM-dd",this.dataset.type){c=this.dataset.type;let e=this.dataset.type.split(",");s=r.filter(function(t){return-1<e.indexOf(t.ot)})}else s=r;var e,i,n,a;0<$("#date_bg").length||(p=o.container.id+"__"+Math.floor(8999*Math.random())+1e3,d=null,e=$(this).offset().left+"px",i=$(this).offset().top+this.offsetHeight+5,a=function(){let i=[];return s.forEach(function(t){let e="";1==t.type?e="<div id='date_item_"+t.id+"' class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;'><span style='font-size: 13px;color: #333;'>"+t.label+"</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>":2==t.type?e="<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_"+t.id+"' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 15px;box-sizing: border-box;font-size: 12px;color: #999999;'></div><span style='font-size: 13px;color: #333;'>"+t.label+"</span></div>":4==t.type&&(e="<div class='flex justify-between align-center item-hover' style='padding: 8px;cursor: pointer;position: relative;'><div id='date_item_"+t.id+"' style='width: 140px;position: absolute;right: 0;top: 0;height: 100%;display: flex;justify-content: flex-end;align-items: center;padding-right: 25px;box-sizing: border-box;'></div><span style='font-size: 13px;color: #333;'>"+t.label+"</span><i style='color: rgba(0,0,0,0.25);' class=\"layui-icon layui-icon-right\"></i></div>"),i.push(e)}),"<div class='flex-sub' id='date_content' style='padding: 8px 0;box-sizing: border-box;'>"+i.join("")+"</div>"}(),a="<div id='"+p+"' class='kq-datepicker flex justify-start flex-direction' style='width: 204px;left: "+e+";top: "+i+"px;background: #fff;border-radius: 4px;position: absolute;box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);z-index: 99998'><div id='picker__header' style='font-size: 13px;color: #333;text-align: center;padding: 8px 10px;box-sizing: border-box;border-bottom: 1px solid rgba(0, 0, 0, 0.1);position: relative;'>选择日期<i id='dateBack' class=\"layui-icon layui-icon-left\" style='position: absolute;left: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;display: none;'></i><i id='dateClose' class=\"layui-icon layui-icon-close\" style='position: absolute;right: 5px;top: 50%;margin-top: -7px;color: #999;cursor: pointer;'></i></div>"+a+"<div id='picker__footer' class='flex justify-center align-center' style='box-sizing: border-box;'></div></div><div id='date_bg' style='z-index: 99997;position: absolute;left: 0;top: 0;width: 100%;height: 100%;'></div>",$("body").append(a),s.forEach(function(t){1==t.type&&$("#date_item_"+t.id).click(function(){u(t.id)})}),$("#dateClose").click(function(){f()}),$("#dateBack").click(function(){_()}),$("#datePickerEnter").click(function(){m()}),$("#date_bg").click(function(){f()}),x(),1==c.split(",").length&&(n=c.split(",")[0],a=r.filter(function(t){return t.ot==n})[0].id,"y"==n||"d"==n?(u(a),$("#dateBack").hide()):"m"==n&&(v(),$("#dateBack").hide())))}),o.container.addEventListener("blur",function(t){let e=$("#"+p.split("__")[0]).val();var i;e?1==(i=e.split(" ~ ")).length||i.length:$("#"+p.split("__")[0]).val("")})}},t.datePickerModule=e}(window,document);