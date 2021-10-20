// =========== Start Landing Page ===========

let winH = window.innerHeight,
  landing_page = document.querySelector("#landing_page");

landing_page.style.height = `${winH}px`;

let landingImage = [
  "01.jpg",
  "02.jfif",
  "03.jpg",
  "04.jpeg",
  "05.jpeg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
];

landing_page.style.backgroundImage = `url('image/06.jpg')`;

// ************ Random Number ************

function changeBack() {
  let randomNumber = Math.floor(Math.random() * landingImage.length);
  landing_page.style.backgroundImage = `url('image/${landingImage[randomNumber]}')`;
}

let random = setInterval(changeBack, 10000);

// ************ Random Number ************

// =========== End Landing Page ===========

// ---------------------------------------------------------------------------------------

// =========== Start Setting ===========

let setting_icon = document.querySelector("#setting_icon");
let setting_box = document.querySelector(".setting_box");

setting_icon.addEventListener("click", function () {
  this.classList.toggle("fa-spin");
  setting_box.classList.toggle("open");
});

// ************ start color click ************

let color_items = document.querySelectorAll(".color_items li");

color_items.forEach(function (li) {
  li.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--mainColor",
      e.target.getAttribute("data-color")
    );
  });
});

// ************ end color click ************

// ************ Start Set Color in localstorge ************

let list = document.querySelectorAll("#list li");
let background_btn = document.querySelectorAll(".background_options button");

list.forEach(function (ele) {
  ele.addEventListener("click", function (e) {
    // get color from li
    // console.log(e.target.getAttribute("data-color"));
    // console.log(e.target.dataset.color);

    // set color in localStroge
    localStorage.setItem("color", e.target.getAttribute("data-color"));

    // active
    list.forEach(function (li) {
      li.classList.remove("active");
    });

    e.target.classList.add("active");

    background_btn.forEach(function (e) {
      e.style.background = localStorage.getItem("color");
    });
  });
});

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--mainColor",
    localStorage.getItem("color")
  );
  // active
  list.forEach(function (li) {
    li.classList.remove("active");
  });

  document
    .querySelector(`[data-color="${localStorage.getItem("color")}"]`)
    .classList.add("active");

  // button
  background_btn.forEach(function (e) {
    e.style.background = localStorage.getItem("color");
  });
}

// ************ End Set Color in localstorge ************

// ************ Start Stop Random Background ************

background_btn.forEach(function (e) {
  e.addEventListener("click", function (btn) {
    background_btn.forEach(function (li) {
      li.classList.remove("active");
    });
    btn.target.classList.add("active");
    if (btn.target.getAttribute("class") === "no active") {
      clearInterval(random);
      localStorage.setItem("randomBackground", "no");
    }

    if (btn.target.getAttribute("class") === "yes active") {
      random = setInterval(changeBack, 10000);
      localStorage.setItem("randomBackground", "yes");
    }
  });
});

if (localStorage.getItem("randomBackground")) {
  background_btn.forEach(function (li) {
    li.classList.remove("active");
  });

  if (localStorage.getItem("randomBackground") === "no") {
    clearInterval(random);

    document
      .querySelector(`[class="${localStorage.getItem("randomBackground")}"]`)
      .classList.add("active");
  } else {
    random = setInterval(changeBack, 10000);
  }
}
// ************ End Stop Random Background ************

// =========== End Setting ===========

// ---------------------------------------------------------------------------------------

// =========== Start Skills ===========

let skills = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  let skillsh = skills.offsetTop;
  let winh = window.innerHeight;
  let skillsout = skills.offsetHeight;

  if (window.scrollY > skillsh + skillsout - winh) {
    let span = this.document.querySelectorAll(".skills_progress span");
    span.forEach(function (e) {
      e.style.width = e.dataset.progress;
    });
  }
});

// =========== End Skills ===========

// =========== Start Gallery ===========

let gallery_image = document.querySelectorAll(".gallery_image");

gallery_image.forEach((items) => {
  items.addEventListener("click", () => {
    let img = items.children[0].cloneNode(true);
    // // create section parent
    let parentSection = document.createElement("section");
    parentSection.className = "popup_sec";
    document.body.appendChild(parentSection);
    // // create div child
    let childDiv = document.createElement("div");
    childDiv.className = "popup_div";
    parentSection.appendChild(childDiv);
    // add image to child div
    childDiv.appendChild(img);

    // button to close
    let btn = document.createElement("span");
    btn.className = "btn_close";
    btn.innerHTML = "x";
    // add btn to div child
    childDiv.appendChild(btn);

    btn.addEventListener("click", () => {
      parentSection.remove();
    });
  });
});

// =========== End Gallery ===========

// Start Count

let countDiv = document.querySelector(".count");
let number = document.querySelectorAll("#number");
number.forEach((e) => {
  let count = setInterval(() => {
    e.innerHTML = +e.innerHTML + 1;
    if (e.innerHTML == e.dataset.number) {
      clearInterval(count);
    }
  }, 10);
});

// End Count

// Start Bullets

let allBullets = document.querySelectorAll(".bullets_box li");
let alllinks = document.querySelectorAll(".landing_heading li");

function scrollToSection(element) {
  element.forEach((items) => {
    items.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSection(allBullets);
scrollToSection(alllinks);

let scrollTop = document.querySelector(".scrollTop");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 1500) {
    scrollTop.style.bottom = "20px";
  } else {
    scrollTop.style.bottom = "-50px";
  }
});

scrollTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// End Bullets

// Reset

document.querySelector(".reset_options").addEventListener("click", () => {
  localStorage.clear();

  window.location.reload();
});

// bar

let bar = document.querySelector(".bar");
let listBar = document.querySelector(".landing_heading ul");

bar.onclick = function (e) {
  e.stopPropagation();
};

bar.addEventListener("click", function () {
  listBar.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (e.target !== bar && e.target !== listBar) {
    if (listBar.classList.contains("open")) {
      listBar.classList.remove("open");
    }
  }
});
