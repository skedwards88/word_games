if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let f={};const d=e=>i(e,l),o={module:{uri:l},exports:f,require:d};s[l]=Promise.all(n.map((e=>o[e]||d(e)))).then((e=>(r(...e),f)))}}define(["./workbox-f0806d7b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"289a5b952bf62f6eded7.svg",revision:null},{url:"2e12981e791cab4de32d.svg",revision:null},{url:"37f86b02252d5a521256.svg",revision:null},{url:"60a4f916a6c4fe2aa01c.svg",revision:null},{url:"7949cdd6b45f0bfd1068.svg",revision:null},{url:"88f0694fbc4d975e9b65.svg",revision:null},{url:"assets/favicon.ico",revision:"65e98da82285f996fadbb4098fe093f4"},{url:"assets/favicon.svg",revision:"17ca450c02d67638429936c603479974"},{url:"assets/icon_192.png",revision:"b6e391fe2b2b3cd640e9ae7eef17740d"},{url:"assets/icon_512.png",revision:"c10afbb91c6767c869d279e8e547ec0a"},{url:"assets/manifest.json",revision:"88289b1c661beb2db004da478a8ad023"},{url:"assets/maskable_icon.png",revision:"2a6b8f258abe3188f88d64370cfb418f"},{url:"bundle.js",revision:"ce10d1e8eb95928c69487d7560f4b535"},{url:"bundle.js.LICENSE.txt",revision:"fb6fca4f0fa26a7e27d26480a74532c9"},{url:"c4ff067d0d28b5d3b44e.svg",revision:null},{url:"d3a26b5cae7ba522cd8d.svg",revision:null},{url:"dcd7a5ab56f29955395e.svg",revision:null},{url:"f266db7f0ac493bacf03.svg",revision:null},{url:"f5bd50fa205a9c73b31b.svg",revision:null},{url:"fbe1790b2daf41efaacd.svg",revision:null},{url:"index.html",revision:"e588d6e9d55ef17ee65371d5f7e88a3b"}],{})}));
