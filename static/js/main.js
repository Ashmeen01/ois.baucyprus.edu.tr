SOL_ACIK=1;
PENCERE_AYARLA=1;
      dil='en';

/*TRIM FONKSIYONU*/
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
}

/*IN_ARRAY FONKSIYONU*/
Array.prototype.in_array = function(p_val) {
    for(var i = 0, l = this.length; i < l; i++) {
        if(this[i] == p_val) {
            return true;
        }
    }
    return false;
}


Array.prototype.indexOf=function(val){
    for(var i=0;i<this.length;i++)
    {
        if(this[i]==val)
            return i;
    }
}

Number.prototype.format= function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    decSeparator = decSeparator == undefined ? "." : decSeparator,
    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
    sign = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var registeredInModuleLoader;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function decode (s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }

    function init (converter) {
        function api() {}

        function set (key, value, attributes) {
            if (typeof document === 'undefined') {
                return;
            }

            attributes = extend({
                path: '/'
            }, api.defaults, attributes);

            if (typeof attributes.expires === 'number') {
                attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
            }

            // We're using "expires" because "max-age" is not supported by IE
            attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

            try {
                var result = JSON.stringify(value);
                if (/^[\{\[]/.test(result)) {
                    value = result;
                }
            } catch (e) {}

            value = converter.write ?
                converter.write(value, key) :
                encodeURIComponent(String(value))
                    .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

            key = encodeURIComponent(String(key))
                .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                .replace(/[\(\)]/g, escape);

            var stringifiedAttributes = '';
            for (var attributeName in attributes) {
                if (!attributes[attributeName]) {
                    continue;
                }
                stringifiedAttributes += '; ' + attributeName;
                if (attributes[attributeName] === true) {
                    continue;
                }

                // Considers RFC 6265 section 5.2:
                // ...
                // 3.  If the remaining unparsed-attributes contains a %x3B (";")
                //     character:
                // Consume the characters of the unparsed-attributes up to,
                // not including, the first %x3B (";") character.
                // ...
                stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
            }

            return (document.cookie = key + '=' + value + stringifiedAttributes);
        }

        function get (key, json) {
            if (typeof document === 'undefined') {
                return;
            }

            var jar = {};
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all.
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = decode(parts[0]);
                    cookie = (converter.read || converter)(cookie, name) ||
                        decode(cookie);

                    if (json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    jar[name] = cookie;

                    if (key === name) {
                        break;
                    }
                } catch (e) {}
            }

            return key ? jar[key] : jar;
        }

        api.set = set;
        api.get = function (key) {
            return get(key, false /* read as raw */);
        };
        api.getJSON = function (key) {
            return get(key, true /* read as json */);
        };
        api.remove = function (key, attributes) {
            set(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.defaults = {};

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){factory(require('jquery'))}else{factory(jQuery)}}(function($){var pluses=/\+/g;function encode(s){return config.raw?s:encodeURIComponent(s)}function decode(s){return config.raw?s:decodeURIComponent(s)}function stringifyCookieValue(value){return encode(config.json?JSON.stringify(value):String(value))}function parseCookieValue(s){if(s.indexOf('"')===0){s=s.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,'\\')}try{s=decodeURIComponent(s.replace(pluses,' '));return config.json?JSON.parse(s):s}catch(e){}}function read(s,converter){var value=config.raw?s:parseCookieValue(s);return $.isFunction(converter)?converter(value):value}var config=$.cookie=function(key,value,options){if(arguments.length>1&&!$.isFunction(value)){options=$.extend({},config.defaults,options);if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setTime(+t+days*864e+5)}return(document.cookie=[encode(key),'=',stringifyCookieValue(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''))}var result=key?undefined:{};var cookies=document.cookie?document.cookie.split('; '):[];for(var i=0,l=cookies.length;i<l;i++){var parts=cookies[i].split('=');var name=decode(parts.shift());var cookie=parts.join('=');if(key&&key===name){result=read(cookie,value);break}if(!key&&(cookie=read(cookie))!==undefined){result[name]=cookie}}return result};config.defaults={};$.removeCookie=function(key,options){if($.cookie(key)===undefined){return false}$.cookie(key,'',$.extend({},options,{expires:-1}));return!$.cookie(key)}}));

(function($) {
    $.fn.blink = function(options) {
        var defaults = {
            delay: 500
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            var obj = $(this);
            setInterval(function() {
                if ($(obj).css("visibility") == "visible") {
                    $(obj).css('visibility', 'hidden');
                }
                else {
                    $(obj).css('visibility', 'visible');
                }
            }, options.delay);
        });
    }
}(jQuery))

/*!
* jquery-timepicker v1.6.8 - A jQuery timepicker plugin inspired by Google Calendar. It supports both mouse and keyboard navigation.
* Copyright (c) 2015 Jon Thornton - http://jonthornton.github.com/jquery-timepicker/
* License: MIT
*/

