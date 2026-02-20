// // When the user clicks the "Filter Articles" button, a menu appears with the checkboxes to filter. 
// // how many articles we currently have 
let articleCounter = 10;

function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  filterForm.style.display = "block";
  addForm.style.display = "none";
}

function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const addForm = document.getElementById("newContent");

  filterForm.style.display = "none";
  addForm.style.display = "flex";
}

// When the user clicks the "Filter Articles" button, a menu appears with the checkboxes to filter. 
function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  document.querySelectorAll("article.opinion").forEach((a) => {
    a.style.display = showOpinion ? "" : "none";
  });

  document.querySelectorAll("article.recipe").forEach((a) => {
    a.style.display = showRecipe ? "" : "none";
  });

  document.querySelectorAll("article.update").forEach((a) => {
    a.style.display = showUpdate ? "" : "none";
  });
}

// When the user clicks the "Add New Article" button, a form appears.
// When the user checks/unchecks a box for filtering, each of the articles of that type are hidden/shown accordingly.
// When the user enters a new article and presses "Add New Article", the content appears in the list with the correct styles.
function addNewArticle() {
  const titleVal = document.getElementById("inputHeader").value.trim();
  const textVal = document.getElementById("inputArticle").value.trim();

  const opinionRadio = document.getElementById("opinionRadio").checked;
  const recipeRadio = document.getElementById("recipeRadio").checked;
  const lifeRadio = document.getElementById("lifeRadio").checked;

  if (!titleVal || !textVal || (!opinionRadio && !recipeRadio && !lifeRadio)) {
    return;
  }

  let typeClass = "";
  let typeLabel = "";

  if (opinionRadio) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } 
  else if (recipeRadio) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } 
  else {
    typeClass = "update";
    typeLabel = "Update";
  }

  articleCounter++;

  const article = document.createElement("article");
  article.classList.add(typeClass);
  article.id = "a" + articleCounter;

  const marker = document.createElement("span");
  marker.classList.add("marker");
  marker.innerText = typeLabel;

  const h2 = document.createElement("h2");
  h2.innerText = titleVal;

  const pText = document.createElement("p");
  pText.innerText = textVal;

  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.innerText = "Read more...";
  pLink.appendChild(link);

  article.appendChild(marker);
  article.appendChild(h2);
  article.appendChild(pText);
  article.appendChild(pLink);

  document.getElementById("articleList").appendChild(article);

  document.getElementById("inputHeader").value = "";
  document.getElementById("inputArticle").value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;

  filterArticles();
}
