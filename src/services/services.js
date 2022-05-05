export const request = async (endPoint) => {
  const response = await fetch(endPoint);
  const data = await response.json();
  return data;
};

export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return !favorites ? [] : favorites;
};

export const isFavorite = (id, type) => getFavorites()
  .some((recipe) => recipe.id === id && recipe.type === type);

export const removeFavorite = (id) => {
  const newFavorites = getFavorites()
    .filter((recipe) => recipe.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
};

export const saveFavorite = (recipe) => {
  if (!isFavorite(recipe.id, recipe.type)) {
    const prev = getFavorites();
    const newFavorites = [...prev, recipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }
};

export const getInProgressRecipes = () => {
  const mock = {
    cocktails: {},
    meals: {},
  };
  const recipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return !recipes ? mock : recipes;
};

export const getInProgressIngredients = (type, recipeId) => {
  const recipes = getInProgressRecipes();
  return !Object.keys(recipes[type]).includes(recipeId) ? [] : recipes[type][recipeId];
};

export const containsIngredient = (
  type,
  recipeId,
  ingredient,
) => getInProgressIngredients(type, recipeId).includes(ingredient);

export const isRecipeInProgress = (type,
  recipeId) => {
  console.log(getInProgressRecipes()[type]);
  return Object.keys(getInProgressRecipes()[type]).includes(recipeId);
};

export const removeInProgressIngredient = (type, recipeId, ingredient) => {
  const inProgressRecipes = getInProgressRecipes();
  const newIngredients = getInProgressIngredients(type, recipeId)
    .filter((ing) => ing !== ingredient);
  inProgressRecipes[type][recipeId] = newIngredients;
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
};

export const saveInProgressIngredient = (type, recipeId, ingredient) => {
  if (!containsIngredient(type, recipeId, ingredient)) {
    const inProgressRecipes = getInProgressRecipes();
    const newIngredients = getInProgressIngredients(type, recipeId);
    newIngredients.push(ingredient);
    inProgressRecipes[type][recipeId] = newIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }
};

export const getFinish = () => {
  const idFinish = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log(idFinish);
  return !idFinish ? [] : idFinish;
};

export const saveFinish = (obj) => {
  const prev = getFinish();
  const newiIFinish = [...prev, obj];
  localStorage.setItem('doneRecipes', JSON.stringify(newiIFinish));
};
