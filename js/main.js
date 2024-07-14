/// <reference types="../@types/jquery"/>
let curunt = "#Home";
let prev;
var regx = {
  UserName: /^[a-z]{3,}$/,
  UserEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  UserPhon: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  UserAge: /^[1-9]{1,2}$/,
  UserPass: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
};

$(".lodelyer").fadeIn(0)
$(".lodelyer").fadeOut(2000,()=>{
   $(".lodelyer").addClass("hidden");
});

$(".contInput").on("input", function (e) {
  id = e.target.id;
  vaildation(id);
  let btn = document.querySelector(".submitBtn");
  if (
    $("#UserName").hasClass("valid") &&
    $("#UserEmail").hasClass("valid") &&
    $("#UserPhon").hasClass("valid") &&
    $("#UserAge").hasClass("valid") &&
    $("#UserRePass").hasClass("valid") &&
    $("#UserPass").hasClass("valid")
  ) {
    console.log("not disabled");
    btn.removeAttribute("disabled");
    btn.classList.add("BtnActive");
  } else {
    console.log("disabled");
    btn.setAttribute("disabled", "true");
  }
});
$(".submitBtn").on("click", () => {
  $(body).removeClass("bg-[#212529]");
});

$("#Togg").on("click", function () {
  $("html").toggleClass("dark");
});

function vaildation(id) {
  let value = $(`#${id}`).val();

  if (id == "UserPass" || id == "UserRePass") {
    let pass = $("#UserPass").val();
    let repass = $("#UserRePass").val();
    if (pass == repass) {
      $(`#UserRePass`).addClass("valid");
      $(`#UserRePass`).removeClass("inValid");
      $(`#UserRePass`).siblings(".trueAl").removeClass("hidden");
      $(`#UserRePass`).siblings(".trueAl").addClass("block");
      $(`#UserRePass`).siblings(".falseAl").removeClass("block");
      $(`#UserRePass`).siblings(".falseAl").addClass("hidden");
    } else {
      $(`#UserRePass`).removeClass("valid");
      $(`#UserRePass`).addClass("inValid");
      $(`#UserRePass`).siblings(".falseAl").removeClass("hidden");
      $(`#UserRePass`).siblings(".falseAl").addClass("block");
      $(`#UserRePass`).siblings(".trueAl").removeClass("block");
      $(`#UserRePass`).siblings(".trueAl").addClass("hidden");
    }
  }

  if (id != "UserRePass") {
    if (regx[id].test(value)) {
      $(`#${id}`).addClass("valid");
      $(`#${id}`).removeClass("inValid");
      $(`#${id}`).siblings(".trueAl").removeClass("hidden");
      $(`#${id}`).siblings(".trueAl").addClass("block");
      $(`#${id}`).siblings(".falseAl").removeClass("block");
      $(`#${id}`).siblings(".falseAl").addClass("hidden");
    } else {
      $(`#${id}`).removeClass("valid");
      $(`#${id}`).addClass("inValid");
      $(`#${id}`).siblings(".falseAl").removeClass("hidden");
      $(`#${id}`).siblings(".falseAl").addClass("block");
      $(`#${id}`).siblings(".trueAl").removeClass("block");
      $(`#${id}`).siblings(".trueAl").addClass("hidden");
    }
  }
}

$(".sidebarTab").animate({ width: "toggle", paddingInline: "toggle" }, 0);
$(".open").on("click", function () {
  $(".sidebarTab").animate({ width: "toggle", paddingInline: "toggle" }, 1000);
});
$(".li-item").on("click", function () {
  $(".li-item").removeClass("activ");
  $(this).addClass("activ");
  let sec = $(this).attr("id");
  curunt = sec;
  console.log(curunt);
  $("section").addClass("hidden");
  $(sec).removeClass("hidden");
});

getCatgories();
async function getCatgories() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await res.json();

  console.log(data.categories[0]);
  setCatgories(data);
}

function setCatgories(data) {
  let cartona = "";
  for (const item of data.categories) {
    if (item.idCategory < 13) {
      // item number 13,14 have a bad image format
      let chieldNode = `
                <div class="xl:w-3/12 md:w-4/12 zero:w-full ">
            <div class="inner p-3">
              <div class="inner2 group cursor-pointer overflow-hidden rounded-lg  relative   ">
                <img src="${
                  item.strCategoryThumb
                }" class="w-full rounded-lg overflow-hidden" alt="">
                <div id="${
                  item.strCategory
                }" class="lyarcatg group-hover:translate-y-0  inset-0 absolute  flex flex-col items-center justify-center translate-y-[150%] transition-all duration-[0.5s] bg-[#ffffff94]">
                    <h3 id="${
                      item.strCategory
                    }"  class="text-[25px] mb-2 font-[500] text-center">${
        item.strCategory
      }</h3>
                    <p  id="${
                      item.strCategory
                    }" class=" text-[17px] font-[500] px-3 text-center">${item.strCategoryDescription.substring(
        0,
        40
      )}. <span class="text-[18px] font-semibold ">Read More</span></p>
                </div>
              </div>
            </div>
        </div>
        `;
      cartona += chieldNode;
    }
  }
  let row = document.getElementById("categCont");

  row.innerHTML = cartona;

  $(".lyarcatg").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("C", word);
  });
}