!function(a){"object"==typeof exports&&exports&&"object"==typeof module&&module&&module.exports===exports?a(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){function b(a){var b=a[0];return b.offsetWidth>0&&b.offsetHeight>0}function c(b){if(b.minTime&&(b.minTime=t(b.minTime)),b.maxTime&&(b.maxTime=t(b.maxTime)),b.durationTime&&"function"!=typeof b.durationTime&&(b.durationTime=t(b.durationTime)),"now"==b.scrollDefault?b.scrollDefault=t(new Date):b.scrollDefault?b.scrollDefault=t(b.scrollDefault):b.minTime&&(b.scrollDefault=b.minTime),b.scrollDefault&&(b.scrollDefault=b.roundingFunction(b.scrollDefault,b)),"string"===a.type(b.timeFormat)&&b.timeFormat.match(/[gh]/)&&(b._twelveHourTime=!0),b.disableTimeRanges.length>0){for(var c in b.disableTimeRanges)b.disableTimeRanges[c]=[t(b.disableTimeRanges[c][0]),t(b.disableTimeRanges[c][1])];b.disableTimeRanges=b.disableTimeRanges.sort(function(a,b){return a[0]-b[0]});for(var c=b.disableTimeRanges.length-1;c>0;c--)b.disableTimeRanges[c][0]<=b.disableTimeRanges[c-1][1]&&(b.disableTimeRanges[c-1]=[Math.min(b.disableTimeRanges[c][0],b.disableTimeRanges[c-1][0]),Math.max(b.disableTimeRanges[c][1],b.disableTimeRanges[c-1][1])],b.disableTimeRanges.splice(c,1))}return b}function d(b){var c=b.data("timepicker-settings"),d=b.data("timepicker-list");if(d&&d.length&&(d.remove(),b.data("timepicker-list",!1)),c.useSelect){d=a("<select />",{"class":"ui-timepicker-select"});var g=d}else{d=a("<ul />",{"class":"ui-timepicker-list"});var g=a("<div />",{"class":"ui-timepicker-wrapper",tabindex:-1});g.css({display:"none",position:"absolute"}).append(d)}if(c.noneOption)if(c.noneOption===!0&&(c.noneOption=c.useSelect?"Time...":"None"),a.isArray(c.noneOption)){for(var h in c.noneOption)if(parseInt(h,10)==h){var j=e(c.noneOption[h],c.useSelect);d.append(j)}}else{var j=e(c.noneOption,c.useSelect);d.append(j)}if(c.className&&g.addClass(c.className),(null!==c.minTime||null!==c.durationTime)&&c.showDuration){{"function"==typeof c.step?"function":c.step}g.addClass("ui-timepicker-with-duration"),g.addClass("ui-timepicker-step-"+c.step)}var l=c.minTime;"function"==typeof c.durationTime?l=t(c.durationTime()):null!==c.durationTime&&(l=c.durationTime);var m=null!==c.minTime?c.minTime:0,o=null!==c.maxTime?c.maxTime:m+v-1;m>o&&(o+=v),o===v-1&&"string"===a.type(c.timeFormat)&&c.show2400&&(o=v);var p=c.disableTimeRanges,u=0,w=p.length,y=c.step;"function"!=typeof y&&(y=function(){return c.step});for(var h=m,z=0;o>=h;z++,h+=60*y(z)){var A=h,B=s(A,c);if(c.useSelect){var C=a("<option />",{value:B});C.text(B)}else{var C=a("<li />");C.data("time",86400>=A?A:A%86400),C.text(B)}if((null!==c.minTime||null!==c.durationTime)&&c.showDuration){var D=r(h-l,c.step);if(c.useSelect)C.text(C.text()+" ("+D+")");else{var E=a("<span />",{"class":"ui-timepicker-duration"});E.text(" ("+D+")"),C.append(E)}}w>u&&(A>=p[u][1]&&(u+=1),p[u]&&A>=p[u][0]&&A<p[u][1]&&(c.useSelect?C.prop("disabled",!0):C.addClass("ui-timepicker-disabled"))),d.append(C)}if(g.data("timepicker-input",b),b.data("timepicker-list",g),c.useSelect)b.val()&&d.val(f(t(b.val()),c)),d.on("focus",function(){a(this).data("timepicker-input").trigger("showTimepicker")}),d.on("blur",function(){a(this).data("timepicker-input").trigger("hideTimepicker")}),d.on("change",function(){n(b,a(this).val(),"select")}),n(b,d.val(),"initial"),b.hide().after(d);else{var F=c.appendTo;"string"==typeof F?F=a(F):"function"==typeof F&&(F=F(b)),F.append(g),k(b,d),d.on("mousedown","li",function(){b.off("focus.timepicker"),b.on("focus.timepicker-ie-hack",function(){b.off("focus.timepicker-ie-hack"),b.on("focus.timepicker",x.show)}),i(b)||b[0].focus(),d.find("li").removeClass("ui-timepicker-selected"),a(this).addClass("ui-timepicker-selected"),q(b)&&(b.trigger("hideTimepicker"),d.on("mouseup.timepicker","li",function(){d.off("mouseup.timepicker"),g.hide()}))})}}function e(b,c){var d,e,f;return"object"==typeof b?(d=b.label,e=b.className,f=b.value):"string"==typeof b?d=b:a.error("Invalid noneOption value"),c?a("<option />",{value:f,"class":e,text:d}):a("<li />",{"class":e,text:d}).data("time",f)}function f(a,b){return a=b.roundingFunction(a,b),null!==a?s(a,b):void 0}function g(){return new Date(1970,1,1,0,0,0)}function h(b){var c=a(b.target),d=c.closest(".ui-timepicker-input");0===d.length&&0===c.closest(".ui-timepicker-wrapper").length&&(x.hide(),a(document).unbind(".ui-timepicker"),a(window).unbind(".ui-timepicker"))}function i(a){var b=a.data("timepicker-settings");return(window.navigator.msMaxTouchPoints||"ontouchstart"in document)&&b.disableTouchKeyboard}function j(b,c,d){if(!d&&0!==d)return!1;var e=b.data("timepicker-settings"),f=!1,d=e.roundingFunction(d,e);return c.find("li").each(function(b,c){var e=a(c);if("number"==typeof e.data("time"))return e.data("time")==d?(f=e,!1):void 0}),f}function k(a,b){b.find("li").removeClass("ui-timepicker-selected");var c=t(m(a),a.data("timepicker-settings"));if(null!==c){var d=j(a,b,c);if(d){var e=d.offset().top-b.offset().top;(e+d.outerHeight()>b.outerHeight()||0>e)&&b.scrollTop(b.scrollTop()+d.position().top-d.outerHeight()),d.addClass("ui-timepicker-selected")}}}function l(b,c){if(""!==this.value&&"timepicker"!=c){var d=a(this);if(!d.is(":focus")||b&&"change"==b.type){var e=d.data("timepicker-settings"),f=t(this.value,e);if(null===f)return void d.trigger("timeFormatError");var g=!1;null!==e.minTime&&f<e.minTime?g=!0:null!==e.maxTime&&f>e.maxTime&&(g=!0),a.each(e.disableTimeRanges,function(){return f>=this[0]&&f<this[1]?(g=!0,!1):void 0}),e.forceRoundTime&&(f=e.roundingFunction(f,e));var h=s(f,e);g?n(d,h,"error")&&d.trigger("timeRangeError"):n(d,h)}}}function m(a){return a.is("input")?a.val():a.data("ui-timepicker-value")}function n(a,b,c){if(a.is("input")){a.val(b);var d=a.data("timepicker-settings");d.useSelect&&"select"!=c&&"initial"!=c&&a.data("timepicker-list").val(f(t(b),d))}return a.data("ui-timepicker-value")!=b?(a.data("ui-timepicker-value",b),"select"==c?a.trigger("selectTime").trigger("changeTime").trigger("change","timepicker"):"error"!=c&&a.trigger("changeTime"),!0):(a.trigger("selectTime"),!1)}function o(c){var d=a(this),e=d.data("timepicker-list");if(!e||!b(e)){if(40!=c.keyCode)return!0;x.show.call(d.get(0)),e=d.data("timepicker-list"),i(d)||d.focus()}switch(c.keyCode){case 13:return q(d)&&x.hide.apply(this),c.preventDefault(),!1;case 38:var f=e.find(".ui-timepicker-selected");return f.length?f.is(":first-child")||(f.removeClass("ui-timepicker-selected"),f.prev().addClass("ui-timepicker-selected"),f.prev().position().top<f.outerHeight()&&e.scrollTop(e.scrollTop()-f.outerHeight())):(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")),!1;case 40:return f=e.find(".ui-timepicker-selected"),0===f.length?(e.find("li").each(function(b,c){return a(c).position().top>0?(f=a(c),!1):void 0}),f.addClass("ui-timepicker-selected")):f.is(":last-child")||(f.removeClass("ui-timepicker-selected"),f.next().addClass("ui-timepicker-selected"),f.next().position().top+2*f.outerHeight()>e.outerHeight()&&e.scrollTop(e.scrollTop()+f.outerHeight())),!1;case 27:e.find("li").removeClass("ui-timepicker-selected"),x.hide();break;case 9:x.hide();break;default:return!0}}function p(c){var d=a(this),e=d.data("timepicker-list");if(!e||!b(e))return!0;switch(c.keyCode){case 96:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 65:case 77:case 80:case 186:case 8:case 46:d.data("timepicker-settings").typeaheadHighlight?k(d,e):e.hide()}}function q(a){var b=a.data("timepicker-settings"),c=a.data("timepicker-list"),d=null,e=c.find(".ui-timepicker-selected");return e.hasClass("ui-timepicker-disabled")?!1:(e.length&&(d=e.data("time")),null!==d&&("string"!=typeof d&&(d=s(d,b)),n(a,d,"select")),!0)}function r(a,b){a=Math.abs(a);var c,d,e=Math.round(a/60),f=[];return 60>e?f=[e,w.mins]:(c=Math.floor(e/60),d=e%60,30==b&&30==d&&(c+=w.decimal+5),f.push(c),f.push(1==c?w.hr:w.hrs),30!=b&&d&&(f.push(d),f.push(w.mins))),f.join(" ")}function s(b,c){if(null!==b){var d=new Date(u.valueOf()+1e3*b);if(!isNaN(d.getTime())){if("function"===a.type(c.timeFormat))return c.timeFormat(d);for(var e,f,g="",h=0;h<c.timeFormat.length;h++)switch(f=c.timeFormat.charAt(h)){case"a":g+=d.getHours()>11?w.pm:w.am;break;case"A":g+=d.getHours()>11?w.PM:w.AM;break;case"g":e=d.getHours()%12,g+=0===e?"12":e;break;case"G":e=d.getHours(),b===v&&(e=24),g+=e;break;case"h":e=d.getHours()%12,0!==e&&10>e&&(e="0"+e),g+=0===e?"12":e;break;case"H":e=d.getHours(),b===v&&(e=24),g+=e>9?e:"0"+e;break;case"i":var i=d.getMinutes();g+=i>9?i:"0"+i;break;case"s":b=d.getSeconds(),g+=b>9?b:"0"+b;break;case"\\":h++,g+=c.timeFormat.charAt(h);break;default:g+=f}return g}}}function t(a,b){if(""===a)return null;if(!a||a+0==a)return a;if("object"==typeof a)return 3600*a.getHours()+60*a.getMinutes()+a.getSeconds();a=a.toLowerCase().replace(".",""),("a"==a.slice(-1)||"p"==a.slice(-1))&&(a+="m");var c="("+w.am.replace(".","")+"|"+w.pm.replace(".","")+"|"+w.AM.replace(".","")+"|"+w.PM.replace(".","")+")?",d=new RegExp("^"+c+"\\s*([0-2]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?\\s*"+c+"$"),e=a.match(d);if(!e)return null;var f=parseInt(1*e[2],10),g=e[1]||e[5],h=f;if(12>=f&&g){var i=g==w.pm||g==w.PM;h=12==f?i?12:0:f+(i?12:0)}var j=1*e[3]||0,k=1*e[4]||0,l=3600*h+60*j+k;if(!g&&b&&b._twelveHourTime&&b.scrollDefault){var m=l-b.scrollDefault;0>m&&m>=v/-2&&(l=(l+v/2)%v)}return l}var u=g(),v=86400,w={am:"am",pm:"pm",AM:"AM",PM:"PM",decimal:".",mins:"mins",hr:"hr",hrs:"hrs"},x={init:function(b){return this.each(function(){var e=a(this),f=[];for(var g in a.fn.timepicker.defaults)e.data(g)&&(f[g]=e.data(g));var h=a.extend({},a.fn.timepicker.defaults,f,b);h.lang&&(w=a.extend(w,h.lang)),h=c(h),e.data("timepicker-settings",h),e.addClass("ui-timepicker-input"),h.useSelect?d(e):(e.prop("autocomplete","off"),e.on("click.timepicker focus.timepicker",x.show),e.on("change.timepicker",l),e.on("keydown.timepicker",o),e.on("keyup.timepicker",p),l.call(e.get(0)))})},show:function(c){var e=a(this),f=e.data("timepicker-settings");if(c){if(!f.showOnFocus)return!0;c.preventDefault()}if(f.useSelect)return void e.data("timepicker-list").focus();i(e)&&e.blur();var g=e.data("timepicker-list");if(!e.prop("readonly")&&(g&&0!==g.length&&"function"!=typeof f.durationTime||(d(e),g=e.data("timepicker-list")),!b(g))){e.data("ui-timepicker-value",e.val()),k(e,g),x.hide(),g.show();var l={};l.left=f.orientation.match(/r/)?e.offset().left+e.outerWidth()-g.outerWidth()+parseInt(g.css("marginLeft").replace("px",""),10):e.offset().left+parseInt(g.css("marginLeft").replace("px",""),10);var n;n=f.orientation.match(/t/)?"t":f.orientation.match(/b/)?"b":e.offset().top+e.outerHeight(!0)+g.outerHeight()>a(window).height()+a(window).scrollTop()?"t":"b","t"==n?(g.addClass("ui-timepicker-positioned-top"),l.top=e.offset().top-g.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10)):(g.removeClass("ui-timepicker-positioned-top"),l.top=e.offset().top+e.outerHeight()+parseInt(g.css("marginTop").replace("px",""),10)),g.offset(l);var o=g.find(".ui-timepicker-selected");if(o.length||(m(e)?o=j(e,g,t(m(e))):f.scrollDefault&&(o=j(e,g,f.scrollDefault))),o&&o.length){var p=g.scrollTop()+o.position().top-o.outerHeight();g.scrollTop(p)}else g.scrollTop(0);return a(document).on("touchstart.ui-timepicker mousedown.ui-timepicker",h),a(window).on("resize.ui-timepicker",h),f.closeOnWindowScroll&&a(document).on("scroll.ui-timepicker",h),e.trigger("showTimepicker"),this}},hide:function(){var c=a(this),d=c.data("timepicker-settings");return d&&d.useSelect&&c.blur(),a(".ui-timepicker-wrapper").each(function(){var c=a(this);if(b(c)){var d=c.data("timepicker-input"),e=d.data("timepicker-settings");e&&e.selectOnBlur&&q(d),c.hide(),d.trigger("hideTimepicker")}}),this},option:function(b,e){return this.each(function(){var f=a(this),g=f.data("timepicker-settings"),h=f.data("timepicker-list");if("object"==typeof b)g=a.extend(g,b);else if("string"==typeof b&&"undefined"!=typeof e)g[b]=e;else if("string"==typeof b)return g[b];g=c(g),f.data("timepicker-settings",g),h&&(h.remove(),f.data("timepicker-list",!1)),g.useSelect&&d(f)})},getSecondsFromMidnight:function(){return t(m(this))},getTime:function(a){var b=this,c=m(b);if(!c)return null;var d=t(c);if(!d)return null;a||(a=new Date);var e=new Date(a);return e.setHours(d/3600),e.setMinutes(d%3600/60),e.setSeconds(d%60),e.setMilliseconds(0),e},setTime:function(a){var b=this,c=b.data("timepicker-settings");if(c.forceRoundTime)var d=f(t(a),c);else var d=s(t(a),c);return n(b,d),b.data("timepicker-list")&&k(b,b.data("timepicker-list")),this},remove:function(){var a=this;if(a.hasClass("ui-timepicker-input")){var b=a.data("timepicker-settings");return a.removeAttr("autocomplete","off"),a.removeClass("ui-timepicker-input"),a.removeData("timepicker-settings"),a.off(".timepicker"),a.data("timepicker-list")&&a.data("timepicker-list").remove(),b.useSelect&&a.show(),a.removeData("timepicker-list"),this}}};a.fn.timepicker=function(b){return this.length?x[b]?this.hasClass("ui-timepicker-input")?x[b].apply(this,Array.prototype.slice.call(arguments,1)):this:"object"!=typeof b&&b?void a.error("Method "+b+" does not exist on jQuery.timepicker"):x.init.apply(this,arguments):this},a.fn.timepicker.defaults={className:null,minTime:null,maxTime:null,durationTime:null,step:30,showDuration:!1,showOnFocus:!0,timeFormat:"g:ia",scrollDefault:null,selectOnBlur:!1,disableTouchKeyboard:!1,forceRoundTime:!1,roundingFunction:function(a,b){if(null===a)return null;var c=a%(60*b.step);return c>=30*b.step?a+=60*b.step-c:a-=c,a},appendTo:"body",orientation:"l",disableTimeRanges:[],closeOnWindowScroll:!1,typeaheadHighlight:!0,noneOption:!1,show2400:!1}});

function ogrenciNoDegistir()
{
    var ogrno=$("#aktif_ogrenci_no").val();
    document.location.href=BASE_URL+'/index/index/ogrenci_no/'+ogrno;
}

function yetkiDegistir()
{
    var yetki=$("#yetkiler").val();
    document.location.href=BASE_URL+'/index/index/yetki/'+yetki;
}

function popUp2(adres, w, h)
{
    //modalBig(adres,w,"",function(){setDatepicker()});
    window.open(adres,'_blank',"height="+h+",width="+w+",status=no,toolbar=no,menubar=no,location=no,scrollbars=yes");
}

function popUp(adres)
{
    if($.browser.chrome)
    {
        $("<a>").attr("href", adres).attr("target", "_blank")[0].click();
    }
    else
    {
        window.open(adres,'_blank',"menubar=yes,toolbar=yes,location=no,resizable=yes,scrollbars=yes");
    }
}




refZIndex=100;
refLeft=30;
refTop=150;
aktifZIndex=0;

function widgetYukle(url,genislik)
{
    if(url=="notdefteri")
        var res=false;
    else
        var res=true;

    var devam = $("#container #widget_".url).val();
    if(devam!=undefined && devam!=null){
     return "";
    }
    var url=BASE_URL+"/sistem/widget/"+url;

    if(WIDGETS.in_array(url))
        return "";
    else
    {
        WIDGETS[WIDGETS.length]=url;
    }

    var en=$(window).width();
    var boy=$(window).height();

    if(genislik)
        var widget_genislik=genislik;
    else
        var widget_genislik=380;


    $.ajax({
        url:url,
        method:"post",
        beforeSend : function(){
        },
        success: function(data){

            if(data=='HATA')
            {
                alertDiyalog("ERROR",url+"<br>Bu widgeti görüntüleme hakkınız yok!");
                $("#status").html("");
                var indis=WIDGETS.indexOf(url);
                WIDGETS[indis]=null;
            }
            else
            {

                if(refLeft+widget_genislik>en)
                {
                    refLeft=30;
                    refTop+=100;
                }


                $("#container").append(data);

                refLeft+=widget_genislik+30;
                refZIndex++;
            }
        }

    });
}





SOL_ACIK=1; //


function tabloyuDuzenle()
{
    if(SOL_ACIK==1)
    {
        $("#sol_tutac").click();
        SOL_ACIK=0;
    }
    //grid genisletme
    $("div.GridHeader").remove();
    $("#grid").find("th").css("width","");
    $("#grid").find("td").css("width","");
    $("#grid").find("table").css("width","98%");
    $("#grid").find("table").parent().css("padding-left","10px");

    $("#tblGrid").css("width","99%");

    $("#tblGrid").parent().css("width","99%");
    $("#tblGrid").parent().css("height","");
    $("#tblGrid").parent().css("overflow","hidden");
    $("div.GridHeader").remove();

    $("#tblGrid tr:odd").css("background-color","#F9F9F9");


    $("#tblGrid tr:first").after($("#grid table thead ").html());
    //$("#tblGrid tr:eq(1) th span").remove();
    $("#tblGrid th").css("white-space","nowrap");
    $("#tblGrid td").css("cursor","pointer");
    $("#grid table:first").hide(); //her sayfa yüklendiginde bunu da o tablonun basina cakmak lazim..

    i=0;
    $("#tblGrid th").each(function(){
        $(this).attr("indis",i);
        $(this).click(function(e){
            $("#grid table:first th:eq("+$(this).attr("indis")+") div").click();
        });
        i++;
    });

    if($.browser.msie && $.browser.version==7)
    {
        $("#pager").css("margin-left","0px");
    }

    $("#pager").css("width","98%");
    tabloCubuk();

}


function tabloCubuk()
{
    $("#tblGrid td").hover(function(){
        $(this).parent().attr("eski",$(this).parent().css("background-color"));
        $(this).parent().css("background-color","#FED22F");
    },function(){

        $(this).parent().css("background-color",$(this).parent().attr("eski"));
    });
}

function addToSelect(id, val, text)
{
    var opt='<option value="'+val+'">'+text+'</option>';
    $(opt).appendTo(id);
}

function removeFromSelect(id)
{
    return $(id+" option:selected").remove();
}

function sendFromTo(from, to)
{
    $(from+" option:selected").remove().appendTo(to);
}

function selectAllOptions(id)
{
    $(id+" *").attr("selected","selected");
}

function xmlToForm(form, xml)
{
    $(form).find("input").each(function()
    {
        $(this).val('');
        if($(this).attr('name'))
        {
            var val=$("row",xml).attr($(this).attr('name'));
            $(this).val(val);
        }
    });

    $(form).find("select").each(function()
    {
        $(this).val('');
        if($(this).attr('name'))
        {
            var val=$("row",xml).attr($(this).attr('name'));
            $(this).val(val);
        }
    });
}

function fillSelect(id, url, val) {
    let dropdown = $('#'+id);

    dropdown.empty();

    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.oV).text(entry.oT));
        });
        if(val!=undefined)
        {
            dropdown.val(val);
        }
    });
}

