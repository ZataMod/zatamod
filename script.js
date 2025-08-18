// Audio setup
const bgMusic = new Audio('https://vnso-zn-23-tf-a128-z3.zmdcdn.me/4fa91f1f25b5b7007ce024e45809b208?authen=exp=1755689453~acl=/4fa91f1f25b5b7007ce024e45809b208*~hmac=7eb2a951b44a6c630f6203e8639402bc5a*~hmac=8252efc3af173fbc7ffc1c30aa09cd8e');
bgMusic.loop = true;
let musicStarted = false;
let animationsStarted = false;

// DOM elements
const container = document.getElementById("gallery");
const popup = document.getElementById('welcomePopup');

// Preload images
function preloadImages(urls, allImagesLoadedCallback) {
  let loadedCounter = 0;
  const toBeLoadedNumber = urls.length;
  
  urls.forEach(function(url) {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      loadedCounter++;
      if(loadedCounter === toBeLoadedNumber) {
        allImagesLoadedCallback();
      }
    };
  });
}

// Render gallery
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
    downloadBtn.onclick = (e) => {
      e.stopPropagation();
      window.open(hero.link, "_blank");
    };

    figure.appendChild(img);
    figure.appendChild(caption);
    figure.appendChild(downloadBtn);
    container.appendChild(figure);

    // Hover effects
    figure.addEventListener("mouseenter", () => {
      setTimeout(() => {
        downloadBtn.classList.add("unlocked");
      }, 500);
    });

    figure.addEventListener("mouseleave", () => {
      downloadBtn.classList.remove("unlocked");
    });
  });
}

// Animate soft rotating shadow
function animateShadowCircle(el) {
  let hue = 0;
  let angle = 0;
  const radius = 10;

  function update() {
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

// Start all animations and music
function startExperience() {
  if (!animationsStarted) {
    // Start music
    bgMusic.play().catch(e => console.log("Auto-play prevented:", e));
    musicStarted = true;
    
    // Profile animations
    gsap.to(".profile", { opacity: 1, duration: 0.1 });
    gsap.to(".profile img", { 
      scale: 1, 
      opacity: 1, 
      duration: 1, 
      ease: "back.out(1.7)" 
    });
    gsap.to(".profile button", { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      delay: 0.5, 
      ease: "power3.out" 
    });

    // Gallery animations after images load
    preloadImages(heroes.map(h => h.img), () => {
      gsap.to("figure", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2
      });
    });

    // Shadow animations
    const shadowElements = [
      ...document.querySelectorAll("figure, .profile img, .profile button, .download-btn")
    ];
    shadowElements.forEach(el => animateShadowCircle(el));
    
    animationsStarted = true;
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Render gallery
  renderGallery();
  
  // Show popup
  popup.style.display = 'flex';

  // Close popup handlers
  document.querySelector('.close-btn').addEventListener('click', () => {
    popup.style.display = 'none';
    startExperience();
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.style.display = 'none';
      startExperience();
    }
  });
});