get_setArea();
async function get_setArea() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await res.json();

  console.log(data.meals);
  let cartona = "";
  for (let i = 0; i <= 19; i++) {
    let chieldNode = `
                <div class="xl:w-3/12 md:w-4/12 zero:w-full ">
            <div class="inner p-3">
              <div class="inner2 group cursor-pointer overflow-hidden rounded-lg py-3 relative text-center shadow-md dark:shadow-[#21252976] shadow-[#bbbbbb79] ">
                <i class="fa-solid fa-house-laptop fa-4x dark:text-black text-white py-2 "></i>
                <h2 class="dark:text-black text-white text-[20px] font-[600]">${data.meals[i].strArea}</h2>
                <div id="${data.meals[i].strArea}" class="lyarArea group-hover:translate-y-0  inset-0 absolute  flex flex-col items-center justify-center translate-y-[150%] transition-all duration-[0.5s] bg-[#ffffff94]">
                    <h3 id="${data.meals[i].strArea}" class="text-[25px] mb-2 font-[700] text-center">Click to show</h3>
                </div>
              </div>
            </div>
        </div>
        `;
    cartona += chieldNode;
  }
  let row = document.getElementById("areaCont");

  row.innerHTML = cartona;

  $(".lyarArea").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("A", word);
  });
}

get_setIngred();
async function get_setIngred() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await res.json();

  console.log(data.meals);
  let cartona = "";
  for (let i = 0; i <= 19; i++) {
    let chieldNode = `
                <div class="xl:w-3/12 md:w-4/12 zero:w-full ">
            <div class="inner p-3">
              <div class="inner2 group cursor-pointer overflow-hidden rounded-lg py-3 relative text-center shadow-md dark:shadow-[#21252976] shadow-[#bbbbbb79]">
                <i class="fa-solid fa-drumstick-bite fa-4x dark:text-black  text-white py-2"></i>
                <h2 class=" dark:text-black text-white text-[25px] font-[700] py-1">${
                  data.meals[i].strIngredient
                }</h2>
                <p class="dark:text-black text-white px-3">${data.meals[
                  i
                ].strDescription.substring(0, 95)}...</p>
                <div id="${
                  data.meals[i].strIngredient
                }" class="lyarIngred group-hover:translate-y-0  inset-0 absolute  flex flex-col items-center justify-center translate-y-[150%] transition-all duration-[0.5s] bg-[#ffffff94]">
                    <h3 id="${
                      data.meals[i].strIngredient
                    }" class="text-[25px] mb-2 font-[700] text-center">Click to show</h3>
                </div>
              </div>
            </div>
        </div>
        `;
    cartona += chieldNode;
  }
  let row = document.getElementById("ingreCont");

  row.innerHTML = cartona;

  $(".lyarIngred").on("click", (e) => {
    let word = e.target.getAttribute("id");
    set_A_I_C("I", word);
  });
}

async function set_A_I_C(key, word) {
  let res;
  if (key == "A") {
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${word}`
    );
  } else if (key == "I") {
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${word}`
    );
  } else {
    res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`
    );
  }
  let data = await res.json();
  console.log(data);

  let cartona = "";
  let i = 0;
  for (const item of data.meals) {
    if (i >= 20) {
      break;
    }
    let chieldNode = `
                <div class="xl:w-3/12 md:w-4/12 zero:w-full ">
            <div class="inner p-3">
              <div class="inner2 group cursor-pointer overflow-hidden rounded-lg  relative shadow-xl  wow slideInRight " data-wow-offset="100">
                <img src="${item.strMealThumb}" class="w-full rounded-lg overflow-hidden" alt="">
                <div id="${item.idMeal}" class="lyar1 group-hover:translate-y-0  inset-0 absolute  flex flex-col items-center justify-center translate-y-[150%] transition-all duration-[0.5s] bg-[#ffffff94]">
                    <h3 id="${item.idMeal}" class="text-[25px] mb-2 font-[500] text-center ">${item.strMeal}</h3>
                </div>
              </div>
            </div>
        </div>
        `;
    cartona += chieldNode;
    i++;
  }
  let row = document.getElementById("showCont");

  row.innerHTML = cartona;

  $(curunt).addClass("hidden");
  $("#Show").removeClass("hidden");
  curunt = "#Show";

  $(".lyar1").on("click", (e) => {
    let id = e.target.getAttribute("id");
    getMealById(id);
  });
}

$(".searchInput").on("input", function () {
  let word = $(".searchInput").val();
  getbyName(word);
});
async function getbyName(namee) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${namee}`
  );
  let data = await res.json();

  console.log(data.meals);
  setbyN_L_All(data, "searchgCont");
}

