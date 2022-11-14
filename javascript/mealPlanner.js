//Foodbrain meal planning engine

let modalContainer = document.getElementsByClassName("recipeModal")[0];
let close = document.getElementsByClassName("close")[0];
let modalContent = modalContainer.getElementsByClassName("modalContent")[0];
let recipeList;

function storeRecipe(response) {
  recipeList = response;
  console.log(recipeList);
}

function recipeGET(first, last, q) {
  $.ajax({
    url: `https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=5f0512d8&app_key=d4315da556a7fb0bd05aefac3f48761b`,
    type: "get",
    async: false,
    success: function (data) {
      storeRecipe(data.hits);

      let modalUserName = document.createElement("h1");
      modalUserName.innerHTML = "Hello, " + first + " " + last + ",";
      modalContent.appendChild(modalUserName);

      let listOfDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      for (let i = 0; i < 7; i++) {
        modalContent.appendChild(recipePrint(listOfDays[i], recipeList[i].recipe));
      }
    },
  });
}

function recipePrint(day, givenRecipe) {
  let recipeContainer = document.createElement("div");
  recipeContainer.setAttribute("class", "recipeContainer");

  let dayOfTheWeek = document.createElement("h2");
  dayOfTheWeek.innerHTML = "<br>" + day;
  recipeContainer.appendChild(dayOfTheWeek);

  let recipeImage = document.createElement("img");
  recipeImage.src = givenRecipe.image;
  recipeImage.style.display = "inline";
  recipeContainer.appendChild(recipeImage);

  let recipeDescription = document.createElement("p");
  let recipeLink = document.createElement("a");
  recipeLink.href = givenRecipe.url;
  recipeLink.innerHTML = givenRecipe.url;
  recipeLink.target = "_blank";
  recipeDescription.innerHTML = givenRecipe.label + "<br /> URL: ";
  recipeDescription.appendChild(recipeLink);
  recipeContainer.appendChild(recipeDescription);

  return recipeContainer;
}

function recipeModal() {
  modalContainer.style.display = "block";
}

close.onclick = function () {
  modalContainer.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalContainer) {
    modalContainer.style.display = "none";
  }
};

let searchRecipe = document.getElementById("recipeSearch");
searchRecipe.onclick = function () {
  event.preventDefault();

  while (modalContent.firstChild) {
    modalContent.removeChild(modalContent.firstChild);
  }

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value
  let favoriteFood = document.getElementById("userFavorite").value;

  recipeGET(firstName, lastName, favoriteFood);
  recipeModal()
};
