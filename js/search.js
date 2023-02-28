// Required

// Recipes Data
import { recettes } from "./data.js";

// DOM
import { DOM, clearDOM, makeRecette, makeErrorMsg } from "./dom.js";

// Make Menu Function
import {
  makeAppareils,
  makeIngredients,
  makeUstensiles,
  buildListerner,
} from "./menu.js";

// Actually Search
export var currentKeywords;
export var currentTags = [];
export var currentResults = [];

// Searchbar Listerner
DOM.searchbar.addEventListener("keyup", function (e) {
  currentKeywords = e.currentTarget.value;
  search(currentKeywords);
});

// Search function
export function search(currentKeywords) {
  if (
    currentKeywords === undefined ||
    (currentKeywords.length < 3 && currentKeywords.length >= 0)
  ) {
    currentResults = recettes;
  } else {
    currentResults = recettes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(currentKeywords.toLowerCase()) ||
        recipe.description
          .toLowerCase()
          .includes(currentKeywords.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient
            .toLowerCase()
            .includes(currentKeywords.toLowerCase())
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

  // Rebuild Menu

  let newIngredients = [];
  let newAppareils = [];
  let newUstensils = [];
  currentResults.forEach((recette) => {
    recette.ingredients.forEach((item) => {
      if (!newIngredients.includes(item.ingredient)) {
        newIngredients.push(item.ingredient);
      }
    });

    if (!newAppareils.includes(recette.appliance)) {
      newAppareils.push(recette.appliance);
    }

    recette.ustensils.forEach((item) => {
      if (!newUstensils.includes(item)) {
        newUstensils.push(item);
      }
    });
  });

  makeUstensiles(newUstensils);
  makeAppareils(newAppareils);
  makeIngredients(newIngredients);

  // Rebuild Listener

  buildListerner();

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