function jsonToForm(form, json)
{
    $(form).find("input").each(function()
    {
        if($(this).attr('name'))
        {
            var val=$(json).attr($(this).attr('name'));
            if($(this).attr('type')=='radio')
            {
                if($(this).val()==val)
                    $(this).prop('checked','checked');
            }
            else
            {
                $(this).val(val);
            }
        }
    });

    $(form).find("select").each(function()
    {
        if($(this).attr('name'))
        {
            var val=$(json).attr($(this).attr('name'));
            $(this).val(val);
            $(this).trigger("change");
        }
    });

    $(form).find("textarea").each(function()
    {
        $(this).text('');
        if($(this).attr('name'))
        {
            var val=$(json).attr($(this).attr('name'));
            $(this).text(val);
        }
    });
}

function isInteger (s)
{
    var i;

    if (isEmpty(s))
        if (isInteger.arguments.length == 1) return 0;
        else return (isInteger.arguments[1] == true);

    for (i = 0; i < s.length; i++)
    {
        var c = s.charAt(i);

        if (!isDigit(c)) return false;
    }

    return true;
}
function isFloat(s)
{
    var n = s.toString();
    if(n[0]=='-' || n[0]=='+')
    {
        n=n.substr(1,n.length-1);
    }
    if(n.length>0 && !n.match(/[^0-9.]/))
    {
        if(n.match(/[.]/))
        {
            var arr=n.split('.');

            if(arr.length>2)
            {
                return false;
            }
            else if(arr.length==2 && (arr[0]=='' || arr[1]==''))
            {
                return false;
            }
        }

        return true;
    }

    return false;

}

