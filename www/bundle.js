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
    ignoredMessages: [
        "SecurityError: DOM Exception 18: An attempt was made to break through the security policy of the user agent.",
        "SecurityError:  An attempt was made to break through the security policy of the user agent."
    ],
    payload: {
        environment: 'development',
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: "b9655e0ae7e1cdf99b4913b1154fd1bb4e4422bf",
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
        mapBounds = new OpenLayers.Bounds(0, 0, mapConstants.map_w, mapConstants.map_h),
        map = new OpenLayers.Map("map1", {
            theme: null,
            maxExtent: mapBounds,
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
        console.log('handleTreeMarkerClick', this);
        setTreeMarkerState(this, !this.treeVisible);
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
            if (marker) QueryString.addQueryStringValue(marker.ward_type, marker.ward_loc);
        }
    }

    function placeWard(latlon, entityName, qs_value_worldXY) {
        if (!mapBounds.containsLonLat(latlon)) return;
        var entity = ENTITIES[entityName],
            marker = createWardMarker(entity.icon_path, latlon),
            circle = OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat), getScaledRadius(entity.radius), 40),
            feature = new OpenLayers.Feature.Vector(circle);
        iconLayer.addMarker(marker);
        wardVisionLayer.addFeatures(feature);
        marker.radius_feature = feature;
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
        iconLayer.removeMarker(this);
        OpenLayers.Event.stop(event);

        QueryString.removeQueryStringValue(this.ward_type, this.ward_loc);
        
        this.events.unregister("click", this, wardMarkerRemove);
        this.events.unregister("touchstart", this, wardMarkerRemove);
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
        /*if (wardVisionLayer.cursor_marker) {
            if (wardVisionLayer.cursor_marker.vision_center_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_center_feature);
            if (wardVisionLayer.cursor_marker.vision_feature) wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker.vision_feature);
            wardVisionLayer.removeFeatures(wardVisionLayer.cursor_marker);
        }*/
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
        if (!vs.ready) return;
        
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
    
    var getSizePoll;
    var t1 = Date.now();
    var vs = new VisionSimulation(worlddata, vision_data_image_path, function () {
        console.log('vs loaded', Date.now() - t1);
        console.log('map.getSize()', map.getSize());
        initCheck();
    });
    
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
},{"./imageHandler.js":9,"./rot6.js":12}],14:[function(require,module,exports){
module.exports={"worldMinX":-8288,"worldMaxX":8288,"worldMinY":-8288,"worldMaxY":8288}
},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcm9sbGJhci1icm93c2VyL2Rpc3Qvcm9sbGJhci51bWQubm9qc29uLm1pbi5qcyIsInNyYy9hcHAuanMiLCJzcmMvY29udmVyc2lvbkZ1bmN0aW9ucy5qcyIsInNyYy9nZXRMaWdodFVuaW9uLmpzIiwic3JjL21hcENvbnN0YW50cy5qcyIsInNyYy9zdHlsZUNvbnN0YW50cy5qcyIsInNyYy91dGlsL3F1ZXJ5U3RyaW5nLmpzIiwic3JjL3V0aWwvdHJpbS5qcyIsIi4uL2RvdGEtdmlzaW9uLXNpbXVsYXRpb24vYnJvd3Nlci9pbWFnZUhhbmRsZXIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL2Jyb3dzZXIvcG5nLmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9icm93c2VyL3psaWIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy9yb3Q2LmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvdmlzaW9uLXNpbXVsYXRpb24uanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxbUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hUQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24oZSxyKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1yKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHIpO2Vsc2V7dmFyIHQ9cigpO2Zvcih2YXIgbiBpbiB0KShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW25dPXRbbl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2V4cG9ydHM6e30saWQ6bixsb2FkZWQ6ITF9O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgdD17fTtyZXR1cm4gci5tPWUsci5jPXQsci5wPVwiXCIscigwKX0oW2Z1bmN0aW9uKGUscix0KXtlLmV4cG9ydHM9dCgxKX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXt2YXIgZT1cInVuZGVmaW5lZFwiPT10eXBlb2YgSlNPTj97fTpKU09OO28uc2V0dXBKU09OKGUpfXZhciBvPXQoMiksaT10KDMpO24oKTt2YXIgYT13aW5kb3cuX3JvbGxiYXJDb25maWcscz1hJiZhLmdsb2JhbEFsaWFzfHxcIlJvbGxiYXJcIix1PXdpbmRvd1tzXSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvd1tzXS5zaGltSWQ7IXUmJmE/by53cmFwcGVyLmluaXQoYSk6KHdpbmRvdy5Sb2xsYmFyPW8ud3JhcHBlcix3aW5kb3cuUm9sbGJhck5vdGlmaWVyPWkuTm90aWZpZXIpLGUuZXhwb3J0cz1vLndyYXBwZXJ9LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUscix0KXshdFs0XSYmd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yJiYodFs0XT13aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3Isd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yPW51bGwpLGUudW5jYXVnaHRFcnJvci5hcHBseShlLHQpLHImJnIuYXBwbHkod2luZG93LHQpfWZ1bmN0aW9uIG8oZSxyKXtpZihyLmhhc093blByb3BlcnR5JiZyLmhhc093blByb3BlcnR5KFwiYWRkRXZlbnRMaXN0ZW5lclwiKSl7dmFyIHQ9ci5hZGRFdmVudExpc3RlbmVyO3IuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihyLG4sbyl7dC5jYWxsKHRoaXMscixlLndyYXAobiksbyl9O3ZhciBuPXIucmVtb3ZlRXZlbnRMaXN0ZW5lcjtyLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oZSxyLHQpe24uY2FsbCh0aGlzLGUsciYmci5fd3JhcHBlZHx8cix0KX19fXZhciBpPXQoMyksYT10KDgpLHM9aS5Ob3RpZmllcjt3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3I9bnVsbDt2YXIgdT17fTt1LmluaXQ9ZnVuY3Rpb24oZSxyKXt2YXIgdD1uZXcgcyhyKTtpZih0LmNvbmZpZ3VyZShlKSxlLmNhcHR1cmVVbmNhdWdodCl7dmFyIGk7ciYmYS5pc1R5cGUoci5fcm9sbGJhck9sZE9uRXJyb3IsXCJmdW5jdGlvblwiKT9pPXIuX3JvbGxiYXJPbGRPbkVycm9yOndpbmRvdy5vbmVycm9yJiYhd2luZG93Lm9uZXJyb3IuYmVsb25nc1RvU2hpbSYmKGk9d2luZG93Lm9uZXJyb3IpLHdpbmRvdy5vbmVycm9yPWZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO24odCxpLGUpfTt2YXIgdSxjLGw9W1wiRXZlbnRUYXJnZXRcIixcIldpbmRvd1wiLFwiTm9kZVwiLFwiQXBwbGljYXRpb25DYWNoZVwiLFwiQXVkaW9UcmFja0xpc3RcIixcIkNoYW5uZWxNZXJnZXJOb2RlXCIsXCJDcnlwdG9PcGVyYXRpb25cIixcIkV2ZW50U291cmNlXCIsXCJGaWxlUmVhZGVyXCIsXCJIVE1MVW5rbm93bkVsZW1lbnRcIixcIklEQkRhdGFiYXNlXCIsXCJJREJSZXF1ZXN0XCIsXCJJREJUcmFuc2FjdGlvblwiLFwiS2V5T3BlcmF0aW9uXCIsXCJNZWRpYUNvbnRyb2xsZXJcIixcIk1lc3NhZ2VQb3J0XCIsXCJNb2RhbFdpbmRvd1wiLFwiTm90aWZpY2F0aW9uXCIsXCJTVkdFbGVtZW50SW5zdGFuY2VcIixcIlNjcmVlblwiLFwiVGV4dFRyYWNrXCIsXCJUZXh0VHJhY2tDdWVcIixcIlRleHRUcmFja0xpc3RcIixcIldlYlNvY2tldFwiLFwiV2ViU29ja2V0V29ya2VyXCIsXCJXb3JrZXJcIixcIlhNTEh0dHBSZXF1ZXN0XCIsXCJYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0XCIsXCJYTUxIdHRwUmVxdWVzdFVwbG9hZFwiXTtmb3IodT0wO3U8bC5sZW5ndGg7Kyt1KWM9bFt1XSx3aW5kb3dbY10mJndpbmRvd1tjXS5wcm90b3R5cGUmJm8odCx3aW5kb3dbY10ucHJvdG90eXBlKX1yZXR1cm4gZS5jYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9ucyYmKHImJmEuaXNUeXBlKHIuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIsXCJmdW5jdGlvblwiKSYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIixyLl91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKSx0Ll91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyPWZ1bmN0aW9uKGUpe3ZhciByPWUucmVhc29uLG49ZS5wcm9taXNlLG89ZS5kZXRhaWw7IXImJm8mJihyPW8ucmVhc29uLG49by5wcm9taXNlKSx0LnVuaGFuZGxlZFJlamVjdGlvbihyLG4pfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLHQuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIpKSx3aW5kb3cuUm9sbGJhcj10LHMucHJvY2Vzc1BheWxvYWRzKCksdH0sZS5leHBvcnRzPXt3cmFwcGVyOnUsc2V0dXBKU09OOmkuc2V0dXBKU09OfX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7RT1lLHcuc2V0dXBKU09OKGUpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1yfHx0aGlzO3RyeXtyZXR1cm4gZS5hcHBseSh0LGFyZ3VtZW50cyl9Y2F0Y2gobil7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTpcIixuKX19fWZ1bmN0aW9uIGkoKXtofHwoaD1zZXRUaW1lb3V0KGYsMWUzKSl9ZnVuY3Rpb24gYSgpe3JldHVybiBffWZ1bmN0aW9uIHMoZSl7Xz1ffHx0aGlzO3ZhciByPVwiaHR0cHM6Ly9cIitzLkRFRkFVTFRfRU5EUE9JTlQ7dGhpcy5vcHRpb25zPXtlbmFibGVkOiEwLGVuZHBvaW50OnIsZW52aXJvbm1lbnQ6XCJwcm9kdWN0aW9uXCIsc2NydWJGaWVsZHM6ZyhbXSxzLkRFRkFVTFRfU0NSVUJfRklFTERTKSxjaGVja0lnbm9yZTpudWxsLGxvZ0xldmVsOnMuREVGQVVMVF9MT0dfTEVWRUwscmVwb3J0TGV2ZWw6cy5ERUZBVUxUX1JFUE9SVF9MRVZFTCx1bmNhdWdodEVycm9yTGV2ZWw6cy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMLHBheWxvYWQ6e319LHRoaXMubGFzdEVycm9yPW51bGwsdGhpcy5wbHVnaW5zPXt9LHRoaXMucGFyZW50Tm90aWZpZXI9ZSxlJiYoZS5oYXNPd25Qcm9wZXJ0eShcInNoaW1JZFwiKT9lLm5vdGlmaWVyPXRoaXM6dGhpcy5jb25maWd1cmUoZS5vcHRpb25zKSl9ZnVuY3Rpb24gdShlKXt3aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWUucHVzaChlKSxpKCl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gbyhmdW5jdGlvbigpe3ZhciByPXRoaXMuX2dldExvZ0FyZ3MoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy5fbG9nKGV8fHIubGV2ZWx8fHRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxyLm1lc3NhZ2Usci5lcnIsci5jdXN0b20sci5jYWxsYmFjayl9KX1mdW5jdGlvbiBsKGUscil7ZXx8KGU9cj9FLnN0cmluZ2lmeShyKTpcIlwiKTt2YXIgdD17Ym9keTplfTtyZXR1cm4gciYmKHQuZXh0cmE9ZyghMCx7fSxyKSkse21lc3NhZ2U6dH19ZnVuY3Rpb24gcChlLHIsdCl7dmFyIG49bS5ndWVzc0Vycm9yQ2xhc3Moci5tZXNzYWdlKSxvPXIubmFtZXx8blswXSxpPW5bMV0sYT17ZXhjZXB0aW9uOntcImNsYXNzXCI6byxtZXNzYWdlOml9fTtpZihlJiYoYS5leGNlcHRpb24uZGVzY3JpcHRpb249ZXx8XCJ1bmNhdWdodCBleGNlcHRpb25cIiksci5zdGFjayl7dmFyIHMsdSxjLHAsZixkLGgsdztmb3IoYS5mcmFtZXM9W10saD0wO2g8ci5zdGFjay5sZW5ndGg7KytoKXM9ci5zdGFja1toXSx1PXtmaWxlbmFtZTpzLnVybD92LnNhbml0aXplVXJsKHMudXJsKTpcIih1bmtub3duKVwiLGxpbmVubzpzLmxpbmV8fG51bGwsbWV0aG9kOnMuZnVuYyYmXCI/XCIhPT1zLmZ1bmM/cy5mdW5jOlwiW2Fub255bW91c11cIixjb2xubzpzLmNvbHVtbn0sYz1wPWY9bnVsbCxkPXMuY29udGV4dD9zLmNvbnRleHQubGVuZ3RoOjAsZCYmKHc9TWF0aC5mbG9vcihkLzIpLHA9cy5jb250ZXh0LnNsaWNlKDAsdyksYz1zLmNvbnRleHRbd10sZj1zLmNvbnRleHQuc2xpY2UodykpLGMmJih1LmNvZGU9YyksKHB8fGYpJiYodS5jb250ZXh0PXt9LHAmJnAubGVuZ3RoJiYodS5jb250ZXh0LnByZT1wKSxmJiZmLmxlbmd0aCYmKHUuY29udGV4dC5wb3N0PWYpKSxzLmFyZ3MmJih1LmFyZ3M9cy5hcmdzKSxhLmZyYW1lcy5wdXNoKHUpO3JldHVybiBhLmZyYW1lcy5yZXZlcnNlKCksdCYmKGEuZXh0cmE9ZyghMCx7fSx0KSkse3RyYWNlOmF9fXJldHVybiBsKG8rXCI6IFwiK2ksdCl9ZnVuY3Rpb24gZigpe3ZhciBlO3RyeXtmb3IoO2U9d2luZG93Ll9yb2xsYmFyUGF5bG9hZFF1ZXVlLnNoaWZ0KCk7KWQoZSl9ZmluYWxseXtoPXZvaWQgMH19ZnVuY3Rpb24gZChlKXt2YXIgcj1lLmVuZHBvaW50VXJsLHQ9ZS5hY2Nlc3NUb2tlbixuPWUucGF5bG9hZCxvPWUuY2FsbGJhY2t8fGZ1bmN0aW9uKCl7fSxpPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2ktTD49NmU0JiYoTD1pLFI9MCk7dmFyIGE9d2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5tYXhJdGVtcyxjPXdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMuaXRlbXNQZXJNaW51dGUsbD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYT49MSYmVD49YX0scD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYz49MSYmUj49Y307cmV0dXJuIGwoKT92b2lkIG8obmV3IEVycm9yKGErXCIgbWF4IGl0ZW1zIHJlYWNoZWRcIikpOnAoKT92b2lkIG8obmV3IEVycm9yKGMrXCIgaXRlbXMgcGVyIG1pbnV0ZSByZWFjaGVkXCIpKTooVCsrLFIrKyxsKCkmJl8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwibWF4SXRlbXMgaGFzIGJlZW4gaGl0LiBJZ25vcmluZyBlcnJvcnMgZm9yIHRoZSByZW1haW5kZXIgb2YgdGhlIGN1cnJlbnQgcGFnZSBsb2FkLlwiLG51bGwse21heEl0ZW1zOmF9LG51bGwsITEsITApLG4uaWdub3JlUmF0ZUxpbWl0JiZkZWxldGUgbi5pZ25vcmVSYXRlTGltaXQsdm9pZCB5LnBvc3Qocix0LG4sZnVuY3Rpb24ocix0KXtyZXR1cm4gcj8ociBpbnN0YW5jZW9mIGImJihlLmNhbGxiYWNrPWZ1bmN0aW9uKCl7fSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dShlKX0scy5SRVRSWV9ERUxBWSkpLG8ocikpOm8obnVsbCx0KX0pKX12YXIgaCxnPXQoNCksbT10KDUpLHY9dCg4KSx3PXQoMTApLHk9dy5YSFIsYj13LkNvbm5lY3Rpb25FcnJvcixFPW51bGw7cy5OT1RJRklFUl9WRVJTSU9OPVwiMS45LjJcIixzLkRFRkFVTFRfRU5EUE9JTlQ9XCJhcGkucm9sbGJhci5jb20vYXBpLzEvXCIscy5ERUZBVUxUX1NDUlVCX0ZJRUxEUz1bXCJwd1wiLFwicGFzc1wiLFwicGFzc3dkXCIsXCJwYXNzd29yZFwiLFwic2VjcmV0XCIsXCJjb25maXJtX3Bhc3N3b3JkXCIsXCJjb25maXJtUGFzc3dvcmRcIixcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFwicGFzc3dvcmRDb25maXJtYXRpb25cIixcImFjY2Vzc190b2tlblwiLFwiYWNjZXNzVG9rZW5cIixcInNlY3JldF9rZXlcIixcInNlY3JldEtleVwiLFwic2VjcmV0VG9rZW5cIl0scy5ERUZBVUxUX0xPR19MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1JFUE9SVF9MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMPVwiZXJyb3JcIixzLkRFRkFVTFRfSVRFTVNfUEVSX01JTj02MCxzLkRFRkFVTFRfTUFYX0lURU1TPTAscy5MRVZFTFM9e2RlYnVnOjAsaW5mbzoxLHdhcm5pbmc6MixlcnJvcjozLGNyaXRpY2FsOjR9LHMuUkVUUllfREVMQVk9MWU0LHdpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZT13aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWV8fFtdLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnM9e3N0YXJ0VGltZToobmV3IERhdGUpLmdldFRpbWUoKSxtYXhJdGVtczpzLkRFRkFVTFRfTUFYX0lURU1TLGl0ZW1zUGVyTWludXRlOnMuREVGQVVMVF9JVEVNU19QRVJfTUlOfTt2YXIgXyx4PXMucHJvdG90eXBlO3guX2dldExvZ0FyZ3M9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixpLGEsdSxjPXRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxsPVtdLHA9MDtwPGUubGVuZ3RoOysrcCl1PWVbcF0sYT12LnR5cGVOYW1lKHUpLFwic3RyaW5nXCI9PT1hP3I/bC5wdXNoKHUpOnI9dTpcImZ1bmN0aW9uXCI9PT1hP2k9byh1LHRoaXMpOlwiZGF0ZVwiPT09YT9sLnB1c2godSk6XCJlcnJvclwiPT09YXx8dSBpbnN0YW5jZW9mIEVycm9yfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgRE9NRXhjZXB0aW9uJiZ1IGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uP3Q/bC5wdXNoKHUpOnQ9dTpcIm9iamVjdFwiIT09YSYmXCJhcnJheVwiIT09YXx8KG4/bC5wdXNoKHUpOm49dSk7cmV0dXJuIGwubGVuZ3RoJiYobj1ufHx7fSxuLmV4dHJhQXJncz1sKSx7bGV2ZWw6YyxtZXNzYWdlOnIsZXJyOnQsY3VzdG9tOm4sY2FsbGJhY2s6aX19LHguX3JvdXRlPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXMub3B0aW9ucy5lbmRwb2ludCx0PS9cXC8kLy50ZXN0KHIpLG49L15cXC8vLnRlc3QoZSk7cmV0dXJuIHQmJm4/ZT1lLnN1YnN0cmluZygxKTp0fHxufHwoZT1cIi9cIitlKSxyK2V9LHguX3Byb2Nlc3NTaGltUXVldWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixvLGksYSx1LGM9e307dD1lLnNoaWZ0KCk7KXI9dC5zaGltLG49dC5tZXRob2Qsbz10LmFyZ3MsaT1yLnBhcmVudFNoaW0sdT1jW3Iuc2hpbUlkXSx1fHwoaT8oYT1jW2kuc2hpbUlkXSx1PW5ldyBzKGEpKTp1PXRoaXMsY1tyLnNoaW1JZF09dSksdVtuXSYmdi5pc1R5cGUodVtuXSxcImZ1bmN0aW9uXCIpJiZ1W25dLmFwcGx5KHUsbyl9LHguX2J1aWxkUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuLG8pe3ZhciBpPXRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbixhPXRoaXMub3B0aW9ucy5lbnZpcm9ubWVudCx1PWcoITAse30sdGhpcy5vcHRpb25zLnBheWxvYWQpLGM9di51dWlkNCgpO2lmKHZvaWQgMD09PXMuTEVWRUxTW3JdKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGV2ZWxcIik7aWYoIXQmJiFuJiYhbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXNzYWdlLCBzdGFjayBpbmZvIG9yIGN1c3RvbSBkYXRhXCIpO3ZhciBsPXtlbnZpcm9ubWVudDphLGVuZHBvaW50OnRoaXMub3B0aW9ucy5lbmRwb2ludCx1dWlkOmMsbGV2ZWw6cixwbGF0Zm9ybTpcImJyb3dzZXJcIixmcmFtZXdvcms6XCJicm93c2VyLWpzXCIsbGFuZ3VhZ2U6XCJqYXZhc2NyaXB0XCIsYm9keTp0aGlzLl9idWlsZEJvZHkodCxuLG8pLHJlcXVlc3Q6e3VybDp3aW5kb3cubG9jYXRpb24uaHJlZixxdWVyeV9zdHJpbmc6d2luZG93LmxvY2F0aW9uLnNlYXJjaCx1c2VyX2lwOlwiJHJlbW90ZV9pcFwifSxjbGllbnQ6e3J1bnRpbWVfbXM6ZS5nZXRUaW1lKCktd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5zdGFydFRpbWUsdGltZXN0YW1wOk1hdGgucm91bmQoZS5nZXRUaW1lKCkvMWUzKSxqYXZhc2NyaXB0Onticm93c2VyOndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LGxhbmd1YWdlOndpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UsY29va2llX2VuYWJsZWQ6d2luZG93Lm5hdmlnYXRvci5jb29raWVFbmFibGVkLHNjcmVlbjp7d2lkdGg6d2luZG93LnNjcmVlbi53aWR0aCxoZWlnaHQ6d2luZG93LnNjcmVlbi5oZWlnaHR9LHBsdWdpbnM6dGhpcy5fZ2V0QnJvd3NlclBsdWdpbnMoKX19LHNlcnZlcjp7fSxub3RpZmllcjp7bmFtZTpcInJvbGxiYXItYnJvd3Nlci1qc1wiLHZlcnNpb246cy5OT1RJRklFUl9WRVJTSU9OfX07dS5ib2R5JiZkZWxldGUgdS5ib2R5O3ZhciBwPXthY2Nlc3NfdG9rZW46aSxkYXRhOmcoITAsbCx1KX07cmV0dXJuIHRoaXMuX3NjcnViKHAuZGF0YSkscH0seC5fYnVpbGRCb2R5PWZ1bmN0aW9uKGUscix0KXt2YXIgbjtyZXR1cm4gbj1yP3AoZSxyLHQpOmwoZSx0KX0seC5fZ2V0QnJvd3NlclBsdWdpbnM9ZnVuY3Rpb24oKXtpZighdGhpcy5fYnJvd3NlclBsdWdpbnMpe3ZhciBlLHIsdD13aW5kb3cubmF2aWdhdG9yLnBsdWdpbnN8fFtdLG49dC5sZW5ndGgsbz1bXTtmb3Iocj0wO3I8bjsrK3IpZT10W3JdLG8ucHVzaCh7bmFtZTplLm5hbWUsZGVzY3JpcHRpb246ZS5kZXNjcmlwdGlvbn0pO3RoaXMuX2Jyb3dzZXJQbHVnaW5zPW99cmV0dXJuIHRoaXMuX2Jyb3dzZXJQbHVnaW5zfSx4Ll9zY3J1Yj1mdW5jdGlvbihlKXtmdW5jdGlvbiByKGUscix0LG4sbyxpKXtyZXR1cm4gcit2LnJlZGFjdChpKX1mdW5jdGlvbiB0KGUpe3ZhciB0O2lmKHYuaXNUeXBlKGUsXCJzdHJpbmdcIikpZm9yKHQ9MDt0PHMubGVuZ3RoOysrdCllPWUucmVwbGFjZShzW3RdLHIpO3JldHVybiBlfWZ1bmN0aW9uIG4oZSxyKXt2YXIgdDtmb3IodD0wO3Q8YS5sZW5ndGg7Kyt0KWlmKGFbdF0udGVzdChlKSl7cj12LnJlZGFjdChyKTticmVha31yZXR1cm4gcn1mdW5jdGlvbiBvKGUscil7dmFyIG89bihlLHIpO3JldHVybiBvPT09cj90KG8pOm99dmFyIGk9dGhpcy5vcHRpb25zLnNjcnViRmllbGRzLGE9dGhpcy5fZ2V0U2NydWJGaWVsZFJlZ2V4cyhpKSxzPXRoaXMuX2dldFNjcnViUXVlcnlQYXJhbVJlZ2V4cyhpKTtyZXR1cm4gdi50cmF2ZXJzZShlLG8pLGV9LHguX2dldFNjcnViRmllbGRSZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAocixcImlcIikpO3JldHVybiB0fSx4Ll9nZXRTY3J1YlF1ZXJ5UGFyYW1SZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAoXCIoXCIrcitcIj0pKFteJlxcXFxuXSspXCIsXCJpZ21cIikpO3JldHVybiB0fSx4Ll91cmxJc1doaXRlbGlzdGVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYyxsO3RyeXtpZihyPXRoaXMub3B0aW9ucy5ob3N0V2hpdGVMaXN0LHQ9ZSYmZS5kYXRhJiZlLmRhdGEuYm9keSYmZS5kYXRhLmJvZHkudHJhY2UsIXJ8fDA9PT1yLmxlbmd0aClyZXR1cm4hMDtpZighdClyZXR1cm4hMDtmb3Iocz1yLmxlbmd0aCxpPXQuZnJhbWVzLmxlbmd0aCxjPTA7YzxpO2MrKyl7aWYobj10LmZyYW1lc1tjXSxvPW4uZmlsZW5hbWUsIXYuaXNUeXBlKG8sXCJzdHJpbmdcIikpcmV0dXJuITA7Zm9yKGw9MDtsPHM7bCsrKWlmKGE9cltsXSx1PW5ldyBSZWdFeHAoYSksdS50ZXN0KG8pKXJldHVybiEwfX1jYXRjaChwKXtyZXR1cm4gdGhpcy5jb25maWd1cmUoe2hvc3RXaGl0ZUxpc3Q6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHJlYWRpbmcgeW91ciBjb25maWd1cmF0aW9uJ3MgaG9zdFdoaXRlTGlzdCBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBob3N0V2hpdGVMaXN0LlwiLHApLCEwfXJldHVybiExfSx4Ll9tZXNzYWdlSXNJZ25vcmVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYzt0cnl7aWYoaT0hMSxuPXRoaXMub3B0aW9ucy5pZ25vcmVkTWVzc2FnZXMsIW58fDA9PT1uLmxlbmd0aClyZXR1cm4hMTtpZihzPWUmJmUuZGF0YSYmZS5kYXRhLmJvZHksdT1zJiZzLnRyYWNlJiZzLnRyYWNlLmV4Y2VwdGlvbiYmcy50cmFjZS5leGNlcHRpb24ubWVzc2FnZSxjPXMmJnMubWVzc2FnZSYmcy5tZXNzYWdlLmJvZHkscj11fHxjLCFyKXJldHVybiExO2ZvcihvPW4ubGVuZ3RoLHQ9MDt0PG8mJihhPW5ldyBSZWdFeHAoblt0XSxcImdpXCIpLCEoaT1hLnRlc3QocikpKTt0KyspO31jYXRjaChsKXt0aGlzLmNvbmZpZ3VyZSh7aWdub3JlZE1lc3NhZ2VzOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSByZWFkaW5nIHlvdXIgY29uZmlndXJhdGlvbidzIGlnbm9yZWRNZXNzYWdlcyBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBpZ25vcmVkTWVzc2FnZXMuXCIpfXJldHVybiBpfSx4Ll9lbnF1ZXVlUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuKXt2YXIgbz17Y2FsbGJhY2s6bixhY2Nlc3NUb2tlbjp0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4sZW5kcG9pbnRVcmw6dGhpcy5fcm91dGUoXCJpdGVtL1wiKSxwYXlsb2FkOmV9LGk9ZnVuY3Rpb24oKXtpZihuKXt2YXIgZT1cIlRoaXMgaXRlbSB3YXMgbm90IHNlbnQgdG8gUm9sbGJhciBiZWNhdXNlIGl0IHdhcyBpZ25vcmVkLiBUaGlzIGNhbiBoYXBwZW4gaWYgYSBjdXN0b20gY2hlY2tJZ25vcmUoKSBmdW5jdGlvbiB3YXMgdXNlZCBvciBpZiB0aGUgaXRlbSdzIGxldmVsIHdhcyBsZXNzIHRoYW4gdGhlIG5vdGlmaWVyJyByZXBvcnRMZXZlbC4gU2VlIGh0dHBzOi8vcm9sbGJhci5jb20vZG9jcy9ub3RpZmllci9yb2xsYmFyLmpzL2NvbmZpZ3VyYXRpb24gZm9yIG1vcmUgZGV0YWlscy5cIjtuKG51bGwse2VycjowLHJlc3VsdDp7aWQ6bnVsbCx1dWlkOm51bGwsbWVzc2FnZTplfX0pfX07aWYodGhpcy5faW50ZXJuYWxDaGVja0lnbm9yZShyLHQsZSkpcmV0dXJuIHZvaWQgaSgpO3RyeXtpZih2LmlzVHlwZSh0aGlzLm9wdGlvbnMuY2hlY2tJZ25vcmUsXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmNoZWNrSWdub3JlKHIsdCxlKSlyZXR1cm4gdm9pZCBpKCl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe2NoZWNrSWdub3JlOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSBjYWxsaW5nIGN1c3RvbSBjaGVja0lnbm9yZSgpIGZ1bmN0aW9uLiBSZW1vdmluZyBjdXN0b20gY2hlY2tJZ25vcmUoKS5cIixhKX1pZih0aGlzLl91cmxJc1doaXRlbGlzdGVkKGUpJiYhdGhpcy5fbWVzc2FnZUlzSWdub3JlZChlKSl7aWYodGhpcy5vcHRpb25zLnZlcmJvc2Upe2lmKGUuZGF0YSYmZS5kYXRhLmJvZHkmJmUuZGF0YS5ib2R5LnRyYWNlKXt2YXIgcz1lLmRhdGEuYm9keS50cmFjZSxjPXMuZXhjZXB0aW9uLm1lc3NhZ2U7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogXCIsYyl9Y29uc29sZS5pbmZvKFwiW1JvbGxiYXJdOiBcIixvKX12LmlzVHlwZSh0aGlzLm9wdGlvbnMubG9nRnVuY3Rpb24sXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmxvZ0Z1bmN0aW9uKG8pO3RyeXt2LmlzVHlwZSh0aGlzLm9wdGlvbnMudHJhbnNmb3JtLFwiZnVuY3Rpb25cIikmJnRoaXMub3B0aW9ucy50cmFuc2Zvcm0oZSl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe3RyYW5zZm9ybTpudWxsfSksY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgY2FsbGluZyBjdXN0b20gdHJhbnNmb3JtKCkgZnVuY3Rpb24uIFJlbW92aW5nIGN1c3RvbSB0cmFuc2Zvcm0oKS5cIixhKX10aGlzLm9wdGlvbnMuZW5hYmxlZCYmdShvKX19LHguX2ludGVybmFsQ2hlY2tJZ25vcmU9ZnVuY3Rpb24oZSxyLHQpe3ZhciBuPXJbMF0sbz1zLkxFVkVMU1tuXXx8MCxpPXMuTEVWRUxTW3RoaXMub3B0aW9ucy5yZXBvcnRMZXZlbF18fDA7aWYobzxpKXJldHVybiEwO3ZhciBhPXRoaXMub3B0aW9ucz90aGlzLm9wdGlvbnMucGx1Z2luczp7fTtpZihhJiZhLmpxdWVyeSYmYS5qcXVlcnkuaWdub3JlQWpheEVycm9ycyl0cnl7cmV0dXJuISF0LmRhdGEuYm9keS5tZXNzYWdlLmV4dHJhLmlzQWpheH1jYXRjaCh1KXtyZXR1cm4hMX1yZXR1cm4hMX0seC5fbG9nPWZ1bmN0aW9uKGUscix0LG4sbyxpLGEpe3ZhciBzPW51bGw7aWYodCl0cnl7aWYocz10Ll9zYXZlZFN0YWNrVHJhY2U/dC5fc2F2ZWRTdGFja1RyYWNlOm0ucGFyc2UodCksdD09PXRoaXMubGFzdEVycm9yKXJldHVybjt0aGlzLmxhc3RFcnJvcj10fWNhdGNoKHUpe2NvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHBhcnNpbmcgdGhlIGVycm9yIG9iamVjdC5cIix1KSxyPXQubWVzc2FnZXx8dC5kZXNjcmlwdGlvbnx8cnx8U3RyaW5nKHQpLHQ9bnVsbH12YXIgYz10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsZSxyLHMsbik7YSYmKGMuaWdub3JlUmF0ZUxpbWl0PSEwKSx0aGlzLl9lbnF1ZXVlUGF5bG9hZChjLCEhaSxbZSxyLHQsbl0sbyl9LHgubG9nPWMoKSx4LmRlYnVnPWMoXCJkZWJ1Z1wiKSx4LmluZm89YyhcImluZm9cIikseC53YXJuPWMoXCJ3YXJuaW5nXCIpLHgud2FybmluZz1jKFwid2FybmluZ1wiKSx4LmVycm9yPWMoXCJlcnJvclwiKSx4LmNyaXRpY2FsPWMoXCJjcml0aWNhbFwiKSx4LnVuY2F1Z2h0RXJyb3I9byhmdW5jdGlvbihlLHIsdCxuLG8saSl7aWYoaT1pfHxudWxsLG8mJnYuaXNUeXBlKG8sXCJlcnJvclwiKSlyZXR1cm4gdm9pZCB0aGlzLl9sb2codGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLG8saSxudWxsLCEwKTtpZihyJiZ2LmlzVHlwZShyLFwiZXJyb3JcIikpcmV0dXJuIHZvaWQgdGhpcy5fbG9nKHRoaXMub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsZSxyLGksbnVsbCwhMCk7dmFyIGE9e3VybDpyfHxcIlwiLGxpbmU6dH07YS5mdW5jPW0uZ3Vlc3NGdW5jdGlvbk5hbWUoYS51cmwsYS5saW5lKSxhLmNvbnRleHQ9bS5nYXRoZXJDb250ZXh0KGEudXJsLGEubGluZSk7dmFyIHM9e21vZGU6XCJvbmVycm9yXCIsbWVzc2FnZTpvP1N0cmluZyhvKTplfHxcInVuY2F1Z2h0IGV4Y2VwdGlvblwiLHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOlthXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sdT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHMsaSk7dGhpcy5fZW5xdWV1ZVBheWxvYWQodSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHIsdCxuLG9dKX0pLHgudW5oYW5kbGVkUmVqZWN0aW9uPW8oZnVuY3Rpb24oZSxyKXtpZihudWxsPT1lKXJldHVybiB2b2lkIF8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwidW5oYW5kbGVkIHJlamVjdGlvbiB3YXMgbnVsbCBvciB1bmRlZmluZWQhXCIsbnVsbCx7fSxudWxsLCExLCExKTt2YXIgdD1lLm1lc3NhZ2V8fChlP1N0cmluZyhlKTpcInVuaGFuZGxlZCByZWplY3Rpb25cIiksbj1lLl9yb2xsYmFyQ29udGV4dHx8ci5fcm9sbGJhckNvbnRleHR8fG51bGw7aWYoZSYmdi5pc1R5cGUoZSxcImVycm9yXCIpKXJldHVybiB2b2lkIHRoaXMuX2xvZyh0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsZSxuLG51bGwsITApO3ZhciBvPXt1cmw6XCJcIixsaW5lOjB9O28uZnVuYz1tLmd1ZXNzRnVuY3Rpb25OYW1lKG8udXJsLG8ubGluZSksby5jb250ZXh0PW0uZ2F0aGVyQ29udGV4dChvLnVybCxvLmxpbmUpO3ZhciBpPXttb2RlOlwidW5oYW5kbGVkcmVqZWN0aW9uXCIsbWVzc2FnZTp0LHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOltvXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sYT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LGksbik7dGhpcy5fZW5xdWV1ZVBheWxvYWQoYSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LG8udXJsLG8ubGluZSwwLGUscl0pfSkseC5nbG9iYWw9byhmdW5jdGlvbihlKXtlPWV8fHt9O3ZhciByPXtzdGFydFRpbWU6ZS5zdGFydFRpbWUsbWF4SXRlbXM6ZS5tYXhJdGVtcyxpdGVtc1Blck1pbnV0ZTplLml0ZW1zUGVyTWludXRlfTtnKCEwLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMsciksdm9pZCAwIT09ZS5tYXhJdGVtcyYmKFQ9MCksdm9pZCAwIT09ZS5pdGVtc1Blck1pbnV0ZSYmKFI9MCl9KSx4LmNvbmZpZ3VyZT1vKGZ1bmN0aW9uKGUscil7dmFyIHQ9ZyghMCx7fSxlKTtnKCFyLHRoaXMub3B0aW9ucyx0KSx0aGlzLmdsb2JhbCh0KX0pLHguc2NvcGU9byhmdW5jdGlvbihlKXt2YXIgcj1uZXcgcyh0aGlzKTtyZXR1cm4gZyghMCxyLm9wdGlvbnMucGF5bG9hZCxlKSxyfSkseC53cmFwPWZ1bmN0aW9uKGUscil7dHJ5e3ZhciB0O2lmKHQ9di5pc1R5cGUocixcImZ1bmN0aW9uXCIpP3I6ZnVuY3Rpb24oKXtyZXR1cm4gcnx8e319LCF2LmlzVHlwZShlLFwiZnVuY3Rpb25cIikpcmV0dXJuIGU7aWYoZS5faXNXcmFwKXJldHVybiBlO2lmKCFlLl93cmFwcGVkKXtlLl93cmFwcGVkPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1jYXRjaChyKXt0aHJvd1wic3RyaW5nXCI9PXR5cGVvZiByJiYocj1uZXcgU3RyaW5nKHIpKSxyLnN0YWNrfHwoci5fc2F2ZWRTdGFja1RyYWNlPW0ucGFyc2UocikpLHIuX3JvbGxiYXJDb250ZXh0PXQoKXx8e30sci5fcm9sbGJhckNvbnRleHQuX3dyYXBwZWRTb3VyY2U9ZS50b1N0cmluZygpLHdpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcj1yLHJ9fSxlLl93cmFwcGVkLl9pc1dyYXA9ITA7Zm9yKHZhciBuIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShuKSYmKGUuX3dyYXBwZWRbbl09ZVtuXSl9cmV0dXJuIGUuX3dyYXBwZWR9Y2F0Y2gobyl7cmV0dXJuIGV9fSx4LmxvYWRGdWxsPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogVW5leHBlY3RlZCBSb2xsYmFyLmxvYWRGdWxsKCkgY2FsbGVkIG9uIGEgTm90aWZpZXIgaW5zdGFuY2VcIil9LHMucHJvY2Vzc1BheWxvYWRzPWZ1bmN0aW9uKGUpe3JldHVybiBlP3ZvaWQgZigpOnZvaWQgaSgpfTt2YXIgTD0obmV3IERhdGUpLmdldFRpbWUoKSxUPTAsUj0wO2UuZXhwb3J0cz17Tm90aWZpZXI6cyxzZXR1cEpTT046bix0b3BMZXZlbE5vdGlmaWVyOmF9fSxmdW5jdGlvbihlLHIpe1widXNlIHN0cmljdFwiO3ZhciB0PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLG89ZnVuY3Rpb24oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkuaXNBcnJheT9BcnJheS5pc0FycmF5KGUpOlwiW29iamVjdCBBcnJheV1cIj09PW4uY2FsbChlKX0saT1mdW5jdGlvbihlKXtpZighZXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9PW4uY2FsbChlKSlyZXR1cm4hMTt2YXIgcj10LmNhbGwoZSxcImNvbnN0cnVjdG9yXCIpLG89ZS5jb25zdHJ1Y3RvciYmZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUmJnQuY2FsbChlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxcImlzUHJvdG90eXBlT2ZcIik7aWYoZS5jb25zdHJ1Y3RvciYmIXImJiFvKXJldHVybiExO3ZhciBpO2ZvcihpIGluIGUpO3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBpfHx0LmNhbGwoZSxpKX07ZS5leHBvcnRzPWZ1bmN0aW9uIGEoKXt2YXIgZSxyLHQsbixzLHUsYz1hcmd1bWVudHNbMF0sbD0xLHA9YXJndW1lbnRzLmxlbmd0aCxmPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGM/KGY9YyxjPWFyZ3VtZW50c1sxXXx8e30sbD0yKTooXCJvYmplY3RcIiE9dHlwZW9mIGMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGN8fG51bGw9PWMpJiYoYz17fSk7bDxwOysrbClpZihlPWFyZ3VtZW50c1tsXSxudWxsIT1lKWZvcihyIGluIGUpdD1jW3JdLG49ZVtyXSxjIT09biYmKGYmJm4mJihpKG4pfHwocz1vKG4pKSk/KHM/KHM9ITEsdT10JiZvKHQpP3Q6W10pOnU9dCYmaSh0KT90Ont9LGNbcl09YShmLHUsbikpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiYoY1tyXT1uKSk7cmV0dXJuIGN9fSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe3JldHVybiBsfWZ1bmN0aW9uIG8oKXtyZXR1cm4gbnVsbH1mdW5jdGlvbiBpKGUpe3ZhciByPXt9O3JldHVybiByLl9zdGFja0ZyYW1lPWUsci51cmw9ZS5maWxlTmFtZSxyLmxpbmU9ZS5saW5lTnVtYmVyLHIuZnVuYz1lLmZ1bmN0aW9uTmFtZSxyLmNvbHVtbj1lLmNvbHVtbk51bWJlcixyLmFyZ3M9ZS5hcmdzLHIuY29udGV4dD1vKHIudXJsLHIubGluZSkscn1mdW5jdGlvbiBhKGUpe2Z1bmN0aW9uIHIoKXt2YXIgcj1bXTt0cnl7cj1jLnBhcnNlKGUpfWNhdGNoKHQpe3I9W119Zm9yKHZhciBuPVtdLG89MDtvPHIubGVuZ3RoO28rKyluLnB1c2gobmV3IGkocltvXSkpO3JldHVybiBufXJldHVybntzdGFjazpyKCksbWVzc2FnZTplLm1lc3NhZ2UsbmFtZTplLm5hbWV9fWZ1bmN0aW9uIHMoZSl7cmV0dXJuIG5ldyBhKGUpfWZ1bmN0aW9uIHUoZSl7aWYoIWUpcmV0dXJuW1wiVW5rbm93biBlcnJvci4gVGhlcmUgd2FzIG5vIGVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheS5cIixcIlwiXTt2YXIgcj1lLm1hdGNoKHApLHQ9XCIodW5rbm93bilcIjtyZXR1cm4gciYmKHQ9cltyLmxlbmd0aC0xXSxlPWUucmVwbGFjZSgocltyLmxlbmd0aC0yXXx8XCJcIikrdCtcIjpcIixcIlwiKSxlPWUucmVwbGFjZSgvKF5bXFxzXSt8W1xcc10rJCkvZyxcIlwiKSksW3QsZV19dmFyIGM9dCg2KSxsPVwiP1wiLHA9bmV3IFJlZ0V4cChcIl4oKFthLXpBLVowLTktXyQgXSopOiAqKT8oVW5jYXVnaHQgKT8oW2EtekEtWjAtOS1fJCBdKik6IFwiKTtlLmV4cG9ydHM9e2d1ZXNzRnVuY3Rpb25OYW1lOm4sZ3Vlc3NFcnJvckNsYXNzOnUsZ2F0aGVyQ29udGV4dDpvLHBhcnNlOnMsU3RhY2s6YSxGcmFtZTppfX0sZnVuY3Rpb24oZSxyLHQpe3ZhciBuLG8saTshZnVuY3Rpb24oYSxzKXtcInVzZSBzdHJpY3RcIjtvPVt0KDcpXSxuPXMsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHIsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkucHJvdG90eXBlLm1hcClyZXR1cm4gZS5tYXAocix0KTtmb3IodmFyIG49bmV3IEFycmF5KGUubGVuZ3RoKSxvPTA7bzxlLmxlbmd0aDtvKyspbltvXT1yLmNhbGwodCxlW29dKTtyZXR1cm4gbn1mdW5jdGlvbiB0KGUscix0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5wcm90b3R5cGUuZmlsdGVyKXJldHVybiBlLmZpbHRlcihyLHQpO2Zvcih2YXIgbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspci5jYWxsKHQsZVtvXSkmJm4ucHVzaChlW29dKTtyZXR1cm4gbn12YXIgbj0vKF58QClcXFMrXFw6XFxkKy8sbz0vXlxccyphdCAuKihcXFMrXFw6XFxkK3xcXChuYXRpdmVcXCkpL20saT0vXihldmFsQCk/KFxcW25hdGl2ZSBjb2RlXFxdKT8kLztyZXR1cm57cGFyc2U6ZnVuY3Rpb24oZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuc3RhY2t0cmFjZXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVbXCJvcGVyYSNzb3VyY2Vsb2NcIl0pcmV0dXJuIHRoaXMucGFyc2VPcGVyYShlKTtpZihlLnN0YWNrJiZlLnN0YWNrLm1hdGNoKG8pKXJldHVybiB0aGlzLnBhcnNlVjhPcklFKGUpO2lmKGUuc3RhY2spcmV0dXJuIHRoaXMucGFyc2VGRk9yU2FmYXJpKGUpO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3RcIil9LGV4dHJhY3RMb2NhdGlvbjpmdW5jdGlvbihlKXtpZihlLmluZGV4T2YoXCI6XCIpPT09LTEpcmV0dXJuW2VdO3ZhciByPWUucmVwbGFjZSgvW1xcKFxcKVxcc10vZyxcIlwiKS5zcGxpdChcIjpcIiksdD1yLnBvcCgpLG49cltyLmxlbmd0aC0xXTtpZighaXNOYU4ocGFyc2VGbG9hdChuKSkmJmlzRmluaXRlKG4pKXt2YXIgbz1yLnBvcCgpO3JldHVybltyLmpvaW4oXCI6XCIpLG8sdF19cmV0dXJuW3Iuam9pbihcIjpcIiksdCx2b2lkIDBdfSxwYXJzZVY4T3JJRTpmdW5jdGlvbihuKXt2YXIgaT10KG4uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuISFlLm1hdGNoKG8pfSx0aGlzKTtyZXR1cm4gcihpLGZ1bmN0aW9uKHIpe3IuaW5kZXhPZihcIihldmFsIFwiKT4tMSYmKHI9ci5yZXBsYWNlKC9ldmFsIGNvZGUvZyxcImV2YWxcIikucmVwbGFjZSgvKFxcKGV2YWwgYXQgW15cXCgpXSopfChcXClcXCwuKiQpL2csXCJcIikpO3ZhciB0PXIucmVwbGFjZSgvXlxccysvLFwiXCIpLnJlcGxhY2UoL1xcKGV2YWwgY29kZS9nLFwiKFwiKS5zcGxpdCgvXFxzKy8pLnNsaWNlKDEpLG49dGhpcy5leHRyYWN0TG9jYXRpb24odC5wb3AoKSksbz10LmpvaW4oXCIgXCIpfHx2b2lkIDAsaT1cImV2YWxcIj09PW5bMF0/dm9pZCAwOm5bMF07cmV0dXJuIG5ldyBlKG8sKHZvaWQgMCksaSxuWzFdLG5bMl0scil9LHRoaXMpfSxwYXJzZUZGT3JTYWZhcmk6ZnVuY3Rpb24obil7dmFyIG89dChuLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiFlLm1hdGNoKGkpfSx0aGlzKTtyZXR1cm4gcihvLGZ1bmN0aW9uKHIpe2lmKHIuaW5kZXhPZihcIiA+IGV2YWxcIik+LTEmJihyPXIucmVwbGFjZSgvIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWxcXDpcXGQrXFw6XFxkKy9nLFwiOiQxXCIpKSxyLmluZGV4T2YoXCJAXCIpPT09LTEmJnIuaW5kZXhPZihcIjpcIik9PT0tMSlyZXR1cm4gbmV3IGUocik7dmFyIHQ9ci5zcGxpdChcIkBcIiksbj10aGlzLmV4dHJhY3RMb2NhdGlvbih0LnBvcCgpKSxvPXQuc2hpZnQoKXx8dm9pZCAwO3JldHVybiBuZXcgZShvLCh2b2lkIDApLG5bMF0sblsxXSxuWzJdLHIpfSx0aGlzKX0scGFyc2VPcGVyYTpmdW5jdGlvbihlKXtyZXR1cm4hZS5zdGFja3RyYWNlfHxlLm1lc3NhZ2UuaW5kZXhPZihcIlxcblwiKT4tMSYmZS5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpLmxlbmd0aD5lLnN0YWNrdHJhY2Uuc3BsaXQoXCJcXG5cIikubGVuZ3RoP3RoaXMucGFyc2VPcGVyYTkoZSk6ZS5zdGFjaz90aGlzLnBhcnNlT3BlcmExMShlKTp0aGlzLnBhcnNlT3BlcmExMChlKX0scGFyc2VPcGVyYTk6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspL2ksbj1yLm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIiksbz1bXSxpPTIsYT1uLmxlbmd0aDtpPGE7aSs9Mil7dmFyIHM9dC5leGVjKG5baV0pO3MmJm8ucHVzaChuZXcgZSgodm9pZCAwKSwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTA6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspKD86OiBJbiBmdW5jdGlvbiAoXFxTKykpPyQvaSxuPXIuc3RhY2t0cmFjZS5zcGxpdChcIlxcblwiKSxvPVtdLGk9MCxhPW4ubGVuZ3RoO2k8YTtpKz0yKXt2YXIgcz10LmV4ZWMobltpXSk7cyYmby5wdXNoKG5ldyBlKHNbM118fHZvaWQgMCwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTE6ZnVuY3Rpb24obyl7dmFyIGk9dChvLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiEhZS5tYXRjaChuKSYmIWUubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyl9LHRoaXMpO3JldHVybiByKGksZnVuY3Rpb24ocil7dmFyIHQsbj1yLnNwbGl0KFwiQFwiKSxvPXRoaXMuZXh0cmFjdExvY2F0aW9uKG4ucG9wKCkpLGk9bi5zaGlmdCgpfHxcIlwiLGE9aS5yZXBsYWNlKC88YW5vbnltb3VzIGZ1bmN0aW9uKDogKFxcdyspKT8+LyxcIiQyXCIpLnJlcGxhY2UoL1xcKFteXFwpXSpcXCkvZyxcIlwiKXx8dm9pZCAwO2kubWF0Y2goL1xcKChbXlxcKV0qKVxcKS8pJiYodD1pLnJlcGxhY2UoL15bXlxcKF0rXFwoKFteXFwpXSopXFwpJC8sXCIkMVwiKSk7dmFyIHM9dm9pZCAwPT09dHx8XCJbYXJndW1lbnRzIG5vdCBhdmFpbGFibGVdXCI9PT10P3ZvaWQgMDp0LnNwbGl0KFwiLFwiKTtyZXR1cm4gbmV3IGUoYSxzLG9bMF0sb1sxXSxvWzJdLHIpfSx0aGlzKX19fSl9LGZ1bmN0aW9uKGUscix0KXt2YXIgbixvLGk7IWZ1bmN0aW9uKHQsYSl7XCJ1c2Ugc3RyaWN0XCI7bz1bXSxuPWEsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSl9ZnVuY3Rpb24gcihlLHIsdCxuLG8saSl7dm9pZCAwIT09ZSYmdGhpcy5zZXRGdW5jdGlvbk5hbWUoZSksdm9pZCAwIT09ciYmdGhpcy5zZXRBcmdzKHIpLHZvaWQgMCE9PXQmJnRoaXMuc2V0RmlsZU5hbWUodCksdm9pZCAwIT09biYmdGhpcy5zZXRMaW5lTnVtYmVyKG4pLHZvaWQgMCE9PW8mJnRoaXMuc2V0Q29sdW1uTnVtYmVyKG8pLHZvaWQgMCE9PWkmJnRoaXMuc2V0U291cmNlKGkpfXJldHVybiByLnByb3RvdHlwZT17Z2V0RnVuY3Rpb25OYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnVuY3Rpb25OYW1lfSxzZXRGdW5jdGlvbk5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5mdW5jdGlvbk5hbWU9U3RyaW5nKGUpfSxnZXRBcmdzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXJnc30sc2V0QXJnczpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3MgbXVzdCBiZSBhbiBBcnJheVwiKTt0aGlzLmFyZ3M9ZX0sZ2V0RmlsZU5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWxlTmFtZX0sc2V0RmlsZU5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5maWxlTmFtZT1TdHJpbmcoZSl9LGdldExpbmVOdW1iZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5saW5lTnVtYmVyfSxzZXRMaW5lTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyXCIpO3RoaXMubGluZU51bWJlcj1OdW1iZXIocil9LGdldENvbHVtbk51bWJlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbHVtbk51bWJlcn0sc2V0Q29sdW1uTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDb2x1bW4gTnVtYmVyIG11c3QgYmUgYSBOdW1iZXJcIik7dGhpcy5jb2x1bW5OdW1iZXI9TnVtYmVyKHIpfSxnZXRTb3VyY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb3VyY2V9LHNldFNvdXJjZTpmdW5jdGlvbihlKXt0aGlzLnNvdXJjZT1TdHJpbmcoZSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5nZXRGdW5jdGlvbk5hbWUoKXx8XCJ7YW5vbnltb3VzfVwiLHQ9XCIoXCIrKHRoaXMuZ2V0QXJncygpfHxbXSkuam9pbihcIixcIikrXCIpXCIsbj10aGlzLmdldEZpbGVOYW1lKCk/XCJAXCIrdGhpcy5nZXRGaWxlTmFtZSgpOlwiXCIsbz1lKHRoaXMuZ2V0TGluZU51bWJlcigpKT9cIjpcIit0aGlzLmdldExpbmVOdW1iZXIoKTpcIlwiLGk9ZSh0aGlzLmdldENvbHVtbk51bWJlcigpKT9cIjpcIit0aGlzLmdldENvbHVtbk51bWJlcigpOlwiXCI7cmV0dXJuIHIrdCtuK28raX19LHJ9KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7cmV0dXJue30udG9TdHJpbmcuY2FsbChlKS5tYXRjaCgvXFxzKFthLXpBLVpdKykvKVsxXS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gbihlKT09PXJ9ZnVuY3Rpb24gaShlKXtpZighbyhlLFwic3RyaW5nXCIpKXRocm93IG5ldyBFcnJvcihcInJlY2VpdmVkIGludmFsaWQgaW5wdXRcIik7Zm9yKHZhciByPWwsdD1yLnBhcnNlcltyLnN0cmljdE1vZGU/XCJzdHJpY3RcIjpcImxvb3NlXCJdLmV4ZWMoZSksbj17fSxpPTE0O2ktLTspbltyLmtleVtpXV09dFtpXXx8XCJcIjtyZXR1cm4gbltyLnEubmFtZV09e30sbltyLmtleVsxMl1dLnJlcGxhY2Uoci5xLnBhcnNlcixmdW5jdGlvbihlLHQsbyl7dCYmKG5bci5xLm5hbWVdW3RdPW8pfSksbn1mdW5jdGlvbiBhKGUpe3ZhciByPWkoZSk7cmV0dXJuXCJcIj09PXIuYW5jaG9yJiYoci5zb3VyY2U9ci5zb3VyY2UucmVwbGFjZShcIiNcIixcIlwiKSksZT1yLnNvdXJjZS5yZXBsYWNlKFwiP1wiK3IucXVlcnksXCJcIil9ZnVuY3Rpb24gcyhlLHIpe3ZhciB0LG4saSxhPW8oZSxcIm9iamVjdFwiKSx1PW8oZSxcImFycmF5XCIpLGM9W107aWYoYSlmb3IodCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJmMucHVzaCh0KTtlbHNlIGlmKHUpZm9yKGk9MDtpPGUubGVuZ3RoOysraSljLnB1c2goaSk7Zm9yKGk9MDtpPGMubGVuZ3RoOysraSl0PWNbaV0sbj1lW3RdLGE9byhuLFwib2JqZWN0XCIpLHU9byhuLFwiYXJyYXlcIiksYXx8dT9lW3RdPXMobixyKTplW3RdPXIodCxuKTtyZXR1cm4gZX1mdW5jdGlvbiB1KGUpe3JldHVybiBlPVN0cmluZyhlKSxuZXcgQXJyYXkoZS5sZW5ndGgrMSkuam9pbihcIipcIil9ZnVuY3Rpb24gYygpe3ZhciBlPShuZXcgRGF0ZSkuZ2V0VGltZSgpLHI9XCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2csZnVuY3Rpb24ocil7dmFyIHQ9KGUrMTYqTWF0aC5yYW5kb20oKSklMTZ8MDtyZXR1cm4gZT1NYXRoLmZsb29yKGUvMTYpLChcInhcIj09PXI/dDo3JnR8OCkudG9TdHJpbmcoMTYpfSk7cmV0dXJuIHJ9dCg5KTt2YXIgbD17c3RyaWN0TW9kZTohMSxrZXk6W1wic291cmNlXCIsXCJwcm90b2NvbFwiLFwiYXV0aG9yaXR5XCIsXCJ1c2VySW5mb1wiLFwidXNlclwiLFwicGFzc3dvcmRcIixcImhvc3RcIixcInBvcnRcIixcInJlbGF0aXZlXCIsXCJwYXRoXCIsXCJkaXJlY3RvcnlcIixcImZpbGVcIixcInF1ZXJ5XCIsXCJhbmNob3JcIl0scTp7bmFtZTpcInF1ZXJ5S2V5XCIscGFyc2VyOi8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZ30scGFyc2VyOntzdHJpY3Q6L14oPzooW146XFwvPyNdKyk6KT8oPzpcXC9cXC8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykpPygoKCg/OltePyNcXC9dKlxcLykqKShbXj8jXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLyxsb29zZTovXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS99fSxwPXtpc1R5cGU6byxwYXJzZVVyaTppLHBhcnNlVXJpT3B0aW9uczpsLHJlZGFjdDp1LHNhbml0aXplVXJsOmEsdHJhdmVyc2U6cyx0eXBlTmFtZTpuLHV1aWQ0OmN9O2UuZXhwb3J0cz1wfSxmdW5jdGlvbihlLHIpeyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtlLmNvbnNvbGU9ZS5jb25zb2xlfHx7fTtmb3IodmFyIHIsdCxuPWUuY29uc29sZSxvPXt9LGk9ZnVuY3Rpb24oKXt9LGE9XCJtZW1vcnlcIi5zcGxpdChcIixcIikscz1cImFzc2VydCxjbGVhcixjb3VudCxkZWJ1ZyxkaXIsZGlyeG1sLGVycm9yLGV4Y2VwdGlvbixncm91cCxncm91cENvbGxhcHNlZCxncm91cEVuZCxpbmZvLGxvZyxtYXJrVGltZWxpbmUscHJvZmlsZSxwcm9maWxlcyxwcm9maWxlRW5kLHNob3csdGFibGUsdGltZSx0aW1lRW5kLHRpbWVsaW5lLHRpbWVsaW5lRW5kLHRpbWVTdGFtcCx0cmFjZSx3YXJuXCIuc3BsaXQoXCIsXCIpO3I9YS5wb3AoKTspbltyXXx8KG5bcl09byk7Zm9yKDt0PXMucG9wKCk7KW5bdF18fChuW3RdPWkpfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3RoaXM6d2luZG93KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7YT1lfWZ1bmN0aW9uIG8oZSl7dGhpcy5uYW1lPVwiQ29ubmVjdGlvbiBFcnJvclwiLHRoaXMubWVzc2FnZT1lLHRoaXMuc3RhY2s9KG5ldyBFcnJvcikuc3RhY2t9dmFyIGk9dCg4KSxhPW51bGw7by5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPW87dmFyIHM9e1hNTEh0dHBGYWN0b3JpZXM6W2Z1bmN0aW9uKCl7cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdH0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDIuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDMuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKX1dLGNyZWF0ZVhNTEhUVFBPYmplY3Q6ZnVuY3Rpb24oKXt2YXIgZSxyPSExLHQ9cy5YTUxIdHRwRmFjdG9yaWVzLG49dC5sZW5ndGg7Zm9yKGU9MDtlPG47ZSsrKXRyeXtyPXRbZV0oKTticmVha31jYXRjaChvKXt9cmV0dXJuIHJ9LHBvc3Q6ZnVuY3Rpb24oZSxyLHQsbil7aWYoIWkuaXNUeXBlKHQsXCJvYmplY3RcIikpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYW4gb2JqZWN0IHRvIFBPU1RcIik7dD1hLnN0cmluZ2lmeSh0KSxuPW58fGZ1bmN0aW9uKCl7fTt2YXIgdT1zLmNyZWF0ZVhNTEhUVFBPYmplY3QoKTtpZih1KXRyeXt0cnl7dmFyIGM9ZnVuY3Rpb24oKXt0cnl7aWYoYyYmND09PXUucmVhZHlTdGF0ZSl7Yz12b2lkIDA7dmFyIGU9YS5wYXJzZSh1LnJlc3BvbnNlVGV4dCk7MjAwPT09dS5zdGF0dXM/bihudWxsLGUpOmkuaXNUeXBlKHUuc3RhdHVzLFwibnVtYmVyXCIpJiZ1LnN0YXR1cz49NDAwJiZ1LnN0YXR1czw2MDA/KDQwMz09dS5zdGF0dXMmJmNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06XCIrZS5tZXNzYWdlKSxuKG5ldyBFcnJvcihTdHJpbmcodS5zdGF0dXMpKSkpOm4obmV3IG8oXCJYSFIgcmVzcG9uc2UgaGFkIG5vIHN0YXR1cyBjb2RlIChsaWtlbHkgY29ubmVjdGlvbiBmYWlsdXJlKVwiKSl9fWNhdGNoKHIpe3ZhciB0O3Q9ciYmci5zdGFjaz9yOm5ldyBFcnJvcihyKSxuKHQpfX07dS5vcGVuKFwiUE9TVFwiLGUsITApLHUuc2V0UmVxdWVzdEhlYWRlciYmKHUuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvblwiKSx1LnNldFJlcXVlc3RIZWFkZXIoXCJYLVJvbGxiYXItQWNjZXNzLVRva2VuXCIscikpLHUub25yZWFkeXN0YXRlY2hhbmdlPWMsdS5zZW5kKHQpfWNhdGNoKGwpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBYRG9tYWluUmVxdWVzdCl7XCJodHRwOlwiPT09d2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKDAsNSkmJlwiaHR0cHNcIj09PWUuc3Vic3RyaW5nKDAsNSkmJihlPVwiaHR0cFwiK2Uuc3Vic3RyaW5nKDUpKTt2YXIgcD1mdW5jdGlvbigpe24obmV3IG8oXCJSZXF1ZXN0IHRpbWVkIG91dFwiKSl9LGY9ZnVuY3Rpb24oKXtuKG5ldyBFcnJvcihcIkVycm9yIGR1cmluZyByZXF1ZXN0XCIpKX0sZD1mdW5jdGlvbigpe24obnVsbCxhLnBhcnNlKHUucmVzcG9uc2VUZXh0KSl9O3U9bmV3IFhEb21haW5SZXF1ZXN0LHUub25wcm9ncmVzcz1mdW5jdGlvbigpe30sdS5vbnRpbWVvdXQ9cCx1Lm9uZXJyb3I9Zix1Lm9ubG9hZD1kLHUub3BlbihcIlBPU1RcIixlLCEwKSx1LnNlbmQodCl9fX1jYXRjaChoKXtuKGgpfX19O2UuZXhwb3J0cz17WEhSOnMsc2V0dXBKU09OOm4sQ29ubmVjdGlvbkVycm9yOm99fV0pfSk7IiwidmFyIFZpc2lvblNpbXVsYXRpb24gPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvblwiKTtcbnZhciB3b3JsZGRhdGEgPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvd29ybGRkYXRhLmpzb25cIik7XG52YXIgZ2V0TGlnaHRVbmlvbiA9IHJlcXVpcmUoXCIuL2dldExpZ2h0VW5pb25cIik7XG52YXIgdHJpbSA9IHJlcXVpcmUoJy4vdXRpbC90cmltJyk7XG52YXIgUXVlcnlTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWwvcXVlcnlTdHJpbmcnKTtcbnZhciBSb2xsYmFyID0gcmVxdWlyZShcInJvbGxiYXItYnJvd3NlclwiKTtcblxudmFyIHJvbGxiYXJDb25maWcgPSB7XG4gICAgYWNjZXNzVG9rZW46ICdmZTdjZjMyN2YyYjI0YmI4OTkxZTI1MjIzOWY2MjAwZicsXG4gICAgY2FwdHVyZVVuY2F1Z2h0OiB0cnVlLFxuICAgIGlnbm9yZWRNZXNzYWdlczogW1xuICAgICAgICBcIlNlY3VyaXR5RXJyb3I6IERPTSBFeGNlcHRpb24gMTg6IEFuIGF0dGVtcHQgd2FzIG1hZGUgdG8gYnJlYWsgdGhyb3VnaCB0aGUgc2VjdXJpdHkgcG9saWN5IG9mIHRoZSB1c2VyIGFnZW50LlwiLFxuICAgICAgICBcIlNlY3VyaXR5RXJyb3I6ICBBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIGJyZWFrIHRocm91Z2ggdGhlIHNlY3VyaXR5IHBvbGljeSBvZiB0aGUgdXNlciBhZ2VudC5cIlxuICAgIF0sXG4gICAgcGF5bG9hZDoge1xuICAgICAgICBlbnZpcm9ubWVudDogJ2RldmVsb3BtZW50JyxcbiAgICAgICAgY2xpZW50OiB7XG4gICAgICAgICAgICBqYXZhc2NyaXB0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlX21hcF9lbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvZGVfdmVyc2lvbjogXCJiOTY1NWUwYWU3ZTFjZGY5OWI0OTEzYjExNTRmZDFiYjRlNDQyMmJmXCIsXG4gICAgICAgICAgICAgICAgLy8gT3B0aW9uYWxseSBoYXZlIFJvbGxiYXIgZ3Vlc3Mgd2hpY2ggZnJhbWVzIHRoZSBlcnJvciB3YXMgdGhyb3duIGZyb21cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSBicm93c2VyIGRvZXMgbm90IHByb3ZpZGUgbGluZSBhbmQgY29sdW1uIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgZ3Vlc3NfdW5jYXVnaHRfZnJhbWVzOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgcm9sbGJhciA9IFJvbGxiYXIuaW5pdChyb2xsYmFyQ29uZmlnKTtcbiAgICBcbmZ1bmN0aW9uIEFwcChtYXBfdGlsZV9wYXRoLCB2aXNpb25fZGF0YV9pbWFnZV9wYXRoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBJTUdfRElSID0gXCJpbWcvXCIsXG4gICAgICAgIEVOVElUSUVTID0ge1xuICAgICAgICAgICAgb2JzZXJ2ZXI6IHtcbiAgICAgICAgICAgICAgICBpY29uX3BhdGg6IElNR19ESVIgKyBcIndhcmRfb2JzZXJ2ZXIucG5nXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiAxNjAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VudHJ5OiB7XG4gICAgICAgICAgICAgICAgaWNvbl9wYXRoOiBJTUdfRElSICsgXCJ3YXJkX3NlbnRyeS5wbmdcIixcbiAgICAgICAgICAgICAgICByYWRpdXM6IDg1MFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBUT1dFUl9EQVlfVklTSU9OX1JBRElVUyA9IDE5MDAsXG4gICAgICAgIFRPV0VSX05JR0hUX1ZJU0lPTl9SQURJVVMgPSA4MDAsXG4gICAgICAgIFRPV0VSX1RSVUVfU0lHSFRfUkFESVVTID0gNzAwLFxuICAgICAgICBUT1dFUl9BVFRBQ0tfUkFOR0VfUkFESVVTID0gNzAwLFxuICAgICAgICBtYXBfZGF0YV9wYXRoID0gXCJkYXRhL1wiLFxuICAgICAgICBtYXBfZGF0YSxcbiAgICAgICAgbWFwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9tYXBDb25zdGFudHMnKSxcbiAgICAgICAgY29udmVyc2lvbkZ1bmN0aW9ucyA9IHJlcXVpcmUoJy4vY29udmVyc2lvbkZ1bmN0aW9ucycpLFxuICAgICAgICB6b29taWZ5ID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuWm9vbWlmeSggXCJab29taWZ5XCIsIG1hcF90aWxlX3BhdGgsIG5ldyBPcGVuTGF5ZXJzLlNpemUoIG1hcENvbnN0YW50cy5tYXBfdywgbWFwQ29uc3RhbnRzLm1hcF9oICkgKSxcbiAgICAgICAgbWFwQm91bmRzID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKDAsIDAsIG1hcENvbnN0YW50cy5tYXBfdywgbWFwQ29uc3RhbnRzLm1hcF9oKSxcbiAgICAgICAgbWFwID0gbmV3IE9wZW5MYXllcnMuTWFwKFwibWFwMVwiLCB7XG4gICAgICAgICAgICB0aGVtZTogbnVsbCxcbiAgICAgICAgICAgIG1heEV4dGVudDogbWFwQm91bmRzLFxuICAgICAgICAgICAgbnVtWm9vbUxldmVsczogNSxcbiAgICAgICAgICAgIG1heFJlc29sdXRpb246IE1hdGgucG93KDIsIDUtMSApLFxuICAgICAgICAgICAgdW5pdHM6IFwibVwiXG4gICAgICAgIH0pLFxuICAgICAgICBsYXllcktleXMgPSBbXG4gICAgICAgICAgICBcIm5vX3dhcmRzXCIsXG4gICAgICAgICAgICBcImVudF9mb3dfYmxvY2tlcl9ub2RlXCIsXG4gICAgICAgICAgICBcInRyaWdnZXJfbXVsdGlwbGVcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfcm9zaGFuX3NwYXduZXJcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyXCIsXG4gICAgICAgICAgICBcImRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5XCIsXG4gICAgICAgICAgICBcImVudF9kb3RhX3Nob3BcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYmFycmFja3NcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYnVpbGRpbmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfaGVhbGVyXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX2ZvcnRcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfdG93ZXJcIlxuICAgICAgICBdLFxuICAgICAgICBsYXllck5hbWVzID0ge1xuICAgICAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyOiBcIlJ1bmVzXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX2JvdW50eTogXCJCb3VudHkgUnVuZXNcIixcbiAgICAgICAgICAgIGVudF9kb3RhX3RyZWU6IFwiVHJlZXNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2hlYWxlcjogXCJTaHJpbmVzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9mb3J0OiBcIkFuY2llbnRzXCIsXG4gICAgICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BzXCIsXG4gICAgICAgICAgICBucGNfZG90YV90b3dlcjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2JhcnJhY2tzOiBcIkJhcnJhY2tzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9idWlsZGluZzogXCJCdWlsZGluZ3NcIixcbiAgICAgICAgICAgIHRyaWdnZXJfbXVsdGlwbGU6IFwiTmV1dHJhbCBDYW1wcyBTcGF3biBCb3hlc1wiLFxuICAgICAgICAgICAgbnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyOiBcIk5ldXRyYWwgQ2FtcHNcIixcbiAgICAgICAgICAgIG5vX3dhcmRzOiBcIkludmFsaWQgV2FyZCBMb2NhdGlvbnNcIixcbiAgICAgICAgICAgIGVudF9mb3dfYmxvY2tlcl9ub2RlOiBcIlZpc2lvbiBCbG9ja2VyXCJcbiAgICAgICAgfSxcbiAgICAgICAgYmFzZUxheWVycyA9IFtcbiAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkxheWVyLlRNUygnNy4wMCBEZWZhdWx0JywgbWFwX3RpbGVfcGF0aCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwianBnXCIsXG4gICAgICAgICAgICAgICAgZ2V0VVJMOiBnZXRNeVVSTCgnNzAwJywgJ2RlZmF1bHQnKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgT3BlbkxheWVycy5MYXllci5UTVMoJzYuODcgRGVmYXVsdCcsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdkZWZhdWx0JylcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuTGF5ZXIuVE1TKCc2Ljg3IERlc2VydCcsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdkZXNlcnQnKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgT3BlbkxheWVycy5MYXllci5UTVMoJzYuODcgSW1tb3J0YWwgR2FyZGVucycsIG1hcF90aWxlX3BhdGgsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImpwZ1wiLFxuICAgICAgICAgICAgICAgIGdldFVSTDogZ2V0TXlVUkwoJzY4NycsICdpbW1vcnRhbGdhcmRlbnMnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgb3ZlcmxheUdyb3VwaW5nID0ge1xuICAgICAgICAgICAgXCJEYXkgVmlzaW9uIFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIk5pZ2h0IFZpc2lvbiBSYW5nZVwiOiBcIlRvd2Vyc1wiLFxuICAgICAgICAgICAgXCJUcnVlIFNpZ2h0IFJhbmdlXCI6IFwiVG93ZXJzXCIsXG4gICAgICAgICAgICBcIkF0dGFjayBSYW5nZVwiOiBcIlRvd2Vyc1wiLFxuICAgICAgICAgICAgXCJUb3dlcnNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIlNocmluZXNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkFuY2llbnRzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJCYXJyYWNrc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiQnVpbGRpbmdzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJTaG9wc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiSW52YWxpZCBXYXJkIExvY2F0aW9uc1wiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJWaXNpb24gQmxvY2tlclwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJQbGFjZWQgV2FyZHNcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiV2FyZCBWaXNpb25cIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiV2FyZCBWaXNpb24gd2l0aCBGb2dcIjogXCJWaXNpb25cIlxuICAgICAgICB9LFxuICAgICAgICBsYXllclN3aXRjaGVyID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5MYXllclN3aXRjaGVyKHtcbiAgICAgICAgICAgIGFzY2VuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBvdmVybGF5R3JvdXBpbmc6IG92ZXJsYXlHcm91cGluZyxcbiAgICAgICAgICAgIG9uTWF4aW1pemVXaGVuU21hbGxTY3JlZW46IG1pbmltaXplQ29udHJvbExpc3QuYmluZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKSlcbiAgICAgICAgfSksXG4gICAgICAgIGNvb3JkaW5hdGVDb250cm9sID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5Nb3VzZVBvc2l0aW9uKCksXG4gICAgICAgIGN1cnNvckxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQ3Vyc29yXCIsIHtkaXNwbGF5SW5MYXllclN3aXRjaGVyOmZhbHNlfSksXG4gICAgICAgIGRheVJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEYXkgVmlzaW9uIFJhbmdlXCIpLFxuICAgICAgICBuaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJOaWdodCBWaXNpb24gUmFuZ2VcIiksXG4gICAgICAgIHRydWVTaWdodFJhbmdlTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJUcnVlIFNpZ2h0IFJhbmdlXCIpLFxuICAgICAgICBhdHRhY2tSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiQXR0YWNrIFJhbmdlXCIpLFxuICAgICAgICBwb2x5Z29uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJEcmF3biBDaXJjbGVzXCIpLFxuICAgICAgICB3YXJkVmlzaW9uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoXCJXYXJkIFZpc2lvblwiKSxcbiAgICAgICAgdmlzaW9uU2ltdWxhdGlvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiV2FyZCBWaXNpb24gd2l0aCBGb2dcIiksXG4gICAgICAgIGljb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLk1hcmtlcnMoXCJQbGFjZWQgV2FyZHNcIiksXG4gICAgICAgIHJlbmRlcmVyID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpLnJlbmRlcmVyLFxuICAgICAgICBkcmF3Q29udHJvbHMsXG4gICAgICAgIGxhc3REaXN0YW5jZSxcbiAgICAgICAgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlQ29uc3RhbnRzJyksXG4gICAgICAgIHRyZWVNYXJrZXJzID0ge30sXG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gdHJ1ZSxcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT05fQUxXQVlTID0gdHJ1ZSxcbiAgICAgICAgY3V0VHJlZXMgPSB7fTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENPT1JESU5BVEUgQ09OVkVSU0lPTiBGVU5DVElPTlMgKlxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIHZhciBsZXJwID0gbGVycCxcbiAgICAgICAgcmV2ZXJzZUxlcnAgPSBjb252ZXJzaW9uRnVuY3Rpb25zLnJldmVyc2VMZXJwLFxuICAgICAgICBsYXRMb25Ub1dvcmxkID0gY29udmVyc2lvbkZ1bmN0aW9ucy5sYXRMb25Ub1dvcmxkLFxuICAgICAgICB3b3JsZFRvTGF0TG9uID0gY29udmVyc2lvbkZ1bmN0aW9ucy53b3JsZFRvTGF0TG9uLFxuICAgICAgICBnZXRUaWxlUmFkaXVzID0gY29udmVyc2lvbkZ1bmN0aW9ucy5nZXRUaWxlUmFkaXVzLFxuICAgICAgICBnZXRTY2FsZWRSYWRpdXMgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmdldFNjYWxlZFJhZGl1cyxcbiAgICAgICAgY2FsY3VsYXRlRGlzdGFuY2UgPSBjb252ZXJzaW9uRnVuY3Rpb25zLmNhbGN1bGF0ZURpc3RhbmNlO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqXG4gICAgICogQ09OVFJPTCBIQU5ETEVSUyAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlVHJlZU1hcmtlckNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVUcmVlTWFya2VyQ2xpY2snLCB0aGlzKTtcbiAgICAgICAgc2V0VHJlZU1hcmtlclN0YXRlKHRoaXMsICF0aGlzLnRyZWVWaXNpYmxlKTtcbiAgICAgICAgc2V0VHJlZVF1ZXJ5U3RyaW5nKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldFRyZWVNYXJrZXJTdGF0ZShtYXJrZXIsIHN0YXRlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRUcmVlTWFya2VyU3RhdGUnLCBtYXJrZXIpO1xuICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobWFya2VyLmxvbmxhdC5sb24sIG1hcmtlci5sb25sYXQubGF0KTtcblxuICAgICAgICBtYXJrZXIudHJlZVZpc2libGUgPSBzdGF0ZTtcbiAgICAgICAgbWFya2VyLnNldE9wYWNpdHkoc3RhdGUgPyAxIDogLjQpO1xuICAgICAgICBcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OKSB7XG4gICAgICAgICAgICB2YXIgZ3JpZFhZID0gdnMuV29ybGRYWXRvR3JpZFhZKHdvcmxkWFkueCwgd29ybGRYWS55KTtcbiAgICAgICAgICAgIHZzLnRvZ2dsZVRyZWUoZ3JpZFhZLngsIGdyaWRYWS55KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3B1cENvbnRlbnRIVE1MID0gXCJDbGljayB0byBjdXQgZG93biB0cmVlLjxicj5UaGlzIHdpbGwgYWZmZWN0IHRoZSB3YXJkIHZpc2lvbiBzaW11bGF0aW9uLlwiO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjdXRUcmVlc1ttYXJrZXIudHJlZV9sb2NdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MID0gXCJDbGljayB0byByZWdyb3cgdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIjtcbiAgICAgICAgICAgIGN1dFRyZWVzW21hcmtlci50cmVlX2xvY10gPSBtYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIG1hcmtlci5mZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGlmIChtYXJrZXIuZmVhdHVyZS5wb3B1cCkge1xuICAgICAgICAgICAgbWFya2VyLmZlYXR1cmUucG9wdXAuc2V0Q29udGVudEhUTUwocG9wdXBDb250ZW50SFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3dlck1hcmtlckNsaWNrKGUsIHNraXBRdWVyeVN0cmluZ1VwZGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlVG93ZXJNYXJrZXJDbGljaycpO1xuICAgICAgICB2YXIgY2lyY2xlLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIGNlbnRlcjtcblxuICAgICAgICBpZiAoIWUub2JqZWN0LnNob3dJbmZvKSB7XG4gICAgICAgICAgICBjZW50ZXIgPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChlLm9iamVjdC5sb25sYXQubG9uLCBlLm9iamVjdC5sb25sYXQubGF0KTtcblxuICAgICAgICAgICAgLy8gZGF5IHZpc2lvbiBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5kYXlfdmlzaW9uX3JhZGl1cyksIDMwKTtcbiAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgZGF5UmFuZ2VMYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGUub2JqZWN0LmRheV92aXNpb25fZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIHRydWUgc2lnaHQgY2lyY2xlXG4gICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24oY2VudGVyLCBnZXRTY2FsZWRSYWRpdXMoZS5vYmplY3QudHJ1ZV9zaWdodF9yYWRpdXMpLCAzMCk7XG4gICAgICAgICAgICBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlLCBudWxsLCBzdHlsZS5saWdodGJsdWUpO1xuICAgICAgICAgICAgdHJ1ZVNpZ2h0UmFuZ2VMYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgIGUub2JqZWN0LnRydWVfc2lnaHRfZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIG5pZ2h0IHZpc2lvbiBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5uaWdodF92aXNpb25fcmFkaXVzKSwgMzApO1xuICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSk7XG4gICAgICAgICAgICBuaWdodFJhbmdlTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICBlLm9iamVjdC5uaWdodF92aXNpb25fZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIC8vIGF0dGFjayByYW5nZSBjaXJjbGVcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhlLm9iamVjdC5hdHRhY2tfcmFuZ2VfcmFkaXVzKSwgMzApO1xuICAgICAgICAgICAgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGNpcmNsZSwgbnVsbCwgc3R5bGUucmVkKTtcbiAgICAgICAgICAgIGF0dGFja1JhbmdlTGF5ZXIuYWRkRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICBlLm9iamVjdC5hdHRhY2tfcmFuZ2VfZmVhdHVyZSA9IGZlYXR1cmU7XG5cbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5hZGRRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIGUub2JqZWN0LnRvd2VyX2xvYy54ICsgJywnICsgZS5vYmplY3QudG93ZXJfbG9jLnkpO1xuXG4gICAgICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGUub2JqZWN0LmxvbmxhdCwgZS5vYmplY3QsIFRPV0VSX0RBWV9WSVNJT05fUkFESVVTKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRheVJhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZS5vYmplY3QuZGF5X3Zpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIG5pZ2h0UmFuZ2VMYXllci5yZW1vdmVGZWF0dXJlcyhlLm9iamVjdC5uaWdodF92aXNpb25fZmVhdHVyZSk7XG4gICAgICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LnRydWVfc2lnaHRfZmVhdHVyZSk7XG4gICAgICAgICAgICBhdHRhY2tSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LmF0dGFja19yYW5nZV9mZWF0dXJlKTtcblxuICAgICAgICAgICAgaWYgKGUub2JqZWN0LnZpc2lvbl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZS5vYmplY3QudmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICAgICAgaWYgKGUub2JqZWN0LnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKGUub2JqZWN0LnZpc2lvbl9jZW50ZXJfZmVhdHVyZSk7XG4gICAgICBcbiAgICAgICAgICAgIGlmICghc2tpcFF1ZXJ5U3RyaW5nVXBkYXRlKSBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKFwidG93ZXJfdmlzaW9uXCIsIGUub2JqZWN0LnRvd2VyX2xvYy54ICsgJywnICsgZS5vYmplY3QudG93ZXJfbG9jLnkpO1xuICAgICAgICB9XG4gICAgICAgIGUub2JqZWN0LnNob3dJbmZvID0gIWUub2JqZWN0LnNob3dJbmZvO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVdhcmRDbGljayhlbnRpdHlOYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUpO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikgUXVlcnlTdHJpbmcuYWRkUXVlcnlTdHJpbmdWYWx1ZShtYXJrZXIud2FyZF90eXBlLCBtYXJrZXIud2FyZF9sb2MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VXYXJkKGxhdGxvbiwgZW50aXR5TmFtZSwgcXNfdmFsdWVfd29ybGRYWSkge1xuICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsYXRsb24pKSByZXR1cm47XG4gICAgICAgIHZhciBlbnRpdHkgPSBFTlRJVElFU1tlbnRpdHlOYW1lXSxcbiAgICAgICAgICAgIG1hcmtlciA9IGNyZWF0ZVdhcmRNYXJrZXIoZW50aXR5Lmljb25fcGF0aCwgbGF0bG9uKSxcbiAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChtYXJrZXIubG9ubGF0LmxvbiwgbWFya2VyLmxvbmxhdC5sYXQpLCBnZXRTY2FsZWRSYWRpdXMoZW50aXR5LnJhZGl1cyksIDQwKSxcbiAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICBpY29uTGF5ZXIuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgICAgIHdhcmRWaXNpb25MYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgbWFya2VyLnJhZGl1c19mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgbWFya2VyLndhcmRfdHlwZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci53YXJkX2xvYyA9IGVudGl0eU5hbWU7XG5cbiAgICAgICAgaWYgKHFzX3ZhbHVlX3dvcmxkWFkgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobGF0bG9uLmxvbiwgbGF0bG9uLmxhdCk7XG4gICAgICAgICAgICB3b3JsZFhZLnggPSB3b3JsZFhZLngudG9GaXhlZCgwKTtcbiAgICAgICAgICAgIHdvcmxkWFkueSA9IHdvcmxkWFkueS50b0ZpeGVkKDApO1xuICAgICAgICAgICAgbWFya2VyLndhcmRfbG9jID0gd29ybGRYWS54ICsgJywnICsgd29ybGRYWS55XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXJrZXIud2FyZF9sb2MgPSBxc192YWx1ZV93b3JsZFhZO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmIGVudGl0eU5hbWUgPT0gJ29ic2VydmVyJykgdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobGF0bG9uLCBtYXJrZXIsIEVOVElUSUVTLm9ic2VydmVyLnJhZGl1cyk7XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwiY2xpY2tcIiwgbWFya2VyLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcInRvdWNoc3RhcnRcIiwgbWFya2VyLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKCdwbGFjZVdhcmQnLCB0aGlzKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FyZE1hcmtlclJlbW92ZShldmVudCkge1xuICAgICAgICBpZiAodGhpcy5yYWRpdXNfZmVhdHVyZSkgd2FyZFZpc2lvbkxheWVyLnJlbW92ZUZlYXR1cmVzKHRoaXMucmFkaXVzX2ZlYXR1cmUpO1xuICAgICAgICBpZiAodGhpcy52aXNpb25fZmVhdHVyZSkgdmlzaW9uU2ltdWxhdGlvbkxheWVyLnJlbW92ZUZlYXR1cmVzKHRoaXMudmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICBpZiAodGhpcy52aXNpb25fY2VudGVyX2ZlYXR1cmUpIHZpc2lvblNpbXVsYXRpb25MYXllci5yZW1vdmVGZWF0dXJlcyh0aGlzLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICBpY29uTGF5ZXIucmVtb3ZlTWFya2VyKHRoaXMpO1xuICAgICAgICBPcGVuTGF5ZXJzLkV2ZW50LnN0b3AoZXZlbnQpO1xuXG4gICAgICAgIFF1ZXJ5U3RyaW5nLnJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUodGhpcy53YXJkX3R5cGUsIHRoaXMud2FyZF9sb2MpO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ldmVudHMudW5yZWdpc3RlcihcImNsaWNrXCIsIHRoaXMsIHdhcmRNYXJrZXJSZW1vdmUpO1xuICAgICAgICB0aGlzLmV2ZW50cy51bnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCB0aGlzLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVPbkNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdoYW5kbGVPbkNsaWNrJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVhc3VyZW1lbnRzKGV2ZW50KSB7XG4gICAgICAgIHZhciBvdXQgPSBcIlwiO1xuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzPHN1cD4yPC9cIiArIFwic3VwPlwiO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLmlubmVySFRNTCA9IG91dDtcblxuICAgICAgICBsYXN0RGlzdGFuY2UgPSBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWVcIikuaW5uZXJIVE1MID0gKGxhc3REaXN0YW5jZSAvIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZXNwZWVkXCIpLnZhbHVlKS50b0ZpeGVkKDIpO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZS1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50cyhldmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgb3V0ID0gXCJcIjtcblxuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgb3V0ICs9IFwiUmFkaXVzOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0czxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IG91dDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHNQYXJ0aWFsKGV2ZW50KSB7XG4gICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIiksXG4gICAgICAgICAgICBvdXQgPSBcIlwiLFxuICAgICAgICAgICAgY2lyY2xlLFxuICAgICAgICAgICAgZmVhdHVyZSxcbiAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgIGlmIChldmVudC5vcmRlciA9PSAxKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubWVhc3VyZSA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudW5pdHMgPT0gXCJrbVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLngsIGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueSksIGV2ZW50Lm1lYXN1cmUgKiAxZTMsIDMwKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24obmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS54LCBldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLnkpLCBldmVudC5tZWFzdXJlLCAzMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgICAgIHBvbHlnb25MYXllci5yZW1vdmVGZWF0dXJlcyhldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMpO1xuICAgICAgICAgICAgICAgIGlmIChcImNpcmNsZV9mZWF0dXJlc1wiIGluIGV2ZW50Lmdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50Lmdlb21ldHJ5LmNpcmNsZV9mZWF0dXJlcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMucHVzaChmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMgPSBbZmVhdHVyZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZlYXR1cmUubWVhc3VyZV9jb250cm9sID0gdGhpcztcbiAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcG9seWdvbkxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5nZW9tZXRyeS5jb21wb25lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZlYXR1cmUuaXNfbWVhc3VyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dCArPSBcIlJhZGl1czogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHM8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlQ29udHJvbCgpIHtcbiAgICAgICAgdmFyIGNvbnRyb2w7XG4gICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdtb2RlJywgbnVsbCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkcmF3Q29udHJvbHMpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBkcmF3Q29udHJvbHNba2V5XTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMsIHRoaXMudmFsdWUsIGtleSwgdGhpcy52YWx1ZSA9PSBrZXkgJiYgdGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlID09IGtleSAmJiB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnbW9kZScsIGtleSk7XG4gICAgICAgICAgICAgICAgY29udHJvbC5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodGhpcy52YWx1ZSA9PSBcInBvbHlnb25Db250cm9sXCIgfHwgdGhpcy52YWx1ZSA9PSBcImNpcmNsZVwiKSAmJiB0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZS1jb250YWluZXJcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUb3dlckhvdmVyUG9wdXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbG9zZUJveCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwID0gdGhpcy5jcmVhdGVQb3B1cCh0aGlzLmNsb3NlQm94KTtcbiAgICAgICAgICAgIG1hcC5hZGRQb3B1cCh0aGlzLnBvcHVwKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3B1cC50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UG9wdXAgPSB0aGlzLnBvcHVwO1xuICAgICAgICBPcGVuTGF5ZXJzLkV2ZW50LnN0b3AoZXZlbnQpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUcmVlSG92ZXJQb3B1cChldmVudCkge1xuICAgICAgICBpZiAodGhpcy5wb3B1cCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnBvcHVwID0gdGhpcy5jcmVhdGVQb3B1cCh0aGlzLmNsb3NlQm94KTtcbiAgICAgICAgICAgIG1hcC5hZGRQb3B1cCh0aGlzLnBvcHVwKTtcbiAgICAgICAgICAgIHRoaXMucG9wdXAuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3B1cC50b2dnbGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UG9wdXAgPSB0aGlzLnBvcHVwO1xuICAgICAgICBPcGVuTGF5ZXJzLkV2ZW50LnN0b3AoZXZlbnQpO1xuICAgIH07XG4gICAgICAgIFxuICAgIGZ1bmN0aW9uIGFkZE1hcmtlcihtYXJrZXJzLCBsbCwgcG9wdXBDbGFzcywgcG9wdXBDb250ZW50SFRNTCwgY2xvc2VCb3gsIG92ZXJmbG93KSB7XG4gICAgICAgIHZhciBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZShtYXJrZXJzLCBsbCksXG4gICAgICAgICAgICBtYXJrZXI7XG5cbiAgICAgICAgZmVhdHVyZS5jbG9zZUJveCA9IGNsb3NlQm94O1xuICAgICAgICBmZWF0dXJlLnBvcHVwQ2xhc3MgPSBwb3B1cENsYXNzO1xuICAgICAgICBmZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5vdmVyZmxvdyA9IG92ZXJmbG93ID8gXCJhdXRvXCIgOiBcImhpZGRlblwiO1xuICAgICAgICBtYXJrZXIgPSBmZWF0dXJlLmNyZWF0ZU1hcmtlcigpO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIFxuICAgICAgICBpZiAobWFya2Vycy5uYW1lID09IFwiVG93ZXJzXCIpIHtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW92ZXJcIiwgZmVhdHVyZSwgaGFuZGxlVG93ZXJIb3ZlclBvcHVwKTtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW91dFwiLCBmZWF0dXJlLCBoYW5kbGVUb3dlckhvdmVyUG9wdXApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG1hcmtlcnMubmFtZSA9PSBcIlRyZWVzXCIgJiYgVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW92ZXJcIiwgZmVhdHVyZSwgaGFuZGxlVHJlZUhvdmVyUG9wdXApO1xuICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlb3V0XCIsIGZlYXR1cmUsIGhhbmRsZVRyZWVIb3ZlclBvcHVwKTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXJzLmFkZE1hcmtlcihtYXJrZXIpO1xuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVdhcmRNYXJrZXIoaW1nLCBsYXRsb24pIHtcbiAgICAgICAgdmFyIHNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKDIxLCAyNSksXG4gICAgICAgICAgICBvZmZzZXQgPSBuZXcgT3BlbkxheWVycy5QaXhlbCgtKHNpemUudyAvIDIpLCAtc2l6ZS5oKSxcbiAgICAgICAgICAgIGljb24gPSBuZXcgT3BlbkxheWVycy5JY29uKGltZywgc2l6ZSwgb2Zmc2V0KSxcbiAgICAgICAgICAgIG1hcmtlciA9IG5ldyBPcGVuTGF5ZXJzLk1hcmtlcihsYXRsb24sIGljb24pO1xuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlV2FyZE1hcmtlcicsIGxhdGxvbik7XG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlcyBhIDY0eDY0IHJlY3RhbmdsZSBmZWF0dXJlIGNlbnRlcmVkIGF0IGNcbiAgICBmdW5jdGlvbiBjcmVhdGVUaWxlRmVhdHVyZShjLCBzdHlsZSkge1xuICAgICAgICB2YXIgcjEgPSB3b3JsZFRvTGF0TG9uKGMueCAtIDMyLCBjLnkgLSAzMiksXG4gICAgICAgICAgICByMiA9IHdvcmxkVG9MYXRMb24oYy54IC0gMzIsIGMueSArIDMyKSxcbiAgICAgICAgICAgIHIzID0gd29ybGRUb0xhdExvbihjLnggKyAzMiwgYy55ICsgMzIpLFxuICAgICAgICAgICAgcjQgPSB3b3JsZFRvTGF0TG9uKGMueCArIDMyLCBjLnkgLSAzMiksXG4gICAgICAgICAgICBib3hfcG9pbnRzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIxLngsIHIxLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIyLngsIHIyLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIzLngsIHIzLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHI0LngsIHI0LnkpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYm94X3JlY3QgPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5MaW5lYXJSaW5nKGJveF9wb2ludHMpLFxuICAgICAgICAgICAgYm94X2ZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3Rvcihib3hfcmVjdCwgbnVsbCwgc3R5bGUpO1xuXG4gICAgICAgIHJldHVybiBib3hfZmVhdHVyZTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGVzIHVybCBmb3IgdGlsZXMuIE9wZW5MYXllcnMgVE1TIExheWVyIGdldFVSTCBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhpc1xuICAgIGZ1bmN0aW9uIGdldE15VVJMKHBhdGNoLCBiYXNlTGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGJvdW5kcykge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZ2V0TXlVUkwnLCBiYXNlTGF5ZXIpO1xuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMubWFwLmdldFJlc29sdXRpb24oKSxcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCgoYm91bmRzLmxlZnQgLSB0aGlzLm1heEV4dGVudC5sZWZ0KSAvIChyZXMgKiB0aGlzLnRpbGVTaXplLncpKSxcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5yb3VuZCgodGhpcy5tYXhFeHRlbnQudG9wIC0gYm91bmRzLnRvcCkgLyAocmVzICogdGhpcy50aWxlU2l6ZS5oKSksXG4gICAgICAgICAgICAgICAgeiA9IG1hcC5nZXRab29tKCksXG4gICAgICAgICAgICAgICAgcGF0aCA9IHogKyBcIi90aWxlX1wiICsgeCArIFwiX1wiICsgeSArIFwiLlwiICsgdGhpcy50eXBlLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgICAgICBpZiAodXJsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnNlbGVjdFVybChwYXRoLCB1cmwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsICsgcGF0Y2ggKyAnLycgKyBiYXNlTGF5ZXIgKyAnLycgKyBwYXRoXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzZXRNYXJrZXJMYXllcnMoKSB7XG4gICAgICAgIGZvciAoayBpbiB0cmVlTWFya2Vycykge1xuICAgICAgICAgICAgaWYgKGN1dFRyZWVzW2tdKSB7XG4gICAgICAgICAgICAgICAgc2V0VHJlZU1hcmtlclN0YXRlKHRyZWVNYXJrZXJzW2tdLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IG1hcF9kYXRhO1xuICAgICAgICBsYXllcktleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW2tdKVswXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmluZyBsYXllcicsIGxheWVyLCBrKTtcbiAgICAgICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGF5UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgbmlnaHRSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBhdHRhY2tSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBtYXAuZXZlbnRzLnVucmVnaXN0ZXIoXCJjaGFuZ2VsYXllclwiLCBtYXAsIGxheWVyQ2hhbmdlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NYXBEYXRhTG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBtYXJrZXJzID0ge30sXG4gICAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgICB2ZWN0b3JMYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUoXCJQbGFjZWQgV2FyZHNcIilbMF0sXG4gICAgICAgICAgICBib3hfcG9pbnRzID0gW10sXG4gICAgICAgICAgICBib3hfcmVjdCwgYm94X2ZlYXR1cmU7XG4gICAgICAgIGxheWVyS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25NYXBEYXRhTG9hZCcsIGspO1xuICAgICAgICAgICAgaWYgKGRhdGFba10pIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgbWFya2VycyBmb3Igbm9uLW5ldXRyYWwgc3Bhd24gYm94IGFuZCBub24tdHJlZSBsYXllcnNcbiAgICAgICAgICAgICAgICBpZiAoayAhPSBcInRyaWdnZXJfbXVsdGlwbGVcIiAmJiBrICE9IFwiZW50X2RvdGFfdHJlZVwiICYmIGsgIT0gXCJub193YXJkc1wiICYmIGsgIT0gXCJlbnRfZm93X2Jsb2NrZXJfbm9kZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNba10gPSBuZXcgT3BlbkxheWVycy5MYXllci5NYXJrZXJzKGxheWVyTmFtZXNba10sIHt2aXNpYmlsaXR5OiBmYWxzZX0pO1xuICAgICAgICAgICAgICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbWFya2Vyc1trXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhW2tdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihkYXRhW2tdW2ldLngsIGRhdGFba11baV0ueSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBhZGRNYXJrZXIobWFya2Vyc1trXSwgbmV3IE9wZW5MYXllcnMuTG9uTGF0KGxhdGxvbi54LCBsYXRsb24ueSksIE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQsIFwiQ2xpY2sgdG8gdG9nZ2xlIHJhbmdlIG92ZXJsYXlcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmRheV92aXNpb25fcmFkaXVzID0gVE9XRVJfREFZX1ZJU0lPTl9SQURJVVM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIubmlnaHRfdmlzaW9uX3JhZGl1cyA9IFRPV0VSX05JR0hUX1ZJU0lPTl9SQURJVVM7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudHJ1ZV9zaWdodF9yYWRpdXMgPSBUT1dFUl9UUlVFX1NJR0hUX1JBRElVUztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5hdHRhY2tfcmFuZ2VfcmFkaXVzID0gVE9XRVJfQVRUQUNLX1JBTkdFX1JBRElVUztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zaG93SW5mbyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoayA9PSBcIm5wY19kb3RhX3Rvd2VyXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbnBjX2RvdGFfdG93ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwiY2xpY2tcIiwgbWFya2Vyc1trXSwgaGFuZGxlVG93ZXJNYXJrZXJDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcInRvdWNoc3RhcnRcIiwgbWFya2Vyc1trXSwgaGFuZGxlVG93ZXJNYXJrZXJDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnRvd2VyX2xvYyA9IGRhdGFba11baV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU2V0IHVwIHRyZWUgbGF5ZXIgd2l0aG91dCBjcmVhdGluZyB0cmVlIG1hcmtlcnMgeWV0XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PSBcImVudF9kb3RhX3RyZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlcnNba10uZGF0YSA9IGRhdGFba107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXV0cmFsIHNwYXduIG1hcmtlcnMgYW5kIHJlY3RhbmdsZXNcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09IFwidHJpZ2dlcl9tdWx0aXBsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRKU09ORGF0YShtYXJrZXJzLCBrLCBcIm5wY19kb3RhX25ldXRyYWxfc3Bhd25lcl9ib3hcIiwgZGF0YVtrXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgICAgICBpZiAoayA9PT0gXCJub193YXJkc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRHZW9KU09ORGF0YShtYXJrZXJzLCBrLCBsYXllck5hbWVzW2tdLCBzdHlsZS5yZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09PSBcImVudF9mb3dfYmxvY2tlcl9ub2RlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsIGssIGxheWVyTmFtZXNba10sIHN0eWxlLmxpZ2h0Ymx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTsgICAgICAgIFxuXG4gICAgICAgIG1hcF9kYXRhID0gZGF0YTtcbiAgICAgICAgXG4gICAgICAgIG1hcC5yYWlzZUxheWVyKHZlY3RvckxheWVyLCBtYXAubGF5ZXJzLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRyZWUgbWFya2VycyB0aGUgZmlyc3QgdGltZSB0aGUgdHJlZSBsYXllciBpcyBzd2l0Y2hlZCB0b1xuICAgICAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwiY2hhbmdlbGF5ZXJcIiwgbWFwLCBsYXllckNoYW5nZUhhbmRsZXIpO1xuXG4gICAgICAgIHBhcnNlUXVlcnlTdHJpbmcoKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbGF5ZXJDaGFuZ2VIYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIgJiYgZXZlbnQubGF5ZXIubmFtZSA9PSBsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSAmJiAhZXZlbnQubGF5ZXIubG9hZGVkKSB7XG4gICAgICAgICAgICBsb2FkVHJlZURhdGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5wcm9wZXJ0eSA9PT0gXCJ2aXNpYmlsaXR5XCIpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5sYXllci5pc0Jhc2VMYXllcikge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdCYXNlTGF5ZXInLCBldmVudC5sYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKGV2ZW50LmxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJyksIGV2ZW50LmxheWVyLnZpc2liaWxpdHkgPyB0cnVlIDogbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVHJlZURhdGEoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFydCB0cmVlIGxvYWQnKTtcbiAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSlbMF07XG4gICAgICAgIGNvbnNvbGUubG9nKGxheWVyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXllci5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihsYXllci5kYXRhW2ldLngsIGxheWVyLmRhdGFbaV0ueSk7XG4gICAgICAgICAgICBtYXJrZXIgPSBhZGRNYXJrZXIobGF5ZXIsIG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChsYXRsb24ueCwgbGF0bG9uLnkpLCBPcGVuTGF5ZXJzLlBvcHVwLkZyYW1lZENsb3VkLCBcIkNsaWNrIHRvIGN1dCBkb3duIHRyZWUuPGJyPlRoaXMgd2lsbCBhZmZlY3QgdGhlIHdhcmQgdmlzaW9uIHNpbXVsYXRpb24uXCIsIGZhbHNlKTtcbiAgICAgICAgICAgIG1hcmtlci50cmVlVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICBtYXJrZXIudHJlZV9sb2MgPSBsYXllci5kYXRhW2ldLnggKyAnLCcgKyBsYXllci5kYXRhW2ldLnk7XG4gICAgICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04pIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwiY2xpY2tcIiwgbWFya2VyLCBoYW5kbGVUcmVlTWFya2VyQ2xpY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJlZU1hcmtlcnNbbGF5ZXIuZGF0YVtpXS54ICsgJywnICsgbGF5ZXIuZGF0YVtpXS55XSA9IG1hcmtlcjtcbiAgICAgICAgfVxuICAgICAgICBsYXllci5sb2FkZWQgPSAhbGF5ZXIubG9hZGVkO1xuICAgICAgICBjb25zb2xlLmxvZygnZW5kIHRyZWUgbG9hZCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRKU09ORGF0YShtYXJrZXJzLCBrLCBuYW1lLCBkYXRhKSB7XG4gICAgICAgIG1hcmtlcnNbbmFtZV0gPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IobGF5ZXJOYW1lc1trXSk7XG4gICAgICAgIG1hcC5hZGRMYXllcihtYXJrZXJzW25hbWVdKTtcbiAgICAgICAgbWFya2Vyc1tuYW1lXS5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwbnQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZGF0YVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBsYXRsb24gPSB3b3JsZFRvTGF0TG9uKGRhdGFbaV1bal0ueCwgZGF0YVtpXVtqXS55KTtcbiAgICAgICAgICAgICAgICBwbnQucHVzaChuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChsYXRsb24ueCwgbGF0bG9uLnkpKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICBsbiA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LkxpbmVhclJpbmcocG50KTtcbiAgICAgICAgICAgIHBmID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IobG4sIG51bGwsIHN0eWxlLmdyZWVuKTtcbiAgICAgICAgICAgIG1hcmtlcnNbbmFtZV0uYWRkRmVhdHVyZXMoW3BmXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIG1hcCBzZXR0aW5ncyBiYXNlZCBvbiBxdWVyeSBzdHJpbmcgdmFsdWVzXG4gICAgZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZygpIHtcbiAgICAgICAgdmFyIG1vZGUgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ21vZGUnKTtcbiAgICAgICAgaWYgKG1vZGUpIHtcbiAgICAgICAgICAgIHZhciBtb2RlUmFkaW9CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RlICsgJ1RvZ2dsZScpO1xuICAgICAgICAgICAgaWYgKG1vZGVSYWRpb0J1dHRvbikge1xuICAgICAgICAgICAgICAgIG1vZGVSYWRpb0J1dHRvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0b2dnbGVDb250cm9sLmNhbGwobW9kZVJhZGlvQnV0dG9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgem9vbSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnem9vbScpO1xuICAgICAgICBpZiAoem9vbSkge1xuICAgICAgICAgICAgbWFwLnpvb21UbyhwYXJzZUludCh6b29tKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdvcmxkWCA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgneCcpO1xuICAgICAgICB2YXIgd29ybGRZID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCd5Jyk7XG4gICAgICAgIGlmICh3b3JsZFggJiYgd29ybGRZKSB7XG4gICAgICAgICAgICB2YXIgbG9ubGF0ID0gd29ybGRUb0xhdExvbih3b3JsZFgsIHdvcmxkWSk7XG4gICAgICAgICAgICBtYXAuc2V0Q2VudGVyKG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChsb25sYXQueCwgbG9ubGF0LnkpLCB1bmRlZmluZWQsIGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBrZXlzID0gWydvYnNlcnZlcicsICdzZW50cnknXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgd2FyZHMgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoa2V5c1tpXSlcbiAgICAgICAgICAgIGlmICh3YXJkcykge1xuICAgICAgICAgICAgICAgIHdhcmRfY29vcmRpbmF0ZXMgPSB0cmltKHdhcmRzLCAnIDsnKS5zcGxpdCgnOycpXG4gICAgICAgICAgICAgICAgd2FyZF9jb29yZGluYXRlcy5tYXAoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvb3JkID0gZWwuc3BsaXQoJywnKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHh5ID0gd29ybGRUb0xhdExvbihwYXJzZUZsb2F0KGNvb3JkWzBdKSwgcGFyc2VGbG9hdChjb29yZFsxXSkpO1xuICAgICAgICAgICAgICAgICAgICBwbGFjZVdhcmQobmV3IE9wZW5MYXllcnMuTG9uTGF0KHh5LngsIHh5LnkpLCBrZXlzW2ldLCBlbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciBiYXNlTGF5ZXJOYW1lID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdCYXNlTGF5ZXInKTtcbiAgICAgICAgaWYgKGJhc2VMYXllck5hbWUpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFzZUxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IGJhc2VMYXllcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGxheWVyLm5hbWUucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgICAgICAgICAgICAgaWYgKGJhc2VMYXllck5hbWUgPT09IGxheWVyTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBtYXAuc2V0QmFzZUxheWVyKGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmb3IgKGsgaW4gbGF5ZXJOYW1lcykge1xuICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGxheWVyTmFtZXNba10ucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZShsYXllck5hbWUpO1xuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW2tdKVswXTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncGFyc2VRdWVyeVN0cmluZycsIGxheWVyLCBsYXllck5hbWVzW2tdLCBsYXllck5hbWUsIHZhbHVlID09IFwidHJ1ZVwiKTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIpIGxheWVyLnNldFZpc2liaWxpdHkodmFsdWUgPT0gXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1dF90cmVlcyA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnY3V0X3RyZWVzJyk7XG4gICAgICAgIGlmIChjdXRfdHJlZXMpIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1tcImVudF9kb3RhX3RyZWVcIl0pWzBdO1xuICAgICAgICAgICAgaWYgKCFsYXllci5sb2FkZWQpIGxvYWRUcmVlRGF0YSgpO1xuICAgICAgICAgICAgY3V0X3RyZWVfY29vcmRpbmF0ZXMgPSB0cmltKGN1dF90cmVlcywgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU1hcmtlcnMsIGN1dF90cmVlX2Nvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3V0X3RyZWVfY29vcmRpbmF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjdXRfdHJlZV9jb29yZGluYXRlc1tpXSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVNYXJrZXJzW2N1dF90cmVlX2Nvb3JkaW5hdGVzW2ldXSkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUcmVlTWFya2VyU3RhdGUodHJlZU1hcmtlcnNbY3V0X3RyZWVfY29vcmRpbmF0ZXNbaV1dLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvd2VyX3Zpc2lvbiA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgndG93ZXJfdmlzaW9uJyk7XG4gICAgICAgIGlmICh0b3dlcl92aXNpb24pIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1tcIm5wY19kb3RhX3Rvd2VyXCJdKVswXTtcbiAgICAgICAgICAgIHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcyA9IHRyaW0odG93ZXJfdmlzaW9uLCAnIDsnKS5zcGxpdCgnOycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndG93ZXJfdmlzaW9uJywgbGF5ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codHJlZU1hcmtlcnMsIHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvd2VyX3Zpc2lvbl9jb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGF5ZXIubWFya2Vycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIubWFya2Vyc1tqXS50b3dlcl9sb2MueCArICcsJyArIGxheWVyLm1hcmtlcnNbal0udG93ZXJfbG9jLnkgPT0gdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVUb3dlck1hcmtlckNsaWNrKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGxheWVyLm1hcmtlcnNbal1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHNldFRyZWVRdWVyeVN0cmluZygpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gT2JqZWN0LmtleXMoY3V0VHJlZXMpLmpvaW4oJzsnKTtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2N1dF90cmVlcycsIHZhbHVlIHx8IG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEpTT04ocGF0aCwgY2FsbGJhY2spIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEpTT04nLCBwYXRoKTtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHBhdGgsIHRydWUpO1xuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBsb2FkaW5nIHBhZ2UuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGxvYWRpbmcgcGFnZS4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmVxdWVzdC5zZW5kKCk7XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH1cblxuICAgIC8qKioqKioqKioqKioqKioqKioqKlxuICAgICAqIElOSVRJVElBTElaQVRJT04gKlxuICAgICAqKioqKioqKioqKioqKioqKioqKi9cbiAgICBPcGVuTGF5ZXJzLkltZ1BhdGggPSBJTUdfRElSO1xuICAgIFxuICAgIC8vIFN0YXJ0IHNldHRpbmcgdXAgdGhlIG1hcCwgYWRkaW5nIGNvbnRyb2xzIGFuZCBsYXllcnNcbiAgICBiYXNlTGF5ZXJzLmZvckVhY2goZnVuY3Rpb24obGF5ZXIpIHtcbiAgICAgICAgbWFwLmFkZExheWVyKGxheWVyKTtcbiAgICB9KTtcbiAgICBtYXAuYWRkTGF5ZXIoY3Vyc29yTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihkYXlSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIobmlnaHRSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIodHJ1ZVNpZ2h0UmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKGF0dGFja1JhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihwb2x5Z29uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih3YXJkVmlzaW9uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih2aXNpb25TaW11bGF0aW9uTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihpY29uTGF5ZXIpO1xuICAgIG1hcC5hZGRDb250cm9sKGNvb3JkaW5hdGVDb250cm9sKTtcbiAgICBtYXAuYWRkQ29udHJvbChuZXcgT3BlbkxheWVycy5Db250cm9sLlRvdWNoTmF2aWdhdGlvbih7XG4gICAgICAgIGRyYWdQYW5PcHRpb25zOiB7XG4gICAgICAgICAgICBlbmFibGVLaW5ldGljOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5LZXlib2FyZERlZmF1bHRzKCkpO1xuICAgIG1hcC5hZGRDb250cm9sKGxheWVyU3dpdGNoZXIpO1xuICAgIGxheWVyU3dpdGNoZXIubWF4aW1pemVDb250cm9sKCk7XG4gICAgaWYgKCFtYXAuZ2V0Q2VudGVyKCkpIHtcbiAgICAgICAgbWFwLnpvb21Ub01heEV4dGVudCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjcmVhdGUgY2xpY2sgaGFuZGxlclxuICAgIE9wZW5MYXllcnMuQ29udHJvbC5DbGljayA9IE9wZW5MYXllcnMuQ2xhc3MoT3BlbkxheWVycy5Db250cm9sLCB7XG4gICAgICAgIGRlZmF1bHRIYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgc2luZ2xlOiB0cnVlLFxuICAgICAgICAgICAgXCJkb3VibGVcIjogZmFsc2UsXG4gICAgICAgICAgICBwaXhlbFRvbGVyYW5jZTogMCxcbiAgICAgICAgICAgIHN0b3BTaW5nbGU6IGZhbHNlLFxuICAgICAgICAgICAgc3RvcERvdWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyT3B0aW9ucyA9IE9wZW5MYXllcnMuVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgICAgIE9wZW5MYXllcnMuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IE9wZW5MYXllcnMuSGFuZGxlci5DbGljayh0aGlzLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMub25DbGljayxcbiAgICAgICAgICAgICAgICBkYmxjbGljazogdGhpcy5vbkRibGNsaWNrXG4gICAgICAgICAgICB9LCB0aGlzLmhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljazogaGFuZGxlT25DbGljayxcbiAgICAgICAgb25EYmxjbGljazogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmtleSArIFwiT3V0cHV0XCIpLFxuICAgICAgICAgICAgICAgIG1zZyA9IFwiZGJsY2xpY2sgXCIgKyBldmVudC54eTtcbiAgICAgICAgICAgIG91dHB1dC52YWx1ZSA9IG91dHB1dC52YWx1ZSArIG1zZyArIFwiXFxuXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIENvbnRyb2xzIGNvbmZpZ3VyYXRpb25cbiAgICByZW5kZXJlciA9IHJlbmRlcmVyID8gW3JlbmRlcmVyXSA6IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yLnByb3RvdHlwZS5yZW5kZXJlcnM7XG4gICAgZHJhd0NvbnRyb2xzID0ge1xuICAgICAgICBsaW5lOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoT3BlbkxheWVycy5IYW5kbGVyLlBhdGgsIHtcbiAgICAgICAgICAgIHBlcnNpc3Q6IHRydWUsXG4gICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM6IHJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgY2lyY2xlOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoT3BlbkxheWVycy5IYW5kbGVyLlBhdGgsIHtcbiAgICAgICAgICAgIHBlcnNpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyZXJzOiByZW5kZXJlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIG9ic2VydmVyOiBuZXcgT3BlbkxheWVycy5Db250cm9sLkNsaWNrKHtcbiAgICAgICAgICAgIG9uQ2xpY2s6IGhhbmRsZVdhcmRDbGljaygnb2JzZXJ2ZXInKSxcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2luZ2xlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBzZW50cnk6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2soe1xuICAgICAgICAgICAgb25DbGljazogaGFuZGxlV2FyZENsaWNrKCdzZW50cnknKSxcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2luZ2xlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBwb2x5Z29uQ29udHJvbDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5EcmF3RmVhdHVyZShwb2x5Z29uTGF5ZXIsIE9wZW5MYXllcnMuSGFuZGxlci5SZWd1bGFyUG9seWdvbiwge1xuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBzaWRlczogMzBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHNlbGVjdDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5TZWxlY3RGZWF0dXJlKHBvbHlnb25MYXllciwge1xuICAgICAgICAgICAgaG92ZXI6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLm1lYXN1cmVfY29udHJvbCAmJiBmZWF0dXJlLmlzX21lYXN1cmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlckZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgICAgICAgICBvdXQgPSBcIlJhZGl1czogXCIgKyAoLjU2NTM1MiAqIE1hdGguc3FydChmZWF0dXJlLmdlb21ldHJ5LmdldEFyZWEoKSkgKiBtYXBDb25zdGFudHMuc2NhbGUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KGZlYXR1cmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dEZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0KGZlYXR1cmUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIC8vIEFkZCBjb250cm9scyB0byBtYXBcbiAgICBmb3IgKHZhciBrZXkgaW4gZHJhd0NvbnRyb2xzKSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJsaW5lXCIpIHtcbiAgICAgICAgICAgIGRyYXdDb250cm9sc1trZXldLmV2ZW50cy5vbih7XG4gICAgICAgICAgICAgICAgbWVhc3VyZTogaGFuZGxlTWVhc3VyZW1lbnRzLFxuICAgICAgICAgICAgICAgIG1lYXN1cmVwYXJ0aWFsOiBoYW5kbGVNZWFzdXJlbWVudHNcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNba2V5XS5ldmVudHMub24oe1xuICAgICAgICAgICAgICAgIG1lYXN1cmU6IGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgICAgICAgICBtZWFzdXJlcGFydGlhbDogaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzUGFydGlhbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBtYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbHNba2V5XSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgd2FpdCk7XG4gICAgICAgICAgICBpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwiem9vbWVuZFwiLCBtYXAsIGRlYm91bmNlKGZ1bmN0aW9uKCl7XG4gICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCd6b29tJywgbWFwLmdldFpvb20oKSk7XG4gICAgfSwgNTAwKSk7XG5cbiAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwibW92ZWVuZFwiLCBtYXAsIGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFwQ2VudGVyID0gbWFwLmdldENlbnRlcigpO1xuICAgICAgICBpZiAobWFwQ2VudGVyKSB7XG4gICAgICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobWFwQ2VudGVyLmxvbiwgbWFwQ2VudGVyLmxhdCk7XG4gICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygneCcsIHdvcmxkWFkueC50b0ZpeGVkKDApKTtcbiAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCd5Jywgd29ybGRYWS55LnRvRml4ZWQoMCkpO1xuICAgICAgICB9XG4gICAgfSwgNTAwKSk7XG5cbiAgICAvLyBYL1kgY29vcmRpbmF0ZSB1cGRhdGUgZGlzcGxheSBoYW5kbGVyXG4gICAgY29vcmRpbmF0ZUNvbnRyb2wuZm9ybWF0T3V0cHV0ID0gZnVuY3Rpb24gKGxvbmxhdCkge1xuICAgICAgICB2YXIgd29ybGRYWSA9IGxhdExvblRvV29ybGQobG9ubGF0LmxvbiwgbG9ubGF0LmxhdCk7XG4gICAgICAgIHJldHVybiB3b3JsZFhZLngudG9GaXhlZCgwKSArICcsICcgKyB3b3JsZFhZLnkudG9GaXhlZCgwKTtcbiAgICB9O1xuICAgIFxuICAgIG1hcC5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW1vdmVcIiwgbWFwLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIC8qaWYgKHdhcmRWaXNpb25MYXllci5jdXJzb3JfbWFya2VyKSB7XG4gICAgICAgICAgICBpZiAod2FyZFZpc2lvbkxheWVyLmN1cnNvcl9tYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB3YXJkVmlzaW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXMod2FyZFZpc2lvbkxheWVyLmN1cnNvcl9tYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKTtcbiAgICAgICAgICAgIGlmICh3YXJkVmlzaW9uTGF5ZXIuY3Vyc29yX21hcmtlci52aXNpb25fZmVhdHVyZSkgd2FyZFZpc2lvbkxheWVyLnJlbW92ZUZlYXR1cmVzKHdhcmRWaXNpb25MYXllci5jdXJzb3JfbWFya2VyLnZpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIHdhcmRWaXNpb25MYXllci5yZW1vdmVGZWF0dXJlcyh3YXJkVmlzaW9uTGF5ZXIuY3Vyc29yX21hcmtlcik7XG4gICAgICAgIH0qL1xuICAgICAgICBjdXJzb3JMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICBcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY3Vyc29yIG1hcmtlciBwb2x5Z29uIGlmIGluIHBsYWNlIG9ic2VydmVyIG1vZGVcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmIHZzLnJlYWR5ICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzZXJ2ZXJUb2dnbGVcIikuY2hlY2tlZCkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZS54eSk7XG4gICAgICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsb25sYXQpKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsb25sYXQubG9uLCBsb25sYXQubGF0KTtcbiAgICAgICAgICAgIHZhciBncmlkWFkgPSB2cy5Xb3JsZFhZdG9HcmlkWFkod29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdHJlZVB0cyA9IHZzLnRyZWVfcmVsYXRpb25zW2dyaWRYWS5rZXldO1xuICAgICAgICAgICAgdmFyIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSB2cy50cmVlX3N0YXRlW3RyZWVQdC5rZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUJsb2NraW5nKSBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3Vyc29yX3N0eWxlID0gc3R5bGUuZ3JlZW47XG4gICAgICAgICAgICBpZiAoIXZzLmlzVmFsaWRYWShncmlkWFkueCwgZ3JpZFhZLnksIHRydWUsIHRydWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yX3N0eWxlID0gc3R5bGUucmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJveF9mZWF0dXJlID0gY3JlYXRlVGlsZUZlYXR1cmUodnMuR3JpZFhZdG9Xb3JsZFhZKGdyaWRYWS54LCBncmlkWFkueSksIGN1cnNvcl9zdHlsZSk7XG4gICAgICAgICAgICBjdXJzb3JMYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgIC8vd2FyZFZpc2lvbkxheWVyLmN1cnNvcl9tYXJrZXIgPSBib3hfZmVhdHVyZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUykgdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobG9ubGF0LCBudWxsLCBFTlRJVElFUy5vYnNlcnZlci5yYWRpdXMpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTaG93L2hpZGUgY29udHJvbHMgcGFuZWxcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1heFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzXCIpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaWYgKGxheWVyU3dpdGNoZXIuaXNTbWFsbFNjcmVlbigpKSB7XG4gICAgICAgICAgICBsYXllclN3aXRjaGVyLm1pbmltaXplQ29udHJvbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGZ1bmN0aW9uIG1pbmltaXplQ29udHJvbExpc3QoZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRyb2xzXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWF4XCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtaW5pbWl6ZUNvbnRyb2xMaXN0LCBmYWxzZSk7XG4gICAgXG4gICAgLy8gSW5pdGlhbGx5IGhpZGUgY29udHJvbHMgaWYgc2NyZWVuIGlzIHNtYWxsXG4gICAgaWYgKGxheWVyU3dpdGNoZXIuaXNTbWFsbFNjcmVlbigpKSB7XG4gICAgICAgIG1pbmltaXplQ29udHJvbExpc3QuY2FsbChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKSk7XG4gICAgICAgIGxheWVyU3dpdGNoZXIubWluaW1pemVDb250cm9sKCk7XG4gICAgfVxuXG4gICAgLy8gU2hvdy9oaWRlIFgvWSBjb29yZGluYXRlIGRpc3BsYXlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvb3JkQ29udHJvbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vbENvbnRyb2xNb3VzZVBvc2l0aW9uXCIpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5vbENvbnRyb2xNb3VzZVBvc2l0aW9uXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBWaXNpb24gc2ltdWxhdGlvbiBvbi9vZmZcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2lvblNpbXVsYXRpb25Db250cm9sXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBWSVNJT05fU0lNVUxBVElPTiA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHdheXNTaW11bGF0ZUNvbnRyb2xcIikuZGlzYWJsZWQgPSAhdGhpcy5jaGVja2VkO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIEFsd2F5cyBzaW11bGF0ZSB2aXNpb24gb24vb2ZmXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHdheXNTaW11bGF0ZUNvbnRyb2xcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUyA9IHRoaXMuY2hlY2tlZDtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBVcGRhdGUgdHJhdmVsIHRpbWUgZGlzcGxheSB3aGVuIG1vdmVzcGVlZCBpbnB1dCBjaGFuZ2VzXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3Zlc3BlZWRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHJhdmVsdGltZVwiKS5pbm5lckhUTUwgPSAobGFzdERpc3RhbmNlIC8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3Zlc3BlZWRcIikudmFsdWUpLnRvRml4ZWQoMik7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gU2V0IHVwIHBhbmVsIHJhZGlvIGJ1dHRvbiB0b2dnbGUgaGFuZGxlcnNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmF2aWdhdGVUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGluZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXJjbGVUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JzZXJ2ZXJUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VudHJ5VG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc2V0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIHBvbHlnb25MYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgd2FyZFZpc2lvbkxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIGljb25MYXllci5jbGVhck1hcmtlcnMoKTtcbiAgICAgICAgZHJhd0NvbnRyb2xzLmxpbmUuY2FuY2VsKCk7XG4gICAgICAgIGRyYXdDb250cm9scy5jaXJjbGUuY2FuY2VsKCk7XG4gICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIoYmFzZUxheWVyc1swXSk7XG4gICAgICAgIG1hcC56b29tVG9NYXhFeHRlbnQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnZGF0YScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnZhbHVlKTtcbiAgICAgICAgcmVzZXRNYXJrZXJMYXllcnMoKTtcbiAgICAgICAgaW5pdCgpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgZGF0YSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgnZGF0YScpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWUgPSBkYXRhO1xuICAgICAgICB9XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gZGF0YSAhPSBcIjY4N1wiO1xuICAgICAgICAvL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1cInZpc2lvblNpbXVsYXRpb25Db250cm9sXCJdJykuc3R5bGUuZGlzcGxheSA9IFZJU0lPTl9TSU1VTEFUSU9OID8gJ2lubGluZScgOiAnbm9uZSc7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIikuZGlzYWJsZWQgPSAhVklTSU9OX1NJTVVMQVRJT047XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWx3YXlzU2ltdWxhdGVDb250cm9sXCIpLmRpc2FibGVkID0gIVZJU0lPTl9TSU1VTEFUSU9OO1xuICAgICAgICBnZXRKU09OKG1hcF9kYXRhX3BhdGggKyBnZXREYXRhVmVyc2lvbigpICsgJy9tYXBkYXRhLmpzb24nLCBvbk1hcERhdGFMb2FkKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0RGF0YVZlcnNpb24oKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihsYXRsb24sIG1hcmtlciwgcmFkaXVzKSB7XG4gICAgICAgIGlmICghdnMucmVhZHkpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgIC8vY29uc29sZS5sb2cobGF0bG9uLCBtYXJrZXIsIHJhZGl1cyk7XG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgIGlmICh2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY2VudGVyIG1hcmtlciBwb2x5Z29uXG4gICAgICAgICAgICB2YXIgYm94X2ZlYXR1cmUgPSBjcmVhdGVUaWxlRmVhdHVyZSh2cy5HcmlkWFl0b1dvcmxkWFkoZ3JpZFhZLngsIGdyaWRYWS55KSwgc3R5bGUuZ3JlZW4pO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgICAgICBtYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlID0gYm94X2ZlYXR1cmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGV4ZWN1dGUgdmlzaW9uIHNpbXVsYXRpb25cbiAgICAgICAgICAgIHZzLnVwZGF0ZVZpc2liaWxpdHkoZ3JpZFhZLngsIGdyaWRYWS55LCBnZXRUaWxlUmFkaXVzKHJhZGl1cykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBtZXJnZSBsaWdodCBwb2ludHMgaW50byBhIHNpbmdsZSBwb2x5Z29uIGFuZCBhZGQgdG8gdmlzaW9uIGxheWVyXG4gICAgICAgICAgICB2YXIgb3V0bGluZXMgPSBnZXRMaWdodFVuaW9uKHZzLmdyaWQsIHZzLmxpZ2h0cyk7XG4gICAgICAgICAgICB2YXIgcG9seWdvbkxpc3QgPSBvdXRsaW5lcy5tYXAoZnVuY3Rpb24gKG91dGxpbmVQb2ludHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmluZ1BvaW50cyA9IG91dGxpbmVQb2ludHMubWFwKGZ1bmN0aW9uIChwdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd29ybGRYWSA9IHZzLkdyaWRYWXRvV29ybGRYWShwdC54LCBwdC55KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24od29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobGF0bG9uLngsIGxhdGxvbi55KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB2YXIgcmluZyA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LkxpbmVhclJpbmcocmluZ1BvaW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24oW3JpbmddKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIG11bHRpUG9seWdvbiA9IG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5Lk11bHRpUG9seWdvbihwb2x5Z29uTGlzdCk7XG4gICAgICAgICAgICB2YXIgdmlzaW9uRmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKG11bHRpUG9seWdvbiwgbnVsbCwgc3R5bGUueWVsbG93KTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIuYWRkRmVhdHVyZXMoW3Zpc2lvbkZlYXR1cmVdKTtcbiAgICAgICAgICAgICAgICBtYXJrZXIudmlzaW9uX2ZlYXR1cmUgPSB2aXNpb25GZWF0dXJlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yTGF5ZXIuYWRkRmVhdHVyZXMoW3Zpc2lvbkZlYXR1cmVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgZ2V0U2l6ZVBvbGw7XG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgdnMgPSBuZXcgVmlzaW9uU2ltdWxhdGlvbih3b3JsZGRhdGEsIHZpc2lvbl9kYXRhX2ltYWdlX3BhdGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZzIGxvYWRlZCcsIERhdGUubm93KCkgLSB0MSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXAuZ2V0U2l6ZSgpJywgbWFwLmdldFNpemUoKSk7XG4gICAgICAgIGluaXRDaGVjaygpO1xuICAgIH0pO1xuICAgIFxuICAgIHZhciBpbml0Q2hlY2tDb3VudCA9IDA7XG4gICAgdmFyIG1heEluaXRDaGVja0NvdW50ID0gNDA7XG4gICAgZnVuY3Rpb24gaW5pdENoZWNrKCkge1xuICAgICAgICBpZiAobWFwLmdldFNpemUoKSkge1xuICAgICAgICAgICAgaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaW5pdENoZWNrQ291bnQrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtYXAgc2l6ZSBudWxsJyk7XG4gICAgICAgICAgICBpZiAoaW5pdENoZWNrQ291bnQgPCBtYXhJbml0Q2hlY2tDb3VudCkge1xuICAgICAgICAgICAgICAgIG1hcC51cGRhdGVTaXplKCk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChpbml0Q2hlY2ssIDI1MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb2xsYmFyLmVycm9yKFwiTWF4IGluaXQgY2hlY2sgZXhjZWVkZWRcIik7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJUaGVyZSB3YXMgYSBwcm9ibGVtIGxvYWRpbmcgdGhlIG1hcC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsIGssIG5hbWUsIHN0eWxlKSB7XG4gICAgICAgIHZhciBmaWxlbmFtZSA9IG1hcF9kYXRhX3BhdGggKyBnZXREYXRhVmVyc2lvbigpICsgJy8nICsgayArICcyLmpzb24nO1xuICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKG5hbWUsIHtcbiAgICAgICAgICAgIHN0cmF0ZWdpZXM6IFtuZXcgT3BlbkxheWVycy5TdHJhdGVneS5GaXhlZCgpXSxcbiAgICAgICAgICAgIHByb3RvY29sOiBuZXcgT3BlbkxheWVycy5Qcm90b2NvbC5IVFRQKHtcbiAgICAgICAgICAgICAgICB1cmw6IGZpbGVuYW1lLFxuICAgICAgICAgICAgICAgIGZvcm1hdDogbmV3IE9wZW5MYXllcnMuRm9ybWF0Lkdlb0pTT04oKVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB2aXNpYmlsaXR5OiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgbWFya2Vyc1trXS5zdHlsZSA9IHN0eWxlO1xuICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1trXSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDsiLCJ2YXIgbWFwQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9tYXBDb25zdGFudHMnKTtcblxuZnVuY3Rpb24gbGVycChtaW5WYWwsIG1heFZhbCwgcG9zX3IpIHtcbiAgICByZXR1cm4gcG9zX3IgKiAobWF4VmFsIC0gbWluVmFsKSArIG1pblZhbDtcbn1cblxuZnVuY3Rpb24gcmV2ZXJzZUxlcnAobWluVmFsLCBtYXhWYWwsIHBvcykge1xuICAgIHJldHVybiAocG9zIC0gbWluVmFsKSAvIChtYXhWYWwgLSBtaW5WYWwpO1xufVxuXG5mdW5jdGlvbiBsYXRMb25Ub1dvcmxkKHgsIHkpIHtcbiAgICB2YXIgeF9yID0gbGVycChtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0sIHggLyBtYXBDb25zdGFudHMubWFwX3cpLFxuICAgICAgICB5X3IgPSBsZXJwKG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1sxXSwgKG1hcENvbnN0YW50cy5tYXBfaCAtIHkpIC8gbWFwQ29uc3RhbnRzLm1hcF9oKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHhfcixcbiAgICAgICAgeTogeV9yXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gd29ybGRUb0xhdExvbih4X3IsIHlfcikge1xuICAgIHZhciB4ID0gcmV2ZXJzZUxlcnAobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdLCB4X3IpICogbWFwQ29uc3RhbnRzLm1hcF93LFxuICAgICAgICB5ID0gbWFwQ29uc3RhbnRzLm1hcF9oIC0gcmV2ZXJzZUxlcnAobWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzFdLCB5X3IpICogbWFwQ29uc3RhbnRzLm1hcF9oO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGdldFRpbGVSYWRpdXMocikge1xuICAgIHJldHVybiBwYXJzZUludChNYXRoLmZsb29yKHIgLyA2NCkpO1xufVxuXG5mdW5jdGlvbiBnZXRTY2FsZWRSYWRpdXMocikge1xuICAgIHJldHVybiByIC8gKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdIC0gbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0pICogbWFwQ29uc3RhbnRzLm1hcF93XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZURpc3RhbmNlKG9yZGVyLCB1bml0cywgbWVhc3VyZSkge1xuICAgIGlmIChvcmRlciA9PSAxKSB7XG4gICAgICAgIGlmICh1bml0cyA9PSBcImttXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBtZWFzdXJlICogbWFwQ29uc3RhbnRzLnNjYWxlICogMTAwMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtZWFzdXJlICogbWFwQ29uc3RhbnRzLnNjYWxlO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGU7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsZXJwOiBsZXJwLFxuICAgIHJldmVyc2VMZXJwOiByZXZlcnNlTGVycCxcbiAgICBsYXRMb25Ub1dvcmxkOiBsYXRMb25Ub1dvcmxkLFxuICAgIHdvcmxkVG9MYXRMb246IHdvcmxkVG9MYXRMb24sXG4gICAgZ2V0VGlsZVJhZGl1czogZ2V0VGlsZVJhZGl1cyxcbiAgICBnZXRTY2FsZWRSYWRpdXM6IGdldFNjYWxlZFJhZGl1cyxcbiAgICBjYWxjdWxhdGVEaXN0YW5jZTogY2FsY3VsYXRlRGlzdGFuY2Vcbn0iLCJ2YXIgVmlzaW9uU2ltdWxhdGlvbiA9IHJlcXVpcmUoXCJkb3RhLXZpc2lvbi1zaW11bGF0aW9uXCIpO1xudmFyIGtleTJwdCA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLmtleTJwdDtcbnZhciB4eTJrZXkgPSBWaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJrZXk7XG52YXIgeHkycHQgPSBWaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJwdDtcblxuZnVuY3Rpb24gcHJvY2Vzc05laWdoYm9ycyhncmlkLCBsaWdodHMsIGNvbXBvbmVudHMsIGtleSwgaW5kZXgpIHtcbiAgICB2YXIgcHQgPSBrZXkycHQoa2V5KTtcbiAgICB2YXIgZGlycyA9IFtbMSwgMF0sIFswLCAtMV0sIFstMSwgMF0sIFswLCAxXV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhWCA9IHB0LngrZGlyc1tpXVswXTtcbiAgICAgICAgdmFyIGFZID0gcHQueStkaXJzW2ldWzFdO1xuICAgICAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIGNvbnRpbnVlO1xuICAgICAgICB2YXIga2V5QWRqID0gZ3JpZFthWF1bYVldLmtleVxuICAgICAgICBpZiAoY29tcG9uZW50c1trZXlBZGpdIHx8ICFsaWdodHNba2V5QWRqXSkgY29udGludWU7XG4gICAgICAgIGNvbXBvbmVudHNba2V5QWRqXSA9IGluZGV4O1xuICAgICAgICBwcm9jZXNzTmVpZ2hib3JzKGdyaWQsIGxpZ2h0cywgY29tcG9uZW50cywga2V5QWRqLCBpbmRleCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRMaWdodFVuaW9uKGdyaWQsIGxpZ2h0cykge1xuICAgIHZhciBjb21wb25lbnRzID0ge307XG4gICAgdmFyIGluZGV4ID0gMTtcbiAgICBmb3IgKHZhciBrZXkgaW4gbGlnaHRzKSB7XG4gICAgICAgIGlmICghY29tcG9uZW50c1trZXldKSB7XG4gICAgICAgICAgICBjb21wb25lbnRzW2tleV0gPSBpbmRleDtcbiAgICAgICAgICAgIHByb2Nlc3NOZWlnaGJvcnMoZ3JpZCwgbGlnaHRzLCBjb21wb25lbnRzLCBrZXksIGluZGV4KTtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgdmFyIG91dGxpbmVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbmRleDsgaSsrKSB7XG4gICAgICAgIG91dGxpbmVzLnB1c2goZ2V0T3V0bGluZShncmlkLCBjb21wb25lbnRzLCBpKSlcbiAgICB9XG4gICAgcmV0dXJuIG91dGxpbmVzO1xufVxuXG5mdW5jdGlvbiBpc1NpZGVGcmVlKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBkaXIpIHtcbiAgICB2YXIgYVggPSBwdC54K2RpclswXTtcbiAgICB2YXIgYVkgPSBwdC55K2RpclsxXTtcbiAgICBpZiAoIWdyaWRbYVhdIHx8ICFncmlkW2FYXVthWV0pIHJldHVybiB0cnVlO1xuICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgcmV0dXJuICFjb21wb25lbnRzW2tleUFkal07XG59XG5cbmZ1bmN0aW9uIG5vdFN1cnJvdW5kZWQoZ3JpZCwgY29tcG9uZW50cywgcHQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrPTIpIHtcbiAgICAgICAgdmFyIGFYID0gcHQueCtNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgICAgICB2YXIgYVkgPSBwdC55K01hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuIGk7XG4gICAgICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgICAgIGlmICghY29tcG9uZW50c1trZXlBZGpdKSByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIG1vZChuLCBtKSB7XG4gICAgICAgIHJldHVybiAoKG4gJSBtKSArIG0pICUgbTtcbn1cblxuZnVuY3Rpb24gZ2V0T3V0bGluZShncmlkLCBjb21wb25lbnRzLCBpbmRleCkge1xuICAgIHZhciBvdXRsaW5lUG9pbnRzID0gW107XG4gICAgdmFyIHN0YXJ0S2V5O1xuICAgIHZhciBkaXIgPSBudWxsO1xuICAgIGZvciAodmFyIGtleSBpbiBjb21wb25lbnRzKSB7XG4gICAgICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgICAgICBkaXIgPSBub3RTdXJyb3VuZGVkKGdyaWQsIGNvbXBvbmVudHMsIHB0KTtcbiAgICAgICAgaWYgKGNvbXBvbmVudHNba2V5XSA9PSBpbmRleCAmJiBkaXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXJ0S2V5ID0ga2V5O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5leHQgPSBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBzdGFydEtleSwgZGlyKTtcbiAgICB3aGlsZSAoc3RhcnRLZXkgIT09IG5leHQua2V5IHx8IGRpciAhPT0gbmV4dC5kaXIpIHtcbiAgICAgICAgb3V0bGluZVBvaW50cy5wdXNoKG5leHQucG9pbnQpO1xuICAgICAgICBuZXh0ID0gcHJvY2Vzc05leHQoZ3JpZCwgY29tcG9uZW50cywgbmV4dC5rZXksIG5leHQuZGlyKTtcbiAgICB9XG4gICAgb3V0bGluZVBvaW50cy5wdXNoKG5leHQucG9pbnQpO1xuICAgIHJldHVybiBvdXRsaW5lUG9pbnRzO1xufVxuXG5mdW5jdGlvbiBjaGVja0FkaihncmlkLCBjb21wb25lbnRzLCBwdCwga2V5LCBkaXIsIGksIGFkakRpcikge1xuICAgIHZhciBhWCA9IHB0LngrZGlyWzBdO1xuICAgIHZhciBhWSA9IHB0LnkrZGlyWzFdO1xuICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuO1xuICAgIHZhciBwdEFkaiA9IGdyaWRbcHQueCtkaXJbMF1dW3B0LnkrZGlyWzFdXTtcbiAgICBpZiAoY29tcG9uZW50c1twdEFkai5rZXldID09IGNvbXBvbmVudHNba2V5XSAmJiBpc1NpZGVGcmVlKGdyaWQsIGNvbXBvbmVudHMsIHB0QWRqLCBhZGpEaXIpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IHB0QWRqLmtleSxcbiAgICAgICAgICAgIGRpcjogaVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBrZXksIGkpIHtcbiAgICB2YXIgcHQgPSBrZXkycHQoa2V5KTtcbiAgICB2YXIgbmV4dDtcbiAgICBcbiAgICB2YXIgeCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgdmFyIHkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogaSkpO1xuICAgIFxuICAgIHZhciBuSSA9IG1vZChpKzIsIDgpO1xuICAgIHZhciBuWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBuSSkpO1xuICAgIHZhciBuWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBuSSkpO1xuICAgIFxuICAgIHZhciBiSSA9IG1vZChpLTEsIDgpO1xuICAgIHZhciBiWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBiSSkpO1xuICAgIHZhciBiWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBiSSkpO1xuXG4gICAgaWYgKGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHQsIFtuWCwgblldKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICBkaXI6IG1vZChpKzIsIDgpLFxuICAgICAgICAgICAgcG9pbnQ6IHh5MnB0KHB0LngrYlgvMiwgcHQueStiWS8yKVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghbmV4dCkgbmV4dCA9IGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIFtuWCwgblldLCBpLCBbeCwgeV0pO1xuICAgIGlmICghbmV4dCkge1xuICAgICAgICB2YXIgYUkgPSBtb2QoaSArIDEsIDgpO1xuICAgICAgICB2YXIgYVggPSBNYXRoLnJvdW5kKE1hdGguY29zKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYUkpKTtcbiAgICAgICAgdmFyIGFZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGFJKSk7XG4gICAgICAgIHZhciBwSSA9IG1vZChpIC0gMiwgOCk7XG4gICAgICAgIHZhciBwWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBwSSkpO1xuICAgICAgICB2YXIgcFkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogcEkpKTtcbiAgICAgICAgbmV4dCA9IGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIFthWCwgYVldLCBwSSwgW3BYLCBwWV0pO1xuICAgIH1cbiAgICBpZiAobmV4dCkge1xuICAgICAgICBuZXh0LnBvaW50ID0geHkycHQocHQueCtiWC8yLCBwdC55K2JZLzIpO1xuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRMaWdodFVuaW9uOyIsInZhciBtYXBDb25zdGFudHMgPSB7XG4gICAgbWFwX3c6IDE2Mzg0LFxuICAgIG1hcF9oOiAxNjM4NCxcbiAgICBtYXBfeF9ib3VuZGFyaWVzOiBbLTg0NzUuNTg2MTczNzcsIDkzMjcuNDkxMjQ1NTldLFxuICAgIG1hcF95X2JvdW5kYXJpZXM6IFs5MDI4LjUyNDczMzMyLCAtODgzNi42MTQwNjI2Nl1cbn1cbm1hcENvbnN0YW50cy5zY2FsZSA9IE1hdGguYWJzKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzFdIC0gbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMF0pIC8gbWFwQ29uc3RhbnRzLm1hcF93O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENvbnN0YW50czsiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsaWdodGJsdWU6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC40XG4gICAgfSxcbiAgICByZWQ6IHtcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VXaWR0aDogMSxcbiAgICAgICAgZmlsbENvbG9yOiBcIiNGRjAwMDBcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IC40XG4gICAgfSxcbiAgICBncmVlbjoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBGRjAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwRkYwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjRcbiAgICB9LFxuICAgIHllbGxvdzoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkZGRjAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI0ZGRkYwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjRcbiAgICB9XG59OyIsInZhciB0cmltID0gcmVxdWlyZSgnLi90cmltJyk7XG5cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckJ5TmFtZShuYW1lKSB7XG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXVwiKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiKSxcbiAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMobG9jYXRpb24uc2VhcmNoKTtcbiAgICByZXR1cm4gcmVzdWx0cyA9PSBudWxsID8gXCJcIiA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG5mdW5jdGlvbiBzZXRRdWVyeVN0cmluZyhrZXksIHZhbHVlKSB7XG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgXCJcIiwgdXBkYXRlUXVlcnlTdHJpbmcoa2V5LCB2YWx1ZSkpO1xufVxuXG5mdW5jdGlvbiBhZGRRdWVyeVN0cmluZ1ZhbHVlKGtleSwgdmFsdWUpIHtcbiAgICBjb25zb2xlLmxvZygnYWRkUXVlcnlTdHJpbmdWYWx1ZScsIGtleSwgdmFsdWUpO1xuICAgIHZhciBxcyA9IGdldFBhcmFtZXRlckJ5TmFtZShrZXkpO1xuICAgIHFzID0gdHJpbSh0cmltKHFzLCAnIDsnKSArICc7JyArIHZhbHVlLCAnIDsnKTtcbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBcIlwiLCB1cGRhdGVRdWVyeVN0cmluZyhrZXksIHFzKSk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUoa2V5LCB2YWx1ZSkge1xuICAgIGNvbnNvbGUubG9nKCdyZW1vdmVRdWVyeVN0cmluZ1ZhbHVlJywga2V5LCB2YWx1ZSk7XG4gICAgdmFyIHFzID0gZ2V0UGFyYW1ldGVyQnlOYW1lKGtleSk7XG4gICAgcXMgPSB0cmltKHRyaW0ocXMsICcgOycpLnJlcGxhY2UodmFsdWUsICcnKS5yZXBsYWNlKC87Oy9nLCAnJyksICcgOycpO1xuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgcXMgIT0gJycgPyBxcyA6IG51bGwpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUXVlcnlTdHJpbmcoa2V5LCB2YWx1ZSwgdXJsKSB7XG4gICAgaWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIFwiPS4qPygmfCN8JCkoLiopXCIsIFwiZ2lcIiksXG4gICAgICAgIGhhc2g7XG5cbiAgICBpZiAocmUudGVzdCh1cmwpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlLCAnJDEnICsga2V5ICsgXCI9XCIgKyB2YWx1ZSArICckMiQzJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFzaCA9IHVybC5zcGxpdCgnIycpO1xuICAgICAgICAgICAgdXJsID0gaGFzaFswXS5yZXBsYWNlKHJlLCAnJDEkMycpLnJlcGxhY2UoLygmfFxcPykkLywgJycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoWzFdICE9PSAndW5kZWZpbmVkJyAmJiBoYXNoWzFdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHVybCArPSAnIycgKyBoYXNoWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyAnJicgOiAnPyc7XG4gICAgICAgICAgICBoYXNoID0gdXJsLnNwbGl0KCcjJyk7XG4gICAgICAgICAgICB1cmwgPSBoYXNoWzBdICsgc2VwYXJhdG9yICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc2hbMV0gIT09ICd1bmRlZmluZWQnICYmIGhhc2hbMV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgdXJsICs9ICcjJyArIGhhc2hbMV07XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0UGFyYW1ldGVyQnlOYW1lOiBnZXRQYXJhbWV0ZXJCeU5hbWUsXG4gICAgc2V0UXVlcnlTdHJpbmc6IHNldFF1ZXJ5U3RyaW5nLFxuICAgIGFkZFF1ZXJ5U3RyaW5nVmFsdWU6IGFkZFF1ZXJ5U3RyaW5nVmFsdWUsXG4gICAgcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZTogcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZSxcbiAgICB1cGRhdGVRdWVyeVN0cmluZzogdXBkYXRlUXVlcnlTdHJpbmdcbn0iLCJmdW5jdGlvbiBlc2NhcGVSZWdleChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXFtcXF0oKXt9PyorXFxeJFxcXFwufFxcLV0vZywgXCJcXFxcJCZcIik7XG59XG5cbnZhciB0cmltID0gZnVuY3Rpb24gdHJpbShzdHIsIGNoYXJhY3RlcnMsIGZsYWdzKSB7XG4gICAgZmxhZ3MgPSBmbGFncyB8fCBcImdcIjtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2hhcmFjdGVycyAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgZmxhZ3MgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IG11c3QgYmUgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghL15bZ2ldKiQvLnRlc3QoZmxhZ3MpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGZsYWdzIHN1cHBsaWVkICdcIiArIGZsYWdzLm1hdGNoKG5ldyBSZWdFeHAoXCJbXmdpXSpcIikpICsgXCInXCIpO1xuICAgIH1cblxuICAgIGNoYXJhY3RlcnMgPSBlc2NhcGVSZWdleChjaGFyYWN0ZXJzKTtcblxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXltcIiArIGNoYXJhY3RlcnMgKyBcIl0rfFtcIiArIGNoYXJhY3RlcnMgKyBcIl0rJFwiLCBmbGFncyksICcnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbTsiLCJ2YXIgUE5HID0gcmVxdWlyZSgncG5nLWpzJyk7XG5cbmZ1bmN0aW9uIEltYWdlSGFuZGxlcihpbWFnZVBhdGgpIHtcbiAgICB0aGlzLmltYWdlUGF0aCA9IGltYWdlUGF0aDtcbiAgICBzZWxmLmNhbnZhcyA9IG51bGw7XG4gICAgc2VsZi5wbmcgPSBudWxsO1xufVxuSW1hZ2VIYW5kbGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgc2VsZi5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIFBORy5sb2FkKHRoaXMuaW1hZ2VQYXRoLCBzZWxmLmNhbnZhcywgZnVuY3Rpb24ocG5nKSB7XG4gICAgICAgIHNlbGYucG5nID0gcG5nO1xuICAgICAgICBzZWxmLmN0eCA9IHNlbGYuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbn1cbkltYWdlSGFuZGxlci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIHBpeGVsSGFuZGxlciwgZ3JpZCkge1xuICAgIHZhciBpbWdEYXRhID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKG9mZnNldCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdmFyIGRhdGEgPSBpbWdEYXRhLmRhdGE7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgdmFyIHIgPSBkYXRhW2ldO1xuICAgICAgICB2YXIgZyA9IGRhdGFbaSsxXTtcbiAgICAgICAgdmFyIGIgPSBkYXRhW2krMl07XG4gICAgICAgIHZhciBhbHBoYSA9IGRhdGFbaSszXTtcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKChpLzQpICUgd2lkdGgpO1xuICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoKGkvNCkgLyBoZWlnaHQpO1xuICAgICAgICBwaXhlbEhhbmRsZXIoeCwgeSwgW3IsIGcsIGJdLCBncmlkKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VIYW5kbGVyOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS40LjBcblxuLypcbiMgTUlUIExJQ0VOU0VcbiMgQ29weXJpZ2h0IChjKSAyMDExIERldm9uIEdvdmV0dFxuIyBcbiMgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIFxuIyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgXG4jIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIFxuIyBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgXG4jIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4jIFxuIyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIFxuIyBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4jIFxuIyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBcbiMgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIFxuIyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBcbiMgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBcbiMgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG52YXIgRmxhdGVTdHJlYW0gPSByZXF1aXJlKCcuL3psaWInKTtcblxuICB2YXIgUE5HO1xuXG4gIFBORyA9IChmdW5jdGlvbigpIHtcbiAgICBQTkcubG9hZCA9IGZ1bmN0aW9uKHVybCwgY2FudmFzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHhocixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYgKHR5cGVvZiBjYW52YXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYW52YXM7XG4gICAgICB9XG4gICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEsIHBuZztcbiAgICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KHhoci5yZXNwb25zZSB8fCB4aHIubW96UmVzcG9uc2VBcnJheUJ1ZmZlcik7XG4gICAgICAgIHBuZyA9IG5ldyBQTkcoZGF0YSk7XG4gICAgICAgIGlmICh0eXBlb2YgKGNhbnZhcyAhPSBudWxsID8gY2FudmFzLmdldENvbnRleHQgOiB2b2lkIDApID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcG5nLnJlbmRlcihjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiA/IGNhbGxiYWNrKHBuZykgOiB2b2lkIDA7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHhoci5zZW5kKG51bGwpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQTkcoZGF0YSkge1xuICAgICAgdmFyIGNodW5rU2l6ZSwgY29sb3JzLCBkZWxheURlbiwgZGVsYXlOdW0sIGZyYW1lLCBpLCBpbmRleCwga2V5LCBzZWN0aW9uLCBzaG9ydCwgdGV4dCwgX2ksIF9qLCBfcmVmO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgIHRoaXMucG9zID0gODtcbiAgICAgIHRoaXMucGFsZXR0ZSA9IFtdO1xuICAgICAgdGhpcy5pbWdEYXRhID0gW107XG4gICAgICB0aGlzLnRyYW5zcGFyZW5jeSA9IHt9O1xuICAgICAgdGhpcy50ZXh0ID0ge307XG4gICAgICBmcmFtZSA9IG51bGw7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjaHVua1NpemUgPSB0aGlzLnJlYWRVSW50MzIoKTtcbiAgICAgICAgc2VjdGlvbiA9ICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9pLCBfcmVzdWx0cztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgX2kgPCA0OyBpID0gKytfaSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuZGF0YVt0aGlzLnBvcysrXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgIH0pLmNhbGwodGhpcykpLmpvaW4oJycpO1xuICAgICAgICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlICdJSERSJzpcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnJlYWRVSW50MzIoKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgICAgICB0aGlzLmJpdHMgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmNvbG9yVHlwZSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuY29tcHJlc3Npb25NZXRob2QgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmZpbHRlck1ldGhvZCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJsYWNlTWV0aG9kID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnUExURSc6XG4gICAgICAgICAgICB0aGlzLnBhbGV0dGUgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0lEQVQnOlxuICAgICAgICAgICAgaWYgKHNlY3Rpb24gPT09ICdmZEFUJykge1xuICAgICAgICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgICAgICAgICAgICBjaHVua1NpemUgLT0gNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSAoZnJhbWUgIT0gbnVsbCA/IGZyYW1lLmRhdGEgOiB2b2lkIDApIHx8IHRoaXMuaW1nRGF0YTtcbiAgICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgMCA8PSBjaHVua1NpemUgPyBfaSA8IGNodW5rU2l6ZSA6IF9pID4gY2h1bmtTaXplOyBpID0gMCA8PSBjaHVua1NpemUgPyArK19pIDogLS1faSkge1xuICAgICAgICAgICAgICBkYXRhLnB1c2godGhpcy5kYXRhW3RoaXMucG9zKytdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RSTlMnOlxuICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kgPSB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBzaG9ydCA9IDI1NSAtIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoaSA9IF9qID0gMDsgMCA8PSBzaG9ydCA/IF9qIDwgc2hvcnQgOiBfaiA+IHNob3J0OyBpID0gMCA8PSBzaG9ydCA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQucHVzaCgyNTUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmdyYXlzY2FsZSA9IHRoaXMucmVhZChjaHVua1NpemUpWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kucmdiID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0RVh0JzpcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgIGluZGV4ID0gdGV4dC5pbmRleE9mKDApO1xuICAgICAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIHRleHQuc2xpY2UoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMudGV4dFtrZXldID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIHRleHQuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdJRU5EJzpcbiAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5mcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oYXNBbHBoYUNoYW5uZWwgPSAoX3JlZiA9IHRoaXMuY29sb3JUeXBlKSA9PT0gNCB8fCBfcmVmID09PSA2O1xuICAgICAgICAgICAgY29sb3JzID0gdGhpcy5jb2xvcnMgKyAodGhpcy5oYXNBbHBoYUNoYW5uZWwgPyAxIDogMCk7XG4gICAgICAgICAgICB0aGlzLnBpeGVsQml0bGVuZ3RoID0gdGhpcy5iaXRzICogY29sb3JzO1xuICAgICAgICAgICAgdGhpcy5jb2xvclNwYWNlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdEZXZpY2VHcmF5JztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ0RldmljZVJHQic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmltZ0RhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmltZ0RhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLnBvcyArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgaWYgKHRoaXMucG9zID4gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29tcGxldGUgb3IgY29ycnVwdCBQTkcgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBORy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICB2YXIgaSwgX2ksIF9yZXN1bHRzO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IF9pID0gMDsgMCA8PSBieXRlcyA/IF9pIDwgYnl0ZXMgOiBfaSA+IGJ5dGVzOyBpID0gMCA8PSBieXRlcyA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgIF9yZXN1bHRzLnB1c2godGhpcy5kYXRhW3RoaXMucG9zKytdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZWFkVUludDMyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjEsIGIyLCBiMywgYjQ7XG4gICAgICBiMSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCAyNDtcbiAgICAgIGIyID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDE2O1xuICAgICAgYjMgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgODtcbiAgICAgIGI0ID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgcmV0dXJuIGIxIHwgYjIgfCBiMyB8IGI0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLnJlYWRVSW50MTYgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiMSwgYjI7XG4gICAgICBiMSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCA4O1xuICAgICAgYjIgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICByZXR1cm4gYjEgfCBiMjtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5kZWNvZGVQaXhlbHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgYnl0ZSwgYywgY29sLCBpLCBsZWZ0LCBsZW5ndGgsIHAsIHBhLCBwYWV0aCwgcGIsIHBjLCBwaXhlbEJ5dGVzLCBwaXhlbHMsIHBvcywgcm93LCBzY2FubGluZUxlbmd0aCwgdXBwZXIsIHVwcGVyTGVmdCwgX2ksIF9qLCBfaywgX2wsIF9tO1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICBkYXRhID0gdGhpcy5pbWdEYXRhO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKTtcbiAgICAgIH1cbiAgICAgIGRhdGEgPSBuZXcgRmxhdGVTdHJlYW0oZGF0YSk7XG4gICAgICBkYXRhID0gZGF0YS5nZXRCeXRlcygpO1xuICAgICAgcGl4ZWxCeXRlcyA9IHRoaXMucGl4ZWxCaXRsZW5ndGggLyA4O1xuICAgICAgc2NhbmxpbmVMZW5ndGggPSBwaXhlbEJ5dGVzICogdGhpcy53aWR0aDtcbiAgICAgIHBpeGVscyA9IG5ldyBVaW50OEFycmF5KHNjYW5saW5lTGVuZ3RoICogdGhpcy5oZWlnaHQpO1xuICAgICAgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICByb3cgPSAwO1xuICAgICAgcG9zID0gMDtcbiAgICAgIGMgPSAwO1xuICAgICAgd2hpbGUgKHBvcyA8IGxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKGRhdGFbcG9zKytdKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgZm9yIChpID0gX2kgPSAwOyBfaSA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2kgKz0gMSkge1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZm9yIChpID0gX2ogPSAwOyBfaiA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2ogKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IChieXRlICsgbGVmdCkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBmb3IgKGkgPSBfayA9IDA7IF9rIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfayArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIHVwcGVyID0gcm93ICYmIHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAodXBwZXIgKyBieXRlKSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGZvciAoaSA9IF9sID0gMDsgX2wgPCBzY2FubGluZUxlbmd0aDsgaSA9IF9sICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBjb2wgPSAoaSAtIChpICUgcGl4ZWxCeXRlcykpIC8gcGl4ZWxCeXRlcztcbiAgICAgICAgICAgICAgbGVmdCA9IGkgPCBwaXhlbEJ5dGVzID8gMCA6IHBpeGVsc1tjIC0gcGl4ZWxCeXRlc107XG4gICAgICAgICAgICAgIHVwcGVyID0gcm93ICYmIHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIE1hdGguZmxvb3IoKGxlZnQgKyB1cHBlcikgLyAyKSkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBmb3IgKGkgPSBfbSA9IDA7IF9tIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfbSArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICBpZiAocm93ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdXBwZXIgPSB1cHBlckxlZnQgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwcGVyID0gcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgY29sICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICAgIHVwcGVyTGVmdCA9IGNvbCAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyAoY29sIC0gMSkgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcCA9IGxlZnQgKyB1cHBlciAtIHVwcGVyTGVmdDtcbiAgICAgICAgICAgICAgcGEgPSBNYXRoLmFicyhwIC0gbGVmdCk7XG4gICAgICAgICAgICAgIHBiID0gTWF0aC5hYnMocCAtIHVwcGVyKTtcbiAgICAgICAgICAgICAgcGMgPSBNYXRoLmFicyhwIC0gdXBwZXJMZWZ0KTtcbiAgICAgICAgICAgICAgaWYgKHBhIDw9IHBiICYmIHBhIDw9IHBjKSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSBsZWZ0O1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBiIDw9IHBjKSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSB1cHBlcjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWV0aCA9IHVwcGVyTGVmdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IChieXRlICsgcGFldGgpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZmlsdGVyIGFsZ29yaXRobTogXCIgKyBkYXRhW3BvcyAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgICByb3crKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBwaXhlbHM7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlUGFsZXR0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGMsIGksIGxlbmd0aCwgcGFsZXR0ZSwgcG9zLCByZXQsIHRyYW5zcGFyZW5jeSwgX2ksIF9yZWYsIF9yZWYxO1xuICAgICAgcGFsZXR0ZSA9IHRoaXMucGFsZXR0ZTtcbiAgICAgIHRyYW5zcGFyZW5jeSA9IHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQgfHwgW107XG4gICAgICByZXQgPSBuZXcgVWludDhBcnJheSgodHJhbnNwYXJlbmN5Lmxlbmd0aCB8fCAwKSArIHBhbGV0dGUubGVuZ3RoKTtcbiAgICAgIHBvcyA9IDA7XG4gICAgICBsZW5ndGggPSBwYWxldHRlLmxlbmd0aDtcbiAgICAgIGMgPSAwO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfcmVmID0gcGFsZXR0ZS5sZW5ndGg7IF9pIDwgX3JlZjsgaSA9IF9pICs9IDMpIHtcbiAgICAgICAgcmV0W3BvcysrXSA9IHBhbGV0dGVbaV07XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2kgKyAxXTtcbiAgICAgICAgcmV0W3BvcysrXSA9IHBhbGV0dGVbaSArIDJdO1xuICAgICAgICByZXRbcG9zKytdID0gKF9yZWYxID0gdHJhbnNwYXJlbmN5W2MrK10pICE9IG51bGwgPyBfcmVmMSA6IDI1NTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuY29weVRvSW1hZ2VEYXRhID0gZnVuY3Rpb24oaW1hZ2VEYXRhLCBwaXhlbHMpIHtcbiAgICAgIHZhciBhbHBoYSwgY29sb3JzLCBkYXRhLCBpLCBpbnB1dCwgaiwgaywgbGVuZ3RoLCBwYWxldHRlLCB2LCBfcmVmO1xuICAgICAgY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICBwYWxldHRlID0gbnVsbDtcbiAgICAgIGFscGhhID0gdGhpcy5oYXNBbHBoYUNoYW5uZWw7XG4gICAgICBpZiAodGhpcy5wYWxldHRlLmxlbmd0aCkge1xuICAgICAgICBwYWxldHRlID0gKF9yZWYgPSB0aGlzLl9kZWNvZGVkUGFsZXR0ZSkgIT0gbnVsbCA/IF9yZWYgOiB0aGlzLl9kZWNvZGVkUGFsZXR0ZSA9IHRoaXMuZGVjb2RlUGFsZXR0ZSgpO1xuICAgICAgICBjb2xvcnMgPSA0O1xuICAgICAgICBhbHBoYSA9IHRydWU7XG4gICAgICB9XG4gICAgICBkYXRhID0gaW1hZ2VEYXRhLmRhdGEgfHwgaW1hZ2VEYXRhO1xuICAgICAgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICBpbnB1dCA9IHBhbGV0dGUgfHwgcGl4ZWxzO1xuICAgICAgaSA9IGogPSAwO1xuICAgICAgaWYgKGNvbG9ycyA9PT0gMSkge1xuICAgICAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICAgIGsgPSBwYWxldHRlID8gcGl4ZWxzW2kgLyA0XSAqIDQgOiBqO1xuICAgICAgICAgIHYgPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IHY7XG4gICAgICAgICAgZGF0YVtpKytdID0gdjtcbiAgICAgICAgICBkYXRhW2krK10gPSB2O1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGFscGhhID8gaW5wdXRbaysrXSA6IDI1NTtcbiAgICAgICAgICBqID0gaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICBrID0gcGFsZXR0ZSA/IHBpeGVsc1tpIC8gNF0gKiA0IDogajtcbiAgICAgICAgICBkYXRhW2krK10gPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSBhbHBoYSA/IGlucHV0W2srK10gOiAyNTU7XG4gICAgICAgICAgaiA9IGs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICByZXQgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKiA0KTtcbiAgICAgIHRoaXMuY29weVRvSW1hZ2VEYXRhKHJldCwgdGhpcy5kZWNvZGVQaXhlbHMoKSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgdmFyIGN0eCwgZGF0YTtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgdGhpcy5jb3B5VG9JbWFnZURhdGEoZGF0YSwgdGhpcy5kZWNvZGVQaXhlbHMoKSk7XG4gICAgICByZXR1cm4gY3R4LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFBORztcblxuICB9KSgpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gUE5HOyIsIi8qXG4gKiBFeHRyYWN0ZWQgZnJvbSBwZGYuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZWFzZ2FsL3BkZi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb25cbiAqXG4gKiBDb250cmlidXRvcnM6IEFuZHJlYXMgR2FsIDxnYWxAbW96aWxsYS5jb20+XG4gKiAgICAgICAgICAgICAgIENocmlzIEcgSm9uZXMgPGNqb25lc0Btb3ppbGxhLmNvbT5cbiAqICAgICAgICAgICAgICAgU2hhb24gQmFybWFuIDxzaGFvbi5iYXJtYW5AZ21haWwuY29tPlxuICogICAgICAgICAgICAgICBWaXZpZW4gTmljb2xhcyA8MjFAdmluZ3RldHVuLm9yZz5cbiAqICAgICAgICAgICAgICAgSnVzdGluIEQnQXJjYW5nZWxvIDxqdXN0aW5kYXJjQGdtYWlsLmNvbT5cbiAqICAgICAgICAgICAgICAgWXVyeSBEZWxlbmRpa1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4gKiBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksXG4gKiB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uXG4gKiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSxcbiAqIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICogU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTFxuICogVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSXG4gKiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxudmFyIERlY29kZVN0cmVhbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICB0aGlzLmVvZiA9IGZhbHNlO1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHtcbiAgICBlbnN1cmVCdWZmZXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9lbnN1cmVCdWZmZXIocmVxdWVzdGVkKSB7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICB2YXIgY3VycmVudCA9IGJ1ZmZlciA/IGJ1ZmZlci5ieXRlTGVuZ3RoIDogMDtcbiAgICAgIGlmIChyZXF1ZXN0ZWQgPCBjdXJyZW50KVxuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgdmFyIHNpemUgPSA1MTI7XG4gICAgICB3aGlsZSAoc2l6ZSA8IHJlcXVlc3RlZClcbiAgICAgICAgc2l6ZSA8PD0gMTtcbiAgICAgIHZhciBidWZmZXIyID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnQ7ICsraSlcbiAgICAgICAgYnVmZmVyMltpXSA9IGJ1ZmZlcltpXTtcbiAgICAgIHJldHVybiB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjI7XG4gICAgfSxcbiAgICBnZXRCeXRlOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Qnl0ZSgpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyW3RoaXMucG9zKytdO1xuICAgIH0sXG4gICAgZ2V0Qnl0ZXM6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9nZXRCeXRlcyhsZW5ndGgpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcblxuICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICB0aGlzLmVuc3VyZUJ1ZmZlcihwb3MgKyBsZW5ndGgpO1xuICAgICAgICB2YXIgZW5kID0gcG9zICsgbGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5lb2YgJiYgdGhpcy5idWZmZXJMZW5ndGggPCBlbmQpXG4gICAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcblxuICAgICAgICB2YXIgYnVmRW5kID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICAgIGlmIChlbmQgPiBidWZFbmQpXG4gICAgICAgICAgZW5kID0gYnVmRW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmVvZilcbiAgICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuXG4gICAgICAgIHZhciBlbmQgPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSBlbmQ7XG4gICAgICByZXR1cm4gdGhpcy5idWZmZXIuc3ViYXJyYXkocG9zLCBlbmQpO1xuICAgIH0sXG4gICAgbG9va0NoYXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9sb29rQ2hhcigpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5idWZmZXJbdGhpcy5wb3NdKTtcbiAgICB9LFxuICAgIGdldENoYXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9nZXRDaGFyKCkge1xuICAgICAgdmFyIHBvcyA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IHBvcykge1xuICAgICAgICBpZiAodGhpcy5lb2YpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ1ZmZlclt0aGlzLnBvcysrXSk7XG4gICAgfSxcbiAgICBtYWtlU3ViU3RyZWFtOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fbWFrZVN1YnN0cmVhbShzdGFydCwgbGVuZ3RoLCBkaWN0KSB7XG4gICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gZW5kICYmICF0aGlzLmVvZilcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIHJldHVybiBuZXcgU3RyZWFtKHRoaXMuYnVmZmVyLCBzdGFydCwgbGVuZ3RoLCBkaWN0KTtcbiAgICB9LFxuICAgIHNraXA6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9za2lwKG4pIHtcbiAgICAgIGlmICghbilcbiAgICAgICAgbiA9IDE7XG4gICAgICB0aGlzLnBvcyArPSBuO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9yZXNldCgpIHtcbiAgICAgIHRoaXMucG9zID0gMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufSkoKTtcblxudmFyIEZsYXRlU3RyZWFtID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgY29kZUxlbkNvZGVNYXAgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVcbiAgXSk7XG5cbiAgdmFyIGxlbmd0aERlY29kZSA9IG5ldyBVaW50MzJBcnJheShbXG4gICAgMHgwMDAwMywgMHgwMDAwNCwgMHgwMDAwNSwgMHgwMDAwNiwgMHgwMDAwNywgMHgwMDAwOCwgMHgwMDAwOSwgMHgwMDAwYSxcbiAgICAweDEwMDBiLCAweDEwMDBkLCAweDEwMDBmLCAweDEwMDExLCAweDIwMDEzLCAweDIwMDE3LCAweDIwMDFiLCAweDIwMDFmLFxuICAgIDB4MzAwMjMsIDB4MzAwMmIsIDB4MzAwMzMsIDB4MzAwM2IsIDB4NDAwNDMsIDB4NDAwNTMsIDB4NDAwNjMsIDB4NDAwNzMsXG4gICAgMHg1MDA4MywgMHg1MDBhMywgMHg1MDBjMywgMHg1MDBlMywgMHgwMDEwMiwgMHgwMDEwMiwgMHgwMDEwMlxuICBdKTtcblxuICB2YXIgZGlzdERlY29kZSA9IG5ldyBVaW50MzJBcnJheShbXG4gICAgMHgwMDAwMSwgMHgwMDAwMiwgMHgwMDAwMywgMHgwMDAwNCwgMHgxMDAwNSwgMHgxMDAwNywgMHgyMDAwOSwgMHgyMDAwZCxcbiAgICAweDMwMDExLCAweDMwMDE5LCAweDQwMDIxLCAweDQwMDMxLCAweDUwMDQxLCAweDUwMDYxLCAweDYwMDgxLCAweDYwMGMxLFxuICAgIDB4NzAxMDEsIDB4NzAxODEsIDB4ODAyMDEsIDB4ODAzMDEsIDB4OTA0MDEsIDB4OTA2MDEsIDB4YTA4MDEsIDB4YTBjMDEsXG4gICAgMHhiMTAwMSwgMHhiMTgwMSwgMHhjMjAwMSwgMHhjMzAwMSwgMHhkNDAwMSwgMHhkNjAwMVxuICBdKTtcblxuICB2YXIgZml4ZWRMaXRDb2RlVGFiID0gW25ldyBVaW50MzJBcnJheShbXG4gICAgMHg3MDEwMCwgMHg4MDA1MCwgMHg4MDAxMCwgMHg4MDExOCwgMHg3MDExMCwgMHg4MDA3MCwgMHg4MDAzMCwgMHg5MDBjMCxcbiAgICAweDcwMTA4LCAweDgwMDYwLCAweDgwMDIwLCAweDkwMGEwLCAweDgwMDAwLCAweDgwMDgwLCAweDgwMDQwLCAweDkwMGUwLFxuICAgIDB4NzAxMDQsIDB4ODAwNTgsIDB4ODAwMTgsIDB4OTAwOTAsIDB4NzAxMTQsIDB4ODAwNzgsIDB4ODAwMzgsIDB4OTAwZDAsXG4gICAgMHg3MDEwYywgMHg4MDA2OCwgMHg4MDAyOCwgMHg5MDBiMCwgMHg4MDAwOCwgMHg4MDA4OCwgMHg4MDA0OCwgMHg5MDBmMCxcbiAgICAweDcwMTAyLCAweDgwMDU0LCAweDgwMDE0LCAweDgwMTFjLCAweDcwMTEyLCAweDgwMDc0LCAweDgwMDM0LCAweDkwMGM4LFxuICAgIDB4NzAxMGEsIDB4ODAwNjQsIDB4ODAwMjQsIDB4OTAwYTgsIDB4ODAwMDQsIDB4ODAwODQsIDB4ODAwNDQsIDB4OTAwZTgsXG4gICAgMHg3MDEwNiwgMHg4MDA1YywgMHg4MDAxYywgMHg5MDA5OCwgMHg3MDExNiwgMHg4MDA3YywgMHg4MDAzYywgMHg5MDBkOCxcbiAgICAweDcwMTBlLCAweDgwMDZjLCAweDgwMDJjLCAweDkwMGI4LCAweDgwMDBjLCAweDgwMDhjLCAweDgwMDRjLCAweDkwMGY4LFxuICAgIDB4NzAxMDEsIDB4ODAwNTIsIDB4ODAwMTIsIDB4ODAxMWEsIDB4NzAxMTEsIDB4ODAwNzIsIDB4ODAwMzIsIDB4OTAwYzQsXG4gICAgMHg3MDEwOSwgMHg4MDA2MiwgMHg4MDAyMiwgMHg5MDBhNCwgMHg4MDAwMiwgMHg4MDA4MiwgMHg4MDA0MiwgMHg5MDBlNCxcbiAgICAweDcwMTA1LCAweDgwMDVhLCAweDgwMDFhLCAweDkwMDk0LCAweDcwMTE1LCAweDgwMDdhLCAweDgwMDNhLCAweDkwMGQ0LFxuICAgIDB4NzAxMGQsIDB4ODAwNmEsIDB4ODAwMmEsIDB4OTAwYjQsIDB4ODAwMGEsIDB4ODAwOGEsIDB4ODAwNGEsIDB4OTAwZjQsXG4gICAgMHg3MDEwMywgMHg4MDA1NiwgMHg4MDAxNiwgMHg4MDExZSwgMHg3MDExMywgMHg4MDA3NiwgMHg4MDAzNiwgMHg5MDBjYyxcbiAgICAweDcwMTBiLCAweDgwMDY2LCAweDgwMDI2LCAweDkwMGFjLCAweDgwMDA2LCAweDgwMDg2LCAweDgwMDQ2LCAweDkwMGVjLFxuICAgIDB4NzAxMDcsIDB4ODAwNWUsIDB4ODAwMWUsIDB4OTAwOWMsIDB4NzAxMTcsIDB4ODAwN2UsIDB4ODAwM2UsIDB4OTAwZGMsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZSwgMHg4MDAyZSwgMHg5MDBiYywgMHg4MDAwZSwgMHg4MDA4ZSwgMHg4MDA0ZSwgMHg5MDBmYyxcbiAgICAweDcwMTAwLCAweDgwMDUxLCAweDgwMDExLCAweDgwMTE5LCAweDcwMTEwLCAweDgwMDcxLCAweDgwMDMxLCAweDkwMGMyLFxuICAgIDB4NzAxMDgsIDB4ODAwNjEsIDB4ODAwMjEsIDB4OTAwYTIsIDB4ODAwMDEsIDB4ODAwODEsIDB4ODAwNDEsIDB4OTAwZTIsXG4gICAgMHg3MDEwNCwgMHg4MDA1OSwgMHg4MDAxOSwgMHg5MDA5MiwgMHg3MDExNCwgMHg4MDA3OSwgMHg4MDAzOSwgMHg5MDBkMixcbiAgICAweDcwMTBjLCAweDgwMDY5LCAweDgwMDI5LCAweDkwMGIyLCAweDgwMDA5LCAweDgwMDg5LCAweDgwMDQ5LCAweDkwMGYyLFxuICAgIDB4NzAxMDIsIDB4ODAwNTUsIDB4ODAwMTUsIDB4ODAxMWQsIDB4NzAxMTIsIDB4ODAwNzUsIDB4ODAwMzUsIDB4OTAwY2EsXG4gICAgMHg3MDEwYSwgMHg4MDA2NSwgMHg4MDAyNSwgMHg5MDBhYSwgMHg4MDAwNSwgMHg4MDA4NSwgMHg4MDA0NSwgMHg5MDBlYSxcbiAgICAweDcwMTA2LCAweDgwMDVkLCAweDgwMDFkLCAweDkwMDlhLCAweDcwMTE2LCAweDgwMDdkLCAweDgwMDNkLCAweDkwMGRhLFxuICAgIDB4NzAxMGUsIDB4ODAwNmQsIDB4ODAwMmQsIDB4OTAwYmEsIDB4ODAwMGQsIDB4ODAwOGQsIDB4ODAwNGQsIDB4OTAwZmEsXG4gICAgMHg3MDEwMSwgMHg4MDA1MywgMHg4MDAxMywgMHg4MDExYiwgMHg3MDExMSwgMHg4MDA3MywgMHg4MDAzMywgMHg5MDBjNixcbiAgICAweDcwMTA5LCAweDgwMDYzLCAweDgwMDIzLCAweDkwMGE2LCAweDgwMDAzLCAweDgwMDgzLCAweDgwMDQzLCAweDkwMGU2LFxuICAgIDB4NzAxMDUsIDB4ODAwNWIsIDB4ODAwMWIsIDB4OTAwOTYsIDB4NzAxMTUsIDB4ODAwN2IsIDB4ODAwM2IsIDB4OTAwZDYsXG4gICAgMHg3MDEwZCwgMHg4MDA2YiwgMHg4MDAyYiwgMHg5MDBiNiwgMHg4MDAwYiwgMHg4MDA4YiwgMHg4MDA0YiwgMHg5MDBmNixcbiAgICAweDcwMTAzLCAweDgwMDU3LCAweDgwMDE3LCAweDgwMTFmLCAweDcwMTEzLCAweDgwMDc3LCAweDgwMDM3LCAweDkwMGNlLFxuICAgIDB4NzAxMGIsIDB4ODAwNjcsIDB4ODAwMjcsIDB4OTAwYWUsIDB4ODAwMDcsIDB4ODAwODcsIDB4ODAwNDcsIDB4OTAwZWUsXG4gICAgMHg3MDEwNywgMHg4MDA1ZiwgMHg4MDAxZiwgMHg5MDA5ZSwgMHg3MDExNywgMHg4MDA3ZiwgMHg4MDAzZiwgMHg5MDBkZSxcbiAgICAweDcwMTBmLCAweDgwMDZmLCAweDgwMDJmLCAweDkwMGJlLCAweDgwMDBmLCAweDgwMDhmLCAweDgwMDRmLCAweDkwMGZlLFxuICAgIDB4NzAxMDAsIDB4ODAwNTAsIDB4ODAwMTAsIDB4ODAxMTgsIDB4NzAxMTAsIDB4ODAwNzAsIDB4ODAwMzAsIDB4OTAwYzEsXG4gICAgMHg3MDEwOCwgMHg4MDA2MCwgMHg4MDAyMCwgMHg5MDBhMSwgMHg4MDAwMCwgMHg4MDA4MCwgMHg4MDA0MCwgMHg5MDBlMSxcbiAgICAweDcwMTA0LCAweDgwMDU4LCAweDgwMDE4LCAweDkwMDkxLCAweDcwMTE0LCAweDgwMDc4LCAweDgwMDM4LCAweDkwMGQxLFxuICAgIDB4NzAxMGMsIDB4ODAwNjgsIDB4ODAwMjgsIDB4OTAwYjEsIDB4ODAwMDgsIDB4ODAwODgsIDB4ODAwNDgsIDB4OTAwZjEsXG4gICAgMHg3MDEwMiwgMHg4MDA1NCwgMHg4MDAxNCwgMHg4MDExYywgMHg3MDExMiwgMHg4MDA3NCwgMHg4MDAzNCwgMHg5MDBjOSxcbiAgICAweDcwMTBhLCAweDgwMDY0LCAweDgwMDI0LCAweDkwMGE5LCAweDgwMDA0LCAweDgwMDg0LCAweDgwMDQ0LCAweDkwMGU5LFxuICAgIDB4NzAxMDYsIDB4ODAwNWMsIDB4ODAwMWMsIDB4OTAwOTksIDB4NzAxMTYsIDB4ODAwN2MsIDB4ODAwM2MsIDB4OTAwZDksXG4gICAgMHg3MDEwZSwgMHg4MDA2YywgMHg4MDAyYywgMHg5MDBiOSwgMHg4MDAwYywgMHg4MDA4YywgMHg4MDA0YywgMHg5MDBmOSxcbiAgICAweDcwMTAxLCAweDgwMDUyLCAweDgwMDEyLCAweDgwMTFhLCAweDcwMTExLCAweDgwMDcyLCAweDgwMDMyLCAweDkwMGM1LFxuICAgIDB4NzAxMDksIDB4ODAwNjIsIDB4ODAwMjIsIDB4OTAwYTUsIDB4ODAwMDIsIDB4ODAwODIsIDB4ODAwNDIsIDB4OTAwZTUsXG4gICAgMHg3MDEwNSwgMHg4MDA1YSwgMHg4MDAxYSwgMHg5MDA5NSwgMHg3MDExNSwgMHg4MDA3YSwgMHg4MDAzYSwgMHg5MDBkNSxcbiAgICAweDcwMTBkLCAweDgwMDZhLCAweDgwMDJhLCAweDkwMGI1LCAweDgwMDBhLCAweDgwMDhhLCAweDgwMDRhLCAweDkwMGY1LFxuICAgIDB4NzAxMDMsIDB4ODAwNTYsIDB4ODAwMTYsIDB4ODAxMWUsIDB4NzAxMTMsIDB4ODAwNzYsIDB4ODAwMzYsIDB4OTAwY2QsXG4gICAgMHg3MDEwYiwgMHg4MDA2NiwgMHg4MDAyNiwgMHg5MDBhZCwgMHg4MDAwNiwgMHg4MDA4NiwgMHg4MDA0NiwgMHg5MDBlZCxcbiAgICAweDcwMTA3LCAweDgwMDVlLCAweDgwMDFlLCAweDkwMDlkLCAweDcwMTE3LCAweDgwMDdlLCAweDgwMDNlLCAweDkwMGRkLFxuICAgIDB4NzAxMGYsIDB4ODAwNmUsIDB4ODAwMmUsIDB4OTAwYmQsIDB4ODAwMGUsIDB4ODAwOGUsIDB4ODAwNGUsIDB4OTAwZmQsXG4gICAgMHg3MDEwMCwgMHg4MDA1MSwgMHg4MDAxMSwgMHg4MDExOSwgMHg3MDExMCwgMHg4MDA3MSwgMHg4MDAzMSwgMHg5MDBjMyxcbiAgICAweDcwMTA4LCAweDgwMDYxLCAweDgwMDIxLCAweDkwMGEzLCAweDgwMDAxLCAweDgwMDgxLCAweDgwMDQxLCAweDkwMGUzLFxuICAgIDB4NzAxMDQsIDB4ODAwNTksIDB4ODAwMTksIDB4OTAwOTMsIDB4NzAxMTQsIDB4ODAwNzksIDB4ODAwMzksIDB4OTAwZDMsXG4gICAgMHg3MDEwYywgMHg4MDA2OSwgMHg4MDAyOSwgMHg5MDBiMywgMHg4MDAwOSwgMHg4MDA4OSwgMHg4MDA0OSwgMHg5MDBmMyxcbiAgICAweDcwMTAyLCAweDgwMDU1LCAweDgwMDE1LCAweDgwMTFkLCAweDcwMTEyLCAweDgwMDc1LCAweDgwMDM1LCAweDkwMGNiLFxuICAgIDB4NzAxMGEsIDB4ODAwNjUsIDB4ODAwMjUsIDB4OTAwYWIsIDB4ODAwMDUsIDB4ODAwODUsIDB4ODAwNDUsIDB4OTAwZWIsXG4gICAgMHg3MDEwNiwgMHg4MDA1ZCwgMHg4MDAxZCwgMHg5MDA5YiwgMHg3MDExNiwgMHg4MDA3ZCwgMHg4MDAzZCwgMHg5MDBkYixcbiAgICAweDcwMTBlLCAweDgwMDZkLCAweDgwMDJkLCAweDkwMGJiLCAweDgwMDBkLCAweDgwMDhkLCAweDgwMDRkLCAweDkwMGZiLFxuICAgIDB4NzAxMDEsIDB4ODAwNTMsIDB4ODAwMTMsIDB4ODAxMWIsIDB4NzAxMTEsIDB4ODAwNzMsIDB4ODAwMzMsIDB4OTAwYzcsXG4gICAgMHg3MDEwOSwgMHg4MDA2MywgMHg4MDAyMywgMHg5MDBhNywgMHg4MDAwMywgMHg4MDA4MywgMHg4MDA0MywgMHg5MDBlNyxcbiAgICAweDcwMTA1LCAweDgwMDViLCAweDgwMDFiLCAweDkwMDk3LCAweDcwMTE1LCAweDgwMDdiLCAweDgwMDNiLCAweDkwMGQ3LFxuICAgIDB4NzAxMGQsIDB4ODAwNmIsIDB4ODAwMmIsIDB4OTAwYjcsIDB4ODAwMGIsIDB4ODAwOGIsIDB4ODAwNGIsIDB4OTAwZjcsXG4gICAgMHg3MDEwMywgMHg4MDA1NywgMHg4MDAxNywgMHg4MDExZiwgMHg3MDExMywgMHg4MDA3NywgMHg4MDAzNywgMHg5MDBjZixcbiAgICAweDcwMTBiLCAweDgwMDY3LCAweDgwMDI3LCAweDkwMGFmLCAweDgwMDA3LCAweDgwMDg3LCAweDgwMDQ3LCAweDkwMGVmLFxuICAgIDB4NzAxMDcsIDB4ODAwNWYsIDB4ODAwMWYsIDB4OTAwOWYsIDB4NzAxMTcsIDB4ODAwN2YsIDB4ODAwM2YsIDB4OTAwZGYsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZiwgMHg4MDAyZiwgMHg5MDBiZiwgMHg4MDAwZiwgMHg4MDA4ZiwgMHg4MDA0ZiwgMHg5MDBmZlxuICBdKSwgOV07XG5cbiAgdmFyIGZpeGVkRGlzdENvZGVUYWIgPSBbbmV3IFVpbnQzMkFycmF5KFtcbiAgICAweDUwMDAwLCAweDUwMDEwLCAweDUwMDA4LCAweDUwMDE4LCAweDUwMDA0LCAweDUwMDE0LCAweDUwMDBjLCAweDUwMDFjLFxuICAgIDB4NTAwMDIsIDB4NTAwMTIsIDB4NTAwMGEsIDB4NTAwMWEsIDB4NTAwMDYsIDB4NTAwMTYsIDB4NTAwMGUsIDB4MDAwMDAsXG4gICAgMHg1MDAwMSwgMHg1MDAxMSwgMHg1MDAwOSwgMHg1MDAxOSwgMHg1MDAwNSwgMHg1MDAxNSwgMHg1MDAwZCwgMHg1MDAxZCxcbiAgICAweDUwMDAzLCAweDUwMDEzLCAweDUwMDBiLCAweDUwMDFiLCAweDUwMDA3LCAweDUwMDE3LCAweDUwMDBmLCAweDAwMDAwXG4gIF0pLCA1XTtcbiAgXG4gIGZ1bmN0aW9uIGVycm9yKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlKVxuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RydWN0b3IoYnl0ZXMpIHtcbiAgICAvL3ZhciBieXRlcyA9IHN0cmVhbS5nZXRCeXRlcygpO1xuICAgIHZhciBieXRlc1BvcyA9IDA7XG5cbiAgICB2YXIgY21mID0gYnl0ZXNbYnl0ZXNQb3MrK107XG4gICAgdmFyIGZsZyA9IGJ5dGVzW2J5dGVzUG9zKytdO1xuICAgIGlmIChjbWYgPT0gLTEgfHwgZmxnID09IC0xKVxuICAgICAgZXJyb3IoJ0ludmFsaWQgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIGlmICgoY21mICYgMHgwZikgIT0gMHgwOClcbiAgICAgIGVycm9yKCdVbmtub3duIGNvbXByZXNzaW9uIG1ldGhvZCBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICBpZiAoKCgoY21mIDw8IDgpICsgZmxnKSAlIDMxKSAhPSAwKVxuICAgICAgZXJyb3IoJ0JhZCBGQ0hFQ0sgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgaWYgKGZsZyAmIDB4MjApXG4gICAgICBlcnJvcignRkRJQ1QgYml0IHNldCBpbiBmbGF0ZSBzdHJlYW0nKTtcblxuICAgIHRoaXMuYnl0ZXMgPSBieXRlcztcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG5cbiAgICB0aGlzLmNvZGVTaXplID0gMDtcbiAgICB0aGlzLmNvZGVCdWYgPSAwO1xuXG4gICAgRGVjb2RlU3RyZWFtLmNhbGwodGhpcyk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERlY29kZVN0cmVhbS5wcm90b3R5cGUpO1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRCaXRzID0gZnVuY3Rpb24oYml0cykge1xuICAgIHZhciBjb2RlU2l6ZSA9IHRoaXMuY29kZVNpemU7XG4gICAgdmFyIGNvZGVCdWYgPSB0aGlzLmNvZGVCdWY7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcztcbiAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuXG4gICAgdmFyIGI7XG4gICAgd2hpbGUgKGNvZGVTaXplIDwgYml0cykge1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBlbmNvZGluZyBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGNvZGVCdWYgfD0gYiA8PCBjb2RlU2l6ZTtcbiAgICAgIGNvZGVTaXplICs9IDg7XG4gICAgfVxuICAgIGIgPSBjb2RlQnVmICYgKCgxIDw8IGJpdHMpIC0gMSk7XG4gICAgdGhpcy5jb2RlQnVmID0gY29kZUJ1ZiA+PiBiaXRzO1xuICAgIHRoaXMuY29kZVNpemUgPSBjb2RlU2l6ZSAtPSBiaXRzO1xuICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICByZXR1cm4gYjtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0Q29kZSA9IGZ1bmN0aW9uKHRhYmxlKSB7XG4gICAgdmFyIGNvZGVzID0gdGFibGVbMF07XG4gICAgdmFyIG1heExlbiA9IHRhYmxlWzFdO1xuICAgIHZhciBjb2RlU2l6ZSA9IHRoaXMuY29kZVNpemU7XG4gICAgdmFyIGNvZGVCdWYgPSB0aGlzLmNvZGVCdWY7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcztcbiAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuXG4gICAgd2hpbGUgKGNvZGVTaXplIDwgbWF4TGVuKSB7XG4gICAgICB2YXIgYjtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjb2RlQnVmIHw9IChiIDw8IGNvZGVTaXplKTtcbiAgICAgIGNvZGVTaXplICs9IDg7XG4gICAgfVxuICAgIHZhciBjb2RlID0gY29kZXNbY29kZUJ1ZiAmICgoMSA8PCBtYXhMZW4pIC0gMSldO1xuICAgIHZhciBjb2RlTGVuID0gY29kZSA+PiAxNjtcbiAgICB2YXIgY29kZVZhbCA9IGNvZGUgJiAweGZmZmY7XG4gICAgaWYgKGNvZGVTaXplID09IDAgfHwgY29kZVNpemUgPCBjb2RlTGVuIHx8IGNvZGVMZW4gPT0gMClcbiAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgdGhpcy5jb2RlQnVmID0gKGNvZGVCdWYgPj4gY29kZUxlbik7XG4gICAgdGhpcy5jb2RlU2l6ZSA9IChjb2RlU2l6ZSAtIGNvZGVMZW4pO1xuICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICByZXR1cm4gY29kZVZhbDtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2VuZXJhdGVIdWZmbWFuVGFibGUgPSBmdW5jdGlvbihsZW5ndGhzKSB7XG4gICAgdmFyIG4gPSBsZW5ndGhzLmxlbmd0aDtcblxuICAgIC8vIGZpbmQgbWF4IGNvZGUgbGVuZ3RoXG4gICAgdmFyIG1heExlbiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChsZW5ndGhzW2ldID4gbWF4TGVuKVxuICAgICAgICBtYXhMZW4gPSBsZW5ndGhzW2ldO1xuICAgIH1cblxuICAgIC8vIGJ1aWxkIHRoZSB0YWJsZVxuICAgIHZhciBzaXplID0gMSA8PCBtYXhMZW47XG4gICAgdmFyIGNvZGVzID0gbmV3IFVpbnQzMkFycmF5KHNpemUpO1xuICAgIGZvciAodmFyIGxlbiA9IDEsIGNvZGUgPSAwLCBza2lwID0gMjtcbiAgICAgICAgIGxlbiA8PSBtYXhMZW47XG4gICAgICAgICArK2xlbiwgY29kZSA8PD0gMSwgc2tpcCA8PD0gMSkge1xuICAgICAgZm9yICh2YXIgdmFsID0gMDsgdmFsIDwgbjsgKyt2YWwpIHtcbiAgICAgICAgaWYgKGxlbmd0aHNbdmFsXSA9PSBsZW4pIHtcbiAgICAgICAgICAvLyBiaXQtcmV2ZXJzZSB0aGUgY29kZVxuICAgICAgICAgIHZhciBjb2RlMiA9IDA7XG4gICAgICAgICAgdmFyIHQgPSBjb2RlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvZGUyID0gKGNvZGUyIDw8IDEpIHwgKHQgJiAxKTtcbiAgICAgICAgICAgIHQgPj49IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZmlsbCB0aGUgdGFibGUgZW50cmllc1xuICAgICAgICAgIGZvciAodmFyIGkgPSBjb2RlMjsgaSA8IHNpemU7IGkgKz0gc2tpcClcbiAgICAgICAgICAgIGNvZGVzW2ldID0gKGxlbiA8PCAxNikgfCB2YWw7XG5cbiAgICAgICAgICArK2NvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2NvZGVzLCBtYXhMZW5dO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZWFkQmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiByZXBlYXQoc3RyZWFtLCBhcnJheSwgbGVuLCBvZmZzZXQsIHdoYXQpIHtcbiAgICAgIHZhciByZXBlYXQgPSBzdHJlYW0uZ2V0Qml0cyhsZW4pICsgb2Zmc2V0O1xuICAgICAgd2hpbGUgKHJlcGVhdC0tID4gMClcbiAgICAgICAgYXJyYXlbaSsrXSA9IHdoYXQ7XG4gICAgfVxuXG4gICAgLy8gcmVhZCBibG9jayBoZWFkZXJcbiAgICB2YXIgaGRyID0gdGhpcy5nZXRCaXRzKDMpO1xuICAgIGlmIChoZHIgJiAxKVxuICAgICAgdGhpcy5lb2YgPSB0cnVlO1xuICAgIGhkciA+Pj0gMTtcblxuICAgIGlmIChoZHIgPT0gMCkgeyAvLyB1bmNvbXByZXNzZWQgYmxvY2tcbiAgICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuICAgICAgdmFyIGI7XG5cbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgdmFyIGJsb2NrTGVuID0gYjtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgYmxvY2tMZW4gfD0gKGIgPDwgOCk7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIHZhciBjaGVjayA9IGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGNoZWNrIHw9IChiIDw8IDgpO1xuICAgICAgaWYgKGNoZWNrICE9ICh+YmxvY2tMZW4gJiAweGZmZmYpKVxuICAgICAgICBlcnJvcignQmFkIHVuY29tcHJlc3NlZCBibG9jayBsZW5ndGggaW4gZmxhdGUgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuY29kZUJ1ZiA9IDA7XG4gICAgICB0aGlzLmNvZGVTaXplID0gMDtcblxuICAgICAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuZW5zdXJlQnVmZmVyKGJ1ZmZlckxlbmd0aCArIGJsb2NrTGVuKTtcbiAgICAgIHZhciBlbmQgPSBidWZmZXJMZW5ndGggKyBibG9ja0xlbjtcbiAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gZW5kO1xuICAgICAgZm9yICh2YXIgbiA9IGJ1ZmZlckxlbmd0aDsgbiA8IGVuZDsgKytuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLmVvZiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyW25dID0gYjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbGl0Q29kZVRhYmxlO1xuICAgIHZhciBkaXN0Q29kZVRhYmxlO1xuICAgIGlmIChoZHIgPT0gMSkgeyAvLyBjb21wcmVzc2VkIGJsb2NrLCBmaXhlZCBjb2Rlc1xuICAgICAgbGl0Q29kZVRhYmxlID0gZml4ZWRMaXRDb2RlVGFiO1xuICAgICAgZGlzdENvZGVUYWJsZSA9IGZpeGVkRGlzdENvZGVUYWI7XG4gICAgfSBlbHNlIGlmIChoZHIgPT0gMikgeyAvLyBjb21wcmVzc2VkIGJsb2NrLCBkeW5hbWljIGNvZGVzXG4gICAgICB2YXIgbnVtTGl0Q29kZXMgPSB0aGlzLmdldEJpdHMoNSkgKyAyNTc7XG4gICAgICB2YXIgbnVtRGlzdENvZGVzID0gdGhpcy5nZXRCaXRzKDUpICsgMTtcbiAgICAgIHZhciBudW1Db2RlTGVuQ29kZXMgPSB0aGlzLmdldEJpdHMoNCkgKyA0O1xuXG4gICAgICAvLyBidWlsZCB0aGUgY29kZSBsZW5ndGhzIGNvZGUgdGFibGVcbiAgICAgIHZhciBjb2RlTGVuQ29kZUxlbmd0aHMgPSBBcnJheShjb2RlTGVuQ29kZU1hcC5sZW5ndGgpO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCBudW1Db2RlTGVuQ29kZXMpXG4gICAgICAgIGNvZGVMZW5Db2RlTGVuZ3Roc1tjb2RlTGVuQ29kZU1hcFtpKytdXSA9IHRoaXMuZ2V0Qml0cygzKTtcbiAgICAgIHZhciBjb2RlTGVuQ29kZVRhYiA9IHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbkNvZGVMZW5ndGhzKTtcblxuICAgICAgLy8gYnVpbGQgdGhlIGxpdGVyYWwgYW5kIGRpc3RhbmNlIGNvZGUgdGFibGVzXG4gICAgICB2YXIgbGVuID0gMDtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBjb2RlcyA9IG51bUxpdENvZGVzICsgbnVtRGlzdENvZGVzO1xuICAgICAgdmFyIGNvZGVMZW5ndGhzID0gbmV3IEFycmF5KGNvZGVzKTtcbiAgICAgIHdoaWxlIChpIDwgY29kZXMpIHtcbiAgICAgICAgdmFyIGNvZGUgPSB0aGlzLmdldENvZGUoY29kZUxlbkNvZGVUYWIpO1xuICAgICAgICBpZiAoY29kZSA9PSAxNikge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgMiwgMywgbGVuKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IDE3KSB7XG4gICAgICAgICAgcmVwZWF0KHRoaXMsIGNvZGVMZW5ndGhzLCAzLCAzLCBsZW4gPSAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IDE4KSB7XG4gICAgICAgICAgcmVwZWF0KHRoaXMsIGNvZGVMZW5ndGhzLCA3LCAxMSwgbGVuID0gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29kZUxlbmd0aHNbaSsrXSA9IGxlbiA9IGNvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGl0Q29kZVRhYmxlID1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUh1ZmZtYW5UYWJsZShjb2RlTGVuZ3Rocy5zbGljZSgwLCBudW1MaXRDb2RlcykpO1xuICAgICAgZGlzdENvZGVUYWJsZSA9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbmd0aHMuc2xpY2UobnVtTGl0Q29kZXMsIGNvZGVzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yKCdVbmtub3duIGJsb2NrIHR5cGUgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgfVxuXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBsaW1pdCA9IGJ1ZmZlciA/IGJ1ZmZlci5sZW5ndGggOiAwO1xuICAgIHZhciBwb3MgPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGNvZGUxID0gdGhpcy5nZXRDb2RlKGxpdENvZGVUYWJsZSk7XG4gICAgICBpZiAoY29kZTEgPCAyNTYpIHtcbiAgICAgICAgaWYgKHBvcyArIDEgPj0gbGltaXQpIHtcbiAgICAgICAgICBidWZmZXIgPSB0aGlzLmVuc3VyZUJ1ZmZlcihwb3MgKyAxKTtcbiAgICAgICAgICBsaW1pdCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyW3BvcysrXSA9IGNvZGUxO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlMSA9PSAyNTYpIHtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSBwb3M7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvZGUxIC09IDI1NztcbiAgICAgIGNvZGUxID0gbGVuZ3RoRGVjb2RlW2NvZGUxXTtcbiAgICAgIHZhciBjb2RlMiA9IGNvZGUxID4+IDE2O1xuICAgICAgaWYgKGNvZGUyID4gMClcbiAgICAgICAgY29kZTIgPSB0aGlzLmdldEJpdHMoY29kZTIpO1xuICAgICAgdmFyIGxlbiA9IChjb2RlMSAmIDB4ZmZmZikgKyBjb2RlMjtcbiAgICAgIGNvZGUxID0gdGhpcy5nZXRDb2RlKGRpc3RDb2RlVGFibGUpO1xuICAgICAgY29kZTEgPSBkaXN0RGVjb2RlW2NvZGUxXTtcbiAgICAgIGNvZGUyID0gY29kZTEgPj4gMTY7XG4gICAgICBpZiAoY29kZTIgPiAwKVxuICAgICAgICBjb2RlMiA9IHRoaXMuZ2V0Qml0cyhjb2RlMik7XG4gICAgICB2YXIgZGlzdCA9IChjb2RlMSAmIDB4ZmZmZikgKyBjb2RlMjtcbiAgICAgIGlmIChwb3MgKyBsZW4gPj0gbGltaXQpIHtcbiAgICAgICAgYnVmZmVyID0gdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgbGVuKTtcbiAgICAgICAgbGltaXQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47ICsraywgKytwb3MpXG4gICAgICAgIGJ1ZmZlcltwb3NdID0gYnVmZmVyW3BvcyAtIGRpc3RdO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gY29uc3RydWN0b3I7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXRlU3RyZWFtOyIsIi8qXG5cdFRoaXMgaXMgcm90LmpzLCB0aGUgUk9ndWVsaWtlIFRvb2xraXQgaW4gSmF2YVNjcmlwdC5cblx0VmVyc2lvbiAwLjZ+ZGV2LCBnZW5lcmF0ZWQgb24gVHVlIE1hciAxNyAxNjoxNjozMSBDRVQgMjAxNS5cbiovXG4vKipcbiAqIEBuYW1lc3BhY2UgVG9wLWxldmVsIFJPVCBuYW1lc3BhY2VcbiAqL1xudmFyIFJPVCA9IHtcblx0LyoqIERpcmVjdGlvbmFsIGNvbnN0YW50cy4gT3JkZXJpbmcgaXMgaW1wb3J0YW50ISAqL1xuXHRESVJTOiB7XG5cdFx0XCI0XCI6IFtcblx0XHRcdFsgMCwgLTFdLFxuXHRcdFx0WyAxLCAgMF0sXG5cdFx0XHRbIDAsICAxXSxcblx0XHRcdFstMSwgIDBdXG5cdFx0XSxcblx0XHRcIjhcIjogW1xuXHRcdFx0WyAwLCAtMV0sXG5cdFx0XHRbIDEsIC0xXSxcblx0XHRcdFsgMSwgIDBdLFxuXHRcdFx0WyAxLCAgMV0sXG5cdFx0XHRbIDAsICAxXSxcblx0XHRcdFstMSwgIDFdLFxuXHRcdFx0Wy0xLCAgMF0sXG5cdFx0XHRbLTEsIC0xXVxuXHRcdF0sXG5cdFx0XCI2XCI6IFtcblx0XHRcdFstMSwgLTFdLFxuXHRcdFx0WyAxLCAtMV0sXG5cdFx0XHRbIDIsICAwXSxcblx0XHRcdFsgMSwgIDFdLFxuXHRcdFx0Wy0xLCAgMV0sXG5cdFx0XHRbLTIsICAwXVxuXHRcdF1cblx0fVxufTtcbi8qKlxuICogQWx3YXlzIHBvc2l0aXZlIG1vZHVsdXNcbiAqIEBwYXJhbSB7aW50fSBuIE1vZHVsdXNcbiAqIEByZXR1cm5zIHtpbnR9IHRoaXMgbW9kdWxvIG5cbiAqL1xuTnVtYmVyLnByb3RvdHlwZS5tb2QgPSBmdW5jdGlvbihuKSB7XG5cdHJldHVybiAoKHRoaXMlbikrbiklbjtcbn1cbmlmICghT2JqZWN0LmNyZWF0ZSkgeyAgXG5cdC8qKlxuXHQgKiBFUzUgT2JqZWN0LmNyZWF0ZVxuXHQgKi9cblx0T2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKG8pIHsgIFxuXHRcdHZhciB0bXAgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRtcC5wcm90b3R5cGUgPSBvO1xuXHRcdHJldHVybiBuZXcgdG1wKCk7XG5cdH07ICBcbn0gIFxuLyoqXG4gKiBTZXRzIHByb3RvdHlwZSBvZiB0aGlzIGZ1bmN0aW9uIHRvIGFuIGluc3RhbmNlIG9mIHBhcmVudCBmdW5jdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGFyZW50XG4gKi9cbkZ1bmN0aW9uLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihwYXJlbnQpIHtcblx0dGhpcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuXHR0aGlzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXM7XG5cdHJldHVybiB0aGlzO1xufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIikge1xuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IGZ1bmN0aW9uKGNiKSB7IHJldHVybiBzZXRUaW1lb3V0KGNiLCAxMDAwLzYwKTsgfTtcblxuXHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxuXHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IGZ1bmN0aW9uKGlkKSB7IHJldHVybiBjbGVhclRpbWVvdXQoaWQpOyB9O1xufVxuLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgRk9WIGFsZ29yaXRobVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRQYXNzZXNDYWxsYmFjayBEb2VzIHRoZSBsaWdodCBwYXNzIHRocm91Z2ggeCx5P1xuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdIDQvNi84XG4gKi9cblJPVC5GT1YgPSBmdW5jdGlvbihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XG5cdHRoaXMuX2xpZ2h0UGFzc2VzID0gbGlnaHRQYXNzZXNDYWxsYmFjaztcblx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHR0b3BvbG9neTogOFxuXHR9XG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxufTtcblxuLyoqXG4gKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMzYwLWRlZ3JlZSBjaXJjbGVcbiAqIEBwYXJhbSB7aW50fSB4XG4gKiBAcGFyYW0ge2ludH0geVxuICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuUk9ULkZPVi5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKHgsIHksIFIsIGNhbGxiYWNrKSB7fVxuXG4vKipcbiAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXG4gKiBAcGFyYW0ge2ludH0gY3ggY2VudGVyLXhcbiAqIEBwYXJhbSB7aW50fSBjeSBjZW50ZXIteVxuICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcbiAqL1xuUk9ULkZPVi5wcm90b3R5cGUuX2dldENpcmNsZSA9IGZ1bmN0aW9uKGN4LCBjeSwgcikge1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdHZhciBkaXJzLCBjb3VudEZhY3Rvciwgc3RhcnRPZmZzZXQ7XG5cblx0c3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0Y291bnRGYWN0b3IgPSAxO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbMCwgMV07XG5cdFx0XHRkaXJzID0gW1xuXHRcdFx0XHRST1QuRElSU1s4XVs3XSxcblx0XHRcdFx0Uk9ULkRJUlNbOF1bMV0sXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzNdLFxuXHRcdFx0XHRST1QuRElSU1s4XVs1XVxuXHRcdFx0XVxuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSA2OlxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzZdO1xuXHRcdFx0Y291bnRGYWN0b3IgPSAxO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSA4OlxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzRdO1xuXHRcdFx0Y291bnRGYWN0b3IgPSAyO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuXHRcdGJyZWFrO1xuXHR9XG5cblx0Lyogc3RhcnRpbmcgbmVpZ2hib3IgKi9cblx0dmFyIHggPSBjeCArIHN0YXJ0T2Zmc2V0WzBdKnI7XG5cdHZhciB5ID0gY3kgKyBzdGFydE9mZnNldFsxXSpyO1xuXG5cdC8qIGNpcmNsZSAqL1xuXHRmb3IgKHZhciBpPTA7aTxkaXJzLmxlbmd0aDtpKyspIHtcblx0XHRmb3IgKHZhciBqPTA7ajxyKmNvdW50RmFjdG9yO2orKykge1xuXHRcdFx0cmVzdWx0LnB1c2goW3gsIHldKTtcblx0XHRcdHggKz0gZGlyc1tpXVswXTtcblx0XHRcdHkgKz0gZGlyc1tpXVsxXTtcblxuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEBjbGFzcyBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nID0gZnVuY3Rpb24obGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xuXHRST1QuRk9WLmNhbGwodGhpcywgbGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucyk7XG59XG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLmV4dGVuZChST1QuRk9WKTtcblxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKHgsIHksIFIsIGNhbGxiYWNrKSB7XG5cdC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cblx0Y2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgXG5cdGNhbGxiYWNrKHgtMSwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeCwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeCsxLCB5LTEsIDAsIDEpO1xuXHRjYWxsYmFjayh4LTEsIHksIDAsIDEpO1xuXHRjYWxsYmFjayh4KzEsIHksIDAsIDEpO1xuXHRjYWxsYmFjayh4LTEsIHkrMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgsIHkrMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgrMSwgeSsxLCAwLCAxKTtcbiAgICBcbiAgICBjYWxsYmFjayh4LTEsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCwgeS0yLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzEsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0yLCB5LTEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0yLCB5KzEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMiwgeS0xLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHksIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMiwgeSsxLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTEsIHkrMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCwgeSsyLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzEsIHkrMiwgMCwgMSk7XG5cblx0Lyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cblx0aWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkgeyByZXR1cm47IH1cblx0XG5cdC8qIGxpc3Qgb2YgYWxsIHNoYWRvd3MgKi9cblx0dmFyIFNIQURPV1MgPSBbXTtcblx0dmFyIHRyZWVzID0ge307XG5cdHZhciBjeCwgY3ksIGJsb2NrcywgQTEsIEEyLCB2aXNpYmlsaXR5LFxuICAgICAgICBkeCwgZHksIGRkLCBhLCBiLCByYWRpdXMsXG4gICAgICAgIGN4MiwgY3kyLCBkZDEsXG4gICAgICAgIG9ic3RhY2xlVHlwZTtcblxuXHQvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuXHRmb3IgKHZhciByPTE7IHI8PVI7IHIrKykge1xuICAgICAgICAvLy8vY29uc29sZS5sb2coJ3JpbmcnLCByKTtcblx0XHR2YXIgbmVpZ2hib3JzID0gdGhpcy5fZ2V0Q2lyY2xlKHgsIHksIHIpO1xuXHRcdHZhciBuZWlnaGJvckNvdW50ID0gbmVpZ2hib3JzLmxlbmd0aDtcbiAgICAgICAgdHJlZXMgPSB7fTtcblx0XHRmb3IgKHZhciBpPTA7aTxuZWlnaGJvckNvdW50O2krKykge1xuXHRcdFx0Y3ggPSBuZWlnaGJvcnNbaV1bMF07XG5cdFx0XHRjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBjeCtcIixcIitjeTtcbiAgICAgICAgICAgIC8vaWYgKGtleSA9PSBcIjQ0LDEwMlwiKSAvL2NvbnNvbGUubG9nKCdLRVknLCBrZXksICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpKTtcbiAgICAgICAgICAgIC8vIGlmIChrZXkgPT0gXCIxNTAsMTYwXCIpIC8vY29uc29sZS5sb2coa2V5LCBvYnN0YWNsZVR5cGUpO1xuICAgICAgICAgICAgLy8gaWYgKGtleSA9PSBcIjE1MSwxNjFcIikgLy9jb25zb2xlLmxvZyhrZXksIG9ic3RhY2xlVHlwZSk7XG4gICAgICAgICAgICAvLyBpZiAoa2V5ID09IFwiMTUwLDE2MVwiKSAvL2NvbnNvbGUubG9nKGtleSwgb2JzdGFjbGVUeXBlKTtcbiAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGVzID0gb2JzdGFjbGVUeXBlcyA9IHRoaXMud2FsbHNba2V5XTtcbiAgICAgICAgICAgIGlmIChvYnN0YWNsZVR5cGVzICYmIG9ic3RhY2xlVHlwZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNraXBWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYnN0YWNsZVR5cGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYnN0YWNsZVR5cGUgPSBvYnN0YWNsZVR5cGVzW2pdO1xuICAgICAgICAgICAgICAgICAgICBjeDIgPSBvYnN0YWNsZVR5cGVbMV07XG4gICAgICAgICAgICAgICAgICAgIGN5MiA9IG9ic3RhY2xlVHlwZVsyXTtcbiAgICAgICAgICAgICAgICAgICAgcmFkaXVzID0gb2JzdGFjbGVUeXBlWzNdO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSBjeDIgLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZHgxID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQxID0gTWF0aC5zcXJ0KGR4MSAqIGR4MSArIGR5MSAqIGR5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGQxIDwgZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgZHkgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgZmFsc2UsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aXNpYmlsaXR5KSBza2lwVmlzaWJpbGl0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgJiYgIXNraXBWaXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN4MiA9IGN4O1xuICAgICAgICAgICAgICAgIGN5MiA9IGN5O1xuICAgICAgICAgICAgICAgIHJhZGl1cyA9IE1hdGguU1FSVDIgLyAyO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgIGlmIChkZCA+IDEvMikge1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLypkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgaWYgKG9ic3RhY2xlVHlwZSAmJiBvYnN0YWNsZVR5cGVbMF0gPT0gJ3RyZWUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGR4MSA9IGN4IC0geDtcbiAgICAgICAgICAgICAgICAgICAgZHkxID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICBkZDEgPSBNYXRoLnNxcnQoZHgxICogZHgxICsgZHkxICogZHkxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRkMSA8IGRkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmVlc1tvYnN0YWNsZVR5cGVbMV0rXCIsXCIrb2JzdGFjbGVUeXBlWzJdXSA9IFtvYnN0YWNsZVR5cGVbMV0sIG9ic3RhY2xlVHlwZVsyXV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGR4ID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeSA9IGN5IC0geTtcbiAgICAgICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCBmYWxzZSwgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vaWYgKG9ic3RhY2xlVHlwZSkgLy9jb25zb2xlLmxvZyhvYnN0YWNsZVR5cGVbMF0sIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ0JMT0NLUycsIGN4LCBjeSwgYmxvY2tzLCBiKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5KSB7IGNhbGxiYWNrKGN4LCBjeSwgciwgdmlzaWJpbGl0eSk7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZG9uZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0qL1xuXG5cdFx0fSAvKiBmb3IgYWxsIGNlbGxzIGluIHRoaXMgcmluZyAqL1xuICAgICAgICBcbiAgICAgICAgLy8gYXBwbHkgdHJlZSBibG9ja2Vyc1xuICAgICAgICBmb3IgKHZhciBrIGluIHRyZWVzKSB7XG4gICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ2FwcGx5IHRyZWUnKTtcbiAgICAgICAgICAgIGN4MiA9IHRyZWVzW2tdWzBdO1xuICAgICAgICAgICAgY3kyID0gdHJlZXNba11bMV07XG4gICAgICAgICAgICBkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICBkeSA9IGN5MiAtIHk7XG4gICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICByYWRpdXMgPSBNYXRoLlNRUlQyIC0gLjAxO1xuICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgYSA9IE1hdGguYXNpbihyYWRpdXMgLyBkZCk7XG4gICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgQTIgPSBub3JtYWxpemUoYiArIGEpO1xuICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCB0cnVlLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fSAvKiBmb3IgYWxsIHJpbmdzICovXG59XG5cbi8qKlxuICogQHBhcmFtIHtpbnRbMl19IEExIGFyYyBzdGFydFxuICogQHBhcmFtIHtpbnRbMl19IEEyIGFyYyBlbmRcbiAqIEBwYXJhbSB7Ym9vbH0gYmxvY2tzIERvZXMgY3VycmVudCBhcmMgYmxvY2sgdmlzaWJpbGl0eT9cbiAqIEBwYXJhbSB7aW50W11bXX0gU0hBRE9XUyBsaXN0IG9mIGFjdGl2ZSBzaGFkb3dzXG4gKi9cblJPVC5GT1YuUHJlY2lzZVNoYWRvd2Nhc3RpbmcucHJvdG90eXBlLl9jaGVja1Zpc2liaWxpdHkgPSBmdW5jdGlvbihiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUykge1xuICAgIC8vLy9jb25zb2xlLmxvZygnX2NoZWNrVmlzaWJpbGl0eScsIGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAvLyBjaGVjayBpZiB0YXJnZXQgY2VudGVyIGlzIGluc2lkZSBhIHNoYWRvd1xuICAgIHZhciB2aXNpYmxlID0gIWJsb2NrcztcbiAgICAvL2NvbnNvbGUubG9nKCdfY2hlY2tWaXNpYmlsaXR5JywgYiwgdmlzaWJsZSk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgU0hBRE9XUy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBvbGQgPSBTSEFET1dTW2ldO1xuICAgICAgICBpZiAoaXNCZXR3ZWVuKGIsIG9sZFswXSwgb2xkWzFdKSkge1xuICAgICAgICAgICAgaWYgKGJsb2Nrcykge1xuICAgICAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygnYmxvY2tzIGJ1dCBub3QgdmlzaWJsZScsIFNIQURPV1MubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB2aXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGksIGIsIEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG5vdCB2aXNpYmxlLCByZXR1cm5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9XG4gICAgXG4gICAgaWYgKGJsb2Nrcykge1xuICAgICAgICBpZiAoQTEgPCAwICYmIEEyID49IDApIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NwbGl0dGluZycpO1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTaGFkb3dzKGIsIDAsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZVNoYWRvd3MoYiwgQTEsIDAsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdub3Qgc3BsaXR0aW5nJywgYmxvY2tzLCB2aXNpYmxlLCBiKTtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlU2hhZG93cyhiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZygnZW5kJywgQTEsIEEyLCBKU09OLnN0cmluZ2lmeShTSEFET1dTKSwgIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSksICFpc0JldHdlZW4oQTIsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pKTtcbiAgICAgICAgaWYgKFNIQURPV1MubGVuZ3RoID09IDEgJiYgKCFpc0JldHdlZW4oQTEsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pIHx8ICFpc0JldHdlZW4oQTIsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pKSAmJiBBMSAhPSBTSEFET1dTWzBdWzBdICYmIEEyICE9IFNIQURPV1NbMF1bMV0gKSB7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHJldHVybiB2aXNpYmxlO1xufVxuXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5fbWVyZ2VTaGFkb3dzID0gZnVuY3Rpb24oYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpIHtcbiAgICAvLy8vY29uc29sZS5sb2coJ21lcmdpbmcnLCBiLCBBMSwgQTIpO1xuICAgIC8vIGNoZWNrIGlmIHRhcmdldCBmaXJzdCBlZGdlIGlzIGluc2lkZSBhIHNoYWRvdyBvciB3aGljaCBzaGFkb3dzIGl0IGlzIGJldHdlZW5cbiAgICB2YXIgaW5kZXgxID0gMCxcbiAgICAgICAgZWRnZTEgPSBmYWxzZSxcbiAgICAgICAgZmlyc3RJbmRleCA9IDA7XG4gICAgd2hpbGUgKGluZGV4MSA8IFNIQURPV1MubGVuZ3RoKSB7XG4gICAgICAgIHZhciBvbGQgPSBTSEFET1dTW2luZGV4MV07XG4gICAgICAgIGZpcnN0SW5kZXggPSBpbmRleDE7XG4gICAgICAgIGlmIChpc0JldHdlZW4oQTEsIG9sZFswXSwgb2xkWzFdKSkge1xuICAgICAgICAgICAgZWRnZTEgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4MSA+IDAgJiYgaXNCZXR3ZWVuKEExLCBTSEFET1dTW2luZGV4MSAtIDFdWzFdLCBvbGRbMF0pKSB7XG4gICAgICAgICAgICBlZGdlMSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0JlZm9yZShBMSwgb2xkWzFdKSkge1xuICAgICAgICAgICAgaW5kZXgxKys7XG4gICAgICAgICAgICBmaXJzdEluZGV4ID0gaW5kZXgxO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmVmb3JlKEExLCBvbGRbMF0pKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleDErKztcbiAgICB9XG4gICAgXG4gICAgLy8gY2hlY2sgaWYgdGFyZ2V0IHNlY29uZCBlZGdlIGlzIGluc2lkZSBhIHNoYWRvdyBvciB3aGljaCBzaGFkb3dzIGl0IGlzIGJldHdlZW5cbiAgICB2YXIgaW5kZXgyID0gU0hBRE9XUy5sZW5ndGggLSAxLFxuICAgICAgICBlZGdlMiA9IGZhbHNlLFxuICAgICAgICBzZWNvbmRJbmRleCA9IDA7XG4gICAgd2hpbGUgKGluZGV4MiA+PSAwKSB7XG4gICAgICAgIHZhciBvbGQgPSBTSEFET1dTW2luZGV4Ml07XG4gICAgICAgIHNlY29uZEluZGV4ID0gaW5kZXgyO1xuICAgICAgICAvLy8vY29uc29sZS5sb2coQTIsIG9sZFswXSwgb2xkWzFdLCBpc0JldHdlZW4oQTIsIG9sZFswXSwgb2xkWzFdKSlcbiAgICAgICAgaWYgKGlzQmV0d2VlbihBMiwgb2xkWzBdLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBlZGdlMiA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNCZWZvcmUoQTIsIG9sZFswXSkpIHtcbiAgICAgICAgICAgIGluZGV4Mi0tO1xuICAgICAgICAgICAgc2Vjb25kSW5kZXggPSBpbmRleDI7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzQmVmb3JlKEEyLCBvbGRbMV0pKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleDItLTtcbiAgICB9XG4gICAgXG4gICAgLy8vL2NvbnNvbGUubG9nKGZpcnN0SW5kZXgsIHNlY29uZEluZGV4LCBlZGdlMSwgZWRnZTIsIEExLCBBMik7XG4gICAgaWYgKGZpcnN0SW5kZXggPT0gU0hBRE9XUy5sZW5ndGggJiYgIWVkZ2UxICYmIHNlY29uZEluZGV4ID09IDAgJiYgZWRnZTIpIGZpcnN0SW5kZXggPSAwO1xuICAgIC8vaWYgKHNlY29uZEluZGV4ID09IC0xKSBzZWNvbmRJbmRleCA9IFNIQURPV1MubGVuZ3RoIC0gMTtcbiAgICAvL2NvbnNvbGUubG9nKGZpcnN0SW5kZXgsIHNlY29uZEluZGV4LCBlZGdlMSwgZWRnZTIsIEExLCBBMik7XG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgaWYgKFNIQURPV1MubGVuZ3RoID09IDApIHtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnZW1wdHkgc2hhZG93cyBwdXNoaW5nJywgW0ExLCBBMl0pO1xuICAgICAgICBTSEFET1dTLnB1c2goW0ExLCBBMl0pO1xuICAgIH1cbiAgICAvKmVsc2UgaWYgKFNIQURPV1MubGVuZ3RoID4gMSAmJiBmaXJzdEluZGV4ID09IFNIQURPV1MubGVuZ3RoICYmIHNlY29uZEluZGV4ID09IDAgJiYgIWVkZ2UxICYmIGVkZ2UyKSB7XG4gICAgXG4gICAgfSovXG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBuZXdfc2hhZG93ID0gW2VkZ2UxID8gU0hBRE9XU1tmaXJzdEluZGV4XVswXSA6IEExLCBlZGdlMiA/IFNIQURPV1Nbc2Vjb25kSW5kZXhdWzFdIDogQTJdO1xuICAgICAgICAvL2NvbnNvbGUubG9nKCduZXdfc2hhZG93JywgbmV3X3NoYWRvdyk7XG4gICAgICAgIHNlY29uZEluZGV4ID0gTWF0aC5tYXgoZmlyc3RJbmRleCwgc2Vjb25kSW5kZXgpO1xuICAgICAgICB2YXIgc3VtMSA9IGRpZmZfc3VtKFNIQURPV1MpO1xuICAgICAgICB2YXIgZG9TaGlmdCA9IGZhbHNlO1xuICAgICAgICBpZiAoaXNCZXR3ZWVuKDAsIG5ld19zaGFkb3dbMF0sIG5ld19zaGFkb3dbMV0pICYmIG5ld19zaGFkb3dbMF0gIT0gMCAmJiBuZXdfc2hhZG93WzFdICE9IDApIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2Nyb3NzZXMgMCcpO1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoZmlyc3RJbmRleCwgZmlyc3RJbmRleCA9PSBzZWNvbmRJbmRleCAmJiBlZGdlMSA9PSBlZGdlMiAmJiAhZWRnZTEgPyAwIDogc2Vjb25kSW5kZXggLSBmaXJzdEluZGV4ICsgMSwgW25ld19zaGFkb3dbMF0sIDBdKTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coW25ld19zaGFkb3dbMF0sIDBdLCBKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgICAgICBpZiAoU0hBRE9XU1swXVswXSAhPSAwICYmIFNIQURPV1NbMF1bMV0gIT0gbmV3X3NoYWRvd1sxXSkge1xuICAgICAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGZpcnN0SW5kZXggKyAxLCAwLCBbMCwgbmV3X3NoYWRvd1sxXV0pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coWzAsIG5ld19zaGFkb3dbMV1dLCBKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KFNIQURPV1MpKTtcbiAgICAgICAgICAgIGRvU2hpZnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgU0hBRE9XUy5zcGxpY2UoZmlyc3RJbmRleCwgZmlyc3RJbmRleCA9PSBzZWNvbmRJbmRleCAmJiBlZGdlMSA9PSBlZGdlMiAmJiAhZWRnZTEgPyAwIDogc2Vjb25kSW5kZXggLSBmaXJzdEluZGV4ICsgMSwgbmV3X3NoYWRvdyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1bTIgPSBkaWZmX3N1bShTSEFET1dTKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnc3VtMScsIHN1bTEsICdzdW0yJywgc3VtMiwgc3VtMiA8IHN1bTEsIFNIQURPV1MubGVuZ3RoID09IDEgJiYgKCFpc0JldHdlZW4oQTEsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pIHx8ICFpc0JldHdlZW4oQTIsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pKSk7XG4gICAgICAgIGlmIChzdW0yIDwgc3VtMSkgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgLyppZiAoU0hBRE9XUy5sZW5ndGggPT0gMSAmJiAoIWlzQmV0d2VlbihBMSwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkgfHwgIWlzQmV0d2VlbihBMiwgU0hBRE9XU1swXVswXSwgU0hBRE9XU1swXVsxXSkpKSB7XG4gICAgICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICB9Ki9cbiAgICAgICAgaWYgKG5ld19zaGFkb3dbMF0gPT0gMCB8fCBkb1NoaWZ0KSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2hpZnRpbmcnKTtcbiAgICAgICAgICAgIHdoaWxlIChTSEFET1dTWzBdWzBdICE9IDApIHtcbiAgICAgICAgICAgICAgICBTSEFET1dTLnB1c2goU0hBRE9XUy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPj0gU0hBRE9XUy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQgc2hpZnRpbmcnLCBKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgIC8vY29uc29sZS5sb2coZGlmZl9zdW0oU0hBRE9XUykpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNCZWZvcmUoQTEsIEEyKSB7XG4gICAgaWYgKEExID4gMCAmJiBBMiA8IDApIHsgLy8gQTEgaW4gYm90dG9tIGhhbGYsIEEyIGluIHRvcCBoYWxmXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChBMiA+IDAgJiYgQTEgPCAwKSB7IC8vIEExIGluIHRvcCBoYWxmLCBBMiBpbiBib3R0b20gaGFsZlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gQTEgPCBBMjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQWZ0ZXIoQTEsIEEyKSB7XG4gICAgcmV0dXJuICFpc0JlZm9yZShBMSwgQTIpO1xufVxuXG5mdW5jdGlvbiBpc0JldHdlZW4oYiwgQTEsIEEyKSB7XG4gICAgaWYgKEExIDwgQTIpIHtcbiAgICAgICAgcmV0dXJuICgoQTEgPD0gYikgJiYgKGIgPD0gQTIpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoKEExIDw9IGIpICYmIChiIDw9IE1hdGguUEkpKSB8fCAoKC1NYXRoLlBJIDw9IGIpICYmIChiIDw9IEEyKSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemUoeCkge1xuICAgIGlmICh4ID4gTWF0aC5QSSkge1xuICAgICAgICByZXR1cm4gLSgyICogTWF0aC5QSSAtIHgpO1xuICAgIH1cbiAgICBlbHNlIGlmICggeCA8IC1NYXRoLlBJKSB7XG4gICAgICAgIHJldHVybiAyICogTWF0aC5QSSArIHg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpZmYoQTEsIEEyKSB7XG4gICAgaWYgKEExID4gMCAmJiBBMiA8IDApIHsgLy8gQTEgaW4gYm90dG9tIGhhbGYsIEEyIGluIHRvcCBoYWxmXG4gICAgICAgIHJldHVybiBNYXRoLmFicygoTWF0aC5QSSAtIEExKSAtICgtTWF0aC5QSSAtIEEyKSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKEEyID4gMCAmJiBBMSA8IDApIHsgLy8gQTEgaW4gdG9wIGhhbGYsIEEyIGluIGJvdHRvbSBoYWxmXG4gICAgICAgIHJldHVybiBNYXRoLmFicygtQTEgKyBBMik7XG4gICAgfVxuICAgIGlmIChBMSA8PSAwICYmIEEyIDw9IDApIHsgLy8gQTEsQTIgaW4gYm90dG9tIGhhbGZcbiAgICAgICAgaWYgKGlzQWZ0ZXIoQTEsIEEyKSkgeyAvLyBBMSBhZnRlciBBMlxuICAgICAgICAgICAgcmV0dXJuIC1BMSArIE1hdGguUEkgLSAoLU1hdGguUEkgLSBBMilcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyhBMiAtIEExKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWZ0ZXIoQTEsIEEyKSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguUEkgKyAoTWF0aC5QSSAtIEExKSArIEEyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoQTIgLSBBMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRpZmZfc3VtKFNIQURPV1MpIHtcbiAgICB2YXIgc3VtID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFNIQURPV1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKFNIQURPV1NbaV1bMF0sIFNIQURPV1NbaV1bMV0sIGRpZmYoU0hBRE9XU1tpXVswXSwgU0hBRE9XU1tpXVsxXSkpO1xuICAgICAgICBzdW0gKz0gZGlmZihTSEFET1dTW2ldWzBdLCBTSEFET1dTW2ldWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBST1Q7IiwidmFyIEltYWdlSGFuZGxlciA9IHJlcXVpcmUoXCIuL2ltYWdlSGFuZGxlci5qc1wiKTtcbnZhciBST1QgPSByZXF1aXJlKFwiLi9yb3Q2LmpzXCIpO1xuXG52YXIga2V5MnB0X2NhY2hlID0ge307XG5mdW5jdGlvbiBrZXkycHQoa2V5KSB7XG4gICAgaWYgKGtleSBpbiBrZXkycHRfY2FjaGUpIHJldHVybiBrZXkycHRfY2FjaGVba2V5XTtcbiAgICB2YXIgcCA9IGtleS5zcGxpdCgnLCcpLm1hcChmdW5jdGlvbiAoYykgeyByZXR1cm4gcGFyc2VJbnQoYykgfSk7XG4gICAgdmFyIHB0ID0ge3g6IHBbMF0sIHk6IHBbMV0sIGtleToga2V5fTtcbiAgICBrZXkycHRfY2FjaGVba2V5XSA9IHB0O1xuICAgIHJldHVybiBwdDtcbn1cblxuZnVuY3Rpb24geHkya2V5KHgsIHkpIHtcbiAgICByZXR1cm4geCArIFwiLFwiICsgeTtcbn1cblxuZnVuY3Rpb24geHkycHQoeCwgeSkge1xuICAgIHJldHVybiB7eDogeCwgeTogeSwga2V5OiB4ICsgXCIsXCIgKyB5fTtcbn1cblxuZnVuY3Rpb24gcHQya2V5KHB0KSB7XG4gICAgcmV0dXJuIHB0LnggKyBcIixcIiArIHB0Lnk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlRWxldmF0aW9uV2FsbHMoZGF0YSwgZWxldmF0aW9uKSB7XG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgd2FsbHMgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICB2YXIgcHQgPSBkYXRhW2tleV07XG4gICAgICAgIGlmIChwdC56ID4gZWxldmF0aW9uKSB7XG4gICAgICAgICAgICBhZGpMb29wOlxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IC0xOyBpIDw9IDE7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAtMTsgaiA8PSAxOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgIT09IGkgfHwgMCAhPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGsgPSAocHQueCArIGkpICsgXCIsXCIgKyAocHQueSArIGopO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFba10gJiYgZGF0YVtrXS56IDw9IGVsZXZhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGxzW3B0LmtleV0gPSBwdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBhZGpMb29wO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdnZW5lcmF0ZUVsZXZhdGlvbldhbGxzJywgRGF0ZS5ub3coKSAtIHQxICsgJ21zJyk7XG4gICAgcmV0dXJuIHdhbGxzO1xufVxuXG5mdW5jdGlvbiBzZXRFbGV2YXRpb25XYWxscyhvYmosIGRhdGEsIGVsZXZhdGlvbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YVtlbGV2YXRpb25dLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlbCA9IGRhdGFbZWxldmF0aW9uXVtpXTtcbiAgICAgICAgb2JqW2VsWzFdICsgXCIsXCIgKyBlbFsyXV0gPSBlbDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFdhbGxzKG9iaiwgZGF0YSwgaWQsIHIpIHtcbiAgICBpZCA9IGlkIHx8ICd3YWxsJztcbiAgICByID0gciB8fCAoTWF0aC5TUVJUMiAvIDIpO1xuICAgIGZvciAodmFyIGkgaW4gZGF0YSkge1xuICAgICAgICBvYmpbaV0gPSBbaWQsIGRhdGFbaV0ueCwgZGF0YVtpXS55LCByXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFRyZWVXYWxscyhvYmosIGVsZXZhdGlvbiwgdHJlZSwgdHJlZV9lbGV2YXRpb25zLCB0cmVlX3N0YXRlLCB0cmVlX2Jsb2Nrcykge1xuICAgIGZvciAodmFyIGkgaW4gdHJlZSkge1xuICAgICAgICBpZiAoZWxldmF0aW9uIDwgdHJlZV9lbGV2YXRpb25zW2ldKSB7XG4gICAgICAgICAgICBpZiAodHJlZV9zdGF0ZVtpXSkge1xuICAgICAgICAgICAgICAgIC8vb2JqW2ldID0gWyd0cmVlJywgdHJlZVtpXS54LCB0cmVlW2ldLnksIE1hdGguU1FSVDJdO1xuICAgICAgICAgICAgICAgIHRyZWVfYmxvY2tzW2ldLmZvckVhY2goZnVuY3Rpb24gKHB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrID0gcHQueCArIFwiLFwiICsgcHQueTtcbiAgICAgICAgICAgICAgICAgICAgb2JqW2tdID0gKG9ialtrXSB8fCBbXSkuY29uY2F0KFtbJ3RyZWUnLCB0cmVlW2ldLngsIHRyZWVbaV0ueSwgTWF0aC5TUVJUMl1dKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gVmlzaW9uU2ltdWxhdGlvbih3b3JsZGRhdGEsIG1hcERhdGFJbWFnZVBhdGgsIG9uUmVhZHksIG9wdHMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgXG4gICAgdGhpcy5vcHRzID0gb3B0cyB8fCB7fTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLmdyaWRuYXYgPSBudWxsO1xuICAgIHRoaXMuZW50X2Zvd19ibG9ja2VyX25vZGUgPSBudWxsO1xuICAgIHRoaXMudG9vbHNfbm9fd2FyZHMgPSBudWxsO1xuICAgIHRoaXMuZWxldmF0aW9uVmFsdWVzID0gW107XG4gICAgdGhpcy5lbGV2YXRpb25HcmlkID0gbnVsbDtcbiAgICB0aGlzLmVsZXZhdGlvbldhbGxzID0ge307XG4gICAgdGhpcy50cmVlV2FsbHMgPSB7fTtcbiAgICB0aGlzLnRyZWUgPSB7fTsgLy8gY2VudGVyIGtleSB0byBwb2ludCBtYXBcbiAgICB0aGlzLnRyZWVfYmxvY2tzID0ge307IC8vIGNlbnRlciB0byBjb3JuZXJzIG1hcFxuICAgIHRoaXMudHJlZV9yZWxhdGlvbnMgPSB7fTsgLy8gY29ybmVyIHRvIGNlbnRlciBtYXBcbiAgICB0aGlzLnRyZWVfZWxldmF0aW9ucyA9IHt9O1xuICAgIHRoaXMudHJlZV9zdGF0ZSA9IHt9O1xuICAgIHRoaXMud2FsbHMgPSB7fTtcbiAgICB0aGlzLnJhZGl1cyA9IHRoaXMub3B0cy5yYWRpdXMgfHwgcGFyc2VJbnQoMTYwMCAvIDY0KTtcbiAgICB0aGlzLmxpZ2h0cyA9IHt9O1xuICAgIHRoaXMud29ybGRNaW5YID0gd29ybGRkYXRhLndvcmxkTWluWDtcbiAgICB0aGlzLndvcmxkTWluWSA9IHdvcmxkZGF0YS53b3JsZE1pblk7XG4gICAgdGhpcy53b3JsZE1heFggPSB3b3JsZGRhdGEud29ybGRNYXhYO1xuICAgIHRoaXMud29ybGRNYXhZID0gd29ybGRkYXRhLndvcmxkTWF4WTtcbiAgICB0aGlzLndvcmxkV2lkdGggPSB0aGlzLndvcmxkTWF4WCAtIHRoaXMud29ybGRNaW5YO1xuICAgIHRoaXMud29ybGRIZWlnaHQgPSB0aGlzLndvcmxkTWF4WSAtIHRoaXMud29ybGRNaW5ZO1xuICAgIHRoaXMuZ3JpZFdpZHRoID0gdGhpcy53b3JsZFdpZHRoIC8gNjQgKyAxO1xuICAgIHRoaXMuZ3JpZEhlaWdodCA9IHRoaXMud29ybGRIZWlnaHQgLyA2NCArIDE7XG4gICAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICAgIFxuICAgIHRoaXMuaW1hZ2VIYW5kbGVyID0gbmV3IEltYWdlSGFuZGxlcihtYXBEYXRhSW1hZ2VQYXRoKTtcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuaW1hZ2VIYW5kbGVyLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2UgbG9hZCcsIHQyIC0gdDEgKyAnbXMnKTtcbiAgICAgICAgc2VsZi5ncmlkbmF2ID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGggKiAyLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBibGFja1BpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYuZW50X2Zvd19ibG9ja2VyX25vZGUgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCAqIDMsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGJsYWNrUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgc2VsZi50b29sc19ub193YXJkcyA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoICogNCwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgYmxhY2tQaXhlbEhhbmRsZXIpO1xuICAgICAgICBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgdHJlZUVsZXZhdGlvblBpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYuZWxldmF0aW9uR3JpZCA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIDAsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGVsZXZhdGlvblBpeGVsSGFuZGxlcik7XG4gICAgICAgIHZhciB0MyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBwcm9jZXNzJywgdDMgLSB0MiArICdtcycpO1xuICAgICAgICBzZWxmLmVsZXZhdGlvblZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGV2YXRpb24pIHtcbiAgICAgICAgICAgIC8vc2VsZi5lbGV2YXRpb25XYWxsc1tlbGV2YXRpb25dID0gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyhzZWxmLmVsZXZhdGlvbkdyaWQsIGVsZXZhdGlvbik7XG4gICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dID0ge307XG4gICAgICAgICAgICBzZXRUcmVlV2FsbHMoc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXSwgZWxldmF0aW9uLCBzZWxmLnRyZWUsIHNlbGYudHJlZV9lbGV2YXRpb25zLCBzZWxmLnRyZWVfc3RhdGUsIHNlbGYudHJlZV9ibG9ja3MpXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdDQgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnd2FsbHMgZ2VuZXJhdGlvbicsIHQ0IC0gdDMgKyAnbXMnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmdyaWRXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLmdyaWRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZi5ncmlkSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHQgPSB4eTJwdChpLCBqKTtcbiAgICAgICAgICAgICAgICBrZXkycHRfY2FjaGVbcHQua2V5XSA9IHB0O1xuICAgICAgICAgICAgICAgIHNlbGYuZ3JpZFtpXS5wdXNoKHB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdDUgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnY2FjaGUgcHJpbWUnLCB0NSAtIHQ0ICsgJ21zJyk7XG4gICAgICAgIHNlbGYucmVhZHkgPSB0cnVlO1xuICAgICAgICBvblJlYWR5KCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUltYWdlKGltYWdlSGFuZGxlciwgb2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIpIHtcbiAgICAgICAgdmFyIGdyaWQgPSB7fTtcbiAgICAgICAgaW1hZ2VIYW5kbGVyLnNjYW4ob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIsIGdyaWQpO1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBibGFja1BpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBpZiAocFswXSA9PT0gMCkge1xuICAgICAgICAgICAgZ3JpZFtwdC54ICsgXCIsXCIgKyBwdC55XSA9IHB0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gZWxldmF0aW9uUGl4ZWxIYW5kbGVyKHgsIHksIHAsIGdyaWQpIHtcbiAgICAgICAgdmFyIHB0ID0gc2VsZi5JbWFnZVhZdG9HcmlkWFkoeCwgeSk7XG4gICAgICAgIHB0LnogPSBwWzBdO1xuICAgICAgICBncmlkW3B0LnggKyBcIixcIiArIHB0LnldID0gcHQ7XG4gICAgICAgIGlmIChzZWxmLmVsZXZhdGlvblZhbHVlcy5pbmRleE9mKHBbMF0pID09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVsZXZhdGlvblZhbHVlcy5wdXNoKHBbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJlZUVsZXZhdGlvblBpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBpZiAocFsxXSA9PSAwICYmIHBbMl0gPT0gMCkge1xuICAgICAgICAgICAgLy8gdHJlZXMgYXJlIDJ4MiBpbiBncmlkXG4gICAgICAgICAgICAvLyB0cmVlIG9yaWdpbnMgcm91bmRlZCB1cCB3aGVuIGNvbnZlcnRlZCB0byBncmlkLCBzbyB0aGV5IHJlcHJlc2VudCB0b3AgcmlnaHQgY29ybmVyLiBzdWJ0cmFjdCAwLjUgdG8gZ2V0IGdyaWQgb3JpZ2luXG4gICAgICAgICAgICB2YXIgdHJlZU9yaWdpbiA9IHh5MnB0KHB0LnggLSAwLjUsIHB0LnkgLSAwLjUpO1xuICAgICAgICAgICAgdmFyIHRyZWVFbGV2YXRpb24gPSBwWzBdICsgNDA7XG4gICAgICAgICAgICB2YXIga0MgPSB0cmVlT3JpZ2luLmtleTtcbiAgICAgICAgICAgIHNlbGYudHJlZVtrQ10gPSB0cmVlT3JpZ2luO1xuICAgICAgICAgICAgc2VsZi50cmVlX2VsZXZhdGlvbnNba0NdID0gdHJlZUVsZXZhdGlvbjtcbiAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3Nba0NdID0gW107XG4gICAgICAgICAgICBzZWxmLnRyZWVfc3RhdGVba0NdID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0cmVlIDJ4MiBieSB0YWtpbmcgZmxvb3IgYW5kIGNlaWwgb2YgdHJlZSBncmlkIG9yaWdpblxuICAgICAgICAgICAgW01hdGguZmxvb3IsIE1hdGguY2VpbF0uZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIFtNYXRoLmZsb29yLCBNYXRoLmNlaWxdLmZvckVhY2goZnVuY3Rpb24gKGopIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyZWVDb3JuZXIgPSB4eTJwdChpKHRyZWVPcmlnaW4ueCksIGoodHJlZU9yaWdpbi55KSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9yZWxhdGlvbnNbdHJlZUNvcm5lci5rZXldID0gKHNlbGYudHJlZV9yZWxhdGlvbnNbdHJlZUNvcm5lci5rZXldIHx8IFtdKS5jb25jYXQodHJlZU9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3Nba0NdLnB1c2godHJlZUNvcm5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGlnaHRQYXNzZXNDYWxsYmFjayA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBrZXkgPSB4ICsgJywnICsgeTtcbiAgICAgICAgcmV0dXJuICEoa2V5IGluIHNlbGYuZWxldmF0aW9uV2FsbHNbc2VsZi5lbGV2YXRpb25dKSAmJiAhKGtleSBpbiBzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlKSAmJiAhKGtleSBpbiBzZWxmLnRyZWVXYWxsc1tzZWxmLmVsZXZhdGlvbl0gJiYgc2VsZi50cmVlV2FsbHNbc2VsZi5lbGV2YXRpb25dW2tleV0ubGVuZ3RoID4gMCkgO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmZvdiA9IG5ldyBST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nKHRoaXMubGlnaHRQYXNzZXNDYWxsYmFjaywge3RvcG9sb2d5Ojh9KTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnVwZGF0ZVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoZ1gsIGdZLCByYWRpdXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGtleSA9IHh5MmtleShnWCwgZ1kpO1xuXG4gICAgcmFkaXVzID0gcmFkaXVzIHx8IHNlbGYucmFkaXVzO1xuICAgIHRoaXMuZWxldmF0aW9uID0gdGhpcy5lbGV2YXRpb25HcmlkW2tleV0uejtcbiAgICB0aGlzLndhbGxzID0gdGhpcy50cmVlV2FsbHNbdGhpcy5lbGV2YXRpb25dO1xuICAgIGlmICghdGhpcy5lbGV2YXRpb25XYWxsc1t0aGlzLmVsZXZhdGlvbl0pIHRoaXMuZWxldmF0aW9uV2FsbHNbdGhpcy5lbGV2YXRpb25dID0gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyh0aGlzLmVsZXZhdGlvbkdyaWQsIHRoaXMuZWxldmF0aW9uKTtcbiAgICAvL3NldEVsZXZhdGlvbldhbGxzKHRoaXMud2FsbHMsIHRoaXMuZWxldmF0aW9uV2FsbHMsIHRoaXMuZWxldmF0aW9uKVxuICAgIC8vc2V0V2FsbHModGhpcy53YWxscywgdGhpcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSk7XG4gICAgLy9zZXRXYWxscyh0aGlzLndhbGxzLCB0aGlzLnRvb2xzX25vX3dhcmRzKTtcbiAgICAvL3NldFRyZWVXYWxscyh0aGlzLndhbGxzLCB0aGlzLmVsZXZhdGlvbiwgdGhpcy50cmVlLCB0aGlzLnRyZWVfZWxldmF0aW9ucywgdGhpcy50cmVlX3N0YXRlLCB0aGlzLnRyZWVfYmxvY2tzKTtcblxuICAgIHRoaXMuZm92LndhbGxzID0gdGhpcy53YWxscztcbiAgICB0aGlzLmxpZ2h0cyA9IHt9O1xuICAgIHRoaXMuZm92LmNvbXB1dGUoZ1gsIGdZLCByYWRpdXMsIGZ1bmN0aW9uKHgyLCB5MiwgciwgdmlzKSB7XG4gICAgICAgIHZhciBrZXkgPSB4eTJrZXkoeDIsIHkyKTtcbiAgICAgICAgaWYgKCFzZWxmLmVsZXZhdGlvbkdyaWRba2V5XSkgcmV0dXJuO1xuICAgICAgICB2YXIgdHJlZVB0cyA9IHNlbGYudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgdmFyIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAodHJlZVB0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyZWVQdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gc2VsZi50cmVlX3N0YXRlW3RyZWVQdC5rZXldICYmIHNlbGYudHJlZV9lbGV2YXRpb25zW3RyZWVQdC5rZXldID4gc2VsZi5lbGV2YXRpb247XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpcyA9PSAxICYmICFzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlW2tleV0gJiYgIXRyZWVCbG9ja2luZyAmJiAoZ1gteDIpKihnWC14MikgKyAoZ1kteTIpKihnWS15MikgPCByYWRpdXMgKiByYWRpdXMpIHtcbiAgICAgICAgICAgIHNlbGYubGlnaHRzW2tleV0gPSAyNTU7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuaXNWYWxpZFhZID0gZnVuY3Rpb24gKHgsIHksIGJDaGVja0dyaWRuYXYsIGJDaGVja1Rvb2xzTm9XYXJkcywgYkNoZWNrVHJlZVN0YXRlKSB7XG4gICAgaWYgKCF0aGlzLnJlYWR5KSByZXR1cm4gZmFsc2U7XG4gICAgXG4gICAgdmFyIGtleSA9IHh5MmtleSh4LCB5KSxcbiAgICAgICAgdHJlZUJsb2NraW5nID0gZmFsc2U7XG4gICAgICAgIFxuICAgIGlmIChiQ2hlY2tUcmVlU3RhdGUpIHtcbiAgICAgICAgdmFyIHRyZWVQdHMgPSB0aGlzLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgICAgIGlmICh0cmVlUHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWVQdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJlZVB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSB0aGlzLnRyZWVfc3RhdGVbdHJlZVB0LmtleV07XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5ncmlkV2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLmdyaWRIZWlnaHQgJiYgKCFiQ2hlY2tHcmlkbmF2IHx8ICF0aGlzLmdyaWRuYXZba2V5XSkgJiYgKCFiQ2hlY2tUb29sc05vV2FyZHMgfHwgIXRoaXMudG9vbHNfbm9fd2FyZHNba2V5XSkgJiYgKCFiQ2hlY2tUcmVlU3RhdGUgfHwgIXRyZWVCbG9ja2luZyk7XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnRvZ2dsZVRyZWUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIga2V5ID0geHkya2V5KHgsIHkpO1xuICAgIHZhciBpc1RyZWUgPSAhIXRoaXMudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICBpZiAoaXNUcmVlKSB7XG4gICAgICAgIHZhciB0cmVlUHRzID0gdGhpcy50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWVQdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICB0aGlzLnRyZWVfc3RhdGVbcHQua2V5XSA9ICF0aGlzLnRyZWVfc3RhdGVbcHQua2V5XTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5lbGV2YXRpb25WYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZXZhdGlvbiA8IHNlbGYudHJlZV9lbGV2YXRpb25zW3B0LmtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlX2Jsb2Nrc1twdC5rZXldLmZvckVhY2goZnVuY3Rpb24gKHB0Qikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0ubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHQueCA9PSBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldW2pdWzFdICYmIHB0LnkgPT0gc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XVtqXVsyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50cmVlX3N0YXRlW3B0LmtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3NbcHQua2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChwdEIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldID0gKHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0gfHwgW10pLmNvbmNhdChbWyd0cmVlJywgcHQueCwgcHQueSwgTWF0aC5TUVJUMl1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXNUcmVlO1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24gKHIpIHtcbiAgICB0aGlzLnJhZGl1cyA9IHI7XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5Xb3JsZFhZdG9HcmlkWFkgPSBmdW5jdGlvbiAod1gsIHdZLCBiTm9Sb3VuZCkge1xuICAgIHZhciB4ID0gKHdYIC0gdGhpcy53b3JsZE1pblgpIC8gNjQsXG4gICAgICAgIHkgPSAod1kgLSB0aGlzLndvcmxkTWluWSkgLyA2NDtcbiAgICBpZiAoIWJOb1JvdW5kKSB7XG4gICAgICAgIHggPSBwYXJzZUludChNYXRoLnJvdW5kKHgpKVxuICAgICAgICB5ID0gcGFyc2VJbnQoTWF0aC5yb3VuZCh5KSlcbiAgICB9XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5LCBrZXk6IHggKyAnLCcgKyB5fTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkdyaWRYWXRvV29ybGRYWSA9IGZ1bmN0aW9uIChnWCwgZ1kpIHtcbiAgICByZXR1cm4ge3g6IGdYICogNjQgKyB0aGlzLndvcmxkTWluWCwgeTogZ1kgKiA2NCArIHRoaXMud29ybGRNaW5ZfTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuR3JpZFhZdG9JbWFnZVhZID0gZnVuY3Rpb24gKGdYLCBnWSkge1xuICAgIHJldHVybiB7eDogZ1gsIHk6IHRoaXMuZ3JpZEhlaWdodCAtIGdZIC0gMX07XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkltYWdlWFl0b0dyaWRYWSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIGdZID0gdGhpcy5ncmlkSGVpZ2h0IC0geSAtIDE7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiBnWSwga2V5OiB4ICsgJywnICsgZ1l9O1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5Xb3JsZFhZdG9JbWFnZVhZID0gZnVuY3Rpb24gKHdYLCB3WSkge1xuICAgIHZhciBwdCA9IHRoaXMuV29ybGRYWXRvR3JpZFhZKHdYLCB3WSk7XG4gICAgcmV0dXJuIHRoaXMuR3JpZFhZdG9JbWFnZVhZKHB0LngsIHB0LnkpO1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5rZXkycHQgPSBrZXkycHQ7XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJrZXkgPSB4eTJrZXk7XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJwdCA9IHh5MnB0O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUucHQya2V5ID0gcHQya2V5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc2lvblNpbXVsYXRpb247IiwibW9kdWxlLmV4cG9ydHM9e1wid29ybGRNaW5YXCI6LTgyODgsXCJ3b3JsZE1heFhcIjo4Mjg4LFwid29ybGRNaW5ZXCI6LTgyODgsXCJ3b3JsZE1heFlcIjo4Mjg4fSJdfQ==
