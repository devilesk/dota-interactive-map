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
                code_version: "b07ce97c219a3f69ebd738fbc560bf5cf8ac95d3",
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
        var dayVision = DARKNESS ? Math.min(marker.dayVision, DARKNESS_VISION_RADIUS) : marker.dayVision;
        var nightVision = DARKNESS ? Math.min(marker.nightVision, DARKNESS_VISION_RADIUS) : marker.nightVision;
        var trueSight = marker.trueSight;
        var attackRange = marker.attackRange;
        
        if (!skipDay && marker.dayVision) addVisionCircle(dayRangeLayer, marker, dayVision, 'day_vision_feature', style.day);
        if (!skipNight && marker.nightVision) addVisionCircle(nightRangeLayer, marker, nightVision, 'night_vision_feature', style.night);
        if (!skipTrueSight && marker.trueSight) addVisionCircle(trueSightRangeLayer, marker, trueSight, 'true_sight_feature', style.true_sight);
        if (!skipAttack && marker.attackRange) addVisionCircle(attackRangeLayer, marker, attackRange, 'attack_range_feature', style.attack_range);
        
        if (VISION_SIMULATION && !skipDay && marker.dayVision) updateVisibilityHandler(marker.lonlat, marker, dayVision);
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
        updatePopup(marker, marker.showInfo);
    }

    function handleWardClick(entityName, style) {
        return function(event) {
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
            marker = createWardMarker(entity.icon_path, latlon);
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

        QueryString.removeQueryStringValue(this.unitType, this.ward_loc);
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
        
        if (markers.name != "Trees") {
            console.log(markers.name);
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
                        marker.dayVision = statData[marker.unitClass].dayVision;
                        marker.nightVision = statData[marker.unitClass].nightVision;
                        marker.trueSight = statData[marker.unitClass].trueSight;
                        marker.attackRange = statData[marker.unitClass].attackRange;
                        marker.pullType = coordData[k][i].pullType;
                        marker.neutralType = coordData[k][i].neutralType;
                        marker.showInfo = false;
                        
                        marker.events.register("click", markers[k], handleTowerMarkerClick);
                        marker.events.register("touchstart", markers[k], handleTowerMarkerClick);
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

        if (VISION_SIMULATION) {
            loadGeoJSONData(markers, 'no_wards', layerNames.no_wards, style.red);
            loadGeoJSONData(markers, 'ent_fow_blocker_node', layerNames.ent_fow_blocker_node, style.lightblue);
        }
            
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
                marker.events.register("click", marker, handleTreeMarkerClick);
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
            if (marker.unitType == 'observer') {
                updateWard(marker, state ? DARKNESS_VISION_RADIUS : marker.vision_radius);
            }
        });
        
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
        npc_dota_neutral_spawner: "Neutral Camp"
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
        
        if (addVisibleArea) {
            popupContentHTML += "<br>Visible Area: " + (vs.lightArea / vs.area * 100).toFixed() + '% ' + vs.lightArea + "/" + vs.area;
        }
        else {
            if (stats.hasOwnProperty('dayVision') && stats.hasOwnProperty('nightVision')) {
                popupContentHTML += "<br><br>Click to view range overlays.";
            }
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcm9sbGJhci1icm93c2VyL2Rpc3Qvcm9sbGJhci51bWQubm9qc29uLm1pbi5qcyIsInNyYy9hcHAuanMiLCJzcmMvY29udmVyc2lvbkZ1bmN0aW9ucy5qcyIsInNyYy9nZXRMaWdodFVuaW9uLmpzIiwic3JjL21hcENvbnN0YW50cy5qcyIsInNyYy9zdHlsZUNvbnN0YW50cy5qcyIsInNyYy91dGlsL2RlYm91bmNlLmpzIiwic3JjL3V0aWwvZ2V0SlNPTi5qcyIsInNyYy91dGlsL3F1ZXJ5U3RyaW5nLmpzIiwic3JjL3V0aWwvdHJpbS5qcyIsIi4uL2RvdGEtdmlzaW9uLXNpbXVsYXRpb24vYnJvd3Nlci9pbWFnZUhhbmRsZXIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL2Jyb3dzZXIvcG5nLmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9icm93c2VyL3psaWIuanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy9yb3Q2LmpzIiwiLi4vZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvdmlzaW9uLXNpbXVsYXRpb24uanMiLCIuLi9kb3RhLXZpc2lvbi1zaW11bGF0aW9uL3NyYy93b3JsZGRhdGEuanNvbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0d0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFUQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIhZnVuY3Rpb24oZSxyKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1yKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLHIpO2Vsc2V7dmFyIHQ9cigpO2Zvcih2YXIgbiBpbiB0KShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOmUpW25dPXRbbl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHIobil7aWYodFtuXSlyZXR1cm4gdFtuXS5leHBvcnRzO3ZhciBvPXRbbl09e2V4cG9ydHM6e30saWQ6bixsb2FkZWQ6ITF9O3JldHVybiBlW25dLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLHIpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgdD17fTtyZXR1cm4gci5tPWUsci5jPXQsci5wPVwiXCIscigwKX0oW2Z1bmN0aW9uKGUscix0KXtlLmV4cG9ydHM9dCgxKX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oKXt2YXIgZT1cInVuZGVmaW5lZFwiPT10eXBlb2YgSlNPTj97fTpKU09OO28uc2V0dXBKU09OKGUpfXZhciBvPXQoMiksaT10KDMpO24oKTt2YXIgYT13aW5kb3cuX3JvbGxiYXJDb25maWcscz1hJiZhLmdsb2JhbEFsaWFzfHxcIlJvbGxiYXJcIix1PXdpbmRvd1tzXSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvd1tzXS5zaGltSWQ7IXUmJmE/by53cmFwcGVyLmluaXQoYSk6KHdpbmRvdy5Sb2xsYmFyPW8ud3JhcHBlcix3aW5kb3cuUm9sbGJhck5vdGlmaWVyPWkuTm90aWZpZXIpLGUuZXhwb3J0cz1vLndyYXBwZXJ9LGZ1bmN0aW9uKGUscix0KXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBuKGUscix0KXshdFs0XSYmd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yJiYodFs0XT13aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3Isd2luZG93Ll9yb2xsYmFyV3JhcHBlZEVycm9yPW51bGwpLGUudW5jYXVnaHRFcnJvci5hcHBseShlLHQpLHImJnIuYXBwbHkod2luZG93LHQpfWZ1bmN0aW9uIG8oZSxyKXtpZihyLmhhc093blByb3BlcnR5JiZyLmhhc093blByb3BlcnR5KFwiYWRkRXZlbnRMaXN0ZW5lclwiKSl7dmFyIHQ9ci5hZGRFdmVudExpc3RlbmVyO3IuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihyLG4sbyl7dC5jYWxsKHRoaXMscixlLndyYXAobiksbyl9O3ZhciBuPXIucmVtb3ZlRXZlbnRMaXN0ZW5lcjtyLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oZSxyLHQpe24uY2FsbCh0aGlzLGUsciYmci5fd3JhcHBlZHx8cix0KX19fXZhciBpPXQoMyksYT10KDgpLHM9aS5Ob3RpZmllcjt3aW5kb3cuX3JvbGxiYXJXcmFwcGVkRXJyb3I9bnVsbDt2YXIgdT17fTt1LmluaXQ9ZnVuY3Rpb24oZSxyKXt2YXIgdD1uZXcgcyhyKTtpZih0LmNvbmZpZ3VyZShlKSxlLmNhcHR1cmVVbmNhdWdodCl7dmFyIGk7ciYmYS5pc1R5cGUoci5fcm9sbGJhck9sZE9uRXJyb3IsXCJmdW5jdGlvblwiKT9pPXIuX3JvbGxiYXJPbGRPbkVycm9yOndpbmRvdy5vbmVycm9yJiYhd2luZG93Lm9uZXJyb3IuYmVsb25nc1RvU2hpbSYmKGk9d2luZG93Lm9uZXJyb3IpLHdpbmRvdy5vbmVycm9yPWZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDApO24odCxpLGUpfTt2YXIgdSxjLGw9W1wiRXZlbnRUYXJnZXRcIixcIldpbmRvd1wiLFwiTm9kZVwiLFwiQXBwbGljYXRpb25DYWNoZVwiLFwiQXVkaW9UcmFja0xpc3RcIixcIkNoYW5uZWxNZXJnZXJOb2RlXCIsXCJDcnlwdG9PcGVyYXRpb25cIixcIkV2ZW50U291cmNlXCIsXCJGaWxlUmVhZGVyXCIsXCJIVE1MVW5rbm93bkVsZW1lbnRcIixcIklEQkRhdGFiYXNlXCIsXCJJREJSZXF1ZXN0XCIsXCJJREJUcmFuc2FjdGlvblwiLFwiS2V5T3BlcmF0aW9uXCIsXCJNZWRpYUNvbnRyb2xsZXJcIixcIk1lc3NhZ2VQb3J0XCIsXCJNb2RhbFdpbmRvd1wiLFwiTm90aWZpY2F0aW9uXCIsXCJTVkdFbGVtZW50SW5zdGFuY2VcIixcIlNjcmVlblwiLFwiVGV4dFRyYWNrXCIsXCJUZXh0VHJhY2tDdWVcIixcIlRleHRUcmFja0xpc3RcIixcIldlYlNvY2tldFwiLFwiV2ViU29ja2V0V29ya2VyXCIsXCJXb3JrZXJcIixcIlhNTEh0dHBSZXF1ZXN0XCIsXCJYTUxIdHRwUmVxdWVzdEV2ZW50VGFyZ2V0XCIsXCJYTUxIdHRwUmVxdWVzdFVwbG9hZFwiXTtmb3IodT0wO3U8bC5sZW5ndGg7Kyt1KWM9bFt1XSx3aW5kb3dbY10mJndpbmRvd1tjXS5wcm90b3R5cGUmJm8odCx3aW5kb3dbY10ucHJvdG90eXBlKX1yZXR1cm4gZS5jYXB0dXJlVW5oYW5kbGVkUmVqZWN0aW9ucyYmKHImJmEuaXNUeXBlKHIuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIsXCJmdW5jdGlvblwiKSYmd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ1bmhhbmRsZWRyZWplY3Rpb25cIixyLl91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKSx0Ll91bmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyPWZ1bmN0aW9uKGUpe3ZhciByPWUucmVhc29uLG49ZS5wcm9taXNlLG89ZS5kZXRhaWw7IXImJm8mJihyPW8ucmVhc29uLG49by5wcm9taXNlKSx0LnVuaGFuZGxlZFJlamVjdGlvbihyLG4pfSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInVuaGFuZGxlZHJlamVjdGlvblwiLHQuX3VuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXIpKSx3aW5kb3cuUm9sbGJhcj10LHMucHJvY2Vzc1BheWxvYWRzKCksdH0sZS5leHBvcnRzPXt3cmFwcGVyOnUsc2V0dXBKU09OOmkuc2V0dXBKU09OfX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7RT1lLHcuc2V0dXBKU09OKGUpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgdD1yfHx0aGlzO3RyeXtyZXR1cm4gZS5hcHBseSh0LGFyZ3VtZW50cyl9Y2F0Y2gobil7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTpcIixuKX19fWZ1bmN0aW9uIGkoKXtofHwoaD1zZXRUaW1lb3V0KGYsMWUzKSl9ZnVuY3Rpb24gYSgpe3JldHVybiBffWZ1bmN0aW9uIHMoZSl7Xz1ffHx0aGlzO3ZhciByPVwiaHR0cHM6Ly9cIitzLkRFRkFVTFRfRU5EUE9JTlQ7dGhpcy5vcHRpb25zPXtlbmFibGVkOiEwLGVuZHBvaW50OnIsZW52aXJvbm1lbnQ6XCJwcm9kdWN0aW9uXCIsc2NydWJGaWVsZHM6ZyhbXSxzLkRFRkFVTFRfU0NSVUJfRklFTERTKSxjaGVja0lnbm9yZTpudWxsLGxvZ0xldmVsOnMuREVGQVVMVF9MT0dfTEVWRUwscmVwb3J0TGV2ZWw6cy5ERUZBVUxUX1JFUE9SVF9MRVZFTCx1bmNhdWdodEVycm9yTGV2ZWw6cy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMLHBheWxvYWQ6e319LHRoaXMubGFzdEVycm9yPW51bGwsdGhpcy5wbHVnaW5zPXt9LHRoaXMucGFyZW50Tm90aWZpZXI9ZSxlJiYoZS5oYXNPd25Qcm9wZXJ0eShcInNoaW1JZFwiKT9lLm5vdGlmaWVyPXRoaXM6dGhpcy5jb25maWd1cmUoZS5vcHRpb25zKSl9ZnVuY3Rpb24gdShlKXt3aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWUucHVzaChlKSxpKCl9ZnVuY3Rpb24gYyhlKXtyZXR1cm4gbyhmdW5jdGlvbigpe3ZhciByPXRoaXMuX2dldExvZ0FyZ3MoYXJndW1lbnRzKTtyZXR1cm4gdGhpcy5fbG9nKGV8fHIubGV2ZWx8fHRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxyLm1lc3NhZ2Usci5lcnIsci5jdXN0b20sci5jYWxsYmFjayl9KX1mdW5jdGlvbiBsKGUscil7ZXx8KGU9cj9FLnN0cmluZ2lmeShyKTpcIlwiKTt2YXIgdD17Ym9keTplfTtyZXR1cm4gciYmKHQuZXh0cmE9ZyghMCx7fSxyKSkse21lc3NhZ2U6dH19ZnVuY3Rpb24gcChlLHIsdCl7dmFyIG49bS5ndWVzc0Vycm9yQ2xhc3Moci5tZXNzYWdlKSxvPXIubmFtZXx8blswXSxpPW5bMV0sYT17ZXhjZXB0aW9uOntcImNsYXNzXCI6byxtZXNzYWdlOml9fTtpZihlJiYoYS5leGNlcHRpb24uZGVzY3JpcHRpb249ZXx8XCJ1bmNhdWdodCBleGNlcHRpb25cIiksci5zdGFjayl7dmFyIHMsdSxjLHAsZixkLGgsdztmb3IoYS5mcmFtZXM9W10saD0wO2g8ci5zdGFjay5sZW5ndGg7KytoKXM9ci5zdGFja1toXSx1PXtmaWxlbmFtZTpzLnVybD92LnNhbml0aXplVXJsKHMudXJsKTpcIih1bmtub3duKVwiLGxpbmVubzpzLmxpbmV8fG51bGwsbWV0aG9kOnMuZnVuYyYmXCI/XCIhPT1zLmZ1bmM/cy5mdW5jOlwiW2Fub255bW91c11cIixjb2xubzpzLmNvbHVtbn0sYz1wPWY9bnVsbCxkPXMuY29udGV4dD9zLmNvbnRleHQubGVuZ3RoOjAsZCYmKHc9TWF0aC5mbG9vcihkLzIpLHA9cy5jb250ZXh0LnNsaWNlKDAsdyksYz1zLmNvbnRleHRbd10sZj1zLmNvbnRleHQuc2xpY2UodykpLGMmJih1LmNvZGU9YyksKHB8fGYpJiYodS5jb250ZXh0PXt9LHAmJnAubGVuZ3RoJiYodS5jb250ZXh0LnByZT1wKSxmJiZmLmxlbmd0aCYmKHUuY29udGV4dC5wb3N0PWYpKSxzLmFyZ3MmJih1LmFyZ3M9cy5hcmdzKSxhLmZyYW1lcy5wdXNoKHUpO3JldHVybiBhLmZyYW1lcy5yZXZlcnNlKCksdCYmKGEuZXh0cmE9ZyghMCx7fSx0KSkse3RyYWNlOmF9fXJldHVybiBsKG8rXCI6IFwiK2ksdCl9ZnVuY3Rpb24gZigpe3ZhciBlO3RyeXtmb3IoO2U9d2luZG93Ll9yb2xsYmFyUGF5bG9hZFF1ZXVlLnNoaWZ0KCk7KWQoZSl9ZmluYWxseXtoPXZvaWQgMH19ZnVuY3Rpb24gZChlKXt2YXIgcj1lLmVuZHBvaW50VXJsLHQ9ZS5hY2Nlc3NUb2tlbixuPWUucGF5bG9hZCxvPWUuY2FsbGJhY2t8fGZ1bmN0aW9uKCl7fSxpPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2ktTD49NmU0JiYoTD1pLFI9MCk7dmFyIGE9d2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5tYXhJdGVtcyxjPXdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMuaXRlbXNQZXJNaW51dGUsbD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYT49MSYmVD49YX0scD1mdW5jdGlvbigpe3JldHVybiFuLmlnbm9yZVJhdGVMaW1pdCYmYz49MSYmUj49Y307cmV0dXJuIGwoKT92b2lkIG8obmV3IEVycm9yKGErXCIgbWF4IGl0ZW1zIHJlYWNoZWRcIikpOnAoKT92b2lkIG8obmV3IEVycm9yKGMrXCIgaXRlbXMgcGVyIG1pbnV0ZSByZWFjaGVkXCIpKTooVCsrLFIrKyxsKCkmJl8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwibWF4SXRlbXMgaGFzIGJlZW4gaGl0LiBJZ25vcmluZyBlcnJvcnMgZm9yIHRoZSByZW1haW5kZXIgb2YgdGhlIGN1cnJlbnQgcGFnZSBsb2FkLlwiLG51bGwse21heEl0ZW1zOmF9LG51bGwsITEsITApLG4uaWdub3JlUmF0ZUxpbWl0JiZkZWxldGUgbi5pZ25vcmVSYXRlTGltaXQsdm9pZCB5LnBvc3Qocix0LG4sZnVuY3Rpb24ocix0KXtyZXR1cm4gcj8ociBpbnN0YW5jZW9mIGImJihlLmNhbGxiYWNrPWZ1bmN0aW9uKCl7fSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dShlKX0scy5SRVRSWV9ERUxBWSkpLG8ocikpOm8obnVsbCx0KX0pKX12YXIgaCxnPXQoNCksbT10KDUpLHY9dCg4KSx3PXQoMTApLHk9dy5YSFIsYj13LkNvbm5lY3Rpb25FcnJvcixFPW51bGw7cy5OT1RJRklFUl9WRVJTSU9OPVwiMS45LjJcIixzLkRFRkFVTFRfRU5EUE9JTlQ9XCJhcGkucm9sbGJhci5jb20vYXBpLzEvXCIscy5ERUZBVUxUX1NDUlVCX0ZJRUxEUz1bXCJwd1wiLFwicGFzc1wiLFwicGFzc3dkXCIsXCJwYXNzd29yZFwiLFwic2VjcmV0XCIsXCJjb25maXJtX3Bhc3N3b3JkXCIsXCJjb25maXJtUGFzc3dvcmRcIixcInBhc3N3b3JkX2NvbmZpcm1hdGlvblwiLFwicGFzc3dvcmRDb25maXJtYXRpb25cIixcImFjY2Vzc190b2tlblwiLFwiYWNjZXNzVG9rZW5cIixcInNlY3JldF9rZXlcIixcInNlY3JldEtleVwiLFwic2VjcmV0VG9rZW5cIl0scy5ERUZBVUxUX0xPR19MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1JFUE9SVF9MRVZFTD1cImRlYnVnXCIscy5ERUZBVUxUX1VOQ0FVR0hUX0VSUk9SX0xFVkVMPVwiZXJyb3JcIixzLkRFRkFVTFRfSVRFTVNfUEVSX01JTj02MCxzLkRFRkFVTFRfTUFYX0lURU1TPTAscy5MRVZFTFM9e2RlYnVnOjAsaW5mbzoxLHdhcm5pbmc6MixlcnJvcjozLGNyaXRpY2FsOjR9LHMuUkVUUllfREVMQVk9MWU0LHdpbmRvdy5fcm9sbGJhclBheWxvYWRRdWV1ZT13aW5kb3cuX3JvbGxiYXJQYXlsb2FkUXVldWV8fFtdLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnM9e3N0YXJ0VGltZToobmV3IERhdGUpLmdldFRpbWUoKSxtYXhJdGVtczpzLkRFRkFVTFRfTUFYX0lURU1TLGl0ZW1zUGVyTWludXRlOnMuREVGQVVMVF9JVEVNU19QRVJfTUlOfTt2YXIgXyx4PXMucHJvdG90eXBlO3guX2dldExvZ0FyZ3M9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixpLGEsdSxjPXRoaXMub3B0aW9ucy5sb2dMZXZlbHx8cy5ERUZBVUxUX0xPR19MRVZFTCxsPVtdLHA9MDtwPGUubGVuZ3RoOysrcCl1PWVbcF0sYT12LnR5cGVOYW1lKHUpLFwic3RyaW5nXCI9PT1hP3I/bC5wdXNoKHUpOnI9dTpcImZ1bmN0aW9uXCI9PT1hP2k9byh1LHRoaXMpOlwiZGF0ZVwiPT09YT9sLnB1c2godSk6XCJlcnJvclwiPT09YXx8dSBpbnN0YW5jZW9mIEVycm9yfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgRE9NRXhjZXB0aW9uJiZ1IGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uP3Q/bC5wdXNoKHUpOnQ9dTpcIm9iamVjdFwiIT09YSYmXCJhcnJheVwiIT09YXx8KG4/bC5wdXNoKHUpOm49dSk7cmV0dXJuIGwubGVuZ3RoJiYobj1ufHx7fSxuLmV4dHJhQXJncz1sKSx7bGV2ZWw6YyxtZXNzYWdlOnIsZXJyOnQsY3VzdG9tOm4sY2FsbGJhY2s6aX19LHguX3JvdXRlPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXMub3B0aW9ucy5lbmRwb2ludCx0PS9cXC8kLy50ZXN0KHIpLG49L15cXC8vLnRlc3QoZSk7cmV0dXJuIHQmJm4/ZT1lLnN1YnN0cmluZygxKTp0fHxufHwoZT1cIi9cIitlKSxyK2V9LHguX3Byb2Nlc3NTaGltUXVldWU9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQsbixvLGksYSx1LGM9e307dD1lLnNoaWZ0KCk7KXI9dC5zaGltLG49dC5tZXRob2Qsbz10LmFyZ3MsaT1yLnBhcmVudFNoaW0sdT1jW3Iuc2hpbUlkXSx1fHwoaT8oYT1jW2kuc2hpbUlkXSx1PW5ldyBzKGEpKTp1PXRoaXMsY1tyLnNoaW1JZF09dSksdVtuXSYmdi5pc1R5cGUodVtuXSxcImZ1bmN0aW9uXCIpJiZ1W25dLmFwcGx5KHUsbyl9LHguX2J1aWxkUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuLG8pe3ZhciBpPXRoaXMub3B0aW9ucy5hY2Nlc3NUb2tlbixhPXRoaXMub3B0aW9ucy5lbnZpcm9ubWVudCx1PWcoITAse30sdGhpcy5vcHRpb25zLnBheWxvYWQpLGM9di51dWlkNCgpO2lmKHZvaWQgMD09PXMuTEVWRUxTW3JdKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbGV2ZWxcIik7aWYoIXQmJiFuJiYhbyl0aHJvdyBuZXcgRXJyb3IoXCJObyBtZXNzYWdlLCBzdGFjayBpbmZvIG9yIGN1c3RvbSBkYXRhXCIpO3ZhciBsPXtlbnZpcm9ubWVudDphLGVuZHBvaW50OnRoaXMub3B0aW9ucy5lbmRwb2ludCx1dWlkOmMsbGV2ZWw6cixwbGF0Zm9ybTpcImJyb3dzZXJcIixmcmFtZXdvcms6XCJicm93c2VyLWpzXCIsbGFuZ3VhZ2U6XCJqYXZhc2NyaXB0XCIsYm9keTp0aGlzLl9idWlsZEJvZHkodCxuLG8pLHJlcXVlc3Q6e3VybDp3aW5kb3cubG9jYXRpb24uaHJlZixxdWVyeV9zdHJpbmc6d2luZG93LmxvY2F0aW9uLnNlYXJjaCx1c2VyX2lwOlwiJHJlbW90ZV9pcFwifSxjbGllbnQ6e3J1bnRpbWVfbXM6ZS5nZXRUaW1lKCktd2luZG93Ll9nbG9iYWxSb2xsYmFyT3B0aW9ucy5zdGFydFRpbWUsdGltZXN0YW1wOk1hdGgucm91bmQoZS5nZXRUaW1lKCkvMWUzKSxqYXZhc2NyaXB0Onticm93c2VyOndpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LGxhbmd1YWdlOndpbmRvdy5uYXZpZ2F0b3IubGFuZ3VhZ2UsY29va2llX2VuYWJsZWQ6d2luZG93Lm5hdmlnYXRvci5jb29raWVFbmFibGVkLHNjcmVlbjp7d2lkdGg6d2luZG93LnNjcmVlbi53aWR0aCxoZWlnaHQ6d2luZG93LnNjcmVlbi5oZWlnaHR9LHBsdWdpbnM6dGhpcy5fZ2V0QnJvd3NlclBsdWdpbnMoKX19LHNlcnZlcjp7fSxub3RpZmllcjp7bmFtZTpcInJvbGxiYXItYnJvd3Nlci1qc1wiLHZlcnNpb246cy5OT1RJRklFUl9WRVJTSU9OfX07dS5ib2R5JiZkZWxldGUgdS5ib2R5O3ZhciBwPXthY2Nlc3NfdG9rZW46aSxkYXRhOmcoITAsbCx1KX07cmV0dXJuIHRoaXMuX3NjcnViKHAuZGF0YSkscH0seC5fYnVpbGRCb2R5PWZ1bmN0aW9uKGUscix0KXt2YXIgbjtyZXR1cm4gbj1yP3AoZSxyLHQpOmwoZSx0KX0seC5fZ2V0QnJvd3NlclBsdWdpbnM9ZnVuY3Rpb24oKXtpZighdGhpcy5fYnJvd3NlclBsdWdpbnMpe3ZhciBlLHIsdD13aW5kb3cubmF2aWdhdG9yLnBsdWdpbnN8fFtdLG49dC5sZW5ndGgsbz1bXTtmb3Iocj0wO3I8bjsrK3IpZT10W3JdLG8ucHVzaCh7bmFtZTplLm5hbWUsZGVzY3JpcHRpb246ZS5kZXNjcmlwdGlvbn0pO3RoaXMuX2Jyb3dzZXJQbHVnaW5zPW99cmV0dXJuIHRoaXMuX2Jyb3dzZXJQbHVnaW5zfSx4Ll9zY3J1Yj1mdW5jdGlvbihlKXtmdW5jdGlvbiByKGUscix0LG4sbyxpKXtyZXR1cm4gcit2LnJlZGFjdChpKX1mdW5jdGlvbiB0KGUpe3ZhciB0O2lmKHYuaXNUeXBlKGUsXCJzdHJpbmdcIikpZm9yKHQ9MDt0PHMubGVuZ3RoOysrdCllPWUucmVwbGFjZShzW3RdLHIpO3JldHVybiBlfWZ1bmN0aW9uIG4oZSxyKXt2YXIgdDtmb3IodD0wO3Q8YS5sZW5ndGg7Kyt0KWlmKGFbdF0udGVzdChlKSl7cj12LnJlZGFjdChyKTticmVha31yZXR1cm4gcn1mdW5jdGlvbiBvKGUscil7dmFyIG89bihlLHIpO3JldHVybiBvPT09cj90KG8pOm99dmFyIGk9dGhpcy5vcHRpb25zLnNjcnViRmllbGRzLGE9dGhpcy5fZ2V0U2NydWJGaWVsZFJlZ2V4cyhpKSxzPXRoaXMuX2dldFNjcnViUXVlcnlQYXJhbVJlZ2V4cyhpKTtyZXR1cm4gdi50cmF2ZXJzZShlLG8pLGV9LHguX2dldFNjcnViRmllbGRSZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAocixcImlcIikpO3JldHVybiB0fSx4Ll9nZXRTY3J1YlF1ZXJ5UGFyYW1SZWdleHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciByLHQ9W10sbj0wO248ZS5sZW5ndGg7KytuKXI9XCJcXFxcWz8oJTVbYkJdKT9cIitlW25dK1wiXFxcXFs/KCU1W2JCXSk/XFxcXF0/KCU1W2REXSk/XCIsdC5wdXNoKG5ldyBSZWdFeHAoXCIoXCIrcitcIj0pKFteJlxcXFxuXSspXCIsXCJpZ21cIikpO3JldHVybiB0fSx4Ll91cmxJc1doaXRlbGlzdGVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYyxsO3RyeXtpZihyPXRoaXMub3B0aW9ucy5ob3N0V2hpdGVMaXN0LHQ9ZSYmZS5kYXRhJiZlLmRhdGEuYm9keSYmZS5kYXRhLmJvZHkudHJhY2UsIXJ8fDA9PT1yLmxlbmd0aClyZXR1cm4hMDtpZighdClyZXR1cm4hMDtmb3Iocz1yLmxlbmd0aCxpPXQuZnJhbWVzLmxlbmd0aCxjPTA7YzxpO2MrKyl7aWYobj10LmZyYW1lc1tjXSxvPW4uZmlsZW5hbWUsIXYuaXNUeXBlKG8sXCJzdHJpbmdcIikpcmV0dXJuITA7Zm9yKGw9MDtsPHM7bCsrKWlmKGE9cltsXSx1PW5ldyBSZWdFeHAoYSksdS50ZXN0KG8pKXJldHVybiEwfX1jYXRjaChwKXtyZXR1cm4gdGhpcy5jb25maWd1cmUoe2hvc3RXaGl0ZUxpc3Q6bnVsbH0pLGNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHJlYWRpbmcgeW91ciBjb25maWd1cmF0aW9uJ3MgaG9zdFdoaXRlTGlzdCBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBob3N0V2hpdGVMaXN0LlwiLHApLCEwfXJldHVybiExfSx4Ll9tZXNzYWdlSXNJZ25vcmVkPWZ1bmN0aW9uKGUpe3ZhciByLHQsbixvLGksYSxzLHUsYzt0cnl7aWYoaT0hMSxuPXRoaXMub3B0aW9ucy5pZ25vcmVkTWVzc2FnZXMsIW58fDA9PT1uLmxlbmd0aClyZXR1cm4hMTtpZihzPWUmJmUuZGF0YSYmZS5kYXRhLmJvZHksdT1zJiZzLnRyYWNlJiZzLnRyYWNlLmV4Y2VwdGlvbiYmcy50cmFjZS5leGNlcHRpb24ubWVzc2FnZSxjPXMmJnMubWVzc2FnZSYmcy5tZXNzYWdlLmJvZHkscj11fHxjLCFyKXJldHVybiExO2ZvcihvPW4ubGVuZ3RoLHQ9MDt0PG8mJihhPW5ldyBSZWdFeHAoblt0XSxcImdpXCIpLCEoaT1hLnRlc3QocikpKTt0KyspO31jYXRjaChsKXt0aGlzLmNvbmZpZ3VyZSh7aWdub3JlZE1lc3NhZ2VzOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSByZWFkaW5nIHlvdXIgY29uZmlndXJhdGlvbidzIGlnbm9yZWRNZXNzYWdlcyBvcHRpb24uIFJlbW92aW5nIGN1c3RvbSBpZ25vcmVkTWVzc2FnZXMuXCIpfXJldHVybiBpfSx4Ll9lbnF1ZXVlUGF5bG9hZD1mdW5jdGlvbihlLHIsdCxuKXt2YXIgbz17Y2FsbGJhY2s6bixhY2Nlc3NUb2tlbjp0aGlzLm9wdGlvbnMuYWNjZXNzVG9rZW4sZW5kcG9pbnRVcmw6dGhpcy5fcm91dGUoXCJpdGVtL1wiKSxwYXlsb2FkOmV9LGk9ZnVuY3Rpb24oKXtpZihuKXt2YXIgZT1cIlRoaXMgaXRlbSB3YXMgbm90IHNlbnQgdG8gUm9sbGJhciBiZWNhdXNlIGl0IHdhcyBpZ25vcmVkLiBUaGlzIGNhbiBoYXBwZW4gaWYgYSBjdXN0b20gY2hlY2tJZ25vcmUoKSBmdW5jdGlvbiB3YXMgdXNlZCBvciBpZiB0aGUgaXRlbSdzIGxldmVsIHdhcyBsZXNzIHRoYW4gdGhlIG5vdGlmaWVyJyByZXBvcnRMZXZlbC4gU2VlIGh0dHBzOi8vcm9sbGJhci5jb20vZG9jcy9ub3RpZmllci9yb2xsYmFyLmpzL2NvbmZpZ3VyYXRpb24gZm9yIG1vcmUgZGV0YWlscy5cIjtuKG51bGwse2VycjowLHJlc3VsdDp7aWQ6bnVsbCx1dWlkOm51bGwsbWVzc2FnZTplfX0pfX07aWYodGhpcy5faW50ZXJuYWxDaGVja0lnbm9yZShyLHQsZSkpcmV0dXJuIHZvaWQgaSgpO3RyeXtpZih2LmlzVHlwZSh0aGlzLm9wdGlvbnMuY2hlY2tJZ25vcmUsXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmNoZWNrSWdub3JlKHIsdCxlKSlyZXR1cm4gdm9pZCBpKCl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe2NoZWNrSWdub3JlOm51bGx9KSxjb25zb2xlLmVycm9yKFwiW1JvbGxiYXJdOiBFcnJvciB3aGlsZSBjYWxsaW5nIGN1c3RvbSBjaGVja0lnbm9yZSgpIGZ1bmN0aW9uLiBSZW1vdmluZyBjdXN0b20gY2hlY2tJZ25vcmUoKS5cIixhKX1pZih0aGlzLl91cmxJc1doaXRlbGlzdGVkKGUpJiYhdGhpcy5fbWVzc2FnZUlzSWdub3JlZChlKSl7aWYodGhpcy5vcHRpb25zLnZlcmJvc2Upe2lmKGUuZGF0YSYmZS5kYXRhLmJvZHkmJmUuZGF0YS5ib2R5LnRyYWNlKXt2YXIgcz1lLmRhdGEuYm9keS50cmFjZSxjPXMuZXhjZXB0aW9uLm1lc3NhZ2U7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogXCIsYyl9Y29uc29sZS5pbmZvKFwiW1JvbGxiYXJdOiBcIixvKX12LmlzVHlwZSh0aGlzLm9wdGlvbnMubG9nRnVuY3Rpb24sXCJmdW5jdGlvblwiKSYmdGhpcy5vcHRpb25zLmxvZ0Z1bmN0aW9uKG8pO3RyeXt2LmlzVHlwZSh0aGlzLm9wdGlvbnMudHJhbnNmb3JtLFwiZnVuY3Rpb25cIikmJnRoaXMub3B0aW9ucy50cmFuc2Zvcm0oZSl9Y2F0Y2goYSl7dGhpcy5jb25maWd1cmUoe3RyYW5zZm9ybTpudWxsfSksY29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogRXJyb3Igd2hpbGUgY2FsbGluZyBjdXN0b20gdHJhbnNmb3JtKCkgZnVuY3Rpb24uIFJlbW92aW5nIGN1c3RvbSB0cmFuc2Zvcm0oKS5cIixhKX10aGlzLm9wdGlvbnMuZW5hYmxlZCYmdShvKX19LHguX2ludGVybmFsQ2hlY2tJZ25vcmU9ZnVuY3Rpb24oZSxyLHQpe3ZhciBuPXJbMF0sbz1zLkxFVkVMU1tuXXx8MCxpPXMuTEVWRUxTW3RoaXMub3B0aW9ucy5yZXBvcnRMZXZlbF18fDA7aWYobzxpKXJldHVybiEwO3ZhciBhPXRoaXMub3B0aW9ucz90aGlzLm9wdGlvbnMucGx1Z2luczp7fTtpZihhJiZhLmpxdWVyeSYmYS5qcXVlcnkuaWdub3JlQWpheEVycm9ycyl0cnl7cmV0dXJuISF0LmRhdGEuYm9keS5tZXNzYWdlLmV4dHJhLmlzQWpheH1jYXRjaCh1KXtyZXR1cm4hMX1yZXR1cm4hMX0seC5fbG9nPWZ1bmN0aW9uKGUscix0LG4sbyxpLGEpe3ZhciBzPW51bGw7aWYodCl0cnl7aWYocz10Ll9zYXZlZFN0YWNrVHJhY2U/dC5fc2F2ZWRTdGFja1RyYWNlOm0ucGFyc2UodCksdD09PXRoaXMubGFzdEVycm9yKXJldHVybjt0aGlzLmxhc3RFcnJvcj10fWNhdGNoKHUpe2NvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06IEVycm9yIHdoaWxlIHBhcnNpbmcgdGhlIGVycm9yIG9iamVjdC5cIix1KSxyPXQubWVzc2FnZXx8dC5kZXNjcmlwdGlvbnx8cnx8U3RyaW5nKHQpLHQ9bnVsbH12YXIgYz10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsZSxyLHMsbik7YSYmKGMuaWdub3JlUmF0ZUxpbWl0PSEwKSx0aGlzLl9lbnF1ZXVlUGF5bG9hZChjLCEhaSxbZSxyLHQsbl0sbyl9LHgubG9nPWMoKSx4LmRlYnVnPWMoXCJkZWJ1Z1wiKSx4LmluZm89YyhcImluZm9cIikseC53YXJuPWMoXCJ3YXJuaW5nXCIpLHgud2FybmluZz1jKFwid2FybmluZ1wiKSx4LmVycm9yPWMoXCJlcnJvclwiKSx4LmNyaXRpY2FsPWMoXCJjcml0aWNhbFwiKSx4LnVuY2F1Z2h0RXJyb3I9byhmdW5jdGlvbihlLHIsdCxuLG8saSl7aWYoaT1pfHxudWxsLG8mJnYuaXNUeXBlKG8sXCJlcnJvclwiKSlyZXR1cm4gdm9pZCB0aGlzLl9sb2codGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLG8saSxudWxsLCEwKTtpZihyJiZ2LmlzVHlwZShyLFwiZXJyb3JcIikpcmV0dXJuIHZvaWQgdGhpcy5fbG9nKHRoaXMub3B0aW9ucy51bmNhdWdodEVycm9yTGV2ZWwsZSxyLGksbnVsbCwhMCk7dmFyIGE9e3VybDpyfHxcIlwiLGxpbmU6dH07YS5mdW5jPW0uZ3Vlc3NGdW5jdGlvbk5hbWUoYS51cmwsYS5saW5lKSxhLmNvbnRleHQ9bS5nYXRoZXJDb250ZXh0KGEudXJsLGEubGluZSk7dmFyIHM9e21vZGU6XCJvbmVycm9yXCIsbWVzc2FnZTpvP1N0cmluZyhvKTplfHxcInVuY2F1Z2h0IGV4Y2VwdGlvblwiLHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOlthXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sdT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHMsaSk7dGhpcy5fZW5xdWV1ZVBheWxvYWQodSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCxlLHIsdCxuLG9dKX0pLHgudW5oYW5kbGVkUmVqZWN0aW9uPW8oZnVuY3Rpb24oZSxyKXtpZihudWxsPT1lKXJldHVybiB2b2lkIF8uX2xvZyhfLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLFwidW5oYW5kbGVkIHJlamVjdGlvbiB3YXMgbnVsbCBvciB1bmRlZmluZWQhXCIsbnVsbCx7fSxudWxsLCExLCExKTt2YXIgdD1lLm1lc3NhZ2V8fChlP1N0cmluZyhlKTpcInVuaGFuZGxlZCByZWplY3Rpb25cIiksbj1lLl9yb2xsYmFyQ29udGV4dHx8ci5fcm9sbGJhckNvbnRleHR8fG51bGw7aWYoZSYmdi5pc1R5cGUoZSxcImVycm9yXCIpKXJldHVybiB2b2lkIHRoaXMuX2xvZyh0aGlzLm9wdGlvbnMudW5jYXVnaHRFcnJvckxldmVsLHQsZSxuLG51bGwsITApO3ZhciBvPXt1cmw6XCJcIixsaW5lOjB9O28uZnVuYz1tLmd1ZXNzRnVuY3Rpb25OYW1lKG8udXJsLG8ubGluZSksby5jb250ZXh0PW0uZ2F0aGVyQ29udGV4dChvLnVybCxvLmxpbmUpO3ZhciBpPXttb2RlOlwidW5oYW5kbGVkcmVqZWN0aW9uXCIsbWVzc2FnZTp0LHVybDpkb2N1bWVudC5sb2NhdGlvbi5ocmVmLHN0YWNrOltvXSx1c2VyYWdlbnQ6bmF2aWdhdG9yLnVzZXJBZ2VudH0sYT10aGlzLl9idWlsZFBheWxvYWQobmV3IERhdGUsdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LGksbik7dGhpcy5fZW5xdWV1ZVBheWxvYWQoYSwhMCxbdGhpcy5vcHRpb25zLnVuY2F1Z2h0RXJyb3JMZXZlbCx0LG8udXJsLG8ubGluZSwwLGUscl0pfSkseC5nbG9iYWw9byhmdW5jdGlvbihlKXtlPWV8fHt9O3ZhciByPXtzdGFydFRpbWU6ZS5zdGFydFRpbWUsbWF4SXRlbXM6ZS5tYXhJdGVtcyxpdGVtc1Blck1pbnV0ZTplLml0ZW1zUGVyTWludXRlfTtnKCEwLHdpbmRvdy5fZ2xvYmFsUm9sbGJhck9wdGlvbnMsciksdm9pZCAwIT09ZS5tYXhJdGVtcyYmKFQ9MCksdm9pZCAwIT09ZS5pdGVtc1Blck1pbnV0ZSYmKFI9MCl9KSx4LmNvbmZpZ3VyZT1vKGZ1bmN0aW9uKGUscil7dmFyIHQ9ZyghMCx7fSxlKTtnKCFyLHRoaXMub3B0aW9ucyx0KSx0aGlzLmdsb2JhbCh0KX0pLHguc2NvcGU9byhmdW5jdGlvbihlKXt2YXIgcj1uZXcgcyh0aGlzKTtyZXR1cm4gZyghMCxyLm9wdGlvbnMucGF5bG9hZCxlKSxyfSkseC53cmFwPWZ1bmN0aW9uKGUscil7dHJ5e3ZhciB0O2lmKHQ9di5pc1R5cGUocixcImZ1bmN0aW9uXCIpP3I6ZnVuY3Rpb24oKXtyZXR1cm4gcnx8e319LCF2LmlzVHlwZShlLFwiZnVuY3Rpb25cIikpcmV0dXJuIGU7aWYoZS5faXNXcmFwKXJldHVybiBlO2lmKCFlLl93cmFwcGVkKXtlLl93cmFwcGVkPWZ1bmN0aW9uKCl7dHJ5e3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1jYXRjaChyKXt0aHJvd1wic3RyaW5nXCI9PXR5cGVvZiByJiYocj1uZXcgU3RyaW5nKHIpKSxyLnN0YWNrfHwoci5fc2F2ZWRTdGFja1RyYWNlPW0ucGFyc2UocikpLHIuX3JvbGxiYXJDb250ZXh0PXQoKXx8e30sci5fcm9sbGJhckNvbnRleHQuX3dyYXBwZWRTb3VyY2U9ZS50b1N0cmluZygpLHdpbmRvdy5fcm9sbGJhcldyYXBwZWRFcnJvcj1yLHJ9fSxlLl93cmFwcGVkLl9pc1dyYXA9ITA7Zm9yKHZhciBuIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShuKSYmKGUuX3dyYXBwZWRbbl09ZVtuXSl9cmV0dXJuIGUuX3dyYXBwZWR9Y2F0Y2gobyl7cmV0dXJuIGV9fSx4LmxvYWRGdWxsPWZ1bmN0aW9uKCl7Y29uc29sZS5lcnJvcihcIltSb2xsYmFyXTogVW5leHBlY3RlZCBSb2xsYmFyLmxvYWRGdWxsKCkgY2FsbGVkIG9uIGEgTm90aWZpZXIgaW5zdGFuY2VcIil9LHMucHJvY2Vzc1BheWxvYWRzPWZ1bmN0aW9uKGUpe3JldHVybiBlP3ZvaWQgZigpOnZvaWQgaSgpfTt2YXIgTD0obmV3IERhdGUpLmdldFRpbWUoKSxUPTAsUj0wO2UuZXhwb3J0cz17Tm90aWZpZXI6cyxzZXR1cEpTT046bix0b3BMZXZlbE5vdGlmaWVyOmF9fSxmdW5jdGlvbihlLHIpe1widXNlIHN0cmljdFwiO3ZhciB0PU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksbj1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLG89ZnVuY3Rpb24oZSl7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkuaXNBcnJheT9BcnJheS5pc0FycmF5KGUpOlwiW29iamVjdCBBcnJheV1cIj09PW4uY2FsbChlKX0saT1mdW5jdGlvbihlKXtpZighZXx8XCJbb2JqZWN0IE9iamVjdF1cIiE9PW4uY2FsbChlKSlyZXR1cm4hMTt2YXIgcj10LmNhbGwoZSxcImNvbnN0cnVjdG9yXCIpLG89ZS5jb25zdHJ1Y3RvciYmZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUmJnQuY2FsbChlLmNvbnN0cnVjdG9yLnByb3RvdHlwZSxcImlzUHJvdG90eXBlT2ZcIik7aWYoZS5jb25zdHJ1Y3RvciYmIXImJiFvKXJldHVybiExO3ZhciBpO2ZvcihpIGluIGUpO3JldHVyblwidW5kZWZpbmVkXCI9PXR5cGVvZiBpfHx0LmNhbGwoZSxpKX07ZS5leHBvcnRzPWZ1bmN0aW9uIGEoKXt2YXIgZSxyLHQsbixzLHUsYz1hcmd1bWVudHNbMF0sbD0xLHA9YXJndW1lbnRzLmxlbmd0aCxmPSExO2ZvcihcImJvb2xlYW5cIj09dHlwZW9mIGM/KGY9YyxjPWFyZ3VtZW50c1sxXXx8e30sbD0yKTooXCJvYmplY3RcIiE9dHlwZW9mIGMmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGN8fG51bGw9PWMpJiYoYz17fSk7bDxwOysrbClpZihlPWFyZ3VtZW50c1tsXSxudWxsIT1lKWZvcihyIGluIGUpdD1jW3JdLG49ZVtyXSxjIT09biYmKGYmJm4mJihpKG4pfHwocz1vKG4pKSk/KHM/KHM9ITEsdT10JiZvKHQpP3Q6W10pOnU9dCYmaSh0KT90Ont9LGNbcl09YShmLHUsbikpOlwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiYoY1tyXT1uKSk7cmV0dXJuIGN9fSxmdW5jdGlvbihlLHIsdCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbigpe3JldHVybiBsfWZ1bmN0aW9uIG8oKXtyZXR1cm4gbnVsbH1mdW5jdGlvbiBpKGUpe3ZhciByPXt9O3JldHVybiByLl9zdGFja0ZyYW1lPWUsci51cmw9ZS5maWxlTmFtZSxyLmxpbmU9ZS5saW5lTnVtYmVyLHIuZnVuYz1lLmZ1bmN0aW9uTmFtZSxyLmNvbHVtbj1lLmNvbHVtbk51bWJlcixyLmFyZ3M9ZS5hcmdzLHIuY29udGV4dD1vKHIudXJsLHIubGluZSkscn1mdW5jdGlvbiBhKGUpe2Z1bmN0aW9uIHIoKXt2YXIgcj1bXTt0cnl7cj1jLnBhcnNlKGUpfWNhdGNoKHQpe3I9W119Zm9yKHZhciBuPVtdLG89MDtvPHIubGVuZ3RoO28rKyluLnB1c2gobmV3IGkocltvXSkpO3JldHVybiBufXJldHVybntzdGFjazpyKCksbWVzc2FnZTplLm1lc3NhZ2UsbmFtZTplLm5hbWV9fWZ1bmN0aW9uIHMoZSl7cmV0dXJuIG5ldyBhKGUpfWZ1bmN0aW9uIHUoZSl7aWYoIWUpcmV0dXJuW1wiVW5rbm93biBlcnJvci4gVGhlcmUgd2FzIG5vIGVycm9yIG1lc3NhZ2UgdG8gZGlzcGxheS5cIixcIlwiXTt2YXIgcj1lLm1hdGNoKHApLHQ9XCIodW5rbm93bilcIjtyZXR1cm4gciYmKHQ9cltyLmxlbmd0aC0xXSxlPWUucmVwbGFjZSgocltyLmxlbmd0aC0yXXx8XCJcIikrdCtcIjpcIixcIlwiKSxlPWUucmVwbGFjZSgvKF5bXFxzXSt8W1xcc10rJCkvZyxcIlwiKSksW3QsZV19dmFyIGM9dCg2KSxsPVwiP1wiLHA9bmV3IFJlZ0V4cChcIl4oKFthLXpBLVowLTktXyQgXSopOiAqKT8oVW5jYXVnaHQgKT8oW2EtekEtWjAtOS1fJCBdKik6IFwiKTtlLmV4cG9ydHM9e2d1ZXNzRnVuY3Rpb25OYW1lOm4sZ3Vlc3NFcnJvckNsYXNzOnUsZ2F0aGVyQ29udGV4dDpvLHBhcnNlOnMsU3RhY2s6YSxGcmFtZTppfX0sZnVuY3Rpb24oZSxyLHQpe3ZhciBuLG8saTshZnVuY3Rpb24oYSxzKXtcInVzZSBzdHJpY3RcIjtvPVt0KDcpXSxuPXMsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gcihlLHIsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkucHJvdG90eXBlLm1hcClyZXR1cm4gZS5tYXAocix0KTtmb3IodmFyIG49bmV3IEFycmF5KGUubGVuZ3RoKSxvPTA7bzxlLmxlbmd0aDtvKyspbltvXT1yLmNhbGwodCxlW29dKTtyZXR1cm4gbn1mdW5jdGlvbiB0KGUscix0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5wcm90b3R5cGUuZmlsdGVyKXJldHVybiBlLmZpbHRlcihyLHQpO2Zvcih2YXIgbj1bXSxvPTA7bzxlLmxlbmd0aDtvKyspci5jYWxsKHQsZVtvXSkmJm4ucHVzaChlW29dKTtyZXR1cm4gbn12YXIgbj0vKF58QClcXFMrXFw6XFxkKy8sbz0vXlxccyphdCAuKihcXFMrXFw6XFxkK3xcXChuYXRpdmVcXCkpL20saT0vXihldmFsQCk/KFxcW25hdGl2ZSBjb2RlXFxdKT8kLztyZXR1cm57cGFyc2U6ZnVuY3Rpb24oZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUuc3RhY2t0cmFjZXx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGVbXCJvcGVyYSNzb3VyY2Vsb2NcIl0pcmV0dXJuIHRoaXMucGFyc2VPcGVyYShlKTtpZihlLnN0YWNrJiZlLnN0YWNrLm1hdGNoKG8pKXJldHVybiB0aGlzLnBhcnNlVjhPcklFKGUpO2lmKGUuc3RhY2spcmV0dXJuIHRoaXMucGFyc2VGRk9yU2FmYXJpKGUpO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBwYXJzZSBnaXZlbiBFcnJvciBvYmplY3RcIil9LGV4dHJhY3RMb2NhdGlvbjpmdW5jdGlvbihlKXtpZihlLmluZGV4T2YoXCI6XCIpPT09LTEpcmV0dXJuW2VdO3ZhciByPWUucmVwbGFjZSgvW1xcKFxcKVxcc10vZyxcIlwiKS5zcGxpdChcIjpcIiksdD1yLnBvcCgpLG49cltyLmxlbmd0aC0xXTtpZighaXNOYU4ocGFyc2VGbG9hdChuKSkmJmlzRmluaXRlKG4pKXt2YXIgbz1yLnBvcCgpO3JldHVybltyLmpvaW4oXCI6XCIpLG8sdF19cmV0dXJuW3Iuam9pbihcIjpcIiksdCx2b2lkIDBdfSxwYXJzZVY4T3JJRTpmdW5jdGlvbihuKXt2YXIgaT10KG4uc3RhY2suc3BsaXQoXCJcXG5cIiksZnVuY3Rpb24oZSl7cmV0dXJuISFlLm1hdGNoKG8pfSx0aGlzKTtyZXR1cm4gcihpLGZ1bmN0aW9uKHIpe3IuaW5kZXhPZihcIihldmFsIFwiKT4tMSYmKHI9ci5yZXBsYWNlKC9ldmFsIGNvZGUvZyxcImV2YWxcIikucmVwbGFjZSgvKFxcKGV2YWwgYXQgW15cXCgpXSopfChcXClcXCwuKiQpL2csXCJcIikpO3ZhciB0PXIucmVwbGFjZSgvXlxccysvLFwiXCIpLnJlcGxhY2UoL1xcKGV2YWwgY29kZS9nLFwiKFwiKS5zcGxpdCgvXFxzKy8pLnNsaWNlKDEpLG49dGhpcy5leHRyYWN0TG9jYXRpb24odC5wb3AoKSksbz10LmpvaW4oXCIgXCIpfHx2b2lkIDAsaT1cImV2YWxcIj09PW5bMF0/dm9pZCAwOm5bMF07cmV0dXJuIG5ldyBlKG8sKHZvaWQgMCksaSxuWzFdLG5bMl0scil9LHRoaXMpfSxwYXJzZUZGT3JTYWZhcmk6ZnVuY3Rpb24obil7dmFyIG89dChuLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiFlLm1hdGNoKGkpfSx0aGlzKTtyZXR1cm4gcihvLGZ1bmN0aW9uKHIpe2lmKHIuaW5kZXhPZihcIiA+IGV2YWxcIik+LTEmJihyPXIucmVwbGFjZSgvIGxpbmUgKFxcZCspKD86ID4gZXZhbCBsaW5lIFxcZCspKiA+IGV2YWxcXDpcXGQrXFw6XFxkKy9nLFwiOiQxXCIpKSxyLmluZGV4T2YoXCJAXCIpPT09LTEmJnIuaW5kZXhPZihcIjpcIik9PT0tMSlyZXR1cm4gbmV3IGUocik7dmFyIHQ9ci5zcGxpdChcIkBcIiksbj10aGlzLmV4dHJhY3RMb2NhdGlvbih0LnBvcCgpKSxvPXQuc2hpZnQoKXx8dm9pZCAwO3JldHVybiBuZXcgZShvLCh2b2lkIDApLG5bMF0sblsxXSxuWzJdLHIpfSx0aGlzKX0scGFyc2VPcGVyYTpmdW5jdGlvbihlKXtyZXR1cm4hZS5zdGFja3RyYWNlfHxlLm1lc3NhZ2UuaW5kZXhPZihcIlxcblwiKT4tMSYmZS5tZXNzYWdlLnNwbGl0KFwiXFxuXCIpLmxlbmd0aD5lLnN0YWNrdHJhY2Uuc3BsaXQoXCJcXG5cIikubGVuZ3RoP3RoaXMucGFyc2VPcGVyYTkoZSk6ZS5zdGFjaz90aGlzLnBhcnNlT3BlcmExMShlKTp0aGlzLnBhcnNlT3BlcmExMChlKX0scGFyc2VPcGVyYTk6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspL2ksbj1yLm1lc3NhZ2Uuc3BsaXQoXCJcXG5cIiksbz1bXSxpPTIsYT1uLmxlbmd0aDtpPGE7aSs9Mil7dmFyIHM9dC5leGVjKG5baV0pO3MmJm8ucHVzaChuZXcgZSgodm9pZCAwKSwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTA6ZnVuY3Rpb24ocil7Zm9yKHZhciB0PS9MaW5lIChcXGQrKS4qc2NyaXB0ICg/OmluICk/KFxcUyspKD86OiBJbiBmdW5jdGlvbiAoXFxTKykpPyQvaSxuPXIuc3RhY2t0cmFjZS5zcGxpdChcIlxcblwiKSxvPVtdLGk9MCxhPW4ubGVuZ3RoO2k8YTtpKz0yKXt2YXIgcz10LmV4ZWMobltpXSk7cyYmby5wdXNoKG5ldyBlKHNbM118fHZvaWQgMCwodm9pZCAwKSxzWzJdLHNbMV0sKHZvaWQgMCksbltpXSkpfXJldHVybiBvfSxwYXJzZU9wZXJhMTE6ZnVuY3Rpb24obyl7dmFyIGk9dChvLnN0YWNrLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGUpe3JldHVybiEhZS5tYXRjaChuKSYmIWUubWF0Y2goL15FcnJvciBjcmVhdGVkIGF0Lyl9LHRoaXMpO3JldHVybiByKGksZnVuY3Rpb24ocil7dmFyIHQsbj1yLnNwbGl0KFwiQFwiKSxvPXRoaXMuZXh0cmFjdExvY2F0aW9uKG4ucG9wKCkpLGk9bi5zaGlmdCgpfHxcIlwiLGE9aS5yZXBsYWNlKC88YW5vbnltb3VzIGZ1bmN0aW9uKDogKFxcdyspKT8+LyxcIiQyXCIpLnJlcGxhY2UoL1xcKFteXFwpXSpcXCkvZyxcIlwiKXx8dm9pZCAwO2kubWF0Y2goL1xcKChbXlxcKV0qKVxcKS8pJiYodD1pLnJlcGxhY2UoL15bXlxcKF0rXFwoKFteXFwpXSopXFwpJC8sXCIkMVwiKSk7dmFyIHM9dm9pZCAwPT09dHx8XCJbYXJndW1lbnRzIG5vdCBhdmFpbGFibGVdXCI9PT10P3ZvaWQgMDp0LnNwbGl0KFwiLFwiKTtyZXR1cm4gbmV3IGUoYSxzLG9bMF0sb1sxXSxvWzJdLHIpfSx0aGlzKX19fSl9LGZ1bmN0aW9uKGUscix0KXt2YXIgbixvLGk7IWZ1bmN0aW9uKHQsYSl7XCJ1c2Ugc3RyaWN0XCI7bz1bXSxuPWEsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24uYXBwbHkocixvKTpuLCEodm9pZCAwIT09aSYmKGUuZXhwb3J0cz1pKSl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBlKGUpe3JldHVybiFpc05hTihwYXJzZUZsb2F0KGUpKSYmaXNGaW5pdGUoZSl9ZnVuY3Rpb24gcihlLHIsdCxuLG8saSl7dm9pZCAwIT09ZSYmdGhpcy5zZXRGdW5jdGlvbk5hbWUoZSksdm9pZCAwIT09ciYmdGhpcy5zZXRBcmdzKHIpLHZvaWQgMCE9PXQmJnRoaXMuc2V0RmlsZU5hbWUodCksdm9pZCAwIT09biYmdGhpcy5zZXRMaW5lTnVtYmVyKG4pLHZvaWQgMCE9PW8mJnRoaXMuc2V0Q29sdW1uTnVtYmVyKG8pLHZvaWQgMCE9PWkmJnRoaXMuc2V0U291cmNlKGkpfXJldHVybiByLnByb3RvdHlwZT17Z2V0RnVuY3Rpb25OYW1lOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZnVuY3Rpb25OYW1lfSxzZXRGdW5jdGlvbk5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5mdW5jdGlvbk5hbWU9U3RyaW5nKGUpfSxnZXRBcmdzOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXJnc30sc2V0QXJnczpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFyZ3MgbXVzdCBiZSBhbiBBcnJheVwiKTt0aGlzLmFyZ3M9ZX0sZ2V0RmlsZU5hbWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5maWxlTmFtZX0sc2V0RmlsZU5hbWU6ZnVuY3Rpb24oZSl7dGhpcy5maWxlTmFtZT1TdHJpbmcoZSl9LGdldExpbmVOdW1iZXI6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5saW5lTnVtYmVyfSxzZXRMaW5lTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJMaW5lIE51bWJlciBtdXN0IGJlIGEgTnVtYmVyXCIpO3RoaXMubGluZU51bWJlcj1OdW1iZXIocil9LGdldENvbHVtbk51bWJlcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNvbHVtbk51bWJlcn0sc2V0Q29sdW1uTnVtYmVyOmZ1bmN0aW9uKHIpe2lmKCFlKHIpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDb2x1bW4gTnVtYmVyIG11c3QgYmUgYSBOdW1iZXJcIik7dGhpcy5jb2x1bW5OdW1iZXI9TnVtYmVyKHIpfSxnZXRTb3VyY2U6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb3VyY2V9LHNldFNvdXJjZTpmdW5jdGlvbihlKXt0aGlzLnNvdXJjZT1TdHJpbmcoZSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIHI9dGhpcy5nZXRGdW5jdGlvbk5hbWUoKXx8XCJ7YW5vbnltb3VzfVwiLHQ9XCIoXCIrKHRoaXMuZ2V0QXJncygpfHxbXSkuam9pbihcIixcIikrXCIpXCIsbj10aGlzLmdldEZpbGVOYW1lKCk/XCJAXCIrdGhpcy5nZXRGaWxlTmFtZSgpOlwiXCIsbz1lKHRoaXMuZ2V0TGluZU51bWJlcigpKT9cIjpcIit0aGlzLmdldExpbmVOdW1iZXIoKTpcIlwiLGk9ZSh0aGlzLmdldENvbHVtbk51bWJlcigpKT9cIjpcIit0aGlzLmdldENvbHVtbk51bWJlcigpOlwiXCI7cmV0dXJuIHIrdCtuK28raX19LHJ9KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7cmV0dXJue30udG9TdHJpbmcuY2FsbChlKS5tYXRjaCgvXFxzKFthLXpBLVpdKykvKVsxXS50b0xvd2VyQ2FzZSgpfWZ1bmN0aW9uIG8oZSxyKXtyZXR1cm4gbihlKT09PXJ9ZnVuY3Rpb24gaShlKXtpZighbyhlLFwic3RyaW5nXCIpKXRocm93IG5ldyBFcnJvcihcInJlY2VpdmVkIGludmFsaWQgaW5wdXRcIik7Zm9yKHZhciByPWwsdD1yLnBhcnNlcltyLnN0cmljdE1vZGU/XCJzdHJpY3RcIjpcImxvb3NlXCJdLmV4ZWMoZSksbj17fSxpPTE0O2ktLTspbltyLmtleVtpXV09dFtpXXx8XCJcIjtyZXR1cm4gbltyLnEubmFtZV09e30sbltyLmtleVsxMl1dLnJlcGxhY2Uoci5xLnBhcnNlcixmdW5jdGlvbihlLHQsbyl7dCYmKG5bci5xLm5hbWVdW3RdPW8pfSksbn1mdW5jdGlvbiBhKGUpe3ZhciByPWkoZSk7cmV0dXJuXCJcIj09PXIuYW5jaG9yJiYoci5zb3VyY2U9ci5zb3VyY2UucmVwbGFjZShcIiNcIixcIlwiKSksZT1yLnNvdXJjZS5yZXBsYWNlKFwiP1wiK3IucXVlcnksXCJcIil9ZnVuY3Rpb24gcyhlLHIpe3ZhciB0LG4saSxhPW8oZSxcIm9iamVjdFwiKSx1PW8oZSxcImFycmF5XCIpLGM9W107aWYoYSlmb3IodCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJmMucHVzaCh0KTtlbHNlIGlmKHUpZm9yKGk9MDtpPGUubGVuZ3RoOysraSljLnB1c2goaSk7Zm9yKGk9MDtpPGMubGVuZ3RoOysraSl0PWNbaV0sbj1lW3RdLGE9byhuLFwib2JqZWN0XCIpLHU9byhuLFwiYXJyYXlcIiksYXx8dT9lW3RdPXMobixyKTplW3RdPXIodCxuKTtyZXR1cm4gZX1mdW5jdGlvbiB1KGUpe3JldHVybiBlPVN0cmluZyhlKSxuZXcgQXJyYXkoZS5sZW5ndGgrMSkuam9pbihcIipcIil9ZnVuY3Rpb24gYygpe3ZhciBlPShuZXcgRGF0ZSkuZ2V0VGltZSgpLHI9XCJ4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHhcIi5yZXBsYWNlKC9beHldL2csZnVuY3Rpb24ocil7dmFyIHQ9KGUrMTYqTWF0aC5yYW5kb20oKSklMTZ8MDtyZXR1cm4gZT1NYXRoLmZsb29yKGUvMTYpLChcInhcIj09PXI/dDo3JnR8OCkudG9TdHJpbmcoMTYpfSk7cmV0dXJuIHJ9dCg5KTt2YXIgbD17c3RyaWN0TW9kZTohMSxrZXk6W1wic291cmNlXCIsXCJwcm90b2NvbFwiLFwiYXV0aG9yaXR5XCIsXCJ1c2VySW5mb1wiLFwidXNlclwiLFwicGFzc3dvcmRcIixcImhvc3RcIixcInBvcnRcIixcInJlbGF0aXZlXCIsXCJwYXRoXCIsXCJkaXJlY3RvcnlcIixcImZpbGVcIixcInF1ZXJ5XCIsXCJhbmNob3JcIl0scTp7bmFtZTpcInF1ZXJ5S2V5XCIscGFyc2VyOi8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZ30scGFyc2VyOntzdHJpY3Q6L14oPzooW146XFwvPyNdKyk6KT8oPzpcXC9cXC8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykpPygoKCg/OltePyNcXC9dKlxcLykqKShbXj8jXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLyxsb29zZTovXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS99fSxwPXtpc1R5cGU6byxwYXJzZVVyaTppLHBhcnNlVXJpT3B0aW9uczpsLHJlZGFjdDp1LHNhbml0aXplVXJsOmEsdHJhdmVyc2U6cyx0eXBlTmFtZTpuLHV1aWQ0OmN9O2UuZXhwb3J0cz1wfSxmdW5jdGlvbihlLHIpeyFmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtlLmNvbnNvbGU9ZS5jb25zb2xlfHx7fTtmb3IodmFyIHIsdCxuPWUuY29uc29sZSxvPXt9LGk9ZnVuY3Rpb24oKXt9LGE9XCJtZW1vcnlcIi5zcGxpdChcIixcIikscz1cImFzc2VydCxjbGVhcixjb3VudCxkZWJ1ZyxkaXIsZGlyeG1sLGVycm9yLGV4Y2VwdGlvbixncm91cCxncm91cENvbGxhcHNlZCxncm91cEVuZCxpbmZvLGxvZyxtYXJrVGltZWxpbmUscHJvZmlsZSxwcm9maWxlcyxwcm9maWxlRW5kLHNob3csdGFibGUsdGltZSx0aW1lRW5kLHRpbWVsaW5lLHRpbWVsaW5lRW5kLHRpbWVTdGFtcCx0cmFjZSx3YXJuXCIuc3BsaXQoXCIsXCIpO3I9YS5wb3AoKTspbltyXXx8KG5bcl09byk7Zm9yKDt0PXMucG9wKCk7KW5bdF18fChuW3RdPWkpfShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3RoaXM6d2luZG93KX0sZnVuY3Rpb24oZSxyLHQpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIG4oZSl7YT1lfWZ1bmN0aW9uIG8oZSl7dGhpcy5uYW1lPVwiQ29ubmVjdGlvbiBFcnJvclwiLHRoaXMubWVzc2FnZT1lLHRoaXMuc3RhY2s9KG5ldyBFcnJvcikuc3RhY2t9dmFyIGk9dCg4KSxhPW51bGw7by5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmNvbnN0cnVjdG9yPW87dmFyIHM9e1hNTEh0dHBGYWN0b3JpZXM6W2Z1bmN0aW9uKCl7cmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdH0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDIuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNc3htbDMuWE1MSFRUUFwiKX0sZnVuY3Rpb24oKXtyZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKX1dLGNyZWF0ZVhNTEhUVFBPYmplY3Q6ZnVuY3Rpb24oKXt2YXIgZSxyPSExLHQ9cy5YTUxIdHRwRmFjdG9yaWVzLG49dC5sZW5ndGg7Zm9yKGU9MDtlPG47ZSsrKXRyeXtyPXRbZV0oKTticmVha31jYXRjaChvKXt9cmV0dXJuIHJ9LHBvc3Q6ZnVuY3Rpb24oZSxyLHQsbil7aWYoIWkuaXNUeXBlKHQsXCJvYmplY3RcIikpdGhyb3cgbmV3IEVycm9yKFwiRXhwZWN0ZWQgYW4gb2JqZWN0IHRvIFBPU1RcIik7dD1hLnN0cmluZ2lmeSh0KSxuPW58fGZ1bmN0aW9uKCl7fTt2YXIgdT1zLmNyZWF0ZVhNTEhUVFBPYmplY3QoKTtpZih1KXRyeXt0cnl7dmFyIGM9ZnVuY3Rpb24oKXt0cnl7aWYoYyYmND09PXUucmVhZHlTdGF0ZSl7Yz12b2lkIDA7dmFyIGU9YS5wYXJzZSh1LnJlc3BvbnNlVGV4dCk7MjAwPT09dS5zdGF0dXM/bihudWxsLGUpOmkuaXNUeXBlKHUuc3RhdHVzLFwibnVtYmVyXCIpJiZ1LnN0YXR1cz49NDAwJiZ1LnN0YXR1czw2MDA/KDQwMz09dS5zdGF0dXMmJmNvbnNvbGUuZXJyb3IoXCJbUm9sbGJhcl06XCIrZS5tZXNzYWdlKSxuKG5ldyBFcnJvcihTdHJpbmcodS5zdGF0dXMpKSkpOm4obmV3IG8oXCJYSFIgcmVzcG9uc2UgaGFkIG5vIHN0YXR1cyBjb2RlIChsaWtlbHkgY29ubmVjdGlvbiBmYWlsdXJlKVwiKSl9fWNhdGNoKHIpe3ZhciB0O3Q9ciYmci5zdGFjaz9yOm5ldyBFcnJvcihyKSxuKHQpfX07dS5vcGVuKFwiUE9TVFwiLGUsITApLHUuc2V0UmVxdWVzdEhlYWRlciYmKHUuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLFwiYXBwbGljYXRpb24vanNvblwiKSx1LnNldFJlcXVlc3RIZWFkZXIoXCJYLVJvbGxiYXItQWNjZXNzLVRva2VuXCIscikpLHUub25yZWFkeXN0YXRlY2hhbmdlPWMsdS5zZW5kKHQpfWNhdGNoKGwpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBYRG9tYWluUmVxdWVzdCl7XCJodHRwOlwiPT09d2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKDAsNSkmJlwiaHR0cHNcIj09PWUuc3Vic3RyaW5nKDAsNSkmJihlPVwiaHR0cFwiK2Uuc3Vic3RyaW5nKDUpKTt2YXIgcD1mdW5jdGlvbigpe24obmV3IG8oXCJSZXF1ZXN0IHRpbWVkIG91dFwiKSl9LGY9ZnVuY3Rpb24oKXtuKG5ldyBFcnJvcihcIkVycm9yIGR1cmluZyByZXF1ZXN0XCIpKX0sZD1mdW5jdGlvbigpe24obnVsbCxhLnBhcnNlKHUucmVzcG9uc2VUZXh0KSl9O3U9bmV3IFhEb21haW5SZXF1ZXN0LHUub25wcm9ncmVzcz1mdW5jdGlvbigpe30sdS5vbnRpbWVvdXQ9cCx1Lm9uZXJyb3I9Zix1Lm9ubG9hZD1kLHUub3BlbihcIlBPU1RcIixlLCEwKSx1LnNlbmQodCl9fX1jYXRjaChoKXtuKGgpfX19O2UuZXhwb3J0cz17WEhSOnMsc2V0dXBKU09OOm4sQ29ubmVjdGlvbkVycm9yOm99fV0pfSk7IiwidmFyIFZpc2lvblNpbXVsYXRpb24gPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvblwiKTtcbnZhciB3b3JsZGRhdGEgPSByZXF1aXJlKFwiZG90YS12aXNpb24tc2ltdWxhdGlvbi9zcmMvd29ybGRkYXRhLmpzb25cIik7XG52YXIgZ2V0TGlnaHRVbmlvbiA9IHJlcXVpcmUoXCIuL2dldExpZ2h0VW5pb25cIik7XG52YXIgUXVlcnlTdHJpbmcgPSByZXF1aXJlKCcuL3V0aWwvcXVlcnlTdHJpbmcnKTtcbnZhciBSb2xsYmFyID0gcmVxdWlyZShcInJvbGxiYXItYnJvd3NlclwiKTtcbnZhciB0cmltID0gcmVxdWlyZSgnLi91dGlsL3RyaW0nKTtcbnZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vdXRpbC9kZWJvdW5jZScpO1xudmFyIGdldEpTT04gPSByZXF1aXJlKCcuL3V0aWwvZ2V0SlNPTicpO1xuXG4vLyBlcnJvciByZXBvcnRpbmdcbnZhciByb2xsYmFyQ29uZmlnID0ge1xuICAgIGFjY2Vzc1Rva2VuOiAnZmU3Y2YzMjdmMmIyNGJiODk5MWUyNTIyMzlmNjIwMGYnLFxuICAgIGNhcHR1cmVVbmNhdWdodDogdHJ1ZSxcbiAgICBpZ25vcmVkTWVzc2FnZXM6IFtcbiAgICAgICAgXCJFcnJvcjogIERPTSBFeGNlcHRpb24gMThcIixcbiAgICAgICAgXCJTZWN1cml0eUVycm9yOiBET00gRXhjZXB0aW9uIDE4OiBBbiBhdHRlbXB0IHdhcyBtYWRlIHRvIGJyZWFrIHRocm91Z2ggdGhlIHNlY3VyaXR5IHBvbGljeSBvZiB0aGUgdXNlciBhZ2VudC5cIixcbiAgICAgICAgXCJTZWN1cml0eUVycm9yOiAgQW4gYXR0ZW1wdCB3YXMgbWFkZSB0byBicmVhayB0aHJvdWdoIHRoZSBzZWN1cml0eSBwb2xpY3kgb2YgdGhlIHVzZXIgYWdlbnQuXCIsXG4gICAgICAgIFwiU2NyaXB0IGVycm9yLlwiXG4gICAgXSxcbiAgICBwYXlsb2FkOiB7XG4gICAgICAgIGVudmlyb25tZW50OiAnZGV2ZWxvcG1lbnQnLFxuICAgICAgICBjbGllbnQ6IHtcbiAgICAgICAgICAgIGphdmFzY3JpcHQ6IHtcbiAgICAgICAgICAgICAgICBzb3VyY2VfbWFwX2VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgY29kZV92ZXJzaW9uOiBcImIwN2NlOTdjMjE5YTNmNjllYmQ3MzhmYmM1NjBiZjVjZjhhYzk1ZDNcIixcbiAgICAgICAgICAgICAgICAvLyBPcHRpb25hbGx5IGhhdmUgUm9sbGJhciBndWVzcyB3aGljaCBmcmFtZXMgdGhlIGVycm9yIHdhcyB0aHJvd24gZnJvbVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIGJyb3dzZXIgZG9lcyBub3QgcHJvdmlkZSBsaW5lIGFuZCBjb2x1bW4gbnVtYmVycy5cbiAgICAgICAgICAgICAgICBndWVzc191bmNhdWdodF9mcmFtZXM6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vdmFyIHJvbGxiYXIgPSBSb2xsYmFyLmluaXQocm9sbGJhckNvbmZpZyk7XG4gICAgXG5mdW5jdGlvbiBBcHAobWFwX3RpbGVfcGF0aCwgdmlzaW9uX2RhdGFfaW1hZ2VfcGF0aCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgSU1HX0RJUiA9IFwiaW1nL1wiLFxuICAgICAgICBFTlRJVElFUyA9IHtcbiAgICAgICAgICAgIG9ic2VydmVyOiB7XG4gICAgICAgICAgICAgICAgaWNvbl9wYXRoOiBJTUdfRElSICsgXCJ3YXJkX29ic2VydmVyLnBuZ1wiLFxuICAgICAgICAgICAgICAgIHJhZGl1czogMTYwMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbnRyeToge1xuICAgICAgICAgICAgICAgIGljb25fcGF0aDogSU1HX0RJUiArIFwid2FyZF9zZW50cnkucG5nXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiA4NTBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgREFSS05FU1NfVklTSU9OX1JBRElVUyA9IDY3NSxcbiAgICAgICAgVE9XRVJfREFZX1ZJU0lPTl9SQURJVVMgPSAxOTAwLFxuICAgICAgICBUT1dFUl9OSUdIVF9WSVNJT05fUkFESVVTID0gODAwLFxuICAgICAgICBUT1dFUl90cnVlU2lnaHQgPSA3MDAsXG4gICAgICAgIFRPV0VSX0FUVEFDS19SQU5HRV9SQURJVVMgPSA3MDAsXG4gICAgICAgIG1hcF9kYXRhX3BhdGggPSBcImRhdGEvXCIsXG4gICAgICAgIG1hcF9kYXRhLFxuICAgICAgICBtYXBDb25zdGFudHMgPSByZXF1aXJlKCcuL21hcENvbnN0YW50cycpLFxuICAgICAgICBjb252ZXJzaW9uRnVuY3Rpb25zID0gcmVxdWlyZSgnLi9jb252ZXJzaW9uRnVuY3Rpb25zJyksXG4gICAgICAgIG1hcEJvdW5kcyA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcygwLCAwLCBtYXBDb25zdGFudHMubWFwX3csIG1hcENvbnN0YW50cy5tYXBfaCksXG4gICAgICAgIG1hcCA9IG5ldyBPcGVuTGF5ZXJzLk1hcChcIm1hcDFcIiwge1xuICAgICAgICAgICAgdGhlbWU6IG51bGwsXG4gICAgICAgICAgICBtYXhFeHRlbnQ6IG1hcEJvdW5kcyxcbiAgICAgICAgICAgIG51bVpvb21MZXZlbHM6IDUsXG4gICAgICAgICAgICBtYXhSZXNvbHV0aW9uOiBNYXRoLnBvdygyLCA1LTEgKSxcbiAgICAgICAgICAgIHVuaXRzOiBcIm1cIixcbiAgICAgICAgICAgIHRpbGVNYW5hZ2VyOiB7XG4gICAgICAgICAgICAgICAgY2FjaGVTaXplOiA1NDU2LFxuICAgICAgICAgICAgICAgIG1vdmVEZWxheTogMCxcbiAgICAgICAgICAgICAgICB6b29tRGVsYXk6IDAsXG4gICAgICAgICAgICAgICAgZnJhbWVEZWxheTogMCxcbiAgICAgICAgICAgICAgICB0aWxlc1BlckZyYW1lOiAxMjhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGxheWVyS2V5cyA9IFtcbiAgICAgICAgICAgIFwibm9fd2FyZHNcIixcbiAgICAgICAgICAgIFwiZW50X2Zvd19ibG9ja2VyX25vZGVcIixcbiAgICAgICAgICAgIFwidHJpZ2dlcl9tdWx0aXBsZVwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9uZXV0cmFsX3NwYXduZXJcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9yb3NoYW5fc3Bhd25lclwiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXBcIixcbiAgICAgICAgICAgIFwiZG90YV9pdGVtX3J1bmVfc3Bhd25lcl9ib3VudHlcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfZm91bnRhaW5cIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfc2hvcFwiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9iYXJyYWNrc1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9maWxsZXJcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfaGVhbGVyXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX2ZvcnRcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfdG93ZXJcIlxuICAgICAgICBdLFxuICAgICAgICBsYXllck5hbWVzID0ge1xuICAgICAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgICAgICBkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXA6IFwiUnVuZXNcIixcbiAgICAgICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5OiBcIkJvdW50eSBSdW5lc1wiLFxuICAgICAgICAgICAgZW50X2RvdGFfdHJlZTogXCJUcmVlc1wiLFxuICAgICAgICAgICAgbnBjX2RvdGFfaGVhbGVyOiBcIlNocmluZXNcIixcbiAgICAgICAgICAgIGVudF9kb3RhX2ZvdW50YWluOiBcIkZvdW50YWluXCIsXG4gICAgICAgICAgICBucGNfZG90YV9mb3J0OiBcIkFuY2llbnRzXCIsXG4gICAgICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BzXCIsXG4gICAgICAgICAgICBucGNfZG90YV90b3dlcjogXCJUb3dlcnNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX2JhcnJhY2tzOiBcIkJhcnJhY2tzXCIsXG4gICAgICAgICAgICBucGNfZG90YV9maWxsZXI6IFwiQnVpbGRpbmdzXCIsXG4gICAgICAgICAgICB0cmlnZ2VyX211bHRpcGxlOiBcIk5ldXRyYWwgQ2FtcHMgU3Bhd24gQm94ZXNcIixcbiAgICAgICAgICAgIG5wY19kb3RhX25ldXRyYWxfc3Bhd25lcjogXCJOZXV0cmFsIENhbXBzXCIsXG4gICAgICAgICAgICBub193YXJkczogXCJJbnZhbGlkIFdhcmQgTG9jYXRpb25zXCIsXG4gICAgICAgICAgICBlbnRfZm93X2Jsb2NrZXJfbm9kZTogXCJWaXNpb24gQmxvY2tlclwiXG4gICAgICAgIH0sXG4gICAgICAgIGJhc2VMYXllcnNPcHRpb25zID0ge1xuICAgICAgICAgICAgdHlwZTogXCJqcGdcIlxuICAgICAgICB9LFxuICAgICAgICBiYXNlTGF5ZXJzQ29uZmlnID0gW1xuICAgICAgICAgICAgWyc3LjAwIERlZmF1bHQnLCAnNzAwJywgJ2RlZmF1bHQnXSxcbiAgICAgICAgICAgIFsnNy4wMCBOZXcgSm91cm5leScsICc3MDAnLCAnam91cm5leSddLFxuICAgICAgICAgICAgWyc2Ljg3JywgJzY4NycsICdkZWZhdWx0J10sXG4gICAgICAgICAgICBbJzYuODcgRGVzZXJ0JywgJzY4NycsICdkZXNlcnQnXSxcbiAgICAgICAgICAgIFsnNi44NyBJbW1vcnRhbCBHYXJkZW5zJywgJzY4NycsICdpbW1vcnRhbGdhcmRlbnMnXVxuICAgICAgICBdLFxuICAgICAgICBiYXNlTGF5ZXJzID0gYmFzZUxheWVyc0NvbmZpZy5tYXAoZnVuY3Rpb24gKGJhc2VMYXllckNvbmZpZykge1xuICAgICAgICAgICAgdmFyIGJhc2VMYXllck9wdGlvbnMgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKHtcbiAgICAgICAgICAgICAgICBnZXRVUkw6IGdldE15VVJMKGJhc2VMYXllckNvbmZpZ1sxXSwgYmFzZUxheWVyQ29uZmlnWzJdKVxuICAgICAgICAgICAgfSwgYmFzZUxheWVyc09wdGlvbnMpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBPcGVuTGF5ZXJzLkxheWVyLlRNUyhiYXNlTGF5ZXJDb25maWdbMF0sIG1hcF90aWxlX3BhdGgsIGJhc2VMYXllck9wdGlvbnMpO1xuICAgICAgICB9KSxcbiAgICAgICAgb3ZlcmxheUdyb3VwaW5nID0ge1xuICAgICAgICAgICAgXCJEYXkgVmlzaW9uIFJhbmdlXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIk5pZ2h0IFZpc2lvbiBSYW5nZVwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJUcnVlIFNpZ2h0IFJhbmdlXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIkF0dGFjayBSYW5nZVwiOiBcIlZpc2lvblwiLFxuICAgICAgICAgICAgXCJGb3VudGFpblwiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiVG93ZXJzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJTaHJpbmVzXCI6IFwiU3RydWN0dXJlc1wiLFxuICAgICAgICAgICAgXCJBbmNpZW50c1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiQmFycmFja3NcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkJ1aWxkaW5nc1wiOiBcIlN0cnVjdHVyZXNcIixcbiAgICAgICAgICAgIFwiU2hvcHNcIjogXCJTdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgICBcIkludmFsaWQgV2FyZCBMb2NhdGlvbnNcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiVmlzaW9uIEJsb2NrZXJcIjogXCJWaXNpb25cIixcbiAgICAgICAgICAgIFwiUGxhY2VkIFdhcmRzXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIldhcmQgVmlzaW9uXCI6IFwiVmlzaW9uXCIsXG4gICAgICAgICAgICBcIldhcmQgVmlzaW9uIHdpdGggRm9nXCI6IFwiVmlzaW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgaWNvbl9wYXRocyA9IHtcbiAgICAgICAgICAgIFwiZW50X2RvdGFfZm91bnRhaW5cIjogSU1HX0RJUiArIFwic3Zncy93YXRlci0xNS5zdmdcIixcbiAgICAgICAgICAgIFwiZW50X2RvdGFfdHJlZVwiOiBJTUdfRElSICsgXCJzdmdzL3BhcmstMTUuc3ZnXCIsXG4gICAgICAgICAgICBcImVudF9kb3RhX3RyZWVfY3V0XCI6IElNR19ESVIgKyBcInN0dW1wLnN2Z1wiLFxuICAgICAgICAgICAgXCJlbnRfZG90YV9zaG9wXCI6IElNR19ESVIgKyBcInN2Z3Mvc2hvcC0xNS5zdmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfbmV1dHJhbF9zcGF3bmVyXCI6IElNR19ESVIgKyBcInN2Z3MvanVuZ2xlXzEuc3ZnXCIsXG4gICAgICAgICAgICBcIm5wY19kb3RhX3Rvd2VyXCI6IElNR19ESVIgKyBcInN2Z3MvY2FzdGxlLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9oZWFsZXJcIjogSU1HX0RJUiArIFwic3Zncy9wbGFjZS1vZi13b3JzaGlwLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9mb3J0XCI6IElNR19ESVIgKyBcInN2Z3MvdG93bi1oYWxsLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9maWxsZXJcIjogSU1HX0RJUiArIFwic3Zncy9sYW5kbWFyay0xNS5zdmdcIixcbiAgICAgICAgICAgIFwibnBjX2RvdGFfYmFycmFja3NcIjogSU1HX0RJUiArIFwic3Zncy9zdGFkaXVtLTE1LnN2Z1wiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX3Bvd2VydXBcIjogSU1HX0RJUiArIFwiZG91YmxlZGFtYWdlLnBuZ1wiLFxuICAgICAgICAgICAgXCJkb3RhX2l0ZW1fcnVuZV9zcGF3bmVyX2JvdW50eVwiOiBJTUdfRElSICsgXCJib3VudHlydW5lLnBuZ1wiLFxuICAgICAgICAgICAgXCJucGNfZG90YV9yb3NoYW5fc3Bhd25lclwiOiBJTUdfRElSICsgXCJyb3NoYW4ucG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgbGF5ZXJTd2l0Y2hlciA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTGF5ZXJTd2l0Y2hlcih7XG4gICAgICAgICAgICBhc2NlbmRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgb3ZlcmxheUdyb3VwaW5nOiBvdmVybGF5R3JvdXBpbmcsXG4gICAgICAgICAgICBvbk1heGltaXplV2hlblNtYWxsU2NyZWVuOiBtaW5pbWl6ZUNvbnRyb2xMaXN0LmJpbmQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikpXG4gICAgICAgIH0pLFxuICAgICAgICBjb29yZGluYXRlQ29udHJvbCA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTW91c2VQb3NpdGlvbigpLFxuICAgICAgICBjdXJzb3JMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIkN1cnNvclwiLCB7ZGlzcGxheUluTGF5ZXJTd2l0Y2hlcjpmYWxzZX0pLFxuICAgICAgICBkYXlSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiRGF5IFZpc2lvbiBSYW5nZVwiKSxcbiAgICAgICAgbmlnaHRSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiTmlnaHQgVmlzaW9uIFJhbmdlXCIpLFxuICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiVHJ1ZSBTaWdodCBSYW5nZVwiKSxcbiAgICAgICAgYXR0YWNrUmFuZ2VMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIkF0dGFjayBSYW5nZVwiKSxcbiAgICAgICAgcG9seWdvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiRHJhd24gQ2lyY2xlc1wiKSxcbiAgICAgICAgd2FyZFZpc2lvbkxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKFwiV2FyZCBWaXNpb25cIiksXG4gICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihcIldhcmQgVmlzaW9uIHdpdGggRm9nXCIpLFxuICAgICAgICBpY29uTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5NYXJrZXJzKFwiUGxhY2VkIFdhcmRzXCIpLFxuICAgICAgICByZW5kZXJlciA9IE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJzKHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5yZW5kZXJlcixcbiAgICAgICAgZHJhd0NvbnRyb2xzLFxuICAgICAgICBsYXN0RGlzdGFuY2UsXG4gICAgICAgIHN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZUNvbnN0YW50cycpLFxuICAgICAgICB0cmVlTWFya2VycyA9IHt9LFxuICAgICAgICBWSVNJT05fU0lNVUxBVElPTiA9IHRydWUsXG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUyA9IHRydWUsXG4gICAgICAgIERBUktORVNTID0gZmFsc2UsXG4gICAgICAgIGN1dFRyZWVzID0ge307XG5cbiAgICAgICAgY29uc29sZS5sb2cobWFwLnRpbGVNYW5hZ2VyKTtcbiAgICAgICAgXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogQ09PUkRJTkFURSBDT05WRVJTSU9OIEZVTkNUSU9OUyAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgdmFyIHJldmVyc2VMZXJwID0gY29udmVyc2lvbkZ1bmN0aW9ucy5yZXZlcnNlTGVycCxcbiAgICAgICAgbGF0TG9uVG9Xb3JsZCA9IGNvbnZlcnNpb25GdW5jdGlvbnMubGF0TG9uVG9Xb3JsZCxcbiAgICAgICAgd29ybGRUb0xhdExvbiA9IGNvbnZlcnNpb25GdW5jdGlvbnMud29ybGRUb0xhdExvbixcbiAgICAgICAgZ2V0VGlsZVJhZGl1cyA9IGNvbnZlcnNpb25GdW5jdGlvbnMuZ2V0VGlsZVJhZGl1cyxcbiAgICAgICAgZ2V0U2NhbGVkUmFkaXVzID0gY29udmVyc2lvbkZ1bmN0aW9ucy5nZXRTY2FsZWRSYWRpdXMsXG4gICAgICAgIGNhbGN1bGF0ZURpc3RhbmNlID0gY29udmVyc2lvbkZ1bmN0aW9ucy5jYWxjdWxhdGVEaXN0YW5jZTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKlxuICAgICAqIENPTlRST0wgSEFORExFUlMgKlxuICAgICAqKioqKioqKioqKioqKioqKioqKi9cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVRyZWVNYXJrZXJDbGljayhldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnaGFuZGxlVHJlZU1hcmtlckNsaWNrJywgdGhpcyk7XG4gICAgICAgIHNldFRyZWVNYXJrZXJTdGF0ZSh0aGlzLCAhdGhpcy50cmVlVmlzaWJsZSk7XG4gICAgICAgIHNldFRyZWVRdWVyeVN0cmluZygpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzZXRUcmVlTWFya2VyU3RhdGUobWFya2VyLCBzdGF0ZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0VHJlZU1hcmtlclN0YXRlJywgbWFya2VyKTtcbiAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKG1hcmtlci5sb25sYXQubG9uLCBtYXJrZXIubG9ubGF0LmxhdCk7XG5cbiAgICAgICAgbWFya2VyLnRyZWVWaXNpYmxlID0gc3RhdGU7XG4gICAgICAgIG1hcmtlci5zZXRVcmwoc3RhdGUgPyBpY29uX3BhdGhzLmVudF9kb3RhX3RyZWUgOiBpY29uX3BhdGhzLmVudF9kb3RhX3RyZWVfY3V0KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgICAgICB2cy50b2dnbGVUcmVlKGdyaWRYWS54LCBncmlkWFkueSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9wdXBDb250ZW50SFRNTCA9IFwiQ2xpY2sgdG8gY3V0IGRvd24gdHJlZS48YnI+VGhpcyB3aWxsIGFmZmVjdCB0aGUgd2FyZCB2aXNpb24gc2ltdWxhdGlvbi5cIjtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICBkZWxldGUgY3V0VHJlZXNbbWFya2VyLnRyZWVfbG9jXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCA9IFwiQ2xpY2sgdG8gcmVncm93IHRyZWUuPGJyPlRoaXMgd2lsbCBhZmZlY3QgdGhlIHdhcmQgdmlzaW9uIHNpbXVsYXRpb24uXCI7XG4gICAgICAgICAgICBjdXRUcmVlc1ttYXJrZXIudHJlZV9sb2NdID0gbWFya2VyO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZmVhdHVyZS5kYXRhLnBvcHVwQ29udGVudEhUTUwgPSBwb3B1cENvbnRlbnRIVE1MO1xuICAgICAgICBpZiAobWFya2VyLmZlYXR1cmUucG9wdXApIHtcbiAgICAgICAgICAgIG1hcmtlci5mZWF0dXJlLnBvcHVwLnNldENvbnRlbnRIVE1MKHBvcHVwQ29udGVudEhUTUwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGFkZFZpc2lvbkNpcmNsZShsYXllciwgbWFya2VyLCByYWRpdXMsIHByb3BlcnR5LCBzdHlsZSkge1xuICAgICAgICB2YXIgY2VudGVyID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobWFya2VyLmxvbmxhdC5sb24sIG1hcmtlci5sb25sYXQubGF0KTtcbiAgICAgICAgdmFyIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihjZW50ZXIsIGdldFNjYWxlZFJhZGl1cyhyYWRpdXMpLCAzMCk7XG4gICAgICAgIHZhciBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlLCBudWxsLCBzdHlsZSk7XG4gICAgICAgIGxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICBpZiAobWFya2VyW3Byb3BlcnR5XSkge1xuICAgICAgICAgICAgbGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyW3Byb3BlcnR5XSk7XG4gICAgICAgICAgICBtYXJrZXJbcHJvcGVydHldLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXJbcHJvcGVydHldID0gZmVhdHVyZTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkQnVpbGRpbmdWaXNpb25GZWF0dXJlcyhtYXJrZXIsIHNraXBEYXksIHNraXBOaWdodCwgc2tpcFRydWVTaWdodCwgc2tpcEF0dGFjaykge1xuICAgICAgICB2YXIgZGF5VmlzaW9uID0gREFSS05FU1MgPyBNYXRoLm1pbihtYXJrZXIuZGF5VmlzaW9uLCBEQVJLTkVTU19WSVNJT05fUkFESVVTKSA6IG1hcmtlci5kYXlWaXNpb247XG4gICAgICAgIHZhciBuaWdodFZpc2lvbiA9IERBUktORVNTID8gTWF0aC5taW4obWFya2VyLm5pZ2h0VmlzaW9uLCBEQVJLTkVTU19WSVNJT05fUkFESVVTKSA6IG1hcmtlci5uaWdodFZpc2lvbjtcbiAgICAgICAgdmFyIHRydWVTaWdodCA9IG1hcmtlci50cnVlU2lnaHQ7XG4gICAgICAgIHZhciBhdHRhY2tSYW5nZSA9IG1hcmtlci5hdHRhY2tSYW5nZTtcbiAgICAgICAgXG4gICAgICAgIGlmICghc2tpcERheSAmJiBtYXJrZXIuZGF5VmlzaW9uKSBhZGRWaXNpb25DaXJjbGUoZGF5UmFuZ2VMYXllciwgbWFya2VyLCBkYXlWaXNpb24sICdkYXlfdmlzaW9uX2ZlYXR1cmUnLCBzdHlsZS5kYXkpO1xuICAgICAgICBpZiAoIXNraXBOaWdodCAmJiBtYXJrZXIubmlnaHRWaXNpb24pIGFkZFZpc2lvbkNpcmNsZShuaWdodFJhbmdlTGF5ZXIsIG1hcmtlciwgbmlnaHRWaXNpb24sICduaWdodF92aXNpb25fZmVhdHVyZScsIHN0eWxlLm5pZ2h0KTtcbiAgICAgICAgaWYgKCFza2lwVHJ1ZVNpZ2h0ICYmIG1hcmtlci50cnVlU2lnaHQpIGFkZFZpc2lvbkNpcmNsZSh0cnVlU2lnaHRSYW5nZUxheWVyLCBtYXJrZXIsIHRydWVTaWdodCwgJ3RydWVfc2lnaHRfZmVhdHVyZScsIHN0eWxlLnRydWVfc2lnaHQpO1xuICAgICAgICBpZiAoIXNraXBBdHRhY2sgJiYgbWFya2VyLmF0dGFja1JhbmdlKSBhZGRWaXNpb25DaXJjbGUoYXR0YWNrUmFuZ2VMYXllciwgbWFya2VyLCBhdHRhY2tSYW5nZSwgJ2F0dGFja19yYW5nZV9mZWF0dXJlJywgc3R5bGUuYXR0YWNrX3JhbmdlKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTiAmJiAhc2tpcERheSAmJiBtYXJrZXIuZGF5VmlzaW9uKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihtYXJrZXIubG9ubGF0LCBtYXJrZXIsIGRheVZpc2lvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlVG93ZXJNYXJrZXJDbGljayhlLCBza2lwUXVlcnlTdHJpbmdVcGRhdGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2hhbmRsZVRvd2VyTWFya2VyQ2xpY2snKTtcbiAgICAgICAgdmFyIG1hcmtlciA9IGUub2JqZWN0O1xuICAgICAgICBpZiAoIW1hcmtlci5zaG93SW5mbykge1xuICAgICAgICAgICAgYWRkQnVpbGRpbmdWaXNpb25GZWF0dXJlcyhtYXJrZXIpO1xuICAgICAgICAgICAgaWYgKCFza2lwUXVlcnlTdHJpbmdVcGRhdGUpIFF1ZXJ5U3RyaW5nLmFkZFF1ZXJ5U3RyaW5nVmFsdWUoXCJ0b3dlcl92aXNpb25cIiwgbWFya2VyLnRvd2VyX2xvYy54ICsgJywnICsgbWFya2VyLnRvd2VyX2xvYy55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRheVJhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLmRheV92aXNpb25fZmVhdHVyZSk7XG4gICAgICAgICAgICBuaWdodFJhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLm5pZ2h0X3Zpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgICAgIHRydWVTaWdodFJhbmdlTGF5ZXIucmVtb3ZlRmVhdHVyZXMobWFya2VyLnRydWVfc2lnaHRfZmVhdHVyZSk7XG4gICAgICAgICAgICBhdHRhY2tSYW5nZUxheWVyLnJlbW92ZUZlYXR1cmVzKG1hcmtlci5hdHRhY2tfcmFuZ2VfZmVhdHVyZSk7XG5cbiAgICAgICAgICAgIGlmIChtYXJrZXIudmlzaW9uX2ZlYXR1cmUpIHZpc2lvblNpbXVsYXRpb25MYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIudmlzaW9uX2ZlYXR1cmUpO1xuICAgICAgICAgICAgaWYgKG1hcmtlci52aXNpb25fY2VudGVyX2ZlYXR1cmUpIHZpc2lvblNpbXVsYXRpb25MYXllci5yZW1vdmVGZWF0dXJlcyhtYXJrZXIudmlzaW9uX2NlbnRlcl9mZWF0dXJlKTtcbiAgICAgIFxuICAgICAgICAgICAgaWYgKCFza2lwUXVlcnlTdHJpbmdVcGRhdGUpIFF1ZXJ5U3RyaW5nLnJlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUoXCJ0b3dlcl92aXNpb25cIiwgbWFya2VyLnRvd2VyX2xvYy54ICsgJywnICsgbWFya2VyLnRvd2VyX2xvYy55KTtcbiAgICAgICAgfVxuICAgICAgICBtYXJrZXIuc2hvd0luZm8gPSAhbWFya2VyLnNob3dJbmZvO1xuICAgICAgICB1cGRhdGVQb3B1cChtYXJrZXIsIG1hcmtlci5zaG93SW5mbyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlV2FyZENsaWNrKGVudGl0eU5hbWUsIHN0eWxlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGxhdGxvbiA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpLFxuICAgICAgICAgICAgICAgIG1hcmtlciA9IHBsYWNlV2FyZChsYXRsb24sIGVudGl0eU5hbWUsIHN0eWxlKTtcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIFF1ZXJ5U3RyaW5nLmFkZFF1ZXJ5U3RyaW5nVmFsdWUobWFya2VyLnVuaXRUeXBlLCBtYXJrZXIud2FyZF9sb2MpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVdhcmQobWFya2VyLCByYWRpdXMpIHtcbiAgICAgICAgaWYgKG1hcmtlci51bml0VHlwZSA9PSAnb2JzZXJ2ZXInKSB7XG4gICAgICAgICAgICBtYXJrZXIucmFkaXVzX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG1hcmtlci52aXNpb25fY2VudGVyX2ZlYXR1cmUuZGVzdHJveSgpO1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChtYXJrZXIubG9ubGF0LmxvbiwgbWFya2VyLmxvbmxhdC5sYXQpLCBnZXRTY2FsZWRSYWRpdXMocmFkaXVzKSwgNDApLFxuICAgICAgICAgICAgICAgIGZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihjaXJjbGUpO1xuICAgICAgICAgICAgd2FyZFZpc2lvbkxheWVyLmFkZEZlYXR1cmVzKGZlYXR1cmUpO1xuICAgICAgICAgICAgbWFya2VyLnJhZGl1c19mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihtYXJrZXIubG9ubGF0LCBtYXJrZXIsIHJhZGl1cyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZVdhcmQobGF0bG9uLCBlbnRpdHlOYW1lLCBzdHlsZSwgcXNfdmFsdWVfd29ybGRYWSkge1xuICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsYXRsb24pKSByZXR1cm47XG4gICAgICAgIHZhciBlbnRpdHkgPSBFTlRJVElFU1tlbnRpdHlOYW1lXSxcbiAgICAgICAgICAgIHZpc2lvbl9yYWRpdXMgPSBlbnRpdHlOYW1lID09ICdvYnNlcnZlcicgPyBnZXRWaXNpb25SYWRpdXMoKSA6IGVudGl0eS5yYWRpdXMsXG4gICAgICAgICAgICBtYXJrZXIgPSBjcmVhdGVXYXJkTWFya2VyKGVudGl0eS5pY29uX3BhdGgsIGxhdGxvbik7XG4gICAgICAgIGljb25MYXllci5hZGRNYXJrZXIobWFya2VyKTtcbiAgICAgICAgXG4gICAgICAgIGFkZFZpc2lvbkNpcmNsZSh3YXJkVmlzaW9uTGF5ZXIsIG1hcmtlciwgdmlzaW9uX3JhZGl1cywgJ3JhZGl1c19mZWF0dXJlJywgc3R5bGUpXG4gICAgICAgIG1hcmtlci51bml0VHlwZSA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci53YXJkX2xvYyA9IGVudGl0eU5hbWU7XG4gICAgICAgIG1hcmtlci52aXNpb25fcmFkaXVzID0gdmlzaW9uX3JhZGl1cztcblxuICAgICAgICBpZiAocXNfdmFsdWVfd29ybGRYWSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgICAgIHdvcmxkWFkueCA9IHdvcmxkWFkueC50b0ZpeGVkKDApO1xuICAgICAgICAgICAgd29ybGRYWS55ID0gd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgICAgICAgICBtYXJrZXIud2FyZF9sb2MgPSB3b3JsZFhZLnggKyAnLCcgKyB3b3JsZFhZLnlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hcmtlci53YXJkX2xvYyA9IHFzX3ZhbHVlX3dvcmxkWFk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoVklTSU9OX1NJTVVMQVRJT04gJiYgZW50aXR5TmFtZSA9PSAnb2JzZXJ2ZXInKSB1cGRhdGVWaXNpYmlsaXR5SGFuZGxlcihsYXRsb24sIG1hcmtlciwgbWFya2VyLnZpc2lvbl9yYWRpdXMpO1xuICAgICAgICBcbiAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcImNsaWNrXCIsIG1hcmtlciwgd2FyZE1hcmtlclJlbW92ZSk7XG4gICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJ0b3VjaHN0YXJ0XCIsIG1hcmtlciwgd2FyZE1hcmtlclJlbW92ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygncGxhY2VXYXJkJywgdGhpcyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcmRNYXJrZXJSZW1vdmUoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucmFkaXVzX2ZlYXR1cmUpIHdhcmRWaXNpb25MYXllci5yZW1vdmVGZWF0dXJlcyh0aGlzLnJhZGl1c19mZWF0dXJlKTtcbiAgICAgICAgaWYgKHRoaXMudmlzaW9uX2ZlYXR1cmUpIHZpc2lvblNpbXVsYXRpb25MYXllci5yZW1vdmVGZWF0dXJlcyh0aGlzLnZpc2lvbl9mZWF0dXJlKTtcbiAgICAgICAgaWYgKHRoaXMudmlzaW9uX2NlbnRlcl9mZWF0dXJlKSB2aXNpb25TaW11bGF0aW9uTGF5ZXIucmVtb3ZlRmVhdHVyZXModGhpcy52aXNpb25fY2VudGVyX2ZlYXR1cmUpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICAgICAgdGhpcy5ldmVudHMudW5yZWdpc3RlcihcImNsaWNrXCIsIHRoaXMsIHdhcmRNYXJrZXJSZW1vdmUpO1xuICAgICAgICB0aGlzLmV2ZW50cy51bnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCB0aGlzLCB3YXJkTWFya2VyUmVtb3ZlKTtcbiAgICAgICAgdGhpcy5mZWF0dXJlLmRlc3Ryb3koKTtcbiAgICAgICAgaWNvbkxheWVyLnJlbW92ZU1hcmtlcih0aGlzKTtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcblxuICAgICAgICBRdWVyeVN0cmluZy5yZW1vdmVRdWVyeVN0cmluZ1ZhbHVlKHRoaXMudW5pdFR5cGUsIHRoaXMud2FyZF9sb2MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lYXN1cmVtZW50cyhldmVudCkge1xuICAgICAgICB2YXIgb3V0ID0gXCJcIjtcbiAgICAgICAgaWYgKGV2ZW50Lm9yZGVyID09IDEpIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQgKz0gXCJEaXN0YW5jZTogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0czxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKS5pbm5lckhUTUwgPSBvdXQ7XG5cbiAgICAgICAgbGFzdERpc3RhbmNlID0gY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lXCIpLmlubmVySFRNTCA9IChsYXN0RGlzdGFuY2UgLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS52YWx1ZSkudG9GaXhlZCgyKTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWUtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVDaXJjbGVNZWFzdXJlbWVudHMoZXZlbnQpIHtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKSxcbiAgICAgICAgICAgIG91dCA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yZGVyID09IDEpIHtcbiAgICAgICAgICAgIG91dCArPSBcIlJhZGl1czogXCIgKyBjYWxjdWxhdGVEaXN0YW5jZShldmVudC5vcmRlciwgZXZlbnQudW5pdHMsIGV2ZW50Lm1lYXN1cmUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0ICs9IFwiRGlzdGFuY2U6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHM8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSBvdXQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzUGFydGlhbChldmVudCkge1xuICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgb3V0ID0gXCJcIixcbiAgICAgICAgICAgIGNpcmNsZSxcbiAgICAgICAgICAgIGZlYXR1cmUsXG4gICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uZGVhY3RpdmF0ZSgpO1xuICAgICAgICBpZiAoZXZlbnQub3JkZXIgPT0gMSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm1lYXN1cmUgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnVuaXRzID09IFwia21cIikge1xuICAgICAgICAgICAgICAgICAgICBjaXJjbGUgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24obmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS54LCBldmVudC5nZW9tZXRyeS5jb21wb25lbnRzWzBdLnkpLCBldmVudC5tZWFzdXJlICogMWUzLCAzMCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2lyY2xlID0gT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KGV2ZW50Lmdlb21ldHJ5LmNvbXBvbmVudHNbMF0ueCwgZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50c1swXS55KSwgZXZlbnQubWVhc3VyZSwgMzApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoY2lyY2xlKTtcbiAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgICBpZiAoXCJjaXJjbGVfZmVhdHVyZXNcIiBpbiBldmVudC5nZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5nZW9tZXRyeS5jaXJjbGVfZmVhdHVyZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzLnB1c2goZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZ2VvbWV0cnkuY2lyY2xlX2ZlYXR1cmVzID0gW2ZlYXR1cmVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmZWF0dXJlLm1lYXN1cmVfY29udHJvbCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZmVhdHVyZS5pc19tZWFzdXJpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHBvbHlnb25MYXllci5hZGRGZWF0dXJlcyhmZWF0dXJlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuZ2VvbWV0cnkuY29tcG9uZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd0NvbnRyb2xzW1wic2VsZWN0XCJdLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmNhbmNlbCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQgKz0gXCJSYWRpdXM6IFwiICsgY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQub3JkZXIsIGV2ZW50LnVuaXRzLCBldmVudC5tZWFzdXJlKS50b0ZpeGVkKDApICsgXCIgdW5pdHNcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dCArPSBcIkRpc3RhbmNlOiBcIiArIGNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50Lm9yZGVyLCBldmVudC51bml0cywgZXZlbnQubWVhc3VyZSkudG9GaXhlZCgwKSArIFwiIHVuaXRzPHN1cD4yPC9cIiArIFwic3VwPlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUhvdmVyUG9wdXAoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMucG9wdXAgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5wb3B1cCA9IHRoaXMuY3JlYXRlUG9wdXAodGhpcy5jbG9zZUJveCk7XG4gICAgICAgICAgICBtYXAuYWRkUG9wdXAodGhpcy5wb3B1cCk7XG4gICAgICAgICAgICB0aGlzLnBvcHVwLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9wdXAudG9nZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFBvcHVwID0gdGhpcy5wb3B1cDtcbiAgICAgICAgT3BlbkxheWVycy5FdmVudC5zdG9wKGV2ZW50KTtcbiAgICB9O1xuICAgICAgICBcbiAgICBmdW5jdGlvbiBhZGRNYXJrZXIobWFya2VycywgbGwsIGljb24sIHBvcHVwQ2xhc3MsIHBvcHVwQ29udGVudEhUTUwsIGNsb3NlQm94LCBvdmVyZmxvdykge1xuICAgICAgICB2YXIgZmVhdHVyZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUobWFya2VycywgbGwpLFxuICAgICAgICAgICAgbWFya2VyO1xuXG4gICAgICAgIGZlYXR1cmUuY2xvc2VCb3ggPSBjbG9zZUJveDtcbiAgICAgICAgZmVhdHVyZS5wb3B1cENsYXNzID0gcG9wdXBDbGFzcztcbiAgICAgICAgZmVhdHVyZS5kYXRhLmljb24gPSBpY29uXG4gICAgICAgIGZlYXR1cmUuZGF0YS5wb3B1cENvbnRlbnRIVE1MID0gcG9wdXBDb250ZW50SFRNTDtcbiAgICAgICAgZmVhdHVyZS5kYXRhLm92ZXJmbG93ID0gb3ZlcmZsb3cgPyBcImF1dG9cIiA6IFwiaGlkZGVuXCI7XG4gICAgICAgIG1hcmtlciA9IGZlYXR1cmUuY3JlYXRlTWFya2VyKCk7XG4gICAgICAgIG1hcmtlci5mZWF0dXJlID0gZmVhdHVyZTtcbiAgICAgICAgXG4gICAgICAgIGlmIChtYXJrZXJzLm5hbWUgIT0gXCJUcmVlc1wiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtYXJrZXJzLm5hbWUpO1xuICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcIm1vdXNlb3ZlclwiLCBmZWF0dXJlLCBoYW5kbGVIb3ZlclBvcHVwKTtcbiAgICAgICAgICAgIG1hcmtlci5ldmVudHMucmVnaXN0ZXIoXCJtb3VzZW91dFwiLCBmZWF0dXJlLCBoYW5kbGVIb3ZlclBvcHVwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1hcmtlcnMuYWRkTWFya2VyKG1hcmtlcik7XG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlV2FyZE1hcmtlcihpbWcsIGxhdGxvbiwgcG9wdXBDb250ZW50SFRNTCkge1xuICAgICAgICB2YXIgc2l6ZSA9IG5ldyBPcGVuTGF5ZXJzLlNpemUoMjEsIDI1KSxcbiAgICAgICAgICAgIG9mZnNldCA9IG5ldyBPcGVuTGF5ZXJzLlBpeGVsKC0oc2l6ZS53IC8gMiksIC1zaXplLmgpLFxuICAgICAgICAgICAgaWNvbiA9IG5ldyBPcGVuTGF5ZXJzLkljb24oaW1nLCBzaXplLCBvZmZzZXQpO1xuICAgICAgICAgICAgXG4gICAgICAgIHZhciBmZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZShpY29uTGF5ZXIsIGxhdGxvbik7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5sb25sYXQgPSBsYXRsb247XG4gICAgICAgIGZlYXR1cmUuZGF0YS5pY29uID0gaWNvbjtcbiAgICAgICAgZmVhdHVyZS5jbG9zZUJveCA9IGZhbHNlO1xuICAgICAgICBmZWF0dXJlLnBvcHVwQ2xhc3MgPSBPcGVuTGF5ZXJzLlBvcHVwLkZyYW1lZENsb3VkO1xuICAgICAgICBmZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGZlYXR1cmUuZGF0YS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgICAgIHZhciBtYXJrZXIgPSBmZWF0dXJlLmNyZWF0ZU1hcmtlcigpO1xuICAgICAgICBtYXJrZXIuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgICAgIFxuICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdmVyXCIsIGZlYXR1cmUsIGhhbmRsZUhvdmVyUG9wdXApO1xuICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2VvdXRcIiwgZmVhdHVyZSwgaGFuZGxlSG92ZXJQb3B1cCk7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZygnY3JlYXRlV2FyZE1hcmtlcicsIGxhdGxvbik7XG4gICAgICAgIHJldHVybiBtYXJrZXI7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlcyBhIDY0eDY0IHJlY3RhbmdsZSBmZWF0dXJlIGNlbnRlcmVkIGF0IGNcbiAgICBmdW5jdGlvbiBjcmVhdGVUaWxlRmVhdHVyZShjLCBzdHlsZSkge1xuICAgICAgICB2YXIgcjEgPSB3b3JsZFRvTGF0TG9uKGMueCAtIDMyLCBjLnkgLSAzMiksXG4gICAgICAgICAgICByMiA9IHdvcmxkVG9MYXRMb24oYy54IC0gMzIsIGMueSArIDMyKSxcbiAgICAgICAgICAgIHIzID0gd29ybGRUb0xhdExvbihjLnggKyAzMiwgYy55ICsgMzIpLFxuICAgICAgICAgICAgcjQgPSB3b3JsZFRvTGF0TG9uKGMueCArIDMyLCBjLnkgLSAzMiksXG4gICAgICAgICAgICBib3hfcG9pbnRzID0gW1xuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIxLngsIHIxLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIyLngsIHIyLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHIzLngsIHIzLnkpLFxuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50KHI0LngsIHI0LnkpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYm94X3JlY3QgPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5MaW5lYXJSaW5nKGJveF9wb2ludHMpLFxuICAgICAgICAgICAgYm94X2ZlYXR1cmUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3Rvcihib3hfcmVjdCwgbnVsbCwgc3R5bGUpO1xuXG4gICAgICAgIHJldHVybiBib3hfZmVhdHVyZTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGVzIHVybCBmb3IgdGlsZXMuIE9wZW5MYXllcnMgVE1TIExheWVyIGdldFVSTCBwcm9wZXJ0eSBpcyBzZXQgdG8gdGhpc1xuICAgIGZ1bmN0aW9uIGdldE15VVJMKHBhdGNoLCBiYXNlTGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGJvdW5kcykge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZ2V0TXlVUkwnLCBiYXNlTGF5ZXIpO1xuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMubWFwLmdldFJlc29sdXRpb24oKSxcbiAgICAgICAgICAgICAgICB4ID0gTWF0aC5yb3VuZCgoYm91bmRzLmxlZnQgLSB0aGlzLm1heEV4dGVudC5sZWZ0KSAvIChyZXMgKiB0aGlzLnRpbGVTaXplLncpKSxcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5yb3VuZCgodGhpcy5tYXhFeHRlbnQudG9wIC0gYm91bmRzLnRvcCkgLyAocmVzICogdGhpcy50aWxlU2l6ZS5oKSksXG4gICAgICAgICAgICAgICAgeiA9IG1hcC5nZXRab29tKCksXG4gICAgICAgICAgICAgICAgcGF0aCA9IHogKyBcIi90aWxlX1wiICsgeCArIFwiX1wiICsgeSArIFwiLlwiICsgdGhpcy50eXBlLFxuICAgICAgICAgICAgICAgIHVybCA9IHRoaXMudXJsO1xuXG4gICAgICAgICAgICBpZiAodXJsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICB1cmwgPSB0aGlzLnNlbGVjdFVybChwYXRoLCB1cmwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdXJsICsgcGF0Y2ggKyAnLycgKyBiYXNlTGF5ZXIgKyAnLycgKyBwYXRoXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gcmVzZXRNYXJrZXJMYXllcnMoKSB7XG4gICAgICAgIGZvciAoayBpbiB0cmVlTWFya2Vycykge1xuICAgICAgICAgICAgaWYgKGN1dFRyZWVzW2tdKSB7XG4gICAgICAgICAgICAgICAgc2V0VHJlZU1hcmtlclN0YXRlKHRyZWVNYXJrZXJzW2tdLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IG1hcF9kYXRhO1xuICAgICAgICBPYmplY3Qua2V5cyhtYXBfZGF0YS5kYXRhKS5jb25jYXQoW1wibm9fd2FyZHNcIiwgXCJlbnRfZm93X2Jsb2NrZXJfbm9kZVwiXSkuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW2tdKVswXTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZW1vdmluZyBsYXllcicsIGxheWVyLCBrKTtcbiAgICAgICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllcik7XG4gICAgICAgICAgICAgICAgbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZGF5UmFuZ2VMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgbmlnaHRSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB0cnVlU2lnaHRSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBhdHRhY2tSYW5nZUxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBtYXAuZXZlbnRzLnVucmVnaXN0ZXIoXCJjaGFuZ2VsYXllclwiLCBtYXAsIGxheWVyQ2hhbmdlSGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25NYXBEYXRhTG9hZChkYXRhKSB7XG4gICAgICAgIHZhciBtYXJrZXJzID0ge30sXG4gICAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgICB2ZWN0b3JMYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUoXCJQbGFjZWQgV2FyZHNcIilbMF0sXG4gICAgICAgICAgICBib3hfcG9pbnRzID0gW10sXG4gICAgICAgICAgICBib3hfcmVjdCwgYm94X2ZlYXR1cmUsXG4gICAgICAgICAgICBjb29yZERhdGEgPSBkYXRhLmRhdGEsXG4gICAgICAgICAgICBzdGF0RGF0YSA9IGRhdGEuc3RhdHM7XG4gICAgICAgIGxheWVyS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25NYXBEYXRhTG9hZCcsIGspO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIG1hcmtlcnMgZm9yIG5vbi1uZXV0cmFsIHNwYXduIGJveCBhbmQgbm9uLXRyZWUgbGF5ZXJzXG4gICAgICAgICAgICBpZiAoY29vcmREYXRhW2tdKSB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT0gXCJ0cmlnZ2VyX211bHRpcGxlXCIgJiYgayAhPSBcImVudF9kb3RhX3RyZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29vcmREYXRhW2tdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbihjb29yZERhdGFba11baV0ueCwgY29vcmREYXRhW2tdW2ldLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaWNvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaWNvbl9wYXRoc1trXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpY29uX3BhdGggPSBpY29uX3BhdGhzW2tdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrID09ICducGNfZG90YV9uZXV0cmFsX3NwYXduZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25fcGF0aCA9IGljb25fcGF0aC5yZXBsYWNlKCcxJywgY29vcmREYXRhW2tdW2ldLm5ldXRyYWxUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKDI0LCAyNCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG5ldyBPcGVuTGF5ZXJzLlBpeGVsKC0xMiwtMTIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uID0gbmV3IE9wZW5MYXllcnMuSWNvbihpY29uX3BhdGgsIHNpemUsIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5pdENsYXNzID0gY29vcmREYXRhW2tdW2ldLnN1YlR5cGUgPyBrICsgJ18nICsgY29vcmREYXRhW2tdW2ldLnN1YlR5cGUgOiBrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIgPSBhZGRNYXJrZXIobWFya2Vyc1trXSwgbmV3IE9wZW5MYXllcnMuTG9uTGF0KGxhdGxvbi54LCBsYXRsb24ueSksIGljb24sIE9wZW5MYXllcnMuUG9wdXAuRnJhbWVkQ2xvdWQsIGdldFBvcHVwQ29udGVudChzdGF0RGF0YSwgaywgY29vcmREYXRhW2tdW2ldLnN1YlR5cGUsIHVuaXRDbGFzcywgbnVsbCwgY29vcmREYXRhW2tdW2ldLnB1bGxUeXBlLCBjb29yZERhdGFba11baV0ubmV1dHJhbFR5cGUpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudW5pdFR5cGUgPSBrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyLnVuaXRTdWJUeXBlID0gY29vcmREYXRhW2tdW2ldLnN1YlR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIudW5pdENsYXNzID0gdW5pdENsYXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coaywgY29vcmREYXRhLCBjb29yZERhdGFba10sIGNvb3JkRGF0YVtrXVtpXSwgbWFya2VyLnVuaXRDbGFzcywgbWFya2VyLnVuaXRTdWJUeXBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5kYXlWaXNpb24gPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS5kYXlWaXNpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIubmlnaHRWaXNpb24gPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS5uaWdodFZpc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci50cnVlU2lnaHQgPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS50cnVlU2lnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuYXR0YWNrUmFuZ2UgPSBzdGF0RGF0YVttYXJrZXIudW5pdENsYXNzXS5hdHRhY2tSYW5nZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5wdWxsVHlwZSA9IGNvb3JkRGF0YVtrXVtpXS5wdWxsVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5uZXV0cmFsVHlwZSA9IGNvb3JkRGF0YVtrXVtpXS5uZXV0cmFsVHlwZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci5zaG93SW5mbyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwiY2xpY2tcIiwgbWFya2Vyc1trXSwgaGFuZGxlVG93ZXJNYXJrZXJDbGljayk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXIuZXZlbnRzLnJlZ2lzdGVyKFwidG91Y2hzdGFydFwiLCBtYXJrZXJzW2tdLCBoYW5kbGVUb3dlck1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlci50b3dlcl9sb2MgPSBjb29yZERhdGFba11baV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gU2V0IHVwIHRyZWUgbGF5ZXIgd2l0aG91dCBjcmVhdGluZyB0cmVlIG1hcmtlcnMgeWV0XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoayA9PSBcImVudF9kb3RhX3RyZWVcIikge1xuICAgICAgICAgICAgICAgICAgICBtYXJrZXJzW2tdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuTWFya2VycyhsYXllck5hbWVzW2tdLCB7dmlzaWJpbGl0eTogZmFsc2V9KTtcbiAgICAgICAgICAgICAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgICAgICAgICAgICAgICAgICAvL21hcmtlcnNba10uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBuZXV0cmFsIHNwYXduIG1hcmtlcnMgYW5kIHJlY3RhbmdsZXNcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChrID09IFwidHJpZ2dlcl9tdWx0aXBsZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvYWRKU09ORGF0YShtYXJrZXJzLCBrLCBcIm5wY19kb3RhX25ldXRyYWxfc3Bhd25lcl9ib3hcIiwgY29vcmREYXRhW2tdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChWSVNJT05fU0lNVUxBVElPTikge1xuICAgICAgICAgICAgbG9hZEdlb0pTT05EYXRhKG1hcmtlcnMsICdub193YXJkcycsIGxheWVyTmFtZXMubm9fd2FyZHMsIHN0eWxlLnJlZCk7XG4gICAgICAgICAgICBsb2FkR2VvSlNPTkRhdGEobWFya2VycywgJ2VudF9mb3dfYmxvY2tlcl9ub2RlJywgbGF5ZXJOYW1lcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSwgc3R5bGUubGlnaHRibHVlKTtcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIG1hcF9kYXRhID0gZGF0YTtcbiAgICAgICAgXG4gICAgICAgIG1hcC5yYWlzZUxheWVyKHZlY3RvckxheWVyLCBtYXAubGF5ZXJzLmxlbmd0aCk7XG5cbiAgICAgICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcImNoYW5nZWxheWVyXCIsIG1hcCwgbGF5ZXJDaGFuZ2VIYW5kbGVyKTtcblxuICAgICAgICBwYXJzZVF1ZXJ5U3RyaW5nKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGxheWVyQ2hhbmdlSGFuZGxlcihldmVudCkge1xuICAgICAgICAvLyBMb2FkIHRyZWUgbWFya2VycyB0aGUgZmlyc3QgdGltZSB0aGUgdHJlZSBsYXllciBpcyBzd2l0Y2hlZCB0b1xuICAgICAgICBpZiAoZXZlbnQucHJvcGVydHkgPT09IFwidmlzaWJpbGl0eVwiICYmIGV2ZW50LmxheWVyLm5hbWUgPT0gbGF5ZXJOYW1lc1tcImVudF9kb3RhX3RyZWVcIl0gJiYgIWV2ZW50LmxheWVyLmxvYWRlZCkge1xuICAgICAgICAgICAgbG9hZFRyZWVEYXRhKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQucHJvcGVydHkgPT09IFwidmlzaWJpbGl0eVwiKSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQubGF5ZXIuaXNCYXNlTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnQmFzZUxheWVyJywgZXZlbnQubGF5ZXIubmFtZS5yZXBsYWNlKC8gL2csICcnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZyhldmVudC5sYXllci5uYW1lLnJlcGxhY2UoLyAvZywgJycpLCBldmVudC5sYXllci52aXNpYmlsaXR5ID8gdHJ1ZSA6IG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZFRyZWVEYXRhKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnc3RhcnQgdHJlZSBsb2FkJyk7XG4gICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobGF5ZXJOYW1lc1tcImVudF9kb3RhX3RyZWVcIl0pWzBdO1xuICAgICAgICBjb25zb2xlLmxvZyhsYXllcik7XG4gICAgICAgIHZhciBkYXRhID0gbWFwX2RhdGEuZGF0YS5lbnRfZG90YV90cmVlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsYXRsb24gPSB3b3JsZFRvTGF0TG9uKGRhdGFbaV0ueCwgZGF0YVtpXS55KTtcbiAgICAgICAgICAgIHZhciBzaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZSgyNCwgMjQpLFxuICAgICAgICAgICAgICAgIG9mZnNldCA9IG5ldyBPcGVuTGF5ZXJzLlBpeGVsKC0xMiwtMTIpLFxuICAgICAgICAgICAgICAgIGljb24gPSBuZXcgT3BlbkxheWVycy5JY29uKGljb25fcGF0aHNbXCJlbnRfZG90YV90cmVlXCJdLCBzaXplLCBvZmZzZXQpO1xuICAgICAgICAgICAgbWFya2VyID0gYWRkTWFya2VyKGxheWVyLCBuZXcgT3BlbkxheWVycy5Mb25MYXQobGF0bG9uLngsIGxhdGxvbi55KSwgaWNvbiwgT3BlbkxheWVycy5Qb3B1cC5GcmFtZWRDbG91ZCwgXCJDbGljayB0byBjdXQgZG93biB0cmVlLjxicj5UaGlzIHdpbGwgYWZmZWN0IHRoZSB3YXJkIHZpc2lvbiBzaW11bGF0aW9uLlwiLCBmYWxzZSk7XG4gICAgICAgICAgICBtYXJrZXIudHJlZVZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgbWFya2VyLnRyZWVfbG9jID0gZGF0YVtpXS54ICsgJywnICsgZGF0YVtpXS55O1xuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OKSB7XG4gICAgICAgICAgICAgICAgbWFya2VyLmV2ZW50cy5yZWdpc3RlcihcImNsaWNrXCIsIG1hcmtlciwgaGFuZGxlVHJlZU1hcmtlckNsaWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyZWVNYXJrZXJzW2RhdGFbaV0ueCArICcsJyArIGRhdGFbaV0ueV0gPSBtYXJrZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIubG9hZGVkID0gIWxheWVyLmxvYWRlZDtcbiAgICAgICAgY29uc29sZS5sb2coJ2VuZCB0cmVlIGxvYWQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkSlNPTkRhdGEobWFya2VycywgaywgbmFtZSwgZGF0YSkge1xuICAgICAgICBtYXJrZXJzW25hbWVdID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKGxheWVyTmFtZXNba10pO1xuICAgICAgICBtYXAuYWRkTGF5ZXIobWFya2Vyc1tuYW1lXSk7XG4gICAgICAgIG1hcmtlcnNbbmFtZV0uc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcG50ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGFbaV0ucG9pbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhdGxvbiA9IHdvcmxkVG9MYXRMb24oZGF0YVtpXS5wb2ludHNbal0ueCwgZGF0YVtpXS5wb2ludHNbal0ueSk7XG4gICAgICAgICAgICAgICAgcG50LnB1c2gobmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQobGF0bG9uLngsIGxhdGxvbi55KSk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgbG4gPSBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5MaW5lYXJSaW5nKHBudCk7XG4gICAgICAgICAgICBwZiA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKGxuLCBudWxsLCBzdHlsZS5ncmVlbik7XG4gICAgICAgICAgICBtYXJrZXJzW25hbWVdLmFkZEZlYXR1cmVzKFtwZl0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGxvYWRHZW9KU09ORGF0YShtYXJrZXJzLCBrLCBuYW1lLCBzdHlsZSkge1xuICAgICAgICB2YXIgZmlsZW5hbWUgPSBtYXBfZGF0YV9wYXRoICsgZ2V0RGF0YVZlcnNpb24oKSArICcvJyArIGsgKyAnMi5qc29uJztcbiAgICAgICAgbWFya2Vyc1trXSA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcihuYW1lLCB7XG4gICAgICAgICAgICBzdHJhdGVnaWVzOiBbbmV3IE9wZW5MYXllcnMuU3RyYXRlZ3kuRml4ZWQoKV0sXG4gICAgICAgICAgICBwcm90b2NvbDogbmV3IE9wZW5MYXllcnMuUHJvdG9jb2wuSFRUUCh7XG4gICAgICAgICAgICAgICAgdXJsOiBmaWxlbmFtZSxcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IG5ldyBPcGVuTGF5ZXJzLkZvcm1hdC5HZW9KU09OKClcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmlzaWJpbGl0eTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIG1hcmtlcnNba10uc3R5bGUgPSBzdHlsZTtcbiAgICAgICAgbWFwLmFkZExheWVyKG1hcmtlcnNba10pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB0b2dnbGVDb250cm9sKCkge1xuICAgICAgICB2YXIgY29udHJvbDtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ21vZGUnLCBudWxsKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGRyYXdDb250cm9scykge1xuICAgICAgICAgICAgY29udHJvbCA9IGRyYXdDb250cm9sc1trZXldO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcywgdGhpcy52YWx1ZSwga2V5LCB0aGlzLnZhbHVlID09IGtleSAmJiB0aGlzLmNoZWNrZWQpO1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgPT0ga2V5ICYmIHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIFF1ZXJ5U3RyaW5nLnNldFF1ZXJ5U3RyaW5nKCdtb2RlJywga2V5KTtcbiAgICAgICAgICAgICAgICBjb250cm9sLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0aGlzLnZhbHVlID09IFwicG9seWdvbkNvbnRyb2xcIiB8fCB0aGlzLnZhbHVlID09IFwiY2lyY2xlXCIpICYmIHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgIGRyYXdDb250cm9sc1tcInNlbGVjdFwiXS5hY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkcmF3Q29udHJvbHNbXCJzZWxlY3RcIl0uZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZhbHVlICE9PSAnb2JzZXJ2ZXInKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2libGUtYXJlYVwiKS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYXZlbHRpbWUtY29udGFpbmVyXCIpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBtYXAgc2V0dGluZ3MgYmFzZWQgb24gcXVlcnkgc3RyaW5nIHZhbHVlc1xuICAgIGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmcoKSB7XG4gICAgICAgIHZhciBtb2RlID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdtb2RlJyk7XG4gICAgICAgIGlmIChtb2RlKSB7XG4gICAgICAgICAgICB2YXIgbW9kZVJhZGlvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kZSArICdUb2dnbGUnKTtcbiAgICAgICAgICAgIGlmIChtb2RlUmFkaW9CdXR0b24pIHtcbiAgICAgICAgICAgICAgICBtb2RlUmFkaW9CdXR0b24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdG9nZ2xlQ29udHJvbC5jYWxsKG1vZGVSYWRpb0J1dHRvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHpvb20gPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3pvb20nKTtcbiAgICAgICAgaWYgKHpvb20pIHtcbiAgICAgICAgICAgIG1hcC56b29tVG8ocGFyc2VJbnQoem9vbSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3b3JsZFggPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ3gnKTtcbiAgICAgICAgdmFyIHdvcmxkWSA9IFF1ZXJ5U3RyaW5nLmdldFBhcmFtZXRlckJ5TmFtZSgneScpO1xuICAgICAgICBpZiAod29ybGRYICYmIHdvcmxkWSkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IHdvcmxkVG9MYXRMb24od29ybGRYLCB3b3JsZFkpO1xuICAgICAgICAgICAgbWFwLnNldENlbnRlcihuZXcgT3BlbkxheWVycy5Mb25MYXQobG9ubGF0LngsIGxvbmxhdC55KSwgdW5kZWZpbmVkLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB2YXIga2V5cyA9IFsnb2JzZXJ2ZXInLCAnc2VudHJ5J107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHdhcmRzID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKGtleXNbaV0pXG4gICAgICAgICAgICBpZiAod2FyZHMpIHtcbiAgICAgICAgICAgICAgICB3YXJkX2Nvb3JkaW5hdGVzID0gdHJpbSh3YXJkcywgJyA7Jykuc3BsaXQoJzsnKVxuICAgICAgICAgICAgICAgIHdhcmRfY29vcmRpbmF0ZXMubWFwKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb29yZCA9IGVsLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4eSA9IHdvcmxkVG9MYXRMb24ocGFyc2VGbG9hdChjb29yZFswXSksIHBhcnNlRmxvYXQoY29vcmRbMV0pKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VXYXJkKG5ldyBPcGVuTGF5ZXJzLkxvbkxhdCh4eS54LCB4eS55KSwga2V5c1tpXSwga2V5c1tpXSA9PT0gJ29ic2VydmVyJyA/IHN0eWxlLmRheSA6IHN0eWxlLnRydWVfc2lnaHQsIGVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIGJhc2VMYXllck5hbWUgPSBRdWVyeVN0cmluZy5nZXRQYXJhbWV0ZXJCeU5hbWUoJ0Jhc2VMYXllcicpO1xuICAgICAgICBpZiAoYmFzZUxheWVyTmFtZSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXNlTGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyID0gYmFzZUxheWVyc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJOYW1lID0gbGF5ZXIubmFtZS5yZXBsYWNlKC8gL2csICcnKTtcbiAgICAgICAgICAgICAgICBpZiAoYmFzZUxheWVyTmFtZSA9PT0gbGF5ZXJOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIobGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZvciAoayBpbiBsYXllck5hbWVzKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXJOYW1lID0gbGF5ZXJOYW1lc1trXS5yZXBsYWNlKC8gL2csICcnKTtcbiAgICAgICAgICAgIHZhbHVlID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKGxheWVyTmFtZSk7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNba10pWzBdO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwYXJzZVF1ZXJ5U3RyaW5nJywgbGF5ZXIsIGxheWVyTmFtZXNba10sIGxheWVyTmFtZSwgdmFsdWUgPT0gXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgIGlmIChsYXllcikgbGF5ZXIuc2V0VmlzaWJpbGl0eSh2YWx1ZSA9PSBcInRydWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY3V0X3RyZWVzID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdjdXRfdHJlZXMnKTtcbiAgICAgICAgaWYgKGN1dF90cmVlcykge1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW1wiZW50X2RvdGFfdHJlZVwiXSlbMF07XG4gICAgICAgICAgICBpZiAoIWxheWVyLmxvYWRlZCkgbG9hZFRyZWVEYXRhKCk7XG4gICAgICAgICAgICBjdXRfdHJlZV9jb29yZGluYXRlcyA9IHRyaW0oY3V0X3RyZWVzLCAnIDsnKS5zcGxpdCgnOycpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlTWFya2VycywgY3V0X3RyZWVfY29vcmRpbmF0ZXMpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXRfdHJlZV9jb29yZGluYXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1dF90cmVlX2Nvb3JkaW5hdGVzW2ldKTtcbiAgICAgICAgICAgICAgICBpZiAodHJlZU1hcmtlcnNbY3V0X3RyZWVfY29vcmRpbmF0ZXNbaV1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRyZWVNYXJrZXJTdGF0ZSh0cmVlTWFya2Vyc1tjdXRfdHJlZV9jb29yZGluYXRlc1tpXV0sIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG93ZXJfdmlzaW9uID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCd0b3dlcl92aXNpb24nKTtcbiAgICAgICAgaWYgKHRvd2VyX3Zpc2lvbikge1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShsYXllck5hbWVzW1wibnBjX2RvdGFfdG93ZXJcIl0pWzBdO1xuICAgICAgICAgICAgdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzID0gdHJpbSh0b3dlcl92aXNpb24sICcgOycpLnNwbGl0KCc7JylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0b3dlcl92aXNpb24nLCBsYXllcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0cmVlTWFya2VycywgdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG93ZXJfdmlzaW9uX2Nvb3JkaW5hdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsYXllci5tYXJrZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXllci5tYXJrZXJzW2pdLnRvd2VyX2xvYy54ICsgJywnICsgbGF5ZXIubWFya2Vyc1tqXS50b3dlcl9sb2MueSA9PSB0b3dlcl92aXNpb25fY29vcmRpbmF0ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVRvd2VyTWFya2VyQ2xpY2soe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdDogbGF5ZXIubWFya2Vyc1tqXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gc2V0VHJlZVF1ZXJ5U3RyaW5nKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBPYmplY3Qua2V5cyhjdXRUcmVlcykuam9pbignOycpO1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnY3V0X3RyZWVzJywgdmFsdWUgfHwgbnVsbCk7XG4gICAgfVxuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqXG4gICAgICogSU5JVElUSUFMSVpBVElPTiAqXG4gICAgICoqKioqKioqKioqKioqKioqKioqL1xuICAgIE9wZW5MYXllcnMuSW1nUGF0aCA9IElNR19ESVI7XG4gICAgXG4gICAgLy8gU3RhcnQgc2V0dGluZyB1cCB0aGUgbWFwLCBhZGRpbmcgY29udHJvbHMgYW5kIGxheWVyc1xuICAgIGJhc2VMYXllcnMuZm9yRWFjaChmdW5jdGlvbihsYXllcikge1xuICAgICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgIH0pO1xuICAgIG1hcC5hZGRMYXllcihjdXJzb3JMYXllcik7XG4gICAgbWFwLmFkZExheWVyKGRheVJhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcihuaWdodFJhbmdlTGF5ZXIpO1xuICAgIG1hcC5hZGRMYXllcih0cnVlU2lnaHRSYW5nZUxheWVyKTtcbiAgICBtYXAuYWRkTGF5ZXIoYXR0YWNrUmFuZ2VMYXllcik7XG4gICAgbWFwLmFkZExheWVyKHBvbHlnb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKHdhcmRWaXNpb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKHZpc2lvblNpbXVsYXRpb25MYXllcik7XG4gICAgbWFwLmFkZExheWVyKGljb25MYXllcik7XG4gICAgbWFwLmFkZENvbnRyb2woY29vcmRpbmF0ZUNvbnRyb2wpO1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbih7XG4gICAgICAgIGRyYWdQYW5PcHRpb25zOiB7XG4gICAgICAgICAgICBlbmFibGVLaW5ldGljOiB0cnVlXG4gICAgICAgIH1cbiAgICB9KSk7XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5LZXlib2FyZERlZmF1bHRzKCkpO1xuICAgIG1hcC5hZGRDb250cm9sKGxheWVyU3dpdGNoZXIpO1xuICAgIGxheWVyU3dpdGNoZXIubWF4aW1pemVDb250cm9sKCk7XG4gICAgaWYgKCFtYXAuZ2V0Q2VudGVyKCkpIHtcbiAgICAgICAgbWFwLnpvb21Ub01heEV4dGVudCgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBjcmVhdGUgY2xpY2sgaGFuZGxlclxuICAgIE9wZW5MYXllcnMuQ29udHJvbC5DbGljayA9IE9wZW5MYXllcnMuQ2xhc3MoT3BlbkxheWVycy5Db250cm9sLCB7XG4gICAgICAgIGRlZmF1bHRIYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgc2luZ2xlOiB0cnVlLFxuICAgICAgICAgICAgXCJkb3VibGVcIjogZmFsc2UsXG4gICAgICAgICAgICBwaXhlbFRvbGVyYW5jZTogMCxcbiAgICAgICAgICAgIHN0b3BTaW5nbGU6IGZhbHNlLFxuICAgICAgICAgICAgc3RvcERvdWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyT3B0aW9ucyA9IE9wZW5MYXllcnMuVXRpbC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgICAgIE9wZW5MYXllcnMuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IE9wZW5MYXllcnMuSGFuZGxlci5DbGljayh0aGlzLCB7XG4gICAgICAgICAgICAgICAgY2xpY2s6IHRoaXMub25DbGljayxcbiAgICAgICAgICAgICAgICBkYmxjbGljazogdGhpcy5vbkRibGNsaWNrXG4gICAgICAgICAgICB9LCB0aGlzLmhhbmRsZXJPcHRpb25zKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25DbGljazogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnb25DbGljaycpO1xuICAgICAgICB9LFxuICAgICAgICBvbkRibGNsaWNrOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIG91dHB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMua2V5ICsgXCJPdXRwdXRcIiksXG4gICAgICAgICAgICAgICAgbXNnID0gXCJkYmxjbGljayBcIiArIGV2ZW50Lnh5O1xuICAgICAgICAgICAgb3V0cHV0LnZhbHVlID0gb3V0cHV0LnZhbHVlICsgbXNnICsgXCJcXG5cIjtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQ29udHJvbHMgY29uZmlndXJhdGlvblxuICAgIHJlbmRlcmVyID0gcmVuZGVyZXIgPyBbcmVuZGVyZXJdIDogT3BlbkxheWVycy5MYXllci5WZWN0b3IucHJvdG90eXBlLnJlbmRlcmVycztcbiAgICBkcmF3Q29udHJvbHMgPSB7XG4gICAgICAgIGxpbmU6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShPcGVuTGF5ZXJzLkhhbmRsZXIuUGF0aCwge1xuICAgICAgICAgICAgcGVyc2lzdDogdHJ1ZSxcbiAgICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcmVyczogcmVuZGVyZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBjaXJjbGU6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShPcGVuTGF5ZXJzLkhhbmRsZXIuUGF0aCwge1xuICAgICAgICAgICAgcGVyc2lzdDogZmFsc2UsXG4gICAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICByZW5kZXJlcnM6IHJlbmRlcmVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgb2JzZXJ2ZXI6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuQ2xpY2soe1xuICAgICAgICAgICAgb25DbGljazogaGFuZGxlV2FyZENsaWNrKCdvYnNlcnZlcicsIHN0eWxlLmRheSlcbiAgICAgICAgfSksXG4gICAgICAgIHNlbnRyeTogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5DbGljayh7XG4gICAgICAgICAgICBvbkNsaWNrOiBoYW5kbGVXYXJkQ2xpY2soJ3NlbnRyeScsIHN0eWxlLnRydWVfc2lnaHQpXG4gICAgICAgIH0pLFxuICAgICAgICBwb2x5Z29uQ29udHJvbDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5EcmF3RmVhdHVyZShwb2x5Z29uTGF5ZXIsIE9wZW5MYXllcnMuSGFuZGxlci5SZWd1bGFyUG9seWdvbiwge1xuICAgICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBzaWRlczogMzBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHNlbGVjdDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5TZWxlY3RGZWF0dXJlKHBvbHlnb25MYXllciwge1xuICAgICAgICAgICAgaG92ZXI6IHRydWUsXG4gICAgICAgICAgICBoaWdobGlnaHRPbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmZWF0dXJlLm1lYXN1cmVfY29udHJvbCAmJiBmZWF0dXJlLmlzX21lYXN1cmluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZS5tZWFzdXJlX2NvbnRyb2wuY2FuY2VsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlLmlzX21lYXN1cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb2x5Z29uTGF5ZXIucmVtb3ZlRmVhdHVyZXMoZmVhdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3ZlckZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpLFxuICAgICAgICAgICAgICAgICAgICBvdXQgPSBcIlJhZGl1czogXCIgKyAoLjU2NTM1MiAqIE1hdGguc3FydChmZWF0dXJlLmdlb21ldHJ5LmdldEFyZWEoKSkgKiBtYXBDb25zdGFudHMuc2NhbGUpLnRvRml4ZWQoMCkgKyBcIiB1bml0c1wiO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gb3V0O1xuICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KGZlYXR1cmUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dEZlYXR1cmU6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0XCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnVuaGlnaGxpZ2h0KGZlYXR1cmUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIC8vIEFkZCBjb250cm9scyB0byBtYXBcbiAgICBmb3IgKHZhciBrZXkgaW4gZHJhd0NvbnRyb2xzKSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJsaW5lXCIpIHtcbiAgICAgICAgICAgIGRyYXdDb250cm9sc1trZXldLmV2ZW50cy5vbih7XG4gICAgICAgICAgICAgICAgbWVhc3VyZTogaGFuZGxlTWVhc3VyZW1lbnRzLFxuICAgICAgICAgICAgICAgIG1lYXN1cmVwYXJ0aWFsOiBoYW5kbGVNZWFzdXJlbWVudHNcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleSA9PSBcImNpcmNsZVwiKSB7XG4gICAgICAgICAgICBkcmF3Q29udHJvbHNba2V5XS5ldmVudHMub24oe1xuICAgICAgICAgICAgICAgIG1lYXN1cmU6IGhhbmRsZUNpcmNsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgICAgICAgICBtZWFzdXJlcGFydGlhbDogaGFuZGxlQ2lyY2xlTWVhc3VyZW1lbnRzUGFydGlhbFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBtYXAuYWRkQ29udHJvbChkcmF3Q29udHJvbHNba2V5XSk7XG4gICAgfVxuXG4gICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcInpvb21lbmRcIiwgbWFwLCBkZWJvdW5jZShmdW5jdGlvbigpe1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnem9vbScsIG1hcC5nZXRab29tKCkpO1xuICAgIH0sIDUwMCkpO1xuXG4gICAgbWFwLmV2ZW50cy5yZWdpc3RlcihcIm1vdmVlbmRcIiwgbWFwLCBkZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hcENlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgaWYgKG1hcENlbnRlcikge1xuICAgICAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKG1hcENlbnRlci5sb24sIG1hcENlbnRlci5sYXQpO1xuICAgICAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ3gnLCB3b3JsZFhZLngudG9GaXhlZCgwKSk7XG4gICAgICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygneScsIHdvcmxkWFkueS50b0ZpeGVkKDApKTtcbiAgICAgICAgfVxuICAgIH0sIDUwMCkpO1xuXG4gICAgLy8gWC9ZIGNvb3JkaW5hdGUgdXBkYXRlIGRpc3BsYXkgaGFuZGxlclxuICAgIGNvb3JkaW5hdGVDb250cm9sLmZvcm1hdE91dHB1dCA9IGZ1bmN0aW9uIChsb25sYXQpIHtcbiAgICAgICAgdmFyIHdvcmxkWFkgPSBsYXRMb25Ub1dvcmxkKGxvbmxhdC5sb24sIGxvbmxhdC5sYXQpO1xuICAgICAgICByZXR1cm4gd29ybGRYWS54LnRvRml4ZWQoMCkgKyAnLCAnICsgd29ybGRYWS55LnRvRml4ZWQoMCk7XG4gICAgfTtcbiAgICBcbiAgICBtYXAuZXZlbnRzLnJlZ2lzdGVyKFwibW91c2Vtb3ZlXCIsIG1hcCwgZnVuY3Rpb24oZSkge1xuICAgICAgICBjdXJzb3JMYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICBcbiAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY3Vyc29yIG1hcmtlciBwb2x5Z29uIGlmIGluIHBsYWNlIG9ic2VydmVyIG1vZGVcbiAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OICYmIHZzLnJlYWR5ICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2JzZXJ2ZXJUb2dnbGVcIikuY2hlY2tlZCkge1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZS54eSk7XG4gICAgICAgICAgICBpZiAoIW1hcEJvdW5kcy5jb250YWluc0xvbkxhdChsb25sYXQpKSByZXR1cm47XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsb25sYXQubG9uLCBsb25sYXQubGF0KTtcbiAgICAgICAgICAgIHZhciBncmlkWFkgPSB2cy5Xb3JsZFhZdG9HcmlkWFkod29ybGRYWS54LCB3b3JsZFhZLnkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdHJlZVB0cyA9IHZzLnRyZWVfcmVsYXRpb25zW2dyaWRYWS5rZXldO1xuICAgICAgICAgICAgdmFyIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRyZWVQdHMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmVlUHQgPSB0cmVlUHRzW2ldO1xuICAgICAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSB2cy50cmVlX3N0YXRlW3RyZWVQdC5rZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZUJsb2NraW5nKSBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY3Vyc29yX3N0eWxlID0gc3R5bGUuZ3JlZW47XG4gICAgICAgICAgICBpZiAoIXZzLmlzVmFsaWRYWShncmlkWFkueCwgZ3JpZFhZLnksIHRydWUsIHRydWUsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgY3Vyc29yX3N0eWxlID0gc3R5bGUucmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGJveF9mZWF0dXJlID0gY3JlYXRlVGlsZUZlYXR1cmUodnMuR3JpZFhZdG9Xb3JsZFhZKGdyaWRYWS54LCBncmlkWFkueSksIGN1cnNvcl9zdHlsZSk7XG4gICAgICAgICAgICBjdXJzb3JMYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKFZJU0lPTl9TSU1VTEFUSU9OX0FMV0FZUykgdXBkYXRlVmlzaWJpbGl0eUhhbmRsZXIobG9ubGF0LCBudWxsLCBnZXRWaXNpb25SYWRpdXMoKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNob3cvaGlkZSBjb250cm9scyBwYW5lbFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWF4XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIikuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRyb2xzLW1pblwiKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBpZiAobGF5ZXJTd2l0Y2hlci5pc1NtYWxsU2NyZWVuKCkpIHtcbiAgICAgICAgICAgIGxheWVyU3dpdGNoZXIubWluaW1pemVDb250cm9sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZnVuY3Rpb24gbWluaW1pemVDb250cm9sTGlzdChlKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udHJvbHNcIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1tYXhcIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgaWYgKGUpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250cm9scy1taW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1pbmltaXplQ29udHJvbExpc3QsIGZhbHNlKTtcbiAgICBcbiAgICAvLyBJbml0aWFsbHkgaGlkZSBjb250cm9scyBpZiBzY3JlZW4gaXMgc21hbGxcbiAgICBpZiAobGF5ZXJTd2l0Y2hlci5pc1NtYWxsU2NyZWVuKCkpIHtcbiAgICAgICAgbWluaW1pemVDb250cm9sTGlzdC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udHJvbHMtbWluXCIpKTtcbiAgICAgICAgbGF5ZXJTd2l0Y2hlci5taW5pbWl6ZUNvbnRyb2woKTtcbiAgICB9XG5cbiAgICAvLyBTaG93L2hpZGUgWC9ZIGNvb3JkaW5hdGUgZGlzcGxheVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29vcmRDb250cm9sXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sQ29udHJvbE1vdXNlUG9zaXRpb25cIikuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9sQ29udHJvbE1vdXNlUG9zaXRpb25cIikuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIFZpc2lvbiBzaW11bGF0aW9uIG9uL29mZlxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIFZJU0lPTl9TSU1VTEFUSU9OID0gdGhpcy5jaGVja2VkO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsd2F5c1NpbXVsYXRlQ29udHJvbFwiKS5kaXNhYmxlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgfSwgZmFsc2UpO1xuXG4gICAgLy8gQWx3YXlzIHNpbXVsYXRlIHZpc2lvbiBvbi9vZmZcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFsd2F5c1NpbXVsYXRlQ29udHJvbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT05fQUxXQVlTID0gdGhpcy5jaGVja2VkO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIC8vIFVwZGF0ZSB0cmF2ZWwgdGltZSBkaXNwbGF5IHdoZW4gbW92ZXNwZWVkIGlucHV0IGNoYW5nZXNcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0cmF2ZWx0aW1lXCIpLmlubmVySFRNTCA9IChsYXN0RGlzdGFuY2UgLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdmVzcGVlZFwiKS52YWx1ZSkudG9GaXhlZCgyKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICAvLyBTZXQgdXAgcGFuZWwgcmFkaW8gYnV0dG9uIHRvZ2dsZSBoYW5kbGVyc1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0ZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5lVG9nZ2xlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVDb250cm9sLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpcmNsZVRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYnNlcnZlclRvZ2dsZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlQ29udHJvbCwgZmFsc2UpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZW50cnlUb2dnbGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZUNvbnRyb2wsIGZhbHNlKTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzZXQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNwbGl0KFwiP1wiKVswXSk7XG4gICAgICAgIHJlc2V0TWFya2VyTGF5ZXJzKCk7XG4gICAgICAgIHBvbHlnb25MYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgd2FyZFZpc2lvbkxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB2aXNpb25TaW11bGF0aW9uTGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIGljb25MYXllci5jbGVhck1hcmtlcnMoKTtcbiAgICAgICAgZHJhd0NvbnRyb2xzLmxpbmUuY2FuY2VsKCk7XG4gICAgICAgIGRyYXdDb250cm9scy5jaXJjbGUuY2FuY2VsKCk7XG4gICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIoYmFzZUxheWVyc1swXSk7XG4gICAgICAgIG1hcC56b29tVG9NYXhFeHRlbnQoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykudmFsdWUgPSBFTlRJVElFUy5vYnNlcnZlci5yYWRpdXM7XG4gICAgICAgIGluaXQoKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBRdWVyeVN0cmluZy5zZXRRdWVyeVN0cmluZygnZGF0YScsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXRhQ29udHJvbCcpLnZhbHVlKTtcbiAgICAgICAgcmVzZXRNYXJrZXJMYXllcnMoKTtcbiAgICAgICAgaW5pdCgpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Zpc2lvbi1yYWRpdXMgY2hhbmdlJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuc2V0QXR0cmlidXRlKCdkYXRhLWRpcnR5LXZhbHVlJywgdHJ1ZSk7XG4gICAgfSwgZmFsc2UpO1xuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbmVzc0NvbnRyb2wnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRvZ2dsZURhcmtuZXNzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkYXJrbmVzc0NvbnRyb2wnKS5jaGVja2VkKTtcbiAgICAgICAgUXVlcnlTdHJpbmcuc2V0UXVlcnlTdHJpbmcoJ2RhcmtuZXNzJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWUpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1kaXJ0eS12YWx1ZScpO1xuICAgIH0sIGZhbHNlKTtcbiAgICBcbiAgICBmdW5jdGlvbiB0b2dnbGVEYXJrbmVzcyhzdGF0ZSkge1xuICAgICAgICBEQVJLTkVTUyA9IHN0YXRlO1xuICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlydHktdmFsdWUnKSwgIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLWRpcnR5LXZhbHVlJyksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuZ2V0QXR0cmlidXRlKCdkYXRhLXNhdmVkLXZhbHVlJykpO1xuICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aXNpb24tcmFkaXVzJykuc2V0QXR0cmlidXRlKCdkYXRhLXNhdmVkLXZhbHVlJywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS52YWx1ZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlID0gREFSS05FU1NfVklTSU9OX1JBRElVUztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlydHktdmFsdWUnKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXN0b3JlIHZpc2lvbiByYWRpdXMnKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc2lvbi1yYWRpdXMnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2F2ZWQtdmFsdWUnKSkgIHx8IEVOVElUSUVTLm9ic2VydmVyLnJhZGl1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpY29uTGF5ZXIubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hcmtlcik7XG4gICAgICAgICAgICBpZiAobWFya2VyLnVuaXRUeXBlID09ICdvYnNlcnZlcicpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVXYXJkKG1hcmtlciwgc3RhdGUgPyBEQVJLTkVTU19WSVNJT05fUkFESVVTIDogbWFya2VyLnZpc2lvbl9yYWRpdXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGZvciAoayBpbiBtYXBfZGF0YS5kYXRhKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKGxheWVyTmFtZXNba10pWzBdO1xuICAgICAgICAgICAgaWYgKGxheWVyICYmIGxheWVyLm1hcmtlcnMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhrLCBsYXllcik7XG4gICAgICAgICAgICAgICAgbGF5ZXIubWFya2Vycy5mb3JFYWNoKGZ1bmN0aW9uIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcmtlci5zaG93SW5mbykgYWRkQnVpbGRpbmdWaXNpb25GZWF0dXJlcyhtYXJrZXIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldERhdGFWZXJzaW9uKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RhdGFDb250cm9sJykudmFsdWU7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpc2libGVBcmVhKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaWJsZS1hcmVhJykuaW5uZXJIVE1MID0gXCJWaXNpYmlsaXR5OiBcIiArICh2cy5saWdodEFyZWEgLyB2cy5hcmVhICogMTAwKS50b0ZpeGVkKCkgKyAnJSAnICsgdnMubGlnaHRBcmVhICsgXCIvXCIgKyB2cy5hcmVhO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZpc2liaWxpdHlIYW5kbGVyKGxhdGxvbiwgbWFya2VyLCByYWRpdXMpIHtcbiAgICAgICAgaWYgKCF2cy5yZWFkeSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB3b3JsZFhZID0gbGF0TG9uVG9Xb3JsZChsYXRsb24ubG9uLCBsYXRsb24ubGF0KTtcbiAgICAgICAgdmFyIGdyaWRYWSA9IHZzLldvcmxkWFl0b0dyaWRYWSh3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgIGlmICh2cy5pc1ZhbGlkWFkoZ3JpZFhZLngsIGdyaWRYWS55LCB0cnVlLCB0cnVlLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBhZGQgY2VudGVyIG1hcmtlciBwb2x5Z29uXG4gICAgICAgICAgICB2YXIgYm94X2ZlYXR1cmUgPSBjcmVhdGVUaWxlRmVhdHVyZSh2cy5HcmlkWFl0b1dvcmxkWFkoZ3JpZFhZLngsIGdyaWRYWS55KSwgc3R5bGUuZ3JlZW4pO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbYm94X2ZlYXR1cmVdKTtcbiAgICAgICAgICAgICAgICBpZiAobWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSkgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9jZW50ZXJfZmVhdHVyZSA9IGJveF9mZWF0dXJlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBleGVjdXRlIHZpc2lvbiBzaW11bGF0aW9uXG4gICAgICAgICAgICB2cy51cGRhdGVWaXNpYmlsaXR5KGdyaWRYWS54LCBncmlkWFkueSwgZ2V0VGlsZVJhZGl1cyhyYWRpdXMpKTtcbiAgICAgICAgICAgIHVwZGF0ZVZpc2libGVBcmVhKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIG1lcmdlIGxpZ2h0IHBvaW50cyBpbnRvIGEgc2luZ2xlIHBvbHlnb24gYW5kIGFkZCB0byB2aXNpb24gbGF5ZXJcbiAgICAgICAgICAgIHZhciBvdXRsaW5lcyA9IGdldExpZ2h0VW5pb24odnMuZ3JpZCwgdnMubGlnaHRzKTtcbiAgICAgICAgICAgIHZhciBwb2x5Z29uTGlzdCA9IG91dGxpbmVzLm1hcChmdW5jdGlvbiAob3V0bGluZVBvaW50cykge1xuICAgICAgICAgICAgICAgIHZhciByaW5nUG9pbnRzID0gb3V0bGluZVBvaW50cy5tYXAoZnVuY3Rpb24gKHB0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3b3JsZFhZID0gdnMuR3JpZFhZdG9Xb3JsZFhZKHB0LngsIHB0LnkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF0bG9uID0gd29ybGRUb0xhdExvbih3b3JsZFhZLngsIHdvcmxkWFkueSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2ludChsYXRsb24ueCwgbGF0bG9uLnkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciByaW5nID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTGluZWFyUmluZyhyaW5nUG9pbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbihbcmluZ10pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbXVsdGlQb2x5Z29uID0gbmV3IE9wZW5MYXllcnMuR2VvbWV0cnkuTXVsdGlQb2x5Z29uKHBvbHlnb25MaXN0KTtcbiAgICAgICAgICAgIHZhciB2aXNpb25GZWF0dXJlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IobXVsdGlQb2x5Z29uLCBudWxsLCBzdHlsZS55ZWxsb3cpO1xuICAgICAgICAgICAgaWYgKG1hcmtlcikge1xuICAgICAgICAgICAgICAgIHZpc2lvblNpbXVsYXRpb25MYXllci5hZGRGZWF0dXJlcyhbdmlzaW9uRmVhdHVyZV0pO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrZXIudmlzaW9uX2ZlYXR1cmUpIG1hcmtlci52aXNpb25fZmVhdHVyZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgbWFya2VyLnZpc2lvbl9mZWF0dXJlID0gdmlzaW9uRmVhdHVyZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnNvckxheWVyLmFkZEZlYXR1cmVzKFt2aXNpb25GZWF0dXJlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXJrZXIpIHtcbiAgICAgICAgICAgICAgICBtYXJrZXIudmlzaW9uX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZWE6IHZzLmFyZWEsXG4gICAgICAgICAgICAgICAgICAgIGxpZ2h0QXJlYTogdnMubGlnaHRBcmVhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZVBvcHVwKG1hcmtlciwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbiAgICB9XG4gICAgXG4gICAgdmFyIHVuaXROYW1lcyA9IHtcbiAgICAgICAgbnBjX2RvdGFfcm9zaGFuX3NwYXduZXI6IFwiUm9zaGFuXCIsXG4gICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfcG93ZXJ1cDogXCJSdW5lXCIsXG4gICAgICAgIGRvdGFfaXRlbV9ydW5lX3NwYXduZXJfYm91bnR5OiBcIkJvdW50eSBSdW5lXCIsXG4gICAgICAgIGVudF9kb3RhX3RyZWU6IFwiVHJlZVwiLFxuICAgICAgICBucGNfZG90YV9oZWFsZXI6IFwiU2hyaW5lXCIsXG4gICAgICAgIGVudF9kb3RhX2ZvdW50YWluOiBcIkZvdW50YWluXCIsXG4gICAgICAgIG5wY19kb3RhX2ZvcnQ6IFwiQW5jaWVudFwiLFxuICAgICAgICBlbnRfZG90YV9zaG9wOiBcIlNob3BcIixcbiAgICAgICAgbnBjX2RvdGFfdG93ZXI6IFwiVG93ZXJcIixcbiAgICAgICAgbnBjX2RvdGFfYmFycmFja3M6IFwiQmFycmFja3NcIixcbiAgICAgICAgbnBjX2RvdGFfZmlsbGVyOiBcIkJ1aWxkaW5nXCIsXG4gICAgICAgIHRyaWdnZXJfbXVsdGlwbGU6IFwiTmV1dHJhbCBDYW1wIFNwYXduIEJveFwiLFxuICAgICAgICBucGNfZG90YV9uZXV0cmFsX3NwYXduZXI6IFwiTmV1dHJhbCBDYW1wXCJcbiAgICB9O1xuICAgICAgICBcbiAgICBmdW5jdGlvbiBnZXRVbml0TmFtZSh1bml0VHlwZSwgdW5pdFN1YlR5cGUpIHtcbiAgICAgICAgY29uc29sZS5sb2codW5pdFR5cGUsIHVuaXRTdWJUeXBlKTtcbiAgICAgICAgcmV0dXJuICh1bml0U3ViVHlwZSA/IGNhcGl0YWxpemUodW5pdFN1YlR5cGUucmVwbGFjZSgndG93ZXInLCAnVGllciAnKS5yZXBsYWNlKCdyYW5nZScsICdSYW5nZWQnKSkgKyAnICcgOiAnJykgKyB1bml0TmFtZXNbdW5pdFR5cGVdO1xuICAgIH1cblxuICAgIHZhciBwdWxsVHlwZXMgPSBbJ05vcm1hbCcsICdGYXN0JywgJ1Nsb3cnXTtcbiAgICB2YXIgbmV1dHJhbFR5cGVzID0gWydFYXN5JywgJ01lZGl1bScsICdIYXJkJywgJ0FuY2llbnQnXTtcbiAgICBmdW5jdGlvbiBnZXRQb3B1cENvbnRlbnQoc3RhdERhdGEsIHVuaXRUeXBlLCB1bml0U3ViVHlwZSwgdW5pdENsYXNzLCBhZGRWaXNpYmxlQXJlYSwgcHVsbFR5cGUsIG5ldXRyYWxUeXBlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdnZXRQb3B1cENvbnRlbnQnLCBwdWxsVHlwZSwgbmV1dHJhbFR5cGUpO1xuICAgICAgICB2YXIgcG9wdXBDb250ZW50SFRNTCA9ICc8Yj4nICsgZ2V0VW5pdE5hbWUodW5pdFR5cGUsIHVuaXRTdWJUeXBlKSArICc8L2I+PGJyPic7XG4gICAgICAgIHZhciBzdGF0cyA9IHN0YXREYXRhW3VuaXRDbGFzc107XG4gICAgICAgIGlmIChzdGF0cykge1xuICAgICAgICAgICAgaWYgKHB1bGxUeXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPlB1bGwgVHlwZTogXCIgKyBwdWxsVHlwZXNbcHVsbFR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ldXRyYWxUeXBlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPkRpZmZpY3VsdHk6IFwiICsgbmV1dHJhbFR5cGVzW25ldXRyYWxUeXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnZGFtYWdlTWluJykgJiYgc3RhdHMuaGFzT3duUHJvcGVydHkoJ2RhbWFnZU1heCcpKSB7XG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5EYW1hZ2U6IFwiICsgc3RhdHMuZGFtYWdlTWluICsgXCImbmRhc2g7XCIgKyBzdGF0cy5kYW1hZ2VNYXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdHMuaGFzT3duUHJvcGVydHkoJ2JhdCcpKSB7XG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5CQVQ6IFwiICsgc3RhdHMuYmF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRzLmhhc093blByb3BlcnR5KCdhdHRhY2tSYW5nZScpKSB7XG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5BdHRhY2sgUmFuZ2U6IFwiICsgc3RhdHMuYXR0YWNrUmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdHMuaGFzT3duUHJvcGVydHkoJ2hlYWx0aCcpKSB7XG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5IZWFsdGg6IFwiICsgc3RhdHMuaGVhbHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRzLmhhc093blByb3BlcnR5KCdhcm1vcicpKSB7XG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50SFRNTCArPSBcIjxicj5Bcm1vcjogXCIgKyBzdGF0cy5hcm1vcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnZGF5VmlzaW9uJykgJiYgc3RhdHMuaGFzT3duUHJvcGVydHkoJ25pZ2h0VmlzaW9uJykpIHtcbiAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnRIVE1MICs9IFwiPGJyPlZpc2lvbjogXCIgKyBzdGF0cy5kYXlWaXNpb24gKyBcIi9cIiArIHN0YXRzLm5pZ2h0VmlzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoYWRkVmlzaWJsZUFyZWEpIHtcbiAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+VmlzaWJsZSBBcmVhOiBcIiArICh2cy5saWdodEFyZWEgLyB2cy5hcmVhICogMTAwKS50b0ZpeGVkKCkgKyAnJSAnICsgdnMubGlnaHRBcmVhICsgXCIvXCIgKyB2cy5hcmVhO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHN0YXRzLmhhc093blByb3BlcnR5KCdkYXlWaXNpb24nKSAmJiBzdGF0cy5oYXNPd25Qcm9wZXJ0eSgnbmlnaHRWaXNpb24nKSkge1xuICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudEhUTUwgKz0gXCI8YnI+PGJyPkNsaWNrIHRvIHZpZXcgcmFuZ2Ugb3ZlcmxheXMuXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBvcHVwQ29udGVudEhUTUw7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBvcHVwKG1hcmtlciwgYWRkVmlzaWJsZUFyZWEpIHtcbiAgICAgICAgY29uc29sZS5sb2cobWFya2VyLnVuaXRDbGFzcywgbWFwX2RhdGEuc3RhdHMpO1xuXG4gICAgICAgIHZhciBwb3B1cENvbnRlbnRIVE1MID0gZ2V0UG9wdXBDb250ZW50KG1hcF9kYXRhLnN0YXRzLCBtYXJrZXIudW5pdFR5cGUsIG1hcmtlci51bml0U3ViVHlwZSwgbWFya2VyLnVuaXRDbGFzcywgYWRkVmlzaWJsZUFyZWEsIG1hcmtlci5wdWxsVHlwZSwgbWFya2VyLm5ldXRyYWxUeXBlKTtcbiAgICAgICAgXG4gICAgICAgIG1hcmtlci5mZWF0dXJlLmRhdGEucG9wdXBDb250ZW50SFRNTCA9IHBvcHVwQ29udGVudEhUTUw7XG4gICAgICAgIGlmIChtYXJrZXIuZmVhdHVyZS5wb3B1cCkge1xuICAgICAgICAgICAgbWFya2VyLmZlYXR1cmUucG9wdXAuc2V0Q29udGVudEhUTUwocG9wdXBDb250ZW50SFRNTCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGFydCB2aXNpb24gc2ltdWxhdGlvbiBhbmQgc3RhcnQgbWFwIGluaXRpYWxpemF0aW9uIGNoZWNrIGluIGNhbGxiYWNrXG4gICAgdmFyIHQxID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgdnMgPSBuZXcgVmlzaW9uU2ltdWxhdGlvbih3b3JsZGRhdGEsIHZpc2lvbl9kYXRhX2ltYWdlX3BhdGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZzIGxvYWRlZCcsIERhdGUubm93KCkgLSB0MSk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdtYXAuZ2V0U2l6ZSgpJywgbWFwLmdldFNpemUoKSk7XG4gICAgICAgIGluaXRDaGVjaygpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIENoZWNrIGlmIG1hcCBpcyByZWFkeSB0byBpbml0aWFsaXplLCBpZiBub3QgcmV0cnlcbiAgICB2YXIgaW5pdENoZWNrQ291bnQgPSAwO1xuICAgIHZhciBtYXhJbml0Q2hlY2tDb3VudCA9IDQwO1xuICAgIGZ1bmN0aW9uIGluaXRDaGVjaygpIHtcbiAgICAgICAgaWYgKG1hcC5nZXRTaXplKCkpIHtcbiAgICAgICAgICAgIGluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGluaXRDaGVja0NvdW50Kys7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWFwIHNpemUgbnVsbCcpO1xuICAgICAgICAgICAgaWYgKGluaXRDaGVja0NvdW50IDwgbWF4SW5pdENoZWNrQ291bnQpIHtcbiAgICAgICAgICAgICAgICBtYXAudXBkYXRlU2l6ZSgpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaW5pdENoZWNrLCAyNTApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9sbGJhci5lcnJvcihcIk1heCBpbml0IGNoZWNrIGV4Y2VlZGVkXCIpO1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBsb2FkaW5nIHRoZSBtYXAuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBkYXRhID0gUXVlcnlTdHJpbmcuZ2V0UGFyYW1ldGVyQnlOYW1lKCdkYXRhJyk7XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGF0YUNvbnRyb2wnKS52YWx1ZSA9IGRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgVklTSU9OX1NJTVVMQVRJT04gPSBkYXRhICE9IFwiNjg3XCI7XG4gICAgICAgIC8vZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWxbZm9yPVwidmlzaW9uU2ltdWxhdGlvbkNvbnRyb2xcIl0nKS5zdHlsZS5kaXNwbGF5ID0gVklTSU9OX1NJTVVMQVRJT04gPyAnaW5saW5lJyA6ICdub25lJztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpb25TaW11bGF0aW9uQ29udHJvbFwiKS5kaXNhYmxlZCA9ICFWSVNJT05fU0lNVUxBVElPTjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHdheXNTaW11bGF0ZUNvbnRyb2xcIikuZGlzYWJsZWQgPSAhVklTSU9OX1NJTVVMQVRJT047XG4gICAgICAgIGdldEpTT04obWFwX2RhdGFfcGF0aCArIGdldERhdGFWZXJzaW9uKCkgKyAnL21hcGRhdGEuanNvbicsIG9uTWFwRGF0YUxvYWQpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRWaXNpb25SYWRpdXMoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzaW9uLXJhZGl1cycpLnZhbHVlIHx8IEVOVElUSUVTLm9ic2VydmVyLnJhZGl1cztcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwOyIsInZhciBtYXBDb25zdGFudHMgPSByZXF1aXJlKCcuL21hcENvbnN0YW50cycpO1xuXG5mdW5jdGlvbiBsZXJwKG1pblZhbCwgbWF4VmFsLCBwb3Nfcikge1xuICAgIHJldHVybiBwb3NfciAqIChtYXhWYWwgLSBtaW5WYWwpICsgbWluVmFsO1xufVxuXG5mdW5jdGlvbiByZXZlcnNlTGVycChtaW5WYWwsIG1heFZhbCwgcG9zKSB7XG4gICAgcmV0dXJuIChwb3MgLSBtaW5WYWwpIC8gKG1heFZhbCAtIG1pblZhbCk7XG59XG5cbmZ1bmN0aW9uIGxhdExvblRvV29ybGQoeCwgeSkge1xuICAgIHZhciB4X3IgPSBsZXJwKG1hcENvbnN0YW50cy5tYXBfeF9ib3VuZGFyaWVzWzBdLCBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1sxXSwgeCAvIG1hcENvbnN0YW50cy5tYXBfdyksXG4gICAgICAgIHlfciA9IGxlcnAobWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMF0sIG1hcENvbnN0YW50cy5tYXBfeV9ib3VuZGFyaWVzWzFdLCAobWFwQ29uc3RhbnRzLm1hcF9oIC0geSkgLyBtYXBDb25zdGFudHMubWFwX2gpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogeF9yLFxuICAgICAgICB5OiB5X3JcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB3b3JsZFRvTGF0TG9uKHhfciwgeV9yKSB7XG4gICAgdmFyIHggPSByZXZlcnNlTGVycChtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0sIHhfcikgKiBtYXBDb25zdGFudHMubWFwX3csXG4gICAgICAgIHkgPSBtYXBDb25zdGFudHMubWFwX2ggLSByZXZlcnNlTGVycChtYXBDb25zdGFudHMubWFwX3lfYm91bmRhcmllc1swXSwgbWFwQ29uc3RhbnRzLm1hcF95X2JvdW5kYXJpZXNbMV0sIHlfcikgKiBtYXBDb25zdGFudHMubWFwX2g7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0VGlsZVJhZGl1cyhyKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KE1hdGguZmxvb3IociAvIDY0KSk7XG59XG5cbmZ1bmN0aW9uIGdldFNjYWxlZFJhZGl1cyhyKSB7XG4gICAgcmV0dXJuIHIgLyAobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0gLSBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSkgKiBtYXBDb25zdGFudHMubWFwX3dcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRGlzdGFuY2Uob3JkZXIsIHVuaXRzLCBtZWFzdXJlKSB7XG4gICAgaWYgKG9yZGVyID09IDEpIHtcbiAgICAgICAgaWYgKHVuaXRzID09IFwia21cIikge1xuICAgICAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGUgKiAxMDAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1lYXN1cmUgKiBtYXBDb25zdGFudHMuc2NhbGU7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbWVhc3VyZSAqIG1hcENvbnN0YW50cy5zY2FsZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxlcnA6IGxlcnAsXG4gICAgcmV2ZXJzZUxlcnA6IHJldmVyc2VMZXJwLFxuICAgIGxhdExvblRvV29ybGQ6IGxhdExvblRvV29ybGQsXG4gICAgd29ybGRUb0xhdExvbjogd29ybGRUb0xhdExvbixcbiAgICBnZXRUaWxlUmFkaXVzOiBnZXRUaWxlUmFkaXVzLFxuICAgIGdldFNjYWxlZFJhZGl1czogZ2V0U2NhbGVkUmFkaXVzLFxuICAgIGNhbGN1bGF0ZURpc3RhbmNlOiBjYWxjdWxhdGVEaXN0YW5jZVxufSIsInZhciBWaXNpb25TaW11bGF0aW9uID0gcmVxdWlyZShcImRvdGEtdmlzaW9uLXNpbXVsYXRpb25cIik7XG52YXIga2V5MnB0ID0gVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUua2V5MnB0O1xudmFyIHh5MmtleSA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MmtleTtcbnZhciB4eTJwdCA9IFZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnh5MnB0O1xuXG5mdW5jdGlvbiBwcm9jZXNzTmVpZ2hib3JzKGdyaWQsIGxpZ2h0cywgY29tcG9uZW50cywga2V5LCBpbmRleCkge1xuICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgIHZhciBkaXJzID0gW1sxLCAwXSwgWzAsIC0xXSwgWy0xLCAwXSwgWzAsIDFdXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFYID0gcHQueCtkaXJzW2ldWzBdO1xuICAgICAgICB2YXIgYVkgPSBwdC55K2RpcnNbaV1bMV07XG4gICAgICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgY29udGludWU7XG4gICAgICAgIHZhciBrZXlBZGogPSBncmlkW2FYXVthWV0ua2V5XG4gICAgICAgIGlmIChjb21wb25lbnRzW2tleUFkal0gfHwgIWxpZ2h0c1trZXlBZGpdKSBjb250aW51ZTtcbiAgICAgICAgY29tcG9uZW50c1trZXlBZGpdID0gaW5kZXg7XG4gICAgICAgIHByb2Nlc3NOZWlnaGJvcnMoZ3JpZCwgbGlnaHRzLCBjb21wb25lbnRzLCBrZXlBZGosIGluZGV4KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldExpZ2h0VW5pb24oZ3JpZCwgbGlnaHRzKSB7XG4gICAgdmFyIGNvbXBvbmVudHMgPSB7fTtcbiAgICB2YXIgaW5kZXggPSAxO1xuICAgIGZvciAodmFyIGtleSBpbiBsaWdodHMpIHtcbiAgICAgICAgaWYgKCFjb21wb25lbnRzW2tleV0pIHtcbiAgICAgICAgICAgIGNvbXBvbmVudHNba2V5XSA9IGluZGV4O1xuICAgICAgICAgICAgcHJvY2Vzc05laWdoYm9ycyhncmlkLCBsaWdodHMsIGNvbXBvbmVudHMsIGtleSwgaW5kZXgpO1xuICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB2YXIgb3V0bGluZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluZGV4OyBpKyspIHtcbiAgICAgICAgb3V0bGluZXMucHVzaChnZXRPdXRsaW5lKGdyaWQsIGNvbXBvbmVudHMsIGkpKVxuICAgIH1cbiAgICByZXR1cm4gb3V0bGluZXM7XG59XG5cbmZ1bmN0aW9uIGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHQsIGRpcikge1xuICAgIHZhciBhWCA9IHB0LngrZGlyWzBdO1xuICAgIHZhciBhWSA9IHB0LnkrZGlyWzFdO1xuICAgIGlmICghZ3JpZFthWF0gfHwgIWdyaWRbYVhdW2FZXSkgcmV0dXJuIHRydWU7XG4gICAgdmFyIGtleUFkaiA9IGdyaWRbYVhdW2FZXS5rZXlcbiAgICByZXR1cm4gIWNvbXBvbmVudHNba2V5QWRqXTtcbn1cblxuZnVuY3Rpb24gbm90U3Vycm91bmRlZChncmlkLCBjb21wb25lbnRzLCBwdCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSs9Mikge1xuICAgICAgICB2YXIgYVggPSBwdC54K01hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgICAgIHZhciBhWSA9IHB0LnkrTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICAgICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSByZXR1cm4gaTtcbiAgICAgICAgdmFyIGtleUFkaiA9IGdyaWRbYVhdW2FZXS5rZXlcbiAgICAgICAgaWYgKCFjb21wb25lbnRzW2tleUFkal0pIHJldHVybiBpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gbW9kKG4sIG0pIHtcbiAgICAgICAgcmV0dXJuICgobiAlIG0pICsgbSkgJSBtO1xufVxuXG5mdW5jdGlvbiBnZXRPdXRsaW5lKGdyaWQsIGNvbXBvbmVudHMsIGluZGV4KSB7XG4gICAgdmFyIG91dGxpbmVQb2ludHMgPSBbXTtcbiAgICB2YXIgc3RhcnRLZXk7XG4gICAgdmFyIGRpciA9IG51bGw7XG4gICAgZm9yICh2YXIga2V5IGluIGNvbXBvbmVudHMpIHtcbiAgICAgICAgdmFyIHB0ID0ga2V5MnB0KGtleSk7XG4gICAgICAgIGRpciA9IG5vdFN1cnJvdW5kZWQoZ3JpZCwgY29tcG9uZW50cywgcHQpO1xuICAgICAgICBpZiAoY29tcG9uZW50c1trZXldID09IGluZGV4ICYmIGRpciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgc3RhcnRLZXkgPSBrZXk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgbmV4dCA9IHByb2Nlc3NOZXh0KGdyaWQsIGNvbXBvbmVudHMsIHN0YXJ0S2V5LCBkaXIpO1xuICAgIHdoaWxlIChzdGFydEtleSAhPT0gbmV4dC5rZXkgfHwgZGlyICE9PSBuZXh0LmRpcikge1xuICAgICAgICBvdXRsaW5lUG9pbnRzLnB1c2gobmV4dC5wb2ludCk7XG4gICAgICAgIG5leHQgPSBwcm9jZXNzTmV4dChncmlkLCBjb21wb25lbnRzLCBuZXh0LmtleSwgbmV4dC5kaXIpO1xuICAgIH1cbiAgICBvdXRsaW5lUG9pbnRzLnB1c2gobmV4dC5wb2ludCk7XG4gICAgcmV0dXJuIG91dGxpbmVQb2ludHM7XG59XG5cbmZ1bmN0aW9uIGNoZWNrQWRqKGdyaWQsIGNvbXBvbmVudHMsIHB0LCBrZXksIGRpciwgaSwgYWRqRGlyKSB7XG4gICAgdmFyIGFYID0gcHQueCtkaXJbMF07XG4gICAgdmFyIGFZID0gcHQueStkaXJbMV07XG4gICAgaWYgKCFncmlkW2FYXSB8fCAhZ3JpZFthWF1bYVldKSByZXR1cm47XG4gICAgdmFyIHB0QWRqID0gZ3JpZFtwdC54K2RpclswXV1bcHQueStkaXJbMV1dO1xuICAgIGlmIChjb21wb25lbnRzW3B0QWRqLmtleV0gPT0gY29tcG9uZW50c1trZXldICYmIGlzU2lkZUZyZWUoZ3JpZCwgY29tcG9uZW50cywgcHRBZGosIGFkakRpcikpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleTogcHRBZGoua2V5LFxuICAgICAgICAgICAgZGlyOiBpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NOZXh0KGdyaWQsIGNvbXBvbmVudHMsIGtleSwgaSkge1xuICAgIHZhciBwdCA9IGtleTJwdChrZXkpO1xuICAgIHZhciBuZXh0O1xuICAgIFxuICAgIHZhciB4ID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGkpKTtcbiAgICB2YXIgeSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBpKSk7XG4gICAgXG4gICAgdmFyIG5JID0gbW9kKGkrMiwgOCk7XG4gICAgdmFyIG5YID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIG5JKSk7XG4gICAgdmFyIG5ZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIG5JKSk7XG4gICAgXG4gICAgdmFyIGJJID0gbW9kKGktMSwgOCk7XG4gICAgdmFyIGJYID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGJJKSk7XG4gICAgdmFyIGJZID0gTWF0aC5yb3VuZChNYXRoLnNpbigyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIGJJKSk7XG5cbiAgICBpZiAoaXNTaWRlRnJlZShncmlkLCBjb21wb25lbnRzLCBwdCwgW25YLCBuWV0pKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGRpcjogbW9kKGkrMiwgOCksXG4gICAgICAgICAgICBwb2ludDogeHkycHQocHQueCtiWC8yLCBwdC55K2JZLzIpXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFuZXh0KSBuZXh0ID0gY2hlY2tBZGooZ3JpZCwgY29tcG9uZW50cywgcHQsIGtleSwgW25YLCBuWV0sIGksIFt4LCB5XSk7XG4gICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHZhciBhSSA9IG1vZChpICsgMSwgOCk7XG4gICAgICAgIHZhciBhWCA9IE1hdGgucm91bmQoTWF0aC5jb3MoMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBhSSkpO1xuICAgICAgICB2YXIgYVkgPSBNYXRoLnJvdW5kKE1hdGguc2luKDIgKiBNYXRoLlBJIC0gTWF0aC5QSS80ICogYUkpKTtcbiAgICAgICAgdmFyIHBJID0gbW9kKGkgLSAyLCA4KTtcbiAgICAgICAgdmFyIHBYID0gTWF0aC5yb3VuZChNYXRoLmNvcygyICogTWF0aC5QSSAtIE1hdGguUEkvNCAqIHBJKSk7XG4gICAgICAgIHZhciBwWSA9IE1hdGgucm91bmQoTWF0aC5zaW4oMiAqIE1hdGguUEkgLSBNYXRoLlBJLzQgKiBwSSkpO1xuICAgICAgICBuZXh0ID0gY2hlY2tBZGooZ3JpZCwgY29tcG9uZW50cywgcHQsIGtleSwgW2FYLCBhWV0sIHBJLCBbcFgsIHBZXSk7XG4gICAgfVxuICAgIGlmIChuZXh0KSB7XG4gICAgICAgIG5leHQucG9pbnQgPSB4eTJwdChwdC54K2JYLzIsIHB0LnkrYlkvMik7XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldExpZ2h0VW5pb247IiwidmFyIG1hcENvbnN0YW50cyA9IHtcbiAgICBtYXBfdzogMTYzODQsXG4gICAgbWFwX2g6IDE2Mzg0LFxuICAgIG1hcF94X2JvdW5kYXJpZXM6IFstODQ3NS41ODYxNzM3NywgOTMyNy40OTEyNDU1OV0sXG4gICAgbWFwX3lfYm91bmRhcmllczogWzkwMjguNTI0NzMzMzIsIC04ODM2LjYxNDA2MjY2XVxufVxubWFwQ29uc3RhbnRzLnNjYWxlID0gTWF0aC5hYnMobWFwQ29uc3RhbnRzLm1hcF94X2JvdW5kYXJpZXNbMV0gLSBtYXBDb25zdGFudHMubWFwX3hfYm91bmRhcmllc1swXSkgLyBtYXBDb25zdGFudHMubWFwX3c7XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ29uc3RhbnRzOyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGxpZ2h0Ymx1ZToge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDA3RkZGXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjJcbiAgICB9LFxuICAgIGRheToge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjZWU5OTAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI2VlOTkwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC4xXG4gICAgfSxcbiAgICBuaWdodDoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDAwMDgwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwN0ZGRlwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC4xXG4gICAgfSxcbiAgICB0cnVlX3NpZ2h0OiB7XG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMwMDdGRkZcIixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMixcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIGZpbGxDb2xvcjogXCIjMDA3RkZGXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjFcbiAgICB9LFxuICAgIHJlZDoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjJcbiAgICB9LFxuICAgIGF0dGFja19yYW5nZToge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkYwMDAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDIsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI0ZGMDAwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMC4xXG4gICAgfSxcbiAgICBncmVlbjoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjMDBGRjAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiIzAwRkYwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjJcbiAgICB9LFxuICAgIHllbGxvdzoge1xuICAgICAgICBzdHJva2VDb2xvcjogXCIjRkZGRjAwXCIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBmaWxsQ29sb3I6IFwiI0ZGRkYwMFwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogLjJcbiAgICB9XG59OyIsImZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfSwgd2FpdCk7XG4gICAgICAgIGlmIChpbW1lZGlhdGUgJiYgIXRpbWVvdXQpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7IiwiZnVuY3Rpb24gZ2V0SlNPTihwYXRoLCBjYWxsYmFjaykge1xuICAgIGNvbnNvbGUubG9nKCdnZXRKU09OJywgcGF0aCk7XG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHJlcXVlc3Qub3BlbignR0VUJywgcGF0aCwgdHJ1ZSk7XG4gICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIGxvYWRpbmcgcGFnZS4nKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGFsZXJ0KCdFcnJvciBsb2FkaW5nIHBhZ2UuJyk7XG4gICAgfTtcbiAgICByZXF1ZXN0LnNlbmQoKTtcbiAgICByZXR1cm4gcmVxdWVzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRKU09OOyIsInZhciB0cmltID0gcmVxdWlyZSgnLi90cmltJyk7XG5cbmZ1bmN0aW9uIGdldFBhcmFtZXRlckJ5TmFtZShuYW1lKSB7XG4gICAgbmFtZSA9IG5hbWUucmVwbGFjZSgvW1xcW10vLCBcIlxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXVwiKTtcbiAgICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKFwiW1xcXFw/Jl1cIiArIG5hbWUgKyBcIj0oW14mI10qKVwiKSxcbiAgICAgICAgcmVzdWx0cyA9IHJlZ2V4LmV4ZWMobG9jYXRpb24uc2VhcmNoKTtcbiAgICByZXR1cm4gcmVzdWx0cyA9PSBudWxsID8gXCJcIiA6IGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xufVxuXG5mdW5jdGlvbiBzZXRRdWVyeVN0cmluZyhrZXksIHZhbHVlKSB7XG4gICAgaWYgKGhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgdmFsdWUpKTtcbn1cblxuZnVuY3Rpb24gYWRkUXVlcnlTdHJpbmdWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ2FkZFF1ZXJ5U3RyaW5nVmFsdWUnLCBrZXksIHZhbHVlKTtcbiAgICB2YXIgcXMgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoa2V5KTtcbiAgICBxcyA9IHRyaW0odHJpbShxcywgJyA7JykgKyAnOycgKyB2YWx1ZSwgJyA7Jyk7XG4gICAgaWYgKGhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgcXMpKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZShrZXksIHZhbHVlKSB7XG4gICAgY29uc29sZS5sb2coJ3JlbW92ZVF1ZXJ5U3RyaW5nVmFsdWUnLCBrZXksIHZhbHVlKTtcbiAgICB2YXIgcXMgPSBnZXRQYXJhbWV0ZXJCeU5hbWUoa2V5KTtcbiAgICBxcyA9IHRyaW0odHJpbShxcywgJyA7JykucmVwbGFjZSh2YWx1ZSwgJycpLnJlcGxhY2UoLzs7L2csICcnKSwgJyA7Jyk7XG4gICAgaWYgKGhpc3RvcnkgJiYgaGlzdG9yeS5yZXBsYWNlU3RhdGUpIGhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIFwiXCIsIHVwZGF0ZVF1ZXJ5U3RyaW5nKGtleSwgcXMgIT0gJycgPyBxcyA6IG51bGwpKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUXVlcnlTdHJpbmcoa2V5LCB2YWx1ZSwgdXJsKSB7XG4gICAgaWYgKCF1cmwpIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoXCIoWz8mXSlcIiArIGtleSArIFwiPS4qPygmfCN8JCkoLiopXCIsIFwiZ2lcIiksXG4gICAgICAgIGhhc2g7XG5cbiAgICBpZiAocmUudGVzdCh1cmwpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlLCAnJDEnICsga2V5ICsgXCI9XCIgKyB2YWx1ZSArICckMiQzJyk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaGFzaCA9IHVybC5zcGxpdCgnIycpO1xuICAgICAgICAgICAgdXJsID0gaGFzaFswXS5yZXBsYWNlKHJlLCAnJDEkMycpLnJlcGxhY2UoLygmfFxcPykkLywgJycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYXNoWzFdICE9PSAndW5kZWZpbmVkJyAmJiBoYXNoWzFdICE9PSBudWxsKVxuICAgICAgICAgICAgICAgIHVybCArPSAnIycgKyBoYXNoWzFdO1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgICAgICB2YXIgc2VwYXJhdG9yID0gdXJsLmluZGV4T2YoJz8nKSAhPT0gLTEgPyAnJicgOiAnPyc7XG4gICAgICAgICAgICBoYXNoID0gdXJsLnNwbGl0KCcjJyk7XG4gICAgICAgICAgICB1cmwgPSBoYXNoWzBdICsgc2VwYXJhdG9yICsga2V5ICsgJz0nICsgdmFsdWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhc2hbMV0gIT09ICd1bmRlZmluZWQnICYmIGhhc2hbMV0gIT09IG51bGwpXG4gICAgICAgICAgICAgICAgdXJsICs9ICcjJyArIGhhc2hbMV07XG4gICAgICAgICAgICByZXR1cm4gdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0UGFyYW1ldGVyQnlOYW1lOiBnZXRQYXJhbWV0ZXJCeU5hbWUsXG4gICAgc2V0UXVlcnlTdHJpbmc6IHNldFF1ZXJ5U3RyaW5nLFxuICAgIGFkZFF1ZXJ5U3RyaW5nVmFsdWU6IGFkZFF1ZXJ5U3RyaW5nVmFsdWUsXG4gICAgcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZTogcmVtb3ZlUXVlcnlTdHJpbmdWYWx1ZSxcbiAgICB1cGRhdGVRdWVyeVN0cmluZzogdXBkYXRlUXVlcnlTdHJpbmdcbn0iLCJmdW5jdGlvbiBlc2NhcGVSZWdleChzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoL1tcXFtcXF0oKXt9PyorXFxeJFxcXFwufFxcLV0vZywgXCJcXFxcJCZcIik7XG59XG5cbnZhciB0cmltID0gZnVuY3Rpb24gdHJpbShzdHIsIGNoYXJhY3RlcnMsIGZsYWdzKSB7XG4gICAgZmxhZ3MgPSBmbGFncyB8fCBcImdcIjtcbiAgICBpZiAodHlwZW9mIHN0ciAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgY2hhcmFjdGVycyAhPT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgZmxhZ3MgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImFyZ3VtZW50IG11c3QgYmUgc3RyaW5nXCIpO1xuICAgIH1cblxuICAgIGlmICghL15bZ2ldKiQvLnRlc3QoZmxhZ3MpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGZsYWdzIHN1cHBsaWVkICdcIiArIGZsYWdzLm1hdGNoKG5ldyBSZWdFeHAoXCJbXmdpXSpcIikpICsgXCInXCIpO1xuICAgIH1cblxuICAgIGNoYXJhY3RlcnMgPSBlc2NhcGVSZWdleChjaGFyYWN0ZXJzKTtcblxuICAgIHJldHVybiBzdHIucmVwbGFjZShuZXcgUmVnRXhwKFwiXltcIiArIGNoYXJhY3RlcnMgKyBcIl0rfFtcIiArIGNoYXJhY3RlcnMgKyBcIl0rJFwiLCBmbGFncyksICcnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdHJpbTsiLCJ2YXIgUE5HID0gcmVxdWlyZSgncG5nLWpzJyk7XG5cbmZ1bmN0aW9uIEltYWdlSGFuZGxlcihpbWFnZVBhdGgpIHtcbiAgICB0aGlzLmltYWdlUGF0aCA9IGltYWdlUGF0aDtcbiAgICBzZWxmLmNhbnZhcyA9IG51bGw7XG4gICAgc2VsZi5wbmcgPSBudWxsO1xufVxuSW1hZ2VIYW5kbGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgc2VsZi5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIFBORy5sb2FkKHRoaXMuaW1hZ2VQYXRoLCBzZWxmLmNhbnZhcywgZnVuY3Rpb24ocG5nKSB7XG4gICAgICAgIHNlbGYucG5nID0gcG5nO1xuICAgICAgICBzZWxmLmN0eCA9IHNlbGYuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbn1cbkltYWdlSGFuZGxlci5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uIChvZmZzZXQsIHdpZHRoLCBoZWlnaHQsIHBpeGVsSGFuZGxlciwgZ3JpZCkge1xuICAgIHZhciBpbWdEYXRhID0gdGhpcy5jdHguZ2V0SW1hZ2VEYXRhKG9mZnNldCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgdmFyIGRhdGEgPSBpbWdEYXRhLmRhdGE7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgdmFyIHIgPSBkYXRhW2ldO1xuICAgICAgICB2YXIgZyA9IGRhdGFbaSsxXTtcbiAgICAgICAgdmFyIGIgPSBkYXRhW2krMl07XG4gICAgICAgIHZhciBhbHBoYSA9IGRhdGFbaSszXTtcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKChpLzQpICUgd2lkdGgpO1xuICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoKGkvNCkgLyBoZWlnaHQpO1xuICAgICAgICBwaXhlbEhhbmRsZXIoeCwgeSwgW3IsIGcsIGJdLCBncmlkKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW1hZ2VIYW5kbGVyOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS40LjBcblxuLypcbiMgTUlUIExJQ0VOU0VcbiMgQ29weXJpZ2h0IChjKSAyMDExIERldm9uIEdvdmV0dFxuIyBcbiMgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIFxuIyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgXG4jIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIFxuIyBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgXG4jIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4jIFxuIyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIFxuIyBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4jIFxuIyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBcbiMgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIFxuIyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBcbiMgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBcbiMgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG52YXIgRmxhdGVTdHJlYW0gPSByZXF1aXJlKCcuL3psaWInKTtcblxuICB2YXIgUE5HO1xuXG4gIFBORyA9IChmdW5jdGlvbigpIHtcbiAgICBQTkcubG9hZCA9IGZ1bmN0aW9uKHVybCwgY2FudmFzLCBjYWxsYmFjaykge1xuICAgICAgdmFyIHhocixcbiAgICAgICAgX3RoaXMgPSB0aGlzO1xuICAgICAgaWYgKHR5cGVvZiBjYW52YXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYW52YXM7XG4gICAgICB9XG4gICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gICAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRhdGEsIHBuZztcbiAgICAgICAgZGF0YSA9IG5ldyBVaW50OEFycmF5KHhoci5yZXNwb25zZSB8fCB4aHIubW96UmVzcG9uc2VBcnJheUJ1ZmZlcik7XG4gICAgICAgIHBuZyA9IG5ldyBQTkcoZGF0YSk7XG4gICAgICAgIGlmICh0eXBlb2YgKGNhbnZhcyAhPSBudWxsID8gY2FudmFzLmdldENvbnRleHQgOiB2b2lkIDApID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcG5nLnJlbmRlcihjYW52YXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiA/IGNhbGxiYWNrKHBuZykgOiB2b2lkIDA7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHhoci5zZW5kKG51bGwpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBQTkcoZGF0YSkge1xuICAgICAgdmFyIGNodW5rU2l6ZSwgY29sb3JzLCBkZWxheURlbiwgZGVsYXlOdW0sIGZyYW1lLCBpLCBpbmRleCwga2V5LCBzZWN0aW9uLCBzaG9ydCwgdGV4dCwgX2ksIF9qLCBfcmVmO1xuICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgIHRoaXMucG9zID0gODtcbiAgICAgIHRoaXMucGFsZXR0ZSA9IFtdO1xuICAgICAgdGhpcy5pbWdEYXRhID0gW107XG4gICAgICB0aGlzLnRyYW5zcGFyZW5jeSA9IHt9O1xuICAgICAgdGhpcy50ZXh0ID0ge307XG4gICAgICBmcmFtZSA9IG51bGw7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjaHVua1NpemUgPSB0aGlzLnJlYWRVSW50MzIoKTtcbiAgICAgICAgc2VjdGlvbiA9ICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIF9pLCBfcmVzdWx0cztcbiAgICAgICAgICBfcmVzdWx0cyA9IFtdO1xuICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgX2kgPCA0OyBpID0gKytfaSkge1xuICAgICAgICAgICAgX3Jlc3VsdHMucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMuZGF0YVt0aGlzLnBvcysrXSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gX3Jlc3VsdHM7XG4gICAgICAgIH0pLmNhbGwodGhpcykpLmpvaW4oJycpO1xuICAgICAgICBzd2l0Y2ggKHNlY3Rpb24pIHtcbiAgICAgICAgICBjYXNlICdJSERSJzpcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSB0aGlzLnJlYWRVSW50MzIoKTtcbiAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5yZWFkVUludDMyKCk7XG4gICAgICAgICAgICB0aGlzLmJpdHMgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmNvbG9yVHlwZSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuY29tcHJlc3Npb25NZXRob2QgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICAgICAgICB0aGlzLmZpbHRlck1ldGhvZCA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJsYWNlTWV0aG9kID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnUExURSc6XG4gICAgICAgICAgICB0aGlzLnBhbGV0dGUgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0lEQVQnOlxuICAgICAgICAgICAgaWYgKHNlY3Rpb24gPT09ICdmZEFUJykge1xuICAgICAgICAgICAgICB0aGlzLnBvcyArPSA0O1xuICAgICAgICAgICAgICBjaHVua1NpemUgLT0gNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEgPSAoZnJhbWUgIT0gbnVsbCA/IGZyYW1lLmRhdGEgOiB2b2lkIDApIHx8IHRoaXMuaW1nRGF0YTtcbiAgICAgICAgICAgIGZvciAoaSA9IF9pID0gMDsgMCA8PSBjaHVua1NpemUgPyBfaSA8IGNodW5rU2l6ZSA6IF9pID4gY2h1bmtTaXplOyBpID0gMCA8PSBjaHVua1NpemUgPyArK19pIDogLS1faSkge1xuICAgICAgICAgICAgICBkYXRhLnB1c2godGhpcy5kYXRhW3RoaXMucG9zKytdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3RSTlMnOlxuICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kgPSB7fTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5jb2xvclR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgICAgICBzaG9ydCA9IDI1NSAtIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChzaG9ydCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoaSA9IF9qID0gMDsgMCA8PSBzaG9ydCA/IF9qIDwgc2hvcnQgOiBfaiA+IHNob3J0OyBpID0gMCA8PSBzaG9ydCA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQucHVzaCgyNTUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwYXJlbmN5LmdyYXlzY2FsZSA9IHRoaXMucmVhZChjaHVua1NpemUpWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc3BhcmVuY3kucmdiID0gdGhpcy5yZWFkKGNodW5rU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0RVh0JzpcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLnJlYWQoY2h1bmtTaXplKTtcbiAgICAgICAgICAgIGluZGV4ID0gdGV4dC5pbmRleE9mKDApO1xuICAgICAgICAgICAga2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIHRleHQuc2xpY2UoMCwgaW5kZXgpKTtcbiAgICAgICAgICAgIHRoaXMudGV4dFtrZXldID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIHRleHQuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdJRU5EJzpcbiAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5mcmFtZXMucHVzaChmcmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbG9ycyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmNvbG9yVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgIHJldHVybiAzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5oYXNBbHBoYUNoYW5uZWwgPSAoX3JlZiA9IHRoaXMuY29sb3JUeXBlKSA9PT0gNCB8fCBfcmVmID09PSA2O1xuICAgICAgICAgICAgY29sb3JzID0gdGhpcy5jb2xvcnMgKyAodGhpcy5oYXNBbHBoYUNoYW5uZWwgPyAxIDogMCk7XG4gICAgICAgICAgICB0aGlzLnBpeGVsQml0bGVuZ3RoID0gdGhpcy5iaXRzICogY29sb3JzO1xuICAgICAgICAgICAgdGhpcy5jb2xvclNwYWNlID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMuY29sb3JzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgcmV0dXJuICdEZXZpY2VHcmF5JztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICByZXR1cm4gJ0RldmljZVJHQic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmltZ0RhdGEgPSBuZXcgVWludDhBcnJheSh0aGlzLmltZ0RhdGEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLnBvcyArPSBjaHVua1NpemU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3MgKz0gNDtcbiAgICAgICAgaWYgKHRoaXMucG9zID4gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkluY29tcGxldGUgb3IgY29ycnVwdCBQTkcgZmlsZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFBORy5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICB2YXIgaSwgX2ksIF9yZXN1bHRzO1xuICAgICAgX3Jlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IF9pID0gMDsgMCA8PSBieXRlcyA/IF9pIDwgYnl0ZXMgOiBfaSA+IGJ5dGVzOyBpID0gMCA8PSBieXRlcyA/ICsrX2kgOiAtLV9pKSB7XG4gICAgICAgIF9yZXN1bHRzLnB1c2godGhpcy5kYXRhW3RoaXMucG9zKytdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfcmVzdWx0cztcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5yZWFkVUludDMyID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjEsIGIyLCBiMywgYjQ7XG4gICAgICBiMSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCAyNDtcbiAgICAgIGIyID0gdGhpcy5kYXRhW3RoaXMucG9zKytdIDw8IDE2O1xuICAgICAgYjMgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK10gPDwgODtcbiAgICAgIGI0ID0gdGhpcy5kYXRhW3RoaXMucG9zKytdO1xuICAgICAgcmV0dXJuIGIxIHwgYjIgfCBiMyB8IGI0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLnJlYWRVSW50MTYgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiMSwgYjI7XG4gICAgICBiMSA9IHRoaXMuZGF0YVt0aGlzLnBvcysrXSA8PCA4O1xuICAgICAgYjIgPSB0aGlzLmRhdGFbdGhpcy5wb3MrK107XG4gICAgICByZXR1cm4gYjEgfCBiMjtcbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5kZWNvZGVQaXhlbHMgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgYnl0ZSwgYywgY29sLCBpLCBsZWZ0LCBsZW5ndGgsIHAsIHBhLCBwYWV0aCwgcGIsIHBjLCBwaXhlbEJ5dGVzLCBwaXhlbHMsIHBvcywgcm93LCBzY2FubGluZUxlbmd0aCwgdXBwZXIsIHVwcGVyTGVmdCwgX2ksIF9qLCBfaywgX2wsIF9tO1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICBkYXRhID0gdGhpcy5pbWdEYXRhO1xuICAgICAgfVxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSgwKTtcbiAgICAgIH1cbiAgICAgIGRhdGEgPSBuZXcgRmxhdGVTdHJlYW0oZGF0YSk7XG4gICAgICBkYXRhID0gZGF0YS5nZXRCeXRlcygpO1xuICAgICAgcGl4ZWxCeXRlcyA9IHRoaXMucGl4ZWxCaXRsZW5ndGggLyA4O1xuICAgICAgc2NhbmxpbmVMZW5ndGggPSBwaXhlbEJ5dGVzICogdGhpcy53aWR0aDtcbiAgICAgIHBpeGVscyA9IG5ldyBVaW50OEFycmF5KHNjYW5saW5lTGVuZ3RoICogdGhpcy5oZWlnaHQpO1xuICAgICAgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICByb3cgPSAwO1xuICAgICAgcG9zID0gMDtcbiAgICAgIGMgPSAwO1xuICAgICAgd2hpbGUgKHBvcyA8IGxlbmd0aCkge1xuICAgICAgICBzd2l0Y2ggKGRhdGFbcG9zKytdKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgZm9yIChpID0gX2kgPSAwOyBfaSA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2kgKz0gMSkge1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZm9yIChpID0gX2ogPSAwOyBfaiA8IHNjYW5saW5lTGVuZ3RoOyBpID0gX2ogKz0gMSkge1xuICAgICAgICAgICAgICBieXRlID0gZGF0YVtwb3MrK107XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IChieXRlICsgbGVmdCkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBmb3IgKGkgPSBfayA9IDA7IF9rIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfayArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIHVwcGVyID0gcm93ICYmIHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAodXBwZXIgKyBieXRlKSAlIDI1NjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGZvciAoaSA9IF9sID0gMDsgX2wgPCBzY2FubGluZUxlbmd0aDsgaSA9IF9sICs9IDEpIHtcbiAgICAgICAgICAgICAgYnl0ZSA9IGRhdGFbcG9zKytdO1xuICAgICAgICAgICAgICBjb2wgPSAoaSAtIChpICUgcGl4ZWxCeXRlcykpIC8gcGl4ZWxCeXRlcztcbiAgICAgICAgICAgICAgbGVmdCA9IGkgPCBwaXhlbEJ5dGVzID8gMCA6IHBpeGVsc1tjIC0gcGl4ZWxCeXRlc107XG4gICAgICAgICAgICAgIHVwcGVyID0gcm93ICYmIHBpeGVsc1socm93IC0gMSkgKiBzY2FubGluZUxlbmd0aCArIGNvbCAqIHBpeGVsQnl0ZXMgKyAoaSAlIHBpeGVsQnl0ZXMpXTtcbiAgICAgICAgICAgICAgcGl4ZWxzW2MrK10gPSAoYnl0ZSArIE1hdGguZmxvb3IoKGxlZnQgKyB1cHBlcikgLyAyKSkgJSAyNTY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBmb3IgKGkgPSBfbSA9IDA7IF9tIDwgc2NhbmxpbmVMZW5ndGg7IGkgPSBfbSArPSAxKSB7XG4gICAgICAgICAgICAgIGJ5dGUgPSBkYXRhW3BvcysrXTtcbiAgICAgICAgICAgICAgY29sID0gKGkgLSAoaSAlIHBpeGVsQnl0ZXMpKSAvIHBpeGVsQnl0ZXM7XG4gICAgICAgICAgICAgIGxlZnQgPSBpIDwgcGl4ZWxCeXRlcyA/IDAgOiBwaXhlbHNbYyAtIHBpeGVsQnl0ZXNdO1xuICAgICAgICAgICAgICBpZiAocm93ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdXBwZXIgPSB1cHBlckxlZnQgPSAwO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHVwcGVyID0gcGl4ZWxzWyhyb3cgLSAxKSAqIHNjYW5saW5lTGVuZ3RoICsgY29sICogcGl4ZWxCeXRlcyArIChpICUgcGl4ZWxCeXRlcyldO1xuICAgICAgICAgICAgICAgIHVwcGVyTGVmdCA9IGNvbCAmJiBwaXhlbHNbKHJvdyAtIDEpICogc2NhbmxpbmVMZW5ndGggKyAoY29sIC0gMSkgKiBwaXhlbEJ5dGVzICsgKGkgJSBwaXhlbEJ5dGVzKV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcCA9IGxlZnQgKyB1cHBlciAtIHVwcGVyTGVmdDtcbiAgICAgICAgICAgICAgcGEgPSBNYXRoLmFicyhwIC0gbGVmdCk7XG4gICAgICAgICAgICAgIHBiID0gTWF0aC5hYnMocCAtIHVwcGVyKTtcbiAgICAgICAgICAgICAgcGMgPSBNYXRoLmFicyhwIC0gdXBwZXJMZWZ0KTtcbiAgICAgICAgICAgICAgaWYgKHBhIDw9IHBiICYmIHBhIDw9IHBjKSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSBsZWZ0O1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBiIDw9IHBjKSB7XG4gICAgICAgICAgICAgICAgcGFldGggPSB1cHBlcjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWV0aCA9IHVwcGVyTGVmdDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwaXhlbHNbYysrXSA9IChieXRlICsgcGFldGgpICUgMjU2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZmlsdGVyIGFsZ29yaXRobTogXCIgKyBkYXRhW3BvcyAtIDFdKTtcbiAgICAgICAgfVxuICAgICAgICByb3crKztcbiAgICAgIH1cbiAgICAgIHJldHVybiBwaXhlbHM7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuZGVjb2RlUGFsZXR0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGMsIGksIGxlbmd0aCwgcGFsZXR0ZSwgcG9zLCByZXQsIHRyYW5zcGFyZW5jeSwgX2ksIF9yZWYsIF9yZWYxO1xuICAgICAgcGFsZXR0ZSA9IHRoaXMucGFsZXR0ZTtcbiAgICAgIHRyYW5zcGFyZW5jeSA9IHRoaXMudHJhbnNwYXJlbmN5LmluZGV4ZWQgfHwgW107XG4gICAgICByZXQgPSBuZXcgVWludDhBcnJheSgodHJhbnNwYXJlbmN5Lmxlbmd0aCB8fCAwKSArIHBhbGV0dGUubGVuZ3RoKTtcbiAgICAgIHBvcyA9IDA7XG4gICAgICBsZW5ndGggPSBwYWxldHRlLmxlbmd0aDtcbiAgICAgIGMgPSAwO1xuICAgICAgZm9yIChpID0gX2kgPSAwLCBfcmVmID0gcGFsZXR0ZS5sZW5ndGg7IF9pIDwgX3JlZjsgaSA9IF9pICs9IDMpIHtcbiAgICAgICAgcmV0W3BvcysrXSA9IHBhbGV0dGVbaV07XG4gICAgICAgIHJldFtwb3MrK10gPSBwYWxldHRlW2kgKyAxXTtcbiAgICAgICAgcmV0W3BvcysrXSA9IHBhbGV0dGVbaSArIDJdO1xuICAgICAgICByZXRbcG9zKytdID0gKF9yZWYxID0gdHJhbnNwYXJlbmN5W2MrK10pICE9IG51bGwgPyBfcmVmMSA6IDI1NTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcblxuICAgIFBORy5wcm90b3R5cGUuY29weVRvSW1hZ2VEYXRhID0gZnVuY3Rpb24oaW1hZ2VEYXRhLCBwaXhlbHMpIHtcbiAgICAgIHZhciBhbHBoYSwgY29sb3JzLCBkYXRhLCBpLCBpbnB1dCwgaiwgaywgbGVuZ3RoLCBwYWxldHRlLCB2LCBfcmVmO1xuICAgICAgY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgICBwYWxldHRlID0gbnVsbDtcbiAgICAgIGFscGhhID0gdGhpcy5oYXNBbHBoYUNoYW5uZWw7XG4gICAgICBpZiAodGhpcy5wYWxldHRlLmxlbmd0aCkge1xuICAgICAgICBwYWxldHRlID0gKF9yZWYgPSB0aGlzLl9kZWNvZGVkUGFsZXR0ZSkgIT0gbnVsbCA/IF9yZWYgOiB0aGlzLl9kZWNvZGVkUGFsZXR0ZSA9IHRoaXMuZGVjb2RlUGFsZXR0ZSgpO1xuICAgICAgICBjb2xvcnMgPSA0O1xuICAgICAgICBhbHBoYSA9IHRydWU7XG4gICAgICB9XG4gICAgICBkYXRhID0gaW1hZ2VEYXRhLmRhdGEgfHwgaW1hZ2VEYXRhO1xuICAgICAgbGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICBpbnB1dCA9IHBhbGV0dGUgfHwgcGl4ZWxzO1xuICAgICAgaSA9IGogPSAwO1xuICAgICAgaWYgKGNvbG9ycyA9PT0gMSkge1xuICAgICAgICB3aGlsZSAoaSA8IGxlbmd0aCkge1xuICAgICAgICAgIGsgPSBwYWxldHRlID8gcGl4ZWxzW2kgLyA0XSAqIDQgOiBqO1xuICAgICAgICAgIHYgPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IHY7XG4gICAgICAgICAgZGF0YVtpKytdID0gdjtcbiAgICAgICAgICBkYXRhW2krK10gPSB2O1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGFscGhhID8gaW5wdXRbaysrXSA6IDI1NTtcbiAgICAgICAgICBqID0gaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGkgPCBsZW5ndGgpIHtcbiAgICAgICAgICBrID0gcGFsZXR0ZSA/IHBpeGVsc1tpIC8gNF0gKiA0IDogajtcbiAgICAgICAgICBkYXRhW2krK10gPSBpbnB1dFtrKytdO1xuICAgICAgICAgIGRhdGFbaSsrXSA9IGlucHV0W2srK107XG4gICAgICAgICAgZGF0YVtpKytdID0gaW5wdXRbaysrXTtcbiAgICAgICAgICBkYXRhW2krK10gPSBhbHBoYSA/IGlucHV0W2srK10gOiAyNTU7XG4gICAgICAgICAgaiA9IGs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgUE5HLnByb3RvdHlwZS5kZWNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXQ7XG4gICAgICByZXQgPSBuZXcgVWludDhBcnJheSh0aGlzLndpZHRoICogdGhpcy5oZWlnaHQgKiA0KTtcbiAgICAgIHRoaXMuY29weVRvSW1hZ2VEYXRhKHJldCwgdGhpcy5kZWNvZGVQaXhlbHMoKSk7XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG5cbiAgICBQTkcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uKGNhbnZhcykge1xuICAgICAgdmFyIGN0eCwgZGF0YTtcbiAgICAgIGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgdGhpcy5jb3B5VG9JbWFnZURhdGEoZGF0YSwgdGhpcy5kZWNvZGVQaXhlbHMoKSk7XG4gICAgICByZXR1cm4gY3R4LnB1dEltYWdlRGF0YShkYXRhLCAwLCAwKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFBORztcblxuICB9KSgpO1xuXG4gIG1vZHVsZS5leHBvcnRzID0gUE5HOyIsIi8qXG4gKiBFeHRyYWN0ZWQgZnJvbSBwZGYuanNcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmRyZWFzZ2FsL3BkZi5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMSBNb3ppbGxhIEZvdW5kYXRpb25cbiAqXG4gKiBDb250cmlidXRvcnM6IEFuZHJlYXMgR2FsIDxnYWxAbW96aWxsYS5jb20+XG4gKiAgICAgICAgICAgICAgIENocmlzIEcgSm9uZXMgPGNqb25lc0Btb3ppbGxhLmNvbT5cbiAqICAgICAgICAgICAgICAgU2hhb24gQmFybWFuIDxzaGFvbi5iYXJtYW5AZ21haWwuY29tPlxuICogICAgICAgICAgICAgICBWaXZpZW4gTmljb2xhcyA8MjFAdmluZ3RldHVuLm9yZz5cbiAqICAgICAgICAgICAgICAgSnVzdGluIEQnQXJjYW5nZWxvIDxqdXN0aW5kYXJjQGdtYWlsLmNvbT5cbiAqICAgICAgICAgICAgICAgWXVyeSBEZWxlbmRpa1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4gKiBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksXG4gKiB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uXG4gKiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSxcbiAqIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZVxuICogU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICogYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTFxuICogVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gKiBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSXG4gKiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4gKi9cblxudmFyIERlY29kZVN0cmVhbSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb3MgPSAwO1xuICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gMDtcbiAgICB0aGlzLmVvZiA9IGZhbHNlO1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHtcbiAgICBlbnN1cmVCdWZmZXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9lbnN1cmVCdWZmZXIocmVxdWVzdGVkKSB7XG4gICAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgICB2YXIgY3VycmVudCA9IGJ1ZmZlciA/IGJ1ZmZlci5ieXRlTGVuZ3RoIDogMDtcbiAgICAgIGlmIChyZXF1ZXN0ZWQgPCBjdXJyZW50KVxuICAgICAgICByZXR1cm4gYnVmZmVyO1xuICAgICAgdmFyIHNpemUgPSA1MTI7XG4gICAgICB3aGlsZSAoc2l6ZSA8IHJlcXVlc3RlZClcbiAgICAgICAgc2l6ZSA8PD0gMTtcbiAgICAgIHZhciBidWZmZXIyID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnQ7ICsraSlcbiAgICAgICAgYnVmZmVyMltpXSA9IGJ1ZmZlcltpXTtcbiAgICAgIHJldHVybiB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjI7XG4gICAgfSxcbiAgICBnZXRCeXRlOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fZ2V0Qnl0ZSgpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuYnVmZmVyW3RoaXMucG9zKytdO1xuICAgIH0sXG4gICAgZ2V0Qnl0ZXM6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9nZXRCeXRlcyhsZW5ndGgpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcblxuICAgICAgaWYgKGxlbmd0aCkge1xuICAgICAgICB0aGlzLmVuc3VyZUJ1ZmZlcihwb3MgKyBsZW5ndGgpO1xuICAgICAgICB2YXIgZW5kID0gcG9zICsgbGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5lb2YgJiYgdGhpcy5idWZmZXJMZW5ndGggPCBlbmQpXG4gICAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcblxuICAgICAgICB2YXIgYnVmRW5kID0gdGhpcy5idWZmZXJMZW5ndGg7XG4gICAgICAgIGlmIChlbmQgPiBidWZFbmQpXG4gICAgICAgICAgZW5kID0gYnVmRW5kO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKCF0aGlzLmVvZilcbiAgICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuXG4gICAgICAgIHZhciBlbmQgPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3MgPSBlbmQ7XG4gICAgICByZXR1cm4gdGhpcy5idWZmZXIuc3ViYXJyYXkocG9zLCBlbmQpO1xuICAgIH0sXG4gICAgbG9va0NoYXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9sb29rQ2hhcigpIHtcbiAgICAgIHZhciBwb3MgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmJ1ZmZlckxlbmd0aCA8PSBwb3MpIHtcbiAgICAgICAgaWYgKHRoaXMuZW9mKVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB0aGlzLnJlYWRCbG9jaygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodGhpcy5idWZmZXJbdGhpcy5wb3NdKTtcbiAgICB9LFxuICAgIGdldENoYXI6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9nZXRDaGFyKCkge1xuICAgICAgdmFyIHBvcyA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuYnVmZmVyTGVuZ3RoIDw9IHBvcykge1xuICAgICAgICBpZiAodGhpcy5lb2YpXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHRoaXMucmVhZEJsb2NrKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0aGlzLmJ1ZmZlclt0aGlzLnBvcysrXSk7XG4gICAgfSxcbiAgICBtYWtlU3ViU3RyZWFtOiBmdW5jdGlvbiBkZWNvZGVzdHJlYW1fbWFrZVN1YnN0cmVhbShzdGFydCwgbGVuZ3RoLCBkaWN0KSB7XG4gICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgICB3aGlsZSAodGhpcy5idWZmZXJMZW5ndGggPD0gZW5kICYmICF0aGlzLmVvZilcbiAgICAgICAgdGhpcy5yZWFkQmxvY2soKTtcbiAgICAgIHJldHVybiBuZXcgU3RyZWFtKHRoaXMuYnVmZmVyLCBzdGFydCwgbGVuZ3RoLCBkaWN0KTtcbiAgICB9LFxuICAgIHNraXA6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9za2lwKG4pIHtcbiAgICAgIGlmICghbilcbiAgICAgICAgbiA9IDE7XG4gICAgICB0aGlzLnBvcyArPSBuO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIGRlY29kZXN0cmVhbV9yZXNldCgpIHtcbiAgICAgIHRoaXMucG9zID0gMDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGNvbnN0cnVjdG9yO1xufSkoKTtcblxudmFyIEZsYXRlU3RyZWFtID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgY29kZUxlbkNvZGVNYXAgPSBuZXcgVWludDMyQXJyYXkoW1xuICAgIDE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVcbiAgXSk7XG5cbiAgdmFyIGxlbmd0aERlY29kZSA9IG5ldyBVaW50MzJBcnJheShbXG4gICAgMHgwMDAwMywgMHgwMDAwNCwgMHgwMDAwNSwgMHgwMDAwNiwgMHgwMDAwNywgMHgwMDAwOCwgMHgwMDAwOSwgMHgwMDAwYSxcbiAgICAweDEwMDBiLCAweDEwMDBkLCAweDEwMDBmLCAweDEwMDExLCAweDIwMDEzLCAweDIwMDE3LCAweDIwMDFiLCAweDIwMDFmLFxuICAgIDB4MzAwMjMsIDB4MzAwMmIsIDB4MzAwMzMsIDB4MzAwM2IsIDB4NDAwNDMsIDB4NDAwNTMsIDB4NDAwNjMsIDB4NDAwNzMsXG4gICAgMHg1MDA4MywgMHg1MDBhMywgMHg1MDBjMywgMHg1MDBlMywgMHgwMDEwMiwgMHgwMDEwMiwgMHgwMDEwMlxuICBdKTtcblxuICB2YXIgZGlzdERlY29kZSA9IG5ldyBVaW50MzJBcnJheShbXG4gICAgMHgwMDAwMSwgMHgwMDAwMiwgMHgwMDAwMywgMHgwMDAwNCwgMHgxMDAwNSwgMHgxMDAwNywgMHgyMDAwOSwgMHgyMDAwZCxcbiAgICAweDMwMDExLCAweDMwMDE5LCAweDQwMDIxLCAweDQwMDMxLCAweDUwMDQxLCAweDUwMDYxLCAweDYwMDgxLCAweDYwMGMxLFxuICAgIDB4NzAxMDEsIDB4NzAxODEsIDB4ODAyMDEsIDB4ODAzMDEsIDB4OTA0MDEsIDB4OTA2MDEsIDB4YTA4MDEsIDB4YTBjMDEsXG4gICAgMHhiMTAwMSwgMHhiMTgwMSwgMHhjMjAwMSwgMHhjMzAwMSwgMHhkNDAwMSwgMHhkNjAwMVxuICBdKTtcblxuICB2YXIgZml4ZWRMaXRDb2RlVGFiID0gW25ldyBVaW50MzJBcnJheShbXG4gICAgMHg3MDEwMCwgMHg4MDA1MCwgMHg4MDAxMCwgMHg4MDExOCwgMHg3MDExMCwgMHg4MDA3MCwgMHg4MDAzMCwgMHg5MDBjMCxcbiAgICAweDcwMTA4LCAweDgwMDYwLCAweDgwMDIwLCAweDkwMGEwLCAweDgwMDAwLCAweDgwMDgwLCAweDgwMDQwLCAweDkwMGUwLFxuICAgIDB4NzAxMDQsIDB4ODAwNTgsIDB4ODAwMTgsIDB4OTAwOTAsIDB4NzAxMTQsIDB4ODAwNzgsIDB4ODAwMzgsIDB4OTAwZDAsXG4gICAgMHg3MDEwYywgMHg4MDA2OCwgMHg4MDAyOCwgMHg5MDBiMCwgMHg4MDAwOCwgMHg4MDA4OCwgMHg4MDA0OCwgMHg5MDBmMCxcbiAgICAweDcwMTAyLCAweDgwMDU0LCAweDgwMDE0LCAweDgwMTFjLCAweDcwMTEyLCAweDgwMDc0LCAweDgwMDM0LCAweDkwMGM4LFxuICAgIDB4NzAxMGEsIDB4ODAwNjQsIDB4ODAwMjQsIDB4OTAwYTgsIDB4ODAwMDQsIDB4ODAwODQsIDB4ODAwNDQsIDB4OTAwZTgsXG4gICAgMHg3MDEwNiwgMHg4MDA1YywgMHg4MDAxYywgMHg5MDA5OCwgMHg3MDExNiwgMHg4MDA3YywgMHg4MDAzYywgMHg5MDBkOCxcbiAgICAweDcwMTBlLCAweDgwMDZjLCAweDgwMDJjLCAweDkwMGI4LCAweDgwMDBjLCAweDgwMDhjLCAweDgwMDRjLCAweDkwMGY4LFxuICAgIDB4NzAxMDEsIDB4ODAwNTIsIDB4ODAwMTIsIDB4ODAxMWEsIDB4NzAxMTEsIDB4ODAwNzIsIDB4ODAwMzIsIDB4OTAwYzQsXG4gICAgMHg3MDEwOSwgMHg4MDA2MiwgMHg4MDAyMiwgMHg5MDBhNCwgMHg4MDAwMiwgMHg4MDA4MiwgMHg4MDA0MiwgMHg5MDBlNCxcbiAgICAweDcwMTA1LCAweDgwMDVhLCAweDgwMDFhLCAweDkwMDk0LCAweDcwMTE1LCAweDgwMDdhLCAweDgwMDNhLCAweDkwMGQ0LFxuICAgIDB4NzAxMGQsIDB4ODAwNmEsIDB4ODAwMmEsIDB4OTAwYjQsIDB4ODAwMGEsIDB4ODAwOGEsIDB4ODAwNGEsIDB4OTAwZjQsXG4gICAgMHg3MDEwMywgMHg4MDA1NiwgMHg4MDAxNiwgMHg4MDExZSwgMHg3MDExMywgMHg4MDA3NiwgMHg4MDAzNiwgMHg5MDBjYyxcbiAgICAweDcwMTBiLCAweDgwMDY2LCAweDgwMDI2LCAweDkwMGFjLCAweDgwMDA2LCAweDgwMDg2LCAweDgwMDQ2LCAweDkwMGVjLFxuICAgIDB4NzAxMDcsIDB4ODAwNWUsIDB4ODAwMWUsIDB4OTAwOWMsIDB4NzAxMTcsIDB4ODAwN2UsIDB4ODAwM2UsIDB4OTAwZGMsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZSwgMHg4MDAyZSwgMHg5MDBiYywgMHg4MDAwZSwgMHg4MDA4ZSwgMHg4MDA0ZSwgMHg5MDBmYyxcbiAgICAweDcwMTAwLCAweDgwMDUxLCAweDgwMDExLCAweDgwMTE5LCAweDcwMTEwLCAweDgwMDcxLCAweDgwMDMxLCAweDkwMGMyLFxuICAgIDB4NzAxMDgsIDB4ODAwNjEsIDB4ODAwMjEsIDB4OTAwYTIsIDB4ODAwMDEsIDB4ODAwODEsIDB4ODAwNDEsIDB4OTAwZTIsXG4gICAgMHg3MDEwNCwgMHg4MDA1OSwgMHg4MDAxOSwgMHg5MDA5MiwgMHg3MDExNCwgMHg4MDA3OSwgMHg4MDAzOSwgMHg5MDBkMixcbiAgICAweDcwMTBjLCAweDgwMDY5LCAweDgwMDI5LCAweDkwMGIyLCAweDgwMDA5LCAweDgwMDg5LCAweDgwMDQ5LCAweDkwMGYyLFxuICAgIDB4NzAxMDIsIDB4ODAwNTUsIDB4ODAwMTUsIDB4ODAxMWQsIDB4NzAxMTIsIDB4ODAwNzUsIDB4ODAwMzUsIDB4OTAwY2EsXG4gICAgMHg3MDEwYSwgMHg4MDA2NSwgMHg4MDAyNSwgMHg5MDBhYSwgMHg4MDAwNSwgMHg4MDA4NSwgMHg4MDA0NSwgMHg5MDBlYSxcbiAgICAweDcwMTA2LCAweDgwMDVkLCAweDgwMDFkLCAweDkwMDlhLCAweDcwMTE2LCAweDgwMDdkLCAweDgwMDNkLCAweDkwMGRhLFxuICAgIDB4NzAxMGUsIDB4ODAwNmQsIDB4ODAwMmQsIDB4OTAwYmEsIDB4ODAwMGQsIDB4ODAwOGQsIDB4ODAwNGQsIDB4OTAwZmEsXG4gICAgMHg3MDEwMSwgMHg4MDA1MywgMHg4MDAxMywgMHg4MDExYiwgMHg3MDExMSwgMHg4MDA3MywgMHg4MDAzMywgMHg5MDBjNixcbiAgICAweDcwMTA5LCAweDgwMDYzLCAweDgwMDIzLCAweDkwMGE2LCAweDgwMDAzLCAweDgwMDgzLCAweDgwMDQzLCAweDkwMGU2LFxuICAgIDB4NzAxMDUsIDB4ODAwNWIsIDB4ODAwMWIsIDB4OTAwOTYsIDB4NzAxMTUsIDB4ODAwN2IsIDB4ODAwM2IsIDB4OTAwZDYsXG4gICAgMHg3MDEwZCwgMHg4MDA2YiwgMHg4MDAyYiwgMHg5MDBiNiwgMHg4MDAwYiwgMHg4MDA4YiwgMHg4MDA0YiwgMHg5MDBmNixcbiAgICAweDcwMTAzLCAweDgwMDU3LCAweDgwMDE3LCAweDgwMTFmLCAweDcwMTEzLCAweDgwMDc3LCAweDgwMDM3LCAweDkwMGNlLFxuICAgIDB4NzAxMGIsIDB4ODAwNjcsIDB4ODAwMjcsIDB4OTAwYWUsIDB4ODAwMDcsIDB4ODAwODcsIDB4ODAwNDcsIDB4OTAwZWUsXG4gICAgMHg3MDEwNywgMHg4MDA1ZiwgMHg4MDAxZiwgMHg5MDA5ZSwgMHg3MDExNywgMHg4MDA3ZiwgMHg4MDAzZiwgMHg5MDBkZSxcbiAgICAweDcwMTBmLCAweDgwMDZmLCAweDgwMDJmLCAweDkwMGJlLCAweDgwMDBmLCAweDgwMDhmLCAweDgwMDRmLCAweDkwMGZlLFxuICAgIDB4NzAxMDAsIDB4ODAwNTAsIDB4ODAwMTAsIDB4ODAxMTgsIDB4NzAxMTAsIDB4ODAwNzAsIDB4ODAwMzAsIDB4OTAwYzEsXG4gICAgMHg3MDEwOCwgMHg4MDA2MCwgMHg4MDAyMCwgMHg5MDBhMSwgMHg4MDAwMCwgMHg4MDA4MCwgMHg4MDA0MCwgMHg5MDBlMSxcbiAgICAweDcwMTA0LCAweDgwMDU4LCAweDgwMDE4LCAweDkwMDkxLCAweDcwMTE0LCAweDgwMDc4LCAweDgwMDM4LCAweDkwMGQxLFxuICAgIDB4NzAxMGMsIDB4ODAwNjgsIDB4ODAwMjgsIDB4OTAwYjEsIDB4ODAwMDgsIDB4ODAwODgsIDB4ODAwNDgsIDB4OTAwZjEsXG4gICAgMHg3MDEwMiwgMHg4MDA1NCwgMHg4MDAxNCwgMHg4MDExYywgMHg3MDExMiwgMHg4MDA3NCwgMHg4MDAzNCwgMHg5MDBjOSxcbiAgICAweDcwMTBhLCAweDgwMDY0LCAweDgwMDI0LCAweDkwMGE5LCAweDgwMDA0LCAweDgwMDg0LCAweDgwMDQ0LCAweDkwMGU5LFxuICAgIDB4NzAxMDYsIDB4ODAwNWMsIDB4ODAwMWMsIDB4OTAwOTksIDB4NzAxMTYsIDB4ODAwN2MsIDB4ODAwM2MsIDB4OTAwZDksXG4gICAgMHg3MDEwZSwgMHg4MDA2YywgMHg4MDAyYywgMHg5MDBiOSwgMHg4MDAwYywgMHg4MDA4YywgMHg4MDA0YywgMHg5MDBmOSxcbiAgICAweDcwMTAxLCAweDgwMDUyLCAweDgwMDEyLCAweDgwMTFhLCAweDcwMTExLCAweDgwMDcyLCAweDgwMDMyLCAweDkwMGM1LFxuICAgIDB4NzAxMDksIDB4ODAwNjIsIDB4ODAwMjIsIDB4OTAwYTUsIDB4ODAwMDIsIDB4ODAwODIsIDB4ODAwNDIsIDB4OTAwZTUsXG4gICAgMHg3MDEwNSwgMHg4MDA1YSwgMHg4MDAxYSwgMHg5MDA5NSwgMHg3MDExNSwgMHg4MDA3YSwgMHg4MDAzYSwgMHg5MDBkNSxcbiAgICAweDcwMTBkLCAweDgwMDZhLCAweDgwMDJhLCAweDkwMGI1LCAweDgwMDBhLCAweDgwMDhhLCAweDgwMDRhLCAweDkwMGY1LFxuICAgIDB4NzAxMDMsIDB4ODAwNTYsIDB4ODAwMTYsIDB4ODAxMWUsIDB4NzAxMTMsIDB4ODAwNzYsIDB4ODAwMzYsIDB4OTAwY2QsXG4gICAgMHg3MDEwYiwgMHg4MDA2NiwgMHg4MDAyNiwgMHg5MDBhZCwgMHg4MDAwNiwgMHg4MDA4NiwgMHg4MDA0NiwgMHg5MDBlZCxcbiAgICAweDcwMTA3LCAweDgwMDVlLCAweDgwMDFlLCAweDkwMDlkLCAweDcwMTE3LCAweDgwMDdlLCAweDgwMDNlLCAweDkwMGRkLFxuICAgIDB4NzAxMGYsIDB4ODAwNmUsIDB4ODAwMmUsIDB4OTAwYmQsIDB4ODAwMGUsIDB4ODAwOGUsIDB4ODAwNGUsIDB4OTAwZmQsXG4gICAgMHg3MDEwMCwgMHg4MDA1MSwgMHg4MDAxMSwgMHg4MDExOSwgMHg3MDExMCwgMHg4MDA3MSwgMHg4MDAzMSwgMHg5MDBjMyxcbiAgICAweDcwMTA4LCAweDgwMDYxLCAweDgwMDIxLCAweDkwMGEzLCAweDgwMDAxLCAweDgwMDgxLCAweDgwMDQxLCAweDkwMGUzLFxuICAgIDB4NzAxMDQsIDB4ODAwNTksIDB4ODAwMTksIDB4OTAwOTMsIDB4NzAxMTQsIDB4ODAwNzksIDB4ODAwMzksIDB4OTAwZDMsXG4gICAgMHg3MDEwYywgMHg4MDA2OSwgMHg4MDAyOSwgMHg5MDBiMywgMHg4MDAwOSwgMHg4MDA4OSwgMHg4MDA0OSwgMHg5MDBmMyxcbiAgICAweDcwMTAyLCAweDgwMDU1LCAweDgwMDE1LCAweDgwMTFkLCAweDcwMTEyLCAweDgwMDc1LCAweDgwMDM1LCAweDkwMGNiLFxuICAgIDB4NzAxMGEsIDB4ODAwNjUsIDB4ODAwMjUsIDB4OTAwYWIsIDB4ODAwMDUsIDB4ODAwODUsIDB4ODAwNDUsIDB4OTAwZWIsXG4gICAgMHg3MDEwNiwgMHg4MDA1ZCwgMHg4MDAxZCwgMHg5MDA5YiwgMHg3MDExNiwgMHg4MDA3ZCwgMHg4MDAzZCwgMHg5MDBkYixcbiAgICAweDcwMTBlLCAweDgwMDZkLCAweDgwMDJkLCAweDkwMGJiLCAweDgwMDBkLCAweDgwMDhkLCAweDgwMDRkLCAweDkwMGZiLFxuICAgIDB4NzAxMDEsIDB4ODAwNTMsIDB4ODAwMTMsIDB4ODAxMWIsIDB4NzAxMTEsIDB4ODAwNzMsIDB4ODAwMzMsIDB4OTAwYzcsXG4gICAgMHg3MDEwOSwgMHg4MDA2MywgMHg4MDAyMywgMHg5MDBhNywgMHg4MDAwMywgMHg4MDA4MywgMHg4MDA0MywgMHg5MDBlNyxcbiAgICAweDcwMTA1LCAweDgwMDViLCAweDgwMDFiLCAweDkwMDk3LCAweDcwMTE1LCAweDgwMDdiLCAweDgwMDNiLCAweDkwMGQ3LFxuICAgIDB4NzAxMGQsIDB4ODAwNmIsIDB4ODAwMmIsIDB4OTAwYjcsIDB4ODAwMGIsIDB4ODAwOGIsIDB4ODAwNGIsIDB4OTAwZjcsXG4gICAgMHg3MDEwMywgMHg4MDA1NywgMHg4MDAxNywgMHg4MDExZiwgMHg3MDExMywgMHg4MDA3NywgMHg4MDAzNywgMHg5MDBjZixcbiAgICAweDcwMTBiLCAweDgwMDY3LCAweDgwMDI3LCAweDkwMGFmLCAweDgwMDA3LCAweDgwMDg3LCAweDgwMDQ3LCAweDkwMGVmLFxuICAgIDB4NzAxMDcsIDB4ODAwNWYsIDB4ODAwMWYsIDB4OTAwOWYsIDB4NzAxMTcsIDB4ODAwN2YsIDB4ODAwM2YsIDB4OTAwZGYsXG4gICAgMHg3MDEwZiwgMHg4MDA2ZiwgMHg4MDAyZiwgMHg5MDBiZiwgMHg4MDAwZiwgMHg4MDA4ZiwgMHg4MDA0ZiwgMHg5MDBmZlxuICBdKSwgOV07XG5cbiAgdmFyIGZpeGVkRGlzdENvZGVUYWIgPSBbbmV3IFVpbnQzMkFycmF5KFtcbiAgICAweDUwMDAwLCAweDUwMDEwLCAweDUwMDA4LCAweDUwMDE4LCAweDUwMDA0LCAweDUwMDE0LCAweDUwMDBjLCAweDUwMDFjLFxuICAgIDB4NTAwMDIsIDB4NTAwMTIsIDB4NTAwMGEsIDB4NTAwMWEsIDB4NTAwMDYsIDB4NTAwMTYsIDB4NTAwMGUsIDB4MDAwMDAsXG4gICAgMHg1MDAwMSwgMHg1MDAxMSwgMHg1MDAwOSwgMHg1MDAxOSwgMHg1MDAwNSwgMHg1MDAxNSwgMHg1MDAwZCwgMHg1MDAxZCxcbiAgICAweDUwMDAzLCAweDUwMDEzLCAweDUwMDBiLCAweDUwMDFiLCAweDUwMDA3LCAweDUwMDE3LCAweDUwMDBmLCAweDAwMDAwXG4gIF0pLCA1XTtcbiAgXG4gIGZ1bmN0aW9uIGVycm9yKGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlKVxuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RydWN0b3IoYnl0ZXMpIHtcbiAgICAvL3ZhciBieXRlcyA9IHN0cmVhbS5nZXRCeXRlcygpO1xuICAgIHZhciBieXRlc1BvcyA9IDA7XG5cbiAgICB2YXIgY21mID0gYnl0ZXNbYnl0ZXNQb3MrK107XG4gICAgdmFyIGZsZyA9IGJ5dGVzW2J5dGVzUG9zKytdO1xuICAgIGlmIChjbWYgPT0gLTEgfHwgZmxnID09IC0xKVxuICAgICAgZXJyb3IoJ0ludmFsaWQgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgIGlmICgoY21mICYgMHgwZikgIT0gMHgwOClcbiAgICAgIGVycm9yKCdVbmtub3duIGNvbXByZXNzaW9uIG1ldGhvZCBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICBpZiAoKCgoY21mIDw8IDgpICsgZmxnKSAlIDMxKSAhPSAwKVxuICAgICAgZXJyb3IoJ0JhZCBGQ0hFQ0sgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgaWYgKGZsZyAmIDB4MjApXG4gICAgICBlcnJvcignRkRJQ1QgYml0IHNldCBpbiBmbGF0ZSBzdHJlYW0nKTtcblxuICAgIHRoaXMuYnl0ZXMgPSBieXRlcztcbiAgICB0aGlzLmJ5dGVzUG9zID0gYnl0ZXNQb3M7XG5cbiAgICB0aGlzLmNvZGVTaXplID0gMDtcbiAgICB0aGlzLmNvZGVCdWYgPSAwO1xuXG4gICAgRGVjb2RlU3RyZWFtLmNhbGwodGhpcyk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKERlY29kZVN0cmVhbS5wcm90b3R5cGUpO1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRCaXRzID0gZnVuY3Rpb24oYml0cykge1xuICAgIHZhciBjb2RlU2l6ZSA9IHRoaXMuY29kZVNpemU7XG4gICAgdmFyIGNvZGVCdWYgPSB0aGlzLmNvZGVCdWY7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcztcbiAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuXG4gICAgdmFyIGI7XG4gICAgd2hpbGUgKGNvZGVTaXplIDwgYml0cykge1xuICAgICAgaWYgKHR5cGVvZiAoYiA9IGJ5dGVzW2J5dGVzUG9zKytdKSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgZXJyb3IoJ0JhZCBlbmNvZGluZyBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGNvZGVCdWYgfD0gYiA8PCBjb2RlU2l6ZTtcbiAgICAgIGNvZGVTaXplICs9IDg7XG4gICAgfVxuICAgIGIgPSBjb2RlQnVmICYgKCgxIDw8IGJpdHMpIC0gMSk7XG4gICAgdGhpcy5jb2RlQnVmID0gY29kZUJ1ZiA+PiBiaXRzO1xuICAgIHRoaXMuY29kZVNpemUgPSBjb2RlU2l6ZSAtPSBiaXRzO1xuICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICByZXR1cm4gYjtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0Q29kZSA9IGZ1bmN0aW9uKHRhYmxlKSB7XG4gICAgdmFyIGNvZGVzID0gdGFibGVbMF07XG4gICAgdmFyIG1heExlbiA9IHRhYmxlWzFdO1xuICAgIHZhciBjb2RlU2l6ZSA9IHRoaXMuY29kZVNpemU7XG4gICAgdmFyIGNvZGVCdWYgPSB0aGlzLmNvZGVCdWY7XG4gICAgdmFyIGJ5dGVzID0gdGhpcy5ieXRlcztcbiAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuXG4gICAgd2hpbGUgKGNvZGVTaXplIDwgbWF4TGVuKSB7XG4gICAgICB2YXIgYjtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgICBjb2RlQnVmIHw9IChiIDw8IGNvZGVTaXplKTtcbiAgICAgIGNvZGVTaXplICs9IDg7XG4gICAgfVxuICAgIHZhciBjb2RlID0gY29kZXNbY29kZUJ1ZiAmICgoMSA8PCBtYXhMZW4pIC0gMSldO1xuICAgIHZhciBjb2RlTGVuID0gY29kZSA+PiAxNjtcbiAgICB2YXIgY29kZVZhbCA9IGNvZGUgJiAweGZmZmY7XG4gICAgaWYgKGNvZGVTaXplID09IDAgfHwgY29kZVNpemUgPCBjb2RlTGVuIHx8IGNvZGVMZW4gPT0gMClcbiAgICAgIGVycm9yKCdCYWQgZW5jb2RpbmcgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgdGhpcy5jb2RlQnVmID0gKGNvZGVCdWYgPj4gY29kZUxlbik7XG4gICAgdGhpcy5jb2RlU2l6ZSA9IChjb2RlU2l6ZSAtIGNvZGVMZW4pO1xuICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICByZXR1cm4gY29kZVZhbDtcbiAgfTtcblxuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2VuZXJhdGVIdWZmbWFuVGFibGUgPSBmdW5jdGlvbihsZW5ndGhzKSB7XG4gICAgdmFyIG4gPSBsZW5ndGhzLmxlbmd0aDtcblxuICAgIC8vIGZpbmQgbWF4IGNvZGUgbGVuZ3RoXG4gICAgdmFyIG1heExlbiA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChsZW5ndGhzW2ldID4gbWF4TGVuKVxuICAgICAgICBtYXhMZW4gPSBsZW5ndGhzW2ldO1xuICAgIH1cblxuICAgIC8vIGJ1aWxkIHRoZSB0YWJsZVxuICAgIHZhciBzaXplID0gMSA8PCBtYXhMZW47XG4gICAgdmFyIGNvZGVzID0gbmV3IFVpbnQzMkFycmF5KHNpemUpO1xuICAgIGZvciAodmFyIGxlbiA9IDEsIGNvZGUgPSAwLCBza2lwID0gMjtcbiAgICAgICAgIGxlbiA8PSBtYXhMZW47XG4gICAgICAgICArK2xlbiwgY29kZSA8PD0gMSwgc2tpcCA8PD0gMSkge1xuICAgICAgZm9yICh2YXIgdmFsID0gMDsgdmFsIDwgbjsgKyt2YWwpIHtcbiAgICAgICAgaWYgKGxlbmd0aHNbdmFsXSA9PSBsZW4pIHtcbiAgICAgICAgICAvLyBiaXQtcmV2ZXJzZSB0aGUgY29kZVxuICAgICAgICAgIHZhciBjb2RlMiA9IDA7XG4gICAgICAgICAgdmFyIHQgPSBjb2RlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIGNvZGUyID0gKGNvZGUyIDw8IDEpIHwgKHQgJiAxKTtcbiAgICAgICAgICAgIHQgPj49IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZmlsbCB0aGUgdGFibGUgZW50cmllc1xuICAgICAgICAgIGZvciAodmFyIGkgPSBjb2RlMjsgaSA8IHNpemU7IGkgKz0gc2tpcClcbiAgICAgICAgICAgIGNvZGVzW2ldID0gKGxlbiA8PCAxNikgfCB2YWw7XG5cbiAgICAgICAgICArK2NvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2NvZGVzLCBtYXhMZW5dO1xuICB9O1xuXG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5yZWFkQmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiByZXBlYXQoc3RyZWFtLCBhcnJheSwgbGVuLCBvZmZzZXQsIHdoYXQpIHtcbiAgICAgIHZhciByZXBlYXQgPSBzdHJlYW0uZ2V0Qml0cyhsZW4pICsgb2Zmc2V0O1xuICAgICAgd2hpbGUgKHJlcGVhdC0tID4gMClcbiAgICAgICAgYXJyYXlbaSsrXSA9IHdoYXQ7XG4gICAgfVxuXG4gICAgLy8gcmVhZCBibG9jayBoZWFkZXJcbiAgICB2YXIgaGRyID0gdGhpcy5nZXRCaXRzKDMpO1xuICAgIGlmIChoZHIgJiAxKVxuICAgICAgdGhpcy5lb2YgPSB0cnVlO1xuICAgIGhkciA+Pj0gMTtcblxuICAgIGlmIChoZHIgPT0gMCkgeyAvLyB1bmNvbXByZXNzZWQgYmxvY2tcbiAgICAgIHZhciBieXRlcyA9IHRoaXMuYnl0ZXM7XG4gICAgICB2YXIgYnl0ZXNQb3MgPSB0aGlzLmJ5dGVzUG9zO1xuICAgICAgdmFyIGI7XG5cbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgdmFyIGJsb2NrTGVuID0gYjtcbiAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgIGVycm9yKCdCYWQgYmxvY2sgaGVhZGVyIGluIGZsYXRlIHN0cmVhbScpO1xuICAgICAgYmxvY2tMZW4gfD0gKGIgPDwgOCk7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIHZhciBjaGVjayA9IGI7XG4gICAgICBpZiAodHlwZW9mIChiID0gYnl0ZXNbYnl0ZXNQb3MrK10pID09ICd1bmRlZmluZWQnKVxuICAgICAgICBlcnJvcignQmFkIGJsb2NrIGhlYWRlciBpbiBmbGF0ZSBzdHJlYW0nKTtcbiAgICAgIGNoZWNrIHw9IChiIDw8IDgpO1xuICAgICAgaWYgKGNoZWNrICE9ICh+YmxvY2tMZW4gJiAweGZmZmYpKVxuICAgICAgICBlcnJvcignQmFkIHVuY29tcHJlc3NlZCBibG9jayBsZW5ndGggaW4gZmxhdGUgc3RyZWFtJyk7XG5cbiAgICAgIHRoaXMuY29kZUJ1ZiA9IDA7XG4gICAgICB0aGlzLmNvZGVTaXplID0gMDtcblxuICAgICAgdmFyIGJ1ZmZlckxlbmd0aCA9IHRoaXMuYnVmZmVyTGVuZ3RoO1xuICAgICAgdmFyIGJ1ZmZlciA9IHRoaXMuZW5zdXJlQnVmZmVyKGJ1ZmZlckxlbmd0aCArIGJsb2NrTGVuKTtcbiAgICAgIHZhciBlbmQgPSBidWZmZXJMZW5ndGggKyBibG9ja0xlbjtcbiAgICAgIHRoaXMuYnVmZmVyTGVuZ3RoID0gZW5kO1xuICAgICAgZm9yICh2YXIgbiA9IGJ1ZmZlckxlbmd0aDsgbiA8IGVuZDsgKytuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGIgPSBieXRlc1tieXRlc1BvcysrXSkgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLmVvZiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyW25dID0gYjtcbiAgICAgIH1cbiAgICAgIHRoaXMuYnl0ZXNQb3MgPSBieXRlc1BvcztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbGl0Q29kZVRhYmxlO1xuICAgIHZhciBkaXN0Q29kZVRhYmxlO1xuICAgIGlmIChoZHIgPT0gMSkgeyAvLyBjb21wcmVzc2VkIGJsb2NrLCBmaXhlZCBjb2Rlc1xuICAgICAgbGl0Q29kZVRhYmxlID0gZml4ZWRMaXRDb2RlVGFiO1xuICAgICAgZGlzdENvZGVUYWJsZSA9IGZpeGVkRGlzdENvZGVUYWI7XG4gICAgfSBlbHNlIGlmIChoZHIgPT0gMikgeyAvLyBjb21wcmVzc2VkIGJsb2NrLCBkeW5hbWljIGNvZGVzXG4gICAgICB2YXIgbnVtTGl0Q29kZXMgPSB0aGlzLmdldEJpdHMoNSkgKyAyNTc7XG4gICAgICB2YXIgbnVtRGlzdENvZGVzID0gdGhpcy5nZXRCaXRzKDUpICsgMTtcbiAgICAgIHZhciBudW1Db2RlTGVuQ29kZXMgPSB0aGlzLmdldEJpdHMoNCkgKyA0O1xuXG4gICAgICAvLyBidWlsZCB0aGUgY29kZSBsZW5ndGhzIGNvZGUgdGFibGVcbiAgICAgIHZhciBjb2RlTGVuQ29kZUxlbmd0aHMgPSBBcnJheShjb2RlTGVuQ29kZU1hcC5sZW5ndGgpO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgd2hpbGUgKGkgPCBudW1Db2RlTGVuQ29kZXMpXG4gICAgICAgIGNvZGVMZW5Db2RlTGVuZ3Roc1tjb2RlTGVuQ29kZU1hcFtpKytdXSA9IHRoaXMuZ2V0Qml0cygzKTtcbiAgICAgIHZhciBjb2RlTGVuQ29kZVRhYiA9IHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbkNvZGVMZW5ndGhzKTtcblxuICAgICAgLy8gYnVpbGQgdGhlIGxpdGVyYWwgYW5kIGRpc3RhbmNlIGNvZGUgdGFibGVzXG4gICAgICB2YXIgbGVuID0gMDtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBjb2RlcyA9IG51bUxpdENvZGVzICsgbnVtRGlzdENvZGVzO1xuICAgICAgdmFyIGNvZGVMZW5ndGhzID0gbmV3IEFycmF5KGNvZGVzKTtcbiAgICAgIHdoaWxlIChpIDwgY29kZXMpIHtcbiAgICAgICAgdmFyIGNvZGUgPSB0aGlzLmdldENvZGUoY29kZUxlbkNvZGVUYWIpO1xuICAgICAgICBpZiAoY29kZSA9PSAxNikge1xuICAgICAgICAgIHJlcGVhdCh0aGlzLCBjb2RlTGVuZ3RocywgMiwgMywgbGVuKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IDE3KSB7XG4gICAgICAgICAgcmVwZWF0KHRoaXMsIGNvZGVMZW5ndGhzLCAzLCAzLCBsZW4gPSAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09IDE4KSB7XG4gICAgICAgICAgcmVwZWF0KHRoaXMsIGNvZGVMZW5ndGhzLCA3LCAxMSwgbGVuID0gMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29kZUxlbmd0aHNbaSsrXSA9IGxlbiA9IGNvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGl0Q29kZVRhYmxlID1cbiAgICAgICAgdGhpcy5nZW5lcmF0ZUh1ZmZtYW5UYWJsZShjb2RlTGVuZ3Rocy5zbGljZSgwLCBudW1MaXRDb2RlcykpO1xuICAgICAgZGlzdENvZGVUYWJsZSA9XG4gICAgICAgIHRoaXMuZ2VuZXJhdGVIdWZmbWFuVGFibGUoY29kZUxlbmd0aHMuc2xpY2UobnVtTGl0Q29kZXMsIGNvZGVzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yKCdVbmtub3duIGJsb2NrIHR5cGUgaW4gZmxhdGUgc3RyZWFtJyk7XG4gICAgfVxuXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHZhciBsaW1pdCA9IGJ1ZmZlciA/IGJ1ZmZlci5sZW5ndGggOiAwO1xuICAgIHZhciBwb3MgPSB0aGlzLmJ1ZmZlckxlbmd0aDtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgdmFyIGNvZGUxID0gdGhpcy5nZXRDb2RlKGxpdENvZGVUYWJsZSk7XG4gICAgICBpZiAoY29kZTEgPCAyNTYpIHtcbiAgICAgICAgaWYgKHBvcyArIDEgPj0gbGltaXQpIHtcbiAgICAgICAgICBidWZmZXIgPSB0aGlzLmVuc3VyZUJ1ZmZlcihwb3MgKyAxKTtcbiAgICAgICAgICBsaW1pdCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgYnVmZmVyW3BvcysrXSA9IGNvZGUxO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjb2RlMSA9PSAyNTYpIHtcbiAgICAgICAgdGhpcy5idWZmZXJMZW5ndGggPSBwb3M7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvZGUxIC09IDI1NztcbiAgICAgIGNvZGUxID0gbGVuZ3RoRGVjb2RlW2NvZGUxXTtcbiAgICAgIHZhciBjb2RlMiA9IGNvZGUxID4+IDE2O1xuICAgICAgaWYgKGNvZGUyID4gMClcbiAgICAgICAgY29kZTIgPSB0aGlzLmdldEJpdHMoY29kZTIpO1xuICAgICAgdmFyIGxlbiA9IChjb2RlMSAmIDB4ZmZmZikgKyBjb2RlMjtcbiAgICAgIGNvZGUxID0gdGhpcy5nZXRDb2RlKGRpc3RDb2RlVGFibGUpO1xuICAgICAgY29kZTEgPSBkaXN0RGVjb2RlW2NvZGUxXTtcbiAgICAgIGNvZGUyID0gY29kZTEgPj4gMTY7XG4gICAgICBpZiAoY29kZTIgPiAwKVxuICAgICAgICBjb2RlMiA9IHRoaXMuZ2V0Qml0cyhjb2RlMik7XG4gICAgICB2YXIgZGlzdCA9IChjb2RlMSAmIDB4ZmZmZikgKyBjb2RlMjtcbiAgICAgIGlmIChwb3MgKyBsZW4gPj0gbGltaXQpIHtcbiAgICAgICAgYnVmZmVyID0gdGhpcy5lbnN1cmVCdWZmZXIocG9zICsgbGVuKTtcbiAgICAgICAgbGltaXQgPSBidWZmZXIubGVuZ3RoO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBsZW47ICsraywgKytwb3MpXG4gICAgICAgIGJ1ZmZlcltwb3NdID0gYnVmZmVyW3BvcyAtIGRpc3RdO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gY29uc3RydWN0b3I7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZsYXRlU3RyZWFtOyIsIi8qXG5cdFRoaXMgaXMgcm90LmpzLCB0aGUgUk9ndWVsaWtlIFRvb2xraXQgaW4gSmF2YVNjcmlwdC5cblx0VmVyc2lvbiAwLjZ+ZGV2LCBnZW5lcmF0ZWQgb24gVHVlIE1hciAxNyAxNjoxNjozMSBDRVQgMjAxNS5cbiovXG4vKipcbiAqIEBuYW1lc3BhY2UgVG9wLWxldmVsIFJPVCBuYW1lc3BhY2VcbiAqL1xudmFyIFJPVCA9IHtcblx0LyoqIERpcmVjdGlvbmFsIGNvbnN0YW50cy4gT3JkZXJpbmcgaXMgaW1wb3J0YW50ISAqL1xuXHRESVJTOiB7XG5cdFx0XCI0XCI6IFtcblx0XHRcdFsgMCwgLTFdLFxuXHRcdFx0WyAxLCAgMF0sXG5cdFx0XHRbIDAsICAxXSxcblx0XHRcdFstMSwgIDBdXG5cdFx0XSxcblx0XHRcIjhcIjogW1xuXHRcdFx0WyAwLCAtMV0sXG5cdFx0XHRbIDEsIC0xXSxcblx0XHRcdFsgMSwgIDBdLFxuXHRcdFx0WyAxLCAgMV0sXG5cdFx0XHRbIDAsICAxXSxcblx0XHRcdFstMSwgIDFdLFxuXHRcdFx0Wy0xLCAgMF0sXG5cdFx0XHRbLTEsIC0xXVxuXHRcdF0sXG5cdFx0XCI2XCI6IFtcblx0XHRcdFstMSwgLTFdLFxuXHRcdFx0WyAxLCAtMV0sXG5cdFx0XHRbIDIsICAwXSxcblx0XHRcdFsgMSwgIDFdLFxuXHRcdFx0Wy0xLCAgMV0sXG5cdFx0XHRbLTIsICAwXVxuXHRcdF1cblx0fVxufTtcbi8qKlxuICogQWx3YXlzIHBvc2l0aXZlIG1vZHVsdXNcbiAqIEBwYXJhbSB7aW50fSBuIE1vZHVsdXNcbiAqIEByZXR1cm5zIHtpbnR9IHRoaXMgbW9kdWxvIG5cbiAqL1xuTnVtYmVyLnByb3RvdHlwZS5tb2QgPSBmdW5jdGlvbihuKSB7XG5cdHJldHVybiAoKHRoaXMlbikrbiklbjtcbn1cbmlmICghT2JqZWN0LmNyZWF0ZSkgeyAgXG5cdC8qKlxuXHQgKiBFUzUgT2JqZWN0LmNyZWF0ZVxuXHQgKi9cblx0T2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKG8pIHsgIFxuXHRcdHZhciB0bXAgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRtcC5wcm90b3R5cGUgPSBvO1xuXHRcdHJldHVybiBuZXcgdG1wKCk7XG5cdH07ICBcbn0gIFxuLyoqXG4gKiBTZXRzIHByb3RvdHlwZSBvZiB0aGlzIGZ1bmN0aW9uIHRvIGFuIGluc3RhbmNlIG9mIHBhcmVudCBmdW5jdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGFyZW50XG4gKi9cbkZ1bmN0aW9uLnByb3RvdHlwZS5leHRlbmQgPSBmdW5jdGlvbihwYXJlbnQpIHtcblx0dGhpcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuXHR0aGlzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHRoaXM7XG5cdHJldHVybiB0aGlzO1xufVxuaWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIikge1xuXHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cblx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG5cdFx0fHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuXHRcdHx8IGZ1bmN0aW9uKGNiKSB7IHJldHVybiBzZXRUaW1lb3V0KGNiLCAxMDAwLzYwKTsgfTtcblxuXHR3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPVxuXHRcdHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWVcblx0XHR8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZVxuXHRcdHx8IGZ1bmN0aW9uKGlkKSB7IHJldHVybiBjbGVhclRpbWVvdXQoaWQpOyB9O1xufVxuLyoqXG4gKiBAY2xhc3MgQWJzdHJhY3QgRk9WIGFsZ29yaXRobVxuICogQHBhcmFtIHtmdW5jdGlvbn0gbGlnaHRQYXNzZXNDYWxsYmFjayBEb2VzIHRoZSBsaWdodCBwYXNzIHRocm91Z2ggeCx5P1xuICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXVxuICogQHBhcmFtIHtpbnR9IFtvcHRpb25zLnRvcG9sb2d5PThdIDQvNi84XG4gKi9cblJPVC5GT1YgPSBmdW5jdGlvbihsaWdodFBhc3Nlc0NhbGxiYWNrLCBvcHRpb25zKSB7XG5cdHRoaXMuX2xpZ2h0UGFzc2VzID0gbGlnaHRQYXNzZXNDYWxsYmFjaztcblx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHR0b3BvbG9neTogOFxuXHR9XG5cdGZvciAodmFyIHAgaW4gb3B0aW9ucykgeyB0aGlzLl9vcHRpb25zW3BdID0gb3B0aW9uc1twXTsgfVxufTtcblxuLyoqXG4gKiBDb21wdXRlIHZpc2liaWxpdHkgZm9yIGEgMzYwLWRlZ3JlZSBjaXJjbGVcbiAqIEBwYXJhbSB7aW50fSB4XG4gKiBAcGFyYW0ge2ludH0geVxuICogQHBhcmFtIHtpbnR9IFIgTWF4aW11bSB2aXNpYmlsaXR5IHJhZGl1c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuUk9ULkZPVi5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKHgsIHksIFIsIGNhbGxiYWNrKSB7fVxuXG4vKipcbiAqIFJldHVybiBhbGwgbmVpZ2hib3JzIGluIGEgY29uY2VudHJpYyByaW5nXG4gKiBAcGFyYW0ge2ludH0gY3ggY2VudGVyLXhcbiAqIEBwYXJhbSB7aW50fSBjeSBjZW50ZXIteVxuICogQHBhcmFtIHtpbnR9IHIgcmFuZ2VcbiAqL1xuUk9ULkZPVi5wcm90b3R5cGUuX2dldENpcmNsZSA9IGZ1bmN0aW9uKGN4LCBjeSwgcikge1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdHZhciBkaXJzLCBjb3VudEZhY3Rvciwgc3RhcnRPZmZzZXQ7XG5cblx0c3dpdGNoICh0aGlzLl9vcHRpb25zLnRvcG9sb2d5KSB7XG5cdFx0Y2FzZSA0OlxuXHRcdFx0Y291bnRGYWN0b3IgPSAxO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbMCwgMV07XG5cdFx0XHRkaXJzID0gW1xuXHRcdFx0XHRST1QuRElSU1s4XVs3XSxcblx0XHRcdFx0Uk9ULkRJUlNbOF1bMV0sXG5cdFx0XHRcdFJPVC5ESVJTWzhdWzNdLFxuXHRcdFx0XHRST1QuRElSU1s4XVs1XVxuXHRcdFx0XVxuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSA2OlxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzZdO1xuXHRcdFx0Y291bnRGYWN0b3IgPSAxO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSA4OlxuXHRcdFx0ZGlycyA9IFJPVC5ESVJTWzRdO1xuXHRcdFx0Y291bnRGYWN0b3IgPSAyO1xuXHRcdFx0c3RhcnRPZmZzZXQgPSBbLTEsIDFdO1xuXHRcdGJyZWFrO1xuXHR9XG5cblx0Lyogc3RhcnRpbmcgbmVpZ2hib3IgKi9cblx0dmFyIHggPSBjeCArIHN0YXJ0T2Zmc2V0WzBdKnI7XG5cdHZhciB5ID0gY3kgKyBzdGFydE9mZnNldFsxXSpyO1xuXG5cdC8qIGNpcmNsZSAqL1xuXHRmb3IgKHZhciBpPTA7aTxkaXJzLmxlbmd0aDtpKyspIHtcblx0XHRmb3IgKHZhciBqPTA7ajxyKmNvdW50RmFjdG9yO2orKykge1xuXHRcdFx0cmVzdWx0LnB1c2goW3gsIHldKTtcblx0XHRcdHggKz0gZGlyc1tpXVswXTtcblx0XHRcdHkgKz0gZGlyc1tpXVsxXTtcblxuXHRcdH1cblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEBjbGFzcyBQcmVjaXNlIHNoYWRvd2Nhc3RpbmcgYWxnb3JpdGhtXG4gKiBAYXVnbWVudHMgUk9ULkZPVlxuICovXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nID0gZnVuY3Rpb24obGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucykge1xuXHRST1QuRk9WLmNhbGwodGhpcywgbGlnaHRQYXNzZXNDYWxsYmFjaywgb3B0aW9ucyk7XG59XG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLmV4dGVuZChST1QuRk9WKTtcblxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuY29tcHV0ZSA9IGZ1bmN0aW9uKHgsIHksIFIsIGNhbGxiYWNrKSB7XG5cdC8qIHRoaXMgcGxhY2UgaXMgYWx3YXlzIHZpc2libGUgKi9cblx0Y2FsbGJhY2soeCwgeSwgMCwgMSk7XG4gICAgXG5cdGNhbGxiYWNrKHgtMSwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeCwgeS0xLCAwLCAxKTtcblx0Y2FsbGJhY2soeCsxLCB5LTEsIDAsIDEpO1xuXHRjYWxsYmFjayh4LTEsIHksIDAsIDEpO1xuXHRjYWxsYmFjayh4KzEsIHksIDAsIDEpO1xuXHRjYWxsYmFjayh4LTEsIHkrMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgsIHkrMSwgMCwgMSk7XG5cdGNhbGxiYWNrKHgrMSwgeSsxLCAwLCAxKTtcbiAgICBcbiAgICBjYWxsYmFjayh4LTEsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCwgeS0yLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzEsIHktMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0yLCB5LTEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgtMiwgeSwgMCwgMSk7XG4gICAgY2FsbGJhY2soeC0yLCB5KzEsIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMiwgeS0xLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzIsIHksIDAsIDEpO1xuICAgIGNhbGxiYWNrKHgrMiwgeSsxLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4LTEsIHkrMiwgMCwgMSk7XG4gICAgY2FsbGJhY2soeCwgeSsyLCAwLCAxKTtcbiAgICBjYWxsYmFjayh4KzEsIHkrMiwgMCwgMSk7XG5cblx0Lyogc3RhbmRpbmcgaW4gYSBkYXJrIHBsYWNlLiBGSVhNRSBpcyB0aGlzIGEgZ29vZCBpZGVhPyAgKi9cblx0aWYgKCF0aGlzLl9saWdodFBhc3Nlcyh4LCB5KSkgeyByZXR1cm47IH1cblx0XG5cdC8qIGxpc3Qgb2YgYWxsIHNoYWRvd3MgKi9cblx0dmFyIFNIQURPV1MgPSBbXTtcblx0dmFyIHRyZWVzID0ge307XG5cdHZhciB0b3RhbE5laWdoYm9yQ291bnQgPSAxO1xuICAgIHZhciBjeCwgY3ksIGJsb2NrcywgQTEsIEEyLCB2aXNpYmlsaXR5LFxuICAgICAgICBkeCwgZHksIGRkLCBhLCBiLCByYWRpdXMsXG4gICAgICAgIGN4MiwgY3kyLCBkZDEsXG4gICAgICAgIG9ic3RhY2xlVHlwZTtcblxuXHQvKiBhbmFseXplIHN1cnJvdW5kaW5nIGNlbGxzIGluIGNvbmNlbnRyaWMgcmluZ3MsIHN0YXJ0aW5nIGZyb20gdGhlIGNlbnRlciAqL1xuXHRmb3IgKHZhciByPTE7IHI8PVI7IHIrKykge1xuXHRcdHZhciBuZWlnaGJvcnMgPSB0aGlzLl9nZXRDaXJjbGUoeCwgeSwgcik7XG5cdFx0dmFyIG5laWdoYm9yQ291bnQgPSBuZWlnaGJvcnMubGVuZ3RoO1xuICAgICAgICB0b3RhbE5laWdoYm9yQ291bnQgKz0gbmVpZ2hib3JDb3VudDtcbiAgICAgICAgdHJlZXMgPSB7fTtcblx0XHRmb3IgKHZhciBpPTA7aTxuZWlnaGJvckNvdW50O2krKykge1xuXHRcdFx0Y3ggPSBuZWlnaGJvcnNbaV1bMF07XG5cdFx0XHRjeSA9IG5laWdoYm9yc1tpXVsxXTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBjeCtcIixcIitjeTtcbiAgICAgICAgICAgIGlmICgoeC1jeCkqKHgtY3gpICsgKHktY3kpKih5LWN5KSA+PSBSICogUikge1xuICAgICAgICAgICAgICAgIHRvdGFsTmVpZ2hib3JDb3VudC0tO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9pZiAoa2V5ID09IFwiNDQsMTAyXCIpIC8vY29uc29sZS5sb2coJ0tFWScsIGtleSwgIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSkpO1xuICAgICAgICAgICAgLy8gaWYgKGtleSA9PSBcIjE1MCwxNjBcIikgLy9jb25zb2xlLmxvZyhrZXksIG9ic3RhY2xlVHlwZSk7XG4gICAgICAgICAgICAvLyBpZiAoa2V5ID09IFwiMTUxLDE2MVwiKSAvL2NvbnNvbGUubG9nKGtleSwgb2JzdGFjbGVUeXBlKTtcbiAgICAgICAgICAgIC8vIGlmIChrZXkgPT0gXCIxNTAsMTYxXCIpIC8vY29uc29sZS5sb2coa2V5LCBvYnN0YWNsZVR5cGUpO1xuICAgICAgICAgICAgdmFyIG9ic3RhY2xlVHlwZXMgPSBvYnN0YWNsZVR5cGVzID0gdGhpcy53YWxsc1trZXldO1xuICAgICAgICAgICAgaWYgKG9ic3RhY2xlVHlwZXMgJiYgb2JzdGFjbGVUeXBlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2tpcFZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9ic3RhY2xlVHlwZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9ic3RhY2xlVHlwZSA9IG9ic3RhY2xlVHlwZXNbal07XG4gICAgICAgICAgICAgICAgICAgIGN4MiA9IG9ic3RhY2xlVHlwZVsxXTtcbiAgICAgICAgICAgICAgICAgICAgY3kyID0gb2JzdGFjbGVUeXBlWzJdO1xuICAgICAgICAgICAgICAgICAgICByYWRpdXMgPSBvYnN0YWNsZVR5cGVbM107XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkeCA9IGN4MiAtIHg7XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgICAgICAgICAgZGQgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrcyA9ICF0aGlzLl9saWdodFBhc3NlcyhjeCwgY3kpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBkeDEgPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkeTEgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZDEgPSBNYXRoLnNxcnQoZHgxICogZHgxICsgZHkxICogZHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkZDEgPCBkZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVzW29ic3RhY2xlVHlwZVsxXStcIixcIitvYnN0YWNsZVR5cGVbMl1dID0gW29ic3RhY2xlVHlwZVsxXSwgb2JzdGFjbGVUeXBlWzJdXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZHggPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkeSA9IGN5IC0geTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYiA9IE1hdGguYXRhbjIoZHksIGR4KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHkgPSB0aGlzLl9jaGVja1Zpc2liaWxpdHkoYiwgQTEsIEEyLCBmYWxzZSwgU0hBRE9XUyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZpc2liaWxpdHkpIHNraXBWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eSAmJiAhc2tpcFZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3gyID0gY3g7XG4gICAgICAgICAgICAgICAgY3kyID0gY3k7XG4gICAgICAgICAgICAgICAgcmFkaXVzID0gTWF0aC5TUVJUMiAvIDI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZHggPSBjeDIgLSB4O1xuICAgICAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgaWYgKGRkID4gMS8yKSB7XG4gICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tzID0gIXRoaXMuX2xpZ2h0UGFzc2VzKGN4LCBjeSk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvKmR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIGlmIChkZCA+IDEvMikge1xuICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgIGIgPSBNYXRoLmF0YW4yKGR5LCBkeCksXG4gICAgICAgICAgICAgICAgQTEgPSBub3JtYWxpemUoYiAtIGEpLFxuICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICBibG9ja3MgPSAhdGhpcy5fbGlnaHRQYXNzZXMoY3gsIGN5KTtcbiAgICAgICAgICAgICAgICBpZiAob2JzdGFjbGVUeXBlICYmIG9ic3RhY2xlVHlwZVswXSA9PSAndHJlZScpIHtcbiAgICAgICAgICAgICAgICAgICAgZHgxID0gY3ggLSB4O1xuICAgICAgICAgICAgICAgICAgICBkeTEgPSBjeSAtIHk7XG4gICAgICAgICAgICAgICAgICAgIGRkMSA9IE1hdGguc3FydChkeDEgKiBkeDEgKyBkeTEgKiBkeTEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGQxIDwgZGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVzW29ic3RhY2xlVHlwZVsxXStcIixcIitvYnN0YWNsZVR5cGVbMl1dID0gW29ic3RhY2xlVHlwZVsxXSwgb2JzdGFjbGVUeXBlWzJdXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZHggPSBjeCAtIHg7XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gY3kgLSB5O1xuICAgICAgICAgICAgICAgICAgICBkZCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgIGEgPSBNYXRoLmFzaW4ocmFkaXVzIC8gZGQpO1xuICAgICAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgICAgICBBMSA9IG5vcm1hbGl6ZShiIC0gYSksXG4gICAgICAgICAgICAgICAgICAgIEEyID0gbm9ybWFsaXplKGIgKyBhKTtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIGZhbHNlLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9pZiAob2JzdGFjbGVUeXBlKSAvL2NvbnNvbGUubG9nKG9ic3RhY2xlVHlwZVswXSwgcmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnQkxPQ0tTJywgY3gsIGN5LCBibG9ja3MsIGIpO1xuICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5ID0gdGhpcy5fY2hlY2tWaXNpYmlsaXR5KGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkpIHsgY2FsbGJhY2soY3gsIGN5LCByLCB2aXNpYmlsaXR5KTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kb25lKSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSovXG5cblx0XHR9IC8qIGZvciBhbGwgY2VsbHMgaW4gdGhpcyByaW5nICovXG4gICAgICAgIFxuICAgICAgICAvLyBhcHBseSB0cmVlIGJsb2NrZXJzXG4gICAgICAgIGZvciAodmFyIGsgaW4gdHJlZXMpIHtcbiAgICAgICAgICAgIC8vLy9jb25zb2xlLmxvZygnYXBwbHkgdHJlZScpO1xuICAgICAgICAgICAgY3gyID0gdHJlZXNba11bMF07XG4gICAgICAgICAgICBjeTIgPSB0cmVlc1trXVsxXTtcbiAgICAgICAgICAgIGR4ID0gY3gyIC0geDtcbiAgICAgICAgICAgIGR5ID0gY3kyIC0geTtcbiAgICAgICAgICAgIGRkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgIHJhZGl1cyA9IE1hdGguU1FSVDIgLSAuMDE7XG4gICAgICAgICAgICBpZiAoZGQgPiAxLzIpIHtcbiAgICAgICAgICAgICAgICBhID0gTWF0aC5hc2luKHJhZGl1cyAvIGRkKTtcbiAgICAgICAgICAgICAgICBiID0gTWF0aC5hdGFuMihkeSwgZHgpLFxuICAgICAgICAgICAgICAgIEExID0gbm9ybWFsaXplKGIgLSBhKSxcbiAgICAgICAgICAgICAgICBBMiA9IG5vcm1hbGl6ZShiICsgYSk7XG4gICAgICAgICAgICAgICAgdmlzaWJpbGl0eSA9IHRoaXMuX2NoZWNrVmlzaWJpbGl0eShiLCBBMSwgQTIsIHRydWUsIFNIQURPV1MpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRvbmUpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXHR9IC8qIGZvciBhbGwgcmluZ3MgKi9cbiAgICBcbiAgICByZXR1cm4gdG90YWxOZWlnaGJvckNvdW50O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW50WzJdfSBBMSBhcmMgc3RhcnRcbiAqIEBwYXJhbSB7aW50WzJdfSBBMiBhcmMgZW5kXG4gKiBAcGFyYW0ge2Jvb2x9IGJsb2NrcyBEb2VzIGN1cnJlbnQgYXJjIGJsb2NrIHZpc2liaWxpdHk/XG4gKiBAcGFyYW0ge2ludFtdW119IFNIQURPV1MgbGlzdCBvZiBhY3RpdmUgc2hhZG93c1xuICovXG5ST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nLnByb3RvdHlwZS5fY2hlY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24oYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpIHtcbiAgICAvLy8vY29uc29sZS5sb2coJ19jaGVja1Zpc2liaWxpdHknLCBiLCBBMSwgQTIsIGJsb2NrcywgU0hBRE9XUyk7XG4gICAgLy8gY2hlY2sgaWYgdGFyZ2V0IGNlbnRlciBpcyBpbnNpZGUgYSBzaGFkb3dcbiAgICB2YXIgdmlzaWJsZSA9ICFibG9ja3M7XG4gICAgLy9jb25zb2xlLmxvZygnX2NoZWNrVmlzaWJpbGl0eScsIGIsIHZpc2libGUpO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IFNIQURPV1MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgb2xkID0gU0hBRE9XU1tpXTtcbiAgICAgICAgaWYgKGlzQmV0d2VlbihiLCBvbGRbMF0sIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgICAgICAgICAvLy8vY29uc29sZS5sb2coJ2Jsb2NrcyBidXQgbm90IHZpc2libGUnLCBTSEFET1dTLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpLCBiLCBKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBub3QgdmlzaWJsZSwgcmV0dXJuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fVxuICAgIFxuICAgIGlmIChibG9ja3MpIHtcbiAgICAgICAgaWYgKEExIDwgMCAmJiBBMiA+PSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzcGxpdHRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMuX21lcmdlU2hhZG93cyhiLCAwLCBBMiwgYmxvY2tzLCBTSEFET1dTKTtcbiAgICAgICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fbWVyZ2VTaGFkb3dzKGIsIEExLCAwLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnbm90IHNwbGl0dGluZycsIGJsb2NrcywgdmlzaWJsZSwgYik7XG4gICAgICAgICAgICB0aGlzLl9tZXJnZVNoYWRvd3MoYiwgQTEsIEEyLCBibG9ja3MsIFNIQURPV1MpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcsIEExLCBBMiwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUyksICFpc0JldHdlZW4oQTEsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pLCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSk7XG4gICAgICAgIGlmIChTSEFET1dTLmxlbmd0aCA9PSAxICYmICghaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSB8fCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSkgJiYgQTEgIT0gU0hBRE9XU1swXVswXSAmJiBBMiAhPSBTSEFET1dTWzBdWzFdICkge1xuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdmlzaWJsZTtcbn1cblxuUk9ULkZPVi5QcmVjaXNlU2hhZG93Y2FzdGluZy5wcm90b3R5cGUuX21lcmdlU2hhZG93cyA9IGZ1bmN0aW9uKGIsIEExLCBBMiwgYmxvY2tzLCBTSEFET1dTKSB7XG4gICAgLy8vL2NvbnNvbGUubG9nKCdtZXJnaW5nJywgYiwgQTEsIEEyKTtcbiAgICAvLyBjaGVjayBpZiB0YXJnZXQgZmlyc3QgZWRnZSBpcyBpbnNpZGUgYSBzaGFkb3cgb3Igd2hpY2ggc2hhZG93cyBpdCBpcyBiZXR3ZWVuXG4gICAgdmFyIGluZGV4MSA9IDAsXG4gICAgICAgIGVkZ2UxID0gZmFsc2UsXG4gICAgICAgIGZpcnN0SW5kZXggPSAwO1xuICAgIHdoaWxlIChpbmRleDEgPCBTSEFET1dTLmxlbmd0aCkge1xuICAgICAgICB2YXIgb2xkID0gU0hBRE9XU1tpbmRleDFdO1xuICAgICAgICBmaXJzdEluZGV4ID0gaW5kZXgxO1xuICAgICAgICBpZiAoaXNCZXR3ZWVuKEExLCBvbGRbMF0sIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGVkZ2UxID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleDEgPiAwICYmIGlzQmV0d2VlbihBMSwgU0hBRE9XU1tpbmRleDEgLSAxXVsxXSwgb2xkWzBdKSkge1xuICAgICAgICAgICAgZWRnZTEgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNCZWZvcmUoQTEsIG9sZFsxXSkpIHtcbiAgICAgICAgICAgIGluZGV4MSsrO1xuICAgICAgICAgICAgZmlyc3RJbmRleCA9IGluZGV4MTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0JlZm9yZShBMSwgb2xkWzBdKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgxKys7XG4gICAgfVxuICAgIFxuICAgIC8vIGNoZWNrIGlmIHRhcmdldCBzZWNvbmQgZWRnZSBpcyBpbnNpZGUgYSBzaGFkb3cgb3Igd2hpY2ggc2hhZG93cyBpdCBpcyBiZXR3ZWVuXG4gICAgdmFyIGluZGV4MiA9IFNIQURPV1MubGVuZ3RoIC0gMSxcbiAgICAgICAgZWRnZTIgPSBmYWxzZSxcbiAgICAgICAgc2Vjb25kSW5kZXggPSAwO1xuICAgIHdoaWxlIChpbmRleDIgPj0gMCkge1xuICAgICAgICB2YXIgb2xkID0gU0hBRE9XU1tpbmRleDJdO1xuICAgICAgICBzZWNvbmRJbmRleCA9IGluZGV4MjtcbiAgICAgICAgLy8vL2NvbnNvbGUubG9nKEEyLCBvbGRbMF0sIG9sZFsxXSwgaXNCZXR3ZWVuKEEyLCBvbGRbMF0sIG9sZFsxXSkpXG4gICAgICAgIGlmIChpc0JldHdlZW4oQTIsIG9sZFswXSwgb2xkWzFdKSkge1xuICAgICAgICAgICAgZWRnZTIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQmVmb3JlKEEyLCBvbGRbMF0pKSB7XG4gICAgICAgICAgICBpbmRleDItLTtcbiAgICAgICAgICAgIHNlY29uZEluZGV4ID0gaW5kZXgyO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0JlZm9yZShBMiwgb2xkWzFdKSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXgyLS07XG4gICAgfVxuICAgIFxuICAgIC8vLy9jb25zb2xlLmxvZyhmaXJzdEluZGV4LCBzZWNvbmRJbmRleCwgZWRnZTEsIGVkZ2UyLCBBMSwgQTIpO1xuICAgIGlmIChmaXJzdEluZGV4ID09IFNIQURPV1MubGVuZ3RoICYmICFlZGdlMSAmJiBzZWNvbmRJbmRleCA9PSAwICYmIGVkZ2UyKSBmaXJzdEluZGV4ID0gMDtcbiAgICAvL2lmIChzZWNvbmRJbmRleCA9PSAtMSkgc2Vjb25kSW5kZXggPSBTSEFET1dTLmxlbmd0aCAtIDE7XG4gICAgLy9jb25zb2xlLmxvZyhmaXJzdEluZGV4LCBzZWNvbmRJbmRleCwgZWRnZTEsIGVkZ2UyLCBBMSwgQTIpO1xuICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgIGlmIChTSEFET1dTLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ2VtcHR5IHNoYWRvd3MgcHVzaGluZycsIFtBMSwgQTJdKTtcbiAgICAgICAgU0hBRE9XUy5wdXNoKFtBMSwgQTJdKTtcbiAgICB9XG4gICAgLyplbHNlIGlmIChTSEFET1dTLmxlbmd0aCA+IDEgJiYgZmlyc3RJbmRleCA9PSBTSEFET1dTLmxlbmd0aCAmJiBzZWNvbmRJbmRleCA9PSAwICYmICFlZGdlMSAmJiBlZGdlMikge1xuICAgIFxuICAgIH0qL1xuICAgIGVsc2Uge1xuICAgICAgICB2YXIgbmV3X3NoYWRvdyA9IFtlZGdlMSA/IFNIQURPV1NbZmlyc3RJbmRleF1bMF0gOiBBMSwgZWRnZTIgPyBTSEFET1dTW3NlY29uZEluZGV4XVsxXSA6IEEyXTtcbiAgICAgICAgLy9jb25zb2xlLmxvZygnbmV3X3NoYWRvdycsIG5ld19zaGFkb3cpO1xuICAgICAgICBzZWNvbmRJbmRleCA9IE1hdGgubWF4KGZpcnN0SW5kZXgsIHNlY29uZEluZGV4KTtcbiAgICAgICAgdmFyIHN1bTEgPSBkaWZmX3N1bShTSEFET1dTKTtcbiAgICAgICAgdmFyIGRvU2hpZnQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlzQmV0d2VlbigwLCBuZXdfc2hhZG93WzBdLCBuZXdfc2hhZG93WzFdKSAmJiBuZXdfc2hhZG93WzBdICE9IDAgJiYgbmV3X3NoYWRvd1sxXSAhPSAwKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdjcm9zc2VzIDAnKTtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGZpcnN0SW5kZXgsIGZpcnN0SW5kZXggPT0gc2Vjb25kSW5kZXggJiYgZWRnZTEgPT0gZWRnZTIgJiYgIWVkZ2UxID8gMCA6IHNlY29uZEluZGV4IC0gZmlyc3RJbmRleCArIDEsIFtuZXdfc2hhZG93WzBdLCAwXSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFtuZXdfc2hhZG93WzBdLCAwXSwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgaWYgKFNIQURPV1NbMF1bMF0gIT0gMCAmJiBTSEFET1dTWzBdWzFdICE9IG5ld19zaGFkb3dbMV0pIHtcbiAgICAgICAgICAgICAgICBTSEFET1dTLnNwbGljZShmaXJzdEluZGV4ICsgMSwgMCwgWzAsIG5ld19zaGFkb3dbMV1dKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFswLCBuZXdfc2hhZG93WzFdXSwgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShTSEFET1dTKSk7XG4gICAgICAgICAgICBkb1NoaWZ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFNIQURPV1Muc3BsaWNlKGZpcnN0SW5kZXgsIGZpcnN0SW5kZXggPT0gc2Vjb25kSW5kZXggJiYgZWRnZTEgPT0gZWRnZTIgJiYgIWVkZ2UxID8gMCA6IHNlY29uZEluZGV4IC0gZmlyc3RJbmRleCArIDEsIG5ld19zaGFkb3cpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdW0yID0gZGlmZl9zdW0oU0hBRE9XUyk7XG4gICAgICAgIC8vY29uc29sZS5sb2coJ3N1bTEnLCBzdW0xLCAnc3VtMicsIHN1bTIsIHN1bTIgPCBzdW0xLCBTSEFET1dTLmxlbmd0aCA9PSAxICYmICghaXNCZXR3ZWVuKEExLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSB8fCAhaXNCZXR3ZWVuKEEyLCBTSEFET1dTWzBdWzBdLCBTSEFET1dTWzBdWzFdKSkpO1xuICAgICAgICBpZiAoc3VtMiA8IHN1bTEpIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIC8qaWYgKFNIQURPV1MubGVuZ3RoID09IDEgJiYgKCFpc0JldHdlZW4oQTEsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pIHx8ICFpc0JldHdlZW4oQTIsIFNIQURPV1NbMF1bMF0sIFNIQURPV1NbMF1bMV0pKSkge1xuICAgICAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgfSovXG4gICAgICAgIGlmIChuZXdfc2hhZG93WzBdID09IDAgfHwgZG9TaGlmdCkge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NoaWZ0aW5nJyk7XG4gICAgICAgICAgICB3aGlsZSAoU0hBRE9XU1swXVswXSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgU0hBRE9XUy5wdXNoKFNIQURPV1Muc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID49IFNIQURPV1MubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW5kIHNoaWZ0aW5nJywgSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICB9XG4gICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoU0hBRE9XUykpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRpZmZfc3VtKFNIQURPV1MpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzQmVmb3JlKEExLCBBMikge1xuICAgIGlmIChBMSA+IDAgJiYgQTIgPCAwKSB7IC8vIEExIGluIGJvdHRvbSBoYWxmLCBBMiBpbiB0b3AgaGFsZlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoQTIgPiAwICYmIEExIDwgMCkgeyAvLyBBMSBpbiB0b3AgaGFsZiwgQTIgaW4gYm90dG9tIGhhbGZcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEExIDwgQTI7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0FmdGVyKEExLCBBMikge1xuICAgIHJldHVybiAhaXNCZWZvcmUoQTEsIEEyKTtcbn1cblxuZnVuY3Rpb24gaXNCZXR3ZWVuKGIsIEExLCBBMikge1xuICAgIGlmIChBMSA8IEEyKSB7XG4gICAgICAgIHJldHVybiAoKEExIDw9IGIpICYmIChiIDw9IEEyKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKChBMSA8PSBiKSAmJiAoYiA8PSBNYXRoLlBJKSkgfHwgKCgtTWF0aC5QSSA8PSBiKSAmJiAoYiA8PSBBMikpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHgpIHtcbiAgICBpZiAoeCA+IE1hdGguUEkpIHtcbiAgICAgICAgcmV0dXJuIC0oMiAqIE1hdGguUEkgLSB4KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoIHggPCAtTWF0aC5QSSkge1xuICAgICAgICByZXR1cm4gMiAqIE1hdGguUEkgKyB4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaWZmKEExLCBBMikge1xuICAgIGlmIChBMSA+IDAgJiYgQTIgPCAwKSB7IC8vIEExIGluIGJvdHRvbSBoYWxmLCBBMiBpbiB0b3AgaGFsZlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKE1hdGguUEkgLSBBMSkgLSAoLU1hdGguUEkgLSBBMikpO1xuICAgIH1cbiAgICBlbHNlIGlmIChBMiA+IDAgJiYgQTEgPCAwKSB7IC8vIEExIGluIHRvcCBoYWxmLCBBMiBpbiBib3R0b20gaGFsZlxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoLUExICsgQTIpO1xuICAgIH1cbiAgICBpZiAoQTEgPD0gMCAmJiBBMiA8PSAwKSB7IC8vIEExLEEyIGluIGJvdHRvbSBoYWxmXG4gICAgICAgIGlmIChpc0FmdGVyKEExLCBBMikpIHsgLy8gQTEgYWZ0ZXIgQTJcbiAgICAgICAgICAgIHJldHVybiAtQTEgKyBNYXRoLlBJIC0gKC1NYXRoLlBJIC0gQTIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5hYnMoQTIgLSBBMSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChpc0FmdGVyKEExLCBBMikpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLlBJICsgKE1hdGguUEkgLSBBMSkgKyBBMlxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKEEyIC0gQTEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaWZmX3N1bShTSEFET1dTKSB7XG4gICAgdmFyIHN1bSA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTSEFET1dTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vLy9jb25zb2xlLmxvZyhTSEFET1dTW2ldWzBdLCBTSEFET1dTW2ldWzFdLCBkaWZmKFNIQURPV1NbaV1bMF0sIFNIQURPV1NbaV1bMV0pKTtcbiAgICAgICAgc3VtICs9IGRpZmYoU0hBRE9XU1tpXVswXSwgU0hBRE9XU1tpXVsxXSk7XG4gICAgfVxuICAgIHJldHVybiBzdW07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUk9UOyIsInZhciBJbWFnZUhhbmRsZXIgPSByZXF1aXJlKFwiLi9pbWFnZUhhbmRsZXIuanNcIik7XG52YXIgUk9UID0gcmVxdWlyZShcIi4vcm90Ni5qc1wiKTtcblxudmFyIGtleTJwdF9jYWNoZSA9IHt9O1xuZnVuY3Rpb24ga2V5MnB0KGtleSkge1xuICAgIGlmIChrZXkgaW4ga2V5MnB0X2NhY2hlKSByZXR1cm4ga2V5MnB0X2NhY2hlW2tleV07XG4gICAgdmFyIHAgPSBrZXkuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKGMpIHsgcmV0dXJuIHBhcnNlSW50KGMpIH0pO1xuICAgIHZhciBwdCA9IHt4OiBwWzBdLCB5OiBwWzFdLCBrZXk6IGtleX07XG4gICAga2V5MnB0X2NhY2hlW2tleV0gPSBwdDtcbiAgICByZXR1cm4gcHQ7XG59XG5cbmZ1bmN0aW9uIHh5MmtleSh4LCB5KSB7XG4gICAgcmV0dXJuIHggKyBcIixcIiArIHk7XG59XG5cbmZ1bmN0aW9uIHh5MnB0KHgsIHkpIHtcbiAgICByZXR1cm4ge3g6IHgsIHk6IHksIGtleTogeCArIFwiLFwiICsgeX07XG59XG5cbmZ1bmN0aW9uIHB0MmtleShwdCkge1xuICAgIHJldHVybiBwdC54ICsgXCIsXCIgKyBwdC55O1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUVsZXZhdGlvbldhbGxzKGRhdGEsIGVsZXZhdGlvbikge1xuICAgIHZhciB0MSA9IERhdGUubm93KCk7XG4gICAgdmFyIHdhbGxzID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgdmFyIHB0ID0gZGF0YVtrZXldO1xuICAgICAgICBpZiAocHQueiA+IGVsZXZhdGlvbikge1xuICAgICAgICAgICAgYWRqTG9vcDpcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8PSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gLTE7IGogPD0gMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgwICE9PSBpIHx8IDAgIT09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrID0gKHB0LnggKyBpKSArIFwiLFwiICsgKHB0LnkgKyBqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2tdICYmIGRhdGFba10ueiA8PSBlbGV2YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxsc1twdC5rZXldID0gcHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgYWRqTG9vcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zb2xlLmxvZygnZ2VuZXJhdGVFbGV2YXRpb25XYWxscycsIERhdGUubm93KCkgLSB0MSArICdtcycpO1xuICAgIHJldHVybiB3YWxscztcbn1cblxuZnVuY3Rpb24gc2V0RWxldmF0aW9uV2FsbHMob2JqLCBkYXRhLCBlbGV2YXRpb24pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFbZWxldmF0aW9uXS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZWwgPSBkYXRhW2VsZXZhdGlvbl1baV07XG4gICAgICAgIG9ialtlbFsxXSArIFwiLFwiICsgZWxbMl1dID0gZWw7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRXYWxscyhvYmosIGRhdGEsIGlkLCByKSB7XG4gICAgaWQgPSBpZCB8fCAnd2FsbCc7XG4gICAgciA9IHIgfHwgKE1hdGguU1FSVDIgLyAyKTtcbiAgICBmb3IgKHZhciBpIGluIGRhdGEpIHtcbiAgICAgICAgb2JqW2ldID0gW2lkLCBkYXRhW2ldLngsIGRhdGFbaV0ueSwgcl07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRUcmVlV2FsbHMob2JqLCBlbGV2YXRpb24sIHRyZWUsIHRyZWVfZWxldmF0aW9ucywgdHJlZV9zdGF0ZSwgdHJlZV9ibG9ja3MpIHtcbiAgICBmb3IgKHZhciBpIGluIHRyZWUpIHtcbiAgICAgICAgaWYgKGVsZXZhdGlvbiA8IHRyZWVfZWxldmF0aW9uc1tpXSkge1xuICAgICAgICAgICAgaWYgKHRyZWVfc3RhdGVbaV0pIHtcbiAgICAgICAgICAgICAgICAvL29ialtpXSA9IFsndHJlZScsIHRyZWVbaV0ueCwgdHJlZVtpXS55LCBNYXRoLlNRUlQyXTtcbiAgICAgICAgICAgICAgICB0cmVlX2Jsb2Nrc1tpXS5mb3JFYWNoKGZ1bmN0aW9uIChwdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgayA9IHB0LnggKyBcIixcIiArIHB0Lnk7XG4gICAgICAgICAgICAgICAgICAgIG9ialtrXSA9IChvYmpba10gfHwgW10pLmNvbmNhdChbWyd0cmVlJywgdHJlZVtpXS54LCB0cmVlW2ldLnksIE1hdGguU1FSVDJdXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIFZpc2lvblNpbXVsYXRpb24od29ybGRkYXRhLCBtYXBEYXRhSW1hZ2VQYXRoLCBvblJlYWR5LCBvcHRzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIHRoaXMub3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5ncmlkbmF2ID0gbnVsbDtcbiAgICB0aGlzLmVudF9mb3dfYmxvY2tlcl9ub2RlID0gbnVsbDtcbiAgICB0aGlzLnRvb2xzX25vX3dhcmRzID0gbnVsbDtcbiAgICB0aGlzLmVsZXZhdGlvblZhbHVlcyA9IFtdO1xuICAgIHRoaXMuZWxldmF0aW9uR3JpZCA9IG51bGw7XG4gICAgdGhpcy5lbGV2YXRpb25XYWxscyA9IHt9O1xuICAgIHRoaXMudHJlZVdhbGxzID0ge307XG4gICAgdGhpcy50cmVlID0ge307IC8vIGNlbnRlciBrZXkgdG8gcG9pbnQgbWFwXG4gICAgdGhpcy50cmVlX2Jsb2NrcyA9IHt9OyAvLyBjZW50ZXIgdG8gY29ybmVycyBtYXBcbiAgICB0aGlzLnRyZWVfcmVsYXRpb25zID0ge307IC8vIGNvcm5lciB0byBjZW50ZXIgbWFwXG4gICAgdGhpcy50cmVlX2VsZXZhdGlvbnMgPSB7fTtcbiAgICB0aGlzLnRyZWVfc3RhdGUgPSB7fTtcbiAgICB0aGlzLndhbGxzID0ge307XG4gICAgdGhpcy5yYWRpdXMgPSB0aGlzLm9wdHMucmFkaXVzIHx8IHBhcnNlSW50KDE2MDAgLyA2NCk7XG4gICAgdGhpcy5saWdodHMgPSB7fTtcbiAgICB0aGlzLndvcmxkTWluWCA9IHdvcmxkZGF0YS53b3JsZE1pblg7XG4gICAgdGhpcy53b3JsZE1pblkgPSB3b3JsZGRhdGEud29ybGRNaW5ZO1xuICAgIHRoaXMud29ybGRNYXhYID0gd29ybGRkYXRhLndvcmxkTWF4WDtcbiAgICB0aGlzLndvcmxkTWF4WSA9IHdvcmxkZGF0YS53b3JsZE1heFk7XG4gICAgdGhpcy53b3JsZFdpZHRoID0gdGhpcy53b3JsZE1heFggLSB0aGlzLndvcmxkTWluWDtcbiAgICB0aGlzLndvcmxkSGVpZ2h0ID0gdGhpcy53b3JsZE1heFkgLSB0aGlzLndvcmxkTWluWTtcbiAgICB0aGlzLmdyaWRXaWR0aCA9IHRoaXMud29ybGRXaWR0aCAvIDY0ICsgMTtcbiAgICB0aGlzLmdyaWRIZWlnaHQgPSB0aGlzLndvcmxkSGVpZ2h0IC8gNjQgKyAxO1xuICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLmFyZWEgPSAwO1xuICAgIFxuICAgIHRoaXMuaW1hZ2VIYW5kbGVyID0gbmV3IEltYWdlSGFuZGxlcihtYXBEYXRhSW1hZ2VQYXRoKTtcbiAgICB2YXIgdDEgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuaW1hZ2VIYW5kbGVyLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdDIgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnaW1hZ2UgbG9hZCcsIHQyIC0gdDEgKyAnbXMnKTtcbiAgICAgICAgc2VsZi5ncmlkbmF2ID0gcGFyc2VJbWFnZShzZWxmLmltYWdlSGFuZGxlciwgc2VsZi5ncmlkV2lkdGggKiAyLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkSGVpZ2h0LCBibGFja1BpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYuZW50X2Zvd19ibG9ja2VyX25vZGUgPSBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCAqIDMsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGJsYWNrUGl4ZWxIYW5kbGVyKTtcbiAgICAgICAgc2VsZi50b29sc19ub193YXJkcyA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIHNlbGYuZ3JpZFdpZHRoICogNCwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgYmxhY2tQaXhlbEhhbmRsZXIpO1xuICAgICAgICBwYXJzZUltYWdlKHNlbGYuaW1hZ2VIYW5kbGVyLCBzZWxmLmdyaWRXaWR0aCwgc2VsZi5ncmlkV2lkdGgsIHNlbGYuZ3JpZEhlaWdodCwgdHJlZUVsZXZhdGlvblBpeGVsSGFuZGxlcik7XG4gICAgICAgIHNlbGYuZWxldmF0aW9uR3JpZCA9IHBhcnNlSW1hZ2Uoc2VsZi5pbWFnZUhhbmRsZXIsIDAsIHNlbGYuZ3JpZFdpZHRoLCBzZWxmLmdyaWRIZWlnaHQsIGVsZXZhdGlvblBpeGVsSGFuZGxlcik7XG4gICAgICAgIHZhciB0MyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpbWFnZSBwcm9jZXNzJywgdDMgLSB0MiArICdtcycpO1xuICAgICAgICBzZWxmLmVsZXZhdGlvblZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uIChlbGV2YXRpb24pIHtcbiAgICAgICAgICAgIC8vc2VsZi5lbGV2YXRpb25XYWxsc1tlbGV2YXRpb25dID0gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyhzZWxmLmVsZXZhdGlvbkdyaWQsIGVsZXZhdGlvbik7XG4gICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dID0ge307XG4gICAgICAgICAgICBzZXRUcmVlV2FsbHMoc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXSwgZWxldmF0aW9uLCBzZWxmLnRyZWUsIHNlbGYudHJlZV9lbGV2YXRpb25zLCBzZWxmLnRyZWVfc3RhdGUsIHNlbGYudHJlZV9ibG9ja3MpXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdDQgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnd2FsbHMgZ2VuZXJhdGlvbicsIHQ0IC0gdDMgKyAnbXMnKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLmdyaWRXaWR0aDsgaSsrKSB7XG4gICAgICAgICAgICBzZWxmLmdyaWRbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZi5ncmlkSGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHQgPSB4eTJwdChpLCBqKTtcbiAgICAgICAgICAgICAgICBrZXkycHRfY2FjaGVbcHQua2V5XSA9IHB0O1xuICAgICAgICAgICAgICAgIHNlbGYuZ3JpZFtpXS5wdXNoKHB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdDUgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zb2xlLmxvZygnY2FjaGUgcHJpbWUnLCB0NSAtIHQ0ICsgJ21zJyk7XG4gICAgICAgIHNlbGYucmVhZHkgPSB0cnVlO1xuICAgICAgICBvblJlYWR5KCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBwYXJzZUltYWdlKGltYWdlSGFuZGxlciwgb2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIpIHtcbiAgICAgICAgdmFyIGdyaWQgPSB7fTtcbiAgICAgICAgaW1hZ2VIYW5kbGVyLnNjYW4ob2Zmc2V0LCB3aWR0aCwgaGVpZ2h0LCBwaXhlbEhhbmRsZXIsIGdyaWQpO1xuICAgICAgICByZXR1cm4gZ3JpZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBibGFja1BpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBpZiAocFswXSA9PT0gMCkge1xuICAgICAgICAgICAgZ3JpZFtwdC54ICsgXCIsXCIgKyBwdC55XSA9IHB0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gZWxldmF0aW9uUGl4ZWxIYW5kbGVyKHgsIHksIHAsIGdyaWQpIHtcbiAgICAgICAgdmFyIHB0ID0gc2VsZi5JbWFnZVhZdG9HcmlkWFkoeCwgeSk7XG4gICAgICAgIHB0LnogPSBwWzBdO1xuICAgICAgICBncmlkW3B0LnggKyBcIixcIiArIHB0LnldID0gcHQ7XG4gICAgICAgIGlmIChzZWxmLmVsZXZhdGlvblZhbHVlcy5pbmRleE9mKHBbMF0pID09IC0xKSB7XG4gICAgICAgICAgICBzZWxmLmVsZXZhdGlvblZhbHVlcy5wdXNoKHBbMF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJlZUVsZXZhdGlvblBpeGVsSGFuZGxlcih4LCB5LCBwLCBncmlkKSB7XG4gICAgICAgIHZhciBwdCA9IHNlbGYuSW1hZ2VYWXRvR3JpZFhZKHgsIHkpO1xuICAgICAgICBpZiAocFsxXSA9PSAwICYmIHBbMl0gPT0gMCkge1xuICAgICAgICAgICAgLy8gdHJlZXMgYXJlIDJ4MiBpbiBncmlkXG4gICAgICAgICAgICAvLyB0cmVlIG9yaWdpbnMgcm91bmRlZCB1cCB3aGVuIGNvbnZlcnRlZCB0byBncmlkLCBzbyB0aGV5IHJlcHJlc2VudCB0b3AgcmlnaHQgY29ybmVyLiBzdWJ0cmFjdCAwLjUgdG8gZ2V0IGdyaWQgb3JpZ2luXG4gICAgICAgICAgICB2YXIgdHJlZU9yaWdpbiA9IHh5MnB0KHB0LnggLSAwLjUsIHB0LnkgLSAwLjUpO1xuICAgICAgICAgICAgdmFyIHRyZWVFbGV2YXRpb24gPSBwWzBdICsgNDA7XG4gICAgICAgICAgICB2YXIga0MgPSB0cmVlT3JpZ2luLmtleTtcbiAgICAgICAgICAgIHNlbGYudHJlZVtrQ10gPSB0cmVlT3JpZ2luO1xuICAgICAgICAgICAgc2VsZi50cmVlX2VsZXZhdGlvbnNba0NdID0gdHJlZUVsZXZhdGlvbjtcbiAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3Nba0NdID0gW107XG4gICAgICAgICAgICBzZWxmLnRyZWVfc3RhdGVba0NdID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCB0cmVlIDJ4MiBieSB0YWtpbmcgZmxvb3IgYW5kIGNlaWwgb2YgdHJlZSBncmlkIG9yaWdpblxuICAgICAgICAgICAgW01hdGguZmxvb3IsIE1hdGguY2VpbF0uZm9yRWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIFtNYXRoLmZsb29yLCBNYXRoLmNlaWxdLmZvckVhY2goZnVuY3Rpb24gKGopIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyZWVDb3JuZXIgPSB4eTJwdChpKHRyZWVPcmlnaW4ueCksIGoodHJlZU9yaWdpbi55KSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9yZWxhdGlvbnNbdHJlZUNvcm5lci5rZXldID0gKHNlbGYudHJlZV9yZWxhdGlvbnNbdHJlZUNvcm5lci5rZXldIHx8IFtdKS5jb25jYXQodHJlZU9yaWdpbik7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3Nba0NdLnB1c2godHJlZUNvcm5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubGlnaHRQYXNzZXNDYWxsYmFjayA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBrZXkgPSB4ICsgJywnICsgeTtcbiAgICAgICAgcmV0dXJuICEoa2V5IGluIHNlbGYuZWxldmF0aW9uV2FsbHNbc2VsZi5lbGV2YXRpb25dKSAmJiAhKGtleSBpbiBzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlKSAmJiAhKGtleSBpbiBzZWxmLnRyZWVXYWxsc1tzZWxmLmVsZXZhdGlvbl0gJiYgc2VsZi50cmVlV2FsbHNbc2VsZi5lbGV2YXRpb25dW2tleV0ubGVuZ3RoID4gMCkgO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmZvdiA9IG5ldyBST1QuRk9WLlByZWNpc2VTaGFkb3djYXN0aW5nKHRoaXMubGlnaHRQYXNzZXNDYWxsYmFjaywge3RvcG9sb2d5Ojh9KTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnVwZGF0ZVZpc2liaWxpdHkgPSBmdW5jdGlvbiAoZ1gsIGdZLCByYWRpdXMpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGtleSA9IHh5MmtleShnWCwgZ1kpO1xuXG4gICAgcmFkaXVzID0gcmFkaXVzIHx8IHNlbGYucmFkaXVzO1xuICAgIHRoaXMuZWxldmF0aW9uID0gdGhpcy5lbGV2YXRpb25HcmlkW2tleV0uejtcbiAgICB0aGlzLndhbGxzID0gdGhpcy50cmVlV2FsbHNbdGhpcy5lbGV2YXRpb25dO1xuICAgIGlmICghdGhpcy5lbGV2YXRpb25XYWxsc1t0aGlzLmVsZXZhdGlvbl0pIHRoaXMuZWxldmF0aW9uV2FsbHNbdGhpcy5lbGV2YXRpb25dID0gZ2VuZXJhdGVFbGV2YXRpb25XYWxscyh0aGlzLmVsZXZhdGlvbkdyaWQsIHRoaXMuZWxldmF0aW9uKTtcbiAgICAvL3NldEVsZXZhdGlvbldhbGxzKHRoaXMud2FsbHMsIHRoaXMuZWxldmF0aW9uV2FsbHMsIHRoaXMuZWxldmF0aW9uKVxuICAgIC8vc2V0V2FsbHModGhpcy53YWxscywgdGhpcy5lbnRfZm93X2Jsb2NrZXJfbm9kZSk7XG4gICAgLy9zZXRXYWxscyh0aGlzLndhbGxzLCB0aGlzLnRvb2xzX25vX3dhcmRzKTtcbiAgICAvL3NldFRyZWVXYWxscyh0aGlzLndhbGxzLCB0aGlzLmVsZXZhdGlvbiwgdGhpcy50cmVlLCB0aGlzLnRyZWVfZWxldmF0aW9ucywgdGhpcy50cmVlX3N0YXRlLCB0aGlzLnRyZWVfYmxvY2tzKTtcblxuICAgIHRoaXMuZm92LndhbGxzID0gdGhpcy53YWxscztcbiAgICB0aGlzLmxpZ2h0cyA9IHt9O1xuICAgIHRoaXMuYXJlYSA9IHRoaXMuZm92LmNvbXB1dGUoZ1gsIGdZLCByYWRpdXMsIGZ1bmN0aW9uKHgyLCB5MiwgciwgdmlzKSB7XG4gICAgICAgIHZhciBrZXkgPSB4eTJrZXkoeDIsIHkyKTtcbiAgICAgICAgaWYgKCFzZWxmLmVsZXZhdGlvbkdyaWRba2V5XSkgcmV0dXJuO1xuICAgICAgICB2YXIgdHJlZVB0cyA9IHNlbGYudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICAgICAgdmFyIHRyZWVCbG9ja2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAodHJlZVB0cykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlUHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyZWVQdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICAgICAgdHJlZUJsb2NraW5nID0gc2VsZi50cmVlX3N0YXRlW3RyZWVQdC5rZXldICYmIHNlbGYudHJlZV9lbGV2YXRpb25zW3RyZWVQdC5rZXldID4gc2VsZi5lbGV2YXRpb247XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpcyA9PSAxICYmICFzZWxmLmVudF9mb3dfYmxvY2tlcl9ub2RlW2tleV0gJiYgIXRyZWVCbG9ja2luZykge1xuICAgICAgICAgICAgc2VsZi5saWdodHNba2V5XSA9IDI1NTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubGlnaHRBcmVhID0gT2JqZWN0LmtleXModGhpcy5saWdodHMpLmxlbmd0aDtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuaXNWYWxpZFhZID0gZnVuY3Rpb24gKHgsIHksIGJDaGVja0dyaWRuYXYsIGJDaGVja1Rvb2xzTm9XYXJkcywgYkNoZWNrVHJlZVN0YXRlKSB7XG4gICAgaWYgKCF0aGlzLnJlYWR5KSByZXR1cm4gZmFsc2U7XG4gICAgXG4gICAgdmFyIGtleSA9IHh5MmtleSh4LCB5KSxcbiAgICAgICAgdHJlZUJsb2NraW5nID0gZmFsc2U7XG4gICAgICAgIFxuICAgIGlmIChiQ2hlY2tUcmVlU3RhdGUpIHtcbiAgICAgICAgdmFyIHRyZWVQdHMgPSB0aGlzLnRyZWVfcmVsYXRpb25zW2tleV07XG4gICAgICAgIGlmICh0cmVlUHRzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWVQdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJlZVB0ID0gdHJlZVB0c1tpXTtcbiAgICAgICAgICAgICAgICB0cmVlQmxvY2tpbmcgPSB0aGlzLnRyZWVfc3RhdGVbdHJlZVB0LmtleV07XG4gICAgICAgICAgICAgICAgaWYgKHRyZWVCbG9ja2luZykgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHggPj0gMCAmJiB4IDwgdGhpcy5ncmlkV2lkdGggJiYgeSA+PSAwICYmIHkgPCB0aGlzLmdyaWRIZWlnaHQgJiYgKCFiQ2hlY2tHcmlkbmF2IHx8ICF0aGlzLmdyaWRuYXZba2V5XSkgJiYgKCFiQ2hlY2tUb29sc05vV2FyZHMgfHwgIXRoaXMudG9vbHNfbm9fd2FyZHNba2V5XSkgJiYgKCFiQ2hlY2tUcmVlU3RhdGUgfHwgIXRyZWVCbG9ja2luZyk7XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLnRvZ2dsZVRyZWUgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIga2V5ID0geHkya2V5KHgsIHkpO1xuICAgIHZhciBpc1RyZWUgPSAhIXRoaXMudHJlZV9yZWxhdGlvbnNba2V5XTtcbiAgICBpZiAoaXNUcmVlKSB7XG4gICAgICAgIHZhciB0cmVlUHRzID0gdGhpcy50cmVlX3JlbGF0aW9uc1trZXldO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyZWVQdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwdCA9IHRyZWVQdHNbaV07XG4gICAgICAgICAgICB0aGlzLnRyZWVfc3RhdGVbcHQua2V5XSA9ICF0aGlzLnRyZWVfc3RhdGVbcHQua2V5XTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5lbGV2YXRpb25WYWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoZWxldmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZXZhdGlvbiA8IHNlbGYudHJlZV9lbGV2YXRpb25zW3B0LmtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi50cmVlX2Jsb2Nrc1twdC5rZXldLmZvckVhY2goZnVuY3Rpb24gKHB0Qikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0ubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHQueCA9PSBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldW2pdWzFdICYmIHB0LnkgPT0gc2VsZi50cmVlV2FsbHNbZWxldmF0aW9uXVtwdEIua2V5XVtqXVsyXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi50cmVlX3N0YXRlW3B0LmtleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHJlZV9ibG9ja3NbcHQua2V5XS5mb3JFYWNoKGZ1bmN0aW9uIChwdEIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyZWVXYWxsc1tlbGV2YXRpb25dW3B0Qi5rZXldID0gKHNlbGYudHJlZVdhbGxzW2VsZXZhdGlvbl1bcHRCLmtleV0gfHwgW10pLmNvbmNhdChbWyd0cmVlJywgcHQueCwgcHQueSwgTWF0aC5TUVJUMl1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXNUcmVlO1xufVxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuc2V0UmFkaXVzID0gZnVuY3Rpb24gKHIpIHtcbiAgICB0aGlzLnJhZGl1cyA9IHI7XG59XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5Xb3JsZFhZdG9HcmlkWFkgPSBmdW5jdGlvbiAod1gsIHdZLCBiTm9Sb3VuZCkge1xuICAgIHZhciB4ID0gKHdYIC0gdGhpcy53b3JsZE1pblgpIC8gNjQsXG4gICAgICAgIHkgPSAod1kgLSB0aGlzLndvcmxkTWluWSkgLyA2NDtcbiAgICBpZiAoIWJOb1JvdW5kKSB7XG4gICAgICAgIHggPSBwYXJzZUludChNYXRoLnJvdW5kKHgpKVxuICAgICAgICB5ID0gcGFyc2VJbnQoTWF0aC5yb3VuZCh5KSlcbiAgICB9XG4gICAgcmV0dXJuIHt4OiB4LCB5OiB5LCBrZXk6IHggKyAnLCcgKyB5fTtcbn1cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkdyaWRYWXRvV29ybGRYWSA9IGZ1bmN0aW9uIChnWCwgZ1kpIHtcbiAgICByZXR1cm4ge3g6IGdYICogNjQgKyB0aGlzLndvcmxkTWluWCwgeTogZ1kgKiA2NCArIHRoaXMud29ybGRNaW5ZfTtcbn1cblxuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUuR3JpZFhZdG9JbWFnZVhZID0gZnVuY3Rpb24gKGdYLCBnWSkge1xuICAgIHJldHVybiB7eDogZ1gsIHk6IHRoaXMuZ3JpZEhlaWdodCAtIGdZIC0gMX07XG59XG5cblZpc2lvblNpbXVsYXRpb24ucHJvdG90eXBlLkltYWdlWFl0b0dyaWRYWSA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIGdZID0gdGhpcy5ncmlkSGVpZ2h0IC0geSAtIDE7XG4gICAgcmV0dXJuIHt4OiB4LCB5OiBnWSwga2V5OiB4ICsgJywnICsgZ1l9O1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5Xb3JsZFhZdG9JbWFnZVhZID0gZnVuY3Rpb24gKHdYLCB3WSkge1xuICAgIHZhciBwdCA9IHRoaXMuV29ybGRYWXRvR3JpZFhZKHdYLCB3WSk7XG4gICAgcmV0dXJuIHRoaXMuR3JpZFhZdG9JbWFnZVhZKHB0LngsIHB0LnkpO1xufVxuXG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS5rZXkycHQgPSBrZXkycHQ7XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJrZXkgPSB4eTJrZXk7XG5WaXNpb25TaW11bGF0aW9uLnByb3RvdHlwZS54eTJwdCA9IHh5MnB0O1xuVmlzaW9uU2ltdWxhdGlvbi5wcm90b3R5cGUucHQya2V5ID0gcHQya2V5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc2lvblNpbXVsYXRpb247IiwibW9kdWxlLmV4cG9ydHM9e1wid29ybGRNaW5YXCI6LTgyODgsXCJ3b3JsZE1heFhcIjo4Mjg4LFwid29ybGRNaW5ZXCI6LTgyODgsXCJ3b3JsZE1heFlcIjo4Mjg4fSJdfQ==
