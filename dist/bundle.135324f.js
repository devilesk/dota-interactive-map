/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright (c) 2006-2015 by OpenLayers Contributors
  Published under the 2-clause BSD license.
  See https://raw.githubusercontent.com/openlayers/ol2/master/license.txt for the full text of the license, and https://raw.githubusercontent.com/openlayers/ol2/master/authors.txt for full list of contributors.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used, please see the
  OpenLayers Github repository: <https://github.com/openlayers/ol2>)

*/

/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 *
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 *
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */
var $jscomp={scope:{}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.fill",function(a){return a?a:function(a,c,d){var b=this.length||0;0>c&&(c=Math.max(0,b+c));if(null==d||d>b)d=b;d=Number(d);0>d&&(d=Math.max(0,b+d));for(c=Number(c||0);c<d;c++)this[c]=a;return this}},"es6-impl","es3");
var OpenLayers={VERSION_NUMBER:"Release 2.14 dev",singleFile:!0,_getScriptLocation:function(){for(var a=/(^|(.*?\/))(OpenLayers[^\/]*?\.js)(\?|$)/,b=document.getElementsByTagName("script"),c,d="",e=0,f=b.length;e<f;e++)if(c=b[e].getAttribute("src"))if(c=c.match(a)){d=c[1];break}return function(){return d}}(),ImgPath:""};OpenLayers.Class=function(){var a=arguments.length,b=arguments[0],c=arguments[a-1],d="function"==typeof c.initialize?c.initialize:function(){b.prototype.initialize.apply(this,arguments)};1<a?(a=[d,b].concat(Array.prototype.slice.call(arguments).slice(1,a-1),c),OpenLayers.inherit.apply(null,a)):d.prototype=c;return d};
OpenLayers.inherit=function(a,b){var c=function(){};c.prototype=b.prototype;a.prototype=new c;var d,e,c=2;for(d=arguments.length;c<d;c++)e=arguments[c],"function"===typeof e&&(e=e.prototype),OpenLayers.Util.extend(a.prototype,e)};OpenLayers.Util=OpenLayers.Util||{};OpenLayers.Util.extend=function(a,b){a=a||{};if(b){for(var c in b){var d=b[c];void 0!==d&&(a[c]=d)}"function"==typeof window.Event&&b instanceof window.Event||!b.hasOwnProperty||!b.hasOwnProperty("toString")||(a.toString=b.toString)}return a};OpenLayers.String={startsWith:function(a,b){return 0==a.indexOf(b)},contains:function(a,b){return-1!=a.indexOf(b)},trim:function(a){return a.replace(/^\s\s*/,"").replace(/\s\s*$/,"")},camelize:function(a){a=a.split("-");for(var b=a[0],c=1,d=a.length;c<d;c++)var e=a[c],b=b+(e.charAt(0).toUpperCase()+e.substring(1));return b},format:function(a,b,c){b||(b=window);return a.replace(OpenLayers.String.tokenRegEx,function(a,e){for(var d,g=e.split(/\.+/),h=0;h<g.length;h++){0==h&&(d=b);if(void 0===d)break;
d=d[g[h]]}"function"==typeof d&&(d=c?d.apply(null,c):d());return"undefined"==typeof d?"undefined":d})},tokenRegEx:/\$\{([\w.]+?)\}/g,numberRegEx:/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,isNumeric:function(a){return OpenLayers.String.numberRegEx.test(a)},numericIf:function(a,b){var c=a;!0===b&&null!=a&&a.replace&&(a=a.replace(/^\s*|\s*$/g,""));return OpenLayers.String.isNumeric(a)?parseFloat(a):c}};
OpenLayers.Number={decimalSeparator:".",thousandsSeparator:",",limitSigDigs:function(a,b){var c=0;0<b&&(c=parseFloat(a.toPrecision(b)));return c},format:function(a,b,c,d){b="undefined"!=typeof b?b:0;c="undefined"!=typeof c?c:OpenLayers.Number.thousandsSeparator;d="undefined"!=typeof d?d:OpenLayers.Number.decimalSeparator;null!=b&&(a=parseFloat(a.toFixed(b)));var e=a.toString().split(".");1==e.length&&null==b&&(b=0);a=e[0];if(c)for(var f=/(-?[0-9]+)([0-9]{3})/;f.test(a);)a=a.replace(f,"$1"+c+"$2");
0==b?b=a:(c=1<e.length?e[1]:"0",null!=b&&(c+=Array(b-c.length+1).join("0")),b=a+d+c);return b},zeroPad:function(a,b,c){for(a=a.toString(c||10);a.length<b;)a="0"+a;return a}};OpenLayers.Function={bind:function(a,b){var c=Array.prototype.slice.call(arguments,2);return function(){var d=c.concat(Array.prototype.slice.call(arguments,0));return a.apply(b,d)}},bindAsEventListener:function(a,b){return function(c){return a.call(b,c||window.event)}},False:function(){return!1},True:function(){return!0},Void:function(){}};
OpenLayers.Array={filter:function(a,b,c){var d=[];if(Array.prototype.filter)d=a.filter(b,c);else{var e=a.length;if("function"!=typeof b)throw new TypeError;for(var f=0;f<e;f++)if(f in a){var g=a[f];b.call(c,g,f,a)&&d.push(g)}}return d}};OpenLayers.Bounds=OpenLayers.Class({left:null,bottom:null,right:null,top:null,centerLonLat:null,initialize:function(a,b,c,d){OpenLayers.Util.isArray(a)&&(d=a[3],c=a[2],b=a[1],a=a[0]);null!=a&&(this.left=OpenLayers.Util.toFloat(a));null!=b&&(this.bottom=OpenLayers.Util.toFloat(b));null!=c&&(this.right=OpenLayers.Util.toFloat(c));null!=d&&(this.top=OpenLayers.Util.toFloat(d))},clone:function(){return new OpenLayers.Bounds(this.left,this.bottom,this.right,this.top)},equals:function(a){var b=!1;null!=
a&&(b=this.left==a.left&&this.right==a.right&&this.top==a.top&&this.bottom==a.bottom);return b},toString:function(){return[this.left,this.bottom,this.right,this.top].join()},toArray:function(a){return!0===a?[this.bottom,this.left,this.top,this.right]:[this.left,this.bottom,this.right,this.top]},toBBOX:function(a,b){null==a&&(a=6);var c=Math.pow(10,a),d=Math.round(this.left*c)/c,e=Math.round(this.bottom*c)/c,f=Math.round(this.right*c)/c,c=Math.round(this.top*c)/c;return!0===b?e+","+d+","+c+","+f:d+
","+e+","+f+","+c},toGeometry:function(){return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left,this.bottom),new OpenLayers.Geometry.Point(this.right,this.bottom),new OpenLayers.Geometry.Point(this.right,this.top),new OpenLayers.Geometry.Point(this.left,this.top)])])},getWidth:function(){return this.right-this.left},getHeight:function(){return this.top-this.bottom},getSize:function(){return new OpenLayers.Size(this.getWidth(),this.getHeight())},
getCenterPixel:function(){return new OpenLayers.Pixel((this.left+this.right)/2,(this.bottom+this.top)/2)},getCenterLonLat:function(){this.centerLonLat||(this.centerLonLat=new OpenLayers.LonLat((this.left+this.right)/2,(this.bottom+this.top)/2));return this.centerLonLat},scale:function(a,b){null==b&&(b=this.getCenterLonLat());var c,d;"OpenLayers.LonLat"==b.CLASS_NAME?(c=b.lon,d=b.lat):(c=b.x,d=b.y);return new OpenLayers.Bounds((this.left-c)*a+c,(this.bottom-d)*a+d,(this.right-c)*a+c,(this.top-d)*a+
d)},add:function(a,b){if(null==a||null==b)throw new TypeError("Bounds.add cannot receive null values");return new OpenLayers.Bounds(this.left+a,this.bottom+b,this.right+a,this.top+b)},extend:function(a){if(a)switch(a.CLASS_NAME){case "OpenLayers.LonLat":this.extendXY(a.lon,a.lat);break;case "OpenLayers.Geometry.Point":this.extendXY(a.x,a.y);break;case "OpenLayers.Bounds":this.centerLonLat=null;if(null==this.left||a.left<this.left)this.left=a.left;if(null==this.bottom||a.bottom<this.bottom)this.bottom=
a.bottom;if(null==this.right||a.right>this.right)this.right=a.right;if(null==this.top||a.top>this.top)this.top=a.top}},extendXY:function(a,b){this.centerLonLat=null;if(null==this.left||a<this.left)this.left=a;if(null==this.bottom||b<this.bottom)this.bottom=b;if(null==this.right||a>this.right)this.right=a;if(null==this.top||b>this.top)this.top=b},containsLonLat:function(a,b){"boolean"===typeof b&&(b={inclusive:b});b=b||{};var c=this.contains(a.lon,a.lat,b.inclusive),d=b.worldBounds;d&&!c&&(c=d.getWidth(),
c=this.containsLonLat({lon:a.lon-Math.round((a.lon-(d.left+d.right)/2)/c)*c,lat:a.lat},{inclusive:b.inclusive}));return c},containsPixel:function(a,b){return this.contains(a.x,a.y,b)},contains:function(a,b,c){null==c&&(c=!0);if(null==a||null==b)return!1;a=OpenLayers.Util.toFloat(a);b=OpenLayers.Util.toFloat(b);return c?a>=this.left&&a<=this.right&&b>=this.bottom&&b<=this.top:a>this.left&&a<this.right&&b>this.bottom&&b<this.top},intersectsBounds:function(a,b){"boolean"===typeof b&&(b={inclusive:b});
b=b||{};if(b.worldBounds){var c=this.wrapDateLine(b.worldBounds);a=a.wrapDateLine(b.worldBounds)}else c=this;null==b.inclusive&&(b.inclusive=!0);var d=!1,e=c.left==a.right||c.right==a.left||c.top==a.bottom||c.bottom==a.top;if(b.inclusive||!e)var d=a.top>=c.bottom&&a.top<=c.top||c.top>a.bottom&&c.top<a.top,e=a.left>=c.left&&a.left<=c.right||c.left>=a.left&&c.left<=a.right,f=a.right>=c.left&&a.right<=c.right||c.right>=a.left&&c.right<=a.right,d=(a.bottom>=c.bottom&&a.bottom<=c.top||c.bottom>=a.bottom&&
c.bottom<=a.top||d)&&(e||f);if(b.worldBounds&&!d){var g=b.worldBounds,e=g.getWidth(),f=!g.containsBounds(c),g=!g.containsBounds(a);f&&!g?(a=a.add(-e,0),d=c.intersectsBounds(a,{inclusive:b.inclusive})):g&&!f&&(c=c.add(-e,0),d=a.intersectsBounds(c,{inclusive:b.inclusive}))}return d},containsBounds:function(a,b,c){null==b&&(b=!1);null==c&&(c=!0);var d=this.contains(a.left,a.bottom,c),e=this.contains(a.right,a.bottom,c),f=this.contains(a.left,a.top,c);a=this.contains(a.right,a.top,c);return b?d||e||f||
a:d&&e&&f&&a},determineQuadrant:function(a){var b="",c=this.getCenterLonLat(),b=b+(a.lat<c.lat?"b":"t");return b+=a.lon<c.lon?"l":"r"},transform:function(a,b){this.centerLonLat=null;var c=OpenLayers.Projection.transform({x:this.left,y:this.bottom},a,b),d=OpenLayers.Projection.transform({x:this.right,y:this.bottom},a,b),e=OpenLayers.Projection.transform({x:this.left,y:this.top},a,b),f=OpenLayers.Projection.transform({x:this.right,y:this.top},a,b);this.left=Math.min(c.x,e.x);this.bottom=Math.min(c.y,
d.y);this.right=Math.max(d.x,f.x);this.top=Math.max(e.y,f.y);return this},wrapDateLine:function(a,b){b=b||{};var c=b.leftTolerance||0,d=b.rightTolerance||0,e=this.clone();if(a){for(var f=a.getWidth();e.left<a.left&&e.right-d<=a.left;)e=e.add(f,0);for(;e.left+c>=a.right&&e.right>a.right;)e=e.add(-f,0);c=e.left+c;c<a.right&&c>a.left&&e.right-d>a.right&&(e=e.add(-f,0))}return e},CLASS_NAME:"OpenLayers.Bounds"});
OpenLayers.Bounds.fromString=function(a,b){var c=a.split(",");return OpenLayers.Bounds.fromArray(c,b)};OpenLayers.Bounds.fromArray=function(a,b){return!0===b?new OpenLayers.Bounds(a[1],a[0],a[3],a[2]):new OpenLayers.Bounds(a[0],a[1],a[2],a[3])};OpenLayers.Bounds.fromSize=function(a){return new OpenLayers.Bounds(0,a.h,a.w,0)};OpenLayers.Bounds.oppositeQuadrant=function(a){var b;b=""+("t"==a.charAt(0)?"b":"t");return b+="l"==a.charAt(1)?"r":"l"};OpenLayers.Element={visible:function(a){return"none"!=OpenLayers.Util.getElement(a).style.display},toggle:function(){for(var a=0,b=arguments.length;a<b;a++){var c=OpenLayers.Util.getElement(arguments[a]),d=OpenLayers.Element.visible(c)?"none":"";c.style.display=d}},remove:function(a){a=OpenLayers.Util.getElement(a);a.parentNode.removeChild(a)},getHeight:function(a){a=OpenLayers.Util.getElement(a);return a.offsetHeight},hasClass:function(a,b){var c=a.className;return!!c&&(new RegExp("(^|\\s)"+b+"(\\s|$)")).test(c)},
addClass:function(a,b){OpenLayers.Element.hasClass(a,b)||(a.className+=(a.className?" ":"")+b);return a},removeClass:function(a,b){var c=a.className;c&&(a.className=OpenLayers.String.trim(c.replace(new RegExp("(^|\\s+)"+b+"(\\s+|$)")," ")));return a},toggleClass:function(a,b){OpenLayers.Element.hasClass(a,b)?OpenLayers.Element.removeClass(a,b):OpenLayers.Element.addClass(a,b);return a},getStyle:function(a,b){a=OpenLayers.Util.getElement(a);var c=null;if(a&&a.style){c=a.style[OpenLayers.String.camelize(b)];
c||(document.defaultView&&document.defaultView.getComputedStyle?c=(c=document.defaultView.getComputedStyle(a,null))?c.getPropertyValue(b):null:a.currentStyle&&(c=a.currentStyle[OpenLayers.String.camelize(b)]));var d=["left","top","right","bottom"];window.opera&&-1!=OpenLayers.Util.indexOf(d,b)&&"static"==OpenLayers.Element.getStyle(a,"position")&&(c="auto")}return"auto"==c?null:c}};OpenLayers.LonLat=OpenLayers.Class({lon:0,lat:0,initialize:function(a,b){OpenLayers.Util.isArray(a)&&(b=a[1],a=a[0]);this.lon=OpenLayers.Util.toFloat(a);this.lat=OpenLayers.Util.toFloat(b)},toString:function(){return"lon="+this.lon+",lat="+this.lat},toShortString:function(){return this.lon+", "+this.lat},clone:function(){return new OpenLayers.LonLat(this.lon,this.lat)},add:function(a,b){if(null==a||null==b)throw new TypeError("LonLat.add cannot receive null values");return new OpenLayers.LonLat(this.lon+
OpenLayers.Util.toFloat(a),this.lat+OpenLayers.Util.toFloat(b))},equals:function(a){var b=!1;null!=a&&(b=this.lon==a.lon&&this.lat==a.lat||isNaN(this.lon)&&isNaN(this.lat)&&isNaN(a.lon)&&isNaN(a.lat));return b},transform:function(a,b){var c=OpenLayers.Projection.transform({x:this.lon,y:this.lat},a,b);this.lon=c.x;this.lat=c.y;return this},wrapDateLine:function(a){var b=this.clone();if(a){for(;b.lon<a.left;)b.lon+=a.getWidth();for(;b.lon>a.right;)b.lon-=a.getWidth()}return b},CLASS_NAME:"OpenLayers.LonLat"});
OpenLayers.LonLat.fromString=function(a){a=a.split(",");return new OpenLayers.LonLat(a[0],a[1])};OpenLayers.LonLat.fromArray=function(a){var b=OpenLayers.Util.isArray(a);return new OpenLayers.LonLat(b&&a[0],b&&a[1])};OpenLayers.Pixel=OpenLayers.Class({x:0,y:0,initialize:function(a,b){this.x=parseFloat(a);this.y=parseFloat(b)},toString:function(){return"x="+this.x+",y="+this.y},clone:function(){return new OpenLayers.Pixel(this.x,this.y)},equals:function(a){var b=!1;null!=a&&(b=this.x==a.x&&this.y==a.y||isNaN(this.x)&&isNaN(this.y)&&isNaN(a.x)&&isNaN(a.y));return b},distanceTo:function(a){return Math.sqrt(Math.pow(this.x-a.x,2)+Math.pow(this.y-a.y,2))},add:function(a,b){if(null==a||null==b)throw new TypeError("Pixel.add cannot receive null values");
return new OpenLayers.Pixel(this.x+a,this.y+b)},offset:function(a){var b=this.clone();a&&(b=this.add(a.x,a.y));return b},CLASS_NAME:"OpenLayers.Pixel"});OpenLayers.Size=OpenLayers.Class({w:0,h:0,initialize:function(a,b){this.w=parseFloat(a);this.h=parseFloat(b)},toString:function(){return"w="+this.w+",h="+this.h},clone:function(){return new OpenLayers.Size(this.w,this.h)},equals:function(a){var b=!1;null!=a&&(b=this.w==a.w&&this.h==a.h||isNaN(this.w)&&isNaN(this.h)&&isNaN(a.w)&&isNaN(a.h));return b},CLASS_NAME:"OpenLayers.Size"});OpenLayers.Console={log:function(){},debug:function(){},info:function(){},warn:function(){},error:function(){},userError:function(a){alert(a)},assert:function(){},dir:function(){},dirxml:function(){},trace:function(){},group:function(){},groupEnd:function(){},time:function(){},timeEnd:function(){},profile:function(){},profileEnd:function(){},count:function(){},CLASS_NAME:"OpenLayers.Console"};
(function(){for(var a=document.getElementsByTagName("script"),b=0,c=a.length;b<c;++b)if(-1!=a[b].src.indexOf("firebug.js")&&console){OpenLayers.Util.extend(OpenLayers.Console,console);break}})();OpenLayers.Lang={code:null,defaultCode:"en",getCode:function(){OpenLayers.Lang.code||OpenLayers.Lang.setCode();return OpenLayers.Lang.code},setCode:function(a){var b;a||(a="msie"==OpenLayers.BROWSER_NAME?navigator.userLanguage:navigator.language);a=a.split("-");a[0]=a[0].toLowerCase();"object"==typeof OpenLayers.Lang[a[0]]&&(b=a[0]);if(a[1]){var c=a[0]+"-"+a[1].toUpperCase();"object"==typeof OpenLayers.Lang[c]&&(b=c)}b||(OpenLayers.Console.warn("Failed to find OpenLayers.Lang."+a.join("-")+" dictionary, falling back to default language"),
b=OpenLayers.Lang.defaultCode);OpenLayers.Lang.code=b},translate:function(a,b){var c=OpenLayers.Lang[OpenLayers.Lang.getCode()];(c=c&&c[a])||(c=a);b&&(c=OpenLayers.String.format(c,b));return c}};OpenLayers.i18n=OpenLayers.Lang.translate;OpenLayers.Util=OpenLayers.Util||{};OpenLayers.Util.getElement=function(){for(var a=[],b=0,c=arguments.length;b<c;b++){var d=arguments[b];"string"==typeof d&&(d=document.getElementById(d));if(1==arguments.length)return d;a.push(d)}return a};OpenLayers.Util.isElement=function(a){return!(!a||1!==a.nodeType)};OpenLayers.Util.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)};OpenLayers.Util.removeItem=function(a,b){for(var c=a.length-1;0<=c;c--)a[c]==b&&a.splice(c,1);return a};
OpenLayers.Util.indexOf=function(a,b){if("function"==typeof a.indexOf)return a.indexOf(b);for(var c=0,d=a.length;c<d;c++)if(a[c]==b)return c;return-1};OpenLayers.Util.dotless=/\./g;
OpenLayers.Util.modifyDOMElement=function(a,b,c,d,e,f,g,h){b&&(a.id=b.replace(OpenLayers.Util.dotless,"_"));c&&(a.style.left=c.x+"px",a.style.top=c.y+"px");d&&(a.style.width=d.w+"px",a.style.height=d.h+"px");e&&(a.style.position=e);f&&(a.style.border=f);g&&(a.style.overflow=g);0<=parseFloat(h)&&1>parseFloat(h)?(a.style.filter="alpha(opacity="+100*h+")",a.style.opacity=h):1==parseFloat(h)&&(a.style.filter="",a.style.opacity="")};
OpenLayers.Util.createDiv=function(a,b,c,d,e,f,g,h){var k=document.createElement("div");d&&(k.style.backgroundImage="url("+d+")");a||(a=OpenLayers.Util.createUniqueID("OpenLayersDiv"));e||(e="absolute");OpenLayers.Util.modifyDOMElement(k,a,b,c,e,f,g,h);return k};
OpenLayers.Util.createImage=function(a,b,c,d,e,f,g,h){var k=document.createElement("img");a||(a=OpenLayers.Util.createUniqueID("OpenLayersDiv"));e||(e="relative");OpenLayers.Util.modifyDOMElement(k,a,b,c,e,f,null,g);h&&(b=function(){k.style.display="";OpenLayers.Event.stopObservingElement(k)},k.style.display="none",OpenLayers.Event.observe(k,"load",b),OpenLayers.Event.observe(k,"error",b));k.style.alt=a;k.galleryImg="no";d&&(k.src=d);return k};OpenLayers.IMAGE_RELOAD_ATTEMPTS=0;
OpenLayers.Util.alphaHackNeeded=null;OpenLayers.Util.alphaHack=function(){if(null==OpenLayers.Util.alphaHackNeeded){var a=navigator.appVersion.split("MSIE"),a=parseFloat(a[1]),b=!1;try{b=!!document.body.filters}catch(c){}OpenLayers.Util.alphaHackNeeded=b&&5.5<=a&&7>a}return OpenLayers.Util.alphaHackNeeded};
OpenLayers.Util.modifyAlphaImageDiv=function(a,b,c,d,e,f,g,h,k){OpenLayers.Util.modifyDOMElement(a,b,c,d,f,null,null,k);b=a.childNodes[0];e&&(b.src=e);OpenLayers.Util.modifyDOMElement(b,a.id+"_innerImage",null,d,"relative",g);OpenLayers.Util.alphaHack()&&("none"!=a.style.display&&(a.style.display="inline-block"),null==h&&(h="scale"),a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+b.src+"', sizingMethod='"+h+"')",0<=parseFloat(a.style.opacity)&&1>parseFloat(a.style.opacity)&&
(a.style.filter+=" alpha(opacity="+100*a.style.opacity+")"),b.style.filter="alpha(opacity=0)")};OpenLayers.Util.createAlphaImageDiv=function(a,b,c,d,e,f,g,h,k){var l=OpenLayers.Util.createDiv();k=OpenLayers.Util.createImage(null,null,null,null,null,null,null,k);k.className="olAlphaImg";l.appendChild(k);OpenLayers.Util.modifyAlphaImageDiv(l,a,b,c,d,e,f,g,h);return l};OpenLayers.Util.upperCaseObject=function(a){var b={},c;for(c in a)b[c.toUpperCase()]=a[c];return b};
OpenLayers.Util.applyDefaults=function(a,b){a=a||{};var c="function"==typeof window.Event&&b instanceof window.Event,d;for(d in b)if(void 0===a[d]||!c&&b.hasOwnProperty&&b.hasOwnProperty(d)&&!a.hasOwnProperty(d))a[d]=b[d];!c&&b&&b.hasOwnProperty&&b.hasOwnProperty("toString")&&!a.hasOwnProperty("toString")&&(a.toString=b.toString);return a};
OpenLayers.Util.getParameterString=function(a){var b=[],c;for(c in a){var d=a[c];if(null!=d&&"function"!=typeof d){if("object"==typeof d&&d.constructor==Array){for(var e=[],f,g=0,h=d.length;g<h;g++)f=d[g],e.push(encodeURIComponent(null===f||void 0===f?"":f));d=e.join(",")}else d=encodeURIComponent(d);b.push(encodeURIComponent(c)+"="+d)}}return b.join("&")};OpenLayers.Util.urlAppend=function(a,b){var c=a;if(b)var d=(a+" ").split(/[?&]/),c=c+(" "===d.pop()?b:d.length?"&"+b:"?"+b);return c};
OpenLayers.Util.getImagesLocation=function(){return OpenLayers.ImgPath||OpenLayers._getScriptLocation()+"img/"};OpenLayers.Util.getImageLocation=function(a){return OpenLayers.Util.getImagesLocation()+a};OpenLayers.Util.Try=function(){for(var a=null,b=0,c=arguments.length;b<c;b++){var d=arguments[b];try{a=d();break}catch(e){}}return a};
OpenLayers.Util.getXmlNodeValue=function(a){var b=null;OpenLayers.Util.Try(function(){b=a.text;b||(b=a.textContent);b||(b=a.firstChild.nodeValue)},function(){b=a.textContent});return b};OpenLayers.Util.mouseLeft=function(a,b){for(var c=a.relatedTarget?a.relatedTarget:a.toElement;c!=b&&null!=c;)c=c.parentNode;return c!=b};OpenLayers.Util.DEFAULT_PRECISION=14;OpenLayers.Util.toFloat=function(a,b){null==b&&(b=OpenLayers.Util.DEFAULT_PRECISION);"number"!==typeof a&&(a=parseFloat(a));return 0===b?a:parseFloat(a.toPrecision(b))};
OpenLayers.Util.rad=function(a){return a*Math.PI/180};OpenLayers.Util.deg=function(a){return 180*a/Math.PI};OpenLayers.Util.VincentyConstants={a:6378137,b:6356752.3142,f:1/298.257223563};
OpenLayers.Util.distVincenty=function(a,b){for(var c=OpenLayers.Util.VincentyConstants,d=c.a,e=c.b,c=c.f,f=OpenLayers.Util.rad(b.lon-a.lon),g=Math.atan((1-c)*Math.tan(OpenLayers.Util.rad(a.lat))),h=Math.atan((1-c)*Math.tan(OpenLayers.Util.rad(b.lat))),k=Math.sin(g),g=Math.cos(g),l=Math.sin(h),h=Math.cos(h),m=f,r=2*Math.PI,q=20;1E-12<Math.abs(m-r)&&0<--q;){var n=Math.sin(m),p=Math.cos(m),t=Math.sqrt(h*n*h*n+(g*l-k*h*p)*(g*l-k*h*p));if(0==t)return 0;var p=k*l+g*h*p,u=Math.atan2(t,p),v=Math.asin(g*h*
n/t),w=Math.cos(v)*Math.cos(v),n=p-2*k*l/w,x=c/16*w*(4+c*(4-3*w)),r=m,m=f+(1-x)*c*Math.sin(v)*(u+x*t*(n+x*p*(-1+2*n*n)))}if(0==q)return NaN;d=w*(d*d-e*e)/(e*e);c=d/1024*(256+d*(-128+d*(74-47*d)));return(e*(1+d/16384*(4096+d*(-768+d*(320-175*d))))*(u-c*t*(n+c/4*(p*(-1+2*n*n)-c/6*n*(-3+4*t*t)*(-3+4*n*n))))).toFixed(3)/1E3};
OpenLayers.Util.destinationVincenty=function(a,b,c){var d=OpenLayers.Util,e=d.VincentyConstants,f=e.a,g=e.b,e=e.f,h=a.lon,k=a.lat;a=d.rad(b);b=Math.sin(a);a=Math.cos(a);for(var l=(1-e)*Math.tan(d.rad(k)),k=1/Math.sqrt(1+l*l),m=l*k,r=Math.atan2(l,a),l=k*b,q=1-l*l,f=q*(f*f-g*g)/(g*g),n=1+f/16384*(4096+f*(-768+f*(320-175*f))),p=f/1024*(256+f*(-128+f*(74-47*f))),f=c/(g*n),t=2*Math.PI;1E-12<Math.abs(f-t);)var u=Math.cos(2*r+f),v=Math.sin(f),w=Math.cos(f),x=p*v*(u+p/4*(w*(-1+2*u*u)-p/6*u*(-3+4*v*v)*(-3+
4*u*u))),t=f,f=c/(g*n)+x;c=m*v-k*w*a;c=Math.atan2(m*w+k*v*a,(1-e)*Math.sqrt(l*l+c*c));g=e/16*q*(4+e*(4-3*q));return new OpenLayers.LonLat(h+d.deg(Math.atan2(v*b,k*w-m*v*a)-(1-g)*e*l*(f+g*v*(u+g*w*(-1+2*u*u)))),d.deg(c))};
OpenLayers.Util.getParameters=function(a,b){b=b||{};a=null===a||void 0===a?window.location.href:a;var c="";if(OpenLayers.String.contains(a,"?"))var d=a.indexOf("?")+1,c=OpenLayers.String.contains(a,"#")?a.indexOf("#"):a.length,c=a.substring(d,c);for(var d={},c=c.split(/[&;]/),e=0,f=c.length;e<f;++e){var g=c[e].split("=");if(g[0]){var h=g[0];try{h=decodeURIComponent(h)}catch(k){h=unescape(h)}g=(g[1]||"").replace(/\+/g," ");try{g=decodeURIComponent(g)}catch(k){g=unescape(g)}!1!==b.splitArgs&&(g=g.split(","));
1==g.length&&(g=g[0]);d[h]=g}}return d};OpenLayers.Util.lastSeqID=0;OpenLayers.Util.createUniqueID=function(a){a=null==a?"id_":a.replace(OpenLayers.Util.dotless,"_");OpenLayers.Util.lastSeqID+=1;return a+OpenLayers.Util.lastSeqID};OpenLayers.INCHES_PER_UNIT={inches:1,ft:12,mi:63360,m:39.37,km:39370,dd:4374754,yd:36};OpenLayers.INCHES_PER_UNIT["in"]=OpenLayers.INCHES_PER_UNIT.inches;OpenLayers.INCHES_PER_UNIT.degrees=OpenLayers.INCHES_PER_UNIT.dd;OpenLayers.INCHES_PER_UNIT.nmi=1852*OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH=.0254000508001016;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT,{Inch:OpenLayers.INCHES_PER_UNIT.inches,Meter:1/OpenLayers.METERS_PER_INCH,Foot:.3048006096012192/OpenLayers.METERS_PER_INCH,IFoot:.3048/OpenLayers.METERS_PER_INCH,ClarkeFoot:.3047972651151/OpenLayers.METERS_PER_INCH,SearsFoot:.30479947153867626/OpenLayers.METERS_PER_INCH,GoldCoastFoot:.3047997101815088/OpenLayers.METERS_PER_INCH,IInch:.0254/OpenLayers.METERS_PER_INCH,MicroInch:2.54E-5/OpenLayers.METERS_PER_INCH,Mil:2.54E-8/OpenLayers.METERS_PER_INCH,
Centimeter:.01/OpenLayers.METERS_PER_INCH,Kilometer:1E3/OpenLayers.METERS_PER_INCH,Yard:.9144018288036576/OpenLayers.METERS_PER_INCH,SearsYard:.914398414616029/OpenLayers.METERS_PER_INCH,IndianYard:.9143985307444408/OpenLayers.METERS_PER_INCH,IndianYd37:.91439523/OpenLayers.METERS_PER_INCH,IndianYd62:.9143988/OpenLayers.METERS_PER_INCH,IndianYd75:.9143985/OpenLayers.METERS_PER_INCH,IndianFoot:.30479951/OpenLayers.METERS_PER_INCH,IndianFt37:.30479841/OpenLayers.METERS_PER_INCH,IndianFt62:.3047996/
OpenLayers.METERS_PER_INCH,IndianFt75:.3047995/OpenLayers.METERS_PER_INCH,Mile:1609.3472186944373/OpenLayers.METERS_PER_INCH,IYard:.9144/OpenLayers.METERS_PER_INCH,IMile:1609.344/OpenLayers.METERS_PER_INCH,NautM:1852/OpenLayers.METERS_PER_INCH,"Lat-66":110943.31648893273/OpenLayers.METERS_PER_INCH,"Lat-83":110946.25736872235/OpenLayers.METERS_PER_INCH,Decimeter:.1/OpenLayers.METERS_PER_INCH,Millimeter:.001/OpenLayers.METERS_PER_INCH,Dekameter:10/OpenLayers.METERS_PER_INCH,Decameter:10/OpenLayers.METERS_PER_INCH,
Hectometer:100/OpenLayers.METERS_PER_INCH,GermanMeter:1.0000135965/OpenLayers.METERS_PER_INCH,CaGrid:.999738/OpenLayers.METERS_PER_INCH,ClarkeChain:20.1166194976/OpenLayers.METERS_PER_INCH,GunterChain:20.11684023368047/OpenLayers.METERS_PER_INCH,BenoitChain:20.116782494375872/OpenLayers.METERS_PER_INCH,SearsChain:20.11676512155/OpenLayers.METERS_PER_INCH,ClarkeLink:.201166194976/OpenLayers.METERS_PER_INCH,GunterLink:.2011684023368047/OpenLayers.METERS_PER_INCH,BenoitLink:.20116782494375873/OpenLayers.METERS_PER_INCH,
SearsLink:.2011676512155/OpenLayers.METERS_PER_INCH,Rod:5.02921005842012/OpenLayers.METERS_PER_INCH,IntnlChain:20.1168/OpenLayers.METERS_PER_INCH,IntnlLink:.201168/OpenLayers.METERS_PER_INCH,Perch:5.02921005842012/OpenLayers.METERS_PER_INCH,Pole:5.02921005842012/OpenLayers.METERS_PER_INCH,Furlong:201.1684023368046/OpenLayers.METERS_PER_INCH,Rood:3.778266898/OpenLayers.METERS_PER_INCH,CapeFoot:.3047972615/OpenLayers.METERS_PER_INCH,Brealey:375/OpenLayers.METERS_PER_INCH,ModAmFt:.304812252984506/OpenLayers.METERS_PER_INCH,
Fathom:1.8288/OpenLayers.METERS_PER_INCH,"NautM-UK":1853.184/OpenLayers.METERS_PER_INCH,"50kilometers":5E4/OpenLayers.METERS_PER_INCH,"150kilometers":15E4/OpenLayers.METERS_PER_INCH});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT,{mm:OpenLayers.INCHES_PER_UNIT.Meter/1E3,cm:OpenLayers.INCHES_PER_UNIT.Meter/100,dm:100*OpenLayers.INCHES_PER_UNIT.Meter,km:1E3*OpenLayers.INCHES_PER_UNIT.Meter,kmi:OpenLayers.INCHES_PER_UNIT.nmi,fath:OpenLayers.INCHES_PER_UNIT.Fathom,ch:OpenLayers.INCHES_PER_UNIT.IntnlChain,link:OpenLayers.INCHES_PER_UNIT.IntnlLink,"us-in":OpenLayers.INCHES_PER_UNIT.inches,"us-ft":OpenLayers.INCHES_PER_UNIT.Foot,"us-yd":OpenLayers.INCHES_PER_UNIT.Yard,"us-ch":OpenLayers.INCHES_PER_UNIT.GunterChain,
"us-mi":OpenLayers.INCHES_PER_UNIT.Mile,"ind-yd":OpenLayers.INCHES_PER_UNIT.IndianYd37,"ind-ft":OpenLayers.INCHES_PER_UNIT.IndianFt37,"ind-ch":20.11669506/OpenLayers.METERS_PER_INCH});OpenLayers.DOTS_PER_INCH=72;OpenLayers.Util.normalizeScale=function(a){return 1<a?1/a:a};OpenLayers.Util.getResolutionFromScale=function(a,b){var c;a&&(null==b&&(b="degrees"),c=1/(OpenLayers.Util.normalizeScale(a)*OpenLayers.INCHES_PER_UNIT[b]*OpenLayers.DOTS_PER_INCH));return c};
OpenLayers.Util.getScaleFromResolution=function(a,b){null==b&&(b="degrees");return a*OpenLayers.INCHES_PER_UNIT[b]*OpenLayers.DOTS_PER_INCH};
OpenLayers.Util.pagePosition=function(a){var b=[0,0],c=OpenLayers.Util.getViewportElement();if(!a||a==window||a==c)return b;var d=OpenLayers.IS_GECKO&&document.getBoxObjectFor&&"absolute"==OpenLayers.Element.getStyle(a,"position")&&(""==a.style.top||""==a.style.left);if(a.getBoundingClientRect)a=a.getBoundingClientRect(),d=window.pageYOffset||c.scrollTop,b[0]=a.left+(window.pageXOffset||c.scrollLeft),b[1]=a.top+d;else if(document.getBoxObjectFor&&!d)a=document.getBoxObjectFor(a),c=document.getBoxObjectFor(c),
b[0]=a.screenX-c.screenX,b[1]=a.screenY-c.screenY;else{b[0]=a.offsetLeft;b[1]=a.offsetTop;c=a.offsetParent;if(c!=a)for(;c;)b[0]+=c.offsetLeft,b[1]+=c.offsetTop,c=c.offsetParent;d=OpenLayers.BROWSER_NAME;if("opera"==d||"safari"==d&&"absolute"==OpenLayers.Element.getStyle(a,"position"))b[1]-=document.body.offsetTop;for(c=a.offsetParent;c&&c!=document.body;){b[0]-=c.scrollLeft;if("opera"!=d||"TR"!=c.tagName)b[1]-=c.scrollTop;c=c.offsetParent}}return b};
OpenLayers.Util.getViewportElement=function(){var a=arguments.callee.viewportElement;void 0==a&&(a="msie"==OpenLayers.BROWSER_NAME&&"CSS1Compat"!=document.compatMode?document.body:document.documentElement,arguments.callee.viewportElement=a);return a};
OpenLayers.Util.isEquivalentUrl=function(a,b,c){c=c||{};OpenLayers.Util.applyDefaults(c,{ignoreCase:!0,ignorePort80:!0,ignoreHash:!0,splitArgs:!1});a=OpenLayers.Util.createUrlObject(a,c);b=OpenLayers.Util.createUrlObject(b,c);for(var d in a)if("args"!==d&&a[d]!=b[d])return!1;for(d in a.args){if(a.args[d]!=b.args[d])return!1;delete b.args[d]}for(d in b.args)return!1;return!0};
OpenLayers.Util.createUrlObject=function(a,b){b=b||{};if(!/^\w+:\/\//.test(a)){var c=window.location,d=c.port?":"+c.port:"",d=c.protocol+"//"+c.host.split(":").shift()+d;0===a.indexOf("/")?a=d+a:(c=c.pathname.split("/"),c.pop(),a=d+c.join("/")+"/"+a)}b.ignoreCase&&(a=a.toLowerCase());c=document.createElement("a");c.href=a;d={};d.host=c.host.split(":").shift();d.protocol=c.protocol;d.port=b.ignorePort80?"80"==c.port||"0"==c.port?"":c.port:""==c.port||"0"==c.port?"80":c.port;d.hash=b.ignoreHash||"#"===
c.hash?"":c.hash;var e=c.search;e||(e=a.indexOf("?"),e=-1!=e?a.substr(e):"");d.args=OpenLayers.Util.getParameters(e,{splitArgs:b.splitArgs});d.pathname="/"==c.pathname.charAt(0)?c.pathname:"/"+c.pathname;return d};OpenLayers.Util.removeTail=function(a){var b=a.indexOf("?"),c=a.indexOf("#");return-1==b?-1!=c?a.substr(0,c):a:-1!=c?a.substr(0,Math.min(b,c)):a.substr(0,b)};OpenLayers.IS_GECKO=function(){var a=navigator.userAgent.toLowerCase();return-1==a.indexOf("webkit")&&-1!=a.indexOf("gecko")}();
OpenLayers.CANVAS_SUPPORTED=function(){var a=document.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))}();OpenLayers.BROWSER_NAME=function(){var a="",b=navigator.userAgent.toLowerCase();-1!=b.indexOf("opera")?a="opera":-1!=b.indexOf("msie")?a="msie":-1!=b.indexOf("safari")?a="safari":-1!=b.indexOf("mozilla")&&(a=-1!=b.indexOf("firefox")?"firefox":"mozilla");return a}();OpenLayers.Util.getBrowserName=function(){return OpenLayers.BROWSER_NAME};
OpenLayers.Util.getRenderedDimensions=function(a,b,c){var d,e,f=document.createElement("div");f.style.visibility="hidden";for(var g=c&&c.containerElement?c.containerElement:document.body,h=!1,k=null,l=g;l&&"body"!=l.tagName.toLowerCase();){var m=OpenLayers.Element.getStyle(l,"position");if("absolute"==m){h=!0;break}else if(m&&"static"!=m)break;l=l.parentNode}!h||0!==g.clientHeight&&0!==g.clientWidth||(k=document.createElement("div"),k.style.visibility="hidden",k.style.position="absolute",k.style.overflow=
"visible",k.style.width=document.body.clientWidth+"px",k.style.height=document.body.clientHeight+"px",k.appendChild(f));f.style.position="absolute";b&&(b.w?(d=b.w,f.style.width=d+"px"):b.h&&(e=b.h,f.style.height=e+"px"));c&&c.displayClass&&(f.className=c.displayClass);b=document.createElement("div");b.innerHTML=a;b.style.overflow="visible";if(b.childNodes)for(a=0,c=b.childNodes.length;a<c;a++)b.childNodes[a].style&&(b.childNodes[a].style.overflow="visible");f.appendChild(b);k?g.appendChild(k):g.appendChild(f);
d||(d=parseInt(b.scrollWidth),f.style.width=d+"px");e||(e=parseInt(b.scrollHeight));f.removeChild(b);k?(k.removeChild(f),g.removeChild(k)):g.removeChild(f);return new OpenLayers.Size(d,e)};
OpenLayers.Util.getScrollbarWidth=function(){var a=OpenLayers.Util._scrollbarWidth;if(null==a){var b,c;b=document.createElement("div");b.style.position="absolute";b.style.top="-1000px";b.style.left="-1000px";b.style.width="100px";b.style.height="50px";b.style.overflow="hidden";c=document.createElement("div");c.style.width="100%";c.style.height="200px";b.appendChild(c);document.body.appendChild(b);a=c.offsetWidth;b.style.overflow="scroll";b=c.offsetWidth;document.body.removeChild(document.body.lastChild);
OpenLayers.Util._scrollbarWidth=a-b;a=OpenLayers.Util._scrollbarWidth}return a};
OpenLayers.Util.getFormattedLonLat=function(a,b,c){c||(c="dms");a=(a+540)%360-180;var d=Math.abs(a),e=Math.floor(d),f=d=(d-e)/(1/60),d=Math.floor(d),f=Math.round((f-d)/(1/60)*10),f=f/10;60<=f&&(f-=60,d+=1,60<=d&&(d-=60,e+=1));10>e&&(e="0"+e);e+="\u00b0";0<=c.indexOf("dm")&&(10>d&&(d="0"+d),e+=d+"'",0<=c.indexOf("dms")&&(10>f&&(f="0"+f),e+=f+'"'));return e="lon"==b?e+(0>a?OpenLayers.i18n("W"):OpenLayers.i18n("E")):e+(0>a?OpenLayers.i18n("S"):OpenLayers.i18n("N"))};
OpenLayers.Util.getConstructor=function(a){var b=a.split(".");a="OpenLayers"===b[0]?OpenLayers:window[b[0]];for(var c=1,d=b.length;c<d;++c)a=a[b[c]];return a};OpenLayers.Event={observers:!1,KEY_SPACE:32,KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,element:function(a){return a.target||a.srcElement},isSingleTouch:function(a){return a.touches&&1==a.touches.length},isMultiTouch:function(a){return a.touches&&1<a.touches.length},isTouchEvent:function(a){return 0===(""+a.type).indexOf("touch")||"pointerType"in a&&(a.pointerType===a.MSPOINTER_TYPE_TOUCH||"touch"===a.pointerType)},isLeftClick:function(a){return a.which&&
1==a.which||a.button&&1==a.button},isRightClick:function(a){return a.which&&3==a.which||a.button&&2==a.button},stop:function(a,b){b||OpenLayers.Event.preventDefault(a);a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},preventDefault:function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},findElement:function(a,b){for(var c=OpenLayers.Event.element(a);c.parentNode&&(!c.tagName||c.tagName.toUpperCase()!=b.toUpperCase());)c=c.parentNode;return c},observe:function(a,b,c,d){a=OpenLayers.Util.getElement(a);
d=d||!1;"keypress"==b&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||a.attachEvent)&&(b="keydown");this.observers||(this.observers={});if(!a._eventCacheID){var e="eventCacheID_";a.id&&(e=a.id+"_"+e);a._eventCacheID=OpenLayers.Util.createUniqueID(e)}e=a._eventCacheID;this.observers[e]||(this.observers[e]=[]);this.observers[e].push({element:a,name:b,observer:c,useCapture:d});a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},stopObservingElement:function(a){a=
OpenLayers.Util.getElement(a)._eventCacheID;this._removeElementObservers(OpenLayers.Event.observers[a])},_removeElementObservers:function(a){if(a)for(var b=a.length-1;0<=b;b--){var c=a[b];OpenLayers.Event.stopObserving.apply(this,[c.element,c.name,c.observer,c.useCapture])}},stopObserving:function(a,b,c,d){d=d||!1;a=OpenLayers.Util.getElement(a);var e=a._eventCacheID;"keypress"==b&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||a.detachEvent)&&(b="keydown");var f=!1,g=OpenLayers.Event.observers[e];
if(g)for(var h=0;!f&&h<g.length;){var k=g[h];if(k.name==b&&k.observer==c&&k.useCapture==d){g.splice(h,1);0==g.length&&delete OpenLayers.Event.observers[e];f=!0;break}h++}f&&(a.removeEventListener?a.removeEventListener(b,c,d):a&&a.detachEvent&&a.detachEvent("on"+b,c));return f},unloadCache:function(){if(OpenLayers.Event&&OpenLayers.Event.observers){for(var a in OpenLayers.Event.observers)OpenLayers.Event._removeElementObservers.apply(this,[OpenLayers.Event.observers[a]]);OpenLayers.Event.observers=
!1}},CLASS_NAME:"OpenLayers.Event"};OpenLayers.Event.observe(window,"unload",OpenLayers.Event.unloadCache,!1);
OpenLayers.Events=OpenLayers.Class({BROWSER_EVENTS:"mouseover mouseout mousedown mouseup mousemove click dblclick rightclick dblrightclick resize focus blur touchstart touchmove touchend keydown".split(" "),TOUCH_MODEL_POINTER:"pointer",TOUCH_MODEL_MSPOINTER:"MSPointer",TOUCH_MODEL_TOUCH:"touch",listeners:null,object:null,element:null,eventHandler:null,fallThrough:null,includeXY:!1,extensions:null,extensionCount:null,clearMouseListener:null,initialize:function(a,b,c,d,e){OpenLayers.Util.extend(this,
e);this.object=a;this.fallThrough=d;this.listeners={};this.extensions={};this.extensionCount={};this._pointerTouches=[];null!=b&&this.attachToElement(b)},destroy:function(){for(var a in this.extensions)"boolean"!==typeof this.extensions[a]&&this.extensions[a].destroy();this.extensions=null;this.element&&(OpenLayers.Event.stopObservingElement(this.element),this.element.hasScrollEvent&&OpenLayers.Event.stopObserving(window,"scroll",this.clearMouseListener));this.eventHandler=this.fallThrough=this.object=
this.listeners=this.element=null},addEventType:function(a){},attachToElement:function(a){this.element?OpenLayers.Event.stopObservingElement(this.element):(this.eventHandler=OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent,this),this.clearMouseListener=OpenLayers.Function.bind(this.clearMouseCache,this));this.element=a;for(var b=this.getTouchModel(),c,d=0,e=this.BROWSER_EVENTS.length;d<e;d++)c=this.BROWSER_EVENTS[d],b!==this.TOUCH_MODEL_POINTER&&b!==this.TOUCH_MODEL_MSPOINTER||0!==c.indexOf("touch")?
OpenLayers.Event.observe(a,c,this.eventHandler):this.addPointerTouchListener(a,c,this.eventHandler);OpenLayers.Event.observe(a,"dragstart",OpenLayers.Event.stop)},on:function(a){for(var b in a)"scope"!=b&&a.hasOwnProperty(b)&&this.register(b,a.scope,a[b])},register:function(a,b,c,d){a in OpenLayers.Events&&!this.extensions[a]&&(this.extensions[a]=new OpenLayers.Events[a](this));if(null!=c){null==b&&(b=this.object);var e=this.listeners[a];e||(e=[],this.listeners[a]=e,this.extensionCount[a]=0);b={obj:b,
func:c};d?(e.splice(this.extensionCount[a],0,b),"object"===typeof d&&d.extension&&this.extensionCount[a]++):e.push(b)}},registerPriority:function(a,b,c){this.register(a,b,c,!0)},un:function(a){for(var b in a)"scope"!=b&&a.hasOwnProperty(b)&&this.unregister(b,a.scope,a[b])},unregister:function(a,b,c){null==b&&(b=this.object);a=this.listeners[a];if(null!=a)for(var d=0,e=a.length;d<e;d++)if(a[d].obj==b&&a[d].func==c){a.splice(d,1);break}},remove:function(a){null!=this.listeners[a]&&(this.listeners[a]=
[])},triggerEvent:function(a,b){var c=this.listeners[a];if(c&&0!=c.length){null==b&&(b={});b.object=this.object;b.element=this.element;b.type||(b.type=a);for(var c=c.slice(),d,e=0,f=c.length;e<f&&(d=c[e],d=d.func.apply(d.obj,[b]),void 0==d||0!=d);e++);this.fallThrough||OpenLayers.Event.stop(b,!0);return d}},handleBrowserEvent:function(a){var b=a.type,c=this.listeners[b];if(c&&0!=c.length){if((c=a.touches)&&c[0]){for(var d=0,e=0,f=c.length,g,h=0;h<f;++h)g=this.getTouchClientXY(c[h]),d+=g.clientX,e+=
g.clientY;a.clientX=d/f;a.clientY=e/f}this.includeXY&&(a.xy=this.getMousePosition(a));this.triggerEvent(b,a)}},getTouchClientXY:function(a){var b=window.olMockWin||window,c=b.pageXOffset,b=b.pageYOffset,d=a.clientX,e=a.clientY;if(0===a.pageY&&Math.floor(e)>Math.floor(a.pageY)||0===a.pageX&&Math.floor(d)>Math.floor(a.pageX))d-=c,e-=b;else if(e<a.pageY-b||d<a.pageX-c)d=a.pageX-c,e=a.pageY-b;a.olClientX=d;a.olClientY=e;return{clientX:d,clientY:e}},clearMouseCache:function(){this.element.scrolls=null;
this.element.lefttop=null;this.element.offsets=null},getMousePosition:function(a){this.includeXY?this.element.hasScrollEvent||(OpenLayers.Event.observe(window,"scroll",this.clearMouseListener),this.element.hasScrollEvent=!0):this.clearMouseCache();if(!this.element.scrolls){var b=OpenLayers.Util.getViewportElement();this.element.scrolls=[window.pageXOffset||b.scrollLeft,window.pageYOffset||b.scrollTop]}this.element.lefttop||(this.element.lefttop=[document.documentElement.clientLeft||0,document.documentElement.clientTop||
0]);this.element.offsets||(this.element.offsets=OpenLayers.Util.pagePosition(this.element));return new OpenLayers.Pixel(a.clientX+this.element.scrolls[0]-this.element.offsets[0]-this.element.lefttop[0],a.clientY+this.element.scrolls[1]-this.element.offsets[1]-this.element.lefttop[1])},getTouchModel:function(){"_TOUCH_MODEL"in OpenLayers.Events||(OpenLayers.Events._TOUCH_MODEL=window.PointerEvent&&"pointer"||window.MSPointerEvent&&"MSPointer"||"ontouchdown"in document&&"touch"||null);return OpenLayers.Events._TOUCH_MODEL},
addPointerTouchListener:function(a,b,c){function d(a){c(OpenLayers.Util.applyDefaults({stopPropagation:function(){for(var a=e.length-1;0<=a;--a)e[a].stopPropagation()},preventDefault:function(){for(var a=e.length-1;0<=a;--a)e[a].preventDefault()},type:b},a))}var e=this._pointerTouches;switch(b){case "touchstart":return this.addPointerTouchListenerStart(a,b,d);case "touchend":return this.addPointerTouchListenerEnd(a,b,d);case "touchmove":return this.addPointerTouchListenerMove(a,b,d);default:throw"Unknown touch event type";
}},addPointerTouchListenerStart:function(a,b,c){var d=this._pointerTouches;OpenLayers.Event.observe(a,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?"MSPointerDown":"pointerdown",function(a){if(OpenLayers.Event.isTouchEvent(a)){for(var b=!1,e=0,h=d.length;e<h;++e)if(d[e].pointerId==a.pointerId){b=!0;break}b||d.push(a);a.touches=d.slice();c(a)}});OpenLayers.Event.observe(a,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?"MSPointerOut":"pointerout",function(a){if(OpenLayers.Event.isTouchEvent(a))for(var b=
0,c=d.length;b<c;++b)if(d[b].pointerId==a.pointerId){0!=this.clientWidth&&0!=this.clientHeight&&(Math.ceil(a.clientX)>=this.clientWidth||Math.ceil(a.clientY)>=this.clientHeight)&&d.splice(b,1);break}})},addPointerTouchListenerMove:function(a,b,c){var d=this._pointerTouches;OpenLayers.Event.observe(a,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?"MSPointerMove":"pointermove",function(a){if(OpenLayers.Event.isTouchEvent(a)&&(1!=d.length||d[0].pageX!=a.pageX||d[0].pageY!=a.pageY)){for(var b=0,e=
d.length;b<e;++b)if(d[b].pointerId==a.pointerId){d[b]=a;break}a.touches=d.slice();c(a)}})},addPointerTouchListenerEnd:function(a,b,c){var d=this._pointerTouches;OpenLayers.Event.observe(a,this.getTouchModel()===this.TOUCH_MODEL_MSPOINTER?"MSPointerUp":"pointerup",function(a){if(OpenLayers.Event.isTouchEvent(a)){for(var b=0,e=d.length;b<e;++b)if(d[b].pointerId==a.pointerId){d.splice(b,1);break}a.touches=d.slice();c(a)}})},CLASS_NAME:"OpenLayers.Events"});OpenLayers.Handler=OpenLayers.Class({id:null,control:null,map:null,keyMask:null,active:!1,evt:null,touch:!1,initialize:function(a,b,c){OpenLayers.Util.extend(this,c);this.control=a;this.callbacks=b;(a=this.map||a.map)&&this.setMap(a);this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")},setMap:function(a){this.map=a},checkModifiers:function(a){return null==this.keyMask?!0:((a.shiftKey?OpenLayers.Handler.MOD_SHIFT:0)|(a.ctrlKey?OpenLayers.Handler.MOD_CTRL:0)|(a.altKey?OpenLayers.Handler.MOD_ALT:
0)|(a.metaKey?OpenLayers.Handler.MOD_META:0))==this.keyMask},activate:function(){if(this.active)return!1;for(var a=OpenLayers.Events.prototype.BROWSER_EVENTS,b=0,c=a.length;b<c;b++)this[a[b]]&&this.register(a[b],this[a[b]]);return this.active=!0},deactivate:function(){if(!this.active)return!1;for(var a=OpenLayers.Events.prototype.BROWSER_EVENTS,b=0,c=a.length;b<c;b++)this[a[b]]&&this.unregister(a[b],this[a[b]]);this.active=this.touch=!1;return!0},startTouch:function(){if(!this.touch){this.touch=!0;
for(var a="mousedown mouseup mousemove click dblclick mouseout".split(" "),b=0,c=a.length;b<c;b++)this[a[b]]&&this.unregister(a[b],this[a[b]])}},callback:function(a,b){a&&this.callbacks[a]&&this.callbacks[a].apply(this.control,b)},register:function(a,b){this.map.events.registerPriority(a,this,b);this.map.events.registerPriority(a,this,this.setEvent)},unregister:function(a,b){this.map.events.unregister(a,this,b);this.map.events.unregister(a,this,this.setEvent)},setEvent:function(a){this.evt=a;return!0},
destroy:function(){this.deactivate();this.control=this.map=null},CLASS_NAME:"OpenLayers.Handler"});OpenLayers.Handler.MOD_NONE=0;OpenLayers.Handler.MOD_SHIFT=1;OpenLayers.Handler.MOD_CTRL=2;OpenLayers.Handler.MOD_ALT=4;OpenLayers.Handler.MOD_META=8;OpenLayers.Icon=OpenLayers.Class({url:null,size:null,offset:null,calculateOffset:null,imageDiv:null,px:null,initialize:function(a,b,c,d){this.url=a;this.size=b||{w:20,h:20};this.offset=c||{x:-(this.size.w/2),y:-(this.size.h/2)};this.calculateOffset=d;a=OpenLayers.Util.createUniqueID("OL_Icon_");this.imageDiv=OpenLayers.Util.createAlphaImageDiv(a)},destroy:function(){this.erase();OpenLayers.Event.stopObservingElement(this.imageDiv.firstChild);this.imageDiv.innerHTML="";this.imageDiv=null},clone:function(){return new OpenLayers.Icon(this.url,
this.size,this.offset,this.calculateOffset)},setSize:function(a){null!=a&&(this.size=a);this.draw()},setUrl:function(a){null!=a&&(this.url=a);this.draw()},draw:function(a){OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv,null,null,this.size,this.url,"absolute");this.moveTo(a);return this.imageDiv},erase:function(){null!=this.imageDiv&&null!=this.imageDiv.parentNode&&OpenLayers.Element.remove(this.imageDiv)},setOpacity:function(a){OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv,null,null,null,null,
null,null,null,a)},moveTo:function(a){null!=a&&(this.px=a);null!=this.imageDiv&&(null==this.px?this.display(!1):(this.calculateOffset&&(this.offset=this.calculateOffset(this.size)),OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv,null,{x:this.px.x+this.offset.x,y:this.px.y+this.offset.y})))},display:function(a){this.imageDiv.style.display=a?"":"none"},isDrawn:function(){return this.imageDiv&&this.imageDiv.parentNode&&11!=this.imageDiv.parentNode.nodeType},CLASS_NAME:"OpenLayers.Icon"});OpenLayers.Marker=OpenLayers.Class({icon:null,lonlat:null,events:null,map:null,initialize:function(a,b){this.lonlat=a;var c=b?b:OpenLayers.Marker.defaultIcon();null==this.icon?this.icon=c:(this.icon.url=c.url,this.icon.size=c.size,this.icon.offset=c.offset,this.icon.calculateOffset=c.calculateOffset);this.events=new OpenLayers.Events(this,this.icon.imageDiv)},destroy:function(){this.erase();this.map=null;this.events.destroy();this.events=null;null!=this.icon&&(this.icon.destroy(),this.icon=null)},
draw:function(a){return this.icon.draw(a)},erase:function(){null!=this.icon&&this.icon.erase()},moveTo:function(a){null!=a&&null!=this.icon&&this.icon.moveTo(a);this.lonlat=this.map.getLonLatFromLayerPx(a)},isDrawn:function(){return this.icon&&this.icon.isDrawn()},onScreen:function(){var a=!1;this.map&&(a=this.map.getExtent().containsLonLat(this.lonlat));return a},inflate:function(a){this.icon&&this.icon.setSize({w:this.icon.size.w*a,h:this.icon.size.h*a})},setOpacity:function(a){this.icon.setOpacity(a)},
setUrl:function(a){this.icon.setUrl(a)},display:function(a){this.icon.display(a)},CLASS_NAME:"OpenLayers.Marker"});OpenLayers.Marker.defaultIcon=function(){return new OpenLayers.Icon(OpenLayers.Util.getImageLocation("marker.png"),{w:21,h:25},{x:-10.5,y:-25})};OpenLayers.Util=OpenLayers.Util||{};
OpenLayers.Util.vendorPrefix=function(){function a(a){return a?a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()}).replace(/^ms-/,"-ms-"):null}function b(a,b){if(void 0===g[b]){var c,e=0,f=d.length,h="undefined"!==typeof a.cssText;for(g[b]=null;e<f;e++)if((c=d[e])?(h||(c=c.toLowerCase()),c=c+b.charAt(0).toUpperCase()+b.slice(1)):c=b,void 0!==a[c]){g[b]=c;break}}return g[b]}function c(a){return b(e,a)}var d=["","O","ms","Moz","Webkit"],e=document.createElement("div").style,f={},g={};return{css:function(b){if(void 0===
f[b]){var d=b.replace(/(-[\s\S])/g,function(a){return a.charAt(1).toUpperCase()}),d=c(d);f[b]=a(d)}return f[b]},js:b,style:c,cssCache:f,jsCache:g}}();OpenLayers.Animation=function(a){var b=OpenLayers.Util.vendorPrefix.js(a,"requestAnimationFrame"),c=!!b,d=function(){var c=a[b]||function(b,c){a.setTimeout(b,16)};return function(b,d){c.apply(a,[b,d])}}(),e=0,f={};return{isNative:c,requestFrame:d,start:function(a,b,c){b=0<b?b:Number.POSITIVE_INFINITY;var g=++e,h=+new Date;f[g]=function(){f[g]&&+new Date-h<=b?(a(),f[g]&&d(f[g],c)):delete f[g]};d(f[g],c);return g},stop:function(a){delete f[a]}}}(window);OpenLayers.Kinetic=OpenLayers.Class({threshold:0,deceleration:.0035,nbPoints:100,delay:200,points:void 0,timerId:void 0,initialize:function(a){OpenLayers.Util.extend(this,a)},begin:function(){OpenLayers.Animation.stop(this.timerId);this.timerId=void 0;this.points=[]},update:function(a){this.points.unshift({xy:a,tick:(new Date).getTime()});this.points.length>this.nbPoints&&this.points.pop()},end:function(a){for(var b,c=(new Date).getTime(),d=0,e=this.points.length,f;d<e;d++){f=this.points[d];if(c-
f.tick>this.delay)break;b=f}if(b&&(d=(new Date).getTime()-b.tick,c=Math.sqrt(Math.pow(a.x-b.xy.x,2)+Math.pow(a.y-b.xy.y,2)),d=c/d,!(0==d||d<this.threshold)))return c=Math.asin((a.y-b.xy.y)/c),b.xy.x<=a.x&&(c=Math.PI-c),{speed:d,theta:c}},move:function(a,b){var c=a.speed,d=Math.cos(a.theta),e=-Math.sin(a.theta),f=(new Date).getTime(),g=0,h=0;this.timerId=OpenLayers.Animation.start(OpenLayers.Function.bind(function(){if(null!=this.timerId){var a=(new Date).getTime()-f,l=-this.deceleration*Math.pow(a,
2)/2+c*a,m=l*d,l=l*e,r,q;r=!1;0>=-this.deceleration*a+c&&(OpenLayers.Animation.stop(this.timerId),this.timerId=null,r=!0);a=m-g;q=l-h;g=m;h=l;b(a,q,r)}},this))},CLASS_NAME:"OpenLayers.Kinetic"});OpenLayers.Tween=OpenLayers.Class({easing:null,begin:null,finish:null,duration:null,callbacks:null,time:null,minFrameRate:null,startTime:null,animationId:null,playing:!1,initialize:function(a){this.easing=a?a:OpenLayers.Easing.Expo.easeOut},start:function(a,b,c,d){this.playing=!0;this.begin=a;this.finish=b;this.duration=c;this.callbacks=d.callbacks;this.minFrameRate=d.minFrameRate||30;this.time=0;this.startTime=(new Date).getTime();OpenLayers.Animation.stop(this.animationId);this.animationId=null;
this.callbacks&&this.callbacks.start&&this.callbacks.start.call(this,this.begin);this.animationId=OpenLayers.Animation.start(OpenLayers.Function.bind(this.play,this))},stop:function(){this.playing&&(this.callbacks&&this.callbacks.done&&this.callbacks.done.call(this,this.finish),OpenLayers.Animation.stop(this.animationId),this.animationId=null,this.playing=!1)},play:function(){var a={},b;for(b in this.begin){var c=this.begin[b],d=this.finish[b];if(null==c||null==d||isNaN(c)||isNaN(d))throw new TypeError("invalid value for Tween");
a[b]=this.easing.apply(this,[this.time,c,d-c,this.duration])}this.time++;this.callbacks&&this.callbacks.eachStep&&((new Date).getTime()-this.startTime)/this.time<=1E3/this.minFrameRate&&this.callbacks.eachStep.call(this,a);this.time>this.duration&&this.stop()},CLASS_NAME:"OpenLayers.Tween"});OpenLayers.Easing={CLASS_NAME:"OpenLayers.Easing"};OpenLayers.Easing.Linear={easeIn:function(a,b,c,d){return c*a/d+b},easeOut:function(a,b,c,d){return c*a/d+b},easeInOut:function(a,b,c,d){return c*a/d+b},CLASS_NAME:"OpenLayers.Easing.Linear"};
OpenLayers.Easing.Expo={easeIn:function(a,b,c,d){return 0==a?b:c*Math.pow(2,10*(a/d-1))+b},easeOut:function(a,b,c,d){return a==d?b+c:c*(-Math.pow(2,-10*a/d)+1)+b},easeInOut:function(a,b,c,d){return 0==a?b:a==d?b+c:1>(a/=d/2)?c/2*Math.pow(2,10*(a-1))+b:c/2*(-Math.pow(2,-10*--a)+2)+b},CLASS_NAME:"OpenLayers.Easing.Expo"};
OpenLayers.Easing.Quad={easeIn:function(a,b,c,d){return c*(a/=d)*a+b},easeOut:function(a,b,c,d){return-c*(a/=d)*(a-2)+b},easeInOut:function(a,b,c,d){return 1>(a/=d/2)?c/2*a*a+b:-c/2*(--a*(a-2)-1)+b},CLASS_NAME:"OpenLayers.Easing.Quad"};OpenLayers.Projection=OpenLayers.Class({proj:null,projCode:null,titleRegEx:/\+title=[^\+]*/,initialize:function(a,b){OpenLayers.Util.extend(this,b);this.projCode=a;"object"==typeof Proj4js&&(this.proj=new Proj4js.Proj(a))},getCode:function(){return this.proj?this.proj.srsCode:this.projCode},getUnits:function(){return this.proj?this.proj.units:null},toString:function(){return this.getCode()},equals:function(a){var b=!1;a&&(a instanceof OpenLayers.Projection||(a=new OpenLayers.Projection(a)),"object"==
typeof Proj4js&&this.proj.defData&&a.proj.defData?b=this.proj.defData.replace(this.titleRegEx,"")==a.proj.defData.replace(this.titleRegEx,""):a.getCode&&(b=this.getCode(),a=a.getCode(),b=b==a||!!OpenLayers.Projection.transforms[b]&&OpenLayers.Projection.transforms[b][a]===OpenLayers.Projection.nullTransform));return b},destroy:function(){delete this.proj;delete this.projCode},CLASS_NAME:"OpenLayers.Projection"});OpenLayers.Projection.transforms={};
OpenLayers.Projection.defaults={"EPSG:4326":{units:"degrees",maxExtent:[-180,-90,180,90],worldExtent:[-180,-90,180,90],yx:!0},"CRS:84":{units:"degrees",maxExtent:[-180,-90,180,90],worldExtent:[-180,-90,180,90]},"EPSG:900913":{units:"m",maxExtent:[-2.003750834E7,-2.003750834E7,2.003750834E7,2.003750834E7],worldExtent:[-180,-89,180,89]}};
OpenLayers.Projection.addTransform=function(a,b,c){if(c===OpenLayers.Projection.nullTransform){var d=OpenLayers.Projection.defaults[a];d&&!OpenLayers.Projection.defaults[b]&&(OpenLayers.Projection.defaults[b]=d)}OpenLayers.Projection.transforms[a]||(OpenLayers.Projection.transforms[a]={});OpenLayers.Projection.transforms[a][b]=c};
OpenLayers.Projection.transform=function(a,b,c){if(b&&c)if(b instanceof OpenLayers.Projection||(b=new OpenLayers.Projection(b)),c instanceof OpenLayers.Projection||(c=new OpenLayers.Projection(c)),b.proj&&c.proj)a=Proj4js.transform(b.proj,c.proj,a);else{b=b.getCode();c=c.getCode();var d=OpenLayers.Projection.transforms;if(d[b]&&d[b][c])d[b][c](a)}return a};OpenLayers.Projection.nullTransform=function(a){return a};
(function(){function a(a){a.x=180*a.x/2.003750834E7;a.y=180/Math.PI*(2*Math.atan(Math.exp(a.y/2.003750834E7*Math.PI))-Math.PI/2);return a}function b(a){a.x=2.003750834E7*a.x/180;a.y=Math.max(-2.003750834E7,Math.min(Math.log(Math.tan((90+a.y)*Math.PI/360))/Math.PI*2.003750834E7,2.003750834E7));return a}function c(c,d){var e=OpenLayers.Projection.addTransform,f=OpenLayers.Projection.nullTransform,g,h,q,n,p;g=0;for(h=d.length;g<h;++g)for(q=d[g],e(c,q,b),e(q,c,a),p=g+1;p<h;++p)n=d[p],e(q,n,f),e(n,q,f)}
var d=["EPSG:900913","EPSG:3857","EPSG:102113","EPSG:102100","OSGEO:41001"],e=["CRS:84","urn:ogc:def:crs:EPSG:6.6:4326","EPSG:4326"],f;for(f=d.length-1;0<=f;--f)c(d[f],e);for(f=e.length-1;0<=f;--f)c(e[f],d)})();OpenLayers.Map=OpenLayers.Class({Z_INDEX_BASE:{BaseLayer:100,Overlay:325,Feature:725,Popup:750,Control:1E3},id:null,fractionalZoom:!1,events:null,allOverlays:!1,div:null,dragging:!1,size:null,viewPortDiv:null,layerContainerOrigin:null,layerContainerDiv:null,layers:null,controls:null,popups:null,baseLayer:null,center:null,resolution:null,zoom:0,panRatio:1.5,options:null,tileSize:null,projection:"EPSG:4326",units:null,resolutions:null,maxResolution:null,minResolution:null,maxScale:null,minScale:null,
maxExtent:null,minExtent:null,restrictedExtent:null,numZoomLevels:16,theme:null,displayProjection:null,fallThrough:!1,autoUpdateSize:!0,eventListeners:null,panTween:null,panMethod:OpenLayers.Easing.Expo.easeOut,panDuration:50,zoomTween:null,zoomMethod:OpenLayers.Easing.Quad.easeOut,zoomDuration:20,paddingForPopups:null,layerContainerOriginPx:null,minPx:null,maxPx:null,initialize:function(a,b){var c=OpenLayers.Util.isElement(a);1!==arguments.length||"object"!==typeof a||c||(a=(b=a)&&b.div);this.tileSize=
new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,OpenLayers.Map.TILE_HEIGHT);this.paddingForPopups=new OpenLayers.Bounds(15,15,15,15);this.theme=OpenLayers._getScriptLocation()+"theme/default/style.css";this.options=OpenLayers.Util.extend({},b);OpenLayers.Util.extend(this,b);OpenLayers.Util.applyDefaults(this,OpenLayers.Projection.defaults[this.projection instanceof OpenLayers.Projection?this.projection.projCode:this.projection]);!this.maxExtent||this.maxExtent instanceof OpenLayers.Bounds||(this.maxExtent=
new OpenLayers.Bounds(this.maxExtent));!this.minExtent||this.minExtent instanceof OpenLayers.Bounds||(this.minExtent=new OpenLayers.Bounds(this.minExtent));!this.restrictedExtent||this.restrictedExtent instanceof OpenLayers.Bounds||(this.restrictedExtent=new OpenLayers.Bounds(this.restrictedExtent));!this.center||this.center instanceof OpenLayers.LonLat||(this.center=new OpenLayers.LonLat(this.center));this.layers=[];this.id=OpenLayers.Util.createUniqueID("OpenLayers.Map_");this.div=OpenLayers.Util.getElement(a);
this.div||(this.div=document.createElement("div"),this.div.style.height="1px",this.div.style.width="1px");OpenLayers.Element.addClass(this.div,"olMap");c=this.id+"_OpenLayers_ViewPort";this.viewPortDiv=OpenLayers.Util.createDiv(c,null,null,null,"relative",null,"hidden");this.viewPortDiv.style.width="100%";this.viewPortDiv.style.height="100%";this.viewPortDiv.className="olMapViewport";this.div.appendChild(this.viewPortDiv);this.events=new OpenLayers.Events(this,this.viewPortDiv,null,this.fallThrough,
{includeXY:!0});OpenLayers.TileManager&&null!==this.tileManager&&(this.tileManager instanceof OpenLayers.TileManager||(this.tileManager=new OpenLayers.TileManager(this.tileManager)),this.tileManager.addMap(this));c=this.id+"_OpenLayers_Container";this.layerContainerDiv=OpenLayers.Util.createDiv(c);this.layerContainerDiv.style.zIndex=this.Z_INDEX_BASE.Popup-1;this.layerContainerOriginPx={x:0,y:0};this.applyTransform();this.viewPortDiv.appendChild(this.layerContainerDiv);this.updateSize();if(this.eventListeners instanceof
Object)this.events.on(this.eventListeners);!0===this.autoUpdateSize&&(this.updateSizeDestroy=OpenLayers.Function.bind(this.updateSize,this),OpenLayers.Event.observe(window,"resize",this.updateSizeDestroy));if(this.theme){for(var c=!0,d=document.getElementsByTagName("link"),e=0,f=d.length;e<f;++e)if(OpenLayers.Util.isEquivalentUrl(d.item(e).href,this.theme)){c=!1;break}c&&(c=document.createElement("link"),c.setAttribute("rel","stylesheet"),c.setAttribute("type","text/css"),c.setAttribute("href",this.theme),
document.getElementsByTagName("head")[0].appendChild(c))}null==this.controls&&(this.controls=[],null!=OpenLayers.Control&&(OpenLayers.Control.Navigation?this.controls.push(new OpenLayers.Control.Navigation):OpenLayers.Control.TouchNavigation&&this.controls.push(new OpenLayers.Control.TouchNavigation),OpenLayers.Control.Zoom?this.controls.push(new OpenLayers.Control.Zoom):OpenLayers.Control.PanZoom&&this.controls.push(new OpenLayers.Control.PanZoom),OpenLayers.Control.ArgParser&&this.controls.push(new OpenLayers.Control.ArgParser),
OpenLayers.Control.Attribution&&this.controls.push(new OpenLayers.Control.Attribution)));e=0;for(f=this.controls.length;e<f;e++)this.addControlToMap(this.controls[e]);this.popups=[];this.unloadDestroy=OpenLayers.Function.bind(this.destroy,this);OpenLayers.Event.observe(window,"unload",this.unloadDestroy);b&&b.layers&&(delete this.center,delete this.zoom,this.addLayers(b.layers),b.center&&!this.getCenter()&&this.setCenter(b.center,b.zoom));this.panMethod&&(this.panTween=new OpenLayers.Tween(this.panMethod));
this.zoomMethod&&this.applyTransform.transform&&(this.zoomTween=new OpenLayers.Tween(this.zoomMethod))},getViewport:function(){return this.viewPortDiv},render:function(a){this.div=OpenLayers.Util.getElement(a);OpenLayers.Element.addClass(this.div,"olMap");this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);this.div.appendChild(this.viewPortDiv);this.updateSize()},unloadDestroy:null,updateSizeDestroy:null,destroy:function(){if(!this.unloadDestroy)return!1;this.panTween&&(this.panTween.stop(),
this.panTween=null);this.zoomTween&&(this.zoomTween.stop(),this.zoomTween=null);OpenLayers.Event.stopObserving(window,"unload",this.unloadDestroy);this.unloadDestroy=null;this.updateSizeDestroy&&OpenLayers.Event.stopObserving(window,"resize",this.updateSizeDestroy);this.paddingForPopups=null;if(null!=this.controls){for(var a=this.controls.length-1;0<=a;--a)this.controls[a].destroy();this.controls=null}if(null!=this.layers){for(a=this.layers.length-1;0<=a;--a)this.layers[a].destroy(!1);this.layers=
null}this.viewPortDiv&&this.viewPortDiv.parentNode&&this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);this.viewPortDiv=null;this.tileManager&&(this.tileManager.removeMap(this),this.tileManager=null);this.eventListeners&&(this.events.un(this.eventListeners),this.eventListeners=null);this.events.destroy();this.options=this.events=null},setOptions:function(a){var b=this.minPx&&a.restrictedExtent!=this.restrictedExtent;OpenLayers.Util.extend(this,a);b&&this.moveTo(this.getCachedCenter(),this.zoom,
{forceZoomChange:!0})},getTileSize:function(){return this.tileSize},getBy:function(a,b,c){var d="function"==typeof c.test;return OpenLayers.Array.filter(this[a],function(a){return a[b]==c||d&&c.test(a[b])})},getLayersBy:function(a,b){return this.getBy("layers",a,b)},getLayersByName:function(a){return this.getLayersBy("name",a)},getLayersByClass:function(a){return this.getLayersBy("CLASS_NAME",a)},getControlsBy:function(a,b){return this.getBy("controls",a,b)},getControlsByClass:function(a){return this.getControlsBy("CLASS_NAME",
a)},getLayer:function(a){for(var b=null,c=0,d=this.layers.length;c<d;c++){var e=this.layers[c];if(e.id==a){b=e;break}}return b},setLayerZIndex:function(a,b){a.setZIndex(this.Z_INDEX_BASE[a.isBaseLayer?"BaseLayer":"Overlay"]+5*b)},resetLayersZIndex:function(){for(var a=0,b=this.layers.length;a<b;a++)this.setLayerZIndex(this.layers[a],a)},addLayer:function(a){for(var b=0,c=this.layers.length;b<c;b++)if(this.layers[b]==a)return!1;if(!1===this.events.triggerEvent("preaddlayer",{layer:a}))return!1;this.allOverlays&&
(a.isBaseLayer=!1);a.div.className="olLayerDiv";a.div.style.overflow="";this.setLayerZIndex(a,this.layers.length);a.isFixed?this.viewPortDiv.appendChild(a.div):this.layerContainerDiv.appendChild(a.div);this.layers.push(a);a.setMap(this);a.isBaseLayer||this.allOverlays&&!this.baseLayer?null==this.baseLayer?this.setBaseLayer(a):a.setVisibility(!1):a.redraw();this.events.triggerEvent("addlayer",{layer:a});a.events.triggerEvent("added",{map:this,layer:a});a.afterAdd();return!0},addLayers:function(a){for(var b=
0,c=a.length;b<c;b++)this.addLayer(a[b])},removeLayer:function(a,b){if(!1!==this.events.triggerEvent("preremovelayer",{layer:a})){null==b&&(b=!0);a.isFixed?this.viewPortDiv.removeChild(a.div):this.layerContainerDiv.removeChild(a.div);OpenLayers.Util.removeItem(this.layers,a);a.removeMap(this);a.map=null;if(this.baseLayer==a&&(this.baseLayer=null,b))for(var c=0,d=this.layers.length;c<d;c++){var e=this.layers[c];if(e.isBaseLayer||this.allOverlays){this.setBaseLayer(e);break}}this.resetLayersZIndex();
this.events.triggerEvent("removelayer",{layer:a});a.events.triggerEvent("removed",{map:this,layer:a})}},getNumLayers:function(){return this.layers.length},getLayerIndex:function(a){return OpenLayers.Util.indexOf(this.layers,a)},setLayerIndex:function(a,b){var c=this.getLayerIndex(a);0>b?b=0:b>this.layers.length&&(b=this.layers.length);if(c!=b){this.layers.splice(c,1);this.layers.splice(b,0,a);for(var c=0,d=this.layers.length;c<d;c++)this.setLayerZIndex(this.layers[c],c);this.events.triggerEvent("changelayer",
{layer:a,property:"order"});this.allOverlays&&(0===b?this.setBaseLayer(a):this.baseLayer!==this.layers[0]&&this.setBaseLayer(this.layers[0]))}},raiseLayer:function(a,b){var c=this.getLayerIndex(a)+b;this.setLayerIndex(a,c)},setBaseLayer:function(a){if(a!=this.baseLayer&&-1!=OpenLayers.Util.indexOf(this.layers,a)){var b=this.getCachedCenter(),c=this.getResolution(),d=OpenLayers.Util.getResolutionFromScale(this.getScale(),a.units);null==this.baseLayer||this.allOverlays||this.baseLayer.setVisibility(!1);
this.baseLayer=a;if(!this.allOverlays||this.baseLayer.visibility)this.baseLayer.setVisibility(!0),!1===this.baseLayer.inRange&&this.baseLayer.redraw();null!=b&&(a=this.getZoomForResolution(d||this.resolution,!0),this.setCenter(b,a,!1,c!=d));this.events.triggerEvent("changebaselayer",{layer:this.baseLayer})}},addControl:function(a,b){this.controls.push(a);this.addControlToMap(a,b)},addControls:function(a,b){for(var c=1===arguments.length?[]:b,d=0,e=a.length;d<e;d++)this.addControl(a[d],c[d]?c[d]:null)},
addControlToMap:function(a,b){a.outsideViewport=null!=a.div;this.displayProjection&&!a.displayProjection&&(a.displayProjection=this.displayProjection);a.setMap(this);var c=a.draw(b);c&&!a.outsideViewport&&(c.style.zIndex=this.Z_INDEX_BASE.Control+this.controls.length,this.viewPortDiv.appendChild(c));a.autoActivate&&a.activate()},getControl:function(a){for(var b=null,c=0,d=this.controls.length;c<d;c++){var e=this.controls[c];if(e.id==a){b=e;break}}return b},removeControl:function(a){a&&a==this.getControl(a.id)&&
(a.div&&a.div.parentNode==this.viewPortDiv&&this.viewPortDiv.removeChild(a.div),OpenLayers.Util.removeItem(this.controls,a))},addPopup:function(a,b){if(b)for(var c=this.popups.length-1;0<=c;--c)this.removePopup(this.popups[c]);a.map=this;this.popups.push(a);if(c=a.draw())c.style.zIndex=this.Z_INDEX_BASE.Popup+this.popups.length,this.layerContainerDiv.appendChild(c)},removePopup:function(a){OpenLayers.Util.removeItem(this.popups,a);if(a.div)try{this.layerContainerDiv.removeChild(a.div)}catch(b){}a.map=
null},getSize:function(){var a=null;null!=this.size&&(a=this.size.clone());return a},updateSize:function(){var a=this.getCurrentSize();if(a&&!isNaN(a.h)&&!isNaN(a.w)){this.events.clearMouseCache();var b=this.getSize();null==b&&(this.size=b=a);if(!a.equals(b)){this.size=a;a=0;for(b=this.layers.length;a<b;a++)this.layers[a].onMapResize();a=this.getCachedCenter();null!=this.baseLayer&&null!=a&&(b=this.getZoom(),this.zoom=null,this.setCenter(a,b))}}this.events.triggerEvent("updatesize")},getCurrentSize:function(){var a=
new OpenLayers.Size(this.div.clientWidth,this.div.clientHeight);if(0==a.w&&0==a.h||isNaN(a.w)&&isNaN(a.h))a.w=this.div.offsetWidth,a.h=this.div.offsetHeight;if(0==a.w&&0==a.h||isNaN(a.w)&&isNaN(a.h))a.w=parseInt(this.div.style.width),a.h=parseInt(this.div.style.height);return a},calculateBounds:function(a,b){var c=null;null==a&&(a=this.getCachedCenter());null==b&&(b=this.getResolution());if(null!=a&&null!=b)var c=this.size.w*b/2,d=this.size.h*b/2,c=new OpenLayers.Bounds(a.lon-c,a.lat-d,a.lon+c,a.lat+
d);return c},getCenter:function(){var a=null,b=this.getCachedCenter();b&&(a=b.clone());return a},getCachedCenter:function(){!this.center&&this.size&&(this.center=this.getLonLatFromViewPortPx({x:this.size.w/2,y:this.size.h/2}));return this.center},getZoom:function(){return this.zoom},pan:function(a,b,c){c=OpenLayers.Util.applyDefaults(c,{animate:!0,dragging:!1});if(c.dragging)0==a&&0==b||this.moveByPx(a,b);else{var d=this.getViewPortPxFromLonLat(this.getCachedCenter());a=d.add(a,b);if(this.dragging||
!a.equals(d))d=this.getLonLatFromViewPortPx(a),c.animate?this.panTo(d):(this.moveTo(d),this.dragging&&(this.dragging=!1,this.events.triggerEvent("moveend")))}},panTo:function(a){if(this.panTween&&this.getExtent().scale(this.panRatio).containsLonLat(a)){var b=this.getCachedCenter();if(!a.equals(b)){var b=this.getPixelFromLonLat(b),c=this.getPixelFromLonLat(a),d=0,e=0;this.panTween.start({x:0,y:0},{x:c.x-b.x,y:c.y-b.y},this.panDuration,{callbacks:{eachStep:OpenLayers.Function.bind(function(a){this.moveByPx(a.x-
d,a.y-e);d=Math.round(a.x);e=Math.round(a.y)},this),done:OpenLayers.Function.bind(function(b){this.moveTo(a);this.dragging=!1;this.events.triggerEvent("moveend")},this)}})}}else this.setCenter(a)},setCenter:function(a,b,c,d){this.panTween&&this.panTween.stop();this.zoomTween&&this.zoomTween.stop();this.moveTo(a,b,{dragging:c,forceZoomChange:d})},moveByPx:function(a,b){var c=this.size.w/2,d=this.size.h/2,e=c+a,f=d+b,g=this.baseLayer.wrapDateLine,h=0,k=0;this.restrictedExtent&&(h=c,k=d,g=!1);a=g||e<=
this.maxPx.x-h&&e>=this.minPx.x+h?Math.round(a):0;b=f<=this.maxPx.y-k&&f>=this.minPx.y+k?Math.round(b):0;if(a||b){this.dragging||(this.dragging=!0,this.events.triggerEvent("movestart"));this.center=null;a&&(this.layerContainerOriginPx.x-=a,this.minPx.x-=a,this.maxPx.x-=a);b&&(this.layerContainerOriginPx.y-=b,this.minPx.y-=b,this.maxPx.y-=b);this.applyTransform();d=0;for(e=this.layers.length;d<e;++d)c=this.layers[d],c.visibility&&(c===this.baseLayer||c.inRange)&&(c.moveByPx(a,b),c.events.triggerEvent("move"));
this.events.triggerEvent("move")}},adjustZoom:function(a){if(this.baseLayer&&this.baseLayer.wrapDateLine){var b=this.baseLayer.resolutions,c=this.getMaxExtent().getWidth()/this.size.w;if(this.getResolutionForZoom(a)>c)if(this.fractionalZoom)a=this.getZoomForResolution(c);else for(var d=a|0,e=b.length;d<e;++d)if(b[d]<=c){a=d;break}}return a},getMinZoom:function(){return this.adjustZoom(0)},moveTo:function(a,b,c){null==a||a instanceof OpenLayers.LonLat||(a=new OpenLayers.LonLat(a));c||(c={});null!=
b&&(b=parseFloat(b),this.fractionalZoom||(b=Math.round(b)));var d=b;b=this.adjustZoom(b);b!==d&&(a=this.getCenter());var d=c.dragging||this.dragging,e=c.forceZoomChange;this.getCachedCenter()||this.isValidLonLat(a)||(a=this.maxExtent.getCenterLonLat(),this.center=a.clone());if(null!=this.restrictedExtent){null==a&&(a=this.center);null==b&&(b=this.getZoom());var f=this.getResolutionForZoom(b),f=this.calculateBounds(a,f);if(!this.restrictedExtent.containsBounds(f)){var g=this.restrictedExtent.getCenterLonLat();
f.getWidth()>this.restrictedExtent.getWidth()?a=new OpenLayers.LonLat(g.lon,a.lat):f.left<this.restrictedExtent.left?a=a.add(this.restrictedExtent.left-f.left,0):f.right>this.restrictedExtent.right&&(a=a.add(this.restrictedExtent.right-f.right,0));f.getHeight()>this.restrictedExtent.getHeight()?a=new OpenLayers.LonLat(a.lon,g.lat):f.bottom<this.restrictedExtent.bottom?a=a.add(0,this.restrictedExtent.bottom-f.bottom):f.top>this.restrictedExtent.top&&(a=a.add(0,this.restrictedExtent.top-f.top))}}e=
e||this.isValidZoomLevel(b)&&b!=this.getZoom();f=this.isValidLonLat(a)&&!a.equals(this.center);if(e||f||d){d||this.events.triggerEvent("movestart",{zoomChanged:e});f&&(!e&&this.center&&this.centerLayerContainer(a),this.center=a.clone());a=e?this.getResolutionForZoom(b):this.getResolution();if(e||null==this.layerContainerOrigin){this.layerContainerOrigin=this.getCachedCenter();this.layerContainerOriginPx.x=0;this.layerContainerOriginPx.y=0;this.applyTransform();var f=this.getMaxExtent({restricted:!0}),
h=f.getCenterLonLat(),g=this.center.lon-h.lon,h=h.lat-this.center.lat,k=Math.round(f.getWidth()/a),l=Math.round(f.getHeight()/a);this.minPx={x:(this.size.w-k)/2-g/a,y:(this.size.h-l)/2-h/a};this.maxPx={x:this.minPx.x+Math.round(f.getWidth()/a),y:this.minPx.y+Math.round(f.getHeight()/a)}}e&&(this.zoom=b,this.resolution=a);a=this.getExtent();this.baseLayer.visibility&&(this.baseLayer.moveTo(a,e,c.dragging),c.dragging||this.baseLayer.events.triggerEvent("moveend",{zoomChanged:e}));a=this.baseLayer.getExtent();
for(b=this.layers.length-1;0<=b;--b)f=this.layers[b],f===this.baseLayer||f.isBaseLayer||(g=f.calculateInRange(),f.inRange!=g&&((f.inRange=g)||f.display(!1),this.events.triggerEvent("changelayer",{layer:f,property:"visibility"})),g&&f.visibility&&(f.moveTo(a,e,c.dragging),c.dragging||f.events.triggerEvent("moveend",{zoomChanged:e})));this.events.triggerEvent("move");d||this.events.triggerEvent("moveend");if(e){b=0;for(c=this.popups.length;b<c;b++)this.popups[b].updatePosition();this.events.triggerEvent("zoomend")}}},
centerLayerContainer:function(a){var b=this.getViewPortPxFromLonLat(this.layerContainerOrigin),c=this.getViewPortPxFromLonLat(a);if(null!=b&&null!=c){var d=this.layerContainerOriginPx.x;a=this.layerContainerOriginPx.y;var e=Math.round(b.x-c.x),b=Math.round(b.y-c.y);this.applyTransform(this.layerContainerOriginPx.x=e,this.layerContainerOriginPx.y=b);d-=e;a-=b;this.minPx.x-=d;this.maxPx.x-=d;this.minPx.y-=a;this.maxPx.y-=a}},isValidZoomLevel:function(a){return null!=a&&0<=a&&a<this.getNumZoomLevels()},
isValidLonLat:function(a){var b=!1;null!=a&&(b=this.getMaxExtent(),b=b.containsLonLat(a,{worldBounds:this.baseLayer.wrapDateLine&&b}));return b},getProjection:function(){var a=this.getProjectionObject();return a?a.getCode():null},getProjectionObject:function(){var a=null;null!=this.baseLayer&&(a=this.baseLayer.projection);return a},getMaxResolution:function(){var a=null;null!=this.baseLayer&&(a=this.baseLayer.maxResolution);return a},getMaxExtent:function(a){var b=null;a&&a.restricted&&this.restrictedExtent?
b=this.restrictedExtent:null!=this.baseLayer&&(b=this.baseLayer.maxExtent);return b},getNumZoomLevels:function(){var a=null;null!=this.baseLayer&&(a=this.baseLayer.numZoomLevels);return a},getExtent:function(){var a=null;null!=this.baseLayer&&(a=this.baseLayer.getExtent());return a},getResolution:function(){var a=null;null!=this.baseLayer?a=this.baseLayer.getResolution():!0===this.allOverlays&&0<this.layers.length&&(a=this.layers[0].getResolution());return a},getUnits:function(){var a=null;null!=
this.baseLayer&&(a=this.baseLayer.units);return a},getScale:function(){var a=null;null!=this.baseLayer&&(a=this.getResolution(),a=OpenLayers.Util.getScaleFromResolution(a,this.baseLayer.units));return a},getZoomForExtent:function(a,b){var c=null;null!=this.baseLayer&&(c=this.baseLayer.getZoomForExtent(a,b));return c},getResolutionForZoom:function(a){var b=null;this.baseLayer&&(b=this.baseLayer.getResolutionForZoom(a));return b},getZoomForResolution:function(a,b){var c=null;null!=this.baseLayer&&(c=
this.baseLayer.getZoomForResolution(a,b));return c},zoomTo:function(a,b){var c=this;if(c.isValidZoomLevel(a)){c.baseLayer.wrapDateLine&&(a=c.adjustZoom(a));var d=b?c.getZoomTargetCenter(b,c.getResolutionForZoom(a)):c.getCenter();d&&c.events.triggerEvent("zoomstart",{center:d,zoom:a});if(c.zoomTween){c.zoomTween.stop();var e=c.getResolution(),f=c.getResolutionForZoom(a),e={scale:e/f};b||(f=c.getSize(),b={x:f.w/2,y:f.h/2});c.zoomTween.start({scale:1},e,c.zoomDuration,{minFrameRate:50,callbacks:{eachStep:function(a){var d=
c.layerContainerOriginPx;a=a.scale;c.applyTransform(d.x+((a-1)*(d.x-b.x)|0),d.y+((a-1)*(d.y-b.y)|0),a)},done:function(a){c.applyTransform();var e=c.getResolution()/a.scale,f=c.getZoomForResolution(e,!0);a=1===a.scale?d:c.getZoomTargetCenter(b,e);c.moveTo(a,f)}}})}else c.setCenter(d,a)}},zoomIn:function(){this.zoomTween&&this.zoomTween.stop();this.zoomTo(this.getZoom()+1)},zoomOut:function(){this.zoomTween&&this.zoomTween.stop();this.zoomTo(this.getZoom()-1)},zoomToExtent:function(a,b){a instanceof
OpenLayers.Bounds||(a=new OpenLayers.Bounds(a));var c=a.getCenterLonLat();if(this.baseLayer.wrapDateLine){c=this.getMaxExtent();for(a=a.clone();a.right<a.left;)a.right+=c.getWidth();c=a.getCenterLonLat().wrapDateLine(c)}this.setCenter(c,this.getZoomForExtent(a,b))},zoomToMaxExtent:function(a){a=this.getMaxExtent({restricted:a?a.restricted:!0});this.zoomToExtent(a)},zoomToScale:function(a,b){var c=OpenLayers.Util.getResolutionFromScale(a,this.baseLayer.units),d=this.size.w*c/2,c=this.size.h*c/2,e=
this.getCachedCenter(),d=new OpenLayers.Bounds(e.lon-d,e.lat-c,e.lon+d,e.lat+c);this.zoomToExtent(d,b)},getLonLatFromViewPortPx:function(a){var b=null;null!=this.baseLayer&&(b=this.baseLayer.getLonLatFromViewPortPx(a));return b},getViewPortPxFromLonLat:function(a){var b=null;null!=this.baseLayer&&(b=this.baseLayer.getViewPortPxFromLonLat(a));return b},getZoomTargetCenter:function(a,b){var c=null,d=this.getSize(),e=d.w/2-a.x,d=a.y-d.h/2,f=this.getLonLatFromPixel(a);f&&(c=new OpenLayers.LonLat(f.lon+
e*b,f.lat+d*b));return c},getLonLatFromPixel:function(a){return this.getLonLatFromViewPortPx(a)},getPixelFromLonLat:function(a){a=this.getViewPortPxFromLonLat(a);a.x=Math.round(a.x);a.y=Math.round(a.y);return a},getGeodesicPixelSize:function(a){var b=a?this.getLonLatFromPixel(a):this.getCachedCenter()||new OpenLayers.LonLat(0,0),c=this.getResolution();a=b.add(-c/2,0);var d=b.add(c/2,0),e=b.add(0,-c/2),b=b.add(0,c/2),c=new OpenLayers.Projection("EPSG:4326"),f=this.getProjectionObject()||c;f.equals(c)||
(a.transform(f,c),d.transform(f,c),e.transform(f,c),b.transform(f,c));return new OpenLayers.Size(OpenLayers.Util.distVincenty(a,d),OpenLayers.Util.distVincenty(e,b))},getViewPortPxFromLayerPx:function(a){var b=null;null!=a&&(b=a.add(this.layerContainerOriginPx.x,this.layerContainerOriginPx.y));return b},getLayerPxFromViewPortPx:function(a){var b=null;null!=a&&(b=a.add(-this.layerContainerOriginPx.x,-this.layerContainerOriginPx.y),isNaN(b.x)||isNaN(b.y))&&(b=null);return b},getLonLatFromLayerPx:function(a){a=
this.getViewPortPxFromLayerPx(a);return this.getLonLatFromViewPortPx(a)},getLayerPxFromLonLat:function(a){a=this.getPixelFromLonLat(a);return this.getLayerPxFromViewPortPx(a)},applyTransform:function(a,b,c){c=c||1;var d=this.layerContainerOriginPx,e=1!==c;a=a||d.x;b=b||d.y;var f=this.layerContainerDiv.style,g=this.applyTransform.transform,h=this.applyTransform.template;if(void 0===g&&(g=OpenLayers.Util.vendorPrefix.style("transform"),this.applyTransform.transform=g)){var k=OpenLayers.Element.getStyle(this.viewPortDiv,
OpenLayers.Util.vendorPrefix.css("transform"));k&&"none"===k||(h=["translate3d(",",0) ","scale3d(",",1)"],f[g]=[h[0],"0,0",h[1]].join(""));h&&~f[g].indexOf(h[0])||(h=["translate(",") ","scale(",")"]);this.applyTransform.template=h}null===g||"translate3d("!==h[0]&&!0!==e?(f.left=a+"px",f.top=b+"px",null!==g&&(f[g]="")):(!0===e&&"translate("===h[0]&&(a-=d.x,b-=d.y,f.left=d.x+"px",f.top=d.y+"px"),f[g]=[h[0],a,"px,",b,"px",h[1],h[2],c,",",c,h[3]].join(""))},CLASS_NAME:"OpenLayers.Map"});
OpenLayers.Map.TILE_WIDTH=256;OpenLayers.Map.TILE_HEIGHT=256;OpenLayers.Layer=OpenLayers.Class({id:null,name:null,div:null,opacity:1,alwaysInRange:null,RESOLUTION_PROPERTIES:"scales resolutions maxScale minScale maxResolution minResolution numZoomLevels maxZoomLevel".split(" "),events:null,map:null,isBaseLayer:!1,alpha:!1,displayInLayerSwitcher:!0,visibility:!0,attribution:null,inRange:!1,imageSize:null,options:null,eventListeners:null,gutter:0,projection:null,units:null,scales:null,resolutions:null,maxExtent:null,minExtent:null,maxResolution:null,minResolution:null,
numZoomLevels:null,minScale:null,maxScale:null,displayOutsideMaxExtent:!1,wrapDateLine:!1,metadata:null,initialize:function(a,b){this.metadata={};b=OpenLayers.Util.extend({},b);null!=this.alwaysInRange&&(b.alwaysInRange=this.alwaysInRange);this.addOptions(b);this.name=a;if(null==this.id&&(this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_"),this.div=OpenLayers.Util.createDiv(this.id),this.div.style.width="100%",this.div.style.height="100%",this.div.dir="ltr",this.events=new OpenLayers.Events(this,
this.div),this.eventListeners instanceof Object))this.events.on(this.eventListeners)},destroy:function(a){null==a&&(a=!0);null!=this.map&&this.map.removeLayer(this,a);this.options=this.div=this.name=this.map=this.projection=null;this.events&&(this.eventListeners&&this.events.un(this.eventListeners),this.events.destroy());this.events=this.eventListeners=null},clone:function(a){null==a&&(a=new OpenLayers.Layer(this.name,this.getOptions()));OpenLayers.Util.applyDefaults(a,this);a.map=null;return a},
getOptions:function(){var a={},b;for(b in this.options)a[b]=this[b];return a},setName:function(a){a!=this.name&&(this.name=a,null!=this.map&&this.map.events.triggerEvent("changelayer",{layer:this,property:"name"}))},addOptions:function(a,b){null==this.options&&(this.options={});a&&("string"==typeof a.projection&&(a.projection=new OpenLayers.Projection(a.projection)),a.projection&&OpenLayers.Util.applyDefaults(a,OpenLayers.Projection.defaults[a.projection.getCode()]),!a.maxExtent||a.maxExtent instanceof
OpenLayers.Bounds||(a.maxExtent=new OpenLayers.Bounds(a.maxExtent)),!a.minExtent||a.minExtent instanceof OpenLayers.Bounds||(a.minExtent=new OpenLayers.Bounds(a.minExtent)));OpenLayers.Util.extend(this.options,a);OpenLayers.Util.extend(this,a);this.projection&&this.projection.getUnits()&&(this.units=this.projection.getUnits());if(this.map){var c=this.map.getResolution(),d=this.RESOLUTION_PROPERTIES.concat(["projection","units","minExtent","maxExtent"]),e;for(e in a)if(a.hasOwnProperty(e)&&0<=OpenLayers.Util.indexOf(d,
e)){this.initResolutions();b&&this.map.baseLayer===this&&(this.map.setCenter(this.map.getCenter(),this.map.getZoomForResolution(c),!1,!0),this.map.events.triggerEvent("changebaselayer",{layer:this}));break}}},onMapResize:function(){},redraw:function(){var a=!1;if(this.map){this.inRange=this.calculateInRange();var b=this.getExtent();b&&this.inRange&&this.visibility&&(this.moveTo(b,!0,!1),this.events.triggerEvent("moveend",{zoomChanged:!0}),a=!0)}return a},moveTo:function(a,b,c){a=this.visibility;this.isBaseLayer||
(a=a&&this.inRange);this.display(a)},moveByPx:function(a,b){},setMap:function(a){null==this.map&&(this.map=a,this.maxExtent=this.maxExtent||this.map.maxExtent,this.minExtent=this.minExtent||this.map.minExtent,this.projection=this.projection||this.map.projection,"string"==typeof this.projection&&(this.projection=new OpenLayers.Projection(this.projection)),this.projection&&this.projection.getUnits()?this.units=this.projection.getUnits():this.units=this.units||this.map.units,this.initResolutions(),this.isBaseLayer||
(this.inRange=this.calculateInRange(),this.div.style.display=this.visibility&&this.inRange?"":"none"),this.setTileSize())},afterAdd:function(){},removeMap:function(a){},getImageSize:function(a){return this.imageSize||this.tileSize},setTileSize:function(a){this.tileSize=a=a?a:this.tileSize?this.tileSize:this.map.getTileSize();this.gutter&&(this.imageSize=new OpenLayers.Size(a.w+2*this.gutter,a.h+2*this.gutter))},getVisibility:function(){return this.visibility},setVisibility:function(a){a!=this.visibility&&
(this.visibility=a,this.display(a),this.redraw(),null!=this.map&&this.map.events.triggerEvent("changelayer",{layer:this,property:"visibility"}),this.events.triggerEvent("visibilitychanged"))},display:function(a){a!=("none"!=this.div.style.display)&&(this.div.style.display=a&&this.calculateInRange()?"block":"none")},calculateInRange:function(){var a=!1;this.alwaysInRange?a=!0:this.map&&(a=this.map.getResolution(),a=a>=this.minResolution&&a<=this.maxResolution);return a},setIsBaseLayer:function(a){a!=
this.isBaseLayer&&(this.isBaseLayer=a,null!=this.map&&this.map.events.triggerEvent("changebaselayer",{layer:this}))},initResolutions:function(){var a,b,c,d={},e=!0;a=0;for(b=this.RESOLUTION_PROPERTIES.length;a<b;a++)c=this.RESOLUTION_PROPERTIES[a],d[c]=this.options[c],e&&this.options[c]&&(e=!1);null==this.options.alwaysInRange&&(this.alwaysInRange=e);null==d.resolutions&&(d.resolutions=this.resolutionsFromScales(d.scales));null==d.resolutions&&(d.resolutions=this.calculateResolutions(d));if(null==
d.resolutions){a=0;for(b=this.RESOLUTION_PROPERTIES.length;a<b;a++)c=this.RESOLUTION_PROPERTIES[a],d[c]=null!=this.options[c]?this.options[c]:this.map[c];null==d.resolutions&&(d.resolutions=this.resolutionsFromScales(d.scales));null==d.resolutions&&(d.resolutions=this.calculateResolutions(d))}var f;this.options.maxResolution&&"auto"!==this.options.maxResolution&&(f=this.options.maxResolution);this.options.minScale&&(f=OpenLayers.Util.getResolutionFromScale(this.options.minScale,this.units));var g;
this.options.minResolution&&"auto"!==this.options.minResolution&&(g=this.options.minResolution);this.options.maxScale&&(g=OpenLayers.Util.getResolutionFromScale(this.options.maxScale,this.units));d.resolutions&&(d.resolutions.sort(function(a,b){return b-a}),f||(f=d.resolutions[0]),g||(g=d.resolutions[d.resolutions.length-1]));if(this.resolutions=d.resolutions){b=this.resolutions.length;this.scales=Array(b);for(a=0;a<b;a++)this.scales[a]=OpenLayers.Util.getScaleFromResolution(this.resolutions[a],this.units);
this.numZoomLevels=b}if(this.minResolution=g)this.maxScale=OpenLayers.Util.getScaleFromResolution(g,this.units);if(this.maxResolution=f)this.minScale=OpenLayers.Util.getScaleFromResolution(f,this.units)},resolutionsFromScales:function(a){if(null!=a){var b,c,d;d=a.length;b=Array(d);for(c=0;c<d;c++)b[c]=OpenLayers.Util.getResolutionFromScale(a[c],this.units);return b}},calculateResolutions:function(a){var b,c,d=a.maxResolution;null!=a.minScale?d=OpenLayers.Util.getResolutionFromScale(a.minScale,this.units):
"auto"==d&&null!=this.maxExtent&&(b=this.map.getSize(),c=this.maxExtent.getWidth()/b.w,b=this.maxExtent.getHeight()/b.h,d=Math.max(c,b));c=a.minResolution;null!=a.maxScale?c=OpenLayers.Util.getResolutionFromScale(a.maxScale,this.units):"auto"==a.minResolution&&null!=this.minExtent&&(b=this.map.getSize(),c=this.minExtent.getWidth()/b.w,b=this.minExtent.getHeight()/b.h,c=Math.max(c,b));"number"!==typeof d&&"number"!==typeof c&&null!=this.maxExtent&&(d=this.map.getTileSize(),d=Math.max(this.maxExtent.getWidth()/
d.w,this.maxExtent.getHeight()/d.h));b=a.maxZoomLevel;a=a.numZoomLevels;"number"===typeof c&&"number"===typeof d&&void 0===a?a=Math.floor(Math.log(d/c)/Math.log(2))+1:void 0===a&&null!=b&&(a=b+1);if(!("number"!==typeof a||0>=a||"number"!==typeof d&&"number"!==typeof c)){b=Array(a);var e=2;"number"==typeof c&&"number"==typeof d&&(e=Math.pow(d/c,1/(a-1)));var f;if("number"===typeof d)for(f=0;f<a;f++)b[f]=d/Math.pow(e,f);else for(f=0;f<a;f++)b[a-1-f]=c*Math.pow(e,f);return b}},getResolution:function(){var a=
this.map.getZoom();return this.getResolutionForZoom(a)},getExtent:function(){return this.map.calculateBounds()},getZoomForExtent:function(a,b){var c=this.map.getSize(),c=Math.max(a.getWidth()/c.w,a.getHeight()/c.h);return this.getZoomForResolution(c,b)},getDataExtent:function(){},getResolutionForZoom:function(a){a=Math.max(0,Math.min(a,this.resolutions.length-1));if(this.map.fractionalZoom){var b=Math.floor(a);a=this.resolutions[b]-(a-b)*(this.resolutions[b]-this.resolutions[Math.ceil(a)])}else a=
this.resolutions[Math.round(a)];return a},getZoomForResolution:function(a,b){var c,d;if(this.map.fractionalZoom){var e=0,f=this.resolutions[e],g=this.resolutions[this.resolutions.length-1],h;c=0;for(d=this.resolutions.length;c<d;++c)if(h=this.resolutions[c],h>=a&&(f=h,e=c),h<=a){g=h;break}c=f-g;c=0<c?e+(f-a)/c:e}else{f=Number.POSITIVE_INFINITY;c=0;for(d=this.resolutions.length;c<d;c++)if(b){e=Math.abs(this.resolutions[c]-a);if(e>f)break;f=e}else if(this.resolutions[c]<a)break;c=Math.max(0,c-1)}return c},
getLonLatFromViewPortPx:function(a){var b=null,c=this.map;if(null!=a&&c.minPx){var b=c.getResolution(),d=c.getMaxExtent({restricted:!0}),b=new OpenLayers.LonLat((a.x-c.minPx.x)*b+d.left,(c.minPx.y-a.y)*b+d.top);this.wrapDateLine&&(b=b.wrapDateLine(this.maxExtent))}return b},getViewPortPxFromLonLat:function(a,b){var c=null;null!=a&&(b=b||this.map.getResolution(),c=this.map.calculateBounds(null,b),c=new OpenLayers.Pixel(1/b*(a.lon-c.left),1/b*(c.top-a.lat)));return c},setOpacity:function(a){if(a!=this.opacity){this.opacity=
a;for(var b=this.div.childNodes,c=0,d=b.length;c<d;++c){var e=b[c].firstChild||b[c],f=b[c].lastChild;f&&"iframe"===f.nodeName.toLowerCase()&&(e=f.parentNode);OpenLayers.Util.modifyDOMElement(e,null,null,null,null,null,null,a)}null!=this.map&&this.map.events.triggerEvent("changelayer",{layer:this,property:"opacity"})}},getZIndex:function(){return this.div.style.zIndex},setZIndex:function(a){this.div.style.zIndex=a},adjustBounds:function(a){if(this.gutter){var b=this.gutter*this.map.getResolution();
a=new OpenLayers.Bounds(a.left-b,a.bottom-b,a.right+b,a.top+b)}this.wrapDateLine&&(b={rightTolerance:this.getResolution(),leftTolerance:this.getResolution()},a=a.wrapDateLine(this.maxExtent,b));return a},CLASS_NAME:"OpenLayers.Layer"});OpenLayers.Layer.HTTPRequest=OpenLayers.Class(OpenLayers.Layer,{URL_HASH_FACTOR:(Math.sqrt(5)-1)/2,url:null,params:null,reproject:!1,initialize:function(a,b,c,d){OpenLayers.Layer.prototype.initialize.apply(this,[a,d]);this.url=b;this.params||(this.params=OpenLayers.Util.extend({},c))},destroy:function(){this.params=this.url=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments)},clone:function(a){null==a&&(a=new OpenLayers.Layer.HTTPRequest(this.name,this.url,this.params,this.getOptions()));
return a=OpenLayers.Layer.prototype.clone.apply(this,[a])},setUrl:function(a){this.url=a},mergeNewParams:function(a){this.params=OpenLayers.Util.extend(this.params,a);a=this.redraw();null!=this.map&&this.map.events.triggerEvent("changelayer",{layer:this,property:"params"});return a},redraw:function(a){return a?(this.events.triggerEvent("refresh"),this.mergeNewParams({_olSalt:Math.random()})):OpenLayers.Layer.prototype.redraw.apply(this,[])},selectUrl:function(a,b){for(var c=1,d=0,e=a.length;d<e;d++)c*=
a.charCodeAt(d)*this.URL_HASH_FACTOR,c-=Math.floor(c);return b[Math.floor(c*b.length)]},getFullRequestString:function(a,b){var c=b||this.url,d=OpenLayers.Util.extend({},this.params),d=OpenLayers.Util.extend(d,a),e=OpenLayers.Util.getParameterString(d);OpenLayers.Util.isArray(c)&&(c=this.selectUrl(e,c));var e=OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(c)),f;for(f in d)f.toUpperCase()in e&&delete d[f];e=OpenLayers.Util.getParameterString(d);return OpenLayers.Util.urlAppend(c,e)},
CLASS_NAME:"OpenLayers.Layer.HTTPRequest"});OpenLayers.Tile=OpenLayers.Class({events:null,eventListeners:null,id:null,layer:null,url:null,bounds:null,size:null,position:null,isLoading:!1,initialize:function(a,b,c,d,e,f){this.layer=a;this.position=b.clone();this.setBounds(c);this.url=d;e&&(this.size=e.clone());this.id=OpenLayers.Util.createUniqueID("Tile_");OpenLayers.Util.extend(this,f);this.events=new OpenLayers.Events(this);if(this.eventListeners instanceof Object)this.events.on(this.eventListeners)},unload:function(){this.isLoading&&(this.isLoading=
!1,this.events.triggerEvent("unload"))},destroy:function(){this.position=this.size=this.bounds=this.layer=null;this.eventListeners&&this.events.un(this.eventListeners);this.events.destroy();this.events=this.eventListeners=null},draw:function(a){a||this.clear();var b=this.shouldDraw();b&&!a&&!1===this.events.triggerEvent("beforedraw")&&(b=null);return b},shouldDraw:function(){var a=!1,b=this.layer.maxExtent;if(b){var c=this.layer.map,c=c.baseLayer.wrapDateLine&&c.getMaxExtent();this.bounds.intersectsBounds(b,
{inclusive:!1,worldBounds:c})&&(a=!0)}return a||this.layer.displayOutsideMaxExtent},setBounds:function(a){a=a.clone();if(this.layer.map.baseLayer.wrapDateLine){var b=this.layer.map.getMaxExtent(),c=this.layer.map.getResolution();a=a.wrapDateLine(b,{leftTolerance:c,rightTolerance:c})}this.bounds=a},moveTo:function(a,b,c){null==c&&(c=!0);this.setBounds(a);this.position=b.clone();c&&this.draw()},clear:function(a){},CLASS_NAME:"OpenLayers.Tile"});OpenLayers.Tile.Image=OpenLayers.Class(OpenLayers.Tile,{url:null,imgDiv:null,frame:null,imageReloadAttempts:null,layerAlphaHack:null,asyncRequestId:null,maxGetUrlLength:null,canvasContext:null,crossOriginKeyword:null,initialize:function(a,b,c,d,e,f){OpenLayers.Tile.prototype.initialize.apply(this,arguments);this.url=d;this.layerAlphaHack=this.layer.alpha&&OpenLayers.Util.alphaHack();if(null!=this.maxGetUrlLength||this.layer.gutter||this.layerAlphaHack)this.frame=document.createElement("div"),this.frame.style.position=
"absolute",this.frame.style.overflow="hidden";null!=this.maxGetUrlLength&&OpenLayers.Util.extend(this,OpenLayers.Tile.Image.IFrame)},destroy:function(){this.imgDiv&&(this.clear(),this.frame=this.imgDiv=null);this.asyncRequestId=null;OpenLayers.Tile.prototype.destroy.apply(this,arguments)},draw:function(){var a=OpenLayers.Tile.prototype.draw.apply(this,arguments);a?(this.layer!=this.layer.map.baseLayer&&this.layer.reproject&&(this.bounds=this.getBoundsFromBaseLayer(this.position)),this.isLoading?this._loadEvent=
"reload":(this.isLoading=!0,this._loadEvent="loadstart"),this.renderTile(),this.positionTile()):!1===a&&this.unload();return a},renderTile:function(){if(this.layer.async){var a=this.asyncRequestId=(this.asyncRequestId||0)+1;this.layer.getURLasync(this.bounds,function(b){a==this.asyncRequestId&&(this.url=b,this.initImage())},this)}else this.url=this.layer.getURL(this.bounds),this.initImage()},positionTile:function(){var a=this.getTile().style,b=this.frame?this.size:this.layer.getImageSize(this.bounds),
c=1;this.layer instanceof OpenLayers.Layer.Grid&&(c=this.layer.getServerResolution()/this.layer.map.getResolution());a.left=this.position.x+"px";a.top=this.position.y+"px";a.width=Math.round(c*b.w)+"px";a.height=Math.round(c*b.h)+"px"},clear:function(){OpenLayers.Tile.prototype.clear.apply(this,arguments);var a=this.imgDiv;if(a){var b=this.getTile();b.parentNode===this.layer.div&&this.layer.div.removeChild(b);this.setImgSrc();!0===this.layerAlphaHack&&(a.style.filter="");OpenLayers.Element.removeClass(a,
"olImageLoadError")}this.canvasContext=null},getImage:function(){if(!this.imgDiv){this.imgDiv=OpenLayers.Tile.Image.IMAGE.cloneNode(!1);var a=this.imgDiv.style;if(this.frame){var b=0,c=0;this.layer.gutter&&(b=this.layer.gutter/this.layer.tileSize.w*100,c=this.layer.gutter/this.layer.tileSize.h*100);a.left=-b+"%";a.top=-c+"%";a.width=2*b+100+"%";a.height=2*c+100+"%"}a.visibility="hidden";a.opacity=0;1>this.layer.opacity&&(a.filter="alpha(opacity="+100*this.layer.opacity+")");a.position="absolute";
this.layerAlphaHack&&(a.paddingTop=a.height,a.height="0",a.width="100%");this.frame&&this.frame.appendChild(this.imgDiv)}return this.imgDiv},setImage:function(a){this.imgDiv=a},initImage:function(){if(this.url||this.imgDiv){this.events.triggerEvent("beforeload");this.layer.div.appendChild(this.getTile());this.events.triggerEvent(this._loadEvent);var a=this.getImage(),b=a.getAttribute("src")||"";this.url&&OpenLayers.Util.isEquivalentUrl(b,this.url)?this._loadTimeout=window.setTimeout(OpenLayers.Function.bind(this.onImageLoad,
this),0):(this.stopLoading(),this.crossOriginKeyword&&a.removeAttribute("crossorigin"),OpenLayers.Event.observe(a,"load",OpenLayers.Function.bind(this.onImageLoad,this)),OpenLayers.Event.observe(a,"error",OpenLayers.Function.bind(this.onImageError,this)),this.imageReloadAttempts=0,this.setImgSrc(this.url))}else this.isLoading=!1},setImgSrc:function(a){var b=this.imgDiv;a?(b.style.visibility="hidden",b.style.opacity=0,this.crossOriginKeyword&&("data:"!==a.substr(0,5)?b.setAttribute("crossorigin",this.crossOriginKeyword):
b.removeAttribute("crossorigin")),b.src=a):(this.stopLoading(),this.imgDiv=null,b.parentNode&&b.parentNode.removeChild(b))},getTile:function(){return this.frame?this.frame:this.getImage()},createBackBuffer:function(){if(this.imgDiv&&!this.isLoading){var a;this.frame?(a=this.frame.cloneNode(!1),a.appendChild(this.imgDiv)):a=this.imgDiv;this.imgDiv=null;return a}},onImageLoad:function(){var a=this.imgDiv;this.stopLoading();a.style.visibility="inherit";a.style.opacity=this.layer.opacity;this.isLoading=
!1;this.canvasContext=null;this.events.triggerEvent("loadend");!0===this.layerAlphaHack&&(a.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+a.src+"', sizingMethod='scale')")},onImageError:function(){var a=this.imgDiv;null!=a.src&&(this.imageReloadAttempts++,this.imageReloadAttempts<=OpenLayers.IMAGE_RELOAD_ATTEMPTS?this.setImgSrc(this.layer.getURL(this.bounds)):(OpenLayers.Element.addClass(a,"olImageLoadError"),this.events.triggerEvent("loaderror"),this.onImageLoad()))},stopLoading:function(){OpenLayers.Event.stopObservingElement(this.imgDiv);
window.clearTimeout(this._loadTimeout);delete this._loadTimeout},getCanvasContext:function(){if(OpenLayers.CANVAS_SUPPORTED&&this.imgDiv&&!this.isLoading){if(!this.canvasContext){var a=document.createElement("canvas");a.width=this.size.w;a.height=this.size.h;this.canvasContext=a.getContext("2d");this.canvasContext.drawImage(this.imgDiv,0,0)}return this.canvasContext}},CLASS_NAME:"OpenLayers.Tile.Image"});
OpenLayers.Tile.Image.IMAGE=function(){var a=new Image;a.className="olTileImage";a.galleryImg="no";return a}();OpenLayers.Layer.Grid=OpenLayers.Class(OpenLayers.Layer.HTTPRequest,{tileSize:null,tileOriginCorner:"bl",tileOrigin:null,tileOptions:null,tileClass:OpenLayers.Tile.Image,grid:null,singleTile:!1,ratio:1.5,buffer:0,transitionEffect:"resize",numLoadingTiles:0,serverResolutions:null,loading:!1,backBuffer:null,gridResolution:null,backBufferResolution:null,backBufferLonLat:null,backBufferTimerId:null,removeBackBufferDelay:null,className:null,gridLayout:null,rowSign:null,transitionendEvents:["transitionend",
"webkitTransitionEnd","otransitionend","oTransitionEnd"],initialize:function(a,b,c,d){OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this,arguments);this.grid=[];this._removeBackBuffer=OpenLayers.Function.bind(this.removeBackBuffer,this);this.initProperties();this.rowSign="t"===this.tileOriginCorner.substr(0,1)?1:-1},initProperties:function(){void 0===this.options.removeBackBufferDelay&&(this.removeBackBufferDelay=this.singleTile?0:2500);void 0===this.options.className&&(this.className=this.singleTile?
"olLayerGridSingleTile":"olLayerGrid")},setMap:function(a){OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this,a);OpenLayers.Element.addClass(this.div,this.className)},removeMap:function(a){this.removeBackBuffer()},destroy:function(){this.removeBackBuffer();this.clearGrid();this.tileSize=this.grid=null;OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this,arguments)},clearGrid:function(){if(this.grid){for(var a=0,b=this.grid.length;a<b;a++)for(var c=this.grid[a],d=0,e=c.length;d<e;d++)this.destroyTile(c[d]);
this.grid=[];this.gridLayout=this.gridResolution=null}},addOptions:function(a,b){var c=void 0!==a.singleTile&&a.singleTile!==this.singleTile;OpenLayers.Layer.HTTPRequest.prototype.addOptions.apply(this,arguments);this.map&&c&&(this.initProperties(),this.clearGrid(),this.tileSize=this.options.tileSize,this.setTileSize(),this.visibility&&this.moveTo(null,!0))},clone:function(a){null==a&&(a=new OpenLayers.Layer.Grid(this.name,this.url,this.params,this.getOptions()));a=OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this,
[a]);null!=this.tileSize&&(a.tileSize=this.tileSize.clone());a.grid=[];a.gridResolution=null;a.backBuffer=null;a.backBufferTimerId=null;a.loading=!1;a.numLoadingTiles=0;return a},moveTo:function(a,b,c){OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this,arguments);a=a||this.map.getExtent();if(null!=a){var d=!this.grid.length||b,e=this.getTilesBounds(),f=this.map.getResolution();this.getServerResolution(f);if(this.singleTile){if(d||!c&&!e.containsBounds(a))b&&"resize"!==this.transitionEffect&&
this.removeBackBuffer(),b&&"resize"!==this.transitionEffect||this.applyBackBuffer(f),this.initSingleTile(a)}else(d=d||!e.intersectsBounds(a,{worldBounds:this.map.baseLayer.wrapDateLine&&this.map.getMaxExtent()}))?(!b||"resize"!==this.transitionEffect&&this.gridResolution!==f||this.applyBackBuffer(f),this.initGriddedTiles(a)):this.moveGriddedTiles()}},getTileData:function(a){var b=null,c=a.lon,d=a.lat,e=this.grid.length;if(this.map&&e){var f=this.map.getResolution();a=this.tileSize.w;var g=this.tileSize.h,
h=this.grid[0][0].bounds,k=h.left,h=h.top;if(c<k&&this.map.baseLayer.wrapDateLine)var l=this.map.getMaxExtent().getWidth(),c=c+l*Math.ceil((k-c)/l);c=(c-k)/(f*a);d=(h-d)/(f*g);f=Math.floor(c);k=Math.floor(d);0<=k&&k<e&&(e=this.grid[k][f])&&(b={tile:e,i:Math.floor((c-f)*a),j:Math.floor((d-k)*g)})}return b},destroyTile:function(a){this.removeTileMonitoringHooks(a);a.destroy()},getServerResolution:function(a){var b=Number.POSITIVE_INFINITY;a=a||this.map.getResolution();if(this.serverResolutions&&-1===
OpenLayers.Util.indexOf(this.serverResolutions,a)){var c,d,e,f;for(c=this.serverResolutions.length-1;0<=c;c--){e=this.serverResolutions[c];d=Math.abs(e-a);if(d>b)break;b=d;f=e}a=f}return a},getServerZoom:function(){var a=this.getServerResolution();return this.serverResolutions?OpenLayers.Util.indexOf(this.serverResolutions,a):this.map.getZoomForResolution(a)+(this.zoomOffset||0)},applyBackBuffer:function(a){null!==this.backBufferTimerId&&this.removeBackBuffer();var b=this.backBuffer;if(!b){b=this.createBackBuffer();
if(!b)return;a===this.gridResolution?this.div.insertBefore(b,this.div.firstChild):this.map.baseLayer.div.parentNode.insertBefore(b,this.map.baseLayer.div);this.backBuffer=b;var c=this.grid[0][0].bounds;this.backBufferLonLat={lon:c.left,lat:c.top};this.backBufferResolution=this.gridResolution}for(var c=this.backBufferResolution/a,d=b.childNodes,e,f=d.length-1;0<=f;--f)e=d[f],e.style.top=(c*e._i*b._th|0)+"px",e.style.left=(c*e._j*b._tw|0)+"px",e.style.width=Math.round(c*e._w)+"px",e.style.height=Math.round(c*
e._h)+"px";a=this.getViewPortPxFromLonLat(this.backBufferLonLat,a);c=this.map.layerContainerOriginPx.y;b.style.left=Math.round(a.x-this.map.layerContainerOriginPx.x)+"px";b.style.top=Math.round(a.y-c)+"px"},createBackBuffer:function(){var a;if(0<this.grid.length){a=document.createElement("div");a.id=this.div.id+"_bb";a.className="olBackBuffer";a.style.position="absolute";var b=this.map;a.style.zIndex="resize"===this.transitionEffect?this.getZIndex()-1:b.Z_INDEX_BASE.BaseLayer-(b.getNumLayers()-b.getLayerIndex(this));
for(var b=0,c=this.grid.length;b<c;b++)for(var d=0,e=this.grid[b].length;d<e;d++){var f=this.grid[b][d],g=this.grid[b][d].createBackBuffer();g&&(g._i=b,g._j=d,g._w=this.singleTile?this.getImageSize(f.bounds).w:f.size.w,g._h=f.size.h,g.id=f.id+"_bb",a.appendChild(g))}a._tw=this.tileSize.w;a._th=this.tileSize.h}return a},removeBackBuffer:function(){if(this._transitionElement){for(var a=this.transitionendEvents.length-1;0<=a;--a)OpenLayers.Event.stopObserving(this._transitionElement,this.transitionendEvents[a],
this._removeBackBuffer);delete this._transitionElement}this.backBuffer&&(this.backBuffer.parentNode&&this.backBuffer.parentNode.removeChild(this.backBuffer),this.backBufferResolution=this.backBuffer=null,null!==this.backBufferTimerId&&(window.clearTimeout(this.backBufferTimerId),this.backBufferTimerId=null))},moveByPx:function(a,b){this.singleTile||this.moveGriddedTiles()},setTileSize:function(a){this.singleTile&&(a=this.map.getSize(),a.h=parseInt(a.h*this.ratio,10),a.w=parseInt(a.w*this.ratio,10));
OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this,[a])},getTilesBounds:function(){var a=null,b=this.grid.length;if(b)var a=this.grid[b-1][0].bounds,b=this.grid[0].length*a.getWidth(),c=this.grid.length*a.getHeight(),a=new OpenLayers.Bounds(a.left,a.bottom,a.left+b,a.bottom+c);return a},initSingleTile:function(a){this.events.triggerEvent("retile");var b=a.getCenterLonLat(),c=a.getWidth()*this.ratio;a=a.getHeight()*this.ratio;b=new OpenLayers.Bounds(b.lon-c/2,b.lat-a/2,b.lon+c/2,b.lat+a/
2);this.gridResolution=this.getServerResolution();(c=this.maxExtent)&&(!this.displayOutsideMaxExtent||this.map.baseLayer.wrapDateLine&&this.maxExtent.equals(this.map.getMaxExtent()))&&(b.left=Math.max(b.left,c.left),b.right=Math.min(b.right,c.right));c=this.map.getLayerPxFromLonLat({lon:b.left,lat:b.top});this.grid.length||(this.grid[0]=[]);(a=this.grid[0][0])?a.moveTo(b,c):(a=this.addTile(b,c),this.addTileMonitoringHooks(a),a.draw(),this.grid[0][0]=a);this.removeExcessTiles(1,1)},calculateGridLayout:function(a,
b,c){var d=c*this.tileSize.w;c*=this.tileSize.h;var e=Math.floor((a.left-b.lon)/d)-this.buffer,f=this.rowSign;a=Math[~f?"floor":"ceil"](f*(b.lat-a.top+c)/c)-this.buffer*f;return{tilelon:d,tilelat:c,startcol:e,startrow:a}},getImageSize:function(a){var b=OpenLayers.Layer.HTTPRequest.prototype.getImageSize.apply(this,arguments);this.singleTile&&(b=new OpenLayers.Size(Math.round(a.getWidth()/this.gridResolution),b.h));return b},getTileOrigin:function(){var a=this.tileOrigin;if(!a)var a=this.getMaxExtent(),
b={tl:["left","top"],tr:["right","top"],bl:["left","bottom"],br:["right","bottom"]}[this.tileOriginCorner],a=new OpenLayers.LonLat(a[b[0]],a[b[1]]);return a},getTileBoundsForGridIndex:function(a,b){var c=this.getTileOrigin(),d=this.gridLayout,e=d.tilelon,f=d.tilelat,g=d.startcol,d=d.startrow,h=this.rowSign;return new OpenLayers.Bounds(c.lon+(g+b)*e,c.lat-(d+a*h)*f*h,c.lon+(g+b+1)*e,c.lat-(d+(a-1)*h)*f*h)},initGriddedTiles:function(a){this.events.triggerEvent("retile");var b=this.map.getSize(),c=this.getTileOrigin(),
d=this.map.getResolution(),e=this.getServerResolution(),f=d/e,d=this.tileSize.w/f,f=this.tileSize.h/f,g=Math.ceil(b.h/f)+2*this.buffer+1,b=Math.ceil(b.w/d)+2*this.buffer+1;this.gridLayout=e=this.calculateGridLayout(a,c,e);var c=e.tilelon,h=e.tilelat,e=this.map.layerContainerOriginPx.x,k=this.map.layerContainerOriginPx.y,l=this.getTileBoundsForGridIndex(0,0),m=this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(l.left,l.top));m.x=Math.round(m.x)-e;m.y=Math.round(m.y)-k;var e=[],k=this.map.getCenter(),
r=0;do{var q=this.grid[r];q||(q=[],this.grid.push(q));var n=0;do{var l=this.getTileBoundsForGridIndex(r,n),p=m.clone();p.x+=n*Math.round(d);p.y+=r*Math.round(f);var t=q[n];t?t.moveTo(l,p,!1):(t=this.addTile(l,p),this.addTileMonitoringHooks(t),q.push(t));p=l.getCenterLonLat();e.push({tile:t,distance:Math.pow(p.lon-k.lon,2)+Math.pow(p.lat-k.lat,2)});n+=1}while(l.right<=a.right+c*this.buffer||n<b);r+=1}while(l.bottom>=a.bottom-h*this.buffer||r<g);this.removeExcessTiles(r,n);this.gridResolution=d=this.getServerResolution();
e.sort(function(a,b){return a.distance-b.distance});a=0;for(d=e.length;a<d;++a)e[a].tile.draw()},getMaxExtent:function(){return this.maxExtent},addTile:function(a,b){var c=new this.tileClass(this,b,a,null,this.tileSize,this.tileOptions);this.events.triggerEvent("addtile",{tile:c});return c},addTileMonitoringHooks:function(a){a.onLoadStart=function(){!1===this.loading&&(this.loading=!0,this.events.triggerEvent("loadstart"));this.events.triggerEvent("tileloadstart",{tile:a});this.numLoadingTiles++;
!this.singleTile&&this.backBuffer&&this.gridResolution===this.backBufferResolution&&OpenLayers.Element.addClass(a.getTile(),"olTileReplacing")};a.onLoadEnd=function(b){this.numLoadingTiles--;b="unload"===b.type;this.events.triggerEvent("tileloaded",{tile:a,aborted:b});if(!this.singleTile&&!b&&this.backBuffer&&this.gridResolution===this.backBufferResolution){var c=a.getTile();if("none"===OpenLayers.Element.getStyle(c,"display")){var d=document.getElementById(a.id+"_bb");d&&d.parentNode.removeChild(d)}OpenLayers.Element.removeClass(c,
"olTileReplacing")}if(0===this.numLoadingTiles){if(this.backBuffer)if(0===this.backBuffer.childNodes.length)this.removeBackBuffer();else{this._transitionElement=b?this.div.lastChild:a.imgDiv;b=this.transitionendEvents;if(this._transitionElement)for(c=b.length-1;0<=c;--c)OpenLayers.Event.observe(this._transitionElement,b[c],this._removeBackBuffer);this.backBufferTimerId=window.setTimeout(this._removeBackBuffer,this.removeBackBufferDelay)}this.loading=!1;this.events.triggerEvent("loadend")}};a.onLoadError=
function(){this.events.triggerEvent("tileerror",{tile:a})};a.events.on({loadstart:a.onLoadStart,loadend:a.onLoadEnd,unload:a.onLoadEnd,loaderror:a.onLoadError,scope:this})},removeTileMonitoringHooks:function(a){a.unload();a.events.un({loadstart:a.onLoadStart,loadend:a.onLoadEnd,unload:a.onLoadEnd,loaderror:a.onLoadError,scope:this})},moveGriddedTiles:function(){for(var a=this.buffer+1;;){var b=this.grid[0][0],c=b.position.x+this.map.layerContainerOriginPx.x,b=b.position.y+this.map.layerContainerOriginPx.y,
d=this.getServerResolution()/this.map.getResolution(),d={w:Math.round(this.tileSize.w*d),h:Math.round(this.tileSize.h*d)};if(c>-d.w*(a-1))this.shiftColumn(!0,d);else if(c<-d.w*a)this.shiftColumn(!1,d);else if(b>-d.h*(a-1))this.shiftRow(!0,d);else if(b<-d.h*a)this.shiftRow(!1,d);else break}},shiftRow:function(a,b){var c=this.grid,d=a?0:c.length-1,e=a?-1:1;this.gridLayout.startrow+=e*this.rowSign;for(var f=c[d],g=c[a?"pop":"shift"](),h=0,k=g.length;h<k;h++){var l=g[h],m=f[h].position.clone();m.y+=b.h*
e;l.moveTo(this.getTileBoundsForGridIndex(d,h),m)}c[a?"unshift":"push"](g)},shiftColumn:function(a,b){var c=this.grid,d=a?0:c[0].length-1,e=a?-1:1;this.gridLayout.startcol+=e;for(var f=0,g=c.length;f<g;f++){var h=c[f],k=h[d].position.clone(),l=h[a?"pop":"shift"]();k.x+=b.w*e;l.moveTo(this.getTileBoundsForGridIndex(f,d),k);h[a?"unshift":"push"](l)}},removeExcessTiles:function(a,b){for(var c,d;this.grid.length>a;){var e=this.grid.pop();c=0;for(d=e.length;c<d;c++){var f=e[c];this.destroyTile(f)}}c=0;
for(d=this.grid.length;c<d;c++)for(;this.grid[c].length>b;)e=this.grid[c],f=e.pop(),this.destroyTile(f)},onMapResize:function(){this.singleTile&&(this.clearGrid(),this.setTileSize())},getTileBounds:function(a){var b=this.maxExtent,c=this.getResolution(),d=c*this.tileSize.w,c=c*this.tileSize.h,e=this.getLonLatFromViewPortPx(a);a=b.left+d*Math.floor((e.lon-b.left)/d);b=b.bottom+c*Math.floor((e.lat-b.bottom)/c);return new OpenLayers.Bounds(a,b,a+d,b+c)},CLASS_NAME:"OpenLayers.Layer.Grid"});OpenLayers.TileManager=OpenLayers.Class({cacheSize:256,tilesPerFrame:2,frameDelay:16,moveDelay:100,zoomDelay:200,maps:null,tileQueueId:null,tileQueue:null,tileCache:null,tileCacheIndex:null,initialize:function(a){OpenLayers.Util.extend(this,a);this.maps=[];this.tileQueueId={};this.tileQueue={};this.tileCache={};this.tileCacheIndex=[]},addMap:function(a){if(!this._destroyed&&OpenLayers.Layer.Grid){this.maps.push(a);this.tileQueue[a.id]=[];for(var b=0,c=a.layers.length;b<c;++b)this.addLayer({layer:a.layers[b]});
a.events.on({move:this.move,zoomend:this.zoomEnd,changelayer:this.changeLayer,addlayer:this.addLayer,preremovelayer:this.removeLayer,scope:this})}},removeMap:function(a){if(!this._destroyed&&OpenLayers.Layer.Grid){window.clearTimeout(this.tileQueueId[a.id]);if(a.layers)for(var b=0,c=a.layers.length;b<c;++b)this.removeLayer({layer:a.layers[b]});a.events&&a.events.un({move:this.move,zoomend:this.zoomEnd,changelayer:this.changeLayer,addlayer:this.addLayer,preremovelayer:this.removeLayer,scope:this});
delete this.tileQueue[a.id];delete this.tileQueueId[a.id];OpenLayers.Util.removeItem(this.maps,a)}},move:function(a){this.updateTimeout(a.object,this.moveDelay,!0)},zoomEnd:function(a){this.updateTimeout(a.object,this.zoomDelay)},changeLayer:function(a){"visibility"!==a.property&&"params"!==a.property||this.updateTimeout(a.object,0)},addLayer:function(a){a=a.layer;if(a instanceof OpenLayers.Layer.Grid){a.events.on({addtile:this.addTile,refresh:this.handleLayerRefresh,retile:this.clearTileQueue,scope:this});
var b,c,d;for(b=a.grid.length-1;0<=b;--b)for(c=a.grid[b].length-1;0<=c;--c)d=a.grid[b][c],this.addTile({tile:d}),d.url&&!d.imgDiv&&this.manageTileCache({object:d})}},removeLayer:function(a){a=a.layer;if(a instanceof OpenLayers.Layer.Grid&&(this.clearTileQueue({object:a}),a.events&&a.events.un({addtile:this.addTile,refresh:this.handleLayerRefresh,retile:this.clearTileQueue,scope:this}),a.grid)){var b,c,d;for(b=a.grid.length-1;0<=b;--b)for(c=a.grid[b].length-1;0<=c;--c)d=a.grid[b][c],this.unloadTile({object:d})}},
handleLayerRefresh:function(a){a=a.object;if(a.grid){var b,c,d;for(b=a.grid.length-1;0<=b;--b)for(c=a.grid[b].length-1;0<=c;--c)d=a.grid[b][c],OpenLayers.Util.removeItem(this.tileCacheIndex,d.url),delete this.tileCache[d.url]}},updateTimeout:function(a,b,c){window.clearTimeout(this.tileQueueId[a.id]);var d=this.tileQueue[a.id];if(!c||d.length)this.tileQueueId[a.id]=window.setTimeout(OpenLayers.Function.bind(function(){this.drawTilesFromQueue(a);d.length&&this.updateTimeout(a,this.frameDelay)},this),
b)},addTile:function(a){if(a.tile instanceof OpenLayers.Tile.Image){if(!a.tile.layer.singleTile)a.tile.events.on({beforedraw:this.queueTileDraw,beforeload:this.manageTileCache,loadend:this.addToCache,unload:this.unloadTile,scope:this})}else this.removeLayer({layer:a.tile.layer})},unloadTile:function(a){a=a.object;a.events.un({beforedraw:this.queueTileDraw,beforeload:this.manageTileCache,loadend:this.addToCache,unload:this.unloadTile,scope:this});OpenLayers.Util.removeItem(this.tileQueue[a.layer.map.id],
a)},queueTileDraw:function(a){a=a.object;var b=!1,c=a.layer,d=c.getURL(a.bounds),e=this.tileCache[d];e&&"olTileImage"!==e.className&&(delete this.tileCache[d],OpenLayers.Util.removeItem(this.tileCacheIndex,d),e=null);!c.url||!c.async&&e||(b=this.tileQueue[c.map.id],~OpenLayers.Util.indexOf(b,a)||b.push(a),b=!0);return!b},drawTilesFromQueue:function(a){var b=this.tileQueue[a.id],c=this.tilesPerFrame;for(a=a.zoomTween&&a.zoomTween.playing;!a&&b.length&&c;)b.shift().draw(!0),--c},manageTileCache:function(a){a=
a.object;var b=this.tileCache[a.url];b&&(b.parentNode&&OpenLayers.Element.hasClass(b.parentNode,"olBackBuffer")&&(b.parentNode.removeChild(b),b.id=null),b.parentNode||(b.style.visibility="hidden",b.style.opacity=0,a.setImage(b),OpenLayers.Util.removeItem(this.tileCacheIndex,a.url),this.tileCacheIndex.push(a.url)))},addToCache:function(a){a=a.object;this.tileCache[a.url]||OpenLayers.Element.hasClass(a.imgDiv,"olImageLoadError")||(this.tileCacheIndex.length>=this.cacheSize&&(delete this.tileCache[this.tileCacheIndex[0]],
this.tileCacheIndex.shift()),this.tileCache[a.url]=a.imgDiv,this.tileCacheIndex.push(a.url))},clearTileQueue:function(a){a=a.object;for(var b=this.tileQueue[a.map.id],c=b.length-1;0<=c;--c)b[c].layer===a&&b.splice(c,1)},destroy:function(){for(var a=this.maps.length-1;0<=a;--a)this.removeMap(this.maps[a]);this.tileCacheIndex=this.tileCache=this.tileQueueId=this.tileQueue=this.maps=null;this._destroyed=!0}});OpenLayers.Renderer=OpenLayers.Class({container:null,root:null,extent:null,locked:!1,size:null,resolution:null,map:null,featureDx:0,initialize:function(a,b){this.container=OpenLayers.Util.getElement(a);OpenLayers.Util.extend(this,b)},destroy:function(){this.map=this.resolution=this.size=this.extent=this.container=null},supported:function(){return!1},setExtent:function(a,b){this.extent=a.clone();if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){var c=a.getWidth()/this.map.getExtent().getWidth();
a=a.scale(1/c);this.extent=a.wrapDateLine(this.map.getMaxExtent()).scale(c)}b&&(this.resolution=null);return!0},setSize:function(a){this.size=a.clone();this.resolution=null},getResolution:function(){return this.resolution=this.resolution||this.map.getResolution()},drawFeature:function(a,b){null==b&&(b=a.style);if(a.geometry){var c=a.geometry.getBounds();if(c){var d;this.map.baseLayer&&this.map.baseLayer.wrapDateLine&&(d=this.map.getMaxExtent());c.intersectsBounds(this.extent,{worldBounds:d})?this.calculateFeatureDx(c,
d):b={display:"none"};c=this.drawGeometry(a.geometry,b,a.id);if("none"!=b.display&&b.label&&!1!==c){d=a.geometry.getCentroid();if(b.labelXOffset||b.labelYOffset){var e=isNaN(b.labelXOffset)?0:b.labelXOffset,f=isNaN(b.labelYOffset)?0:b.labelYOffset,g=this.getResolution();d.move(e*g,f*g)}this.drawText(a.id,b,d)}else this.removeText(a.id);return c}}},calculateFeatureDx:function(a,b){this.featureDx=0;if(b){var c=b.getWidth();this.featureDx=Math.round(((a.left+a.right)/2-(this.extent.left+this.extent.right)/
2)/c)*c}},drawGeometry:function(a,b,c){},drawText:function(a,b,c){},removeText:function(a){},clear:function(){},getFeatureIdFromEvent:function(a){},eraseFeatures:function(a){OpenLayers.Util.isArray(a)||(a=[a]);for(var b=0,c=a.length;b<c;++b){var d=a[b];this.eraseGeometry(d.geometry,d.id);this.removeText(d.id)}},eraseGeometry:function(a,b){},moveRoot:function(a){},getRenderLayerId:function(){return this.container.id},applyDefaultSymbolizer:function(a){var b=OpenLayers.Util.extend({},OpenLayers.Renderer.defaultSymbolizer);
!1===a.stroke&&(delete b.strokeWidth,delete b.strokeColor);!1===a.fill&&delete b.fillColor;OpenLayers.Util.extend(b,a);return b},CLASS_NAME:"OpenLayers.Renderer"});OpenLayers.Renderer.defaultSymbolizer={fillColor:"#000000",strokeColor:"#000000",strokeWidth:2,fillOpacity:1,strokeOpacity:1,pointRadius:0,labelAlign:"cm"};
OpenLayers.Renderer.symbol={star:[350,75,379,161,469,161,397,215,423,301,350,250,277,301,303,215,231,161,321,161,350,75],cross:[4,0,6,0,6,4,10,4,10,6,6,6,6,10,4,10,4,6,0,6,0,4,4,4,4,0],x:[0,0,25,0,50,35,75,0,100,0,65,50,100,100,75,100,50,65,25,100,0,100,35,50,0,0],square:[0,0,0,1,1,1,1,0,0,0],triangle:[0,10,10,10,5,0,0,10]};OpenLayers.Renderer.Canvas=OpenLayers.Class(OpenLayers.Renderer,{hitDetection:!0,hitOverflow:0,canvas:null,features:null,pendingRedraw:!1,cachedSymbolBounds:{},initialize:function(a,b){OpenLayers.Renderer.prototype.initialize.apply(this,arguments);this.root=document.createElement("canvas");this.container.appendChild(this.root);this.canvas=this.root.getContext("2d");this._clearRectId=OpenLayers.Util.createUniqueID();this.features={};this.hitDetection&&(this.hitCanvas=document.createElement("canvas"),
this.hitContext=this.hitCanvas.getContext("2d"))},setExtent:function(){OpenLayers.Renderer.prototype.setExtent.apply(this,arguments);return!1},eraseGeometry:function(a,b){this.eraseFeatures(this.features[b][0])},supported:function(){return OpenLayers.CANVAS_SUPPORTED},setSize:function(a){this.size=a.clone();var b=this.root;b.style.width=a.w+"px";b.style.height=a.h+"px";b.width=a.w;b.height=a.h;this.resolution=null;this.hitDetection&&(b=this.hitCanvas,b.style.width=a.w+"px",b.style.height=a.h+"px",
b.width=a.w,b.height=a.h)},drawFeature:function(a,b){var c;if(a.geometry){b=this.applyDefaultSymbolizer(b||a.style);c=a.geometry.getBounds();var d;this.map.baseLayer&&this.map.baseLayer.wrapDateLine&&(d=this.map.getMaxExtent());d=c&&c.intersectsBounds(this.extent,{worldBounds:d});(c="none"!==b.display&&!!c&&d)?this.features[a.id]=[a,b]:delete this.features[a.id];this.pendingRedraw=!0}this.pendingRedraw&&!this.locked&&(this.redraw(),this.pendingRedraw=!1);return c},drawGeometry:function(a,b,c){var d=
a.CLASS_NAME;if("OpenLayers.Geometry.Collection"==d||"OpenLayers.Geometry.MultiPoint"==d||"OpenLayers.Geometry.MultiLineString"==d||"OpenLayers.Geometry.MultiPolygon"==d)for(var d=this.map.baseLayer&&this.map.baseLayer.wrapDateLine&&this.map.getMaxExtent(),e=0;e<a.components.length;e++)this.calculateFeatureDx(a.components[e].getBounds(),d),this.drawGeometry(a.components[e],b,c);else switch(a.CLASS_NAME){case "OpenLayers.Geometry.Point":this.drawPoint(a,b,c);break;case "OpenLayers.Geometry.LineString":this.drawLineString(a,
b,c);break;case "OpenLayers.Geometry.LinearRing":this.drawLinearRing(a,b,c);break;case "OpenLayers.Geometry.Polygon":this.drawPolygon(a,b,c)}},drawExternalGraphic:function(a,b,c){var d=new Image,e=b.title||b.graphicTitle;e&&(d.title=e);var f=b.graphicWidth||b.graphicHeight,g=b.graphicHeight||b.graphicWidth,f=f?f:2*b.pointRadius,g=g?g:2*b.pointRadius,h=void 0!=b.graphicXOffset?b.graphicXOffset:-(.5*f),k=void 0!=b.graphicYOffset?b.graphicYOffset:-(.5*g),l=this._clearRectId,m=b.graphicOpacity||b.fillOpacity;
d.onload=OpenLayers.Function.bind(function(){if(this.features[c]&&l===this._clearRectId){var b=this.getLocalXY(a),e=b[0],b=b[1];if(!isNaN(e)&&!isNaN(b)){var e=e+h|0,b=b+k|0,n=this.canvas;n.globalAlpha=m;var p=OpenLayers.Renderer.Canvas.drawImageScaleFactor||(OpenLayers.Renderer.Canvas.drawImageScaleFactor=/android 2.1/.test(navigator.userAgent.toLowerCase())?320/window.screen.width:1);n.drawImage(d,e*p,b*p,f*p,g*p);this.hitDetection&&(this.setHitContextStyle("fill",c),this.hitContext.fillRect(e,b,
f,g))}}},this);d.src=b.externalGraphic;d.complete&&(d.onload(),d.onload=null)},drawNamedSymbol:function(a,b,c){var d,e,f,g;f=Math.PI/180;var h=OpenLayers.Renderer.symbol[b.graphicName];if(!h)throw Error(b.graphicName+" is not a valid symbol name");if(!(!h.length||2>h.length||(a=this.getLocalXY(a),e=a[0],g=a[1],isNaN(e)||isNaN(g)))){this.canvas.lineCap="round";this.canvas.lineJoin="round";this.hitDetection&&(this.hitContext.lineCap="round",this.hitContext.lineJoin="round");if(b.graphicName in this.cachedSymbolBounds)d=
this.cachedSymbolBounds[b.graphicName];else{d=new OpenLayers.Bounds;for(a=0;a<h.length;a+=2)d.extend(new OpenLayers.LonLat(h[a],h[a+1]));this.cachedSymbolBounds[b.graphicName]=d}this.canvas.save();this.hitDetection&&this.hitContext.save();this.canvas.translate(e,g);this.hitDetection&&this.hitContext.translate(e,g);a=f*b.rotation;isNaN(a)||(this.canvas.rotate(a),this.hitDetection&&this.hitContext.rotate(a));f=2*b.pointRadius/Math.max(d.getWidth(),d.getHeight());this.canvas.scale(f,f);this.hitDetection&&
this.hitContext.scale(f,f);a=d.getCenterLonLat().lon;d=d.getCenterLonLat().lat;this.canvas.translate(-a,-d);this.hitDetection&&this.hitContext.translate(-a,-d);g=b.strokeWidth;b.strokeWidth=g/f;if(!1!==b.fill){this.setCanvasStyle("fill",b);this.canvas.beginPath();for(a=0;a<h.length;a+=2)d=h[a],e=h[a+1],0==a&&this.canvas.moveTo(d,e),this.canvas.lineTo(d,e);this.canvas.closePath();this.canvas.fill();if(this.hitDetection){this.setHitContextStyle("fill",c,b);this.hitContext.beginPath();for(a=0;a<h.length;a+=
2)d=h[a],e=h[a+1],0==a&&this.canvas.moveTo(d,e),this.hitContext.lineTo(d,e);this.hitContext.closePath();this.hitContext.fill()}}if(!1!==b.stroke){this.setCanvasStyle("stroke",b);this.canvas.beginPath();for(a=0;a<h.length;a+=2)d=h[a],e=h[a+1],0==a&&this.canvas.moveTo(d,e),this.canvas.lineTo(d,e);this.canvas.closePath();this.canvas.stroke();if(this.hitDetection){this.setHitContextStyle("stroke",c,b,f);this.hitContext.beginPath();for(a=0;a<h.length;a+=2)d=h[a],e=h[a+1],0==a&&this.hitContext.moveTo(d,
e),this.hitContext.lineTo(d,e);this.hitContext.closePath();this.hitContext.stroke()}}b.strokeWidth=g;this.canvas.restore();this.hitDetection&&this.hitContext.restore();this.setCanvasStyle("reset")}},setCanvasStyle:function(a,b){"fill"===a?(this.canvas.globalAlpha=b.fillOpacity,this.canvas.fillStyle=b.fillColor):"stroke"===a?(this.canvas.globalAlpha=b.strokeOpacity,this.canvas.strokeStyle=b.strokeColor,this.canvas.lineWidth=b.strokeWidth):(this.canvas.globalAlpha=0,this.canvas.lineWidth=1)},featureIdToHex:function(a){a=
Number(a.split("_").pop())+1;16777216<=a&&(this.hitOverflow=a-16777215,a=a%16777216+1);a="000000"+a.toString(16);var b=a.length;return a="#"+a.substring(b-6,b)},setHitContextStyle:function(a,b,c,d){b=this.featureIdToHex(b);"fill"==a?(this.hitContext.globalAlpha=1,this.hitContext.fillStyle=b):"stroke"==a?(this.hitContext.globalAlpha=1,this.hitContext.strokeStyle=b,"undefined"===typeof d?this.hitContext.lineWidth=c.strokeWidth+2:isNaN(d)||(this.hitContext.lineWidth=c.strokeWidth+2/d)):(this.hitContext.globalAlpha=
0,this.hitContext.lineWidth=1)},drawPoint:function(a,b,c){if(!1!==b.graphic)if(b.externalGraphic)this.drawExternalGraphic(a,b,c);else if(b.graphicName&&"circle"!=b.graphicName)this.drawNamedSymbol(a,b,c);else{var d=this.getLocalXY(a);a=d[0];d=d[1];if(!isNaN(a)&&!isNaN(d)){var e=2*Math.PI,f=b.pointRadius;!1!==b.fill&&(this.setCanvasStyle("fill",b),this.canvas.beginPath(),this.canvas.arc(a,d,f,0,e,!0),this.canvas.fill(),this.hitDetection&&(this.setHitContextStyle("fill",c,b),this.hitContext.beginPath(),
this.hitContext.arc(a,d,f,0,e,!0),this.hitContext.fill()));!1!==b.stroke&&(this.setCanvasStyle("stroke",b),this.canvas.beginPath(),this.canvas.arc(a,d,f,0,e,!0),this.canvas.stroke(),this.hitDetection&&(this.setHitContextStyle("stroke",c,b),this.hitContext.beginPath(),this.hitContext.arc(a,d,f,0,e,!0),this.hitContext.stroke()),this.setCanvasStyle("reset"))}}},drawLineString:function(a,b,c){b=OpenLayers.Util.applyDefaults({fill:!1},b);this.drawLinearRing(a,b,c)},drawLinearRing:function(a,b,c){!1!==
b.fill&&(this.setCanvasStyle("fill",b),this.renderPath(this.canvas,a,b,c,"fill"),this.hitDetection&&(this.setHitContextStyle("fill",c,b),this.renderPath(this.hitContext,a,b,c,"fill")));!1!==b.stroke&&(this.setCanvasStyle("stroke",b),this.renderPath(this.canvas,a,b,c,"stroke"),this.hitDetection&&(this.setHitContextStyle("stroke",c,b),this.renderPath(this.hitContext,a,b,c,"stroke")));this.setCanvasStyle("reset")},renderPath:function(a,b,c,d,e){b=b.components;c=b.length;a.beginPath();d=this.getLocalXY(b[0]);
var f=d[1];if(!isNaN(d[0])&&!isNaN(f)){a.moveTo(d[0],d[1]);for(d=1;d<c;++d)f=this.getLocalXY(b[d]),a.lineTo(f[0],f[1]);"fill"===e?a.fill():a.stroke()}},drawPolygon:function(a,b,c){a=a.components;var d=a.length;this.drawLinearRing(a[0],b,c);for(var e=1;e<d;++e)this.canvas.globalCompositeOperation="destination-out",this.hitDetection&&(this.hitContext.globalCompositeOperation="destination-out"),this.drawLinearRing(a[e],OpenLayers.Util.applyDefaults({stroke:!1,fillOpacity:1},b),c),this.canvas.globalCompositeOperation=
"source-over",this.hitDetection&&(this.hitContext.globalCompositeOperation="source-over"),this.drawLinearRing(a[e],OpenLayers.Util.applyDefaults({fill:!1},b),c)},drawText:function(a,b){var c=this.getLocalXY(a);this.setCanvasStyle("reset");this.canvas.fillStyle=b.fontColor;this.canvas.globalAlpha=b.fontOpacity||1;var d=[b.fontStyle?b.fontStyle:"normal","normal",b.fontWeight?b.fontWeight:"normal",b.fontSize?b.fontSize:"1em",b.fontFamily?b.fontFamily:"sans-serif"].join(" "),e=b.label.split("\n"),f=e.length;
if(this.canvas.fillText){this.canvas.font=d;this.canvas.textAlign=OpenLayers.Renderer.Canvas.LABEL_ALIGN[b.labelAlign[0]]||"center";this.canvas.textBaseline=OpenLayers.Renderer.Canvas.LABEL_ALIGN[b.labelAlign[1]]||"middle";var g=OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[1]];null==g&&(g=-.5);d=this.canvas.measureText("Mg").height||this.canvas.measureText("xx").width;c[1]+=d*g*(f-1);for(g=0;g<f;g++)b.labelOutlineWidth&&(this.canvas.save(),this.canvas.globalAlpha=b.labelOutlineOpacity||b.fontOpacity||
1,this.canvas.strokeStyle=b.labelOutlineColor,this.canvas.lineWidth=b.labelOutlineWidth,this.canvas.strokeText(e[g],c[0],c[1]+d*g+1),this.canvas.restore()),this.canvas.fillText(e[g],c[0],c[1]+d*g)}else if(this.canvas.mozDrawText){this.canvas.mozTextStyle=d;var h=OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[0]];null==h&&(h=-.5);g=OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[1]];null==g&&(g=-.5);d=this.canvas.mozMeasureText("xx");c[1]+=d*(1+g*f);for(g=0;g<f;g++){var k=c[0]+h*this.canvas.mozMeasureText(e[g]),
l=c[1]+g*d;this.canvas.translate(k,l);this.canvas.mozDrawText(e[g]);this.canvas.translate(-k,-l)}}this.setCanvasStyle("reset")},getLocalXY:function(a){var b=this.getResolution(),c=this.extent;return[(a.x-this.featureDx)/b+-c.left/b,c.top/b-a.y/b]},clear:function(){this.clearCanvas();this.features={}},clearCanvas:function(){var a=this.root.height,b=this.root.width;this.canvas.clearRect(0,0,b,a);this._clearRectId=OpenLayers.Util.createUniqueID();this.hitDetection&&this.hitContext.clearRect(0,0,b,a)},
getFeatureIdFromEvent:function(a){var b;if(this.hitDetection&&"none"!==this.root.style.display&&!this.map.dragging&&(a=a.xy,a=this.hitContext.getImageData(a.x|0,a.y|0,1,1).data,255===a[3]&&(a=a[2]+256*(a[1]+256*a[0])))){a="OpenLayers_Feature_Vector_"+(a-1+this.hitOverflow);try{b=this.features[a][0]}catch(c){}}return b},eraseFeatures:function(a){OpenLayers.Util.isArray(a)||(a=[a]);for(var b=0;b<a.length;++b)delete this.features[a[b].id];this.redraw()},redraw:function(){if(!this.locked){this.clearCanvas();
var a=[],b,c,d,e=this.map.baseLayer&&this.map.baseLayer.wrapDateLine&&this.map.getMaxExtent(),f;for(f in this.features)this.features.hasOwnProperty(f)&&(b=this.features[f][0],c=b.geometry,this.calculateFeatureDx(c.getBounds(),e),d=this.features[f][1],this.drawGeometry(c,d,b.id),d.label&&a.push([b,d]));c=0;for(d=a.length;c<d;++c)b=a[c],this.drawText(b[0].geometry.getCentroid(),b[1])}},CLASS_NAME:"OpenLayers.Renderer.Canvas"});OpenLayers.Renderer.Canvas.LABEL_ALIGN={l:"left",r:"right",t:"top",b:"bottom"};
OpenLayers.Renderer.Canvas.LABEL_FACTOR={l:0,r:-1,t:0,b:-1};OpenLayers.Renderer.Canvas.drawImageScaleFactor=null;OpenLayers.ElementsIndexer=OpenLayers.Class({maxZIndex:null,order:null,indices:null,compare:null,initialize:function(a){this.compare=a?OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER:OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER;this.clear()},insert:function(a){this.exists(a)&&this.remove(a);var b=a.id;this.determineZIndex(a);for(var c=-1,d=this.order.length,e;1<d-c;)e=parseInt((c+d)/2),0<this.compare(this,a,OpenLayers.Util.getElement(this.order[e]))?c=e:d=e;this.order.splice(d,
0,b);this.indices[b]=this.getZIndex(a);return this.getNextElement(d)},remove:function(a){a=a.id;var b=OpenLayers.Util.indexOf(this.order,a);0<=b&&(this.order.splice(b,1),delete this.indices[a],this.maxZIndex=0<this.order.length?this.indices[this.order[this.order.length-1]]:0)},clear:function(){this.order=[];this.indices={};this.maxZIndex=0},exists:function(a){return null!=this.indices[a.id]},getZIndex:function(a){return a._style.graphicZIndex},determineZIndex:function(a){var b=a._style.graphicZIndex;
null==b?(b=this.maxZIndex,a._style.graphicZIndex=b):b>this.maxZIndex&&(this.maxZIndex=b)},getNextElement:function(a){a+=1;for(var b=void 0;a<this.order.length&&void 0==b;a++)b=OpenLayers.Util.getElement(this.order[a]);return b||null},CLASS_NAME:"OpenLayers.ElementsIndexer"});
OpenLayers.ElementsIndexer.IndexingMethods={Z_ORDER:function(a,b,c){b=a.getZIndex(b);var d=0;c&&(a=a.getZIndex(c),d=b-a);return d},Z_ORDER_DRAWING_ORDER:function(a,b,c){a=OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a,b,c);c&&0==a&&(a=1);return a},Z_ORDER_Y_ORDER:function(a,b,c){a=OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a,b,c);c&&0===a&&(b=c._boundsBottom-b._boundsBottom,a=0===b?1:b);return a}};
OpenLayers.Renderer.Elements=OpenLayers.Class(OpenLayers.Renderer,{rendererRoot:null,root:null,vectorRoot:null,textRoot:null,xmlns:null,xOffset:0,indexer:null,BACKGROUND_ID_SUFFIX:"_background",LABEL_ID_SUFFIX:"_label",LABEL_OUTLINE_SUFFIX:"_outline",initialize:function(a,b){OpenLayers.Renderer.prototype.initialize.apply(this,arguments);this.rendererRoot=this.createRenderRoot();this.root=this.createRoot("_root");this.vectorRoot=this.createRoot("_vroot");this.textRoot=this.createRoot("_troot");this.root.appendChild(this.vectorRoot);
this.root.appendChild(this.textRoot);this.rendererRoot.appendChild(this.root);this.container.appendChild(this.rendererRoot);b&&(b.zIndexing||b.yOrdering)&&(this.indexer=new OpenLayers.ElementsIndexer(b.yOrdering))},destroy:function(){this.clear();this.xmlns=this.root=this.rendererRoot=null;OpenLayers.Renderer.prototype.destroy.apply(this,arguments)},clear:function(){var a,b=this.vectorRoot;if(b)for(;a=b.firstChild;)b.removeChild(a);if(b=this.textRoot)for(;a=b.firstChild;)b.removeChild(a);this.indexer&&
this.indexer.clear()},setExtent:function(a,b){var c=OpenLayers.Renderer.prototype.setExtent.apply(this,arguments),d=this.getResolution();if(this.map.baseLayer&&this.map.baseLayer.wrapDateLine){var e,f=a.getWidth()/this.map.getExtent().getWidth();a=a.scale(1/f);f=this.map.getMaxExtent();f.right>a.left&&f.right<a.right?e=!0:f.left>a.left&&f.left<a.right&&(e=!1);if(e!==this.rightOfDateLine||b)c=!1,this.xOffset=!0===e?f.getWidth()/d:0;this.rightOfDateLine=e}return c},getNodeType:function(a,b){},drawGeometry:function(a,
b,c){var d=a.CLASS_NAME,e=!0;if("OpenLayers.Geometry.Collection"==d||"OpenLayers.Geometry.MultiPoint"==d||"OpenLayers.Geometry.MultiLineString"==d||"OpenLayers.Geometry.MultiPolygon"==d){for(var d=0,f=a.components.length;d<f;d++)e=this.drawGeometry(a.components[d],b,c)&&e;return e}d=e=!1;"none"!=b.display&&(b.backgroundGraphic?this.redrawBackgroundNode(a.id,a,b,c):d=!0,e=this.redrawNode(a.id,a,b,c));0==e&&(b=document.getElementById(a.id))&&(b._style.backgroundGraphic&&(d=!0),b.parentNode.removeChild(b));
d&&(b=document.getElementById(a.id+this.BACKGROUND_ID_SUFFIX))&&b.parentNode.removeChild(b);return e},redrawNode:function(a,b,c,d){c=this.applyDefaultSymbolizer(c);a=this.nodeFactory(a,this.getNodeType(b,c));a._featureId=d;a._boundsBottom=b.getBounds().bottom;a._geometryClass=b.CLASS_NAME;a._style=c;b=this.drawGeometryNode(a,b,c);if(!1===b)return!1;a=b.node;this.indexer?(c=this.indexer.insert(a))?this.vectorRoot.insertBefore(a,c):this.vectorRoot.appendChild(a):a.parentNode!==this.vectorRoot&&this.vectorRoot.appendChild(a);
this.postDraw(a);return b.complete},redrawBackgroundNode:function(a,b,c,d){c=OpenLayers.Util.extend({},c);c.externalGraphic=c.backgroundGraphic;c.graphicXOffset=c.backgroundXOffset;c.graphicYOffset=c.backgroundYOffset;c.graphicZIndex=c.backgroundGraphicZIndex;c.graphicWidth=c.backgroundWidth||c.graphicWidth;c.graphicHeight=c.backgroundHeight||c.graphicHeight;c.backgroundGraphic=null;c.backgroundXOffset=null;c.backgroundYOffset=null;c.backgroundGraphicZIndex=null;return this.redrawNode(a+this.BACKGROUND_ID_SUFFIX,
b,c,null)},drawGeometryNode:function(a,b,c){c=c||a._style;var d={isFilled:void 0===c.fill?!0:c.fill,isStroked:void 0===c.stroke?!!c.strokeWidth:c.stroke},e;switch(b.CLASS_NAME){case "OpenLayers.Geometry.Point":!1===c.graphic&&(d.isFilled=!1,d.isStroked=!1);e=this.drawPoint(a,b);break;case "OpenLayers.Geometry.LineString":d.isFilled=!1;e=this.drawLineString(a,b);break;case "OpenLayers.Geometry.LinearRing":e=this.drawLinearRing(a,b);break;case "OpenLayers.Geometry.Polygon":e=this.drawPolygon(a,b);break;
case "OpenLayers.Geometry.Rectangle":e=this.drawRectangle(a,b)}a._options=d;return 0!=e?{node:this.setStyle(a,c,d,b),complete:e}:!1},postDraw:function(a){},drawPoint:function(a,b){},drawLineString:function(a,b){},drawLinearRing:function(a,b){},drawPolygon:function(a,b){},drawRectangle:function(a,b){},drawCircle:function(a,b){},removeText:function(a){var b=document.getElementById(a+this.LABEL_ID_SUFFIX);b&&this.textRoot.removeChild(b);(a=document.getElementById(a+this.LABEL_OUTLINE_SUFFIX))&&this.textRoot.removeChild(a)},
getFeatureIdFromEvent:function(a){var b=a.target,c=b&&b.correspondingUseElement;return(c?c:b||a.srcElement)._featureId},eraseGeometry:function(a,b){if("OpenLayers.Geometry.MultiPoint"==a.CLASS_NAME||"OpenLayers.Geometry.MultiLineString"==a.CLASS_NAME||"OpenLayers.Geometry.MultiPolygon"==a.CLASS_NAME||"OpenLayers.Geometry.Collection"==a.CLASS_NAME)for(var c=0,d=a.components.length;c<d;c++)this.eraseGeometry(a.components[c],b);else(c=OpenLayers.Util.getElement(a.id))&&c.parentNode&&(c.geometry&&(c.geometry.destroy(),
c.geometry=null),c.parentNode.removeChild(c),this.indexer&&this.indexer.remove(c),c._style.backgroundGraphic&&(c=OpenLayers.Util.getElement(a.id+this.BACKGROUND_ID_SUFFIX))&&c.parentNode&&c.parentNode.removeChild(c))},nodeFactory:function(a,b){var c=OpenLayers.Util.getElement(a);c?this.nodeTypeCompare(c,b)||(c.parentNode.removeChild(c),c=this.nodeFactory(a,b)):c=this.createNode(b,a);return c},nodeTypeCompare:function(a,b){},createNode:function(a,b){},moveRoot:function(a){var b=this.root;a.root.parentNode==
this.rendererRoot&&(b=a.root);b.parentNode.removeChild(b);a.rendererRoot.appendChild(b)},getRenderLayerId:function(){return this.root.parentNode.parentNode.id},isComplexSymbol:function(a){return"circle"!=a&&!!a},CLASS_NAME:"OpenLayers.Renderer.Elements"});OpenLayers.Renderer.SVG=OpenLayers.Class(OpenLayers.Renderer.Elements,{xmlns:"http://www.w3.org/2000/svg",xlinkns:"http://www.w3.org/1999/xlink",MAX_PIXEL:15E3,translationParameters:null,symbolMetrics:null,initialize:function(a){this.supported()&&(OpenLayers.Renderer.Elements.prototype.initialize.apply(this,arguments),this.translationParameters={x:0,y:0},this.symbolMetrics={})},supported:function(){return document.implementation&&(document.implementation.hasFeature("org.w3c.svg","1.0")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#SVG",
"1.1")||document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1"))},inValidRange:function(a,b,c){a+=c?0:this.translationParameters.x;b+=c?0:this.translationParameters.y;return a>=-this.MAX_PIXEL&&a<=this.MAX_PIXEL&&b>=-this.MAX_PIXEL&&b<=this.MAX_PIXEL},setExtent:function(a,b){var c=OpenLayers.Renderer.Elements.prototype.setExtent.apply(this,arguments),d=this.getResolution(),e=-a.left/d,d=a.top/d;if(b)return this.left=e,this.top=d,this.rendererRoot.setAttributeNS(null,
"viewBox","0 0 "+this.size.w+" "+this.size.h),this.translate(this.xOffset,0),!0;(e=this.translate(e-this.left+this.xOffset,d-this.top))||this.setExtent(a,!0);return c&&e},translate:function(a,b){if(this.inValidRange(a,b,!0)){var c="";if(a||b)c="translate("+a+","+b+")";this.root.setAttributeNS(null,"transform",c);this.translationParameters={x:a,y:b};return!0}return!1},setSize:function(a){OpenLayers.Renderer.prototype.setSize.apply(this,arguments);this.rendererRoot.setAttributeNS(null,"width",this.size.w);
this.rendererRoot.setAttributeNS(null,"height",this.size.h)},getNodeType:function(a,b){var c=null;switch(a.CLASS_NAME){case "OpenLayers.Geometry.Point":c=b.externalGraphic?"image":this.isComplexSymbol(b.graphicName)?"svg":"circle";break;case "OpenLayers.Geometry.Rectangle":c="rect";break;case "OpenLayers.Geometry.LineString":c="polyline";break;case "OpenLayers.Geometry.LinearRing":c="polygon";break;case "OpenLayers.Geometry.Polygon":case "OpenLayers.Geometry.Curve":c="path"}return c},setStyle:function(a,
b,c){b=b||a._style;c=c||a._options;var d=b.title||b.graphicTitle;if(d){a.setAttributeNS(null,"title",d);var e=a.getElementsByTagName("title");0<e.length?e[0].firstChild.textContent=d:(e=this.nodeFactory(null,"title"),e.textContent=d,a.appendChild(e))}var e=parseFloat(a.getAttributeNS(null,"r")),d=1,f;if("OpenLayers.Geometry.Point"==a._geometryClass&&e){a.style.visibility="";if(!1===b.graphic)a.style.visibility="hidden";else if(b.externalGraphic){f=this.getPosition(a);b.graphicWidth&&b.graphicHeight&&
a.setAttributeNS(null,"preserveAspectRatio","none");var e=b.graphicWidth||b.graphicHeight,g=b.graphicHeight||b.graphicWidth,e=e?e:2*b.pointRadius,g=g?g:2*b.pointRadius,h=void 0!=b.graphicYOffset?b.graphicYOffset:-(.5*g),k=b.graphicOpacity||b.fillOpacity;a.setAttributeNS(null,"x",(f.x+(void 0!=b.graphicXOffset?b.graphicXOffset:-(.5*e))).toFixed());a.setAttributeNS(null,"y",(f.y+h).toFixed());a.setAttributeNS(null,"width",e);a.setAttributeNS(null,"height",g);a.setAttributeNS(this.xlinkns,"xlink:href",
b.externalGraphic);a.setAttributeNS(null,"style","opacity: "+k);a.onclick=OpenLayers.Event.preventDefault}else if(this.isComplexSymbol(b.graphicName)){var e=3*b.pointRadius,g=2*e,l=this.importSymbol(b.graphicName);f=this.getPosition(a);d=3*this.symbolMetrics[l.id][0]/g;h=a.parentNode;k=a.nextSibling;h&&h.removeChild(a);a.firstChild&&a.removeChild(a.firstChild);a.appendChild(l.firstChild.cloneNode(!0));a.setAttributeNS(null,"viewBox",l.getAttributeNS(null,"viewBox"));a.setAttributeNS(null,"width",
g);a.setAttributeNS(null,"height",g);a.setAttributeNS(null,"x",f.x-e);a.setAttributeNS(null,"y",f.y-e);k?h.insertBefore(a,k):h&&h.appendChild(a)}else a.setAttributeNS(null,"r",b.pointRadius);e=b.rotation;void 0===e&&void 0===a._rotation||!f||(a._rotation=e,e|=0,"svg"!==a.nodeName?a.setAttributeNS(null,"transform","rotate("+e+" "+f.x+" "+f.y+")"):(f=this.symbolMetrics[l.id],a.firstChild.setAttributeNS(null,"transform","rotate("+e+" "+f[1]+" "+f[2]+")")))}c.isFilled?(a.setAttributeNS(null,"fill",b.fillColor),
a.setAttributeNS(null,"fill-opacity",b.fillOpacity)):a.setAttributeNS(null,"fill","none");c.isStroked?(a.setAttributeNS(null,"stroke",b.strokeColor),a.setAttributeNS(null,"stroke-opacity",b.strokeOpacity),a.setAttributeNS(null,"stroke-width",b.strokeWidth*d),a.setAttributeNS(null,"stroke-linecap",b.strokeLinecap||"round"),a.setAttributeNS(null,"stroke-linejoin","round"),b.strokeDashstyle&&a.setAttributeNS(null,"stroke-dasharray",this.dashStyle(b,d))):a.setAttributeNS(null,"stroke","none");b.pointerEvents&&
a.setAttributeNS(null,"pointer-events",b.pointerEvents);null!=b.cursor&&a.setAttributeNS(null,"cursor",b.cursor);return a},dashStyle:function(a,b){var c=a.strokeWidth*b,d=a.strokeDashstyle;switch(d){case "solid":return"none";case "dot":return[1,4*c].join();case "dash":return[4*c,4*c].join();case "dashdot":return[4*c,4*c,1,4*c].join();case "longdash":return[8*c,4*c].join();case "longdashdot":return[8*c,4*c,1,4*c].join();default:return OpenLayers.String.trim(d).replace(/\s+/g,",")}},createNode:function(a,
b){var c=document.createElementNS(this.xmlns,a);b&&c.setAttributeNS(null,"id",b);c.setAttribute("class"," ");return c},nodeTypeCompare:function(a,b){return b==a.nodeName},createRenderRoot:function(){var a=this.nodeFactory(this.container.id+"_svgRoot","svg");a.style.display="block";return a},createRoot:function(a){return this.nodeFactory(this.container.id+a,"g")},createDefs:function(){var a=this.nodeFactory(this.container.id+"_defs","defs");this.rendererRoot.appendChild(a);return a},drawPoint:function(a,
b){return this.drawCircle(a,b,1)},drawCircle:function(a,b,c){var d=this.getResolution(),e=(b.x-this.featureDx)/d+this.left;b=this.top-b.y/d;return this.inValidRange(e,b)?(a.setAttributeNS(null,"cx",e),a.setAttributeNS(null,"cy",b),a.setAttributeNS(null,"r",c),a):!1},drawLineString:function(a,b){var c=this.getComponentsString(b.components);return c.path?(a.setAttributeNS(null,"points",c.path),c.complete?a:null):!1},drawLinearRing:function(a,b){var c=this.getComponentsString(b.components);return c.path?
(a.setAttributeNS(null,"points",c.path),c.complete?a:null):!1},drawPolygon:function(a,b){for(var c="",d=!0,e=!0,f,g,h=0,k=b.components.length;h<k;h++)c+=" M",f=this.getComponentsString(b.components[h].components," "),(g=f.path)?(c+=" "+g,e=f.complete&&e):d=!1;return d?(a.setAttributeNS(null,"d",c+" z"),a.setAttributeNS(null,"fill-rule","evenodd"),e?a:null):!1},drawRectangle:function(a,b){var c=this.getResolution(),d=(b.x-this.featureDx)/c+this.left,e=this.top-b.y/c;return this.inValidRange(d,e)?(a.setAttributeNS(null,
"x",d),a.setAttributeNS(null,"y",e),a.setAttributeNS(null,"width",b.width/c),a.setAttributeNS(null,"height",b.height/c),a):!1},drawText:function(a,b,c){var d=!!b.labelOutlineWidth;if(d){var e=OpenLayers.Util.extend({},b);e.fontColor=e.labelOutlineColor;e.fontStrokeColor=e.labelOutlineColor;e.fontStrokeWidth=b.labelOutlineWidth;b.labelOutlineOpacity&&(e.fontOpacity=b.labelOutlineOpacity);delete e.labelOutlineWidth;this.drawText(a,e,c)}var f=this.getResolution(),e=(c.x-this.featureDx)/f+this.left,g=
c.y/f-this.top,d=d?this.LABEL_OUTLINE_SUFFIX:this.LABEL_ID_SUFFIX,f=this.nodeFactory(a+d,"text");f.setAttributeNS(null,"x",e);f.setAttributeNS(null,"y",-g);b.fontColor&&f.setAttributeNS(null,"fill",b.fontColor);b.fontStrokeColor&&f.setAttributeNS(null,"stroke",b.fontStrokeColor);b.fontStrokeWidth&&f.setAttributeNS(null,"stroke-width",b.fontStrokeWidth);b.fontOpacity&&f.setAttributeNS(null,"opacity",b.fontOpacity);b.fontFamily&&f.setAttributeNS(null,"font-family",b.fontFamily);b.fontSize&&f.setAttributeNS(null,
"font-size",b.fontSize);b.fontWeight&&f.setAttributeNS(null,"font-weight",b.fontWeight);b.fontStyle&&f.setAttributeNS(null,"font-style",b.fontStyle);!0===b.labelSelect?(f.setAttributeNS(null,"pointer-events","visible"),f._featureId=a):f.setAttributeNS(null,"pointer-events","none");g=b.labelAlign||OpenLayers.Renderer.defaultSymbolizer.labelAlign;f.setAttributeNS(null,"text-anchor",OpenLayers.Renderer.SVG.LABEL_ALIGN[g[0]]||"middle");!0===OpenLayers.IS_GECKO&&f.setAttributeNS(null,"dominant-baseline",
OpenLayers.Renderer.SVG.LABEL_ALIGN[g[1]]||"central");for(var h=b.label.split("\n"),k=h.length;f.childNodes.length>k;)f.removeChild(f.lastChild);for(var l=0;l<k;l++){var m=this.nodeFactory(a+d+"_tspan_"+l,"tspan");!0===b.labelSelect&&(m._featureId=a,m._geometry=c,m._geometryClass=c.CLASS_NAME);!1===OpenLayers.IS_GECKO&&m.setAttributeNS(null,"baseline-shift",OpenLayers.Renderer.SVG.LABEL_VSHIFT[g[1]]||"-35%");m.setAttribute("x",e);if(0==l){var r=OpenLayers.Renderer.SVG.LABEL_VFACTOR[g[1]];null==r&&
(r=-.5);m.setAttribute("dy",r*(k-1)+"em")}else m.setAttribute("dy","1em");m.textContent=""===h[l]?" ":h[l];m.parentNode||f.appendChild(m)}f.parentNode||this.textRoot.appendChild(f)},getComponentsString:function(a,b){for(var c=[],d=!0,e=a.length,f=[],g,h=0;h<e;h++)g=a[h],c.push(g),(g=this.getShortString(g))?f.push(g):(0<h&&this.getShortString(a[h-1])&&f.push(this.clipLine(a[h],a[h-1])),h<e-1&&this.getShortString(a[h+1])&&f.push(this.clipLine(a[h],a[h+1])),d=!1);return{path:f.join(b||","),complete:d}},
clipLine:function(a,b){if(b.equals(a))return"";var c=this.getResolution(),d=this.MAX_PIXEL-this.translationParameters.x,e=this.MAX_PIXEL-this.translationParameters.y,f=(b.x-this.featureDx)/c+this.left,g=this.top-b.y/c,h=(a.x-this.featureDx)/c+this.left,c=this.top-a.y/c,k;if(h<-d||h>d)k=(c-g)/(h-f),h=0>h?-d:d,c=g+(h-f)*k;if(c<-e||c>e)k=(h-f)/(c-g),c=0>c?-e:e,h=f+(c-g)*k;return h+","+c},getShortString:function(a){var b=this.getResolution(),c=(a.x-this.featureDx)/b+this.left;a=this.top-a.y/b;return this.inValidRange(c,
a)?c+","+a:!1},getPosition:function(a){return{x:parseFloat(a.getAttributeNS(null,"cx")),y:parseFloat(a.getAttributeNS(null,"cy"))}},importSymbol:function(a){this.defs||(this.defs=this.createDefs());var b=this.container.id+"-"+a,c=document.getElementById(b);if(null!=c)return c;var d=OpenLayers.Renderer.symbol[a];if(!d)throw Error(a+" is not a valid symbol name");a=this.nodeFactory(b,"symbol");var e=this.nodeFactory(null,"polygon");a.appendChild(e);for(var c=new OpenLayers.Bounds(Number.MAX_VALUE,Number.MAX_VALUE,
0,0),f=[],g,h,k=0;k<d.length;k+=2)g=d[k],h=d[k+1],c.left=Math.min(c.left,g),c.bottom=Math.min(c.bottom,h),c.right=Math.max(c.right,g),c.top=Math.max(c.top,h),f.push(g,",",h);e.setAttributeNS(null,"points",f.join(" "));d=c.getWidth();e=c.getHeight();a.setAttributeNS(null,"viewBox",[c.left-d,c.bottom-e,3*d,3*e].join(" "));this.symbolMetrics[b]=[Math.max(d,e),c.getCenterLonLat().lon,c.getCenterLonLat().lat];this.defs.appendChild(a);return a},getFeatureIdFromEvent:function(a){var b=OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this,
arguments);b||(b=a.target,b=b.parentNode&&b!=this.rendererRoot?b.parentNode._featureId:void 0);return b},CLASS_NAME:"OpenLayers.Renderer.SVG"});OpenLayers.Renderer.SVG.LABEL_ALIGN={l:"start",r:"end",b:"bottom",t:"hanging"};OpenLayers.Renderer.SVG.LABEL_VSHIFT={t:"-70%",b:"0"};OpenLayers.Renderer.SVG.LABEL_VFACTOR={t:0,b:-1};OpenLayers.Renderer.SVG.preventDefault=function(a){OpenLayers.Event.preventDefault(a)};OpenLayers.Popup=OpenLayers.Class({events:null,id:"",lonlat:null,div:null,contentSize:null,size:null,contentHTML:null,backgroundColor:"",opacity:"",border:"",contentDiv:null,groupDiv:null,closeDiv:null,autoSize:!1,minSize:null,maxSize:null,displayClass:"olPopup",contentDisplayClass:"olPopupContent",padding:0,disableFirefoxOverflowHack:!1,fixPadding:function(){"number"==typeof this.padding&&(this.padding=new OpenLayers.Bounds(this.padding,this.padding,this.padding,this.padding))},panMapIfOutOfView:!1,
keepInMap:!1,closeOnMove:!1,map:null,initialize:function(a,b,c,d,e,f){null==a&&(a=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_"));this.id=a;this.lonlat=b;this.contentSize=null!=c?c:new OpenLayers.Size(OpenLayers.Popup.WIDTH,OpenLayers.Popup.HEIGHT);null!=d&&(this.contentHTML=d);this.backgroundColor=OpenLayers.Popup.COLOR;this.opacity=OpenLayers.Popup.OPACITY;this.border=OpenLayers.Popup.BORDER;this.div=OpenLayers.Util.createDiv(this.id,null,null,null,null,null,"hidden");this.div.className=this.displayClass;
this.groupDiv=OpenLayers.Util.createDiv(this.id+"_GroupDiv",null,null,null,"relative",null,"hidden");a=this.div.id+"_contentDiv";this.contentDiv=OpenLayers.Util.createDiv(a,null,this.contentSize.clone(),null,"relative");this.contentDiv.className=this.contentDisplayClass;this.groupDiv.appendChild(this.contentDiv);this.div.appendChild(this.groupDiv);e&&this.addCloseBox(f);this.registerEvents()},destroy:function(){this.border=this.opacity=this.backgroundColor=this.contentHTML=this.size=this.lonlat=this.id=
null;this.closeOnMove&&this.map&&this.map.events.unregister("movestart",this,this.hide);this.events.destroy();this.events=null;this.closeDiv&&(OpenLayers.Event.stopObservingElement(this.closeDiv),this.groupDiv.removeChild(this.closeDiv));this.closeDiv=null;this.div.removeChild(this.groupDiv);this.groupDiv=null;null!=this.map&&this.map.removePopup(this);this.panMapIfOutOfView=this.padding=this.maxSize=this.minSize=this.autoSize=this.div=this.map=null},draw:function(a){null==a&&null!=this.lonlat&&null!=
this.map&&(a=this.map.getLayerPxFromLonLat(this.lonlat));this.closeOnMove&&this.map.events.register("movestart",this,this.hide);this.disableFirefoxOverflowHack||"firefox"!=OpenLayers.BROWSER_NAME||(this.map.events.register("movestart",this,function(){var a=document.defaultView.getComputedStyle(this.contentDiv,null).getPropertyValue("overflow");"hidden"!=a&&(this.contentDiv._oldOverflow=a,this.contentDiv.style.overflow="hidden")}),this.map.events.register("moveend",this,function(){var a=this.contentDiv._oldOverflow;
a&&(this.contentDiv.style.overflow=a,this.contentDiv._oldOverflow=null)}));this.moveTo(a);this.autoSize||this.size||this.setSize(this.contentSize);this.setBackgroundColor();this.setOpacity();this.setBorder();this.setContentHTML();this.panMapIfOutOfView&&this.panIntoView();return this.div},updatePosition:function(){if(this.lonlat&&this.map){var a=this.map.getLayerPxFromLonLat(this.lonlat);a&&this.moveTo(a)}},moveTo:function(a){null!=a&&null!=this.div&&(this.div.style.left=a.x+"px",this.div.style.top=
a.y+"px")},visible:function(){return OpenLayers.Element.visible(this.div)},toggle:function(){this.visible()?this.hide():this.show()},show:function(){this.div.style.display="";this.panMapIfOutOfView&&this.panIntoView()},hide:function(){this.div.style.display="none"},setSize:function(a){this.size=a.clone();var b=this.getContentDivPadding(),c=b.left+b.right,d=b.top+b.bottom;this.fixPadding();c+=this.padding.left+this.padding.right;d+=this.padding.top+this.padding.bottom;if(this.closeDiv)var e=parseInt(this.closeDiv.style.width),
c=c+(e+b.right);this.size.w+=c;this.size.h+=d;"msie"==OpenLayers.BROWSER_NAME&&(this.contentSize.w+=b.left+b.right,this.contentSize.h+=b.bottom+b.top);null!=this.div&&(this.div.style.width=this.size.w+"px",this.div.style.height=this.size.h+"px");null!=this.contentDiv&&(this.contentDiv.style.width=a.w+"px",this.contentDiv.style.height=a.h+"px")},updateSize:function(){var a="<div class='"+this.contentDisplayClass+"'>"+this.contentDiv.innerHTML+"</div>",b=this.map?this.map.div:document.body,c=OpenLayers.Util.getRenderedDimensions(a,
null,{displayClass:this.displayClass,containerElement:b}),d=this.getSafeContentSize(c);d.equals(c)?d=c:(c={w:d.w<c.w?d.w:null,h:d.h<c.h?d.h:null},c.w&&c.h||(a=OpenLayers.Util.getRenderedDimensions(a,c,{displayClass:this.contentDisplayClass,containerElement:b}),"hidden"!=OpenLayers.Element.getStyle(this.contentDiv,"overflow")&&a.equals(d)&&(d=OpenLayers.Util.getScrollbarWidth(),c.w?a.h+=d:a.w+=d),d=this.getSafeContentSize(a)));this.setSize(d)},setBackgroundColor:function(a){void 0!=a&&(this.backgroundColor=
a);null!=this.div&&(this.div.style.backgroundColor=this.backgroundColor)},setOpacity:function(a){void 0!=a&&(this.opacity=a);null!=this.div&&(this.div.style.opacity=this.opacity,this.div.style.filter="alpha(opacity="+100*this.opacity+")")},setBorder:function(a){void 0!=a&&(this.border=a);null!=this.div&&(this.div.style.border=this.border)},setContentHTML:function(a){null!=a&&(this.contentHTML=a);null!=this.contentDiv&&null!=this.contentHTML&&this.contentHTML!=this.contentDiv.innerHTML&&(this.contentDiv.innerHTML=
this.contentHTML,this.autoSize&&(this.registerImageListeners(),this.updateSize()))},registerImageListeners:function(){for(var a=function(){null!==this.popup.id&&(this.popup.updateSize(),this.popup.visible()&&this.popup.panMapIfOutOfView&&this.popup.panIntoView(),OpenLayers.Event.stopObserving(this.img,"load",this.img._onImgLoad))},b=this.contentDiv.getElementsByTagName("img"),c=0,d=b.length;c<d;c++){var e=b[c];if(0==e.width||0==e.height)e._onImgLoad=OpenLayers.Function.bind(a,{popup:this,img:e}),
OpenLayers.Event.observe(e,"load",e._onImgLoad)}},getSafeContentSize:function(a){a=a.clone();var b=this.getContentDivPadding(),c=b.left+b.right,d=b.top+b.bottom;this.fixPadding();c+=this.padding.left+this.padding.right;d+=this.padding.top+this.padding.bottom;if(this.closeDiv)var e=parseInt(this.closeDiv.style.width),c=c+(e+b.right);this.minSize&&(a.w=Math.max(a.w,this.minSize.w-c),a.h=Math.max(a.h,this.minSize.h-d));this.maxSize&&(a.w=Math.min(a.w,this.maxSize.w-c),a.h=Math.min(a.h,this.maxSize.h-
d));if(this.map&&this.map.size){e=b=0;if(this.keepInMap&&!this.panMapIfOutOfView)switch(e=this.map.getPixelFromLonLat(this.lonlat),this.relativePosition){case "tr":b=e.x;e=this.map.size.h-e.y;break;case "tl":b=this.map.size.w-e.x;e=this.map.size.h-e.y;break;case "bl":b=this.map.size.w-e.x;e=e.y;break;case "br":b=e.x;e=e.y;break;default:b=e.x,e=this.map.size.h-e.y}d=this.map.size.h-this.map.paddingForPopups.top-this.map.paddingForPopups.bottom-d-e;a.w=Math.min(a.w,this.map.size.w-this.map.paddingForPopups.left-
this.map.paddingForPopups.right-c-b);a.h=Math.min(a.h,d)}return a},getContentDivPadding:function(){var a=this._contentDivPadding;a||(null==this.div.parentNode&&(this.div.style.display="none",document.body.appendChild(this.div)),this._contentDivPadding=a=new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv,"padding-left"),OpenLayers.Element.getStyle(this.contentDiv,"padding-bottom"),OpenLayers.Element.getStyle(this.contentDiv,"padding-right"),OpenLayers.Element.getStyle(this.contentDiv,
"padding-top")),this.div.parentNode==document.body&&(document.body.removeChild(this.div),this.div.style.display=""));return a},addCloseBox:function(a){this.closeDiv=OpenLayers.Util.createDiv(this.id+"_close",null,{w:17,h:17});this.closeDiv.className="olPopupCloseBox";var b=this.getContentDivPadding();this.closeDiv.style.right=b.right+"px";this.closeDiv.style.top=b.top+"px";this.groupDiv.appendChild(this.closeDiv);a=a||function(a){this.hide();OpenLayers.Event.stop(a)};OpenLayers.Event.observe(this.closeDiv,
"touchend",OpenLayers.Function.bindAsEventListener(a,this));OpenLayers.Event.observe(this.closeDiv,"click",OpenLayers.Function.bindAsEventListener(a,this))},panIntoView:function(){var a=this.map.getSize(),b=this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left),parseInt(this.div.style.top))),c=b.clone();b.x<this.map.paddingForPopups.left?c.x=this.map.paddingForPopups.left:b.x+this.size.w>a.w-this.map.paddingForPopups.right&&(c.x=a.w-this.map.paddingForPopups.right-this.size.w);
b.y<this.map.paddingForPopups.top?c.y=this.map.paddingForPopups.top:b.y+this.size.h>a.h-this.map.paddingForPopups.bottom&&(c.y=a.h-this.map.paddingForPopups.bottom-this.size.h);this.map.pan(b.x-c.x,b.y-c.y)},registerEvents:function(){this.events=new OpenLayers.Events(this,this.div,null,!0);this.events.on({mousedown:this.onmousedown,mousemove:this.onmousemove,mouseup:this.onmouseup,click:this.onclick,mouseout:this.onmouseout,dblclick:this.ondblclick,touchstart:function(a){OpenLayers.Event.stop(a,!0)},
scope:this})},onmousedown:function(a){this.mousedown=!0;OpenLayers.Event.stop(a,!0)},onmousemove:function(a){this.mousedown&&OpenLayers.Event.stop(a,!0)},onmouseup:function(a){this.mousedown&&(this.mousedown=!1,OpenLayers.Event.stop(a,!0))},onclick:function(a){OpenLayers.Event.stop(a,!0)},onmouseout:function(a){this.mousedown=!1},ondblclick:function(a){OpenLayers.Event.stop(a,!0)},CLASS_NAME:"OpenLayers.Popup"});OpenLayers.Popup.WIDTH=200;OpenLayers.Popup.HEIGHT=200;OpenLayers.Popup.COLOR="white";
OpenLayers.Popup.OPACITY=1;OpenLayers.Popup.BORDER="0px";OpenLayers.Popup.Anchored=OpenLayers.Class(OpenLayers.Popup,{relativePosition:null,keepInMap:!0,anchor:null,initialize:function(a,b,c,d,e,f,g){OpenLayers.Popup.prototype.initialize.apply(this,[a,b,c,d,f,g]);this.anchor=null!=e?e:{size:new OpenLayers.Size(0,0),offset:new OpenLayers.Pixel(0,0)}},destroy:function(){this.relativePosition=this.anchor=null;OpenLayers.Popup.prototype.destroy.apply(this,arguments)},show:function(){this.updatePosition();OpenLayers.Popup.prototype.show.apply(this,arguments)},
moveTo:function(a){var b=this.relativePosition;this.relativePosition=this.calculateRelativePosition(a);OpenLayers.Popup.prototype.moveTo.call(this,this.calculateNewPx(a));this.relativePosition!=b&&this.updateRelativePosition()},setSize:function(a){OpenLayers.Popup.prototype.setSize.apply(this,arguments);if(this.lonlat&&this.map){var b=this.map.getLayerPxFromLonLat(this.lonlat);this.moveTo(b)}},calculateRelativePosition:function(a){a=this.map.getLonLatFromLayerPx(a);a=this.map.getExtent().determineQuadrant(a);
return OpenLayers.Bounds.oppositeQuadrant(a)},updateRelativePosition:function(){},calculateNewPx:function(a){a=a.offset(this.anchor.offset);var b=this.size||this.contentSize,c="t"==this.relativePosition.charAt(0);a.y+=c?-b.h:this.anchor.size.h;c="l"==this.relativePosition.charAt(1);a.x+=c?-b.w:this.anchor.size.w;return a},CLASS_NAME:"OpenLayers.Popup.Anchored"});OpenLayers.Popup.Framed=OpenLayers.Class(OpenLayers.Popup.Anchored,{imageSrc:null,imageSize:null,isAlphaImage:!1,positionBlocks:null,blocks:null,fixedRelativePosition:!1,initialize:function(a,b,c,d,e,f,g){OpenLayers.Popup.Anchored.prototype.initialize.apply(this,arguments);this.fixedRelativePosition&&(this.updateRelativePosition(),this.calculateRelativePosition=function(a){return this.relativePosition});this.contentDiv.style.position="absolute";this.contentDiv.style.zIndex=1;f&&(this.closeDiv.style.zIndex=
1);this.groupDiv.style.position="absolute";this.groupDiv.style.top="0px";this.groupDiv.style.left="0px";this.groupDiv.style.height="100%";this.groupDiv.style.width="100%"},destroy:function(){this.isAlphaImage=this.imageSize=this.imageSrc=null;this.fixedRelativePosition=!1;this.positionBlocks=null;for(var a=0;a<this.blocks.length;a++){var b=this.blocks[a];b.image&&b.div.removeChild(b.image);b.image=null;b.div&&this.groupDiv.removeChild(b.div);b.div=null}this.blocks=null;OpenLayers.Popup.Anchored.prototype.destroy.apply(this,
arguments)},setBackgroundColor:function(a){},setBorder:function(){},setOpacity:function(a){},setSize:function(a){OpenLayers.Popup.Anchored.prototype.setSize.apply(this,arguments);this.updateBlocks()},updateRelativePosition:function(){this.padding=this.positionBlocks[this.relativePosition].padding;if(this.closeDiv){var a=this.getContentDivPadding();this.closeDiv.style.right=a.right+this.padding.right+"px";this.closeDiv.style.top=a.top+this.padding.top+"px"}this.updateBlocks()},calculateNewPx:function(a){var b=
OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this,arguments);return b=b.offset(this.positionBlocks[this.relativePosition].offset)},createBlocks:function(){this.blocks=[];var a=null,b;for(b in this.positionBlocks){a=b;break}a=this.positionBlocks[a];for(b=0;b<a.blocks.length;b++){var c={};this.blocks.push(c);c.div=OpenLayers.Util.createDiv(this.id+"_FrameDecorationDiv_"+b,null,null,null,"absolute",null,"hidden",null);c.image=(this.isAlphaImage?OpenLayers.Util.createAlphaImageDiv:OpenLayers.Util.createImage)(this.id+
"_FrameDecorationImg_"+b,null,this.imageSize,this.imageSrc,"absolute",null,null,null);c.div.appendChild(c.image);this.groupDiv.appendChild(c.div)}},updateBlocks:function(){this.blocks||this.createBlocks();if(this.size&&this.relativePosition){for(var a=this.positionBlocks[this.relativePosition],b=0;b<a.blocks.length;b++){var c=a.blocks[b],d=this.blocks[b],e=c.anchor.left,f=c.anchor.bottom,g=c.anchor.right,h=c.anchor.top,k=isNaN(c.size.w)?this.size.w-(g+e):c.size.w,l=isNaN(c.size.h)?this.size.h-(f+
h):c.size.h;d.div.style.width=(0>k?0:k)+"px";d.div.style.height=(0>l?0:l)+"px";d.div.style.left=null!=e?e+"px":"";d.div.style.bottom=null!=f?f+"px":"";d.div.style.right=null!=g?g+"px":"";d.div.style.top=null!=h?h+"px":"";d.image.style.left=c.position.x+"px";d.image.style.top=c.position.y+"px"}this.contentDiv.style.left=this.padding.left+"px";this.contentDiv.style.top=this.padding.top+"px"}},CLASS_NAME:"OpenLayers.Popup.Framed"});OpenLayers.Popup.FramedCloud=OpenLayers.Class(OpenLayers.Popup.Framed,{contentDisplayClass:"olFramedCloudPopupContent",autoSize:!0,panMapIfOutOfView:!0,imageSize:new OpenLayers.Size(1276,736),isAlphaImage:!1,fixedRelativePosition:!1,positionBlocks:{tl:{offset:new OpenLayers.Pixel(44,0),padding:new OpenLayers.Bounds(8,40,8,9),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,51,22,0),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,
50,0,0),position:new OpenLayers.Pixel(-1238,0)},{size:new OpenLayers.Size("auto",19),anchor:new OpenLayers.Bounds(0,32,22,null),position:new OpenLayers.Pixel(0,-631)},{size:new OpenLayers.Size(22,18),anchor:new OpenLayers.Bounds(null,32,0,null),position:new OpenLayers.Pixel(-1238,-632)},{size:new OpenLayers.Size(81,35),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(0,-688)}]},tr:{offset:new OpenLayers.Pixel(-45,0),padding:new OpenLayers.Bounds(8,40,8,9),blocks:[{size:new OpenLayers.Size("auto",
"auto"),anchor:new OpenLayers.Bounds(0,51,22,0),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,50,0,0),position:new OpenLayers.Pixel(-1238,0)},{size:new OpenLayers.Size("auto",19),anchor:new OpenLayers.Bounds(0,32,22,null),position:new OpenLayers.Pixel(0,-631)},{size:new OpenLayers.Size(22,19),anchor:new OpenLayers.Bounds(null,32,0,null),position:new OpenLayers.Pixel(-1238,-631)},{size:new OpenLayers.Size(81,35),anchor:new OpenLayers.Bounds(0,
0,null,null),position:new OpenLayers.Pixel(-215,-687)}]},bl:{offset:new OpenLayers.Pixel(45,0),padding:new OpenLayers.Bounds(8,9,8,40),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,21,22,32),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,21,0,32),position:new OpenLayers.Pixel(-1238,0)},{size:new OpenLayers.Size("auto",21),anchor:new OpenLayers.Bounds(0,0,22,null),position:new OpenLayers.Pixel(0,-629)},{size:new OpenLayers.Size(22,
21),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(-1238,-629)},{size:new OpenLayers.Size(81,33),anchor:new OpenLayers.Bounds(null,null,0,0),position:new OpenLayers.Pixel(-101,-674)}]},br:{offset:new OpenLayers.Pixel(-44,0),padding:new OpenLayers.Bounds(8,9,8,40),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,21,22,32),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,21,0,32),position:new OpenLayers.Pixel(-1238,
0)},{size:new OpenLayers.Size("auto",21),anchor:new OpenLayers.Bounds(0,0,22,null),position:new OpenLayers.Pixel(0,-629)},{size:new OpenLayers.Size(22,21),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(-1238,-629)},{size:new OpenLayers.Size(81,33),anchor:new OpenLayers.Bounds(0,null,null,0),position:new OpenLayers.Pixel(-311,-674)}]}},minSize:new OpenLayers.Size(105,10),maxSize:new OpenLayers.Size(1200,660),initialize:function(a,b,c,d,e,f,g){this.imageSrc=OpenLayers.Util.getImageLocation("cloud-popup-relative.png");
OpenLayers.Popup.Framed.prototype.initialize.apply(this,arguments);this.contentDiv.className=this.contentDisplayClass},CLASS_NAME:"OpenLayers.Popup.FramedCloud"});OpenLayers.Protocol=OpenLayers.Class({format:null,options:null,autoDestroy:!0,defaultFilter:null,initialize:function(a){a=a||{};OpenLayers.Util.extend(this,a);this.options=a},mergeWithDefaultFilter:function(a){return a&&this.defaultFilter?new OpenLayers.Filter.Logical({type:OpenLayers.Filter.Logical.AND,filters:[this.defaultFilter,a]}):a||this.defaultFilter||void 0},destroy:function(){this.format=this.options=null},read:function(a){a=a||{};a.filter=this.mergeWithDefaultFilter(a.filter)},create:function(){},
update:function(){},"delete":function(){},commit:function(){},abort:function(a){},createCallback:function(a,b,c){return OpenLayers.Function.bind(function(){a.apply(this,[b,c])},this)},CLASS_NAME:"OpenLayers.Protocol"});OpenLayers.Protocol.Response=OpenLayers.Class({code:null,requestType:null,last:!0,features:null,data:null,reqFeatures:null,priv:null,error:null,initialize:function(a){OpenLayers.Util.extend(this,a)},success:function(){return 0<this.code},CLASS_NAME:"OpenLayers.Protocol.Response"});
OpenLayers.Protocol.Response.SUCCESS=1;OpenLayers.Protocol.Response.FAILURE=0;OpenLayers.ProxyHost="";OpenLayers.Request||(OpenLayers.Request={});
OpenLayers.Util.extend(OpenLayers.Request,{DEFAULT_CONFIG:{method:"GET",url:window.location.href,async:!0,user:void 0,password:void 0,params:null,proxy:OpenLayers.ProxyHost,headers:{},data:null,callback:function(){},success:null,failure:null,scope:null},URL_SPLIT_REGEX:/([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,events:new OpenLayers.Events(this),makeSameOrigin:function(a,b){var c=0!==a.indexOf("http"),d=!c&&a.match(this.URL_SPLIT_REGEX);if(d){var e=window.location,c=d[1]==e.protocol&&d[3]==
e.hostname,d=d[4],e=e.port;if(80!=d&&""!=d||"80"!=e&&""!=e)c=c&&d==e}c||b&&(a="function"==typeof b?b(a):b+encodeURIComponent(a));return a},issue:function(a){var b=OpenLayers.Util.extend(this.DEFAULT_CONFIG,{proxy:OpenLayers.ProxyHost});a=a||{};a.headers=a.headers||{};a=OpenLayers.Util.applyDefaults(a,b);a.headers=OpenLayers.Util.applyDefaults(a.headers,b.headers);var b=!1,c;for(c in a.headers)a.headers.hasOwnProperty(c)&&"x-requested-with"===c.toLowerCase()&&(b=!0);!1===b&&(a.headers["X-Requested-With"]=
"XMLHttpRequest");var d=new OpenLayers.Request.XMLHttpRequest,e=OpenLayers.Util.urlAppend(a.url,OpenLayers.Util.getParameterString(a.params||{})),e=OpenLayers.Request.makeSameOrigin(e,a.proxy);d.open(a.method,e,a.async,a.user,a.password);for(var f in a.headers)d.setRequestHeader(f,a.headers[f]);var g=this.events,h=this;d.onreadystatechange=function(){d.readyState==OpenLayers.Request.XMLHttpRequest.DONE&&!1!==g.triggerEvent("complete",{request:d,config:a,requestUrl:e})&&h.runCallbacks({request:d,config:a,
requestUrl:e})};!1===a.async?d.send(a.data):window.setTimeout(function(){0!==d.readyState&&d.send(a.data)},0);return d},runCallbacks:function(a){var b=a.request,c=a.config,d=c.scope?OpenLayers.Function.bind(c.callback,c.scope):c.callback,e;c.success&&(e=c.scope?OpenLayers.Function.bind(c.success,c.scope):c.success);var f;c.failure&&(f=c.scope?OpenLayers.Function.bind(c.failure,c.scope):c.failure);"file:"==OpenLayers.Util.createUrlObject(c.url).protocol&&b.responseText&&(b.status=200);d(b);if(!b.status||
200<=b.status&&300>b.status)this.events.triggerEvent("success",a),e&&e(b);b.status&&(200>b.status||300<=b.status)&&(this.events.triggerEvent("failure",a),f&&f(b))},GET:function(a){a=OpenLayers.Util.extend(a,{method:"GET"});return OpenLayers.Request.issue(a)},POST:function(a){a=OpenLayers.Util.extend(a,{method:"POST"});a.headers=a.headers?a.headers:{};"CONTENT-TYPE"in OpenLayers.Util.upperCaseObject(a.headers)||(a.headers["Content-Type"]="application/xml");return OpenLayers.Request.issue(a)},PUT:function(a){a=
OpenLayers.Util.extend(a,{method:"PUT"});a.headers=a.headers?a.headers:{};"CONTENT-TYPE"in OpenLayers.Util.upperCaseObject(a.headers)||(a.headers["Content-Type"]="application/xml");return OpenLayers.Request.issue(a)},DELETE:function(a){a=OpenLayers.Util.extend(a,{method:"DELETE"});return OpenLayers.Request.issue(a)},HEAD:function(a){a=OpenLayers.Util.extend(a,{method:"HEAD"});return OpenLayers.Request.issue(a)},OPTIONS:function(a){a=OpenLayers.Util.extend(a,{method:"OPTIONS"});return OpenLayers.Request.issue(a)}});(function(){function a(){this._object=f&&!k?new f:new window.ActiveXObject("Microsoft.XMLHTTP");this._listeners=[]}function b(){return new a}function c(a){b.onreadystatechange&&b.onreadystatechange.apply(a);a.dispatchEvent({type:"readystatechange",bubbles:!1,cancelable:!1,timeStamp:new Date+0})}function d(a){try{a.responseText=a._object.responseText}catch(p){}try{var b;var c=a._object,d=c.responseXML,e=c.responseText;h&&e&&d&&!d.documentElement&&c.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)&&
(d=new window.ActiveXObject("Microsoft.XMLDOM"),d.async=!1,d.validateOnParse=!1,d.loadXML(e));b=d&&(h&&0!=d.parseError||!d.documentElement||d.documentElement&&"parsererror"==d.documentElement.tagName)?null:d;a.responseXML=b}catch(p){}try{a.status=a._object.status}catch(p){}try{a.statusText=a._object.statusText}catch(p){}}function e(a){a._object.onreadystatechange=new window.Function}var f=window.XMLHttpRequest,g=!!window.controllers,h=window.document.all&&!window.opera,k=h&&window.navigator.userAgent.match(/MSIE 7.0/);
b.prototype=a.prototype;g&&f.wrapped&&(b.wrapped=f.wrapped);b.UNSENT=0;b.OPENED=1;b.HEADERS_RECEIVED=2;b.LOADING=3;b.DONE=4;b.prototype.readyState=b.UNSENT;b.prototype.responseText="";b.prototype.responseXML=null;b.prototype.status=0;b.prototype.statusText="";b.prototype.priority="NORMAL";b.prototype.onreadystatechange=null;b.onreadystatechange=null;b.onopen=null;b.onsend=null;b.onabort=null;b.prototype.open=function(a,f,k,q,n){delete this._headers;3>arguments.length&&(k=!0);this._async=k;var l=this,
m=this.readyState,r;h&&k&&(r=function(){m!=b.DONE&&(e(l),l.abort())},window.attachEvent("onunload",r));b.onopen&&b.onopen.apply(this,arguments);4<arguments.length?this._object.open(a,f,k,q,n):3<arguments.length?this._object.open(a,f,k,q):this._object.open(a,f,k);this.readyState=b.OPENED;c(this);this._object.onreadystatechange=function(){if(!g||k)l.readyState=l._object.readyState,d(l),l._aborted?l.readyState=b.UNSENT:(l.readyState==b.DONE&&(delete l._data,e(l),h&&k&&window.detachEvent("onunload",r)),
m!=l.readyState&&c(l),m=l.readyState)}};b.prototype.send=function(a){b.onsend&&b.onsend.apply(this,arguments);arguments.length||(a=null);a&&a.nodeType&&(a=window.XMLSerializer?(new window.XMLSerializer).serializeToString(a):a.xml,this._headers["Content-Type"]||this._object.setRequestHeader("Content-Type","application/xml"));this._data=a;a:if(this._object.send(this._data),g&&!this._async)for(this.readyState=b.OPENED,d(this);this.readyState<b.DONE;)if(this.readyState++,c(this),this._aborted)break a};
b.prototype.abort=function(){b.onabort&&b.onabort.apply(this,arguments);this.readyState>b.UNSENT&&(this._aborted=!0);this._object.abort();e(this);this.readyState=b.UNSENT;delete this._data};b.prototype.getAllResponseHeaders=function(){return this._object.getAllResponseHeaders()};b.prototype.getResponseHeader=function(a){return this._object.getResponseHeader(a)};b.prototype.setRequestHeader=function(a,b){this._headers||(this._headers={});this._headers[a]=b;return this._object.setRequestHeader(a,b)};
b.prototype.addEventListener=function(a,b,c){for(var d=0,e;e=this._listeners[d];d++)if(e[0]==a&&e[1]==b&&e[2]==c)return;this._listeners.push([a,b,c])};b.prototype.removeEventListener=function(a,b,c){for(var d=0,e;(e=this._listeners[d])&&(e[0]!=a||e[1]!=b||e[2]!=c);d++);e&&this._listeners.splice(d,1)};b.prototype.dispatchEvent=function(a){a={type:a.type,target:this,currentTarget:this,eventPhase:2,bubbles:a.bubbles,cancelable:a.cancelable,timeStamp:a.timeStamp,stopPropagation:function(){},preventDefault:function(){},
initEvent:function(){}};"readystatechange"==a.type&&this.onreadystatechange&&(this.onreadystatechange.handleEvent||this.onreadystatechange).apply(this,[a]);for(var b=0,c;c=this._listeners[b];b++)c[0]!=a.type||c[2]||(c[1].handleEvent||c[1]).apply(this,[a])};b.prototype.toString=function(){return"[object XMLHttpRequest]"};b.toString=function(){return"[XMLHttpRequest]"};window.Function.prototype.apply||(window.Function.prototype.apply=function(a,b){b||(b=[]);a.__func=this;a.__func(b[0],b[1],b[2],b[3],
b[4]);delete a.__func});OpenLayers.Request||(OpenLayers.Request={});OpenLayers.Request.XMLHttpRequest=b})();OpenLayers.Protocol.HTTP=OpenLayers.Class(OpenLayers.Protocol,{url:null,headers:null,params:null,callback:null,scope:null,readWithPOST:!1,updateWithPOST:!1,deleteWithPOST:!1,wildcarded:!1,srsInBBOX:!1,initialize:function(a){a=a||{};this.params={};this.headers={};OpenLayers.Protocol.prototype.initialize.apply(this,arguments);if(!this.filterToParams&&OpenLayers.Format.QueryStringFilter){var b=new OpenLayers.Format.QueryStringFilter({wildcarded:this.wildcarded,srsInBBOX:this.srsInBBOX});this.filterToParams=
function(a,d){return b.write(a,d)}}},destroy:function(){this.headers=this.params=null;OpenLayers.Protocol.prototype.destroy.apply(this)},read:function(a){OpenLayers.Protocol.prototype.read.apply(this,arguments);a=a||{};a.params=OpenLayers.Util.applyDefaults(a.params,this.options.params);a=OpenLayers.Util.applyDefaults(a,this.options);a.filter&&this.filterToParams&&(a.params=this.filterToParams(a.filter,a.params));var b=void 0!==a.readWithPOST?a.readWithPOST:this.readWithPOST,c=new OpenLayers.Protocol.Response({requestType:"read"});
b?(b=a.headers||{},b["Content-Type"]="application/x-www-form-urlencoded",c.priv=OpenLayers.Request.POST({url:a.url,callback:this.createCallback(this.handleRead,c,a),data:OpenLayers.Util.getParameterString(a.params),headers:b})):c.priv=OpenLayers.Request.GET({url:a.url,callback:this.createCallback(this.handleRead,c,a),params:a.params,headers:a.headers});return c},handleRead:function(a,b){this.handleResponse(a,b)},create:function(a,b){b=OpenLayers.Util.applyDefaults(b,this.options);var c=new OpenLayers.Protocol.Response({reqFeatures:a,
requestType:"create"});c.priv=OpenLayers.Request.POST({url:b.url,callback:this.createCallback(this.handleCreate,c,b),headers:b.headers,data:this.format.write(a)});return c},handleCreate:function(a,b){this.handleResponse(a,b)},update:function(a,b){b=b||{};var c=b.url||a.url||this.options.url+"/"+a.fid;b=OpenLayers.Util.applyDefaults(b,this.options);var d=new OpenLayers.Protocol.Response({reqFeatures:a,requestType:"update"});d.priv=OpenLayers.Request[this.updateWithPOST?"POST":"PUT"]({url:c,callback:this.createCallback(this.handleUpdate,
d,b),headers:b.headers,data:this.format.write(a)});return d},handleUpdate:function(a,b){this.handleResponse(a,b)},"delete":function(a,b){b=b||{};var c=b.url||a.url||this.options.url+"/"+a.fid;b=OpenLayers.Util.applyDefaults(b,this.options);var d=new OpenLayers.Protocol.Response({reqFeatures:a,requestType:"delete"}),e=this.deleteWithPOST?"POST":"DELETE",c={url:c,callback:this.createCallback(this.handleDelete,d,b),headers:b.headers};this.deleteWithPOST&&(c.data=this.format.write(a));d.priv=OpenLayers.Request[e](c);
return d},handleDelete:function(a,b){this.handleResponse(a,b)},handleResponse:function(a,b){var c=a.priv;b.callback&&(200<=c.status&&300>c.status?("delete"!=a.requestType&&(a.features=this.parseFeatures(c)),a.code=OpenLayers.Protocol.Response.SUCCESS):a.code=OpenLayers.Protocol.Response.FAILURE,b.callback.call(b.scope,a))},parseFeatures:function(a){var b=a.responseXML;b&&b.documentElement||(b=a.responseText);return!b||0>=b.length?null:this.format.read(b)},commit:function(a,b){function c(a){for(var b=
a.features?a.features.length:0,c=Array(b),e=0;e<b;++e)c[e]=a.features[e].fid;p.insertIds=c;d.apply(this,[a])}function d(a){this.callUserCallback(a,b);n=n&&a.success();f++;f>=q&&b.callback&&(p.code=n?OpenLayers.Protocol.Response.SUCCESS:OpenLayers.Protocol.Response.FAILURE,b.callback.apply(b.scope,[p]))}b=OpenLayers.Util.applyDefaults(b,this.options);var e=[],f=0,g={};g[OpenLayers.State.INSERT]=[];g[OpenLayers.State.UPDATE]=[];g[OpenLayers.State.DELETE]=[];for(var h,k,l=[],m=0,r=a.length;m<r;++m)if(h=
a[m],k=g[h.state])k.push(h),l.push(h);var q=(0<g[OpenLayers.State.INSERT].length?1:0)+g[OpenLayers.State.UPDATE].length+g[OpenLayers.State.DELETE].length,n=!0,p=new OpenLayers.Protocol.Response({reqFeatures:l});h=g[OpenLayers.State.INSERT];0<h.length&&e.push(this.create(h,OpenLayers.Util.applyDefaults({callback:c,scope:this},b.create)));h=g[OpenLayers.State.UPDATE];for(m=h.length-1;0<=m;--m)e.push(this.update(h[m],OpenLayers.Util.applyDefaults({callback:d,scope:this},b.update)));h=g[OpenLayers.State.DELETE];
for(m=h.length-1;0<=m;--m)e.push(this["delete"](h[m],OpenLayers.Util.applyDefaults({callback:d,scope:this},b["delete"])));return e},abort:function(a){a&&a.priv.abort()},callUserCallback:function(a,b){var c=b[a.requestType];c&&c.callback&&c.callback.call(c.scope,a)},CLASS_NAME:"OpenLayers.Protocol.HTTP"});OpenLayers.Geometry=OpenLayers.Class({id:null,parent:null,bounds:null,initialize:function(){this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")},destroy:function(){this.bounds=this.id=null},clone:function(){return new OpenLayers.Geometry},setBounds:function(a){a&&(this.bounds=a.clone())},clearBounds:function(){this.bounds=null;this.parent&&this.parent.clearBounds()},extendBounds:function(a){this.getBounds()?this.bounds.extend(a):this.setBounds(a)},getBounds:function(){null==this.bounds&&this.calculateBounds();
return this.bounds},calculateBounds:function(){},distanceTo:function(a,b){},getVertices:function(a){},atPoint:function(a,b,c){var d=!1;null!=this.getBounds()&&null!=a&&(b=null!=b?b:0,c=null!=c?c:0,d=(new OpenLayers.Bounds(this.bounds.left-b,this.bounds.bottom-c,this.bounds.right+b,this.bounds.top+c)).containsLonLat(a));return d},getLength:function(){return 0},getArea:function(){return 0},getCentroid:function(){return null},toString:function(){return OpenLayers.Format&&OpenLayers.Format.WKT?OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this)):
Object.prototype.toString.call(this)},CLASS_NAME:"OpenLayers.Geometry"});OpenLayers.Geometry.fromWKT=function(a){var b;if(OpenLayers.Format&&OpenLayers.Format.WKT){var c=OpenLayers.Geometry.fromWKT.format;c||(c=new OpenLayers.Format.WKT,OpenLayers.Geometry.fromWKT.format=c);a=c.read(a);if(a instanceof OpenLayers.Feature.Vector)b=a.geometry;else if(OpenLayers.Util.isArray(a)){b=a.length;for(var c=Array(b),d=0;d<b;++d)c[d]=a[d].geometry;b=new OpenLayers.Geometry.Collection(c)}}return b};
OpenLayers.Geometry.segmentsIntersect=function(a,b,c){var d=c&&c.point;c=c&&c.tolerance;var e=!1,f=a.x1-b.x1,g=a.y1-b.y1,h=a.x2-a.x1,k=a.y2-a.y1,l=b.y2-b.y1,m=b.x2-b.x1,r=l*h-m*k,l=m*g-l*f,g=h*g-k*f;0==r?0==l&&0==g&&(e=!0):(f=l/r,r=g/r,0<=f&&1>=f&&0<=r&&1>=r&&(d?(h=a.x1+f*h,r=a.y1+f*k,e=new OpenLayers.Geometry.Point(h,r)):e=!0));if(c)if(e){if(d)a:for(a=[a,b],b=0;2>b;++b)for(f=a[b],k=1;3>k;++k)if(h=f["x"+k],r=f["y"+k],d=Math.sqrt(Math.pow(h-e.x,2)+Math.pow(r-e.y,2)),d<c){e.x=h;e.y=r;break a}}else a:for(a=
[a,b],b=0;2>b;++b)for(h=a[b],r=a[(b+1)%2],k=1;3>k;++k)if(f={x:h["x"+k],y:h["y"+k]},g=OpenLayers.Geometry.distanceToSegment(f,r),g.distance<c){e=d?new OpenLayers.Geometry.Point(f.x,f.y):!0;break a}return e};OpenLayers.Geometry.distanceToSegment=function(a,b){var c=OpenLayers.Geometry.distanceSquaredToSegment(a,b);c.distance=Math.sqrt(c.distance);return c};
OpenLayers.Geometry.distanceSquaredToSegment=function(a,b){var c=a.x,d=a.y,e=b.x1,f=b.y1,g=b.x2,h=b.y2,k=g-e,l=h-f,m=0==k&&0==l?0:(k*(c-e)+l*(d-f))/(Math.pow(k,2)+Math.pow(l,2));0>=m||(1<=m?(e=g,f=h):(e+=m*k,f+=m*l));return{distance:Math.pow(e-c,2)+Math.pow(f-d,2),x:e,y:f,along:m}};OpenLayers.Geometry.Collection=OpenLayers.Class(OpenLayers.Geometry,{components:null,componentTypes:null,initialize:function(a){OpenLayers.Geometry.prototype.initialize.apply(this,arguments);this.components=[];null!=a&&this.addComponents(a)},destroy:function(){this.components.length=0;this.components=null;OpenLayers.Geometry.prototype.destroy.apply(this,arguments)},clone:function(){for(var a=new (OpenLayers.Util.getConstructor(this.CLASS_NAME)),b=0,c=this.components.length;b<c;b++)a.addComponent(this.components[b].clone());
OpenLayers.Util.applyDefaults(a,this);return a},getComponentsString:function(){for(var a=[],b=0,c=this.components.length;b<c;b++)a.push(this.components[b].toShortString());return a.join(",")},calculateBounds:function(){this.bounds=null;var a=new OpenLayers.Bounds,b=this.components;if(b)for(var c=0,d=b.length;c<d;c++)a.extend(b[c].getBounds());null!=a.left&&null!=a.bottom&&null!=a.right&&null!=a.top&&this.setBounds(a)},addComponents:function(a){OpenLayers.Util.isArray(a)||(a=[a]);for(var b=0,c=a.length;b<
c;b++)this.addComponent(a[b])},addComponent:function(a,b){var c=!1;if(a&&(null==this.componentTypes||-1<OpenLayers.Util.indexOf(this.componentTypes,a.CLASS_NAME))){if(null!=b&&b<this.components.length){var c=this.components.slice(0,b),d=this.components.slice(b,this.components.length);c.push(a);this.components=c.concat(d)}else this.components.push(a);a.parent=this;this.clearBounds();c=!0}return c},removeComponents:function(a){var b=!1;OpenLayers.Util.isArray(a)||(a=[a]);for(var c=a.length-1;0<=c;--c)b=
this.removeComponent(a[c])||b;return b},removeComponent:function(a){OpenLayers.Util.removeItem(this.components,a);this.clearBounds();return!0},getLength:function(){for(var a=0,b=0,c=this.components.length;b<c;b++)a+=this.components[b].getLength();return a},getArea:function(){for(var a=0,b=0,c=this.components.length;b<c;b++)a+=this.components[b].getArea();return a},getGeodesicArea:function(a){for(var b=0,c=0,d=this.components.length;c<d;c++)b+=this.components[c].getGeodesicArea(a);return b},getCentroid:function(a){if(!a)return this.components.length&&
this.components[0].getCentroid();a=this.components.length;if(!a)return!1;for(var b=[],c=[],d=0,e=Number.MAX_VALUE,f,g=0;g<a;++g){f=this.components[g];var h=f.getArea();f=f.getCentroid(!0);isNaN(h)||isNaN(f.x)||isNaN(f.y)||(b.push(h),d+=h,e=h<e&&0<h?h:e,c.push(f))}a=b.length;if(0===d){for(g=0;g<a;++g)b[g]=1;d=b.length}else{for(g=0;g<a;++g)b[g]/=e;d/=e}for(var k=e=0,g=0;g<a;++g)f=c[g],h=b[g],e+=f.x*h,k+=f.y*h;return new OpenLayers.Geometry.Point(e/d,k/d)},getGeodesicLength:function(a){for(var b=0,c=
0,d=this.components.length;c<d;c++)b+=this.components[c].getGeodesicLength(a);return b},move:function(a,b){for(var c=0,d=this.components.length;c<d;c++)this.components[c].move(a,b)},rotate:function(a,b){for(var c=0,d=this.components.length;c<d;++c)this.components[c].rotate(a,b)},resize:function(a,b,c){for(var d=0;d<this.components.length;++d)this.components[d].resize(a,b,c);return this},distanceTo:function(a,b){for(var c=!(b&&!1===b.edge)&&b&&b.details,d,e,f,g=Number.POSITIVE_INFINITY,h=0,k=this.components.length;h<
k&&!(d=this.components[h].distanceTo(a,b),f=c?d.distance:d,f<g&&(g=f,e=d,0==g));++h);return e},equals:function(a){var b=!0;if(a&&a.CLASS_NAME&&this.CLASS_NAME==a.CLASS_NAME)if(OpenLayers.Util.isArray(a.components)&&a.components.length==this.components.length)for(var c=0,d=this.components.length;c<d;++c){if(!this.components[c].equals(a.components[c])){b=!1;break}}else b=!1;else b=!1;return b},transform:function(a,b){if(a&&b){for(var c=0,d=this.components.length;c<d;c++)this.components[c].transform(a,
b);this.bounds=null}return this},intersects:function(a){for(var b=!1,c=0,d=this.components.length;c<d&&!(b=a.intersects(this.components[c]));++c);return b},getVertices:function(a){for(var b=[],c=0,d=this.components.length;c<d;++c)Array.prototype.push.apply(b,this.components[c].getVertices(a));return b},CLASS_NAME:"OpenLayers.Geometry.Collection"});OpenLayers.Geometry.Point=OpenLayers.Class(OpenLayers.Geometry,{x:null,y:null,initialize:function(a,b){OpenLayers.Geometry.prototype.initialize.apply(this,arguments);this.x=parseFloat(a);this.y=parseFloat(b)},clone:function(a){null==a&&(a=new OpenLayers.Geometry.Point(this.x,this.y));OpenLayers.Util.applyDefaults(a,this);return a},calculateBounds:function(){this.bounds=new OpenLayers.Bounds(this.x,this.y,this.x,this.y)},distanceTo:function(a,b){var c=!(b&&!1===b.edge)&&b&&b.details,d,e,f,g,h;a instanceof
OpenLayers.Geometry.Point?(e=this.x,f=this.y,g=a.x,h=a.y,d=Math.sqrt(Math.pow(e-g,2)+Math.pow(f-h,2)),d=c?{x0:e,y0:f,x1:g,y1:h,distance:d}:d):(d=a.distanceTo(this,b),c&&(d={x0:d.x1,y0:d.y1,x1:d.x0,y1:d.y0,distance:d.distance}));return d},equals:function(a){var b=!1;null!=a&&(b=this.x==a.x&&this.y==a.y||isNaN(this.x)&&isNaN(this.y)&&isNaN(a.x)&&isNaN(a.y));return b},toShortString:function(){return this.x+", "+this.y},move:function(a,b){this.x+=a;this.y+=b;this.clearBounds()},rotate:function(a,b){a*=
Math.PI/180;var c=this.distanceTo(b),d=a+Math.atan2(this.y-b.y,this.x-b.x);this.x=b.x+c*Math.cos(d);this.y=b.y+c*Math.sin(d);this.clearBounds()},getCentroid:function(){return new OpenLayers.Geometry.Point(this.x,this.y)},resize:function(a,b,c){this.x=b.x+a*(void 0==c?1:c)*(this.x-b.x);this.y=b.y+a*(this.y-b.y);this.clearBounds();return this},intersects:function(a){return"OpenLayers.Geometry.Point"==a.CLASS_NAME?this.equals(a):a.intersects(this)},transform:function(a,b){a&&b&&(OpenLayers.Projection.transform(this,
a,b),this.bounds=null);return this},getVertices:function(a){return[this]},CLASS_NAME:"OpenLayers.Geometry.Point"});OpenLayers.Geometry.MultiPoint=OpenLayers.Class(OpenLayers.Geometry.Collection,{componentTypes:["OpenLayers.Geometry.Point"],addPoint:function(a,b){this.addComponent(a,b)},removePoint:function(a){this.removeComponent(a)},CLASS_NAME:"OpenLayers.Geometry.MultiPoint"});OpenLayers.Geometry.Curve=OpenLayers.Class(OpenLayers.Geometry.MultiPoint,{componentTypes:["OpenLayers.Geometry.Point"],getLength:function(){var a=0;if(this.components&&1<this.components.length)for(var b=1,c=this.components.length;b<c;b++)a+=this.components[b-1].distanceTo(this.components[b]);return a},getGeodesicLength:function(a){var b=this;if(a){var c=new OpenLayers.Projection("EPSG:4326");c.equals(a)||(b=this.clone().transform(a,c))}a=0;if(b.components&&1<b.components.length)for(var d,e=1,f=b.components.length;e<
f;e++)c=b.components[e-1],d=b.components[e],a+=OpenLayers.Util.distVincenty({lon:c.x,lat:c.y},{lon:d.x,lat:d.y});return 1E3*a},CLASS_NAME:"OpenLayers.Geometry.Curve"});OpenLayers.Geometry.LineString=OpenLayers.Class(OpenLayers.Geometry.Curve,{removeComponent:function(a){var b=this.components&&2<this.components.length;b&&OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this,arguments);return b},intersects:function(a){var b=!1,c=a.CLASS_NAME;if("OpenLayers.Geometry.LineString"==c||"OpenLayers.Geometry.LinearRing"==c||"OpenLayers.Geometry.Point"==c){var d=this.getSortedSegments();a="OpenLayers.Geometry.Point"==c?[{x1:a.x,y1:a.y,x2:a.x,y2:a.y}]:a.getSortedSegments();
var e,f,g,h,k,l,m,r=0,q=d.length;a:for(;r<q;++r){c=d[r];e=c.x1;f=c.x2;g=c.y1;h=c.y2;var n=0,p=a.length;for(;n<p;++n){k=a[n];if(k.x1>f)break;if(!(k.x2<e||(l=k.y1,m=k.y2,Math.min(l,m)>Math.max(g,h)||Math.max(l,m)<Math.min(g,h)||!OpenLayers.Geometry.segmentsIntersect(c,k)))){b=!0;break a}}}}else b=a.intersects(this);return b},getSortedSegments:function(){for(var a=this.components.length-1,b=Array(a),c,d,e=0;e<a;++e)c=this.components[e],d=this.components[e+1],b[e]=c.x<d.x?{x1:c.x,y1:c.y,x2:d.x,y2:d.y}:
{x1:d.x,y1:d.y,x2:c.x,y2:c.y};return b.sort(function(a,b){return a.x1-b.x1})},splitWithSegment:function(a,b){for(var c=!(b&&!1===b.edge),d=b&&b.tolerance,e=[],f=this.getVertices(),g=[],h=[],k=!1,l,m,r,q={point:!0,tolerance:d},n=null,p=0,t=f.length-2;p<=t;++p)if(d=f[p],g.push(d.clone()),l=f[p+1],m={x1:d.x,y1:d.y,x2:l.x,y2:l.y},m=OpenLayers.Geometry.segmentsIntersect(a,m,q),m instanceof OpenLayers.Geometry.Point&&((r=m.x===a.x1&&m.y===a.y1||m.x===a.x2&&m.y===a.y2||m.equals(d)||m.equals(l)?!0:!1)||c))m.equals(h[h.length-
1])||h.push(m.clone()),0===p&&m.equals(d)||m.equals(l)||(k=!0,m.equals(d)||g.push(m),e.push(new OpenLayers.Geometry.LineString(g)),g=[m.clone()]);k&&(g.push(l.clone()),e.push(new OpenLayers.Geometry.LineString(g)));if(0<h.length)var u=a.x1<a.x2?1:-1,v=a.y1<a.y2?1:-1,n={lines:e,points:h.sort(function(a,b){return u*a.x-u*b.x||v*a.y-v*b.y})};return n},split:function(a,b){var c=null,d=b&&b.mutual,e,f,g,h;if(a instanceof OpenLayers.Geometry.LineString){var k=this.getVertices(),l,m,r,q,n,p=[];g=[];for(var t=
0,u=k.length-2;t<=u;++t){l=k[t];m=k[t+1];r={x1:l.x,y1:l.y,x2:m.x,y2:m.y};h=h||[a];d&&p.push(l.clone());for(var v=0;v<h.length;++v)if(q=h[v].splitWithSegment(r,b))if(n=q.lines,0<n.length&&(n.unshift(v,1),Array.prototype.splice.apply(h,n),v+=n.length-2),d)for(var w=0,x=q.points.length;w<x;++w)n=q.points[w],n.equals(l)||(p.push(n),g.push(new OpenLayers.Geometry.LineString(p)),p=n.equals(m)?[]:[n.clone()])}d&&0<g.length&&0<p.length&&(p.push(m.clone()),g.push(new OpenLayers.Geometry.LineString(p)))}else c=
a.splitWith(this,b);h&&1<h.length?f=!0:h=[];g&&1<g.length?e=!0:g=[];if(f||e)c=d?[g,h]:h;return c},splitWith:function(a,b){return a.split(this,b)},getVertices:function(a){return!0===a?[this.components[0],this.components[this.components.length-1]]:!1===a?this.components.slice(1,this.components.length-1):this.components.slice()},distanceTo:function(a,b){var c=!(b&&!1===b.edge)&&b&&b.details,d,e={},f=Number.POSITIVE_INFINITY;if(a instanceof OpenLayers.Geometry.Point)for(var g=this.getSortedSegments(),
h=a.x,k=a.y,l,m=0,r=g.length;m<r&&!(l=g[m],d=OpenLayers.Geometry.distanceToSegment(a,l),d.distance<f&&(f=d.distance,e=c?{distance:f,x0:d.x,y0:d.y,x1:h,y1:k,index:m,indexDistance:(new OpenLayers.Geometry.Point(l.x1,l.y1)).distanceTo(a)}:f,0===f));++m);else if(a instanceof OpenLayers.Geometry.LineString){var g=this.getSortedSegments(),h=a.getSortedSegments(),q,n,p=h.length,t={point:!0},m=0,r=g.length;a:for(;m<r;++m){k=g[m];l=k.x1;n=k.y1;for(var u=0;u<p;++u)if(d=h[u],q=OpenLayers.Geometry.segmentsIntersect(k,
d,t)){f=0;e={distance:0,x0:q.x,y0:q.y,x1:q.x,y1:q.y};break a}else d=OpenLayers.Geometry.distanceToSegment({x:l,y:n},d),d.distance<f&&(f=d.distance,e={distance:f,x0:l,y0:n,x1:d.x,y1:d.y})}c||(e=e.distance);0!==f&&k&&(d=a.distanceTo(new OpenLayers.Geometry.Point(k.x2,k.y2),b),m=c?d.distance:d,m<f&&(e=c?{distance:f,x0:d.x1,y0:d.y1,x1:d.x0,y1:d.y0}:m))}else e=a.distanceTo(this,b),c&&(e={distance:e.distance,x0:e.x1,y0:e.y1,x1:e.x0,y1:e.y0});return e},simplify:function(a){if(this&&null!==this){var b=this.getVertices();
if(3>b.length)return this;var c=function(a,b,d,k){for(var f=0,g=0,h=b,q;h<d;h++){q=a[b];var n=a[d],p=a[h];q=Math.abs(.5*(q.x*n.y+n.x*p.y+p.x*q.y-n.x*q.y-p.x*n.y-q.x*p.y))/Math.sqrt(Math.pow(q.x-n.x,2)+Math.pow(q.y-n.y,2))*2;q>f&&(f=q,g=h)}f>k&&g!=b&&(e.push(g),c(a,b,g,k),c(a,g,d,k))},d=b.length-1,e=[];e.push(0);for(e.push(d);b[0].equals(b[d]);)d--,e.push(d);c(b,0,d,a);a=[];e.sort(function(a,b){return a-b});for(d=0;d<e.length;d++)a.push(b[e[d]]);return new OpenLayers.Geometry.LineString(a)}return this},
CLASS_NAME:"OpenLayers.Geometry.LineString"});
OpenLayers.Geometry.LineString.geodesic=function(a,b,c){for(var d=[],e=a(0),f=a(1),g=b(e),h=b(f),k=[f,e],l=[h,g],m=[1,0],r={},q=1E5,n,p,t,u,v;0<--q&&0<m.length;)t=m.pop(),e=k.pop(),g=l.pop(),f=t.toString(),f in r||(d.push(g),r[f]=!0),u=m.pop(),f=k.pop(),h=l.pop(),v=(t+u)/2,n=a(v),p=b(n),OpenLayers.Geometry.distanceSquaredToSegment(p,{x1:g.x,y1:g.y,x2:h.x,y2:h.y}).distance<c?(d.push(h),f=u.toString(),r[f]=!0):(m.push(u,v,v,t),l.push(h,p,p,g),k.push(f,n,n,e));return new OpenLayers.Geometry.LineString(d)};
OpenLayers.Geometry.LineString.geodesicMeridian=function(a,b,c,d,e){var f=new OpenLayers.Projection("EPSG:4326");return OpenLayers.Geometry.LineString.geodesic(function(d){return new OpenLayers.Geometry.Point(a,b+(c-b)*d)},function(a){return a.transform(f,d)},e)};
OpenLayers.Geometry.LineString.geodesicParallel=function(a,b,c,d,e){var f=new OpenLayers.Projection("EPSG:4326");return OpenLayers.Geometry.LineString.geodesic(function(d){return new OpenLayers.Geometry.Point(b+(c-b)*d,a)},function(a){return a.transform(f,d)},e)};OpenLayers.Geometry.LinearRing=OpenLayers.Class(OpenLayers.Geometry.LineString,{componentTypes:["OpenLayers.Geometry.Point"],addComponent:function(a,b){var c=!1,d=this.components.pop();null==b&&a.equals(d)||(c=OpenLayers.Geometry.Collection.prototype.addComponent.apply(this,arguments));OpenLayers.Geometry.Collection.prototype.addComponent.apply(this,[this.components[0]]);return c},removeComponent:function(a){var b=this.components&&3<this.components.length;b&&(this.components.pop(),OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this,
arguments),OpenLayers.Geometry.Collection.prototype.addComponent.apply(this,[this.components[0]]));return b},move:function(a,b){for(var c=0,d=this.components.length;c<d-1;c++)this.components[c].move(a,b)},rotate:function(a,b){for(var c=0,d=this.components.length;c<d-1;++c)this.components[c].rotate(a,b)},resize:function(a,b,c){for(var d=0,e=this.components.length;d<e-1;++d)this.components[d].resize(a,b,c);return this},transform:function(a,b){if(a&&b){for(var c=0,d=this.components.length;c<d-1;c++)this.components[c].transform(a,
b);this.bounds=null}return this},getCentroid:function(){if(this.components){var a=this.components.length;if(0<a&&2>=a)return this.components[0].clone();if(2<a){var b=0,c=0,d=this.components[0].x,e=this.components[0].y,f=-1*this.getArea();if(0!=f){for(var g=0;g<a-1;g++)var h=this.components[g],k=this.components[g+1],b=b+(h.x+k.x-2*d)*((h.x-d)*(k.y-e)-(k.x-d)*(h.y-e)),c=c+(h.y+k.y-2*e)*((h.x-d)*(k.y-e)-(k.x-d)*(h.y-e));b=d+b/(6*f);a=e+c/(6*f)}else{for(g=0;g<a-1;g++)b+=this.components[g].x,c+=this.components[g].y;
b/=a-1;a=c/(a-1)}return new OpenLayers.Geometry.Point(b,a)}return null}},getArea:function(){var a=0;if(this.components&&2<this.components.length){for(var b=a=0,c=this.components.length;b<c-1;b++)var d=this.components[b],e=this.components[b+1],a=a+(d.x+e.x)*(e.y-d.y);a=-a/2}return a},getGeodesicArea:function(a){var b=this;if(a){var c=new OpenLayers.Projection("EPSG:4326");c.equals(a)||(b=this.clone().transform(a,c))}a=0;c=b.components&&b.components.length;if(2<c){for(var d,e,f=0;f<c-1;f++)d=b.components[f],
e=b.components[f+1],a+=OpenLayers.Util.rad(e.x-d.x)*(2+Math.sin(OpenLayers.Util.rad(d.y))+Math.sin(OpenLayers.Util.rad(e.y)));a=a*OpenLayers.Util.VincentyConstants.a*OpenLayers.Util.VincentyConstants.a/2}return a},containsPoint:function(a){var b=OpenLayers.Number.limitSigDigs,c=b(a.x,14);a=b(a.y,14);for(var d=this.components.length-1,e,f,g,h,k,l=0,m=0;m<d;++m)if(e=this.components[m],g=b(e.x,14),e=b(e.y,14),f=this.components[m+1],h=b(f.x,14),f=b(f.y,14),e==f){if(a==e&&(g<=h&&c>=g&&c<=h||g>=h&&c<=g&&
c>=h)){l=-1;break}}else{k=b((h-g)/(f-e)*(a-f)+h,14);if(k==c&&(e<f&&a>=e&&a<=f||e>f&&a<=e&&a>=f)){l=-1;break}k<=c||g!=h&&(k<Math.min(g,h)||k>Math.max(g,h))||(e<f&&a>=e&&a<f||e>f&&a<e&&a>=f)&&++l}return-1==l?1:!!(l&1)},intersects:function(a){var b=!1;if("OpenLayers.Geometry.Point"==a.CLASS_NAME)b=this.containsPoint(a);else if("OpenLayers.Geometry.LineString"==a.CLASS_NAME)b=a.intersects(this);else if("OpenLayers.Geometry.LinearRing"==a.CLASS_NAME)b=OpenLayers.Geometry.LineString.prototype.intersects.apply(this,
[a]);else for(var c=0,d=a.components.length;c<d&&!(b=a.components[c].intersects(this));++c);return b},getVertices:function(a){return!0===a?[]:this.components.slice(0,this.components.length-1)},CLASS_NAME:"OpenLayers.Geometry.LinearRing"});OpenLayers.Geometry.Polygon=OpenLayers.Class(OpenLayers.Geometry.Collection,{componentTypes:["OpenLayers.Geometry.LinearRing"],getArea:function(){var a=0;if(this.components&&0<this.components.length)for(var a=a+Math.abs(this.components[0].getArea()),b=1,c=this.components.length;b<c;b++)a-=Math.abs(this.components[b].getArea());return a},getGeodesicArea:function(a){var b=0;if(this.components&&0<this.components.length)for(var b=b+Math.abs(this.components[0].getGeodesicArea(a)),c=1,d=this.components.length;c<
d;c++)b-=Math.abs(this.components[c].getGeodesicArea(a));return b},containsPoint:function(a){var b=this.components.length,c=!1;if(0<b&&(c=this.components[0].containsPoint(a),1!==c&&c&&1<b))for(var d,e=1;e<b;++e)if(d=this.components[e].containsPoint(a)){c=1===d?1:!1;break}return c},intersects:function(a){var b=!1,c,d;if("OpenLayers.Geometry.Point"==a.CLASS_NAME)b=this.containsPoint(a);else if("OpenLayers.Geometry.LineString"==a.CLASS_NAME||"OpenLayers.Geometry.LinearRing"==a.CLASS_NAME){c=0;for(d=
this.components.length;c<d&&!(b=a.intersects(this.components[c]));++c);if(!b)for(c=0,d=a.components.length;c<d&&!(b=this.containsPoint(a.components[c]));++c);}else for(c=0,d=a.components.length;c<d&&!(b=this.intersects(a.components[c]));++c);if(!b&&"OpenLayers.Geometry.Polygon"==a.CLASS_NAME){var e=this.components[0];c=0;for(d=e.components.length;c<d&&!(b=a.containsPoint(e.components[c]));++c);}return b},distanceTo:function(a,b){return b&&!1===b.edge&&this.intersects(a)?0:OpenLayers.Geometry.Collection.prototype.distanceTo.apply(this,
[a,b])},CLASS_NAME:"OpenLayers.Geometry.Polygon"});OpenLayers.Geometry.Polygon.createRegularPolygon=function(a,b,c,d){var e=Math.PI*(1/c-.5);d&&(e+=d/180*Math.PI);for(var f,g=[],h=0;h<c;++h)f=e+2*h*Math.PI/c,d=a.x+b*Math.cos(f),f=a.y+b*Math.sin(f),g.push(new OpenLayers.Geometry.Point(d,f));a=new OpenLayers.Geometry.LinearRing(g);return new OpenLayers.Geometry.Polygon([a])};OpenLayers.Geometry.MultiPolygon=OpenLayers.Class(OpenLayers.Geometry.Collection,{componentTypes:["OpenLayers.Geometry.Polygon"],CLASS_NAME:"OpenLayers.Geometry.MultiPolygon"});OpenLayers.Feature=OpenLayers.Class({layer:null,id:null,lonlat:null,data:null,marker:null,popupClass:null,popup:null,initialize:function(a,b,c){this.layer=a;this.lonlat=b;this.data=null!=c?c:{};this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")},destroy:function(){null!=this.layer&&null!=this.layer.map&&null!=this.popup&&this.layer.map.removePopup(this.popup);null!=this.layer&&null!=this.marker&&this.layer.removeMarker(this.marker);this.data=this.lonlat=this.id=this.layer=null;null!=this.marker&&
(this.destroyMarker(this.marker),this.marker=null);null!=this.popup&&(this.destroyPopup(this.popup),this.popup=null)},onScreen:function(){var a=!1;null!=this.layer&&null!=this.layer.map&&(a=this.layer.map.getExtent().containsLonLat(this.lonlat));return a},createMarker:function(){null!=this.lonlat&&(this.marker=new OpenLayers.Marker(this.lonlat,this.data.icon));return this.marker},destroyMarker:function(){this.marker.destroy()},createPopup:function(a){null!=this.lonlat&&(this.popup||(this.popup=new (this.popupClass?
this.popupClass:OpenLayers.Popup.Anchored)(this.id+"_popup",this.lonlat,this.data.popupSize,this.data.popupContentHTML,this.marker?this.marker.icon:null,a)),null!=this.data.overflow&&(this.popup.contentDiv.style.overflow=this.data.overflow),this.popup.feature=this);return this.popup},destroyPopup:function(){this.popup&&(this.popup.feature=null,this.popup.destroy(),this.popup=null)},CLASS_NAME:"OpenLayers.Feature"});OpenLayers.State={UNKNOWN:"Unknown",INSERT:"Insert",UPDATE:"Update",DELETE:"Delete"};
OpenLayers.Feature.Vector=OpenLayers.Class(OpenLayers.Feature,{fid:null,geometry:null,attributes:null,bounds:null,state:null,style:null,url:null,renderIntent:"default",modified:null,initialize:function(a,b,c){OpenLayers.Feature.prototype.initialize.apply(this,[null,null,b]);this.lonlat=null;this.geometry=a?a:null;this.state=null;this.attributes={};b&&(this.attributes=OpenLayers.Util.extend(this.attributes,b));this.style=c?c:null},destroy:function(){this.layer&&(this.layer.removeFeatures(this),this.layer=
null);this.modified=this.geometry=null;OpenLayers.Feature.prototype.destroy.apply(this,arguments)},clone:function(){return new OpenLayers.Feature.Vector(this.geometry?this.geometry.clone():null,this.attributes,this.style)},onScreen:function(a){var b=!1;this.layer&&this.layer.map&&(b=this.layer.map.getExtent(),a?(a=this.geometry.getBounds(),b=b.intersectsBounds(a)):b=b.toGeometry().intersects(this.geometry));return b},getVisibility:function(){return!(this.style&&"none"==this.style.display||!this.layer||
this.layer&&this.layer.styleMap&&"none"==this.layer.styleMap.createSymbolizer(this,this.renderIntent).display||this.layer&&!this.layer.getVisibility())},createMarker:function(){return null},destroyMarker:function(){},createPopup:function(){return null},atPoint:function(a,b,c){var d=!1;this.geometry&&(d=this.geometry.atPoint(a,b,c));return d},destroyPopup:function(){},move:function(a){if(this.layer&&this.geometry.move){a="OpenLayers.LonLat"==a.CLASS_NAME?this.layer.getViewPortPxFromLonLat(a):a;var b=
this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat()),c=this.layer.map.getResolution();this.geometry.move(c*(a.x-b.x),c*(b.y-a.y));this.layer.drawFeature(this);return b}},toState:function(a){if(a==OpenLayers.State.UPDATE)switch(this.state){case OpenLayers.State.UNKNOWN:case OpenLayers.State.DELETE:this.state=a}else if(a==OpenLayers.State.INSERT)switch(this.state){case OpenLayers.State.UNKNOWN:break;default:this.state=a}else if(a==OpenLayers.State.DELETE)switch(this.state){case OpenLayers.State.UNKNOWN:case OpenLayers.State.UPDATE:this.state=
a}else a==OpenLayers.State.UNKNOWN&&(this.state=a)},CLASS_NAME:"OpenLayers.Feature.Vector"});
OpenLayers.Feature.Vector.style={"default":{fillColor:"#ee9900",fillOpacity:.4,hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"#ee9900",strokeOpacity:1,strokeWidth:1,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},select:{fillColor:"blue",fillOpacity:.4,
hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"blue",strokeOpacity:1,strokeWidth:2,strokeLinecap:"round",strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"pointer",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},temporary:{fillColor:"#66cccc",fillOpacity:.2,hoverFillColor:"white",hoverFillOpacity:.8,strokeColor:"#66cccc",strokeOpacity:1,
strokeLinecap:"round",strokeWidth:2,strokeDashstyle:"solid",hoverStrokeColor:"red",hoverStrokeOpacity:1,hoverStrokeWidth:.2,pointRadius:6,hoverPointRadius:1,hoverPointUnit:"%",pointerEvents:"visiblePainted",cursor:"inherit",fontColor:"#000000",labelAlign:"cm",labelOutlineColor:"white",labelOutlineWidth:3},"delete":{display:"none"}};OpenLayers.Style=OpenLayers.Class({id:null,name:null,title:null,description:null,layerName:null,isDefault:!1,rules:null,context:null,defaultStyle:null,defaultsPerSymbolizer:!1,propertyStyles:null,initialize:function(a,b){OpenLayers.Util.extend(this,b);this.rules=[];b&&b.rules&&this.addRules(b.rules);this.setDefaultStyle(a||OpenLayers.Feature.Vector.style["default"]);this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_")},destroy:function(){for(var a=0,b=this.rules.length;a<b;a++)this.rules[a].destroy(),
this.rules[a]=null;this.defaultStyle=this.rules=null},createSymbolizer:function(a){for(var b=this.defaultsPerSymbolizer?{}:this.createLiterals(OpenLayers.Util.extend({},this.defaultStyle),a),c=this.rules,d,e=[],f=!1,g=0,h=c.length;g<h;g++)d=c[g],d.evaluate(a)&&(d instanceof OpenLayers.Rule&&d.elseFilter?e.push(d):(f=!0,this.applySymbolizer(d,b,a)));if(0==f&&0<e.length)for(f=!0,g=0,h=e.length;g<h;g++)this.applySymbolizer(e[g],b,a);0<c.length&&0==f&&(b.display="none");null!=b.label&&"string"!==typeof b.label&&
(b.label=String(b.label));return b},applySymbolizer:function(a,b,c){var d=c.geometry?this.getSymbolizerPrefix(c.geometry):OpenLayers.Style.SYMBOLIZER_PREFIXES[0];a=a.symbolizer[d]||a.symbolizer;!0===this.defaultsPerSymbolizer&&(d=this.defaultStyle,OpenLayers.Util.applyDefaults(a,{pointRadius:d.pointRadius}),!0!==a.stroke&&!0!==a.graphic||OpenLayers.Util.applyDefaults(a,{strokeWidth:d.strokeWidth,strokeColor:d.strokeColor,strokeOpacity:d.strokeOpacity,strokeDashstyle:d.strokeDashstyle,strokeLinecap:d.strokeLinecap}),
!0!==a.fill&&!0!==a.graphic||OpenLayers.Util.applyDefaults(a,{fillColor:d.fillColor,fillOpacity:d.fillOpacity}),!0===a.graphic&&OpenLayers.Util.applyDefaults(a,{pointRadius:this.defaultStyle.pointRadius,externalGraphic:this.defaultStyle.externalGraphic,graphicName:this.defaultStyle.graphicName,graphicOpacity:this.defaultStyle.graphicOpacity,graphicWidth:this.defaultStyle.graphicWidth,graphicHeight:this.defaultStyle.graphicHeight,graphicXOffset:this.defaultStyle.graphicXOffset,graphicYOffset:this.defaultStyle.graphicYOffset}));
return this.createLiterals(OpenLayers.Util.extend(b,a),c)},createLiterals:function(a,b){var c=OpenLayers.Util.extend({},b.attributes||b.data);OpenLayers.Util.extend(c,this.context);for(var d in this.propertyStyles)a[d]=OpenLayers.Style.createLiteral(a[d],c,b,d);return a},findPropertyStyles:function(){var a={};this.addPropertyStyles(a,this.defaultStyle);for(var b=this.rules,c,d,e=0,f=b.length;e<f;e++){c=b[e].symbolizer;for(var g in c)if(d=c[g],"object"==typeof d)this.addPropertyStyles(a,d);else{this.addPropertyStyles(a,
c);break}}return a},addPropertyStyles:function(a,b){var c,d;for(d in b)c=b[d],"string"==typeof c&&c.match(/\$\{\w+\}/)&&(a[d]=!0);return a},addRules:function(a){Array.prototype.push.apply(this.rules,a);this.propertyStyles=this.findPropertyStyles()},setDefaultStyle:function(a){this.defaultStyle=a;this.propertyStyles=this.findPropertyStyles()},getSymbolizerPrefix:function(a){for(var b=OpenLayers.Style.SYMBOLIZER_PREFIXES,c=0,d=b.length;c<d;c++)if(-1!=a.CLASS_NAME.indexOf(b[c]))return b[c]},clone:function(){var a=
OpenLayers.Util.extend({},this);if(this.rules){a.rules=[];for(var b=0,c=this.rules.length;b<c;++b)a.rules.push(this.rules[b].clone())}a.context=this.context&&OpenLayers.Util.extend({},this.context);b=OpenLayers.Util.extend({},this.defaultStyle);return new OpenLayers.Style(b,a)},CLASS_NAME:"OpenLayers.Style"});OpenLayers.Style.createLiteral=function(a,b,c,d){"string"==typeof a&&-1!=a.indexOf("${")&&(a=OpenLayers.String.format(a,b,[c,d]),a=isNaN(a)||!a?a:parseFloat(a));return a};
OpenLayers.Style.SYMBOLIZER_PREFIXES=["Point","Line","Polygon","Text","Raster"];OpenLayers.StyleMap=OpenLayers.Class({styles:null,extendDefault:!0,initialize:function(a,b){this.styles={"default":new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]),select:new OpenLayers.Style(OpenLayers.Feature.Vector.style.select),temporary:new OpenLayers.Style(OpenLayers.Feature.Vector.style.temporary),"delete":new OpenLayers.Style(OpenLayers.Feature.Vector.style["delete"])};if(a instanceof OpenLayers.Style)this.styles["default"]=a,this.styles.select=a,this.styles.temporary=a,this.styles["delete"]=
a;else if("object"==typeof a)for(var c in a)if(a[c]instanceof OpenLayers.Style)this.styles[c]=a[c];else if("object"==typeof a[c])this.styles[c]=new OpenLayers.Style(a[c]);else{this.styles["default"]=new OpenLayers.Style(a);this.styles.select=new OpenLayers.Style(a);this.styles.temporary=new OpenLayers.Style(a);this.styles["delete"]=new OpenLayers.Style(a);break}OpenLayers.Util.extend(this,b)},destroy:function(){for(var a in this.styles)this.styles[a].destroy();this.styles=null},createSymbolizer:function(a,
b){a||(a=new OpenLayers.Feature.Vector);this.styles[b]||(b="default");a.renderIntent=b;var c={};this.extendDefault&&"default"!=b&&(c=this.styles["default"].createSymbolizer(a));return OpenLayers.Util.extend(c,this.styles[b].createSymbolizer(a))},addUniqueValueRules:function(a,b,c,d){var e=[],f;for(f in c)e.push(new OpenLayers.Rule({symbolizer:c[f],context:d,filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.EQUAL_TO,property:b,value:f})}));this.styles[a].addRules(e)},CLASS_NAME:"OpenLayers.StyleMap"});OpenLayers.Layer.Vector=OpenLayers.Class(OpenLayers.Layer,{isBaseLayer:!1,isFixed:!1,features:null,filter:null,selectedFeatures:null,unrenderedFeatures:null,reportError:!0,style:null,styleMap:null,strategies:null,protocol:null,renderers:["SVG","VML","Canvas"],renderer:null,rendererOptions:null,geometryType:null,drawn:!1,ratio:1,initialize:function(a,b){OpenLayers.Layer.prototype.initialize.apply(this,arguments);this.renderer&&this.renderer.supported()||this.assignRenderer();this.renderer&&this.renderer.supported()||
(this.renderer=null,this.displayError());this.styleMap||(this.styleMap=new OpenLayers.StyleMap);this.features=[];this.selectedFeatures=[];this.unrenderedFeatures={};if(this.strategies)for(var c=0,d=this.strategies.length;c<d;c++)this.strategies[c].setLayer(this)},destroy:function(){if(this.strategies){var a,b,c;b=0;for(c=this.strategies.length;b<c;b++)a=this.strategies[b],a.autoDestroy&&a.destroy();this.strategies=null}this.protocol&&(this.protocol.autoDestroy&&this.protocol.destroy(),this.protocol=
null);this.destroyFeatures();this.unrenderedFeatures=this.selectedFeatures=this.features=null;this.renderer&&this.renderer.destroy();this.drawn=this.geometryType=this.renderer=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments)},clone:function(a){null==a&&(a=new OpenLayers.Layer.Vector(this.name,this.getOptions()));a=OpenLayers.Layer.prototype.clone.apply(this,[a]);for(var b=this.features,c=b.length,d=Array(c),e=0;e<c;++e)d[e]=b[e].clone();a.features=d;return a},refresh:function(a){this.calculateInRange()&&
this.visibility&&this.events.triggerEvent("refresh",a)},assignRenderer:function(){for(var a=0,b=this.renderers.length;a<b;a++){var c=this.renderers[a];if((c="function"==typeof c?c:OpenLayers.Renderer[c])&&c.prototype.supported()){this.renderer=new c(this.div,this.rendererOptions);break}}},displayError:function(){this.reportError&&OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported",{renderers:this.renderers.join("\n")}))},setMap:function(a){OpenLayers.Layer.prototype.setMap.apply(this,
arguments);if(this.renderer){this.renderer.map=this.map;var b=this.map.getSize();b.w*=this.ratio;b.h*=this.ratio;this.renderer.setSize(b)}else this.map.removeLayer(this)},afterAdd:function(){if(this.strategies){var a,b,c;b=0;for(c=this.strategies.length;b<c;b++)a=this.strategies[b],a.autoActivate&&a.activate()}},removeMap:function(a){this.drawn=!1;if(this.strategies){var b,c;b=0;for(c=this.strategies.length;b<c;b++)a=this.strategies[b],a.autoActivate&&a.deactivate()}},onMapResize:function(){OpenLayers.Layer.prototype.onMapResize.apply(this,
arguments);var a=this.map.getSize();a.w*=this.ratio;a.h*=this.ratio;this.renderer.setSize(a)},moveTo:function(a,b,c){OpenLayers.Layer.prototype.moveTo.apply(this,arguments);var d=!0;if(!c){this.renderer.root.style.visibility="hidden";var d=this.map.getSize(),e=d.w,d=d.h,e=e/2*this.ratio-e/2,d=d/2*this.ratio-d/2,e=e+this.map.layerContainerOriginPx.x,e=-Math.round(e),d=d+this.map.layerContainerOriginPx.y,d=-Math.round(d);this.div.style.left=e+"px";this.div.style.top=d+"px";e=this.map.getExtent().scale(this.ratio);
d=this.renderer.setExtent(e,b);this.renderer.root.style.visibility="visible";!0===OpenLayers.IS_GECKO&&(this.div.scrollLeft=this.div.scrollLeft);if(!b&&d)for(var f in this.unrenderedFeatures)e=this.unrenderedFeatures[f],this.drawFeature(e)}if(!this.drawn||b||!d)for(this.drawn=!0,f=0,d=this.features.length;f<d;f++)this.renderer.locked=f!==d-1,e=this.features[f],this.drawFeature(e)},display:function(a){OpenLayers.Layer.prototype.display.apply(this,arguments);var b=this.div.style.display;b!=this.renderer.root.style.display&&
(this.renderer.root.style.display=b)},addFeatures:function(a,b){OpenLayers.Util.isArray(a)||(a=[a]);var c=!b||!b.silent;if(c){var d={features:a};if(!1===this.events.triggerEvent("beforefeaturesadded",d))return;a=d.features}for(var d=[],e=0,f=a.length;e<f;e++){this.renderer.locked=e!=a.length-1?!0:!1;var g=a[e];if(this.geometryType&&!(g.geometry instanceof this.geometryType))throw new TypeError("addFeatures: component should be an "+this.geometryType.prototype.CLASS_NAME);g.layer=this;!g.style&&this.style&&
(g.style=OpenLayers.Util.extend({},this.style));if(c){if(!1===this.events.triggerEvent("beforefeatureadded",{feature:g}))continue;this.preFeatureInsert(g)}d.push(g);this.features.push(g);this.drawFeature(g);c&&(this.events.triggerEvent("featureadded",{feature:g}),this.onFeatureInsert(g))}c&&this.events.triggerEvent("featuresadded",{features:d})},removeFeatures:function(a,b){if(a&&0!==a.length){if(a===this.features)return this.removeAllFeatures(b);OpenLayers.Util.isArray(a)||(a=[a]);a===this.selectedFeatures&&
(a=a.slice());var c=!b||!b.silent;c&&this.events.triggerEvent("beforefeaturesremoved",{features:a});for(var d=a.length-1;0<=d;d--){this.renderer.locked=0!=d&&a[d-1].geometry?!0:!1;var e=a[d];delete this.unrenderedFeatures[e.id];c&&this.events.triggerEvent("beforefeatureremoved",{feature:e});this.features=OpenLayers.Util.removeItem(this.features,e);e.layer=null;e.geometry&&this.renderer.eraseFeatures(e);-1!=OpenLayers.Util.indexOf(this.selectedFeatures,e)&&OpenLayers.Util.removeItem(this.selectedFeatures,
e);c&&this.events.triggerEvent("featureremoved",{feature:e})}c&&this.events.triggerEvent("featuresremoved",{features:a})}},removeAllFeatures:function(a){a=!a||!a.silent;var b=this.features;a&&this.events.triggerEvent("beforefeaturesremoved",{features:b});for(var c,d=b.length-1;0<=d;d--)c=b[d],a&&this.events.triggerEvent("beforefeatureremoved",{feature:c}),c.layer=null,a&&this.events.triggerEvent("featureremoved",{feature:c});this.renderer.clear();this.features=[];this.unrenderedFeatures={};this.selectedFeatures=
[];a&&this.events.triggerEvent("featuresremoved",{features:b})},destroyFeatures:function(a,b){void 0==a&&(a=this.features);if(a){this.removeFeatures(a,b);for(var c=a.length-1;0<=c;c--)a[c].destroy()}},drawFeature:function(a,b){if(this.drawn){if("object"!=typeof b){b||a.state!==OpenLayers.State.DELETE||(b="delete");var c=b||a.renderIntent;(b=a.style||this.style)||(b=this.styleMap.createSymbolizer(a,c))}c=this.renderer.drawFeature(a,b);!1===c||null===c?this.unrenderedFeatures[a.id]=a:delete this.unrenderedFeatures[a.id]}},
eraseFeatures:function(a){this.renderer.eraseFeatures(a)},getFeatureFromEvent:function(a){if(!this.renderer)throw Error("getFeatureFromEvent called on layer with no renderer. This usually means you destroyed a layer, but not some handler which is associated with it.");var b=null;(a=this.renderer.getFeatureIdFromEvent(a))&&(b="string"===typeof a?this.getFeatureById(a):a);return b},getFeatureBy:function(a,b){for(var c=null,d=0,e=this.features.length;d<e;++d)if(this.features[d][a]==b){c=this.features[d];
break}return c},getFeatureById:function(a){return this.getFeatureBy("id",a)},getFeatureByFid:function(a){return this.getFeatureBy("fid",a)},getFeaturesByAttribute:function(a,b){var c,d,e=this.features.length,f=[];for(c=0;c<e;c++)(d=this.features[c])&&d.attributes&&d.attributes[a]===b&&f.push(d);return f},onFeatureInsert:function(a){},preFeatureInsert:function(a){},getDataExtent:function(){var a=null,b=this.features;if(b&&0<b.length)for(var c,d=0,e=b.length;d<e;d++)if(c=b[d].geometry)null===a&&(a=
new OpenLayers.Bounds),a.extend(c.getBounds());return a},CLASS_NAME:"OpenLayers.Layer.Vector"});OpenLayers.Layer.Markers=OpenLayers.Class(OpenLayers.Layer,{isBaseLayer:!1,markers:null,drawn:!1,initialize:function(a,b){OpenLayers.Layer.prototype.initialize.apply(this,arguments);this.markers=[]},destroy:function(){this.clearMarkers();this.markers=null;OpenLayers.Layer.prototype.destroy.apply(this,arguments)},setOpacity:function(a){if(a!=this.opacity){this.opacity=a;a=0;for(var b=this.markers.length;a<b;a++)this.markers[a].setOpacity(this.opacity)}},moveTo:function(a,b,c){OpenLayers.Layer.prototype.moveTo.apply(this,
arguments);if(b||!this.drawn){for(var d=0,e=this.markers.length;d<e;d++)this.drawMarker(this.markers[d]);this.drawn=!0}},addMarker:function(a){this.markers.push(a);1>this.opacity&&a.setOpacity(this.opacity);this.map&&this.map.getExtent()&&(a.map=this.map,this.drawMarker(a))},removeMarker:function(a){this.markers&&this.markers.length&&(OpenLayers.Util.removeItem(this.markers,a),a.erase())},clearMarkers:function(){if(null!=this.markers)for(;0<this.markers.length;)this.removeMarker(this.markers[0])},
drawMarker:function(a){var b=this.map.getLayerPxFromLonLat(a.lonlat);null==b?a.display(!1):a.isDrawn()?a.icon&&a.icon.moveTo(b):(a=a.draw(b),this.div.appendChild(a))},getDataExtent:function(){var a=null;if(this.markers&&0<this.markers.length)for(var a=new OpenLayers.Bounds,b=0,c=this.markers.length;b<c;b++)a.extend(this.markers[b].lonlat);return a},CLASS_NAME:"OpenLayers.Layer.Markers"});OpenLayers.Layer.TMS=OpenLayers.Class(OpenLayers.Layer.Grid,{serviceVersion:"1.0.0",layername:null,type:null,isBaseLayer:!0,tileOrigin:null,serverResolutions:null,zoomOffset:0,initialize:function(a,b,c){var d=[];d.push(a,b,{},c);OpenLayers.Layer.Grid.prototype.initialize.apply(this,d)},clone:function(a){null==a&&(a=new OpenLayers.Layer.TMS(this.name,this.url,this.getOptions()));return a=OpenLayers.Layer.Grid.prototype.clone.apply(this,[a])},getURL:function(a){a=this.adjustBounds(a);var b=this.getServerResolution(),
c=Math.round((a.left-this.tileOrigin.lon)/(b*this.tileSize.w));a=Math.round((a.bottom-this.tileOrigin.lat)/(b*this.tileSize.h));b=this.getServerZoom();c=this.serviceVersion+"/"+this.layername+"/"+b+"/"+c+"/"+a+"."+this.type;a=this.url;OpenLayers.Util.isArray(a)&&(a=this.selectUrl(c,a));return a+c},setMap:function(a){OpenLayers.Layer.Grid.prototype.setMap.apply(this,arguments);this.tileOrigin||(this.tileOrigin=new OpenLayers.LonLat(this.map.maxExtent.left,this.map.maxExtent.bottom))},CLASS_NAME:"OpenLayers.Layer.TMS"});OpenLayers.Format=OpenLayers.Class({options:null,externalProjection:null,internalProjection:null,data:null,keepData:!1,initialize:function(a){OpenLayers.Util.extend(this,a);this.options=a},destroy:function(){},read:function(a){throw Error("Read not implemented.");},write:function(a){throw Error("Write not implemented.");},CLASS_NAME:"OpenLayers.Format"});OpenLayers.Format.JSON=OpenLayers.Class(OpenLayers.Format,{indent:"    ",space:" ",newline:"\n",level:0,pretty:!1,nativeJSON:function(){return!(!window.JSON||"function"!=typeof JSON.parse||"function"!=typeof JSON.stringify)}(),read:function(a,b){var c;if(this.nativeJSON)c=JSON.parse(a,b);else try{if(/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/bfnrtu]/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))&&(c=eval("("+a+")"),"function"===
typeof b)){var d=function(a,c){if(c&&"object"===typeof c)for(var e in c)c.hasOwnProperty(e)&&(c[e]=d(e,c[e]));return b(a,c)};c=d("",c)}}catch(e){}this.keepData&&(this.data=c);return c},write:function(a,b){this.pretty=!!b;var c=null,d=typeof a;if(this.serialize[d])try{c=!this.pretty&&this.nativeJSON?JSON.stringify(a):this.serialize[d].apply(this,[a])}catch(e){OpenLayers.Console.error("Trouble serializing: "+e)}return c},writeIndent:function(){var a=[];if(this.pretty)for(var b=0;b<this.level;++b)a.push(this.indent);
return a.join("")},writeNewline:function(){return this.pretty?this.newline:""},writeSpace:function(){return this.pretty?this.space:""},serialize:{object:function(a){if(null==a)return"null";if(a.constructor==Date)return this.serialize.date.apply(this,[a]);if(a.constructor==Array)return this.serialize.array.apply(this,[a]);var b=["{"];this.level+=1;var c,d,e,f=!1;for(c in a)a.hasOwnProperty(c)&&(d=OpenLayers.Format.JSON.prototype.write.apply(this,[c,this.pretty]),e=OpenLayers.Format.JSON.prototype.write.apply(this,
[a[c],this.pretty]),null!=d&&null!=e&&(f&&b.push(","),b.push(this.writeNewline(),this.writeIndent(),d,":",this.writeSpace(),e),f=!0));--this.level;b.push(this.writeNewline(),this.writeIndent(),"}");return b.join("")},array:function(a){var b,c=["["];this.level+=1;for(var d=0,e=a.length;d<e;++d)b=OpenLayers.Format.JSON.prototype.write.apply(this,[a[d],this.pretty]),null!=b&&(0<d&&c.push(","),c.push(this.writeNewline(),this.writeIndent(),b));--this.level;c.push(this.writeNewline(),this.writeIndent(),
"]");return c.join("")},string:function(a){var b={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return/["\\\x00-\x1f]/.test(a)?'"'+a.replace(/([\x00-\x1f\\"])/g,function(a,d){var c=b[d];if(c)return c;c=d.charCodeAt();return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)})+'"':'"'+a+'"'},number:function(a){return isFinite(a)?String(a):"null"},"boolean":function(a){return String(a)},date:function(a){function b(a){return 10>a?"0"+a:a}return'"'+a.getFullYear()+
"-"+b(a.getMonth()+1)+"-"+b(a.getDate())+"T"+b(a.getHours())+":"+b(a.getMinutes())+":"+b(a.getSeconds())+'"'}},CLASS_NAME:"OpenLayers.Format.JSON"});OpenLayers.Geometry.MultiLineString=OpenLayers.Class(OpenLayers.Geometry.Collection,{componentTypes:["OpenLayers.Geometry.LineString"],split:function(a,b){for(var c=null,d=b&&b.mutual,e,f,g,h,k=[],l=[a],m=0,r=this.components.length;m<r;++m){f=this.components[m];g=!1;for(var q=0;q<l.length;++q)if(e=f.split(l[q],b)){if(d){g=e[0];for(var n=0,p=g.length;n<p;++n)0===n&&k.length?k[k.length-1].addComponent(g[n]):k.push(new OpenLayers.Geometry.MultiLineString([g[n]]));g=!0;e=e[1]}if(e.length){e.unshift(q,
1);Array.prototype.splice.apply(l,e);break}}g||(k.length?k[k.length-1].addComponent(f.clone()):k=[new OpenLayers.Geometry.MultiLineString(f.clone())])}k&&1<k.length?g=!0:k=[];l&&1<l.length?h=!0:l=[];if(g||h)c=d?[k,l]:l;return c},splitWith:function(a,b){var c=null,d=b&&b.mutual,e,f,g,h,k,l;if(a instanceof OpenLayers.Geometry.LineString){l=[];k=[a];for(var m=0,r=this.components.length;m<r;++m){g=!1;f=this.components[m];for(var q=0;q<k.length;++q)if(e=k[q].split(f,b)){d&&(g=e[0],g.length&&(g.unshift(q,
1),Array.prototype.splice.apply(k,g),q+=g.length-2),e=e[1],0===e.length&&(e=[f.clone()]));g=0;for(var n=e.length;g<n;++g)0===g&&l.length?l[l.length-1].addComponent(e[g]):l.push(new OpenLayers.Geometry.MultiLineString([e[g]]));g=!0}g||(l.length?l[l.length-1].addComponent(f.clone()):l=[new OpenLayers.Geometry.MultiLineString([f.clone()])])}}else c=a.split(this);k&&1<k.length?h=!0:k=[];l&&1<l.length?g=!0:l=[];if(h||g)c=d?[k,l]:l;return c},CLASS_NAME:"OpenLayers.Geometry.MultiLineString"});OpenLayers.Format.GeoJSON=OpenLayers.Class(OpenLayers.Format.JSON,{ignoreExtraDims:!1,read:function(a,b,c){b=b?b:"FeatureCollection";var d=null;c="string"==typeof a?OpenLayers.Format.JSON.prototype.read.apply(this,[a,c]):a;if(!c)OpenLayers.Console.error("Bad JSON: "+a);else if("string"!=typeof c.type)OpenLayers.Console.error("Bad GeoJSON - no type: "+a);else if(this.isValidType(c,b))switch(b){case "Geometry":try{d=this.parseGeometry(c)}catch(f){OpenLayers.Console.error(f)}break;case "Feature":try{d=
this.parseFeature(c),d.type="Feature"}catch(f){OpenLayers.Console.error(f)}break;case "FeatureCollection":switch(d=[],c.type){case "Feature":try{d.push(this.parseFeature(c))}catch(f){d=null,OpenLayers.Console.error(f)}break;case "FeatureCollection":a=0;for(b=c.features.length;a<b;++a)try{d.push(this.parseFeature(c.features[a]))}catch(f){d=null,OpenLayers.Console.error(f)}break;default:try{var e=this.parseGeometry(c);d.push(new OpenLayers.Feature.Vector(e))}catch(f){d=null,OpenLayers.Console.error(f)}}}return d},
isValidType:function(a,b){var c=!1;switch(b){case "Geometry":-1==OpenLayers.Util.indexOf("Point MultiPoint LineString MultiLineString Polygon MultiPolygon Box GeometryCollection".split(" "),a.type)?OpenLayers.Console.error("Unsupported geometry type: "+a.type):c=!0;break;case "FeatureCollection":c=!0;break;default:a.type==b?c=!0:OpenLayers.Console.error("Cannot convert types from "+a.type+" to "+b)}return c},parseFeature:function(a){var b,c,d;c=a.properties?a.properties:{};d=a.geometry&&a.geometry.bbox||
a.bbox;try{b=this.parseGeometry(a.geometry)}catch(e){throw e;}b=new OpenLayers.Feature.Vector(b,c);d&&(b.bounds=OpenLayers.Bounds.fromArray(d));a.id&&(b.fid=a.id);return b},parseGeometry:function(a){if(null==a)return null;var b,c=!1;if("GeometryCollection"==a.type){if(!OpenLayers.Util.isArray(a.geometries))throw"GeometryCollection must have geometries array: "+a;b=a.geometries.length;for(var c=Array(b),d=0;d<b;++d)c[d]=this.parseGeometry.apply(this,[a.geometries[d]]);b=new OpenLayers.Geometry.Collection(c);
c=!0}else{if(!OpenLayers.Util.isArray(a.coordinates))throw"Geometry must have coordinates array: "+a;if(!this.parseCoords[a.type.toLowerCase()])throw"Unsupported geometry type: "+a.type;try{b=this.parseCoords[a.type.toLowerCase()].apply(this,[a.coordinates])}catch(e){throw e;}}this.internalProjection&&this.externalProjection&&!c&&b.transform(this.externalProjection,this.internalProjection);return b},parseCoords:{point:function(a){if(0==this.ignoreExtraDims&&2!=a.length)throw"Only 2D points are supported: "+
a;return new OpenLayers.Geometry.Point(a[0],a[1])},multipoint:function(a){for(var b=[],c=null,d=0,e=a.length;d<e;++d){try{c=this.parseCoords.point.apply(this,[a[d]])}catch(f){throw f;}b.push(c)}return new OpenLayers.Geometry.MultiPoint(b)},linestring:function(a){for(var b=[],c=null,d=0,e=a.length;d<e;++d){try{c=this.parseCoords.point.apply(this,[a[d]])}catch(f){throw f;}b.push(c)}return new OpenLayers.Geometry.LineString(b)},multilinestring:function(a){for(var b=[],c=null,d=0,e=a.length;d<e;++d){try{c=
this.parseCoords.linestring.apply(this,[a[d]])}catch(f){throw f;}b.push(c)}return new OpenLayers.Geometry.MultiLineString(b)},polygon:function(a){for(var b=[],c,d,e=0,f=a.length;e<f;++e){try{d=this.parseCoords.linestring.apply(this,[a[e]])}catch(g){throw g;}c=new OpenLayers.Geometry.LinearRing(d.components);b.push(c)}return new OpenLayers.Geometry.Polygon(b)},multipolygon:function(a){for(var b=[],c=null,d=0,e=a.length;d<e;++d){try{c=this.parseCoords.polygon.apply(this,[a[d]])}catch(f){throw f;}b.push(c)}return new OpenLayers.Geometry.MultiPolygon(b)},
box:function(a){if(2!=a.length)throw"GeoJSON box coordinates must have 2 elements";return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(a[0][0],a[0][1]),new OpenLayers.Geometry.Point(a[1][0],a[0][1]),new OpenLayers.Geometry.Point(a[1][0],a[1][1]),new OpenLayers.Geometry.Point(a[0][0],a[1][1]),new OpenLayers.Geometry.Point(a[0][0],a[0][1])])])}},write:function(a,b){var c={type:null};if(OpenLayers.Util.isArray(a)){c.type="FeatureCollection";var d=
a.length;c.features=Array(d);for(var e=0;e<d;++e){var f=a[e];if(!f instanceof OpenLayers.Feature.Vector)throw"FeatureCollection only supports collections of features: "+f;c.features[e]=this.extract.feature.apply(this,[f])}}else 0==a.CLASS_NAME.indexOf("OpenLayers.Geometry")?c=this.extract.geometry.apply(this,[a]):a instanceof OpenLayers.Feature.Vector&&(c=this.extract.feature.apply(this,[a]),a.layer&&a.layer.projection&&(c.crs=this.createCRSObject(a)));return OpenLayers.Format.JSON.prototype.write.apply(this,
[c,b])},createCRSObject:function(a){a=a.layer.projection.toString();var b={};a.match(/epsg:/i)&&(a=parseInt(a.substring(a.indexOf(":")+1)),b=4326==a?{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}}:{type:"name",properties:{name:"EPSG:"+a}});return b},extract:{feature:function(a){var b=this.extract.geometry.apply(this,[a.geometry]),b={type:"Feature",properties:a.attributes,geometry:b};null!=a.fid&&(b.id=a.fid);return b},geometry:function(a){if(null==a)return null;this.internalProjection&&
this.externalProjection&&(a=a.clone(),a.transform(this.internalProjection,this.externalProjection));var b=a.CLASS_NAME.split(".")[2];a=this.extract[b.toLowerCase()].apply(this,[a]);return"Collection"==b?{type:"GeometryCollection",geometries:a}:{type:b,coordinates:a}},point:function(a){return[a.x,a.y]},multipoint:function(a){for(var b=[],c=0,d=a.components.length;c<d;++c)b.push(this.extract.point.apply(this,[a.components[c]]));return b},linestring:function(a){for(var b=[],c=0,d=a.components.length;c<
d;++c)b.push(this.extract.point.apply(this,[a.components[c]]));return b},multilinestring:function(a){for(var b=[],c=0,d=a.components.length;c<d;++c)b.push(this.extract.linestring.apply(this,[a.components[c]]));return b},polygon:function(a){for(var b=[],c=0,d=a.components.length;c<d;++c)b.push(this.extract.linestring.apply(this,[a.components[c]]));return b},multipolygon:function(a){for(var b=[],c=0,d=a.components.length;c<d;++c)b.push(this.extract.polygon.apply(this,[a.components[c]]));return b},collection:function(a){for(var b=
a.components.length,c=Array(b),d=0;d<b;++d)c[d]=this.extract.geometry.apply(this,[a.components[d]]);return c}},CLASS_NAME:"OpenLayers.Format.GeoJSON"});OpenLayers.Control=OpenLayers.Class({id:null,map:null,div:null,type:null,allowSelection:!1,displayClass:"",title:"",autoActivate:!1,active:null,handlerOptions:null,handler:null,eventListeners:null,events:null,initialize:function(a){this.displayClass=this.CLASS_NAME.replace("OpenLayers.","ol").replace(/\./g,"");OpenLayers.Util.extend(this,a);this.events=new OpenLayers.Events(this);if(this.eventListeners instanceof Object)this.events.on(this.eventListeners);null==this.id&&(this.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+
"_"))},destroy:function(){this.events&&(this.eventListeners&&this.events.un(this.eventListeners),this.events.destroy(),this.events=null);this.eventListeners=null;this.handler&&(this.handler.destroy(),this.handler=null);if(this.handlers){for(var a in this.handlers)this.handlers.hasOwnProperty(a)&&"function"==typeof this.handlers[a].destroy&&this.handlers[a].destroy();this.handlers=null}this.map&&(this.map.removeControl(this),this.map=null);this.div=null},setMap:function(a){this.map=a;this.handler&&
this.handler.setMap(a)},draw:function(a){null==this.div&&(this.div=OpenLayers.Util.createDiv(this.id),this.div.className=this.displayClass,this.allowSelection||(this.div.className+=" olControlNoSelect",this.div.setAttribute("unselectable","on",0),this.div.onselectstart=OpenLayers.Function.False),""!=this.title&&(this.div.title=this.title));null!=a&&(this.position=a.clone());this.moveTo(this.position);return this.div},moveTo:function(a){null!=a&&null!=this.div&&(this.div.style.left=a.x+"px",this.div.style.top=
a.y+"px")},activate:function(){if(this.active)return!1;this.handler&&this.handler.activate();this.active=!0;this.map&&OpenLayers.Element.addClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active");this.events.triggerEvent("activate");return!0},deactivate:function(){return this.active?(this.handler&&this.handler.deactivate(),this.active=!1,this.map&&OpenLayers.Element.removeClass(this.map.viewPortDiv,this.displayClass.replace(/ /g,"")+"Active"),this.events.triggerEvent("deactivate"),
!0):!1},CLASS_NAME:"OpenLayers.Control"});OpenLayers.Control.TYPE_BUTTON=1;OpenLayers.Control.TYPE_TOGGLE=2;OpenLayers.Control.TYPE_TOOL=3;OpenLayers.Control.DrawFeature=OpenLayers.Class(OpenLayers.Control,{layer:null,callbacks:null,multi:!1,featureAdded:function(){},initialize:function(a,b,c){OpenLayers.Control.prototype.initialize.apply(this,[c]);this.callbacks=OpenLayers.Util.extend({done:this.drawFeature,modify:function(a,b){this.layer.events.triggerEvent("sketchmodified",{vertex:a,feature:b})},create:function(a,b){this.layer.events.triggerEvent("sketchstarted",{vertex:a,feature:b})}},this.callbacks);this.layer=a;this.handlerOptions=
this.handlerOptions||{};this.handlerOptions.layerOptions=OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions,{renderers:a.renderers,rendererOptions:a.rendererOptions});"multi"in this.handlerOptions||(this.handlerOptions.multi=this.multi);if(a=this.layer.styleMap&&this.layer.styleMap.styles.temporary)this.handlerOptions.layerOptions=OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions,{styleMap:new OpenLayers.StyleMap({"default":a})});this.handler=new b(this,this.callbacks,this.handlerOptions)},
drawFeature:function(a){a=new OpenLayers.Feature.Vector(a);!1!==this.layer.events.triggerEvent("sketchcomplete",{feature:a})&&(a.state=OpenLayers.State.INSERT,this.layer.addFeatures([a]),this.featureAdded(a),this.events.triggerEvent("featureadded",{feature:a}))},insertXY:function(a,b){this.handler&&this.handler.line&&this.handler.insertXY(a,b)},insertDeltaXY:function(a,b){this.handler&&this.handler.line&&this.handler.insertDeltaXY(a,b)},insertDirectionLength:function(a,b){this.handler&&this.handler.line&&
this.handler.insertDirectionLength(a,b)},insertDeflectionLength:function(a,b){this.handler&&this.handler.line&&this.handler.insertDeflectionLength(a,b)},undo:function(){return this.handler.undo&&this.handler.undo()},redo:function(){return this.handler.redo&&this.handler.redo()},finishSketch:function(){this.handler.finishGeometry()},cancel:function(){this.handler.cancel()},CLASS_NAME:"OpenLayers.Control.DrawFeature"});OpenLayers.Control.MousePosition=OpenLayers.Class(OpenLayers.Control,{autoActivate:!0,element:null,prefix:"",separator:", ",suffix:"",numDigits:5,granularity:10,emptyString:null,lastXy:null,displayProjection:null,destroy:function(){this.deactivate();OpenLayers.Control.prototype.destroy.apply(this,arguments)},activate:function(){return OpenLayers.Control.prototype.activate.apply(this,arguments)?(this.map.events.register("mousemove",this,this.redraw),this.map.events.register("mouseout",this,this.reset),
this.redraw(),!0):!1},deactivate:function(){return OpenLayers.Control.prototype.deactivate.apply(this,arguments)?(this.map.events.unregister("mousemove",this,this.redraw),this.map.events.unregister("mouseout",this,this.reset),this.element.innerHTML="",!0):!1},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);this.element||(this.div.left="",this.div.top="",this.element=this.div);return this.div},redraw:function(a){var b;if(null==a)this.reset();else if(null==this.lastXy||Math.abs(a.xy.x-
this.lastXy.x)>this.granularity||Math.abs(a.xy.y-this.lastXy.y)>this.granularity)this.lastXy=a.xy;else if(b=this.map.getLonLatFromPixel(a.xy))this.displayProjection&&b.transform(this.map.getProjectionObject(),this.displayProjection),this.lastXy=a.xy,a=this.formatOutput(b),a!=this.element.innerHTML&&(this.element.innerHTML=a)},reset:function(a){null!=this.emptyString&&(this.element.innerHTML=this.emptyString)},formatOutput:function(a){var b=parseInt(this.numDigits);return this.prefix+a.lon.toFixed(b)+
this.separator+a.lat.toFixed(b)+this.suffix},CLASS_NAME:"OpenLayers.Control.MousePosition"});OpenLayers.Events.buttonclick=OpenLayers.Class({target:null,events:"mousedown mouseup click dblclick touchstart touchmove touchend keydown".split(" "),startRegEx:/^mousedown|touchstart$/,cancelRegEx:/^touchmove$/,completeRegEx:/^mouseup|touchend$/,isDeviceTouchCapable:"ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,initialize:function(a){this.target=a;for(a=this.events.length-1;0<=a;--a)this.target.register(this.events[a],this,this.buttonClick,{extension:!0})},
destroy:function(){for(var a=this.events.length-1;0<=a;--a)this.target.unregister(this.events[a],this,this.buttonClick);delete this.target},getPressedButton:function(a){var b=3,c;do{if(OpenLayers.Element.hasClass(a,"olButton")){c=a;break}a=a.parentNode}while(0<--b&&a);return c},ignore:function(a){var b=3,c=!1;do{if("a"===a.nodeName.toLowerCase()){c=!0;break}a=a.parentNode}while(0<--b&&a);return c},buttonClick:function(a){var b=!0,c=OpenLayers.Event.element(a);if(c&&(OpenLayers.Event.isLeftClick(a)&&
!this.isDeviceTouchCapable||!~a.type.indexOf("mouse")))if(c=this.getPressedButton(c)){if("keydown"===a.type)switch(a.keyCode){case OpenLayers.Event.KEY_RETURN:case OpenLayers.Event.KEY_SPACE:this.target.triggerEvent("buttonclick",{buttonElement:c}),OpenLayers.Event.stop(a),b=!1}else if(this.startEvt){if(this.completeRegEx.test(a.type)){var b=OpenLayers.Util.pagePosition(c),d=OpenLayers.Util.getViewportElement(),e=window.pageYOffset||d.scrollTop;b[0]-=window.pageXOffset||d.scrollLeft;b[1]-=e;this.target.triggerEvent("buttonclick",
{buttonElement:c,buttonXY:{x:this.startEvt.clientX-b[0],y:this.startEvt.clientY-b[1]}})}this.cancelRegEx.test(a.type)&&a.touches&&this.startEvt.touches&&4<(4<Math.abs(a.touches[0].olClientX-this.startEvt.touches[0].olClientX)||Math.abs(a.touches[0].olClientY-this.startEvt.touches[0].olClientY))&&delete this.startEvt;OpenLayers.Event.stop(a);b=!1}this.startRegEx.test(a.type)&&(this.startEvt=a,OpenLayers.Event.stop(a),b=!1)}else b=!this.ignore(OpenLayers.Event.element(a)),delete this.startEvt;return b}});OpenLayers.Control.Zoom=OpenLayers.Class(OpenLayers.Control,{zoomInText:"+",zoomInId:"olZoomInLink",zoomOutText:"\u2212",zoomOutId:"olZoomOutLink",draw:function(){var a=OpenLayers.Control.prototype.draw.apply(this),b=this.getOrCreateLinks(a),c=b.zoomIn,b=b.zoomOut,d=this.map.events;b.parentNode!==a&&(d=this.events,d.attachToElement(b.parentNode));d.register("buttonclick",this,this.onZoomClick);this.zoomInLink=c;this.zoomOutLink=b;return a},getOrCreateLinks:function(a){var b=document.getElementById(this.zoomInId),
c=document.getElementById(this.zoomOutId);b||(b=document.createElement("a"),b.href="#zoomIn",b.appendChild(document.createTextNode(this.zoomInText)),b.className="olControlZoomIn",a.appendChild(b));OpenLayers.Element.addClass(b,"olButton");c||(c=document.createElement("a"),c.href="#zoomOut",c.appendChild(document.createTextNode(this.zoomOutText)),c.className="olControlZoomOut",a.appendChild(c));OpenLayers.Element.addClass(c,"olButton");return{zoomIn:b,zoomOut:c}},onZoomClick:function(a){a=a.buttonElement;
a===this.zoomInLink?this.map.zoomIn():a===this.zoomOutLink&&this.map.zoomOut()},destroy:function(){this.map&&this.map.events.unregister("buttonclick",this,this.onZoomClick);delete this.zoomInLink;delete this.zoomOutLink;OpenLayers.Control.prototype.destroy.apply(this)},CLASS_NAME:"OpenLayers.Control.Zoom"});OpenLayers.Handler.Feature=OpenLayers.Class(OpenLayers.Handler,{EVENTMAP:{click:{"in":"click",out:"clickout"},mousemove:{"in":"over",out:"out"},dblclick:{"in":"dblclick",out:null},mousedown:{"in":null,out:null},mouseup:{"in":null,out:null},touchstart:{"in":"click",out:"clickout"}},feature:null,lastFeature:null,down:null,up:null,clickTolerance:4,geometryTypes:null,stopClick:!0,stopDown:!0,stopUp:!1,initialize:function(a,b,c,d){OpenLayers.Handler.prototype.initialize.apply(this,[a,c,d]);this.layer=
b},touchstart:function(a){this.startTouch();return OpenLayers.Event.isMultiTouch(a)?!0:this.mousedown(a)},touchmove:function(a){OpenLayers.Event.preventDefault(a)},mousedown:function(a){if(OpenLayers.Event.isLeftClick(a)||OpenLayers.Event.isSingleTouch(a))this.down=a.xy;return this.handle(a)?!this.stopDown:!0},mouseup:function(a){this.up=a.xy;return this.handle(a)?!this.stopUp:!0},click:function(a){return this.handle(a)?!this.stopClick:!0},mousemove:function(a){if(!this.callbacks.over&&!this.callbacks.out)return!0;
this.handle(a);return!0},dblclick:function(a){return!this.handle(a)},geometryTypeMatches:function(a){return null==this.geometryTypes||-1<OpenLayers.Util.indexOf(this.geometryTypes,a.geometry.CLASS_NAME)},handle:function(a){this.feature&&!this.feature.layer&&(this.feature=null);var b=a.type,c=!1,d=!!this.feature,e="click"==b||"dblclick"==b||"touchstart"==b;(this.feature=this.layer.getFeatureFromEvent(a))&&!this.feature.layer&&(this.feature=null);this.lastFeature&&!this.lastFeature.layer&&(this.lastFeature=
null);this.feature?("touchstart"===b&&OpenLayers.Event.preventDefault(a),a=this.feature!=this.lastFeature,this.geometryTypeMatches(this.feature)?(d&&a?(this.lastFeature&&this.triggerCallback(b,"out",[this.lastFeature]),this.triggerCallback(b,"in",[this.feature])):d&&!e||this.triggerCallback(b,"in",[this.feature]),this.lastFeature=this.feature,c=!0):(this.lastFeature&&(d&&a||e)&&this.triggerCallback(b,"out",[this.lastFeature]),this.feature=null)):this.lastFeature&&(d||e)&&this.triggerCallback(b,"out",
[this.lastFeature]);return c},triggerCallback:function(a,b,c){if(b=this.EVENTMAP[a][b])"click"==a&&this.up&&this.down?(Math.sqrt(Math.pow(this.up.x-this.down.x,2)+Math.pow(this.up.y-this.down.y,2))<=this.clickTolerance&&this.callback(b,c),this.up=this.down=null):this.callback(b,c)},activate:function(){var a=!1;OpenLayers.Handler.prototype.activate.apply(this,arguments)&&(this.moveLayerToTop(),this.map.events.on({removelayer:this.handleMapEvents,changelayer:this.handleMapEvents,scope:this}),a=!0);
return a},deactivate:function(){var a=!1;OpenLayers.Handler.prototype.deactivate.apply(this,arguments)&&(this.moveLayerBack(),this.up=this.down=this.lastFeature=this.feature=null,this.map.events.un({removelayer:this.handleMapEvents,changelayer:this.handleMapEvents,scope:this}),a=!0);return a},handleMapEvents:function(a){"removelayer"!=a.type&&"order"!=a.property||this.moveLayerToTop()},moveLayerToTop:function(){var a=Math.max(this.map.Z_INDEX_BASE.Feature-1,this.layer.getZIndex())+1;this.layer.setZIndex(a)},
moveLayerBack:function(){var a=this.layer.getZIndex()-1;a>=this.map.Z_INDEX_BASE.Feature?this.layer.setZIndex(a):this.map.setLayerZIndex(this.layer,this.map.getLayerIndex(this.layer))},CLASS_NAME:"OpenLayers.Handler.Feature"});OpenLayers.Layer.Vector.RootContainer=OpenLayers.Class(OpenLayers.Layer.Vector,{displayInLayerSwitcher:!1,layers:null,display:function(){},getFeatureFromEvent:function(a){for(var b=this.layers,c,d=0;d<b.length;d++)if(c=b[d].getFeatureFromEvent(a))return c},setMap:function(a){OpenLayers.Layer.Vector.prototype.setMap.apply(this,arguments);this.collectRoots();a.events.register("changelayer",this,this.handleChangeLayer)},removeMap:function(a){a.events.unregister("changelayer",this,this.handleChangeLayer);
this.resetRoots();OpenLayers.Layer.Vector.prototype.removeMap.apply(this,arguments)},collectRoots:function(){for(var a,b=0;b<this.map.layers.length;++b)a=this.map.layers[b],-1!=OpenLayers.Util.indexOf(this.layers,a)&&a.renderer.moveRoot(this.renderer)},resetRoots:function(){for(var a,b=0;b<this.layers.length;++b)a=this.layers[b],this.renderer&&a.renderer.getRenderLayerId()==this.id&&this.renderer.moveRoot(a.renderer)},handleChangeLayer:function(a){var b=a.layer;"order"==a.property&&-1!=OpenLayers.Util.indexOf(this.layers,
b)&&(this.resetRoots(),this.collectRoots())},CLASS_NAME:"OpenLayers.Layer.Vector.RootContainer"});OpenLayers.Control.SelectFeature=OpenLayers.Class(OpenLayers.Control,{multipleKey:null,toggleKey:null,multiple:!1,clickout:!0,toggle:!1,hover:!1,highlightOnly:!1,box:!1,onBeforeSelect:function(){},onSelect:function(){},onUnselect:function(){},scope:null,geometryTypes:null,layer:null,layers:null,callbacks:null,selectStyle:null,renderIntent:"select",handlers:null,initialize:function(a,b){OpenLayers.Control.prototype.initialize.apply(this,[b]);null===this.scope&&(this.scope=this);this.initLayer(a);var c=
{click:this.clickFeature,clickout:this.clickoutFeature};this.hover&&(c.over=this.overFeature,c.out=this.outFeature);this.callbacks=OpenLayers.Util.extend(c,this.callbacks);this.handlers={feature:new OpenLayers.Handler.Feature(this,this.layer,this.callbacks,{geometryTypes:this.geometryTypes})};this.box&&(this.handlers.box=new OpenLayers.Handler.Box(this,{done:this.selectBox},{boxDivClassName:"olHandlerBoxSelectFeature"}))},initLayer:function(a){OpenLayers.Util.isArray(a)?(this.layers=a,this.layer=
new OpenLayers.Layer.Vector.RootContainer(this.id+"_container",{layers:a})):this.layer=a},destroy:function(){this.active&&this.layers&&this.map.removeLayer(this.layer);OpenLayers.Control.prototype.destroy.apply(this,arguments);this.layers&&this.layer.destroy()},activate:function(){this.active||(this.layers&&this.map.addLayer(this.layer),this.handlers.feature.activate(),this.box&&this.handlers.box&&this.handlers.box.activate());return OpenLayers.Control.prototype.activate.apply(this,arguments)},deactivate:function(){this.active&&
(this.handlers.feature.deactivate(),this.handlers.box&&this.handlers.box.deactivate(),this.layers&&this.map.removeLayer(this.layer));return OpenLayers.Control.prototype.deactivate.apply(this,arguments)},unselectAll:function(a){var b=this.layers||[this.layer],c,d,e,f;for(e=0;e<b.length;++e)if(c=b[e],f=0,null!=c.selectedFeatures)for(;c.selectedFeatures.length>f;)d=c.selectedFeatures[f],a&&a.except==d?++f:this.unselect(d)},clickFeature:function(a){this.hover||(-1<OpenLayers.Util.indexOf(a.layer.selectedFeatures,
a)?this.toggleSelect()?this.unselect(a):this.multipleSelect()||this.unselectAll({except:a}):(this.multipleSelect()||this.unselectAll({except:a}),this.select(a)))},multipleSelect:function(){return this.multiple||this.handlers.feature.evt&&this.handlers.feature.evt[this.multipleKey]},toggleSelect:function(){return this.toggle||this.handlers.feature.evt&&this.handlers.feature.evt[this.toggleKey]},clickoutFeature:function(a){!this.hover&&this.clickout&&this.unselectAll()},overFeature:function(a){var b=
a.layer;this.hover&&(this.highlightOnly?this.highlight(a):-1==OpenLayers.Util.indexOf(b.selectedFeatures,a)&&this.select(a))},outFeature:function(a){if(this.hover)if(this.highlightOnly){if(a._lastHighlighter==this.id)if(a._prevHighlighter&&a._prevHighlighter!=this.id){delete a._lastHighlighter;var b=this.map.getControl(a._prevHighlighter);b&&b.highlight(a)}else this.unhighlight(a)}else this.unselect(a)},highlight:function(a){var b=a.layer;!1!==this.events.triggerEvent("beforefeaturehighlighted",{feature:a})&&
(a._prevHighlighter=a._lastHighlighter,a._lastHighlighter=this.id,b.drawFeature(a,this.selectStyle||this.renderIntent),this.events.triggerEvent("featurehighlighted",{feature:a}))},unhighlight:function(a){var b=a.layer;void 0==a._prevHighlighter?delete a._lastHighlighter:(a._prevHighlighter!=this.id&&(a._lastHighlighter=a._prevHighlighter),delete a._prevHighlighter);b.drawFeature(a,a.style||a.layer.style||"default");this.events.triggerEvent("featureunhighlighted",{feature:a})},select:function(a){var b=
this.onBeforeSelect.call(this.scope,a),c=a.layer;!1!==b&&(b=c.events.triggerEvent("beforefeatureselected",{feature:a}),!1!==b&&(c.selectedFeatures.push(a),this.highlight(a),this.handlers.feature.lastFeature||(this.handlers.feature.lastFeature=c.selectedFeatures[0]),c.events.triggerEvent("featureselected",{feature:a}),this.onSelect.call(this.scope,a)))},unselect:function(a){var b=a.layer;this.unhighlight(a);OpenLayers.Util.removeItem(b.selectedFeatures,a);b.events.triggerEvent("featureunselected",
{feature:a});this.onUnselect.call(this.scope,a)},selectBox:function(a){if(a instanceof OpenLayers.Bounds){var b=this.map.getLonLatFromPixel({x:a.left,y:a.bottom});a=this.map.getLonLatFromPixel({x:a.right,y:a.top});b=new OpenLayers.Bounds(b.lon,b.lat,a.lon,a.lat);this.multipleSelect()||this.unselectAll();a=this.multiple;this.multiple=!0;var c=this.layers||[this.layer];this.events.triggerEvent("boxselectionstart",{layers:c});for(var d,e=0;e<c.length;++e){d=c[e];for(var f=0,g=d.features.length;f<g;++f){var h=
d.features[f];h.getVisibility()&&(null==this.geometryTypes||-1<OpenLayers.Util.indexOf(this.geometryTypes,h.geometry.CLASS_NAME))&&b.toGeometry().intersects(h.geometry)&&-1==OpenLayers.Util.indexOf(d.selectedFeatures,h)&&this.select(h)}}this.multiple=a;this.events.triggerEvent("boxselectionend",{layers:c})}},setMap:function(a){this.handlers.feature.setMap(a);this.box&&this.handlers.box.setMap(a);OpenLayers.Control.prototype.setMap.apply(this,arguments)},setLayer:function(a){var b=this.active;this.unselectAll();
this.deactivate();this.layers&&(this.layer.destroy(),this.layers=null);this.initLayer(a);this.handlers.feature.layer=this.layer;b&&this.activate()},addLayer:function(a){var b=this.active;this.deactivate();null==this.layers?null!=this.layer?(this.layers=[this.layer],this.layers.push(a)):this.layers=[a]:this.layers.push(a);this.initLayer(this.layers);this.handlers.feature.layer=this.layer;b&&this.activate()},CLASS_NAME:"OpenLayers.Control.SelectFeature"});OpenLayers.Handler.Drag=OpenLayers.Class(OpenLayers.Handler,{started:!1,stopDown:!0,dragging:!1,last:null,start:null,lastMoveEvt:null,oldOnselectstart:null,interval:0,timeoutId:null,documentDrag:!1,documentEvents:null,initialize:function(a,b,c){OpenLayers.Handler.prototype.initialize.apply(this,arguments);if(!0===this.documentDrag){var d=this;this._docMove=function(a){d.mousemove({xy:{x:a.clientX,y:a.clientY},element:document})};this._docUp=function(a){d.mouseup({xy:{x:a.clientX,y:a.clientY}})}}},
dragstart:function(a){var b=!0;this.dragging=!1;this.checkModifiers(a)&&this._pointerId==a.pointerId&&(OpenLayers.Event.isLeftClick(a)||OpenLayers.Event.isSingleTouch(a))?(this.started=!0,this.last=this.start=a.xy,OpenLayers.Element.addClass(this.map.viewPortDiv,"olDragDown"),this.down(a),this.callback("down",[a.xy]),OpenLayers.Event.preventDefault(a),this.oldOnselectstart||(this.oldOnselectstart=document.onselectstart?document.onselectstart:OpenLayers.Function.True),document.onselectstart=OpenLayers.Function.False,
b=!this.stopDown):(delete this._pointerId,this.started=!1,this.last=this.start=null);return b},dragmove:function(a){this.lastMoveEvt=a;!this.started||this._pointerId!=a.pointerId||this.timeoutId||a.xy.x==this.last.x&&a.xy.y==this.last.y||(!0===this.documentDrag&&this.documentEvents&&(a.element===document?(this.adjustXY(a),this.setEvent(a)):this.removeDocumentEvents()),0<this.interval&&(this.timeoutId=setTimeout(OpenLayers.Function.bind(this.removeTimeout,this),this.interval)),this.dragging=!0,this.move(a),
this.callback("move",[a.xy]),this.oldOnselectstart||(this.oldOnselectstart=document.onselectstart,document.onselectstart=OpenLayers.Function.False),this.last=a.xy);return!0},dragend:function(a){if(this.started&&this._pointerId==a.pointerId){!0===this.documentDrag&&this.documentEvents&&(this.adjustXY(a),this.removeDocumentEvents());var b=this.start!=this.last;this.dragging=this.started=!1;delete this._pointerId;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown");this.up(a);this.callback("up",
[a.xy]);b&&this.callback("done",[a.xy]);document.onselectstart=this.oldOnselectstart}return!0},down:function(a){},move:function(a){},up:function(a){},out:function(a){},mousedown:function(a){return this.dragstart(a)},touchstart:function(a){this.startTouch();"_pointerId"in this||(this._pointerId=a.pointerId);return this.dragstart(a)},mousemove:function(a){return this.dragmove(a)},touchmove:function(a){return this.dragmove(a)},removeTimeout:function(){this.timeoutId=null;this.dragging&&this.mousemove(this.lastMoveEvt)},
mouseup:function(a){return this.dragend(a)},touchend:function(a){a.xy=this.last;return this.dragend(a)},mouseout:function(a){if(this.started&&OpenLayers.Util.mouseLeft(a,this.map.viewPortDiv))if(!0===this.documentDrag)this.addDocumentEvents();else{var b=this.start!=this.last;this.dragging=this.started=!1;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown");this.out(a);this.callback("out",[]);b&&this.callback("done",[a.xy]);document.onselectstart&&(document.onselectstart=this.oldOnselectstart)}return!0},
click:function(a){return this.start==this.last},activate:function(){var a=!1;OpenLayers.Handler.prototype.activate.apply(this,arguments)&&(this.dragging=!1,a=!0);return a},deactivate:function(){var a=!1;OpenLayers.Handler.prototype.deactivate.apply(this,arguments)&&(this.dragging=this.started=!1,this.last=this.start=null,a=!0,OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDragDown"));return a},adjustXY:function(a){var b=OpenLayers.Util.pagePosition(this.map.viewPortDiv);a.xy.x-=b[0];a.xy.y-=
b[1]},addDocumentEvents:function(){OpenLayers.Element.addClass(document.body,"olDragDown");this.documentEvents=!0;OpenLayers.Event.observe(document,"mousemove",this._docMove);OpenLayers.Event.observe(document,"mouseup",this._docUp)},removeDocumentEvents:function(){OpenLayers.Element.removeClass(document.body,"olDragDown");this.documentEvents=!1;OpenLayers.Event.stopObserving(document,"mousemove",this._docMove);OpenLayers.Event.stopObserving(document,"mouseup",this._docUp)},CLASS_NAME:"OpenLayers.Handler.Drag"});OpenLayers.Handler.Box=OpenLayers.Class(OpenLayers.Handler,{dragHandler:null,boxDivClassName:"olHandlerBoxZoomBox",boxOffsets:null,initialize:function(a,b,c){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.dragHandler=new OpenLayers.Handler.Drag(this,{down:this.startBox,move:this.moveBox,out:this.removeBox,up:this.endBox},{keyMask:this.keyMask})},destroy:function(){OpenLayers.Handler.prototype.destroy.apply(this,arguments);this.dragHandler&&(this.dragHandler.destroy(),this.dragHandler=
null)},setMap:function(a){OpenLayers.Handler.prototype.setMap.apply(this,arguments);this.dragHandler&&this.dragHandler.setMap(a)},startBox:function(a){this.callback("start",[]);this.zoomBox=OpenLayers.Util.createDiv("zoomBox",{x:-9999,y:-9999});this.zoomBox.className=this.boxDivClassName;this.zoomBox.style.zIndex=this.map.Z_INDEX_BASE.Popup-1;this.map.viewPortDiv.appendChild(this.zoomBox);OpenLayers.Element.addClass(this.map.viewPortDiv,"olDrawBox")},moveBox:function(a){var b=this.dragHandler.start.x,
c=this.dragHandler.start.y,d=Math.abs(b-a.x),e=Math.abs(c-a.y),f=this.getBoxOffsets();this.zoomBox.style.width=d+f.width+1+"px";this.zoomBox.style.height=e+f.height+1+"px";this.zoomBox.style.left=(a.x<b?b-d-f.left:b-f.left)+"px";this.zoomBox.style.top=(a.y<c?c-e-f.top:c-f.top)+"px"},endBox:function(a){if(5<Math.abs(this.dragHandler.start.x-a.x)||5<Math.abs(this.dragHandler.start.y-a.y)){var b=this.dragHandler.start;a=new OpenLayers.Bounds(Math.min(b.x,a.x),Math.max(b.y,a.y),Math.max(b.x,a.x),Math.min(b.y,
a.y))}else a=this.dragHandler.start.clone();this.removeBox();this.callback("done",[a])},removeBox:function(){this.map.viewPortDiv.removeChild(this.zoomBox);this.boxOffsets=this.zoomBox=null;OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDrawBox")},activate:function(){return OpenLayers.Handler.prototype.activate.apply(this,arguments)?(this.dragHandler.activate(),!0):!1},deactivate:function(){return OpenLayers.Handler.prototype.deactivate.apply(this,arguments)?(this.dragHandler.deactivate()&&
this.zoomBox&&this.removeBox(),!0):!1},getBoxOffsets:function(){if(!this.boxOffsets){var a=document.createElement("div");a.style.position="absolute";a.style.border="1px solid black";a.style.width="3px";document.body.appendChild(a);var b=3==a.clientWidth;document.body.removeChild(a);var a=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-left-width")),c=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-right-width")),d=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-top-width")),
e=parseInt(OpenLayers.Element.getStyle(this.zoomBox,"border-bottom-width"));this.boxOffsets={left:a,right:c,top:d,bottom:e,width:!1===b?a+c:0,height:!1===b?d+e:0}}return this.boxOffsets},CLASS_NAME:"OpenLayers.Handler.Box"});OpenLayers.Control.ZoomBox=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,out:!1,keyMask:null,alwaysZoom:!1,zoomOnClick:!0,draw:function(){this.handler=new OpenLayers.Handler.Box(this,{done:this.zoomBox},{keyMask:this.keyMask})},zoomBox:function(a){if(a instanceof OpenLayers.Bounds){var b,c=a.getCenterPixel();if(this.out){b=Math.min(this.map.size.h/(a.bottom-a.top),this.map.size.w/(a.right-a.left));var d=this.map.getExtent(),e=this.map.getLonLatFromPixel(c),f=e.lon-d.getWidth()/
2*b;a=e.lon+d.getWidth()/2*b;var g=e.lat-d.getHeight()/2*b;b=e.lat+d.getHeight()/2*b;b=new OpenLayers.Bounds(f,g,a,b)}else f=this.map.getLonLatFromPixel({x:a.left,y:a.bottom}),a=this.map.getLonLatFromPixel({x:a.right,y:a.top}),b=new OpenLayers.Bounds(f.lon,f.lat,a.lon,a.lat);f=this.map.getZoom();g=this.map.getSize();a=g.w/2;g=g.h/2;b=this.map.getZoomForExtent(b);d=this.map.getResolution();e=this.map.getResolutionForZoom(b);d==e?this.map.setCenter(this.map.getLonLatFromPixel(c)):this.map.zoomTo(b,
{x:(d*c.x-e*a)/(d-e),y:(d*c.y-e*g)/(d-e)});f==this.map.getZoom()&&1==this.alwaysZoom&&this.map.zoomTo(f+(this.out?-1:1))}else this.zoomOnClick&&(this.out?this.map.zoomTo(this.map.getZoom()-1,a):this.map.zoomTo(this.map.getZoom()+1,a))},CLASS_NAME:"OpenLayers.Control.ZoomBox"});OpenLayers.Control.DragPan=OpenLayers.Class(OpenLayers.Control,{type:OpenLayers.Control.TYPE_TOOL,panned:!1,interval:0,documentDrag:!1,kinetic:null,enableKinetic:!0,kineticInterval:10,draw:function(){if(this.enableKinetic&&OpenLayers.Kinetic){var a={interval:this.kineticInterval};"object"===typeof this.enableKinetic&&(a=OpenLayers.Util.extend(a,this.enableKinetic));this.kinetic=new OpenLayers.Kinetic(a)}this.handler=new OpenLayers.Handler.Drag(this,{move:this.panMap,done:this.panMapDone,down:this.panMapStart},
{interval:this.interval,documentDrag:this.documentDrag})},panMapStart:function(){this.kinetic&&this.kinetic.begin()},panMap:function(a){this.kinetic&&this.kinetic.update(a);this.panned=!0;this.map.pan(this.handler.last.x-a.x,this.handler.last.y-a.y,{dragging:!0,animate:!1})},panMapDone:function(a){if(this.panned){var b=null;this.kinetic&&(b=this.kinetic.end(a));this.map.pan(this.handler.last.x-a.x,this.handler.last.y-a.y,{dragging:!!b,animate:!1});if(b){var c=this;this.kinetic.move(b,function(a,b,
f){c.map.pan(a,b,{dragging:!f,animate:!1})})}this.panned=!1}},CLASS_NAME:"OpenLayers.Control.DragPan"});OpenLayers.Handler.MouseWheel=OpenLayers.Class(OpenLayers.Handler,{wheelListener:null,interval:0,maxDelta:Number.POSITIVE_INFINITY,delta:0,cumulative:!0,initialize:function(a,b,c){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.wheelListener=OpenLayers.Function.bindAsEventListener(this.onWheelEvent,this)},destroy:function(){OpenLayers.Handler.prototype.destroy.apply(this,arguments);this.wheelListener=null},onWheelEvent:function(a){if(this.map&&this.checkModifiers(a)){for(var b=
!1,c=!1,d=!1,e=OpenLayers.Event.element(a);null!=e&&!d&&!b;){if(!b)try{var f,b=(f=e.currentStyle?e.currentStyle.overflow:document.defaultView.getComputedStyle(e,null).getPropertyValue("overflow"))&&"auto"==f||"scroll"==f}catch(l){}if(!c&&(c=OpenLayers.Element.hasClass(e,"olScrollable"),!c))for(var d=0,g=this.map.layers.length;d<g;d++){var h=this.map.layers[d];if(e==h.div||e==h.pane){c=!0;break}}d=e==this.map.div;e=e.parentNode}if(!b&&d){if(c)if(b=0,a.wheelDelta?(b=a.wheelDelta,0===b%160&&(b*=.75),
b/=120):a.detail&&(b=-(a.detail/Math.abs(a.detail))),this.delta+=b,window.clearTimeout(this._timeoutId),this.interval&&Math.abs(this.delta)<this.maxDelta){var k=OpenLayers.Util.extend({},a);this._timeoutId=window.setTimeout(OpenLayers.Function.bind(function(){this.wheelZoom(k)},this),this.interval)}else this.wheelZoom(a);OpenLayers.Event.stop(a)}}},wheelZoom:function(a){var b=this.delta;this.delta=0;b&&(a.xy=this.map.events.getMousePosition(a),0>b?this.callback("down",[a,this.cumulative?Math.max(-this.maxDelta,
b):-1]):this.callback("up",[a,this.cumulative?Math.min(this.maxDelta,b):1]))},activate:function(a){if(OpenLayers.Handler.prototype.activate.apply(this,arguments)){var b=this.wheelListener;OpenLayers.Event.observe(window,"DOMMouseScroll",b);OpenLayers.Event.observe(window,"mousewheel",b);OpenLayers.Event.observe(document,"mousewheel",b);return!0}return!1},deactivate:function(a){if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){var b=this.wheelListener;OpenLayers.Event.stopObserving(window,
"DOMMouseScroll",b);OpenLayers.Event.stopObserving(window,"mousewheel",b);OpenLayers.Event.stopObserving(document,"mousewheel",b);return!0}return!1},CLASS_NAME:"OpenLayers.Handler.MouseWheel"});OpenLayers.Handler.Click=OpenLayers.Class(OpenLayers.Handler,{delay:300,single:!0,"double":!1,pixelTolerance:0,dblclickTolerance:13,stopSingle:!1,stopDouble:!1,timerId:null,down:null,last:null,first:null,rightclickTimerId:null,touchstart:function(a){this.startTouch();this.down=this.getEventInfo(a);this.last=this.getEventInfo(a);return!0},touchmove:function(a){this.last=this.getEventInfo(a);return!0},touchend:function(a){this.down&&(a.xy=this.last.xy,a.lastTouches=this.last.touches,this.handleSingle(a),
this.down=null);return!0},mousedown:function(a){this.down=this.getEventInfo(a);this.last=this.getEventInfo(a);return!0},mouseup:function(a){var b=!0;this.checkModifiers(a)&&this.control.handleRightClicks&&OpenLayers.Event.isRightClick(a)&&(b=this.rightclick(a));return b},rightclick:function(a){if(this.passesTolerance(a)){if(null!=this.rightclickTimerId)return this.clearTimer(),this.callback("dblrightclick",[a]),!this.stopDouble;a=this["double"]?OpenLayers.Util.extend({},a):this.callback("rightclick",
[a]);a=OpenLayers.Function.bind(this.delayedRightCall,this,a);this.rightclickTimerId=window.setTimeout(a,this.delay)}return!this.stopSingle},delayedRightCall:function(a){this.rightclickTimerId=null;a&&this.callback("rightclick",[a])},click:function(a){this.last||(this.last=this.getEventInfo(a));this.handleSingle(a);return!this.stopSingle},dblclick:function(a){this.handleDouble(a);return!this.stopDouble},handleDouble:function(a){this.passesDblclickTolerance(a)&&(this["double"]&&this.callback("dblclick",
[a]),this.clearTimer())},handleSingle:function(a){this.passesTolerance(a)&&(null!=this.timerId?(this.last.touches&&1===this.last.touches.length&&(this["double"]&&OpenLayers.Event.preventDefault(a),this.handleDouble(a)),this.last.touches&&2===this.last.touches.length||this.clearTimer()):(this.first=this.getEventInfo(a),a=this.single?OpenLayers.Util.extend({},a):null,this.queuePotentialClick(a)))},queuePotentialClick:function(a){this.timerId=window.setTimeout(OpenLayers.Function.bind(this.delayedCall,
this,a),this.delay)},passesTolerance:function(a){var b=!0;if(null!=this.pixelTolerance&&this.down&&this.down.xy&&(b=this.pixelTolerance>=this.down.xy.distanceTo(a.xy))&&this.touch&&this.down.touches.length===this.last.touches.length){a=0;for(var c=this.down.touches.length;a<c;++a)if(this.getTouchDistance(this.down.touches[a],this.last.touches[a])>this.pixelTolerance){b=!1;break}}return b},getTouchDistance:function(a,b){return Math.sqrt(Math.pow(a.clientX-b.clientX,2)+Math.pow(a.clientY-b.clientY,
2))},passesDblclickTolerance:function(a){a=!0;this.down&&this.first&&(a=this.down.xy.distanceTo(this.first.xy)<=this.dblclickTolerance);return a},clearTimer:function(){null!=this.timerId&&(window.clearTimeout(this.timerId),this.timerId=null);null!=this.rightclickTimerId&&(window.clearTimeout(this.rightclickTimerId),this.rightclickTimerId=null)},delayedCall:function(a){this.timerId=null;a&&this.callback("click",[a])},getEventInfo:function(a){var b;if(a.touches){var c=a.touches.length;b=Array(c);for(var d,
e=0;e<c;e++)d=a.touches[e],b[e]={clientX:d.olClientX,clientY:d.olClientY}}return{xy:a.xy,touches:b}},deactivate:function(){var a=!1;OpenLayers.Handler.prototype.deactivate.apply(this,arguments)&&(this.clearTimer(),this.last=this.first=this.down=null,a=!0);return a},CLASS_NAME:"OpenLayers.Handler.Click"});OpenLayers.Control.Navigation=OpenLayers.Class(OpenLayers.Control,{dragPan:null,dragPanOptions:null,pinchZoom:null,pinchZoomOptions:null,documentDrag:!1,zoomBox:null,zoomBoxEnabled:!0,zoomWheelEnabled:!0,mouseWheelOptions:null,handleRightClicks:!1,zoomBoxKeyMask:OpenLayers.Handler.MOD_SHIFT,autoActivate:!0,initialize:function(a){this.handlers={};OpenLayers.Control.prototype.initialize.apply(this,arguments)},destroy:function(){this.deactivate();this.dragPan&&this.dragPan.destroy();this.dragPan=null;
this.zoomBox&&this.zoomBox.destroy();this.zoomBox=null;this.pinchZoom&&this.pinchZoom.destroy();this.pinchZoom=null;OpenLayers.Control.prototype.destroy.apply(this,arguments)},activate:function(){this.dragPan.activate();this.zoomWheelEnabled&&this.handlers.wheel.activate();this.handlers.click.activate();this.zoomBoxEnabled&&this.zoomBox.activate();this.pinchZoom&&this.pinchZoom.activate();return OpenLayers.Control.prototype.activate.apply(this,arguments)},deactivate:function(){this.pinchZoom&&this.pinchZoom.deactivate();
this.zoomBox.deactivate();this.dragPan.deactivate();this.handlers.click.deactivate();this.handlers.wheel.deactivate();return OpenLayers.Control.prototype.deactivate.apply(this,arguments)},draw:function(){this.handleRightClicks&&(this.map.viewPortDiv.oncontextmenu=OpenLayers.Function.False);this.handlers.click=new OpenLayers.Handler.Click(this,{click:this.defaultClick,dblclick:this.defaultDblClick,dblrightclick:this.defaultDblRightClick},{"double":!0,stopDouble:!0});this.dragPan=new OpenLayers.Control.DragPan(OpenLayers.Util.extend({map:this.map,
documentDrag:this.documentDrag},this.dragPanOptions));this.zoomBox=new OpenLayers.Control.ZoomBox({map:this.map,keyMask:this.zoomBoxKeyMask});this.dragPan.draw();this.zoomBox.draw();this.handlers.wheel=new OpenLayers.Handler.MouseWheel(this,{up:this.wheelUp,down:this.wheelDown},OpenLayers.Util.extend(this.map.fractionalZoom?{}:{cumulative:!1,interval:50,maxDelta:6},this.mouseWheelOptions));OpenLayers.Control.PinchZoom&&(this.pinchZoom=new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({map:this.map},
this.pinchZoomOptions)))},defaultClick:function(a){a.lastTouches&&2==a.lastTouches.length&&this.map.zoomOut()},defaultDblClick:function(a){this.map.zoomTo(this.map.zoom+1,a.xy)},defaultDblRightClick:function(a){this.map.zoomTo(this.map.zoom-1,a.xy)},wheelChange:function(a,b){this.map.fractionalZoom||(b=Math.round(b));var c=this.map.getZoom(),d;d=Math.max(c+b,0);d=Math.min(d,this.map.getNumZoomLevels());d!==c&&this.map.zoomTo(d,a.xy)},wheelUp:function(a,b){this.wheelChange(a,b||1)},wheelDown:function(a,
b){this.wheelChange(a,b||-1)},disableZoomBox:function(){this.zoomBoxEnabled=!1;this.zoomBox.deactivate()},enableZoomBox:function(){this.zoomBoxEnabled=!0;this.active&&this.zoomBox.activate()},disableZoomWheel:function(){this.zoomWheelEnabled=!1;this.handlers.wheel.deactivate()},enableZoomWheel:function(){this.zoomWheelEnabled=!0;this.active&&this.handlers.wheel.activate()},CLASS_NAME:"OpenLayers.Control.Navigation"});OpenLayers.Handler.Keyboard=OpenLayers.Class(OpenLayers.Handler,{KEY_EVENTS:["keydown","keyup"],eventListener:null,observeElement:null,initialize:function(a,b,c){OpenLayers.Handler.prototype.initialize.apply(this,arguments);this.eventListener=OpenLayers.Function.bindAsEventListener(this.handleKeyEvent,this)},destroy:function(){this.deactivate();this.eventListener=null;OpenLayers.Handler.prototype.destroy.apply(this,arguments)},activate:function(){if(OpenLayers.Handler.prototype.activate.apply(this,
arguments)){this.observeElement=this.observeElement||document;for(var a=0,b=this.KEY_EVENTS.length;a<b;a++)OpenLayers.Event.observe(this.observeElement,this.KEY_EVENTS[a],this.eventListener);return!0}return!1},deactivate:function(){var a=!1;if(OpenLayers.Handler.prototype.deactivate.apply(this,arguments)){for(var a=0,b=this.KEY_EVENTS.length;a<b;a++)OpenLayers.Event.stopObserving(this.observeElement,this.KEY_EVENTS[a],this.eventListener);a=!0}return a},handleKeyEvent:function(a){this.checkModifiers(a)&&
this.callback(a.type,[a])},CLASS_NAME:"OpenLayers.Handler.Keyboard"});OpenLayers.Control.KeyboardDefaults=OpenLayers.Class(OpenLayers.Control,{autoActivate:!0,slideFactor:75,observeElement:null,draw:function(){this.handler=new OpenLayers.Handler.Keyboard(this,{keydown:this.defaultKeyPress},{observeElement:this.observeElement||document})},defaultKeyPress:function(a){var b,c=!0;b=OpenLayers.Event.element(a);if(!b||"INPUT"!=b.tagName&&"TEXTAREA"!=b.tagName&&"SELECT"!=b.tagName){switch(a.keyCode){case OpenLayers.Event.KEY_LEFT:this.map.pan(-this.slideFactor,0);break;case OpenLayers.Event.KEY_RIGHT:this.map.pan(this.slideFactor,
0);break;case OpenLayers.Event.KEY_UP:this.map.pan(0,-this.slideFactor);break;case OpenLayers.Event.KEY_DOWN:this.map.pan(0,this.slideFactor);break;case 33:b=this.map.getSize();this.map.pan(0,-.75*b.h);break;case 34:b=this.map.getSize();this.map.pan(0,.75*b.h);break;case 35:b=this.map.getSize();this.map.pan(.75*b.w,0);break;case 36:b=this.map.getSize();this.map.pan(-.75*b.w,0);break;case 43:case 61:case 187:case 107:this.map.zoomIn();break;case 45:case 109:case 189:case 95:this.map.zoomOut();break;
default:c=!1}c&&OpenLayers.Event.stop(a)}},CLASS_NAME:"OpenLayers.Control.KeyboardDefaults"});OpenLayers.Control.Measure=OpenLayers.Class(OpenLayers.Control,{callbacks:null,displaySystem:"metric",geodesic:!1,displaySystemUnits:{geographic:["dd"],english:["mi","ft","in"],metric:["km","m"]},partialDelay:300,delayedTrigger:null,persist:!1,immediate:!1,initialize:function(a,b){OpenLayers.Control.prototype.initialize.apply(this,[b]);var c={done:this.measureComplete,point:this.measurePartial};this.immediate&&(c.modify=this.measureImmediate);this.callbacks=OpenLayers.Util.extend(c,this.callbacks);
this.handlerOptions=OpenLayers.Util.extend({persist:this.persist},this.handlerOptions);this.handler=new a(this,this.callbacks,this.handlerOptions)},deactivate:function(){this.cancelDelay();return OpenLayers.Control.prototype.deactivate.apply(this,arguments)},cancel:function(){this.cancelDelay();this.handler.cancel()},setImmediate:function(a){(this.immediate=a)?this.callbacks.modify=this.measureImmediate:delete this.callbacks.modify},updateHandler:function(a,b){var c=this.active;c&&this.deactivate();
this.handler=new a(this,this.callbacks,b);c&&this.activate()},measureComplete:function(a){this.cancelDelay();this.measure(a,"measure")},measurePartial:function(a,b){this.cancelDelay();b=b.clone();this.handler.freehandMode(this.handler.evt)?this.measure(b,"measurepartial"):this.delayedTrigger=window.setTimeout(OpenLayers.Function.bind(function(){this.delayedTrigger=null;this.measure(b,"measurepartial")},this),this.partialDelay)},measureImmediate:function(a,b,c){c&&!this.handler.freehandMode(this.handler.evt)&&
(this.cancelDelay(),this.measure(b.geometry,"measurepartial"))},cancelDelay:function(){null!==this.delayedTrigger&&(window.clearTimeout(this.delayedTrigger),this.delayedTrigger=null)},measure:function(a,b){var c,d;-1<a.CLASS_NAME.indexOf("LineString")?(c=this.getBestLength(a),d=1):(c=this.getBestArea(a),d=2);this.events.triggerEvent(b,{measure:c[0],units:c[1],order:d,geometry:a})},getBestArea:function(a){for(var b=this.displaySystemUnits[this.displaySystem],c,d,e=0,f=b.length;e<f&&!(c=b[e],d=this.getArea(a,
c),1<d);++e);return[d,c]},getArea:function(a,b){var c,d;this.geodesic?(c=a.getGeodesicArea(this.map.getProjectionObject()),d="m"):(c=a.getArea(),d=this.map.getUnits());var e=OpenLayers.INCHES_PER_UNIT[b];e&&(c*=Math.pow(OpenLayers.INCHES_PER_UNIT[d]/e,2));return c},getBestLength:function(a){for(var b=this.displaySystemUnits[this.displaySystem],c,d,e=0,f=b.length;e<f&&!(c=b[e],d=this.getLength(a,c),1<d);++e);return[d,c]},getLength:function(a,b){var c,d;this.geodesic?(c=a.getGeodesicLength(this.map.getProjectionObject()),
d="m"):(c=a.getLength(),d=this.map.getUnits());var e=OpenLayers.INCHES_PER_UNIT[b];e&&(c*=OpenLayers.INCHES_PER_UNIT[d]/e);return c},CLASS_NAME:"OpenLayers.Control.Measure"});OpenLayers.Control.LayerSwitcher=OpenLayers.Class(OpenLayers.Control,{layerStates:null,layersDiv:null,baseLayersDiv:null,baseLayers:null,dataLbl:null,dataLayersDiv:null,dataLayers:null,structuresCollapsed:!1,visionCollapsed:!1,minimizeDiv:null,maximizeDiv:null,ascending:!0,initialize:function(a){OpenLayers.Control.prototype.initialize.apply(this,arguments);console.log("initialize",this.div);this.events.fallThrough=!1;this.layerStates=[]},destroy:function(){this.clearLayersArray("base");this.clearLayersArray("data");
this.map.events.un({buttonclick:this.onButtonClick,addlayer:this.redraw,changelayer:this.redraw,removelayer:this.redraw,changebaselayer:this.redraw,scope:this});this.events.unregister("buttonclick",this,this.onButtonClick);OpenLayers.Control.prototype.destroy.apply(this,arguments)},setMap:function(a){OpenLayers.Control.prototype.setMap.apply(this,arguments);this.map.events.on({addlayer:this.redraw,changelayer:this.redraw,removelayer:this.redraw,changebaselayer:this.redraw,scope:this});console.log("layerswitcher setMap",
this.outsideViewport,this.div);this.outsideViewport?(this.events.attachToElement(this.div),this.events.register("buttonclick",this,this.onButtonClick)):this.map.events.register("buttonclick",this,this.onButtonClick)},draw:function(){OpenLayers.Control.prototype.draw.apply(this);this.loadContents();this.outsideViewport||this.minimizeControl();this.redraw();return this.div},onClick:function(a){console.log("onClick",a)},onMaximizeClick:function(a){console.log("onMaximizeClick",a);this.maximizeControl();
if(this.isSmallScreen())this.onMaximizeWhenSmallScreen();document.querySelector(".controls-button.right.minimizeDiv").style.display="block"},onMinimizeClick:function(a){console.log("onMinimizeClick",a);this.minimizeControl();document.querySelector(".controls-button.right.maximizeDiv").style.display="block";console.log(document.querySelector("controls-button.right.maximizeDiv"))},onButtonClick:function(a){a.stopImmediatePropagation();var b=a.target;console.log("onButtonClick",this.lastButton==b,a,
b._layerSwitcher===this.id);this.lastButton=b;b._layerSwitcher!==this.id||b.disabled||("radio"==b.type?this.map.setBaseLayer(this.map.getLayer(b._layer)):(console.log("checked",b,b.checked),this.updateMap()))},clearLayersArray:function(a){this[a+"LayersDiv"].innerHTML="";this[a+"Layers"]=[];console.log("clearLayersArray")},checkRedraw:function(){if(!this.layerStates.length||this.map.layers.length!=this.layerStates.length)return!0;for(var a=0,b=this.layerStates.length;a<b;a++){var c=this.layerStates[a],
d=this.map.layers[a];if(c.name!=d.name||c.inRange!=d.inRange||c.id!=d.id||c.visibility!=d.visibility)return!0}return!1},toggleStructuresGroup:function(a){OpenLayers.Element.toggleClass(this.structuresElem,"collapsed");OpenLayers.Element.hasClass(this.structuresElem,"collapsed")?(this.structuresHeader.innerHTML="+ Structures",this.structuresCollapsed=!0):(this.structuresHeader.innerHTML="&ndash; Structures",this.structuresCollapsed=!1);OpenLayers.Event.stop(a)},toggleVisionGroup:function(a){OpenLayers.Element.toggleClass(this.visionElem,
"collapsed");OpenLayers.Element.hasClass(this.visionElem,"collapsed")?(this.visionHeader.innerHTML="+ Vision",this.visionCollapsed=!0):(this.visionHeader.innerHTML="&ndash; Vision",this.visionCollapsed=!1);OpenLayers.Event.stop(a)},redraw:function(){if(!this.checkRedraw())return this.div;this.clearLayersArray("base");this.clearLayersArray("data");var a=!1,b=!1,c=this.map.layers.length;this.layerStates=Array(c);for(var d=0;d<c;d++){var e=this.map.layers[d];this.layerStates[d]={name:e.name,visibility:e.visibility,
inRange:e.inRange,id:e.id}}var f=this.map.layers.slice();this.ascending||f.reverse();this.visionElem=document.createElement("li");this.visionElem.addEventListener("click",this.onClick.bind(this),!1);this.visionHeader=document.createElement("div");this.visionHeader.innerHTML="&ndash; Vision";OpenLayers.Element.addClass(this.visionHeader,"header");this.visionElem.appendChild(this.visionHeader);this.visionList=document.createElement("ul");this.visionElem.appendChild(this.visionList);this.dataLayersDiv.appendChild(this.visionElem);
this.visionCollapsed&&(OpenLayers.Element.addClass(this.visionElem,"collapsed"),this.visionHeader.innerHTML="+ Vision");this.visionHeader.addEventListener("click",this.toggleVisionGroup.bind(this),!1);this.structuresElem=document.createElement("li");this.structuresElem.addEventListener("click",this.onClick.bind(this),!1);this.structuresHeader=document.createElement("div");this.structuresHeader.innerHTML="&ndash; Structures";OpenLayers.Element.addClass(this.structuresHeader,"header");this.structuresElem.appendChild(this.structuresHeader);
this.structuresList=document.createElement("ul");this.structuresElem.appendChild(this.structuresList);this.dataLayersDiv.appendChild(this.structuresElem);this.structuresCollapsed&&(OpenLayers.Element.addClass(this.structuresElem,"collapsed"),this.structuresHeader.innerHTML="+ Structures");this.structuresHeader.addEventListener("click",this.toggleStructuresGroup.bind(this),!1);d=0;for(c=f.length;d<c;d++){var e=f[d],g=e.isBaseLayer;if(e.displayInLayerSwitcher){g?b=!0:a=!0;var h=g?e==this.map.baseLayer:
e.getVisibility(),k=document.createElement("input"),l=OpenLayers.Util.createUniqueID(this.id+"_input_");k.id=l;k.name=g?this.id+"_baseLayers":e.name;k.type=g?"radio":"checkbox";k.value=e.name;k.checked=h;k.defaultChecked=h;k.addEventListener("click",this.onButtonClick.bind(this),!1);k._layer=e.id;k._layerSwitcher=this.id;g||e.inRange||(k.disabled=!0);h=document.createElement("label");OpenLayers.Element.addClass(h,"labelSpan");h._layer=e.id;h._layerSwitcher=this.id;g||e.inRange||(h.style.color="gray");
h.innerHTML=e.name;h.insertBefore(k,h.firstChild);var m=document.createElement("ul"),l=g?this.baseLayers:this.dataLayers;l.push({layer:e,inputElem:k,labelSpan:h,subLayersElem:m,subLayers:[]});k=g?this.baseLayersDiv:this.dataLayersDiv;g=document.createElement("li");g.appendChild(h);if(this.overlayGrouping[e.name])if("Structures"==this.overlayGrouping[e.name])this.structuresList.appendChild(g);else if("Vision"==this.overlayGrouping[e.name])this.visionList.appendChild(g);else{var r=this.map.getLayersByName(this.overlayGrouping[e.name])[0];
r?(e=l.filter(function(a){return r.name===a.layer.name})[0],0===e.subLayers.length&&e.labelSpan.appendChild(e.subLayersElem),e.subLayersElem.appendChild(g)):k.insertBefore(g,k.firstChild)}else k.insertBefore(g,k.firstChild)}}this.dataLbl.style.display=a?"":"none";this.baseLbl.style.display=b?"":"none";return this.div},updateMap:function(){for(var a=0,b=this.baseLayers.length;a<b;a++){var c=this.baseLayers[a];c.inputElem.checked&&this.map.setBaseLayer(c.layer,!1)}a=0;for(b=this.dataLayers.length;a<
b;a++)c=this.dataLayers[a],c.layer.setVisibility(c.inputElem.checked)},maximizeControl:function(a){this.div.style.width="";this.div.style.height="";this.showControls(!1);null!=a&&OpenLayers.Event.stop(a)},isSmallScreen:function(){return 768>=(0<window.innerWidth?window.innerWidth:screen.width)},minimizeControl:function(a){this.div.style.width="0px";this.div.style.height="0px";this.showControls(!0);null!=a&&OpenLayers.Event.stop(a)},showControls:function(a){this.maximizeDiv.style.display=a?"":"none";
this.minimizeDiv.style.display=a?"none":"";this.layersDiv.style.display=a?"none":""},loadContents:function(){this.layersDiv=document.createElement("div");this.layersDiv.id=this.id+"_layersDiv";OpenLayers.Element.addClass(this.layersDiv,"controls right");this.baseLbl=document.createElement("div");this.baseLbl.innerHTML=OpenLayers.i18n("Base Layer");OpenLayers.Element.addClass(this.baseLbl,"controls-list-header");this.baseLayersDiv=document.createElement("ul");OpenLayers.Element.addClass(this.baseLayersDiv,
"controls-list baseLayersDiv right");this.dataLbl=document.createElement("div");this.dataLbl.innerHTML=OpenLayers.i18n("Overlays");OpenLayers.Element.addClass(this.dataLbl,"controls-list-header");this.dataLayersDiv=document.createElement("ul");OpenLayers.Element.addClass(this.dataLayersDiv,"controls-list right");this.ascending?(this.layersDiv.appendChild(this.baseLbl),this.layersDiv.appendChild(this.baseLayersDiv),this.layersDiv.appendChild(this.dataLbl),this.layersDiv.appendChild(this.dataLayersDiv)):
(this.layersDiv.appendChild(this.dataLbl),this.layersDiv.appendChild(this.dataLayersDiv),this.layersDiv.appendChild(this.baseLbl),this.layersDiv.appendChild(this.baseLayersDiv));this.div.appendChild(this.layersDiv);this.maximizeDiv=document.createElement("div");OpenLayers.Element.addClass(this.maximizeDiv,"controls-button right maximizeDiv");this.maximizeDiv.addEventListener("click",this.onMaximizeClick.bind(this),!1);this.maximizeDiv.style.display="none";this.div.appendChild(this.maximizeDiv);this.minimizeDiv=
document.createElement("div");OpenLayers.Element.addClass(this.minimizeDiv,"controls-button right minimizeDiv");this.minimizeDiv.addEventListener("click",this.onMinimizeClick.bind(this),!1);this.minimizeDiv.style.display="none";this.maximizeDiv.innerHTML="&equiv;";this.minimizeDiv.innerHTML="&times;";this.div.appendChild(this.minimizeDiv)},CLASS_NAME:"OpenLayers.Control.LayerSwitcher"});OpenLayers.Strategy=OpenLayers.Class({layer:null,options:null,active:null,autoActivate:!0,autoDestroy:!0,initialize:function(a){OpenLayers.Util.extend(this,a);this.options=a;this.active=!1},destroy:function(){this.deactivate();this.options=this.layer=null},setLayer:function(a){this.layer=a},activate:function(){return this.active?!1:this.active=!0},deactivate:function(){return this.active?(this.active=!1,!0):!1},CLASS_NAME:"OpenLayers.Strategy"});OpenLayers.Strategy.Fixed=OpenLayers.Class(OpenLayers.Strategy,{preload:!1,activate:function(){var a=OpenLayers.Strategy.prototype.activate.apply(this,arguments);if(a)if(this.layer.events.on({refresh:this.load,scope:this}),1==this.layer.visibility||this.preload)this.load();else this.layer.events.on({visibilitychanged:this.load,scope:this});return a},deactivate:function(){var a=OpenLayers.Strategy.prototype.deactivate.call(this);a&&this.layer.events.un({refresh:this.load,visibilitychanged:this.load,
scope:this});return a},load:function(a){var b=this.layer;b.events.triggerEvent("loadstart",{filter:b.filter});b.protocol.read(OpenLayers.Util.applyDefaults({callback:this.merge,filter:b.filter,scope:this},a));b.events.un({visibilitychanged:this.load,scope:this})},merge:function(a){var b=this.layer;b.destroyFeatures();var c=a.features;if(c&&0<c.length){var d=b.projection,e=b.map.getProjectionObject();if(!e.equals(d))for(var f,g=0,h=c.length;g<h;++g)(f=c[g].geometry)&&f.transform(d,e);b.addFeatures(c)}b.events.triggerEvent("loadend",
{response:a})},CLASS_NAME:"OpenLayers.Strategy.Fixed"});OpenLayers.Handler.Point=OpenLayers.Class(OpenLayers.Handler,{point:null,layer:null,multi:!1,citeCompliant:!1,mouseDown:!1,stoppedDown:null,lastDown:null,lastUp:null,persist:!1,stopDown:!1,stopUp:!1,layerOptions:null,pixelTolerance:5,lastTouchPx:null,initialize:function(a,b,c){c&&c.layerOptions&&c.layerOptions.styleMap||(this.style=OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"],{}));OpenLayers.Handler.prototype.initialize.apply(this,arguments)},activate:function(){if(!OpenLayers.Handler.prototype.activate.apply(this,
arguments))return!1;var a=OpenLayers.Util.extend({displayInLayerSwitcher:!1,calculateInRange:OpenLayers.Function.True,wrapDateLine:this.citeCompliant},this.layerOptions);this.layer=new OpenLayers.Layer.Vector(this.CLASS_NAME,a);this.map.addLayer(this.layer);return!0},createFeature:function(a){a=this.layer.getLonLatFromViewPortPx(a);a=new OpenLayers.Geometry.Point(a.lon,a.lat);this.point=new OpenLayers.Feature.Vector(a);this.callback("create",[this.point.geometry,this.point]);this.point.geometry.clearBounds();
this.layer.addFeatures([this.point],{silent:!0})},deactivate:function(){if(!OpenLayers.Handler.prototype.deactivate.apply(this,arguments))return!1;this.cancel();null!=this.layer.map&&(this.destroyFeature(!0),this.layer.destroy(!1));this.layer=null;return!0},destroyFeature:function(a){!this.layer||!a&&this.persist||this.layer.destroyFeatures();this.point=null},destroyPersistedFeature:function(){var a=this.layer;a&&1<a.features.length&&this.layer.features[0].destroy()},finalize:function(a){this.mouseDown=
!1;this.lastTouchPx=this.lastUp=this.lastDown=null;this.callback(a?"cancel":"done",[this.geometryClone()]);this.destroyFeature(a)},cancel:function(){this.finalize(!0)},click:function(a){OpenLayers.Event.stop(a);return!1},dblclick:function(a){OpenLayers.Event.stop(a);return!1},modifyFeature:function(a){this.point||this.createFeature(a);a=this.layer.getLonLatFromViewPortPx(a);this.point.geometry.x=a.lon;this.point.geometry.y=a.lat;this.callback("modify",[this.point.geometry,this.point,!1]);this.point.geometry.clearBounds();
this.drawFeature()},drawFeature:function(){this.layer.drawFeature(this.point,this.style)},getGeometry:function(){var a=this.point&&this.point.geometry;a&&this.multi&&(a=new OpenLayers.Geometry.MultiPoint([a]));return a},geometryClone:function(){var a=this.getGeometry();return a&&a.clone()},mousedown:function(a){return this.down(a)},touchstart:function(a){this.startTouch();this.lastTouchPx=a.xy;return this.down(a)},mousemove:function(a){return this.move(a)},touchmove:function(a){this.lastTouchPx=a.xy;
return this.move(a)},mouseup:function(a){return this.up(a)},touchend:function(a){a.xy=this.lastTouchPx;return this.up(a)},down:function(a){this.mouseDown=!0;this.lastDown=a.xy;this.touch||this.modifyFeature(a.xy);this.stoppedDown=this.stopDown;return!this.stopDown},move:function(a){this.touch||this.mouseDown&&!this.stoppedDown||this.modifyFeature(a.xy);return!0},up:function(a){this.mouseDown=!1;this.stoppedDown=this.stopDown;return!this.checkModifiers(a)||this.lastUp&&this.lastUp.equals(a.xy)||!this.lastDown||
!this.passesTolerance(this.lastDown,a.xy,this.pixelTolerance)?!0:(this.touch&&this.modifyFeature(a.xy),this.persist&&this.destroyPersistedFeature(),this.lastUp=a.xy,this.finalize(),!this.stopUp)},mouseout:function(a){OpenLayers.Util.mouseLeft(a,this.map.viewPortDiv)&&(this.stoppedDown=this.stopDown,this.mouseDown=!1)},passesTolerance:function(a,b,c){var d=!0;null!=c&&a&&b&&a.distanceTo(b)>c&&(d=!1);return d},CLASS_NAME:"OpenLayers.Handler.Point"});OpenLayers.Handler.Path=OpenLayers.Class(OpenLayers.Handler.Point,{line:null,maxVertices:null,doubleTouchTolerance:20,freehand:!1,freehandToggle:"shiftKey",timerId:null,redoStack:null,createFeature:function(a){a=this.layer.getLonLatFromViewPortPx(a);a=new OpenLayers.Geometry.Point(a.lon,a.lat);this.point=new OpenLayers.Feature.Vector(a);this.line=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([this.point.geometry]));this.callback("create",[this.point.geometry,this.getSketch()]);
this.point.geometry.clearBounds();this.layer.addFeatures([this.line,this.point],{silent:!0})},destroyFeature:function(a){OpenLayers.Handler.Point.prototype.destroyFeature.call(this,a);this.line=null},destroyPersistedFeature:function(){var a=this.layer;a&&2<a.features.length&&this.layer.features[0].destroy()},removePoint:function(){this.point&&this.layer.removeFeatures([this.point])},addPoint:function(a){this.layer.removeFeatures([this.point]);a=this.layer.getLonLatFromViewPortPx(a);this.point=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(a.lon,
a.lat));this.line.geometry.addComponent(this.point.geometry,this.line.geometry.components.length);this.layer.addFeatures([this.point]);this.callback("point",[this.point.geometry,this.getGeometry()]);this.callback("modify",[this.point.geometry,this.getSketch()]);this.drawFeature();delete this.redoStack},insertXY:function(a,b){this.line.geometry.addComponent(new OpenLayers.Geometry.Point(a,b),this.getCurrentPointIndex());this.drawFeature();delete this.redoStack},insertDeltaXY:function(a,b){var c=this.getCurrentPointIndex()-
1,c=this.line.geometry.components[c];!c||isNaN(c.x)||isNaN(c.y)||this.insertXY(c.x+a,c.y+b)},insertDirectionLength:function(a,b){a*=Math.PI/180;this.insertDeltaXY(b*Math.cos(a),b*Math.sin(a))},insertDeflectionLength:function(a,b){var c=this.getCurrentPointIndex()-1;if(0<c){var d=this.line.geometry.components[c],c=this.line.geometry.components[c-1];this.insertDirectionLength(180*Math.atan2(d.y-c.y,d.x-c.x)/Math.PI+a,b)}},getCurrentPointIndex:function(){return this.line.geometry.components.length-1},
undo:function(){var a=this.line.geometry,b=a.components,c=this.getCurrentPointIndex()-1,d=b[c],e=a.removeComponent(d);e&&(this.touch&&0<c&&(b=a.components,a=b[c-1],c=this.getCurrentPointIndex(),b=b[c],b.x=a.x,b.y=a.y),this.redoStack||(this.redoStack=[]),this.redoStack.push(d),this.drawFeature());return e},redo:function(){var a=this.redoStack&&this.redoStack.pop();a&&(this.line.geometry.addComponent(a,this.getCurrentPointIndex()),this.drawFeature());return!!a},freehandMode:function(a){return this.freehandToggle&&
a[this.freehandToggle]?!this.freehand:this.freehand},modifyFeature:function(a,b){this.line||this.createFeature(a);var c=this.layer.getLonLatFromViewPortPx(a);this.point.geometry.x=c.lon;this.point.geometry.y=c.lat;this.callback("modify",[this.point.geometry,this.getSketch(),b]);this.point.geometry.clearBounds();this.drawFeature()},drawFeature:function(){this.layer.drawFeature(this.line,this.style);this.layer.drawFeature(this.point,this.style)},getSketch:function(){return this.line},getGeometry:function(){var a=
this.line&&this.line.geometry;a&&this.multi&&(a=new OpenLayers.Geometry.MultiLineString([a]));return a},touchstart:function(a){if(this.timerId&&this.passesTolerance(this.lastTouchPx,a.xy,this.doubleTouchTolerance))return this.finishGeometry(),window.clearTimeout(this.timerId),this.timerId=null,!1;this.timerId&&(window.clearTimeout(this.timerId),this.timerId=null);this.timerId=window.setTimeout(OpenLayers.Function.bind(function(){this.timerId=null},this),300);return OpenLayers.Handler.Point.prototype.touchstart.call(this,
a)},down:function(a){var b=this.stopDown;this.freehandMode(a)&&(b=!0,this.touch&&(this.modifyFeature(a.xy,!!this.lastUp),OpenLayers.Event.stop(a)));this.touch||this.lastDown&&this.passesTolerance(this.lastDown,a.xy,this.pixelTolerance)||this.modifyFeature(a.xy,!!this.lastUp);this.mouseDown=!0;this.lastDown=a.xy;this.stoppedDown=b;return!b},move:function(a){if(this.stoppedDown&&this.freehandMode(a))return this.persist&&this.destroyPersistedFeature(),this.maxVertices&&this.line&&this.line.geometry.components.length===
this.maxVertices?(this.removePoint(),this.finalize()):this.addPoint(a.xy),!1;this.touch||this.mouseDown&&!this.stoppedDown||this.modifyFeature(a.xy,!!this.lastUp);return!0},up:function(a){!this.mouseDown||this.lastUp&&this.lastUp.equals(a.xy)||(this.stoppedDown&&this.freehandMode(a)?(this.persist&&this.destroyPersistedFeature(),this.removePoint(),this.finalize()):this.passesTolerance(this.lastDown,a.xy,this.pixelTolerance)&&(this.touch&&this.modifyFeature(a.xy),null==this.lastUp&&this.persist&&this.destroyPersistedFeature(),
this.addPoint(a.xy),this.lastUp=a.xy,this.line.geometry.components.length===this.maxVertices+1&&this.finishGeometry()));this.stoppedDown=this.stopDown;this.mouseDown=!1;return!this.stopUp},finishGeometry:function(){this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length-1]);this.removePoint();this.finalize()},dblclick:function(a){this.freehandMode(a)||this.finishGeometry();return!1},CLASS_NAME:"OpenLayers.Handler.Path"});OpenLayers.Handler.Polygon=OpenLayers.Class(OpenLayers.Handler.Path,{holeModifier:null,drawingHole:!1,polygon:null,createFeature:function(a){a=this.layer.getLonLatFromViewPortPx(a);a=new OpenLayers.Geometry.Point(a.lon,a.lat);this.point=new OpenLayers.Feature.Vector(a);this.line=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LinearRing([this.point.geometry]));this.polygon=new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([this.line.geometry]));this.callback("create",[this.point.geometry,
this.getSketch()]);this.point.geometry.clearBounds();this.layer.addFeatures([this.polygon,this.point],{silent:!0})},addPoint:function(a){if(!this.drawingHole&&this.holeModifier&&this.evt&&this.evt[this.holeModifier])for(var b=this.point.geometry,c=this.control.layer.features,d,e=c.length-1;0<=e;--e)if(d=c[e].geometry,(d instanceof OpenLayers.Geometry.Polygon||d instanceof OpenLayers.Geometry.MultiPolygon)&&d.intersects(b)){b=c[e];this.control.layer.removeFeatures([b],{silent:!0});this.control.layer.events.registerPriority("sketchcomplete",
this,this.finalizeInteriorRing);this.control.layer.events.registerPriority("sketchmodified",this,this.enforceTopology);b.geometry.addComponent(this.line.geometry);this.polygon=b;this.drawingHole=!0;break}OpenLayers.Handler.Path.prototype.addPoint.apply(this,arguments)},getCurrentPointIndex:function(){return this.line.geometry.components.length-2},enforceTopology:function(a){a=a.vertex;var b=this.line.geometry.components;this.polygon.geometry.intersects(a)||(b=b[b.length-3],a.x=b.x,a.y=b.y)},finishGeometry:function(){this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length-
2]);this.removePoint();this.finalize()},finalizeInteriorRing:function(){var a=this.line.geometry,b=0!==a.getArea();if(b){for(var c=this.polygon.geometry.components,d=c.length-2;0<=d;--d)if(a.intersects(c[d])){b=!1;break}if(b)a:for(d=c.length-2;0<d;--d)for(var e=c[d].components,f=0,g=e.length;f<g;++f)if(a.containsPoint(e[f])){b=!1;break a}}b?this.polygon.state!==OpenLayers.State.INSERT&&(this.polygon.state=OpenLayers.State.UPDATE):this.polygon.geometry.removeComponent(a);this.restoreFeature();return!1},
cancel:function(){this.drawingHole&&(this.polygon.geometry.removeComponent(this.line.geometry),this.restoreFeature(!0));return OpenLayers.Handler.Path.prototype.cancel.apply(this,arguments)},restoreFeature:function(a){this.control.layer.events.unregister("sketchcomplete",this,this.finalizeInteriorRing);this.control.layer.events.unregister("sketchmodified",this,this.enforceTopology);this.layer.removeFeatures([this.polygon],{silent:!0});this.control.layer.addFeatures([this.polygon],{silent:!0});this.drawingHole=
!1;a||this.control.layer.events.triggerEvent("sketchcomplete",{feature:this.polygon})},destroyFeature:function(a){OpenLayers.Handler.Path.prototype.destroyFeature.call(this,a);this.polygon=null},drawFeature:function(){this.layer.drawFeature(this.polygon,this.style);this.layer.drawFeature(this.point,this.style)},getSketch:function(){return this.polygon},getGeometry:function(){var a=this.polygon&&this.polygon.geometry;a&&this.multi&&(a=new OpenLayers.Geometry.MultiPolygon([a]));return a},CLASS_NAME:"OpenLayers.Handler.Polygon"});OpenLayers.Handler.RegularPolygon=OpenLayers.Class(OpenLayers.Handler.Drag,{sides:4,radius:null,snapAngle:null,snapToggle:"shiftKey",layerOptions:null,persist:!1,irregular:!1,citeCompliant:!1,angle:null,fixedRadius:!1,feature:null,layer:null,origin:null,initialize:function(a,b,c){c&&c.layerOptions&&c.layerOptions.styleMap||(this.style=OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"],{}));OpenLayers.Handler.Drag.prototype.initialize.apply(this,[a,b,c]);this.options=c?c:{}},setOptions:function(a){OpenLayers.Util.extend(this.options,
a);OpenLayers.Util.extend(this,a)},activate:function(){var a=!1;OpenLayers.Handler.Drag.prototype.activate.apply(this,arguments)&&(a=OpenLayers.Util.extend({displayInLayerSwitcher:!1,calculateInRange:OpenLayers.Function.True,wrapDateLine:this.citeCompliant},this.layerOptions),this.layer=new OpenLayers.Layer.Vector(this.CLASS_NAME,a),this.map.addLayer(this.layer),a=!0);return a},deactivate:function(){var a=!1;OpenLayers.Handler.Drag.prototype.deactivate.apply(this,arguments)&&(this.dragging&&this.cancel(),
null!=this.layer.map&&(this.layer.destroy(!1),this.feature&&this.feature.destroy()),this.feature=this.layer=null,a=!0);return a},down:function(a){this.fixedRadius=!!this.radius;a=this.layer.getLonLatFromViewPortPx(a.xy);this.origin=new OpenLayers.Geometry.Point(a.lon,a.lat);if(!this.fixedRadius||this.irregular)this.radius=this.map.getResolution();this.persist&&this.clear();this.feature=new OpenLayers.Feature.Vector;this.createGeometry();this.callback("create",[this.origin,this.feature]);this.layer.addFeatures([this.feature],
{silent:!0});this.layer.drawFeature(this.feature,this.style)},move:function(a){var b=this.layer.getLonLatFromViewPortPx(a.xy),b=new OpenLayers.Geometry.Point(b.lon,b.lat);this.irregular?(a=Math.sqrt(2)*Math.abs(b.y-this.origin.y)/2,this.radius=Math.max(this.map.getResolution()/2,a)):this.fixedRadius?this.origin=b:(this.calculateAngle(b,a),this.radius=Math.max(this.map.getResolution()/2,b.distanceTo(this.origin)));this.modifyGeometry();this.irregular&&(a=b.x-this.origin.x,b=b.y-this.origin.y,this.feature.geometry.resize(1,
this.origin,0==b?a/(this.radius*Math.sqrt(2)):a/b),this.feature.geometry.move(a/2,b/2));this.layer.drawFeature(this.feature,this.style)},up:function(a){this.finalize();this.start==this.last&&this.callback("done",[a.xy])},out:function(a){this.finalize()},createGeometry:function(){this.angle=Math.PI*(1/this.sides-.5);this.snapAngle&&(this.angle+=Math.PI/180*this.snapAngle);this.feature.geometry=OpenLayers.Geometry.Polygon.createRegularPolygon(this.origin,this.radius,this.sides,this.snapAngle)},modifyGeometry:function(){var a,
b,c=this.feature.geometry.components[0];c.components.length!=this.sides+1&&(this.createGeometry(),c=this.feature.geometry.components[0]);for(var d=0;d<this.sides;++d)b=c.components[d],a=this.angle+2*d*Math.PI/this.sides,b.x=this.origin.x+this.radius*Math.cos(a),b.y=this.origin.y+this.radius*Math.sin(a),b.clearBounds()},calculateAngle:function(a,b){var c=Math.atan2(a.y-this.origin.y,a.x-this.origin.x);if(this.snapAngle&&this.snapToggle&&!b[this.snapToggle]){var d=Math.PI/180*this.snapAngle;this.angle=
Math.round(c/d)*d}else this.angle=c},cancel:function(){this.callback("cancel",null);this.finalize()},finalize:function(){this.origin=null;this.radius=this.options.radius},clear:function(){this.layer&&(this.layer.renderer.clear(),this.layer.destroyFeatures())},callback:function(a,b){this.callbacks[a]&&this.callbacks[a].apply(this.control,[this.feature.geometry.clone()]);this.persist||"done"!=a&&"cancel"!=a||this.clear()},CLASS_NAME:"OpenLayers.Handler.RegularPolygon"});
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InteractiveMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";function n(){var e="undefined"==typeof JSON?{}:JSON;o.setupJSON(e)}var o=t(2),i=t(3);n();var a=window._rollbarConfig,s=a&&a.globalAlias||"Rollbar",u=window[s]&&"undefined"!=typeof window[s].shimId;!u&&a?o.wrapper.init(a):(window.Rollbar=o.wrapper,window.RollbarNotifier=i.Notifier),e.exports=o.wrapper},function(e,r,t){"use strict";function n(e,r,t){!t[4]&&window._rollbarWrappedError&&(t[4]=window._rollbarWrappedError,window._rollbarWrappedError=null),e.uncaughtError.apply(e,t),r&&r.apply(window,t)}function o(e,r){if(r.hasOwnProperty&&r.hasOwnProperty("addEventListener")){var t=r.addEventListener;r.addEventListener=function(r,n,o){t.call(this,r,e.wrap(n),o)};var n=r.removeEventListener;r.removeEventListener=function(e,r,t){n.call(this,e,r&&r._wrapped||r,t)}}}var i=t(3),a=t(8),s=i.Notifier;window._rollbarWrappedError=null;var u={};u.init=function(e,r){var t=new s(r);if(t.configure(e),e.captureUncaught){var i;r&&a.isType(r._rollbarOldOnError,"function")?i=r._rollbarOldOnError:window.onerror&&!window.onerror.belongsToShim&&(i=window.onerror),window.onerror=function(){var e=Array.prototype.slice.call(arguments,0);n(t,i,e)};var u,c,l=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];for(u=0;u<l.length;++u)c=l[u],window[c]&&window[c].prototype&&o(t,window[c].prototype)}return e.captureUnhandledRejections&&(r&&a.isType(r._unhandledRejectionHandler,"function")&&window.removeEventListener("unhandledrejection",r._unhandledRejectionHandler),t._unhandledRejectionHandler=function(e){var r=e.reason,n=e.promise,o=e.detail;!r&&o&&(r=o.reason,n=o.promise),t.unhandledRejection(r,n)},window.addEventListener("unhandledrejection",t._unhandledRejectionHandler)),window.Rollbar=t,s.processPayloads(),t},e.exports={wrapper:u,setupJSON:i.setupJSON}},function(e,r,t){"use strict";function n(e){E=e,w.setupJSON(e)}function o(e,r){return function(){var t=r||this;try{return e.apply(t,arguments)}catch(n){console.error("[Rollbar]:",n)}}}function i(){h||(h=setTimeout(f,1e3))}function a(){return _}function s(e){_=_||this;var r="https://"+s.DEFAULT_ENDPOINT;this.options={enabled:!0,endpoint:r,environment:"production",scrubFields:g([],s.DEFAULT_SCRUB_FIELDS),checkIgnore:null,logLevel:s.DEFAULT_LOG_LEVEL,reportLevel:s.DEFAULT_REPORT_LEVEL,uncaughtErrorLevel:s.DEFAULT_UNCAUGHT_ERROR_LEVEL,payload:{}},this.lastError=null,this.plugins={},this.parentNotifier=e,e&&(e.hasOwnProperty("shimId")?e.notifier=this:this.configure(e.options))}function u(e){window._rollbarPayloadQueue.push(e),i()}function c(e){return o(function(){var r=this._getLogArgs(arguments);return this._log(e||r.level||this.options.logLevel||s.DEFAULT_LOG_LEVEL,r.message,r.err,r.custom,r.callback)})}function l(e,r){e||(e=r?E.stringify(r):"");var t={body:e};return r&&(t.extra=g(!0,{},r)),{message:t}}function p(e,r,t){var n=m.guessErrorClass(r.message),o=r.name||n[0],i=n[1],a={exception:{"class":o,message:i}};if(e&&(a.exception.description=e||"uncaught exception"),r.stack){var s,u,c,p,f,d,h,w;for(a.frames=[],h=0;h<r.stack.length;++h)s=r.stack[h],u={filename:s.url?v.sanitizeUrl(s.url):"(unknown)",lineno:s.line||null,method:s.func&&"?"!==s.func?s.func:"[anonymous]",colno:s.column},c=p=f=null,d=s.context?s.context.length:0,d&&(w=Math.floor(d/2),p=s.context.slice(0,w),c=s.context[w],f=s.context.slice(w)),c&&(u.code=c),(p||f)&&(u.context={},p&&p.length&&(u.context.pre=p),f&&f.length&&(u.context.post=f)),s.args&&(u.args=s.args),a.frames.push(u);return a.frames.reverse(),t&&(a.extra=g(!0,{},t)),{trace:a}}return l(o+": "+i,t)}function f(){var e;try{for(;e=window._rollbarPayloadQueue.shift();)d(e)}finally{h=void 0}}function d(e){var r=e.endpointUrl,t=e.accessToken,n=e.payload,o=e.callback||function(){},i=(new Date).getTime();i-L>=6e4&&(L=i,R=0);var a=window._globalRollbarOptions.maxItems,c=window._globalRollbarOptions.itemsPerMinute,l=function(){return!n.ignoreRateLimit&&a>=1&&T>=a},p=function(){return!n.ignoreRateLimit&&c>=1&&R>=c};return l()?void o(new Error(a+" max items reached")):p()?void o(new Error(c+" items per minute reached")):(T++,R++,l()&&_._log(_.options.uncaughtErrorLevel,"maxItems has been hit. Ignoring errors for the remainder of the current page load.",null,{maxItems:a},null,!1,!0),n.ignoreRateLimit&&delete n.ignoreRateLimit,void y.post(r,t,n,function(r,t){return r?(r instanceof b&&(e.callback=function(){},setTimeout(function(){u(e)},s.RETRY_DELAY)),o(r)):o(null,t)}))}var h,g=t(4),m=t(5),v=t(8),w=t(10),y=w.XHR,b=w.ConnectionError,E=null;s.NOTIFIER_VERSION="1.9.2",s.DEFAULT_ENDPOINT="api.rollbar.com/api/1/",s.DEFAULT_SCRUB_FIELDS=["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"],s.DEFAULT_LOG_LEVEL="debug",s.DEFAULT_REPORT_LEVEL="debug",s.DEFAULT_UNCAUGHT_ERROR_LEVEL="error",s.DEFAULT_ITEMS_PER_MIN=60,s.DEFAULT_MAX_ITEMS=0,s.LEVELS={debug:0,info:1,warning:2,error:3,critical:4},s.RETRY_DELAY=1e4,window._rollbarPayloadQueue=window._rollbarPayloadQueue||[],window._globalRollbarOptions={startTime:(new Date).getTime(),maxItems:s.DEFAULT_MAX_ITEMS,itemsPerMinute:s.DEFAULT_ITEMS_PER_MIN};var _,x=s.prototype;x._getLogArgs=function(e){for(var r,t,n,i,a,u,c=this.options.logLevel||s.DEFAULT_LOG_LEVEL,l=[],p=0;p<e.length;++p)u=e[p],a=v.typeName(u),"string"===a?r?l.push(u):r=u:"function"===a?i=o(u,this):"date"===a?l.push(u):"error"===a||u instanceof Error||"undefined"!=typeof DOMException&&u instanceof DOMException?t?l.push(u):t=u:"object"!==a&&"array"!==a||(n?l.push(u):n=u);return l.length&&(n=n||{},n.extraArgs=l),{level:c,message:r,err:t,custom:n,callback:i}},x._route=function(e){var r=this.options.endpoint,t=/\/$/.test(r),n=/^\//.test(e);return t&&n?e=e.substring(1):t||n||(e="/"+e),r+e},x._processShimQueue=function(e){for(var r,t,n,o,i,a,u,c={};t=e.shift();)r=t.shim,n=t.method,o=t.args,i=r.parentShim,u=c[r.shimId],u||(i?(a=c[i.shimId],u=new s(a)):u=this,c[r.shimId]=u),u[n]&&v.isType(u[n],"function")&&u[n].apply(u,o)},x._buildPayload=function(e,r,t,n,o){var i=this.options.accessToken,a=this.options.environment,u=g(!0,{},this.options.payload),c=v.uuid4();if(void 0===s.LEVELS[r])throw new Error("Invalid level");if(!t&&!n&&!o)throw new Error("No message, stack info or custom data");var l={environment:a,endpoint:this.options.endpoint,uuid:c,level:r,platform:"browser",framework:"browser-js",language:"javascript",body:this._buildBody(t,n,o),request:{url:window.location.href,query_string:window.location.search,user_ip:"$remote_ip"},client:{runtime_ms:e.getTime()-window._globalRollbarOptions.startTime,timestamp:Math.round(e.getTime()/1e3),javascript:{browser:window.navigator.userAgent,language:window.navigator.language,cookie_enabled:window.navigator.cookieEnabled,screen:{width:window.screen.width,height:window.screen.height},plugins:this._getBrowserPlugins()}},server:{},notifier:{name:"rollbar-browser-js",version:s.NOTIFIER_VERSION}};u.body&&delete u.body;var p={access_token:i,data:g(!0,l,u)};return this._scrub(p.data),p},x._buildBody=function(e,r,t){var n;return n=r?p(e,r,t):l(e,t)},x._getBrowserPlugins=function(){if(!this._browserPlugins){var e,r,t=window.navigator.plugins||[],n=t.length,o=[];for(r=0;r<n;++r)e=t[r],o.push({name:e.name,description:e.description});this._browserPlugins=o}return this._browserPlugins},x._scrub=function(e){function r(e,r,t,n,o,i){return r+v.redact(i)}function t(e){var t;if(v.isType(e,"string"))for(t=0;t<s.length;++t)e=e.replace(s[t],r);return e}function n(e,r){var t;for(t=0;t<a.length;++t)if(a[t].test(e)){r=v.redact(r);break}return r}function o(e,r){var o=n(e,r);return o===r?t(o):o}var i=this.options.scrubFields,a=this._getScrubFieldRegexs(i),s=this._getScrubQueryParamRegexs(i);return v.traverse(e,o),e},x._getScrubFieldRegexs=function(e){for(var r,t=[],n=0;n<e.length;++n)r="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",t.push(new RegExp(r,"i"));return t},x._getScrubQueryParamRegexs=function(e){for(var r,t=[],n=0;n<e.length;++n)r="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",t.push(new RegExp("("+r+"=)([^&\\n]+)","igm"));return t},x._urlIsWhitelisted=function(e){var r,t,n,o,i,a,s,u,c,l;try{if(r=this.options.hostWhiteList,t=e&&e.data&&e.data.body&&e.data.body.trace,!r||0===r.length)return!0;if(!t)return!0;for(s=r.length,i=t.frames.length,c=0;c<i;c++){if(n=t.frames[c],o=n.filename,!v.isType(o,"string"))return!0;for(l=0;l<s;l++)if(a=r[l],u=new RegExp(a),u.test(o))return!0}}catch(p){return this.configure({hostWhiteList:null}),console.error("[Rollbar]: Error while reading your configuration's hostWhiteList option. Removing custom hostWhiteList.",p),!0}return!1},x._messageIsIgnored=function(e){var r,t,n,o,i,a,s,u,c;try{if(i=!1,n=this.options.ignoredMessages,!n||0===n.length)return!1;if(s=e&&e.data&&e.data.body,u=s&&s.trace&&s.trace.exception&&s.trace.exception.message,c=s&&s.message&&s.message.body,r=u||c,!r)return!1;for(o=n.length,t=0;t<o&&(a=new RegExp(n[t],"gi"),!(i=a.test(r)));t++);}catch(l){this.configure({ignoredMessages:null}),console.error("[Rollbar]: Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")}return i},x._enqueuePayload=function(e,r,t,n){var o={callback:n,accessToken:this.options.accessToken,endpointUrl:this._route("item/"),payload:e},i=function(){if(n){var e="This item was not sent to Rollbar because it was ignored. This can happen if a custom checkIgnore() function was used or if the item's level was less than the notifier' reportLevel. See https://rollbar.com/docs/notifier/rollbar.js/configuration for more details.";n(null,{err:0,result:{id:null,uuid:null,message:e}})}};if(this._internalCheckIgnore(r,t,e))return void i();try{if(v.isType(this.options.checkIgnore,"function")&&this.options.checkIgnore(r,t,e))return void i()}catch(a){this.configure({checkIgnore:null}),console.error("[Rollbar]: Error while calling custom checkIgnore() function. Removing custom checkIgnore().",a)}if(this._urlIsWhitelisted(e)&&!this._messageIsIgnored(e)){if(this.options.verbose){if(e.data&&e.data.body&&e.data.body.trace){var s=e.data.body.trace,c=s.exception.message;console.error("[Rollbar]: ",c)}console.info("[Rollbar]: ",o)}v.isType(this.options.logFunction,"function")&&this.options.logFunction(o);try{v.isType(this.options.transform,"function")&&this.options.transform(e)}catch(a){this.configure({transform:null}),console.error("[Rollbar]: Error while calling custom transform() function. Removing custom transform().",a)}this.options.enabled&&u(o)}},x._internalCheckIgnore=function(e,r,t){var n=r[0],o=s.LEVELS[n]||0,i=s.LEVELS[this.options.reportLevel]||0;if(o<i)return!0;var a=this.options?this.options.plugins:{};if(a&&a.jquery&&a.jquery.ignoreAjaxErrors)try{return!!t.data.body.message.extra.isAjax}catch(u){return!1}return!1},x._log=function(e,r,t,n,o,i,a){var s=null;if(t)try{if(s=t._savedStackTrace?t._savedStackTrace:m.parse(t),t===this.lastError)return;this.lastError=t}catch(u){console.error("[Rollbar]: Error while parsing the error object.",u),r=t.message||t.description||r||String(t),t=null}var c=this._buildPayload(new Date,e,r,s,n);a&&(c.ignoreRateLimit=!0),this._enqueuePayload(c,!!i,[e,r,t,n],o)},x.log=c(),x.debug=c("debug"),x.info=c("info"),x.warn=c("warning"),x.warning=c("warning"),x.error=c("error"),x.critical=c("critical"),x.uncaughtError=o(function(e,r,t,n,o,i){if(i=i||null,o&&v.isType(o,"error"))return void this._log(this.options.uncaughtErrorLevel,e,o,i,null,!0);if(r&&v.isType(r,"error"))return void this._log(this.options.uncaughtErrorLevel,e,r,i,null,!0);var a={url:r||"",line:t};a.func=m.guessFunctionName(a.url,a.line),a.context=m.gatherContext(a.url,a.line);var s={mode:"onerror",message:o?String(o):e||"uncaught exception",url:document.location.href,stack:[a],useragent:navigator.userAgent},u=this._buildPayload(new Date,this.options.uncaughtErrorLevel,e,s,i);this._enqueuePayload(u,!0,[this.options.uncaughtErrorLevel,e,r,t,n,o])}),x.unhandledRejection=o(function(e,r){if(null==e)return void _._log(_.options.uncaughtErrorLevel,"unhandled rejection was null or undefined!",null,{},null,!1,!1);var t=e.message||(e?String(e):"unhandled rejection"),n=e._rollbarContext||r._rollbarContext||null;if(e&&v.isType(e,"error"))return void this._log(this.options.uncaughtErrorLevel,t,e,n,null,!0);var o={url:"",line:0};o.func=m.guessFunctionName(o.url,o.line),o.context=m.gatherContext(o.url,o.line);var i={mode:"unhandledrejection",message:t,url:document.location.href,stack:[o],useragent:navigator.userAgent},a=this._buildPayload(new Date,this.options.uncaughtErrorLevel,t,i,n);this._enqueuePayload(a,!0,[this.options.uncaughtErrorLevel,t,o.url,o.line,0,e,r])}),x.global=o(function(e){e=e||{};var r={startTime:e.startTime,maxItems:e.maxItems,itemsPerMinute:e.itemsPerMinute};g(!0,window._globalRollbarOptions,r),void 0!==e.maxItems&&(T=0),void 0!==e.itemsPerMinute&&(R=0)}),x.configure=o(function(e,r){var t=g(!0,{},e);g(!r,this.options,t),this.global(t)}),x.scope=o(function(e){var r=new s(this);return g(!0,r.options.payload,e),r}),x.wrap=function(e,r){try{var t;if(t=v.isType(r,"function")?r:function(){return r||{}},!v.isType(e,"function"))return e;if(e._isWrap)return e;if(!e._wrapped){e._wrapped=function(){try{return e.apply(this,arguments)}catch(r){throw"string"==typeof r&&(r=new String(r)),r.stack||(r._savedStackTrace=m.parse(r)),r._rollbarContext=t()||{},r._rollbarContext._wrappedSource=e.toString(),window._rollbarWrappedError=r,r}},e._wrapped._isWrap=!0;for(var n in e)e.hasOwnProperty(n)&&(e._wrapped[n]=e[n])}return e._wrapped}catch(o){return e}},x.loadFull=function(){console.error("[Rollbar]: Unexpected Rollbar.loadFull() called on a Notifier instance")},s.processPayloads=function(e){return e?void f():void i()};var L=(new Date).getTime(),T=0,R=0;e.exports={Notifier:s,setupJSON:n,topLevelNotifier:a}},function(e,r){"use strict";var t=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===n.call(e)},i=function(e){if(!e||"[object Object]"!==n.call(e))return!1;var r=t.call(e,"constructor"),o=e.constructor&&e.constructor.prototype&&t.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!r&&!o)return!1;var i;for(i in e);return"undefined"==typeof i||t.call(e,i)};e.exports=function a(){var e,r,t,n,s,u,c=arguments[0],l=1,p=arguments.length,f=!1;for("boolean"==typeof c?(f=c,c=arguments[1]||{},l=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});l<p;++l)if(e=arguments[l],null!=e)for(r in e)t=c[r],n=e[r],c!==n&&(f&&n&&(i(n)||(s=o(n)))?(s?(s=!1,u=t&&o(t)?t:[]):u=t&&i(t)?t:{},c[r]=a(f,u,n)):"undefined"!=typeof n&&(c[r]=n));return c}},function(e,r,t){"use strict";function n(){return l}function o(){return null}function i(e){var r={};return r._stackFrame=e,r.url=e.fileName,r.line=e.lineNumber,r.func=e.functionName,r.column=e.columnNumber,r.args=e.args,r.context=o(r.url,r.line),r}function a(e){function r(){var r=[];try{r=c.parse(e)}catch(t){r=[]}for(var n=[],o=0;o<r.length;o++)n.push(new i(r[o]));return n}return{stack:r(),message:e.message,name:e.name}}function s(e){return new a(e)}function u(e){if(!e)return["Unknown error. There was no error message to display.",""];var r=e.match(p),t="(unknown)";return r&&(t=r[r.length-1],e=e.replace((r[r.length-2]||"")+t+":",""),e=e.replace(/(^[\s]+|[\s]+$)/g,"")),[t,e]}var c=t(6),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");e.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i}},function(e,r,t){var n,o,i;!function(a,s){"use strict";o=[t(7)],n=s,i="function"==typeof n?n.apply(r,o):n,!(void 0!==i&&(e.exports=i))}(this,function(e){"use strict";function r(e,r,t){if("function"==typeof Array.prototype.map)return e.map(r,t);for(var n=new Array(e.length),o=0;o<e.length;o++)n[o]=r.call(t,e[o]);return n}function t(e,r,t){if("function"==typeof Array.prototype.filter)return e.filter(r,t);for(var n=[],o=0;o<e.length;o++)r.call(t,e[o])&&n.push(e[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(o))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var r=e.replace(/[\(\)\s]/g,"").split(":"),t=r.pop(),n=r[r.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=r.pop();return[r.join(":"),o,t]}return[r.join(":"),t,void 0]},parseV8OrIE:function(n){var i=t(n.stack.split("\n"),function(e){return!!e.match(o)},this);return r(i,function(r){r.indexOf("(eval ")>-1&&(r=r.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var t=r.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(t.pop()),o=t.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new e(o,(void 0),i,n[1],n[2],r)},this)},parseFFOrSafari:function(n){var o=t(n.stack.split("\n"),function(e){return!e.match(i)},this);return r(o,function(r){if(r.indexOf(" > eval")>-1&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),r.indexOf("@")===-1&&r.indexOf(":")===-1)return new e(r);var t=r.split("@"),n=this.extractLocation(t.pop()),o=t.shift()||void 0;return new e(o,(void 0),n[0],n[1],n[2],r)},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(r){for(var t=/Line (\d+).*script (?:in )?(\S+)/i,n=r.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=t.exec(n[i]);s&&o.push(new e((void 0),(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera10:function(r){for(var t=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=r.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=t.exec(n[i]);s&&o.push(new e(s[3]||void 0,(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera11:function(o){var i=t(o.stack.split("\n"),function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return r(i,function(r){var t,n=r.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(t=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===t||"[arguments not available]"===t?void 0:t.split(",");return new e(a,s,o[0],o[1],o[2],r)},this)}}})},function(e,r,t){var n,o,i;!function(t,a){"use strict";o=[],n=a,i="function"==typeof n?n.apply(r,o):n,!(void 0!==i&&(e.exports=i))}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function r(e,r,t,n,o,i){void 0!==e&&this.setFunctionName(e),void 0!==r&&this.setArgs(r),void 0!==t&&this.setFileName(t),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return r.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(e){this.functionName=String(e)},getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getFileName:function(){return this.fileName},setFileName:function(e){this.fileName=String(e)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(r){if(!e(r))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(r)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(r){if(!e(r))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(r)},getSource:function(){return this.source},setSource:function(e){this.source=String(e)},toString:function(){var r=this.getFunctionName()||"{anonymous}",t="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return r+t+n+o+i}},r})},function(e,r,t){"use strict";function n(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function o(e,r){return n(e)===r}function i(e){if(!o(e,"string"))throw new Error("received invalid input");for(var r=l,t=r.parser[r.strictMode?"strict":"loose"].exec(e),n={},i=14;i--;)n[r.key[i]]=t[i]||"";return n[r.q.name]={},n[r.key[12]].replace(r.q.parser,function(e,t,o){t&&(n[r.q.name][t]=o)}),n}function a(e){var r=i(e);return""===r.anchor&&(r.source=r.source.replace("#","")),e=r.source.replace("?"+r.query,"")}function s(e,r){var t,n,i,a=o(e,"object"),u=o(e,"array"),c=[];if(a)for(t in e)e.hasOwnProperty(t)&&c.push(t);else if(u)for(i=0;i<e.length;++i)c.push(i);for(i=0;i<c.length;++i)t=c[i],n=e[t],a=o(n,"object"),u=o(n,"array"),a||u?e[t]=s(n,r):e[t]=r(t,n);return e}function u(e){return e=String(e),new Array(e.length+1).join("*")}function c(){var e=(new Date).getTime(),r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){var t=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===r?t:7&t|8).toString(16)});return r}t(9);var l={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},p={isType:o,parseUri:i,parseUriOptions:l,redact:u,sanitizeUrl:a,traverse:s,typeName:n,uuid4:c};e.exports=p},function(e,r){!function(e){"use strict";e.console=e.console||{};for(var r,t,n=e.console,o={},i=function(){},a="memory".split(","),s="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");r=a.pop();)n[r]||(n[r]=o);for(;t=s.pop();)n[t]||(n[t]=i)}("undefined"==typeof window?this:window)},function(e,r,t){"use strict";function n(e){a=e}function o(e){this.name="Connection Error",this.message=e,this.stack=(new Error).stack}var i=t(8),a=null;o.prototype=Object.create(Error.prototype),o.prototype.constructor=o;var s={XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createXMLHTTPObject:function(){var e,r=!1,t=s.XMLHttpFactories,n=t.length;for(e=0;e<n;e++)try{r=t[e]();break}catch(o){}return r},post:function(e,r,t,n){if(!i.isType(t,"object"))throw new Error("Expected an object to POST");t=a.stringify(t),n=n||function(){};var u=s.createXMLHTTPObject();if(u)try{try{var c=function(){try{if(c&&4===u.readyState){c=void 0;var e=a.parse(u.responseText);200===u.status?n(null,e):i.isType(u.status,"number")&&u.status>=400&&u.status<600?(403==u.status&&console.error("[Rollbar]:"+e.message),n(new Error(String(u.status)))):n(new o("XHR response had no status code (likely connection failure)"))}}catch(r){var t;t=r&&r.stack?r:new Error(r),n(t)}};u.open("POST",e,!0),u.setRequestHeader&&(u.setRequestHeader("Content-Type","application/json"),u.setRequestHeader("X-Rollbar-Access-Token",r)),u.onreadystatechange=c,u.send(t)}catch(l){if("undefined"!=typeof XDomainRequest){"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var p=function(){n(new o("Request timed out"))},f=function(){n(new Error("Error during request"))},d=function(){n(null,a.parse(u.responseText))};u=new XDomainRequest,u.onprogress=function(){},u.ontimeout=p,u.onerror=f,u.onload=d,u.open("POST",e,!0),u.send(t)}}}catch(h){n(h)}}};e.exports={XHR:s,setupJSON:n,ConnectionError:o}}])});
},{}],2:[function(require,module,exports){
var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var getLightUnion = require("./getLightUnion");
var QueryString = require('./util/queryString');
var Rollbar = require("rollbar-browser");
var trim = require('./util/trim');
var debounce = require('./util/debounce');
var getJSON = require('./util/getJSON');

// error reporting
var rollbarConfig = {
    accessToken: 'fe7cf327f2b24bb8991e252239f6200f',
    captureUncaught: true,
    ignoredMessages: [
        "Error:  DOM Exception 18",
        "SecurityError: DOM Exception 18: An attempt was made to break through the security policy of the user agent.",
        "SecurityError:  An attempt was made to break through the security policy of the user agent.",
        "Script error."
    ],
    payload: {
        environment: 'production',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: "135324f3faa71a2316cd7e4760d68f6334d7ef1c",
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true
            }
        }
    }
};

document.getElementById('last-update').innerHTML = "2017-01-01 04:50:39 UTC";
    
var rollbar = Rollbar.init(rollbarConfig);
    
function App(map_tile_path, vision_data_image_path) {
    var self = this,
        IMG_DIR = "img/",
        ENTITIES = {
            observer: {
                icon_path: IMG_DIR + "ward_observer.png",
                radius: 1600
            },
            sentry: {
                icon_path: IMG_DIR + "ward_sentry.png",
                radius: 850
            }
        },
        DARKNESS_VISION_RADIUS = 675,
        TOWER_DAY_VISION_RADIUS = 1900,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_trueSight = 700,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data/",
        map_data,
        mapConstants = require('./mapConstants'),
        conversionFunctions = require('./conversionFunctions'),
        mapBounds = new OpenLayers.Bounds(0, 0, mapConstants.map_w, mapConstants.map_h),
        map = new OpenLayers.Map("map1", {
            theme: null,
            maxExtent: mapBounds,
            numZoomLevels: 5,
            maxResolution: Math.pow(2, 5-1 ),
            units: "m",
            tileManager: {
                cacheSize: 5456,
                moveDelay: 0,
                zoomDelay: 0,
                frameDelay: 0,
                tilesPerFrame: 128
            }
        }),
        layerKeys = [
            "no_wards",
            "ent_fow_blocker_node",
            "trigger_multiple",
            "npc_dota_neutral_spawner",
            "ent_dota_tree",
            "npc_dota_roshan_spawner",
            "dota_item_rune_spawner_powerup",
            "dota_item_rune_spawner_bounty",
            "ent_dota_fountain",
            "ent_dota_shop",
            "npc_dota_barracks",
            "npc_dota_filler",
            "npc_dota_healer",
            "npc_dota_fort",
            "npc_dota_tower"
        ],
        layerNames = {
            npc_dota_roshan_spawner: "Roshan",
            dota_item_rune_spawner_powerup: "Runes",
            dota_item_rune_spawner_bounty: "Bounty Runes",
            ent_dota_tree: "Trees",
            npc_dota_healer: "Shrines",
            ent_dota_fountain: "Fountain",
            npc_dota_fort: "Ancients",
            ent_dota_shop: "Shops",
            npc_dota_tower: "Towers",
            npc_dota_barracks: "Barracks",
            npc_dota_filler: "Buildings",
            trigger_multiple: "Neutral Spawn Boxes",
            npc_dota_neutral_spawner: "Neutral Camps",
            no_wards: "Invalid Ward Locations",
            ent_fow_blocker_node: "Vision Blocker"
        },
        baseLayersOptions = {
            type: "jpg"
        },
        baseLayersConfig = [
            ['7.00 Default', '700', 'default'],
            ['7.00 New Journey', '700', 'journey'],
            ['6.87', '687', 'default'],
            ['6.87 Desert', '687', 'desert'],
            ['6.87 Immortal Gardens', '687', 'immortalgardens']
        ],
        baseLayers = baseLayersConfig.map(function (baseLayerConfig) {
            var baseLayerOptions = OpenLayers.Util.extend({
                getURL: getMyURL(baseLayerConfig[1], baseLayerConfig[2])
            }, baseLayersOptions);
            return new OpenLayers.Layer.TMS(baseLayerConfig[0], map_tile_path, baseLayerOptions);
        }),
        overlayGrouping = {
            "Day Vision Range": "Vision",
            "Night Vision Range": "Vision",
            "True Sight Range": "Vision",
            "Attack Range": "Vision",
            "Fountain": "Structures",
            "Towers": "Structures",
            "Shrines": "Structures",
            "Ancients": "Structures",
            "Barracks": "Structures",
            "Buildings": "Structures",
            "Shops": "Structures",
            "Invalid Ward Locations": "Vision",
            "Vision Blocker": "Vision",
            "Placed Wards": "Vision",
            "Ward Vision": "Vision",
            "Ward Vision with Fog": "Vision"
        },
        icon_paths = {
            "ent_dota_fountain": IMG_DIR + "svgs/water-15.svg",
            "ent_dota_tree": IMG_DIR + "svgs/park-15.svg",
            "ent_dota_tree_cut": IMG_DIR + "stump.svg",
            "ent_dota_shop": IMG_DIR + "svgs/shop-15.svg",
            "npc_dota_neutral_spawner": IMG_DIR + "svgs/jungle_1.svg",
            "npc_dota_tower": IMG_DIR + "svgs/castle-15.svg",
            "npc_dota_healer": IMG_DIR + "svgs/place-of-worship-15.svg",
            "npc_dota_fort": IMG_DIR + "svgs/town-hall-15.svg",
            "npc_dota_filler": IMG_DIR + "svgs/landmark-15.svg",
            "npc_dota_barracks": IMG_DIR + "svgs/stadium-15.svg",
            "dota_item_rune_spawner_powerup": IMG_DIR + "doubledamage.png",
            "dota_item_rune_spawner_bounty": IMG_DIR + "bountyrune.png",
            "npc_dota_roshan_spawner": IMG_DIR + "roshan.png"
        },
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
            div: document.getElementById('overlays-container'),
            ascending: false,
            overlayGrouping: overlayGrouping,
            onMaximizeWhenSmallScreen: minimizeControlList.bind(document.getElementById("controls-min"))
        }),
        coordinateControl = new OpenLayers.Control.MousePosition(),
        cursorLayer = new OpenLayers.Layer.Vector("Cursor", {displayInLayerSwitcher:false}),
        dayRangeLayer = new OpenLayers.Layer.Vector("Day Vision Range"),
        nightRangeLayer = new OpenLayers.Layer.Vector("Night Vision Range"),
        trueSightRangeLayer = new OpenLayers.Layer.Vector("True Sight Range"),
        attackRangeLayer = new OpenLayers.Layer.Vector("Attack Range"),
        polygonLayer = new OpenLayers.Layer.Vector("Drawn Circles"),
        wardVisionLayer = new OpenLayers.Layer.Vector("Ward Vision"),
        visionSimulationLayer = new OpenLayers.Layer.Vector("Ward Vision with Fog"),
        iconLayer = new OpenLayers.Layer.Markers("Placed Wards"),
        renderer = OpenLayers.Util.getParameters(window.location.href).renderer,
        drawControls,
        lastDistance,
        style = require('./styleConstants'),
        treeMarkers = {},
        VISION_SIMULATION = true,
        VISION_SIMULATION_ALWAYS = true,
        DARKNESS = false,
        NIGHTTIME = false,
        cutTrees = {};

        console.log(map.tileManager);
        
    /***********************************
     * COORDINATE CONVERSION FUNCTIONS *
     ***********************************/

    var reverseLerp = conversionFunctions.reverseLerp,
        latLonToWorld = conversionFunctions.latLonToWorld,
        worldToLatLon = conversionFunctions.worldToLatLon,
        getTileRadius = conversionFunctions.getTileRadius,
        getScaledRadius = conversionFunctions.getScaledRadius,
        calculateDistance = conversionFunctions.calculateDistance;

    /********************
     * CONTROL HANDLERS *
     ********************/

    function throttle(func, limit) {
        var wait = false;
        return function () {
            var context = this, args = arguments;
            if (!wait) {
                func.apply(context, args);
                wait = true;
                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    }
    
    var wardRecentlyRemoved = false;
    
    // called by handlers to prevent event propogation to observer and sentry click controls
    function clearClickControl() {
        if (drawControls['observer'].active) {
            drawControls['observer'].deactivate();
            drawControls['observer'].activate();
        }
        if (drawControls['sentry'].active) {
            drawControls['sentry'].deactivate();
            drawControls['sentry'].activate();
        }
    }

    function handleTreeMarkerClick(event) {
        console.log('handleTreeMarkerClick', event, this);
        cursorLayer.destroyFeatures();
        setTreeMarkerState(this, !this.treeVisible);
        setTreeQueryString();
        OpenLayers.Event.stop(event);
        clearClickControl();
    }
    
    function setTreeMarkerState(marker, state) {
        console.log('setTreeMarkerState', marker);
        var worldXY = latLonToWorld(marker.lonlat.lon, marker.lonlat.lat);

        marker.treeVisible = state;
        marker.setUrl(state ? icon_paths.ent_dota_tree : icon_paths.ent_dota_tree_cut);
        
        if (VISION_SIMULATION) {
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            vs.toggleTree(gridXY.x, gridXY.y);
        }

        var popupContentHTML = "Click to cut down tree.<br>This will affect the ward vision simulation.";
        if (state) {
            delete cutTrees[marker.tree_loc]
        }
        else {
            popupContentHTML = "Click to regrow tree.<br>This will affect the ward vision simulation.";
            cutTrees[marker.tree_loc] = marker;
        }
        
        marker.feature.data.popupContentHTML = popupContentHTML;
        if (marker.feature.popup) {
            marker.feature.popup.setContentHTML(popupContentHTML);
        }
    }
    
    function addVisionCircle(layer, marker, radius, property, style) {
        var center = new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat);
        var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(radius), 30);
        var feature = new OpenLayers.Feature.Vector(circle, null, style);
        layer.addFeatures(feature);
        if (marker[property]) {
            layer.removeFeatures(marker[property]);
            marker[property].destroy();
        }
        marker[property] = feature;
    }
    
    function addBuildingVisionFeatures(marker, skipDay, skipNight, skipTrueSight, skipAttack) {
        var dayVision = DARKNESS ? Math.min(marker.dayVision, DARKNESS_VISION_RADIUS) : marker.dayVision;
        var nightVision = DARKNESS ? Math.min(marker.nightVision, DARKNESS_VISION_RADIUS) : marker.nightVision;
        var trueSight = marker.trueSight;
        var attackRange = marker.attackRange;
        
        if (!skipDay && marker.dayVision) addVisionCircle(dayRangeLayer, marker, dayVision, 'day_vision_feature', style.day);
        if (!skipNight && marker.nightVision) addVisionCircle(nightRangeLayer, marker, nightVision, 'night_vision_feature', style.night);
        if (!skipTrueSight && marker.trueSight) addVisionCircle(trueSightRangeLayer, marker, trueSight, 'true_sight_feature', style.true_sight);
        if (!skipAttack && marker.attackRange) addVisionCircle(attackRangeLayer, marker, attackRange, 'attack_range_feature', style.attack_range);
        
        if (VISION_SIMULATION) {
            if (NIGHTTIME && !skipNight && marker.nightVision) {
                updateVisibilityHandler(marker.lonlat, marker, nightVision);
            }
            else if (!NIGHTTIME && !skipDay && marker.dayVision) {
                updateVisibilityHandler(marker.lonlat, marker, dayVision);
            }
        }
    }

    function handleTowerMarkerClick(event, skipQueryStringUpdate) {
        console.log('handleTowerMarkerClick', event);
        cursorLayer.destroyFeatures();
        var marker = event.object;
        if (!marker.showInfo) {
            addBuildingVisionFeatures(marker);
            if (!skipQueryStringUpdate) QueryString.addQueryStringValue("tower_vision", marker.tower_loc.x + ',' + marker.tower_loc.y);
        }
        else {
            dayRangeLayer.removeFeatures(marker.day_vision_feature);
            nightRangeLayer.removeFeatures(marker.night_vision_feature);
            trueSightRangeLayer.removeFeatures(marker.true_sight_feature);
            attackRangeLayer.removeFeatures(marker.attack_range_feature);

            if (marker.vision_feature) visionSimulationLayer.removeFeatures(marker.vision_feature);
            if (marker.vision_center_feature) visionSimulationLayer.removeFeatures(marker.vision_center_feature);
      
            if (!skipQueryStringUpdate) QueryString.removeQueryStringValue("tower_vision", marker.tower_loc.x + ',' + marker.tower_loc.y);
        }
        marker.showInfo = !marker.showInfo;
        updatePopup(marker, marker.showInfo);
        
        OpenLayers.Event.stop(event);
        clearClickControl();
    }

    function handleWardClick(entityName, style) {
        return function(event) {
            console.log('handleWardClick', event, this);
            cursorLayer.destroyFeatures();
            if (wardRecentlyRemoved) return;
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName, style);
            if (marker) QueryString.addQueryStringValue(marker.unitType, marker.ward_loc);
        }
    }
    
    function updateWard(marker, radius) {
        if (marker.unitType == 'observer') {
            marker.radius_feature.destroy();
            marker.vision_feature.destroy();
            marker.vision_center_feature.destroy();
            var circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(radius), 40),
                feature = new OpenLayers.Feature.Vector(circle);
            wardVisionLayer.addFeatures(feature);
            marker.radius_feature = feature;
            
            if (VISION_SIMULATION) updateVisibilityHandler(marker.lonlat, marker, radius);
        }
    }

    function placeWard(latlon, entityName, style, qs_value_worldXY) {
        if (!mapBounds.containsLonLat(latlon)) return;
        var entity = ENTITIES[entityName],
            vision_radius = entityName == 'observer' ? getVisionRadius() : entity.radius,
            marker = createWardMarker(entity.icon_path, entityName, latlon);
        iconLayer.addMarker(marker);
        
        addVisionCircle(wardVisionLayer, marker, vision_radius, 'radius_feature', style)
        marker.unitType = entityName;
        marker.ward_loc = entityName;
        marker.vision_radius = vision_radius;

        if (qs_value_worldXY == undefined) {
            var worldXY = latLonToWorld(latlon.lon, latlon.lat);
            worldXY.x = worldXY.x.toFixed(0);
            worldXY.y = worldXY.y.toFixed(0);
            marker.ward_loc = worldXY.x + ',' + worldXY.y
        } else {
            marker.ward_loc = qs_value_worldXY;
        }

        if (VISION_SIMULATION && entityName == 'observer') updateVisibilityHandler(latlon, marker, marker.vision_radius);
        
        marker.events.register("click", marker, handleWardRemove);
        marker.events.register("touchstart", marker, handleWardRemove);
        
        console.log('placeWard', this);
        
        return marker;
    }

    function handleWardRemove(event) {
        console.log('handleWardRemove', event, this);
        if (this.radius_feature) this.radius_feature.destroy();
        if (this.vision_feature) this.vision_feature.destroy();
        if (this.vision_center_feature) this.vision_center_feature.destroy();
        this.events.unregister("click", this, handleWardRemove);
        this.events.unregister("touchstart", this, handleWardRemove);
        this.feature.destroy();
        iconLayer.removeMarker(this);

        QueryString.removeQueryStringValue(this.unitType, this.ward_loc);
        
        wardRecentlyRemoved = true;
        cursorLayer.destroyFeatures();
        setTimeout(function () {
            wardRecentlyRemoved = false;
        }, 1000);
        OpenLayers.Event.stop(event);
        clearClickControl();
    }

    function handleMeasurements(event) {
        var out = "";
        if (event.order == 1) {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        document.getElementById("output").innerHTML = out;

        lastDistance = calculateDistance(event.order, event.units, event.measure);
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);

        document.getElementById("traveltime-container").style.display = '';
    }

    function handleCircleMeasurements(event) {
        var element = document.getElementById("output"),
            out = "";

        if (event.order == 1) {
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function handleCircleMeasurementsPartial(event) {
        var element = document.getElementById("output"),
            out = "",
            circle,
            feature,
            self = this;

        drawControls["select"].deactivate();
        if (event.order == 1) {
            if (event.measure > 0) {
                if (event.units == "km") {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure * 1e3, 30);
                } else {
                    circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(event.geometry.components[0].x, event.geometry.components[0].y), event.measure, 30);
                }
                feature = new OpenLayers.Feature.Vector(circle);
                polygonLayer.removeFeatures(event.geometry.circle_features);
                if ("circle_features" in event.geometry) {
                    event.geometry.circle_features.length = 0;
                    event.geometry.circle_features.push(feature);
                } else {
                    event.geometry.circle_features = [feature];
                }
                feature.measure_control = this;
                feature.is_measuring = true;
                polygonLayer.addFeatures(feature);
                if (event.geometry.components.length > 2) {
                    setTimeout(function() {
                        feature.is_measuring = false;
                        drawControls["select"].activate();
                        self.cancel();
                    }, 0);
                }
            }
            out += "Radius: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units";
        } else {
            out += "Distance: " + calculateDistance(event.order, event.units, event.measure).toFixed(0) + " units<sup>2</" + "sup>";
        }
        element.innerHTML = out;
    }

    function handleHoverPopup(event) {
        if (this.popup == null) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        }
        else {
            console.log(this.popup);
            this.popup.toggle();
        }
        currentPopup = this.popup;
        OpenLayers.Event.stop(event);
    };
        
    function addMarker(markers, ll, icon, popupClass, popupContentHTML, closeBox, overflow) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;

        feature.closeBox = closeBox;
        feature.popupClass = popupClass;
        feature.data.icon = icon
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = overflow ? "auto" : "hidden";
        marker = feature.createMarker();
        marker.feature = feature;
        
        if (markers.name != "Trees") {
            console.log(markers.name);
            marker.events.register("mouseover", feature, handleHoverPopup);
            marker.events.register("mouseout", feature, handleHoverPopup);
        }

        markers.addMarker(marker);
        return marker;
    }

    function createWardMarker(img, unitType, latlon, popupContentHTML) {
        var size = new OpenLayers.Size(21, 25),
            offset = new OpenLayers.Pixel(-(size.w / 2), -size.h),
            icon = new OpenLayers.Icon(img, size, offset);
            
        var feature = new OpenLayers.Feature(iconLayer, latlon);
        feature.data.lonlat = latlon;
        feature.data.icon = icon;
        feature.closeBox = false;
        feature.popupClass = OpenLayers.Popup.FramedCloud;
        console.log('createWardMarker', img, latlon, popupContentHTML);
        feature.data.popupContentHTML = getPopupContent(null, unitType);
        feature.data.overflow = "hidden";
        var marker = feature.createMarker();
        marker.feature = feature;
        
        marker.events.register("mouseover", feature, handleHoverPopup);
        marker.events.register("mouseout", feature, handleHoverPopup);

        return marker;
    }

    // Creates a 64x64 rectangle feature centered at c
    function createTileFeature(c, style) {
        var r1 = worldToLatLon(c.x - 32, c.y - 32),
            r2 = worldToLatLon(c.x - 32, c.y + 32),
            r3 = worldToLatLon(c.x + 32, c.y + 32),
            r4 = worldToLatLon(c.x + 32, c.y - 32),
            box_points = [
                new OpenLayers.Geometry.Point(r1.x, r1.y),
                new OpenLayers.Geometry.Point(r2.x, r2.y),
                new OpenLayers.Geometry.Point(r3.x, r3.y),
                new OpenLayers.Geometry.Point(r4.x, r4.y)
            ],
            box_rect = new OpenLayers.Geometry.LinearRing(box_points),
            box_feature = new OpenLayers.Feature.Vector(box_rect, null, style);

        return box_feature;
    }

    // creates url for tiles. OpenLayers TMS Layer getURL property is set to this
    function getMyURL(patch, baseLayer) {
        return function(bounds) {
            //console.log('getMyURL', baseLayer);
            var res = this.map.getResolution(),
                x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w)),
                y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h)),
                z = map.getZoom(),
                path = z + "/tile_" + x + "_" + y + "." + this.type,
                url = this.url;

            if (url instanceof Array) {
                url = this.selectUrl(path, url)
            }
            return url + patch + '/' + baseLayer + '/' + path
        }
    }
    
    function resetMarkerLayers() {
        for (k in treeMarkers) {
            if (cutTrees[k]) {
                setTreeMarkerState(treeMarkers[k], true);
            }
        }
        var data = map_data;
        Object.keys(map_data.data).concat(["no_wards", "ent_fow_blocker_node"]).forEach(function (k) {
            var layer = map.getLayersByName(layerNames[k])[0];
            console.log('removing layer', layer, k);
            if (layer) {
                map.removeLayer(layer);
                layer.destroy();
            }
        });
        dayRangeLayer.destroyFeatures();
        nightRangeLayer.destroyFeatures();
        trueSightRangeLayer.destroyFeatures();
        attackRangeLayer.destroyFeatures();
        map.events.unregister("changelayer", map, layerChangeHandler);
    }

    function onMapDataLoad(data) {
        var markers = {},
            marker,
            vectorLayer = map.getLayersByName("Placed Wards")[0],
            box_points = [],
            box_rect, box_feature,
            coordData = data.data,
            statData = data.stats;

        if (VISION_SIMULATION) {
            loadGeoJSONData(markers, 'no_wards', layerNames.no_wards, style.red);
            loadGeoJSONData(markers, 'ent_fow_blocker_node', layerNames.ent_fow_blocker_node, style.lightblue);
        }
        
        layerKeys.forEach(function (k) {
            console.log('onMapDataLoad', k);
            // Create markers for non-neutral spawn box and non-tree layers
            if (coordData[k]) {
                if (k != "trigger_multiple" && k != "ent_dota_tree") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
                    for (var i = 0; i < coordData[k].length; i++) {
                        var latlon = worldToLatLon(coordData[k][i].x, coordData[k][i].y);
                        
                        var icon = null;
                        if (icon_paths[k]) {
                            var icon_path = icon_paths[k];
                            if (k == 'npc_dota_neutral_spawner') {
                                icon_path = icon_path.replace('1', coordData[k][i].neutralType);
                            }
                            var size = new OpenLayers.Size(24, 24),
                                offset = new OpenLayers.Pixel(-12,-12),
                                icon = new OpenLayers.Icon(icon_path, size, offset);
                        }
                
                        var unitClass = coordData[k][i].subType ? k + '_' + coordData[k][i].subType : k;

                        marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), icon, OpenLayers.Popup.FramedCloud, getPopupContent(statData, k, coordData[k][i].subType, unitClass, null, coordData[k][i].pullType, coordData[k][i].neutralType), false);
                        marker.unitType = k;
                        marker.unitSubType = coordData[k][i].subType;
                        marker.unitClass = unitClass;
                        console.log(k, coordData, coordData[k], coordData[k][i], marker.unitClass, marker.unitSubType);
                        if (statData) {
                            marker.dayVision = statData[marker.unitClass].dayVision;
                            marker.nightVision = statData[marker.unitClass].nightVision;
                            marker.trueSight = statData[marker.unitClass].trueSight;
                            marker.attackRange = statData[marker.unitClass].attackRange;
                            marker.pullType = coordData[k][i].pullType;
                            marker.neutralType = coordData[k][i].neutralType;
                        }
                        marker.showInfo = false;
                        
                        var throttledHandleTowerMarkerClick = throttle(handleTowerMarkerClick, 200);
                        marker.events.register("click", markers[k], throttledHandleTowerMarkerClick);
                        marker.events.register("touchstart", markers[k], throttledHandleTowerMarkerClick);
                        marker.tower_loc = coordData[k][i];
                    }
                }
                // Set up tree layer without creating tree markers yet
                else if (k == "ent_dota_tree") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
                }
                // Create neutral spawn markers and rectangles
                else if (k == "trigger_multiple") {
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", coordData[k]);
                }
            }
        });
            
        map_data = data;
        
        map.raiseLayer(vectorLayer, map.layers.length);

        map.events.register("changelayer", map, layerChangeHandler);

        parseQueryString();
    }
    
    function layerChangeHandler(event) {
        // Load tree markers the first time the tree layer is switched to
        if (event.property === "visibility" && event.layer.name == layerNames["ent_dota_tree"] && !event.layer.loaded) {
            loadTreeData();
        }

        if (event.property === "visibility") {
            if (event.layer.isBaseLayer) {
                QueryString.setQueryString('BaseLayer', event.layer.name.replace(/ /g, ''));
            }
            else {
                QueryString.setQueryString(event.layer.name.replace(/ /g, ''), event.layer.visibility ? true : null);
            }
        }
    }

    function loadTreeData() {
        console.log('start tree load');
        var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
        console.log(layer);
        var data = map_data.data.ent_dota_tree;
        for (var i = 0; i < data.length; i++) {
            var latlon = worldToLatLon(data[i].x, data[i].y);
            var size = new OpenLayers.Size(24, 24),
                offset = new OpenLayers.Pixel(-12,-12),
                icon = new OpenLayers.Icon(icon_paths["ent_dota_tree"], size, offset);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), icon, OpenLayers.Popup.FramedCloud, "Click to cut down tree.<br>This will affect the ward vision simulation.", false);
            marker.treeVisible = true;
            marker.tree_loc = data[i].x + ',' + data[i].y;
            if (VISION_SIMULATION) {
                var throttledHandleTreeMarkerClick = throttle(handleTreeMarkerClick, 200);
                marker.events.register("click", marker, throttledHandleTreeMarkerClick);
                marker.events.register("touchstart", marker, throttledHandleTreeMarkerClick);
            }
            treeMarkers[data[i].x + ',' + data[i].y] = marker;
        }
        layer.loaded = !layer.loaded;
        console.log('end tree load');
    }

    function loadJSONData(markers, k, name, data) {
        markers[name] = new OpenLayers.Layer.Vector(layerNames[k]);
        map.addLayer(markers[name]);
        markers[name].setVisibility(false);
        for (var i = 0; i < data.length; i++) {
            pnt = [];
            for (var j = 0; j < data[i].points.length; j++) {
                var latlon = worldToLatLon(data[i].points[j].x, data[i].points[j].y);
                pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
            }


            ln = new OpenLayers.Geometry.LinearRing(pnt);
            pf = new OpenLayers.Feature.Vector(ln, null, style.green);
            markers[name].addFeatures([pf]);
        }
    }
    
    function loadGeoJSONData(markers, k, name, style) {
        var filename = map_data_path + getDataVersion() + '/' + k + '2.json';
        markers[k] = new OpenLayers.Layer.Vector(name, {
            strategies: [new OpenLayers.Strategy.Fixed()],
            protocol: new OpenLayers.Protocol.HTTP({
                url: filename,
                format: new OpenLayers.Format.GeoJSON()
            }),
            visibility: false
        });
        markers[k].style = style;
        map.addLayer(markers[k]);
    }
    
    function toggleControl() {
        var control;
        QueryString.setQueryString('mode', null);
        for (var key in drawControls) {
            control = drawControls[key];
            console.log(this, this.value, key, this.value == key && this.checked);
            if (this.value == key && this.checked) {
                QueryString.setQueryString('mode', key);
                control.activate();
            } else {
                control.deactivate();
            }
            if ((this.value == "polygonControl" || this.value == "circle") && this.checked) {
                drawControls["select"].activate();
            } else {
                drawControls["select"].deactivate();
            }
        }
        if (this.value !== 'observer') document.getElementById("visible-area").innerHTML = "";
        
        document.getElementById("output").innerHTML = "";

        document.getElementById("traveltime-container").style.display = 'none';
    }

    // Initialize map settings based on query string values
    function parseQueryString() {
        var mode = QueryString.getParameterByName('mode');
        if (mode) {
            var modeRadioButton = document.getElementById(mode + 'Toggle');
            if (modeRadioButton) {
                modeRadioButton.checked = true;
                toggleControl.call(modeRadioButton);
            }
        }
        var zoom = QueryString.getParameterByName('zoom');
        if (zoom) {
            map.zoomTo(parseInt(zoom));
        }
        var worldX = QueryString.getParameterByName('x');
        var worldY = QueryString.getParameterByName('y');
        if (worldX && worldY) {
            var lonlat = worldToLatLon(worldX, worldY);
            map.setCenter(new OpenLayers.LonLat(lonlat.x, lonlat.y), undefined, false, false);
        }
        
        var keys = ['observer', 'sentry'];
        for (var i = 0; i < keys.length; i++) {
            var wards = QueryString.getParameterByName(keys[i])
            if (wards) {
                ward_coordinates = trim(wards, ' ;').split(';')
                ward_coordinates.map(function(el) {
                    var coord = el.split(',');
                    var xy = worldToLatLon(parseFloat(coord[0]), parseFloat(coord[1]));
                    placeWard(new OpenLayers.LonLat(xy.x, xy.y), keys[i], keys[i] === 'observer' ? style.day : style.true_sight, el);
                });
            }
        }
        
        var baseLayerName = QueryString.getParameterByName('BaseLayer');
        if (baseLayerName) {
            for (var i = 0; i < baseLayers.length; i++) {
                var layer = baseLayers[i];
                var layerName = layer.name.replace(/ /g, '');
                if (baseLayerName === layerName) {
                    map.setBaseLayer(layer);
                    break;
                }
            }
        }
        
        for (k in layerNames) {
            var layerName = layerNames[k].replace(/ /g, '');
            value = QueryString.getParameterByName(layerName);
            if (value) {
                var layer = map.getLayersByName(layerNames[k])[0];
                console.log('parseQueryString', layer, layerNames[k], layerName, value == "true");
                if (layer) layer.setVisibility(value == "true");
            }
        }

        var cut_trees = QueryString.getParameterByName('cut_trees');
        if (cut_trees) {
            var layer = map.getLayersByName(layerNames["ent_dota_tree"])[0];
            if (!layer.loaded) loadTreeData();
            cut_tree_coordinates = trim(cut_trees, ' ;').split(';')
            console.log(treeMarkers, cut_tree_coordinates);
            for (var i = 0; i < cut_tree_coordinates.length; i++) {
                console.log(cut_tree_coordinates[i]);
                if (treeMarkers[cut_tree_coordinates[i]]) {
                    setTreeMarkerState(treeMarkers[cut_tree_coordinates[i]], false);
                }
            }
        }

        var tower_vision = QueryString.getParameterByName('tower_vision');
        if (tower_vision) {
            for (k in map_data.data) {
                var layer = map.getLayersByName(layerNames[k])[0];
                if (layer.name == "Trees") continue;
                if (layer && layer.markers) {
                    tower_vision_coordinates = trim(tower_vision, ' ;').split(';')
                    console.log('tower_vision', layer);
                    console.log(treeMarkers, tower_vision_coordinates);
                    for (var i = 0; i < tower_vision_coordinates.length; i++) {
                        for (var j = 0; j < layer.markers.length; j++) {
                            console.log(layer, layer.name, layer.markers[j], layer.markers[j].tower_loc);
                            if (layer.markers[j].tower_loc && layer.markers[j].tower_loc.x + ',' + layer.markers[j].tower_loc.y == tower_vision_coordinates[i]) {
                                handleTowerMarkerClick({
                                    object: layer.markers[j]
                                }, true);
                            }
                        }
                    }
                }
            }
        }
    }
    
    function setTreeQueryString() {
        var value = Object.keys(cutTrees).join(';');
        QueryString.setQueryString('cut_trees', value || null);
    }

    /********************
     * INITITIALIZATION *
     ********************/
    OpenLayers.ImgPath = IMG_DIR;
    
    // Start setting up the map, adding controls and layers
    baseLayers.forEach(function(layer) {
        map.addLayer(layer);
    });
    map.addLayer(cursorLayer);
    map.addLayer(dayRangeLayer);
    map.addLayer(nightRangeLayer);
    map.addLayer(trueSightRangeLayer);
    map.addLayer(attackRangeLayer);
    map.addLayer(polygonLayer);
    map.addLayer(wardVisionLayer);
    map.addLayer(visionSimulationLayer);
    map.addLayer(iconLayer);
    map.addControl(coordinateControl);
    map.addControl(new OpenLayers.Control.Navigation({
        dragPanOptions: {
            enableKinetic: true
        }
    }));
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    map.addControl(layerSwitcher);
    layerSwitcher.maximizeControl();
    if (!map.getCenter()) {
        map.zoomToMaxExtent();
    }
    
    // create click handler
    OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
        defaultHandlerOptions: {
            single: true,
            "double": false,
            pixelTolerance: 0,
            stopSingle: false,
            stopDouble: false
        },
        initialize: function(options) {
            this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);
            OpenLayers.Control.prototype.initialize.apply(this, arguments);
            this.handler = new OpenLayers.Handler.Click(this, {
                click: this.onClick,
                dblclick: this.onDblclick
            }, this.handlerOptions);
        },
        onClick: function (event) {
            console.log('onClick');
        },
        onDblclick: function(event) {
            var output = document.getElementById(this.key + "Output"),
                msg = "dblclick " + event.xy;
            output.value = output.value + msg + "\n";
        }
    });

    // Controls configuration
    renderer = renderer ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
    drawControls = {
        line: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: true,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        circle: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
            persist: false,
            immediate: true,
            handlerOptions: {
                layerOptions: {
                    renderers: renderer
                }
            }
        }),
        observer: new OpenLayers.Control.Click({
            onClick: handleWardClick('observer', style.day)
        }),
        sentry: new OpenLayers.Control.Click({
            onClick: handleWardClick('sentry', style.true_sight)
        }),
        polygonControl: new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.RegularPolygon, {
            handlerOptions: {
                sides: 30
            }
        }),
        select: new OpenLayers.Control.SelectFeature(polygonLayer, {
            hover: true,
            highlightOnly: false,
            callbacks: {
                click: function(feature) {
                    var element = document.getElementById("output");
                    if (feature.measure_control && feature.is_measuring) {
                        feature.measure_control.cancel();
                        feature.is_measuring = false;
                        this.highlight(feature);
                    } else {
                        element.innerHTML = "";
                        polygonLayer.removeFeatures(feature);
                    }
                }
            },
            overFeature: function(feature) {
                var element = document.getElementById("output"),
                    out = "Radius: " + (.565352 * Math.sqrt(feature.geometry.getArea()) * mapConstants.scale).toFixed(0) + " units";
                element.innerHTML = out;
                this.highlight(feature);
            },
            outFeature: function(feature) {
                var element = document.getElementById("output");
                element.innerHTML = "";
                this.unhighlight(feature)
            }
        })
    };

    // Add controls to map
    for (var key in drawControls) {
        if (key == "line") {
            drawControls[key].events.on({
                measure: handleMeasurements,
                measurepartial: handleMeasurements
            })
        }
        if (key == "circle") {
            drawControls[key].events.on({
                measure: handleCircleMeasurements,
                measurepartial: handleCircleMeasurementsPartial
            })
        }
        map.addControl(drawControls[key]);
    }

    map.events.register("zoomend", map, debounce(function(){
        QueryString.setQueryString('zoom', map.getZoom());
    }, 500));

    map.events.register("moveend", map, debounce(function() {
        var mapCenter = map.getCenter();
        if (mapCenter) {
            var worldXY = latLonToWorld(mapCenter.lon, mapCenter.lat);
            QueryString.setQueryString('x', worldXY.x.toFixed(0));
            QueryString.setQueryString('y', worldXY.y.toFixed(0));
        }
    }, 500));

    // X/Y coordinate update display handler
    coordinateControl.formatOutput = function (lonlat) {
        var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
        return worldXY.x.toFixed(0) + ', ' + worldXY.y.toFixed(0);
    };
    
    map.events.register("mousemove", map, function(e) {
        cursorLayer.destroyFeatures();
        if (wardRecentlyRemoved) return;
        // create and add cursor marker polygon if in place observer mode
        if (VISION_SIMULATION && vs.ready && document.getElementById("observerToggle").checked) {
            var lonlat = map.getLonLatFromPixel(e.xy);
            if (!mapBounds.containsLonLat(lonlat)) return;
            
            var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
            var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
            
            var treePts = vs.tree_relations[gridXY.key];
            var treeBlocking = false;
            if (treePts) {
                for (var i = 0 ; i < treePts.length; i++) {
                    var treePt = treePts[i];
                    treeBlocking = vs.tree_state[treePt.key];
                    if (treeBlocking) break;
                }
            }
            var cursor_style = style.green;
            if (!vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
                cursor_style = style.red;
            }
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), cursor_style);
            cursorLayer.addFeatures([box_feature]);
            
            if (VISION_SIMULATION_ALWAYS) updateVisibilityHandler(lonlat, null, getVisionRadius());
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", debounce(function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
        if (layerSwitcher.isSmallScreen()) {
            layerSwitcher.minimizeControl();
        }
        if (e) e.preventDefault();
    }, 100), false);
    
    function minimizeControlList(e) {
        document.querySelector(".controls").style.display = 'none';
        document.getElementById("controls-max").style.display = 'block';
        this.style.display = 'none';
        if (e) e.preventDefault();
    }
    document.getElementById("controls-min").addEventListener("click", debounce(minimizeControlList, 100), false);
    
    // Initially hide controls if screen is small
    if (layerSwitcher.isSmallScreen()) {
        minimizeControlList.call(document.getElementById("controls-min"));
        layerSwitcher.minimizeControl();
    }

    // Show/hide X/Y coordinate display
    document.getElementById("coordControl").addEventListener("change", function(e) {
        if (this.checked) {
            document.querySelector(".olControlMousePosition").style.display = 'block';
        } else {
            document.querySelector(".olControlMousePosition").style.display = 'none';
        }
    }, false);

    // Vision simulation on/off
    document.getElementById("visionSimulationControl").addEventListener("change", function(e) {
        VISION_SIMULATION = this.checked;
        document.getElementById("alwaysSimulateControl").disabled = !this.checked;
    }, false);

    // Always simulate vision on/off
    document.getElementById("alwaysSimulateControl").addEventListener("change", function(e) {
        VISION_SIMULATION_ALWAYS = this.checked;
    }, false);

    // Update travel time display when movespeed input changes
    document.getElementById("movespeed").addEventListener("change", function(e) {
        document.getElementById("traveltime").innerHTML = (lastDistance / document.getElementById("movespeed").value).toFixed(2);
    }, false);

    // Set up panel radio button toggle handlers
    document.getElementById('navigateToggle').addEventListener('click', toggleControl, false);
    document.getElementById('lineToggle').addEventListener('click', toggleControl, false);
    document.getElementById('circleToggle').addEventListener('click', toggleControl, false);
    document.getElementById('observerToggle').addEventListener('click', toggleControl, false);
    document.getElementById('sentryToggle').addEventListener('click', toggleControl, false);
    
    document.getElementById('reset').addEventListener('click', debounce(function () {
        if (history && history.replaceState) history.replaceState(null, "", window.location.href.split("?")[0]);
        resetMarkerLayers();
        polygonLayer.destroyFeatures();
        wardVisionLayer.destroyFeatures();
        visionSimulationLayer.destroyFeatures();
        iconLayer.clearMarkers();
        drawControls.line.cancel();
        drawControls.circle.cancel();
        map.setBaseLayer(baseLayers[0]);
        map.zoomToMaxExtent();
        document.getElementById('dataControl').selectedIndex = 0;
        document.getElementById('vision-radius').value = ENTITIES.observer.radius;
        document.getElementById('darknessControl').checked = false;
        init();
    }, 1000), false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        QueryString.setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    document.getElementById('vision-radius').addEventListener('change', function () {
        console.log('vision-radius change', document.getElementById('vision-radius').value);
        document.getElementById('vision-radius').setAttribute('data-dirty-value', true);
    }, false);
    
    document.getElementById('nightControl').addEventListener('change', function () {
        NIGHTTIME = document.getElementById('nightControl').checked;
        QueryString.setQueryString('night', document.getElementById('nightControl').checked);
        updateBuildingVision();  
    }, false);
    
    document.getElementById('darknessControl').addEventListener('change', function () {
        toggleDarkness(document.getElementById('darknessControl').checked);
        QueryString.setQueryString('darkness', document.getElementById('darknessControl').checked);
        document.getElementById('vision-radius').removeAttribute('data-dirty-value');
    }, false);
    
    function toggleDarkness(state) {
        DARKNESS = state;
        console.log(state, document.getElementById('vision-radius').getAttribute('data-dirty-value'), !document.getElementById('vision-radius').getAttribute('data-dirty-value'), document.getElementById('vision-radius').getAttribute('data-saved-value'));
        if (state) {
            document.getElementById('vision-radius').setAttribute('data-saved-value', document.getElementById('vision-radius').value);
            document.getElementById('vision-radius').value = DARKNESS_VISION_RADIUS;
        }
        else {
            if (!document.getElementById('vision-radius').getAttribute('data-dirty-value')) {
                console.log('restore vision radius');
                document.getElementById('vision-radius').value = parseInt(document.getElementById('vision-radius').getAttribute('data-saved-value'))  || ENTITIES.observer.radius;
            }
        }
        iconLayer.markers.forEach(function (marker) {
            console.log(marker);
            if (marker.unitType == 'observer') {
                updateWard(marker, state ? DARKNESS_VISION_RADIUS : marker.vision_radius);
            }
        });
        
        updateBuildingVision();        
    }
    
    function updateBuildingVision() {
        for (k in map_data.data) {
            var layer = map.getLayersByName(layerNames[k])[0];
            if (layer && layer.markers) {
                console.log(k, layer);
                layer.markers.forEach(function (marker) {
                    if (marker.showInfo) addBuildingVisionFeatures(marker, false, false, true, true);
                });
            }
        }
    }
    
    function getDataVersion() {
        return document.getElementById('dataControl').value;
    }
    
    function updateVisibleArea() {
        document.getElementById('visible-area').innerHTML = "Visibility: " + (vs.lightArea / vs.area * 100).toFixed() + '% ' + vs.lightArea + "/" + vs.area;
    }

    function updateVisibilityHandler(latlon, marker, radius, visionStyle) {
        console.log('updateVisibilityHandler', marker);
        if (!vs.ready) return;

        var worldXY = latLonToWorld(latlon.lon, latlon.lat);
        var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
        if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            // create and add center marker polygon
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), style.green);
            if (marker) {
                visionSimulationLayer.addFeatures([box_feature]);
                if (marker.vision_center_feature) marker.vision_center_feature.destroy();
                marker.vision_center_feature = box_feature;
            }

            // execute vision simulation
            vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
            updateVisibleArea();
            
            // merge light points into a single polygon and add to vision layer
            var outlines = getLightUnion(vs.grid, vs.lights);
            var polygonList = outlines.map(function (outlinePoints) {
                var ringPoints = outlinePoints.map(function (pt) {
                    var worldXY = vs.GridXYtoWorldXY(pt.x, pt.y);
                    var latlon = worldToLatLon(worldXY.x, worldXY.y);
                    return new OpenLayers.Geometry.Point(latlon.x, latlon.y);
                });
                var ring = new OpenLayers.Geometry.LinearRing(ringPoints);
                return new OpenLayers.Geometry.Polygon([ring]);
            });
            var multiPolygon = new OpenLayers.Geometry.MultiPolygon(polygonList);
            var visionFeature = new OpenLayers.Feature.Vector(multiPolygon, null, visionStyle || style.yellow);
            if (marker) {
                visionSimulationLayer.addFeatures([visionFeature]);
                if (marker.vision_feature) marker.vision_feature.destroy();
                marker.vision_feature = visionFeature;
            }
            else {
                cursorLayer.addFeatures([visionFeature]);
            }
            
            if (marker) {
                marker.vision_data = {
                    area: vs.area,
                    lightArea: vs.lightArea
                }
                updatePopup(marker, true);
            }
        }
    }
    
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    var unitNames = {
        npc_dota_roshan_spawner: "Roshan",
        dota_item_rune_spawner_powerup: "Rune",
        dota_item_rune_spawner_bounty: "Bounty Rune",
        ent_dota_tree: "Tree",
        npc_dota_healer: "Shrine",
        ent_dota_fountain: "Fountain",
        npc_dota_fort: "Ancient",
        ent_dota_shop: "Shop",
        npc_dota_tower: "Tower",
        npc_dota_barracks: "Barracks",
        npc_dota_filler: "Building",
        trigger_multiple: "Neutral Camp Spawn Box",
        npc_dota_neutral_spawner: "Neutral Camp",
        observer: "Observer Ward",
        sentry: "Sentry Ward"
    };
        
    function getUnitName(unitType, unitSubType) {
        console.log(unitType, unitSubType);
        return (unitSubType ? capitalize(unitSubType.replace('tower', 'Tier ').replace('range', 'Ranged')) + ' ' : '') + unitNames[unitType];
    }

    var pullTypes = ['Normal', 'Fast', 'Slow'];
    var neutralTypes = ['Easy', 'Medium', 'Hard', 'Ancient'];
    function getPopupContent(statData, unitType, unitSubType, unitClass, addVisibleArea, pullType, neutralType) {
        console.log('getPopupContent', pullType, neutralType);
        var popupContentHTML = '<b>' + getUnitName(unitType, unitSubType) + '</b><br>';
        if (statData) {
            var stats = statData[unitClass];
            if (stats) {
                if (pullType != null) {
                    popupContentHTML += "<br>Pull Type: " + pullTypes[pullType];
                }
                if (neutralType != null) {
                    popupContentHTML += "<br>Difficulty: " + neutralTypes[neutralType];
                }
                if (stats.hasOwnProperty('damageMin') && stats.hasOwnProperty('damageMax')) {
                    popupContentHTML += "<br>Damage: " + stats.damageMin + "&ndash;" + stats.damageMax;
                }
                if (stats.hasOwnProperty('bat')) {
                    popupContentHTML += "<br>BAT: " + stats.bat;
                }
                if (stats.hasOwnProperty('attackRange')) {
                    popupContentHTML += "<br>Attack Range: " + stats.attackRange;
                }
                if (stats.hasOwnProperty('health')) {
                    popupContentHTML += "<br>Health: " + stats.health;
                }
                if (stats.hasOwnProperty('armor')) {
                    popupContentHTML += "<br>Armor: " + stats.armor;
                }
                if (stats.hasOwnProperty('dayVision') && stats.hasOwnProperty('nightVision')) {
                    popupContentHTML += "<br>Vision: " + stats.dayVision + "/" + stats.nightVision;
                }
            }
            if (!stats || stats.hasOwnProperty('dayVision') && stats.hasOwnProperty('nightVision')) {
                if (addVisibleArea) {
                    popupContentHTML += "<br>Visible Area: " + (vs.lightArea / vs.area * 100).toFixed() + '% ' + vs.lightArea + "/" + vs.area;
                    if (unitType != 'observer' && unitType != 'sentry') popupContentHTML += "<br><br>Click to turn off range overlays.";
                }
                else {
                    popupContentHTML += "<br><br>Click to view range overlays.";
                }
            }
        }
        
        if (unitType == 'observer' || unitType == 'sentry') popupContentHTML += "<br><br>Click icon to remove ward.";
        
        return popupContentHTML;
    }
    
    function updatePopup(marker, addVisibleArea) {
        console.log(marker.unitClass, map_data.stats);

        var popupContentHTML = getPopupContent(map_data.stats, marker.unitType, marker.unitSubType, marker.unitClass, addVisibleArea, marker.pullType, marker.neutralType);
        
        marker.feature.data.popupContentHTML = popupContentHTML;
        if (marker.feature.popup) {
            marker.feature.popup.setContentHTML(popupContentHTML);
        }
    }

    // Start vision simulation and start map initialization check in callback
    var t1 = Date.now();
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        console.log('vs loaded', Date.now() - t1);
        console.log('map.getSize()', map.getSize());
        initCheck();
    });
    
    // Check if map is ready to initialize, if not retry
    var initCheckCount = 0;
    var maxInitCheckCount = 40;
    function initCheck() {
        if (map.getSize()) {
            init();
        }
        else {
            initCheckCount++;
            console.log('map size null');
            if (initCheckCount < maxInitCheckCount) {
                map.updateSize();
                setTimeout(initCheck, 250);
            }
            else {
                rollbar.error("Max init check exceeded");
                alert("There was a problem loading the map.");
            }
        }
    }
    
    function init() {
        var data = QueryString.getParameterByName('data');
        if (data) {
            document.getElementById('dataControl').value = data;
        }
        VISION_SIMULATION = data != "687";
        //document.querySelector('label[for="visionSimulationControl"]').style.display = VISION_SIMULATION ? 'inline' : 'none';
        document.getElementById("visionSimulationControl").disabled = !VISION_SIMULATION;
        document.getElementById("alwaysSimulateControl").disabled = !VISION_SIMULATION;
        getJSON(map_data_path + getDataVersion() + '/mapdata2.json', onMapDataLoad);
    }
    
    function getVisionRadius() {
        return document.getElementById('vision-radius').value || ENTITIES.observer.radius;
    }
}

module.exports = App;
},{"./conversionFunctions":3,"./getLightUnion":4,"./mapConstants":5,"./styleConstants":6,"./util/debounce":7,"./util/getJSON":8,"./util/queryString":9,"./util/trim":10,"dota-vision-simulation":15,"dota-vision-simulation/src/worlddata.json":16,"rollbar-browser":1}],3:[function(require,module,exports){
var mapConstants = require('./mapConstants');

function lerp(minVal, maxVal, pos_r) {
    return pos_r * (maxVal - minVal) + minVal;
}

function reverseLerp(minVal, maxVal, pos) {
    return (pos - minVal) / (maxVal - minVal);
}

function latLonToWorld(x, y) {
    var x_r = lerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], x / mapConstants.map_w),
        y_r = lerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], (mapConstants.map_h - y) / mapConstants.map_h);

    return {
        x: x_r,
        y: y_r
    };
}

function worldToLatLon(x_r, y_r) {
    var x = reverseLerp(mapConstants.map_x_boundaries[0], mapConstants.map_x_boundaries[1], x_r) * mapConstants.map_w,
        y = mapConstants.map_h - reverseLerp(mapConstants.map_y_boundaries[0], mapConstants.map_y_boundaries[1], y_r) * mapConstants.map_h;

    return {
        x: x,
        y: y
    };
}

function getTileRadius(r) {
    return parseInt(Math.floor(r / 64));
}

function getScaledRadius(r) {
    return r / (mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) * mapConstants.map_w
}

function calculateDistance(order, units, measure) {
    if (order == 1) {
        if (units == "km") {
            return measure * mapConstants.scale * 1000;
        } else {
            return measure * mapConstants.scale;
        }
    } else {
        return measure * mapConstants.scale;
    }
}

module.exports = {
    lerp: lerp,
    reverseLerp: reverseLerp,
    latLonToWorld: latLonToWorld,
    worldToLatLon: worldToLatLon,
    getTileRadius: getTileRadius,
    getScaledRadius: getScaledRadius,
    calculateDistance: calculateDistance
}
},{"./mapConstants":5}],4:[function(require,module,exports){
var VisionSimulation = require("dota-vision-simulation");
var key2pt = VisionSimulation.prototype.key2pt;
var xy2key = VisionSimulation.prototype.xy2key;
var xy2pt = VisionSimulation.prototype.xy2pt;

function processNeighbors(grid, lights, components, key, index) {
    var pt = key2pt(key);
    var dirs = [[1, 0], [0, -1], [-1, 0], [0, 1]];
    for (var i = 0; i < dirs.length; i++) {
        var aX = pt.x+dirs[i][0];
        var aY = pt.y+dirs[i][1];
        if (!grid[aX] || !grid[aX][aY]) continue;
        var keyAdj = grid[aX][aY].key
        if (components[keyAdj] || !lights[keyAdj]) continue;
        components[keyAdj] = index;
        processNeighbors(grid, lights, components, keyAdj, index);
    }
}

function getLightUnion(grid, lights) {
    var components = {};
    var index = 1;
    for (var key in lights) {
        if (!components[key]) {
            components[key] = index;
            processNeighbors(grid, lights, components, key, index);
            index++;
        }
    }
    
    var outlines = [];
    for (var i = 1; i < index; i++) {
        outlines.push(getOutline(grid, components, i))
    }
    return outlines;
}

function isSideFree(grid, components, pt, dir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return true;
    var keyAdj = grid[aX][aY].key
    return !components[keyAdj];
}

function notSurrounded(grid, components, pt) {
    for (var i = 0; i < 8; i+=2) {
        var aX = pt.x+Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
        var aY = pt.y+Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
        if (!grid[aX] || !grid[aX][aY]) return i;
        var keyAdj = grid[aX][aY].key
        if (!components[keyAdj]) return i;
    }
    return null;
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

function getOutline(grid, components, index) {
    var outlinePoints = [];
    var startKey;
    var dir = null;
    for (var key in components) {
        var pt = key2pt(key);
        dir = notSurrounded(grid, components, pt);
        if (components[key] == index && dir !== null) {
            startKey = key;
            break;
        }
    }
    var next = processNext(grid, components, startKey, dir);
    while (startKey !== next.key || dir !== next.dir) {
        outlinePoints.push(next.point);
        next = processNext(grid, components, next.key, next.dir);
    }
    outlinePoints.push(next.point);
    return outlinePoints;
}

function checkAdj(grid, components, pt, key, dir, i, adjDir) {
    var aX = pt.x+dir[0];
    var aY = pt.y+dir[1];
    if (!grid[aX] || !grid[aX][aY]) return;
    var ptAdj = grid[pt.x+dir[0]][pt.y+dir[1]];
    if (components[ptAdj.key] == components[key] && isSideFree(grid, components, ptAdj, adjDir)) {
        return {
            key: ptAdj.key,
            dir: i
        }
    }
}

function processNext(grid, components, key, i) {
    var pt = key2pt(key);
    var next;
    
    var x = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * i));
    var y = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * i));
    
    var nI = mod(i+2, 8);
    var nX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * nI));
    var nY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * nI));
    
    var bI = mod(i-1, 8);
    var bX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * bI));
    var bY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * bI));

    if (isSideFree(grid, components, pt, [nX, nY])) {
        return {
            key: key,
            dir: mod(i+2, 8),
            point: xy2pt(pt.x+bX/2, pt.y+bY/2)
        }
    }
    if (!next) next = checkAdj(grid, components, pt, key, [nX, nY], i, [x, y]);
    if (!next) {
        var aI = mod(i + 1, 8);
        var aX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * aI));
        var aY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * aI));
        var pI = mod(i - 2, 8);
        var pX = Math.round(Math.cos(2 * Math.PI - Math.PI/4 * pI));
        var pY = Math.round(Math.sin(2 * Math.PI - Math.PI/4 * pI));
        next = checkAdj(grid, components, pt, key, [aX, aY], pI, [pX, pY]);
    }
    if (next) {
        next.point = xy2pt(pt.x+bX/2, pt.y+bY/2);
        return next;
    }
    else {
        console.log('error');
    }
}

module.exports = getLightUnion;
},{"dota-vision-simulation":15}],5:[function(require,module,exports){
var mapConstants = {
    map_w: 16384,
    map_h: 16384,
    map_x_boundaries: [-8475.58617377, 9327.49124559],
    map_y_boundaries: [9028.52473332, -8836.61406266]
}
mapConstants.scale = Math.abs(mapConstants.map_x_boundaries[1] - mapConstants.map_x_boundaries[0]) / mapConstants.map_w;

module.exports = mapConstants;
},{}],6:[function(require,module,exports){
module.exports = {
    lightblue: {
        strokeColor: "#007FFF",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#007FFF",
        fillOpacity: .2
    },
    day: {
        strokeColor: "#ee9900",
        strokeOpacity: 0.5,
        strokeWidth: 2,
        fillColor: "#ee9900",
        fillOpacity: 0.1
    },
    night: {
        strokeColor: "#0000FF",
        strokeOpacity: 0.5,
        strokeWidth: 2,
        fillColor: "#007FFF",
        fillOpacity: 0.1
    },
    true_sight: {
        strokeColor: "#007FFF",
        strokeOpacity: 0.5,
        strokeWidth: 2,
        fillColor: "#007FFF",
        fillOpacity: 0.1
    },
    red: {
        strokeColor: "#FF0000",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#FF0000",
        fillOpacity: .2
    },
    attack_range: {
        strokeColor: "#FF0000",
        strokeOpacity: 0.5,
        strokeWidth: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1
    },
    green: {
        strokeColor: "#00FF00",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#00FF00",
        fillOpacity: .2
    },
    yellow: {
        strokeColor: "#FFFF00",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#FFFF00",
        fillOpacity: .2
    }
};
},{}],7:[function(require,module,exports){
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

module.exports = debounce;
},{}],8:[function(require,module,exports){
function getJSON(path, callback) {
    console.log('getJSON', path);
    var request = new XMLHttpRequest();

    request.open('GET', path, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            callback(data);
        } else {
            alert('Error loading page.');
        }
    };
    request.onerror = function() {
        alert('Error loading page.');
    };
    request.send();
    return request;
}

module.exports = getJSON;
},{}],9:[function(require,module,exports){
var trim = require('./trim');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setQueryString(key, value) {
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, value));
}

function addQueryStringValue(key, value) {
    console.log('addQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, qs));
}

function removeQueryStringValue(key, value) {
    console.log('removeQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
    if (history && history.replaceState) history.replaceState(null, "", updateQueryString(key, qs != '' ? qs : null));
}

function updateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
        hash;

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    } else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        } else {
            return url;
        }
    }
}

module.exports = {
    getParameterByName: getParameterByName,
    setQueryString: setQueryString,
    addQueryStringValue: addQueryStringValue,
    removeQueryStringValue: removeQueryStringValue,
    updateQueryString: updateQueryString
}
},{"./trim":10}],10:[function(require,module,exports){
function escapeRegex(string) {
    return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
}

var trim = function trim(str, characters, flags) {
    flags = flags || "g";
    if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
        throw new TypeError("argument must be string");
    }

    if (!/^[gi]*$/.test(flags)) {
        throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
    }

    characters = escapeRegex(characters);

    return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
};

module.exports = trim;
},{}],11:[function(require,module,exports){
var PNG = require('png-js');

function ImageHandler(imagePath) {
    this.imagePath = imagePath;
    self.canvas = null;
    self.png = null;
}
ImageHandler.prototype.load = function (callback) {
    var self = this;
    var t1 = Date.now();
    self.canvas = document.createElement("canvas");
    PNG.load(this.imagePath, self.canvas, function(png) {
        self.png = png;
        self.ctx = self.canvas.getContext("2d");
        callback();
    });
}
ImageHandler.prototype.scan = function (offset, width, height, pixelHandler, grid) {
    var imgData = this.ctx.getImageData(offset, 0, width, height);
    var data = imgData.data;

    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i+1];
        var b = data[i+2];
        var alpha = data[i+3];
        var x = Math.floor((i/4) % width);
        var y = Math.floor((i/4) / height);
        pixelHandler(x, y, [r, g, b], grid);
    }
}

module.exports = ImageHandler;
},{"png-js":12}],12:[function(require,module,exports){
// Generated by CoffeeScript 1.4.0

/*
# MIT LICENSE
# Copyright (c) 2011 Devon Govett
# 
# Permission is hereby granted, free of charge, to any person obtaining a copy of this 
# software and associated documentation files (the "Software"), to deal in the Software 
# without restriction, including without limitation the rights to use, copy, modify, merge, 
# publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
# to whom the Software is furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in all copies or 
# substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
# BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
# DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var FlateStream = require('./zlib');

  var PNG;

  PNG = (function() {
    PNG.load = function(url, canvas, callback) {
      var xhr,
        _this = this;
      if (typeof canvas === 'function') {
        callback = canvas;
      }
      xhr = new XMLHttpRequest;
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function() {
        var data, png;
        data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
        png = new PNG(data);
        if (typeof (canvas != null ? canvas.getContext : void 0) === 'function') {
          png.render(canvas);
        }
        return typeof callback === "function" ? callback(png) : void 0;
      };
      return xhr.send(null);
    };

    function PNG(data) {
      var chunkSize, colors, delayDen, delayNum, frame, i, index, key, section, short, text, _i, _j, _ref;
      this.data = data;
      this.pos = 8;
      this.palette = [];
      this.imgData = [];
      this.transparency = {};
      this.text = {};
      frame = null;
      while (true) {
        chunkSize = this.readUInt32();
        section = ((function() {
          var _i, _results;
          _results = [];
          for (i = _i = 0; _i < 4; i = ++_i) {
            _results.push(String.fromCharCode(this.data[this.pos++]));
          }
          return _results;
        }).call(this)).join('');
        switch (section) {
          case 'IHDR':
            this.width = this.readUInt32();
            this.height = this.readUInt32();
            this.bits = this.data[this.pos++];
            this.colorType = this.data[this.pos++];
            this.compressionMethod = this.data[this.pos++];
            this.filterMethod = this.data[this.pos++];
            this.interlaceMethod = this.data[this.pos++];
            break;
          case 'PLTE':
            this.palette = this.read(chunkSize);
            break;
          case 'IDAT':
            if (section === 'fdAT') {
              this.pos += 4;
              chunkSize -= 4;
            }
            data = (frame != null ? frame.data : void 0) || this.imgData;
            for (i = _i = 0; 0 <= chunkSize ? _i < chunkSize : _i > chunkSize; i = 0 <= chunkSize ? ++_i : --_i) {
              data.push(this.data[this.pos++]);
            }
            break;
          case 'tRNS':
            this.transparency = {};
            switch (this.colorType) {
              case 3:
                this.transparency.indexed = this.read(chunkSize);
                short = 255 - this.transparency.indexed.length;
                if (short > 0) {
                  for (i = _j = 0; 0 <= short ? _j < short : _j > short; i = 0 <= short ? ++_j : --_j) {
                    this.transparency.indexed.push(255);
                  }
                }
                break;
              case 0:
                this.transparency.grayscale = this.read(chunkSize)[0];
                break;
              case 2:
                this.transparency.rgb = this.read(chunkSize);
            }
            break;
          case 'tEXt':
            text = this.read(chunkSize);
            index = text.indexOf(0);
            key = String.fromCharCode.apply(String, text.slice(0, index));
            this.text[key] = String.fromCharCode.apply(String, text.slice(index + 1));
            break;
          case 'IEND':
            if (frame) {
              this.animation.frames.push(frame);
            }
            this.colors = (function() {
              switch (this.colorType) {
                case 0:
                case 3:
                case 4:
                  return 1;
                case 2:
                case 6:
                  return 3;
              }
            }).call(this);
            this.hasAlphaChannel = (_ref = this.colorType) === 4 || _ref === 6;
            colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
            this.pixelBitlength = this.bits * colors;
            this.colorSpace = (function() {
              switch (this.colors) {
                case 1:
                  return 'DeviceGray';
                case 3:
                  return 'DeviceRGB';
              }
            }).call(this);
            this.imgData = new Uint8Array(this.imgData);
            return;
          default:
            this.pos += chunkSize;
        }
        this.pos += 4;
        if (this.pos > this.data.length) {
          throw new Error("Incomplete or corrupt PNG file");
        }
      }
      return;
    }

    PNG.prototype.read = function(bytes) {
      var i, _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= bytes ? _i < bytes : _i > bytes; i = 0 <= bytes ? ++_i : --_i) {
        _results.push(this.data[this.pos++]);
      }
      return _results;
    };

    PNG.prototype.readUInt32 = function() {
      var b1, b2, b3, b4;
      b1 = this.data[this.pos++] << 24;
      b2 = this.data[this.pos++] << 16;
      b3 = this.data[this.pos++] << 8;
      b4 = this.data[this.pos++];
      return b1 | b2 | b3 | b4;
    };

    PNG.prototype.readUInt16 = function() {
      var b1, b2;
      b1 = this.data[this.pos++] << 8;
      b2 = this.data[this.pos++];
      return b1 | b2;
    };

    PNG.prototype.decodePixels = function(data) {
      var byte, c, col, i, left, length, p, pa, paeth, pb, pc, pixelBytes, pixels, pos, row, scanlineLength, upper, upperLeft, _i, _j, _k, _l, _m;
      if (data == null) {
        data = this.imgData;
      }
      if (data.length === 0) {
        return new Uint8Array(0);
      }
      data = new FlateStream(data);
      data = data.getBytes();
      pixelBytes = this.pixelBitlength / 8;
      scanlineLength = pixelBytes * this.width;
      pixels = new Uint8Array(scanlineLength * this.height);
      length = data.length;
      row = 0;
      pos = 0;
      c = 0;
      while (pos < length) {
        switch (data[pos++]) {
          case 0:
            for (i = _i = 0; _i < scanlineLength; i = _i += 1) {
              pixels[c++] = data[pos++];
            }
            break;
          case 1:
            for (i = _j = 0; _j < scanlineLength; i = _j += 1) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;
          case 2:
            for (i = _k = 0; _k < scanlineLength; i = _k += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (upper + byte) % 256;
            }
            break;
          case 3:
            for (i = _l = 0; _l < scanlineLength; i = _l += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper = row && pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;
          case 4:
            for (i = _m = 0; _m < scanlineLength; i = _m += 1) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper = pixels[(row - 1) * scanlineLength + col * pixelBytes + (i % pixelBytes)];
                upperLeft = col && pixels[(row - 1) * scanlineLength + (col - 1) * pixelBytes + (i % pixelBytes)];
              }
              p = left + upper - upperLeft;
              pa = Math.abs(p - left);
              pb = Math.abs(p - upper);
              pc = Math.abs(p - upperLeft);
              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }
              pixels[c++] = (byte + paeth) % 256;
            }
            break;
          default:
            throw new Error("Invalid filter algorithm: " + data[pos - 1]);
        }
        row++;
      }
      return pixels;
    };

    PNG.prototype.decodePalette = function() {
      var c, i, length, palette, pos, ret, transparency, _i, _ref, _ref1;
      palette = this.palette;
      transparency = this.transparency.indexed || [];
      ret = new Uint8Array((transparency.length || 0) + palette.length);
      pos = 0;
      length = palette.length;
      c = 0;
      for (i = _i = 0, _ref = palette.length; _i < _ref; i = _i += 3) {
        ret[pos++] = palette[i];
        ret[pos++] = palette[i + 1];
        ret[pos++] = palette[i + 2];
        ret[pos++] = (_ref1 = transparency[c++]) != null ? _ref1 : 255;
      }
      return ret;
    };

    PNG.prototype.copyToImageData = function(imageData, pixels) {
      var alpha, colors, data, i, input, j, k, length, palette, v, _ref;
      colors = this.colors;
      palette = null;
      alpha = this.hasAlphaChannel;
      if (this.palette.length) {
        palette = (_ref = this._decodedPalette) != null ? _ref : this._decodedPalette = this.decodePalette();
        colors = 4;
        alpha = true;
      }
      data = imageData.data || imageData;
      length = data.length;
      input = palette || pixels;
      i = j = 0;
      if (colors === 1) {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          v = input[k++];
          data[i++] = v;
          data[i++] = v;
          data[i++] = v;
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      } else {
        while (i < length) {
          k = palette ? pixels[i / 4] * 4 : j;
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = input[k++];
          data[i++] = alpha ? input[k++] : 255;
          j = k;
        }
      }
    };

    PNG.prototype.decode = function() {
      var ret;
      ret = new Uint8Array(this.width * this.height * 4);
      this.copyToImageData(ret, this.decodePixels());
      return ret;
    };

    PNG.prototype.render = function(canvas) {
      var ctx, data;
      canvas.width = this.width;
      canvas.height = this.height;
      ctx = canvas.getContext("2d");
      data = ctx.createImageData(this.width, this.height);
      this.copyToImageData(data, this.decodePixels());
      return ctx.putImageData(data, 0, 0);
    };

    return PNG;

  })();

  module.exports = PNG;
},{"./zlib":13}],13:[function(require,module,exports){
/*
 * Extracted from pdf.js
 * https://github.com/andreasgal/pdf.js
 *
 * Copyright (c) 2011 Mozilla Foundation
 *
 * Contributors: Andreas Gal <gal@mozilla.com>
 *               Chris G Jones <cjones@mozilla.com>
 *               Shaon Barman <shaon.barman@gmail.com>
 *               Vivien Nicolas <21@vingtetun.org>
 *               Justin D'Arcangelo <justindarc@gmail.com>
 *               Yury Delendik
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

var DecodeStream = (function() {
  function constructor() {
    this.pos = 0;
    this.bufferLength = 0;
    this.eof = false;
    this.buffer = null;
  }

  constructor.prototype = {
    ensureBuffer: function decodestream_ensureBuffer(requested) {
      var buffer = this.buffer;
      var current = buffer ? buffer.byteLength : 0;
      if (requested < current)
        return buffer;
      var size = 512;
      while (size < requested)
        size <<= 1;
      var buffer2 = new Uint8Array(size);
      for (var i = 0; i < current; ++i)
        buffer2[i] = buffer[i];
      return this.buffer = buffer2;
    },
    getByte: function decodestream_getByte() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return this.buffer[this.pos++];
    },
    getBytes: function decodestream_getBytes(length) {
      var pos = this.pos;

      if (length) {
        this.ensureBuffer(pos + length);
        var end = pos + length;

        while (!this.eof && this.bufferLength < end)
          this.readBlock();

        var bufEnd = this.bufferLength;
        if (end > bufEnd)
          end = bufEnd;
      } else {
        while (!this.eof)
          this.readBlock();

        var end = this.bufferLength;
      }

      this.pos = end;
      return this.buffer.subarray(pos, end);
    },
    lookChar: function decodestream_lookChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos]);
    },
    getChar: function decodestream_getChar() {
      var pos = this.pos;
      while (this.bufferLength <= pos) {
        if (this.eof)
          return null;
        this.readBlock();
      }
      return String.fromCharCode(this.buffer[this.pos++]);
    },
    makeSubStream: function decodestream_makeSubstream(start, length, dict) {
      var end = start + length;
      while (this.bufferLength <= end && !this.eof)
        this.readBlock();
      return new Stream(this.buffer, start, length, dict);
    },
    skip: function decodestream_skip(n) {
      if (!n)
        n = 1;
      this.pos += n;
    },
    reset: function decodestream_reset() {
      this.pos = 0;
    }
  };

  return constructor;
})();

var FlateStream = (function() {
  var codeLenCodeMap = new Uint32Array([
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15
  ]);

  var lengthDecode = new Uint32Array([
    0x00003, 0x00004, 0x00005, 0x00006, 0x00007, 0x00008, 0x00009, 0x0000a,
    0x1000b, 0x1000d, 0x1000f, 0x10011, 0x20013, 0x20017, 0x2001b, 0x2001f,
    0x30023, 0x3002b, 0x30033, 0x3003b, 0x40043, 0x40053, 0x40063, 0x40073,
    0x50083, 0x500a3, 0x500c3, 0x500e3, 0x00102, 0x00102, 0x00102
  ]);

  var distDecode = new Uint32Array([
    0x00001, 0x00002, 0x00003, 0x00004, 0x10005, 0x10007, 0x20009, 0x2000d,
    0x30011, 0x30019, 0x40021, 0x40031, 0x50041, 0x50061, 0x60081, 0x600c1,
    0x70101, 0x70181, 0x80201, 0x80301, 0x90401, 0x90601, 0xa0801, 0xa0c01,
    0xb1001, 0xb1801, 0xc2001, 0xc3001, 0xd4001, 0xd6001
  ]);

  var fixedLitCodeTab = [new Uint32Array([
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c0,
    0x70108, 0x80060, 0x80020, 0x900a0, 0x80000, 0x80080, 0x80040, 0x900e0,
    0x70104, 0x80058, 0x80018, 0x90090, 0x70114, 0x80078, 0x80038, 0x900d0,
    0x7010c, 0x80068, 0x80028, 0x900b0, 0x80008, 0x80088, 0x80048, 0x900f0,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c8,
    0x7010a, 0x80064, 0x80024, 0x900a8, 0x80004, 0x80084, 0x80044, 0x900e8,
    0x70106, 0x8005c, 0x8001c, 0x90098, 0x70116, 0x8007c, 0x8003c, 0x900d8,
    0x7010e, 0x8006c, 0x8002c, 0x900b8, 0x8000c, 0x8008c, 0x8004c, 0x900f8,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c4,
    0x70109, 0x80062, 0x80022, 0x900a4, 0x80002, 0x80082, 0x80042, 0x900e4,
    0x70105, 0x8005a, 0x8001a, 0x90094, 0x70115, 0x8007a, 0x8003a, 0x900d4,
    0x7010d, 0x8006a, 0x8002a, 0x900b4, 0x8000a, 0x8008a, 0x8004a, 0x900f4,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cc,
    0x7010b, 0x80066, 0x80026, 0x900ac, 0x80006, 0x80086, 0x80046, 0x900ec,
    0x70107, 0x8005e, 0x8001e, 0x9009c, 0x70117, 0x8007e, 0x8003e, 0x900dc,
    0x7010f, 0x8006e, 0x8002e, 0x900bc, 0x8000e, 0x8008e, 0x8004e, 0x900fc,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c2,
    0x70108, 0x80061, 0x80021, 0x900a2, 0x80001, 0x80081, 0x80041, 0x900e2,
    0x70104, 0x80059, 0x80019, 0x90092, 0x70114, 0x80079, 0x80039, 0x900d2,
    0x7010c, 0x80069, 0x80029, 0x900b2, 0x80009, 0x80089, 0x80049, 0x900f2,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900ca,
    0x7010a, 0x80065, 0x80025, 0x900aa, 0x80005, 0x80085, 0x80045, 0x900ea,
    0x70106, 0x8005d, 0x8001d, 0x9009a, 0x70116, 0x8007d, 0x8003d, 0x900da,
    0x7010e, 0x8006d, 0x8002d, 0x900ba, 0x8000d, 0x8008d, 0x8004d, 0x900fa,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c6,
    0x70109, 0x80063, 0x80023, 0x900a6, 0x80003, 0x80083, 0x80043, 0x900e6,
    0x70105, 0x8005b, 0x8001b, 0x90096, 0x70115, 0x8007b, 0x8003b, 0x900d6,
    0x7010d, 0x8006b, 0x8002b, 0x900b6, 0x8000b, 0x8008b, 0x8004b, 0x900f6,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900ce,
    0x7010b, 0x80067, 0x80027, 0x900ae, 0x80007, 0x80087, 0x80047, 0x900ee,
    0x70107, 0x8005f, 0x8001f, 0x9009e, 0x70117, 0x8007f, 0x8003f, 0x900de,
    0x7010f, 0x8006f, 0x8002f, 0x900be, 0x8000f, 0x8008f, 0x8004f, 0x900fe,
    0x70100, 0x80050, 0x80010, 0x80118, 0x70110, 0x80070, 0x80030, 0x900c1,
    0x70108, 0x80060, 0x80020, 0x900a1, 0x80000, 0x80080, 0x80040, 0x900e1,
    0x70104, 0x80058, 0x80018, 0x90091, 0x70114, 0x80078, 0x80038, 0x900d1,
    0x7010c, 0x80068, 0x80028, 0x900b1, 0x80008, 0x80088, 0x80048, 0x900f1,
    0x70102, 0x80054, 0x80014, 0x8011c, 0x70112, 0x80074, 0x80034, 0x900c9,
    0x7010a, 0x80064, 0x80024, 0x900a9, 0x80004, 0x80084, 0x80044, 0x900e9,
    0x70106, 0x8005c, 0x8001c, 0x90099, 0x70116, 0x8007c, 0x8003c, 0x900d9,
    0x7010e, 0x8006c, 0x8002c, 0x900b9, 0x8000c, 0x8008c, 0x8004c, 0x900f9,
    0x70101, 0x80052, 0x80012, 0x8011a, 0x70111, 0x80072, 0x80032, 0x900c5,
    0x70109, 0x80062, 0x80022, 0x900a5, 0x80002, 0x80082, 0x80042, 0x900e5,
    0x70105, 0x8005a, 0x8001a, 0x90095, 0x70115, 0x8007a, 0x8003a, 0x900d5,
    0x7010d, 0x8006a, 0x8002a, 0x900b5, 0x8000a, 0x8008a, 0x8004a, 0x900f5,
    0x70103, 0x80056, 0x80016, 0x8011e, 0x70113, 0x80076, 0x80036, 0x900cd,
    0x7010b, 0x80066, 0x80026, 0x900ad, 0x80006, 0x80086, 0x80046, 0x900ed,
    0x70107, 0x8005e, 0x8001e, 0x9009d, 0x70117, 0x8007e, 0x8003e, 0x900dd,
    0x7010f, 0x8006e, 0x8002e, 0x900bd, 0x8000e, 0x8008e, 0x8004e, 0x900fd,
    0x70100, 0x80051, 0x80011, 0x80119, 0x70110, 0x80071, 0x80031, 0x900c3,
    0x70108, 0x80061, 0x80021, 0x900a3, 0x80001, 0x80081, 0x80041, 0x900e3,
    0x70104, 0x80059, 0x80019, 0x90093, 0x70114, 0x80079, 0x80039, 0x900d3,
    0x7010c, 0x80069, 0x80029, 0x900b3, 0x80009, 0x80089, 0x80049, 0x900f3,
    0x70102, 0x80055, 0x80015, 0x8011d, 0x70112, 0x80075, 0x80035, 0x900cb,
    0x7010a, 0x80065, 0x80025, 0x900ab, 0x80005, 0x80085, 0x80045, 0x900eb,
    0x70106, 0x8005d, 0x8001d, 0x9009b, 0x70116, 0x8007d, 0x8003d, 0x900db,
    0x7010e, 0x8006d, 0x8002d, 0x900bb, 0x8000d, 0x8008d, 0x8004d, 0x900fb,
    0x70101, 0x80053, 0x80013, 0x8011b, 0x70111, 0x80073, 0x80033, 0x900c7,
    0x70109, 0x80063, 0x80023, 0x900a7, 0x80003, 0x80083, 0x80043, 0x900e7,
    0x70105, 0x8005b, 0x8001b, 0x90097, 0x70115, 0x8007b, 0x8003b, 0x900d7,
    0x7010d, 0x8006b, 0x8002b, 0x900b7, 0x8000b, 0x8008b, 0x8004b, 0x900f7,
    0x70103, 0x80057, 0x80017, 0x8011f, 0x70113, 0x80077, 0x80037, 0x900cf,
    0x7010b, 0x80067, 0x80027, 0x900af, 0x80007, 0x80087, 0x80047, 0x900ef,
    0x70107, 0x8005f, 0x8001f, 0x9009f, 0x70117, 0x8007f, 0x8003f, 0x900df,
    0x7010f, 0x8006f, 0x8002f, 0x900bf, 0x8000f, 0x8008f, 0x8004f, 0x900ff
  ]), 9];

  var fixedDistCodeTab = [new Uint32Array([
    0x50000, 0x50010, 0x50008, 0x50018, 0x50004, 0x50014, 0x5000c, 0x5001c,
    0x50002, 0x50012, 0x5000a, 0x5001a, 0x50006, 0x50016, 0x5000e, 0x00000,
    0x50001, 0x50011, 0x50009, 0x50019, 0x50005, 0x50015, 0x5000d, 0x5001d,
    0x50003, 0x50013, 0x5000b, 0x5001b, 0x50007, 0x50017, 0x5000f, 0x00000
  ]), 5];
  
  function error(e) {
      throw new Error(e)
  }

  function constructor(bytes) {
    //var bytes = stream.getBytes();
    var bytesPos = 0;

    var cmf = bytes[bytesPos++];
    var flg = bytes[bytesPos++];
    if (cmf == -1 || flg == -1)
      error('Invalid header in flate stream');
    if ((cmf & 0x0f) != 0x08)
      error('Unknown compression method in flate stream');
    if ((((cmf << 8) + flg) % 31) != 0)
      error('Bad FCHECK in flate stream');
    if (flg & 0x20)
      error('FDICT bit set in flate stream');

    this.bytes = bytes;
    this.bytesPos = bytesPos;

    this.codeSize = 0;
    this.codeBuf = 0;

    DecodeStream.call(this);
  }

  constructor.prototype = Object.create(DecodeStream.prototype);

  constructor.prototype.getBits = function(bits) {
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    var b;
    while (codeSize < bits) {
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= b << codeSize;
      codeSize += 8;
    }
    b = codeBuf & ((1 << bits) - 1);
    this.codeBuf = codeBuf >> bits;
    this.codeSize = codeSize -= bits;
    this.bytesPos = bytesPos;
    return b;
  };

  constructor.prototype.getCode = function(table) {
    var codes = table[0];
    var maxLen = table[1];
    var codeSize = this.codeSize;
    var codeBuf = this.codeBuf;
    var bytes = this.bytes;
    var bytesPos = this.bytesPos;

    while (codeSize < maxLen) {
      var b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad encoding in flate stream');
      codeBuf |= (b << codeSize);
      codeSize += 8;
    }
    var code = codes[codeBuf & ((1 << maxLen) - 1)];
    var codeLen = code >> 16;
    var codeVal = code & 0xffff;
    if (codeSize == 0 || codeSize < codeLen || codeLen == 0)
      error('Bad encoding in flate stream');
    this.codeBuf = (codeBuf >> codeLen);
    this.codeSize = (codeSize - codeLen);
    this.bytesPos = bytesPos;
    return codeVal;
  };

  constructor.prototype.generateHuffmanTable = function(lengths) {
    var n = lengths.length;

    // find max code length
    var maxLen = 0;
    for (var i = 0; i < n; ++i) {
      if (lengths[i] > maxLen)
        maxLen = lengths[i];
    }

    // build the table
    var size = 1 << maxLen;
    var codes = new Uint32Array(size);
    for (var len = 1, code = 0, skip = 2;
         len <= maxLen;
         ++len, code <<= 1, skip <<= 1) {
      for (var val = 0; val < n; ++val) {
        if (lengths[val] == len) {
          // bit-reverse the code
          var code2 = 0;
          var t = code;
          for (var i = 0; i < len; ++i) {
            code2 = (code2 << 1) | (t & 1);
            t >>= 1;
          }

          // fill the table entries
          for (var i = code2; i < size; i += skip)
            codes[i] = (len << 16) | val;

          ++code;
        }
      }
    }

    return [codes, maxLen];
  };

  constructor.prototype.readBlock = function() {
    function repeat(stream, array, len, offset, what) {
      var repeat = stream.getBits(len) + offset;
      while (repeat-- > 0)
        array[i++] = what;
    }

    // read block header
    var hdr = this.getBits(3);
    if (hdr & 1)
      this.eof = true;
    hdr >>= 1;

    if (hdr == 0) { // uncompressed block
      var bytes = this.bytes;
      var bytesPos = this.bytesPos;
      var b;

      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var blockLen = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      blockLen |= (b << 8);
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      var check = b;
      if (typeof (b = bytes[bytesPos++]) == 'undefined')
        error('Bad block header in flate stream');
      check |= (b << 8);
      if (check != (~blockLen & 0xffff))
        error('Bad uncompressed block length in flate stream');

      this.codeBuf = 0;
      this.codeSize = 0;

      var bufferLength = this.bufferLength;
      var buffer = this.ensureBuffer(bufferLength + blockLen);
      var end = bufferLength + blockLen;
      this.bufferLength = end;
      for (var n = bufferLength; n < end; ++n) {
        if (typeof (b = bytes[bytesPos++]) == 'undefined') {
          this.eof = true;
          break;
        }
        buffer[n] = b;
      }
      this.bytesPos = bytesPos;
      return;
    }

    var litCodeTable;
    var distCodeTable;
    if (hdr == 1) { // compressed block, fixed codes
      litCodeTable = fixedLitCodeTab;
      distCodeTable = fixedDistCodeTab;
    } else if (hdr == 2) { // compressed block, dynamic codes
      var numLitCodes = this.getBits(5) + 257;
      var numDistCodes = this.getBits(5) + 1;
      var numCodeLenCodes = this.getBits(4) + 4;

      // build the code lengths code table
      var codeLenCodeLengths = Array(codeLenCodeMap.length);
      var i = 0;
      while (i < numCodeLenCodes)
        codeLenCodeLengths[codeLenCodeMap[i++]] = this.getBits(3);
      var codeLenCodeTab = this.generateHuffmanTable(codeLenCodeLengths);

      // build the literal and distance code tables
      var len = 0;
      var i = 0;
      var codes = numLitCodes + numDistCodes;
      var codeLengths = new Array(codes);
      while (i < codes) {
        var code = this.getCode(codeLenCodeTab);
        if (code == 16) {
          repeat(this, codeLengths, 2, 3, len);
        } else if (code == 17) {
          repeat(this, codeLengths, 3, 3, len = 0);
        } else if (code == 18) {
          repeat(this, codeLengths, 7, 11, len = 0);
        } else {
          codeLengths[i++] = len = code;
        }
      }

      litCodeTable =
        this.generateHuffmanTable(codeLengths.slice(0, numLitCodes));
      distCodeTable =
        this.generateHuffmanTable(codeLengths.slice(numLitCodes, codes));
    } else {
      error('Unknown block type in flate stream');
    }

    var buffer = this.buffer;
    var limit = buffer ? buffer.length : 0;
    var pos = this.bufferLength;
    while (true) {
      var code1 = this.getCode(litCodeTable);
      if (code1 < 256) {
        if (pos + 1 >= limit) {
          buffer = this.ensureBuffer(pos + 1);
          limit = buffer.length;
        }
        buffer[pos++] = code1;
        continue;
      }
      if (code1 == 256) {
        this.bufferLength = pos;
        return;
      }
      code1 -= 257;
      code1 = lengthDecode[code1];
      var code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var len = (code1 & 0xffff) + code2;
      code1 = this.getCode(distCodeTable);
      code1 = distDecode[code1];
      code2 = code1 >> 16;
      if (code2 > 0)
        code2 = this.getBits(code2);
      var dist = (code1 & 0xffff) + code2;
      if (pos + len >= limit) {
        buffer = this.ensureBuffer(pos + len);
        limit = buffer.length;
      }
      for (var k = 0; k < len; ++k, ++pos)
        buffer[pos] = buffer[pos - dist];
    }
  };

  return constructor;
})();

module.exports = FlateStream;
},{}],14:[function(require,module,exports){
/*
	This is rot.js, the ROguelike Toolkit in JavaScript.
	Version 0.6~dev, generated on Tue Mar 17 16:16:31 CET 2015.
*/
/**
 * @namespace Top-level ROT namespace
 */
var ROT = {
	/** Directional constants. Ordering is important! */
	DIRS: {
		"4": [
			[ 0, -1],
			[ 1,  0],
			[ 0,  1],
			[-1,  0]
		],
		"8": [
			[ 0, -1],
			[ 1, -1],
			[ 1,  0],
			[ 1,  1],
			[ 0,  1],
			[-1,  1],
			[-1,  0],
			[-1, -1]
		],
		"6": [
			[-1, -1],
			[ 1, -1],
			[ 2,  0],
			[ 1,  1],
			[-1,  1],
			[-2,  0]
		]
	}
};
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
Number.prototype.mod = function(n) {
	return ((this%n)+n)%n;
}
if (!Object.create) {  
	/**
	 * ES5 Object.create
	 */
	Object.create = function(o) {  
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
}
if (typeof window != "undefined") {
	window.requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function(cb) { return setTimeout(cb, 1000/60); };

	window.cancelAnimationFrame =
		window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| function(id) { return clearTimeout(id); };
}
/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = function(lightPassesCallback, options) {
	this._lightPasses = lightPassesCallback;
	this._options = {
		topology: 8
	}
	for (var p in options) { this._options[p] = options[p]; }
};

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.prototype.compute = function(x, y, R, callback) {}

/**
 * Return all neighbors in a concentric ring
 * @param {int} cx center-x
 * @param {int} cy center-y
 * @param {int} r range
 */
ROT.FOV.prototype._getCircle = function(cx, cy, r) {
	var result = [];
	var dirs, countFactor, startOffset;

	switch (this._options.topology) {
		case 4:
			countFactor = 1;
			startOffset = [0, 1];
			dirs = [
				ROT.DIRS[8][7],
				ROT.DIRS[8][1],
				ROT.DIRS[8][3],
				ROT.DIRS[8][5]
			]
		break;

		case 6:
			dirs = ROT.DIRS[6];
			countFactor = 1;
			startOffset = [-1, 1];
		break;

		case 8:
			dirs = ROT.DIRS[4];
			countFactor = 2;
			startOffset = [-1, 1];
		break;
	}

	/* starting neighbor */
	var x = cx + startOffset[0]*r;
	var y = cy + startOffset[1]*r;

	/* circle */
	for (var i=0;i<dirs.length;i++) {
		for (var j=0;j<r*countFactor;j++) {
			result.push([x, y]);
			x += dirs[i][0];
			y += dirs[i][1];

		}
	}

	return result;
}
/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
}
ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
	/* this place is always visible */
	callback(x, y, 0, 1);
    
	callback(x-1, y-1, 0, 1);
	callback(x, y-1, 0, 1);
	callback(x+1, y-1, 0, 1);
	callback(x-1, y, 0, 1);
	callback(x+1, y, 0, 1);
	callback(x-1, y+1, 0, 1);
	callback(x, y+1, 0, 1);
	callback(x+1, y+1, 0, 1);
    
    callback(x-1, y-2, 0, 1);
    callback(x, y-2, 0, 1);
    callback(x+1, y-2, 0, 1);
    callback(x-2, y-1, 0, 1);
    callback(x-2, y, 0, 1);
    callback(x-2, y+1, 0, 1);
    callback(x+2, y-1, 0, 1);
    callback(x+2, y, 0, 1);
    callback(x+2, y+1, 0, 1);
    callback(x-1, y+2, 0, 1);
    callback(x, y+2, 0, 1);
    callback(x+1, y+2, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* list of all shadows */
	var SHADOWS = [];
	var trees = {};
	var totalNeighborCount = 1;
    var cx, cy, blocks, A1, A2, visibility,
        dx, dy, dd, a, b, radius,
        cx2, cy2, dd1,
        obstacleType;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;
        totalNeighborCount += neighborCount;
        trees = {};
		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
            var key = cx+","+cy;
            if ((x-cx)*(x-cx) + (y-cy)*(y-cy) >= R * R) {
                totalNeighborCount--;
                continue;
            }
            //if (key == "44,102") //console.log('KEY', key, !this._lightPasses(cx, cy));
            // if (key == "150,160") //console.log(key, obstacleType);
            // if (key == "151,161") //console.log(key, obstacleType);
            // if (key == "150,161") //console.log(key, obstacleType);
            var obstacleTypes = obstacleTypes = this.walls[key];
            if (obstacleTypes && obstacleTypes.length) {
                var skipVisibility = false;
                for (var j = 0; j < obstacleTypes.length; j++) {
                    var obstacleType = obstacleTypes[j];
                    cx2 = obstacleType[1];
                    cy2 = obstacleType[2];
                    radius = obstacleType[3];
                    
                    dx = cx2 - x;
                    dy = cy2 - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    if (dd > 1/2) {
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        blocks = !this._lightPasses(cx, cy);
                        
                        dx1 = cx - x;
                        dy1 = cy - y;
                        dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                        if (dd1 < dd) {
                            trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                        }
                        
                        dx = cx - x;
                        dy = cy - y;
                        dd = Math.sqrt(dx * dx + dy * dy);
                        a = Math.asin(radius / dd);
                        b = Math.atan2(dy, dx),
                        A1 = normalize(b - a),
                        A2 = normalize(b + a);
                        visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                        if (!visibility) skipVisibility = true;
                    }
                }
                if (visibility && !skipVisibility) { callback(cx, cy, r, visibility); }
            }
            else {
                cx2 = cx;
                cy2 = cy;
                radius = Math.SQRT2 / 2;
                
                dx = cx2 - x;
                dy = cy2 - y;
                dd = Math.sqrt(dx * dx + dy * dy);
                if (dd > 1/2) {
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    blocks = !this._lightPasses(cx, cy);
                    
                    visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                    if (this.done) return;
                }
            }
            
            /*dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                blocks = !this._lightPasses(cx, cy);
                if (obstacleType && obstacleType[0] == 'tree') {
                    dx1 = cx - x;
                    dy1 = cy - y;
                    dd1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                    if (dd1 < dd) {
                        trees[obstacleType[1]+","+obstacleType[2]] = [obstacleType[1], obstacleType[2]];
                    }
                    
                    dx = cx - x;
                    dy = cy - y;
                    dd = Math.sqrt(dx * dx + dy * dy);
                    a = Math.asin(radius / dd);
                    b = Math.atan2(dy, dx),
                    A1 = normalize(b - a),
                    A2 = normalize(b + a);
                    visibility = this._checkVisibility(b, A1, A2, false, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                }
                else {
                    //if (obstacleType) //console.log(obstacleType[0], radius);
                    //console.log('BLOCKS', cx, cy, blocks, b);
                    visibility = this._checkVisibility(b, A1, A2, blocks, SHADOWS);
                    if (visibility) { callback(cx, cy, r, visibility); }
                    if (this.done) return;
                }
            }*/

		} /* for all cells in this ring */
        
        // apply tree blockers
        for (var k in trees) {
            ////console.log('apply tree');
            cx2 = trees[k][0];
            cy2 = trees[k][1];
            dx = cx2 - x;
            dy = cy2 - y;
            dd = Math.sqrt(dx * dx + dy * dy);
            radius = Math.SQRT2 - .01;
            if (dd > 1/2) {
                a = Math.asin(radius / dd);
                b = Math.atan2(dy, dx),
                A1 = normalize(b - a),
                A2 = normalize(b + a);
                visibility = this._checkVisibility(b, A1, A2, true, SHADOWS);
                if (this.done) return;
            }
        }
	} /* for all rings */
    
    return totalNeighborCount;
}

/**
 * @param {int[2]} A1 arc start
 * @param {int[2]} A2 arc end
 * @param {bool} blocks Does current arc block visibility?
 * @param {int[][]} SHADOWS list of active shadows
 */
ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('_checkVisibility', b, A1, A2, blocks, SHADOWS);
    // check if target center is inside a shadow
    var visible = !blocks;
    //console.log('_checkVisibility', b, visible);
	for (var i = 0; i < SHADOWS.length; i++) {
		var old = SHADOWS[i];
        if (isBetween(b, old[0], old[1])) {
            if (blocks) {
                ////console.log('blocks but not visible', SHADOWS.length);
                visible = false;
            }
            else {
                //console.log(i, b, JSON.stringify(SHADOWS));
                return false; // not visible, return
            }
        }
	}
    
    if (blocks) {
        if (A1 < 0 && A2 >= 0) {
            //console.log('splitting');
            this._mergeShadows(b, 0, A2, blocks, SHADOWS);
            this.done = false;
            this._mergeShadows(b, A1, 0, blocks, SHADOWS);
        }
        else {
            //console.log('not splitting', blocks, visible, b);
            this._mergeShadows(b, A1, A2, blocks, SHADOWS);
        }
        //console.log('end', A1, A2, JSON.stringify(SHADOWS), !isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]), !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]));
        if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])) && A1 != SHADOWS[0][0] && A2 != SHADOWS[0][1] ) {
            this.done = true;
        }
    }
    
    return visible;
}

ROT.FOV.PreciseShadowcasting.prototype._mergeShadows = function(b, A1, A2, blocks, SHADOWS) {
    ////console.log('merging', b, A1, A2);
    // check if target first edge is inside a shadow or which shadows it is between
    var index1 = 0,
        edge1 = false,
        firstIndex = 0;
    while (index1 < SHADOWS.length) {
        var old = SHADOWS[index1];
        firstIndex = index1;
        if (isBetween(A1, old[0], old[1])) {
            edge1 = true;
            break;
        }
        if (index1 > 0 && isBetween(A1, SHADOWS[index1 - 1][1], old[0])) {
            edge1 = false;
            break;
        }
        if (!isBefore(A1, old[1])) {
            index1++;
            firstIndex = index1;
            continue;
        }
        if (isBefore(A1, old[0])) {
            break;
        }
        index1++;
    }
    
    // check if target second edge is inside a shadow or which shadows it is between
    var index2 = SHADOWS.length - 1,
        edge2 = false,
        secondIndex = 0;
    while (index2 >= 0) {
        var old = SHADOWS[index2];
        secondIndex = index2;
        ////console.log(A2, old[0], old[1], isBetween(A2, old[0], old[1]))
        if (isBetween(A2, old[0], old[1])) {
            edge2 = true;
            break;
        }
        if (isBefore(A2, old[0])) {
            index2--;
            secondIndex = index2;
            continue;
        }
        if (!isBefore(A2, old[1])) {
            break;
        }
        index2--;
    }
    
    ////console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    if (firstIndex == SHADOWS.length && !edge1 && secondIndex == 0 && edge2) firstIndex = 0;
    //if (secondIndex == -1) secondIndex = SHADOWS.length - 1;
    //console.log(firstIndex, secondIndex, edge1, edge2, A1, A2);
    //console.log(JSON.stringify(SHADOWS));
    if (SHADOWS.length == 0) {
        //console.log('empty shadows pushing', [A1, A2]);
        SHADOWS.push([A1, A2]);
    }
    /*else if (SHADOWS.length > 1 && firstIndex == SHADOWS.length && secondIndex == 0 && !edge1 && edge2) {
    
    }*/
    else {
        var new_shadow = [edge1 ? SHADOWS[firstIndex][0] : A1, edge2 ? SHADOWS[secondIndex][1] : A2];
        //console.log('new_shadow', new_shadow);
        secondIndex = Math.max(firstIndex, secondIndex);
        var sum1 = diff_sum(SHADOWS);
        var doShift = false;
        if (isBetween(0, new_shadow[0], new_shadow[1]) && new_shadow[0] != 0 && new_shadow[1] != 0) {
            //console.log('crosses 0');
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, [new_shadow[0], 0]);
            //console.log([new_shadow[0], 0], JSON.stringify(SHADOWS));
            if (SHADOWS[0][0] != 0 && SHADOWS[0][1] != new_shadow[1]) {
                SHADOWS.splice(firstIndex + 1, 0, [0, new_shadow[1]]);
                //console.log([0, new_shadow[1]], JSON.stringify(SHADOWS));
            }
            //console.log(JSON.stringify(SHADOWS));
            doShift = true;
        }
        else {
            SHADOWS.splice(firstIndex, firstIndex == secondIndex && edge1 == edge2 && !edge1 ? 0 : secondIndex - firstIndex + 1, new_shadow);
        }
        var sum2 = diff_sum(SHADOWS);
        //console.log('sum1', sum1, 'sum2', sum2, sum2 < sum1, SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1])));
        if (sum2 < sum1) this.done = true;
        /*if (SHADOWS.length == 1 && (!isBetween(A1, SHADOWS[0][0], SHADOWS[0][1]) || !isBetween(A2, SHADOWS[0][0], SHADOWS[0][1]))) {
            this.done = true;
        }*/
        if (new_shadow[0] == 0 || doShift) {
            var count = 0;
            //console.log('shifting');
            while (SHADOWS[0][0] != 0) {
                SHADOWS.push(SHADOWS.shift());
                if (count >= SHADOWS.length) break;
                count++;
                //console.log(JSON.stringify(SHADOWS));
            }
            //console.log('end shifting', JSON.stringify(SHADOWS));
        }
        //console.log(JSON.stringify(SHADOWS));
        //console.log(diff_sum(SHADOWS));
    }
}

function isBefore(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return true;
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return false;
    }
    else {
        return A1 < A2;
    }
}

function isAfter(A1, A2) {
    return !isBefore(A1, A2);
}

function isBetween(b, A1, A2) {
    if (A1 < A2) {
        return ((A1 <= b) && (b <= A2));
    }
    else {
        return ((A1 <= b) && (b <= Math.PI)) || ((-Math.PI <= b) && (b <= A2));
    }
}

function normalize(x) {
    if (x > Math.PI) {
        return -(2 * Math.PI - x);
    }
    else if ( x < -Math.PI) {
        return 2 * Math.PI + x;
    }
    else {
        return x;
    }
}

function diff(A1, A2) {
    if (A1 > 0 && A2 < 0) { // A1 in bottom half, A2 in top half
        return Math.abs((Math.PI - A1) - (-Math.PI - A2));
    }
    else if (A2 > 0 && A1 < 0) { // A1 in top half, A2 in bottom half
        return Math.abs(-A1 + A2);
    }
    if (A1 <= 0 && A2 <= 0) { // A1,A2 in bottom half
        if (isAfter(A1, A2)) { // A1 after A2
            return -A1 + Math.PI - (-Math.PI - A2)
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
    else {
        if (isAfter(A1, A2)) {
            return Math.PI + (Math.PI - A1) + A2
        }
        else {
            return Math.abs(A2 - A1);
        }
    }
}

function diff_sum(SHADOWS) {
    var sum = 0;
    for (var i = 0; i < SHADOWS.length; i++) {
        ////console.log(SHADOWS[i][0], SHADOWS[i][1], diff(SHADOWS[i][0], SHADOWS[i][1]));
        sum += diff(SHADOWS[i][0], SHADOWS[i][1]);
    }
    return sum;
}

module.exports = ROT;
},{}],15:[function(require,module,exports){
var ImageHandler = require("./imageHandler.js");
var ROT = require("./rot6.js");

var key2pt_cache = {};
function key2pt(key) {
    if (key in key2pt_cache) return key2pt_cache[key];
    var p = key.split(',').map(function (c) { return parseInt(c) });
    var pt = {x: p[0], y: p[1], key: key};
    key2pt_cache[key] = pt;
    return pt;
}

function xy2key(x, y) {
    return x + "," + y;
}

function xy2pt(x, y) {
    return {x: x, y: y, key: x + "," + y};
}

function pt2key(pt) {
    return pt.x + "," + pt.y;
}

function generateElevationWalls(data, elevation) {
    var t1 = Date.now();
    var walls = {};
    for (var key in data) {
        var pt = data[key];
        if (pt.z > elevation) {
            adjLoop:
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (0 !== i || 0 !== j) {
                        var k = (pt.x + i) + "," + (pt.y + j);
                        if (data[k] && data[k].z <= elevation) {
                            walls[pt.key] = pt;
                            break adjLoop;
                        }
                    }
                }
            }
        }
    }
    console.log('generateElevationWalls', Date.now() - t1 + 'ms');
    return walls;
}

function setElevationWalls(obj, data, elevation) {
    for (var i = 0; i < data[elevation].length; i++) {
        var el = data[elevation][i];
        obj[el[1] + "," + el[2]] = el;
    }
}

function setWalls(obj, data, id, r) {
    id = id || 'wall';
    r = r || (Math.SQRT2 / 2);
    for (var i in data) {
        obj[i] = [id, data[i].x, data[i].y, r];
    }
}

function setTreeWalls(obj, elevation, tree, tree_elevations, tree_state, tree_blocks) {
    for (var i in tree) {
        if (elevation < tree_elevations[i]) {
            if (tree_state[i]) {
                //obj[i] = ['tree', tree[i].x, tree[i].y, Math.SQRT2];
                tree_blocks[i].forEach(function (pt) {
                    var k = pt.x + "," + pt.y;
                    obj[k] = (obj[k] || []).concat([['tree', tree[i].x, tree[i].y, Math.SQRT2]]);
                });
            }
        }
    }
}

function VisionSimulation(worlddata, mapDataImagePath, onReady, opts) {
    var self = this;
    
    this.opts = opts || {};
    this.grid = [];
    this.gridnav = null;
    this.ent_fow_blocker_node = null;
    this.tools_no_wards = null;
    this.elevationValues = [];
    this.elevationGrid = null;
    this.elevationWalls = {};
    this.treeWalls = {};
    this.tree = {}; // center key to point map
    this.tree_blocks = {}; // center to corners map
    this.tree_relations = {}; // corner to center map
    this.tree_elevations = {};
    this.tree_state = {};
    this.walls = {};
    this.radius = this.opts.radius || parseInt(1600 / 64);
    this.lights = {};
    this.worldMinX = worlddata.worldMinX;
    this.worldMinY = worlddata.worldMinY;
    this.worldMaxX = worlddata.worldMaxX;
    this.worldMaxY = worlddata.worldMaxY;
    this.worldWidth = this.worldMaxX - this.worldMinX;
    this.worldHeight = this.worldMaxY - this.worldMinY;
    this.gridWidth = this.worldWidth / 64 + 1;
    this.gridHeight = this.worldHeight / 64 + 1;
    this.ready = false;
    this.area = 0;
    
    this.imageHandler = new ImageHandler(mapDataImagePath);
    var t1 = Date.now();
    this.imageHandler.load(function () {
        var t2 = Date.now();
        console.log('image load', t2 - t1 + 'ms');
        self.gridnav = parseImage(self.imageHandler, self.gridWidth * 2, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.ent_fow_blocker_node = parseImage(self.imageHandler, self.gridWidth * 3, self.gridWidth, self.gridHeight, blackPixelHandler);
        self.tools_no_wards = parseImage(self.imageHandler, self.gridWidth * 4, self.gridWidth, self.gridHeight, blackPixelHandler);
        parseImage(self.imageHandler, self.gridWidth, self.gridWidth, self.gridHeight, treeElevationPixelHandler);
        self.elevationGrid = parseImage(self.imageHandler, 0, self.gridWidth, self.gridHeight, elevationPixelHandler);
        var t3 = Date.now();
        console.log('image process', t3 - t2 + 'ms');
        self.elevationValues.forEach(function (elevation) {
            //self.elevationWalls[elevation] = generateElevationWalls(self.elevationGrid, elevation);
            self.treeWalls[elevation] = {};
            setTreeWalls(self.treeWalls[elevation], elevation, self.tree, self.tree_elevations, self.tree_state, self.tree_blocks)
        });
        var t4 = Date.now();
        console.log('walls generation', t4 - t3 + 'ms');
        for (var i = 0; i < self.gridWidth; i++) {
            self.grid[i] = [];
            for (var j = 0; j < self.gridHeight; j++) {
                var pt = xy2pt(i, j);
                key2pt_cache[pt.key] = pt;
                self.grid[i].push(pt);
            }
        }
        var t5 = Date.now();
        console.log('cache prime', t5 - t4 + 'ms');
        self.ready = true;
        onReady();
    });

    function parseImage(imageHandler, offset, width, height, pixelHandler) {
        var grid = {};
        imageHandler.scan(offset, width, height, pixelHandler, grid);
        return grid;
    }

    function blackPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[0] === 0) {
            grid[pt.x + "," + pt.y] = pt;
        }
    }

    
    function elevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        pt.z = p[0];
        grid[pt.x + "," + pt.y] = pt;
        if (self.elevationValues.indexOf(p[0]) == -1) {
            self.elevationValues.push(p[0]);
        }
    }

    function treeElevationPixelHandler(x, y, p, grid) {
        var pt = self.ImageXYtoGridXY(x, y);
        if (p[1] == 0 && p[2] == 0) {
            // trees are 2x2 in grid
            // tree origins rounded up when converted to grid, so they represent top right corner. subtract 0.5 to get grid origin
            var treeOrigin = xy2pt(pt.x - 0.5, pt.y - 0.5);
            var treeElevation = p[0] + 40;
            var kC = treeOrigin.key;
            self.tree[kC] = treeOrigin;
            self.tree_elevations[kC] = treeElevation;
            self.tree_blocks[kC] = [];
            self.tree_state[kC] = true;
            // iterate through tree 2x2 by taking floor and ceil of tree grid origin
            [Math.floor, Math.ceil].forEach(function (i) {
                [Math.floor, Math.ceil].forEach(function (j) {
                    var treeCorner = xy2pt(i(treeOrigin.x), j(treeOrigin.y));
                    self.tree_relations[treeCorner.key] = (self.tree_relations[treeCorner.key] || []).concat(treeOrigin);
                    self.tree_blocks[kC].push(treeCorner);
                });
            });
        }
    }

    this.lightPassesCallback = function (x, y) {
        var key = x + ',' + y;
        return !(key in self.elevationWalls[self.elevation]) && !(key in self.ent_fow_blocker_node) && !(key in self.treeWalls[self.elevation] && self.treeWalls[self.elevation][key].length > 0) ;
    }
    
    this.fov = new ROT.FOV.PreciseShadowcasting(this.lightPassesCallback, {topology:8});
}
VisionSimulation.prototype.updateVisibility = function (gX, gY, radius) {
    var self = this,
        key = xy2key(gX, gY);

    radius = radius || self.radius;
    this.elevation = this.elevationGrid[key].z;
    this.walls = this.treeWalls[this.elevation];
    if (!this.elevationWalls[this.elevation]) this.elevationWalls[this.elevation] = generateElevationWalls(this.elevationGrid, this.elevation);
    //setElevationWalls(this.walls, this.elevationWalls, this.elevation)
    //setWalls(this.walls, this.ent_fow_blocker_node);
    //setWalls(this.walls, this.tools_no_wards);
    //setTreeWalls(this.walls, this.elevation, this.tree, this.tree_elevations, this.tree_state, this.tree_blocks);

    this.fov.walls = this.walls;
    this.lights = {};
    this.area = this.fov.compute(gX, gY, radius, function(x2, y2, r, vis) {
        var key = xy2key(x2, y2);
        if (!self.elevationGrid[key]) return;
        var treePts = self.tree_relations[key];
        var treeBlocking = false;
        if (treePts) {
            for (var i = 0; i < treePts.length; i++) {
                var treePt = treePts[i];
                treeBlocking = self.tree_state[treePt.key] && self.tree_elevations[treePt.key] > self.elevation;
                if (treeBlocking) break;
            }
        }
        if (vis == 1 && !self.ent_fow_blocker_node[key] && !treeBlocking) {
            self.lights[key] = 255;
        }
    });
    this.lightArea = Object.keys(this.lights).length;
}

VisionSimulation.prototype.isValidXY = function (x, y, bCheckGridnav, bCheckToolsNoWards, bCheckTreeState) {
    if (!this.ready) return false;
    
    var key = xy2key(x, y),
        treeBlocking = false;
        
    if (bCheckTreeState) {
        var treePts = this.tree_relations[key];
        if (treePts) {
            for (var i = 0; i < treePts.length; i++) {
                var treePt = treePts[i];
                treeBlocking = this.tree_state[treePt.key];
                if (treeBlocking) break;
            }
        }
    }
    
    return x >= 0 && x < this.gridWidth && y >= 0 && y < this.gridHeight && (!bCheckGridnav || !this.gridnav[key]) && (!bCheckToolsNoWards || !this.tools_no_wards[key]) && (!bCheckTreeState || !treeBlocking);
}

VisionSimulation.prototype.toggleTree = function (x, y) {
    var self = this;
    var key = xy2key(x, y);
    var isTree = !!this.tree_relations[key];
    if (isTree) {
        var treePts = this.tree_relations[key];
        for (var i = 0; i < treePts.length; i++) {
            var pt = treePts[i];
            this.tree_state[pt.key] = !this.tree_state[pt.key];
            
            this.elevationValues.forEach(function (elevation) {
                if (elevation < self.tree_elevations[pt.key]) {
                    self.tree_blocks[pt.key].forEach(function (ptB) {
                        for (var j = self.treeWalls[elevation][ptB.key].length - 1; j >= 0; j--) {
                            if (pt.x == self.treeWalls[elevation][ptB.key][j][1] && pt.y == self.treeWalls[elevation][ptB.key][j][2]) {
                                self.treeWalls[elevation][ptB.key].splice(j, 1);
                            }
                        }
                    });
                    if (self.tree_state[pt.key]) {
                        self.tree_blocks[pt.key].forEach(function (ptB) {
                            self.treeWalls[elevation][ptB.key] = (self.treeWalls[elevation][ptB.key] || []).concat([['tree', pt.x, pt.y, Math.SQRT2]]);
                        });
                    }
                }
            });
        }
    }

    return isTree;
}
VisionSimulation.prototype.setRadius = function (r) {
    this.radius = r;
}
VisionSimulation.prototype.WorldXYtoGridXY = function (wX, wY, bNoRound) {
    var x = (wX - this.worldMinX) / 64,
        y = (wY - this.worldMinY) / 64;
    if (!bNoRound) {
        x = parseInt(Math.round(x))
        y = parseInt(Math.round(y))
    }
    return {x: x, y: y, key: x + ',' + y};
}
VisionSimulation.prototype.GridXYtoWorldXY = function (gX, gY) {
    return {x: gX * 64 + this.worldMinX, y: gY * 64 + this.worldMinY};
}

VisionSimulation.prototype.GridXYtoImageXY = function (gX, gY) {
    return {x: gX, y: this.gridHeight - gY - 1};
}

VisionSimulation.prototype.ImageXYtoGridXY = function (x, y) {
    var gY = this.gridHeight - y - 1;
    return {x: x, y: gY, key: x + ',' + gY};
}

VisionSimulation.prototype.WorldXYtoImageXY = function (wX, wY) {
    var pt = this.WorldXYtoGridXY(wX, wY);
    return this.GridXYtoImageXY(pt.x, pt.y);
}

VisionSimulation.prototype.key2pt = key2pt;
VisionSimulation.prototype.xy2key = xy2key;
VisionSimulation.prototype.xy2pt = xy2pt;
VisionSimulation.prototype.pt2key = pt2key;

module.exports = VisionSimulation;
},{"./imageHandler.js":11,"./rot6.js":14}],16:[function(require,module,exports){
module.exports={"worldMinX":-8288,"worldMaxX":8288,"worldMinY":-8288,"worldMaxY":8288}
},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcm9sbGJhci1icm93c2VyL2Rpc3Qvcm9sbGJhci51bWQubm9qc29uLm1pbi5qcyIsInNyYy9hcHAuanMiLCJzcmMvY29udmVyc2lvbkZ1bmN0aW9ucy5qcyIsInNyYy9nZXRMaWdodFVuaW9uLmpzIiwic3JjL21hcENvbnN0YW50cy5qcyIsInNyYy9zdHlsZUNvbnN0YW50cy5qcyIsInNyYy91dGlsL2RlYm91bmNlLmpzIiwic3JjL3V0aWwvZ2V0SlNPTi5qcyIsInNyYy91dGlsL3F1ZXJ5U3RyaW5nLmpzIiwic3JjL3V0aWwvdHJpbS5qcyIsIi4uL2RvdGEtdmlzaW9uLXNpbXVsYXRpb24vYnJvd3Nlci9pbWFnZUhhbmRsZXIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL2Jyb3dzZXIvcG5nLmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9icm93c2VyL3psaWIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy9yb3Q2LmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvdmlzaW9uLXNpbXVsYXRpb24uanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3MUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFUQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24oZSxyKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1yKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHIpO2Vsc2V7dmFyIHQ9cigpO2Zvcih2YXIgbiBpbiB0KShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW25dPXRbbl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2V4cG9ydHM6e30saWQ6bixsb2FkZWQ6ITF9O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgdD17fTtyZXR1cm4gci5tPWUsci5jPXQsci5wPVwiXCIscigwKX0oW2Z1bmN0aW9uKGUscix0KXtlLmV4cG9ydHM9dCgxKX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXt2YXIgZT1cInVuZGVmaW5lZFwiPT10eXBlb2YgSlNPTj97fTpKU09OO28uc2V0dXBKU09OKGUpfXZhciBvPXQoMiksaT10KDMpO24oKTt2YXIgYT13aW5kb3cuX3JvbGxiYXJDb25maWcscz1hJiZhLmdsb2JhbEFsaWFzfHxcIlJvbGxiYXJcIix1PXdpbmRvd1tzXSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvd1tzXS5zaGltSWQ7IXUmJmE/by53cmFwcGVyLmluaXQoYSk6KHdpbmRvdy5Sb2xsYmFyPW8ud3JhcHBlcix3aW5kb3cuUm9sbGJhck5vdGlmaWVyPWkuTm90aWZpZXIpLGUuZXhwb3J0cz1vLndyYXBwZXJ9LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUscix0KXshdFs0XSYmd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yJiYodFs0XT13aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3Isd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yPW51bGwpLGUudW5jYXVnaHRFcnJvci5hcHBseShlLHQpLHImJnIuYXBwbHkod2luZG93LHQpfWZ1bmN0aW9uIG8oZSxyKXtpZihyLmhhc093blByb3BlcnR5JiZyLmhhc093blByb3BlcnR5KFwiYWRkRXZlbnRMaXN0ZW5lclwiKSl7dmFyIHQ9ci5hZGRFdmVudExpc3RlbmVyO3IuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihyLG4sbyl7dC5jYWxsKHRoaXMscixlLndyYXAobiksbyl9O3ZhciBuPXIucmVtb3ZlRXZlbnRMaXN0ZW5lcjtyLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oZSxyLHQpe24uY2FsbCh0aGlzLGUsciYmci5fd3JhcHBlZHx8cix0KX19fXZhciBpPXQoMyksYT10KDgpLHM9aS5Ob3RpZmllcjt3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3I9bnVsbDt2YXIgdT17fTt1LmluaXQ9ZnVuY3Rpb24oZSxyKXt2YXIgdD1uZXcgcyhyKTtpZih0LmNvbmZpZ3VyZShlKSxlLmNhcHR1cmVVbmNhdWdodCl7dmFyIGk7ciYmYS5pc1R5cGUoci5fcm9sbGJhck9sZE9uRXJyb3IsXCJmdW5jdGlvblwiKT9pPXIuX3JvbGxiYXJPbGRPbkVycm9yOndpbmRvdy5vbmVycm9yJiYhd2luZG93Lm9uZXJyb3IuYmVsb25nc1RvU2hpbSYmKGk9d2luZG93Lm9uZXJyb3IpLHdpbmRvdy5vbmVycm9yPWZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO24odCxpLGUpfTt2YXIgdSxjLGw9W1wiRXZlbnRUYXJnZXRcIixcIldpbmRvd1wiLFwiTm9kZVwiLFwiQXBwbGljYXRpb25DYWNoZVwiLFwiQXVkaW9UcmFja0xpc3RcIixcIkNoYW5uZWxNZXJnZXJOb2RlXCIsXCJDcnlwdG9PcGVyYXRpb25cIixcIkV2ZW50U291cmNlXCIsXCJGaWxlUmVhZGVyXCIsXCJIVE1MVW5rbm93bkVsZW1lbnRcIixcIklEQkRhdGFiYXNlXCIsXCJJREJSZXF1ZXN0XCIsXCJJREJUcmFuc2FjdGlvblwiLFwiS2V5T3BlcmF0aW9uXCIsXCJNZWRpYUNvbnRyb2xsZXJcIixcIk1lc3NhZ2VQb3J0XCIsXCJNb2RhbFdpbmRvd1wiLFwiTm90aWZpY2F0aW9uXCIsXCJTVkdFbGVtZW50SW5zdGFuY2VcIixcIlNjcmVlblwiLFwiVGV4dFRyYWNrXCIsXCJUZXh0VHJhY2tDdWVcIixcIlRleHRUcmFja0xpc3RcIixcIldlYlNvY2tldFwiLFwiV2ViU29ja2V0V29ya2VyXCIsXCJXb3JrZXJcIixcIlhNTEh0dHBSZXF1ZXN0XCIsXCJYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0XCIsXCJYTUxIdHRwUmVxdWVzdFVwbG9hZFwiXTtmb3IodT0wO3U8bC5sZW5ndGg7Kyt1KWM9bFt1XSx3aW5kb3dbY10mJndpbmRvd1tjXS5wcm90b3R5cGUmJm8odCx3aW5kb3dbY10ucHJvdG90eXBlKX1yZXR1cm4gZS5jYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9ucyYmKHImJmEuaXNUeXBlKHIuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIsXCJmdW5jdGlvblwiKSYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIixyLl91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKSx0Ll91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyPWZ1bmN0aW9uKGUpe3ZhciByPWUucmVhc29uLG49ZS5wcm9taXNlLG89ZS5kZXRhaWw7IXImJm8mJihyPW8ucmVhc29uLG49by5wcm9taXNlKSx0LnVuaGFuZGxlZFJlamVjdGlvbihyLG4pfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLHQuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIpKSx3aW5kb3cuUm9sbGJhcj10LHMucHJvY2Vzc1BheWxvYWRzKCksdH0sZS5leHBvcnRzPXt3cmFwcGVyOnUsc2V0dXBKU09OOmkuc2V0dXBKU09OfX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7RT1lLHcuc2V0dXBKU09OKGUpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1yfHx0aGlzO3RyeXtyZXR1cm4gZS5hcHBseSh0LGFyZ3VtZW50cyl9Y2F0Y2gobil7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTpcIixuKX19fWZ1bmN0aW9uIGkoKXtofHwoaD1zZXRUaW1lb3V0KGYsMWUzKSl9ZnVuY3Rpb24gYSgpe3JldHVybiBffWZ1bmN0aW9uIHMoZSl7Xz1ffHx0aGlzO3ZhciByPVwiaHR0cHM6Ly9cIitzLkRFRkFVTFRfRU5EUE9JTlQ7dGhpcy5vcHRpb25zPXtlbmFibGVkOiEwLGVuZHBvaW50OnIsZW52aXJvbm1lbnQ6XCJwcm9kdWN0aW9uXCIsc2NydWJGaWVsZHM6ZyhbXSxzLkRFRkFVTFRfU0NSVUJfRklFTERTKSxjaGVja0lnbm9yZTpudWxsLGxvZ0xldmVsOnMuREVGQVVMVF9MT0dfTEVWRUwscmVwb3J0TGV2ZWw6cy5ERUZBVUxUX1JFUE9SVF9MRVZFTCx1bmNhdWdodEVycm9yTGV2ZWw6cy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMLHBheWxvYWQ6e319LHRoaXMubGFzdEVycm9yPW51bGwsdGhpcy5wbHVnaW5zPXt9LHRoaXMucGFyZW50Tm90aWZpZXI9ZSxlJiYoZS5oYXNPd25Qcm9wZXJ0eShcInNoaW1JZFwiKT9lLm5vdGlmaWVyPXRoaXM6dGhpcy5jb25maWd1cmUoZS5vcHRpb25zKSl9ZnVuY3Rpb24gdShlKXt3aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWUucHVzaChlKSxpKCl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gbyhmdW5jdGlvbigpe3ZhciByPXRoaXMuX2dldExvZ0FyZ3MoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy5fbG9nKGV8fHIubGV2ZWx8fHRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxyLm1lc3NhZ2Usci5lcnIsci5jdXN0b20sci5jYWxsYmFjayl9KX1mdW5jdGlvbiBsKGUscil7ZXx8KGU9cj9FLnN0cmluZ2lmeShyKTpcIlwiKTt2YXIgdD17Ym9keTplfTtyZXR1cm4gciYmKHQuZXh0cmE9ZyghMCx7fSxyKSkse21lc3NhZ2U6dH19ZnVuY3Rpb24gcChlLHIsdCl7dmFyIG49bS5ndWVzc0Vycm9yQ2xhc3Moci5tZXNzYWdlKSxvPXIubmFtZXx8blswXSxpPW5bMV0sYT17ZXhjZXB0aW9uOntcImNsYXNzXCI6byxtZXNzYWdlOml9fTtpZihlJiYoYS5leGNlcHRpb24uZGVzY3JpcHRpb249ZXx8XCJ1bmNhdWdodCBleGNlcHRpb25cIiksci5zdGFjayl7dmFyIHMsdSxjLHAsZixkLGgsdztmb3IoYS5mcmFtZXM9W10saD0wO2g8ci5zdGFjay5sZW5ndGg7KytoKXM9ci5zdGFja1toXSx1PXtmaWxlbmFtZTpzLnVybD92LnNhbml0aXplVXJsKHMudXJsKTpcIih1bmtub3duKVwiLGxpbmVubzpzLmxpbmV8fG51bGwsbWV0aG9kOnMuZnVuYyYmXCI/XCIhPT1zLmZ1bmM/cy5mdW5jOlwiW2Fub255bW91c11cIixjb2xubzpzLmNvbHVtbn0sYz1wPWY9bnVsbCxkPXMuY29udGV4dD9zLmNvbnRleHQubGVuZ3RoOjAsZCYmKHc9TWF0aC5mbG9vcihkLzIpLHA9cy5jb250ZXh0LnNsaWNlKDAsdyksYz1zLmNvbnRleHRbd10sZj1zLmNvbnRleHQuc2xpY2UodykpLGMmJih1LmNvZGU9YyksKHB8fGYpJiYodS5jb250ZXh0PXt9LHAmJnAubGVuZ3RoJiYodS5jb250ZXh0LnByZT1wKSxmJiZmLmxlbmd0aCYmKHUuY29udGV4dC5wb3N0PWYpKSxzLmFyZ3MmJih1LmFyZ3M9cy5hcmdzKSxhLmZyYW1lcy5wdXNoKHUpO3JldHVybiBhLmZyYW1lcy5yZXZlcnNlKCksdCYmKGEuZXh0cmE9ZyghMCx7fSx0KSkse3RyYWNlOmF9fXJldHVybiBsKG8rXCI6IFwiK2ksdCl9ZnVuY3Rpb24gZigpe3ZhciBlO3RyeXtmb3IoO2U9d2luZG93Ll9yb2xsYmFyUGF5bG9hZFF1ZXVlLnNoaWZ0KCk7KWQoZSl9ZmluYWxseXtoPXZvaWQgMH19ZnVuY3Rpb24gZChlKXt2YXIgcj1lLmVuZHBvaW50VXJsLHQ9ZS5hY2Nlc3NUb2tlbixuPWUucGF5bG9hZCxvPWUuY2FsbGJhY2t8fGZ1bmN0aW9uKCl7fSxpPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2ktTD49NmU0JiYoTD1pLFI9MCk7dmFyIGE9d2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5tYXhJdGVtcyxjPXdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMuaXRlbXNQZXJNaW51dGUsbD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYT49MSYmVD49YX0scD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYz49MSYmUj49Y307cmV0dXJuIGwoKT92b2lkIG8obmV3IEVycm9yKGErXCIgbWF4IGl0ZW1zIHJlYWNoZWRcIikpOnAoKT92b2lkIG8obmV3IEVycm9yKGMrXCIgaXRlbXMgcGVyIG1pbnV0ZSByZWFjaGVkXCIpKTooVCsrLFIrKyxsKCkmJl8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwibWF4SXRlbXMgaGFzIGJlZW4gaGl0LiBJZ25vcmluZyBlcnJvcnMgZm9yIHRoZSByZW1haW5kZXIgb2YgdGhlIGN1cnJlbnQgcGFnZSBsb2FkLlwiLG51bGwse21heEl0ZW1zOmF9LG51bGwsITEsITApLG4uaWdub3JlUmF0ZUxpbWl0JiZkZWxldGUgbi5pZ25vcmVSYXRlTGltaXQsdm9pZCB5LnBvc3Qocix0LG4sZnVuY3Rpb24ocix0KXtyZXR1cm4gcj8ociBpbnN0YW5jZW9mIGImJihlLmNhbGxiYWNrPWZ1bmN0aW9uKCl7fSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dShlKX0scy5SRVRSWV9ERUxBWSkpLG8ocikpOm8obnVsbCx0KX0pKX12YXIgaCxnPXQoNCksbT10KDUpLHY9dCg4KSx3PXQoMTApLHk9dy5YSFIsYj13LkNvbm5lY3Rpb25FcnJvcixFPW51bGw7cy5OT1RJRklFUl9WRVJTSU9OPVwiMS45LjJcIixzLkRFRkFVTFRfRU5EUE9JTlQ9XCJhcGkucm9sbGJhci5jb20vYXBpLzEvXCIscy5ERUZBVUxUX1NDUlVCX0ZJRUxEUz1bXCJwd1wiLFwicGFzc1wiLFwicGFzc3dkXCIsXCJwYXNzd29yZFwiLFwic2VjcmV0XCIsXCJjb25maXJtX3Bhc3N3b3JkXCIsXCJjb25maXJtUGFzc3dvcmRcIixcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFwicGFzc3dvcmRDb25maXJtYXRpb25cIixcImFjY2Vzc190b2tlblwiLFwiYWNjZXNzVG9rZW5cIixcInNlY3JldF9rZXlcIixcInNlY3JldEtleVwiLFwic2VjcmV0VG9rZW5cIl0scy5ERUZBVUxUX0xPR19MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1JFUE9SVF9MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMPVwiZXJyb3JcIixzLkRFRkFVTFRfSVRFTVNfUEVSX01JTj02MCxzLkRFRkFVTFRfTUFYX0lURU1TPTAscy5MRVZFTFM9e2RlYnVnOjAsaW5mbzoxLHdhcm5pbmc6MixlcnJvcjozLGNyaXRpY2FsOjR9LHMuUkVUUllfREVMQVk9MWU0LHdpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZT13aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWV8fFtdLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnM9e3N0YXJ0VGltZToobmV3IERhdGUpLmdldFRpbWUoKSxtYXhJdGVtczpzLkRFRkFVTFRfTUFYX0lURU1TLGl0ZW1zUGVyTWludXRlOnMuREVGQVVMVF9JVEVNU19QRVJfTUlOfTt2YXIgXyx4PXMucHJvdG90eXBlO3guX2dldExvZ0FyZ3M9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixpLGEsdSxjPXRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxsPVtdLHA9MDtwPGUubGVuZ3RoOysrcCl1PWVbcF0sYT12LnR5cGVOYW1lKHUpLFwic3RyaW5nXCI9PT1hP3I/bC5wdXNoKHUpOnI9dTpcImZ1bmN0aW9uXCI9PT1hP2k9byh1LHRoaXMpOlwiZGF0ZVwiPT09YT9sLnB1c2godSk6XCJlcnJvclwiPT09YXx8dSBpbnN0YW5jZW9mIEVycm9yfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgRE9NRXhjZXB0aW9uJiZ1IGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uP3Q/bC5wdXNoKHUpOnQ9dTpcIm9iamVjdFwiIT09YSYmXCJhcnJheVwiIT09YXx8KG4/bC5wdXNoKHUpOm49dSk7cmV0dXJuIGwubGVuZ3RoJiYobj1ufHx7fSxuLmV4dHJhQXJncz1sKSx7bGV2ZWw6YyxtZXNzYWdlOnIsZXJyOnQsY3VzdG9tOm4sY2FsbGJhY2s6aX19LHguX3JvdXRlPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXMub3B0aW9ucy5lbmRwb2ludCx0PS9cXC8kLy50ZXN0KHIpLG49L15cXC8vLnRlc3QoZSk7cmV0dXJuIHQmJm4/ZT1lLnN1YnN0cmluZygxKTp0fHxufHwoZT1cIi9cIitlKSxyK2V9LHguX3Byb2Nlc3NTaGltUXVldWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixvLGksYSx1LGM9e307dD1lLnNoaWZ0KCk7KXI9dC5zaGltLG49dC5tZXRob2Qsbz10LmFyZ3MsaT1yLnBhcmVudFNoaW0sdT1jW3Iuc2hpbUlkXSx1fHwoaT8oYT1jW2kuc2hpbUlkXSx1PW5ldyBzKGEpKTp1PXRoaXMsY1tyLnNoaW1JZF09dSksdVtuXSYmdi5pc1R5cGUodVtuXSxcImZ1bmN0aW9uXCIpJiZ1W25dLmFwcGx5KHUsbyl9LHguX2J1aWxkUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuLG8pe3ZhciBpPXRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbixhPXRoaXMub3B0aW9ucy5lbnZpcm9ubWVudCx1PWcoITAse30sdGhpcy5vcHRpb25zLnBheWxvYWQpLGM9di51dWlkNCgpO2lmKHZvaWQgMD09PXMuTEVWRUxTW3JdKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGV2ZWxcIik7aWYoIXQmJiFuJiYhbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXNzYWdlLCBzdGFjayBpbmZvIG9yIGN1c3RvbSBkYXRhXCIpO3ZhciBsPXtlbnZpcm9ubWVudDphLGVuZHBvaW50OnRoaXMub3B0aW9ucy5lbmRwb2ludCx1dWlkOmMsbGV2ZWw6cixwbGF0Zm9ybTpcImJyb3dzZXJcIixmcmFtZXdvcms6XCJicm93c2VyLWpzXCIsbGFuZ3VhZ2U6XCJqYXZhc2NyaXB0XCIsYm9keTp0aGlzLl9idWlsZEJvZHkodCxuLG8pLHJlcXVlc3Q6e3VybDp3aW5kb3cubG9jYXRpb24uaHJlZixxdWVyeV9zdHJpbmc6d2luZG93LmxvY2F0aW9uLnNlYXJjaCx1c2VyX2lwOlwiJHJlbW90ZV9pcFwifSxjbGllbnQ6e3J1bnRpbWVfbXM6ZS5nZXRUaW1lKCktd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5zdGFydFRpbWUsdGltZXN0YW1wOk1hdGgucm91bmQoZS5nZXRUaW1lKCkvMWUzKSxqYXZhc2NyaXB0Onticm93c2VyOndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LGxhbmd1YWdlOndpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UsY29va2llX2VuYWJsZWQ6d2luZG93Lm5hdmlnYXRvci5jb29raWVFbmFibGVkLHNjcmVlbjp7d2lkdGg6d2luZG93LnNjcmVlbi53aWR0aCxoZWlnaHQ6d2luZG93LnNjcmVlbi5oZWlnaHR9LHBsdWdpbnM6dGhpcy5fZ2V0QnJvd3NlclBsdWdpbnMoKX19LHNlcnZlcjp7fSxub3RpZmllcjp7bmFtZTpcInJvbGxiYXItYnJvd3Nlci1qc1wiLHZlcnNpb246cy5OT1RJRklFUl9WRVJTSU9OfX07dS5ib2R5JiZkZWxldGUgdS5ib2R5O3ZhciBwPXthY2Nlc3NfdG9rZW46aSxkYXRhOmcoITAsbCx1KX07cmV0dXJuIHRoaXMuX3NjcnViKHAuZGF0YSkscH0seC5fYnVpbGRCb2R5PWZ1bmN0aW9uKGUscix0KXt2YXIgbjtyZXR1cm4gbj1yP3AoZSxyLHQpOmwoZSx0KX0seC5fZ2V0QnJvd3NlclBsdWdpbnM9ZnVuY3Rpb24oKXtpZighdGhpcy5fYnJvd3NlclBsdWdpbnMpe3ZhciBlLHIsdD13aW5kb3cubmF2aWdhdG9yLnBsdWdpbnN8fFtdLG49dC5sZW5ndGgsbz1bXTtmb3Iocj0wO3I8bjsrK3IpZT10W3JdLG8ucHVzaCh7bmFtZTplLm5hbWUsZGVzY3JpcHRpb246ZS5kZXNjcmlwdGlvbn0pO3RoaXMuX2Jyb3dzZXJQbHVnaW5zPW99cmV0dXJuIHRoaXMuX2Jyb3dzZXJQbHVnaW5zfSx4Ll9zY3J1Yj1mdW5jdGlvbihlKXtmdW5jdGlvbiByKGUscix0LG4sbyxpKXtyZXR1cm4gcit2LnJlZGFjdChpKX1mdW5jdGlvbiB0KGUpe3ZhciB0O2lmKHYuaXNUeXBlKGUsXCJzdHJpbmdcIikpZm9yKHQ9MDt0PHMubGVuZ3RoOysrdCllPWUucmVwbGFjZShzW3RdLHIpO3JldHVybiBlfWZ1bmN0aW9uIG4oZSxyKXt2YXIgdDtmb3IodD0wO3Q8YS5sZW5ndGg7Kyt0KWlmKGFbdF0udGVzdChlKSl7cj12LnJlZGFjdChyKTticmVha31yZXR1cm4gcn1mdW5jdGlvbiBvKGUscil7dmFyIG89bihlLHIpO3JldHVybiBvPT09cj90KG8pOm99dmFyIGk9dGhpcy5vcHRpb25zLnNjcnViRmllbGRzLGE9dGhpcy5fZ2V0U2NydWJGaWVsZFJlZ2V4cyhpKSxzPXRoaXMuX2dldFNjcnViUXVlcnlQYXJhbVJlZ2V4cyhpKTtyZXR1cm4gdi50cmF2ZXJzZShlLG8pLGV9LHguX2dldFNjcnViRmllbGRSZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAocixcImlcIikpO3JldHVybiB0fSx4Ll9nZXRTY3J1YlF1ZXJ5UGFyYW1SZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAoXCIoXCIrcitcIj0pKFteJlxcXFxuXSspXCIsXCJpZ21cIikpO3JldHVybiB0fSx4Ll91cmxJc1doaXRlbGlzdGVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYyxsO3RyeXtpZihyPXRoaXMub3B0aW9ucy5ob3N0V2hpdGVMaXN0LHQ9ZSYmZS5kYXRhJiZlLmRhdGEuYm9keSYmZS5kYXRhLmJvZHkudHJhY2UsIXJ8fDA9PT1yLmxlbmd0aClyZXR1cm4hMDtpZighdClyZXR1cm4hMDtmb3Iocz1yLmxlbmd0aCxpPXQuZnJhbWVzLmxlbmd0aCxjPTA7YzxpO2MrKyl7aWYobj10LmZyYW1lc1tjXSxvPW4uZmlsZW5hbWUsIXYuaXNUeXBlKG8sXCJzdHJpbmdcIikpcmV0dXJuITA7Zm9yKGw9MDtsPHM7bCsrKWlmKGE9cltsXSx1PW5ldyBSZWdFeHAoYSksdS50ZXN0KG8pKXJldHVybiEwfX1jYXRjaChwKXtyZXR1cm4gdGhpcy5jb25maWd1cmUoe2hvc3RXaGl0ZUxpc3Q6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHJlYWRpbmcgeW91ciBjb25maWd1cmF0aW9uJ3MgaG9zdFdoaXRlTGlzdCBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBob3N0V2hpdGVMaXN0LlwiLHApLCEwfXJldHVybiExfSx4Ll9tZXNzYWdlSXNJZ25vcmVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYzt0cnl7aWYoaT0hMSxuPXRoaXMub3B0aW9ucy5pZ25vcmVkTWVzc2FnZXMsIW58fDA9PT1uLmxlbmd0aClyZXR1cm4hMTtpZihzPWUmJmUuZGF0YSYmZS5kYXRhLmJvZHksdT1zJiZzLnRyYWNlJiZzLnRyYWNlLmV4Y2VwdGlvbiYmcy50cmFjZS5leGNlcHRpb24ubWVzc2FnZSxjPXMmJnMubWVzc2FnZSYmcy5tZXNzYWdlLmJvZHkscj11fHxjLCFyKXJldHVybiExO2ZvcihvPW4ubGVuZ3RoLHQ9MDt0PG8mJihhPW5ldyBSZWdFeHAoblt0XSxcImdpXCIpLCEoaT1hLnRlc3QocikpKTt0KyspO31jYXRjaChsKXt0aGlzLmNvbmZpZ3VyZSh7aWdub3JlZE1lc3NhZ2VzOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSByZWFkaW5nIHlvdXIgY29uZmlndXJhdGlvbidzIGlnbm9yZWRNZXNzYWdlcyBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBpZ25vcmVkTWVzc2FnZXMuXCIpfXJldHVybiBpfSx4Ll9lbnF1ZXVlUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuKXt2YXIgbz17Y2FsbGJhY2s6bixhY2Nlc3NUb2tlbjp0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4sZW5kcG9pbnRVcmw6dGhpcy5fcm91dGUoXCJpdGVtL1wiKSxwYXlsb2FkOmV9LGk9ZnVuY3Rpb24oKXtpZihuKXt2YXIgZT1cIlRoaXMgaXRlbSB3YXMgbm90IHNlbnQgdG8gUm9sbGJhciBiZWNhdXNlIGl0IHdhcyBpZ25vcmVkLiBUaGlzIGNhbiBoYXBwZW4gaWYgYSBjdXN0b20gY2hlY2tJZ25vcmUoKSBmdW5jdGlvbiB3YXMgdXNlZCBvciBpZiB0aGUgaXRlbSdzIGxldmVsIHdhcyBsZXNzIHRoYW4gdGhlIG5vdGlmaWVyJyByZXBvcnRMZXZlbC4gU2VlIGh0dHBzOi8vcm9sbGJhci5jb20vZG9jcy9ub3RpZmllci9yb2xsYmFyLmpzL2NvbmZpZ3VyYXRpb24gZm9yIG1vcmUgZGV0YWlscy5cIjtuKG51bGwse2VycjowLHJlc3VsdDp7aWQ6bnVsbCx1dWlkOm51bGwsbWVzc2FnZTplfX0pfX07aWYodGhpcy5faW50ZXJuYWxDaGVja0lnbm9yZShyLHQsZSkpcmV0dXJuIHZvaWQgaSgpO3RyeXtpZih2LmlzVHlwZSh0aGlzLm9wdGlvbnMuY2hlY2tJZ25vcmUsXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmNoZWNrSWdub3JlKHIsdCxlKSlyZXR1cm4gdm9pZCBpKCl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe2NoZWNrSWdub3JlOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSBjYWxsaW5nIGN1c3RvbSBjaGVja0lnbm9yZSgpIGZ1bmN0aW9uLiBSZW1vdmluZyBjdXN0b20gY2hlY2tJZ25vcmUoKS5cIixhKX1pZih0aGlzLl91cmxJc1doaXRlbGlzdGVkKGUpJiYhdGhpcy5fbWVzc2FnZUlzSWdub3JlZChlKSl7aWYodGhpcy5vcHRpb25zLnZlcmJvc2Upe2lmKGUuZGF0YSYmZS5kYXRhLmJvZHkmJmUuZGF0YS5ib2R5LnRyYWNlKXt2YXIgcz1lLmRhdGEuYm9keS50cmFjZSxjPXMuZXhjZXB0aW9uLm1lc3NhZ2U7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogXCIsYyl9Y29uc29sZS5pbmZvKFwiW1JvbGxiYXJdOiBcIixvKX12LmlzVHlwZSh0aGlzLm9wdGlvbnMubG9nRnVuY3Rpb24sXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmxvZ0Z1bmN0aW9uKG8pO3RyeXt2LmlzVHlwZSh0aGlzLm9wdGlvbnMudHJhbnNmb3JtLFwiZnVuY3Rpb25cIikmJnRoaXMub3B0aW9ucy50cmFuc2Zvcm0oZSl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe3RyYW5zZm9ybTpudWxsfSksY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgY2FsbGluZyBjdXN0b20gdHJhbnNmb3JtKCkgZnVuY3Rpb24uIFJlbW92aW5nIGN1c3RvbSB0cmFuc2Zvcm0oKS5cIixhKX10aGlzLm9wdGlvbnMuZW5hYmxlZCYmdShvKX19LHguX2ludGVybmFsQ2hlY2tJZ25vcmU9ZnVuY3Rpb24oZSxyLHQpe3ZhciBuPXJbMF0sbz1zLkxFVkVMU1tuXXx8MCxpPXMuTEVWRUxTW3RoaXMub3B0aW9ucy5yZXBvcnRMZXZlbF18fDA7aWYobzxpKXJldHVybiEwO3ZhciBhPXRoaXMub3B0aW9ucz90aGlzLm9wdGlvbnMucGx1Z2luczp7fTtpZihhJiZhLmpxdWVyeSYmYS5qcXVlcnkuaWdub3JlQWpheEVycm9ycyl0cnl7cmV0dXJuISF0LmRhdGEuYm9keS5tZXNzYWdlLmV4dHJhLmlzQWpheH1jYXRjaCh1KXtyZXR1cm4hMX1yZXR1cm4hMX0seC5fbG9nPWZ1bmN0aW9uKGUscix0LG4sbyxpLGEpe3ZhciBzPW51bGw7aWYodCl0cnl7aWYocz10Ll9zYXZlZFN0YWNrVHJhY2U/dC5fc2F2ZWRTdGFja1RyYWNlOm0ucGFyc2UodCksdD09PXRoaXMubGFzdEVycm9yKXJldHVybjt0aGlzLmxhc3RFcnJvcj10fWNhdGNoKHUpe2NvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHBhcnNpbmcgdGhlIGVycm9yIG9iamVjdC5cIix1KSxyPXQubWVzc2FnZXx8dC5kZXNjcmlwdGlvbnx8cnx8U3RyaW5nKHQpLHQ9bnVsbH12YXIgYz10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsZSxyLHMsbik7YSYmKGMuaWdub3JlUmF0ZUxpbWl0PSEwKSx0aGlzLl9lbnF1ZXVlUGF5bG9hZChjLCEhaSxbZSxyLHQsbl0sbyl9LHgubG9nPWMoKSx4LmRlYnVnPWMoXCJkZWJ1Z1wiKSx4LmluZm89YyhcImluZm9cIikseC53YXJuPWMoXCJ3YXJuaW5nXCIpLHgud2FybmluZz1jKFwid2FybmluZ1wiKSx4LmVycm9yPWMoXCJlcnJvclwiKSx4LmNyaXRpY2FsPWMoXCJjcml0aWNhbFwiKSx4LnVuY2F1Z2h0RXJyb3I9byhmdW5jdGlvbihlLHIsdCxuLG8saSl7aWYoaT1pfHxudWxsLG8mJnYuaXNUeXBlKG8sXCJlcnJvclwiKSlyZXR1cm4gdm9pZCB0aGlzLl9sb2codGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLG8saSxudWxsLCEwKTtpZihyJiZ2LmlzVHlwZShyLFwiZXJyb3JcIikpcmV0dXJuIHZvaWQgdGhpcy5fbG9nKHRoaXMub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsZSxyLGksbnVsbCwhMCk7dmFyIGE9e3VybDpyfHxcIlwiLGxpbmU6dH07YS5mdW5jPW0uZ3Vlc3NGdW5jdGlvbk5hbWUoYS51cmwsYS5saW5lKSxhLmNvbnRleHQ9bS5nYXRoZXJDb250ZXh0KGEudXJsLGEubGluZSk7dmFyIHM9e21vZGU6XCJvbmVycm9yXCIsbWVzc2FnZTpvP1N0cmluZyhvKTplfHxcInVuY2F1Z2h0IGV4Y2VwdGlvblwiLHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOlthXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sdT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHMsaSk7dGhpcy5fZW5xdWV1ZVBheWxvYWQodSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHIsdCxuLG9dKX0pLHgudW5oYW5kbGVkUmVqZWN0aW9uPW8oZnVuY3Rpb24oZSxyKXtpZihudWxsPT1lKXJldHVybiB2b2lkIF8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwidW5oYW5kbGVkIHJlamVjdGlvbiB3YXMgbnVsbCBvciB1bmRlZmluZWQhXCIsbnVsbCx7fSxudWxsLCExLCExKTt2YXIgdD1lLm1lc3NhZ2V8fChlP1N0cmluZyhlKTpcInVuaGFuZGxlZCByZWplY3Rpb25cIiksbj1lLl9yb2xsYmFyQ29udGV4dHx8ci5fcm9sbGJhckNvbnRleHR8fG51bGw7aWYoZSYmdi5pc1R5cGUoZSxcImVycm9yXCIpKXJldHVybiB2b2lkIHRoaXMuX2xvZyh0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsZSxuLG51bGwsITApO3ZhciBvPXt1cmw6XCJcIixsaW5lOjB9O28uZnVuYz1tLmd1ZXNzRnVuY3Rpb25OYW1lKG8udXJsLG8ubGluZSksby5jb250ZXh0PW0uZ2F0aGVyQ29udGV4dChvLnVybCxvLmxpbmUpO3ZhciBpPXttb2RlOlwidW5oYW5kbGVkcmVqZWN0aW9uXCIsbWVzc2FnZTp0LHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOltvXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sYT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LGksbik7dGhpcy5fZW5xdWV1ZVBheWxvYWQoYSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LG8udXJsLG8ubGluZSwwLGUscl0pfSkseC5nbG9iYWw9byhmdW5jdGlvbihlKXtlPWV8fHt9O3ZhciByPXtzdGFydFRpbWU6ZS5zdGFydFRpbWUsbWF4SXRlbXM6ZS5tYXhJdGVtcyxpdGVtc1Blck1pbnV0ZTplLml0ZW1zUGVyTWludXRlfTtnKCEwLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMsciksdm9pZCAwIT09ZS5tYXhJdGVtcyYmKFQ9MCksdm9pZCAwIT09ZS5pdGVtc1Blck1pbnV0ZSYmKFI9MCl9KSx4LmNvbmZpZ3VyZT1vKGZ1bmN0aW9uKGUscil7dmFyIHQ9ZyghMCx7fSxlKTtnKCFyLHRoaXMub3B0aW9ucyx0KSx0aGlzLmdsb2JhbCh0KX0pLHguc2NvcGU9byhmdW5jdGlvbihlKXt2YXIgcj1uZXcgcyh0aGlzKTtyZXR1cm4gZyghMCxyLm9wdGlvbnMucGF5bG9hZCxlKSxyfSkseC53cmFwPWZ1bmN0aW9uKGUscil7dHJ5e3ZhciB0O2lmKHQ9di5pc1R5cGUocixcImZ1bmN0aW9uXCIpP3I6ZnVuY3Rpb24oKXtyZXR1cm4gcnx8e319LCF2LmlzVHlwZShlLFwiZnVuY3Rpb25cIikpcmV0dXJuIGU7aWYoZS5faXNXcmFwKXJldHVybiBlO2lmKCFlLl93cmFwcGVkKXtlLl93cmFwcGVkPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1jYXRjaChyKXt0aHJvd1wic3RyaW5nXCI9PXR5cGVvZiByJiYocj1uZXcgU3RyaW5nKHIpKSxyLnN0YWNrfHwoci5fc2F2ZWRTdGFja1RyYWNlPW0ucGFyc2UocikpLHIuX3JvbGxiYXJDb250ZXh0PXQoKXx8e30sci5fcm9sbGJhckNvbnRleHQuX3dyYXBwZWRTb3VyY2U9ZS50b1N0cmluZygpLHdpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcj1yLHJ9fSxlLl93cmFwcGVkLl9pc1dyYXA9ITA7Zm9yKHZhciBuIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShuKSYmKGUuX3dyYXBwZWRbbl09ZVtuXSl9cmV0dXJuIGUuX3dyYXBwZWR9Y2F0Y2gobyl7cmV0dXJuIGV9fSx4LmxvYWRGdWxsPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogVW5leHBlY3RlZCBSb2xsYmFyLmxvYWRGdWxsKCkgY2FsbGVkIG9uIGEgTm90aWZpZXIgaW5zdGFuY2VcIil9LHMucHJvY2Vzc1BheWxvYWRzPWZ1bmN0aW9uKGUpe3JldHVybiBlP3ZvaWQgZigpOnZvaWQgaSgpfTt2YXIgTD0obmV3IERhdGUpLmdldFRpbWUoKSxUPTAsUj0wO2UuZXhwb3J0cz17Tm90aWZpZXI6cyxzZXR1cEpTT046bix0b3BMZXZlbE5vdGlmaWVyOmF9fSxmdW5jdGlvbihlLHIpe1widXNlIHN0cmljdFwiO3ZhciB0PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLG89ZnVuY3Rpb24oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkuaXNBcnJheT9BcnJheS5pc0FycmF5KGUpOlwiW29iamVjdCBBcnJheV1cIj09PW4uY2FsbChlKX0saT1mdW5jdGlvbihlKXtpZighZXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9PW4uY2FsbChlKSlyZXR1cm4hMTt2YXIgcj10LmNhbGwoZSxcImNvbnN0cnVjdG9yXCIpLG89ZS5jb25zdHJ1Y3RvciYmZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUmJnQuY2FsbChlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxcImlzUHJvdG90eXBlT2ZcIik7aWYoZS5jb25zdHJ1Y3RvciYmIXImJiFvKXJldHVybiExO3ZhciBpO2ZvcihpIGluIGUpO3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBpfHx0LmNhbGwoZSxpKX07ZS5leHBvcnRzPWZ1bmN0aW9uIGEoKXt2YXIgZSxyLHQsbixzLHUsYz1hcmd1bWVudHNbMF0sbD0xLHA9YXJndW1lbnRzLmxlbmd0aCxmPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGM/KGY9YyxjPWFyZ3VtZW50c1sxXXx8e30sbD0yKTooXCJvYmplY3RcIiE9dHlwZW9mIGMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGN8fG51bGw9PWMpJiYoYz17fSk7bDxwOysrbClpZihlPWFyZ3VtZW50c1tsXSxudWxsIT1lKWZvcihyIGluIGUpdD1jW3JdLG49ZVtyXSxjIT09biYmKGYmJm4mJihpKG4pfHwocz1vKG4pKSk/KHM/KHM9ITEsdT10JiZvKHQpP3Q6W10pOnU9dCYmaSh0KT90Ont9LGNbcl09YShmLHUsbikpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiYoY1tyXT1uKSk7cmV0dXJuIGN9fSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe3JldHVybiBsfWZ1bmN0aW9uIG8oKXtyZXR1cm4gbnVsbH1mdW5jdGlvbiBpKGUpe3ZhciByPXt9O3JldHVybiByLl9zdGFja0ZyYW1lPWUsci51cmw9ZS5maWxlTmFtZSxyLmxpbmU9ZS5saW5lTnVtYmVyLHIuZnVuYz1lLmZ1bmN0aW9uTmFtZSxyLmNvbHVtbj1lLmNvbHVtbk51bWJlcixyLmFyZ3M9ZS5hcmdzLHIuY29udGV4dD1vKHIudXJsLHIubGluZSkscn1mdW5jdGlvbiBhKGUpe2Z1bmN0aW9uIHIoKXt2YXIgcj1bXTt0cnl7cj1jLnBhcnNlKGUpfWNhdGNoKHQpe3I9W119Zm9yKHZhciBuPVtdLG89MDtvPHIubGVuZ3RoO28rKyluLnB1c2gobmV3IGkocltvXSkpO3JldHVybiBufXJldHVybntzdGFjazpyKCksbWVzc2FnZTplLm1lc3NhZ2UsbmFtZTplLm5hbWV9fWZ1bmN0aW9uIHMoZSl7cmV0dXJuIG5ldyBhKGUpfWZ1bmN0aW9uIHUoZSl7aWYoIWUpcmV0dXJuW1wiVW5rbm93biBlcnJvci4gVGhlcmUgd2FzIG5vIGVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheS5cIixcIlwiXTt2YXIgcj1lLm1hdGNoKHApLHQ9XCIodW5rbm93bilcIjtyZXR1cm4gciYmKHQ9cltyLmxlbmd0aC0xXSxlPWUucmVwbGFjZSgocltyLmxlbmd0aC0yXXx8XCJcIikrdCtcIjpcIixcIlwiKSxlPWUucmVwbGFjZSgvKF5bXFxzXSt8W1xcc10rJCkvZyxcIlwiKSksW3QsZV19dmFyIGM9dCg2KSxsPVwiP1wiLHA9bmV3IFJlZ0V4cChcIl4oKFthLXpBLVowLTktXyQgXSopOiAqKT8oVW5jYXVnaHQgKT8oW2EtekEtWjAtOS1fJCBdKik6IFwiKTtlLmV4cG9ydHM9e2d1ZXNzRnVuY3Rpb25OYW1lOm4sZ3Vlc3NFcnJvckNsYXNzOnUsZ2F0aGVyQ29udGV4dDpvLHBhcnNlOnMsU3RhY2s6YSxGcmFtZTppfX0sZnVuY3Rpb24oZSxyLHQpe3ZhciBuLG8saTshZnVuY3Rpb24oYSxzKXtcInVzZSBzdHJpY3RcIjtvPVt0KDcpXSxuPXMsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHIsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkucHJvdG90eXBlLm1hcClyZXR1cm4gZS5tYXAocix0KTtmb3IodmFyIG49bmV3IEFycmF5KGUubGVuZ3RoKSxvPTA7bzxlLmxlbmd0aDtvKyspbltvXT1yLmNhbGwodCxlW29dKTtyZXR1cm4gbn1mdW5jdGlvbiB0KGUscix0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5wcm90b3R5cGUuZmlsdGVyKXJldHVybiBlLmZpbHRlcihyLHQpO2Zvcih2YXIgbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspci5jYWxsKHQsZVtvXSkmJm4ucHVzaChlW29dKTtyZXR1cm4gbn12YXIgbj0vKF58QClcXFMrXFw6XFxkKy8sbz0vXlxccyphdCAuKihcXFMrXFw6XFxkK3xcXChuYXRpdmVcXCkpL20saT0vXihldmFsQCk/KFxcW25hdGl2ZSBjb2RlXFxdKT8kLztyZXR1cm57cGFyc2U6ZnVuY3Rpb24oZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuc3RhY2t0cmFjZXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVbXCJvcGVyYSNzb3VyY2Vsb2NcIl0pcmV0dXJuIHRoaXMucGFyc2VPcGVyYShlKTtpZihlLnN0YWNrJiZlLnN0YWNrLm1hdGNoKG8pKXJldHVybiB0aGlzLnBhcnNlVjhPcklFKGUpO2lmKGUuc3RhY2spcmV0dXJuIHRoaXMucGFyc2VGRk9yU2FmYXJpKGUpO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3RcIil9LGV4dHJhY3RMb2NhdGlvbjpmdW5jdGlvbihlKXtpZihlLmluZGV4T2YoXCI6XCIpPT09LTEpcmV0dXJuW2VdO3ZhciByPWUucmVwbGFjZSgvW1xcKFxcKVxcc10vZyxcIlwiKS5zcGxpdChcIjpcIiksdD1yLnBvcCgpLG49cltyLmxlbmd0aC0xXTtpZighaXNOYU4ocGFyc2VGbG9hdChuKSkmJmlzRmluaXRlKG4pKXt2YXIgbz1yLnBvcCgpO3JldHVybltyLmpvaW4oXCI6XCIpLG8sdF19cmV0dXJuW3Iuam9pbihcIjpcIiksdCx2b2lkIDBdfSxwYXJzZVY4T3JJRTpmdW5jdGlvbihuKXt2YXIgaT10KG4uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuISFlLm1hdGNoKG8pfSx0aGlzKTtyZXR1cm4gcihpLGZ1bmN0aW9uKHIpe3IuaW5kZXhPZihcIihldmFsIFwiKT4tMSYmKHI9ci5yZXBsYWNlKC9ldmFsIGNvZGUvZyxcImV2YWxcIikucmVwbGFjZSgvKFxcKGV2YWwgYXQgW15cXCgpXSopfChcXClcXCwuKiQpL2csXCJcIikpO3ZhciB0PXIucmVwbGFjZSgvXlxccysvLFwiXCIpLnJlcGxhY2UoL1xcKGV2YWwgY29kZS9nLFwiKFwiKS5zcGxpdCgvXFxzKy8pLnNsaWNlKDEpLG49dGhpcy5leHRyYWN0TG9jYXRpb24odC5wb3AoKSksbz10LmpvaW4oXCIgXCIpfHx2b2lkIDAsaT1cImV2YWxcIj09PW5bMF0/dm9pZCAwOm5bMF07cmV0dXJuIG5ldyBlKG8sKHZvaWQgMCksaSxuWzFdLG5bMl0scil9LHRoaXMpfSxwYXJzZUZGT3JTYWZhcmk6ZnVuY3Rpb24obil7dmFyIG89dChuLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiFlLm1hdGNoKGkpfSx0aGlzKTtyZXR1cm4gcihvLGZ1bmN0aW9uKHIpe2lmKHIuaW5kZXhPZihcIiA+IGV2YWxcIik+LTEmJihyPXIucmVwbGFjZSgvIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWxcXDpcXGQrXFw6XFxkKy9nLFwiOiQxXCIpKSxyLmluZGV4T2YoXCJAXCIpPT09LTEmJnIuaW5kZXhPZihcIjpcIik9PT0tMSlyZXR1cm4gbmV3IGUocik7dmFyIHQ9ci5zcGxpdChcIkBcIiksbj10aGlzLmV4dHJhY3RMb2NhdGlvbih0LnBvcCgpKSxvPXQuc2hpZnQoKXx8dm9pZCAwO3JldHVybiBuZXcgZShvLCh2b2lkIDApLG5bMF0sblsxXSxuWzJdLHIpfSx0aGlzKX0scGFyc2VPcGVyYTpmdW5jdGlvbihlKXtyZXR1cm4hZS5zdGFja3RyYWNlfHxlLm1lc3NhZ2UuaW5kZXhPZihcIlxcblwiKT4tMSYmZS5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpLmxlbmd0aD5lLnN0YWNrdHJhY2Uuc3BsaXQoXCJcXG5cIikubGVuZ3RoP3RoaXMucGFyc2VPcGVyYTkoZSk6ZS5zdGFjaz90aGlzLnBhcnNlT3BlcmExMShlKTp0aGlzLnBhcnNlT3BlcmExMChlKX0scGFyc2VPcGVyYTk6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspL2ksbj1yLm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIiksbz1bXSxpPTIsYT1uLmxlbmd0aDtpPGE7aSs9Mil7dmFyIHM9dC5leGVjKG5baV0pO3MmJm8ucHVzaChuZXcgZSgodm9pZCAwKSwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTA6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspKD86OiBJbiBmdW5jdGlvbiAoXFxTKykpPyQvaSxuPXIuc3RhY2t0cmFjZS5zcGxpdChcIlxcblwiKSxvPVtdLGk9MCxhPW4ubGVuZ3RoO2k8YTtpKz0yKXt2YXIgcz10LmV4ZWMobltpXSk7cyYmby5wdXNoKG5ldyBlKHNbM118fHZvaWQgMCwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTE6ZnVuY3Rpb24obyl7dmFyIGk9dChvLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiEhZS5tYXRjaChuKSYmIWUubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyl9LHRoaXMpO3JldHVybiByKGksZnVuY3Rpb24ocil7dmFyIHQsbj1yLnNwbGl0KFwiQFwiKSxvPXRoaXMuZXh0cmFjdExvY2F0aW9uKG4ucG9wKCkpLGk9bi5zaGlmdCgpfHxcIlwiLGE9aS5yZXBsYWNlKC88YW5vbnltb3VzIGZ1bmN0aW9uKDogKFxcdyspKT8+LyxcIiQyXCIpLnJlcGxhY2UoL1xcKFteXFwpXSpcXCkvZyxcIlwiKXx8dm9pZCAwO2kubWF0Y2goL1xcKChbXlxcKV0qKVxcKS8pJiYodD1pLnJlcGxhY2UoL15bXlxcKF0rXFwoKFteXFwpXSopXFwpJC8sXCIkMVwiKSk7dmFyIHM9dm9pZCAwPT09dHx8XCJbYXJndW1lbnRzIG5vdCBhdmFpbGFibGVdXCI9PT10P3ZvaWQgMDp0LnNwbGl0KFwiLFwiKTtyZXR1cm4gbmV3IGUoYSxzLG9bMF0sb1sxXSxvWzJdLHIpfSx0aGlzKX19fSl9LGZ1bmN0aW9uKGUscix0KXt2YXIgbixvLGk7IWZ1bmN0aW9uKHQsYSl7XCJ1c2Ugc3RyaWN0XCI7bz1bXSxuPWEsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSl9ZnVuY3Rpb24gcihlLHIsdCxuLG8saSl7dm9pZCAwIT09ZSYmdGhpcy5zZXRGdW5jdGlvbk5hbWUoZSksdm9pZCAwIT09ciYmdGhpcy5zZXRBcmdzKHIpLHZvaWQgMCE9PXQmJnRoaXMuc2V0RmlsZU5hbWUodCksdm9pZCAwIT09biYmdGhpcy5zZXRMaW5lTnVtYmVyKG4pLHZvaWQgMCE9PW8mJnRoaXMuc2V0Q29sdW1uTnVtYmVyKG8pLHZvaWQgMCE9PWkmJnRoaXMuc2V0U291cmNlKGkpfXJldHVybiByLnByb3RvdHlwZT17Z2V0RnVuY3Rpb25OYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnVuY3Rpb25OYW1lfSxzZXRGdW5jdGlvbk5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5mdW5jdGlvbk5hbWU9U3RyaW5nKGUpfSxnZXRBcmdzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXJnc30sc2V0QXJnczpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3MgbXVzdCBiZSBhbiBBcnJheVwiKTt0aGlzLmFyZ3M9ZX0sZ2V0RmlsZU5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWxlTmFtZX0sc2V0RmlsZU5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5maWxlTmFtZT1TdHJpbmcoZSl9LGdldExpbmVOdW1iZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5saW5lTnVtYmVyfSxzZXRMaW5lTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyXCIpO3RoaXMubGluZU51bWJlcj1OdW1iZXIocil9LGdldENvbHVtbk51bWJlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbHVtbk51bWJlcn0sc2V0Q29sdW1uTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDb2x1bW4gTnVtYmVyIG11c3QgYmUgYSBOdW1iZXJcIik7dGhpcy5jb2x1bW5OdW1iZXI9TnVtYmVyKHIpfSxnZXRTb3VyY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb3VyY2V9LHNldFNvdXJjZTpmdW5jdGlvbihlKXt0aGlzLnNvdXJjZT1TdHJpbmcoZSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5nZXRGdW5jdGlvbk5hbWUoKXx8XCJ7YW5vbnltb3VzfVwiLHQ9XCIoXCIrKHRoaXMuZ2V0QXJncygpfHxbXSkuam9pbihcIixcIikrXCIpXCIsbj10aGlzLmdldEZpbGVOYW1lKCk/XCJAXCIrdGhpcy5nZXRGaWxlTmFtZSgpOlwiXCIsbz1lKHRoaXMuZ2V0TGluZU51bWJlcigpKT9cIjpcIit0aGlzLmdldExpbmVOdW1iZXIoKTpcIlwiLGk9ZSh0aGlzLmdldENvbHVtbk51bWJlcigpKT9cIjpcIit0aGlzLmdldENvbHVtbk51bWJlcigpOlwiXCI7cmV0dXJuIHIrdCtuK28raX19LHJ9KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7cmV0dXJue30udG9TdHJpbmcuY2FsbChlKS5tYXRjaCgvXFxzKFthLXpBLVpdKykvKVsxXS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gbihlKT09PXJ9ZnVuY3Rpb24gaShlKXtpZighbyhlLFwic3RyaW5nXCIpKXRocm93IG5ldyBFcnJvcihcInJlY2VpdmVkIGludmFsaWQgaW5wdXRcIik7Zm9yKHZhciByPWwsdD1yLnBhcnNlcltyLnN0cmljdE1vZGU/XCJzdHJpY3RcIjpcImxvb3NlXCJdLmV4ZWMoZSksbj17fSxpPTE0O2ktLTspbltyLmtleVtpXV09dFtpXXx8XCJcIjtyZXR1cm4gbltyLnEubmFtZV09e30sbltyLmtleVsxMl1dLnJlcGxhY2Uoci5xLnBhcnNlcixmdW5jdGlvbihlLHQsbyl7dCYmKG5bci5xLm5hbWVdW3RdPW8pfSksbn1mdW5jdGlvbiBhKGUpe3ZhciByPWkoZSk7cmV0dXJuXCJcIj09PXIuYW5jaG9yJiYoci5zb3VyY2U9ci5zb3VyY2UucmVwbGFjZShcIiNcIixcIlwiKSksZT1yLnNvdXJjZS5yZXBsYWNlKFwiP1wiK3IucXVlcnksXCJcIil9ZnVuY3Rpb24gcyhlLHIpe3ZhciB0LG4saSxhPW8oZSxcIm9iamVjdFwiKSx1PW8oZSxcImFycmF5XCIpLGM9W107aWYoYSlmb3IodCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJmMucHVzaCh0KTtlbHNlIGlmKHUpZm9yKGk9MDtpPGUubGVuZ3RoOysraSljLnB1c2goaSk7Zm9yKGk9MDtpPGMubGVuZ3RoOysraSl0PWNbaV0sbj1lW3RdLGE9byhuLFwib2JqZWN0XCIpLHU9byhuLFwiYXJyYXlcIiksYXx8dT9lW3RdPXMobixyKTplW3RdPXIodCxuKTtyZXR1cm4gZX1mdW5jdGlvbiB1KGUpe3JldHVybiBlPVN0cmluZyhlKSxuZXcgQXJyYXkoZS5sZW5ndGgrMSkuam9pbihcIipcIil9ZnVuY3Rpb24gYygpe3ZhciBlPShuZXcgRGF0ZSkuZ2V0VGltZSgpLHI9XCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2csZnVuY3Rpb24ocil7dmFyIHQ9KGUrMTYqTWF0aC5yYW5kb20oKSklMTZ8MDtyZXR1cm4gZT1NYXRoLmZsb29yKGUvMTYpLChcInhcIj09PXI/dDo3JnR8OCkudG9TdHJpbmcoMTYpfSk7cmV0dXJuIHJ9dCg5KTt2YXIgbD17c3RyaWN0TW9kZTohMSxrZXk6W1wic291cmNlXCIsXCJwcm90b2NvbFwiLFwiYXV0aG9yaXR5XCIsXCJ1c2VySW5mb1wiLFwidXNlclwiLFwicGFzc3dvcmRcIixcImhvc3RcIixcInBvcnRcIixcInJlbGF0aXZlXCIsXCJwYXRoXCIsXCJkaXJlY3RvcnlcIixcImZpbGVcIixcInF1ZXJ5XCIsXCJhbmNob3JcIl0scTp7bmFtZTpcInF1ZXJ5S2V5XCIscGFyc2VyOi8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZ30scGFyc2VyOntzdHJpY3Q6L14oPzooW146XFwvPyNdKyk6KT8oPzpcXC9cXC8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykpPygoKCg/OltePyNcXC9dKlxcLykqKShbXj8jXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLyxsb29zZTovXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS99fSxwPXtpc1R5cGU6byxwYXJzZVVyaTppLHBhcnNlVXJpT3B0aW9uczpsLHJlZGFjdDp1LHNhbml0aXplVXJsOmEsdHJhdmVyc2U6cyx0eXBlTmFtZTpuLHV1aWQ0OmN9O2UuZXhwb3J0cz1wfSxmdW5jdGlvbihlLHIpeyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtlLmNvbnNvbGU9ZS5jb25zb2xlfHx7fTtmb3IodmFyIHIsdCxuPWUuY29uc29sZSxvPXt9LGk9ZnVuY3Rpb24oKXt9LGE9XCJtZW1vcnlcIi5zcGxpdChcIixcIikscz1cImFzc2VydCxjbGVhcixjb3VudCxkZWJ1ZyxkaXIsZGlyeG1sLGVycm9yLGV4Y2VwdGlvbixncm91cCxncm91cENvbGxhcHNlZCxncm91cEVuZCxpbmZvLGxvZyxtYXJrVGltZWxpbmUscHJvZmlsZSxwcm9maWxlcyxwcm9maWxlRW5kLHNob3csdGFibGUsdGltZSx0aW1lRW5kLHRpbWVsaW5lLHRpbWVsaW5lRW5kLHRpbWVTdGFtcCx0cmFjZSx3YXJuXCIuc3BsaXQoXCIsXCIpO3I9YS5wb3AoKTspbltyXXx8KG5bcl09byk7Zm9yKDt0PXMucG9wKCk7KW5bdF18fChuW3RdPWkpfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3RoaXM6d2luZG93KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7YT1lfWZ1bmN0aW9uIG8oZSl7dGhpcy5uYW1lPVwiQ29ubmVjdGlvbiBFcnJvclwiLHRoaXMubWVzc2FnZT1lLHRoaXMuc3RhY2s9KG5ldyBFcnJvcikuc3RhY2t9dmFyIGk9dCg4KSxhPW51bGw7by5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPW87dmFyIHM9e1hNTEh0dHBGYWN0b3JpZXM6W2Z1bmN0aW9uKCl7cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdH0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDIuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDMuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKX1dLGNyZWF0ZVhNTEhUVFBPYmplY3Q6ZnVuY3Rpb24oKXt2YXIgZSxyPSExLHQ9cy5YTUxIdHRwRmFjdG9yaWVzLG49dC5sZW5ndGg7Zm9yKGU9MDtlPG47ZSsrKXRyeXtyPXRbZV0oKTticmVha31jYXRjaChvKXt9cmV0dXJuIHJ9LHBvc3Q6ZnVuY3Rpb24oZSxyLHQsbil7aWYoIWkuaXNUeXBlKHQsXCJvYmplY3RcIikpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYW4gb2JqZWN0IHRvIFBPU1RcIik7dD1hLnN0cmluZ2lmeSh0KSxuPW58fGZ1bmN0aW9uKCl7fTt2YXIgdT1zLmNyZWF0ZVhNTEhUVFBPYmplY3QoKTtpZih1KXRyeXt0cnl7dmFyIGM9ZnVuY3Rpb24oKXt0cnl7aWYoYyYmND09PXUucmVhZHlTdGF0ZSl7Yz12b2lkIDA7dmFyIGU9YS5wYXJzZSh1LnJlc3BvbnNlVGV4dCk7MjAwPT09dS5zdGF0dXM/bihudWxsLGUpOmkuaXNUeXBlKHUuc3RhdHVzLFwibnVtYmVyXCIpJiZ1LnN0YXR1cz49NDAwJiZ1LnN0YXR1czw2MDA/KDQwMz09dS5zdGF0dXMmJmNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06XCIrZS5tZXNzYWdlKSxuKG5ldyBFcnJvcihTdHJpbmcodS5zdGF0dXMpKSkpOm4obmV3IG8oXCJYSFIgcmVzcG9uc2UgaGFkIG5vIHN0YXR1cyBjb2RlIChsaWtlbHkgY29ubmVjdGlvbiBmYWlsdXJlKVwiKSl9fWNhdGNoKHIpe3ZhciB0O3Q9ciYmci5zdGFjaz9yOm5ldyBFcnJvcihyKSxuKHQpfX07dS5vcGVuKFwiUE9TVFwiLGUsITApLHUuc2V0UmVxdWVzdEhlYWRlciYmKHUuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvblwiKSx1LnNldFJlcXVlc3RIZWFkZXIoXCJYLVJvbGxiYXItQWNjZXNzLVRva2VuXCIscikpLHUub25yZWFkeXN0YXRlY2hhbmdlPWMsdS5zZW5kKHQpfWNhdGNoKGwpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBYRG9tYWluUmVxdWVzdCl7XCJodHRwOlwiPT09d2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKDAsNSkmJlwiaHR0cHNcIj09PWUuc3Vic3RyaW5nKDAsNSkmJihlPVwiaHR0cFwiK2Uuc3Vic3RyaW5nKDUpKTt2YXIgcD1mdW5jdGlvbigpe24obmV3IG8oXCJSZXF1ZXN0IHRpbWVkIG91dFwiKSl9LGY9ZnVuY3Rpb24oKXtuKG5ldyBFcnJvcihcIkVycm9yIGR1cmluZyByZXF1ZXN0XCIpKX0sZD1mdW5jdGlvbigpe24obnVsbCxhLnBhcnNlKHUucmVzcG9uc2VUZXh0KSl9O3U9bmV3IFhEb21haW5SZXF1ZXN0LHUub25wcm9ncmVzcz1mdW5jdGlvbigpe30sdS5vbnRpbWVvdXQ9cCx1Lm9uZXJyb3I9Zix1Lm9ubG9hZD1kLHUub3BlbihcIlBPU1RcIixlLCEwKSx1LnNlbmQodCl9fX1jYXRjaChoKXtuKGgpfX19O2UuZXhwb3J0cz17WEhSOnMsc2V0dXBKU09OOm4sQ29ubmVjdGlvbkVycm9yOm99fV0pfSk7IiwidmFyIFZpc2lvblNpbXVsYXRpb24gPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvblwiKTtcbnZhciB3b3JsZGRhdGEgPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvd29ybGRkYXRhLmpzb25cIik7XG52YXIgZ2V0TGlnaHRVbmlvbiA9IHJlcXVpcmUoXCIuL2dldExpZ2h0VW5pb25cIik7XG52YXIgUXVlcnlTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWwvcXVlcnlTdHJpbmcnKTtcbnZhciBSb2xsYmFyID0gcmVxdWlyZShcInJvbGxiYXItYnJvd3NlclwiKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi91dGlsL3RyaW0nKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vdXRpbC9kZWJvdW5jZScpO1xudmFyIGdldEpTT04gPSByZXF1aXJlKCcuL3V0aWwvZ2V0SlNPTicpO1xuXG4vLyBlcnJvciByZXBvcnRpbmdcbnZhciByb2xsYmFyQ29uZmlnID0ge1xuICAgIGFjY2Vzc1Rva2VuOiAnZmU3Y2YzMjdmMmIyNGJiODk5MWUyNTIyMzlmNjIwMGYnLFxuICAgIGNhcHR1cmVVbmNhdWdodDogdHJ1ZSxcbiAgICBpZ25vcmVkTWVzc2FnZXM6IFtcbiAgICAgICAgXCJFcnJvcjogIERPTSBFeGNlcHRpb24gMThcIixcbiAgICAgICAgXCJTZWN1cml0eUVycm9yOiBET00gRXhjZXB0aW9uIDE4OiBBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIGJyZWFrIHRocm91Z2ggdGhlIHNlY3VyaXR5IHBvbGljeSBvZiB0aGUgdXNlciBhZ2VudC5cIixcbiAgICAgICAgXCJTZWN1cml0eUVycm9yOiAgQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBicmVhayB0aHJvdWdoIHRoZSBzZWN1cml0eSBwb2xpY3kgb2YgdGhlIHVzZXIgYWdlbnQuXCIsXG4gICAgICAgIFwiU2NyaXB0IGVycm9yLlwiXG4gICAgXSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICAgIGVudmlyb25tZW50OiAncHJvZHVjdGlvbicsXG4gICAgICAgIGNsaWVudDoge1xuICAgICAgICAgICAgamF2YXNjcmlwdDoge1xuICAgICAgICAgICAgICAgIHNvdXJjZV9tYXBfZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2RlX3ZlcnNpb246IFwiMTM1MzI0ZjNmYWE3MWEyMzE2Y2Q3ZTQ3NjBkNjhmNjMzNGQ3ZWYxY1wiLFxuICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgaGF2ZSBSb2xsYmFyIGd1ZXNzIHdoaWNoIGZyYW1lcyB0aGUgZXJyb3Igd2FzIHRocm93biBmcm9tXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgYnJvd3NlciBkb2VzIG5vdCBwcm92aWRlIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzLlxuICAgICAgICAgICAgICAgIGd1ZXNzX3VuY2F1Z2h0X2ZyYW1lczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhc3QtdXBkYXRlJykuaW5uZXJIVE1MID0gXCIyMDE3LTAxLTAxIDA0OjUwOjM5IFVUQ1wiO1xuICAgIFxudmFyIHJvbGxiYXIgPSBSb2xsYmFyLmluaXQocm9sbGJhckNvbmZpZyk7XG4gICAgXG5mdW5jdGlvbiBBcHAobWFwX3RpbGVfcGF0aCwgdmlzaW9uX2RhdGFfaW1hZ2VfcGF0aCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgSU1HX0RJUiA9IFwiaW1nL1wiLFxuICAgICAgICBFTlRJVElFUyA9IHtcbiAgICAgICAgICAgIG9ic2VydmVyOiB7XG4gICAgICAgICAgICAgICAgaWNvbl9wYXRoOiBJTUdfRElSICsgXCJ3YXJkX29ic2VydmVyLnBuZ1wiLFxuICAgICAgICAgICAgICAgIHJhZGl1czogMTYwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbnRyeToge1xuICAgICAgICAgICAgICAgIGljb25fcGF0aDogSU1HX0RJUiArIFwid2FyZF9zZW50cnkucG5nXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiA4NTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgREFSS05FU1NfVklTSU9OX1JBRElVUyA9IDY3NSxcbiAgICAgICAgVE9XRVJfREFZX1ZJU0lPTl9SQURJVVMgPSAxOTAwLFxuICAgICAgICBUT1dFUl9OSUdIVF9WSVNJT05fUkFESVVTID0gODAwLFxuICAgICAgICBUT1dFUl90cnVlU2lnaHQgPSA3MDAsXG4gICAgICAgIFRPV0VSX0FUVEFDS19SQU5HRV9SQURJVVMgPSA3MDAsXG4gICAgICAgIG1hcF9kYXRhX3BhdGggPSBcImRhdGEvXCIsXG4gICAgICAgIG1hcF9kYXRhLFxuICAgICAgICBtYXBDb25zdGFudHMgPSByZXF1aXJlKCcuL21hcENvbnN0YW50cycpLFxuICAgICAgICBjb252ZXJzaW9uRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9uRnVuY3Rpb25zJyksXG4gICAgICAgIG1hcEJvdW5kcyA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcygwLCAwLCBtYXBDb25zdGFudHMubWFwX3csIG1hcENvbnN0YW50cy5tYXBfaCksXG4gICAgICAgIG1hcCA9IG5ldyBPcGVuTGF5ZXJzLk1hcChcIm1hcDFcIiwge1xuICAgICAgICAgICAgdGhlbWU6IG51bGwsXG4gICAgICAgICAgICBtYXhFeHRlbnQ6IG1hcEJvdW5kcyxcbiAgICAgICAgICAgIG51bVpvb21MZXZlbHM6IDUsXG4gICAgICAgICAgICBtYXhSZXNvbHV0aW9uOiBNYXRoLnBvdygyLCA1LTEgKSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1cIixcbiAgICAgICAgICAgIHRpbGVNYW5hZ2VyOiB7XG4gICAgICAgICAgICAgICAgY2FjaGVTaXplOiA1NDU2LFxuICAgICAgICAgICAgICAgIG1vdmVEZWxheTogMCxcbiAgICAgICAgICAgICAgICB6b29tRGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgZnJhbWVEZWxheTogMCxcbiAgICAgICAgICAgICAgICB0aWxlc1BlckZyYW1lOiAxMjhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGxheWVyS2V5cyA9IFtcbiAgICAgICAgICAgIFwibm9fd2FyZHNcIixcbiAgICAgICAgICAgIFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIixcbiAgICAgICAgICAgIFwidHJpZ2dlcl9tdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9uZXV0cmFsX3NwYXduZXJcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9yb3NoYW5fc3Bhd25lclwiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXBcIixcbiAgICAgICAgICAgIFwiZG90YV9pdGVtX3J1bmVfc3Bhd25lcl9ib3VudHlcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfZm91bnRhaW5cIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfc2hvcFwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9iYXJyYWNrc1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9maWxsZXJcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfaGVhbGVyXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX2ZvcnRcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfdG93ZXJcIlxuICAgICAgICBdLFxuICAgICAgICBsYXllck5hbWVzID0ge1xuICAgICAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXA6IFwiUnVuZXNcIixcbiAgICAgICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5OiBcIkJvdW50eSBSdW5lc1wiLFxuICAgICAgICAgICAgZW50X2RvdGFfdHJlZTogXCJUcmVlc1wiLFxuICAgICAgICAgICAgbnBjX2RvdGFfaGVhbGVyOiBcIlNocmluZXNcIixcbiAgICAgICAgICAgIGVudF9kb3RhX2ZvdW50YWluOiBcIkZvdW50YWluXCIsXG4gICAgICAgICAgICBucGNfZG90YV9mb3J0OiBcIkFuY2llbnRzXCIsXG4gICAgICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BzXCIsXG4gICAgICAgICAgICBucGNfZG90YV90b3dlcjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2JhcnJhY2tzOiBcIkJhcnJhY2tzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9maWxsZXI6IFwiQnVpbGRpbmdzXCIsXG4gICAgICAgICAgICB0cmlnZ2VyX211bHRpcGxlOiBcIk5ldXRyYWwgU3Bhd24gQm94ZXNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX25ldXRyYWxfc3Bhd25lcjogXCJOZXV0cmFsIENhbXBzXCIsXG4gICAgICAgICAgICBub193YXJkczogXCJJbnZhbGlkIFdhcmQgTG9jYXRpb25zXCIsXG4gICAgICAgICAgICBlbnRfZm93X2Jsb2NrZXJfbm9kZTogXCJWaXNpb24gQmxvY2tlclwiXG4gICAgICAgIH0sXG4gICAgICAgIGJhc2VMYXllcnNPcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogXCJqcGdcIlxuICAgICAgICB9LFxuICAgICAgICBiYXNlTGF5ZXJzQ29uZmlnID0gW1xuICAgICAgICAgICAgWyc3LjAwIERlZmF1bHQnLCAnNzAwJywgJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgIFsnNy4wMCBOZXcgSm91cm5leScsICc3MDAnLCAnam91cm5leSddLFxuICAgICAgICAgICAgWyc2Ljg3JywgJzY4NycsICdkZWZhdWx0J10sXG4gICAgICAgICAgICBbJzYuODcgRGVzZXJ0JywgJzY4NycsICdkZXNlcnQnXSxcbiAgICAgICAgICAgIFsnNi44NyBJbW1vcnRhbCBHYXJkZW5zJywgJzY4NycsICdpbW1vcnRhbGdhcmRlbnMnXVxuICAgICAgICBdLFxuICAgICAgICBiYXNlTGF5ZXJzID0gYmFzZUxheWVyc0NvbmZpZy5tYXAoZnVuY3Rpb24gKGJhc2VMYXllckNvbmZpZykge1xuICAgICAgICAgICAgdmFyIGJhc2VMYXllck9wdGlvbnMgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICBnZXRVUkw6IGdldE15VVJMKGJhc2VMYXllckNvbmZpZ1sxXSwgYmFzZUxheWVyQ29uZmlnWzJdKVxuICAgICAgICAgICAgfSwgYmFzZUxheWVyc09wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcGVuTGF5ZXJzLkxheWVyLlRNUyhiYXNlTGF5ZXJDb25maWdbMF0sIG1hcF90aWxlX3BhdGgsIGJhc2VMYXllck9wdGlvbnMpO1xuICAgICAgICB9KSxcbiAgICAgICAgb3ZlcmxheUdyb3VwaW5nID0ge1xuICAgICAgICAgICAgXCJEYXkgVmlzaW9uIFJhbmdlXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIk5pZ2h0IFZpc2lvbiBSYW5nZVwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJUcnVlIFNpZ2h0IFJhbmdlXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIkF0dGFjayBSYW5nZVwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJGb3VudGFpblwiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiVG93ZXJzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJTaHJpbmVzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJBbmNpZW50c1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiQmFycmFja3NcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkJ1aWxkaW5nc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiU2hvcHNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkludmFsaWQgV2FyZCBMb2NhdGlvbnNcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiVmlzaW9uIEJsb2NrZXJcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiUGxhY2VkIFdhcmRzXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIldhcmQgVmlzaW9uXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIldhcmQgVmlzaW9uIHdpdGggRm9nXCI6IFwiVmlzaW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbl9wYXRocyA9IHtcbiAgICAgICAgICAgIFwiZW50X2RvdGFfZm91bnRhaW5cIjogSU1HX0RJUiArIFwic3Zncy93YXRlci0xNS5zdmdcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiOiBJTUdfRElSICsgXCJzdmdzL3BhcmstMTUuc3ZnXCIsXG4gICAgICAgICAgICBcImVudF9kb3RhX3RyZWVfY3V0XCI6IElNR19ESVIgKyBcInN0dW1wLnN2Z1wiLFxuICAgICAgICAgICAgXCJlbnRfZG90YV9zaG9wXCI6IElNR19ESVIgKyBcInN2Z3Mvc2hvcC0xNS5zdmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyXCI6IElNR19ESVIgKyBcInN2Z3MvanVuZ2xlXzEuc3ZnXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX3Rvd2VyXCI6IElNR19ESVIgKyBcInN2Z3MvY2FzdGxlLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9oZWFsZXJcIjogSU1HX0RJUiArIFwic3Zncy9wbGFjZS1vZi13b3JzaGlwLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9mb3J0XCI6IElNR19ESVIgKyBcInN2Z3MvdG93bi1oYWxsLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9maWxsZXJcIjogSU1HX0RJUiArIFwic3Zncy9sYW5kbWFyay0xNS5zdmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYmFycmFja3NcIjogSU1HX0RJUiArIFwic3Zncy9zdGFkaXVtLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXBcIjogSU1HX0RJUiArIFwiZG91YmxlZGFtYWdlLnBuZ1wiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX2JvdW50eVwiOiBJTUdfRElSICsgXCJib3VudHlydW5lLnBuZ1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9yb3NoYW5fc3Bhd25lclwiOiBJTUdfRElSICsgXCJyb3NoYW4ucG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGF5ZXJTd2l0Y2hlciA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTGF5ZXJTd2l0Y2hlcih7XG4gICAgICAgICAgICBkaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdmVybGF5cy1jb250YWluZXInKSxcbiAgICAgICAgICAgIGFzY2VuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBvdmVybGF5R3JvdXBpbmc6IG92ZXJsYXlHcm91cGluZyxcbiAgICAgICAgICAgIG9uTWF4aW1pemVXaGVuU21hbGxTY3JlZW46IG1pbmltaXplQ29udHJvbExpc3QuYmluZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKSlcbiAgICAgICAgfSksXG4gICAgICAgIGNvb3JkaW5hdGVDb250cm9sID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5Nb3VzZVBvc2l0aW9uKCksXG4gICAgICAgIGN1cnNvckxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQ3Vyc29yXCIsIHtkaXNwbGF5SW5MYXllclN3aXRjaGVyOmZhbHNlfSksXG4gICAgICAgIGRheVJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEYXkgVmlzaW9uIFJhbmdlXCIpLFxuICAgICAgICBuaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJOaWdodCBWaXNpb24gUmFuZ2VcIiksXG4gICAgICAgIHRydWVTaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJUcnVlIFNpZ2h0IFJhbmdlXCIpLFxuICAgICAgICBhdHRhY2tSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQXR0YWNrIFJhbmdlXCIpLFxuICAgICAgICBwb2x5Z29uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEcmF3biBDaXJjbGVzXCIpLFxuICAgICAgICB3YXJkVmlzaW9uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJXYXJkIFZpc2lvblwiKSxcbiAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiV2FyZCBWaXNpb24gd2l0aCBGb2dcIiksXG4gICAgICAgIGljb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLk1hcmtlcnMoXCJQbGFjZWQgV2FyZHNcIiksXG4gICAgICAgIHJlbmRlcmVyID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLnJlbmRlcmVyLFxuICAgICAgICBkcmF3Q29udHJvbHMsXG4gICAgICAgIGxhc3REaXN0YW5jZSxcbiAgICAgICAgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlQ29uc3RhbnRzJyksXG4gICAgICAgIHRyZWVNYXJrZXJzID0ge30sXG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gdHJ1ZSxcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT05fQUxXQVlTID0gdHJ1ZSxcbiAgICAgICAgREFSS05FU1MgPSBmYWxzZSxcbiAgICAgICAgTklHSFRUSU1FID0gZmFsc2UsXG4gICAgICAgIGN1dFRyZWVzID0ge307XG5cbiAgICAgICAgY29uc29sZS5sb2cobWFwLnRpbGVNYW5hZ2VyKTtcbiAgICAgICAgXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogQ09PUkRJTkFURSBDT05WRVJTSU9OIEZVTkNUSU9OUyAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdmFyIHJldmVyc2VMZXJwID0gY29udmVyc2lvbkZ1bmN0aW9ucy5yZXZlcnNlTGVycCxcbiAgICAgICAgbGF0TG9uVG9Xb3JsZCA9IGNvbnZlcnNpb25GdW5jdGlvbnMubGF0TG9uVG9Xb3JsZCxcbiAgICAgICAgd29ybGRUb0xhdExvbiA9IGNvbnZlcnNpb25GdW5jdGlvbnMud29ybGRUb0xhdExvbixcbiAgICAgICAgZ2V0VGlsZVJhZGl1cyA9IGNvbnZlcnNpb25GdW5jdGlvbnMuZ2V0VGlsZVJhZGl1cyxcbiAgICAgICAgZ2V0U2NhbGVkUmFkaXVzID0gY29udmVyc2lvbkZ1bmN0aW9ucy5nZXRTY2FsZWRSYWRpdXMsXG4gICAgICAgIGNhbGN1bGF0ZURpc3RhbmNlID0gY29udmVyc2lvbkZ1bmN0aW9ucy5jYWxjdWxhdGVEaXN0YW5jZTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENPTlRST0wgSEFORExFUlMgKlxuICAgICAqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XG4gICAgICAgIHZhciB3YWl0ID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBpZiAoIXdhaXQpIHtcbiAgICAgICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHdhaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB3YWl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSwgbGltaXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHZhciB3YXJkUmVjZW50bHlSZW1vdmVkID0gZmFsc2U7XG4gICAgXG4gICAgLy8gY2FsbGVkIGJ5IGhhbmRsZXJzIHRvIHByZXZlbnQgZXZlbnQgcHJvcG9nYXRpb24gdG8gb2JzZXJ2ZXIgYW5kIHNlbnRyeSBjbGljayBjb250cm9sc1xuICAgIGZ1bmN0aW9uIGNsZWFyQ2xpY2tDb250cm9sKCkge1xuICAgICAgICBpZiAoZHJhd0NvbnRyb2xzWydvYnNlcnZlciddLmFjdGl2ZSkge1xuICAgICAgICAgICAgZHJhd0NvbnRyb2xzWydvYnNlcnZlciddLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIGRyYXdDb250cm9sc1snb2JzZXJ2ZXInXS5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkcmF3Q29udHJvbHNbJ3NlbnRyeSddLmFjdGl2ZSkge1xuICAgICAgICAgICAgZHJhd0NvbnRyb2xzWydzZW50cnknXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNbJ3NlbnRyeSddLmFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUcmVlTWFya2VyQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZVRyZWVNYXJrZXJDbGljaycsIGV2ZW50LCB0aGlzKTtcbiAgICAgICAgY3Vyc29yTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIHNldFRyZWVNYXJrZXJTdGF0ZSh0aGlzLCAhdGhpcy50cmVlVmlzaWJsZSk7XG4gICAgICAgIHNldFRyZWVRdWVyeVN0cmluZygpO1xuICAgICAgICBPcGVuTGF5ZXJzLkV2ZW50LnN0b3AoZXZlbnQpO1xuICAgICAgICBjbGVhckNsaWNrQ29udHJvbCgpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzZXRUcmVlTWFya2VyU3RhdGUobWFya2VyLCBzdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0VHJlZU1hcmtlclN0YXRlJywgbWFya2VyKTtcbiAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKG1hcmtlci5sb25sYXQubG9uLCBtYXJrZXIubG9ubGF0LmxhdCk7XG5cbiAgICAgICAgbWFya2VyLnRyZWVWaXNpYmxlID0gc3RhdGU7XG4gICAgICAgIG1hcmtlci5zZXRVcmwoc3RhdGUgPyBpY29uX3BhdGhzLmVudF9kb3RhX3RyZWUgOiBpY29uX3BhdGhzLmVudF9kb3RhX3RyZWVfY3V0KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgICAgICB2cy50b2dnbGVUcmVlKGdyaWRYWS54LCBncmlkWFkueSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9wdXBDb250ZW50SFRNTCA9IFwiQ2xpY2sgdG8gY3V0IGRvd24gdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIjtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgY3V0VHJlZXNbbWFya2VyLnRyZWVfbG9jXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCA9IFwiQ2xpY2sgdG8gcmVncm93IHRyZWUuPGJyPlRoaXMgd2lsbCBhZmZlY3QgdGhlIHdhcmQgdmlzaW9uIHNpbXVsYXRpb24uXCI7XG4gICAgICAgICAgICBjdXRUcmVlc1ttYXJrZXIudHJlZV9sb2NdID0gbWFya2VyO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBpZiAobWFya2VyLmZlYXR1cmUucG9wdXApIHtcbiAgICAgICAgICAgIG1hcmtlci5mZWF0dXJlLnBvcHVwLnNldENvbnRlbnRIVE1MKHBvcHVwQ29udGVudEhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFZpc2lvbkNpcmNsZShsYXllciwgbWFya2VyLCByYWRpdXMsIHByb3BlcnR5LCBzdHlsZSkge1xuICAgICAgICB2YXIgY2VudGVyID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobWFya2VyLmxvbmxhdC5sb24sIG1hcmtlci5sb25sYXQubGF0KTtcbiAgICAgICAgdmFyIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhyYWRpdXMpLCAzMCk7XG4gICAgICAgIHZhciBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlLCBudWxsLCBzdHlsZSk7XG4gICAgICAgIGxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICBpZiAobWFya2VyW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgbGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICBtYXJrZXJbcHJvcGVydHldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXJbcHJvcGVydHldID0gZmVhdHVyZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkQnVpbGRpbmdWaXNpb25GZWF0dXJlcyhtYXJrZXIsIHNraXBEYXksIHNraXBOaWdodCwgc2tpcFRydWVTaWdodCwgc2tpcEF0dGFjaykge1xuICAgICAgICB2YXIgZGF5VmlzaW9uID0gREFSS05FU1MgPyBNYXRoLm1pbihtYXJrZXIuZGF5VmlzaW9uLCBEQVJLTkVTU19WSVNJT05fUkFESVVTKSA6IG1hcmtlci5kYXlWaXNpb247XG4gICAgICAgIHZhciBuaWdodFZpc2lvbiA9IERBUktORVNTID8gTWF0aC5taW4obWFya2VyLm5pZ2h0VmlzaW9uLCBEQVJLTkVTU19WSVNJT05fUkFESVVTKSA6IG1hcmtlci5uaWdodFZpc2lvbjtcbiAgICAgICAgdmFyIHRydWVTaWdodCA9IG1hcmtlci50cnVlU2lnaHQ7XG4gICAgICAgIHZhciBhdHRhY2tSYW5nZSA9IG1hcmtlci5hdHRhY2tSYW5nZTtcbiAgICAgICAgXG4gICAgICAgIGlmICghc2tpcERheSAmJiBtYXJrZXIuZGF5VmlzaW9uKSBhZGRWaXNpb25DaXJjbGUoZGF5UmFuZ2VMYXllciwgbWFya2VyLCBkYXlWaXNpb24sICdkYXlfdmlzaW9uX2ZlYXR1cmUnLCBzdHlsZS5kYXkpO1xuICAgICAgICBpZiAoIXNraXBOaWdodCAmJiBtYXJrZXIubmlnaHRWaXNpb24pIGFkZFZpc2lvbkNpcmNsZShuaWdodFJhbmdlTGF5ZXIsIG1hcmtlciwgbmlnaHRWaXNpb24sICduaWdodF92aXNpb25fZmVhdHVyZScsIHN0eWxlLm5pZ2h0KTtcbiAgICAgICAgaWYgKCFza2lwVHJ1ZVNpZ2h0ICYmIG1hcmtlci50cnVlU2lnaHQpIGFkZFZpc2lvbkNpcmNsZSh0cnVlU2lnaHRSYW5nZUxheWVyLCBtYXJrZXIsIHRydWVTaWdodCwgJ3RydWVfc2lnaHRfZmVhdHVyZScsIHN0eWxlLnRydWVfc2lnaHQpO1xuICAgICAgICBpZiAoIXNraXBBdHRhY2sgJiYgbWFya2VyLmF0dGFja1JhbmdlKSBhZGRWaXNpb25DaXJjbGUoYXR0YWNrUmFuZ2VMYXllciwgbWFya2VyLCBhdHRhY2tSYW5nZSwgJ2F0dGFja19yYW5nZV9mZWF0dXJlJywgc3R5bGUuYXR0YWNrX3JhbmdlKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgaWYgKE5JR0hUVElNRSAmJiAhc2tpcE5pZ2h0ICYmIG1hcmtlci5uaWdodFZpc2lvbikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKG1hcmtlci5sb25sYXQsIG1hcmtlciwgbmlnaHRWaXNpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIU5JR0hUVElNRSAmJiAhc2tpcERheSAmJiBtYXJrZXIuZGF5VmlzaW9uKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobWFya2VyLmxvbmxhdCwgbWFya2VyLCBkYXlWaXNpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG93ZXJNYXJrZXJDbGljayhldmVudCwgc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVUb3dlck1hcmtlckNsaWNrJywgZXZlbnQpO1xuICAgICAgICBjdXJzb3JMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IGV2ZW50Lm9iamVjdDtcbiAgICAgICAgaWYgKCFtYXJrZXIuc2hvd0luZm8pIHtcbiAgICAgICAgICAgIGFkZEJ1aWxkaW5nVmlzaW9uRmVhdHVyZXMobWFya2VyKTtcbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5hZGRRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIG1hcmtlci50b3dlcl9sb2MueCArICcsJyArIG1hcmtlci50b3dlcl9sb2MueSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXlSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci5kYXlfdmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICAgICAgbmlnaHRSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci5uaWdodF92aXNpb25fZmVhdHVyZSk7XG4gICAgICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci50cnVlX3NpZ2h0X2ZlYXR1cmUpO1xuICAgICAgICAgICAgYXR0YWNrUmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIuYXR0YWNrX3JhbmdlX2ZlYXR1cmUpO1xuXG4gICAgICAgICAgICBpZiAobWFya2VyLnZpc2lvbl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLnZpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSk7XG4gICAgICBcbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIG1hcmtlci50b3dlcl9sb2MueCArICcsJyArIG1hcmtlci50b3dlcl9sb2MueSk7XG4gICAgICAgIH1cbiAgICAgICAgbWFya2VyLnNob3dJbmZvID0gIW1hcmtlci5zaG93SW5mbztcbiAgICAgICAgdXBkYXRlUG9wdXAobWFya2VyLCBtYXJrZXIuc2hvd0luZm8pO1xuICAgICAgICBcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcbiAgICAgICAgY2xlYXJDbGlja0NvbnRyb2woKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVXYXJkQ2xpY2soZW50aXR5TmFtZSwgc3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlV2FyZENsaWNrJywgZXZlbnQsIHRoaXMpO1xuICAgICAgICAgICAgY3Vyc29yTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgICAgICBpZiAod2FyZFJlY2VudGx5UmVtb3ZlZCkgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUsIHN0eWxlKTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIFF1ZXJ5U3RyaW5nLmFkZFF1ZXJ5U3RyaW5nVmFsdWUobWFya2VyLnVuaXRUeXBlLCBtYXJrZXIud2FyZF9sb2MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVdhcmQobWFya2VyLCByYWRpdXMpIHtcbiAgICAgICAgaWYgKG1hcmtlci51bml0VHlwZSA9PSAnb2JzZXJ2ZXInKSB7XG4gICAgICAgICAgICBtYXJrZXIucmFkaXVzX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG1hcmtlci52aXNpb25fY2VudGVyX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChtYXJrZXIubG9ubGF0LmxvbiwgbWFya2VyLmxvbmxhdC5sYXQpLCBnZXRTY2FsZWRSYWRpdXMocmFkaXVzKSwgNDApLFxuICAgICAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgd2FyZFZpc2lvbkxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgbWFya2VyLnJhZGl1c19mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihtYXJrZXIubG9ubGF0LCBtYXJrZXIsIHJhZGl1cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVdhcmQobGF0bG9uLCBlbnRpdHlOYW1lLCBzdHlsZSwgcXNfdmFsdWVfd29ybGRYWSkge1xuICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsYXRsb24pKSByZXR1cm47XG4gICAgICAgIHZhciBlbnRpdHkgPSBFTlRJVElFU1tlbnRpdHlOYW1lXSxcbiAgICAgICAgICAgIHZpc2lvbl9yYWRpdXMgPSBlbnRpdHlOYW1lID09ICdvYnNlcnZlcicgPyBnZXRWaXNpb25SYWRpdXMoKSA6IGVudGl0eS5yYWRpdXMsXG4gICAgICAgICAgICBtYXJrZXIgPSBjcmVhdGVXYXJkTWFya2VyKGVudGl0eS5pY29uX3BhdGgsIGVudGl0eU5hbWUsIGxhdGxvbik7XG4gICAgICAgIGljb25MYXllci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICAgICAgXG4gICAgICAgIGFkZFZpc2lvbkNpcmNsZSh3YXJkVmlzaW9uTGF5ZXIsIG1hcmtlciwgdmlzaW9uX3JhZGl1cywgJ3JhZGl1c19mZWF0dXJlJywgc3R5bGUpXG4gICAgICAgIG1hcmtlci51bml0VHlwZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci53YXJkX2xvYyA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci52aXNpb25fcmFkaXVzID0gdmlzaW9uX3JhZGl1cztcblxuICAgICAgICBpZiAocXNfdmFsdWVfd29ybGRYWSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgICAgIHdvcmxkWFkueCA9IHdvcmxkWFkueC50b0ZpeGVkKDApO1xuICAgICAgICAgICAgd29ybGRYWS55ID0gd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICBtYXJrZXIud2FyZF9sb2MgPSB3b3JsZFhZLnggKyAnLCcgKyB3b3JsZFhZLnlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlci53YXJkX2xvYyA9IHFzX3ZhbHVlX3dvcmxkWFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04gJiYgZW50aXR5TmFtZSA9PSAnb2JzZXJ2ZXInKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihsYXRsb24sIG1hcmtlciwgbWFya2VyLnZpc2lvbl9yYWRpdXMpO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcImNsaWNrXCIsIG1hcmtlciwgaGFuZGxlV2FyZFJlbW92ZSk7XG4gICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJ0b3VjaHN0YXJ0XCIsIG1hcmtlciwgaGFuZGxlV2FyZFJlbW92ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygncGxhY2VXYXJkJywgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdhcmRSZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZVdhcmRSZW1vdmUnLCBldmVudCwgdGhpcyk7XG4gICAgICAgIGlmICh0aGlzLnJhZGl1c19mZWF0dXJlKSB0aGlzLnJhZGl1c19mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMudmlzaW9uX2ZlYXR1cmUpIHRoaXMudmlzaW9uX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy52aXNpb25fY2VudGVyX2ZlYXR1cmUpIHRoaXMudmlzaW9uX2NlbnRlcl9mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5ldmVudHMudW5yZWdpc3RlcihcImNsaWNrXCIsIHRoaXMsIGhhbmRsZVdhcmRSZW1vdmUpO1xuICAgICAgICB0aGlzLmV2ZW50cy51bnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCB0aGlzLCBoYW5kbGVXYXJkUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgaWNvbkxheWVyLnJlbW92ZU1hcmtlcih0aGlzKTtcblxuICAgICAgICBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKHRoaXMudW5pdFR5cGUsIHRoaXMud2FyZF9sb2MpO1xuICAgICAgICBcbiAgICAgICAgd2FyZFJlY2VudGx5UmVtb3ZlZCA9IHRydWU7XG4gICAgICAgIGN1cnNvckxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdhcmRSZWNlbnRseVJlbW92ZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIE9wZW5MYXllcnMuRXZlbnQuc3RvcChldmVudCk7XG4gICAgICAgIGNsZWFyQ2xpY2tDb250cm9sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVhc3VyZW1lbnRzKGV2ZW50KSB7XG4gICAgICAgIHZhciBvdXQgPSBcIlwiO1xuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzPHN1cD4yPC9cIiArIFwic3VwPlwiO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLmlubmVySFRNTCA9IG91dDtcblxuICAgICAgICBsYXN0RGlzdGFuY2UgPSBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWVcIikuaW5uZXJIVE1MID0gKGxhc3REaXN0YW5jZSAvIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZXNwZWVkXCIpLnZhbHVlKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZS1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50cyhldmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgb3V0ID0gXCJcIjtcblxuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgb3V0ICs9IFwiUmFkaXVzOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0czxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHNQYXJ0aWFsKGV2ZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIiksXG4gICAgICAgICAgICBvdXQgPSBcIlwiLFxuICAgICAgICAgICAgY2lyY2xlLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgIGlmIChldmVudC5vcmRlciA9PSAxKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubWVhc3VyZSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudW5pdHMgPT0gXCJrbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLngsIGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueSksIGV2ZW50Lm1lYXN1cmUgKiAxZTMsIDMwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24obmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS54LCBldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLnkpLCBldmVudC5tZWFzdXJlLCAzMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgICAgIHBvbHlnb25MYXllci5yZW1vdmVGZWF0dXJlcyhldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMpO1xuICAgICAgICAgICAgICAgIGlmIChcImNpcmNsZV9mZWF0dXJlc1wiIGluIGV2ZW50Lmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Lmdlb21ldHJ5LmNpcmNsZV9mZWF0dXJlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMgPSBbZmVhdHVyZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZlYXR1cmUubWVhc3VyZV9jb250cm9sID0gdGhpcztcbiAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcG9seWdvbkxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5nZW9tZXRyeS5jb21wb25lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUuaXNfbWVhc3VyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dCArPSBcIlJhZGl1czogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHM8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSG92ZXJQb3B1cChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wb3B1cCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwID0gdGhpcy5jcmVhdGVQb3B1cCh0aGlzLmNsb3NlQm94KTtcbiAgICAgICAgICAgIG1hcC5hZGRQb3B1cCh0aGlzLnBvcHVwKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wb3B1cCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQb3B1cCA9IHRoaXMucG9wdXA7XG4gICAgICAgIE9wZW5MYXllcnMuRXZlbnQuc3RvcChldmVudCk7XG4gICAgfTtcbiAgICAgICAgXG4gICAgZnVuY3Rpb24gYWRkTWFya2VyKG1hcmtlcnMsIGxsLCBpY29uLCBwb3B1cENsYXNzLCBwb3B1cENvbnRlbnRIVE1MLCBjbG9zZUJveCwgb3ZlcmZsb3cpIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlKG1hcmtlcnMsIGxsKSxcbiAgICAgICAgICAgIG1hcmtlcjtcblxuICAgICAgICBmZWF0dXJlLmNsb3NlQm94ID0gY2xvc2VCb3g7XG4gICAgICAgIGZlYXR1cmUucG9wdXBDbGFzcyA9IHBvcHVwQ2xhc3M7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5pY29uID0gaWNvblxuICAgICAgICBmZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5vdmVyZmxvdyA9IG92ZXJmbG93ID8gXCJhdXRvXCIgOiBcImhpZGRlblwiO1xuICAgICAgICBtYXJrZXIgPSBmZWF0dXJlLmNyZWF0ZU1hcmtlcigpO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIFxuICAgICAgICBpZiAobWFya2Vycy5uYW1lICE9IFwiVHJlZXNcIikge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWFya2Vycy5uYW1lKTtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW92ZXJcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG4gICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdXRcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG4gICAgICAgIH1cblxuICAgICAgICBtYXJrZXJzLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdhcmRNYXJrZXIoaW1nLCB1bml0VHlwZSwgbGF0bG9uLCBwb3B1cENvbnRlbnRIVE1MKSB7XG4gICAgICAgIHZhciBzaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZSgyMSwgMjUpLFxuICAgICAgICAgICAgb2Zmc2V0ID0gbmV3IE9wZW5MYXllcnMuUGl4ZWwoLShzaXplLncgLyAyKSwgLXNpemUuaCksXG4gICAgICAgICAgICBpY29uID0gbmV3IE9wZW5MYXllcnMuSWNvbihpbWcsIHNpemUsIG9mZnNldCk7XG4gICAgICAgICAgICBcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlKGljb25MYXllciwgbGF0bG9uKTtcbiAgICAgICAgZmVhdHVyZS5kYXRhLmxvbmxhdCA9IGxhdGxvbjtcbiAgICAgICAgZmVhdHVyZS5kYXRhLmljb24gPSBpY29uO1xuICAgICAgICBmZWF0dXJlLmNsb3NlQm94ID0gZmFsc2U7XG4gICAgICAgIGZlYXR1cmUucG9wdXBDbGFzcyA9IE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjcmVhdGVXYXJkTWFya2VyJywgaW1nLCBsYXRsb24sIHBvcHVwQ29udGVudEhUTUwpO1xuICAgICAgICBmZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IGdldFBvcHVwQ29udGVudChudWxsLCB1bml0VHlwZSk7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHZhciBtYXJrZXIgPSBmZWF0dXJlLmNyZWF0ZU1hcmtlcigpO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdmVyXCIsIGZlYXR1cmUsIGhhbmRsZUhvdmVyUG9wdXApO1xuICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdXRcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG5cbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGVzIGEgNjR4NjQgcmVjdGFuZ2xlIGZlYXR1cmUgY2VudGVyZWQgYXQgY1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRpbGVGZWF0dXJlKGMsIHN0eWxlKSB7XG4gICAgICAgIHZhciByMSA9IHdvcmxkVG9MYXRMb24oYy54IC0gMzIsIGMueSAtIDMyKSxcbiAgICAgICAgICAgIHIyID0gd29ybGRUb0xhdExvbihjLnggLSAzMiwgYy55ICsgMzIpLFxuICAgICAgICAgICAgcjMgPSB3b3JsZFRvTGF0TG9uKGMueCArIDMyLCBjLnkgKyAzMiksXG4gICAgICAgICAgICByNCA9IHdvcmxkVG9MYXRMb24oYy54ICsgMzIsIGMueSAtIDMyKSxcbiAgICAgICAgICAgIGJveF9wb2ludHMgPSBbXG4gICAgICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQocjEueCwgcjEueSksXG4gICAgICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQocjIueCwgcjIueSksXG4gICAgICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQocjMueCwgcjMueSksXG4gICAgICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQocjQueCwgcjQueSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBib3hfcmVjdCA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LkxpbmVhclJpbmcoYm94X3BvaW50cyksXG4gICAgICAgICAgICBib3hfZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGJveF9yZWN0LCBudWxsLCBzdHlsZSk7XG5cbiAgICAgICAgcmV0dXJuIGJveF9mZWF0dXJlO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZXMgdXJsIGZvciB0aWxlcy4gT3BlbkxheWVycyBUTVMgTGF5ZXIgZ2V0VVJMIHByb3BlcnR5IGlzIHNldCB0byB0aGlzXG4gICAgZnVuY3Rpb24gZ2V0TXlVUkwocGF0Y2gsIGJhc2VMYXllcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYm91bmRzKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdnZXRNeVVSTCcsIGJhc2VMYXllcik7XG4gICAgICAgICAgICB2YXIgcmVzID0gdGhpcy5tYXAuZ2V0UmVzb2x1dGlvbigpLFxuICAgICAgICAgICAgICAgIHggPSBNYXRoLnJvdW5kKChib3VuZHMubGVmdCAtIHRoaXMubWF4RXh0ZW50LmxlZnQpIC8gKHJlcyAqIHRoaXMudGlsZVNpemUudykpLFxuICAgICAgICAgICAgICAgIHkgPSBNYXRoLnJvdW5kKCh0aGlzLm1heEV4dGVudC50b3AgLSBib3VuZHMudG9wKSAvIChyZXMgKiB0aGlzLnRpbGVTaXplLmgpKSxcbiAgICAgICAgICAgICAgICB6ID0gbWFwLmdldFpvb20oKSxcbiAgICAgICAgICAgICAgICBwYXRoID0geiArIFwiL3RpbGVfXCIgKyB4ICsgXCJfXCIgKyB5ICsgXCIuXCIgKyB0aGlzLnR5cGUsXG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy51cmw7XG5cbiAgICAgICAgICAgIGlmICh1cmwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMuc2VsZWN0VXJsKHBhdGgsIHVybClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1cmwgKyBwYXRjaCArICcvJyArIGJhc2VMYXllciArICcvJyArIHBhdGhcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiByZXNldE1hcmtlckxheWVycygpIHtcbiAgICAgICAgZm9yIChrIGluIHRyZWVNYXJrZXJzKSB7XG4gICAgICAgICAgICBpZiAoY3V0VHJlZXNba10pIHtcbiAgICAgICAgICAgICAgICBzZXRUcmVlTWFya2VyU3RhdGUodHJlZU1hcmtlcnNba10sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRhID0gbWFwX2RhdGE7XG4gICAgICAgIE9iamVjdC5rZXlzKG1hcF9kYXRhLmRhdGEpLmNvbmNhdChbXCJub193YXJkc1wiLCBcImVudF9mb3dfYmxvY2tlcl9ub2RlXCJdKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNba10pWzBdO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlbW92aW5nIGxheWVyJywgbGF5ZXIsIGspO1xuICAgICAgICAgICAgaWYgKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKGxheWVyKTtcbiAgICAgICAgICAgICAgICBsYXllci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkYXlSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBuaWdodFJhbmdlTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIHRydWVTaWdodFJhbmdlTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIGF0dGFja1JhbmdlTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIG1hcC5ldmVudHMudW5yZWdpc3RlcihcImNoYW5nZWxheWVyXCIsIG1hcCwgbGF5ZXJDaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbk1hcERhdGFMb2FkKGRhdGEpIHtcbiAgICAgICAgdmFyIG1hcmtlcnMgPSB7fSxcbiAgICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICAgIHZlY3RvckxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShcIlBsYWNlZCBXYXJkc1wiKVswXSxcbiAgICAgICAgICAgIGJveF9wb2ludHMgPSBbXSxcbiAgICAgICAgICAgIGJveF9yZWN0LCBib3hfZmVhdHVyZSxcbiAgICAgICAgICAgIGNvb3JkRGF0YSA9IGRhdGEuZGF0YSxcbiAgICAgICAgICAgIHN0YXREYXRhID0gZGF0YS5zdGF0cztcblxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgIGxvYWRHZW9KU09ORGF0YShtYXJrZXJzLCAnbm9fd2FyZHMnLCBsYXllck5hbWVzLm5vX3dhcmRzLCBzdHlsZS5yZWQpO1xuICAgICAgICAgICAgbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsICdlbnRfZm93X2Jsb2NrZXJfbm9kZScsIGxheWVyTmFtZXMuZW50X2Zvd19ibG9ja2VyX25vZGUsIHN0eWxlLmxpZ2h0Ymx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxheWVyS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25NYXBEYXRhTG9hZCcsIGspO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIG1hcmtlcnMgZm9yIG5vbi1uZXV0cmFsIHNwYXduIGJveCBhbmQgbm9uLXRyZWUgbGF5ZXJzXG4gICAgICAgICAgICBpZiAoY29vcmREYXRhW2tdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIgJiYgayAhPSBcImVudF9kb3RhX3RyZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29vcmREYXRhW2tdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihjb29yZERhdGFba11baV0ueCwgY29vcmREYXRhW2tdW2ldLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl9wYXRoc1trXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpY29uX3BhdGggPSBpY29uX3BhdGhzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID09ICducGNfZG90YV9uZXV0cmFsX3NwYXduZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fcGF0aCA9IGljb25fcGF0aC5yZXBsYWNlKCcxJywgY29vcmREYXRhW2tdW2ldLm5ldXRyYWxUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKDI0LCAyNCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG5ldyBPcGVuTGF5ZXJzLlBpeGVsKC0xMiwtMTIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gbmV3IE9wZW5MYXllcnMuSWNvbihpY29uX3BhdGgsIHNpemUsIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdENsYXNzID0gY29vcmREYXRhW2tdW2ldLnN1YlR5cGUgPyBrICsgJ18nICsgY29vcmREYXRhW2tdW2ldLnN1YlR5cGUgOiBrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBhZGRNYXJrZXIobWFya2Vyc1trXSwgbmV3IE9wZW5MYXllcnMuTG9uTGF0KGxhdGxvbi54LCBsYXRsb24ueSksIGljb24sIE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQsIGdldFBvcHVwQ29udGVudChzdGF0RGF0YSwgaywgY29vcmREYXRhW2tdW2ldLnN1YlR5cGUsIHVuaXRDbGFzcywgbnVsbCwgY29vcmREYXRhW2tdW2ldLnB1bGxUeXBlLCBjb29yZERhdGFba11baV0ubmV1dHJhbFR5cGUpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudW5pdFR5cGUgPSBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnVuaXRTdWJUeXBlID0gY29vcmREYXRhW2tdW2ldLnN1YlR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudW5pdENsYXNzID0gdW5pdENsYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaywgY29vcmREYXRhLCBjb29yZERhdGFba10sIGNvb3JkRGF0YVtrXVtpXSwgbWFya2VyLnVuaXRDbGFzcywgbWFya2VyLnVuaXRTdWJUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0RGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5kYXlWaXNpb24gPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS5kYXlWaXNpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLm5pZ2h0VmlzaW9uID0gc3RhdERhdGFbbWFya2VyLnVuaXRDbGFzc10ubmlnaHRWaXNpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnRydWVTaWdodCA9IHN0YXREYXRhW21hcmtlci51bml0Q2xhc3NdLnRydWVTaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYXR0YWNrUmFuZ2UgPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS5hdHRhY2tSYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIucHVsbFR5cGUgPSBjb29yZERhdGFba11baV0ucHVsbFR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLm5ldXRyYWxUeXBlID0gY29vcmREYXRhW2tdW2ldLm5ldXRyYWxUeXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNob3dJbmZvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aHJvdHRsZWRIYW5kbGVUb3dlck1hcmtlckNsaWNrID0gdGhyb3R0bGUoaGFuZGxlVG93ZXJNYXJrZXJDbGljaywgMjAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCBtYXJrZXJzW2tdLCB0aHJvdHRsZWRIYW5kbGVUb3dlck1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJ0b3VjaHN0YXJ0XCIsIG1hcmtlcnNba10sIHRocm90dGxlZEhhbmRsZVRvd2VyTWFya2VyQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnRvd2VyX2xvYyA9IGNvb3JkRGF0YVtrXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXQgdXAgdHJlZSBsYXllciB3aXRob3V0IGNyZWF0aW5nIHRyZWUgbWFya2VycyB5ZXRcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09IFwiZW50X2RvdGFfdHJlZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5NYXJrZXJzKGxheWVyTmFtZXNba10sIHt2aXNpYmlsaXR5OiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbWFya2Vyc1trXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldXRyYWwgc3Bhd24gbWFya2VycyBhbmQgcmVjdGFuZ2xlc1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEpTT05EYXRhKG1hcmtlcnMsIGssIFwibnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyX2JveFwiLCBjb29yZERhdGFba10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgbWFwX2RhdGEgPSBkYXRhO1xuICAgICAgICBcbiAgICAgICAgbWFwLnJhaXNlTGF5ZXIodmVjdG9yTGF5ZXIsIG1hcC5sYXllcnMubGVuZ3RoKTtcblxuICAgICAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwiY2hhbmdlbGF5ZXJcIiwgbWFwLCBsYXllckNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgIHBhcnNlUXVlcnlTdHJpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbGF5ZXJDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIExvYWQgdHJlZSBtYXJrZXJzIHRoZSBmaXJzdCB0aW1lIHRoZSB0cmVlIGxheWVyIGlzIHN3aXRjaGVkIHRvXG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIgJiYgZXZlbnQubGF5ZXIubmFtZSA9PSBsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSAmJiAhZXZlbnQubGF5ZXIubG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkVHJlZURhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5sYXllci5pc0Jhc2VMYXllcikge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdCYXNlTGF5ZXInLCBldmVudC5sYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKGV2ZW50LmxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJyksIGV2ZW50LmxheWVyLnZpc2liaWxpdHkgPyB0cnVlIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJlZURhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCB0cmVlIGxvYWQnKTtcbiAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSlbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKGxheWVyKTtcbiAgICAgICAgdmFyIGRhdGEgPSBtYXBfZGF0YS5kYXRhLmVudF9kb3RhX3RyZWU7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24oZGF0YVtpXS54LCBkYXRhW2ldLnkpO1xuICAgICAgICAgICAgdmFyIHNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKDI0LCAyNCksXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gbmV3IE9wZW5MYXllcnMuUGl4ZWwoLTEyLC0xMiksXG4gICAgICAgICAgICAgICAgaWNvbiA9IG5ldyBPcGVuTGF5ZXJzLkljb24oaWNvbl9wYXRoc1tcImVudF9kb3RhX3RyZWVcIl0sIHNpemUsIG9mZnNldCk7XG4gICAgICAgICAgICBtYXJrZXIgPSBhZGRNYXJrZXIobGF5ZXIsIG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChsYXRsb24ueCwgbGF0bG9uLnkpLCBpY29uLCBPcGVuTGF5ZXJzLlBvcHVwLkZyYW1lZENsb3VkLCBcIkNsaWNrIHRvIGN1dCBkb3duIHRyZWUuPGJyPlRoaXMgd2lsbCBhZmZlY3QgdGhlIHdhcmQgdmlzaW9uIHNpbXVsYXRpb24uXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hcmtlci50cmVlVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBtYXJrZXIudHJlZV9sb2MgPSBkYXRhW2ldLnggKyAnLCcgKyBkYXRhW2ldLnk7XG4gICAgICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhyb3R0bGVkSGFuZGxlVHJlZU1hcmtlckNsaWNrID0gdGhyb3R0bGUoaGFuZGxlVHJlZU1hcmtlckNsaWNrLCAyMDApO1xuICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCBtYXJrZXIsIHRocm90dGxlZEhhbmRsZVRyZWVNYXJrZXJDbGljayk7XG4gICAgICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcInRvdWNoc3RhcnRcIiwgbWFya2VyLCB0aHJvdHRsZWRIYW5kbGVUcmVlTWFya2VyQ2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJlZU1hcmtlcnNbZGF0YVtpXS54ICsgJywnICsgZGF0YVtpXS55XSA9IG1hcmtlcjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5sb2FkZWQgPSAhbGF5ZXIubG9hZGVkO1xuICAgICAgICBjb25zb2xlLmxvZygnZW5kIHRyZWUgbG9hZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRKU09ORGF0YShtYXJrZXJzLCBrLCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIG1hcmtlcnNbbmFtZV0gPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IobGF5ZXJOYW1lc1trXSk7XG4gICAgICAgIG1hcC5hZGRMYXllcihtYXJrZXJzW25hbWVdKTtcbiAgICAgICAgbWFya2Vyc1tuYW1lXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwbnQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtpXS5wb2ludHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihkYXRhW2ldLnBvaW50c1tqXS54LCBkYXRhW2ldLnBvaW50c1tqXS55KTtcbiAgICAgICAgICAgICAgICBwbnQucHVzaChuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChsYXRsb24ueCwgbGF0bG9uLnkpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBsbiA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LkxpbmVhclJpbmcocG50KTtcbiAgICAgICAgICAgIHBmID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IobG4sIG51bGwsIHN0eWxlLmdyZWVuKTtcbiAgICAgICAgICAgIG1hcmtlcnNbbmFtZV0uYWRkRmVhdHVyZXMoW3BmXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsIGssIG5hbWUsIHN0eWxlKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IG1hcF9kYXRhX3BhdGggKyBnZXREYXRhVmVyc2lvbigpICsgJy8nICsgayArICcyLmpzb24nO1xuICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKG5hbWUsIHtcbiAgICAgICAgICAgIHN0cmF0ZWdpZXM6IFtuZXcgT3BlbkxheWVycy5TdHJhdGVneS5GaXhlZCgpXSxcbiAgICAgICAgICAgIHByb3RvY29sOiBuZXcgT3BlbkxheWVycy5Qcm90b2NvbC5IVFRQKHtcbiAgICAgICAgICAgICAgICB1cmw6IGZpbGVuYW1lLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogbmV3IE9wZW5MYXllcnMuRm9ybWF0Lkdlb0pTT04oKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgbWFya2Vyc1trXS5zdHlsZSA9IHN0eWxlO1xuICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2woKSB7XG4gICAgICAgIHZhciBjb250cm9sO1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnbW9kZScsIG51bGwpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZHJhd0NvbnRyb2xzKSB7XG4gICAgICAgICAgICBjb250cm9sID0gZHJhd0NvbnRyb2xzW2tleV07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLCB0aGlzLnZhbHVlLCBrZXksIHRoaXMudmFsdWUgPT0ga2V5ICYmIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSBrZXkgJiYgdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ21vZGUnLCBrZXkpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMudmFsdWUgPT0gXCJwb2x5Z29uQ29udHJvbFwiIHx8IHRoaXMudmFsdWUgPT0gXCJjaXJjbGVcIikgJiYgdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09ICdvYnNlcnZlcicpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaWJsZS1hcmVhXCIpLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZS1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIG1hcCBzZXR0aW5ncyBiYXNlZCBvbiBxdWVyeSBzdHJpbmcgdmFsdWVzXG4gICAgZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZygpIHtcbiAgICAgICAgdmFyIG1vZGUgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ21vZGUnKTtcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIHZhciBtb2RlUmFkaW9CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RlICsgJ1RvZ2dsZScpO1xuICAgICAgICAgICAgaWYgKG1vZGVSYWRpb0J1dHRvbikge1xuICAgICAgICAgICAgICAgIG1vZGVSYWRpb0J1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0b2dnbGVDb250cm9sLmNhbGwobW9kZVJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgem9vbSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnem9vbScpO1xuICAgICAgICBpZiAoem9vbSkge1xuICAgICAgICAgICAgbWFwLnpvb21UbyhwYXJzZUludCh6b29tKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdvcmxkWCA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgneCcpO1xuICAgICAgICB2YXIgd29ybGRZID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCd5Jyk7XG4gICAgICAgIGlmICh3b3JsZFggJiYgd29ybGRZKSB7XG4gICAgICAgICAgICB2YXIgbG9ubGF0ID0gd29ybGRUb0xhdExvbih3b3JsZFgsIHdvcmxkWSk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChsb25sYXQueCwgbG9ubGF0LnkpLCB1bmRlZmluZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBrZXlzID0gWydvYnNlcnZlcicsICdzZW50cnknXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgd2FyZHMgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoa2V5c1tpXSlcbiAgICAgICAgICAgIGlmICh3YXJkcykge1xuICAgICAgICAgICAgICAgIHdhcmRfY29vcmRpbmF0ZXMgPSB0cmltKHdhcmRzLCAnIDsnKS5zcGxpdCgnOycpXG4gICAgICAgICAgICAgICAgd2FyZF9jb29yZGluYXRlcy5tYXAoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3JkID0gZWwuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gd29ybGRUb0xhdExvbihwYXJzZUZsb2F0KGNvb3JkWzBdKSwgcGFyc2VGbG9hdChjb29yZFsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZVdhcmQobmV3IE9wZW5MYXllcnMuTG9uTGF0KHh5LngsIHh5LnkpLCBrZXlzW2ldLCBrZXlzW2ldID09PSAnb2JzZXJ2ZXInID8gc3R5bGUuZGF5IDogc3R5bGUudHJ1ZV9zaWdodCwgZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgYmFzZUxheWVyTmFtZSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnQmFzZUxheWVyJyk7XG4gICAgICAgIGlmIChiYXNlTGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2VMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBiYXNlTGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBsYXllck5hbWUgPSBsYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlTGF5ZXJOYW1lID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldEJhc2VMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChrIGluIGxheWVyTmFtZXMpIHtcbiAgICAgICAgICAgIHZhciBsYXllck5hbWUgPSBsYXllck5hbWVzW2tdLnJlcGxhY2UoLyAvZywgJycpO1xuICAgICAgICAgICAgdmFsdWUgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUobGF5ZXJOYW1lKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1trXSlbMF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcnNlUXVlcnlTdHJpbmcnLCBsYXllciwgbGF5ZXJOYW1lc1trXSwgbGF5ZXJOYW1lLCB2YWx1ZSA9PSBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKSBsYXllci5zZXRWaXNpYmlsaXR5KHZhbHVlID09IFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXRfdHJlZXMgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2N1dF90cmVlcycpO1xuICAgICAgICBpZiAoY3V0X3RyZWVzKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNbXCJlbnRfZG90YV90cmVlXCJdKVswXTtcbiAgICAgICAgICAgIGlmICghbGF5ZXIubG9hZGVkKSBsb2FkVHJlZURhdGEoKTtcbiAgICAgICAgICAgIGN1dF90cmVlX2Nvb3JkaW5hdGVzID0gdHJpbShjdXRfdHJlZXMsICcgOycpLnNwbGl0KCc7JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVNYXJrZXJzLCBjdXRfdHJlZV9jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1dF90cmVlX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3V0X3RyZWVfY29vcmRpbmF0ZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlTWFya2Vyc1tjdXRfdHJlZV9jb29yZGluYXRlc1tpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJlZU1hcmtlclN0YXRlKHRyZWVNYXJrZXJzW2N1dF90cmVlX2Nvb3JkaW5hdGVzW2ldXSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3dlcl92aXNpb24gPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3Rvd2VyX3Zpc2lvbicpO1xuICAgICAgICBpZiAodG93ZXJfdmlzaW9uKSB7XG4gICAgICAgICAgICBmb3IgKGsgaW4gbWFwX2RhdGEuZGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1trXSlbMF07XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLm5hbWUgPT0gXCJUcmVlc1wiKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIgJiYgbGF5ZXIubWFya2Vycykge1xuICAgICAgICAgICAgICAgICAgICB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXMgPSB0cmltKHRvd2VyX3Zpc2lvbiwgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG93ZXJfdmlzaW9uJywgbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlTWFya2VycywgdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGF5ZXIubWFya2Vycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxheWVyLCBsYXllci5uYW1lLCBsYXllci5tYXJrZXJzW2pdLCBsYXllci5tYXJrZXJzW2pdLnRvd2VyX2xvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyLm1hcmtlcnNbal0udG93ZXJfbG9jICYmIGxheWVyLm1hcmtlcnNbal0udG93ZXJfbG9jLnggKyAnLCcgKyBsYXllci5tYXJrZXJzW2pdLnRvd2VyX2xvYy55ID09IHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVUb3dlck1hcmtlckNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogbGF5ZXIubWFya2Vyc1tqXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2V0VHJlZVF1ZXJ5U3RyaW5nKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBPYmplY3Qua2V5cyhjdXRUcmVlcykuam9pbignOycpO1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnY3V0X3RyZWVzJywgdmFsdWUgfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqXG4gICAgICogSU5JVElUSUFMSVpBVElPTiAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqL1xuICAgIE9wZW5MYXllcnMuSW1nUGF0aCA9IElNR19ESVI7XG4gICAgXG4gICAgLy8gU3RhcnQgc2V0dGluZyB1cCB0aGUgbWFwLCBhZGRpbmcgY29udHJvbHMgYW5kIGxheWVyc1xuICAgIGJhc2VMYXllcnMuZm9yRWFjaChmdW5jdGlvbihsYXllcikge1xuICAgICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgIH0pO1xuICAgIG1hcC5hZGRMYXllcihjdXJzb3JMYXllcik7XG4gICAgbWFwLmFkZExheWVyKGRheVJhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihuaWdodFJhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih0cnVlU2lnaHRSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIoYXR0YWNrUmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKHBvbHlnb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKHdhcmRWaXNpb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKHZpc2lvblNpbXVsYXRpb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKGljb25MYXllcik7XG4gICAgbWFwLmFkZENvbnRyb2woY29vcmRpbmF0ZUNvbnRyb2wpO1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbih7XG4gICAgICAgIGRyYWdQYW5PcHRpb25zOiB7XG4gICAgICAgICAgICBlbmFibGVLaW5ldGljOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5LZXlib2FyZERlZmF1bHRzKCkpO1xuICAgIG1hcC5hZGRDb250cm9sKGxheWVyU3dpdGNoZXIpO1xuICAgIGxheWVyU3dpdGNoZXIubWF4aW1pemVDb250cm9sKCk7XG4gICAgaWYgKCFtYXAuZ2V0Q2VudGVyKCkpIHtcbiAgICAgICAgbWFwLnpvb21Ub01heEV4dGVudCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjcmVhdGUgY2xpY2sgaGFuZGxlclxuICAgIE9wZW5MYXllcnMuQ29udHJvbC5DbGljayA9IE9wZW5MYXllcnMuQ2xhc3MoT3BlbkxheWVycy5Db250cm9sLCB7XG4gICAgICAgIGRlZmF1bHRIYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgc2luZ2xlOiB0cnVlLFxuICAgICAgICAgICAgXCJkb3VibGVcIjogZmFsc2UsXG4gICAgICAgICAgICBwaXhlbFRvbGVyYW5jZTogMCxcbiAgICAgICAgICAgIHN0b3BTaW5nbGU6IGZhbHNlLFxuICAgICAgICAgICAgc3RvcERvdWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyT3B0aW9ucyA9IE9wZW5MYXllcnMuVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgICAgIE9wZW5MYXllcnMuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IE9wZW5MYXllcnMuSGFuZGxlci5DbGljayh0aGlzLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMub25DbGljayxcbiAgICAgICAgICAgICAgICBkYmxjbGljazogdGhpcy5vbkRibGNsaWNrXG4gICAgICAgICAgICB9LCB0aGlzLmhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRibGNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMua2V5ICsgXCJPdXRwdXRcIiksXG4gICAgICAgICAgICAgICAgbXNnID0gXCJkYmxjbGljayBcIiArIGV2ZW50Lnh5O1xuICAgICAgICAgICAgb3V0cHV0LnZhbHVlID0gb3V0cHV0LnZhbHVlICsgbXNnICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29udHJvbHMgY29uZmlndXJhdGlvblxuICAgIHJlbmRlcmVyID0gcmVuZGVyZXIgPyBbcmVuZGVyZXJdIDogT3BlbkxheWVycy5MYXllci5WZWN0b3IucHJvdG90eXBlLnJlbmRlcmVycztcbiAgICBkcmF3Q29udHJvbHMgPSB7XG4gICAgICAgIGxpbmU6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShPcGVuTGF5ZXJzLkhhbmRsZXIuUGF0aCwge1xuICAgICAgICAgICAgcGVyc2lzdDogdHJ1ZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyczogcmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBjaXJjbGU6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShPcGVuTGF5ZXJzLkhhbmRsZXIuUGF0aCwge1xuICAgICAgICAgICAgcGVyc2lzdDogZmFsc2UsXG4gICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM6IHJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgb2JzZXJ2ZXI6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2soe1xuICAgICAgICAgICAgb25DbGljazogaGFuZGxlV2FyZENsaWNrKCdvYnNlcnZlcicsIHN0eWxlLmRheSlcbiAgICAgICAgfSksXG4gICAgICAgIHNlbnRyeTogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5DbGljayh7XG4gICAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVXYXJkQ2xpY2soJ3NlbnRyeScsIHN0eWxlLnRydWVfc2lnaHQpXG4gICAgICAgIH0pLFxuICAgICAgICBwb2x5Z29uQ29udHJvbDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5EcmF3RmVhdHVyZShwb2x5Z29uTGF5ZXIsIE9wZW5MYXllcnMuSGFuZGxlci5SZWd1bGFyUG9seWdvbiwge1xuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBzaWRlczogMzBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHNlbGVjdDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5TZWxlY3RGZWF0dXJlKHBvbHlnb25MYXllciwge1xuICAgICAgICAgICAgaG92ZXI6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLm1lYXN1cmVfY29udHJvbCAmJiBmZWF0dXJlLmlzX21lYXN1cmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlckZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgICAgICAgICBvdXQgPSBcIlJhZGl1czogXCIgKyAoLjU2NTM1MiAqIE1hdGguc3FydChmZWF0dXJlLmdlb21ldHJ5LmdldEFyZWEoKSkgKiBtYXBDb25zdGFudHMuc2NhbGUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KGZlYXR1cmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dEZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0KGZlYXR1cmUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIC8vIEFkZCBjb250cm9scyB0byBtYXBcbiAgICBmb3IgKHZhciBrZXkgaW4gZHJhd0NvbnRyb2xzKSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJsaW5lXCIpIHtcbiAgICAgICAgICAgIGRyYXdDb250cm9sc1trZXldLmV2ZW50cy5vbih7XG4gICAgICAgICAgICAgICAgbWVhc3VyZTogaGFuZGxlTWVhc3VyZW1lbnRzLFxuICAgICAgICAgICAgICAgIG1lYXN1cmVwYXJ0aWFsOiBoYW5kbGVNZWFzdXJlbWVudHNcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNba2V5XS5ldmVudHMub24oe1xuICAgICAgICAgICAgICAgIG1lYXN1cmU6IGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgICAgICAgICBtZWFzdXJlcGFydGlhbDogaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzUGFydGlhbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBtYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbHNba2V5XSk7XG4gICAgfVxuXG4gICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcInpvb21lbmRcIiwgbWFwLCBkZWJvdW5jZShmdW5jdGlvbigpe1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnem9vbScsIG1hcC5nZXRab29tKCkpO1xuICAgIH0sIDUwMCkpO1xuXG4gICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcIm1vdmVlbmRcIiwgbWFwLCBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hcENlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgaWYgKG1hcENlbnRlcikge1xuICAgICAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKG1hcENlbnRlci5sb24sIG1hcENlbnRlci5sYXQpO1xuICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3gnLCB3b3JsZFhZLngudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygneScsIHdvcmxkWFkueS50b0ZpeGVkKDApKTtcbiAgICAgICAgfVxuICAgIH0sIDUwMCkpO1xuXG4gICAgLy8gWC9ZIGNvb3JkaW5hdGUgdXBkYXRlIGRpc3BsYXkgaGFuZGxlclxuICAgIGNvb3JkaW5hdGVDb250cm9sLmZvcm1hdE91dHB1dCA9IGZ1bmN0aW9uIChsb25sYXQpIHtcbiAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKGxvbmxhdC5sb24sIGxvbmxhdC5sYXQpO1xuICAgICAgICByZXR1cm4gd29ybGRYWS54LnRvRml4ZWQoMCkgKyAnLCAnICsgd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgfTtcbiAgICBcbiAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2Vtb3ZlXCIsIG1hcCwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjdXJzb3JMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgaWYgKHdhcmRSZWNlbnRseVJlbW92ZWQpIHJldHVybjtcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY3Vyc29yIG1hcmtlciBwb2x5Z29uIGlmIGluIHBsYWNlIG9ic2VydmVyIG1vZGVcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmIHZzLnJlYWR5ICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzZXJ2ZXJUb2dnbGVcIikuY2hlY2tlZCkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZS54eSk7XG4gICAgICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsb25sYXQpKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsb25sYXQubG9uLCBsb25sYXQubGF0KTtcbiAgICAgICAgICAgIHZhciBncmlkWFkgPSB2cy5Xb3JsZFhZdG9HcmlkWFkod29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdHJlZVB0cyA9IHZzLnRyZWVfcmVsYXRpb25zW2dyaWRYWS5rZXldO1xuICAgICAgICAgICAgdmFyIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSB2cy50cmVlX3N0YXRlW3RyZWVQdC5rZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUJsb2NraW5nKSBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3Vyc29yX3N0eWxlID0gc3R5bGUuZ3JlZW47XG4gICAgICAgICAgICBpZiAoIXZzLmlzVmFsaWRYWShncmlkWFkueCwgZ3JpZFhZLnksIHRydWUsIHRydWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yX3N0eWxlID0gc3R5bGUucmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJveF9mZWF0dXJlID0gY3JlYXRlVGlsZUZlYXR1cmUodnMuR3JpZFhZdG9Xb3JsZFhZKGdyaWRYWS54LCBncmlkWFkueSksIGN1cnNvcl9zdHlsZSk7XG4gICAgICAgICAgICBjdXJzb3JMYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUykgdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobG9ubGF0LCBudWxsLCBnZXRWaXNpb25SYWRpdXMoKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNob3cvaGlkZSBjb250cm9scyBwYW5lbFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWF4XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBkZWJvdW5jZShmdW5jdGlvbihlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIikuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZiAobGF5ZXJTd2l0Y2hlci5pc1NtYWxsU2NyZWVuKCkpIHtcbiAgICAgICAgICAgIGxheWVyU3dpdGNoZXIubWluaW1pemVDb250cm9sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCAxMDApLCBmYWxzZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gbWluaW1pemVDb250cm9sTGlzdChlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1tYXhcIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRlYm91bmNlKG1pbmltaXplQ29udHJvbExpc3QsIDEwMCksIGZhbHNlKTtcbiAgICBcbiAgICAvLyBJbml0aWFsbHkgaGlkZSBjb250cm9scyBpZiBzY3JlZW4gaXMgc21hbGxcbiAgICBpZiAobGF5ZXJTd2l0Y2hlci5pc1NtYWxsU2NyZWVuKCkpIHtcbiAgICAgICAgbWluaW1pemVDb250cm9sTGlzdC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpKTtcbiAgICAgICAgbGF5ZXJTd2l0Y2hlci5taW5pbWl6ZUNvbnRyb2woKTtcbiAgICB9XG5cbiAgICAvLyBTaG93L2hpZGUgWC9ZIGNvb3JkaW5hdGUgZGlzcGxheVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29vcmRDb250cm9sXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sQ29udHJvbE1vdXNlUG9zaXRpb25cIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sQ29udHJvbE1vdXNlUG9zaXRpb25cIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIFZpc2lvbiBzaW11bGF0aW9uIG9uL29mZlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gdGhpcy5jaGVja2VkO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsd2F5c1NpbXVsYXRlQ29udHJvbFwiKS5kaXNhYmxlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gQWx3YXlzIHNpbXVsYXRlIHZpc2lvbiBvbi9vZmZcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsd2F5c1NpbXVsYXRlQ29udHJvbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT05fQUxXQVlTID0gdGhpcy5jaGVja2VkO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIFVwZGF0ZSB0cmF2ZWwgdGltZSBkaXNwbGF5IHdoZW4gbW92ZXNwZWVkIGlucHV0IGNoYW5nZXNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lXCIpLmlubmVySFRNTCA9IChsYXN0RGlzdGFuY2UgLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS52YWx1ZSkudG9GaXhlZCgyKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBTZXQgdXAgcGFuZWwgcmFkaW8gYnV0dG9uIHRvZ2dsZSBoYW5kbGVyc1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0ZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5lVG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYnNlcnZlclRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW50cnlUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIHBvbHlnb25MYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgd2FyZFZpc2lvbkxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIGljb25MYXllci5jbGVhck1hcmtlcnMoKTtcbiAgICAgICAgZHJhd0NvbnRyb2xzLmxpbmUuY2FuY2VsKCk7XG4gICAgICAgIGRyYXdDb250cm9scy5jaXJjbGUuY2FuY2VsKCk7XG4gICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIoYmFzZUxheWVyc1swXSk7XG4gICAgICAgIG1hcC56b29tVG9NYXhFeHRlbnQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUgPSBFTlRJVElFUy5vYnNlcnZlci5yYWRpdXM7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbmVzc0NvbnRyb2wnKS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCAxMDAwKSwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2RhdGEnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXNpb24tcmFkaXVzIGNoYW5nZScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnNldEF0dHJpYnV0ZSgnZGF0YS1kaXJ0eS12YWx1ZScsIHRydWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmlnaHRDb250cm9sJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBOSUdIVFRJTUUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmlnaHRDb250cm9sJykuY2hlY2tlZDtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ25pZ2h0JywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25pZ2h0Q29udHJvbCcpLmNoZWNrZWQpO1xuICAgICAgICB1cGRhdGVCdWlsZGluZ1Zpc2lvbigpOyAgXG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbmVzc0NvbnRyb2wnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvZ2dsZURhcmtuZXNzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbmVzc0NvbnRyb2wnKS5jaGVja2VkKTtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2RhcmtuZXNzJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhcmtuZXNzQ29udHJvbCcpLmNoZWNrZWQpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1kaXJ0eS12YWx1ZScpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBmdW5jdGlvbiB0b2dnbGVEYXJrbmVzcyhzdGF0ZSkge1xuICAgICAgICBEQVJLTkVTUyA9IHN0YXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlydHktdmFsdWUnKSwgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLWRpcnR5LXZhbHVlJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLXNhdmVkLXZhbHVlJykpO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuc2V0QXR0cmlidXRlKCdkYXRhLXNhdmVkLXZhbHVlJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlID0gREFSS05FU1NfVklTSU9OX1JBRElVUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlydHktdmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN0b3JlIHZpc2lvbiByYWRpdXMnKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2F2ZWQtdmFsdWUnKSkgIHx8IEVOVElUSUVTLm9ic2VydmVyLnJhZGl1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpY29uTGF5ZXIubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hcmtlcik7XG4gICAgICAgICAgICBpZiAobWFya2VyLnVuaXRUeXBlID09ICdvYnNlcnZlcicpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVXYXJkKG1hcmtlciwgc3RhdGUgPyBEQVJLTkVTU19WSVNJT05fUkFESVVTIDogbWFya2VyLnZpc2lvbl9yYWRpdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZUJ1aWxkaW5nVmlzaW9uKCk7ICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlQnVpbGRpbmdWaXNpb24oKSB7XG4gICAgICAgIGZvciAoayBpbiBtYXBfZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNba10pWzBdO1xuICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLm1hcmtlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrLCBsYXllcik7XG4gICAgICAgICAgICAgICAgbGF5ZXIubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5zaG93SW5mbykgYWRkQnVpbGRpbmdWaXNpb25GZWF0dXJlcyhtYXJrZXIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0RGF0YVZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlzaWJsZUFyZWEoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpYmxlLWFyZWEnKS5pbm5lckhUTUwgPSBcIlZpc2liaWxpdHk6IFwiICsgKHZzLmxpZ2h0QXJlYSAvIHZzLmFyZWEgKiAxMDApLnRvRml4ZWQoKSArICclICcgKyB2cy5saWdodEFyZWEgKyBcIi9cIiArIHZzLmFyZWE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobGF0bG9uLCBtYXJrZXIsIHJhZGl1cywgdmlzaW9uU3R5bGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZVZpc2liaWxpdHlIYW5kbGVyJywgbWFya2VyKTtcbiAgICAgICAgaWYgKCF2cy5yZWFkeSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgIGlmICh2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY2VudGVyIG1hcmtlciBwb2x5Z29uXG4gICAgICAgICAgICB2YXIgYm94X2ZlYXR1cmUgPSBjcmVhdGVUaWxlRmVhdHVyZSh2cy5HcmlkWFl0b1dvcmxkWFkoZ3JpZFhZLngsIGdyaWRYWS55KSwgc3R5bGUuZ3JlZW4pO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSA9IGJveF9mZWF0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleGVjdXRlIHZpc2lvbiBzaW11bGF0aW9uXG4gICAgICAgICAgICB2cy51cGRhdGVWaXNpYmlsaXR5KGdyaWRYWS54LCBncmlkWFkueSwgZ2V0VGlsZVJhZGl1cyhyYWRpdXMpKTtcbiAgICAgICAgICAgIHVwZGF0ZVZpc2libGVBcmVhKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIG1lcmdlIGxpZ2h0IHBvaW50cyBpbnRvIGEgc2luZ2xlIHBvbHlnb24gYW5kIGFkZCB0byB2aXNpb24gbGF5ZXJcbiAgICAgICAgICAgIHZhciBvdXRsaW5lcyA9IGdldExpZ2h0VW5pb24odnMuZ3JpZCwgdnMubGlnaHRzKTtcbiAgICAgICAgICAgIHZhciBwb2x5Z29uTGlzdCA9IG91dGxpbmVzLm1hcChmdW5jdGlvbiAob3V0bGluZVBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciByaW5nUG9pbnRzID0gb3V0bGluZVBvaW50cy5tYXAoZnVuY3Rpb24gKHB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JsZFhZID0gdnMuR3JpZFhZdG9Xb3JsZFhZKHB0LngsIHB0LnkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbih3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChsYXRsb24ueCwgbGF0bG9uLnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByaW5nID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhyaW5nUG9pbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbihbcmluZ10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbXVsdGlQb2x5Z29uID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTXVsdGlQb2x5Z29uKHBvbHlnb25MaXN0KTtcbiAgICAgICAgICAgIHZhciB2aXNpb25GZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IobXVsdGlQb2x5Z29uLCBudWxsLCB2aXNpb25TdHlsZSB8fCBzdHlsZS55ZWxsb3cpO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbdmlzaW9uRmVhdHVyZV0pO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIudmlzaW9uX2ZlYXR1cmUpIG1hcmtlci52aXNpb25fZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlID0gdmlzaW9uRmVhdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnNvckxheWVyLmFkZEZlYXR1cmVzKFt2aXNpb25GZWF0dXJlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIudmlzaW9uX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IHZzLmFyZWEsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0QXJlYTogdnMubGlnaHRBcmVhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZVBvcHVwKG1hcmtlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHVuaXROYW1lcyA9IHtcbiAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfcG93ZXJ1cDogXCJSdW5lXCIsXG4gICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5OiBcIkJvdW50eSBSdW5lXCIsXG4gICAgICAgIGVudF9kb3RhX3RyZWU6IFwiVHJlZVwiLFxuICAgICAgICBucGNfZG90YV9oZWFsZXI6IFwiU2hyaW5lXCIsXG4gICAgICAgIGVudF9kb3RhX2ZvdW50YWluOiBcIkZvdW50YWluXCIsXG4gICAgICAgIG5wY19kb3RhX2ZvcnQ6IFwiQW5jaWVudFwiLFxuICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BcIixcbiAgICAgICAgbnBjX2RvdGFfdG93ZXI6IFwiVG93ZXJcIixcbiAgICAgICAgbnBjX2RvdGFfYmFycmFja3M6IFwiQmFycmFja3NcIixcbiAgICAgICAgbnBjX2RvdGFfZmlsbGVyOiBcIkJ1aWxkaW5nXCIsXG4gICAgICAgIHRyaWdnZXJfbXVsdGlwbGU6IFwiTmV1dHJhbCBDYW1wIFNwYXduIEJveFwiLFxuICAgICAgICBucGNfZG90YV9uZXV0cmFsX3NwYXduZXI6IFwiTmV1dHJhbCBDYW1wXCIsXG4gICAgICAgIG9ic2VydmVyOiBcIk9ic2VydmVyIFdhcmRcIixcbiAgICAgICAgc2VudHJ5OiBcIlNlbnRyeSBXYXJkXCJcbiAgICB9O1xuICAgICAgICBcbiAgICBmdW5jdGlvbiBnZXRVbml0TmFtZSh1bml0VHlwZSwgdW5pdFN1YlR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUsIHVuaXRTdWJUeXBlKTtcbiAgICAgICAgcmV0dXJuICh1bml0U3ViVHlwZSA/IGNhcGl0YWxpemUodW5pdFN1YlR5cGUucmVwbGFjZSgndG93ZXInLCAnVGllciAnKS5yZXBsYWNlKCdyYW5nZScsICdSYW5nZWQnKSkgKyAnICcgOiAnJykgKyB1bml0TmFtZXNbdW5pdFR5cGVdO1xuICAgIH1cblxuICAgIHZhciBwdWxsVHlwZXMgPSBbJ05vcm1hbCcsICdGYXN0JywgJ1Nsb3cnXTtcbiAgICB2YXIgbmV1dHJhbFR5cGVzID0gWydFYXN5JywgJ01lZGl1bScsICdIYXJkJywgJ0FuY2llbnQnXTtcbiAgICBmdW5jdGlvbiBnZXRQb3B1cENvbnRlbnQoc3RhdERhdGEsIHVuaXRUeXBlLCB1bml0U3ViVHlwZSwgdW5pdENsYXNzLCBhZGRWaXNpYmxlQXJlYSwgcHVsbFR5cGUsIG5ldXRyYWxUeXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRQb3B1cENvbnRlbnQnLCBwdWxsVHlwZSwgbmV1dHJhbFR5cGUpO1xuICAgICAgICB2YXIgcG9wdXBDb250ZW50SFRNTCA9ICc8Yj4nICsgZ2V0VW5pdE5hbWUodW5pdFR5cGUsIHVuaXRTdWJUeXBlKSArICc8L2I+PGJyPic7XG4gICAgICAgIGlmIChzdGF0RGF0YSkge1xuICAgICAgICAgICAgdmFyIHN0YXRzID0gc3RhdERhdGFbdW5pdENsYXNzXTtcbiAgICAgICAgICAgIGlmIChzdGF0cykge1xuICAgICAgICAgICAgICAgIGlmIChwdWxsVHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+UHVsbCBUeXBlOiBcIiArIHB1bGxUeXBlc1twdWxsVHlwZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChuZXV0cmFsVHlwZSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+RGlmZmljdWx0eTogXCIgKyBuZXV0cmFsVHlwZXNbbmV1dHJhbFR5cGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHMuaGFzT3duUHJvcGVydHkoJ2RhbWFnZU1pbicpICYmIHN0YXRzLmhhc093blByb3BlcnR5KCdkYW1hZ2VNYXgnKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkRhbWFnZTogXCIgKyBzdGF0cy5kYW1hZ2VNaW4gKyBcIiZuZGFzaDtcIiArIHN0YXRzLmRhbWFnZU1heDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzLmhhc093blByb3BlcnR5KCdiYXQnKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkJBVDogXCIgKyBzdGF0cy5iYXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnYXR0YWNrUmFuZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkF0dGFjayBSYW5nZTogXCIgKyBzdGF0cy5hdHRhY2tSYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzLmhhc093blByb3BlcnR5KCdoZWFsdGgnKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkhlYWx0aDogXCIgKyBzdGF0cy5oZWFsdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnYXJtb3InKSkge1xuICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkFybW9yOiBcIiArIHN0YXRzLmFybW9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdHMuaGFzT3duUHJvcGVydHkoJ2RheVZpc2lvbicpICYmIHN0YXRzLmhhc093blByb3BlcnR5KCduaWdodFZpc2lvbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+VmlzaW9uOiBcIiArIHN0YXRzLmRheVZpc2lvbiArIFwiL1wiICsgc3RhdHMubmlnaHRWaXNpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGF0cyB8fCBzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnZGF5VmlzaW9uJykgJiYgc3RhdHMuaGFzT3duUHJvcGVydHkoJ25pZ2h0VmlzaW9uJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoYWRkVmlzaWJsZUFyZWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5WaXNpYmxlIEFyZWE6IFwiICsgKHZzLmxpZ2h0QXJlYSAvIHZzLmFyZWEgKiAxMDApLnRvRml4ZWQoKSArICclICcgKyB2cy5saWdodEFyZWEgKyBcIi9cIiArIHZzLmFyZWE7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1bml0VHlwZSAhPSAnb2JzZXJ2ZXInICYmIHVuaXRUeXBlICE9ICdzZW50cnknKSBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPjxicj5DbGljayB0byB0dXJuIG9mZiByYW5nZSBvdmVybGF5cy5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+PGJyPkNsaWNrIHRvIHZpZXcgcmFuZ2Ugb3ZlcmxheXMuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodW5pdFR5cGUgPT0gJ29ic2VydmVyJyB8fCB1bml0VHlwZSA9PSAnc2VudHJ5JykgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj48YnI+Q2xpY2sgaWNvbiB0byByZW1vdmUgd2FyZC5cIjtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBwb3B1cENvbnRlbnRIVE1MO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVQb3B1cChtYXJrZXIsIGFkZFZpc2libGVBcmVhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1hcmtlci51bml0Q2xhc3MsIG1hcF9kYXRhLnN0YXRzKTtcblxuICAgICAgICB2YXIgcG9wdXBDb250ZW50SFRNTCA9IGdldFBvcHVwQ29udGVudChtYXBfZGF0YS5zdGF0cywgbWFya2VyLnVuaXRUeXBlLCBtYXJrZXIudW5pdFN1YlR5cGUsIG1hcmtlci51bml0Q2xhc3MsIGFkZFZpc2libGVBcmVhLCBtYXJrZXIucHVsbFR5cGUsIG1hcmtlci5uZXV0cmFsVHlwZSk7XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBpZiAobWFya2VyLmZlYXR1cmUucG9wdXApIHtcbiAgICAgICAgICAgIG1hcmtlci5mZWF0dXJlLnBvcHVwLnNldENvbnRlbnRIVE1MKHBvcHVwQ29udGVudEhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgdmlzaW9uIHNpbXVsYXRpb24gYW5kIHN0YXJ0IG1hcCBpbml0aWFsaXphdGlvbiBjaGVjayBpbiBjYWxsYmFja1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgdmFyIHZzID0gbmV3IFZpc2lvblNpbXVsYXRpb24od29ybGRkYXRhLCB2aXNpb25fZGF0YV9pbWFnZV9wYXRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2cyBsb2FkZWQnLCBEYXRlLm5vdygpIC0gdDEpO1xuICAgICAgICBjb25zb2xlLmxvZygnbWFwLmdldFNpemUoKScsIG1hcC5nZXRTaXplKCkpO1xuICAgICAgICBpbml0Q2hlY2soKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBDaGVjayBpZiBtYXAgaXMgcmVhZHkgdG8gaW5pdGlhbGl6ZSwgaWYgbm90IHJldHJ5XG4gICAgdmFyIGluaXRDaGVja0NvdW50ID0gMDtcbiAgICB2YXIgbWF4SW5pdENoZWNrQ291bnQgPSA0MDtcbiAgICBmdW5jdGlvbiBpbml0Q2hlY2soKSB7XG4gICAgICAgIGlmIChtYXAuZ2V0U2l6ZSgpKSB7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbml0Q2hlY2tDb3VudCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hcCBzaXplIG51bGwnKTtcbiAgICAgICAgICAgIGlmIChpbml0Q2hlY2tDb3VudCA8IG1heEluaXRDaGVja0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbWFwLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGluaXRDaGVjaywgMjUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvbGxiYXIuZXJyb3IoXCJNYXggaW5pdCBjaGVjayBleGNlZWRlZFwiKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhIHByb2JsZW0gbG9hZGluZyB0aGUgbWFwLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgZGF0YSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnZGF0YScpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gZGF0YSAhPSBcIjY4N1wiO1xuICAgICAgICAvL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cInZpc2lvblNpbXVsYXRpb25Db250cm9sXCJdJykuc3R5bGUuZGlzcGxheSA9IFZJU0lPTl9TSU1VTEFUSU9OID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIikuZGlzYWJsZWQgPSAhVklTSU9OX1NJTVVMQVRJT047XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx3YXlzU2ltdWxhdGVDb250cm9sXCIpLmRpc2FibGVkID0gIVZJU0lPTl9TSU1VTEFUSU9OO1xuICAgICAgICBnZXRKU09OKG1hcF9kYXRhX3BhdGggKyBnZXREYXRhVmVyc2lvbigpICsgJy9tYXBkYXRhMi5qc29uJywgb25NYXBEYXRhTG9hZCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldFZpc2lvblJhZGl1cygpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUgfHwgRU5USVRJRVMub2JzZXJ2ZXIucmFkaXVzO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHA7IiwidmFyIG1hcENvbnN0YW50cyA9IHJlcXVpcmUoJy4vbWFwQ29uc3RhbnRzJyk7XG5cbmZ1bmN0aW9uIGxlcnAobWluVmFsLCBtYXhWYWwsIHBvc19yKSB7XG4gICAgcmV0dXJuIHBvc19yICogKG1heFZhbCAtIG1pblZhbCkgKyBtaW5WYWw7XG59XG5cbmZ1bmN0aW9uIHJldmVyc2VMZXJwKG1pblZhbCwgbWF4VmFsLCBwb3MpIHtcbiAgICByZXR1cm4gKHBvcyAtIG1pblZhbCkgLyAobWF4VmFsIC0gbWluVmFsKTtcbn1cblxuZnVuY3Rpb24gbGF0TG9uVG9Xb3JsZCh4LCB5KSB7XG4gICAgdmFyIHhfciA9IGxlcnAobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdLCB4IC8gbWFwQ29uc3RhbnRzLm1hcF93KSxcbiAgICAgICAgeV9yID0gbGVycChtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMV0sIChtYXBDb25zdGFudHMubWFwX2ggLSB5KSAvIG1hcENvbnN0YW50cy5tYXBfaCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4X3IsXG4gICAgICAgIHk6IHlfclxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHdvcmxkVG9MYXRMb24oeF9yLCB5X3IpIHtcbiAgICB2YXIgeCA9IHJldmVyc2VMZXJwKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1sxXSwgeF9yKSAqIG1hcENvbnN0YW50cy5tYXBfdyxcbiAgICAgICAgeSA9IG1hcENvbnN0YW50cy5tYXBfaCAtIHJldmVyc2VMZXJwKG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1sxXSwgeV9yKSAqIG1hcENvbnN0YW50cy5tYXBfaDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHlcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRUaWxlUmFkaXVzKHIpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5mbG9vcihyIC8gNjQpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2NhbGVkUmFkaXVzKHIpIHtcbiAgICByZXR1cm4gciAvIChtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1sxXSAtIG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzBdKSAqIG1hcENvbnN0YW50cy5tYXBfd1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVEaXN0YW5jZShvcmRlciwgdW5pdHMsIG1lYXN1cmUpIHtcbiAgICBpZiAob3JkZXIgPT0gMSkge1xuICAgICAgICBpZiAodW5pdHMgPT0gXCJrbVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVhc3VyZSAqIG1hcENvbnN0YW50cy5zY2FsZSAqIDEwMDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWVhc3VyZSAqIG1hcENvbnN0YW50cy5zY2FsZTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBtZWFzdXJlICogbWFwQ29uc3RhbnRzLnNjYWxlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbGVycDogbGVycCxcbiAgICByZXZlcnNlTGVycDogcmV2ZXJzZUxlcnAsXG4gICAgbGF0TG9uVG9Xb3JsZDogbGF0TG9uVG9Xb3JsZCxcbiAgICB3b3JsZFRvTGF0TG9uOiB3b3JsZFRvTGF0TG9uLFxuICAgIGdldFRpbGVSYWRpdXM6IGdldFRpbGVSYWRpdXMsXG4gICAgZ2V0U2NhbGVkUmFkaXVzOiBnZXRTY2FsZWRSYWRpdXMsXG4gICAgY2FsY3VsYXRlRGlzdGFuY2U6IGNhbGN1bGF0ZURpc3RhbmNlXG59IiwidmFyIFZpc2lvblNpbXVsYXRpb24gPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvblwiKTtcbnZhciBrZXkycHQgPSBWaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5rZXkycHQ7XG52YXIgeHkya2V5ID0gVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkya2V5O1xudmFyIHh5MnB0ID0gVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkycHQ7XG5cbmZ1bmN0aW9uIHByb2Nlc3NOZWlnaGJvcnMoZ3JpZCwgbGlnaHRzLCBjb21wb25lbnRzLCBrZXksIGluZGV4KSB7XG4gICAgdmFyIHB0ID0ga2V5MnB0KGtleSk7XG4gICAgdmFyIGRpcnMgPSBbWzEsIDBdLCBbMCwgLTFdLCBbLTEsIDBdLCBbMCwgMV1dO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYVggPSBwdC54K2RpcnNbaV1bMF07XG4gICAgICAgIHZhciBhWSA9IHB0LnkrZGlyc1tpXVsxXTtcbiAgICAgICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSBjb250aW51ZTtcbiAgICAgICAgdmFyIGtleUFkaiA9IGdyaWRbYVhdW2FZXS5rZXlcbiAgICAgICAgaWYgKGNvbXBvbmVudHNba2V5QWRqXSB8fCAhbGlnaHRzW2tleUFkal0pIGNvbnRpbnVlO1xuICAgICAgICBjb21wb25lbnRzW2tleUFkal0gPSBpbmRleDtcbiAgICAgICAgcHJvY2Vzc05laWdoYm9ycyhncmlkLCBsaWdodHMsIGNvbXBvbmVudHMsIGtleUFkaiwgaW5kZXgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TGlnaHRVbmlvbihncmlkLCBsaWdodHMpIHtcbiAgICB2YXIgY29tcG9uZW50cyA9IHt9O1xuICAgIHZhciBpbmRleCA9IDE7XG4gICAgZm9yICh2YXIga2V5IGluIGxpZ2h0cykge1xuICAgICAgICBpZiAoIWNvbXBvbmVudHNba2V5XSkge1xuICAgICAgICAgICAgY29tcG9uZW50c1trZXldID0gaW5kZXg7XG4gICAgICAgICAgICBwcm9jZXNzTmVpZ2hib3JzKGdyaWQsIGxpZ2h0cywgY29tcG9uZW50cywga2V5LCBpbmRleCk7XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHZhciBvdXRsaW5lcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgICBvdXRsaW5lcy5wdXNoKGdldE91dGxpbmUoZ3JpZCwgY29tcG9uZW50cywgaSkpXG4gICAgfVxuICAgIHJldHVybiBvdXRsaW5lcztcbn1cblxuZnVuY3Rpb24gaXNTaWRlRnJlZShncmlkLCBjb21wb25lbnRzLCBwdCwgZGlyKSB7XG4gICAgdmFyIGFYID0gcHQueCtkaXJbMF07XG4gICAgdmFyIGFZID0gcHQueStkaXJbMV07XG4gICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSByZXR1cm4gdHJ1ZTtcbiAgICB2YXIga2V5QWRqID0gZ3JpZFthWF1bYVldLmtleVxuICAgIHJldHVybiAhY29tcG9uZW50c1trZXlBZGpdO1xufVxuXG5mdW5jdGlvbiBub3RTdXJyb3VuZGVkKGdyaWQsIGNvbXBvbmVudHMsIHB0KSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKz0yKSB7XG4gICAgICAgIHZhciBhWCA9IHB0LngrTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICAgICAgdmFyIGFZID0gcHQueStNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgICAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIHJldHVybiBpO1xuICAgICAgICB2YXIga2V5QWRqID0gZ3JpZFthWF1bYVldLmtleVxuICAgICAgICBpZiAoIWNvbXBvbmVudHNba2V5QWRqXSkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBtb2QobiwgbSkge1xuICAgICAgICByZXR1cm4gKChuICUgbSkgKyBtKSAlIG07XG59XG5cbmZ1bmN0aW9uIGdldE91dGxpbmUoZ3JpZCwgY29tcG9uZW50cywgaW5kZXgpIHtcbiAgICB2YXIgb3V0bGluZVBvaW50cyA9IFtdO1xuICAgIHZhciBzdGFydEtleTtcbiAgICB2YXIgZGlyID0gbnVsbDtcbiAgICBmb3IgKHZhciBrZXkgaW4gY29tcG9uZW50cykge1xuICAgICAgICB2YXIgcHQgPSBrZXkycHQoa2V5KTtcbiAgICAgICAgZGlyID0gbm90U3Vycm91bmRlZChncmlkLCBjb21wb25lbnRzLCBwdCk7XG4gICAgICAgIGlmIChjb21wb25lbnRzW2tleV0gPT0gaW5kZXggJiYgZGlyICE9PSBudWxsKSB7XG4gICAgICAgICAgICBzdGFydEtleSA9IGtleTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBuZXh0ID0gcHJvY2Vzc05leHQoZ3JpZCwgY29tcG9uZW50cywgc3RhcnRLZXksIGRpcik7XG4gICAgd2hpbGUgKHN0YXJ0S2V5ICE9PSBuZXh0LmtleSB8fCBkaXIgIT09IG5leHQuZGlyKSB7XG4gICAgICAgIG91dGxpbmVQb2ludHMucHVzaChuZXh0LnBvaW50KTtcbiAgICAgICAgbmV4dCA9IHByb2Nlc3NOZXh0KGdyaWQsIGNvbXBvbmVudHMsIG5leHQua2V5LCBuZXh0LmRpcik7XG4gICAgfVxuICAgIG91dGxpbmVQb2ludHMucHVzaChuZXh0LnBvaW50KTtcbiAgICByZXR1cm4gb3V0bGluZVBvaW50cztcbn1cblxuZnVuY3Rpb24gY2hlY2tBZGooZ3JpZCwgY29tcG9uZW50cywgcHQsIGtleSwgZGlyLCBpLCBhZGpEaXIpIHtcbiAgICB2YXIgYVggPSBwdC54K2RpclswXTtcbiAgICB2YXIgYVkgPSBwdC55K2RpclsxXTtcbiAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIHJldHVybjtcbiAgICB2YXIgcHRBZGogPSBncmlkW3B0LngrZGlyWzBdXVtwdC55K2RpclsxXV07XG4gICAgaWYgKGNvbXBvbmVudHNbcHRBZGoua2V5XSA9PSBjb21wb25lbnRzW2tleV0gJiYgaXNTaWRlRnJlZShncmlkLCBjb21wb25lbnRzLCBwdEFkaiwgYWRqRGlyKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBwdEFkai5rZXksXG4gICAgICAgICAgICBkaXI6IGlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJvY2Vzc05leHQoZ3JpZCwgY29tcG9uZW50cywga2V5LCBpKSB7XG4gICAgdmFyIHB0ID0ga2V5MnB0KGtleSk7XG4gICAgdmFyIG5leHQ7XG4gICAgXG4gICAgdmFyIHggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgIHZhciB5ID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICBcbiAgICB2YXIgbkkgPSBtb2QoaSsyLCA4KTtcbiAgICB2YXIgblggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogbkkpKTtcbiAgICB2YXIgblkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogbkkpKTtcbiAgICBcbiAgICB2YXIgYkkgPSBtb2QoaS0xLCA4KTtcbiAgICB2YXIgYlggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYkkpKTtcbiAgICB2YXIgYlkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYkkpKTtcblxuICAgIGlmIChpc1NpZGVGcmVlKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBbblgsIG5ZXSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgZGlyOiBtb2QoaSsyLCA4KSxcbiAgICAgICAgICAgIHBvaW50OiB4eTJwdChwdC54K2JYLzIsIHB0LnkrYlkvMilcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHQpIG5leHQgPSBjaGVja0FkaihncmlkLCBjb21wb25lbnRzLCBwdCwga2V5LCBbblgsIG5ZXSwgaSwgW3gsIHldKTtcbiAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgdmFyIGFJID0gbW9kKGkgKyAxLCA4KTtcbiAgICAgICAgdmFyIGFYID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGFJKSk7XG4gICAgICAgIHZhciBhWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBhSSkpO1xuICAgICAgICB2YXIgcEkgPSBtb2QoaSAtIDIsIDgpO1xuICAgICAgICB2YXIgcFggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogcEkpKTtcbiAgICAgICAgdmFyIHBZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIHBJKSk7XG4gICAgICAgIG5leHQgPSBjaGVja0FkaihncmlkLCBjb21wb25lbnRzLCBwdCwga2V5LCBbYVgsIGFZXSwgcEksIFtwWCwgcFldKTtcbiAgICB9XG4gICAgaWYgKG5leHQpIHtcbiAgICAgICAgbmV4dC5wb2ludCA9IHh5MnB0KHB0LngrYlgvMiwgcHQueStiWS8yKTtcbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TGlnaHRVbmlvbjsiLCJ2YXIgbWFwQ29uc3RhbnRzID0ge1xuICAgIG1hcF93OiAxNjM4NCxcbiAgICBtYXBfaDogMTYzODQsXG4gICAgbWFwX3hfYm91bmRhcmllczogWy04NDc1LjU4NjE3Mzc3LCA5MzI3LjQ5MTI0NTU5XSxcbiAgICBtYXBfeV9ib3VuZGFyaWVzOiBbOTAyOC41MjQ3MzMzMiwgLTg4MzYuNjE0MDYyNjZdXG59XG5tYXBDb25zdGFudHMuc2NhbGUgPSBNYXRoLmFicyhtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1sxXSAtIG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzBdKSAvIG1hcENvbnN0YW50cy5tYXBfdztcblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDb25zdGFudHM7IiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbGlnaHRibHVlOiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIGZpbGxDb2xvcjogXCIjMDA3RkZGXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAuMlxuICAgIH0sXG4gICAgZGF5OiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNlZTk5MDBcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMC41LFxuICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgZmlsbENvbG9yOiBcIiNlZTk5MDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgbmlnaHQ6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwMDBGRlwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjUsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC4xXG4gICAgfSxcbiAgICB0cnVlX3NpZ2h0OiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMC41LFxuICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgcmVkOiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIGZpbGxDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAuMlxuICAgIH0sXG4gICAgYXR0YWNrX3JhbmdlOiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMC41LFxuICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgZ3JlZW46IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwRkYwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMEZGMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfSxcbiAgICB5ZWxsb3c6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGRkYwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRkZGMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfVxufTsiLCJmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHdhaXQpO1xuICAgICAgICBpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlOyIsImZ1bmN0aW9uIGdldEpTT04ocGF0aCwgY2FsbGJhY2spIHtcbiAgICBjb25zb2xlLmxvZygnZ2V0SlNPTicsIHBhdGgpO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBsb2FkaW5nIHBhZ2UuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnRXJyb3IgbG9hZGluZyBwYWdlLicpO1xuICAgIH07XG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SlNPTjsiLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJy4vdHJpbScpO1xuXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSkge1xuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXF1cIik7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIiksXG4gICAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgcmV0dXJuIHJlc3VsdHMgPT0gbnVsbCA/IFwiXCIgOiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxuZnVuY3Rpb24gc2V0UXVlcnlTdHJpbmcoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdhZGRRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpICsgJzsnICsgdmFsdWUsICcgOycpO1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHFzKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdyZW1vdmVRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpLnJlcGxhY2UodmFsdWUsICcnKS5yZXBsYWNlKC87Oy9nLCAnJyksICcgOycpO1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHFzICE9ICcnID8gcXMgOiBudWxsKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgdmFsdWUsIHVybCkge1xuICAgIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKFwiKFs/Jl0pXCIgKyBrZXkgKyBcIj0uKj8oJnwjfCQpKC4qKVwiLCBcImdpXCIpLFxuICAgICAgICBoYXNoO1xuXG4gICAgaWYgKHJlLnRlc3QodXJsKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZShyZSwgJyQxJyArIGtleSArIFwiPVwiICsgdmFsdWUgKyAnJDIkMycpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhc2ggPSB1cmwuc3BsaXQoJyMnKTtcbiAgICAgICAgICAgIHVybCA9IGhhc2hbMF0ucmVwbGFjZShyZSwgJyQxJDMnKS5yZXBsYWNlKC8oJnxcXD8pJC8sICcnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzaFsxXSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzaFsxXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB1cmwgKz0gJyMnICsgaGFzaFsxXTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgaGFzaCA9IHVybC5zcGxpdCgnIycpO1xuICAgICAgICAgICAgdXJsID0gaGFzaFswXSArIHNlcGFyYXRvciArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoWzFdICE9PSAndW5kZWZpbmVkJyAmJiBoYXNoWzFdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHVybCArPSAnIycgKyBoYXNoWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldFBhcmFtZXRlckJ5TmFtZTogZ2V0UGFyYW1ldGVyQnlOYW1lLFxuICAgIHNldFF1ZXJ5U3RyaW5nOiBzZXRRdWVyeVN0cmluZyxcbiAgICBhZGRRdWVyeVN0cmluZ1ZhbHVlOiBhZGRRdWVyeVN0cmluZ1ZhbHVlLFxuICAgIHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWU6IHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUsXG4gICAgdXBkYXRlUXVlcnlTdHJpbmc6IHVwZGF0ZVF1ZXJ5U3RyaW5nXG59IiwiZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFxbXFxdKCl7fT8qK1xcXiRcXFxcLnxcXC1dL2csIFwiXFxcXCQmXCIpO1xufVxuXG52YXIgdHJpbSA9IGZ1bmN0aW9uIHRyaW0oc3RyLCBjaGFyYWN0ZXJzLCBmbGFncykge1xuICAgIGZsYWdzID0gZmxhZ3MgfHwgXCJnXCI7XG4gICAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNoYXJhY3RlcnMgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGZsYWdzICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBtdXN0IGJlIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIS9eW2dpXSokLy50ZXN0KGZsYWdzKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBmbGFncyBzdXBwbGllZCAnXCIgKyBmbGFncy5tYXRjaChuZXcgUmVnRXhwKFwiW15naV0qXCIpKSArIFwiJ1wiKTtcbiAgICB9XG5cbiAgICBjaGFyYWN0ZXJzID0gZXNjYXBlUmVnZXgoY2hhcmFjdGVycyk7XG5cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5bXCIgKyBjaGFyYWN0ZXJzICsgXCJdK3xbXCIgKyBjaGFyYWN0ZXJzICsgXCJdKyRcIiwgZmxhZ3MpLCAnJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07IiwidmFyIFBORyA9IHJlcXVpcmUoJ3BuZy1qcycpO1xuXG5mdW5jdGlvbiBJbWFnZUhhbmRsZXIoaW1hZ2VQYXRoKSB7XG4gICAgdGhpcy5pbWFnZVBhdGggPSBpbWFnZVBhdGg7XG4gICAgc2VsZi5jYW52YXMgPSBudWxsO1xuICAgIHNlbGYucG5nID0gbnVsbDtcbn1cbkltYWdlSGFuZGxlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHNlbGYuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBQTkcubG9hZCh0aGlzLmltYWdlUGF0aCwgc2VsZi5jYW52YXMsIGZ1bmN0aW9uKHBuZykge1xuICAgICAgICBzZWxmLnBuZyA9IHBuZztcbiAgICAgICAgc2VsZi5jdHggPSBzZWxmLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG59XG5JbWFnZUhhbmRsZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIsIGdyaWQpIHtcbiAgICB2YXIgaW1nRGF0YSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YShvZmZzZXQsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHZhciBkYXRhID0gaW1nRGF0YS5kYXRhO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIHZhciByID0gZGF0YVtpXTtcbiAgICAgICAgdmFyIGcgPSBkYXRhW2krMV07XG4gICAgICAgIHZhciBiID0gZGF0YVtpKzJdO1xuICAgICAgICB2YXIgYWxwaGEgPSBkYXRhW2krM107XG4gICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcigoaS80KSAlIHdpZHRoKTtcbiAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKChpLzQpIC8gaGVpZ2h0KTtcbiAgICAgICAgcGl4ZWxIYW5kbGVyKHgsIHksIFtyLCBnLCBiXSwgZ3JpZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlSGFuZGxlcjsiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNC4wXG5cbi8qXG4jIE1JVCBMSUNFTlNFXG4jIENvcHlyaWdodCAoYykgMjAxMSBEZXZvbiBHb3ZldHRcbiMgXG4jIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBcbiMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIFxuIyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBcbiMgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIFxuIyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuIyBcbiMgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBcbiMgc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuIyBcbiMgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgXG4jIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBcbiMgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgXG4jIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgXG4jIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxudmFyIEZsYXRlU3RyZWFtID0gcmVxdWlyZSgnLi96bGliJyk7XG5cbiAgdmFyIFBORztcblxuICBQTkcgPSAoZnVuY3Rpb24oKSB7XG4gICAgUE5HLmxvYWQgPSBmdW5jdGlvbih1cmwsIGNhbnZhcywgY2FsbGJhY2spIHtcbiAgICAgIHZhciB4aHIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2YgY2FudmFzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FudmFzO1xuICAgICAgfVxuICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhLCBwbmc7XG4gICAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheSh4aHIucmVzcG9uc2UgfHwgeGhyLm1velJlc3BvbnNlQXJyYXlCdWZmZXIpO1xuICAgICAgICBwbmcgPSBuZXcgUE5HKGRhdGEpO1xuICAgICAgICBpZiAodHlwZW9mIChjYW52YXMgIT0gbnVsbCA/IGNhbnZhcy5nZXRDb250ZXh0IDogdm9pZCAwKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHBuZy5yZW5kZXIoY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBjYWxsYmFjayhwbmcpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB4aHIuc2VuZChudWxsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUE5HKGRhdGEpIHtcbiAgICAgIHZhciBjaHVua1NpemUsIGNvbG9ycywgZGVsYXlEZW4sIGRlbGF5TnVtLCBmcmFtZSwgaSwgaW5kZXgsIGtleSwgc2VjdGlvbiwgc2hvcnQsIHRleHQsIF9pLCBfaiwgX3JlZjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLnBvcyA9IDg7XG4gICAgICB0aGlzLnBhbGV0dGUgPSBbXTtcbiAgICAgIHRoaXMuaW1nRGF0YSA9IFtdO1xuICAgICAgdGhpcy50cmFuc3BhcmVuY3kgPSB7fTtcbiAgICAgIHRoaXMudGV4dCA9IHt9O1xuICAgICAgZnJhbWUgPSBudWxsO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY2h1bmtTaXplID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgIHNlY3Rpb24gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfaSwgX3Jlc3VsdHM7XG4gICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKGkgPSBfaSA9IDA7IF9pIDwgNDsgaSA9ICsrX2kpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmRhdGFbdGhpcy5wb3MrK10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9KS5jYWxsKHRoaXMpKS5qb2luKCcnKTtcbiAgICAgICAgc3dpdGNoIChzZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAnSUhEUic6XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMucmVhZFVJbnQzMigpO1xuICAgICAgICAgICAgdGhpcy5iaXRzID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5jb2xvclR5cGUgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmNvbXByZXNzaW9uTWV0aG9kID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJNZXRob2QgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmludGVybGFjZU1ldGhvZCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1BMVEUnOlxuICAgICAgICAgICAgdGhpcy5wYWxldHRlID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdJREFUJzpcbiAgICAgICAgICAgIGlmIChzZWN0aW9uID09PSAnZmRBVCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgICAgICAgY2h1bmtTaXplIC09IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhID0gKGZyYW1lICE9IG51bGwgPyBmcmFtZS5kYXRhIDogdm9pZCAwKSB8fCB0aGlzLmltZ0RhdGE7XG4gICAgICAgICAgICBmb3IgKGkgPSBfaSA9IDA7IDAgPD0gY2h1bmtTaXplID8gX2kgPCBjaHVua1NpemUgOiBfaSA+IGNodW5rU2l6ZTsgaSA9IDAgPD0gY2h1bmtTaXplID8gKytfaSA6IC0tX2kpIHtcbiAgICAgICAgICAgICAgZGF0YS5wdXNoKHRoaXMuZGF0YVt0aGlzLnBvcysrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0Uk5TJzpcbiAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5ID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICAgICAgc2hvcnQgPSAyNTUgLSB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKGkgPSBfaiA9IDA7IDAgPD0gc2hvcnQgPyBfaiA8IHNob3J0IDogX2ogPiBzaG9ydDsgaSA9IDAgPD0gc2hvcnQgPyArK19qIDogLS1faikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkLnB1c2goMjU1KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5ncmF5c2NhbGUgPSB0aGlzLnJlYWQoY2h1bmtTaXplKVswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LnJnYiA9IHRoaXMucmVhZChjaHVua1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAndEVYdCc6XG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICBpbmRleCA9IHRleHQuaW5kZXhPZigwKTtcbiAgICAgICAgICAgIGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCB0ZXh0LnNsaWNlKDAsIGluZGV4KSk7XG4gICAgICAgICAgICB0aGlzLnRleHRba2V5XSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCB0ZXh0LnNsaWNlKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnSUVORCc6XG4gICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZnJhbWVzLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaGFzQWxwaGFDaGFubmVsID0gKF9yZWYgPSB0aGlzLmNvbG9yVHlwZSkgPT09IDQgfHwgX3JlZiA9PT0gNjtcbiAgICAgICAgICAgIGNvbG9ycyA9IHRoaXMuY29sb3JzICsgKHRoaXMuaGFzQWxwaGFDaGFubmVsID8gMSA6IDApO1xuICAgICAgICAgICAgdGhpcy5waXhlbEJpdGxlbmd0aCA9IHRoaXMuYml0cyAqIGNvbG9ycztcbiAgICAgICAgICAgIHRoaXMuY29sb3JTcGFjZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbG9ycykge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnRGV2aWNlR3JheSc7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdEZXZpY2VSR0InO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbWdEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5pbWdEYXRhKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gY2h1bmtTaXplO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zICs9IDQ7XG4gICAgICAgIGlmICh0aGlzLnBvcyA+IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvbXBsZXRlIG9yIGNvcnJ1cHQgUE5HIGZpbGVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQTkcucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihieXRlcykge1xuICAgICAgdmFyIGksIF9pLCBfcmVzdWx0cztcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSBfaSA9IDA7IDAgPD0gYnl0ZXMgPyBfaSA8IGJ5dGVzIDogX2kgPiBieXRlczsgaSA9IDAgPD0gYnl0ZXMgPyArK19pIDogLS1faSkge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuZGF0YVt0aGlzLnBvcysrXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUucmVhZFVJbnQzMiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGIxLCBiMiwgYjMsIGI0O1xuICAgICAgYjEgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgMjQ7XG4gICAgICBiMiA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCAxNjtcbiAgICAgIGIzID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDg7XG4gICAgICBiNCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgIHJldHVybiBiMSB8IGIyIHwgYjMgfCBiNDtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZWFkVUludDE2ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjEsIGIyO1xuICAgICAgYjEgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgODtcbiAgICAgIGIyID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgcmV0dXJuIGIxIHwgYjI7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlUGl4ZWxzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIGJ5dGUsIGMsIGNvbCwgaSwgbGVmdCwgbGVuZ3RoLCBwLCBwYSwgcGFldGgsIHBiLCBwYywgcGl4ZWxCeXRlcywgcGl4ZWxzLCBwb3MsIHJvdywgc2NhbmxpbmVMZW5ndGgsIHVwcGVyLCB1cHBlckxlZnQsIF9pLCBfaiwgX2ssIF9sLCBfbTtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMuaW1nRGF0YTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgICB9XG4gICAgICBkYXRhID0gbmV3IEZsYXRlU3RyZWFtKGRhdGEpO1xuICAgICAgZGF0YSA9IGRhdGEuZ2V0Qnl0ZXMoKTtcbiAgICAgIHBpeGVsQnl0ZXMgPSB0aGlzLnBpeGVsQml0bGVuZ3RoIC8gODtcbiAgICAgIHNjYW5saW5lTGVuZ3RoID0gcGl4ZWxCeXRlcyAqIHRoaXMud2lkdGg7XG4gICAgICBwaXhlbHMgPSBuZXcgVWludDhBcnJheShzY2FubGluZUxlbmd0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgcm93ID0gMDtcbiAgICAgIHBvcyA9IDA7XG4gICAgICBjID0gMDtcbiAgICAgIHdoaWxlIChwb3MgPCBsZW5ndGgpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhW3BvcysrXSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgX2kgPCBzY2FubGluZUxlbmd0aDsgaSA9IF9pICs9IDEpIHtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGZvciAoaSA9IF9qID0gMDsgX2ogPCBzY2FubGluZUxlbmd0aDsgaSA9IF9qICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBsZWZ0ID0gaSA8IHBpeGVsQnl0ZXMgPyAwIDogcGl4ZWxzW2MgLSBwaXhlbEJ5dGVzXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIGxlZnQpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZm9yIChpID0gX2sgPSAwOyBfayA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2sgKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGNvbCA9IChpIC0gKGkgJSBwaXhlbEJ5dGVzKSkgLyBwaXhlbEJ5dGVzO1xuICAgICAgICAgICAgICB1cHBlciA9IHJvdyAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyBjb2wgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKHVwcGVyICsgYnl0ZSkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBmb3IgKGkgPSBfbCA9IDA7IF9sIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfbCArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICB1cHBlciA9IHJvdyAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyBjb2wgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKGJ5dGUgKyBNYXRoLmZsb29yKChsZWZ0ICsgdXBwZXIpIC8gMikpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgZm9yIChpID0gX20gPSAwOyBfbSA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX20gKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGNvbCA9IChpIC0gKGkgJSBwaXhlbEJ5dGVzKSkgLyBwaXhlbEJ5dGVzO1xuICAgICAgICAgICAgICBsZWZ0ID0gaSA8IHBpeGVsQnl0ZXMgPyAwIDogcGl4ZWxzW2MgLSBwaXhlbEJ5dGVzXTtcbiAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHVwcGVyID0gdXBwZXJMZWZ0ID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cHBlciA9IHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgICB1cHBlckxlZnQgPSBjb2wgJiYgcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgKGNvbCAtIDEpICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHAgPSBsZWZ0ICsgdXBwZXIgLSB1cHBlckxlZnQ7XG4gICAgICAgICAgICAgIHBhID0gTWF0aC5hYnMocCAtIGxlZnQpO1xuICAgICAgICAgICAgICBwYiA9IE1hdGguYWJzKHAgLSB1cHBlcik7XG4gICAgICAgICAgICAgIHBjID0gTWF0aC5hYnMocCAtIHVwcGVyTGVmdCk7XG4gICAgICAgICAgICAgIGlmIChwYSA8PSBwYiAmJiBwYSA8PSBwYykge1xuICAgICAgICAgICAgICAgIHBhZXRoID0gbGVmdDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYiA8PSBwYykge1xuICAgICAgICAgICAgICAgIHBhZXRoID0gdXBwZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSB1cHBlckxlZnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIHBhZXRoKSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZpbHRlciBhbGdvcml0aG06IFwiICsgZGF0YVtwb3MgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcm93Kys7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGl4ZWxzO1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmRlY29kZVBhbGV0dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjLCBpLCBsZW5ndGgsIHBhbGV0dGUsIHBvcywgcmV0LCB0cmFuc3BhcmVuY3ksIF9pLCBfcmVmLCBfcmVmMTtcbiAgICAgIHBhbGV0dGUgPSB0aGlzLnBhbGV0dGU7XG4gICAgICB0cmFuc3BhcmVuY3kgPSB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkIHx8IFtdO1xuICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkoKHRyYW5zcGFyZW5jeS5sZW5ndGggfHwgMCkgKyBwYWxldHRlLmxlbmd0aCk7XG4gICAgICBwb3MgPSAwO1xuICAgICAgbGVuZ3RoID0gcGFsZXR0ZS5sZW5ndGg7XG4gICAgICBjID0gMDtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX3JlZiA9IHBhbGV0dGUubGVuZ3RoOyBfaSA8IF9yZWY7IGkgPSBfaSArPSAzKSB7XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2ldO1xuICAgICAgICByZXRbcG9zKytdID0gcGFsZXR0ZVtpICsgMV07XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2kgKyAyXTtcbiAgICAgICAgcmV0W3BvcysrXSA9IChfcmVmMSA9IHRyYW5zcGFyZW5jeVtjKytdKSAhPSBudWxsID8gX3JlZjEgOiAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmNvcHlUb0ltYWdlRGF0YSA9IGZ1bmN0aW9uKGltYWdlRGF0YSwgcGl4ZWxzKSB7XG4gICAgICB2YXIgYWxwaGEsIGNvbG9ycywgZGF0YSwgaSwgaW5wdXQsIGosIGssIGxlbmd0aCwgcGFsZXR0ZSwgdiwgX3JlZjtcbiAgICAgIGNvbG9ycyA9IHRoaXMuY29sb3JzO1xuICAgICAgcGFsZXR0ZSA9IG51bGw7XG4gICAgICBhbHBoYSA9IHRoaXMuaGFzQWxwaGFDaGFubmVsO1xuICAgICAgaWYgKHRoaXMucGFsZXR0ZS5sZW5ndGgpIHtcbiAgICAgICAgcGFsZXR0ZSA9IChfcmVmID0gdGhpcy5fZGVjb2RlZFBhbGV0dGUpICE9IG51bGwgPyBfcmVmIDogdGhpcy5fZGVjb2RlZFBhbGV0dGUgPSB0aGlzLmRlY29kZVBhbGV0dGUoKTtcbiAgICAgICAgY29sb3JzID0gNDtcbiAgICAgICAgYWxwaGEgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZGF0YSA9IGltYWdlRGF0YS5kYXRhIHx8IGltYWdlRGF0YTtcbiAgICAgIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgaW5wdXQgPSBwYWxldHRlIHx8IHBpeGVscztcbiAgICAgIGkgPSBqID0gMDtcbiAgICAgIGlmIChjb2xvcnMgPT09IDEpIHtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICBrID0gcGFsZXR0ZSA/IHBpeGVsc1tpIC8gNF0gKiA0IDogajtcbiAgICAgICAgICB2ID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSB2O1xuICAgICAgICAgIGRhdGFbaSsrXSA9IHY7XG4gICAgICAgICAgZGF0YVtpKytdID0gdjtcbiAgICAgICAgICBkYXRhW2krK10gPSBhbHBoYSA/IGlucHV0W2srK10gOiAyNTU7XG4gICAgICAgICAgaiA9IGs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgayA9IHBhbGV0dGUgPyBwaXhlbHNbaSAvIDRdICogNCA6IGo7XG4gICAgICAgICAgZGF0YVtpKytdID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gYWxwaGEgPyBpbnB1dFtrKytdIDogMjU1O1xuICAgICAgICAgIGogPSBrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmV0O1xuICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICogNCk7XG4gICAgICB0aGlzLmNvcHlUb0ltYWdlRGF0YShyZXQsIHRoaXMuZGVjb2RlUGl4ZWxzKCkpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgIHZhciBjdHgsIGRhdGE7XG4gICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGRhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuY29weVRvSW1hZ2VEYXRhKGRhdGEsIHRoaXMuZGVjb2RlUGl4ZWxzKCkpO1xuICAgICAgcmV0dXJuIGN0eC5wdXRJbWFnZURhdGEoZGF0YSwgMCwgMCk7XG4gICAgfTtcblxuICAgIHJldHVybiBQTkc7XG5cbiAgfSkoKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFBORzsiLCIvKlxuICogRXh0cmFjdGVkIGZyb20gcGRmLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5kcmVhc2dhbC9wZGYuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uXG4gKlxuICogQ29udHJpYnV0b3JzOiBBbmRyZWFzIEdhbCA8Z2FsQG1vemlsbGEuY29tPlxuICogICAgICAgICAgICAgICBDaHJpcyBHIEpvbmVzIDxjam9uZXNAbW96aWxsYS5jb20+XG4gKiAgICAgICAgICAgICAgIFNoYW9uIEJhcm1hbiA8c2hhb24uYmFybWFuQGdtYWlsLmNvbT5cbiAqICAgICAgICAgICAgICAgVml2aWVuIE5pY29sYXMgPDIxQHZpbmd0ZXR1bi5vcmc+XG4gKiAgICAgICAgICAgICAgIEp1c3RpbiBEJ0FyY2FuZ2VsbyA8anVzdGluZGFyY0BnbWFpbC5jb20+XG4gKiAgICAgICAgICAgICAgIFl1cnkgRGVsZW5kaWtcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuICogY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLFxuICogdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvblxuICogdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsXG4gKiBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcbiAqIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTExcbiAqIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUlxuICogREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBEZWNvZGVTdHJlYW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IDA7XG4gICAgdGhpcy5lb2YgPSBmYWxzZTtcbiAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSB7XG4gICAgZW5zdXJlQnVmZmVyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZW5zdXJlQnVmZmVyKHJlcXVlc3RlZCkge1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgdmFyIGN1cnJlbnQgPSBidWZmZXIgPyBidWZmZXIuYnl0ZUxlbmd0aCA6IDA7XG4gICAgICBpZiAocmVxdWVzdGVkIDwgY3VycmVudClcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgIHZhciBzaXplID0gNTEyO1xuICAgICAgd2hpbGUgKHNpemUgPCByZXF1ZXN0ZWQpXG4gICAgICAgIHNpemUgPDw9IDE7XG4gICAgICB2YXIgYnVmZmVyMiA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50OyArK2kpXG4gICAgICAgIGJ1ZmZlcjJbaV0gPSBidWZmZXJbaV07XG4gICAgICByZXR1cm4gdGhpcy5idWZmZXIgPSBidWZmZXIyO1xuICAgIH0sXG4gICAgZ2V0Qnl0ZTogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2dldEJ5dGUoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLmVvZilcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclt0aGlzLnBvcysrXTtcbiAgICB9LFxuICAgIGdldEJ5dGVzOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Qnl0ZXMobGVuZ3RoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG5cbiAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgbGVuZ3RoKTtcbiAgICAgICAgdmFyIGVuZCA9IHBvcyArIGxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoIXRoaXMuZW9mICYmIHRoaXMuYnVmZmVyTGVuZ3RoIDwgZW5kKVxuICAgICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG5cbiAgICAgICAgdmFyIGJ1ZkVuZCA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgICBpZiAoZW5kID4gYnVmRW5kKVxuICAgICAgICAgIGVuZCA9IGJ1ZkVuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICghdGhpcy5lb2YpXG4gICAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcblxuICAgICAgICB2YXIgZW5kID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zID0gZW5kO1xuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyLnN1YmFycmF5KHBvcywgZW5kKTtcbiAgICB9LFxuICAgIGxvb2tDaGFyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fbG9va0NoYXIoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLmVvZilcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuYnVmZmVyW3RoaXMucG9zXSk7XG4gICAgfSxcbiAgICBnZXRDaGFyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Q2hhcigpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5idWZmZXJbdGhpcy5wb3MrK10pO1xuICAgIH0sXG4gICAgbWFrZVN1YlN0cmVhbTogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX21ha2VTdWJzdHJlYW0oc3RhcnQsIGxlbmd0aCwgZGljdCkge1xuICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IGVuZCAmJiAhdGhpcy5lb2YpXG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICByZXR1cm4gbmV3IFN0cmVhbSh0aGlzLmJ1ZmZlciwgc3RhcnQsIGxlbmd0aCwgZGljdCk7XG4gICAgfSxcbiAgICBza2lwOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fc2tpcChuKSB7XG4gICAgICBpZiAoIW4pXG4gICAgICAgIG4gPSAxO1xuICAgICAgdGhpcy5wb3MgKz0gbjtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fcmVzZXQoKSB7XG4gICAgICB0aGlzLnBvcyA9IDA7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBjb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbnZhciBGbGF0ZVN0cmVhbSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIGNvZGVMZW5Db2RlTWFwID0gbmV3IFVpbnQzMkFycmF5KFtcbiAgICAxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1XG4gIF0pO1xuXG4gIHZhciBsZW5ndGhEZWNvZGUgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4MDAwMDMsIDB4MDAwMDQsIDB4MDAwMDUsIDB4MDAwMDYsIDB4MDAwMDcsIDB4MDAwMDgsIDB4MDAwMDksIDB4MDAwMGEsXG4gICAgMHgxMDAwYiwgMHgxMDAwZCwgMHgxMDAwZiwgMHgxMDAxMSwgMHgyMDAxMywgMHgyMDAxNywgMHgyMDAxYiwgMHgyMDAxZixcbiAgICAweDMwMDIzLCAweDMwMDJiLCAweDMwMDMzLCAweDMwMDNiLCAweDQwMDQzLCAweDQwMDUzLCAweDQwMDYzLCAweDQwMDczLFxuICAgIDB4NTAwODMsIDB4NTAwYTMsIDB4NTAwYzMsIDB4NTAwZTMsIDB4MDAxMDIsIDB4MDAxMDIsIDB4MDAxMDJcbiAgXSk7XG5cbiAgdmFyIGRpc3REZWNvZGUgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4MDAwMDEsIDB4MDAwMDIsIDB4MDAwMDMsIDB4MDAwMDQsIDB4MTAwMDUsIDB4MTAwMDcsIDB4MjAwMDksIDB4MjAwMGQsXG4gICAgMHgzMDAxMSwgMHgzMDAxOSwgMHg0MDAyMSwgMHg0MDAzMSwgMHg1MDA0MSwgMHg1MDA2MSwgMHg2MDA4MSwgMHg2MDBjMSxcbiAgICAweDcwMTAxLCAweDcwMTgxLCAweDgwMjAxLCAweDgwMzAxLCAweDkwNDAxLCAweDkwNjAxLCAweGEwODAxLCAweGEwYzAxLFxuICAgIDB4YjEwMDEsIDB4YjE4MDEsIDB4YzIwMDEsIDB4YzMwMDEsIDB4ZDQwMDEsIDB4ZDYwMDFcbiAgXSk7XG5cbiAgdmFyIGZpeGVkTGl0Q29kZVRhYiA9IFtuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4NzAxMDAsIDB4ODAwNTAsIDB4ODAwMTAsIDB4ODAxMTgsIDB4NzAxMTAsIDB4ODAwNzAsIDB4ODAwMzAsIDB4OTAwYzAsXG4gICAgMHg3MDEwOCwgMHg4MDA2MCwgMHg4MDAyMCwgMHg5MDBhMCwgMHg4MDAwMCwgMHg4MDA4MCwgMHg4MDA0MCwgMHg5MDBlMCxcbiAgICAweDcwMTA0LCAweDgwMDU4LCAweDgwMDE4LCAweDkwMDkwLCAweDcwMTE0LCAweDgwMDc4LCAweDgwMDM4LCAweDkwMGQwLFxuICAgIDB4NzAxMGMsIDB4ODAwNjgsIDB4ODAwMjgsIDB4OTAwYjAsIDB4ODAwMDgsIDB4ODAwODgsIDB4ODAwNDgsIDB4OTAwZjAsXG4gICAgMHg3MDEwMiwgMHg4MDA1NCwgMHg4MDAxNCwgMHg4MDExYywgMHg3MDExMiwgMHg4MDA3NCwgMHg4MDAzNCwgMHg5MDBjOCxcbiAgICAweDcwMTBhLCAweDgwMDY0LCAweDgwMDI0LCAweDkwMGE4LCAweDgwMDA0LCAweDgwMDg0LCAweDgwMDQ0LCAweDkwMGU4LFxuICAgIDB4NzAxMDYsIDB4ODAwNWMsIDB4ODAwMWMsIDB4OTAwOTgsIDB4NzAxMTYsIDB4ODAwN2MsIDB4ODAwM2MsIDB4OTAwZDgsXG4gICAgMHg3MDEwZSwgMHg4MDA2YywgMHg4MDAyYywgMHg5MDBiOCwgMHg4MDAwYywgMHg4MDA4YywgMHg4MDA0YywgMHg5MDBmOCxcbiAgICAweDcwMTAxLCAweDgwMDUyLCAweDgwMDEyLCAweDgwMTFhLCAweDcwMTExLCAweDgwMDcyLCAweDgwMDMyLCAweDkwMGM0LFxuICAgIDB4NzAxMDksIDB4ODAwNjIsIDB4ODAwMjIsIDB4OTAwYTQsIDB4ODAwMDIsIDB4ODAwODIsIDB4ODAwNDIsIDB4OTAwZTQsXG4gICAgMHg3MDEwNSwgMHg4MDA1YSwgMHg4MDAxYSwgMHg5MDA5NCwgMHg3MDExNSwgMHg4MDA3YSwgMHg4MDAzYSwgMHg5MDBkNCxcbiAgICAweDcwMTBkLCAweDgwMDZhLCAweDgwMDJhLCAweDkwMGI0LCAweDgwMDBhLCAweDgwMDhhLCAweDgwMDRhLCAweDkwMGY0LFxuICAgIDB4NzAxMDMsIDB4ODAwNTYsIDB4ODAwMTYsIDB4ODAxMWUsIDB4NzAxMTMsIDB4ODAwNzYsIDB4ODAwMzYsIDB4OTAwY2MsXG4gICAgMHg3MDEwYiwgMHg4MDA2NiwgMHg4MDAyNiwgMHg5MDBhYywgMHg4MDAwNiwgMHg4MDA4NiwgMHg4MDA0NiwgMHg5MDBlYyxcbiAgICAweDcwMTA3LCAweDgwMDVlLCAweDgwMDFlLCAweDkwMDljLCAweDcwMTE3LCAweDgwMDdlLCAweDgwMDNlLCAweDkwMGRjLFxuICAgIDB4NzAxMGYsIDB4ODAwNmUsIDB4ODAwMmUsIDB4OTAwYmMsIDB4ODAwMGUsIDB4ODAwOGUsIDB4ODAwNGUsIDB4OTAwZmMsXG4gICAgMHg3MDEwMCwgMHg4MDA1MSwgMHg4MDAxMSwgMHg4MDExOSwgMHg3MDExMCwgMHg4MDA3MSwgMHg4MDAzMSwgMHg5MDBjMixcbiAgICAweDcwMTA4LCAweDgwMDYxLCAweDgwMDIxLCAweDkwMGEyLCAweDgwMDAxLCAweDgwMDgxLCAweDgwMDQxLCAweDkwMGUyLFxuICAgIDB4NzAxMDQsIDB4ODAwNTksIDB4ODAwMTksIDB4OTAwOTIsIDB4NzAxMTQsIDB4ODAwNzksIDB4ODAwMzksIDB4OTAwZDIsXG4gICAgMHg3MDEwYywgMHg4MDA2OSwgMHg4MDAyOSwgMHg5MDBiMiwgMHg4MDAwOSwgMHg4MDA4OSwgMHg4MDA0OSwgMHg5MDBmMixcbiAgICAweDcwMTAyLCAweDgwMDU1LCAweDgwMDE1LCAweDgwMTFkLCAweDcwMTEyLCAweDgwMDc1LCAweDgwMDM1LCAweDkwMGNhLFxuICAgIDB4NzAxMGEsIDB4ODAwNjUsIDB4ODAwMjUsIDB4OTAwYWEsIDB4ODAwMDUsIDB4ODAwODUsIDB4ODAwNDUsIDB4OTAwZWEsXG4gICAgMHg3MDEwNiwgMHg4MDA1ZCwgMHg4MDAxZCwgMHg5MDA5YSwgMHg3MDExNiwgMHg4MDA3ZCwgMHg4MDAzZCwgMHg5MDBkYSxcbiAgICAweDcwMTBlLCAweDgwMDZkLCAweDgwMDJkLCAweDkwMGJhLCAweDgwMDBkLCAweDgwMDhkLCAweDgwMDRkLCAweDkwMGZhLFxuICAgIDB4NzAxMDEsIDB4ODAwNTMsIDB4ODAwMTMsIDB4ODAxMWIsIDB4NzAxMTEsIDB4ODAwNzMsIDB4ODAwMzMsIDB4OTAwYzYsXG4gICAgMHg3MDEwOSwgMHg4MDA2MywgMHg4MDAyMywgMHg5MDBhNiwgMHg4MDAwMywgMHg4MDA4MywgMHg4MDA0MywgMHg5MDBlNixcbiAgICAweDcwMTA1LCAweDgwMDViLCAweDgwMDFiLCAweDkwMDk2LCAweDcwMTE1LCAweDgwMDdiLCAweDgwMDNiLCAweDkwMGQ2LFxuICAgIDB4NzAxMGQsIDB4ODAwNmIsIDB4ODAwMmIsIDB4OTAwYjYsIDB4ODAwMGIsIDB4ODAwOGIsIDB4ODAwNGIsIDB4OTAwZjYsXG4gICAgMHg3MDEwMywgMHg4MDA1NywgMHg4MDAxNywgMHg4MDExZiwgMHg3MDExMywgMHg4MDA3NywgMHg4MDAzNywgMHg5MDBjZSxcbiAgICAweDcwMTBiLCAweDgwMDY3LCAweDgwMDI3LCAweDkwMGFlLCAweDgwMDA3LCAweDgwMDg3LCAweDgwMDQ3LCAweDkwMGVlLFxuICAgIDB4NzAxMDcsIDB4ODAwNWYsIDB4ODAwMWYsIDB4OTAwOWUsIDB4NzAxMTcsIDB4ODAwN2YsIDB4ODAwM2YsIDB4OTAwZGUsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZiwgMHg4MDAyZiwgMHg5MDBiZSwgMHg4MDAwZiwgMHg4MDA4ZiwgMHg4MDA0ZiwgMHg5MDBmZSxcbiAgICAweDcwMTAwLCAweDgwMDUwLCAweDgwMDEwLCAweDgwMTE4LCAweDcwMTEwLCAweDgwMDcwLCAweDgwMDMwLCAweDkwMGMxLFxuICAgIDB4NzAxMDgsIDB4ODAwNjAsIDB4ODAwMjAsIDB4OTAwYTEsIDB4ODAwMDAsIDB4ODAwODAsIDB4ODAwNDAsIDB4OTAwZTEsXG4gICAgMHg3MDEwNCwgMHg4MDA1OCwgMHg4MDAxOCwgMHg5MDA5MSwgMHg3MDExNCwgMHg4MDA3OCwgMHg4MDAzOCwgMHg5MDBkMSxcbiAgICAweDcwMTBjLCAweDgwMDY4LCAweDgwMDI4LCAweDkwMGIxLCAweDgwMDA4LCAweDgwMDg4LCAweDgwMDQ4LCAweDkwMGYxLFxuICAgIDB4NzAxMDIsIDB4ODAwNTQsIDB4ODAwMTQsIDB4ODAxMWMsIDB4NzAxMTIsIDB4ODAwNzQsIDB4ODAwMzQsIDB4OTAwYzksXG4gICAgMHg3MDEwYSwgMHg4MDA2NCwgMHg4MDAyNCwgMHg5MDBhOSwgMHg4MDAwNCwgMHg4MDA4NCwgMHg4MDA0NCwgMHg5MDBlOSxcbiAgICAweDcwMTA2LCAweDgwMDVjLCAweDgwMDFjLCAweDkwMDk5LCAweDcwMTE2LCAweDgwMDdjLCAweDgwMDNjLCAweDkwMGQ5LFxuICAgIDB4NzAxMGUsIDB4ODAwNmMsIDB4ODAwMmMsIDB4OTAwYjksIDB4ODAwMGMsIDB4ODAwOGMsIDB4ODAwNGMsIDB4OTAwZjksXG4gICAgMHg3MDEwMSwgMHg4MDA1MiwgMHg4MDAxMiwgMHg4MDExYSwgMHg3MDExMSwgMHg4MDA3MiwgMHg4MDAzMiwgMHg5MDBjNSxcbiAgICAweDcwMTA5LCAweDgwMDYyLCAweDgwMDIyLCAweDkwMGE1LCAweDgwMDAyLCAweDgwMDgyLCAweDgwMDQyLCAweDkwMGU1LFxuICAgIDB4NzAxMDUsIDB4ODAwNWEsIDB4ODAwMWEsIDB4OTAwOTUsIDB4NzAxMTUsIDB4ODAwN2EsIDB4ODAwM2EsIDB4OTAwZDUsXG4gICAgMHg3MDEwZCwgMHg4MDA2YSwgMHg4MDAyYSwgMHg5MDBiNSwgMHg4MDAwYSwgMHg4MDA4YSwgMHg4MDA0YSwgMHg5MDBmNSxcbiAgICAweDcwMTAzLCAweDgwMDU2LCAweDgwMDE2LCAweDgwMTFlLCAweDcwMTEzLCAweDgwMDc2LCAweDgwMDM2LCAweDkwMGNkLFxuICAgIDB4NzAxMGIsIDB4ODAwNjYsIDB4ODAwMjYsIDB4OTAwYWQsIDB4ODAwMDYsIDB4ODAwODYsIDB4ODAwNDYsIDB4OTAwZWQsXG4gICAgMHg3MDEwNywgMHg4MDA1ZSwgMHg4MDAxZSwgMHg5MDA5ZCwgMHg3MDExNywgMHg4MDA3ZSwgMHg4MDAzZSwgMHg5MDBkZCxcbiAgICAweDcwMTBmLCAweDgwMDZlLCAweDgwMDJlLCAweDkwMGJkLCAweDgwMDBlLCAweDgwMDhlLCAweDgwMDRlLCAweDkwMGZkLFxuICAgIDB4NzAxMDAsIDB4ODAwNTEsIDB4ODAwMTEsIDB4ODAxMTksIDB4NzAxMTAsIDB4ODAwNzEsIDB4ODAwMzEsIDB4OTAwYzMsXG4gICAgMHg3MDEwOCwgMHg4MDA2MSwgMHg4MDAyMSwgMHg5MDBhMywgMHg4MDAwMSwgMHg4MDA4MSwgMHg4MDA0MSwgMHg5MDBlMyxcbiAgICAweDcwMTA0LCAweDgwMDU5LCAweDgwMDE5LCAweDkwMDkzLCAweDcwMTE0LCAweDgwMDc5LCAweDgwMDM5LCAweDkwMGQzLFxuICAgIDB4NzAxMGMsIDB4ODAwNjksIDB4ODAwMjksIDB4OTAwYjMsIDB4ODAwMDksIDB4ODAwODksIDB4ODAwNDksIDB4OTAwZjMsXG4gICAgMHg3MDEwMiwgMHg4MDA1NSwgMHg4MDAxNSwgMHg4MDExZCwgMHg3MDExMiwgMHg4MDA3NSwgMHg4MDAzNSwgMHg5MDBjYixcbiAgICAweDcwMTBhLCAweDgwMDY1LCAweDgwMDI1LCAweDkwMGFiLCAweDgwMDA1LCAweDgwMDg1LCAweDgwMDQ1LCAweDkwMGViLFxuICAgIDB4NzAxMDYsIDB4ODAwNWQsIDB4ODAwMWQsIDB4OTAwOWIsIDB4NzAxMTYsIDB4ODAwN2QsIDB4ODAwM2QsIDB4OTAwZGIsXG4gICAgMHg3MDEwZSwgMHg4MDA2ZCwgMHg4MDAyZCwgMHg5MDBiYiwgMHg4MDAwZCwgMHg4MDA4ZCwgMHg4MDA0ZCwgMHg5MDBmYixcbiAgICAweDcwMTAxLCAweDgwMDUzLCAweDgwMDEzLCAweDgwMTFiLCAweDcwMTExLCAweDgwMDczLCAweDgwMDMzLCAweDkwMGM3LFxuICAgIDB4NzAxMDksIDB4ODAwNjMsIDB4ODAwMjMsIDB4OTAwYTcsIDB4ODAwMDMsIDB4ODAwODMsIDB4ODAwNDMsIDB4OTAwZTcsXG4gICAgMHg3MDEwNSwgMHg4MDA1YiwgMHg4MDAxYiwgMHg5MDA5NywgMHg3MDExNSwgMHg4MDA3YiwgMHg4MDAzYiwgMHg5MDBkNyxcbiAgICAweDcwMTBkLCAweDgwMDZiLCAweDgwMDJiLCAweDkwMGI3LCAweDgwMDBiLCAweDgwMDhiLCAweDgwMDRiLCAweDkwMGY3LFxuICAgIDB4NzAxMDMsIDB4ODAwNTcsIDB4ODAwMTcsIDB4ODAxMWYsIDB4NzAxMTMsIDB4ODAwNzcsIDB4ODAwMzcsIDB4OTAwY2YsXG4gICAgMHg3MDEwYiwgMHg4MDA2NywgMHg4MDAyNywgMHg5MDBhZiwgMHg4MDAwNywgMHg4MDA4NywgMHg4MDA0NywgMHg5MDBlZixcbiAgICAweDcwMTA3LCAweDgwMDVmLCAweDgwMDFmLCAweDkwMDlmLCAweDcwMTE3LCAweDgwMDdmLCAweDgwMDNmLCAweDkwMGRmLFxuICAgIDB4NzAxMGYsIDB4ODAwNmYsIDB4ODAwMmYsIDB4OTAwYmYsIDB4ODAwMGYsIDB4ODAwOGYsIDB4ODAwNGYsIDB4OTAwZmZcbiAgXSksIDldO1xuXG4gIHZhciBmaXhlZERpc3RDb2RlVGFiID0gW25ldyBVaW50MzJBcnJheShbXG4gICAgMHg1MDAwMCwgMHg1MDAxMCwgMHg1MDAwOCwgMHg1MDAxOCwgMHg1MDAwNCwgMHg1MDAxNCwgMHg1MDAwYywgMHg1MDAxYyxcbiAgICAweDUwMDAyLCAweDUwMDEyLCAweDUwMDBhLCAweDUwMDFhLCAweDUwMDA2LCAweDUwMDE2LCAweDUwMDBlLCAweDAwMDAwLFxuICAgIDB4NTAwMDEsIDB4NTAwMTEsIDB4NTAwMDksIDB4NTAwMTksIDB4NTAwMDUsIDB4NTAwMTUsIDB4NTAwMGQsIDB4NTAwMWQsXG4gICAgMHg1MDAwMywgMHg1MDAxMywgMHg1MDAwYiwgMHg1MDAxYiwgMHg1MDAwNywgMHg1MDAxNywgMHg1MDAwZiwgMHgwMDAwMFxuICBdKSwgNV07XG4gIFxuICBmdW5jdGlvbiBlcnJvcihlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cnVjdG9yKGJ5dGVzKSB7XG4gICAgLy92YXIgYnl0ZXMgPSBzdHJlYW0uZ2V0Qnl0ZXMoKTtcbiAgICB2YXIgYnl0ZXNQb3MgPSAwO1xuXG4gICAgdmFyIGNtZiA9IGJ5dGVzW2J5dGVzUG9zKytdO1xuICAgIHZhciBmbGcgPSBieXRlc1tieXRlc1BvcysrXTtcbiAgICBpZiAoY21mID09IC0xIHx8IGZsZyA9PSAtMSlcbiAgICAgIGVycm9yKCdJbnZhbGlkIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICBpZiAoKGNtZiAmIDB4MGYpICE9IDB4MDgpXG4gICAgICBlcnJvcignVW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgaWYgKCgoKGNtZiA8PCA4KSArIGZsZykgJSAzMSkgIT0gMClcbiAgICAgIGVycm9yKCdCYWQgRkNIRUNLIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIGlmIChmbGcgJiAweDIwKVxuICAgICAgZXJyb3IoJ0ZESUNUIGJpdCBzZXQgaW4gZmxhdGUgc3RyZWFtJyk7XG5cbiAgICB0aGlzLmJ5dGVzID0gYnl0ZXM7XG4gICAgdGhpcy5ieXRlc1BvcyA9IGJ5dGVzUG9zO1xuXG4gICAgdGhpcy5jb2RlU2l6ZSA9IDA7XG4gICAgdGhpcy5jb2RlQnVmID0gMDtcblxuICAgIERlY29kZVN0cmVhbS5jYWxsKHRoaXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEZWNvZGVTdHJlYW0ucHJvdG90eXBlKTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0Qml0cyA9IGZ1bmN0aW9uKGJpdHMpIHtcbiAgICB2YXIgY29kZVNpemUgPSB0aGlzLmNvZGVTaXplO1xuICAgIHZhciBjb2RlQnVmID0gdGhpcy5jb2RlQnVmO1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcblxuICAgIHZhciBiO1xuICAgIHdoaWxlIChjb2RlU2l6ZSA8IGJpdHMpIHtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjb2RlQnVmIHw9IGIgPDwgY29kZVNpemU7XG4gICAgICBjb2RlU2l6ZSArPSA4O1xuICAgIH1cbiAgICBiID0gY29kZUJ1ZiAmICgoMSA8PCBiaXRzKSAtIDEpO1xuICAgIHRoaXMuY29kZUJ1ZiA9IGNvZGVCdWYgPj4gYml0cztcbiAgICB0aGlzLmNvZGVTaXplID0gY29kZVNpemUgLT0gYml0cztcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgcmV0dXJuIGI7XG4gIH07XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmdldENvZGUgPSBmdW5jdGlvbih0YWJsZSkge1xuICAgIHZhciBjb2RlcyA9IHRhYmxlWzBdO1xuICAgIHZhciBtYXhMZW4gPSB0YWJsZVsxXTtcbiAgICB2YXIgY29kZVNpemUgPSB0aGlzLmNvZGVTaXplO1xuICAgIHZhciBjb2RlQnVmID0gdGhpcy5jb2RlQnVmO1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcblxuICAgIHdoaWxlIChjb2RlU2l6ZSA8IG1heExlbikge1xuICAgICAgdmFyIGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGVuY29kaW5nIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgY29kZUJ1ZiB8PSAoYiA8PCBjb2RlU2l6ZSk7XG4gICAgICBjb2RlU2l6ZSArPSA4O1xuICAgIH1cbiAgICB2YXIgY29kZSA9IGNvZGVzW2NvZGVCdWYgJiAoKDEgPDwgbWF4TGVuKSAtIDEpXTtcbiAgICB2YXIgY29kZUxlbiA9IGNvZGUgPj4gMTY7XG4gICAgdmFyIGNvZGVWYWwgPSBjb2RlICYgMHhmZmZmO1xuICAgIGlmIChjb2RlU2l6ZSA9PSAwIHx8IGNvZGVTaXplIDwgY29kZUxlbiB8fCBjb2RlTGVuID09IDApXG4gICAgICBlcnJvcignQmFkIGVuY29kaW5nIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIHRoaXMuY29kZUJ1ZiA9IChjb2RlQnVmID4+IGNvZGVMZW4pO1xuICAgIHRoaXMuY29kZVNpemUgPSAoY29kZVNpemUgLSBjb2RlTGVuKTtcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgcmV0dXJuIGNvZGVWYWw7XG4gIH07XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmdlbmVyYXRlSHVmZm1hblRhYmxlID0gZnVuY3Rpb24obGVuZ3Rocykge1xuICAgIHZhciBuID0gbGVuZ3Rocy5sZW5ndGg7XG5cbiAgICAvLyBmaW5kIG1heCBjb2RlIGxlbmd0aFxuICAgIHZhciBtYXhMZW4gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobGVuZ3Roc1tpXSA+IG1heExlbilcbiAgICAgICAgbWF4TGVuID0gbGVuZ3Roc1tpXTtcbiAgICB9XG5cbiAgICAvLyBidWlsZCB0aGUgdGFibGVcbiAgICB2YXIgc2l6ZSA9IDEgPDwgbWF4TGVuO1xuICAgIHZhciBjb2RlcyA9IG5ldyBVaW50MzJBcnJheShzaXplKTtcbiAgICBmb3IgKHZhciBsZW4gPSAxLCBjb2RlID0gMCwgc2tpcCA9IDI7XG4gICAgICAgICBsZW4gPD0gbWF4TGVuO1xuICAgICAgICAgKytsZW4sIGNvZGUgPDw9IDEsIHNraXAgPDw9IDEpIHtcbiAgICAgIGZvciAodmFyIHZhbCA9IDA7IHZhbCA8IG47ICsrdmFsKSB7XG4gICAgICAgIGlmIChsZW5ndGhzW3ZhbF0gPT0gbGVuKSB7XG4gICAgICAgICAgLy8gYml0LXJldmVyc2UgdGhlIGNvZGVcbiAgICAgICAgICB2YXIgY29kZTIgPSAwO1xuICAgICAgICAgIHZhciB0ID0gY29kZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBjb2RlMiA9IChjb2RlMiA8PCAxKSB8ICh0ICYgMSk7XG4gICAgICAgICAgICB0ID4+PSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGZpbGwgdGhlIHRhYmxlIGVudHJpZXNcbiAgICAgICAgICBmb3IgKHZhciBpID0gY29kZTI7IGkgPCBzaXplOyBpICs9IHNraXApXG4gICAgICAgICAgICBjb2Rlc1tpXSA9IChsZW4gPDwgMTYpIHwgdmFsO1xuXG4gICAgICAgICAgKytjb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtjb2RlcywgbWF4TGVuXTtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVhZEJsb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gcmVwZWF0KHN0cmVhbSwgYXJyYXksIGxlbiwgb2Zmc2V0LCB3aGF0KSB7XG4gICAgICB2YXIgcmVwZWF0ID0gc3RyZWFtLmdldEJpdHMobGVuKSArIG9mZnNldDtcbiAgICAgIHdoaWxlIChyZXBlYXQtLSA+IDApXG4gICAgICAgIGFycmF5W2krK10gPSB3aGF0O1xuICAgIH1cblxuICAgIC8vIHJlYWQgYmxvY2sgaGVhZGVyXG4gICAgdmFyIGhkciA9IHRoaXMuZ2V0Qml0cygzKTtcbiAgICBpZiAoaGRyICYgMSlcbiAgICAgIHRoaXMuZW9mID0gdHJ1ZTtcbiAgICBoZHIgPj49IDE7XG5cbiAgICBpZiAoaGRyID09IDApIHsgLy8gdW5jb21wcmVzc2VkIGJsb2NrXG4gICAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzO1xuICAgICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcbiAgICAgIHZhciBiO1xuXG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIHZhciBibG9ja0xlbiA9IGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGJsb2NrTGVuIHw9IChiIDw8IDgpO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICB2YXIgY2hlY2sgPSBiO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjaGVjayB8PSAoYiA8PCA4KTtcbiAgICAgIGlmIChjaGVjayAhPSAofmJsb2NrTGVuICYgMHhmZmZmKSlcbiAgICAgICAgZXJyb3IoJ0JhZCB1bmNvbXByZXNzZWQgYmxvY2sgbGVuZ3RoIGluIGZsYXRlIHN0cmVhbScpO1xuXG4gICAgICB0aGlzLmNvZGVCdWYgPSAwO1xuICAgICAgdGhpcy5jb2RlU2l6ZSA9IDA7XG5cbiAgICAgIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmVuc3VyZUJ1ZmZlcihidWZmZXJMZW5ndGggKyBibG9ja0xlbik7XG4gICAgICB2YXIgZW5kID0gYnVmZmVyTGVuZ3RoICsgYmxvY2tMZW47XG4gICAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IGVuZDtcbiAgICAgIGZvciAodmFyIG4gPSBidWZmZXJMZW5ndGg7IG4gPCBlbmQ7ICsrbikge1xuICAgICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5lb2YgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlcltuXSA9IGI7XG4gICAgICB9XG4gICAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxpdENvZGVUYWJsZTtcbiAgICB2YXIgZGlzdENvZGVUYWJsZTtcbiAgICBpZiAoaGRyID09IDEpIHsgLy8gY29tcHJlc3NlZCBibG9jaywgZml4ZWQgY29kZXNcbiAgICAgIGxpdENvZGVUYWJsZSA9IGZpeGVkTGl0Q29kZVRhYjtcbiAgICAgIGRpc3RDb2RlVGFibGUgPSBmaXhlZERpc3RDb2RlVGFiO1xuICAgIH0gZWxzZSBpZiAoaGRyID09IDIpIHsgLy8gY29tcHJlc3NlZCBibG9jaywgZHluYW1pYyBjb2Rlc1xuICAgICAgdmFyIG51bUxpdENvZGVzID0gdGhpcy5nZXRCaXRzKDUpICsgMjU3O1xuICAgICAgdmFyIG51bURpc3RDb2RlcyA9IHRoaXMuZ2V0Qml0cyg1KSArIDE7XG4gICAgICB2YXIgbnVtQ29kZUxlbkNvZGVzID0gdGhpcy5nZXRCaXRzKDQpICsgNDtcblxuICAgICAgLy8gYnVpbGQgdGhlIGNvZGUgbGVuZ3RocyBjb2RlIHRhYmxlXG4gICAgICB2YXIgY29kZUxlbkNvZGVMZW5ndGhzID0gQXJyYXkoY29kZUxlbkNvZGVNYXAubGVuZ3RoKTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgbnVtQ29kZUxlbkNvZGVzKVxuICAgICAgICBjb2RlTGVuQ29kZUxlbmd0aHNbY29kZUxlbkNvZGVNYXBbaSsrXV0gPSB0aGlzLmdldEJpdHMoMyk7XG4gICAgICB2YXIgY29kZUxlbkNvZGVUYWIgPSB0aGlzLmdlbmVyYXRlSHVmZm1hblRhYmxlKGNvZGVMZW5Db2RlTGVuZ3Rocyk7XG5cbiAgICAgIC8vIGJ1aWxkIHRoZSBsaXRlcmFsIGFuZCBkaXN0YW5jZSBjb2RlIHRhYmxlc1xuICAgICAgdmFyIGxlbiA9IDA7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgY29kZXMgPSBudW1MaXRDb2RlcyArIG51bURpc3RDb2RlcztcbiAgICAgIHZhciBjb2RlTGVuZ3RocyA9IG5ldyBBcnJheShjb2Rlcyk7XG4gICAgICB3aGlsZSAoaSA8IGNvZGVzKSB7XG4gICAgICAgIHZhciBjb2RlID0gdGhpcy5nZXRDb2RlKGNvZGVMZW5Db2RlVGFiKTtcbiAgICAgICAgaWYgKGNvZGUgPT0gMTYpIHtcbiAgICAgICAgICByZXBlYXQodGhpcywgY29kZUxlbmd0aHMsIDIsIDMsIGxlbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSAxNykge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgMywgMywgbGVuID0gMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSAxOCkge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgNywgMTEsIGxlbiA9IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvZGVMZW5ndGhzW2krK10gPSBsZW4gPSBjb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpdENvZGVUYWJsZSA9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbmd0aHMuc2xpY2UoMCwgbnVtTGl0Q29kZXMpKTtcbiAgICAgIGRpc3RDb2RlVGFibGUgPVxuICAgICAgICB0aGlzLmdlbmVyYXRlSHVmZm1hblRhYmxlKGNvZGVMZW5ndGhzLnNsaWNlKG51bUxpdENvZGVzLCBjb2RlcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvcignVW5rbm93biBibG9jayB0eXBlIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIH1cblxuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgbGltaXQgPSBidWZmZXIgPyBidWZmZXIubGVuZ3RoIDogMDtcbiAgICB2YXIgcG9zID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBjb2RlMSA9IHRoaXMuZ2V0Q29kZShsaXRDb2RlVGFibGUpO1xuICAgICAgaWYgKGNvZGUxIDwgMjU2KSB7XG4gICAgICAgIGlmIChwb3MgKyAxID49IGxpbWl0KSB7XG4gICAgICAgICAgYnVmZmVyID0gdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgMSk7XG4gICAgICAgICAgbGltaXQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlcltwb3MrK10gPSBjb2RlMTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY29kZTEgPT0gMjU2KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gcG9zO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb2RlMSAtPSAyNTc7XG4gICAgICBjb2RlMSA9IGxlbmd0aERlY29kZVtjb2RlMV07XG4gICAgICB2YXIgY29kZTIgPSBjb2RlMSA+PiAxNjtcbiAgICAgIGlmIChjb2RlMiA+IDApXG4gICAgICAgIGNvZGUyID0gdGhpcy5nZXRCaXRzKGNvZGUyKTtcbiAgICAgIHZhciBsZW4gPSAoY29kZTEgJiAweGZmZmYpICsgY29kZTI7XG4gICAgICBjb2RlMSA9IHRoaXMuZ2V0Q29kZShkaXN0Q29kZVRhYmxlKTtcbiAgICAgIGNvZGUxID0gZGlzdERlY29kZVtjb2RlMV07XG4gICAgICBjb2RlMiA9IGNvZGUxID4+IDE2O1xuICAgICAgaWYgKGNvZGUyID4gMClcbiAgICAgICAgY29kZTIgPSB0aGlzLmdldEJpdHMoY29kZTIpO1xuICAgICAgdmFyIGRpc3QgPSAoY29kZTEgJiAweGZmZmYpICsgY29kZTI7XG4gICAgICBpZiAocG9zICsgbGVuID49IGxpbWl0KSB7XG4gICAgICAgIGJ1ZmZlciA9IHRoaXMuZW5zdXJlQnVmZmVyKHBvcyArIGxlbik7XG4gICAgICAgIGxpbWl0ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuOyArK2ssICsrcG9zKVxuICAgICAgICBidWZmZXJbcG9zXSA9IGJ1ZmZlcltwb3MgLSBkaXN0XTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGbGF0ZVN0cmVhbTsiLCIvKlxuXHRUaGlzIGlzIHJvdC5qcywgdGhlIFJPZ3VlbGlrZSBUb29sa2l0IGluIEphdmFTY3JpcHQuXG5cdFZlcnNpb24gMC42fmRldiwgZ2VuZXJhdGVkIG9uIFR1ZSBNYXIgMTcgMTY6MTY6MzEgQ0VUIDIwMTUuXG4qL1xuLyoqXG4gKiBAbmFtZXNwYWNlIFRvcC1sZXZlbCBST1QgbmFtZXNwYWNlXG4gKi9cbnZhciBST1QgPSB7XG5cdC8qKiBEaXJlY3Rpb25hbCBjb25zdGFudHMuIE9yZGVyaW5nIGlzIGltcG9ydGFudCEgKi9cblx0RElSUzoge1xuXHRcdFwiNFwiOiBbXG5cdFx0XHRbIDAsIC0xXSxcblx0XHRcdFsgMSwgIDBdLFxuXHRcdFx0WyAwLCAgMV0sXG5cdFx0XHRbLTEsICAwXVxuXHRcdF0sXG5cdFx0XCI4XCI6IFtcblx0XHRcdFsgMCwgLTFdLFxuXHRcdFx0WyAxLCAtMV0sXG5cdFx0XHRbIDEsICAwXSxcblx0XHRcdFsgMSwgIDFdLFxuXHRcdFx0WyAwLCAgMV0sXG5cdFx0XHRbLTEsICAxXSxcblx0XHRcdFstMSwgIDBdLFxuXHRcdFx0Wy0xLCAtMV1cblx0XHRdLFxuXHRcdFwiNlwiOiBbXG5cdFx0XHRbLTEsIC0xXSxcblx0XHRcdFsgMSwgLTFdLFxuXHRcdFx0WyAyLCAgMF0sXG5cdFx0XHRbIDEsICAxXSxcblx0XHRcdFstMSwgIDFdLFxuXHRcdFx0Wy0yLCAgMF1cblx0XHRdXG5cdH1cbn07XG4vKipcbiAqIEFsd2F5cyBwb3NpdGl2ZSBtb2R1bHVzXG4gKiBAcGFyYW0ge2ludH0gbiBNb2R1bHVzXG4gKiBAcmV0dXJucyB7aW50fSB0aGlzIG1vZHVsbyBuXG4gKi9cbk51bWJlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24obikge1xuXHRyZXR1cm4gKCh0aGlzJW4pK24pJW47XG59XG5pZiAoIU9iamVjdC5jcmVhdGUpIHsgIFxuXHQvKipcblx0ICogRVM1IE9iamVjdC5jcmVhdGVcblx0ICovXG5cdE9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbihvKSB7ICBcblx0XHR2YXIgdG1wID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0bXAucHJvdG90eXBlID0gbztcblx0XHRyZXR1cm4gbmV3IHRtcCgpO1xuXHR9OyAgXG59ICBcbi8qKlxuICogU2V0cyBwcm90b3R5cGUgb2YgdGhpcyBmdW5jdGlvbiB0byBhbiBpbnN0YW5jZSBvZiBwYXJlbnQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBhcmVudFxuICovXG5GdW5jdGlvbi5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24ocGFyZW50KSB7XG5cdHRoaXMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcblx0dGhpcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcztcbn1cbmlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIpIHtcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gc2V0VGltZW91dChjYiwgMTAwMC82MCk7IH07XG5cblx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID1cblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCBmdW5jdGlvbihpZCkgeyByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTsgfTtcbn1cbi8qKlxuICogQGNsYXNzIEFic3RyYWN0IEZPViBhbGdvcml0aG1cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpZ2h0UGFzc2VzQ2FsbGJhY2sgRG9lcyB0aGUgbGlnaHQgcGFzcyB0aHJvdWdoIHgseT9cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XSA0LzYvOFxuICovXG5ST1QuRk9WID0gZnVuY3Rpb24obGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xuXHR0aGlzLl9saWdodFBhc3NlcyA9IGxpZ2h0UGFzc2VzQ2FsbGJhY2s7XG5cdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0dG9wb2xvZ3k6IDhcblx0fVxuXHRmb3IgKHZhciBwIGluIG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9uc1twXSA9IG9wdGlvbnNbcF07IH1cbn07XG5cbi8qKlxuICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDM2MC1kZWdyZWUgY2lyY2xlXG4gKiBAcGFyYW0ge2ludH0geFxuICogQHBhcmFtIHtpbnR9IHlcbiAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cblJPVC5GT1YucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbih4LCB5LCBSLCBjYWxsYmFjaykge31cblxuLyoqXG4gKiBSZXR1cm4gYWxsIG5laWdoYm9ycyBpbiBhIGNvbmNlbnRyaWMgcmluZ1xuICogQHBhcmFtIHtpbnR9IGN4IGNlbnRlci14XG4gKiBAcGFyYW0ge2ludH0gY3kgY2VudGVyLXlcbiAqIEBwYXJhbSB7aW50fSByIHJhbmdlXG4gKi9cblJPVC5GT1YucHJvdG90eXBlLl9nZXRDaXJjbGUgPSBmdW5jdGlvbihjeCwgY3ksIHIpIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIgZGlycywgY291bnRGYWN0b3IsIHN0YXJ0T2Zmc2V0O1xuXG5cdHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuXHRcdGNhc2UgNDpcblx0XHRcdGNvdW50RmFjdG9yID0gMTtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWzAsIDFdO1xuXHRcdFx0ZGlycyA9IFtcblx0XHRcdFx0Uk9ULkRJUlNbOF1bN10sXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzFdLFxuXHRcdFx0XHRST1QuRElSU1s4XVszXSxcblx0XHRcdFx0Uk9ULkRJUlNbOF1bNV1cblx0XHRcdF1cblx0XHRicmVhaztcblxuXHRcdGNhc2UgNjpcblx0XHRcdGRpcnMgPSBST1QuRElSU1s2XTtcblx0XHRcdGNvdW50RmFjdG9yID0gMTtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgODpcblx0XHRcdGRpcnMgPSBST1QuRElSU1s0XTtcblx0XHRcdGNvdW50RmFjdG9yID0gMjtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8qIHN0YXJ0aW5nIG5laWdoYm9yICovXG5cdHZhciB4ID0gY3ggKyBzdGFydE9mZnNldFswXSpyO1xuXHR2YXIgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0qcjtcblxuXHQvKiBjaXJjbGUgKi9cblx0Zm9yICh2YXIgaT0wO2k8ZGlycy5sZW5ndGg7aSsrKSB7XG5cdFx0Zm9yICh2YXIgaj0wO2o8cipjb3VudEZhY3RvcjtqKyspIHtcblx0XHRcdHJlc3VsdC5wdXNoKFt4LCB5XSk7XG5cdFx0XHR4ICs9IGRpcnNbaV1bMF07XG5cdFx0XHR5ICs9IGRpcnNbaV1bMV07XG5cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyA9IGZ1bmN0aW9uKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpIHtcblx0Uk9ULkZPVi5jYWxsKHRoaXMsIGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpO1xufVxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5leHRlbmQoUk9ULkZPVik7XG5cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbih4LCB5LCBSLCBjYWxsYmFjaykge1xuXHQvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG5cdGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgIFxuXHRjYWxsYmFjayh4LTEsIHktMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgsIHktMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgrMSwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeC0xLCB5LCAwLCAxKTtcblx0Y2FsbGJhY2soeCsxLCB5LCAwLCAxKTtcblx0Y2FsbGJhY2soeC0xLCB5KzEsIDAsIDEpO1xuXHRjYWxsYmFjayh4LCB5KzEsIDAsIDEpO1xuXHRjYWxsYmFjayh4KzEsIHkrMSwgMCwgMSk7XG4gICAgXG4gICAgY2FsbGJhY2soeC0xLCB5LTIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsxLCB5LTIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeS0xLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTIsIHksIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeSsxLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHktMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsyLCB5LCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHkrMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0xLCB5KzIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgsIHkrMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsxLCB5KzIsIDAsIDEpO1xuXG5cdC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG5cdGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHsgcmV0dXJuOyB9XG5cdFxuXHQvKiBsaXN0IG9mIGFsbCBzaGFkb3dzICovXG5cdHZhciBTSEFET1dTID0gW107XG5cdHZhciB0cmVlcyA9IHt9O1xuXHR2YXIgdG90YWxOZWlnaGJvckNvdW50ID0gMTtcbiAgICB2YXIgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eSxcbiAgICAgICAgZHgsIGR5LCBkZCwgYSwgYiwgcmFkaXVzLFxuICAgICAgICBjeDIsIGN5MiwgZGQxLFxuICAgICAgICBvYnN0YWNsZVR5cGU7XG5cblx0LyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cblx0Zm9yICh2YXIgcj0xOyByPD1SOyByKyspIHtcblx0XHR2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuXHRcdHZhciBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgdG90YWxOZWlnaGJvckNvdW50ICs9IG5laWdoYm9yQ291bnQ7XG4gICAgICAgIHRyZWVzID0ge307XG5cdFx0Zm9yICh2YXIgaT0wO2k8bmVpZ2hib3JDb3VudDtpKyspIHtcblx0XHRcdGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuXHRcdFx0Y3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgICB2YXIga2V5ID0gY3grXCIsXCIrY3k7XG4gICAgICAgICAgICBpZiAoKHgtY3gpKih4LWN4KSArICh5LWN5KSooeS1jeSkgPj0gUiAqIFIpIHtcbiAgICAgICAgICAgICAgICB0b3RhbE5laWdoYm9yQ291bnQtLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vaWYgKGtleSA9PSBcIjQ0LDEwMlwiKSAvL2NvbnNvbGUubG9nKCdLRVknLCBrZXksICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpKTtcbiAgICAgICAgICAgIC8vIGlmIChrZXkgPT0gXCIxNTAsMTYwXCIpIC8vY29uc29sZS5sb2coa2V5LCBvYnN0YWNsZVR5cGUpO1xuICAgICAgICAgICAgLy8gaWYgKGtleSA9PSBcIjE1MSwxNjFcIikgLy9jb25zb2xlLmxvZyhrZXksIG9ic3RhY2xlVHlwZSk7XG4gICAgICAgICAgICAvLyBpZiAoa2V5ID09IFwiMTUwLDE2MVwiKSAvL2NvbnNvbGUubG9nKGtleSwgb2JzdGFjbGVUeXBlKTtcbiAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGVzID0gb2JzdGFjbGVUeXBlcyA9IHRoaXMud2FsbHNba2V5XTtcbiAgICAgICAgICAgIGlmIChvYnN0YWNsZVR5cGVzICYmIG9ic3RhY2xlVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNraXBWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYnN0YWNsZVR5cGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGUgPSBvYnN0YWNsZVR5cGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICBjeDIgPSBvYnN0YWNsZVR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgIGN5MiA9IG9ic3RhY2xlVHlwZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzID0gb2JzdGFjbGVUeXBlWzNdO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSBjeDIgLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZHgxID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQxID0gTWF0aC5zcXJ0KGR4MSAqIGR4MSArIGR5MSAqIGR5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGQxIDwgZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgZmFsc2UsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXNpYmlsaXR5KSBza2lwVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgJiYgIXNraXBWaXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN4MiA9IGN4O1xuICAgICAgICAgICAgICAgIGN5MiA9IGN5O1xuICAgICAgICAgICAgICAgIHJhZGl1cyA9IE1hdGguU1FSVDIgLyAyO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgIGlmIChkZCA+IDEvMikge1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLypkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgaWYgKG9ic3RhY2xlVHlwZSAmJiBvYnN0YWNsZVR5cGVbMF0gPT0gJ3RyZWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4MSA9IGN4IC0geDtcbiAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICBkZDEgPSBNYXRoLnNxcnQoZHgxICogZHgxICsgZHkxICogZHkxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkMSA8IGRkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5IC0geTtcbiAgICAgICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCBmYWxzZSwgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKG9ic3RhY2xlVHlwZSkgLy9jb25zb2xlLmxvZyhvYnN0YWNsZVR5cGVbMF0sIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0JMT0NLUycsIGN4LCBjeSwgYmxvY2tzLCBiKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cdFx0fSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICBcbiAgICAgICAgLy8gYXBwbHkgdHJlZSBibG9ja2Vyc1xuICAgICAgICBmb3IgKHZhciBrIGluIHRyZWVzKSB7XG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ2FwcGx5IHRyZWUnKTtcbiAgICAgICAgICAgIGN4MiA9IHRyZWVzW2tdWzBdO1xuICAgICAgICAgICAgY3kyID0gdHJlZXNba11bMV07XG4gICAgICAgICAgICBkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICByYWRpdXMgPSBNYXRoLlNRUlQyIC0gLjAxO1xuICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgYSA9IE1hdGguYXNpbihyYWRpdXMgLyBkZCk7XG4gICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgQTIgPSBub3JtYWxpemUoYiArIGEpO1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCB0cnVlLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgXG4gICAgcmV0dXJuIHRvdGFsTmVpZ2hib3JDb3VudDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XG4gKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcbiAqL1xuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgLy8vL2NvbnNvbGUubG9nKCdfY2hlY2tWaXNpYmlsaXR5JywgYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgIC8vIGNoZWNrIGlmIHRhcmdldCBjZW50ZXIgaXMgaW5zaWRlIGEgc2hhZG93XG4gICAgdmFyIHZpc2libGUgPSAhYmxvY2tzO1xuICAgIC8vY29uc29sZS5sb2coJ19jaGVja1Zpc2liaWxpdHknLCBiLCB2aXNpYmxlKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBTSEFET1dTLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG9sZCA9IFNIQURPV1NbaV07XG4gICAgICAgIGlmIChpc0JldHdlZW4oYiwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdibG9ja3MgYnV0IG5vdCB2aXNpYmxlJywgU0hBRE9XUy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSwgYiwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gbm90IHZpc2libGUsIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbiAgICBcbiAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgIGlmIChBMSA8IDAgJiYgQTIgPj0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc3BsaXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZVNoYWRvd3MoYiwgMCwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlU2hhZG93cyhiLCBBMSwgMCwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vdCBzcGxpdHRpbmcnLCBibG9ja3MsIHZpc2libGUsIGIpO1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTaGFkb3dzKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnLCBBMSwgQTIsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpLCAhaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpO1xuICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpICYmIEExICE9IFNIQURPV1NbMF1bMF0gJiYgQTIgIT0gU0hBRE9XU1swXVsxXSApIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHZpc2libGU7XG59XG5cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9tZXJnZVNoYWRvd3MgPSBmdW5jdGlvbihiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgIC8vLy9jb25zb2xlLmxvZygnbWVyZ2luZycsIGIsIEExLCBBMik7XG4gICAgLy8gY2hlY2sgaWYgdGFyZ2V0IGZpcnN0IGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDEgPSAwLFxuICAgICAgICBlZGdlMSA9IGZhbHNlLFxuICAgICAgICBmaXJzdEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgZmlyc3RJbmRleCA9IGluZGV4MTtcbiAgICAgICAgaWYgKGlzQmV0d2VlbihBMSwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXgxID4gMCAmJiBpc0JldHdlZW4oQTEsIFNIQURPV1NbaW5kZXgxIC0gMV1bMV0sIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGVkZ2UxID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQmVmb3JlKEExLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpbmRleDErKztcbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSBpbmRleDE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCZWZvcmUoQTEsIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4MSsrO1xuICAgIH1cbiAgICBcbiAgICAvLyBjaGVjayBpZiB0YXJnZXQgc2Vjb25kIGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCAtIDEsXG4gICAgICAgIGVkZ2UyID0gZmFsc2UsXG4gICAgICAgIHNlY29uZEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgyID49IDApIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBpbmRleDI7XG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhBMiwgb2xkWzBdLCBvbGRbMV0sIGlzQmV0d2VlbihBMiwgb2xkWzBdLCBvbGRbMV0pKVxuICAgICAgICBpZiAoaXNCZXR3ZWVuKEEyLCBvbGRbMF0sIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGVkZ2UyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JlZm9yZShBMiwgb2xkWzBdKSkge1xuICAgICAgICAgICAgaW5kZXgyLS07XG4gICAgICAgICAgICBzZWNvbmRJbmRleCA9IGluZGV4MjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNCZWZvcmUoQTIsIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Mi0tO1xuICAgIH1cbiAgICBcbiAgICAvLy8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICBpZiAoZmlyc3RJbmRleCA9PSBTSEFET1dTLmxlbmd0aCAmJiAhZWRnZTEgJiYgc2Vjb25kSW5kZXggPT0gMCAmJiBlZGdlMikgZmlyc3RJbmRleCA9IDA7XG4gICAgLy9pZiAoc2Vjb25kSW5kZXggPT0gLTEpIHNlY29uZEluZGV4ID0gU0hBRE9XUy5sZW5ndGggLSAxO1xuICAgIC8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBzaGFkb3dzIHB1c2hpbmcnLCBbQTEsIEEyXSk7XG4gICAgICAgIFNIQURPV1MucHVzaChbQTEsIEEyXSk7XG4gICAgfVxuICAgIC8qZWxzZSBpZiAoU0hBRE9XUy5sZW5ndGggPiAxICYmIGZpcnN0SW5kZXggPT0gU0hBRE9XUy5sZW5ndGggJiYgc2Vjb25kSW5kZXggPT0gMCAmJiAhZWRnZTEgJiYgZWRnZTIpIHtcbiAgICBcbiAgICB9Ki9cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG5ld19zaGFkb3cgPSBbZWRnZTEgPyBTSEFET1dTW2ZpcnN0SW5kZXhdWzBdIDogQTEsIGVkZ2UyID8gU0hBRE9XU1tzZWNvbmRJbmRleF1bMV0gOiBBMl07XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25ld19zaGFkb3cnLCBuZXdfc2hhZG93KTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBNYXRoLm1heChmaXJzdEluZGV4LCBzZWNvbmRJbmRleCk7XG4gICAgICAgIHZhciBzdW0xID0gZGlmZl9zdW0oU0hBRE9XUyk7XG4gICAgICAgIHZhciBkb1NoaWZ0ID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0JldHdlZW4oMCwgbmV3X3NoYWRvd1swXSwgbmV3X3NoYWRvd1sxXSkgJiYgbmV3X3NoYWRvd1swXSAhPSAwICYmIG5ld19zaGFkb3dbMV0gIT0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY3Jvc3NlcyAwJyk7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBbbmV3X3NoYWRvd1swXSwgMF0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbbmV3X3NoYWRvd1swXSwgMF0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIGlmIChTSEFET1dTWzBdWzBdICE9IDAgJiYgU0hBRE9XU1swXVsxXSAhPSBuZXdfc2hhZG93WzFdKSB7XG4gICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoZmlyc3RJbmRleCArIDEsIDAsIFswLCBuZXdfc2hhZG93WzFdXSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbMCwgbmV3X3NoYWRvd1sxXV0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgZG9TaGlmdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBuZXdfc2hhZG93KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3VtMiA9IGRpZmZfc3VtKFNIQURPV1MpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdW0xJywgc3VtMSwgJ3N1bTInLCBzdW0yLCBzdW0yIDwgc3VtMSwgU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpKTtcbiAgICAgICAgaWYgKHN1bTIgPCBzdW0xKSB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICAvKmlmIChTSEFET1dTLmxlbmd0aCA9PSAxICYmICghaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSB8fCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH0qL1xuICAgICAgICBpZiAobmV3X3NoYWRvd1swXSA9PSAwIHx8IGRvU2hpZnQpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzaGlmdGluZycpO1xuICAgICAgICAgICAgd2hpbGUgKFNIQURPV1NbMF1bMF0gIT0gMCkge1xuICAgICAgICAgICAgICAgIFNIQURPV1MucHVzaChTSEFET1dTLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSBTSEFET1dTLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCBzaGlmdGluZycsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkaWZmX3N1bShTSEFET1dTKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0JlZm9yZShBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKEEyID4gMCAmJiBBMSA8IDApIHsgLy8gQTEgaW4gdG9wIGhhbGYsIEEyIGluIGJvdHRvbSBoYWxmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBBMSA8IEEyO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNBZnRlcihBMSwgQTIpIHtcbiAgICByZXR1cm4gIWlzQmVmb3JlKEExLCBBMik7XG59XG5cbmZ1bmN0aW9uIGlzQmV0d2VlbihiLCBBMSwgQTIpIHtcbiAgICBpZiAoQTEgPCBBMikge1xuICAgICAgICByZXR1cm4gKChBMSA8PSBiKSAmJiAoYiA8PSBBMikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoQTEgPD0gYikgJiYgKGIgPD0gTWF0aC5QSSkpIHx8ICgoLU1hdGguUEkgPD0gYikgJiYgKGIgPD0gQTIpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh4KSB7XG4gICAgaWYgKHggPiBNYXRoLlBJKSB7XG4gICAgICAgIHJldHVybiAtKDIgKiBNYXRoLlBJIC0geCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCB4IDwgLU1hdGguUEkpIHtcbiAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJICsgeDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZihBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKChNYXRoLlBJIC0gQTEpIC0gKC1NYXRoLlBJIC0gQTIpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQTIgPiAwICYmIEExIDwgMCkgeyAvLyBBMSBpbiB0b3AgaGFsZiwgQTIgaW4gYm90dG9tIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKC1BMSArIEEyKTtcbiAgICB9XG4gICAgaWYgKEExIDw9IDAgJiYgQTIgPD0gMCkgeyAvLyBBMSxBMiBpbiBib3R0b20gaGFsZlxuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7IC8vIEExIGFmdGVyIEEyXG4gICAgICAgICAgICByZXR1cm4gLUExICsgTWF0aC5QSSAtICgtTWF0aC5QSSAtIEEyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKEEyIC0gQTEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSSArIChNYXRoLlBJIC0gQTEpICsgQTJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhBMiAtIEExKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZl9zdW0oU0hBRE9XUykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU0hBRE9XUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLy8vY29uc29sZS5sb2coU0hBRE9XU1tpXVswXSwgU0hBRE9XU1tpXVsxXSwgZGlmZihTSEFET1dTW2ldWzBdLCBTSEFET1dTW2ldWzFdKSk7XG4gICAgICAgIHN1bSArPSBkaWZmKFNIQURPV1NbaV1bMF0sIFNIQURPV1NbaV1bMV0pO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJPVDsiLCJ2YXIgSW1hZ2VIYW5kbGVyID0gcmVxdWlyZShcIi4vaW1hZ2VIYW5kbGVyLmpzXCIpO1xudmFyIFJPVCA9IHJlcXVpcmUoXCIuL3JvdDYuanNcIik7XG5cbnZhciBrZXkycHRfY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGtleTJwdChrZXkpIHtcbiAgICBpZiAoa2V5IGluIGtleTJwdF9jYWNoZSkgcmV0dXJuIGtleTJwdF9jYWNoZVtrZXldO1xuICAgIHZhciBwID0ga2V5LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBwYXJzZUludChjKSB9KTtcbiAgICB2YXIgcHQgPSB7eDogcFswXSwgeTogcFsxXSwga2V5OiBrZXl9O1xuICAgIGtleTJwdF9jYWNoZVtrZXldID0gcHQ7XG4gICAgcmV0dXJuIHB0O1xufVxuXG5mdW5jdGlvbiB4eTJrZXkoeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCIsXCIgKyB5O1xufVxuXG5mdW5jdGlvbiB4eTJwdCh4LCB5KSB7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5LCBrZXk6IHggKyBcIixcIiArIHl9O1xufVxuXG5mdW5jdGlvbiBwdDJrZXkocHQpIHtcbiAgICByZXR1cm4gcHQueCArIFwiLFwiICsgcHQueTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyhkYXRhLCBlbGV2YXRpb24pIHtcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHZhciB3YWxscyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgIHZhciBwdCA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHB0LnogPiBlbGV2YXRpb24pIHtcbiAgICAgICAgICAgIGFkakxvb3A6XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gLTE7IGkgPD0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IC0xOyBqIDw9IDE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCAhPT0gaSB8fCAwICE9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IChwdC54ICsgaSkgKyBcIixcIiArIChwdC55ICsgaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtrXSAmJiBkYXRhW2tdLnogPD0gZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbHNbcHQua2V5XSA9IHB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGFkakxvb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2dlbmVyYXRlRWxldmF0aW9uV2FsbHMnLCBEYXRlLm5vdygpIC0gdDEgKyAnbXMnKTtcbiAgICByZXR1cm4gd2FsbHM7XG59XG5cbmZ1bmN0aW9uIHNldEVsZXZhdGlvbldhbGxzKG9iaiwgZGF0YSwgZWxldmF0aW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2VsZXZhdGlvbl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVsID0gZGF0YVtlbGV2YXRpb25dW2ldO1xuICAgICAgICBvYmpbZWxbMV0gKyBcIixcIiArIGVsWzJdXSA9IGVsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0V2FsbHMob2JqLCBkYXRhLCBpZCwgcikge1xuICAgIGlkID0gaWQgfHwgJ3dhbGwnO1xuICAgIHIgPSByIHx8IChNYXRoLlNRUlQyIC8gMik7XG4gICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgIG9ialtpXSA9IFtpZCwgZGF0YVtpXS54LCBkYXRhW2ldLnksIHJdO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0VHJlZVdhbGxzKG9iaiwgZWxldmF0aW9uLCB0cmVlLCB0cmVlX2VsZXZhdGlvbnMsIHRyZWVfc3RhdGUsIHRyZWVfYmxvY2tzKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0cmVlKSB7XG4gICAgICAgIGlmIChlbGV2YXRpb24gPCB0cmVlX2VsZXZhdGlvbnNbaV0pIHtcbiAgICAgICAgICAgIGlmICh0cmVlX3N0YXRlW2ldKSB7XG4gICAgICAgICAgICAgICAgLy9vYmpbaV0gPSBbJ3RyZWUnLCB0cmVlW2ldLngsIHRyZWVbaV0ueSwgTWF0aC5TUVJUMl07XG4gICAgICAgICAgICAgICAgdHJlZV9ibG9ja3NbaV0uZm9yRWFjaChmdW5jdGlvbiAocHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBwdC54ICsgXCIsXCIgKyBwdC55O1xuICAgICAgICAgICAgICAgICAgICBvYmpba10gPSAob2JqW2tdIHx8IFtdKS5jb25jYXQoW1sndHJlZScsIHRyZWVbaV0ueCwgdHJlZVtpXS55LCBNYXRoLlNRUlQyXV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBWaXNpb25TaW11bGF0aW9uKHdvcmxkZGF0YSwgbWFwRGF0YUltYWdlUGF0aCwgb25SZWFkeSwgb3B0cykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuZ3JpZG5hdiA9IG51bGw7XG4gICAgdGhpcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSA9IG51bGw7XG4gICAgdGhpcy50b29sc19ub193YXJkcyA9IG51bGw7XG4gICAgdGhpcy5lbGV2YXRpb25WYWx1ZXMgPSBbXTtcbiAgICB0aGlzLmVsZXZhdGlvbkdyaWQgPSBudWxsO1xuICAgIHRoaXMuZWxldmF0aW9uV2FsbHMgPSB7fTtcbiAgICB0aGlzLnRyZWVXYWxscyA9IHt9O1xuICAgIHRoaXMudHJlZSA9IHt9OyAvLyBjZW50ZXIga2V5IHRvIHBvaW50IG1hcFxuICAgIHRoaXMudHJlZV9ibG9ja3MgPSB7fTsgLy8gY2VudGVyIHRvIGNvcm5lcnMgbWFwXG4gICAgdGhpcy50cmVlX3JlbGF0aW9ucyA9IHt9OyAvLyBjb3JuZXIgdG8gY2VudGVyIG1hcFxuICAgIHRoaXMudHJlZV9lbGV2YXRpb25zID0ge307XG4gICAgdGhpcy50cmVlX3N0YXRlID0ge307XG4gICAgdGhpcy53YWxscyA9IHt9O1xuICAgIHRoaXMucmFkaXVzID0gdGhpcy5vcHRzLnJhZGl1cyB8fCBwYXJzZUludCgxNjAwIC8gNjQpO1xuICAgIHRoaXMubGlnaHRzID0ge307XG4gICAgdGhpcy53b3JsZE1pblggPSB3b3JsZGRhdGEud29ybGRNaW5YO1xuICAgIHRoaXMud29ybGRNaW5ZID0gd29ybGRkYXRhLndvcmxkTWluWTtcbiAgICB0aGlzLndvcmxkTWF4WCA9IHdvcmxkZGF0YS53b3JsZE1heFg7XG4gICAgdGhpcy53b3JsZE1heFkgPSB3b3JsZGRhdGEud29ybGRNYXhZO1xuICAgIHRoaXMud29ybGRXaWR0aCA9IHRoaXMud29ybGRNYXhYIC0gdGhpcy53b3JsZE1pblg7XG4gICAgdGhpcy53b3JsZEhlaWdodCA9IHRoaXMud29ybGRNYXhZIC0gdGhpcy53b3JsZE1pblk7XG4gICAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLndvcmxkV2lkdGggLyA2NCArIDE7XG4gICAgdGhpcy5ncmlkSGVpZ2h0ID0gdGhpcy53b3JsZEhlaWdodCAvIDY0ICsgMTtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5hcmVhID0gMDtcbiAgICBcbiAgICB0aGlzLmltYWdlSGFuZGxlciA9IG5ldyBJbWFnZUhhbmRsZXIobWFwRGF0YUltYWdlUGF0aCk7XG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmltYWdlSGFuZGxlci5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIGxvYWQnLCB0MiAtIHQxICsgJ21zJyk7XG4gICAgICAgIHNlbGYuZ3JpZG5hdiA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoICogMiwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgYmxhY2tQaXhlbEhhbmRsZXIpO1xuICAgICAgICBzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGggKiAzLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBibGFja1BpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYudG9vbHNfbm9fd2FyZHMgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCAqIDQsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGJsYWNrUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIHRyZWVFbGV2YXRpb25QaXhlbEhhbmRsZXIpO1xuICAgICAgICBzZWxmLmVsZXZhdGlvbkdyaWQgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCAwLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBlbGV2YXRpb25QaXhlbEhhbmRsZXIpO1xuICAgICAgICB2YXIgdDMgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2UgcHJvY2VzcycsIHQzIC0gdDIgKyAnbXMnKTtcbiAgICAgICAgc2VsZi5lbGV2YXRpb25WYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAvL3NlbGYuZWxldmF0aW9uV2FsbHNbZWxldmF0aW9uXSA9IGdlbmVyYXRlRWxldmF0aW9uV2FsbHMoc2VsZi5lbGV2YXRpb25HcmlkLCBlbGV2YXRpb24pO1xuICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXSA9IHt9O1xuICAgICAgICAgICAgc2V0VHJlZVdhbGxzKHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl0sIGVsZXZhdGlvbiwgc2VsZi50cmVlLCBzZWxmLnRyZWVfZWxldmF0aW9ucywgc2VsZi50cmVlX3N0YXRlLCBzZWxmLnRyZWVfYmxvY2tzKVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHQ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3dhbGxzIGdlbmVyYXRpb24nLCB0NCAtIHQzICsgJ21zJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5ncmlkV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5ncmlkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlbGYuZ3JpZEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0ID0geHkycHQoaSwgaik7XG4gICAgICAgICAgICAgICAga2V5MnB0X2NhY2hlW3B0LmtleV0gPSBwdDtcbiAgICAgICAgICAgICAgICBzZWxmLmdyaWRbaV0ucHVzaChwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHQ1ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhY2hlIHByaW1lJywgdDUgLSB0NCArICdtcycpO1xuICAgICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgb25SZWFkeSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJbWFnZShpbWFnZUhhbmRsZXIsIG9mZnNldCwgd2lkdGgsIGhlaWdodCwgcGl4ZWxIYW5kbGVyKSB7XG4gICAgICAgIHZhciBncmlkID0ge307XG4gICAgICAgIGltYWdlSGFuZGxlci5zY2FuKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgcGl4ZWxIYW5kbGVyLCBncmlkKTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmxhY2tQaXhlbEhhbmRsZXIoeCwgeSwgcCwgZ3JpZCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLkltYWdlWFl0b0dyaWRYWSh4LCB5KTtcbiAgICAgICAgaWYgKHBbMF0gPT09IDApIHtcbiAgICAgICAgICAgIGdyaWRbcHQueCArIFwiLFwiICsgcHQueV0gPSBwdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIGZ1bmN0aW9uIGVsZXZhdGlvblBpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBwdC56ID0gcFswXTtcbiAgICAgICAgZ3JpZFtwdC54ICsgXCIsXCIgKyBwdC55XSA9IHB0O1xuICAgICAgICBpZiAoc2VsZi5lbGV2YXRpb25WYWx1ZXMuaW5kZXhPZihwWzBdKSA9PSAtMSkge1xuICAgICAgICAgICAgc2VsZi5lbGV2YXRpb25WYWx1ZXMucHVzaChwWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyZWVFbGV2YXRpb25QaXhlbEhhbmRsZXIoeCwgeSwgcCwgZ3JpZCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLkltYWdlWFl0b0dyaWRYWSh4LCB5KTtcbiAgICAgICAgaWYgKHBbMV0gPT0gMCAmJiBwWzJdID09IDApIHtcbiAgICAgICAgICAgIC8vIHRyZWVzIGFyZSAyeDIgaW4gZ3JpZFxuICAgICAgICAgICAgLy8gdHJlZSBvcmlnaW5zIHJvdW5kZWQgdXAgd2hlbiBjb252ZXJ0ZWQgdG8gZ3JpZCwgc28gdGhleSByZXByZXNlbnQgdG9wIHJpZ2h0IGNvcm5lci4gc3VidHJhY3QgMC41IHRvIGdldCBncmlkIG9yaWdpblxuICAgICAgICAgICAgdmFyIHRyZWVPcmlnaW4gPSB4eTJwdChwdC54IC0gMC41LCBwdC55IC0gMC41KTtcbiAgICAgICAgICAgIHZhciB0cmVlRWxldmF0aW9uID0gcFswXSArIDQwO1xuICAgICAgICAgICAgdmFyIGtDID0gdHJlZU9yaWdpbi5rZXk7XG4gICAgICAgICAgICBzZWxmLnRyZWVba0NdID0gdHJlZU9yaWdpbjtcbiAgICAgICAgICAgIHNlbGYudHJlZV9lbGV2YXRpb25zW2tDXSA9IHRyZWVFbGV2YXRpb247XG4gICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW2tDXSA9IFtdO1xuICAgICAgICAgICAgc2VsZi50cmVlX3N0YXRlW2tDXSA9IHRydWU7XG4gICAgICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggdHJlZSAyeDIgYnkgdGFraW5nIGZsb29yIGFuZCBjZWlsIG9mIHRyZWUgZ3JpZCBvcmlnaW5cbiAgICAgICAgICAgIFtNYXRoLmZsb29yLCBNYXRoLmNlaWxdLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBbTWF0aC5mbG9vciwgTWF0aC5jZWlsXS5mb3JFYWNoKGZ1bmN0aW9uIChqKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmVlQ29ybmVyID0geHkycHQoaSh0cmVlT3JpZ2luLngpLCBqKHRyZWVPcmlnaW4ueSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfcmVsYXRpb25zW3RyZWVDb3JuZXIua2V5XSA9IChzZWxmLnRyZWVfcmVsYXRpb25zW3RyZWVDb3JuZXIua2V5XSB8fCBbXSkuY29uY2F0KHRyZWVPcmlnaW4pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW2tDXS5wdXNoKHRyZWVDb3JuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxpZ2h0UGFzc2VzQ2FsbGJhY2sgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIga2V5ID0geCArICcsJyArIHk7XG4gICAgICAgIHJldHVybiAhKGtleSBpbiBzZWxmLmVsZXZhdGlvbldhbGxzW3NlbGYuZWxldmF0aW9uXSkgJiYgIShrZXkgaW4gc2VsZi5lbnRfZm93X2Jsb2NrZXJfbm9kZSkgJiYgIShrZXkgaW4gc2VsZi50cmVlV2FsbHNbc2VsZi5lbGV2YXRpb25dICYmIHNlbGYudHJlZVdhbGxzW3NlbGYuZWxldmF0aW9uXVtrZXldLmxlbmd0aCA+IDApIDtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5mb3YgPSBuZXcgUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyh0aGlzLmxpZ2h0UGFzc2VzQ2FsbGJhY2ssIHt0b3BvbG9neTo4fSk7XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS51cGRhdGVWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKGdYLCBnWSwgcmFkaXVzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBrZXkgPSB4eTJrZXkoZ1gsIGdZKTtcblxuICAgIHJhZGl1cyA9IHJhZGl1cyB8fCBzZWxmLnJhZGl1cztcbiAgICB0aGlzLmVsZXZhdGlvbiA9IHRoaXMuZWxldmF0aW9uR3JpZFtrZXldLno7XG4gICAgdGhpcy53YWxscyA9IHRoaXMudHJlZVdhbGxzW3RoaXMuZWxldmF0aW9uXTtcbiAgICBpZiAoIXRoaXMuZWxldmF0aW9uV2FsbHNbdGhpcy5lbGV2YXRpb25dKSB0aGlzLmVsZXZhdGlvbldhbGxzW3RoaXMuZWxldmF0aW9uXSA9IGdlbmVyYXRlRWxldmF0aW9uV2FsbHModGhpcy5lbGV2YXRpb25HcmlkLCB0aGlzLmVsZXZhdGlvbik7XG4gICAgLy9zZXRFbGV2YXRpb25XYWxscyh0aGlzLndhbGxzLCB0aGlzLmVsZXZhdGlvbldhbGxzLCB0aGlzLmVsZXZhdGlvbilcbiAgICAvL3NldFdhbGxzKHRoaXMud2FsbHMsIHRoaXMuZW50X2Zvd19ibG9ja2VyX25vZGUpO1xuICAgIC8vc2V0V2FsbHModGhpcy53YWxscywgdGhpcy50b29sc19ub193YXJkcyk7XG4gICAgLy9zZXRUcmVlV2FsbHModGhpcy53YWxscywgdGhpcy5lbGV2YXRpb24sIHRoaXMudHJlZSwgdGhpcy50cmVlX2VsZXZhdGlvbnMsIHRoaXMudHJlZV9zdGF0ZSwgdGhpcy50cmVlX2Jsb2Nrcyk7XG5cbiAgICB0aGlzLmZvdi53YWxscyA9IHRoaXMud2FsbHM7XG4gICAgdGhpcy5saWdodHMgPSB7fTtcbiAgICB0aGlzLmFyZWEgPSB0aGlzLmZvdi5jb21wdXRlKGdYLCBnWSwgcmFkaXVzLCBmdW5jdGlvbih4MiwgeTIsIHIsIHZpcykge1xuICAgICAgICB2YXIga2V5ID0geHkya2V5KHgyLCB5Mik7XG4gICAgICAgIGlmICghc2VsZi5lbGV2YXRpb25HcmlkW2tleV0pIHJldHVybjtcbiAgICAgICAgdmFyIHRyZWVQdHMgPSBzZWxmLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgICAgIHZhciB0cmVlQmxvY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgIHRyZWVCbG9ja2luZyA9IHNlbGYudHJlZV9zdGF0ZVt0cmVlUHQua2V5XSAmJiBzZWxmLnRyZWVfZWxldmF0aW9uc1t0cmVlUHQua2V5XSA+IHNlbGYuZWxldmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlQmxvY2tpbmcpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2aXMgPT0gMSAmJiAhc2VsZi5lbnRfZm93X2Jsb2NrZXJfbm9kZVtrZXldICYmICF0cmVlQmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHNlbGYubGlnaHRzW2tleV0gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmxpZ2h0QXJlYSA9IE9iamVjdC5rZXlzKHRoaXMubGlnaHRzKS5sZW5ndGg7XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLmlzVmFsaWRYWSA9IGZ1bmN0aW9uICh4LCB5LCBiQ2hlY2tHcmlkbmF2LCBiQ2hlY2tUb29sc05vV2FyZHMsIGJDaGVja1RyZWVTdGF0ZSkge1xuICAgIGlmICghdGhpcy5yZWFkeSkgcmV0dXJuIGZhbHNlO1xuICAgIFxuICAgIHZhciBrZXkgPSB4eTJrZXkoeCwgeSksXG4gICAgICAgIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICBcbiAgICBpZiAoYkNoZWNrVHJlZVN0YXRlKSB7XG4gICAgICAgIHZhciB0cmVlUHRzID0gdGhpcy50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgICAgICBpZiAodHJlZVB0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyZWVQdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gdGhpcy50cmVlX3N0YXRlW3RyZWVQdC5rZXldO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlQmxvY2tpbmcpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuZ3JpZFdpZHRoICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5ncmlkSGVpZ2h0ICYmICghYkNoZWNrR3JpZG5hdiB8fCAhdGhpcy5ncmlkbmF2W2tleV0pICYmICghYkNoZWNrVG9vbHNOb1dhcmRzIHx8ICF0aGlzLnRvb2xzX25vX3dhcmRzW2tleV0pICYmICghYkNoZWNrVHJlZVN0YXRlIHx8ICF0cmVlQmxvY2tpbmcpO1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS50b2dnbGVUcmVlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGtleSA9IHh5MmtleSh4LCB5KTtcbiAgICB2YXIgaXNUcmVlID0gISF0aGlzLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgaWYgKGlzVHJlZSkge1xuICAgICAgICB2YXIgdHJlZVB0cyA9IHRoaXMudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgdGhpcy50cmVlX3N0YXRlW3B0LmtleV0gPSAhdGhpcy50cmVlX3N0YXRlW3B0LmtleV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxldmF0aW9uVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKGVsZXZhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlbGV2YXRpb24gPCBzZWxmLnRyZWVfZWxldmF0aW9uc1twdC5rZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3NbcHQua2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChwdEIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHB0LnggPT0gc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XVtqXVsxXSAmJiBwdC55ID09IHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV1bal1bMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYudHJlZV9zdGF0ZVtwdC5rZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW3B0LmtleV0uZm9yRWFjaChmdW5jdGlvbiAocHRCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XSA9IChzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldIHx8IFtdKS5jb25jYXQoW1sndHJlZScsIHB0LngsIHB0LnksIE1hdGguU1FSVDJdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVHJlZTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnNldFJhZGl1cyA9IGZ1bmN0aW9uIChyKSB7XG4gICAgdGhpcy5yYWRpdXMgPSByO1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuV29ybGRYWXRvR3JpZFhZID0gZnVuY3Rpb24gKHdYLCB3WSwgYk5vUm91bmQpIHtcbiAgICB2YXIgeCA9ICh3WCAtIHRoaXMud29ybGRNaW5YKSAvIDY0LFxuICAgICAgICB5ID0gKHdZIC0gdGhpcy53b3JsZE1pblkpIC8gNjQ7XG4gICAgaWYgKCFiTm9Sb3VuZCkge1xuICAgICAgICB4ID0gcGFyc2VJbnQoTWF0aC5yb3VuZCh4KSlcbiAgICAgICAgeSA9IHBhcnNlSW50KE1hdGgucm91bmQoeSkpXG4gICAgfVxuICAgIHJldHVybiB7eDogeCwgeTogeSwga2V5OiB4ICsgJywnICsgeX07XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5HcmlkWFl0b1dvcmxkWFkgPSBmdW5jdGlvbiAoZ1gsIGdZKSB7XG4gICAgcmV0dXJuIHt4OiBnWCAqIDY0ICsgdGhpcy53b3JsZE1pblgsIHk6IGdZICogNjQgKyB0aGlzLndvcmxkTWluWX07XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkdyaWRYWXRvSW1hZ2VYWSA9IGZ1bmN0aW9uIChnWCwgZ1kpIHtcbiAgICByZXR1cm4ge3g6IGdYLCB5OiB0aGlzLmdyaWRIZWlnaHQgLSBnWSAtIDF9O1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5JbWFnZVhZdG9HcmlkWFkgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBnWSA9IHRoaXMuZ3JpZEhlaWdodCAtIHkgLSAxO1xuICAgIHJldHVybiB7eDogeCwgeTogZ1ksIGtleTogeCArICcsJyArIGdZfTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuV29ybGRYWXRvSW1hZ2VYWSA9IGZ1bmN0aW9uICh3WCwgd1kpIHtcbiAgICB2YXIgcHQgPSB0aGlzLldvcmxkWFl0b0dyaWRYWSh3WCwgd1kpO1xuICAgIHJldHVybiB0aGlzLkdyaWRYWXRvSW1hZ2VYWShwdC54LCBwdC55KTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUua2V5MnB0ID0ga2V5MnB0O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkya2V5ID0geHkya2V5O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkycHQgPSB4eTJwdDtcblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnB0MmtleSA9IHB0MmtleTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaXNpb25TaW11bGF0aW9uOyIsIm1vZHVsZS5leHBvcnRzPXtcIndvcmxkTWluWFwiOi04Mjg4LFwid29ybGRNYXhYXCI6ODI4OCxcIndvcmxkTWluWVwiOi04Mjg4LFwid29ybGRNYXhZXCI6ODI4OH0iXX0=
