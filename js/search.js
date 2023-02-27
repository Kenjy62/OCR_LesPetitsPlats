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

// Basic Search Function w/Keywords
export function search(currentKeywords) {
  // Array of results
  var results = [];

  // Verify if keywords lenght have 3 characters or more
  if (currentKeywords != undefined && currentKeywords.length > 2) {
    for (let [index, value] of recettes.entries()) {
      if (
        value.name.toLowerCase().includes(currentKeywords.toLowerCase()) ||
        value.description.toLowerCase().includes(currentKeywords.toLowerCase())
      ) {
        results.push(value);
      } else {
        for (let [i, ingredient] of recettes[index].ingredients.entries()) {
          if (
            ingredient.ingredient
              .toLowerCase()
              .includes(currentKeywords.toLowerCase())
          ) {
            results.push(recettes[index]);
          }
        }
      }
      currentResults = results;
    }
    // If Input don't have 3 characters or more, display all recipes
  } else if (currentKeywords === undefined || currentKeywords.length < 3) {
    results = recettes;
  }

  // Prevent Clear DOM
  clearDOM("recettes");
  clearDOM("errorMsg");

  // If Recipes found with keywords
  if (results.length > 0) {
    makeRecette(results);
  } else {
    // Else display error message
    makeErrorMsg(`Aucun résultats pour la recherche '${currentKeywords}...`);
  }

  // Rebuild Menu

  let newIngredients = [];
  let newAppareils = [];
  let newUstensils = [];
  results.forEach((recette) => {
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

  buildListerner();

  // Check if have tags
  withTags(results, currentTags);
}

// Function for filtering results with tags
function withTags(currentResults, tagList) {
  // Base Array Result + Filterd
  var results = currentResults;
  var filtered = [];

  // Check if tags are selected
  if (tagList.length > 0) {
    for (let tag of tagList) {
      switch (tag.type) {
        case "ingredient":
          // Clear Filtered Array
          filtered = [];
          for (let [index, recette] of results.entries()) {
            for (let [i, ingredient] of recette.ingredients.entries()) {
              if (
                ingredient.ingredient.toLowerCase() === tag.name.toLowerCase()
              ) {
                filtered.push(recette);
              }
            }
          }
          // Define results = filtered results
          results = filtered;
          break;
        case "appareil":
          // Clear Filtered Array
          filtered = [];
          for (let [index, recette] of results.entries()) {
            if (recette.appliance.toLowerCase() === tag.name.toLowerCase()) {
              filtered.push(recette);
            }
          }
          // Define results = filtered results
          results = filtered;
          break;
        case "ustensil":
          // Clear Filtered Array
          filtered = [];
          for (let [index, recette] of results.entries()) {
            for (let [i, ustensil] of recette.ustensils.entries()) {
              if (ustensil.toLowerCase() === tag.name.toLowerCase()) {
                filtered.push(recette);
              }
            }
            // Define results = filtered results
            results = filtered;
            break;
          }
      }
    }

    // Clear DOM
    clearDOM("recettes");
    clearDOM("errorMsg");

    // Check if recipies found w/tag and/or w/keywords
    if (results.length > 0) {
      makeRecette(results);
      // If no recipes found w/keywords and w/tags, error message
    } else if (currentKeywords && currentKeywords.length > 2) {
      makeErrorMsg(
        `Aucun résultat avec la recherche ${currentKeywords} et les différents tag séléctionnés...`
      );
    } else {
      // if no recipes found only w/tags, error message
      makeErrorMsg(`Aucun résultat avec les tags séléctionnés...`);
    }
  }
}
