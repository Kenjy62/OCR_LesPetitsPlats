import { recipes } from "./recipes.js"

// Base array
const recettes = [];
const ingredients = [];
const appareils = [];
const ustensiles = [];

// Base DOM
const DOM = {
    ingredients: document.getElementById('ingredients'),
    appareils: document.getElementById('appareils'),
    ustensiles: document.getElementById('ustensiles'),
    recettes: document.getElementById('recettes'),
    searchbar: document.getElementById('searchbar'),
    ingredientsInput: document.getElementById('ingredientsInput'),
    appareilsInput: document.getElementById('appareilsInput'),
    ustensilesInput: document.getElementById('ustensilesInput'),
    tag: document.getElementById('tags')
}

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

// Make all menu items
function makeIngredients(list){
    list.forEach((ingredient) => {
        DOM.ingredients.insertAdjacentHTML('beforeend', `<span value="${ingredient}">${ingredient}</span>`)
    })
}
makeIngredients(ingredients)

function makeAppareils(list){
    list.forEach((appareil) => {
        DOM.appareils.insertAdjacentHTML('beforeend', `<span value="${appareil}">${appareil}</span>`)
    })
}
makeAppareils(appareils)

function makeUstensiles(list){
    list.forEach((ustensile) => {
        DOM.ustensiles.insertAdjacentHTML('beforeend', `<span value="${ustensile}">${ustensile}</span>`)
    })
}
makeUstensiles(ustensiles)

// Display list of recipes
function makeRecette(list){
    list.forEach((recette) => {

        let id = recette.id
    
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
        </article>`
    
        DOM.recettes.insertAdjacentHTML('beforeend', obj)
    
        recette.ingredients.forEach((ingredient) => {
    
            let obj = `<div class="ingredient">
            <span class="font-semibold">${ingredient.ingredient} :</span> <span>${ingredient.quantity? ingredient.quantity : ''} ${ingredient.unit? ingredient.unit : ''}</span>
            </div>`
    
            let target = document.getElementById(id)
            target = target.getElementsByClassName('ingredients')
            
            target[0].insertAdjacentHTML(`beforeend`, obj)
        })
    
    })
}
makeRecette(recettes)

// Searchbar
DOM.searchbar.addEventListener('keyup', function(e){

    console.log('here')
    // if > 2 characters
    if(e.currentTarget.value.length >= 2){
       const results = recettes.filter(recette => 
        recette.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || 
        recette.description.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || 
        recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(e.currentTarget.value.toLowerCase())))

        // if return results
       if(results.length > 0){
        clearDOM('recettes')
        makeRecette(results)
       } else {
        // else, display error message
        clearDOM('recettes')
        DOM.recettes.insertAdjacentHTML('beforeend', `<span>Aucun résultats pour la recherche '${e.currentTarget.value}'...</span>`)
       }
    } else {
        // < 3 characters, display all
        clearDOM()
        makeRecette(recettes)
    }
    
})

// Advanced Search
DOM.ingredientsInput.addEventListener('keyup', function(e){
    if(e.currentTarget.value.length > 0){
        const results = ingredients.filter(ingredient => ingredient.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
    if(results.length > 0){
        clearDOM('ingredients')
        makeIngredients(results)
    } else {
        clearDOM('ingredients')
        DOM.ingredients.insertAdjacentHTML('beforeend', `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`)
    }
    } else {
        clearDOM('ingredients')
        makeIngredients(ingredients)
        
    }

    addingListenerToItems()
}) 

DOM.appareilsInput.addEventListener('keyup', function(e){
    if(e.currentTarget.value.length > 0){
        const results = appareils.filter(appareils => appareils.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
    if(results.length > 0){
        clearDOM('appareils')
        makeAppareils(results)
    } else {
        clearDOM('appareils')
        DOM.appareils.insertAdjacentHTML('beforeend', `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`)
    }
    } else {
        clearDOM('appareils')
        makeAppareils(appareils)
    }
})

DOM.ustensilesInput.addEventListener('keyup', function(e){
    if(e.currentTarget.value.length > 0){
        const results = ustensiles.filter(ustensile => ustensile.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
    if(results.length > 0){
        clearDOM('ustensiles')
        makeUstensiles(results)
    } else {
        clearDOM('ustensiles')
        DOM.ustensiles.insertAdjacentHTML('beforeend', `<span>Aucun résultat pour la recherche '${e.currentTarget.value}'...</span>`)
    }
    } else {
        clearDOM('ustensiles')
        makeUstensiles(ustensiles)
    }
}) 

// Clear the DOM
function clearDOM(target){
    switch(target){
        case 'recettes':
            while(DOM.recettes.firstChild){
                DOM.recettes.removeChild(DOM.recettes.firstChild)
            }
            break;
        case 'ingredients':
            while(DOM.ingredients.firstChild){
                DOM.ingredients.removeChild(DOM.ingredients.firstChild)
            }
            break;
        case 'appareils':
            while(DOM.appareils.firstChild){
                DOM.appareils.removeChild(DOM.appareils.firstChild)
            }
            break;
        case 'ustensiles':
            while(DOM.ustensiles.firstChild){
                DOM.ustensiles.removeChild(DOM.ustensiles.firstChild)
            }
            break;
        default: break;
    }
}

// Adding listener for item in menu 'before/after modification'
function addingListenerToItems(){
    const items = document.querySelectorAll('#ingredients>span, #appareils>span, #ustensiles>span')
    items.forEach((item) => {
        item.addEventListener('click', function(e) {
            if(e.target.closest('#ingredients')){
                let obj = `<div data='${e.target.getAttribute('value')}' class="bg-customBlue rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`
            DOM.tag.insertAdjacentHTML('beforeend', obj)
            e.target.style.display = 'none'
            } else if(e.target.closest('#appareils')){
                let obj = `<div data='${e.target.getAttribute('value')}' class="bg-customGreen rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`
            DOM.tag.insertAdjacentHTML('beforeend', obj)
            e.target.style.display = 'none'
            } else if(e.target.closest('#ustensiles')){
                let obj = `<div data='${e.target.getAttribute('value')}' class="bg-customOrange rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`
            DOM.tag.insertAdjacentHTML('beforeend', obj)
            e.target.style.display = 'none'
            }
            addingListenerToTags()
        })
    })
}
addingListenerToItems()

// Adding listener for deleting tags selected
function addingListenerToTags(){
    const tags = document.querySelectorAll('#tags>div>.deleteTags')
    tags.forEach((tag) => {
        tag.addEventListener('click', function(e){
            let data = e.target.parentElement.parentElement.getAttribute('data')      
            e.target.parentElement.parentElement.remove()
            let item = document.querySelectorAll(`span[value='${data}']`)
            /// IM HERE
            item[0].style.display = 'block'
        })
    })
}

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

document.body.addEventListener('click', function(e){
    if(e.target.id != 'ingredientsInput' && e.target.id != 'appareilsInput' && e.target.id != 'ustensilesInput'){
        if(!e.target.closest('#ingredients') && (!e.target.closest('#appareils') && (!e.target.closest('#ustensiles')))){
            DOM.ustensiles.style.display = 'none'
            DOM.appareils.style.display = 'none'
            DOM.ingredients.style.display = 'none'
            DOM.ustensilesInput.style.width = 'auto'
            DOM.appareilsInput.style.width = 'auto'
            DOM.ingredientsInput.style.width = 'auto'
        }
    }
})