const gallery = document.getElementById("gallery");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupTitle = document.getElementById("popup-title");
const popupVideo = document.getElementById("popup-video");
const popupDownload = document.getElementById("popup-download");
const popupContent = document.querySelector(".popup-content");

heroes.forEach((hero) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img src="${hero.img}" /><p>${hero.name_hero}</p>`;
  card.addEventListener("click", (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    popupImg.src = hero.img;
    popupName.textContent = hero.name_hero;
    popupTitle.textContent = hero.title;
    popupVideo.src = hero.video;
    popupDownload.onclick = () => window.open(hero.link, "_blank");

    popup.style.display = "flex";
    popupContent.style.transformOrigin = `${x}px ${y}px`;
    popupContent.style.transform = "scale(0.4)";
    popupContent.style.opacity = "0";

    requestAnimationFrame(() => {
      popupContent.style.transform = "scale(1)";
      popupContent.style.opacity = "1";
    });
  });
  gallery.appendChild(card);
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popupContent.style.transform = "scale(0.4)";
    popupContent.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
      popupVideo.src = "";
    }, 300);
  }
});

const openPopupBtn = document.getElementById("openCustomPopup");
const customPopup = document.getElementById("customPopup");
const popupIframe = document.getElementById("popupIframe");
const openChannel = document.getElementById("name");

openPopupBtn.addEventListener("click", () => {
  popupIframe.src = "https://zatamod.github.io/FlapCat";
  customPopup.style.display = "flex";
});

openChannel.addEventListener("click", () => {
  window.open("https://youtube.com/@zatamod", "_blank");
});

function closeCustomPopup() {
  customPopup.style.display = "none";
  popupIframe.src = "";
}