import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync} from 'node:fs';
import {adb,serial,connect,delay,sh} from './v12-cdp.mjs';
const output='artifacts/v1.3.4';
mkdirSync(output,{recursive:true});
const d=await connect();
const checks=[];
async function wait(expr){
 for(let i=0;i<140;i++){if(await d.evaluate(expr)) return;await delay(125);}
 throw Error(expr+' / '+await d.evaluate('document.body.innerText.slice(0,350)'));
}
async function row(label){
 const target=JSON.stringify(label);
 const selector='[...document.querySelectorAll("button")].find(b=>b.getAttribute("aria-label")==='+target+' || b.textContent.trim()==='+target+' || b.querySelector("span")?.textContent==='+target+')';
 await wait('!!('+selector+')');await d.evaluate('('+selector+').click()');await delay(160);
}
async function back(){sh('shell','input','keyevent','4');await delay(350);}
async function shot(name){await d.evaluate("new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))");await delay(500);writeFileSync(output+'/'+name+'.png',execFileSync(adb,['-s',serial,'exec-out','screencap','-p'],{maxBuffer:10*1024*1024}));}
const heading=title=>'document.querySelector(".compact-header h1")?.textContent==='+JSON.stringify(title);
try{
 await row('我的');await wait(heading('我的'));await shot('profile');checks.push('个人页、底部导航');
 await row('设置');await wait(heading('设置'));await shot('settings');
 await row('播放');await row('播放速度');await row('1.25×');await row('关闭面板');await wait('document.body.innerText.includes("1.25×")');
 await row('播放顺序');await row('单曲循环');await row('关闭面板');await wait('document.body.innerText.includes("单曲循环")');
 await row('睡眠定时');await row('15 分钟');await wait('document.body.innerText.includes("15 分钟")');
 await row('睡眠定时');await row('关闭');await back();await wait(heading('设置'));checks.push('速度、循环、定时及系统返回');
 await row('字幕与读音');await row('字幕语言');await row('日中双语');await row('关闭面板');
 await wait('document.querySelector(".font-preview").innerText.includes("明天见")');
 if(await d.evaluate('document.querySelector("#ruby").getAttribute("aria-checked")==="false"'))await d.evaluate('document.querySelector("#ruby").click()');
 await wait('!!document.querySelector(".font-preview rt")');
 await d.evaluate('document.querySelector("#ruby").click()');await wait('!document.querySelector(".font-preview rt")');await d.evaluate('document.querySelector("#ruby").click()');
 await row('字幕字号');await row('24');await row('关闭面板');await row('读音大小');await row('大');await row('关闭面板');
 await back();await row('外观');await row('主题');await row('深色');await row('关闭面板');await wait('document.documentElement.classList.contains("dark")');
 await row('主题');await row('浅色');await row('关闭面板');await back();checks.push('字幕双语、假名、字号和深浅色');
 await row('文件与曲库');await d.evaluate('const sel=document.querySelector(".profile-choice select");sel.value="tree";sel.dispatchEvent(new Event("change",{bubbles:true}))');await wait('JSON.parse(DLSound.readFolderBrowser()).tree');
 await row('刷新音乐库');await back();await back();await row('关于 DL Sound');await wait('document.body.innerText.includes("1.3.4")&&document.body.innerText.includes("18")');await shot('about');
 await row('检查更新');await wait('document.querySelector(".profile-scroll [role=status]")?.innerText.match(/GitHub 暂未|已是最新|未能连接|发现新版本/)');
 checks.push('更新结果：'+await d.evaluate('document.querySelector(".profile-scroll [role=status]").innerText'));
 await row('开源许可');await row('DL Sound 与上游播放器');await wait('document.querySelector("pre").textContent.includes("GNU GENERAL PUBLIC LICENSE")');await back();await row('Kuromoji');await wait('document.querySelector("pre").textContent.includes("Apache License")');await back();await back();
 await row('第三方声明');await row('IPADIC 词典');await wait('document.querySelector("pre").textContent.includes("Nara Institute")');await back();await row('界面组件');await wait('document.querySelector("pre").textContent.includes("MIT License")');checks.push('四份离线许可证与声明');
 console.log(checks.join('\n'));
}finally{d.close();}
