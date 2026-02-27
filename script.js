
// theme + image system
const themes =["orange-theme", "black-theme", "blue-theme"];


const contactimg = document.getElementById("poster");

function settheme(theme) {
  document.body.classList.remove(...themes);
document.body.classList.add(theme);

chnageimage(theme);
}

function chnageimage(theme) {
  if (!contactimg) 
   return;
  
  if (theme === "orange-theme") {
    contactimg.src = "./o.png";
  }
  else if (theme === "black-theme") {
    contactimg.src = "./bl.png";

  }
  else if (theme === "blue-theme") {
    contactimg.src = "./b.png";
  }
  else{
    contactimg.src = "./g.png";
  }
//  cache fix
  contactimg.src +="?v=" + Date.now();
  
}

// button
document.getElementById("orange").addEventListener("click",()=>{
  settheme("orange-theme");
});
document.getElementById("black").addEventListener("click",()=>{
  settheme("black-theme");
});
document.getElementById("blue").addEventListener("click",()=>{
  settheme("blue-theme");
});


  /* -------------------------
     Smooth Typing Animation
  --------------------------*/
  const text = document.querySelector(".text h3");
  const words = [
    "TASTE THE",
     "POWER YOUR DAY",
      "POWER WITH EVERY",
      "MONSTER MODE ON"
      ];
  
   let wordindex =0;
   let charindex =0;
   let deleting = false;

function typeEffect() {
  let currentword = words[wordindex];

if (!deleting) {
  text.textContent = currentword.slice(0,charindex +1);
  charindex++;


if (charindex === currentword.length) {
  setTimeout(()=> deleting=true,1000);
}
}

else{
  text.textContent = currentword.slice(0, charindex-1);
  charindex--;

  if (charindex === 0) {
    deleting= false;
    wordindex = (wordindex + 1)% words.length;
  }
}

setTimeout(typeEffect,deleting? 50: 100);
}

typeEffect();

/* -------------------------
     Premium Scroll Animations
  --------------------------*/
  const Elements = document.querySelectorAll(
    ".contact, .bottom-img, .about-image, .feature, .about-text, .zigzag-row, .zigzag-products, .contact-form, .about-section,  .img-cube, .text, .btn, .box, .img"
  );


  

  const scrollobserver = new IntersectionObserver(
    entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        entry.target.classList.remove("hide")
      }
      else{
        entry.target.classList.remove("show")
        entry.target.classList.add("hide")
      }
    });
  }, { threshold: 0.2 });

  Elements.forEach(el =>{
    el.classList.add("hide");
    scrollobserver.observe(el);
  });

// btn
document.querySelectorAll(".buy-btn").forEach(btn=>{
  btn.addEventListener("click",()=>{
    alert("Your Order is Confirmed ✅");
  });
});









