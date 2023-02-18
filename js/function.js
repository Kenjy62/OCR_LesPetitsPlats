import { recipes } from "./recipes.js";
import { recettes, ingredients, appareils, ustensiles } from "./data.js";
import { makeRecette } from "./dom.js";
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

makeRecette(recettes);
makeIngredients(ingredients);
makeAppareils(appareils);
makeUstensiles(ustensiles);
