var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),typeof globalThis>`u`&&Object.defineProperty(window,"globalThis",{value:window}),Array.prototype.at||Object.defineProperty(Array.prototype,"at",{value:function(e){let t=Math.trunc(e)||0;return this[t<0?this.length+t:t]}}),Object.fromEntries||(Object.fromEntries=e=>{let t={};for(let[n,r]of e)Object.defineProperty(t,n,{value:r,configurable:!0,enumerable:!0,writable:!0});return t}),Object.hasOwn||(Object.hasOwn=(e,t)=>Object.prototype.hasOwnProperty.call(e,t));var l=window.matchMedia(`(min-width:0px)`);if(!l.addEventListener){let e=Object.getPrototypeOf(l);e.addEventListener=function(e,t){e===`change`&&this.addListener(t)},e.removeEventListener=function(e,t){e===`change`&&this.removeListener(t)}}if(!CSS.supports(`selector(:where(*))`)){let e=document.createElement(`link`);e.rel=`stylesheet`,e.href=`/legacy.css`,document.head.appendChild(e)}var u=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ee());else{var t=n(l);t!==null&&te(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&te(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ee():S=!1}}}var ee;if(typeof y==`function`)ee=function(){y(D)};else if(typeof MessageChannel<`u`){var O=new MessageChannel,k=O.port2;O.port1.onmessage=D,ee=function(){k.postMessage(null)}}else ee=function(){_(D,0)};function te(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,te(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ee()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),d=o(((e,t)=>{t.exports=u()})),f=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ee(e,t){return D(e.type,t,e.props)}function O(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function k(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var te=/\/+/g;function A(e,t){return typeof e==`object`&&e&&e.key!=null?k(``+e.key):t.toString(36)}function j(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function M(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,M(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+A(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(te,`$&/`)+`/`),M(o,r,i,``,function(e){return e})):o!=null&&(O(o)&&(o=ee(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(te,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+A(a,u),c+=M(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+A(a,u++),c+=M(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return M(j(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function N(e,t,n){if(e==null)return e;var r=[],i=0;return M(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function P(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var F=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function I(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,F)}catch(e){F(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function ne(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else I(ne.bind(null,e))}var re={map:N,forEach:function(e,t,n){N(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return N(e,function(){t++}),t},toArray:function(e){return N(e,function(e){return e})||[]},only:function(e){if(!O(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=re,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=ne,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=O,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:P}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=I,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.1`})),p=o(((e,t)=>{t.exports=f()})),m=o((e=>{var t=p();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function u(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=u(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t==null&&i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=u(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=u(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),h=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=m()})),g=o((e=>{var t=d(),n=p(),r=h();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function u(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function f(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=f(e),t!==null)return t;e=e.sibling}return null}function m(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&m(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,ee=Symbol.for(`react.element`),O=Symbol.for(`react.transitional.element`),k=Symbol.for(`react.portal`),te=Symbol.for(`react.fragment`),A=Symbol.for(`react.strict_mode`),j=Symbol.for(`react.profiler`),M=Symbol.for(`react.consumer`),N=Symbol.for(`react.context`),P=Symbol.for(`react.forward_ref`),F=Symbol.for(`react.suspense`),I=Symbol.for(`react.suspense_list`),ne=Symbol.for(`react.memo`),re=Symbol.for(`react.lazy`),L=Symbol.for(`react.activity`),R=Symbol.for(`react.legacy_hidden`),ie=Symbol.for(`react.memo_cache_sentinel`),ae=Symbol.for(`react.view_transition`),oe=Symbol.for(`react.recoverable`),se=Symbol.iterator;function ce(e){return typeof e!=`object`||!e?null:(e=se&&e[se]||e[`@@iterator`],typeof e==`function`?e:null)}var le=Symbol.for(`react.client.reference`);function ue(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===le?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case te:return`Fragment`;case j:return`Profiler`;case A:return`StrictMode`;case F:return`Suspense`;case I:return`SuspenseList`;case L:return`Activity`;case ae:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case k:return`Portal`;case N:return e.displayName||`Context`;case M:return(e._context.displayName||`Context`)+`.Consumer`;case P:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||``,e=e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case ne:return t=e.displayName||null,t===null?ue(e.type)||`Memo`:t;case re:t=e._payload,e=e._init;try{return ue(e(t))}catch{}}return null}var de=Array.isArray,z=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,B=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,fe={pending:!1,data:null,method:null,action:null},pe=[],me=-1;function he(e){return{current:e}}function ge(e){0>me||(e.current=pe[me],pe[me]=null,me--)}function _e(e,t){me++,pe[me]=e.current,e.current=t}var ve=he(null),ye=he(null),be=he(null),xe=he(null);function Se(e,t){switch(_e(be,t),_e(ye,e),_e(ve,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ge(ve),_e(ve,e)}function Ce(){ge(ve),ge(ye),ge(be)}function V(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,_e(xe,e)),t=ve.current;var n=dp(t,e.type);t!==n&&(_e(ye,e),_e(ve,n))}function we(e){ye.current===e&&(ge(ve),ge(ye)),xe.current===e&&(ge(xe),sh._currentValue=fe)}var Te,Ee;function De(e){if(Te===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Te=t&&t[1]||``,Ee=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Te+e+Ee}var Oe=!1;function ke(e,t){if(!e||Oe)return``;Oe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Oe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?De(n):``}function Ae(e,t){switch(e.tag){case 26:case 27:case 5:return De(e.type);case 16:return De(`Lazy`);case 13:return e.child!==t&&t!==null?De(`Suspense Fallback`):De(`Suspense`);case 19:return De(`SuspenseList`);case 0:case 15:return ke(e.type,!1);case 11:return ke(e.type.render,!1);case 1:return ke(e.type,!0);case 31:return De(`Activity`);case 30:return De(`ViewTransition`);default:return``}}function je(e){try{var t=``,n=null;do t+=Ae(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Me=Object.prototype.hasOwnProperty,Ne=t.unstable_scheduleCallback,Pe=t.unstable_cancelCallback,Fe=t.unstable_shouldYield,Ie=t.unstable_requestPaint,Le=t.unstable_now,Re=t.unstable_getCurrentPriorityLevel,ze=t.unstable_ImmediatePriority,Be=t.unstable_UserBlockingPriority,Ve=t.unstable_NormalPriority,He=t.unstable_LowPriority,Ue=t.unstable_IdlePriority,We=t.log,Ge=t.unstable_setDisableYieldValue,Ke=null,qe=null;function Je(e){if(typeof We==`function`&&Ge(e),qe&&typeof qe.setStrictMode==`function`)try{qe.setStrictMode(Ke,e)}catch{}}var Ye=Math.clz32?Math.clz32:Qe,Xe=Math.log,Ze=Math.LN2;function Qe(e){return e>>>=0,e===0?32:31-(Xe(e)/Ze|0)|0}var $e=256,et=262144,tt=4194304;function nt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function rt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=nt(n))):i=nt(o):i=nt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=nt(n))):i=nt(o)):i=nt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function it(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function at(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-Ye(n),i=1<<r;t|=e[r],n&=~i}return t}function ot(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function st(){var e=tt;return tt<<=1,!(tt&62914560)&&(tt=4194304),e}function ct(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function lt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ut(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-Ye(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&dt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function dt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-Ye(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function ft(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ye(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function pt(e,t){var n=t&-t;return n=n&42?1:mt(n),(n&(e.suspendedLanes|t))===0?n:0}function mt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ht(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function gt(){var e=B.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function _t(e,t){var n=B.p;try{return B.p=e,t()}finally{B.p=n}}var vt=Math.random().toString(36).slice(2),yt=`__reactFiber$`+vt,bt=`__reactProps$`+vt,xt=`__reactContainer$`+vt,H=`__reactEvents$`+vt,St=`__reactListeners$`+vt,Ct=`__reactHandles$`+vt,wt=`__reactResources$`+vt,Tt=`__reactMarker$`+vt,Et=`__reactLoad$`+vt;function Dt(e){delete e[yt],delete e[bt],delete e[St],delete e[Ct]}function Ot(e){var t;if(t=e[yt])return t;for(var n=e.parentNode;n;){if(t=n[xt]||n[yt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[yt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function kt(e){if(e=e[yt]||e[xt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function At(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function jt(e){var t=e[wt];return t||(t=e[wt]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Mt(e){e[Tt]=!0}function Nt(e){e[Et]=void 0}var Pt=new Set,Ft={};function It(e,t){Lt(e,t),Lt(e+`Capture`,t)}function Lt(e,t){for(Ft[e]=t,e=0;e<t.length;e++)Pt.add(t[e])}var Rt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),zt={},Bt={};function Vt(e){return Me.call(Bt,e)?!0:Me.call(zt,e)?!1:Rt.test(e)?Bt[e]=!0:(zt[e]=!0,!1)}var Ht=!1;function Ut(){var e=Ht;return Ht=!1,e}function Wt(e,t,n){if(Vt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Gt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Kt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function qt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function U(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Jt(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Yt(e){if(!e._valueTracker){var t=U(e)?`checked`:`value`;e._valueTracker=Jt(e,t,``+e[t])}}function Xt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=U(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var Zt=/[\n"\\]/g;function Qt(e){return e.replace(Zt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function $t(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+qt(t)):e.value!==``+qt(t)&&(e.value=``+qt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):tn(e,qt(n)):o===`number`&&e.value==t?tn(e,qt(e.value)):tn(e,qt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+qt(s):e.removeAttribute(`name`)}function en(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Yt(e);return}n=n==null?``:``+qt(n),t=t==null?n:``+qt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r=r==null?i:r,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Yt(e)}function tn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function nn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+qt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function rn(e,t,n){t!=null&&(t=``+qt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+qt(n)}function an(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(de(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n==null&&(n=``),t=n}n=qt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Yt(e)}function on(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var sn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function cn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||sn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function ln(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,Ht=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(cn(e,a,r),Ht=!0)}else for(var o in t)t.hasOwnProperty(o)&&cn(e,o,t[o])}function un(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var dn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),fn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function pn(e){return fn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function mn(){}var hn=null;function gn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var _n=null,vn=null;function yn(e){var t=kt(e);if(t&&(e=t.stateNode)){var n=e[bt]||null;a:switch(e=t.stateNode,t.type){case`input`:if($t(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+Qt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[bt]||null;if(!a)throw Error(i(90));$t(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Xt(r)}break a;case`textarea`:rn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&nn(e,!!n.multiple,t,!1)}}}var bn=!1;function xn(e,t,n){if(bn)return e(t,n);bn=!0;try{return e(t)}finally{if(bn=!1,(_n!==null||vn!==null)&&(Ld(),_n&&(t=_n,e=vn,vn=_n=null,yn(t),e)))for(t=0;t<e.length;t++)yn(e[t])}}function Sn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[bt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var Cn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,wn=!1;if(Cn)try{var Tn={};Object.defineProperty(Tn,"passive",{get:function(){wn=!0}}),window.addEventListener(`test`,Tn,Tn),window.removeEventListener(`test`,Tn,Tn)}catch{wn=!1}var En=null,Dn=null,On=null;function kn(){if(On)return On;var e,t=Dn,n=t.length,r,i=`value`in En?En.value:En.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return On=i.slice(e,1<r?1-r:void 0)}function An(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function jn(){return!0}function Mn(){return!1}function Nn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?jn:Mn,this.isPropagationStopped=Mn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=jn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=jn)},persist:function(){},isPersistent:jn}),t}var Pn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Fn=Nn(Pn),In=D({},Pn,{view:0,detail:0}),Ln=Nn(In),Rn,zn,Bn,Vn=D({},In,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Bn&&(Bn&&e.type===`mousemove`?(Rn=e.screenX-Bn.screenX,zn=e.screenY-Bn.screenY):zn=Rn=0,Bn=e),Rn)},movementY:function(e){return`movementY`in e?e.movementY:zn}}),Hn=Nn(Vn),Un=Nn(D({},Vn,{dataTransfer:0})),Wn=Nn(D({},In,{relatedTarget:0})),Gn=Nn(D({},Pn,{animationName:0,elapsedTime:0,pseudoElement:0})),Kn=Nn(D({},Pn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),qn=Nn(D({},Pn,{data:0})),Jn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Yn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Xn={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Zn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Xn[e])?!!t[e]:!1}function Qn(){return Zn}var $n=Nn(D({},In,{key:function(e){if(e.key){var t=Jn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=An(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Yn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qn,charCode:function(e){return e.type===`keypress`?An(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?An(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),er=Nn(D({},Vn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),tr=Nn(D({},Pn,{submitter:0})),nr=Nn(D({},In,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qn})),rr=Nn(D({},Pn,{propertyName:0,elapsedTime:0,pseudoElement:0})),ir=Nn(D({},Vn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),ar=Nn(D({},Pn,{newState:0,oldState:0,source:0})),or=[9,13,27,32],sr=Cn&&`CompositionEvent`in window,cr=null;Cn&&`documentMode`in document&&(cr=document.documentMode);var lr=Cn&&`TextEvent`in window&&!cr,ur=Cn&&(!sr||cr&&8<cr&&11>=cr),dr=` `,fr=!1;function pr(e,t){switch(e){case`keyup`:return or.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function mr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var hr=!1;function gr(e,t){switch(e){case`compositionend`:return mr(t);case`keypress`:return t.which===32?(fr=!0,dr):null;case`textInput`:return e=t.data,e===dr&&fr?null:e;default:return null}}function _r(e,t){if(hr)return e===`compositionend`||!sr&&pr(e,t)?(e=kn(),On=Dn=En=null,hr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return ur&&t.locale!==`ko`?null:t.data;default:return null}}var vr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function yr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!vr[e.type]:t===`textarea`}function br(e,t,n,r){_n?vn?vn.push(r):vn=[r]:_n=r,t=qf(t,`onChange`),0<t.length&&(n=new Fn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var xr=null,Sr=null;function Cr(e){Bf(e,0)}function wr(e){if(Xt(At(e)))return e}function Tr(e,t){if(e===`change`)return t}var Er=!1;if(Cn){var Dr;if(Cn){var Or=`oninput`in document;if(!Or){var kr=document.createElement(`div`);kr.setAttribute(`oninput`,`return;`),Or=typeof kr.oninput==`function`}Dr=Or}else Dr=!1;Er=Dr&&(!document.documentMode||9<document.documentMode)}function Ar(){xr&&(xr.detachEvent(`onpropertychange`,jr),Sr=xr=null)}function jr(e){if(e.propertyName===`value`&&wr(Sr)){var t=[];br(t,Sr,e,gn(e)),xn(Cr,t)}}function Mr(e,t,n){e===`focusin`?(Ar(),xr=t,Sr=n,xr.attachEvent(`onpropertychange`,jr)):e===`focusout`&&Ar()}function Nr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return wr(Sr)}function Pr(e,t){if(e===`click`)return wr(t)}function Fr(e,t){if(e===`input`||e===`change`)return wr(t)}function Ir(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Lr=typeof Object.is==`function`?Object.is:Ir;function Rr(e,t){if(Lr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Me.call(t,i)||!Lr(e[i],t[i]))return!1}return!0}function zr(e){if(e=e||(typeof document<`u`?document:void 0),e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Br(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Vr(e,t){var n=Br(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Br(n)}}function Hr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Hr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ur(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=zr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=zr(e.document)}return t}function Wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Gr=Cn&&`documentMode`in document&&11>=document.documentMode,Kr=null,qr=null,Jr=null,Yr=!1;function Xr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Yr||Kr==null||Kr!==zr(r)||(r=Kr,`selectionStart`in r&&Wr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Jr&&Rr(Jr,r)||(Jr=r,r=qf(qr,`onSelect`),0<r.length&&(t=new Fn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Kr)))}function Zr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Qr={animationend:Zr(`Animation`,`AnimationEnd`),animationiteration:Zr(`Animation`,`AnimationIteration`),animationstart:Zr(`Animation`,`AnimationStart`),transitionrun:Zr(`Transition`,`TransitionRun`),transitionstart:Zr(`Transition`,`TransitionStart`),transitioncancel:Zr(`Transition`,`TransitionCancel`),transitionend:Zr(`Transition`,`TransitionEnd`)},$r={},ei={};Cn&&(ei=document.createElement(`div`).style,`AnimationEvent`in window||(delete Qr.animationend.animation,delete Qr.animationiteration.animation,delete Qr.animationstart.animation),`TransitionEvent`in window||delete Qr.transitionend.transition);function ti(e){if($r[e])return $r[e];if(!Qr[e])return e;var t=Qr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ei)return $r[e]=t[n];return e}var ni=ti(`animationend`),ri=ti(`animationiteration`),ii=ti(`animationstart`),ai=ti(`transitionrun`),oi=ti(`transitionstart`),si=ti(`transitioncancel`),ci=ti(`transitionend`),li=new Map,ui=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ui.push(`scrollEnd`);function di(e,t){li.set(e,t),It(t,[e])}var fi=0;function pi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=vd.identifierPrefix;var n=fi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function mi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Ed;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t==null?e.default:t}function hi(e,t){return e=mi(e),t=mi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var gi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},_i=[],vi=0,yi=0;function bi(){for(var e=vi,t=yi=vi=0;t<e;){var n=_i[t];_i[t++]=null;var r=_i[t];_i[t++]=null;var i=_i[t];_i[t++]=null;var a=_i[t];if(_i[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&wi(n,i,a)}}function xi(e,t,n,r){_i[vi++]=e,_i[vi++]=t,_i[vi++]=n,_i[vi++]=r,yi|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Si(e,t,n,r){return xi(e,t,n,r),Ti(e)}function Ci(e,t){return xi(e,null,null,t),Ti(e)}function wi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-Ye(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Ti(e){if(50<Dd)throw Dd=0,Od=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Ei={};function Di(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Oi(e,t,n,r){return new Di(e,t,n,r)}function ki(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ai(e,t){var n=e.alternate;return n===null?(n=Oi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function ji(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Mi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)ki(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,ve.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case L:return e=Oi(31,n,t,a),e.elementType=L,e.lanes=o,e;case te:return Ni(n.children,a,o,t);case A:s=8,a|=24;break;case j:return e=Oi(12,n,t,a|2),e.elementType=j,e.lanes=o,e;case F:return e=Oi(13,n,t,a),e.elementType=F,e.lanes=o,e;case I:return e=Oi(19,n,t,a),e.elementType=I,e.lanes=o,e;case R:case ae:return e=a|32,e=Oi(30,n,t,e),e.elementType=ae,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case N:s=10;break a;case M:s=9;break a;case P:s=11;break a;case ne:s=14;break a;case re:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Oi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ni(e,t,n,r){return e=Oi(7,e,r,t),e.lanes=n,e}function Pi(e,t,n){return e=Oi(6,e,null,t),e.lanes=n,e}function Fi(e){var t=Oi(18,null,null,0);return t.stateNode=e,t}function Ii(e,t,n){return t=Oi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Li=new WeakMap;function Ri(e,t){if(typeof e==`object`&&e){var n=Li.get(e);return n===void 0?(t={value:e,source:t,stack:je(t)},Li.set(e,t),t):n}return{value:e,source:t,stack:je(t)}}var zi=[],Bi=0,Vi=null,Hi=0,Ui=[],Wi=0,Gi=null,Ki=1,qi=``;function Ji(e,t){zi[Bi++]=Hi,zi[Bi++]=Vi,Vi=e,Hi=t}function Yi(e,t,n){Ui[Wi++]=Ki,Ui[Wi++]=qi,Ui[Wi++]=Gi,Gi=e;var r=Ki;e=qi;var i=32-Ye(r)-1;r&=~(1<<i),n+=1;var a=32-Ye(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ki=1<<32-Ye(t)+i|n<<i|r,qi=a+e}else Ki=1<<a|n<<i|r,qi=e}function Xi(e){e.return!==null&&(Ji(e,1),Yi(e,1,0))}function Zi(e){for(;e===Vi;)Vi=zi[--Bi],zi[Bi]=null,Hi=zi[--Bi],zi[Bi]=null;for(;e===Gi;)Gi=Ui[--Wi],Ui[Wi]=null,qi=Ui[--Wi],Ui[Wi]=null,Ki=Ui[--Wi],Ui[Wi]=null}function Qi(e,t){Ui[Wi++]=Ki,Ui[Wi++]=qi,Ui[Wi++]=Gi,Ki=t.id,qi=t.overflow,Gi=e}var $i=null,ea=null,W=!1,ta=null,na=!1,ra=Error(i(519));function ia(e){throw ua(Ri(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ra}function aa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[yt]=e,t[bt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<Rf.length;n++)$(Rf[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),en(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),an(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||$f(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=mn),t=!0):t=!1,t||ia(e,!0)}function oa(e){for($i=e.return;$i;)switch($i.tag){case 5:case 31:case 13:na=!1;return;case 27:case 3:na=!0;return;default:$i=$i.return}}function sa(e){if(e!==$i)return!1;if(!W)return oa(e),W=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&ea&&ia(e),oa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ea=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));ea=dm(e)}else t===27?(t=ea,Sp(e.type)?(e=um,um=null,ea=e):ea=t):ea=$i?lm(e.stateNode.nextSibling):null;return!0}function ca(){ea=$i=null,W=!1}function la(){var e=ta;return e!==null&&(ud===null?ud=e:ud.push.apply(ud,e),ta=null),e}function ua(e){ta===null?ta=[e]:ta.push(e)}var da=he(null),fa=null,pa=null;function ma(e,t,n){_e(da,t._currentValue),t._currentValue=n}function ha(e){e._currentValue=da.current,ge(da)}function ga(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function _a(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ga(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ga(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ga(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function va(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Lr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===xe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&_a(t,e,n,r),t.flags|=262144,e!==null}function ya(e){for(e=e.firstContext;e!==null;){if(!Lr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ba(e){fa=e,pa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function xa(e){return Ca(fa,e)}function Sa(e,t){return fa===null&&ba(e),Ca(e,t)}function Ca(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},pa===null){if(e===null)throw Error(i(308));pa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else pa=pa.next=t;return n}var wa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ta=t.unstable_scheduleCallback,Ea=t.unstable_NormalPriority,Da={$$typeof:N,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Oa(){return{controller:new wa,data:new Map,refCount:0}}function ka(e){e.refCount--,e.refCount===0&&Ta(Ea,function(){e.controller.abort()})}function Aa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var ja=null;function Ma(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Na=null,Pa=0,Fa=0,Ia=null;function La(e,t){if(Na===null){var n=Na=[];Pa=0,Fa=Nf(),Ia={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Pa++,t.then(Ra,Ra),t}function Ra(){if(--Pa===0&&(ja=null,Na!==null)){Ia!==null&&(Ia.status=`fulfilled`);var e=Na;Na=null,Fa=0,Ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function za(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ba=z.S;z.S=function(e,t){if(pd=Le(),typeof t==`object`&&t&&typeof t.then==`function`&&La(e,t),ja!==null)for(var n=yf;n!==null;)Aa(n,ja),n=n.next;if(n=e.types,n!==null){for(var r=yf;r!==null;)Aa(r,n),r=r.next;if(Fa!==0){r=ja,r===null&&(r=ja=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ba!==null&&Ba(e,t)};var Va=he(null);function Ha(){var e=Va.current;return e===null?Zu.pooledCache:e}function Ua(e,t){t===null?_e(Va,Va.current):_e(Va,t.pool)}function Wa(){var e=Ha();return e===null?null:{parent:Da._currentValue,pool:e}}var Ga=Error(i(460)),Ka=Error(i(474)),qa=Error(i(542)),Ja={then:function(){}};function Ya(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Xa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(mn,mn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(mn,mn);else{if(e=Zu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e}throw Qa=t,Ga}}function Za(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Qa=e,Ga):e}}var Qa=null;function $a(){if(Qa===null)throw Error(i(459));var e=Qa;return Qa=null,e}function eo(e){if(e===Ga||e===qa)throw Error(i(483))}var to=null,no=0;function ro(e){var t=no;return no+=1,to===null&&(to=[]),Xa(to,e,t)}function io(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ao(e,t){throw t.$$typeof===ee?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function oo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ai(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Pi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===te?(e=d(e,t,n.props.children,r,n.key),io(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===re&&Za(i)===t.type)?(t=a(t,n.props),io(t,n),t.return=e,t):(t=Mi(n.type,n.key,n.props,null,e.mode,r),io(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ni(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Pi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case O:return n=Mi(t.type,t.key,t.props,null,e.mode,n),io(n,t),n.return=e,n;case k:return t=Ii(t,e.mode,n),t.return=e,t;case re:return t=Za(t),f(e,t,n)}if(de(t)||ce(t))return t=Ni(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ro(t),n);if(t.$$typeof===N)return f(e,Sa(e,t),n);ao(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case O:return n.key===i?l(e,t,n,r):null;case k:return n.key===i?u(e,t,n,r):null;case re:return n=Za(n),p(e,t,n,r)}if(de(n)||ce(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ro(n),r);if(n.$$typeof===N)return p(e,t,Sa(e,n),r);ao(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case O:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case k:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case re:return r=Za(r),m(e,t,n,r,i)}if(de(r)||ce(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ro(r),i);if(r.$$typeof===N)return m(e,t,n,Sa(t,r),i);ao(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),W&&Ji(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return W&&Ji(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),W&&Ji(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),W&&Ji(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return W&&Ji(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),W&&Ji(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===te&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case O:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===te){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),io(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===re&&Za(l)===r.type){n(e,r.sibling),c=a(r,o.props),io(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===te?(c=Ni(o.props.children,e.mode,c,o.key),io(c,o),c.return=e,e=c):(c=Mi(o.type,o.key,o.props,null,e.mode,c),io(c,o),c.return=e,e=c)}return s(e);case k:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ii(o,e.mode,c),c.return=e,e=c}return s(e);case re:return o=Za(o),_(e,r,o,c)}if(de(o))return h(e,r,o,c);if(ce(o)){if(l=ce(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ro(o),c);if(o.$$typeof===N)return _(e,r,Sa(e,o),c);ao(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Pi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{no=0;var i=_(e,t,n,r);return to=null,i}catch(t){if(t===Ga||t===qa)throw t;var a=Oi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var so=oo(!0),co=oo(!1),lo=!1;function uo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function po(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function mo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Xu&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Ti(e),wi(e,null,n),t}return xi(e,r,t,n),Ti(e)}function ho(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ft(e,n)}}function go(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var _o=!1;function vo(){if(_o){var e=Ia;if(e!==null)throw e}}function yo(e,t,n,r){_o=!1;var i=e.updateQueue;lo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Z&f)===f:(r&f)===f){f!==0&&f===Fa&&(_o=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:lo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),id|=o,e.lanes=o,e.memoizedState=d}}function bo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function xo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)bo(n[e],t)}var So=he(null),Co=he(0);function wo(e,t){e=nd,_e(Co,e),_e(So,t),nd=e|t.baseLanes}function To(){_e(Co,nd),_e(So,So.current)}function Eo(){nd=Co.current,ge(So),ge(Co)}var Do=he(null),Oo=null;function ko(e){var t=e.alternate;_e(Po,Po.current&1),_e(Do,e),Oo===null&&(t===null||So.current!==null||t.memoizedState!==null)&&(Oo=e)}function Ao(e){_e(Po,Po.current),_e(Do,e),Oo===null&&(Oo=e)}function jo(e){e.tag===22?(_e(Po,Po.current),_e(Do,e),Oo===null&&(Oo=e)):Mo()}function Mo(){_e(Po,Po.current),_e(Do,Do.current)}function No(e){ge(Do),Oo===e&&(Oo=null),ge(Po)}var Po=he(0);function Fo(e,t){_e(Do,Do.current),_e(Po,t)}function Io(e){ge(Po),ge(Do),Oo===e&&(Oo=null)}function G(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Lo=0,K=null,Ro=null,zo=null,Bo=!1,Vo=!1,Ho=!1,Uo=0,Wo=0,Go=null,Ko=0;function qo(){throw Error(i(321))}function Jo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Lr(e[n],t[n]))return!1;return!0}function Yo(e,t,n,r,i,a){return Lo=a,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,z.H=e===null||e.memoizedState===null?fc:pc,Ho=!1,a=n(r,i),Ho=!1,Vo&&(a=Zo(t,n,r,i)),Xo(e),a}function Xo(e){z.H=dc;var t=Ro!==null&&Ro.next!==null;if(Lo=0,zo=Ro=K=null,Bo=!1,Wo=0,Go=null,t)throw Error(i(300));e===null||q||(e=e.dependencies,e!==null&&ya(e)&&(q=!0))}function Zo(e,t,n,r){K=e;var a=0;do{if(Vo&&(Go=null),Wo=0,Vo=!1,25<=a)throw Error(i(301));if(a+=1,zo=Ro=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}z.H=mc,o=t(n,r)}while(Vo);return o}function Qo(){var e=z.H,t=e.useState()[0];return t=typeof t.then==`function`?as(t):t,e=e.useState()[0],(Ro===null?null:Ro.memoizedState)!==e&&(K.flags|=1024),t}function $o(){var e=Uo!==0;return Uo=0,e}function es(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ts(e){if(Bo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Bo=!1}Lo=0,zo=Ro=K=null,Vo=!1,Wo=Uo=0,Go=null}function ns(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return zo===null?K.memoizedState=zo=e:zo=zo.next=e,zo}function rs(){if(Ro===null){var e=K.alternate;e=e===null?null:e.memoizedState}else e=Ro.next;var t=zo===null?K.memoizedState:zo.next;if(t!==null)zo=t,Ro=e;else{if(e===null)throw K.alternate===null?Error(i(467)):Error(i(310));Ro=e,e={memoizedState:Ro.memoizedState,baseState:Ro.baseState,baseQueue:Ro.baseQueue,queue:Ro.queue,next:null},zo===null?K.memoizedState=zo=e:zo=zo.next=e}return zo}function is(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function as(e){var t=Wo;return Wo+=1,Go===null&&(Go=[]),e=Xa(Go,e,t),t=K,(zo===null?t.memoizedState:zo.next)===null&&(t=t.alternate,z.H=t===null||t.memoizedState===null?fc:pc),e}function os(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return as(e);if(e.$$typeof===oe)return;if(e.$$typeof===N)return xa(e)}throw Error(i(438,String(e)))}function ss(e){var t=null,n=K.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=K.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=is(),K.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ie;return t.index++,n}function cs(e,t){return typeof t==`function`?t(e):t}function ls(e){return us(rs(),Ro,e)}function us(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Lo&f)===f:(Z&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Fa&&(d=!0);else if((Lo&p)===p){u=u.next,p===Fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,K.lanes|=p,id|=p;f=u.action,Ho&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,K.lanes|=f,id|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Lr(o,e.memoizedState)&&(q=!0,d&&(n=Ia,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function ds(e){var t=rs(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Lr(o,t.memoizedState)||(q=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function fs(e,t,n){var r=K,a=rs(),o=W;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Lr((Ro||a).memoizedState,n);if(s&&(a.memoizedState=n,q=!0),a=a.queue,Ls(hs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||zo!==null&&!!(zo.memoizedState.tag&1),Ms(e?9:8,{destroy:void 0},ms.bind(null,r,a,n,t),null),e){if(r.flags|=2048,Zu===null)throw Error(i(349));o||Lo&127||ps(r,t,n)}return n}function ps(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t=is(),K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ms(e,t,n,r){t.value=n,t.getSnapshot=r,gs(t)&&_s(e)}function hs(e,t,n){return n(function(){gs(t)&&_s(e)})}function gs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Lr(e,n)}catch{return!0}}function _s(e){var t=Ci(e,2);t!==null&&Md(t,e,2)}function vs(e){var t=ns();if(typeof e==`function`){var n=e;if(e=n(),Ho){Je(!0);try{n()}finally{Je(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:e},t}function ys(e,t,n,r){return e.baseState=n,us(e,Ro,typeof r==`function`?r:cs)}function bs(e,t,n,r,a){if(cc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};z.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,xs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function xs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=z.T,o={};o.types=a===null?null:a.types,z.T=o;try{var s=n(i,r),c=z.S;c!==null&&c(o,s),Ss(e,t,s)}catch(n){ws(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),z.T=a}}else try{a=n(i,r),Ss(e,t,a)}catch(n){ws(e,t,n)}}function Ss(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Cs(e,t,n)},function(n){return ws(e,t,n)}):Cs(e,t,n)}function Cs(e,t,n){t.status=`fulfilled`,t.value=n,Ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,xs(e,n)))}function ws(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ts(t),t=t.next;while(t!==r)}e.action=null}function Ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Es(e,t){return t}function Ds(e,t){if(W){var n=Zu.formState;if(n!==null){a:{var r=K;if(W){if(ea){b:{for(var i=ea,a=na;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){ea=lm(i.nextSibling),r=i.data===`F!`;break a}}ia(r)}r=!1}r&&(t=n[0])}}return n=ns(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Es,lastRenderedState:t},n.queue=r,n=ac.bind(null,K,r),r.dispatch=n,r=vs(!1),a=sc.bind(null,K,!1,r.queue),r=ns(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=bs.bind(null,K,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Os(e){return ks(rs(),Ro,e)}function ks(e,t,n){if(t=us(e,t,Es)[0],e=ls(cs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=as(t)}catch(e){throw e===Ga?qa:e}else r=t;t=rs();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(K.flags|=2048,Ms(9,{destroy:void 0},As.bind(null,i,n),null)),[r,a,e]}function As(e,t){e.action=t}function js(e){var t=rs(),n=Ro;if(n!==null)return ks(t,n,e);rs(),t=t.memoizedState,n=rs();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ms(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=K.updateQueue,t===null&&(t=is(),K.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ns(){return rs().memoizedState}function Ps(e,t,n,r){var i=ns();K.flags|=e,i.memoizedState=Ms(1|t,{destroy:void 0},n,r===void 0?null:r)}function Fs(e,t,n,r){var i=rs();r=r===void 0?null:r;var a=i.memoizedState.inst;Ro!==null&&r!==null&&Jo(r,Ro.memoizedState.deps)?i.memoizedState=Ms(t,a,n,r):(K.flags|=e,i.memoizedState=Ms(1|t,a,n,r))}function Is(e,t){Ps(8390656,8,e,t)}function Ls(e,t){Fs(2048,8,e,t)}function Rs(e){K.flags|=4;var t=K.updateQueue;if(t===null)t=is(),K.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function zs(e){var t=rs().memoizedState;return Rs({ref:t,nextImpl:e}),function(){if(Xu&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Bs(e,t){return Fs(4,2,e,t)}function Vs(e,t){return Fs(4,4,e,t)}function Hs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Us(e,t,n){n=n==null?null:n.concat([e]),Fs(4,4,Hs.bind(null,t,e),n)}function Ws(){}function Gs(e,t){var n=rs();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Jo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ks(e,t){var n=rs();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Jo(t,r[1]))return r[0];if(r=e(),Ho){Je(!0);try{e()}finally{Je(!1)}}return n.memoizedState=[r,t],r}function qs(e,t,n){return n===void 0||Lo&1073741824&&!(Z&261930)?e.memoizedState=t:(e.memoizedState=n,e=Ad(),K.lanes|=e,id|=e,n)}function Js(e,t,n,r){return Lr(n,t)?n:So.current===null?!(Lo&106)||Lo&1073741824&&!(Z&261930)?(q=!0,e.memoizedState=n):(e=Ad(),K.lanes|=e,id|=e,t):(e=qs(e,n,r),Lr(e,t)||(q=!0),e)}function Ys(e,t,n,r,i){var a=B.p;B.p=a!==0&&8>a?a:8;var o=z.T,s={};s.types=o===null?null:o.types,z.T=s,sc(e,!1,t,n);try{var c=i(),l=z.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?oc(e,t,za(c,r),kd(e)):oc(e,t,r,kd(e))}catch(n){oc(e,t,{then:function(){},status:`rejected`,reason:n},kd())}finally{B.p=a,o!==null&&s.types!==null&&(o.types=s.types),z.T=o}}function Xs(){}function Zs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Qs(e).queue;Ys(e,a,t,fe,n===null?Xs:function(){return $s(e),n(r)})}function Qs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:fe,baseState:fe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:fe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:cs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function $s(e){var t=Qs(e);t.next===null&&(t=e.alternate.memoizedState),oc(e,t.next.queue,{},kd())}function ec(){return xa(sh)}function tc(){return rs().memoizedState}function nc(){return rs().memoizedState}function rc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=kd();e=po(n);var r=mo(t,e,n);r!==null&&(Md(r,t,n),ho(r,t,n)),t={cache:Oa()},e.payload=t;return}t=t.return}}function ic(e,t,n){var r=kd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},cc(e)?lc(t,n):(n=Si(e,t,n,r),n!==null&&(Md(n,e,r),uc(n,t,r)))}function ac(e,t,n){oc(e,t,n,kd())}function oc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(cc(e))lc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Lr(s,o))return xi(e,t,i,0),Zu===null&&bi(),!1}catch{}if(n=Si(e,t,i,r),n!==null)return Md(n,e,r),uc(n,t,r),!0}return!1}function sc(e,t,n,r){if(r={lane:2,revertLane:Nf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},cc(e)){if(t)throw Error(i(479))}else t=Si(e,n,r,2),t!==null&&Md(t,e,2)}function cc(e){var t=e.alternate;return e===K||t!==null&&t===K}function lc(e,t){Vo=Bo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function uc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ft(e,n)}}var dc={readContext:xa,use:os,useCallback:qo,useContext:qo,useEffect:qo,useImperativeHandle:qo,useLayoutEffect:qo,useInsertionEffect:qo,useMemo:qo,useReducer:qo,useRef:qo,useState:qo,useDebugValue:qo,useDeferredValue:qo,useTransition:qo,useSyncExternalStore:qo,useId:qo,useHostTransitionStatus:qo,useFormState:qo,useActionState:qo,useOptimistic:qo,useMemoCache:qo,useCacheRefresh:qo,useEffectEvent:qo},fc={readContext:xa,use:os,useCallback:function(e,t){return ns().memoizedState=[e,t===void 0?null:t],e},useContext:xa,useEffect:Is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ps(4194308,4,Hs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ps(4194308,4,e,t)},useInsertionEffect:function(e,t){Ps(4,2,e,t)},useMemo:function(e,t){var n=ns();t=t===void 0?null:t;var r=e();if(Ho){Je(!0);try{e()}finally{Je(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=ns();if(n!==void 0){var i=n(t);if(Ho){Je(!0);try{n(t)}finally{Je(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ic.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=ns();return e={current:e},t.memoizedState=e},useState:function(e){e=vs(e);var t=e.queue,n=ac.bind(null,K,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ws,useDeferredValue:function(e,t){return qs(ns(),e,t)},useTransition:function(){var e=vs(!1);return e=Ys.bind(null,K,e.queue,!0,!1),ns().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=K,a=ns();if(W){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Zu===null)throw Error(i(349));Z&127||ps(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Is(hs.bind(null,r,o,e),[e]),r.flags|=2048,Ms(9,{destroy:void 0},ms.bind(null,r,o,n,t),null),n},useId:function(){var e=ns(),t=Zu.identifierPrefix;if(W){var n=qi,r=Ki;n=(r&~(1<<32-Ye(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Uo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Ko++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ec,useFormState:Ds,useActionState:Ds,useOptimistic:function(e){var t=ns();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=sc.bind(null,K,!0,n),n.dispatch=t,[e,t]},useMemoCache:ss,useCacheRefresh:function(){return ns().memoizedState=rc.bind(null,K)},useEffectEvent:function(e){var t=ns(),n={impl:e};return t.memoizedState=n,function(){if(Xu&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},pc={readContext:xa,use:os,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:ls,useRef:Ns,useState:function(){return ls(cs)},useDebugValue:Ws,useDeferredValue:function(e,t){return Js(rs(),Ro.memoizedState,e,t)},useTransition:function(){var e=ls(cs)[0],t=rs().memoizedState;return[typeof e==`boolean`?e:as(e),t]},useSyncExternalStore:fs,useId:tc,useHostTransitionStatus:ec,useFormState:Os,useActionState:Os,useOptimistic:function(e,t){return ys(rs(),Ro,e,t)},useMemoCache:ss,useCacheRefresh:nc,useEffectEvent:zs},mc={readContext:xa,use:os,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:ds,useRef:Ns,useState:function(){return ds(cs)},useDebugValue:Ws,useDeferredValue:function(e,t){var n=rs();return Ro===null?qs(n,e,t):Js(n,Ro.memoizedState,e,t)},useTransition:function(){var e=ds(cs)[0],t=rs().memoizedState;return[typeof e==`boolean`?e:as(e),t]},useSyncExternalStore:fs,useId:tc,useHostTransitionStatus:ec,useFormState:js,useActionState:js,useOptimistic:function(e,t){var n=rs();return Ro===null?(n.baseState=e,[e,n.queue.dispatch]):ys(n,Ro,e,t)},useMemoCache:ss,useCacheRefresh:nc,useEffectEvent:zs};function hc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=kd(),i=po(r);i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Md(t,e,r),ho(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=kd(),i=po(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Md(t,e,r),ho(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=kd(),r=po(n);r.tag=2,t!=null&&(r.callback=t),t=mo(e,r,n),t!==null&&(Md(t,e,n),ho(t,e,n))}};function _c(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Rr(n,r)||!Rr(i,a):!0}function vc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&gc.enqueueReplaceState(t,t.state,null)}function yc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function bc(e){gi(e)}function xc(e){console.error(e)}function Sc(e){gi(e)}function Cc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function wc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){return n=po(n),n.tag=3,n.payload={element:null},n.callback=function(){Cc(e,t)},n}function Ec(e){return e=po(e),e.tag=3,e}function Dc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){wc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){wc(t,n,r),typeof i!=`function`&&(gd===null?gd=new Set([this]):gd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Oc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&va(t,n,a,!0),n=Do.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Oo===null?Wd():n.alternate===null&&rd===0&&(rd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),pf(e,r,a)),!1;case 22:return n.flags|=65536,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),pf(e,r,a)),!1}throw Error(i(435,n.tag))}return pf(e,r,a),Wd(),!1}if(W)return t=Do.current,t===null?(r!==ra&&(t=Error(i(423),{cause:r}),ua(Ri(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Ri(r,n),a=Tc(e.stateNode,r,a),go(e,a),rd!==4&&(rd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ra&&(e=Error(i(422),{cause:r}),ua(Ri(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Ri(o,n),ld===null?ld=[o]:ld.push(o),rd!==4&&(rd=2),t===null)return!0;r=Ri(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Tc(n.stateNode,r,e),go(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(gd===null||!gd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ec(a),Dc(a,e,n,r),go(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var kc=Error(i(461)),q=!1;function Ac(e,t,n,r){t.child=e===null?co(t,null,n,r):so(t,e.child,n,r)}function jc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ba(t),r=Yo(e,t,n,o,a,i),s=$o(),e!==null&&!q?(es(e,t,i),al(e,t,i)):(W&&s&&Xi(t),t.flags|=1,Ac(e,t,r,i),t.child)}function Mc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ki(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Nc(e,t,a,r,i)):(e=Mi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!ol(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Rr:n,n(o,r)&&e.ref===t.ref)return al(e,t,i)}return t.flags|=1,e=Ai(a,r),e.ref=t.ref,e.return=t,t.child=e}function Nc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Rr(a,r)&&e.ref===t.ref){if(q=!1,t.pendingProps=r=a,ol(e,i))e.flags&131072&&(q=!0);else return t.lanes=e.lanes,al(e,t,i)}}return Vc(e,t,n,r,i)}function Pc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Ic(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ua(t,a===null?null:a.cachePool),a===null?To():wo(t,a),jo(t);else return r=t.lanes=536870912,Ic(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ua(t,null),To(),Mo()):(Ua(t,a.cachePool),wo(t,a),Mo(),t.memoizedState=null);return Ac(e,t,i,n),t.child}function Fc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ic(e,t,n,r,i){var a=Ha();return a=a===null?null:{parent:Da._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ua(t,null),To(),jo(t),e!==null&&va(e,t,r,!0),t.childLanes=i,null}function Lc(e,t){return t=Xc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Rc(e,t,n){return so(t,e.child,null,n),e=Lc(t,t.pendingProps),e.flags|=2,No(t),t.memoizedState=null,e}function zc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(W){if(r.mode===`hidden`)return e=Lc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Fc(null,e);if(Ao(t),(e=ea)?(e=am(e,na),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Gi===null?null:{id:Ki,overflow:qi},retryLane:536870912,hydrationErrors:null},n=Fi(e),n.return=t,t.child=n,$i=t,ea=null)):e=null,e===null)throw ia(t);return t.lanes=536870912,null}return Lc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Ao(t),a){if(t.flags&256)t.flags&=-257,t=Rc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(q||va(e,t,n,!1),a=(n&e.childLanes)!==0,q||a){if(So.current===null){if(r=Zu,r!==null&&(s=pt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ci(e,s),Md(r,e,s),kc;Wd()}t=Rc(e,t,n)}else e=o.treeContext,ea=lm(s.nextSibling),$i=t,W=!0,ta=null,na=!1,e!==null&&Qi(t,e),t=Lc(t,r),t.flags|=134221824;return t}return e=Ai(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Bc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Vc(e,t,n,r,i){return ba(t),n=Yo(e,t,n,r,void 0,i),r=$o(),e!==null&&!q?(es(e,t,i),al(e,t,i)):(W&&r&&Xi(t),t.flags|=1,Ac(e,t,n,i),t.child)}function Hc(e,t,n,r,i,a){return ba(t),t.updateQueue=null,n=Zo(t,r,n,i),Xo(e),r=$o(),e!==null&&!q?(es(e,t,a),al(e,t,a)):(W&&r&&Xi(t),t.flags|=1,Ac(e,t,n,a),t.child)}function Uc(e,t,n,r,i){if(ba(t),t.stateNode===null){var a=Ei,o=n.contextType;typeof o==`object`&&o&&(a=xa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=gc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},uo(t),o=n.contextType,a.context=typeof o==`object`&&o?xa(o):Ei,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(hc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&gc.enqueueReplaceState(a,a.state,null),yo(t,r,a,i),vo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=yc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Ei,typeof u==`object`&&u&&(o=xa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&vc(t,a,r,o),lo=!1;var f=t.memoizedState;a.state=f,yo(t,r,a,i),vo(),l=t.memoizedState,s||f!==l||lo?(typeof d==`function`&&(hc(t,n,d,r),l=t.memoizedState),(c=lo||_c(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,fo(e,t),o=t.memoizedProps,u=yc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Ei,typeof l==`object`&&l&&(c=xa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&vc(t,a,r,c),lo=!1,f=t.memoizedState,a.state=f,yo(t,r,a,i),vo();var p=t.memoizedState;o!==d||f!==p||lo||e!==null&&e.dependencies!==null&&ya(e.dependencies)?(typeof s==`function`&&(hc(t,n,s,r),p=t.memoizedState),(u=lo||_c(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ya(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Bc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=so(t,e.child,null,i),t.child=so(t,null,n,i)):Ac(e,t,n,i),t.memoizedState=a.state,e=t.child):e=al(e,t,i),e}function Wc(e,t,n,r){return ca(),t.flags|=256,Ac(e,t,n,r),t.child}var Gc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Kc(e){return{baseLanes:e,cachePool:Wa()}}function qc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=sd),e}function Jc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Po.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(W){if(i?ko(t):Mo(),(e=ea)?(e=am(e,na),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Gi===null?null:{id:Ki,overflow:qi},retryLane:536870912,hydrationErrors:null},n=Fi(e),n.return=t,t.child=n,$i=t,ea=null)):e=null,e===null)throw ia(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Mo(),i=t.mode,a=Xc({mode:`hidden`,children:a},i),r=Ni(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Kc(n),r.childLanes=qc(e,o,n),t.memoizedState=Gc,Fc(null,r)):(ko(t),Yc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return Qc(e,t,a,o,r,c,s,n)}return i?(Mo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ai(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ni(i,a,n,null),i.flags|=2):i=Ai(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Fc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Kc(n):(a=i.cachePool,a===null?a=Wa():(s=Da._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=qc(e,o,n),t.memoizedState=Gc,Fc(e.child,r)):(ko(t),n=e.child,e=n.sibling,n=Ai(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Yc(e,t){return t=Xc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Xc(e,t){return e=Oi(22,e,null,t),e.lanes=0,e}function Zc(e,t,n){return so(t,e.child,null,n),e=Yc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Qc(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(ko(t),t.flags&=-257,Zc(e,t,c)):t.memoizedState===null?(Mo(),o=a.fallback,s=t.mode,a=Xc({mode:`visible`,children:a.children},s),o=Ni(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,so(t,e.child,null,c),a=t.child,a.memoizedState=Kc(c),a.childLanes=qc(e,r,c),t.memoizedState=Gc,Fc(null,a)):(Mo(),t.child=e.child,t.flags|=128,null);if(ko(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ua({value:a,source:null,stack:null})),Zc(e,t,c)}if(q||va(e,t,c,!1),r=(c&e.childLanes)!==0,q||r){if(So.current!==null)return Zc(e,t,c);if(r=Zu,r!==null&&(a=pt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ci(e,a),Md(r,e,a),kc;return om(o)||Wd(),Zc(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,ea=lm(o.nextSibling),$i=t,W=!0,ta=null,na=!1,e!==null&&Qi(t,e),t=Yc(t,a.children),t.flags|=134221824,t)}function $c(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ga(e.return,t,n)}function el(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&G(n)===null&&(t=e),e=e.sibling}return t}function tl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function nl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function rl(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Po.current;if(t.flags&128)return Fo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Fo(t,o),i===`backwards`&&e!==null?(nl(e),Ac(e,t,r,n),nl(e)):Ac(e,t,r,n),r=W?Hi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&$c(e,n,t);else if(e.tag===19)$c(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=el(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,nl(t)),tl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&G(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}tl(t,!0,n,null,a,r);break;case`together`:tl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=el(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),tl(t,!1,i,n,a,r)}return t.child}function il(e,t,n){var r=t.pendingProps;return ma(t,t.type,r.value),Ac(e,t,r.children,n),t.child}function al(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),id|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(va(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ai(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ai(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ol(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ya(e)))}function sl(e,t,n){switch(t.tag){case 3:Se(t,t.stateNode.containerInfo),ma(t,Da,e.memoizedState.cache),ca();break;case 27:case 5:V(t);break;case 4:Se(t,t.stateNode.containerInfo);break;case 10:ma(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ao(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return ko(t),t.flags|=128,null;r=va(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Jc(e,t,n):(ko(t),e=al(e,t,n),e===null?null:e.sibling)}ko(t);break;case 19:if(t.flags&128)return rl(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||(va(e,t,n,!1),r=(n&t.childLanes)!==0),i){if(r)return rl(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Fo(t,Po.current),r)break;return null;case 22:return t.lanes=0,Pc(e,t,n,t.pendingProps);case 24:ma(t,Da,e.memoizedState.cache)}return al(e,t,n)}function cl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)q=!0;else{if(!ol(e,n)&&!(t.flags&128))return q=!1,sl(e,t,n);q=!!(e.flags&131072)}}else q=!1,W&&t.flags&1048576&&Yi(t,Hi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Za(t.elementType),t.type=e,typeof e==`function`)ki(e)?(r=yc(e,r),t.tag=1,t=Uc(null,t,e,r,n)):(t.tag=0,t=Vc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===P){t.tag=11,t=jc(null,t,e,r,n);break a}if(a===ne){t.tag=14,t=Mc(null,t,e,r,n);break a}if(a===N){t.tag=10,t.type=e,t=il(null,t,n);break a}}throw t=ue(e)||e,Error(i(306,t,``))}}return t;case 0:return Vc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=yc(r,t.pendingProps),Uc(e,t,r,a,n);case 3:a:{if(Se(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,fo(e,t),yo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ma(t,Da,r),r!==o.cache&&_a(t,[Da],n,!0),vo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Wc(e,t,r,n);break a}if(r!==a){a=Ri(Error(i(424)),t),ua(a),t=Wc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(ea=lm(e.firstChild),$i=t,W=!0,ta=null,na=!0,n=co(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ca(),r===a){t=al(e,t,n);break a}Ac(e,t,r,n)}t=t.child}return t;case 26:return Bc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:W||(t.stateNode=fp(t.type,t.pendingProps,be.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return V(t),e===null&&W&&(r=t.stateNode=hm(t.type,t.pendingProps,be.current),$i=t,na=!0,a=ea,Sp(t.type)?(um=a,ea=lm(r.firstChild)):ea=a),Ac(e,t,t.pendingProps.children,n),Bc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&W&&((a=r=ea)&&(r=rm(r,t.type,t.pendingProps,na),r===null?a=!1:(t.stateNode=r,$i=t,ea=lm(r.firstChild),na=!1,a=!0)),a||ia(t)),V(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Yo(e,t,Qo,null,null,n),sh._currentValue=a),Bc(e,t),Ac(e,t,r,n),t.child;case 6:return e===null&&W&&((e=n=ea)&&(n=im(n,t.pendingProps,na),n===null?e=!1:(t.stateNode=n,$i=t,ea=null,e=!0)),e||ia(t)),null;case 13:return Jc(e,t,n);case 4:return Se(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=so(t,null,r,n):Ac(e,t,r,n),t.child;case 11:return jc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Bc(e,t),Ac(e,t,r,n),t.child;case 8:return Ac(e,t,t.pendingProps.children,n),t.child;case 12:return Ac(e,t,t.pendingProps.children,n),t.child;case 10:return il(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ba(t),a=xa(a),r=r(a),t.flags|=1,Ac(e,t,r,n),t.child;case 14:return Mc(e,t,t.type,t.pendingProps,n);case 15:return Nc(e,t,t.type,t.pendingProps,n);case 19:return rl(e,t,n);case 31:return zc(e,t,n);case 22:return Pc(e,t,n,t.pendingProps);case 24:return ba(t),r=xa(Da),e===null?(a=Ha(),a===null&&(a=Zu,o=Oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},uo(t),ma(t,Da,a)):((e.lanes&n)!==0&&(fo(e,t),yo(t,null,null,n),vo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ma(t,Da,r),r!==a.cache&&_a(t,[Da],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ma(t,Da,r))),Ac(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:W&&Xi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Bc(e,t),Ac(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ll(e){e.flags|=4}function ul(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Vd())e.flags|=8192;else throw Qa=Ja,Ka}}else e.flags&=-16777217}function dl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Vd())e.flags|=8192;else throw Qa=Ja,Ka}}function fl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:st(),e.lanes|=t,cd|=t)}function pl(e,t){if(!W)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function ml(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function hl(e,t,n){var r=t.pendingProps;switch(Zi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ml(t),null;case 1:return ml(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ha(Da),Ce(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(sa(t)?ll(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,la())),ml(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ll(t),o===null?(ml(t),ul(t,a,null,r,n)):(ml(t),dl(t,o))):o?o===e.memoizedState?(ml(t),t.flags&=-16777217):(ll(t),ml(t),dl(t,o)):(e=e.memoizedProps,e!==r&&ll(t),ml(t),ul(t,a,e,r,n)),null;case 27:if(we(t),n=be.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ll(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return ml(t),t.subtreeFlags&=-33554433,null}e=ve.current,sa(t)?aa(t,e):(e=hm(a,r,n),t.stateNode=e,ll(t))}return ml(t),t.subtreeFlags&=-33554433,null;case 5:if(we(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ll(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return ml(t),t.subtreeFlags&=-33554433,null}if(o=ve.current,sa(t))aa(t,o);else{var s=lp(be.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[yt]=t,o[bt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&ll(t)}}return ml(t),t.subtreeFlags&=-33554433,ul(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&ll(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=be.current,sa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=$i,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[yt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||$f(e.nodeValue,n)),e||ia(t,!0)}else e=lp(e).createTextNode(r),e[yt]=t,t.stateNode=e}return ml(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=sa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[yt]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ml(t),e=!1}else n=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(No(t),t):(No(t),null);if(t.flags&128)throw Error(i(558))}return ml(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[yt]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ml(t),a=!1}else a=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(No(t),t):(No(t),null)}return No(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),fl(t,t.updateQueue),ml(t),null);case 4:return Ce(),e===null&&Uf(t.stateNode.containerInfo),t.flags|=67108864,ml(t),null;case 10:return ha(t.type),ml(t),null;case 19:if(Io(t),r=t.memoizedState,r===null)return ml(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)pl(r,!1);else{if(rd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=G(e),o!==null){for(t.flags|=128,pl(r,!1),e=o.updateQueue,t.updateQueue=e,fl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)ji(n,e),n=n.sibling;return Fo(t,Po.current&1|2),W&&Ji(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Le()>md&&(t.flags|=128,a=!0,pl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=G(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,fl(t,e),pl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!W)return ml(t),null}else 2*Le()-r.renderingStartTime>md&&n!==536870912&&(t.flags|=128,a=!0,pl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Le(),e.sibling=null,o=Po.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||W?Fo(t,o):(n=o,_e(Do,t),_e(Po,n),Oo===null&&(Oo=t)),W&&Ji(t,r.treeForkCount),e}return ml(t),null;case 22:case 23:return No(t),Eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(ml(t),t.subtreeFlags&6&&(t.flags|=8192)):ml(t),n=t.updateQueue,n!==null&&fl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ge(Va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ha(Da),ml(t),null;case 25:return null;case 30:return t.flags|=33554432,ml(t),null}throw Error(i(156,t.tag))}function gl(e,t){switch(Zi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ha(Da),Ce(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return we(t),null;case 31:if(t.memoizedState!==null){if(No(t),t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(No(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Io(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ce(),null;case 10:return ha(t.type),null;case 22:case 23:return No(t),Eo(),e!==null&&ge(Va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ha(Da),null;case 25:return null;default:return null}}function _l(e,t){switch(Zi(t),t.tag){case 3:ha(Da),Ce();break;case 26:case 27:case 5:we(t);break;case 4:Ce();break;case 31:t.memoizedState!==null&&No(t);break;case 13:No(t);break;case 19:Io(t);break;case 10:ha(t.type);break;case 22:case 23:No(t),Eo(),e!==null&&ge(Va);break;case 24:ha(Da)}}function vl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){ff(t,t.return,e)}}function yl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){ff(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){ff(t,t.return,e)}}function bl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{xo(t,n)}catch(t){ff(e,e.return,t)}}}function xl(e,t,n){n.props=yc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){ff(e,t,n)}}function Sl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=pi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);m(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){ff(e,t,n)}}function Cl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){ff(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){ff(e,t,n)}else n.current=null}}function wl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function Tl(e){for(var t=e.return;t!==null&&(Ol(t)&&em(e.stateNode,t.stateNode),!Dl(t));)t=t.return}function El(e){for(var t=e.return;t!==null&&(Ol(t)&&tm(e.stateNode,t.stateNode),!Dl(t));)t=t.return}function Dl(e){return e.tag===5||e.tag===3||e.tag===27}function Ol(e){return e&&e.tag===7&&e.stateNode!==null}function kl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){ff(e,e.return,t)}}function Al(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[bt]=t}catch(t){ff(e,e.return,t)}}function jl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Ml(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||jl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Nl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=mn)),wl(e,r),Ht=!0;else if(i!==4&&(i===27&&(wl(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Nl(e,t,n,r),e=e.sibling;e!==null;)Nl(e,t,n,r),e=e.sibling}function Pl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),wl(e,r),Ht=!0;else if(i!==4&&(i===27&&(wl(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Pl(e,t,n,r),e=e.sibling;e!==null;)Pl(e,t,n,r),e=e.sibling}function Fl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[yt]=e,t[bt]=n}catch(t){ff(e,e.return,t)}}var Il=!1,Ll=null;function Rl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Il=!0)}var zl=null;function Bl(){var e=zl;return zl=null,e}var Vl=0;function Hl(e,t,n,r,i){return Vl=0,Ul(e.child,t,n,r,i)}function Ul(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Il=!0,Tp(o,Vl===0?t:t+`_`+Vl,n),Vl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Ul(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Wl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Wl(e.child,t),e=e.sibling}function Gl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Gl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=hi(t.default,t.share),t!==`none`&&(Hl(e,n,t,null,!1)||Wl(e.child,!1))}e=e.sibling}}function Kl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=pi(r,n),a=hi(r.default,n.paired?r.share:r.enter);a===`none`?Gl(e):Hl(e,i,a,null,!1)?(Gl(e),n.paired||t||jd(e,r.onEnter)):Wl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Kl(e,t),e=e.sibling;else Gl(e)}function ql(e){if(Ll!==null&&Ll.size!==0){var t=Ll;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=hi(n.default,n.share);if(a!==`none`&&(Hl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,jd(e,n.onShare)):Wl(e.child,!1)),t.delete(r),t.size===0)break}}}ql(e)}e=e.sibling}}}function Jl(e){if(e.tag===30){var t=e.memoizedProps,n=pi(t,e.stateNode),r=Ll===null?void 0:Ll.get(n),i=hi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Hl(e,n,i,null,!1)?r===void 0?jd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Ll.delete(n),jd(e,t.onShare)):Wl(e.child,!1)),Ll!==null&&ql(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Jl(e),e=e.sibling;else Ll!==null&&ql(e)}function Yl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=pi(t,e.stateNode);t=hi(t.default,t.update),e.flags&=-5,t!==`none`&&Hl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Yl(e);e=e.sibling}}function Xl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Wl(e.child,!1))}Xl(e)}e=e.sibling}}function Zl(e){if(e.tag===30)e.stateNode.paired=null,Wl(e.child,!1),Xl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Zl(e),e=e.sibling;else Xl(e)}function Ql(e){for(e=e.child;e!==null;)e.tag===30?Wl(e.child,!1):e.subtreeFlags&33554432&&Ql(e),e=e.sibling}function $l(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Vl<a.length){var l=a[Vl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Vl===0?n:n+`_`+Vl,i),s&&e.flags&4||(zl===null&&(zl=[]),zl.push(c,Vl===0?r:r+`_`+Vl,t.memoizedProps)),Vl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:$l(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function eu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=pi(n,r),a=hi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Vl=0,i=$l(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||jd(e,n.onUpdate))}else e.subtreeFlags&33554432&&eu(e,t);e=e.sibling}}var tu=!1,nu=!1,ru=!1,iu=!1,au=typeof WeakSet==`function`?WeakSet:Set,ou=null,su=!1,cu=!1,lu=!1,uu=!1;function du(e,t,n){if(e=e.containerInfo,sp=gh,e=Ur(e),Wr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r=r||{start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,ou=t,t=n?9270:1024;ou!==null;){if(e=ou,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Jl(r[a]);if(e.alternate===null&&e.flags&2)n&&Rl(e),fu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Jl(r),fu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Rl(e),fu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,ou=r):(n&&Yl(e),fu(n))}}Ll=null}function fu(e){for(;ou!==null;){var t=ou,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=yc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){ff(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=pi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=hi(a.default,a.update),a!==`none`&&Hl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,ou=r;break}ou=t.return}}function pu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Nu(e,n),r&4&&vl(5,n);break;case 1:if(Nu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){ff(n,n.return,e)}else{var i=yc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){ff(n,n.return,e)}}}r&64&&bl(n),r&512&&Sl(n,n.return);break;case 3:if(Nu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{xo(e,t)}catch(e){ff(n,n.return,e)}}break;case 27:t===null&&r&4&&Fl(n);case 26:case 5:Nu(e,n),t===null&&r&4&&kl(n),r&512&&Sl(n,n.return);break;case 12:Nu(e,n);break;case 31:Nu(e,n),r&4&&Su(e,n);break;case 13:Nu(e,n),r&4&&Cu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=gf.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||tu,!r){var a=t!==null&&t.memoizedState!==null||nu;t=tu,i=nu,tu=r,(nu=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Fu(e,n,r)):Nu(e,n),tu=t,nu=i}break;case 30:Nu(e,n),r&512&&Sl(n,n.return);break;case 7:r&512&&Sl(n,n.return);default:Nu(e,n)}}function mu(e,t){for(e=e.child;e!==null;)hu(e,t),e=e.sibling}function hu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){ff(e,e.return,t)}gu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,Ht=!0}catch(t){ff(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){ff(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&mu(e,t);break;default:mu(e,t)}}function gu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:hu(n,r);break a;case 22:n.memoizedState===null&&gu(n,r);break a;default:gu(n,r)}}e=e.sibling}}function _u(e){var t=e.alternate;t!==null&&(e.alternate=null,_u(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Dt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var vu=null,yu=!1;function bu(e,t,n){for(n=n.child;n!==null;)xu(e,t,n),n=n.sibling}function xu(e,t,n){if(qe&&typeof qe.onCommitFiberUnmount==`function`)try{qe.onCommitFiberUnmount(Ke,n)}catch{}switch(n.tag){case 26:nu||Cl(n,t),bu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!nu&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:nu||Cl(n,t),El(n);var r=vu,i=yu;Sp(n.type)&&(vu=n.stateNode,yu=!1),bu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),vu=r,yu=i;break;case 5:nu||Cl(n,t),El(n);case 6:if(n.tag===6&&El(n),r=vu,i=yu,vu=null,bu(e,t,n),vu=r,yu=i,vu!==null){if(yu)try{(vu.nodeType===9?vu.body:vu.nodeName===`HTML`?vu.ownerDocument.body:vu).removeChild(n.stateNode),Ht=!0}catch(e){ff(n,t,e)}else try{vu.removeChild(n.stateNode),Ht=!0}catch(e){ff(n,t,e)}}break;case 18:vu!==null&&(yu?(e=vu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(vu,n.stateNode));break;case 4:r=vu,i=yu,vu=n.stateNode.containerInfo,yu=!0,bu(e,t,n),vu=r,yu=i;break;case 0:case 11:case 14:case 15:yl(2,n,t),nu||yl(4,n,t),bu(e,t,n);break;case 1:nu||(Cl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&xl(n,t,r)),bu(e,t,n);break;case 21:bu(e,t,n);break;case 22:nu=(r=nu)||n.memoizedState!==null,bu(e,t,n),nu=r;break;case 30:Cl(n,t),bu(e,t,n);break;case 7:nu||Cl(n,t),bu(e,t,n);break;default:bu(e,t,n)}}function Su(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){ff(t,t.return,e)}}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){ff(t,t.return,e)}}function wu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new au),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new au),t;default:throw Error(i(435,e.tag))}}function Tu(e,t){var n=wu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=_f.bind(null,e,t);t.then(r,r)}})}function Eu(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){vu=l.stateNode,yu=!1;break a}break;case 5:vu=l.stateNode,yu=!1;break a;case 3:case 4:vu=l.stateNode.containerInfo,yu=!0;break a}l=l.return}if(vu===null)throw Error(i(160));xu(s,c,o),vu=null,yu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Ou(t,e,n),t=t.sibling}var Du=null;function Ou(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Eu(t,e,n),ku(e),a&4&&(yl(3,e,e.return),vl(3,e),yl(5,e,e.return));break;case 1:Eu(t,e,n),ku(e),a&512&&(nu||r===null||Cl(r,r.return)),a&64&&tu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Du,Eu(t,e,n),ku(e),a&512&&(nu||r===null||Cl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(tu)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Tt]||r[yt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[yt]=e,Mt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[yt]=e,Mt(r),t=r}e.stateNode=t}}else tu||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Al(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||nu||t.parentNode.removeChild(t)):a.count--,n===null?tu||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Eu(t,e,n),ku(e),a&512&&(nu||r===null||Cl(r,r.return)),r!==null&&a&4&&Al(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ru,ru=!1,Eu(t,e,n),ru=o,ku(e),a&512&&(nu||r===null||Cl(r,r.return)),e.flags&32){t=e.stateNode;try{on(t,``),Ht=!0}catch(t){ff(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Al(e,t,r===null?t:r.memoizedProps)),a&1024&&(iu=!0);break;case 6:if(Eu(t,e,n),ku(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,Ht=!0}catch(t){ff(e,e.return,t)}}break;case 3:if(Ht=!1,Wm=null,o=Du,Du=bm(t.containerInfo),Eu(t,e,n),Du=o,ku(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){ff(e,e.return,t)}iu&&(iu=!1,Au(e)),Ht=!1;break;case 4:a=ru,ru=tu,r=Ut(),o=Du,Du=bm(e.stateNode.containerInfo),Eu(t,e,n),ku(e),Du=o,Ht&&cu&&(lu=!0),Ht=r,ru=a;break;case 12:Eu(t,e,n),ku(e);break;case 31:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 13:Eu(t,e,n),ku(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(fd=Le()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=tu,l=nu,u=ru;tu=c||o,ru=u||o,nu=l||s,Eu(t,e,n),nu=l,ru=u,tu=c,ku(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||tu||nu||(t=s||nu,n=tu,r=nu,tu=o||tu,nu=t,Pu(e,2),tu=n,nu=r),!o&&ru||mu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Tu(e,n))));break;case 19:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 30:a&512&&(nu||r===null||Cl(r,r.return)),a=Ut(),o=cu,s=(n&335544064)===n,c=e.memoizedProps,cu=s&&hi(c.default,c.update)!==`none`,Eu(t,e,n),ku(e),s&&r!==null&&Ht&&(e.flags|=4),cu=o,Ht=a;break;case 21:break;case 7:a&512&&(nu||r===null||Cl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Eu(t,e,n),ku(e)}}function ku(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(jl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Ol(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Dl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Pl(e,Ml(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(on(l,``),n.flags&=-33),Pl(e,Ml(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Nl(e,Ml(e),u,s);break;default:throw Error(i(161))}}catch(t){ff(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Au(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Au(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function ju(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Mu(t,e),t=t.sibling;else eu(t,!1)}function Mu(e,t){var n=e.alternate;if(n===null)Kl(e,!1);else switch(e.tag){case 3:if(uu=su=!1,Bl(),ju(t,e),!su&&!lu){if(e=zl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),uu=!0}zl=null;break;case 5:ju(t,e);break;case 4:r=su,su=!1,ju(t,e),su&&(lu=!0),su=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?ju(t,e):Kl(e,!1));break;case 30:r=su,i=Bl(),su=!1,ju(t,e),su&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=pi(a,o),o=pi(n.memoizedProps,o);var s=hi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Vl=0,t=$l(e,n,t,o,s,a,!0),Vl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(jd(e,e.memoizedProps.onUpdate),zl=i):i!==null&&(i.push.apply(i,zl),zl=i),su=e.flags&32?!0:r;break;default:ju(t,e)}}function Nu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)pu(e,t.alternate,t),t=t.sibling}function Pu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:yl(4,n,n.return),Pu(n,r);break;case 1:Cl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&xl(n,n.return,i),Pu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:Cl(n,n.return),n.tag!==5&&n.tag!==27||El(n),Pu(n,r);break;case 6:El(n);break;case 26:Cl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||nu||i.parentNode.removeChild(i),Pu(n,r);break;case 22:n.memoizedState===null&&Pu(n,r);break;case 30:Cl(n,n.return),Pu(n,r);break;case 7:Cl(n,n.return);default:Pu(n,r)}e=e.sibling}}function Fu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Fu(i,a,n),vl(4,a);break;case 1:if(Fu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){ff(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)bo(l[i],c)}catch(e){ff(r,r.return,e)}}s&&o&64&&bl(a),Sl(a,a.return);break;case 27:n&2&&Fl(a);case 5:a.tag!==5&&a.tag!==27||Tl(a),Fu(i,a,n),s&&r===null&&o&4&&kl(a),Sl(a,a.return);break;case 6:Tl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||tu||Km(bm(c.ownerDocument),a.type,c),Fu(i,a,n),s&&r===null&&o&4&&kl(a),Sl(a,a.return);break;case 12:Fu(i,a,n);break;case 31:Fu(i,a,n),s&&o&4&&Su(i,a);break;case 13:Fu(i,a,n),s&&o&4&&Cu(i,a);break;case 22:a.memoizedState===null&&Fu(i,a,n),Sl(a,a.return);break;case 30:Fu(i,a,n),Sl(a,a.return);break;case 7:Sl(a,a.return);default:Fu(i,a,n)}t=t.sibling}}function Iu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ka(n))}function Lu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ka(e))}function J(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Ru(e,t,n,r),t=t.sibling;else i&&Ql(t)}function Ru(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Zl(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:J(e,t,n,r),a&2048&&vl(9,t);break;case 1:J(e,t,n,r);break;case 3:J(e,t,n,r),i&&uu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ka(a)));break;case 12:if(a&2048){J(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){ff(t,t.return,e)}}else J(e,t,n,r);break;case 31:J(e,t,n,r);break;case 13:J(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Zl(t),o._visibility&2?J(e,t,n,r):(o._visibility|=2,zu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Zl(s),o._visibility&2?J(e,t,n,r):Bu(e,t)),a&2048&&Iu(s,t);break;case 24:J(e,t,n,r),a&2048&&Lu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Wl(a.child,!0),Wl(t.child,!0))),J(e,t,n,r);break;default:J(e,t,n,r)}}function zu(e,t,n,r,i){for(i=i&&(!!(t.subtreeFlags&10256)||!1),t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:zu(a,o,s,c,i),vl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,zu(a,o,s,c,i)):u._visibility&2?zu(a,o,s,c,i):Bu(a,o),i&&l&2048&&Iu(o.alternate,o);break;case 24:zu(a,o,s,c,i),i&&l&2048&&Lu(o.alternate,o);break;default:zu(a,o,s,c,i)}t=t.sibling}}function Bu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Bu(n,r),i&2048&&Iu(r.alternate,r);break;case 24:Bu(n,r),i&2048&&Lu(r.alternate,r);break;default:Bu(n,r)}t=t.sibling}}var Vu=8192;function Hu(e,t,n){if(e.subtreeFlags&Vu)for(e=e.child;e!==null;)Uu(e,t,n),e=e.sibling}function Uu(e,t,n){switch(e.tag){case 26:Hu(e,t,n),e.flags&Vu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Du,e.memoizedState,e.memoizedProps));break;case 5:Hu(e,t,n),e.flags&Vu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Du;Du=bm(e.stateNode.containerInfo),Hu(e,t,n),Du=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Vu,Vu=16777216,Hu(e,t,n),Vu=r):Hu(e,t,n));break;case 30:if((e.flags&Vu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Ll===null&&(Ll=new Map),Ll.set(r,i)}Hu(e,t,n);break;default:Hu(e,t,n)}}function Wu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Gu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Ju(r,e)}Wu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Ku(e),e=e.sibling}function Ku(e){switch(e.tag){case 0:case 11:case 15:Gu(e),e.flags&2048&&yl(9,e,e.return);break;case 3:Gu(e);break;case 12:Gu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,qu(e)):Gu(e);break;default:Gu(e)}}function qu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Ju(r,e)}Wu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:yl(8,t,t.return),qu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,qu(t));break;default:qu(t)}e=e.sibling}}function Ju(e,t){for(;ou!==null;){var n=ou;switch(n.tag){case 0:case 11:case 15:yl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ka(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ou=r;else a:for(n=e;ou!==null;){r=ou;var i=r.sibling,a=r.return;if(_u(r),r===n){ou=null;break a}if(i!==null){i.return=a,ou=i;break a}ou=a}}}var Y={getCacheForType:function(e){var t=xa(Da),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return xa(Da).controller.signal}},Yu=typeof WeakMap==`function`?WeakMap:Map,Xu=0,Zu=null,X=null,Z=0,Qu=0,$u=null,Q=!1,ed=!1,td=!1,nd=0,rd=0,id=0,ad=0,od=0,sd=0,cd=0,ld=null,ud=null,dd=!1,fd=0,pd=0,md=1/0,hd=null,gd=null,_d=0,vd=null,yd=null,bd=0,xd=0,Sd=null,Cd=null,wd=null,Td=null,Ed=null,Dd=0,Od=null;function kd(){return Xu&2&&Z!==0?Z&-Z:z.T===null?gt():Nf()}function Ad(){if(sd===0){if(!(Z&536870912)||W){var e=et;et<<=1,!(et&3932160)&&(et=262144),sd=e}else sd=536870912}return e=Do.current,e!==null&&(e.flags|=32),sd}function jd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(pi(e.memoizedProps,n))),Td===null&&(Td=[]),Td.push(t.bind(null,r))}}function Md(e,t,n){(e===Zu&&(Qu===2||Qu===9)||e.cancelPendingCommit!==null)&&(zd(e,0),Id(e,Z,sd,!1)),lt(e,n),Xu&2&&e===Zu||(e===Zu&&(!(Xu&2)&&(ad|=n),rd===4&&Id(e,Z,sd,!1)),Tf(e))}function Nd(e,t,n){if(Xu&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||it(e,t),a=r?qd(e,t):Gd(e,t,!0),o=r;do{if(a===0){ed&&!r&&Id(e,t,0,!1);break}if(n=e.current.alternate,o&&!Fd(n))a=Gd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=ld;var l=c.current.memoizedState.isDehydrated;if(l&&(zd(c,s).flags|=256),s=Gd(c,s,!1),s!==2&&s!==6){if(td&&!l){c.errorRecoveryDisabledLanes|=o,ad|=o,a=4;break a}o=ud,ud=a,o!==null&&(ud===null?ud=o:ud.push.apply(ud,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){zd(e,0),Id(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Id(r,t,sd,!Q);break a;case 2:ud=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=fd+300-Le(),10<a)){if(Id(r,t,sd,!Q),rt(r,0,!0)!==0)break a;bd=t,r.timeoutHandle=gp(Pd.bind(null,r,n,ud,hd,dd,t,sd,ad,cd,Q,o,`Throttled`,-0,0),a);break a}Pd(r,n,ud,hd,dd,t,sd,ad,cd,Q,o,null,-0,0)}break}}while(1);Tf(e)}function Pd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:mn},Ll=null,Uu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?fd-Le():(a&4194048)===a?pd-Le():0,m=eh(d,m),m!==null)?(bd=a,e.cancelPendingCommit=m(ef.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Id(e,a,o,!l)):ef(e,t,a,n,r,i,o,s,c,l,u,d)}function Fd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Lr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Id(e,t,n,r){t=at(e,t),t&=~od,t&=~ad,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-Ye(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&dt(e,n,t)}function Ld(){return Xu&6?!0:(Ef(0,!1),!1)}function Rd(){if(X!==null){if(Qu===0)var e=X.return;else e=X,pa=fa=null,ts(e),to=null,no=0,e=X;for(;e!==null;)_l(e.alternate,e),e=e.return;X=null}}function zd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),bd=0,Rd(),Zu=e,X=n=Ai(e.current,null),Z=t,Qu=0,$u=null,Q=!1,ed=it(e,t),td=!1,cd=sd=od=ad=id=rd=0,ud=ld=null,dd=!1,nd=at(e,t),bi(),n}function Bd(e,t){K=null,z.H=dc,t===Ga||t===qa?(t=$a(),Qu=3):t===Ka?(t=$a(),Qu=4):Qu=t===kc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,$u=t,X===null&&(rd=1,Cc(e,Ri(t,e.current)))}function Vd(){var e=Do.current;return e===null?!0:(Z&4194048)===Z?Oo===null:(Z&62914560)===Z||Z&536870912?e===Oo:!1}function Hd(){var e=z.H;return z.H=dc,e===null?dc:e}function Ud(){var e=z.A;return z.A=Y,e}function Wd(){rd=4,Q||(Z&4194048)!==Z&&Do.current!==null||(ed=!0),!(id&134217727)&&!(ad&134217727)||Zu===null||Id(Zu,Z,sd,!1)}function Gd(e,t,n){var r=Xu;Xu|=2;var i=Hd(),a=Ud();(Zu!==e||Z!==t)&&(hd=null,zd(e,t)),t=!1;var o=rd;a:do try{if(Qu!==0&&X!==null){var s=X,c=$u;switch(Qu){case 8:Rd(),o=6;break a;case 3:case 2:case 9:case 6:Do.current===null&&(t=!0);var l=Qu;if(Qu=0,$u=null,Zd(e,s,c,l),n&&ed){o=0;break a}break;default:l=Qu,Qu=0,$u=null,Zd(e,s,c,l)}}Kd(),o=rd;break}catch(t){Bd(e,t)}while(1);return t&&e.shellSuspendCounter++,pa=fa=null,Xu=r,z.H=i,z.A=a,X===null&&(Zu=null,Z=0,bi()),o}function Kd(){for(;X!==null;)Yd(X)}function qd(e,t){var n=Xu;Xu|=2;var r=Hd(),a=Ud();Zu!==e||Z!==t?(hd=null,md=Le()+500,zd(e,t)):ed=it(e,t);a:do try{if(Qu!==0&&X!==null){t=X;var o=$u;b:switch(Qu){case 1:Qu=0,$u=null,Zd(e,t,o,1);break;case 2:case 9:if(Ya(o)){Qu=0,$u=null,Xd(t);break}t=function(){Qu!==2&&Qu!==9||Zu!==e||(Qu=7),Tf(e)},o.then(t,t);break a;case 3:Qu=7;break a;case 4:Qu=5;break a;case 7:Ya(o)?(Qu=0,$u=null,Xd(t)):(Qu=0,$u=null,Zd(e,t,o,7));break;case 5:var s=null;switch(X.tag){case 26:s=X.memoizedState;case 5:case 27:var c=X;if(s?Ym(s):c.stateNode.complete){Qu=0,$u=null;var l=c.sibling;if(l!==null)X=l;else{var u=c.return;u===null?X=null:(X=u,Qd(u))}break b}}Qu=0,$u=null,Zd(e,t,o,5);break;case 6:Qu=0,$u=null,Zd(e,t,o,6);break;case 8:Rd(),rd=6;break a;default:throw Error(i(462))}}Jd();break}catch(t){Bd(e,t)}while(1);return pa=fa=null,z.H=r,z.A=a,Xu=n,X===null?(Zu=null,Z=0,bi(),rd):0}function Jd(){for(;X!==null&&!Fe();)Yd(X)}function Yd(e){var t=cl(e.alternate,e,nd);e.memoizedProps=e.pendingProps,t===null?Qd(e):X=t}function Xd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Hc(n,t,t.pendingProps,t.type,void 0,Z);break;case 11:t=Hc(n,t,t.pendingProps,t.type.render,t.ref,Z);break;case 5:ts(t);var r=t;r===$i&&(W?(oa(r),r.tag===5&&r.stateNode!=null&&(ea=r.stateNode)):(oa(r),W=!0));default:_l(n,t),t=X=ji(t,nd),t=cl(n,t,nd)}e.memoizedProps=e.pendingProps,t===null?Qd(e):X=t}function Zd(e,t,n,r){pa=fa=null,ts(t),to=null,no=0;var i=t.return;try{if(Oc(e,i,t,n,Z)){rd=1,Cc(e,Ri(n,e.current)),X=null;return}}catch(t){if(i!==null)throw X=i,t;rd=1,Cc(e,Ri(n,e.current)),X=null;return}t.flags&32768?(W||r===1?e=!0:ed||Z&536870912?e=!1:(Q=e=!0,(r===2||r===9||r===3||r===6)&&(r=Do.current,r!==null&&r.tag===13&&(r.flags|=16384))),$d(t,e)):Qd(t)}function Qd(e){var t=e;do{if(t.flags&32768){$d(t,Q);return}e=t.return;var n=hl(t.alternate,t,nd);if(n!==null){X=n;return}if(t=t.sibling,t!==null){X=t;return}X=t=e}while(t!==null);rd===0&&(rd=5)}function $d(e,t){do{var n=gl(e.alternate,e);if(n!==null){n.flags&=32767,X=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){X=e;return}X=e=n}while(e!==null);rd=6,X=null}function ef(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do lf();while(_d!==0);if(Xu&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===Zu&&(X=Zu=null,Z=0),yd=t,vd=e,bd=n,Sd=a,Cd=r,tf(e,t,n,s,c,l,f)}}function tf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(xd=s,s|=yi,ut(e,n,s,r,i,a),Td=null,(n&335544064)===n?(Ed=Ma(e),r=10262):(Ed=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,vf(Ve,function(){return uf(),null})):(e.callbackNode=null,e.callbackPriority=0),Il=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=z.T,z.T=null,i=B.p,B.p=2,a=Xu,Xu|=4;try{du(e,t,n)}finally{Xu=a,B.p=i,z.T=r}}_d=1,Il?wd=Mp(o,e.containerInfo,Ed,af,of,rf,sf,uf,nf,null,null):(af(),of(),sf())}function nf(e){if(_d!==0){var t=vd.onRecoverableError;t(e,{componentStack:null})}}function rf(){_d===3&&(_d=0,Mu(yd,vd),_d=4)}function af(){if(_d===1){_d=0;var e=vd,t=yd,n=bd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=z.T,z.T=null;var i=B.p;B.p=2;var a=Xu;Xu|=4;try{cu=lu=!1,Ou(t,e,n),n=cp;var o=Ur(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Hr(s.ownerDocument.documentElement,s)){if(c!==null&&Wr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Vr(s,h),v=Vr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{Xu=a,B.p=i,z.T=r}}e.current=t,_d=2}}function of(){if(_d===2){_d=0;var e=vd,t=yd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=z.T,z.T=null;var r=B.p;B.p=2;var i=Xu;Xu|=4;try{pu(e,t.alternate,t)}finally{Xu=i,B.p=r,z.T=n}}_d=3}}function sf(){if(_d===4||_d===3){_d=0;var e=wd;wd=null,Ie();var t=vd,n=yd,r=bd,i=Cd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?_d=5:(_d=0,yd=vd=null,cf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(gd=null),ht(r),n=n.stateNode,qe&&typeof qe.onCommitFiberRoot==`function`)try{qe.onCommitFiberRoot(Ke,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=z.T,a=B.p,B.p=2,z.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{z.T=n,B.p=a}}if(i=Td,o=Ed,Ed=null,i!==null&&(Td=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);bd&3&&lf(),Tf(t),a=t.pendingLanes,r&261930&&a&42?t===Od?Dd++:(Dd=0,Od=t):(Dd=0,Od=null),Ef(0,!1)}}function cf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ka(t)))}function lf(){return wd!==null&&(wd.skipTransition(),wd=null),af(),of(),sf(),uf()}function uf(){if(_d!==5)return!1;var e=vd,t=xd;xd=0;var n=ht(bd),r=z.T,a=B.p;try{B.p=32>n?32:n,z.T=null,n=Sd,Sd=null;var o=vd,s=bd;if(_d=0,yd=vd=null,bd=0,Xu&6)throw Error(i(331));var c=Xu;if(Xu|=4,Ku(o.current),Ru(o,o.current,s,n),Xu=c,Ef(0,!1),qe&&typeof qe.onPostCommitFiberRoot==`function`)try{qe.onPostCommitFiberRoot(Ke,o)}catch{}return!0}finally{B.p=a,z.T=r,cf(e,t)}}function df(e,t,n){t=Ri(n,t),t=Tc(e.stateNode,t,2),e=mo(e,t,2),e!==null&&(lt(e,2),Tf(e))}function ff(e,t,n){if(e.tag===3)df(e,e,n);else for(;t!==null;){if(t.tag===3){df(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(gd===null||!gd.has(r))){e=Ri(n,e),n=Ec(2),r=mo(t,n,2),r!==null&&(Dc(n,r,t,e),lt(r,2),Tf(r));break}}t=t.return}}function pf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Yu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(td=!0,i.add(n),e=mf.bind(null,e,t,n),t.then(e,e))}function mf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Zu===e&&(Z&n)===n&&(rd===4||rd===3&&(Z&62914560)===Z&&300>Le()-fd?Xu&2?od|=n:zd(e,0):od|=n,cd===Z&&(cd=0)),Tf(e)}function hf(e,t){t===0&&(t=st()),e=Ci(e,t),e!==null&&(lt(e,t),Tf(e))}function gf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),hf(e,n)}function _f(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),hf(e,n)}function vf(e,t){return Ne(e,t)}var yf=null,bf=null,xf=!1,Sf=!1,Cf=!1,wf=0;function Tf(e){e!==bf&&e.next===null&&(bf===null?yf=bf=e:bf=bf.next=e),Sf=!0,xf||(xf=!0,Mf())}function Ef(e,t){if(!Cf&&Sf){Cf=!0;do for(var n=!1,r=yf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-Ye(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,jf(r,a))}else a=Z,a=rt(r,r===Zu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||it(r,a)||(n=!0,jf(r,a))}r=r.next}while(n);Cf=!1}}function Df(){Of()}function Of(){Sf=xf=!1;var e=0;wf!==0&&hp()&&(e=wf);for(var t=Le(),n=null,r=yf;r!==null;){var i=r.next,a=kf(r,t);a===0?(r.next=null,n===null?yf=i:n.next=i,i===null&&(bf=n)):(n=r,(e!==0||a&3)&&(Sf=!0)),r=i}_d!==0&&_d!==5||Ef(e,!1),wf!==0&&(wf=0)}function kf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-Ye(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ot(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Zu,n=Z,n=rt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Qu===2||Qu===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Pe(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||it(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Pe(r),ht(n)){case 2:case 8:n=Be;break;case 32:n=Ve;break;case 268435456:n=Ue;break;default:n=Ve}return r=Af.bind(null,e),n=Ne(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Pe(r),e.callbackPriority=2,e.callbackNode=null,2}function Af(e,t){if(_d!==0&&_d!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(lf()&&e.callbackNode!==n)return null;var r=Z;return r=rt(e,e===Zu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Nd(e,r,t),kf(e,Le()),e.callbackNode!=null&&e.callbackNode===n?Af.bind(null,e):null)}function jf(e,t){if(lf())return null;Nd(e,t,!0)}function Mf(){bp(function(){Xu&6?Ne(ze,Df):Of()})}function Nf(){if(wf===0){var e=Fa;e===0&&(e=$e,$e<<=1,!($e&261888)&&($e=256)),wf=e}return wf}function Pf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:pn(e)}function Ff(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Pf((i[bt]||null).action),o=r.submitter;o&&(t=(t=o[bt]||null)?Pf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Fn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(wf!==0){var e=new FormData(i,o);Zs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Zs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var If=0;If<ui.length;If++){var Lf=ui[If];di(Lf.toLowerCase(),`on`+(Lf[0].toUpperCase()+Lf.slice(1)))}di(ni,`onAnimationEnd`),di(ri,`onAnimationIteration`),di(ii,`onAnimationStart`),di(`dblclick`,`onDoubleClick`),di(`focusin`,`onFocus`),di(`focusout`,`onBlur`),di(ai,`onTransitionRun`),di(oi,`onTransitionStart`),di(si,`onTransitionCancel`),di(ci,`onTransitionEnd`),Lt(`onMouseEnter`,[`mouseout`,`mouseover`]),Lt(`onMouseLeave`,[`mouseout`,`mouseover`]),Lt(`onPointerEnter`,[`pointerout`,`pointerover`]),Lt(`onPointerLeave`,[`pointerout`,`pointerover`]),It(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),It(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),It(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),It(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),It(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),It(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Rf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),zf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Rf));function Bf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){gi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){gi(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[H];n===void 0&&(n=t[H]=new Set);var r=e+`__bubble`;n.has(r)||(Wf(t,e,2,!1),n.add(r))}function Vf(e,t,n){var r=0;t&&(r|=4),Wf(n,e,r,t)}var Hf=`_reactListening`+Math.random().toString(36).slice(2);function Uf(e){if(!e[Hf]){e[Hf]=!0,Pt.forEach(function(t){t!==`selectionchange`&&(zf.has(t)||Vf(t,!1,e),Vf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Hf]||(t[Hf]=!0,Vf(`selectionchange`,!1,t))}}function Wf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!wn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Gf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ot(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}xn(function(){var r=a,i=gn(n),s=[];a:{var c=li.get(e);if(c!==void 0){var l=Fn,u=e;switch(e){case`keypress`:if(An(n)===0)break a;case`keydown`:case`keyup`:l=$n;break;case`focusin`:u=`focus`,l=Wn;break;case`focusout`:u=`blur`,l=Wn;break;case`beforeblur`:case`afterblur`:l=Wn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Hn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Un;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=nr;break;case ni:case ri:case ii:l=Gn;break;case ci:l=rr;break;case`scroll`:case`scrollend`:l=Ln;break;case`wheel`:l=ir;break;case`copy`:case`cut`:case`paste`:l=Kn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=er;break;case`submit`:l=tr;break;case`toggle`:case`beforetoggle`:l=ar}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Sn(m,p),g!=null&&d.push(Kf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==hn&&(u=n.relatedTarget||n.fromElement)&&(Ot(u)||u[xt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ot(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Hn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=er,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:At(c),h=l==null?u:At(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ot(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Jf):null,c!==null&&Yf(s,u,c,d,!1),l!==null&&f!==null&&Yf(s,f,l,d,!0)))}a:{if(c=r?At(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Tr;else if(yr(c)){if(Er)_=Fr;else{_=Nr;var v=Mr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&un(r.elementType)&&(_=Tr):_=Pr;if(_&&(_=_(e,r))){br(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?At(r):window,e){case`focusin`:(yr(v)||v.contentEditable===`true`)&&(Kr=v,qr=r,Jr=null);break;case`focusout`:Jr=qr=Kr=null;break;case`mousedown`:Yr=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Yr=!1,Xr(s,n,i);break;case`selectionchange`:if(Gr)break;case`keydown`:case`keyup`:Xr(s,n,i)}var y;if(sr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else hr?pr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(ur&&n.locale!==`ko`&&(hr||b!==`onCompositionStart`?b===`onCompositionEnd`&&hr&&(y=kn()):(En=i,Dn=`value`in En?En.value:En.textContent,hr=!0)),v=qf(r,b),0<v.length&&(b=new qn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=mr(n),y!==null&&(b.data=y)))),(y=lr?gr(e,n):_r(e,n))&&(b=qf(r,`onBeforeInput`),0<b.length&&(v=new qn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Ff(s,e,r,n,i)}Bf(s,t)})}function Kf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Sn(e,n),i!=null&&r.unshift(Kf(e,i,a)),i=Sn(e,t),i!=null&&r.push(Kf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Jf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Yf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Sn(n,a),l!=null&&o.unshift(Kf(n,l,c))):i||(l=Sn(n,a),l!=null&&o.push(Kf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Xf=/\r\n?/g,Zf=/\u0000|\uFFFD/g;function Qf(e){return(typeof e==`string`?e:``+e).replace(Xf,`
`).replace(Zf,``)}function $f(e,t){return t=Qf(t),Qf(e)===t}function ep(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||on(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&on(e,``+r);else return;break;case`className`:Gt(e,`class`,r);break;case`tabIndex`:Gt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Gt(e,n,r);break;case`style`:ln(e,r,o);return;case`data`:if(t!==`object`){Gt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=pn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ep(e,t,`name`,a.name,a,null),ep(e,t,`formEncType`,a.formEncType,a,null),ep(e,t,`formMethod`,a.formMethod,a,null),ep(e,t,`formTarget`,a.formTarget,a,null)):(ep(e,t,`encType`,a.encType,a,null),ep(e,t,`method`,a.method,a,null),ep(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=pn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=mn);return;case`onScroll`:r!=null&&$(`scroll`,e);return;case`onScrollEnd`:r!=null&&$(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));(o==null?void 0:o.__html)!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=pn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Wt(e,`popover`,r);break;case`xlinkActuate`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Kt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Kt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Wt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=dn.get(n)||n,Wt(e,n,r);else return}Ht=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:ln(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));(o==null?void 0:o.__html)!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)on(e,r);else if(typeof r==`number`||typeof r==`bigint`)on(e,``+r);else return;break;case`onScroll`:r!=null&&$(`scroll`,e);return;case`onScrollEnd`:r!=null&&$(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=mn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ft.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[bt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}Ht=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Wt(e,n,r)}return}Ht=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,o,s,n,null)}}a&&ep(e,t,`srcSet`,n.srcSet,n,null),r&&ep(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ep(e,t,r,d,n,null)}}en(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ep(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&nn(e,!!r,n,!0):nn(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ep(e,t,s,c,n,null)}an(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ep(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<Rf.length;r++)$(Rf[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,u,r,n,null)}return;default:if(un(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ep(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ep(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(Ht=!0),o=m;break;case`name`:m!==f&&(Ht=!0),a=m;break;case`checked`:m!==f&&(Ht=!0),u=m;break;case`defaultChecked`:m!==f&&(Ht=!0),d=m;break;case`value`:m!==f&&(Ht=!0),s=m;break;case`defaultValue`:m!==f&&(Ht=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ep(e,t,p,m,r,f)}}$t(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ep(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(Ht=!0),p=o;break;case`defaultValue`:o!==l&&(Ht=!0),c=o;break;case`multiple`:o!==l&&(Ht=!0),s=o;default:o!==l&&ep(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?nn(e,!!n,n?[]:``,!1):nn(e,!!n,t,!0)):nn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ep(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(Ht=!0),p=a;break;case`defaultValue`:a!==o&&(Ht=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ep(e,t,s,a,r,o)}rn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ep(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(Ht=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ep(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ep(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ep(e,t,u,p,r,m)}return;default:if(un(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ep(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ep(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[yt]=r,n[bt]=t,np(n,e,t),Mt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Tt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),m(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),m(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){m(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];m(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&m(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),m(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),m(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return m(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];m(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ot(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(m(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(m(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];m(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Dt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Tt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ep(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===mn&&(e.onclick=null),Dt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Dt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=B.d;B.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=Ld();return e||t}function Cm(e){var t=kt(e);t!==null&&t.tag===5&&t.type===`form`?$s(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=Qt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Mt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+Qt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+Qt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+Qt(n.imageSizes)+`"]`)):i+=`[href="`+Qt(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Et]=!0,o.onload=o.onerror=function(){Nt(o)}),Mt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+Qt(r)+`"][href="`+Qt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Mt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=jt(r).hoistableStyles,a=Pm(e);t=t||`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Mt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=jt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Mt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=jt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Mt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=be.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=jt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=jt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=jt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+Qt(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Et]){r.loading=1;return}}else t=e.createElement(`link`),t[Et]=!0,t.onload=t.onerror=Nt.bind(null,t),np(t,`link`,n),Mt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+Qt(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+Qt(n.href)+`"]`);if(r)return t.instance=r,Mt(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Mt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Mt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Mt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Mt(a),a):(r=n,(a=vm.get(o))&&(r=D({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Mt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Um(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Tt]||a[yt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Mt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Mt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:N,Provider:null,Consumer:null,_currentValue:fe,_currentValue2:fe,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=ct(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ct(0),this.hiddenUpdates=ct(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Oi(3,null,null,t),e.current=a,a.stateNode=e,t=Oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},uo(a),e}function uh(e){return e?(e=Ei,e):Ei}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=po(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=mo(e,r,t),n!==null&&(Md(n,e,t),ho(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ci(e,67108864);t!==null&&Md(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=kd();t=mt(t);var n=Ci(e,t);n!==null&&Md(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=z.T;z.T=null;var a=B.p;try{B.p=2,yh(e,t,n,r)}finally{B.p=a,z.T=i}}function vh(e,t,n,r){var i=z.T;z.T=null;var a=B.p;try{B.p=8,yh(e,t,n,r)}finally{B.p=a,z.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Gf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=kt(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=nt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-Ye(o);s.entanglements[1]|=c,o&=~c}Tf(a),!(Xu&6)&&(md=Le()+500,Ef(0,!1))}}break;case 31:case 13:s=Ci(a,2),s!==null&&Md(s,a,2),Ld(),ph(a,2)}if(a=bh(r),a===null&&Gf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Gf(e,t,r,null,n)}}function bh(e){return e=gn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ot(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Re()){case ze:return 2;case Be:return 8;case Ve:case He:return 32;case Ue:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=kt(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ot(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,_t(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,_t(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);hn=r,n.target.dispatchEvent(r),hn=null}else return t=kt(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=kt(n);a!==null&&(e.splice(t,3),t-=3,Zs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[bt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[bt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,kd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),Ld(),t[xt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=gt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));B.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=u(t),e=e===null?null:f(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:z,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{Ke=Jh.inject(qh),qe=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=bc,s=xc,c=Sc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[xt]=t.current,Uf(e),new Wh(t)}})),_=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=g()})),v=(...e)=>e.filter((e,t,n)=>!!e&&e.trim()!==``&&n.indexOf(e)===t).join(` `).trim(),y=e=>e.replace(/([a-z0-9])([A-Z])/g,`$1-$2`).toLowerCase(),b=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase()),x=e=>{let t=b(e);return t.charAt(0).toUpperCase()+t.slice(1)},S={xmlns:`http://www.w3.org/2000/svg`,width:24,height:24,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:2,strokeLinecap:`round`,strokeLinejoin:`round`},C=e=>{for(let t in e)if(t.startsWith(`aria-`)||t===`role`||t===`title`)return!0;return!1},w=c(p()),T=(0,w.forwardRef)(({color:e=`currentColor`,size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:i=``,children:a,iconNode:o,...s},c)=>(0,w.createElement)(`svg`,{ref:c,...S,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:v(`lucide`,i),...!a&&!C(s)&&{"aria-hidden":`true`},...s},[...o.map(([e,t])=>(0,w.createElement)(e,t)),...Array.isArray(a)?a:[a]])),E=(e,t)=>{let n=(0,w.forwardRef)(({className:n,...r},i)=>(0,w.createElement)(T,{ref:i,iconNode:t,className:v(`lucide-${y(x(e))}`,`lucide-${e}`,n),...r}));return n.displayName=x(e),n},D=E(`arrow-left`,[[`path`,{d:`m12 19-7-7 7-7`,key:`1l729n`}],[`path`,{d:`M19 12H5`,key:`x3x0zl`}]]),ee=E(`audio-lines`,[[`path`,{d:`M2 10v3`,key:`1fnikh`}],[`path`,{d:`M6 6v11`,key:`11sgs0`}],[`path`,{d:`M10 3v18`,key:`yhl04a`}],[`path`,{d:`M14 8v7`,key:`3a1oy3`}],[`path`,{d:`M18 5v13`,key:`123xd1`}],[`path`,{d:`M22 10v3`,key:`154ddg`}]]),O=E(`book-open`,[[`path`,{d:`M12 7v14`,key:`1akyts`}],[`path`,{d:`M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z`,key:`ruj8y`}]]),k=E(`bookmark`,[[`path`,{d:`M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z`,key:`oz39mx`}]]),te=E(`chevron-down`,[[`path`,{d:`m6 9 6 6 6-6`,key:`qrunsl`}]]),A=E(`chevron-right`,[[`path`,{d:`m9 18 6-6-6-6`,key:`mthhwq`}]]),j=E(`clock-3`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6h4`,key:`135r8i`}]]),M=E(`disc-3`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M6 12c0-1.7.7-3.2 1.8-4.2`,key:`oqkarx`}],[`circle`,{cx:`12`,cy:`12`,r:`2`,key:`1c9p78`}],[`path`,{d:`M18 12c0 1.7-.7 3.2-1.8 4.2`,key:`1eah9h`}]]),N=E(`ellipsis-vertical`,[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`circle`,{cx:`12`,cy:`5`,r:`1`,key:`gxeob9`}],[`circle`,{cx:`12`,cy:`19`,r:`1`,key:`lyex9k`}]]),P=E(`ellipsis`,[[`circle`,{cx:`12`,cy:`12`,r:`1`,key:`41hilf`}],[`circle`,{cx:`19`,cy:`12`,r:`1`,key:`1wjl8i`}],[`circle`,{cx:`5`,cy:`12`,r:`1`,key:`1pcz8c`}]]),F=E(`file-text`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M10 9H8`,key:`b1mrlr`}],[`path`,{d:`M16 13H8`,key:`t4e002`}],[`path`,{d:`M16 17H8`,key:`z1uh3a`}]]),I=E(`folder-open`,[[`path`,{d:`m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2`,key:`usdka0`}]]),ne=E(`folder`,[[`path`,{d:`M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`,key:`1kt360`}]]),re=E(`heart`,[[`path`,{d:`M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5`,key:`mvr1a0`}]]),L=E(`info`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 16v-4`,key:`1dtifu`}],[`path`,{d:`M12 8h.01`,key:`e9boi3`}]]),R=E(`languages`,[[`path`,{d:`m5 8 6 6`,key:`1wu5hv`}],[`path`,{d:`m4 14 6-6 2-3`,key:`1k1g8d`}],[`path`,{d:`M2 5h12`,key:`or177f`}],[`path`,{d:`M7 2h1`,key:`1t2jsx`}],[`path`,{d:`m22 22-5-10-5 10`,key:`don7ne`}],[`path`,{d:`M14 18h6`,key:`1m8k6r`}]]),ie=E(`list-music`,[[`path`,{d:`M16 5H3`,key:`m91uny`}],[`path`,{d:`M11 12H3`,key:`51ecnj`}],[`path`,{d:`M11 19H3`,key:`zflm78`}],[`path`,{d:`M21 16V5`,key:`yxg4q8`}],[`circle`,{cx:`18`,cy:`16`,r:`3`,key:`1hluhg`}]]),ae=E(`moon`,[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,key:`kfwtm`}]]),oe=E(`pause`,[[`rect`,{x:`14`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`kaeet6`}],[`rect`,{x:`5`,y:`3`,width:`5`,height:`18`,rx:`1`,key:`1wsw3u`}]]),se=E(`play`,[[`path`,{d:`M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z`,key:`10ikf1`}]]),ce=E(`plus`,[[`path`,{d:`M5 12h14`,key:`1ays0h`}],[`path`,{d:`M12 5v14`,key:`s699le`}]]),le=E(`refresh-cw`,[[`path`,{d:`M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,key:`v9h5vc`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}],[`path`,{d:`M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,key:`3uifl3`}],[`path`,{d:`M8 16H3v5`,key:`1cv678`}]]),ue=E(`repeat-1`,[[`path`,{d:`m17 2 4 4-4 4`,key:`nntrym`}],[`path`,{d:`M3 11v-1a4 4 0 0 1 4-4h14`,key:`84bu3i`}],[`path`,{d:`m7 22-4-4 4-4`,key:`1wqhfi`}],[`path`,{d:`M21 13v1a4 4 0 0 1-4 4H3`,key:`1rx37r`}],[`path`,{d:`M11 10h1v4`,key:`70cz1p`}]]),de=E(`repeat-2`,[[`path`,{d:`m2 9 3-3 3 3`,key:`1ltn5i`}],[`path`,{d:`M13 18H7a2 2 0 0 1-2-2V6`,key:`1r6tfw`}],[`path`,{d:`m22 15-3 3-3-3`,key:`4rnwn2`}],[`path`,{d:`M11 6h6a2 2 0 0 1 2 2v10`,key:`2f72bc`}]]),z=E(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),B=E(`settings-2`,[[`path`,{d:`M14 17H5`,key:`gfn3mx`}],[`path`,{d:`M19 7h-9`,key:`6i9tg`}],[`circle`,{cx:`17`,cy:`17`,r:`3`,key:`18b49y`}],[`circle`,{cx:`7`,cy:`7`,r:`3`,key:`dfmy0x`}]]),fe=E(`shuffle`,[[`path`,{d:`m18 14 4 4-4 4`,key:`10pe0f`}],[`path`,{d:`m18 2 4 4-4 4`,key:`pucp1d`}],[`path`,{d:`M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22`,key:`1ailkh`}],[`path`,{d:`M2 6h1.972a4 4 0 0 1 3.6 2.2`,key:`km57vx`}],[`path`,{d:`M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45`,key:`os18l9`}]]),pe=E(`skip-back`,[[`path`,{d:`M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z`,key:`15892j`}],[`path`,{d:`M3 20V4`,key:`1ptbpl`}]]),me=E(`skip-forward`,[[`path`,{d:`M21 4v16`,key:`7j8fe9`}],[`path`,{d:`M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z`,key:`zs4d6`}]]),he=E(`sliders-horizontal`,[[`path`,{d:`M10 5H3`,key:`1qgfaw`}],[`path`,{d:`M12 19H3`,key:`yhmn1j`}],[`path`,{d:`M14 3v4`,key:`1sua03`}],[`path`,{d:`M16 17v4`,key:`1q0r14`}],[`path`,{d:`M21 12h-9`,key:`1o4lsq`}],[`path`,{d:`M21 19h-5`,key:`1rlt1p`}],[`path`,{d:`M21 5h-7`,key:`1oszz2`}],[`path`,{d:`M8 10v4`,key:`tgpxqk`}],[`path`,{d:`M8 12H3`,key:`a7s4jb`}]]),ge=E(`sun-moon`,[[`path`,{d:`M12 2v2`,key:`tus03m`}],[`path`,{d:`M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715`,key:`xlf6rm`}],[`path`,{d:`M16 12a4 4 0 0 0-4-4`,key:`6vsxu`}],[`path`,{d:`m19 5-1.256 1.256`,key:`1yg6a6`}],[`path`,{d:`M20 12h2`,key:`1q8mjw`}]]),_e=E(`text-align-center`,[[`path`,{d:`M21 5H3`,key:`1fi0y6`}],[`path`,{d:`M17 12H7`,key:`16if0g`}],[`path`,{d:`M19 19H5`,key:`vjpgq2`}]]),ve=E(`timer`,[[`line`,{x1:`10`,x2:`14`,y1:`2`,y2:`2`,key:`14vaq8`}],[`line`,{x1:`12`,x2:`15`,y1:`14`,y2:`11`,key:`17fdiu`}],[`circle`,{cx:`12`,cy:`14`,r:`8`,key:`1e1u0o`}]]),ye=E(`trash-2`,[[`path`,{d:`M10 11v6`,key:`nco0om`}],[`path`,{d:`M14 11v6`,key:`outv1u`}],[`path`,{d:`M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6`,key:`miytrc`}],[`path`,{d:`M3 6h18`,key:`d0wm0j`}],[`path`,{d:`M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2`,key:`e791ji`}]]),be=E(`type`,[[`path`,{d:`M12 4v16`,key:`1654pz`}],[`path`,{d:`M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2`,key:`e0r10z`}],[`path`,{d:`M9 20h6`,key:`s66wpe`}]]),xe=E(`user-round`,[[`circle`,{cx:`12`,cy:`8`,r:`5`,key:`1hypcn`}],[`path`,{d:`M20 21a8 8 0 0 0-16 0`,key:`rfgkzh`}]]),Se=E(`volume-2`,[[`path`,{d:`M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z`,key:`uqj9uw`}],[`path`,{d:`M16 9a5 5 0 0 1 0 6`,key:`1q6k2b`}],[`path`,{d:`M19.364 18.364a9 9 0 0 0 0-12.728`,key:`ijwkga`}]]),Ce=E(`x`,[[`path`,{d:`M18 6 6 18`,key:`1bl5f8`}],[`path`,{d:`m6 6 12 12`,key:`d8bk6v`}]]),V=_();function we(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=we(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function Te(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=we(e))&&(r&&(r+=` `),r+=t);return r}var Ee=e=>typeof e==`boolean`?`${e}`:e===0?`0`:e,De=Te,Oe=(e,t)=>n=>{var r;if((t==null?void 0:t.variants)==null)return De(e,n==null?void 0:n.class,n==null?void 0:n.className);let{variants:i,defaultVariants:a}=t,o=Object.keys(i).map(e=>{let t=n==null?void 0:n[e],r=a==null?void 0:a[e];if(t===null)return null;let o=Ee(t)||Ee(r);return i[e][o]}),s=n&&Object.entries(n).reduce((e,t)=>{let[n,r]=t;return r===void 0||(e[n]=r),e},{});return De(e,o,t==null||(r=t.compoundVariants)==null?void 0:r.reduce((e,t)=>{let{class:n,className:r,...i}=t;return Object.entries(i).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...a,...s}[t]):{...a,...s}[t]===n})?[...e,n,r]:e},[]),n==null?void 0:n.class,n==null?void 0:n.className)},ke=48,Ae=(e,t=0)=>{let n=new Int32Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r)-ke-t;return n},je=e=>{let t=new Int32Array(e.length+1);for(let n=0;n<e.length;n++)t[n+1]=t[n]+e[n];return t},Me=e=>{let t=new Int32Array(e.length),n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r)-ke;n+=i>>>1^-(i&1),t[r]=n}return t},Ne=384,Pe=[],Fe=je(Ae(`E0500002005282000000002000150000020021820000011200000003022202000300004200120000200420001200021200301200010400162000010000220021010:2192001200220012000220012000200200200400010200040000000000400200108200110100000022010313000162002000020020012020080213000228200000000082000000000120002000120020020040101020300130001001010`)),Ie=je(Ae(`:11111111211111119311546544411119731869:671397415686432441111111111161114151214313433415:78311132233313187211117221449443411141111151152226611131111112212518142224214215421421542142424242516171151615616347111111111197911327451111111111111111111113134714133513411111311111111111111111111112444411111342312715245411117:3`)),Le=`@containerabcdefghinlmoprstunderlineviawzccentlignnimatespectuto-colsrowsaglorightnessckdrop-sisbcontrastfiltergrayscalehue-rotateinvertopacityslurrightnessaturateepia-coniclinearpositionradialsizeockurrderttom-belrstxyespacing-xyaretoursorlnt-umnsendspantartainentrasteividerop-shadowurationcorationlay-xyasendillexontromlter-featuresstretchapr-xyayscaleidow-colsrowsue-rotatedentlinesetvert-beringsxyeshadoweiadingftnest-clamp-imageabein-lrstxyskx--b-coniclpositionrsizet-x-y-fromto-fromto-inearfromto-fromto-adialfromto-fromtofromtofromtofromtoblockhinlinew-screenesblockhinlinewbjectpacityrutlinederigin-offsetbelrstxyesrspective-originaceholderioghtng-offsettateundedw-xyz-belrstlreseslr-endspantartaturatecepiahizekewpace-taleroll-xyz-barmpbelrstxyesbelrstxyes-thumbrackadowrink-xyxyartrokeabextora-shadowpckingnsformitionlate-xyz-offsetill-changeoom`,Re=(()=>{let e=Fe.length-1,t=new Int32Array(e);for(let n=e-1;n>=0;n--){let e=1,r=n+1;for(let i=Fe[n];i<Fe[n+1];i++)e+=t[r],r+=t[r];t[n]=e}let n=new Int32Array(Fe[e]),r=0;for(let i=0;i<e;i++){let e=i+1;for(let a=Fe[i];a<Fe[i+1];a++)n[r++]=e,e+=t[e]}return n})(),ze=Ae(`02000000000000900<=0?000B000F00F00ŏI0J0LNPRTVX0000]_a00000000000000000000000rst0000000zŏ00000000000ŏ0000000ŏ00000000000000000000000000000000000000000000000000000000000000Ë000000000000000000000Þ000000000000000000ð0000000ø0ùúûüýþÿĀāĂăĄąĆ000000000000000000000000000000000000000000ħ0ĨĪ00000000000000000000ļĽ00000Ŭ000000`,1),Be=je(Ae(`123333359346463635126536711576`)),Ve=Ae(`93203242332583253248325D>E?F@03263243255B:032523853:0325B:8GA032542H<C=12727B:0328432553;D>E?3257D>032585:0325B:;0328B:032`),He=Ae(`012113445661666666789111:5;;;;;;;;444;;;:62999<1161=62>>?61:21@ABCD4446996:64E:::;:?::64:F114GHHIHHHHIHH1HH1HH1HHHHHH::EEJ4444::EE4444441691;644444114244444:;K6666555555555555555999666664444444444444444444444226?6:66644L9M?D:111::::6DE199`),Ue=Me(`020200202020020020020020020020200200200200200200200002020202001003040106000200200200200200200200200200200200200200200200200200200200200200200200200200200200020020020020020020002020200202002002002002002002002002002020002002020020200220200200200200200200200200200200020020020000200020002000200200200020020020002000200200200020020202002020202000200200020022000200200020020002002000200220002002000200W0Z00020020002002020002002000200g0j0002002000200200020020002002000200200020020002000200002000002002002002002000200020000200002002002002002002002020020020200200200200200200200200202020020020020020020020020002002002020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020020002002002002002002000200200200200200200200200200020202020002000200020002002002002000020200200`),We=(()=>{let e=new Int32Array(319).fill(-1),t=Me(`02422242:222222242224222242442222222422222244442242226224222426222422442462222422622222222626222462242622422622422424242422222222422222222242422222222222222222622442224222222222222224424442262222222222222222222226224222424242422224422422422222`),n=Me(`02222222222222222222202222222222222222222222221422222222222222222222222222222222222Y\\222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222221422222222222222222222222222222222222222Ŀł222222222222222222`);for(let r=0;r<t.length;r++)e[t[r]]=n[r];return e})(),Ge=`container |break-after- all auto avoid avoid-page column left page right|break-before- all auto avoid avoid-page column left page right|break-inside-a uto void void-column void-page|box-decoration- clone slice|box- border content| contents flow-root hidden table table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group| not-sr-only sr-only|float- end left none right start|clear- both end left none right start|isolat e ion-auto|overflow- auto clip hidden scroll visible|overflow-x- auto clip hidden scroll visible|overflow-y- auto clip hidden scroll visible|overscroll- auto contain none|overscroll-x- auto contain none|overscroll-y- auto contain none| absolute fixed relative static sticky| collapse invisible visible|justify- around baseline between center center-safe end end-safe evenly normal start stretch|justify-items- center center-safe end end-safe normal start stretch|justify-self- auto center center-safe end end-safe start stretch|items- baseline baseline-last center center-safe end end-safe start stretch|self- auto baseline baseline-last center center-safe end end-safe start stretch|place-content- around baseline between center center-safe end end-safe evenly start stretch|place-items- baseline center center-safe end end-safe start stretch|place-self- auto center center-safe end end-safe start stretch| antialiased subpixel-antialiased| italic not-italic|normal-nums |ordinal |slashed-zero | lining-nums oldstyle-nums| proportional-nums tabular-nums| diagonal-fractions stacked-fractions| no-underline overline| capitalize lowercase normal-case uppercase|truncate |whitespace- break-spaces normal nowrap pre pre-line pre-wrap|break- all keep normal words|wrap- anywhere break-word normal|hyphens- auto manual none|mix-blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay plus-darker plus-lighter saturation screen soft-light|table- auto fixed|caption- bottom top|backface- hidden visible|appearance- auto none|scheme- dark light light-dark normal only-dark only-light|field-sizing- content fixed|pointer-events- auto none|resize  -none -x -y|snap- align-none center end start|snap- always normal|snap- both none x y|snap- mandatory proximity|touch- auto manipulation none|touch-pan- left right x|touch-pan- down up y|touch-pinch-zoom |select- all auto none text|forced-color-adjust- auto none| normal size| baseline bottom middle sub super text-bottom text-top top| bounce none ping pulse spin| auto square video| auto fr max min px|none | auto full px| fixed local scroll|clip- border content padding text|origin- border content padding| bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| no-repeat repeat repeat-round repeat-space repeat-x repeat-y| auto contain cover|blend- color color-burn color-dodge darken difference exclusion hard-light hue lighten luminosity multiply normal overlay saturation screen soft-light|to- b bl br l r t tl tr| auto dvh fit full lh lvh max min px screen svh| dashed dotted double hidden none solid| collapse separate|px |auto |full | content none strict| inline-size size|layout |paint |style | around baseline between center center-safe end end-safe evenly normal start stretch| alias all-scroll auto cell col-resize context-menu copy crosshair default e-resize ew-resize grab grabbing help move n-resize ne-resize nesw-resize no-drop none not-allowed ns-resize nw-resize nwse-resize pointer progress row-resize s-resize se-resize sw-resize text vertical-text w-resize wait zoom-in zoom-out| dashed dotted double solid wavy| auto from-font|reverse |initial | in in-out initial linear out| col col-reverse row row-reverse| nowrap wrap wrap-reverse| auto initial none| black bold extrabold extralight light medium normal semibold thin| condensed expanded extra-condensed extra-expanded normal semi-condensed semi-expanded ultra-condensed ultra-expanded|flow- col col-dense dense row row-dense| none subgrid| auto dvh dvw fit full lh lvh lvw max min px screen svh svw| block flex grid table| auto dvw fit full lvw max min px screen svw| loose none normal px relaxed snug tight|through |item | inside outside| decimal disc none| auto px| clip-border clip-content clip-fill clip-padding clip-stroke clip-view no-clip| add exclude intersect subtract| alpha luminance match|origin- border content fill padding stroke view|type- alpha luminance| circle ellipse| closest-corner closest-side farthest-corner farthest-side|at- bottom bottom-left bottom-right center left left-bottom left-top right right-bottom right-top top top-left top-right| dvh fit full lh lvh max min none px screen svh| auto dvh dvw fit full lh lvh lvw max min none px screen svh svw| dvw fit full lvw max min none px screen svw| auto dvh dvw fit full lvh lvw max min none prose px svh svw| auto dvh dvw fit full lvh lvw max min none px screen svh svw| contain cover fill none scale-down| first last none| distant dramatic midrange near none normal|inset | full none|3d | auto smooth|gutter- auto both stable| auto none thin| inner none| auto dvh dvw fit full lvh lvw max min px svh svw|base | center end justify left right start| clip ellipsis| balance nowrap pretty wrap| normal tight tighter wide wider widest| cpu gpu none| 3d flat| all colors none opacity shadow transform| discrete normal| full px| auto dvh dvw fit full lvh lvw max min px screen svh svw| auto contents scroll transform`.split(`|`).map(e=>{let t=e.split(` `),n=t.shift();for(let e=0;e<t.length;e++)t[e]=n+t[e];return t}),Ke=Me(`0000000000000000000000000000000000000000000000000000000000000262242:6@200000006:240B428:4422400002046044222426220026642642462026224222824220022400000000\\00N222422242222222224062242222222422226264222422222222222222442804222422222222222222222222220<4<0204260002444020204224422`),qe=Me(`ɠ222222222222222222222222222222222222222222222222222222222222˕4222226>6ʰ22ʷʺʷʺʷ42ʴ2ʓ22>621422ɶ222ɹɼɷɺɷɺ22ɱ42222ɨ2ɧ26622ɘɓ244ƸƵ222]d24242ǖǓƚÄȫ2263ȨȥȨ2222222ǣ222222222222222222ǂƽ2ƾƵ2222222422222ƜƑ22222222222222222222144Ŧţ22Ţş222222222222222222222ĸ2ı68ĦģĦɡŰ4Ġ«®ĝ822ĔđĔ2ē2222622`),Je=Me(`02222222222222222222222222222222222222222222222222222222222222222202021422222222CF2200GJ021042222WZ222IL0ad2c10h2222U00X202[^2w0000120zy|}22:22z22222222222G000qOVI00000{2<40000@00000G¦§000ª00000000000000021K¬«00®000000000000000000000222HGH_1¸222½2¾2222ÇÊ000­°2±`),Ye=new Int32Array(987),Xe=new Int32Array(987),Ze=new Int32Array(987),Qe=``,$e=new Int32Array(1022);{let e=new Map,t=0,n=0;for(let r=0;r<Ke.length;r++)for(let i of Ge[Je[r]]){let a=e.get(i);a===void 0&&(a=t++,e.set(i,a),$e[a*2]=Qe.length,$e[a*2+1]=i.length,Qe+=i),Ye[n]=Ke[r],Xe[n]=qe[r],Ze[n]=a,n++}}var et=Me(`0b2N:222@R>F@286¦2@H2D266226FB22B2>BD\\6N22222Z222D222p`),tt=je(Ae(`1::24444432:442:44:44>222222:44:4421322511111311111114`)),nt=Me(`24A;33N=C@H4A;33N=C@<27;83:;8393NQ:3NQʰ222ˉºŴŽ2R2=18cƴÅŇ=cĞÛC1ƈǝȈ:ħ25=11D3A@4=<1;1DEr25;11B3?<6;:371BCn9@7=<8192>2E121@9@EHE@9>2T25511<398454131<=V25511<398454131<=ƧNž2Đå242L222290000f22500ɛ000ǘ222`),rt=Ae(`ĳ`),it=Ae(``),at=Ae(`1`),ot={GROUP_COUNT:Ne,customValidatorNames:Pe,edgeStart:Fe,labelStart:Ie,labelText:Le,edgeTarget:Re,nodeGroup:ze,nodeVlist:We,vlistPat:Be,vlistOps:Ve,vlistRef:He,vlistGroup:Ue,litAnchor:Ye,litGroup:Xe,litPool:Ze,poolOffsets:$e,poolText:Qe,adjGid:et,adjStart:tt,adjTgt:nt,patGid:rt,patTgt:it,postfixLookupGroups:at,orderSensitiveModifiers:`* ** after backdrop before details-content file first-letter first-line marker placeholder selection`},st=`line`in Error(),ct=-1,lt=-1,ut=(e,t,n)=>{let r=2166136261;for(let i=t;i<n;i++)r=Math.imul(r^e.charCodeAt(i),16777619);return r},dt=(e,t,n)=>{let r=n-t,i=Math.imul(r,2654435761)^e.charCodeAt(t);if(r>3){let a=r>>2,o=r>>1;i=Math.imul(i^e.charCodeAt(t+1)<<8^e.charCodeAt(t+2)<<16^e.charCodeAt(t+a),2246822507),i=Math.imul(i^e.charCodeAt(t+o)<<8^e.charCodeAt(t+o+a)<<16^e.charCodeAt(n-3),3266489909),i^=e.charCodeAt(n-2)<<8^e.charCodeAt(n-1)<<16;for(let r=t+3,a=n-4;r<t+8&&r<a;r++,a--)i=Math.imul(i^e.charCodeAt(r)^e.charCodeAt(a)<<8,16777619)}return i^i>>>15},ft=(e,t,n={})=>{var r,i,a;let{GROUP_COUNT:o,edgeStart:s,labelStart:c,labelText:l,edgeTarget:u,nodeGroup:d,nodeVlist:f,vlistPat:p,vlistOps:m,vlistRef:h,vlistGroup:g,litAnchor:_,litGroup:v,litPool:y,poolOffsets:b,poolText:x,adjGid:S,adjStart:C,adjTgt:w,patGid:T,patTgt:E,postfixLookupGroups:D,customValidatorNames:ee,orderSensitiveModifiers:O}=e,k=new Int32Array(o).fill(-1);for(let e=0;e<S.length;e++)k[S[e]]=e;let te=0;for(let e=0;e+1<C.length;e++){let t=C[e+1]-C[e];t>te&&(te=t)}let A=32;for(;A<2*(1+te+T.length);)A<<=1;let j=new Int32Array(h.length+1);for(let e=0;e<h.length;e++)j[e+1]=j[e]+p[h[e]+1]-p[h[e]];let M=new Uint8Array(o);for(let e=0;e<D.length;e++)M[D[e]]=1;let N=s.length-1,P=new Uint8Array(N),F=0,I=!0;for(let e=0;e<_.length;e++){P[_[e]]=1;let t=b[y[e]*2+1];t>F&&(F=t);let n=x.charCodeAt(b[y[e]*2]);(n===91||n===40)&&(I=!1)}let ne=1;for(;ne<_.length*2;)ne<<=1;let re=new Int32Array(ne).fill(-1);for(let e=0;e<_.length;e++){let t=b[y[e]*2],n=(ut(x,t,t+b[y[e]*2+1])^Math.imul(_[e],2654435761)|0)&ne-1;for(;re[n]!==-1;)n=n+1&ne-1;re[n]=e}let L=(e,t,n,r)=>{let i=(ut(t,n,r)^Math.imul(e,2654435761)|0)&ne-1,a=r-n;for(;;){let r=re[i];if(r===-1)return-1;if(_[r]===e&&b[y[r]*2+1]===a){let e=b[y[r]*2],i=!0;for(let r=0;r<a;r++)if(x.charCodeAt(e+r)!==t.charCodeAt(n+r)){i=!1;break}if(i)return v[r]}i=i+1&ne-1}},R=(r=n.cacheSize)==null?8192:r,ie=(i=(a=n.prefix)==null?e.prefix:a)==null?``:i,ae=ie===``?``:ie+`:`,oe=ae.length,se=(ee==null?[]:ee).map(e=>{let n=t&&t[e];if(!n)throw Error(`cn: missing validator `+e);return n}),ce=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,le=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,ue=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,de=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,z=0,B=-1,fe=-1,pe=-1,me=-1,he=e=>e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57||e===95,ge=e=>/\s/.test(String.fromCharCode(e)),_e=(e,t,n)=>{if(z=0,B=-1,n-t<3)return;let r=e.charCodeAt(t),i=e.charCodeAt(n-1);if(r===91&&i===93)z=1;else if(r===40&&i===41)z=2;else return;pe=t+1,me=n-1;let a=t+1;if(he(e.charCodeAt(a))){for(a++;a<n-1;){let t=e.charCodeAt(a);if(!he(t)&&t!==45)break;a++}a<n-2&&e.charCodeAt(a)===58&&(B=t+1,fe=a,pe=a+1)}},ve=(e,t,n,r)=>{if(n-t!==r.length)return!1;for(let n=0;n<r.length;n++)if(e.charCodeAt(t+n)!==r.charCodeAt(n))return!1;return!0},ye=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,be=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,xe=e=>!!e&&!Number.isNaN(Number(e)),Se=(e,t,n)=>{if(n-t<11||!ve(e,t,t+10,`@container`))return!1;if(e.charCodeAt(t+10)===47)return n-t>=12;let r=e.charCodeAt(t+11);return r===115&&n-t>=17&&ve(e,t+10,t+16,`-size/`)||r===110&&n-t>=19&&ve(e,t+10,t+18,`-normal/`)},Ce=[1,1,1,1,1,1,1,1,2,2,2,2,2,2,2],V=`length|number|number weight|family-name|position percentage|length size bg-size|image url|shadow|length|family-name|position percentage|length size bg-size|image url|shadow|number weight`.split(`|`).map(e=>e.split(` `)),we=[2,3,1,0,0,0,4,5,0,0,0,0,0,1,1],Te=(e,t,n,r)=>{if(e>=10){if(e>=25)return se[e-25](t.slice(n,r));let i=e-10;if(z!==Ce[i])return!1;if(B>=0){for(let e of V[i])if(ve(t,B,fe,e))return!0;return!1}switch(we[i]){case 0:return!1;case 1:return!0;case 2:{let e=t.slice(pe,me);return ce.test(e)&&!le.test(e)}case 3:return xe(t.slice(pe,me));case 4:return de.test(t.slice(pe,me));default:return ue.test(t.slice(pe,me))}}switch(e){case 0:return!0;case 1:return z===0;case 2:return z===1;case 3:return z===2;case 4:return ye.test(t.slice(n,r));case 5:return xe(t.slice(n,r));case 6:{let e=t.slice(n,r);return!!e&&Number.isInteger(Number(e))}case 7:return r>n&&t.charCodeAt(r-1)===37&&xe(t.slice(n,r-1));case 8:return be.test(t.slice(n,r));default:return Se(t,n,r)}},Ee=new Set(typeof O==`string`?O.split(` `):O),De=(e,t,n,r,i,a)=>{let o=ut(t,n,r)^(i?2654435769:0),s=e.get(o);if(s!==void 0)outer:for(let e=0;e<s.length;e++){let a=s[e];if(a.imp===i&&a.k.length===r-n){for(let e=0;e<a.k.length;e++)if(a.k.charCodeAt(e)!==t.charCodeAt(n+e))continue outer;return a.id}}else e.set(o,s=[]);let c=t.slice(n,r),l=a(c);return s.push({k:c,imp:i,id:l}),l},Oe=new Map,ke=new Map,Ae=2,je=4096,Me=(e,t)=>{let n=[],r=0,i=0,a=0;for(let t=0;t<e.length;t++){let o=e.charCodeAt(t);r===0&&i===0&&o===58?(n.push(e.slice(a,t)),a=t+1):o===91?r++:o===93?r--:o===40?i++:o===41&&i--}n.push(e.slice(a));let o=n[0];if(n.length>1){let e=[],t=[];for(let r of n)r.charCodeAt(0)===91||Ee.has(r)?(t.length&&(e.push(...t.sort()),t=[]),e.push(r)):t.push(r);t.length&&e.push(...t.sort()),o=e.join(`:`)}let s=t?o+` !`:o,c=ke.get(s);return c===void 0&&ke.set(s,c=Ae++),c},Ne=new Map,Pe=o,Fe=o+4096,Ie=()=>Pe++,Le=2097152,Re=8192,ze=new Int32Array(Re),Be=Array(Re).fill(null),Ve=new Int32Array(Re),He=new Int32Array(Re),Ue=new Uint8Array(Re),We=0,Ge=(e,t,n,r,i,a,o,s)=>{let c=e;if(Be[e]!==null){if(Be[e|1]===null)c=e|1;else if(!(We++&3))c=e|We>>2&1;else return}Be[c]=t.slice(n,r),ze[c]=i,Ve[c]=a,He[c]=o,Ue[c]=s},Ke=()=>Be.fill(null),qe=256,Je=[new Int32Array(qe),new Int32Array(qe),new Int32Array(qe),new Int32Array(qe)],[Ye,Xe,Ze,Qe]=Je,$e=new Uint8Array(qe),et=new Uint8Array(qe),tt=()=>{qe*=2,Je=Je.map(e=>{let t=new Int32Array(qe);return t.set(e),t}),[Ye,Xe,Ze,Qe]=Je;let e=new Uint8Array(qe);e.set($e),$e=e,et=new Uint8Array(qe)},nt=64,rt=new Int32Array(nt),it=new Int32Array(nt),at=new Int32Array(o),ot=2048,ft=21,pt=new Float64Array(ot),mt=new Int32Array(ot),gt=0,_t=(e,t)=>{if(e===0&&t<o)return at[t]===gt?1:(at[t]=gt,0);let n=e*2097152+t+1,r=Math.imul(n,2654435761)>>>ft;for(;mt[r]===gt;){if(pt[r]===n)return 1;r=r+1&ot-1}return pt[r]=n,mt[r]=gt,0},vt=(e,t,n,r,i)=>{if(n-t>=2&&e.charCodeAt(t)===91&&e.charCodeAt(n-1)===93){let r=-1;for(let i=t+1;i<n-1;i++)if(e.charCodeAt(i)===58){r=i;break}return r===-1||r===t+1?ct:De(Ne,e,t+1,r,0,Ie)}if(r>=0&&d[r]>=0)return d[r];for(let t=i-1;t>=0;t--){let r=it[t];if(r>n)continue;let i=rt[t],a=n-r;if(P[i]===1&&a>0&&a<=F){let t=e.charCodeAt(r);if(I===!1||t!==91&&t!==40){let t=L(i,e,r,n);if(t>=0)return t}}let o=f[i];if(o<0)continue;let s=h[o],c=p[s],l=p[s+1];if(c===l)continue;_e(e,r,n);let u=j[o]-c;for(let t=c;t<l;t++)if(Te(m[t],e,r,n))return g[u+t]}return ct},yt=e=>{let t=e.length,n=0,r=0,i=!1;(Ae>je||Oe.size>je)&&(Oe=new Map,ke=new Map,Ae=2,Ke()),Pe>Fe&&(Ne=new Map,Pe=o,Ke());let a=0;for(;a<t;){let d=e.charCodeAt(a);if(d===32||d>=9&&d<=13||d>=160&&ge(d)){d!==32&&(i=!0),a++;continue}let p=a,m=0;for(;a<t;){if(d=e.charCodeAt(a),d<=32){if(d===32)break;if(d>=9&&d<=13){i=!0;break}}else if(d>=160&&ge(d)){i=!0;break}m=Math.imul(m^d,16777619),a++}let h=a,g=h-p;n===qe&&tt();let _=n++;Ye[_]=p,Xe[_]=h,r+=g,m^=Math.imul(g,2654435761);let v=m^m>>>15,y=v&8190;{let t=-1;if(ze[y]===v&&Be[y]!==null&&Be[y].length===g?t=y:ze[y|1]===v&&Be[y|1]!==null&&Be[y|1].length===g&&(t=y|1),t>=0){let n=Be[t],r=!0;for(let t=0;t<g;t++)if(n.charCodeAt(t)!==e.charCodeAt(p+t)){r=!1;break}if(r){Ze[_]=Ve[t],Qe[_]=He[t],$e[_]=Ue[t];continue}}}let b=p;if(oe!==0){if(h-p<=oe||!e.startsWith(ae,p)){Ze[_]=ct,Ge(y,e,p,h,v,ct,0,0);continue}b=p+oe}let x=0,S=0,C=-1,w=-1;for(let t=b;t<h;t++){let n=e.charCodeAt(t);if(x===0&&S===0){if(n===58){C=t;continue}if(n===47){w=t;continue}}n===91?x++:n===93?x--:n===40?S++:n===41&&S--}let T=C>=b?C+1:b,E=T,D=h,ee=!1,O=0;D>E&&e.charCodeAt(D-1)===33?(ee=!0,D--):D>E&&e.charCodeAt(E)===33&&(ee=!0,E++,O=1);let k=-1;w>T&&(k=w+O,k>=D&&(k=-1));let te=E;D-E>1&&e.charCodeAt(E)===45&&(te=E+1);let A=0,j=0,N=0,F=-1,I=0;(f[0]>=0||P[0]===1)&&(rt[0]=0,it[0]=te,I=1);let ne=lt,re=0;for(let t=te;t<D;t++)if(t===k&&(ne=j<N?lt:A,re=I),A!==lt){let n=e.charCodeAt(t),r=-1;if(j<N)l.charCodeAt(j)===n?(j++,j===N&&(r=A=F)):A=lt;else{let e=s[A],t=s[A+1],i=lt;for(let a=e;a<t;a++){let e=c[a];if(l.charCodeAt(e)===n){c[a+1]-e===1?r=i=u[a]:(j=e+1,N=c[a+1],F=u[a],i=A);break}}A=i}if(r>=0&&(f[r]>=0||P[r]===1)&&t+1<D&&e.charCodeAt(t+1)===45){if(I===nt){nt*=2;let e=new Int32Array(nt);e.set(rt),rt=e;let t=new Int32Array(nt);t.set(it),it=t}rt[I]=r,it[I]=t+2,I++}}k===D&&(ne=j<N?lt:A,re=I);let L=j<N?lt:A,R,ie=!1;if(k>=0){if(ie=!0,R=vt(e,E,k,ne,re),R!==ct&&R<o&&M[R]){let t=vt(e,E,D,L,I);t!==ct&&t!==R&&(R=t,ie=!1)}else R===ct&&(R=vt(e,E,D,L,I),ie=!1)}else R=vt(e,E,D,L,I);let se=0,ce=0;R===ct?Ze[_]=ct:(ce=+!!ie,se=b>=C?+!!ee:De(Oe,e,b,C,+!!ee,e=>Me(e,ee)),Ze[_]=R,$e[_]=ce,Qe[_]=se),Ge(y,e,p,h,v,R,se,ce)}if(n===0)return``;if(n===1)return Ye[0]===0&&Xe[0]===t?e:e.slice(Ye[0],Xe[0]);if(n*A>ot){for(;n*A>ot;)ot<<=1,ft--;pt=new Float64Array(ot),mt=new Int32Array(ot)}if(Ae>=Le||Pe>=Le)throw Error(`cn: too many distinct classes in one merge`);gt=gt+1|0,gt===0&&(at.fill(0),mt.fill(0),gt=1);let d=!1;for(let e=n-1;e>=0;e--){let t=Ze[e];if(t===ct){et[e]=1;continue}let n=Qe[e];if(_t(n,t)===1)et[e]=0,d=!0;else if(et[e]=1,t<o){let r=k[t];if(r>=0)for(let e=C[r];e<C[r+1];e++)_t(n,w[e]);if($e[e]&1)for(let e=0;e<T.length;e++)T[e]===t&&_t(n,E[e])}}if(!d&&!i&&t===r+n-1)return e;let p=``,m=0;for(;m<n;){if(!et[m]){m++;continue}let t=Ye[m],r=Xe[m],i=m+1;for(;i<n&&et[i]&&Ye[i]===r+1&&e.charCodeAt(r)===32;)r=Xe[i],i++;p.length>0&&(p+=` `),p+=e.slice(t,r),m=i}return p},bt=16384,xt=new Int32Array(bt*2),H=0,St=1,Ct=Object.create(null),wt=Object.create(null),Tt=new Map,Et=new Map,Dt=0,Ot=0,kt=()=>{H^=bt,St=St+1|0,Ot=0},At=e=>{let t=Ct[e];if(t!==void 0)return t;let n=dt(e,0,e.length),r=(n&16383)+H,i=xt[r]===(n^St)||xt[r^bt]===(n^St-1);return i&&(t=wt[e],t!==void 0)?(Ct[e]=t,t):(t=yt(e),i?(Ct[e]=t,++Dt>R&&(Dt=0,wt=Ct,Ct=Object.create(null),kt())):(xt[r]=n^St,++Ot>bt&&kt()),t)},jt=e=>{let t=Tt.get(e);if(t!==void 0)return t;let n=dt(e,0,e.length),r=(n&16383)+H,i=xt[r]===(n^St)||xt[r^bt]===(n^St-1);return i&&(t=Et.get(e),t!==void 0)?(Tt.set(e,t),t):(t=yt(e),i?(Tt.set(e,t),++Dt>R&&(Dt=0,Et=Tt,Tt=new Map,kt())):(xt[r]=n^St,++Ot>bt&&kt()),t)},Mt=e=>{let t=dt(e,0,e.length),n=(t&16383)+H;return xt[n]===(t^St)||xt[n^bt]===(t^St-1)||(xt[n]=t^St,++Ot>bt&&kt(),!1)},Nt=R===0?yt:st?e=>{let t=Tt.get(e);return t===void 0?jt(e):t}:At;return{merge:function(){return arguments.length===1&&typeof arguments[0]==`string`?Nt(arguments[0]):Nt(ht.apply(null,arguments))},mergeString:Nt,seenBefore:R===0?()=>!1:Mt,mergeUncached:yt}},pt=(e,t)=>{if(!e)return``;if(typeof e==`string`)return e;let n=``;if(typeof e.length==`number`&&(!t||Array.isArray(e))){let r=e;for(let e=0;e<r.length;e++){let i=r[e];if(!i)continue;let a=typeof i==`string`?i:pt(i,t);a&&(n&&(n+=` `),n+=a)}return n}if(t){if(typeof e==`number`)return``+e;if(typeof e==`object`)for(let t in e)e[t]&&(n&&(n+=` `),n+=t)}return n},mt=(e,t)=>{let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(!i)continue;let a=typeof i==`string`?i:pt(i,t);a&&(n&&(n+=` `),n+=a)}return n},ht=function(){return mt(arguments,!1)},gt=256,_t=16,vt=1024,yt=4096,bt=(e,t)=>{let n=t===void 0?()=>!0:t.seenBefore,r=t===void 0?e:t.mergeUncached,i=new Map,a=new Map,o=0,s=null,c=null,l=[],u=[],d=0,f=(t,n,r)=>{c===null&&(c=Array(yt).fill(``),l=Array(yt).fill(``),u=Array(yt).fill(``));let i=dt(t,0,t.length)&4094;if(c[i]===t&&l[i]===n)return u[i];if(c[i|1]===t&&l[i|1]===n)return u[i|1];let a=e(r?n+` `+t:t),o=c[i]===``?i:i|(c[i|1]===``?1:d++&1);return c[o]=t,l[o]=n,u[o]=a,a},p=(e,t,n,r)=>{let i=0;if(t){if(t!==e.a0)return!1;i=1}if(n){if(n!==(i===0?e.a0:e.a1))return!1;i++}if(r){if(r!==(i===0?e.a0:i===1?e.a1:e.a2))return!1;i++}return i===e.t},m=(e,t)=>{let n=e.a,r=0;for(let e=0;e<t.length;e++){let i=t[e];if(i){if(i!==n[r])return!1;r++}}return r===e.t},h=(t,c)=>{let l=t.length,u=s===null?null:s.n;if(!c){if(u!==null&&m(u,t))return s=u,u.r;if(s!==null&&s!==u&&m(s,t))return s.r}let d=``,p=-1,h=0,g=!1;for(let e=0;e<l;e++){let n=t[e];if(n){if(typeof n!=`string`){if(n=t[e]=pt(n,!0),!n)continue;g=!0}p<0&&(d=n,p=e),h++}}if(h===0)return``;if(h===1)return e(d);if(g){if(u!==null&&m(u,t))return s=u,u.r;if(s!==null&&s!==u&&m(s,t))return s.r}let _=i.get(d);_===void 0&&(_=a.get(d),_!==void 0&&i.set(d,_));let v=null;if(_!==void 0){if(_.skip>0){_.skip--,s=null;let e=d;for(let n=p+1;n<l;n++){let r=t[n];r&&(e+=` `+r)}return f(e,``,!1)}let e=_.e;outer:for(let n=0;n<e.length;n++){let r=e[n];if(r.t!==h)continue;let i=r.a,a=1;for(let e=p+1;e<l;e++){let n=t[e];if(n&&n!==i[a++])continue outer}v=r;break}v!==null&&(_.miss=0)}if(v===null){var y;let s=d,c=[d];for(let e=p+1;e<l;e++){let n=t[e];n&&(s+=` `+n,c.push(n))}if(!n(s))return r(s);v={r:e(s),t:c.length,a0:c[0],a1:c[1],a2:(y=c[2])==null?``:y,a:c,n:null},_===void 0?i.set(d,_={e:[],miss:0,skip:0,at:0}):++_.miss>_t&&(_.miss=_t,_.skip=vt,_.e.length=0,_.at=0);let u=_.e;u.length<gt?u.push(v):(u[_.at]=v,_.at=_.at+1&255),++o>1e3&&(o=0,a=i,i=new Map)}return s!==null&&s!==v&&(s.n=v),s=v,v.r},g=t=>Array.isArray(t)?h(t.slice(),!1):e(pt(t,!0));return function(t,n,r){let a=arguments.length;if((a|1)==3){let e=s;if(e!==null){let i=e.n;if(i!==null&&p(i,t,n,r))return s=i,i.r;if(e!==i&&p(e,t,n,r))return e.r}if(a===2&&typeof n==`string`&&n!==``){let e=i.get(t);if(e!==void 0&&e.skip>0)return e.skip--,s=null,f(n,t,!0)}return h([t,n,r],!0)}if(a===1)return typeof t==`string`?e(t):g(t);let o=s;if(o!==null){let e=o.n;if(e!==null){let t=e.a,n=0,r=!0;for(let e=0;e<a;e++){let i=arguments[e];if(i){if(i!==t[n]){r=!1;break}n++}}if(r&&n===e.t)return s=e,e.r}if(o!==e){let e=o.a,t=0,n=!0;for(let r=0;r<a;r++){let i=arguments[r];if(i){if(i!==e[t]){n=!1;break}t++}}if(n&&t===o.t)return o.r}}let c=[];for(let e=0;e<a;e++)c.push(arguments[e]);return h(c,!0)}},xt=ft(ot),H=bt(xt.mergeString,xt);xt.merge;var St=Object.defineProperty,Ct=(e,t)=>St(e,`name`,{value:t,configurable:!0});function wt(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}Ct(wt,`setRef`);function Tt(...e){return t=>{let n=!1,r=e.map(e=>{let r=wt(e,t);return!n&&typeof r==`function`&&(n=!0),r});if(n)return()=>{for(let t=0;t<r.length;t++){let n=r[t];typeof n==`function`?n():wt(e[t],null)}}}}Ct(Tt,`composeRefs`);function Et(...e){return w.useCallback(Tt(...e),e)}Ct(Et,`useComposedRefs`);var Dt=Object.defineProperty,Ot=(e,t)=>Dt(e,`name`,{value:t,configurable:!0});function kt(e){let t=w.forwardRef((t,n)=>{var r;let{children:i,...a}=t,o=null,s=!1,c=[];i=Bt(i),w.Children.forEach(i,e=>{if(It(e)){var t;s=!0;let n=e,r=`child`in n.props?n.props.child:n.props.children;for(;Rt(r)&&typeof Wt==`function`;)r=Wt(r._payload);o=Nt(n,r),c.push(o==null||(t=o.props)==null?void 0:t.children)}else c.push(e)}),o?o=w.cloneElement(o,void 0,c):!s&&w.Children.count(i)===1&&w.isValidElement(i)&&(o=i);let l=o?Ft(o):void 0,u=Et(n,l);if(!o){if(i||i===0)throw Error(s?Ut(e):Ht(e));return i}let d=Pt(a,(r=o.props)==null?{}:r);return o.type!==w.Fragment&&(d.ref=n?u:l),w.cloneElement(o,d)});return t.displayName=`${e}.Slot`,t}Ot(kt,`createSlot`);var At=kt(`Slot`),jt=Symbol.for(`radix.slottable`);function Mt(e){let t=Ot(e=>`child`in e?e.children(e.child):e.children,`Slottable`);return t.displayName=`${e}.Slottable`,t.__radixId=jt,t}Ot(Mt,`createSlottable`);var Nt=Ot((e,t)=>`child`in e.props?w.isValidElement(t)?w.cloneElement(t,void 0,e.props.children(t.props.children)):null:w.isValidElement(t)?t:null,`getSlottableElementFromSlottable`);function Pt(e,t){let n={...t};for(let r in t){let i=e[r],a=t[r];/^on[A-Z]/.test(r)?i&&a?n[r]=(...e)=>{let t=a(...e);return i(...e),t}:i&&(n[r]=i):r===`style`?n[r]={...i,...a}:r===`className`?n[r]=[i,a].filter(Boolean).join(` `):r===`aria-describedby`&&(n[r]=Vt(a,i))}return{...e,...n}}Ot(Pt,`mergeProps`);function Ft(e){var t,n;let r=(t=Object.getOwnPropertyDescriptor(e.props,`ref`))==null?void 0:t.get,i=r&&`isReactWarning`in r&&r.isReactWarning;return i?e.ref:(r=(n=Object.getOwnPropertyDescriptor(e,`ref`))==null?void 0:n.get,i=r&&`isReactWarning`in r&&r.isReactWarning,i?e.props.ref:e.props.ref||e.ref)}Ot(Ft,`getElementRef`);function It(e){return w.isValidElement(e)&&typeof e.type==`function`&&`__radixId`in e.type&&e.type.__radixId===jt}Ot(It,`isSlottable`);var Lt=Symbol.for(`react.lazy`);function Rt(e){return typeof e==`object`&&!!e&&`$$typeof`in e&&e.$$typeof===Lt&&`_payload`in e&&zt(e._payload)}Ot(Rt,`isLazyComponent`);function zt(e){return typeof e==`object`&&!!e&&`then`in e}Ot(zt,`isPromiseLike`);function Bt(e){let t=e;for(;Rt(t)&&typeof Wt==`function`;)t=Wt(t._payload);return t}Ot(Bt,`useUnwrappedLazy`);function Vt(...e){let t=new Set;for(let n of e)if(typeof n==`string`)for(let e of String(n).trim().split(/\s+/))e&&t.add(e);return t.size>0?Array.from(t).join(` `):void 0}Ot(Vt,`concatAriaDescribedby`);var Ht=Ot(e=>`${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`,`createSlotError`),Ut=Ot(e=>`${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`,`createSlottableError`),Wt=w.use,Gt=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),Kt=o(((e,t)=>{t.exports=Gt()})),qt=c(h(),1),U=Kt(),Jt=Object.defineProperty,Yt=(e,t)=>Jt(e,`name`,{value:t,configurable:!0}),Xt=[`a`,`button`,`div`,`form`,`h2`,`h3`,`img`,`input`,`label`,`li`,`nav`,`ol`,`p`,`select`,`span`,`svg`,`ul`].reduce((e,t)=>{let n=kt(`Primitive.${t}`),r=w.forwardRef((e,r)=>{let{asChild:i,...a}=e,o=i?n:t;return typeof window<`u`&&(window[Symbol.for(`radix-ui`)]=!0),(0,U.jsx)(o,{...a,ref:r})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function Zt(e,t){e&&qt.flushSync(()=>e.dispatchEvent(t))}Yt(Zt,`dispatchDiscreteCustomEvent`);var Qt=Object.defineProperty,$t=(e,t)=>Qt(e,`name`,{value:t,configurable:!0});function en(e,t){let n=w.createContext(t);n.displayName=e+`Context`;let r=$t(e=>{let{children:t,...r}=e,i=w.useMemo(()=>r,Object.values(r));return(0,U.jsx)(n.Provider,{value:i,children:t})},`Provider`);r.displayName=e+`Provider`;function i(r,i={}){let{optional:a=!1}=i,o=w.useContext(n);if(o)return o;if(t!==void 0)return t;if(!a)throw Error(`\`${r}\` must be used within \`${e}\``)}return $t(i,`useContext`),[r,i]}$t(en,`createContext`);function tn(e,t=[]){let n=[];function r(t,r){let i=w.createContext(r);i.displayName=t+`Context`;let a=n.length;n=[...n,r];let o=$t(t=>{var n;let{scope:r,children:o,...s}=t,c=(r==null||(n=r[e])==null?void 0:n[a])||i,l=w.useMemo(()=>s,Object.values(s));return(0,U.jsx)(c.Provider,{value:l,children:o})},`Provider`);o.displayName=t+`Provider`;function s(n,o,s={}){var c;let{optional:l=!1}=s,u=(o==null||(c=o[e])==null?void 0:c[a])||i,d=w.useContext(u);if(d)return d;if(r!==void 0)return r;if(!l)throw Error(`\`${n}\` must be used within \`${t}\``)}return $t(s,`useContext`),[o,s]}$t(r,`createContext`);let i=$t(()=>{let t=n.map(e=>w.createContext(e));return $t(function(n){let r=(n==null?void 0:n[e])||t;return w.useMemo(()=>({[`__scope${e}`]:{...n,[e]:r}}),[n,r])},`useScope`)},`createScope`);return i.scopeName=e,[r,nn(i,...t)]}$t(tn,`createContextScope`);function nn(...e){let t=e[0];if(e.length===1)return t;let n=$t(()=>{let n=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return $t(function(e){let r=n.reduce((t,{useScope:n,scopeName:r})=>{let i=n(e)[`__scope${r}`];return{...t,...i}},{});return w.useMemo(()=>({[`__scope${t.scopeName}`]:r}),[r])},`useComposedScopes`)},`createScope`);return n.scopeName=t.scopeName,n}$t(nn,`composeContextScopes`);function rn(e,t){if(t.has(e))throw TypeError(`Cannot initialize the same private elements twice on an object`)}function an(e,t,n){rn(e,t),t.set(e,n)}function on(e,t,n){if(typeof e==`function`?e===t:e.has(t))return arguments.length<3?t:n;throw TypeError(`Private element is not present on this object`)}function sn(e,t,n){return e.set(on(e,t),n),n}function cn(e,t){return e.get(on(e,t))}var ln,un=(ln=globalThis)!=null&&ln.document?w.useLayoutEffect:()=>{},dn,fn,pn=Object.defineProperty,mn=(e,t)=>pn(e,`name`,{value:t,configurable:!0});function hn(e){let t=e+`CollectionProvider`,[n,r]=tn(t),[i,a]=n(t,{collectionRef:{current:null},itemMap:new Map}),o=mn(e=>{let{scope:t,children:n}=e,r=w.useRef(null),a=w.useRef(new Map).current;return(0,U.jsx)(i,{scope:t,itemMap:a,collectionRef:r,children:n})},`CollectionProvider`);o.displayName=t;let s=e+`CollectionSlot`,c=kt(s),l=w.forwardRef((e,t)=>{let{scope:n,children:r}=e,i=Et(t,a(s,n).collectionRef);return(0,U.jsx)(c,{ref:i,children:r})});l.displayName=s;let u=e+`CollectionItemSlot`,d=`data-radix-collection-item`,f=kt(u),p=w.forwardRef((e,t)=>{let{scope:n,children:r,...i}=e,o=w.useRef(null),s=Et(t,o),c=a(u,n);return w.useEffect(()=>(c.itemMap.set(o,{ref:o,...i}),()=>void c.itemMap.delete(o))),(0,U.jsx)(f,{[d]:``,ref:s,children:r})});p.displayName=u;function m(t){let n=a(e+`CollectionConsumer`,t);return w.useCallback(()=>{let e=n.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll(`[${d}]`));return Array.from(n.itemMap.values()).sort((e,n)=>t.indexOf(e.ref.current)-t.indexOf(n.ref.current))},[n.collectionRef,n.itemMap])}return mn(m,`useCollection`),[{Provider:o,Slot:l,ItemSlot:p},m,r]}mn(hn,`createCollection`);var gn=new WeakMap,_n=(dn=new WeakMap,fn=class e extends Map{constructor(e){super(e),an(this,dn,void 0),sn(dn,this,[...super.keys()]),gn.set(this,!0)}set(e,t){return gn.get(this)&&!this.has(e)&&cn(dn,this).push(e),super.set(e,t),this}insert(e,t,n){let r=this.has(t),i=r?this.size:this.size+1,a=bn(e),o=a>=0?Math.min(a,i-1):Math.max(i+a,0);if(r?cn(dn,this).indexOf(t)===o:o===this.size)return this.set(t,n),this;let s=cn(dn,this).filter(e=>e!==t);s.splice(o,0,t);let c=s.map(e=>[e,e===t?n:this.get(e)]);this.clear();for(let[e,t]of c)this.set(e,t);return this}with(t,n,r){let i=new e(this);return i.insert(t,n,r),i}before(e){let t=cn(dn,this).indexOf(e)-1;if(!(t<0))return this.entryAt(t)}setBefore(e,t,n){let r=cn(dn,this).indexOf(e);if(r===-1)return this;let i=cn(dn,this).indexOf(t),a=i!==-1&&i<r?r-1:r;return this.insert(a,t,n)}after(e){let t=cn(dn,this).indexOf(e);if(t=t===-1||t===this.size-1?-1:t+1,t!==-1)return this.entryAt(t)}setAfter(e,t,n){let r=cn(dn,this).indexOf(e);if(r===-1)return this;let i=cn(dn,this).indexOf(t),a=i!==-1&&i<=r?r:r+1;return this.insert(a,t,n)}first(){return this.entryAt(0)}last(){return this.entryAt(-1)}clear(){return sn(dn,this,[]),super.clear()}delete(e){let t=super.delete(e);return t&&cn(dn,this).splice(cn(dn,this).indexOf(e),1),t}deleteAt(e){let t=this.keyAt(e);return t!==void 0&&this.delete(t)}at(e){let t=vn(cn(dn,this),e);if(t!==void 0)return this.get(t)}entryAt(e){let t=vn(cn(dn,this),e);if(t!==void 0)return[t,this.get(t)]}indexOf(e){return cn(dn,this).indexOf(e)}keyAt(e){return vn(cn(dn,this),e)}from(e,t){let n=this.indexOf(e);if(n===-1)return;let r=n+t;return r<0&&(r=0),r>=this.size&&(r=this.size-1),this.at(r)}keyFrom(e,t){let n=this.indexOf(e);if(n===-1)return;let r=n+t;return r<0&&(r=0),r>=this.size&&(r=this.size-1),this.keyAt(r)}find(e,t){let n=0;for(let r of this){if(Reflect.apply(e,t,[r,n,this]))return r;n++}}findIndex(e,t){let n=0;for(let r of this){if(Reflect.apply(e,t,[r,n,this]))return n;n++}return-1}filter(t,n){let r=[],i=0;for(let e of this)Reflect.apply(t,n,[e,i,this])&&r.push(e),i++;return new e(r)}map(t,n){let r=[],i=0;for(let e of this)r.push([e[0],Reflect.apply(t,n,[e,i,this])]),i++;return new e(r)}reduce(...e){let[t,n]=e,r=e.length>1;if(!r&&this.size===0)throw TypeError(`Reduce of empty OrderedDict with no initial value`);let i=0,a=n;for(let e of this)a=i===0&&!r?e:Reflect.apply(t,this,[a,e,i,this]),i++;return a}reduceRight(...e){let[t,n]=e,r=e.length>1;if(!r&&this.size===0)throw TypeError(`Reduce of empty OrderedDict with no initial value`);let i=n;for(let e=this.size-1;e>=0;e--){let n=this.entryAt(e);i=e===this.size-1&&!r?n:Reflect.apply(t,this,[i,n,e,this])}return i}sort(e){if(typeof e!=`function`)throw TypeError(`OrderedDict.sort requires a compare function`);let t=[...this.entries()].sort(e);this.clear();for(let[e,n]of t)this.set(e,n);return this}toSorted(t){if(typeof t!=`function`)throw TypeError(`OrderedDict.toSorted requires a compare function`);let n=[...this.entries()].sort(t);return new e(n)}toReversed(){let t=new e;for(let e=this.size-1;e>=0;e--){let n=this.keyAt(e),r=this.get(n);t.set(n,r)}return t}toSpliced(...t){let n=[...this.entries()];return n.splice(...t),new e(n)}slice(t,n){let r=new e;for(let e of cn(dn,this).slice(t,n))r.set(e,this.get(e));return r}every(e,t){let n=0;for(let r of this){if(!Reflect.apply(e,t,[r,n,this]))return!1;n++}return!0}some(e,t){let n=0;for(let r of this){if(Reflect.apply(e,t,[r,n,this]))return!0;n++}return!1}},mn(fn,`OrderedDict`),fn);function vn(e,t){if(`at`in Array.prototype)return Array.prototype.at.call(e,t);let n=yn(e,t);return n===-1?void 0:e[n]}mn(vn,`at`);function yn(e,t){let n=e.length,r=bn(t),i=r>=0?r:n+r;return i<0||i>=n?-1:i}mn(yn,`toSafeIndex`);function bn(e){return e!==e||e===0?0:Math.trunc(e)}mn(bn,`toSafeInteger`);function xn(e){let t=e+`CollectionProvider`,[n,r]=tn(t),[i,a]=n(t);i.displayName=e+`CollectionStableContextProvider`;let[o,s]=n(t);o.displayName=e+`CollectionStatefulContextProvider`;let c=mn(({state:e,...t})=>e?(0,U.jsx)(u,{...t,state:e}):(0,U.jsx)(l,{...t}),`CollectionProvider`);c.displayName=t;let l=mn(e=>{let t=_();return(0,U.jsx)(u,{...e,state:t})},`CollectionInit`);l.displayName=e+`CollectionInit`;let u=mn(e=>{let{scope:t,children:n,state:r}=e,a=w.useRef(null),[s,c]=w.useState(null),l=Et(a,c),[u,d]=r,f=w.useRef(new _n),p=w.useCallback(()=>{let e=f.current;return wn(e)||e.sort(Tn),e},[]);return w.useEffect(()=>{if(!s)return;let e=En(()=>{d(e=>{let t=e.toSorted(Tn);return t.some(([t],n)=>e.keyAt(n)!==t)?t:e})});return e.observe(s,{childList:!0,subtree:!0}),()=>{e.disconnect()}},[s,d]),(0,U.jsx)(i,{scope:t,collectionElementRef:l,collectionElementRefObject:a,getCollection:p,setCollection:d,registryRef:f,children:(0,U.jsx)(o,{scope:t,collectionElement:s,collection:u,children:n})})},`CollectionProviderImpl`);u.displayName=e+`CollectionProviderImpl`;let d=e+`CollectionSlot`,f=kt(d),p=w.forwardRef((e,t)=>{let{scope:n,children:r}=e,i=Et(t,a(d,n).collectionElementRef);return(0,U.jsx)(f,{ref:i,children:r})});p.displayName=d;let m=e+`CollectionItemSlot`,h=kt(m),g=w.forwardRef((e,t)=>{let{scope:n,children:r,...i}=e,o=w.useRef(null),{setCollection:s,registryRef:c}=a(m,n),l=w.useRef(i);Sn(l.current,i)||(l.current=i);let u=l.current,d=Et(t,w.useCallback(e=>{let t=c.current;e?t.set(e,{...l.current,element:e}):o.current&&t.delete(o.current)},[c]),o);un(()=>{let e=o.current,t=c.current;e&&t.has(e)&&t.set(e,{...u,element:e})},[u,c]);let f=w.useRef(null);return w.useEffect(()=>{var e;let t=o.current,n=f.current;(((e=n==null?void 0:n.element)==null?null:e)!==t||t&&(n==null?void 0:n.itemData)!==u)&&(f.current=t?{element:t,itemData:u}:null,s(e=>{let r=new _n(e);return n&&n.element!==t&&r.delete(n.element),t&&r.set(t,{...u,element:t}),r.sort(Tn)}))}),w.useEffect(()=>()=>{let e=f.current;f.current=null,e&&s(t=>{if(!t.has(e.element))return t;let n=new _n(t);return n.delete(e.element),n})},[s]),(0,U.jsx)(h,{"data-radix-collection-item":``,ref:d,children:r})});g.displayName=m;function _(){return w.useState(new _n)}mn(_,`useInitCollection`);function v(t){let{collection:n}=s(e+`CollectionConsumer`,t);return n}mn(v,`useCollection`);function y(t){let{getCollection:n}=a(e+`CollectionConsumer`,t);return n}return mn(y,`useGetCollection`),[{Provider:c,Slot:p,ItemSlot:g},{createCollectionScope:r,useCollection:v,useGetCollection:y,useInitCollection:_}]}mn(xn,`createCollection`);function Sn(e,t){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||e==null||t==null)return!1;let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(!Object.prototype.hasOwnProperty.call(t,r)||e[r]!==t[r])return!1;return!0}mn(Sn,`shallowEqual`);function Cn(e,t){return!!(t.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_PRECEDING)}mn(Cn,`isElementPreceding`);function wn(e){let t;for(let n of e.keys()){if(t){let e=t.compareDocumentPosition(n);if(!(e&Node.DOCUMENT_POSITION_DISCONNECTED)&&e&Node.DOCUMENT_POSITION_PRECEDING)return!1}t=n}return!0}mn(wn,`isInDocumentOrder`);function Tn(e,t){return!e[1].element||!t[1].element?0:Cn(e[1].element,t[1].element)?-1:1}mn(Tn,`sortByDocumentPosition`);function En(e){return new MutationObserver(t=>{for(let n of t)if(n.type===`childList`){e();return}})}mn(En,`getChildListObserver`);var Dn=Object.defineProperty,On=(e,t)=>Dn(e,`name`,{value:t,configurable:!0}),kn=!!(typeof window<`u`&&window.document&&window.document.createElement);function An(e,t,{checkForDefaultPrevented:n=!0}={}){return On(function(r){if(e==null||e(r),n===!1||!r||!r.defaultPrevented)return t==null?void 0:t(r)},`handleEvent`)}On(An,`composeEventHandlers`);function jn(e){var t,n;if(!kn)throw Error(`Cannot access window outside of the DOM`);return(t=e==null||(n=e.ownerDocument)==null?void 0:n.defaultView)==null?window:t}On(jn,`getOwnerWindow`);function Mn(e){var t;if(!kn)throw Error(`Cannot access document outside of the DOM`);return(t=e==null?void 0:e.ownerDocument)==null?document:t}On(Mn,`getOwnerDocument`);function Nn(e,t=!1){let{activeElement:n}=Mn(e);if(!(n!=null&&n.nodeName))return null;if(Pn(n)&&n.contentDocument)return Nn(n.contentDocument.body,t);if(t){let e=n.getAttribute(`aria-activedescendant`);if(e){let t=Mn(n).getElementById(e);if(t)return t}}return n}On(Nn,`getActiveElement`);function Pn(e){return e.tagName===`IFRAME`}On(Pn,`isFrame`);var Fn=Object.defineProperty,In=(e,t)=>Fn(e,`name`,{value:t,configurable:!0}),Ln=w.useEffectEvent,Rn=w.useInsertionEffect;function zn(e){if(typeof Ln==`function`)return Ln(e);let t=w.useRef(()=>{throw Error(`Cannot call an event handler while rendering.`)});return typeof Rn==`function`?Rn(()=>{t.current=e}):un(()=>{t.current=e}),w.useMemo(()=>((...e)=>{var n;return(n=t.current)==null?void 0:n.call(t,...e)}),[])}In(zn,`useEffectEvent`);var Bn=Object.defineProperty,Vn=(e,t)=>Bn(e,`name`,{value:t,configurable:!0}),Hn=w.useInsertionEffect||un;function Un({prop:e,defaultProp:t,onChange:n=Vn(()=>{},`onChange`),caller:r}){let[i,a,o]=Wn({defaultProp:t,onChange:n}),s=e!==void 0;return[s?e:i,w.useCallback(t=>{if(s){let r=Gn(t)?t(e):t;if(r!==e){var n;(n=o.current)==null||n.call(o,r)}}else a(t)},[s,e,a,o])]}Vn(Un,`useControllableState`);function Wn({defaultProp:e,onChange:t}){let[n,r]=w.useState(e),i=w.useRef(n),a=w.useRef(t);return Hn(()=>{a.current=t},[t]),w.useEffect(()=>{if(i.current!==n){var e;(e=a.current)==null||e.call(a,n),i.current=n}},[n,i]),[n,r,a]}Vn(Wn,`useUncontrolledState`);function Gn(e){return typeof e==`function`}Vn(Gn,`isFunction`);var Kn=Symbol(`RADIX:SYNC_STATE`);function qn(e,t,n,r){let{prop:i,defaultProp:a,onChange:o,caller:s}=t,c=i!==void 0,l=zn(o),u=[{...n,state:a}];r&&u.push(r);let[d,f]=w.useReducer((t,n)=>{if(n.type===Kn)return{...t,state:n.state};let r=e(t,n);return c&&!Object.is(r.state,t.state)&&l(r.state),r},...u),p=d.state,m=w.useRef(p);w.useEffect(()=>{m.current!==p&&(m.current=p,c||l(p))},[p,m,c]);let h=w.useMemo(()=>i===void 0?d:{...d,state:i},[d,i]);return w.useEffect(()=>{c&&!Object.is(i,d.state)&&f({type:Kn,state:i})},[i,d.state,c]),[h,f]}Vn(qn,`useControllableStateReducer`);var Jn=Object.defineProperty,Yn=(e,t)=>Jn(e,`name`,{value:t,configurable:!0});function Xn(e,t){return w.useReducer((e,n)=>{let r=t[e][n];return r==null?e:r},e)}Yn(Xn,`useStateMachine`);var Zn=Yn(e=>{let{present:t,children:n}=e,r=Qn(t),i=typeof n==`function`?n({present:r.isPresent}):w.Children.only(n),a=er(r.ref,nr(i));return typeof n==`function`||r.isPresent?w.cloneElement(i,{ref:a}):null},`Presence`);function Qn(e){let[t,n]=w.useState(),r=w.useRef(null),i=w.useRef(e),a=w.useRef(`none`),o=w.useRef(void 0),[s,c]=Xn(e?`mounted`:`unmounted`,{mounted:{UNMOUNT:`unmounted`,ANIMATION_OUT:`unmountSuspended`},unmountSuspended:{MOUNT:`mounted`,ANIMATION_END:`unmounted`},unmounted:{MOUNT:`mounted`}});return w.useEffect(()=>{if(s===`mounted`){var e;a.current=(e=o.current)==null?tr(r.current):e,o.current=void 0}else a.current=`none`},[s]),un(()=>{let t=r.current,n=i.current;if(n!==e){let r=a.current,s=tr(t);e?(o.current=s,c(`MOUNT`)):s===`none`||(t==null?void 0:t.display)===`none`?c(`UNMOUNT`):c(n&&r!==s?`ANIMATION_OUT`:`UNMOUNT`),i.current=e}},[e,c]),un(()=>{if(t){var e;let n,o=(e=t.ownerDocument.defaultView)==null?window:e,s=Yn(e=>{let a=tr(r.current).includes(CSS.escape(e.animationName));if(e.target===t&&a&&(c(`ANIMATION_END`),!i.current)){let e=t.style.animationFillMode;t.style.animationFillMode=`forwards`,n=o.setTimeout(()=>{t.style.animationFillMode===`forwards`&&(t.style.animationFillMode=e)})}},`handleAnimationEnd`),l=Yn(e=>{e.target===t&&(a.current=tr(r.current))},`handleAnimationStart`);return t.addEventListener(`animationstart`,l),t.addEventListener(`animationcancel`,s),t.addEventListener(`animationend`,s),()=>{o.clearTimeout(n),t.removeEventListener(`animationstart`,l),t.removeEventListener(`animationcancel`,s),t.removeEventListener(`animationend`,s)}}c(`ANIMATION_END`)},[t,c]),{isPresent:[`mounted`,`unmountSuspended`].includes(s),ref:w.useCallback(e=>{if(e){let t=getComputedStyle(e);r.current=t,o.current=tr(t)}else r.current=null;n(e)},[])}}Yn(Qn,`usePresence`);function $n(e,t){if(typeof e==`function`)return e(t);e!=null&&(e.current=t)}Yn($n,`setRef`);function er(...e){let t=w.useRef(e);return t.current=e,w.useCallback(e=>{let n=t.current,r=!1,i=n.map(t=>{let n=$n(t,e);return!r&&typeof n==`function`&&(r=!0),n});if(r)return()=>{for(let e=0;e<i.length;e++){let t=i[e];typeof t==`function`?t():$n(n[e],null)}}},[])}Yn(er,`useStableComposedRefs`);function tr(e){return(e==null?void 0:e.animationName)||`none`}Yn(tr,`getAnimationName`);function nr(e){var t,n;let r=(t=Object.getOwnPropertyDescriptor(e.props,`ref`))==null?void 0:t.get,i=r&&`isReactWarning`in r&&r.isReactWarning;return i?e.ref:(r=(n=Object.getOwnPropertyDescriptor(e,`ref`))==null?void 0:n.get,i=r&&`isReactWarning`in r&&r.isReactWarning,i?e.props.ref:e.props.ref||e.ref)}Yn(nr,`getElementRef`);var rr=Object.defineProperty,ir=(e,t)=>rr(e,`name`,{value:t,configurable:!0}),ar=w.useId||(()=>void 0),or=0;function sr(e){let[t,n]=w.useState(ar());return un(()=>{e||n(e=>e==null?String(or++):e)},[e]),e||(t?`radix-${t}`:``)}ir(sr,`useId`);var cr=Object.defineProperty,lr=(e,t)=>cr(e,`name`,{value:t,configurable:!0}),ur={LTR:`ltr`,RTL:`rtl`},dr=w.createContext(void 0);function fr(e){let t=w.useContext(dr);return e||t||ur.LTR}lr(fr,`useDirection`);var pr=Object.defineProperty,mr=(e,t)=>pr(e,`name`,{value:t,configurable:!0}),hr=w.useInsertionEffect;function gr(e){let t=w.useRef(e);return typeof hr==`function`?hr(()=>{t.current=e}):un(()=>{t.current=e}),w.useMemo(()=>((...e)=>{var n;return(n=t.current)==null?void 0:n.call(t,...e)}),[])}mr(gr,`useCallbackRef`);var _r=Object.defineProperty,vr=(e,t)=>_r(e,`name`,{value:t,configurable:!0}),yr=`dismissableLayer.update`,br=`dismissableLayer.pointerDownOutside`,xr=`dismissableLayer.focusOutside`,Sr,Cr=w.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set,dismissableSurfaces:new Set}),wr=w.forwardRef(vr(function(e,t){var n,r;let{disableOutsidePointerEvents:i=!1,deferPointerDownOutside:a=!1,onEscapeKeyDown:o,onPointerDownOutside:s,onFocusOutside:c,onInteractOutside:l,onDismiss:u,...d}=e,f=w.useContext(Cr),[p,m]=w.useState(null),h=(n=p==null?void 0:p.ownerDocument)==null?(r=globalThis)==null?void 0:r.document:n,[,g]=w.useState({}),_=Et(t,m),v=Array.from(f.layers),[y]=[...f.layersWithOutsidePointerEventsDisabled].slice(-1),b=y?v.indexOf(y):-1,x=p?v.indexOf(p):-1,S=f.layersWithOutsidePointerEventsDisabled.size>0,C=x>=b,T=w.useRef(!1),E=Dr(e=>{s==null||s(e),l==null||l(e),e.defaultPrevented||u==null||u()},{ownerDocument:h,deferPointerDownOutside:a,isDeferredPointerDownOutsideRef:T,dismissableSurfaces:f.dismissableSurfaces,shouldHandlePointerDownOutside:w.useCallback(e=>{if(!(e instanceof Node))return!1;let t=[...f.branches].some(t=>t.contains(e));return C&&!t},[f.branches,C])}),D=Or(e=>{if(a&&T.current)return;let t=e.target;[...f.branches].some(e=>e.contains(t))||(c==null||c(e),l==null||l(e),e.defaultPrevented||u==null||u())},h),ee=p?x===v.length-1:!1,O=gr(e=>{e.key===`Escape`&&(o==null||o(e),!e.defaultPrevented&&u&&(e.preventDefault(),u()))});return w.useEffect(()=>{if(ee)return h.addEventListener(`keydown`,O,{capture:!0}),()=>h.removeEventListener(`keydown`,O,{capture:!0})},[h,ee,O]),w.useEffect(()=>{if(p)return i&&(f.layersWithOutsidePointerEventsDisabled.size===0&&(Sr=h.body.style.pointerEvents,h.body.style.pointerEvents=`none`),f.layersWithOutsidePointerEventsDisabled.add(p)),f.layers.add(p),kr(),()=>{i&&(f.layersWithOutsidePointerEventsDisabled.delete(p),f.layersWithOutsidePointerEventsDisabled.size===0&&(h.body.style.pointerEvents=Sr))}},[p,h,i,f]),w.useEffect(()=>()=>{p&&(f.layers.delete(p),f.layersWithOutsidePointerEventsDisabled.delete(p),kr())},[p,f]),w.useEffect(()=>{let e=vr(()=>g({}),`handleUpdate`);return document.addEventListener(yr,e),()=>document.removeEventListener(yr,e)},[]),(0,U.jsx)(Xt.div,{...d,ref:_,style:{pointerEvents:S?C?`auto`:`none`:void 0,...e.style},onFocusCapture:An(e.onFocusCapture,D.onFocusCapture),onBlurCapture:An(e.onBlurCapture,D.onBlurCapture),onPointerDownCapture:An(e.onPointerDownCapture,E.onPointerDownCapture)})},`DismissableLayer`));function Tr(){let e=w.useContext(Cr),[t,n]=w.useState(null);return w.useEffect(()=>{if(t)return e.dismissableSurfaces.add(t),()=>{e.dismissableSurfaces.delete(t)}},[t,e.dismissableSurfaces]),n}vr(Tr,`useDismissableLayerSurface`);var Er=vr(()=>!0,`IS_TRUE`);function Dr(e,t){var n;let{ownerDocument:r=(n=globalThis)==null?void 0:n.document,deferPointerDownOutside:i=!1,isDeferredPointerDownOutsideRef:a,dismissableSurfaces:o,shouldHandlePointerDownOutside:s=Er}=t,c=gr(e),l=w.useRef(!1),u=w.useRef(!1),d=w.useRef(new Map),f=w.useRef(()=>{});return w.useEffect(()=>{function e(){u.current=!1,a.current=!1,d.current.clear()}vr(e,`resetOutsideInteraction`);function t(){return Array.from(d.current.values()).some(Boolean)}vr(t,`isOutsideInteractionIntercepted`);function n(e){if(!u.current)return;let t=e.target;t instanceof Node&&[...o].some(e=>e.contains(t))||d.current.set(e.type,!0),e.type===`click`&&window.setTimeout(()=>{u.current&&f.current()},0)}vr(n,`handleInteractionCapture`);function p(e){u.current&&d.current.set(e.type,!1)}vr(p,`handleInteractionBubble`);let m=vr(n=>{if(n.target&&!l.current){let o=function(){r.removeEventListener(`click`,f.current);let n=t();e(),n||Ar(br,c,p,{discrete:!0})};if(vr(o,`handleAndDispatchPointerDownOutsideEvent`),!s(n.target)){r.removeEventListener(`click`,f.current),e(),l.current=!1;return}let p={originalEvent:n};u.current=!0,a.current=i&&n.button===0,d.current.clear(),!i||n.button!==0?o():(r.removeEventListener(`click`,f.current),f.current=o,r.addEventListener(`click`,f.current,{once:!0}))}else r.removeEventListener(`click`,f.current),e();l.current=!1},`handlePointerDown`),h=[`pointerup`,`mousedown`,`mouseup`,`touchstart`,`touchend`,`click`];for(let e of h)r.addEventListener(e,n,!0),r.addEventListener(e,p);let g=window.setTimeout(()=>{r.addEventListener(`pointerdown`,m)},0);return()=>{window.clearTimeout(g),r.removeEventListener(`pointerdown`,m),r.removeEventListener(`click`,f.current);for(let e of h)r.removeEventListener(e,n,!0),r.removeEventListener(e,p)}},[r,c,i,a,o,s]),{onPointerDownCapture:vr(()=>l.current=!0,`onPointerDownCapture`)}}vr(Dr,`usePointerDownOutside`);function Or(e,t=(()=>{var e;return(e=globalThis)==null?void 0:e.document})()){let n=gr(e),r=w.useRef(!1);return w.useEffect(()=>{let e=vr(e=>{e.target&&!r.current&&Ar(xr,n,{originalEvent:e},{discrete:!1})},`handleFocus`);return t.addEventListener(`focusin`,e),()=>t.removeEventListener(`focusin`,e)},[t,n]),{onFocusCapture:vr(()=>r.current=!0,`onFocusCapture`),onBlurCapture:vr(()=>r.current=!1,`onBlurCapture`)}}vr(Or,`useFocusOutside`);function kr(){let e=new CustomEvent(yr);document.dispatchEvent(e)}vr(kr,`dispatchUpdate`);function Ar(e,t,n,{discrete:r}){let i=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&i.addEventListener(e,t,{once:!0}),r?Zt(i,a):i.dispatchEvent(a)}vr(Ar,`handleAndDispatchCustomEvent`);var jr=Object.defineProperty,Mr=(e,t)=>jr(e,`name`,{value:t,configurable:!0}),Nr=`focusScope.autoFocusOnMount`,Pr=`focusScope.autoFocusOnUnmount`,Fr={bubbles:!1,cancelable:!0},Ir=w.forwardRef(Mr(function(e,t){let{loop:n=!1,trapped:r=!1,branches:i,onMountAutoFocus:a,onUnmountAutoFocus:o,...s}=e,[c,l]=w.useState(null),u=gr(a),d=gr(o),f=w.useRef(null),p=Et(t,l),m=w.useRef(i);w.useEffect(()=>{m.current=i});let h=w.useCallback(e=>{var t;return e?c!=null&&c.contains(e)?!0:!!((t=m.current)!=null&&t.some(t=>t.contains(e))):!1},[c]),g=w.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;w.useEffect(()=>{if(r){let e=function(e){if(g.paused||!c)return;let t=e.target;h(t)?f.current=t:qr(f.current,{select:!0})},t=function(e){if(g.paused||!c)return;let t=e.relatedTarget;t!==null&&(h(t)||qr(f.current,{select:!0}))},n=function(e){if(document.activeElement===document.body)for(let t of e)t.removedNodes.length>0&&qr(c)};Mr(e,`handleFocusIn`),Mr(t,`handleFocusOut`),Mr(n,`handleMutations`),document.addEventListener(`focusin`,e),document.addEventListener(`focusout`,t);let r=new MutationObserver(n);return c&&r.observe(c,{childList:!0,subtree:!0}),()=>{document.removeEventListener(`focusin`,e),document.removeEventListener(`focusout`,t),r.disconnect()}}},[r,c,g.paused,h]),w.useEffect(()=>{if(c){Jr.add(g);let e=document.activeElement;if(!c.contains(e)){let t=new CustomEvent(Nr,Fr);c.addEventListener(Nr,u),c.dispatchEvent(t),t.defaultPrevented||(Vr(Zr(Ur(c)),{select:!0}),document.activeElement===e&&qr(c))}return()=>{c.removeEventListener(Nr,u);let t=c.ownerDocument,n=CustomEvent;setTimeout(()=>{let r=new n(Pr,Fr);c.addEventListener(Pr,d),c.dispatchEvent(r),r.defaultPrevented||qr(e==null?t.body:e,{select:!0}),c.removeEventListener(Pr,d),Jr.remove(g)},0)}}},[c,u,d,g]);let _=w.useCallback(e=>{if(!n&&!r||g.paused)return;let t=e.key===`Tab`&&!e.altKey&&!e.ctrlKey&&!e.metaKey,i=document.activeElement;if(t&&i){let t=e.currentTarget,[r,a]=Hr(t);r&&a?!e.shiftKey&&i===a?(e.preventDefault(),n&&qr(r,{select:!0})):e.shiftKey&&i===r&&(e.preventDefault(),n&&qr(a,{select:!0})):i===t&&e.preventDefault()}},[n,r,g.paused]);return(0,U.jsx)(Xt.div,{tabIndex:-1,...s,ref:p,onKeyDown:_})},`FocusScope`)),Lr=w.createContext(null);function Rr({registry:e,children:t}){return e?(0,U.jsx)(Lr.Provider,{value:e,children:t}):t}Mr(Rr,`FocusScopeBranchProvider`);function zr(){let[e,t]=w.useState([]);return{nodes:e,registry:w.useMemo(()=>({add:Mr(e=>t(t=>t.includes(e)?t:[...t,e]),`add`),remove:Mr(e=>t(t=>t.filter(t=>t!==e)),`remove`)}),[])}}Mr(zr,`useFocusScopeBranchRegistry`);function Br(e){let t=w.useContext(Lr);w.useEffect(()=>{if(e&&t)return t.add(e),()=>t.remove(e)},[e,t])}Mr(Br,`useFocusScopeBranch`);function Vr(e,{select:t=!1}={}){let n=document.activeElement;for(let r of e)if(qr(r,{select:t}),document.activeElement!==n)return}Mr(Vr,`focusFirst`);function Hr(e){let t=Ur(e);return[Wr(t,e),Wr(t.reverse(),e)]}Mr(Hr,`getTabbableEdges`);function Ur(e){let t=[],n=e.ownerDocument.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:Mr(e=>{let t=e.tagName===`INPUT`&&e.type===`hidden`;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP},`acceptNode`)});for(;n.nextNode();)t.push(n.currentNode);return t}Mr(Ur,`getTabbableCandidates`);function Wr(e,t){let n=typeof t.checkVisibility==`function`&&t.checkVisibility({checkVisibilityCSS:!0});for(let r of e)if(!(n?!r.checkVisibility({checkVisibilityCSS:!0}):Gr(r,{upTo:t})))return r}Mr(Wr,`findVisible`);function Gr(e,{upTo:t}){if(getComputedStyle(e).visibility===`hidden`)return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display===`none`)return!0;e=e.parentElement}return!1}Mr(Gr,`isHidden`);function Kr(e){return e.tagName===`INPUT`&&typeof e.select==`function`}Mr(Kr,`isSelectableInput`);function qr(e,{select:t=!1}={}){if(e&&e.focus){var n;let r=((n=e.ownerDocument)==null?document:n).activeElement;e.focus({preventScroll:!0}),e!==r&&Kr(e)&&t&&e.select()}}Mr(qr,`focus`);var Jr=Yr();function Yr(){let e=[];return{add(t){let n=e[0];t!==n&&(n==null||n.pause()),e=Xr(e,t),e.unshift(t)},remove(t){var n;e=Xr(e,t),(n=e[0])==null||n.resume()}}}Mr(Yr,`createFocusScopesStack`);function Xr(e,t){let n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}Mr(Xr,`arrayRemove`);function Zr(e){return e.filter(e=>e.tagName!==`A`)}Mr(Zr,`removeLinks`);var Qr=Object.defineProperty,$r=w.forwardRef(((e,t)=>Qr(e,`name`,{value:t,configurable:!0}))(function(e,t){var n;let{container:r,...i}=e,[a,o]=w.useState(!1);un(()=>o(!0),[]);let s=r||a&&((n=globalThis)==null||(n=n.document)==null?void 0:n.body);return s?qt.createPortal((0,U.jsx)(Xt.div,{...i,ref:t}),s):null},`Portal`)),ei=Object.defineProperty,ti=(e,t)=>ei(e,`name`,{value:t,configurable:!0}),ni=0,ri=null;function ii(e){return ai(),e.children}ti(ii,`FocusGuards`);function ai(){w.useEffect(()=>{ri||(ri={start:oi(),end:oi()});let{start:e,end:t}=ri;return document.body.firstElementChild!==e&&document.body.insertAdjacentElement(`afterbegin`,e),document.body.lastElementChild!==t&&document.body.insertAdjacentElement(`beforeend`,t),ni++,()=>{ni===1&&(ri==null||ri.start.remove(),ri==null||ri.end.remove(),ri=null),ni=Math.max(0,ni-1)}},[])}ti(ai,`useFocusGuards`);function oi(){let e=document.createElement(`span`);return e.setAttribute(`data-radix-focus-guard`,``),e.tabIndex=0,e.style.outline=`none`,e.style.opacity=`0`,e.style.position=`fixed`,e.style.pointerEvents=`none`,e}ti(oi,`createFocusGuard`);var si=function(){return si=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},si.apply(this,arguments)};function ci(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols==`function`)for(var i=0,r=Object.getOwnPropertySymbols(e);i<r.length;i++)t.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(n[r[i]]=e[r[i]]);return n}function li(e,t,n){if(n||arguments.length===2)for(var r=0,i=t.length,a;r<i;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var ui=`right-scroll-bar-position`,di=`width-before-scroll-bar`,fi=`with-scroll-bars-hidden`,pi=`--removed-body-scroll-bar-size`;function mi(e,t){return typeof e==`function`?e(t):e&&(e.current=t),e}function hi(e,t){var n=(0,w.useState)(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(e){var t=n.value;t!==e&&(n.value=e,n.callback(e,t))}}}})[0];return n.callback=t,n.facade}var gi=typeof window<`u`?w.useLayoutEffect:w.useEffect,_i=new WeakMap;function vi(e,t){var n=hi(t||null,function(t){return e.forEach(function(e){return mi(e,t)})});return gi(function(){var t=_i.get(n);if(t){var r=new Set(t),i=new Set(e),a=n.current;r.forEach(function(e){i.has(e)||mi(e,null)}),i.forEach(function(e){r.has(e)||mi(e,a)})}_i.set(n,e)},[e]),n}function yi(e){return e}function bi(e,t){t===void 0&&(t=yi);var n=[],r=!1;return{read:function(){if(r)throw Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(e){var i=t(e,r);return n.push(i),function(){n=n.filter(function(e){return e!==i})}},assignSyncMedium:function(e){for(r=!0;n.length;){var t=n;n=[],t.forEach(e)}n={push:function(t){return e(t)},filter:function(){return n}}},assignMedium:function(e){r=!0;var t=[];if(n.length){var i=n;n=[],i.forEach(e),t=n}var a=function(){var n=t;t=[],n.forEach(e)},o=function(){return Promise.resolve().then(a)};o(),n={push:function(e){t.push(e),o()},filter:function(e){return t=t.filter(e),n}}}}}function xi(e){e===void 0&&(e={});var t=bi(null);return t.options=si({async:!0,ssr:!1},e),t}var Si=function(e){var t=e.sideCar,n=ci(e,[`sideCar`]);if(!t)throw Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw Error(`Sidecar medium not found`);return w.createElement(r,si({},n))};Si.isSideCarExport=!0;function Ci(e,t){return e.useMedium(t),Si}var wi=xi(),Ti=function(){},Ei=w.forwardRef(function(e,t){var n=w.useRef(null),r=w.useState({onScrollCapture:Ti,onWheelCapture:Ti,onTouchMoveCapture:Ti}),i=r[0],a=r[1],o=e.forwardProps,s=e.children,c=e.className,l=e.removeScrollBar,u=e.enabled,d=e.shards,f=e.sideCar,p=e.noRelative,m=e.noIsolation,h=e.inert,g=e.allowPinchZoom,_=e.as,v=_===void 0?`div`:_,y=e.gapMode,b=ci(e,[`forwardProps`,`children`,`className`,`removeScrollBar`,`enabled`,`shards`,`sideCar`,`noRelative`,`noIsolation`,`inert`,`allowPinchZoom`,`as`,`gapMode`]),x=f,S=vi([n,t]),C=si(si({},b),i);return w.createElement(w.Fragment,null,u&&w.createElement(x,{sideCar:wi,removeScrollBar:l,shards:d,noRelative:p,noIsolation:m,inert:h,setCallbacks:a,allowPinchZoom:!!g,lockRef:n,gapMode:y}),o?w.cloneElement(w.Children.only(s),si(si({},C),{ref:S})):w.createElement(v,si({},C,{className:c,ref:S}),s))});Ei.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},Ei.classNames={fullWidth:di,zeroRight:ui};var Di=function(){if(typeof __webpack_nonce__<`u`)return __webpack_nonce__};function Oi(){if(!document)return null;var e=document.createElement(`style`);e.type=`text/css`;var t=Di();return t&&e.setAttribute(`nonce`,t),e}function ki(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Ai(e){(document.head||document.getElementsByTagName(`head`)[0]).appendChild(e)}var ji=function(){var e=0,t=null;return{add:function(n){e==0&&(t=Oi())&&(ki(t,n),Ai(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},Mi=function(){var e=ji();return function(t,n){w.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Ni=function(){var e=Mi();return function(t){var n=t.styles,r=t.dynamic;return e(n,r),null}},Pi={left:0,top:0,right:0,gap:0},Fi=function(e){return parseInt(e||``,10)||0},Ii=function(e){var t=window.getComputedStyle(document.body),n=t[e===`padding`?`paddingLeft`:`marginLeft`],r=t[e===`padding`?`paddingTop`:`marginTop`],i=t[e===`padding`?`paddingRight`:`marginRight`];return[Fi(n),Fi(r),Fi(i)]},Li=function(e){if(e===void 0&&(e=`margin`),typeof window>`u`)return Pi;var t=Ii(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Ri=Ni(),zi=`data-scroll-locked`,Bi=function(e,t,n,r){var i=e.left,a=e.top,o=e.right,s=e.gap;return n===void 0&&(n=`margin`),`
  .${fi} {
   overflow: hidden ${r};
   padding-right: ${s}px ${r};
  }
  body[${zi}] {
    overflow: hidden ${r};
    overscroll-behavior: contain;
    ${[t&&`position: relative ${r};`,n===`margin`&&`
    padding-left: ${i}px;
    padding-top: ${a}px;
    padding-right: ${o}px;
    margin-left:0;
    margin-top:0;
    margin-right: ${s}px ${r};
    `,n===`padding`&&`padding-right: ${s}px ${r};`].filter(Boolean).join(``)}
  }
  
  .${ui} {
    right: ${s}px ${r};
  }
  
  .${di} {
    margin-right: ${s}px ${r};
  }
  
  .${ui} .${ui} {
    right: 0 ${r};
  }
  
  .${di} .${di} {
    margin-right: 0 ${r};
  }
  
  body[${zi}] {
    ${pi}: ${s}px;
  }
`},Vi=function(){var e=parseInt(document.body.getAttribute(`data-scroll-locked`)||`0`,10);return isFinite(e)?e:0},Hi=function(){w.useEffect(function(){return document.body.setAttribute(zi,(Vi()+1).toString()),function(){var e=Vi()-1;e<=0?document.body.removeAttribute(zi):document.body.setAttribute(zi,e.toString())}},[])},Ui=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,i=r===void 0?`margin`:r;Hi();var a=w.useMemo(function(){return Li(i)},[i]);return w.createElement(Ri,{styles:Bi(a,!t,i,n?``:`!important`)})},Wi=!1;if(typeof window<`u`)try{var Gi=Object.defineProperty({},"passive",{get:function(){return Wi=!0,!0}});window.addEventListener(`test`,Gi,Gi),window.removeEventListener(`test`,Gi,Gi)}catch{Wi=!1}var Ki=Wi?{passive:!1}:!1,qi=function(e){return e.tagName===`TEXTAREA`},Ji=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!==`hidden`&&!(n.overflowY===n.overflowX&&!qi(e)&&n[t]===`visible`)},Yi=function(e){return Ji(e,`overflowY`)},Xi=function(e){return Ji(e,`overflowX`)},Zi=function(e,t){var n=t.ownerDocument,r=t;do{if(typeof ShadowRoot<`u`&&r instanceof ShadowRoot&&(r=r.host),ea(e,r)){var i=W(e,r);if(i[1]>i[2])return!0}r=r.parentNode}while(r&&r!==n.body);return!1},Qi=function(e){return[e.scrollTop,e.scrollHeight,e.clientHeight]},$i=function(e){return[e.scrollLeft,e.scrollWidth,e.clientWidth]},ea=function(e,t){return e===`v`?Yi(t):Xi(t)},W=function(e,t){return e===`v`?Qi(t):$i(t)},ta=function(e,t){return e===`h`&&t===`rtl`?-1:1},na=function(e,t,n,r,i){var a=ta(e,window.getComputedStyle(t).direction),o=a*r,s=n.target,c=t.contains(s),l=!1,u=o>0,d=0,f=0;do{if(!s)break;var p=W(e,s),m=p[0],h=p[1]-p[2]-a*m;(m||h)&&ea(e,s)&&(d+=h,f+=m);var g=s.parentNode;s=g&&g.nodeType===Node.DOCUMENT_FRAGMENT_NODE?g.host:g}while(!c&&s!==document.body||c&&(t.contains(s)||t===s));return(u&&(i&&Math.abs(d)<1||!i&&o>d)||!u&&(i&&Math.abs(f)<1||!i&&-o>f))&&(l=!0),l},ra=function(e){return`changedTouches`in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},ia=function(e){return[e.deltaX,e.deltaY]},aa=function(e){return e&&`current`in e?e.current:e},oa=function(e,t){return e[0]===t[0]&&e[1]===t[1]},sa=function(e){return`
  .block-interactivity-${e} {pointer-events: none;}
  .allow-interactivity-${e} {pointer-events: all;}
`},ca=0,la=[];function ua(e){var t=w.useRef([]),n=w.useRef([0,0]),r=w.useRef(),i=w.useState(ca++)[0],a=w.useState(Ni)[0],o=w.useRef(e);w.useEffect(function(){o.current=e},[e]),w.useEffect(function(){if(e.inert){document.body.classList.add(`block-interactivity-${i}`);var t=li([e.lockRef.current],(e.shards||[]).map(aa),!0).filter(Boolean);return t.forEach(function(e){return e.classList.add(`allow-interactivity-${i}`)}),function(){document.body.classList.remove(`block-interactivity-${i}`),t.forEach(function(e){return e.classList.remove(`allow-interactivity-${i}`)})}}},[e.inert,e.lockRef.current,e.shards]);var s=w.useCallback(function(e,t){if(`touches`in e&&e.touches.length===2||e.type===`wheel`&&e.ctrlKey)return!o.current.allowPinchZoom;var i=ra(e),a=n.current,s=`deltaX`in e?e.deltaX:a[0]-i[0],c=`deltaY`in e?e.deltaY:a[1]-i[1],l,u=e.target,d=Math.abs(s)>Math.abs(c)?`h`:`v`;if(`touches`in e&&d===`h`&&u.type===`range`)return!1;var f=window.getSelection(),p=f&&f.anchorNode;if(p&&(p===u||p.contains(u)))return!1;var m=Zi(d,u);if(!m)return!0;if(m?l=d:(l=d===`v`?`h`:`v`,m=Zi(d,u)),!m)return!1;if(!r.current&&`changedTouches`in e&&(s||c)&&(r.current=l),!l)return!0;var h=r.current||l;return na(h,t,e,h===`h`?s:c,!0)},[]),c=w.useCallback(function(e){var n=e;if(la.length&&la[la.length-1]===a){var r=`deltaY`in n?ia(n):ra(n),i=t.current.filter(function(e){return e.name===n.type&&(e.target===n.target||n.target===e.shadowParent)&&oa(e.delta,r)})[0];if(i&&i.should)n.cancelable&&n.preventDefault();else if(!i){var c=(o.current.shards||[]).map(aa).filter(Boolean).filter(function(e){return e.contains(n.target)});(c.length>0?s(n,c[0]):!o.current.noIsolation)&&n.cancelable&&n.preventDefault()}}},[]),l=w.useCallback(function(e,n,r,i){var a={name:e,delta:n,target:r,should:i,shadowParent:da(r)};t.current.push(a),setTimeout(function(){t.current=t.current.filter(function(e){return e!==a})},1)},[]),u=w.useCallback(function(e){n.current=ra(e),r.current=void 0},[]),d=w.useCallback(function(t){l(t.type,ia(t),t.target,s(t,e.lockRef.current))},[]),f=w.useCallback(function(t){l(t.type,ra(t),t.target,s(t,e.lockRef.current))},[]);w.useEffect(function(){return la.push(a),e.setCallbacks({onScrollCapture:d,onWheelCapture:d,onTouchMoveCapture:f}),document.addEventListener(`wheel`,c,Ki),document.addEventListener(`touchmove`,c,Ki),document.addEventListener(`touchstart`,u,Ki),function(){la=la.filter(function(e){return e!==a}),document.removeEventListener(`wheel`,c,Ki),document.removeEventListener(`touchmove`,c,Ki),document.removeEventListener(`touchstart`,u,Ki)}},[]);var p=e.removeScrollBar,m=e.inert;return w.createElement(w.Fragment,null,m?w.createElement(a,{styles:sa(i)}):null,p?w.createElement(Ui,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function da(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}var fa=Ci(wi,ua),pa=w.forwardRef(function(e,t){return w.createElement(Ei,si({},e,{ref:t,sideCar:fa}))});pa.classNames=Ei.classNames;var ma=function(e){return typeof document>`u`?null:(Array.isArray(e)?e[0]:e).ownerDocument.body},ha=new WeakMap,ga=new WeakMap,_a={},va=0,ya=function(e){return e&&(e.host||ya(e.parentNode))},ba=function(e,t){return t.map(function(t){if(e.contains(t))return t;var n=ya(t);return n&&e.contains(n)?n:(console.error(`aria-hidden`,t,`in not contained inside`,e,`. Doing nothing`),null)}).filter(function(e){return!!e})},xa=function(e,t,n,r){var i=ba(t,Array.isArray(e)?e:[e]);_a[n]||(_a[n]=new WeakMap);var a=_a[n],o=[],s=new Set,c=new Set(i),l=function(e){e&&!s.has(e)&&(s.add(e),l(e.parentNode))};i.forEach(l);var u=function(e){e&&!c.has(e)&&Array.prototype.forEach.call(e.children,function(e){if(s.has(e))u(e);else try{var t=e.getAttribute(r),i=t!==null&&t!==`false`,c=(ha.get(e)||0)+1,l=(a.get(e)||0)+1;ha.set(e,c),a.set(e,l),o.push(e),c===1&&i&&ga.set(e,!0),l===1&&e.setAttribute(n,`true`),i||e.setAttribute(r,`true`)}catch(t){console.error(`aria-hidden: cannot operate on `,e,t)}})};return u(t),s.clear(),va++,function(){o.forEach(function(e){var t=ha.get(e)-1,i=a.get(e)-1;ha.set(e,t),a.set(e,i),t||(ga.has(e)||e.removeAttribute(r),ga.delete(e)),i||e.removeAttribute(n)}),va--,va||(ha=new WeakMap,ha=new WeakMap,ga=new WeakMap,_a={})}},Sa=function(e,t,n){n===void 0&&(n=`data-aria-hidden`);var r=Array.from(Array.isArray(e)?e:[e]),i=t||ma(e);return i?(r.push.apply(r,Array.from(i.querySelectorAll(`[aria-live], script`))),xa(r,i,n,`aria-hidden`)):function(){return null}},Ca=Object.defineProperty,wa=(e,t)=>Ca(e,`name`,{value:t,configurable:!0}),Ta=`Dialog`,[Ea,Da]=tn(Ta),[Oa,ka]=Ea(Ta),Aa=wa(e=>{let{__scopeDialog:t,children:n,open:r,defaultOpen:i,onOpenChange:a,modal:o=!0}=e,s=w.useRef(null),c=w.useRef(null),{nodes:l,registry:u}=zr(),[d,f]=Un({prop:r,defaultProp:i!=null&&i,onChange:a,caller:Ta}),[p,m]=w.useState(0),[h,g]=w.useState(0);return(0,U.jsx)(Oa,{scope:t,triggerRef:s,contentRef:c,contentId:sr(),titleId:sr(),descriptionId:sr(),titlePresent:p>0,descriptionPresent:h>0,setTitleCount:m,setDescriptionCount:g,open:d,onOpenChange:f,onOpenToggle:w.useCallback(()=>f(e=>!e),[f]),modal:o,branchNodes:l,branchRegistry:u,children:n})},`Dialog`),ja=`DialogPortal`,[Ma,Na]=Ea(ja,{forceMount:void 0}),Pa=wa(e=>{let{__scopeDialog:t,forceMount:n,children:r,container:i}=e,a=ka(ja,t);return(0,U.jsx)(Ma,{scope:t,forceMount:n,children:w.Children.map(r,e=>(0,U.jsx)(Zn,{present:n||a.open,children:(0,U.jsx)($r,{asChild:!0,container:i,children:e})}))})},`DialogPortal`),Fa=`DialogOverlay`,Ia=w.forwardRef(wa(function(e,t){let n=Na(Fa,e.__scopeDialog),{forceMount:r=n.forceMount,...i}=e,a=ka(Fa,e.__scopeDialog);return a.modal?(0,U.jsx)(Zn,{present:r||a.open,children:(0,U.jsx)(Ra,{...i,ref:t})}):null},`DialogOverlay`)),La=kt(`DialogOverlay.RemoveScroll`),Ra=w.forwardRef(wa(function(e,t){let{__scopeDialog:n,...r}=e,i=ka(Fa,n),a=Et(t,Tr());return(0,U.jsx)(pa,{as:La,allowPinchZoom:!0,shards:w.useMemo(()=>[i.contentRef,...i.branchNodes.map(e=>({current:e}))],[i.contentRef,i.branchNodes]),children:(0,U.jsx)(Xt.div,{"data-state":Ya(i.open),...r,ref:a,style:{pointerEvents:`auto`,...r.style}})})},`DialogOverlayImpl`)),za=`DialogContent`,Ba=w.forwardRef(wa(function(e,t){let n=Na(za,e.__scopeDialog),{forceMount:r=n.forceMount,...i}=e,a=ka(za,e.__scopeDialog);return(0,U.jsx)(Zn,{present:r||a.open,children:a.modal?(0,U.jsx)(Va,{...i,ref:t}):(0,U.jsx)(Ha,{...i,ref:t})})},`DialogContent`)),Va=w.forwardRef(wa(function(e,t){let n=ka(za,e.__scopeDialog),r=w.useRef(null),i=Et(t,n.contentRef,r);return w.useEffect(()=>{let e=r.current;if(e)return Sa(e)},[]),(0,U.jsx)(Ua,{...e,ref:i,trapFocus:n.open,disableOutsidePointerEvents:n.open,onCloseAutoFocus:An(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),(t=n.triggerRef.current)==null||t.focus()}),onPointerDownOutside:An(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=t.button===0&&t.ctrlKey===!0;(t.button===2||n)&&e.preventDefault()}),onFocusOutside:An(e.onFocusOutside,e=>e.preventDefault())})},`DialogContentModal`)),Ha=w.forwardRef(wa(function(e,t){let n=ka(za,e.__scopeDialog),r=w.useRef(!1),i=w.useRef(!1);return(0,U.jsx)(Ua,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var a;if((a=e.onCloseAutoFocus)==null||a.call(e,t),!t.defaultPrevented){var o;r.current||(o=n.triggerRef.current)==null||o.focus(),t.preventDefault()}r.current=!1,i.current=!1},onInteractOutside:t=>{var a,o;(a=e.onInteractOutside)==null||a.call(e,t),t.defaultPrevented||(r.current=!0,t.detail.originalEvent.type===`pointerdown`&&(i.current=!0));let s=t.target;(o=n.triggerRef.current)!=null&&o.contains(s)&&t.preventDefault(),t.detail.originalEvent.type===`focusin`&&i.current&&t.preventDefault()}})},`DialogContentNonModal`)),Ua=w.forwardRef(wa(function(e,t){let{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:i,onCloseAutoFocus:a,"aria-describedby":o,children:s,...c}=e,l=ka(za,n);return ai(),(0,U.jsx)(Rr,{registry:l.branchRegistry,children:(0,U.jsx)(Ir,{asChild:!0,loop:!0,trapped:r,branches:l.branchNodes,onMountAutoFocus:i,onUnmountAutoFocus:a,children:(0,U.jsx)(wr,{role:`dialog`,id:l.contentId,"aria-labelledby":l.titlePresent?l.titleId:void 0,"aria-describedby":l.descriptionPresent?Ja(o,l.descriptionId):o,"data-state":Ya(l.open),...c,ref:t,deferPointerDownOutside:!0,onDismiss:()=>l.onOpenChange(!1),children:s})})})},`DialogContentImpl`)),Wa=w.forwardRef(wa(function(e,t){let{__scopeDialog:n,...r}=e,i=ka(`DialogTitle`,n),{setTitleCount:a}=i;return un(()=>(a(e=>e+1),()=>a(e=>e-1)),[a]),(0,U.jsx)(Xt.h2,{id:i.titleId,...r,ref:t})},`DialogTitle`)),Ga=w.forwardRef(wa(function(e,t){let{__scopeDialog:n,...r}=e,i=ka(`DialogDescription`,n),{setDescriptionCount:a}=i;return un(()=>(a(e=>e+1),()=>a(e=>e-1)),[a]),(0,U.jsx)(Xt.p,{id:i.descriptionId,...r,ref:t})},`DialogDescription`)),Ka=`DialogClose`,qa=w.forwardRef(wa(function(e,t){let{__scopeDialog:n,...r}=e,i=ka(Ka,n);return(0,U.jsx)(Xt.button,{type:`button`,...r,ref:t,onClick:An(e.onClick,()=>i.onOpenChange(!1))})},`DialogClose`));function Ja(...e){let t=new Set;for(let n of e)if(typeof n==`string`)for(let e of String(n).trim().split(/\s+/))e&&t.add(e);return t.size>0?Array.from(t).join(` `):void 0}wa(Ja,`concatAriaDescribedby`);function Ya(e){return e?`open`:`closed`}wa(Ya,`getState`);var Xa=Object.defineProperty,Za=(e,t)=>Xa(e,`name`,{value:t,configurable:!0});function Qa(e){let[t,n]=w.useState(void 0);return un(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});let t=0,r=new ResizeObserver(r=>{if(!Array.isArray(r)||!r.length)return;let i=r[0];window.cancelAnimationFrame(t),t=window.requestAnimationFrame(()=>{let t,r;if(`borderBoxSize`in i){let e=i.borderBoxSize,n=Array.isArray(e)?e[0]:e;t=n.inlineSize,r=n.blockSize}else t=e.offsetWidth,r=e.offsetHeight;n({width:t,height:r})})});return r.observe(e,{box:`border-box`}),()=>{window.cancelAnimationFrame(t),r.unobserve(e)}}n(void 0)},[e]),t}Za(Qa,`useSize`);var $a=Object.defineProperty,eo=(e,t)=>$a(e,`name`,{value:t,configurable:!0}),to=!1;function no(){let[e,t]=w.useState(to);return w.useEffect(()=>{to||(to=!0,t(!0))},[]),e}eo(no,`useIsHydrated`);var ro=w.useSyncExternalStore;function io(){return()=>{}}eo(io,`subscribe`);function ao(){return ro(io,()=>!0,()=>!1)}eo(ao,`useIsHydratedModern`);var oo=typeof ro==`function`?ao:no,so=Object.defineProperty,co=(e,t)=>so(e,`name`,{value:t,configurable:!0}),lo=`rovingFocusGroup.onEntryFocus`,uo={bubbles:!1,cancelable:!0},fo=`RovingFocusGroup`,[po,mo,ho]=hn(fo),[go,_o]=tn(fo,[ho]),vo={Vertical:`vertical`,Horizontal:`horizontal`},yo={LTR:`ltr`,RTL:`rtl`},[bo,xo]=go(fo),So=w.forwardRef(co(function(e,t){return(0,U.jsx)(po.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,U.jsx)(po.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,U.jsx)(Co,{...e,ref:t})})})},`RovingFocusGroup`)),Co=w.forwardRef(co(function(e,t){let{__scopeRovingFocusGroup:n,orientation:r,loop:i=!1,dir:a,currentTabStopId:o,defaultCurrentTabStopId:s,onCurrentTabStopIdChange:c,onEntryFocus:l,preventScrollOnEntryFocus:u=!1,...d}=e,f=w.useRef(null),p=Et(t,f),m=fr(a),[h,g]=Un({prop:o,defaultProp:s==null?null:s,onChange:c,caller:fo}),[_,v]=w.useState(!1),y=gr(l),b=mo(n),x=w.useRef(!1),[S,C]=w.useState(0);return w.useEffect(()=>{let e=f.current;if(e)return e.addEventListener(lo,y),()=>e.removeEventListener(lo,y)},[y]),(0,U.jsx)(bo,{scope:n,orientation:r,dir:m,loop:i,currentTabStopId:h,onItemFocus:w.useCallback(e=>g(e),[g]),onItemShiftTab:w.useCallback(()=>v(!0),[]),onFocusableItemAdd:w.useCallback(()=>C(e=>e+1),[]),onFocusableItemRemove:w.useCallback(()=>C(e=>e-1),[]),children:(0,U.jsx)(Xt.div,{tabIndex:_||S===0?-1:0,"data-orientation":r,...d,ref:p,style:{outline:`none`,...e.style},onMouseDown:An(e.onMouseDown,()=>{x.current=!0}),onFocus:An(e.onFocus,e=>{let t=!x.current;if(e.target===e.currentTarget&&t&&!_){let t=new CustomEvent(lo,uo);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=b().filter(e=>e.focusable);ko([e.find(e=>e.active),e.find(e=>e.id===h),...e].filter(Boolean).map(e=>e.ref.current),u)}}x.current=!1}),onBlur:An(e.onBlur,()=>v(!1))})})},`RovingFocusGroupImpl`)),wo=`RovingFocusGroupItem`,To=w.forwardRef(co(function(e,t){let{__scopeRovingFocusGroup:n,focusable:r=!0,active:i=!1,tabStopId:a,children:o,...s}=e,c=sr(),l=a||c,u=xo(wo,n),d=u.currentTabStopId===l,f=mo(n),{onFocusableItemAdd:p,onFocusableItemRemove:m,currentTabStopId:h}=u,g=oo();return un(()=>{if(g&&r)return p(),()=>m()},[g,r,p,m]),w.useEffect(()=>{if(!g&&r)return p(),()=>m()},[g,r,p,m]),(0,U.jsx)(po.ItemSlot,{scope:n,id:l,focusable:r,active:i,children:(0,U.jsx)(Xt.span,{tabIndex:d?0:-1,"data-orientation":u.orientation,...s,ref:t,onMouseDown:An(e.onMouseDown,e=>{r?u.onItemFocus(l):e.preventDefault()}),onFocus:An(e.onFocus,()=>u.onItemFocus(l)),onKeyDown:An(e.onKeyDown,e=>{if(e.key===`Tab`&&e.shiftKey){u.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=Oo(e,u.orientation,u.dir);if(t!==void 0){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let n=f().filter(e=>e.focusable).map(e=>e.ref.current);if(t===`last`)n.reverse();else if(t===`prev`||t===`next`){t===`prev`&&n.reverse();let r=n.indexOf(e.currentTarget);n=u.loop?Ao(n,r+1):n.slice(r+1)}setTimeout(()=>ko(n))}}),children:typeof o==`function`?o({isCurrentTabStop:d,hasTabStop:h!=null}):o})})},`RovingFocusGroupItem`)),Eo={ArrowLeft:`prev`,ArrowUp:`prev`,ArrowRight:`next`,ArrowDown:`next`,PageUp:`first`,Home:`first`,PageDown:`last`,End:`last`};function Do(e,t){return t===yo.RTL?e===`ArrowLeft`?`ArrowRight`:e===`ArrowRight`?`ArrowLeft`:e:e}co(Do,`getDirectionAwareKey`);function Oo(e,t,n){let r=Do(e.key,n);if(!(t===vo.Vertical&&[`ArrowLeft`,`ArrowRight`].includes(r))&&!(t===vo.Horizontal&&[`ArrowUp`,`ArrowDown`].includes(r)))return Eo[r]}co(Oo,`getFocusIntent`);function ko(e,t=!1){let n=document.activeElement;for(let r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}co(ko,`focusFirst`);function Ao(e,t){return e.map((n,r)=>e[(t+r)%e.length])}co(Ao,`wrapArray`);var jo=Object.defineProperty,Mo=w.forwardRef(((e,t)=>jo(e,`name`,{value:t,configurable:!0}))(function(e,t){return(0,U.jsx)(Xt.label,{...e,ref:t,onMouseDown:t=>{var n;t.target.closest(`button, input, select, textarea`)||((n=e.onMouseDown)==null||n.call(e,t),!t.defaultPrevented&&t.detail>1&&t.preventDefault())}})},`Label`)),No=Object.defineProperty,Po=(e,t)=>No(e,`name`,{value:t,configurable:!0});function Fo(e,[t,n]){return Math.min(n,Math.max(t,e))}Po(Fo,`clamp`);var Io=Object.defineProperty,G=(e,t)=>Io(e,`name`,{value:t,configurable:!0}),Lo={Vertical:`vertical`,Horizontal:`horizontal`},K={LTR:`ltr`,RTL:`rtl`},Ro=[`PageUp`,`PageDown`],zo=[`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`],Bo={"from-left":[`Home`,`PageDown`,`ArrowDown`,`ArrowLeft`],"from-right":[`Home`,`PageDown`,`ArrowDown`,`ArrowRight`],"from-bottom":[`Home`,`PageDown`,`ArrowDown`,`ArrowLeft`],"from-top":[`Home`,`PageDown`,`ArrowUp`,`ArrowLeft`]},Vo=`Slider`,[Ho,Uo,Wo]=hn(Vo),[Go,Ko]=tn(Vo,[Wo]),[qo,Jo]=Go(Vo),Yo=w.forwardRef(G(function(e,t){let{name:n,min:r=0,max:i=100,step:a=1,orientation:o=Lo.Horizontal,disabled:s=!1,minStepsBetweenThumbs:c=0,preserveThumbOrder:l=!1,defaultValue:u=[r],value:d,onValueChange:f=G(()=>{},`onValueChange`),onValueCommit:p=G(()=>{},`onValueCommit`),inverted:m=!1,form:h,...g}=e,_=w.useRef(new Set),v=w.useRef(0),y=w.useRef(!1),[b,x]=w.useState(null),S=o===Lo.Horizontal?Qo:$o,[C,T]=w.useState(null),E=Et(t,T),[D=[],ee]=Un({prop:d,defaultProp:u,onChange:G(e=>{var t;(t=[..._.current][v.current])==null||t.focus({preventScroll:!0,focusVisible:y.current}),y.current=!1,f(e)},`onChange`)}),O=w.useRef(D),k=w.useRef(D);w.useEffect(()=>{let e=h?C==null?void 0:C.ownerDocument.getElementById(h):C==null?void 0:C.closest(`form`);if(e instanceof HTMLFormElement){let t=G(()=>ee(k.current),`reset`);return e.addEventListener(`reset`,t),()=>e.removeEventListener(`reset`,t)}},[C,h,ee]);function te(e){M(e,_s(D,e))}G(te,`handleSlideStart`);function A(e){M(e,v.current)}G(A,`handleSlideMove`);function j(){String(D)!==String(O.current)&&p(D)}G(j,`handleSlideEnd`);function M(e,t,{commit:n}={commit:!1}){let o=Ss(a),s=Fo(Cs(Math.round((e-r)/a)*a+r,o),[r,i]),u=c*a;function d(e){let n=l?Fo(s,[e[t-1]===void 0?r:e[t-1]+u,e[t+1]===void 0?i:e[t+1]-u]):s,a=ms(e,n,t);return bs(a,u)?{nextValues:a,changedIndex:l?t:a.indexOf(n),hasChanged:String(a)!==String(e)}:null}G(d,`getNextValues`);let f=d(D);f!=null&&f.hasChanged&&x(f.nextValues),ee((e=[])=>{let t=d(e);return t?(v.current=t.changedIndex,t.hasChanged&&n&&p(t.nextValues),t.hasChanged?t.nextValues:e):e})}return G(M,`updateValues`),(0,U.jsx)(qo,{scope:e.__scopeSlider,name:n,disabled:s,min:r,max:i,valueIndexToChangeRef:v,thumbs:_.current,values:D,orientation:o,form:h,userRequestedValues:b,children:(0,U.jsx)(Ho.Provider,{scope:e.__scopeSlider,children:(0,U.jsx)(Ho.Slot,{scope:e.__scopeSlider,children:(0,U.jsx)(S,{"aria-disabled":s,"data-disabled":s?``:void 0,...g,ref:E,onPointerDown:An(g.onPointerDown,()=>{s||(O.current=D,y.current=!1)}),min:r,max:i,inverted:m,onSlideStart:s?void 0:te,onSlideMove:s?void 0:A,onSlideEnd:s?void 0:j,onHomeKeyDown:()=>{s||(y.current=!0,M(r,0,{commit:!0}))},onEndKeyDown:()=>{s||(y.current=!0,M(i,D.length-1,{commit:!0}))},onStepKeyDown:({event:e,direction:t})=>{if(!s){y.current=!0;let n=Ro.includes(e.key)||e.shiftKey&&zo.includes(e.key)?10:1,i=v.current,o=D[i];M(ws(o,{min:r,step:a,direction:t,multiplier:n}),i,{commit:!0})}}})})})})},`Slider`)),[Xo,Zo]=Go(Vo,{startEdge:`left`,endEdge:`right`,size:`width`,direction:1}),Qo=w.forwardRef(G(function(e,t){let{min:n,max:r,dir:i,inverted:a,onSlideStart:o,onSlideMove:s,onSlideEnd:c,onStepKeyDown:l,...u}=e,[d,f]=w.useState(null),p=Et(t,f),m=w.useRef(void 0),h=fr(i),g=h===K.LTR,_=g&&!a||!g&&a;function v(e){let t=m.current||d.getBoundingClientRect(),i=xs([0,t.width],_?[n,r]:[r,n]);return m.current=t,i(e-t.left)}return G(v,`getValueFromPointer`),(0,U.jsx)(Xo,{scope:e.__scopeSlider,startEdge:_?`left`:`right`,endEdge:_?`right`:`left`,direction:_?1:-1,size:`width`,children:(0,U.jsx)(es,{dir:h,"data-orientation":`horizontal`,...u,ref:p,style:{...u.style,"--radix-slider-thumb-transform":`translateX(-50%)`},onSlideStart:e=>{let t=v(e.clientX);o==null||o(t)},onSlideMove:e=>{let t=v(e.clientX);s==null||s(t)},onSlideEnd:()=>{m.current=void 0,c==null||c()},onStepKeyDown:e=>{let t=Bo[_?`from-left`:`from-right`].includes(e.key);l==null||l({event:e,direction:t?-1:1})}})})},`SliderHorizontal`)),$o=w.forwardRef(G(function(e,t){let{min:n,max:r,inverted:i,onSlideStart:a,onSlideMove:o,onSlideEnd:s,onStepKeyDown:c,...l}=e,u=w.useRef(null),d=Et(t,u),f=w.useRef(void 0),p=!i;function m(e){let t=f.current||u.current.getBoundingClientRect(),i=xs([0,t.height],p?[r,n]:[n,r]);return f.current=t,i(e-t.top)}return G(m,`getValueFromPointer`),(0,U.jsx)(Xo,{scope:e.__scopeSlider,startEdge:p?`bottom`:`top`,endEdge:p?`top`:`bottom`,size:`height`,direction:p?1:-1,children:(0,U.jsx)(es,{"data-orientation":`vertical`,...l,ref:d,style:{...l.style,"--radix-slider-thumb-transform":`translateY(50%)`},onSlideStart:e=>{let t=m(e.clientY);a==null||a(t)},onSlideMove:e=>{let t=m(e.clientY);o==null||o(t)},onSlideEnd:()=>{f.current=void 0,s==null||s()},onStepKeyDown:e=>{let t=Bo[p?`from-bottom`:`from-top`].includes(e.key);c==null||c({event:e,direction:t?-1:1})}})})},`SliderVertical`)),es=w.forwardRef(G(function(e,t){let{__scopeSlider:n,onSlideStart:r,onSlideMove:i,onSlideEnd:a,onHomeKeyDown:o,onEndKeyDown:s,onStepKeyDown:c,...l}=e,u=Jo(Vo,n);return(0,U.jsx)(Xt.span,{...l,ref:t,onKeyDown:An(e.onKeyDown,e=>{e.key===`Home`?(o(e),e.preventDefault()):e.key===`End`?(s(e),e.preventDefault()):Ro.concat(zo).includes(e.key)&&(c(e),e.preventDefault())}),onPointerDown:An(e.onPointerDown,e=>{let t=e.target;t.setPointerCapture(e.pointerId),e.preventDefault(),u.thumbs.has(t)?t.focus({preventScroll:!0,focusVisible:!1}):r(e)}),onPointerMove:An(e.onPointerMove,e=>{e.target.hasPointerCapture(e.pointerId)&&i(e)}),onPointerUp:An(e.onPointerUp,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&(t.releasePointerCapture(e.pointerId),a(e))})})},`SliderImpl`)),ts=`SliderTrack`,ns=w.forwardRef(G(function(e,t){let{__scopeSlider:n,...r}=e,i=Jo(ts,n);return(0,U.jsx)(Xt.span,{"data-disabled":i.disabled?``:void 0,"data-orientation":i.orientation,...r,ref:t})},`SliderTrack`)),rs=`SliderRange`,is=w.forwardRef(G(function(e,t){let{__scopeSlider:n,...r}=e,i=Jo(rs,n),a=Zo(rs,n),o=Et(t,w.useRef(null)),s=i.values.length,c=i.values.map(e=>hs(e,i.min,i.max)),l=s>1?Math.min(...c):0,u=100-Math.max(...c);return(0,U.jsx)(Xt.span,{"data-orientation":i.orientation,"data-disabled":i.disabled?``:void 0,...r,ref:o,style:{...e.style,[a.startEdge]:l+`%`,[a.endEdge]:u+`%`}})},`SliderRange`)),[as,os]=Go(`SliderThumb`),ss=`SliderThumbProvider`;function cs(e){let{__scopeSlider:t,name:n,children:r,internal_do_not_use_render:i}=e,a=Jo(ss,t),o=Uo(t),[s,c]=w.useState(null),l=w.useMemo(()=>s?o().findIndex(e=>e.ref.current===s):-1,[o,s]),u=Qa(s),d=!s||!!a.form||!!s.closest(`form`),f=a.values[l],p=n==null?a.name?a.name+(a.values.length>1?`[]`:``):void 0:n,m=f===void 0?0:hs(f,a.min,a.max);w.useEffect(()=>{if(s)return a.thumbs.add(s),()=>{a.thumbs.delete(s)}},[s,a.thumbs]);let h={value:f,name:p,form:a.form,isFormControl:d,index:l,thumb:s,onThumbChange:c,percent:m,size:u};return(0,U.jsx)(as,{scope:t,...h,children:Ts(i)?i(h):r})}G(cs,`SliderThumbProvider`);var ls=`SliderThumbTrigger`,us=w.forwardRef(G(function(e,t){let{__scopeSlider:n,...r}=e,i=Jo(ls,n),a=Zo(ls,n),{index:o,value:s,percent:c,size:l,onThumbChange:u}=os(ls,n),d=Et(t,u),f=gs(o,i.values.length),p=l==null?void 0:l[a.size],m=p?vs(p,c,a.direction):0;return(0,U.jsx)(`span`,{style:{transform:`var(--radix-slider-thumb-transform)`,position:`absolute`,[a.startEdge]:`calc(${c}% + ${m}px)`},children:(0,U.jsx)(Ho.ItemSlot,{scope:n,children:(0,U.jsx)(Xt.span,{role:`slider`,"aria-label":e[`aria-label`]||f,"aria-valuemin":i.min,"aria-valuenow":s,"aria-valuemax":i.max,"aria-orientation":i.orientation,"data-orientation":i.orientation,"data-disabled":i.disabled?``:void 0,tabIndex:i.disabled?void 0:0,...r,ref:d,style:s===void 0?{display:`none`}:e.style,onFocus:An(e.onFocus,()=>{i.valueIndexToChangeRef.current=o})})})})},`SliderThumbTrigger`)),ds=w.forwardRef(G(function(e,t){let{__scopeSlider:n,name:r,...i}=e;return(0,U.jsx)(cs,{__scopeSlider:n,name:r,internal_do_not_use_render:({index:e,isFormControl:r})=>(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(us,{...i,ref:t,__scopeSlider:n}),r?(0,U.jsx)(ps,{__scopeSlider:n},e):null]})})},`SliderThumb`)),fs=`SliderBubbleInput`,ps=w.forwardRef(G(function({__scopeSlider:e,onInput:t,...n},r){let{index:i,value:a,name:o,form:s}=os(fs,e),{userRequestedValues:c}=Jo(fs,e),l=w.useRef(null),u=Et(l,r),d=w.useRef(!1),f=w.useRef(a),p=w.useRef(c),m=w.useRef(c);return w.useEffect(()=>{let e=l.current;if(!e)return;let t=window.HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(t,`value`).set,r=f.current,o=r!==a;f.current=a;let s=c!==m.current;if(m.current=c,o&&n){let t=c!==p.current;p.current=c;let o=c==null?void 0:c[i];d.current=!(t&&(s&&o!==r||o===a));let l=new Event(`input`,{bubbles:!0});n.call(e,a),e.dispatchEvent(l),d.current=!1}},[i,a,c]),(0,U.jsx)(Xt.input,{style:{display:`none`},name:o,form:s,...n,ref:u,defaultValue:a,onInput:An(t,e=>{d.current&&e.stopPropagation()})})},`SliderBubbleInput`));function ms(e=[],t,n){let r=[...e];return r[n]=t,r.sort((e,t)=>e-t)}G(ms,`getNextSortedValues`);function hs(e,t,n){return Fo(100/(n-t)*(e-t),[0,100])}G(hs,`convertValueToPercentage`);function gs(e,t){if(t>2)return`Value ${e+1} of ${t}`;if(t===2)return[`Minimum`,`Maximum`][e]}G(gs,`getLabel`);function _s(e,t){if(e.length===1)return 0;let n=e.map(e=>Math.abs(e-t)),r=Math.min(...n);return n.indexOf(r)}G(_s,`getClosestValueIndex`);function vs(e,t,n){let r=e/2;return(r-xs([0,50],[0,r])(t)*n)*n}G(vs,`getThumbInBoundsOffset`);function ys(e){return e.slice(0,-1).map((t,n)=>e[n+1]-t)}G(ys,`getStepsBetweenValues`);function bs(e,t){if(t>0){let n=ys(e);return Math.min(...n)>=t}return!0}G(bs,`hasMinStepsBetweenValues`);function xs(e,t){return n=>{if(e[0]===e[1]||t[0]===t[1])return t[0];let r=(t[1]-t[0])/(e[1]-e[0]);return t[0]+r*(n-e[0])}}G(xs,`linearScale`);function Ss(e){if(!Number.isFinite(e))return 0;let t=e.toString();if(t.includes(`e`)){let[e,n]=t.split(`e`),r=e.split(`.`)[1]||``,i=Number(n);return Math.max(0,r.length-i)}let n=t.split(`.`)[1];return n?n.length:0}G(Ss,`getDecimalCount`);function Cs(e,t){let n=10**t;return Math.round(e*n)/n}G(Cs,`roundValue`);function ws(e,{min:t,step:n,direction:r,multiplier:i}){let a=Ss(n),o=(e-t)/n,s=Math.round(o),c=Cs(s*n+t,a)===Cs(e,a),l;return l=c?s+i*r:r>0?Math.ceil(o):Math.floor(o),Cs(l*n+t,a)}G(ws,`getNextStepValue`);function Ts(e){return typeof e==`function`}G(Ts,`isFunction`);var Es=Object.defineProperty,Ds=(e,t)=>Es(e,`name`,{value:t,configurable:!0}),Os=`Switch`,[ks,As]=tn(Os),[js,Ms]=ks(Os);function Ns(e){let{__scopeSwitch:t,checked:n,children:r,defaultChecked:i,disabled:a,form:o,name:s,onCheckedChange:c,required:l,value:u=`on`,internal_do_not_use_render:d}=e,[f,p]=Un({prop:n,defaultProp:i!=null&&i,onChange:c,caller:Os}),[m,h]=w.useState(null),[g,_]=w.useState(null),[v,y]=w.useState(null),b={checked:f,setChecked:p,disabled:a,control:m,setControl:h,name:s,form:o,value:u,userClick:v,onUserClick:y,required:l,defaultChecked:i,isFormControl:!m||!!o||!!m.closest(`form`),bubbleInput:g,setBubbleInput:_};return(0,U.jsx)(js,{scope:t,...b,children:Vs(d)?d(b):r})}Ds(Ns,`SwitchProvider`);var Ps=`SwitchTrigger`,Fs=w.forwardRef(Ds(function({__scopeSwitch:e,onClick:t,...n},r){let{control:i,form:a,value:o,disabled:s,checked:c,required:l,setControl:u,setChecked:d,onUserClick:f,isFormControl:p,bubbleInput:m}=Ms(Ps,e),h=Et(r,u),g=w.useRef(c);return w.useEffect(()=>{let e=a?i==null?void 0:i.ownerDocument.getElementById(a):i==null?void 0:i.form;if(e instanceof HTMLFormElement){let t=Ds(()=>d(g.current),`reset`);return e.addEventListener(`reset`,t),()=>e.removeEventListener(`reset`,t)}},[i,a,d]),(0,U.jsx)(Xt.button,{type:`button`,role:`switch`,"aria-checked":c,"aria-required":l,"data-state":Hs(c),"data-disabled":s?``:void 0,disabled:s,value:o,...n,ref:h,onClick:An(t,e=>{let t=e.isPropagationStopped();f({requestedChecked:!c,hasConsumerStoppedPropagation:t}),d(e=>!e),m&&p&&(t||e.stopPropagation())})})},`SwitchTrigger`)),Is=w.forwardRef(Ds(function(e,t){let{__scopeSwitch:n,name:r,checked:i,defaultChecked:a,required:o,disabled:s,value:c,onCheckedChange:l,form:u,...d}=e;return(0,U.jsx)(Ns,{__scopeSwitch:n,checked:i,defaultChecked:a,disabled:s,required:o,onCheckedChange:l,name:r,form:u,value:c,internal_do_not_use_render:({isFormControl:e})=>(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(Fs,{...d,ref:t,__scopeSwitch:n}),e&&(0,U.jsx)(Bs,{__scopeSwitch:n})]})})},`Switch`)),Ls=`SwitchThumb`,Rs=w.forwardRef(Ds(function(e,t){let{__scopeSwitch:n,...r}=e,i=Ms(Ls,n);return(0,U.jsx)(Xt.span,{"data-state":Hs(i.checked),"data-disabled":i.disabled?``:void 0,...r,ref:t})},`SwitchThumb`)),zs=`SwitchBubbleInput`,Bs=w.forwardRef(Ds(function({__scopeSwitch:e,onClick:t,...n},r){let{control:i,userClick:a,checked:o,defaultChecked:s,required:c,disabled:l,name:u,value:d,form:f,bubbleInput:p,setBubbleInput:m}=Ms(zs,e),h=Et(r,m),g=Qa(i),_=w.useRef(!1),v=w.useRef(o),y=w.useRef(a),b=w.useRef(null);w.useEffect(()=>{let e=p;if(!e)return;let t=window.HTMLInputElement.prototype,n=Object.getOwnPropertyDescriptor(t,`checked`).set;if(!n)return;let r=v.current!==o;v.current=o;let i=a!==null&&a!==y.current;if(y.current=a,i)b.current=r?null:a,r&&n.call(e,o),e.dispatchEvent(new Event(`click`,{bubbles:!a.hasConsumerStoppedPropagation}));else if(r){let t=b.current;b.current=null;let r=(t==null?void 0:t.requestedChecked)===o;_.current=!0,n.call(e,o),e.dispatchEvent(new Event(`click`,{bubbles:!(r&&t.hasConsumerStoppedPropagation)})),_.current=!1}},[p,o,a]);let x=w.useRef(o);return(0,U.jsx)(Xt.input,{type:`checkbox`,"aria-hidden":!0,defaultChecked:s==null?x.current:s,required:c,disabled:l,name:u,value:d,form:f,...n,tabIndex:-1,ref:h,onClick:An(t,e=>{_.current&&e.stopPropagation()}),style:{...n.style,...g,position:`absolute`,pointerEvents:`none`,opacity:0,margin:0,transform:`translateX(-100%)`}})},`SwitchBubbleInput`));function Vs(e){return typeof e==`function`}Ds(Vs,`isFunction`);function Hs(e){return e?`checked`:`unchecked`}Ds(Hs,`getState`);var Us=Object.defineProperty,Ws=(e,t)=>Us(e,`name`,{value:t,configurable:!0}),Gs={Automatic:`automatic`,Manual:`manual`},Ks=`Tabs`,[qs,Js]=tn(Ks,[_o]),Ys=_o(),[Xs,Zs]=qs(Ks),Qs=w.forwardRef(Ws(function(e,t){let{__scopeTabs:n,value:r,onValueChange:i,defaultValue:a,orientation:o=`horizontal`,dir:s,activationMode:c=Gs.Automatic,...l}=e,u=fr(s),[d,f]=Un({prop:r,onChange:i,defaultProp:a==null?``:a,caller:Ks});return(0,U.jsx)(Xs,{scope:n,baseId:sr(),value:d,onValueChange:f,orientation:o,dir:u,activationMode:c,children:(0,U.jsx)(Xt.div,{dir:u,"data-orientation":o,...l,ref:t})})},`Tabs`)),$s=`TabsList`,ec=w.forwardRef(Ws(function(e,t){let{__scopeTabs:n,loop:r=!0,...i}=e,a=Zs($s,n),o=Ys(n);return(0,U.jsx)(So,{asChild:!0,...o,orientation:a.orientation,dir:a.dir,loop:r,children:(0,U.jsx)(Xt.div,{role:`tablist`,"aria-orientation":a.orientation,...i,ref:t})})},`TabsList`)),tc=`TabsTrigger`,nc=w.forwardRef(Ws(function(e,t){let{__scopeTabs:n,value:r,disabled:i=!1,...a}=e,o=Zs(tc,n),s=Ys(n),c=ac(o.baseId,r),l=oc(o.baseId,r),u=r===o.value;return(0,U.jsx)(To,{asChild:!0,...s,focusable:!i,active:u,children:(0,U.jsx)(Xt.button,{type:`button`,role:`tab`,"aria-selected":u,"aria-controls":l,"data-state":u?`active`:`inactive`,"data-disabled":i?``:void 0,disabled:i,id:c,...a,ref:t,onMouseDown:An(e.onMouseDown,e=>{!i&&e.button===0&&e.ctrlKey===!1?(e.currentTarget.focus(),o.onValueChange(r)):e.preventDefault()}),onKeyDown:An(e.onKeyDown,e=>{i||e.target!==e.currentTarget||[` `,`Enter`].includes(e.key)&&o.onValueChange(r)}),onFocus:An(e.onFocus,()=>{let e=o.activationMode!==Gs.Manual;!u&&!i&&e&&o.onValueChange(r)})})})},`TabsTrigger`)),rc=`TabsContent`,ic=w.forwardRef(Ws(function(e,t){let{__scopeTabs:n,value:r,forceMount:i,children:a,...o}=e,s=Zs(rc,n),c=ac(s.baseId,r),l=oc(s.baseId,r),u=r===s.value,d=w.useRef(u);return w.useEffect(()=>{let e=requestAnimationFrame(()=>d.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,U.jsx)(Zn,{present:i||u,children:({present:n})=>(0,U.jsx)(Xt.div,{"data-state":u?`active`:`inactive`,"data-orientation":s.orientation,role:`tabpanel`,"aria-labelledby":c,hidden:!n,id:l,tabIndex:0,...o,ref:t,style:{...e.style,animationDuration:d.current?`0s`:void 0},children:n&&a})})},`TabsContent`));function ac(e,t){return`${e}-trigger-${t}`}Ws(ac,`makeTriggerId`);function oc(e,t){return`${e}-content-${t}`}Ws(oc,`makeContentId`);var sc=Object.defineProperty,cc=(e,t)=>sc(e,`name`,{value:t,configurable:!0}),lc=`Toggle`,uc=w.forwardRef(cc(function(e,t){let{pressed:n,defaultPressed:r,onPressedChange:i,...a}=e,[o,s]=Un({prop:n,onChange:i,defaultProp:r!=null&&r,caller:lc});return(0,U.jsx)(Xt.button,{type:`button`,"aria-pressed":o,"data-state":o?`on`:`off`,"data-disabled":e.disabled?``:void 0,...a,ref:t,onClick:An(e.onClick,()=>{e.disabled||s(!o)})})},`Toggle`)),dc=Object.defineProperty,fc=(e,t)=>dc(e,`name`,{value:t,configurable:!0}),pc=`ToggleGroup`,mc={Single:`single`,Multiple:`multiple`},[hc,gc]=tn(pc,[_o]),_c=_o(),vc=w.forwardRef(fc(function(e,t){let{type:n,...r}=e;if(n===mc.Single)return(0,U.jsx)(xc,{role:`radiogroup`,...r,ref:t});if(n===mc.Multiple)return(0,U.jsx)(Sc,{role:`toolbar`,...r,ref:t});throw Error(`Missing prop \`type\` expected on \`${pc}\``)},`ToggleGroup`)),[yc,bc]=hc(pc),xc=w.forwardRef(fc(function(e,t){let{value:n,defaultValue:r,onValueChange:i=fc(()=>{},`onValueChange`),...a}=e,[o,s]=Un({prop:n,defaultProp:r==null?``:r,onChange:i,caller:pc});return(0,U.jsx)(yc,{scope:e.__scopeToggleGroup,type:mc.Single,value:w.useMemo(()=>o?[o]:[],[o]),onItemActivate:s,onItemDeactivate:w.useCallback(()=>s(``),[s]),children:(0,U.jsx)(Tc,{...a,ref:t})})},`ToggleGroupImplSingle`)),Sc=w.forwardRef(fc(function(e,t){let{value:n,defaultValue:r,onValueChange:i=fc(()=>{},`onValueChange`),...a}=e,[o,s]=Un({prop:n,defaultProp:r==null?[]:r,onChange:i,caller:pc}),c=w.useCallback(e=>s((t=[])=>[...t,e]),[s]),l=w.useCallback(e=>s((t=[])=>t.filter(t=>t!==e)),[s]);return(0,U.jsx)(yc,{scope:e.__scopeToggleGroup,type:mc.Multiple,value:o,onItemActivate:c,onItemDeactivate:l,children:(0,U.jsx)(Tc,{...a,ref:t})})},`ToggleGroupImplMultiple`)),[Cc,wc]=hc(pc),Tc=w.forwardRef(fc(function(e,t){let{__scopeToggleGroup:n,disabled:r=!1,rovingFocus:i=!0,orientation:a,dir:o,loop:s=!0,...c}=e,l=_c(n),u=fr(o),d={dir:u,...c};return(0,U.jsx)(Cc,{scope:n,rovingFocus:i,disabled:r,children:i?(0,U.jsx)(So,{asChild:!0,...l,orientation:a,dir:u,loop:s,children:(0,U.jsx)(Xt.div,{...d,ref:t})}):(0,U.jsx)(Xt.div,{...d,ref:t})})},`ToggleGroupImpl`)),Ec=`ToggleGroupItem`,Dc=w.forwardRef(fc(function(e,t){let n=bc(Ec,e.__scopeToggleGroup),r=wc(Ec,e.__scopeToggleGroup),i=_c(e.__scopeToggleGroup),a=n.value.includes(e.value),o=r.disabled||e.disabled,s={...e,pressed:a,disabled:o},c=w.useRef(null);return r.rovingFocus?(0,U.jsx)(To,{asChild:!0,...i,focusable:!o,active:a,ref:c,children:(0,U.jsx)(Oc,{...s,ref:t})}):(0,U.jsx)(Oc,{...s,ref:t})},`ToggleGroupItem`)),Oc=w.forwardRef(fc(function(e,t){let{__scopeToggleGroup:n,value:r,...i}=e,a=bc(Ec,n),o={role:`radio`,"aria-checked":e.pressed,"aria-pressed":void 0},s=a.type===mc.Single?o:void 0;return(0,U.jsx)(uc,{...s,...i,ref:t,onPressedChange:e=>{e?a.onItemActivate(r):a.onItemDeactivate(r)}})},`ToggleGroupItemImpl`)),kc=Oe(`inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4`,{variants:{variant:{default:`bg-primary text-primary-foreground hover:bg-primary/90`,destructive:`bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40`,outline:`border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50`,secondary:`bg-secondary text-secondary-foreground hover:bg-secondary/80`,ghost:`hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50`,link:`text-primary underline-offset-4 hover:underline`},size:{default:`h-11 px-4 py-2 has-[>svg]:px-3`,xs:`h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3`,sm:`h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5`,lg:`h-10 rounded-md px-6 has-[>svg]:px-4`,icon:`size-11 [&_svg]:size-5`,play:`size-[56px] rounded-full [&_svg]:size-6`,"icon-xs":`size-6 rounded-md [&_svg:not([class*='size-'])]:size-3`,"icon-sm":`size-8`,"icon-lg":`size-10`}},defaultVariants:{variant:`default`,size:`default`}});function q({className:e,variant:t=`default`,size:n=`default`,asChild:r=!1,...i}){let a=r?At:`button`;return(0,U.jsx)(a,{"data-slot":`button`,"data-variant":t,"data-size":n,className:H(kc({variant:t,size:n,className:e})),...i})}function Ac({className:e,orientation:t=`horizontal`,...n}){return(0,U.jsx)(Qs,{"data-slot":`tabs`,"data-orientation":t,orientation:t,className:H(`group/tabs flex gap-2 data-[orientation=horizontal]:flex-col`,e),...n})}var jc=Oe(`group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none`,{variants:{variant:{default:`bg-muted`,line:`gap-1 bg-transparent`}},defaultVariants:{variant:`default`}});function Mc({className:e,variant:t=`default`,...n}){return(0,U.jsx)(ec,{"data-slot":`tabs-list`,"data-variant":t,className:H(jc({variant:t}),e),...n})}function Nc({className:e,...t}){return(0,U.jsx)(nc,{"data-slot":`tabs-trigger`,className:H(`relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,`group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent`,`data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground`,`after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100`,e),...t})}function Pc({className:e,...t}){return(0,U.jsx)(ic,{"data-slot":`tabs-content`,className:H(`flex-1 outline-none`,e),...t})}function Fc({...e}){return(0,U.jsx)(Aa,{"data-slot":`dialog`,...e})}function Ic({...e}){return(0,U.jsx)(Pa,{"data-slot":`dialog-portal`,...e})}function Lc({...e}){return(0,U.jsx)(qa,{"data-slot":`dialog-close`,...e})}function Rc({className:e,...t}){return(0,U.jsx)(Ia,{"data-slot":`dialog-overlay`,className:H(`fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0`,e),...t})}function zc({className:e,children:t,showCloseButton:n=!0,...r}){return(0,U.jsxs)(Ic,{"data-slot":`dialog-portal`,children:[(0,U.jsx)(Rc,{}),(0,U.jsxs)(Ba,{"data-slot":`dialog-content`,className:H(`fixed bottom-6 left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-xl bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg`,e),...r,children:[t,n&&(0,U.jsxs)(qa,{"data-slot":`dialog-close`,className:`absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,children:[(0,U.jsx)(Ce,{}),(0,U.jsx)(`span`,{className:`sr-only`,children:`Close`})]})]})]})}function Bc({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`dialog-header`,className:H(`flex flex-col gap-2 text-center sm:text-left`,e),...t})}function Vc({className:e,...t}){return(0,U.jsx)(Wa,{"data-slot":`dialog-title`,className:H(`text-lg leading-none font-semibold`,e),...t})}function Hc({className:e,...t}){return(0,U.jsx)(Ga,{"data-slot":`dialog-description`,className:H(`text-sm text-muted-foreground`,e),...t})}function Uc({className:e,defaultValue:t,value:n,min:r=0,max:i=100,...a}){let o=w.useMemo(()=>Array.isArray(n)?n:Array.isArray(t)?t:[r,i],[n,t,r,i]);return(0,U.jsxs)(Yo,{"data-slot":`slider`,defaultValue:t,value:n,min:r,max:i,className:H(`relative flex min-h-12 w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col`,e),...a,children:[(0,U.jsx)(ns,{"data-slot":`slider-track`,className:H(`relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5`),children:(0,U.jsx)(is,{"data-slot":`slider-range`,className:H(`absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full`)})}),Array.from({length:o.length},(e,t)=>(0,U.jsx)(ds,{"data-slot":`slider-thumb`,"aria-label":a[`aria-label`],className:`block size-4 shrink-0 rounded-full border border-primary bg-primary shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50`},t))]})}var Wc=Oe(`inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,{variants:{variant:{default:`bg-transparent`,outline:`border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground`},size:{default:`h-12 min-w-12 px-2`,sm:`h-8 min-w-8 px-1.5`,lg:`h-10 min-w-10 px-2.5`}},defaultVariants:{variant:`default`,size:`default`}}),Gc=w.createContext({size:`default`,variant:`default`,spacing:0});function Kc({className:e,variant:t,size:n,spacing:r=0,children:i,...a}){return(0,U.jsx)(vc,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,style:{"--gap":r},className:H(`group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs`,e),...a,children:(0,U.jsx)(Gc.Provider,{value:{variant:t,size:n,spacing:r},children:i})})}function qc({className:e,children:t,variant:n,size:r,...i}){let a=w.useContext(Gc);return(0,U.jsx)(Dc,{"data-slot":`toggle-group-item`,"data-variant":a.variant||n,"data-size":a.size||r,"data-spacing":a.spacing,className:H(Wc({variant:a.variant||n,size:a.size||r}),`w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10`,`data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l`,e),...i,children:t})}function Jc({className:e,size:t=`default`,...n}){return(0,U.jsx)(Is,{"data-slot":`switch`,"data-size":t,className:H(`relative before:absolute before:-inset-y-4 before:-inset-x-2 peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80`,e),...n,children:(0,U.jsx)(Rs,{"data-slot":`switch-thumb`,className:H(`pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground`)})})}function Yc({className:e,...t}){return(0,U.jsx)(Mo,{"data-slot":`label`,className:H(`flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,e),...t})}function Xc({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`field-group`,className:H(`group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4`,e),...t})}var Zc=Oe(`group/field flex w-full gap-3 data-[invalid=true]:text-destructive`,{variants:{orientation:{vertical:[`flex-col [&>*]:w-full [&>.sr-only]:w-auto`],horizontal:[`flex-row items-center`,`[&>[data-slot=field-label]]:flex-auto`,`has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`],responsive:[`flex-col @md/field-group:flex-row @md/field-group:items-center [&>*]:w-full @md/field-group:[&>*]:w-auto [&>.sr-only]:w-auto`,`@md/field-group:[&>[data-slot=field-label]]:flex-auto`,`@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px`]}},defaultVariants:{orientation:`vertical`}});function Qc({className:e,orientation:t=`vertical`,...n}){return(0,U.jsx)(`div`,{role:`group`,"data-slot":`field`,"data-orientation":t,className:H(Zc({orientation:t}),e),...n})}function $c({className:e,...t}){return(0,U.jsx)(Yc,{"data-slot":`field-label`,className:H(`group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50`,`has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4`,`has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:has-data-[state=checked]:bg-primary/10`,e),...t})}function el({className:e,...t}){return(0,U.jsx)(`p`,{"data-slot":`field-description`,className:H(`text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance`,`last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5`,`[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,e),...t})}function tl({className:e,type:t,...n}){return(0,U.jsx)(`input`,{type:t,"data-slot":`input`,className:H(`h-12 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30`,`focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50`,`aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40`,e),...n})}function nl({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`input-group`,role:`group`,className:H(`group/input-group relative flex w-full items-center rounded-md border border-input shadow-xs transition-[color,box-shadow] outline-none dark:bg-input/30`,`h-12 min-w-0 has-[>textarea]:h-auto`,`has-[>[data-align=inline-start]]:[&>input]:pl-2`,`has-[>[data-align=inline-end]]:[&>input]:pr-2`,`has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3`,`has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3`,`has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50`,`has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40`,e),...t})}var rl=Oe(`flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4`,{variants:{align:{"inline-start":`order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]`,"inline-end":`order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]`,"block-start":`order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5 [.border-b]:pb-3`,"block-end":`order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5 [.border-t]:pt-3`}},defaultVariants:{align:`inline-start`}});function il({className:e,align:t=`inline-start`,...n}){return(0,U.jsx)(`div`,{role:`group`,"data-slot":`input-group-addon`,"data-align":t,className:H(rl({align:t}),e),onClick:e=>{var t;e.target.closest(`button`)||(t=e.currentTarget.parentElement)==null||(t=t.querySelector(`input`))==null||t.focus()},...n})}function al({className:e,...t}){return(0,U.jsx)(tl,{"data-slot":`input-group-control`,className:H(`flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent`,e),...t})}function ol({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`empty`,className:H(`flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12`,e),...t})}function sl({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`empty-header`,className:H(`flex max-w-sm flex-col items-center gap-2 text-center`,e),...t})}function cl({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`empty-title`,className:H(`text-lg font-medium tracking-tight`,e),...t})}function ll({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`empty-description`,className:H(`text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary`,e),...t})}function ul({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`empty-content`,className:H(`flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance`,e),...t})}var dl=Oe(`relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current`,{variants:{variant:{default:`bg-card text-card-foreground`,destructive:`bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current`}},defaultVariants:{variant:`default`}});function fl({className:e,variant:t,...n}){return(0,U.jsx)(`div`,{"data-slot":`alert`,role:`alert`,className:H(dl({variant:t}),e),...n})}function pl({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`alert-title`,className:H(`col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight`,e),...t})}function ml({className:e,...t}){return(0,U.jsx)(`div`,{"data-slot":`alert-description`,className:H(`col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed`,e),...t})}var hl=Oe(`inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3`,{variants:{variant:{default:`bg-primary text-primary-foreground [a&]:hover:bg-primary/90`,secondary:`bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90`,destructive:`bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90`,outline:`border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground`,ghost:`[a&]:hover:bg-accent [a&]:hover:text-accent-foreground`,link:`text-primary underline-offset-4 [a&]:hover:underline`}},defaultVariants:{variant:`default`}});function gl({className:e,variant:t=`default`,asChild:n=!1,...r}){let i=n?At:`span`;return(0,U.jsx)(i,{"data-slot":`badge`,"data-variant":t,className:H(hl({variant:t}),e),...r})}function _l(e){if(!e||typeof document>`u`)return;let t=document.head||document.getElementsByTagName(`head`)[0],n=document.createElement(`style`);n.type=`text/css`,t.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}var vl=e=>{switch(e){case`success`:return xl;case`info`:return Cl;case`warning`:return Sl;case`error`:return wl;default:return null}},yl=Array(12).fill(0),bl=({visible:e,className:t})=>w.createElement(`div`,{className:[`sonner-loading-wrapper`,t].filter(Boolean).join(` `),"data-visible":e},w.createElement(`div`,{className:`sonner-spinner`},yl.map((e,t)=>w.createElement(`div`,{className:`sonner-loading-bar`,key:`spinner-bar-${t}`})))),xl=w.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`,"aria-hidden":`true`},w.createElement(`path`,{fillRule:`evenodd`,d:`M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,clipRule:`evenodd`})),Sl=w.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 24 24`,fill:`currentColor`,height:`20`,width:`20`,"aria-hidden":`true`},w.createElement(`path`,{fillRule:`evenodd`,d:`M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,clipRule:`evenodd`})),Cl=w.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`,"aria-hidden":`true`},w.createElement(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,clipRule:`evenodd`})),wl=w.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,viewBox:`0 0 20 20`,fill:`currentColor`,height:`20`,width:`20`,"aria-hidden":`true`},w.createElement(`path`,{fillRule:`evenodd`,d:`M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,clipRule:`evenodd`})),Tl=w.createElement(`svg`,{xmlns:`http://www.w3.org/2000/svg`,width:`12`,height:`12`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`1.5`,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":`true`},w.createElement(`line`,{x1:`18`,y1:`6`,x2:`6`,y2:`18`}),w.createElement(`line`,{x1:`6`,y1:`6`,x2:`18`,y2:`18`})),El=()=>{let[e,t]=w.useState(document.hidden);return w.useEffect(()=>{let e=()=>{t(document.hidden)};return document.addEventListener(`visibilitychange`,e),()=>document.removeEventListener(`visibilitychange`,e)},[]),e},Dl=1,Ol=100,kl=e=>{var t;return typeof(e==null?void 0:e.id)==`number`||(e==null||(t=e.id)==null?void 0:t.length)>0?e.id:Dl++},Al=new class{constructor(){this.subscribe=e=>(this.subscribers.push(e),this.getActiveToasts().forEach(t=>e(t)),()=>{let t=this.subscribers.indexOf(e);this.subscribers.splice(t,1)}),this.publish=e=>{this.subscribers.forEach(t=>t(e))},this.addToast=e=>{this.publish(e),this.toasts=[...this.toasts,e],this.trimHistory()},this.trimHistory=()=>{let e=this.toasts.length-Ol;e<=0||(this.toasts=this.toasts.filter(t=>e>0&&this.dismissedToasts.has(t.id)?(this.dismissedToasts.delete(t.id),e--,!1):!0))},this.create=e=>{let{message:t,...n}=e,r=kl(e),i=this.pendingDismissals.get(r);i!==void 0&&(cancelAnimationFrame(i),this.pendingDismissals.delete(r),this.dismissedToasts.delete(r));let a=this.dismissedToasts.has(r),o=e.dismissible===void 0||e.dismissible;return a&&(this.dismissedToasts.delete(r),this.toasts=this.toasts.filter(e=>e.id!==r)),!a&&this.toasts.find(e=>e.id===r)?this.toasts=this.toasts.map(n=>n.id===r?(this.publish({...n,...e,id:r,title:t}),{...n,...e,id:r,dismissible:o,title:t}):n):this.addToast({title:t,...n,dismissible:o,id:r}),r},this.dismiss=e=>{if(e==null)return this.getActiveToasts().forEach(e=>{this.dismissedToasts.add(e.id),this.subscribers.forEach(t=>t({id:e.id,dismiss:!0}))}),e;this.dismissedToasts.add(e);let t=this.pendingDismissals.get(e);return t!==void 0&&cancelAnimationFrame(t),this.pendingDismissals.set(e,requestAnimationFrame(()=>{this.pendingDismissals.delete(e),this.subscribers.forEach(t=>t({id:e,dismiss:!0}))})),e},this.message=(e,t)=>this.create({...t,message:e,type:void 0}),this.error=(e,t)=>this.create({...t,message:e,type:`error`}),this.success=(e,t)=>this.create({...t,type:`success`,message:e}),this.info=(e,t)=>this.create({...t,type:`info`,message:e}),this.warning=(e,t)=>this.create({...t,type:`warning`,message:e}),this.loading=(e,t)=>this.create({...t,type:`loading`,message:e}),this.promise=(e,t)=>{if(!t)return;let n;t.loading!==void 0&&(n=this.create({...t,promise:e,type:`loading`,message:t.loading,description:typeof t.description==`function`?void 0:t.description}));let r=Promise.resolve(e instanceof Function?e():e),i=n!==void 0,a,o=r.then(async e=>{if(a=[`resolve`,e],w.isValidElement(e))i=!1,this.create({id:n,type:`default`,message:e});else if(Ml(e)&&!e.ok){i=!1;let r=typeof t.error==`function`?await t.error(`HTTP error! status: ${e.status}`):t.error,a=typeof t.description==`function`?await t.description(`HTTP error! status: ${e.status}`):t.description,o=typeof r==`object`&&!w.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}else if(e instanceof Error){i=!1;let r=typeof t.error==`function`?await t.error(e):t.error,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!w.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}else if(t.success!==void 0){i=!1;let r=typeof t.success==`function`?await t.success(e):t.success,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!w.isValidElement(r)?r:{message:r};this.create({id:n,type:`success`,description:a,...o})}}).catch(async e=>{if(a=[`reject`,e],t.error!==void 0){i=!1;let r=typeof t.error==`function`?await t.error(e):t.error,a=typeof t.description==`function`?await t.description(e):t.description,o=typeof r==`object`&&!w.isValidElement(r)?r:{message:r};this.create({id:n,type:`error`,description:a,...o})}}).finally(()=>{i&&(this.dismiss(n),n=void 0),t.finally==null||t.finally.call(t)}),s=()=>new Promise((e,t)=>o.then(()=>a[0]===`reject`?t(a[1]):e(a[1])).catch(t));return typeof n!=`string`&&typeof n!=`number`?{unwrap:s}:Object.assign(n,{unwrap:s})},this.custom=(e,t)=>{let n=kl(t);return this.create({...t,jsx:e(n),id:n,type:void 0}),n},this.getActiveToasts=()=>this.toasts.filter(e=>!this.dismissedToasts.has(e.id)),this.subscribers=[],this.toasts=[],this.dismissedToasts=new Set,this.pendingDismissals=new Map}},jl=(e,t)=>Al.message(e,t),Ml=e=>e&&typeof e==`object`&&`ok`in e&&typeof e.ok==`boolean`&&`status`in e&&typeof e.status==`number`,Nl=Object.assign(jl,{success:Al.success,info:Al.info,warning:Al.warning,error:Al.error,custom:Al.custom,message:Al.message,promise:Al.promise,dismiss:Al.dismiss,loading:Al.loading},{getHistory:()=>Al.toasts,getToasts:()=>Al.getActiveToasts()});_l(`[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`);function Pl(e){return e.label!==void 0}var Fl=3,Il=`24px`,Ll=`16px`,Rl=4e3,zl=356,Bl=14,Vl=45,Hl=200;function Ul(...e){return e.filter(Boolean).join(` `)}function Wl(e){let[t,n]=e.split(`-`),r=[];return t&&r.push(t),n&&r.push(n),r}var Gl=e=>{var t,n,r,i,a,o,s,c,l;let{invert:u,toast:d,unstyled:f,interacting:p,setHeights:m,visibleToasts:h,heights:g,index:_,toasts:v,expanded:y,removeToast:b,defaultRichColors:x,closeButton:S,style:C,cancelButtonStyle:T,actionButtonStyle:E,className:D=``,descriptionClassName:ee=``,duration:O,position:k,gap:te,expandByDefault:A,classNames:j,icons:M,closeButtonAriaLabel:N=`Close toast`}=e,[P,F]=w.useState(null),[I,ne]=w.useState(null),[re,L]=w.useState(!1),[R,ie]=w.useState(!1),[ae,oe]=w.useState(!1),[se,ce]=w.useState(!1),[le,ue]=w.useState(!1),[de,z]=w.useState(0),[B,fe]=w.useState(0),pe=w.useRef(d.duration||O||Rl),me=w.useRef(null),he=w.useRef(null),ge=_===0,_e=_+1<=h,ve=d.type,ye=ve==null?`default`:ve,be=d.dismissible!==!1,xe=d.className||``,Se=d.descriptionClassName||``,Ce=w.useMemo(()=>g.findIndex(e=>e.toastId===d.id)||0,[g,d.id]),V=w.useMemo(()=>{var e;return(e=d.closeButton)==null?S:e},[d.closeButton,S]),we=w.useMemo(()=>d.duration||O||Rl,[d.duration,O]),Te=w.useRef(0),Ee=w.useRef(0),De=w.useRef(0),Oe=w.useRef(null),[ke,Ae]=k.split(`-`),je=w.useMemo(()=>g.reduce((e,t,n)=>n>=Ce?e:e+t.height,0),[g,Ce]),Me=El(),Ne=w.useMemo(()=>{var t;return(t=e.swipeDirections)==null?Wl(k):t},[e.swipeDirections,k]),Pe=d.invert||u,Fe=ve===`loading`;Ee.current=w.useMemo(()=>Ce*te+je,[Ce,je]),w.useEffect(()=>{pe.current=we},[we]),w.useEffect(()=>{L(!0)},[]),w.useEffect(()=>{let e=he.current;if(e){let t=e.getBoundingClientRect().height;return fe(t),m(e=>[{toastId:d.id,height:t,position:d.position},...e]),()=>m(e=>e.filter(e=>e.toastId!==d.id))}},[m,d.id]),w.useLayoutEffect(()=>{if(!re)return;let e=he.current,t=e.style.height;e.style.height=`auto`;let n=e.getBoundingClientRect().height;e.style.height=t,fe(n),m(e=>e.find(e=>e.toastId===d.id)?e.map(e=>e.toastId===d.id?{...e,height:n}:e):[{toastId:d.id,height:n,position:d.position},...e])},[re,d.title,d.description,m,d.id,d.jsx,d.action,d.cancel]);let Ie=w.useCallback(()=>{ie(!0),z(Ee.current),m(e=>e.filter(e=>e.toastId!==d.id)),setTimeout(()=>{b(d)},Hl)},[d,b,m,Ee]);w.useEffect(()=>{if(d.promise&&ve===`loading`||d.duration===1/0||d.type===`loading`)return;let e;return y||p||Me?(()=>{if(De.current<Te.current){let e=new Date().getTime()-Te.current;pe.current-=e}De.current=new Date().getTime()})():pe.current!==1/0&&(Te.current=new Date().getTime(),e=setTimeout(()=>{d.onAutoClose==null||d.onAutoClose.call(d,d),Ie()},pe.current)),()=>clearTimeout(e)},[y,p,d,ve,Me,Ie]),w.useEffect(()=>{d.delete&&(Ie(),d.onDismiss==null||d.onDismiss.call(d,d))},[Ie,d.delete]);function Le(){var e;if(M!=null&&M.loading){var t;return w.createElement(`div`,{className:Ul(j==null?void 0:j.loader,d==null||(t=d.classNames)==null?void 0:t.loader,`sonner-loader`),"data-visible":ve===`loading`},M.loading)}return w.createElement(bl,{className:Ul(j==null?void 0:j.loader,d==null||(e=d.classNames)==null?void 0:e.loader),visible:ve===`loading`})}let Re=d.icon||(M==null?void 0:M[ve])||vl(ve);var ze,Be;return w.createElement(`li`,{tabIndex:0,ref:he,className:Ul(D,xe,j==null?void 0:j.toast,d==null||(t=d.classNames)==null?void 0:t.toast,j==null?void 0:j[ye],d==null||(n=d.classNames)==null?void 0:n[ye]),"data-sonner-toast":``,"data-rich-colors":(ze=d.richColors)==null?x:ze,"data-styled":!(d.jsx||d.unstyled||f),"data-mounted":re,"data-promise":!!d.promise,"data-swiped":le,"data-removed":R,"data-visible":_e,"data-y-position":ke,"data-x-position":Ae,"data-index":_,"data-front":ge,"data-swiping":ae,"data-dismissible":be,"data-type":ve,"data-invert":Pe,"data-swipe-out":se,"data-swipe-direction":I,"data-expanded":!!(y||A&&re),"data-testid":d.testId,style:{"--index":_,"--toasts-before":_,"--z-index":v.length-_,"--offset":`${R?de:Ee.current}px`,"--initial-height":A?`auto`:`${B}px`,...C,...d.style},onDragEnd:()=>{oe(!1),F(null),Oe.current=null},onPointerDown:e=>{e.button!==2&&!Fe&&be&&(me.current=new Date,z(Ee.current),e.target.setPointerCapture(e.pointerId),e.target.tagName!==`BUTTON`&&(oe(!0),Oe.current={x:e.clientX,y:e.clientY}))},onPointerUp:()=>{var e,t,n;if(se||!be)return;Oe.current=null;let r=Number(((e=he.current)==null?void 0:e.style.getPropertyValue(`--swipe-amount-x`).replace(`px`,``))||0),i=Number(((t=he.current)==null?void 0:t.style.getPropertyValue(`--swipe-amount-y`).replace(`px`,``))||0),a=new Date().getTime()-((n=me.current)==null?void 0:n.getTime()),o=P===`x`?r:i,s=Math.abs(o)/a;if((P===`x`?Ne.includes(r>0?`right`:`left`):Ne.includes(i>0?`bottom`:`top`))&&(Math.abs(o)>=Vl||s>.11))z(Ee.current),d.onDismiss==null||d.onDismiss.call(d,d),ne(P===`x`?r>0?`right`:`left`:i>0?`down`:`up`),Ie(),ce(!0);else{var c,l;(c=he.current)==null||c.style.setProperty(`--swipe-amount-x`,`0px`),(l=he.current)==null||l.style.setProperty(`--swipe-amount-y`,`0px`),ue(!1),oe(!1),F(null)}},onPointerMove:e=>{var t,n,r;if(!Oe.current||!be||((t=window.getSelection())==null?void 0:t.toString().length)>0)return;let i=e.clientY-Oe.current.y,a=e.clientX-Oe.current.x;!P&&(Math.abs(a)>1||Math.abs(i)>1)&&F(Math.abs(a)>Math.abs(i)?`x`:`y`);let o={x:0,y:0},s=e=>1/(1.5+Math.abs(e)/20);if(P===`y`){if(Ne.includes(`top`)||Ne.includes(`bottom`)){if(Ne.includes(`top`)&&i<0||Ne.includes(`bottom`)&&i>0)o.y=i;else{let e=i*s(i);o.y=Math.abs(e)<Math.abs(i)?e:i}}}else if(P===`x`&&(Ne.includes(`left`)||Ne.includes(`right`))){if(Ne.includes(`left`)&&a<0||Ne.includes(`right`)&&a>0)o.x=a;else{let e=a*s(a);o.x=Math.abs(e)<Math.abs(a)?e:a}}(Math.abs(o.x)>0||Math.abs(o.y)>0)&&ue(!0),(n=he.current)==null||n.style.setProperty(`--swipe-amount-x`,`${o.x}px`),(r=he.current)==null||r.style.setProperty(`--swipe-amount-y`,`${o.y}px`)}},V&&!d.jsx&&ve!==`loading`?w.createElement(`button`,{"aria-label":N,"data-disabled":Fe,"data-close-button":!0,onClick:Fe||!be?()=>{}:()=>{Ie(),d.onDismiss==null||d.onDismiss.call(d,d)},className:Ul(j==null?void 0:j.closeButton,d==null||(r=d.classNames)==null?void 0:r.closeButton)},(Be=M==null?void 0:M.close)==null?Tl:Be):null,(ve||d.icon||d.promise)&&d.icon!==null&&((M==null?void 0:M[ve])!==null||d.icon)?w.createElement(`div`,{"data-icon":``,className:Ul(j==null?void 0:j.icon,d==null||(i=d.classNames)==null?void 0:i.icon)},ve===`loading`?d.icon||Le():d.promise?Le():null,ve===`loading`?null:Re):null,w.createElement(`div`,{"data-content":``,className:Ul(j==null?void 0:j.content,d==null||(a=d.classNames)==null?void 0:a.content)},w.createElement(`div`,{"data-title":``,className:Ul(j==null?void 0:j.title,d==null||(o=d.classNames)==null?void 0:o.title)},d.jsx?d.jsx:typeof d.title==`function`?d.title():d.title),d.description?w.createElement(`div`,{"data-description":``,className:Ul(ee,Se,j==null?void 0:j.description,d==null||(s=d.classNames)==null?void 0:s.description)},typeof d.description==`function`?d.description():d.description):null),w.isValidElement(d.cancel)?d.cancel:d.cancel&&Pl(d.cancel)?w.createElement(`button`,{"data-button":!0,"data-cancel":!0,style:d.cancelButtonStyle||T,onClick:e=>{Pl(d.cancel)&&be&&(d.cancel.onClick==null||d.cancel.onClick.call(d.cancel,e),Ie())},className:Ul(j==null?void 0:j.cancelButton,d==null||(c=d.classNames)==null?void 0:c.cancelButton)},d.cancel.label):null,w.isValidElement(d.action)?d.action:d.action&&Pl(d.action)?w.createElement(`button`,{"data-button":!0,"data-action":!0,style:d.actionButtonStyle||E,onClick:e=>{Pl(d.action)&&(d.action.onClick==null||d.action.onClick.call(d.action,e),e.defaultPrevented||Ie())},className:Ul(j==null?void 0:j.actionButton,d==null||(l=d.classNames)==null?void 0:l.actionButton)},d.action.label):null)};function Kl(){if(typeof window>`u`||typeof document>`u`)return`ltr`;let e=document.documentElement.getAttribute(`dir`);return e===`auto`||!e?window.getComputedStyle(document.documentElement).direction:e}function ql(e,t){let n={};return[e,t].forEach((e,t)=>{let r=t===1,i=r?`--mobile-offset`:`--offset`,a=r?Ll:Il;function o(e){[`top`,`right`,`bottom`,`left`].forEach(t=>{n[`${i}-${t}`]=typeof e==`number`?`${e}px`:e})}typeof e==`number`||typeof e==`string`?o(e):typeof e==`object`?[`top`,`right`,`bottom`,`left`].forEach(t=>{e[t]===void 0?n[`${i}-${t}`]=a:n[`${i}-${t}`]=typeof e[t]==`number`?`${e[t]}px`:e[t]}):o(a)}),n}var Jl=w.forwardRef(function(e,t){let{id:n,invert:r,position:i=`bottom-right`,hotkey:a=[`altKey`,`KeyT`],expand:o,closeButton:s,className:c,offset:l,mobileOffset:u,theme:d=`light`,richColors:f,duration:p,style:m,visibleToasts:h=Fl,toastOptions:g,dir:_=Kl(),gap:v=Bl,icons:y,customAriaLabel:b,containerAriaLabel:x=`Notifications`}=e,[S,C]=w.useState([]),T=w.useMemo(()=>n?S.filter(e=>e.toasterId===n):S.filter(e=>!e.toasterId),[S,n]),E=w.useMemo(()=>Array.from(new Set([i].concat(T.filter(e=>e.position).map(e=>e.position)))),[T,i]),[D,ee]=w.useState([]),[O,k]=w.useState(!1),[te,A]=w.useState(!1),[j,M]=w.useState(d===`system`?typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`:d),N=w.useRef(null),P=a.join(`+`).replace(/Key/g,``).replace(/Digit/g,``),F=w.useRef(null),I=w.useRef(!1),ne=w.useCallback(e=>{C(t=>{var n;return(n=t.find(t=>t.id===e.id))!=null&&n.delete||Al.dismiss(e.id),t.filter(({id:t})=>t!==e.id)})},[]);return w.useEffect(()=>Al.subscribe(e=>{e.dismiss?requestAnimationFrame(()=>{C(t=>t.map(t=>t.id===e.id?{...t,delete:!0}:t))}):setTimeout(()=>{qt.flushSync(()=>{C(t=>{let n=t.findIndex(t=>t.id===e.id);return n===-1?[e,...t]:[...t.slice(0,n),{...t[n],...e},...t.slice(n+1)]})})})}),[]),w.useEffect(()=>{if(d!==`system`){M(d);return}if(d===`system`&&(window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches?M(`dark`):M(`light`)),typeof window>`u`)return;let e=window.matchMedia(`(prefers-color-scheme: dark)`);try{e.addEventListener(`change`,({matches:e})=>{M(e?`dark`:`light`)})}catch{e.addListener(({matches:e})=>{try{M(e?`dark`:`light`)}catch(e){console.error(e)}})}},[d]),w.useEffect(()=>{S.length<=1&&k(!1)},[S]),w.useEffect(()=>{let e=e=>{var t;if(a.length>0&&a.every(t=>e[t]||e.code===t)){var n;k(!0),(n=N.current)==null||n.focus()}e.code===`Escape`&&(document.activeElement===N.current||(t=N.current)!=null&&t.contains(document.activeElement))&&k(!1)};return document.addEventListener(`keydown`,e),()=>document.removeEventListener(`keydown`,e)},[a]),w.useEffect(()=>{if(N.current)return()=>{F.current&&(F.current.focus({preventScroll:!0}),F.current=null,I.current=!1)}},[N.current]),w.createElement(`section`,{ref:t,"aria-label":b==null?`${x} ${P}`:b,tabIndex:-1,"aria-live":`polite`,"aria-relevant":`additions text`,"aria-atomic":`false`,suppressHydrationWarning:!0,"data-react-aria-top-layer":!0},E.map((t,n)=>{var i;let[a,d]=t.split(`-`);return T.length?w.createElement(`ol`,{key:t,dir:_===`auto`?Kl():_,tabIndex:-1,ref:N,className:c,"data-sonner-toaster":!0,"data-sonner-theme":j,"data-y-position":a,"data-x-position":d,style:{"--front-toast-height":`${((i=D[0])==null?void 0:i.height)||0}px`,"--width":`${zl}px`,"--gap":`${v}px`,...m,...ql(l,u)},onBlur:e=>{I.current&&!e.currentTarget.contains(e.relatedTarget)&&(I.current=!1,F.current&&(F.current.focus({preventScroll:!0}),F.current=null))},onFocus:e=>{e.target instanceof HTMLElement&&e.target.dataset.dismissible===`false`||I.current||(I.current=!0,F.current=e.relatedTarget)},onMouseEnter:()=>k(!0),onMouseMove:()=>k(!0),onMouseLeave:()=>{te||k(!1)},onDragEnd:()=>k(!1),onPointerDown:e=>{e.target instanceof HTMLElement&&e.target.dataset.dismissible===`false`||A(!0)},onPointerUp:()=>A(!1)},T.filter(e=>!e.position&&n===0||e.position===t).map((n,i)=>{var a,c;return w.createElement(Gl,{key:n.id,icons:y,index:i,toast:n,defaultRichColors:f,duration:(a=g==null?void 0:g.duration)==null?p:a,className:g==null?void 0:g.className,descriptionClassName:g==null?void 0:g.descriptionClassName,invert:r,visibleToasts:h,closeButton:(c=g==null?void 0:g.closeButton)==null?s:c,interacting:te,position:t,style:g==null?void 0:g.style,unstyled:g==null?void 0:g.unstyled,classNames:g==null?void 0:g.classNames,cancelButtonStyle:g==null?void 0:g.cancelButtonStyle,actionButtonStyle:g==null?void 0:g.actionButtonStyle,closeButtonAriaLabel:g==null?void 0:g.closeButtonAriaLabel,removeToast:ne,toasts:T.filter(e=>e.position==n.position),heights:D.filter(e=>e.position==n.position),setHeights:ee,expandByDefault:o,gap:v,expanded:O,swipeDirections:e.swipeDirections})})):null}))}),Yl=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},Xl=(e,t)=>({classGroupId:e,validator:t}),Zl=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),Ql=`-`,$l=[],eu=`arbitrary..`,tu=e=>{let t=iu(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return ru(e);let n=e.split(Ql);return nu(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?Yl(i,t):t:i||$l}return n[e]||$l}}},nu=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=nu(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(Ql):e.slice(t).join(Ql),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},ru=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?eu+r:void 0})(),iu=e=>{let{theme:t,classGroups:n}=e;return au(n,t)},au=(e,t)=>{let n=Zl();for(let r in e){let i=e[r];ou(i,n,r,t)}return n},ou=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];su(i,t,n,r)}},su=(e,t,n,r)=>{typeof e==`string`?cu(e,t,n):typeof e==`function`?lu(e,t,n,r):uu(e,t,n,r)},cu=(e,t,n)=>{let r=e===``?t:du(t,e);r.classGroupId=n},lu=(e,t,n,r)=>{fu(e)?ou(e(r),t,n,r):(t.validators===null&&(t.validators=[]),t.validators.push(Xl(n,e)))},uu=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];ou(o,du(t,a),n,r)}},du=(e,t)=>{let n=e,r=t.split(Ql),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=Zl(),n.nextPart.set(t,i)),n=i}return n},fu=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,pu=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},mu=`!`,hu=`:`,gu=[],_u=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),vu=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===hu){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(mu)?(c=s.slice(0,-1),l=!0):s.startsWith(mu)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return _u(t,l,c,u)};if(t){let e=t+hu,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):_u(gu,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},yu=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},bu=e=>({cache:pu(e.cacheSize),parseClassName:vu(e),sortModifiers:yu(e),postfixLookupClassGroupIds:xu(e),...tu(e)}),xu=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},Su=/\s+/,Cu=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(Su),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h||(g=r(p),!g)){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+mu:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},wu=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=Tu(n))&&(i&&(i+=` `),i+=r);return i},Tu=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=Tu(e[r]))&&(n&&(n+=` `),n+=t);return n},Eu=(e,...t)=>{let n,r,i,a,o=o=>(n=bu(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=Cu(e,n);return i(e,a),a};return a=o,(...e)=>a(wu(...e))},Du=[],Ou=e=>{let t=t=>t[e]||Du;return t.isThemeGetter=!0,t.themeKey=e,t},ku=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,Au=/^\((?:(\w[\w-]*):)?(.+)\)$/i,ju=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,Mu=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Nu=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Pu=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,Fu=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Iu=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Lu=e=>ju.test(e),J=e=>!!e&&!Number.isNaN(Number(e)),Ru=e=>!!e&&Number.isInteger(Number(e)),zu=e=>e.endsWith(`%`)&&J(e.slice(0,-1)),Bu=e=>Mu.test(e),Vu=()=>!0,Hu=e=>Nu.test(e)&&!Pu.test(e),Uu=()=>!1,Wu=e=>Fu.test(e),Gu=e=>Iu.test(e),Ku=e=>!Y(e)&&!Q(e),qu=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),Ju=e=>sd(e,dd,Uu),Y=e=>ku.test(e),Yu=e=>sd(e,fd,Hu),Xu=e=>sd(e,pd,J),Zu=e=>sd(e,hd,Vu),X=e=>sd(e,md,Uu),Z=e=>sd(e,ld,Uu),Qu=e=>sd(e,ud,Gu),$u=e=>sd(e,gd,Wu),Q=e=>Au.test(e),ed=e=>cd(e,fd),td=e=>cd(e,md),nd=e=>cd(e,ld),rd=e=>cd(e,dd),id=e=>cd(e,ud),ad=e=>cd(e,gd,!0),od=e=>cd(e,hd,!0),sd=(e,t,n)=>{let r=ku.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},cd=(e,t,n=!1)=>{let r=Au.exec(e);return r?r[1]?t(r[1]):n:!1},ld=e=>e===`position`||e===`percentage`,ud=e=>e===`image`||e===`url`,dd=e=>e===`length`||e===`size`||e===`bg-size`,fd=e=>e===`length`,pd=e=>e===`number`,md=e=>e===`family-name`,hd=e=>e===`number`||e===`weight`,gd=e=>e===`shadow`,_d=Eu(()=>{let e=Ou(`color`),t=Ou(`font`),n=Ou(`text`),r=Ou(`font-weight`),i=Ou(`tracking`),a=Ou(`leading`),o=Ou(`breakpoint`),s=Ou(`container`),c=Ou(`spacing`),l=Ou(`radius`),u=Ou(`shadow`),d=Ou(`inset-shadow`),f=Ou(`text-shadow`),p=Ou(`drop-shadow`),m=Ou(`blur`),h=Ou(`perspective`),g=Ou(`aspect`),_=Ou(`ease`),v=Ou(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),Q,Y],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],C=()=>[`auto`,`contain`,`none`],w=()=>[Q,Y,c],T=()=>[Lu,`full`,`auto`,...w()],E=()=>[Ru,`none`,`subgrid`,Q,Y],D=()=>[`auto`,{span:[`full`,Ru,Q,Y]},Ru,Q,Y],ee=()=>[Ru,`auto`,Q,Y],O=()=>[`auto`,`min`,`max`,`fr`,Q,Y],k=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],te=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],A=()=>[`auto`,...w()],j=()=>[Lu,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...w()],M=()=>[s,Lu,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...w()],N=()=>[Lu,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...w()],P=()=>[e,Q,Y],F=()=>[...b(),nd,Z,{position:[Q,Y]}],I=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],ne=()=>[`auto`,`cover`,`contain`,rd,Ju,{size:[Q,Y]}],re=()=>[zu,ed,Yu],L=()=>[``,`none`,`full`,l,Q,Y],R=()=>[``,J,ed,Yu],ie=()=>[`solid`,`dashed`,`dotted`,`double`],ae=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],oe=()=>[J,zu,nd,Z],se=()=>[``,`none`,m,Q,Y],ce=()=>[`none`,J,Q,Y],le=()=>[`none`,J,Q,Y],ue=()=>[J,Q,Y],de=()=>[Lu,`full`,...w()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[Bu],breakpoint:[Bu],color:[Vu],container:[Bu],"drop-shadow":[Bu],ease:[`in`,`out`,`in-out`],font:[Ku],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[Bu],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[Bu],shadow:[Bu],spacing:[`px`,J],text:[Bu],"text-shadow":[Bu],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,Lu,Y,Q,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,Q,Y]}],"container-named":[qu],columns:[{columns:[J,`auto`,Y,Q,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:T()}],"inset-x":[{"inset-x":T()}],"inset-y":[{"inset-y":T()}],start:[{"inset-s":T(),start:T()}],end:[{"inset-e":T(),end:T()}],"inset-bs":[{"inset-bs":T()}],"inset-be":[{"inset-be":T()}],top:[{top:T()}],right:[{right:T()}],bottom:[{bottom:T()}],left:[{left:T()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[Ru,`auto`,Q,Y]}],basis:[{basis:[Lu,`full`,`auto`,s,...w()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[J,Lu,`auto`,`initial`,`none`,Y]}],grow:[{grow:[``,J,Q,Y]}],shrink:[{shrink:[``,J,Q,Y]}],order:[{order:[Ru,`first`,`last`,`none`,Q,Y]}],"grid-cols":[{"grid-cols":E()}],"col-start-end":[{col:D()}],"col-start":[{"col-start":ee()}],"col-end":[{"col-end":ee()}],"grid-rows":[{"grid-rows":E()}],"row-start-end":[{row:D()}],"row-start":[{"row-start":ee()}],"row-end":[{"row-end":ee()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":O()}],"auto-rows":[{"auto-rows":O()}],gap:[{gap:w()}],"gap-x":[{"gap-x":w()}],"gap-y":[{"gap-y":w()}],"justify-content":[{justify:[...k(),`normal`]}],"justify-items":[{"justify-items":[...te(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...te()]}],"align-content":[{content:[`normal`,...k()]}],"align-items":[{items:[...te(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...te(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":k()}],"place-items":[{"place-items":[...te(),`baseline`]}],"place-self":[{"place-self":[`auto`,...te()]}],p:[{p:w()}],px:[{px:w()}],py:[{py:w()}],ps:[{ps:w()}],pe:[{pe:w()}],pbs:[{pbs:w()}],pbe:[{pbe:w()}],pt:[{pt:w()}],pr:[{pr:w()}],pb:[{pb:w()}],pl:[{pl:w()}],m:[{m:A()}],mx:[{mx:A()}],my:[{my:A()}],ms:[{ms:A()}],me:[{me:A()}],mbs:[{mbs:A()}],mbe:[{mbe:A()}],mt:[{mt:A()}],mr:[{mr:A()}],mb:[{mb:A()}],ml:[{ml:A()}],"space-x":[{"space-x":w()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":w()}],"space-y-reverse":[`space-y-reverse`],size:[{size:j()}],"inline-size":[{inline:[`auto`,...M()]}],"min-inline-size":[{"min-inline":[`auto`,...M()]}],"max-inline-size":[{"max-inline":[`none`,...M()]}],"block-size":[{block:[`auto`,...N()]}],"min-block-size":[{"min-block":[`auto`,...N()]}],"max-block-size":[{"max-block":[`none`,...N()]}],w:[{w:[s,`screen`,...j()]}],"min-w":[{"min-w":[s,`screen`,`none`,...j()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...j()]}],h:[{h:[`screen`,`lh`,...j()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...j()]}],"max-h":[{"max-h":[`screen`,`lh`,`none`,...j()]}],"font-size":[{text:[`base`,n,ed,Yu]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,od,Zu]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,zu,Y]}],"font-family":[{font:[td,X,t]}],"font-features":[{"font-features":[Y]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,Q,Y]}],"line-clamp":[{"line-clamp":[J,`none`,Q,Xu]}],leading:[{leading:[`none`,a,...w()]}],"list-image":[{"list-image":[`none`,Q,Y]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,Q,Y]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:P()}],"text-color":[{text:P()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...ie(),`wavy`]}],"text-decoration-thickness":[{decoration:[J,`from-font`,`auto`,Q,Yu]}],"text-decoration-color":[{decoration:P()}],"underline-offset":[{"underline-offset":[J,`auto`,Q,Y]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:w()}],"tab-size":[{tab:[Ru,Q,Y]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,Q,Y]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,Q,Y]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:F()}],"bg-repeat":[{bg:I()}],"bg-size":[{bg:ne()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},Ru,Q,Y],radial:[``,Q,Y],conic:[``,Ru,Q,Y]},id,Qu]}],"bg-color":[{bg:P()}],"gradient-from-pos":[{from:re()}],"gradient-via-pos":[{via:re()}],"gradient-to-pos":[{to:re()}],"gradient-from":[{from:P()}],"gradient-via":[{via:P()}],"gradient-to":[{to:P()}],rounded:[{rounded:L()}],"rounded-s":[{"rounded-s":L()}],"rounded-e":[{"rounded-e":L()}],"rounded-t":[{"rounded-t":L()}],"rounded-r":[{"rounded-r":L()}],"rounded-b":[{"rounded-b":L()}],"rounded-l":[{"rounded-l":L()}],"rounded-ss":[{"rounded-ss":L()}],"rounded-se":[{"rounded-se":L()}],"rounded-ee":[{"rounded-ee":L()}],"rounded-es":[{"rounded-es":L()}],"rounded-tl":[{"rounded-tl":L()}],"rounded-tr":[{"rounded-tr":L()}],"rounded-br":[{"rounded-br":L()}],"rounded-bl":[{"rounded-bl":L()}],"border-w":[{border:R()}],"border-w-x":[{"border-x":R()}],"border-w-y":[{"border-y":R()}],"border-w-s":[{"border-s":R()}],"border-w-e":[{"border-e":R()}],"border-w-bs":[{"border-bs":R()}],"border-w-be":[{"border-be":R()}],"border-w-t":[{"border-t":R()}],"border-w-r":[{"border-r":R()}],"border-w-b":[{"border-b":R()}],"border-w-l":[{"border-l":R()}],"divide-x":[{"divide-x":R()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":R()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...ie(),`hidden`,`none`]}],"divide-style":[{divide:[...ie(),`hidden`,`none`]}],"border-color":[{border:P()}],"border-color-x":[{"border-x":P()}],"border-color-y":[{"border-y":P()}],"border-color-s":[{"border-s":P()}],"border-color-e":[{"border-e":P()}],"border-color-bs":[{"border-bs":P()}],"border-color-be":[{"border-be":P()}],"border-color-t":[{"border-t":P()}],"border-color-r":[{"border-r":P()}],"border-color-b":[{"border-b":P()}],"border-color-l":[{"border-l":P()}],"divide-color":[{divide:P()}],"outline-style":[{outline:[...ie(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[J,Q,Y]}],"outline-w":[{outline:[``,J,ed,Yu]}],"outline-color":[{outline:P()}],shadow:[{shadow:[``,`inner`,`none`,u,ad,$u]}],"shadow-color":[{shadow:P()}],"inset-shadow":[{"inset-shadow":[`none`,d,ad,$u]}],"inset-shadow-color":[{"inset-shadow":P()}],"ring-w":[{ring:R()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:P()}],"ring-offset-w":[{"ring-offset":[J,Yu]}],"ring-offset-color":[{"ring-offset":P()}],"inset-ring-w":[{"inset-ring":R()}],"inset-ring-color":[{"inset-ring":P()}],"text-shadow":[{"text-shadow":[`none`,f,ad,$u]}],"text-shadow-color":[{"text-shadow":P()}],opacity:[{opacity:[J,Q,Y]}],"mix-blend":[{"mix-blend":[...ae(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":ae()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[J]}],"mask-image-linear-from-pos":[{"mask-linear-from":oe()}],"mask-image-linear-to-pos":[{"mask-linear-to":oe()}],"mask-image-linear-from-color":[{"mask-linear-from":P()}],"mask-image-linear-to-color":[{"mask-linear-to":P()}],"mask-image-t-from-pos":[{"mask-t-from":oe()}],"mask-image-t-to-pos":[{"mask-t-to":oe()}],"mask-image-t-from-color":[{"mask-t-from":P()}],"mask-image-t-to-color":[{"mask-t-to":P()}],"mask-image-r-from-pos":[{"mask-r-from":oe()}],"mask-image-r-to-pos":[{"mask-r-to":oe()}],"mask-image-r-from-color":[{"mask-r-from":P()}],"mask-image-r-to-color":[{"mask-r-to":P()}],"mask-image-b-from-pos":[{"mask-b-from":oe()}],"mask-image-b-to-pos":[{"mask-b-to":oe()}],"mask-image-b-from-color":[{"mask-b-from":P()}],"mask-image-b-to-color":[{"mask-b-to":P()}],"mask-image-l-from-pos":[{"mask-l-from":oe()}],"mask-image-l-to-pos":[{"mask-l-to":oe()}],"mask-image-l-from-color":[{"mask-l-from":P()}],"mask-image-l-to-color":[{"mask-l-to":P()}],"mask-image-x-from-pos":[{"mask-x-from":oe()}],"mask-image-x-to-pos":[{"mask-x-to":oe()}],"mask-image-x-from-color":[{"mask-x-from":P()}],"mask-image-x-to-color":[{"mask-x-to":P()}],"mask-image-y-from-pos":[{"mask-y-from":oe()}],"mask-image-y-to-pos":[{"mask-y-to":oe()}],"mask-image-y-from-color":[{"mask-y-from":P()}],"mask-image-y-to-color":[{"mask-y-to":P()}],"mask-image-radial":[{"mask-radial":[Q,Y]}],"mask-image-radial-from-pos":[{"mask-radial-from":oe()}],"mask-image-radial-to-pos":[{"mask-radial-to":oe()}],"mask-image-radial-from-color":[{"mask-radial-from":P()}],"mask-image-radial-to-color":[{"mask-radial-to":P()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[J]}],"mask-image-conic-from-pos":[{"mask-conic-from":oe()}],"mask-image-conic-to-pos":[{"mask-conic-to":oe()}],"mask-image-conic-from-color":[{"mask-conic-from":P()}],"mask-image-conic-to-color":[{"mask-conic-to":P()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:F()}],"mask-repeat":[{mask:I()}],"mask-size":[{mask:ne()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,Q,Y]}],filter:[{filter:[``,`none`,Q,Y]}],blur:[{blur:se()}],brightness:[{brightness:[J,Q,Y]}],contrast:[{contrast:[J,Q,Y]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,ad,$u]}],"drop-shadow-color":[{"drop-shadow":P()}],grayscale:[{grayscale:[``,J,Q,Y]}],"hue-rotate":[{"hue-rotate":[J,Q,Y]}],invert:[{invert:[``,J,Q,Y]}],saturate:[{saturate:[J,Q,Y]}],sepia:[{sepia:[``,J,Q,Y]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,Q,Y]}],"backdrop-blur":[{"backdrop-blur":se()}],"backdrop-brightness":[{"backdrop-brightness":[J,Q,Y]}],"backdrop-contrast":[{"backdrop-contrast":[J,Q,Y]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,J,Q,Y]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[J,Q,Y]}],"backdrop-invert":[{"backdrop-invert":[``,J,Q,Y]}],"backdrop-opacity":[{"backdrop-opacity":[J,Q,Y]}],"backdrop-saturate":[{"backdrop-saturate":[J,Q,Y]}],"backdrop-sepia":[{"backdrop-sepia":[``,J,Q,Y]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":w()}],"border-spacing-x":[{"border-spacing-x":w()}],"border-spacing-y":[{"border-spacing-y":w()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,Q,Y]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[J,`initial`,Q,Y]}],ease:[{ease:[`linear`,`initial`,_,Q,Y]}],delay:[{delay:[J,Q,Y]}],animate:[{animate:[`none`,v,Q,Y]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,Q,Y]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:ce()}],"rotate-x":[{"rotate-x":ce()}],"rotate-y":[{"rotate-y":ce()}],"rotate-z":[{"rotate-z":ce()}],scale:[{scale:le()}],"scale-x":[{"scale-x":le()}],"scale-y":[{"scale-y":le()}],"scale-z":[{"scale-z":le()}],"scale-3d":[`scale-3d`],skew:[{skew:ue()}],"skew-x":[{"skew-x":ue()}],"skew-y":[{"skew-y":ue()}],transform:[{transform:[Q,Y,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:de()}],"translate-x":[{"translate-x":de()}],"translate-y":[{"translate-y":de()}],"translate-z":[{"translate-z":de()}],"translate-none":[`translate-none`],zoom:[{zoom:[Ru,Q,Y]}],accent:[{accent:P()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:P()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,Q,Y]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":P()}],"scrollbar-track-color":[{"scrollbar-track":P()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":w()}],"scroll-mx":[{"scroll-mx":w()}],"scroll-my":[{"scroll-my":w()}],"scroll-ms":[{"scroll-ms":w()}],"scroll-me":[{"scroll-me":w()}],"scroll-mbs":[{"scroll-mbs":w()}],"scroll-mbe":[{"scroll-mbe":w()}],"scroll-mt":[{"scroll-mt":w()}],"scroll-mr":[{"scroll-mr":w()}],"scroll-mb":[{"scroll-mb":w()}],"scroll-ml":[{"scroll-ml":w()}],"scroll-p":[{"scroll-p":w()}],"scroll-px":[{"scroll-px":w()}],"scroll-py":[{"scroll-py":w()}],"scroll-ps":[{"scroll-ps":w()}],"scroll-pe":[{"scroll-pe":w()}],"scroll-pbs":[{"scroll-pbs":w()}],"scroll-pbe":[{"scroll-pbe":w()}],"scroll-pt":[{"scroll-pt":w()}],"scroll-pr":[{"scroll-pr":w()}],"scroll-pb":[{"scroll-pb":w()}],"scroll-pl":[{"scroll-pl":w()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,Q,Y]}],fill:[{fill:[`none`,...P()]}],"stroke-w":[{stroke:[J,ed,Yu,Xu]}],stroke:[{stroke:[`none`,...P()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`start`,`end`,`right`,`left`],"inset-y":[`inset-bs`,`inset-be`,`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`ps`,`pe`,`pr`,`pl`],py:[`pbs`,`pbe`,`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`ms`,`me`,`mr`,`ml`],my:[`mbs`,`mbe`,`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-s`,`border-w-e`,`border-w-r`,`border-w-l`],"border-w-y":[`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-s`,`border-color-e`,`border-color-r`,`border-color-l`],"border-color-y":[`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-ms`,`scroll-me`,`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-ps`,`scroll-pe`,`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}});function vd(...e){return _d(Te(e))}var yd={tracks:[],queue:[],index:-1,time:0,duration:0,playing:!1,loading:!1,mediaPermission:!1,libraryLoading:!0,sourceError:``,doc:null,cues:[],subtitleError:``,subtitleStatus:``,manual:!1,readingBusy:!1,readingFailed:!1,offset:0,offsetKey:``,favorites:[],playlists:[],fontScale:1,reducedMotion:!1,systemDark:!1,prefs:{theme:`system`,language:`ja`,ruby:!0,font:20,rubyScale:.42,depth:!0,speed:1,repeat:`all`,shuffle:!1},sleep:{mode:`off`}},bd=new Map,xd=0;function Sd(e,t={}){return new Promise((n,r)=>{let i=window.DLSound;if(!i){r(Error(`本地播放器尚未连接`));return}let a=++xd,o=setTimeout(()=>{bd.delete(a),r(Error(e===`refresh`?`刷新超时，请重试`:`操作超时，请重试`))},3e4);bd.set(a,{resolve:n,reject:r,timer:o});try{if(i.send(JSON.stringify({id:a,action:e,data:t}))===!1)throw Error(`请求过大，请减少所选音轨数量`)}catch(e){clearTimeout(o),bd.delete(a),r(e)}})}var Cd=!1;async function wd(){if(!Cd){Cd=!0;try{await Sd(`refresh`),Nl.success(`刷新完成`,{id:`library-refresh`})}catch(e){Nl.error(e instanceof Error?e.message:`刷新失败，请重试`,{id:`library-refresh`})}finally{Cd=!1}}}function Td(e,t={}){return Sd(e,t).catch(e=>{Nl.error(e.message)})}var Ed=0,Dd=new Set,Od=()=>Ed;function kd(e){return Dd.add(e),()=>{Dd.delete(e)}}var Ad=()=>()=>{};function jd(e=!0){return(0,w.useSyncExternalStore)(e?kd:Ad,Od)}function Md(e){let t=jd(e),[n,r]=(0,w.useState)(yd);(0,w.useEffect)(()=>(window.dlSoundEvent=e=>{if(e.reply){let t=bd.get(e.reply);t&&(clearTimeout(t.timer),bd.delete(e.reply),e.error?t.reject(Error(e.error)):t.resolve(e.value));return}if(e.error){Nl.error(e.error);return}let{time:t,...n}=e;typeof t==`number`&&t!==Ed&&(Ed=t,Dd.forEach(e=>e())),Object.keys(n).length&&r(e=>({...e,...n,prefs:n.prefs?{...e.prefs,...n.prefs}:e.prefs}))},Td(`ready`),()=>{window.dlSoundEvent=void 0}),[]);let i=n.queue[n.index],a=i==null?void 0:i.track;return{...n,time:t,item:i,track:a,pref:(e,t)=>Td(`pref`,{key:e,value:t}),toggle:()=>Td(`toggle`),pause:()=>Td(`pause`),seek:e=>Td(`seek`,{ms:e}),select:(e,t=!0,n,r)=>Td(`play`,{ids:(n!=null&&n.some(t=>t.id===e.id)?n:[e]).map(e=>e.id),startId:e.id,startIndex:r}),playCollection:e=>Td(`play`,{ids:e.map(e=>e.id)}),skip:e=>Td(`skip`,{step:e}),jump:e=>{var t;return Td(`jump`,{itemId:(t=n.queue[e])==null?void 0:t.itemId})},append:(e,t=!1)=>Td(`append`,{id:e.id,next:t}),remove:e=>Td(`remove`,{itemId:e}),move:(e,t)=>Td(`move`,{itemId:e,targetId:t}),clear:()=>Sd(`clear`),setSleep:e=>Td(`sleep`,e),setOffset:e=>Td(`offset`,{value:e,key:n.offsetKey}),importSubtitle:()=>Td(`importSubtitle`),automatic:()=>Td(`automatic`),correction:(e,t)=>Td(`correction`,{cueId:e,index:t,key:n.offsetKey}),requestVideo:()=>Td(`requestVideo`),closeExternal:()=>Td(`closeExternal`),requestMedia:()=>Td(`requestMedia`),requestTree:()=>Td(`requestTree`),refresh:wd,favorite:e=>Td(`favorite`,{id:e}),playlist:(e,t)=>Sd(`playlist`,{operation:e,...t})}}function Nd(e){let t=new Map,n=new Map,r=new Map,i=new Map;for(let a of e){t.set(a.id,a);let e=n.get(a.folder);e||(e={name:a.folderName||a.folder,tracks:[]},n.set(a.folder,e)),e.tracks.push(a),i.set(a.id,[a.title,a.artist,a.album].join(` `).toLowerCase());let o=a.albumId&&a.album!==`未知专辑`?JSON.stringify([`id`,a.albumId,a.albumArtist||a.folder.replace(/\/(?:cd|disc|disk)\s*\d+$/i,``)]):JSON.stringify([a.album,a.albumArtist||[a.folder,a.album===`未知专辑`?``:a.artist]]),s=r.get(o);s||r.set(o,s=[]),s.push(a)}for(let e of r.values())e.sort((e,t)=>{var n,r,i,a;return((n=e.discNumber)==null?1:n)-((r=t.discNumber)==null?1:r)||((i=e.trackNumber)==null?1/0:i)-((a=t.trackNumber)==null?1/0:a)||(e.fileName||e.title).localeCompare(t.fileName||t.title,void 0,{numeric:!0})});return{tracks:e,byId:t,folders:n,albums:r,searchText:i}}function Pd(e,t,n,r,i,a=[]){var o,s,c;if(r){let t=r.toLowerCase();return e.tracks.filter(n=>e.searchText.get(n.id).includes(t))}if(t===`playlists`){if(n===`favorites`){let t=new Set(i);return e.tracks.filter(e=>t.has(e.id))}return a.flatMap(t=>{var n;return(n=e.byId.get(t))==null?[]:n})}return n?t===`albums`?(o=e.albums.get(n))==null?[]:o:(s=(c=e.folders.get(n))==null?void 0:c.tracks)==null?[]:s:e.tracks}function Fd(e,t,n){return{name:e,path:t,parent:n,children:new Map,tracks:[],total:0}}function Id(e){let t=e.split(`/`).filter(Boolean);return t[0]===`storage`&&t[1]===`emulated`&&t[2]?[{key:t.slice(0,3).join(`/`),name:`内部存储`},...t.slice(3).map(Ld)]:t[0]===`storage`&&t[1]?[{key:t.slice(0,2).join(`/`),name:t[1]},...t.slice(2).map(Ld)]:t[0]===`sdcard`?[{key:`storage/emulated/0`,name:`内部存储`},...t.slice(1).map(Ld)]:e===`local`||!t.length?[{key:`unknown`,name:`本地音乐`}]:t.map(Ld)}function Ld(e){return{key:e,name:e}}function Rd(e,t){for(;t&&!e.has(t);)t=t.slice(0,Math.max(0,t.lastIndexOf(`/`)));return e.get(t)}function zd(e){let t=Fd(`本地音乐`,``,``),n=new Map([[``,t]]);for(let r of e){let e=t;e.total++;for(let{key:t,name:i}of Id(r.folder)){let r=e.children.get(t);r||(r=Fd(i,e.path+`/`+t,e.path),e.children.set(t,r),n.set(r.path,r)),e=r,e.total++}e.tracks.push(r)}return n}var Bd=e=>typeof e.ja==`string`?e.ja:(e.ja||[]).map(e=>e.text).join(``),Vd=e=>{let t=Math.floor(Math.max(0,e||0)/1e3);return`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}`};function Hd(e){let t=e.map((e,t)=>({cue:e,order:t})).filter(({cue:e})=>e.startMs<e.endMs).sort((e,t)=>e.cue.startMs-t.cue.startMs);function n(e){if(!e.length)return null;let t=e[e.length>>1].cue.startMs,r=[],i=[],a=[];for(let n of e)n.cue.endMs<=t?r.push(n):n.cue.startMs>t?i.push(n):a.push(n);return{center:t,left:n(r),right:n(i),byStart:a,byEnd:a.slice().sort((e,t)=>t.cue.endMs-e.cue.endMs)}}let r=n(t);return e=>{let t=[];for(let n=r;n;){let r=e<n.center;for(let i of r?n.byStart:n.byEnd){if(r?i.cue.startMs>e:i.cue.endMs<=e)break;t.push(i)}n=r?n.left:n.right}return t.sort((e,t)=>e.order-t.order).map(e=>e.cue)}}function Ud(e,t,n){let r=[Vd(e.startMs)];return(e.unlabelledText||t!==`zh`)&&r.push((e.ja||[]).map(e=>n&&e.reading?e.text+`（`+e.reading+`）`:e.text).join(``)||`暂无日文`),!e.unlabelledText&&t!==`ja`&&r.push(e.zh||`暂无中文翻译`),r.concat(`点击跳转`).join(`，`)}var Wd=(e,t)=>e-t,Gd=(e,t,n)=>Math.min(Math.max(0,n),Math.max(0,e+t));function Kd(e){let t=`dlsound/`+e+`/`;function n(){let e=[];for(let n=0;n<localStorage.length;n++){let r=localStorage.key(n);if(r!=null&&r.startsWith(t))try{let n=JSON.parse(localStorage.getItem(r));(n==null?void 0:n.key)===r.slice(t.length)&&e.push(n)}catch{}}return e}let[r,i]=(0,w.useState)(n);(0,w.useEffect)(()=>{let e=e=>{(!e.key||e.key.startsWith(t))&&i(n())};return window.addEventListener(`storage`,e),()=>window.removeEventListener(`storage`,e)},[t]);function a(e,r){try{return r?localStorage.setItem(t+e,JSON.stringify(r)):localStorage.removeItem(t+e),i(n()),!0}catch{return Nl.error(`设备存储不可用，未能保存更改`),!1}}return{rows:r,update:a}}function qd(e){var t;if(!e)return``;let n=e=>(`/`+e.replace(/^\/+/,``)).replace(/^\/sdcard\//,`/storage/emulated/0/`);if(e.folder&&e.folder!==`local`&&e.fileName)return n(e.folder.replace(/\/$/,``)+`/`+e.fileName);if(e.id.startsWith(`file://`))try{return n(decodeURIComponent(e.id.slice(7)))}catch{}if((t=e.parentDocument)!=null&&t.startsWith(`content://com.android.externalstorage.documents/document/`)&&e.fileName)try{let t=decodeURIComponent(e.parentDocument.split(`/document/`)[1]),r=t.indexOf(`:`);if(r>0){let i=t.slice(0,r),a=t.slice(r+1);return n([`/storage`,i===`primary`?`emulated/0`:i,a,e.fileName].filter(Boolean).join(`/`))}}catch{}return e.id}function Jd({marks:e,play:t,remove:n}){return e.length?(0,U.jsx)(`div`,{children:[...e].sort((e,t)=>t.created-e.created).map(e=>(0,U.jsxs)(`div`,{className:`track-row`,children:[(0,U.jsxs)(`button`,{className:`track-main`,onClick:()=>t(e),children:[(0,U.jsx)(k,{}),(0,U.jsxs)(`span`,{className:`track-copy`,children:[(0,U.jsx)(`strong`,{children:e.name}),(0,U.jsxs)(`small`,{children:[e.title,` · `,Vd(e.start),e.end===void 0?``:` – `+Vd(e.end)]})]})]}),(0,U.jsx)(q,{variant:`ghost`,size:`icon`,"aria-label":`删除书签 `+e.name,onClick:()=>n(e.key),children:(0,U.jsx)(ye,{})})]},e.key))}):(0,U.jsx)(`p`,{children:`还没有书签。播放时打开「复听与书签」，即可保存时间点或片段。`})}async function Yd(e,t,n,r=1,i=!1,a=!1){await Sd(`listen`,{track:e,start:t,end:n,passes:r,open:i,pauseAtEnd:a})}function Xd({p:e,cue:t,offset:n,marks:r,save:i,remove:a,draft:o,onDraft:s}){let[c,l]=(0,w.useState)(3),[u,d]=(0,w.useState)(``),f=e.track;if(!f)return(0,U.jsx)(`p`,{children:`请先打开音轨。`});let p=Math.min(Math.max(0,e.time),e.duration);async function m(e,t=!1){try{await Yd(f.id,e.start,e.end,c,!1,t)}catch(e){Nl.error(e.message)}}function h(t){t.start>=e.duration?Nl.error(`请先移到音轨结束之前`):i({key:Array.from(crypto.getRandomValues(new Uint32Array(4))).join(`-`),source:qd(f),title:f.title,name:u.trim()||f.title+` `+Vd(t.start),...t,created:Date.now()})&&(d(``),Nl.success(`书签已保存`))}let g=e.listenRange,_=t&&{start:Gd(t.startMs,n,e.duration),end:Gd(t.endMs,n,e.duration)};return(0,U.jsxs)(`div`,{className:`study-tools`,children:[(0,U.jsxs)(`label`,{className:`profile-choice`,children:[`播放遍数`,(0,U.jsx)(`select`,{value:c,onChange:e=>l(Number(e.target.value)),children:[1,3,5,0].map(e=>(0,U.jsx)(`option`,{value:e,children:e?e+` 遍`:`无限循环`},e))})]}),(0,U.jsx)(q,{disabled:!_||_.end<=_.start,onClick:()=>m(_),children:`复听当前句`}),t&&(0,U.jsx)(`small`,{lang:`ja`,children:Bd(t)}),(0,U.jsxs)(`div`,{className:`study-actions`,children:[(0,U.jsxs)(q,{variant:`outline`,onClick:()=>s({start:p}),children:[`设 A 点`,o?` · `+Vd(o.start):``]}),(0,U.jsxs)(q,{variant:`outline`,disabled:!o||p<=o.start,onClick:()=>s({...o,end:p}),children:[`设 B 点`,(o==null?void 0:o.end)===void 0?``:` · `+Vd(o.end)]})]}),(0,U.jsxs)(`label`,{className:`study-position`,children:[`播放位置 · `,Vd(p),(0,U.jsx)(`input`,{"aria-label":`调整取点位置`,type:`range`,min:`0`,max:e.duration||1,step:`100`,value:p,onChange:t=>e.seek(+t.target.value)})]}),(0,U.jsx)(q,{variant:`outline`,disabled:(o==null?void 0:o.end)===void 0,onClick:()=>o&&m(o),children:`播放 A–B 区间`}),g&&(0,U.jsxs)(q,{variant:`secondary`,onClick:()=>Yd(f.id).catch(e=>Nl.error(e.message)),children:[`结束复听 · `,g.passes?`剩 `+g.passes+` 遍`:`无限循环`]}),(0,U.jsx)(`h3`,{children:`保存书签`}),(0,U.jsx)(tl,{"aria-label":`书签名称`,placeholder:`书签名称（可选）`,value:u,maxLength:100,onChange:e=>d(e.target.value)}),(0,U.jsxs)(`div`,{className:`study-actions`,children:[(0,U.jsx)(q,{variant:`outline`,onClick:()=>h({start:p}),children:`保存当前时间点`}),(0,U.jsx)(q,{variant:`outline`,disabled:(o==null?void 0:o.end)===void 0,onClick:()=>o&&h(o),children:`收藏 A–B 片段`})]}),(0,U.jsx)(`h3`,{children:`本曲书签`}),(0,U.jsx)(Jd,{marks:r,remove:a,play:e=>m(e,!0)})]})}function Zd(e){return{key:e.path,name:e.name,actor:``,circle:``,version:``}}var Qd=e=>{var t;return((t=e.match(/RJ\d{5,}/i))==null?void 0:t[0].toUpperCase())||``},$d=(e,t)=>(e.discNumber||0)-(t.discNumber||0)||(e.trackNumber||0)-(t.trackNumber||0)||(e.fileName||e.title).localeCompare(t.fileName||t.title,void 0,{numeric:!0});function ef(e,t){let n=new Map;if(!e)return n;e.tracks.length&&n.set(``,[...e.tracks].sort($d));function r(e,n){if(!t.has(e.path)){for(let t of e.tracks)n.push(t);e.children.forEach(e=>r(e,n))}}return e.children.forEach(e=>{let t=[];r(e,t),t.length&&n.set(e.name,t.sort($d))}),n}function tf({directories:e,play:t}){var n,r;let i=Kd(`works`),[a,o]=(0,w.useState)(``),[s,c]=(0,w.useState)(!1),[l,u]=(0,w.useState)(``),[d,f]=(0,w.useState)(``),[p,m]=(0,w.useState)(`作品`),h=(0,w.useMemo)(()=>{let t=new Map;return e.forEach(e=>{Qd(e.name)&&t.set(e.path,Zd(e))}),i.rows.forEach(e=>t.set(e.key,e)),[...t.values()].sort((e,t)=>e.name.localeCompare(t.name,void 0,{numeric:!0}))},[e,i.rows]),g=h.find(e=>e.key===a),_=(0,w.useMemo)(()=>new Set(h.map(e=>e.key)),[h]),v=(0,w.useMemo)(()=>ef(e.get(a),_),[e,a,_]),y=g&&v.has(g.version)?g.version:(n=v.keys().next().value)==null?``:n,b=v.get(y)||[],[x,S]=(0,w.useState)({name:``,actor:``,circle:``});function C(e){u(e.key),S(e),c(!0)}if(s)return(0,U.jsxs)(`form`,{className:`study-tools`,onSubmit:t=>{if(t.preventDefault(),!e.get(l)||!x.name.trim())return;let n=h.find(e=>e.key===l);i.update(l,{key:l,name:x.name.trim(),actor:x.actor.trim(),circle:x.circle.trim(),version:(n==null?void 0:n.version)||``})&&(o(l),c(!1),Nl.success(`作品信息已保存`))},children:[(0,U.jsxs)(`label`,{className:`study-field`,children:[`作品根目录`,(0,U.jsxs)(`select`,{required:!0,disabled:!!g,"aria-label":`作品根目录`,value:l,onChange:t=>{u(t.target.value);let n=e.get(t.target.value);n&&S(h.find(e=>e.key===n.path)||Zd(n))},children:[(0,U.jsx)(`option`,{value:``,children:`选择一个音乐目录`}),[...e.values()].filter(e=>e.path).map(e=>(0,U.jsx)(`option`,{value:e.path,children:e.path},e.path))]})]}),[`name`,`actor`,`circle`].map((e,t)=>(0,U.jsxs)(`label`,{className:`study-field`,children:[[`作品名`,`声优`,`社团`][t],(0,U.jsx)(tl,{required:e===`name`,maxLength:160,value:x[e],onChange:t=>S({...x,[e]:t.target.value})})]},e)),(0,U.jsxs)(`div`,{className:`study-actions`,children:[(0,U.jsx)(q,{type:`submit`,children:`保存作品`}),(0,U.jsx)(q,{type:`button`,variant:`ghost`,onClick:()=>c(!1),children:`取消`})]}),i.rows.some(e=>e.key===l)&&(0,U.jsx)(q,{type:`button`,variant:`ghost`,onClick:()=>{i.update(l)&&(o(``),c(!1),Nl.success(`已移除本地整理信息`))},children:Qd(((r=e.get(l))==null?void 0:r.name)||``)?`重置作品信息`:`移除作品整理`})]});if(g)return(0,U.jsxs)(`div`,{className:`study-tools`,children:[(0,U.jsx)(q,{variant:`ghost`,onClick:()=>o(``),children:`返回作品列表`}),(0,U.jsx)(`h2`,{children:g.name}),(0,U.jsx)(`small`,{children:[Qd(g.key.split(`/`).pop()||``),g.actor&&`声优 `+g.actor,g.circle&&`社团 `+g.circle].filter(Boolean).join(` · `)}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>C(g),children:`编辑作品信息`}),b.length?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`label`,{className:`profile-choice`,children:[`偏好版本`,(0,U.jsx)(`select`,{"aria-label":`偏好版本`,value:y,onChange:e=>i.update(g.key,{...g,version:e.target.value}),children:[...v.keys()].map(e=>(0,U.jsx)(`option`,{value:e,children:e||`根目录音轨`},e))})]}),(0,U.jsxs)(q,{onClick:()=>t(b[0],b),children:[`播放此版本 · `,b.length,` 首`]}),b.map((e,n)=>(0,U.jsxs)(`button`,{className:`track-main`,onClick:()=>t(e,b),children:[(0,U.jsx)(`span`,{className:`track-number`,children:n+1}),e.title]},e.id))]}):(0,U.jsx)(`p`,{children:`作品目录里没有可读取的音轨。请检查存储设备并刷新曲库。`})]});let T=d.trim().toLowerCase(),E=new Map;return h.filter(e=>[e.name,e.actor,e.circle,Qd(e.key)].some(e=>e.toLowerCase().includes(T))).forEach(e=>{let t=p===`声优`?e.actor.split(/[,，、;；]/).map(e=>e.trim()).filter(Boolean):[p===`社团`?e.circle:``];for(let n of new Set(t.length?t:[``])){let t=E.get(n)||[];t.push(e),E.set(n,t)}}),(0,U.jsxs)(`div`,{className:`study-tools`,children:[(0,U.jsx)(q,{variant:`outline`,onClick:()=>{u(``),S({name:``,actor:``,circle:``}),c(!0)},children:`指定作品根目录`}),(0,U.jsx)(tl,{"aria-label":`搜索作品`,placeholder:`作品名、RJ 编号、声优或社团`,value:d,onChange:e=>f(e.target.value)}),(0,U.jsxs)(`label`,{className:`profile-choice`,children:[`分组方式`,(0,U.jsx)(`select`,{value:p,onChange:e=>m(e.target.value),children:[`作品`,`声优`,`社团`].map(e=>(0,U.jsx)(`option`,{children:e},e))})]}),!E.size&&(0,U.jsx)(`p`,{children:T?`没有匹配的作品。`:`选择作品根目录即可开始整理；名称带 RJ 编号的目录会自动出现在这里。`}),[...E].sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>(0,U.jsxs)(`section`,{children:[p!==`作品`&&(0,U.jsx)(`h3`,{children:e||`未填写`+p}),t.map(e=>(0,U.jsxs)(`button`,{className:`folder-row`,onClick:()=>o(e.key),children:[(0,U.jsx)(ne,{}),(0,U.jsx)(`strong`,{children:e.name}),(0,U.jsx)(`small`,{children:e.actor})]},e.key))]},e))]})}var nf=`                    GNU GENERAL PUBLIC LICENSE
                       Version 3, 29 June 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <http://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU General Public License is a free, copyleft license for
software and other kinds of works.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
the GNU General Public License is intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.  We, the Free Software Foundation, use the
GNU General Public License for most of our software; it applies also to
any other work released this way by its authors.  You can apply it to
your programs, too.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  To protect your rights, we need to prevent others from denying you
these rights or asking you to surrender the rights.  Therefore, you have
certain responsibilities if you distribute copies of the software, or if
you modify it: responsibilities to respect the freedom of others.

  For example, if you distribute copies of such a program, whether
gratis or for a fee, you must pass on to the recipients the same
freedoms that you received.  You must make sure that they, too, receive
or can get the source code.  And you must show them these terms so they
know their rights.

  Developers that use the GNU GPL protect your rights with two steps:
(1) assert copyright on the software, and (2) offer you this License
giving you legal permission to copy, distribute and/or modify it.

  For the developers' and authors' protection, the GPL clearly explains
that there is no warranty for this free software.  For both users' and
authors' sake, the GPL requires that modified versions be marked as
changed, so that their problems will not be attributed erroneously to
authors of previous versions.

  Some devices are designed to deny users access to install or run
modified versions of the software inside them, although the manufacturer
can do so.  This is fundamentally incompatible with the aim of
protecting users' freedom to change the software.  The systematic
pattern of such abuse occurs in the area of products for individuals to
use, which is precisely where it is most unacceptable.  Therefore, we
have designed this version of the GPL to prohibit the practice for those
products.  If such problems arise substantially in other domains, we
stand ready to extend this provision to those domains in future versions
of the GPL, as needed to protect the freedom of users.

  Finally, every program is threatened constantly by software patents.
States should not allow patents to restrict development and use of
software on general-purpose computers, but in those that do, we wish to
avoid the special danger that patents applied to a free program could
make it effectively proprietary.  To prevent this, the GPL assures that
patents cannot be used to render the program non-free.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Use with the GNU Affero General Public License.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU Affero General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the special requirements of the GNU Affero General Public License,
section 13, concerning interaction through a network will apply to the
combination as such.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU General Public License from time to time.  Such new versions will
be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If the program does terminal interaction, make it output a short
notice like this when it starts in an interactive mode:

    <program>  Copyright (C) <year>  <name of author>
    This program comes with ABSOLUTELY NO WARRANTY; for details type \`show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type \`show c' for details.

The hypothetical commands \`show w' and \`show c' should show the appropriate
parts of the General Public License.  Of course, your program's commands
might be different; for a GUI interface, you would use an "about box".

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU GPL, see
<http://www.gnu.org/licenses/>.

  The GNU General Public License does not permit incorporating your program
into proprietary programs.  If your program is a subroutine library, you
may consider it more useful to permit linking proprietary applications with
the library.  If this is what you want to do, use the GNU Lesser General
Public License instead of this License.  But first, please read
<http://www.gnu.org/philosophy/why-not-lgpl.html>.
`,rf=`    
                                     Apache License
                               Version 2.0, January 2004
                            http://www.apache.org/licenses/
    
       TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
    
       1. Definitions.
    
          "License" shall mean the terms and conditions for use, reproduction,
          and distribution as defined by Sections 1 through 9 of this document.
    
          "Licensor" shall mean the copyright owner or entity authorized by
          the copyright owner that is granting the License.
    
          "Legal Entity" shall mean the union of the acting entity and all
          other entities that control, are controlled by, or are under common
          control with that entity. For the purposes of this definition,
          "control" means (i) the power, direct or indirect, to cause the
          direction or management of such entity, whether by contract or
          otherwise, or (ii) ownership of fifty percent (50%) or more of the
          outstanding shares, or (iii) beneficial ownership of such entity.
    
          "You" (or "Your") shall mean an individual or Legal Entity
          exercising permissions granted by this License.
    
          "Source" form shall mean the preferred form for making modifications,
          including but not limited to software source code, documentation
          source, and configuration files.
    
          "Object" form shall mean any form resulting from mechanical
          transformation or translation of a Source form, including but
          not limited to compiled object code, generated documentation,
          and conversions to other media types.
    
          "Work" shall mean the work of authorship, whether in Source or
          Object form, made available under the License, as indicated by a
          copyright notice that is included in or attached to the work
          (an example is provided in the Appendix below).
    
          "Derivative Works" shall mean any work, whether in Source or Object
          form, that is based on (or derived from) the Work and for which the
          editorial revisions, annotations, elaborations, or other modifications
          represent, as a whole, an original work of authorship. For the purposes
          of this License, Derivative Works shall not include works that remain
          separable from, or merely link (or bind by name) to the interfaces of,
          the Work and Derivative Works thereof.
    
          "Contribution" shall mean any work of authorship, including
          the original version of the Work and any modifications or additions
          to that Work or Derivative Works thereof, that is intentionally
          submitted to Licensor for inclusion in the Work by the copyright owner
          or by an individual or Legal Entity authorized to submit on behalf of
          the copyright owner. For the purposes of this definition, "submitted"
          means any form of electronic, verbal, or written communication sent
          to the Licensor or its representatives, including but not limited to
          communication on electronic mailing lists, source code control systems,
          and issue tracking systems that are managed by, or on behalf of, the
          Licensor for the purpose of discussing and improving the Work, but
          excluding communication that is conspicuously marked or otherwise
          designated in writing by the copyright owner as "Not a Contribution."
    
          "Contributor" shall mean Licensor and any individual or Legal Entity
          on behalf of whom a Contribution has been received by Licensor and
          subsequently incorporated within the Work.
    
       2. Grant of Copyright License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          copyright license to reproduce, prepare Derivative Works of,
          publicly display, publicly perform, sublicense, and distribute the
          Work and such Derivative Works in Source or Object form.
    
       3. Grant of Patent License. Subject to the terms and conditions of
          this License, each Contributor hereby grants to You a perpetual,
          worldwide, non-exclusive, no-charge, royalty-free, irrevocable
          (except as stated in this section) patent license to make, have made,
          use, offer to sell, sell, import, and otherwise transfer the Work,
          where such license applies only to those patent claims licensable
          by such Contributor that are necessarily infringed by their
          Contribution(s) alone or by combination of their Contribution(s)
          with the Work to which such Contribution(s) was submitted. If You
          institute patent litigation against any entity (including a
          cross-claim or counterclaim in a lawsuit) alleging that the Work
          or a Contribution incorporated within the Work constitutes direct
          or contributory patent infringement, then any patent licenses
          granted to You under this License for that Work shall terminate
          as of the date such litigation is filed.
    
       4. Redistribution. You may reproduce and distribute copies of the
          Work or Derivative Works thereof in any medium, with or without
          modifications, and in Source or Object form, provided that You
          meet the following conditions:
    
          (a) You must give any other recipients of the Work or
              Derivative Works a copy of this License; and
    
          (b) You must cause any modified files to carry prominent notices
              stating that You changed the files; and
    
          (c) You must retain, in the Source form of any Derivative Works
              that You distribute, all copyright, patent, trademark, and
              attribution notices from the Source form of the Work,
              excluding those notices that do not pertain to any part of
              the Derivative Works; and
    
          (d) If the Work includes a "NOTICE" text file as part of its
              distribution, then any Derivative Works that You distribute must
              include a readable copy of the attribution notices contained
              within such NOTICE file, excluding those notices that do not
              pertain to any part of the Derivative Works, in at least one
              of the following places: within a NOTICE text file distributed
              as part of the Derivative Works; within the Source form or
              documentation, if provided along with the Derivative Works; or,
              within a display generated by the Derivative Works, if and
              wherever such third-party notices normally appear. The contents
              of the NOTICE file are for informational purposes only and
              do not modify the License. You may add Your own attribution
              notices within Derivative Works that You distribute, alongside
              or as an addendum to the NOTICE text from the Work, provided
              that such additional attribution notices cannot be construed
              as modifying the License.
    
          You may add Your own copyright statement to Your modifications and
          may provide additional or different license terms and conditions
          for use, reproduction, or distribution of Your modifications, or
          for any such Derivative Works as a whole, provided Your use,
          reproduction, and distribution of the Work otherwise complies with
          the conditions stated in this License.
    
       5. Submission of Contributions. Unless You explicitly state otherwise,
          any Contribution intentionally submitted for inclusion in the Work
          by You to the Licensor shall be under the terms and conditions of
          this License, without any additional terms or conditions.
          Notwithstanding the above, nothing herein shall supersede or modify
          the terms of any separate license agreement you may have executed
          with Licensor regarding such Contributions.
    
       6. Trademarks. This License does not grant permission to use the trade
          names, trademarks, service marks, or product names of the Licensor,
          except as required for reasonable and customary use in describing the
          origin of the Work and reproducing the content of the NOTICE file.
    
       7. Disclaimer of Warranty. Unless required by applicable law or
          agreed to in writing, Licensor provides the Work (and each
          Contributor provides its Contributions) on an "AS IS" BASIS,
          WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
          implied, including, without limitation, any warranties or conditions
          of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
          PARTICULAR PURPOSE. You are solely responsible for determining the
          appropriateness of using or redistributing the Work and assume any
          risks associated with Your exercise of permissions under this License.
    
       8. Limitation of Liability. In no event and under no legal theory,
          whether in tort (including negligence), contract, or otherwise,
          unless required by applicable law (such as deliberate and grossly
          negligent acts) or agreed to in writing, shall any Contributor be
          liable to You for damages, including any direct, indirect, special,
          incidental, or consequential damages of any character arising as a
          result of this License or out of the use or inability to use the
          Work (including but not limited to damages for loss of goodwill,
          work stoppage, computer failure or malfunction, or any and all
          other commercial damages or losses), even if such Contributor
          has been advised of the possibility of such damages.
    
       9. Accepting Warranty or Additional Liability. While redistributing
          the Work or Derivative Works thereof, You may choose to offer,
          and charge a fee for, acceptance of support, warranty, indemnity,
          or other liability obligations and/or rights consistent with this
          License. However, in accepting such obligations, You may act only
          on Your own behalf and on Your sole responsibility, not on behalf
          of any other Contributor, and only if You agree to indemnify,
          defend, and hold each Contributor harmless for any liability
          incurred by, or claims asserted against, such Contributor by reason
          of your accepting any such warranty or additional liability.
    
       END OF TERMS AND CONDITIONS
    
       APPENDIX: How to apply the Apache License to your work.
    
          To apply the Apache License to your work, attach the following
          boilerplate notice, with the fields enclosed by brackets "[]"
          replaced with your own identifying information. (Don't include
          the brackets!)  The text should be enclosed in the appropriate
          comment syntax for the file format. We also recommend that a
          file or class name and description of purpose be included on the
          same "printed page" as the copyright notice for easier
          identification within third-party archives.
    
       Copyright [yyyy] [name of copyright owner]
    
       Licensed under the Apache License, Version 2.0 (the "License");
       you may not use this file except in compliance with the License.
       You may obtain a copy of the License at
    
           http://www.apache.org/licenses/LICENSE-2.0
    
       Unless required by applicable law or agreed to in writing, software
       distributed under the License is distributed on an "AS IS" BASIS,
       WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       See the License for the specific language governing permissions and
       limitations under the License.
    
`,af=`# Kuromoji Japanese Morphological Analyzer

Copyright 2010-2015 Atilika Inc. and contributors (see \`CONTRIBUTORS.md\`)

This software also includes a binary and/or source version of data from
\`mecab-ipadic-2.7.0-20070801\`, which can be obtained from 

- http://atilika.com/releases/mecab-ipadic/mecab-ipadic-2.7.0-20070801.tar.gz
- http://jaist.dl.sourceforge.net/project/mecab/mecab-ipadic/2.7.0-20070801/mecab-ipadic-2.7.0-20070801.tar.gz

## mecab-ipadic-2.7.0-20070801 Notice

    Nara Institute of Science and Technology (NAIST),
    the copyright holders, disclaims all warranties with regard to this
    software, including all implied warranties of merchantability and
    fitness, in no event shall NAIST be liable for
    any special, indirect or consequential damages or any damages
    whatsoever resulting from loss of use, data or profits, whether in an
    action of contract, negligence or other tortuous action, arising out
    of or in connection with the use or performance of this software.

    A large portion of the dictionary entries
    originate from ICOT Free Software.  The following conditions for ICOT
    Free Software applies to the current dictionary as well.

    Each User may also freely distribute the Program, whether in its
    original form or modified, to any third party or parties, PROVIDED
    that the provisions of Section 3 ("NO WARRANTY") will ALWAYS appear
    on, or be attached to, the Program, which is distributed substantially
    in the same form as set out herein and that such intended
    distribution, if actually made, will neither violate or otherwise
    contravene any of the laws and regulations of the countries having
    jurisdiction over the User or the intended distribution itself.

    NO WARRANTY

    The program was produced on an experimental basis in the course of the
    research and development conducted during the project and is provided
    to users as so produced on an experimental basis.  Accordingly, the
    program is provided without any warranty whatsoever, whether express,
    implied, statutory or otherwise.  The term "warranty" used herein
    includes, but is not limited to, any warranty of the quality,
    performance, merchantability and fitness for a particular purpose of
    the program and the nonexistence of any infringement or violation of
    any right of any third party.

    Each user of the program will agree and understand, and be deemed to
    have agreed and understood, that there is no warranty whatsoever for
    the program and, accordingly, the entire risk arising from or
    otherwise connected with the program is assumed by the user.

    Therefore, neither ICOT, the copyright holder, or any other
    organization that participated in or was otherwise related to the
    development of the program and their respective officials, directors,
    officers and other employees shall be held liable for any and all
    damages, including, without limitation, general, special, incidental
    and consequential damages, arising out of or otherwise in connection
    with the use or inability to use the program or any product, material
    or result produced or otherwise obtained by using the program,
    regardless of whether they have been advised of, or otherwise had
    knowledge of, the possibility of such damages at any time during the
    project or thereafter.  Each user will be deemed to have agreed to the
    foregoing by his or her commencement of use of the program.  The term
    "use" as used herein includes, but is not limited to, the use,
    modification, copying and distribution of the program and the
    production of secondary products from the program.

    In the case where the program, whether in its original form or
    modified, was distributed or delivered to or received by a user from
    any person, organization or entity other than ICOT, unless it makes or
    grants independently of ICOT any specific warranty to the user in
    writing, such person, organization or entity, will also be exempted
    from and not be held liable to the user for any such damages as noted
    above as far as the program is concerned.
`,of=`# Bundled UI third-party notices\r
\r
The UI reuses the design project's installed packages. This file records local package metadata and license files without downloading anything. The authoritative versions are in package-lock.json.\r
\r
## @floating-ui/core 1.8.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2021-present Floating UI contributors\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of\r
this software and associated documentation files (the "Software"), to deal in\r
the Software without restriction, including without limitation the rights to\r
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\r
the Software, and to permit persons to whom the Software is furnished to do so,\r
subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\r
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\r
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\r
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\r
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r
\`\`\`\r
\r
## @floating-ui/dom 1.8.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2021-present Floating UI contributors\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of\r
this software and associated documentation files (the "Software"), to deal in\r
the Software without restriction, including without limitation the rights to\r
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\r
the Software, and to permit persons to whom the Software is furnished to do so,\r
subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\r
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\r
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\r
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\r
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r
\`\`\`\r
\r
## @floating-ui/react-dom 2.1.9\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2021-present Floating UI contributors\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of\r
this software and associated documentation files (the "Software"), to deal in\r
the Software without restriction, including without limitation the rights to\r
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\r
the Software, and to permit persons to whom the Software is furnished to do so,\r
subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\r
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\r
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\r
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\r
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r
\`\`\`\r
\r
## @floating-ui/utils 0.2.12\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2021-present Floating UI contributors\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of\r
this software and associated documentation files (the "Software"), to deal in\r
the Software without restriction, including without limitation the rights to\r
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\r
the Software, and to permit persons to whom the Software is furnished to do so,\r
subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\r
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\r
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\r
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\r
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/number 1.1.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/primitive 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-accessible-icon 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-accordion 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-alert-dialog 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-arrow 1.1.17\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-aspect-ratio 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-avatar 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-checkbox 1.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-collapsible 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-collection 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-compose-refs 1.1.5\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-context 1.3.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-context-menu 2.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-dialog 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-direction 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-dismissable-layer 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-dropdown-menu 2.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-focus-guards 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-focus-scope 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-form 0.3.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-hover-card 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-id 1.1.4\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-label 2.1.17\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-menu 2.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-menubar 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-navigation-menu 1.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-one-time-password-field 0.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-password-toggle-field 0.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-popover 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-popper 1.4.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-portal 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-presence 1.1.11\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-primitive 2.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-progress 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-radio-group 1.5.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-roving-focus 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-scroll-area 1.4.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-select 2.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-separator 1.2.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-slider 1.6.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-slot 1.5.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-switch 1.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-tabs 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-toast 1.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-toggle 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-toggle-group 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-toolbar 1.2.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-tooltip 1.4.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-callback-ref 1.1.5\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-controllable-state 1.3.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-effect-event 0.0.5\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-escape-keydown 1.1.6\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-is-hydrated 0.1.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-layout-effect 1.1.4\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-previous 1.1.4\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-rect 1.1.4\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-use-size 1.1.5\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/react-visually-hidden 1.2.13\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @radix-ui/rect 1.1.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## @types/react 19.3.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
    Copyright (c) Microsoft Corporation.\r
\r
    Permission is hereby granted, free of charge, to any person obtaining a copy\r
    of this software and associated documentation files (the "Software"), to deal\r
    in the Software without restriction, including without limitation the rights\r
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
    copies of the Software, and to permit persons to whom the Software is\r
    furnished to do so, subject to the following conditions:\r
\r
    The above copyright notice and this permission notice shall be included in all\r
    copies or substantial portions of the Software.\r
\r
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
    SOFTWARE\r
\`\`\`\r
\r
## @types/react-dom 19.3.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
    Copyright (c) Microsoft Corporation.\r
\r
    Permission is hereby granted, free of charge, to any person obtaining a copy\r
    of this software and associated documentation files (the "Software"), to deal\r
    in the Software without restriction, including without limitation the rights\r
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
    copies of the Software, and to permit persons to whom the Software is\r
    furnished to do so, subject to the following conditions:\r
\r
    The above copyright notice and this permission notice shall be included in all\r
    copies or substantial portions of the Software.\r
\r
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
    SOFTWARE\r
\`\`\`\r
\r
## aria-hidden 1.2.6\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## class-variance-authority 0.7.1\r
\r
License: Apache-2.0\r
\r
\`\`\`text\r
Apache License\r
                           Version 2.0, January 2004\r
                        http://www.apache.org/licenses/\r
\r
   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION\r
\r
   1. Definitions.\r
\r
      "License" shall mean the terms and conditions for use, reproduction,\r
      and distribution as defined by Sections 1 through 9 of this document.\r
\r
      "Licensor" shall mean the copyright owner or entity authorized by\r
      the copyright owner that is granting the License.\r
\r
      "Legal Entity" shall mean the union of the acting entity and all\r
      other entities that control, are controlled by, or are under common\r
      control with that entity. For the purposes of this definition,\r
      "control" means (i) the power, direct or indirect, to cause the\r
      direction or management of such entity, whether by contract or\r
      otherwise, or (ii) ownership of fifty percent (50%) or more of the\r
      outstanding shares, or (iii) beneficial ownership of such entity.\r
\r
      "You" (or "Your") shall mean an individual or Legal Entity\r
      exercising permissions granted by this License.\r
\r
      "Source" form shall mean the preferred form for making modifications,\r
      including but not limited to software source code, documentation\r
      source, and configuration files.\r
\r
      "Object" form shall mean any form resulting from mechanical\r
      transformation or translation of a Source form, including but\r
      not limited to compiled object code, generated documentation,\r
      and conversions to other media types.\r
\r
      "Work" shall mean the work of authorship, whether in Source or\r
      Object form, made available under the License, as indicated by a\r
      copyright notice that is included in or attached to the work\r
      (an example is provided in the Appendix below).\r
\r
      "Derivative Works" shall mean any work, whether in Source or Object\r
      form, that is based on (or derived from) the Work and for which the\r
      editorial revisions, annotations, elaborations, or other modifications\r
      represent, as a whole, an original work of authorship. For the purposes\r
      of this License, Derivative Works shall not include works that remain\r
      separable from, or merely link (or bind by name) to the interfaces of,\r
      the Work and Derivative Works thereof.\r
\r
      "Contribution" shall mean any work of authorship, including\r
      the original version of the Work and any modifications or additions\r
      to that Work or Derivative Works thereof, that is intentionally\r
      submitted to Licensor for inclusion in the Work by the copyright owner\r
      or by an individual or Legal Entity authorized to submit on behalf of\r
      the copyright owner. For the purposes of this definition, "submitted"\r
      means any form of electronic, verbal, or written communication sent\r
      to the Licensor or its representatives, including but not limited to\r
      communication on electronic mailing lists, source code control systems,\r
      and issue tracking systems that are managed by, or on behalf of, the\r
      Licensor for the purpose of discussing and improving the Work, but\r
      excluding communication that is conspicuously marked or otherwise\r
      designated in writing by the copyright owner as "Not a Contribution."\r
\r
      "Contributor" shall mean Licensor and any individual or Legal Entity\r
      on behalf of whom a Contribution has been received by Licensor and\r
      subsequently incorporated within the Work.\r
\r
   2. Grant of Copyright License. Subject to the terms and conditions of\r
      this License, each Contributor hereby grants to You a perpetual,\r
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\r
      copyright license to reproduce, prepare Derivative Works of,\r
      publicly display, publicly perform, sublicense, and distribute the\r
      Work and such Derivative Works in Source or Object form.\r
\r
   3. Grant of Patent License. Subject to the terms and conditions of\r
      this License, each Contributor hereby grants to You a perpetual,\r
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable\r
      (except as stated in this section) patent license to make, have made,\r
      use, offer to sell, sell, import, and otherwise transfer the Work,\r
      where such license applies only to those patent claims licensable\r
      by such Contributor that are necessarily infringed by their\r
      Contribution(s) alone or by combination of their Contribution(s)\r
      with the Work to which such Contribution(s) was submitted. If You\r
      institute patent litigation against any entity (including a\r
      cross-claim or counterclaim in a lawsuit) alleging that the Work\r
      or a Contribution incorporated within the Work constitutes direct\r
      or contributory patent infringement, then any patent licenses\r
      granted to You under this License for that Work shall terminate\r
      as of the date such litigation is filed.\r
\r
   4. Redistribution. You may reproduce and distribute copies of the\r
      Work or Derivative Works thereof in any medium, with or without\r
      modifications, and in Source or Object form, provided that You\r
      meet the following conditions:\r
\r
      (a) You must give any other recipients of the Work or\r
          Derivative Works a copy of this License; and\r
\r
      (b) You must cause any modified files to carry prominent notices\r
          stating that You changed the files; and\r
\r
      (c) You must retain, in the Source form of any Derivative Works\r
          that You distribute, all copyright, patent, trademark, and\r
          attribution notices from the Source form of the Work,\r
          excluding those notices that do not pertain to any part of\r
          the Derivative Works; and\r
\r
      (d) If the Work includes a "NOTICE" text file as part of its\r
          distribution, then any Derivative Works that You distribute must\r
          include a readable copy of the attribution notices contained\r
          within such NOTICE file, excluding those notices that do not\r
          pertain to any part of the Derivative Works, in at least one\r
          of the following places: within a NOTICE text file distributed\r
          as part of the Derivative Works; within the Source form or\r
          documentation, if provided along with the Derivative Works; or,\r
          within a display generated by the Derivative Works, if and\r
          wherever such third-party notices normally appear. The contents\r
          of the NOTICE file are for informational purposes only and\r
          do not modify the License. You may add Your own attribution\r
          notices within Derivative Works that You distribute, alongside\r
          or as an addendum to the NOTICE text from the Work, provided\r
          that such additional attribution notices cannot be construed\r
          as modifying the License.\r
\r
      You may add Your own copyright statement to Your modifications and\r
      may provide additional or different license terms and conditions\r
      for use, reproduction, or distribution of Your modifications, or\r
      for any such Derivative Works as a whole, provided Your use,\r
      reproduction, and distribution of the Work otherwise complies with\r
      the conditions stated in this License.\r
\r
   5. Submission of Contributions. Unless You explicitly state otherwise,\r
      any Contribution intentionally submitted for inclusion in the Work\r
      by You to the Licensor shall be under the terms and conditions of\r
      this License, without any additional terms or conditions.\r
      Notwithstanding the above, nothing herein shall supersede or modify\r
      the terms of any separate license agreement you may have executed\r
      with Licensor regarding such Contributions.\r
\r
   6. Trademarks. This License does not grant permission to use the trade\r
      names, trademarks, service marks, or product names of the Licensor,\r
      except as required for reasonable and customary use in describing the\r
      origin of the Work and reproducing the content of the NOTICE file.\r
\r
   7. Disclaimer of Warranty. Unless required by applicable law or\r
      agreed to in writing, Licensor provides the Work (and each\r
      Contributor provides its Contributions) on an "AS IS" BASIS,\r
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or\r
      implied, including, without limitation, any warranties or conditions\r
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A\r
      PARTICULAR PURPOSE. You are solely responsible for determining the\r
      appropriateness of using or redistributing the Work and assume any\r
      risks associated with Your exercise of permissions under this License.\r
\r
   8. Limitation of Liability. In no event and under no legal theory,\r
      whether in tort (including negligence), contract, or otherwise,\r
      unless required by applicable law (such as deliberate and grossly\r
      negligent acts) or agreed to in writing, shall any Contributor be\r
      liable to You for damages, including any direct, indirect, special,\r
      incidental, or consequential damages of any character arising as a\r
      result of this License or out of the use or inability to use the\r
      Work (including but not limited to damages for loss of goodwill,\r
      work stoppage, computer failure or malfunction, or any and all\r
      other commercial damages or losses), even if such Contributor\r
      has been advised of the possibility of such damages.\r
\r
   9. Accepting Warranty or Additional Liability. While redistributing\r
      the Work or Derivative Works thereof, You may choose to offer,\r
      and charge a fee for, acceptance of support, warranty, indemnity,\r
      or other liability obligations and/or rights consistent with this\r
      License. However, in accepting such obligations, You may act only\r
      on Your own behalf and on Your sole responsibility, not on behalf\r
      of any other Contributor, and only if You agree to indemnify,\r
      defend, and hold each Contributor harmless for any liability\r
      incurred by, or claims asserted against, such Contributor by reason\r
      of your accepting any such warranty or additional liability.\r
\r
   END OF TERMS AND CONDITIONS\r
\r
   Copyright 2022 Joe Bell\r
\r
   Licensed under the Apache License, Version 2.0 (the "License");\r
   you may not use this file except in compliance with the License.\r
   You may obtain a copy of the License at\r
\r
       http://www.apache.org/licenses/LICENSE-2.0\r
\r
   Unless required by applicable law or agreed to in writing, software\r
   distributed under the License is distributed on an "AS IS" BASIS,\r
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\r
   See the License for the specific language governing permissions and\r
   limitations under the License.\r
\`\`\`\r
\r
## clsx 2.1.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\r
\`\`\`\r
\r
## cn 0.5.2\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2026 shadcn\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## csstype 3.2.3\r
\r
License: MIT\r
\r
\`\`\`text\r
Copyright (c) 2017-2018 Fredrik Nicol\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## detect-node-es 1.1.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Ilya Kantor\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## get-nonce 1.0.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2020 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## lucide-react 0.577.0\r
\r
License: ISC\r
\r
\`\`\`text\r
ISC License\r
\r
Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2026 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2026.\r
\r
Permission to use, copy, modify, and/or distribute this software for any\r
purpose with or without fee is hereby granted, provided that the above\r
copyright notice and this permission notice appear in all copies.\r
\r
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES\r
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF\r
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR\r
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES\r
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN\r
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF\r
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.\r
\r
---\r
\r
The MIT License (MIT) (for portions derived from Feather)\r
\r
Copyright (c) 2013-2026 Cole Bemis\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## next-themes 0.4.6\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 Paco Coursey\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## radix-ui 1.8.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2022 WorkOS\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## react 19.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) Meta Platforms, Inc. and affiliates.\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## react-dom 19.3.1\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) Meta Platforms, Inc. and affiliates.\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## react-remove-scroll 2.7.2\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## react-remove-scroll-bar 2.3.8\r
\r
License: MIT\r
\r
## react-style-singleton 2.2.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## scheduler 0.28.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) Meta Platforms, Inc. and affiliates.\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## sonner 2.0.8\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2023 Emil Kowalski\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## tailwind-merge 3.7.0\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2021 Dany Castillo\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## tslib 2.9.1\r
\r
License: 0BSD\r
\r
\`\`\`text\r
Copyright (c) Microsoft Corporation.\r
\r
Permission to use, copy, modify, and/or distribute this software for any\r
purpose with or without fee is hereby granted.\r
\r
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH\r
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY\r
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,\r
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM\r
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR\r
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR\r
PERFORMANCE OF THIS SOFTWARE.\r
\`\`\`\r
\r
## use-callback-ref 1.3.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
\r
## use-sidecar 1.1.3\r
\r
License: MIT\r
\r
\`\`\`text\r
MIT License\r
\r
Copyright (c) 2017 Anton Korzunov\r
\r
Permission is hereby granted, free of charge, to any person obtaining a copy\r
of this software and associated documentation files (the "Software"), to deal\r
in the Software without restriction, including without limitation the rights\r
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell\r
copies of the Software, and to permit persons to whom the Software is\r
furnished to do so, subject to the following conditions:\r
\r
The above copyright notice and this permission notice shall be included in all\r
copies or substantial portions of the Software.\r
\r
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\r
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\r
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\r
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\r
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\r
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\r
SOFTWARE.\r
\`\`\`\r
`,sf=`data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2072%2072'%3e%3cdefs%3e%3clinearGradient%20id='g'%20x2='1'%20y2='1'%20gradientUnits='objectBoundingBox'%3e%3cstop%20stop-color='%235869db'/%3e%3cstop%20offset='1'%20stop-color='%23343fa3'/%3e%3c/linearGradient%3e%3c/defs%3e%3crect%20width='72'%20height='72'%20fill='url(%23g)'/%3e%3cpath%20fill='%23fafaff'%20fill-rule='evenodd'%20d='M21,16.5%20H36.4%20C49.4,16.5%2058.4,23.1%2058.4,34.4%20C58.4,47.5%2048.6,55.5%2034.1,55.5%20H14.7%20Q12.7,55.5%2013.1,53.4%20L19,18.2%20Q19.3,16.5%2021,16.5%20Z%20M27.3,27.3%20L35.6,24.3%20L32.4,40.9%20H45.6%20L42.6,47.2%20H23.6%20Z'/%3e%3c/svg%3e`,cf={marks:`我的书签`,works:`作品库`,me:`我的`,settings:`设置`,about:`关于`,playback:`播放`,subtitles:`字幕与读音`,appearance:`外观`,files:`文件与曲库`,track:`音轨字幕设置`,licenses:`开源许可`,statements:`第三方声明`,gpl:`GNU GPL v3`,kuromoji:`Kuromoji 许可证`,ipadic:`IPADIC 词典声明`,ui:`界面组件声明`},lf={gpl:nf,kuromoji:rf,ipadic:af,ui:of};function uf({label:e,detail:t,value:n,icon:r,action:i,disabled:a=!1}){return(0,U.jsxs)(`button`,{className:`profile-row`,"aria-label":[e,n,t].filter(Boolean).join(`，`),onClick:i,disabled:a,children:[r&&(0,U.jsx)(r,{}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:e}),t&&(0,U.jsx)(`small`,{children:t})]}),n&&(0,U.jsx)(`small`,{children:n}),(0,U.jsx)(A,{})]})}function df({page:e,p:t,go:n,panel:r,tree:i,changeTree:a}){let[o,s]=(0,w.useState)(!1),[c,l]=(0,w.useState)(``),[u,d]=(0,w.useState)(!1);async function f(){s(!0),l(`正在检查更新…`),d(!1);try{let e=await Sd(`checkUpdate`);l(e.message),d(e.available)}catch{l(`未能连接到 GitHub，请稍后重试。`)}finally{s(!1)}}let p={system:`跟随系统`,light:`浅色`,dark:`深色`}[t.prefs.theme];return e===`me`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`div`,{className:`profile-identity`,children:[(0,U.jsx)(`div`,{className:`profile-avatar`,children:(0,U.jsx)(xe,{})}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`h2`,{children:`本地用户`}),(0,U.jsx)(`small`,{children:`偏好保存在此设备`})]})]}),(0,U.jsx)(uf,{label:`我的书签`,detail:`回听已保存的时间点和片段`,icon:O,action:()=>n(`marks`)}),(0,U.jsx)(uf,{label:`设置`,detail:`播放、字幕与文件访问`,icon:he,action:()=>n(`settings`)}),(0,U.jsx)(uf,{label:`关于 DL Sound`,detail:`版本、更新与开源许可`,icon:L,action:()=>n(`about`)})]}):e===`settings`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`h2`,{children:`全局偏好`}),(0,U.jsx)(uf,{label:`播放`,detail:`速度、顺序与睡眠定时`,icon:Se,value:t.prefs.speed+`×`,action:()=>n(`playback`)}),(0,U.jsx)(uf,{label:`字幕与读音`,detail:`语言、假名与字幕样式`,icon:R,value:t.prefs.language===`both`?`日中双语`:t.prefs.language===`ja`?`日文`:`中文`,action:()=>n(`subtitles`)}),(0,U.jsx)(uf,{label:`外观`,icon:ge,value:p,action:()=>n(`appearance`)}),(0,U.jsx)(uf,{label:`文件与曲库`,detail:`目录授权、浏览方式与刷新`,icon:I,action:()=>n(`files`)}),(0,U.jsx)(`h2`,{children:`仅对当前音轨生效`}),(0,U.jsx)(uf,{label:`音轨字幕设置`,detail:t.track?`《`+t.track.title+`》的字幕和读音修正`:`播放一首音轨后可设置字幕`,icon:ee,disabled:!t.track,action:()=>n(`track`)})]}):e===`appearance`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`h2`,{children:`显示`}),(0,U.jsx)(uf,{label:`主题`,value:p,icon:ge,action:()=>r(`theme`)})]}):e===`files`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`h2`,{children:`访问权限`}),(0,U.jsx)(uf,{label:`音乐库访问`,detail:`读取设备中的音频`,value:t.mediaPermission?`已允许`:`未授权`,action:t.requestMedia}),t.videoOptional&&(0,U.jsx)(uf,{label:`视频容器音频`,detail:`需要浏览 MP4 等视频文件时开启`,value:t.videoGranted?`已允许`:`未授权`,action:t.requestVideo}),(0,U.jsx)(uf,{label:`字幕目录`,detail:`匹配同目录的字幕`,value:t.treeGranted?`已选择`:`选择目录`,action:t.requestTree}),(0,U.jsx)(`h2`,{children:`迁移数据`}),(0,U.jsx)(uf,{label:`导出备份`,detail:`歌单、收藏、偏好及曲库字幕修正`,action:()=>Td(`exportBackup`)}),(0,U.jsx)(uf,{label:`恢复备份`,detail:`先将原音频放入新设备，再选择备份文件`,action:()=>Td(`importBackup`)}),(0,U.jsx)(`h2`,{children:`曲库`}),(0,U.jsxs)(`label`,{className:`profile-choice`,children:[`文件夹浏览方式`,(0,U.jsxs)(`select`,{value:i?`tree`:`flat`,onChange:e=>a(e.target.value===`tree`),children:[(0,U.jsx)(`option`,{value:`flat`,children:`平铺列表`}),(0,U.jsx)(`option`,{value:`tree`,children:`按目录浏览`})]})]}),(0,U.jsx)(uf,{label:`刷新音乐库`,icon:le,action:t.refresh})]}):e===`about`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`div`,{className:`profile-identity about-brand`,children:[(0,U.jsx)(`img`,{src:sf,alt:``}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`h2`,{children:`DL Sound`}),(0,U.jsx)(`small`,{children:`本地音乐与日语音声播放器`})]})]}),(0,U.jsx)(`h2`,{children:`版本信息`}),(0,U.jsxs)(`div`,{className:`profile-info`,children:[`当前版本`,(0,U.jsx)(`small`,{children:t.appVersion})]}),(0,U.jsxs)(`div`,{className:`profile-info`,children:[`构建类型`,(0,U.jsxs)(`small`,{children:[t.buildKind,` · `,t.buildCode]})]}),(0,U.jsx)(uf,{label:`检查更新`,icon:le,action:f,disabled:o}),(0,U.jsx)(`p`,{role:`status`,children:c}),u&&(0,U.jsx)(uf,{label:`前往 GitHub 下载`,action:()=>Td(`openRelease`)}),(0,U.jsx)(`h2`,{children:`开源与声明`}),(0,U.jsx)(uf,{label:`开源许可`,detail:`播放器与离线注音组件`,icon:O,action:()=>n(`licenses`)}),(0,U.jsx)(uf,{label:`第三方声明`,detail:`词典数据与界面组件`,icon:F,action:()=>n(`statements`)})]}):e===`licenses`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(uf,{label:`DL Sound 与上游播放器`,detail:`GNU GPL v3`,icon:O,action:()=>n(`gpl`)}),(0,U.jsx)(uf,{label:`Kuromoji`,detail:`Apache License 2.0`,icon:O,action:()=>n(`kuromoji`)})]}):e===`statements`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(uf,{label:`IPADIC 词典`,detail:`原始数据及版权说明`,icon:F,action:()=>n(`ipadic`)}),(0,U.jsx)(uf,{label:`界面组件`,detail:`依赖版本、作者与许可证`,icon:F,action:()=>n(`ui`)})]}):(0,U.jsx)(`pre`,{className:`profile-legal`,children:lf[e]})}function ff({queue:e,current:t,jump:n,move:r,remove:i}){let a=(0,w.useRef)(null),o=(0,w.useRef)(r);return o.current=r,(0,w.useEffect)(()=>{let e=a.current,t=e.closest(`.sheet-scroll`),n=null,r=null,i=0,s=0,c=-1,l=0,u=0,d=0,f=0,p=!1,m=!1,h=0,g=0;function _(){window.clearTimeout(i),cancelAnimationFrame(s),n&&(n.classList.remove(`queue-dragging`),n.style.removeProperty(`transform`)),r==null||r.removeAttribute(`data-drop`),n=null,r=null,c=-1,p=!1,m=!1}function v(){var i;if(!(n!=null&&n.isConnected)||!p){_();return}let a=t.getBoundingClientRect(),o=Math.min(48,a.height/4);d<a.top+o&&(t.scrollTop-=Math.min(12,(a.top+o-d)/3)),d>a.bottom-o&&(t.scrollTop+=Math.min(12,(d-a.bottom+o)/3));let c=e.getBoundingClientRect(),l=Math.max(c.top+1,Math.min(c.bottom-1,Math.max(a.top+1,Math.min(a.bottom-1,d)))),u=(i=document.elementFromPoint(c.left+c.width/2,l))==null?void 0:i.closest(`[data-queue-id]`);r==null||r.removeAttribute(`data-drop`),r=u&&e.contains(u)?u:null,r&&r!==n&&(r.dataset.drop=n.compareDocumentPosition(r)&Node.DOCUMENT_POSITION_FOLLOWING?`after`:`before`),n.style.transform=`translateY(`+(l-f-c.top-n.offsetTop)+`px)`,s=requestAnimationFrame(v)}function y(t){_();let r=t.target.closest(`.queue-select`);if(!r||t.touches.length!==1||e.children.length<2||(n=r.closest(`[data-queue-id]`),!n))return;t.preventDefault();let a=t.touches[0];c=a.identifier,l=a.clientX,u=d=a.clientY,f=u-n.getBoundingClientRect().top,h=performance.now(),g=0,i=window.setTimeout(()=>{n!=null&&n.isConnected&&(p=!0,n.classList.add(`queue-dragging`),v())},420)}function b(e){if(!n)return;e.preventDefault();let r=Array.from(e.touches).find(e=>e.identifier===c);if(!r||e.touches.length!==1){_();return}if(p){d=r.clientY;return}if(!m&&Math.hypot(r.clientX-l,r.clientY-u)<=8)return;window.clearTimeout(i),m=!0;let a=performance.now(),o=d-r.clientY;g=o/Math.max(8,a-h),t.scrollTop+=o,d=r.clientY,h=a}function x(e){if(!Array.from(e.changedTouches).some(e=>e.identifier===c))return;if(e.preventDefault(),p)cancelAnimationFrame(s),d=e.changedTouches[0].clientY,v(),n!=null&&n.dataset.queueId&&r!=null&&r.dataset.queueId&&n!==r&&o.current(n.dataset.queueId,r.dataset.queueId);else if(!m){var i;n==null||(i=n.querySelector(`.queue-select`))==null||i.click()}let a=m&&performance.now()-h<80;if(_(),a){let e=Math.max(-32,Math.min(32,g*16)),n=()=>{let r=t.scrollTop;t.scrollTop+=e,e*=.88,Math.abs(e)>.75&&t.scrollTop!==r&&(s=requestAnimationFrame(n))};s=requestAnimationFrame(n)}}function S(e){n&&e.preventDefault()}return document.addEventListener(`contextmenu`,S,!0),e.addEventListener(`touchstart`,y,{passive:!1}),e.addEventListener(`touchmove`,b,{passive:!1}),e.addEventListener(`touchend`,x,{passive:!1}),e.addEventListener(`touchcancel`,_),()=>{document.removeEventListener(`contextmenu`,S,!0),_(),e.removeEventListener(`touchstart`,y),e.removeEventListener(`touchmove`,b),e.removeEventListener(`touchend`,x),e.removeEventListener(`touchcancel`,_)}},[]),(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`p`,{className:`queue-hint`,children:`长按曲目可拖动排序`}),(0,U.jsx)(`div`,{ref:a,className:`queue-list`,children:e.map((a,o)=>(0,U.jsxs)(`div`,{"data-queue-id":a.itemId,className:`queue-row`+(a.itemId===t?` queue-current`:``),children:[(0,U.jsxs)(`button`,{className:`queue-select`,onContextMenu:e=>e.preventDefault(),onClick:()=>n(o),"aria-keyshortcuts":`Alt+ArrowUp Alt+ArrowDown`,onKeyDown:t=>{if(!t.altKey||![`ArrowUp`,`ArrowDown`].includes(t.key))return;t.preventDefault();let n=e[o+(t.key===`ArrowUp`?-1:1)];n&&r(a.itemId,n.itemId)},children:[(0,U.jsx)(`span`,{className:`queue-number`,children:a.itemId===t?(0,U.jsx)(Se,{}):String(o+1).padStart(2,`0`)}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:a.track.title}),(0,U.jsx)(`small`,{children:a.track.artist})]})]}),(0,U.jsx)(`div`,{className:`queue-actions`,children:(0,U.jsx)(q,{variant:`ghost`,size:`icon`,"aria-label":`移除第`+(o+1)+`首`,onClick:()=>i(a.itemId),children:(0,U.jsx)(Ce,{})})})]},a.itemId))})]})}function pf(e,t){let n=0,r=e.length-1;for(;n<r;){let i=n+r+1>>>1;e[i]<=t?n=i:r=i-1}return n}function mf({items:e,keyOf:t,estimate:n,render:r,centerIndex:i,scrollSelector:a}){let o=(0,w.useRef)(null),s=(0,w.useMemo)(()=>new Map,[e,n]),[c,l]=(0,w.useState)(0),u=(0,w.useMemo)(()=>{var t;let r=[0];for(let i=0;i<e.length;i++)r.push(r[i]+((t=s.get(i))==null?n:t));return r},[s,n,e,c]),[d,f]=(0,w.useState)({top:0,height:800}),[p,m]=(0,w.useState)(-1);(0,w.useLayoutEffect)(()=>{let e=o.current,t=e.closest(a),n=()=>{let n=t.getBoundingClientRect().top-e.getBoundingClientRect().top,r=t.clientHeight;f(e=>e.top===n&&e.height===r?e:{top:n,height:r})},r=new ResizeObserver(n);return r.observe(t),r.observe(e),n(),t.addEventListener(`scroll`,n,{passive:!0}),()=>{r.disconnect(),t.removeEventListener(`scroll`,n)}},[a,e]);let h=Math.max(0,pf(u,d.top)-6),g=Math.min(e.length,pf(u,d.top+d.height)+8),_=Array.from({length:Math.max(0,g-h)},(e,t)=>t+h);return p>=0&&p<e.length&&(p<h||p>=g)&&_.push(p),(0,w.useLayoutEffect)(()=>{let e=o.current,t=()=>{let t=!1;for(let i of Array.from(e.children)){var r;let e=Number(i.dataset.index),a=i.offsetHeight;a>0&&((r=s.get(e))==null?n:r)!==a&&(s.set(e,a),t=!0)}t&&l(e=>e+1)};t();let r=new ResizeObserver(t);for(let t of Array.from(e.children))r.observe(t);return()=>r.disconnect()},[h,g,p,s,n]),(0,w.useLayoutEffect)(()=>{if(i===void 0||i<0||i>=e.length)return;let t=o.current,n=t.closest(a);n.scrollTop=t.getBoundingClientRect().top-n.getBoundingClientRect().top+n.scrollTop+(u[i]+u[i+1])/2-n.clientHeight*.46},[i,u,a,e]),(0,U.jsx)(`div`,{ref:o,style:{position:`relative`,height:u[e.length]},onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||m(-1)},children:_.map(n=>(0,U.jsx)(`div`,{"data-index":n,onFocus:()=>m(n),style:{position:`absolute`,top:u[n],left:0,right:0},children:r(e[n],n)},t(e[n],n)))})}function hf(e,t,n,r){let i=Math.min(.032,Math.max(.001,r)),a=t+((n-e)*230-t*30)*i;return{position:e+a*i,velocity:a}}function gf(e,t=!0){let n=Math.min(2.5,Math.abs(e));return t?{scale:1-n*.072,angle:Math.max(-13,Math.min(13,-e*7)),z:-n*24,opacity:Math.max(.64,1-n*.13)}:{scale:1,angle:0,z:0,opacity:1}}function _f(e,t,n){let r=Math.exp(-7*Math.min(.032,Math.max(.001,n)));return{position:e+t*(1-r)/7,velocity:t*r}}function vf({offset:e,duration:t,cues:n,active:r,time:i,follow:a,setFollow:o,language:s,depth:c,reducedMotion:l,rubyVisible:u,layoutRevision:d,font:f,rubyScale:p,trackKey:m,onSeek:h,onCorrect:g,renderJapanese:_}){let v=n.length>120,y=(0,w.useMemo)(()=>r.length?n.indexOf(r[0]):-1,[n,r[0]]),b=(0,w.useRef)(null),x=(0,w.useRef)(0),S=(0,w.useRef)(!1),C=(0,w.useRef)({x:0,y:0}),T=(0,w.useRef)(!1),[E,D]=(0,w.useState)(null),ee=()=>{T.current=!1,D(null)},O=(0,w.useRef)({frame:0,target:0,velocity:0,last:0,kind:`spring`}),[k,te]=(0,w.useState)(()=>matchMedia(`(prefers-reduced-motion: reduce)`).matches),A=k||l,j=r.map(e=>e.key).join(`|`),M=(0,w.useRef)(a);M.current=a;let N=(0,w.useRef)({depth:c,reduced:A});N.current={depth:c,reduced:A};let P=`${m}:${s}:${f}:${p}:${n.length}:${u}:${d}`,F=()=>{let e=b.current;if(!e)return;let t=e.scrollTop+e.clientHeight*.46,n=Array.from(e.querySelectorAll(`.lyric-row`)),r=e.getBoundingClientRect().top-e.scrollTop,i=n.map(e=>e.getBoundingClientRect().top-r+e.offsetHeight/2);if(T.current&&n.length){var a;let t=e.scrollTop+e.clientHeight/2,r=(a=n.find((e,n)=>i[n]+e.offsetHeight/2>t))==null?n[n.length-1]:a;D(Number(r.dataset.start))}n.forEach((n,r)=>{let a=(i[r]-t)/Math.max(110,e.clientHeight*.3),o=gf(a,N.current.depth&&!N.current.reduced);n.style.setProperty(`--line-scale`,String(o.scale)),n.style.setProperty(`--line-angle`,`${o.angle}deg`),n.style.setProperty(`--line-z`,`${o.z}px`),n.style.setProperty(`--line-alpha`,String(o.opacity)),n.dataset.distance=a.toFixed(3)})},I=()=>{x.current||(x.current=requestAnimationFrame(()=>{x.current=0,F()}))},ne=()=>{cancelAnimationFrame(O.current.frame),O.current.frame=0,O.current.velocity=0},re=e=>{let t=b.current;if(!t)return;O.current.kind===`inertia`&&ne(),O.current.kind=`spring`;let n=O.current;if(n.target=Math.max(0,Math.min(e,t.scrollHeight-t.clientHeight)),A){ne(),t.scrollTop=n.target,I();return}if(n.frame)return;n.last=performance.now();let r=e=>{let i=hf(t.scrollTop,n.velocity,n.target,(e-n.last)/1e3);n.last=e,n.velocity=i.velocity,t.scrollTop=i.position,I(),Math.abs(t.scrollTop-n.target)<.65&&Math.abs(n.velocity)<8?(t.scrollTop=n.target,n.frame=0,n.velocity=0,I()):n.frame=requestAnimationFrame(r)};n.frame=requestAnimationFrame(r)},L=(e=!0)=>{let t=b.current;if(!t)return;t.style.setProperty(`--lyric-pad`,`${t.clientHeight*.46}px`);let n=Array.from(t.querySelectorAll(`.lyric-row`));if(v){I();return}let r=n.find(e=>e.dataset.active===`true`)||n.find(e=>Number(e.dataset.start)>=i)||n.at(-1);if(!r)return;let a=Math.max(0,r.offsetTop+r.offsetHeight/2-t.clientHeight*.46);e?re(a):(ne(),t.scrollTop=a),I()};(0,w.useEffect)(()=>{let e=matchMedia(`(prefers-reduced-motion: reduce)`),t=()=>te(e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,w.useLayoutEffect)(()=>{a?L(!1):I()},[P]),(0,w.useEffect)(()=>{a&&L()},[j,a]),(0,w.useEffect)(()=>{I(),A&&ne()},[c,A]),(0,w.useEffect)(()=>{let e=b.current;if(!e)return;let t=new ResizeObserver(()=>{e.style.setProperty(`--lyric-pad`,`${e.clientHeight*.46}px`),M.current?L(!1):I()});return t.observe(e),()=>{t.disconnect(),cancelAnimationFrame(x.current),x.current=0,ne()}},[P]),(0,w.useEffect)(()=>{let e=b.current;if(!e)return;let t=t=>{t.preventDefault(),o(!1);let n=t.deltaY*(t.deltaMode===1?20:t.deltaMode===2?e.clientHeight:1);re((O.current.frame&&O.current.kind===`spring`?O.current.target:e.scrollTop)+n)};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[A,P]),(0,w.useEffect)(()=>{let e=b.current;if(!e)return;let t=``,n=0,r=0,i=0,a=0,s=o=>{ne(),ee(),S.current=!1,t=``,o.touches.length===1?(a=0,n=e.scrollTop,r=o.touches[0].clientY,i=performance.now(),C.current={x:o.touches[0].clientX,y:r}):(t=`multi`,S.current=!0)},c=s=>{if(s.touches.length!==1)return;let c=s.touches[0],l=c.clientY-C.current.y,u=c.clientX-C.current.x;if(!t&&Math.max(Math.abs(u),Math.abs(l))>8&&(t=Math.abs(l)>Math.abs(u)?`y`:`x`,S.current=!0,t===`y`&&(T.current=!0,o(!1))),t!==`y`)return;s.preventDefault();let d=performance.now(),f=Math.max(8,d-i),p=(r-c.clientY)/f*1e3;a=a*.25+Math.max(-2500,Math.min(2500,p))*.75,e.scrollTop=n-l,r=c.clientY,i=d,I()},l=n=>{if(ee(),t!==`y`||n.type===`touchcancel`||N.current.reduced||performance.now()-i>100)return;let r=O.current;r.kind=`inertia`,r.velocity=a,r.last=performance.now();let o=t=>{let n=_f(e.scrollTop,r.velocity,(t-r.last)/1e3);r.last=t,r.velocity=n.velocity;let i=Math.max(0,Math.min(n.position,e.scrollHeight-e.clientHeight));e.scrollTop=i,I(),Math.abs(r.velocity)<12||i!==n.position?(r.frame=0,r.velocity=0):r.frame=requestAnimationFrame(o)};r.frame=requestAnimationFrame(o)};return e.addEventListener(`touchstart`,s,{passive:!0}),e.addEventListener(`touchmove`,c,{passive:!1}),e.addEventListener(`touchend`,l),e.addEventListener(`touchcancel`,l),()=>{ee(),e.removeEventListener(`touchstart`,s),e.removeEventListener(`touchmove`,c),e.removeEventListener(`touchend`,l),e.removeEventListener(`touchcancel`,l),ne()}},[P]);function R(){o(!1),ne()}let ie=e=>{let t=r.some(t=>t.key===e.key);return(0,U.jsxs)(`button`,{"data-start":e.startMs,"data-active":t,onContextMenu:t=>{t.preventDefault(),g(e)},className:vd(`lyric-row`,t&&`lyric-active`),"aria-current":t?`true`:void 0,"aria-label":(t?`当前台词，`:``)+Ud(e,s,u),onClick:()=>{S.current?S.current=!1:(h(e),o(!0))},children:[t&&(0,U.jsx)(`span`,{className:`current-line-mark`,"aria-hidden":`true`}),(0,U.jsxs)(`span`,{className:`lyric-text`,children:[(e.unlabelledText||s!==`zh`)&&(0,U.jsx)(`span`,{className:`ja-line`,lang:e.unlabelledText?``:`ja`,children:Bd(e)?_(e):`暂无日文`}),!e.unlabelledText&&s!==`ja`&&(0,U.jsx)(`span`,{lang:`zh-Hans`,className:vd(`zh-line`,s===`zh`&&`zh-primary`),children:e.zh||`暂无中文翻译`})]})]},e.key)};return(0,U.jsxs)(`div`,{className:`lyric-stage`,"data-depth":c&&!A,children:[(0,U.jsxs)(`div`,{className:`lyric-window`,children:[(0,U.jsx)(`div`,{ref:b,className:`lyrics-scroll`,tabIndex:0,"aria-label":`连续歌词，点击台词跳转`,onScroll:I,onKeyDown:e=>{[`ArrowDown`,`ArrowUp`,`PageDown`,`PageUp`,`Home`,`End`,` `].includes(e.key)&&R()},children:(0,U.jsx)(`div`,{className:`lyrics-inner`,children:v?(0,U.jsx)(mf,{items:n,keyOf:e=>e.key,estimate:Math.max(76,f*3),scrollSelector:`.lyrics-scroll`,centerIndex:a?y:void 0,render:ie}):n.map(ie)})}),E!==null&&(0,U.jsxs)(`div`,{className:`drag-guide`,"aria-hidden":`true`,children:[(0,U.jsx)(`span`,{}),(0,U.jsx)(`time`,{children:Vd(Gd(E,e,t))})]})]}),(0,U.jsx)(`div`,{className:`follow-line`,children:!a&&(0,U.jsx)(q,{size:`sm`,variant:`secondary`,onClick:()=>{o(!0),L()},children:`回到当前`})})]})}function yf({label:e,icon:t,onClick:n,disabled:r=!1,variant:i=`ghost`,className:a=``,...o}){return(0,U.jsx)(q,{title:e,"aria-label":e,variant:i,size:`icon`,disabled:r,onClick:n,className:a,...o,children:(0,U.jsx)(t,{"data-icon":`inline-start`})})}function bf({track:e,small:t=!1}){return(0,U.jsx)(`div`,{className:vd(`record-cover`,t&&`record-small`),"aria-hidden":`true`,children:(0,U.jsx)(`img`,{src:(e==null?void 0:e.cover)||`/cover/0`,alt:``,loading:t?`lazy`:`eager`})})}function xf({label:e,value:t,icon:n,onClick:r,disabled:i=!1}){return(0,U.jsxs)(`button`,{className:`setting-row`,disabled:i,onClick:r,children:[(0,U.jsx)(n,{}),(0,U.jsx)(`span`,{children:e}),(0,U.jsx)(`small`,{children:t}),(0,U.jsx)(A,{})]})}function Sf({label:e,value:t,options:n,onChange:r}){return(0,U.jsxs)(Qc,{children:[(0,U.jsx)($c,{children:e}),(0,U.jsx)(Kc,{type:`single`,value:t,onValueChange:e=>e&&r(e),"aria-label":e,variant:`outline`,className:`choice-group`,children:n.map(([e,t])=>(0,U.jsx)(qc,{value:e,children:t},e))})]})}function Cf({title:e,description:t,children:n}){return(0,U.jsxs)(ol,{children:[(0,U.jsxs)(sl,{children:[(0,U.jsx)(cl,{children:e}),(0,U.jsx)(ll,{children:t})]}),n&&(0,U.jsx)(ul,{children:n})]})}function wf(){var e,t,n;let r=(e=window.DLSound)==null||(t=e.readFolderBrowser)==null?void 0:t.call(e);return r?JSON.parse(r):{tree:localStorage.getItem(`folder-view`)===`tree`,path:(n=localStorage.getItem(`folder-directory`))==null?``:n}}function Tf(e,t){var n,r;(n=window.DLSound)!=null&&(r=n.saveFolderBrowser)!=null&&r.call(n,e,t)||(localStorage.setItem(`folder-view`,e?`tree`:`flat`),localStorage.setItem(`folder-directory`,t))}function Ef({duration:e}){let t=jd();return(0,U.jsx)(`div`,{className:`mini-progress`,style:{width:`${e?t/e*100:0}%`}})}function Df(){var e,t,n,r,i,a,o,s,c,l,u,d,f,p;let[m,h]=(0,w.useState)(null),[g,_]=(0,w.useState)(!1),[v,y]=(0,w.useState)(`cover`),[b,x]=(0,w.useState)(`folders`),[S,C]=(0,w.useState)(``),[T,E]=(0,w.useState)(``),[ee,k]=(0,w.useState)([]),[F,I]=(0,w.useState)(!1),L=ee.at(-1)||``,he=()=>k(e=>e.slice(0,-1)),V=Md(g||L===`track`),[we,Te]=(0,w.useState)(``),[Ee,De]=(0,w.useState)(null),[Oe,ke]=(0,w.useState)(!0),Ae=Kd(`bookmarks`),je=qd(V.track),[Me,Ne]=(0,w.useState)(null),Pe=(Me==null?void 0:Me.source)===je?Me:null;async function Fe(e){let t=je===e.source?V.track:V.tracks.find(t=>qd(t)===e.source);if(!t)Nl.error(`请重新打开原音频，再从「本曲书签」播放`);else try{await Yd(t.id,e.start,e.end,1,!0,!0),k([]),_(!0)}catch(e){Nl.error(e.message)}}let Ie=V.favorites,Le=V.playlists,Re=(0,w.useMemo)(()=>Nd(V.tracks),[V.tracks]),[ze,Be]=(0,w.useState)(wf);(0,w.useEffect)(()=>{V.browserRevision&&Be(wf())},[V.browserRevision]);let{tree:Ve,path:He}=ze,Ue=(0,w.useMemo)(()=>zd(V.tracks),[V.tracks]),We=Rd(Ue,He);function Ge(e){Tf(!0,e),Be({tree:!0,path:e})}let Ke=Ve&&b===`folders`,qe=Ke&&!T,Je=(0,w.useMemo)(()=>Array.from(We.children.values()).sort((e,t)=>e.name.localeCompare(t.name,void 0,{numeric:!0})),[We]),Ye=[];for(let e=We;Ye.unshift(e),e.path;e=Ue.get(e.parent));function Xe(e){e!==Ve&&(Tf(e,He),Be({tree:e,path:He}),C(``))}let[Ze,Qe]=(0,w.useState)(``),[$e,et]=(0,w.useState)(``);(0,w.useEffect)(()=>{V.externalView&&(_(!0),y(`lyrics`))},[V.externalView]);let[tt,nt]=(0,w.useState)(``),rt=V.mediaPermission,it=(0,w.useRef)(null),at=(0,w.useRef)(null),ot=V.prefs.theme===`system`?V.systemDark:V.prefs.theme===`dark`;(0,w.useEffect)(()=>{document.documentElement.classList.toggle(`dark`,ot),document.documentElement.style.setProperty(`--system-font-scale`,String(V.fontScale))},[ot,V.fontScale]);let st=e=>{at.current=document.activeElement,Te(e)},ct=(e=`playback`)=>{Te(``),k(t=>t.at(-1)===e?t:[...t,e])},lt=V.offset,ut=()=>{y(`cover`),_(!0)},dt=(e,t)=>{V.select(e,!0,H,t),y(`cover`),_(!0),ke(!0)};(0,w.useEffect)(()=>{ke(!0)},[(e=V.item)==null?void 0:e.itemId]),(0,w.useEffect)(()=>{let e=e=>{e.key===`Escape`&&!e.defaultPrevented&&!we&&(L?he():g&&_(!1))};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[we,g,L]);let ft=(0,w.useRef)({panel:we,expanded:g,folder:S,settingsPage:L,tree:Ke,dir:We.path,parent:We.parent,showSearch:F});ft.current={panel:we,expanded:g,folder:S,settingsPage:L,tree:Ke,dir:We.path,parent:We.parent,showSearch:F},(0,w.useEffect)(()=>(window.dlSoundBack=()=>{let e=ft.current;if(V.externalView&&!e.panel&&!e.settingsPage)return!1;if(e.panel)Te(``);else if(e.settingsPage)he();else if(e.expanded)_(!1);else if(e.showSearch)I(!1),E(``);else if(e.tree&&e.dir)Ge(e.parent);else if(e.folder)C(``);else return!1;return!0},()=>{window.dlSoundBack=void 0}),[V.externalView]);let pt=V.cues,mt=(0,w.useMemo)(()=>Hd(pt),[pt])(Wd(V.time,lt)),ht=(0,w.useMemo)(()=>pt.filter(e=>e.kind===`dialogue`),[pt]),gt=mt.filter(e=>e.kind===`dialogue`),_t=e=>V.favorite(e),vt=b===`playlists`&&!T?Le.find(e=>e.id===S):void 0,yt=(0,w.useMemo)(()=>vt==null?void 0:vt.entryIds.filter((e,t)=>Re.byId.has(vt.trackIds[t])),[vt,Re]),[bt,xt]=(0,w.useState)(``),H=(0,w.useMemo)(()=>qe?We.tracks:Pd(Re,b,S,T,Ie,vt==null?void 0:vt.trackIds),[qe,We,Re,b,S,T,Ie,vt]),St=Ke?We.path?We.name:`文件夹`:b===`folders`?((t=Re.folders.get(S))==null?void 0:t.name)||`文件夹`:b===`albums`?((n=Re.albums.get(S))==null?void 0:n[0].album)||`专辑`:S===`favorites`?`我的收藏`:(vt==null?void 0:vt.name)||`歌单`;function Ct({track:e,index:t=0}){var n,r,i;return(0,U.jsxs)(`div`,{className:`track-row`,children:[(0,U.jsxs)(`button`,{className:`track-main`,onClick:()=>dt(e,t),children:[(0,U.jsx)(`span`,{className:`track-number`,children:((n=V.track)==null?void 0:n.id)===e.id?(0,U.jsx)(Se,{className:`playing-mark`}):t+1}),(0,U.jsxs)(`span`,{className:`track-copy`,children:[(0,U.jsx)(`strong`,{className:((r=V.track)==null?void 0:r.id)===e.id?`is-current`:``,children:e.title}),(0,U.jsxs)(`small`,{children:[e.artist,` · `,Vd(((i=V.track)==null?void 0:i.id)===e.id?V.duration:e.duration)]})]})]}),(0,U.jsx)(yf,{label:`更多操作：`+e.title,icon:P,onClick:()=>{De(e),xt((yt==null?void 0:yt[t])||``),st(`track`)}})]})}let wt=(0,U.jsx)(mf,{items:H,keyOf:(e,t)=>{var n;return(n=yt==null?void 0:yt[t])==null?e.id:n},estimate:54*V.fontScale,scrollSelector:`.library-scroll`,render:(e,t)=>Ct({track:e,index:t})});function Tt({cue:e}){return(0,U.jsx)(U.Fragment,{children:(e.ja||[]).map((e,t)=>e.reading&&V.prefs.ruby?(0,U.jsxs)(`ruby`,{children:[e.text,(0,U.jsx)(`rt`,{"aria-hidden":`true`,children:e.reading})]},t):(0,U.jsx)(`span`,{children:e.text},t))})}(0,w.useEffect)(()=>{var e;(e=document.querySelector(`.library-scroll`))==null||e.scrollTo(0,0)},[T,S,b]);let Et=V.subtitleError||!ht.length,Dt={study:`复听与书签`,deletePlaylist:`删除歌单`,clearQueue:`清空播放队列`,settings:`播放与显示`,speed:`播放速度`,repeat:`播放顺序`,sleep:`睡眠定时`,theme:`外观`,font:`字幕字号`,rubySize:`读音大小`,offset:`字幕偏移`,menu:`更多`,queue:`播放队列`,language:`歌词语言`,track:(Ee==null?void 0:Ee.title)||`音轨操作`,correction:`修正当前句读音`,permissions:`文件访问`,playlist:$e?`重命名歌单`:`创建歌单`,addPlaylist:`加入歌单`},Ot={ja:`日语`,zh:`中文`,both:`双语`},kt=V.prefs.shuffle?`随机播放`:V.prefs.repeat===`one`?`单曲循环`:V.prefs.repeat===`all`?`列表循环`:`顺序播放`;function At(){V.correction()}function jt(){return V.track?(0,U.jsxs)(`div`,{className:`mini-player`,children:[(0,U.jsx)(Ef,{duration:V.duration}),(0,U.jsxs)(`button`,{className:`mini-open`,onClick:()=>{k([]),ut()},children:[(0,U.jsx)(bf,{track:V.track,small:!0}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:V.track.title}),(0,U.jsx)(`small`,{children:V.track.artist})]})]}),(0,U.jsx)(yf,{label:V.playing?`暂停`:`播放`,icon:V.playing?oe:se,onClick:V.toggle}),(0,U.jsx)(yf,{label:`打开播放队列`,icon:ie,onClick:()=>st(`queue`)})]}):null}let Mt=(0,U.jsx)(`nav`,{className:`bottom-nav`,"aria-label":`曲库导航`,children:[[`folders`,`文件夹`,ne],[`albums`,`专辑`,M],[`playlists`,`歌单`,ie],[`me`,`我的`,xe]].map(([e,t,n])=>(0,U.jsxs)(`button`,{"aria-current":b===e?`page`:void 0,onClick:()=>{k([]),_(!1),x(e),C(``),E(``),I(!1)},children:[(0,U.jsx)(n,{}),(0,U.jsx)(`span`,{children:t})]},e))}),Nt=L||`me`;return(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`main`,{className:`phone`,style:{"--lyric-size":`${V.prefs.font*V.fontScale}px`,"--ruby-scale":V.prefs.rubyScale},children:L||!g&&b===`me`?(0,U.jsxs)(`div`,{className:`settings-page`,children:[(0,U.jsxs)(`header`,{className:`compact-header`,children:[L&&(0,U.jsx)(yf,{label:`返回上一页`,icon:D,onClick:he}),(0,U.jsx)(`h1`,{children:cf[Nt]}),(0,U.jsx)(yf,{label:ot?`切换浅色`:`切换深色`,icon:ot?ge:ae,onClick:()=>V.pref(`theme`,ot?`light`:`dark`)})]}),(0,U.jsx)(`div`,{className:`settings-scroll profile-scroll`,children:L===`works`?(0,U.jsx)(tf,{directories:Ue,play:(e,t)=>{V.select(e,!0,t),k([]),_(!0),y(`cover`)}}):L===`marks`?(0,U.jsx)(Jd,{marks:Ae.rows,remove:e=>Ae.update(e),play:Fe}):L===`playback`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(xf,{label:`播放速度`,value:V.prefs.speed+`×`,icon:Se,onClick:()=>st(`speed`)}),(0,U.jsx)(xf,{label:`播放顺序`,value:kt,icon:de,onClick:()=>st(`repeat`)}),(0,U.jsx)(xf,{label:`睡眠定时`,value:V.sleep.mode===`off`?`关闭`:V.sleep.mode===`end`?`本首结束`:V.sleep.minutes+` 分钟`,icon:ve,onClick:()=>st(`sleep`)})]}):L===`subtitles`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`h2`,{children:`字幕预览`}),(0,U.jsxs)(`div`,{className:`font-preview`,children:[V.prefs.language!==`zh`&&(0,U.jsxs)(`p`,{lang:`ja`,style:{fontSize:V.prefs.font*V.fontScale},children:[V.prefs.ruby?(0,U.jsxs)(`ruby`,{children:[`明日`,(0,U.jsx)(`rt`,{style:{fontSize:V.prefs.rubyScale+`em`},children:`あした`})]}):`明日`,`、また。`]}),V.prefs.language!==`ja`&&(0,U.jsx)(`p`,{children:`明天见。`})]}),(0,U.jsx)(xf,{label:`字幕语言`,value:Ot[V.prefs.language],icon:R,onClick:()=>st(`language`)}),(0,U.jsxs)(Qc,{orientation:`horizontal`,className:`setting-switch`,children:[(0,U.jsxs)($c,{htmlFor:`ruby`,children:[(0,U.jsx)(be,{}),`显示读音`]}),(0,U.jsx)(Jc,{id:`ruby`,checked:V.prefs.ruby,onCheckedChange:e=>V.pref(`ruby`,e)})]}),(0,U.jsx)(xf,{label:`字幕字号`,value:V.prefs.font+` sp`,icon:be,onClick:()=>st(`font`)}),(0,U.jsx)(xf,{label:`读音大小`,value:Math.round(V.prefs.rubyScale*100)+`%`,icon:be,onClick:()=>st(`rubySize`)}),(0,U.jsxs)(Qc,{orientation:`horizontal`,className:`setting-switch`,children:[(0,U.jsxs)($c,{htmlFor:`depth`,children:[(0,U.jsx)(_e,{}),`立体歌词`]}),(0,U.jsx)(Jc,{id:`depth`,checked:V.prefs.depth,onCheckedChange:e=>V.pref(`depth`,e)})]})]}):L===`track`?V.track?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`h2`,{children:V.track.title}),(0,U.jsx)(xf,{label:`导入字幕`,icon:ne,onClick:()=>V.importSubtitle()}),(0,U.jsx)(xf,{label:`字幕来源`,value:V.subtitleName||(V.manual?`手动选择`:V.subtitleStatus),icon:O,onClick:()=>{V.manual?V.automatic():Nl(V.subtitleName||V.subtitleStatus)}}),V.subtitleError&&(0,U.jsx)(`p`,{className:`subtitle-status`,role:`status`,children:V.subtitleError}),(0,U.jsx)(`div`,{className:`setting-gap`}),(0,U.jsx)(xf,{label:`个人读音`,disabled:!V.doc||!gt.length,value:gt.length?`修正当前句`:`当前没有台词`,icon:be,onClick:At}),(0,U.jsx)(xf,{label:`字幕偏移`,disabled:!V.doc||!V.offsetKey,value:(lt>0?`+`:``)+lt+` ms`,icon:ve,onClick:()=>st(`offset`)})]}):(0,U.jsx)(`p`,{children:`请先播放一首音轨。`}):(0,U.jsx)(df,{page:Nt,p:V,go:ct,panel:st,tree:Ve,changeTree:Xe})},Nt),!V.externalView&&jt(),b===`me`&&!g&&Mt]}):g?(0,U.jsxs)(`div`,{className:`player`,children:[(0,U.jsxs)(`header`,{className:`compact-header player-header`,children:[(0,U.jsx)(yf,{label:V.externalView?`返回文件管理器`:`收起播放器，返回曲库`,icon:te,onClick:()=>V.externalView?V.closeExternal():_(!1)}),(0,U.jsx)(`strong`,{children:((r=V.track)==null?void 0:r.title)||`暂无播放`}),(0,U.jsx)(yf,{label:`音轨操作`,icon:N,disabled:!V.track,onClick:()=>{V.externalView?ct(`track`):(De(V.track),st(`track`))}})]}),(0,U.jsxs)(Ac,{value:v,onValueChange:y,className:`player-tabs`,children:[(0,U.jsxs)(`div`,{className:`player-tools`,"aria-label":`播放快捷操作`,children:[(0,U.jsxs)(q,{className:`speed-shortcut`,size:`sm`,variant:`ghost`,"aria-label":`调整播放速度`,onClick:()=>st(`speed`),children:[String(V.prefs.speed),`×`]}),(0,U.jsx)(yf,{label:`睡眠定时`,"aria-pressed":V.sleep.mode!==`off`,icon:j,disabled:V.externalView,onClick:()=>st(`sleep`)}),(0,U.jsx)(`div`,{className:`page-dots`,children:(0,U.jsxs)(Mc,{"aria-label":`播放页面`,children:[(0,U.jsx)(Nc,{value:`info`,"aria-label":`简介`,children:`简介`}),(0,U.jsx)(Nc,{value:`cover`,"aria-label":`封面`,children:`封面`}),(0,U.jsx)(Nc,{value:`lyrics`,"aria-label":`歌词`,children:`歌词`})]})}),(0,U.jsx)(q,{className:`language-cycle`,size:`sm`,variant:`ghost`,"aria-label":`字幕语言：`+Ot[V.prefs.language]+`，点击切换`,onClick:()=>{let e=[`ja`,`zh`,`both`];V.pref(`language`,e[(e.indexOf(V.prefs.language)+1)%e.length])},children:(0,U.jsx)(`span`,{"aria-hidden":`true`,children:{ja:`日`,zh:`中`,both:`双`}[V.prefs.language]})}),(0,U.jsx)(yf,{label:`播放与显示设置`,icon:B,onClick:()=>ct(V.externalView?`subtitles`:`settings`)})]}),(0,U.jsxs)(`div`,{className:`player-pages`,onTouchStart:e=>{it.current={x:e.touches[0].clientX,y:e.touches[0].clientY}},onTouchEnd:e=>{if(!it.current)return;let t=e.changedTouches[0].clientX-it.current.x,n=e.changedTouches[0].clientY-it.current.y;if(it.current=null,Math.abs(t)>65&&Math.abs(t)>Math.abs(n)*1.5){let e=[`info`,`cover`,`lyrics`],n=e.indexOf(v);y(e[Math.max(0,Math.min(2,n+(t<0?1:-1)))])}},children:[(0,U.jsxs)(Pc,{value:`cover`,className:`cover-page`,children:[(0,U.jsx)(bf,{track:V.track}),(0,U.jsxs)(`div`,{className:`cover-title`,children:[(0,U.jsx)(`h1`,{children:((i=V.track)==null?void 0:i.title)||`还没有播放音轨`}),(0,U.jsx)(`p`,{children:(a=V.track)==null?void 0:a.artist})]})]}),(0,U.jsxs)(Pc,{value:`info`,className:`info-page`,children:[(0,U.jsxs)(`div`,{className:`info-identity`,children:[(0,U.jsx)(bf,{track:V.track,small:!0}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`h2`,{children:((o=V.track)==null?void 0:o.title)||`暂无音轨`}),(0,U.jsx)(`p`,{children:(s=V.track)==null?void 0:s.artist})]})]}),(0,U.jsx)(`p`,{children:((c=V.track)==null?void 0:c.comment)||`本地音频`}),(0,U.jsxs)(`dl`,{children:[(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`专辑`}),(0,U.jsx)(`dd`,{children:((l=V.track)==null?void 0:l.album)||`—`})]}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`时长`}),(0,U.jsx)(`dd`,{children:Vd(V.duration)})]}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`来源`}),(0,U.jsx)(`dd`,{children:((u=V.track)==null?void 0:u.fileName)||`本地文件`})]}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`dt`,{children:`字幕`}),(0,U.jsx)(`dd`,{children:V.subtitleName||V.subtitleStatus})]})]})]}),(0,U.jsxs)(Pc,{value:`lyrics`,className:`lyrics-page`,children:[(0,U.jsx)(`div`,{className:`lyric-overlay`,children:(0,U.jsx)(`span`,{className:`scene-caption`,children:mt.filter(e=>e.kind===`scene`).map(e=>V.prefs.language===`ja`?Bd(e):V.prefs.language===`zh`?e.zh||`暂无中文翻译`:[Bd(e),e.zh].filter(Boolean).join(` / `)).join(` · `)})}),Et?(0,U.jsxs)(Cf,{title:V.incomingError?`无法打开音频`:V.subtitleError?`字幕暂时无法读取`:V.subtitleFolderNeeded?`允许读取同名字幕`:`这首音轨还没有字幕`,description:V.incomingError||V.subtitleStatus||`音乐播放不受影响。`,children:[` `,V.subtitleFolderNeeded&&(0,U.jsx)(q,{onClick:V.requestTree,children:`授权当前音乐文件夹`}),(0,U.jsx)(q,{variant:V.subtitleFolderNeeded?`ghost`:`default`,disabled:!V.track,onClick:()=>V.importSubtitle(),children:`选择字幕`}),!V.subtitleFolderNeeded&&(0,U.jsx)(q,{variant:`ghost`,onClick:()=>V.requestTree(),children:V.treeGranted?`重选字幕目录`:`授权同名字幕目录`})]}):(0,U.jsx)(vf,{cues:ht,active:gt,time:Wd(V.time,lt),follow:Oe,setFollow:ke,language:V.prefs.language,depth:V.prefs.depth,reducedMotion:V.reducedMotion,rubyVisible:V.prefs.ruby,layoutRevision:V.renderRevision||0,font:V.prefs.font*V.fontScale,rubyScale:V.prefs.rubyScale,offset:lt,duration:V.duration,trackKey:(((d=V.item)==null?void 0:d.itemId)||``)+`:`+(((f=V.doc)==null?void 0:f.fingerprint)||``),onCorrect:e=>V.correction(e.id),onSeek:e=>V.seek(Gd(e.startMs,lt,V.duration)),renderJapanese:e=>Tt({cue:e})}),V.readingBusy&&(0,U.jsx)(gl,{variant:`secondary`,children:`读音生成中`}),V.readingFailed&&(0,U.jsx)(q,{variant:`ghost`,size:`sm`,onClick:()=>V.pref(`ruby`,!0),children:`自动读音失败，点此重试`})]})]})]}),(0,U.jsxs)(`footer`,{className:`transport`,children:[(0,U.jsx)(Uc,{"aria-label":`播放进度`,value:[m==null?V.time:m],max:V.duration||1,step:100,disabled:!V.track||!V.duration,onValueChange:([e])=>h(e),onValueCommit:([e])=>{V.seek(e),h(null)}}),(0,U.jsxs)(`div`,{className:`time-labels`,children:[(0,U.jsx)(`span`,{children:Vd(V.time)}),(0,U.jsx)(`button`,{className:`study-shortcut`,disabled:!V.track||!V.duration,onClick:()=>st(`study`),children:V.listenRange?`复听中 · 管理`:`复听与书签`}),(0,U.jsx)(`span`,{children:Vd(V.duration)})]}),(0,U.jsxs)(`div`,{className:`transport-controls`,children:[(0,U.jsx)(yf,{label:kt,disabled:V.externalView,icon:V.prefs.shuffle?fe:V.prefs.repeat===`one`?ue:de,onClick:()=>st(`repeat`)}),(0,U.jsx)(yf,{label:`上一首`,icon:pe,disabled:!V.track||V.externalView,onClick:()=>V.skip(-1)}),(0,U.jsx)(q,{size:`play`,"aria-label":V.playing?`暂停`:`播放`,disabled:!V.track,onClick:V.toggle,children:V.playing?(0,U.jsx)(oe,{"data-icon":`inline-start`}):(0,U.jsx)(se,{"data-icon":`inline-start`})}),(0,U.jsx)(yf,{label:`下一首`,icon:me,disabled:!V.track||V.externalView,onClick:()=>V.skip(1)}),(0,U.jsx)(yf,{label:`打开播放队列`,icon:ie,disabled:V.externalView,onClick:()=>st(`queue`)})]})]})]}):(0,U.jsxs)(`div`,{className:`library`,children:[(0,U.jsxs)(`header`,{className:`compact-header`,children:[Ke&&We.path&&(0,U.jsx)(yf,{label:`返回上一级目录`,icon:D,onClick:()=>{Ge(We.parent),E(``)}}),S&&(0,U.jsx)(yf,{label:`返回文件列表`,icon:D,onClick:()=>{C(``),E(``)}}),F?(0,U.jsxs)(nl,{children:[(0,U.jsx)(al,{autoFocus:!0,"aria-label":`搜索音轨或专辑`,placeholder:`搜索音轨、专辑`,value:T,onChange:e=>E(e.target.value)}),(0,U.jsx)(il,{children:(0,U.jsx)(z,{})})]}):(0,U.jsx)(`h1`,{children:St}),b===`folders`&&!F&&(0,U.jsx)(yf,{label:`刷新音乐库`,icon:le,onClick:()=>{V.mediaPermission?V.refresh():V.requestMedia()}}),(0,U.jsx)(yf,{label:F?`关闭搜索`:`搜索`,icon:F?Ce:z,onClick:()=>{I(!F),E(``)}}),!F&&b===`playlists`&&!S&&(0,U.jsx)(yf,{label:`新建歌单`,icon:ce,onClick:()=>{et(``),Qe(``),nt(``),st(`playlist`)}}),(0,U.jsx)(yf,{label:`更多`,icon:N,onClick:()=>st(`menu`)})]}),b===`folders`&&!F&&(0,U.jsxs)(`div`,{className:`folder-view`,role:`group`,"aria-label":`文件夹浏览方式`,children:[(0,U.jsx)(`button`,{"aria-pressed":!Ve,onClick:()=>Xe(!1),children:(0,U.jsx)(`span`,{children:`平铺列表`})}),(0,U.jsx)(`button`,{"aria-pressed":Ve,onClick:()=>Xe(!0),children:(0,U.jsx)(`span`,{children:`按目录浏览`})}),(0,U.jsx)(`button`,{onClick:()=>ct(`works`),children:(0,U.jsx)(`span`,{children:`作品库`})})]}),qe&&(0,U.jsx)(`nav`,{className:`directory-crumbs`,"aria-label":`当前路径`,children:Ye.map((e,t)=>(0,U.jsxs)(`span`,{children:[t>0&&(0,U.jsx)(A,{}),(0,U.jsx)(`button`,{"aria-current":e===We?`location`:void 0,onClick:()=>Ge(e.path),children:e.name})]},e.path))}),!Ke&&!S&&!T&&b===`folders`&&(0,U.jsxs)(`div`,{className:`breadcrumb`,children:[`本地音乐 `,(0,U.jsx)(A,{}),` 文件夹`]}),(0,U.jsx)(`div`,{className:`library-scroll`,children:rt?(0,U.jsxs)(U.Fragment,{children:[qe&&V.tracks.length>0?(0,U.jsxs)(U.Fragment,{children:[Je.map(e=>(0,U.jsxs)(`button`,{className:`folder-row`,onClick:()=>Ge(e.path),children:[(0,U.jsx)(ne,{}),(0,U.jsx)(`strong`,{children:e.name}),(0,U.jsxs)(`small`,{children:[e.total,` 首`]}),(0,U.jsx)(A,{})]},e.path)),H.length>0&&(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(`div`,{className:`list-toolbar`,children:(0,U.jsxs)(q,{variant:`ghost`,size:`sm`,onClick:()=>{V.playCollection(H),y(`cover`),_(!0),ke(!0)},children:[(0,U.jsx)(se,{}),`播放本层 · `,H.length,` 首`]})}),wt]})]}):!S&&!T&&b===`folders`?V.tracks.length?[...Re.folders].map(([e,t])=>(0,U.jsxs)(`button`,{className:`folder-row`,onClick:()=>C(e),children:[(0,U.jsx)(ne,{}),(0,U.jsx)(`strong`,{children:t.name}),(0,U.jsx)(`small`,{children:t.tracks.length}),(0,U.jsx)(A,{})]},e)):(0,U.jsx)(Cf,{title:V.libraryLoading?`正在读取音乐库`:`还没有找到音频`,description:`将音乐放入手机后刷新，支持 MP3、WAV、MP4 等本地音频。`,children:(0,U.jsx)(q,{onClick:()=>V.refresh(),children:`刷新音乐库`})}):!S&&!T&&b===`albums`?[...Re.albums].map(([e,t])=>(0,U.jsxs)(`button`,{className:`album-row`,onClick:()=>C(e),children:[(0,U.jsx)(bf,{track:t[0],small:!0}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:t[0].album}),(0,U.jsxs)(`small`,{children:[t[0].albumArtist||t[0].folderName||t[0].artist,` · `,t.length,` 首`]})]}),(0,U.jsx)(A,{})]},e)):!S&&!T&&b===`playlists`?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`button`,{className:`album-row`,onClick:()=>C(`favorites`),children:[(0,U.jsx)(`span`,{className:`favorite-art`,children:(0,U.jsx)(re,{})}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:`我的收藏`}),(0,U.jsxs)(`small`,{children:[Ie.length,` 首`]})]}),(0,U.jsx)(A,{})]}),Le.map(e=>(0,U.jsxs)(`button`,{className:`album-row`,onClick:()=>C(e.id),children:[(0,U.jsx)(bf,{track:Re.byId.get(e.trackIds[0]),small:!0}),(0,U.jsxs)(`span`,{children:[(0,U.jsx)(`strong`,{children:e.name}),(0,U.jsxs)(`small`,{children:[e.trackIds.length,` 首`]})]}),(0,U.jsx)(A,{})]},e.id))]}):(0,U.jsxs)(U.Fragment,{children:[(0,U.jsxs)(`div`,{className:`list-toolbar`,children:[(0,U.jsxs)(q,{variant:`ghost`,size:`sm`,disabled:!H.length,onClick:()=>{V.playCollection(H),y(`cover`),_(!0),ke(!0)},children:[(0,U.jsx)(se,{"data-icon":`inline-start`}),`播放全部 · `,H.length,` 首`]}),vt&&(0,U.jsx)(q,{variant:`ghost`,size:`sm`,onClick:()=>{et(vt.id),Qe(vt.name),nt(``),st(`playlist`)},children:`编辑`})]}),H.length?wt:(0,U.jsx)(Cf,{title:T?`没有找到音轨`:`暂无音轨`,description:T?`试试其他关键词。`:`可以从音轨的更多操作加入歌单。`})]}),V.sourceError&&(0,U.jsxs)(fl,{children:[(0,U.jsx)(pl,{children:`音乐库暂时不可用`}),(0,U.jsx)(ml,{children:V.sourceError})]})]}):(0,U.jsx)(Cf,{title:`允许读取音乐文件`,description:`授权后可浏览本地音乐。`,children:(0,U.jsx)(q,{onClick:()=>V.requestMedia(),children:`允许访问`})})},qe?We.path:b),jt(),Mt]})}),(0,U.jsx)(Fc,{open:!!we,onOpenChange:e=>!e&&Te(``),children:(0,U.jsxs)(zc,{className:`app-sheet`,showCloseButton:!1,onEscapeKeyDown:e=>e.stopPropagation(),onCloseAutoFocus:e=>{var t;e.preventDefault(),(t=at.current)==null||t.focus()},children:[(0,U.jsxs)(Bc,{children:[(0,U.jsxs)(`div`,{className:`sheet-heading`,children:[(0,U.jsx)(Vc,{children:Dt[we]||`设置`}),(0,U.jsx)(Lc,{asChild:!0,children:(0,U.jsx)(yf,{label:`关闭面板`,icon:Ce})})]}),(0,U.jsx)(Hc,{className:`sr-only`,children:we===`queue`?`${V.queue.length} 首音轨`:Dt[we]||`调整选项`})]}),(0,U.jsxs)(`div`,{className:`sheet-scroll`,children:[we===`study`&&(0,U.jsx)(Xd,{p:V,cue:gt[0],offset:lt,marks:Ae.rows.filter(e=>e.source===je),save:e=>Ae.update(e.key,e),remove:e=>Ae.update(e),draft:Pe,onDraft:e=>Ne(e?{...e,source:je}:null)}),we===`menu`&&(0,U.jsxs)(`div`,{className:`action-list`,children:[(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>ct(`playback`),children:[(0,U.jsx)(B,{"data-icon":`inline-start`}),`播放设置`]}),(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>ct(`subtitles`),children:[(0,U.jsx)(R,{"data-icon":`inline-start`}),`字幕与读音`]}),(0,U.jsx)(q,{variant:`ghost`,onClick:()=>Te(`permissions`),children:`文件访问`}),(0,U.jsx)(q,{variant:`ghost`,onClick:()=>{V.refresh(),Te(``)},children:`刷新音乐库`})]}),we===`speed`&&(0,U.jsx)(Sf,{label:`播放速度`,value:String(V.prefs.speed),options:[`0.5`,`0.75`,`1`,`1.25`,`1.5`,`2`].map(e=>[e,e+`×`]),onChange:e=>V.pref(`speed`,Number(e))}),we===`repeat`&&(0,U.jsx)(Sf,{label:`播放顺序`,value:V.prefs.shuffle?`shuffle`:V.prefs.repeat,options:[[`off`,`顺序播放`],[`all`,`列表循环`],[`one`,`单曲循环`],[`shuffle`,`随机播放`]],onChange:e=>{V.pref(`repeat`,e===`shuffle`?`all`:e),V.pref(`shuffle`,e===`shuffle`)}}),we===`sleep`&&(0,U.jsx)(`div`,{className:`radio-options`,role:`radiogroup`,"aria-label":`睡眠定时`,children:[[`off`,`关闭`],[`15`,`15 分钟`],[`30`,`30 分钟`],[`60`,`60 分钟`],[`end`,`本首结束`]].map(([e,t])=>{let n=(V.sleep.mode===`timer`?String(V.sleep.minutes):V.sleep.mode)===e;return(0,U.jsxs)(`button`,{role:`radio`,"aria-checked":n,onClick:()=>{V.setSleep(e===`off`||e===`end`?{mode:e}:{mode:`timer`,minutes:Number(e),until:Date.now()+Number(e)*6e4}),Te(``)},children:[(0,U.jsx)(`span`,{children:t}),(0,U.jsx)(`span`,{className:`radio-dot`})]},e)})}),we===`theme`&&(0,U.jsx)(Sf,{label:`外观`,value:V.prefs.theme,options:[[`light`,`浅色`],[`dark`,`深色`],[`system`,`跟随系统`]],onChange:e=>V.pref(`theme`,e)}),we===`font`&&(0,U.jsxs)(Xc,{children:[(0,U.jsx)(Sf,{label:`字幕字号`,value:String(V.prefs.font),options:[[`16`,`16`],[`18`,`18`],[`20`,`20`],[`23`,`23`],[`24`,`24`],[`28`,`28`],[`32`,`32`],[`40`,`40`]],onChange:e=>V.pref(`font`,Number(e))}),(0,U.jsx)(`p`,{className:`font-preview`,style:{fontSize:V.prefs.font*V.fontScale},children:`今日は、ゆっくり歩いて帰ろう。`})]}),we===`rubySize`&&(0,U.jsxs)(Xc,{children:[(0,U.jsx)(Sf,{label:`读音大小`,value:String(V.prefs.rubyScale),options:[[`0.34`,`小`],[`0.42`,`标准`],[`0.55`,`大`]],onChange:e=>V.pref(`rubyScale`,Number(e))}),(0,U.jsxs)(`p`,{className:`font-preview`,children:[(0,U.jsxs)(`ruby`,{children:[`今日`,(0,U.jsx)(`rt`,{style:{fontSize:24*V.prefs.rubyScale*V.fontScale},children:`きょう`})]}),`は、ゆっくり。`]})]}),we===`offset`&&!V.offsetKey&&(0,U.jsx)(`p`,{children:`当前音轨没有可校准的字幕。`}),we===`offset`&&V.offsetKey&&(0,U.jsxs)(Xc,{children:[(0,U.jsxs)(Qc,{children:[(0,U.jsxs)($c,{children:[`字幕偏移 · `,lt>0?`+`:``,lt,` ms`]}),(0,U.jsx)(Uc,{"aria-label":`字幕偏移`,min:-5e3,max:5e3,step:100,value:[lt],onValueChange:([e])=>V.setOffset(e)}),(0,U.jsx)(el,{children:`正值让字幕晚出现，负值让字幕提前。仅应用于当前音轨和字幕。`})]}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>V.setOffset(0),children:`重置为 0 ms`})]}),we===`language`&&(0,U.jsxs)(Xc,{children:[(0,U.jsx)(Sf,{label:`显示语言`,value:V.prefs.language,options:[[`ja`,`日文`],[`zh`,`中文`],[`both`,`日中双语`]],onChange:e=>V.pref(`language`,e)}),(0,U.jsxs)(Qc,{orientation:`horizontal`,children:[(0,U.jsx)($c,{htmlFor:`lang-ruby`,children:`显示假名`}),(0,U.jsx)(Jc,{id:`lang-ruby`,checked:V.prefs.ruby,onCheckedChange:e=>V.pref(`ruby`,e)})]}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>ct(`subtitles`),children:`更多歌词设置`})]}),we===`queue`&&(0,U.jsx)(U.Fragment,{children:V.queue.length?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)(ff,{queue:V.queue,current:(p=V.item)==null?void 0:p.itemId,jump:V.jump,move:V.move,remove:V.remove}),(0,U.jsxs)(q,{variant:`outline`,onClick:()=>Te(`clearQueue`),children:[(0,U.jsx)(ye,{"data-icon":`inline-start`}),`清空播放队列`]})]}):(0,U.jsx)(Cf,{title:`队列是空的`,description:`从音轨的更多操作中添加下一首，或直接播放音轨。`,children:(0,U.jsx)(q,{onClick:()=>{Te(``),_(!1),k([]),x(`folders`),C(``),I(!1),E(``)},children:`返回曲库`})})}),we===`track`&&Ee&&(0,U.jsxs)(`div`,{className:`action-list`,children:[(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>{dt(Ee,yt&&bt?yt.indexOf(bt):void 0),Te(``)},children:[(0,U.jsx)(se,{"data-icon":`inline-start`}),`立即播放`]}),(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>{V.append(Ee,!0),Te(``)},children:[(0,U.jsx)(me,{"data-icon":`inline-start`}),`下一首播放`]}),(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>{V.append(Ee),Te(``)},children:[(0,U.jsx)(ce,{"data-icon":`inline-start`}),`加入播放队列`]}),(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>_t(Ee.id),children:[(0,U.jsx)(re,{"data-icon":`inline-start`}),Ie.includes(Ee.id)?`取消收藏`:`收藏音轨`]}),(0,U.jsxs)(q,{variant:`ghost`,onClick:()=>Te(`addPlaylist`),children:[(0,U.jsx)(ie,{"data-icon":`inline-start`}),`加入歌单`]}),vt&&(0,U.jsx)(q,{variant:`ghost`,onClick:()=>{V.playlist(`remove`,{id:vt.id,entryId:bt}).then(()=>{Te(``),Nl(`已从歌单移除，文件保持不变`)}).catch(e=>Nl.error(e.message))},children:`从当前歌单移除`})]}),we===`clearQueue`&&(0,U.jsxs)(Xc,{children:[(0,U.jsxs)(`p`,{children:[`清空当前队列中的 `,V.queue.length,` 首音轨？`]}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>Te(`queue`),children:`取消`}),(0,U.jsx)(q,{onClick:()=>V.clear().then(()=>{Te(`queue`),Nl(`队列已清空`)}).catch(e=>Nl.error(e.message)),children:`确认清空`})]}),we===`deletePlaylist`&&vt&&(0,U.jsxs)(Xc,{children:[(0,U.jsxs)(`p`,{children:[`删除「`,vt.name,`」及其中 `,vt.trackIds.length,` 条歌单记录？音频文件会保留。`]}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>Te(`playlist`),children:`取消`}),(0,U.jsx)(q,{onClick:()=>{V.playlist(`delete`,{id:$e}).then(()=>{C(``),Te(``),Nl(`歌单已删除，音频文件不变`)}).catch(e=>Nl.error(e.message))},children:`确认删除`})]}),we===`playlist`&&(0,U.jsx)(`form`,{onSubmit:e=>{e.preventDefault();let t=Ze.trim();t?Le.some(e=>e.name===t&&e.id!==$e)?nt(`这个名称已经存在，请换一个。`):V.playlist($e?`rename`:`create`,{id:$e,name:t}).then(()=>{Te(``),Nl.success($e?`歌单已重命名`:`歌单已创建`)}).catch(e=>nt(e.message)):nt(`请填写歌单名称。`)},children:(0,U.jsxs)(Xc,{children:[(0,U.jsxs)(Qc,{"data-invalid":!!tt,children:[(0,U.jsx)($c,{htmlFor:`list-name`,children:`歌单名称`}),(0,U.jsx)(tl,{id:`list-name`,maxLength:60,value:Ze,onChange:e=>Qe(e.target.value),"aria-invalid":!!tt,placeholder:`例如：睡前慢听`}),tt&&(0,U.jsx)(el,{children:tt})]}),(0,U.jsx)(q,{type:`submit`,children:`保存歌单`}),$e&&(0,U.jsx)(q,{type:`button`,variant:`outline`,onClick:()=>Te(`deletePlaylist`),children:`删除歌单`})]})}),we===`addPlaylist`&&Ee&&(0,U.jsx)(`div`,{className:`action-list`,children:Le.length?Le.map(e=>(0,U.jsxs)(q,{variant:`outline`,onClick:()=>{V.playlist(`add`,{id:e.id,trackId:Ee.id}).then(()=>{Te(``),Nl.success(`已加入 `+e.name)}).catch(e=>Nl.error(e.message))},children:[(0,U.jsx)(ie,{"data-icon":`inline-start`}),e.name]},e.id)):(0,U.jsx)(Cf,{title:`先创建一张歌单`,description:`创建后，回到音轨的更多操作即可加入。`,children:(0,U.jsx)(q,{onClick:()=>{et(``),Qe(``),nt(``),Te(`playlist`)},children:`创建歌单`})})}),we===`permissions`&&(0,U.jsxs)(Xc,{children:[(0,U.jsx)(`p`,{children:`音乐访问与字幕目录授权相互独立。音频及字幕原文件保持不变。`}),(0,U.jsx)(xf,{icon:ne,label:`音乐库访问`,value:rt?`已允许`:`未授权`,onClick:()=>V.requestMedia()}),(0,U.jsx)(xf,{icon:O,label:`字幕目录`,value:V.treeGranted?`已选择`:`选择目录`,onClick:()=>V.requestTree()}),(0,U.jsx)(q,{variant:`outline`,onClick:()=>V.refresh(),children:`刷新音乐库`})]})]})]})}),(0,U.jsx)(Jl,{theme:ot?`dark`:`light`,position:`top-center`,richColors:!1})]})}(0,V.createRoot)(document.getElementById(`root`)).render((0,U.jsx)(Df,{}));