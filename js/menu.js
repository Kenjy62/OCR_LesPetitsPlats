import { recipes } from "./recipes.js"

const recettes = [];
const ingredients = [];
const appareils = [];
const ustensiles = [];

const DOM = {
    ingredients: document.getElementById('ingredients'),
    appareils: document.getElementById('appareils'),
    ustensiles: document.getElementById('ustensiles')
}

recipes.forEach((recette) => {
    recettes.push(recette)
    recette.ingredients.forEach((item) => {
        if(!ingredients.includes(item.ingredient)){
            ingredients.push(item.ingredient)
        }
    })

    if(!appareils.includes(recette.appliance)){
        appareils.push(recette.appliance)
    }

    recette.ustensils.forEach((item) => {
        if(!ustensiles.includes(item)){
            ustensiles.push(item)
        }
    })
})

ingredients.forEach((ingredient) => {
    DOM.ingredients.insertAdjacentHTML('beforeend', `<span>${ingredient}</span>`)
})

appareils.forEach((appareil) => {
    DOM.appareils.insertAdjacentHTML('beforeend', `<span>${appareil}</span>`)
})

ustensiles.forEach((ustensile) => {
    DOM.ustensiles.insertAdjacentHTML('beforeend', `<span>${ustensile}</span>`)
})
