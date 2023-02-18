import { DOM, clearDOM, makeRecette } from './dom.js'
import { recettes, ingredients, ustensiles, appareils } from './data.js';
import { makeAppareils, makeIngredients, makeUstensiles } from './menu.js';

// Actually Search 
var actuallySearchString;
var actuallySearchResults = [];
var tags = [];

// Searchbar Listerner
DOM.searchbar.addEventListener('keyup', function(e){
    console.log('here')
    search(e.currentTarget.value, null)
})

// Search function
function search(searchString, tag){

    // if > 2 characters and no tag
    if(tag === null){
     if(searchString.length >= 2){
         const results = recettes.filter(recette => 
          recette.name.toLowerCase().includes(searchString.toLowerCase()) || 
          recette.description.toLowerCase().includes(searchString.toLowerCase()) || 
          recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchString.toLowerCase())))
  
          // if return results
         if(results.length > 0){
          clearDOM('recettes')
          makeRecette(results)
          actuallySearchString = searchString;
          actuallySearchResults = results;
         } else {
          // else, display error message
          clearDOM('recettes')
          DOM.recettes.insertAdjacentHTML('beforeend', `<span>Aucun résultats pour la recherche '${e.currentTarget.value}'...</span>`)
         }
      } else if(searchString.length >= 0 && searchString.length < 2) {
          // < 3 characters, display all
          clearDOM('recettes')
          makeRecette(recettes)
      }
    } else {
         tags.push(tag)
         searchWithTags(tags)
    }
}

function searchWithTags(tags){
    tags.forEach((tag) => {
        var results = actuallySearchResults;
        switch(tag.type){
            case 'ingredient': 
                results = actuallySearchResults.filter(recipe => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.name.toLowerCase())))
                clearDOM('recettes')
                makeRecette(results)
                break;
            case 'appareil': 
                results = actuallySearchResults.filter(recipe => recipe.appliance.toLowerCase().includes(tag.name.toLowerCase()))
                clearDOM('recettes')
                makeRecette(results)
                break;
            case 'ustensile': 
                results =  actuallySearchResults.filter(recipe => recipe.ustensiles.toLowerCase().includes(tag.name.toLowerCase()))
                clearDOM('recettes')
                makeRecette(results)
                break;
            default: break;
        }
    })
}

 // Tags Listeners
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
            let tag = {name: e.target.textContent, type: 'ingredient'}
            search(actuallySearchString, tag)
            } else if(e.target.closest('#appareils')){
                let obj = `<div data='${e.target.getAttribute('value')}' class="bg-customGreen rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`
            DOM.tag.insertAdjacentHTML('beforeend', obj)
            e.target.style.display = 'none'
            let tag = {name: e.target.textContent, type: 'appareil'}
            search(actuallySearchString, tag)
            } else if(e.target.closest('#ustensiles')){
                let obj = `<div data='${e.target.getAttribute('value')}' class="bg-customOrange rounded-sm py-2 px-3 text-white mr-2 text-sm flex items-center justify-center cursor-pointer">
                <div>${e.target.textContent}</div>
                <div class="deleteTags ml-2 h-5 w-5 border border-white border-solid rounded-full flex justify-center items-center text-xs">
                    <i class="fa-sharp fa-solid fa-xmark"></i>
                </div>
            </div>`
            DOM.tag.insertAdjacentHTML('beforeend', obj)
            e.target.style.display = 'none'
            let tag = {name: e.target.textContent, type: 'ustensile'}
            search(actuallySearchString, tag)
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