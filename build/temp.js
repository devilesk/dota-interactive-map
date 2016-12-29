(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.InteractiveMap = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e,r){if("object"==typeof exports&&"object"==typeof module)module.exports=r();else if("function"==typeof define&&define.amd)define([],r);else{var t=r();for(var n in t)("object"==typeof exports?exports:e)[n]=t[n]}}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,r),o.loaded=!0,o.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){e.exports=t(1)},function(e,r,t){"use strict";function n(){var e="undefined"==typeof JSON?{}:JSON;o.setupJSON(e)}var o=t(2),i=t(3);n();var a=window._rollbarConfig,s=a&&a.globalAlias||"Rollbar",u=window[s]&&"undefined"!=typeof window[s].shimId;!u&&a?o.wrapper.init(a):(window.Rollbar=o.wrapper,window.RollbarNotifier=i.Notifier),e.exports=o.wrapper},function(e,r,t){"use strict";function n(e,r,t){!t[4]&&window._rollbarWrappedError&&(t[4]=window._rollbarWrappedError,window._rollbarWrappedError=null),e.uncaughtError.apply(e,t),r&&r.apply(window,t)}function o(e,r){if(r.hasOwnProperty&&r.hasOwnProperty("addEventListener")){var t=r.addEventListener;r.addEventListener=function(r,n,o){t.call(this,r,e.wrap(n),o)};var n=r.removeEventListener;r.removeEventListener=function(e,r,t){n.call(this,e,r&&r._wrapped||r,t)}}}var i=t(3),a=t(8),s=i.Notifier;window._rollbarWrappedError=null;var u={};u.init=function(e,r){var t=new s(r);if(t.configure(e),e.captureUncaught){var i;r&&a.isType(r._rollbarOldOnError,"function")?i=r._rollbarOldOnError:window.onerror&&!window.onerror.belongsToShim&&(i=window.onerror),window.onerror=function(){var e=Array.prototype.slice.call(arguments,0);n(t,i,e)};var u,c,l=["EventTarget","Window","Node","ApplicationCache","AudioTrackList","ChannelMergerNode","CryptoOperation","EventSource","FileReader","HTMLUnknownElement","IDBDatabase","IDBRequest","IDBTransaction","KeyOperation","MediaController","MessagePort","ModalWindow","Notification","SVGElementInstance","Screen","TextTrack","TextTrackCue","TextTrackList","WebSocket","WebSocketWorker","Worker","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestUpload"];for(u=0;u<l.length;++u)c=l[u],window[c]&&window[c].prototype&&o(t,window[c].prototype)}return e.captureUnhandledRejections&&(r&&a.isType(r._unhandledRejectionHandler,"function")&&window.removeEventListener("unhandledrejection",r._unhandledRejectionHandler),t._unhandledRejectionHandler=function(e){var r=e.reason,n=e.promise,o=e.detail;!r&&o&&(r=o.reason,n=o.promise),t.unhandledRejection(r,n)},window.addEventListener("unhandledrejection",t._unhandledRejectionHandler)),window.Rollbar=t,s.processPayloads(),t},e.exports={wrapper:u,setupJSON:i.setupJSON}},function(e,r,t){"use strict";function n(e){E=e,w.setupJSON(e)}function o(e,r){return function(){var t=r||this;try{return e.apply(t,arguments)}catch(n){console.error("[Rollbar]:",n)}}}function i(){h||(h=setTimeout(f,1e3))}function a(){return _}function s(e){_=_||this;var r="https://"+s.DEFAULT_ENDPOINT;this.options={enabled:!0,endpoint:r,environment:"production",scrubFields:g([],s.DEFAULT_SCRUB_FIELDS),checkIgnore:null,logLevel:s.DEFAULT_LOG_LEVEL,reportLevel:s.DEFAULT_REPORT_LEVEL,uncaughtErrorLevel:s.DEFAULT_UNCAUGHT_ERROR_LEVEL,payload:{}},this.lastError=null,this.plugins={},this.parentNotifier=e,e&&(e.hasOwnProperty("shimId")?e.notifier=this:this.configure(e.options))}function u(e){window._rollbarPayloadQueue.push(e),i()}function c(e){return o(function(){var r=this._getLogArgs(arguments);return this._log(e||r.level||this.options.logLevel||s.DEFAULT_LOG_LEVEL,r.message,r.err,r.custom,r.callback)})}function l(e,r){e||(e=r?E.stringify(r):"");var t={body:e};return r&&(t.extra=g(!0,{},r)),{message:t}}function p(e,r,t){var n=m.guessErrorClass(r.message),o=r.name||n[0],i=n[1],a={exception:{"class":o,message:i}};if(e&&(a.exception.description=e||"uncaught exception"),r.stack){var s,u,c,p,f,d,h,w;for(a.frames=[],h=0;h<r.stack.length;++h)s=r.stack[h],u={filename:s.url?v.sanitizeUrl(s.url):"(unknown)",lineno:s.line||null,method:s.func&&"?"!==s.func?s.func:"[anonymous]",colno:s.column},c=p=f=null,d=s.context?s.context.length:0,d&&(w=Math.floor(d/2),p=s.context.slice(0,w),c=s.context[w],f=s.context.slice(w)),c&&(u.code=c),(p||f)&&(u.context={},p&&p.length&&(u.context.pre=p),f&&f.length&&(u.context.post=f)),s.args&&(u.args=s.args),a.frames.push(u);return a.frames.reverse(),t&&(a.extra=g(!0,{},t)),{trace:a}}return l(o+": "+i,t)}function f(){var e;try{for(;e=window._rollbarPayloadQueue.shift();)d(e)}finally{h=void 0}}function d(e){var r=e.endpointUrl,t=e.accessToken,n=e.payload,o=e.callback||function(){},i=(new Date).getTime();i-L>=6e4&&(L=i,R=0);var a=window._globalRollbarOptions.maxItems,c=window._globalRollbarOptions.itemsPerMinute,l=function(){return!n.ignoreRateLimit&&a>=1&&T>=a},p=function(){return!n.ignoreRateLimit&&c>=1&&R>=c};return l()?void o(new Error(a+" max items reached")):p()?void o(new Error(c+" items per minute reached")):(T++,R++,l()&&_._log(_.options.uncaughtErrorLevel,"maxItems has been hit. Ignoring errors for the remainder of the current page load.",null,{maxItems:a},null,!1,!0),n.ignoreRateLimit&&delete n.ignoreRateLimit,void y.post(r,t,n,function(r,t){return r?(r instanceof b&&(e.callback=function(){},setTimeout(function(){u(e)},s.RETRY_DELAY)),o(r)):o(null,t)}))}var h,g=t(4),m=t(5),v=t(8),w=t(10),y=w.XHR,b=w.ConnectionError,E=null;s.NOTIFIER_VERSION="1.9.2",s.DEFAULT_ENDPOINT="api.rollbar.com/api/1/",s.DEFAULT_SCRUB_FIELDS=["pw","pass","passwd","password","secret","confirm_password","confirmPassword","password_confirmation","passwordConfirmation","access_token","accessToken","secret_key","secretKey","secretToken"],s.DEFAULT_LOG_LEVEL="debug",s.DEFAULT_REPORT_LEVEL="debug",s.DEFAULT_UNCAUGHT_ERROR_LEVEL="error",s.DEFAULT_ITEMS_PER_MIN=60,s.DEFAULT_MAX_ITEMS=0,s.LEVELS={debug:0,info:1,warning:2,error:3,critical:4},s.RETRY_DELAY=1e4,window._rollbarPayloadQueue=window._rollbarPayloadQueue||[],window._globalRollbarOptions={startTime:(new Date).getTime(),maxItems:s.DEFAULT_MAX_ITEMS,itemsPerMinute:s.DEFAULT_ITEMS_PER_MIN};var _,x=s.prototype;x._getLogArgs=function(e){for(var r,t,n,i,a,u,c=this.options.logLevel||s.DEFAULT_LOG_LEVEL,l=[],p=0;p<e.length;++p)u=e[p],a=v.typeName(u),"string"===a?r?l.push(u):r=u:"function"===a?i=o(u,this):"date"===a?l.push(u):"error"===a||u instanceof Error||"undefined"!=typeof DOMException&&u instanceof DOMException?t?l.push(u):t=u:"object"!==a&&"array"!==a||(n?l.push(u):n=u);return l.length&&(n=n||{},n.extraArgs=l),{level:c,message:r,err:t,custom:n,callback:i}},x._route=function(e){var r=this.options.endpoint,t=/\/$/.test(r),n=/^\//.test(e);return t&&n?e=e.substring(1):t||n||(e="/"+e),r+e},x._processShimQueue=function(e){for(var r,t,n,o,i,a,u,c={};t=e.shift();)r=t.shim,n=t.method,o=t.args,i=r.parentShim,u=c[r.shimId],u||(i?(a=c[i.shimId],u=new s(a)):u=this,c[r.shimId]=u),u[n]&&v.isType(u[n],"function")&&u[n].apply(u,o)},x._buildPayload=function(e,r,t,n,o){var i=this.options.accessToken,a=this.options.environment,u=g(!0,{},this.options.payload),c=v.uuid4();if(void 0===s.LEVELS[r])throw new Error("Invalid level");if(!t&&!n&&!o)throw new Error("No message, stack info or custom data");var l={environment:a,endpoint:this.options.endpoint,uuid:c,level:r,platform:"browser",framework:"browser-js",language:"javascript",body:this._buildBody(t,n,o),request:{url:window.location.href,query_string:window.location.search,user_ip:"$remote_ip"},client:{runtime_ms:e.getTime()-window._globalRollbarOptions.startTime,timestamp:Math.round(e.getTime()/1e3),javascript:{browser:window.navigator.userAgent,language:window.navigator.language,cookie_enabled:window.navigator.cookieEnabled,screen:{width:window.screen.width,height:window.screen.height},plugins:this._getBrowserPlugins()}},server:{},notifier:{name:"rollbar-browser-js",version:s.NOTIFIER_VERSION}};u.body&&delete u.body;var p={access_token:i,data:g(!0,l,u)};return this._scrub(p.data),p},x._buildBody=function(e,r,t){var n;return n=r?p(e,r,t):l(e,t)},x._getBrowserPlugins=function(){if(!this._browserPlugins){var e,r,t=window.navigator.plugins||[],n=t.length,o=[];for(r=0;r<n;++r)e=t[r],o.push({name:e.name,description:e.description});this._browserPlugins=o}return this._browserPlugins},x._scrub=function(e){function r(e,r,t,n,o,i){return r+v.redact(i)}function t(e){var t;if(v.isType(e,"string"))for(t=0;t<s.length;++t)e=e.replace(s[t],r);return e}function n(e,r){var t;for(t=0;t<a.length;++t)if(a[t].test(e)){r=v.redact(r);break}return r}function o(e,r){var o=n(e,r);return o===r?t(o):o}var i=this.options.scrubFields,a=this._getScrubFieldRegexs(i),s=this._getScrubQueryParamRegexs(i);return v.traverse(e,o),e},x._getScrubFieldRegexs=function(e){for(var r,t=[],n=0;n<e.length;++n)r="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",t.push(new RegExp(r,"i"));return t},x._getScrubQueryParamRegexs=function(e){for(var r,t=[],n=0;n<e.length;++n)r="\\[?(%5[bB])?"+e[n]+"\\[?(%5[bB])?\\]?(%5[dD])?",t.push(new RegExp("("+r+"=)([^&\\n]+)","igm"));return t},x._urlIsWhitelisted=function(e){var r,t,n,o,i,a,s,u,c,l;try{if(r=this.options.hostWhiteList,t=e&&e.data&&e.data.body&&e.data.body.trace,!r||0===r.length)return!0;if(!t)return!0;for(s=r.length,i=t.frames.length,c=0;c<i;c++){if(n=t.frames[c],o=n.filename,!v.isType(o,"string"))return!0;for(l=0;l<s;l++)if(a=r[l],u=new RegExp(a),u.test(o))return!0}}catch(p){return this.configure({hostWhiteList:null}),console.error("[Rollbar]: Error while reading your configuration's hostWhiteList option. Removing custom hostWhiteList.",p),!0}return!1},x._messageIsIgnored=function(e){var r,t,n,o,i,a,s,u,c;try{if(i=!1,n=this.options.ignoredMessages,!n||0===n.length)return!1;if(s=e&&e.data&&e.data.body,u=s&&s.trace&&s.trace.exception&&s.trace.exception.message,c=s&&s.message&&s.message.body,r=u||c,!r)return!1;for(o=n.length,t=0;t<o&&(a=new RegExp(n[t],"gi"),!(i=a.test(r)));t++);}catch(l){this.configure({ignoredMessages:null}),console.error("[Rollbar]: Error while reading your configuration's ignoredMessages option. Removing custom ignoredMessages.")}return i},x._enqueuePayload=function(e,r,t,n){var o={callback:n,accessToken:this.options.accessToken,endpointUrl:this._route("item/"),payload:e},i=function(){if(n){var e="This item was not sent to Rollbar because it was ignored. This can happen if a custom checkIgnore() function was used or if the item's level was less than the notifier' reportLevel. See https://rollbar.com/docs/notifier/rollbar.js/configuration for more details.";n(null,{err:0,result:{id:null,uuid:null,message:e}})}};if(this._internalCheckIgnore(r,t,e))return void i();try{if(v.isType(this.options.checkIgnore,"function")&&this.options.checkIgnore(r,t,e))return void i()}catch(a){this.configure({checkIgnore:null}),console.error("[Rollbar]: Error while calling custom checkIgnore() function. Removing custom checkIgnore().",a)}if(this._urlIsWhitelisted(e)&&!this._messageIsIgnored(e)){if(this.options.verbose){if(e.data&&e.data.body&&e.data.body.trace){var s=e.data.body.trace,c=s.exception.message;console.error("[Rollbar]: ",c)}console.info("[Rollbar]: ",o)}v.isType(this.options.logFunction,"function")&&this.options.logFunction(o);try{v.isType(this.options.transform,"function")&&this.options.transform(e)}catch(a){this.configure({transform:null}),console.error("[Rollbar]: Error while calling custom transform() function. Removing custom transform().",a)}this.options.enabled&&u(o)}},x._internalCheckIgnore=function(e,r,t){var n=r[0],o=s.LEVELS[n]||0,i=s.LEVELS[this.options.reportLevel]||0;if(o<i)return!0;var a=this.options?this.options.plugins:{};if(a&&a.jquery&&a.jquery.ignoreAjaxErrors)try{return!!t.data.body.message.extra.isAjax}catch(u){return!1}return!1},x._log=function(e,r,t,n,o,i,a){var s=null;if(t)try{if(s=t._savedStackTrace?t._savedStackTrace:m.parse(t),t===this.lastError)return;this.lastError=t}catch(u){console.error("[Rollbar]: Error while parsing the error object.",u),r=t.message||t.description||r||String(t),t=null}var c=this._buildPayload(new Date,e,r,s,n);a&&(c.ignoreRateLimit=!0),this._enqueuePayload(c,!!i,[e,r,t,n],o)},x.log=c(),x.debug=c("debug"),x.info=c("info"),x.warn=c("warning"),x.warning=c("warning"),x.error=c("error"),x.critical=c("critical"),x.uncaughtError=o(function(e,r,t,n,o,i){if(i=i||null,o&&v.isType(o,"error"))return void this._log(this.options.uncaughtErrorLevel,e,o,i,null,!0);if(r&&v.isType(r,"error"))return void this._log(this.options.uncaughtErrorLevel,e,r,i,null,!0);var a={url:r||"",line:t};a.func=m.guessFunctionName(a.url,a.line),a.context=m.gatherContext(a.url,a.line);var s={mode:"onerror",message:o?String(o):e||"uncaught exception",url:document.location.href,stack:[a],useragent:navigator.userAgent},u=this._buildPayload(new Date,this.options.uncaughtErrorLevel,e,s,i);this._enqueuePayload(u,!0,[this.options.uncaughtErrorLevel,e,r,t,n,o])}),x.unhandledRejection=o(function(e,r){if(null==e)return void _._log(_.options.uncaughtErrorLevel,"unhandled rejection was null or undefined!",null,{},null,!1,!1);var t=e.message||(e?String(e):"unhandled rejection"),n=e._rollbarContext||r._rollbarContext||null;if(e&&v.isType(e,"error"))return void this._log(this.options.uncaughtErrorLevel,t,e,n,null,!0);var o={url:"",line:0};o.func=m.guessFunctionName(o.url,o.line),o.context=m.gatherContext(o.url,o.line);var i={mode:"unhandledrejection",message:t,url:document.location.href,stack:[o],useragent:navigator.userAgent},a=this._buildPayload(new Date,this.options.uncaughtErrorLevel,t,i,n);this._enqueuePayload(a,!0,[this.options.uncaughtErrorLevel,t,o.url,o.line,0,e,r])}),x.global=o(function(e){e=e||{};var r={startTime:e.startTime,maxItems:e.maxItems,itemsPerMinute:e.itemsPerMinute};g(!0,window._globalRollbarOptions,r),void 0!==e.maxItems&&(T=0),void 0!==e.itemsPerMinute&&(R=0)}),x.configure=o(function(e,r){var t=g(!0,{},e);g(!r,this.options,t),this.global(t)}),x.scope=o(function(e){var r=new s(this);return g(!0,r.options.payload,e),r}),x.wrap=function(e,r){try{var t;if(t=v.isType(r,"function")?r:function(){return r||{}},!v.isType(e,"function"))return e;if(e._isWrap)return e;if(!e._wrapped){e._wrapped=function(){try{return e.apply(this,arguments)}catch(r){throw"string"==typeof r&&(r=new String(r)),r.stack||(r._savedStackTrace=m.parse(r)),r._rollbarContext=t()||{},r._rollbarContext._wrappedSource=e.toString(),window._rollbarWrappedError=r,r}},e._wrapped._isWrap=!0;for(var n in e)e.hasOwnProperty(n)&&(e._wrapped[n]=e[n])}return e._wrapped}catch(o){return e}},x.loadFull=function(){console.error("[Rollbar]: Unexpected Rollbar.loadFull() called on a Notifier instance")},s.processPayloads=function(e){return e?void f():void i()};var L=(new Date).getTime(),T=0,R=0;e.exports={Notifier:s,setupJSON:n,topLevelNotifier:a}},function(e,r){"use strict";var t=Object.prototype.hasOwnProperty,n=Object.prototype.toString,o=function(e){return"function"==typeof Array.isArray?Array.isArray(e):"[object Array]"===n.call(e)},i=function(e){if(!e||"[object Object]"!==n.call(e))return!1;var r=t.call(e,"constructor"),o=e.constructor&&e.constructor.prototype&&t.call(e.constructor.prototype,"isPrototypeOf");if(e.constructor&&!r&&!o)return!1;var i;for(i in e);return"undefined"==typeof i||t.call(e,i)};e.exports=function a(){var e,r,t,n,s,u,c=arguments[0],l=1,p=arguments.length,f=!1;for("boolean"==typeof c?(f=c,c=arguments[1]||{},l=2):("object"!=typeof c&&"function"!=typeof c||null==c)&&(c={});l<p;++l)if(e=arguments[l],null!=e)for(r in e)t=c[r],n=e[r],c!==n&&(f&&n&&(i(n)||(s=o(n)))?(s?(s=!1,u=t&&o(t)?t:[]):u=t&&i(t)?t:{},c[r]=a(f,u,n)):"undefined"!=typeof n&&(c[r]=n));return c}},function(e,r,t){"use strict";function n(){return l}function o(){return null}function i(e){var r={};return r._stackFrame=e,r.url=e.fileName,r.line=e.lineNumber,r.func=e.functionName,r.column=e.columnNumber,r.args=e.args,r.context=o(r.url,r.line),r}function a(e){function r(){var r=[];try{r=c.parse(e)}catch(t){r=[]}for(var n=[],o=0;o<r.length;o++)n.push(new i(r[o]));return n}return{stack:r(),message:e.message,name:e.name}}function s(e){return new a(e)}function u(e){if(!e)return["Unknown error. There was no error message to display.",""];var r=e.match(p),t="(unknown)";return r&&(t=r[r.length-1],e=e.replace((r[r.length-2]||"")+t+":",""),e=e.replace(/(^[\s]+|[\s]+$)/g,"")),[t,e]}var c=t(6),l="?",p=new RegExp("^(([a-zA-Z0-9-_$ ]*): *)?(Uncaught )?([a-zA-Z0-9-_$ ]*): ");e.exports={guessFunctionName:n,guessErrorClass:u,gatherContext:o,parse:s,Stack:a,Frame:i}},function(e,r,t){var n,o,i;!function(a,s){"use strict";o=[t(7)],n=s,i="function"==typeof n?n.apply(r,o):n,!(void 0!==i&&(e.exports=i))}(this,function(e){"use strict";function r(e,r,t){if("function"==typeof Array.prototype.map)return e.map(r,t);for(var n=new Array(e.length),o=0;o<e.length;o++)n[o]=r.call(t,e[o]);return n}function t(e,r,t){if("function"==typeof Array.prototype.filter)return e.filter(r,t);for(var n=[],o=0;o<e.length;o++)r.call(t,e[o])&&n.push(e[o]);return n}var n=/(^|@)\S+\:\d+/,o=/^\s*at .*(\S+\:\d+|\(native\))/m,i=/^(eval@)?(\[native code\])?$/;return{parse:function(e){if("undefined"!=typeof e.stacktrace||"undefined"!=typeof e["opera#sourceloc"])return this.parseOpera(e);if(e.stack&&e.stack.match(o))return this.parseV8OrIE(e);if(e.stack)return this.parseFFOrSafari(e);throw new Error("Cannot parse given Error object")},extractLocation:function(e){if(e.indexOf(":")===-1)return[e];var r=e.replace(/[\(\)\s]/g,"").split(":"),t=r.pop(),n=r[r.length-1];if(!isNaN(parseFloat(n))&&isFinite(n)){var o=r.pop();return[r.join(":"),o,t]}return[r.join(":"),t,void 0]},parseV8OrIE:function(n){var i=t(n.stack.split("\n"),function(e){return!!e.match(o)},this);return r(i,function(r){r.indexOf("(eval ")>-1&&(r=r.replace(/eval code/g,"eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g,""));var t=r.replace(/^\s+/,"").replace(/\(eval code/g,"(").split(/\s+/).slice(1),n=this.extractLocation(t.pop()),o=t.join(" ")||void 0,i="eval"===n[0]?void 0:n[0];return new e(o,(void 0),i,n[1],n[2],r)},this)},parseFFOrSafari:function(n){var o=t(n.stack.split("\n"),function(e){return!e.match(i)},this);return r(o,function(r){if(r.indexOf(" > eval")>-1&&(r=r.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g,":$1")),r.indexOf("@")===-1&&r.indexOf(":")===-1)return new e(r);var t=r.split("@"),n=this.extractLocation(t.pop()),o=t.shift()||void 0;return new e(o,(void 0),n[0],n[1],n[2],r)},this)},parseOpera:function(e){return!e.stacktrace||e.message.indexOf("\n")>-1&&e.message.split("\n").length>e.stacktrace.split("\n").length?this.parseOpera9(e):e.stack?this.parseOpera11(e):this.parseOpera10(e)},parseOpera9:function(r){for(var t=/Line (\d+).*script (?:in )?(\S+)/i,n=r.message.split("\n"),o=[],i=2,a=n.length;i<a;i+=2){var s=t.exec(n[i]);s&&o.push(new e((void 0),(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera10:function(r){for(var t=/Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i,n=r.stacktrace.split("\n"),o=[],i=0,a=n.length;i<a;i+=2){var s=t.exec(n[i]);s&&o.push(new e(s[3]||void 0,(void 0),s[2],s[1],(void 0),n[i]))}return o},parseOpera11:function(o){var i=t(o.stack.split("\n"),function(e){return!!e.match(n)&&!e.match(/^Error created at/)},this);return r(i,function(r){var t,n=r.split("@"),o=this.extractLocation(n.pop()),i=n.shift()||"",a=i.replace(/<anonymous function(: (\w+))?>/,"$2").replace(/\([^\)]*\)/g,"")||void 0;i.match(/\(([^\)]*)\)/)&&(t=i.replace(/^[^\(]+\(([^\)]*)\)$/,"$1"));var s=void 0===t||"[arguments not available]"===t?void 0:t.split(",");return new e(a,s,o[0],o[1],o[2],r)},this)}}})},function(e,r,t){var n,o,i;!function(t,a){"use strict";o=[],n=a,i="function"==typeof n?n.apply(r,o):n,!(void 0!==i&&(e.exports=i))}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function r(e,r,t,n,o,i){void 0!==e&&this.setFunctionName(e),void 0!==r&&this.setArgs(r),void 0!==t&&this.setFileName(t),void 0!==n&&this.setLineNumber(n),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return r.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(e){this.functionName=String(e)},getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getFileName:function(){return this.fileName},setFileName:function(e){this.fileName=String(e)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(r){if(!e(r))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(r)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(r){if(!e(r))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(r)},getSource:function(){return this.source},setSource:function(e){this.source=String(e)},toString:function(){var r=this.getFunctionName()||"{anonymous}",t="("+(this.getArgs()||[]).join(",")+")",n=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return r+t+n+o+i}},r})},function(e,r,t){"use strict";function n(e){return{}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()}function o(e,r){return n(e)===r}function i(e){if(!o(e,"string"))throw new Error("received invalid input");for(var r=l,t=r.parser[r.strictMode?"strict":"loose"].exec(e),n={},i=14;i--;)n[r.key[i]]=t[i]||"";return n[r.q.name]={},n[r.key[12]].replace(r.q.parser,function(e,t,o){t&&(n[r.q.name][t]=o)}),n}function a(e){var r=i(e);return""===r.anchor&&(r.source=r.source.replace("#","")),e=r.source.replace("?"+r.query,"")}function s(e,r){var t,n,i,a=o(e,"object"),u=o(e,"array"),c=[];if(a)for(t in e)e.hasOwnProperty(t)&&c.push(t);else if(u)for(i=0;i<e.length;++i)c.push(i);for(i=0;i<c.length;++i)t=c[i],n=e[t],a=o(n,"object"),u=o(n,"array"),a||u?e[t]=s(n,r):e[t]=r(t,n);return e}function u(e){return e=String(e),new Array(e.length+1).join("*")}function c(){var e=(new Date).getTime(),r="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(r){var t=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"===r?t:7&t|8).toString(16)});return r}t(9);var l={strictMode:!1,key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],q:{name:"queryKey",parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}},p={isType:o,parseUri:i,parseUriOptions:l,redact:u,sanitizeUrl:a,traverse:s,typeName:n,uuid4:c};e.exports=p},function(e,r){!function(e){"use strict";e.console=e.console||{};for(var r,t,n=e.console,o={},i=function(){},a="memory".split(","),s="assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(",");r=a.pop();)n[r]||(n[r]=o);for(;t=s.pop();)n[t]||(n[t]=i)}("undefined"==typeof window?this:window)},function(e,r,t){"use strict";function n(e){a=e}function o(e){this.name="Connection Error",this.message=e,this.stack=(new Error).stack}var i=t(8),a=null;o.prototype=Object.create(Error.prototype),o.prototype.constructor=o;var s={XMLHttpFactories:[function(){return new XMLHttpRequest},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Msxml3.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],createXMLHTTPObject:function(){var e,r=!1,t=s.XMLHttpFactories,n=t.length;for(e=0;e<n;e++)try{r=t[e]();break}catch(o){}return r},post:function(e,r,t,n){if(!i.isType(t,"object"))throw new Error("Expected an object to POST");t=a.stringify(t),n=n||function(){};var u=s.createXMLHTTPObject();if(u)try{try{var c=function(){try{if(c&&4===u.readyState){c=void 0;var e=a.parse(u.responseText);200===u.status?n(null,e):i.isType(u.status,"number")&&u.status>=400&&u.status<600?(403==u.status&&console.error("[Rollbar]:"+e.message),n(new Error(String(u.status)))):n(new o("XHR response had no status code (likely connection failure)"))}}catch(r){var t;t=r&&r.stack?r:new Error(r),n(t)}};u.open("POST",e,!0),u.setRequestHeader&&(u.setRequestHeader("Content-Type","application/json"),u.setRequestHeader("X-Rollbar-Access-Token",r)),u.onreadystatechange=c,u.send(t)}catch(l){if("undefined"!=typeof XDomainRequest){"http:"===window.location.href.substring(0,5)&&"https"===e.substring(0,5)&&(e="http"+e.substring(5));var p=function(){n(new o("Request timed out"))},f=function(){n(new Error("Error during request"))},d=function(){n(null,a.parse(u.responseText))};u=new XDomainRequest,u.onprogress=function(){},u.ontimeout=p,u.onerror=f,u.onload=d,u.open("POST",e,!0),u.send(t)}}}catch(h){n(h)}}};e.exports={XHR:s,setupJSON:n,ConnectionError:o}}])});
},{}],2:[function(require,module,exports){
var VisionSimulation = require("dota-vision-simulation");
var worlddata = require("dota-vision-simulation/src/worlddata.json");
var getLightUnion = require("./getLightUnion");
var trim = require('./util/trim');
var QueryString = require('./util/queryString');
var Rollbar = require("rollbar-browser");

var rollbarConfig = {
    accessToken: 'fe7cf327f2b24bb8991e252239f6200f',
    captureUncaught: true,
    payload: {
        environment: 'production',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: "9acfd32d0639a9bafa4dc3e2711dfbc4a86144b5",
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true
            }
        }
    }
};

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
        TOWER_DAY_VISION_RADIUS = 1900,
        TOWER_NIGHT_VISION_RADIUS = 800,
        TOWER_TRUE_SIGHT_RADIUS = 700,
        TOWER_ATTACK_RANGE_RADIUS = 700,
        map_data_path = "data/",
        map_data,
        mapConstants = require('./mapConstants'),
        conversionFunctions = require('./conversionFunctions'),
        zoomify = new OpenLayers.Layer.Zoomify( "Zoomify", map_tile_path, new OpenLayers.Size( mapConstants.map_w, mapConstants.map_h ) ),
        map = new OpenLayers.Map("map", {
            theme: null,
            maxExtent: new OpenLayers.Bounds(0, 0, mapConstants.map_w, mapConstants.map_h),
            numZoomLevels: 5,
            maxResolution: Math.pow(2, 5-1 ),
            units: "m"
        }),
        layerKeys = [
            "no_wards",
            "ent_fow_blocker_node",
            "trigger_multiple",
            "npc_dota_roshan_spawner",
            "ent_dota_tree",
            "dota_item_rune_spawner",
            "dota_item_rune_spawner_bounty",
            "ent_dota_shop",
            "npc_dota_barracks",
            "npc_dota_building",
            "npc_dota_healer",
            "npc_dota_fort",
            "npc_dota_tower"
        ],
        layerNames = {
            npc_dota_roshan_spawner: "Roshan",
            dota_item_rune_spawner: "Runes",
            dota_item_rune_spawner_bounty: "Bounty Runes",
            ent_dota_tree: "Trees",
            npc_dota_healer: "Shrines",
            npc_dota_fort: "Ancients",
            ent_dota_shop: "Shops",
            npc_dota_tower: "Towers",
            npc_dota_barracks: "Barracks",
            npc_dota_building: "Buildings",
            trigger_multiple: "Neutral Camps Spawn Boxes",
            npc_dota_neutral_spawner: "Neutral Camps",
            no_wards: "Invalid Ward Locations",
            ent_fow_blocker_node: "Vision Blocker"
        },
        baseLayers = [
            new OpenLayers.Layer.TMS('7.00 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('700', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Default', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'default')
            }),
            new OpenLayers.Layer.TMS('6.87 Desert', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'desert')
            }),
            new OpenLayers.Layer.TMS('6.87 Immortal Gardens', map_tile_path, {
                type: "jpg",
                getURL: getMyURL('687', 'immortalgardens')
            })
        ],
        overlayGrouping = {
            "Day Vision Range": "Towers",
            "Night Vision Range": "Towers",
            "True Sight Range": "Towers",
            "Attack Range": "Towers",
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
        layerSwitcher = new OpenLayers.Control.LayerSwitcher({
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
        cutTrees = {};

    /***********************************
     * COORDINATE CONVERSION FUNCTIONS *
     ***********************************/

    var lerp = lerp,
        reverseLerp = conversionFunctions.reverseLerp,
        latLonToWorld = conversionFunctions.latLonToWorld,
        worldToLatLon = conversionFunctions.worldToLatLon,
        getTileRadius = conversionFunctions.getTileRadius,
        getScaledRadius = conversionFunctions.getScaledRadius,
        calculateDistance = conversionFunctions.calculateDistance;

    /********************
     * CONTROL HANDLERS *
     ********************/

    function handleTreeMarkerClick(event) {
        console.log('handleTreeMarkerClick', event.object);
        setTreeMarkerState(event.object, !event.object.treeVisible);
        setTreeQueryString();
    }
    
    function setTreeMarkerState(marker, state) {
        console.log('setTreeMarkerState', marker);
        var worldXY = latLonToWorld(marker.lonlat.lon, marker.lonlat.lat);

        marker.treeVisible = state;
        marker.setOpacity(state ? 1 : .4);
        
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

    function handleTowerMarkerClick(e, skipQueryStringUpdate) {
        console.log('handleTowerMarkerClick');
        var circle,
            feature,
            center;

        if (!e.object.showInfo) {
            center = new OpenLayers.Geometry.Point(e.object.lonlat.lon, e.object.lonlat.lat);

            // day vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.day_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            dayRangeLayer.addFeatures(feature);
            e.object.day_vision_feature = feature;

            // true sight circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.true_sight_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.lightblue);
            trueSightRangeLayer.addFeatures(feature);
            e.object.true_sight_feature = feature;

            // night vision circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.night_vision_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle);
            nightRangeLayer.addFeatures(feature);
            e.object.night_vision_feature = feature;

            // attack range circle
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(center, getScaledRadius(e.object.attack_range_radius), 30);
            feature = new OpenLayers.Feature.Vector(circle, null, style.red);
            attackRangeLayer.addFeatures(feature);
            e.object.attack_range_feature = feature;

            if (!skipQueryStringUpdate) QueryString.addQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);

            if (VISION_SIMULATION) updateVisibilityHandler(e.object.lonlat, e.object, TOWER_DAY_VISION_RADIUS);
        }
        else {
            dayRangeLayer.removeFeatures(e.object.day_vision_feature);
            nightRangeLayer.removeFeatures(e.object.night_vision_feature);
            trueSightRangeLayer.removeFeatures(e.object.true_sight_feature);
            attackRangeLayer.removeFeatures(e.object.attack_range_feature);

            if (e.object.vision_feature) visionSimulationLayer.removeFeatures(e.object.vision_feature);
            if (e.object.vision_center_feature) visionSimulationLayer.removeFeatures(e.object.vision_center_feature);
      
            if (!skipQueryStringUpdate) QueryString.removeQueryStringValue("tower_vision", e.object.tower_loc.x + ',' + e.object.tower_loc.y);
        }
        e.object.showInfo = !e.object.showInfo;
    }

    function handleWardClick(entityName) {
        return function(event) {
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName);
            QueryString.addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }

    function placeWard(latlon, entityName, qs_value_worldXY) {
        var entity = ENTITIES[entityName],
            marker = createWardMarker(entity.icon_path, latlon),
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(entity.radius), 40),
            feature = new OpenLayers.Feature.Vector(circle);
        iconLayer.addMarker(marker);
        wardVisionLayer.addFeatures(feature);
        marker.radius_feature = feature;
        marker.events.register("click", this, wardMarkerRemove);
        marker.events.register("touchend", this, wardMarkerRemove);
        marker.ward_type = entityName;
        marker.ward_loc = entityName;

        if (qs_value_worldXY == undefined) {
            var worldXY = latLonToWorld(latlon.lon, latlon.lat);
            worldXY.x = worldXY.x.toFixed(0);
            worldXY.y = worldXY.y.toFixed(0);
            marker.ward_loc = worldXY.x + ',' + worldXY.y
        } else {
            marker.ward_loc = qs_value_worldXY;
        }

        if (VISION_SIMULATION && entityName == 'observer') updateVisibilityHandler(latlon, marker, ENTITIES.observer.radius);
        
        return marker;
    }

    function wardMarkerRemove(event) {
        if (event.object.radius_feature) wardVisionLayer.removeFeatures(event.object.radius_feature);
        if (event.object.vision_feature) visionSimulationLayer.removeFeatures(event.object.vision_feature);
        if (event.object.vision_center_feature) visionSimulationLayer.removeFeatures(event.object.vision_center_feature);
        iconLayer.removeMarker(event.object);
        console.log(event.object);
        OpenLayers.Event.stop(event);

        QueryString.removeQueryStringValue(event.object.ward_type, event.object.ward_loc);
    }

    function handleOnClick(event) {
        console.log('handleOnClick');
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
        document.getElementById("output").innerHTML = "";

        document.getElementById("traveltime-container").style.display = 'none';
    }

    function handleTowerHoverPopup(event) {
        if (this.popup == null) {
            console.log(this.closeBox);
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        }
        else {
            this.popup.toggle();
        }
        currentPopup = this.popup;
        OpenLayers.Event.stop(event);
    };

    function handleTreeHoverPopup(event) {
        if (this.popup == null) {
            this.popup = this.createPopup(this.closeBox);
            map.addPopup(this.popup);
            this.popup.show();
        }
        else {
            this.popup.toggle();
        }
        currentPopup = this.popup;
        OpenLayers.Event.stop(event);
    };
        
    function addMarker(markers, ll, popupClass, popupContentHTML, closeBox, overflow) {
        var feature = new OpenLayers.Feature(markers, ll),
            marker;

        feature.closeBox = closeBox;
        feature.popupClass = popupClass;
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = overflow ? "auto" : "hidden";
        marker = feature.createMarker();
        marker.feature = feature;
        
        if (markers.name == "Towers") {
            marker.events.register("mouseover", feature, handleTowerHoverPopup);
            marker.events.register("mouseout", feature, handleTowerHoverPopup);
        }
        else if (markers.name == "Trees" && VISION_SIMULATION) {
            marker.events.register("mouseover", feature, handleTreeHoverPopup);
            marker.events.register("mouseout", feature, handleTreeHoverPopup);
        }
        markers.addMarker(marker);
        return marker;
    }

    function createWardMarker(img, latlon) {
        var size = new OpenLayers.Size(21, 25),
            offset = new OpenLayers.Pixel(-(size.w / 2), -size.h),
            icon = new OpenLayers.Icon(img, size, offset),
            marker = new OpenLayers.Marker(latlon, icon);
        console.log('createWardMarker', latlon);
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
        layerKeys.forEach(function (k) {
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
            box_rect, box_feature;
        layerKeys.forEach(function (k) {
            console.log('onMapDataLoad', k);
            if (data[k]) {
                // Create markers for non-neutral spawn box and non-tree layers
                if (k != "trigger_multiple" && k != "ent_dota_tree" && k != "no_wards" && k != "ent_fow_blocker_node") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
                    for (var i = 0; i < data[k].length; i++) {
                        var latlon = worldToLatLon(data[k][i].x, data[k][i].y);
                        marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to toggle range overlay", false);
                        marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                        marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                        marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                        marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                        marker.showInfo = false;

                        if (k == "npc_dota_tower") {
                            console.log('npc_dota_tower');
                            marker.events.register("click", markers[k], handleTowerMarkerClick);
                            marker.events.register("touchend", markers[k], handleTowerMarkerClick);
                            marker.tower_loc = data[k][i];
                        }
                    }
                }
                // Set up tree layer without creating tree markers yet
                else if (k == "ent_dota_tree") {
                    markers[k] = new OpenLayers.Layer.Markers(layerNames[k], {visibility: false});
                    map.addLayer(markers[k]);
                    //markers[k].setVisibility(false);
                    markers[k].data = data[k];
                }
                // Create neutral spawn markers and rectangles
                else if (k == "trigger_multiple") {
                    loadJSONData(markers, k, "npc_dota_neutral_spawner_box", data[k]);
                }
            }
            else if (VISION_SIMULATION) {
                if (k === "no_wards") {
                    loadGeoJSONData(markers, k, layerNames[k], style.red);
                }
                else if (k === "ent_fow_blocker_node") {
                    loadGeoJSONData(markers, k, layerNames[k], style.lightblue);
                }
            }
        });        

        map_data = data;
        
        map.raiseLayer(vectorLayer, map.layers.length);

        // Create tree markers the first time the tree layer is switched to
        map.events.register("changelayer", map, layerChangeHandler);

        parseQueryString();
    }
    
    function layerChangeHandler(event) {
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
        for (var i = 0; i < layer.data.length; i++) {
            var latlon = worldToLatLon(layer.data[i].x, layer.data[i].y);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), OpenLayers.Popup.FramedCloud, "Click to cut down tree.<br>This will affect the ward vision simulation.", false);
            marker.treeVisible = true;
            marker.tree_loc = layer.data[i].x + ',' + layer.data[i].y;
            if (VISION_SIMULATION) {
                marker.events.register("click", layer, handleTreeMarkerClick);
            }
            treeMarkers[layer.data[i].x + ',' + layer.data[i].y] = marker;
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
            for (var j = 0; j < data[i].length; j++) {
                var latlon = worldToLatLon(data[i][j].x, data[i][j].y);
                pnt.push(new OpenLayers.Geometry.Point(latlon.x, latlon.y));
            }


            ln = new OpenLayers.Geometry.LinearRing(pnt);
            pf = new OpenLayers.Feature.Vector(ln, null, style.green);
            markers[name].addFeatures([pf]);
        }
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
                    placeWard(new OpenLayers.LonLat(xy.x, xy.y), keys[i], el);
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
            var layer = map.getLayersByName(layerNames["npc_dota_tower"])[0];
            tower_vision_coordinates = trim(tower_vision, ' ;').split(';')
            console.log('tower_vision', layer);
            console.log(treeMarkers, tower_vision_coordinates);
            for (var i = 0; i < tower_vision_coordinates.length; i++) {
                for (var j = 0; j < layer.markers.length; j++) {
                    if (layer.markers[j].tower_loc.x + ',' + layer.markers[j].tower_loc.y == tower_vision_coordinates[i]) {
                        handleTowerMarkerClick({
                            object: layer.markers[j]
                        }, true);
                    }
                }
            }
        }
    }
    
    function setTreeQueryString() {
        var value = Object.keys(cutTrees).join(';');
        QueryString.setQueryString('cut_trees', value || null);
    }

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
    map.addControl(new OpenLayers.Control.TouchNavigation({
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
        onClick: handleOnClick,
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
            onClick: handleWardClick('observer'),
            handlerOptions: {
                single: true
            }
        }),
        sentry: new OpenLayers.Control.Click({
            onClick: handleWardClick('sentry'),
            handlerOptions: {
                single: true
            }
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

    map.events.register("zoomend", map, function(){
        QueryString.setQueryString('zoom', map.zoom);
    });

    map.events.register("moveend", map, function(){
        var worldXY = latLonToWorld(map.center.lon, map.center.lat);
        QueryString.setQueryString('x', worldXY.x.toFixed(0));
        QueryString.setQueryString('y', worldXY.y.toFixed(0));
    });

    // X/Y coordinate update display handler
    coordinateControl.formatOutput = function (lonlat) {
        var worldXY = latLonToWorld(lonlat.lon, lonlat.lat);
        return worldXY.x.toFixed(0) + ', ' + worldXY.y.toFixed(0);
    };
    
    map.events.register("mousemove", map, function(e) {
        /*if (wardVisionLayer.cursor_marker) {
            if (wardVisionLayer.cursor_marker.vision_center_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_center_feature);
            if (wardVisionLayer.cursor_marker.vision_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_feature);
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }*/
        cursorLayer.destroyFeatures();
    
        // create and add cursor marker polygon if in place observer mode
        if (VISION_SIMULATION && document.getElementById("observerToggle").checked) {
            var lonlat = map.getLonLatFromPixel(e.xy);
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
            //wardVisionLayer.cursor_marker = box_feature;
            
            if (VISION_SIMULATION_ALWAYS) updateVisibilityHandler(lonlat, null, ENTITIES.observer.radius);
        }
    });

    // Show/hide controls panel
    document.getElementById("controls-max").addEventListener("click", function(e) {
        document.querySelector(".controls").style.display = '';
        document.getElementById("controls-min").style.display = 'block';
        this.style.display = 'none';
        if (layerSwitcher.isSmallScreen()) {
            layerSwitcher.minimizeControl();
        }
        if (e) e.preventDefault();
    }, false);
    
    function minimizeControlList(e) {
        document.querySelector(".controls").style.display = 'none';
        document.getElementById("controls-max").style.display = 'block';
        this.style.display = 'none';
        if (e) e.preventDefault();
    }
    document.getElementById("controls-min").addEventListener("click", minimizeControlList, false);
    
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
    
    document.getElementById('reset').addEventListener('click', function () {
        history.replaceState(null, "", window.location.href.split("?")[0]);
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
        init();
    }, false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        QueryString.setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    function init() {
        var data = QueryString.getParameterByName('data');
        if (data) {
            document.getElementById('dataControl').value = data;
        }
        VISION_SIMULATION = data != "687";
        //document.querySelector('label[for="visionSimulationControl"]').style.display = VISION_SIMULATION ? 'inline' : 'none';
        document.getElementById("visionSimulationControl").disabled = !VISION_SIMULATION;
        document.getElementById("alwaysSimulateControl").disabled = !VISION_SIMULATION;
        getJSON(map_data_path + getDataVersion() + '/mapdata.json', onMapDataLoad);
    }
    
    function getDataVersion() {
        return document.getElementById('dataControl').value;
    }

    function updateVisibilityHandler(latlon, marker, radius) {
        //console.log(latlon, marker, radius);
        var worldXY = latLonToWorld(latlon.lon, latlon.lat);
        var gridXY = vs.WorldXYtoGridXY(worldXY.x, worldXY.y);
        if (vs.isValidXY(gridXY.x, gridXY.y, true, true, true)) {
            // create and add center marker polygon
            var box_feature = createTileFeature(vs.GridXYtoWorldXY(gridXY.x, gridXY.y), style.green);
            if (marker) {
                visionSimulationLayer.addFeatures([box_feature]);
                marker.vision_center_feature = box_feature;
            }

            // execute vision simulation
            vs.updateVisibility(gridXY.x, gridXY.y, getTileRadius(radius));
            
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
            var visionFeature = new OpenLayers.Feature.Vector(multiPolygon, null, style.yellow);
            if (marker) {
                visionSimulationLayer.addFeatures([visionFeature]);
                marker.vision_feature = visionFeature;
            }
            else {
                cursorLayer.addFeatures([visionFeature]);
            }
        }
    }
    
    var t1 = Date.now();
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        console.log('vs loaded', Date.now() - t1);
        init();
    });
    
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
}

module.exports = App;
},{"./conversionFunctions":3,"./getLightUnion":4,"./mapConstants":5,"./styleConstants":6,"./util/queryString":7,"./util/trim":8,"dota-vision-simulation":13,"dota-vision-simulation/src/worlddata.json":14,"rollbar-browser":1}],3:[function(require,module,exports){
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
},{"dota-vision-simulation":13}],5:[function(require,module,exports){
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
        fillOpacity: .4
    },
    red: {
        strokeColor: "#FF0000",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#FF0000",
        fillOpacity: .4
    },
    green: {
        strokeColor: "#00FF00",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#00FF00",
        fillOpacity: .4
    },
    yellow: {
        strokeColor: "#FFFF00",
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#FFFF00",
        fillOpacity: .4
    }
};
},{}],7:[function(require,module,exports){
var trim = require('./trim');

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setQueryString(key, value) {
    history.replaceState(null, "", updateQueryString(key, value));
}

function addQueryStringValue(key, value) {
    console.log('addQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;') + ';' + value, ' ;');
    history.replaceState(null, "", updateQueryString(key, qs));
}

function removeQueryStringValue(key, value) {
    console.log('removeQueryStringValue', key, value);
    var qs = getParameterByName(key);
    qs = trim(trim(qs, ' ;').replace(value, '').replace(/;;/g, ''), ' ;');
    history.replaceState(null, "", updateQueryString(key, qs != '' ? qs : null));
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
},{"./trim":8}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
},{"png-js":10}],10:[function(require,module,exports){
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
},{"./zlib":11}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
	var cx, cy, blocks, A1, A2, visibility,
        dx, dy, dd, a, b, radius,
        cx2, cy2, dd1,
        obstacleType;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
        ////console.log('ring', r);
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;
        trees = {};
		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
            var key = cx+","+cy;
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
},{}],13:[function(require,module,exports){
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
    this.fov.compute(gX, gY, radius, function(x2, y2, r, vis) {
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
        if (vis == 1 && !self.ent_fow_blocker_node[key] && !treeBlocking && (gX-x2)*(gX-x2) + (gY-y2)*(gY-y2) < radius * radius) {
            self.lights[key] = 255;
        }
    });
}

VisionSimulation.prototype.isValidXY = function (x, y, bCheckGridnav, bCheckToolsNoWards, bCheckTreeState) {
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
},{"./imageHandler.js":9,"./rot6.js":12}],14:[function(require,module,exports){
module.exports={"worldMinX":-8288,"worldMaxX":8288,"worldMinY":-8288,"worldMaxY":8288}
},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcm9sbGJhci1icm93c2VyL2Rpc3Qvcm9sbGJhci51bWQubm9qc29uLm1pbi5qcyIsInNyYy9hcHAuanMiLCJzcmMvY29udmVyc2lvbkZ1bmN0aW9ucy5qcyIsInNyYy9nZXRMaWdodFVuaW9uLmpzIiwic3JjL21hcENvbnN0YW50cy5qcyIsInNyYy9zdHlsZUNvbnN0YW50cy5qcyIsInNyYy91dGlsL3F1ZXJ5U3RyaW5nLmpzIiwic3JjL3V0aWwvdHJpbS5qcyIsIi4uL2RvdGEtdmlzaW9uLXNpbXVsYXRpb24vYnJvd3Nlci9pbWFnZUhhbmRsZXIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL2Jyb3dzZXIvcG5nLmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9icm93c2VyL3psaWIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy9yb3Q2LmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvdmlzaW9uLXNpbXVsYXRpb24uanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmpDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMWlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RUQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24oZSxyKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1yKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHIpO2Vsc2V7dmFyIHQ9cigpO2Zvcih2YXIgbiBpbiB0KShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW25dPXRbbl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2V4cG9ydHM6e30saWQ6bixsb2FkZWQ6ITF9O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgdD17fTtyZXR1cm4gci5tPWUsci5jPXQsci5wPVwiXCIscigwKX0oW2Z1bmN0aW9uKGUscix0KXtlLmV4cG9ydHM9dCgxKX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXt2YXIgZT1cInVuZGVmaW5lZFwiPT10eXBlb2YgSlNPTj97fTpKU09OO28uc2V0dXBKU09OKGUpfXZhciBvPXQoMiksaT10KDMpO24oKTt2YXIgYT13aW5kb3cuX3JvbGxiYXJDb25maWcscz1hJiZhLmdsb2JhbEFsaWFzfHxcIlJvbGxiYXJcIix1PXdpbmRvd1tzXSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvd1tzXS5zaGltSWQ7IXUmJmE/by53cmFwcGVyLmluaXQoYSk6KHdpbmRvdy5Sb2xsYmFyPW8ud3JhcHBlcix3aW5kb3cuUm9sbGJhck5vdGlmaWVyPWkuTm90aWZpZXIpLGUuZXhwb3J0cz1vLndyYXBwZXJ9LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUscix0KXshdFs0XSYmd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yJiYodFs0XT13aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3Isd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yPW51bGwpLGUudW5jYXVnaHRFcnJvci5hcHBseShlLHQpLHImJnIuYXBwbHkod2luZG93LHQpfWZ1bmN0aW9uIG8oZSxyKXtpZihyLmhhc093blByb3BlcnR5JiZyLmhhc093blByb3BlcnR5KFwiYWRkRXZlbnRMaXN0ZW5lclwiKSl7dmFyIHQ9ci5hZGRFdmVudExpc3RlbmVyO3IuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihyLG4sbyl7dC5jYWxsKHRoaXMscixlLndyYXAobiksbyl9O3ZhciBuPXIucmVtb3ZlRXZlbnRMaXN0ZW5lcjtyLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oZSxyLHQpe24uY2FsbCh0aGlzLGUsciYmci5fd3JhcHBlZHx8cix0KX19fXZhciBpPXQoMyksYT10KDgpLHM9aS5Ob3RpZmllcjt3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3I9bnVsbDt2YXIgdT17fTt1LmluaXQ9ZnVuY3Rpb24oZSxyKXt2YXIgdD1uZXcgcyhyKTtpZih0LmNvbmZpZ3VyZShlKSxlLmNhcHR1cmVVbmNhdWdodCl7dmFyIGk7ciYmYS5pc1R5cGUoci5fcm9sbGJhck9sZE9uRXJyb3IsXCJmdW5jdGlvblwiKT9pPXIuX3JvbGxiYXJPbGRPbkVycm9yOndpbmRvdy5vbmVycm9yJiYhd2luZG93Lm9uZXJyb3IuYmVsb25nc1RvU2hpbSYmKGk9d2luZG93Lm9uZXJyb3IpLHdpbmRvdy5vbmVycm9yPWZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO24odCxpLGUpfTt2YXIgdSxjLGw9W1wiRXZlbnRUYXJnZXRcIixcIldpbmRvd1wiLFwiTm9kZVwiLFwiQXBwbGljYXRpb25DYWNoZVwiLFwiQXVkaW9UcmFja0xpc3RcIixcIkNoYW5uZWxNZXJnZXJOb2RlXCIsXCJDcnlwdG9PcGVyYXRpb25cIixcIkV2ZW50U291cmNlXCIsXCJGaWxlUmVhZGVyXCIsXCJIVE1MVW5rbm93bkVsZW1lbnRcIixcIklEQkRhdGFiYXNlXCIsXCJJREJSZXF1ZXN0XCIsXCJJREJUcmFuc2FjdGlvblwiLFwiS2V5T3BlcmF0aW9uXCIsXCJNZWRpYUNvbnRyb2xsZXJcIixcIk1lc3NhZ2VQb3J0XCIsXCJNb2RhbFdpbmRvd1wiLFwiTm90aWZpY2F0aW9uXCIsXCJTVkdFbGVtZW50SW5zdGFuY2VcIixcIlNjcmVlblwiLFwiVGV4dFRyYWNrXCIsXCJUZXh0VHJhY2tDdWVcIixcIlRleHRUcmFja0xpc3RcIixcIldlYlNvY2tldFwiLFwiV2ViU29ja2V0V29ya2VyXCIsXCJXb3JrZXJcIixcIlhNTEh0dHBSZXF1ZXN0XCIsXCJYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0XCIsXCJYTUxIdHRwUmVxdWVzdFVwbG9hZFwiXTtmb3IodT0wO3U8bC5sZW5ndGg7Kyt1KWM9bFt1XSx3aW5kb3dbY10mJndpbmRvd1tjXS5wcm90b3R5cGUmJm8odCx3aW5kb3dbY10ucHJvdG90eXBlKX1yZXR1cm4gZS5jYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9ucyYmKHImJmEuaXNUeXBlKHIuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIsXCJmdW5jdGlvblwiKSYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIixyLl91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKSx0Ll91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyPWZ1bmN0aW9uKGUpe3ZhciByPWUucmVhc29uLG49ZS5wcm9taXNlLG89ZS5kZXRhaWw7IXImJm8mJihyPW8ucmVhc29uLG49by5wcm9taXNlKSx0LnVuaGFuZGxlZFJlamVjdGlvbihyLG4pfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLHQuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIpKSx3aW5kb3cuUm9sbGJhcj10LHMucHJvY2Vzc1BheWxvYWRzKCksdH0sZS5leHBvcnRzPXt3cmFwcGVyOnUsc2V0dXBKU09OOmkuc2V0dXBKU09OfX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7RT1lLHcuc2V0dXBKU09OKGUpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1yfHx0aGlzO3RyeXtyZXR1cm4gZS5hcHBseSh0LGFyZ3VtZW50cyl9Y2F0Y2gobil7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTpcIixuKX19fWZ1bmN0aW9uIGkoKXtofHwoaD1zZXRUaW1lb3V0KGYsMWUzKSl9ZnVuY3Rpb24gYSgpe3JldHVybiBffWZ1bmN0aW9uIHMoZSl7Xz1ffHx0aGlzO3ZhciByPVwiaHR0cHM6Ly9cIitzLkRFRkFVTFRfRU5EUE9JTlQ7dGhpcy5vcHRpb25zPXtlbmFibGVkOiEwLGVuZHBvaW50OnIsZW52aXJvbm1lbnQ6XCJwcm9kdWN0aW9uXCIsc2NydWJGaWVsZHM6ZyhbXSxzLkRFRkFVTFRfU0NSVUJfRklFTERTKSxjaGVja0lnbm9yZTpudWxsLGxvZ0xldmVsOnMuREVGQVVMVF9MT0dfTEVWRUwscmVwb3J0TGV2ZWw6cy5ERUZBVUxUX1JFUE9SVF9MRVZFTCx1bmNhdWdodEVycm9yTGV2ZWw6cy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMLHBheWxvYWQ6e319LHRoaXMubGFzdEVycm9yPW51bGwsdGhpcy5wbHVnaW5zPXt9LHRoaXMucGFyZW50Tm90aWZpZXI9ZSxlJiYoZS5oYXNPd25Qcm9wZXJ0eShcInNoaW1JZFwiKT9lLm5vdGlmaWVyPXRoaXM6dGhpcy5jb25maWd1cmUoZS5vcHRpb25zKSl9ZnVuY3Rpb24gdShlKXt3aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWUucHVzaChlKSxpKCl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gbyhmdW5jdGlvbigpe3ZhciByPXRoaXMuX2dldExvZ0FyZ3MoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy5fbG9nKGV8fHIubGV2ZWx8fHRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxyLm1lc3NhZ2Usci5lcnIsci5jdXN0b20sci5jYWxsYmFjayl9KX1mdW5jdGlvbiBsKGUscil7ZXx8KGU9cj9FLnN0cmluZ2lmeShyKTpcIlwiKTt2YXIgdD17Ym9keTplfTtyZXR1cm4gciYmKHQuZXh0cmE9ZyghMCx7fSxyKSkse21lc3NhZ2U6dH19ZnVuY3Rpb24gcChlLHIsdCl7dmFyIG49bS5ndWVzc0Vycm9yQ2xhc3Moci5tZXNzYWdlKSxvPXIubmFtZXx8blswXSxpPW5bMV0sYT17ZXhjZXB0aW9uOntcImNsYXNzXCI6byxtZXNzYWdlOml9fTtpZihlJiYoYS5leGNlcHRpb24uZGVzY3JpcHRpb249ZXx8XCJ1bmNhdWdodCBleGNlcHRpb25cIiksci5zdGFjayl7dmFyIHMsdSxjLHAsZixkLGgsdztmb3IoYS5mcmFtZXM9W10saD0wO2g8ci5zdGFjay5sZW5ndGg7KytoKXM9ci5zdGFja1toXSx1PXtmaWxlbmFtZTpzLnVybD92LnNhbml0aXplVXJsKHMudXJsKTpcIih1bmtub3duKVwiLGxpbmVubzpzLmxpbmV8fG51bGwsbWV0aG9kOnMuZnVuYyYmXCI/XCIhPT1zLmZ1bmM/cy5mdW5jOlwiW2Fub255bW91c11cIixjb2xubzpzLmNvbHVtbn0sYz1wPWY9bnVsbCxkPXMuY29udGV4dD9zLmNvbnRleHQubGVuZ3RoOjAsZCYmKHc9TWF0aC5mbG9vcihkLzIpLHA9cy5jb250ZXh0LnNsaWNlKDAsdyksYz1zLmNvbnRleHRbd10sZj1zLmNvbnRleHQuc2xpY2UodykpLGMmJih1LmNvZGU9YyksKHB8fGYpJiYodS5jb250ZXh0PXt9LHAmJnAubGVuZ3RoJiYodS5jb250ZXh0LnByZT1wKSxmJiZmLmxlbmd0aCYmKHUuY29udGV4dC5wb3N0PWYpKSxzLmFyZ3MmJih1LmFyZ3M9cy5hcmdzKSxhLmZyYW1lcy5wdXNoKHUpO3JldHVybiBhLmZyYW1lcy5yZXZlcnNlKCksdCYmKGEuZXh0cmE9ZyghMCx7fSx0KSkse3RyYWNlOmF9fXJldHVybiBsKG8rXCI6IFwiK2ksdCl9ZnVuY3Rpb24gZigpe3ZhciBlO3RyeXtmb3IoO2U9d2luZG93Ll9yb2xsYmFyUGF5bG9hZFF1ZXVlLnNoaWZ0KCk7KWQoZSl9ZmluYWxseXtoPXZvaWQgMH19ZnVuY3Rpb24gZChlKXt2YXIgcj1lLmVuZHBvaW50VXJsLHQ9ZS5hY2Nlc3NUb2tlbixuPWUucGF5bG9hZCxvPWUuY2FsbGJhY2t8fGZ1bmN0aW9uKCl7fSxpPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2ktTD49NmU0JiYoTD1pLFI9MCk7dmFyIGE9d2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5tYXhJdGVtcyxjPXdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMuaXRlbXNQZXJNaW51dGUsbD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYT49MSYmVD49YX0scD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYz49MSYmUj49Y307cmV0dXJuIGwoKT92b2lkIG8obmV3IEVycm9yKGErXCIgbWF4IGl0ZW1zIHJlYWNoZWRcIikpOnAoKT92b2lkIG8obmV3IEVycm9yKGMrXCIgaXRlbXMgcGVyIG1pbnV0ZSByZWFjaGVkXCIpKTooVCsrLFIrKyxsKCkmJl8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwibWF4SXRlbXMgaGFzIGJlZW4gaGl0LiBJZ25vcmluZyBlcnJvcnMgZm9yIHRoZSByZW1haW5kZXIgb2YgdGhlIGN1cnJlbnQgcGFnZSBsb2FkLlwiLG51bGwse21heEl0ZW1zOmF9LG51bGwsITEsITApLG4uaWdub3JlUmF0ZUxpbWl0JiZkZWxldGUgbi5pZ25vcmVSYXRlTGltaXQsdm9pZCB5LnBvc3Qocix0LG4sZnVuY3Rpb24ocix0KXtyZXR1cm4gcj8ociBpbnN0YW5jZW9mIGImJihlLmNhbGxiYWNrPWZ1bmN0aW9uKCl7fSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dShlKX0scy5SRVRSWV9ERUxBWSkpLG8ocikpOm8obnVsbCx0KX0pKX12YXIgaCxnPXQoNCksbT10KDUpLHY9dCg4KSx3PXQoMTApLHk9dy5YSFIsYj13LkNvbm5lY3Rpb25FcnJvcixFPW51bGw7cy5OT1RJRklFUl9WRVJTSU9OPVwiMS45LjJcIixzLkRFRkFVTFRfRU5EUE9JTlQ9XCJhcGkucm9sbGJhci5jb20vYXBpLzEvXCIscy5ERUZBVUxUX1NDUlVCX0ZJRUxEUz1bXCJwd1wiLFwicGFzc1wiLFwicGFzc3dkXCIsXCJwYXNzd29yZFwiLFwic2VjcmV0XCIsXCJjb25maXJtX3Bhc3N3b3JkXCIsXCJjb25maXJtUGFzc3dvcmRcIixcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFwicGFzc3dvcmRDb25maXJtYXRpb25cIixcImFjY2Vzc190b2tlblwiLFwiYWNjZXNzVG9rZW5cIixcInNlY3JldF9rZXlcIixcInNlY3JldEtleVwiLFwic2VjcmV0VG9rZW5cIl0scy5ERUZBVUxUX0xPR19MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1JFUE9SVF9MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMPVwiZXJyb3JcIixzLkRFRkFVTFRfSVRFTVNfUEVSX01JTj02MCxzLkRFRkFVTFRfTUFYX0lURU1TPTAscy5MRVZFTFM9e2RlYnVnOjAsaW5mbzoxLHdhcm5pbmc6MixlcnJvcjozLGNyaXRpY2FsOjR9LHMuUkVUUllfREVMQVk9MWU0LHdpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZT13aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWV8fFtdLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnM9e3N0YXJ0VGltZToobmV3IERhdGUpLmdldFRpbWUoKSxtYXhJdGVtczpzLkRFRkFVTFRfTUFYX0lURU1TLGl0ZW1zUGVyTWludXRlOnMuREVGQVVMVF9JVEVNU19QRVJfTUlOfTt2YXIgXyx4PXMucHJvdG90eXBlO3guX2dldExvZ0FyZ3M9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixpLGEsdSxjPXRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxsPVtdLHA9MDtwPGUubGVuZ3RoOysrcCl1PWVbcF0sYT12LnR5cGVOYW1lKHUpLFwic3RyaW5nXCI9PT1hP3I/bC5wdXNoKHUpOnI9dTpcImZ1bmN0aW9uXCI9PT1hP2k9byh1LHRoaXMpOlwiZGF0ZVwiPT09YT9sLnB1c2godSk6XCJlcnJvclwiPT09YXx8dSBpbnN0YW5jZW9mIEVycm9yfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgRE9NRXhjZXB0aW9uJiZ1IGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uP3Q/bC5wdXNoKHUpOnQ9dTpcIm9iamVjdFwiIT09YSYmXCJhcnJheVwiIT09YXx8KG4/bC5wdXNoKHUpOm49dSk7cmV0dXJuIGwubGVuZ3RoJiYobj1ufHx7fSxuLmV4dHJhQXJncz1sKSx7bGV2ZWw6YyxtZXNzYWdlOnIsZXJyOnQsY3VzdG9tOm4sY2FsbGJhY2s6aX19LHguX3JvdXRlPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXMub3B0aW9ucy5lbmRwb2ludCx0PS9cXC8kLy50ZXN0KHIpLG49L15cXC8vLnRlc3QoZSk7cmV0dXJuIHQmJm4/ZT1lLnN1YnN0cmluZygxKTp0fHxufHwoZT1cIi9cIitlKSxyK2V9LHguX3Byb2Nlc3NTaGltUXVldWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixvLGksYSx1LGM9e307dD1lLnNoaWZ0KCk7KXI9dC5zaGltLG49dC5tZXRob2Qsbz10LmFyZ3MsaT1yLnBhcmVudFNoaW0sdT1jW3Iuc2hpbUlkXSx1fHwoaT8oYT1jW2kuc2hpbUlkXSx1PW5ldyBzKGEpKTp1PXRoaXMsY1tyLnNoaW1JZF09dSksdVtuXSYmdi5pc1R5cGUodVtuXSxcImZ1bmN0aW9uXCIpJiZ1W25dLmFwcGx5KHUsbyl9LHguX2J1aWxkUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuLG8pe3ZhciBpPXRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbixhPXRoaXMub3B0aW9ucy5lbnZpcm9ubWVudCx1PWcoITAse30sdGhpcy5vcHRpb25zLnBheWxvYWQpLGM9di51dWlkNCgpO2lmKHZvaWQgMD09PXMuTEVWRUxTW3JdKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGV2ZWxcIik7aWYoIXQmJiFuJiYhbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXNzYWdlLCBzdGFjayBpbmZvIG9yIGN1c3RvbSBkYXRhXCIpO3ZhciBsPXtlbnZpcm9ubWVudDphLGVuZHBvaW50OnRoaXMub3B0aW9ucy5lbmRwb2ludCx1dWlkOmMsbGV2ZWw6cixwbGF0Zm9ybTpcImJyb3dzZXJcIixmcmFtZXdvcms6XCJicm93c2VyLWpzXCIsbGFuZ3VhZ2U6XCJqYXZhc2NyaXB0XCIsYm9keTp0aGlzLl9idWlsZEJvZHkodCxuLG8pLHJlcXVlc3Q6e3VybDp3aW5kb3cubG9jYXRpb24uaHJlZixxdWVyeV9zdHJpbmc6d2luZG93LmxvY2F0aW9uLnNlYXJjaCx1c2VyX2lwOlwiJHJlbW90ZV9pcFwifSxjbGllbnQ6e3J1bnRpbWVfbXM6ZS5nZXRUaW1lKCktd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5zdGFydFRpbWUsdGltZXN0YW1wOk1hdGgucm91bmQoZS5nZXRUaW1lKCkvMWUzKSxqYXZhc2NyaXB0Onticm93c2VyOndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LGxhbmd1YWdlOndpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UsY29va2llX2VuYWJsZWQ6d2luZG93Lm5hdmlnYXRvci5jb29raWVFbmFibGVkLHNjcmVlbjp7d2lkdGg6d2luZG93LnNjcmVlbi53aWR0aCxoZWlnaHQ6d2luZG93LnNjcmVlbi5oZWlnaHR9LHBsdWdpbnM6dGhpcy5fZ2V0QnJvd3NlclBsdWdpbnMoKX19LHNlcnZlcjp7fSxub3RpZmllcjp7bmFtZTpcInJvbGxiYXItYnJvd3Nlci1qc1wiLHZlcnNpb246cy5OT1RJRklFUl9WRVJTSU9OfX07dS5ib2R5JiZkZWxldGUgdS5ib2R5O3ZhciBwPXthY2Nlc3NfdG9rZW46aSxkYXRhOmcoITAsbCx1KX07cmV0dXJuIHRoaXMuX3NjcnViKHAuZGF0YSkscH0seC5fYnVpbGRCb2R5PWZ1bmN0aW9uKGUscix0KXt2YXIgbjtyZXR1cm4gbj1yP3AoZSxyLHQpOmwoZSx0KX0seC5fZ2V0QnJvd3NlclBsdWdpbnM9ZnVuY3Rpb24oKXtpZighdGhpcy5fYnJvd3NlclBsdWdpbnMpe3ZhciBlLHIsdD13aW5kb3cubmF2aWdhdG9yLnBsdWdpbnN8fFtdLG49dC5sZW5ndGgsbz1bXTtmb3Iocj0wO3I8bjsrK3IpZT10W3JdLG8ucHVzaCh7bmFtZTplLm5hbWUsZGVzY3JpcHRpb246ZS5kZXNjcmlwdGlvbn0pO3RoaXMuX2Jyb3dzZXJQbHVnaW5zPW99cmV0dXJuIHRoaXMuX2Jyb3dzZXJQbHVnaW5zfSx4Ll9zY3J1Yj1mdW5jdGlvbihlKXtmdW5jdGlvbiByKGUscix0LG4sbyxpKXtyZXR1cm4gcit2LnJlZGFjdChpKX1mdW5jdGlvbiB0KGUpe3ZhciB0O2lmKHYuaXNUeXBlKGUsXCJzdHJpbmdcIikpZm9yKHQ9MDt0PHMubGVuZ3RoOysrdCllPWUucmVwbGFjZShzW3RdLHIpO3JldHVybiBlfWZ1bmN0aW9uIG4oZSxyKXt2YXIgdDtmb3IodD0wO3Q8YS5sZW5ndGg7Kyt0KWlmKGFbdF0udGVzdChlKSl7cj12LnJlZGFjdChyKTticmVha31yZXR1cm4gcn1mdW5jdGlvbiBvKGUscil7dmFyIG89bihlLHIpO3JldHVybiBvPT09cj90KG8pOm99dmFyIGk9dGhpcy5vcHRpb25zLnNjcnViRmllbGRzLGE9dGhpcy5fZ2V0U2NydWJGaWVsZFJlZ2V4cyhpKSxzPXRoaXMuX2dldFNjcnViUXVlcnlQYXJhbVJlZ2V4cyhpKTtyZXR1cm4gdi50cmF2ZXJzZShlLG8pLGV9LHguX2dldFNjcnViRmllbGRSZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAocixcImlcIikpO3JldHVybiB0fSx4Ll9nZXRTY3J1YlF1ZXJ5UGFyYW1SZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAoXCIoXCIrcitcIj0pKFteJlxcXFxuXSspXCIsXCJpZ21cIikpO3JldHVybiB0fSx4Ll91cmxJc1doaXRlbGlzdGVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYyxsO3RyeXtpZihyPXRoaXMub3B0aW9ucy5ob3N0V2hpdGVMaXN0LHQ9ZSYmZS5kYXRhJiZlLmRhdGEuYm9keSYmZS5kYXRhLmJvZHkudHJhY2UsIXJ8fDA9PT1yLmxlbmd0aClyZXR1cm4hMDtpZighdClyZXR1cm4hMDtmb3Iocz1yLmxlbmd0aCxpPXQuZnJhbWVzLmxlbmd0aCxjPTA7YzxpO2MrKyl7aWYobj10LmZyYW1lc1tjXSxvPW4uZmlsZW5hbWUsIXYuaXNUeXBlKG8sXCJzdHJpbmdcIikpcmV0dXJuITA7Zm9yKGw9MDtsPHM7bCsrKWlmKGE9cltsXSx1PW5ldyBSZWdFeHAoYSksdS50ZXN0KG8pKXJldHVybiEwfX1jYXRjaChwKXtyZXR1cm4gdGhpcy5jb25maWd1cmUoe2hvc3RXaGl0ZUxpc3Q6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHJlYWRpbmcgeW91ciBjb25maWd1cmF0aW9uJ3MgaG9zdFdoaXRlTGlzdCBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBob3N0V2hpdGVMaXN0LlwiLHApLCEwfXJldHVybiExfSx4Ll9tZXNzYWdlSXNJZ25vcmVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYzt0cnl7aWYoaT0hMSxuPXRoaXMub3B0aW9ucy5pZ25vcmVkTWVzc2FnZXMsIW58fDA9PT1uLmxlbmd0aClyZXR1cm4hMTtpZihzPWUmJmUuZGF0YSYmZS5kYXRhLmJvZHksdT1zJiZzLnRyYWNlJiZzLnRyYWNlLmV4Y2VwdGlvbiYmcy50cmFjZS5leGNlcHRpb24ubWVzc2FnZSxjPXMmJnMubWVzc2FnZSYmcy5tZXNzYWdlLmJvZHkscj11fHxjLCFyKXJldHVybiExO2ZvcihvPW4ubGVuZ3RoLHQ9MDt0PG8mJihhPW5ldyBSZWdFeHAoblt0XSxcImdpXCIpLCEoaT1hLnRlc3QocikpKTt0KyspO31jYXRjaChsKXt0aGlzLmNvbmZpZ3VyZSh7aWdub3JlZE1lc3NhZ2VzOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSByZWFkaW5nIHlvdXIgY29uZmlndXJhdGlvbidzIGlnbm9yZWRNZXNzYWdlcyBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBpZ25vcmVkTWVzc2FnZXMuXCIpfXJldHVybiBpfSx4Ll9lbnF1ZXVlUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuKXt2YXIgbz17Y2FsbGJhY2s6bixhY2Nlc3NUb2tlbjp0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4sZW5kcG9pbnRVcmw6dGhpcy5fcm91dGUoXCJpdGVtL1wiKSxwYXlsb2FkOmV9LGk9ZnVuY3Rpb24oKXtpZihuKXt2YXIgZT1cIlRoaXMgaXRlbSB3YXMgbm90IHNlbnQgdG8gUm9sbGJhciBiZWNhdXNlIGl0IHdhcyBpZ25vcmVkLiBUaGlzIGNhbiBoYXBwZW4gaWYgYSBjdXN0b20gY2hlY2tJZ25vcmUoKSBmdW5jdGlvbiB3YXMgdXNlZCBvciBpZiB0aGUgaXRlbSdzIGxldmVsIHdhcyBsZXNzIHRoYW4gdGhlIG5vdGlmaWVyJyByZXBvcnRMZXZlbC4gU2VlIGh0dHBzOi8vcm9sbGJhci5jb20vZG9jcy9ub3RpZmllci9yb2xsYmFyLmpzL2NvbmZpZ3VyYXRpb24gZm9yIG1vcmUgZGV0YWlscy5cIjtuKG51bGwse2VycjowLHJlc3VsdDp7aWQ6bnVsbCx1dWlkOm51bGwsbWVzc2FnZTplfX0pfX07aWYodGhpcy5faW50ZXJuYWxDaGVja0lnbm9yZShyLHQsZSkpcmV0dXJuIHZvaWQgaSgpO3RyeXtpZih2LmlzVHlwZSh0aGlzLm9wdGlvbnMuY2hlY2tJZ25vcmUsXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmNoZWNrSWdub3JlKHIsdCxlKSlyZXR1cm4gdm9pZCBpKCl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe2NoZWNrSWdub3JlOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSBjYWxsaW5nIGN1c3RvbSBjaGVja0lnbm9yZSgpIGZ1bmN0aW9uLiBSZW1vdmluZyBjdXN0b20gY2hlY2tJZ25vcmUoKS5cIixhKX1pZih0aGlzLl91cmxJc1doaXRlbGlzdGVkKGUpJiYhdGhpcy5fbWVzc2FnZUlzSWdub3JlZChlKSl7aWYodGhpcy5vcHRpb25zLnZlcmJvc2Upe2lmKGUuZGF0YSYmZS5kYXRhLmJvZHkmJmUuZGF0YS5ib2R5LnRyYWNlKXt2YXIgcz1lLmRhdGEuYm9keS50cmFjZSxjPXMuZXhjZXB0aW9uLm1lc3NhZ2U7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogXCIsYyl9Y29uc29sZS5pbmZvKFwiW1JvbGxiYXJdOiBcIixvKX12LmlzVHlwZSh0aGlzLm9wdGlvbnMubG9nRnVuY3Rpb24sXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmxvZ0Z1bmN0aW9uKG8pO3RyeXt2LmlzVHlwZSh0aGlzLm9wdGlvbnMudHJhbnNmb3JtLFwiZnVuY3Rpb25cIikmJnRoaXMub3B0aW9ucy50cmFuc2Zvcm0oZSl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe3RyYW5zZm9ybTpudWxsfSksY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgY2FsbGluZyBjdXN0b20gdHJhbnNmb3JtKCkgZnVuY3Rpb24uIFJlbW92aW5nIGN1c3RvbSB0cmFuc2Zvcm0oKS5cIixhKX10aGlzLm9wdGlvbnMuZW5hYmxlZCYmdShvKX19LHguX2ludGVybmFsQ2hlY2tJZ25vcmU9ZnVuY3Rpb24oZSxyLHQpe3ZhciBuPXJbMF0sbz1zLkxFVkVMU1tuXXx8MCxpPXMuTEVWRUxTW3RoaXMub3B0aW9ucy5yZXBvcnRMZXZlbF18fDA7aWYobzxpKXJldHVybiEwO3ZhciBhPXRoaXMub3B0aW9ucz90aGlzLm9wdGlvbnMucGx1Z2luczp7fTtpZihhJiZhLmpxdWVyeSYmYS5qcXVlcnkuaWdub3JlQWpheEVycm9ycyl0cnl7cmV0dXJuISF0LmRhdGEuYm9keS5tZXNzYWdlLmV4dHJhLmlzQWpheH1jYXRjaCh1KXtyZXR1cm4hMX1yZXR1cm4hMX0seC5fbG9nPWZ1bmN0aW9uKGUscix0LG4sbyxpLGEpe3ZhciBzPW51bGw7aWYodCl0cnl7aWYocz10Ll9zYXZlZFN0YWNrVHJhY2U/dC5fc2F2ZWRTdGFja1RyYWNlOm0ucGFyc2UodCksdD09PXRoaXMubGFzdEVycm9yKXJldHVybjt0aGlzLmxhc3RFcnJvcj10fWNhdGNoKHUpe2NvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHBhcnNpbmcgdGhlIGVycm9yIG9iamVjdC5cIix1KSxyPXQubWVzc2FnZXx8dC5kZXNjcmlwdGlvbnx8cnx8U3RyaW5nKHQpLHQ9bnVsbH12YXIgYz10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsZSxyLHMsbik7YSYmKGMuaWdub3JlUmF0ZUxpbWl0PSEwKSx0aGlzLl9lbnF1ZXVlUGF5bG9hZChjLCEhaSxbZSxyLHQsbl0sbyl9LHgubG9nPWMoKSx4LmRlYnVnPWMoXCJkZWJ1Z1wiKSx4LmluZm89YyhcImluZm9cIikseC53YXJuPWMoXCJ3YXJuaW5nXCIpLHgud2FybmluZz1jKFwid2FybmluZ1wiKSx4LmVycm9yPWMoXCJlcnJvclwiKSx4LmNyaXRpY2FsPWMoXCJjcml0aWNhbFwiKSx4LnVuY2F1Z2h0RXJyb3I9byhmdW5jdGlvbihlLHIsdCxuLG8saSl7aWYoaT1pfHxudWxsLG8mJnYuaXNUeXBlKG8sXCJlcnJvclwiKSlyZXR1cm4gdm9pZCB0aGlzLl9sb2codGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLG8saSxudWxsLCEwKTtpZihyJiZ2LmlzVHlwZShyLFwiZXJyb3JcIikpcmV0dXJuIHZvaWQgdGhpcy5fbG9nKHRoaXMub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsZSxyLGksbnVsbCwhMCk7dmFyIGE9e3VybDpyfHxcIlwiLGxpbmU6dH07YS5mdW5jPW0uZ3Vlc3NGdW5jdGlvbk5hbWUoYS51cmwsYS5saW5lKSxhLmNvbnRleHQ9bS5nYXRoZXJDb250ZXh0KGEudXJsLGEubGluZSk7dmFyIHM9e21vZGU6XCJvbmVycm9yXCIsbWVzc2FnZTpvP1N0cmluZyhvKTplfHxcInVuY2F1Z2h0IGV4Y2VwdGlvblwiLHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOlthXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sdT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHMsaSk7dGhpcy5fZW5xdWV1ZVBheWxvYWQodSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHIsdCxuLG9dKX0pLHgudW5oYW5kbGVkUmVqZWN0aW9uPW8oZnVuY3Rpb24oZSxyKXtpZihudWxsPT1lKXJldHVybiB2b2lkIF8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwidW5oYW5kbGVkIHJlamVjdGlvbiB3YXMgbnVsbCBvciB1bmRlZmluZWQhXCIsbnVsbCx7fSxudWxsLCExLCExKTt2YXIgdD1lLm1lc3NhZ2V8fChlP1N0cmluZyhlKTpcInVuaGFuZGxlZCByZWplY3Rpb25cIiksbj1lLl9yb2xsYmFyQ29udGV4dHx8ci5fcm9sbGJhckNvbnRleHR8fG51bGw7aWYoZSYmdi5pc1R5cGUoZSxcImVycm9yXCIpKXJldHVybiB2b2lkIHRoaXMuX2xvZyh0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsZSxuLG51bGwsITApO3ZhciBvPXt1cmw6XCJcIixsaW5lOjB9O28uZnVuYz1tLmd1ZXNzRnVuY3Rpb25OYW1lKG8udXJsLG8ubGluZSksby5jb250ZXh0PW0uZ2F0aGVyQ29udGV4dChvLnVybCxvLmxpbmUpO3ZhciBpPXttb2RlOlwidW5oYW5kbGVkcmVqZWN0aW9uXCIsbWVzc2FnZTp0LHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOltvXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sYT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LGksbik7dGhpcy5fZW5xdWV1ZVBheWxvYWQoYSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LG8udXJsLG8ubGluZSwwLGUscl0pfSkseC5nbG9iYWw9byhmdW5jdGlvbihlKXtlPWV8fHt9O3ZhciByPXtzdGFydFRpbWU6ZS5zdGFydFRpbWUsbWF4SXRlbXM6ZS5tYXhJdGVtcyxpdGVtc1Blck1pbnV0ZTplLml0ZW1zUGVyTWludXRlfTtnKCEwLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMsciksdm9pZCAwIT09ZS5tYXhJdGVtcyYmKFQ9MCksdm9pZCAwIT09ZS5pdGVtc1Blck1pbnV0ZSYmKFI9MCl9KSx4LmNvbmZpZ3VyZT1vKGZ1bmN0aW9uKGUscil7dmFyIHQ9ZyghMCx7fSxlKTtnKCFyLHRoaXMub3B0aW9ucyx0KSx0aGlzLmdsb2JhbCh0KX0pLHguc2NvcGU9byhmdW5jdGlvbihlKXt2YXIgcj1uZXcgcyh0aGlzKTtyZXR1cm4gZyghMCxyLm9wdGlvbnMucGF5bG9hZCxlKSxyfSkseC53cmFwPWZ1bmN0aW9uKGUscil7dHJ5e3ZhciB0O2lmKHQ9di5pc1R5cGUocixcImZ1bmN0aW9uXCIpP3I6ZnVuY3Rpb24oKXtyZXR1cm4gcnx8e319LCF2LmlzVHlwZShlLFwiZnVuY3Rpb25cIikpcmV0dXJuIGU7aWYoZS5faXNXcmFwKXJldHVybiBlO2lmKCFlLl93cmFwcGVkKXtlLl93cmFwcGVkPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1jYXRjaChyKXt0aHJvd1wic3RyaW5nXCI9PXR5cGVvZiByJiYocj1uZXcgU3RyaW5nKHIpKSxyLnN0YWNrfHwoci5fc2F2ZWRTdGFja1RyYWNlPW0ucGFyc2UocikpLHIuX3JvbGxiYXJDb250ZXh0PXQoKXx8e30sci5fcm9sbGJhckNvbnRleHQuX3dyYXBwZWRTb3VyY2U9ZS50b1N0cmluZygpLHdpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcj1yLHJ9fSxlLl93cmFwcGVkLl9pc1dyYXA9ITA7Zm9yKHZhciBuIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShuKSYmKGUuX3dyYXBwZWRbbl09ZVtuXSl9cmV0dXJuIGUuX3dyYXBwZWR9Y2F0Y2gobyl7cmV0dXJuIGV9fSx4LmxvYWRGdWxsPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogVW5leHBlY3RlZCBSb2xsYmFyLmxvYWRGdWxsKCkgY2FsbGVkIG9uIGEgTm90aWZpZXIgaW5zdGFuY2VcIil9LHMucHJvY2Vzc1BheWxvYWRzPWZ1bmN0aW9uKGUpe3JldHVybiBlP3ZvaWQgZigpOnZvaWQgaSgpfTt2YXIgTD0obmV3IERhdGUpLmdldFRpbWUoKSxUPTAsUj0wO2UuZXhwb3J0cz17Tm90aWZpZXI6cyxzZXR1cEpTT046bix0b3BMZXZlbE5vdGlmaWVyOmF9fSxmdW5jdGlvbihlLHIpe1widXNlIHN0cmljdFwiO3ZhciB0PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLG89ZnVuY3Rpb24oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkuaXNBcnJheT9BcnJheS5pc0FycmF5KGUpOlwiW29iamVjdCBBcnJheV1cIj09PW4uY2FsbChlKX0saT1mdW5jdGlvbihlKXtpZighZXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9PW4uY2FsbChlKSlyZXR1cm4hMTt2YXIgcj10LmNhbGwoZSxcImNvbnN0cnVjdG9yXCIpLG89ZS5jb25zdHJ1Y3RvciYmZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUmJnQuY2FsbChlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxcImlzUHJvdG90eXBlT2ZcIik7aWYoZS5jb25zdHJ1Y3RvciYmIXImJiFvKXJldHVybiExO3ZhciBpO2ZvcihpIGluIGUpO3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBpfHx0LmNhbGwoZSxpKX07ZS5leHBvcnRzPWZ1bmN0aW9uIGEoKXt2YXIgZSxyLHQsbixzLHUsYz1hcmd1bWVudHNbMF0sbD0xLHA9YXJndW1lbnRzLmxlbmd0aCxmPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGM/KGY9YyxjPWFyZ3VtZW50c1sxXXx8e30sbD0yKTooXCJvYmplY3RcIiE9dHlwZW9mIGMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGN8fG51bGw9PWMpJiYoYz17fSk7bDxwOysrbClpZihlPWFyZ3VtZW50c1tsXSxudWxsIT1lKWZvcihyIGluIGUpdD1jW3JdLG49ZVtyXSxjIT09biYmKGYmJm4mJihpKG4pfHwocz1vKG4pKSk/KHM/KHM9ITEsdT10JiZvKHQpP3Q6W10pOnU9dCYmaSh0KT90Ont9LGNbcl09YShmLHUsbikpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiYoY1tyXT1uKSk7cmV0dXJuIGN9fSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe3JldHVybiBsfWZ1bmN0aW9uIG8oKXtyZXR1cm4gbnVsbH1mdW5jdGlvbiBpKGUpe3ZhciByPXt9O3JldHVybiByLl9zdGFja0ZyYW1lPWUsci51cmw9ZS5maWxlTmFtZSxyLmxpbmU9ZS5saW5lTnVtYmVyLHIuZnVuYz1lLmZ1bmN0aW9uTmFtZSxyLmNvbHVtbj1lLmNvbHVtbk51bWJlcixyLmFyZ3M9ZS5hcmdzLHIuY29udGV4dD1vKHIudXJsLHIubGluZSkscn1mdW5jdGlvbiBhKGUpe2Z1bmN0aW9uIHIoKXt2YXIgcj1bXTt0cnl7cj1jLnBhcnNlKGUpfWNhdGNoKHQpe3I9W119Zm9yKHZhciBuPVtdLG89MDtvPHIubGVuZ3RoO28rKyluLnB1c2gobmV3IGkocltvXSkpO3JldHVybiBufXJldHVybntzdGFjazpyKCksbWVzc2FnZTplLm1lc3NhZ2UsbmFtZTplLm5hbWV9fWZ1bmN0aW9uIHMoZSl7cmV0dXJuIG5ldyBhKGUpfWZ1bmN0aW9uIHUoZSl7aWYoIWUpcmV0dXJuW1wiVW5rbm93biBlcnJvci4gVGhlcmUgd2FzIG5vIGVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheS5cIixcIlwiXTt2YXIgcj1lLm1hdGNoKHApLHQ9XCIodW5rbm93bilcIjtyZXR1cm4gciYmKHQ9cltyLmxlbmd0aC0xXSxlPWUucmVwbGFjZSgocltyLmxlbmd0aC0yXXx8XCJcIikrdCtcIjpcIixcIlwiKSxlPWUucmVwbGFjZSgvKF5bXFxzXSt8W1xcc10rJCkvZyxcIlwiKSksW3QsZV19dmFyIGM9dCg2KSxsPVwiP1wiLHA9bmV3IFJlZ0V4cChcIl4oKFthLXpBLVowLTktXyQgXSopOiAqKT8oVW5jYXVnaHQgKT8oW2EtekEtWjAtOS1fJCBdKik6IFwiKTtlLmV4cG9ydHM9e2d1ZXNzRnVuY3Rpb25OYW1lOm4sZ3Vlc3NFcnJvckNsYXNzOnUsZ2F0aGVyQ29udGV4dDpvLHBhcnNlOnMsU3RhY2s6YSxGcmFtZTppfX0sZnVuY3Rpb24oZSxyLHQpe3ZhciBuLG8saTshZnVuY3Rpb24oYSxzKXtcInVzZSBzdHJpY3RcIjtvPVt0KDcpXSxuPXMsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHIsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkucHJvdG90eXBlLm1hcClyZXR1cm4gZS5tYXAocix0KTtmb3IodmFyIG49bmV3IEFycmF5KGUubGVuZ3RoKSxvPTA7bzxlLmxlbmd0aDtvKyspbltvXT1yLmNhbGwodCxlW29dKTtyZXR1cm4gbn1mdW5jdGlvbiB0KGUscix0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5wcm90b3R5cGUuZmlsdGVyKXJldHVybiBlLmZpbHRlcihyLHQpO2Zvcih2YXIgbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspci5jYWxsKHQsZVtvXSkmJm4ucHVzaChlW29dKTtyZXR1cm4gbn12YXIgbj0vKF58QClcXFMrXFw6XFxkKy8sbz0vXlxccyphdCAuKihcXFMrXFw6XFxkK3xcXChuYXRpdmVcXCkpL20saT0vXihldmFsQCk/KFxcW25hdGl2ZSBjb2RlXFxdKT8kLztyZXR1cm57cGFyc2U6ZnVuY3Rpb24oZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuc3RhY2t0cmFjZXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVbXCJvcGVyYSNzb3VyY2Vsb2NcIl0pcmV0dXJuIHRoaXMucGFyc2VPcGVyYShlKTtpZihlLnN0YWNrJiZlLnN0YWNrLm1hdGNoKG8pKXJldHVybiB0aGlzLnBhcnNlVjhPcklFKGUpO2lmKGUuc3RhY2spcmV0dXJuIHRoaXMucGFyc2VGRk9yU2FmYXJpKGUpO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3RcIil9LGV4dHJhY3RMb2NhdGlvbjpmdW5jdGlvbihlKXtpZihlLmluZGV4T2YoXCI6XCIpPT09LTEpcmV0dXJuW2VdO3ZhciByPWUucmVwbGFjZSgvW1xcKFxcKVxcc10vZyxcIlwiKS5zcGxpdChcIjpcIiksdD1yLnBvcCgpLG49cltyLmxlbmd0aC0xXTtpZighaXNOYU4ocGFyc2VGbG9hdChuKSkmJmlzRmluaXRlKG4pKXt2YXIgbz1yLnBvcCgpO3JldHVybltyLmpvaW4oXCI6XCIpLG8sdF19cmV0dXJuW3Iuam9pbihcIjpcIiksdCx2b2lkIDBdfSxwYXJzZVY4T3JJRTpmdW5jdGlvbihuKXt2YXIgaT10KG4uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuISFlLm1hdGNoKG8pfSx0aGlzKTtyZXR1cm4gcihpLGZ1bmN0aW9uKHIpe3IuaW5kZXhPZihcIihldmFsIFwiKT4tMSYmKHI9ci5yZXBsYWNlKC9ldmFsIGNvZGUvZyxcImV2YWxcIikucmVwbGFjZSgvKFxcKGV2YWwgYXQgW15cXCgpXSopfChcXClcXCwuKiQpL2csXCJcIikpO3ZhciB0PXIucmVwbGFjZSgvXlxccysvLFwiXCIpLnJlcGxhY2UoL1xcKGV2YWwgY29kZS9nLFwiKFwiKS5zcGxpdCgvXFxzKy8pLnNsaWNlKDEpLG49dGhpcy5leHRyYWN0TG9jYXRpb24odC5wb3AoKSksbz10LmpvaW4oXCIgXCIpfHx2b2lkIDAsaT1cImV2YWxcIj09PW5bMF0/dm9pZCAwOm5bMF07cmV0dXJuIG5ldyBlKG8sKHZvaWQgMCksaSxuWzFdLG5bMl0scil9LHRoaXMpfSxwYXJzZUZGT3JTYWZhcmk6ZnVuY3Rpb24obil7dmFyIG89dChuLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiFlLm1hdGNoKGkpfSx0aGlzKTtyZXR1cm4gcihvLGZ1bmN0aW9uKHIpe2lmKHIuaW5kZXhPZihcIiA+IGV2YWxcIik+LTEmJihyPXIucmVwbGFjZSgvIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWxcXDpcXGQrXFw6XFxkKy9nLFwiOiQxXCIpKSxyLmluZGV4T2YoXCJAXCIpPT09LTEmJnIuaW5kZXhPZihcIjpcIik9PT0tMSlyZXR1cm4gbmV3IGUocik7dmFyIHQ9ci5zcGxpdChcIkBcIiksbj10aGlzLmV4dHJhY3RMb2NhdGlvbih0LnBvcCgpKSxvPXQuc2hpZnQoKXx8dm9pZCAwO3JldHVybiBuZXcgZShvLCh2b2lkIDApLG5bMF0sblsxXSxuWzJdLHIpfSx0aGlzKX0scGFyc2VPcGVyYTpmdW5jdGlvbihlKXtyZXR1cm4hZS5zdGFja3RyYWNlfHxlLm1lc3NhZ2UuaW5kZXhPZihcIlxcblwiKT4tMSYmZS5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpLmxlbmd0aD5lLnN0YWNrdHJhY2Uuc3BsaXQoXCJcXG5cIikubGVuZ3RoP3RoaXMucGFyc2VPcGVyYTkoZSk6ZS5zdGFjaz90aGlzLnBhcnNlT3BlcmExMShlKTp0aGlzLnBhcnNlT3BlcmExMChlKX0scGFyc2VPcGVyYTk6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspL2ksbj1yLm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIiksbz1bXSxpPTIsYT1uLmxlbmd0aDtpPGE7aSs9Mil7dmFyIHM9dC5leGVjKG5baV0pO3MmJm8ucHVzaChuZXcgZSgodm9pZCAwKSwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTA6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspKD86OiBJbiBmdW5jdGlvbiAoXFxTKykpPyQvaSxuPXIuc3RhY2t0cmFjZS5zcGxpdChcIlxcblwiKSxvPVtdLGk9MCxhPW4ubGVuZ3RoO2k8YTtpKz0yKXt2YXIgcz10LmV4ZWMobltpXSk7cyYmby5wdXNoKG5ldyBlKHNbM118fHZvaWQgMCwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTE6ZnVuY3Rpb24obyl7dmFyIGk9dChvLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiEhZS5tYXRjaChuKSYmIWUubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyl9LHRoaXMpO3JldHVybiByKGksZnVuY3Rpb24ocil7dmFyIHQsbj1yLnNwbGl0KFwiQFwiKSxvPXRoaXMuZXh0cmFjdExvY2F0aW9uKG4ucG9wKCkpLGk9bi5zaGlmdCgpfHxcIlwiLGE9aS5yZXBsYWNlKC88YW5vbnltb3VzIGZ1bmN0aW9uKDogKFxcdyspKT8+LyxcIiQyXCIpLnJlcGxhY2UoL1xcKFteXFwpXSpcXCkvZyxcIlwiKXx8dm9pZCAwO2kubWF0Y2goL1xcKChbXlxcKV0qKVxcKS8pJiYodD1pLnJlcGxhY2UoL15bXlxcKF0rXFwoKFteXFwpXSopXFwpJC8sXCIkMVwiKSk7dmFyIHM9dm9pZCAwPT09dHx8XCJbYXJndW1lbnRzIG5vdCBhdmFpbGFibGVdXCI9PT10P3ZvaWQgMDp0LnNwbGl0KFwiLFwiKTtyZXR1cm4gbmV3IGUoYSxzLG9bMF0sb1sxXSxvWzJdLHIpfSx0aGlzKX19fSl9LGZ1bmN0aW9uKGUscix0KXt2YXIgbixvLGk7IWZ1bmN0aW9uKHQsYSl7XCJ1c2Ugc3RyaWN0XCI7bz1bXSxuPWEsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSl9ZnVuY3Rpb24gcihlLHIsdCxuLG8saSl7dm9pZCAwIT09ZSYmdGhpcy5zZXRGdW5jdGlvbk5hbWUoZSksdm9pZCAwIT09ciYmdGhpcy5zZXRBcmdzKHIpLHZvaWQgMCE9PXQmJnRoaXMuc2V0RmlsZU5hbWUodCksdm9pZCAwIT09biYmdGhpcy5zZXRMaW5lTnVtYmVyKG4pLHZvaWQgMCE9PW8mJnRoaXMuc2V0Q29sdW1uTnVtYmVyKG8pLHZvaWQgMCE9PWkmJnRoaXMuc2V0U291cmNlKGkpfXJldHVybiByLnByb3RvdHlwZT17Z2V0RnVuY3Rpb25OYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnVuY3Rpb25OYW1lfSxzZXRGdW5jdGlvbk5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5mdW5jdGlvbk5hbWU9U3RyaW5nKGUpfSxnZXRBcmdzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXJnc30sc2V0QXJnczpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3MgbXVzdCBiZSBhbiBBcnJheVwiKTt0aGlzLmFyZ3M9ZX0sZ2V0RmlsZU5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWxlTmFtZX0sc2V0RmlsZU5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5maWxlTmFtZT1TdHJpbmcoZSl9LGdldExpbmVOdW1iZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5saW5lTnVtYmVyfSxzZXRMaW5lTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyXCIpO3RoaXMubGluZU51bWJlcj1OdW1iZXIocil9LGdldENvbHVtbk51bWJlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbHVtbk51bWJlcn0sc2V0Q29sdW1uTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDb2x1bW4gTnVtYmVyIG11c3QgYmUgYSBOdW1iZXJcIik7dGhpcy5jb2x1bW5OdW1iZXI9TnVtYmVyKHIpfSxnZXRTb3VyY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb3VyY2V9LHNldFNvdXJjZTpmdW5jdGlvbihlKXt0aGlzLnNvdXJjZT1TdHJpbmcoZSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5nZXRGdW5jdGlvbk5hbWUoKXx8XCJ7YW5vbnltb3VzfVwiLHQ9XCIoXCIrKHRoaXMuZ2V0QXJncygpfHxbXSkuam9pbihcIixcIikrXCIpXCIsbj10aGlzLmdldEZpbGVOYW1lKCk/XCJAXCIrdGhpcy5nZXRGaWxlTmFtZSgpOlwiXCIsbz1lKHRoaXMuZ2V0TGluZU51bWJlcigpKT9cIjpcIit0aGlzLmdldExpbmVOdW1iZXIoKTpcIlwiLGk9ZSh0aGlzLmdldENvbHVtbk51bWJlcigpKT9cIjpcIit0aGlzLmdldENvbHVtbk51bWJlcigpOlwiXCI7cmV0dXJuIHIrdCtuK28raX19LHJ9KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7cmV0dXJue30udG9TdHJpbmcuY2FsbChlKS5tYXRjaCgvXFxzKFthLXpBLVpdKykvKVsxXS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gbihlKT09PXJ9ZnVuY3Rpb24gaShlKXtpZighbyhlLFwic3RyaW5nXCIpKXRocm93IG5ldyBFcnJvcihcInJlY2VpdmVkIGludmFsaWQgaW5wdXRcIik7Zm9yKHZhciByPWwsdD1yLnBhcnNlcltyLnN0cmljdE1vZGU/XCJzdHJpY3RcIjpcImxvb3NlXCJdLmV4ZWMoZSksbj17fSxpPTE0O2ktLTspbltyLmtleVtpXV09dFtpXXx8XCJcIjtyZXR1cm4gbltyLnEubmFtZV09e30sbltyLmtleVsxMl1dLnJlcGxhY2Uoci5xLnBhcnNlcixmdW5jdGlvbihlLHQsbyl7dCYmKG5bci5xLm5hbWVdW3RdPW8pfSksbn1mdW5jdGlvbiBhKGUpe3ZhciByPWkoZSk7cmV0dXJuXCJcIj09PXIuYW5jaG9yJiYoci5zb3VyY2U9ci5zb3VyY2UucmVwbGFjZShcIiNcIixcIlwiKSksZT1yLnNvdXJjZS5yZXBsYWNlKFwiP1wiK3IucXVlcnksXCJcIil9ZnVuY3Rpb24gcyhlLHIpe3ZhciB0LG4saSxhPW8oZSxcIm9iamVjdFwiKSx1PW8oZSxcImFycmF5XCIpLGM9W107aWYoYSlmb3IodCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJmMucHVzaCh0KTtlbHNlIGlmKHUpZm9yKGk9MDtpPGUubGVuZ3RoOysraSljLnB1c2goaSk7Zm9yKGk9MDtpPGMubGVuZ3RoOysraSl0PWNbaV0sbj1lW3RdLGE9byhuLFwib2JqZWN0XCIpLHU9byhuLFwiYXJyYXlcIiksYXx8dT9lW3RdPXMobixyKTplW3RdPXIodCxuKTtyZXR1cm4gZX1mdW5jdGlvbiB1KGUpe3JldHVybiBlPVN0cmluZyhlKSxuZXcgQXJyYXkoZS5sZW5ndGgrMSkuam9pbihcIipcIil9ZnVuY3Rpb24gYygpe3ZhciBlPShuZXcgRGF0ZSkuZ2V0VGltZSgpLHI9XCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2csZnVuY3Rpb24ocil7dmFyIHQ9KGUrMTYqTWF0aC5yYW5kb20oKSklMTZ8MDtyZXR1cm4gZT1NYXRoLmZsb29yKGUvMTYpLChcInhcIj09PXI/dDo3JnR8OCkudG9TdHJpbmcoMTYpfSk7cmV0dXJuIHJ9dCg5KTt2YXIgbD17c3RyaWN0TW9kZTohMSxrZXk6W1wic291cmNlXCIsXCJwcm90b2NvbFwiLFwiYXV0aG9yaXR5XCIsXCJ1c2VySW5mb1wiLFwidXNlclwiLFwicGFzc3dvcmRcIixcImhvc3RcIixcInBvcnRcIixcInJlbGF0aXZlXCIsXCJwYXRoXCIsXCJkaXJlY3RvcnlcIixcImZpbGVcIixcInF1ZXJ5XCIsXCJhbmNob3JcIl0scTp7bmFtZTpcInF1ZXJ5S2V5XCIscGFyc2VyOi8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZ30scGFyc2VyOntzdHJpY3Q6L14oPzooW146XFwvPyNdKyk6KT8oPzpcXC9cXC8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykpPygoKCg/OltePyNcXC9dKlxcLykqKShbXj8jXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLyxsb29zZTovXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS99fSxwPXtpc1R5cGU6byxwYXJzZVVyaTppLHBhcnNlVXJpT3B0aW9uczpsLHJlZGFjdDp1LHNhbml0aXplVXJsOmEsdHJhdmVyc2U6cyx0eXBlTmFtZTpuLHV1aWQ0OmN9O2UuZXhwb3J0cz1wfSxmdW5jdGlvbihlLHIpeyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtlLmNvbnNvbGU9ZS5jb25zb2xlfHx7fTtmb3IodmFyIHIsdCxuPWUuY29uc29sZSxvPXt9LGk9ZnVuY3Rpb24oKXt9LGE9XCJtZW1vcnlcIi5zcGxpdChcIixcIikscz1cImFzc2VydCxjbGVhcixjb3VudCxkZWJ1ZyxkaXIsZGlyeG1sLGVycm9yLGV4Y2VwdGlvbixncm91cCxncm91cENvbGxhcHNlZCxncm91cEVuZCxpbmZvLGxvZyxtYXJrVGltZWxpbmUscHJvZmlsZSxwcm9maWxlcyxwcm9maWxlRW5kLHNob3csdGFibGUsdGltZSx0aW1lRW5kLHRpbWVsaW5lLHRpbWVsaW5lRW5kLHRpbWVTdGFtcCx0cmFjZSx3YXJuXCIuc3BsaXQoXCIsXCIpO3I9YS5wb3AoKTspbltyXXx8KG5bcl09byk7Zm9yKDt0PXMucG9wKCk7KW5bdF18fChuW3RdPWkpfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3RoaXM6d2luZG93KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7YT1lfWZ1bmN0aW9uIG8oZSl7dGhpcy5uYW1lPVwiQ29ubmVjdGlvbiBFcnJvclwiLHRoaXMubWVzc2FnZT1lLHRoaXMuc3RhY2s9KG5ldyBFcnJvcikuc3RhY2t9dmFyIGk9dCg4KSxhPW51bGw7by5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPW87dmFyIHM9e1hNTEh0dHBGYWN0b3JpZXM6W2Z1bmN0aW9uKCl7cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdH0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDIuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDMuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKX1dLGNyZWF0ZVhNTEhUVFBPYmplY3Q6ZnVuY3Rpb24oKXt2YXIgZSxyPSExLHQ9cy5YTUxIdHRwRmFjdG9yaWVzLG49dC5sZW5ndGg7Zm9yKGU9MDtlPG47ZSsrKXRyeXtyPXRbZV0oKTticmVha31jYXRjaChvKXt9cmV0dXJuIHJ9LHBvc3Q6ZnVuY3Rpb24oZSxyLHQsbil7aWYoIWkuaXNUeXBlKHQsXCJvYmplY3RcIikpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYW4gb2JqZWN0IHRvIFBPU1RcIik7dD1hLnN0cmluZ2lmeSh0KSxuPW58fGZ1bmN0aW9uKCl7fTt2YXIgdT1zLmNyZWF0ZVhNTEhUVFBPYmplY3QoKTtpZih1KXRyeXt0cnl7dmFyIGM9ZnVuY3Rpb24oKXt0cnl7aWYoYyYmND09PXUucmVhZHlTdGF0ZSl7Yz12b2lkIDA7dmFyIGU9YS5wYXJzZSh1LnJlc3BvbnNlVGV4dCk7MjAwPT09dS5zdGF0dXM/bihudWxsLGUpOmkuaXNUeXBlKHUuc3RhdHVzLFwibnVtYmVyXCIpJiZ1LnN0YXR1cz49NDAwJiZ1LnN0YXR1czw2MDA/KDQwMz09dS5zdGF0dXMmJmNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06XCIrZS5tZXNzYWdlKSxuKG5ldyBFcnJvcihTdHJpbmcodS5zdGF0dXMpKSkpOm4obmV3IG8oXCJYSFIgcmVzcG9uc2UgaGFkIG5vIHN0YXR1cyBjb2RlIChsaWtlbHkgY29ubmVjdGlvbiBmYWlsdXJlKVwiKSl9fWNhdGNoKHIpe3ZhciB0O3Q9ciYmci5zdGFjaz9yOm5ldyBFcnJvcihyKSxuKHQpfX07dS5vcGVuKFwiUE9TVFwiLGUsITApLHUuc2V0UmVxdWVzdEhlYWRlciYmKHUuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvblwiKSx1LnNldFJlcXVlc3RIZWFkZXIoXCJYLVJvbGxiYXItQWNjZXNzLVRva2VuXCIscikpLHUub25yZWFkeXN0YXRlY2hhbmdlPWMsdS5zZW5kKHQpfWNhdGNoKGwpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBYRG9tYWluUmVxdWVzdCl7XCJodHRwOlwiPT09d2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKDAsNSkmJlwiaHR0cHNcIj09PWUuc3Vic3RyaW5nKDAsNSkmJihlPVwiaHR0cFwiK2Uuc3Vic3RyaW5nKDUpKTt2YXIgcD1mdW5jdGlvbigpe24obmV3IG8oXCJSZXF1ZXN0IHRpbWVkIG91dFwiKSl9LGY9ZnVuY3Rpb24oKXtuKG5ldyBFcnJvcihcIkVycm9yIGR1cmluZyByZXF1ZXN0XCIpKX0sZD1mdW5jdGlvbigpe24obnVsbCxhLnBhcnNlKHUucmVzcG9uc2VUZXh0KSl9O3U9bmV3IFhEb21haW5SZXF1ZXN0LHUub25wcm9ncmVzcz1mdW5jdGlvbigpe30sdS5vbnRpbWVvdXQ9cCx1Lm9uZXJyb3I9Zix1Lm9ubG9hZD1kLHUub3BlbihcIlBPU1RcIixlLCEwKSx1LnNlbmQodCl9fX1jYXRjaChoKXtuKGgpfX19O2UuZXhwb3J0cz17WEhSOnMsc2V0dXBKU09OOm4sQ29ubmVjdGlvbkVycm9yOm99fV0pfSk7IiwidmFyIFZpc2lvblNpbXVsYXRpb24gPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvblwiKTtcbnZhciB3b3JsZGRhdGEgPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvd29ybGRkYXRhLmpzb25cIik7XG52YXIgZ2V0TGlnaHRVbmlvbiA9IHJlcXVpcmUoXCIuL2dldExpZ2h0VW5pb25cIik7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4vdXRpbC90cmltJyk7XG52YXIgUXVlcnlTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWwvcXVlcnlTdHJpbmcnKTtcbnZhciBSb2xsYmFyID0gcmVxdWlyZShcInJvbGxiYXItYnJvd3NlclwiKTtcblxudmFyIHJvbGxiYXJDb25maWcgPSB7XG4gICAgYWNjZXNzVG9rZW46ICdmZTdjZjMyN2YyYjI0YmI4OTkxZTI1MjIzOWY2MjAwZicsXG4gICAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdwcm9kdWN0aW9uJyxcbiAgICAgICAgY2xpZW50OiB7XG4gICAgICAgICAgICBqYXZhc2NyaXB0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlX21hcF9lbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvZGVfdmVyc2lvbjogXCI5YWNmZDMyZDA2MzlhOWJhZmE0ZGMzZTI3MTFkZmJjNGE4NjE0NGI1XCIsXG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBoYXZlIFJvbGxiYXIgZ3Vlc3Mgd2hpY2ggZnJhbWVzIHRoZSBlcnJvciB3YXMgdGhyb3duIGZyb21cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBicm93c2VyIGRvZXMgbm90IHByb3ZpZGUgbGluZSBhbmQgY29sdW1uIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgZ3Vlc3NfdW5jYXVnaHRfZnJhbWVzOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgcm9sbGJhciA9IFJvbGxiYXIuaW5pdChyb2xsYmFyQ29uZmlnKTtcbiAgICBcbmZ1bmN0aW9uIEFwcChtYXBfdGlsZV9wYXRoLCB2aXNpb25fZGF0YV9pbWFnZV9wYXRoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBJTUdfRElSID0gXCJpbWcvXCIsXG4gICAgICAgIEVOVElUSUVTID0ge1xuICAgICAgICAgICAgb2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICBpY29uX3BhdGg6IElNR19ESVIgKyBcIndhcmRfb2JzZXJ2ZXIucG5nXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAxNjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VudHJ5OiB7XG4gICAgICAgICAgICAgICAgaWNvbl9wYXRoOiBJTUdfRElSICsgXCJ3YXJkX3NlbnRyeS5wbmdcIixcbiAgICAgICAgICAgICAgICByYWRpdXM6IDg1MFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBUT1dFUl9EQVlfVklTSU9OX1JBRElVUyA9IDE5MDAsXG4gICAgICAgIFRPV0VSX05JR0hUX1ZJU0lPTl9SQURJVVMgPSA4MDAsXG4gICAgICAgIFRPV0VSX1RSVUVfU0lHSFRfUkFESVVTID0gNzAwLFxuICAgICAgICBUT1dFUl9BVFRBQ0tfUkFOR0VfUkFESVVTID0gNzAwLFxuICAgICAgICBtYXBfZGF0YV9wYXRoID0gXCJkYXRhL1wiLFxuICAgICAgICBtYXBfZGF0YSxcbiAgICAgICAgbWFwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9tYXBDb25zdGFudHMnKSxcbiAgICAgICAgY29udmVyc2lvbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbkZ1bmN0aW9ucycpLFxuICAgICAgICB6b29taWZ5ID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuWm9vbWlmeSggXCJab29taWZ5XCIsIG1hcF90aWxlX3BhdGgsIG5ldyBPcGVuTGF5ZXJzLlNpemUoIG1hcENvbnN0YW50cy5tYXBfdywgbWFwQ29uc3RhbnRzLm1hcF9oICkgKSxcbiAgICAgICAgbWFwID0gbmV3IE9wZW5MYXllcnMuTWFwKFwibWFwXCIsIHtcbiAgICAgICAgICAgIHRoZW1lOiBudWxsLFxuICAgICAgICAgICAgbWF4RXh0ZW50OiBuZXcgT3BlbkxheWVycy5Cb3VuZHMoMCwgMCwgbWFwQ29uc3RhbnRzLm1hcF93LCBtYXBDb25zdGFudHMubWFwX2gpLFxuICAgICAgICAgICAgbnVtWm9vbUxldmVsczogNSxcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IE1hdGgucG93KDIsIDUtMSApLFxuICAgICAgICAgICAgdW5pdHM6IFwibVwiXG4gICAgICAgIH0pLFxuICAgICAgICBsYXllcktleXMgPSBbXG4gICAgICAgICAgICBcIm5vX3dhcmRzXCIsXG4gICAgICAgICAgICBcImVudF9mb3dfYmxvY2tlcl9ub2RlXCIsXG4gICAgICAgICAgICBcInRyaWdnZXJfbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfcm9zaGFuX3NwYXduZXJcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyXCIsXG4gICAgICAgICAgICBcImRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5XCIsXG4gICAgICAgICAgICBcImVudF9kb3RhX3Nob3BcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYmFycmFja3NcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYnVpbGRpbmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfaGVhbGVyXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX2ZvcnRcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfdG93ZXJcIlxuICAgICAgICBdLFxuICAgICAgICBsYXllck5hbWVzID0ge1xuICAgICAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyOiBcIlJ1bmVzXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX2JvdW50eTogXCJCb3VudHkgUnVuZXNcIixcbiAgICAgICAgICAgIGVudF9kb3RhX3RyZWU6IFwiVHJlZXNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2hlYWxlcjogXCJTaHJpbmVzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9mb3J0OiBcIkFuY2llbnRzXCIsXG4gICAgICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BzXCIsXG4gICAgICAgICAgICBucGNfZG90YV90b3dlcjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2JhcnJhY2tzOiBcIkJhcnJhY2tzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9idWlsZGluZzogXCJCdWlsZGluZ3NcIixcbiAgICAgICAgICAgIHRyaWdnZXJfbXVsdGlwbGU6IFwiTmV1dHJhbCBDYW1wcyBTcGF3biBCb3hlc1wiLFxuICAgICAgICAgICAgbnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyOiBcIk5ldXRyYWwgQ2FtcHNcIixcbiAgICAgICAgICAgIG5vX3dhcmRzOiBcIkludmFsaWQgV2FyZCBMb2NhdGlvbnNcIixcbiAgICAgICAgICAgIGVudF9mb3dfYmxvY2tlcl9ub2RlOiBcIlZpc2lvbiBCbG9ja2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgYmFzZUxheWVycyA9IFtcbiAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkxheWVyLlRNUygnNy4wMCBEZWZhdWx0JywgbWFwX3RpbGVfcGF0aCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwianBnXCIsXG4gICAgICAgICAgICAgICAgZ2V0VVJMOiBnZXRNeVVSTCgnNzAwJywgJ2RlZmF1bHQnKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgT3BlbkxheWVycy5MYXllci5UTVMoJzYuODcgRGVmYXVsdCcsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdkZWZhdWx0JylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuTGF5ZXIuVE1TKCc2Ljg3IERlc2VydCcsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdkZXNlcnQnKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgT3BlbkxheWVycy5MYXllci5UTVMoJzYuODcgSW1tb3J0YWwgR2FyZGVucycsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdpbW1vcnRhbGdhcmRlbnMnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgb3ZlcmxheUdyb3VwaW5nID0ge1xuICAgICAgICAgICAgXCJEYXkgVmlzaW9uIFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIk5pZ2h0IFZpc2lvbiBSYW5nZVwiOiBcIlRvd2Vyc1wiLFxuICAgICAgICAgICAgXCJUcnVlIFNpZ2h0IFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIkF0dGFjayBSYW5nZVwiOiBcIlRvd2Vyc1wiLFxuICAgICAgICAgICAgXCJUb3dlcnNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIlNocmluZXNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkFuY2llbnRzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJCYXJyYWNrc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiQnVpbGRpbmdzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJTaG9wc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiSW52YWxpZCBXYXJkIExvY2F0aW9uc1wiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJWaXNpb24gQmxvY2tlclwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJQbGFjZWQgV2FyZHNcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiV2FyZCBWaXNpb25cIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiV2FyZCBWaXNpb24gd2l0aCBGb2dcIjogXCJWaXNpb25cIlxuICAgICAgICB9LFxuICAgICAgICBsYXllclN3aXRjaGVyID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5MYXllclN3aXRjaGVyKHtcbiAgICAgICAgICAgIGFzY2VuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBvdmVybGF5R3JvdXBpbmc6IG92ZXJsYXlHcm91cGluZyxcbiAgICAgICAgICAgIG9uTWF4aW1pemVXaGVuU21hbGxTY3JlZW46IG1pbmltaXplQ29udHJvbExpc3QuYmluZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKSlcbiAgICAgICAgfSksXG4gICAgICAgIGNvb3JkaW5hdGVDb250cm9sID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5Nb3VzZVBvc2l0aW9uKCksXG4gICAgICAgIGN1cnNvckxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQ3Vyc29yXCIsIHtkaXNwbGF5SW5MYXllclN3aXRjaGVyOmZhbHNlfSksXG4gICAgICAgIGRheVJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEYXkgVmlzaW9uIFJhbmdlXCIpLFxuICAgICAgICBuaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJOaWdodCBWaXNpb24gUmFuZ2VcIiksXG4gICAgICAgIHRydWVTaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJUcnVlIFNpZ2h0IFJhbmdlXCIpLFxuICAgICAgICBhdHRhY2tSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQXR0YWNrIFJhbmdlXCIpLFxuICAgICAgICBwb2x5Z29uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEcmF3biBDaXJjbGVzXCIpLFxuICAgICAgICB3YXJkVmlzaW9uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJXYXJkIFZpc2lvblwiKSxcbiAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiV2FyZCBWaXNpb24gd2l0aCBGb2dcIiksXG4gICAgICAgIGljb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLk1hcmtlcnMoXCJQbGFjZWQgV2FyZHNcIiksXG4gICAgICAgIHJlbmRlcmVyID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLnJlbmRlcmVyLFxuICAgICAgICBkcmF3Q29udHJvbHMsXG4gICAgICAgIGxhc3REaXN0YW5jZSxcbiAgICAgICAgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlQ29uc3RhbnRzJyksXG4gICAgICAgIHRyZWVNYXJrZXJzID0ge30sXG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gdHJ1ZSxcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT05fQUxXQVlTID0gdHJ1ZSxcbiAgICAgICAgY3V0VHJlZXMgPSB7fTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENPT1JESU5BVEUgQ09OVkVSU0lPTiBGVU5DVElPTlMgKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHZhciBsZXJwID0gbGVycCxcbiAgICAgICAgcmV2ZXJzZUxlcnAgPSBjb252ZXJzaW9uRnVuY3Rpb25zLnJldmVyc2VMZXJwLFxuICAgICAgICBsYXRMb25Ub1dvcmxkID0gY29udmVyc2lvbkZ1bmN0aW9ucy5sYXRMb25Ub1dvcmxkLFxuICAgICAgICB3b3JsZFRvTGF0TG9uID0gY29udmVyc2lvbkZ1bmN0aW9ucy53b3JsZFRvTGF0TG9uLFxuICAgICAgICBnZXRUaWxlUmFkaXVzID0gY29udmVyc2lvbkZ1bmN0aW9ucy5nZXRUaWxlUmFkaXVzLFxuICAgICAgICBnZXRTY2FsZWRSYWRpdXMgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmdldFNjYWxlZFJhZGl1cyxcbiAgICAgICAgY2FsY3VsYXRlRGlzdGFuY2UgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmNhbGN1bGF0ZURpc3RhbmNlO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqXG4gICAgICogQ09OVFJPTCBIQU5ETEVSUyAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVHJlZU1hcmtlckNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVUcmVlTWFya2VyQ2xpY2snLCBldmVudC5vYmplY3QpO1xuICAgICAgICBzZXRUcmVlTWFya2VyU3RhdGUoZXZlbnQub2JqZWN0LCAhZXZlbnQub2JqZWN0LnRyZWVWaXNpYmxlKTtcbiAgICAgICAgc2V0VHJlZVF1ZXJ5U3RyaW5nKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldFRyZWVNYXJrZXJTdGF0ZShtYXJrZXIsIHN0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRUcmVlTWFya2VyU3RhdGUnLCBtYXJrZXIpO1xuICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobWFya2VyLmxvbmxhdC5sb24sIG1hcmtlci5sb25sYXQubGF0KTtcblxuICAgICAgICBtYXJrZXIudHJlZVZpc2libGUgPSBzdGF0ZTtcbiAgICAgICAgbWFya2VyLnNldE9wYWNpdHkoc3RhdGUgPyAxIDogLjQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OKSB7XG4gICAgICAgICAgICB2YXIgZ3JpZFhZID0gdnMuV29ybGRYWXRvR3JpZFhZKHdvcmxkWFkueCwgd29ybGRYWS55KTtcbiAgICAgICAgICAgIHZzLnRvZ2dsZVRyZWUoZ3JpZFhZLngsIGdyaWRYWS55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3B1cENvbnRlbnRIVE1MID0gXCJDbGljayB0byBjdXQgZG93biB0cmVlLjxicj5UaGlzIHdpbGwgYWZmZWN0IHRoZSB3YXJkIHZpc2lvbiBzaW11bGF0aW9uLlwiO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjdXRUcmVlc1ttYXJrZXIudHJlZV9sb2NdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MID0gXCJDbGljayB0byByZWdyb3cgdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIjtcbiAgICAgICAgICAgIGN1dFRyZWVzW21hcmtlci50cmVlX2xvY10gPSBtYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG1hcmtlci5mZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGlmIChtYXJrZXIuZmVhdHVyZS5wb3B1cCkge1xuICAgICAgICAgICAgbWFya2VyLmZlYXR1cmUucG9wdXAuc2V0Q29udGVudEhUTUwocG9wdXBDb250ZW50SFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3dlck1hcmtlckNsaWNrKGUsIHNraXBRdWVyeVN0cmluZ1VwZGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlVG93ZXJNYXJrZXJDbGljaycpO1xuICAgICAgICB2YXIgY2lyY2xlLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIGNlbnRlcjtcblxuICAgICAgICBpZiAoIWUub2JqZWN0LnNob3dJbmZvKSB7XG4gICAgICAgICAgICBjZW50ZXIgPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChlLm9iamVjdC5sb25sYXQubG9uLCBlLm9iamVjdC5sb25sYXQubGF0KTtcblxuICAgICAgICAgICAgLy8gZGF5IHZpc2lvbiBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5kYXlfdmlzaW9uX3JhZGl1cyksIDMwKTtcbiAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgZGF5UmFuZ2VMYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGUub2JqZWN0LmRheV92aXNpb25fZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIHRydWUgc2lnaHQgY2lyY2xlXG4gICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24oY2VudGVyLCBnZXRTY2FsZWRSYWRpdXMoZS5vYmplY3QudHJ1ZV9zaWdodF9yYWRpdXMpLCAzMCk7XG4gICAgICAgICAgICBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlLCBudWxsLCBzdHlsZS5saWdodGJsdWUpO1xuICAgICAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGUub2JqZWN0LnRydWVfc2lnaHRfZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIG5pZ2h0IHZpc2lvbiBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5uaWdodF92aXNpb25fcmFkaXVzKSwgMzApO1xuICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSk7XG4gICAgICAgICAgICBuaWdodFJhbmdlTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICBlLm9iamVjdC5uaWdodF92aXNpb25fZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIGF0dGFjayByYW5nZSBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5hdHRhY2tfcmFuZ2VfcmFkaXVzKSwgMzApO1xuICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSwgbnVsbCwgc3R5bGUucmVkKTtcbiAgICAgICAgICAgIGF0dGFja1JhbmdlTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICBlLm9iamVjdC5hdHRhY2tfcmFuZ2VfZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5hZGRRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIGUub2JqZWN0LnRvd2VyX2xvYy54ICsgJywnICsgZS5vYmplY3QudG93ZXJfbG9jLnkpO1xuXG4gICAgICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGUub2JqZWN0LmxvbmxhdCwgZS5vYmplY3QsIFRPV0VSX0RBWV9WSVNJT05fUkFESVVTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRheVJhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZS5vYmplY3QuZGF5X3Zpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIG5pZ2h0UmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhlLm9iamVjdC5uaWdodF92aXNpb25fZmVhdHVyZSk7XG4gICAgICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LnRydWVfc2lnaHRfZmVhdHVyZSk7XG4gICAgICAgICAgICBhdHRhY2tSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LmF0dGFja19yYW5nZV9mZWF0dXJlKTtcblxuICAgICAgICAgICAgaWYgKGUub2JqZWN0LnZpc2lvbl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZS5vYmplY3QudmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICAgICAgaWYgKGUub2JqZWN0LnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LnZpc2lvbl9jZW50ZXJfZmVhdHVyZSk7XG4gICAgICBcbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIGUub2JqZWN0LnRvd2VyX2xvYy54ICsgJywnICsgZS5vYmplY3QudG93ZXJfbG9jLnkpO1xuICAgICAgICB9XG4gICAgICAgIGUub2JqZWN0LnNob3dJbmZvID0gIWUub2JqZWN0LnNob3dJbmZvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdhcmRDbGljayhlbnRpdHlOYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUpO1xuICAgICAgICAgICAgUXVlcnlTdHJpbmcuYWRkUXVlcnlTdHJpbmdWYWx1ZShtYXJrZXIud2FyZF90eXBlLCBtYXJrZXIud2FyZF9sb2MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VXYXJkKGxhdGxvbiwgZW50aXR5TmFtZSwgcXNfdmFsdWVfd29ybGRYWSkge1xuICAgICAgICB2YXIgZW50aXR5ID0gRU5USVRJRVNbZW50aXR5TmFtZV0sXG4gICAgICAgICAgICBtYXJrZXIgPSBjcmVhdGVXYXJkTWFya2VyKGVudGl0eS5pY29uX3BhdGgsIGxhdGxvbiksXG4gICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24obmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobWFya2VyLmxvbmxhdC5sb24sIG1hcmtlci5sb25sYXQubGF0KSwgZ2V0U2NhbGVkUmFkaXVzKGVudGl0eS5yYWRpdXMpLCA0MCksXG4gICAgICAgICAgICBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlKTtcbiAgICAgICAgaWNvbkxheWVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICB3YXJkVmlzaW9uTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgIG1hcmtlci5yYWRpdXNfZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCB0aGlzLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcInRvdWNoZW5kXCIsIHRoaXMsIHdhcmRNYXJrZXJSZW1vdmUpO1xuICAgICAgICBtYXJrZXIud2FyZF90eXBlID0gZW50aXR5TmFtZTtcbiAgICAgICAgbWFya2VyLndhcmRfbG9jID0gZW50aXR5TmFtZTtcblxuICAgICAgICBpZiAocXNfdmFsdWVfd29ybGRYWSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgICAgIHdvcmxkWFkueCA9IHdvcmxkWFkueC50b0ZpeGVkKDApO1xuICAgICAgICAgICAgd29ybGRYWS55ID0gd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICBtYXJrZXIud2FyZF9sb2MgPSB3b3JsZFhZLnggKyAnLCcgKyB3b3JsZFhZLnlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlci53YXJkX2xvYyA9IHFzX3ZhbHVlX3dvcmxkWFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04gJiYgZW50aXR5TmFtZSA9PSAnb2JzZXJ2ZXInKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihsYXRsb24sIG1hcmtlciwgRU5USVRJRVMub2JzZXJ2ZXIucmFkaXVzKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FyZE1hcmtlclJlbW92ZShldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LnJhZGl1c19mZWF0dXJlKSB3YXJkVmlzaW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZXZlbnQub2JqZWN0LnJhZGl1c19mZWF0dXJlKTtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC52aXNpb25fZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGV2ZW50Lm9iamVjdC52aXNpb25fZmVhdHVyZSk7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZXZlbnQub2JqZWN0LnZpc2lvbl9jZW50ZXJfZmVhdHVyZSk7XG4gICAgICAgIGljb25MYXllci5yZW1vdmVNYXJrZXIoZXZlbnQub2JqZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQub2JqZWN0KTtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcblxuICAgICAgICBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKGV2ZW50Lm9iamVjdC53YXJkX3R5cGUsIGV2ZW50Lm9iamVjdC53YXJkX2xvYyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlT25DbGljayhldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlT25DbGljaycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lYXN1cmVtZW50cyhldmVudCkge1xuICAgICAgICB2YXIgb3V0ID0gXCJcIjtcbiAgICAgICAgaWYgKGV2ZW50Lm9yZGVyID09IDEpIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0czxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5pbm5lckhUTUwgPSBvdXQ7XG5cbiAgICAgICAgbGFzdERpc3RhbmNlID0gY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lXCIpLmlubmVySFRNTCA9IChsYXN0RGlzdGFuY2UgLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS52YWx1ZSkudG9GaXhlZCgyKTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWUtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHMoZXZlbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKSxcbiAgICAgICAgICAgIG91dCA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yZGVyID09IDEpIHtcbiAgICAgICAgICAgIG91dCArPSBcIlJhZGl1czogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHM8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzUGFydGlhbChldmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgb3V0ID0gXCJcIixcbiAgICAgICAgICAgIGNpcmNsZSxcbiAgICAgICAgICAgIGZlYXR1cmUsXG4gICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uZGVhY3RpdmF0ZSgpO1xuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm1lYXN1cmUgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVuaXRzID09IFwia21cIikge1xuICAgICAgICAgICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24obmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS54LCBldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLnkpLCBldmVudC5tZWFzdXJlICogMWUzLCAzMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlID0gT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueCwgZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS55KSwgZXZlbnQubWVhc3VyZSwgMzApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlKTtcbiAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoXCJjaXJjbGVfZmVhdHVyZXNcIiBpbiBldmVudC5nZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzID0gW2ZlYXR1cmVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmZWF0dXJlLm1lYXN1cmVfY29udHJvbCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5pc19tZWFzdXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBvbHlnb25MYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQgKz0gXCJSYWRpdXM6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzPHN1cD4yPC9cIiArIFwic3VwPlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNvbnRyb2woKSB7XG4gICAgICAgIHZhciBjb250cm9sO1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnbW9kZScsIG51bGwpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZHJhd0NvbnRyb2xzKSB7XG4gICAgICAgICAgICBjb250cm9sID0gZHJhd0NvbnRyb2xzW2tleV07XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLCB0aGlzLnZhbHVlLCBrZXksIHRoaXMudmFsdWUgPT0ga2V5ICYmIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSBrZXkgJiYgdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ21vZGUnLCBrZXkpO1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHRoaXMudmFsdWUgPT0gXCJwb2x5Z29uQ29udHJvbFwiIHx8IHRoaXMudmFsdWUgPT0gXCJjaXJjbGVcIikgJiYgdGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWUtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG93ZXJIb3ZlclBvcHVwKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwID09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY2xvc2VCb3gpO1xuICAgICAgICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY3JlYXRlUG9wdXAodGhpcy5jbG9zZUJveCk7XG4gICAgICAgICAgICBtYXAuYWRkUG9wdXAodGhpcy5wb3B1cCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVHJlZUhvdmVyUG9wdXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY3JlYXRlUG9wdXAodGhpcy5jbG9zZUJveCk7XG4gICAgICAgICAgICBtYXAuYWRkUG9wdXAodGhpcy5wb3B1cCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcbiAgICB9O1xuICAgICAgICBcbiAgICBmdW5jdGlvbiBhZGRNYXJrZXIobWFya2VycywgbGwsIHBvcHVwQ2xhc3MsIHBvcHVwQ29udGVudEhUTUwsIGNsb3NlQm94LCBvdmVyZmxvdykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUobWFya2VycywgbGwpLFxuICAgICAgICAgICAgbWFya2VyO1xuXG4gICAgICAgIGZlYXR1cmUuY2xvc2VCb3ggPSBjbG9zZUJveDtcbiAgICAgICAgZmVhdHVyZS5wb3B1cENsYXNzID0gcG9wdXBDbGFzcztcbiAgICAgICAgZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBmZWF0dXJlLmRhdGEub3ZlcmZsb3cgPSBvdmVyZmxvdyA/IFwiYXV0b1wiIDogXCJoaWRkZW5cIjtcbiAgICAgICAgbWFya2VyID0gZmVhdHVyZS5jcmVhdGVNYXJrZXIoKTtcbiAgICAgICAgbWFya2VyLmZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICBcbiAgICAgICAgaWYgKG1hcmtlcnMubmFtZSA9PSBcIlRvd2Vyc1wiKSB7XG4gICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdmVyXCIsIGZlYXR1cmUsIGhhbmRsZVRvd2VySG92ZXJQb3B1cCk7XG4gICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdXRcIiwgZmVhdHVyZSwgaGFuZGxlVG93ZXJIb3ZlclBvcHVwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXJrZXJzLm5hbWUgPT0gXCJUcmVlc1wiICYmIFZJU0lPTl9TSU1VTEFUSU9OKSB7XG4gICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdmVyXCIsIGZlYXR1cmUsIGhhbmRsZVRyZWVIb3ZlclBvcHVwKTtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW91dFwiLCBmZWF0dXJlLCBoYW5kbGVUcmVlSG92ZXJQb3B1cCk7XG4gICAgICAgIH1cbiAgICAgICAgbWFya2Vycy5hZGRNYXJrZXIobWFya2VyKTtcbiAgICAgICAgcmV0dXJuIG1hcmtlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVXYXJkTWFya2VyKGltZywgbGF0bG9uKSB7XG4gICAgICAgIHZhciBzaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZSgyMSwgMjUpLFxuICAgICAgICAgICAgb2Zmc2V0ID0gbmV3IE9wZW5MYXllcnMuUGl4ZWwoLShzaXplLncgLyAyKSwgLXNpemUuaCksXG4gICAgICAgICAgICBpY29uID0gbmV3IE9wZW5MYXllcnMuSWNvbihpbWcsIHNpemUsIG9mZnNldCksXG4gICAgICAgICAgICBtYXJrZXIgPSBuZXcgT3BlbkxheWVycy5NYXJrZXIobGF0bG9uLCBpY29uKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZVdhcmRNYXJrZXInLCBsYXRsb24pO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZXMgYSA2NHg2NCByZWN0YW5nbGUgZmVhdHVyZSBjZW50ZXJlZCBhdCBjXG4gICAgZnVuY3Rpb24gY3JlYXRlVGlsZUZlYXR1cmUoYywgc3R5bGUpIHtcbiAgICAgICAgdmFyIHIxID0gd29ybGRUb0xhdExvbihjLnggLSAzMiwgYy55IC0gMzIpLFxuICAgICAgICAgICAgcjIgPSB3b3JsZFRvTGF0TG9uKGMueCAtIDMyLCBjLnkgKyAzMiksXG4gICAgICAgICAgICByMyA9IHdvcmxkVG9MYXRMb24oYy54ICsgMzIsIGMueSArIDMyKSxcbiAgICAgICAgICAgIHI0ID0gd29ybGRUb0xhdExvbihjLnggKyAzMiwgYy55IC0gMzIpLFxuICAgICAgICAgICAgYm94X3BvaW50cyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMS54LCByMS55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMi54LCByMi55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMy54LCByMy55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyNC54LCByNC55KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJveF9yZWN0ID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhib3hfcG9pbnRzKSxcbiAgICAgICAgICAgIGJveF9mZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoYm94X3JlY3QsIG51bGwsIHN0eWxlKTtcblxuICAgICAgICByZXR1cm4gYm94X2ZlYXR1cmU7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlcyB1cmwgZm9yIHRpbGVzLiBPcGVuTGF5ZXJzIFRNUyBMYXllciBnZXRVUkwgcHJvcGVydHkgaXMgc2V0IHRvIHRoaXNcbiAgICBmdW5jdGlvbiBnZXRNeVVSTChwYXRjaCwgYmFzZUxheWVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihib3VuZHMpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2dldE15VVJMJywgYmFzZUxheWVyKTtcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLm1hcC5nZXRSZXNvbHV0aW9uKCksXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgucm91bmQoKGJvdW5kcy5sZWZ0IC0gdGhpcy5tYXhFeHRlbnQubGVmdCkgLyAocmVzICogdGhpcy50aWxlU2l6ZS53KSksXG4gICAgICAgICAgICAgICAgeSA9IE1hdGgucm91bmQoKHRoaXMubWF4RXh0ZW50LnRvcCAtIGJvdW5kcy50b3ApIC8gKHJlcyAqIHRoaXMudGlsZVNpemUuaCkpLFxuICAgICAgICAgICAgICAgIHogPSBtYXAuZ2V0Wm9vbSgpLFxuICAgICAgICAgICAgICAgIHBhdGggPSB6ICsgXCIvdGlsZV9cIiArIHggKyBcIl9cIiArIHkgKyBcIi5cIiArIHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnVybDtcblxuICAgICAgICAgICAgaWYgKHVybCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5zZWxlY3RVcmwocGF0aCwgdXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybCArIHBhdGNoICsgJy8nICsgYmFzZUxheWVyICsgJy8nICsgcGF0aFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2V0TWFya2VyTGF5ZXJzKCkge1xuICAgICAgICBmb3IgKGsgaW4gdHJlZU1hcmtlcnMpIHtcbiAgICAgICAgICAgIGlmIChjdXRUcmVlc1trXSkge1xuICAgICAgICAgICAgICAgIHNldFRyZWVNYXJrZXJTdGF0ZSh0cmVlTWFya2Vyc1trXSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSBtYXBfZGF0YTtcbiAgICAgICAgbGF5ZXJLZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1trXSlbMF07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZpbmcgbGF5ZXInLCBsYXllciwgayk7XG4gICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgIGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRheVJhbmdlTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIG5pZ2h0UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgYXR0YWNrUmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgbWFwLmV2ZW50cy51bnJlZ2lzdGVyKFwiY2hhbmdlbGF5ZXJcIiwgbWFwLCBsYXllckNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWFwRGF0YUxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgbWFya2VycyA9IHt9LFxuICAgICAgICAgICAgbWFya2VyLFxuICAgICAgICAgICAgdmVjdG9yTGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKFwiUGxhY2VkIFdhcmRzXCIpWzBdLFxuICAgICAgICAgICAgYm94X3BvaW50cyA9IFtdLFxuICAgICAgICAgICAgYm94X3JlY3QsIGJveF9mZWF0dXJlO1xuICAgICAgICBsYXllcktleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uTWFwRGF0YUxvYWQnLCBrKTtcbiAgICAgICAgICAgIGlmIChkYXRhW2tdKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG1hcmtlcnMgZm9yIG5vbi1uZXV0cmFsIHNwYXduIGJveCBhbmQgbm9uLXRyZWUgbGF5ZXJzXG4gICAgICAgICAgICAgICAgaWYgKGsgIT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIgJiYgayAhPSBcImVudF9kb3RhX3RyZWVcIiAmJiBrICE9IFwibm9fd2FyZHNcIiAmJiBrICE9IFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtrXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24oZGF0YVtrXVtpXS54LCBkYXRhW2tdW2ldLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyID0gYWRkTWFya2VyKG1hcmtlcnNba10sIG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChsYXRsb24ueCwgbGF0bG9uLnkpLCBPcGVuTGF5ZXJzLlBvcHVwLkZyYW1lZENsb3VkLCBcIkNsaWNrIHRvIHRvZ2dsZSByYW5nZSBvdmVybGF5XCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5kYXlfdmlzaW9uX3JhZGl1cyA9IFRPV0VSX0RBWV9WSVNJT05fUkFESVVTO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLm5pZ2h0X3Zpc2lvbl9yYWRpdXMgPSBUT1dFUl9OSUdIVF9WSVNJT05fUkFESVVTO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnRydWVfc2lnaHRfcmFkaXVzID0gVE9XRVJfVFJVRV9TSUdIVF9SQURJVVM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYXR0YWNrX3JhbmdlX3JhZGl1cyA9IFRPV0VSX0FUVEFDS19SQU5HRV9SQURJVVM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuc2hvd0luZm8gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT0gXCJucGNfZG90YV90b3dlclwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25wY19kb3RhX3Rvd2VyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcImNsaWNrXCIsIG1hcmtlcnNba10sIGhhbmRsZVRvd2VyTWFya2VyQ2xpY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJ0b3VjaGVuZFwiLCBtYXJrZXJzW2tdLCBoYW5kbGVUb3dlck1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudG93ZXJfbG9jID0gZGF0YVtrXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXQgdXAgdHJlZSBsYXllciB3aXRob3V0IGNyZWF0aW5nIHRyZWUgbWFya2VycyB5ZXRcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09IFwiZW50X2RvdGFfdHJlZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5NYXJrZXJzKGxheWVyTmFtZXNba10sIHt2aXNpYmlsaXR5OiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbWFya2Vyc1trXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1trXS5kYXRhID0gZGF0YVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldXRyYWwgc3Bhd24gbWFya2VycyBhbmQgcmVjdGFuZ2xlc1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEpTT05EYXRhKG1hcmtlcnMsIGssIFwibnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyX2JveFwiLCBkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBcIm5vX3dhcmRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsIGssIGxheWVyTmFtZXNba10sIHN0eWxlLnJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09IFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIikge1xuICAgICAgICAgICAgICAgICAgICBsb2FkR2VvSlNPTkRhdGEobWFya2VycywgaywgbGF5ZXJOYW1lc1trXSwgc3R5bGUubGlnaHRibHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyAgICAgICAgXG5cbiAgICAgICAgbWFwX2RhdGEgPSBkYXRhO1xuICAgICAgICBcbiAgICAgICAgbWFwLnJhaXNlTGF5ZXIodmVjdG9yTGF5ZXIsIG1hcC5sYXllcnMubGVuZ3RoKTtcblxuICAgICAgICAvLyBDcmVhdGUgdHJlZSBtYXJrZXJzIHRoZSBmaXJzdCB0aW1lIHRoZSB0cmVlIGxheWVyIGlzIHN3aXRjaGVkIHRvXG4gICAgICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJjaGFuZ2VsYXllclwiLCBtYXAsIGxheWVyQ2hhbmdlSGFuZGxlcik7XG5cbiAgICAgICAgcGFyc2VRdWVyeVN0cmluZygpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBsYXllckNoYW5nZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5ID09PSBcInZpc2liaWxpdHlcIiAmJiBldmVudC5sYXllci5uYW1lID09IGxheWVyTmFtZXNbXCJlbnRfZG90YV90cmVlXCJdICYmICFldmVudC5sYXllci5sb2FkZWQpIHtcbiAgICAgICAgICAgIGxvYWRUcmVlRGF0YSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LnByb3BlcnR5ID09PSBcInZpc2liaWxpdHlcIikge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmxheWVyLmlzQmFzZUxheWVyKSB7XG4gICAgICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ0Jhc2VMYXllcicsIGV2ZW50LmxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoZXZlbnQubGF5ZXIubmFtZS5yZXBsYWNlKC8gL2csICcnKSwgZXZlbnQubGF5ZXIudmlzaWJpbGl0eSA/IHRydWUgOiBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUcmVlRGF0YSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0IHRyZWUgbG9hZCcpO1xuICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNbXCJlbnRfZG90YV90cmVlXCJdKVswXTtcbiAgICAgICAgY29uc29sZS5sb2cobGF5ZXIpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxheWVyLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsYXRsb24gPSB3b3JsZFRvTGF0TG9uKGxheWVyLmRhdGFbaV0ueCwgbGF5ZXIuZGF0YVtpXS55KTtcbiAgICAgICAgICAgIG1hcmtlciA9IGFkZE1hcmtlcihsYXllciwgbmV3IE9wZW5MYXllcnMuTG9uTGF0KGxhdGxvbi54LCBsYXRsb24ueSksIE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQsIFwiQ2xpY2sgdG8gY3V0IGRvd24gdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIiwgZmFsc2UpO1xuICAgICAgICAgICAgbWFya2VyLnRyZWVWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hcmtlci50cmVlX2xvYyA9IGxheWVyLmRhdGFbaV0ueCArICcsJyArIGxheWVyLmRhdGFbaV0ueTtcbiAgICAgICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCBsYXllciwgaGFuZGxlVHJlZU1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyZWVNYXJrZXJzW2xheWVyLmRhdGFbaV0ueCArICcsJyArIGxheWVyLmRhdGFbaV0ueV0gPSBtYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIubG9hZGVkID0gIWxheWVyLmxvYWRlZDtcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZCB0cmVlIGxvYWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkSlNPTkRhdGEobWFya2VycywgaywgbmFtZSwgZGF0YSkge1xuICAgICAgICBtYXJrZXJzW25hbWVdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKGxheWVyTmFtZXNba10pO1xuICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1tuYW1lXSk7XG4gICAgICAgIG1hcmtlcnNbbmFtZV0uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcG50ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihkYXRhW2ldW2pdLngsIGRhdGFbaV1bal0ueSk7XG4gICAgICAgICAgICAgICAgcG50LnB1c2gobmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobGF0bG9uLngsIGxhdGxvbi55KSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgbG4gPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5MaW5lYXJSaW5nKHBudCk7XG4gICAgICAgICAgICBwZiA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGxuLCBudWxsLCBzdHlsZS5ncmVlbik7XG4gICAgICAgICAgICBtYXJrZXJzW25hbWVdLmFkZEZlYXR1cmVzKFtwZl0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXAgc2V0dGluZ3MgYmFzZWQgb24gcXVlcnkgc3RyaW5nIHZhbHVlc1xuICAgIGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcoKSB7XG4gICAgICAgIHZhciBtb2RlID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdtb2RlJyk7XG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICB2YXIgbW9kZVJhZGlvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kZSArICdUb2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW9CdXR0b24pIHtcbiAgICAgICAgICAgICAgICBtb2RlUmFkaW9CdXR0b24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdG9nZ2xlQ29udHJvbC5jYWxsKG1vZGVSYWRpb0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHpvb20gPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3pvb20nKTtcbiAgICAgICAgaWYgKHpvb20pIHtcbiAgICAgICAgICAgIG1hcC56b29tVG8ocGFyc2VJbnQoem9vbSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JsZFggPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3gnKTtcbiAgICAgICAgdmFyIHdvcmxkWSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgneScpO1xuICAgICAgICBpZiAod29ybGRYICYmIHdvcmxkWSkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IHdvcmxkVG9MYXRMb24od29ybGRYLCB3b3JsZFkpO1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihuZXcgT3BlbkxheWVycy5Mb25MYXQobG9ubGF0LngsIGxvbmxhdC55KSwgdW5kZWZpbmVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIga2V5cyA9IFsnb2JzZXJ2ZXInLCAnc2VudHJ5J107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHdhcmRzID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKGtleXNbaV0pXG4gICAgICAgICAgICBpZiAod2FyZHMpIHtcbiAgICAgICAgICAgICAgICB3YXJkX2Nvb3JkaW5hdGVzID0gdHJpbSh3YXJkcywgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgICAgIHdhcmRfY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb29yZCA9IGVsLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IHdvcmxkVG9MYXRMb24ocGFyc2VGbG9hdChjb29yZFswXSksIHBhcnNlRmxvYXQoY29vcmRbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VXYXJkKG5ldyBPcGVuTGF5ZXJzLkxvbkxhdCh4eS54LCB4eS55KSwga2V5c1tpXSwgZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIgYmFzZUxheWVyTmFtZSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnQmFzZUxheWVyJyk7XG4gICAgICAgIGlmIChiYXNlTGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJhc2VMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBiYXNlTGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgIHZhciBsYXllck5hbWUgPSBsYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpO1xuICAgICAgICAgICAgICAgIGlmIChiYXNlTGF5ZXJOYW1lID09PSBsYXllck5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNldEJhc2VMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZm9yIChrIGluIGxheWVyTmFtZXMpIHtcbiAgICAgICAgICAgIHZhciBsYXllck5hbWUgPSBsYXllck5hbWVzW2tdLnJlcGxhY2UoLyAvZywgJycpO1xuICAgICAgICAgICAgdmFsdWUgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUobGF5ZXJOYW1lKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1trXSlbMF07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3BhcnNlUXVlcnlTdHJpbmcnLCBsYXllciwgbGF5ZXJOYW1lc1trXSwgbGF5ZXJOYW1lLCB2YWx1ZSA9PSBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyKSBsYXllci5zZXRWaXNpYmlsaXR5KHZhbHVlID09IFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXRfdHJlZXMgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2N1dF90cmVlcycpO1xuICAgICAgICBpZiAoY3V0X3RyZWVzKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNbXCJlbnRfZG90YV90cmVlXCJdKVswXTtcbiAgICAgICAgICAgIGlmICghbGF5ZXIubG9hZGVkKSBsb2FkVHJlZURhdGEoKTtcbiAgICAgICAgICAgIGN1dF90cmVlX2Nvb3JkaW5hdGVzID0gdHJpbShjdXRfdHJlZXMsICcgOycpLnNwbGl0KCc7JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVNYXJrZXJzLCBjdXRfdHJlZV9jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1dF90cmVlX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY3V0X3RyZWVfY29vcmRpbmF0ZXNbaV0pO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlTWFya2Vyc1tjdXRfdHJlZV9jb29yZGluYXRlc1tpXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VHJlZU1hcmtlclN0YXRlKHRyZWVNYXJrZXJzW2N1dF90cmVlX2Nvb3JkaW5hdGVzW2ldXSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3dlcl92aXNpb24gPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3Rvd2VyX3Zpc2lvbicpO1xuICAgICAgICBpZiAodG93ZXJfdmlzaW9uKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNbXCJucGNfZG90YV90b3dlclwiXSlbMF07XG4gICAgICAgICAgICB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXMgPSB0cmltKHRvd2VyX3Zpc2lvbiwgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rvd2VyX3Zpc2lvbicsIGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRyZWVNYXJrZXJzLCB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxheWVyLm1hcmtlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyLm1hcmtlcnNbal0udG93ZXJfbG9jLnggKyAnLCcgKyBsYXllci5tYXJrZXJzW2pdLnRvd2VyX2xvYy55ID09IHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlVG93ZXJNYXJrZXJDbGljayh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBsYXllci5tYXJrZXJzW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzZXRUcmVlUXVlcnlTdHJpbmcoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IE9iamVjdC5rZXlzKGN1dFRyZWVzKS5qb2luKCc7Jyk7XG4gICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdjdXRfdHJlZXMnLCB2YWx1ZSB8fCBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRKU09OKHBhdGgsIGNhbGxiYWNrKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRKU09OJywgcGF0aCk7XG4gICAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCBwYXRoLCB0cnVlKTtcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyb3IgbG9hZGluZyBwYWdlLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBsb2FkaW5nIHBhZ2UuJyk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Quc2VuZCgpO1xuICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBJTklUSVRJQUxJWkFUSU9OICpcbiAgICAgKioqKioqKioqKioqKioqKioqKiovXG4gICAgT3BlbkxheWVycy5JbWdQYXRoID0gSU1HX0RJUjtcbiAgICBcbiAgICAvLyBTdGFydCBzZXR0aW5nIHVwIHRoZSBtYXAsIGFkZGluZyBjb250cm9scyBhbmQgbGF5ZXJzXG4gICAgYmFzZUxheWVycy5mb3JFYWNoKGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XG4gICAgfSk7XG4gICAgbWFwLmFkZExheWVyKGN1cnNvckxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIoZGF5UmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKG5pZ2h0UmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKHRydWVTaWdodFJhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihhdHRhY2tSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIocG9seWdvbkxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIod2FyZFZpc2lvbkxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIodmlzaW9uU2ltdWxhdGlvbkxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIoaWNvbkxheWVyKTtcbiAgICBtYXAuYWRkQ29udHJvbChjb29yZGluYXRlQ29udHJvbCk7XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5Ub3VjaE5hdmlnYXRpb24oe1xuICAgICAgICBkcmFnUGFuT3B0aW9uczoge1xuICAgICAgICAgICAgZW5hYmxlS2luZXRpYzogdHJ1ZVxuICAgICAgICB9XG4gICAgfSkpO1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuS2V5Ym9hcmREZWZhdWx0cygpKTtcbiAgICBtYXAuYWRkQ29udHJvbChsYXllclN3aXRjaGVyKTtcbiAgICBsYXllclN3aXRjaGVyLm1heGltaXplQ29udHJvbCgpO1xuICAgIGlmICghbWFwLmdldENlbnRlcigpKSB7XG4gICAgICAgIG1hcC56b29tVG9NYXhFeHRlbnQoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gY3JlYXRlIGNsaWNrIGhhbmRsZXJcbiAgICBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2sgPSBPcGVuTGF5ZXJzLkNsYXNzKE9wZW5MYXllcnMuQ29udHJvbCwge1xuICAgICAgICBkZWZhdWx0SGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNpbmdsZTogdHJ1ZSxcbiAgICAgICAgICAgIFwiZG91YmxlXCI6IGZhbHNlLFxuICAgICAgICAgICAgcGl4ZWxUb2xlcmFuY2U6IDAsXG4gICAgICAgICAgICBzdG9wU2luZ2xlOiBmYWxzZSxcbiAgICAgICAgICAgIHN0b3BEb3VibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck9wdGlvbnMgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRIYW5kbGVyT3B0aW9ucyk7XG4gICAgICAgICAgICBPcGVuTGF5ZXJzLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9IG5ldyBPcGVuTGF5ZXJzLkhhbmRsZXIuQ2xpY2sodGhpcywge1xuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGJsY2xpY2s6IHRoaXMub25EYmxjbGlja1xuICAgICAgICAgICAgfSwgdGhpcy5oYW5kbGVyT3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9uQ2xpY2ssXG4gICAgICAgIG9uRGJsY2xpY2s6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5rZXkgKyBcIk91dHB1dFwiKSxcbiAgICAgICAgICAgICAgICBtc2cgPSBcImRibGNsaWNrIFwiICsgZXZlbnQueHk7XG4gICAgICAgICAgICBvdXRwdXQudmFsdWUgPSBvdXRwdXQudmFsdWUgKyBtc2cgKyBcIlxcblwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBDb250cm9scyBjb25maWd1cmF0aW9uXG4gICAgcmVuZGVyZXIgPSByZW5kZXJlciA/IFtyZW5kZXJlcl0gOiBPcGVuTGF5ZXJzLkxheWVyLlZlY3Rvci5wcm90b3R5cGUucmVuZGVyZXJzO1xuICAgIGRyYXdDb250cm9scyA9IHtcbiAgICAgICAgbGluZTogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5NZWFzdXJlKE9wZW5MYXllcnMuSGFuZGxlci5QYXRoLCB7XG4gICAgICAgICAgICBwZXJzaXN0OiB0cnVlLFxuICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXJzOiByZW5kZXJlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGNpcmNsZTogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5NZWFzdXJlKE9wZW5MYXllcnMuSGFuZGxlci5QYXRoLCB7XG4gICAgICAgICAgICBwZXJzaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyczogcmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBvYnNlcnZlcjogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5DbGljayh7XG4gICAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVXYXJkQ2xpY2soJ29ic2VydmVyJyksXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHNpbmdsZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgc2VudHJ5OiBuZXcgT3BlbkxheWVycy5Db250cm9sLkNsaWNrKHtcbiAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZVdhcmRDbGljaygnc2VudHJ5JyksXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIHNpbmdsZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgcG9seWdvbkNvbnRyb2w6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuRHJhd0ZlYXR1cmUocG9seWdvbkxheWVyLCBPcGVuTGF5ZXJzLkhhbmRsZXIuUmVndWxhclBvbHlnb24sIHtcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2lkZXM6IDMwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBzZWxlY3Q6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuU2VsZWN0RmVhdHVyZShwb2x5Z29uTGF5ZXIsIHtcbiAgICAgICAgICAgIGhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgaGlnaGxpZ2h0T25seTogZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wgJiYgZmVhdHVyZS5pc19tZWFzdXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUubWVhc3VyZV9jb250cm9sLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5pc19tZWFzdXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9seWdvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJGZWF0dXJlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKSxcbiAgICAgICAgICAgICAgICAgICAgb3V0ID0gXCJSYWRpdXM6IFwiICsgKC41NjUzNTIgKiBNYXRoLnNxcnQoZmVhdHVyZS5nZW9tZXRyeS5nZXRBcmVhKCkpICogbWFwQ29uc3RhbnRzLnNjYWxlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG91dDtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodChmZWF0dXJlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRGZWF0dXJlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy51bmhpZ2hsaWdodChmZWF0dXJlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICAvLyBBZGQgY29udHJvbHMgdG8gbWFwXG4gICAgZm9yICh2YXIga2V5IGluIGRyYXdDb250cm9scykge1xuICAgICAgICBpZiAoa2V5ID09IFwibGluZVwiKSB7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNba2V5XS5ldmVudHMub24oe1xuICAgICAgICAgICAgICAgIG1lYXN1cmU6IGhhbmRsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgICAgICAgICBtZWFzdXJlcGFydGlhbDogaGFuZGxlTWVhc3VyZW1lbnRzXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT0gXCJjaXJjbGVcIikge1xuICAgICAgICAgICAgZHJhd0NvbnRyb2xzW2tleV0uZXZlbnRzLm9uKHtcbiAgICAgICAgICAgICAgICBtZWFzdXJlOiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHMsXG4gICAgICAgICAgICAgICAgbWVhc3VyZXBhcnRpYWw6IGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50c1BhcnRpYWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgbWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2xzW2tleV0pO1xuICAgIH1cblxuICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJ6b29tZW5kXCIsIG1hcCwgZnVuY3Rpb24oKXtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3pvb20nLCBtYXAuem9vbSk7XG4gICAgfSk7XG5cbiAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwibW92ZWVuZFwiLCBtYXAsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChtYXAuY2VudGVyLmxvbiwgbWFwLmNlbnRlci5sYXQpO1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygneCcsIHdvcmxkWFkueC50b0ZpeGVkKDApKTtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3knLCB3b3JsZFhZLnkudG9GaXhlZCgwKSk7XG4gICAgfSk7XG5cbiAgICAvLyBYL1kgY29vcmRpbmF0ZSB1cGRhdGUgZGlzcGxheSBoYW5kbGVyXG4gICAgY29vcmRpbmF0ZUNvbnRyb2wuZm9ybWF0T3V0cHV0ID0gZnVuY3Rpb24gKGxvbmxhdCkge1xuICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobG9ubGF0LmxvbiwgbG9ubGF0LmxhdCk7XG4gICAgICAgIHJldHVybiB3b3JsZFhZLngudG9GaXhlZCgwKSArICcsICcgKyB3b3JsZFhZLnkudG9GaXhlZCgwKTtcbiAgICB9O1xuICAgIFxuICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW1vdmVcIiwgbWFwLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8qaWYgKHdhcmRWaXNpb25MYXllci5jdXJzb3JfbWFya2VyKSB7XG4gICAgICAgICAgICBpZiAod2FyZFZpc2lvbkxheWVyLmN1cnNvcl9tYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB3YXJkVmlzaW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMod2FyZFZpc2lvbkxheWVyLmN1cnNvcl9tYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKTtcbiAgICAgICAgICAgIGlmICh3YXJkVmlzaW9uTGF5ZXIuY3Vyc29yX21hcmtlci52aXNpb25fZmVhdHVyZSkgd2FyZFZpc2lvbkxheWVyLnJlbW92ZUZlYXR1cmVzKHdhcmRWaXNpb25MYXllci5jdXJzb3JfbWFya2VyLnZpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIHdhcmRWaXNpb25MYXllci5yZW1vdmVGZWF0dXJlcyh3YXJkVmlzaW9uTGF5ZXIuY3Vyc29yX21hcmtlcik7XG4gICAgICAgIH0qL1xuICAgICAgICBjdXJzb3JMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICBcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY3Vyc29yIG1hcmtlciBwb2x5Z29uIGlmIGluIHBsYWNlIG9ic2VydmVyIG1vZGVcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzZXJ2ZXJUb2dnbGVcIikuY2hlY2tlZCkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZS54eSk7XG4gICAgICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobG9ubGF0LmxvbiwgbG9ubGF0LmxhdCk7XG4gICAgICAgICAgICB2YXIgZ3JpZFhZID0gdnMuV29ybGRYWXRvR3JpZFhZKHdvcmxkWFkueCwgd29ybGRYWS55KTtcblxuICAgICAgICAgICAgdmFyIHRyZWVQdHMgPSB2cy50cmVlX3JlbGF0aW9uc1tncmlkWFkua2V5XTtcbiAgICAgICAgICAgIHZhciB0cmVlQmxvY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0cmVlUHRzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJlZVB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gdnMudHJlZV9zdGF0ZVt0cmVlUHQua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN1cnNvcl9zdHlsZSA9IHN0eWxlLmdyZWVuO1xuICAgICAgICAgICAgaWYgKCF2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGN1cnNvcl9zdHlsZSA9IHN0eWxlLnJlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBib3hfZmVhdHVyZSA9IGNyZWF0ZVRpbGVGZWF0dXJlKHZzLkdyaWRYWXRvV29ybGRYWShncmlkWFkueCwgZ3JpZFhZLnkpLCBjdXJzb3Jfc3R5bGUpO1xuICAgICAgICAgICAgY3Vyc29yTGF5ZXIuYWRkRmVhdHVyZXMoW2JveF9mZWF0dXJlXSk7XG4gICAgICAgICAgICAvL3dhcmRWaXNpb25MYXllci5jdXJzb3JfbWFya2VyID0gYm94X2ZlYXR1cmU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTl9BTFdBWVMpIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGxvbmxhdCwgbnVsbCwgRU5USVRJRVMub2JzZXJ2ZXIucmFkaXVzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU2hvdy9oaWRlIGNvbnRyb2xzIHBhbmVsXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1tYXhcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9sc1wiKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmIChsYXllclN3aXRjaGVyLmlzU21hbGxTY3JlZW4oKSkge1xuICAgICAgICAgICAgbGF5ZXJTd2l0Y2hlci5taW5pbWl6ZUNvbnRyb2woKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBmdW5jdGlvbiBtaW5pbWl6ZUNvbnRyb2xMaXN0KGUpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250cm9sc1wiKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1heFwiKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgbWluaW1pemVDb250cm9sTGlzdCwgZmFsc2UpO1xuICAgIFxuICAgIC8vIEluaXRpYWxseSBoaWRlIGNvbnRyb2xzIGlmIHNjcmVlbiBpcyBzbWFsbFxuICAgIGlmIChsYXllclN3aXRjaGVyLmlzU21hbGxTY3JlZW4oKSkge1xuICAgICAgICBtaW5pbWl6ZUNvbnRyb2xMaXN0LmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikpO1xuICAgICAgICBsYXllclN3aXRjaGVyLm1pbmltaXplQ29udHJvbCgpO1xuICAgIH1cblxuICAgIC8vIFNob3cvaGlkZSBYL1kgY29vcmRpbmF0ZSBkaXNwbGF5XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb29yZENvbnRyb2xcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub2xDb250cm9sTW91c2VQb3NpdGlvblwiKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub2xDb250cm9sTW91c2VQb3NpdGlvblwiKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gVmlzaW9uIHNpbXVsYXRpb24gb24vb2ZmXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpb25TaW11bGF0aW9uQ29udHJvbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT04gPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx3YXlzU2ltdWxhdGVDb250cm9sXCIpLmRpc2FibGVkID0gIXRoaXMuY2hlY2tlZDtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBBbHdheXMgc2ltdWxhdGUgdmlzaW9uIG9uL29mZlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx3YXlzU2ltdWxhdGVDb250cm9sXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBWSVNJT05fU0lNVUxBVElPTl9BTFdBWVMgPSB0aGlzLmNoZWNrZWQ7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gVXBkYXRlIHRyYXZlbCB0aW1lIGRpc3BsYXkgd2hlbiBtb3Zlc3BlZWQgaW5wdXQgY2hhbmdlc1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZXNwZWVkXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWVcIikuaW5uZXJIVE1MID0gKGxhc3REaXN0YW5jZSAvIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZXNwZWVkXCIpLnZhbHVlKS50b0ZpeGVkKDIpO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIFNldCB1cCBwYW5lbCByYWRpbyBidXR0b24gdG9nZ2xlIGhhbmRsZXJzXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hdmlnYXRlVG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmVUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2lyY2xlVG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29ic2VydmVyVG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbnRyeVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXNldCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0pO1xuICAgICAgICByZXNldE1hcmtlckxheWVycygpO1xuICAgICAgICBwb2x5Z29uTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIHdhcmRWaXNpb25MYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBpY29uTGF5ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgIGRyYXdDb250cm9scy5saW5lLmNhbmNlbCgpO1xuICAgICAgICBkcmF3Q29udHJvbHMuY2lyY2xlLmNhbmNlbCgpO1xuICAgICAgICBtYXAuc2V0QmFzZUxheWVyKGJhc2VMYXllcnNbMF0pO1xuICAgICAgICBtYXAuem9vbVRvTWF4RXh0ZW50KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBpbml0KCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2RhdGEnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIGRhdGEgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ2RhdGEnKTtcbiAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnZhbHVlID0gZGF0YTtcbiAgICAgICAgfVxuICAgICAgICBWSVNJT05fU0lNVUxBVElPTiA9IGRhdGEgIT0gXCI2ODdcIjtcbiAgICAgICAgLy9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdsYWJlbFtmb3I9XCJ2aXNpb25TaW11bGF0aW9uQ29udHJvbFwiXScpLnN0eWxlLmRpc3BsYXkgPSBWSVNJT05fU0lNVUxBVElPTiA/ICdpbmxpbmUnIDogJ25vbmUnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2lvblNpbXVsYXRpb25Db250cm9sXCIpLmRpc2FibGVkID0gIVZJU0lPTl9TSU1VTEFUSU9OO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsd2F5c1NpbXVsYXRlQ29udHJvbFwiKS5kaXNhYmxlZCA9ICFWSVNJT05fU0lNVUxBVElPTjtcbiAgICAgICAgZ2V0SlNPTihtYXBfZGF0YV9wYXRoICsgZ2V0RGF0YVZlcnNpb24oKSArICcvbWFwZGF0YS5qc29uJywgb25NYXBEYXRhTG9hZCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldERhdGFWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobGF0bG9uLCBtYXJrZXIsIHJhZGl1cykge1xuICAgICAgICAvL2NvbnNvbGUubG9nKGxhdGxvbiwgbWFya2VyLCByYWRpdXMpO1xuICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobGF0bG9uLmxvbiwgbGF0bG9uLmxhdCk7XG4gICAgICAgIHZhciBncmlkWFkgPSB2cy5Xb3JsZFhZdG9HcmlkWFkod29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICBpZiAodnMuaXNWYWxpZFhZKGdyaWRYWS54LCBncmlkWFkueSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbmQgYWRkIGNlbnRlciBtYXJrZXIgcG9seWdvblxuICAgICAgICAgICAgdmFyIGJveF9mZWF0dXJlID0gY3JlYXRlVGlsZUZlYXR1cmUodnMuR3JpZFhZdG9Xb3JsZFhZKGdyaWRYWS54LCBncmlkWFkueSksIHN0eWxlLmdyZWVuKTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIuYWRkRmVhdHVyZXMoW2JveF9mZWF0dXJlXSk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSA9IGJveF9mZWF0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleGVjdXRlIHZpc2lvbiBzaW11bGF0aW9uXG4gICAgICAgICAgICB2cy51cGRhdGVWaXNpYmlsaXR5KGdyaWRYWS54LCBncmlkWFkueSwgZ2V0VGlsZVJhZGl1cyhyYWRpdXMpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gbWVyZ2UgbGlnaHQgcG9pbnRzIGludG8gYSBzaW5nbGUgcG9seWdvbiBhbmQgYWRkIHRvIHZpc2lvbiBsYXllclxuICAgICAgICAgICAgdmFyIG91dGxpbmVzID0gZ2V0TGlnaHRVbmlvbih2cy5ncmlkLCB2cy5saWdodHMpO1xuICAgICAgICAgICAgdmFyIHBvbHlnb25MaXN0ID0gb3V0bGluZXMubWFwKGZ1bmN0aW9uIChvdXRsaW5lUG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJpbmdQb2ludHMgPSBvdXRsaW5lUG9pbnRzLm1hcChmdW5jdGlvbiAocHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdvcmxkWFkgPSB2cy5HcmlkWFl0b1dvcmxkWFkocHQueCwgcHQueSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXRsb24gPSB3b3JsZFRvTGF0TG9uKHdvcmxkWFkueCwgd29ybGRYWS55KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KGxhdGxvbi54LCBsYXRsb24ueSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFyIHJpbmcgPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5MaW5lYXJSaW5nKHJpbmdQb2ludHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uKFtyaW5nXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBtdWx0aVBvbHlnb24gPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5NdWx0aVBvbHlnb24ocG9seWdvbkxpc3QpO1xuICAgICAgICAgICAgdmFyIHZpc2lvbkZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihtdWx0aVBvbHlnb24sIG51bGwsIHN0eWxlLnllbGxvdyk7XG4gICAgICAgICAgICBpZiAobWFya2VyKSB7XG4gICAgICAgICAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyLmFkZEZlYXR1cmVzKFt2aXNpb25GZWF0dXJlXSk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlID0gdmlzaW9uRmVhdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnNvckxheWVyLmFkZEZlYXR1cmVzKFt2aXNpb25GZWF0dXJlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgdnMgPSBuZXcgVmlzaW9uU2ltdWxhdGlvbih3b3JsZGRhdGEsIHZpc2lvbl9kYXRhX2ltYWdlX3BhdGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZzIGxvYWRlZCcsIERhdGUubm93KCkgLSB0MSk7XG4gICAgICAgIGluaXQoKTtcbiAgICB9KTtcbiAgICBcbiAgICBmdW5jdGlvbiBsb2FkR2VvSlNPTkRhdGEobWFya2VycywgaywgbmFtZSwgc3R5bGUpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gbWFwX2RhdGFfcGF0aCArIGdldERhdGFWZXJzaW9uKCkgKyAnLycgKyBrICsgJzIuanNvbic7XG4gICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IobmFtZSwge1xuICAgICAgICAgICAgc3RyYXRlZ2llczogW25ldyBPcGVuTGF5ZXJzLlN0cmF0ZWd5LkZpeGVkKCldLFxuICAgICAgICAgICAgcHJvdG9jb2w6IG5ldyBPcGVuTGF5ZXJzLlByb3RvY29sLkhUVFAoe1xuICAgICAgICAgICAgICAgIHVybDogZmlsZW5hbWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBuZXcgT3BlbkxheWVycy5Gb3JtYXQuR2VvSlNPTigpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBtYXJrZXJzW2tdLnN0eWxlID0gc3R5bGU7XG4gICAgICAgIG1hcC5hZGRMYXllcihtYXJrZXJzW2tdKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwOyIsInZhciBtYXBDb25zdGFudHMgPSByZXF1aXJlKCcuL21hcENvbnN0YW50cycpO1xuXG5mdW5jdGlvbiBsZXJwKG1pblZhbCwgbWF4VmFsLCBwb3Nfcikge1xuICAgIHJldHVybiBwb3NfciAqIChtYXhWYWwgLSBtaW5WYWwpICsgbWluVmFsO1xufVxuXG5mdW5jdGlvbiByZXZlcnNlTGVycChtaW5WYWwsIG1heFZhbCwgcG9zKSB7XG4gICAgcmV0dXJuIChwb3MgLSBtaW5WYWwpIC8gKG1heFZhbCAtIG1pblZhbCk7XG59XG5cbmZ1bmN0aW9uIGxhdExvblRvV29ybGQoeCwgeSkge1xuICAgIHZhciB4X3IgPSBsZXJwKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1sxXSwgeCAvIG1hcENvbnN0YW50cy5tYXBfdyksXG4gICAgICAgIHlfciA9IGxlcnAobWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzFdLCAobWFwQ29uc3RhbnRzLm1hcF9oIC0geSkgLyBtYXBDb25zdGFudHMubWFwX2gpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeF9yLFxuICAgICAgICB5OiB5X3JcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB3b3JsZFRvTGF0TG9uKHhfciwgeV9yKSB7XG4gICAgdmFyIHggPSByZXZlcnNlTGVycChtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0sIHhfcikgKiBtYXBDb25zdGFudHMubWFwX3csXG4gICAgICAgIHkgPSBtYXBDb25zdGFudHMubWFwX2ggLSByZXZlcnNlTGVycChtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMV0sIHlfcikgKiBtYXBDb25zdGFudHMubWFwX2g7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VGlsZVJhZGl1cyhyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KE1hdGguZmxvb3IociAvIDY0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNjYWxlZFJhZGl1cyhyKSB7XG4gICAgcmV0dXJuIHIgLyAobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0gLSBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSkgKiBtYXBDb25zdGFudHMubWFwX3dcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRGlzdGFuY2Uob3JkZXIsIHVuaXRzLCBtZWFzdXJlKSB7XG4gICAgaWYgKG9yZGVyID09IDEpIHtcbiAgICAgICAgaWYgKHVuaXRzID09IFwia21cIikge1xuICAgICAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGUgKiAxMDAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVhc3VyZSAqIG1hcENvbnN0YW50cy5zY2FsZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxlcnA6IGxlcnAsXG4gICAgcmV2ZXJzZUxlcnA6IHJldmVyc2VMZXJwLFxuICAgIGxhdExvblRvV29ybGQ6IGxhdExvblRvV29ybGQsXG4gICAgd29ybGRUb0xhdExvbjogd29ybGRUb0xhdExvbixcbiAgICBnZXRUaWxlUmFkaXVzOiBnZXRUaWxlUmFkaXVzLFxuICAgIGdldFNjYWxlZFJhZGl1czogZ2V0U2NhbGVkUmFkaXVzLFxuICAgIGNhbGN1bGF0ZURpc3RhbmNlOiBjYWxjdWxhdGVEaXN0YW5jZVxufSIsInZhciBWaXNpb25TaW11bGF0aW9uID0gcmVxdWlyZShcImRvdGEtdmlzaW9uLXNpbXVsYXRpb25cIik7XG52YXIga2V5MnB0ID0gVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUua2V5MnB0O1xudmFyIHh5MmtleSA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MmtleTtcbnZhciB4eTJwdCA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MnB0O1xuXG5mdW5jdGlvbiBwcm9jZXNzTmVpZ2hib3JzKGdyaWQsIGxpZ2h0cywgY29tcG9uZW50cywga2V5LCBpbmRleCkge1xuICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgIHZhciBkaXJzID0gW1sxLCAwXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzAsIDFdXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFYID0gcHQueCtkaXJzW2ldWzBdO1xuICAgICAgICB2YXIgYVkgPSBwdC55K2RpcnNbaV1bMV07XG4gICAgICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgY29udGludWU7XG4gICAgICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgICAgIGlmIChjb21wb25lbnRzW2tleUFkal0gfHwgIWxpZ2h0c1trZXlBZGpdKSBjb250aW51ZTtcbiAgICAgICAgY29tcG9uZW50c1trZXlBZGpdID0gaW5kZXg7XG4gICAgICAgIHByb2Nlc3NOZWlnaGJvcnMoZ3JpZCwgbGlnaHRzLCBjb21wb25lbnRzLCBrZXlBZGosIGluZGV4KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldExpZ2h0VW5pb24oZ3JpZCwgbGlnaHRzKSB7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB7fTtcbiAgICB2YXIgaW5kZXggPSAxO1xuICAgIGZvciAodmFyIGtleSBpbiBsaWdodHMpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnRzW2tleV0pIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHNba2V5XSA9IGluZGV4O1xuICAgICAgICAgICAgcHJvY2Vzc05laWdoYm9ycyhncmlkLCBsaWdodHMsIGNvbXBvbmVudHMsIGtleSwgaW5kZXgpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgb3V0bGluZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgICAgb3V0bGluZXMucHVzaChnZXRPdXRsaW5lKGdyaWQsIGNvbXBvbmVudHMsIGkpKVxuICAgIH1cbiAgICByZXR1cm4gb3V0bGluZXM7XG59XG5cbmZ1bmN0aW9uIGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHQsIGRpcikge1xuICAgIHZhciBhWCA9IHB0LngrZGlyWzBdO1xuICAgIHZhciBhWSA9IHB0LnkrZGlyWzFdO1xuICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuIHRydWU7XG4gICAgdmFyIGtleUFkaiA9IGdyaWRbYVhdW2FZXS5rZXlcbiAgICByZXR1cm4gIWNvbXBvbmVudHNba2V5QWRqXTtcbn1cblxuZnVuY3Rpb24gbm90U3Vycm91bmRlZChncmlkLCBjb21wb25lbnRzLCBwdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSs9Mikge1xuICAgICAgICB2YXIgYVggPSBwdC54K01hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgICAgIHZhciBhWSA9IHB0LnkrTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICAgICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSByZXR1cm4gaTtcbiAgICAgICAgdmFyIGtleUFkaiA9IGdyaWRbYVhdW2FZXS5rZXlcbiAgICAgICAgaWYgKCFjb21wb25lbnRzW2tleUFkal0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gbW9kKG4sIG0pIHtcbiAgICAgICAgcmV0dXJuICgobiAlIG0pICsgbSkgJSBtO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRsaW5lKGdyaWQsIGNvbXBvbmVudHMsIGluZGV4KSB7XG4gICAgdmFyIG91dGxpbmVQb2ludHMgPSBbXTtcbiAgICB2YXIgc3RhcnRLZXk7XG4gICAgdmFyIGRpciA9IG51bGw7XG4gICAgZm9yICh2YXIga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgdmFyIHB0ID0ga2V5MnB0KGtleSk7XG4gICAgICAgIGRpciA9IG5vdFN1cnJvdW5kZWQoZ3JpZCwgY29tcG9uZW50cywgcHQpO1xuICAgICAgICBpZiAoY29tcG9uZW50c1trZXldID09IGluZGV4ICYmIGRpciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhcnRLZXkgPSBrZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgbmV4dCA9IHByb2Nlc3NOZXh0KGdyaWQsIGNvbXBvbmVudHMsIHN0YXJ0S2V5LCBkaXIpO1xuICAgIHdoaWxlIChzdGFydEtleSAhPT0gbmV4dC5rZXkgfHwgZGlyICE9PSBuZXh0LmRpcikge1xuICAgICAgICBvdXRsaW5lUG9pbnRzLnB1c2gobmV4dC5wb2ludCk7XG4gICAgICAgIG5leHQgPSBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBuZXh0LmtleSwgbmV4dC5kaXIpO1xuICAgIH1cbiAgICBvdXRsaW5lUG9pbnRzLnB1c2gobmV4dC5wb2ludCk7XG4gICAgcmV0dXJuIG91dGxpbmVQb2ludHM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIGRpciwgaSwgYWRqRGlyKSB7XG4gICAgdmFyIGFYID0gcHQueCtkaXJbMF07XG4gICAgdmFyIGFZID0gcHQueStkaXJbMV07XG4gICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSByZXR1cm47XG4gICAgdmFyIHB0QWRqID0gZ3JpZFtwdC54K2RpclswXV1bcHQueStkaXJbMV1dO1xuICAgIGlmIChjb21wb25lbnRzW3B0QWRqLmtleV0gPT0gY29tcG9uZW50c1trZXldICYmIGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHRBZGosIGFkakRpcikpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcHRBZGoua2V5LFxuICAgICAgICAgICAgZGlyOiBpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NOZXh0KGdyaWQsIGNvbXBvbmVudHMsIGtleSwgaSkge1xuICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgIHZhciBuZXh0O1xuICAgIFxuICAgIHZhciB4ID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICB2YXIgeSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgXG4gICAgdmFyIG5JID0gbW9kKGkrMiwgOCk7XG4gICAgdmFyIG5YID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIG5JKSk7XG4gICAgdmFyIG5ZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIG5JKSk7XG4gICAgXG4gICAgdmFyIGJJID0gbW9kKGktMSwgOCk7XG4gICAgdmFyIGJYID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGJJKSk7XG4gICAgdmFyIGJZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGJJKSk7XG5cbiAgICBpZiAoaXNTaWRlRnJlZShncmlkLCBjb21wb25lbnRzLCBwdCwgW25YLCBuWV0pKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGRpcjogbW9kKGkrMiwgOCksXG4gICAgICAgICAgICBwb2ludDogeHkycHQocHQueCtiWC8yLCBwdC55K2JZLzIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0KSBuZXh0ID0gY2hlY2tBZGooZ3JpZCwgY29tcG9uZW50cywgcHQsIGtleSwgW25YLCBuWV0sIGksIFt4LCB5XSk7XG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHZhciBhSSA9IG1vZChpICsgMSwgOCk7XG4gICAgICAgIHZhciBhWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBhSSkpO1xuICAgICAgICB2YXIgYVkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYUkpKTtcbiAgICAgICAgdmFyIHBJID0gbW9kKGkgLSAyLCA4KTtcbiAgICAgICAgdmFyIHBYID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIHBJKSk7XG4gICAgICAgIHZhciBwWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBwSSkpO1xuICAgICAgICBuZXh0ID0gY2hlY2tBZGooZ3JpZCwgY29tcG9uZW50cywgcHQsIGtleSwgW2FYLCBhWV0sIHBJLCBbcFgsIHBZXSk7XG4gICAgfVxuICAgIGlmIChuZXh0KSB7XG4gICAgICAgIG5leHQucG9pbnQgPSB4eTJwdChwdC54K2JYLzIsIHB0LnkrYlkvMik7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExpZ2h0VW5pb247IiwidmFyIG1hcENvbnN0YW50cyA9IHtcbiAgICBtYXBfdzogMTYzODQsXG4gICAgbWFwX2g6IDE2Mzg0LFxuICAgIG1hcF94X2JvdW5kYXJpZXM6IFstODQ3NS41ODYxNzM3NywgOTMyNy40OTEyNDU1OV0sXG4gICAgbWFwX3lfYm91bmRhcmllczogWzkwMjguNTI0NzMzMzIsIC04ODM2LjYxNDA2MjY2XVxufVxubWFwQ29uc3RhbnRzLnNjYWxlID0gTWF0aC5hYnMobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0gLSBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSkgLyBtYXBDb25zdGFudHMubWFwX3c7XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ29uc3RhbnRzOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxpZ2h0Ymx1ZToge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDA3RkZGXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjRcbiAgICB9LFxuICAgIHJlZDoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjRcbiAgICB9LFxuICAgIGdyZWVuOiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMwMEZGMDBcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIGZpbGxDb2xvcjogXCIjMDBGRjAwXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAuNFxuICAgIH0sXG4gICAgeWVsbG93OiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiNGRkZGMDBcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIGZpbGxDb2xvcjogXCIjRkZGRjAwXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAuNFxuICAgIH1cbn07IiwidmFyIHRyaW0gPSByZXF1aXJlKCcuL3RyaW0nKTtcblxuZnVuY3Rpb24gZ2V0UGFyYW1ldGVyQnlOYW1lKG5hbWUpIHtcbiAgICBuYW1lID0gbmFtZS5yZXBsYWNlKC9bXFxbXS8sIFwiXFxcXFtcIikucmVwbGFjZSgvW1xcXV0vLCBcIlxcXFxdXCIpO1xuICAgIHZhciByZWdleCA9IG5ldyBSZWdFeHAoXCJbXFxcXD8mXVwiICsgbmFtZSArIFwiPShbXiYjXSopXCIpLFxuICAgICAgICByZXN1bHRzID0gcmVnZXguZXhlYyhsb2NhdGlvbi5zZWFyY2gpO1xuICAgIHJldHVybiByZXN1bHRzID09IG51bGwgPyBcIlwiIDogZGVjb2RlVVJJQ29tcG9uZW50KHJlc3VsdHNbMV0ucmVwbGFjZSgvXFwrL2csIFwiIFwiKSk7XG59XG5cbmZ1bmN0aW9uIHNldFF1ZXJ5U3RyaW5nKGtleSwgdmFsdWUpIHtcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdhZGRRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpICsgJzsnICsgdmFsdWUsICcgOycpO1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgcXMpKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUnLCBrZXksIHZhbHVlKTtcbiAgICB2YXIgcXMgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoa2V5KTtcbiAgICBxcyA9IHRyaW0odHJpbShxcywgJyA7JykucmVwbGFjZSh2YWx1ZSwgJycpLnJlcGxhY2UoLzs7L2csICcnKSwgJyA7Jyk7XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgdXBkYXRlUXVlcnlTdHJpbmcoa2V5LCBxcyAhPSAnJyA/IHFzIDogbnVsbCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHZhbHVlLCB1cmwpIHtcbiAgICBpZiAoIXVybCkgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChcIihbPyZdKVwiICsga2V5ICsgXCI9Lio/KCZ8I3wkKSguKilcIiwgXCJnaVwiKSxcbiAgICAgICAgaGFzaDtcblxuICAgIGlmIChyZS50ZXN0KHVybCkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gdXJsLnJlcGxhY2UocmUsICckMScgKyBrZXkgKyBcIj1cIiArIHZhbHVlICsgJyQyJDMnKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBoYXNoID0gdXJsLnNwbGl0KCcjJyk7XG4gICAgICAgICAgICB1cmwgPSBoYXNoWzBdLnJlcGxhY2UocmUsICckMSQzJykucmVwbGFjZSgvKCZ8XFw/KSQvLCAnJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc2hbMV0gIT09ICd1bmRlZmluZWQnICYmIGhhc2hbMV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgdXJsICs9ICcjJyArIGhhc2hbMV07XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHZhciBzZXBhcmF0b3IgPSB1cmwuaW5kZXhPZignPycpICE9PSAtMSA/ICcmJyA6ICc/JztcbiAgICAgICAgICAgIGhhc2ggPSB1cmwuc3BsaXQoJyMnKTtcbiAgICAgICAgICAgIHVybCA9IGhhc2hbMF0gKyBzZXBhcmF0b3IgKyBrZXkgKyAnPScgKyB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzaFsxXSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzaFsxXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB1cmwgKz0gJyMnICsgaGFzaFsxXTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRQYXJhbWV0ZXJCeU5hbWU6IGdldFBhcmFtZXRlckJ5TmFtZSxcbiAgICBzZXRRdWVyeVN0cmluZzogc2V0UXVlcnlTdHJpbmcsXG4gICAgYWRkUXVlcnlTdHJpbmdWYWx1ZTogYWRkUXVlcnlTdHJpbmdWYWx1ZSxcbiAgICByZW1vdmVRdWVyeVN0cmluZ1ZhbHVlOiByZW1vdmVRdWVyeVN0cmluZ1ZhbHVlLFxuICAgIHVwZGF0ZVF1ZXJ5U3RyaW5nOiB1cGRhdGVRdWVyeVN0cmluZ1xufSIsImZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvW1xcW1xcXSgpe30/KitcXF4kXFxcXC58XFwtXS9nLCBcIlxcXFwkJlwiKTtcbn1cblxudmFyIHRyaW0gPSBmdW5jdGlvbiB0cmltKHN0ciwgY2hhcmFjdGVycywgZmxhZ3MpIHtcbiAgICBmbGFncyA9IGZsYWdzIHx8IFwiZ1wiO1xuICAgIGlmICh0eXBlb2Ygc3RyICE9PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBjaGFyYWN0ZXJzICE9PSBcInN0cmluZ1wiIHx8IHR5cGVvZiBmbGFncyAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXJndW1lbnQgbXVzdCBiZSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgaWYgKCEvXltnaV0qJC8udGVzdChmbGFncykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgZmxhZ3Mgc3VwcGxpZWQgJ1wiICsgZmxhZ3MubWF0Y2gobmV3IFJlZ0V4cChcIlteZ2ldKlwiKSkgKyBcIidcIik7XG4gICAgfVxuXG4gICAgY2hhcmFjdGVycyA9IGVzY2FwZVJlZ2V4KGNoYXJhY3RlcnMpO1xuXG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoXCJeW1wiICsgY2hhcmFjdGVycyArIFwiXSt8W1wiICsgY2hhcmFjdGVycyArIFwiXSskXCIsIGZsYWdzKSwgJycpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB0cmltOyIsInZhciBQTkcgPSByZXF1aXJlKCdwbmctanMnKTtcblxuZnVuY3Rpb24gSW1hZ2VIYW5kbGVyKGltYWdlUGF0aCkge1xuICAgIHRoaXMuaW1hZ2VQYXRoID0gaW1hZ2VQYXRoO1xuICAgIHNlbGYuY2FudmFzID0gbnVsbDtcbiAgICBzZWxmLnBuZyA9IG51bGw7XG59XG5JbWFnZUhhbmRsZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICBzZWxmLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgUE5HLmxvYWQodGhpcy5pbWFnZVBhdGgsIHNlbGYuY2FudmFzLCBmdW5jdGlvbihwbmcpIHtcbiAgICAgICAgc2VsZi5wbmcgPSBwbmc7XG4gICAgICAgIHNlbGYuY3R4ID0gc2VsZi5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xufVxuSW1hZ2VIYW5kbGVyLnByb3RvdHlwZS5zY2FuID0gZnVuY3Rpb24gKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgcGl4ZWxIYW5kbGVyLCBncmlkKSB7XG4gICAgdmFyIGltZ0RhdGEgPSB0aGlzLmN0eC5nZXRJbWFnZURhdGEob2Zmc2V0LCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB2YXIgZGF0YSA9IGltZ0RhdGEuZGF0YTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICB2YXIgciA9IGRhdGFbaV07XG4gICAgICAgIHZhciBnID0gZGF0YVtpKzFdO1xuICAgICAgICB2YXIgYiA9IGRhdGFbaSsyXTtcbiAgICAgICAgdmFyIGFscGhhID0gZGF0YVtpKzNdO1xuICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IoKGkvNCkgJSB3aWR0aCk7XG4gICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcigoaS80KSAvIGhlaWdodCk7XG4gICAgICAgIHBpeGVsSGFuZGxlcih4LCB5LCBbciwgZywgYl0sIGdyaWQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbWFnZUhhbmRsZXI7IiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjQuMFxuXG4vKlxuIyBNSVQgTElDRU5TRVxuIyBDb3B5cmlnaHQgKGMpIDIwMTEgRGV2b24gR292ZXR0XG4jIFxuIyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgXG4jIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSBcbiMgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgXG4jIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyBcbiMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiMgXG4jIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3IgXG4jIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiMgXG4jIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFxuIyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgXG4jIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIFxuIyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIFxuIyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiovXG5cbnZhciBGbGF0ZVN0cmVhbSA9IHJlcXVpcmUoJy4vemxpYicpO1xuXG4gIHZhciBQTkc7XG5cbiAgUE5HID0gKGZ1bmN0aW9uKCkge1xuICAgIFBORy5sb2FkID0gZnVuY3Rpb24odXJsLCBjYW52YXMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgeGhyLFxuICAgICAgICBfdGhpcyA9IHRoaXM7XG4gICAgICBpZiAodHlwZW9mIGNhbnZhcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGNhbnZhcztcbiAgICAgIH1cbiAgICAgIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHVybCwgdHJ1ZSk7XG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSwgcG5nO1xuICAgICAgICBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoeGhyLnJlc3BvbnNlIHx8IHhoci5tb3pSZXNwb25zZUFycmF5QnVmZmVyKTtcbiAgICAgICAgcG5nID0gbmV3IFBORyhkYXRhKTtcbiAgICAgICAgaWYgKHR5cGVvZiAoY2FudmFzICE9IG51bGwgPyBjYW52YXMuZ2V0Q29udGV4dCA6IHZvaWQgMCkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwbmcucmVuZGVyKGNhbnZhcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gY2FsbGJhY2socG5nKSA6IHZvaWQgMDtcbiAgICAgIH07XG4gICAgICByZXR1cm4geGhyLnNlbmQobnVsbCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIFBORyhkYXRhKSB7XG4gICAgICB2YXIgY2h1bmtTaXplLCBjb2xvcnMsIGRlbGF5RGVuLCBkZWxheU51bSwgZnJhbWUsIGksIGluZGV4LCBrZXksIHNlY3Rpb24sIHNob3J0LCB0ZXh0LCBfaSwgX2osIF9yZWY7XG4gICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgdGhpcy5wb3MgPSA4O1xuICAgICAgdGhpcy5wYWxldHRlID0gW107XG4gICAgICB0aGlzLmltZ0RhdGEgPSBbXTtcbiAgICAgIHRoaXMudHJhbnNwYXJlbmN5ID0ge307XG4gICAgICB0aGlzLnRleHQgPSB7fTtcbiAgICAgIGZyYW1lID0gbnVsbDtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGNodW5rU2l6ZSA9IHRoaXMucmVhZFVJbnQzMigpO1xuICAgICAgICBzZWN0aW9uID0gKChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgX2ksIF9yZXN1bHRzO1xuICAgICAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICAgICAgZm9yIChpID0gX2kgPSAwOyBfaSA8IDQ7IGkgPSArK19pKSB7XG4gICAgICAgICAgICBfcmVzdWx0cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5kYXRhW3RoaXMucG9zKytdKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICAgICAgfSkuY2FsbCh0aGlzKSkuam9pbignJyk7XG4gICAgICAgIHN3aXRjaCAoc2VjdGlvbikge1xuICAgICAgICAgIGNhc2UgJ0lIRFInOlxuICAgICAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMucmVhZFVJbnQzMigpO1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLnJlYWRVSW50MzIoKTtcbiAgICAgICAgICAgIHRoaXMuYml0cyA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuY29sb3JUeXBlID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5jb21wcmVzc2lvbk1ldGhvZCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyTWV0aG9kID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5pbnRlcmxhY2VNZXRob2QgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdQTFRFJzpcbiAgICAgICAgICAgIHRoaXMucGFsZXR0ZSA9IHRoaXMucmVhZChjaHVua1NpemUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnSURBVCc6XG4gICAgICAgICAgICBpZiAoc2VjdGlvbiA9PT0gJ2ZkQVQnKSB7XG4gICAgICAgICAgICAgIHRoaXMucG9zICs9IDQ7XG4gICAgICAgICAgICAgIGNodW5rU2l6ZSAtPSA0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YSA9IChmcmFtZSAhPSBudWxsID8gZnJhbWUuZGF0YSA6IHZvaWQgMCkgfHwgdGhpcy5pbWdEYXRhO1xuICAgICAgICAgICAgZm9yIChpID0gX2kgPSAwOyAwIDw9IGNodW5rU2l6ZSA/IF9pIDwgY2h1bmtTaXplIDogX2kgPiBjaHVua1NpemU7IGkgPSAwIDw9IGNodW5rU2l6ZSA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgICAgICAgIGRhdGEucHVzaCh0aGlzLmRhdGFbdGhpcy5wb3MrK10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAndFJOUyc6XG4gICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeSA9IHt9O1xuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kuaW5kZXhlZCA9IHRoaXMucmVhZChjaHVua1NpemUpO1xuICAgICAgICAgICAgICAgIHNob3J0ID0gMjU1IC0gdGhpcy50cmFuc3BhcmVuY3kuaW5kZXhlZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKHNob3J0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgZm9yIChpID0gX2ogPSAwOyAwIDw9IHNob3J0ID8gX2ogPCBzaG9ydCA6IF9qID4gc2hvcnQ7IGkgPSAwIDw9IHNob3J0ID8gKytfaiA6IC0tX2opIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kuaW5kZXhlZC5wdXNoKDI1NSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kuZ3JheXNjYWxlID0gdGhpcy5yZWFkKGNodW5rU2l6ZSlbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5yZ2IgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RFWHQnOlxuICAgICAgICAgICAgdGV4dCA9IHRoaXMucmVhZChjaHVua1NpemUpO1xuICAgICAgICAgICAgaW5kZXggPSB0ZXh0LmluZGV4T2YoMCk7XG4gICAgICAgICAgICBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgdGV4dC5zbGljZSgwLCBpbmRleCkpO1xuICAgICAgICAgICAgdGhpcy50ZXh0W2tleV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgdGV4dC5zbGljZShpbmRleCArIDEpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0lFTkQnOlxuICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uLmZyYW1lcy5wdXNoKGZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29sb3JzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmhhc0FscGhhQ2hhbm5lbCA9IChfcmVmID0gdGhpcy5jb2xvclR5cGUpID09PSA0IHx8IF9yZWYgPT09IDY7XG4gICAgICAgICAgICBjb2xvcnMgPSB0aGlzLmNvbG9ycyArICh0aGlzLmhhc0FscGhhQ2hhbm5lbCA/IDEgOiAwKTtcbiAgICAgICAgICAgIHRoaXMucGl4ZWxCaXRsZW5ndGggPSB0aGlzLmJpdHMgKiBjb2xvcnM7XG4gICAgICAgICAgICB0aGlzLmNvbG9yU3BhY2UgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jb2xvcnMpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ0RldmljZUdyYXknO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnRGV2aWNlUkdCJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaW1nRGF0YSA9IG5ldyBVaW50OEFycmF5KHRoaXMuaW1nRGF0YSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMucG9zICs9IGNodW5rU2l6ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgICAgICBpZiAodGhpcy5wb3MgPiB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW5jb21wbGV0ZSBvciBjb3JydXB0IFBORyBmaWxlXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgUE5HLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIHZhciBpLCBfaSwgX3Jlc3VsdHM7XG4gICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gX2kgPSAwOyAwIDw9IGJ5dGVzID8gX2kgPCBieXRlcyA6IF9pID4gYnl0ZXM7IGkgPSAwIDw9IGJ5dGVzID8gKytfaSA6IC0tX2kpIHtcbiAgICAgICAgX3Jlc3VsdHMucHVzaCh0aGlzLmRhdGFbdGhpcy5wb3MrK10pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLnJlYWRVSW50MzIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiMSwgYjIsIGIzLCBiNDtcbiAgICAgIGIxID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDI0O1xuICAgICAgYjIgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgMTY7XG4gICAgICBiMyA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCA4O1xuICAgICAgYjQgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICByZXR1cm4gYjEgfCBiMiB8IGIzIHwgYjQ7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUucmVhZFVJbnQxNiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGIxLCBiMjtcbiAgICAgIGIxID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDg7XG4gICAgICBiMiA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgIHJldHVybiBiMSB8IGIyO1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmRlY29kZVBpeGVscyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIHZhciBieXRlLCBjLCBjb2wsIGksIGxlZnQsIGxlbmd0aCwgcCwgcGEsIHBhZXRoLCBwYiwgcGMsIHBpeGVsQnl0ZXMsIHBpeGVscywgcG9zLCByb3csIHNjYW5saW5lTGVuZ3RoLCB1cHBlciwgdXBwZXJMZWZ0LCBfaSwgX2osIF9rLCBfbCwgX207XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgIGRhdGEgPSB0aGlzLmltZ0RhdGE7XG4gICAgICB9XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KDApO1xuICAgICAgfVxuICAgICAgZGF0YSA9IG5ldyBGbGF0ZVN0cmVhbShkYXRhKTtcbiAgICAgIGRhdGEgPSBkYXRhLmdldEJ5dGVzKCk7XG4gICAgICBwaXhlbEJ5dGVzID0gdGhpcy5waXhlbEJpdGxlbmd0aCAvIDg7XG4gICAgICBzY2FubGluZUxlbmd0aCA9IHBpeGVsQnl0ZXMgKiB0aGlzLndpZHRoO1xuICAgICAgcGl4ZWxzID0gbmV3IFVpbnQ4QXJyYXkoc2NhbmxpbmVMZW5ndGggKiB0aGlzLmhlaWdodCk7XG4gICAgICBsZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIHJvdyA9IDA7XG4gICAgICBwb3MgPSAwO1xuICAgICAgYyA9IDA7XG4gICAgICB3aGlsZSAocG9zIDwgbGVuZ3RoKSB7XG4gICAgICAgIHN3aXRjaCAoZGF0YVtwb3MrK10pIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBmb3IgKGkgPSBfaSA9IDA7IF9pIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfaSArPSAxKSB7XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBmb3IgKGkgPSBfaiA9IDA7IF9qIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfaiArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgbGVmdCA9IGkgPCBwaXhlbEJ5dGVzID8gMCA6IHBpeGVsc1tjIC0gcGl4ZWxCeXRlc107XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKGJ5dGUgKyBsZWZ0KSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGZvciAoaSA9IF9rID0gMDsgX2sgPCBzY2FubGluZUxlbmd0aDsgaSA9IF9rICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBjb2wgPSAoaSAtIChpICUgcGl4ZWxCeXRlcykpIC8gcGl4ZWxCeXRlcztcbiAgICAgICAgICAgICAgdXBwZXIgPSByb3cgJiYgcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgY29sICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9ICh1cHBlciArIGJ5dGUpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZm9yIChpID0gX2wgPSAwOyBfbCA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2wgKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGNvbCA9IChpIC0gKGkgJSBwaXhlbEJ5dGVzKSkgLyBwaXhlbEJ5dGVzO1xuICAgICAgICAgICAgICBsZWZ0ID0gaSA8IHBpeGVsQnl0ZXMgPyAwIDogcGl4ZWxzW2MgLSBwaXhlbEJ5dGVzXTtcbiAgICAgICAgICAgICAgdXBwZXIgPSByb3cgJiYgcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgY29sICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IChieXRlICsgTWF0aC5mbG9vcigobGVmdCArIHVwcGVyKSAvIDIpKSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIGZvciAoaSA9IF9tID0gMDsgX20gPCBzY2FubGluZUxlbmd0aDsgaSA9IF9tICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBjb2wgPSAoaSAtIChpICUgcGl4ZWxCeXRlcykpIC8gcGl4ZWxCeXRlcztcbiAgICAgICAgICAgICAgbGVmdCA9IGkgPCBwaXhlbEJ5dGVzID8gMCA6IHBpeGVsc1tjIC0gcGl4ZWxCeXRlc107XG4gICAgICAgICAgICAgIGlmIChyb3cgPT09IDApIHtcbiAgICAgICAgICAgICAgICB1cHBlciA9IHVwcGVyTGVmdCA9IDA7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXBwZXIgPSBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyBjb2wgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgICAgdXBwZXJMZWZ0ID0gY29sICYmIHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIChjb2wgLSAxKSAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwID0gbGVmdCArIHVwcGVyIC0gdXBwZXJMZWZ0O1xuICAgICAgICAgICAgICBwYSA9IE1hdGguYWJzKHAgLSBsZWZ0KTtcbiAgICAgICAgICAgICAgcGIgPSBNYXRoLmFicyhwIC0gdXBwZXIpO1xuICAgICAgICAgICAgICBwYyA9IE1hdGguYWJzKHAgLSB1cHBlckxlZnQpO1xuICAgICAgICAgICAgICBpZiAocGEgPD0gcGIgJiYgcGEgPD0gcGMpIHtcbiAgICAgICAgICAgICAgICBwYWV0aCA9IGxlZnQ7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocGIgPD0gcGMpIHtcbiAgICAgICAgICAgICAgICBwYWV0aCA9IHVwcGVyO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhZXRoID0gdXBwZXJMZWZ0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKGJ5dGUgKyBwYWV0aCkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmaWx0ZXIgYWxnb3JpdGhtOiBcIiArIGRhdGFbcG9zIC0gMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJvdysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBpeGVscztcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5kZWNvZGVQYWxldHRlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYywgaSwgbGVuZ3RoLCBwYWxldHRlLCBwb3MsIHJldCwgdHJhbnNwYXJlbmN5LCBfaSwgX3JlZiwgX3JlZjE7XG4gICAgICBwYWxldHRlID0gdGhpcy5wYWxldHRlO1xuICAgICAgdHJhbnNwYXJlbmN5ID0gdGhpcy50cmFuc3BhcmVuY3kuaW5kZXhlZCB8fCBbXTtcbiAgICAgIHJldCA9IG5ldyBVaW50OEFycmF5KCh0cmFuc3BhcmVuY3kubGVuZ3RoIHx8IDApICsgcGFsZXR0ZS5sZW5ndGgpO1xuICAgICAgcG9zID0gMDtcbiAgICAgIGxlbmd0aCA9IHBhbGV0dGUubGVuZ3RoO1xuICAgICAgYyA9IDA7XG4gICAgICBmb3IgKGkgPSBfaSA9IDAsIF9yZWYgPSBwYWxldHRlLmxlbmd0aDsgX2kgPCBfcmVmOyBpID0gX2kgKz0gMykge1xuICAgICAgICByZXRbcG9zKytdID0gcGFsZXR0ZVtpXTtcbiAgICAgICAgcmV0W3BvcysrXSA9IHBhbGV0dGVbaSArIDFdO1xuICAgICAgICByZXRbcG9zKytdID0gcGFsZXR0ZVtpICsgMl07XG4gICAgICAgIHJldFtwb3MrK10gPSAoX3JlZjEgPSB0cmFuc3BhcmVuY3lbYysrXSkgIT0gbnVsbCA/IF9yZWYxIDogMjU1O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5jb3B5VG9JbWFnZURhdGEgPSBmdW5jdGlvbihpbWFnZURhdGEsIHBpeGVscykge1xuICAgICAgdmFyIGFscGhhLCBjb2xvcnMsIGRhdGEsIGksIGlucHV0LCBqLCBrLCBsZW5ndGgsIHBhbGV0dGUsIHYsIF9yZWY7XG4gICAgICBjb2xvcnMgPSB0aGlzLmNvbG9ycztcbiAgICAgIHBhbGV0dGUgPSBudWxsO1xuICAgICAgYWxwaGEgPSB0aGlzLmhhc0FscGhhQ2hhbm5lbDtcbiAgICAgIGlmICh0aGlzLnBhbGV0dGUubGVuZ3RoKSB7XG4gICAgICAgIHBhbGV0dGUgPSAoX3JlZiA9IHRoaXMuX2RlY29kZWRQYWxldHRlKSAhPSBudWxsID8gX3JlZiA6IHRoaXMuX2RlY29kZWRQYWxldHRlID0gdGhpcy5kZWNvZGVQYWxldHRlKCk7XG4gICAgICAgIGNvbG9ycyA9IDQ7XG4gICAgICAgIGFscGhhID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGRhdGEgPSBpbWFnZURhdGEuZGF0YSB8fCBpbWFnZURhdGE7XG4gICAgICBsZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIGlucHV0ID0gcGFsZXR0ZSB8fCBwaXhlbHM7XG4gICAgICBpID0gaiA9IDA7XG4gICAgICBpZiAoY29sb3JzID09PSAxKSB7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgayA9IHBhbGV0dGUgPyBwaXhlbHNbaSAvIDRdICogNCA6IGo7XG4gICAgICAgICAgdiA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gdjtcbiAgICAgICAgICBkYXRhW2krK10gPSB2O1xuICAgICAgICAgIGRhdGFbaSsrXSA9IHY7XG4gICAgICAgICAgZGF0YVtpKytdID0gYWxwaGEgPyBpbnB1dFtrKytdIDogMjU1O1xuICAgICAgICAgIGogPSBrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICAgIGsgPSBwYWxldHRlID8gcGl4ZWxzW2kgLyA0XSAqIDQgOiBqO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGFscGhhID8gaW5wdXRbaysrXSA6IDI1NTtcbiAgICAgICAgICBqID0gaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJldDtcbiAgICAgIHJldCA9IG5ldyBVaW50OEFycmF5KHRoaXMud2lkdGggKiB0aGlzLmhlaWdodCAqIDQpO1xuICAgICAgdGhpcy5jb3B5VG9JbWFnZURhdGEocmV0LCB0aGlzLmRlY29kZVBpeGVscygpKTtcbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgICB2YXIgY3R4LCBkYXRhO1xuICAgICAgY2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcbiAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICB0aGlzLmNvcHlUb0ltYWdlRGF0YShkYXRhLCB0aGlzLmRlY29kZVBpeGVscygpKTtcbiAgICAgIHJldHVybiBjdHgucHV0SW1hZ2VEYXRhKGRhdGEsIDAsIDApO1xuICAgIH07XG5cbiAgICByZXR1cm4gUE5HO1xuXG4gIH0pKCk7XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBQTkc7IiwiLypcbiAqIEV4dHJhY3RlZCBmcm9tIHBkZi5qc1xuICogaHR0cHM6Ly9naXRodWIuY29tL2FuZHJlYXNnYWwvcGRmLmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDExIE1vemlsbGEgRm91bmRhdGlvblxuICpcbiAqIENvbnRyaWJ1dG9yczogQW5kcmVhcyBHYWwgPGdhbEBtb3ppbGxhLmNvbT5cbiAqICAgICAgICAgICAgICAgQ2hyaXMgRyBKb25lcyA8Y2pvbmVzQG1vemlsbGEuY29tPlxuICogICAgICAgICAgICAgICBTaGFvbiBCYXJtYW4gPHNoYW9uLmJhcm1hbkBnbWFpbC5jb20+XG4gKiAgICAgICAgICAgICAgIFZpdmllbiBOaWNvbGFzIDwyMUB2aW5ndGV0dW4ub3JnPlxuICogICAgICAgICAgICAgICBKdXN0aW4gRCdBcmNhbmdlbG8gPGp1c3RpbmRhcmNAZ21haWwuY29tPlxuICogICAgICAgICAgICAgICBZdXJ5IERlbGVuZGlrXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbiAqIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSxcbiAqIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb25cbiAqIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLFxuICogYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMXG4gKiBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAqIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVJcbiAqIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG52YXIgRGVjb2RlU3RyZWFtID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBvcyA9IDA7XG4gICAgdGhpcy5idWZmZXJMZW5ndGggPSAwO1xuICAgIHRoaXMuZW9mID0gZmFsc2U7XG4gICAgdGhpcy5idWZmZXIgPSBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0ge1xuICAgIGVuc3VyZUJ1ZmZlcjogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2Vuc3VyZUJ1ZmZlcihyZXF1ZXN0ZWQpIHtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICAgIHZhciBjdXJyZW50ID0gYnVmZmVyID8gYnVmZmVyLmJ5dGVMZW5ndGggOiAwO1xuICAgICAgaWYgKHJlcXVlc3RlZCA8IGN1cnJlbnQpXG4gICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICB2YXIgc2l6ZSA9IDUxMjtcbiAgICAgIHdoaWxlIChzaXplIDwgcmVxdWVzdGVkKVxuICAgICAgICBzaXplIDw8PSAxO1xuICAgICAgdmFyIGJ1ZmZlcjIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudDsgKytpKVxuICAgICAgICBidWZmZXIyW2ldID0gYnVmZmVyW2ldO1xuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyID0gYnVmZmVyMjtcbiAgICB9LFxuICAgIGdldEJ5dGU6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9nZXRCeXRlKCkge1xuICAgICAgdmFyIHBvcyA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IHBvcykge1xuICAgICAgICBpZiAodGhpcy5lb2YpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5idWZmZXJbdGhpcy5wb3MrK107XG4gICAgfSxcbiAgICBnZXRCeXRlczogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2dldEJ5dGVzKGxlbmd0aCkge1xuICAgICAgdmFyIHBvcyA9IHRoaXMucG9zO1xuXG4gICAgICBpZiAobGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZW5zdXJlQnVmZmVyKHBvcyArIGxlbmd0aCk7XG4gICAgICAgIHZhciBlbmQgPSBwb3MgKyBsZW5ndGg7XG5cbiAgICAgICAgd2hpbGUgKCF0aGlzLmVvZiAmJiB0aGlzLmJ1ZmZlckxlbmd0aCA8IGVuZClcbiAgICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuXG4gICAgICAgIHZhciBidWZFbmQgPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgICAgaWYgKGVuZCA+IGJ1ZkVuZClcbiAgICAgICAgICBlbmQgPSBidWZFbmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoIXRoaXMuZW9mKVxuICAgICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG5cbiAgICAgICAgdmFyIGVuZCA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcyA9IGVuZDtcbiAgICAgIHJldHVybiB0aGlzLmJ1ZmZlci5zdWJhcnJheShwb3MsIGVuZCk7XG4gICAgfSxcbiAgICBsb29rQ2hhcjogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2xvb2tDaGFyKCkge1xuICAgICAgdmFyIHBvcyA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IHBvcykge1xuICAgICAgICBpZiAodGhpcy5lb2YpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ1ZmZlclt0aGlzLnBvc10pO1xuICAgIH0sXG4gICAgZ2V0Q2hhcjogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2dldENoYXIoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLmVvZilcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuYnVmZmVyW3RoaXMucG9zKytdKTtcbiAgICB9LFxuICAgIG1ha2VTdWJTdHJlYW06IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9tYWtlU3Vic3RyZWFtKHN0YXJ0LCBsZW5ndGgsIGRpY3QpIHtcbiAgICAgIHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBlbmQgJiYgIXRoaXMuZW9mKVxuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgcmV0dXJuIG5ldyBTdHJlYW0odGhpcy5idWZmZXIsIHN0YXJ0LCBsZW5ndGgsIGRpY3QpO1xuICAgIH0sXG4gICAgc2tpcDogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX3NraXAobikge1xuICAgICAgaWYgKCFuKVxuICAgICAgICBuID0gMTtcbiAgICAgIHRoaXMucG9zICs9IG47XG4gICAgfSxcbiAgICByZXNldDogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX3Jlc2V0KCkge1xuICAgICAgdGhpcy5wb3MgPSAwO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gY29uc3RydWN0b3I7XG59KSgpO1xuXG52YXIgRmxhdGVTdHJlYW0gPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBjb2RlTGVuQ29kZU1hcCA9IG5ldyBVaW50MzJBcnJheShbXG4gICAgMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNVxuICBdKTtcblxuICB2YXIgbGVuZ3RoRGVjb2RlID0gbmV3IFVpbnQzMkFycmF5KFtcbiAgICAweDAwMDAzLCAweDAwMDA0LCAweDAwMDA1LCAweDAwMDA2LCAweDAwMDA3LCAweDAwMDA4LCAweDAwMDA5LCAweDAwMDBhLFxuICAgIDB4MTAwMGIsIDB4MTAwMGQsIDB4MTAwMGYsIDB4MTAwMTEsIDB4MjAwMTMsIDB4MjAwMTcsIDB4MjAwMWIsIDB4MjAwMWYsXG4gICAgMHgzMDAyMywgMHgzMDAyYiwgMHgzMDAzMywgMHgzMDAzYiwgMHg0MDA0MywgMHg0MDA1MywgMHg0MDA2MywgMHg0MDA3MyxcbiAgICAweDUwMDgzLCAweDUwMGEzLCAweDUwMGMzLCAweDUwMGUzLCAweDAwMTAyLCAweDAwMTAyLCAweDAwMTAyXG4gIF0pO1xuXG4gIHZhciBkaXN0RGVjb2RlID0gbmV3IFVpbnQzMkFycmF5KFtcbiAgICAweDAwMDAxLCAweDAwMDAyLCAweDAwMDAzLCAweDAwMDA0LCAweDEwMDA1LCAweDEwMDA3LCAweDIwMDA5LCAweDIwMDBkLFxuICAgIDB4MzAwMTEsIDB4MzAwMTksIDB4NDAwMjEsIDB4NDAwMzEsIDB4NTAwNDEsIDB4NTAwNjEsIDB4NjAwODEsIDB4NjAwYzEsXG4gICAgMHg3MDEwMSwgMHg3MDE4MSwgMHg4MDIwMSwgMHg4MDMwMSwgMHg5MDQwMSwgMHg5MDYwMSwgMHhhMDgwMSwgMHhhMGMwMSxcbiAgICAweGIxMDAxLCAweGIxODAxLCAweGMyMDAxLCAweGMzMDAxLCAweGQ0MDAxLCAweGQ2MDAxXG4gIF0pO1xuXG4gIHZhciBmaXhlZExpdENvZGVUYWIgPSBbbmV3IFVpbnQzMkFycmF5KFtcbiAgICAweDcwMTAwLCAweDgwMDUwLCAweDgwMDEwLCAweDgwMTE4LCAweDcwMTEwLCAweDgwMDcwLCAweDgwMDMwLCAweDkwMGMwLFxuICAgIDB4NzAxMDgsIDB4ODAwNjAsIDB4ODAwMjAsIDB4OTAwYTAsIDB4ODAwMDAsIDB4ODAwODAsIDB4ODAwNDAsIDB4OTAwZTAsXG4gICAgMHg3MDEwNCwgMHg4MDA1OCwgMHg4MDAxOCwgMHg5MDA5MCwgMHg3MDExNCwgMHg4MDA3OCwgMHg4MDAzOCwgMHg5MDBkMCxcbiAgICAweDcwMTBjLCAweDgwMDY4LCAweDgwMDI4LCAweDkwMGIwLCAweDgwMDA4LCAweDgwMDg4LCAweDgwMDQ4LCAweDkwMGYwLFxuICAgIDB4NzAxMDIsIDB4ODAwNTQsIDB4ODAwMTQsIDB4ODAxMWMsIDB4NzAxMTIsIDB4ODAwNzQsIDB4ODAwMzQsIDB4OTAwYzgsXG4gICAgMHg3MDEwYSwgMHg4MDA2NCwgMHg4MDAyNCwgMHg5MDBhOCwgMHg4MDAwNCwgMHg4MDA4NCwgMHg4MDA0NCwgMHg5MDBlOCxcbiAgICAweDcwMTA2LCAweDgwMDVjLCAweDgwMDFjLCAweDkwMDk4LCAweDcwMTE2LCAweDgwMDdjLCAweDgwMDNjLCAweDkwMGQ4LFxuICAgIDB4NzAxMGUsIDB4ODAwNmMsIDB4ODAwMmMsIDB4OTAwYjgsIDB4ODAwMGMsIDB4ODAwOGMsIDB4ODAwNGMsIDB4OTAwZjgsXG4gICAgMHg3MDEwMSwgMHg4MDA1MiwgMHg4MDAxMiwgMHg4MDExYSwgMHg3MDExMSwgMHg4MDA3MiwgMHg4MDAzMiwgMHg5MDBjNCxcbiAgICAweDcwMTA5LCAweDgwMDYyLCAweDgwMDIyLCAweDkwMGE0LCAweDgwMDAyLCAweDgwMDgyLCAweDgwMDQyLCAweDkwMGU0LFxuICAgIDB4NzAxMDUsIDB4ODAwNWEsIDB4ODAwMWEsIDB4OTAwOTQsIDB4NzAxMTUsIDB4ODAwN2EsIDB4ODAwM2EsIDB4OTAwZDQsXG4gICAgMHg3MDEwZCwgMHg4MDA2YSwgMHg4MDAyYSwgMHg5MDBiNCwgMHg4MDAwYSwgMHg4MDA4YSwgMHg4MDA0YSwgMHg5MDBmNCxcbiAgICAweDcwMTAzLCAweDgwMDU2LCAweDgwMDE2LCAweDgwMTFlLCAweDcwMTEzLCAweDgwMDc2LCAweDgwMDM2LCAweDkwMGNjLFxuICAgIDB4NzAxMGIsIDB4ODAwNjYsIDB4ODAwMjYsIDB4OTAwYWMsIDB4ODAwMDYsIDB4ODAwODYsIDB4ODAwNDYsIDB4OTAwZWMsXG4gICAgMHg3MDEwNywgMHg4MDA1ZSwgMHg4MDAxZSwgMHg5MDA5YywgMHg3MDExNywgMHg4MDA3ZSwgMHg4MDAzZSwgMHg5MDBkYyxcbiAgICAweDcwMTBmLCAweDgwMDZlLCAweDgwMDJlLCAweDkwMGJjLCAweDgwMDBlLCAweDgwMDhlLCAweDgwMDRlLCAweDkwMGZjLFxuICAgIDB4NzAxMDAsIDB4ODAwNTEsIDB4ODAwMTEsIDB4ODAxMTksIDB4NzAxMTAsIDB4ODAwNzEsIDB4ODAwMzEsIDB4OTAwYzIsXG4gICAgMHg3MDEwOCwgMHg4MDA2MSwgMHg4MDAyMSwgMHg5MDBhMiwgMHg4MDAwMSwgMHg4MDA4MSwgMHg4MDA0MSwgMHg5MDBlMixcbiAgICAweDcwMTA0LCAweDgwMDU5LCAweDgwMDE5LCAweDkwMDkyLCAweDcwMTE0LCAweDgwMDc5LCAweDgwMDM5LCAweDkwMGQyLFxuICAgIDB4NzAxMGMsIDB4ODAwNjksIDB4ODAwMjksIDB4OTAwYjIsIDB4ODAwMDksIDB4ODAwODksIDB4ODAwNDksIDB4OTAwZjIsXG4gICAgMHg3MDEwMiwgMHg4MDA1NSwgMHg4MDAxNSwgMHg4MDExZCwgMHg3MDExMiwgMHg4MDA3NSwgMHg4MDAzNSwgMHg5MDBjYSxcbiAgICAweDcwMTBhLCAweDgwMDY1LCAweDgwMDI1LCAweDkwMGFhLCAweDgwMDA1LCAweDgwMDg1LCAweDgwMDQ1LCAweDkwMGVhLFxuICAgIDB4NzAxMDYsIDB4ODAwNWQsIDB4ODAwMWQsIDB4OTAwOWEsIDB4NzAxMTYsIDB4ODAwN2QsIDB4ODAwM2QsIDB4OTAwZGEsXG4gICAgMHg3MDEwZSwgMHg4MDA2ZCwgMHg4MDAyZCwgMHg5MDBiYSwgMHg4MDAwZCwgMHg4MDA4ZCwgMHg4MDA0ZCwgMHg5MDBmYSxcbiAgICAweDcwMTAxLCAweDgwMDUzLCAweDgwMDEzLCAweDgwMTFiLCAweDcwMTExLCAweDgwMDczLCAweDgwMDMzLCAweDkwMGM2LFxuICAgIDB4NzAxMDksIDB4ODAwNjMsIDB4ODAwMjMsIDB4OTAwYTYsIDB4ODAwMDMsIDB4ODAwODMsIDB4ODAwNDMsIDB4OTAwZTYsXG4gICAgMHg3MDEwNSwgMHg4MDA1YiwgMHg4MDAxYiwgMHg5MDA5NiwgMHg3MDExNSwgMHg4MDA3YiwgMHg4MDAzYiwgMHg5MDBkNixcbiAgICAweDcwMTBkLCAweDgwMDZiLCAweDgwMDJiLCAweDkwMGI2LCAweDgwMDBiLCAweDgwMDhiLCAweDgwMDRiLCAweDkwMGY2LFxuICAgIDB4NzAxMDMsIDB4ODAwNTcsIDB4ODAwMTcsIDB4ODAxMWYsIDB4NzAxMTMsIDB4ODAwNzcsIDB4ODAwMzcsIDB4OTAwY2UsXG4gICAgMHg3MDEwYiwgMHg4MDA2NywgMHg4MDAyNywgMHg5MDBhZSwgMHg4MDAwNywgMHg4MDA4NywgMHg4MDA0NywgMHg5MDBlZSxcbiAgICAweDcwMTA3LCAweDgwMDVmLCAweDgwMDFmLCAweDkwMDllLCAweDcwMTE3LCAweDgwMDdmLCAweDgwMDNmLCAweDkwMGRlLFxuICAgIDB4NzAxMGYsIDB4ODAwNmYsIDB4ODAwMmYsIDB4OTAwYmUsIDB4ODAwMGYsIDB4ODAwOGYsIDB4ODAwNGYsIDB4OTAwZmUsXG4gICAgMHg3MDEwMCwgMHg4MDA1MCwgMHg4MDAxMCwgMHg4MDExOCwgMHg3MDExMCwgMHg4MDA3MCwgMHg4MDAzMCwgMHg5MDBjMSxcbiAgICAweDcwMTA4LCAweDgwMDYwLCAweDgwMDIwLCAweDkwMGExLCAweDgwMDAwLCAweDgwMDgwLCAweDgwMDQwLCAweDkwMGUxLFxuICAgIDB4NzAxMDQsIDB4ODAwNTgsIDB4ODAwMTgsIDB4OTAwOTEsIDB4NzAxMTQsIDB4ODAwNzgsIDB4ODAwMzgsIDB4OTAwZDEsXG4gICAgMHg3MDEwYywgMHg4MDA2OCwgMHg4MDAyOCwgMHg5MDBiMSwgMHg4MDAwOCwgMHg4MDA4OCwgMHg4MDA0OCwgMHg5MDBmMSxcbiAgICAweDcwMTAyLCAweDgwMDU0LCAweDgwMDE0LCAweDgwMTFjLCAweDcwMTEyLCAweDgwMDc0LCAweDgwMDM0LCAweDkwMGM5LFxuICAgIDB4NzAxMGEsIDB4ODAwNjQsIDB4ODAwMjQsIDB4OTAwYTksIDB4ODAwMDQsIDB4ODAwODQsIDB4ODAwNDQsIDB4OTAwZTksXG4gICAgMHg3MDEwNiwgMHg4MDA1YywgMHg4MDAxYywgMHg5MDA5OSwgMHg3MDExNiwgMHg4MDA3YywgMHg4MDAzYywgMHg5MDBkOSxcbiAgICAweDcwMTBlLCAweDgwMDZjLCAweDgwMDJjLCAweDkwMGI5LCAweDgwMDBjLCAweDgwMDhjLCAweDgwMDRjLCAweDkwMGY5LFxuICAgIDB4NzAxMDEsIDB4ODAwNTIsIDB4ODAwMTIsIDB4ODAxMWEsIDB4NzAxMTEsIDB4ODAwNzIsIDB4ODAwMzIsIDB4OTAwYzUsXG4gICAgMHg3MDEwOSwgMHg4MDA2MiwgMHg4MDAyMiwgMHg5MDBhNSwgMHg4MDAwMiwgMHg4MDA4MiwgMHg4MDA0MiwgMHg5MDBlNSxcbiAgICAweDcwMTA1LCAweDgwMDVhLCAweDgwMDFhLCAweDkwMDk1LCAweDcwMTE1LCAweDgwMDdhLCAweDgwMDNhLCAweDkwMGQ1LFxuICAgIDB4NzAxMGQsIDB4ODAwNmEsIDB4ODAwMmEsIDB4OTAwYjUsIDB4ODAwMGEsIDB4ODAwOGEsIDB4ODAwNGEsIDB4OTAwZjUsXG4gICAgMHg3MDEwMywgMHg4MDA1NiwgMHg4MDAxNiwgMHg4MDExZSwgMHg3MDExMywgMHg4MDA3NiwgMHg4MDAzNiwgMHg5MDBjZCxcbiAgICAweDcwMTBiLCAweDgwMDY2LCAweDgwMDI2LCAweDkwMGFkLCAweDgwMDA2LCAweDgwMDg2LCAweDgwMDQ2LCAweDkwMGVkLFxuICAgIDB4NzAxMDcsIDB4ODAwNWUsIDB4ODAwMWUsIDB4OTAwOWQsIDB4NzAxMTcsIDB4ODAwN2UsIDB4ODAwM2UsIDB4OTAwZGQsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZSwgMHg4MDAyZSwgMHg5MDBiZCwgMHg4MDAwZSwgMHg4MDA4ZSwgMHg4MDA0ZSwgMHg5MDBmZCxcbiAgICAweDcwMTAwLCAweDgwMDUxLCAweDgwMDExLCAweDgwMTE5LCAweDcwMTEwLCAweDgwMDcxLCAweDgwMDMxLCAweDkwMGMzLFxuICAgIDB4NzAxMDgsIDB4ODAwNjEsIDB4ODAwMjEsIDB4OTAwYTMsIDB4ODAwMDEsIDB4ODAwODEsIDB4ODAwNDEsIDB4OTAwZTMsXG4gICAgMHg3MDEwNCwgMHg4MDA1OSwgMHg4MDAxOSwgMHg5MDA5MywgMHg3MDExNCwgMHg4MDA3OSwgMHg4MDAzOSwgMHg5MDBkMyxcbiAgICAweDcwMTBjLCAweDgwMDY5LCAweDgwMDI5LCAweDkwMGIzLCAweDgwMDA5LCAweDgwMDg5LCAweDgwMDQ5LCAweDkwMGYzLFxuICAgIDB4NzAxMDIsIDB4ODAwNTUsIDB4ODAwMTUsIDB4ODAxMWQsIDB4NzAxMTIsIDB4ODAwNzUsIDB4ODAwMzUsIDB4OTAwY2IsXG4gICAgMHg3MDEwYSwgMHg4MDA2NSwgMHg4MDAyNSwgMHg5MDBhYiwgMHg4MDAwNSwgMHg4MDA4NSwgMHg4MDA0NSwgMHg5MDBlYixcbiAgICAweDcwMTA2LCAweDgwMDVkLCAweDgwMDFkLCAweDkwMDliLCAweDcwMTE2LCAweDgwMDdkLCAweDgwMDNkLCAweDkwMGRiLFxuICAgIDB4NzAxMGUsIDB4ODAwNmQsIDB4ODAwMmQsIDB4OTAwYmIsIDB4ODAwMGQsIDB4ODAwOGQsIDB4ODAwNGQsIDB4OTAwZmIsXG4gICAgMHg3MDEwMSwgMHg4MDA1MywgMHg4MDAxMywgMHg4MDExYiwgMHg3MDExMSwgMHg4MDA3MywgMHg4MDAzMywgMHg5MDBjNyxcbiAgICAweDcwMTA5LCAweDgwMDYzLCAweDgwMDIzLCAweDkwMGE3LCAweDgwMDAzLCAweDgwMDgzLCAweDgwMDQzLCAweDkwMGU3LFxuICAgIDB4NzAxMDUsIDB4ODAwNWIsIDB4ODAwMWIsIDB4OTAwOTcsIDB4NzAxMTUsIDB4ODAwN2IsIDB4ODAwM2IsIDB4OTAwZDcsXG4gICAgMHg3MDEwZCwgMHg4MDA2YiwgMHg4MDAyYiwgMHg5MDBiNywgMHg4MDAwYiwgMHg4MDA4YiwgMHg4MDA0YiwgMHg5MDBmNyxcbiAgICAweDcwMTAzLCAweDgwMDU3LCAweDgwMDE3LCAweDgwMTFmLCAweDcwMTEzLCAweDgwMDc3LCAweDgwMDM3LCAweDkwMGNmLFxuICAgIDB4NzAxMGIsIDB4ODAwNjcsIDB4ODAwMjcsIDB4OTAwYWYsIDB4ODAwMDcsIDB4ODAwODcsIDB4ODAwNDcsIDB4OTAwZWYsXG4gICAgMHg3MDEwNywgMHg4MDA1ZiwgMHg4MDAxZiwgMHg5MDA5ZiwgMHg3MDExNywgMHg4MDA3ZiwgMHg4MDAzZiwgMHg5MDBkZixcbiAgICAweDcwMTBmLCAweDgwMDZmLCAweDgwMDJmLCAweDkwMGJmLCAweDgwMDBmLCAweDgwMDhmLCAweDgwMDRmLCAweDkwMGZmXG4gIF0pLCA5XTtcblxuICB2YXIgZml4ZWREaXN0Q29kZVRhYiA9IFtuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4NTAwMDAsIDB4NTAwMTAsIDB4NTAwMDgsIDB4NTAwMTgsIDB4NTAwMDQsIDB4NTAwMTQsIDB4NTAwMGMsIDB4NTAwMWMsXG4gICAgMHg1MDAwMiwgMHg1MDAxMiwgMHg1MDAwYSwgMHg1MDAxYSwgMHg1MDAwNiwgMHg1MDAxNiwgMHg1MDAwZSwgMHgwMDAwMCxcbiAgICAweDUwMDAxLCAweDUwMDExLCAweDUwMDA5LCAweDUwMDE5LCAweDUwMDA1LCAweDUwMDE1LCAweDUwMDBkLCAweDUwMDFkLFxuICAgIDB4NTAwMDMsIDB4NTAwMTMsIDB4NTAwMGIsIDB4NTAwMWIsIDB4NTAwMDcsIDB4NTAwMTcsIDB4NTAwMGYsIDB4MDAwMDBcbiAgXSksIDVdO1xuICBcbiAgZnVuY3Rpb24gZXJyb3IoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGUpXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdHJ1Y3RvcihieXRlcykge1xuICAgIC8vdmFyIGJ5dGVzID0gc3RyZWFtLmdldEJ5dGVzKCk7XG4gICAgdmFyIGJ5dGVzUG9zID0gMDtcblxuICAgIHZhciBjbWYgPSBieXRlc1tieXRlc1BvcysrXTtcbiAgICB2YXIgZmxnID0gYnl0ZXNbYnl0ZXNQb3MrK107XG4gICAgaWYgKGNtZiA9PSAtMSB8fCBmbGcgPT0gLTEpXG4gICAgICBlcnJvcignSW52YWxpZCBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgaWYgKChjbWYgJiAweDBmKSAhPSAweDA4KVxuICAgICAgZXJyb3IoJ1Vua25vd24gY29tcHJlc3Npb24gbWV0aG9kIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIGlmICgoKChjbWYgPDwgOCkgKyBmbGcpICUgMzEpICE9IDApXG4gICAgICBlcnJvcignQmFkIEZDSEVDSyBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICBpZiAoZmxnICYgMHgyMClcbiAgICAgIGVycm9yKCdGRElDVCBiaXQgc2V0IGluIGZsYXRlIHN0cmVhbScpO1xuXG4gICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xuICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcblxuICAgIHRoaXMuY29kZVNpemUgPSAwO1xuICAgIHRoaXMuY29kZUJ1ZiA9IDA7XG5cbiAgICBEZWNvZGVTdHJlYW0uY2FsbCh0aGlzKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRGVjb2RlU3RyZWFtLnByb3RvdHlwZSk7XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmdldEJpdHMgPSBmdW5jdGlvbihiaXRzKSB7XG4gICAgdmFyIGNvZGVTaXplID0gdGhpcy5jb2RlU2l6ZTtcbiAgICB2YXIgY29kZUJ1ZiA9IHRoaXMuY29kZUJ1ZjtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzO1xuICAgIHZhciBieXRlc1BvcyA9IHRoaXMuYnl0ZXNQb3M7XG5cbiAgICB2YXIgYjtcbiAgICB3aGlsZSAoY29kZVNpemUgPCBiaXRzKSB7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGVuY29kaW5nIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgY29kZUJ1ZiB8PSBiIDw8IGNvZGVTaXplO1xuICAgICAgY29kZVNpemUgKz0gODtcbiAgICB9XG4gICAgYiA9IGNvZGVCdWYgJiAoKDEgPDwgYml0cykgLSAxKTtcbiAgICB0aGlzLmNvZGVCdWYgPSBjb2RlQnVmID4+IGJpdHM7XG4gICAgdGhpcy5jb2RlU2l6ZSA9IGNvZGVTaXplIC09IGJpdHM7XG4gICAgdGhpcy5ieXRlc1BvcyA9IGJ5dGVzUG9zO1xuICAgIHJldHVybiBiO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRDb2RlID0gZnVuY3Rpb24odGFibGUpIHtcbiAgICB2YXIgY29kZXMgPSB0YWJsZVswXTtcbiAgICB2YXIgbWF4TGVuID0gdGFibGVbMV07XG4gICAgdmFyIGNvZGVTaXplID0gdGhpcy5jb2RlU2l6ZTtcbiAgICB2YXIgY29kZUJ1ZiA9IHRoaXMuY29kZUJ1ZjtcbiAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzO1xuICAgIHZhciBieXRlc1BvcyA9IHRoaXMuYnl0ZXNQb3M7XG5cbiAgICB3aGlsZSAoY29kZVNpemUgPCBtYXhMZW4pIHtcbiAgICAgIHZhciBiO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBlbmNvZGluZyBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGNvZGVCdWYgfD0gKGIgPDwgY29kZVNpemUpO1xuICAgICAgY29kZVNpemUgKz0gODtcbiAgICB9XG4gICAgdmFyIGNvZGUgPSBjb2Rlc1tjb2RlQnVmICYgKCgxIDw8IG1heExlbikgLSAxKV07XG4gICAgdmFyIGNvZGVMZW4gPSBjb2RlID4+IDE2O1xuICAgIHZhciBjb2RlVmFsID0gY29kZSAmIDB4ZmZmZjtcbiAgICBpZiAoY29kZVNpemUgPT0gMCB8fCBjb2RlU2l6ZSA8IGNvZGVMZW4gfHwgY29kZUxlbiA9PSAwKVxuICAgICAgZXJyb3IoJ0JhZCBlbmNvZGluZyBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICB0aGlzLmNvZGVCdWYgPSAoY29kZUJ1ZiA+PiBjb2RlTGVuKTtcbiAgICB0aGlzLmNvZGVTaXplID0gKGNvZGVTaXplIC0gY29kZUxlbik7XG4gICAgdGhpcy5ieXRlc1BvcyA9IGJ5dGVzUG9zO1xuICAgIHJldHVybiBjb2RlVmFsO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5nZW5lcmF0ZUh1ZmZtYW5UYWJsZSA9IGZ1bmN0aW9uKGxlbmd0aHMpIHtcbiAgICB2YXIgbiA9IGxlbmd0aHMubGVuZ3RoO1xuXG4gICAgLy8gZmluZCBtYXggY29kZSBsZW5ndGhcbiAgICB2YXIgbWF4TGVuID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKGxlbmd0aHNbaV0gPiBtYXhMZW4pXG4gICAgICAgIG1heExlbiA9IGxlbmd0aHNbaV07XG4gICAgfVxuXG4gICAgLy8gYnVpbGQgdGhlIHRhYmxlXG4gICAgdmFyIHNpemUgPSAxIDw8IG1heExlbjtcbiAgICB2YXIgY29kZXMgPSBuZXcgVWludDMyQXJyYXkoc2l6ZSk7XG4gICAgZm9yICh2YXIgbGVuID0gMSwgY29kZSA9IDAsIHNraXAgPSAyO1xuICAgICAgICAgbGVuIDw9IG1heExlbjtcbiAgICAgICAgICsrbGVuLCBjb2RlIDw8PSAxLCBza2lwIDw8PSAxKSB7XG4gICAgICBmb3IgKHZhciB2YWwgPSAwOyB2YWwgPCBuOyArK3ZhbCkge1xuICAgICAgICBpZiAobGVuZ3Roc1t2YWxdID09IGxlbikge1xuICAgICAgICAgIC8vIGJpdC1yZXZlcnNlIHRoZSBjb2RlXG4gICAgICAgICAgdmFyIGNvZGUyID0gMDtcbiAgICAgICAgICB2YXIgdCA9IGNvZGU7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgY29kZTIgPSAoY29kZTIgPDwgMSkgfCAodCAmIDEpO1xuICAgICAgICAgICAgdCA+Pj0gMTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBmaWxsIHRoZSB0YWJsZSBlbnRyaWVzXG4gICAgICAgICAgZm9yICh2YXIgaSA9IGNvZGUyOyBpIDwgc2l6ZTsgaSArPSBza2lwKVxuICAgICAgICAgICAgY29kZXNbaV0gPSAobGVuIDw8IDE2KSB8IHZhbDtcblxuICAgICAgICAgICsrY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbY29kZXMsIG1heExlbl07XG4gIH07XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLnJlYWRCbG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIHJlcGVhdChzdHJlYW0sIGFycmF5LCBsZW4sIG9mZnNldCwgd2hhdCkge1xuICAgICAgdmFyIHJlcGVhdCA9IHN0cmVhbS5nZXRCaXRzKGxlbikgKyBvZmZzZXQ7XG4gICAgICB3aGlsZSAocmVwZWF0LS0gPiAwKVxuICAgICAgICBhcnJheVtpKytdID0gd2hhdDtcbiAgICB9XG5cbiAgICAvLyByZWFkIGJsb2NrIGhlYWRlclxuICAgIHZhciBoZHIgPSB0aGlzLmdldEJpdHMoMyk7XG4gICAgaWYgKGhkciAmIDEpXG4gICAgICB0aGlzLmVvZiA9IHRydWU7XG4gICAgaGRyID4+PSAxO1xuXG4gICAgaWYgKGhkciA9PSAwKSB7IC8vIHVuY29tcHJlc3NlZCBibG9ja1xuICAgICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcztcbiAgICAgIHZhciBieXRlc1BvcyA9IHRoaXMuYnl0ZXNQb3M7XG4gICAgICB2YXIgYjtcblxuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICB2YXIgYmxvY2tMZW4gPSBiO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBibG9ja0xlbiB8PSAoYiA8PCA4KTtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgdmFyIGNoZWNrID0gYjtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgY2hlY2sgfD0gKGIgPDwgOCk7XG4gICAgICBpZiAoY2hlY2sgIT0gKH5ibG9ja0xlbiAmIDB4ZmZmZikpXG4gICAgICAgIGVycm9yKCdCYWQgdW5jb21wcmVzc2VkIGJsb2NrIGxlbmd0aCBpbiBmbGF0ZSBzdHJlYW0nKTtcblxuICAgICAgdGhpcy5jb2RlQnVmID0gMDtcbiAgICAgIHRoaXMuY29kZVNpemUgPSAwO1xuXG4gICAgICB2YXIgYnVmZmVyTGVuZ3RoID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5lbnN1cmVCdWZmZXIoYnVmZmVyTGVuZ3RoICsgYmxvY2tMZW4pO1xuICAgICAgdmFyIGVuZCA9IGJ1ZmZlckxlbmd0aCArIGJsb2NrTGVuO1xuICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSBlbmQ7XG4gICAgICBmb3IgKHZhciBuID0gYnVmZmVyTGVuZ3RoOyBuIDwgZW5kOyArK24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXMuZW9mID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJbbl0gPSBiO1xuICAgICAgfVxuICAgICAgdGhpcy5ieXRlc1BvcyA9IGJ5dGVzUG9zO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBsaXRDb2RlVGFibGU7XG4gICAgdmFyIGRpc3RDb2RlVGFibGU7XG4gICAgaWYgKGhkciA9PSAxKSB7IC8vIGNvbXByZXNzZWQgYmxvY2ssIGZpeGVkIGNvZGVzXG4gICAgICBsaXRDb2RlVGFibGUgPSBmaXhlZExpdENvZGVUYWI7XG4gICAgICBkaXN0Q29kZVRhYmxlID0gZml4ZWREaXN0Q29kZVRhYjtcbiAgICB9IGVsc2UgaWYgKGhkciA9PSAyKSB7IC8vIGNvbXByZXNzZWQgYmxvY2ssIGR5bmFtaWMgY29kZXNcbiAgICAgIHZhciBudW1MaXRDb2RlcyA9IHRoaXMuZ2V0Qml0cyg1KSArIDI1NztcbiAgICAgIHZhciBudW1EaXN0Q29kZXMgPSB0aGlzLmdldEJpdHMoNSkgKyAxO1xuICAgICAgdmFyIG51bUNvZGVMZW5Db2RlcyA9IHRoaXMuZ2V0Qml0cyg0KSArIDQ7XG5cbiAgICAgIC8vIGJ1aWxkIHRoZSBjb2RlIGxlbmd0aHMgY29kZSB0YWJsZVxuICAgICAgdmFyIGNvZGVMZW5Db2RlTGVuZ3RocyA9IEFycmF5KGNvZGVMZW5Db2RlTWFwLmxlbmd0aCk7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB3aGlsZSAoaSA8IG51bUNvZGVMZW5Db2RlcylcbiAgICAgICAgY29kZUxlbkNvZGVMZW5ndGhzW2NvZGVMZW5Db2RlTWFwW2krK11dID0gdGhpcy5nZXRCaXRzKDMpO1xuICAgICAgdmFyIGNvZGVMZW5Db2RlVGFiID0gdGhpcy5nZW5lcmF0ZUh1ZmZtYW5UYWJsZShjb2RlTGVuQ29kZUxlbmd0aHMpO1xuXG4gICAgICAvLyBidWlsZCB0aGUgbGl0ZXJhbCBhbmQgZGlzdGFuY2UgY29kZSB0YWJsZXNcbiAgICAgIHZhciBsZW4gPSAwO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGNvZGVzID0gbnVtTGl0Q29kZXMgKyBudW1EaXN0Q29kZXM7XG4gICAgICB2YXIgY29kZUxlbmd0aHMgPSBuZXcgQXJyYXkoY29kZXMpO1xuICAgICAgd2hpbGUgKGkgPCBjb2Rlcykge1xuICAgICAgICB2YXIgY29kZSA9IHRoaXMuZ2V0Q29kZShjb2RlTGVuQ29kZVRhYik7XG4gICAgICAgIGlmIChjb2RlID09IDE2KSB7XG4gICAgICAgICAgcmVwZWF0KHRoaXMsIGNvZGVMZW5ndGhzLCAyLCAzLCBsZW4pO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gMTcpIHtcbiAgICAgICAgICByZXBlYXQodGhpcywgY29kZUxlbmd0aHMsIDMsIDMsIGxlbiA9IDApO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT0gMTgpIHtcbiAgICAgICAgICByZXBlYXQodGhpcywgY29kZUxlbmd0aHMsIDcsIDExLCBsZW4gPSAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2RlTGVuZ3Roc1tpKytdID0gbGVuID0gY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXRDb2RlVGFibGUgPVxuICAgICAgICB0aGlzLmdlbmVyYXRlSHVmZm1hblRhYmxlKGNvZGVMZW5ndGhzLnNsaWNlKDAsIG51bUxpdENvZGVzKSk7XG4gICAgICBkaXN0Q29kZVRhYmxlID1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUh1ZmZtYW5UYWJsZShjb2RlTGVuZ3Rocy5zbGljZShudW1MaXRDb2RlcywgY29kZXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXJyb3IoJ1Vua25vd24gYmxvY2sgdHlwZSBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICB9XG5cbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdmFyIGxpbWl0ID0gYnVmZmVyID8gYnVmZmVyLmxlbmd0aCA6IDA7XG4gICAgdmFyIHBvcyA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgY29kZTEgPSB0aGlzLmdldENvZGUobGl0Q29kZVRhYmxlKTtcbiAgICAgIGlmIChjb2RlMSA8IDI1Nikge1xuICAgICAgICBpZiAocG9zICsgMSA+PSBsaW1pdCkge1xuICAgICAgICAgIGJ1ZmZlciA9IHRoaXMuZW5zdXJlQnVmZmVyKHBvcyArIDEpO1xuICAgICAgICAgIGxpbWl0ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBidWZmZXJbcG9zKytdID0gY29kZTE7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGNvZGUxID09IDI1Nikge1xuICAgICAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IHBvcztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29kZTEgLT0gMjU3O1xuICAgICAgY29kZTEgPSBsZW5ndGhEZWNvZGVbY29kZTFdO1xuICAgICAgdmFyIGNvZGUyID0gY29kZTEgPj4gMTY7XG4gICAgICBpZiAoY29kZTIgPiAwKVxuICAgICAgICBjb2RlMiA9IHRoaXMuZ2V0Qml0cyhjb2RlMik7XG4gICAgICB2YXIgbGVuID0gKGNvZGUxICYgMHhmZmZmKSArIGNvZGUyO1xuICAgICAgY29kZTEgPSB0aGlzLmdldENvZGUoZGlzdENvZGVUYWJsZSk7XG4gICAgICBjb2RlMSA9IGRpc3REZWNvZGVbY29kZTFdO1xuICAgICAgY29kZTIgPSBjb2RlMSA+PiAxNjtcbiAgICAgIGlmIChjb2RlMiA+IDApXG4gICAgICAgIGNvZGUyID0gdGhpcy5nZXRCaXRzKGNvZGUyKTtcbiAgICAgIHZhciBkaXN0ID0gKGNvZGUxICYgMHhmZmZmKSArIGNvZGUyO1xuICAgICAgaWYgKHBvcyArIGxlbiA+PSBsaW1pdCkge1xuICAgICAgICBidWZmZXIgPSB0aGlzLmVuc3VyZUJ1ZmZlcihwb3MgKyBsZW4pO1xuICAgICAgICBsaW1pdCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IGxlbjsgKytrLCArK3BvcylcbiAgICAgICAgYnVmZmVyW3Bvc10gPSBidWZmZXJbcG9zIC0gZGlzdF07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBjb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmxhdGVTdHJlYW07IiwiLypcblx0VGhpcyBpcyByb3QuanMsIHRoZSBST2d1ZWxpa2UgVG9vbGtpdCBpbiBKYXZhU2NyaXB0LlxuXHRWZXJzaW9uIDAuNn5kZXYsIGdlbmVyYXRlZCBvbiBUdWUgTWFyIDE3IDE2OjE2OjMxIENFVCAyMDE1LlxuKi9cbi8qKlxuICogQG5hbWVzcGFjZSBUb3AtbGV2ZWwgUk9UIG5hbWVzcGFjZVxuICovXG52YXIgUk9UID0ge1xuXHQvKiogRGlyZWN0aW9uYWwgY29uc3RhbnRzLiBPcmRlcmluZyBpcyBpbXBvcnRhbnQhICovXG5cdERJUlM6IHtcblx0XHRcIjRcIjogW1xuXHRcdFx0WyAwLCAtMV0sXG5cdFx0XHRbIDEsICAwXSxcblx0XHRcdFsgMCwgIDFdLFxuXHRcdFx0Wy0xLCAgMF1cblx0XHRdLFxuXHRcdFwiOFwiOiBbXG5cdFx0XHRbIDAsIC0xXSxcblx0XHRcdFsgMSwgLTFdLFxuXHRcdFx0WyAxLCAgMF0sXG5cdFx0XHRbIDEsICAxXSxcblx0XHRcdFsgMCwgIDFdLFxuXHRcdFx0Wy0xLCAgMV0sXG5cdFx0XHRbLTEsICAwXSxcblx0XHRcdFstMSwgLTFdXG5cdFx0XSxcblx0XHRcIjZcIjogW1xuXHRcdFx0Wy0xLCAtMV0sXG5cdFx0XHRbIDEsIC0xXSxcblx0XHRcdFsgMiwgIDBdLFxuXHRcdFx0WyAxLCAgMV0sXG5cdFx0XHRbLTEsICAxXSxcblx0XHRcdFstMiwgIDBdXG5cdFx0XVxuXHR9XG59O1xuLyoqXG4gKiBBbHdheXMgcG9zaXRpdmUgbW9kdWx1c1xuICogQHBhcmFtIHtpbnR9IG4gTW9kdWx1c1xuICogQHJldHVybnMge2ludH0gdGhpcyBtb2R1bG8gblxuICovXG5OdW1iZXIucHJvdG90eXBlLm1vZCA9IGZ1bmN0aW9uKG4pIHtcblx0cmV0dXJuICgodGhpcyVuKStuKSVuO1xufVxuaWYgKCFPYmplY3QuY3JlYXRlKSB7ICBcblx0LyoqXG5cdCAqIEVTNSBPYmplY3QuY3JlYXRlXG5cdCAqL1xuXHRPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24obykgeyAgXG5cdFx0dmFyIHRtcCA9IGZ1bmN0aW9uKCkge307XG5cdFx0dG1wLnByb3RvdHlwZSA9IG87XG5cdFx0cmV0dXJuIG5ldyB0bXAoKTtcblx0fTsgIFxufSAgXG4vKipcbiAqIFNldHMgcHJvdG90eXBlIG9mIHRoaXMgZnVuY3Rpb24gdG8gYW4gaW5zdGFuY2Ugb2YgcGFyZW50IGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwYXJlbnRcbiAqL1xuRnVuY3Rpb24ucHJvdG90eXBlLmV4dGVuZCA9IGZ1bmN0aW9uKHBhcmVudCkge1xuXHR0aGlzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG5cdHRoaXMucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gdGhpcztcblx0cmV0dXJuIHRoaXM7XG59XG5pZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiKSB7XG5cdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgZnVuY3Rpb24oY2IpIHsgcmV0dXJuIHNldFRpbWVvdXQoY2IsIDEwMDAvNjApOyB9O1xuXG5cdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG5cdFx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm9DYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgZnVuY3Rpb24oaWQpIHsgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7IH07XG59XG4vKipcbiAqIEBjbGFzcyBBYnN0cmFjdCBGT1YgYWxnb3JpdGhtXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaWdodFBhc3Nlc0NhbGxiYWNrIERvZXMgdGhlIGxpZ2h0IHBhc3MgdGhyb3VnaCB4LHk/XG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge2ludH0gW29wdGlvbnMudG9wb2xvZ3k9OF0gNC82LzhcbiAqL1xuUk9ULkZPViA9IGZ1bmN0aW9uKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpIHtcblx0dGhpcy5fbGlnaHRQYXNzZXMgPSBsaWdodFBhc3Nlc0NhbGxiYWNrO1xuXHR0aGlzLl9vcHRpb25zID0ge1xuXHRcdHRvcG9sb2d5OiA4XG5cdH1cblx0Zm9yICh2YXIgcCBpbiBvcHRpb25zKSB7IHRoaXMuX29wdGlvbnNbcF0gPSBvcHRpb25zW3BdOyB9XG59O1xuXG4vKipcbiAqIENvbXB1dGUgdmlzaWJpbGl0eSBmb3IgYSAzNjAtZGVncmVlIGNpcmNsZVxuICogQHBhcmFtIHtpbnR9IHhcbiAqIEBwYXJhbSB7aW50fSB5XG4gKiBAcGFyYW0ge2ludH0gUiBNYXhpbXVtIHZpc2liaWxpdHkgcmFkaXVzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5ST1QuRk9WLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHt9XG5cbi8qKlxuICogUmV0dXJuIGFsbCBuZWlnaGJvcnMgaW4gYSBjb25jZW50cmljIHJpbmdcbiAqIEBwYXJhbSB7aW50fSBjeCBjZW50ZXIteFxuICogQHBhcmFtIHtpbnR9IGN5IGNlbnRlci15XG4gKiBAcGFyYW0ge2ludH0gciByYW5nZVxuICovXG5ST1QuRk9WLnByb3RvdHlwZS5fZ2V0Q2lyY2xlID0gZnVuY3Rpb24oY3gsIGN5LCByKSB7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0dmFyIGRpcnMsIGNvdW50RmFjdG9yLCBzdGFydE9mZnNldDtcblxuXHRzd2l0Y2ggKHRoaXMuX29wdGlvbnMudG9wb2xvZ3kpIHtcblx0XHRjYXNlIDQ6XG5cdFx0XHRjb3VudEZhY3RvciA9IDE7XG5cdFx0XHRzdGFydE9mZnNldCA9IFswLCAxXTtcblx0XHRcdGRpcnMgPSBbXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzddLFxuXHRcdFx0XHRST1QuRElSU1s4XVsxXSxcblx0XHRcdFx0Uk9ULkRJUlNbOF1bM10sXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzVdXG5cdFx0XHRdXG5cdFx0YnJlYWs7XG5cblx0XHRjYXNlIDY6XG5cdFx0XHRkaXJzID0gUk9ULkRJUlNbNl07XG5cdFx0XHRjb3VudEZhY3RvciA9IDE7XG5cdFx0XHRzdGFydE9mZnNldCA9IFstMSwgMV07XG5cdFx0YnJlYWs7XG5cblx0XHRjYXNlIDg6XG5cdFx0XHRkaXJzID0gUk9ULkRJUlNbNF07XG5cdFx0XHRjb3VudEZhY3RvciA9IDI7XG5cdFx0XHRzdGFydE9mZnNldCA9IFstMSwgMV07XG5cdFx0YnJlYWs7XG5cdH1cblxuXHQvKiBzdGFydGluZyBuZWlnaGJvciAqL1xuXHR2YXIgeCA9IGN4ICsgc3RhcnRPZmZzZXRbMF0qcjtcblx0dmFyIHkgPSBjeSArIHN0YXJ0T2Zmc2V0WzFdKnI7XG5cblx0LyogY2lyY2xlICovXG5cdGZvciAodmFyIGk9MDtpPGRpcnMubGVuZ3RoO2krKykge1xuXHRcdGZvciAodmFyIGo9MDtqPHIqY291bnRGYWN0b3I7aisrKSB7XG5cdFx0XHRyZXN1bHQucHVzaChbeCwgeV0pO1xuXHRcdFx0eCArPSBkaXJzW2ldWzBdO1xuXHRcdFx0eSArPSBkaXJzW2ldWzFdO1xuXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogQGNsYXNzIFByZWNpc2Ugc2hhZG93Y2FzdGluZyBhbGdvcml0aG1cbiAqIEBhdWdtZW50cyBST1QuRk9WXG4gKi9cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcgPSBmdW5jdGlvbihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XG5cdFJPVC5GT1YuY2FsbCh0aGlzLCBsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKTtcbn1cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcuZXh0ZW5kKFJPVC5GT1YpO1xuXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5jb21wdXRlID0gZnVuY3Rpb24oeCwgeSwgUiwgY2FsbGJhY2spIHtcblx0LyogdGhpcyBwbGFjZSBpcyBhbHdheXMgdmlzaWJsZSAqL1xuXHRjYWxsYmFjayh4LCB5LCAwLCAxKTtcbiAgICBcblx0Y2FsbGJhY2soeC0xLCB5LTEsIDAsIDEpO1xuXHRjYWxsYmFjayh4LCB5LTEsIDAsIDEpO1xuXHRjYWxsYmFjayh4KzEsIHktMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgtMSwgeSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgrMSwgeSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgtMSwgeSsxLCAwLCAxKTtcblx0Y2FsbGJhY2soeCwgeSsxLCAwLCAxKTtcblx0Y2FsbGJhY2soeCsxLCB5KzEsIDAsIDEpO1xuICAgIFxuICAgIGNhbGxiYWNrKHgtMSwgeS0yLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LCB5LTIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMSwgeS0yLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTIsIHktMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0yLCB5LCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTIsIHkrMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsyLCB5LTEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMiwgeSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsyLCB5KzEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMSwgeSsyLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LCB5KzIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMSwgeSsyLCAwLCAxKTtcblxuXHQvKiBzdGFuZGluZyBpbiBhIGRhcmsgcGxhY2UuIEZJWE1FIGlzIHRoaXMgYSBnb29kIGlkZWE/ICAqL1xuXHRpZiAoIXRoaXMuX2xpZ2h0UGFzc2VzKHgsIHkpKSB7IHJldHVybjsgfVxuXHRcblx0LyogbGlzdCBvZiBhbGwgc2hhZG93cyAqL1xuXHR2YXIgU0hBRE9XUyA9IFtdO1xuXHR2YXIgdHJlZXMgPSB7fTtcblx0dmFyIGN4LCBjeSwgYmxvY2tzLCBBMSwgQTIsIHZpc2liaWxpdHksXG4gICAgICAgIGR4LCBkeSwgZGQsIGEsIGIsIHJhZGl1cyxcbiAgICAgICAgY3gyLCBjeTIsIGRkMSxcbiAgICAgICAgb2JzdGFjbGVUeXBlO1xuXG5cdC8qIGFuYWx5emUgc3Vycm91bmRpbmcgY2VsbHMgaW4gY29uY2VudHJpYyByaW5ncywgc3RhcnRpbmcgZnJvbSB0aGUgY2VudGVyICovXG5cdGZvciAodmFyIHI9MTsgcjw9UjsgcisrKSB7XG4gICAgICAgIC8vLy9jb25zb2xlLmxvZygncmluZycsIHIpO1xuXHRcdHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG5cdFx0dmFyIG5laWdoYm9yQ291bnQgPSBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICB0cmVlcyA9IHt9O1xuXHRcdGZvciAodmFyIGk9MDtpPG5laWdoYm9yQ291bnQ7aSsrKSB7XG5cdFx0XHRjeCA9IG5laWdoYm9yc1tpXVswXTtcblx0XHRcdGN5ID0gbmVpZ2hib3JzW2ldWzFdO1xuICAgICAgICAgICAgdmFyIGtleSA9IGN4K1wiLFwiK2N5O1xuICAgICAgICAgICAgLy9pZiAoa2V5ID09IFwiNDQsMTAyXCIpIC8vY29uc29sZS5sb2coJ0tFWScsIGtleSwgIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSkpO1xuICAgICAgICAgICAgLy8gaWYgKGtleSA9PSBcIjE1MCwxNjBcIikgLy9jb25zb2xlLmxvZyhrZXksIG9ic3RhY2xlVHlwZSk7XG4gICAgICAgICAgICAvLyBpZiAoa2V5ID09IFwiMTUxLDE2MVwiKSAvL2NvbnNvbGUubG9nKGtleSwgb2JzdGFjbGVUeXBlKTtcbiAgICAgICAgICAgIC8vIGlmIChrZXkgPT0gXCIxNTAsMTYxXCIpIC8vY29uc29sZS5sb2coa2V5LCBvYnN0YWNsZVR5cGUpO1xuICAgICAgICAgICAgdmFyIG9ic3RhY2xlVHlwZXMgPSBvYnN0YWNsZVR5cGVzID0gdGhpcy53YWxsc1trZXldO1xuICAgICAgICAgICAgaWYgKG9ic3RhY2xlVHlwZXMgJiYgb2JzdGFjbGVUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2tpcFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9ic3RhY2xlVHlwZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9ic3RhY2xlVHlwZSA9IG9ic3RhY2xlVHlwZXNbal07XG4gICAgICAgICAgICAgICAgICAgIGN4MiA9IG9ic3RhY2xlVHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgY3kyID0gb2JzdGFjbGVUeXBlWzJdO1xuICAgICAgICAgICAgICAgICAgICByYWRpdXMgPSBvYnN0YWNsZVR5cGVbM107XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBkeDEgPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkeTEgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZDEgPSBNYXRoLnNxcnQoZHgxICogZHgxICsgZHkxICogZHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZDEgPCBkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVzW29ic3RhY2xlVHlwZVsxXStcIixcIitvYnN0YWNsZVR5cGVbMl1dID0gW29ic3RhY2xlVHlwZVsxXSwgb2JzdGFjbGVUeXBlWzJdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZHggPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkeSA9IGN5IC0geTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCBmYWxzZSwgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpc2liaWxpdHkpIHNraXBWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eSAmJiAhc2tpcFZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3gyID0gY3g7XG4gICAgICAgICAgICAgICAgY3kyID0gY3k7XG4gICAgICAgICAgICAgICAgcmFkaXVzID0gTWF0aC5TUVJUMiAvIDI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZHggPSBjeDIgLSB4O1xuICAgICAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKmR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIGlmIChkZCA+IDEvMikge1xuICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICBpZiAob2JzdGFjbGVUeXBlICYmIG9ic3RhY2xlVHlwZVswXSA9PSAndHJlZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZHgxID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeTEgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgIGRkMSA9IE1hdGguc3FydChkeDEgKiBkeDEgKyBkeTEgKiBkeTEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGQxIDwgZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVzW29ic3RhY2xlVHlwZVsxXStcIixcIitvYnN0YWNsZVR5cGVbMl1dID0gW29ic3RhY2xlVHlwZVsxXSwgb2JzdGFjbGVUeXBlWzJdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGZhbHNlLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAob2JzdGFjbGVUeXBlKSAvL2NvbnNvbGUubG9nKG9ic3RhY2xlVHlwZVswXSwgcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQkxPQ0tTJywgY3gsIGN5LCBibG9ja3MsIGIpO1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblx0XHR9IC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG4gICAgICAgIFxuICAgICAgICAvLyBhcHBseSB0cmVlIGJsb2NrZXJzXG4gICAgICAgIGZvciAodmFyIGsgaW4gdHJlZXMpIHtcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygnYXBwbHkgdHJlZScpO1xuICAgICAgICAgICAgY3gyID0gdHJlZXNba11bMF07XG4gICAgICAgICAgICBjeTIgPSB0cmVlc1trXVsxXTtcbiAgICAgICAgICAgIGR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIHJhZGl1cyA9IE1hdGguU1FSVDIgLSAuMDE7XG4gICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIHRydWUsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvbmUpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9IC8qIGZvciBhbGwgcmluZ3MgKi9cbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XG4gKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcbiAqL1xuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgLy8vL2NvbnNvbGUubG9nKCdfY2hlY2tWaXNpYmlsaXR5JywgYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgIC8vIGNoZWNrIGlmIHRhcmdldCBjZW50ZXIgaXMgaW5zaWRlIGEgc2hhZG93XG4gICAgdmFyIHZpc2libGUgPSAhYmxvY2tzO1xuICAgIC8vY29uc29sZS5sb2coJ19jaGVja1Zpc2liaWxpdHknLCBiLCB2aXNpYmxlKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBTSEFET1dTLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG9sZCA9IFNIQURPV1NbaV07XG4gICAgICAgIGlmIChpc0JldHdlZW4oYiwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdibG9ja3MgYnV0IG5vdCB2aXNpYmxlJywgU0hBRE9XUy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSwgYiwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gbm90IHZpc2libGUsIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbiAgICBcbiAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgIGlmIChBMSA8IDAgJiYgQTIgPj0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc3BsaXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZVNoYWRvd3MoYiwgMCwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlU2hhZG93cyhiLCBBMSwgMCwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vdCBzcGxpdHRpbmcnLCBibG9ja3MsIHZpc2libGUsIGIpO1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTaGFkb3dzKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnLCBBMSwgQTIsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpLCAhaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpO1xuICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpICYmIEExICE9IFNIQURPV1NbMF1bMF0gJiYgQTIgIT0gU0hBRE9XU1swXVsxXSApIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHZpc2libGU7XG59XG5cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9tZXJnZVNoYWRvd3MgPSBmdW5jdGlvbihiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgIC8vLy9jb25zb2xlLmxvZygnbWVyZ2luZycsIGIsIEExLCBBMik7XG4gICAgLy8gY2hlY2sgaWYgdGFyZ2V0IGZpcnN0IGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDEgPSAwLFxuICAgICAgICBlZGdlMSA9IGZhbHNlLFxuICAgICAgICBmaXJzdEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgZmlyc3RJbmRleCA9IGluZGV4MTtcbiAgICAgICAgaWYgKGlzQmV0d2VlbihBMSwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXgxID4gMCAmJiBpc0JldHdlZW4oQTEsIFNIQURPV1NbaW5kZXgxIC0gMV1bMV0sIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGVkZ2UxID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQmVmb3JlKEExLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpbmRleDErKztcbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSBpbmRleDE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCZWZvcmUoQTEsIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4MSsrO1xuICAgIH1cbiAgICBcbiAgICAvLyBjaGVjayBpZiB0YXJnZXQgc2Vjb25kIGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCAtIDEsXG4gICAgICAgIGVkZ2UyID0gZmFsc2UsXG4gICAgICAgIHNlY29uZEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgyID49IDApIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBpbmRleDI7XG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhBMiwgb2xkWzBdLCBvbGRbMV0sIGlzQmV0d2VlbihBMiwgb2xkWzBdLCBvbGRbMV0pKVxuICAgICAgICBpZiAoaXNCZXR3ZWVuKEEyLCBvbGRbMF0sIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGVkZ2UyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JlZm9yZShBMiwgb2xkWzBdKSkge1xuICAgICAgICAgICAgaW5kZXgyLS07XG4gICAgICAgICAgICBzZWNvbmRJbmRleCA9IGluZGV4MjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNCZWZvcmUoQTIsIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Mi0tO1xuICAgIH1cbiAgICBcbiAgICAvLy8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICBpZiAoZmlyc3RJbmRleCA9PSBTSEFET1dTLmxlbmd0aCAmJiAhZWRnZTEgJiYgc2Vjb25kSW5kZXggPT0gMCAmJiBlZGdlMikgZmlyc3RJbmRleCA9IDA7XG4gICAgLy9pZiAoc2Vjb25kSW5kZXggPT0gLTEpIHNlY29uZEluZGV4ID0gU0hBRE9XUy5sZW5ndGggLSAxO1xuICAgIC8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBzaGFkb3dzIHB1c2hpbmcnLCBbQTEsIEEyXSk7XG4gICAgICAgIFNIQURPV1MucHVzaChbQTEsIEEyXSk7XG4gICAgfVxuICAgIC8qZWxzZSBpZiAoU0hBRE9XUy5sZW5ndGggPiAxICYmIGZpcnN0SW5kZXggPT0gU0hBRE9XUy5sZW5ndGggJiYgc2Vjb25kSW5kZXggPT0gMCAmJiAhZWRnZTEgJiYgZWRnZTIpIHtcbiAgICBcbiAgICB9Ki9cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG5ld19zaGFkb3cgPSBbZWRnZTEgPyBTSEFET1dTW2ZpcnN0SW5kZXhdWzBdIDogQTEsIGVkZ2UyID8gU0hBRE9XU1tzZWNvbmRJbmRleF1bMV0gOiBBMl07XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25ld19zaGFkb3cnLCBuZXdfc2hhZG93KTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBNYXRoLm1heChmaXJzdEluZGV4LCBzZWNvbmRJbmRleCk7XG4gICAgICAgIHZhciBzdW0xID0gZGlmZl9zdW0oU0hBRE9XUyk7XG4gICAgICAgIHZhciBkb1NoaWZ0ID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0JldHdlZW4oMCwgbmV3X3NoYWRvd1swXSwgbmV3X3NoYWRvd1sxXSkgJiYgbmV3X3NoYWRvd1swXSAhPSAwICYmIG5ld19zaGFkb3dbMV0gIT0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY3Jvc3NlcyAwJyk7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBbbmV3X3NoYWRvd1swXSwgMF0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbbmV3X3NoYWRvd1swXSwgMF0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIGlmIChTSEFET1dTWzBdWzBdICE9IDAgJiYgU0hBRE9XU1swXVsxXSAhPSBuZXdfc2hhZG93WzFdKSB7XG4gICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoZmlyc3RJbmRleCArIDEsIDAsIFswLCBuZXdfc2hhZG93WzFdXSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbMCwgbmV3X3NoYWRvd1sxXV0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgZG9TaGlmdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBuZXdfc2hhZG93KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3VtMiA9IGRpZmZfc3VtKFNIQURPV1MpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdW0xJywgc3VtMSwgJ3N1bTInLCBzdW0yLCBzdW0yIDwgc3VtMSwgU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpKTtcbiAgICAgICAgaWYgKHN1bTIgPCBzdW0xKSB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICAvKmlmIChTSEFET1dTLmxlbmd0aCA9PSAxICYmICghaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSB8fCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH0qL1xuICAgICAgICBpZiAobmV3X3NoYWRvd1swXSA9PSAwIHx8IGRvU2hpZnQpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzaGlmdGluZycpO1xuICAgICAgICAgICAgd2hpbGUgKFNIQURPV1NbMF1bMF0gIT0gMCkge1xuICAgICAgICAgICAgICAgIFNIQURPV1MucHVzaChTSEFET1dTLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSBTSEFET1dTLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCBzaGlmdGluZycsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkaWZmX3N1bShTSEFET1dTKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0JlZm9yZShBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKEEyID4gMCAmJiBBMSA8IDApIHsgLy8gQTEgaW4gdG9wIGhhbGYsIEEyIGluIGJvdHRvbSBoYWxmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBBMSA8IEEyO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNBZnRlcihBMSwgQTIpIHtcbiAgICByZXR1cm4gIWlzQmVmb3JlKEExLCBBMik7XG59XG5cbmZ1bmN0aW9uIGlzQmV0d2VlbihiLCBBMSwgQTIpIHtcbiAgICBpZiAoQTEgPCBBMikge1xuICAgICAgICByZXR1cm4gKChBMSA8PSBiKSAmJiAoYiA8PSBBMikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoQTEgPD0gYikgJiYgKGIgPD0gTWF0aC5QSSkpIHx8ICgoLU1hdGguUEkgPD0gYikgJiYgKGIgPD0gQTIpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh4KSB7XG4gICAgaWYgKHggPiBNYXRoLlBJKSB7XG4gICAgICAgIHJldHVybiAtKDIgKiBNYXRoLlBJIC0geCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCB4IDwgLU1hdGguUEkpIHtcbiAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJICsgeDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZihBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKChNYXRoLlBJIC0gQTEpIC0gKC1NYXRoLlBJIC0gQTIpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQTIgPiAwICYmIEExIDwgMCkgeyAvLyBBMSBpbiB0b3AgaGFsZiwgQTIgaW4gYm90dG9tIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKC1BMSArIEEyKTtcbiAgICB9XG4gICAgaWYgKEExIDw9IDAgJiYgQTIgPD0gMCkgeyAvLyBBMSxBMiBpbiBib3R0b20gaGFsZlxuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7IC8vIEExIGFmdGVyIEEyXG4gICAgICAgICAgICByZXR1cm4gLUExICsgTWF0aC5QSSAtICgtTWF0aC5QSSAtIEEyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKEEyIC0gQTEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSSArIChNYXRoLlBJIC0gQTEpICsgQTJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhBMiAtIEExKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZl9zdW0oU0hBRE9XUykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU0hBRE9XUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLy8vY29uc29sZS5sb2coU0hBRE9XU1tpXVswXSwgU0hBRE9XU1tpXVsxXSwgZGlmZihTSEFET1dTW2ldWzBdLCBTSEFET1dTW2ldWzFdKSk7XG4gICAgICAgIHN1bSArPSBkaWZmKFNIQURPV1NbaV1bMF0sIFNIQURPV1NbaV1bMV0pO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJPVDsiLCJ2YXIgSW1hZ2VIYW5kbGVyID0gcmVxdWlyZShcIi4vaW1hZ2VIYW5kbGVyLmpzXCIpO1xudmFyIFJPVCA9IHJlcXVpcmUoXCIuL3JvdDYuanNcIik7XG5cbnZhciBrZXkycHRfY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGtleTJwdChrZXkpIHtcbiAgICBpZiAoa2V5IGluIGtleTJwdF9jYWNoZSkgcmV0dXJuIGtleTJwdF9jYWNoZVtrZXldO1xuICAgIHZhciBwID0ga2V5LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBwYXJzZUludChjKSB9KTtcbiAgICB2YXIgcHQgPSB7eDogcFswXSwgeTogcFsxXSwga2V5OiBrZXl9O1xuICAgIGtleTJwdF9jYWNoZVtrZXldID0gcHQ7XG4gICAgcmV0dXJuIHB0O1xufVxuXG5mdW5jdGlvbiB4eTJrZXkoeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCIsXCIgKyB5O1xufVxuXG5mdW5jdGlvbiB4eTJwdCh4LCB5KSB7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5LCBrZXk6IHggKyBcIixcIiArIHl9O1xufVxuXG5mdW5jdGlvbiBwdDJrZXkocHQpIHtcbiAgICByZXR1cm4gcHQueCArIFwiLFwiICsgcHQueTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyhkYXRhLCBlbGV2YXRpb24pIHtcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHZhciB3YWxscyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgIHZhciBwdCA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHB0LnogPiBlbGV2YXRpb24pIHtcbiAgICAgICAgICAgIGFkakxvb3A6XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gLTE7IGkgPD0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IC0xOyBqIDw9IDE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCAhPT0gaSB8fCAwICE9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IChwdC54ICsgaSkgKyBcIixcIiArIChwdC55ICsgaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtrXSAmJiBkYXRhW2tdLnogPD0gZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbHNbcHQua2V5XSA9IHB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGFkakxvb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2dlbmVyYXRlRWxldmF0aW9uV2FsbHMnLCBEYXRlLm5vdygpIC0gdDEgKyAnbXMnKTtcbiAgICByZXR1cm4gd2FsbHM7XG59XG5cbmZ1bmN0aW9uIHNldEVsZXZhdGlvbldhbGxzKG9iaiwgZGF0YSwgZWxldmF0aW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2VsZXZhdGlvbl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVsID0gZGF0YVtlbGV2YXRpb25dW2ldO1xuICAgICAgICBvYmpbZWxbMV0gKyBcIixcIiArIGVsWzJdXSA9IGVsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0V2FsbHMob2JqLCBkYXRhLCBpZCwgcikge1xuICAgIGlkID0gaWQgfHwgJ3dhbGwnO1xuICAgIHIgPSByIHx8IChNYXRoLlNRUlQyIC8gMik7XG4gICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgIG9ialtpXSA9IFtpZCwgZGF0YVtpXS54LCBkYXRhW2ldLnksIHJdO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0VHJlZVdhbGxzKG9iaiwgZWxldmF0aW9uLCB0cmVlLCB0cmVlX2VsZXZhdGlvbnMsIHRyZWVfc3RhdGUsIHRyZWVfYmxvY2tzKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0cmVlKSB7XG4gICAgICAgIGlmIChlbGV2YXRpb24gPCB0cmVlX2VsZXZhdGlvbnNbaV0pIHtcbiAgICAgICAgICAgIGlmICh0cmVlX3N0YXRlW2ldKSB7XG4gICAgICAgICAgICAgICAgLy9vYmpbaV0gPSBbJ3RyZWUnLCB0cmVlW2ldLngsIHRyZWVbaV0ueSwgTWF0aC5TUVJUMl07XG4gICAgICAgICAgICAgICAgdHJlZV9ibG9ja3NbaV0uZm9yRWFjaChmdW5jdGlvbiAocHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBwdC54ICsgXCIsXCIgKyBwdC55O1xuICAgICAgICAgICAgICAgICAgICBvYmpba10gPSAob2JqW2tdIHx8IFtdKS5jb25jYXQoW1sndHJlZScsIHRyZWVbaV0ueCwgdHJlZVtpXS55LCBNYXRoLlNRUlQyXV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBWaXNpb25TaW11bGF0aW9uKHdvcmxkZGF0YSwgbWFwRGF0YUltYWdlUGF0aCwgb25SZWFkeSwgb3B0cykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuZ3JpZG5hdiA9IG51bGw7XG4gICAgdGhpcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSA9IG51bGw7XG4gICAgdGhpcy50b29sc19ub193YXJkcyA9IG51bGw7XG4gICAgdGhpcy5lbGV2YXRpb25WYWx1ZXMgPSBbXTtcbiAgICB0aGlzLmVsZXZhdGlvbkdyaWQgPSBudWxsO1xuICAgIHRoaXMuZWxldmF0aW9uV2FsbHMgPSB7fTtcbiAgICB0aGlzLnRyZWVXYWxscyA9IHt9O1xuICAgIHRoaXMudHJlZSA9IHt9OyAvLyBjZW50ZXIga2V5IHRvIHBvaW50IG1hcFxuICAgIHRoaXMudHJlZV9ibG9ja3MgPSB7fTsgLy8gY2VudGVyIHRvIGNvcm5lcnMgbWFwXG4gICAgdGhpcy50cmVlX3JlbGF0aW9ucyA9IHt9OyAvLyBjb3JuZXIgdG8gY2VudGVyIG1hcFxuICAgIHRoaXMudHJlZV9lbGV2YXRpb25zID0ge307XG4gICAgdGhpcy50cmVlX3N0YXRlID0ge307XG4gICAgdGhpcy53YWxscyA9IHt9O1xuICAgIHRoaXMucmFkaXVzID0gdGhpcy5vcHRzLnJhZGl1cyB8fCBwYXJzZUludCgxNjAwIC8gNjQpO1xuICAgIHRoaXMubGlnaHRzID0ge307XG4gICAgdGhpcy53b3JsZE1pblggPSB3b3JsZGRhdGEud29ybGRNaW5YO1xuICAgIHRoaXMud29ybGRNaW5ZID0gd29ybGRkYXRhLndvcmxkTWluWTtcbiAgICB0aGlzLndvcmxkTWF4WCA9IHdvcmxkZGF0YS53b3JsZE1heFg7XG4gICAgdGhpcy53b3JsZE1heFkgPSB3b3JsZGRhdGEud29ybGRNYXhZO1xuICAgIHRoaXMud29ybGRXaWR0aCA9IHRoaXMud29ybGRNYXhYIC0gdGhpcy53b3JsZE1pblg7XG4gICAgdGhpcy53b3JsZEhlaWdodCA9IHRoaXMud29ybGRNYXhZIC0gdGhpcy53b3JsZE1pblk7XG4gICAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLndvcmxkV2lkdGggLyA2NCArIDE7XG4gICAgdGhpcy5ncmlkSGVpZ2h0ID0gdGhpcy53b3JsZEhlaWdodCAvIDY0ICsgMTtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgXG4gICAgdGhpcy5pbWFnZUhhbmRsZXIgPSBuZXcgSW1hZ2VIYW5kbGVyKG1hcERhdGFJbWFnZVBhdGgpO1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5pbWFnZUhhbmRsZXIubG9hZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0MiA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBsb2FkJywgdDIgLSB0MSArICdtcycpO1xuICAgICAgICBzZWxmLmdyaWRuYXYgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCAqIDIsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGJsYWNrUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgc2VsZi5lbnRfZm93X2Jsb2NrZXJfbm9kZSA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoICogMywgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgYmxhY2tQaXhlbEhhbmRsZXIpO1xuICAgICAgICBzZWxmLnRvb2xzX25vX3dhcmRzID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGggKiA0LCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBibGFja1BpeGVsSGFuZGxlcik7XG4gICAgICAgIHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCB0cmVlRWxldmF0aW9uUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgc2VsZi5lbGV2YXRpb25HcmlkID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgMCwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgZWxldmF0aW9uUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgdmFyIHQzID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIHByb2Nlc3MnLCB0MyAtIHQyICsgJ21zJyk7XG4gICAgICAgIHNlbGYuZWxldmF0aW9uVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKGVsZXZhdGlvbikge1xuICAgICAgICAgICAgLy9zZWxmLmVsZXZhdGlvbldhbGxzW2VsZXZhdGlvbl0gPSBnZW5lcmF0ZUVsZXZhdGlvbldhbGxzKHNlbGYuZWxldmF0aW9uR3JpZCwgZWxldmF0aW9uKTtcbiAgICAgICAgICAgIHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl0gPSB7fTtcbiAgICAgICAgICAgIHNldFRyZWVXYWxscyhzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dLCBlbGV2YXRpb24sIHNlbGYudHJlZSwgc2VsZi50cmVlX2VsZXZhdGlvbnMsIHNlbGYudHJlZV9zdGF0ZSwgc2VsZi50cmVlX2Jsb2NrcylcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0NCA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3YWxscyBnZW5lcmF0aW9uJywgdDQgLSB0MyArICdtcycpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuZ3JpZFdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIHNlbGYuZ3JpZFtpXSA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWxmLmdyaWRIZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBwdCA9IHh5MnB0KGksIGopO1xuICAgICAgICAgICAgICAgIGtleTJwdF9jYWNoZVtwdC5rZXldID0gcHQ7XG4gICAgICAgICAgICAgICAgc2VsZi5ncmlkW2ldLnB1c2gocHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0NSA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjYWNoZSBwcmltZScsIHQ1IC0gdDQgKyAnbXMnKTtcbiAgICAgICAgc2VsZi5yZWFkeSA9IHRydWU7XG4gICAgICAgIG9uUmVhZHkoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHBhcnNlSW1hZ2UoaW1hZ2VIYW5kbGVyLCBvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIHBpeGVsSGFuZGxlcikge1xuICAgICAgICB2YXIgZ3JpZCA9IHt9O1xuICAgICAgICBpbWFnZUhhbmRsZXIuc2NhbihvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIHBpeGVsSGFuZGxlciwgZ3JpZCk7XG4gICAgICAgIHJldHVybiBncmlkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJsYWNrUGl4ZWxIYW5kbGVyKHgsIHksIHAsIGdyaWQpIHtcbiAgICAgICAgdmFyIHB0ID0gc2VsZi5JbWFnZVhZdG9HcmlkWFkoeCwgeSk7XG4gICAgICAgIGlmIChwWzBdID09PSAwKSB7XG4gICAgICAgICAgICBncmlkW3B0LnggKyBcIixcIiArIHB0LnldID0gcHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbiAgICBmdW5jdGlvbiBlbGV2YXRpb25QaXhlbEhhbmRsZXIoeCwgeSwgcCwgZ3JpZCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLkltYWdlWFl0b0dyaWRYWSh4LCB5KTtcbiAgICAgICAgcHQueiA9IHBbMF07XG4gICAgICAgIGdyaWRbcHQueCArIFwiLFwiICsgcHQueV0gPSBwdDtcbiAgICAgICAgaWYgKHNlbGYuZWxldmF0aW9uVmFsdWVzLmluZGV4T2YocFswXSkgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlbGYuZWxldmF0aW9uVmFsdWVzLnB1c2gocFswXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmVlRWxldmF0aW9uUGl4ZWxIYW5kbGVyKHgsIHksIHAsIGdyaWQpIHtcbiAgICAgICAgdmFyIHB0ID0gc2VsZi5JbWFnZVhZdG9HcmlkWFkoeCwgeSk7XG4gICAgICAgIGlmIChwWzFdID09IDAgJiYgcFsyXSA9PSAwKSB7XG4gICAgICAgICAgICAvLyB0cmVlcyBhcmUgMngyIGluIGdyaWRcbiAgICAgICAgICAgIC8vIHRyZWUgb3JpZ2lucyByb3VuZGVkIHVwIHdoZW4gY29udmVydGVkIHRvIGdyaWQsIHNvIHRoZXkgcmVwcmVzZW50IHRvcCByaWdodCBjb3JuZXIuIHN1YnRyYWN0IDAuNSB0byBnZXQgZ3JpZCBvcmlnaW5cbiAgICAgICAgICAgIHZhciB0cmVlT3JpZ2luID0geHkycHQocHQueCAtIDAuNSwgcHQueSAtIDAuNSk7XG4gICAgICAgICAgICB2YXIgdHJlZUVsZXZhdGlvbiA9IHBbMF0gKyA0MDtcbiAgICAgICAgICAgIHZhciBrQyA9IHRyZWVPcmlnaW4ua2V5O1xuICAgICAgICAgICAgc2VsZi50cmVlW2tDXSA9IHRyZWVPcmlnaW47XG4gICAgICAgICAgICBzZWxmLnRyZWVfZWxldmF0aW9uc1trQ10gPSB0cmVlRWxldmF0aW9uO1xuICAgICAgICAgICAgc2VsZi50cmVlX2Jsb2Nrc1trQ10gPSBbXTtcbiAgICAgICAgICAgIHNlbGYudHJlZV9zdGF0ZVtrQ10gPSB0cnVlO1xuICAgICAgICAgICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRyZWUgMngyIGJ5IHRha2luZyBmbG9vciBhbmQgY2VpbCBvZiB0cmVlIGdyaWQgb3JpZ2luXG4gICAgICAgICAgICBbTWF0aC5mbG9vciwgTWF0aC5jZWlsXS5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgW01hdGguZmxvb3IsIE1hdGguY2VpbF0uZm9yRWFjaChmdW5jdGlvbiAoaikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJlZUNvcm5lciA9IHh5MnB0KGkodHJlZU9yaWdpbi54KSwgaih0cmVlT3JpZ2luLnkpKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlX3JlbGF0aW9uc1t0cmVlQ29ybmVyLmtleV0gPSAoc2VsZi50cmVlX3JlbGF0aW9uc1t0cmVlQ29ybmVyLmtleV0gfHwgW10pLmNvbmNhdCh0cmVlT3JpZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlX2Jsb2Nrc1trQ10ucHVzaCh0cmVlQ29ybmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5saWdodFBhc3Nlc0NhbGxiYWNrID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIGtleSA9IHggKyAnLCcgKyB5O1xuICAgICAgICByZXR1cm4gIShrZXkgaW4gc2VsZi5lbGV2YXRpb25XYWxsc1tzZWxmLmVsZXZhdGlvbl0pICYmICEoa2V5IGluIHNlbGYuZW50X2Zvd19ibG9ja2VyX25vZGUpICYmICEoa2V5IGluIHNlbGYudHJlZVdhbGxzW3NlbGYuZWxldmF0aW9uXSAmJiBzZWxmLnRyZWVXYWxsc1tzZWxmLmVsZXZhdGlvbl1ba2V5XS5sZW5ndGggPiAwKSA7XG4gICAgfVxuICAgIFxuICAgIHRoaXMuZm92ID0gbmV3IFJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcodGhpcy5saWdodFBhc3Nlc0NhbGxiYWNrLCB7dG9wb2xvZ3k6OH0pO1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUudXBkYXRlVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIChnWCwgZ1ksIHJhZGl1cykge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAga2V5ID0geHkya2V5KGdYLCBnWSk7XG5cbiAgICByYWRpdXMgPSByYWRpdXMgfHwgc2VsZi5yYWRpdXM7XG4gICAgdGhpcy5lbGV2YXRpb24gPSB0aGlzLmVsZXZhdGlvbkdyaWRba2V5XS56O1xuICAgIHRoaXMud2FsbHMgPSB0aGlzLnRyZWVXYWxsc1t0aGlzLmVsZXZhdGlvbl07XG4gICAgaWYgKCF0aGlzLmVsZXZhdGlvbldhbGxzW3RoaXMuZWxldmF0aW9uXSkgdGhpcy5lbGV2YXRpb25XYWxsc1t0aGlzLmVsZXZhdGlvbl0gPSBnZW5lcmF0ZUVsZXZhdGlvbldhbGxzKHRoaXMuZWxldmF0aW9uR3JpZCwgdGhpcy5lbGV2YXRpb24pO1xuICAgIC8vc2V0RWxldmF0aW9uV2FsbHModGhpcy53YWxscywgdGhpcy5lbGV2YXRpb25XYWxscywgdGhpcy5lbGV2YXRpb24pXG4gICAgLy9zZXRXYWxscyh0aGlzLndhbGxzLCB0aGlzLmVudF9mb3dfYmxvY2tlcl9ub2RlKTtcbiAgICAvL3NldFdhbGxzKHRoaXMud2FsbHMsIHRoaXMudG9vbHNfbm9fd2FyZHMpO1xuICAgIC8vc2V0VHJlZVdhbGxzKHRoaXMud2FsbHMsIHRoaXMuZWxldmF0aW9uLCB0aGlzLnRyZWUsIHRoaXMudHJlZV9lbGV2YXRpb25zLCB0aGlzLnRyZWVfc3RhdGUsIHRoaXMudHJlZV9ibG9ja3MpO1xuXG4gICAgdGhpcy5mb3Yud2FsbHMgPSB0aGlzLndhbGxzO1xuICAgIHRoaXMubGlnaHRzID0ge307XG4gICAgdGhpcy5mb3YuY29tcHV0ZShnWCwgZ1ksIHJhZGl1cywgZnVuY3Rpb24oeDIsIHkyLCByLCB2aXMpIHtcbiAgICAgICAgdmFyIGtleSA9IHh5MmtleSh4MiwgeTIpO1xuICAgICAgICBpZiAoIXNlbGYuZWxldmF0aW9uR3JpZFtrZXldKSByZXR1cm47XG4gICAgICAgIHZhciB0cmVlUHRzID0gc2VsZi50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgICAgICB2YXIgdHJlZUJsb2NraW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0cmVlUHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWVQdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJlZVB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSBzZWxmLnRyZWVfc3RhdGVbdHJlZVB0LmtleV0gJiYgc2VsZi50cmVlX2VsZXZhdGlvbnNbdHJlZVB0LmtleV0gPiBzZWxmLmVsZXZhdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAodHJlZUJsb2NraW5nKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodmlzID09IDEgJiYgIXNlbGYuZW50X2Zvd19ibG9ja2VyX25vZGVba2V5XSAmJiAhdHJlZUJsb2NraW5nICYmIChnWC14MikqKGdYLXgyKSArIChnWS15MikqKGdZLXkyKSA8IHJhZGl1cyAqIHJhZGl1cykge1xuICAgICAgICAgICAgc2VsZi5saWdodHNba2V5XSA9IDI1NTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5pc1ZhbGlkWFkgPSBmdW5jdGlvbiAoeCwgeSwgYkNoZWNrR3JpZG5hdiwgYkNoZWNrVG9vbHNOb1dhcmRzLCBiQ2hlY2tUcmVlU3RhdGUpIHtcbiAgICB2YXIga2V5ID0geHkya2V5KHgsIHkpLFxuICAgICAgICB0cmVlQmxvY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgaWYgKGJDaGVja1RyZWVTdGF0ZSkge1xuICAgICAgICB2YXIgdHJlZVB0cyA9IHRoaXMudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgIHRyZWVCbG9ja2luZyA9IHRoaXMudHJlZV9zdGF0ZVt0cmVlUHQua2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHJlZUJsb2NraW5nKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4geCA+PSAwICYmIHggPCB0aGlzLmdyaWRXaWR0aCAmJiB5ID49IDAgJiYgeSA8IHRoaXMuZ3JpZEhlaWdodCAmJiAoIWJDaGVja0dyaWRuYXYgfHwgIXRoaXMuZ3JpZG5hdltrZXldKSAmJiAoIWJDaGVja1Rvb2xzTm9XYXJkcyB8fCAhdGhpcy50b29sc19ub193YXJkc1trZXldKSAmJiAoIWJDaGVja1RyZWVTdGF0ZSB8fCAhdHJlZUJsb2NraW5nKTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUudG9nZ2xlVHJlZSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBrZXkgPSB4eTJrZXkoeCwgeSk7XG4gICAgdmFyIGlzVHJlZSA9ICEhdGhpcy50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgIGlmIChpc1RyZWUpIHtcbiAgICAgICAgdmFyIHRyZWVQdHMgPSB0aGlzLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgIHRoaXMudHJlZV9zdGF0ZVtwdC5rZXldID0gIXRoaXMudHJlZV9zdGF0ZVtwdC5rZXldO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmVsZXZhdGlvblZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGV2YXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoZWxldmF0aW9uIDwgc2VsZi50cmVlX2VsZXZhdGlvbnNbcHQua2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW3B0LmtleV0uZm9yRWFjaChmdW5jdGlvbiAocHRCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwdC54ID09IHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV1bal1bMV0gJiYgcHQueSA9PSBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldW2pdWzJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0uc3BsaWNlKGosIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnRyZWVfc3RhdGVbcHQua2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlX2Jsb2Nrc1twdC5rZXldLmZvckVhY2goZnVuY3Rpb24gKHB0Qikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0gPSAoc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XSB8fCBbXSkuY29uY2F0KFtbJ3RyZWUnLCBwdC54LCBwdC55LCBNYXRoLlNRUlQyXV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpc1RyZWU7XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5zZXRSYWRpdXMgPSBmdW5jdGlvbiAocikge1xuICAgIHRoaXMucmFkaXVzID0gcjtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLldvcmxkWFl0b0dyaWRYWSA9IGZ1bmN0aW9uICh3WCwgd1ksIGJOb1JvdW5kKSB7XG4gICAgdmFyIHggPSAod1ggLSB0aGlzLndvcmxkTWluWCkgLyA2NCxcbiAgICAgICAgeSA9ICh3WSAtIHRoaXMud29ybGRNaW5ZKSAvIDY0O1xuICAgIGlmICghYk5vUm91bmQpIHtcbiAgICAgICAgeCA9IHBhcnNlSW50KE1hdGgucm91bmQoeCkpXG4gICAgICAgIHkgPSBwYXJzZUludChNYXRoLnJvdW5kKHkpKVxuICAgIH1cbiAgICByZXR1cm4ge3g6IHgsIHk6IHksIGtleTogeCArICcsJyArIHl9O1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuR3JpZFhZdG9Xb3JsZFhZID0gZnVuY3Rpb24gKGdYLCBnWSkge1xuICAgIHJldHVybiB7eDogZ1ggKiA2NCArIHRoaXMud29ybGRNaW5YLCB5OiBnWSAqIDY0ICsgdGhpcy53b3JsZE1pbll9O1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5HcmlkWFl0b0ltYWdlWFkgPSBmdW5jdGlvbiAoZ1gsIGdZKSB7XG4gICAgcmV0dXJuIHt4OiBnWCwgeTogdGhpcy5ncmlkSGVpZ2h0IC0gZ1kgLSAxfTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuSW1hZ2VYWXRvR3JpZFhZID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB2YXIgZ1kgPSB0aGlzLmdyaWRIZWlnaHQgLSB5IC0gMTtcbiAgICByZXR1cm4ge3g6IHgsIHk6IGdZLCBrZXk6IHggKyAnLCcgKyBnWX07XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLldvcmxkWFl0b0ltYWdlWFkgPSBmdW5jdGlvbiAod1gsIHdZKSB7XG4gICAgdmFyIHB0ID0gdGhpcy5Xb3JsZFhZdG9HcmlkWFkod1gsIHdZKTtcbiAgICByZXR1cm4gdGhpcy5HcmlkWFl0b0ltYWdlWFkocHQueCwgcHQueSk7XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLmtleTJwdCA9IGtleTJwdDtcblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MmtleSA9IHh5MmtleTtcblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MnB0ID0geHkycHQ7XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5wdDJrZXkgPSBwdDJrZXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVmlzaW9uU2ltdWxhdGlvbjsiLCJtb2R1bGUuZXhwb3J0cz17XCJ3b3JsZE1pblhcIjotODI4OCxcIndvcmxkTWF4WFwiOjgyODgsXCJ3b3JsZE1pbllcIjotODI4OCxcIndvcmxkTWF4WVwiOjgyODh9Il19