function isInRange(s, min, max)
{
    if(isFloat(s))
    {
        var n=parseFloat(s);

        if(n<=max && n>=min)
        {
            return true;
        }
    }

    return false;
}

function isEmpty(s)
{
    return ((s == null) || (s.length == 0))
}

function isDigit (c)
{
    return ((c >= "0") && (c <= "9"))
}
function alertDiyalog(b,t,i,onClose)
{
    var html='<div id="alert_modal" class="modal hide fade '+i+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
        '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
        '    <h3 id="myModalLabel">'+b+'</h3>'+
        '</div>'+
        '<div class="modal-body">'+
        '    <p>'+t+'</p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
        '</div>'+
        '</div>';
    $("#alert_modal").remove();
    $("body").append(html);
    $('#alert_modal').modal();
    if(onClose!=undefined && typeof onClose=="function")
    {
        $("#alert_modal").find(".modal-footer").find(".btn").click(onClose);
    }
}

function confirmDiyalog(b,t,but,iframe, func)
{
    var htm ='<p>'+t+'</p>';
    if(iframe==true){
       htm='<iframe src="'+t+'" frameborder="0"></iframe>';
    }
    var css ='';
    if(iframe==true) {
        css = ' confirm_modal-iframe ';
    }
    var str='';
    var c=0;
    $.each(but, function(n,f){
        str+='<a id="confirm_btn'+(c++)+'" class="btn btn-primary">'+n+'</a>';
    });
    var html='<div id="confirm_modal" class="modal'+css+' hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
        '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
        '    <h3 id="myModalLabel">'+b+'</h3>'+
        '</div>'+
        '<div class="modal-body">'+
        htm+
        '</div>'+
        '<div class="modal-footer">'+
        '    <button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>'+str+
        '</div>'+
        '</div>';
    $("#confirm_modal").remove();
    $("body").append(html);
    c=0;
    $.each(but, function(n,f){
        $("#confirm_btn"+(c++)).click(f);
    });
    if(func!=undefined)
    {
        func.call();
    }
    $('#confirm_modal').modal();
}
function showModal(opt)
{
    modal(opt.html,opt.w,opt.t,opt.f,opt.b);
}
function modal(htm,w,t,f,b,nf)
{
    var big ='';
	if(b==true) {
		big = ' fluid-modal white-bg ';
	}
    if(w!=undefined && w!=null)
        w='style="width:'+w+'px"';
    else
        w='';
    if(t==undefined || t==null)
        t='';
    var html='<div id="modal" class="modal'+big+' hide fade" '+w+' tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
        '<div class="modal-header">'+
        '    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
        '    <h3 id="myModalLabel">'+t+'</h3>'+
        '</div>'+
        '<div class="modal-body">'+htm;
        if(nf==true)
        {
            var footer='</div>'+
            '<div class="modal-footer">'+
            '    <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'+
            '</div>'+
            '</div>';
            html=html+footer;
        }

    $("#modal").remove();
    $("body").append(html);
    $('#modal div>label').parent().addClass('label_div');

    if(big=='')
    {
        $('#modal').on('show', function(){
            var w=$("#modal").width();
            $("#modal").css("margin-left",(-w/2)+"px");
        });
    }
    $('#modal').modal('show');
    if(f!=null && f!=undefined)
    {
        f.call();
    }
}
function modalUrl(url,w,t,f)
{
    $.get(url, function(html){
        modal(html,w,t,f);
    });
}
function modalBig(url,w,t,f,b)
{
    $.get(url, function(html){
        modal(html,w,t,f,b);
    });
}
function modalIframe(url,w,t,f,b,geriyok)
{
    var str =window.location.href;
    var baseUrl= str.replace(window.location.pathname,'')+url;
    var btn='<input id="btn_history_geri" class="btn btn-success gecmisgeri" type="button" value="Back" onClick="modalIframeBack(\''+baseUrl+'\')">';
    if(geriyok!=null && geriyok!=undefined)
    {
        btn="";
    }

    var iframe=btn+'<iframe id="modalIframeId" scrolling="true" src="'+url+'" frameborder="0"></iframe>';
    modal(iframe,w,t,f,b,true);
}
function closeModal()
{
    $('#confirm_modal').modal('hide');
    $('#alert_modal').modal('hide');
    $('#modal').modal('hide');
}

function download(url)
{
    var str='<iframe src="'+url+'" width="0" height="0" style="display:none"></iframe>';
    $('body').append(str);
}

jQuery.fn.delay = function(time,func){
		return this.each(function(){
			setTimeout(func,time);
		});
	};


	jQuery.fn.countDown = function(settings,to) {
		settings = jQuery.extend({
			startFontSize: '12px',
			endFontSize: '12px',
			duration: 1000,
			startNumber: 10,
			endNumber: 0,
            noText:false,
			callBack: function() { }
		}, settings);
		return this.each(function() {

			if(!to && to != settings.endNumber) { to = settings.startNumber; }

            var num=to - 1;
            var saat=Math.floor(num/60/60);
            var dak=Math.floor(num/60);
            var sn=num-(dak*60);
            var sec=dil=='tr'?'sn.':'sec.';
            var min=dil=='tr'?'dak.':'min.'
            var hour=dil=='tr'?'saat.':'hours.'
            if(saat==1)
                hour=dil=='tr'?'saat.':'hour.'

            if(settings.noText)
            {
                sec='';min='';
            }
            var text='0 '+sec;
            if(saat>0)
            {   dak=dak%60;
                text=saat+' ' +hour +' '+dak+" "+min;
                if(sn>0)
                {
                    text+=" "+sn+" "+sec;
                }
            }
            else if(dak>0)
            {
                text=dak+" "+min;
                if(sn>0)
                {
                    text+=" "+sn+" "+sec;
                }
            }
            else if(sn>0)
            {
                text=sn+" "+sec;
            }

			//set the countdown to the starting number
			$(this).text(text).css('fontSize',settings.startFontSize);

			//loopage
			$(this).animate({
				'fontSize': settings.endFontSize
			},settings.duration,'',function() {
				if(to > settings.endNumber + 1)
                {
                    var count=$(this).data('count');
                    if(count)
                        count++;
                    else
                        count=1;
                    $(this).data('count',count);
					$(this).css('fontSize',settings.startFontSize).text(text).countDown(settings,to - 1);
				}
				else
				{
					settings.callBack(this);
				}
			});

		});
	};

