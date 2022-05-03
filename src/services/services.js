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