$(".stInput").on("input", function () {
  let word = $(".stInput").val();
  getbyStLatter(word);
});
async function getbyStLatter(latter) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${latter}`
  );
  let data = await res.json();

  console.log(data);
  setbyN_L_All(data, "searchgCont");
  // setbyStLatter(data);
}

getall();
async function getall() {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  let data = await res.json();

  console.log(data.meals);
  setbyN_L_All(data, "homeCont");
  // setall(data);
}

function setbyN_L_All(data, where) {
  console.log(data.meals);
  let cartona = "";
  let i = 0;
  for (const item of data.meals) {
    if (i >= 20) {
      break;
    }
    let chieldNode = `
                <div class="xl:w-3/12 md:w-4/12 zero:w-full ">
            <div class="inner p-3 ">
              <div class="inner2 group cursor-pointer overflow-hidden rounded-lg  relative shadow-xl wow flipInX " data-wow-duration="2s" data-wow-offset="50">
                <img src="${item.strMealThumb}" class="w-full rounded-lg overflow-hidden" alt="">
                <div id="${item.idMeal}" class="lyar1 group-hover:translate-y-0  inset-0 absolute  flex flex-col items-center justify-center translate-y-[150%] transition-all duration-[0.5s] bg-[#ffffff94]">
                    <h3 id="${item.idMeal}"  class="text-[25px] mb-2 font-[500] text-center">${item.strMeal}</h3>
                    <p  id="${item.idMeal}" class=" text-[17px] font-[500] px-3 text-center">${item.strArea}</p>
                </div>
              </div>
            </div>
        </div>
        `;
    cartona += chieldNode;
    i++;
  }
  let row = document.getElementById(where);

  row.innerHTML = cartona;

  $(".lyar1").on("click", (e) => {
    let id = e.target.getAttribute("id");
    getMealById(id);
  });
}

async function getMealById(id) {
  let res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await res.json();

  console.log(data);
  setMeal(data);
}
function setMeal(data) {
  $(curunt).addClass("hidden");
  $("#Details").removeClass("hidden");
  prev = curunt;
  curunt = "#Details";

  let Ingredient = "";
  let Measure = "";
  let Tags = "";

  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0][`strIngredient${i}`] != null &&
      data.meals[0][`strIngredient${i}`] != "" &&
      data.meals[0][`strIngredient${i}`] != " "
    ) {
      Ingredient += `<li class="bg-green-300 p-1 rounded-lg ">${
        data.meals[0][`strIngredient${i}`]
      }</li>`;
    }
    if (
      data.meals[0][`strMeasure${i}`] != null &&
      data.meals[0][`strMeasure${i}`] != "" &&
      data.meals[0][`strMeasure${i}`] != " "
    ) {
      Measure += `<li class="bg-green-300 py-1 px-2 rounded-lg ">${
        data.meals[0][`strMeasure${i}`]
      }</li>`;
    }
  }
  if (data.meals[0].strTags == null) {
    Tags = `<li class="bg-green-300 py-1 px-2 rounded-lg ">No tags found</li>`;
  } else {
    let tags = data.meals[0].strTags?.split(",");
    if (!tags) tags = [];
    for (let i = 0; i < tags.length; i++) {
      Tags += `
      <li class="bg-green-300 py-1 px-2 rounded-lg ">${tags[i]}</li>`;
    }
  }

  let chieldNode = `
      <div class=" xl:w-4/12 zero:w-full p-4">
        <div class="">
          <img src="${data.meals[0].strMealThumb}" class="rounded-lg" alt="">
        </div>
        <h2 class="text-[27px] dark:text-black text-white text-center mt-3">${data.meals[0].strMeal}</h2>
        <div class="links flex pt-10 justify-center">
                <a target="_blank" href="${data.meals[0].strSource}" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Source</a>
                <a target="_blank" href="${data.meals[0].strYoutube}" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Youtube</a>
                </div>
      </div>
      <div class=" xl:w-8/12 zero:w-full p-4">
        <div class="">
          <h2 class="text-[27px] font-[500] dark:text-black text-white  mb-2">Instructions</h2>
          <p class="text[15px] dark:text-black text-white">${data.meals[0].strInstructions}</p>
          <div class=" myRow pt-5">
            <h2 class="text-[27px] font-[500] dark:text-black text-white  my-2 pe-9">Area  <span class=" text-black bg-green-300 py-1 px-2 rounded-lg ">${data.meals[0].strArea}</span></h2>
            <h2 class="text-[27px] font-[500] dark:text-black text-white  my-2">Category   <span class=" text-black bg-green-300 py-1 px-2 rounded-lg ">${data.meals[0].strCategory}</span></h2>
          </div>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  my-2"> Recipes </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start zero:justify-center">
                  ${Measure}
                </ul>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  pt-5"> Ingredients </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start pb-5 zero:justify-center">
                  ${Ingredient}
                </ul>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  my-2"> Tags </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start zero:justify-center">
                  ${Tags}
                </ul>
                
                
        </div>
        </div>
        `;

  let row = document.getElementById("TailwindRow");
  row.innerHTML = chieldNode;
}
$(".back").on("click", function () {
  $(curunt).addClass("hidden");
  $(prev).removeClass("hidden");
  curunt = prev;
});
$(".RandomBtn").on("click", function () {
  RandomMeal();
});

async function RandomMeal() {
  let res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  let data = await res.json();

  console.log(data.meals[0]);
  $(curunt).addClass("hidden");
  $("#Random").removeClass("hidden");
  prev = curunt;
  curunt = "#Random";

  let Ingredient = "";
  let Measure = "";
  let Tags = "";

  for (let i = 1; i <= 20; i++) {
    if (
      data.meals[0][`strIngredient${i}`] != null &&
      data.meals[0][`strIngredient${i}`] != "" &&
      data.meals[0][`strIngredient${i}`] != " "
    ) {
      Ingredient += `<li class="bg-green-300 p-1 rounded-lg ">${
        data.meals[0][`strIngredient${i}`]
      }</li>`;
    }
    if (
      data.meals[0][`strMeasure${i}`] != null &&
      data.meals[0][`strMeasure${i}`] != "" &&
      data.meals[0][`strMeasure${i}`] != " "
    ) {
      Measure += `<li class="bg-green-300 py-1 px-2 rounded-lg ">${
        data.meals[0][`strMeasure${i}`]
      }</li>`;
    }
  }
  if (data.meals[0].strTags == null) {
    Tags = `<li class="bg-green-300 py-1 px-2 rounded-lg ">No tags found</li>`;
  } else {
    let tags = data.meals[0].strTags?.split(",");
    if (!tags) tags = [];
    for (let i = 0; i < tags.length; i++) {
      Tags += `
      <li class="bg-green-300 py-1 px-2 rounded-lg ">${tags[i]}</li>`;
    }
  }

  let chieldNode = `
      <div class=" xl:w-4/12 zero:w-full p-4">
        <div class="">
          <img src="${data.meals[0].strMealThumb}" class="rounded-lg" alt="">
        </div>
        <h2 class="text-[27px] dark:text-black text-white text-center mt-3">${data.meals[0].strMeal}</h2>
        <div class="links flex pt-10 justify-center">
                <a target="_blank" href="${data.meals[0].strSource}" class="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-green-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Source</a>
                <a target="_blank" href="${data.meals[0].strYoutube}" class="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Youtube</a>
                </div>
      </div>
      <div class=" xl:w-8/12 zero:w-full p-4">
        <div class="">
          <h2 class="text-[27px] font-[500] dark:text-black text-white  mb-2">Instructions</h2>
          <p class="text[15px] dark:text-black text-white">${data.meals[0].strInstructions}</p>
          <div class=" myRow pt-5">
            <h2 class="text-[27px] font-[500] dark:text-black text-white  my-2 pe-9">Area  <span class=" text-black bg-green-300 py-1 px-2 rounded-lg ">${data.meals[0].strArea}</span></h2>
            <h2 class="text-[27px] font-[500] dark:text-black text-white  my-2">Category   <span class=" text-black bg-green-300 py-1 px-2 rounded-lg ">${data.meals[0].strCategory}</span></h2>
          </div>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  my-2"> Recipes </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start zero:justify-center">
                  ${Measure}
                </ul>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  pt-5"> Ingredients </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start pb-5 zero:justify-center">
                  ${Ingredient}
                </ul>
          <h3 class="text-[27px] font-[500] dark:text-black text-white  my-2"> Tags </h3>
                <ul class="list-none flex gap-3 flex-wrap md:justify-start zero:justify-center">
                  ${Tags}
                </ul>
                
                
        </div>
        </div>
        `;

  let row = document.getElementById("TailwindRandomRow");
  row.innerHTML = chieldNode;
}
