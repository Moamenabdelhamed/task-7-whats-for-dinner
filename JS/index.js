// Each recipe is an object. All recipes are stored in one array.
var recipes = [
  {name:'Caprese Sandwich',description:'Fresh Italian sandwich with mozzarella, tomato, and basil',image:'photo-1509722747041-616f39b57569.jpeg',rating:'4.5',reviews:'(189 reviews)',prep:'10 min',cook:'5 min',serves:'2 people',difficulty:'Easy',cuisine:'Italian',ingredients:['1 ciabatta bread','200g fresh mozzarella, sliced','2 large tomatoes, sliced','Fresh basil leaves','3 tablespoons pesto','2 tablespoons balsamic glaze','Olive oil','Salt and pepper']},
  {name:'Colorful Garden Salad',description:'A fresh and vibrant salad with crisp greens and seasonal vegetables',image:'photo-1546069901-eacef0df6022.jpeg',rating:'4.8',reviews:'(214 reviews)',prep:'15 min',cook:'0 min',serves:'2 people',difficulty:'Easy',cuisine:'Fresh',ingredients:['Mixed salad greens','1 cucumber, sliced','Cherry tomatoes','1 avocado, diced','A handful of toasted seeds','2 tablespoons olive oil','1 tablespoon lemon juice','Salt and pepper']},
  {name:'Creamy Garden Pasta',description:'A light, creamy pasta tossed with fresh greens and parmesan',image:'photo-1546793665-c74683f339c1.jpeg',rating:'4.7',reviews:'(176 reviews)',prep:'10 min',cook:'20 min',serves:'4 people',difficulty:'Easy',cuisine:'Italian',ingredients:['400g pasta','1 cup cream','2 cups fresh greens','1 clove garlic, minced','½ cup parmesan','1 tablespoon olive oil','Black pepper','Sea salt']},
  {name:'Margherita Pizza',description:'A simple Italian favorite with tomato, mozzarella, and basil',image:'photo-1574071318508-1cdbab80d002.jpeg',rating:'4.9',reviews:'(302 reviews)',prep:'20 min',cook:'15 min',serves:'2 people',difficulty:'Easy',cuisine:'Italian',ingredients:['1 pizza dough','½ cup tomato sauce','200g mozzarella','Fresh basil leaves','1 tablespoon olive oil','½ teaspoon oregano','Black pepper','Sea salt']},
  {name:'Golden Noodle Bowl',description:'A warm, savory bowl of noodles with vegetables and herbs',image:'photo-1585032226651-759b368d7246.jpeg',rating:'4.6',reviews:'(143 reviews)',prep:'15 min',cook:'15 min',serves:'2 people',difficulty:'Easy',cuisine:'Asian',ingredients:['200g noodles','1 carrot, sliced','1 cup shredded cabbage','2 tablespoons soy sauce','1 tablespoon sesame oil','1 clove garlic','Fresh herbs','Sesame seeds']},
  {name:'Crispy Veggie Bites',description:'Golden, crunchy bites served with a bright and tangy dip',image:'photo-1601050690597-df0568f70950.jpeg',rating:'4.6',reviews:'(128 reviews)',prep:'20 min',cook:'15 min',serves:'4 people',difficulty:'Easy',cuisine:'Snack',ingredients:['1 cup mixed vegetables','1 cup flour','½ cup breadcrumbs','1 egg','½ teaspoon paprika','Oil for cooking','Fresh herbs','Salt and pepper']},
  {name:'Garlic Butter Shrimp',description:'Juicy shrimp cooked in fragrant garlic butter with a squeeze of lemon',image:'photo-1633504581786-316c8002b1b9.jpeg',rating:'4.8',reviews:'(267 reviews)',prep:'10 min',cook:'8 min',serves:'2 people',difficulty:'Easy',cuisine:'Seafood',ingredients:['400g large shrimp','3 tablespoons butter','3 cloves garlic, minced','1 tablespoon lemon juice','Fresh parsley','½ teaspoon chili flakes','Olive oil','Salt and pepper']},
  {name:'Greek Moussaka',description:'Traditional layered eggplant casserole with lamb',image:'photo-1601050690597-df0568f70950.jpeg',rating:'4.8',reviews:'(234 reviews)',prep:'30 min',cook:'60 min',serves:'4 people',difficulty:'Intermediate',cuisine:'Mediterranean',ingredients:['3 large eggplants, sliced','500g ground lamb','400g canned tomatoes','1 onion, diced','3 cloves garlic, minced','500ml béchamel sauce','100g parmesan cheese','Cinnamon and oregano','Olive oil']}
];

