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
  if (keywords === undefined || (keywords.length < 3 && keywords.length >= 0)) {
    currentResults = recettes;
  } else {
    currentResults = recettes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(keywords.toLowerCase()) ||
        recipe.description.toLowerCase().includes(keywords.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(keywords.toLowerCase())
        )
    );
  }

  // Check if tags
  if (currentTags.length > 0) {
    currentTags.forEach((tag) => {
      switch (tag.type) {
        case "ingredient":
          currentResults = currentResults.filter((recipe) =>
            recipe.ingredients.some((ingredient) =>
              ingredient.ingredient
                .toLowerCase()
                .includes(tag.name.toLowerCase())
            )
          );
          break;
        case "appareil":
          currentResults = currentResults.filter((recipe) =>
            recipe.appliance.toLowerCase().includes(tag.name.toLowerCase())
          );
          break;
        case "ustensil":
          currentResults = currentResults.filter((recipe) =>
            recipe.ustensils.some((ustensils) =>
              ustensils.toLowerCase().includes(tag.name.toLowerCase())
            )
          );
      }
    });
  }

  clearDOM("recettes");
  clearDOM("errorMsg");

  if (currentResults.length > 0) {
    makeRecette(currentResults);
  } else {
    if (currentKeywords.length > 0) {
      var message = `Aucuns résultats avec la recherche '${currentKeywords}...'`;
    } else {
      var message = `Aucuns résultats avec les tags utilisés...`;
    }
    makeErrorMsg(message);
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

  addingListenerToItems();
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
  addingListenerToItems();
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
