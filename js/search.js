// Required

import { DOM, clearDOM, makeRecette, makeErrorMsg } from "./dom.js";
import { recettes, ingredients, ustensiles, appareils } from "./data.js";
import { makeAppareils, makeIngredients, makeUstensiles } from "./menu.js";

// Actually Search
var currentKeywords;
var currentTags = [];
var currentResults;

// Searchbar Listerner
DOM.searchbar.addEventListener("keyup", function (e) {
  currentKeywords = e.currentTarget.value;
  search(currentKeywords);
});

// Search function
function search(keywords) {
  var result = [];
  var resultWithTags = [];

  if (keywords != undefined && keywords.length > 2) {
    for (let [index, value] of recettes.entries()) {
      if (
        value.name.toLowerCase().includes(keywords.toLowerCase()) ||
        value.description.toLowerCase().includes(keywords.toLowerCase())
      ) {
        result.push(value);
      } else {
        for (let [i, ingredient] of recettes[index].ingredients.entries()) {
          if (
            ingredient.ingredient.toLowerCase().includes(keywords.toLowerCase())
          ) {
            result.push(recettes[index]);
          }
        }
      }
    }
  }

  if (currentTags.length > 0) {
    for (let tag of currentTags) {
      switch (tag.type) {
        case "ingredient":
          for (let [index, recette] of result.entries()) {
            for (let [i, ingredient] of recette.ingredients.entries()) {
              if (
                ingredient.ingredient
                  .toLowerCase()
                  .includes(tag.name.toLowerCase())
              ) {
                resultWithTags.push(recette);
              }
            }
          }
          break;
        case "appareil":
          for (let [index, recette] of result.entries()) {
            if (
              recette.appliance.toLowerCase().includes(tag.name.toLowerCase())
            ) {
              resultWithTags.push(recette);
            }
          }
          break;
        case "ustensil":
          for (let [index, recette] of result.entries()) {
            for (let [i, ustensil] of recette.ustensils.entries()) {
              if (ustensil.toLowerCase().includes(tag.name.toLowerCase())) {
                resultWithTags.push(recette);
              }
            }
          }
          break;
        default:
          break;
      }
    }
  }

  if (result.length > 0 || resultWithTags.length > 0) {
    if (currentTags.length > 0) {
      clearDOM("recettes");
      clearDOM("errorMsg");
      makeRecette(resultWithTags);
    } else {
      clearDOM("recettes");
      clearDOM("errorMsg");
      makeRecette(result);
    }
  }
}

// Add // Remove tags
function AddOrRemoveTag(obj) {
  if (obj.action === "Add") {
    currentTags.push({ name: obj.name, type: obj.type });
    search(currentKeywords);
  } else if (obj.action === "Remove") {
    let index = currentTags.findIndex((tag) => tag.name === obj.name);
    currentTags.splice(index, 1);
    search(currentKeywords);
  }
}

// Tags Listeners
DOM.ingredientsInput.addEventListener("keyup", function (e) {
  if (e.currentTarget.value.length > 0) {
    const results = ingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    if (results.length > 0) {
      clearDOM("ingredients");
      makeIngredients(results);
    } else {
      clearDOM("ingredients");
      DOM.ingredients.insertAdjacentHTML(
        "beforeend",
        `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`
      );
    }
  } else {
    clearDOM("ingredients");
    makeIngredients(ingredients);
  }

  addingListenerToItems();
});

DOM.appareilsInput.addEventListener("keyup", function (e) {
  e.stopImmediatePropagation();
  if (e.currentTarget.value.length > 0) {
    const results = appareils.filter((appareils) =>
      appareils.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    if (results.length > 0) {
      clearDOM("appareils");
      makeAppareils(results);
    } else {
      clearDOM("appareils");
      DOM.appareils.insertAdjacentHTML(
        "beforeend",
        `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`
      );
    }
  } else {
    clearDOM("appareils");
    makeAppareils(appareils);
  }
});

DOM.ustensilesInput.addEventListener("keyup", function (e) {
  if (e.currentTarget.value.length > 0) {
    const results = ustensiles.filter((ustensile) =>
      ustensile.toLowerCase().includes(e.currentTarget.value.toLowerCase())
    );
    if (results.length > 0) {
      clearDOM("ustensiles");
      makeUstensiles(results);
    } else {
      clearDOM("ustensiles");
      DOM.ustensiles.insertAdjacentHTML(
        "beforeend",
        `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`
      );
    }
  } else {
    clearDOM("ustensiles");
    makeUstensiles(ustensiles);
  }
});

// Adding listener for item in menu 'before/after modification'
function addingListenerToItems() {
  const items = document.querySelectorAll(
    "#ingredients>span, #appareils>span, #ustensiles>span"
  );
  items.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target.closest("#ingredients")) {
        let obj = `<div data='${e.target.getAttribute(
          "value"
        )}' class="bg-customBlue rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`;
        DOM.tag.insertAdjacentHTML("beforeend", obj);
        e.target.style.display = "none";
        let tag = {
          name: e.target.textContent,
          type: "ingredient",
          action: "Add",
        };
        AddOrRemoveTag(tag);
      } else if (e.target.closest("#appareils")) {
        let obj = `<div data='${e.target.getAttribute(
          "value"
        )}' class="bg-customGreen rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`;
        DOM.tag.insertAdjacentHTML("beforeend", obj);
        e.target.style.display = "none";
        let tag = {
          name: e.target.textContent,
          type: "appareil",
          action: "Add",
        };
        AddOrRemoveTag(tag);
      } else if (e.target.closest("#ustensiles")) {
        let obj = `<div data='${e.target.getAttribute(
          "value"
        )}' class="bg-customOrange rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`;
        DOM.tag.insertAdjacentHTML("beforeend", obj);
        e.target.style.display = "none";
        let tag = {
          name: e.target.textContent,
          type: "ustensil",
          action: "Add",
        };
        AddOrRemoveTag(tag);
      }
      addingListenerToTags();
    });
  });
}
addingListenerToItems();

// Adding listener for deleting tags selected
function addingListenerToTags() {
  const tags = document.querySelectorAll("#tags>div>.deleteTags");
  tags.forEach((tag) => {
    tag.addEventListener("click", function (e) {
      let data = e.target.parentElement.parentElement.getAttribute("data");
      e.target.parentElement.parentElement.remove();
      let item = document.querySelectorAll(`span[value='${data}']`);
      /// IM HERE
      item[0].style.display = "block";
      let tag = { name: data, type: "appareil", action: "Remove" };
      AddOrRemoveTag(tag);
    });
  });
}