function startSessionCountdown(sn)
{
    $("#session_countdown .timer").data('count',0);
    if(!$("#session_countdown .timer").data('sure'))
        $("#session_countdown .timer").data('sure',sn);

    $("#session_countdown .timer").stop(true);
    $("#session_countdown .timer").countDown({
        startNumber: sn,
        callBack: function() {
            clearInterval(_session_interval);
            closeModal();
            modalIframe("/auth/logout/popup/1");
        }
    });
}

function startSessionCheck() {
    if($("#session_countdown").length>0)
    {
        _session_interval=setInterval(function(){
            checkSession();
        },60000);
    }
}

function checkSession()
{
    $.ajax({
        url:'/auth/checksession',
        dataType:'json',
        success:function(res){
            if(typeof res!='undefined')
            {
                if(res.err==999)
                {
                    clearInterval(_session_interval);
                    closeModal();
                    $("#session_countdown .timer").stop(true);
                    modalIframe("/auth/logout/ic/1/popup/1");
                }
                else if(res.err==99)
                {
                    clearInterval(_session_interval);
                    closeModal();
                    $("#session_countdown .timer").stop(true);
                    modalIframe("/auth/logout/sc/1/popup/1");
                }
                else if(res.err==1)
                {
                    clearInterval(_session_interval);
                    closeModal();
                    $("#session_countdown .timer").stop(true);
                    modalIframe("/auth/logout/popup/1");
                }
                else if(res.obj)
                {
                    var count=$("#session_countdown .timer").data('count');
                    if(parseInt(res.obj)<parseInt(count))
                    {
                        startSessionCountdown($("#session_countdown .timer").data('sure')-parseInt(res.obj));
                    }
                }
            }
            else
            {
                clearInterval(_session_interval);
            }
        },
        error:function(res){
            clearInterval(_session_interval);
            $("#session_countdown .timer").stop(true);
        }
    });
}
(function( $ ){

    var methods = {
        init : function( settings ) {
            var config={
                "yazi":"...",
                "removeClass":"",
                "addClass":"",
                "value":""
            };
            if (settings)
            {
                $.extend(config, settings);
                if($(this).val()=="")
                {
                    $(this).val(config.yazi);
                    $(this).addClass(config.addClass);
                }
            }
            $(this).data('yazi', config.yazi);
            $(this).bind("focus",function(){
                if($(this).val()==config.yazi)
                {
                    if(config.removeClass)
                        $(this).removeClass(config.removeClass);
                    $(this).val("");
                }
            });
            $(this).bind("blur",function(){
                if($(this).val()=="")
                {
                    config.value="";
                    $(this).val(config.yazi);
                }
                else
                {
                    config.value=$(this).val();
                }
            });
        },
        value : function() {
            var val=$(this).val();
            if(val==$(this).data('yazi'))
            {
                val="";
            }
            return val;
        }
    };

    $.fn.aciklama = function(method){

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
    }

    };
})( jQuery );

(function($) {
    $.fn.caret = function(pos) {
        var target = this[0];
        var isContentEditable = target && target.contentEditable === 'true';
        if (arguments.length == 0) {
            //get
            if (target) {
                //HTML5
                if (window.getSelection) {
                    //contenteditable
                    if (isContentEditable) {
                        target.focus();
                        var range1 = window.getSelection().getRangeAt(0),
                            range2 = range1.cloneRange();
                        range2.selectNodeContents(target);
                        range2.setEnd(range1.endContainer, range1.endOffset);
                        return range2.toString().length;
                    }
                    //textarea
                    return target.selectionStart;
                }
                //IE<9
                if (document.selection) {
                    target.focus();
                    //contenteditable
                    if (isContentEditable) {
                        var range1 = document.selection.createRange(),
                            range2 = document.body.createTextRange();
                        range2.moveToElementText(target);
                        range2.setEndPoint('EndToEnd', range1);
                        return range2.text.length;
                    }
                    //textarea
                    var pos = 0,
                        range = target.createTextRange(),
                        range2 = document.selection.createRange().duplicate(),
                        bookmark = range2.getBookmark();
                    range.moveToBookmark(bookmark);
                    while (range.moveStart('character', -1) !== 0) pos++;
                    return pos;
                }
                // Addition for jsdom support
                if (target.selectionStart)
                    return target.selectionStart;
            }
            //not supported
            return;
        }
        //set
        if (target) {
            if (pos == -1)
                pos = this[isContentEditable? 'text' : 'val']().length;
            //HTML5
            if (window.getSelection) {
                //contenteditable
                if (isContentEditable) {
                    target.focus();
                    window.getSelection().collapse(target.firstChild, pos);
                }
                //textarea
                else
                    target.setSelectionRange(pos, pos);
            }
            //IE<9
            else if (document.body.createTextRange) {
                if (isContentEditable) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(target);
                    range.moveStart('character', pos);
                    range.collapse(true);
                    range.select();
                } else {
                    var range = target.createTextRange();
                    range.move('character', pos);
                    range.select();
                }
            }
            if (!isContentEditable)
                target.focus();
        }
        return this;
    }
})(jQuery);
(function( $ ){
    function keyToUpper(k) {
        var tr=["i","ı","ç","ö","ş","ü"];
        var en=["İ","I","Ç","Ö","Ş","Ü"];
        var i=tr.indexOf(k);
        if(i>-1)
        {
            k=en[i];
        }
        else
        {
            k=k.toUpperCase();
        }
        return k;
    }
    function toUpper(input)
    {
        var str=$(input).val();
        var arr=str.split('');
        var tr=[];
        for(i=0;i<arr.length;i++)
        {
            tr[i]=keyToUpper(arr[i]);
        }
        $(input).val(tr.join(''));
    }
    var methods = {
        init : function( settings ) {
            $("#text").keydown(function(e){

                var pass=[37,39,13,8];
                if(pass.indexOf(e.which)>-1)
                {
                    return true;
                }
                var input=this;
                setTimeout(function() {
                    var p=$(input).caret();
                    toUpper(input);
                    $(input).caret(p);
                }, 0)
            });
        }

    };

    $.fn.toUpper = function(method){

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
        }

    };
})( jQuery );

