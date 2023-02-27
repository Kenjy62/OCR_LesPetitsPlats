// Required

import { DOM, clearDOM, makeRecette, makeErrorMsg } from "./dom.js";
import { recettes } from "./data.js";

// Actually Search
export var currentKeywords;
export var currentTags = [];
var currentResults = [];
var currentResultsWithTags = [];

// Searchbar Listerner
DOM.searchbar.addEventListener("keyup", function (e) {
  currentKeywords = e.currentTarget.value;
  search(currentKeywords);
});

// Search function
export function search(currentKeywords) {
  console.log(`Start Search with ${currentKeywords}`);

  var results = [];
  var resultWithTags = [];

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
      console.log("Recettes trouvées");
      console.log(currentResults);
    }

    if (currentTags.length > 0) {
      console.log(currentTags);
      for (let tag of currentTags) {
        if (tag.type === "ingredient") {
          for (let [index, recette] of currentResults.entries()) {
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
          currentResults = resultWithTags;
          console.log("trouvée avec tags");
          console.log(currentResults);
        } else if (tag.type === "appareil") {
          for (let [index, recette] of currentResults.entries()) {
            if (
              recette.appliance.toLowerCase().includes(tag.name.toLowerCase())
            ) {
              resultWithTags = [];
              resultWithTags.push(recette);
            }
          }
        }
      }
    }

    if (resultWithTags.length > 0) {
      currentResults = resultWithTags;
    }

    clearDOM("recettes");
    clearDOM("errorMsg");
    makeRecette(currentResults);
  }
}
