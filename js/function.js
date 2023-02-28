// Requires

// All recipes
import { recipes } from "./recipes.js";

// Saving var datas
import { recettes, ingredients, appareils, ustensiles } from "./data.js";

// Make DOM
import { makeRecette } from "./dom.js";

// Make Menu
import { makeAppareils, makeIngredients, makeUstensiles } from "./menu.js";

// Prepare base Array
recipes.forEach((recette) => {
  recettes.push(recette);
  recette.ingredients.forEach((item) => {
    if (!ingredients.includes(item.ingredient)) {
      ingredients.push(item.ingredient);
    }
  });

  if (!appareils.includes(recette.appliance)) {
    appareils.push(recette.appliance);
  }

  recette.ustensils.forEach((item) => {
    if (!ustensiles.includes(item)) {
      ustensiles.push(item);
    }
  });
});

// Start All
makeRecette(recettes);
makeIngredients(ingredients);
makeAppareils(appareils);
makeUstensiles(ustensiles);