function datatableButton($grid)
{
    if($grid.find(".buton").length==0)
    {
        $grid.find("th.btns").hide();
    }
    else if($grid.find(".buton").length>1)
    {
        $grid.find("th.btns").show();
        $grid.find("th.btns").css("min-width","45px");
    }
	$grid.find("input.buton").each(function(){
  		$(this).attr("data-content",$(this).val())
      	$(this).attr("data-placement","top");
      	$(this).attr("data-toggle","popover");

    });
    $grid.find("a.buton").each(function(){
        $(this).attr("data-content",$(this).attr("title"))
        $(this).attr("data-placement","top");
        $(this).attr("data-toggle","popover");

    });
    var buton_replace = {'View':'detay',
    					'Financial Info':'detay',
    					'Detail':'detay',
    					'Edit':'duzenle',
    					'Edit':'duzenle',
    					'Quota Status':'kota-durum',
    					'Students who will take the course':'ders-alacak',
    					'Simulation':'simulasyon',
    					'Delete':'sil',
    					'Mentee Sil':'sil',
                        'Programı Sil':'sil',
                        'Detay Sil':'sil',
                        'REJECT':'sil',
                        'Cancel':'sil',
    					'Course Content':'ders-icerik',
                                        'Slots':'danisman-slotlar',
                                        'Transcript':'danisman-transkript',
                                        'Devam Bilgisi':'danisman-devam-bilgi',
                                        'Course Program':'danisman-ders-program',
    					'Syllabus':'ders-icerik',
    					'Absence':'devamsizlik',
    					'Courses':'ders-icerik',
    					'Kampus Bilgi':'kota-durum',
    					'Students':'ders-alacak',
    					'Referans Al':'ders-alacak',
                                        'Bağlı Görüşme Ekle':'ders-alacak',
    					'Add':'devamsizlik',
    					'Aktar':'simulasyon',
    					'Birleştir':'onayla',
    					'Ayır':'sil',
    					'Form':'danisman-transkript',
    					'Documents':'ders-icerik',
    					'Ders Onay Formu':'ders-icerik',
                                        'Stok Giriş':'stok-giris',
                                        'Stok Çıkış':'stok-cikis',
                                    'Onaya Gönder':'onay-gonder',
                                'Mezuniyet İlişki Kesme Formu':'mezun-iliski',
                            'Dismiss Form':'ilisik-form',
                        'Bağlı Görüşme Listesi':'bagli-gorusme',
                        'Takvim İncele':'danisman-ders-program',
                        'Not Onay':'onay-gonder',
                        'Öğrenci ekle':'stok-giris',
                        'Grup Hatırlat':'bagli-gorusme',
                    'İlanı Onayla':'ilan-onay',
                    'Approve':'ilan-onay',
                'İlanı Pasif Et':'ilan-sil',
            'Termination Process':'iliski-surec',

        'Dgr For.':'danisman-ders-program',
        'Firma Dgr For.':'iliski-surec',

        'Yükümlülük Belgesi':'kota-durum',
        'Kabul Belgesi':'onay-gonder',

        'Download the document':'belge-indir'};
    $.each(buton_replace,function(i,v) {
          $grid.find("input[value='"+i+"']").each(function(){
            $(this).attr("class","buton "+v);
            $(this).attr("data-container","html");
          });

        $grid.find("a[title='"+i+"']").each(function(){
            $(this).attr("class","buton "+v);
            $(this).attr("data-container","html");
        });
    });
    $grid.find("tbody input:button").each(function(){
           if($(this).attr("data-container")!='html')
           {
               $(this).attr("class","buton detay");
               $(this).attr("data-container","html");
           }
    });

    $grid.find("tbody a.buton").each(function(){
        if($(this).attr("data-container")!='html')
        {
            $(this).attr("class","buton detay");
            $(this).attr("data-container","html");
        }
    });
    $('.datatable tbody input').popover();

    if($grid.find(".datatable tbody tr td:has(input.buton)").length || $grid.find(".datatable tbody tr td:has(a.buton)").length)
    {
        $.each($grid.find(".datatable tbody tr"), function(){
            var t=$(this).find("td:last").detach();
            $(this).find('td:eq(0)').before(t);
        });
    }
}
function datatableFitCells($grid)
{
    return;
    var w=$($grid).width();
    var hidden=0;
    var c=0;
    while(true)
    {
        var hide=false;
        $.each($grid.find("table tbody tr"), function(i,tr){
            if(i>0)
            {
                if($(tr).find("td:visible").length==2)
                    return;
                var l=$(tr).find("td:visible").text().length;
                var o=w/l;
                if(o<8)
                {
                    hide=true;
                    hidden++;
                    return;
                }
            }
        });
        c++;
        if(hide==false)
            break;
        if(hide)
        {
            $grid.find("table tbody tr").find("td:visible:last").hide().addClass("hide");
            $grid.find("table thead tr").find("th:visible:last").hide().addClass("hide");
        }
    }

    if(hidden>0)
    {
        var col=[];
        $.each($grid.find("table thead tr th.hide"), function (j,th) {
            col[j]=$(th).text();
        });
        $.each($grid.find("table tbody tr"), function (i,tr) {
            var child='<tr class="child"><td colspan="100"><ul>';
            $.each($(tr).find("td.hide"), function (j,td) {
                child+="<li><b>"+col[j]+":</b> "+$(td).html()+"</li>";
            });
            child+="</ul></td></tr>";
            $(tr).after(child);
        });
    }

}
(function( $ ){
    var config={};
    var methods = {
        init : function( settings ) {
            config={
                url:"",
                titles:[],
                columns:[],
                buttons:[],
                button:'',
                data:{},
                loading:'.loading',
                click:'',
                id:'',
                sort:'',
                order:'asc',
                hiddens:[],
                checkbox:'',
                bold:''
            };
            if (settings)
            {
                $.extend(config, settings);
            }
            if(config.data==null || config.data==undefined)
            	config.data={};

            var $this=$(this);
            var html='<table class="table table-striped table-bordered table-icon datatable">'+
            '    <thead class="gray-back"></thead>'+
            '    <tbody></tbody>'+
            '    <tfoot></tfoot>'+
            '</table>';
            var pager='<div class="new-pager gray-back text-center">'+
            '<div class="loading"><i class="icon-sign-blank icon-spin icon-3x"></i><b>Loading</b></div>'+
            '        <div class="margin-center">'+
            '        <a><i class="icon-step-backward"></i></a> <a><i class="icon-caret-left"></i></a>'+
            '        <input type="text" class="span1 current_page">/ <a class="total_page"></a> &nbsp;&nbsp;'+
            '        <a><i class="icon-caret-right"></i></a> <a><i class="icon-step-forward"></i></a>'+
            '        <select class="span1 page_size">'+
            '                <option value="20">20</option>'+
            '                <option value="50">50</option>'+
            '                <option value="100">100</option>'+
            '        </select> / <a class="total_row"></a>'+
            '        </div>'+
            '       <div class="table-foot-icon">'+
            '            <a href="#" class="lnk-excel"><i class="icon-file"></i> Excel</a>'+
            '            <a href="#" class="lnk-print"><i class="icon-print"></i> Print</a>'+
            '        </div>'+
            '</div>'
            $(this).html(html);
            var tr=$('<tr>');
            var cs=0;
            //if(config.button!='' && config.button!='0')
            {
                tr.append('<th class="btns"></th>');
                cs++;
            }
            if(config.checkbox)
            {
                tr.append('<th class="chk"></th>');
                cs++;
            }
            $.each(config.titles, function(i,t){
                if($.inArray(config.columns[i], config.hiddens)===-1)
                {
                    var th=$('<th>').addClass(config.columns[i]).html(t);
                    var ou=$('<i>').addClass('icon-chevron-up order_up');
                    th.append(ou);
                    var od=$('<i>').addClass('icon-chevron-down order_down');
                    th.append(od);
                    th.click(function(){
                        $this.find('th i').hide();
                        var config=$this.data('config');
                        if(config.data.sidx===$(this).attr('class'))
                        {
                            if(config.data.sord==='asc')
                            {
                                config.data.sord='desc';
                                $(this).find('.order_up').show();
                            }
                            else
                            {
                                config.data.sord='asc';
                                $(this).find('.order_down').show();
                            }
                        }
                        else
                        {
                            config.data.sord='asc';
                            config.data.sidx=$(this).attr('class');
                            $(this).find('.order_down').show();
                        }
                        $this.datatable('load');
                    });
                    tr.append(th);
                    cs++;
                }
            });

            $(this).find('thead').append(tr);
            $(this).find('th.'+config.sort+' .order_down').show();
            var tr=$('<tr>');
            var td=$('<td>').attr("colspan", cs).html(pager);
            tr.append(td);
            $(this).find('tfoot').append(tr);
            var limit=$.cookie('data-limit');
            if(limit)
            {
                config.data._limit=limit;
                $(this).find(".page_size").val(limit);
            }

            $(this).find('.icon-caret-left').click(function(){
                var config=$this.data('config');
                var res=config.result;
                if(res.page>1)
                {
                    config.data.page=parseInt(res.page)-1;
                    $this.datatable('load');
                }
            });
            $(this).find('.icon-caret-right').click(function(){
                var config=$this.data('config');
                var res=config.result;
                if(res.page<res.total)
                {
                    config.data.page=parseInt(res.page)+1;
                    $this.datatable('load');
                }
            });
            $(this).find('.icon-step-backward').click(function(){
                var config=$this.data('config');
                var res=config.result;
                if(res.page>1)
                {
                    config.data.page=1;
                    $this.datatable('load');
                }
            });
            $(this).find('.icon-step-forward').click(function(){
                var config=$this.data('config');
                var res=config.result;
                if(res.page<res.total)
                {
                    config.data.page=res.total;
                    $this.datatable('load');
                }
            });
            $(this).find(".current_page").keyup(function(e){
                var config=$this.data('config');
                var code = e.which; // recommended to use e.which, it's normalized across browsers
                if(code==13)e.preventDefault();
                if(code==32||code==13||code==188||code==186){
                    var res=config.result;
                    var p=$(this).val();
                    if(isNaN(p))
                    {
                        $(this).val(1);
                        p=1;
                    }
                    else
                    {
                        p=parseInt(p);
                        if(p<1 || p>res.total)
                        {
                            p=1;
                            $(this).val(1);
                        }
                    }
                    config.data.page=p;
                    $this.datatable('load');
                }
            });
            $(this).find(".page_size").change(function(){
                var config=$this.data('config');
                config.data._limit=$(this).val();
                $.cookie('data-limit', config.data._limit, { expires: 10000, path: '/' });
                $this.datatable('load');
            });
            $(this).find(".lnk-print").click(function(){
                var config=$this.data('config');
                if(config.result.obj)
                {
                    $.ajax({
                        url:'/index/yazdir',
                        type:'post',
                        data:{
                            obj:config.result.obj,
                            columns:config.columns,
                            titles:config.titles
                        },
                        success:function(res){
                            popUp('/index/yazdir');
                        }
                    });
                }
            });

            $(this).find(".lnk-excel").click(function(){
                var config=$this.data('config');
                if(config.result.obj)
                {
                    $.ajax({
                        url:'/index/excel',
                        type:'post',
                        data:{
                            obj:config.result.obj,
                            columns:config.columns,
                            titles:config.titles
                        },
                        success:function(res){
                            if(res=='1')
                                location.href='/index/excel';
                        }
                    });
                }
            });
            if(config.sort)
            {
                config.data.sidx=config.sort;
                if(!config.order)
                    config.order='asc';
                config.data.sord=config.order;
            }
            $(this).data('config', config);
            $(this).datatable('load');
        },
        load : function() {
        	$('.datatable tbody input').popover('hide');
            var $this=$(this);
            var config=$this.data('config');

            try{
                $this.find(config.loading).show();
            }catch(err){
                return;
            }

            $.ajax({
                url:config.url,
                type:'POST',
                dataType:'json',
                data:config.data,
                success:function(res){
                    $this.find('tbody tr').remove();
                    config.result=res;
                    $this.data('config',config);
                    if(config.bold){
                        var bold = config.bold.split(':');
                    }
                    $(".lnk-excel,.lnk-print").hide();
                    if(res.obj!=undefined)
                    {
                        $(".lnk-excel,.lnk-print").show();
                    }
                    if(res.records>0)
                    {
                        $.each(res.rows, function(i,r){
                           var row=$('<tr>');
                           row.data('id',r.id);
                           var arr={};
                           if(config.checkbox)
                           {
                               var chk=$('<input>').attr('type','checkbox').addClass('chk');
                               var td=$('<td>').addClass('chk').append(chk);
                               row.append(td);
                           }
                          if(config.bold){
                           $.each(r.cell, function(j,c){

                               if(config.columns[j]== bold[1]  && bold[0]==c)
                               {
                               row.addClass('text-bold');
                               }

                           });
                           }

                            $.each(r.cell, function(j,c){
                                arr[config.columns[j]]=c;
                            });
                           $.each(r.cell, function(j,c){
                               if($.inArray(config.columns[j], config.hiddens)===-1)
                               {
                                   var cclass='';
                                   var csetvalue='';
                                   var cf='';
                                   if(c!=undefined)
                                   {
                                        if(config.callback)
                                        {
                                            var f=window[config.callback];
                                            cf=f.call(this,arr,config.columns[j]);
                                            if(config.callback=='renklendir'){
                                             cclass=cf;
                                            }
                                            if(config.callback=='setCellValue'){
                                             csetvalue=cf;
                                            }
                                        }
                                    }
                                   var td=$('<td>').html(c);
                                   if(csetvalue!=''){
                                   var td=$('<td>').html(csetvalue);
                                   }
                                   if(td.find('.buton').length===0){
                                       td.addClass('cell');
                                       if(cclass){
                                         td.addClass(cclass);
                                       }
                                   }

                                    row.append(td);
                               }

                               /*if(config.columns[j]===config.id)
                                {

                                }*/
                                arr[config.columns[j]]=c;
                           });
                           if(config.buttons.length>0)
                           {
                               var td=$('<td>');
                                $.each(config.buttons, function(bt, bf){
                                    td.append($('<input>').attr('type','button').addClass('btn btn-info').val(bt));
                                });
                                row.append(td);
                           }

                           r.data=arr;
                           row.data('data',r);
                           $this.find('tbody').append(row);
                        });
                    }
                    $this.find('.total_row').text(res.records);
                    $this.find('.total_page').text(res.total);
                    $this.find('.current_page').val(res.page);
                    $this.find(config.loading).hide();
                    if(config.click)
                    {
                        $this.find('tbody td.cell').unbind();
                        $this.find('tbody td.cell').click(function(){
                            var f=window[config.click];
                            f.call(this,$(this).parent().data('id'));
                        });
                    }
                    datatableButton($this);
                    datatableFitCells($this);
                }
            });
        },
        setdata : function(data) {
            var $this=$(this);
            var config=$this.data('config');
            $.each(data, function(k,v){
                config.data[k]=v;
            });
            $this.data('config',config);
        }
        ,getrowdata : function(id) {
            var $this=$(this);
            var data=null;
            $.each($this.find('tr'), function(i,r){
                var d=$(r).data('data');
                if(d!=undefined && d.id != undefined && d.id===id)
                {
                    data=d.data;
                    return;
                }
            });
            return data;
        },
        getchecked : function() {
            var $this=$(this);
            var data=[];
            $.each($this.find('input.chk:checked'), function(){
                var r=$(this).parent().parent();
                var d=$(r).data('data');
                data.push(d.id);
            });
            return data;
        }
    };

    $.fn.datatable = function(method){

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist' );
        }

    };
})( jQuery );

