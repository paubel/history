"use strict";
//import data from "./astroData.json" assert { type: "json" }; Do not work in FF

fetch("./cultures.json")
  .then((res) => res.json())
  .then((data) => {
    const numbOfObjects = Object.keys(data.cultureData).length;
    const selectNumbOfObjectsElement = document.querySelector("#num-obj");
    const numP = document.createElement("p");
    const spaceforTime = 14.28;

    let myArticle = document.createElement("article");
    let main = null;
    let myH2 = null;
    let cultureSection = document.createElement("section");
    cultureSection.setAttribute("id", "culture-section");
    let timeSection = document.createElement("section");
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
    let overlapTimeAndContinent = 0;
    const leftMarginTimeAndContinent = 0;
    function createCultureElement(value) {
      myArticle = document.createElement("article");
      myArticle.setAttribute("id", "culture-article");
      const myA = document.createElement("a");
      //const myFigure = document.createElement("figure");
      //const myImg = document.createElement("img");
      //const myFigcaption = document.createElement("figcaption");

      //myImg.src = `${value.mediaUrl}`;
      //const imgValue = `${value.mediaUrl}`;
      //const attr = document.createAttribute("data-src");
      //attr.value = imgValue;
      //myImg.setAttributeNode(attr);

      //myImg.classList.add("lazy");
      //myImg.alt = `${value.mediaCaption}`;
      //myFigcaption.textContent = `From ${value.start} to ${value.end}\n${value.text} `;

      myArticle.textContent = `${value.culture}`;
      myArticle.href = `${value.moreInfoUrl}`;
      myA.href = `${value.moreInfoUrl}`;
      //myA.target = "_blank";
      //const linkText = document.createTextNode(`Read more...`);

      cultureSection.appendChild(myA);
      myA.appendChild(myArticle);

      //myArticle.appendChild(myH2);
      //myArticle.appendChild(myA);
      //myArticle.appendChild(myFigure);
      //myFigure.appendChild(myImg);
      //myFigure.appendChild(myFigcaption);
      // myH2.appendChild(myA);
      //myA.appendChild(linkText);
      //set width of article
      myArticle.style.height = value.end / 4 - value.start / 4 + "px";
      myArticle.style.top = (value.start + 2565) / 4 + "px";

      if (value.continentAbbr === "SAm") {
        myArticle.style.backgroundColor = "hsla(60, 100%, 50%, 0.5)";
        //whenMultipleCultureExistSameTime(value);
        if (value.overlap) {
          myArticle.style.width = spaceforTime / 3 + "vw";
          myArticle.style.left =
            leftMarginTimeAndContinent + overlapTimeAndContinent * 5 + "vw";
          overlapTimeAndContinent++;
        } else {
          myArticle.style.left = leftMarginTimeAndContinent + "vw";
        }
      } else if (value.continentAbbr === "MAm") {
        //whenMultipleCultureExistSameTime(value);
        if (value.overlap) {
          myArticle.style.width = spaceforTime / 2.5 + "vw";
          myArticle.style.left =
            leftMarginTimeAndContinent - 3 + overlapTimeAndContinent * 6 + "vw";
          overlapTimeAndContinent++;
        } else {
          myArticle.style.left =
            leftMarginTimeAndContinent + spaceforTime + "vw";
        }

        myArticle.style.backgroundColor = "hsla(15, 100%, 72%, 0.5)";
      } else if (value.continentAbbr === "NAm") {
        // myArticle.style.left =
        //   leftMarginTimeAndContinent + spaceforTime * 2 + "vw";
        if (value.overlap) {
          myArticle.style.width = spaceforTime / 2.5 + "vw";
          myArticle.style.left =
            leftMarginTimeAndContinent +
            19 +
            overlapTimeAndContinent * 2 +
            "vw";
          console.log(overlapTimeAndContinent);
          overlapTimeAndContinent++;
        } else {
          myArticle.style.left =
            leftMarginTimeAndContinent + spaceforTime * 2 + "vw";
        }
        myArticle.style.backgroundColor = "hsla(0,100%,50%,.5)";
      } else if (value.continentAbbr === "SSA") {
        if (value.overlap) {
          myArticle.style.width = spaceforTime / 2.5 + "vw";
          myArticle.style.left =
            leftMarginTimeAndContinent +
            14 +
            overlapTimeAndContinent * 6 +
            "vw";
          console.log(overlapTimeAndContinent);
          overlapTimeAndContinent++;
        } else {
          myArticle.style.left =
            leftMarginTimeAndContinent + spaceforTime * 3 + "vw";
        }
        // myArticle.style.left =
        //   leftMarginTimeAndContinent + spaceforTime * 3 + "vw";
        myArticle.style.backgroundColor = "hsla(	0, 59%, 41%, 0.5)";
      } else if (value.continentAbbr === "EU") {
        myArticle.style.left =
          leftMarginTimeAndContinent + spaceforTime * 4 + "vw";
        myArticle.style.backgroundColor = "hsla(	120, 100%, 25%,.5)";
      } else if (value.continentAbbr === "NAf") {
        myArticle.style.left =
          leftMarginTimeAndContinent + spaceforTime * 5 + "vw";
        myArticle.style.backgroundColor = "hsla(90, 100%, 40%, 0.5)";
      }
    }

    //FIX THIS
    /*  function whenMultipleCultureExistSameTime(value) {
      if (value.overlap) {
        myArticle.style.width = spaceforTime / 3 + "vw";
        myArticle.style.left =
          leftMarginTimeAndContinent + overlapTimeAndContinent * 5 + "vw";
        overlapTimeAndContinent++;
      } else {
        myArticle.style.left = leftMarginTimeAndContinent + spaceforTime + "vw";
      }
    } */

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
