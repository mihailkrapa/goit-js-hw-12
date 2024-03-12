import{a as v,S as _,i as f}from"./assets/vendor-64b55ca9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const m={API_KEY:"26114723-eab203642ec2629c12fb3e14b",BASE_URL:"https://pixabay.com/api"};async function h(e,t){const r={key:m.API_KEY,page:t,per_page:15,q:e,image_type:"image",orientation:"horizontal",safesearch:!0};return(await v.get(`${m.BASE_URL}/`,{params:r})).data}const x=new _(".images-list a",{captionsData:"alt",captionDelay:250});function y(e,t){e.insertAdjacentHTML("beforeend",C(t)),x.refresh()}function C(e){return e.map(P).join("")}function P({webformatURL:e,largeImageURL:t,tags:r,likes:a,views:s,comments:o,downloads:i}){return`
        <li class="images__item">
          <a
            class="images__link"
            href="${t}"
          >
            <img
              class="images__image"
              src="${e}"
              alt="${r}"
              
            />
          </a>
         <span class="images-info">
            <p class="text-center">Likes <span class="images-text">${a}</span></p>
            <p class="text-center">Views <span class="images-text">${s}</span></p> 
            <p class="text-center">Comments <span class="images-text">${o}</span></p>
            <p class="text-center">Downloads <span class="images-text">${i}</span></p>
         </span>
        </li>
      `}const q="/goit-js-hw-12/assets/error-d765a61d.svg",$="/goit-js-hw-12/assets/warning-33a8e06d.svg",E="/goit-js-hw-12/assets/success-9451f8db.svg",I=document.querySelector(".js-hero-form"),d=document.querySelector(".images-list"),b=document.querySelector(".loader"),u=document.querySelector(".js-load-more-btn");let n=1,c,p;const w=15;d.innerHTML="";const j=async()=>{S(),n+=1;const e=await h(c,n);y(d,e.hits);const t=Math.ceil(e.totalHits/w);n===t&&(l(),L("We're sorry, but you've reached the end of search results.")),g(),O()},B=async e=>{e.preventDefault(),n=1,c=e.target.elements.query.value.trim(),c===""&&(l(),H()),S();try{const t=await h(c,n);t.hits.length===0&&(g(),l(),L("Sorry, there are no images matching<br> your search query. Please try again!"),e.target.reset()),t.totalHits<w?l():M(),A(t),y(d,t.hits)}catch(t){console.error(t)}g(),e.target.reset()};u.addEventListener("click",j);I.addEventListener("submit",B);function H(){f.warning({titleColor:"#fff",messageColor:"#fff",backgroundColor:"#ffa000",iconUrl:$,message:"Please enter a search query",position:"topRight"})}function L(e){f.error({titleColor:"#fff",messageColor:"#fff",backgroundColor:"#ef4040",iconUrl:q,message:e,position:"topRight"})}function A(e){f.success({titleColor:"#fff",messageColor:"#fff",backgroundColor:"#28a745",message:`We found ${e.totalHits} images.`,iconUrl:E,position:"topRight"})}function S(){b.classList.add("visible")}function g(){b.classList.remove("visible")}function M(){u.classList.remove("is-hidden")}function l(){u.classList.add("is-hidden")}function O(){p=document.querySelector(".images__image").getBoundingClientRect().height,window.scrollBy({top:2*p,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