(function( $ ){
    var methods = {
        init : function( settings ) {
            var config={
                "url":"",
                "field":"",
                "par":{},
                "data":[]
            };
            if (settings)
                $.extend(config, settings);
            if(config.field=="")
                config.field=$(this).attr('field');
            config.id=$(this).attr('id');
            if(config.data.length>0)
            {
                var fill=config.id;
                $("#"+fill+" .options .available li").remove();
                var field=config.field;
                $.each(config.data, function(i,val){
                    var cl='';
                    if($("#"+fill+" .options .selected #"+field+"-"+val.oV).length>0)
                    {
                        cl=' class="plus"';
                    }
                    var li='<li'+cl+'><a id="'+field+'-'+val.oV+'" title="'+val.oT+'">'+val.oV+'</a>'+val.oT+'</li>';
                    $("#"+fill+" .options .available").append(li);
                });
            }
            else
            {
                $.ajax({
                    url:config.url,
                    type:'POST',
                    data:config.par,
                    dataType:'json',
                    success:function(res)
                    {
                        var fill=config.id;
                        $("#"+fill+" .options .available li").remove();
                        var field=config.field;
                        $.each(res, function(i,val){
                            var cl='';
                            if($("#"+fill+" .options .selected #"+field+"-"+val.oV).length>0)
                            {
                                cl=' class="plus"';
                            }
                            var li='<li'+cl+'><a id="'+field+'-'+val.oV+'" title="'+val.oT+'">'+val.oV+'</a>'+val.oT+'</li>';
                            $("#"+fill+" .options .available").append(li);
                        });
                    }
                });
            }
            return this;
        }
    };
    $.fn.myCombo = function(method){

        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
    }

    };

})( jQuery );
function setDatepicker()
{
    $(".date").datepicker({format:'yyyy-mm-dd',weekStart:1, autoclose:true, language:dil,todayHighlight:true, todayBtn:'linked',clearBtn:true});
    $(".date").attr("readonly","readonly").attr("autocomplete","off");
}

function setTimepicker()
{
    $('.time').timepicker({ 'step': 5, 'timeFormat': 'H:i','minTime':'08:00' });
    $(".time").attr("autocomplete","off");
}

function setDatetimepicker()
{
    $(".datetime").datetimepicker({format:'yyyy-mm-dd hh:ii', todayBtn:'linked', language:dil, autoclose:true});
    $(".datetime").attr("readonly","readonly").attr("autocomplete","off");
}
function loading()
{
    $.blockUI({ message: '<h1><img src="/images/loader.gif" /><br>Operation is being processed...</h1>' });
}
function closeLoading()
{
    $.unblockUI();
}
function sagMenuKaldir()
{
	$(".right-sidr-fixed").remove();
	$(".span10.new-span10").css("width","100%").removeClass("new-span10");
}
function uygulamaAra()
{
    var key=$("#uygulama_ara").val();
    if(key.trim()!="")
    {
        $("#alt_key").text(key);
        $("#uygulama_ara_sonuc li").remove();
        $.ajax({
            url:"/arama/ara",
            type:"POST",
            dataType:"json",
            data:{key:key},
            success:function(res){
                if(res.err==0)
                {
                	uygulamaAraListele(res,key);
                }
            }
        });
    }
}
function uygulamaAraListele(res, key)
{
	$("#uygulama_ara_sonuc").html('');
	var sonuc=false;
	if(typeof res.obj !='undefined')
    {

        $.each(res.obj, function(i, r){
            var li='';
            var islem='';
            if(r.islem)
            {
                islem='';
                $.each(r.islem, function(j, l){
                    islem+='<input class="buton '+j+'" title="'+l.baslik+'" target="_blank"  onclick="location.href=\''+l.link+'\'" type="button">';
                });
            }
            if(r.menu) {
                li='<li><span class="finans">'+r.baslik+'</span></li>';
            } else{
                li='<li><a href="'+r.url+'">'+r.baslik+'</a>'+islem+'</li>';
            }
            $("#uygulama_ara_sonuc").append(li);
            sonuc=true;
        });
    }


   	if(!sonuc)
    {
        $("#uygulama_ara_sonuc").append('<li><a class="akademik">Kayıt bulunamadı!</a></li>');
    }
    $("#uygulama_ara_sonuc").show();
}

