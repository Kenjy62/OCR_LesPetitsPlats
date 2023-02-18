import { recipes } from "./recipes.js"
import { recettes, ingredients, appareils, ustensiles } from "./data.js";
import { DOM, makeRecette } from "./dom.js";



// Prepare base Array
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

// Make all menus items
export function makeIngredients(list){
    list.forEach((ingredient) => {
        DOM.ingredients.insertAdjacentHTML('beforeend', `<span value="${ingredient}">${ingredient}</span>`)
    })
}
makeIngredients(ingredients)

export function makeAppareils(list){
    list.forEach((appareil) => {
        DOM.appareils.insertAdjacentHTML('beforeend', `<span value="${appareil}">${appareil}</span>`)
    })
}
makeAppareils(appareils)

export function makeUstensiles(list){
    list.forEach((ustensile) => {
        DOM.ustensiles.insertAdjacentHTML('beforeend', `<span value="${ustensile}">${ustensile}</span>`)
    })
}
makeUstensiles(ustensiles)

// Make recipes DOM 
makeRecette(recettes)

// Menu Display/Hide
DOM.ingredientsInput.addEventListener('focus', function(e) {

    DOM.appareils.style.display = 'none'
    DOM.appareilsInput.style.width = 'auto'
    DOM.ustensiles.style.display = 'none'
    DOM.ustensilesInput.style.display = 'auto'

    DOM.ingredientsInput.style.width = '600px'
    DOM.ingredients.style.display = 'grid'
    DOM.ingredients.style.maxHeight = '350px'
    DOM.ingredients.style.overflow = 'hidden'
    DOM.ingredients.style.overflowY = 'scroll'

    let icon = DOM.ingredientsInput.nextElementSibling
    icon.style.transform = 'rotate(180deg)'
})

DOM.appareilsInput.addEventListener('focus', function(e) {
    
    DOM.ustensiles.style.display = 'none'
    DOM.ustensilesInput.style.display = 'auto'
    DOM.ingredients.style.display = 'none'
    DOM.ingredientsInput.style.width = 'auto'

    DOM.appareilsInput.style.width = '600px'
    DOM.appareils.style.display = 'grid'
    DOM.appareils.style.maxHeight = '350px'
    DOM.appareils.style.overflow = 'hidden'
    DOM.appareils.style.overflowY = 'scroll'

    let icon = DOM.appareilsInput.nextElementSibling
    icon.style.transform = 'rotate(180deg)'
})

DOM.ustensilesInput.addEventListener('focus', function(e) {

    DOM.appareils.style.display = 'none'
    DOM.appareilsInput.style.width = 'auto'
    DOM.ingredients.style.display = 'none'
    DOM.ingredientsInput.style.display = 'auto'

    DOM.ustensilesInput.style.width = '600px'
    DOM.ustensiles.style.display = 'grid'
    DOM.ustensiles.style.maxHeight = '350px'
    DOM.ustensiles.style.overflow = 'hidden'
    DOM.ustensiles.style.overflowY = 'scroll'

    let icon = DOM.ustensilesInput.nextElementSibling
    icon.style.transform = 'rotate(180deg)'
})


