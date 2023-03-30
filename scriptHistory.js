"use strict";
//import data from "./astroData.json" assert { type: "json" }; Do not work in FF

fetch("./cultures.json")
  .then((res) => res.json())
  .then((data) => {
    const numbOfObjects = Object.keys(data.cultureData).length;
    const selectNumbOfObjectsElement = document.querySelector("#num-obj");
    const numP = document.createElement("p");
    const spaceforTime = 13.28;

    let myArticle = document.createElement("article");
    let main = null;
    let myH2 = null;
    let cultureSection = document.createElement("section");
    cultureSection.setAttribute("id", "culture-section");

    let timeSection = document.createElement("section");
    timeSection.setAttribute("id", "time-section");
    main = document.querySelector("main");
    myH2 = document.createElement("h2");
    main.appendChild(timeSection);
    main.appendChild(cultureSection);

    for (let i = 0; i <= 46; i++) {
      let timeDiv = document.createElement("div");
      timeDiv.setAttribute("id", "time-div");
      timeSection.appendChild(timeDiv);

      let timeText = document.createElement("span");
      const eraBCE = `BCE`;
      const eraCE = `CE`;
      let time = -2600 + i * 100;
      if (time < 0) {
        timeText.textContent = `${-2600 + i * 100} ${eraBCE}`;
      } else if (time >= 0) {
        timeText.textContent = `${-2600 + i * 100} ${eraCE}`;
      }

      timeDiv.appendChild(timeText);
      timeDiv.style.top = i * 25 + "px";
      timeDiv.style.left = 0;
    }

    function populate() {
      Object.entries(data.cultureData).forEach(([key, value]) => {
        createCultureElement(value);
      });
    }

    let overlapTimeAndContinent = 0;
    //const leftMarginTimeAndContinent = 0;
    function createCultureElement(value) {
      myArticle = document.createElement("article");
      //myArticle.setAttribute("id", "culture-article");
      myArticle.setAttribute("id", value.culture);
      myArticle.setAttribute("class", value.continentAbbr);
      //myArticle.setAttribute("id", value.cultureAbbr);
      const myA = document.createElement("a");

      myArticle.textContent = `${value.culture}`;
      myArticle.href = `${value.moreInfoUrl}`;
      myA.href = `${value.moreInfoUrl}`;

      cultureSection.appendChild(myA);
      myA.appendChild(myArticle);

      myArticle.style.height = value.end / 4 - value.start / 4 + "px";
      myArticle.style.top = (value.start + 2565) / 4 + "px";
    }

    function lazyLoadFunc() {
      //      document.addEventListener("DOMContentLoaded", function () {
      var lazyloadImages;

      if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var image = entry.target;
              image.src = image.dataset.src;
              image.classList.remove("lazy");
              imageObserver.unobserve(image);
            }
          });
        });

        lazyloadImages.forEach(function (image) {
          imageObserver.observe(image);
        });
      } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
          if (lazyloadThrottleTimeout) {
            clearTimeout(lazyloadThrottleTimeout);
          }

          lazyloadThrottleTimeout = setTimeout(function () {
            var scrollTop = window.pageYOffset;
            lazyloadImages.forEach(function (img) {
              if (img.offsetTop < window.innerHeight + scrollTop) {
                img.src = img.dataset.src;
                img.classList.remove("lazy");
              }
            });
            if (lazyloadImages.length == 0) {
              document.removeEventListener("scroll", lazyload);
              window.removeEventListener("resize", lazyload);
              window.removeEventListener("orientationChange", lazyload);
            }
          }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
      }
      //});
    }
    window.addEventListener("resize", () => {
      //setWidthOfArticle();
      /*     console.log(`width: ${width} -- height: ${height}.`); */
    });
    populate();

    lazyLoadFunc();
  });
