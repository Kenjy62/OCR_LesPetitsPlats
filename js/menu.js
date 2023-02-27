import { ingredients, appareils, ustensiles } from "./data.js";
import { DOM, clearDOM } from "./dom.js";
import { search, currentKeywords, currentTags } from "./search.js";

// Make all menus items
export function makeIngredients(list) {
  list.forEach((ingredient) => {
    DOM.ingredients.insertAdjacentHTML(
      "beforeend",
      `<span value="${ingredient}">${ingredient}</span>`
    );
  });
}
makeIngredients(ingredients);

export function makeAppareils(list) {
  list.forEach((appareil) => {
    DOM.appareils.insertAdjacentHTML(
      "beforeend",
      `<span value="${appareil}">${appareil}</span>`
    );
  });
}
makeAppareils(appareils);

export function makeUstensiles(list) {
  list.forEach((ustensile) => {
    DOM.ustensiles.insertAdjacentHTML(
      "beforeend",
      `<span value="${ustensile}">${ustensile}</span>`
    );
  });
}
makeUstensiles(ustensiles);

// Menu Display/Hide
DOM.ingredientsInput.addEventListener("focus", function (e) {
  DOM.appareils.style.display = "none";
  DOM.appareilsInput.style.width = "auto";
  DOM.ustensiles.style.display = "none";
  DOM.ustensilesInput.style.display = "auto";

  DOM.ingredientsInput.style.width = "600px";
  DOM.ingredients.style.display = "grid";
  DOM.ingredients.style.maxHeight = "350px";
  DOM.ingredients.style.overflow = "hidden";
  DOM.ingredients.style.overflowY = "scroll";

  let icon = DOM.ingredientsInput.nextElementSibling;
  icon.style.transform = "rotate(180deg)";
});

DOM.appareilsInput.addEventListener("focus", function (e) {
  DOM.ustensiles.style.display = "none";
  DOM.ustensilesInput.style.display = "auto";
  DOM.ingredients.style.display = "none";
  DOM.ingredientsInput.style.width = "auto";

  DOM.appareilsInput.style.width = "600px";
  DOM.appareils.style.display = "grid";
  DOM.appareils.style.maxHeight = "350px";
  DOM.appareils.style.overflow = "hidden";
  DOM.appareils.style.overflowY = "scroll";

  let icon = DOM.appareilsInput.nextElementSibling;
  icon.style.transform = "rotate(180deg)";
});

DOM.ustensilesInput.addEventListener("focus", function (e) {
  DOM.appareils.style.display = "none";
  DOM.appareilsInput.style.width = "auto";
  DOM.ingredients.style.display = "none";
  DOM.ingredientsInput.style.display = "auto";

  DOM.ustensilesInput.style.width = "600px";
  DOM.ustensiles.style.display = "grid";
  DOM.ustensiles.style.maxHeight = "350px";
  DOM.ustensiles.style.overflow = "hidden";
  DOM.ustensiles.style.overflowY = "scroll";

  let icon = DOM.ustensilesInput.nextElementSibling;
  icon.style.transform = "rotate(180deg)";
});

// Menu Search Listener When Write
DOM.ingredientsInput.addEventListener("keydown", (e) =>
  searchInTag(e, "ingredient")
);

// Clean Up Function
function clearAllListerner() {
  // Add Tag Clean Up
  const items = document.querySelectorAll(
    "#ingredients>span, #appareils>span, #ustensiles>span"
  );
  items.forEach((item) => item.removeEventListener("click", addTag));

  // Delete Tag Clean Up
  const tags = document.querySelectorAll("#tags>div>.deleteTags");
  tags.forEach((item) => item.removeEventListener("click", deleteTag));
}

// Listener Builder
function buildListerner(e) {
  // Prevent Clear All Listener
  clearAllListerner();

  // For Adding Tag
  const items = document.querySelectorAll(
    "#ingredients>span, #appareils>span, #ustensiles>span"
  );
  items.forEach((item) => item.addEventListener("click", addTag));

  // For Remove Tag
  const tags = document.querySelectorAll("#tags>div>.deleteTags");
  tags.forEach((item) => item.addEventListener("click", deleteTag));
}

// Function for Adding Tag
const addTag = (e) => {
  console.log("Adding Tag");
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
    updateTag(tag);
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
    updateTag(tag);
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
    updateTag(tag);
  }

  buildListerner();
  search(currentKeywords);
};

// Function for Delete Tag
const deleteTag = (e) => {
  let data = e.target.parentElement.parentElement.getAttribute("data");
  e.target.parentElement.parentElement.remove();
  let item = document.querySelectorAll(`span[value='${data}']`);
  /// IM HERE
  item[0].style.display = "block";
  let tag = { name: data, type: "appareil", action: "Remove" };
  updateTag(tag);
  search(currentKeywords);
};

// Function Update Tag
function updateTag(tag) {
  if (tag.action === "Add") {
    currentTags.push(tag);
  } else if (tag.action === "Remove") {
    let index = currentTags.findIndex((tag) => tag.name === tag.name);
    currentTags.splice(index, 1);
  }
}

// Search Input Tag Function
function searchInTag(e, option) {
  switch (option) {
    case "ingredient":
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
      break;
    case "appareil":
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
      break;
    case "ustensil":
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
      break;
    default:
      break;
  }
  buildListerner();
}

// When DOM is Fully Load Create Listener
document.addEventListener("DOMContentLoaded", function () {
  buildListerner();
});