var recipeIndex = 0;
var toast = document.querySelector('.toast-message');
var toastTimer;

function showMessage(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideMessage, 2200);
}

function hideMessage() {
  toast.classList.remove('show');
}

function makeIngredientList(ingredients) {
  var html = '<ol class="ingredient-list" id="ingredients-list">';
  var i;

  for (i = 0; i < ingredients.length; i++) {
    html += '<li><span class="number">' + (i + 1) + '</span><span>' + ingredients[i] + '</span></li>';
  }

  html += '</ol>';
  return html;
}

function makeInstructionList() {
  var steps = [
    ['Get everything ready.', 'Gather and prepare the ingredients before you start.'],
    ['Prepare the base.', 'Warm or toast the main ingredients as needed.'],
    ['Add the fresh flavors.', 'Layer in the vegetables, herbs, and seasonings.'],
    ['Bring it together.', 'Add the sauce and combine until everything is coated.'],
    ['Serve and enjoy.', 'Finish with fresh herbs and serve while warm.']
  ];
  var html = '<ol class="instruction-list">';
  var i;

  for (i = 0; i < steps.length; i++) {
    html += '<li><span class="number">' + (i + 1) + '</span><span><b>' + steps[i][0] + '</b>' + steps[i][1] + '</span></li>';
  }

  html += '</ol>';
  return html;
}

function showTab(tabName) {
  var buttons = document.querySelectorAll('.recipe-tabs .nav-link');
  var content = document.querySelector('#tabContent');
  var i;

  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].getAttribute('data-tab') === tabName) {
      buttons[i].classList.add('active');
      buttons[i].setAttribute('aria-selected', 'true');
    } else {
      buttons[i].classList.remove('active');
      buttons[i].setAttribute('aria-selected', 'false');
    }
  }

  if (tabName === 'ingredients') {
    content.innerHTML = makeIngredientList(recipes[recipeIndex].ingredients);
  } else if (tabName === 'instructions') {
    content.innerHTML = makeInstructionList();
  } else if (tabName === 'nutrition') {
    content.innerHTML = '<div class="nutrition-grid">' +
      '<div class="nutrition-item"><span class="nutrition-icon calories-icon"><i class="fa-solid fa-fire-flame-curved"></i></span><span>Calories</span><b>520 kcal</b></div>' +
      '<div class="nutrition-item"><span class="nutrition-icon protein-icon"><i class="fa-solid fa-dumbbell"></i></span><span>Protein</span><b>28g</b></div>' +
      '<div class="nutrition-item"><span class="nutrition-icon carbs-icon"><i class="fa-solid fa-wheat-awn"></i></span><span>Carbohydrates</span><b>62g</b></div>' +
      '<div class="nutrition-item"><span class="nutrition-icon fat-icon"><i class="fa-solid fa-droplet"></i></span><span>Fat</span><b>18g</b></div>' +
      '<div class="nutrition-item"><span class="nutrition-icon fiber-icon"><i class="fa-solid fa-seedling"></i></span><span>Fiber</span><b>3g</b></div>' +
      '<div class="nutrition-item"><span class="nutrition-icon sodium-icon"><i class="fa-solid fa-cube"></i></span><span>Sodium</span><b>680mg</b></div>' +
      '</div>';
  } else {
    content.innerHTML = '<ul class="tips-list">' +
      '<li><span class="tip-check"><i class="fa-solid fa-check"></i></span><span>Use room temperature eggs for a smoother sauce consistency</span></li>' +
      '<li><span class="tip-check"><i class="fa-solid fa-check"></i></span><span>Work quickly when mixing eggs with hot pasta to avoid scrambling</span></li>' +
      '<li><span class="tip-check"><i class="fa-solid fa-check"></i></span><span>Reserve extra pasta water - it’s the secret to perfect creaminess</span></li>' +
      '<li><span class="tip-check"><i class="fa-solid fa-check"></i></span><span>Freshly grated cheese makes all the difference in flavor</span></li>' +
      '<li><span class="tip-check"><i class="fa-solid fa-check"></i></span><span>Never add cream - authentic carbonara is made with eggs only</span></li>' +
      '</ul>';
  }
}

