import{a as w,i as p,S as v}from"./assets/vendor-f144e563.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const b=t=>t.reduce((i,{tags:o,webformatURL:r,largeImageURL:e,likes:s,views:c,comments:y,downloads:L})=>i+`<li class="photo-container">
      <a href=${e} class="card-link js-card-link">
          <img class="photo" src="${r}" alt="${o}" >
      </a>
      <div class="info">
          <div class="info-item">
              <span class="title">Likes</span>
              <span class="info">${s}</span>
          </div>
          <div class="info-item">
              <span class="title">Views</span>
              <span class="info">${c}</span>
          </div>
          <div class="info-item">
              <span class="title">Comments</span>
              <span class="info">${y}</span>
          </div>
          <div class="info-item">
              <span class="title">Downloads</span>
              <span class="info">${L}</span>
          </div>
      </div>
  </li>
      `,""),P="43981018-e90bba841625934206eceb401",S="https://pixabay.com/api/",q=async(t,i=1,o=15)=>{const r=new URLSearchParams({key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:o,page:i});try{return(await w.get(`${S}/?${r}`)).data}catch{throw new Error("Sorry, something went wrong with the API request.")}},d=document.querySelector(".gallery"),$=document.querySelector(".form"),n=document.querySelector(".loader"),a=document.querySelector(".btn-load");let m="",l=1;const h=15;let f=0,u=null;async function g(){try{const t=await q(m,l,h);if(f=Math.ceil(t.totalHits/h),t.hits.length===0&&l===1){p.error({position:"topRight",timeout:2e3,message:"Sorry, there are no images matching your search query. Please try again!"}),a.classList.add("is-hidden"),n.classList.add("is-hidden");return}const i=d.getBoundingClientRect().height;d.insertAdjacentHTML("beforeend",b(t.hits));const r=d.getBoundingClientRect().height-i;window.scrollBy({top:r,behavior:"smooth"}),u?u.refresh():u=new v(".gallery a",{captionsData:"alt",captionsDelay:250}),l>=f||t.hits.length<h?a.classList.add("is-hidden"):a.classList.remove("is-hidden"),n.classList.add("is-hidden")}catch{p.error({position:"topRight",timeout:2e3,message:"Sorry, something went wrong. Please try again!"}),n.classList.add("is-hidden"),a.classList.remove("is-hidden")}}async function E(t){if(t.preventDefault(),m=t.target.elements.text.value.trim(),d.innerHTML="",l=1,a.classList.add("is-hidden"),n.classList.remove("is-hidden"),m===""){p.error({position:"topRight",timeout:2e3,message:"Please enter a search query!"}),n.classList.add("is-hidden");return}await g(),t.target.reset()}async function H(){l+=1,a.classList.add("is-hidden"),n.classList.remove("is-hidden"),await g()}$.addEventListener("submit",E);a.addEventListener("click",H);
//# sourceMappingURL=commonHelpers.js.map