function serializeToJson(serializer){
    var _string = '{';
    for(var ix in serializer)
    {
        var row = serializer[ix];
        _string += '"' + row.name + '":"' + row.value + '",';
    }
    var end =_string.length - 1;
    _string = _string.substr(0, end);
    _string += '}';
    return JSON.parse(_string);
}

function modalIframeBack(url)
{
    var konum=document.getElementById('modalIframeId').contentWindow.location.href
    if(url!=konum)
    {
        history.back();
    }
}

function modalIframeForward(url)
{
     history.forward();
}

function editTranslation(key) {
    $.ajax({
        url:'/sistem/ceviri/get/key/'+key,
        dataType:'json',
        success:function (res) {
            var html='<div id="trans_'+key+'"><b>İngilizce</b><input type="text" class="trans_en" value="'+res.obj.en+'"/><br><br><b>Türkçe</b><input type="text" class="trans_tr" value="'+res.obj.tr+'"/><br><button class="btn btn-success" type="button" onclick="saveTranslation(\''+key+'\')">Kaydet</button></div>';
            modal(html,500,res.obj.label);
        }
    });
}
function saveTranslation(key) {
    var en=$("#trans_"+key+" .trans_en").val();
    var tr=$("#trans_"+key+" .trans_tr").val();
    $.ajax({
        url:'/sistem/ceviri/set/key/'+key,
        dataType:'json',
        type:'post',
        data:{en:en, tr:tr},
        success:function (res) {
            closeModal();
        }
    });
}

function replaceTurkce(t)
{
    t=t.replace(/Ç/g,'C');
    t=t.replace(/ç/g,'c');
    t=t.replace(/İ/g,'I');
    t=t.replace(/ı/g,'i');
    t=t.replace(/Ğ/g,'G');
    t=t.replace(/ğ/g,'g');
    t=t.replace(/Ö/g,'O');
    t=t.replace(/ö/g,'o');
    t=t.replace(/Ü/g,'U');
    t=t.replace(/ü/g,'u');
    t=t.replace(/Ş/g,'S');
    t=t.replace(/ş/g,'s');

    return t;
}

function sortSelect(select) {
    $.each($(select), function () {
        var opts=$(this).find('option');
        var title=opts.splice(0,1);
        opts.sort(function(a, b) {
            var at = replaceTurkce($(a).text()),
                bt = replaceTurkce($(b).text());

            return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
        });
        opts=$.merge(title,opts);
        $(this).find('option').remove();
        $(this).append(opts);
        if($(this).find("option").length>0)
            $(this).find("option")[0].selected=true;
    });
}

var transTimeoutID=0;
$(document).ready(function()
{
    setDatepicker();
    setDatetimepicker();
    setTimepicker();

    $('#form div>label').parent().addClass('label_div');
    $('.zend_form div>label').parent().addClass('label_div');
    $("label.required").append(" *");
    $("select[multiple=true]").attr("size",5);
    $("input[type=hidden]").parent(".element").hide();
    $("input[type!=hidden]").parent(".element").show();
    $(".eklecikar").show();


    $.each($("[data-translate-key]"), function () {
       var lbl=$(this).parent().prev().find("label");var key=$(this).data("translate-key");
       if(lbl)
       {
            $(lbl).addClass("inline_translate").data("key", key);
       }
    });
    $("trans,.inline_translate").mouseover(function () {
        if(transTimeoutID>0)
            clearTimeout(transTimeoutID);
        var key=$(this).data("key");

        if(key)
        {
            transTimeoutID=setTimeout(function () {
                editTranslation(key);
            },2000);
        }

    });
    $("trans,.inline_translate").mouseout(function () {
        clearTimeout(transTimeoutID);
    });
    $.each($("input,button"), function () {
        var val=$(this).val();
        if(val!=undefined && val.search("<trans")>-1)
        {
            var regex = /(<([^>]+)>)/ig;
            val=val.replace(regex,"");
            $(this).val(val);
        }
        var place=$(this).attr("placeholder");
        if(place!=undefined && place.search("<trans")>-1)
        {
            var regex = /(<([^>]+)>)/ig;
            place=place.replace(regex,"");
            $(this).attr("placeholder",place);
        }
    });

    $.each($("button"), function () {
        var val=$(this).text();
        if(val!=undefined && val.search("<trans")>-1)
        {
            var regex = /(<([^>]+)>)/ig;
            val=val.replace(regex,"");
            $(this).text(val);
        }
    });

    $.each($("label:contains('<trans')"), function () {
        var val=$(this).html();
        val=val.replace(/&lt;/g,'<');
        val=val.replace(/&gt;/g,'>');
        if(val!=undefined && val.search("<trans")>-1)
        {
            var regex = /(<([^>]+)>)/ig;
            val=val.replace(regex,"");
            $(this).html(val);
        }
    });

    $.each($("option:contains('<trans')"), function () {
        var val=$(this).html();
        val=val.replace(/&lt;/g,'<');
        val=val.replace(/&gt;/g,'>');
        if(val!=undefined && val.search("<trans")>-1)
        {
            var regex = /(<([^>]+)>)/ig;
            val=val.replace(regex,"");
            $(this).html(val);
            $(this).attr("label","");
        }
    });

    try
    {
        if(!$("#sezon").val() && GUNCEL_SEZON!=undefined)
        {
            $("#sezon").val(GUNCEL_SEZON);
        }
        if(!$("#donem").val() && GUNCEL_DONEM!=undefined)
        {
            $("#donem").val(GUNCEL_DONEM);
        }
    }
    catch(err)
    {

    }


    //boş divleri sil
    $("div").each(function(){
        if($(this).html()=="&nbsp;" )
        {
            $(this).remove();
        }
    });

    startSessionCheck();

    //$("input[type=text],select,textarea").parent(".element").css("clear","both");
    $("input[type=text],select,textarea").focusin(function(){
        $(this).parent(".element").prev().css("color","#d00");
    });
    $("input[type=text],select,textarea").focusout(function(){
        $(this).parent(".element").prev().css("color","inherit");
    });
    $("input[type=text],select,textarea").mouseover(function(){
        $(this).parent(".element").prev().css("color","#d00");
    });
    $("input[type=text],select,textarea").mouseout(function(){
        $(this).parent(".element").prev().css("color","inherit");
    });
    if($("a[class*='solmenu']").length===0)
    {
        $(".right-sidr-fixed").remove();
        $(".main").parent().css("width","100% !important");
    }

    $('#right-menu').sidr({
        name: 'sidr-right',
        side: 'right'
    });

    sag_menu_acik=0;
    $("#right-menu").on('click',function(){
        if(sag_menu_acik==0)
        {
            Cookies.set('right_menu','1',{expires:300});
            sag_menu_acik=1;
        }
        else
        {
            Cookies.remove('right_menu');
            sag_menu_acik=0;
        }
    });

    $(".right-menu-link #right-menu").click(function(){
        $("body").addClass("static");
    });

    if(Cookies.get('right_menu')=='1')
    {
        $("#right-menu").click();
    }

    $('#uygulama_ara').bind("enterKey",function(e){
    	uygulamaAra();
    });
    $('#uygulama_ara').keyup(function(e){
    	    if(e.keyCode == 13)
    	    {
    	        $(this).trigger("enterKey");
    	    }
    });

    try
    {
    $("input.phonenumber").inputmask("999-999-99-99");
    $("input.email").inputmask({alias:'email'});
    //$("input.puan").inputmask({mask:"9{1,3}.9{1,3}", greedy:false});
    $("input.int").inputmask({mask:"9{1,7}", greedy:false});
    $("input.tckn").inputmask({mask:"99999999999", greedy:false});
    }
    catch(e)
    {

    }
});

var waitingDialog = waitingDialog || (function ($) {
    'use strict';

    // Creating modal dialog's DOM
    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
        '<div class="modal-body">' +
        '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="bar" style="width: 100%"> </div></div>' +
        '</div>' +
        '</div></div></div>');

    return {
        /**
         * Opens our dialog
         * @param message Custom message
         * @param options Custom options:
         * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
         * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
         */
        show: function (message, options) {
            // Assigning defaults
            if (typeof options === 'undefined') {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }
            // Opening dialog
            $dialog.modal();
        },
        /**
         * Closes dialog
         */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);
