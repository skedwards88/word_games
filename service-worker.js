if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const f=e=>i(e,l),c={module:{uri:l},exports:o,require:f};s[l]=Promise.all(n.map((e=>c[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-f0806d7b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"0a36d2459824b25a9420.svg",revision:null},{url:"139a76f0208a818ec636.svg",revision:null},{url:"1bfe0170bc2758adf1fd.svg",revision:null},{url:"9b3a70069f0ee2f1f92e.svg",revision:null},{url:"assets/favicon.ico",revision:"65e98da82285f996fadbb4098fe093f4"},{url:"assets/favicon.svg",revision:"17ca450c02d67638429936c603479974"},{url:"assets/icon_192.png",revision:"b6e391fe2b2b3cd640e9ae7eef17740d"},{url:"assets/icon_512.png",revision:"c10afbb91c6767c869d279e8e547ec0a"},{url:"assets/manifest.json",revision:"88289b1c661beb2db004da478a8ad023"},{url:"assets/maskable_icon.png",revision:"2a6b8f258abe3188f88d64370cfb418f"},{url:"b440034c81465bc2c662.svg",revision:null},{url:"bd0a063357b96e7f08e8.svg",revision:null},{url:"bundle.js",revision:"f82193ab67a2800010eb6fcabc2c4676"},{url:"bundle.js.LICENSE.txt",revision:"fb6fca4f0fa26a7e27d26480a74532c9"},{url:"c24057a796c061ae84fe.svg",revision:null},{url:"ff7da06a42bcd542d4bb.svg",revision:null},{url:"index.html",revision:"e588d6e9d55ef17ee65371d5f7e88a3b"}],{})}));