function showRecipe(index) {
  var recipe = recipes[index];
  var totalMinutes;

  recipeIndex = index;
  document.querySelector('#recipe-image').src = 'images/' + recipe.image;
  document.querySelector('#recipe-image').alt = recipe.name;
  document.querySelector('#recipe-name').textContent = recipe.name;
  document.querySelector('#recipe-description').textContent = recipe.description;
  document.querySelector('#rating-value').textContent = recipe.rating;
  document.querySelector('#review-count').textContent = recipe.reviews;
  document.querySelector('#prep-time').textContent = recipe.prep;
  document.querySelector('#cook-time').textContent = recipe.cook;
  document.querySelector('#servings').textContent = recipe.serves;
  document.querySelector('#difficulty').textContent = recipe.difficulty;
  document.querySelector('#cuisine').textContent = recipe.cuisine;

  totalMinutes = parseInt(recipe.prep, 10) + parseInt(recipe.cook, 10);
  if (totalMinutes > 45) {
    document.querySelector('#time-warning').classList.remove('d-none');
  } else {
    document.querySelector('#time-warning').classList.add('d-none');
  }

  document.querySelector('.save-btn').setAttribute('aria-pressed', 'false');
  document.querySelector('.save-btn').classList.remove('is-saved');
  showTab('ingredients');
}

var tabButtons = document.querySelectorAll('.recipe-tabs .nav-link');
var i;

for (i = 0; i < tabButtons.length; i++) {
  tabButtons[i].onclick = function () {
    showTab(this.getAttribute('data-tab'));
  };
}

document.querySelector('#try-another-btn').onclick = function () {
  var nextIndex = recipeIndex + 1;

  if (nextIndex >= recipes.length) {
    nextIndex = 0;
  }

  showRecipe(nextIndex);
  showMessage('Here is another dinner idea!');
  document.querySelector('.recipe-card').scrollIntoView({behavior:'smooth', block:'start'});
};

document.querySelector('.save-btn').onclick = function () {
  var button = document.querySelector('.save-btn');
  var isSaved = button.getAttribute('aria-pressed') === 'true';

  if (isSaved) {
    button.setAttribute('aria-pressed', 'false');
    button.classList.remove('is-saved');
    showMessage('Recipe removed from saved recipes');
  } else {
    button.setAttribute('aria-pressed', 'true');
    button.classList.add('is-saved');
    showMessage('Recipe saved');
  }
};

document.querySelector('.share-btn').onclick = function () {
  var linkInput = document.createElement('input');
  var linkCopied;

  linkInput.value = window.location.href;
  document.body.appendChild(linkInput);
  linkInput.select();
  linkCopied = document.execCommand('copy');
  document.body.removeChild(linkInput);

  if (linkCopied) {
    showMessage('Recipe link copied');
  } else {
    window.prompt('Copy this recipe link:', window.location.href);
  }
};

document.querySelector('.mobile-menu-btn').onclick = function () {
  showMessage('Your daily meal inspiration');
};

document.querySelector('.saved-recipes').onclick = function () {
  showMessage('Your saved recipes');
};

document.querySelector('.history-button').onclick = function () {
  showMessage('Recently viewed recipes');
};

document.querySelector('.settings-button').onclick = function () {
  showMessage('Recipe settings');
};
