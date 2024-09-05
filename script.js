var tl = gsap.timeline();
// loader animation
document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll("#images img");
  var currentImage = 0;

  function showNextImage() {
    if (currentImage > 0) {
      images[currentImage - 1].style.opacity = 0;
    }
    if (currentImage < images.length) {
      images[currentImage].style.opacity = 1;
      currentImage++;
      setTimeout(showNextImage, 140);
    } else {
      tl.to("#loader", {
        duration: 1.5,
        ease: "power1.inOut",
        y: -1200,
      });
      tl.from(
        "#page1",
        {
          y: 1000,
        },
        "-=9"
      );
      tl.from(
        ".content h2",
        {
          y: 1000,
          duration: 0.5,
          stagger: 0.06,
          ease: "slow",
        },
        "-=1"
      );
    }
  }
  showNextImage();
});
function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function videoAnimation() {
  tl.to("#videoContainer video", {
    scale: 1,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#videoContainer",
      start: "top 0%",
      end: "top -100%",
      scrub: 2,
      // markers: true,
      pin: true,
    },
  });
}
function textAnimation() {
  gsap.to("#text-content h2 , .para p", {
    transform: "translateY(0%)",
    duration: 0.7,
    stagger: 0.2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3",
    },
  });
}
function expertiseTextAnimation() {
  gsap.to("#page5 h2", {
    transform: "translateX(-120%)",
    delay: 20,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page5",
      scrub: 2,
      start: "top 0%",
      end: "top -200%",
      // markers:true,
      pin: true,
    },
  });
}
function cursorMove(){
  document.addEventListener("mousemove", function (dets) {
    gsap.to(".cursor", {
      x: dets.clientX - 30,
      top: dets.clientY - 7,
    });
  });
  // Select all elements with the class 'show'
  var showElements = document.querySelectorAll(".show");
  
  // Loop through each selected element and attach the event listeners
  showElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      gsap.to(".cursor", {
        display: "block",
      });
    });
  
    element.addEventListener("mouseleave", function () {
      gsap.to(".cursor", {
        display: "none",
      });
    });
  });
  
}
function navbarMove(){
var nav = document.querySelector("#nav");
document.addEventListener("wheel", function (e) {
  // console.log(e.deltaY);
  if (e.deltaY > 1) {
    gsap.to(nav, {
      y: -200,
      duration: 0.5,
    });
  } else if (e.deltaY < 0) {
    gsap.to(nav, {
      y: 0,
      duration: 0.5,
    });
  }
});
}
navbarMove();
locomotive();
videoAnimation();
textAnimation();
expertiseTextAnimation();
cursorMove();