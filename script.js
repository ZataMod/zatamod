const effectSwitch = document.querySelector("#effectDiv .switch input");  
let effectEnabled = localStorage.getItem("effectEnabled") === null ? true : (localStorage.getItem("effectEnabled") === "true");  
effectSwitch.checked = effectEnabled;  

function updateEffects(enabled) {  
  if(enabled){  
    document.querySelectorAll("figure, .profile img, .profile button, .download-btn")  
            .forEach(el => animateShadowCircle(el));  
  } else {  
    document.querySelectorAll("figure, .profile img, .profile button, .download-btn")  
            .forEach(el => el.style.boxShadow = "none");  
  }  
}  

effectSwitch.addEventListener("change", () => {  
  effectEnabled = effectSwitch.checked;  
  localStorage.setItem("effectEnabled", effectEnabled);  
  updateEffects(effectEnabled);  
});  

const bgMusic = new Audio('https://files.catbox.moe/ccn3hi.m4a');  
bgMusic.loop = true;  
let musicStarted = false;  

const container = document.getElementById("gallery");  
const popup = document.getElementById('welcomePopup');  

function preloadImages(urls, allImagesLoadedCallback) {  
  let loadedCounter = 0;  
  const toBeLoadedNumber = urls.length;  
  urls.forEach(url => {  
    const img = new Image();  
    img.src = url;  
    img.onload = () => {  
      loadedCounter++;  
      if(loadedCounter === toBeLoadedNumber) allImagesLoadedCallback();  
    };  
  });  
}  

function renderGallery() {  
  heroes.forEach(hero => {  
    const figure = document.createElement("figure");  
    const img = document.createElement("img");  
    img.src = hero.img;  
    const caption = document.createElement("figcaption");  
    caption.textContent = hero.title;  
    const downloadBtn = document.createElement("button");  
    downloadBtn.textContent = "DOWNLOAD";  
    downloadBtn.className = "download-btn";  
    downloadBtn.onclick = e => {  
      e.stopPropagation();  
      window.open(hero.link, "_blank");  
    };  
    figure.append(img, caption, downloadBtn);  
    container.appendChild(figure);  
    figure.addEventListener("mouseenter", () => {  
      setTimeout(() => downloadBtn.classList.add("unlocked"), 500);  
    });  
    figure.addEventListener("mouseleave", () => downloadBtn.classList.remove("unlocked"));  
  });  
}  

function animateShadowCircle(el) {  
  let hue = 0;  
  let angle = 0;  
  const radius = 10;  
  function update() {  
    if(!effectEnabled) return;  
    hue = (hue + 0.5) % 360;  
    angle += 0.05;  
    const x = Math.cos(angle) * radius;      
    const y = Math.sin(angle) * radius;      
    el.style.boxShadow = `  
      ${x}px ${y}px 15px hsl(${hue}, 60%, 70%),  
      ${-x}px ${-y}px 30px hsl(${(hue+120)%360}, 60%, 70%)  
    `;  
    requestAnimationFrame(update);  
  }  
  update();  
}  

let animationsStarted = false;  

function startExperience() {  
  if(animationsStarted) return;  
  gsap.to(".profile", { opacity: 1, duration: 0.1 });  
  gsap.to(".profile img", { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" });  
  gsap.to(".profile button", { y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out" });  
  preloadImages(heroes.map(h => h.img), () => {  
    gsap.to("figure", { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", stagger: 0.2 });  
    if(effectEnabled){  
      document.querySelectorAll("figure, .profile img, .profile button, .download-btn")  
              .forEach(el => animateShadowCircle(el));  
    }  
  });
  bgMusic.play()
  musicStarted = true;
  animationsStarted = true;  
}  

document.addEventListener('DOMContentLoaded', () => {  
  renderGallery();  
  popup.style.display = 'flex';  
  document.querySelector('.close-btn').addEventListener('click', () => {  
    popup.style.display = 'none';  
    startExperience();  
  });  
  popup.addEventListener('click', e => {  
    if(e.target === popup){  
      popup.style.display = 'none';  
      startExperience();  
    }  
  });  
});