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
        environment: 'development',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: "daa913cae650241dd886905b722398b1b816e782",
                // Optionally have Rollbar guess which frames the error was thrown from
                // when the browser does not provide line and column numbers.
                guess_uncaught_frames: true
            }
        }
    }
};

//var rollbar = Rollbar.init(rollbarConfig);
    
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
        TOWER_TRUE_SIGHT_RADIUS = 700,
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
        icon_paths = {
            "ent_dota_tree": IMG_DIR + "tree.svg",
            "ent_dota_tree_cut": IMG_DIR + "stump.svg",
            "npc_dota_tower": IMG_DIR + "tower.svg"
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
        DARKNESS = false,
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

    function handleTreeMarkerClick(event) {
        console.log('handleTreeMarkerClick', this);
        setTreeMarkerState(this, !this.treeVisible);
        setTreeQueryString();
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
        var day_vision_radius = DARKNESS ? Math.min(marker.day_vision_radius, DARKNESS_VISION_RADIUS) : marker.day_vision_radius;
        var night_vision_radius = DARKNESS ? Math.min(marker.night_vision_radius, DARKNESS_VISION_RADIUS) : marker.night_vision_radius;
        var true_sight_radius = marker.true_sight_radius;
        var attack_range_radius = marker.attack_range_radius;
        
        if (!skipDay) addVisionCircle(dayRangeLayer, marker, day_vision_radius, 'day_vision_feature', style.day);
        if (!skipNight) addVisionCircle(nightRangeLayer, marker, night_vision_radius, 'night_vision_feature', style.night);
        if (!skipTrueSight) addVisionCircle(trueSightRangeLayer, marker, true_sight_radius, 'true_sight_feature', style.true_sight);
        if (!skipAttack) addVisionCircle(attackRangeLayer, marker, attack_range_radius, 'attack_range_feature', style.attack_range);
        
        if (VISION_SIMULATION && !skipDay) updateVisibilityHandler(marker.lonlat, marker, day_vision_radius);
    }

    function handleTowerMarkerClick(e, skipQueryStringUpdate) {
        console.log('handleTowerMarkerClick');
        var marker = e.object;
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
    }

    function handleWardClick(entityName, style) {
        return function(event) {
            var latlon = map.getLonLatFromPixel(event.xy),
                marker = placeWard(latlon, entityName, style);
            if (marker) QueryString.addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }
    
    function updateWard(marker, radius) {
        if (marker.ward_type == 'observer') {
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
            marker = createWardMarker(entity.icon_path, latlon);
        iconLayer.addMarker(marker);
        
        addVisionCircle(wardVisionLayer, marker, vision_radius, 'radius_feature', style)
        marker.ward_type = entityName;
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
        
        marker.events.register("click", marker, wardMarkerRemove);
        marker.events.register("touchstart", marker, wardMarkerRemove);
        
        console.log('placeWard', this);
        
        return marker;
    }

    function wardMarkerRemove(event) {
        if (this.radius_feature) wardVisionLayer.removeFeatures(this.radius_feature);
        if (this.vision_feature) visionSimulationLayer.removeFeatures(this.vision_feature);
        if (this.vision_center_feature) visionSimulationLayer.removeFeatures(this.vision_center_feature);
        console.log(this);
        this.events.unregister("click", this, wardMarkerRemove);
        this.events.unregister("touchstart", this, wardMarkerRemove);
        this.feature.destroy();
        iconLayer.removeMarker(this);
        OpenLayers.Event.stop(event);

        QueryString.removeQueryStringValue(this.ward_type, this.ward_loc);
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
        
        if (markers.name == "Towers") {
            marker.events.register("mouseover", feature, handleHoverPopup);
            marker.events.register("mouseout", feature, handleHoverPopup);
        }
        else if (markers.name == "Trees" && VISION_SIMULATION) {
            marker.events.register("mouseover", feature, handleHoverPopup);
            marker.events.register("mouseout", feature, handleHoverPopup);
        }
        markers.addMarker(marker);
        return marker;
    }

    function createWardMarker(img, latlon, popupContentHTML) {
        var size = new OpenLayers.Size(21, 25),
            offset = new OpenLayers.Pixel(-(size.w / 2), -size.h),
            icon = new OpenLayers.Icon(img, size, offset);
            
        var feature = new OpenLayers.Feature(iconLayer, latlon);
        feature.data.lonlat = latlon;
        feature.data.icon = icon;
        feature.closeBox = false;
        feature.popupClass = OpenLayers.Popup.FramedCloud;
        feature.data.popupContentHTML = popupContentHTML;
        feature.data.overflow = "hidden";
        var marker = feature.createMarker();
        marker.feature = feature;
        
        marker.events.register("mouseover", feature, handleHoverPopup);
        marker.events.register("mouseout", feature, handleHoverPopup);
        
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
                        
                        var icon = null;
                        if (icon_paths[k]) {
                            var size = new OpenLayers.Size(24, 24),
                                offset = new OpenLayers.Pixel(-12,-12),
                                icon = new OpenLayers.Icon(icon_paths[k], size, offset);
                        }
                
                        marker = addMarker(markers[k], new OpenLayers.LonLat(latlon.x, latlon.y), icon, OpenLayers.Popup.FramedCloud, "Click to toggle range overlay", false);

                        if (k == "npc_dota_tower") {
                            console.log('npc_dota_tower');
                            marker.day_vision_radius = TOWER_DAY_VISION_RADIUS;
                            marker.night_vision_radius = TOWER_NIGHT_VISION_RADIUS;
                            marker.true_sight_radius = TOWER_TRUE_SIGHT_RADIUS;
                            marker.attack_range_radius = TOWER_ATTACK_RANGE_RADIUS;
                            marker.showInfo = false;
                            marker.ward_type = 'tower'
                        
                            marker.events.register("click", markers[k], handleTowerMarkerClick);
                            marker.events.register("touchstart", markers[k], handleTowerMarkerClick);
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
        for (var i = 0; i < layer.data.length; i++) {
            var latlon = worldToLatLon(layer.data[i].x, layer.data[i].y);
            var size = new OpenLayers.Size(24, 24),
                offset = new OpenLayers.Pixel(-12,-12),
                icon = new OpenLayers.Icon(icon_paths["ent_dota_tree"], size, offset);
            marker = addMarker(layer, new OpenLayers.LonLat(latlon.x, latlon.y), icon, OpenLayers.Popup.FramedCloud, "Click to cut down tree.<br>This will affect the ward vision simulation.", false);
            marker.treeVisible = true;
            marker.tree_loc = layer.data[i].x + ',' + layer.data[i].y;
            if (VISION_SIMULATION) {
                marker.events.register("click", marker, handleTreeMarkerClick);
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
        init();
    }, false);
    
    document.getElementById('dataControl').addEventListener('change', function () {
        QueryString.setQueryString('data', document.getElementById('dataControl').value);
        resetMarkerLayers();
        init();
    }, false);
    
    document.getElementById('vision-radius').addEventListener('change', function () {
        console.log('vision-radius change', document.getElementById('vision-radius').value);
        document.getElementById('vision-radius').setAttribute('data-dirty-value', true);
    }, false);
    
    document.getElementById('darknessControl').addEventListener('change', function () {
        toggleDarkness(document.getElementById('darknessControl').checked);
        QueryString.setQueryString('darkness', document.getElementById('dataControl').value);
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
            if (marker.ward_type == 'observer') {
                updateWard(marker, state ? DARKNESS_VISION_RADIUS : marker.vision_radius);
            }
        });
        var layer = map.getLayersByName(layerNames["npc_dota_tower"])[0];
        if (layer) {
            layer.markers.forEach(function (marker) {
                if (marker.showInfo) addBuildingVisionFeatures(marker, false, false, true, true);
            });
        }
    }
    
    function getDataVersion() {
        return document.getElementById('dataControl').value;
    }
    
    function updateVisibleArea() {
        document.getElementById('visible-area').innerHTML = "Visibility: " + (vs.lightArea / vs.area * 100).toFixed() + '% ' + vs.lightArea + "/" + vs.area;
    }

    function updateVisibilityHandler(latlon, marker, radius) {
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
            var visionFeature = new OpenLayers.Feature.Vector(multiPolygon, null, style.yellow);
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
                updatePopup(marker);
            }
        }
    }
    
    function updatePopup(marker) {
        var popupContentHTML = "Visibility: " + (vs.lightArea / vs.area * 100).toFixed() + '% ' + vs.lightArea + "/" + vs.area;
        if (marker.ward_type === "tower") popupContentHTML = "Click to toggle range overlay<br><br>" + popupContentHTML;
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
        getJSON(map_data_path + getDataVersion() + '/mapdata.json', onMapDataLoad);
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
        strokeOpacity: 1,
        strokeWidth: 1,
        fillColor: "#ee9900",
        fillOpacity: 0.1
    },
    night: {
        strokeColor: "#000080",
        strokeOpacity: 1,
        strokeWidth: 2,
        fillColor: "#007FFF",
        fillOpacity: 0.1
    },
    true_sight: {
        strokeColor: "#007FFF",
        strokeOpacity: 2,
        strokeWidth: 1,
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
        strokeOpacity: 2,
        strokeWidth: 1,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcm9sbGJhci1icm93c2VyL2Rpc3Qvcm9sbGJhci51bWQubm9qc29uLm1pbi5qcyIsInNyYy9hcHAuanMiLCJzcmMvY29udmVyc2lvbkZ1bmN0aW9ucy5qcyIsInNyYy9nZXRMaWdodFVuaW9uLmpzIiwic3JjL21hcENvbnN0YW50cy5qcyIsInNyYy9zdHlsZUNvbnN0YW50cy5qcyIsInNyYy91dGlsL2RlYm91bmNlLmpzIiwic3JjL3V0aWwvZ2V0SlNPTi5qcyIsInNyYy91dGlsL3F1ZXJ5U3RyaW5nLmpzIiwic3JjL3V0aWwvdHJpbS5qcyIsIi4uL2RvdGEtdmlzaW9uLXNpbXVsYXRpb24vYnJvd3Nlci9pbWFnZUhhbmRsZXIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL2Jyb3dzZXIvcG5nLmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9icm93c2VyL3psaWIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy9yb3Q2LmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvdmlzaW9uLXNpbXVsYXRpb24uanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDampCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVRBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiFmdW5jdGlvbihlLHIpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPXIoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10scik7ZWxzZXt2YXIgdD1yKCk7Zm9yKHZhciBuIGluIHQpKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6ZSlbbl09dFtuXX19KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oZSl7ZnVuY3Rpb24gcihuKXtpZih0W25dKXJldHVybiB0W25dLmV4cG9ydHM7dmFyIG89dFtuXT17ZXhwb3J0czp7fSxpZDpuLGxvYWRlZDohMX07cmV0dXJuIGVbbl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsciksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciB0PXt9O3JldHVybiByLm09ZSxyLmM9dCxyLnA9XCJcIixyKDApfShbZnVuY3Rpb24oZSxyLHQpe2UuZXhwb3J0cz10KDEpfSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe3ZhciBlPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBKU09OP3t9OkpTT047by5zZXR1cEpTT04oZSl9dmFyIG89dCgyKSxpPXQoMyk7bigpO3ZhciBhPXdpbmRvdy5fcm9sbGJhckNvbmZpZyxzPWEmJmEuZ2xvYmFsQWxpYXN8fFwiUm9sbGJhclwiLHU9d2luZG93W3NdJiZcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93W3NdLnNoaW1JZDshdSYmYT9vLndyYXBwZXIuaW5pdChhKTood2luZG93LlJvbGxiYXI9by53cmFwcGVyLHdpbmRvdy5Sb2xsYmFyTm90aWZpZXI9aS5Ob3RpZmllciksZS5leHBvcnRzPW8ud3JhcHBlcn0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSxyLHQpeyF0WzRdJiZ3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3ImJih0WzRdPXdpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcix3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3I9bnVsbCksZS51bmNhdWdodEVycm9yLmFwcGx5KGUsdCksciYmci5hcHBseSh3aW5kb3csdCl9ZnVuY3Rpb24gbyhlLHIpe2lmKHIuaGFzT3duUHJvcGVydHkmJnIuaGFzT3duUHJvcGVydHkoXCJhZGRFdmVudExpc3RlbmVyXCIpKXt2YXIgdD1yLmFkZEV2ZW50TGlzdGVuZXI7ci5hZGRFdmVudExpc3RlbmVyPWZ1bmN0aW9uKHIsbixvKXt0LmNhbGwodGhpcyxyLGUud3JhcChuKSxvKX07dmFyIG49ci5yZW1vdmVFdmVudExpc3RlbmVyO3IucmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihlLHIsdCl7bi5jYWxsKHRoaXMsZSxyJiZyLl93cmFwcGVkfHxyLHQpfX19dmFyIGk9dCgzKSxhPXQoOCkscz1pLk5vdGlmaWVyO3dpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcj1udWxsO3ZhciB1PXt9O3UuaW5pdD1mdW5jdGlvbihlLHIpe3ZhciB0PW5ldyBzKHIpO2lmKHQuY29uZmlndXJlKGUpLGUuY2FwdHVyZVVuY2F1Z2h0KXt2YXIgaTtyJiZhLmlzVHlwZShyLl9yb2xsYmFyT2xkT25FcnJvcixcImZ1bmN0aW9uXCIpP2k9ci5fcm9sbGJhck9sZE9uRXJyb3I6d2luZG93Lm9uZXJyb3ImJiF3aW5kb3cub25lcnJvci5iZWxvbmdzVG9TaGltJiYoaT13aW5kb3cub25lcnJvciksd2luZG93Lm9uZXJyb3I9ZnVuY3Rpb24oKXt2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMCk7bih0LGksZSl9O3ZhciB1LGMsbD1bXCJFdmVudFRhcmdldFwiLFwiV2luZG93XCIsXCJOb2RlXCIsXCJBcHBsaWNhdGlvbkNhY2hlXCIsXCJBdWRpb1RyYWNrTGlzdFwiLFwiQ2hhbm5lbE1lcmdlck5vZGVcIixcIkNyeXB0b09wZXJhdGlvblwiLFwiRXZlbnRTb3VyY2VcIixcIkZpbGVSZWFkZXJcIixcIkhUTUxVbmtub3duRWxlbWVudFwiLFwiSURCRGF0YWJhc2VcIixcIklEQlJlcXVlc3RcIixcIklEQlRyYW5zYWN0aW9uXCIsXCJLZXlPcGVyYXRpb25cIixcIk1lZGlhQ29udHJvbGxlclwiLFwiTWVzc2FnZVBvcnRcIixcIk1vZGFsV2luZG93XCIsXCJOb3RpZmljYXRpb25cIixcIlNWR0VsZW1lbnRJbnN0YW5jZVwiLFwiU2NyZWVuXCIsXCJUZXh0VHJhY2tcIixcIlRleHRUcmFja0N1ZVwiLFwiVGV4dFRyYWNrTGlzdFwiLFwiV2ViU29ja2V0XCIsXCJXZWJTb2NrZXRXb3JrZXJcIixcIldvcmtlclwiLFwiWE1MSHR0cFJlcXVlc3RcIixcIlhNTEh0dHBSZXF1ZXN0RXZlbnRUYXJnZXRcIixcIlhNTEh0dHBSZXF1ZXN0VXBsb2FkXCJdO2Zvcih1PTA7dTxsLmxlbmd0aDsrK3UpYz1sW3VdLHdpbmRvd1tjXSYmd2luZG93W2NdLnByb3RvdHlwZSYmbyh0LHdpbmRvd1tjXS5wcm90b3R5cGUpfXJldHVybiBlLmNhcHR1cmVVbmhhbmRsZWRSZWplY3Rpb25zJiYociYmYS5pc1R5cGUoci5fdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlcixcImZ1bmN0aW9uXCIpJiZ3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLHIuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIpLHQuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXI9ZnVuY3Rpb24oZSl7dmFyIHI9ZS5yZWFzb24sbj1lLnByb21pc2Usbz1lLmRldGFpbDshciYmbyYmKHI9by5yZWFzb24sbj1vLnByb21pc2UpLHQudW5oYW5kbGVkUmVqZWN0aW9uKHIsbil9LHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidW5oYW5kbGVkcmVqZWN0aW9uXCIsdC5fdW5oYW5kbGVkUmVqZWN0aW9uSGFuZGxlcikpLHdpbmRvdy5Sb2xsYmFyPXQscy5wcm9jZXNzUGF5bG9hZHMoKSx0fSxlLmV4cG9ydHM9e3dyYXBwZXI6dSxzZXR1cEpTT046aS5zZXR1cEpTT059fSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlKXtFPWUsdy5zZXR1cEpTT04oZSl9ZnVuY3Rpb24gbyhlLHIpe3JldHVybiBmdW5jdGlvbigpe3ZhciB0PXJ8fHRoaXM7dHJ5e3JldHVybiBlLmFwcGx5KHQsYXJndW1lbnRzKX1jYXRjaChuKXtjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOlwiLG4pfX19ZnVuY3Rpb24gaSgpe2h8fChoPXNldFRpbWVvdXQoZiwxZTMpKX1mdW5jdGlvbiBhKCl7cmV0dXJuIF99ZnVuY3Rpb24gcyhlKXtfPV98fHRoaXM7dmFyIHI9XCJodHRwczovL1wiK3MuREVGQVVMVF9FTkRQT0lOVDt0aGlzLm9wdGlvbnM9e2VuYWJsZWQ6ITAsZW5kcG9pbnQ6cixlbnZpcm9ubWVudDpcInByb2R1Y3Rpb25cIixzY3J1YkZpZWxkczpnKFtdLHMuREVGQVVMVF9TQ1JVQl9GSUVMRFMpLGNoZWNrSWdub3JlOm51bGwsbG9nTGV2ZWw6cy5ERUZBVUxUX0xPR19MRVZFTCxyZXBvcnRMZXZlbDpzLkRFRkFVTFRfUkVQT1JUX0xFVkVMLHVuY2F1Z2h0RXJyb3JMZXZlbDpzLkRFRkFVTFRfVU5DQVVHSFRfRVJST1JfTEVWRUwscGF5bG9hZDp7fX0sdGhpcy5sYXN0RXJyb3I9bnVsbCx0aGlzLnBsdWdpbnM9e30sdGhpcy5wYXJlbnROb3RpZmllcj1lLGUmJihlLmhhc093blByb3BlcnR5KFwic2hpbUlkXCIpP2Uubm90aWZpZXI9dGhpczp0aGlzLmNvbmZpZ3VyZShlLm9wdGlvbnMpKX1mdW5jdGlvbiB1KGUpe3dpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZS5wdXNoKGUpLGkoKX1mdW5jdGlvbiBjKGUpe3JldHVybiBvKGZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5fZ2V0TG9nQXJncyhhcmd1bWVudHMpO3JldHVybiB0aGlzLl9sb2coZXx8ci5sZXZlbHx8dGhpcy5vcHRpb25zLmxvZ0xldmVsfHxzLkRFRkFVTFRfTE9HX0xFVkVMLHIubWVzc2FnZSxyLmVycixyLmN1c3RvbSxyLmNhbGxiYWNrKX0pfWZ1bmN0aW9uIGwoZSxyKXtlfHwoZT1yP0Uuc3RyaW5naWZ5KHIpOlwiXCIpO3ZhciB0PXtib2R5OmV9O3JldHVybiByJiYodC5leHRyYT1nKCEwLHt9LHIpKSx7bWVzc2FnZTp0fX1mdW5jdGlvbiBwKGUscix0KXt2YXIgbj1tLmd1ZXNzRXJyb3JDbGFzcyhyLm1lc3NhZ2UpLG89ci5uYW1lfHxuWzBdLGk9blsxXSxhPXtleGNlcHRpb246e1wiY2xhc3NcIjpvLG1lc3NhZ2U6aX19O2lmKGUmJihhLmV4Y2VwdGlvbi5kZXNjcmlwdGlvbj1lfHxcInVuY2F1Z2h0IGV4Y2VwdGlvblwiKSxyLnN0YWNrKXt2YXIgcyx1LGMscCxmLGQsaCx3O2ZvcihhLmZyYW1lcz1bXSxoPTA7aDxyLnN0YWNrLmxlbmd0aDsrK2gpcz1yLnN0YWNrW2hdLHU9e2ZpbGVuYW1lOnMudXJsP3Yuc2FuaXRpemVVcmwocy51cmwpOlwiKHVua25vd24pXCIsbGluZW5vOnMubGluZXx8bnVsbCxtZXRob2Q6cy5mdW5jJiZcIj9cIiE9PXMuZnVuYz9zLmZ1bmM6XCJbYW5vbnltb3VzXVwiLGNvbG5vOnMuY29sdW1ufSxjPXA9Zj1udWxsLGQ9cy5jb250ZXh0P3MuY29udGV4dC5sZW5ndGg6MCxkJiYodz1NYXRoLmZsb29yKGQvMikscD1zLmNvbnRleHQuc2xpY2UoMCx3KSxjPXMuY29udGV4dFt3XSxmPXMuY29udGV4dC5zbGljZSh3KSksYyYmKHUuY29kZT1jKSwocHx8ZikmJih1LmNvbnRleHQ9e30scCYmcC5sZW5ndGgmJih1LmNvbnRleHQucHJlPXApLGYmJmYubGVuZ3RoJiYodS5jb250ZXh0LnBvc3Q9ZikpLHMuYXJncyYmKHUuYXJncz1zLmFyZ3MpLGEuZnJhbWVzLnB1c2godSk7cmV0dXJuIGEuZnJhbWVzLnJldmVyc2UoKSx0JiYoYS5leHRyYT1nKCEwLHt9LHQpKSx7dHJhY2U6YX19cmV0dXJuIGwobytcIjogXCIraSx0KX1mdW5jdGlvbiBmKCl7dmFyIGU7dHJ5e2Zvcig7ZT13aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWUuc2hpZnQoKTspZChlKX1maW5hbGx5e2g9dm9pZCAwfX1mdW5jdGlvbiBkKGUpe3ZhciByPWUuZW5kcG9pbnRVcmwsdD1lLmFjY2Vzc1Rva2VuLG49ZS5wYXlsb2FkLG89ZS5jYWxsYmFja3x8ZnVuY3Rpb24oKXt9LGk9KG5ldyBEYXRlKS5nZXRUaW1lKCk7aS1MPj02ZTQmJihMPWksUj0wKTt2YXIgYT13aW5kb3cuX2dsb2JhbFJvbGxiYXJPcHRpb25zLm1heEl0ZW1zLGM9d2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5pdGVtc1Blck1pbnV0ZSxsPWZ1bmN0aW9uKCl7cmV0dXJuIW4uaWdub3JlUmF0ZUxpbWl0JiZhPj0xJiZUPj1hfSxwPWZ1bmN0aW9uKCl7cmV0dXJuIW4uaWdub3JlUmF0ZUxpbWl0JiZjPj0xJiZSPj1jfTtyZXR1cm4gbCgpP3ZvaWQgbyhuZXcgRXJyb3IoYStcIiBtYXggaXRlbXMgcmVhY2hlZFwiKSk6cCgpP3ZvaWQgbyhuZXcgRXJyb3IoYytcIiBpdGVtcyBwZXIgbWludXRlIHJlYWNoZWRcIikpOihUKyssUisrLGwoKSYmXy5fbG9nKF8ub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsXCJtYXhJdGVtcyBoYXMgYmVlbiBoaXQuIElnbm9yaW5nIGVycm9ycyBmb3IgdGhlIHJlbWFpbmRlciBvZiB0aGUgY3VycmVudCBwYWdlIGxvYWQuXCIsbnVsbCx7bWF4SXRlbXM6YX0sbnVsbCwhMSwhMCksbi5pZ25vcmVSYXRlTGltaXQmJmRlbGV0ZSBuLmlnbm9yZVJhdGVMaW1pdCx2b2lkIHkucG9zdChyLHQsbixmdW5jdGlvbihyLHQpe3JldHVybiByPyhyIGluc3RhbmNlb2YgYiYmKGUuY2FsbGJhY2s9ZnVuY3Rpb24oKXt9LHNldFRpbWVvdXQoZnVuY3Rpb24oKXt1KGUpfSxzLlJFVFJZX0RFTEFZKSksbyhyKSk6byhudWxsLHQpfSkpfXZhciBoLGc9dCg0KSxtPXQoNSksdj10KDgpLHc9dCgxMCkseT13LlhIUixiPXcuQ29ubmVjdGlvbkVycm9yLEU9bnVsbDtzLk5PVElGSUVSX1ZFUlNJT049XCIxLjkuMlwiLHMuREVGQVVMVF9FTkRQT0lOVD1cImFwaS5yb2xsYmFyLmNvbS9hcGkvMS9cIixzLkRFRkFVTFRfU0NSVUJfRklFTERTPVtcInB3XCIsXCJwYXNzXCIsXCJwYXNzd2RcIixcInBhc3N3b3JkXCIsXCJzZWNyZXRcIixcImNvbmZpcm1fcGFzc3dvcmRcIixcImNvbmZpcm1QYXNzd29yZFwiLFwicGFzc3dvcmRfY29uZmlybWF0aW9uXCIsXCJwYXNzd29yZENvbmZpcm1hdGlvblwiLFwiYWNjZXNzX3Rva2VuXCIsXCJhY2Nlc3NUb2tlblwiLFwic2VjcmV0X2tleVwiLFwic2VjcmV0S2V5XCIsXCJzZWNyZXRUb2tlblwiXSxzLkRFRkFVTFRfTE9HX0xFVkVMPVwiZGVidWdcIixzLkRFRkFVTFRfUkVQT1JUX0xFVkVMPVwiZGVidWdcIixzLkRFRkFVTFRfVU5DQVVHSFRfRVJST1JfTEVWRUw9XCJlcnJvclwiLHMuREVGQVVMVF9JVEVNU19QRVJfTUlOPTYwLHMuREVGQVVMVF9NQVhfSVRFTVM9MCxzLkxFVkVMUz17ZGVidWc6MCxpbmZvOjEsd2FybmluZzoyLGVycm9yOjMsY3JpdGljYWw6NH0scy5SRVRSWV9ERUxBWT0xZTQsd2luZG93Ll9yb2xsYmFyUGF5bG9hZFF1ZXVlPXdpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZXx8W10sd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucz17c3RhcnRUaW1lOihuZXcgRGF0ZSkuZ2V0VGltZSgpLG1heEl0ZW1zOnMuREVGQVVMVF9NQVhfSVRFTVMsaXRlbXNQZXJNaW51dGU6cy5ERUZBVUxUX0lURU1TX1BFUl9NSU59O3ZhciBfLHg9cy5wcm90b3R5cGU7eC5fZ2V0TG9nQXJncz1mdW5jdGlvbihlKXtmb3IodmFyIHIsdCxuLGksYSx1LGM9dGhpcy5vcHRpb25zLmxvZ0xldmVsfHxzLkRFRkFVTFRfTE9HX0xFVkVMLGw9W10scD0wO3A8ZS5sZW5ndGg7KytwKXU9ZVtwXSxhPXYudHlwZU5hbWUodSksXCJzdHJpbmdcIj09PWE/cj9sLnB1c2godSk6cj11OlwiZnVuY3Rpb25cIj09PWE/aT1vKHUsdGhpcyk6XCJkYXRlXCI9PT1hP2wucHVzaCh1KTpcImVycm9yXCI9PT1hfHx1IGluc3RhbmNlb2YgRXJyb3J8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBET01FeGNlcHRpb24mJnUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24/dD9sLnB1c2godSk6dD11Olwib2JqZWN0XCIhPT1hJiZcImFycmF5XCIhPT1hfHwobj9sLnB1c2godSk6bj11KTtyZXR1cm4gbC5sZW5ndGgmJihuPW58fHt9LG4uZXh0cmFBcmdzPWwpLHtsZXZlbDpjLG1lc3NhZ2U6cixlcnI6dCxjdXN0b206bixjYWxsYmFjazppfX0seC5fcm91dGU9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcy5vcHRpb25zLmVuZHBvaW50LHQ9L1xcLyQvLnRlc3Qociksbj0vXlxcLy8udGVzdChlKTtyZXR1cm4gdCYmbj9lPWUuc3Vic3RyaW5nKDEpOnR8fG58fChlPVwiL1wiK2UpLHIrZX0seC5fcHJvY2Vzc1NoaW1RdWV1ZT1mdW5jdGlvbihlKXtmb3IodmFyIHIsdCxuLG8saSxhLHUsYz17fTt0PWUuc2hpZnQoKTspcj10LnNoaW0sbj10Lm1ldGhvZCxvPXQuYXJncyxpPXIucGFyZW50U2hpbSx1PWNbci5zaGltSWRdLHV8fChpPyhhPWNbaS5zaGltSWRdLHU9bmV3IHMoYSkpOnU9dGhpcyxjW3Iuc2hpbUlkXT11KSx1W25dJiZ2LmlzVHlwZSh1W25dLFwiZnVuY3Rpb25cIikmJnVbbl0uYXBwbHkodSxvKX0seC5fYnVpbGRQYXlsb2FkPWZ1bmN0aW9uKGUscix0LG4sbyl7dmFyIGk9dGhpcy5vcHRpb25zLmFjY2Vzc1Rva2VuLGE9dGhpcy5vcHRpb25zLmVudmlyb25tZW50LHU9ZyghMCx7fSx0aGlzLm9wdGlvbnMucGF5bG9hZCksYz12LnV1aWQ0KCk7aWYodm9pZCAwPT09cy5MRVZFTFNbcl0pdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBsZXZlbFwiKTtpZighdCYmIW4mJiFvKXRocm93IG5ldyBFcnJvcihcIk5vIG1lc3NhZ2UsIHN0YWNrIGluZm8gb3IgY3VzdG9tIGRhdGFcIik7dmFyIGw9e2Vudmlyb25tZW50OmEsZW5kcG9pbnQ6dGhpcy5vcHRpb25zLmVuZHBvaW50LHV1aWQ6YyxsZXZlbDpyLHBsYXRmb3JtOlwiYnJvd3NlclwiLGZyYW1ld29yazpcImJyb3dzZXItanNcIixsYW5ndWFnZTpcImphdmFzY3JpcHRcIixib2R5OnRoaXMuX2J1aWxkQm9keSh0LG4sbykscmVxdWVzdDp7dXJsOndpbmRvdy5sb2NhdGlvbi5ocmVmLHF1ZXJ5X3N0cmluZzp3aW5kb3cubG9jYXRpb24uc2VhcmNoLHVzZXJfaXA6XCIkcmVtb3RlX2lwXCJ9LGNsaWVudDp7cnVudGltZV9tczplLmdldFRpbWUoKS13aW5kb3cuX2dsb2JhbFJvbGxiYXJPcHRpb25zLnN0YXJ0VGltZSx0aW1lc3RhbXA6TWF0aC5yb3VuZChlLmdldFRpbWUoKS8xZTMpLGphdmFzY3JpcHQ6e2Jyb3dzZXI6d2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQsbGFuZ3VhZ2U6d2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSxjb29raWVfZW5hYmxlZDp3aW5kb3cubmF2aWdhdG9yLmNvb2tpZUVuYWJsZWQsc2NyZWVuOnt3aWR0aDp3aW5kb3cuc2NyZWVuLndpZHRoLGhlaWdodDp3aW5kb3cuc2NyZWVuLmhlaWdodH0scGx1Z2luczp0aGlzLl9nZXRCcm93c2VyUGx1Z2lucygpfX0sc2VydmVyOnt9LG5vdGlmaWVyOntuYW1lOlwicm9sbGJhci1icm93c2VyLWpzXCIsdmVyc2lvbjpzLk5PVElGSUVSX1ZFUlNJT059fTt1LmJvZHkmJmRlbGV0ZSB1LmJvZHk7dmFyIHA9e2FjY2Vzc190b2tlbjppLGRhdGE6ZyghMCxsLHUpfTtyZXR1cm4gdGhpcy5fc2NydWIocC5kYXRhKSxwfSx4Ll9idWlsZEJvZHk9ZnVuY3Rpb24oZSxyLHQpe3ZhciBuO3JldHVybiBuPXI/cChlLHIsdCk6bChlLHQpfSx4Ll9nZXRCcm93c2VyUGx1Z2lucz1mdW5jdGlvbigpe2lmKCF0aGlzLl9icm93c2VyUGx1Z2lucyl7dmFyIGUscix0PXdpbmRvdy5uYXZpZ2F0b3IucGx1Z2luc3x8W10sbj10Lmxlbmd0aCxvPVtdO2ZvcihyPTA7cjxuOysrcillPXRbcl0sby5wdXNoKHtuYW1lOmUubmFtZSxkZXNjcmlwdGlvbjplLmRlc2NyaXB0aW9ufSk7dGhpcy5fYnJvd3NlclBsdWdpbnM9b31yZXR1cm4gdGhpcy5fYnJvd3NlclBsdWdpbnN9LHguX3NjcnViPWZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHIoZSxyLHQsbixvLGkpe3JldHVybiByK3YucmVkYWN0KGkpfWZ1bmN0aW9uIHQoZSl7dmFyIHQ7aWYodi5pc1R5cGUoZSxcInN0cmluZ1wiKSlmb3IodD0wO3Q8cy5sZW5ndGg7Kyt0KWU9ZS5yZXBsYWNlKHNbdF0scik7cmV0dXJuIGV9ZnVuY3Rpb24gbihlLHIpe3ZhciB0O2Zvcih0PTA7dDxhLmxlbmd0aDsrK3QpaWYoYVt0XS50ZXN0KGUpKXtyPXYucmVkYWN0KHIpO2JyZWFrfXJldHVybiByfWZ1bmN0aW9uIG8oZSxyKXt2YXIgbz1uKGUscik7cmV0dXJuIG89PT1yP3Qobyk6b312YXIgaT10aGlzLm9wdGlvbnMuc2NydWJGaWVsZHMsYT10aGlzLl9nZXRTY3J1YkZpZWxkUmVnZXhzKGkpLHM9dGhpcy5fZ2V0U2NydWJRdWVyeVBhcmFtUmVnZXhzKGkpO3JldHVybiB2LnRyYXZlcnNlKGUsbyksZX0seC5fZ2V0U2NydWJGaWVsZFJlZ2V4cz1mdW5jdGlvbihlKXtmb3IodmFyIHIsdD1bXSxuPTA7bjxlLmxlbmd0aDsrK24pcj1cIlxcXFxbPyglNVtiQl0pP1wiK2Vbbl0rXCJcXFxcWz8oJTVbYkJdKT9cXFxcXT8oJTVbZERdKT9cIix0LnB1c2gobmV3IFJlZ0V4cChyLFwiaVwiKSk7cmV0dXJuIHR9LHguX2dldFNjcnViUXVlcnlQYXJhbVJlZ2V4cz1mdW5jdGlvbihlKXtmb3IodmFyIHIsdD1bXSxuPTA7bjxlLmxlbmd0aDsrK24pcj1cIlxcXFxbPyglNVtiQl0pP1wiK2Vbbl0rXCJcXFxcWz8oJTVbYkJdKT9cXFxcXT8oJTVbZERdKT9cIix0LnB1c2gobmV3IFJlZ0V4cChcIihcIityK1wiPSkoW14mXFxcXG5dKylcIixcImlnbVwiKSk7cmV0dXJuIHR9LHguX3VybElzV2hpdGVsaXN0ZWQ9ZnVuY3Rpb24oZSl7dmFyIHIsdCxuLG8saSxhLHMsdSxjLGw7dHJ5e2lmKHI9dGhpcy5vcHRpb25zLmhvc3RXaGl0ZUxpc3QsdD1lJiZlLmRhdGEmJmUuZGF0YS5ib2R5JiZlLmRhdGEuYm9keS50cmFjZSwhcnx8MD09PXIubGVuZ3RoKXJldHVybiEwO2lmKCF0KXJldHVybiEwO2ZvcihzPXIubGVuZ3RoLGk9dC5mcmFtZXMubGVuZ3RoLGM9MDtjPGk7YysrKXtpZihuPXQuZnJhbWVzW2NdLG89bi5maWxlbmFtZSwhdi5pc1R5cGUobyxcInN0cmluZ1wiKSlyZXR1cm4hMDtmb3IobD0wO2w8cztsKyspaWYoYT1yW2xdLHU9bmV3IFJlZ0V4cChhKSx1LnRlc3QobykpcmV0dXJuITB9fWNhdGNoKHApe3JldHVybiB0aGlzLmNvbmZpZ3VyZSh7aG9zdFdoaXRlTGlzdDpudWxsfSksY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgcmVhZGluZyB5b3VyIGNvbmZpZ3VyYXRpb24ncyBob3N0V2hpdGVMaXN0IG9wdGlvbi4gUmVtb3ZpbmcgY3VzdG9tIGhvc3RXaGl0ZUxpc3QuXCIscCksITB9cmV0dXJuITF9LHguX21lc3NhZ2VJc0lnbm9yZWQ9ZnVuY3Rpb24oZSl7dmFyIHIsdCxuLG8saSxhLHMsdSxjO3RyeXtpZihpPSExLG49dGhpcy5vcHRpb25zLmlnbm9yZWRNZXNzYWdlcywhbnx8MD09PW4ubGVuZ3RoKXJldHVybiExO2lmKHM9ZSYmZS5kYXRhJiZlLmRhdGEuYm9keSx1PXMmJnMudHJhY2UmJnMudHJhY2UuZXhjZXB0aW9uJiZzLnRyYWNlLmV4Y2VwdGlvbi5tZXNzYWdlLGM9cyYmcy5tZXNzYWdlJiZzLm1lc3NhZ2UuYm9keSxyPXV8fGMsIXIpcmV0dXJuITE7Zm9yKG89bi5sZW5ndGgsdD0wO3Q8byYmKGE9bmV3IFJlZ0V4cChuW3RdLFwiZ2lcIiksIShpPWEudGVzdChyKSkpO3QrKyk7fWNhdGNoKGwpe3RoaXMuY29uZmlndXJlKHtpZ25vcmVkTWVzc2FnZXM6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHJlYWRpbmcgeW91ciBjb25maWd1cmF0aW9uJ3MgaWdub3JlZE1lc3NhZ2VzIG9wdGlvbi4gUmVtb3ZpbmcgY3VzdG9tIGlnbm9yZWRNZXNzYWdlcy5cIil9cmV0dXJuIGl9LHguX2VucXVldWVQYXlsb2FkPWZ1bmN0aW9uKGUscix0LG4pe3ZhciBvPXtjYWxsYmFjazpuLGFjY2Vzc1Rva2VuOnRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbixlbmRwb2ludFVybDp0aGlzLl9yb3V0ZShcIml0ZW0vXCIpLHBheWxvYWQ6ZX0saT1mdW5jdGlvbigpe2lmKG4pe3ZhciBlPVwiVGhpcyBpdGVtIHdhcyBub3Qgc2VudCB0byBSb2xsYmFyIGJlY2F1c2UgaXQgd2FzIGlnbm9yZWQuIFRoaXMgY2FuIGhhcHBlbiBpZiBhIGN1c3RvbSBjaGVja0lnbm9yZSgpIGZ1bmN0aW9uIHdhcyB1c2VkIG9yIGlmIHRoZSBpdGVtJ3MgbGV2ZWwgd2FzIGxlc3MgdGhhbiB0aGUgbm90aWZpZXInIHJlcG9ydExldmVsLiBTZWUgaHR0cHM6Ly9yb2xsYmFyLmNvbS9kb2NzL25vdGlmaWVyL3JvbGxiYXIuanMvY29uZmlndXJhdGlvbiBmb3IgbW9yZSBkZXRhaWxzLlwiO24obnVsbCx7ZXJyOjAscmVzdWx0OntpZDpudWxsLHV1aWQ6bnVsbCxtZXNzYWdlOmV9fSl9fTtpZih0aGlzLl9pbnRlcm5hbENoZWNrSWdub3JlKHIsdCxlKSlyZXR1cm4gdm9pZCBpKCk7dHJ5e2lmKHYuaXNUeXBlKHRoaXMub3B0aW9ucy5jaGVja0lnbm9yZSxcImZ1bmN0aW9uXCIpJiZ0aGlzLm9wdGlvbnMuY2hlY2tJZ25vcmUocix0LGUpKXJldHVybiB2b2lkIGkoKX1jYXRjaChhKXt0aGlzLmNvbmZpZ3VyZSh7Y2hlY2tJZ25vcmU6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIGNhbGxpbmcgY3VzdG9tIGNoZWNrSWdub3JlKCkgZnVuY3Rpb24uIFJlbW92aW5nIGN1c3RvbSBjaGVja0lnbm9yZSgpLlwiLGEpfWlmKHRoaXMuX3VybElzV2hpdGVsaXN0ZWQoZSkmJiF0aGlzLl9tZXNzYWdlSXNJZ25vcmVkKGUpKXtpZih0aGlzLm9wdGlvbnMudmVyYm9zZSl7aWYoZS5kYXRhJiZlLmRhdGEuYm9keSYmZS5kYXRhLmJvZHkudHJhY2Upe3ZhciBzPWUuZGF0YS5ib2R5LnRyYWNlLGM9cy5leGNlcHRpb24ubWVzc2FnZTtjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBcIixjKX1jb25zb2xlLmluZm8oXCJbUm9sbGJhcl06IFwiLG8pfXYuaXNUeXBlKHRoaXMub3B0aW9ucy5sb2dGdW5jdGlvbixcImZ1bmN0aW9uXCIpJiZ0aGlzLm9wdGlvbnMubG9nRnVuY3Rpb24obyk7dHJ5e3YuaXNUeXBlKHRoaXMub3B0aW9ucy50cmFuc2Zvcm0sXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLnRyYW5zZm9ybShlKX1jYXRjaChhKXt0aGlzLmNvbmZpZ3VyZSh7dHJhbnNmb3JtOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSBjYWxsaW5nIGN1c3RvbSB0cmFuc2Zvcm0oKSBmdW5jdGlvbi4gUmVtb3ZpbmcgY3VzdG9tIHRyYW5zZm9ybSgpLlwiLGEpfXRoaXMub3B0aW9ucy5lbmFibGVkJiZ1KG8pfX0seC5faW50ZXJuYWxDaGVja0lnbm9yZT1mdW5jdGlvbihlLHIsdCl7dmFyIG49clswXSxvPXMuTEVWRUxTW25dfHwwLGk9cy5MRVZFTFNbdGhpcy5vcHRpb25zLnJlcG9ydExldmVsXXx8MDtpZihvPGkpcmV0dXJuITA7dmFyIGE9dGhpcy5vcHRpb25zP3RoaXMub3B0aW9ucy5wbHVnaW5zOnt9O2lmKGEmJmEuanF1ZXJ5JiZhLmpxdWVyeS5pZ25vcmVBamF4RXJyb3JzKXRyeXtyZXR1cm4hIXQuZGF0YS5ib2R5Lm1lc3NhZ2UuZXh0cmEuaXNBamF4fWNhdGNoKHUpe3JldHVybiExfXJldHVybiExfSx4Ll9sb2c9ZnVuY3Rpb24oZSxyLHQsbixvLGksYSl7dmFyIHM9bnVsbDtpZih0KXRyeXtpZihzPXQuX3NhdmVkU3RhY2tUcmFjZT90Ll9zYXZlZFN0YWNrVHJhY2U6bS5wYXJzZSh0KSx0PT09dGhpcy5sYXN0RXJyb3IpcmV0dXJuO3RoaXMubGFzdEVycm9yPXR9Y2F0Y2godSl7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgcGFyc2luZyB0aGUgZXJyb3Igb2JqZWN0LlwiLHUpLHI9dC5tZXNzYWdlfHx0LmRlc2NyaXB0aW9ufHxyfHxTdHJpbmcodCksdD1udWxsfXZhciBjPXRoaXMuX2J1aWxkUGF5bG9hZChuZXcgRGF0ZSxlLHIscyxuKTthJiYoYy5pZ25vcmVSYXRlTGltaXQ9ITApLHRoaXMuX2VucXVldWVQYXlsb2FkKGMsISFpLFtlLHIsdCxuXSxvKX0seC5sb2c9YygpLHguZGVidWc9YyhcImRlYnVnXCIpLHguaW5mbz1jKFwiaW5mb1wiKSx4Lndhcm49YyhcIndhcm5pbmdcIikseC53YXJuaW5nPWMoXCJ3YXJuaW5nXCIpLHguZXJyb3I9YyhcImVycm9yXCIpLHguY3JpdGljYWw9YyhcImNyaXRpY2FsXCIpLHgudW5jYXVnaHRFcnJvcj1vKGZ1bmN0aW9uKGUscix0LG4sbyxpKXtpZihpPWl8fG51bGwsbyYmdi5pc1R5cGUobyxcImVycm9yXCIpKXJldHVybiB2b2lkIHRoaXMuX2xvZyh0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLGUsbyxpLG51bGwsITApO2lmKHImJnYuaXNUeXBlKHIsXCJlcnJvclwiKSlyZXR1cm4gdm9pZCB0aGlzLl9sb2codGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHIsaSxudWxsLCEwKTt2YXIgYT17dXJsOnJ8fFwiXCIsbGluZTp0fTthLmZ1bmM9bS5ndWVzc0Z1bmN0aW9uTmFtZShhLnVybCxhLmxpbmUpLGEuY29udGV4dD1tLmdhdGhlckNvbnRleHQoYS51cmwsYS5saW5lKTt2YXIgcz17bW9kZTpcIm9uZXJyb3JcIixtZXNzYWdlOm8/U3RyaW5nKG8pOmV8fFwidW5jYXVnaHQgZXhjZXB0aW9uXCIsdXJsOmRvY3VtZW50LmxvY2F0aW9uLmhyZWYsc3RhY2s6W2FdLHVzZXJhZ2VudDpuYXZpZ2F0b3IudXNlckFnZW50fSx1PXRoaXMuX2J1aWxkUGF5bG9hZChuZXcgRGF0ZSx0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLGUscyxpKTt0aGlzLl9lbnF1ZXVlUGF5bG9hZCh1LCEwLFt0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLGUscix0LG4sb10pfSkseC51bmhhbmRsZWRSZWplY3Rpb249byhmdW5jdGlvbihlLHIpe2lmKG51bGw9PWUpcmV0dXJuIHZvaWQgXy5fbG9nKF8ub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsXCJ1bmhhbmRsZWQgcmVqZWN0aW9uIHdhcyBudWxsIG9yIHVuZGVmaW5lZCFcIixudWxsLHt9LG51bGwsITEsITEpO3ZhciB0PWUubWVzc2FnZXx8KGU/U3RyaW5nKGUpOlwidW5oYW5kbGVkIHJlamVjdGlvblwiKSxuPWUuX3JvbGxiYXJDb250ZXh0fHxyLl9yb2xsYmFyQ29udGV4dHx8bnVsbDtpZihlJiZ2LmlzVHlwZShlLFwiZXJyb3JcIikpcmV0dXJuIHZvaWQgdGhpcy5fbG9nKHRoaXMub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsdCxlLG4sbnVsbCwhMCk7dmFyIG89e3VybDpcIlwiLGxpbmU6MH07by5mdW5jPW0uZ3Vlc3NGdW5jdGlvbk5hbWUoby51cmwsby5saW5lKSxvLmNvbnRleHQ9bS5nYXRoZXJDb250ZXh0KG8udXJsLG8ubGluZSk7dmFyIGk9e21vZGU6XCJ1bmhhbmRsZWRyZWplY3Rpb25cIixtZXNzYWdlOnQsdXJsOmRvY3VtZW50LmxvY2F0aW9uLmhyZWYsc3RhY2s6W29dLHVzZXJhZ2VudDpuYXZpZ2F0b3IudXNlckFnZW50fSxhPXRoaXMuX2J1aWxkUGF5bG9hZChuZXcgRGF0ZSx0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsaSxuKTt0aGlzLl9lbnF1ZXVlUGF5bG9hZChhLCEwLFt0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsby51cmwsby5saW5lLDAsZSxyXSl9KSx4Lmdsb2JhbD1vKGZ1bmN0aW9uKGUpe2U9ZXx8e307dmFyIHI9e3N0YXJ0VGltZTplLnN0YXJ0VGltZSxtYXhJdGVtczplLm1heEl0ZW1zLGl0ZW1zUGVyTWludXRlOmUuaXRlbXNQZXJNaW51dGV9O2coITAsd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucyxyKSx2b2lkIDAhPT1lLm1heEl0ZW1zJiYoVD0wKSx2b2lkIDAhPT1lLml0ZW1zUGVyTWludXRlJiYoUj0wKX0pLHguY29uZmlndXJlPW8oZnVuY3Rpb24oZSxyKXt2YXIgdD1nKCEwLHt9LGUpO2coIXIsdGhpcy5vcHRpb25zLHQpLHRoaXMuZ2xvYmFsKHQpfSkseC5zY29wZT1vKGZ1bmN0aW9uKGUpe3ZhciByPW5ldyBzKHRoaXMpO3JldHVybiBnKCEwLHIub3B0aW9ucy5wYXlsb2FkLGUpLHJ9KSx4LndyYXA9ZnVuY3Rpb24oZSxyKXt0cnl7dmFyIHQ7aWYodD12LmlzVHlwZShyLFwiZnVuY3Rpb25cIik/cjpmdW5jdGlvbigpe3JldHVybiByfHx7fX0sIXYuaXNUeXBlKGUsXCJmdW5jdGlvblwiKSlyZXR1cm4gZTtpZihlLl9pc1dyYXApcmV0dXJuIGU7aWYoIWUuX3dyYXBwZWQpe2UuX3dyYXBwZWQ9ZnVuY3Rpb24oKXt0cnl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfWNhdGNoKHIpe3Rocm93XCJzdHJpbmdcIj09dHlwZW9mIHImJihyPW5ldyBTdHJpbmcocikpLHIuc3RhY2t8fChyLl9zYXZlZFN0YWNrVHJhY2U9bS5wYXJzZShyKSksci5fcm9sbGJhckNvbnRleHQ9dCgpfHx7fSxyLl9yb2xsYmFyQ29udGV4dC5fd3JhcHBlZFNvdXJjZT1lLnRvU3RyaW5nKCksd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yPXIscn19LGUuX3dyYXBwZWQuX2lzV3JhcD0hMDtmb3IodmFyIG4gaW4gZSllLmhhc093blByb3BlcnR5KG4pJiYoZS5fd3JhcHBlZFtuXT1lW25dKX1yZXR1cm4gZS5fd3JhcHBlZH1jYXRjaChvKXtyZXR1cm4gZX19LHgubG9hZEZ1bGw9ZnVuY3Rpb24oKXtjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBVbmV4cGVjdGVkIFJvbGxiYXIubG9hZEZ1bGwoKSBjYWxsZWQgb24gYSBOb3RpZmllciBpbnN0YW5jZVwiKX0scy5wcm9jZXNzUGF5bG9hZHM9ZnVuY3Rpb24oZSl7cmV0dXJuIGU/dm9pZCBmKCk6dm9pZCBpKCl9O3ZhciBMPShuZXcgRGF0ZSkuZ2V0VGltZSgpLFQ9MCxSPTA7ZS5leHBvcnRzPXtOb3RpZmllcjpzLHNldHVwSlNPTjpuLHRvcExldmVsTm90aWZpZXI6YX19LGZ1bmN0aW9uKGUscil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQ9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxuPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsbz1mdW5jdGlvbihlKXtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5pc0FycmF5P0FycmF5LmlzQXJyYXkoZSk6XCJbb2JqZWN0IEFycmF5XVwiPT09bi5jYWxsKGUpfSxpPWZ1bmN0aW9uKGUpe2lmKCFlfHxcIltvYmplY3QgT2JqZWN0XVwiIT09bi5jYWxsKGUpKXJldHVybiExO3ZhciByPXQuY2FsbChlLFwiY29uc3RydWN0b3JcIiksbz1lLmNvbnN0cnVjdG9yJiZlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSYmdC5jYWxsKGUuY29uc3RydWN0b3IucHJvdG90eXBlLFwiaXNQcm90b3R5cGVPZlwiKTtpZihlLmNvbnN0cnVjdG9yJiYhciYmIW8pcmV0dXJuITE7dmFyIGk7Zm9yKGkgaW4gZSk7cmV0dXJuXCJ1bmRlZmluZWRcIj09dHlwZW9mIGl8fHQuY2FsbChlLGkpfTtlLmV4cG9ydHM9ZnVuY3Rpb24gYSgpe3ZhciBlLHIsdCxuLHMsdSxjPWFyZ3VtZW50c1swXSxsPTEscD1hcmd1bWVudHMubGVuZ3RoLGY9ITE7Zm9yKFwiYm9vbGVhblwiPT10eXBlb2YgYz8oZj1jLGM9YXJndW1lbnRzWzFdfHx7fSxsPTIpOihcIm9iamVjdFwiIT10eXBlb2YgYyYmXCJmdW5jdGlvblwiIT10eXBlb2YgY3x8bnVsbD09YykmJihjPXt9KTtsPHA7KytsKWlmKGU9YXJndW1lbnRzW2xdLG51bGwhPWUpZm9yKHIgaW4gZSl0PWNbcl0sbj1lW3JdLGMhPT1uJiYoZiYmbiYmKGkobil8fChzPW8obikpKT8ocz8ocz0hMSx1PXQmJm8odCk/dDpbXSk6dT10JiZpKHQpP3Q6e30sY1tyXT1hKGYsdSxuKSk6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4mJihjW3JdPW4pKTtyZXR1cm4gY319LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKCl7cmV0dXJuIGx9ZnVuY3Rpb24gbygpe3JldHVybiBudWxsfWZ1bmN0aW9uIGkoZSl7dmFyIHI9e307cmV0dXJuIHIuX3N0YWNrRnJhbWU9ZSxyLnVybD1lLmZpbGVOYW1lLHIubGluZT1lLmxpbmVOdW1iZXIsci5mdW5jPWUuZnVuY3Rpb25OYW1lLHIuY29sdW1uPWUuY29sdW1uTnVtYmVyLHIuYXJncz1lLmFyZ3Msci5jb250ZXh0PW8oci51cmwsci5saW5lKSxyfWZ1bmN0aW9uIGEoZSl7ZnVuY3Rpb24gcigpe3ZhciByPVtdO3RyeXtyPWMucGFyc2UoZSl9Y2F0Y2godCl7cj1bXX1mb3IodmFyIG49W10sbz0wO288ci5sZW5ndGg7bysrKW4ucHVzaChuZXcgaShyW29dKSk7cmV0dXJuIG59cmV0dXJue3N0YWNrOnIoKSxtZXNzYWdlOmUubWVzc2FnZSxuYW1lOmUubmFtZX19ZnVuY3Rpb24gcyhlKXtyZXR1cm4gbmV3IGEoZSl9ZnVuY3Rpb24gdShlKXtpZighZSlyZXR1cm5bXCJVbmtub3duIGVycm9yLiBUaGVyZSB3YXMgbm8gZXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5LlwiLFwiXCJdO3ZhciByPWUubWF0Y2gocCksdD1cIih1bmtub3duKVwiO3JldHVybiByJiYodD1yW3IubGVuZ3RoLTFdLGU9ZS5yZXBsYWNlKChyW3IubGVuZ3RoLTJdfHxcIlwiKSt0K1wiOlwiLFwiXCIpLGU9ZS5yZXBsYWNlKC8oXltcXHNdK3xbXFxzXSskKS9nLFwiXCIpKSxbdCxlXX12YXIgYz10KDYpLGw9XCI/XCIscD1uZXcgUmVnRXhwKFwiXigoW2EtekEtWjAtOS1fJCBdKik6ICopPyhVbmNhdWdodCApPyhbYS16QS1aMC05LV8kIF0qKTogXCIpO2UuZXhwb3J0cz17Z3Vlc3NGdW5jdGlvbk5hbWU6bixndWVzc0Vycm9yQ2xhc3M6dSxnYXRoZXJDb250ZXh0Om8scGFyc2U6cyxTdGFjazphLEZyYW1lOml9fSxmdW5jdGlvbihlLHIsdCl7dmFyIG4sbyxpOyFmdW5jdGlvbihhLHMpe1widXNlIHN0cmljdFwiO289W3QoNyldLG49cyxpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bi5hcHBseShyLG8pOm4sISh2b2lkIDAhPT1pJiYoZS5leHBvcnRzPWkpKX0odGhpcyxmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiByKGUscix0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5wcm90b3R5cGUubWFwKXJldHVybiBlLm1hcChyLHQpO2Zvcih2YXIgbj1uZXcgQXJyYXkoZS5sZW5ndGgpLG89MDtvPGUubGVuZ3RoO28rKyluW29dPXIuY2FsbCh0LGVbb10pO3JldHVybiBufWZ1bmN0aW9uIHQoZSxyLHQpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIEFycmF5LnByb3RvdHlwZS5maWx0ZXIpcmV0dXJuIGUuZmlsdGVyKHIsdCk7Zm9yKHZhciBuPVtdLG89MDtvPGUubGVuZ3RoO28rKylyLmNhbGwodCxlW29dKSYmbi5wdXNoKGVbb10pO3JldHVybiBufXZhciBuPS8oXnxAKVxcUytcXDpcXGQrLyxvPS9eXFxzKmF0IC4qKFxcUytcXDpcXGQrfFxcKG5hdGl2ZVxcKSkvbSxpPS9eKGV2YWxAKT8oXFxbbmF0aXZlIGNvZGVcXF0pPyQvO3JldHVybntwYXJzZTpmdW5jdGlvbihlKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZS5zdGFja3RyYWNlfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgZVtcIm9wZXJhI3NvdXJjZWxvY1wiXSlyZXR1cm4gdGhpcy5wYXJzZU9wZXJhKGUpO2lmKGUuc3RhY2smJmUuc3RhY2subWF0Y2gobykpcmV0dXJuIHRoaXMucGFyc2VWOE9ySUUoZSk7aWYoZS5zdGFjaylyZXR1cm4gdGhpcy5wYXJzZUZGT3JTYWZhcmkoZSk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHBhcnNlIGdpdmVuIEVycm9yIG9iamVjdFwiKX0sZXh0cmFjdExvY2F0aW9uOmZ1bmN0aW9uKGUpe2lmKGUuaW5kZXhPZihcIjpcIik9PT0tMSlyZXR1cm5bZV07dmFyIHI9ZS5yZXBsYWNlKC9bXFwoXFwpXFxzXS9nLFwiXCIpLnNwbGl0KFwiOlwiKSx0PXIucG9wKCksbj1yW3IubGVuZ3RoLTFdO2lmKCFpc05hTihwYXJzZUZsb2F0KG4pKSYmaXNGaW5pdGUobikpe3ZhciBvPXIucG9wKCk7cmV0dXJuW3Iuam9pbihcIjpcIiksbyx0XX1yZXR1cm5bci5qb2luKFwiOlwiKSx0LHZvaWQgMF19LHBhcnNlVjhPcklFOmZ1bmN0aW9uKG4pe3ZhciBpPXQobi5zdGFjay5zcGxpdChcIlxcblwiKSxmdW5jdGlvbihlKXtyZXR1cm4hIWUubWF0Y2gobyl9LHRoaXMpO3JldHVybiByKGksZnVuY3Rpb24ocil7ci5pbmRleE9mKFwiKGV2YWwgXCIpPi0xJiYocj1yLnJlcGxhY2UoL2V2YWwgY29kZS9nLFwiZXZhbFwiKS5yZXBsYWNlKC8oXFwoZXZhbCBhdCBbXlxcKCldKil8KFxcKVxcLC4qJCkvZyxcIlwiKSk7dmFyIHQ9ci5yZXBsYWNlKC9eXFxzKy8sXCJcIikucmVwbGFjZSgvXFwoZXZhbCBjb2RlL2csXCIoXCIpLnNwbGl0KC9cXHMrLykuc2xpY2UoMSksbj10aGlzLmV4dHJhY3RMb2NhdGlvbih0LnBvcCgpKSxvPXQuam9pbihcIiBcIil8fHZvaWQgMCxpPVwiZXZhbFwiPT09blswXT92b2lkIDA6blswXTtyZXR1cm4gbmV3IGUobywodm9pZCAwKSxpLG5bMV0sblsyXSxyKX0sdGhpcyl9LHBhcnNlRkZPclNhZmFyaTpmdW5jdGlvbihuKXt2YXIgbz10KG4uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuIWUubWF0Y2goaSl9LHRoaXMpO3JldHVybiByKG8sZnVuY3Rpb24ocil7aWYoci5pbmRleE9mKFwiID4gZXZhbFwiKT4tMSYmKHI9ci5yZXBsYWNlKC8gbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbFxcOlxcZCtcXDpcXGQrL2csXCI6JDFcIikpLHIuaW5kZXhPZihcIkBcIik9PT0tMSYmci5pbmRleE9mKFwiOlwiKT09PS0xKXJldHVybiBuZXcgZShyKTt2YXIgdD1yLnNwbGl0KFwiQFwiKSxuPXRoaXMuZXh0cmFjdExvY2F0aW9uKHQucG9wKCkpLG89dC5zaGlmdCgpfHx2b2lkIDA7cmV0dXJuIG5ldyBlKG8sKHZvaWQgMCksblswXSxuWzFdLG5bMl0scil9LHRoaXMpfSxwYXJzZU9wZXJhOmZ1bmN0aW9uKGUpe3JldHVybiFlLnN0YWNrdHJhY2V8fGUubWVzc2FnZS5pbmRleE9mKFwiXFxuXCIpPi0xJiZlLm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIikubGVuZ3RoPmUuc3RhY2t0cmFjZS5zcGxpdChcIlxcblwiKS5sZW5ndGg/dGhpcy5wYXJzZU9wZXJhOShlKTplLnN0YWNrP3RoaXMucGFyc2VPcGVyYTExKGUpOnRoaXMucGFyc2VPcGVyYTEwKGUpfSxwYXJzZU9wZXJhOTpmdW5jdGlvbihyKXtmb3IodmFyIHQ9L0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykvaSxuPXIubWVzc2FnZS5zcGxpdChcIlxcblwiKSxvPVtdLGk9MixhPW4ubGVuZ3RoO2k8YTtpKz0yKXt2YXIgcz10LmV4ZWMobltpXSk7cyYmby5wdXNoKG5ldyBlKCh2b2lkIDApLCh2b2lkIDApLHNbMl0sc1sxXSwodm9pZCAwKSxuW2ldKSl9cmV0dXJuIG99LHBhcnNlT3BlcmExMDpmdW5jdGlvbihyKXtmb3IodmFyIHQ9L0xpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykoPzo6IEluIGZ1bmN0aW9uIChcXFMrKSk/JC9pLG49ci5zdGFja3RyYWNlLnNwbGl0KFwiXFxuXCIpLG89W10saT0wLGE9bi5sZW5ndGg7aTxhO2krPTIpe3ZhciBzPXQuZXhlYyhuW2ldKTtzJiZvLnB1c2gobmV3IGUoc1szXXx8dm9pZCAwLCh2b2lkIDApLHNbMl0sc1sxXSwodm9pZCAwKSxuW2ldKSl9cmV0dXJuIG99LHBhcnNlT3BlcmExMTpmdW5jdGlvbihvKXt2YXIgaT10KG8uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuISFlLm1hdGNoKG4pJiYhZS5tYXRjaCgvXkVycm9yIGNyZWF0ZWQgYXQvKX0sdGhpcyk7cmV0dXJuIHIoaSxmdW5jdGlvbihyKXt2YXIgdCxuPXIuc3BsaXQoXCJAXCIpLG89dGhpcy5leHRyYWN0TG9jYXRpb24obi5wb3AoKSksaT1uLnNoaWZ0KCl8fFwiXCIsYT1pLnJlcGxhY2UoLzxhbm9ueW1vdXMgZnVuY3Rpb24oOiAoXFx3KykpPz4vLFwiJDJcIikucmVwbGFjZSgvXFwoW15cXCldKlxcKS9nLFwiXCIpfHx2b2lkIDA7aS5tYXRjaCgvXFwoKFteXFwpXSopXFwpLykmJih0PWkucmVwbGFjZSgvXlteXFwoXStcXCgoW15cXCldKilcXCkkLyxcIiQxXCIpKTt2YXIgcz12b2lkIDA9PT10fHxcIlthcmd1bWVudHMgbm90IGF2YWlsYWJsZV1cIj09PXQ/dm9pZCAwOnQuc3BsaXQoXCIsXCIpO3JldHVybiBuZXcgZShhLHMsb1swXSxvWzFdLG9bMl0scil9LHRoaXMpfX19KX0sZnVuY3Rpb24oZSxyLHQpe3ZhciBuLG8saTshZnVuY3Rpb24odCxhKXtcInVzZSBzdHJpY3RcIjtvPVtdLG49YSxpPVwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bi5hcHBseShyLG8pOm4sISh2b2lkIDAhPT1pJiYoZS5leHBvcnRzPWkpKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGUoZSl7cmV0dXJuIWlzTmFOKHBhcnNlRmxvYXQoZSkpJiZpc0Zpbml0ZShlKX1mdW5jdGlvbiByKGUscix0LG4sbyxpKXt2b2lkIDAhPT1lJiZ0aGlzLnNldEZ1bmN0aW9uTmFtZShlKSx2b2lkIDAhPT1yJiZ0aGlzLnNldEFyZ3Mociksdm9pZCAwIT09dCYmdGhpcy5zZXRGaWxlTmFtZSh0KSx2b2lkIDAhPT1uJiZ0aGlzLnNldExpbmVOdW1iZXIobiksdm9pZCAwIT09byYmdGhpcy5zZXRDb2x1bW5OdW1iZXIobyksdm9pZCAwIT09aSYmdGhpcy5zZXRTb3VyY2UoaSl9cmV0dXJuIHIucHJvdG90eXBlPXtnZXRGdW5jdGlvbk5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5mdW5jdGlvbk5hbWV9LHNldEZ1bmN0aW9uTmFtZTpmdW5jdGlvbihlKXt0aGlzLmZ1bmN0aW9uTmFtZT1TdHJpbmcoZSl9LGdldEFyZ3M6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hcmdzfSxzZXRBcmdzOmZ1bmN0aW9uKGUpe2lmKFwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSl0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJncyBtdXN0IGJlIGFuIEFycmF5XCIpO3RoaXMuYXJncz1lfSxnZXRGaWxlTmFtZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLmZpbGVOYW1lfSxzZXRGaWxlTmFtZTpmdW5jdGlvbihlKXt0aGlzLmZpbGVOYW1lPVN0cmluZyhlKX0sZ2V0TGluZU51bWJlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxpbmVOdW1iZXJ9LHNldExpbmVOdW1iZXI6ZnVuY3Rpb24ocil7aWYoIWUocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkxpbmUgTnVtYmVyIG11c3QgYmUgYSBOdW1iZXJcIik7dGhpcy5saW5lTnVtYmVyPU51bWJlcihyKX0sZ2V0Q29sdW1uTnVtYmVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY29sdW1uTnVtYmVyfSxzZXRDb2x1bW5OdW1iZXI6ZnVuY3Rpb24ocil7aWYoIWUocikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNvbHVtbiBOdW1iZXIgbXVzdCBiZSBhIE51bWJlclwiKTt0aGlzLmNvbHVtbk51bWJlcj1OdW1iZXIocil9LGdldFNvdXJjZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLnNvdXJjZX0sc2V0U291cmNlOmZ1bmN0aW9uKGUpe3RoaXMuc291cmNlPVN0cmluZyhlKX0sdG9TdHJpbmc6ZnVuY3Rpb24oKXt2YXIgcj10aGlzLmdldEZ1bmN0aW9uTmFtZSgpfHxcInthbm9ueW1vdXN9XCIsdD1cIihcIisodGhpcy5nZXRBcmdzKCl8fFtdKS5qb2luKFwiLFwiKStcIilcIixuPXRoaXMuZ2V0RmlsZU5hbWUoKT9cIkBcIit0aGlzLmdldEZpbGVOYW1lKCk6XCJcIixvPWUodGhpcy5nZXRMaW5lTnVtYmVyKCkpP1wiOlwiK3RoaXMuZ2V0TGluZU51bWJlcigpOlwiXCIsaT1lKHRoaXMuZ2V0Q29sdW1uTnVtYmVyKCkpP1wiOlwiK3RoaXMuZ2V0Q29sdW1uTnVtYmVyKCk6XCJcIjtyZXR1cm4gcit0K24rbytpfX0scn0pfSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlKXtyZXR1cm57fS50b1N0cmluZy5jYWxsKGUpLm1hdGNoKC9cXHMoW2EtekEtWl0rKS8pWzFdLnRvTG93ZXJDYXNlKCl9ZnVuY3Rpb24gbyhlLHIpe3JldHVybiBuKGUpPT09cn1mdW5jdGlvbiBpKGUpe2lmKCFvKGUsXCJzdHJpbmdcIikpdGhyb3cgbmV3IEVycm9yKFwicmVjZWl2ZWQgaW52YWxpZCBpbnB1dFwiKTtmb3IodmFyIHI9bCx0PXIucGFyc2VyW3Iuc3RyaWN0TW9kZT9cInN0cmljdFwiOlwibG9vc2VcIl0uZXhlYyhlKSxuPXt9LGk9MTQ7aS0tOyluW3Iua2V5W2ldXT10W2ldfHxcIlwiO3JldHVybiBuW3IucS5uYW1lXT17fSxuW3Iua2V5WzEyXV0ucmVwbGFjZShyLnEucGFyc2VyLGZ1bmN0aW9uKGUsdCxvKXt0JiYobltyLnEubmFtZV1bdF09byl9KSxufWZ1bmN0aW9uIGEoZSl7dmFyIHI9aShlKTtyZXR1cm5cIlwiPT09ci5hbmNob3ImJihyLnNvdXJjZT1yLnNvdXJjZS5yZXBsYWNlKFwiI1wiLFwiXCIpKSxlPXIuc291cmNlLnJlcGxhY2UoXCI/XCIrci5xdWVyeSxcIlwiKX1mdW5jdGlvbiBzKGUscil7dmFyIHQsbixpLGE9byhlLFwib2JqZWN0XCIpLHU9byhlLFwiYXJyYXlcIiksYz1bXTtpZihhKWZvcih0IGluIGUpZS5oYXNPd25Qcm9wZXJ0eSh0KSYmYy5wdXNoKHQpO2Vsc2UgaWYodSlmb3IoaT0wO2k8ZS5sZW5ndGg7KytpKWMucHVzaChpKTtmb3IoaT0wO2k8Yy5sZW5ndGg7KytpKXQ9Y1tpXSxuPWVbdF0sYT1vKG4sXCJvYmplY3RcIiksdT1vKG4sXCJhcnJheVwiKSxhfHx1P2VbdF09cyhuLHIpOmVbdF09cih0LG4pO3JldHVybiBlfWZ1bmN0aW9uIHUoZSl7cmV0dXJuIGU9U3RyaW5nKGUpLG5ldyBBcnJheShlLmxlbmd0aCsxKS5qb2luKFwiKlwiKX1mdW5jdGlvbiBjKCl7dmFyIGU9KG5ldyBEYXRlKS5nZXRUaW1lKCkscj1cInh4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eFwiLnJlcGxhY2UoL1t4eV0vZyxmdW5jdGlvbihyKXt2YXIgdD0oZSsxNipNYXRoLnJhbmRvbSgpKSUxNnwwO3JldHVybiBlPU1hdGguZmxvb3IoZS8xNiksKFwieFwiPT09cj90OjcmdHw4KS50b1N0cmluZygxNil9KTtyZXR1cm4gcn10KDkpO3ZhciBsPXtzdHJpY3RNb2RlOiExLGtleTpbXCJzb3VyY2VcIixcInByb3RvY29sXCIsXCJhdXRob3JpdHlcIixcInVzZXJJbmZvXCIsXCJ1c2VyXCIsXCJwYXNzd29yZFwiLFwiaG9zdFwiLFwicG9ydFwiLFwicmVsYXRpdmVcIixcInBhdGhcIixcImRpcmVjdG9yeVwiLFwiZmlsZVwiLFwicXVlcnlcIixcImFuY2hvclwiXSxxOntuYW1lOlwicXVlcnlLZXlcIixwYXJzZXI6Lyg/Ol58JikoW14mPV0qKT0/KFteJl0qKS9nfSxwYXJzZXI6e3N0cmljdDovXig/OihbXjpcXC8/I10rKTopPyg/OlxcL1xcLygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSk/KCgoKD86W14/I1xcL10qXFwvKSopKFtePyNdKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvLGxvb3NlOi9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKFteOlxcLz8jLl0rKTopPyg/OlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pL319LHA9e2lzVHlwZTpvLHBhcnNlVXJpOmkscGFyc2VVcmlPcHRpb25zOmwscmVkYWN0OnUsc2FuaXRpemVVcmw6YSx0cmF2ZXJzZTpzLHR5cGVOYW1lOm4sdXVpZDQ6Y307ZS5leHBvcnRzPXB9LGZ1bmN0aW9uKGUscil7IWZ1bmN0aW9uKGUpe1widXNlIHN0cmljdFwiO2UuY29uc29sZT1lLmNvbnNvbGV8fHt9O2Zvcih2YXIgcix0LG49ZS5jb25zb2xlLG89e30saT1mdW5jdGlvbigpe30sYT1cIm1lbW9yeVwiLnNwbGl0KFwiLFwiKSxzPVwiYXNzZXJ0LGNsZWFyLGNvdW50LGRlYnVnLGRpcixkaXJ4bWwsZXJyb3IsZXhjZXB0aW9uLGdyb3VwLGdyb3VwQ29sbGFwc2VkLGdyb3VwRW5kLGluZm8sbG9nLG1hcmtUaW1lbGluZSxwcm9maWxlLHByb2ZpbGVzLHByb2ZpbGVFbmQsc2hvdyx0YWJsZSx0aW1lLHRpbWVFbmQsdGltZWxpbmUsdGltZWxpbmVFbmQsdGltZVN0YW1wLHRyYWNlLHdhcm5cIi5zcGxpdChcIixcIik7cj1hLnBvcCgpOyluW3JdfHwobltyXT1vKTtmb3IoO3Q9cy5wb3AoKTspblt0XXx8KG5bdF09aSl9KFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3c/dGhpczp3aW5kb3cpfSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbihlKXthPWV9ZnVuY3Rpb24gbyhlKXt0aGlzLm5hbWU9XCJDb25uZWN0aW9uIEVycm9yXCIsdGhpcy5tZXNzYWdlPWUsdGhpcy5zdGFjaz0obmV3IEVycm9yKS5zdGFja312YXIgaT10KDgpLGE9bnVsbDtvLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSksby5wcm90b3R5cGUuY29uc3RydWN0b3I9bzt2YXIgcz17WE1MSHR0cEZhY3RvcmllczpbZnVuY3Rpb24oKXtyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0fSxmdW5jdGlvbigpe3JldHVybiBuZXcgQWN0aXZlWE9iamVjdChcIk1zeG1sMi5YTUxIVFRQXCIpfSxmdW5jdGlvbigpe3JldHVybiBuZXcgQWN0aXZlWE9iamVjdChcIk1zeG1sMy5YTUxIVFRQXCIpfSxmdW5jdGlvbigpe3JldHVybiBuZXcgQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpfV0sY3JlYXRlWE1MSFRUUE9iamVjdDpmdW5jdGlvbigpe3ZhciBlLHI9ITEsdD1zLlhNTEh0dHBGYWN0b3JpZXMsbj10Lmxlbmd0aDtmb3IoZT0wO2U8bjtlKyspdHJ5e3I9dFtlXSgpO2JyZWFrfWNhdGNoKG8pe31yZXR1cm4gcn0scG9zdDpmdW5jdGlvbihlLHIsdCxuKXtpZighaS5pc1R5cGUodCxcIm9iamVjdFwiKSl0aHJvdyBuZXcgRXJyb3IoXCJFeHBlY3RlZCBhbiBvYmplY3QgdG8gUE9TVFwiKTt0PWEuc3RyaW5naWZ5KHQpLG49bnx8ZnVuY3Rpb24oKXt9O3ZhciB1PXMuY3JlYXRlWE1MSFRUUE9iamVjdCgpO2lmKHUpdHJ5e3RyeXt2YXIgYz1mdW5jdGlvbigpe3RyeXtpZihjJiY0PT09dS5yZWFkeVN0YXRlKXtjPXZvaWQgMDt2YXIgZT1hLnBhcnNlKHUucmVzcG9uc2VUZXh0KTsyMDA9PT11LnN0YXR1cz9uKG51bGwsZSk6aS5pc1R5cGUodS5zdGF0dXMsXCJudW1iZXJcIikmJnUuc3RhdHVzPj00MDAmJnUuc3RhdHVzPDYwMD8oNDAzPT11LnN0YXR1cyYmY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTpcIitlLm1lc3NhZ2UpLG4obmV3IEVycm9yKFN0cmluZyh1LnN0YXR1cykpKSk6bihuZXcgbyhcIlhIUiByZXNwb25zZSBoYWQgbm8gc3RhdHVzIGNvZGUgKGxpa2VseSBjb25uZWN0aW9uIGZhaWx1cmUpXCIpKX19Y2F0Y2gocil7dmFyIHQ7dD1yJiZyLnN0YWNrP3I6bmV3IEVycm9yKHIpLG4odCl9fTt1Lm9wZW4oXCJQT1NUXCIsZSwhMCksdS5zZXRSZXF1ZXN0SGVhZGVyJiYodS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsXCJhcHBsaWNhdGlvbi9qc29uXCIpLHUuc2V0UmVxdWVzdEhlYWRlcihcIlgtUm9sbGJhci1BY2Nlc3MtVG9rZW5cIixyKSksdS5vbnJlYWR5c3RhdGVjaGFuZ2U9Yyx1LnNlbmQodCl9Y2F0Y2gobCl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFhEb21haW5SZXF1ZXN0KXtcImh0dHA6XCI9PT13aW5kb3cubG9jYXRpb24uaHJlZi5zdWJzdHJpbmcoMCw1KSYmXCJodHRwc1wiPT09ZS5zdWJzdHJpbmcoMCw1KSYmKGU9XCJodHRwXCIrZS5zdWJzdHJpbmcoNSkpO3ZhciBwPWZ1bmN0aW9uKCl7bihuZXcgbyhcIlJlcXVlc3QgdGltZWQgb3V0XCIpKX0sZj1mdW5jdGlvbigpe24obmV3IEVycm9yKFwiRXJyb3IgZHVyaW5nIHJlcXVlc3RcIikpfSxkPWZ1bmN0aW9uKCl7bihudWxsLGEucGFyc2UodS5yZXNwb25zZVRleHQpKX07dT1uZXcgWERvbWFpblJlcXVlc3QsdS5vbnByb2dyZXNzPWZ1bmN0aW9uKCl7fSx1Lm9udGltZW91dD1wLHUub25lcnJvcj1mLHUub25sb2FkPWQsdS5vcGVuKFwiUE9TVFwiLGUsITApLHUuc2VuZCh0KX19fWNhdGNoKGgpe24oaCl9fX07ZS5leHBvcnRzPXtYSFI6cyxzZXR1cEpTT046bixDb25uZWN0aW9uRXJyb3I6b319XSl9KTsiLCJ2YXIgVmlzaW9uU2ltdWxhdGlvbiA9IHJlcXVpcmUoXCJkb3RhLXZpc2lvbi1zaW11bGF0aW9uXCIpO1xudmFyIHdvcmxkZGF0YSA9IHJlcXVpcmUoXCJkb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvblwiKTtcbnZhciBnZXRMaWdodFVuaW9uID0gcmVxdWlyZShcIi4vZ2V0TGlnaHRVbmlvblwiKTtcbnZhciBRdWVyeVN0cmluZyA9IHJlcXVpcmUoJy4vdXRpbC9xdWVyeVN0cmluZycpO1xudmFyIFJvbGxiYXIgPSByZXF1aXJlKFwicm9sbGJhci1icm93c2VyXCIpO1xudmFyIHRyaW0gPSByZXF1aXJlKCcuL3V0aWwvdHJpbScpO1xudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi91dGlsL2RlYm91bmNlJyk7XG52YXIgZ2V0SlNPTiA9IHJlcXVpcmUoJy4vdXRpbC9nZXRKU09OJyk7XG5cbi8vIGVycm9yIHJlcG9ydGluZ1xudmFyIHJvbGxiYXJDb25maWcgPSB7XG4gICAgYWNjZXNzVG9rZW46ICdmZTdjZjMyN2YyYjI0YmI4OTkxZTI1MjIzOWY2MjAwZicsXG4gICAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICAgIGlnbm9yZWRNZXNzYWdlczogW1xuICAgICAgICBcIkVycm9yOiAgRE9NIEV4Y2VwdGlvbiAxOFwiLFxuICAgICAgICBcIlNlY3VyaXR5RXJyb3I6IERPTSBFeGNlcHRpb24gMTg6IEFuIGF0dGVtcHQgd2FzIG1hZGUgdG8gYnJlYWsgdGhyb3VnaCB0aGUgc2VjdXJpdHkgcG9saWN5IG9mIHRoZSB1c2VyIGFnZW50LlwiLFxuICAgICAgICBcIlNlY3VyaXR5RXJyb3I6ICBBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIGJyZWFrIHRocm91Z2ggdGhlIHNlY3VyaXR5IHBvbGljeSBvZiB0aGUgdXNlciBhZ2VudC5cIixcbiAgICAgICAgXCJTY3JpcHQgZXJyb3IuXCJcbiAgICBdLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdkZXZlbG9wbWVudCcsXG4gICAgICAgIGNsaWVudDoge1xuICAgICAgICAgICAgamF2YXNjcmlwdDoge1xuICAgICAgICAgICAgICAgIHNvdXJjZV9tYXBfZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb2RlX3ZlcnNpb246IFwiZGFhOTEzY2FlNjUwMjQxZGQ4ODY5MDViNzIyMzk4YjFiODE2ZTc4MlwiLFxuICAgICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHkgaGF2ZSBSb2xsYmFyIGd1ZXNzIHdoaWNoIGZyYW1lcyB0aGUgZXJyb3Igd2FzIHRocm93biBmcm9tXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgYnJvd3NlciBkb2VzIG5vdCBwcm92aWRlIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzLlxuICAgICAgICAgICAgICAgIGd1ZXNzX3VuY2F1Z2h0X2ZyYW1lczogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuLy92YXIgcm9sbGJhciA9IFJvbGxiYXIuaW5pdChyb2xsYmFyQ29uZmlnKTtcbiAgICBcbmZ1bmN0aW9uIEFwcChtYXBfdGlsZV9wYXRoLCB2aXNpb25fZGF0YV9pbWFnZV9wYXRoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBJTUdfRElSID0gXCJpbWcvXCIsXG4gICAgICAgIEVOVElUSUVTID0ge1xuICAgICAgICAgICAgb2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICBpY29uX3BhdGg6IElNR19ESVIgKyBcIndhcmRfb2JzZXJ2ZXIucG5nXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAxNjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VudHJ5OiB7XG4gICAgICAgICAgICAgICAgaWNvbl9wYXRoOiBJTUdfRElSICsgXCJ3YXJkX3NlbnRyeS5wbmdcIixcbiAgICAgICAgICAgICAgICByYWRpdXM6IDg1MFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBEQVJLTkVTU19WSVNJT05fUkFESVVTID0gNjc1LFxuICAgICAgICBUT1dFUl9EQVlfVklTSU9OX1JBRElVUyA9IDE5MDAsXG4gICAgICAgIFRPV0VSX05JR0hUX1ZJU0lPTl9SQURJVVMgPSA4MDAsXG4gICAgICAgIFRPV0VSX1RSVUVfU0lHSFRfUkFESVVTID0gNzAwLFxuICAgICAgICBUT1dFUl9BVFRBQ0tfUkFOR0VfUkFESVVTID0gNzAwLFxuICAgICAgICBtYXBfZGF0YV9wYXRoID0gXCJkYXRhL1wiLFxuICAgICAgICBtYXBfZGF0YSxcbiAgICAgICAgbWFwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9tYXBDb25zdGFudHMnKSxcbiAgICAgICAgY29udmVyc2lvbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbkZ1bmN0aW9ucycpLFxuICAgICAgICBtYXBCb3VuZHMgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoMCwgMCwgbWFwQ29uc3RhbnRzLm1hcF93LCBtYXBDb25zdGFudHMubWFwX2gpLFxuICAgICAgICBtYXAgPSBuZXcgT3BlbkxheWVycy5NYXAoXCJtYXAxXCIsIHtcbiAgICAgICAgICAgIHRoZW1lOiBudWxsLFxuICAgICAgICAgICAgbWF4RXh0ZW50OiBtYXBCb3VuZHMsXG4gICAgICAgICAgICBudW1ab29tTGV2ZWxzOiA1LFxuICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjogTWF0aC5wb3coMiwgNS0xICksXG4gICAgICAgICAgICB1bml0czogXCJtXCIsXG4gICAgICAgICAgICB0aWxlTWFuYWdlcjoge1xuICAgICAgICAgICAgICAgIGNhY2hlU2l6ZTogNTQ1NixcbiAgICAgICAgICAgICAgICBtb3ZlRGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgem9vbURlbGF5OiAwLFxuICAgICAgICAgICAgICAgIGZyYW1lRGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgdGlsZXNQZXJGcmFtZTogMTI4XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBsYXllcktleXMgPSBbXG4gICAgICAgICAgICBcIm5vX3dhcmRzXCIsXG4gICAgICAgICAgICBcImVudF9mb3dfYmxvY2tlcl9ub2RlXCIsXG4gICAgICAgICAgICBcInRyaWdnZXJfbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfcm9zaGFuX3NwYXduZXJcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyXCIsXG4gICAgICAgICAgICBcImRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5XCIsXG4gICAgICAgICAgICBcImVudF9kb3RhX3Nob3BcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYmFycmFja3NcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYnVpbGRpbmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfaGVhbGVyXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX2ZvcnRcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfdG93ZXJcIlxuICAgICAgICBdLFxuICAgICAgICBsYXllck5hbWVzID0ge1xuICAgICAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyOiBcIlJ1bmVzXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX2JvdW50eTogXCJCb3VudHkgUnVuZXNcIixcbiAgICAgICAgICAgIGVudF9kb3RhX3RyZWU6IFwiVHJlZXNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2hlYWxlcjogXCJTaHJpbmVzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9mb3J0OiBcIkFuY2llbnRzXCIsXG4gICAgICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BzXCIsXG4gICAgICAgICAgICBucGNfZG90YV90b3dlcjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2JhcnJhY2tzOiBcIkJhcnJhY2tzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9idWlsZGluZzogXCJCdWlsZGluZ3NcIixcbiAgICAgICAgICAgIHRyaWdnZXJfbXVsdGlwbGU6IFwiTmV1dHJhbCBDYW1wcyBTcGF3biBCb3hlc1wiLFxuICAgICAgICAgICAgbnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyOiBcIk5ldXRyYWwgQ2FtcHNcIixcbiAgICAgICAgICAgIG5vX3dhcmRzOiBcIkludmFsaWQgV2FyZCBMb2NhdGlvbnNcIixcbiAgICAgICAgICAgIGVudF9mb3dfYmxvY2tlcl9ub2RlOiBcIlZpc2lvbiBCbG9ja2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgYmFzZUxheWVyc09wdGlvbnMgPSB7XG4gICAgICAgICAgICB0eXBlOiBcImpwZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGJhc2VMYXllcnNDb25maWcgPSBbXG4gICAgICAgICAgICBbJzcuMDAgRGVmYXVsdCcsICc3MDAnLCAnZGVmYXVsdCddLFxuICAgICAgICAgICAgWyc3LjAwIE5ldyBKb3VybmV5JywgJzcwMCcsICdqb3VybmV5J10sXG4gICAgICAgICAgICBbJzYuODcnLCAnNjg3JywgJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgIFsnNi44NyBEZXNlcnQnLCAnNjg3JywgJ2Rlc2VydCddLFxuICAgICAgICAgICAgWyc2Ljg3IEltbW9ydGFsIEdhcmRlbnMnLCAnNjg3JywgJ2ltbW9ydGFsZ2FyZGVucyddXG4gICAgICAgIF0sXG4gICAgICAgIGJhc2VMYXllcnMgPSBiYXNlTGF5ZXJzQ29uZmlnLm1hcChmdW5jdGlvbiAoYmFzZUxheWVyQ29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgYmFzZUxheWVyT3B0aW9ucyA9IE9wZW5MYXllcnMuVXRpbC5leHRlbmQoe1xuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoYmFzZUxheWVyQ29uZmlnWzFdLCBiYXNlTGF5ZXJDb25maWdbMl0pXG4gICAgICAgICAgICB9LCBiYXNlTGF5ZXJzT3B0aW9ucyk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVE1TKGJhc2VMYXllckNvbmZpZ1swXSwgbWFwX3RpbGVfcGF0aCwgYmFzZUxheWVyT3B0aW9ucyk7XG4gICAgICAgIH0pLFxuICAgICAgICBvdmVybGF5R3JvdXBpbmcgPSB7XG4gICAgICAgICAgICBcIkRheSBWaXNpb24gUmFuZ2VcIjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIFwiTmlnaHQgVmlzaW9uIFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIlRydWUgU2lnaHQgUmFuZ2VcIjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIFwiQXR0YWNrIFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIlRvd2Vyc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiU2hyaW5lc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiQW5jaWVudHNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkJhcnJhY2tzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJCdWlsZGluZ3NcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIlNob3BzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJJbnZhbGlkIFdhcmQgTG9jYXRpb25zXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIlZpc2lvbiBCbG9ja2VyXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIlBsYWNlZCBXYXJkc1wiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJXYXJkIFZpc2lvblwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJXYXJkIFZpc2lvbiB3aXRoIEZvZ1wiOiBcIlZpc2lvblwiXG4gICAgICAgIH0sXG4gICAgICAgIGljb25fcGF0aHMgPSB7XG4gICAgICAgICAgICBcImVudF9kb3RhX3RyZWVcIjogSU1HX0RJUiArIFwidHJlZS5zdmdcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZV9jdXRcIjogSU1HX0RJUiArIFwic3R1bXAuc3ZnXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX3Rvd2VyXCI6IElNR19ESVIgKyBcInRvd2VyLnN2Z1wiXG4gICAgICAgIH0sXG4gICAgICAgIGxheWVyU3dpdGNoZXIgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLkxheWVyU3dpdGNoZXIoe1xuICAgICAgICAgICAgYXNjZW5kaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIG92ZXJsYXlHcm91cGluZzogb3ZlcmxheUdyb3VwaW5nLFxuICAgICAgICAgICAgb25NYXhpbWl6ZVdoZW5TbWFsbFNjcmVlbjogbWluaW1pemVDb250cm9sTGlzdC5iaW5kKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpKVxuICAgICAgICB9KSxcbiAgICAgICAgY29vcmRpbmF0ZUNvbnRyb2wgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLk1vdXNlUG9zaXRpb24oKSxcbiAgICAgICAgY3Vyc29yTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJDdXJzb3JcIiwge2Rpc3BsYXlJbkxheWVyU3dpdGNoZXI6ZmFsc2V9KSxcbiAgICAgICAgZGF5UmFuZ2VMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIkRheSBWaXNpb24gUmFuZ2VcIiksXG4gICAgICAgIG5pZ2h0UmFuZ2VMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIk5pZ2h0IFZpc2lvbiBSYW5nZVwiKSxcbiAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIlRydWUgU2lnaHQgUmFuZ2VcIiksXG4gICAgICAgIGF0dGFja1JhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJBdHRhY2sgUmFuZ2VcIiksXG4gICAgICAgIHBvbHlnb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIkRyYXduIENpcmNsZXNcIiksXG4gICAgICAgIHdhcmRWaXNpb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIldhcmQgVmlzaW9uXCIpLFxuICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJXYXJkIFZpc2lvbiB3aXRoIEZvZ1wiKSxcbiAgICAgICAgaWNvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhcIlBsYWNlZCBXYXJkc1wiKSxcbiAgICAgICAgcmVuZGVyZXIgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZikucmVuZGVyZXIsXG4gICAgICAgIGRyYXdDb250cm9scyxcbiAgICAgICAgbGFzdERpc3RhbmNlLFxuICAgICAgICBzdHlsZSA9IHJlcXVpcmUoJy4vc3R5bGVDb25zdGFudHMnKSxcbiAgICAgICAgdHJlZU1hcmtlcnMgPSB7fSxcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT04gPSB0cnVlLFxuICAgICAgICBWSVNJT05fU0lNVUxBVElPTl9BTFdBWVMgPSB0cnVlLFxuICAgICAgICBEQVJLTkVTUyA9IGZhbHNlLFxuICAgICAgICBjdXRUcmVlcyA9IHt9O1xuXG4gICAgICAgIGNvbnNvbGUubG9nKG1hcC50aWxlTWFuYWdlcik7XG4gICAgICAgIFxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENPT1JESU5BVEUgQ09OVkVSU0lPTiBGVU5DVElPTlMgKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHZhciByZXZlcnNlTGVycCA9IGNvbnZlcnNpb25GdW5jdGlvbnMucmV2ZXJzZUxlcnAsXG4gICAgICAgIGxhdExvblRvV29ybGQgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmxhdExvblRvV29ybGQsXG4gICAgICAgIHdvcmxkVG9MYXRMb24gPSBjb252ZXJzaW9uRnVuY3Rpb25zLndvcmxkVG9MYXRMb24sXG4gICAgICAgIGdldFRpbGVSYWRpdXMgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmdldFRpbGVSYWRpdXMsXG4gICAgICAgIGdldFNjYWxlZFJhZGl1cyA9IGNvbnZlcnNpb25GdW5jdGlvbnMuZ2V0U2NhbGVkUmFkaXVzLFxuICAgICAgICBjYWxjdWxhdGVEaXN0YW5jZSA9IGNvbnZlcnNpb25GdW5jdGlvbnMuY2FsY3VsYXRlRGlzdGFuY2U7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqKipcbiAgICAgKiBDT05UUk9MIEhBTkRMRVJTICpcbiAgICAgKioqKioqKioqKioqKioqKioqKiovXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUcmVlTWFya2VyQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZVRyZWVNYXJrZXJDbGljaycsIHRoaXMpO1xuICAgICAgICBzZXRUcmVlTWFya2VyU3RhdGUodGhpcywgIXRoaXMudHJlZVZpc2libGUpO1xuICAgICAgICBzZXRUcmVlUXVlcnlTdHJpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2V0VHJlZU1hcmtlclN0YXRlKG1hcmtlciwgc3RhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3NldFRyZWVNYXJrZXJTdGF0ZScsIG1hcmtlcik7XG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChtYXJrZXIubG9ubGF0LmxvbiwgbWFya2VyLmxvbmxhdC5sYXQpO1xuXG4gICAgICAgIG1hcmtlci50cmVlVmlzaWJsZSA9IHN0YXRlO1xuICAgICAgICBtYXJrZXIuc2V0VXJsKHN0YXRlID8gaWNvbl9wYXRocy5lbnRfZG90YV90cmVlIDogaWNvbl9wYXRocy5lbnRfZG90YV90cmVlX2N1dCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgIHZhciBncmlkWFkgPSB2cy5Xb3JsZFhZdG9HcmlkWFkod29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICAgICAgdnMudG9nZ2xlVHJlZShncmlkWFkueCwgZ3JpZFhZLnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcHVwQ29udGVudEhUTUwgPSBcIkNsaWNrIHRvIGN1dCBkb3duIHRyZWUuPGJyPlRoaXMgd2lsbCBhZmZlY3QgdGhlIHdhcmQgdmlzaW9uIHNpbXVsYXRpb24uXCI7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgZGVsZXRlIGN1dFRyZWVzW21hcmtlci50cmVlX2xvY11cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgPSBcIkNsaWNrIHRvIHJlZ3JvdyB0cmVlLjxicj5UaGlzIHdpbGwgYWZmZWN0IHRoZSB3YXJkIHZpc2lvbiBzaW11bGF0aW9uLlwiO1xuICAgICAgICAgICAgY3V0VHJlZXNbbWFya2VyLnRyZWVfbG9jXSA9IG1hcmtlcjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgbWFya2VyLmZlYXR1cmUuZGF0YS5wb3B1cENvbnRlbnRIVE1MID0gcG9wdXBDb250ZW50SFRNTDtcbiAgICAgICAgaWYgKG1hcmtlci5mZWF0dXJlLnBvcHVwKSB7XG4gICAgICAgICAgICBtYXJrZXIuZmVhdHVyZS5wb3B1cC5zZXRDb250ZW50SFRNTChwb3B1cENvbnRlbnRIVE1MKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBhZGRWaXNpb25DaXJjbGUobGF5ZXIsIG1hcmtlciwgcmFkaXVzLCBwcm9wZXJ0eSwgc3R5bGUpIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KG1hcmtlci5sb25sYXQubG9uLCBtYXJrZXIubG9ubGF0LmxhdCk7XG4gICAgICAgIHZhciBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24oY2VudGVyLCBnZXRTY2FsZWRSYWRpdXMocmFkaXVzKSwgMzApO1xuICAgICAgICB2YXIgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSwgbnVsbCwgc3R5bGUpO1xuICAgICAgICBsYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgaWYgKG1hcmtlcltwcm9wZXJ0eV0pIHtcbiAgICAgICAgICAgIGxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlcltwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgbWFya2VyW3Byb3BlcnR5XS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgbWFya2VyW3Byb3BlcnR5XSA9IGZlYXR1cmU7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGFkZEJ1aWxkaW5nVmlzaW9uRmVhdHVyZXMobWFya2VyLCBza2lwRGF5LCBza2lwTmlnaHQsIHNraXBUcnVlU2lnaHQsIHNraXBBdHRhY2spIHtcbiAgICAgICAgdmFyIGRheV92aXNpb25fcmFkaXVzID0gREFSS05FU1MgPyBNYXRoLm1pbihtYXJrZXIuZGF5X3Zpc2lvbl9yYWRpdXMsIERBUktORVNTX1ZJU0lPTl9SQURJVVMpIDogbWFya2VyLmRheV92aXNpb25fcmFkaXVzO1xuICAgICAgICB2YXIgbmlnaHRfdmlzaW9uX3JhZGl1cyA9IERBUktORVNTID8gTWF0aC5taW4obWFya2VyLm5pZ2h0X3Zpc2lvbl9yYWRpdXMsIERBUktORVNTX1ZJU0lPTl9SQURJVVMpIDogbWFya2VyLm5pZ2h0X3Zpc2lvbl9yYWRpdXM7XG4gICAgICAgIHZhciB0cnVlX3NpZ2h0X3JhZGl1cyA9IG1hcmtlci50cnVlX3NpZ2h0X3JhZGl1cztcbiAgICAgICAgdmFyIGF0dGFja19yYW5nZV9yYWRpdXMgPSBtYXJrZXIuYXR0YWNrX3JhbmdlX3JhZGl1cztcbiAgICAgICAgXG4gICAgICAgIGlmICghc2tpcERheSkgYWRkVmlzaW9uQ2lyY2xlKGRheVJhbmdlTGF5ZXIsIG1hcmtlciwgZGF5X3Zpc2lvbl9yYWRpdXMsICdkYXlfdmlzaW9uX2ZlYXR1cmUnLCBzdHlsZS5kYXkpO1xuICAgICAgICBpZiAoIXNraXBOaWdodCkgYWRkVmlzaW9uQ2lyY2xlKG5pZ2h0UmFuZ2VMYXllciwgbWFya2VyLCBuaWdodF92aXNpb25fcmFkaXVzLCAnbmlnaHRfdmlzaW9uX2ZlYXR1cmUnLCBzdHlsZS5uaWdodCk7XG4gICAgICAgIGlmICghc2tpcFRydWVTaWdodCkgYWRkVmlzaW9uQ2lyY2xlKHRydWVTaWdodFJhbmdlTGF5ZXIsIG1hcmtlciwgdHJ1ZV9zaWdodF9yYWRpdXMsICd0cnVlX3NpZ2h0X2ZlYXR1cmUnLCBzdHlsZS50cnVlX3NpZ2h0KTtcbiAgICAgICAgaWYgKCFza2lwQXR0YWNrKSBhZGRWaXNpb25DaXJjbGUoYXR0YWNrUmFuZ2VMYXllciwgbWFya2VyLCBhdHRhY2tfcmFuZ2VfcmFkaXVzLCAnYXR0YWNrX3JhbmdlX2ZlYXR1cmUnLCBzdHlsZS5hdHRhY2tfcmFuZ2UpO1xuICAgICAgICBcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmICFza2lwRGF5KSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihtYXJrZXIubG9ubGF0LCBtYXJrZXIsIGRheV92aXNpb25fcmFkaXVzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3dlck1hcmtlckNsaWNrKGUsIHNraXBRdWVyeVN0cmluZ1VwZGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlVG93ZXJNYXJrZXJDbGljaycpO1xuICAgICAgICB2YXIgbWFya2VyID0gZS5vYmplY3Q7XG4gICAgICAgIGlmICghbWFya2VyLnNob3dJbmZvKSB7XG4gICAgICAgICAgICBhZGRCdWlsZGluZ1Zpc2lvbkZlYXR1cmVzKG1hcmtlcik7XG4gICAgICAgICAgICBpZiAoIXNraXBRdWVyeVN0cmluZ1VwZGF0ZSkgUXVlcnlTdHJpbmcuYWRkUXVlcnlTdHJpbmdWYWx1ZShcInRvd2VyX3Zpc2lvblwiLCBtYXJrZXIudG93ZXJfbG9jLnggKyAnLCcgKyBtYXJrZXIudG93ZXJfbG9jLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF5UmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIuZGF5X3Zpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIG5pZ2h0UmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIubmlnaHRfdmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIudHJ1ZV9zaWdodF9mZWF0dXJlKTtcbiAgICAgICAgICAgIGF0dGFja1JhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLmF0dGFja19yYW5nZV9mZWF0dXJlKTtcblxuICAgICAgICAgICAgaWYgKG1hcmtlci52aXNpb25fZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci52aXNpb25fZmVhdHVyZSk7XG4gICAgICAgICAgICBpZiAobWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci52aXNpb25fY2VudGVyX2ZlYXR1cmUpO1xuICAgICAgXG4gICAgICAgICAgICBpZiAoIXNraXBRdWVyeVN0cmluZ1VwZGF0ZSkgUXVlcnlTdHJpbmcucmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZShcInRvd2VyX3Zpc2lvblwiLCBtYXJrZXIudG93ZXJfbG9jLnggKyAnLCcgKyBtYXJrZXIudG93ZXJfbG9jLnkpO1xuICAgICAgICB9XG4gICAgICAgIG1hcmtlci5zaG93SW5mbyA9ICFtYXJrZXIuc2hvd0luZm87XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlV2FyZENsaWNrKGVudGl0eU5hbWUsIHN0eWxlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUsIHN0eWxlKTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIFF1ZXJ5U3RyaW5nLmFkZFF1ZXJ5U3RyaW5nVmFsdWUobWFya2VyLndhcmRfdHlwZSwgbWFya2VyLndhcmRfbG9jKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB1cGRhdGVXYXJkKG1hcmtlciwgcmFkaXVzKSB7XG4gICAgICAgIGlmIChtYXJrZXIud2FyZF90eXBlID09ICdvYnNlcnZlcicpIHtcbiAgICAgICAgICAgIG1hcmtlci5yYWRpdXNfZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICBtYXJrZXIudmlzaW9uX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICB2YXIgY2lyY2xlID0gT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KG1hcmtlci5sb25sYXQubG9uLCBtYXJrZXIubG9ubGF0LmxhdCksIGdldFNjYWxlZFJhZGl1cyhyYWRpdXMpLCA0MCksXG4gICAgICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSk7XG4gICAgICAgICAgICB3YXJkVmlzaW9uTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICBtYXJrZXIucmFkaXVzX2ZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKG1hcmtlci5sb25sYXQsIG1hcmtlciwgcmFkaXVzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUsIHN0eWxlLCBxc192YWx1ZV93b3JsZFhZKSB7XG4gICAgICAgIGlmICghbWFwQm91bmRzLmNvbnRhaW5zTG9uTGF0KGxhdGxvbikpIHJldHVybjtcbiAgICAgICAgdmFyIGVudGl0eSA9IEVOVElUSUVTW2VudGl0eU5hbWVdLFxuICAgICAgICAgICAgdmlzaW9uX3JhZGl1cyA9IGVudGl0eU5hbWUgPT0gJ29ic2VydmVyJyA/IGdldFZpc2lvblJhZGl1cygpIDogZW50aXR5LnJhZGl1cyxcbiAgICAgICAgICAgIG1hcmtlciA9IGNyZWF0ZVdhcmRNYXJrZXIoZW50aXR5Lmljb25fcGF0aCwgbGF0bG9uKTtcbiAgICAgICAgaWNvbkxheWVyLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICBcbiAgICAgICAgYWRkVmlzaW9uQ2lyY2xlKHdhcmRWaXNpb25MYXllciwgbWFya2VyLCB2aXNpb25fcmFkaXVzLCAncmFkaXVzX2ZlYXR1cmUnLCBzdHlsZSlcbiAgICAgICAgbWFya2VyLndhcmRfdHlwZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci53YXJkX2xvYyA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci52aXNpb25fcmFkaXVzID0gdmlzaW9uX3JhZGl1cztcblxuICAgICAgICBpZiAocXNfdmFsdWVfd29ybGRYWSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgICAgIHdvcmxkWFkueCA9IHdvcmxkWFkueC50b0ZpeGVkKDApO1xuICAgICAgICAgICAgd29ybGRYWS55ID0gd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICBtYXJrZXIud2FyZF9sb2MgPSB3b3JsZFhZLnggKyAnLCcgKyB3b3JsZFhZLnlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlci53YXJkX2xvYyA9IHFzX3ZhbHVlX3dvcmxkWFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04gJiYgZW50aXR5TmFtZSA9PSAnb2JzZXJ2ZXInKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihsYXRsb24sIG1hcmtlciwgbWFya2VyLnZpc2lvbl9yYWRpdXMpO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcImNsaWNrXCIsIG1hcmtlciwgd2FyZE1hcmtlclJlbW92ZSk7XG4gICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJ0b3VjaHN0YXJ0XCIsIG1hcmtlciwgd2FyZE1hcmtlclJlbW92ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygncGxhY2VXYXJkJywgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcmRNYXJrZXJSZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzX2ZlYXR1cmUpIHdhcmRWaXNpb25MYXllci5yZW1vdmVGZWF0dXJlcyh0aGlzLnJhZGl1c19mZWF0dXJlKTtcbiAgICAgICAgaWYgKHRoaXMudmlzaW9uX2ZlYXR1cmUpIHZpc2lvblNpbXVsYXRpb25MYXllci5yZW1vdmVGZWF0dXJlcyh0aGlzLnZpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgaWYgKHRoaXMudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXModGhpcy52aXNpb25fY2VudGVyX2ZlYXR1cmUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5ldmVudHMudW5yZWdpc3RlcihcImNsaWNrXCIsIHRoaXMsIHdhcmRNYXJrZXJSZW1vdmUpO1xuICAgICAgICB0aGlzLmV2ZW50cy51bnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCB0aGlzLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgaWNvbkxheWVyLnJlbW92ZU1hcmtlcih0aGlzKTtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcblxuICAgICAgICBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKHRoaXMud2FyZF90eXBlLCB0aGlzLndhcmRfbG9jKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVNZWFzdXJlbWVudHMoZXZlbnQpIHtcbiAgICAgICAgdmFyIG91dCA9IFwiXCI7XG4gICAgICAgIGlmIChldmVudC5vcmRlciA9PSAxKSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHM8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIikuaW5uZXJIVE1MID0gb3V0O1xuXG4gICAgICAgIGxhc3REaXN0YW5jZSA9IGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZVwiKS5pbm5lckhUTUwgPSAobGFzdERpc3RhbmNlIC8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3Zlc3BlZWRcIikudmFsdWUpLnRvRml4ZWQoMik7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lLWNvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzKGV2ZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIiksXG4gICAgICAgICAgICBvdXQgPSBcIlwiO1xuXG4gICAgICAgIGlmIChldmVudC5vcmRlciA9PSAxKSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJSYWRpdXM6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzPHN1cD4yPC9cIiArIFwic3VwPlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50c1BhcnRpYWwoZXZlbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKSxcbiAgICAgICAgICAgIG91dCA9IFwiXCIsXG4gICAgICAgICAgICBjaXJjbGUsXG4gICAgICAgICAgICBmZWF0dXJlLFxuICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgaWYgKGV2ZW50Lm9yZGVyID09IDEpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5tZWFzdXJlID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC51bml0cyA9PSBcImttXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlID0gT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueCwgZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS55KSwgZXZlbnQubWVhc3VyZSAqIDFlMywgMzApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLngsIGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueSksIGV2ZW50Lm1lYXN1cmUsIDMwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSk7XG4gICAgICAgICAgICAgICAgcG9seWdvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGV2ZW50Lmdlb21ldHJ5LmNpcmNsZV9mZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgaWYgKFwiY2lyY2xlX2ZlYXR1cmVzXCIgaW4gZXZlbnQuZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Lmdlb21ldHJ5LmNpcmNsZV9mZWF0dXJlcy5wdXNoKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Lmdlb21ldHJ5LmNpcmNsZV9mZWF0dXJlcyA9IFtmZWF0dXJlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wgPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZlYXR1cmUuaXNfbWVhc3VyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5pc19tZWFzdXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jYW5jZWwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ICs9IFwiUmFkaXVzOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0czxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIb3ZlclBvcHVwKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnBvcHVwID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAgPSB0aGlzLmNyZWF0ZVBvcHVwKHRoaXMuY2xvc2VCb3gpO1xuICAgICAgICAgICAgbWFwLmFkZFBvcHVwKHRoaXMucG9wdXApO1xuICAgICAgICAgICAgdGhpcy5wb3B1cC5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnRvZ2dsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRQb3B1cCA9IHRoaXMucG9wdXA7XG4gICAgICAgIE9wZW5MYXllcnMuRXZlbnQuc3RvcChldmVudCk7XG4gICAgfTtcbiAgICAgICAgXG4gICAgZnVuY3Rpb24gYWRkTWFya2VyKG1hcmtlcnMsIGxsLCBpY29uLCBwb3B1cENsYXNzLCBwb3B1cENvbnRlbnRIVE1MLCBjbG9zZUJveCwgb3ZlcmZsb3cpIHtcbiAgICAgICAgdmFyIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlKG1hcmtlcnMsIGxsKSxcbiAgICAgICAgICAgIG1hcmtlcjtcblxuICAgICAgICBmZWF0dXJlLmNsb3NlQm94ID0gY2xvc2VCb3g7XG4gICAgICAgIGZlYXR1cmUucG9wdXBDbGFzcyA9IHBvcHVwQ2xhc3M7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5pY29uID0gaWNvblxuICAgICAgICBmZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5vdmVyZmxvdyA9IG92ZXJmbG93ID8gXCJhdXRvXCIgOiBcImhpZGRlblwiO1xuICAgICAgICBtYXJrZXIgPSBmZWF0dXJlLmNyZWF0ZU1hcmtlcigpO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIFxuICAgICAgICBpZiAobWFya2Vycy5uYW1lID09IFwiVG93ZXJzXCIpIHtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW92ZXJcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG4gICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdXRcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobWFya2Vycy5uYW1lID09IFwiVHJlZXNcIiAmJiBWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlb3ZlclwiLCBmZWF0dXJlLCBoYW5kbGVIb3ZlclBvcHVwKTtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW91dFwiLCBmZWF0dXJlLCBoYW5kbGVIb3ZlclBvcHVwKTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXJzLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdhcmRNYXJrZXIoaW1nLCBsYXRsb24sIHBvcHVwQ29udGVudEhUTUwpIHtcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKDIxLCAyNSksXG4gICAgICAgICAgICBvZmZzZXQgPSBuZXcgT3BlbkxheWVycy5QaXhlbCgtKHNpemUudyAvIDIpLCAtc2l6ZS5oKSxcbiAgICAgICAgICAgIGljb24gPSBuZXcgT3BlbkxheWVycy5JY29uKGltZywgc2l6ZSwgb2Zmc2V0KTtcbiAgICAgICAgICAgIFxuICAgICAgICB2YXIgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUoaWNvbkxheWVyLCBsYXRsb24pO1xuICAgICAgICBmZWF0dXJlLmRhdGEubG9ubGF0ID0gbGF0bG9uO1xuICAgICAgICBmZWF0dXJlLmRhdGEuaWNvbiA9IGljb247XG4gICAgICAgIGZlYXR1cmUuY2xvc2VCb3ggPSBmYWxzZTtcbiAgICAgICAgZmVhdHVyZS5wb3B1cENsYXNzID0gT3BlbkxheWVycy5Qb3B1cC5GcmFtZWRDbG91ZDtcbiAgICAgICAgZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBmZWF0dXJlLmRhdGEub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICB2YXIgbWFya2VyID0gZmVhdHVyZS5jcmVhdGVNYXJrZXIoKTtcbiAgICAgICAgbWFya2VyLmZlYXR1cmUgPSBmZWF0dXJlO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlb3ZlclwiLCBmZWF0dXJlLCBoYW5kbGVIb3ZlclBvcHVwKTtcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlb3V0XCIsIGZlYXR1cmUsIGhhbmRsZUhvdmVyUG9wdXApO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZVdhcmRNYXJrZXInLCBsYXRsb24pO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZXMgYSA2NHg2NCByZWN0YW5nbGUgZmVhdHVyZSBjZW50ZXJlZCBhdCBjXG4gICAgZnVuY3Rpb24gY3JlYXRlVGlsZUZlYXR1cmUoYywgc3R5bGUpIHtcbiAgICAgICAgdmFyIHIxID0gd29ybGRUb0xhdExvbihjLnggLSAzMiwgYy55IC0gMzIpLFxuICAgICAgICAgICAgcjIgPSB3b3JsZFRvTGF0TG9uKGMueCAtIDMyLCBjLnkgKyAzMiksXG4gICAgICAgICAgICByMyA9IHdvcmxkVG9MYXRMb24oYy54ICsgMzIsIGMueSArIDMyKSxcbiAgICAgICAgICAgIHI0ID0gd29ybGRUb0xhdExvbihjLnggKyAzMiwgYy55IC0gMzIpLFxuICAgICAgICAgICAgYm94X3BvaW50cyA9IFtcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMS54LCByMS55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMi54LCByMi55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyMy54LCByMy55KSxcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChyNC54LCByNC55KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJveF9yZWN0ID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhib3hfcG9pbnRzKSxcbiAgICAgICAgICAgIGJveF9mZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoYm94X3JlY3QsIG51bGwsIHN0eWxlKTtcblxuICAgICAgICByZXR1cm4gYm94X2ZlYXR1cmU7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlcyB1cmwgZm9yIHRpbGVzLiBPcGVuTGF5ZXJzIFRNUyBMYXllciBnZXRVUkwgcHJvcGVydHkgaXMgc2V0IHRvIHRoaXNcbiAgICBmdW5jdGlvbiBnZXRNeVVSTChwYXRjaCwgYmFzZUxheWVyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihib3VuZHMpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2dldE15VVJMJywgYmFzZUxheWVyKTtcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLm1hcC5nZXRSZXNvbHV0aW9uKCksXG4gICAgICAgICAgICAgICAgeCA9IE1hdGgucm91bmQoKGJvdW5kcy5sZWZ0IC0gdGhpcy5tYXhFeHRlbnQubGVmdCkgLyAocmVzICogdGhpcy50aWxlU2l6ZS53KSksXG4gICAgICAgICAgICAgICAgeSA9IE1hdGgucm91bmQoKHRoaXMubWF4RXh0ZW50LnRvcCAtIGJvdW5kcy50b3ApIC8gKHJlcyAqIHRoaXMudGlsZVNpemUuaCkpLFxuICAgICAgICAgICAgICAgIHogPSBtYXAuZ2V0Wm9vbSgpLFxuICAgICAgICAgICAgICAgIHBhdGggPSB6ICsgXCIvdGlsZV9cIiArIHggKyBcIl9cIiArIHkgKyBcIi5cIiArIHRoaXMudHlwZSxcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnVybDtcblxuICAgICAgICAgICAgaWYgKHVybCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgdXJsID0gdGhpcy5zZWxlY3RVcmwocGF0aCwgdXJsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVybCArIHBhdGNoICsgJy8nICsgYmFzZUxheWVyICsgJy8nICsgcGF0aFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHJlc2V0TWFya2VyTGF5ZXJzKCkge1xuICAgICAgICBmb3IgKGsgaW4gdHJlZU1hcmtlcnMpIHtcbiAgICAgICAgICAgIGlmIChjdXRUcmVlc1trXSkge1xuICAgICAgICAgICAgICAgIHNldFRyZWVNYXJrZXJTdGF0ZSh0cmVlTWFya2Vyc1trXSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSBtYXBfZGF0YTtcbiAgICAgICAgbGF5ZXJLZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1trXSlbMF07XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncmVtb3ZpbmcgbGF5ZXInLCBsYXllciwgayk7XG4gICAgICAgICAgICBpZiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBtYXAucmVtb3ZlTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgIGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRheVJhbmdlTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIG5pZ2h0UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgYXR0YWNrUmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgbWFwLmV2ZW50cy51bnJlZ2lzdGVyKFwiY2hhbmdlbGF5ZXJcIiwgbWFwLCBsYXllckNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uTWFwRGF0YUxvYWQoZGF0YSkge1xuICAgICAgICB2YXIgbWFya2VycyA9IHt9LFxuICAgICAgICAgICAgbWFya2VyLFxuICAgICAgICAgICAgdmVjdG9yTGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKFwiUGxhY2VkIFdhcmRzXCIpWzBdLFxuICAgICAgICAgICAgYm94X3BvaW50cyA9IFtdLFxuICAgICAgICAgICAgYm94X3JlY3QsIGJveF9mZWF0dXJlO1xuICAgICAgICBsYXllcktleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uTWFwRGF0YUxvYWQnLCBrKTtcbiAgICAgICAgICAgIGlmIChkYXRhW2tdKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG1hcmtlcnMgZm9yIG5vbi1uZXV0cmFsIHNwYXduIGJveCBhbmQgbm9uLXRyZWUgbGF5ZXJzXG4gICAgICAgICAgICAgICAgaWYgKGsgIT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIgJiYgayAhPSBcImVudF9kb3RhX3RyZWVcIiAmJiBrICE9IFwibm9fd2FyZHNcIiAmJiBrICE9IFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtrXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24oZGF0YVtrXVtpXS54LCBkYXRhW2tdW2ldLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl9wYXRoc1trXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZSgyNCwgMjQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBuZXcgT3BlbkxheWVycy5QaXhlbCgtMTIsLTEyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbiA9IG5ldyBPcGVuTGF5ZXJzLkljb24oaWNvbl9wYXRoc1trXSwgc2l6ZSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlciA9IGFkZE1hcmtlcihtYXJrZXJzW2tdLCBuZXcgT3BlbkxheWVycy5Mb25MYXQobGF0bG9uLngsIGxhdGxvbi55KSwgaWNvbiwgT3BlbkxheWVycy5Qb3B1cC5GcmFtZWRDbG91ZCwgXCJDbGljayB0byB0b2dnbGUgcmFuZ2Ugb3ZlcmxheVwiLCBmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID09IFwibnBjX2RvdGFfdG93ZXJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCducGNfZG90YV90b3dlcicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5kYXlfdmlzaW9uX3JhZGl1cyA9IFRPV0VSX0RBWV9WSVNJT05fUkFESVVTO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5uaWdodF92aXNpb25fcmFkaXVzID0gVE9XRVJfTklHSFRfVklTSU9OX1JBRElVUztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudHJ1ZV9zaWdodF9yYWRpdXMgPSBUT1dFUl9UUlVFX1NJR0hUX1JBRElVUztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYXR0YWNrX3JhbmdlX3JhZGl1cyA9IFRPV0VSX0FUVEFDS19SQU5HRV9SQURJVVM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnNob3dJbmZvID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLndhcmRfdHlwZSA9ICd0b3dlcidcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCBtYXJrZXJzW2tdLCBoYW5kbGVUb3dlck1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCBtYXJrZXJzW2tdLCBoYW5kbGVUb3dlck1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudG93ZXJfbG9jID0gZGF0YVtrXVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTZXQgdXAgdHJlZSBsYXllciB3aXRob3V0IGNyZWF0aW5nIHRyZWUgbWFya2VycyB5ZXRcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09IFwiZW50X2RvdGFfdHJlZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5NYXJrZXJzKGxheWVyTmFtZXNba10sIHt2aXNpYmlsaXR5OiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbWFya2Vyc1trXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgbWFya2Vyc1trXS5kYXRhID0gZGF0YVtrXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldXRyYWwgc3Bhd24gbWFya2VycyBhbmQgcmVjdGFuZ2xlc1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEpTT05EYXRhKG1hcmtlcnMsIGssIFwibnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyX2JveFwiLCBkYXRhW2tdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgICAgIGlmIChrID09PSBcIm5vX3dhcmRzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsIGssIGxheWVyTmFtZXNba10sIHN0eWxlLnJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGsgPT09IFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIikge1xuICAgICAgICAgICAgICAgICAgICBsb2FkR2VvSlNPTkRhdGEobWFya2VycywgaywgbGF5ZXJOYW1lc1trXSwgc3R5bGUubGlnaHRibHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pOyAgICAgICAgXG5cbiAgICAgICAgbWFwX2RhdGEgPSBkYXRhO1xuICAgICAgICBcbiAgICAgICAgbWFwLnJhaXNlTGF5ZXIodmVjdG9yTGF5ZXIsIG1hcC5sYXllcnMubGVuZ3RoKTtcblxuICAgICAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwiY2hhbmdlbGF5ZXJcIiwgbWFwLCBsYXllckNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgIHBhcnNlUXVlcnlTdHJpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbGF5ZXJDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIC8vIExvYWQgdHJlZSBtYXJrZXJzIHRoZSBmaXJzdCB0aW1lIHRoZSB0cmVlIGxheWVyIGlzIHN3aXRjaGVkIHRvXG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIgJiYgZXZlbnQubGF5ZXIubmFtZSA9PSBsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSAmJiAhZXZlbnQubGF5ZXIubG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkVHJlZURhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5sYXllci5pc0Jhc2VMYXllcikge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdCYXNlTGF5ZXInLCBldmVudC5sYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKGV2ZW50LmxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJyksIGV2ZW50LmxheWVyLnZpc2liaWxpdHkgPyB0cnVlIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJlZURhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCB0cmVlIGxvYWQnKTtcbiAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSlbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKGxheWVyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllci5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihsYXllci5kYXRhW2ldLngsIGxheWVyLmRhdGFbaV0ueSk7XG4gICAgICAgICAgICB2YXIgc2l6ZSA9IG5ldyBPcGVuTGF5ZXJzLlNpemUoMjQsIDI0KSxcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBuZXcgT3BlbkxheWVycy5QaXhlbCgtMTIsLTEyKSxcbiAgICAgICAgICAgICAgICBpY29uID0gbmV3IE9wZW5MYXllcnMuSWNvbihpY29uX3BhdGhzW1wiZW50X2RvdGFfdHJlZVwiXSwgc2l6ZSwgb2Zmc2V0KTtcbiAgICAgICAgICAgIG1hcmtlciA9IGFkZE1hcmtlcihsYXllciwgbmV3IE9wZW5MYXllcnMuTG9uTGF0KGxhdGxvbi54LCBsYXRsb24ueSksIGljb24sIE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQsIFwiQ2xpY2sgdG8gY3V0IGRvd24gdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIiwgZmFsc2UpO1xuICAgICAgICAgICAgbWFya2VyLnRyZWVWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hcmtlci50cmVlX2xvYyA9IGxheWVyLmRhdGFbaV0ueCArICcsJyArIGxheWVyLmRhdGFbaV0ueTtcbiAgICAgICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJjbGlja1wiLCBtYXJrZXIsIGhhbmRsZVRyZWVNYXJrZXJDbGljayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmVlTWFya2Vyc1tsYXllci5kYXRhW2ldLnggKyAnLCcgKyBsYXllci5kYXRhW2ldLnldID0gbWFya2VyO1xuICAgICAgICB9XG4gICAgICAgIGxheWVyLmxvYWRlZCA9ICFsYXllci5sb2FkZWQ7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmQgdHJlZSBsb2FkJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZEpTT05EYXRhKG1hcmtlcnMsIGssIG5hbWUsIGRhdGEpIHtcbiAgICAgICAgbWFya2Vyc1tuYW1lXSA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihsYXllck5hbWVzW2tdKTtcbiAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNbbmFtZV0pO1xuICAgICAgICBtYXJrZXJzW25hbWVdLnNldFZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBudCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBkYXRhW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24oZGF0YVtpXVtqXS54LCBkYXRhW2ldW2pdLnkpO1xuICAgICAgICAgICAgICAgIHBudC5wdXNoKG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KGxhdGxvbi54LCBsYXRsb24ueSkpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIGxuID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhwbnQpO1xuICAgICAgICAgICAgcGYgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihsbiwgbnVsbCwgc3R5bGUuZ3JlZW4pO1xuICAgICAgICAgICAgbWFya2Vyc1tuYW1lXS5hZGRGZWF0dXJlcyhbcGZdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBsb2FkR2VvSlNPTkRhdGEobWFya2VycywgaywgbmFtZSwgc3R5bGUpIHtcbiAgICAgICAgdmFyIGZpbGVuYW1lID0gbWFwX2RhdGFfcGF0aCArIGdldERhdGFWZXJzaW9uKCkgKyAnLycgKyBrICsgJzIuanNvbic7XG4gICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IobmFtZSwge1xuICAgICAgICAgICAgc3RyYXRlZ2llczogW25ldyBPcGVuTGF5ZXJzLlN0cmF0ZWd5LkZpeGVkKCldLFxuICAgICAgICAgICAgcHJvdG9jb2w6IG5ldyBPcGVuTGF5ZXJzLlByb3RvY29sLkhUVFAoe1xuICAgICAgICAgICAgICAgIHVybDogZmlsZW5hbWUsXG4gICAgICAgICAgICAgICAgZm9ybWF0OiBuZXcgT3BlbkxheWVycy5Gb3JtYXQuR2VvSlNPTigpXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpc2liaWxpdHk6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBtYXJrZXJzW2tdLnN0eWxlID0gc3R5bGU7XG4gICAgICAgIG1hcC5hZGRMYXllcihtYXJrZXJzW2tdKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdG9nZ2xlQ29udHJvbCgpIHtcbiAgICAgICAgdmFyIGNvbnRyb2w7XG4gICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdtb2RlJywgbnVsbCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkcmF3Q29udHJvbHMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBkcmF3Q29udHJvbHNba2V5XTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMsIHRoaXMudmFsdWUsIGtleSwgdGhpcy52YWx1ZSA9PSBrZXkgJiYgdGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlID09IGtleSAmJiB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnbW9kZScsIGtleSk7XG4gICAgICAgICAgICAgICAgY29udHJvbC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy52YWx1ZSA9PSBcInBvbHlnb25Db250cm9sXCIgfHwgdGhpcy52YWx1ZSA9PSBcImNpcmNsZVwiKSAmJiB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gJ29ic2VydmVyJykgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpYmxlLWFyZWFcIikuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lLWNvbnRhaW5lclwiKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgbWFwIHNldHRpbmdzIGJhc2VkIG9uIHF1ZXJ5IHN0cmluZyB2YWx1ZXNcbiAgICBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nKCkge1xuICAgICAgICB2YXIgbW9kZSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnbW9kZScpO1xuICAgICAgICBpZiAobW9kZSkge1xuICAgICAgICAgICAgdmFyIG1vZGVSYWRpb0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1vZGUgKyAnVG9nZ2xlJyk7XG4gICAgICAgICAgICBpZiAobW9kZVJhZGlvQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgbW9kZVJhZGlvQnV0dG9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRvZ2dsZUNvbnRyb2wuY2FsbChtb2RlUmFkaW9CdXR0b24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB6b29tID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCd6b29tJyk7XG4gICAgICAgIGlmICh6b29tKSB7XG4gICAgICAgICAgICBtYXAuem9vbVRvKHBhcnNlSW50KHpvb20pKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd29ybGRYID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCd4Jyk7XG4gICAgICAgIHZhciB3b3JsZFkgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3knKTtcbiAgICAgICAgaWYgKHdvcmxkWCAmJiB3b3JsZFkpIHtcbiAgICAgICAgICAgIHZhciBsb25sYXQgPSB3b3JsZFRvTGF0TG9uKHdvcmxkWCwgd29ybGRZKTtcbiAgICAgICAgICAgIG1hcC5zZXRDZW50ZXIobmV3IE9wZW5MYXllcnMuTG9uTGF0KGxvbmxhdC54LCBsb25sYXQueSksIHVuZGVmaW5lZCwgZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGtleXMgPSBbJ29ic2VydmVyJywgJ3NlbnRyeSddO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB3YXJkcyA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZShrZXlzW2ldKVxuICAgICAgICAgICAgaWYgKHdhcmRzKSB7XG4gICAgICAgICAgICAgICAgd2FyZF9jb29yZGluYXRlcyA9IHRyaW0od2FyZHMsICcgOycpLnNwbGl0KCc7JylcbiAgICAgICAgICAgICAgICB3YXJkX2Nvb3JkaW5hdGVzLm1hcChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29vcmQgPSBlbC5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeHkgPSB3b3JsZFRvTGF0TG9uKHBhcnNlRmxvYXQoY29vcmRbMF0pLCBwYXJzZUZsb2F0KGNvb3JkWzFdKSk7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlV2FyZChuZXcgT3BlbkxheWVycy5Mb25MYXQoeHkueCwgeHkueSksIGtleXNbaV0sIGtleXNbaV0gPT09ICdvYnNlcnZlcicgPyBzdHlsZS5kYXkgOiBzdHlsZS50cnVlX3NpZ2h0LCBlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBiYXNlTGF5ZXJOYW1lID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdCYXNlTGF5ZXInKTtcbiAgICAgICAgaWYgKGJhc2VMYXllck5hbWUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZUxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IGJhc2VMYXllcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VMYXllck5hbWUgPT09IGxheWVyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0QmFzZUxheWVyKGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGsgaW4gbGF5ZXJOYW1lcykge1xuICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGxheWVyTmFtZXNba10ucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZShsYXllck5hbWUpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW2tdKVswXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFyc2VRdWVyeVN0cmluZycsIGxheWVyLCBsYXllck5hbWVzW2tdLCBsYXllck5hbWUsIHZhbHVlID09IFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIpIGxheWVyLnNldFZpc2liaWxpdHkodmFsdWUgPT0gXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1dF90cmVlcyA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnY3V0X3RyZWVzJyk7XG4gICAgICAgIGlmIChjdXRfdHJlZXMpIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1tcImVudF9kb3RhX3RyZWVcIl0pWzBdO1xuICAgICAgICAgICAgaWYgKCFsYXllci5sb2FkZWQpIGxvYWRUcmVlRGF0YSgpO1xuICAgICAgICAgICAgY3V0X3RyZWVfY29vcmRpbmF0ZXMgPSB0cmltKGN1dF90cmVlcywgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU1hcmtlcnMsIGN1dF90cmVlX2Nvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3V0X3RyZWVfY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXRfdHJlZV9jb29yZGluYXRlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVNYXJrZXJzW2N1dF90cmVlX2Nvb3JkaW5hdGVzW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUcmVlTWFya2VyU3RhdGUodHJlZU1hcmtlcnNbY3V0X3RyZWVfY29vcmRpbmF0ZXNbaV1dLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvd2VyX3Zpc2lvbiA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgndG93ZXJfdmlzaW9uJyk7XG4gICAgICAgIGlmICh0b3dlcl92aXNpb24pIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1tcIm5wY19kb3RhX3Rvd2VyXCJdKVswXTtcbiAgICAgICAgICAgIHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcyA9IHRyaW0odG93ZXJfdmlzaW9uLCAnIDsnKS5zcGxpdCgnOycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG93ZXJfdmlzaW9uJywgbGF5ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU1hcmtlcnMsIHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGF5ZXIubWFya2Vycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWFya2Vyc1tqXS50b3dlcl9sb2MueCArICcsJyArIGxheWVyLm1hcmtlcnNbal0udG93ZXJfbG9jLnkgPT0gdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVUb3dlck1hcmtlckNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGxheWVyLm1hcmtlcnNbal1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldFRyZWVRdWVyeVN0cmluZygpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gT2JqZWN0LmtleXMoY3V0VHJlZXMpLmpvaW4oJzsnKTtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2N1dF90cmVlcycsIHZhbHVlIHx8IG51bGwpO1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKlxuICAgICAqIElOSVRJVElBTElaQVRJT04gKlxuICAgICAqKioqKioqKioqKioqKioqKioqKi9cbiAgICBPcGVuTGF5ZXJzLkltZ1BhdGggPSBJTUdfRElSO1xuICAgIFxuICAgIC8vIFN0YXJ0IHNldHRpbmcgdXAgdGhlIG1hcCwgYWRkaW5nIGNvbnRyb2xzIGFuZCBsYXllcnNcbiAgICBiYXNlTGF5ZXJzLmZvckVhY2goZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICB9KTtcbiAgICBtYXAuYWRkTGF5ZXIoY3Vyc29yTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihkYXlSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIobmlnaHRSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIodHJ1ZVNpZ2h0UmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKGF0dGFja1JhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihwb2x5Z29uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih3YXJkVmlzaW9uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih2aXNpb25TaW11bGF0aW9uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihpY29uTGF5ZXIpO1xuICAgIG1hcC5hZGRDb250cm9sKGNvb3JkaW5hdGVDb250cm9sKTtcbiAgICBtYXAuYWRkQ29udHJvbChuZXcgT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb24oe1xuICAgICAgICBkcmFnUGFuT3B0aW9uczoge1xuICAgICAgICAgICAgZW5hYmxlS2luZXRpYzogdHJ1ZVxuICAgICAgICB9XG4gICAgfSkpO1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuS2V5Ym9hcmREZWZhdWx0cygpKTtcbiAgICBtYXAuYWRkQ29udHJvbChsYXllclN3aXRjaGVyKTtcbiAgICBsYXllclN3aXRjaGVyLm1heGltaXplQ29udHJvbCgpO1xuICAgIGlmICghbWFwLmdldENlbnRlcigpKSB7XG4gICAgICAgIG1hcC56b29tVG9NYXhFeHRlbnQoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gY3JlYXRlIGNsaWNrIGhhbmRsZXJcbiAgICBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2sgPSBPcGVuTGF5ZXJzLkNsYXNzKE9wZW5MYXllcnMuQ29udHJvbCwge1xuICAgICAgICBkZWZhdWx0SGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIHNpbmdsZTogdHJ1ZSxcbiAgICAgICAgICAgIFwiZG91YmxlXCI6IGZhbHNlLFxuICAgICAgICAgICAgcGl4ZWxUb2xlcmFuY2U6IDAsXG4gICAgICAgICAgICBzdG9wU2luZ2xlOiBmYWxzZSxcbiAgICAgICAgICAgIHN0b3BEb3VibGU6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck9wdGlvbnMgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRIYW5kbGVyT3B0aW9ucyk7XG4gICAgICAgICAgICBPcGVuTGF5ZXJzLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlciA9IG5ldyBPcGVuTGF5ZXJzLkhhbmRsZXIuQ2xpY2sodGhpcywge1xuICAgICAgICAgICAgICAgIGNsaWNrOiB0aGlzLm9uQ2xpY2ssXG4gICAgICAgICAgICAgICAgZGJsY2xpY2s6IHRoaXMub25EYmxjbGlja1xuICAgICAgICAgICAgfSwgdGhpcy5oYW5kbGVyT3B0aW9ucyk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ2xpY2s6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ29uQ2xpY2snKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25EYmxjbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmtleSArIFwiT3V0cHV0XCIpLFxuICAgICAgICAgICAgICAgIG1zZyA9IFwiZGJsY2xpY2sgXCIgKyBldmVudC54eTtcbiAgICAgICAgICAgIG91dHB1dC52YWx1ZSA9IG91dHB1dC52YWx1ZSArIG1zZyArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbnRyb2xzIGNvbmZpZ3VyYXRpb25cbiAgICByZW5kZXJlciA9IHJlbmRlcmVyID8gW3JlbmRlcmVyXSA6IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yLnByb3RvdHlwZS5yZW5kZXJlcnM7XG4gICAgZHJhd0NvbnRyb2xzID0ge1xuICAgICAgICBsaW5lOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoT3BlbkxheWVycy5IYW5kbGVyLlBhdGgsIHtcbiAgICAgICAgICAgIHBlcnNpc3Q6IHRydWUsXG4gICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM6IHJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgY2lyY2xlOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoT3BlbkxheWVycy5IYW5kbGVyLlBhdGgsIHtcbiAgICAgICAgICAgIHBlcnNpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXJzOiByZW5kZXJlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG9ic2VydmVyOiBuZXcgT3BlbkxheWVycy5Db250cm9sLkNsaWNrKHtcbiAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZVdhcmRDbGljaygnb2JzZXJ2ZXInLCBzdHlsZS5kYXkpXG4gICAgICAgIH0pLFxuICAgICAgICBzZW50cnk6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2soe1xuICAgICAgICAgICAgb25DbGljazogaGFuZGxlV2FyZENsaWNrKCdzZW50cnknLCBzdHlsZS50cnVlX3NpZ2h0KVxuICAgICAgICB9KSxcbiAgICAgICAgcG9seWdvbkNvbnRyb2w6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuRHJhd0ZlYXR1cmUocG9seWdvbkxheWVyLCBPcGVuTGF5ZXJzLkhhbmRsZXIuUmVndWxhclBvbHlnb24sIHtcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2lkZXM6IDMwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBzZWxlY3Q6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuU2VsZWN0RmVhdHVyZShwb2x5Z29uTGF5ZXIsIHtcbiAgICAgICAgICAgIGhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgaGlnaGxpZ2h0T25seTogZmFsc2UsXG4gICAgICAgICAgICBjYWxsYmFja3M6IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oZmVhdHVyZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wgJiYgZmVhdHVyZS5pc19tZWFzdXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUubWVhc3VyZV9jb250cm9sLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5pc19tZWFzdXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9seWdvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG92ZXJGZWF0dXJlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKSxcbiAgICAgICAgICAgICAgICAgICAgb3V0ID0gXCJSYWRpdXM6IFwiICsgKC41NjUzNTIgKiBNYXRoLnNxcnQoZmVhdHVyZS5nZW9tZXRyeS5nZXRBcmVhKCkpICogbWFwQ29uc3RhbnRzLnNjYWxlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG91dDtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodChmZWF0dXJlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvdXRGZWF0dXJlOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgdGhpcy51bmhpZ2hsaWdodChmZWF0dXJlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH07XG5cbiAgICAvLyBBZGQgY29udHJvbHMgdG8gbWFwXG4gICAgZm9yICh2YXIga2V5IGluIGRyYXdDb250cm9scykge1xuICAgICAgICBpZiAoa2V5ID09IFwibGluZVwiKSB7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNba2V5XS5ldmVudHMub24oe1xuICAgICAgICAgICAgICAgIG1lYXN1cmU6IGhhbmRsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgICAgICAgICBtZWFzdXJlcGFydGlhbDogaGFuZGxlTWVhc3VyZW1lbnRzXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChrZXkgPT0gXCJjaXJjbGVcIikge1xuICAgICAgICAgICAgZHJhd0NvbnRyb2xzW2tleV0uZXZlbnRzLm9uKHtcbiAgICAgICAgICAgICAgICBtZWFzdXJlOiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHMsXG4gICAgICAgICAgICAgICAgbWVhc3VyZXBhcnRpYWw6IGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50c1BhcnRpYWxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgbWFwLmFkZENvbnRyb2woZHJhd0NvbnRyb2xzW2tleV0pO1xuICAgIH1cblxuICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJ6b29tZW5kXCIsIG1hcCwgZGVib3VuY2UoZnVuY3Rpb24oKXtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3pvb20nLCBtYXAuZ2V0Wm9vbSgpKTtcbiAgICB9LCA1MDApKTtcblxuICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJtb3ZlZW5kXCIsIG1hcCwgZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYXBDZW50ZXIgPSBtYXAuZ2V0Q2VudGVyKCk7XG4gICAgICAgIGlmIChtYXBDZW50ZXIpIHtcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChtYXBDZW50ZXIubG9uLCBtYXBDZW50ZXIubGF0KTtcbiAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCd4Jywgd29ybGRYWS54LnRvRml4ZWQoMCkpO1xuICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3knLCB3b3JsZFhZLnkudG9GaXhlZCgwKSk7XG4gICAgICAgIH1cbiAgICB9LCA1MDApKTtcblxuICAgIC8vIFgvWSBjb29yZGluYXRlIHVwZGF0ZSBkaXNwbGF5IGhhbmRsZXJcbiAgICBjb29yZGluYXRlQ29udHJvbC5mb3JtYXRPdXRwdXQgPSBmdW5jdGlvbiAobG9ubGF0KSB7XG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsb25sYXQubG9uLCBsb25sYXQubGF0KTtcbiAgICAgICAgcmV0dXJuIHdvcmxkWFkueC50b0ZpeGVkKDApICsgJywgJyArIHdvcmxkWFkueS50b0ZpeGVkKDApO1xuICAgIH07XG4gICAgXG4gICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlbW92ZVwiLCBtYXAsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY3Vyc29yTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgXG4gICAgICAgIC8vIGNyZWF0ZSBhbmQgYWRkIGN1cnNvciBtYXJrZXIgcG9seWdvbiBpZiBpbiBwbGFjZSBvYnNlcnZlciBtb2RlXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTiAmJiB2cy5yZWFkeSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9ic2VydmVyVG9nZ2xlXCIpLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHZhciBsb25sYXQgPSBtYXAuZ2V0TG9uTGF0RnJvbVBpeGVsKGUueHkpO1xuICAgICAgICAgICAgaWYgKCFtYXBCb3VuZHMuY29udGFpbnNMb25MYXQobG9ubGF0KSkgcmV0dXJuO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobG9ubGF0LmxvbiwgbG9ubGF0LmxhdCk7XG4gICAgICAgICAgICB2YXIgZ3JpZFhZID0gdnMuV29ybGRYWXRvR3JpZFhZKHdvcmxkWFkueCwgd29ybGRYWS55KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHRyZWVQdHMgPSB2cy50cmVlX3JlbGF0aW9uc1tncmlkWFkua2V5XTtcbiAgICAgICAgICAgIHZhciB0cmVlQmxvY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0cmVlUHRzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAgOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJlZVB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gdnMudHJlZV9zdGF0ZVt0cmVlUHQua2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGN1cnNvcl9zdHlsZSA9IHN0eWxlLmdyZWVuO1xuICAgICAgICAgICAgaWYgKCF2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgICAgIGN1cnNvcl9zdHlsZSA9IHN0eWxlLnJlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBib3hfZmVhdHVyZSA9IGNyZWF0ZVRpbGVGZWF0dXJlKHZzLkdyaWRYWXRvV29ybGRYWShncmlkWFkueCwgZ3JpZFhZLnkpLCBjdXJzb3Jfc3R5bGUpO1xuICAgICAgICAgICAgY3Vyc29yTGF5ZXIuYWRkRmVhdHVyZXMoW2JveF9mZWF0dXJlXSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTl9BTFdBWVMpIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGxvbmxhdCwgbnVsbCwgZ2V0VmlzaW9uUmFkaXVzKCkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaG93L2hpZGUgY29udHJvbHMgcGFuZWxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1heFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzXCIpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaWYgKGxheWVyU3dpdGNoZXIuaXNTbWFsbFNjcmVlbigpKSB7XG4gICAgICAgICAgICBsYXllclN3aXRjaGVyLm1pbmltaXplQ29udHJvbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1pbmltaXplQ29udHJvbExpc3QoZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWF4XCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtaW5pbWl6ZUNvbnRyb2xMaXN0LCBmYWxzZSk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGx5IGhpZGUgY29udHJvbHMgaWYgc2NyZWVuIGlzIHNtYWxsXG4gICAgaWYgKGxheWVyU3dpdGNoZXIuaXNTbWFsbFNjcmVlbigpKSB7XG4gICAgICAgIG1pbmltaXplQ29udHJvbExpc3QuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKSk7XG4gICAgICAgIGxheWVyU3dpdGNoZXIubWluaW1pemVDb250cm9sKCk7XG4gICAgfVxuXG4gICAgLy8gU2hvdy9oaWRlIFgvWSBjb29yZGluYXRlIGRpc3BsYXlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvb3JkQ29udHJvbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vbENvbnRyb2xNb3VzZVBvc2l0aW9uXCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vbENvbnRyb2xNb3VzZVBvc2l0aW9uXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBWaXNpb24gc2ltdWxhdGlvbiBvbi9vZmZcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2lvblNpbXVsYXRpb25Db250cm9sXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBWSVNJT05fU0lNVUxBVElPTiA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHdheXNTaW11bGF0ZUNvbnRyb2xcIikuZGlzYWJsZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIEFsd2F5cyBzaW11bGF0ZSB2aXNpb24gb24vb2ZmXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHdheXNTaW11bGF0ZUNvbnRyb2xcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUyA9IHRoaXMuY2hlY2tlZDtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBVcGRhdGUgdHJhdmVsIHRpbWUgZGlzcGxheSB3aGVuIG1vdmVzcGVlZCBpbnB1dCBjaGFuZ2VzXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3Zlc3BlZWRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZVwiKS5pbm5lckhUTUwgPSAobGFzdERpc3RhbmNlIC8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3Zlc3BlZWRcIikudmFsdWUpLnRvRml4ZWQoMik7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gU2V0IHVwIHBhbmVsIHJhZGlvIGJ1dHRvbiB0b2dnbGUgaGFuZGxlcnNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGVUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGVUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JzZXJ2ZXJUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VudHJ5VG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0pO1xuICAgICAgICByZXNldE1hcmtlckxheWVycygpO1xuICAgICAgICBwb2x5Z29uTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIHdhcmRWaXNpb25MYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBpY29uTGF5ZXIuY2xlYXJNYXJrZXJzKCk7XG4gICAgICAgIGRyYXdDb250cm9scy5saW5lLmNhbmNlbCgpO1xuICAgICAgICBkcmF3Q29udHJvbHMuY2lyY2xlLmNhbmNlbCgpO1xuICAgICAgICBtYXAuc2V0QmFzZUxheWVyKGJhc2VMYXllcnNbMF0pO1xuICAgICAgICBtYXAuem9vbVRvTWF4RXh0ZW50KCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlID0gRU5USVRJRVMub2JzZXJ2ZXIucmFkaXVzO1xuICAgICAgICBpbml0KCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2RhdGEnLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2aXNpb24tcmFkaXVzIGNoYW5nZScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnNldEF0dHJpYnV0ZSgnZGF0YS1kaXJ0eS12YWx1ZScsIHRydWUpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFya25lc3NDb250cm9sJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB0b2dnbGVEYXJrbmVzcyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGFya25lc3NDb250cm9sJykuY2hlY2tlZCk7XG4gICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdkYXJrbmVzcycsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnZhbHVlKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZGlydHktdmFsdWUnKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGFya25lc3Moc3RhdGUpIHtcbiAgICAgICAgREFSS05FU1MgPSBzdGF0ZTtcbiAgICAgICAgY29uc29sZS5sb2coc3RhdGUsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLWRpcnR5LXZhbHVlJyksICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLmdldEF0dHJpYnV0ZSgnZGF0YS1kaXJ0eS12YWx1ZScpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLmdldEF0dHJpYnV0ZSgnZGF0YS1zYXZlZC12YWx1ZScpKTtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnNldEF0dHJpYnV0ZSgnZGF0YS1zYXZlZC12YWx1ZScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSA9IERBUktORVNTX1ZJU0lPTl9SQURJVVM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLWRpcnR5LXZhbHVlJykpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzdG9yZSB2aXNpb24gcmFkaXVzJyk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSA9IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLXNhdmVkLXZhbHVlJykpICB8fCBFTlRJVElFUy5vYnNlcnZlci5yYWRpdXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWNvbkxheWVyLm1hcmtlcnMuZm9yRWFjaChmdW5jdGlvbiAobWFya2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXJrZXIpO1xuICAgICAgICAgICAgaWYgKG1hcmtlci53YXJkX3R5cGUgPT0gJ29ic2VydmVyJykge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVdhcmQobWFya2VyLCBzdGF0ZSA/IERBUktORVNTX1ZJU0lPTl9SQURJVVMgOiBtYXJrZXIudmlzaW9uX3JhZGl1cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNbXCJucGNfZG90YV90b3dlclwiXSlbMF07XG4gICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnNob3dJbmZvKSBhZGRCdWlsZGluZ1Zpc2lvbkZlYXR1cmVzKG1hcmtlciwgZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldERhdGFWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWU7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpc2libGVBcmVhKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJsZS1hcmVhJykuaW5uZXJIVE1MID0gXCJWaXNpYmlsaXR5OiBcIiArICh2cy5saWdodEFyZWEgLyB2cy5hcmVhICogMTAwKS50b0ZpeGVkKCkgKyAnJSAnICsgdnMubGlnaHRBcmVhICsgXCIvXCIgKyB2cy5hcmVhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGxhdGxvbiwgbWFya2VyLCByYWRpdXMpIHtcbiAgICAgICAgaWYgKCF2cy5yZWFkeSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgIGlmICh2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY2VudGVyIG1hcmtlciBwb2x5Z29uXG4gICAgICAgICAgICB2YXIgYm94X2ZlYXR1cmUgPSBjcmVhdGVUaWxlRmVhdHVyZSh2cy5HcmlkWFl0b1dvcmxkWFkoZ3JpZFhZLngsIGdyaWRYWS55KSwgc3R5bGUuZ3JlZW4pO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSA9IGJveF9mZWF0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleGVjdXRlIHZpc2lvbiBzaW11bGF0aW9uXG4gICAgICAgICAgICB2cy51cGRhdGVWaXNpYmlsaXR5KGdyaWRYWS54LCBncmlkWFkueSwgZ2V0VGlsZVJhZGl1cyhyYWRpdXMpKTtcbiAgICAgICAgICAgIHVwZGF0ZVZpc2libGVBcmVhKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIG1lcmdlIGxpZ2h0IHBvaW50cyBpbnRvIGEgc2luZ2xlIHBvbHlnb24gYW5kIGFkZCB0byB2aXNpb24gbGF5ZXJcbiAgICAgICAgICAgIHZhciBvdXRsaW5lcyA9IGdldExpZ2h0VW5pb24odnMuZ3JpZCwgdnMubGlnaHRzKTtcbiAgICAgICAgICAgIHZhciBwb2x5Z29uTGlzdCA9IG91dGxpbmVzLm1hcChmdW5jdGlvbiAob3V0bGluZVBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciByaW5nUG9pbnRzID0gb3V0bGluZVBvaW50cy5tYXAoZnVuY3Rpb24gKHB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JsZFhZID0gdnMuR3JpZFhZdG9Xb3JsZFhZKHB0LngsIHB0LnkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbih3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChsYXRsb24ueCwgbGF0bG9uLnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByaW5nID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhyaW5nUG9pbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbihbcmluZ10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbXVsdGlQb2x5Z29uID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTXVsdGlQb2x5Z29uKHBvbHlnb25MaXN0KTtcbiAgICAgICAgICAgIHZhciB2aXNpb25GZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IobXVsdGlQb2x5Z29uLCBudWxsLCBzdHlsZS55ZWxsb3cpO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbdmlzaW9uRmVhdHVyZV0pO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIudmlzaW9uX2ZlYXR1cmUpIG1hcmtlci52aXNpb25fZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlID0gdmlzaW9uRmVhdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnNvckxheWVyLmFkZEZlYXR1cmVzKFt2aXNpb25GZWF0dXJlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIudmlzaW9uX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IHZzLmFyZWEsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0QXJlYTogdnMubGlnaHRBcmVhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZVBvcHVwKG1hcmtlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gdXBkYXRlUG9wdXAobWFya2VyKSB7XG4gICAgICAgIHZhciBwb3B1cENvbnRlbnRIVE1MID0gXCJWaXNpYmlsaXR5OiBcIiArICh2cy5saWdodEFyZWEgLyB2cy5hcmVhICogMTAwKS50b0ZpeGVkKCkgKyAnJSAnICsgdnMubGlnaHRBcmVhICsgXCIvXCIgKyB2cy5hcmVhO1xuICAgICAgICBpZiAobWFya2VyLndhcmRfdHlwZSA9PT0gXCJ0b3dlclwiKSBwb3B1cENvbnRlbnRIVE1MID0gXCJDbGljayB0byB0b2dnbGUgcmFuZ2Ugb3ZlcmxheTxicj48YnI+XCIgKyBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBpZiAobWFya2VyLmZlYXR1cmUucG9wdXApIHtcbiAgICAgICAgICAgIG1hcmtlci5mZWF0dXJlLnBvcHVwLnNldENvbnRlbnRIVE1MKHBvcHVwQ29udGVudEhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RhcnQgdmlzaW9uIHNpbXVsYXRpb24gYW5kIHN0YXJ0IG1hcCBpbml0aWFsaXphdGlvbiBjaGVjayBpbiBjYWxsYmFja1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgdmFyIHZzID0gbmV3IFZpc2lvblNpbXVsYXRpb24od29ybGRkYXRhLCB2aXNpb25fZGF0YV9pbWFnZV9wYXRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd2cyBsb2FkZWQnLCBEYXRlLm5vdygpIC0gdDEpO1xuICAgICAgICBjb25zb2xlLmxvZygnbWFwLmdldFNpemUoKScsIG1hcC5nZXRTaXplKCkpO1xuICAgICAgICBpbml0Q2hlY2soKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBDaGVjayBpZiBtYXAgaXMgcmVhZHkgdG8gaW5pdGlhbGl6ZSwgaWYgbm90IHJldHJ5XG4gICAgdmFyIGluaXRDaGVja0NvdW50ID0gMDtcbiAgICB2YXIgbWF4SW5pdENoZWNrQ291bnQgPSA0MDtcbiAgICBmdW5jdGlvbiBpbml0Q2hlY2soKSB7XG4gICAgICAgIGlmIChtYXAuZ2V0U2l6ZSgpKSB7XG4gICAgICAgICAgICBpbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbml0Q2hlY2tDb3VudCsrO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ21hcCBzaXplIG51bGwnKTtcbiAgICAgICAgICAgIGlmIChpbml0Q2hlY2tDb3VudCA8IG1heEluaXRDaGVja0NvdW50KSB7XG4gICAgICAgICAgICAgICAgbWFwLnVwZGF0ZVNpemUoKTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGluaXRDaGVjaywgMjUwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvbGxiYXIuZXJyb3IoXCJNYXggaW5pdCBjaGVjayBleGNlZWRlZFwiKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIlRoZXJlIHdhcyBhIHByb2JsZW0gbG9hZGluZyB0aGUgbWFwLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgZGF0YSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnZGF0YScpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gZGF0YSAhPSBcIjY4N1wiO1xuICAgICAgICAvL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cInZpc2lvblNpbXVsYXRpb25Db250cm9sXCJdJykuc3R5bGUuZGlzcGxheSA9IFZJU0lPTl9TSU1VTEFUSU9OID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIikuZGlzYWJsZWQgPSAhVklTSU9OX1NJTVVMQVRJT047XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx3YXlzU2ltdWxhdGVDb250cm9sXCIpLmRpc2FibGVkID0gIVZJU0lPTl9TSU1VTEFUSU9OO1xuICAgICAgICBnZXRKU09OKG1hcF9kYXRhX3BhdGggKyBnZXREYXRhVmVyc2lvbigpICsgJy9tYXBkYXRhLmpzb24nLCBvbk1hcERhdGFMb2FkKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0VmlzaW9uUmFkaXVzKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSB8fCBFTlRJVElFUy5vYnNlcnZlci5yYWRpdXM7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCJ2YXIgbWFwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9tYXBDb25zdGFudHMnKTtcblxuZnVuY3Rpb24gbGVycChtaW5WYWwsIG1heFZhbCwgcG9zX3IpIHtcbiAgICByZXR1cm4gcG9zX3IgKiAobWF4VmFsIC0gbWluVmFsKSArIG1pblZhbDtcbn1cblxuZnVuY3Rpb24gcmV2ZXJzZUxlcnAobWluVmFsLCBtYXhWYWwsIHBvcykge1xuICAgIHJldHVybiAocG9zIC0gbWluVmFsKSAvIChtYXhWYWwgLSBtaW5WYWwpO1xufVxuXG5mdW5jdGlvbiBsYXRMb25Ub1dvcmxkKHgsIHkpIHtcbiAgICB2YXIgeF9yID0gbGVycChtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0sIHggLyBtYXBDb25zdGFudHMubWFwX3cpLFxuICAgICAgICB5X3IgPSBsZXJwKG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1sxXSwgKG1hcENvbnN0YW50cy5tYXBfaCAtIHkpIC8gbWFwQ29uc3RhbnRzLm1hcF9oKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHhfcixcbiAgICAgICAgeTogeV9yXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gd29ybGRUb0xhdExvbih4X3IsIHlfcikge1xuICAgIHZhciB4ID0gcmV2ZXJzZUxlcnAobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdLCB4X3IpICogbWFwQ29uc3RhbnRzLm1hcF93LFxuICAgICAgICB5ID0gbWFwQ29uc3RhbnRzLm1hcF9oIC0gcmV2ZXJzZUxlcnAobWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzFdLCB5X3IpICogbWFwQ29uc3RhbnRzLm1hcF9oO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldFRpbGVSYWRpdXMocikge1xuICAgIHJldHVybiBwYXJzZUludChNYXRoLmZsb29yKHIgLyA2NCkpO1xufVxuXG5mdW5jdGlvbiBnZXRTY2FsZWRSYWRpdXMocikge1xuICAgIHJldHVybiByIC8gKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdIC0gbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0pICogbWFwQ29uc3RhbnRzLm1hcF93XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZURpc3RhbmNlKG9yZGVyLCB1bml0cywgbWVhc3VyZSkge1xuICAgIGlmIChvcmRlciA9PSAxKSB7XG4gICAgICAgIGlmICh1bml0cyA9PSBcImttXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtZWFzdXJlICogbWFwQ29uc3RhbnRzLnNjYWxlICogMTAwMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtZWFzdXJlICogbWFwQ29uc3RhbnRzLnNjYWxlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsZXJwOiBsZXJwLFxuICAgIHJldmVyc2VMZXJwOiByZXZlcnNlTGVycCxcbiAgICBsYXRMb25Ub1dvcmxkOiBsYXRMb25Ub1dvcmxkLFxuICAgIHdvcmxkVG9MYXRMb246IHdvcmxkVG9MYXRMb24sXG4gICAgZ2V0VGlsZVJhZGl1czogZ2V0VGlsZVJhZGl1cyxcbiAgICBnZXRTY2FsZWRSYWRpdXM6IGdldFNjYWxlZFJhZGl1cyxcbiAgICBjYWxjdWxhdGVEaXN0YW5jZTogY2FsY3VsYXRlRGlzdGFuY2Vcbn0iLCJ2YXIgVmlzaW9uU2ltdWxhdGlvbiA9IHJlcXVpcmUoXCJkb3RhLXZpc2lvbi1zaW11bGF0aW9uXCIpO1xudmFyIGtleTJwdCA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLmtleTJwdDtcbnZhciB4eTJrZXkgPSBWaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJrZXk7XG52YXIgeHkycHQgPSBWaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJwdDtcblxuZnVuY3Rpb24gcHJvY2Vzc05laWdoYm9ycyhncmlkLCBsaWdodHMsIGNvbXBvbmVudHMsIGtleSwgaW5kZXgpIHtcbiAgICB2YXIgcHQgPSBrZXkycHQoa2V5KTtcbiAgICB2YXIgZGlycyA9IFtbMSwgMF0sIFswLCAtMV0sIFstMSwgMF0sIFswLCAxXV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhWCA9IHB0LngrZGlyc1tpXVswXTtcbiAgICAgICAgdmFyIGFZID0gcHQueStkaXJzW2ldWzFdO1xuICAgICAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIGNvbnRpbnVlO1xuICAgICAgICB2YXIga2V5QWRqID0gZ3JpZFthWF1bYVldLmtleVxuICAgICAgICBpZiAoY29tcG9uZW50c1trZXlBZGpdIHx8ICFsaWdodHNba2V5QWRqXSkgY29udGludWU7XG4gICAgICAgIGNvbXBvbmVudHNba2V5QWRqXSA9IGluZGV4O1xuICAgICAgICBwcm9jZXNzTmVpZ2hib3JzKGdyaWQsIGxpZ2h0cywgY29tcG9uZW50cywga2V5QWRqLCBpbmRleCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRMaWdodFVuaW9uKGdyaWQsIGxpZ2h0cykge1xuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgdmFyIGluZGV4ID0gMTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbGlnaHRzKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50c1trZXldKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzW2tleV0gPSBpbmRleDtcbiAgICAgICAgICAgIHByb2Nlc3NOZWlnaGJvcnMoZ3JpZCwgbGlnaHRzLCBjb21wb25lbnRzLCBrZXksIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdmFyIG91dGxpbmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgIG91dGxpbmVzLnB1c2goZ2V0T3V0bGluZShncmlkLCBjb21wb25lbnRzLCBpKSlcbiAgICB9XG4gICAgcmV0dXJuIG91dGxpbmVzO1xufVxuXG5mdW5jdGlvbiBpc1NpZGVGcmVlKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBkaXIpIHtcbiAgICB2YXIgYVggPSBwdC54K2RpclswXTtcbiAgICB2YXIgYVkgPSBwdC55K2RpclsxXTtcbiAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIHJldHVybiB0cnVlO1xuICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgcmV0dXJuICFjb21wb25lbnRzW2tleUFkal07XG59XG5cbmZ1bmN0aW9uIG5vdFN1cnJvdW5kZWQoZ3JpZCwgY29tcG9uZW50cywgcHQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrPTIpIHtcbiAgICAgICAgdmFyIGFYID0gcHQueCtNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgICAgICB2YXIgYVkgPSBwdC55K01hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuIGk7XG4gICAgICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgICAgIGlmICghY29tcG9uZW50c1trZXlBZGpdKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIG1vZChuLCBtKSB7XG4gICAgICAgIHJldHVybiAoKG4gJSBtKSArIG0pICUgbTtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0bGluZShncmlkLCBjb21wb25lbnRzLCBpbmRleCkge1xuICAgIHZhciBvdXRsaW5lUG9pbnRzID0gW107XG4gICAgdmFyIHN0YXJ0S2V5O1xuICAgIHZhciBkaXIgPSBudWxsO1xuICAgIGZvciAodmFyIGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgICAgICBkaXIgPSBub3RTdXJyb3VuZGVkKGdyaWQsIGNvbXBvbmVudHMsIHB0KTtcbiAgICAgICAgaWYgKGNvbXBvbmVudHNba2V5XSA9PSBpbmRleCAmJiBkaXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXJ0S2V5ID0ga2V5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5leHQgPSBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBzdGFydEtleSwgZGlyKTtcbiAgICB3aGlsZSAoc3RhcnRLZXkgIT09IG5leHQua2V5IHx8IGRpciAhPT0gbmV4dC5kaXIpIHtcbiAgICAgICAgb3V0bGluZVBvaW50cy5wdXNoKG5leHQucG9pbnQpO1xuICAgICAgICBuZXh0ID0gcHJvY2Vzc05leHQoZ3JpZCwgY29tcG9uZW50cywgbmV4dC5rZXksIG5leHQuZGlyKTtcbiAgICB9XG4gICAgb3V0bGluZVBvaW50cy5wdXNoKG5leHQucG9pbnQpO1xuICAgIHJldHVybiBvdXRsaW5lUG9pbnRzO1xufVxuXG5mdW5jdGlvbiBjaGVja0FkaihncmlkLCBjb21wb25lbnRzLCBwdCwga2V5LCBkaXIsIGksIGFkakRpcikge1xuICAgIHZhciBhWCA9IHB0LngrZGlyWzBdO1xuICAgIHZhciBhWSA9IHB0LnkrZGlyWzFdO1xuICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuO1xuICAgIHZhciBwdEFkaiA9IGdyaWRbcHQueCtkaXJbMF1dW3B0LnkrZGlyWzFdXTtcbiAgICBpZiAoY29tcG9uZW50c1twdEFkai5rZXldID09IGNvbXBvbmVudHNba2V5XSAmJiBpc1NpZGVGcmVlKGdyaWQsIGNvbXBvbmVudHMsIHB0QWRqLCBhZGpEaXIpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IHB0QWRqLmtleSxcbiAgICAgICAgICAgIGRpcjogaVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBrZXksIGkpIHtcbiAgICB2YXIgcHQgPSBrZXkycHQoa2V5KTtcbiAgICB2YXIgbmV4dDtcbiAgICBcbiAgICB2YXIgeCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgdmFyIHkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgIFxuICAgIHZhciBuSSA9IG1vZChpKzIsIDgpO1xuICAgIHZhciBuWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBuSSkpO1xuICAgIHZhciBuWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBuSSkpO1xuICAgIFxuICAgIHZhciBiSSA9IG1vZChpLTEsIDgpO1xuICAgIHZhciBiWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBiSSkpO1xuICAgIHZhciBiWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBiSSkpO1xuXG4gICAgaWYgKGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHQsIFtuWCwgblldKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBkaXI6IG1vZChpKzIsIDgpLFxuICAgICAgICAgICAgcG9pbnQ6IHh5MnB0KHB0LngrYlgvMiwgcHQueStiWS8yKVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghbmV4dCkgbmV4dCA9IGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIFtuWCwgblldLCBpLCBbeCwgeV0pO1xuICAgIGlmICghbmV4dCkge1xuICAgICAgICB2YXIgYUkgPSBtb2QoaSArIDEsIDgpO1xuICAgICAgICB2YXIgYVggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYUkpKTtcbiAgICAgICAgdmFyIGFZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGFJKSk7XG4gICAgICAgIHZhciBwSSA9IG1vZChpIC0gMiwgOCk7XG4gICAgICAgIHZhciBwWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBwSSkpO1xuICAgICAgICB2YXIgcFkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogcEkpKTtcbiAgICAgICAgbmV4dCA9IGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIFthWCwgYVldLCBwSSwgW3BYLCBwWV0pO1xuICAgIH1cbiAgICBpZiAobmV4dCkge1xuICAgICAgICBuZXh0LnBvaW50ID0geHkycHQocHQueCtiWC8yLCBwdC55K2JZLzIpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMaWdodFVuaW9uOyIsInZhciBtYXBDb25zdGFudHMgPSB7XG4gICAgbWFwX3c6IDE2Mzg0LFxuICAgIG1hcF9oOiAxNjM4NCxcbiAgICBtYXBfeF9ib3VuZGFyaWVzOiBbLTg0NzUuNTg2MTczNzcsIDkzMjcuNDkxMjQ1NTldLFxuICAgIG1hcF95X2JvdW5kYXJpZXM6IFs5MDI4LjUyNDczMzMyLCAtODgzNi42MTQwNjI2Nl1cbn1cbm1hcENvbnN0YW50cy5zY2FsZSA9IE1hdGguYWJzKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdIC0gbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0pIC8gbWFwQ29uc3RhbnRzLm1hcF93O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENvbnN0YW50czsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsaWdodGJsdWU6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfSxcbiAgICBkYXk6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI2VlOTkwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNlZTk5MDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgbmlnaHQ6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwMDA4MFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgdHJ1ZV9zaWdodDoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDA3RkZGXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDIsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC4xXG4gICAgfSxcbiAgICByZWQ6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfSxcbiAgICBhdHRhY2tfcmFuZ2U6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAyLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuMVxuICAgIH0sXG4gICAgZ3JlZW46IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwRkYwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMEZGMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfSxcbiAgICB5ZWxsb3c6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGRkYwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRkZGMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC4yXG4gICAgfVxufTsiLCJmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIHdhaXQpO1xuICAgICAgICBpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlOyIsImZ1bmN0aW9uIGdldEpTT04ocGF0aCwgY2FsbGJhY2spIHtcbiAgICBjb25zb2xlLmxvZygnZ2V0SlNPTicsIHBhdGgpO1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBsb2FkaW5nIHBhZ2UuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydCgnRXJyb3IgbG9hZGluZyBwYWdlLicpO1xuICAgIH07XG4gICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0SlNPTjsiLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJy4vdHJpbScpO1xuXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJCeU5hbWUobmFtZSkge1xuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcW1wiKS5yZXBsYWNlKC9bXFxdXS8sIFwiXFxcXF1cIik7XG4gICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIiksXG4gICAgICAgIHJlc3VsdHMgPSByZWdleC5leGVjKGxvY2F0aW9uLnNlYXJjaCk7XG4gICAgcmV0dXJuIHJlc3VsdHMgPT0gbnVsbCA/IFwiXCIgOiBkZWNvZGVVUklDb21wb25lbnQocmVzdWx0c1sxXS5yZXBsYWNlKC9cXCsvZywgXCIgXCIpKTtcbn1cblxuZnVuY3Rpb24gc2V0UXVlcnlTdHJpbmcoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHZhbHVlKSk7XG59XG5cbmZ1bmN0aW9uIGFkZFF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdhZGRRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpICsgJzsnICsgdmFsdWUsICcgOycpO1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHFzKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdyZW1vdmVRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpLnJlcGxhY2UodmFsdWUsICcnKS5yZXBsYWNlKC87Oy9nLCAnJyksICcgOycpO1xuICAgIGlmIChoaXN0b3J5ICYmIGhpc3RvcnkucmVwbGFjZVN0YXRlKSBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHFzICE9ICcnID8gcXMgOiBudWxsKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgdmFsdWUsIHVybCkge1xuICAgIGlmICghdXJsKSB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKFwiKFs/Jl0pXCIgKyBrZXkgKyBcIj0uKj8oJnwjfCQpKC4qKVwiLCBcImdpXCIpLFxuICAgICAgICBoYXNoO1xuXG4gICAgaWYgKHJlLnRlc3QodXJsKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiB1cmwucmVwbGFjZShyZSwgJyQxJyArIGtleSArIFwiPVwiICsgdmFsdWUgKyAnJDIkMycpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGhhc2ggPSB1cmwuc3BsaXQoJyMnKTtcbiAgICAgICAgICAgIHVybCA9IGhhc2hbMF0ucmVwbGFjZShyZSwgJyQxJDMnKS5yZXBsYWNlKC8oJnxcXD8pJC8sICcnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFzaFsxXSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzaFsxXSAhPT0gbnVsbClcbiAgICAgICAgICAgICAgICB1cmwgKz0gJyMnICsgaGFzaFsxXTtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIHNlcGFyYXRvciA9IHVybC5pbmRleE9mKCc/JykgIT09IC0xID8gJyYnIDogJz8nO1xuICAgICAgICAgICAgaGFzaCA9IHVybC5zcGxpdCgnIycpO1xuICAgICAgICAgICAgdXJsID0gaGFzaFswXSArIHNlcGFyYXRvciArIGtleSArICc9JyArIHZhbHVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoWzFdICE9PSAndW5kZWZpbmVkJyAmJiBoYXNoWzFdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHVybCArPSAnIycgKyBoYXNoWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB1cmw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldFBhcmFtZXRlckJ5TmFtZTogZ2V0UGFyYW1ldGVyQnlOYW1lLFxuICAgIHNldFF1ZXJ5U3RyaW5nOiBzZXRRdWVyeVN0cmluZyxcbiAgICBhZGRRdWVyeVN0cmluZ1ZhbHVlOiBhZGRRdWVyeVN0cmluZ1ZhbHVlLFxuICAgIHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWU6IHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUsXG4gICAgdXBkYXRlUXVlcnlTdHJpbmc6IHVwZGF0ZVF1ZXJ5U3RyaW5nXG59IiwiZnVuY3Rpb24gZXNjYXBlUmVnZXgoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC9bXFxbXFxdKCl7fT8qK1xcXiRcXFxcLnxcXC1dL2csIFwiXFxcXCQmXCIpO1xufVxuXG52YXIgdHJpbSA9IGZ1bmN0aW9uIHRyaW0oc3RyLCBjaGFyYWN0ZXJzLCBmbGFncykge1xuICAgIGZsYWdzID0gZmxhZ3MgfHwgXCJnXCI7XG4gICAgaWYgKHR5cGVvZiBzdHIgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGNoYXJhY3RlcnMgIT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGZsYWdzICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhcmd1bWVudCBtdXN0IGJlIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBpZiAoIS9eW2dpXSokLy50ZXN0KGZsYWdzKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBmbGFncyBzdXBwbGllZCAnXCIgKyBmbGFncy5tYXRjaChuZXcgUmVnRXhwKFwiW15naV0qXCIpKSArIFwiJ1wiKTtcbiAgICB9XG5cbiAgICBjaGFyYWN0ZXJzID0gZXNjYXBlUmVnZXgoY2hhcmFjdGVycyk7XG5cbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChcIl5bXCIgKyBjaGFyYWN0ZXJzICsgXCJdK3xbXCIgKyBjaGFyYWN0ZXJzICsgXCJdKyRcIiwgZmxhZ3MpLCAnJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRyaW07IiwidmFyIFBORyA9IHJlcXVpcmUoJ3BuZy1qcycpO1xuXG5mdW5jdGlvbiBJbWFnZUhhbmRsZXIoaW1hZ2VQYXRoKSB7XG4gICAgdGhpcy5pbWFnZVBhdGggPSBpbWFnZVBhdGg7XG4gICAgc2VsZi5jYW52YXMgPSBudWxsO1xuICAgIHNlbGYucG5nID0gbnVsbDtcbn1cbkltYWdlSGFuZGxlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHNlbGYuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBQTkcubG9hZCh0aGlzLmltYWdlUGF0aCwgc2VsZi5jYW52YXMsIGZ1bmN0aW9uKHBuZykge1xuICAgICAgICBzZWxmLnBuZyA9IHBuZztcbiAgICAgICAgc2VsZi5jdHggPSBzZWxmLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG59XG5JbWFnZUhhbmRsZXIucHJvdG90eXBlLnNjYW4gPSBmdW5jdGlvbiAob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIsIGdyaWQpIHtcbiAgICB2YXIgaW1nRGF0YSA9IHRoaXMuY3R4LmdldEltYWdlRGF0YShvZmZzZXQsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIHZhciBkYXRhID0gaW1nRGF0YS5kYXRhO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIHZhciByID0gZGF0YVtpXTtcbiAgICAgICAgdmFyIGcgPSBkYXRhW2krMV07XG4gICAgICAgIHZhciBiID0gZGF0YVtpKzJdO1xuICAgICAgICB2YXIgYWxwaGEgPSBkYXRhW2krM107XG4gICAgICAgIHZhciB4ID0gTWF0aC5mbG9vcigoaS80KSAlIHdpZHRoKTtcbiAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKChpLzQpIC8gaGVpZ2h0KTtcbiAgICAgICAgcGl4ZWxIYW5kbGVyKHgsIHksIFtyLCBnLCBiXSwgZ3JpZCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEltYWdlSGFuZGxlcjsiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNC4wXG5cbi8qXG4jIE1JVCBMSUNFTlNFXG4jIENvcHlyaWdodCAoYykgMjAxMSBEZXZvbiBHb3ZldHRcbiMgXG4jIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBcbiMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIFxuIyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBcbiMgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIFxuIyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuIyBcbiMgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBcbiMgc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuIyBcbiMgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgXG4jIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBcbiMgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgXG4jIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgXG4jIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuKi9cblxudmFyIEZsYXRlU3RyZWFtID0gcmVxdWlyZSgnLi96bGliJyk7XG5cbiAgdmFyIFBORztcblxuICBQTkcgPSAoZnVuY3Rpb24oKSB7XG4gICAgUE5HLmxvYWQgPSBmdW5jdGlvbih1cmwsIGNhbnZhcywgY2FsbGJhY2spIHtcbiAgICAgIHZhciB4aHIsXG4gICAgICAgIF90aGlzID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2YgY2FudmFzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY2FudmFzO1xuICAgICAgfVxuICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0O1xuICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhLCBwbmc7XG4gICAgICAgIGRhdGEgPSBuZXcgVWludDhBcnJheSh4aHIucmVzcG9uc2UgfHwgeGhyLm1velJlc3BvbnNlQXJyYXlCdWZmZXIpO1xuICAgICAgICBwbmcgPSBuZXcgUE5HKGRhdGEpO1xuICAgICAgICBpZiAodHlwZW9mIChjYW52YXMgIT0gbnVsbCA/IGNhbnZhcy5nZXRDb250ZXh0IDogdm9pZCAwKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHBuZy5yZW5kZXIoY2FudmFzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZW9mIGNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgPyBjYWxsYmFjayhwbmcpIDogdm9pZCAwO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB4aHIuc2VuZChudWxsKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gUE5HKGRhdGEpIHtcbiAgICAgIHZhciBjaHVua1NpemUsIGNvbG9ycywgZGVsYXlEZW4sIGRlbGF5TnVtLCBmcmFtZSwgaSwgaW5kZXgsIGtleSwgc2VjdGlvbiwgc2hvcnQsIHRleHQsIF9pLCBfaiwgX3JlZjtcbiAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLnBvcyA9IDg7XG4gICAgICB0aGlzLnBhbGV0dGUgPSBbXTtcbiAgICAgIHRoaXMuaW1nRGF0YSA9IFtdO1xuICAgICAgdGhpcy50cmFuc3BhcmVuY3kgPSB7fTtcbiAgICAgIHRoaXMudGV4dCA9IHt9O1xuICAgICAgZnJhbWUgPSBudWxsO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY2h1bmtTaXplID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgIHNlY3Rpb24gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBfaSwgX3Jlc3VsdHM7XG4gICAgICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgICAgICBmb3IgKGkgPSBfaSA9IDA7IF9pIDwgNDsgaSA9ICsrX2kpIHtcbiAgICAgICAgICAgIF9yZXN1bHRzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmRhdGFbdGhpcy5wb3MrK10pKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIF9yZXN1bHRzO1xuICAgICAgICB9KS5jYWxsKHRoaXMpKS5qb2luKCcnKTtcbiAgICAgICAgc3dpdGNoIChzZWN0aW9uKSB7XG4gICAgICAgICAgY2FzZSAnSUhEUic6XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMucmVhZFVJbnQzMigpO1xuICAgICAgICAgICAgdGhpcy5iaXRzID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5jb2xvclR5cGUgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmNvbXByZXNzaW9uTWV0aG9kID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJNZXRob2QgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmludGVybGFjZU1ldGhvZCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ1BMVEUnOlxuICAgICAgICAgICAgdGhpcy5wYWxldHRlID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdJREFUJzpcbiAgICAgICAgICAgIGlmIChzZWN0aW9uID09PSAnZmRBVCcpIHtcbiAgICAgICAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgICAgICAgY2h1bmtTaXplIC09IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhID0gKGZyYW1lICE9IG51bGwgPyBmcmFtZS5kYXRhIDogdm9pZCAwKSB8fCB0aGlzLmltZ0RhdGE7XG4gICAgICAgICAgICBmb3IgKGkgPSBfaSA9IDA7IDAgPD0gY2h1bmtTaXplID8gX2kgPCBjaHVua1NpemUgOiBfaSA+IGNodW5rU2l6ZTsgaSA9IDAgPD0gY2h1bmtTaXplID8gKytfaSA6IC0tX2kpIHtcbiAgICAgICAgICAgICAgZGF0YS5wdXNoKHRoaXMuZGF0YVt0aGlzLnBvcysrXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0Uk5TJzpcbiAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5ID0ge307XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29sb3JUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICAgICAgc2hvcnQgPSAyNTUgLSB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAoc2hvcnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICBmb3IgKGkgPSBfaiA9IDA7IDAgPD0gc2hvcnQgPyBfaiA8IHNob3J0IDogX2ogPiBzaG9ydDsgaSA9IDAgPD0gc2hvcnQgPyArK19qIDogLS1faikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkLnB1c2goMjU1KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcGFyZW5jeS5ncmF5c2NhbGUgPSB0aGlzLnJlYWQoY2h1bmtTaXplKVswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LnJnYiA9IHRoaXMucmVhZChjaHVua1NpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAndEVYdCc6XG4gICAgICAgICAgICB0ZXh0ID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICBpbmRleCA9IHRleHQuaW5kZXhPZigwKTtcbiAgICAgICAgICAgIGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCB0ZXh0LnNsaWNlKDAsIGluZGV4KSk7XG4gICAgICAgICAgICB0aGlzLnRleHRba2V5XSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCB0ZXh0LnNsaWNlKGluZGV4ICsgMSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnSUVORCc6XG4gICAgICAgICAgICBpZiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb24uZnJhbWVzLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb2xvcnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuaGFzQWxwaGFDaGFubmVsID0gKF9yZWYgPSB0aGlzLmNvbG9yVHlwZSkgPT09IDQgfHwgX3JlZiA9PT0gNjtcbiAgICAgICAgICAgIGNvbG9ycyA9IHRoaXMuY29sb3JzICsgKHRoaXMuaGFzQWxwaGFDaGFubmVsID8gMSA6IDApO1xuICAgICAgICAgICAgdGhpcy5waXhlbEJpdGxlbmd0aCA9IHRoaXMuYml0cyAqIGNvbG9ycztcbiAgICAgICAgICAgIHRoaXMuY29sb3JTcGFjZSA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbG9ycykge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAnRGV2aWNlR3JheSc7XG4gICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdEZXZpY2VSR0InO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pbWdEYXRhID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5pbWdEYXRhKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhpcy5wb3MgKz0gY2h1bmtTaXplO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zICs9IDQ7XG4gICAgICAgIGlmICh0aGlzLnBvcyA+IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbmNvbXBsZXRlIG9yIGNvcnJ1cHQgUE5HIGZpbGVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBQTkcucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbihieXRlcykge1xuICAgICAgdmFyIGksIF9pLCBfcmVzdWx0cztcbiAgICAgIF9yZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSBfaSA9IDA7IDAgPD0gYnl0ZXMgPyBfaSA8IGJ5dGVzIDogX2kgPiBieXRlczsgaSA9IDAgPD0gYnl0ZXMgPyArK19pIDogLS1faSkge1xuICAgICAgICBfcmVzdWx0cy5wdXNoKHRoaXMuZGF0YVt0aGlzLnBvcysrXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUucmVhZFVJbnQzMiA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGIxLCBiMiwgYjMsIGI0O1xuICAgICAgYjEgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgMjQ7XG4gICAgICBiMiA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCAxNjtcbiAgICAgIGIzID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDg7XG4gICAgICBiNCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgIHJldHVybiBiMSB8IGIyIHwgYjMgfCBiNDtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZWFkVUludDE2ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjEsIGIyO1xuICAgICAgYjEgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgODtcbiAgICAgIGIyID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgcmV0dXJuIGIxIHwgYjI7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlUGl4ZWxzID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIGJ5dGUsIGMsIGNvbCwgaSwgbGVmdCwgbGVuZ3RoLCBwLCBwYSwgcGFldGgsIHBiLCBwYywgcGl4ZWxCeXRlcywgcGl4ZWxzLCBwb3MsIHJvdywgc2NhbmxpbmVMZW5ndGgsIHVwcGVyLCB1cHBlckxlZnQsIF9pLCBfaiwgX2ssIF9sLCBfbTtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgZGF0YSA9IHRoaXMuaW1nRGF0YTtcbiAgICAgIH1cbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgICB9XG4gICAgICBkYXRhID0gbmV3IEZsYXRlU3RyZWFtKGRhdGEpO1xuICAgICAgZGF0YSA9IGRhdGEuZ2V0Qnl0ZXMoKTtcbiAgICAgIHBpeGVsQnl0ZXMgPSB0aGlzLnBpeGVsQml0bGVuZ3RoIC8gODtcbiAgICAgIHNjYW5saW5lTGVuZ3RoID0gcGl4ZWxCeXRlcyAqIHRoaXMud2lkdGg7XG4gICAgICBwaXhlbHMgPSBuZXcgVWludDhBcnJheShzY2FubGluZUxlbmd0aCAqIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgcm93ID0gMDtcbiAgICAgIHBvcyA9IDA7XG4gICAgICBjID0gMDtcbiAgICAgIHdoaWxlIChwb3MgPCBsZW5ndGgpIHtcbiAgICAgICAgc3dpdGNoIChkYXRhW3BvcysrXSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgX2kgPCBzY2FubGluZUxlbmd0aDsgaSA9IF9pICs9IDEpIHtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGZvciAoaSA9IF9qID0gMDsgX2ogPCBzY2FubGluZUxlbmd0aDsgaSA9IF9qICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBsZWZ0ID0gaSA8IHBpeGVsQnl0ZXMgPyAwIDogcGl4ZWxzW2MgLSBwaXhlbEJ5dGVzXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIGxlZnQpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZm9yIChpID0gX2sgPSAwOyBfayA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2sgKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGNvbCA9IChpIC0gKGkgJSBwaXhlbEJ5dGVzKSkgLyBwaXhlbEJ5dGVzO1xuICAgICAgICAgICAgICB1cHBlciA9IHJvdyAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyBjb2wgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKHVwcGVyICsgYnl0ZSkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBmb3IgKGkgPSBfbCA9IDA7IF9sIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfbCArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICB1cHBlciA9IHJvdyAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyBjb2wgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIHBpeGVsc1tjKytdID0gKGJ5dGUgKyBNYXRoLmZsb29yKChsZWZ0ICsgdXBwZXIpIC8gMikpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgZm9yIChpID0gX20gPSAwOyBfbSA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX20gKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGNvbCA9IChpIC0gKGkgJSBwaXhlbEJ5dGVzKSkgLyBwaXhlbEJ5dGVzO1xuICAgICAgICAgICAgICBsZWZ0ID0gaSA8IHBpeGVsQnl0ZXMgPyAwIDogcGl4ZWxzW2MgLSBwaXhlbEJ5dGVzXTtcbiAgICAgICAgICAgICAgaWYgKHJvdyA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHVwcGVyID0gdXBwZXJMZWZ0ID0gMDtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cHBlciA9IHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgICB1cHBlckxlZnQgPSBjb2wgJiYgcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgKGNvbCAtIDEpICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHAgPSBsZWZ0ICsgdXBwZXIgLSB1cHBlckxlZnQ7XG4gICAgICAgICAgICAgIHBhID0gTWF0aC5hYnMocCAtIGxlZnQpO1xuICAgICAgICAgICAgICBwYiA9IE1hdGguYWJzKHAgLSB1cHBlcik7XG4gICAgICAgICAgICAgIHBjID0gTWF0aC5hYnMocCAtIHVwcGVyTGVmdCk7XG4gICAgICAgICAgICAgIGlmIChwYSA8PSBwYiAmJiBwYSA8PSBwYykge1xuICAgICAgICAgICAgICAgIHBhZXRoID0gbGVmdDtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYiA8PSBwYykge1xuICAgICAgICAgICAgICAgIHBhZXRoID0gdXBwZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSB1cHBlckxlZnQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIHBhZXRoKSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZpbHRlciBhbGdvcml0aG06IFwiICsgZGF0YVtwb3MgLSAxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcm93Kys7XG4gICAgICB9XG4gICAgICByZXR1cm4gcGl4ZWxzO1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmRlY29kZVBhbGV0dGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjLCBpLCBsZW5ndGgsIHBhbGV0dGUsIHBvcywgcmV0LCB0cmFuc3BhcmVuY3ksIF9pLCBfcmVmLCBfcmVmMTtcbiAgICAgIHBhbGV0dGUgPSB0aGlzLnBhbGV0dGU7XG4gICAgICB0cmFuc3BhcmVuY3kgPSB0aGlzLnRyYW5zcGFyZW5jeS5pbmRleGVkIHx8IFtdO1xuICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkoKHRyYW5zcGFyZW5jeS5sZW5ndGggfHwgMCkgKyBwYWxldHRlLmxlbmd0aCk7XG4gICAgICBwb3MgPSAwO1xuICAgICAgbGVuZ3RoID0gcGFsZXR0ZS5sZW5ndGg7XG4gICAgICBjID0gMDtcbiAgICAgIGZvciAoaSA9IF9pID0gMCwgX3JlZiA9IHBhbGV0dGUubGVuZ3RoOyBfaSA8IF9yZWY7IGkgPSBfaSArPSAzKSB7XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2ldO1xuICAgICAgICByZXRbcG9zKytdID0gcGFsZXR0ZVtpICsgMV07XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2kgKyAyXTtcbiAgICAgICAgcmV0W3BvcysrXSA9IChfcmVmMSA9IHRyYW5zcGFyZW5jeVtjKytdKSAhPSBudWxsID8gX3JlZjEgOiAyNTU7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLmNvcHlUb0ltYWdlRGF0YSA9IGZ1bmN0aW9uKGltYWdlRGF0YSwgcGl4ZWxzKSB7XG4gICAgICB2YXIgYWxwaGEsIGNvbG9ycywgZGF0YSwgaSwgaW5wdXQsIGosIGssIGxlbmd0aCwgcGFsZXR0ZSwgdiwgX3JlZjtcbiAgICAgIGNvbG9ycyA9IHRoaXMuY29sb3JzO1xuICAgICAgcGFsZXR0ZSA9IG51bGw7XG4gICAgICBhbHBoYSA9IHRoaXMuaGFzQWxwaGFDaGFubmVsO1xuICAgICAgaWYgKHRoaXMucGFsZXR0ZS5sZW5ndGgpIHtcbiAgICAgICAgcGFsZXR0ZSA9IChfcmVmID0gdGhpcy5fZGVjb2RlZFBhbGV0dGUpICE9IG51bGwgPyBfcmVmIDogdGhpcy5fZGVjb2RlZFBhbGV0dGUgPSB0aGlzLmRlY29kZVBhbGV0dGUoKTtcbiAgICAgICAgY29sb3JzID0gNDtcbiAgICAgICAgYWxwaGEgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZGF0YSA9IGltYWdlRGF0YS5kYXRhIHx8IGltYWdlRGF0YTtcbiAgICAgIGxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgaW5wdXQgPSBwYWxldHRlIHx8IHBpeGVscztcbiAgICAgIGkgPSBqID0gMDtcbiAgICAgIGlmIChjb2xvcnMgPT09IDEpIHtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICBrID0gcGFsZXR0ZSA/IHBpeGVsc1tpIC8gNF0gKiA0IDogajtcbiAgICAgICAgICB2ID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSB2O1xuICAgICAgICAgIGRhdGFbaSsrXSA9IHY7XG4gICAgICAgICAgZGF0YVtpKytdID0gdjtcbiAgICAgICAgICBkYXRhW2krK10gPSBhbHBoYSA/IGlucHV0W2srK10gOiAyNTU7XG4gICAgICAgICAgaiA9IGs7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChpIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgayA9IHBhbGV0dGUgPyBwaXhlbHNbaSAvIDRdICogNCA6IGo7XG4gICAgICAgICAgZGF0YVtpKytdID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gYWxwaGEgPyBpbnB1dFtrKytdIDogMjU1O1xuICAgICAgICAgIGogPSBrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmV0O1xuICAgICAgcmV0ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy53aWR0aCAqIHRoaXMuaGVpZ2h0ICogNCk7XG4gICAgICB0aGlzLmNvcHlUb0ltYWdlRGF0YShyZXQsIHRoaXMuZGVjb2RlUGl4ZWxzKCkpO1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbihjYW52YXMpIHtcbiAgICAgIHZhciBjdHgsIGRhdGE7XG4gICAgICBjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGRhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuY29weVRvSW1hZ2VEYXRhKGRhdGEsIHRoaXMuZGVjb2RlUGl4ZWxzKCkpO1xuICAgICAgcmV0dXJuIGN0eC5wdXRJbWFnZURhdGEoZGF0YSwgMCwgMCk7XG4gICAgfTtcblxuICAgIHJldHVybiBQTkc7XG5cbiAgfSkoKTtcblxuICBtb2R1bGUuZXhwb3J0cyA9IFBORzsiLCIvKlxuICogRXh0cmFjdGVkIGZyb20gcGRmLmpzXG4gKiBodHRwczovL2dpdGh1Yi5jb20vYW5kcmVhc2dhbC9wZGYuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEgTW96aWxsYSBGb3VuZGF0aW9uXG4gKlxuICogQ29udHJpYnV0b3JzOiBBbmRyZWFzIEdhbCA8Z2FsQG1vemlsbGEuY29tPlxuICogICAgICAgICAgICAgICBDaHJpcyBHIEpvbmVzIDxjam9uZXNAbW96aWxsYS5jb20+XG4gKiAgICAgICAgICAgICAgIFNoYW9uIEJhcm1hbiA8c2hhb24uYmFybWFuQGdtYWlsLmNvbT5cbiAqICAgICAgICAgICAgICAgVml2aWVuIE5pY29sYXMgPDIxQHZpbmd0ZXR1bi5vcmc+XG4gKiAgICAgICAgICAgICAgIEp1c3RpbiBEJ0FyY2FuZ2VsbyA8anVzdGluZGFyY0BnbWFpbC5jb20+XG4gKiAgICAgICAgICAgICAgIFl1cnkgRGVsZW5kaWtcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuICogY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLFxuICogdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvblxuICogdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsXG4gKiBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGVcbiAqIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTExcbiAqIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUlxuICogREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbnZhciBEZWNvZGVTdHJlYW0gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucG9zID0gMDtcbiAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IDA7XG4gICAgdGhpcy5lb2YgPSBmYWxzZTtcbiAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSB7XG4gICAgZW5zdXJlQnVmZmVyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZW5zdXJlQnVmZmVyKHJlcXVlc3RlZCkge1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgICAgdmFyIGN1cnJlbnQgPSBidWZmZXIgPyBidWZmZXIuYnl0ZUxlbmd0aCA6IDA7XG4gICAgICBpZiAocmVxdWVzdGVkIDwgY3VycmVudClcbiAgICAgICAgcmV0dXJuIGJ1ZmZlcjtcbiAgICAgIHZhciBzaXplID0gNTEyO1xuICAgICAgd2hpbGUgKHNpemUgPCByZXF1ZXN0ZWQpXG4gICAgICAgIHNpemUgPDw9IDE7XG4gICAgICB2YXIgYnVmZmVyMiA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50OyArK2kpXG4gICAgICAgIGJ1ZmZlcjJbaV0gPSBidWZmZXJbaV07XG4gICAgICByZXR1cm4gdGhpcy5idWZmZXIgPSBidWZmZXIyO1xuICAgIH0sXG4gICAgZ2V0Qnl0ZTogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX2dldEJ5dGUoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLmVvZilcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJ1ZmZlclt0aGlzLnBvcysrXTtcbiAgICB9LFxuICAgIGdldEJ5dGVzOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Qnl0ZXMobGVuZ3RoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG5cbiAgICAgIGlmIChsZW5ndGgpIHtcbiAgICAgICAgdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgbGVuZ3RoKTtcbiAgICAgICAgdmFyIGVuZCA9IHBvcyArIGxlbmd0aDtcblxuICAgICAgICB3aGlsZSAoIXRoaXMuZW9mICYmIHRoaXMuYnVmZmVyTGVuZ3RoIDwgZW5kKVxuICAgICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG5cbiAgICAgICAgdmFyIGJ1ZkVuZCA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgICBpZiAoZW5kID4gYnVmRW5kKVxuICAgICAgICAgIGVuZCA9IGJ1ZkVuZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICghdGhpcy5lb2YpXG4gICAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcblxuICAgICAgICB2YXIgZW5kID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucG9zID0gZW5kO1xuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyLnN1YmFycmF5KHBvcywgZW5kKTtcbiAgICB9LFxuICAgIGxvb2tDaGFyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fbG9va0NoYXIoKSB7XG4gICAgICB2YXIgcG9zID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gcG9zKSB7XG4gICAgICAgIGlmICh0aGlzLmVvZilcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuYnVmZmVyW3RoaXMucG9zXSk7XG4gICAgfSxcbiAgICBnZXRDaGFyOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Q2hhcigpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5idWZmZXJbdGhpcy5wb3MrK10pO1xuICAgIH0sXG4gICAgbWFrZVN1YlN0cmVhbTogZnVuY3Rpb24gZGVjb2Rlc3RyZWFtX21ha2VTdWJzdHJlYW0oc3RhcnQsIGxlbmd0aCwgZGljdCkge1xuICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IGVuZCAmJiAhdGhpcy5lb2YpXG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICByZXR1cm4gbmV3IFN0cmVhbSh0aGlzLmJ1ZmZlciwgc3RhcnQsIGxlbmd0aCwgZGljdCk7XG4gICAgfSxcbiAgICBza2lwOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fc2tpcChuKSB7XG4gICAgICBpZiAoIW4pXG4gICAgICAgIG4gPSAxO1xuICAgICAgdGhpcy5wb3MgKz0gbjtcbiAgICB9LFxuICAgIHJlc2V0OiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fcmVzZXQoKSB7XG4gICAgICB0aGlzLnBvcyA9IDA7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBjb25zdHJ1Y3Rvcjtcbn0pKCk7XG5cbnZhciBGbGF0ZVN0cmVhbSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIGNvZGVMZW5Db2RlTWFwID0gbmV3IFVpbnQzMkFycmF5KFtcbiAgICAxNiwgMTcsIDE4LCAwLCA4LCA3LCA5LCA2LCAxMCwgNSwgMTEsIDQsIDEyLCAzLCAxMywgMiwgMTQsIDEsIDE1XG4gIF0pO1xuXG4gIHZhciBsZW5ndGhEZWNvZGUgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4MDAwMDMsIDB4MDAwMDQsIDB4MDAwMDUsIDB4MDAwMDYsIDB4MDAwMDcsIDB4MDAwMDgsIDB4MDAwMDksIDB4MDAwMGEsXG4gICAgMHgxMDAwYiwgMHgxMDAwZCwgMHgxMDAwZiwgMHgxMDAxMSwgMHgyMDAxMywgMHgyMDAxNywgMHgyMDAxYiwgMHgyMDAxZixcbiAgICAweDMwMDIzLCAweDMwMDJiLCAweDMwMDMzLCAweDMwMDNiLCAweDQwMDQzLCAweDQwMDUzLCAweDQwMDYzLCAweDQwMDczLFxuICAgIDB4NTAwODMsIDB4NTAwYTMsIDB4NTAwYzMsIDB4NTAwZTMsIDB4MDAxMDIsIDB4MDAxMDIsIDB4MDAxMDJcbiAgXSk7XG5cbiAgdmFyIGRpc3REZWNvZGUgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4MDAwMDEsIDB4MDAwMDIsIDB4MDAwMDMsIDB4MDAwMDQsIDB4MTAwMDUsIDB4MTAwMDcsIDB4MjAwMDksIDB4MjAwMGQsXG4gICAgMHgzMDAxMSwgMHgzMDAxOSwgMHg0MDAyMSwgMHg0MDAzMSwgMHg1MDA0MSwgMHg1MDA2MSwgMHg2MDA4MSwgMHg2MDBjMSxcbiAgICAweDcwMTAxLCAweDcwMTgxLCAweDgwMjAxLCAweDgwMzAxLCAweDkwNDAxLCAweDkwNjAxLCAweGEwODAxLCAweGEwYzAxLFxuICAgIDB4YjEwMDEsIDB4YjE4MDEsIDB4YzIwMDEsIDB4YzMwMDEsIDB4ZDQwMDEsIDB4ZDYwMDFcbiAgXSk7XG5cbiAgdmFyIGZpeGVkTGl0Q29kZVRhYiA9IFtuZXcgVWludDMyQXJyYXkoW1xuICAgIDB4NzAxMDAsIDB4ODAwNTAsIDB4ODAwMTAsIDB4ODAxMTgsIDB4NzAxMTAsIDB4ODAwNzAsIDB4ODAwMzAsIDB4OTAwYzAsXG4gICAgMHg3MDEwOCwgMHg4MDA2MCwgMHg4MDAyMCwgMHg5MDBhMCwgMHg4MDAwMCwgMHg4MDA4MCwgMHg4MDA0MCwgMHg5MDBlMCxcbiAgICAweDcwMTA0LCAweDgwMDU4LCAweDgwMDE4LCAweDkwMDkwLCAweDcwMTE0LCAweDgwMDc4LCAweDgwMDM4LCAweDkwMGQwLFxuICAgIDB4NzAxMGMsIDB4ODAwNjgsIDB4ODAwMjgsIDB4OTAwYjAsIDB4ODAwMDgsIDB4ODAwODgsIDB4ODAwNDgsIDB4OTAwZjAsXG4gICAgMHg3MDEwMiwgMHg4MDA1NCwgMHg4MDAxNCwgMHg4MDExYywgMHg3MDExMiwgMHg4MDA3NCwgMHg4MDAzNCwgMHg5MDBjOCxcbiAgICAweDcwMTBhLCAweDgwMDY0LCAweDgwMDI0LCAweDkwMGE4LCAweDgwMDA0LCAweDgwMDg0LCAweDgwMDQ0LCAweDkwMGU4LFxuICAgIDB4NzAxMDYsIDB4ODAwNWMsIDB4ODAwMWMsIDB4OTAwOTgsIDB4NzAxMTYsIDB4ODAwN2MsIDB4ODAwM2MsIDB4OTAwZDgsXG4gICAgMHg3MDEwZSwgMHg4MDA2YywgMHg4MDAyYywgMHg5MDBiOCwgMHg4MDAwYywgMHg4MDA4YywgMHg4MDA0YywgMHg5MDBmOCxcbiAgICAweDcwMTAxLCAweDgwMDUyLCAweDgwMDEyLCAweDgwMTFhLCAweDcwMTExLCAweDgwMDcyLCAweDgwMDMyLCAweDkwMGM0LFxuICAgIDB4NzAxMDksIDB4ODAwNjIsIDB4ODAwMjIsIDB4OTAwYTQsIDB4ODAwMDIsIDB4ODAwODIsIDB4ODAwNDIsIDB4OTAwZTQsXG4gICAgMHg3MDEwNSwgMHg4MDA1YSwgMHg4MDAxYSwgMHg5MDA5NCwgMHg3MDExNSwgMHg4MDA3YSwgMHg4MDAzYSwgMHg5MDBkNCxcbiAgICAweDcwMTBkLCAweDgwMDZhLCAweDgwMDJhLCAweDkwMGI0LCAweDgwMDBhLCAweDgwMDhhLCAweDgwMDRhLCAweDkwMGY0LFxuICAgIDB4NzAxMDMsIDB4ODAwNTYsIDB4ODAwMTYsIDB4ODAxMWUsIDB4NzAxMTMsIDB4ODAwNzYsIDB4ODAwMzYsIDB4OTAwY2MsXG4gICAgMHg3MDEwYiwgMHg4MDA2NiwgMHg4MDAyNiwgMHg5MDBhYywgMHg4MDAwNiwgMHg4MDA4NiwgMHg4MDA0NiwgMHg5MDBlYyxcbiAgICAweDcwMTA3LCAweDgwMDVlLCAweDgwMDFlLCAweDkwMDljLCAweDcwMTE3LCAweDgwMDdlLCAweDgwMDNlLCAweDkwMGRjLFxuICAgIDB4NzAxMGYsIDB4ODAwNmUsIDB4ODAwMmUsIDB4OTAwYmMsIDB4ODAwMGUsIDB4ODAwOGUsIDB4ODAwNGUsIDB4OTAwZmMsXG4gICAgMHg3MDEwMCwgMHg4MDA1MSwgMHg4MDAxMSwgMHg4MDExOSwgMHg3MDExMCwgMHg4MDA3MSwgMHg4MDAzMSwgMHg5MDBjMixcbiAgICAweDcwMTA4LCAweDgwMDYxLCAweDgwMDIxLCAweDkwMGEyLCAweDgwMDAxLCAweDgwMDgxLCAweDgwMDQxLCAweDkwMGUyLFxuICAgIDB4NzAxMDQsIDB4ODAwNTksIDB4ODAwMTksIDB4OTAwOTIsIDB4NzAxMTQsIDB4ODAwNzksIDB4ODAwMzksIDB4OTAwZDIsXG4gICAgMHg3MDEwYywgMHg4MDA2OSwgMHg4MDAyOSwgMHg5MDBiMiwgMHg4MDAwOSwgMHg4MDA4OSwgMHg4MDA0OSwgMHg5MDBmMixcbiAgICAweDcwMTAyLCAweDgwMDU1LCAweDgwMDE1LCAweDgwMTFkLCAweDcwMTEyLCAweDgwMDc1LCAweDgwMDM1LCAweDkwMGNhLFxuICAgIDB4NzAxMGEsIDB4ODAwNjUsIDB4ODAwMjUsIDB4OTAwYWEsIDB4ODAwMDUsIDB4ODAwODUsIDB4ODAwNDUsIDB4OTAwZWEsXG4gICAgMHg3MDEwNiwgMHg4MDA1ZCwgMHg4MDAxZCwgMHg5MDA5YSwgMHg3MDExNiwgMHg4MDA3ZCwgMHg4MDAzZCwgMHg5MDBkYSxcbiAgICAweDcwMTBlLCAweDgwMDZkLCAweDgwMDJkLCAweDkwMGJhLCAweDgwMDBkLCAweDgwMDhkLCAweDgwMDRkLCAweDkwMGZhLFxuICAgIDB4NzAxMDEsIDB4ODAwNTMsIDB4ODAwMTMsIDB4ODAxMWIsIDB4NzAxMTEsIDB4ODAwNzMsIDB4ODAwMzMsIDB4OTAwYzYsXG4gICAgMHg3MDEwOSwgMHg4MDA2MywgMHg4MDAyMywgMHg5MDBhNiwgMHg4MDAwMywgMHg4MDA4MywgMHg4MDA0MywgMHg5MDBlNixcbiAgICAweDcwMTA1LCAweDgwMDViLCAweDgwMDFiLCAweDkwMDk2LCAweDcwMTE1LCAweDgwMDdiLCAweDgwMDNiLCAweDkwMGQ2LFxuICAgIDB4NzAxMGQsIDB4ODAwNmIsIDB4ODAwMmIsIDB4OTAwYjYsIDB4ODAwMGIsIDB4ODAwOGIsIDB4ODAwNGIsIDB4OTAwZjYsXG4gICAgMHg3MDEwMywgMHg4MDA1NywgMHg4MDAxNywgMHg4MDExZiwgMHg3MDExMywgMHg4MDA3NywgMHg4MDAzNywgMHg5MDBjZSxcbiAgICAweDcwMTBiLCAweDgwMDY3LCAweDgwMDI3LCAweDkwMGFlLCAweDgwMDA3LCAweDgwMDg3LCAweDgwMDQ3LCAweDkwMGVlLFxuICAgIDB4NzAxMDcsIDB4ODAwNWYsIDB4ODAwMWYsIDB4OTAwOWUsIDB4NzAxMTcsIDB4ODAwN2YsIDB4ODAwM2YsIDB4OTAwZGUsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZiwgMHg4MDAyZiwgMHg5MDBiZSwgMHg4MDAwZiwgMHg4MDA4ZiwgMHg4MDA0ZiwgMHg5MDBmZSxcbiAgICAweDcwMTAwLCAweDgwMDUwLCAweDgwMDEwLCAweDgwMTE4LCAweDcwMTEwLCAweDgwMDcwLCAweDgwMDMwLCAweDkwMGMxLFxuICAgIDB4NzAxMDgsIDB4ODAwNjAsIDB4ODAwMjAsIDB4OTAwYTEsIDB4ODAwMDAsIDB4ODAwODAsIDB4ODAwNDAsIDB4OTAwZTEsXG4gICAgMHg3MDEwNCwgMHg4MDA1OCwgMHg4MDAxOCwgMHg5MDA5MSwgMHg3MDExNCwgMHg4MDA3OCwgMHg4MDAzOCwgMHg5MDBkMSxcbiAgICAweDcwMTBjLCAweDgwMDY4LCAweDgwMDI4LCAweDkwMGIxLCAweDgwMDA4LCAweDgwMDg4LCAweDgwMDQ4LCAweDkwMGYxLFxuICAgIDB4NzAxMDIsIDB4ODAwNTQsIDB4ODAwMTQsIDB4ODAxMWMsIDB4NzAxMTIsIDB4ODAwNzQsIDB4ODAwMzQsIDB4OTAwYzksXG4gICAgMHg3MDEwYSwgMHg4MDA2NCwgMHg4MDAyNCwgMHg5MDBhOSwgMHg4MDAwNCwgMHg4MDA4NCwgMHg4MDA0NCwgMHg5MDBlOSxcbiAgICAweDcwMTA2LCAweDgwMDVjLCAweDgwMDFjLCAweDkwMDk5LCAweDcwMTE2LCAweDgwMDdjLCAweDgwMDNjLCAweDkwMGQ5LFxuICAgIDB4NzAxMGUsIDB4ODAwNmMsIDB4ODAwMmMsIDB4OTAwYjksIDB4ODAwMGMsIDB4ODAwOGMsIDB4ODAwNGMsIDB4OTAwZjksXG4gICAgMHg3MDEwMSwgMHg4MDA1MiwgMHg4MDAxMiwgMHg4MDExYSwgMHg3MDExMSwgMHg4MDA3MiwgMHg4MDAzMiwgMHg5MDBjNSxcbiAgICAweDcwMTA5LCAweDgwMDYyLCAweDgwMDIyLCAweDkwMGE1LCAweDgwMDAyLCAweDgwMDgyLCAweDgwMDQyLCAweDkwMGU1LFxuICAgIDB4NzAxMDUsIDB4ODAwNWEsIDB4ODAwMWEsIDB4OTAwOTUsIDB4NzAxMTUsIDB4ODAwN2EsIDB4ODAwM2EsIDB4OTAwZDUsXG4gICAgMHg3MDEwZCwgMHg4MDA2YSwgMHg4MDAyYSwgMHg5MDBiNSwgMHg4MDAwYSwgMHg4MDA4YSwgMHg4MDA0YSwgMHg5MDBmNSxcbiAgICAweDcwMTAzLCAweDgwMDU2LCAweDgwMDE2LCAweDgwMTFlLCAweDcwMTEzLCAweDgwMDc2LCAweDgwMDM2LCAweDkwMGNkLFxuICAgIDB4NzAxMGIsIDB4ODAwNjYsIDB4ODAwMjYsIDB4OTAwYWQsIDB4ODAwMDYsIDB4ODAwODYsIDB4ODAwNDYsIDB4OTAwZWQsXG4gICAgMHg3MDEwNywgMHg4MDA1ZSwgMHg4MDAxZSwgMHg5MDA5ZCwgMHg3MDExNywgMHg4MDA3ZSwgMHg4MDAzZSwgMHg5MDBkZCxcbiAgICAweDcwMTBmLCAweDgwMDZlLCAweDgwMDJlLCAweDkwMGJkLCAweDgwMDBlLCAweDgwMDhlLCAweDgwMDRlLCAweDkwMGZkLFxuICAgIDB4NzAxMDAsIDB4ODAwNTEsIDB4ODAwMTEsIDB4ODAxMTksIDB4NzAxMTAsIDB4ODAwNzEsIDB4ODAwMzEsIDB4OTAwYzMsXG4gICAgMHg3MDEwOCwgMHg4MDA2MSwgMHg4MDAyMSwgMHg5MDBhMywgMHg4MDAwMSwgMHg4MDA4MSwgMHg4MDA0MSwgMHg5MDBlMyxcbiAgICAweDcwMTA0LCAweDgwMDU5LCAweDgwMDE5LCAweDkwMDkzLCAweDcwMTE0LCAweDgwMDc5LCAweDgwMDM5LCAweDkwMGQzLFxuICAgIDB4NzAxMGMsIDB4ODAwNjksIDB4ODAwMjksIDB4OTAwYjMsIDB4ODAwMDksIDB4ODAwODksIDB4ODAwNDksIDB4OTAwZjMsXG4gICAgMHg3MDEwMiwgMHg4MDA1NSwgMHg4MDAxNSwgMHg4MDExZCwgMHg3MDExMiwgMHg4MDA3NSwgMHg4MDAzNSwgMHg5MDBjYixcbiAgICAweDcwMTBhLCAweDgwMDY1LCAweDgwMDI1LCAweDkwMGFiLCAweDgwMDA1LCAweDgwMDg1LCAweDgwMDQ1LCAweDkwMGViLFxuICAgIDB4NzAxMDYsIDB4ODAwNWQsIDB4ODAwMWQsIDB4OTAwOWIsIDB4NzAxMTYsIDB4ODAwN2QsIDB4ODAwM2QsIDB4OTAwZGIsXG4gICAgMHg3MDEwZSwgMHg4MDA2ZCwgMHg4MDAyZCwgMHg5MDBiYiwgMHg4MDAwZCwgMHg4MDA4ZCwgMHg4MDA0ZCwgMHg5MDBmYixcbiAgICAweDcwMTAxLCAweDgwMDUzLCAweDgwMDEzLCAweDgwMTFiLCAweDcwMTExLCAweDgwMDczLCAweDgwMDMzLCAweDkwMGM3LFxuICAgIDB4NzAxMDksIDB4ODAwNjMsIDB4ODAwMjMsIDB4OTAwYTcsIDB4ODAwMDMsIDB4ODAwODMsIDB4ODAwNDMsIDB4OTAwZTcsXG4gICAgMHg3MDEwNSwgMHg4MDA1YiwgMHg4MDAxYiwgMHg5MDA5NywgMHg3MDExNSwgMHg4MDA3YiwgMHg4MDAzYiwgMHg5MDBkNyxcbiAgICAweDcwMTBkLCAweDgwMDZiLCAweDgwMDJiLCAweDkwMGI3LCAweDgwMDBiLCAweDgwMDhiLCAweDgwMDRiLCAweDkwMGY3LFxuICAgIDB4NzAxMDMsIDB4ODAwNTcsIDB4ODAwMTcsIDB4ODAxMWYsIDB4NzAxMTMsIDB4ODAwNzcsIDB4ODAwMzcsIDB4OTAwY2YsXG4gICAgMHg3MDEwYiwgMHg4MDA2NywgMHg4MDAyNywgMHg5MDBhZiwgMHg4MDAwNywgMHg4MDA4NywgMHg4MDA0NywgMHg5MDBlZixcbiAgICAweDcwMTA3LCAweDgwMDVmLCAweDgwMDFmLCAweDkwMDlmLCAweDcwMTE3LCAweDgwMDdmLCAweDgwMDNmLCAweDkwMGRmLFxuICAgIDB4NzAxMGYsIDB4ODAwNmYsIDB4ODAwMmYsIDB4OTAwYmYsIDB4ODAwMGYsIDB4ODAwOGYsIDB4ODAwNGYsIDB4OTAwZmZcbiAgXSksIDldO1xuXG4gIHZhciBmaXhlZERpc3RDb2RlVGFiID0gW25ldyBVaW50MzJBcnJheShbXG4gICAgMHg1MDAwMCwgMHg1MDAxMCwgMHg1MDAwOCwgMHg1MDAxOCwgMHg1MDAwNCwgMHg1MDAxNCwgMHg1MDAwYywgMHg1MDAxYyxcbiAgICAweDUwMDAyLCAweDUwMDEyLCAweDUwMDBhLCAweDUwMDFhLCAweDUwMDA2LCAweDUwMDE2LCAweDUwMDBlLCAweDAwMDAwLFxuICAgIDB4NTAwMDEsIDB4NTAwMTEsIDB4NTAwMDksIDB4NTAwMTksIDB4NTAwMDUsIDB4NTAwMTUsIDB4NTAwMGQsIDB4NTAwMWQsXG4gICAgMHg1MDAwMywgMHg1MDAxMywgMHg1MDAwYiwgMHg1MDAxYiwgMHg1MDAwNywgMHg1MDAxNywgMHg1MDAwZiwgMHgwMDAwMFxuICBdKSwgNV07XG4gIFxuICBmdW5jdGlvbiBlcnJvcihlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN0cnVjdG9yKGJ5dGVzKSB7XG4gICAgLy92YXIgYnl0ZXMgPSBzdHJlYW0uZ2V0Qnl0ZXMoKTtcbiAgICB2YXIgYnl0ZXNQb3MgPSAwO1xuXG4gICAgdmFyIGNtZiA9IGJ5dGVzW2J5dGVzUG9zKytdO1xuICAgIHZhciBmbGcgPSBieXRlc1tieXRlc1BvcysrXTtcbiAgICBpZiAoY21mID09IC0xIHx8IGZsZyA9PSAtMSlcbiAgICAgIGVycm9yKCdJbnZhbGlkIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICBpZiAoKGNtZiAmIDB4MGYpICE9IDB4MDgpXG4gICAgICBlcnJvcignVW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgaWYgKCgoKGNtZiA8PCA4KSArIGZsZykgJSAzMSkgIT0gMClcbiAgICAgIGVycm9yKCdCYWQgRkNIRUNLIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIGlmIChmbGcgJiAweDIwKVxuICAgICAgZXJyb3IoJ0ZESUNUIGJpdCBzZXQgaW4gZmxhdGUgc3RyZWFtJyk7XG5cbiAgICB0aGlzLmJ5dGVzID0gYnl0ZXM7XG4gICAgdGhpcy5ieXRlc1BvcyA9IGJ5dGVzUG9zO1xuXG4gICAgdGhpcy5jb2RlU2l6ZSA9IDA7XG4gICAgdGhpcy5jb2RlQnVmID0gMDtcblxuICAgIERlY29kZVN0cmVhbS5jYWxsKHRoaXMpO1xuICB9XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEZWNvZGVTdHJlYW0ucHJvdG90eXBlKTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0Qml0cyA9IGZ1bmN0aW9uKGJpdHMpIHtcbiAgICB2YXIgY29kZVNpemUgPSB0aGlzLmNvZGVTaXplO1xuICAgIHZhciBjb2RlQnVmID0gdGhpcy5jb2RlQnVmO1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcblxuICAgIHZhciBiO1xuICAgIHdoaWxlIChjb2RlU2l6ZSA8IGJpdHMpIHtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjb2RlQnVmIHw9IGIgPDwgY29kZVNpemU7XG4gICAgICBjb2RlU2l6ZSArPSA4O1xuICAgIH1cbiAgICBiID0gY29kZUJ1ZiAmICgoMSA8PCBiaXRzKSAtIDEpO1xuICAgIHRoaXMuY29kZUJ1ZiA9IGNvZGVCdWYgPj4gYml0cztcbiAgICB0aGlzLmNvZGVTaXplID0gY29kZVNpemUgLT0gYml0cztcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgcmV0dXJuIGI7XG4gIH07XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmdldENvZGUgPSBmdW5jdGlvbih0YWJsZSkge1xuICAgIHZhciBjb2RlcyA9IHRhYmxlWzBdO1xuICAgIHZhciBtYXhMZW4gPSB0YWJsZVsxXTtcbiAgICB2YXIgY29kZVNpemUgPSB0aGlzLmNvZGVTaXplO1xuICAgIHZhciBjb2RlQnVmID0gdGhpcy5jb2RlQnVmO1xuICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcblxuICAgIHdoaWxlIChjb2RlU2l6ZSA8IG1heExlbikge1xuICAgICAgdmFyIGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGVuY29kaW5nIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgY29kZUJ1ZiB8PSAoYiA8PCBjb2RlU2l6ZSk7XG4gICAgICBjb2RlU2l6ZSArPSA4O1xuICAgIH1cbiAgICB2YXIgY29kZSA9IGNvZGVzW2NvZGVCdWYgJiAoKDEgPDwgbWF4TGVuKSAtIDEpXTtcbiAgICB2YXIgY29kZUxlbiA9IGNvZGUgPj4gMTY7XG4gICAgdmFyIGNvZGVWYWwgPSBjb2RlICYgMHhmZmZmO1xuICAgIGlmIChjb2RlU2l6ZSA9PSAwIHx8IGNvZGVTaXplIDwgY29kZUxlbiB8fCBjb2RlTGVuID09IDApXG4gICAgICBlcnJvcignQmFkIGVuY29kaW5nIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIHRoaXMuY29kZUJ1ZiA9IChjb2RlQnVmID4+IGNvZGVMZW4pO1xuICAgIHRoaXMuY29kZVNpemUgPSAoY29kZVNpemUgLSBjb2RlTGVuKTtcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgcmV0dXJuIGNvZGVWYWw7XG4gIH07XG5cbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmdlbmVyYXRlSHVmZm1hblRhYmxlID0gZnVuY3Rpb24obGVuZ3Rocykge1xuICAgIHZhciBuID0gbGVuZ3Rocy5sZW5ndGg7XG5cbiAgICAvLyBmaW5kIG1heCBjb2RlIGxlbmd0aFxuICAgIHZhciBtYXhMZW4gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobGVuZ3Roc1tpXSA+IG1heExlbilcbiAgICAgICAgbWF4TGVuID0gbGVuZ3Roc1tpXTtcbiAgICB9XG5cbiAgICAvLyBidWlsZCB0aGUgdGFibGVcbiAgICB2YXIgc2l6ZSA9IDEgPDwgbWF4TGVuO1xuICAgIHZhciBjb2RlcyA9IG5ldyBVaW50MzJBcnJheShzaXplKTtcbiAgICBmb3IgKHZhciBsZW4gPSAxLCBjb2RlID0gMCwgc2tpcCA9IDI7XG4gICAgICAgICBsZW4gPD0gbWF4TGVuO1xuICAgICAgICAgKytsZW4sIGNvZGUgPDw9IDEsIHNraXAgPDw9IDEpIHtcbiAgICAgIGZvciAodmFyIHZhbCA9IDA7IHZhbCA8IG47ICsrdmFsKSB7XG4gICAgICAgIGlmIChsZW5ndGhzW3ZhbF0gPT0gbGVuKSB7XG4gICAgICAgICAgLy8gYml0LXJldmVyc2UgdGhlIGNvZGVcbiAgICAgICAgICB2YXIgY29kZTIgPSAwO1xuICAgICAgICAgIHZhciB0ID0gY29kZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICBjb2RlMiA9IChjb2RlMiA8PCAxKSB8ICh0ICYgMSk7XG4gICAgICAgICAgICB0ID4+PSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGZpbGwgdGhlIHRhYmxlIGVudHJpZXNcbiAgICAgICAgICBmb3IgKHZhciBpID0gY29kZTI7IGkgPCBzaXplOyBpICs9IHNraXApXG4gICAgICAgICAgICBjb2Rlc1tpXSA9IChsZW4gPDwgMTYpIHwgdmFsO1xuXG4gICAgICAgICAgKytjb2RlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFtjb2RlcywgbWF4TGVuXTtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVhZEJsb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gcmVwZWF0KHN0cmVhbSwgYXJyYXksIGxlbiwgb2Zmc2V0LCB3aGF0KSB7XG4gICAgICB2YXIgcmVwZWF0ID0gc3RyZWFtLmdldEJpdHMobGVuKSArIG9mZnNldDtcbiAgICAgIHdoaWxlIChyZXBlYXQtLSA+IDApXG4gICAgICAgIGFycmF5W2krK10gPSB3aGF0O1xuICAgIH1cblxuICAgIC8vIHJlYWQgYmxvY2sgaGVhZGVyXG4gICAgdmFyIGhkciA9IHRoaXMuZ2V0Qml0cygzKTtcbiAgICBpZiAoaGRyICYgMSlcbiAgICAgIHRoaXMuZW9mID0gdHJ1ZTtcbiAgICBoZHIgPj49IDE7XG5cbiAgICBpZiAoaGRyID09IDApIHsgLy8gdW5jb21wcmVzc2VkIGJsb2NrXG4gICAgICB2YXIgYnl0ZXMgPSB0aGlzLmJ5dGVzO1xuICAgICAgdmFyIGJ5dGVzUG9zID0gdGhpcy5ieXRlc1BvcztcbiAgICAgIHZhciBiO1xuXG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIHZhciBibG9ja0xlbiA9IGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGJsb2NrTGVuIHw9IChiIDw8IDgpO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICB2YXIgY2hlY2sgPSBiO1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBibG9jayBoZWFkZXIgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjaGVjayB8PSAoYiA8PCA4KTtcbiAgICAgIGlmIChjaGVjayAhPSAofmJsb2NrTGVuICYgMHhmZmZmKSlcbiAgICAgICAgZXJyb3IoJ0JhZCB1bmNvbXByZXNzZWQgYmxvY2sgbGVuZ3RoIGluIGZsYXRlIHN0cmVhbScpO1xuXG4gICAgICB0aGlzLmNvZGVCdWYgPSAwO1xuICAgICAgdGhpcy5jb2RlU2l6ZSA9IDA7XG5cbiAgICAgIHZhciBidWZmZXJMZW5ndGggPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIHZhciBidWZmZXIgPSB0aGlzLmVuc3VyZUJ1ZmZlcihidWZmZXJMZW5ndGggKyBibG9ja0xlbik7XG4gICAgICB2YXIgZW5kID0gYnVmZmVyTGVuZ3RoICsgYmxvY2tMZW47XG4gICAgICB0aGlzLmJ1ZmZlckxlbmd0aCA9IGVuZDtcbiAgICAgIGZvciAodmFyIG4gPSBidWZmZXJMZW5ndGg7IG4gPCBlbmQ7ICsrbikge1xuICAgICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5lb2YgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlcltuXSA9IGI7XG4gICAgICB9XG4gICAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGxpdENvZGVUYWJsZTtcbiAgICB2YXIgZGlzdENvZGVUYWJsZTtcbiAgICBpZiAoaGRyID09IDEpIHsgLy8gY29tcHJlc3NlZCBibG9jaywgZml4ZWQgY29kZXNcbiAgICAgIGxpdENvZGVUYWJsZSA9IGZpeGVkTGl0Q29kZVRhYjtcbiAgICAgIGRpc3RDb2RlVGFibGUgPSBmaXhlZERpc3RDb2RlVGFiO1xuICAgIH0gZWxzZSBpZiAoaGRyID09IDIpIHsgLy8gY29tcHJlc3NlZCBibG9jaywgZHluYW1pYyBjb2Rlc1xuICAgICAgdmFyIG51bUxpdENvZGVzID0gdGhpcy5nZXRCaXRzKDUpICsgMjU3O1xuICAgICAgdmFyIG51bURpc3RDb2RlcyA9IHRoaXMuZ2V0Qml0cyg1KSArIDE7XG4gICAgICB2YXIgbnVtQ29kZUxlbkNvZGVzID0gdGhpcy5nZXRCaXRzKDQpICsgNDtcblxuICAgICAgLy8gYnVpbGQgdGhlIGNvZGUgbGVuZ3RocyBjb2RlIHRhYmxlXG4gICAgICB2YXIgY29kZUxlbkNvZGVMZW5ndGhzID0gQXJyYXkoY29kZUxlbkNvZGVNYXAubGVuZ3RoKTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHdoaWxlIChpIDwgbnVtQ29kZUxlbkNvZGVzKVxuICAgICAgICBjb2RlTGVuQ29kZUxlbmd0aHNbY29kZUxlbkNvZGVNYXBbaSsrXV0gPSB0aGlzLmdldEJpdHMoMyk7XG4gICAgICB2YXIgY29kZUxlbkNvZGVUYWIgPSB0aGlzLmdlbmVyYXRlSHVmZm1hblRhYmxlKGNvZGVMZW5Db2RlTGVuZ3Rocyk7XG5cbiAgICAgIC8vIGJ1aWxkIHRoZSBsaXRlcmFsIGFuZCBkaXN0YW5jZSBjb2RlIHRhYmxlc1xuICAgICAgdmFyIGxlbiA9IDA7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgY29kZXMgPSBudW1MaXRDb2RlcyArIG51bURpc3RDb2RlcztcbiAgICAgIHZhciBjb2RlTGVuZ3RocyA9IG5ldyBBcnJheShjb2Rlcyk7XG4gICAgICB3aGlsZSAoaSA8IGNvZGVzKSB7XG4gICAgICAgIHZhciBjb2RlID0gdGhpcy5nZXRDb2RlKGNvZGVMZW5Db2RlVGFiKTtcbiAgICAgICAgaWYgKGNvZGUgPT0gMTYpIHtcbiAgICAgICAgICByZXBlYXQodGhpcywgY29kZUxlbmd0aHMsIDIsIDMsIGxlbik7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSAxNykge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgMywgMywgbGVuID0gMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PSAxOCkge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgNywgMTEsIGxlbiA9IDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvZGVMZW5ndGhzW2krK10gPSBsZW4gPSBjb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpdENvZGVUYWJsZSA9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbmd0aHMuc2xpY2UoMCwgbnVtTGl0Q29kZXMpKTtcbiAgICAgIGRpc3RDb2RlVGFibGUgPVxuICAgICAgICB0aGlzLmdlbmVyYXRlSHVmZm1hblRhYmxlKGNvZGVMZW5ndGhzLnNsaWNlKG51bUxpdENvZGVzLCBjb2RlcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvcignVW5rbm93biBibG9jayB0eXBlIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIH1cblxuICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlcjtcbiAgICB2YXIgbGltaXQgPSBidWZmZXIgPyBidWZmZXIubGVuZ3RoIDogMDtcbiAgICB2YXIgcG9zID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHZhciBjb2RlMSA9IHRoaXMuZ2V0Q29kZShsaXRDb2RlVGFibGUpO1xuICAgICAgaWYgKGNvZGUxIDwgMjU2KSB7XG4gICAgICAgIGlmIChwb3MgKyAxID49IGxpbWl0KSB7XG4gICAgICAgICAgYnVmZmVyID0gdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgMSk7XG4gICAgICAgICAgbGltaXQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGJ1ZmZlcltwb3MrK10gPSBjb2RlMTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoY29kZTEgPT0gMjU2KSB7XG4gICAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gcG9zO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb2RlMSAtPSAyNTc7XG4gICAgICBjb2RlMSA9IGxlbmd0aERlY29kZVtjb2RlMV07XG4gICAgICB2YXIgY29kZTIgPSBjb2RlMSA+PiAxNjtcbiAgICAgIGlmIChjb2RlMiA+IDApXG4gICAgICAgIGNvZGUyID0gdGhpcy5nZXRCaXRzKGNvZGUyKTtcbiAgICAgIHZhciBsZW4gPSAoY29kZTEgJiAweGZmZmYpICsgY29kZTI7XG4gICAgICBjb2RlMSA9IHRoaXMuZ2V0Q29kZShkaXN0Q29kZVRhYmxlKTtcbiAgICAgIGNvZGUxID0gZGlzdERlY29kZVtjb2RlMV07XG4gICAgICBjb2RlMiA9IGNvZGUxID4+IDE2O1xuICAgICAgaWYgKGNvZGUyID4gMClcbiAgICAgICAgY29kZTIgPSB0aGlzLmdldEJpdHMoY29kZTIpO1xuICAgICAgdmFyIGRpc3QgPSAoY29kZTEgJiAweGZmZmYpICsgY29kZTI7XG4gICAgICBpZiAocG9zICsgbGVuID49IGxpbWl0KSB7XG4gICAgICAgIGJ1ZmZlciA9IHRoaXMuZW5zdXJlQnVmZmVyKHBvcyArIGxlbik7XG4gICAgICAgIGxpbWl0ID0gYnVmZmVyLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGVuOyArK2ssICsrcG9zKVxuICAgICAgICBidWZmZXJbcG9zXSA9IGJ1ZmZlcltwb3MgLSBkaXN0XTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBGbGF0ZVN0cmVhbTsiLCIvKlxuXHRUaGlzIGlzIHJvdC5qcywgdGhlIFJPZ3VlbGlrZSBUb29sa2l0IGluIEphdmFTY3JpcHQuXG5cdFZlcnNpb24gMC42fmRldiwgZ2VuZXJhdGVkIG9uIFR1ZSBNYXIgMTcgMTY6MTY6MzEgQ0VUIDIwMTUuXG4qL1xuLyoqXG4gKiBAbmFtZXNwYWNlIFRvcC1sZXZlbCBST1QgbmFtZXNwYWNlXG4gKi9cbnZhciBST1QgPSB7XG5cdC8qKiBEaXJlY3Rpb25hbCBjb25zdGFudHMuIE9yZGVyaW5nIGlzIGltcG9ydGFudCEgKi9cblx0RElSUzoge1xuXHRcdFwiNFwiOiBbXG5cdFx0XHRbIDAsIC0xXSxcblx0XHRcdFsgMSwgIDBdLFxuXHRcdFx0WyAwLCAgMV0sXG5cdFx0XHRbLTEsICAwXVxuXHRcdF0sXG5cdFx0XCI4XCI6IFtcblx0XHRcdFsgMCwgLTFdLFxuXHRcdFx0WyAxLCAtMV0sXG5cdFx0XHRbIDEsICAwXSxcblx0XHRcdFsgMSwgIDFdLFxuXHRcdFx0WyAwLCAgMV0sXG5cdFx0XHRbLTEsICAxXSxcblx0XHRcdFstMSwgIDBdLFxuXHRcdFx0Wy0xLCAtMV1cblx0XHRdLFxuXHRcdFwiNlwiOiBbXG5cdFx0XHRbLTEsIC0xXSxcblx0XHRcdFsgMSwgLTFdLFxuXHRcdFx0WyAyLCAgMF0sXG5cdFx0XHRbIDEsICAxXSxcblx0XHRcdFstMSwgIDFdLFxuXHRcdFx0Wy0yLCAgMF1cblx0XHRdXG5cdH1cbn07XG4vKipcbiAqIEFsd2F5cyBwb3NpdGl2ZSBtb2R1bHVzXG4gKiBAcGFyYW0ge2ludH0gbiBNb2R1bHVzXG4gKiBAcmV0dXJucyB7aW50fSB0aGlzIG1vZHVsbyBuXG4gKi9cbk51bWJlci5wcm90b3R5cGUubW9kID0gZnVuY3Rpb24obikge1xuXHRyZXR1cm4gKCh0aGlzJW4pK24pJW47XG59XG5pZiAoIU9iamVjdC5jcmVhdGUpIHsgIFxuXHQvKipcblx0ICogRVM1IE9iamVjdC5jcmVhdGVcblx0ICovXG5cdE9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbihvKSB7ICBcblx0XHR2YXIgdG1wID0gZnVuY3Rpb24oKSB7fTtcblx0XHR0bXAucHJvdG90eXBlID0gbztcblx0XHRyZXR1cm4gbmV3IHRtcCgpO1xuXHR9OyAgXG59ICBcbi8qKlxuICogU2V0cyBwcm90b3R5cGUgb2YgdGhpcyBmdW5jdGlvbiB0byBhbiBpbnN0YW5jZSBvZiBwYXJlbnQgZnVuY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBhcmVudFxuICovXG5GdW5jdGlvbi5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24ocGFyZW50KSB7XG5cdHRoaXMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShwYXJlbnQucHJvdG90eXBlKTtcblx0dGhpcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcztcbn1cbmlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIpIHtcblx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9XG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCBmdW5jdGlvbihjYikgeyByZXR1cm4gc2V0VGltZW91dChjYiwgMTAwMC82MCk7IH07XG5cblx0d2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID1cblx0XHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCBmdW5jdGlvbihpZCkgeyByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTsgfTtcbn1cbi8qKlxuICogQGNsYXNzIEFic3RyYWN0IEZPViBhbGdvcml0aG1cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpZ2h0UGFzc2VzQ2FsbGJhY2sgRG9lcyB0aGUgbGlnaHQgcGFzcyB0aHJvdWdoIHgseT9cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cbiAqIEBwYXJhbSB7aW50fSBbb3B0aW9ucy50b3BvbG9neT04XSA0LzYvOFxuICovXG5ST1QuRk9WID0gZnVuY3Rpb24obGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xuXHR0aGlzLl9saWdodFBhc3NlcyA9IGxpZ2h0UGFzc2VzQ2FsbGJhY2s7XG5cdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0dG9wb2xvZ3k6IDhcblx0fVxuXHRmb3IgKHZhciBwIGluIG9wdGlvbnMpIHsgdGhpcy5fb3B0aW9uc1twXSA9IG9wdGlvbnNbcF07IH1cbn07XG5cbi8qKlxuICogQ29tcHV0ZSB2aXNpYmlsaXR5IGZvciBhIDM2MC1kZWdyZWUgY2lyY2xlXG4gKiBAcGFyYW0ge2ludH0geFxuICogQHBhcmFtIHtpbnR9IHlcbiAqIEBwYXJhbSB7aW50fSBSIE1heGltdW0gdmlzaWJpbGl0eSByYWRpdXNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cblJPVC5GT1YucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbih4LCB5LCBSLCBjYWxsYmFjaykge31cblxuLyoqXG4gKiBSZXR1cm4gYWxsIG5laWdoYm9ycyBpbiBhIGNvbmNlbnRyaWMgcmluZ1xuICogQHBhcmFtIHtpbnR9IGN4IGNlbnRlci14XG4gKiBAcGFyYW0ge2ludH0gY3kgY2VudGVyLXlcbiAqIEBwYXJhbSB7aW50fSByIHJhbmdlXG4gKi9cblJPVC5GT1YucHJvdG90eXBlLl9nZXRDaXJjbGUgPSBmdW5jdGlvbihjeCwgY3ksIHIpIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHR2YXIgZGlycywgY291bnRGYWN0b3IsIHN0YXJ0T2Zmc2V0O1xuXG5cdHN3aXRjaCAodGhpcy5fb3B0aW9ucy50b3BvbG9neSkge1xuXHRcdGNhc2UgNDpcblx0XHRcdGNvdW50RmFjdG9yID0gMTtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWzAsIDFdO1xuXHRcdFx0ZGlycyA9IFtcblx0XHRcdFx0Uk9ULkRJUlNbOF1bN10sXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzFdLFxuXHRcdFx0XHRST1QuRElSU1s4XVszXSxcblx0XHRcdFx0Uk9ULkRJUlNbOF1bNV1cblx0XHRcdF1cblx0XHRicmVhaztcblxuXHRcdGNhc2UgNjpcblx0XHRcdGRpcnMgPSBST1QuRElSU1s2XTtcblx0XHRcdGNvdW50RmFjdG9yID0gMTtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgODpcblx0XHRcdGRpcnMgPSBST1QuRElSU1s0XTtcblx0XHRcdGNvdW50RmFjdG9yID0gMjtcblx0XHRcdHN0YXJ0T2Zmc2V0ID0gWy0xLCAxXTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8qIHN0YXJ0aW5nIG5laWdoYm9yICovXG5cdHZhciB4ID0gY3ggKyBzdGFydE9mZnNldFswXSpyO1xuXHR2YXIgeSA9IGN5ICsgc3RhcnRPZmZzZXRbMV0qcjtcblxuXHQvKiBjaXJjbGUgKi9cblx0Zm9yICh2YXIgaT0wO2k8ZGlycy5sZW5ndGg7aSsrKSB7XG5cdFx0Zm9yICh2YXIgaj0wO2o8cipjb3VudEZhY3RvcjtqKyspIHtcblx0XHRcdHJlc3VsdC5wdXNoKFt4LCB5XSk7XG5cdFx0XHR4ICs9IGRpcnNbaV1bMF07XG5cdFx0XHR5ICs9IGRpcnNbaV1bMV07XG5cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBAY2xhc3MgUHJlY2lzZSBzaGFkb3djYXN0aW5nIGFsZ29yaXRobVxuICogQGF1Z21lbnRzIFJPVC5GT1ZcbiAqL1xuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyA9IGZ1bmN0aW9uKGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpIHtcblx0Uk9ULkZPVi5jYWxsKHRoaXMsIGxpZ2h0UGFzc2VzQ2FsbGJhY2ssIG9wdGlvbnMpO1xufVxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5leHRlbmQoUk9ULkZPVik7XG5cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbih4LCB5LCBSLCBjYWxsYmFjaykge1xuXHQvKiB0aGlzIHBsYWNlIGlzIGFsd2F5cyB2aXNpYmxlICovXG5cdGNhbGxiYWNrKHgsIHksIDAsIDEpO1xuICAgIFxuXHRjYWxsYmFjayh4LTEsIHktMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgsIHktMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgrMSwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeC0xLCB5LCAwLCAxKTtcblx0Y2FsbGJhY2soeCsxLCB5LCAwLCAxKTtcblx0Y2FsbGJhY2soeC0xLCB5KzEsIDAsIDEpO1xuXHRjYWxsYmFjayh4LCB5KzEsIDAsIDEpO1xuXHRjYWxsYmFjayh4KzEsIHkrMSwgMCwgMSk7XG4gICAgXG4gICAgY2FsbGJhY2soeC0xLCB5LTIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsxLCB5LTIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeS0xLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTIsIHksIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeSsxLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHktMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsyLCB5LCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHkrMSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0xLCB5KzIsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgsIHkrMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCsxLCB5KzIsIDAsIDEpO1xuXG5cdC8qIHN0YW5kaW5nIGluIGEgZGFyayBwbGFjZS4gRklYTUUgaXMgdGhpcyBhIGdvb2QgaWRlYT8gICovXG5cdGlmICghdGhpcy5fbGlnaHRQYXNzZXMoeCwgeSkpIHsgcmV0dXJuOyB9XG5cdFxuXHQvKiBsaXN0IG9mIGFsbCBzaGFkb3dzICovXG5cdHZhciBTSEFET1dTID0gW107XG5cdHZhciB0cmVlcyA9IHt9O1xuXHR2YXIgdG90YWxOZWlnaGJvckNvdW50ID0gMTtcbiAgICB2YXIgY3gsIGN5LCBibG9ja3MsIEExLCBBMiwgdmlzaWJpbGl0eSxcbiAgICAgICAgZHgsIGR5LCBkZCwgYSwgYiwgcmFkaXVzLFxuICAgICAgICBjeDIsIGN5MiwgZGQxLFxuICAgICAgICBvYnN0YWNsZVR5cGU7XG5cblx0LyogYW5hbHl6ZSBzdXJyb3VuZGluZyBjZWxscyBpbiBjb25jZW50cmljIHJpbmdzLCBzdGFydGluZyBmcm9tIHRoZSBjZW50ZXIgKi9cblx0Zm9yICh2YXIgcj0xOyByPD1SOyByKyspIHtcblx0XHR2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuXHRcdHZhciBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgdG90YWxOZWlnaGJvckNvdW50ICs9IG5laWdoYm9yQ291bnQ7XG4gICAgICAgIHRyZWVzID0ge307XG5cdFx0Zm9yICh2YXIgaT0wO2k8bmVpZ2hib3JDb3VudDtpKyspIHtcblx0XHRcdGN4ID0gbmVpZ2hib3JzW2ldWzBdO1xuXHRcdFx0Y3kgPSBuZWlnaGJvcnNbaV1bMV07XG4gICAgICAgICAgICB2YXIga2V5ID0gY3grXCIsXCIrY3k7XG4gICAgICAgICAgICBpZiAoKHgtY3gpKih4LWN4KSArICh5LWN5KSooeS1jeSkgPj0gUiAqIFIpIHtcbiAgICAgICAgICAgICAgICB0b3RhbE5laWdoYm9yQ291bnQtLTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vaWYgKGtleSA9PSBcIjQ0LDEwMlwiKSAvL2NvbnNvbGUubG9nKCdLRVknLCBrZXksICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpKTtcbiAgICAgICAgICAgIC8vIGlmIChrZXkgPT0gXCIxNTAsMTYwXCIpIC8vY29uc29sZS5sb2coa2V5LCBvYnN0YWNsZVR5cGUpO1xuICAgICAgICAgICAgLy8gaWYgKGtleSA9PSBcIjE1MSwxNjFcIikgLy9jb25zb2xlLmxvZyhrZXksIG9ic3RhY2xlVHlwZSk7XG4gICAgICAgICAgICAvLyBpZiAoa2V5ID09IFwiMTUwLDE2MVwiKSAvL2NvbnNvbGUubG9nKGtleSwgb2JzdGFjbGVUeXBlKTtcbiAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGVzID0gb2JzdGFjbGVUeXBlcyA9IHRoaXMud2FsbHNba2V5XTtcbiAgICAgICAgICAgIGlmIChvYnN0YWNsZVR5cGVzICYmIG9ic3RhY2xlVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNraXBWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYnN0YWNsZVR5cGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGUgPSBvYnN0YWNsZVR5cGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICBjeDIgPSBvYnN0YWNsZVR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgIGN5MiA9IG9ic3RhY2xlVHlwZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzID0gb2JzdGFjbGVUeXBlWzNdO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSBjeDIgLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZHgxID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQxID0gTWF0aC5zcXJ0KGR4MSAqIGR4MSArIGR5MSAqIGR5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGQxIDwgZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgZmFsc2UsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXNpYmlsaXR5KSBza2lwVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgJiYgIXNraXBWaXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN4MiA9IGN4O1xuICAgICAgICAgICAgICAgIGN5MiA9IGN5O1xuICAgICAgICAgICAgICAgIHJhZGl1cyA9IE1hdGguU1FSVDIgLyAyO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgIGlmIChkZCA+IDEvMikge1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLypkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgaWYgKG9ic3RhY2xlVHlwZSAmJiBvYnN0YWNsZVR5cGVbMF0gPT0gJ3RyZWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4MSA9IGN4IC0geDtcbiAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICBkZDEgPSBNYXRoLnNxcnQoZHgxICogZHgxICsgZHkxICogZHkxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkMSA8IGRkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5IC0geTtcbiAgICAgICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCBmYWxzZSwgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKG9ic3RhY2xlVHlwZSkgLy9jb25zb2xlLmxvZyhvYnN0YWNsZVR5cGVbMF0sIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0JMT0NLUycsIGN4LCBjeSwgYmxvY2tzLCBiKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cdFx0fSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICBcbiAgICAgICAgLy8gYXBwbHkgdHJlZSBibG9ja2Vyc1xuICAgICAgICBmb3IgKHZhciBrIGluIHRyZWVzKSB7XG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ2FwcGx5IHRyZWUnKTtcbiAgICAgICAgICAgIGN4MiA9IHRyZWVzW2tdWzBdO1xuICAgICAgICAgICAgY3kyID0gdHJlZXNba11bMV07XG4gICAgICAgICAgICBkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICByYWRpdXMgPSBNYXRoLlNRUlQyIC0gLjAxO1xuICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgYSA9IE1hdGguYXNpbihyYWRpdXMgLyBkZCk7XG4gICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgQTIgPSBub3JtYWxpemUoYiArIGEpO1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCB0cnVlLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fSAvKiBmb3IgYWxsIHJpbmdzICovXG4gICAgXG4gICAgcmV0dXJuIHRvdGFsTmVpZ2hib3JDb3VudDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ludFsyXX0gQTEgYXJjIHN0YXJ0XG4gKiBAcGFyYW0ge2ludFsyXX0gQTIgYXJjIGVuZFxuICogQHBhcmFtIHtib29sfSBibG9ja3MgRG9lcyBjdXJyZW50IGFyYyBibG9jayB2aXNpYmlsaXR5P1xuICogQHBhcmFtIHtpbnRbXVtdfSBTSEFET1dTIGxpc3Qgb2YgYWN0aXZlIHNoYWRvd3NcbiAqL1xuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuX2NoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgLy8vL2NvbnNvbGUubG9nKCdfY2hlY2tWaXNpYmlsaXR5JywgYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgIC8vIGNoZWNrIGlmIHRhcmdldCBjZW50ZXIgaXMgaW5zaWRlIGEgc2hhZG93XG4gICAgdmFyIHZpc2libGUgPSAhYmxvY2tzO1xuICAgIC8vY29uc29sZS5sb2coJ19jaGVja1Zpc2liaWxpdHknLCBiLCB2aXNpYmxlKTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBTSEFET1dTLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG9sZCA9IFNIQURPV1NbaV07XG4gICAgICAgIGlmIChpc0JldHdlZW4oYiwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgLy8vL2NvbnNvbGUubG9nKCdibG9ja3MgYnV0IG5vdCB2aXNpYmxlJywgU0hBRE9XUy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaSwgYiwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gbm90IHZpc2libGUsIHJldHVyblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cdH1cbiAgICBcbiAgICBpZiAoYmxvY2tzKSB7XG4gICAgICAgIGlmIChBMSA8IDAgJiYgQTIgPj0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc3BsaXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZVNoYWRvd3MoYiwgMCwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlU2hhZG93cyhiLCBBMSwgMCwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ25vdCBzcGxpdHRpbmcnLCBibG9ja3MsIHZpc2libGUsIGIpO1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTaGFkb3dzKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnLCBBMSwgQTIsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpLCAhaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpO1xuICAgICAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpICYmIEExICE9IFNIQURPV1NbMF1bMF0gJiYgQTIgIT0gU0hBRE9XU1swXVsxXSApIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHZpc2libGU7XG59XG5cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9tZXJnZVNoYWRvd3MgPSBmdW5jdGlvbihiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgIC8vLy9jb25zb2xlLmxvZygnbWVyZ2luZycsIGIsIEExLCBBMik7XG4gICAgLy8gY2hlY2sgaWYgdGFyZ2V0IGZpcnN0IGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDEgPSAwLFxuICAgICAgICBlZGdlMSA9IGZhbHNlLFxuICAgICAgICBmaXJzdEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgxIDwgU0hBRE9XUy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgxXTtcbiAgICAgICAgZmlyc3RJbmRleCA9IGluZGV4MTtcbiAgICAgICAgaWYgKGlzQmV0d2VlbihBMSwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBlZGdlMSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXgxID4gMCAmJiBpc0JldHdlZW4oQTEsIFNIQURPV1NbaW5kZXgxIC0gMV1bMV0sIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGVkZ2UxID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQmVmb3JlKEExLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBpbmRleDErKztcbiAgICAgICAgICAgIGZpcnN0SW5kZXggPSBpbmRleDE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCZWZvcmUoQTEsIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4MSsrO1xuICAgIH1cbiAgICBcbiAgICAvLyBjaGVjayBpZiB0YXJnZXQgc2Vjb25kIGVkZ2UgaXMgaW5zaWRlIGEgc2hhZG93IG9yIHdoaWNoIHNoYWRvd3MgaXQgaXMgYmV0d2VlblxuICAgIHZhciBpbmRleDIgPSBTSEFET1dTLmxlbmd0aCAtIDEsXG4gICAgICAgIGVkZ2UyID0gZmFsc2UsXG4gICAgICAgIHNlY29uZEluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXgyID49IDApIHtcbiAgICAgICAgdmFyIG9sZCA9IFNIQURPV1NbaW5kZXgyXTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBpbmRleDI7XG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhBMiwgb2xkWzBdLCBvbGRbMV0sIGlzQmV0d2VlbihBMiwgb2xkWzBdLCBvbGRbMV0pKVxuICAgICAgICBpZiAoaXNCZXR3ZWVuKEEyLCBvbGRbMF0sIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGVkZ2UyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JlZm9yZShBMiwgb2xkWzBdKSkge1xuICAgICAgICAgICAgaW5kZXgyLS07XG4gICAgICAgICAgICBzZWNvbmRJbmRleCA9IGluZGV4MjtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNCZWZvcmUoQTIsIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGluZGV4Mi0tO1xuICAgIH1cbiAgICBcbiAgICAvLy8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICBpZiAoZmlyc3RJbmRleCA9PSBTSEFET1dTLmxlbmd0aCAmJiAhZWRnZTEgJiYgc2Vjb25kSW5kZXggPT0gMCAmJiBlZGdlMikgZmlyc3RJbmRleCA9IDA7XG4gICAgLy9pZiAoc2Vjb25kSW5kZXggPT0gLTEpIHNlY29uZEluZGV4ID0gU0hBRE9XUy5sZW5ndGggLSAxO1xuICAgIC8vY29uc29sZS5sb2coZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgsIGVkZ2UxLCBlZGdlMiwgQTEsIEEyKTtcbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICBpZiAoU0hBRE9XUy5sZW5ndGggPT0gMCkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdlbXB0eSBzaGFkb3dzIHB1c2hpbmcnLCBbQTEsIEEyXSk7XG4gICAgICAgIFNIQURPV1MucHVzaChbQTEsIEEyXSk7XG4gICAgfVxuICAgIC8qZWxzZSBpZiAoU0hBRE9XUy5sZW5ndGggPiAxICYmIGZpcnN0SW5kZXggPT0gU0hBRE9XUy5sZW5ndGggJiYgc2Vjb25kSW5kZXggPT0gMCAmJiAhZWRnZTEgJiYgZWRnZTIpIHtcbiAgICBcbiAgICB9Ki9cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIG5ld19zaGFkb3cgPSBbZWRnZTEgPyBTSEFET1dTW2ZpcnN0SW5kZXhdWzBdIDogQTEsIGVkZ2UyID8gU0hBRE9XU1tzZWNvbmRJbmRleF1bMV0gOiBBMl07XG4gICAgICAgIC8vY29uc29sZS5sb2coJ25ld19zaGFkb3cnLCBuZXdfc2hhZG93KTtcbiAgICAgICAgc2Vjb25kSW5kZXggPSBNYXRoLm1heChmaXJzdEluZGV4LCBzZWNvbmRJbmRleCk7XG4gICAgICAgIHZhciBzdW0xID0gZGlmZl9zdW0oU0hBRE9XUyk7XG4gICAgICAgIHZhciBkb1NoaWZ0ID0gZmFsc2U7XG4gICAgICAgIGlmIChpc0JldHdlZW4oMCwgbmV3X3NoYWRvd1swXSwgbmV3X3NoYWRvd1sxXSkgJiYgbmV3X3NoYWRvd1swXSAhPSAwICYmIG5ld19zaGFkb3dbMV0gIT0gMCkge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnY3Jvc3NlcyAwJyk7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBbbmV3X3NoYWRvd1swXSwgMF0pO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbbmV3X3NoYWRvd1swXSwgMF0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIGlmIChTSEFET1dTWzBdWzBdICE9IDAgJiYgU0hBRE9XU1swXVsxXSAhPSBuZXdfc2hhZG93WzFdKSB7XG4gICAgICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoZmlyc3RJbmRleCArIDEsIDAsIFswLCBuZXdfc2hhZG93WzFdXSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhbMCwgbmV3X3NoYWRvd1sxXV0sIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgZG9TaGlmdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4LCBmaXJzdEluZGV4ID09IHNlY29uZEluZGV4ICYmIGVkZ2UxID09IGVkZ2UyICYmICFlZGdlMSA/IDAgOiBzZWNvbmRJbmRleCAtIGZpcnN0SW5kZXggKyAxLCBuZXdfc2hhZG93KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3VtMiA9IGRpZmZfc3VtKFNIQURPV1MpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCdzdW0xJywgc3VtMSwgJ3N1bTInLCBzdW0yLCBzdW0yIDwgc3VtMSwgU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpKTtcbiAgICAgICAgaWYgKHN1bTIgPCBzdW0xKSB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICAvKmlmIChTSEFET1dTLmxlbmd0aCA9PSAxICYmICghaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSB8fCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIH0qL1xuICAgICAgICBpZiAobmV3X3NoYWRvd1swXSA9PSAwIHx8IGRvU2hpZnQpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzaGlmdGluZycpO1xuICAgICAgICAgICAgd2hpbGUgKFNIQURPV1NbMF1bMF0gIT0gMCkge1xuICAgICAgICAgICAgICAgIFNIQURPV1MucHVzaChTSEFET1dTLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+PSBTSEFET1dTLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCBzaGlmdGluZycsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgfVxuICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkaWZmX3N1bShTSEFET1dTKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0JlZm9yZShBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKEEyID4gMCAmJiBBMSA8IDApIHsgLy8gQTEgaW4gdG9wIGhhbGYsIEEyIGluIGJvdHRvbSBoYWxmXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBBMSA8IEEyO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNBZnRlcihBMSwgQTIpIHtcbiAgICByZXR1cm4gIWlzQmVmb3JlKEExLCBBMik7XG59XG5cbmZ1bmN0aW9uIGlzQmV0d2VlbihiLCBBMSwgQTIpIHtcbiAgICBpZiAoQTEgPCBBMikge1xuICAgICAgICByZXR1cm4gKChBMSA8PSBiKSAmJiAoYiA8PSBBMikpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICgoQTEgPD0gYikgJiYgKGIgPD0gTWF0aC5QSSkpIHx8ICgoLU1hdGguUEkgPD0gYikgJiYgKGIgPD0gQTIpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh4KSB7XG4gICAgaWYgKHggPiBNYXRoLlBJKSB7XG4gICAgICAgIHJldHVybiAtKDIgKiBNYXRoLlBJIC0geCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCB4IDwgLU1hdGguUEkpIHtcbiAgICAgICAgcmV0dXJuIDIgKiBNYXRoLlBJICsgeDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZihBMSwgQTIpIHtcbiAgICBpZiAoQTEgPiAwICYmIEEyIDwgMCkgeyAvLyBBMSBpbiBib3R0b20gaGFsZiwgQTIgaW4gdG9wIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKChNYXRoLlBJIC0gQTEpIC0gKC1NYXRoLlBJIC0gQTIpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQTIgPiAwICYmIEExIDwgMCkgeyAvLyBBMSBpbiB0b3AgaGFsZiwgQTIgaW4gYm90dG9tIGhhbGZcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKC1BMSArIEEyKTtcbiAgICB9XG4gICAgaWYgKEExIDw9IDAgJiYgQTIgPD0gMCkgeyAvLyBBMSxBMiBpbiBib3R0b20gaGFsZlxuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7IC8vIEExIGFmdGVyIEEyXG4gICAgICAgICAgICByZXR1cm4gLUExICsgTWF0aC5QSSAtICgtTWF0aC5QSSAtIEEyKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKEEyIC0gQTEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaXNBZnRlcihBMSwgQTIpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5QSSArIChNYXRoLlBJIC0gQTEpICsgQTJcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhBMiAtIEExKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZGlmZl9zdW0oU0hBRE9XUykge1xuICAgIHZhciBzdW0gPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU0hBRE9XUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLy8vY29uc29sZS5sb2coU0hBRE9XU1tpXVswXSwgU0hBRE9XU1tpXVsxXSwgZGlmZihTSEFET1dTW2ldWzBdLCBTSEFET1dTW2ldWzFdKSk7XG4gICAgICAgIHN1bSArPSBkaWZmKFNIQURPV1NbaV1bMF0sIFNIQURPV1NbaV1bMV0pO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJPVDsiLCJ2YXIgSW1hZ2VIYW5kbGVyID0gcmVxdWlyZShcIi4vaW1hZ2VIYW5kbGVyLmpzXCIpO1xudmFyIFJPVCA9IHJlcXVpcmUoXCIuL3JvdDYuanNcIik7XG5cbnZhciBrZXkycHRfY2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGtleTJwdChrZXkpIHtcbiAgICBpZiAoa2V5IGluIGtleTJwdF9jYWNoZSkgcmV0dXJuIGtleTJwdF9jYWNoZVtrZXldO1xuICAgIHZhciBwID0ga2V5LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIChjKSB7IHJldHVybiBwYXJzZUludChjKSB9KTtcbiAgICB2YXIgcHQgPSB7eDogcFswXSwgeTogcFsxXSwga2V5OiBrZXl9O1xuICAgIGtleTJwdF9jYWNoZVtrZXldID0gcHQ7XG4gICAgcmV0dXJuIHB0O1xufVxuXG5mdW5jdGlvbiB4eTJrZXkoeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCIsXCIgKyB5O1xufVxuXG5mdW5jdGlvbiB4eTJwdCh4LCB5KSB7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5LCBrZXk6IHggKyBcIixcIiArIHl9O1xufVxuXG5mdW5jdGlvbiBwdDJrZXkocHQpIHtcbiAgICByZXR1cm4gcHQueCArIFwiLFwiICsgcHQueTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyhkYXRhLCBlbGV2YXRpb24pIHtcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHZhciB3YWxscyA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgIHZhciBwdCA9IGRhdGFba2V5XTtcbiAgICAgICAgaWYgKHB0LnogPiBlbGV2YXRpb24pIHtcbiAgICAgICAgICAgIGFkakxvb3A6XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gLTE7IGkgPD0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IC0xOyBqIDw9IDE7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoMCAhPT0gaSB8fCAwICE9PSBqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgayA9IChwdC54ICsgaSkgKyBcIixcIiArIChwdC55ICsgaik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtrXSAmJiBkYXRhW2tdLnogPD0gZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FsbHNbcHQua2V5XSA9IHB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGFkakxvb3A7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2dlbmVyYXRlRWxldmF0aW9uV2FsbHMnLCBEYXRlLm5vdygpIC0gdDEgKyAnbXMnKTtcbiAgICByZXR1cm4gd2FsbHM7XG59XG5cbmZ1bmN0aW9uIHNldEVsZXZhdGlvbldhbGxzKG9iaiwgZGF0YSwgZWxldmF0aW9uKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2VsZXZhdGlvbl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVsID0gZGF0YVtlbGV2YXRpb25dW2ldO1xuICAgICAgICBvYmpbZWxbMV0gKyBcIixcIiArIGVsWzJdXSA9IGVsO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0V2FsbHMob2JqLCBkYXRhLCBpZCwgcikge1xuICAgIGlkID0gaWQgfHwgJ3dhbGwnO1xuICAgIHIgPSByIHx8IChNYXRoLlNRUlQyIC8gMik7XG4gICAgZm9yICh2YXIgaSBpbiBkYXRhKSB7XG4gICAgICAgIG9ialtpXSA9IFtpZCwgZGF0YVtpXS54LCBkYXRhW2ldLnksIHJdO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc2V0VHJlZVdhbGxzKG9iaiwgZWxldmF0aW9uLCB0cmVlLCB0cmVlX2VsZXZhdGlvbnMsIHRyZWVfc3RhdGUsIHRyZWVfYmxvY2tzKSB7XG4gICAgZm9yICh2YXIgaSBpbiB0cmVlKSB7XG4gICAgICAgIGlmIChlbGV2YXRpb24gPCB0cmVlX2VsZXZhdGlvbnNbaV0pIHtcbiAgICAgICAgICAgIGlmICh0cmVlX3N0YXRlW2ldKSB7XG4gICAgICAgICAgICAgICAgLy9vYmpbaV0gPSBbJ3RyZWUnLCB0cmVlW2ldLngsIHRyZWVbaV0ueSwgTWF0aC5TUVJUMl07XG4gICAgICAgICAgICAgICAgdHJlZV9ibG9ja3NbaV0uZm9yRWFjaChmdW5jdGlvbiAocHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSBwdC54ICsgXCIsXCIgKyBwdC55O1xuICAgICAgICAgICAgICAgICAgICBvYmpba10gPSAob2JqW2tdIHx8IFtdKS5jb25jYXQoW1sndHJlZScsIHRyZWVbaV0ueCwgdHJlZVtpXS55LCBNYXRoLlNRUlQyXV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBWaXNpb25TaW11bGF0aW9uKHdvcmxkZGF0YSwgbWFwRGF0YUltYWdlUGF0aCwgb25SZWFkeSwgb3B0cykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuZ3JpZG5hdiA9IG51bGw7XG4gICAgdGhpcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSA9IG51bGw7XG4gICAgdGhpcy50b29sc19ub193YXJkcyA9IG51bGw7XG4gICAgdGhpcy5lbGV2YXRpb25WYWx1ZXMgPSBbXTtcbiAgICB0aGlzLmVsZXZhdGlvbkdyaWQgPSBudWxsO1xuICAgIHRoaXMuZWxldmF0aW9uV2FsbHMgPSB7fTtcbiAgICB0aGlzLnRyZWVXYWxscyA9IHt9O1xuICAgIHRoaXMudHJlZSA9IHt9OyAvLyBjZW50ZXIga2V5IHRvIHBvaW50IG1hcFxuICAgIHRoaXMudHJlZV9ibG9ja3MgPSB7fTsgLy8gY2VudGVyIHRvIGNvcm5lcnMgbWFwXG4gICAgdGhpcy50cmVlX3JlbGF0aW9ucyA9IHt9OyAvLyBjb3JuZXIgdG8gY2VudGVyIG1hcFxuICAgIHRoaXMudHJlZV9lbGV2YXRpb25zID0ge307XG4gICAgdGhpcy50cmVlX3N0YXRlID0ge307XG4gICAgdGhpcy53YWxscyA9IHt9O1xuICAgIHRoaXMucmFkaXVzID0gdGhpcy5vcHRzLnJhZGl1cyB8fCBwYXJzZUludCgxNjAwIC8gNjQpO1xuICAgIHRoaXMubGlnaHRzID0ge307XG4gICAgdGhpcy53b3JsZE1pblggPSB3b3JsZGRhdGEud29ybGRNaW5YO1xuICAgIHRoaXMud29ybGRNaW5ZID0gd29ybGRkYXRhLndvcmxkTWluWTtcbiAgICB0aGlzLndvcmxkTWF4WCA9IHdvcmxkZGF0YS53b3JsZE1heFg7XG4gICAgdGhpcy53b3JsZE1heFkgPSB3b3JsZGRhdGEud29ybGRNYXhZO1xuICAgIHRoaXMud29ybGRXaWR0aCA9IHRoaXMud29ybGRNYXhYIC0gdGhpcy53b3JsZE1pblg7XG4gICAgdGhpcy53b3JsZEhlaWdodCA9IHRoaXMud29ybGRNYXhZIC0gdGhpcy53b3JsZE1pblk7XG4gICAgdGhpcy5ncmlkV2lkdGggPSB0aGlzLndvcmxkV2lkdGggLyA2NCArIDE7XG4gICAgdGhpcy5ncmlkSGVpZ2h0ID0gdGhpcy53b3JsZEhlaWdodCAvIDY0ICsgMTtcbiAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgdGhpcy5hcmVhID0gMDtcbiAgICBcbiAgICB0aGlzLmltYWdlSGFuZGxlciA9IG5ldyBJbWFnZUhhbmRsZXIobWFwRGF0YUltYWdlUGF0aCk7XG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmltYWdlSGFuZGxlci5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHQyID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2ltYWdlIGxvYWQnLCB0MiAtIHQxICsgJ21zJyk7XG4gICAgICAgIHNlbGYuZ3JpZG5hdiA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoICogMiwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgYmxhY2tQaXhlbEhhbmRsZXIpO1xuICAgICAgICBzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGggKiAzLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBibGFja1BpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYudG9vbHNfbm9fd2FyZHMgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCAqIDQsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGJsYWNrUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIHRyZWVFbGV2YXRpb25QaXhlbEhhbmRsZXIpO1xuICAgICAgICBzZWxmLmVsZXZhdGlvbkdyaWQgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCAwLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBlbGV2YXRpb25QaXhlbEhhbmRsZXIpO1xuICAgICAgICB2YXIgdDMgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2UgcHJvY2VzcycsIHQzIC0gdDIgKyAnbXMnKTtcbiAgICAgICAgc2VsZi5lbGV2YXRpb25WYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAvL3NlbGYuZWxldmF0aW9uV2FsbHNbZWxldmF0aW9uXSA9IGdlbmVyYXRlRWxldmF0aW9uV2FsbHMoc2VsZi5lbGV2YXRpb25HcmlkLCBlbGV2YXRpb24pO1xuICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXSA9IHt9O1xuICAgICAgICAgICAgc2V0VHJlZVdhbGxzKHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl0sIGVsZXZhdGlvbiwgc2VsZi50cmVlLCBzZWxmLnRyZWVfZWxldmF0aW9ucywgc2VsZi50cmVlX3N0YXRlLCBzZWxmLnRyZWVfYmxvY2tzKVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHQ0ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3dhbGxzIGdlbmVyYXRpb24nLCB0NCAtIHQzICsgJ21zJyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZi5ncmlkV2lkdGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZi5ncmlkW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlbGYuZ3JpZEhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB0ID0geHkycHQoaSwgaik7XG4gICAgICAgICAgICAgICAga2V5MnB0X2NhY2hlW3B0LmtleV0gPSBwdDtcbiAgICAgICAgICAgICAgICBzZWxmLmdyaWRbaV0ucHVzaChwdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHQ1ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc29sZS5sb2coJ2NhY2hlIHByaW1lJywgdDUgLSB0NCArICdtcycpO1xuICAgICAgICBzZWxmLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgb25SZWFkeSgpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VJbWFnZShpbWFnZUhhbmRsZXIsIG9mZnNldCwgd2lkdGgsIGhlaWdodCwgcGl4ZWxIYW5kbGVyKSB7XG4gICAgICAgIHZhciBncmlkID0ge307XG4gICAgICAgIGltYWdlSGFuZGxlci5zY2FuKG9mZnNldCwgd2lkdGgsIGhlaWdodCwgcGl4ZWxIYW5kbGVyLCBncmlkKTtcbiAgICAgICAgcmV0dXJuIGdyaWQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmxhY2tQaXhlbEhhbmRsZXIoeCwgeSwgcCwgZ3JpZCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLkltYWdlWFl0b0dyaWRYWSh4LCB5KTtcbiAgICAgICAgaWYgKHBbMF0gPT09IDApIHtcbiAgICAgICAgICAgIGdyaWRbcHQueCArIFwiLFwiICsgcHQueV0gPSBwdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuICAgIGZ1bmN0aW9uIGVsZXZhdGlvblBpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBwdC56ID0gcFswXTtcbiAgICAgICAgZ3JpZFtwdC54ICsgXCIsXCIgKyBwdC55XSA9IHB0O1xuICAgICAgICBpZiAoc2VsZi5lbGV2YXRpb25WYWx1ZXMuaW5kZXhPZihwWzBdKSA9PSAtMSkge1xuICAgICAgICAgICAgc2VsZi5lbGV2YXRpb25WYWx1ZXMucHVzaChwWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyZWVFbGV2YXRpb25QaXhlbEhhbmRsZXIoeCwgeSwgcCwgZ3JpZCkge1xuICAgICAgICB2YXIgcHQgPSBzZWxmLkltYWdlWFl0b0dyaWRYWSh4LCB5KTtcbiAgICAgICAgaWYgKHBbMV0gPT0gMCAmJiBwWzJdID09IDApIHtcbiAgICAgICAgICAgIC8vIHRyZWVzIGFyZSAyeDIgaW4gZ3JpZFxuICAgICAgICAgICAgLy8gdHJlZSBvcmlnaW5zIHJvdW5kZWQgdXAgd2hlbiBjb252ZXJ0ZWQgdG8gZ3JpZCwgc28gdGhleSByZXByZXNlbnQgdG9wIHJpZ2h0IGNvcm5lci4gc3VidHJhY3QgMC41IHRvIGdldCBncmlkIG9yaWdpblxuICAgICAgICAgICAgdmFyIHRyZWVPcmlnaW4gPSB4eTJwdChwdC54IC0gMC41LCBwdC55IC0gMC41KTtcbiAgICAgICAgICAgIHZhciB0cmVlRWxldmF0aW9uID0gcFswXSArIDQwO1xuICAgICAgICAgICAgdmFyIGtDID0gdHJlZU9yaWdpbi5rZXk7XG4gICAgICAgICAgICBzZWxmLnRyZWVba0NdID0gdHJlZU9yaWdpbjtcbiAgICAgICAgICAgIHNlbGYudHJlZV9lbGV2YXRpb25zW2tDXSA9IHRyZWVFbGV2YXRpb247XG4gICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW2tDXSA9IFtdO1xuICAgICAgICAgICAgc2VsZi50cmVlX3N0YXRlW2tDXSA9IHRydWU7XG4gICAgICAgICAgICAvLyBpdGVyYXRlIHRocm91Z2ggdHJlZSAyeDIgYnkgdGFraW5nIGZsb29yIGFuZCBjZWlsIG9mIHRyZWUgZ3JpZCBvcmlnaW5cbiAgICAgICAgICAgIFtNYXRoLmZsb29yLCBNYXRoLmNlaWxdLmZvckVhY2goZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgICAgICBbTWF0aC5mbG9vciwgTWF0aC5jZWlsXS5mb3JFYWNoKGZ1bmN0aW9uIChqKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmVlQ29ybmVyID0geHkycHQoaSh0cmVlT3JpZ2luLngpLCBqKHRyZWVPcmlnaW4ueSkpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfcmVsYXRpb25zW3RyZWVDb3JuZXIua2V5XSA9IChzZWxmLnRyZWVfcmVsYXRpb25zW3RyZWVDb3JuZXIua2V5XSB8fCBbXSkuY29uY2F0KHRyZWVPcmlnaW4pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW2tDXS5wdXNoKHRyZWVDb3JuZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxpZ2h0UGFzc2VzQ2FsbGJhY2sgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIga2V5ID0geCArICcsJyArIHk7XG4gICAgICAgIHJldHVybiAhKGtleSBpbiBzZWxmLmVsZXZhdGlvbldhbGxzW3NlbGYuZWxldmF0aW9uXSkgJiYgIShrZXkgaW4gc2VsZi5lbnRfZm93X2Jsb2NrZXJfbm9kZSkgJiYgIShrZXkgaW4gc2VsZi50cmVlV2FsbHNbc2VsZi5lbGV2YXRpb25dICYmIHNlbGYudHJlZVdhbGxzW3NlbGYuZWxldmF0aW9uXVtrZXldLmxlbmd0aCA+IDApIDtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5mb3YgPSBuZXcgUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZyh0aGlzLmxpZ2h0UGFzc2VzQ2FsbGJhY2ssIHt0b3BvbG9neTo4fSk7XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS51cGRhdGVWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKGdYLCBnWSwgcmFkaXVzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBrZXkgPSB4eTJrZXkoZ1gsIGdZKTtcblxuICAgIHJhZGl1cyA9IHJhZGl1cyB8fCBzZWxmLnJhZGl1cztcbiAgICB0aGlzLmVsZXZhdGlvbiA9IHRoaXMuZWxldmF0aW9uR3JpZFtrZXldLno7XG4gICAgdGhpcy53YWxscyA9IHRoaXMudHJlZVdhbGxzW3RoaXMuZWxldmF0aW9uXTtcbiAgICBpZiAoIXRoaXMuZWxldmF0aW9uV2FsbHNbdGhpcy5lbGV2YXRpb25dKSB0aGlzLmVsZXZhdGlvbldhbGxzW3RoaXMuZWxldmF0aW9uXSA9IGdlbmVyYXRlRWxldmF0aW9uV2FsbHModGhpcy5lbGV2YXRpb25HcmlkLCB0aGlzLmVsZXZhdGlvbik7XG4gICAgLy9zZXRFbGV2YXRpb25XYWxscyh0aGlzLndhbGxzLCB0aGlzLmVsZXZhdGlvbldhbGxzLCB0aGlzLmVsZXZhdGlvbilcbiAgICAvL3NldFdhbGxzKHRoaXMud2FsbHMsIHRoaXMuZW50X2Zvd19ibG9ja2VyX25vZGUpO1xuICAgIC8vc2V0V2FsbHModGhpcy53YWxscywgdGhpcy50b29sc19ub193YXJkcyk7XG4gICAgLy9zZXRUcmVlV2FsbHModGhpcy53YWxscywgdGhpcy5lbGV2YXRpb24sIHRoaXMudHJlZSwgdGhpcy50cmVlX2VsZXZhdGlvbnMsIHRoaXMudHJlZV9zdGF0ZSwgdGhpcy50cmVlX2Jsb2Nrcyk7XG5cbiAgICB0aGlzLmZvdi53YWxscyA9IHRoaXMud2FsbHM7XG4gICAgdGhpcy5saWdodHMgPSB7fTtcbiAgICB0aGlzLmFyZWEgPSB0aGlzLmZvdi5jb21wdXRlKGdYLCBnWSwgcmFkaXVzLCBmdW5jdGlvbih4MiwgeTIsIHIsIHZpcykge1xuICAgICAgICB2YXIga2V5ID0geHkya2V5KHgyLCB5Mik7XG4gICAgICAgIGlmICghc2VsZi5lbGV2YXRpb25HcmlkW2tleV0pIHJldHVybjtcbiAgICAgICAgdmFyIHRyZWVQdHMgPSBzZWxmLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgICAgIHZhciB0cmVlQmxvY2tpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJlZVB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgIHRyZWVCbG9ja2luZyA9IHNlbGYudHJlZV9zdGF0ZVt0cmVlUHQua2V5XSAmJiBzZWxmLnRyZWVfZWxldmF0aW9uc1t0cmVlUHQua2V5XSA+IHNlbGYuZWxldmF0aW9uO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlQmxvY2tpbmcpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2aXMgPT0gMSAmJiAhc2VsZi5lbnRfZm93X2Jsb2NrZXJfbm9kZVtrZXldICYmICF0cmVlQmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHNlbGYubGlnaHRzW2tleV0gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmxpZ2h0QXJlYSA9IE9iamVjdC5rZXlzKHRoaXMubGlnaHRzKS5sZW5ndGg7XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLmlzVmFsaWRYWSA9IGZ1bmN0aW9uICh4LCB5LCBiQ2hlY2tHcmlkbmF2LCBiQ2hlY2tUb29sc05vV2FyZHMsIGJDaGVja1RyZWVTdGF0ZSkge1xuICAgIGlmICghdGhpcy5yZWFkeSkgcmV0dXJuIGZhbHNlO1xuICAgIFxuICAgIHZhciBrZXkgPSB4eTJrZXkoeCwgeSksXG4gICAgICAgIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICBcbiAgICBpZiAoYkNoZWNrVHJlZVN0YXRlKSB7XG4gICAgICAgIHZhciB0cmVlUHRzID0gdGhpcy50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgICAgICBpZiAodHJlZVB0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyZWVQdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gdGhpcy50cmVlX3N0YXRlW3RyZWVQdC5rZXldO1xuICAgICAgICAgICAgICAgIGlmICh0cmVlQmxvY2tpbmcpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB4ID49IDAgJiYgeCA8IHRoaXMuZ3JpZFdpZHRoICYmIHkgPj0gMCAmJiB5IDwgdGhpcy5ncmlkSGVpZ2h0ICYmICghYkNoZWNrR3JpZG5hdiB8fCAhdGhpcy5ncmlkbmF2W2tleV0pICYmICghYkNoZWNrVG9vbHNOb1dhcmRzIHx8ICF0aGlzLnRvb2xzX25vX3dhcmRzW2tleV0pICYmICghYkNoZWNrVHJlZVN0YXRlIHx8ICF0cmVlQmxvY2tpbmcpO1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS50b2dnbGVUcmVlID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGtleSA9IHh5MmtleSh4LCB5KTtcbiAgICB2YXIgaXNUcmVlID0gISF0aGlzLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgaWYgKGlzVHJlZSkge1xuICAgICAgICB2YXIgdHJlZVB0cyA9IHRoaXMudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgdGhpcy50cmVlX3N0YXRlW3B0LmtleV0gPSAhdGhpcy50cmVlX3N0YXRlW3B0LmtleV07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZWxldmF0aW9uVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKGVsZXZhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmIChlbGV2YXRpb24gPCBzZWxmLnRyZWVfZWxldmF0aW9uc1twdC5rZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3NbcHQua2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChwdEIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHB0LnggPT0gc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XVtqXVsxXSAmJiBwdC55ID09IHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV1bal1bMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XS5zcGxpY2UoaiwgMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGYudHJlZV9zdGF0ZVtwdC5rZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVfYmxvY2tzW3B0LmtleV0uZm9yRWFjaChmdW5jdGlvbiAocHRCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XSA9IChzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldIHx8IFtdKS5jb25jYXQoW1sndHJlZScsIHB0LngsIHB0LnksIE1hdGguU1FSVDJdXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGlzVHJlZTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnNldFJhZGl1cyA9IGZ1bmN0aW9uIChyKSB7XG4gICAgdGhpcy5yYWRpdXMgPSByO1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuV29ybGRYWXRvR3JpZFhZID0gZnVuY3Rpb24gKHdYLCB3WSwgYk5vUm91bmQpIHtcbiAgICB2YXIgeCA9ICh3WCAtIHRoaXMud29ybGRNaW5YKSAvIDY0LFxuICAgICAgICB5ID0gKHdZIC0gdGhpcy53b3JsZE1pblkpIC8gNjQ7XG4gICAgaWYgKCFiTm9Sb3VuZCkge1xuICAgICAgICB4ID0gcGFyc2VJbnQoTWF0aC5yb3VuZCh4KSlcbiAgICAgICAgeSA9IHBhcnNlSW50KE1hdGgucm91bmQoeSkpXG4gICAgfVxuICAgIHJldHVybiB7eDogeCwgeTogeSwga2V5OiB4ICsgJywnICsgeX07XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5HcmlkWFl0b1dvcmxkWFkgPSBmdW5jdGlvbiAoZ1gsIGdZKSB7XG4gICAgcmV0dXJuIHt4OiBnWCAqIDY0ICsgdGhpcy53b3JsZE1pblgsIHk6IGdZICogNjQgKyB0aGlzLndvcmxkTWluWX07XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkdyaWRYWXRvSW1hZ2VYWSA9IGZ1bmN0aW9uIChnWCwgZ1kpIHtcbiAgICByZXR1cm4ge3g6IGdYLCB5OiB0aGlzLmdyaWRIZWlnaHQgLSBnWSAtIDF9O1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5JbWFnZVhZdG9HcmlkWFkgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBnWSA9IHRoaXMuZ3JpZEhlaWdodCAtIHkgLSAxO1xuICAgIHJldHVybiB7eDogeCwgeTogZ1ksIGtleTogeCArICcsJyArIGdZfTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuV29ybGRYWXRvSW1hZ2VYWSA9IGZ1bmN0aW9uICh3WCwgd1kpIHtcbiAgICB2YXIgcHQgPSB0aGlzLldvcmxkWFl0b0dyaWRYWSh3WCwgd1kpO1xuICAgIHJldHVybiB0aGlzLkdyaWRYWXRvSW1hZ2VYWShwdC54LCBwdC55KTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUua2V5MnB0ID0ga2V5MnB0O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkya2V5ID0geHkya2V5O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUueHkycHQgPSB4eTJwdDtcblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnB0MmtleSA9IHB0MmtleTtcblxubW9kdWxlLmV4cG9ydHMgPSBWaXNpb25TaW11bGF0aW9uOyIsIm1vZHVsZS5leHBvcnRzPXtcIndvcmxkTWluWFwiOi04Mjg4LFwid29ybGRNYXhYXCI6ODI4OCxcIndvcmxkTWluWVwiOi04Mjg4LFwid29ybGRNYXhZXCI6ODI4OH0iXX0=
