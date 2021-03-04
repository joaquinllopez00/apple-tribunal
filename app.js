let controller;
let slideScene;
let pageScene;
let detailScene;
const burger = document.querySelector(".burger");
gsap.config({
  nullTargetWarn: false,
});

function aniSlides() {
  controller = new ScrollMagic.Controller();
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");

  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    const slideTl = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" } });
    if (slide.classList.contains("mac")) {
      const title = slide.querySelector(".intro-text");
      slideTl.fromTo(title, 1, { scale: 0 }, { scale: 1 });
    }
    slideTl.fromTo(revealImg, { x: "0%" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 1.5 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "150%" }, "-=0.5");

    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
    })
      .setTween(slideTl)
      .addTo(controller);

    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    if (nextSlide === "end") {
      return false;
    }
    pageTl.fromTo(nextSlide, { y: "0%" }, { y: "50%" });
    pageTl.fromTo(slide, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.5 });
    pageTl.fromTo(nextSlide, { y: "50%" }, { y: "0%" }, "-=0.5");
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(pageTl)
      .addTo(controller);
  });
}

function navToggle(e) {
  if (!e.target.classList.contains("active")) {
    e.target.classList.add("active");
    gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "red" });
    gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "red", width: "3rem" });
    gsap.to(".line3", 0.3, { background: "black", x: -10 });
    gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
    gsap.to(".nav-header", 0.1, { position: "sticky", top: 0 });
    gsap.to("#logo", 1, { color: "black" });
    document.body.classList.add("hide");
  } else {
    e.target.classList.remove("active");
    gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
    gsap.to(".line3", 0.5, { background: "white", x: 0 });
    gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
    gsap.to(".nav-header", 0.1, { position: "relative", top: 0 });
    gsap.to("#logo", 1, { color: "white" });
    document.body.classList.remove("hide");
  }
}

aniSlides();

burger.addEventListener("click", navToggle);
