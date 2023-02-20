// Base DOM
export const DOM = {
  ingredients: document.getElementById("ingredients"),
  appareils: document.getElementById("appareils"),
  ustensiles: document.getElementById("ustensiles"),
  recettes: document.getElementById("recettes"),
  searchbar: document.getElementById("searchbar"),
  ingredientsInput: document.getElementById("ingredientsInput"),
  appareilsInput: document.getElementById("appareilsInput"),
  ustensilesInput: document.getElementById("ustensilesInput"),
  tag: document.getElementById("tags"),
  errorMsg: document.getElementById("errorMsg"),
};

// Clear the DOM
export function clearDOM(target) {
  switch (target) {
    case "recettes":
      while (DOM.recettes.firstChild) {
        DOM.recettes.removeChild(DOM.recettes.firstChild);
      }
      break;
    case "ingredients":
      while (DOM.ingredients.firstChild) {
        DOM.ingredients.removeChild(DOM.ingredients.firstChild);
      }
      break;
    case "appareils":
      while (DOM.appareils.firstChild) {
        DOM.appareils.removeChild(DOM.appareils.firstChild);
      }
      break;
    case "ustensiles":
      while (DOM.ustensiles.firstChild) {
        DOM.ustensiles.removeChild(DOM.ustensiles.firstChild);
      }
      break;
    case "errorMsg":
      while (DOM.errorMsg.firstChild) {
        DOM.errorMsg.removeChild(DOM.errorMsg.firstChild);
      }
    default:
      break;
  }
}

// Display list of recipes
export function makeRecette(list) {
  list.forEach((recette) => {
    let id = recette.id;

    let obj = `<article id="${recette.id}" class="bg-customGray rounded-sm">
        <div class="h-52 bg-customGrayMore"></div>
        <div class="grid grid-cols-2 bg-customGray">
            <div class="p-4 text-left">
                <div class="title font-semibold">${recette.name}</div>
                <div class="ingredients my-3">
                </div>
            </div>
            <div class="p-4 text-right">
                <div class="times font-semibold">${recette.time} min</div>
                <div class="explications my-3 text-sm">
                    <p>${recette.description}</p>
                </div>
            </div>
        </div>
        </article>`;

    DOM.recettes.insertAdjacentHTML("beforeend", obj);

    recette.ingredients.forEach((ingredient) => {
      let obj = `<div class="ingredient">
            <span class="font-semibold">${
              ingredient.ingredient
            } :</span> <span>${
        ingredient.quantity ? ingredient.quantity : ""
      } ${ingredient.unit ? ingredient.unit : ""}</span>
            </div>`;

      let target = document.getElementById(id);
      target = target.getElementsByClassName("ingredients");

      target[0].insertAdjacentHTML(`beforeend`, obj);
    });
  });
}

// Display Error Message
export function makeErrorMsg(message) {
  let obj = `<span>${message}<span>`;
  errorMsg.insertAdjacentHTML("beforeend", obj);
  errorMsg.style.display = "block";
}

// Hide All
document.body.addEventListener("click", function (e) {
  if (
    e.target.id != "ingredientsInput" &&
    e.target.id != "appareilsInput" &&
    e.target.id != "ustensilesInput"
  ) {
    if (
      !e.target.closest("#ingredients") &&
      !e.target.closest("#appareils") &&
      !e.target.closest("#ustensiles")
    ) {
      DOM.ustensiles.style.display = "none";
      DOM.appareils.style.display = "none";
      DOM.ingredients.style.display = "none";
      DOM.ustensilesInput.style.width = "auto";
      DOM.appareilsInput.style.width = "auto";
      DOM.ingredientsInput.style.width = "auto";
    }
  }
});
