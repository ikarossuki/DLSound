// APIs used by the UI and its component libraries on the Android 8 system WebView.
if (typeof globalThis === 'undefined') Object.defineProperty(window, 'globalThis', {value:window});
if (!Array.prototype.at) Object.defineProperty(Array.prototype,'at',{value:function(index:number){
 const i=Math.trunc(index)||0; return this[i<0?this.length+i:i];
}});
if (!Object.fromEntries) Object.fromEntries = (entries:Iterable<readonly [PropertyKey,any]>) => {
 const object:any={}; for (const [key,value] of entries) Object.defineProperty(object,key,{value,configurable:true,enumerable:true,writable:true});
 return object;
};
if (!Object.hasOwn) Object.hasOwn = (object,key) => Object.prototype.hasOwnProperty.call(object,key);
const media = window.matchMedia('(min-width:0px)');
if (!media.addEventListener) {
 const prototype=Object.getPrototypeOf(media);
 prototype.addEventListener=function(type:string,handler:EventListener){if(type==='change')this.addListener(handler);};
 prototype.removeEventListener=function(type:string,handler:EventListener){if(type==='change')this.removeListener(handler);};
}

if (!CSS.supports('selector(:where(*))')) {
 const style=document.createElement('link');
 style.rel='stylesheet'; style.href='/legacy.css'; document.head.appendChild(style);
}
