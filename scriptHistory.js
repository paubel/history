"use strict";
//import data from "./astroData.json" assert { type: "json" }; Do not work in FF

fetch("./cultures.json")
  .then((res) => res.json())
  .then((data) => {
    const numbOfObjects = Object.keys(data.cultureData).length;
    const selectNumbOfObjectsElement = document.querySelector("#num-obj");
    const numP = document.createElement("p");

    let myArticle = document.createElement("article");
    let main = null;
    let myH2 = null;
    let cultureSection = document.createElement("section");
    let timeSection = document.createElement("section");
    timeSection.setAttribute("id", "time-section");
    timeSection.setAttribute("id", "time-section");
    // numP.textContent = `Number of cultures: ${numbOfObjects}`;
    // selectNumbOfObjectsElement.appendChild(numP);
    main = document.querySelector("main");
    myH2 = document.createElement("h2");
    main.appendChild(timeSection);
    main.appendChild(cultureSection);

    for (let i = 0; i <= 46; i++) {
      let timeDiv = document.createElement("div");
      timeDiv.setAttribute("id", "time-div");
      timeSection.appendChild(timeDiv);

      let timeText = document.createElement("span");
      const era = `BCE`;

      timeText.textContent = `${Math.abs(-2600 + i * 100)} ${era}`;
      timeDiv.appendChild(timeText);
      timeDiv.style.top = i * 25 + "px";
      timeDiv.style.left = 0;
    }

    function populate() {
      Object.entries(data.cultureData).forEach(([key, value]) => {
        createCultureElement(value);
      });
    }

    function createCultureElement(value) {
      myArticle = document.createElement("article");
      myArticle.setAttribute("id", "culture-article");
      const myH2 = document.createElement("h2");
      const myFigure = document.createElement("figure");
      const myImg = document.createElement("img");
      const myFigcaption = document.createElement("figcaption");
      const myA = document.createElement("a");

      myImg.src = `${value.mediaUrl}`;
      const imgValue = `${value.mediaUrl}`;
      const attr = document.createAttribute("data-src");
      attr.value = imgValue;
      myImg.setAttributeNode(attr);

      myImg.classList.add("lazy");
      myImg.alt = `${value.mediaCaption}`;
      myFigcaption.textContent = `From ${value.start} to ${value.end}\n${value.text} `;

      myH2.textContent = `${value.culture}`;
      myA.href = `${value.moreInfoUrl}`;
      myA.target = "_blank";
      const linkText = document.createTextNode(`Read more...`);
      cultureSection.appendChild(myArticle);
      myArticle.appendChild(myH2);
      myArticle.appendChild(myFigure);
      // myFigure.appendChild(myImg);
      // myFigure.appendChild(myFigcaption);
      // myFigure.appendChild(myA);
      // myA.appendChild(linkText);
      //set width of article
      myArticle.style.height = value.end / 4 - value.start / 4 + "px";
      myArticle.style.top = (value.start + 2565) / 4 + "px";
      const spaceforTime = "30";

      if (value.continentAbbr === "MAm") {
        myArticle.style.left = spaceforTime + "vw";
      } else if (value.continentAbbr === "SAm") {
        myArticle.style.left = 14.28 + spaceforTime + "vw";
      }
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
